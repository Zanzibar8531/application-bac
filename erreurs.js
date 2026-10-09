/* ============================================================
   BACMASTER — erreurs.js
   Carnet d'erreurs : « savoir quoi retravailler ».

   Alimenté automatiquement par le journal de competences.js :
   chaque réponse ratée (flashcard, évaluation, exercice) crée ou met à
   jour une entrée. Les entrées sont classées par matière,
   chapitre, compétence et type d'erreur.

   Règle de résolution (volontairement simple et visible) :
   une erreur est « résolue » quand tu la réussis ERR_NEED fois,
   à au moins ERR_GAP d'écart (réussir 2 fois de suite à la même
   minute ne prouve rien). Si tu la rates de nouveau, elle redevient
   active.

   Entrée : { key, s: matière, c: chapitre, kind: 'card' | 'exo',
              k: identifiant de l'élément, q, a (cartes), x (index exo),
              sk: compétence, dom: domaine, ty: type d'erreur,
              f: nb d'échecs, ok: réussites comptées,
              t0: 1er échec, t1: dernier échec, tc: dernier événement compté,
              st: 'actif' | 'résolu' }

   Ce fichier doit être chargé APRÈS competences.js et AVANT script.js.
   Stocké hors de `db` : aucune interférence avec la synchro GitHub.
   ============================================================ */

const ERR_KEY   = 'bacmaster_errors';
const ERR_MAX   = 600;                 // entrées gardées (les résolues les plus anciennes partent d'abord)
const ERR_NEED  = 2;                   // réussites nécessaires pour résoudre
const ERR_GAP   = 6 * 3600 * 1000;     // écart minimum entre deux réussites comptées
const ERR_MERGE = 30 * 60 * 1000;      // échecs rapprochés (même séance) = une seule erreur

// ── STOCKAGE ──────────────────────────────────────────────────
function getErrors() {
    try { return JSON.parse(localStorage.getItem(ERR_KEY) || '[]'); }
    catch (e) { return []; }
}
function setErrors(list) {
    try {
        if (list.length > ERR_MAX) {
            // On retire d'abord les résolues les plus anciennes, puis les plus anciennes tout court.
            list.sort((a, b) => (a.st === 'résolu' ? 0 : 1) - (b.st === 'résolu' ? 0 : 1) || a.tc - b.tc);
            list.splice(0, list.length - ERR_MAX);
        }
        localStorage.setItem(ERR_KEY, JSON.stringify(list));
    } catch (e) { /* stockage plein : on ne bloque jamais l'étude */ }
}
const errPlain = t => String(t || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140);
const errH = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function errCount(subject) {
    return getErrors().filter(e => e.st === 'actif' && (!subject || e.s === subject)).length;
}

// ── CLASSIFICATION ────────────────────────────────────────────
// Type d'erreur : déduit du résultat, jamais deviné.
const ERR_TYPES = {
    'Oubli':          { cls: 'oubli',    desc: "Tu as dit « Encore » : tu ne t'en souvenais pas." },
    'Hésitation':     { cls: 'hesit',    desc: "Tu as dit « Difficile » : tu t'en souvenais, mais avec effort." },
    'Confusion':      { cls: 'confusion', desc: "En évaluation, tu as choisi ou associé une mauvaise réponse : tu l'as confondue avec une autre." },
    'Exercice raté':  { cls: 'exo',      desc: "Exercice à revoir : tu n'as pas su le résoudre." },
    'Presque réussi': { cls: 'presque',  desc: "Exercice presque réussi : une étape ou un détail t'a échappé." },
};
function errTypeOf(ev) {
    if (ev.y === 'exo')  return ev.r === 0 ? 'Exercice raté' : 'Presque réussi';
    if (ev.y === 'qcm' || ev.y === 'comp' || ev.y === 'assoc') return 'Confusion';
    return ev.r === 0 ? 'Oubli' : 'Hésitation';
}
function errSkillOf(ev) {
    if (ev.y === 'exo') return ev.n === 'Difficile' ? 'Raisonnement' : 'Application';
    if (ev.y === 'comp')  return 'Compréhension';
    if (ev.y === 'assoc') return 'Mobilisation';
    return 'Connaissances';
}
// Domaine (ex. « Fonctions » en Maths) d'après les compétences définies dans competences.js
function errDomainOf(ev) {
    const model = (typeof SK_MODELS !== 'undefined' && SK_MODELS[ev.s]) || [];
    const ax = model.find(a => a.match && !['know', 'apply', 'reason'].includes(a.id) && a.match(ev));
    return ax ? ax.label : '';
}

