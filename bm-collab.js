/* ============================================================
   BacMaster — bm-collab.js
   Édition à plusieurs « façon Word » :
   · qui est en train de modifier le chapitre (pastilles de couleur),
   · le curseur (et la sélection) de chaque personne, avec son prénom,
   · mise à jour de « Dernière modification par … ».
   Les positions passent par un canal temps réel Supabase (Broadcast + Presence),
   rien n'est écrit dans le cours : les curseurs ne polluent jamais le texte.
   ============================================================ */
(function () {
  'use strict';
  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#ec4899', '#84cc16', '#f97316'];
  const SEND_EVERY = 120;            // ms entre deux envois de position
  const STALE_AFTER = 90000;         // un curseur sans nouvelle depuis 90 s est masqué

  let ch = null, chKey = null, myKey = null, me = null;
  const peers = new Map();           // clé de présence -> { name, color, off, len, b, a, t }
  let layer = null, raf = 0, lastSend = 0, sendTimer = null;

  const $ = id => document.getElementById(id);
  const S = () => (window.BacMasterSync && BacMasterSync.api && BacMasterSync.api.state) || null;
  const editor = () => $('editor');
  const chapterKey = () => {
    try { return (typeof curSubject !== 'undefined' && typeof curChapter !== 'undefined' && curSubject && curChapter) ? curSubject + '|' + curChapter : null; } catch (e) { return null; }
  };
  function hash(str) { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0; return h.toString(36); }
  function colorOf(id) { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return COLORS[h % COLORS.length]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // ── position du curseur local ──
  function caretInfo() {
    const ed = editor(), sel = window.getSelection();
    if (!ed || !sel || !sel.rangeCount || !ed.contains(sel.anchorNode) || !ed.contains(sel.focusNode)) return null;
    const r = sel.getRangeAt(0), pre = document.createRange();
    pre.selectNodeContents(ed); pre.setEnd(r.startContainer, r.startOffset);
    const off = pre.toString().length, len = r.toString().length, t = ed.textContent;
    return { off: off, len: len, b: t.slice(Math.max(0, off - 16), off), a: t.slice(off, off + 8) };
  }
  function sendCursor(force) {
    if (!ch || !me) return;
    const now = Date.now();
    if (!force && now - lastSend < SEND_EVERY) {
      if (!sendTimer) sendTimer = setTimeout(() => { sendTimer = null; sendCursor(true); }, SEND_EVERY - (now - lastSend));
      return;
    }
    const c = caretInfo(); if (!c) return;
    lastSend = now;
    try { ch.send({ type: 'broadcast', event: 'cur', payload: { k: myKey, n: me.name, c: me.color, off: c.off, len: c.len, b: c.b, a: c.a } }); } catch (e) { /* hors ligne */ }
  }

  // ── retrouver la position d'un autre dans MON texte (qui peut avoir un peu bougé) ──
  function resolve(t, p) {
    let off = Math.max(0, Math.min(p.off, t.length));
    if (p.b) {
      let best = -1, bd = 1e9, i = -1;
      const needle = p.b + (p.a || '');
      while ((i = t.indexOf(needle, i + 1)) >= 0) { const pos = i + p.b.length, d = Math.abs(pos - p.off); if (d < bd) { bd = d; best = pos; } }
      if (best < 0) { i = -1; while ((i = t.indexOf(p.b, i + 1)) >= 0) { const pos = i + p.b.length, d = Math.abs(pos - p.off); if (d < bd) { bd = d; best = pos; } } }
      if (best >= 0) off = best;
    }
    return off;
  }
  function pointAt(ed, off) {
    const w = document.createTreeWalker(ed, NodeFilter.SHOW_TEXT); let n, left = off, last = null;
    while ((n = w.nextNode())) { last = n; if (left <= n.length) return [n, left]; left -= n.length; }
    return last ? [last, last.length] : null;
  }
  function caretRect(ed, off) {
    const pt = pointAt(ed, off); if (!pt) return null;
    const r = document.createRange(); r.setStart(pt[0], pt[1]); r.collapse(true);
    let rc = r.getClientRects()[0];
    if (rc && rc.height > 0) return { left: rc.left, top: rc.top, height: rc.height };
    const n = pt[0], o = pt[1];
    if (o > 0) { r.setStart(n, o - 1); r.setEnd(n, o); rc = r.getClientRects()[0]; if (rc) return { left: rc.right, top: rc.top, height: rc.height }; }
    if (o < n.length) { r.setStart(n, o); r.setEnd(n, o + 1); rc = r.getClientRects()[0]; if (rc) return { left: rc.left, top: rc.top, height: rc.height }; }
    const pr = n.parentElement && n.parentElement.getBoundingClientRect();
    return pr ? { left: pr.left, top: pr.top, height: 18 } : null;
  }
  function selectionRects(ed, from, to) {
    const a = pointAt(ed, from), b = pointAt(ed, to); if (!a || !b) return [];
    const r = document.createRange(); try { r.setStart(a[0], a[1]); r.setEnd(b[0], b[1]); } catch (e) { return []; }
    return [...r.getClientRects()].filter(x => x.width > 1 && x.height > 1);
  }

  // ── affichage ──
  function ensureLayer() {
    if (!layer || !layer.isConnected) { layer = document.createElement('div'); layer.id = 'bm-rc-layer'; layer.className = 'bm-rcl'; layer.setAttribute('aria-hidden', 'true'); document.body.appendChild(layer); }
    return layer;
  }
  function topLimit() { const h = document.querySelector('.topbar'), rb = $('bm-ribbon'); let t = 0; if (h) t = Math.max(t, h.getBoundingClientRect().bottom); if (rb) t = Math.max(t, rb.getBoundingClientRect().bottom); return t; }
  function render() {
    raf = 0;
    const ed = editor();
    if (!ed || !ch) { if (layer) layer.innerHTML = ''; return; }
    const L = ensureLayer(), text = ed.textContent, now = Date.now(), limit = topLimit(), vh = window.innerHeight;
    let html = '';
    peers.forEach(p => {
      if (now - p.t > STALE_AFTER) return;
      const start = resolve(text, p), end = Math.min(text.length, start + (p.len || 0));
      if (p.len > 0) for (const q of selectionRects(ed, start, end)) { if (q.bottom < limit || q.top > vh) continue; html += '<i class="bm-rs" style="left:' + q.left + 'px;top:' + q.top + 'px;width:' + q.width + 'px;height:' + q.height + 'px;background:' + p.color + '"></i>'; }
      const rc = caretRect(ed, p.len > 0 ? end : start); if (!rc) return;
      const hidden = rc.top + rc.height < limit || rc.top > vh;
      if (hidden) return;
      html += '<div class="bm-rc" style="left:' + rc.left + 'px;top:' + rc.top + 'px;height:' + rc.height + 'px;border-color:' + p.color + '"><span class="bm-rc-n" style="background:' + p.color + '">' + esc(p.name) + '</span></div>';
    });
    L.innerHTML = html;
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(render); }

  function ensureBar() {
    const top = document.querySelector('#bm-ribbon .rb-top') || $('sbtn'); if (!top) return null;
    let bar = $('bm-collab');
    if (!bar || !bar.isConnected) { bar = document.createElement('div'); bar.id = 'bm-collab'; bar.className = 'bm-collab'; bar.hidden = true; top.insertAdjacentElement('afterend', bar); }   // sa propre ligne sous les onglets : jamais coupée
    return bar;
  }
  function renderBar() {
    const bar = ensureBar(); if (!bar) return;
    const list = [...peers.values()];
    if (!list.length) { bar.hidden = true; bar.innerHTML = ''; return; }
    bar.hidden = false;
    bar.innerHTML = '<span class="bm-collab-ico" title="Personnes qui modifient ce cours en ce moment">👥</span>' + list.map(p => '<span class="bm-chip" style="--c:' + p.color + '" title="' + esc(p.name) + ' modifie ce cours"><i></i>' + esc(p.name) + '</span>').join('');
  }
  function syncPresence() {
    if (!ch) return;
    let st = {}; try { st = ch.presenceState() || {}; } catch (e) { st = {}; }
    const seen = new Set();
    Object.keys(st).forEach(k => {
      if (k === myKey) return;
      const meta = (st[k] && st[k][0]) || {}; seen.add(k);
      const old = peers.get(k) || { off: 0, len: 0, b: '', a: '', t: 0 };
      peers.set(k, { ...old, name: meta.name || 'Quelqu’un', color: meta.color || colorOf(k), t: old.t || 0 });
    });
    [...peers.keys()].forEach(k => { if (!seen.has(k)) peers.delete(k); });
    renderBar(); schedule();
  }
  function onCursor(p) {
    if (!p || !p.k || p.k === myKey) return;
    const old = peers.get(p.k) || {};
    peers.set(p.k, { name: p.n || old.name || 'Quelqu’un', color: p.c || old.color || colorOf(p.k), off: p.off | 0, len: p.len | 0, b: p.b || '', a: p.a || '', t: Date.now() });
    renderBar(); schedule();
  }

  // ── connexion au canal du chapitre ──
  function join(k) {
    const st = S(); if (!st || !st.client || !st.user) return;
    leave(); chKey = k; peers.clear();
    myKey = st.user.id + ':' + Math.random().toString(36).slice(2, 8);
    me = { name: st.displayName || (st.user.email || '').split('@')[0] || 'Moi', color: colorOf(st.user.id) };
    try {
      const c = st.client.channel('bmcur-' + hash(k), { config: { broadcast: { self: false }, presence: { key: myKey } } });
      c.on('presence', { event: 'sync' }, syncPresence);
      c.on('broadcast', { event: 'cur' }, msg => onCursor(msg && msg.payload));
      c.subscribe(async status => {
        if (status === 'SUBSCRIBED') { try { await c.track({ name: me.name, color: me.color }); } catch (e) { /* ignore */ } sendCursor(true); }
      });
      ch = c;
    } catch (e) { ch = null; }
  }
  function leave() {
    const st = S();
    if (ch && st && st.client) { try { st.client.removeChannel(ch); } catch (e) { /* ignore */ } }
    ch = null; chKey = null; peers.clear();
    if (layer) layer.innerHTML = '';
    const bar = $('bm-collab'); if (bar) { bar.hidden = true; bar.innerHTML = ''; }
  }

  // ── événements ──
  document.addEventListener('selectionchange', () => { if (!ch) return; sendCursor(false); });
  document.addEventListener('input', e => { if (ch && e.target && e.target.id === 'editor') { sendCursor(false); schedule(); } }, true);
  window.addEventListener('bm-editor-reloaded', () => { schedule(); sendCursor(true); if (typeof window.bmRefreshLastEdit === 'function') window.bmRefreshLastEdit(); });
  window.addEventListener('scroll', schedule, true);
  window.addEventListener('resize', schedule);
  window.addEventListener('pagehide', leave);
  // on rejoint / quitte automatiquement selon l'écran affiché
  setInterval(() => {
    const k = editor() ? chapterKey() : null, st = S(), ready = !!(st && st.client && st.user);
    if (k && ready && document.visibilityState !== 'hidden') { if (k !== chKey) join(k); ensureBar(); renderBar(); schedule(); }
    else if (chKey && (!k || !ready)) leave();
    if (typeof window.bmRefreshLastEdit === 'function') window.bmRefreshLastEdit();
  }, 700);

  window.BacMasterCollab = { peers: () => [...peers.values()], join: join, leave: leave, _resolve: resolve };
})();
