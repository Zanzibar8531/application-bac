/* ============================================================
   BACMASTER v3 — script.js  (moteur de l'application)
   ============================================================ */

// ── MIGRATION & BASE DE DONNÉES ──────────────────────────────
let db = {};
const _n = localStorage.getItem('bacmaster_db');
const _o = localStorage.getItem('my_db');
if (_n) { db = JSON.parse(_n); }
else if (_o) { db = JSON.parse(_o); }

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
                }))
            };
        } else {
            // Chapitre existant : toujours écraser le cours avec la version PREBUILT
            // (ça corrige les textes blancs et assure que les fiches annotées s'affichent)
            db[subj][ch].cours = data.cours;

            // Pour les flashcards, on fusionne : on garde les scores SRS acquis,
            // mais on ajoute les nouvelles cartes ajoutées dans PREBUILT
            const existingCards = db[subj][ch].flashcards || [];
            const existingQs = new Set(existingCards.map(c => c.q));
            data.flashcards.forEach(f => {
                if (!existingQs.has(f.q)) {
                    existingCards.push({ q: f.q, a: f.a, score: 0, interval: 0, ease: 2.5, due: null });
                }
            });
            db[subj][ch].flashcards = existingCards;
        }
    });
});
save();

function save() { localStorage.setItem('bacmaster_db', JSON.stringify(db)); }

// ── ÉTAT GLOBAL ───────────────────────────────────────────────
let curSubject  = '';
let curChapter  = '';
let curTab      = 'cours';
let selChapters = [];

// SRS
let srsQueue = [], srsAgain = [], srsCur = null, srsFlipped = false;
let sessDone = 0, sessTotal = 0, sessStats = {seen:0,right:0,wrong:0};
let qTimer = null, qSecs = 0;

// QCM
let qcmList = [], qcmIdx = 0, qcmScore = 0, qcmCur = null;

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
function esc(s) { return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
function isDue(c) { return !c.due || Date.now() >= c.due; }

function subStats(name) {
    if (!db[name]) return {total:0,due:0,mastered:0};
    let t=0,d=0,m=0;
    Object.values(db[name]).forEach(ch=>{
        (ch.flashcards||[]).forEach(c=>{
            t++; if(isDue(c))d++; if((c.interval||0)>=7)m++;
        });
    });
    return {total:t,due:d,mastered:m};
}

// ── ACTIVITÉ & SÉRIE DE JOURS (dashboard global) ────────────────
// Stocké séparément de `db` (pas une matière) pour ne jamais interférer
// avec le sync GitHub ni la recherche qui parcourent Object.keys(db).
function getActivityDates() {
    try { return JSON.parse(localStorage.getItem('bacmaster_activity') || '[]'); }
    catch(e) { return []; }
}
function logActivity() {
    const today = new Date().toISOString().slice(0,10);
    const dates = getActivityDates();
    if(!dates.includes(today)) {
        dates.push(today);
        if(dates.length > 400) dates.shift(); // garde un historique raisonnable
        localStorage.setItem('bacmaster_activity', JSON.stringify(dates));
    }
}
function computeStreak() {
    const dates = new Set(getActivityDates());
    let d = new Date();
    const todayKey = d.toISOString().slice(0,10);
    if(!dates.has(todayKey)) d.setDate(d.getDate()-1); // pas encore révisé aujourd'hui : ok si hier compte
    let streak = 0;
    while(dates.has(d.toISOString().slice(0,10))) {
        streak++;
        d.setDate(d.getDate()-1);
    }
    return streak;
}
function globalStats() {
    let total=0, mastered=0;
    CFG.forEach(s => { const st = subStats(s.name); total += st.total; mastered += st.mastered; });
    return { total, mastered, streak: computeStreak() };
}

// ── SIDEBAR ───────────────────────────────────────────────────
function toggleSidebar() {
    $('sidebar').classList.toggle('open');
    $('overlay').classList.toggle('show');
}
function closeSidebar() {
    $('sidebar').classList.remove('open');
    $('overlay').classList.remove('show');
}

// ── PAGES ─────────────────────────────────────────────────────
function render(html) {
    M().innerHTML = html;
    M().classList.add('animate');
    setTimeout(()=>{ M().classList.remove('animate'); typesetMath(M()); }, 50);
    window.scrollTo(0,0);
}

function goHome() {
    clearInterval(qTimer);
    const gs = globalStats();
    render(`
        <div class="page-head animate">
            <h1>Mes Matières</h1>
            <p>Sélectionne une matière pour commencer à réviser</p>
        </div>
        ${gs.total>0?`
        <div class="dash-banner">
            <div class="dash-stat">
                <div class="dash-stat-val">${gs.streak>0?'🔥':'💤'} ${gs.streak}</div>
                <div class="dash-stat-label">jour${gs.streak>1?'s':''} d'affilée</div>
            </div>
            <div class="dash-sep"></div>
            <div class="dash-stat">
                <div class="dash-stat-val">🎯 ${gs.mastered}</div>
                <div class="dash-stat-label">carte${gs.mastered>1?'s':''} maîtrisée${gs.mastered>1?'s':''} / ${gs.total}</div>
            </div>
        </div>`:''}
        <div class="subjects-grid">
            ${CFG.map(s=>{
                const st = subStats(s.name);
                const pct = st.total ? Math.round(st.mastered/st.total*100) : 0;
                const c = SUBJ_COLORS[s.cls];
                let badge = '';
                if(st.total===0) badge='<span class="badge badge-new">Vide</span>';
                else if(st.due>0) badge=`<span class="badge badge-due">📚 ${st.due} à réviser</span>`;
                else badge='<span class="badge badge-ok">✓ À jour</span>';
                return `
                <div class="scard scard-${s.cls}" onclick="goSubject('${s.name}')">
                    <div class="scard-icon">${s.icon}</div>
                    <h3>${s.name}</h3>
                    ${st.total>0?`
                    <div class="scard-bar"><div class="scard-bar-fill" style="width:${pct}%;background:${c}"></div></div>
                    <div style="font-size:.72rem;color:var(--muted)">${st.total} cartes · ${pct}% maîtrisées</div>`:''}
                    ${badge}
                </div>`;
            }).join('')}
        </div>
        <div class="sync-banner" onclick="openSync()">
            <span>☁️ Synchroniser mes données</span>
            <span class="sync-status" id="sync-status-home"></span>
        </div>
    `);
    updateSyncStatusBadge();
}

function goSubject(name) {
    clearInterval(qTimer);
    curSubject = name;
    if(!db[name]) db[name] = {};
    const cfg = CFG.find(c => c.name === name);
    const st  = subStats(name);
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">🏠 Accueil</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">${cfg.icon} ${name}</span>
        </div>
        <div class="page-head">
            <h1>${cfg.icon} ${name}</h1>
            <p>${st.total} cartes · ${st.due} à réviser</p>
        </div>
        <div class="menu-grid">
            <button class="menu-tile" onclick="goModeChapters('cours')">
                <span class="menu-tile-icon">📖</span>
                <span class="menu-tile-label">Cours</span>
                <span class="menu-tile-sub">Lire & éditer</span>
            </button>
            <button class="menu-tile" onclick="goModeChapters('voc')">
                <span class="menu-tile-icon">📚</span>
                <span class="menu-tile-label">Vocabulaire</span>
                <span class="menu-tile-sub">${st.total} mot(s)</span>
            </button>
            <button class="menu-tile" onclick="openQCM()">
                <span class="menu-tile-icon">🧠</span>
                <span class="menu-tile-label">QCM</span>
                <span class="menu-tile-sub">Questions auto-générées</span>
            </button>
            <button class="menu-tile" onclick="openSRS()">
                <span class="menu-tile-icon">🎴</span>
                <span class="menu-tile-label">Flashcards</span>
                <span class="menu-tile-sub">${st.due > 0 ? st.due + ' à réviser' : '✓ À jour'}</span>
            </button>
            <button class="menu-tile menu-tile-intensive" onclick="openIntensive()">
                <span class="menu-tile-icon">🔥</span>
                <span class="menu-tile-label">Révision Intensive</span>
                <span class="menu-tile-sub">Toutes les cartes · veille d'exam</span>
            </button>
            <button class="menu-tile menu-tile-exo" onclick="openExercices()">
                <span class="menu-tile-icon">✏️</span>
                <span class="menu-tile-label">Exercices</span>
                <span class="menu-tile-sub">Énoncés + corrections</span>
            </button>
        </div>
    `);
}

function goModeChapters(mode) {
    const cfg = CFG.find(c => c.name === curSubject);
    const chapters = Object.keys(db[curSubject]);
    const modeLabel = {cours:'📖 Cours', voc:'📚 Vocabulaire', edit:'✏️ Éditer', add:'➕ Ajouter'}[mode] || mode;
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">🏠</button>
            <span class="bc-sep">›</span>
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">${cfg.icon} ${curSubject}</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">${modeLabel}</span>
        </div>
        <div class="page-head"><h1 style="font-size:1.2rem">Choisis un chapitre</h1></div>
        <div class="chapters-grid">
            ${chapters.map(ch => {
                const cards = db[curSubject][ch].flashcards || [];
                const due   = cards.filter(isDue).length;
                return `<div class="chcard-wrap">
                    <div class="chcard" onclick="curChapter='${esc(ch)}';curTab='${mode}';renderChapter()">
                        <div class="chcard-name">${ch}</div>
                        <div class="chcard-meta">
                            <span>📋 ${cards.length} mots</span>
                            ${due > 0 ? `<span style="color:#4f46e5">⏰ ${due} à réviser</span>` : '<span style="color:#059669">✓ À jour</span>'}
                        </div>
                    </div>
                    <div class="chcard-crud">
                        <button class="chcard-del-btn" onclick="deleteChapter('${esc(ch)}')" title="Supprimer">🗑️</button>
                    </div>
                </div>`;
            }).join('')}
            <div class="chcard" onclick="addChapter()" style="border-style:dashed;opacity:.7;">
                <div class="chcard-name" style="color:var(--muted)">+ Nouveau chapitre</div>
            </div>
        </div>
    `);
}
function goChapter(ch) {
    curChapter = ch;
    curTab = 'cours';
    renderChapterMenu();
}

function renderChapterMenu() {
    const cfg = CFG.find(c => c.name === curSubject);
    const cards = (db[curSubject][curChapter].flashcards || []);
    const due   = cards.filter(isDue).length;
    const menuItems = [
        { id:'cours',   icon:'📖', label:'Cours',      sub:'Lire le cours' },
        { id:'voc',     icon:'📚', label:'Vocabulaire', sub:`${cards.length} mot(s)` },
        { id:'qcm',     icon:'🧠', label:'QCM',         sub:'Questions auto-générées' },
        { id:'flash',   icon:'🎴', label:'Flashcards',  sub:`${due} à réviser` },
    ];
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">🏠</button>
            <span class="bc-sep">›</span>
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">${cfg.icon} ${curSubject}</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">${curChapter}</span>
        </div>
        <div class="page-head">
            <h1 style="font-size:1.25rem">${curChapter}</h1>
        </div>
        <div class="menu-grid">
            ${menuItems.map(m => `
            <button class="menu-tile" onclick="handleMenuTile('${m.id}')">
                <span class="menu-tile-icon">${m.icon}</span>
                <span class="menu-tile-label">${m.label}</span>
                <span class="menu-tile-sub">${m.sub}</span>
            </button>`).join('')}
        </div>
        <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
            <button class="bc-btn" onclick="curTab='edit';renderChapter()">✏️ Éditer le cours</button>
            <button class="bc-btn" onclick="curTab='add';renderChapter()">➕ Ajouter un mot</button>
        </div>
    `);
}

function handleMenuTile(id) {
    if (id === 'qcm')   { openQCM(); return; }
    if (id === 'flash') { openSRS(); return; }
    curTab = id === 'cours' ? 'cours' : 'voc';
    renderChapter();
}

function renderChapter() {
    const data = db[curSubject][curChapter];
    const tabs = [
        {id:'cours',  label:'📖 Cours'},
        {id:'edit',   label:'✏️ Éditer'},
        {id:'voc',    label:'📚 Vocabulaire'},
        {id:'add',    label:'➕ Ajouter'},
    ];
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">🏠</button>
            <span class="bc-sep">›</span>
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">${curSubject}</button>
            <span class="bc-sep">›</span>
            <button class="bc-btn" onclick="goModeChapters(curTab==='voc'||curTab==='add'?'voc':'cours')">← Chapitres</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">${curChapter}</span>
        </div>
        <div class="ws-header">
            <div class="tab-bar">
                ${tabs.map(t=>`<button class="tab-btn ${curTab===t.id?'active':''}" onclick="switchTab('${t.id}')">${t.label}</button>`).join('')}
            </div>
        </div>
        <div class="ws-box" id="ws-box"></div>
    `);
    renderTabContent();
}

