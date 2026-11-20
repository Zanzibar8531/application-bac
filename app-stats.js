/* ============================================================
   BacMaster — app-stats.js
   Activité, série de jours, agenda des évaluations, temps passé, statistiques
   (ancien script.js découpé : les fichiers se chargent dans cet ordre et partagent le même espace global)
   ============================================================ */
// ── ACTIVITÉ & SÉRIE DE JOURS (dashboard global) ────────────────
// Stocké séparément de `db` (pas une matière) pour ne jamais interférer
// avec le sync GitHub qui parcourt Object.keys(db).
// ── AGENDA DES ÉVALUATIONS ──────────────────────────────────────
// Stocké séparément de `db` (comme l'activité) pour ne jamais interférer
// avec le sync GitHub qui parcourt Object.keys(db).
let curAgendaEvals = [];
function getEvals() {
    try { return JSON.parse(localStorage.getItem('bacmaster_evals') || '[]'); }
    catch(e) { return []; }
}
function saveEvals(evals) { localStorage.setItem('bacmaster_evals', JSON.stringify(evals)); localStorage.setItem('bacmaster_evals_at', String(Date.now())); bmStatsChanged(); }
function purgeOldEvals() {
    const today = dayKey(new Date());
    const before = getEvals();
    const evals = before.filter(e => (new Date(e.date) - new Date(today)) / 86400000 >= -45);   // l'agenda garde 45 jours d'historique
    if(evals.length !== before.length) saveEvals(evals);
    return evals;
}
function upcomingEvals(days) {
    const today = dayKey(new Date());
    return purgeOldEvals()
        .filter(e => { const d = (new Date(e.date) - new Date(today)) / 86400000; return d >= 0 && d <= days; })
        .sort((a,b) => new Date(a.date) - new Date(b.date));
}

// Clé de jour AAAA-MM-JJ en heure LOCALE (évite que la journée change à 1-2 h du matin en France).
function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function bmStatsChanged() {
    try { if (window.BacMasterSync && window.BacMasterSync.onStatsChange) window.BacMasterSync.onStatsChange(); } catch (e) {}
    try { if (window.BacMasterGoal && window.BacMasterGoal.onProgress) window.BacMasterGoal.onProgress(); } catch (e) {}
}

function getActivityDates() {
    try { return JSON.parse(localStorage.getItem('bacmaster_activity') || '[]'); }
    catch(e) { return []; }
}
function logActivity() {
    const today = dayKey(new Date());
    const dates = getActivityDates();
    if(!dates.includes(today)) {
        dates.push(today);
        if(dates.length > 400) dates.shift(); // garde un historique raisonnable
        localStorage.setItem('bacmaster_activity', JSON.stringify(dates));
        bmStatsChanged();
    }
}
function computeStreak() {
    const dates = new Set(getActivityDates());
    let d = new Date();
    const todayKey = dayKey(d);
    if(!dates.has(todayKey)) d.setDate(d.getDate()-1); // pas encore révisé aujourd'hui : ok si hier compte
    let streak = 0;
    while(dates.has(dayKey(d))) {
        streak++;
        d.setDate(d.getDate()-1);
    }
    return streak;
}

// ── SUIVI DU TEMPS PASSÉ (par jour → matière → activité) ────────
// Stocké séparément de `db` et de l'activité booléenne, pour ne jamais
// interférer avec le sync GitHub qui parcourt Object.keys(db).
// curTrackedPage est mis à jour explicitement par chaque écran "actif"
// (lecture de cours, session flashcards, évaluation, exercices) ; les écrans de
// menu/accueil le remettent à null. Un tick régulier ajoute le temps écoulé
// à l'activité en cours, tant que l'onglet est visible.
let curTrackedPage = null;
let timeTrackLastTick = Date.now();

