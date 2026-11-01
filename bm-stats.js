/* ============================================================
   BacMaster — bm-stats.js
   Nouvelle page Statistiques : anneau d'objectif, série, histogramme,
   toile d'araignée par matière, répartition du temps, assiduité.
   Remplace openStats() de script.js.
   ============================================================ */
(function () {
  'use strict';
  let period = 7;
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const G = () => window.BacMasterGoal;
  const mins = sec => Math.round(sec / 60);
  const colorOf = name => (typeof subjectColor === 'function' ? subjectColor(name) : '#4f46e5');
  const fmtDay = (k, o) => new Date(k + 'T12:00:00').toLocaleDateString('fr-FR', o || { day: 'numeric', month: 'short' });

  function ring(pct, done) {
    const r = 52, c = 2 * Math.PI * r;
    return `<svg viewBox="0 0 130 130" class="bs-ring" aria-hidden="true"><defs><linearGradient id="bsg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${done ? '#4ade80' : '#fbbf24'}"/><stop offset="1" stop-color="${done ? '#22c55e' : '#fb7185'}"/></linearGradient></defs>
      <circle cx="65" cy="65" r="${r}" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="12"/>
      <circle cx="65" cy="65" r="${r}" fill="none" stroke="url(#bsg)" stroke-width="12" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - pct / 100)).toFixed(1)}" transform="rotate(-90 65 65)"/></svg>`;
  }

  // Histogramme du temps par jour, avec la ligne d'objectif
  function barsSVG(keys, goalMin) {
    const vals = keys.map(k => mins(dayTimeTotal(k)));
    const max = Math.max(goalMin * 1.25, ...vals, 10), W = 640, H = 220, pl = 34, pb = 26, pt = 12, plotW = W - pl - 8, plotH = H - pb - pt;
    const step = plotW / keys.length, bw = Math.max(4, Math.min(34, step * 0.62));
    const y = v => pt + plotH - (v / max) * plotH;
    const grid = [0, .5, 1].map(f => { const v = Math.round(max * f); return `<line x1="${pl}" x2="${W - 8}" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" stroke-opacity=".1"/><text x="${pl - 6}" y="${y(v) + 4}" text-anchor="end" class="bs-axis">${v}</text>`; }).join('');
    const today = dayKey();
    const bars = keys.map((k, i) => {
      const v = vals[i], x = pl + step * i + (step - bw) / 2, h = Math.max(v > 0 ? 3 : 0, plotH - (y(v) - pt));
      const met = v >= goalMin, fill = k === today && !met ? 'url(#bsb2)' : met ? 'url(#bsb3)' : 'url(#bsb1)';
      const lbl = keys.length <= 14 ? new Date(k + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, keys.length <= 7 ? 3 : 1) : (i % Math.ceil(keys.length / 10) === 0 ? fmtDay(k, { day: 'numeric' }) : '');
      return `<g class="bs-bar" onclick="openDayDetail('${k}')" tabindex="0" role="button" aria-label="${fmtDay(k, { weekday: 'long', day: 'numeric', month: 'long' })} : ${v} minutes"><title>${fmtDay(k, { weekday: 'long', day: 'numeric', month: 'long' })} — ${v} min</title>
        <rect x="${x.toFixed(1)}" y="${(pt + plotH - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(8, bw / 2)}" fill="${fill}"/></g>
        <text x="${(x + bw / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle" class="bs-axis${k === today ? ' now' : ''}">${lbl}</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="bs-chart" role="img" aria-label="Minutes révisées par jour"><defs>
      <linearGradient id="bsb1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#818cf8"/><stop offset="1" stop-color="#6366f1"/></linearGradient>
      <linearGradient id="bsb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbbf24"/><stop offset="1" stop-color="#f97316"/></linearGradient>
      <linearGradient id="bsb3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4ade80"/><stop offset="1" stop-color="#16a34a"/></linearGradient></defs>
      ${grid}<line x1="${pl}" x2="${W - 8}" y1="${y(goalMin)}" y2="${y(goalMin)}" stroke="#22c55e" stroke-width="1.6" stroke-dasharray="6 5"/>
      <text x="${W - 10}" y="${y(goalMin) - 5}" text-anchor="end" class="bs-goal">objectif ${goalMin} min</text>${bars}</svg>`;
  }

  // Toile d'araignée : maîtrise et découverte par matière
  function radarSVG(rows) {
    if (rows.length < 3) return `<p class="bs-empty">Révise au moins 3 matières pour voir ta toile d’araignée.</p>`;
    const S = 320, cx = S / 2, cy = S / 2 + 4, R = 100, n = rows.length;
    const ang = i => -Math.PI / 2 + i * 2 * Math.PI / n;
    const pt = (i, f) => [cx + Math.cos(ang(i)) * R * f, cy + Math.sin(ang(i)) * R * f];
    const poly = f => rows.map((r, i) => pt(i, f(r)).map(v => v.toFixed(1)).join(',')).join(' ');
    const rings = [.25, .5, .75, 1].map(f => `<polygon points="${rows.map((r, i) => pt(i, f).map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-opacity="${f === 1 ? .22 : .1}"/>`).join('');
    const axes = rows.map((r, i) => { const [x, y] = pt(i, 1); return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-opacity=".1"/>`; }).join('');
    const labels = rows.map((r, i) => { const [x, y] = pt(i, 1.2), a = Math.cos(ang(i)); return `<text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="${Math.abs(a) < .25 ? 'middle' : a > 0 ? 'start' : 'end'}" class="bs-radar-lbl"><title>${esc(r.name)} — ${r.mastered}% maîtrisé, ${r.discovered}% découvert</title>${r.icon}</text>`; }).join('');
    const dots = rows.map((r, i) => { const [x, y] = pt(i, r.mastered / 100); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${r.color}" stroke="#fff" stroke-width="1.5"/>`; }).join('');
    return `<svg viewBox="0 0 ${S} ${S + 8}" class="bs-radar" role="img" aria-label="Toile d’araignée : maîtrise par matière"><defs><radialGradient id="bsr" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#8b5cf6" stop-opacity=".55"/><stop offset="1" stop-color="#ec4899" stop-opacity=".35"/></radialGradient></defs>
      ${rings}${axes}
      <polygon points="${poly(r => r.discovered / 100)}" fill="#38bdf8" fill-opacity=".14" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4"/>
      <polygon points="${poly(r => r.mastered / 100)}" fill="url(#bsr)" stroke="#8b5cf6" stroke-width="2.4" stroke-linejoin="round"/>${dots}${labels}</svg>`;
  }

  function donutSVG(entries, total) {
    if (!entries.length) return `<p class="bs-empty">Pas encore de données sur cette période.</p>`;
    const r = 56, c = 2 * Math.PI * r; let acc = 0;
    const arcs = entries.map(([name, sec]) => { const f = sec / total, len = f * c, o = -acc * c; acc += f; return `<circle cx="80" cy="80" r="${r}" fill="none" stroke="${colorOf(name)}" stroke-width="22" stroke-dasharray="${Math.max(0, len - 1.5).toFixed(1)} ${(c - Math.max(0, len - 1.5)).toFixed(1)}" stroke-dashoffset="${o.toFixed(1)}" transform="rotate(-90 80 80)"><title>${esc(name)} — ${fmtDuration(sec)}</title></circle>`; }).join('');
    return `<div class="bs-donutwrap"><svg viewBox="0 0 160 160" class="bs-donut" role="img" aria-label="Répartition du temps par matière">${arcs}<text x="80" y="76" text-anchor="middle" class="bs-donut-big">${fmtDuration(total)}</text><text x="80" y="95" text-anchor="middle" class="bs-donut-small">révisés</text></svg>
      <ul class="bs-legend">${entries.slice(0, 7).map(([name, sec]) => { const cfg = CFG.find(c => c.name === name); return `<li><i style="background:${colorOf(name)}"></i><span>${cfg ? cfg.icon : '📚'} ${esc(name)}</span><b>${Math.round(sec / total * 100)}%</b></li>`; }).join('')}</ul></div>`;
  }

  function heatmapHTML(weeks, goalMin) {
    const keys = dateKeysRange(weeks * 7), first = (new Date(keys[0] + 'T12:00:00').getDay() + 6) % 7;
    const cells = Array(first).fill(null).concat(keys.map(k => ({ k, m: mins(dayTimeTotal(k)) })));
    while (cells.length % 7) cells.push(null);
    const cols = []; for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));
    const lvl = m => m <= 0 ? 0 : m < goalMin / 2 ? 1 : m < goalMin ? 2 : m < goalMin * 2 ? 3 : 4;
    return `<div class="bs-heat" role="img" aria-label="Assiduité sur ${weeks} semaines"><div class="bs-heat-days"><span>L</span><span></span><span>M</span><span></span><span>V</span><span></span><span>D</span></div>${cols.map(col => `<div class="bs-heat-col">${col.map(c => c ? `<button class="bs-cell l${lvl(c.m)}" onclick="openDayDetail('${c.k}')" title="${fmtDay(c.k, { weekday: 'long', day: 'numeric', month: 'long' })} — ${c.m} min" aria-label="${fmtDay(c.k)} ${c.m} minutes"></button>` : '<span class="bs-cell none"></span>').join('')}</div>`).join('')}</div>
      <div class="bs-heat-legend"><span>Moins</span><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><span>Plus</span><span class="bs-sp"></span><span>vert foncé = objectif dépassé</span></div>`;
  }

  window.openStats = function () {
    try { clearInterval(qTimer); } catch (e) { /* ignore */ }
    curTrackedPage = null;
    const g = G().load(), st = G().status(), goalMin = g.minutes;
    const keys = dateKeysRange(period), perDay = keys.map(k => ({ k, m: mins(dayTimeTotal(k)) }));
    const periodSec = periodTotal(period), active = perDay.filter(d => d.m > 0).length;
    const metDays = keys.filter(k => G().metGoal(k, g)).length;
    const best = perDay.reduce((a, b) => b.m > a.m ? b : a, { k: '', m: 0 });
    const bySubj = periodSubjectTotals(period);
    const rows = CFG.map(c => { const s = subStats(c.name); return s.total ? { name: c.name, icon: c.icon, color: colorOf(c.name), mastered: Math.round(s.mastered / s.total * 100), discovered: Math.round(s.discovered / s.total * 100), total: s.total, m: s.mastered } : null; }).filter(Boolean);
    const gs = globalStats(), lifeSec = allTimeTotal(), bestStreak = G().bestStreak();
    const lifeDays = Object.keys(getTimeLog()).filter(k => dayTimeTotal(k) > 0).length;
    const synced = window.BacMasterSync && window.BacMasterSync.api && window.BacMasterSync.api.state.user;
    const heroMsg = st.done ? 'Objectif du jour atteint, bravo ! 🎉' : st.sec === 0 ? 'Pas encore de révision aujourd’hui.' : `Encore ${st.remainMin} min pour valider ta journée.`;
    const tile = (ico, val, lab, cls) => `<div class="bs-tile ${cls || ''}"><div class="bs-tico">${ico}</div><div class="bs-tval">${val}</div><div class="bs-tlab">${lab}</div></div>`;

    render(`
      <div class="breadcrumb"><button class="bc-btn" onclick="goHome()">🏠 Accueil</button></div>
      <div class="bs-page">
        <section class="bs-hero ${st.done ? 'done' : ''}">
          <div class="bs-hero-ring">${ring(st.pct, st.done)}<div class="bs-hero-ringtxt"><b>${st.doneMin}</b><span>/ ${goalMin} min</span></div></div>
          <div class="bs-hero-main">
            <h1>📊 Mes statistiques</h1>
            <p>${heroMsg}</p>
            <div class="bs-hero-pills">
              <span class="bs-pill">${st.streak > 0 ? '🔥' : '💤'} Série : <b>${st.streak}</b> jour${st.streak > 1 ? 's' : ''}</span>
              <span class="bs-pill">🏆 Record : <b>${bestStreak}</b></span>
              <span class="bs-pill">🎯 Objectif : <b>${goalMin} min</b></span>
            </div>
            <button class="bs-hero-btn" onclick="BacMasterGoal.openSettings()">⚙️ Changer mon objectif &amp; mes rappels</button>
          </div>
        </section>

        <div class="bs-seg" role="tablist" aria-label="Période">${[7, 30, 90].map(p => `<button role="tab" aria-selected="${p === period}" class="${p === period ? 'on' : ''}" onclick="BacMasterStats.setPeriod(${p})">${p === 7 ? '7 jours' : p === 30 ? '30 jours' : '3 mois'}</button>`).join('')}</div>

        <div class="bs-tiles">
          ${tile('⏱️', fmtDuration(periodSec), 'temps de révision', 't1')}
          ${tile('📅', `${active}<small>/${period}</small>`, 'jours actifs', 't2')}
          ${tile('✅', `${metDays}<small>/${period}</small>`, 'objectifs atteints', 't3')}
          ${tile('📈', active ? fmtDuration(periodSec / active) : '—', 'par jour actif', 't4')}
          ${tile('⭐', best.m ? `${best.m}<small> min</small>` : '—', best.m ? `meilleur jour (${fmtDay(best.k)})` : 'meilleur jour', 't5')}
          ${tile('🎴', `${gs.mastered}<small>/${gs.total}</small>`, 'cartes maîtrisées', 't6')}
        </div>

        <section class="bs-card"><h2>Temps de révision par jour</h2><p class="bs-sub">Vert : objectif atteint · orange : aujourd’hui · touche une barre pour le détail</p>${barsSVG(keys, goalMin)}</section>

        <div class="bs-two">
          <section class="bs-card"><h2>🕸️ Ma toile d’araignée</h2><p class="bs-sub">Chaque pointe = une matière. Violet : cartes maîtrisées · bleu pointillé : cartes découvertes.</p>${radarSVG(rows)}</section>
          <section class="bs-card"><h2>🧩 Où va mon temps</h2><p class="bs-sub">Répartition sur ${period === 7 ? '7 jours' : period === 30 ? '30 jours' : '3 mois'}.</p>${donutSVG(bySubj, periodSec)}</section>
        </div>

        <section class="bs-card"><h2>Mes matières</h2><p class="bs-sub">Touche une matière pour voir le temps passé et tes réussites en détail.</p><div class="bs-subjects">${rows.length ? rows.sort((a, b) => b.mastered - a.mastered).map(r => `<button class="bs-subj" onclick="openSubjectStats('${esc(r.name).replace(/'/g, '\\&#39;')}','stats')" aria-label="Détail ${esc(r.name)}"><div class="bs-subj-top"><span>${r.icon} ${esc(r.name)}</span><b>${r.mastered}% ›</b></div><div class="bs-track"><i class="d" style="width:${r.discovered}%;background:${r.color}33"></i><i class="m" style="width:${r.mastered}%;background:${r.color}"></i></div></button>`).join('') : '<p class="bs-empty">Aucune carte pour l’instant.</p>'}</div></section>

        <section class="bs-card"><h2>🗓️ Assiduité — 16 semaines</h2><p class="bs-sub">Chaque case est un jour. Plus elle est foncée, plus tu as révisé.</p>${heatmapHTML(16, goalMin)}</section>

        <section class="bs-card"><h2>🏅 Mes records</h2><div class="bs-records">
          <div><b>${bestStreak}</b><span>jours de série (record)</span></div>
          <div><b>${fmtDuration(lifeSec)}</b><span>de révision au total</span></div>
          <div><b>${lifeDays}</b><span>jours révisés</span></div>
          <div><b>${gs.discovered}</b><span>cartes découvertes</span></div></div></section>

        ${[typeof psPrioritiesHTML === 'function' ? psPrioritiesHTML() : '', typeof skillsOverviewHTML === 'function' ? skillsOverviewHTML() : '', typeof errorsOverviewHTML === 'function' ? errorsOverviewHTML() : ''].filter(Boolean).length ? `<section class="bs-card bs-work"><h2>🛠️ À travailler</h2>${typeof psPrioritiesHTML === 'function' ? psPrioritiesHTML() : ''}${typeof skillsOverviewHTML === 'function' ? skillsOverviewHTML() : ''}${typeof errorsOverviewHTML === 'function' ? errorsOverviewHTML() : ''}</section>` : ''}

        <p class="bs-foot">${synced ? '☁️ Statistiques synchronisées avec ton compte sur tous tes appareils.' : '💡 Connecte-toi à ton compte pour retrouver tes statistiques sur tous tes appareils.'}</p>
      </div>`);
  };
  window.BacMasterStats = { setPeriod(p) { period = p; const y = window.scrollY; window.openStats(); window.scrollTo(0, y); } };
})();


