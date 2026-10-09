/* ============================================================
   BACMASTER — evaluation.js
   Évaluation : « vérifier la maîtrise réelle ».
   Remplace l'ancien QCM et la Révision intensive (doublons des
   flashcards).

   Cours = comprendre · Flashcards = mémoriser ·
   Exercices = appliquer · ÉVALUATION = vérifier.

   Principes
   • Aucune question inventée : tout est généré à partir de TES
     flashcards et exercices existants.
   • Comme à un contrôle : pas de correction pendant l'épreuve,
     tout est corrigé à la fin.
   • Chaque réponse alimente les statistiques (competences.js) et le
     carnet d'erreurs (erreurs.js). Le résultat de chaque évaluation
     est gardé dans 'bacmaster_assess' (utile pour les états du cours).
   • L'évaluation ne modifie PAS l'espacement des flashcards.

   Deux formats
     ⚡ Quiz      rapide, corrigé automatiquement (QCM, association, exercices)
     📝 Contrôle  comme en classe : temps limité, sujet à rédiger, barème,
                  note sur 20. Tu rends ta copie puis tu te corriges avec la
                  correction (comme en échange de copies).

   Types de questions (Quiz)
     know   Connaissance      QCM : choisir la bonne réponse
     comp   Compréhension     QCM inversé : retrouver la notion à partir de sa réponse
     assoc  Mobilisation      Associer 4 notions à leurs définitions (compare, mobilise plusieurs savoirs)
     apply / reason           Exercice (auto-évalué après correction)

   Ce fichier doit être chargé APRÈS competences.js et erreurs.js, AVANT script.js.
   ============================================================ */

const ASM_KEY = 'bacmaster_assess';
const ASM_SIZES = { court: 10, standard: 20, long: 30 };
const ASM_SKILLS = {
    know:   { label: 'Connaissances',  icon: '🧠', ask: 'Choisis la bonne réponse' },
    comp:   { label: 'Compréhension',  icon: '🔎', ask: 'Retrouve la question à laquelle répond…' },
    assoc:  { label: 'Mobilisation',   icon: '🧩', ask: 'Associe chaque notion à sa définition' },
    apply:  { label: 'Application',    icon: '✏️', ask: 'Résous l\'exercice' },
    reason: { label: 'Raisonnement',   icon: '🔴', ask: 'Résous l\'exercice (difficile)' },
};

// ── STOCKAGE ──────────────────────────────────────────────────
function getAssess() {
    try { return JSON.parse(localStorage.getItem(ASM_KEY) || '[]'); } catch (e) { return []; }
}
function saveAssess(rec) {
    try {
        const list = getAssess(); list.push(rec);
        localStorage.setItem(ASM_KEY, JSON.stringify(list.slice(-200)));
    } catch (e) { /* ne jamais bloquer */ }
}
// Dernier résultat d'évaluation par chapitre d'une matière (pour la suite : états du cours)
function asmChapterResults(subject) {
    const out = {};
    getAssess().filter(r => r.s === subject && r.mode !== 'mini').sort((a, b) => a.t - b.t).forEach(r => {   // une mini-évaluation ne valide pas un chapitre
        Object.entries(r.ch || {}).forEach(([c, [ok, n]]) => { if (n > 0) out[c] = { ratio: ok / n, t: r.t, n }; });
    });
    return out;
}

