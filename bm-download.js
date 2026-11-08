/* ============================================================
   BacMaster — bm-download.js
   Page « Télécharger » :
   · tout le monde : choisir des cours (matières repliables) et les télécharger
     comme des fiches de cours (.html, ou impression / PDF) ;
   · administrateur seulement : fichiers .json (réimportables), archive .zip de la
     sélection, sauvegarde complète de BacMaster en .zip, import d'un .json.
   ============================================================ */
(function () {
  'use strict';
  const E = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const $ = id => document.getElementById(id);
  const sync = () => (window.BacMasterSync && BacMasterSync.api && BacMasterSync.api.state) || null;
  // Sans couche de synchronisation (copie locale), on reste libre ; avec elle, seul l'administrateur télécharge le brut.
  const isAdmin = () => { const s = sync(); return !s || s.role === 'admin'; };
  window.bmIsAdmin = isAdmin;
  const X = () => window.BacMasterExport;
  const stamp = () => dayKey(new Date());

  const SEL = new Map();            // matière → Set de chapitres cochés
  const OPEN = new Set();           // matières dépliées
  let FMT = 'html';                 // html | json | zip   (json et zip : administrateur)
  const OPT = { cours: true, cards: false, exos: false, corr: true };

  const subjects = () => CFG.filter(s => db[s.name] && Object.keys(db[s.name]).length);
  const picked = () => { const out = []; subjects().forEach(s => Object.keys(db[s.name]).forEach(ch => { if ((SEL.get(s.name) || new Set()).has(ch)) out.push([s.name, ch]); })); return out; };

  function pageHtml() {
    const admin = isAdmin(), subs = subjects();
    const list = subs.map(s => {
      const chs = Object.keys(db[s.name]), open = OPEN.has(s.name);
      return `<section class="dl-subj ${open ? 'open' : ''}" data-s="${E(s.name)}" style="--sc:var(--c-${E(s.cls || 'math')})">
        <div class="dl-row" data-act="toggle">
          <label class="dl-cb"><input type="checkbox" class="dl-subj-cb" aria-label="Tout cocher : ${E(s.name)}"><i></i></label>
          <span class="dl-ico">${s.icon}</span><span class="dl-name">${E(s.name)}</span><span class="dl-count" data-count></span>
          <button type="button" class="dl-chev" data-act="toggle" aria-label="Déplier ou replier ${E(s.name)}" aria-expanded="${open}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
        <div class="dl-chaps">${chs.map(ch => {
          const d = db[s.name][ch], nc = (d.flashcards || []).length, ne = (d.exercices || []).length;
          return `<label class="dl-chap"><span class="dl-cb"><input type="checkbox" class="dl-chap-cb" data-c="${E(ch)}"><i></i></span><span class="dl-chap-name">${E(ch)}</span><span class="dl-chap-meta">${nc ? nc + ' carte' + (nc > 1 ? 's' : '') : ''}${nc && ne ? ' · ' : ''}${ne ? ne + ' exo' + (ne > 1 ? 's' : '') : ''}</span></label>`;
        }).join('')}</div>
      </section>`;
    }).join('');
    const seg = admin ? `<div class="dl-seg" role="tablist" aria-label="Format">
        <button type="button" data-fmt="html" class="${FMT === 'html' ? 'on' : ''}">📄 Fiches</button>
        <button type="button" data-fmt="json" class="${FMT === 'json' ? 'on' : ''}">🧾 Données .json</button>
        <button type="button" data-fmt="zip" class="${FMT === 'zip' ? 'on' : ''}">🗜️ Archive .zip</button></div>` : '';
    return `<div id="dl-root" class="dl-root">
      <div class="breadcrumb"><button class="bc-btn" onclick="goHome()">🏠 Accueil</button><span class="bc-sep">›</span><span class="bc-cur">📥 Télécharger</span></div>
      <div class="ws-box dl-box">
        <div class="dl-head"><div class="dl-badge">📥</div><div><h2>Télécharger des cours</h2>
          <p>${admin ? 'Choisis des cours, puis le format. Les fichiers .json peuvent être remis dans l’application.' : 'Ouvre une matière, coche les cours qui t’intéressent et télécharge-les en fiches de cours.'}</p></div></div>
        ${seg}
        <div class="dl-tools"><button type="button" data-act="expandall">Tout déplier</button><button type="button" data-act="collapseall">Tout replier</button><button type="button" data-act="selall">Tout cocher</button><button type="button" data-act="selnone">Tout décocher</button></div>
        <div class="dl-list">${list || '<p class="dl-empty">Aucun cours à télécharger pour l’instant.</p>'}</div>
        <div class="dl-opts" id="dl-opts"></div>
        <div class="dl-bar" id="dl-bar"></div>
      </div>
      ${admin ? `<div class="ws-box dl-box dl-admin">
        <h3>📦 Sauvegarde complète</h3>
        <p>Tout BacMaster dans une archive compressée : les données (.json, toutes matières), les fiches de tous les cours (.html) et, si tu veux, les fichiers du site.</p>
        <label class="dl-check"><input type="checkbox" id="dl-site"><span>Inclure aussi les fichiers du site (code de l’application)</span></label>
        <button type="button" class="dl-btn pri" id="dl-all">📦 Télécharger tout BacMaster (.zip)</button>
        <h3 style="margin-top:22px">📥 Importer un fichier .json</h3>
        <p>Remet dans l’application un fichier exporté ou mis au propre. Les cours déjà connus sont mis à jour.</p>
        <input type="file" id="import-file-input" accept=".json" hidden onchange="handleImportFile(this)">
        <button type="button" class="dl-btn" id="dl-import">📥 Choisir un fichier .json</button>
      </div>` : ''}
    </div>`;
  }

  function optsHtml() {
    if (FMT === 'json') return '<p class="dl-note">Le fichier .json contient tout : cours, flashcards et exercices de la sélection.</p>';
    const chip = (k, label) => `<label class="dl-chip ${OPT[k] ? 'on' : ''} ${k === 'corr' && !OPT.exos ? 'dis' : ''}"><input type="checkbox" data-opt="${k}" ${OPT[k] ? 'checked' : ''} ${k === 'corr' && !OPT.exos ? 'disabled' : ''}><span>${label}</span></label>`;
    return `<div class="dl-opts-t">Contenu des fiches</div><div class="dl-chips">${chip('cours', '📖 Cours')}${chip('cards', '🎴 Flashcards')}${chip('exos', '🧩 Exercices')}${chip('corr', '✔️ Corrections')}</div>`;
  }
  function barHtml(n) {
    const admin = isAdmin(), fmt = admin ? FMT : 'html';
    const label = fmt === 'json' ? '🧾 Télécharger (.json)' : fmt === 'zip' ? '🗜️ Télécharger (.zip)' : '⬇️ Télécharger';
    return `<div class="dl-count-all"><b>${n}</b> cours sélectionné${n > 1 ? 's' : ''}</div><div class="dl-acts"><button type="button" class="dl-btn pri" id="dl-go" ${n ? '' : 'disabled'}>${label}</button>${fmt === 'html' ? `<button type="button" class="dl-btn" id="dl-print" ${n ? '' : 'disabled'}>🖨️ PDF</button>` : ''}</div>`;
  }

  function refresh() {
    const root = $('dl-root'); if (!root) return;
    root.querySelectorAll('.dl-subj').forEach(sec => {
      const s = sec.dataset.s, all = [...sec.querySelectorAll('.dl-chap-cb')], set = SEL.get(s) || new Set();
      all.forEach(cb => { cb.checked = set.has(cb.dataset.c); });
      const n = all.filter(cb => cb.checked).length, sc = sec.querySelector('.dl-subj-cb');
      sc.checked = n > 0 && n === all.length; sc.indeterminate = n > 0 && n < all.length;
      const ct = sec.querySelector('[data-count]'); ct.textContent = n ? n + '/' + all.length : all.length + ' cours'; ct.classList.toggle('on', n > 0);
      sec.classList.toggle('has', n > 0);
    });
    const n = picked().length;
    $('dl-opts').innerHTML = optsHtml(); $('dl-bar').innerHTML = barHtml(n);
  }

  function render_() {
    render(pageHtml()); bind(); refresh();
  }

  function bind() {
    const root = $('dl-root'); if (!root) return;
    root.addEventListener('click', e => {
      const t = e.target;
      const fmtBtn = t.closest('[data-fmt]'); if (fmtBtn) { FMT = fmtBtn.dataset.fmt; root.querySelectorAll('[data-fmt]').forEach(b => b.classList.toggle('on', b === fmtBtn)); refresh(); return; }
      const act = t.closest('[data-act]');
      if (act && !t.closest('.dl-cb')) {
        const a = act.dataset.act, sec = act.closest('.dl-subj');
        if (a === 'toggle' && sec) { const open = !sec.classList.contains('open'); sec.classList.toggle('open', open); open ? OPEN.add(sec.dataset.s) : OPEN.delete(sec.dataset.s); sec.querySelector('.dl-chev').setAttribute('aria-expanded', open); return; }
        if (a === 'expandall') { root.querySelectorAll('.dl-subj').forEach(x => { x.classList.add('open'); OPEN.add(x.dataset.s); x.querySelector('.dl-chev').setAttribute('aria-expanded', true); }); return; }
        if (a === 'collapseall') { root.querySelectorAll('.dl-subj').forEach(x => { x.classList.remove('open'); OPEN.delete(x.dataset.s); x.querySelector('.dl-chev').setAttribute('aria-expanded', false); }); OPEN.clear(); return; }
        if (a === 'selall') { subjects().forEach(s => SEL.set(s.name, new Set(Object.keys(db[s.name])))); refresh(); return; }
        if (a === 'selnone') { SEL.clear(); refresh(); return; }
      }
      if (t.closest('#dl-go')) return go(false);
      if (t.closest('#dl-print')) return go(true);
      if (t.closest('#dl-all')) return downloadAll(t.closest('#dl-all'));
      if (t.closest('#dl-import')) { if (!isAdmin()) return deny(); const f = $('import-file-input'); if (f) f.click(); }
    });
    root.addEventListener('change', e => {
      const t = e.target;
      if (t.classList.contains('dl-subj-cb')) { const s = t.closest('.dl-subj').dataset.s; SEL.set(s, t.checked ? new Set(Object.keys(db[s])) : new Set()); refresh(); }
      else if (t.classList.contains('dl-chap-cb')) { const s = t.closest('.dl-subj').dataset.s, set = SEL.get(s) || new Set(); t.checked ? set.add(t.dataset.c) : set.delete(t.dataset.c); SEL.set(s, set); refresh(); }
      else if (t.dataset.opt) { OPT[t.dataset.opt] = t.checked; if (t.dataset.opt === 'exos' && !t.checked) OPT.corr = true; refresh(); }
    });
  }

  function deny() { showToast('🔒 Réservé à l’administrateur.', 'warn'); }
  const fileNameFor = items => items.length === 1 ? X().safeName(items[0][1] + ' — ' + items[0][0]) : 'BacMaster — recueil (' + items.length + ' cours)';

  async function go(print) {
    const items = picked(); if (!items.length) return showToast('Coche au moins un cours.', 'warn');
    const admin = isAdmin(), fmt = admin ? FMT : 'html';
    try {
      if (fmt === 'json') {
        if (!admin) return deny();
        const out = {}; items.forEach(([s, c]) => { (out[s] = out[s] || {})[c] = db[s][c]; });
        X().downloadBlob(new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' }), 'bacmaster-export-' + stamp() + '.json');
        return showToast('🧾 Fichier .json téléchargé (' + items.length + ' cours).');
      }
      if (fmt === 'zip') {
        if (!admin) return deny();
        const btn = $('dl-go'); const files = [], used = new Set(); const o = { cours: true, cards: true, exos: true, corr: true }, data = {};
        items.forEach(([s, c]) => { (data[s] = data[s] || {})[c] = db[s][c]; let n = 'fiches/' + X().safeName(s, 60) + '/' + X().safeName(c) + '.html', k = 2; while (used.has(n)) n = n.replace(/( \(\d+\))?\.html$/, ' (' + (k++) + ').html'); used.add(n); files.push({ name: n, data: X().buildDoc(s, c, o) }); });
        files.push({ name: 'donnees/selection.json', data: JSON.stringify(data, null, 2) });
        if (btn) btn.disabled = true;
        const blob = await X().makeZip(files, (i, n) => { if (btn) btn.textContent = '🗜️ ' + i + '/' + n + '…'; });
        X().downloadBlob(blob, 'bacmaster-selection-' + stamp() + '.zip'); refresh();
        return showToast('🗜️ Archive téléchargée (' + items.length + ' cours).');
      }
      const o = { cours: OPT.cours, cards: OPT.cards, exos: OPT.exos, corr: OPT.corr && OPT.exos };
      if (!o.cours && !o.cards && !o.exos) return showToast('Choisis au moins un contenu.', 'warn');
      const doc = X().buildMulti(items, o);
      if (print) { X().printHtml(doc); return; }
      X().download(doc, fileNameFor(items) + '.html'); showToast('⬇️ ' + (items.length > 1 ? 'Recueil téléchargé' : 'Fiche téléchargée') + ' (' + items.length + ' cours).');
    } catch (e) { showToast('Erreur de téléchargement : ' + e.message, 'error'); refresh(); }
  }

  // ── Sauvegarde complète de BacMaster (administrateur) ──
  async function downloadAll(btn) {
    if (!isAdmin()) return deny();
    const label = btn.textContent; btn.disabled = true;
    try {
      const withSite = !!($('dl-site') && $('dl-site').checked), files = [], used = new Set(), all = { cours: true, cards: true, exos: true, corr: true };
      let nCh = 0;
      files.push({ name: 'donnees/bacmaster-complet.json', data: JSON.stringify(db, null, 2) });
      subjects().forEach(s => {
        files.push({ name: 'donnees/' + X().safeName(s.name, 60) + '.json', data: JSON.stringify({ [s.name]: db[s.name] }, null, 2) });
        Object.keys(db[s.name]).forEach(ch => { let n = 'fiches/' + X().safeName(s.name, 60) + '/' + X().safeName(ch) + '.html', k = 2; while (used.has(n)) n = n.replace(/( \(\d+\))?\.html$/, ' (' + (k++) + ').html'); used.add(n); files.push({ name: n, data: X().buildDoc(s.name, ch, all) }); nCh++; });
      });
      if (withSite) {
        btn.textContent = '📦 Fichiers du site…';
        try {
          const swTxt = await (await fetch('./sw.js', { cache: 'no-cache' })).text(), names = new Set(['index.html', 'sw.js', 'manifest.json']);
          for (const m of swTxt.matchAll(/'\.\/([^'?#]+\.[a-z0-9]+)'/gi)) names.add(m[1]);
          for (const f of names) { try { const r = await fetch('./' + f, { cache: 'no-cache' }); if (r.ok) files.push({ name: 'site/' + f, data: new Uint8Array(await r.arrayBuffer()) }); } catch (e) { /* fichier absent : on continue */ } }
        } catch (e) { /* le site reste facultatif */ }
      }
      files.unshift({ name: 'LISEZ-MOI.txt', data: 'Sauvegarde complète de BacMaster — ' + new Date().toLocaleString('fr-FR') + '\n\ndonnees/  : les cours en .json (bacmaster-complet.json = tout ; un fichier par matière). À remettre dans l\'application avec « Importer un fichier .json ».\nfiches/   : un document .html par cours, à ouvrir dans un navigateur (matière / cours).\n' + (withSite ? 'site/     : les fichiers de l\'application.\n' : '') + '\n' + nCh + ' cours.\n' });
      const blob = await X().makeZip(files, (i, n) => { btn.textContent = '📦 ' + i + '/' + n + '…'; });
      X().downloadBlob(blob, 'BacMaster-complet-' + stamp() + '.zip');
      showToast('📦 Sauvegarde complète téléchargée (' + nCh + ' cours).');
    } catch (e) { showToast('Erreur de sauvegarde : ' + e.message, 'error'); }
    finally { btn.disabled = false; btn.textContent = label; }
  }

  // ── Branchements : ces pages remplacent l'ancienne page d'export ; l'import et l'export brut deviennent réservés à l'administrateur ──
  window.openSync = render_;
  window.openExportPicker = render_;
  window.bmDownloadRefresh = () => { if ($('dl-root')) render_(); };
  const _import = window.handleImportFile;
  if (typeof _import === 'function') window.handleImportFile = function (input) { if (!isAdmin()) { if (input) input.value = ''; return deny(); } return _import.call(this, input); };
  const _exp = window.exportData;
  if (typeof _exp === 'function') window.exportData = function (d) { if (!isAdmin()) return deny(); return _exp.call(this, d); };
})();
