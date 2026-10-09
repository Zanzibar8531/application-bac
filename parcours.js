/* ============================================================
   BACMASTER — parcours.js
   États du cours + préparation aux contrôles + mini-évaluations.

   ÉTATS D'UN CHAPITRE (calculés, jamais saisis à la main)
     ⚪ À découvrir      rien ouvert, rien révisé
     🟡 En apprentissage  commencé, pas encore validé par une évaluation
     🟢 Appris            dernière évaluation ≥ 80 % (sur ≥ 3 questions du chapitre)
     🟠 À consolider      Appris, mais réponses récentes en baisse
                          (ou chapitre pas revu depuis 4 semaines)
     🔴 À revoir          réponses récentes trop faibles après validation,
                          ou dernière évaluation sous 50 %

   « Appris » n'est jamais définitif : après une évaluation réussie, on
   surveille tes réponses suivantes (flashcards, exercices, mini-évaluations).
   Si elles baissent, l'état redescend ; si elles remontent, il remonte.
   Seule une ÉVALUATION peut valider un chapitre la première fois.

   MINI-ÉVALUATIONS : courtes séries ciblées sur tes faiblesses détectées
   (chapitres fragiles, compétence faible, carnet d'erreurs). Elles
   mettent à jour les statistiques et l'état des chapitres, mais ne
   valident pas un chapitre à elles seules.

   Ce fichier doit être chargé APRÈS evaluation.js et AVANT script.js.
   ============================================================ */

const PS_PASS       = 0.80;   // note minimale pour valider un chapitre
const PS_MIN_Q      = 3;      // questions minimum sur ce chapitre dans l'évaluation
const PS_FAIL       = 0.50;   // en dessous : à revoir
const PS_KEEP       = 0.75;   // réponses récentes ≥ : reste Appris
const PS_WEAK       = 0.60;   // réponses récentes < : à revoir
const PS_MIN_RECENT = 5;      // réponses nécessaires pour juger la tendance
const PS_STALE_DAYS = 28;     // sans aucune activité : à consolider

const PS_STATES = {
    new:         { icon: '⚪', label: 'À découvrir',      col: '#9ca3af', rank: 4 },
    learning:    { icon: '🟡', label: 'En apprentissage', col: '#d97706', rank: 2 },
    learned:     { icon: '🟢', label: 'Appris',           col: '#059669', rank: 3 },
    consolidate: { icon: '🟠', label: 'À consolider',     col: '#ea580c', rank: 1 },
    review:      { icon: '🔴', label: 'À revoir',         col: '#dc2626', rank: 0 },
};
const psPct  = x => Math.round(x * 100);
const psDate = t => new Date(t).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).replace(/\.$/, '');
const psH    = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── CALCUL DE L'ÉTAT ──────────────────────────────────────────
// Tendance récente : les 20 dernières réponses, les plus récentes comptent plus.
function psRecent(events) {
    const ev = events.slice().sort((a, b) => b.t - a.t).slice(0, 20);
    if (!ev.length) return { n: 0, score: null };
    let w = 1, sw = 0, sr = 0;
    ev.forEach(e => { sr += w * e.r; sw += w; w *= 0.92; });
    return { n: ev.length, score: sr / sw };
}