// ── OUTILS ────────────────────────────────────────────────────
const asmH = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function asmShuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}
const asmNorm = t => String(t || '').replace(/<[^>]*>/g, ' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
// Ressemblance entre deux textes (0 à 1) : évite les mauvaises réponses quasi identiques à la bonne
function asmSim(a, b) {
    const na = asmNorm(a), nb = asmNorm(b);
    if (!na || !nb) return na === nb ? 1 : 0;
    if (na === nb) return 1;
    const short = na.length <= nb.length ? na : nb, long = short === na ? nb : na;
    if (short.length >= 6 && long.includes(short)) return 1;
    const wa = new Set(na.split(' ').filter(w => w.length >= 3)), wb = new Set(nb.split(' ').filter(w => w.length >= 3));
    if (!wa.size || !wb.size) return 0;
    let inter = 0; wa.forEach(w => { if (wb.has(w)) inter++; });
    return inter / (wa.size + wb.size - inter);
}
// Choisit k mauvaises réponses : d'abord le même chapitre, jamais trop proches de la bonne
function asmDistract(correct, sameCh, others, k, getText) {
    const out = [], texts = [correct];
    for (const c of asmShuffle(sameCh).concat(asmShuffle(others))) {
        const t = getText(c);
        if (texts.some(x => asmSim(x, t) >= 0.6)) continue;
        out.push(t); texts.push(t);
        if (out.length >= k) break;
    }
    return out;
}
const asmItem = c => ({ k: c.q + '|' + c.a, q: c.q, a: c.a });

// ── GÉNÉRATION DES QUESTIONS ──────────────────────────────────
function asmBuild(subject, chapters, n, withExo, opts) {
    const prefer = (opts && opts.prefer) || null;      // cartes à placer en premier (ex. mes erreurs)
    // Pool de cartes (sans doublon), regroupées par chapitre
    const seen = new Set(), pool = [], byCh = {};
    chapters.forEach(ch => (db[subject][ch].flashcards || []).forEach(card => {
        const k = card.q + '|' + card.a;
        if (seen.has(k)) return; seen.add(k);
        const o = { card, ch }; pool.push(o); (byCh[ch] = byCh[ch] || []).push(o);
    }));
    // Exercices disponibles
    const exoPool = [];
    if (withExo) chapters.forEach(ch => (db[subject][ch].exercices || []).forEach((exo, i) => exoPool.push({ exo, originalIndex: i, ch })));

    const nExo = Math.min(exoPool.length, Math.round(n * 0.2), 6);
    let nCard = n - nExo;
    let nAssoc = pool.length >= 8 ? Math.round(n * 0.15) : 0;
    // Pas plus de questions que de cartes disponibles (une carte = une seule question)
    while (nCard > 0 && nAssoc * 4 + (nCard - nAssoc) > pool.length) { if (nAssoc > 0 && nAssoc * 4 > pool.length / 2) nAssoc--; else nCard--; }
    nAssoc = Math.max(0, Math.min(nAssoc, nCard));
    if (pool.length < 4 || nCard < 1) return null;
    const nRev = Math.round((nCard - nAssoc) * 0.3);
    const nKnow = Math.max(0, nCard - nAssoc - nRev);

    // File de cartes : on alterne les chapitres pour couvrir tout le périmètre
    const lists = asmShuffle(Object.keys(byCh)).map(ch => asmShuffle(byCh[ch]));
    const queue = [];
    for (let i = 0; lists.some(l => i < l.length); i++) lists.forEach(l => { if (i < l.length) queue.push(l[i]); });
    if (prefer && prefer.size) queue.sort((a, b) => prefer.has(b.card.q + '|' + b.card.a) - prefer.has(a.card.q + '|' + a.card.a));
    const used = new Set();
    const takeCard = pred => { const i = queue.findIndex(o => !used.has(o) && (!pred || pred(o))); if (i < 0) return null; used.add(queue[i]); return queue[i]; };
    const sameChOthers = o => byCh[o.ch].filter(x => x !== o);
    const otherChs = o => pool.filter(x => x.ch !== o.ch);

    const qs = [];
    // 1. Association (4 notions, idéalement du même chapitre)
    for (let a = 0; a < nAssoc; a++) {
        let group = null;
        for (const ch of asmShuffle(Object.keys(byCh))) {
            const free = byCh[ch].filter(o => !used.has(o));
            const pick = [];
            const order = asmShuffle(free);
            if (prefer && prefer.size) order.sort((a, b) => prefer.has(b.card.q + '|' + b.card.a) - prefer.has(a.card.q + '|' + a.card.a));
            for (const o of order) {
                if (pick.every(p => asmSim(p.card.a, o.card.a) < 0.5 && asmSim(p.card.q, o.card.q) < 0.5)) pick.push(o);
                if (pick.length === 4) break;
            }
            if (pick.length === 4) { group = pick; break; }
        }
        if (!group) break;
        group.forEach(o => used.add(o));
        qs.push({ type: 'assoc', skill: 'assoc', pairs: group, right: asmShuffle(group.map((_, i) => i)) });
    }
    // 2. QCM inversé (compréhension)
    for (let r = 0; r < nRev; r++) {
        const o = takeCard(x => String(x.card.q).length <= 160);
        if (!o) break;
        const dist = asmDistract(o.card.q, sameChOthers(o).map(x => x.card), otherChs(o).map(x => x.card), 3, c => c.q);
        if (dist.length < 2) { used.delete(o); continue; }
        const opts = asmShuffle([o.card.q, ...dist]);
        qs.push({ type: 'rev', skill: 'comp', ch: o.ch, card: o.card, opts, correct: opts.indexOf(o.card.q) });
    }
    // 3. QCM de connaissance
    for (let k = 0; k < nKnow + (nRev - qs.filter(q => q.type === 'rev').length); k++) {
        const o = takeCard();
        if (!o) break;
        const dist = asmDistract(o.card.a, sameChOthers(o).map(x => x.card), otherChs(o).map(x => x.card), 3, c => c.a);
        if (dist.length < 2) { used.delete(o); continue; }
        const opts = asmShuffle([o.card.a, ...dist]);
        qs.push({ type: 'mcq', skill: 'know', ch: o.ch, card: o.card, opts, correct: opts.indexOf(o.card.a) });
    }
    // 4. Exercices en dernier (plus longs)
    const exos = asmShuffle(qs.length ? exoPool : []).slice(0, nExo);
    const cardQs = asmShuffle(qs);
    exos.forEach(e => cardQs.push({ type: 'exo', skill: e.exo.niveau === 'Difficile' ? 'reason' : 'apply', ch: e.ch, exo: e.exo, originalIndex: e.originalIndex }));
    return cardQs.length >= 3 ? cardQs : null;
}

// Mini-évaluation « exercices seulement » (compétences Application / Raisonnement) :
// on met d'abord les exercices que tu as ratés ou à moitié réussis.
function asmBuildExos(subject, chapters, n, niveau) {
    const pool = [];
    chapters.forEach(ch => (db[subject][ch].exercices || []).forEach((exo, i) => pool.push({ exo, originalIndex: i, ch })));
    let cand = pool;
    if (niveau === 'Difficile') { const d = pool.filter(p => p.exo.niveau === 'Difficile'); if (d.length) cand = d; }
    else if (niveau === 'Facile/Moyen') { const d = pool.filter(p => p.exo.niveau !== 'Difficile'); if (d.length) cand = d; }
    const weak = p => (p.exo.status === 'a_revoir' || p.exo.status === 'presque') ? 1 : 0;
    const pick = asmShuffle(cand).sort((a, b) => weak(b) - weak(a)).slice(0, n);
    if (!pick.length) return null;
    return pick.map(e => ({ type: 'exo', skill: e.exo.niveau === 'Difficile' ? 'reason' : 'apply', ch: e.ch, exo: e.exo, originalIndex: e.originalIndex }));
}

// ── PAGE DE PRÉPARATION ───────────────────────────────────────
function openEval(subject, preChapter) {
    clearInterval(qTimer);
    curTrackedPage = null;
    if (subject) curSubject = subject;
    const s = curSubject;
    const chapters = Object.keys(db[s] || {}).filter(ch => (db[s][ch].flashcards || []).length > 0);
    const anyDiscovered = chapters.some(ch => chapterDiscovered(db[s][ch]));
    const nExo = chapters.reduce((t, ch) => t + (db[s][ch].exercices || []).length, 0);
    const hist = getAssess().filter(r => r.s === s).sort((a, b) => b.t - a.t).slice(0, 5);

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(s)}')">← ${asmH(s)}</button>
        </div>
        <div class="ws-box">
        <div class="setup-wrap">
            <h3>🧪 Évaluation — ${asmH(s)}</h3>
            <div class="info-box green"><b>Vérifie ta maîtrise réelle.</b> Questions de connaissance, de compréhension, d'association et exercices, tirées de ton contenu. Comme à un contrôle : les corrections arrivent à la fin.</div>

            ${typeof psAgendaBanner === 'function' ? psAgendaBanner(s) : ''}
            ${chapters.length ? `
            <p style="font-weight:700;margin-bottom:10px;">Chapitres à évaluer :</p>
            ${chapters.length > 6 ? `<input type="text" class="cb-search" placeholder="🔎 Rechercher un chapitre..." oninput="filterCbList(this,'asm-cb')">` : ''}
            <div class="cb-list" id="asm-cb-list">
                ${chapters.map(ch => {
                    const known = chapterDiscovered(db[s][ch]);
                    const n = (db[s][ch].flashcards || []).length;
                    return `<label class="cb-item">
                        <input type="checkbox" class="asm-cb" value="${asmH(ch)}" ${(preChapter ? ch === preChapter : (known || !anyDiscovered)) ? 'checked' : ''}>
                        <span style="flex:1">${typeof psIcon === 'function' ? psIcon(s, ch) + ' ' : ''}${asmH(ch)}</span>
                        <span class="cb-right">${known ? n + ' cartes' : '🆕 à découvrir'}</span>
                    </label>`;
                }).join('')}
            </div>
            <div class="btn-row">
                <button class="bc-btn" onclick="document.querySelectorAll('.asm-cb').forEach(c=>c.checked=true)">Tout cocher</button>
                <button class="bc-btn" onclick="document.querySelectorAll('.asm-cb').forEach(c=>c.checked=false)">Tout décocher</button>
            </div>
            ${anyDiscovered ? '' : '<p class="sk-hint">Tu n\'as encore ouvert aucun cours de cette matière : on t\'évalue sur tous les chapitres. Les résultats seront plus parlants après avoir lu et révisé.</p>'}

            <label style="font-weight:700;display:block;margin:14px 0 8px">Format :</label>
            <select id="asm-mode" class="field" style="margin-bottom:6px" onchange="asmModeChange()">
                <option value="quiz">⚡ Quiz — rapide, corrigé automatiquement</option>
                <option value="controle">📝 Contrôle — comme en classe, note sur 20</option>
            </select>
            <p class="sk-hint" id="asm-mode-info" style="margin-bottom:10px"></p>
            <label style="font-weight:700;display:block;margin:6px 0 8px">Durée :</label>
            <select id="asm-n" class="field" style="margin-bottom:12px"></select>
            <label class="cb-item" style="margin-bottom:14px">
                <input type="checkbox" id="asm-exo" ${nExo ? 'checked' : 'disabled'}>
                <span style="flex:1">Inclure des exercices (application et raisonnement)</span>
                <span class="cb-right">${nExo ? nExo + ' dispo' : 'aucun'}</span>
            </label>
            <button class="btn-main green" onclick="asmStart()">🚀 Commencer</button>
            ` : `<p style="color:var(--muted)">Cette matière n'a pas encore de flashcards : il en faut au moins 4 pour générer une évaluation.</p>`}

            ${hist.length ? `
            <div class="asm-hist">
                <p style="font-weight:700;margin:18px 0 8px">Tes dernières évaluations</p>
                ${hist.map(r => `<div class="asm-hist-row"><span>${new Date(r.t).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} · ${r.mode === 'controle' ? '📝 contrôle' : r.mode === 'mini' ? '🎯 mini · ' + asmH(r.label || '') : '⚡ quiz · ' + r.n + ' questions'}</span><strong style="color:${skLevel(r.score).col}">${r.mode === 'controle' ? asmFmt(r.note) + ' / 20' : Math.round(r.score * 100) + ' %'}</strong></div>`).join('')}
            </div>` : ''}
        </div>
        </div>
    `);
    if ($('asm-mode')) asmModeChange();
}

// ── SESSION ───────────────────────────────────────────────────
let asmSess = null;

function asmStart() {
    const s = curSubject;
    const chapters = [...document.querySelectorAll('.asm-cb:checked')].map(c => c.value);
    if (!chapters.length) { showToast('Sélectionne au moins un chapitre !', 'warn'); return; }
    const withExo = !!($('asm-exo') && $('asm-exo').checked);
    if ($('asm-mode').value === 'controle') return asmCtlStart(chapters, parseInt($('asm-n').value, 10) || 45, withExo);
    const n = ASM_SIZES[$('asm-n').value] || 20;
    const qs = asmBuild(s, chapters, n, withExo);
    if (!qs) { showToast('Pas assez de cartes dans ces chapitres (il en faut au moins 4).', 'warn'); return; }
    asmSess = { s, chapters, qs, i: 0, res: [], t0: Date.now(), id: Date.now().toString(36), sel: null, shown: false, mode: 'quiz',
                 before: typeof psSnapshot === 'function' ? psSnapshot(s, chapters) : null };
    asmRender();
}

function asmStop() {
    customConfirm({
        icon: '🧪', title: "Arrêter l'évaluation ?",
        message: "Les questions déjà faites resteront dans tes statistiques, mais cette évaluation ne sera pas enregistrée.",
        confirmLabel: 'Arrêter', cancelLabel: 'Continuer', danger: true,
        onConfirm: () => { asmSess = null; openEval(curSubject); }
    });
}

function asmRender() {
    const S = asmSess;
    if (!S) return;
    if (S.i >= S.qs.length) return asmFinish();
    const q = S.qs[S.i], sk = ASM_SKILLS[q.skill];
    S.sel = null; S.shown = false;
    curTrackedPage = { subject: S.s, activity: '🧪 Évaluation' };
    const pct = Math.round(S.i / S.qs.length * 100), sc = subjectColor(S.s), letters = ['A', 'B', 'C', 'D'];

    let body = '';
    if (q.type === 'mcq' || q.type === 'rev') {
        const label = q.type === 'mcq' ? 'Définition / traduction de' : 'Retrouve la question à laquelle répond';
        const text = q.type === 'mcq' ? q.card.q : q.card.a;
        body = `
            <div class="qcm-q-box" style="border-top-color:${sc}">
                <div class="qcm-q-label" style="color:${sc}">${sk.icon} ${label}</div>
                <div class="qcm-q-text">${text}</div>
            </div>
            <div class="qcm-opts">
                ${q.opts.map((o, i) => `<button class="qcm-opt" id="aopt${i}" onclick="asmPick(${i})">
                    <span class="opt-letter opt-letter-${i}">${letters[i]}</span><span>${o}</span></button>`).join('')}
            </div>
            <button class="asm-next" id="asm-next" disabled onclick="asmNext()">Valider →</button>`;
    } else if (q.type === 'assoc') {
        body = `
            <div class="qcm-q-box" style="border-top-color:${sc}">
                <div class="qcm-q-label" style="color:${sc}">${sk.icon} Associe chaque notion à sa définition</div>
                <div class="asm-assoc">
                    ${q.pairs.map((p, i) => `<div class="asm-assoc-row">
                        <div class="asm-assoc-q">${p.card.q}</div>
                        <select class="field asm-sel" id="asel${i}" onchange="asmAssocChange()">
                            <option value="">—</option>${q.right.map((_, j) => `<option value="${j}">${letters[j]}</option>`).join('')}
                        </select></div>`).join('')}
                </div>
                <div class="asm-assoc-answers">
                    ${q.right.map((idx, j) => `<div class="asm-assoc-a"><span class="opt-letter opt-letter-${j}">${letters[j]}</span><span>${q.pairs[idx].card.a}</span></div>`).join('')}
                </div>
            </div>
            <button class="asm-next" id="asm-next" disabled onclick="asmNext()">Valider →</button>`;
    } else {
        body = `
            <div class="qcm-q-box" style="border-top-color:${sc}">
                <div class="qcm-q-label" style="color:${sc}">${sk.icon} ${q.exo.niveau || 'Moyen'} · exercice</div>
                <div class="exo-enonce">${q.exo.enonce}</div>
            </div>
            <div id="asm-exo-zone">
                <div class="exo-attempt">
                    <div class="exo-label">✏️ Ta réponse / ton raisonnement</div>
                    <textarea class="exo-attempt-area" placeholder="Cherche vraiment avant de regarder la correction (pas sauvegardé, juste pour toi)."></textarea>
                </div>
                <button class="btn-main exo-voir-btn" onclick="asmShowCorrection()">👁️ Voir la correction</button>
            </div>`;
    }

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="asmStop()">✕ Arrêter</button>
        </div>
        <div class="ws-box">
        <div class="qcm-wrap">
            <div class="srs-prog-row">
                <span>Question <b>${S.i + 1}</b> / ${S.qs.length}</span>
                <span class="asm-skill">${sk.icon} ${sk.label}</span>
            </div>
            <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:linear-gradient(90deg,${sc},${sc}99)"></div></div>
            ${body}
        </div>
        </div>
    `);
}