function switchTab(t) { curTab=t; renderChapter(); }

function renderTabContent() {
    const box = $('ws-box');
    if(!box) return;
    const data = db[curSubject][curChapter];
    if(curTab==='cours') {
        box.innerHTML = `
            <div class="cours-print-bar">
                <button class="bc-btn print-btn" onclick="window.print()">🖨️ Imprimer le cours</button>
            </div>
            <div class="cours-body" id="printable-cours">${data.cours||'<p style="color:var(--muted)">Aucun cours. Clique sur ✏️ Éditer pour en ajouter un.</p>'}</div>`;
        typesetMath(box);
        setupFigTooltips(box);
    }
    else if(curTab==='edit') {
        box.innerHTML = `
            <div class="editor-toolbar">
                <span class="etb-label">Texte</span>
                <button onclick="fmt('bold')" title="Gras"><b>G</b></button>
                <button onclick="fmt('italic')" title="Italique"><i>I</i></button>
                <button onclick="fmt('underline')" title="Souligné"><u>S</u></button>
                <select onchange="fmt('fontSize',this.value);this.value='3'">
                    <option value="3">Normal</option>
                    <option value="5">Grand</option>
                    <option value="7">Très grand</option>
                </select>
                <select onchange="fmt('foreColor',this.value);this.selectedIndex=0">
                    <option value="">Couleur</option>
                    <option value="#0e1525">Noir</option>
                    <option value="#1d4ed8">Bleu</option>
                    <option value="#dc2626">Rouge</option>
                    <option value="#059669">Vert</option>
                </select>
                <div class="hl-row">
                    <input type="color" id="hlc" value="#fef08a">
                    <button class="hl-hl" onclick="applyHL()">🖍️ HL</button>
                </div>
            </div>
            <div class="editor-toolbar">
                <span class="etb-label">Maths</span>
                <button onclick="insertSymbol('√')" title="Racine carrée">√</button>
                <button onclick="insertSymbol('×')" title="Multiplier">×</button>
                <button onclick="insertSymbol('÷')" title="Diviser">÷</button>
                <button onclick="insertSymbol('±')" title="Plus ou moins">±</button>
                <button onclick="insertSymbol('π')" title="Pi">π</button>
                <button onclick="insertSymbol('Δ')" title="Delta">Δ</button>
                <button onclick="insertSymbol('°')" title="Degré">°</button>
                <button onclick="insertSymbol('≤')" title="Inférieur ou égal">≤</button>
                <button onclick="insertSymbol('≥')" title="Supérieur ou égal">≥</button>
                <button onclick="insertSymbol('≠')" title="Différent">≠</button>
                <button onclick="insertSymbol('∞')" title="Infini">∞</button>
            </div>
            <div class="editor-toolbar">
                <span class="etb-label">Puissances</span>
                <button onclick="insertPow(2)" title="Insérer un carré ex.">x²</button>
                <button onclick="insertPow(3)" title="Insérer un cube ex.">x³</button>
                <button onclick="fmt('superscript')" title="Activer/désactiver l'exposant — tape ensuite ton chiffre">xⁿ</button>
                <button onclick="fmt('subscript')" title="Activer/désactiver l'indice — tape ensuite ton chiffre">xₙ</button>
                <button onclick="insertTenPow()" title="×10 avec exposant à compléter">×10ⁿ</button>
                <button onclick="insertFraction()" title="Insérer une fraction a/b">a/b</button>
            </div>
            <div class="editor-toolbar">
                <span class="etb-label">Insérer</span>
                <button onclick="insertTable()" title="Insérer un tableau">▦ Tableau</button>
                <button onclick="openGraphTool()" title="Tracer et insérer un graphique de fonction">📈 Graphique</button>
            </div>
            <div id="editor" contenteditable="true" class="editor-area">${data.cours||''}</div>
            <button class="btn-save" id="sbtn" onclick="saveCours()">💾 Enregistrer</button>
        `;
        setTimeout(trackEditorSelection, 50);
    }
    else if(curTab==='voc') {
        const cards = data.flashcards||[];
        box.innerHTML = cards.length===0
            ? '<p style="color:var(--muted);text-align:center;padding:20px;">Aucun mot. Clique sur ➕ Ajouter pour commencer.</p>'
            : `<p class="voc-count">${cards.length} mot(s)</p>
               <div>${cards.map((c,i)=>`
                <div class="voc-row">
                    <span class="voc-q">${c.q}</span>
                    <span class="voc-a">${c.a}</span>
                    <button class="voc-del-sq" onclick="delVoc(${i})" title="Supprimer">🗑</button>
                </div>`).join('')}</div>`;
    }
    else if(curTab==='add') {
        box.innerHTML = `
            <p style="font-weight:700;margin-bottom:12px;">Nouveau mot / flashcard :</p>
            <input type="text" id="vq" class="field" placeholder="Mot ou question">
            <input type="text" id="va" class="field" placeholder="Définition ou réponse" onkeydown="if(event.key==='Enter')addVoc()">
            <button class="btn-save" onclick="addVoc()">➕ Ajouter</button>
            <div id="vfb"></div>
        `;
        setTimeout(()=>$('vq')&&$('vq').focus(),80);
    }
}

// ── ACTIONS ───────────────────────────────────────────────────
function addChapter() {
    let n='Nouveau chapitre', i=1;
    while(db[curSubject][n]){i++;n='Nouveau chapitre '+i;}
    db[curSubject][n]={cours:'',flashcards:[]};
    save(); goChapter(n);
}

function renameChapter(oldName) {
    customPrompt({
        icon:'✏️', title:'Renommer le chapitre', value:oldName,
        placeholder:'Nom du chapitre', confirmLabel:'Renommer',
        onConfirm:(newName)=>{
            if(!newName || newName.trim()==='' || newName===oldName) return;
            const trimmed = newName.trim();
            if(db[curSubject][trimmed]){ showToast('Ce nom existe déjà !','warn'); return; }
            db[curSubject][trimmed] = db[curSubject][oldName];
            delete db[curSubject][oldName];
            if(curChapter===oldName) curChapter=trimmed;
            save(); goSubject(curSubject);
        }
    });
}

function deleteChapter(ch) {
    const n = (db[curSubject][ch].flashcards||[]).length;
    customConfirm({
        icon:'🗑️', title:'Supprimer ce chapitre ?',
        message:`"${esc(ch)}" et ses ${n} mot(s) seront supprimés définitivement. Cette action est irréversible.`,
        confirmLabel:'Supprimer', cancelLabel:'Annuler', danger:true,
        onConfirm:()=>{ delete db[curSubject][ch]; save(); goSubject(curSubject); }
    });
}

function fmt(cmd,val=null){ restoreEditorSelection(); document.execCommand(cmd,false,val); }
function applyHL(){ restoreEditorSelection(); document.execCommand('hiliteColor',false,$('hlc').value); }

// ── CONFIRMATION STYLÉE (remplace le confirm() natif moche du navigateur) ──
function customConfirm(opts) {
    const existing = $('cc-overlay'); if(existing) existing.remove();
    const ov = document.createElement('div');
    ov.id = 'cc-overlay';
    ov.className = 'cc-overlay';
    ov.onclick = (e) => { if(e.target === ov) closeCustomConfirm(); };
    ov.innerHTML = `
        <div class="cc-box">
            <div class="cc-icon">${opts.icon || '⚠️'}</div>
            <h3>${opts.title || 'Confirmer'}</h3>
            <p>${opts.message || ''}</p>
            <div class="cc-actions">
                <button class="cc-btn cc-btn-cancel" onclick="closeCustomConfirm()">${opts.cancelLabel || 'Annuler'}</button>
                <button class="cc-btn cc-btn-confirm${opts.danger ? ' cc-btn-danger' : ''}" id="cc-confirm-btn">${opts.confirmLabel || 'Confirmer'}</button>
            </div>
        </div>`;
    document.body.appendChild(ov);
    $('cc-confirm-btn').onclick = () => { closeCustomConfirm(); opts.onConfirm && opts.onConfirm(); };
}
function closeCustomConfirm() { const ov = $('cc-overlay'); if(ov) ov.remove(); }

// ── SAISIE STYLÉE (remplace le prompt() natif moche du navigateur) ──
function customPrompt(opts) {
    const existing = $('cp-overlay'); if(existing) existing.remove();
    const ov = document.createElement('div');
    ov.id = 'cp-overlay';
    ov.className = 'cc-overlay';
    ov.onclick = (e) => { if(e.target === ov) closeCustomPrompt(); };
    ov.innerHTML = `
        <div class="cc-box">
            <div class="cc-icon">${opts.icon || '✏️'}</div>
            <h3>${opts.title || 'Renommer'}</h3>
            <input type="text" id="cp-input" class="field" value="${esc(opts.value || '')}" placeholder="${esc(opts.placeholder || '')}">
            <div class="cc-actions" style="margin-top:16px">
                <button class="cc-btn cc-btn-cancel" onclick="closeCustomPrompt()">Annuler</button>
                <button class="cc-btn cc-btn-confirm" id="cp-confirm-btn">${opts.confirmLabel || 'Valider'}</button>
            </div>
        </div>`;
    document.body.appendChild(ov);
    const inp = $('cp-input');
    setTimeout(()=>{ inp.focus(); inp.select(); }, 50);
    inp.addEventListener('keydown', e => { if(e.key==='Enter'){ e.preventDefault(); $('cp-confirm-btn').click(); } });
    $('cp-confirm-btn').onclick = () => {
        const val = inp.value;
        closeCustomPrompt();
        opts.onConfirm && opts.onConfirm(val);
    };
}
function closeCustomPrompt() { const ov = $('cp-overlay'); if(ov) ov.remove(); }

// ── SUIVI DE LA POSITION DU CURSEUR (fix mobile : le clic sur un bouton
// de la barre d'outils fait perdre la sélection dans le contenteditable,
// ce qui faisait atterrir les insertions à la fin au lieu du curseur) ──
let savedEditorRange = null;
function trackEditorSelection(){
    const ed = $('editor'); if(!ed) return;
    const save = () => {
        const sel = window.getSelection();
        if(sel && sel.rangeCount>0 && ed.contains(sel.anchorNode)){
            savedEditorRange = sel.getRangeAt(0).cloneRange();
        }
    };
    ed.addEventListener('keyup', save);
    ed.addEventListener('mouseup', save);
    ed.addEventListener('touchend', save);
    ed.addEventListener('input', save);
    save();
}
function restoreEditorSelection(){
    const ed = $('editor'); if(!ed) return;
    ed.focus();
    if(savedEditorRange){
        try{
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(savedEditorRange);
        }catch(e){ /* le contenu a changé entre-temps, on insère à la position par défaut */ }
    }
}

// ── OUTILS MATHS DE L'ÉDITEUR ───────────────────────────────────
function insertSymbol(sym) {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertText', false, sym);
}

function insertPow(n) {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertHTML', false, '<sup>'+n+'</sup>&nbsp;');
}

function insertTenPow() {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertHTML', false, '×10<sup>n</sup>&nbsp;');
}

function insertFraction() {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertHTML', false,
        '<span class="frac"><span class="frac-num">a</span><span class="frac-den">b</span></span>&nbsp;');
}

function insertTable() {
    const ed = $('editor'); if(!ed) return;
    let rows = parseInt(prompt('Nombre de lignes ?', '3'), 10);
    let cols = parseInt(prompt('Nombre de colonnes ?', '3'), 10);
    if(!rows || rows<1) rows=3; if(!cols || cols<1) cols=3;
    if(rows>20) rows=20; if(cols>10) cols=10;
    let html = '<table class="user-table"><tbody>';
    for(let r=0;r<rows;r++){
        html += '<tr>';
        for(let c=0;c<cols;c++) html += '<td>&nbsp;</td>';
        html += '</tr>';
    }
    html += '</tbody></table><p><br></p>';
    restoreEditorSelection();
    document.execCommand('insertHTML', false, html);
}