function psState(subject, chapter, cache) {
    const ch = db[subject] && db[subject][chapter];
    if (!ch) return null;
    const events = (cache || getPerf().filter(e => e.s === subject)).filter(e => e.c === chapter);
    const touched = !!ch.lastRead || events.length > 0 || (ch.flashcards || []).some(c => c.due);
    const evals = asmChapterResults(subject);
    const ev = evals[chapter];
    const nErr = getErrors().filter(x => x.s === subject && x.c === chapter && x.st === 'actif').length;
    const out = { subject, chapter, ev, nErr, recent: null };
    const make = (id, reason) => Object.assign(out, PS_STATES[id], { id, reason });

    if (!touched) return make('new', "Tu n'as pas encore ouvert ce chapitre.");
    if (!ev) return make('learning', 'Pas encore évalué : fais une évaluation pour valider ce chapitre.');

    if (ev.ratio >= PS_PASS && ev.n >= PS_MIN_Q) {
        const since = events.filter(e => e.t > ev.t && !e.e);
        const r = psRecent(since);
        out.recent = r;
        const lastAct = Math.max(ev.t, ...events.map(e => e.t));
        const idle = Math.floor((Date.now() - lastAct) / 86400000);
        if (r.n >= PS_MIN_RECENT && r.score < PS_WEAK)
            return make('review', `Validé à ${psPct(ev.ratio)} % le ${psDate(ev.t)}, mais tes réponses récentes sont tombées à ${psPct(r.score)} %.`);
        if (r.n >= PS_MIN_RECENT && r.score < PS_KEEP)
            return make('consolidate', `Validé à ${psPct(ev.ratio)} % le ${psDate(ev.t)}, mais tes réponses récentes baissent (${psPct(r.score)} %).`);
        if (idle > PS_STALE_DAYS)
            return make('consolidate', `Validé à ${psPct(ev.ratio)} %, mais pas revu depuis ${idle} jours : ça s'oublie.`);
        return make('learned', `Validé à ${psPct(ev.ratio)} % le ${psDate(ev.t)}` + (r.n >= PS_MIN_RECENT ? ` · réponses récentes : ${psPct(r.score)} %.` : '.'));
    }
    if (ev.ratio < PS_FAIL) return make('review', `Dernière évaluation : ${psPct(ev.ratio)} % (le ${psDate(ev.t)}).`);
    return make('learning', ev.n < PS_MIN_Q
        ? `Trop peu de questions sur ce chapitre dans ta dernière évaluation (${Math.round(ev.n * 10) / 10}) : il en faut ${PS_MIN_Q}.`
        : `Dernière évaluation : ${psPct(ev.ratio)} % (il faut ${psPct(PS_PASS)} % pour valider).`);
}

// États de tous les chapitres d'une matière (un seul passage sur le journal)
function psSubjectStates(subject) {
    const cache = getPerf().filter(e => e.s === subject);
    return Object.keys(db[subject] || {})
        .filter(c => (db[subject][c].flashcards || []).length || String(db[subject][c].cours || '').trim())
        .map(c => psState(subject, c, cache)).filter(Boolean);
}
// Photo des états (avant/après une évaluation)
function psSnapshot(subject, chapters) {
    const snap = {};
    chapters.forEach(c => { const s = psState(subject, c); if (s) snap[c] = s.id; });
    return snap;
}

const psIcon = (s, c) => { const st = psState(s, c); return st ? `<span title="${st.label}">${st.icon}</span>` : ''; };
function psPill(s, c) {
    const st = psState(s, c);
    return st ? `<span class="ps-pill" style="color:${st.col};border-color:${st.col}">${st.icon} ${st.label}</span>` : '';
}

// ── PRÉPARATION AUX CONTRÔLES ─────────────────────────────────
const PS_READY_W = { learned: 1, consolidate: 0.6, learning: 0.4, review: 0.15, new: 0 };
function psReadiness(subject, states) {
    states = states || psSubjectStates(subject);
    if (!states.length) return null;
    return states.reduce((t, s) => t + PS_READY_W[s.id], 0) / states.length;
}
function psAgenda(subject, days) {
    if (typeof upcomingEvals !== 'function') return null;
    const e = upcomingEvals(days || 30).find(x => x.subject === subject);
    if (!e) return null;
    const today = new Date().toISOString().slice(0, 10);
    return { e, days: Math.round((new Date(e.date) - new Date(today)) / 86400000) };
}
function psAgendaBanner(subject) {
    const a = psAgenda(subject, 30);
    if (!a) return '';
    const when = a.days === 0 ? "aujourd'hui" : a.days === 1 ? 'demain' : `dans ${a.days} jours`;
    return `<div class="info-box orange"><b>📅 Éval de ${psH(subject)} ${when}</b>${a.e.note ? ' — ' + psH(a.e.note) : ''}. Un contrôle complet est le meilleur entraînement.</div>`;
}