function asmPick(i) {
    asmSess.sel = i;
    document.querySelectorAll('.qcm-opt').forEach((b, j) => b.classList.toggle('sel', j === i));
    const nb = $('asm-next'); if (nb) { nb.disabled = false; nb.textContent = asmSess.i + 1 < asmSess.qs.length ? 'Valider →' : 'Terminer →'; }
}
function asmAssocChange() {
    const q = asmSess.qs[asmSess.i];
    const all = q.pairs.every((_, i) => $('asel' + i).value !== '');
    const nb = $('asm-next'); if (nb) nb.disabled = !all;
}
function asmShowCorrection() {
    const q = asmSess.qs[asmSess.i];
    const z = $('asm-exo-zone');
    z.innerHTML = `
        <div class="exo-correction"><div class="exo-label correction-label">✅ Correction</div>${q.exo.correction || '<p>(pas de correction)</p>'}</div>
        <div class="exo-label" style="margin-top:14px">Où en étais-tu ?</div>
        <div class="exo-rating-row">
            <button class="exo-rate-btn exo-rate-bad" onclick="asmGradeExo('a_revoir')">🔴 À revoir</button>
            <button class="exo-rate-btn exo-rate-mid" onclick="asmGradeExo('presque')">🟡 Presque</button>
            <button class="exo-rate-btn exo-rate-good" onclick="asmGradeExo('reussi')">🟢 Réussi</button>
        </div>`;
    typesetMath(z);
}