// ── TRACEUR DE GRAPHIQUES ───────────────────────────────────────
function openGraphTool() {
    const overlay = document.createElement('div');
    overlay.id = 'graph-modal-ov';
    overlay.className = 'gm-overlay';
    overlay.onclick = (e) => { if(e.target === overlay) closeGraphTool(); };
    overlay.innerHTML = `
        <div class="gm-box">
            <button class="gm-close" onclick="closeGraphTool()">✕</button>
            <h3>📈 Tracer un graphique</h3>
            <label class="gm-label">f(x) =</label>
            <input type="text" id="gm-fx" class="field" placeholder="ex : x^2 - 3*x + 2" value="x^2">
            <div style="display:flex;gap:8px;">
                <input type="number" id="gm-xmin" class="field" placeholder="x min" value="-10">
                <input type="number" id="gm-xmax" class="field" placeholder="x max" value="10">
            </div>
            <p class="gm-hint">Symboles utilisables : + − * / ^ (puissance), sqrt(), sin(), cos(), tan(), abs(), ln(), exp(), pi</p>
            <canvas id="gm-canvas" width="480" height="300" class="gm-canvas"></canvas>
            <div id="gm-err" class="gm-err"></div>
            <div style="display:flex;gap:8px;margin-top:8px;">
                <button class="btn-save" style="background:var(--accent)" onclick="drawGraphPreview()">🔄 Aperçu</button>
                <button class="btn-save" onclick="insertGraph()">➕ Insérer dans le cours</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    ['gm-fx','gm-xmin','gm-xmax'].forEach(id=>{
        $(id).addEventListener('keydown', e=>{ if(e.key==='Enter') drawGraphPreview(); });
    });
    drawGraphPreview();
}

function closeGraphTool() {
    const ov = $('graph-modal-ov');
    if(ov) ov.remove();
}

function safeMathEval(expr, x) {
    const clean = expr.trim();
    if(!/^[0-9x\.\+\-\*\/\^\(\)\s a-zA-Z,]*$/.test(clean)) throw new Error('invalid characters');
    let js = clean
        .replace(/\bsqrt\(/g,'Math.sqrt(')
        .replace(/\bsin\(/g,'Math.sin(')
        .replace(/\bcos\(/g,'Math.cos(')
        .replace(/\btan\(/g,'Math.tan(')
        .replace(/\babs\(/g,'Math.abs(')
        .replace(/\bln\(/g,'Math.log(')
        .replace(/\bexp\(/g,'Math.exp(')
        .replace(/\bpi\b/g,'Math.PI')
        .replace(/\^/g,'**');
    const fn = new Function('x', 'return (' + js + ');');
    const y = fn(x);
    return typeof y === 'number' ? y : NaN;
}

function niceGridStep(range) {
    const raw = range/8;
    const mag = Math.pow(10, Math.floor(Math.log10(raw||1)));
    const norm = raw/mag;
    let step = norm<1.5 ? 1 : norm<3 ? 2 : norm<7 ? 5 : 10;
    return step*mag;
}

function drawGraphPreview() {
    const errEl = $('gm-err'); if(errEl) errEl.textContent='';
    const canvas = $('gm-canvas'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);

    const expr = ($('gm-fx').value || 'x').trim();
    let xmin = parseFloat($('gm-xmin').value); if(isNaN(xmin)) xmin=-10;
    let xmax = parseFloat($('gm-xmax').value); if(isNaN(xmax)) xmax=10;
    if(xmax <= xmin) { errEl.textContent = 'x max doit être supérieur à x min'; return; }

    const N = 400, pts = [];
    let ymin=Infinity, ymax=-Infinity;
    for(let i=0;i<=N;i++){
        const x = xmin + (xmax-xmin)*i/N;
        let y;
        try { y = safeMathEval(expr, x); } catch(e) { errEl.textContent='Expression invalide'; return; }
        if(!isFinite(y)) y = null;
        pts.push({x,y});
        if(y!==null){ if(y<ymin) ymin=y; if(y>ymax) ymax=y; }
    }
    if(!isFinite(ymin) || !isFinite(ymax)) { errEl.textContent='Impossible de tracer cette fonction sur cet intervalle'; return; }
    if(ymin===ymax){ ymin-=1; ymax+=1; }
    const pad = (ymax-ymin)*0.12; ymin-=pad; ymax+=pad;

    const mLeft=40, mRight=12, mTop=12, mBottom=26;
    const plotW=w-mLeft-mRight, plotH=h-mTop-mBottom;
    const toPx=(x,y)=>[mLeft+(x-xmin)/(xmax-xmin)*plotW, mTop+(1-(y-ymin)/(ymax-ymin))*plotH];

    ctx.strokeStyle='#e4e8f0'; ctx.lineWidth=1;
    ctx.font='10px DM Sans, sans-serif'; ctx.fillStyle='#64748b';
    const xStep=niceGridStep(xmax-xmin), yStep=niceGridStep(ymax-ymin);
    for(let gx=Math.ceil(xmin/xStep)*xStep; gx<=xmax; gx+=xStep){
        const [px]=toPx(gx,0);
        ctx.beginPath(); ctx.moveTo(px,mTop); ctx.lineTo(px,h-mBottom); ctx.stroke();
        ctx.fillText(Number(gx.toFixed(2)), px-8, h-mBottom+14);
    }
    for(let gy=Math.ceil(ymin/yStep)*yStep; gy<=ymax; gy+=yStep){
        const [,py]=toPx(0,gy);
        ctx.beginPath(); ctx.moveTo(mLeft,py); ctx.lineTo(w-mRight,py); ctx.stroke();
        ctx.fillText(Number(gy.toFixed(2)), 4, py+3);
    }

    ctx.strokeStyle='#0e1525'; ctx.lineWidth=1.5;
    if(0>=xmin && 0<=xmax){ const [px]=toPx(0,0); ctx.beginPath(); ctx.moveTo(px,mTop); ctx.lineTo(px,h-mBottom); ctx.stroke(); }
    if(0>=ymin && 0<=ymax){ const [,py]=toPx(0,0); ctx.beginPath(); ctx.moveTo(mLeft,py); ctx.lineTo(w-mRight,py); ctx.stroke(); }

    ctx.strokeStyle='#4f46e5'; ctx.lineWidth=2.5; ctx.beginPath();
    let started=false;
    pts.forEach(p=>{
        if(p.y===null){ started=false; return; }
        const [px,py]=toPx(p.x,p.y);
        if(py < mTop-40 || py > h-mBottom+40){ started=false; return; }
        if(!started){ ctx.moveTo(px,py); started=true; } else ctx.lineTo(px,py);
    });
    ctx.stroke();
}

function insertGraph() {
    const canvas = $('gm-canvas'); if(!canvas) return;
    if($('gm-err').textContent) { showToast('Corrige l\'erreur avant d\'insérer', 'warn'); return; }
    const dataUrl = canvas.toDataURL('image/png');
    const fx = ($('gm-fx').value || '').trim();
    const html = `<div class="user-graph"><img src="${dataUrl}" alt="graphique"><p class="user-graph-caption">f(x) = ${esc(fx)}</p></div><p><br></p>`;
    closeGraphTool();
    restoreEditorSelection();
    document.execCommand('insertHTML', false, html);
    showToast('Graphique inséré ✅');
}

function saveCours(){
    const ed=$('editor'); if(!ed)return;
    db[curSubject][curChapter].cours=ed.innerHTML; save();
    const b=$('sbtn'); b.textContent='✅ Enregistré !'; b.classList.add('saved');
    setTimeout(()=>{if(b){b.textContent='💾 Enregistrer';b.classList.remove('saved');}},2000);
}

function delVoc(i){
    customConfirm({
        icon:'🗑️', title:'Supprimer ce mot ?', message:'Cette action est irréversible.',
        confirmLabel:'Supprimer', cancelLabel:'Annuler', danger:true,
        onConfirm:()=>{ db[curSubject][curChapter].flashcards.splice(i,1); save(); renderTabContent(); }
    });
}

function addVoc(){
    const q=($('vq')||{value:''}).value.trim();
    const a=($('va')||{value:''}).value.trim();
    if(!q||!a)return;
    db[curSubject][curChapter].flashcards.push({q,a,score:0,interval:0,ease:2.5,due:null});
    save();
    $('vq').value=''; $('va').value=''; $('vq').focus();
    const fb=$('vfb');
    if(fb){fb.innerHTML=`<p style="color:#059669;font-weight:700;padding:8px 0">✅ "${q}" ajouté !</p>`;}
    setTimeout(()=>{if($('vfb'))$('vfb').innerHTML='';},2000);
}

// ── RÉVISION INTENSIVE ──────────────────────────────────────
let intensiveMode = false;
let intensiveShuffle = true;

function openIntensive() {
    clearInterval(qTimer);
    const chapters = Object.keys(db[curSubject]);
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">← ${curSubject}</button>
        </div>
        <div class="ws-box">
        <div class="setup-wrap">
            <h3>🔥 Révision Intensive</h3>
            <div class="info-box orange"><b>Mode intensif :</b> Toutes les cartes en boucle, sans filtrage par date. Parfait la veille d'un exam. Les scores SRS ne sont pas modifiés.</div>
            <p style="font-weight:700;margin-bottom:10px;">Chapitres à inclure :</p>
            <div class="cb-list">
                ${chapters.map(ch => {
                    const tot = (db[curSubject][ch].flashcards || []).length;
                    return `<label class="cb-item">
                        <input type="checkbox" class="int-cb" value="${ch}" ${tot > 0 ? 'checked' : ''}>
                        <span style="flex:1">${ch}</span>
                        <span class="cb-right">${tot} cartes</span>
                    </label>`;
                }).join('')}
            </div>
            <div class="btn-row">
                <button class="bc-btn" onclick="document.querySelectorAll('.int-cb').forEach(c=>c.checked=true)">Tout cocher</button>
                <button class="bc-btn" onclick="document.querySelectorAll('.int-cb').forEach(c=>c.checked=false)">Tout décocher</button>
            </div>
            <label class="cb-item" style="margin-bottom:14px;padding:12px;border-radius:10px;border:1.5px solid var(--border);">
                <input type="checkbox" id="int-shuffle" checked>
                <span style="flex:1;font-weight:600">🔀 Mélanger les cartes</span>
            </label>
            <button class="btn-main" style="background:linear-gradient(135deg,#ea580c,#f97316);box-shadow:0 4px 14px rgba(234,88,12,.3)" onclick="startIntensive()">🔥 Lancer la session</button>
        </div>
        </div>
    `);
}

function startIntensive() {
    const cbs = [...document.querySelectorAll('.int-cb:checked')];
    if (!cbs.length) { showToast('Sélectionne au moins un chapitre !', 'warn'); return; }
    intensiveShuffle = document.getElementById('int-shuffle')?.checked ?? true;
    selChapters = cbs.map(c => c.value);
    const seen = new Set(); srsQueue = [];
    selChapters.forEach(ch => {
        (db[curSubject][ch].flashcards || []).forEach(c => {
            const k = c.q + '|' + c.a;
            if (!seen.has(k)) { seen.add(k); srsQueue.push({ card: c, ch }); }
        });
    });
    if (!srsQueue.length) { showToast('Aucune carte dans ces chapitres !', 'warn'); return; }
    if (intensiveShuffle) srsQueue = srsQueue.sort(() => Math.random() - .5);
    intensiveMode = true;
    srsAgain = []; sessDone = 0; sessTotal = srsQueue.length;
    sessStats = { seen: 0, right: 0, wrong: 0 }; qSecs = 0;
    clearInterval(qTimer);
    qTimer = setInterval(() => {
        qSecs++;
        const el = $('srs-timer');
        if (el) { const m = String(Math.floor(qSecs/60)).padStart(2,'0'); const s = String(qSecs%60).padStart(2,'0'); el.textContent = m+':'+s; }
    }, 1000);
    renderSRSCard();
}

