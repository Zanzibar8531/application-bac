/* ============================================================
   BACMASTER v2.0 — script.js
   SRS (Spaced Repetition System) style Anki + QCM auto-généré
   ============================================================ */

// ── Migration des données v1 ─────────────────────────────────
let db = {};
const _new = localStorage.getItem('bacmaster_db');
const _old = localStorage.getItem('my_db');
if (_new) {
    db = JSON.parse(_new);
} else if (_old) {
    db = JSON.parse(_old);
    localStorage.setItem('bacmaster_db', JSON.stringify(db));
    console.log('Migration v1 → v2 effectuée.');
}

// ── État global ──────────────────────────────────────────────
let currentSubject  = '';
let currentModule   = '';
let selectedChapters = [];

// SRS
let srsQueue      = [];
let srsAgainQueue = [];
let srsCurrent    = null;
let srsFlipped    = false;
let sessionDone   = 0;
let sessionTotal  = 0;
let sessionStats  = { seen: 0, right: 0, wrong: 0 };
let quizTimer     = null;
let quizSecs      = 0;

// QCM
let qcmList    = [];
let qcmIdx     = 0;
let qcmScore   = 0;
let qcmCurrent = null;

const ALL_SUBJECTS = [
    'Anglais','Anglais Spé 1','Anglais Spé 2',
    'Maths','Français','SES','Physique','Histoire','Espagnol'
];

// ============================================================
// DONNÉES
// ============================================================
function save() {
    localStorage.setItem('bacmaster_db', JSON.stringify(db));
}

function ensureSubject(name) {
    if (!db[name]) db[name] = {};
    if (Object.keys(db[name]).length === 0) {
        db[name]['Général'] = { cours: '', flashcards: [] };
    }
}

function isDue(card) {
    return !card.due || Date.now() >= card.due;
}

function subjectStats(name) {
    if (!db[name]) return { total: 0, due: 0, mastered: 0 };
    let total = 0, due = 0, mastered = 0;
    Object.values(db[name]).forEach(ch => {
        (ch.flashcards || []).forEach(c => {
            total++;
            if (isDue(c)) due++;
            if ((c.interval || 0) >= 7) mastered++;
        });
    });
    return { total, due, mastered };
}

// ============================================================
// NAVIGATION
// ============================================================
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}
function closeMenu() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    window.scrollTo(0, 0);
}

function showHome() {
    ALL_SUBJECTS.forEach(s => {
        const el = document.getElementById('meta-' + s);
        if (!el) return;
        const st = subjectStats(s);
        if (st.total === 0) { el.innerHTML = '<span style="color:#cbd5e1">Aucun mot</span>'; return; }
        const pct = Math.round(st.mastered / st.total * 100);
        el.innerHTML = `
            <div class="scard-progress">
                <div class="scard-prog-fill" style="width:${pct}%; background:${pct >= 70 ? '#10b981' : '#6366f1'}"></div>
            </div>
            <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
                ${st.due > 0
                    ? `<span class="scard-badge">${st.due} à réviser</span>`
                    : `<span class="scard-badge ready">✓ À jour</span>`}
                <span style="color:#94a3b8; font-size:.72rem;">${st.total} mots · ${pct}%</span>
            </div>
        `;
    });
    showPage('home');
}

function openSubject(name) {
    currentSubject = name;
    ensureSubject(name);
    document.getElementById('subject-title').innerText = name;
    showPage('subject');
}

function openWorkspace(type) {
    currentModule = type;
    clearInterval(quizTimer);

    const titles = {
        'cours-read': '📖 Cours',
        'cours-edit': '✏️ Éditeur de cours',
        'voc-read':   '📚 Dictionnaire',
        'voc-add':    '➕ Ajouter des mots',
        'flashcards': '🎴 Flashcards SRS',
        'eval':       '🧠 Exercices QCM'
    };
    document.getElementById('workspace-title').innerText = titles[type] || type;

    const chapters = Object.keys(db[currentSubject]);
    if (!['flashcards', 'eval'].includes(type)) {
        if (!selectedChapters[0] || !db[currentSubject][selectedChapters[0]]) {
            selectedChapters = [chapters[0]];
        }
    }

    renderChapBar();
    renderWorkspace();
    showPage('workspace');
}