// Résumé affiché en haut de la page d'une matière
function psSubjectSummaryHTML(subject) {
    const states = psSubjectStates(subject);
    if (!states.length) return '';
    const counts = {}; states.forEach(s => { counts[s.id] = (counts[s.id] || 0) + 1; });
    const pills = ['learned', 'learning', 'consolidate', 'review', 'new'].filter(k => counts[k])
        .map(k => `<span class="ps-pill" style="color:${PS_STATES[k].col};border-color:${PS_STATES[k].col}">${PS_STATES[k].icon} ${counts[k]} ${PS_STATES[k].label.toLowerCase()}</span>`).join('');
    let ready = '';
    const a = psAgenda(subject, 30);
    if (a) {
        const r = psReadiness(subject, states), lv = skLevel(r);
        const todo = states.filter(s => ['review', 'consolidate', 'learning', 'new'].includes(s.id))
            .sort((x, y) => x.rank - y.rank).slice(0, 4);
        ready = `<div class="ws-box ps-ready">
            <div class="sk-advice-title">📅 Éval de ${psH(subject)} ${a.days === 0 ? "aujourd'hui" : a.days === 1 ? 'demain' : 'dans ' + a.days + ' jours'}</div>
            <div class="sk-row-bar"><div class="sk-bar"><div class="sk-bar-fill" style="width:${psPct(r)}%;background:${lv.col}"></div></div><span class="sk-val" style="color:${lv.col}">Prêt à ${psPct(r)} %</span></div>
            <p class="sk-hint" style="margin-top:6px">Estimé d'après l'état de tous tes chapitres de la matière (je ne sais pas lesquels sont au programme de ton éval).</p>
            ${todo.length ? `<p style="font-size:.85rem;margin-top:8px"><b>À travailler en priorité :</b> ${todo.map(s => `${s.icon} ${psH(s.chapter)}`).join(' · ')}</p>` : ''}
            <div class="sk-actions">
                <button class="bc-btn" onclick="openEval('${esc(subject)}')">📝 Faire un contrôle</button>
                <button class="bc-btn" onclick="psMiniWeak('${esc(subject)}')">🎯 Mini-évaluation sur mes points faibles</button>
            </div></div>`;
    }
    return `<div class="ps-summary">${pills}<button class="bc-btn" onclick="openCourseStats('${esc(subject)}','subject')">📊 Statistiques des cours</button></div>${ready}`;
}

// Bandeau en haut du menu d'un chapitre
function psChapterBannerHTML(subject, chapter) {
    const st = psState(subject, chapter);
    if (!st) return '';
    const S = esc(subject), C = esc(chapter);
    const btn = (label, js) => `<button class="bc-btn" onclick="${js}">${label}</button>`;
    const acts = [];
    if (st.id === 'new') acts.push(btn('📖 Lire le cours', `psOpenTab('${S}','${C}','cours')`));
    if (['learning'].includes(st.id)) { acts.push(btn('🎴 Flashcards', `curSubject='${S}';openSRS()`)); acts.push(btn('🧪 Évaluer ce chapitre', `openEval('${S}','${C}')`)); }
    if (['consolidate', 'review'].includes(st.id)) {
        acts.push(btn('🎯 Mini-évaluation', `psMiniChapter('${S}','${C}')`));
        acts.push(btn('🎴 Flashcards', `curSubject='${S}';openSRS()`));
        if (st.id === 'review') acts.push(btn('📖 Relire le cours', `psOpenTab('${S}','${C}','cours')`));
        acts.push(btn('🧪 Réévaluer', `openEval('${S}','${C}')`));
    }
    acts.push(btn('📊 Statistiques du chapitre', `openChapterStats('${S}','${C}','subject')`));
    return `<div class="ws-box ps-banner" style="border-left-color:${st.col}">
        <div class="ps-banner-top"><span class="ps-big">${st.icon}</span><div><strong>${st.label}</strong>
        <div class="ps-reason">${psH(st.reason)}</div></div></div>
        ${st.nErr ? `<p class="ps-reason" style="margin-top:8px">📓 ${st.nErr} erreur${st.nErr > 1 ? 's' : ''} à retravailler dans ce chapitre.</p>` : ''}
        ${acts.length ? `<div class="sk-actions">${acts.join('')}</div>` : ''}</div>`;
}
function psOpenTab(s, c, tab) {
    if (!db[s] || !db[s][c]) return;
    curSubject = s; curChapter = c; curTab = tab;
    chapFrom = 'menu';
    renderChapter();
}
function psOpenChapter(s, c) {
    if (!db[s] || !db[s][c]) return;
    curSubject = s; goChapter(c);
}

