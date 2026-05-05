
// ════════════════════════════════════════════════════════════
// COURS RENDERER — Transforme le HTML en fiches visuelles
// ════════════════════════════════════════════════════════════
function renderCoursVisuel(html) {
    const cfg = CFG.find(c => c.name === curSubject) || {cls:'fr', icon:'📝', name:''};
    const subjClass = cfg.cls || 'fr';
    const ch = (db[curSubject] && db[curSubject][curChapter]) || {};
    const cards = ch.flashcards || [];
    const mastered = cards.filter(c => (c.interval||0) >= 7).length;
    const pct = cards.length ? Math.round(mastered / cards.length * 100) : 0;

    if (!html || !html.trim()) {
        return `<div class="cv-empty"><div class="cv-empty-icon">📄</div><p>Aucun cours pour l'instant.<br>Clique sur <strong>✏️ Éditer</strong> pour en créer un.</p></div>`;
    }

    function getSectionType(label) {
        const l = label.toLowerCase();
        if (/analogie|comparaison|métaphore|allégorie|personnif|métonymie|périphrase/.test(l)) return 'analogie';
        if (/insistance|répétition|amplification|anaphore|épiphore|gradation|hyperbole|accumulation/.test(l)) return 'insistance';
        if (/atténuation|euphémis|litote/.test(l)) return 'attenu';
        if (/opposition|contraire|antithèse|paradox|oxymore/.test(l)) return 'oppos';
        if (/son|allitér|assonance|rythme|musique/.test(l)) return 'sonore';
        if (/formule|théorème|loi|propriété|démonstr/.test(l)) return 'formule';
        if (/exemple|application|exercice/.test(l)) return 'exemple';
        if (/siècle|époque|période|mouvement|contexte/.test(l)) return 'epoque';
        if (/auteur|écrivain|poète|philosophe|biograph/.test(l)) return 'auteur';
        if (/axe|lecture|commentaire|analyse|problémati/.test(l)) return 'axe';
        if (/définition|généralité|introduction|rappel|essentiel/.test(l)) return 'def';
        return 'generic';
    }

    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const nodes = [...tmp.childNodes];

    let out = '';
    let curSection = null;
    let curCards = [];

    function flushSection() {
        if (!curSection) return;
        const type = getSectionType(curSection);
        out += `<div class="cv-section">
            <div class="cv-section-label cv-label-${type}">${curSection}</div>
            <div class="cv-cards">${curCards.join('')}</div>
        </div>`;
        curSection = null;
        curCards = [];
    }

    function makeCard(li) {
        const strong = li.querySelector('strong, b');
        const term = strong ? strong.textContent.trim() : '';
        const em = li.querySelector('em, i');
        const example = em ? em.textContent.trim() : '';
        const clone = li.cloneNode(true);
        ['strong','b','em','i'].forEach(t => { const el = clone.querySelector(t); if(el) el.remove(); });
        const def = clone.textContent.replace(/^[\s:·–—-]+/, '').trim();
        const type = curSection ? getSectionType(curSection) : 'generic';
        const tagMap = {analogie:'tag-analogie',insistance:'tag-insistance',attenu:'tag-attenu',oppos:'tag-oppos',sonore:'tag-sonore',formule:'tag-formule',generic:'tag-generic'};
        const tagClass = tagMap[type] || 'tag-generic';

        if (term) {
            return `<div class="cv-card">
                <span class="cv-card-tag ${tagClass}">${type}</span>
                <div class="cv-card-body">
                    <div class="cv-card-term">${term}</div>
                    ${def ? `<div class="cv-card-def">${def}</div>` : ''}
                    ${example ? `<div class="cv-card-ex">"${example}"</div>` : ''}
                </div>
            </div>`;
        } else {
            return `<div class="cv-bullet">
                <span class="cv-bullet-dot"></span>
                <div class="cv-bullet-text">${li.innerHTML}</div>
            </div>`;
        }
    }

    // Build chapter header from first H2 or H3
    let chapterTitle = curChapter || '';
    let chapterSub = '';
    // Find first <p> after first heading for subtitle
    const firstP = tmp.querySelector('p');
    if (firstP) {
        const stripped = firstP.textContent.replace(/<[^>]+>/g,'').trim();
        if (stripped.length < 160) chapterSub = stripped;
    }

    // Chapter header
    const iconBgClass = `cv-icon-${subjClass}`;
    out += `<div class="cv-chapter-head">
        <div class="cv-chapter-icon ${iconBgClass}">${cfg.icon}</div>
        <div>
            <div class="cv-chapter-title">${chapterTitle}</div>
            ${chapterSub ? `<div class="cv-chapter-sub">${chapterSub}</div>` : ''}
        </div>
    </div>`;

    let firstPDone = false;

    nodes.forEach(node => {
        if (node.nodeType === 3) {
            const t = node.textContent.trim();
            if (t) { flushSection(); out += `<p class="cv-para">${t}</p>`; }
            return;
        }
        if (node.nodeType !== 1) return;
        const tag = node.tagName.toLowerCase();

        if (tag === 'h2') {
            flushSection();
            out += `<div class="cv-h2">${node.textContent.trim()}</div>`;
        } else if (tag === 'h3') {
            flushSection();
            curSection = node.textContent.trim();
        } else if (tag === 'ul' || tag === 'ol') {
            const items = [...node.querySelectorAll('li')];
            if (curSection) {
                items.forEach(li => curCards.push(makeCard(li)));
            } else {
                out += `<ul class="cv-list">${items.map(li => `<li class="cv-li">${li.innerHTML}</li>`).join('')}</ul>`;
            }
        } else if (tag === 'p') {
            const txt = node.innerHTML.trim();
            if (!txt) return;
            // Skip the subtitle p we already used in header
            if (!firstPDone && chapterSub && node.textContent.trim() === chapterSub) { firstPDone = true; return; }
            firstPDone = true;
            flushSection();
            out += `<p class="cv-para">${txt}</p>`;
        } else if (tag === 'blockquote') {
            flushSection();
            out += `<div class="cv-quote">${node.innerHTML}</div>`;
        } else if (tag === 'div' && (node.classList.contains('formula-box') || node.classList.contains('info-box'))) {
            flushSection();
            out += `<div class="cv-formula">${node.innerHTML}</div>`;
        } else {
            flushSection();
            out += node.outerHTML;
        }
    });

    flushSection();

    const progress = cards.length > 0 ? `
        <div class="cv-progress">
            <span class="cv-progress-label">Flashcards maîtrisées</span>
            <div class="cv-progress-bar"><div class="cv-progress-fill" style="width:${pct}%"></div></div>
            <span class="cv-progress-count">${mastered}/${cards.length}</span>
        </div>` : '';

    return `<div class="cv-root cv-subj-${subjClass}" id="printable-cours">${out}${progress}</div>`;
}

