/* ============================================================
   BacMaster — bm-editor.js
   Ruban de l'éditeur de cours « à la Word » : onglets Accueil / Insertion / Maths,
   groupes Police · Paragraphe · Styles, boutons qui s'allument selon la sélection.
   Fournit bmRibbonHTML() à script.js ; réutilise ses fonctions d'édition.
   ============================================================ */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const I = {   // icônes (traits fins, héritent de la couleur du texte)
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>', redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/>',
    ul: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="18" r="1" fill="currentColor"/>',
    ol: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M4 4.5 5.5 4v4M4 11.5h2.5L4 14.5h2.6M4 17.5h2.4L5 18.5l1.4 1H4" stroke-width="1.3"/>',
    indent: '<path d="M3 5h18M11 10h10M11 15h10M3 20h18"/><path d="m3 9 4 3-4 3z" fill="currentColor"/>', outdent: '<path d="M3 5h18M11 10h10M11 15h10M3 20h18"/><path d="m7 9-4 3 4 3z" fill="currentColor"/>',
    left: '<path d="M3 6h18M3 11h11M3 16h18M3 21h11"/>', center: '<path d="M3 6h18M7 11h10M3 16h18M7 21h10"/>', right: '<path d="M3 6h18M10 11h11M3 16h18M10 21h11"/>', just: '<path d="M3 6h18M3 11h18M3 16h18M3 21h18"/>',
    eraser: '<path d="m7 21-4-4a2 2 0 0 1 0-3l10-10a2 2 0 0 1 3 0l5 5a2 2 0 0 1 0 3l-8 9"/><path d="M7 21h13M6 11l7 7"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16M15 4v16"/>', chart: '<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14h4"/>',
    marker: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 5-3-3L8 13l3 3z"/>', box: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 10h10M7 14h6"/>'
  };
  const svg = n => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
  const btn = (cmd, inner, title, extra) => `<button type="button" class="rb-btn ${extra || ''}" data-rb-cmd="${cmd}" title="${title}" aria-label="${title}">${inner}</button>`;
  const TXT = ['#0e1525', '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0891b2', '#2563eb', '#7c3aed', '#db2777', '#6b7280'];
  const HL = ['#fef08a', '#bbf7d0', '#bae6fd', '#fbcfe8', '#fed7aa', '#e9d5ff', '#fecaca', '#e5e7eb'];
  const pal = (kind, colors) => `<div class="rb-pop" data-pop="${kind}" hidden>${colors.map(c => `<button type="button" class="rb-sw" data-rb-${kind}="${c}" style="background:${c}" title="${c}" aria-label="Couleur ${c}"></button>`).join('')}<label class="rb-sw custom" title="Autre couleur">＋<input type="color" data-rb-${kind}-custom></label>${kind === 'hl' ? '<button type="button" class="rb-sw none" data-rb-hl="transparent" title="Aucun surlignage">∅</button>' : ''}</div>`;
  const group = (label, body) => `<div class="rb-group"><div class="rb-row">${body}</div><div class="rb-glabel">${label}</div></div>`;
  const sym = (s, t) => `<button type="button" class="rb-btn txt" data-rb-sym="${s}" title="${t}">${s}</button>`;

  window.bmRibbonHTML = function () {
    const sizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40].map(s => `<option value="${s}">${s}</option>`).join('');
    const tbl = Array.from({ length: 48 }, (_, i) => `<i data-r="${Math.floor(i / 8) + 1}" data-c="${i % 8 + 1}"></i>`).join('');
    return `<div class="editor-toolbar-sticky rb" id="bm-ribbon">
      <div class="rb-top">
        ${btn('undo', svg('undo'), 'Annuler (Ctrl+Z)', 'quick')}${btn('redo', svg('redo'), 'Rétablir (Ctrl+Y)', 'quick')}
        <div class="rb-tabs" role="tablist">
          <button type="button" class="rb-tab on" role="tab" data-rb-tab="home">Accueil</button>
          <button type="button" class="rb-tab" role="tab" data-rb-tab="insert">Insertion</button>
          <button type="button" class="rb-tab" role="tab" data-rb-tab="maths">Maths</button>
        </div>
        <span class="save-status" id="sbtn" role="status">✅ Enregistré automatiquement</span>
      </div>
      <div class="rb-panel" data-rb-panel="home">
        ${group('Police',
          `<select class="rb-size" id="rb-size" title="Taille du texte" aria-label="Taille du texte"><option value="" selected>16</option>${sizes}</select>`
          + btn('bold', '<b>G</b>', 'Gras (Ctrl+B)', 'txt') + btn('italic', '<i>I</i>', 'Italique (Ctrl+I)', 'txt') + btn('underline', '<u>S</u>', 'Souligné (Ctrl+U)', 'txt') + btn('strikeThrough', '<s>ab</s>', 'Barré', 'txt')
          + btn('superscript', 'x²', 'Exposant', 'txt') + btn('subscript', 'x₂', 'Indice', 'txt')
          + `<span class="rb-sep"></span><span class="rb-popwrap"><button type="button" class="rb-btn txt" data-rb-open="txt" title="Couleur du texte" aria-label="Couleur du texte"><span class="rb-A">A</span><span class="rb-bar" id="rb-txtbar" style="background:#dc2626"></span></button>${pal('txt', TXT)}</span>`
          + `<span class="rb-popwrap"><button type="button" class="rb-btn" data-rb-open="hl" title="Surligner" aria-label="Surligner">${svg('marker')}<span class="rb-bar" id="rb-hlbar" style="background:#fef08a"></span></button>${pal('hl', HL)}</span>`
          + btn('removeFormat', svg('eraser'), 'Effacer la mise en forme'))}
        ${group('Paragraphe',
          btn('insertUnorderedList', svg('ul'), 'Liste à puces') + btn('insertOrderedList', svg('ol'), 'Liste numérotée') + btn('outdent', svg('outdent'), 'Diminuer le retrait') + btn('indent', svg('indent'), 'Augmenter le retrait')
          + `<span class="rb-sep"></span>` + btn('justifyLeft', svg('left'), 'Aligner à gauche') + btn('justifyCenter', svg('center'), 'Centrer') + btn('justifyRight', svg('right'), 'Aligner à droite') + btn('justifyFull', svg('just'), 'Justifier'))}
        ${group('Style', `<select class="rb-stylesel" id="rb-style" title="Style du paragraphe" aria-label="Style du paragraphe"><option value="P">Normal</option><option value="H3">Titre 1</option><option value="H4">Titre 2</option></select>`)}
      </div>
      <div class="rb-panel" data-rb-panel="insert" hidden>
        ${group('Tableaux & graphiques',
          `<span class="rb-popwrap"><button type="button" class="rb-big" data-rb-open="tbl" title="Insérer un tableau">${svg('table')}<span>Tableau</span></button><div class="rb-pop rb-tblpop" data-pop="tbl" hidden><div class="rb-tblgrid" id="rb-tblgrid">${tbl}</div><div class="rb-tbllbl" id="rb-tbllbl">Choisis la taille</div></div></span>`
          + `<button type="button" class="rb-big" data-rb-act="graph" title="Tracer un graphique de fonction">${svg('chart')}<span>Graphique</span></button>`)}
        ${group('Encadrés',
          `<button type="button" class="rb-box formula" data-rb-box="formula-box" title="Encadré bleu — formule / point clé">🔷<span>Formule</span></button>`
          + `<button type="button" class="rb-box retenir" data-rb-box="retenir-box" title="Encadré jaune — à retenir">⭐<span>À retenir</span></button>`
          + `<button type="button" class="rb-box attention" data-rb-box="attention-box" title="Encadré rouge — attention / piège">⚠️<span>Attention</span></button>`)}
        ${group('Liens & aide',
          `<span class="rb-popwrap"><button type="button" class="rb-big" data-rb-open="link" title="Insérer un lien">${svg('link')}<span>Lien</span></button><div class="rb-pop rb-linkpop" data-pop="link" hidden><input type="url" id="rb-url" placeholder="https://…" aria-label="Adresse du lien"><button type="button" class="rb-ok" data-rb-act="linkok">OK</button></div></span>`
          + `<button type="button" class="rb-big" data-rb-act="term" title="Sélectionne un mot puis clique pour ajouter une explication au clic">${svg('chat')}<span>Terme expliqué</span></button>`)}
      </div>
      <div class="rb-panel" data-rb-panel="maths" hidden>
        ${group('Opérations', ['√:Racine carrée', '×:Multiplier', '÷:Diviser', '±:Plus ou moins', '≤:Inférieur ou égal', '≥:Supérieur ou égal', '≠:Différent', '≈:Environ égal'].map(x => sym(...x.split(':'))).join(''))}
        ${group('Symboles', ['π:Pi', 'Δ:Delta', '°:Degré', '∞:Infini', 'α:Alpha', 'β:Bêta', 'θ:Thêta', 'Ω:Oméga', 'µ:Micro'].map(x => sym(...x.split(':'))).join(''))}
        ${group('Puissances & fractions',
          `<button type="button" class="rb-btn txt" data-rb-act="pow2" title="Carré">x²</button><button type="button" class="rb-btn txt" data-rb-act="pow3" title="Cube">x³</button>`
          + btn('superscript', 'xⁿ', 'Exposant (tape ensuite le chiffre)', 'txt') + btn('subscript', 'xₙ', 'Indice (tape ensuite le chiffre)', 'txt')
          + `<button type="button" class="rb-btn txt" data-rb-act="ten" title="×10 avec exposant">×10ⁿ</button><button type="button" class="rb-btn txt" data-rb-act="frac" title="Fraction a/b">a⁄b</button>`)}
      </div>
    </div>`;
  };

  // ── actions ──
  function run(fn) { try { fn(); } catch (e) { console.warn('[BacMaster ruban]', e); } }
  function closePops(except) { document.querySelectorAll('#bm-ribbon .rb-pop').forEach(p => { if (p !== except) p.hidden = true; }); }
  function insertTableRC(r, c) {
    let html = '<table class="user-table"><tbody>';
    for (let i = 0; i < r; i++) { html += '<tr>'; for (let j = 0; j < c; j++) html += '<td>&nbsp;</td>'; html += '</tr>'; }
    restoreEditorSelection(); document.execCommand('insertHTML', false, html + '</tbody></table><p><br></p>');
  }
  document.addEventListener('mousedown', e => { if (e.target.closest('#bm-ribbon') && !e.target.closest('select,input,label')) e.preventDefault(); });   // garde la sélection dans le texte
  document.addEventListener('click', e => {
    const t = e.target, rb = t.closest('#bm-ribbon'); if (!rb) { closePops(); return; }
    let el;
    if ((el = t.closest('[data-rb-tab]'))) { rb.querySelectorAll('.rb-tab').forEach(b => b.classList.toggle('on', b === el)); rb.querySelectorAll('.rb-panel').forEach(p => p.hidden = p.dataset.rbPanel !== el.dataset.rbTab); closePops(); return; }
    if ((el = t.closest('[data-rb-open]'))) { const pop = el.parentElement.querySelector('.rb-pop'); const show = pop.hidden; closePops(pop); pop.hidden = !show; if (el.dataset.rbOpen === 'link' && show) { setTimeout(() => { const u = $('rb-url'); u && u.focus(); }, 30); } return; }
    if ((el = t.closest('[data-rb-cmd]'))) { closePops(); return run(() => fmt(el.dataset.rbCmd)); }
    if ((el = t.closest('[data-rb-style]'))) return run(() => applyHeading(el.dataset.rbStyle));
    if ((el = t.closest('[data-rb-box]'))) return run(() => insertColorBox(el.dataset.rbBox));
    if ((el = t.closest('[data-rb-sym]'))) return run(() => insertSymbol(el.dataset.rbSym));
    if ((el = t.closest('[data-rb-txt]'))) { closePops(); run(() => fmt('foreColor', el.dataset.rbTxt)); const b = $('rb-txtbar'); if (b) b.style.background = el.dataset.rbTxt; return; }
    if ((el = t.closest('[data-rb-hl]'))) { closePops(); run(() => { restoreEditorSelection(); document.execCommand('hiliteColor', false, el.dataset.rbHl); }); const b = $('rb-hlbar'); if (b) b.style.background = el.dataset.rbHl === 'transparent' ? '#fff' : el.dataset.rbHl; return; }
    if ((el = t.closest('.rb-tblgrid i'))) { closePops(); return run(() => insertTableRC(+el.dataset.r, +el.dataset.c)); }
    if ((el = t.closest('[data-rb-act]'))) {
      const a = el.dataset.rbAct;
      if (a === 'graph') return run(openGraphTool); if (a === 'term') return run(insertTermTooltip);
      if (a === 'pow2') return run(() => insertPow(2)); if (a === 'pow3') return run(() => insertPow(3));
      if (a === 'ten') return run(insertTenPow); if (a === 'frac') return run(insertFraction);
      if (a === 'linkok') { const u = ($('rb-url').value || '').trim(); if (/^https?:\/\//i.test(u)) { closePops(); run(() => fmt('createLink', u)); $('rb-url').value = ''; } else showToast('Colle une adresse qui commence par https://', 'warn'); return; }
    }
  });
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'rb-size') { const v = t.value; run(() => applyFontSize(v)); }
    else if (t.id === 'rb-style') { const v = t.value; run(() => applyHeading(v)); }
    else if (t.matches && t.matches('[data-rb-txt-custom]')) { run(() => fmt('foreColor', t.value)); closePops(); }
    else if (t.matches && t.matches('[data-rb-hl-custom]')) { run(() => { restoreEditorSelection(); document.execCommand('hiliteColor', false, t.value); }); closePops(); }
  });
  // grille de choix du tableau (survol)
  document.addEventListener('mouseover', e => {
    const c = e.target.closest && e.target.closest('.rb-tblgrid i'); if (!c) return;
    const r = +c.dataset.r, k = +c.dataset.c, lbl = $('rb-tbllbl');
    document.querySelectorAll('#rb-tblgrid i').forEach(i => i.classList.toggle('on', +i.dataset.r <= r && +i.dataset.c <= k));
    if (lbl) lbl.textContent = `${r} × ${k}`;
  });
  // les boutons s'allument selon le texte sélectionné
  document.addEventListener('selectionchange', () => {
    const ed = $('editor'), rb = $('bm-ribbon'); if (!ed || !rb) return;
    const sel = window.getSelection(); if (!sel || !sel.rangeCount || !ed.contains(sel.anchorNode)) return;
    ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'].forEach(c => {
      let on = false; try { on = document.queryCommandState(c); } catch (e) { /* ignore */ }
      rb.querySelectorAll(`[data-rb-cmd="${c}"]`).forEach(b => b.classList.toggle('on', on));
    });
    let n = sel.anchorNode; n = n && n.nodeType === 3 ? n.parentElement : n;
    const block = n && n.closest ? (n.closest('h3') ? 'H3' : n.closest('h4') ? 'H4' : 'P') : 'P';
    const ss = $('rb-style'); if (ss) ss.value = block;
    const size = n ? Math.round(parseFloat(getComputedStyle(n).fontSize)) : 0, s = $('rb-size');
    if (s && size) { const o = [...s.options].find(x => +x.value === size); s.selectedIndex = o ? [...s.options].indexOf(o) : 0; if (!o) s.options[0].textContent = size; }
  });
})();