// ── SRS SETUP ─────────────────────────────────────────────────
function openSRS() {
    clearInterval(qTimer);
    const chapters = Object.keys(db[curSubject]);
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">← ${curSubject}</button>
        </div>
        <div class="ws-box">
        <div class="setup-wrap">
            <h3>🎴 Session Flashcards SRS</h3>
            <div class="info-box blue"><b>SRS (Anki) :</b> 4 boutons de difficulté — les cartes difficiles reviennent vite, les cartes maîtrisées moins souvent.</div>
            <p style="font-weight:700;margin-bottom:10px;">Chapitres à réviser :</p>
            <div class="cb-list">
                ${chapters.map(ch=>{
                    const due=(db[curSubject][ch].flashcards||[]).filter(isDue).length;
                    const tot=(db[curSubject][ch].flashcards||[]).length;
                    return `<label class="cb-item">
                        <input type="checkbox" class="srs-cb" value="${ch}" ${due>0?'checked':''}>
                        <span style="flex:1">${ch}</span>
                        <span class="cb-right ${due>0?'due':''}">${due>0?due+' à réviser':tot+' cartes'}</span>
                    </label>`;
                }).join('')}
            </div>
            <div class="btn-row">
                <button class="bc-btn" onclick="document.querySelectorAll('.srs-cb').forEach(c=>c.checked=true)">Tout cocher</button>
                <button class="bc-btn" onclick="document.querySelectorAll('.srs-cb').forEach(c=>c.checked=false)">Tout décocher</button>
            </div>
            <button class="btn-main" onclick="startSRS()">🚀 Commencer</button>
        </div>
        </div>
    `);
}

// ── SRS SESSION ───────────────────────────────────────────────
function startSRS() {
    intensiveMode = false;
    const cbs=[...document.querySelectorAll('.srs-cb:checked')];
    if(!cbs.length){showToast('Sélectionne au moins un chapitre !','warn');return;}
    selChapters=cbs.map(c=>c.value);
    const seen=new Set(); srsQueue=[];
    selChapters.forEach(ch=>{
        (db[curSubject][ch].flashcards||[]).forEach(c=>{
            const k=c.q+'|'+c.a;
            if(!seen.has(k)&&isDue(c)){seen.add(k);srsQueue.push({card:c,ch});}
        });
    });
    if(!srsQueue.length){
        render(`<div class="ws-box" style="text-align:center;padding:50px 20px;">
            <div style="font-size:3rem;margin-bottom:10px">🎉</div>
            <h3 style="font-family:'Sora',sans-serif;margin-bottom:8px">Tout est à jour !</h3>
            <p style="color:var(--muted);margin-bottom:22px">Reviens plus tard quand des cartes seront dues.</p>
            <button class="btn-main" onclick="goSubject('${esc(curSubject)}')">← Retour</button>
        </div>`); return;
    }
    srsQueue=srsQueue.sort(()=>Math.random()-.5);
    srsAgain=[]; sessDone=0; sessTotal=srsQueue.length;
    sessStats={seen:0,right:0,wrong:0}; qSecs=0;
    clearInterval(qTimer);
    qTimer=setInterval(()=>{
        qSecs++;
        const el=$('srs-timer');
        if(el){const m=String(Math.floor(qSecs/60)).padStart(2,'0');const s=String(qSecs%60).padStart(2,'0');el.textContent=m+':'+s;}
    },1000);
    renderSRSCard();
}

function srsDelay(card,r){
    const iv=card.interval||0; const e=card.ease||2.5;
    const d=n=>n+'j';
    switch(r){
        case'again':return '15 min';
        case'hard': return d(iv===0?1:Math.max(1,Math.round(iv*1.2)));
        case'good': return d(iv===0?3:Math.max(1,Math.round(iv*e)));
        case'easy': return d(iv===0?7:Math.max(4,Math.round(iv*e*1.3)));
    }
}

function confirmStopSRS(){
    customConfirm({
        icon:'🎴', title:'Arrêter la session ?',
        message:'Tes cartes déjà faites sont sauvegardées, mais tu perdras la suite de cette série.',
        confirmLabel:'Arrêter', cancelLabel:'Continuer', danger:true,
        onConfirm:()=>{ clearInterval(qTimer); goSubject(curSubject); }
    });
}

function renderSRSCard() {
    srsCur=srsQueue.shift()||srsAgain.shift()||null;
    // Mode intensif : si plus de cartes, on recharge toute la pile en ordre aléatoire
    if(!srsCur && intensiveMode){
        const seen=new Set(); srsQueue=[];
        selChapters.forEach(ch=>{
            (db[curSubject][ch].flashcards||[]).forEach(card=>{
                const k=card.q+'|'+card.a;
                if(!seen.has(k)){seen.add(k);srsQueue.push({card,ch});}
            });
        });
        srsQueue=srsQueue.sort(()=>Math.random()-.5);
        srsAgain=[];
        sessTotal+=srsQueue.length;
        srsCur=srsQueue.shift()||null;
        if(!srsCur){renderSRSResults();return;}
        showToast('🔄 Nouvelle boucle — bon courage !','info');
    }
    srsFlipped=false;
    if(!srsCur){renderSRSResults();return;}
    const {card}=srsCur;
    const rem=srsQueue.length+srsAgain.length;
    const tot=sessTotal+srsAgain.length;
    const pct=tot>0?Math.round(sessDone/tot*100):0;
    const m=String(Math.floor(qSecs/60)).padStart(2,'0');
    const s=String(qSecs%60).padStart(2,'0');
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="confirmStopSRS()">✕ Arrêter</button>
        </div>
        <div class="ws-box">
        <div class="srs-wrap">
            ${intensiveMode ? '<div class="int-badge">🔥 Mode Intensif</div>' : ''}
            <div class="srs-prog-row">
                <span>${sessDone+1} / ${tot}</span>
                <span id="srs-timer">${m}:${s}</span>
                <span>${rem} restante${rem!==1?'s':''}</span>
            </div>
            <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>

            <div class="fc-scene" onclick="if(!srsFlipped)revealSRS()" style="cursor:pointer" title="Cliquer pour retourner">
                <div class="fc-3d" id="fc3d">
                    <div class="fc-face fc-front">
                        <span class="fc-label">Question</span>
                        <span class="fc-q">${card.q}</span>
                    </div>
                    <div class="fc-face fc-back">
                        <span class="fc-label">Réponse correcte</span>
                        <span class="fc-q">${card.a}</span>
                    </div>
                </div>
            </div>

            <div id="input-zone">
                <input type="text" id="srs-ans" class="srs-field" placeholder="Écris ta réponse…"
                    onkeydown="if(event.key==='Enter')revealSRS()">
                <button class="btn-main" onclick="revealSRS()" style="margin-bottom:8px">Vérifier →</button>
                <button class="srs-skip" onclick="revealSRS(true)">Je ne sais pas / Passer</button>
            </div>

            <div id="fb-zone" style="display:none"></div>
            <div id="rating-row" class="rating-row" style="display:none">
                <button class="r-btn r-again" onclick="rateSRS('again')">Encore<span class="r-delay">${srsDelay(card,'again')}</span></button>
                <button class="r-btn r-hard"  onclick="rateSRS('hard')">Difficile<span class="r-delay">${srsDelay(card,'hard')}</span></button>
                <button class="r-btn r-good"  onclick="rateSRS('good')">Bien<span class="r-delay">${srsDelay(card,'good')}</span></button>
                <button class="r-btn r-easy"  onclick="rateSRS('easy')">Facile<span class="r-delay">${srsDelay(card,'easy')}</span></button>
            </div>

            <div class="srs-stats">
                <div class="srs-stat"><div class="srs-stat-n" style="color:#4f46e5">${sessStats.seen}</div><div class="srs-stat-l">Vues</div></div>
                <div class="srs-stat"><div class="srs-stat-n" style="color:#059669">${sessStats.right}</div><div class="srs-stat-l">Bien</div></div>
                <div class="srs-stat"><div class="srs-stat-n" style="color:#dc2626">${sessStats.wrong}</div><div class="srs-stat-l">À revoir</div></div>
            </div>
        </div>
        </div>
    `);
    setTimeout(()=>{const el=$('srs-ans');if(el)el.focus();},80);
}

function revealSRS(skip){
    skip=skip||false;
    if(srsFlipped)return;
    srsFlipped=true;
    const el=$('srs-ans');
    const userAns=el?el.value.trim().toLowerCase():'';
    const correct=srsCur.card.a.trim().toLowerCase();
    const isRight=!skip&&userAns!==''&&userAns===correct;
    sessStats.seen++;
    if(isRight)sessStats.right++;
    else if(!skip)sessStats.wrong++;
    const fc=$('fc3d');if(fc)fc.classList.add('flipped');
    const iz=$('input-zone');if(iz)iz.style.display='none';
    const fz=$('fb-zone');
    if(fz){
        fz.style.display='block';
        if(skip)fz.innerHTML=`<div class="srs-fb fb-skip"><span class="fb-icon">⏭️</span><span>Passé — voici la réponse</span></div>`;
        else if(isRight)fz.innerHTML=`<div class="srs-fb fb-right"><span class="fb-icon">✅</span><span>Correct !</span></div>`;
        else fz.innerHTML=`<div class="srs-fb fb-wrong"><span class="fb-icon">❌</span><div><div>Ta réponse : <b>${userAns||'—'}</b></div><div style="margin-top:3px">Bonne réponse : <b>${srsCur.card.a}</b></div></div></div>`;
        typesetMath(fz); // la réponse peut contenir du LaTeX ($...$) — sans ça, elle s'affichait en brut
    }
    const rr=$('rating-row');if(rr)rr.style.display='grid';
    if(isRight){const g=document.querySelector('.r-btn.r-good');if(g)g.focus();}
    else{const a=document.querySelector('.r-btn.r-again');if(a)a.focus();}
}

function rateSRS(r){
    if(!srsCur)return;
    logActivity();
    const {card,ch}=srsCur;

    // Mode intensif : on ne touche pas aux données SRS, on remet juste en file si "encore"
    if(intensiveMode){
        // Peu importe la réponse, la carte repart toujours dans la file
        srsAgain.push(srsCur);
        if(r==='good'||r==='easy') sessStats.right++;
        else sessStats.wrong++;
        sessDone++;
        renderSRSCard();
        return;
    }

    const iv=card.interval||0; const e=card.ease||2.5;
    const DAY=86400000; const now=Date.now();
    let newIv,newEase,newDue;
    switch(r){
        case'again':newIv=1;newEase=Math.max(1.3,e-.2);newDue=now+15*60*1000;srsAgain.push(srsCur);sessStats.wrong++;break;
        case'hard': newIv=iv===0?1:Math.max(1,Math.round(iv*1.2));newEase=Math.max(1.3,e-.15);newDue=now+newIv*DAY;sessDone++;sessStats.wrong++;break;
        case'good': newIv=iv===0?3:Math.max(1,Math.round(iv*e));newEase=e;newDue=now+newIv*DAY;sessDone++;sessStats.right++;break;
        case'easy': newIv=iv===0?7:Math.max(4,Math.round(iv*e*1.3));newEase=Math.min(3,e+.15);newDue=now+newIv*DAY;sessDone++;sessStats.right++;break;
    }
    const cards=db[curSubject][ch].flashcards;
    const idx=cards.findIndex(c=>c.q===card.q&&c.a===card.a);
    if(idx!==-1){cards[idx].interval=newIv;cards[idx].ease=newEase;cards[idx].due=newDue;cards[idx].score=(cards[idx].score||0)+(r==='good'||r==='easy'?1:-1);}
    save(); renderSRSCard();
}

function renderSRSResults(){
    clearInterval(qTimer);
    const tot=sessDone;
    const pct=tot===0?100:Math.round(sessStats.right/tot*100);
    const emoji=pct>=80?'🏆':pct>=60?'👍':'📚';
    const msg=pct>=80?'Excellente session !':pct>=60?'Bien joué, continue !':'Revois les cartes difficiles.';
    const mins=Math.floor(qSecs/60); const secs=qSecs%60;
    const accuracy = tot === 0 ? '—' : pct + '%';
    render(`
        <div class="ws-box">
        <div class="session-end">
            <div class="se-emoji">${emoji}</div>
            <div class="se-title">${msg}</div>
            <div class="se-subject">${curSubject} · ${selChapters.length} chapitre(s)${intensiveMode ? ' · 🔥 Intensif' : ''}</div>
            <div class="se-pct">${accuracy}</div>
            <div class="se-label">de réussite</div>
            <div class="results-grid" style="margin:18px auto;">
                <div class="res-stat"><div class="res-n" style="color:#059669">${sessStats.right}</div><div class="res-l">Bien</div></div>
                <div class="res-stat"><div class="res-n" style="color:#dc2626">${sessStats.wrong}</div><div class="res-l">À revoir</div></div>
                <div class="res-stat"><div class="res-n" style="color:#4f46e5">${tot}</div><div class="res-l">Faites</div></div>
                <div class="res-stat"><div class="res-n" style="color:#0891b2">${mins}m${String(secs).padStart(2,'0')}s</div><div class="res-l">Durée</div></div>
            </div>
            <div class="se-actions">
                <button class="btn-main" onclick="openSRS()">🔄 Nouvelle session</button>
                <button class="btn-main" style="background:linear-gradient(135deg,#059669,#10b981);box-shadow:0 4px 14px rgba(5,150,105,.3)" onclick="openQCM()">🧠 Faire un QCM</button>
                <button class="bc-btn se-home-btn" onclick="goSubject('${esc(curSubject)}')">← Retour au menu</button>
            </div>
        </div>
        </div>
    `);
}

