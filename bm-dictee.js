/* ============================================================
   BacMaster — bm-dictee.js  (dictée vocale)
   Active le micro : ce que tu dis s'écrit à l'endroit du curseur.
   • langue = celle de la matière (français, espagnol, anglais)
   • commandes : « virgule », « point » (en fin de phrase), « point d'interrogation », « à la ligne »…
   • boutons : 🎤 Dicter dans l'éditeur de cours ; petit 🎤 près des zones de réponse (auto-test, exercices)
   Utilise la reconnaissance vocale du navigateur (Chrome, Edge, Safari) : le son est traité par son service vocal.
   ============================================================ */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const BCP = { fr: 'fr-FR', es: 'es-ES', en: 'en-GB' };
  const toast = m => { try { showToast(m, 'warn'); } catch (e) { console.warn(m); } };
  const narrow = () => window.matchMedia('(max-width:640px)').matches;
  let rec = null, active = false, target = null, savedRange = null, restarts = [], interim = '';

  /* ---------- commandes vocales ---------- */
  const CMD = {
    fr: [[/\s*point d['’]interrogation\b/gi, ' ?'], [/\s*point d['’]exclamation\b/gi, ' !'], [/\s*point[- ]virgule\b/gi, ' ;'],
         [/\s*deux[- ]points\b/gi, ' :'], [/\s*virgule\b/gi, ','], [/\s*point à la ligne\b/gi, '.\n'], [/\s*(?:à la ligne|nouvelle ligne|nouveau paragraphe)\b/gi, '\n'],
         [/\s*ouvrir (?:la )?parenthèse\b/gi, ' ('], [/\s*fermer (?:la )?parenthèse\b/gi, ')'], [/\s*point final\b/gi, '.'], [/\s+point\s*$/i, '.']],
    es: [[/\s*signo de interrogaci[oó]n\b/gi, '?'], [/\s*dos puntos\b/gi, ':'], [/\s*punto y coma\b/gi, ';'], [/\s*coma\b/gi, ','],
         [/\s*punto y aparte\b/gi, '.\n'], [/\s*nueva l[ií]nea\b/gi, '\n'], [/\s*punto final\b/gi, '.'], [/\s+punto\s*$/i, '.']],
    en: [[/\s*question mark\b/gi, '?'], [/\s*exclamation (?:mark|point)\b/gi, '!'], [/\s*colon\b/gi, ':'], [/\s*semicolon\b/gi, ';'], [/\s*comma\b/gi, ','],
         [/\s*(?:new line|new paragraph)\b/gi, '\n'], [/\s*full stop\b/gi, '.'], [/\s+period\s*$/i, '.']]
  };
  function lang() { try { return bmSpellLang(); } catch (e) { return 'fr'; } }
  function applyCommands(t, l) {
    if (l === 'fr') t = t.replace(/(\d)\s*virgule\s*(\d)/gi, '$1,$2');   // « zéro virgule cinq » → 0,5
    if (l === 'es') t = t.replace(/(\d)\s*coma\s*(\d)/gi, '$1,$2');
    (CMD[l] || []).forEach(([re, rep]) => { t = t.replace(re, rep); });
    return t.replace(/^[ \t]+|[ \t]+$/g, '');   // on garde les retours à la ligne
  }

  /* ---------- insertion dans la cible ---------- */
  const isField = el => el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT');
  // texte avant le curseur sur la ligne / le paragraphe en cours
  function lineBefore(el) {
    if (isField(el)) return el.value.slice(0, el.selectionStart || 0).split('\n').pop();
    const s = window.getSelection(); if (!s.rangeCount || !el.contains(s.anchorNode)) return (el.innerText || '').split('\n').pop();
    const r = s.getRangeAt(0); let blk = r.endContainer.nodeType === 3 ? r.endContainer.parentNode : r.endContainer;
    while (blk && blk !== el && !/^(P|DIV|LI|H[1-6]|BLOCKQUOTE|TD|TH)$/.test(blk.nodeName)) blk = blk.parentNode;
    if (!blk) blk = el;
    const pre = document.createRange(); pre.selectNodeContents(blk); pre.setEnd(r.endContainer, r.endOffset);
    return pre.toString().replace(/\u00a0/g, ' ');
  }
  function focusTarget() {
    target.focus();
    if (!isField(target) && savedRange) { const s = window.getSelection(); s.removeAllRanges(); s.addRange(savedRange); }
    else if (!isField(target)) { const s = window.getSelection(); if (!s.rangeCount || !target.contains(s.anchorNode)) { const r = document.createRange(); r.selectNodeContents(target); r.collapse(false); s.removeAllRanges(); s.addRange(r); } }
  }
  function rawInsert(txt) {
    if (isField(target)) {
      const a = target.selectionStart ?? target.value.length, b = target.selectionEnd ?? a;
      target.setRangeText(txt, a, b, 'end'); target.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (txt === '\n') document.execCommand('insertParagraph');
    else document.execCommand('insertText', false, txt);
  }
  function put(text) {
    const l = lang(), txt = applyCommands(text, l); if (!txt) return;
    focusTarget();
    txt.split('\n').forEach((part, i) => {
      if (i > 0) rawInsert('\n');
      if (!part.trim()) return;
      const line = lineBefore(target); let p = part.trim();
      const startsPunct = /^[.,;:!?)]/.test(p), spaceFirst = /^[?!:;]/.test(p) && l === 'fr';
      if (!line.trim() || /[.!?]\s*$/.test(line)) p = p.charAt(0).toUpperCase() + p.slice(1);
      const needSpace = line.length && !/[\s(]$/.test(line) && !startsPunct;
      rawInsert((needSpace || (spaceFirst && line.length && !/\s$/.test(line)) ? ' ' : '') + p);
    });
    if (!isField(target)) { const s = window.getSelection(); if (s.rangeCount) savedRange = s.getRangeAt(0).cloneRange(); }
  }
  document.addEventListener('selectionchange', () => {
    if (!active || !target || isField(target)) return;
    const s = window.getSelection(); if (s.rangeCount && target.contains(s.anchorNode)) savedRange = s.getRangeAt(0).cloneRange();
  });

  /* ---------- interface ---------- */
  function pill(show, txt) {
    let p = $('bm-dict-pill');
    if (!p && show) {
      p = document.createElement('div'); p.id = 'bm-dict-pill';
      p.innerHTML = '<span class="dot"></span><span class="txt" id="bm-dict-txt"></span><button type="button" id="bm-dict-stop">Arrêter</button>';
      document.body.appendChild(p); p.querySelector('#bm-dict-stop').addEventListener('click', stop);
    }
    if (!p) return; p.hidden = !show; const t = $('bm-dict-txt'); if (t) t.textContent = txt || 'Je t’écoute…';
  }
  function syncButtons() {
    document.querySelectorAll('.rb-mic,.bm-mic-mini').forEach(b => {
      const mine = b.id === 'bm-micbtn' ? ($('editor') === target) : (b.dataset.dictFor === (target && target.id));
      b.classList.toggle('listening', active && mine);
      if (b.id === 'bm-micbtn') b.textContent = active && mine ? (narrow() ? '⏹' : '⏹ Arrêter') : (narrow() ? '🎤' : '🎤 Dicter');
    });
  }

  /* ---------- reconnaissance ---------- */
  function start(el) {
    if (!SR) return toast('Ton navigateur ne gère pas la dictée vocale. Utilise Chrome, Edge ou Safari.');
    if (active) { const same = el === target; stop(); if (same) return; }
    target = el; restarts = []; interim = '';
    const s = window.getSelection(); savedRange = !isField(el) && s.rangeCount && el.contains(s.anchorNode) ? s.getRangeAt(0).cloneRange() : null;
    rec = new SR(); rec.lang = BCP[lang()] || 'fr-FR'; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 1;
    rec.onresult = e => {
      interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) put(t); else interim += t;
      }
      pill(true, interim || 'Je t’écoute…');
    };
    rec.onerror = e => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { toast('Autorise le micro pour BacMaster dans ton navigateur (cadenas à gauche de l’adresse).'); stop(); }
      else if (e.error === 'audio-capture') { toast('Aucun micro détecté.'); stop(); }
      else if (e.error === 'network') { toast('La dictée a besoin d’internet.'); stop(); }
    };
    rec.onend = () => { // le navigateur coupe après un silence : on relance tant que la dictée est active
      if (!active) return;
      const now = Date.now(); restarts = restarts.filter(t => now - t < 4000); restarts.push(now);
      if (restarts.length > 5) { toast('La dictée s’est arrêtée.'); return stop(); }
      try { rec.start(); } catch (e) { stop(); }
    };
    try { rec.start(); active = true; pill(true, 'Je t’écoute… (dis « virgule », « point », « à la ligne »)'); syncButtons(); }
    catch (e) { toast('Impossible de démarrer le micro.'); active = false; }
  }
  function stop() {
    active = false; if (rec) { try { rec.onend = null; rec.stop(); } catch (e) { /* ignore */ } }
    rec = null; pill(false); syncButtons();
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden && active) stop(); });
  window.addEventListener('pagehide', stop);
  setInterval(() => { if (active && target && !document.body.contains(target)) stop(); }, 800); // on a changé d'écran

  /* ---------- boutons ---------- */
  document.addEventListener('mousedown', e => { if (e.target.closest && e.target.closest('.rb-mic,.bm-mic-mini')) e.preventDefault(); });
  document.addEventListener('click', e => {
    const m = e.target.closest && e.target.closest('#bm-micbtn'); if (m) return start($('editor'));
    const f = e.target.closest && e.target.closest('.bm-mic-mini'); if (f) { const el = $(f.dataset.dictFor); if (el) start(el); }
  });
  function inject() {
    const top = document.querySelector('#bm-ribbon .rb-top'), prev = $('bm-prevbtn');
    if (top && !$('bm-micbtn')) {
      const b = document.createElement('button'); b.type = 'button'; b.id = 'bm-micbtn'; b.className = 'rb-mic'; b.textContent = narrow() ? '🎤' : '🎤 Dicter';
      b.title = 'Dicter : ce que tu dis s’écrit dans le cours. Commandes : « virgule », « point » (en fin de phrase), « point d’interrogation », « à la ligne ».';
      top.insertBefore(b, prev || $('sbtn'));
    }
    ['selftest-answer', 'exo-attempt-area'].forEach(id => {
      const el = $(id); if (!el || el.dataset.micDone) return; el.dataset.micDone = '1';
      const b = document.createElement('button'); b.type = 'button'; b.className = 'bm-mic-mini'; b.dataset.dictFor = id; b.textContent = '🎤';
      b.title = 'Dicter la réponse'; el.insertAdjacentElement('afterend', b);
    });
  }
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', inject);
  window.bmDictee = { start, stop, _put: put };
})();