// Le temps de révision est compté PAR APPAREIL puis additionné : si tu révises 10 min sur le téléphone
// et 10 min sur l'ordinateur le même jour, tu as bien 20 min (aucun double comptage).
function deviceId() {
    let id = localStorage.getItem('bacmaster_device_id');
    if (!id) { id = 'd' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); localStorage.setItem('bacmaster_device_id', id); }
    return id;
}
function readJSON(key) { try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) { return {}; } }
function getTimeLog() {
    const out = JSON.parse(JSON.stringify(readJSON('bacmaster_timelog')));          // ancien cumul (avant le comptage par appareil)
    for (const log of Object.values(readJSON('bacmaster_timelog_dev'))) {
        for (const [day, subs] of Object.entries(log || {})) for (const [sub, acts] of Object.entries(subs || {})) for (const [act, sec] of Object.entries(acts || {})) {
            ((out[day] = out[day] || {})[sub] = out[day][sub] || {})[act] = (out[day][sub][act] || 0) + (Number(sec) || 0);
        }
    }
    return out;
}
function saveTimeLog(log) { localStorage.setItem('bacmaster_timelog', JSON.stringify(log)); }

function addTimeSeconds(subject, activity, seconds) {
    if(!subject || !activity || seconds <= 0) return;
    logActivity(); // toute activité réellement trackée (cours, exercices, flashcards, évaluation) allume la bougie du jour
    const today = dayKey(new Date());
    const dev = readJSON('bacmaster_timelog_dev'), me = deviceId();
    const log = dev[me] = dev[me] || {};
    if(!log[today]) log[today] = {};
    if(!log[today][subject]) log[today][subject] = {};
    log[today][subject][activity] = (log[today][subject][activity] || 0) + seconds;
    // Purge : garde un historique raisonnable (~120 jours)
    const base = readJSON('bacmaster_timelog');
    const days = [...new Set([...Object.keys(base), ...Object.values(dev).flatMap(l => Object.keys(l || {}))])].sort();
    if(days.length > 120) {
        const cut = days[days.length - 120];
        for (const k of Object.keys(base)) if (k < cut) delete base[k];
        for (const l of Object.values(dev)) for (const k of Object.keys(l || {})) if (k < cut) delete l[k];
        saveTimeLog(base);
    }
    localStorage.setItem('bacmaster_timelog_dev', JSON.stringify(dev));
    bmStatsChanged();
}

function timeTrackTick() {
    const now = Date.now();
    const elapsed = (now - timeTrackLastTick) / 1000;
    timeTrackLastTick = now;
    // On ignore les gros écarts (téléphone verrouillé, onglet en veille, PC en veille...)
    // pour ne pas compter du temps où l'élève n'était pas vraiment devant l'écran.
    // On ne compte QUE de la vraie révision : pas pendant qu'on écrit ou modifie un cours (éditeur ouvert),
    // et plus rien si on n'a ni touché ni défilé depuis 2 minutes (cours ouvert mais personne devant).
    const editing = !!document.getElementById('editor') || curTab === 'edit' || curTab === 'add';
    const idle = now - lastUserInteraction > 120000;
    if(elapsed > 0 && elapsed <= 20 && document.visibilityState === 'visible' && curTrackedPage && !editing && !idle) {
        addTimeSeconds(curTrackedPage.subject, curTrackedPage.activity, elapsed);
    }
}
let lastUserInteraction = Date.now();
['pointerdown', 'keydown', 'scroll', 'touchstart', 'wheel'].forEach(ev => window.addEventListener(ev, () => { lastUserInteraction = Date.now(); }, { passive: true, capture: true }));
setInterval(timeTrackTick, 5000);
document.addEventListener('visibilitychange', () => { timeTrackLastTick = Date.now(); });

function fmtDuration(totalSeconds) {
    const s = Math.round(totalSeconds);
    const h = Math.floor(s / 3600);
    const m = Math.round((s % 3600) / 60);
    if(h > 0 && m > 0) return `${h}h ${m}min`;
    if(h > 0) return `${h}h`;
    if(m > 0) return `${m} min`;
    return '< 1 min';
}

