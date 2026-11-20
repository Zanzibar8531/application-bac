/* ============================================================
   BacMaster — app-core.js
   Base : migration des données, état global, helpers, frise chronologique
   (ancien script.js découpé : les fichiers se chargent dans cet ordre et partagent le même espace global)
   ============================================================ */
/* ============================================================
   BACMASTER v3 — script.js  (moteur de l'application)
   ============================================================ */

// ── MIGRATION & BASE DE DONNÉES ──────────────────────────────
let db = {};
const _n = localStorage.getItem('bacmaster_db');
const _o = localStorage.getItem('my_db');
if (_n) { db = JSON.parse(_n); }
else if (_o) { db = JSON.parse(_o); }

// Migration de l'ancien chapitre sur les designer babies :
// on conserve ses scores de flashcards éventuels, mais on le renomme
// afin que la nouvelle version PREBUILT puisse remplacer son contenu.
if (db['Anglais'] && db['Anglais']['Genetically Modified Babies — Designer Babies'] && !db['Anglais']['Genetic Modification — Arguments for and against']) {
    db['Anglais']['Genetic Modification — Arguments for and against'] = db['Anglais']['Genetically Modified Babies — Designer Babies'];
    delete db['Anglais']['Genetically Modified Babies — Designer Babies'];
}

// Renommages de chapitres (PREBUILT_RENAMES) : la progression de l'élève suit le nouveau nom.
PREBUILT_RENAMES.forEach(r => {
    const to = r.to || r.s;                                   // « to » : autre matière (déplacement)
    if (db[r.s] && db[r.s][r.old] && !(db[to] && db[to][r.new])) {
        if (!db[to]) db[to] = {};
        db[to][r.new] = db[r.s][r.old];
        delete db[r.s][r.old];
    } else if (db[r.s] && db[r.s][r.old] && (to !== r.s || r.new !== r.old)) {
        delete db[r.s][r.old];                                // déjà présent au nouvel endroit : on retire l'ancien doublon
    }
});

// Injecter les cours pré-chargés.
// RÈGLE : le cours vient TOUJOURS de PREBUILT (source de vérité).
// On préserve uniquement les flashcards de l'élève (scores SRS, ajouts perso).
// Ainsi, quand on améliore un cours ou qu'on ajoute des annotations colorées,
// l'élève voit automatiquement la nouvelle version au prochain chargement.
Object.entries(PREBUILT).forEach(([subj, chapters]) => {
    if (!db[subj]) db[subj] = {};
    Object.entries(chapters).forEach(([ch, data]) => {
        if (!db[subj][ch]) {
            // Chapitre nouveau : créer entièrement
            db[subj][ch] = {
                cours: data.cours,
                flashcards: data.flashcards.map(f => ({
                    q: f.q, a: f.a, score: 0, interval: 0, ease: 2.5, due: null
                })),
                exercices: data.exercices || []
            };
        } else {
            // Chapitre existant : on écrase le cours avec la version PREBUILT
            // SAUF si l'élève l'a modifié lui-même dans l'éditeur (userEdited) —
            // sinon ses annotations/corrections seraient effacées à chaque rechargement.
            if (!db[subj][ch].userEdited || !db[subj][ch].cours) {
                db[subj][ch].cours = data.cours;
            }

            // Corrections de cartes existantes (PREBUILT_FIXES) : on garde la progression de révision
            const existingCards = db[subj][ch].flashcards || [];
            PREBUILT_FIXES.filter(f => f.s === subj && f.ch === ch).forEach(f => {
                const norm = t => String(t).replace(/\\/g, '');
                const card = existingCards.find(c => norm(c.q) === norm(f.oldQ));
                if (!card) return;
                if (f.oldA !== undefined && norm(card.a) !== norm(f.oldA)) return;   // carte modifiée par l'élève : on n'y touche pas
                if (f.q !== undefined) card.q = f.q;
                if (f.a !== undefined) card.a = f.a;
            });

            // Pour les flashcards, on fusionne : on garde les scores SRS acquis,
            // mais on ajoute les nouvelles cartes ajoutées dans PREBUILT
            const existingQs = new Set(existingCards.map(c => c.q));
            data.flashcards.forEach(f => {
                if (!existingQs.has(f.q)) {
                    existingCards.push({ q: f.q, a: f.a, score: 0, interval: 0, ease: 2.5, due: null });
                }
            });
            // Réparation : une ancienne carte dont la réponse contient un caractère de contrôle
            // (formule LaTeX abîmée par un backslash mal échappé) reprend la version corrigée de PREBUILT.
            // Les scores de révision sont conservés.
            const fixedByQ = new Map(data.flashcards.map(f => [f.q, f]));
            existingCards.forEach(c => {
                const fixed = fixedByQ.get(c.q);
                if (fixed && c.a !== fixed.a && /[\u0008\u000b\u000c\t]/.test(c.a)) c.a = fixed.a;
            });
            db[subj][ch].flashcards = existingCards;

            // Les exercices ne sont pas édités par l'élève dans l'app :
            // on les synchronise toujours depuis PREBUILT (dernière version de Claude),
            // MAIS on conserve le résultat de l'élève (statut, dernière tentative) pour chaque énoncé inchangé.
            const exoKey = e => String(e.enonce || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            const oldExos = new Map((db[subj][ch].exercices || []).map(e => [exoKey(e), e]));
            db[subj][ch].exercices = (data.exercices || []).map(e => {
                const o = oldExos.get(exoKey(e));
                if (!o || (!o.status && !o.lastAttempt)) return e;
                const kept = Object.assign({}, e);
                if (o.status) kept.status = o.status;
                if (o.lastAttempt) kept.lastAttempt = o.lastAttempt;
                return kept;
            });
        }
    });
});
save();

function save() {
    localStorage.setItem('bacmaster_db', JSON.stringify(db));
    // Explicit hook: Supabase sync no longer relies on replacing a global function.
    // It is installed by supabase-app.js after the main application has loaded.
    try { if (window.BacMasterSync && typeof window.BacMasterSync.onLocalSave === 'function') window.BacMasterSync.onLocalSave(); } catch (e) { console.warn('[BacMaster] Synchronisation différée :', e); }
}

// ── ÉTAT GLOBAL ───────────────────────────────────────────────
let curSubject  = '';
let curChapter  = '';
let curTab      = 'cours';
let selChapters = [];

// SRS
let chapFrom = 'list';   // d'où on arrive dans un chapitre : 'list' (liste de chapitres) ou 'menu' (menu du chapitre)
let srsQueue = [], srsAgain = [], srsCur = null, srsFlipped = false, dailyReviewMode = false;
let sessDone = 0, sessTotal = 0, sessStats = {seen:0,right:0,wrong:0};
let qTimer = null, qSecs = 0;

const CFG = [
    {name:'Français',    icon:'📝', cls:'fr'},
    {name:'Maths',       icon:'📐', cls:'math'},
    {name:'Histoire-Géo',icon:'🗺️', cls:'hg'},
    {name:'Anglais',     icon:'🌍', cls:'ang'},
    {name:'Espagnol',    icon:'🇪🇸', cls:'esp'},
    {name:'Physique-Chimie', icon:'⚗️', cls:'phy'},
    {name:'Ingénierie & Dév. Durable', icon:'🛠️', cls:'idd'},
    {name:'Innovation Techno.', icon:'💡', cls:'it'},
    // ── Matières perso (hors programme officiel) ──
    {name:'Informatique', icon:'💻', cls:'info'},
    {name:'Cybersécurité', icon:'🔒', cls:'cyber'},
    {name:'Bourse & Investissement', icon:'📊', cls:'bourse'},
    {name:'Entrepreneuriat & Contenu', icon:'🚀', cls:'entr'},
    {name:"Science de l'Apprentissage", icon:'🧠', cls:'sci'},
    {name:'Bases Juridiques & Admin', icon:'⚖️', cls:'jur'},
];

// ── HELPERS ───────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const M  = () => $('main');
function esc(s) { return String(s).replace(/\\/g,'\\\\').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,"\\'"); }
function escT(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); } // texte / valeur de champ (sans antislash)
function isDue(c) { return !c.due || Date.now() >= c.due; }

