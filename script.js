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
    setTimeout(()=>{ M().classList.remove('animate'); typesetMath(M()); }, 50);
    window.scrollTo(0,0);
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
    if(!confirm(`Supprimer "${ch}" et ses ${n} mot(s) ? Cette action est irréversible.`)) return;
    delete db[curSubject][ch];
    save(); goSubject(curSubject);
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
    const iv=card.interval||0; const e=card.ease||2.5;
    const d=n=>n+'j';
    switch(r){
        case'again':return '15 min';
        case'hard': return d(iv===0?1:Math.max(1,Math.round(iv*1.2)));
        case'good': return d(iv===0?3:Math.max(1,Math.round(iv*e)));
        case'easy': return d(iv===0?7:Math.max(4,Math.round(iv*e*1.3)));
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
            <button class="bc-btn" onclick="if(confirm('Arrêter la session ?')){clearInterval(qTimer);goSubject('${esc(curSubject)}');}">✕ Arrêter</button>
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
            <button class="bc-btn" onclick="if(confirm('Arrêter le QCM ?')){openQCM();}">✕ Arrêter</button>
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


// ── MATHJAX HELPER ────────────────────────────────────────────
function typesetMath(el) {
    el = el || document.getElementById('main');
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([el]).catch(e => console.warn('MathJax:', e));
    }
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


// ── STYLES COURS — INJECTION GARANTIE ────────────────────────
// Injectés via JS pour éviter tout conflit CSS (spécificité, @media print, etc.)
(function() {
    const id = 'bm-cours-styles';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
        /* Wrapper */
        .cours-body { font-size:1rem; line-height:1.9; color:#334155; max-width:740px; margin:0 auto; padding-bottom:32px; }

        /* H2 — violet, visible garanti */
        .cours-body h2 {
            font-family:'Sora',sans-serif; font-size:1.4rem; font-weight:800;
            color:#4f46e5 !important; -webkit-text-fill-color:#4f46e5 !important;
            background:none !important; -webkit-background-clip:unset !important;
            margin:0 0 1.2em; padding-bottom:12px;
            border-bottom:3px solid #e0e7ff;
        }

        /* H3 — bandeau bleu pâle */
        .cours-body h3 {
            font-family:'Sora',sans-serif; font-size:1rem; font-weight:700;
            color:#1e1b4b !important; -webkit-text-fill-color:#1e1b4b !important;
            background:linear-gradient(90deg,#eef2ff,#f5f3ff 80%,transparent) !important;
            border-left:4px solid #4f46e5; border-radius:0 12px 12px 0;
            padding:9px 14px 9px 18px; margin:1.8em 0 .8em;
            border-bottom:none !important;
        }

        /* Paragraphes */
        .cours-body p { margin-bottom:1em; line-height:1.9; color:#334155 !important; }

        /* Strong = bleu */
        .cours-body strong, .cours-body b {
            color:#4338ca !important; -webkit-text-fill-color:#4338ca !important; font-weight:700;
        }
        /* Em = violet */
        .cours-body em, .cours-body i {
            color:#7c3aed !important; -webkit-text-fill-color:#7c3aed !important; font-style:italic;
        }

        /* Listes — cartes interactives */
        .cours-body ul, .cours-body ol {
            padding:0; margin:.6em 0 1.4em; list-style:none; display:flex; flex-direction:column; gap:8px;
        }
        .cours-body li {
            position:relative; padding:10px 14px 10px 2.6em;
            background:#f8faff; border:1.5px solid #e0e7ff; border-radius:12px;
            font-size:.95rem; line-height:1.65; color:#1e293b !important;
            -webkit-text-fill-color:#1e293b !important; margin:0;
            transition:all .18s;
        }
        .cours-body li:hover {
            border-color:#6366f1; background:#eef2ff; transform:translateX(4px);
            box-shadow:0 2px 10px rgba(99,102,241,.12);
        }
        .cours-body ul > li::before {
            content:'▸'; position:absolute; left:.85em; top:50%; transform:translateY(-50%);
            color:#6366f1; font-size:.95em; font-weight:700;
        }
        .cours-body ol { counter-reset:ol-cours; }
        .cours-body ol > li { counter-increment:ol-cours; }
        .cours-body ol > li::before {
            content:counter(ol-cours); position:absolute; left:.55em; top:50%; transform:translateY(-50%);
            width:1.5em; height:1.5em; background:#4f46e5; color:#fff !important;
            -webkit-text-fill-color:#fff !important; border-radius:50%; font-size:.72em; font-weight:800;
            display:flex; align-items:center; justify-content:center;
        }

        /* Citations */
        .cours-body blockquote, .cours-body .quote-box {
            margin:1.4em 0; padding:18px 20px 18px 26px;
            background:linear-gradient(135deg,#f5f3ff,#ede9fe);
            border-left:6px solid #7c3aed; border-radius:0 18px 18px 0;
            font-style:italic; font-size:1rem; line-height:1.8;
            color:#4c1d95 !important; -webkit-text-fill-color:#4c1d95 !important;
            box-shadow:0 4px 20px rgba(124,58,237,.12); position:relative;
        }
        .cours-body blockquote::before {
            content:'"'; position:absolute; top:-14px; left:16px;
            font-size:4.5rem; color:#7c3aed; opacity:.15;
            font-family:Georgia,serif; line-height:1; pointer-events:none;
        }

        /* Formula box */
        .formula-box {
            background:linear-gradient(135deg,#eff6ff,#dbeafe);
            border-left:5px solid #3b82f6; border-radius:0 16px 16px 0;
            padding:16px 20px; margin:16px 0; font-size:.93rem; line-height:1.9;
            color:#1e3a5f !important; -webkit-text-fill-color:#1e3a5f !important;
            box-shadow:0 3px 16px rgba(59,130,246,.1);
        }
        .formula-box strong, .formula-box b {
            color:#1d4ed8 !important; -webkit-text-fill-color:#1d4ed8 !important;
        }

        /* Mobile */
        @media (max-width:600px) {
            .cours-body h2 { font-size:1.2rem !important; }
            .cours-body h3 { font-size:.95rem !important; padding:8px 12px 8px 14px !important; }
            .cours-body li { font-size:.93rem !important; }
            .cours-body blockquote { font-size:.94rem !important; }
        }
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