function dayTimeTotal(dateKey) {
    const log = getTimeLog();
    const day = log[dateKey];
    if(!day) return 0;
    let total = 0;
    Object.values(day).forEach(subj => Object.values(subj).forEach(sec => total += sec));
    return total;
}

// ── Agrégats pour la page Statistiques ────────────────────────
function dateKeysRange(nDays) {
    const keys = [];
    for(let i = nDays-1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        keys.push(dayKey(d));
    }
    return keys;
}

function periodSubjectTotals(nDays) {
    const log = getTimeLog();
    const keys = dateKeysRange(nDays);
    const totals = {}; // subject -> seconds
    keys.forEach(k => {
        const day = log[k];
        if(!day) return;
        Object.entries(day).forEach(([subj, activities]) => {
            const sec = Object.values(activities).reduce((s,v)=>s+v, 0);
            totals[subj] = (totals[subj] || 0) + sec;
        });
    });
    return Object.entries(totals).sort((a,b)=>b[1]-a[1]); // [[subj,sec], ...] trié décroissant
}

function periodTotal(nDays) {
    return dateKeysRange(nDays).reduce((s,k) => s + dayTimeTotal(k), 0);
}

function allTimeTotal() {
    const log = getTimeLog();
    return Object.keys(log).reduce((s,k) => s + dayTimeTotal(k), 0);
}

function heatmapLevel(sec) {
    if(sec <= 0) return 0;
    if(sec < 15*60) return 1;
    if(sec < 30*60) return 2;
    if(sec < 60*60) return 3;
    return 4;
}

function globalStats() {
    let total=0, mastered=0, due=0, discovered=0;
    CFG.forEach(s => { const st = subStats(s.name); total += st.total; mastered += st.mastered; due += st.due; discovered += st.discovered; });
    return { total, mastered, due, discovered, streak: computeStreak() };
}

