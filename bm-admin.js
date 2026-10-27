/* ============================================================
   BacMaster — bm-admin.js
   • Interface d'administration (comptes, activité, historique + restauration des cours)
   • Présence : qui lit / modifie le même chapitre que toi, en direct
   Ce fichier ne contient aucune clé : il réutilise la session de supabase-app.js.
   ============================================================ */
(function () {
  'use strict';
  const core = () => (window.BacMasterSync && window.BacMasterSync.api) || null;
  const S = () => core() && core().state;
  const sb = () => S() && S().client;
  const $ = id => document.getElementById(id);
  const ROLES = { reader: 'Lecteur', editor: 'Éditeur', admin: 'Administrateur' };
  const fmt = d => (d && isFinite(new Date(d))) ? new Date(d).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '—';
  function ago(d) {
    const m = Math.round((Date.now() - new Date(d)) / 60000); if (!isFinite(m)) return '';
    if (m < 1) return 'à l’instant'; if (m < 60) return 'il y a ' + m + ' min';
    if (m < 1440) return 'il y a ' + Math.round(m / 60) + ' h'; return 'il y a ' + Math.round(m / 1440) + ' j';
  }
  function h(tag, attrs, kids) {
    const el = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'class') el.className = v; else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v); else if (v !== false && v != null) el.setAttribute(k, v);
    });
    (kids || []).forEach(c => c != null && el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return el;
  }
  const initials = n => String(n || '?').trim().split(/\s+/).slice(0, 2).map(x => x[0] || '').join('').toUpperCase() || '?';
  const labels = {};   // user_id -> nom
  const who = id => labels[id] || (id ? 'Compte inconnu' : 'Système');
  function say(msg, bad) { try { core().status(msg, !!bad); } catch (e) { /* ignore */ } toast(msg, bad); }
  function toast(msg, bad) {
    let t = $('bm-adm-toast'); if (!t) { t = h('div', { id: 'bm-adm-toast' }); document.body.appendChild(t); }
    t.textContent = msg; t.className = bad ? 'bad show' : 'show'; clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 3200);
  }

  // ───────────────────────── Styles ─────────────────────────
  function addStyles() {
    if ($('bm-adm-style')) return;
    const st = h('style', { id: 'bm-adm-style' });
    st.textContent = `
    #bm-adm{position:fixed;inset:0;z-index:999997;display:flex;justify-content:center;align-items:stretch;background:rgba(8,14,32,.55);backdrop-filter:blur(6px);font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;color:#18233d}
    #bm-adm[hidden]{display:none!important}
    #bm-adm .adm-shell{width:min(1040px,100%);margin:max(0px,env(safe-area-inset-top)) 0 0;background:#f5f7fc;display:flex;flex-direction:column;min-height:0;box-shadow:0 20px 80px #0008}
    @media(min-width:900px){#bm-adm .adm-shell{margin:24px 0;border-radius:20px;overflow:hidden}}
    #bm-adm .hd{display:flex;align-items:center;gap:12px;padding:16px 20px;background:linear-gradient(135deg,#27346b,#4a5fc4);color:#fff}
    #bm-adm .hd h2{margin:0;font-size:19px;letter-spacing:-.2px}#bm-adm .hd p{margin:2px 0 0;font-size:12.5px;opacity:.8}
    #bm-adm .x{margin-left:auto;border:0;background:#ffffff26;color:#fff;width:36px;height:36px;border-radius:10px;font-size:17px;cursor:pointer}
    #bm-adm .x:hover{background:#ffffff40}
    #bm-adm .tabs{display:flex;gap:4px;padding:10px 14px 0;background:#fff;border-bottom:1px solid #e1e6f2;overflow-x:auto}
    #bm-adm .tabs button{border:0;background:none;padding:10px 14px;font:600 14px system-ui;color:#5a6788;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap}
    #bm-adm .tabs button.on{color:#2f44b3;border-bottom-color:#2f44b3}
    #bm-adm .body{flex:1;overflow:auto;padding:18px 20px 28px;min-height:0}
    #bm-adm .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:16px}
    #bm-adm .stat{background:#fff;border:1px solid #e1e6f2;border-radius:14px;padding:12px 14px}
    #bm-adm .stat b{display:block;font-size:24px;line-height:1.1}#bm-adm .stat span{font-size:12px;color:#66739a}
    #bm-adm input[type=search],#bm-adm select{font:inherit;padding:10px 12px;border:1px solid #cfd7e8;border-radius:10px;background:#fff;color:inherit}
    #bm-adm input[type=search]{width:100%;box-sizing:border-box;margin-bottom:12px}
    #bm-adm .card{background:#fff;border:1px solid #e1e6f2;border-radius:14px}
    #bm-adm .row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid #eef1f8;flex-wrap:wrap}
    #bm-adm .row:last-child{border-bottom:0}
    #bm-adm .av{width:38px;height:38px;border-radius:50%;background:#e3e8fb;color:#2f44b3;display:grid;place-items:center;font-weight:700;flex:none}
    #bm-adm .grow{flex:1;min-width:160px}#bm-adm .grow b{display:block}#bm-adm .muted{color:#66739a;font-size:12.5px;overflow-wrap:anywhere}
    #bm-adm .pill{display:inline-block;padding:2px 9px;border-radius:99px;font-size:11.5px;font-weight:700;background:#e8ecf8;color:#34457f}
    #bm-adm .pill.admin{background:#fde8c8;color:#8a4b00}#bm-adm .pill.editor{background:#d9f2e3;color:#16643a}#bm-adm .pill.del{background:#fde0e0;color:#a12626}
    #bm-adm .dot{width:9px;height:9px;border-radius:50%;background:#2fb26b;display:inline-block;margin-right:6px}
    #bm-adm .btn{border:1px solid #cfd7e8;background:#fff;border-radius:10px;padding:8px 12px;font:600 13px system-ui;cursor:pointer;color:#26365f}
    #bm-adm .btn:hover{background:#f0f3fb}#bm-adm .btn.pri{background:#2f44b3;color:#fff;border-color:#2f44b3}#bm-adm .btn.pri:hover{background:#2a3da0}
    #bm-adm .btn[disabled]{opacity:.5;cursor:default}
    #bm-adm .feed .ico{width:34px;height:34px;border-radius:10px;background:#eef1fb;display:grid;place-items:center;flex:none}
    #bm-adm .hist{display:grid;grid-template-columns:minmax(220px,320px) 1fr;gap:14px}
    @media(max-width:760px){#bm-adm .hist{grid-template-columns:1fr}}
    #bm-adm .list{max-height:56vh;overflow:auto}
    #bm-adm .item{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid #eef1f8;background:none;padding:11px 14px;cursor:pointer;font:inherit;color:inherit}
    #bm-adm .item:hover{background:#f4f6fd}#bm-adm .item.on{background:#e8edff}
    #bm-adm iframe{width:100%;height:340px;border:1px solid #e1e6f2;border-radius:12px;background:#fff;margin-top:10px}
    #bm-adm .empty{padding:26px;text-align:center;color:#66739a}
    #bm-adm .note{background:#fff8e6;border:1px solid #f1deaa;color:#6b5311;border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:13px}
    #bm-adm-toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%) translateY(20px);opacity:0;pointer-events:none;z-index:1000000;background:#14213d;color:#fff;padding:11px 16px;border-radius:12px;font:14px system-ui;box-shadow:0 8px 28px #0006;transition:.25s;max-width:calc(100vw - 32px)}
    #bm-adm-toast.show{opacity:1;transform:translateX(-50%)}#bm-adm-toast.bad{background:#8f2020}
    #bm-presence{position:fixed;left:14px;bottom:14px;z-index:99990;max-width:min(360px,calc(100vw - 28px));background:#14213d;color:#fff;border-radius:14px;padding:9px 13px;font:13px/1.4 system-ui;box-shadow:0 8px 26px #0005;display:flex;gap:8px;align-items:center}
    #bm-presence[hidden]{display:none!important}#bm-presence .pd{width:9px;height:9px;border-radius:50%;background:#35d07f;flex:none;animation:bmpulse 1.6s infinite}
    @keyframes bmpulse{50%{opacity:.35}}
    #bm-sidebar-admin{display:block;width:100%;margin-top:8px;text-align:left;border:1px solid #ffffff30;border-radius:12px;padding:11px 12px;background:rgba(19,31,57,.92);color:#fff;font:600 14px system-ui;cursor:pointer}
    #bm-sidebar-admin[hidden]{display:none!important}`;
    document.head.appendChild(st);
  }

  // ───────────────────────── Interface admin ─────────────────────────
  let tab = 'users', profiles = [];
  function shell() {
    addStyles();
    let root = $('bm-adm');
    if (root) return root;
    root = h('div', { id: 'bm-adm', hidden: '', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Administration' });
    const sh = h('div', { class: 'adm-shell' });
    sh.appendChild(h('div', { class: 'hd' }, [h('div', {}, [h('h2', { text: '⚙️ Administration' }), h('p', { text: 'Comptes, activité et historique des cours' })]), h('button', { class: 'x', 'aria-label': 'Fermer', text: '✕', onclick: () => { root.hidden = true; } })]));
    const nav = h('div', { class: 'tabs' });
    [['users', '👥 Comptes'], ['activity', '🕘 Activité'], ['history', '🗂️ Historique des cours']].forEach(([k, t]) => nav.appendChild(h('button', { 'data-tab': k, text: t, onclick: () => go(k) })));
    sh.appendChild(nav); sh.appendChild(h('div', { class: 'body', id: 'bm-adm-body' }));
    root.appendChild(sh); document.body.appendChild(root);
    root.addEventListener('keydown', e => { if (e.key === 'Escape') root.hidden = true; });
    return root;
  }
  function go(k) {
    tab = k;
    document.querySelectorAll('#bm-adm .tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === k));
    const body = $('bm-adm-body'); body.replaceChildren(h('div', { class: 'empty', text: 'Chargement…' }));
    ({ users: renderUsers, activity: renderActivity, history: renderHistory })[k]();
  }
  function openAdmin() {
    if (!S() || S().role !== 'admin') { say('Accès réservé aux administrateurs.', true); return; }
    shell().hidden = false; go(tab);
  }
  async function loadProfiles() {
    const { data, error } = await sb().from('bacmaster_profiles').select('user_id,display_name,email,role,created_at').order('created_at', { ascending: true });
    if (error) throw new Error(error.message);
    profiles = data || []; profiles.forEach(p => { labels[p.user_id] = p.display_name || p.email || 'Sans nom'; });
    return profiles;
  }
  const fail = (body, e, hint) => body.replaceChildren(h('div', { class: 'note', text: (hint ? hint + ' ' : '') + 'Détail : ' + (e.message || e) }));

  // ── Comptes ──
  async function renderUsers() {
    const body = $('bm-adm-body');
    try { await loadProfiles(); } catch (e) { return fail(body, e, 'Impossible de charger les comptes.'); }
    const online = onlineList();
    const count = r => profiles.filter(p => p.role === r).length;
    const stats = h('div', { class: 'stats' }, [['Comptes', profiles.length], ['Administrateurs', count('admin')], ['Éditeurs', count('editor')], ['Lecteurs', count('reader')], ['En ligne', online.length + 1]].map(([t, n]) => h('div', { class: 'stat' }, [h('b', { text: String(n) }), h('span', { text: t })])));
    const search = h('input', { type: 'search', placeholder: 'Rechercher un nom ou une adresse e-mail…', 'aria-label': 'Rechercher un compte' });
    const list = h('div', { class: 'card' });
    function draw() {
      const q = search.value.trim().toLowerCase();
      list.replaceChildren();
      const shown = profiles.filter(p => !q || (p.display_name || '').toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q));
      if (!shown.length) list.appendChild(h('div', { class: 'empty', text: 'Aucun compte trouvé.' }));
      shown.forEach(p => {
        const isOn = p.user_id === S().user.id || online.some(o => o.id === p.user_id);
        const sel = h('select', { 'aria-label': 'Rôle de ' + (p.display_name || p.email) }, Object.entries(ROLES).map(([v, t]) => h('option', { value: v, text: t, selected: p.role === v ? '' : false })));
        sel.value = p.role;
        sel.addEventListener('change', async () => {
          const next = sel.value, prev = p.role;
          if (p.user_id === S().user.id && next !== 'admin' && !confirm('Tu vas retirer tes propres droits d’administrateur. Continuer ?')) { sel.value = prev; return; }
          sel.disabled = true;
          const { error } = await sb().from('bacmaster_profiles').update({ role: next }).eq('user_id', p.user_id);
          sel.disabled = false;
          if (error) { sel.value = prev; return say('Modification refusée : ' + error.message, true); }
          p.role = next; say('Rôle de ' + (p.display_name || p.email) + ' : ' + ROLES[next]);
          if (p.user_id === S().user.id) { S().role = next; if (next !== 'admin') $('bm-adm').hidden = true; refreshSidebar(); }
          renderUsers();
        });
        list.appendChild(h('div', { class: 'row' }, [
          h('div', { class: 'av', text: initials(p.display_name || p.email) }),
          h('div', { class: 'grow' }, [h('b', { text: p.display_name || 'Sans nom' }), h('div', { class: 'muted', text: (p.email || 'e-mail indisponible') + ' · inscrit le ' + fmt(p.created_at).split(' ')[0] })]),
          isOn ? h('span', { class: 'muted' }, [h('span', { class: 'dot' }), 'en ligne']) : null,
          h('span', { class: 'pill ' + p.role, text: ROLES[p.role] || p.role }), sel]));
      });
    }
    search.addEventListener('input', draw); draw();
    body.replaceChildren(stats, search, list, h('p', { class: 'muted', text: 'Lecteur : consulte les cours · Éditeur : modifie les cours · Administrateur : gère aussi les comptes et l’historique. Le changement est appliqué tout de suite.' }));
  }

  // ── Activité ──
  async function renderActivity() {
    const body = $('bm-adm-body');
    try { await loadProfiles(); } catch (e) { return fail(body, e, 'Impossible de charger les comptes.'); }
    const [ch, au] = await Promise.all([
      sb().from('bacmaster_chapters').select('id,subject,chapter,deleted,updated_at,updated_by').order('updated_at', { ascending: false }).limit(40),
      sb().from('bacmaster_audit_log').select('id,actor_user_id,target_user_id,changed_at,old_data,new_data,table_name').eq('table_name', 'bacmaster_profiles').order('changed_at', { ascending: false }).limit(30)]);
    const items = [];
    (ch.data || []).forEach(r => items.push({ at: r.updated_at, ico: r.deleted ? '🗑️' : '✏️', text: `${who(r.updated_by)} a ${r.deleted ? 'supprimé' : 'modifié'} « ${r.subject} › ${r.chapter} »` }));
    (au.data || []).forEach(r => { if (r.old_data && r.new_data && r.old_data.role !== r.new_data.role) items.push({ at: r.changed_at, ico: '🔑', text: `${who(r.actor_user_id)} a changé le rôle de ${who(r.target_user_id)} : ${ROLES[r.old_data.role] || r.old_data.role} → ${ROLES[r.new_data.role] || r.new_data.role}` }); });
    items.sort((a, b) => new Date(b.at) - new Date(a.at));
    if (ch.error) return fail(body, ch.error, 'Exécute supabase_temps_reel.sql.');
    const list = h('div', { class: 'card feed' });
    if (!items.length) list.appendChild(h('div', { class: 'empty', text: 'Aucune activité pour le moment.' }));
    items.slice(0, 50).forEach(i => list.appendChild(h('div', { class: 'row' }, [h('div', { class: 'ico', text: i.ico }), h('div', { class: 'grow', text: i.text }), h('div', { class: 'muted', title: fmt(i.at), text: ago(i.at) })])));
    body.replaceChildren(list);
  }

  // ── Historique des cours ──
  async function renderHistory() {
    const body = $('bm-adm-body');
    try { await loadProfiles(); } catch (e) { return fail(body, e, 'Impossible de charger les comptes.'); }
    const [hr, dl] = await Promise.all([
      sb().from('bacmaster_chapters_history').select('id,chapter_id,subject,chapter,saved_by,saved_at,archived_at').order('archived_at', { ascending: false }).limit(1000),
      sb().from('bacmaster_chapters').select('id,subject,chapter,updated_at,updated_by').eq('deleted', true)]);
    if (hr.error) return fail(body, hr.error, 'Exécute supabase_historique.sql dans Supabase pour activer l’historique.');
    const map = new Map();
    (hr.data || []).forEach(v => { if (!map.has(v.chapter_id)) map.set(v.chapter_id, { id: v.chapter_id, subject: v.subject, chapter: v.chapter, versions: [] }); map.get(v.chapter_id).versions.push(v); });
    const deleted = new Set((dl.data || []).map(d => d.id));
    (dl.data || []).forEach(d => { if (!map.has(d.id)) map.set(d.id, { id: d.id, subject: d.subject, chapter: d.chapter, versions: [] }); });
    const chapters = [...map.values()].sort((a, b) => (deleted.has(b.id) - deleted.has(a.id)) || new Date(b.versions[0]?.archived_at || 0) - new Date(a.versions[0]?.archived_at || 0));
    const search = h('input', { type: 'search', placeholder: 'Chercher un cours…', 'aria-label': 'Chercher un cours' });
    const list = h('div', { class: 'card list' }), detail = h('div');
    let current = null;
    function drawList() {
      const q = search.value.trim().toLowerCase(); list.replaceChildren();
      const shown = chapters.filter(c => !q || (c.subject + ' ' + c.chapter).toLowerCase().includes(q));
      if (!shown.length) list.appendChild(h('div', { class: 'empty', text: chapters.length ? 'Aucun résultat.' : 'Aucune version enregistrée pour l’instant. L’historique se remplit dès qu’un cours est modifié.' }));
      shown.forEach(c => list.appendChild(h('button', { class: 'item' + (current === c.id ? ' on' : ''), onclick: () => { current = c.id; drawList(); showChapter(c); } }, [
        h('b', { text: c.chapter }), h('div', { class: 'muted', text: c.subject + ' · ' + c.versions.length + ' version' + (c.versions.length > 1 ? 's' : '') + (c.versions[0] ? ' · ' + ago(c.versions[0].archived_at) : '') }),
        deleted.has(c.id) ? h('span', { class: 'pill del', text: 'supprimé' }) : null])));
    }
    async function showChapter(c) {
      detail.replaceChildren(h('div', { class: 'empty', text: 'Chargement…' }));
      const cur = await sb().from('bacmaster_chapters').select('content,deleted,updated_at,updated_by').eq('id', c.id).maybeSingle();
      const card = h('div', { class: 'card' }), frame = h('div');
      card.appendChild(h('div', { class: 'row' }, [h('div', { class: 'grow' }, [h('b', { text: c.chapter }), h('div', { class: 'muted', text: c.subject })]), deleted.has(c.id) ? h('span', { class: 'pill del', text: 'supprimé' }) : null]));
      if (cur.data && !cur.data.deleted) card.appendChild(h('div', { class: 'row' }, [h('div', { class: 'grow' }, [h('b', { text: 'Version actuelle' }), h('div', { class: 'muted', text: 'Modifiée par ' + who(cur.data.updated_by) + ' · ' + fmt(cur.data.updated_at) })]), h('button', { class: 'btn', text: '👁 Voir', onclick: () => preview(frame, cur.data.content, 'Version actuelle') })]));
      if (!c.versions.length) card.appendChild(h('div', { class: 'empty', text: 'Aucune ancienne version enregistrée pour ce cours.' }));
      c.versions.forEach(v => card.appendChild(h('div', { class: 'row' }, [
        h('div', { class: 'grow' }, [h('b', { text: fmt(v.saved_at || v.archived_at) }), h('div', { class: 'muted', text: 'Écrite par ' + who(v.saved_by) + ' · archivée ' + ago(v.archived_at) })]),
        h('button', { class: 'btn', text: '👁 Voir', onclick: async () => { const r = await sb().from('bacmaster_chapters_history').select('content').eq('id', v.id).maybeSingle(); if (r.error || !r.data) return say('Lecture impossible.', true); preview(frame, r.data.content, 'Version du ' + fmt(v.saved_at || v.archived_at)); } }),
        h('button', { class: 'btn pri', text: '↩️ Restaurer', onclick: () => restore(c, v) })])));
      detail.replaceChildren(card, frame);
    }
    function preview(frame, content, title) {
      const cours = (content && content.cours) || '';
      const cards = (content && content.flashcards || []).length, ex = (content && content.exercices || []).length;
      const f = h('iframe', { sandbox: '', title });   // aucun script ne peut s'exécuter dans l'aperçu
      f.srcdoc = '<meta charset="utf-8"><style>body{font:15px/1.55 system-ui,sans-serif;color:#18233d;padding:14px}img{max-width:100%}</style>' + (cours || '<i>(cours vide)</i>');
      frame.replaceChildren(h('p', { class: 'muted', text: title + ' · ' + cards + ' carte' + (cards > 1 ? 's' : '') + ' · ' + ex + ' exercice' + (ex > 1 ? 's' : '') }), f);
    }
    async function restore(c, v) {
      if (!confirm('Restaurer la version du ' + fmt(v.saved_at || v.archived_at) + ' pour « ' + c.chapter + ' » ?\nLa version actuelle sera gardée dans l’historique.')) return;
      const [ver, cur] = await Promise.all([sb().from('bacmaster_chapters_history').select('content').eq('id', v.id).maybeSingle(), sb().from('bacmaster_chapters').select('content,deleted,updated_at,updated_by').eq('id', c.id).maybeSingle()]);
      if (ver.error || !ver.data) return say('Lecture de la version impossible.', true);
      if (cur.data && !cur.data.deleted) {
        const ins = await sb().from('bacmaster_chapters_history').insert({ chapter_id: c.id, subject: c.subject, chapter: c.chapter, content: cur.data.content, saved_by: cur.data.updated_by, saved_at: cur.data.updated_at });
        if (ins.error && !confirm('La version actuelle n’a pas pu être archivée (' + ins.error.message + '). Restaurer quand même ?')) return;
      }
      const up = await sb().from('bacmaster_chapters').upsert([{ id: c.id, subject: c.subject, chapter: c.chapter, content: ver.data.content, deleted: false }], { onConflict: 'id' });
      if (up.error) return say('Restauration refusée : ' + up.error.message, true);
      say('Cours restauré. Les appareils se mettent à jour automatiquement.'); renderHistory();
    }
    search.addEventListener('input', drawList); drawList();
    detail.appendChild(h('div', { class: 'empty', text: 'Choisis un cours à gauche pour voir ses versions.' }));
    body.replaceChildren(h('div', { class: 'note', text: 'Une ancienne version est archivée avant chaque modification (au plus toutes les 10 minutes par cours) et toujours avant une suppression.' }), search, h('div', { class: 'hist' }, [list, detail]));
  }

  // ───────────────────────── Présence en direct ─────────────────────────
  let pch = null, ptimer = null, psig = '', pready = false;
  function loc() {
    try { return { subject: curSubject || '', chapter: curChapter || '', editing: !!document.getElementById('editor') && !!curChapter }; }
    catch (e) { return { subject: '', chapter: '', editing: false }; }
  }
  function others() {
    if (!pch) return [];
    const st = pch.presenceState(), me = S() && S().user && S().user.id, out = [];
    Object.entries(st).forEach(([k, metas]) => { if (k === me || !metas.length) return; const m = metas[metas.length - 1]; out.push({ id: k, ...m }); });
    return out;
  }
  const onlineList = others;
  async function track(force) {
    if (!pch || !pready) return; const l = loc(), sig = JSON.stringify(l);
    if (!force && sig === psig) return; psig = sig;
    try { await pch.track({ ...l, name: S().displayName || 'Quelqu’un', role: S().role, at: Date.now() }); } catch (e) { /* ignore */ }
  }
  function renderPresence() {
    let el = $('bm-presence'); if (!el) { addStyles(); el = h('div', { id: 'bm-presence', hidden: '', role: 'status' }); document.body.appendChild(el); }
    const l = loc(), same = l.chapter ? others().filter(o => o.subject === l.subject && o.chapter === l.chapter) : [];
    if (!same.length) { el.hidden = true; return; }
    const ed = same.filter(o => o.editing).map(o => o.name), rd = same.filter(o => !o.editing).map(o => o.name);
    const parts = []; if (ed.length) parts.push('✏️ ' + ed.join(', ') + (ed.length > 1 ? ' modifient' : ' modifie') + ' ce chapitre');
    if (rd.length) parts.push('👀 ' + rd.join(', ') + (rd.length > 1 ? ' le lisent' : ' le lit'));
    el.replaceChildren(h('span', { class: 'pd' }), h('span', { text: parts.join(' · ') })); el.hidden = false;
  }
  function startPresence() {
    stopPresence(); if (!sb() || !S().user) return;
    pch = sb().channel('bacmaster-presence', { config: { presence: { key: S().user.id } } });
    pch.on('presence', { event: 'sync' }, renderPresence).subscribe(st => { if (st === 'SUBSCRIBED') { pready = true; track(true); } });
    ptimer = setInterval(() => { track(false); renderPresence(); }, 2500);
  }
  function stopPresence() {
    clearInterval(ptimer); ptimer = null; pready = false; psig = '';
    if (pch && sb()) { try { sb().removeChannel(pch); } catch (e) { /* ignore */ } }
    pch = null; const el = $('bm-presence'); if (el) el.hidden = true;
  }

  // ───────────────────────── Menu latéral ─────────────────────────
  function refreshSidebar() {
    let b = $('bm-sidebar-admin');
    const isAdmin = S() && S().user && S().role === 'admin';
    if (!b) {
      const wrap = document.querySelector('.bm-sidebar-account-wrap'); if (!wrap) return;
      addStyles(); b = h('button', { id: 'bm-sidebar-admin', type: 'button', hidden: '', text: '⚙️ Administration', onclick: openAdmin }); wrap.appendChild(b);
    }
    b.hidden = !isAdmin;
  }
  window.BacMasterUI = {
    openAdmin,
    onConnect() { refreshSidebar(); startPresence(); },
    onDisconnect() { stopPresence(); const b = $('bm-sidebar-admin'); if (b) b.hidden = true; const a = $('bm-adm'); if (a) a.hidden = true; }
  };
})();