// Enregistre le résultat d'une question : { score, parts, review }
function asmRecord(entry) {
    const S = asmSess;
    if (typeof logActivity === 'function') logActivity();   // allume la bougie du jour
    S.res.push(entry);
    S.i++;
    asmRender();
}

function asmNext() {
    const S = asmSess, q = S.qs[S.i];
    if (q.type === 'mcq' || q.type === 'rev') {
        if (S.sel === null) return;
        const ok = S.sel === q.correct;
        logPerf(S.s, q.ch, q.type === 'mcq' ? 'qcm' : 'comp', ok ? 1 : 0, '', asmItem(q.card), S.id);
        asmRecord({ q, score: ok ? 1 : 0, parts: [{ ch: q.ch, score: ok ? 1 : 0, w: 1 }],
            review: ok ? null : { ask: q.type === 'mcq' ? q.card.q : q.card.a, yours: q.opts[S.sel], good: q.opts[q.correct] } });
    } else if (q.type === 'assoc') {
        const picks = q.pairs.map((_, i) => parseInt($('asel' + i).value, 10));
        const wrong = [], parts = [];
        let good = 0;
        q.pairs.forEach((p, i) => {
            const ok = q.right[picks[i]] === i;
            if (ok) good++; else wrong.push({ ask: p.card.q, yours: q.pairs[q.right[picks[i]]].card.a, good: p.card.a });
            parts.push({ ch: p.ch, score: ok ? 1 : 0, w: 0.25 });
            logPerf(S.s, p.ch, 'assoc', ok ? 1 : 0, '', asmItem(p.card), S.id);
        });
        asmRecord({ q, score: good / 4, parts, review: wrong.length ? wrong : null });
    }
}
function asmGradeExo(status) {
    const S = asmSess, q = S.qs[S.i];
    const r = status === 'reussi' ? 1 : (status === 'presque' ? 0.5 : 0);
    const plain = errPlain(q.exo.enonce);
    logPerf(S.s, q.ch, 'exo', r, q.exo.niveau || 'Moyen', { k: plain, q: plain, x: q.originalIndex }, S.id);
    asmRecord({ q, score: r, parts: [{ ch: q.ch, score: r, w: 1 }], review: r < 1 ? { exo: true, ask: plain, good: '' } : null });
}

