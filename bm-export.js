/* ============================================================
   BacMaster — bm-export.js
   Export d'une fiche (cours + flashcards + exercices) dans un document
   complètement isolé de l'interface : aucune barre, aucun bouton, mise en
   page propre aux couleurs de BacMaster. Impression / PDF ou fichier .html
   à partager entre élèves.
   ============================================================ */
(function () {
  'use strict';
  const E = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const plain = h => String(h || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const CSS = `
  :root{--ink:#1f2937;--muted:#6b7280;--accent:#0f766e;--gold:#b7791f;--line:#e5e7eb}
  *{box-sizing:border-box}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{margin:0;background:#f4f1ea;color:var(--ink);font:16px/1.65 "Segoe UI",system-ui,-apple-system,Helvetica,Arial,sans-serif}
  .sheet{max-width:820px;margin:0 auto;background:#fff;padding:34px 44px 40px}
  .brand{display:flex;align-items:center;gap:12px;border-bottom:3px solid var(--accent);padding-bottom:14px;margin-bottom:22px}
  .pill{width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,#4f46e5,#0d9488);color:#fff;font-weight:800;display:grid;place-items:center;font-size:15px}
  .brand b{font-size:15px;letter-spacing:.02em}.brand small{display:block;color:var(--muted);font-size:12px}
  .brand .date{margin-left:auto;color:var(--muted);font-size:12px;text-align:right}
  .eyebrow{color:var(--gold);font-weight:700;font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin:0}
  h1{font-size:28px;line-height:1.2;margin:4px 0 18px;color:#111827}
  h2{font-size:20px;margin:30px 0 10px;color:var(--accent);border-bottom:1px solid var(--line);padding-bottom:6px;break-after:avoid}
  h3{font-size:17px;margin:22px 0 6px;color:#111827;break-after:avoid}h4{margin:14px 0 4px}
  p{margin:8px 0}ul,ol{padding-left:22px}li{margin:3px 0}
  mark{background:#fef3c7;padding:0 3px;border-radius:3px}code,pre{font-family:Consolas,"Courier New",monospace;background:#f3f4f6;border-radius:5px}
  code{padding:1px 5px;font-size:.92em}pre{padding:10px 12px;overflow:auto;white-space:pre-wrap}
  table{border-collapse:collapse;width:100%;margin:12px 0;font-size:.95em}th,td{border:1px solid #d1d5db;padding:6px 9px;text-align:left;vertical-align:top}th{background:#ecfdf5}
  .formula-box,.retenir-box,.attention-box,.latex-block,.analyse-lineaire-box{border-left:4px solid var(--accent);background:#f0fdfa;border-radius:8px;padding:10px 14px;margin:12px 0;break-inside:avoid}
  .attention-box{border-color:#dc2626;background:#fef2f2}.retenir-box{border-color:var(--gold);background:#fffbeb}
  .fig{break-inside:avoid}img,svg{max-width:100%;height:auto}
  details{margin:8px 0}summary{font-weight:600}
  button,.frise-back,.frise-back-link{display:none!important}
  .qa{border:1px solid var(--line);border-radius:10px;padding:9px 13px;margin:8px 0;break-inside:avoid}.qa .q{font-weight:700}.qa .a{color:#374151;margin-top:3px}
  .exo{border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin:10px 0;break-inside:avoid}.exo .lvl{font-size:12px;color:var(--gold);font-weight:700;text-transform:uppercase}
  .exo .corr{margin-top:8px;padding-top:8px;border-top:1px dashed #cbd5e1;color:#374151}
  footer{margin-top:34px;padding-top:12px;border-top:1px solid var(--line);color:var(--muted);font-size:12px;text-align:center}
  @page{size:A4;margin:14mm 12mm}
  @media print{body{background:#fff}.sheet{max-width:none;padding:0}}
  @media (max-width:640px){.sheet{padding:20px 16px}h1{font-size:23px}}`;

  function buildDoc(subject, chapter, opts) {
    const d = db[subject] && db[subject][chapter]; if (!d) return '';
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    let body = '';
    if (opts.cours) body += `<h2>📖 Cours</h2><div class="cours">${d.cours || '<p><em>Aucun cours pour ce chapitre.</em></p>'}</div>`;
    if (opts.cards && (d.flashcards || []).length) body += `<h2>🎴 Flashcards</h2>${d.flashcards.map(c => `<div class="qa"><div class="q">${E(plain(c.q))}</div><div class="a">${c.a == null ? '' : plain(c.a) ? E(plain(c.a)) : ''}</div></div>`).join('')}`;
    if (opts.exos && (d.exercices || []).length) body += `<h2>🧩 Exercices</h2>${d.exercices.map((x, i) => `<div class="exo"><div class="lvl">Exercice ${i + 1}${x.niveau ? ' · ' + E(x.niveau) : ''}</div><div>${x.enonce || ''}</div>${opts.corr && x.correction ? `<div class="corr"><b>Correction.</b> ${x.correction}</div>` : ''}</div>`).join('')}`;
    return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${E(chapter)} — ${E(subject)} · BacMaster</title><style>${CSS}</style>
<script>window.MathJax={tex:{inlineMath:[['$','$'],['\\\\(','\\\\)']],displayMath:[['$$','$$'],['\\\\[','\\\\]']]},options:{skipHtmlTags:['script','noscript','style','textarea','pre']}};<\/script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"><\/script></head><body><div class="sheet">
<div class="brand"><div class="pill">BM</div><div><b>BacMaster</b><small>Fiche de révision</small></div><div class="date">${today}</div></div>
<p class="eyebrow">${E(subject)}</p><h1>${E(chapter)}</h1>${body}<footer>Fiche générée avec BacMaster · ${E(subject)} — ${E(chapter)}</footer></div></body></html>`;
  }
  function printHtml(html) {
    const f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(f);
    const w = f.contentWindow; w.document.open(); w.document.write(html); w.document.close();
    const go = () => { try { w.focus(); w.print(); } catch (e) { /* ignore */ } setTimeout(() => f.remove(), 60000); };
    const wait = () => { const mj = w.MathJax; if (mj && mj.typesetPromise) mj.typesetPromise().then(go, go); else if (++tries < 40) setTimeout(wait, 150); else go(); };
    let tries = 0; setTimeout(wait, 300);
  }
  function download(html, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }
  function openExport() {
    if (typeof curSubject === 'undefined' || !curSubject || !curChapter) return showToast('Ouvre d’abord un cours.', 'warn');
    const subject = curSubject, chapter = curChapter, nCards = (db[subject][chapter].flashcards || []).length, nEx = (db[subject][chapter].exercices || []).length;
    let m = document.getElementById('bm-export-modal'); if (m) m.remove();
    m = document.createElement('div'); m.id = 'bm-export-modal'; m.className = 'bg-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    m.innerHTML = `<div class="bg-sheet"><div class="bg-sheet-head"><b>🖨️ Exporter la fiche</b><button class="bg-close" aria-label="Fermer">✕</button></div><div class="bg-sheet-body">
      <p class="bg-hint" style="margin-top:0"><b>${E(chapter)}</b> · ${E(subject)}<br>Le document est isolé de l’application : aucune barre ni bouton, prêt à être gardé ou partagé.</p>
      <div class="bg-row"><span><b>Cours</b></span><label class="bg-switch"><input type="checkbox" id="ex-cours" checked><i></i></label></div>
      <div class="bg-row"><span><b>Flashcards</b><small>${nCards} carte${nCards > 1 ? 's' : ''}</small></span><label class="bg-switch"><input type="checkbox" id="ex-cards" ${nCards ? '' : 'disabled'}><i></i></label></div>
      <div class="bg-row"><span><b>Exercices</b><small>${nEx} exercice${nEx > 1 ? 's' : ''}</small></span><label class="bg-switch"><input type="checkbox" id="ex-exos" ${nEx ? '' : 'disabled'}><i></i></label></div>
      <div class="bg-row"><span><b>Avec les corrections</b></span><label class="bg-switch"><input type="checkbox" id="ex-corr" checked><i></i></label></div>
      <div class="bg-actions"><button class="bg-btn pri full" id="ex-print">🖨️ Imprimer / Enregistrer en PDF</button><button class="bg-btn full" id="ex-dl">⬇️ Télécharger (.html)</button></div></div></div>`;
    document.body.appendChild(m);
    const opts = () => ({ cours: m.querySelector('#ex-cours').checked, cards: m.querySelector('#ex-cards').checked, exos: m.querySelector('#ex-exos').checked, corr: m.querySelector('#ex-corr').checked });
    const ok = o => (o.cours || o.cards || o.exos) ? true : (showToast('Choisis au moins un contenu.', 'warn'), false);
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.bg-close')) m.remove(); });
    m.querySelector('#ex-print').onclick = () => { const o = opts(); if (ok(o)) { printHtml(buildDoc(subject, chapter, o)); m.remove(); } };
    m.querySelector('#ex-dl').onclick = () => { const o = opts(); if (ok(o)) { download(buildDoc(subject, chapter, o), (subject + ' - ' + chapter).replace(/[\\/:*?"<>|]+/g, ' ').trim() + '.html'); m.remove(); } };
  }
  window.exportFiche = openExport;
  window.BacMasterExport = { buildDoc, openExport };
})();