/* ============================================================
   Statistiques détaillées d'UNE matière : temps par activité, réussites, évaluations, chapitres
   ============================================================ */
(function () {
  'use strict';
  let sPeriod = 30;
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ACTS = [['📖', 'Lecture du cours', '#6366f1'], ['🎴', 'Flashcards', '#0ea5e9'], ['🧩', 'Exercices', '#10b981']];
  const actOf = a => ACTS.find(x => String(a).startsWith(x[0]));
  // Temps d'une matière : { par activité, par chapitre, par jour } sur une période (null = depuis toujours)
  function subjectTime(subject, days) {
    const log = getTimeLog(), keys = days ? new Set(dateKeysRange(days)) : null, res = { act: {}, ch: {}, day: {}, total: 0 };
    for (const [day, subs] of Object.entries(log)) {
      if (keys && !keys.has(day)) continue;
      for (const [act, sec] of Object.entries((subs || {})[subject] || {})) {
        const a = actOf(act), chap = String(act).split(' — ').slice(1).join(' — ');
        if (a) res.act[a[1]] = (res.act[a[1]] || 0) + sec;
        if (chap) res.ch[chap] = (res.ch[chap] || 0) + sec;
        res.day[day] = (res.day[day] || 0) + sec; res.total += sec;
      }
    }
    return res;
  }
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  function dayBars(keys, perDay, color) {
    const vals = keys.map(k => Math.round((perDay[k] || 0) / 60)), max = Math.max(10, ...vals), W = 640, H = 150, pb = 22, pt = 8, bw = Math.max(3, Math.min(24, (W - 20) / keys.length * 0.6)), step = (W - 20) / keys.length;
    return `<svg viewBox="0 0 ${W} ${H}" class="bs-chart" role="img" aria-label="Minutes par jour"><g>${keys.map((k, i) => { const h = vals[i] / max * (H - pb - pt), x = 10 + step * i + (step - bw) / 2;
      return `<rect x="${x.toFixed(1)}" y="${(H - pb - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(vals[i] ? 3 : 0, h).toFixed(1)}" rx="${Math.min(6, bw / 2)}" fill="${color}"><title>${new Date(k + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} — ${vals[i]} min</title></rect>${keys.length <= 14 || i % Math.ceil(keys.length / 8) === 0 ? `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle" class="bs-axis">${new Date(k + 'T12:00:00').getDate()}</text>` : ''}`; }).join('')}</g></svg>`;
  }

  window.openSubjectStats = function (subject, from) {
    if (!subject || !db[subject]) return;
    try { clearInterval(qTimer); } catch (e) { /* ignore */ }
    curTrackedPage = null; curSubject = subject;
    const cfg = CFG.find(c => c.name === subject) || { icon: '📚' }, col = subjectColor(subject);
    const T = subjectTime(subject, sPeriod || null), life = subjectTime(subject, null);
    const chapters = Object.keys(db[subject]).map(c => ({ name: c, d: psChapterData(subject, c) }));
    const sum = f => chapters.reduce((a, c) => a + f(c.d), 0);
    const cards = { total: sum(d => d.cards.total), seen: sum(d => d.cards.seen), mastered: sum(d => d.cards.mastered) };
    const exo = { reussi: sum(d => d.exo.reussi), presque: sum(d => d.exo.presque), a_revoir: sum(d => d.exo.a_revoir), nonfait: sum(d => d.exo.nonfait) };
    const exoDone = exo.reussi + exo.presque + exo.a_revoir, nExo = exoDone + exo.nonfait;
    const ev = getPerf().filter(e => e.s === subject), flash = ev.filter(e => e.y === 'flash' || e.y === 'card'), flashOk = flash.length ? Math.round(flash.reduce((a, e) => a + (+e.r || 0), 0) / flash.length * 100) : null;
    const assess = getAssess().filter(r => r.s === subject).sort((a, b) => a.t - b.t), avgEval = assess.length ? Math.round(assess.reduce((a, r) => a + r.score, 0) / assess.length * 100) : null;
    const keys = dateKeysRange(sPeriod === 0 ? 90 : Math.max(sPeriod, 7));
    const maxAct = Math.max(1, ...ACTS.map(a => T.act[a[1]] || 0));
    const actRows = ACTS.map(a => { const v = T.act[a[1]] || 0; return `<div class="sx-act"><div class="sx-act-top"><span>${a[0]} ${a[1]}</span><b>${fmtDuration(v)}</b></div><div class="bs-track"><i class="m" style="width:${pct(v, maxAct)}%;background:${a[2]}"></i></div><small>${pct(v, T.total)} % du temps de ${esc(subject)}</small></div>`; }).join('');
    const evBars = assess.slice(-8).map(r => `<div class="sx-ev" title="${new Date(r.t).toLocaleDateString('fr-FR')} — ${Math.round(r.score * 100)} %"><i style="height:${Math.max(6, Math.round(r.score * 100))}%;background:${r.score >= .75 ? '#22c55e' : r.score >= .5 ? '#f59e0b' : '#ef4444'}"></i><span>${Math.round(r.score * 100)}</span></div>`).join('');
    const rows = chapters.sort((a, b) => (T.ch[b.name] || 0) - (T.ch[a.name] || 0)).map(c => { const d = c.d, st = d.state, done = d.exo.reussi + d.exo.presque + d.exo.a_revoir, last = d.evals[0] ? Math.round(d.evals[0].ch[c.name][0] / d.evals[0].ch[c.name][1] * 100) + ' %' : '—';
      return `<button class="sx-row" onclick="openChapterStats('${esc(subject).replace(/'/g, '\\&#39;')}','${esc(c.name).replace(/'/g, '\\&#39;')}','${esc(from || 'subject')}')"><div class="sx-row-top"><b>${esc(c.name)}</b><span class="ps-pill" style="color:${st.col};border-color:${st.col}">${st.icon} ${st.label}</span></div>
        <div class="ps-chips"><span title="Temps passé (période)">⏱️ ${fmtDuration(T.ch[c.name] || 0)}</span><span title="Cartes maîtrisées">🎴 ${d.cards.mastered}/${d.cards.total}</span><span title="Exercices faits">✏️ ${done}/${d.nExo}</span><span title="Dernière évaluation">🧪 ${last}</span></div></button>`; }).join('');
    const back = from === 'stats' ? "openStats()" : `goSubject('${esc(subject).replace(/'/g, '\\&#39;')}')`;
    render(`
      <div class="breadcrumb"><button class="bc-btn" onclick="${back}">← ${from === 'stats' ? 'Statistiques' : esc(subject)}</button></div>
      <div class="bs-page" style="--c:${col}">
        <section class="sx-hero"><div class="sx-hero-ico">${cfg.icon}</div><div><h1>${esc(subject)}</h1><p>${fmtDuration(life.total)} de révision au total</p>
          <div class="bs-hero-pills"><span class="bs-pill">🎴 <b>${cards.mastered}</b>/${cards.total} maîtrisées</span>${flashOk !== null ? `<span class="bs-pill">✅ <b>${flashOk}%</b> de bonnes réponses</span>` : ''}${avgEval !== null ? `<span class="bs-pill">🧪 moyenne <b>${avgEval}%</b></span>` : ''}</div></div></section>
        <div class="bs-seg" role="tablist" aria-label="Période">${[[7, '7 jours'], [30, '30 jours'], [0, 'Tout']].map(([p, l]) => `<button class="${p === sPeriod ? 'on' : ''}" onclick="BacMasterStats.subjPeriod(${p},'${esc(subject).replace(/'/g, '\\&#39;')}','${esc(from || '')}')">${l}</button>`).join('')}</div>
        <section class="bs-card"><h2>⏱️ Où va ton temps en ${esc(subject)}</h2><p class="bs-sub">${sPeriod ? 'Sur ' + sPeriod + ' jours' : 'Depuis le début'} : <b>${fmtDuration(T.total)}</b>. Le temps passé à écrire ou modifier un cours n’est pas compté.</p><div class="sx-acts">${actRows}</div></section>
        <section class="bs-card"><h2>Par jour</h2>${dayBars(keys, T.day, col)}</section>
        <div class="bs-two">
          <section class="bs-card"><h2>🎴 Flashcards</h2><div class="sx-big">${cards.mastered}<small>/${cards.total} maîtrisées</small></div><div class="bs-track" style="margin:6px 0 10px"><i class="d" style="width:${pct(cards.seen, cards.total)}%;background:${col}44"></i><i class="m" style="width:${pct(cards.mastered, cards.total)}%;background:${col}"></i></div>
            <ul class="sx-list"><li><span>Découvertes</span><b>${cards.seen}/${cards.total}</b></li><li><span>Réponses enregistrées</span><b>${flash.length}</b></li><li><span>Taux de bonnes réponses</span><b>${flashOk !== null ? flashOk + ' %' : '—'}</b></li></ul></section>
          <section class="bs-card"><h2>✏️ Exercices</h2><div class="sx-big">${exo.reussi}<small>/${nExo} réussis</small></div><div class="bs-track" style="margin:6px 0 10px"><i class="m" style="width:${pct(exo.reussi, nExo)}%;background:#22c55e"></i></div>
            <ul class="sx-list"><li><span>🟢 Réussis</span><b>${exo.reussi}</b></li><li><span>🟡 Presque</span><b>${exo.presque}</b></li><li><span>🔴 À revoir</span><b>${exo.a_revoir}</b></li><li><span>⚪ Pas encore faits</span><b>${exo.nonfait}</b></li></ul></section>
        </div>
        <section class="bs-card"><h2>🧪 Évaluations</h2>${assess.length ? `<div class="sx-evwrap"><div class="sx-evbars">${evBars}</div><ul class="sx-list"><li><span>Évaluations passées</span><b>${assess.length}</b></li><li><span>Moyenne</span><b>${avgEval} %</b></li><li><span>Dernière</span><b>${Math.round(assess[assess.length - 1].score * 100)} %</b></li></ul></div>` : '<p class="bs-empty">Aucune évaluation pour le moment. Lance-en une depuis la matière pour mesurer ta maîtrise réelle.</p>'}</section>
        <section class="bs-card"><h2>📚 Chapitres</h2><p class="bs-sub">Triés par temps passé. Touche un chapitre pour le détail.</p><div class="sx-rows">${rows}</div></section>
      </div>`);
    window.scrollTo(0, 0);
  };
  window.openCourseStats = function (subject, from) { window.openSubjectStats(subject, from); };
  window.BacMasterStats.subjPeriod = function (p, subject, from) { sPeriod = p; const y = window.scrollY; window.openSubjectStats(subject, from || undefined); window.scrollTo(0, y); };
})();