// ============================================================
// CHAPITRES
// ============================================================
function renderChapBar() {
    const bar = document.getElementById('chap-bar');
    if (['flashcards', 'eval'].includes(currentModule)) {
        bar.style.display = 'none';
        return;
    }
    bar.style.display = 'flex';
    const chapters = Object.keys(db[currentSubject]);
    bar.innerHTML = chapters.map(ch =>
        `<button class="chip ${selectedChapters.includes(ch) ? 'active' : ''}" onclick="selectChap('${esc(ch)}')">
            ${ch}
        </button>`
    ).join('') + `<button class="chip add-chip" onclick="addChap()">+ Nouveau</button>`;
}

function selectChap(ch) {
    selectedChapters = [ch];
    renderChapBar();
    renderWorkspace();
}

function addChap() {
    let name = 'Sans titre', n = 1;
    while (db[currentSubject][name]) { n++; name = 'Sans titre ' + n; }
    db[currentSubject][name] = { cours: '', flashcards: [] };
    selectedChapters = [name];
    save();
    renderChapBar();
    renderWorkspace();
}

function renameChap(oldName, newName) {
    newName = newName.trim();
    if (!newName || newName === oldName) return;
    if (db[currentSubject][newName]) { alert('Ce nom existe déjà !'); return; }
    db[currentSubject][newName] = db[currentSubject][oldName];
    delete db[currentSubject][oldName];
    selectedChapters = selectedChapters.map(c => c === oldName ? newName : c);
    save();
    renderChapBar();
}

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

// ============================================================
// ROUTER WORKSPACE
// ============================================================
function renderWorkspace() {
    const box = document.getElementById('workspace-inner');
    switch (currentModule) {
        case 'cours-read': renderCoursRead(box);   break;
        case 'cours-edit': renderCoursEdit(box);   break;
        case 'voc-read':   renderVocRead(box);     break;
        case 'voc-add':    renderVocAdd(box);      break;
        case 'flashcards': renderSRSSetup(box);    break;
        case 'eval':       renderQCMSetup(box);    break;
    }
}

// ============================================================
// COURS — LECTURE
// ============================================================
function renderCoursRead(box) {
    const chap = selectedChapters[0];
    const data = db[currentSubject][chap];
    box.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border);">
            <span style="font-size:1.2rem;">📌</span>
            <input class="chap-title-input" value="${chap}"
                   onblur="renameChap('${esc(chap)}', this.value)"
                   onkeydown="if(event.key==='Enter')this.blur()">
        </div>
        <div class="cours-reader">${data.cours || '<p style="color:#94a3b8;font-style:italic;">Aucun cours pour ce chapitre.</p>'}</div>
    `;
}

// ============================================================
// COURS — ÉDITION
// ============================================================
function renderCoursEdit(box) {
    const chap = selectedChapters[0];
    const data = db[currentSubject][chap];
    box.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border);">
            <span style="font-size:1.2rem;">📌</span>
            <input class="chap-title-input" value="${chap}"
                   onblur="renameChap('${esc(chap)}', this.value)"
                   onkeydown="if(event.key==='Enter')this.blur()">
        </div>
        <div class="editor-toolbar">
            <button onclick="fmt('bold')"><b>B</b></button>
            <button onclick="fmt('italic')"><i>I</i></button>
            <button onclick="fmt('underline')"><u>U</u></button>
            <select onchange="fmt('fontSize',this.value);this.value='3'">
                <option value="3">Taille normale</option>
                <option value="5">Titre</option>
                <option value="7">Grand titre</option>
            </select>
            <select onchange="fmt('foreColor',this.value);this.selectedIndex=0">
                <option value="">Couleur texte</option>
                <option value="#0f172a">Noir</option>
                <option value="#1d4ed8">Bleu</option>
                <option value="#dc2626">Rouge</option>
                <option value="#059669">Vert</option>
                <option value="#d97706">Orange</option>
            </select>
            <div class="hl-row">
                <input type="color" id="hl-color" value="#fef08a" title="Couleur de surlignage">
                <button class="hl-btn" onclick="applyHL()" title="Surligner la sélection">🖍️ Surligner</button>
            </div>
        </div>
        <div id="editor" contenteditable="true" class="editor-area">${data.cours || ''}</div>
        <button class="btn-save" id="save-btn" onclick="saveCours()">💾 Enregistrer</button>
    `;
}