// ── SUIVI : appelé par logPerf() à chaque réponse ─────────────
function trackError(ev, item) {
    try {
        if (!ev || !item || !item.k) return;
        const kind = ev.y === 'exo' ? 'exo' : 'card';
        const key = kind + '|' + ev.s + '|' + ev.c + '|' + item.k;
        const list = getErrors();
        let e = list.find(x => x.key === key);
        const now = ev.t;

        if (ev.r < 1) {                                   // ÉCHEC
            const ty = errTypeOf(ev);
            if (!e) {
                e = { key, s: ev.s, c: ev.c, kind, k: item.k, q: item.q || '', a: item.a || '',
                      sk: errSkillOf(ev), dom: errDomainOf(ev), ty, f: 1, ok: 0,
                      t0: now, t1: now, tc: now, st: 'actif' };
                if (item.x !== undefined) e.x = item.x;
                list.push(e);
            } else if (e.st === 'actif' && now - e.tc < ERR_MERGE) {
                e.t1 = now; e.tc = now;                   // même séance : on ne compte pas deux fois
                if (ev.r === 0) e.ty = ty;
            } else {
                e.f++; e.ok = 0; e.t1 = now; e.tc = now; e.st = 'actif'; e.ty = ty;
                delete e.tR;
            }
        } else if (e && e.st === 'actif') {               // RÉUSSITE d'une erreur en cours
            if (now - e.tc >= ERR_GAP) {
                e.ok++; e.tc = now;
                if (e.ok >= ERR_NEED) { e.st = 'résolu'; e.tR = now; }
            }
        } else return;
        setErrors(list);
    } catch (err) { /* ne jamais bloquer une réponse */ }
}

// ── ÉTAT DE LA PAGE ───────────────────────────────────────────
let errState = { s: '', group: 'chapitre', show: 'actif', limit: 30 };

function errFiltered() {
    return getErrors().filter(e =>
        (!errState.s || e.s === errState.s) &&
        (errState.show === 'actif' ? e.st === 'actif' : e.st === 'résolu'));
}
function errGroupLabel(e) {
    const where = errState.s ? '' : e.s + ' › ';
    if (errState.group === 'competence') return e.sk;
    if (errState.group === 'type')       return e.ty;
    return where + (e.c || 'Divers');
}

// Retrouve la carte / l'exercice dans la base (le contenu peut avoir été modifié)
function errFindCard(e) {
    const cards = (db[e.s] && db[e.s][e.c] && db[e.s][e.c].flashcards) || [];
    return cards.find(c => c.q === e.q && c.a === e.a) || null;
}
function errFindExo(e) {
    const exos = (db[e.s] && db[e.s][e.c] && db[e.s][e.c].exercices) || [];
    if (exos[e.x] && errPlain(exos[e.x].enonce) === e.q) return { exo: exos[e.x], i: e.x };
    const i = exos.findIndex(x => errPlain(x.enonce) === e.q);
    return i >= 0 ? { exo: exos[i], i } : null;
}

// ── PAGE : CARNET D'ERREURS ───────────────────────────────────
function openErrors(subject) {
    errState = { s: subject || '', group: 'chapitre', show: 'actif', limit: 30 };
    renderErrors();
}
function errSet(k, v) {
    errState[k] = v;
    if (k !== 'limit') errState.limit = 30;
    renderErrors();
}