// Priorités sur la page Statistiques : « qu'est-ce que je dois travailler maintenant ? »
function psPrioritiesHTML() {
    const all = [];
    CFG.forEach(c => { if (db[c.name]) psSubjectStates(c.name).forEach(s => all.push(Object.assign({ icon2: c.icon }, s))); });
    if (!all.length) return '';
    const counts = {}; all.forEach(s => { counts[s.id] = (counts[s.id] || 0) + 1; });
    const pills = ['learned', 'learning', 'consolidate', 'review', 'new'].filter(k => counts[k])
        .map(k => `<span class="ps-pill" style="color:${PS_STATES[k].col};border-color:${PS_STATES[k].col}">${PS_STATES[k].icon} ${counts[k]} ${PS_STATES[k].label.toLowerCase()}</span>`).join('');
    const urgent = all.filter(s => s.id === 'review' || s.id === 'consolidate')
        .sort((a, b) => a.rank - b.rank || (a.recent && b.recent ? a.recent.score - b.recent.score : 0)).slice(0, 6);
    return `<div class="ws-box">
        <h3 style="margin-bottom:10px">📚 État de tes cours</h3>
        <div class="ps-summary">${pills}</div>
        ${urgent.length ? `<p style="font-weight:700;margin:12px 0 4px">À retravailler maintenant</p>
            ${urgent.map(s => `<button class="sk-ch" onclick="psOpenChapter('${esc(s.subject)}','${esc(s.chapter)}')">
                <span class="sk-ch-name">${s.icon} ${s.icon2} ${psH(s.chapter)}</span>
                <span class="sk-na" style="white-space:normal;text-align:right;max-width:55%">${psH(s.reason)}</span></button>`).join('')}`
            : `<p class="sk-hint" style="margin-top:10px">Aucun chapitre à reprendre en urgence. 👍</p>`}
        <p style="font-weight:700;margin:16px 0 4px">📊 Statistiques détaillées par cours</p>
        ${CFG.filter(c => db[c.name] && Object.keys(db[c.name]).length).map(c => {
            const n = Object.keys(db[c.name]).length;
            return `<button class="sk-ch" onclick="openCourseStats('${esc(c.name)}','stats')"><span class="sk-ch-name">${c.icon} ${psH(c.name)}</span><span class="sk-na">${n} chapitre${n > 1 ? 's' : ''} →</span></button>`;
        }).join('')}
    </div>`;
}

// ── MINI-ÉVALUATIONS CIBLÉES ──────────────────────────────────
const PS_MINI_CARDS = 8, PS_MINI_EXOS = 4;

// Chapitres les plus fragiles d'une matière (états les plus urgents d'abord)
function psWeakChapters(subject, k) {
    return psSubjectStates(subject)
        .filter(s => s.id !== 'new' && (db[subject][s.chapter].flashcards || []).length)
        .sort((a, b) => a.rank - b.rank || ((a.recent ? a.recent.score : 0.5) - (b.recent ? b.recent.score : 0.5)))
        .slice(0, k || 3).map(s => s.chapter);
}
// Cartes en erreur active (à placer en priorité dans une mini-évaluation)
function psErrorKeys(subject, chapters) {
    const set = new Set();
    getErrors().filter(e => e.st === 'actif' && e.kind === 'card' && e.s === subject && (!chapters || chapters.includes(e.c)))
        .forEach(e => set.add(e.q + '|' + e.a));
    return set;
}