// ── RÉSULTATS ─────────────────────────────────────────────────
function asmVerdict(p) {
    if (p >= 0.85) return { emoji: '🏆', txt: 'Maîtrise solide' };
    if (p >= 0.70) return { emoji: '👍', txt: 'Bon niveau' };
    if (p >= 0.50) return { emoji: '📚', txt: 'À consolider' };
    return { emoji: '🔁', txt: 'À retravailler' };
}

function asmFinish() {
    const S = asmSess;
    curTrackedPage = null;
    const dur = S.dur !== undefined ? S.dur : Math.round((Date.now() - S.t0) / 1000);
    // Totaux par compétence et par chapitre
    const sk = {}, ch = {};
    let tot = 0, sum = 0;
    S.res.forEach(r => {
        const k = r.q.skill; sk[k] = sk[k] || [0, 0]; sk[k][0] += r.score; sk[k][1] += 1;
        const wq = r.pts || 1;                       // contrôle : points du barème ; quiz : 1 par question
        tot += wq; sum += r.score * wq;
        r.parts.forEach(p => { ch[p.ch] = ch[p.ch] || [0, 0]; ch[p.ch][0] += p.score * p.w; ch[p.ch][1] += p.w; });
    });
    const score = tot ? sum / tot : 0;
    const isCtl = S.mode === 'controle', isMini = S.mode === 'mini';
    const note = isCtl ? score * 20 : null;
    saveAssess({ id: S.id, t: Date.now(), s: S.s, chs: S.chapters, n: S.res.length, score, sk, ch, dur,
                 ...(isCtl ? { mode: 'controle', note } : isMini ? { mode: 'mini', label: S.miniLabel } : {}) });

    const v = asmVerdict(score);
    const mins = Math.floor(dur / 60), secs = dur % 60;
    const bar = (ok, n) => { const p = n ? ok / n : 0, lv = skLevel(p);
        return `<div class="sk-bar"><div class="sk-bar-fill" style="width:${Math.round(p * 100)}%;background:${lv.col}"></div></div><span class="sk-val" style="color:${lv.col}">${Math.round(p * 100)} %</span>`; };
    const skRows = Object.keys(ASM_SKILLS).filter(k => sk[k]).map(k =>
        `<div class="sk-row"><div class="sk-row-top"><strong>${ASM_SKILLS[k].icon} ${ASM_SKILLS[k].label}</strong> <span class="sk-na">${sk[k][1]} question${sk[k][1] > 1 ? 's' : ''}</span></div><div class="sk-row-bar">${bar(sk[k][0], sk[k][1])}</div></div>`).join('');
    const chEntries = Object.entries(ch).sort((a, b) => (a[1][0] / a[1][1]) - (b[1][0] / b[1][1]));
    const chRows = chEntries.map(([c, [ok, n]]) =>
        `<div class="sk-row"><div class="sk-row-top"><strong>${asmH(c)}</strong></div><div class="sk-row-bar">${bar(ok, n)}</div></div>`).join('');

    // Corrections
    const wrongs = S.res.filter(r => r.review);
    const reviewHTML = wrongs.map(r => {
        if (r.review.exo) return `<div class="er-item"><div class="er-top"><span class="er-ty er-ty-exo">Exercice</span></div><div class="er-q">${asmH(r.review.ask)}</div><div class="er-state">Revois-le dans Exercices ou le carnet d'erreurs.</div></div>`;
        const items = Array.isArray(r.review) ? r.review : [r.review];
        return items.map(x => `<div class="er-item">
            <div class="er-q">${x.ask}</div>
            <div class="asm-corr"><span class="asm-bad">✗ Ta réponse :</span> ${x.yours}</div>
            <div class="asm-corr"><span class="asm-good">✓ Bonne réponse :</span> ${x.good}</div></div>`).join('');
    }).join('');

    // Conseil
    const weak = chEntries.find(([, [ok, n]]) => n >= 1 && ok / n < 0.65);
    const advice = score >= 0.85 ? "Excellent : cette matière est solide. Continue à l'entretenir avec les révisions du jour."
        : weak ? `Ton point le plus fragile : <strong>${asmH(weak[0])}</strong> (${Math.round(weak[1][0] / weak[1][1] * 100)} %). Relis le cours puis passe aux flashcards de ce chapitre.`
        : 'Reprends tes erreurs ci-dessous, puis refais une évaluation dans quelques jours.';

    render(`
        <div class="ws-box">
        <div class="session-end">
            <div class="se-emoji">${v.emoji}</div>
            <div class="se-title">${v.txt}</div>
            <div class="se-subject">${asmH(S.s)} · ${isCtl ? 'Contrôle' : isMini ? '🎯 Mini-évaluation · ' + asmH(S.miniLabel) : 'Quiz'}</div>
            ${isCtl
                ? `<div class="se-pct">${asmFmt(note)}<span style="font-size:.5em"> / 20</span></div>
                   <div class="se-label">${asmAppreciation(note)} · rendu en ${mins}m${String(secs).padStart(2, '0')}s sur ${S.limit} min</div>`
                : `<div class="se-pct">${Math.round(score * 100)}%</div>
                   <div class="se-label">de réussite sur ${S.res.length} questions · ${mins}m${String(secs).padStart(2, '0')}s</div>`}
            <div class="se-actions">
                <button class="btn-main green" onclick="openEval('${esc(S.s)}')">🔄 Nouvelle évaluation</button>
                <button class="btn-main" onclick="openErrors('${esc(S.s)}')">📓 Carnet d'erreurs</button>
                <button class="bc-btn se-home-btn" onclick="goSubject('${esc(S.s)}')">← Retour au menu</button>
            </div>
        </div>
        </div>
        <div class="ws-box sk-advice"><div class="sk-advice-title">💡 Conseil</div><p>${advice}</p></div>
        ${typeof psChangesHTML === 'function' ? psChangesHTML(S.before, S.s, Object.keys(ch)) : ''}
        <div class="ws-box"><h3 style="margin-bottom:10px">Par compétence</h3>${skRows}</div>
        <div class="ws-box"><h3 style="margin-bottom:10px">Par chapitre</h3>${chRows}</div>
        ${wrongs.length ? `<div class="ws-box"><h3 style="margin-bottom:10px">Corrections (${wrongs.length})</h3>${reviewHTML}</div>` : ''}
    `);
    asmSess = null;
}