// ── QCM SETUP ─────────────────────────────────────────────────
const SUBJ_COLORS = {fr:'#059669',math:'#4f46e5',hg:'#9f1239',ang:'#1d4ed8',esp:'#ca8a04',phy:'#7c3aed',idd:'#0d9488',it:'#ea580c',info:'#0891b2',cyber:'#b91c1c',bourse:'#65a30d',entr:'#e11d48',sci:'#6366f1',jur:'#78716c'};
function subjectColor(name){ const cfg=CFG.find(c=>c.name===name); return cfg ? (SUBJ_COLORS[cfg.cls]||'#4f46e5') : '#4f46e5'; }

function openQCM() {
    clearInterval(qTimer);
    const chapters=Object.keys(db[curSubject]);
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">← ${curSubject}</button>
        </div>
        <div class="ws-box">
        <div class="setup-wrap">
            <h3>🧠 QCM Auto-généré</h3>
            <div class="info-box green"><b>QCM :</b> Questions à 4 choix générées automatiquement depuis ton vocabulaire.</div>
            <p style="font-weight:700;margin-bottom:10px;">Chapitres :</p>
            <div class="cb-list">
                ${chapters.map(ch=>{
                    const n=(db[curSubject][ch].flashcards||[]).length;
                    return `<label class="cb-item">
                        <input type="checkbox" class="qcm-cb" value="${ch}" ${n>0?'checked':''}>
                        <span style="flex:1">${ch}</span>
                        <span class="cb-right">${n} mots</span>
                    </label>`;
                }).join('')}
            </div>
            <label style="font-weight:700;display:block;margin-bottom:8px">Nombre de questions :</label>
            <select id="qcm-n" class="field" style="margin-bottom:14px">
                <option value="10" selected>10 questions</option>
                <option value="25">25 questions</option>
                <option value="0">∞ Infini (tout le vocabulaire)</option>
            </select>
            <div class="btn-row">
                <button class="bc-btn" onclick="document.querySelectorAll('.qcm-cb').forEach(c=>c.checked=true)">Tout cocher</button>
                <button class="bc-btn" onclick="document.querySelectorAll('.qcm-cb').forEach(c=>c.checked=false)">Tout décocher</button>
            </div>
            <button class="btn-main green" onclick="startQCM()">🚀 Commencer</button>
        </div>
        </div>
    `);
}

// ── QCM SESSION ───────────────────────────────────────────────
function startQCM(){
    const cbs=[...document.querySelectorAll('.qcm-cb:checked')];
    if(!cbs.length){showToast('Sélectionne au moins un chapitre !','warn');return;}
    const n=parseInt($('qcm-n').value);
    const seen=new Set(); let full=[];
    cbs.forEach(cb=>{
        (db[curSubject][cb.value].flashcards||[]).forEach(c=>{
            const k=c.q+'|'+c.a;
            if(!seen.has(k)){seen.add(k);full.push(c);}
        });
    });
    if(full.length<2){showToast('Il faut au moins 2 mots pour générer un QCM !','warn');return;}
    let all=[...full].sort(()=>Math.random()-.5);
    if(n>0)all=all.slice(0,n);
    // Les mauvaises réponses piochent dans TOUT le pool sélectionné (pas seulement
    // les n questions tirées), pour avoir un vrai mélange à chaque question
    // plutôt que de recycler sans arrêt les 2-3 mêmes distracteurs.
    qcmList=all.map(card=>{
        const wrong=full.filter(c=>c.a!==card.a).sort(()=>Math.random()-.5).slice(0,3);
        const opts=[...wrong.map(c=>c.a),card.a].sort(()=>Math.random()-.5);
        return{q:card.q,correct:card.a,opts};
    });
    qcmIdx=0; qcmScore=0; qSecs=0;
    clearInterval(qTimer);
    qTimer=setInterval(()=>{ qSecs++; },1000);
    renderQCM();
}

function confirmStopQCM(){
    customConfirm({
        icon:'🧠', title:'Arrêter le QCM ?',
        message:`Ton score actuel (${qcmScore}/${qcmIdx}) ne sera pas comptabilisé.`,
        confirmLabel:'Arrêter', cancelLabel:'Continuer', danger:true,
        onConfirm:()=>{ openQCM(); }
    });
}

function renderQCM(){
    if(qcmIdx>=qcmList.length){renderQCMResults();return;}
    qcmCur=qcmList[qcmIdx];
    const {q,opts}=qcmCur;
    const pct=Math.round(qcmIdx/qcmList.length*100);
    const letters=['A','B','C','D'];
    const sc=subjectColor(curSubject);
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="confirmStopQCM()">✕ Arrêter</button>
        </div>
        <div class="ws-box">
        <div class="qcm-wrap">
            <div class="srs-prog-row">
                <span>Question <b>${qcmIdx+1}</b> / ${qcmList.length}</span>
                <span>Score : <b>${qcmScore}/${qcmIdx}</b></span>
            </div>
            <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:linear-gradient(90deg,${sc},${sc}99)"></div></div>
            <div class="qcm-q-box" style="border-top-color:${sc}">
                <div class="qcm-q-label" style="color:${sc}">🧠 Définition / traduction de</div>
                <div class="qcm-q-text">${q}</div>
            </div>
            <div class="qcm-opts">
                ${opts.map((o,i)=>`<button class="qcm-opt" id="opt${i}" onclick="answerQCM(${i})">
                    <span class="opt-letter opt-letter-${i}">${letters[i]}</span><span>${o}</span>
                </button>`).join('')}
            </div>
            <button class="qcm-next" id="qnext" style="background:${sc}" onclick="nextQCM()">
                ${qcmIdx+1<qcmList.length?'Question suivante →':'Voir les résultats →'}
            </button>
        </div>
        </div>
    `);
}

function answerQCM(i){
    if(!qcmCur)return;
    logActivity();
    const {correct,opts}=qcmCur;
    document.querySelectorAll('.qcm-opt').forEach((b,j)=>{
        b.disabled=true;
        if(opts[j]===correct)b.classList.add('correct');
        else if(j===i&&opts[j]!==correct)b.classList.add('wrong');
    });
    if(opts[i]===correct)qcmScore++;
    const nb=$('qnext');if(nb)nb.style.display='block';
}

function nextQCM(){qcmIdx++;renderQCM();}

function renderQCMResults(){
    const pct=qcmList.length===0?0:Math.round(qcmScore/qcmList.length*100);
    const emoji=pct>=80?'🏆':pct>=60?'👍':'📚';
    const msg=pct>=80?'Excellent travail !':pct>=60?'Pas mal, continue !':'Révise encore ce chapitre !';
    const mins=Math.floor(qSecs/60); const secs=qSecs%60;
    render(`
        <div class="ws-box">
        <div class="session-end">
            <div class="se-emoji">${emoji}</div>
            <div class="se-title">${msg}</div>
            <div class="se-subject">${curSubject} · QCM</div>
            <div class="se-pct">${pct}%</div>
            <div class="se-label">de réussite</div>
            <div class="results-grid" style="margin:18px auto;">
                <div class="res-stat"><div class="res-n" style="color:#059669">${qcmScore}</div><div class="res-l">Correctes</div></div>
                <div class="res-stat"><div class="res-n" style="color:#dc2626">${qcmList.length-qcmScore}</div><div class="res-l">Fausses</div></div>
                <div class="res-stat"><div class="res-n" style="color:#4f46e5">${qcmList.length}</div><div class="res-l">Total</div></div>
                <div class="res-stat"><div class="res-n" style="color:#0891b2">${mins}m${String(secs).padStart(2,'0')}s</div><div class="res-l">Durée</div></div>
            </div>
            <div class="se-actions">
                <button class="btn-main green" onclick="openQCM()">🔄 Rejouer le QCM</button>
                <button class="btn-main" onclick="openSRS()">🎴 Flashcards</button>
                <button class="bc-btn se-home-btn" onclick="goSubject('${esc(curSubject)}')">← Retour au menu</button>
            </div>
        </div>
        </div>
    `);
}



// ── RECHERCHE ─────────────────────────────────────────────────
function openSearch() {
    render(`
        <div class="page-head"><h1>🔍 Recherche</h1></div>
        <div class="ws-box" style="padding:18px">
            <input type="text" id="search-input" class="field" placeholder="Mot-clé : chapitre, flashcard, cours…"
                oninput="doSearch(this.value)" autofocus>
            <div id="search-results" style="margin-top:14px"></div>
        </div>
    `);
    setTimeout(() => { const el = $('search-input'); if(el) el.focus(); }, 80);
}

function doSearch(q) {
    const box = $('search-results');
    if(!box) return;
    const term = q.trim().toLowerCase();
    if(term.length < 2) { box.innerHTML = '<p style="color:var(--muted)">Saisis au moins 2 caractères…</p>'; return; }
    const results = [];
    Object.keys(db).forEach(subj => {
        Object.keys(db[subj]).forEach(ch => {
            const data = db[subj][ch];
            // Match chapter name
            if(ch.toLowerCase().includes(term)) {
                results.push({type:'chapter', subj, ch, text: ch});
            }
            // Match cours content (strip HTML)
            if(data.cours && data.cours.replace(/<[^>]+>/g,'').toLowerCase().includes(term)) {
                results.push({type:'cours', subj, ch, text: 'Cours : ' + ch});
            }
            // Match flashcards
            (data.flashcards||[]).forEach((card, i) => {
                const match = card.q.toLowerCase().includes(term) || card.a.toLowerCase().includes(term);
                if(match) results.push({type:'card', subj, ch, card, i,
                    text: card.q.substring(0, 60) + (card.q.length > 60 ? '…' : '')});
            });
        });
    });
    if(!results.length) { box.innerHTML = '<p style="color:var(--muted)">Aucun résultat pour <b>' + esc(q) + '</b></p>'; return; }
    const limited = results.slice(0, 30);
    const CFGmap = {};
    CFG.forEach(c => CFGmap[c.name] = c.icon);
    box.innerHTML = '<p style="color:var(--muted);font-size:.8rem;margin-bottom:10px">' + results.length + ' résultat(s)</p>' +
        limited.map(r => {
            const icon = r.type==='card' ? '🃏' : r.type==='cours' ? '📖' : '📂';
            const subjIcon = CFGmap[r.subj] || '📚';
            const onclick = r.type==='card'
                ? `curSubject='${esc(r.subj)}';curChapter='${esc(r.ch)}';curTab='voc';renderChapter()`
                : `curSubject='${esc(r.subj)}';curChapter='${esc(r.ch)}';curTab='cours';renderChapter()`;
            return '<div class="search-result" onclick="' + onclick + '">' +
                '<span class="sr-icon">' + icon + '</span>' +
                '<div class="sr-body">' +
                '<div class="sr-title">' + r.text + '</div>' +
                '<div class="sr-meta">' + subjIcon + ' ' + r.subj + ' › ' + r.ch + '</div>' +
                '</div></div>';
        }).join('');
}


// ── MATHJAX HELPER ────────────────────────────────────────────
function typesetMath(el) {
    el = el || document.getElementById('main');
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([el]).catch(e => console.warn('MathJax:', e));
    }
}

// ── FIGURES DE STYLE — explication au tap/clic (mobile + desktop) ──
// Le survol (:hover) ne fonctionne pas sur tablette/téléphone.
// On affiche donc le contenu de l'attribut "title" dans une bulle
// au clic/tap, en plus du surlignage de couleur (déjà géré en CSS).
function setupFigTooltips(el) {
    el = el || document.getElementById('main');
    el.querySelectorAll('.fig[title]').forEach(span => {
        // Évite de ré-attacher l'écouteur si on re-render la même zone
        if (span.dataset.figBound) return;
        span.dataset.figBound = '1';
        span.addEventListener('click', e => {
            e.stopPropagation();
            showFigPopup(span, span.getAttribute('title'));
        });
    });
}

