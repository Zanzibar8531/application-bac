/* ============================================================
   BacMaster — bm-agenda.js
   Vrai agenda des évaluations : calendrier mensuel, pastilles de couleur
   par matière, ajout en touchant un jour, liste « À venir » avec compte à rebours.
   Remplace openAgenda() de script.js (mêmes données : bacmaster_evals).
   ============================================================ */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const KINDS = [['ds', '📝', 'DS'], ['oral', '🎤', 'Oral'], ['devoir', '📚', 'Devoir'], ['exam', '🎓', 'Examen']];
  const kindOf = k => KINDS.find(x => x[0] === k) || KINDS[0];
  const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  let cursor = (() => { const d = new Date(); d.setDate(1); d.setHours(12, 0, 0, 0); return d; })();
  let selectedKind = 'ds';
  const color = name => (typeof subjectColor === 'function' ? subjectColor(name) : '#6366f1');
  const icon = name => { const c = CFG.find(x => x.name === name); return c ? c.icon : '📚'; };
  const ymd = (y, m, d) => y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');

  function load() {   // chaque évaluation reçoit un identifiant stable (pour la supprimer proprement)
    const list = purgeOldEvals(); let changed = false;
    list.forEach(e => { if (!e.id) { e.id = 'e' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3); changed = true; } });
    if (changed) saveEvals(list);
    return list;
  }
  const diffDays = date => Math.round((new Date(date + 'T12:00:00') - new Date(dayKey() + 'T12:00:00')) / 86400000);
  const label = n => n === 0 ? 'Aujourd’hui' : n === 1 ? 'Demain' : n === -1 ? 'Hier' : n > 0 ? 'J-' + n : 'il y a ' + (-n) + ' j';

  function gridHTML(list) {
    const y = cursor.getFullYear(), m = cursor.getMonth(), first = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    const today = dayKey(), byDay = {};
    list.forEach(e => (byDay[e.date] = byDay[e.date] || []).push(e));
    let cells = '';
    for (let i = 0; i < first; i++) cells += '<div class="ag2-cell off"></div>';
    for (let d = 1; d <= days; d++) {
      const k = ymd(y, m, d), evs = byDay[k] || [], isToday = k === today, past = k < today;
      const chips = evs.slice(0, 2).map(e => `<span class="ag2-chip" style="--c:${color(e.subject)}" title="${esc(e.subject)}${e.note ? ' — ' + esc(e.note) : ''}">${icon(e.subject)}<em>${esc(e.note || e.subject)}</em></span>`).join('');
      const dots = evs.map(e => `<i style="background:${color(e.subject)}"></i>`).join('');
      cells += `<button class="ag2-cell ${isToday ? 'today' : ''} ${past ? 'past' : ''} ${evs.length ? 'has' : ''}" data-day="${k}" aria-label="${d} ${MONTHS[m]}${evs.length ? ', ' + evs.length + ' évaluation' + (evs.length > 1 ? 's' : '') : ''}">
        <span class="ag2-num">${d}</span><span class="ag2-chips">${chips}${evs.length > 2 ? `<span class="ag2-more">+${evs.length - 2}</span>` : ''}</span><span class="ag2-dots">${dots}</span></button>`;
    }
    return `<div class="ag2-grid" role="grid"><div class="ag2-dow">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(x => `<span>${x}</span>`).join('')}</div><div class="ag2-days">${cells}</div></div>`;
  }
  function upcomingHTML(list) {
    const up = list.filter(e => diffDays(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);
    if (!up.length) return '<p class="ag2-empty">Aucune évaluation à venir. Touche un jour du calendrier pour en ajouter une. 🎯</p>';
    return up.map(e => { const n = diffDays(e.date), k = kindOf(e.kind), cls = n <= 2 ? 'hot' : n <= 7 ? 'soon' : '';
      return `<div class="ag2-item ${cls}" style="--c:${color(e.subject)}"><div class="ag2-ico">${icon(e.subject)}</div>
        <div class="ag2-info"><b>${esc(e.subject)}</b><span>${k[1]} ${k[2]}${e.note ? ' · ' + esc(e.note) : ''}</span></div>
        <div class="ag2-when"><b>${label(n)}</b><span>${new Date(e.date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span></div></div>`; }).join('');
  }

  function openAgenda() {
    clearInterval(typeof qTimer !== 'undefined' ? qTimer : 0); try { curTrackedPage = null; } catch (e) { /* ignore */ }
    const list = load(), y = cursor.getFullYear(), m = cursor.getMonth();
    const nextOne = list.filter(e => diffDays(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))[0];
    render(`
      <div class="breadcrumb"><button class="bc-btn" onclick="goHome()">← Accueil</button></div>
      <div class="ag2-page">
        <div class="ag2-head">
          <div><h1>📅 Mon agenda</h1><p>${nextOne ? `Prochaine évaluation : <b>${esc(nextOne.subject)}</b> — ${(l => /^J-/.test(l) ? l : l.toLowerCase())(label(diffDays(nextOne.date)))}` : 'Ajoute tes contrôles : la révision du jour te fera travailler en priorité les matières concernées.'}</p></div>
          <button class="ag2-add" id="ag2-new">＋ Ajouter</button>
        </div>
        <div class="ag2-layout">
          <section class="ag2-cal">
            <div class="ag2-nav"><button id="ag2-prev" aria-label="Mois précédent">‹</button><h2>${MONTHS[m][0].toUpperCase() + MONTHS[m].slice(1)} ${y}</h2><button id="ag2-next" aria-label="Mois suivant">›</button><button id="ag2-today" class="ag2-todaybtn">Aujourd’hui</button></div>
            ${gridHTML(list)}
          </section>
          <aside class="ag2-side"><h3>À venir</h3>${upcomingHTML(list)}</aside>
        </div>
      </div>`);
    $('ag2-prev').onclick = () => { cursor.setMonth(cursor.getMonth() - 1); openAgenda(); };
    $('ag2-next').onclick = () => { cursor.setMonth(cursor.getMonth() + 1); openAgenda(); };
    $('ag2-today').onclick = () => { cursor = new Date(); cursor.setDate(1); cursor.setHours(12, 0, 0, 0); openAgenda(); };
    $('ag2-new').onclick = () => openDay(dayKey());
    document.querySelectorAll('.ag2-cell[data-day]').forEach(c => c.onclick = () => openDay(c.dataset.day));
  }

  function openDay(day) {
    const list = load().filter(e => e.date === day);
    let m = $('ag2-modal'); if (m) m.remove();
    m = document.createElement('div'); m.id = 'ag2-modal'; m.className = 'bg-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    const title = new Date(day + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    m.innerHTML = `<div class="bg-sheet ag2-sheet"><div class="bg-sheet-head"><b>${title[0].toUpperCase() + title.slice(1)}</b><button class="bg-close" aria-label="Fermer">✕</button></div>
      <div class="bg-sheet-body">
        ${list.length ? `<div class="ag2-daylist">${list.map(e => `<div class="ag2-item" style="--c:${color(e.subject)}"><div class="ag2-ico">${icon(e.subject)}</div><div class="ag2-info"><b>${esc(e.subject)}</b><span>${kindOf(e.kind)[1]} ${kindOf(e.kind)[2]}${e.note ? ' · ' + esc(e.note) : ''}</span></div><button class="ag2-del" data-del="${e.id}" aria-label="Supprimer">🗑️</button></div>`).join('')}</div>` : '<p class="ag2-empty">Rien de prévu ce jour-là.</p>'}
        <h3 class="ag2-h3">➕ Ajouter une évaluation</h3>
        <div class="ag2-kinds">${KINDS.map(k => `<button class="ag2-kind ${selectedKind === k[0] ? 'on' : ''}" data-kind="${k[0]}">${k[1]} ${k[2]}</button>`).join('')}</div>
        <div class="ag2-subjects">${CFG.map(s => `<button class="ag2-subj" data-subj="${esc(s.name)}" style="--c:${color(s.name)}"><span>${s.icon}</span>${esc(s.name)}</button>`).join('')}</div>
        <input type="text" id="ag2-note" class="ag2-note" placeholder="Sur quoi ? (chapitre, thème…) — facultatif" maxlength="80">
        <button class="bg-btn pri full" id="ag2-save" disabled>Choisis une matière</button>
      </div></div>`;
    document.body.appendChild(m);
    let subj = '';
    const close = () => m.remove();
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.bg-close')) close(); });
    m.querySelectorAll('[data-kind]').forEach(b => b.onclick = () => { selectedKind = b.dataset.kind; m.querySelectorAll('[data-kind]').forEach(x => x.classList.toggle('on', x === b)); });
    m.querySelectorAll('[data-subj]').forEach(b => b.onclick = () => { subj = b.dataset.subj; m.querySelectorAll('[data-subj]').forEach(x => x.classList.toggle('on', x === b)); const s = $('ag2-save'); s.disabled = false; s.textContent = `Ajouter ${kindOf(selectedKind)[2]} · ${subj}`; });
    m.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { saveEvals(load().filter(e => e.id !== b.dataset.del)); close(); openAgenda(); showToast('🗑️ Évaluation supprimée'); });
    $('ag2-save').onclick = () => {
      if (!subj) return;
      const evals = load(); evals.push({ id: 'e' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3), subject: subj, date: day, kind: selectedKind, note: ($('ag2-note').value || '').trim() });
      saveEvals(evals); close(); openAgenda(); showToast('📅 Évaluation ajoutée !');
    };
  }
  // Un seul point d’entrée : le bouton Agenda et les jours de la semaine
  // ouvrent exactement le même calendrier de révisions.
  window.openAgenda = function () {
    if (window.BacMasterGoal && typeof window.BacMasterGoal.openCalendar === 'function') {
      window.BacMasterGoal.openCalendar(typeof dayKey === 'function' ? dayKey() : undefined);
    } else {
      openAgenda();
    }
  };
})();
