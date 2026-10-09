/* ============================================================
   BACMASTER — vocal.js
   Vocal pour l'anglais et l'espagnol.

   🔊 Écouter    boutons dans les flashcards, le vocabulaire et les énoncés
                  d'exercices (synthèse vocale du navigateur)
   🎧 Écoute     compréhension orale : tu entends, tu comprends
                  - Comprendre : tu entends un mot/une expression, tu choisis le sens
                  - Dictée : tu entends une phrase, tu écris ce que tu entends
                  (3 écoutes maximum, comme au Bac)
   🗣️ Parle      expression orale : tu prononces, la reconnaissance vocale
                  vérifie que tu es compris (sinon : auto-évaluation)

   Les résultats alimentent les compétences « Compréhension orale »
   (y: 'ecoute') et « Expression orale » (y: 'parle') + le carnet d'erreurs.

   HONNÊTETÉ sur les limites
   • Les voix viennent de ton appareil/navigateur : sans voix anglaise ou
     espagnole installée, on ne peut pas lire correctement.
   • La reconnaissance vocale mesure si TU ES COMPRIS PAR LA MACHINE, pas la
     qualité de ton accent. Elle peut aussi « deviner » un mot proche. Elle
     envoie l'audio au service vocal du navigateur (Google sur Chrome).
   • Sur certains appareils (Firefox, certaines PWA iPhone) elle n'existe pas :
     on bascule alors sur une auto-évaluation.

   Ce fichier doit être chargé APRÈS parcours.js et AVANT script.js.
   ============================================================ */

const VC_KEY = 'bacmaster_vocal';
const VC_SUBJECTS = { 'Anglais': 'en', 'Espagnol': 'es' };
const VC_DEFAULTS = { rate: 0.9, en: 'en-GB', es: 'es-ES', auto: false };
const VC_MAX_PLAYS = 3;     // écoutes maximum par question (comme à l'examen)

const vcH = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function vcSettings() {
    try { return Object.assign({}, VC_DEFAULTS, JSON.parse(localStorage.getItem(VC_KEY) || '{}')); }
    catch (e) { return Object.assign({}, VC_DEFAULTS); }
}
function vcSave(patch) {
    try { localStorage.setItem(VC_KEY, JSON.stringify(Object.assign(vcSettings(), patch))); } catch (e) { /* ignore */ }
}
// Étiquette de langue (ex. 'es-ES') pour une matière, ou null si ce n'est pas une langue
function vcTagOf(subject) {
    const k = VC_SUBJECTS[subject];
    return k ? vcSettings()[k] : null;
}
const vcIsLang = subject => !!VC_SUBJECTS[subject];