function psMiniLaunch(subject, chapters, opts) {
    if (!chapters.length) { showToast("Commence par lire un cours ou faire quelques flashcards : je n'ai pas encore de point faible à cibler.", 'warn'); return; }
    const qs = opts.exoOnly
        ? asmBuildExos(subject, chapters, PS_MINI_EXOS, opts.niveau)
        : asmBuild(subject, chapters, PS_MINI_CARDS, !!opts.withExo, { prefer: psErrorKeys(subject, chapters) });
    if (!qs) { showToast('Pas assez de contenu dans ces chapitres pour une mini-évaluation.', 'warn'); return; }
    curSubject = subject;
    asmSess = { s: subject, chapters, qs, i: 0, res: [], t0: Date.now(), id: Date.now().toString(36), sel: null, shown: false,
                mode: 'mini', miniLabel: opts.label, before: psSnapshot(subject, chapters) };
    asmRender();
}
function psMiniWeak(subject)    { psMiniLaunch(subject, psWeakChapters(subject, 3), { withExo: true, label: 'points faibles' }); }
function psMiniChapter(subject, chapter) { psMiniLaunch(subject, [chapter], { withExo: true, label: chapter }); }
function psMiniErrors(subject) {
    const chs = [...new Set(getErrors().filter(e => e.st === 'actif' && e.s === subject && e.kind === 'card' && db[subject] && db[subject][e.c]).map(e => e.c))];
    psMiniLaunch(subject, chs, { withExo: false, label: 'mes erreurs' });
}
// Mini-évaluation sur une compétence faible (depuis la page Compétences)
function psMiniAxis(subject, axisId) {
    const ax = skAxes(subject).find(a => a.id === axisId) || SK_GENERIC.find(a => a.id === axisId);
    if (!ax) return;
    const all = Object.keys(db[subject] || {});
    if (axisId === 'apply' || axisId === 'reason') {
        const chs = all.filter(c => (db[subject][c].exercices || []).length);
        return psMiniLaunch(subject, chs, { exoOnly: true, niveau: axisId === 'reason' ? 'Difficile' : 'Facile/Moyen', label: ax.label });
    }
    const dom = ax.match ? all.filter(c => (db[subject][c].flashcards || []).length && ax.match({ c, y: 'flash', r: 1 }) && !['know', 'comp', 'assoc'].includes(axisId)) : [];
    const chs = dom.length && dom.length < all.length ? dom : psWeakChapters(subject, 3);
    psMiniLaunch(subject, chs, { withExo: dom.length > 0, label: ax.label });
}

// ── APRÈS UNE ÉVALUATION : ce qui a changé ────────────────────
function psChangesHTML(before, subject, chapters) {
    if (!before) return '';
    const rows = chapters.map(c => {
        const st = psState(subject, c); if (!st) return '';
        const was = before[c] ? PS_STATES[before[c]] : null;
        const changed = was && was.label !== st.label;
        return `<div class="sk-row"><div class="sk-row-top"><strong>${psH(c)}</strong></div>
            <div class="sk-row-bar">${changed ? `<span>${was.icon} ${was.label}</span><span>→</span>` : ''}<span style="color:${st.col};font-weight:800">${st.icon} ${st.label}</span></div>
            <div class="sk-row-desc">${psH(st.reason)}</div></div>`;
    }).join('');
    return rows ? `<div class="ws-box"><h3 style="margin-bottom:6px">📚 État de tes cours</h3>
        <p class="sk-hint">Pour valider un chapitre (🟢 Appris) : au moins ${psPct(PS_PASS)} % sur ${PS_MIN_Q} questions de ce chapitre, dans un quiz ou un contrôle.</p>${rows}</div>` : '';
}