function renderErrors() {
    clearInterval(qTimer);
    curTrackedPage = errState.s ? { subject: errState.s, activity: "📓 Carnet d'erreurs" } : null;
    const all = getErrors().filter(e => !errState.s || e.s === errState.s);
    const nAct = all.filter(e => e.st === 'actif').length;
    const nRes = all.filter(e => e.st === 'résolu').length;
    const list = errFiltered();
    const cfg = CFG.find(c => c.name === errState.s);

    // Regroupement
    const groups = {};
    list.forEach(e => { (groups[errGroupLabel(e)] = groups[errGroupLabel(e)] || []).push(e); });
    const ordered = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
    let shown = 0;
    const groupsHTML = ordered.map(([label, items]) => {
        items.sort((a, b) => b.f - a.f || b.t1 - a.t1);
        const rows = items.map(e => {
            if (shown >= errState.limit) return '';
            shown++;
            return errItemHTML(e);
        }).join('');
        return rows ? `<div class="er-group"><div class="er-group-head"><span>${errH(label)}</span><span class="er-count">${items.length}</span></div>${rows}</div>` : '';
    }).join('');

    const nFlash = list.filter(e => e.kind === 'card' && errFindCard(e)).length;
    const nExo   = list.filter(e => e.kind === 'exo' && errFindExo(e)).length;
    const canSession = errState.show === 'actif' && errState.s;

    const subjectsWithErr = CFG.filter(c => getErrors().some(e => e.s === c.name));

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="${errState.s ? `goSubject('${esc(errState.s)}')` : 'goHome()'}">🏠 ${cfg ? cfg.icon + ' ' + errH(cfg.name) : 'Accueil'}</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">📓 Carnet d'erreurs</span>
        </div>
        <div class="page-head">
            <h1>📓 Carnet d'erreurs${cfg ? ' — ' + errH(cfg.name) : ''}</h1>
            <p style="color:var(--muted);font-size:.85rem">Une erreur est résolue quand tu la réussis ${ERR_NEED} fois, à plus de ${Math.round(ERR_GAP / 3600000)} h d'écart. Si tu la rates à nouveau, elle redevient active.</p>
        </div>

        ${subjectsWithErr.length > 1 || errState.s ? `
        <div class="er-chips">
            <button class="er-chip ${!errState.s ? 'on' : ''}" onclick="errSet('s','')">Toutes</button>
            ${subjectsWithErr.map(c => `<button class="er-chip ${errState.s === c.name ? 'on' : ''}" onclick="errSet('s','${esc(c.name)}')">${c.icon} ${errH(c.name)}</button>`).join('')}
        </div>` : ''}

        <div class="er-chips">
            <button class="er-chip ${errState.show === 'actif' ? 'on' : ''}" onclick="errSet('show','actif')">À retravailler (${nAct})</button>
            <button class="er-chip ${errState.show === 'résolu' ? 'on' : ''}" onclick="errSet('show','résolu')">Résolues (${nRes})</button>
        </div>
        <div class="er-chips">
            <span class="er-chips-label">Classer par</span>
            <button class="er-chip ${errState.group === 'chapitre' ? 'on' : ''}" onclick="errSet('group','chapitre')">Chapitre</button>
            <button class="er-chip ${errState.group === 'competence' ? 'on' : ''}" onclick="errSet('group','competence')">Compétence</button>
            <button class="er-chip ${errState.group === 'type' ? 'on' : ''}" onclick="errSet('group','type')">Type d'erreur</button>
        </div>

        ${canSession && (nFlash || nExo) ? `
        <div class="er-actions">
            ${nFlash ? `<button class="btn-main" onclick="errStartCards()">🎴 Réviser mes erreurs (${nFlash} carte${nFlash > 1 ? 's' : ''})</button>` : ''}
            ${nFlash && typeof psMiniErrors === 'function' ? `<button class="btn-main er-btn-mini" onclick="psMiniErrors('${esc(errState.s)}')">🎯 Mini-évaluation sur mes erreurs</button>` : ''}
            ${nExo ? `<button class="btn-main er-btn-exo" onclick="errStartExos()">✏️ Refaire mes exercices (${nExo})</button>` : ''}
        </div>` : (errState.show === 'actif' && !errState.s && nAct ? `<p class="sk-hint">Choisis une matière pour lancer une session de rattrapage.</p>` : '')}

        ${groupsHTML || `
        <div class="ws-box" style="text-align:center;padding:34px 20px">
            <div style="font-size:2.6rem;margin-bottom:8px">${errState.show === 'actif' ? '🎉' : '📭'}</div>
            <h3 style="margin-bottom:6px">${errState.show === 'actif' ? 'Aucune erreur à retravailler' : 'Aucune erreur résolue pour l\'instant'}</h3>
            <p style="color:var(--muted);font-size:.85rem">${errState.show === 'actif'
                ? 'Tes erreurs en flashcards, évaluations et exercices apparaîtront ici automatiquement.'
                : 'Réussis une erreur ' + ERR_NEED + ' fois (à plusieurs heures d\'écart) pour la voir passer ici.'}</p>
        </div>`}

        ${list.length > shown ? `<button class="bc-btn" style="width:100%;text-align:center;margin-top:10px" onclick="errSet('limit',${errState.limit + 30})">Afficher plus (${list.length - shown} restantes)</button>` : ''}

        <details class="ws-box er-legend">
            <summary>Que veulent dire les types d'erreur ?</summary>
            ${Object.entries(ERR_TYPES).map(([n, t]) => `<p><span class="er-ty er-ty-${t.cls}">${n}</span> ${t.desc}</p>`).join('')}
        </details>
    `);
}

function errItemHTML(e) {
    const t = ERR_TYPES[e.ty] || { cls: 'oubli' };
    const idx = getErrors().findIndex(x => x.key === e.key);
    let q = '', a = '', redo = '';
    if (e.kind === 'exo') {
        const f = errFindExo(e);
        q = f ? f.exo.enonce : `<p>${errH(e.q)}</p>`;
        a = f && f.exo.correction ? f.exo.correction : '';
        if (f && e.st === 'actif') redo = `<button class="bc-btn" onclick="errRedoExo(${idx})">✏️ Refaire</button>`;
    } else {
        q = e.q; a = e.a;
    }
    const when = new Date(e.t1).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const state = e.st === 'actif'
        ? `${e.ok}/${ERR_NEED} réussite${e.ok > 1 ? 's' : ''} comptée${e.ok > 1 ? 's' : ''}`
        : `✅ résolue le ${new Date(e.tR || e.tc).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
    return `
    <div class="er-item">
        <div class="er-top">
            <span class="er-ty er-ty-${t.cls}">${e.ty}</span>
            <span class="er-meta">${errH(e.sk)}${e.dom ? ' · ' + errH(e.dom) : ''} · raté ${e.f} fois · dernière erreur le ${when}</span>
        </div>
        <div class="er-q">${q}</div>
        ${a ? `<details class="er-ans"><summary>Voir la réponse</summary><div class="er-a">${a}</div></details>` : ''}
        <div class="er-foot"><span class="er-state">${state}</span>${redo}</div>
    </div>`;
}

// ── SESSIONS DE RATTRAPAGE ────────────────────────────────────
// Cartes : mêmes règles que les flashcards normales (les révisions comptent
// vraiment dans l'espacement), donc elles alimentent aussi la résolution.
function errStartCards() {
    const queue = [];
    errFiltered().filter(e => e.kind === 'card').forEach(e => {
        const card = errFindCard(e);
        if (card) queue.push({ card, ch: e.c, subj: e.s });
    });
    if (!queue.length) { showToast('Aucune carte retrouvée (contenu modifié ?)', 'warn'); return; }
    curSubject = errState.s;
    dailyReviewMode = false;
    selChapters = [...new Set(queue.map(x => x.ch))];
    srsQueue = queue.sort(() => Math.random() - .5).slice(0, 30);
    srsAgain = []; sessDone = 0; sessTotal = srsQueue.length;
    sessStats = { seen: 0, right: 0, wrong: 0 }; qSecs = 0;
    clearInterval(qTimer);
    qTimer = setInterval(() => {
        qSecs++;
        const el = $('srs-timer');
        if (el) { const m = String(Math.floor(qSecs / 60)).padStart(2, '0'); const s = String(qSecs % 60).padStart(2, '0'); el.textContent = m + ':' + s; }
    }, 1000);
    renderSRSCard();
}

function errStartExos() {
    const list = [];
    errFiltered().filter(e => e.kind === 'exo').forEach(e => {
        const f = errFindExo(e);
        if (f) list.push({ exo: f.exo, originalIndex: f.i, ch: e.c });
    });
    if (!list.length) { showToast('Aucun exercice retrouvé (contenu modifié ?)', 'warn'); return; }
    curSubject = errState.s;
    curExoChapter = '__review__'; curExoNiveau = 'tous';
    curExoList = list; curExoIdx = 0; exoShowCorrection = false;
    renderExo();
}

function errRedoExo(idx) {
    const e = getErrors()[idx];
    if (!e) return;
    const f = errFindExo(e);
    if (!f) { showToast('Exercice introuvable (contenu modifié ?)', 'warn'); return; }
    curSubject = e.s;
    curExoChapter = '__review__'; curExoNiveau = 'tous';
    curExoList = [{ exo: f.exo, originalIndex: f.i, ch: e.c }];
    curExoIdx = 0; exoShowCorrection = false;
    renderExo();
}

// ── ENCARTS (page Statistiques, page Compétences) ─────────────
function errorsOverviewHTML() {
    const act = getErrors().filter(e => e.st === 'actif');
    const bySubj = {};
    act.forEach(e => { bySubj[e.s] = (bySubj[e.s] || 0) + 1; });
    const top = Object.entries(bySubj).sort((a, b) => b[1] - a[1])[0];
    return `<div class="ws-box">
        <h3 style="margin-bottom:8px">📓 Carnet d'erreurs</h3>
        ${act.length
            ? `<p style="font-size:.9rem"><strong>${act.length}</strong> erreur${act.length > 1 ? 's' : ''} à retravailler${top ? ` — surtout en <strong>${errH(top[0])}</strong> (${top[1]})` : ''}.</p>`
            : `<p style="color:var(--muted);font-size:.85rem">Aucune erreur à retravailler pour l'instant. Elles apparaîtront ici automatiquement.</p>`}
        <button class="bc-btn" style="margin-top:10px" onclick="openErrors('')">Ouvrir le carnet →</button>
    </div>`;
}
