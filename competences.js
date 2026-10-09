/* ============================================================
   BACMASTER — competences.js
   Journal de performances + compétences par matière (radars).

   Principe : chaque réponse réelle (flashcard, exercice, évaluation) est
   enregistrée dans un petit journal. Les compétences sont CALCULÉES
   à partir de ce journal — rien n'est inventé : une compétence qui
   n'a pas encore été mesurée est affichée « à mesurer ».

   Le journal sera aussi utilisé par les étapes suivantes
   (carnet d'erreurs, évaluations) : même format d'événement.

   Types : flash = flashcard · qcm = question de connaissance, comp =
   compréhension, assoc = association, cours = question de cours écrite
   (ces quatre viennent des Évaluations,
   et portent e = identifiant de l'évaluation) · exo = exercice.

   Événement : { t: horodatage, s: matière, c: chapitre,
                 y: 'flash' | 'qcm' | 'comp' | 'assoc' | 'cours' | 'exo',
                 r: résultat de 0 à 1, n: niveau (exercices) }

   Ce fichier doit être chargé AVANT script.js.
   Stocké hors de `db` (comme l'activité et le temps passé) pour ne
   jamais interférer avec la synchro GitHub.
   ============================================================ */

const PERF_KEY = 'bacmaster_perf';
const PERF_MAX = 4000;      // événements gardés (les plus anciens sont purgés)
const SK_MIN   = 5;         // réponses minimum pour afficher un score fiable
const SK_DECAY = 0.94;      // poids des réponses anciennes (les récentes comptent plus)

// ── JOURNAL ───────────────────────────────────────────────────
function getPerf() {
    try { return JSON.parse(localStorage.getItem(PERF_KEY) || '[]'); }
    catch (e) { return []; }
}
// `item` (facultatif) identifie l'élément répondu : { k: clé, q, a, x }.
// Il sert au carnet d'erreurs (erreurs.js) ; les statistiques n'en ont pas besoin.
function logPerf(subject, chapter, type, result, niveau, item, evalId) {
    if (!subject) return;
    let ev = null;
    try {
        const log = getPerf();
        ev = { t: Date.now(), s: subject, c: chapter || '', y: type, r: result };
        if (niveau) ev.n = niveau;
        if (evalId) ev.e = evalId;
        log.push(ev);
        if (log.length > PERF_MAX) log.splice(0, log.length - PERF_MAX);
        localStorage.setItem(PERF_KEY, JSON.stringify(log));
    } catch (e) { /* stockage plein : on ne bloque jamais l'étude */ }
    if (ev && item && typeof trackError === 'function') trackError(ev, item);
}

// ── DÉFINITION DES COMPÉTENCES ────────────────────────────────
// Échappement HTML pour le texte affiché (esc() de script.js est prévu pour les arguments onclick)
const skH = t => String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const skKnow   = ev => ev.y === 'flash' || ev.y === 'qcm' || ev.y === 'cours';
const skApply  = ev => ev.y === 'exo' && ev.n !== 'Difficile';
const skReason = ev => ev.y === 'exo' && ev.n === 'Difficile';

// Trois compétences communes à toutes les matières : connaître / appliquer / raisonner
const SK_GENERIC = [
    { id: 'know',   label: 'Connaissances', desc: 'Restituer le cours de mémoire (flashcards, questions de connaissance).', match: skKnow },
    { id: 'apply',  label: 'Application',   desc: 'Utiliser le cours dans un exercice de niveau facile ou moyen.', match: skApply },
    { id: 'reason', label: 'Raisonnement',  desc: 'Réussir les exercices difficiles, qui enchaînent plusieurs idées.', match: skReason },
    { id: 'comp',   label: 'Compréhension', desc: 'Retrouver une notion à partir de sa définition (Évaluation).', match: ev => ev.y === 'comp' },
    { id: 'assoc',  label: 'Mobilisation',  desc: 'Associer et comparer plusieurs notions à la fois (Évaluation).', match: ev => ev.y === 'assoc' },
];