function fmt(cmd, val = null) {
    document.execCommand(cmd, false, val);
    document.getElementById('editor')?.focus();
}

function applyHL() {
    const color = document.getElementById('hl-color').value;
    document.execCommand('hiliteColor', false, color);
    document.getElementById('editor')?.focus();
}

function saveCours() {
    const ed = document.getElementById('editor');
    if (!ed) return;
    db[currentSubject][selectedChapters[0]].cours = ed.innerHTML;
    save();
    const btn = document.getElementById('save-btn');
    btn.textContent = '✅ Enregistré !';
    btn.classList.add('saved');
    setTimeout(() => { btn.textContent = '💾 Enregistrer'; btn.classList.remove('saved'); }, 2200);
}

// ============================================================
// VOC — LECTURE
// ============================================================
function renderVocRead(box) {
    const cards = db[currentSubject][selectedChapters[0]].flashcards || [];
    if (cards.length === 0) {
        box.innerHTML = '<p style="color:#94a3b8;font-style:italic;text-align:center;padding:30px;">Aucun mot dans ce chapitre.</p>';
        return;
    }
    box.innerHTML = `
        <p style="color:var(--muted);font-size:.82rem;margin-bottom:12px;">${cards.length} mot(s)</p>
        <div class="voc-table">
            ${cards.map((c, i) => `
                <div class="voc-row">
                    <span class="voc-term">${c.q}</span>
                    <span class="voc-def">${c.a}</span>
                    <button class="voc-del" onclick="deleteVoc(${i})" title="Supprimer">🗑</button>
                </div>
            `).join('')}
        </div>
    `;
}

function deleteVoc(idx) {
    if (!confirm('Supprimer ce mot ?')) return;
    db[currentSubject][selectedChapters[0]].flashcards.splice(idx, 1);
    save();
    renderWorkspace();
}

// ============================================================
// VOC — AJOUT
// ============================================================
function renderVocAdd(box) {
    const chapHtml = Object.keys(db[currentSubject]).map(ch => `
        <label class="cb-item">
            <input type="checkbox" class="voc-cb" value="${ch}" ${selectedChapters.includes(ch) ? 'checked' : ''}>
            <span style="flex:1;">${ch}</span>
        </label>
    `).join('');

    box.innerHTML = `
        <p style="font-weight:700;margin-bottom:12px;">Ajouter dans :</p>
        <div class="cb-list" style="margin-bottom:18px;">${chapHtml}</div>
        <input type="text" id="voc-q" class="field" placeholder="Mot / Question">
        <input type="text" id="voc-a" class="field" placeholder="Définition / Réponse"
               onkeydown="if(event.key==='Enter')addVoc()">
        <button class="btn-save" onclick="addVoc()">➕ Ajouter</button>
        <div id="voc-fb" style="min-height:30px;"></div>
    `;
    document.getElementById('voc-q').focus();
}

function addVoc() {
    const q = document.getElementById('voc-q').value.trim();
    const a = document.getElementById('voc-a').value.trim();
    if (!q || !a) return;
    const cbs = document.querySelectorAll('.voc-cb:checked');
    if (!cbs.length) { alert('Sélectionne au moins un chapitre.'); return; }
    cbs.forEach(cb => {
        db[currentSubject][cb.value].flashcards.push({ q, a, score: 0, due: null, interval: 0, ease: 2.5 });
    });
    save();
    document.getElementById('voc-q').value = '';
    document.getElementById('voc-a').value = '';
    document.getElementById('voc-q').focus();
    const fb = document.getElementById('voc-fb');
    fb.innerHTML = `<p style="color:#059669;font-weight:700;padding:8px 0 0;">✅ "${q}" ajouté !</p>`;
    setTimeout(() => { if (fb) fb.innerHTML = ''; }, 2200);
}