// ═════════════════════════════════════════════════════════════
// FORMAT CONTRÔLE — comme en classe
//   1. Épreuve : sujet à rédiger, temps limité, aucune aide
//   2. Rendu de la copie (ou fin du temps)
//   3. Correction : tu te notes question par question avec la correction
//   4. Note sur 20 + appréciation
// La note dépend de ton honnêteté à l'étape 3 : c'est comme un
// échange de copies, pas une correction automatique.
// ═════════════════════════════════════════════════════════════
const ASM_CTL_DURATIONS = { 30: [4, 2], 45: [6, 3], 55: [7, 4] };   // minutes : [questions de cours, exercices]
const ASM_EXO_WEIGHT = { 'Facile': 1.5, 'Moyen': 2.5, 'Difficile': 3.5 };

const asmFmt = x => (Math.round(x * 2) / 2).toString().replace('.', ',');
function asmAppreciation(n) {
    if (n >= 16) return 'Très bien';
    if (n >= 14) return 'Bien';
    if (n >= 12) return 'Assez bien';
    if (n >= 10) return 'Passable';
    if (n >= 8)  return 'Insuffisant';
    return 'Très insuffisant';
}

// Format et durée proposés dans la page de préparation
function asmModeChange() {
    const ctl = $('asm-mode').value === 'controle';
    $('asm-n').innerHTML = ctl
        ? '<option value="30">30 minutes — 4 questions de cours + 2 exercices</option><option value="45" selected>45 minutes — 6 questions de cours + 3 exercices</option><option value="55">55 minutes — 7 questions de cours + 4 exercices</option>'
        : '<option value="court">Courte — 10 questions</option><option value="standard" selected>Standard — 20 questions</option><option value="long">Longue — 30 questions</option>';
    $('asm-mode-info').textContent = ctl
        ? "Sujet à rédiger, temps limité, note sur 20. Tu rends ta copie, puis tu te corriges avec la correction, comme en échange de copies. Sois sévère : la note n'a de valeur que si tu es honnête."
        : "Questions rapides, corrigées automatiquement. Bien pour s'entraîner et repérer les points faibles.";
}