const chIn = re => ev => re.test(ev.c || '');
const SOON_NEXT  = "Pas encore mesuré : il faudra un type d'exercice dédié (prochaines étapes).";
const SOON_VOCAL = "Sera mesuré avec le mode vocal (étape 6).";

const SK_MODELS = {
    'Maths': [
        { id: 'calcul',  label: 'Calcul',        desc: 'Chapitres : Second degré, Suites numériques.', match: chIn(/second degré|suites/i) },
        { id: 'fonc',    label: 'Fonctions',     desc: 'Chapitres : Fonctions, Dérivation, exp & ln.', match: chIn(/fonction|dérivation/i) },
        { id: 'proba',   label: 'Probabilités',  desc: 'Chapitre : Probabilités.', match: chIn(/probabilit/i) },
        { id: 'geo',     label: 'Géométrie',     desc: 'Chapitres : Trigonométrie, Produit scalaire.', match: chIn(/trigo|scalaire|géom/i) },
        { id: 'reason',  label: 'Raisonnement',  desc: 'Exercices difficiles, tous chapitres.', match: skReason },
        { id: 'demo',    label: 'Démonstration', desc: 'Rédiger une démonstration complète.', soon: SOON_NEXT },
    ],
    'Physique-Chimie': [
        SK_GENERIC[0], SK_GENERIC[1], SK_GENERIC[2], SK_GENERIC[3], SK_GENERIC[4],
        { id: 'calcul', label: 'Calcul',                desc: 'Calculs avec unités et chiffres significatifs.', soon: SOON_NEXT },
        { id: 'docs',   label: 'Analyse de documents',  desc: 'Extraire une information d\'un graphique ou d\'un texte.', soon: SOON_NEXT },
    ],
    'Anglais': [
        { id: 'voc',  label: 'Vocabulaire', desc: 'Chapitre : Vocabulary & Expressions.', match: chIn(/vocab/i) },
        { id: 'gram', label: 'Grammaire',   desc: 'Chapitres : Grammar, Advanced Grammar, Linkers.', match: chIn(/grammar|linkers/i) },
        { id: 'co', label: 'Compréhension orale',  desc: 'Comprendre un document audio.', soon: SOON_VOCAL },
        { id: 'ce', label: 'Compréhension écrite', desc: 'Comprendre un texte.', soon: SOON_NEXT },
        { id: 'eo', label: 'Expression orale',     desc: 'Parler, décrire une image.', soon: SOON_VOCAL },
        { id: 'ee', label: 'Expression écrite',    desc: 'Rédiger un texte structuré.', soon: SOON_NEXT },
    ],
    'Espagnol': [
        { id: 'voc',  label: 'Vocabulaire', desc: 'Chapitre : Vocabulario esencial.', match: chIn(/vocab/i) },
        { id: 'gram', label: 'Grammaire',   desc: 'Chapitre : Gramatica.', match: chIn(/gram/i) },
        { id: 'co', label: 'Compréhension orale',  desc: 'Comprendre un document audio.', soon: SOON_VOCAL },
        { id: 'ce', label: 'Compréhension écrite', desc: 'Comprendre un texte.', soon: SOON_NEXT },
        { id: 'eo', label: 'Expression orale',     desc: 'Parler, décrire une image.', soon: SOON_VOCAL },
        { id: 'ee', label: 'Expression écrite',    desc: 'Rédiger un texte structuré.', soon: SOON_NEXT },
    ],
};
const isLangSubject = s => s === 'Anglais' || s === 'Espagnol';

// ── CALCULS ───────────────────────────────────────────────────
// Score d'une compétence : moyenne pondérée des 40 dernières réponses
// (les réponses récentes pèsent plus que les anciennes).
function skScore(events, axis) {
    if (!axis.match) return { n: 0, score: null };
    const ev = events.filter(axis.match).sort((a, b) => b.t - a.t).slice(0, 40);
    if (!ev.length) return { n: 0, score: null };
    let w = 1, sw = 0, sr = 0;
    ev.forEach(e => { sr += w * e.r; sw += w; w *= SK_DECAY; });
    return { n: ev.length, score: sr / sw };
}
function skMeasured(a) { return a.score !== null && a.n >= SK_MIN; }

