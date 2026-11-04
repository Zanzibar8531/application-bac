/* ============================================================
   BacMaster — bm-mascot.js
   Mascotte husky dessinée en SVG : 7 expressions, plusieurs variantes
   par état, répliques variées, bulle flottante et interrupteur On/Off
   (Paramètres). Quand elle est désactivée, plus rien n'apparaît.
   ============================================================ */
(function () {
  'use strict';
  const KEY = 'bacmaster_mascot', LAST = 'bacmaster_last_open';
  const enabled = () => { try { return localStorage.getItem(KEY) !== '0'; } catch (e) { return true; } };
  function setEnabled(on) {
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) { /* ignore */ }
    if (!on) hide();
    document.documentElement.classList.toggle('no-mascot', !on);
  }

  // ───────────── Dessin ─────────────
  const stroke = (d, w, c) => `<path d="${d}" fill="none" stroke="${c || '#1f2937'}" stroke-width="${w || 4}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const eyeOpen = (r, pupil) => [78, 122].map(x => `<circle cx="${x}" cy="108" r="${r}" fill="#fff" stroke="#94a3b8" stroke-width="1.5"/><circle cx="${x}" cy="109" r="${pupil + 3.4}" fill="#38bdf8"/><circle cx="${x}" cy="109" r="${pupil}" fill="#0f172a"/><circle cx="${x + 2.6}" cy="105.6" r="2.1" fill="#fff"/>`).join('');
  const EYES = {
    open: eyeOpen(11, 3.6),
    small: eyeOpen(10, 2.6),
    happy: stroke('M67 111 Q78 95 89 111', 4.5) + stroke('M111 111 Q122 95 133 111', 4.5),
    closed: stroke('M67 105 Q78 115 89 105', 4.5) + stroke('M111 105 Q122 115 133 105', 4.5)
  };
  const BROWS = {
    none: '', det: stroke('M66 92 L88 90', 4.5) + stroke('M134 92 L112 90', 4.5),
    flat: stroke('M66 91 L88 91', 4.5) + stroke('M134 91 L112 91', 4.5),
    worry: stroke('M65 99 L88 89', 4.5) + stroke('M135 99 L112 89', 4.5),
    angry: stroke('M64 92 L90 103', 5.5) + stroke('M136 92 L110 103', 5.5)
  };
  const MOUTH = {
    tongue: stroke('M86 144 Q100 158 114 144', 3.5) + '<ellipse cx="100" cy="155" rx="6.5" ry="6" fill="#fb7185"/>',
    open: '<path d="M84 143 Q100 174 116 143 Z" fill="#7f1d1d" stroke="#1f2937" stroke-width="3" stroke-linejoin="round"/><ellipse cx="100" cy="160" rx="9" ry="6" fill="#fb7185"/>',
    flat: stroke('M91 149 L109 149', 3.5),
    frown: stroke('M88 153 Q100 142 112 153', 3.5),
    sad: stroke('M90 152 Q100 145 110 152', 3.5),
    grr: stroke('M86 151 Q100 140 114 151', 3.5) + '<path d="M92 147 L96 155 L99 146 Z M108 147 L104 155 L101 146 Z" fill="#fff" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/>',
    sleep: stroke('M94 147 Q100 152 106 147', 3.5)
  };
  const EXTRA = {
    party: v => v % 2 === 0
      ? '<path d="M82 60 L100 14 L118 60 Z" fill="#f59e0b"/><path d="M89 44 L111 44 M85 54 L115 54" stroke="#fff" stroke-width="4"/><circle cx="100" cy="13" r="6" fill="#ec4899"/>'
      : '<g fill="#f97316"><rect x="28" y="40" width="9" height="9" rx="2" transform="rotate(20 32 44)"/><rect x="160" y="52" width="9" height="9" rx="2" transform="rotate(-25 164 56)"/></g><g fill="#22c55e"><rect x="150" y="22" width="8" height="8" rx="2" transform="rotate(35 154 26)"/><rect x="40" y="16" width="8" height="8" rx="2"/></g><circle cx="22" cy="86" r="5" fill="#3b82f6"/><circle cx="178" cy="92" r="5" fill="#ec4899"/>',
    glasses: v => '<g fill="rgba(186,230,253,.25)" stroke="#111827" stroke-width="3.5"><circle cx="78" cy="108" r="16"/><circle cx="122" cy="108" r="16"/></g><path d="M94 108 L106 108 M62 106 L50 100 M138 106 L150 100" stroke="#111827" stroke-width="3.5" stroke-linecap="round"/>'
      + (v % 2 === 0 ? '<rect x="56" y="170" width="88" height="22" rx="4" fill="#3b82f6"/><path d="M100 170 V192" stroke="#fff" stroke-width="2.5"/><path d="M64 178 H94 M64 184 H90 M106 178 H136 M106 184 H132" stroke="#bfdbfe" stroke-width="2.5" stroke-linecap="round"/>'
        : '<g transform="rotate(-35 150 160)"><rect x="144" y="130" width="9" height="46" rx="2" fill="#fbbf24"/><path d="M144 176 L148.500 188 L153 176 Z" fill="#fde68a"/><rect x="144" y="130" width="9" height="8" rx="2" fill="#f472b6"/></g>'),
    sweat: () => '<path d="M144 76 Q153 91 144 96 Q135 91 144 76 Z" fill="#7dd3fc" stroke="#38bdf8" stroke-width="1.5"/>',
    tear: v => `<path d="M${v % 2 ? 114 : 84} 121 Q${v % 2 ? 121 : 91} 134 ${v % 2 ? 114 : 84} 139 Q${v % 2 ? 107 : 77} 134 ${v % 2 ? 114 : 84} 121 Z" fill="#7dd3fc" stroke="#38bdf8" stroke-width="1.5"/><g fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5"><circle cx="150" cy="74" r="3"/><circle cx="158" cy="62" r="5"/><ellipse cx="172" cy="42" rx="15" ry="11"/></g><path d="M165 42 Q172 36 179 42" stroke="#94a3b8" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    vein: () => '<g stroke="#ef4444" stroke-width="4.5" fill="none" stroke-linecap="round"><path d="M142 48 Q151 50 151 59"/><path d="M166 48 Q157 50 157 59"/><path d="M142 78 Q151 76 151 67"/><path d="M166 78 Q157 76 157 67"/></g>',
    zzz: () => '<path d="M60 70 Q100 18 144 66 L138 74 Q100 50 66 78 Z" fill="#6366f1"/><circle cx="64" cy="76" r="6.5" fill="#fff"/><g fill="#94a3b8" font-family="Arial Black,Arial,sans-serif" font-weight="900"><text x="148" y="58" font-size="30">Z</text><text x="166" y="36" font-size="22">z</text><text x="178" y="18" font-size="15">z</text></g>'
  };
  const EXPR = {
    push:  { eyes: 'open',   brows: 'det',   mouth: 'tongue' },
    party: { eyes: 'happy',  brows: 'none',  mouth: 'open',  extra: 'party' },
    focus: { eyes: 'open',   brows: 'flat',  mouth: 'flat',  extra: 'glasses' },
    worry: { eyes: 'open',   brows: 'worry', mouth: 'frown', extra: 'sweat' },
    miss:  { eyes: 'open',   brows: 'worry', mouth: 'sad',   extra: 'tear' },
    angry: { eyes: 'small',  brows: 'angry', mouth: 'grr',   extra: 'vein' },
    sleep: { eyes: 'closed', brows: 'none',  mouth: 'sleep', extra: 'zzz' }
  };
  let uid = 0;
  function svg(state, variant, size, cls) {
    const x = EXPR[state] || EXPR.push, v = Math.abs(variant | 0), id = 'bmh' + (++uid);
    const tilt = [0, -5, 5][v % 3];
    return `<svg class="${cls || 'bm-husky'}" data-state="${state}" viewBox="0 0 200 200" width="${size || 64}" height="${size || 64}" role="img" aria-label="Mascotte husky" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d8799"/><stop offset="1" stop-color="#586174"/></linearGradient></defs>
<g transform="rotate(${tilt} 100 120)">
<polygon points="40,82 50,20 94,56" fill="#4b5563"/><polygon points="52,68 57,38 80,57" fill="#f9a8d4"/>
<polygon points="160,82 150,20 106,56" fill="#4b5563"/><polygon points="148,68 143,38 120,57" fill="#f9a8d4"/>
<ellipse cx="100" cy="112" rx="68" ry="60" fill="url(#${id})"/>
<path d="M100 60 C88 80 70 92 62 112 C60 142 80 170 100 170 C120 170 140 142 138 112 C130 92 112 80 100 60 Z" fill="#fff"/>
<ellipse cx="66" cy="130" rx="8" ry="5.5" fill="#f9a8d4" opacity=".55"/><ellipse cx="134" cy="130" rx="8" ry="5.5" fill="#f9a8d4" opacity=".55"/>
${EYES[x.eyes]}${BROWS[x.brows]}
<ellipse cx="100" cy="134" rx="9.5" ry="7" fill="#1f2937"/><ellipse cx="97" cy="132" rx="3" ry="1.8" fill="#fff" opacity=".5"/>
<path d="M100 141 V146" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
${MOUTH[x.mouth]}
${x.extra ? EXTRA[x.extra](v) : ''}
</g>
<ellipse cx="70" cy="194" rx="17" ry="9" fill="#fff" stroke="#94a3b8" stroke-width="2"/><ellipse cx="130" cy="194" rx="17" ry="9" fill="#fff" stroke="#94a3b8" stroke-width="2"/>
</svg>`;
  }
  // Mascotte de la carte d'accueil (variante qui change chaque jour)
  function cardHTML(state) {
    if (!enabled()) return '';
    let h = 0; const k = (typeof dayKey === 'function' ? dayKey() : '') + state;
    for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) >>> 0;
    return svg(state, h % 3, 76, 'bg-mascot bm-husky');
  }

  // ───────────── Répliques ─────────────
  const LINES = {
    party: ['Bravo, quelle session !', 'Tu gères, continue comme ça ! 🎉', 'Objectif atteint, je suis fier de toi !', 'Encore une victoire pour ta série !', 'Wouf ! Ça, c’est du beau travail !'],
    focus: ['Ça révise dur ! 📚', 'Concentration maximale…', 'Je reste à côté de toi, courage !', 'Un chapitre à la fois, tu avances bien.'],
    miss: ['Tu me manques… on révise un peu ?', 'Ça fait un moment ! Content de te revoir.', 'Je t’attendais… 5 minutes ensemble ?'],
    prep: ['Respire, tu es plus prêt que tu ne le crois.', 'Relis ta méthode, puis lance-toi.', 'Pas de stress : c’est aussi un entraînement.'],
    hurry: ['Plus que {h} h pour sauver ta série !', 'Vite ! Ta série est en danger !', 'Allez, on s’y met : il reste {h} h !'],
    sleep: ['Zzz… Saut Temporel actif, je me repose.', 'Zzz… on se retrouve demain !'],
    worry: ['Ta série compte sur toi aujourd’hui.', 'Un petit effort et c’est validé !'],
    push: ['On y va ? Ton objectif t’attend.', 'Prêt à réviser ?']
  };
  const lastLine = {};
  function line(state, vars) {
    const arr = LINES[state] || LINES.push; let i = Math.floor(Math.random() * arr.length);
    if (arr.length > 1 && i === lastLine[state]) i = (i + 1) % arr.length;
    lastLine[state] = i;
    return arr[i].replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : ''));
  }

  // ───────────── Bulle flottante ─────────────
  let hideTimer = null, lastSay = 0; const lastByState = {};
  function hide() { const b = document.getElementById('bm-mascot-bubble'); if (b) b.classList.remove('show'); clearTimeout(hideTimer); }
  function say(state, text, opts) {
    opts = opts || {};
    if (!enabled() || !document.body) return false;
    const now = Date.now();
    if (!opts.force && now - lastSay < 25000) return false;
    if (opts.gap && now - (lastByState[state] || 0) < opts.gap) return false;
    lastSay = lastByState[state] = now;
    let b = document.getElementById('bm-mascot-bubble');
    if (!b) {
      b = document.createElement('div'); b.id = 'bm-mascot-bubble'; b.setAttribute('role', 'status'); b.setAttribute('aria-live', 'polite');
      b.addEventListener('click', hide); document.body.appendChild(b);
    }
    const msg = String(text || line(state)).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
    b.innerHTML = `<div class="bm-mb-img">${svg(state, Math.floor(Math.random() * 3), 56, 'bm-husky')}</div><div class="bm-mb-txt">${msg}</div>`;
    requestAnimationFrame(() => b.classList.add('show'));
    clearTimeout(hideTimer); hideTimer = setTimeout(hide, opts.ms || 6500);
    return true;
  }

  // ───────────── Branchements (sans toucher aux autres fichiers) ─────────────
  function wrap(name, fn) {
    const o = window[name]; if (typeof o !== 'function') return;
    window[name] = function () { const r = o.apply(this, arguments); try { fn.apply(null, arguments); } catch (e) { /* ignore */ } return r; };
  }
  function boot() {
    document.documentElement.classList.toggle('no-mascot', !enabled());
    // Heureuse : fin d'une session de flashcards
    wrap('renderSRSResults', () => { if (typeof sessDone !== 'undefined' && sessDone > 0) say('party', null, { force: true }); });
    // Inquiète : avant une évaluation / un contrôle
    wrap('openEval', () => say('prep', null, { force: true }));
    wrap('asmCtlStart', () => say('prep', null, { force: true }));
    // Concentrée : lecture d'un cours ou exercices
    let lastAct = '';
    setInterval(() => {
      const a = (typeof curTrackedPage !== 'undefined' && curTrackedPage && curTrackedPage.activity) || '';
      if (a !== lastAct) { lastAct = a; if (/^(📖|🧩)/.test(a)) say('focus', null, { gap: 240000 }); }
    }, 2500);
    // Nostalgique : absent depuis 1 jour ou plus
    let days = 0; try {
      const last = localStorage.getItem(LAST), today = dayKey();
      if (last && last !== today) days = Math.max(1, Math.round((new Date(today + 'T12:00:00') - new Date(last + 'T12:00:00')) / 86400000));
      localStorage.setItem(LAST, today);
    } catch (e) { /* ignore */ }
    window.__bmMissDays = days;
    if (days >= 1) setTimeout(() => { if (!(window.BacMasterGoal && BacMasterGoal.status().done)) say('miss', null, { force: true }); }, 3000);
  }
  window.BacMasterMascot = { enabled, setEnabled, svg, cardHTML, say, hide, line, lines: LINES };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