// ═════════════════════════════════════════════════════════════
// STATISTIQUES PAR COURS ET PAR CHAPITRE
// Accessibles depuis l'onglet Statistiques, la page d'une matière
// et le menu d'un chapitre.
// ═════════════════════════════════════════════════════════════
function psChapterData(subject, chapter) {
    const ch = db[subject][chapter];
    const cards = ch.flashcards || [], exos = ch.exercices || [];
    const events = getPerf().filter(e => e.s === subject && e.c === chapter);
    const errs = getErrors().filter(e => e.s === subject && e.c === chapter);
    const evals = getAssess().filter(r => r.s === subject && r.ch && r.ch[chapter] && r.ch[chapter][1] > 0)
        .sort((a, b) => b.t - a.t);
    const exo = { reussi: 0, presque: 0, a_revoir: 0, nonfait: 0 };
    exos.forEach(x => { exo[x.status && exo[x.status] !== undefined ? x.status : 'nonfait']++; });
    return {
        ch, state: psState(subject, chapter), events,
        cards: { total: cards.length, seen: cards.filter(c => c.due).length, due: cards.filter(c => isDueIn(ch, c)).length,
                 mastered: cards.filter(c => (c.interval || 0) >= 7).length },
        exo, nExo: exos.length,
        skills: SK_GENERIC.map(ax => Object.assign({ ax }, skScore(events, ax))),
        evals, errActive: errs.filter(e => e.st === 'actif').length, errDone: errs.filter(e => e.st === 'résolu').length,
        answers: events.length,
    };
}