// ============================================================
// FLASHCARDS SRS — SETUP
// ============================================================
function renderSRSSetup(box) {
    srsFlipped = false;
    const chapters = Object.keys(db[currentSubject]);
    const chapHtml = chapters.map(ch => {
        const cards = db[currentSubject][ch].flashcards || [];
        const due = cards.filter(isDue).length;
        return `
            <label class="cb-item">
                <input type="checkbox" class="srs-cb" value="${ch}">
                <span style="flex:1;">${ch}</span>
                <span class="cb-item-right" style="color:${due > 0 ? '#6366f1' : '#94a3b8'}">
                    ${due > 0 ? `${due} à réviser` : `0/${cards.length}`}
                </span>
            </label>
        `;
    }).join('');

    box.innerHTML = `
        <div class="setup-wrap">
            <h3>🎴 Session Flashcards SRS</h3>
            <div class="setup-info blue">
                <b>Système SRS (Anki) :</b> 4 niveaux de difficulté — les cartes difficiles reviennent plus vite, les cartes maîtrisées moins souvent.
            </div>
            <p style="font-weight:700;margin-bottom:10px;">Chapitres à réviser :</p>
            <div class="cb-list">${chapHtml}</div>
            <div class="btn-row">
                <button class="back-btn" onclick="document.querySelectorAll('.srs-cb').forEach(c=>c.checked=true)">Tout cocher</button>
                <button class="back-btn" onclick="document.querySelectorAll('.srs-cb').forEach(c=>c.checked=false)">Tout décocher</button>
            </div>
            <button class="btn-primary" onclick="startSRS()">🚀 Commencer la révision</button>
        </div>
    `;
}

// ============================================================
// FLASHCARDS SRS — SESSION
// ============================================================
function startSRS() {
    const cbs = document.querySelectorAll('.srs-cb:checked');
    if (!cbs.length) { alert('Sélectionne au moins un chapitre !'); return; }
    selectedChapters = Array.from(cbs).map(c => c.value);

    const seen = new Set();
    srsQueue = [];

    selectedChapters.forEach(ch => {
        (db[currentSubject][ch].flashcards || []).forEach(c => {
            const key = c.q + '|' + c.a;
            if (!seen.has(key) && isDue(c)) {
                seen.add(key);
                srsQueue.push({ card: c, ch });
            }
        });
    });

    if (!srsQueue.length) {
        const box = document.getElementById('workspace-inner');
        box.innerHTML = `
            <div style="text-align:center;padding:50px 20px;">
                <div style="font-size:3rem;margin-bottom:12px;">🎉</div>
                <h3 style="font-family:'Sora',sans-serif;margin-bottom:8px;">Tout est à jour !</h3>
                <p style="color:var(--muted);margin-bottom:24px;">Reviens plus tard quand des cartes seront à réviser.</p>
                <button class="btn-primary" onclick="renderSRSSetup(document.getElementById('workspace-inner'))">← Retour</button>
            </div>
        `;
        return;
    }

    // Mélange du deck
    srsQueue = srsQueue.sort(() => Math.random() - 0.5);
    srsAgainQueue = [];
    sessionDone = 0;
    sessionTotal = srsQueue.length;
    sessionStats = { seen: 0, right: 0, wrong: 0 };
    quizSecs = 0;

    clearInterval(quizTimer);
    quizTimer = setInterval(() => {
        quizSecs++;
        const el = document.getElementById('srs-timer');
        if (el) {
            const m = String(Math.floor(quizSecs / 60)).padStart(2, '0');
            const s = String(quizSecs % 60).padStart(2, '0');
            el.textContent = `${m}:${s}`;
        }
    }, 1000);

    renderSRSCard();
}

