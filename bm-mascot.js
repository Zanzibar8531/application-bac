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

  // ───────────── Dessin (style « mascotte d'appli » : formes simples, gros yeux, corps entier) ─────────────
  const C = { main: '#7e90b8', dark: '#5a6b93', white: '#ffffff', shade: '#dbe4f3', pink: '#ff8fb1', ink: '#1e293b', iris: '#56c4ff' };
  const brow = (d, w) => `<path d="${d}" fill="none" stroke="#334155" stroke-width="${w || 7}" stroke-linecap="round"/>`;
  const arc = (d, w) => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w || 6.5}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const EX_L = 74, EX_R = 126, EY = 106;
  const eyeBig = (ry, look) => [EX_L, EX_R].map(x => `<ellipse cx="${x}" cy="${EY}" rx="17" ry="${ry}" fill="#fff" stroke="#c7d2e8" stroke-width="2"/><circle cx="${x + (look || 0)}" cy="${EY + 1}" r="12.5" fill="${C.iris}"/><circle cx="${x + (look || 0)}" cy="${EY + 1}" r="7.5" fill="#0b1226"/><circle cx="${x + (look || 0) + 4.5}" cy="${EY - 4.5}" r="4.2" fill="#fff"/><circle cx="${x + (look || 0) - 4}" cy="${EY + 5.5}" r="1.8" fill="#fff" opacity=".85"/>`).join('');
  const EYES = {
    open: () => `<g class="eyes">${eyeBig(20)}</g>`,
    small: () => `<g>${eyeBig(15, 0)}</g>`,
    happy: () => arc(`M${EX_L - 14} ${EY + 6} Q${EX_L} ${EY - 16} ${EX_L + 14} ${EY + 6}`, 7) + arc(`M${EX_R - 14} ${EY + 6} Q${EX_R} ${EY - 16} ${EX_R + 14} ${EY + 6}`, 7),
    closed: () => arc(`M${EX_L - 14} ${EY - 2} Q${EX_L} ${EY + 12} ${EX_L + 14} ${EY - 2}`, 6.5) + arc(`M${EX_R - 14} ${EY - 2} Q${EX_R} ${EY + 12} ${EX_R + 14} ${EY - 2}`, 6.5)
  };
  const BROWS = {
    none: '', det: brow('M56 82 L88 80') + brow('M144 82 L112 80'), flat: brow('M56 82 L90 82') + brow('M144 82 L110 82'),
    worry: brow('M54 90 L90 76') + brow('M146 90 L110 76'), angry: brow('M52 76 L92 94', 8) + brow('M148 76 L108 94', 8)
  };
  const MOUTH = {
    tongue: arc('M82 150 Q100 170 118 150', 4.5) + `<path d="M91 160 Q100 182 109 160 Z" fill="#ff7a9c"/>`,
    open: `<path d="M78 148 Q100 192 122 148 Z" fill="#7f1d1d" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/><ellipse cx="100" cy="171" rx="13" ry="8" fill="#ff7a9c"/>`,
    flat: arc('M88 156 L112 156', 4.5),
    frown: arc('M84 164 Q100 146 116 164', 4.5),
    sad: arc('M88 162 Q100 150 112 162', 4.5),
    grr: arc('M82 162 Q100 144 118 162', 4.5) + `<path d="M91 152 L96 163 L100 151 Z M109 152 L104 163 L100 151 Z" fill="#fff" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`,
    sleep: arc('M92 156 Q100 164 108 156', 4.5)
  };
  const EXTRA = {
    party: v => v % 2 === 0
      ? '<path d="M82 46 L100 2 L118 46 Z" fill="#f59e0b"/><path d="M89 30 L111 30 M85 40 L115 40" stroke="#fff" stroke-width="4"/><circle cx="100" cy="3" r="6.5" fill="#ec4899"/>'
      : '<g fill="#f97316"><rect x="26" y="40" width="10" height="10" rx="2" transform="rotate(20 31 45)"/><rect x="164" y="54" width="10" height="10" rx="2" transform="rotate(-25 169 59)"/></g><g fill="#22c55e"><rect x="150" y="18" width="9" height="9" rx="2" transform="rotate(35 154 22)"/><rect x="38" y="14" width="9" height="9" rx="2"/></g><circle cx="18" cy="92" r="5.5" fill="#3b82f6"/><circle cx="184" cy="96" r="5.5" fill="#ec4899"/>',
    glasses: v => `<g fill="rgba(186,230,253,.22)" stroke="#111827" stroke-width="4.5"><circle cx="${EX_L}" cy="${EY}" r="23"/><circle cx="${EX_R}" cy="${EY}" r="23"/></g><path d="M97 ${EY} L103 ${EY} M51 ${EY - 3} L36 ${EY - 10} M149 ${EY - 3} L164 ${EY - 10}" stroke="#111827" stroke-width="4.5" stroke-linecap="round"/>`
      + (v % 2 === 0 ? '<g class="fg"><rect x="58" y="178" width="84" height="26" rx="5" fill="#3b82f6"/><path d="M100 178 V204" stroke="#fff" stroke-width="3"/><path d="M66 187 H92 M66 195 H88 M108 187 H134 M108 195 H130" stroke="#bfdbfe" stroke-width="3" stroke-linecap="round"/></g>'
        : '<g transform="rotate(-35 156 168)"><rect x="150" y="136" width="10" height="48" rx="2" fill="#fbbf24"/><path d="M150 184 L155 196 L160 184 Z" fill="#fde68a"/><rect x="150" y="136" width="10" height="9" rx="2" fill="#f472b6"/></g>'),
    sweat: () => '<path d="M156 66 Q166 84 156 90 Q146 84 156 66 Z" fill="#7dd3fc" stroke="#38bdf8" stroke-width="2"/>',
    tear: v => `<path d="M${v % 2 ? 126 : 70} 128 Q${v % 2 ? 134 : 78} 146 ${v % 2 ? 126 : 70} 152 Q${v % 2 ? 118 : 62} 146 ${v % 2 ? 126 : 70} 128 Z" fill="#7dd3fc" stroke="#38bdf8" stroke-width="2"/><g fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5"><circle cx="158" cy="62" r="3.5"/><circle cx="166" cy="48" r="5.5"/><ellipse cx="180" cy="26" rx="16" ry="12"/></g>`,
    vein: () => '<g stroke="#ef4444" stroke-width="5" fill="none" stroke-linecap="round"><path d="M148 36 Q158 38 158 48"/><path d="M174 36 Q164 38 164 48"/><path d="M148 68 Q158 66 158 56"/><path d="M174 68 Q164 66 164 56"/></g>',
    zzz: () => '<path d="M50 70 Q100 -8 152 66 L145 76 Q100 42 58 82 Z" fill="#6366f1"/><circle cx="54" cy="80" r="7.5" fill="#fff"/><g fill="#94a3b8" font-family="Arial Black,Arial,sans-serif" font-weight="900"><text x="152" y="52" font-size="32">Z</text><text x="172" y="28" font-size="23">z</text><text x="184" y="10" font-size="16">z</text></g>'
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
    const x = EXPR[state] || EXPR.push, v = Math.abs(variant | 0), id = 'bmh' + (++uid), tilt = [0, -4, 4][v % 3];
    return `<svg class="${cls || 'bm-husky'}" data-state="${state}" viewBox="0 0 200 220" width="${size || 64}" height="${Math.round((size || 64) * 1.1)}" role="img" aria-label="Mascotte husky" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9bc2"/><stop offset="1" stop-color="${C.main}"/></linearGradient></defs>
<g class="bob">
<path class="tail" d="M144 184 C190 188 202 140 178 112 C182 146 164 166 138 168 Z" fill="${C.dark}"/><path d="M178 112 C190 124 192 140 188 152 C186 140 182 126 178 112 Z" fill="#fff" opacity=".9"/>
<ellipse cx="100" cy="170" rx="50" ry="44" fill="${C.main}"/><ellipse cx="100" cy="180" rx="30" ry="32" fill="#fff"/>
<ellipse cx="72" cy="208" rx="21" ry="11" fill="#fff" stroke="${C.shade}" stroke-width="3"/><ellipse cx="128" cy="208" rx="21" ry="11" fill="#fff" stroke="${C.shade}" stroke-width="3"/>
<g transform="rotate(${tilt} 100 120)">
<polygon points="30,92 38,10 96,48" fill="${C.dark}"/><polygon points="46,76 50,32 82,52" fill="${C.pink}"/>
<polygon points="170,92 162,10 104,48" fill="${C.dark}"/><polygon points="154,76 150,32 118,52" fill="${C.pink}"/>
<ellipse cx="100" cy="100" rx="76" ry="64" fill="url(#${id})"/>
<path d="M100 44 C88 68 60 78 50 104 C44 140 68 172 100 172 C132 172 156 140 150 104 C140 78 112 68 100 44 Z" fill="#fff"/>
<ellipse cx="60" cy="140" rx="9" ry="6" fill="${C.pink}" opacity=".55"/><ellipse cx="140" cy="140" rx="9" ry="6" fill="${C.pink}" opacity=".55"/>
${EYES[x.eyes]()}${BROWS[x.brows]}
<ellipse cx="100" cy="137" rx="13" ry="9.5" fill="${C.ink}"/><ellipse cx="96" cy="134" rx="4.5" ry="2.6" fill="#fff" opacity=".45"/>
<path d="M100 146 V152" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
${MOUTH[x.mouth]}
${x.extra ? EXTRA[x.extra](v) : ''}
</g></g></svg>`;
  }
  // Mascotte de la carte d'accueil (variante qui change chaque jour)
  function cardHTML(state) {
    if (!enabled()) return '';
    let h = 0; const k = (typeof dayKey === 'function' ? dayKey() : '') + state;
    for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) >>> 0;
    return svg(state, h % 3, 84, 'bg-mascot bm-husky');
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
    b.innerHTML = `<div class="bm-mb-img">${svg(state, Math.floor(Math.random() * 3), 56, 'bm-husky')}</div><div class="bm-mb-txt"><b class="bm-mb-name">${(window.BMBubble && BMBubble.name) || ''}</b>${msg}</div>`;
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