function skAxes(subject) {
    const events = getPerf().filter(e => e.s === subject);
    const model = SK_MODELS[subject] || SK_GENERIC;
    return model.map(ax => ({ ...ax, ...skScore(events, ax) }));
}
function skLevel(score) {
    if (score >= 0.85) return { txt: 'Maîtrisé',   col: 'var(--green)' };
    if (score >= 0.65) return { txt: 'Solide',     col: 'var(--green)' };
    if (score >= 0.40) return { txt: 'En progrès', col: 'var(--yellow)' };
    return                    { txt: 'Fragile',    col: 'var(--red)' };
}
const skPct = x => Math.round(x * 100);

// Scores par chapitre (connaissances / exercices) pour repérer le point faible
function skChapters(subject) {
    const events = getPerf().filter(e => e.s === subject && e.c);
    const byCh = {};
    events.forEach(e => { (byCh[e.c] = byCh[e.c] || []).push(e); });
    return Object.entries(byCh).map(([c, ev]) => ({
        c,
        know: skScore(ev, SK_GENERIC[0]),
        exo:  skScore(ev, { match: e => e.y === 'exo' }),
        n: ev.length,
        all: skScore(ev, { match: () => true }),
    })).sort((a, b) => b.n - a.n);
}

// ── CONSEIL : « quoi travailler maintenant ? » ────────────────
function skAdvice(subject, axes) {
    const known = axes.filter(skMeasured);
    if (known.length === 0) {
        return { txt: `Pas encore assez de données (il faut au moins ${SK_MIN} réponses par compétence). Fais quelques flashcards et exercices : le détail apparaîtra tout seul.` };
    }
    const g = SK_GENERIC.map(ax => skScore(getPerf().filter(e => e.s === subject), ax));
    const K = g[0], A = g[1];
    if (K.n >= SK_MIN && A.n >= SK_MIN) {
        if (K.score >= 0.75 && A.score < 0.55) {
            return { txt: `Tu connais bien ton cours (${skPct(K.score)} %) mais tu l'appliques moins bien (${skPct(A.score)} %). Savoir réciter ≠ savoir s'en servir : fais plus d'exercices.`, action: 'exo' };
        }
        if (A.score >= 0.70 && K.score < 0.50) {
            return { txt: `Tu t'en sors en exercice (${skPct(A.score)} %) mais ta mémoire du cours est fragile (${skPct(K.score)} %). Les flashcards vont consolider tout ça.`, action: 'flash' };
        }
    }
    const worst = known.slice().sort((a, b) => a.score - b.score)[0];
    if (worst.score >= 0.85) return { txt: 'Tout ce qui est mesuré est maîtrisé. Continue à entretenir avec les révisions du jour.' };
    return { txt: `Point à travailler en priorité : ${worst.label} (${skPct(worst.score)} %).` };
}