function renderSRSCard() {
    srsCurrent = srsQueue.shift() || srsAgainQueue.shift() || null;
    srsFlipped = false;

    const box = document.getElementById('workspace-inner');
    if (!srsCurrent) { renderSRSResults(box); return; }

    const { card } = srsCurrent;
    const remaining = srsQueue.length + srsAgainQueue.length;
    const total = sessionTotal + srsAgainQueue.length;
    const progress = total > 0 ? Math.round(sessionDone / total * 100) : 0;

    const m = String(Math.floor(quizSecs / 60)).padStart(2, '0');
    const s = String(quizSecs % 60).padStart(2, '0');

    box.innerHTML = `
        <div class="srs-wrap">
            <div class="prog-row">
                <span>${sessionDone + 1} / ${total}</span>
                <span id="srs-timer">${m}:${s}</span>
                <span>${remaining} restante${remaining > 1 ? 's' : ''}</span>
            </div>
            <div class="prog-bar-outer">
                <div class="prog-bar-inner" style="width:${progress}%"></div>
            </div>

            <div class="fc-scene" onclick="flipSRS()">
                <div class="fc-3d" id="fc-3d">
                    <div class="fc-face fc-front">
                        <span class="fc-label">Question</span>
                        <span class="fc-text">${card.q}</span>
                        <span class="fc-hint">Appuie pour voir la réponse</span>
                    </div>
                    <div class="fc-face fc-back">
                        <span class="fc-label">Réponse</span>
                        <span class="fc-text">${card.a}</span>
                    </div>
                </div>
            </div>

            <div id="srs-hint" style="text-align:center;color:var(--muted);font-size:.88rem;padding:14px 0;">
                👆 Clique sur la carte pour révéler la réponse
            </div>

            <div id="rating-row" class="rating-row" style="display:none;">
                <button class="r-btn r-again" onclick="rateSRS('again')">
                    Encore
                    <span class="r-delay">${srsDelay(card, 'again')}</span>
                </button>
                <button class="r-btn r-hard" onclick="rateSRS('hard')">
                    Difficile
                    <span class="r-delay">${srsDelay(card, 'hard')}</span>
                </button>
                <button class="r-btn r-good" onclick="rateSRS('good')">
                    Bien
                    <span class="r-delay">${srsDelay(card, 'good')}</span>
                </button>
                <button class="r-btn r-easy" onclick="rateSRS('easy')">
                    Facile
                    <span class="r-delay">${srsDelay(card, 'easy')}</span>
                </button>
            </div>

            <div class="srs-stats" style="margin-top:16px;">
                <div class="srs-stat">
                    <div class="srs-stat-n" style="color:#6366f1">${sessionStats.seen}</div>
                    <div class="srs-stat-l">Vues</div>
                </div>
                <div class="srs-stat">
                    <div class="srs-stat-n" style="color:#059669">${sessionStats.right}</div>
                    <div class="srs-stat-l">Bien</div>
                </div>
                <div class="srs-stat">
                    <div class="srs-stat-n" style="color:#dc2626">${sessionStats.wrong}</div>
                    <div class="srs-stat-l">À revoir</div>
                </div>
            </div>
        </div>
    `;
}

function flipSRS() {
    if (srsFlipped) return;
    srsFlipped = true;
    document.getElementById('fc-3d').classList.add('flipped');
    document.getElementById('srs-hint').style.display = 'none';
    document.getElementById('rating-row').style.display = 'grid';
    sessionStats.seen++;
}

function srsDelay(card, rating) {
    const iv = card.interval || 0;
    const e  = card.ease || 2.5;
    const r  = (d) => `${d}j`;
    switch (rating) {
        case 'again': return iv === 0 ? 'maintenant' : r(1);
        case 'hard':  return r(iv === 0 ? 1 : Math.max(1, Math.round(iv * 1.2)));
        case 'good':  return r(iv === 0 ? 3 : Math.max(1, Math.round(iv * e)));
        case 'easy':  return r(iv === 0 ? 7 : Math.max(4, Math.round(iv * e * 1.3)));
    }
}

function rateSRS(rating) {
    if (!srsCurrent) return;
    const { card, ch } = srsCurrent;
    const iv  = card.interval || 0;
    const e   = card.ease || 2.5;
    const DAY = 86400000;
    const now = Date.now();

    let newIv, newEase, newDue;

    switch (rating) {
        case 'again':
            newIv   = 1;
            newEase = Math.max(1.3, e - 0.2);
            newDue  = now + DAY;
            srsAgainQueue.push(srsCurrent); // requeue pour cette session
            sessionStats.wrong++;
            break;
        case 'hard':
            newIv   = iv === 0 ? 1 : Math.max(1, Math.round(iv * 1.2));
            newEase = Math.max(1.3, e - 0.15);
            newDue  = now + newIv * DAY;
            sessionStats.wrong++;
            sessionDone++;
            break;
        case 'good':
            newIv   = iv === 0 ? 3 : Math.max(1, Math.round(iv * e));
            newEase = e;
            newDue  = now + newIv * DAY;
            sessionStats.right++;
            sessionDone++;
            break;
        case 'easy':
            newIv   = iv === 0 ? 7 : Math.max(4, Math.round(iv * e * 1.3));
            newEase = Math.min(3.0, e + 0.15);
            newDue  = now + newIv * DAY;
            sessionStats.right++;
            sessionDone++;
            break;
    }

    // Mise à jour de la carte dans la base
    const cards = db[currentSubject][ch].flashcards;
    const idx   = cards.findIndex(c => c.q === card.q && c.a === card.a);
    if (idx !== -1) {
        cards[idx].interval = newIv;
        cards[idx].ease     = newEase;
        cards[idx].due      = newDue;
        cards[idx].score    = (cards[idx].score || 0) + (rating === 'good' || rating === 'easy' ? 1 : -1);
    }
    save();
    renderSRSCard();
}

