/* ============================================================
   BacMaster — bm-versions.js  (versions de secours des cours)
   Filet de sécurité LOCAL : l'appli garde sur ton appareil les 30 dernières versions
   de chaque cours que tu modifies. Si tu effaces un passage par erreur, bouton « 🕘 Versions »
   dans l'éditeur → aperçu → « Restaurer ».
   • une version est prise à l'ouverture du cours, puis au plus toutes les 90 s de frappe
   • et tout de suite AVANT une grosse suppression (le texte perd plus de 40 %)
   • restaurer ne perd rien : la version actuelle est elle-même mise de côté avant
   Stockage : IndexedDB de ton navigateur (rien n'est envoyé sur Internet). Ne touche pas à la synchro.
   ============================================================ */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const DB_NAME = 'bacmaster_versions', STORE = 'v', KEEP = 30, EVERY = 90000;
  const toast = (m, t) => { try { showToast(m, t || 'info'); } catch (e) { console.warn(m); } };
  let dbp = null, lastKey = '', lastSnapHtml = '', lastSnapAt = 0, prevHtml = '';

  /* ---------- IndexedDB (promesses) ---------- */
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error('IndexedDB indisponible'));
      const rq = indexedDB.open(DB_NAME, 1);
      rq.onupgradeneeded = () => { const s = rq.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true }); s.createIndex('k', 'k'); };
      rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error);
    });
    dbp.catch(() => { dbp = null; });
    return dbp;
  }
  const tx = (mode, fn) => open().then(d => new Promise((res, rej) => {
    const t = d.transaction(STORE, mode), s = t.objectStore(STORE); let out;
    try { out = fn(s); } catch (e) { return rej(e); }
    t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error);
  }));
  const keyOf = () => { try { return curSubject && curChapter ? curSubject + '␟' + curChapter : ''; } catch (e) { return ''; } };
  const list = k => open().then(d => new Promise((res, rej) => {
    const rq = d.transaction(STORE).objectStore(STORE).index('k').getAll(k);
    rq.onsuccess = () => res(rq.result.sort((a, b) => b.t - a.t)); rq.onerror = () => rej(rq.error);
  }));
  async function prune(k) {
    const all = await list(k);
    if (all.length > KEEP) await tx('readwrite', s => { all.slice(KEEP).forEach(v => s.delete(v.id)); });
  }

  /* ---------- prise de versions ---------- */
  const plain = h => String(h || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  async function snap(html, why) {
    const k = keyOf(); if (!k || !html || plain(html).length < 20 && !/<img/i.test(html)) return;
    if (k === lastKey && html === lastSnapHtml) return;
    lastKey = k; lastSnapHtml = html; lastSnapAt = Date.now();
    try { await tx('readwrite', s => { s.add({ k, t: Date.now(), html, n: plain(html).length, why: why || '' }); }); await prune(k); }
    catch (e) { console.warn('[BacMaster versions]', e); }
  }
  function onInput() {
    const ed = $('editor'); if (!ed) return;
    const now = ed.innerHTML, k = keyOf();
    if (k !== lastKey) { lastKey = k; lastSnapHtml = ''; lastSnapAt = 0; }
    if (prevHtml && plain(prevHtml).length > 150 && plain(now).length < plain(prevHtml).length * 0.6) snap(prevHtml, 'avant une grosse suppression');
    else if (Date.now() - lastSnapAt > EVERY) snap(now, '');
    prevHtml = now;
  }
  // nouvel éditeur ouvert (ou rechargé) : on prend une version de départ et on écoute la frappe
  let watched = null;
  function watch() {
    const ed = $('editor');
    if (!ed || ed === watched) return; watched = ed;
    prevHtml = ed.innerHTML; lastKey = ''; lastSnapHtml = ''; lastSnapAt = 0;
    snap(ed.innerHTML, 'à l’ouverture');
    ed.addEventListener('input', onInput);
  }

  /* ---------- fenêtre « Versions » ---------- */
  const fmt = t => { const d = new Date(t), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)} à ${p(d.getHours())}h${p(d.getMinutes())}`; };
  function css() {
    if ($('bm-ver-css')) return;
    const s = document.createElement('style'); s.id = 'bm-ver-css';
    s.textContent = `.rb-ver{border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.14);color:#fff;font:700 .72rem 'DM Sans',sans-serif;padding:5px 10px;border-radius:999px;cursor:pointer;white-space:nowrap;margin-left:6px}