function showFigPopup(target, text) {
    closeFigPopup();

    // Nom lisible de la figure
    const figClass = [...target.classList].find(c => c.startsWith('fig-') && c !== 'fig') || '';
    const figNames = {
        'fig-metaphore':'Métaphore','fig-comparaison':'Comparaison',
        'fig-perso':'Personnification','fig-anaphore':'Anaphore',
        'fig-oxymore':'Oxymore','fig-ironie':'Ironie',
        'fig-euphem':'Euphémisme','fig-accumulation':'Accumulation',
        'fig-apostrophe':'Apostrophe','fig-question':'Question rhétorique',
        'fig-ellipse':'Ellipse','fig-antithese':'Antithèse',
        'fig-chute':'Chute','fig-hyperbole':'Hyperbole',
        'fig-antiphrase':'Antiphrase','fig-pleonasme':'Pléonasme',
        'fig-these':'Thèse','fig-concession':'Concession',
        'fig-relativisme':'Relativisme'
    };
    const label = figNames[figClass] || figClass.replace('fig-','');

    // Couleur du badge = même que la figure
    const badgeColors = {
        'fig-metaphore':   {bg:'#fef08a',fg:'#713f12'},
        'fig-comparaison': {bg:'#bfdbfe',fg:'#1e3a8a'},
        'fig-perso':       {bg:'#bbf7d0',fg:'#14532d'},
        'fig-anaphore':    {bg:'#ddd6fe',fg:'#4c1d95'},
        'fig-oxymore':     {bg:'#fecaca',fg:'#7f1d1d'},
        'fig-ironie':      {bg:'#fed7aa',fg:'#7c2d12'},
        'fig-euphem':      {bg:'#bae6fd',fg:'#0c4a6e'},
        'fig-accumulation':{bg:'#e9d5ff',fg:'#581c87'},
        'fig-apostrophe':  {bg:'#a7f3d0',fg:'#064e3b'},
        'fig-question':    {bg:'#fde68a',fg:'#78350f'},
        'fig-ellipse':     {bg:'#a7f3d0',fg:'#064e3b'},
        'fig-antithese':   {bg:'#fca5a5',fg:'#7f1d1d'},
        'fig-chute':       {bg:'#312e81',fg:'#e0e7ff'},
        'fig-hyperbole':   {bg:'#fda4af',fg:'#881337'},
        'fig-antiphrase':  {bg:'#fed7aa',fg:'#7c2d12'},
        'fig-pleonasme':   {bg:'#bbf7d0',fg:'#14532d'},
        'fig-these':       {bg:'#bae6fd',fg:'#0c4a6e'},
        'fig-concession':  {bg:'#fbcfe8',fg:'#831843'},
        'fig-relativisme': {bg:'#fef08a',fg:'#713f12'},
    };
    const bc = badgeColors[figClass] || {bg:'#e2e8f0',fg:'#1e293b'};

    const pop = document.createElement('div');
    pop.id = 'fig-popup';

    // Tous les styles en inline — indépendant du style.css
    Object.assign(pop.style, {
        position:     'fixed',
        zIndex:       '99999',
        width:        '360px',
        maxWidth:     'calc(100vw - 24px)',
        background:   '#1e293b',
        borderRadius: '18px',
        boxShadow:    '0 16px 48px rgba(0,0,0,.55)',
        overflow:     'hidden',
        fontFamily:   "'DM Sans', sans-serif",
        fontSize:     '15px',
        lineHeight:   '1.65',
        color:        '#e2e8f0',
    });

    pop.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 12px 13px 16px;background:rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.1)">
            <span style="background:${bc.bg};color:${bc.fg};font-size:.82rem;font-weight:700;padding:4px 13px;border-radius:20px;text-transform:uppercase;letter-spacing:.03em">${label}</span>
            <button onclick="closeFigPopup()" style="background:rgba(255,255,255,.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center">✕</button>
        </div>
        <div style="padding:16px 18px 18px;color:#e2e8f0;font-size:.95rem;line-height:1.7">${text}</div>`;

    document.body.appendChild(pop);

    // Positionnement : sous le mot cliqué, dans le viewport
    const r = target.getBoundingClientRect();
    requestAnimationFrame(() => {
        const pw = pop.offsetWidth  || 300;
        const ph = pop.offsetHeight || 150;
        const iw = window.innerWidth;
        const ih = window.innerHeight;

        let left = r.left;
        let top  = r.bottom + 10;

        // Déborde à droite ?
        if (left + pw > iw - 10) left = iw - pw - 10;
        if (left < 10) left = 10;

        // Déborde en bas ? → mettre au-dessus du mot
        if (top + ph > ih - 10) top = r.top - ph - 10;
        if (top < 10) top = ih / 2 - ph / 2; // dernier recours : centre

        pop.style.left = left + 'px';
        pop.style.top  = top  + 'px';
    });

    setTimeout(() => document.addEventListener('click', closeFigPopupOnce, {once:true}), 0);
}

function closeFigPopupOnce(e) {
    const pop = $('fig-popup');
    if (pop && !pop.contains(e.target)) closeFigPopup();
    else if (pop) document.addEventListener('click', closeFigPopupOnce, {once:true});
}

function closeFigPopup() {
    const pop = $('fig-popup');
    if (pop) pop.remove();
}


// ── EXERCICES ─────────────────────────────────────────────────
function openExercices() {
    clearInterval(qTimer);
    const chapters = Object.keys(db[curSubject]).filter(ch =>
        (db[curSubject][ch].exercices || []).length > 0
    );
    if (chapters.length === 0) {
        render(`
            <div class="breadcrumb">
                <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">← ${curSubject}</button>
            </div>
            <div class="ws-box" style="text-align:center;padding:40px 20px">
                <div style="font-size:3rem;margin-bottom:12px">✏️</div>
                <h3 style="margin-bottom:8px">Pas encore d'exercices</h3>
                <p style="color:var(--muted)">Les exercices pour ${curSubject} arrivent bientôt !</p>
                <button class="btn-main" style="margin-top:16px;max-width:220px" onclick="goSubject('${esc(curSubject)}')">← Retour</button>
            </div>
        `);
        return;
    }
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">← ${curSubject}</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">✏️ Exercices</span>
        </div>
        <div class="page-head">
            <h1>✏️ Exercices — ${curSubject}</h1>
            <p style="color:var(--muted);font-size:.85rem">Lis l'énoncé, réfléchis, puis regarde la correction</p>
        </div>
        <div class="chapters-grid">
            ${chapters.map(ch => {
                const exos = db[curSubject][ch].exercices || [];
                const nF = exos.filter(e=>e.niveau==='Facile').length;
                const nM = exos.filter(e=>e.niveau==='Moyen').length;
                const nD = exos.filter(e=>e.niveau==='Difficile').length;
                return `<div class="chcard" onclick="openExoChapter('${esc(ch)}')">
                    <div class="chcard-name">${ch}</div>
                    <div class="chcard-meta">
                        <span>✏️ ${exos.length} exercice${exos.length>1?'s':''}</span>
                        ${nF?`<span style="color:#166534">🟢${nF}</span>`:''}
                        ${nM?`<span style="color:#854d0e">🟡${nM}</span>`:''}
                        ${nD?`<span style="color:#991b1b">🔴${nD}</span>`:''}
                    </div>
                </div>`;
            }).join('')}
        </div>
    `);
}

let curExoChapter='', curExoIdx=0, exoShowCorrection=false;

function openExoChapter(ch) {
    curExoChapter=ch; curExoIdx=0; exoShowCorrection=false; renderExo();
}

function renderExo() {
    const exos = db[curSubject][curExoChapter].exercices||[];
    if(!exos.length){openExercices();return;}
    const exo=exos[curExoIdx], total=exos.length;
    const pct=Math.round((curExoIdx/total)*100);
    const niv=(exo.niveau||'Moyen').toLowerCase();
    const nivEmoji=exo.niveau==='Facile'?'🟢':exo.niveau==='Difficile'?'🔴':'🟡';

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">🏠</button>
            <span class="bc-sep">›</span>
            <button class="bc-btn" onclick="openExercices()">Exercices</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">${curExoChapter}</span>
        </div>
        <div class="exo-progress-bar"><div class="exo-progress-fill" style="width:${pct}%"></div></div>
        <div style="text-align:right;font-size:.78rem;color:var(--muted);margin-bottom:12px">
            Exercice ${curExoIdx+1} / ${total}
        </div>
        <div class="ws-box exo-box">
            <div class="exo-niveau exo-niveau-${niv}">${nivEmoji} ${exo.niveau||'Moyen'}</div>
            <div class="exo-enonce">
                <div class="exo-label">📋 Énoncé</div>
                ${exo.enonce}
            </div>
            ${exo.aide?`
            <details class="exo-aide">
                <summary>💡 Aide — clique si tu bloques</summary>
                <div class="exo-aide-content">${exo.aide}</div>
            </details>`:''}
            ${exoShowCorrection?`
                <div class="exo-correction">
                    <div class="exo-label correction-label">✅ Correction détaillée</div>
                    ${exo.correction}
                </div>
                <div class="exo-nav">
                    ${curExoIdx>0?`<button class="bc-btn" onclick="curExoIdx--;exoShowCorrection=false;renderExo()">← Précédent</button>`:'<span></span>'}
                    ${curExoIdx<total-1
                        ?`<button class="btn-main" onclick="curExoIdx++;exoShowCorrection=false;renderExo()">Suivant →</button>`
                        :`<button class="btn-main" style="background:linear-gradient(135deg,#059669,#10b981)" onclick="openExoResults()">🏆 Terminer !</button>`}
                </div>
            `:`
                <button class="btn-main exo-voir-btn" onclick="exoShowCorrection=true;renderExo()">
                    👁️ Voir la correction
                </button>
            `}
        </div>
    `);
}

function openExoResults() {
    const exos=db[curSubject][curExoChapter].exercices||[];
    render(`
        <div class="ws-box"><div class="session-end">
            <div class="se-emoji">🏆</div>
            <div class="se-title">Série terminée !</div>
            <div class="se-subject">${curSubject} · ${curExoChapter}</div>
            <div class="se-pct">${exos.length}</div>
            <div class="se-label">exercice${exos.length>1?'s':''} complété${exos.length>1?'s':''}</div>
            <div class="se-actions" style="margin-top:20px">
                <button class="btn-main" onclick="curExoIdx=0;exoShowCorrection=false;renderExo()">🔄 Recommencer</button>
                <button class="btn-main" style="background:linear-gradient(135deg,#059669,#10b981)" onclick="openExercices()">📚 Autres chapitres</button>
                <button class="bc-btn se-home-btn" onclick="goSubject('${esc(curSubject)}')">← Retour au menu</button>
            </div>
        </div></div>
    `);
}


// ══════════════════════════════════════════════════════════════
// SYNCHRONISATION GITHUB — Multi-appareils
// Repo : Zanzibar8531/application_bac
// ══════════════════════════════════════════════════════════════

const GH_USER   = 'Zanzibar8531';
const GH_REPO   = 'application_bac';
const GH_FILE   = 'bacmaster_sync.json';   // fichier créé dans le repo
const GH_BRANCH = 'main';

// Token stocké localement (jamais dans le code publié)
function ghToken() { return localStorage.getItem('bm_gh_token') || ''; }
function ghSetToken(t) { localStorage.setItem('bm_gh_token', t.trim()); }

function ghHeaders() {
    return {
        'Authorization': `token ${ghToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
    };
}