function renderSRSResults(box) {
    clearInterval(quizTimer);
    const total = sessionDone;
    const pct   = total === 0 ? 100 : Math.round(sessionStats.right / total * 100);
    const mins  = Math.floor(quizSecs / 60);
    const secs  = quizSecs % 60;

    let emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
    let msg   = pct >= 80 ? 'Excellente session !' : pct >= 60 ? 'Bien joué, continue !' : 'Revois les cartes difficiles.';

    box.innerHTML = `
        <div class="results-wrap">
            <div style="font-size:2.8rem;margin-bottom:4px;">${emoji}</div>
            <div class="results-big">${pct}%</div>
            <p class="results-sub">${msg}</p>
            <div class="results-grid">
                <div class="results-stat">
                    <div class="results-stat-n" style="color:#059669">${sessionStats.right}</div>
                    <div class="results-stat-l">Bien/Facile</div>
                </div>
                <div class="results-stat">
                    <div class="results-stat-n" style="color:#dc2626">${sessionStats.wrong}</div>
                    <div class="results-stat-l">À revoir</div>
                </div>
                <div class="results-stat">
                    <div class="results-stat-n" style="color:#6366f1">${total}</div>
                    <div class="results-stat-l">Total</div>
                </div>
                <div class="results-stat">
                    <div class="results-stat-n" style="color:#0891b2">${mins}m${secs < 10 ? '0' : ''}${secs}s</div>
                    <div class="results-stat-l">Durée</div>
                </div>
            </div>
            <div class="results-actions">
                <button class="btn-primary" onclick="openWorkspace('flashcards')">🔄 Nouvelle session</button>
                <button class="back-btn" onclick="openWorkspace('eval')">🧠 Faire un QCM</button>
            </div>
        </div>
    `;
}

// ============================================================
// QCM — SETUP
// ============================================================
function renderQCMSetup(box) {
    const chapters = Object.keys(db[currentSubject]);
    const chapHtml = chapters.map(ch => {
        const count = (db[currentSubject][ch].flashcards || []).length;
        return `
            <label class="cb-item">
                <input type="checkbox" class="qcm-cb" value="${ch}">
                <span style="flex:1;">${ch}</span>
                <span class="cb-item-right">${count} mots</span>
            </label>
        `;
    }).join('');

    box.innerHTML = `
        <div class="setup-wrap">
            <h3>🧠 Exercices QCM</h3>
            <div class="setup-info green">
                <b>QCM Auto-généré :</b> Des questions à 4 choix générées depuis ton vocabulaire.
            </div>
            <p style="font-weight:700;margin-bottom:10px;">Chapitres :</p>
            <div class="cb-list">${chapHtml}</div>
            <div style="margin-bottom:16px;">
                <label style="font-weight:700;display:block;margin-bottom:8px;">Nombre de questions :</label>
                <select id="qcm-count" class="field" style="margin:0;">
                    <option value="5">5 questions</option>
                    <option value="10" selected>10 questions</option>
                    <option value="20">20 questions</option>
                    <option value="0">Tout le vocabulaire</option>
                </select>
            </div>
            <div class="btn-row">
                <button class="back-btn" onclick="document.querySelectorAll('.qcm-cb').forEach(c=>c.checked=true)">Tout cocher</button>
                <button class="back-btn" onclick="document.querySelectorAll('.qcm-cb').forEach(c=>c.checked=false)">Tout décocher</button>
            </div>
            <button class="btn-primary btn-green" onclick="startQCM()">🚀 Commencer le QCM</button>
        </div>
    `;
}