#bm-ver{position:fixed;inset:0;z-index:10000;background:rgba(5,10,25,.6);display:flex;align-items:center;justify-content:center;padding:12px}
#bm-ver[hidden]{display:none}
#bm-ver .box{background:var(--card,#fff);color:var(--text,#111);border:1px solid var(--border,#ddd);border-radius:16px;width:min(920px,100%);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35)}
#bm-ver header{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border,#ddd);font-weight:800}
#bm-ver header span{flex:1}
#bm-ver header button,#bm-ver .go{border:0;border-radius:999px;padding:7px 14px;font:700 .8rem 'DM Sans',sans-serif;cursor:pointer;background:var(--accent,#0d9488);color:#fff}
#bm-ver header button{background:transparent;color:var(--muted,#667);font-size:1.1rem}
#bm-ver .body{display:flex;min-height:0;flex:1}
#bm-ver ul{list-style:none;margin:0;padding:6px;width:260px;overflow:auto;border-right:1px solid var(--border,#ddd);flex:none}
#bm-ver li{padding:9px 10px;border-radius:10px;cursor:pointer;font-size:.85rem;line-height:1.35}
#bm-ver li small{display:block;color:var(--muted,#667)}
#bm-ver li.on{background:rgba(13,148,136,.16);outline:1.5px solid var(--accent,#0d9488)}
#bm-ver .pv{flex:1;display:flex;flex-direction:column;min-width:0}
#bm-ver iframe{flex:1;border:0;background:#fff;min-height:240px}
#bm-ver .bar{padding:10px 14px;border-top:1px solid var(--border,#ddd);display:flex;gap:10px;align-items:center;font-size:.8rem;color:var(--muted,#667)}
#bm-ver .empty{padding:30px;text-align:center;color:var(--muted,#667);flex:1}
@media(max-width:640px){#bm-ver .body{flex-direction:column}#bm-ver ul{width:auto;max-height:34vh;border-right:0;border-bottom:1px solid var(--border,#ddd)}}`;
    document.head.appendChild(s);
  }
  async function show() {
    const ed = $('editor'), k = keyOf(); if (!ed || !k) return;
    css(); await snap(ed.innerHTML, 'avant ouverture des versions');
    let box = $('bm-ver'); if (!box) { box = document.createElement('div'); box.id = 'bm-ver'; document.body.appendChild(box); }
    box.hidden = false;
    let items = []; try { items = await list(k); } catch (e) { /* ignore */ }
    box.innerHTML = `<div class="box" role="dialog" aria-modal="true" aria-label="Versions du cours"><header><span>🕘 Versions de ce cours</span><button type="button" data-x aria-label="Fermer">✕</button></header>`
      + (items.length ? `<div class="body"><ul></ul><div class="pv"><iframe sandbox="" title="Aperçu"></iframe><div class="bar"><span id="bm-ver-info"></span><span style="flex:1"></span><button type="button" class="go" data-restore>↩️ Restaurer cette version</button></div></div></div>`
        : `<div class="empty">Pas encore de version : elles s’enregistrent automatiquement quand tu modifies un cours.</div>`) + `</div>`;
    const ul = box.querySelector('ul'), fr = box.querySelector('iframe'); let cur = null;
    function pick(v, li) {
      cur = v; ul.querySelectorAll('li').forEach(x => x.classList.toggle('on', x === li));
      fr.srcdoc = `<meta charset="utf-8"><body style="font:15px/1.6 system-ui,sans-serif;padding:14px;color:#111">${v.html}</body>`;
      box.querySelector('#bm-ver-info').textContent = `${fmt(v.t)} · ${v.n} caractères`;
    }
    items.forEach((v, i) => {
      const li = document.createElement('li'); li.innerHTML = `<b>${fmt(v.t)}</b><small>${v.n} caractères${v.why ? ' · ' + v.why : ''}</small>`;
      li.addEventListener('click', () => pick(v, li)); ul.appendChild(li); if (i === 0) pick(v, li);
    });
    box.onclick = async e => {
      if (e.target === box || e.target.closest('[data-x]')) { box.hidden = true; return; }
      if (e.target.closest('[data-restore]') && cur) {
        const ed2 = $('editor'); if (!ed2) { box.hidden = true; return; }
        if (!confirm('Remplacer le cours actuel par la version du ' + fmt(cur.t) + ' ?\nLe cours actuel est mis de côté : tu pourras le retrouver ici.')) return;
        await snap(ed2.innerHTML, 'avant restauration');
        ed2.innerHTML = cur.html; prevHtml = cur.html;
        ed2.dispatchEvent(new Event('input', { bubbles: true }));     // déclenche l'enregistrement + la synchro habituels
        box.hidden = true; toast('Version du ' + fmt(cur.t) + ' restaurée.', 'success');
      }
    };
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { const b = $('bm-ver'); if (b && !b.hidden) b.hidden = true; } });
  document.addEventListener('mousedown', e => { if (e.target.closest && e.target.closest('.rb-ver')) e.preventDefault(); });
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest('#bm-verbtn')) show(); });

  function inject() {
    watch();
    const top = document.querySelector('#bm-ribbon .rb-top');
    if (top && !$('bm-verbtn')) {
      css();
      const b = document.createElement('button'); b.type = 'button'; b.id = 'bm-verbtn'; b.className = 'rb-ver';
      b.textContent = window.matchMedia('(max-width:640px)').matches ? '🕘' : '🕘 Versions'; b.title = 'Retrouver une ancienne version de ce cours';
      top.insertBefore(b, $('sbtn') || null);
    }
  }
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', inject);
  window.bmVersions = { snap: () => { const e = $('editor'); return e ? snap(e.innerHTML, 'manuelle') : null; }, list: () => list(keyOf()) };
})();