// ── PAGE DÉTAIL D'UNE JOURNÉE (temps passé) ──────────────────
function openDayDetail(dateKey) {
    clearInterval(qTimer);
    curTrackedPage = null;
    const log = getTimeLog();
    const day = log[dateKey] || {};
    const dateLabel = new Date(dateKey).toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'});
    const totalSec = dayTimeTotal(dateKey);

    // Trie les matières par temps décroissant, et à l'intérieur de chaque
    // matière, trie les activités (cours/flashcards/évaluation/exercices) aussi par temps décroissant.
    const subjects = Object.keys(day)
        .map(subj => {
            const activities = Object.entries(day[subj]).sort((a,b) => b[1]-a[1]);
            const subjTotal = activities.reduce((s,[,sec])=>s+sec, 0);
            return { subj, activities, subjTotal };
        })
        .sort((a,b) => b.subjTotal - a.subjTotal);

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">🏠 Accueil</button>
        </div>
        <div class="page-head">
            <h1 style="text-transform:capitalize">${dateLabel}</h1>
            <p style="color:var(--muted);font-size:.85rem">
                ${totalSec > 0 ? `⏱️ ${fmtDuration(totalSec)} de révision ce jour-là` : "Aucune activité enregistrée ce jour-là"}
            </p>
        </div>
        ${subjects.length === 0 ? `
        <div class="ws-box" style="text-align:center;padding:40px 20px">
            <div style="font-size:2.5rem;margin-bottom:10px">💤</div>
            <p style="color:var(--muted)">Rien à afficher pour ce jour — soit tu n'as pas ouvert l'app, soit c'est avant la mise en place du suivi du temps.</p>
        </div>` : subjects.map(({subj, activities, subjTotal}) => {
            const cfg = CFG.find(c => c.name === subj);
            return `<div class="ws-box day-subj-card">
                <div class="day-subj-header">
                    <span class="day-subj-name">${cfg ? cfg.icon : '📚'} ${escT(subj)}</span>
                    <span class="day-subj-time">${fmtDuration(subjTotal)}</span>
                </div>
                <div class="day-activities">
                    ${activities.map(([activity, sec]) => {
                        const pct = subjTotal > 0 ? Math.round(sec/subjTotal*100) : 0;
                        return `<div class="day-activity-row">
                            <div class="day-activity-top">
                                <span>${escT(activity)}</span>
                                <span class="day-activity-time">${fmtDuration(sec)}</span>
                            </div>
                            <div class="day-activity-bar"><div class="day-activity-fill" style="width:${pct}%"></div></div>
                        </div>`;
                    }).join('')}
                </div>
            </div>`;
        }).join('')}
    `);
}

// ── PAGE STATISTIQUES ─────────────────────────────────────────
function openStats() {
    clearInterval(qTimer);
    curTrackedPage = null;

    const weekTotal = periodTotal(7);
    const monthTotal = periodTotal(30);
    const lifeTotal = allTimeTotal();
    const weekBySubj = periodSubjectTotals(7);

    // Heatmap des 30 derniers jours, regroupée par semaine (colonnes) x jour (lignes), style GitHub.
    const days30 = dateKeysRange(30);
    const firstDow = (new Date(days30[0]).getDay() + 6) % 7; // lundi=0
    const cells = Array(firstDow).fill(null).concat(days30.map(k => ({ key: k, sec: dayTimeTotal(k) })));
    while(cells.length % 7 !== 0) cells.push(null);
    const weeks = [];
    for(let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i+7));

    const bestSubj = weekBySubj[0];

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">🏠 Accueil</button>
        </div>
        <div class="page-head">
            <h1>📊 Statistiques</h1>
            <p style="color:var(--muted);font-size:.85rem">Ta progression en un coup d'œil</p>
        </div>

        <div class="stats-grid">
            <div class="ws-box stats-tile">
                <div class="stats-tile-val">${fmtDuration(weekTotal)}</div>
                <div class="stats-tile-label">cette semaine</div>
            </div>
            <div class="ws-box stats-tile">
                <div class="stats-tile-val">${fmtDuration(monthTotal)}</div>
                <div class="stats-tile-label">30 derniers jours</div>
            </div>
            <div class="ws-box stats-tile">
                <div class="stats-tile-val">${fmtDuration(lifeTotal)}</div>
                <div class="stats-tile-label">depuis le début du suivi</div>
            </div>
        </div>

        ${bestSubj ? `<p style="color:var(--muted);font-size:.85rem;margin:4px 0 16px">Cette semaine, ta matière la plus travaillée : <strong style="color:var(--text)">${escT(bestSubj[0])}</strong> (${fmtDuration(bestSubj[1])}).</p>` : ''}

        ${typeof psPrioritiesHTML==='function' ? psPrioritiesHTML() : ''}
        ${typeof skillsOverviewHTML==='function' ? skillsOverviewHTML() : ''}
        ${typeof errorsOverviewHTML==='function' ? errorsOverviewHTML() : ''}

        <div class="ws-box">
            <h3 style="margin-bottom:14px">Répartition par matière (7 derniers jours)</h3>
            ${weekBySubj.length === 0 ? `<p style="color:var(--muted);font-size:.85rem">Pas encore de données cette semaine.</p>` : weekBySubj.map(([subj, sec]) => {
                const cfg = CFG.find(c => c.name === subj);
                const pct = weekTotal > 0 ? Math.round(sec/weekTotal*100) : 0;
                return `<div class="day-activity-row" style="margin-bottom:12px">
                    <div class="day-activity-top">
                        <span>${cfg ? cfg.icon : '📚'} ${escT(subj)}</span>
                        <span class="day-activity-time">${fmtDuration(sec)}</span>
                    </div>
                    <div class="day-activity-bar"><div class="day-activity-fill" style="width:${pct}%"></div></div>
                </div>`;
            }).join('')}
        </div>

        <div class="ws-box">
            <h3 style="margin-bottom:14px">Assiduité — 30 derniers jours</h3>
            <div class="heatmap">
                ${weeks.map(week => `<div class="heatmap-col">
                    ${week.map(cell => cell ? `<div class="heatmap-cell lvl${heatmapLevel(cell.sec)}" onclick="openDayDetail('${cell.key}')" title="${new Date(cell.key).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})} — ${cell.sec>0?fmtDuration(cell.sec):'aucune activité'}"></div>` : `<div class="heatmap-cell lvl-empty"></div>`).join('')}
                </div>`).join('')}
            </div>
            <div class="heatmap-legend">
                <span>Moins</span>
                <div class="heatmap-cell lvl0"></div>
                <div class="heatmap-cell lvl1"></div>
                <div class="heatmap-cell lvl2"></div>
                <div class="heatmap-cell lvl3"></div>
                <div class="heatmap-cell lvl4"></div>
                <span>Plus</span>
            </div>
        </div>
    `);
}

