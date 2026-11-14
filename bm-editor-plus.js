/* ============================================================
   BacMaster — bm-editor-plus.js
   Compléments de l'éditeur de cours :
   • images : bouton « Image », collage (Ctrl+V) et glisser-déposer, réduites et compressées
     (1000 px max, JPEG) pour ne pas alourdir la synchronisation ; clic sur une image = taille / suppression
   • aperçu en direct (formules LaTeX affichées) : panneau à droite sur grand écran, bascule sur petit écran
   • compteur de mots
   Ne touche pas au moteur d'enregistrement : on déclenche simplement l'évènement « input » de l'éditeur.
   ============================================================ */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const toast = m => { try { showToast(m, 'warn'); } catch (e) { console.warn(m); } };
  const narrowScreen = () => window.matchMedia('(max-width:640px)').matches;
  let previewOn = false, prevTimer = null, imgTarget = null;

  /* ---------- images ---------- */
  function readImage(file) {
    return new Promise((resolve, reject) => {
      if (!file || !/^image\//.test(file.type)) return reject(new Error('Ce fichier n’est pas une image.'));
      if (file.size > 20 * 1024 * 1024) return reject(new Error('Image trop lourde (20 Mo maximum).'));
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => {
        const MAX = 1000, k = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * k)), h = Math.max(1, Math.round(img.naturalHeight * k));
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url); resolve(c.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Impossible de lire cette image.')); };
      img.src = url;
    });
  }
  function caretInEditor(ed) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && ed.contains(sel.anchorNode)) return;
    const r = document.createRange(); r.selectNodeContents(ed); r.collapse(false);
    sel.removeAllRanges(); sel.addRange(r);
  }
  async function insertFiles(files) {
    const ed = $('editor'); if (!ed) return;
    for (const f of files) {
      try {
        const data = await readImage(f);
        ed.focus(); try { restoreEditorSelection(); } catch (e) { /* ignore */ } caretInEditor(ed);
        document.execCommand('insertHTML', false,
          `<div class="user-graph"><img src="${data}" alt="Image du cours" style="width:70%"><p class="user-graph-caption">Légende (clique pour la modifier)</p></div><p><br></p>`);
        ed.dispatchEvent(new Event('input', { bubbles: true }));
      } catch (err) { toast(err.message || 'Image non insérée.'); }
    }
  }
  const imgFiles = dt => Array.from((dt && dt.files) || []).filter(f => /^image\//.test(f.type));
  // collage d'une image (avant le collage « texte brut » de script.js)
  document.addEventListener('paste', e => {
    const ed = $('editor'); if (!ed || !ed.contains(e.target)) return;
    const f = imgFiles(e.clipboardData); if (!f.length) return;
    e.preventDefault(); e.stopImmediatePropagation(); insertFiles(f);
  }, true);
  document.addEventListener('dragover', e => { const ed = $('editor'); if (ed && ed.contains(e.target) && imgFiles(e.dataTransfer).length) e.preventDefault(); });
  document.addEventListener('drop', e => {
    const ed = $('editor'); if (!ed || !ed.contains(e.target)) return;
    const f = imgFiles(e.dataTransfer); if (!f.length) return;
    e.preventDefault();
    try { const r = document.caretRangeFromPoint(e.clientX, e.clientY); if (r) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } } catch (x) { /* ignore */ }
    insertFiles(f);
  });

  /* ---------- barre flottante sur une image ---------- */
  function bar() {
    let b = $('bm-imgbar');
    if (!b) {
      b = document.createElement('div'); b.id = 'bm-imgbar'; b.hidden = true;
      b.innerHTML = '<button type="button" data-w="35%">Petite</button><button type="button" data-w="60%">Moyenne</button><button type="button" data-w="100%">Grande</button><button type="button" data-del="1" class="del">🗑 Supprimer</button>';
      b.addEventListener('mousedown', e => e.preventDefault());
      b.addEventListener('click', e => {
        const t = e.target.closest('button'); if (!t || !imgTarget) return;
        const ed = $('editor');
        if (t.dataset.del) { const box = imgTarget.closest('.user-graph') || imgTarget; box.remove(); }
        else imgTarget.style.width = t.dataset.w;
        b.hidden = true; imgTarget = null;
        if (ed) ed.dispatchEvent(new Event('input', { bubbles: true }));
      });
      document.body.appendChild(b);
    }
    return b;
  }
  document.addEventListener('click', e => {
    const ed = $('editor'), b = $('bm-imgbar');
    const img = ed && e.target.tagName === 'IMG' && ed.contains(e.target) ? e.target : null;
    if (!img) { if (b && !e.target.closest('#bm-imgbar')) b.hidden = true; return; }
    imgTarget = img; const bb = bar(), r = img.getBoundingClientRect();
    bb.hidden = false; bb.style.top = Math.max(8, r.top - 46) + 'px'; bb.style.left = Math.max(8, Math.min(window.innerWidth - 300, r.left)) + 'px';
  });
  window.addEventListener('scroll', () => { const b = $('bm-imgbar'); if (b) b.hidden = true; }, true);

  /* ---------- aperçu en direct + compteur de mots ---------- */
  function updatePreview() {
    const ed = $('editor'), pv = $('bm-preview'); if (!ed || !pv || !previewOn) return;
    pv.innerHTML = ed.innerHTML || '<p style="color:var(--muted)">Rien à afficher pour l’instant.</p>';
    pv.querySelectorAll('[contenteditable]').forEach(n => n.removeAttribute('contenteditable'));
    try { typesetMath(pv); } catch (e) { /* MathJax pas prêt */ }
  }
  function updateCount() {
    const ed = $('editor'), b = $('bm-prevbtn'); if (!ed || !b) return;
    const n = (ed.innerText || '').trim().split(/\s+/).filter(Boolean).length;
    b.title = 'Aperçu avec les formules affichées — ' + n + ' mot' + (n > 1 ? 's' : '') + ' · ' + Math.max(1, Math.round(n / 200)) + ' min de lecture';
  }
  function setPreview(on) {
    previewOn = on; document.body.classList.toggle('bm-prev-on', on);
    const btn = $('bm-prevbtn'); if (btn) { btn.classList.toggle('is-on', on); btn.textContent = on ? (narrowScreen() ? '✏️' : '✏️ Éditer') : (narrowScreen() ? '👁' : '👁 Aperçu'); }
    let pv = $('bm-preview');
    if (on && !pv) {
      const ed = $('editor'); if (!ed) return;
      pv = document.createElement('div'); pv.id = 'bm-preview'; pv.className = 'cours-body bm-preview'; ed.parentNode.insertBefore(pv, ed.nextSibling);
    }
    if (pv) pv.hidden = !on;
    if (on) updatePreview();
  }
  document.addEventListener('input', e => {
    if (e.target && e.target.id === 'editor') {
      updateCount(); clearTimeout(prevTimer); prevTimer = setTimeout(updatePreview, 400);
    }
  });
  document.addEventListener('click', e => {
    const p = e.target.closest && e.target.closest('#bm-prevbtn'); if (p) return setPreview(!previewOn);
    const i = e.target.closest && e.target.closest('#bm-imgbtn'); if (i) { const f = $('bm-imgfile'); if (f) f.click(); }
  });

  /* ---------- injection dans le ruban (créé par bm-editor.js à chaque ouverture de l'éditeur) ---------- */
  function inject() {
    const rb = $('bm-ribbon'); if (!rb || $('bm-imgbtn')) return;
    const panel = rb.querySelector('[data-rb-panel="insert"]');
    if (panel) {
      const g = document.createElement('div'); g.className = 'rb-group';
      g.innerHTML = '<div class="rb-row"><button type="button" class="rb-big" id="bm-imgbtn" title="Insérer une photo ou une image (tu peux aussi la coller ou la glisser dans le cours)">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 9"/></svg><span>Image</span></button>' +
        '<input type="file" id="bm-imgfile" accept="image/*" multiple hidden></div><div class="rb-glabel">Images</div>';
      panel.insertBefore(g, panel.firstChild);
      g.querySelector('#bm-imgfile').addEventListener('change', e => { const fs = Array.from(e.target.files || []); e.target.value = ''; insertFiles(fs); });
    }
    const top = rb.querySelector('.rb-top'), sb = $('sbtn');
    if (top && sb) {
      const b = document.createElement('button'); b.type = 'button'; b.id = 'bm-prevbtn'; b.className = 'rb-prev'; b.textContent = narrowScreen() ? '👁' : '👁 Aperçu';
      top.insertBefore(b, sb);
    }
    updateCount();
    if (previewOn) setPreview(true);
  }
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', inject);
})();