// Barème : points par question, multiples de 0,5, total exactement 20.
// Les écarts d'arrondi sont absorbés par la question la plus lourde.
function asmBareme(weights) {
    const tot = weights.reduce((a, b) => a + b, 0);
    const pts = weights.map(w => Math.max(0.5, Math.round(w * 20 / tot * 2) / 2));
    let diff = 20 - pts.reduce((a, b) => a + b, 0), guard = 0;
    while (Math.abs(diff) > 0.001 && guard++ < 100) {
        const k = pts.indexOf(Math.max(...pts));
        const step = diff > 0 ? 0.5 : -0.5;
        pts[k] += step; diff -= step;
    }
    return pts;
}

function asmCtlStart(chapters, minutes, withExo) {
    const s = curSubject;
    const [wantC, wantE] = ASM_CTL_DURATIONS[minutes] || ASM_CTL_DURATIONS[45];
    // Questions de cours : cartes tirées en alternant les chapitres
    const seen = new Set(), lists = {};
    chapters.forEach(ch => (db[s][ch].flashcards || []).forEach(card => {
        const k = card.q + '|' + card.a; if (seen.has(k)) return; seen.add(k);
        (lists[ch] = lists[ch] || []).push({ card, ch });
    }));
    const ls = asmShuffle(Object.keys(lists)).map(c => asmShuffle(lists[c])), cards = [];
    for (let i = 0; ls.some(l => i < l.length); i++) ls.forEach(l => { if (i < l.length) cards.push(l[i]); });
    const exoPool = [];
    if (withExo) chapters.forEach(ch => (db[s][ch].exercices || []).forEach((exo, i) => exoPool.push({ exo, originalIndex: i, ch })));
    const nE = Math.min(exoPool.length, wantE);
    const nC = Math.min(cards.length, wantC + (wantE - nE));       // pas d'exercices dispo : plus de questions de cours
    if (nC + nE < 3) { showToast('Pas assez de contenu dans ces chapitres pour un contrôle.', 'warn'); return; }

    const qs = [];
    cards.slice(0, nC).forEach(o => qs.push({ type: 'cours', skill: 'know', ch: o.ch, card: o.card, w: 1 }));
    asmShuffle(exoPool).slice(0, nE).forEach(e => qs.push({ type: 'exo', skill: e.exo.niveau === 'Difficile' ? 'reason' : 'apply',
        ch: e.ch, exo: e.exo, originalIndex: e.originalIndex, w: ASM_EXO_WEIGHT[e.exo.niveau] || 2.5 }));
    asmBareme(qs.map(q => q.w)).forEach((p, i) => { qs[i].pts = p; });

    asmSess = { s, chapters, qs, mode: 'controle', limit: minutes, t0: Date.now(), id: Date.now().toString(36),
                answers: [], grades: [], res: [], phase: 'epreuve',
                before: typeof psSnapshot === 'function' ? psSnapshot(s, chapters) : null };
    asmCtlRender();
}

function asmCtlRender() {
    const S = asmSess;
    curTrackedPage = { subject: S.s, activity: '📝 Contrôle' };
    const sc = subjectColor(S.s);
    const partI = S.qs.map((q, i) => ({ q, i })).filter(x => x.q.type === 'cours');
    const partII = S.qs.map((q, i) => ({ q, i })).filter(x => x.q.type === 'exo');
    const ptsTxt = p => `${asmFmt(p)} pt${p > 1 ? 's' : ''}`;
    let n = 0;
    const block = x => `
        <div class="ct-q">
            <div class="ct-q-head"><strong>Question ${++n}</strong><span class="ct-pts">${ptsTxt(x.q.pts)}</span></div>
            <div class="ct-q-text">${x.q.type === 'cours' ? x.q.card.q : x.q.exo.enonce}</div>
            <textarea class="exo-attempt-area ct-ans" id="ct-ans-${x.i}" placeholder="${x.q.type === 'cours' ? 'Ta réponse rédigée…' : 'Ta résolution (tu peux aussi chercher sur papier)…'}"></textarea>
        </div>`;
    render(`
        <div class="ct-bar" id="ct-bar">
            <span id="ct-timer">⏱ --:--</span>
            <button class="bc-btn" onclick="asmCtlSubmit(false)">📤 Rendre ma copie</button>
        </div>
        <div class="ws-box">
            <div class="ct-head" style="border-color:${sc}">
                <div class="ct-title">📝 Contrôle de ${asmH(S.s)}</div>
                <div class="ct-meta">Durée : ${S.limit} min · Barème : /20 · Aucun document · Réponds avec tes propres mots</div>
            </div>
            ${partI.length ? `<h3 class="ct-part">I. Questions de cours</h3>${partI.map(block).join('')}` : ''}
            ${partII.length ? `<h3 class="ct-part">${partI.length ? 'II' : 'I'}. Exercices</h3>${partII.map(block).join('')}` : ''}
            <button class="asm-next" onclick="asmCtlSubmit(false)">📤 Rendre ma copie</button>
        </div>
    `);
    clearInterval(qTimer);
    qTimer = setInterval(asmCtlTick, 1000);
    asmCtlTick();
}