// ── PAGE AGENDA ──────────────────────────────────────────────
function openAgenda() {
    const today = dayKey(new Date());
    curAgendaEvals = purgeOldEvals().sort((a,b) => new Date(a.date) - new Date(b.date));
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">← Accueil</button>
        </div>
        <div class="ws-box">
            <h2 style="margin-top:0">📅 Mes évaluations</h2>
            <p style="color:var(--muted);font-size:.85rem;margin-bottom:16px">
                Ajoute tes contrôles à venir : la "Révision du jour" te fera réviser en priorité les matières concernées à l'approche de la date.
            </p>
            <div class="agenda-form">
                <select id="ag-subject" class="field">
                    ${CFG.map(s => `<option value="${esc(s.name)}">${s.icon} ${s.name}</option>`).join('')}
                </select>
                <input type="date" id="ag-date" class="field" min="${today}">
                <input type="text" id="ag-note" class="field" placeholder="Sur quoi ? (optionnel)">
                <button class="btn-main" onclick="addEval()">➕ Ajouter à l'agenda</button>
            </div>
            <div class="agenda-list">
                ${curAgendaEvals.length===0 ? '<p style="color:var(--muted);text-align:center;padding:20px 0">Aucune évaluation programmée.</p>' :
                curAgendaEvals.map((e,i) => {
                    const diff = Math.round((new Date(e.date) - new Date(today)) / 86400000);
                    const urgentCls = diff<=2 ? 'ag-urgent' : diff<=7 ? 'ag-soon' : '';
                    const cfg = CFG.find(c => c.name === e.subject);
                    const diffLabel = diff===0 ? "Aujourd'hui" : diff===1 ? 'Demain' : diff+' jours';
                    return `<div class="agenda-item ${urgentCls}">
                        <div class="ag-icon">${cfg ? cfg.icon : '📚'}</div>
                        <div class="ag-info">
                            <div class="ag-subject">${escT(e.subject)}</div>
                            ${e.note ? `<div class="ag-note">${escT(e.note)}</div>` : ''}
                        </div>
                        <div class="ag-date">
                            <div class="ag-date-val">${new Date(e.date).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</div>
                            <div class="ag-date-diff">${diffLabel}</div>
                        </div>
                        <button class="ag-del" onclick="deleteEval(${i})" title="Supprimer">✕</button>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `);
}
function addEval() {
    const subject = $('ag-subject').value;
    const date = $('ag-date').value;
    const note = ($('ag-note').value || '').trim();
    if(!date) { showToast('Choisis une date !', 'warn'); return; }
    const evals = purgeOldEvals();
    evals.push({subject, date, note});
    saveEvals(evals);
    showToast('📅 Évaluation ajoutée !');
    openAgenda();
}
function deleteEval(i) {
    curAgendaEvals.splice(i, 1);
    saveEvals(curAgendaEvals);
    openAgenda();
}