// ── OUVRIR LE PANNEAU SYNC ────────────────────────────────────
function openSync() {
    const token = ghToken();
    const lastSync = localStorage.getItem('bm_last_sync');
    const lastDate = lastSync ? new Date(lastSync).toLocaleString('fr-FR') : 'Jamais';

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goHome()">🏠 Accueil</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">☁️ Synchronisation</span>
        </div>
        <div class="ws-box sync-panel">
            <div class="sync-header">
                <div class="sync-icon">☁️</div>
                <h2 style="margin:0 0 4px">Sync Multi-Appareils</h2>
                <p style="color:var(--muted);font-size:.85rem;margin:0">
                    Tes données sur tous tes appareils
                </p>
            </div>

            <div class="sync-info-box">
                <div class="sync-info-row">
                    <span>📱 Dernier sync</span>
                    <strong>${lastDate}</strong>
                </div>
                <div class="sync-info-row">
                    <span>📦 Repo</span>
                    <strong>${GH_USER}/${GH_REPO}</strong>
                </div>
                <div class="sync-info-row">
                    <span>🔑 Token</span>
                    <strong>${token ? '✅ Configuré' : '❌ Non configuré'}</strong>
                </div>
            </div>

            <div class="sync-export-box">
                <label class="sync-label">💾 Export ciblé (sans compte)</label>
                <p style="font-size:.78rem;color:var(--muted);margin:2px 0 8px">
                    Choisis exactement quelles matières/chapitres inclure dans le fichier .json — pratique pour ne donner à Claude que ce qui a besoin d'être mis au propre le soir.
                </p>
                <button class="bc-btn" style="width:100%;text-align:center" onclick="openExportPicker()">🎯 Choisir & exporter</button>
            </div>

            ${!token ? `
            <div class="sync-token-section">
                <label class="sync-label">🔑 Token GitHub</label>
                <input type="password" id="gh-token-input" class="field"
                    placeholder="ghp_..." value="${token}"
                    style="font-family:monospace;font-size:.85rem">
                <p style="font-size:.78rem;color:var(--muted);margin-top:6px">
                    Settings → Developer settings → Personal access tokens (classic) → scope: repo
                </p>
                <button class="btn-main" style="margin-top:8px" onclick="saveToken()">
                    💾 Enregistrer le token
                </button>
            </div>` : `
            <div class="sync-actions">
                <button class="btn-main sync-btn-up" onclick="syncUpload()">
                    <span class="sync-btn-icon">⬆️</span>
                    <div>
                        <div style="font-weight:700">Envoyer vers GitHub</div>
                        <div style="font-size:.78rem;opacity:.8">Sauvegarder depuis cet appareil</div>
                    </div>
                </button>
                <button class="btn-main sync-btn-down" onclick="syncDownload()">
                    <span class="sync-btn-icon">⬇️</span>
                    <div>
                        <div style="font-weight:700">Récupérer depuis GitHub</div>
                        <div style="font-size:.78rem;opacity:.8">Charger sur cet appareil</div>
                    </div>
                </button>
                <button class="bc-btn" style="width:100%;text-align:center;margin-top:4px"
                    onclick="changeToken()">🔧 Changer le token</button>
            </div>
            `}

            <div id="sync-log" class="sync-log" style="display:none"></div>
        </div>
    `);
}

// ── EXPORT SIMPLE (JSON local, sans compte) ─────────────────────
function exportData(customData) {
    try {
        const payload = customData || db;
        const n = Object.keys(payload).length;
        if(n === 0) { showToast('Rien à exporter avec cette sélection', 'warn'); return; }
        const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const stamp = new Date().toISOString().slice(0,10);
        a.href = url; a.download = 'bacmaster-export-' + stamp + '.json';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(()=>URL.revokeObjectURL(url), 1000);
        showToast(`📤 Export téléchargé ! (${n} matière${n>1?'s':''})`);
    } catch(e) {
        showToast('Erreur export : ' + e.message, 'error');
    }
}

// ── SÉLECTEUR D'EXPORT (choisir précisément quoi télécharger) ──
function openExportPicker() {
    let listHtml = '';
    CFG.forEach(s => {
        if(!db[s.name]) return;
        const chapters = Object.keys(db[s.name]);
        if(!chapters.length) return;
        listHtml += `
            <div class="exp-subj">
                <label class="exp-subj-label">
                    <input type="checkbox" class="exp-subj-cb" data-subject="${esc(s.name)}" checked onchange="toggleSubjectChapters(this)">
                    <span>${s.icon} ${esc(s.name)}</span>
                </label>
                <div class="exp-chap-list">
                    ${chapters.map(ch => `
                        <label class="exp-chap-label">
                            <input type="checkbox" class="exp-chap-cb" data-subject="${esc(s.name)}" data-chapter="${esc(ch)}" checked>
                            <span>${esc(ch)}</span>
                        </label>`).join('')}
                </div>
            </div>`;
    });
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="openSync()">← Synchronisation</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">🎯 Choisir l'export</span>
        </div>
        <div class="ws-box">
            <h2 style="margin-top:0">Choisir ce que tu exportes</h2>
            <p style="color:var(--muted);font-size:.85rem;margin-bottom:14px">
                Décoche ce que tu ne veux pas inclure. Pratique pour ne donner à Claude qu'un ou deux chapitres précis à retravailler.
            </p>
            <div style="display:flex;gap:8px;margin-bottom:14px">
                <button class="bc-btn" onclick="toggleAllExport(true)">✅ Tout cocher</button>
                <button class="bc-btn" onclick="toggleAllExport(false)">⬜ Tout décocher</button>
            </div>
            <div id="export-picker-list">${listHtml || '<p style="color:var(--muted)">Aucun contenu à exporter pour l\'instant.</p>'}</div>
            <button class="btn-main" style="width:100%;margin-top:16px" onclick="downloadSelectedExport()">📤 Télécharger la sélection (.json)</button>
        </div>
    `);
}
function toggleAllExport(state) {
    document.querySelectorAll('.exp-subj-cb, .exp-chap-cb').forEach(cb => cb.checked = state);
}
function toggleSubjectChapters(cb) {
    const subject = cb.dataset.subject;
    document.querySelectorAll('.exp-chap-cb').forEach(c => { if(c.dataset.subject===subject) c.checked = cb.checked; });
}
function downloadSelectedExport() {
    const filtered = {};
    document.querySelectorAll('.exp-chap-cb:checked').forEach(cb => {
        const subj = cb.dataset.subject, ch = cb.dataset.chapter;
        if(!filtered[subj]) filtered[subj] = {};
        filtered[subj][ch] = db[subj][ch];
    });
    exportData(filtered);
}

// ── TOKEN ──────────────────────────────────────────────────────
function saveToken() {
    const val = document.getElementById('gh-token-input')?.value?.trim();
    if (!val || !val.startsWith('ghp_')) {
        showToast('Token invalide — doit commencer par ghp_', 'warn');
        return;
    }
    ghSetToken(val);
    showToast('✅ Token enregistré !', 'info');
    openSync();
}

function changeToken() {
    localStorage.removeItem('bm_gh_token');
    openSync();
}

// ── LOG HELPER ────────────────────────────────────────────────
function syncLog(msg, type='info') {
    const box = document.getElementById('sync-log');
    if (!box) return;
    box.style.display = 'block';
    const colors = {info:'#4f46e5', ok:'#059669', error:'#dc2626', warn:'#d97706'};
    box.innerHTML += `<div style="color:${colors[type]||'#4f46e5'};margin-bottom:4px">
        ${type==='ok'?'✅':type==='error'?'❌':type==='warn'?'⚠️':'ℹ️'} ${msg}
    </div>`;
    box.scrollTop = box.scrollHeight;
}

// ── UPLOAD → GitHub ───────────────────────────────────────────
async function syncUpload() {
    if (!ghToken()) { showToast('Configure ton token d\'abord', 'warn'); return; }

    const log = document.getElementById('sync-log');
    if(log){ log.innerHTML=''; log.style.display='block'; }
    syncLog('Préparation des données...');

    // Préparer les données à sauvegarder
    const payload = {
        version: 2,
        date: new Date().toISOString(),
        device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
        db: db
    };
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(payload, null, 2))));

    syncLog('Connexion à GitHub...');

    try {
        // Vérifier si le fichier existe déjà (pour avoir son SHA)
        const checkRes = await fetch(
            `https://api.github.com/repos/${GH_USER}/${GH_REPO}/contents/${GH_FILE}?ref=${GH_BRANCH}`,
            { headers: ghHeaders() }
        );

        let sha = null;
        if (checkRes.ok) {
            const existing = await checkRes.json();
            sha = existing.sha;
            syncLog('Fichier existant trouvé, mise à jour...');
        } else {
            syncLog('Creation d\'un nouveau fichier sync...');
        }

        // Envoyer les données
        const body = {
            message: `BacMaster sync — ${new Date().toLocaleString('fr-FR')}`,
            content: content,
            branch: GH_BRANCH,
        };
        if (sha) body.sha = sha;

        const pushRes = await fetch(
            `https://api.github.com/repos/${GH_USER}/${GH_REPO}/contents/${GH_FILE}`,
            { method: 'PUT', headers: ghHeaders(), body: JSON.stringify(body) }
        );

        if (!pushRes.ok) {
            const err = await pushRes.json();
            throw new Error(err.message || `Erreur ${pushRes.status}`);
        }

        localStorage.setItem('bm_last_sync', new Date().toISOString());
        syncLog('Données envoyées avec succès !', 'ok');
        syncLog(`📦 ${Object.keys(db).length} matières sauvegardées`, 'ok');
        showToast('☁️ Sauvegarde réussie !', 'info');
        updateSyncStatusBadge();

    } catch(e) {
        syncLog(`Erreur : ${e.message}`, 'error');
        if (e.message.includes('401')) {
            syncLog('Token invalide ou expiré. Va dans Paramètres GitHub → régénère ton token.', 'warn');
        } else if (e.message.includes('404')) {
            syncLog('Repo introuvable. Vérifie que le repo est public ou que le token a le scope "repo".', 'warn');
        }
    }
}

// ── DOWNLOAD ← GitHub ────────────────────────────────────────
async function syncDownload() {
    if (!ghToken()) { showToast('Configure ton token d\'abord', 'warn'); return; }

    const log = document.getElementById('sync-log');
    if(log){ log.innerHTML=''; log.style.display='block'; }
    syncLog('Connexion à GitHub...');

    try {
        const res = await fetch(
            `https://api.github.com/repos/${GH_USER}/${GH_REPO}/contents/${GH_FILE}?ref=${GH_BRANCH}`,
            { headers: ghHeaders() }
        );

        if (!res.ok) {
            if (res.status === 404) throw new Error('Aucune sauvegarde trouvée — fais d\'abord un envoi depuis un autre appareil.');
            throw new Error(`Erreur ${res.status}`);
        }

        const file = await res.json();
        const raw = decodeURIComponent(escape(atob(file.content.split('\n').join(''))));
        const payload = JSON.parse(raw);

        syncLog(`Sauvegarde trouvée — ${new Date(payload.date).toLocaleString('fr-FR')}`, 'ok');
        syncLog(`Appareil source : ${payload.device}`);

        // Confirmation avant d'écraser les données locales
        if (!confirm(`Récupérer la sauvegarde du ${new Date(payload.date).toLocaleString('fr-FR')} ?

Cela remplacera tes données locales actuelles.`)) {
            syncLog('Annulé.', 'warn');
            return;
        }

        // Appliquer les données
        Object.keys(payload.db).forEach(subj => {
            db[subj] = payload.db[subj];
        });
        save();

        localStorage.setItem('bm_last_sync', new Date().toISOString());
        syncLog('Données restaurées avec succès !', 'ok');
        showToast('⬇️ Données récupérées !', 'info');
        updateSyncStatusBadge();

        setTimeout(() => goHome(), 1500);

    } catch(e) {
        syncLog(`Erreur : ${e.message}`, 'error');
    }
}

// ── BADGE STATUS ──────────────────────────────────────────────
function updateSyncStatusBadge() {
    const el = document.getElementById('sync-status-home');
    if (!el) return;
    const last = localStorage.getItem('bm_last_sync');
    if (!last) { el.textContent = '⚠️ Jamais synchronisé'; el.style.color='#d97706'; return; }
    const mins = Math.round((Date.now() - new Date(last)) / 60000);
    if (mins < 5)  { el.textContent = '✅ À jour'; el.style.color='#059669'; }
    else if (mins < 60)  { el.textContent = `🕐 Il y a ${mins} min`; el.style.color='#4f46e5'; }
    else if (mins < 1440){ el.textContent = `🕐 Il y a ${Math.round(mins/60)}h`; el.style.color='#d97706'; }
    else                 { el.textContent = `⚠️ Il y a ${Math.round(mins/1440)}j`; el.style.color='#dc2626'; }
}