function asmCtlTick() {
    const S = asmSess;
    if (!S || S.phase !== 'epreuve') { clearInterval(qTimer); return; }
    const left = S.limit * 60 - Math.round((Date.now() - S.t0) / 1000);
    if (left <= 0) { asmCtlSubmit(true); return; }
    const el = $('ct-timer');
    if (el) {
        el.textContent = '⏱ ' + String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0') + ' restantes';
        el.classList.toggle('ct-late', left <= 300);
    }
}

function asmCtlSubmit(auto) {
    const S = asmSess;
    if (!S || S.phase !== 'epreuve') return;
    const collect = () => {
        S.answers = S.qs.map((_, i) => { const el = $('ct-ans-' + i); return el ? el.value.trim() : ''; });
        S.phase = 'correction'; S.tRendu = Date.now(); clearInterval(qTimer);
        if (auto) showToast('⏰ Temps écoulé : copie rendue.', 'info');
        asmCtlCorrection();
    };
    if (auto) return collect();
    const empty = S.qs.filter((_, i) => { const el = $('ct-ans-' + i); return !el || !el.value.trim(); }).length;
    if (!empty) return collect();
    customConfirm({
        icon: '📤', title: 'Rendre ta copie ?',
        message: `${empty} question${empty > 1 ? 's' : ''} sans réponse. Tu ne pourras plus modifier ta copie.`,
        confirmLabel: 'Rendre', cancelLabel: 'Continuer', danger: false, onConfirm: collect
    });
}

function asmCtlCorrection() {
    const S = asmSess;
    curTrackedPage = { subject: S.s, activity: '📝 Contrôle (correction)' };
    const ptsTxt = p => `${asmFmt(p)} pt${p > 1 ? 's' : ''}`;
    render(`
        <div class="ct-bar"><span id="ct-note">Note provisoire : 0 / 20</span></div>
        <div class="ws-box">
            <div class="ct-head"><div class="ct-title">✅ Correction de ta copie</div>
            <div class="ct-meta">Corrige-toi comme le ferait un prof : sévère mais juste. « En partie » = l'idée est là mais incomplète ou imprécise.</div></div>
            ${S.qs.map((q, i) => `
            <div class="ct-q" id="ct-c-${i}">
                <div class="ct-q-head"><strong>Question ${i + 1}</strong><span class="ct-pts">${ptsTxt(q.pts)}</span></div>
                <div class="ct-q-text">${q.type === 'cours' ? q.card.q : q.exo.enonce}</div>
                <div class="ct-mine"><span class="ct-label">Ta réponse</span>${S.answers[i] ? asmH(S.answers[i]).replace(/\n/g, '<br>') : '<em style="color:var(--muted)">(rien rédigé)</em>'}</div>
                <div class="ct-corr"><span class="ct-label">✅ Correction</span>${q.type === 'cours' ? q.card.a : (q.exo.correction || '<p>(pas de correction fournie)</p>')}</div>
                <div class="exo-rating-row">
                    <button class="exo-rate-btn exo-rate-bad"  id="ct-g-${i}-0"   onclick="asmCtlGrade(${i},0)">✗ Faux</button>
                    <button class="exo-rate-btn exo-rate-mid"  id="ct-g-${i}-0.5" onclick="asmCtlGrade(${i},0.5)">◐ En partie</button>
                    <button class="exo-rate-btn exo-rate-good" id="ct-g-${i}-1"   onclick="asmCtlGrade(${i},1)">✓ Juste</button>
                </div>
            </div>`).join('')}
            <button class="asm-next" id="ct-finish" disabled onclick="asmCtlFinish()">Voir ma note →</button>
        </div>
    `);
}

function asmCtlGrade(i, v) {
    const S = asmSess;
    S.grades[i] = v;
    [0, 0.5, 1].forEach(x => { const b = $('ct-g-' + i + '-' + x); if (b) b.classList.toggle('on', x === v); });
    const done = S.qs.every((_, k) => S.grades[k] !== undefined);
    const note = S.qs.reduce((t, q, k) => t + (S.grades[k] !== undefined ? q.pts * S.grades[k] : 0), 0);
    const el = $('ct-note'); if (el) el.textContent = (done ? 'Note : ' : 'Note provisoire : ') + asmFmt(note) + ' / 20';
    const fb = $('ct-finish'); if (fb) fb.disabled = !done;
}

function asmCtlFinish() {
    const S = asmSess;
    S.res = S.qs.map((q, i) => {
        const g = S.grades[i];
        const item = q.type === 'cours' ? asmItem(q.card) : (() => { const pl = errPlain(q.exo.enonce); return { k: pl, q: pl, x: q.originalIndex }; })();
        logPerf(S.s, q.ch, q.type === 'cours' ? 'cours' : 'exo', g, q.type === 'exo' ? (q.exo.niveau || 'Moyen') : '', item, S.id);
        const review = g < 1 ? (q.type === 'cours' ? { ask: q.card.q, yours: S.answers[i] ? asmH(S.answers[i]) : '(rien rédigé)', good: q.card.a }
                                                    : { exo: true, ask: errPlain(q.exo.enonce), good: '' }) : null;
        return { q, score: g, pts: q.pts, parts: [{ ch: q.ch, score: g, w: q.pts }], review };
    });
    if (typeof logActivity === 'function') logActivity();
    S.dur = Math.round((S.tRendu - S.t0) / 1000);
    asmFinish();
}