// ── DÉTECTION DE LA LANGUE D'UN TEXTE ─────────────────────────
// Tes cartes mélangent les sens (mot étranger → français, ou français → mot étranger),
// donc on repère le côté écrit dans la langue étudiée pour ne lire que celui-là.
const VC_WORDS = {
    fr: 'le les des du une est sont pour dans avec qui pas sur aux ce cette ces et ou au par plus mais comme il elle ils nous vous on se ne sa ses leur leurs cela donc alors si quand',
    en: 'the of to and is are was were be been in on at for that it with as by or this these those have has had not you he she they we my his her their will would can could did does do which who what when if but more than after before about from an its',
    es: 'el los las una unos unas es son por para con del al y muy más pero como esta este estos estas hay tiene desde sobre entre sin también cuando donde porque ser estar qué su sus lo mi tu',
};
const VC_SETS = Object.fromEntries(Object.entries(VC_WORDS).map(([k, v]) => [k, new Set(v.split(' '))]));
const vcPlain = t => String(t || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

// Score de « langue cible » vs « français » pour un texte
function vcScore(text, lang) {
    const t = vcPlain(text).toLowerCase();
    const words = t.split(/[^a-zàâäéèêëîïôöùûüçñáíóúœ']+/).filter(Boolean);
    let tg = 0, fr = 0;
    words.forEach(w => { if (VC_SETS[lang].has(w)) tg++; if (VC_SETS.fr.has(w)) fr++; });
    fr += ((t.match(/[èêàùçôîâûëïœ]/g) || []).length) * 1.5 + ((t.match(/\b(l|d|qu|j|n|s|c|m|t)'/g) || []).length);
    if (lang === 'es') tg += ((t.match(/[ñ¿¡áíóú]/g) || []).length) * 1.5;
    return { tg, fr };
}
// Quel côté d'une carte ('q' ou 'a') est dans la langue étudiée ? null si doute.
function vcTargetSide(card, subject) {
    const lang = VC_SUBJECTS[subject];
    if (!lang) return null;
    const q = vcScore(card.q, lang), a = vcScore(card.a, lang);
    const ok = (s, text) => s.tg >= s.fr * 2 && vcPlain(text).length <= 160;
    const dq = q.tg - q.fr, da = a.tg - a.fr;
    if (dq > 0 && dq > da && ok(q, card.q)) return 'q';
    if (da > 0 && da > dq && ok(a, card.a)) return 'a';
    // Mot seul sans indice net : si l'autre côté est clairement français, celui-ci est la langue cible
    if (q.fr > q.tg && a.fr === 0 && a.tg === 0 && vcPlain(card.a).length <= 60) return 'a';
    if (a.fr > a.tg && q.fr === 0 && q.tg === 0 && vcPlain(card.q).length <= 60) return 'q';
    return null;
}
// Une « bonne » phrase à faire écouter : une seule phrase, complète, sans notation de grammaire
const vcGoodSentence = t => t.split(' ').length >= 4 && t.length <= 140
    && !/\.\.\.|…|\\|[=+/→:]|->|\.\s+\S/.test(t) && !/\b(Ex|Structure)\b/.test(t);

// Phrases d'exemple dans la langue cible (entre guillemets ou après « Ex : »).
// On écarte les phrases coupées ou incomplètes (« ... », apostrophes mal lues).
function vcSentences(text, subject) {
    const lang = VC_SUBJECTS[subject];
    const src = vcPlain(text), out = [];
    const pats = [
        /"([^"]{14,170})"/g,
        /“([^”]{14,170})”/g,
        /«\s*([^»]{14,170}?)\s*»/g,
        /(?:^|[\s(:;,—])'([^]{14,170}?)'(?![A-Za-zÀ-ÿ])/g,
        /Ex\s*:\s*['"“«]?([^'"”»]{14,170}?)(?:['"”»]|$| \/ | \(| —)/g,
    ];
    pats.forEach(re => {
        let m;
        while ((m = re.exec(src))) {
            const s = m[1].trim().replace(/^(?:->|→|=>)\s*/, '').replace(/[.\s]+$/, '');
            if (!vcGoodSentence(s)) continue;
            const sc = vcScore(s, lang);
            if (s.split(' ').length >= 4 && sc.tg >= sc.fr * 2 && sc.tg >= 1 && !out.includes(s)) out.push(s);
        }
    });
    return out;
}

// ── VOIX (SYNTHÈSE) ───────────────────────────────────────────
function vcVoices() { return ('speechSynthesis' in window) ? speechSynthesis.getVoices() : []; }
function vcPickVoice(tag) {
    const vs = vcVoices();
    if (!vs.length) return null;
    const want = tag.toLowerCase(), prim = want.split('-')[0];
    let best = null, bestScore = 0;
    vs.forEach(v => {
        const l = String(v.lang).replace('_', '-').toLowerCase();
        let sc = l === want ? 10 : (l.split('-')[0] === prim ? 4 : 0);
        if (!sc) return;
        if (/google|premium|enhanced|natural|neural/i.test(v.name)) sc += 3;
        if (v.localService) sc += 1;
        if (sc > bestScore) { best = v; bestScore = sc; }
    });
    return best;
}
if ('speechSynthesis' in window) { try { speechSynthesis.onvoiceschanged = () => { /* recharge la liste */ }; speechSynthesis.getVoices(); } catch (e) { /* ignore */ } }
function vcHasVoice(tag) { return !!vcPickVoice(tag); }

const vcClean = t => vcPlain(t).replace(/\$[^$]*\$/g, ' ').replace(/[→↔⇒]/g, ',').trim();

// Lit un texte. Renvoie { ok, reason }.
function vcSpeak(text, tag, rateOverride) {
    return new Promise(resolve => {
        if (!('speechSynthesis' in window)) return resolve({ ok: false, reason: 'unsupported' });
        const clean = vcClean(text);
        if (!clean) return resolve({ ok: false, reason: 'empty' });
        if (vcVoices().length && !vcPickVoice(tag)) return resolve({ ok: false, reason: 'novoice' });
        const voice = vcPickVoice(tag);
        speechSynthesis.cancel();
        const parts = clean.match(/[^.!?;:]+[.!?;:]*/g) || [clean];
        let i = 0;
        const next = () => {
            if (i >= parts.length) return resolve({ ok: true });
            const u = new SpeechSynthesisUtterance(parts[i++].trim());
            u.lang = tag; if (voice) u.voice = voice;
            u.rate = rateOverride || vcSettings().rate;
            u.onend = next;
            u.onerror = e => resolve({ ok: false, reason: (e && e.error) || 'error' });
            speechSynthesis.speak(u);
        };
        next();
    });
}
function vcNoVoiceMsg(tag) {
    const lang = tag.startsWith('es') ? 'espagnole' : 'anglaise';
    return `Aucune voix ${lang} sur cet appareil. Installe-en une dans les réglages de ton téléphone ou ordinateur (Synthèse vocale / Accessibilité), puis rouvre l'appli.`;
}
function vcReport(r, tag) {
    if (r.ok) return;
    if (r.reason === 'novoice') showToast(vcNoVoiceMsg(tag), 'warn');
    else if (r.reason === 'unsupported') showToast("La synthèse vocale n'est pas disponible sur ce navigateur.", 'warn');
    else if (r.reason !== 'interrupted' && r.reason !== 'canceled' && r.reason !== 'empty') showToast("Impossible de lire ce texte pour l'instant.", 'warn');
}

// ── BOUTONS 🔊 (flashcards, vocabulaire, exercices) ───────────
const vcReg = [];
function vcRegister(text, tag) { vcReg.push({ text, tag }); if (vcReg.length > 800) vcReg.splice(0, 200); return vcReg.length - 1; }
function vcBtn(text, tag, cls) {
    const id = vcRegister(text, tag);
    return `<button class="vc-btn ${cls || ''}" onclick="event.stopPropagation();vcSay(${id})" title="Écouter" aria-label="Écouter">🔊</button>`;
}
function vcSay(id) {
    const r = vcReg[id]; if (!r) return;
    vcSpeak(r.text, r.tag).then(x => vcReport(x, r.tag));
}
// Bouton sur un côté de carte ('q' ou 'a'), uniquement si ce côté est dans la langue étudiée
function vcSpeakBtn(card, side, subject) {
    if (!vcIsLang(subject)) return '';
    return vcTargetSide(card, subject) === side ? vcBtn(card[side], vcTagOf(subject)) : '';
}
function vcAutoPlay(card, subject, side) {
    if (!vcIsLang(subject) || !vcSettings().auto) return;
    if (vcTargetSide(card, subject) !== side) return;
    vcSpeak(card[side], vcTagOf(subject));
}
// Boutons pour les phrases citées dans l'énoncé d'un exercice de langue
function vcExoBtns(exo, subject) {
    if (!vcIsLang(subject)) return '';
    const lang = VC_SUBJECTS[subject], found = [];
    const html = String(exo.enonce || '');
    const re = /<em>([\s\S]*?)<\/em>|["“«]([^"”»]{8,200})["”»]/g;
    let m;
    while ((m = re.exec(html))) {
        const s = vcPlain(m[1] || m[2]);
        const sc = vcScore(s, lang);
        if (s.length >= 8 && sc.tg >= sc.fr * 2 && sc.tg >= 1 && !found.includes(s)) found.push(s);
    }
    return found.slice(0, 3).map(s => `<div class="vc-exo-line">${vcBtn(s, vcTagOf(subject))}<span>${vcH(s)}</span></div>`).join('');
}

// ── RECONNAISSANCE VOCALE ─────────────────────────────────────
function vcCanListen() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }
let vcRec = null;
function vcListen(tag) {
    return new Promise(resolve => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return resolve({ ok: false, reason: 'unsupported' });
        let done = false;
        const r = new SR(); vcRec = r;
        r.lang = tag; r.interimResults = false; r.maxAlternatives = 3; r.continuous = false;
        const fin = o => { if (!done) { done = true; clearTimeout(timer); vcRec = null; resolve(o); } };
        const timer = setTimeout(() => { try { r.stop(); } catch (e) { /* ignore */ } fin({ ok: false, reason: 'no-speech' }); }, 10000);
        r.onresult = e => fin({ ok: true, alts: Array.from(e.results[0]).map(a => a.transcript) });
        r.onerror = e => fin({ ok: false, reason: e.error || 'error' });
        r.onend = () => fin({ ok: false, reason: 'no-speech' });
        try { r.start(); } catch (e) { fin({ ok: false, reason: 'start' }); }
    });
}

// ── COMPARAISON (prononciation et dictée) ─────────────────────
function vcWords(t) {
    return vcPlain(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .replace(/[^a-z0-9ñ' ]+/g, ' ').split(/\s+/).filter(Boolean);
}
function vcWordEq(a, b) {
    if (a === b) return true;
    const L = Math.max(a.length, b.length);
    if (L < 5) return false;
    return levenshteinDistance(a, b) <= (L >= 9 ? 2 : 1);
}
// Alignement mot à mot (plus longue sous-suite commune, tolérant aux petites fautes)
function vcAlign(target, said) {
    const T = vcWords(target), S = vcWords(said);
    const n = T.length, m = S.length;
    if (!n) return { score: 0, flags: [] };
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
        dp[i][j] = vcWordEq(T[i - 1], S[j - 1]) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    const flags = new Array(n).fill(false);
    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (vcWordEq(T[i - 1], S[j - 1]) && dp[i][j] === dp[i - 1][j - 1] + 1) { flags[i - 1] = true; i--; j--; }
        else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--;
    }
    const matched = dp[n][m];
    return { score: matched / Math.max(n, m), flags, words: T };
}
const vcR = score => score >= 0.85 ? 1 : (score >= 0.5 ? 0.5 : 0);

// ── CONSTITUTION DES ÉLÉMENTS À TRAVAILLER ────────────────────
function vcChapters(subject) {
    return Object.keys(db[subject] || {}).map(ch => ({ ch, ...vcCount(subject, ch) })).filter(x => x.terms + x.sents > 0);
}
function vcCount(subject, ch) {
    const it = vcItems(subject, [ch]);
    return { terms: it.terms.length, sents: it.sents.length };
}
function vcItems(subject, chapters) {
    const terms = [], sents = [], seenT = new Set(), seenS = new Set();
    chapters.forEach(ch => (db[subject][ch].flashcards || []).forEach(card => {
        const side = vcTargetSide(card, subject);
        if (side) {
            const text = vcPlain(card[side]), other = vcPlain(card[side === 'q' ? 'a' : 'q']);
            // Un « mot » : court, sans notation de grammaire (vs, +, parenthèses) et avec un sens court en français
            const isTerm = text.split(' ').length <= 8 && !/[.!?]\s*\S/.test(text) && !/\bvs\b|\+|[()=]/.test(text)
                && other.length <= 70 && !/\bEx\s*:|=|\.\s+\S/.test(other);
            const clean = !/[→—]|->/.test(text);
            if (isTerm && clean && !/[.!?]$/.test(text) && !seenT.has(text.toLowerCase())) { seenT.add(text.toLowerCase()); terms.push({ kind: 'term', text, fr: other, card, ch }); }
            // Une phrase complète écrite telle quelle sur la carte : utile pour la dictée, pas comme « mot »
            else if (clean && /[.!?]$/.test(text) && vcGoodSentence(text.replace(/[.!?\s]+$/, '')) && !seenS.has(text.toLowerCase())) { seenS.add(text.toLowerCase()); sents.push({ kind: 'sent', text: text.replace(/[.\s]+$/, ''), fr: '', card, ch }); }
        }
        [card.q, card.a].forEach(t => vcSentences(t, subject).forEach(s => {
            if (!seenS.has(s.toLowerCase())) { seenS.add(s.toLowerCase()); sents.push({ kind: 'sent', text: s, fr: '', card, ch }); }
        }));
    }));
    return { terms, sents };
}
const vcShuffle = a => a.map(x => [Math.random(), x]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const vcItemKey = it => it.kind === 'term' ? { k: it.card.q + '|' + it.card.a, q: it.card.q, a: it.card.a } : { k: 'phrase|' + it.text, q: it.text, a: '' };

// ── PAGE D'ACCUEIL DU VOCAL ───────────────────────────────────
function vcTile(name) {
    if (!vcIsLang(name)) return '';
    return `<button class="menu-tile menu-tile-vocal" onclick="openVocal('${esc(name)}')">
        <span class="menu-tile-icon">🎧</span><span class="menu-tile-label">Vocal</span>
        <span class="menu-tile-sub">Écoute · Prononciation</span></button>`;
}
let vcSess = null;

function vcStatusHTML(subject) {
    const tag = vcTagOf(subject);
    const voice = vcPickVoice(tag);
    const ready = vcVoices().length > 0;
    return `<div class="ws-box vc-status">
        <div>${voice ? '✅' : (ready ? '⚠️' : '⏳')} <b>Voix :</b> ${voice ? vcH(voice.name) + ' (' + vcH(voice.lang) + ')' : (ready ? 'aucune voix ' + (tag.startsWith('es') ? 'espagnole' : 'anglaise') + ' trouvée' : 'chargement…')}</div>
        <div>${vcCanListen() ? '✅' : 'ℹ️'} <b>Reconnaissance vocale :</b> ${vcCanListen() ? 'disponible' : 'indisponible ici (auto-évaluation à la place)'}</div>
        ${voice || !ready ? '' : `<p class="sk-hint" style="margin-top:6px">${vcNoVoiceMsg(tag)}</p>`}
    </div>`;
}

function openVocal(subject) {
    clearInterval(qTimer); curTrackedPage = null;
    if (subject) curSubject = subject;
    const s = curSubject, tag = vcTagOf(s);
    if (!tag) { showToast('Le vocal est disponible pour l\'anglais et l\'espagnol.', 'warn'); return; }
    const chs = vcChapters(s);
    const tot = chs.reduce((t, x) => t + x.terms, 0), sen = chs.reduce((t, x) => t + x.sents, 0);
    const set = vcSettings(), k = VC_SUBJECTS[s];
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="goSubject('${esc(s)}')">← ${vcH(s)}</button></div>
        <div class="page-head"><h1>🎧 Vocal — ${vcH(s)}</h1>
            <p style="color:var(--muted);font-size:.85rem">Entraîne ton oreille et ta voix. ${tot} mot${tot > 1 ? 's' : ''} et ${sen} phrase${sen > 1 ? 's' : ''} exploitables dans tes cartes.</p></div>
        ${vcStatusHTML(s)}
        <div class="menu-grid vc-menu">
            <button class="menu-tile menu-tile-vocal" onclick="vcSetup('ecoute')"><span class="menu-tile-icon">🎧</span><span class="menu-tile-label">Écoute</span><span class="menu-tile-sub">Compréhension orale</span></button>
            <button class="menu-tile menu-tile-parle" onclick="vcSetup('parle')"><span class="menu-tile-icon">🗣️</span><span class="menu-tile-label">Parle</span><span class="menu-tile-sub">Prononciation</span></button>
        </div>
        <div class="ws-box">
            <h3 style="margin-bottom:10px">⚙️ Réglages</h3>
            <label class="vc-set">Vitesse de lecture
                <select class="field" onchange="vcSave({rate:parseFloat(this.value)})">
                    ${[[0.7, 'Lente'], [0.9, 'Normale'], [1.1, 'Rapide']].map(([v, l]) => `<option value="${v}" ${Math.abs(set.rate - v) < 0.01 ? 'selected' : ''}>${l}</option>`).join('')}
                </select></label>
            <label class="vc-set">Accent
                <select class="field" onchange="vcSave({${k}:this.value});openVocal('${esc(s)}')">
                    ${(k === 'en' ? [['en-GB', 'Britannique'], ['en-US', 'Américain']] : [['es-ES', "Espagne (castillan)"], ['es-MX', 'Mexique'], ['es-US', 'États-Unis']])
                        .map(([v, l]) => `<option value="${v}" ${set[k] === v ? 'selected' : ''}>${l}</option>`).join('')}
                </select></label>
            <label class="cb-item" style="margin-top:8px"><input type="checkbox" ${set.auto ? 'checked' : ''} onchange="vcSave({auto:this.checked})">
                <span style="flex:1">Lecture automatique dans les flashcards</span></label>
            <button class="bc-btn" style="margin-top:10px" onclick="vcSay(${vcRegister(k === 'en' ? 'Hello! This is how I sound. Good luck with your exam.' : '¡Hola! Así suena mi voz. Mucha suerte con tu examen.', tag)})">🔊 Tester la voix</button>
        </div>
    `);
}

// ── PRÉPARATION D'UNE ACTIVITÉ ────────────────────────────────
function vcSetup(kind) {
    const s = curSubject, chs = vcChapters(s);
    const isE = kind === 'ecoute';
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="openVocal('${esc(s)}')">← Vocal</button></div>
        <div class="ws-box"><div class="setup-wrap">
            <h3>${isE ? '🎧 Écoute — compréhension orale' : '🗣️ Parle — prononciation'}</h3>
            ${chs.length ? `
            <div class="info-box green">${isE
                ? `Tu as <b>${VC_MAX_PLAYS} écoutes</b> maximum par question, comme à l'examen.`
                : `Ta voix est analysée par le service vocal de ton navigateur. Le score mesure si tu es <b>compris</b>, pas la perfection de ton accent.`}</div>
            <p style="font-weight:700;margin-bottom:10px">Chapitres :</p>
            <div class="cb-list">${chs.map(x => `<label class="cb-item"><input type="checkbox" class="vc-cb" value="${vcH(x.ch)}" checked>
                <span style="flex:1">${vcH(x.ch)}</span><span class="cb-right">${x.terms} mots · ${x.sents} phrases</span></label>`).join('')}</div>
            <label style="font-weight:700;display:block;margin:14px 0 8px">Mode :</label>
            <select id="vc-mode" class="field" style="margin-bottom:12px">${isE
                ? '<option value="choix">Comprendre — j\'entends un mot, je choisis le sens</option><option value="dictee">Dictée — j\'écris ce que j\'entends (phrases)</option>'
                : '<option value="repeat">Je répète — je vois le texte</option><option value="produce">Je produis — je ne vois que le français</option>'}</select>
            <label style="font-weight:700;display:block;margin:6px 0 8px">Nombre d'éléments :</label>
            <select id="vc-n" class="field" style="margin-bottom:14px"><option value="5">5</option><option value="8" selected>8</option><option value="12">12</option></select>
            <button class="btn-main green" onclick="vcStart('${kind}')">🚀 Commencer</button>`
            : `<p style="color:var(--muted)">Je n'ai trouvé aucun mot ou phrase exploitable dans les cartes de cette matière.</p>`}
        </div></div>`);
}

function vcStart(kind) {
    const s = curSubject, tag = vcTagOf(s);
    const chapters = [...document.querySelectorAll('.vc-cb:checked')].map(c => c.value);
    if (!chapters.length) { showToast('Sélectionne au moins un chapitre !', 'warn'); return; }
    const mode = $('vc-mode').value, n = parseInt($('vc-n').value, 10) || 8;
    const { terms, sents } = vcItems(s, chapters);
    let pool;
    if (kind === 'ecoute') pool = mode === 'choix' ? terms : (sents.length ? sents : terms);
    else pool = mode === 'produce' ? terms : terms.concat(sents);
    if (kind === 'ecoute' && mode === 'choix' && terms.length < 4) { showToast("Pas assez de mots pour ce mode (il en faut au moins 4).", 'warn'); return; }
    if (!pool.length) { showToast('Rien à travailler dans ces chapitres pour ce mode.', 'warn'); return; }
    const items = vcShuffle(pool).slice(0, n);
    if (kind === 'ecoute' && mode === 'choix') {
        items.forEach(it => {
            const dist = vcShuffle(terms.filter(t => t !== it && asmSim(t.fr, it.fr) < 0.6 && t.fr)).slice(0, 3).map(t => t.fr);
            it.opts = vcShuffle([it.fr, ...dist]);
        });
    }
    vcSess = { kind, mode, subject: s, tag, items, i: 0, plays: 0, res: [], tried: false, dictNote: kind === 'ecoute' && mode === 'dictee' && !sents.length };
    vcRenderItem();
}

// ── DÉROULEMENT ───────────────────────────────────────────────
function vcStop() {
    customConfirm({ icon: '🎧', title: "Arrêter l'activité ?", message: 'Les réponses déjà données restent dans tes statistiques.',
        confirmLabel: 'Arrêter', cancelLabel: 'Continuer', danger: true,
        onConfirm: () => { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } vcSess = null; openVocal(curSubject); } });
}
const vcHead = V => `
    <div class="breadcrumb"><button class="bc-btn" onclick="vcStop()">✕ Arrêter</button></div>
    <div class="srs-prog-row"><span>Élément <b>${V.i + 1}</b> / ${V.items.length}</span><span class="asm-skill">${V.kind === 'ecoute' ? '🎧 Écoute' : '🗣️ Parle'}</span></div>
    <div class="prog-bar"><div class="prog-fill" style="width:${Math.round(V.i / V.items.length * 100)}%"></div></div>`;

function vcRenderItem() {
    const V = vcSess; if (!V) return;
    if (V.i >= V.items.length) return vcFinish();
    const it = V.items[V.i];
    V.plays = 0; V.tried = false; V.done = false; V.sel = null;
    curTrackedPage = { subject: V.subject, activity: V.kind === 'ecoute' ? '🎧 Écoute' : '🗣️ Prononciation' };
    let body = '';
    if (V.kind === 'ecoute') {
        const player = `<div class="vc-player">
            <button class="vc-play" id="vc-play" onclick="vcPlay(false)">▶️ Écouter <span id="vc-left">(${VC_MAX_PLAYS} restantes)</span></button>
            <button class="vc-slow" onclick="vcPlay(true)" title="Lecture lente">🐢 Lent</button></div>`;
        if (V.mode === 'choix') {
            body = `<div class="qcm-q-box"><div class="qcm-q-label">🎧 Écoute, puis choisis le sens</div>${player}</div>
                <div class="qcm-opts">${it.opts.map((o, i) => `<button class="qcm-opt" id="vopt${i}" onclick="vcPick(${i})"><span class="opt-letter opt-letter-${i}">${'ABCD'[i]}</span><span>${vcH(o)}</span></button>`).join('')}</div>
                <button class="asm-next" id="vc-next" disabled onclick="vcCheckChoice()">Valider →</button>`;
        } else {
            body = `<div class="qcm-q-box"><div class="qcm-q-label">🎧 Écris ce que tu entends</div>${player}
                <textarea class="exo-attempt-area" id="vc-dict" placeholder="Écris la phrase…" oninput="$('vc-next').disabled=!this.value.trim()"></textarea></div>
                <button class="asm-next" id="vc-next" disabled onclick="vcCheckDict()">Valider →</button>`;
        }
    } else {
        const prompt = V.mode === 'repeat'
            ? `<div class="vc-target">${vcH(it.text)}</div>${it.fr ? `<div class="vc-gloss">${vcH(it.fr)}</div>` : ''}`
            : `<div class="qcm-q-label">Dis en ${V.subject === 'Anglais' ? 'anglais' : 'espagnol'} :</div><div class="vc-target">${vcH(it.fr)}</div>`;
        body = `<div class="qcm-q-box">${prompt}
            <div class="vc-player">
                ${V.mode === 'repeat' ? `<button class="vc-slow" onclick="vcModel()">🔊 Modèle</button>` : ''}
                <button class="vc-play vc-mic" id="vc-mic" onclick="vcRecord()">${vcCanListen() ? '🎤 Parler' : '🎤 Je me suis exercé(e)'}</button>
            </div>
            <div id="vc-result"></div></div>
            <div id="vc-self" style="display:none"></div>`;
    }
    render(`<div class="ws-box"><div class="qcm-wrap">${vcHead(V)}${body}<div id="vc-fb"></div></div></div>`);
    if (V.kind === 'ecoute') setTimeout(() => vcPlay(false), 350);   // première écoute automatique
}

function vcPlay(slow) {
    const V = vcSess; if (!V) return;
    if (V.plays >= VC_MAX_PLAYS && !V.done) { showToast(`${VC_MAX_PLAYS} écoutes maximum, comme à l'examen.`, 'info'); return; }
    if (!V.done) V.plays++;
    const left = VC_MAX_PLAYS - V.plays, el = $('vc-left');
    if (el) el.textContent = V.done ? '' : `(${left} restante${left > 1 ? 's' : ''})`;
    vcSpeak(V.items[V.i].text, V.tag, slow ? 0.65 : null).then(r => vcReport(r, V.tag));
}
function vcModel() { const V = vcSess; vcSpeak(V.items[V.i].text, V.tag).then(r => vcReport(r, V.tag)); }

function vcLog(it, r, type) {
    const V = vcSess;
    logPerf(V.subject, it.ch, type, r, '', vcItemKey(it));
    if (typeof logActivity === 'function') logActivity();
}
function vcNextBtn() { return `<button class="asm-next" style="display:block" onclick="vcSess.i++;vcRenderItem()">${vcSess.i + 1 < vcSess.items.length ? 'Suivant →' : 'Voir le bilan →'}</button>`; }

// — Écoute : comprendre —
function vcPick(i) {
    const V = vcSess; V.sel = i;
    document.querySelectorAll('.qcm-opt').forEach((b, j) => b.classList.toggle('sel', j === i));
    $('vc-next').disabled = false;
}
function vcCheckChoice() {
    const V = vcSess, it = V.items[V.i];
    if (V.sel === null || V.done) return;
    V.done = true;
    const ok = it.opts[V.sel] === it.fr;
    document.querySelectorAll('.qcm-opt').forEach((b, j) => { b.disabled = true; if (it.opts[j] === it.fr) b.classList.add('correct'); else if (j === V.sel) b.classList.add('wrong'); });
    vcLog(it, ok ? 1 : 0, 'ecoute');
    V.res.push({ it, score: ok ? 1 : 0, note: ok ? '' : `Tu as répondu : ${it.opts[V.sel]}` });
    $('vc-next').style.display = 'none';
    $('vc-fb').innerHTML = `<div class="srs-fb ${ok ? 'fb-right' : 'fb-wrong'}"><span class="fb-icon">${ok ? '✅' : '📖'}</span>
        <div><b>${vcH(it.text)}</b> = ${vcH(it.fr)}</div></div>
        <div style="margin:10px 0">${vcBtn(it.text, V.tag)}</div>${vcNextBtn()}`;
}
// — Écoute : dictée —
function vcCheckDict() {
    const V = vcSess, it = V.items[V.i];
    if (V.done) return;
    const typed = $('vc-dict').value.trim(); if (!typed) return;
    V.done = true;
    const al = vcAlign(it.text, typed), r = vcR(al.score);
    $('vc-dict').disabled = true; $('vc-next').style.display = 'none';
    vcLog(it, r, 'ecoute');
    V.res.push({ it, score: al.score, note: `Tu as écrit : ${typed}` });
    $('vc-fb').innerHTML = `<div class="srs-fb ${r === 1 ? 'fb-right' : (r === 0.5 ? 'fb-partial' : 'fb-wrong')}"><span class="fb-icon">${r === 1 ? '✅' : (r === 0.5 ? '🤔' : '📖')}</span>
        <div><div><b>${Math.round(al.score * 100)} %</b> — correction (les accents et la ponctuation ne comptent pas) :</div>
        <div class="vc-diff">${al.words.map((w, i) => `<span class="${al.flags[i] ? 'vc-ok' : 'vc-miss'}">${vcH(w)}</span>`).join(' ')}</div>
        <div style="margin-top:6px">Phrase : <b>${vcH(it.text)}</b></div></div></div>
        <div style="margin:10px 0">${vcBtn(it.text, V.tag)}</div>${vcNextBtn()}`;
}

// — Parle —
async function vcRecord() {
    const V = vcSess, it = V.items[V.i];
    if (V.busy) return;
    if (!vcCanListen()) return vcSelfEval();
    V.busy = true;
    const mic = $('vc-mic'); mic.disabled = true; mic.textContent = '🎙️ Je t\'écoute…';
    const res = await vcListen(V.tag);
    V.busy = false;
    if (!vcSess || vcSess !== V) return;
    mic.disabled = false; mic.textContent = V.tried ? '🎤 Réessayer' : '🎤 Parler';
    if (!res.ok) {
        const msg = { 'not-allowed': 'Autorise le micro dans ton navigateur pour utiliser cette activité.', 'service-not-allowed': 'La reconnaissance vocale est bloquée sur cet appareil.',
            'network': 'La reconnaissance vocale a besoin d\'Internet.', 'no-speech': "Je n'ai rien entendu. Réessaie en parlant un peu plus fort." }[res.reason] || 'La reconnaissance a échoué. Réessaie.';
        $('vc-result').innerHTML = `<p class="sk-hint">${msg}</p>`;
        if (res.reason === 'service-not-allowed' || res.reason === 'unsupported') vcSelfEval();
        return;
    }
    const best = res.alts.map(a => ({ a, al: vcAlign(it.text, a) })).sort((x, y) => y.al.score - x.al.score)[0];
    const r = vcR(best.al.score);
    if (!V.tried) {                      // seule la première tentative compte dans les statistiques
        V.tried = true;
        vcLog(it, r, 'parle');
        V.res.push({ it, score: best.al.score, note: `J'ai compris : ${best.a}` });
    }
    $('vc-result').innerHTML = `<div class="srs-fb ${r === 1 ? 'fb-right' : (r === 0.5 ? 'fb-partial' : 'fb-wrong')}"><span class="fb-icon">${r === 1 ? '✅' : (r === 0.5 ? '🤔' : '🔁')}</span>
        <div><div>J'ai compris : <b>${vcH(best.a)}</b></div>
        <div class="vc-diff">${best.al.words.map((w, i) => `<span class="${best.al.flags[i] ? 'vc-ok' : 'vc-miss'}">${vcH(w)}</span>`).join(' ')}</div>
        <div style="margin-top:4px"><b>${Math.round(best.al.score * 100)} %</b> ${V.res[V.res.length - 1].it === it && V.tried ? '' : ''}</div></div></div>
        <div style="margin:8px 0">${vcBtn(it.text, V.tag)} <span class="sk-hint">Réécoute le modèle, puis réessaie si besoin.</span></div>${vcNextBtn()}`;
}
// Sans reconnaissance vocale : l'élève s'auto-évalue (c'est moins fiable, et ce sera dit)
function vcSelfEval() {
    const V = vcSess, it = V.items[V.i];
    $('vc-mic').style.display = 'none';
    $('vc-self').style.display = 'block';
    $('vc-self').innerHTML = `<p class="sk-hint">Reconnaissance vocale indisponible ici. Écoute le modèle, répète à voix haute, puis note-toi honnêtement.</p>
        <div style="margin:6px 0">${vcBtn(it.text, V.tag)}<span style="margin-left:8px;font-weight:700">${vcH(it.text)}</span></div>
        <div class="exo-rating-row">
            <button class="exo-rate-btn exo-rate-bad" onclick="vcSelfGrade(0)">🔴 Pas bon</button>
            <button class="exo-rate-btn exo-rate-mid" onclick="vcSelfGrade(0.5)">🟡 Moyen</button>
            <button class="exo-rate-btn exo-rate-good" onclick="vcSelfGrade(1)">🟢 Bon</button></div>`;
}
function vcSelfGrade(r) {
    const V = vcSess, it = V.items[V.i];
    vcLog(it, r, 'parle');
    V.res.push({ it, score: r, note: 'auto-évalué' });
    V.i++; vcRenderItem();
}

// ── BILAN ─────────────────────────────────────────────────────
function vcFinish() {
    const V = vcSess; curTrackedPage = null;
    const avg = V.res.length ? V.res.reduce((t, r) => t + r.score, 0) / V.res.length : 0;
    const lv = skLevel(avg), bad = V.res.filter(r => r.score < 0.85);
    render(`<div class="ws-box"><div class="session-end">
        <div class="se-emoji">${avg >= 0.85 ? '🏆' : avg >= 0.6 ? '👍' : '💪'}</div>
        <div class="se-title">${V.kind === 'ecoute' ? 'Écoute terminée' : 'Prononciation terminée'}</div>
        <div class="se-subject">${vcH(V.subject)}</div>
        <div class="se-pct" style="color:${lv.col}">${Math.round(avg * 100)}%</div>
        <div class="se-label">sur ${V.res.length} élément${V.res.length > 1 ? 's' : ''}${V.dictNote ? ' · pas de phrase trouvée : dictée de mots' : ''}</div>
        <div class="se-actions">
            <button class="btn-main green" onclick="vcSetup('${V.kind}')">🔄 Recommencer</button>
            <button class="btn-main" onclick="openSkills('${esc(V.subject)}')">🎯 Mes compétences</button>
            <button class="bc-btn se-home-btn" onclick="openVocal('${esc(V.subject)}')">← Retour au vocal</button></div></div></div>
        ${bad.length ? `<div class="ws-box"><h3 style="margin-bottom:10px">À retravailler (${bad.length})</h3>${bad.map(r => `<div class="er-item">
            <div class="er-top">${vcBtn(r.it.text, V.tag)}<strong>${vcH(r.it.text)}</strong></div>
            ${r.it.fr ? `<div class="er-meta">${vcH(r.it.fr)}</div>` : ''}<div class="er-state">${vcH(r.note)}</div></div>`).join('')}
            <p class="sk-hint" style="margin-top:8px">Ces éléments sont aussi dans ton carnet d'erreurs.</p></div>` : ''}`);
    vcSess = null;
}