// Un chapitre est « découvert » dès que son cours a été ouvert au moins une fois,
// ou qu'une de ses cartes a déjà été révisée, ou qu'il n'a pas de cours à lire (ex. vocabulaire).
// Les cartes d'un chapitre non découvert sont « à découvrir » : ce n'est PAS du retard.
function chapterDiscovered(ch) {
    if (!ch) return false;
    if (ch.lastRead) return true;
    if (!String(ch.cours || '').trim()) return true;
    return (ch.flashcards || []).some(c => c.due);
}
// Carte réellement « à revoir » : chapitre découvert ET échéance atteinte.
function isDueIn(ch, c) { return chapterDiscovered(ch) && isDue(c); }

// ── FRISE CHRONOLOGIQUE INTERACTIVE (Histoire-Géo) ──────────────
function showFriseDetail(btn) {
    document.querySelectorAll('.frise-pt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const box = document.getElementById('frise-detail');
    if(box) {
        box.innerHTML = `
            <div class="frise-detail-card">
                <div class="frise-detail-year">${btn.dataset.label}</div>
                <p class="frise-detail-text">${btn.dataset.summary}</p>
                <button class="frise-detail-btn" onclick="scrollToDate('${btn.dataset.target}')">Voir le cours complet →</button>
            </div>`;
    }
    btn.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
}
function scrollToDate(id) {
    const el = document.getElementById(id);
    if(el) {
        el.scrollIntoView({behavior:'smooth', block:'center'});
        el.classList.add('frise-highlight');
        setTimeout(()=>el.classList.remove('frise-highlight'), 2200);
    }
}
function scrollToFrise() {
    const el = document.getElementById('frise-top');
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

function subStats(name) {
    if (!db[name]) return {total:0,due:0,mastered:0,discovered:0};
    let t=0,d=0,m=0,disc=0;
    Object.values(db[name]).forEach(ch=>{
        const known = chapterDiscovered(ch);
        (ch.flashcards||[]).forEach(c=>{
            t++; if(known) disc++; if(known && isDue(c))d++; if((c.interval||0)>=7)m++;
        });
    });
    return {total:t,due:d,mastered:m,discovered:disc};
}