/* ============================================================
   BACMASTER v3 — script.js  (moteur de l'application)
   ============================================================ */

// ── MIGRATION & BASE DE DONNÉES ──────────────────────────────
let db = {};
const _n = localStorage.getItem('bacmaster_db');
const _o = localStorage.getItem('my_db');
if (_n) { db = JSON.parse(_n); }
else if (_o) { db = JSON.parse(_o); }

// Injecter les cours pré-chargés si le chapitre est vide/absent
Object.entries(PREBUILT).forEach(([subj, chapters]) => {
    if (!db[subj]) db[subj] = {};
    Object.entries(chapters).forEach(([ch, data]) => {
        if (!db[subj][ch]) {
            db[subj][ch] = {
                cours: data.cours,
                flashcards: data.flashcards.map(f => ({
                    q: f.q, a: f.a, score: 0, interval: 0, ease: 2.5, due: null
                }))
            };
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
    {name:'Maths Spé',   icon:'📐', cls:'math'},
    {name:'SES',         icon:'📈', cls:'ses'},
    {name:'Anglais Spé', icon:'🇬🇧', cls:'en'},
    {name:'Histoire-Géo',icon:'🗺️', cls:'hg'},
    {name:'Anglais',     icon:'🌍', cls:'ang'},
    {name:'Espagnol',    icon:'🇪🇸', cls:'esp'},
    {name:'SVT',         icon:'🧬', cls:'svt'},
    {name:'Physique-Chimie', icon:'⚗️', cls:'phy'},
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
    setTimeout(()=>M().classList.remove('animate'),300);
    window.scrollTo(0,0);
}


// ── CUSTOM MODALS ─────────────────────────────────────────────
function showStopModal(mode) {
    const labels = { srs:'la session Flashcards', qcm:'le QCM', intensive:'la session Intensive' };
    showConfirmModal(
        '⏹️ Arrêter ' + (labels[mode]||'la session') + ' ?',
        'Ta progression de cette session ne sera pas sauvegardée.',
        () => { clearInterval(qTimer); if(mode==='qcm') openQCM(); else goSubject(curSubject); }
    );
}

function showConfirmModal(title, body, onConfirm) {
    const existing = document.getElementById('bm-modal');
    if (existing) existing.remove();
    const m = document.createElement('div');
    m.id = 'bm-modal';
    m.className = 'bm-modal-overlay';
    m.innerHTML = `
        <div class="bm-modal-box">
            <div class="bm-modal-title">${title}</div>
            <div class="bm-modal-body">${body}</div>
            <div class="bm-modal-actions">
                <button class="bm-modal-cancel" onclick="document.getElementById('bm-modal').remove()">Annuler</button>
                <button class="bm-modal-confirm" id="bm-modal-ok">Confirmer</button>
            </div>
        </div>`;
    document.body.appendChild(m);
    document.getElementById('bm-modal-ok').onclick = () => { m.remove(); onConfirm(); };
    requestAnimationFrame(() => m.classList.add('bm-modal-show'));
}

function goHome() {
    clearInterval(qTimer);
    render(`
        <div class="page-head animate">
            <h1>Mes Matières</h1>
            <p>Sélectionne une matière pour commencer à réviser</p>
        </div>
        <div class="subjects-grid">
            ${CFG.map(s=>{
                const st = subStats(s.name);
                const pct = st.total ? Math.round(st.mastered/st.total*100) : 0;
                const c = {fr:'#059669',math:'#4f46e5',ses:'#d97706',en:'#1d4ed8',hg:'#9f1239'}[s.cls];
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
    `);
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
                return `<div class="chcard-big" onclick="curChapter='${esc(ch)}';curTab='${mode}';renderChapter()">
                    <div class="chcard-big-top">
                        <div class="chcard-big-name">${ch}</div>
                        <button class="chcard-big-del" onclick="event.stopPropagation();deleteChapter('${esc(ch)}')" title="Supprimer">🗑️</button>
                    </div>
                    <div class="chcard-big-meta">
                        <span>📋 ${cards.length} cartes</span>
                        ${due > 0 ? `<span class="chcard-big-due">⏰ ${due} à réviser</span>` : '<span class="chcard-big-ok">✓ À jour</span>'}
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
        box.innerHTML = `<div class="cours-print-bar"><button class="bc-btn print-btn" onclick="window.print()">🖨️ Imprimer</button></div>` + renderCoursVisuel(data.cours || '');
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([box]).catch(()=>{});
        }
    }
    else if(curTab==='edit') {
        box.innerHTML = `
            <div class="editor-toolbar">
                <button onclick="fmt('bold')"><b>G</b></button>
                <button onclick="fmt('italic')"><i>I</i></button>
                <button onclick="fmt('underline')"><u>S</u></button>
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
            <div id="editor" contenteditable="true" class="editor-area">${data.cours||''}</div>
            <button class="btn-save" id="sbtn" onclick="saveCours()">💾 Enregistrer</button>
        `;
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
    const newName = prompt('Nouveau nom du chapitre :', oldName);
    if(!newName || newName.trim()==='' || newName===oldName) return;
    const trimmed = newName.trim();
    if(db[curSubject][trimmed]){ showToast('Ce nom existe déjà !','warn'); return; }
    db[curSubject][trimmed] = db[curSubject][oldName];
    delete db[curSubject][oldName];
    if(curChapter===oldName) curChapter=trimmed;
    save(); goSubject(curSubject);
}

function deleteChapter(ch) {
    const n = (db[curSubject][ch].flashcards||[]).length;
    showConfirmModal(
        '🗑️ Supprimer ce chapitre ?',
        `<strong>${ch}</strong> et ses ${n} carte(s) seront définitivement supprimés.`,
        () => { delete db[curSubject][ch]; save(); goModeChapters(curTab==='voc'?'voc':'cours'); }
    );
}

function fmt(cmd,val=null){ document.execCommand(cmd,false,val); $('editor')&&$('editor').focus(); }
function applyHL(){ document.execCommand('hiliteColor',false,$('hlc').value); $('editor')&&$('editor').focus(); }

function saveCours(){
    const ed=$('editor'); if(!ed)return;
    db[curSubject][curChapter].cours=ed.innerHTML; save();
    const b=$('sbtn'); b.textContent='✅ Enregistré !'; b.classList.add('saved');
    setTimeout(()=>{if(b){b.textContent='💾 Enregistrer';b.classList.remove('saved');}},2000);
}

function delVoc(i){
    if(!confirm('Supprimer ce mot ?'))return;
    db[curSubject][curChapter].flashcards.splice(i,1); save(); renderTabContent();
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
    // Raté=5min fixe, Dur=15min fixe, Bien=30min fixe
    // Facile=1h puis double à chaque fois (stocké dans card.easyInterval)
    const ei=card.easyInterval||60; // minutes
    function fmt(m){ return m<60 ? m+'min' : Math.round(m/60)+'h'; }
    switch(r){
        case'again': return '5min';
        case'hard':  return '15min';
        case'good':  return '30min';
        case'easy':  return fmt(ei);
    }
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
            <button class="bc-btn" onclick="showStopModal('srs')">✕ Arrêter</button>
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
    }
    const rr=$('rating-row');if(rr)rr.style.display='grid';
    if(isRight){const g=document.querySelector('.r-btn.r-good');if(g)g.focus();}
    else{const a=document.querySelector('.r-btn.r-again');if(a)a.focus();}
}

function rateSRS(r){
    if(!srsCur)return;
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

    const now=Date.now();
    const ei=card.easyInterval||60; // minutes pour "Facile" (double à chaque fois)
    let newDue, newEasyInterval, scoreChange;
    switch(r){
        case'again':
            // 5 minutes fixes — carte revient tout de suite
            newDue=now+5*60*1000;
            newEasyInterval=60; // reset facile à 1h
            scoreChange=-2;
            srsAgain.push(srsCur); sessStats.wrong++;
            break;
        case'hard':
            // 15 minutes fixes
            newDue=now+15*60*1000;
            newEasyInterval=60; // reset facile à 1h
            scoreChange=-1;
            sessDone++; sessStats.wrong++;
            break;
        case'good':
            // 30 minutes fixes
            newDue=now+30*60*1000;
            newEasyInterval=ei; // facile reste inchangé
            scoreChange=1;
            sessDone++; sessStats.right++;
            break;
        case'easy':
            // 1h puis double à chaque fois (max 30 jours)
            newDue=now+ei*60*1000;
            newEasyInterval=Math.min(ei*2, 30*24*60); // double, max 30j
            scoreChange=2;
            sessDone++; sessStats.right++;
            break;
    }
    const cards=db[curSubject][ch].flashcards;
    const idx=cards.findIndex(c=>c.q===card.q&&c.a===card.a);
    if(idx!==-1){
        cards[idx].due=newDue;
        cards[idx].easyInterval=newEasyInterval;
        cards[idx].score=(cards[idx].score||0)+scoreChange;
        // On garde interval pour compatibilité avec le reste du code
        cards[idx].interval=r==='easy'?Math.round(newEasyInterval/60/24):0;
    }
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
                <option value="5">5 questions</option>
                <option value="10" selected>10 questions</option>
                <option value="20">20 questions</option>
                <option value="0">Tout le vocabulaire</option>
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
    const seen=new Set(); let all=[];
    cbs.forEach(cb=>{
        (db[curSubject][cb.value].flashcards||[]).forEach(c=>{
            const k=c.q+'|'+c.a;
            if(!seen.has(k)){seen.add(k);all.push(c);}
        });
    });
    if(all.length<2){showToast('Il faut au moins 2 mots pour générer un QCM !','warn');return;}
    all=all.sort(()=>Math.random()-.5);
    if(n>0)all=all.slice(0,n);
    qcmList=all.map(card=>{
        const wrong=all.filter(c=>c.a!==card.a).sort(()=>Math.random()-.5).slice(0,3);
        const opts=[...wrong.map(c=>c.a),card.a].sort(()=>Math.random()-.5);
        return{q:card.q,correct:card.a,opts};
    });
    qcmIdx=0; qcmScore=0; qSecs=0;
    clearInterval(qTimer);
    qTimer=setInterval(()=>{ qSecs++; },1000);
    renderQCM();
}

function renderQCM(){
    if(qcmIdx>=qcmList.length){renderQCMResults();return;}
    qcmCur=qcmList[qcmIdx];
    const {q,opts}=qcmCur;
    const pct=Math.round(qcmIdx/qcmList.length*100);
    const letters=['A','B','C','D'];
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="showStopModal('qcm')">✕ Arrêter</button>
        </div>
        <div class="ws-box">
        <div class="qcm-wrap">
            <div class="srs-prog-row">
                <span>Question <b>${qcmIdx+1}</b> / ${qcmList.length}</span>
                <span>Score : <b>${qcmScore}/${qcmIdx}</b></span>
            </div>
            <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
            <div class="qcm-q-box">
                <div class="qcm-q-label">Définition / traduction de :</div>
                <div class="qcm-q-text">${q}</div>
            </div>
            <div class="qcm-opts">
                ${opts.map((o,i)=>`<button class="qcm-opt" id="opt${i}" onclick="answerQCM(${i})">
                    <span class="opt-letter">${letters[i]}.</span><span>${o}</span>
                </button>`).join('')}
            </div>
            <button class="qcm-next" id="qnext" onclick="nextQCM()">
                ${qcmIdx+1<qcmList.length?'Question suivante →':'Voir les résultats →'}
            </button>
        </div>
        </div>
    `);
}

function answerQCM(i){
    if(!qcmCur)return;
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