// ── RADAR (SVG) ───────────────────────────────────────────────
function radarSVG(axes) {
    const W = 360, H = 330, cx = 180, cy = 165, R = 100, n = axes.length;
    const ang = i => (-90 + i * 360 / n) * Math.PI / 180;
    const pt = (i, v) => [cx + Math.cos(ang(i)) * R * v, cy + Math.sin(ang(i)) * R * v];
    const ring = v => axes.map((_, i) => pt(i, v).join(',')).join(' ');
    let svg = `<svg class="sk-radar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Radar de compétences">`;
    [0.25, 0.5, 0.75, 1].forEach(v => { svg += `<polygon class="sk-ring" points="${ring(v)}"/>`; });
    axes.forEach((_, i) => { const [x, y] = pt(i, 1); svg += `<line class="sk-spoke" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; });
    svg += `<polygon class="sk-area" points="${axes.map((a, i) => pt(i, a.score).join(',')).join(' ')}"/>`;
    axes.forEach((a, i) => { const [x, y] = pt(i, a.score); svg += `<circle class="sk-dot" cx="${x}" cy="${y}" r="4"/>`; });
    axes.forEach((a, i) => {
        const c = Math.cos(ang(i)), s = Math.sin(ang(i));
        const x = cx + c * (R + 16), y = cy + s * (R + 16);
        const anchor = Math.abs(c) < 0.2 ? 'middle' : (c > 0 ? 'start' : 'end');
        const dy = s > 0.5 ? 12 : (s < -0.5 ? -4 : 4);
        svg += `<text class="sk-label" x="${x}" y="${y + dy}" text-anchor="${anchor}">${skH(a.label)}<tspan class="sk-label-pct" x="${x}" dy="13">${skPct(a.score)} %</tspan></text>`;
    });
    return svg + '</svg>';
}

// ── PAGE : COMPÉTENCES D'UNE MATIÈRE ──────────────────────────
function skBar(score, n) {
    if (score === null || n < SK_MIN) return `<span class="sk-na">${n > 0 ? `${n} réponse${n > 1 ? 's' : ''} — il en faut ${SK_MIN}` : 'pas encore mesuré'}</span>`;
    const lv = skLevel(score);
    return `<div class="sk-bar"><div class="sk-bar-fill" style="width:${skPct(score)}%;background:${lv.col}"></div></div>
            <span class="sk-val" style="color:${lv.col}">${skPct(score)} % · ${lv.txt}</span>`;
}

function skGoChapter(s, c) {
    if (!db[s] || !db[s][c]) return;
    curSubject = s;
    goChapter(c);
}

function openSkills(subject) {
    clearInterval(qTimer);
    curTrackedPage = null;
    if (subject) curSubject = subject;
    const s = curSubject;
    const cfg = CFG.find(c => c.name === s);
    const axes = skAxes(s);
    const measured = axes.filter(skMeasured);
    const advice = skAdvice(s, axes);
    const model = SK_MODELS[s];
    const total = getPerf().filter(e => e.s === s).length;

    // Radar si au moins 3 compétences mesurées, sinon barres simples.
    const visual = measured.length >= 3
        ? radarSVG(measured)
        : `<p class="sk-hint">Le radar apparaît dès que 3 compétences ont au moins ${SK_MIN} réponses. En attendant, voici le détail :</p>`;

    const chapters = skChapters(s).filter(x => db[s] && db[s][x.c]);
    const worstCh = chapters.filter(x => x.n >= 3).sort((a, b) => a.all.score - b.all.score)[0];

    const weakAx = measured.slice().sort((a, b) => a.score - b.score)[0];
    const actionBtns = [
        weakAx && weakAx.score < 0.65 && typeof psMiniAxis === 'function'
            ? `<button class="bc-btn" onclick="psMiniAxis('${esc(s)}','${weakAx.id}')">🎯 Mini-évaluation : ${skH(weakAx.label)} (${skPct(weakAx.score)} %)</button>` : '',
        advice.action === 'exo'   ? `<button class="bc-btn" onclick="curSubject='${esc(s)}';openExercices()">✏️ Faire des exercices</button>` : '',
        advice.action === 'flash' ? `<button class="bc-btn" onclick="curSubject='${esc(s)}';openSRS()">🎴 Réviser les flashcards</button>` : '',
        worstCh && worstCh.all.score < 0.65 ? `<button class="bc-btn" onclick="skGoChapter('${esc(s)}','${esc(worstCh.c)}')">📖 Chapitre le plus fragile : ${skH(worstCh.c)} (${skPct(worstCh.all.score)} %)</button>` : '',
    ].join('');

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(s)}')">🏠 ${cfg ? cfg.icon : ''} ${skH(s)}</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">🎯 Compétences</span>
        </div>
        <div class="page-head">
            <h1>🎯 Compétences — ${skH(s)}</h1>
            <p style="color:var(--muted);font-size:.85rem">Calculé à partir de tes ${total} réponse${total > 1 ? 's' : ''} (les récentes comptent plus).</p>
        </div>

        <div class="ws-box sk-advice">
            <div class="sk-advice-title">💡 Quoi travailler maintenant ?</div>
            <p>${advice.txt}</p>
            ${actionBtns ? `<div class="sk-actions">${actionBtns}</div>` : ''}
        </div>

        <div class="ws-box">
            ${visual}
            <div class="sk-list">
                ${axes.map(a => `
                <div class="sk-row">
                    <div class="sk-row-top"><strong>${skH(a.label)}</strong></div>
                    <div class="sk-row-bar">${a.soon ? `<span class="sk-na">À mesurer — ${skH(a.soon)}</span>` : skBar(a.score, a.n)}</div>
                    <div class="sk-row-desc">${skH(a.desc)}</div>
                </div>`).join('')}
            </div>
        </div>

        ${typeof errCount === 'function' ? `
        <div class="ws-box">
            <h3 style="margin-bottom:6px">📓 Erreurs à retravailler</h3>
            <p style="font-size:.9rem;color:var(--muted)">${errCount(s) ? `<strong style="color:var(--text)">${errCount(s)}</strong> erreur${errCount(s) > 1 ? 's' : ''} active${errCount(s) > 1 ? 's' : ''} dans cette matière.` : 'Aucune erreur active dans cette matière.'}</p>
            <button class="bc-btn" style="margin-top:10px" onclick="openErrors('${esc(s)}')">Ouvrir le carnet →</button>
        </div>` : ''}

        ${model ? `
        <div class="ws-box">
            <h3 style="margin-bottom:12px">Connaître ≠ savoir utiliser</h3>
            ${SK_GENERIC.map(ax => { const r = skScore(getPerf().filter(e => e.s === s), ax);
                return `<div class="sk-row"><div class="sk-row-top"><strong>${ax.label}</strong></div><div class="sk-row-bar">${skBar(r.score, r.n)}</div><div class="sk-row-desc">${ax.desc}</div></div>`; }).join('')}
        </div>` : ''}

        ${isLangSubject(s) ? `
        <div class="ws-box sk-cecrl">
            <strong>Niveau CECRL (A1 → C2)</strong>
            <p>Pas encore estimé. Je ne veux pas inventer un niveau à partir de simples flashcards : il sera calculé avec l'écoute et l'expression (étape 6) et des exercices de compréhension et d'expression écrite.</p>
        </div>` : ''}

        ${chapters.length ? `
        <div class="ws-box">
            <h3 style="margin-bottom:12px">Par chapitre</h3>
            ${chapters.map(x => `
            <button class="sk-ch" onclick="skGoChapter('${esc(s)}','${esc(x.c)}')">
                <span class="sk-ch-name">${skH(x.c)}</span>
                <span class="sk-ch-chips">
                    <span title="Connaissances">🎴 ${x.know.n ? skPct(x.know.score) + ' %' : '—'}</span>
                    <span title="Exercices">✏️ ${x.exo.n ? skPct(x.exo.score) + ' %' : '—'}</span>
                </span>
            </button>`).join('')}
        </div>` : ''}
    `);
}

// ── ENCART DANS LA PAGE STATISTIQUES ──────────────────────────
function skillsOverviewHTML() {
    const all = getPerf();
    const subjects = CFG.filter(c => all.some(e => e.s === c.name));
    if (!subjects.length) {
        return `<div class="ws-box"><h3 style="margin-bottom:8px">🎯 Compétences</h3>
            <p style="color:var(--muted);font-size:.85rem">Fais quelques flashcards ou exercices : tes compétences par matière apparaîtront ici.</p></div>`;
    }
    return `<div class="ws-box">
        <h3 style="margin-bottom:12px">🎯 Compétences par matière</h3>
        ${subjects.map(c => {
            const ax = skAxes(c.name).filter(skMeasured);
            const mean = ax.length ? ax.reduce((t, a) => t + a.score, 0) / ax.length : null;
            const worst = ax.length ? ax.slice().sort((a, b) => a.score - b.score)[0] : null;
            return `<button class="sk-ch" onclick="openSkills('${esc(c.name)}')">
                <span class="sk-ch-name">${c.icon} ${skH(c.name)}</span>
                <span class="sk-ch-chips">${mean === null ? '<span class="sk-na">pas assez de données</span>'
                    : `<span style="color:${skLevel(mean).col}">${skPct(mean)} %</span><span class="sk-na">à travailler : ${skH(worst.label)}</span>`}</span>
            </button>`;
        }).join('')}
    </div>`;
}