// ============================================================
// QCM — SESSION
// ============================================================
function startQCM() {
    const cbs = document.querySelectorAll('.qcm-cb:checked');
    if (!cbs.length) { alert('Sélectionne au moins un chapitre !'); return; }

    const countVal = parseInt(document.getElementById('qcm-count').value);
    const seen = new Set();
    let allCards = [];

    cbs.forEach(cb => {
        (db[currentSubject][cb.value].flashcards || []).forEach(c => {
            const key = c.q + '|' + c.a;
            if (!seen.has(key)) { seen.add(key); allCards.push(c); }
        });
    });

    if (allCards.length < 2) {
        alert('Il faut au moins 2 mots pour générer un QCM !');
        return;
    }

    allCards = allCards.sort(() => Math.random() - 0.5);
    if (countVal > 0) allCards = allCards.slice(0, countVal);

    // Générer les questions
    qcmList = allCards.map(card => {
        const wrong = allCards
            .filter(c => c.a !== card.a)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        const options = [...wrong.map(c => c.a), card.a].sort(() => Math.random() - 0.5);
        return { q: card.q, correct: card.a, options };
    });

    qcmIdx   = 0;
    qcmScore = 0;
    renderQCMQuestion();
}

function renderQCMQuestion() {
    const box = document.getElementById('workspace-inner');
    if (qcmIdx >= qcmList.length) { renderQCMResults(box); return; }

    qcmCurrent = qcmList[qcmIdx];
    const { q, options } = qcmCurrent;
    const pct = Math.round(qcmIdx / qcmList.length * 100);
    const letters = ['A', 'B', 'C', 'D'];

    box.innerHTML = `
        <div class="qcm-wrap">
            <div class="prog-row">
                <span>Question <b>${qcmIdx + 1}</b> / ${qcmList.length}</span>
                <span>Score : <b>${qcmScore}/${qcmIdx}</b></span>
            </div>
            <div class="prog-bar-outer">
                <div class="prog-bar-inner" style="width:${pct}%"></div>
            </div>

            <div class="qcm-q-card">
                <div class="qcm-q-label">Quelle est la définition / traduction de :</div>
                <div class="qcm-q-text">${q}</div>
            </div>

            <div class="qcm-options">
                ${options.map((opt, i) => `
                    <button class="qcm-opt" id="opt-${i}" onclick="answerQCM(${i})">
                        <span class="opt-letter">${letters[i]}.</span>
                        <span>${opt}</span>
                    </button>
                `).join('')}
            </div>

            <button class="qcm-next" id="qcm-next" onclick="nextQCM()">
                ${qcmIdx + 1 < qcmList.length ? 'Question suivante →' : 'Voir les résultats →'}
            </button>
        </div>
    `;
}

function answerQCM(chosenIdx) {
    if (!qcmCurrent) return;
    const { correct, options } = qcmCurrent;

    document.querySelectorAll('.qcm-opt').forEach((btn, i) => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
        if (options[i] === correct) btn.classList.add('correct');
        else if (i === chosenIdx && options[i] !== correct) btn.classList.add('wrong');
    });

    if (options[chosenIdx] === correct) qcmScore++;
    document.getElementById('qcm-next').style.display = 'block';
}

function nextQCM() {
    qcmIdx++;
    renderQCMQuestion();
}

function renderQCMResults(box) {
    const pct  = qcmList.length === 0 ? 0 : Math.round(qcmScore / qcmList.length * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
    const msg   = pct >= 80 ? 'Excellent score !' : pct >= 60 ? 'Pas mal, continue !' : 'Révise encore ce chapitre !';

    box.innerHTML = `
        <div class="results-wrap">
            <div style="font-size:2.8rem;margin-bottom:4px;">${emoji}</div>
            <div class="results-big">${pct}%</div>
            <p class="results-sub">${msg}</p>
            <div class="results-grid">
                <div class="results-stat">
                    <div class="results-stat-n" style="color:#059669">${qcmScore}</div>
                    <div class="results-stat-l">Correctes</div>
                </div>
                <div class="results-stat">
                    <div class="results-stat-n" style="color:#dc2626">${qcmList.length - qcmScore}</div>
                    <div class="results-stat-l">Fausses</div>
                </div>
                <div class="results-stat">
                    <div class="results-stat-n" style="color:#6366f1">${qcmList.length}</div>
                    <div class="results-stat-l">Total</div>
                </div>
            </div>
            <div class="results-actions">
                <button class="btn-primary btn-green" onclick="openWorkspace('eval')">🔄 Rejouer</button>
                <button class="back-btn" onclick="openWorkspace('flashcards')">🎴 Flashcards</button>
            </div>
        </div>
    `;
}

// ============================================================
// INIT
// ============================================================
showHome();