// ── STYLES COURS — INJECTION GARANTIE ────────────────────────
(function() {
    const id = 'bm-cours-styles';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
        .cours-body { font-size:1rem; line-height:1.9; color:#334155; max-width:740px; margin:0 auto; padding-bottom:32px; }
        .cours-body h2 { font-family:'Sora',sans-serif; font-size:1.4rem; font-weight:800; color:#4f46e5 !important; -webkit-text-fill-color:#4f46e5 !important; background:none !important; -webkit-background-clip:unset !important; margin:0 0 1.2em; padding-bottom:12px; border-bottom:3px solid #e0e7ff; }
        .cours-body h3 { font-family:'Sora',sans-serif; font-size:1rem; font-weight:700; color:#1e1b4b !important; -webkit-text-fill-color:#1e1b4b !important; background:linear-gradient(90deg,#eef2ff,#f5f3ff 80%,transparent) !important; border-left:4px solid #4f46e5; border-radius:0 12px 12px 0; padding:9px 14px 9px 18px; margin:1.8em 0 .8em; border-bottom:none !important; }
        .cours-body p { margin-bottom:1em; line-height:1.9; color:#334155 !important; }
        .cours-body strong, .cours-body b { color:#4338ca !important; -webkit-text-fill-color:#4338ca !important; font-weight:700; }
        .cours-body em, .cours-body i { color:#7c3aed !important; -webkit-text-fill-color:#7c3aed !important; font-style:italic; }
        .cours-body ul, .cours-body ol { padding:0; margin:.6em 0 1.4em; list-style:none; display:flex; flex-direction:column; gap:8px; }
        .cours-body li { position:relative; padding:10px 14px 10px 2.6em; background:#f8faff; border:1.5px solid #e0e7ff; border-radius:12px; font-size:.95rem; line-height:1.65; color:#1e293b !important; -webkit-text-fill-color:#1e293b !important; margin:0; transition:all .18s; }
        .cours-body li:hover { border-color:#6366f1; background:#eef2ff; transform:translateX(4px); }
        .cours-body ul > li::before { content:'▸'; position:absolute; left:.85em; top:50%; transform:translateY(-50%); color:#6366f1; font-size:.95em; font-weight:700; }
        .cours-body ol { counter-reset:ol-cours; }
        .cours-body ol > li { counter-increment:ol-cours; }
        .cours-body ol > li::before { content:counter(ol-cours); position:absolute; left:.55em; top:50%; transform:translateY(-50%); width:1.5em; height:1.5em; background:#4f46e5; color:#fff !important; -webkit-text-fill-color:#fff !important; border-radius:50%; font-size:.72em; font-weight:800; display:flex; align-items:center; justify-content:center; }
        .cours-body blockquote, .cours-body .quote-box { margin:1.4em 0; padding:18px 20px 18px 26px; background:linear-gradient(135deg,#f5f3ff,#ede9fe); border-left:6px solid #7c3aed; border-radius:0 18px 18px 0; font-style:italic; font-size:1rem; line-height:1.8; color:#4c1d95 !important; -webkit-text-fill-color:#4c1d95 !important; box-shadow:0 4px 20px rgba(124,58,237,.12); position:relative; }
        .formula-box { background:linear-gradient(135deg,#eff6ff,#dbeafe); border-left:5px solid #3b82f6; border-radius:0 16px 16px 0; padding:16px 20px; margin:16px 0; font-size:.93rem; line-height:1.9; color:#1e3a5f !important; -webkit-text-fill-color:#1e3a5f !important; }
        .formula-box strong, .formula-box b { color:#1d4ed8 !important; -webkit-text-fill-color:#1d4ed8 !important; }
        @media (max-width:600px) { .cours-body h2{font-size:1.2rem!important} .cours-body h3{font-size:.95rem!important} .cours-body li{font-size:.93rem!important} }

        /* Figures de style — priorité maximale car ce bloc JS arrive après style.css */
        .cours-body .fig, .texte-annote .fig { border-radius:4px !important; padding:1px 5px !important; cursor:pointer !important; border-bottom-style:solid !important; border-bottom-width:3px !important; }
        .cours-body .fig-metaphore,    .texte-annote .fig-metaphore    { background:#fef08a !important; color:#713f12 !important; -webkit-text-fill-color:#713f12 !important; border-bottom-color:#ca8a04 !important; }
        .cours-body .fig-comparaison,  .texte-annote .fig-comparaison  { background:#bfdbfe !important; color:#1e3a8a !important; -webkit-text-fill-color:#1e3a8a !important; border-bottom-color:#2563eb !important; }
        .cours-body .fig-perso,        .texte-annote .fig-perso        { background:#bbf7d0 !important; color:#14532d !important; -webkit-text-fill-color:#14532d !important; border-bottom-color:#16a34a !important; }
        .cours-body .fig-anaphore,     .texte-annote .fig-anaphore     { background:#ddd6fe !important; color:#4c1d95 !important; -webkit-text-fill-color:#4c1d95 !important; border-bottom-color:#7c3aed !important; }
        .cours-body .fig-oxymore,      .texte-annote .fig-oxymore      { background:#fecaca !important; color:#7f1d1d !important; -webkit-text-fill-color:#7f1d1d !important; border-bottom-color:#dc2626 !important; }
        .cours-body .fig-ironie,       .texte-annote .fig-ironie       { background:#fed7aa !important; color:#7c2d12 !important; -webkit-text-fill-color:#7c2d12 !important; border-bottom-color:#ea580c !important; }
        .cours-body .fig-euphem,       .texte-annote .fig-euphem       { background:#bae6fd !important; color:#0c4a6e !important; -webkit-text-fill-color:#0c4a6e !important; border-bottom-color:#0284c7 !important; }
        .cours-body .fig-accumulation, .texte-annote .fig-accumulation { background:#e9d5ff !important; color:#581c87 !important; -webkit-text-fill-color:#581c87 !important; border-bottom-color:#9333ea !important; }
        .cours-body .fig-apostrophe,   .texte-annote .fig-apostrophe   { background:#a7f3d0 !important; color:#064e3b !important; -webkit-text-fill-color:#064e3b !important; border-bottom-color:#059669 !important; }
        .cours-body .fig-question,     .texte-annote .fig-question     { background:#fde68a !important; color:#78350f !important; -webkit-text-fill-color:#78350f !important; border-bottom-color:#d97706 !important; }
        .cours-body .fig-ellipse,      .texte-annote .fig-ellipse      { background:#a7f3d0 !important; color:#064e3b !important; -webkit-text-fill-color:#064e3b !important; border-bottom-color:#10b981 !important; }
        .cours-body .fig-antithese,    .texte-annote .fig-antithese    { background:#fca5a5 !important; color:#7f1d1d !important; -webkit-text-fill-color:#7f1d1d !important; border-bottom-color:#ef4444 !important; }
        .cours-body .fig-chute,        .texte-annote .fig-chute        { background:#312e81 !important; color:#e0e7ff !important; -webkit-text-fill-color:#e0e7ff !important; border-bottom-color:#818cf8 !important; }
        .cours-body .fig-hyperbole,    .texte-annote .fig-hyperbole    { background:#fda4af !important; color:#881337 !important; -webkit-text-fill-color:#881337 !important; border-bottom-color:#f43f5e !important; }
        .cours-body .fig-antiphrase,   .texte-annote .fig-antiphrase   { background:#fed7aa !important; color:#7c2d12 !important; -webkit-text-fill-color:#7c2d12 !important; border-bottom-color:#f97316 !important; }
        .cours-body .fig-pleonasme,    .texte-annote .fig-pleonasme    { background:#bbf7d0 !important; color:#14532d !important; -webkit-text-fill-color:#14532d !important; border-bottom-color:#22c55e !important; }
        .cours-body .fig-these,        .texte-annote .fig-these        { background:#bae6fd !important; color:#0c4a6e !important; -webkit-text-fill-color:#0c4a6e !important; border-bottom-color:#0ea5e9 !important; }
        .cours-body .fig-concession,   .texte-annote .fig-concession   { background:#fbcfe8 !important; color:#831843 !important; -webkit-text-fill-color:#831843 !important; border-bottom-color:#ec4899 !important; }
        .cours-body .fig-relativisme,  .texte-annote .fig-relativisme  { background:#fef08a !important; color:#713f12 !important; -webkit-text-fill-color:#713f12 !important; border-bottom-color:#ca8a04 !important; }
    `;
    document.head.appendChild(s);
})();

// ── TOAST HELPER ─────────────────────────────────────────────
function showToast(msg, type='info') {
    const existing = document.querySelector('.bm-toast');
    if(existing) existing.remove();
    const t = document.createElement('div');
    t.className = 'bm-toast bm-toast-' + type;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(()=>{ t.classList.add('bm-toast-show'); });
    setTimeout(()=>{ t.classList.remove('bm-toast-show'); setTimeout(()=>t.remove(), 350); }, 2800);
}

// ── INIT ─────────────────────────────────────────────────────
goHome();

// ── MUSIC PLAYER ─────────────────────────────────────────────
const TRACKS = [
    'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk&controls=0&modestbranding=1',
    'https://www.youtube.com/embed/yIQd2Ya0Ziw?autoplay=1&loop=1&playlist=yIQd2Ya0Ziw&controls=0&modestbranding=1',
    'https://www.youtube.com/embed/svj_6GOpg7o?autoplay=1&loop=1&playlist=svj_6GOpg7o&controls=0&modestbranding=1',
    'https://www.youtube.com/embed/9Q634rbsypE?autoplay=1&loop=1&playlist=9Q634rbsypE&controls=0&modestbranding=1',
];
let musicOpen = false, curTrackIdx = 0, musicPlaying = false;

function toggleMusicPlayer() {
    musicOpen = !musicOpen;
    const panel = document.getElementById('music-panel');
    const btn   = document.getElementById('music-toggle-btn');
    if(panel) panel.style.display = musicOpen ? 'block' : 'none';
    if(btn)   btn.classList.toggle('music-btn-active', musicOpen);
    if(musicOpen && !musicPlaying) { playTrack(curTrackIdx); }
}

function playTrack(idx) {
    curTrackIdx = idx;
    musicPlaying = true;
    const iframe = document.getElementById('music-iframe');
    if(iframe) iframe.src = TRACKS[idx];
    document.querySelectorAll('.mp-track').forEach((b,i)=>{
        b.classList.toggle('active', i===idx);
    });
}

function setMusicVol(v) {
    // Volume control via postMessage (YouTube API workaround — visual only if iframe blocks)
    const iframe = document.getElementById('music-iframe');
    if(iframe) {
        try { iframe.contentWindow.postMessage(JSON.stringify({event:'command',func:'setVolume',args:[v]}),'*'); }
        catch(e){}
    }
}

// ── LIEN YOUTUBE PERSO (colle n'importe quelle vidéo/playlist) ──
function extractYouTubeEmbed(raw) {
    const url = (raw||'').trim();
    if(!url) return null;
    let m = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if(m) return `https://www.youtube.com/embed/videoseries?list=${m[1]}&autoplay=1&controls=0&modestbranding=1`;
    m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) || url.match(/[?&]v=([a-zA-Z0-9_-]{11})/) || url.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if(m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&loop=1&playlist=${m[1]}&controls=0&modestbranding=1`;
    if(/^[a-zA-Z0-9_-]{11}$/.test(url)) return `https://www.youtube.com/embed/${url}?autoplay=1&loop=1&playlist=${url}&controls=0&modestbranding=1`;
    return null;
}
function playCustomYoutube() {
    const inp = $('yt-custom-url'); if(!inp) return;
    const embed = extractYouTubeEmbed(inp.value);
    if(!embed) { showToast('Lien YouTube non reconnu — colle un lien vidéo ou playlist complet', 'warn'); return; }
    const iframe = document.getElementById('music-iframe');
    if(iframe) iframe.src = embed;
    document.querySelectorAll('.mp-track').forEach(b=>b.classList.remove('active'));
    musicPlaying = true;
    localStorage.setItem('bm_custom_yt', inp.value.trim());
    showToast('🎵 Lecture lancée');
}

// ── DÉMARRAGE ─────────────────────────────────────────────────
// Afficher la page d'accueil dès que le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
    goHome();
    const savedYt = localStorage.getItem('bm_custom_yt');
    const ytInput = document.getElementById('yt-custom-url');
    if(ytInput) {
        if(savedYt) ytInput.value = savedYt;
        ytInput.addEventListener('keydown', e => { if(e.key==='Enter') playCustomYoutube(); });
    }
});

