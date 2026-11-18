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
  let committed = 0, sessWords = [], gotAudio = false, rec = null, active = false, target = null, savedRange = null, restarts = [], interim = '';
  let courseMode = false, t0 = 0, lastFinalAt = 0, wake = null, pillTxt = '', speaker = 'prof', hiddenPause = false;

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
  function lang() { try { const p = localStorage.getItem('bm_dict_lang'); if (p === 'fr' || p === 'en' || p === 'es') return p; } catch (e) { /* ignore */ } try { return bmSpellLang(); } catch (e) { return 'fr'; } }
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
  function put(text, newPara) {
    const l = lang(), txt = courseMode ? text.replace(/\s+/g, ' ').trim() : applyCommands(text, l); if (!txt) return;   // mode cours : les mots du prof ne sont jamais des commandes
    focusTarget();
    if (newPara && courseMode && lineBefore(target).trim()) rawInsert('\n');
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
      p.innerHTML = '<span class="dot"></span><span class="txt" id="bm-dict-txt"></span><button type="button" id="bm-dict-spk" hidden></button><button type="button" id="bm-dict-stop">Arrêter</button>';
      document.body.appendChild(p); p.querySelector('#bm-dict-stop').addEventListener('click', stop); p.querySelector('#bm-dict-spk').addEventListener('click', toggleSpeaker);
    }
    if (!p) return; p.hidden = !show; pillTxt = txt || 'Je t’écoute…';
    const t = $('bm-dict-txt'); if (t) t.textContent = (courseMode && show ? '🎓 ' + elapsed() + ' · ' : '') + pillTxt;
    const sp = $('bm-dict-spk'); if (sp) { sp.hidden = !(courseMode && show); sp.textContent = speaker === 'prof' ? '🧑‍🏫 Prof' : '🙋 Élève'; }
  }
  function syncButtons() {
    document.querySelectorAll('.rb-mic,.bm-mic-mini').forEach(b => {
      const mine = b.id === 'bm-micbtn' ? ($('editor') === target) : (b.dataset.dictFor === (target && target.id));
      b.classList.toggle('listening', active && mine);
      if (b.id === 'bm-micbtn') { b.classList.toggle('listening', active && mine && !courseMode); b.textContent = active && mine && !courseMode ? (narrow() ? '⏹' : '⏹ Arrêter') : (narrow() ? '🎤' : '🎤 Dicter'); }
      if (b.id === 'bm-coursbtn') { b.classList.toggle('listening', active && mine && courseMode); b.textContent = active && mine && courseMode ? (narrow() ? '⏹' : '⏹ Arrêter le cours') : (narrow() ? '🎓' : '🎓 Mode cours'); }
    });
  }
  const elapsed = () => { const s = Math.max(0, Math.floor((Date.now() - t0) / 1000)), p = n => String(n).padStart(2, '0'); return (s >= 3600 ? Math.floor(s / 3600) + ':' : '') + p(Math.floor(s / 60) % 60) + ':' + p(s % 60); };
  // Prof ⇄ Élève : ajoute une ligne « Prof : » / « Élève : » (comme une pièce de théâtre) puis la suite s'écrit dessous
  function toggleSpeaker() {
    if (!active || !courseMode || !target) return;
    speaker = speaker === 'prof' ? 'eleve' : 'prof'; const name = speaker === 'prof' ? 'Prof' : 'Élève';
    focusTarget(); if (lineBefore(target).trim()) rawInsert('\n');
    if (isField(target)) rawInsert(name + ' : '); else document.execCommand('insertHTML', false, '<strong>' + name + ' :</strong>&nbsp;');
    if (!isField(target)) { const s = window.getSelection(); if (s.rangeCount) savedRange = s.getRangeAt(0).cloneRange(); }
    lastFinalAt = Date.now(); pill(true, pillTxt);
  }
  // l'écran reste allumé pendant le cours (sinon le téléphone se verrouille et le micro s'arrête)
  async function lock() { try { if (navigator.wakeLock && !wake) { wake = await navigator.wakeLock.request('screen'); wake.addEventListener('release', () => { wake = null; }); } } catch (e) { /* ignore */ } }
  function unlock() { try { wake && wake.release(); } catch (e) { /* ignore */ } wake = null; }

  /* ---------- reconnaissance ---------- */
  function start(el, opts) {
    if (!SR) return toast('Ton navigateur ne gère pas la dictée vocale. Utilise Chrome, Edge ou Safari.');
    if (active) { const same = el === target; stop(); if (same) return; }
    courseMode = !!(opts && opts.course) && el === $('editor'); t0 = Date.now(); lastFinalAt = 0; speaker = 'prof'; hiddenPause = false;
    target = el; restarts = []; interim = ''; gotAudio = false;
    if (courseMode) lock();
    const s = window.getSelection(); savedRange = !isField(el) && s.rangeCount && el.contains(s.anchorNode) ? s.getRangeAt(0).cloneRange() : null;
    rec = new SR(); rec.lang = BCP[lang()] || 'fr-FR'; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 1;
    rec.onstart = () => { committed = 0; sessWords = []; };   // chaque écoute repart de zéro
    rec.onresult = e => {
      // Sur Android, Chrome renvoie parfois les résultats DÉJÀ écrits (le 1er mot revenait à chaque phrase) ou chaque
      // résultat contient tout le début de la phrase. On n'écrit donc que ce qui est nouveau :
      //   1) un résultat final n'est écrit qu'une fois (suivi par son numéro) ;
      //   2) si son texte reprend, au début, les mots déjà écrits, on n'écrit que la suite.
      interim = '';
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i], t = r[0].transcript;
        if (!r.isFinal) { if (i >= committed) interim += t; continue; }
        if (i < committed) continue;
        committed = i + 1;
        const words = t.trim().split(/\s+/).filter(Boolean), norm = w => w.toLowerCase().replace(/[.,;:!?]/g, '');
        let skip = 0;
        if (words.length > sessWords.length && sessWords.length && sessWords.every((w, k) => norm(w) === norm(words[k]))) skip = sessWords.length;
        const fresh = words.slice(skip).join(' ');
        sessWords = sessWords.concat(words.slice(skip));
        if (fresh) {
          const now = Date.now(), gap = lastFinalAt ? now - lastFinalAt : 0; lastFinalAt = now;
          put((/^\s/.test(t) ? ' ' : '') + fresh, gap > 2500);      // pause de plus de 2,5 s = nouveau paragraphe (mode cours)
        }
      }
      pill(true, interim || 'Je t’écoute…');
    };
    rec.onerror = e => {
      const c = e.error;
      if (c === 'not-allowed' || c === 'service-not-allowed') { toast('Micro refusé : autorise-le pour BacMaster (cadenas à gauche de l’adresse, ou Réglages Android > Applis > Chrome > Autorisations).'); stop(); }
      else if (c === 'audio-capture') { toast('Aucun micro détecté (ou il est utilisé par une autre appli).'); stop(); }
      else if (c === 'network') { if (courseMode) pill(true, 'Connexion perdue… je réessaie'); else { toast('Le service vocal du navigateur est injoignable (internet, VPN ou navigateur non Google). Essaie Chrome ou Edge.'); stop(); } }
      else if (c === 'language-not-supported') { toast('Langue non gérée par ce navigateur (' + (rec && rec.lang) + ').'); stop(); }
      else if (c === 'no-speech') { pill(true, courseMode ? 'J’écoute… (rien entendu pour l’instant)' : 'Je n’entends rien… parle plus près du micro'); }
      else if (c !== 'aborted') { toast('Dictée impossible (' + c + ').'); stop(); }
    };
    rec.onaudiostart = () => { gotAudio = true; pill(true, courseMode ? 'J’écoute le cours…' : 'Micro actif — parle (dis « virgule », « point », « à la ligne »)'); };
    rec.onspeechstart = () => pill(true, 'Je t’entends…');
    rec.onend = () => { // le navigateur coupe après un silence : on relance tant que la dictée est active
      if (!active) return;
      const now = Date.now();
      if (courseMode) {                                   // classe bruyante : l'écoute se coupe souvent, on relance toujours (avec un petit délai si ça s'enchaîne)
        if (document.hidden) { hiddenPause = true; return; }
        restarts = restarts.filter(t => now - t < 10000); restarts.push(now);
        const me = rec, delay = restarts.length > 4 ? 1500 : 120;
        setTimeout(() => { if (active && rec === me) { try { rec.start(); } catch (e) { /* on réessaiera à la fin suivante */ } } }, delay); return;
      }
      restarts = restarts.filter(t => now - t < 4000); restarts.push(now);
      if (restarts.length > 5) { toast('La dictée s’est arrêtée.'); return stop(); }
      try { rec.start(); } catch (e) { stop(); }
    };
    try { rec.start(); active = true; pill(true, 'Démarrage du micro…'); syncButtons();
      const me = rec; setTimeout(() => { if (active && rec === me && !gotAudio) { toast('Le micro ne s’ouvre pas. Vérifie l’autorisation du micro et ta connexion, puis réessaie.'); stop(); } }, 6000); }
    catch (e) { toast('Impossible de démarrer le micro.'); active = false; }
  }
  function stop() {
    active = false; if (rec) { try { rec.onend = null; rec.stop(); } catch (e) { /* ignore */ } }
    unlock(); rec = null; pill(false); courseMode = false; syncButtons();
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (active && !courseMode) stop(); return; }
    if (active && courseMode) { lock(); if (hiddenPause) { hiddenPause = false; try { rec.start(); } catch (e) { /* ignore */ } } }   // retour dans l'appli : le cours reprend
  });
  setInterval(() => { if (active && courseMode) pill(true, pillTxt); }, 1000);   // chrono
  window.addEventListener('pagehide', stop);
  setInterval(() => {
    if (!active || !target || document.body.contains(target)) return;
    const again = target.id && $(target.id);   // l'éditeur a été rechargé (synchro) : on le suit
    if (again) { target = again; savedRange = null; syncButtons(); } else stop();   // sinon on a changé d'écran
  }, 800);

  /* ---------- boutons ---------- */
  document.addEventListener('mousedown', e => { if (e.target.closest && e.target.closest('.rb-mic,.bm-mic-mini')) e.preventDefault(); });
  document.addEventListener('click', e => {
    const c = e.target.closest && e.target.closest('#bm-coursbtn'); if (c) { if (active && courseMode) return stop(); return start($('editor'), { course: true }); }
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
    if (top && !$('bm-coursbtn') && $('bm-micbtn')) {
      const c = document.createElement('button'); c.type = 'button'; c.id = 'bm-coursbtn'; c.className = 'rb-mic'; c.textContent = narrow() ? '🎓' : '🎓 Mode cours';
      c.title = 'Mode cours : écoute en continu et écrit ce que dit le professeur (sans commandes vocales). Une pause de plus de 2,5 s = nouveau paragraphe. Le bouton Prof/Élève ajoute une ligne « Élève : ».';
      top.insertBefore(c, $('bm-micbtn').nextSibling);
    }
    ['selftest-answer', 'exo-attempt-area'].forEach(id => {
      const el = $(id); if (!el || el.dataset.micDone) return; el.dataset.micDone = '1';
      const b = document.createElement('button'); b.type = 'button'; b.className = 'bm-mic-mini'; b.dataset.dictFor = id; b.textContent = '🎤';
      b.title = 'Dicter la réponse'; el.insertAdjacentElement('afterend', b);
    });
  }
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', inject);
  window.bmDictee = { start, stop, _put: put, startCourse: el => start(el || $('editor'), { course: true }) };
})();