// Page : tous les chapitres d'une matière, avec l'essentiel de chacun
function openCourseStats(subject, from) {
    clearInterval(qTimer); curTrackedPage = null;
    if (subject) curSubject = subject;
    const s = curSubject, cfg = CFG.find(c => c.name === s);
    const chapters = Object.keys(db[s] || {});
    const backJs = from === 'stats' ? 'openStats()' : `goSubject('${esc(s)}')`;
    const rows = chapters.map(c => {
        const d = psChapterData(s, c), st = d.state;
        const last = d.evals[0] ? Math.round(d.evals[0].ch[c][0] / d.evals[0].ch[c][1] * 100) + ' %' : '—';
        const exoDone = d.exo.reussi + d.exo.presque + d.exo.a_revoir;
        return `<button class="ps-row" onclick="openChapterStats('${esc(s)}','${esc(c)}','${from || 'subject'}')">
            <div class="ps-row-top"><span class="ps-row-name">${psH(c)}</span>
                <span class="ps-pill" style="color:${st.col};border-color:${st.col}">${st.icon} ${st.label}</span></div>
            <div class="ps-chips">
                <span title="Cartes maîtrisées">🎴 ${d.cards.mastered}/${d.cards.total}</span>
                <span title="Exercices faits">✏️ ${exoDone}/${d.nExo}</span>
                <span title="Dernière évaluation sur ce chapitre">🧪 ${last}</span>
                <span title="Erreurs à retravailler">📓 ${d.errActive}</span>
            </div></button>`;
    }).join('');
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="${backJs}">← ${from === 'stats' ? 'Statistiques' : (cfg ? cfg.icon + ' ' : '') + psH(s)}</button></div>
        <div class="page-head"><h1>📊 Statistiques — ${psH(s)}</h1>
            <p style="color:var(--muted);font-size:.85rem">Un résumé par chapitre. Touche un chapitre pour voir le détail.</p></div>
        <div class="ws-box">${rows || '<p style="color:var(--muted)">Aucun chapitre dans cette matière.</p>'}
            <p class="sk-hint" style="margin-top:10px">🎴 cartes maîtrisées · ✏️ exercices faits · 🧪 dernière évaluation · 📓 erreurs à retravailler</p></div>
    `);
}

// Page : tout sur un chapitre
function openChapterStats(subject, chapter, from) {
    clearInterval(qTimer); curTrackedPage = null;
    if (!db[subject] || !db[subject][chapter]) return;
    curSubject = subject;
    const d = psChapterData(subject, chapter), st = d.state, S = esc(subject), C = esc(chapter);
    const bar = (n, tot, col) => `<div class="sk-bar"><div class="sk-bar-fill" style="width:${tot ? Math.round(n / tot * 100) : 0}%;background:${col}"></div></div>`;
    const lineBar = (label, n, tot, col) => `<div class="sk-row"><div class="sk-row-top"><strong>${label}</strong> <span class="sk-na">${n} / ${tot}</span></div><div class="sk-row-bar">${bar(n, tot, col)}</div></div>`;
    const lastRead = d.ch.lastRead ? psDate(d.ch.lastRead) : 'jamais';
    const evalTypes = { controle: '📝 Contrôle', mini: '🎯 Mini-évaluation' };
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="openCourseStats('${S}','${from || 'subject'}')">← Statistiques des cours</button></div>
        <div class="page-head"><h1 style="font-size:1.3rem">📊 ${psH(chapter)}</h1>
            <p style="color:var(--muted);font-size:.85rem">${psH(subject)} · dernière lecture : ${lastRead} · ${d.answers} réponse${d.answers > 1 ? 's' : ''} enregistrée${d.answers > 1 ? 's' : ''}</p></div>

        <div class="ws-box ps-banner" style="border-left-color:${st.col}"><div class="ps-banner-top"><span class="ps-big">${st.icon}</span>
            <div><strong>${st.label}</strong><div class="ps-reason">${psH(st.reason)}</div></div></div>
            <div class="sk-actions">
                <button class="bc-btn" onclick="psOpenChapter('${S}','${C}')">📖 Ouvrir le chapitre</button>
                <button class="bc-btn" onclick="openEval('${S}','${C}')">🧪 Évaluer</button>
                <button class="bc-btn" onclick="psMiniChapter('${S}','${C}')">🎯 Mini-évaluation</button>
            </div></div>

        <div class="ws-box"><h3 style="margin-bottom:10px">🎴 Flashcards</h3>
            <div class="ps-grid">
                <div><b>${d.cards.total}</b><span>cartes</span></div>
                <div><b>${d.cards.seen}</b><span>déjà révisées</span></div>
                <div><b>${d.cards.due}</b><span>à revoir</span></div>
                <div><b>${d.cards.mastered}</b><span>maîtrisées</span></div>
            </div>
            ${lineBar('Maîtrisées', d.cards.mastered, d.cards.total, 'var(--green)')}
        </div>

        ${d.nExo ? `<div class="ws-box"><h3 style="margin-bottom:6px">✏️ Exercices (${d.nExo})</h3>
            ${lineBar('🟢 Réussis', d.exo.reussi, d.nExo, 'var(--green)')}
            ${lineBar('🟡 Presque', d.exo.presque, d.nExo, 'var(--yellow)')}
            ${lineBar('🔴 À revoir', d.exo.a_revoir, d.nExo, 'var(--red)')}
            <p class="sk-hint">${d.exo.nonfait} pas encore fait${d.exo.nonfait > 1 ? 's' : ''}.</p></div>` : ''}

        <div class="ws-box"><h3 style="margin-bottom:6px">🎯 Compétences sur ce chapitre</h3>
            ${d.skills.map(x => `<div class="sk-row"><div class="sk-row-top"><strong>${x.ax.label}</strong></div><div class="sk-row-bar">${skBar(x.score, x.n)}</div></div>`).join('')}</div>

        <div class="ws-box"><h3 style="margin-bottom:6px">🧪 Évaluations sur ce chapitre</h3>
            ${d.evals.length ? d.evals.slice(0, 8).map(r => {
                const p = Math.round(r.ch[chapter][0] / r.ch[chapter][1] * 100), lv = skLevel(p / 100);
                return `<div class="asm-hist-row"><span>${psDate(r.t)} · ${evalTypes[r.mode] || '⚡ Quiz'}</span><strong style="color:${lv.col}">${p} %</strong></div>`;
            }).join('') : '<p class="sk-hint">Pas encore évalué.</p>'}</div>

        <div class="ws-box"><h3 style="margin-bottom:6px">📓 Carnet d'erreurs</h3>
            <p style="font-size:.9rem">${d.errActive} à retravailler · ${d.errDone} résolue${d.errDone > 1 ? 's' : ''}</p>
            <button class="bc-btn" style="margin-top:8px" onclick="openErrors('${S}')">Ouvrir le carnet →</button></div>
    `);
}
