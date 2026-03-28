let db = JSON.parse(localStorage.getItem('my_db')) || {};
let currentSubject = '';
let currentModule = '';
let selectedChapters = [];
let isHighlighting = false;
let isQuizStarted = false; 

// --- Variables Statistiques Flashcards ---
let quizTimer = null;
let quizTimeSeconds = 0;
let statsSeen = 0;
let statsCorrect = 0;
let statsWrong = 0;
let statsSkipped = 0;

function save() {
    localStorage.setItem('my_db', JSON.stringify(db));
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    window.scrollTo(0,0);
}

function openSubject(name) {
    currentSubject = name;
    document.getElementById('subject-title').innerText = name;
    
    if(!db[currentSubject]) db[currentSubject] = {};
    if(Object.keys(db[currentSubject]).length === 0) {
        db[currentSubject]["Général"] = { cours: "", flashcards: [] };
    }
    
    showPage('subject');
}

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('active');
    document.getElementById('menu-overlay').classList.toggle('active');
}

function openWorkspace(type) {
    currentModule = type;
    isQuizStarted = false; 
    clearInterval(quizTimer); // On coupe le chrono si on quitte les flashcards
    
    const titles = { 
        'cours-read': '📖 Lecture du Cours', 
        'cours-edit': '✏️ Éditeur de Cours', 
        'voc-read': '📚 Mon Dictionnaire', 
        'voc-add': '➕ Ajouter du Vocabulaire',
        'flashcards': '🎴 Révision Intelligente',
        'eval': '📝 Exercices d\'entraînement'
    };
    document.getElementById('workspace-title').innerText = titles[type];
    
    const chapters = Object.keys(db[currentSubject]);
    if (type !== 'flashcards' && selectedChapters.length === 0 && chapters.length > 0) {
        selectedChapters = [chapters[0]];
    }
    
    renderChapters();
    renderWorkspaceContent();
    showPage('workspace');
}

function renderChapters() {
    const container = document.getElementById('chapter-bar-container');
    const chipContainer = document.getElementById('chapter-chips');
    
    if (currentModule === 'flashcards') {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    const chapters = Object.keys(db[currentSubject]);
    
    let html = chapters.map(ch => `
        <button class="chip ${selectedChapters.includes(ch) ? 'active-chip' : ''}" onclick="toggleChapter('${ch.replace(/'/g, "\\'")}')">
            ${ch}
        </button>
    `).join('');
    
    html += `<button class="chip add-ch" onclick="addChapter()">+ Nouveau</button>`;
    chipContainer.innerHTML = html;
}

function toggleChapter(ch) {
    selectedChapters = [ch];
    renderChapters();
    renderWorkspaceContent();
}

function addChapter() {
    let base = "Sans titre";
    let name = base;
    let count = 1;
    while(db[currentSubject][name]) { count++; name = base + " " + count; }
    
    db[currentSubject][name] = { cours: "", flashcards: [] };
    selectedChapters = [name];
    save();
    renderChapters();
    renderWorkspaceContent();
}

function renameChapter(oldName, newName) {
    newName = newName.trim();
    if (newName === oldName || newName === "") { renderWorkspaceContent(); return; }
    if (db[currentSubject][newName]) { alert("Une étiquette porte déjà ce nom !"); renderWorkspaceContent(); return; }
    
    db[currentSubject][newName] = db[currentSubject][oldName];
    delete db[currentSubject][oldName];
    selectedChapters = selectedChapters.map(c => c === oldName ? newName : c);
    save();
    renderChapters();
    renderWorkspaceContent();
}

function renderWorkspaceContent() {
    const container = document.getElementById('workspace-content');
    const titleContainer = document.getElementById('etiquette-title-container');

    if (currentModule === 'flashcards') {
        if (!isQuizStarted) renderQuizSetup(container, titleContainer);
        else renderQuiz(container, titleContainer);
        return;
    }

    if (selectedChapters.length === 0) return;
    
    const currentTag = selectedChapters[0];
    titleContainer.innerHTML = `
        <span style="font-size:1.5rem;">📌</span> 
        <input type="text" id="chapter-name-input" class="title-input" value="${currentTag}" 
               onblur="renameChapter('${currentTag.replace(/'/g, "\\'")}', this.value)" 
               onkeydown="if(event.key==='Enter') this.blur();"
               placeholder="Nom de l'étiquette">
    `;

    if (currentModule === 'cours-read') {
        const chapterData = db[currentSubject][selectedChapters[0]];
        container.innerHTML = `<div style="line-height:1.6; font-size:1.1rem;">${chapterData.cours || "Aucun cours enregistré."}</div>`;
    } 
    else if (currentModule === 'cours-edit') {
        const chapterData = db[currentSubject][selectedChapters[0]];
        isHighlighting = false;
        container.innerHTML = `
            <div class="toolbar" style="margin-bottom:15px; display:flex; flex-wrap:wrap; gap:10px;">
                <button onclick="formatDoc('bold')" title="Gras" style="font-weight:900;">B</button>
                <button onclick="formatDoc('italic')" title="Italique" style="font-style:italic;">I</button>
                <button onclick="formatDoc('underline')" title="Souligné" style="text-decoration:underline;">U</button>
                
                <div style="display:flex; align-items:center; border: 2px solid #cbd5e1; border-radius:8px; padding:0 5px; background:white;">
                    <input type="color" id="hl-color" value="#ffff00" style="width:35px; height:35px; border:none; padding:0; background:transparent; cursor:pointer;" title="Couleur de surlignage">
                    <button onclick="toggleHighlightBtn()" style="border:none; min-width:auto; padding:0 10px;" title="Activer/Désactiver le surlignage">🖍️ On/Off</button>
                </div>
                
                <select onchange="formatDoc('fontSize', this.value)">
                    <option value="3">Taille Normale</option>
                    <option value="5">Grand (Titre)</option>
                    <option value="7">Très Grand</option>
                </select>

                <select onchange="formatDoc('foreColor', this.value)">
                    <option value="black">Couleur : Noir</option>
                    <option value="red" style="color:red;">Couleur : Rouge</option>
                    <option value="#3b82f6" style="color:#3b82f6; font-weight:bold;">Couleur : Bleu clair</option>
                </select>
            </div>
            <div id="word-editor" contenteditable="true" class="editor-box">${chapterData.cours || ""}</div>
            <button class="save-btn" style="margin-top: 20px;" onclick="saveCours()">💾 Enregistrer le cours</button>
        `;
    }
    else if (currentModule === 'voc-read') {
        const chapterData = db[currentSubject][selectedChapters[0]];
        let html = '';
        if(!chapterData.flashcards || chapterData.flashcards.length === 0) {
            html += "<p>Dictionnaire vide pour cette étiquette.</p>";
        } else {
            chapterData.flashcards.forEach(item => {
                html += `<p style="margin:10px 0; font-size:1.1rem; border-bottom:1px solid #eee; padding-bottom:5px;"><strong>${item.q}</strong> : ${item.a}</p>`;
            });
        }
        container.innerHTML = html;
    }
    else if (currentModule === 'voc-add') {
        let chapHtml = Object.keys(db[currentSubject]).map(ch => 
            `<label style="display:inline-block; margin:5px 10px 5px 0; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #cbd5e1; cursor:pointer;">
                <input type="checkbox" class="voc-chap-cb" value="${ch}" ${selectedChapters.includes(ch) ? 'checked' : ''}> ${ch}
            </label>`
        ).join('');

        container.innerHTML = `
            <div style="margin-bottom:15px;">
                <p style="font-weight:bold; margin-bottom:5px;">Ajouter ce mot aux étiquettes :</p>
                ${chapHtml}
            </div>
            <input type="text" id="q" class="voc-input" placeholder="Mot ou Question" onkeydown="if(event.key==='Enter') document.getElementById('a').focus()">
            <input type="text" id="a" class="voc-input" placeholder="Définition ou Réponse" onkeydown="if(event.key==='Enter') addVoc()">
            <button class="save-btn" onclick="addVoc()">➕ Ajouter le mot (Entrée)</button>
        `;
    }
    else if (currentModule === 'eval') {
        container.innerHTML = `<p>Bientôt disponible... Concentre-toi sur le cours et les flashcards pour le moment ! 💪</p>`;
    }
}

// FORMATAGE & SAUVEGARDE
function formatDoc(cmd, value = null) {
    document.execCommand(cmd, false, value);
    document.getElementById('word-editor').focus();
}

function toggleHighlightBtn() {
    isHighlighting = !isHighlighting;
    if (isHighlighting) {
        const color = document.getElementById('hl-color').value;
        document.execCommand('hiliteColor', false, color);
        document.execCommand('backColor', false, color);
    } else {
        document.execCommand('hiliteColor', false, 'transparent');
        document.execCommand('backColor', false, 'transparent');
    }
    document.getElementById('word-editor').focus();
}

function saveCours() {
    db[currentSubject][selectedChapters[0]].cours = document.getElementById('word-editor').innerHTML;
    save();
}

function addVoc() {
    const q = document.getElementById('q').value.trim();
    const a = document.getElementById('a').value.trim();
    if(!q || !a) return;

    const checkboxes = document.querySelectorAll('.voc-chap-cb:checked');
    if(checkboxes.length === 0) return;

    checkboxes.forEach(cb => {
        db[currentSubject][cb.value].flashcards.push({q, a, score: 0});
    });

    save();
    document.getElementById('q').value = "";
    document.getElementById('a').value = "";
    document.getElementById('q').focus();
}

// -----------------------------------------
// FONCTIONS FLASHCARDS & STATS
// -----------------------------------------

function renderQuizSetup(container, titleContainer) {
    titleContainer.innerHTML = `<h3 style="margin:0; color:#1e293b;">🎴 Configuration de la session</h3>`;
    
    let chapters = Object.keys(db[currentSubject]);
    let chapHtml = chapters.map(ch => `
        <label style="display:flex; align-items:center; margin:10px 0; background:#f8fafc; padding:15px; border-radius:10px; border:2px solid #cbd5e1; cursor:pointer; font-size:1.1rem; font-weight:bold;">
            <input type="checkbox" class="quiz-chap-cb" value="${ch}" style="width:20px; height:20px; margin-right:15px; cursor:pointer;"> 
            ${ch}
        </label>
    `).join('');

    container.innerHTML = `
        <p style="font-size:1.1rem; margin-bottom:15px; color:#475569;">Sélectionne les étiquettes que tu souhaites réviser :</p>
        <div style="margin-bottom:20px;">
            <button class="save-btn" style="background:#475569; margin-bottom:15px; padding:12px;" onclick="selectAllQuizChaps()">✅ Tout sélectionner</button>
            ${chapHtml}
        </div>
        <button class="save-btn" style="background:#3b82f6; font-size:1.3rem;" onclick="startQuiz()">🚀 Commencer la révision</button>
    `;
}

function selectAllQuizChaps() {
    document.querySelectorAll('.quiz-chap-cb').forEach(cb => cb.checked = true);
}

function startQuiz() {
    const checkboxes = document.querySelectorAll('.quiz-chap-cb:checked');
    selectedChapters = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedChapters.length === 0) { alert("Sélectionne au moins une étiquette !"); return; }
    
    // Reset les stats
    isQuizStarted = true;
    statsSeen = 0; statsCorrect = 0; statsWrong = 0; statsSkipped = 0;
    quizTimeSeconds = 0;
    
    clearInterval(quizTimer);
    quizTimer = setInterval(updateTimer, 1000);
    
    renderWorkspaceContent();
}

function updateTimer() {
    if (!isQuizStarted) return;
    quizTimeSeconds++;
    const mins = String(Math.floor(quizTimeSeconds / 60)).padStart(2, '0');
    const secs = String(quizTimeSeconds % 60).padStart(2, '0');
    const timerEl = document.getElementById('quiz-timer-display');
    if (timerEl) timerEl.innerText = `${mins}:${secs}`;
}

function renderQuiz(container, titleContainer) {
    titleContainer.innerHTML = `<h3 style="margin:0; color:#1e293b;">📌 Révision : ${selectedChapters.length} étiquette(s)</h3>`;
    
    let allCards = [];
    let seen = new Set();
    
    selectedChapters.forEach(ch => {
        let cards = db[currentSubject][ch].flashcards || [];
        cards.forEach(c => {
            let key = c.q + "|" + c.a;
            if (!seen.has(key)) { seen.add(key); allCards.push(c); }
        });
    });

    if(allCards.length === 0) {
        container.innerHTML = "<p>Rien à réviser dans ces étiquettes.</p>";
        clearInterval(quizTimer);
        return;
    }

    allCards.sort((a, b) => (a.score || 0) - (b.score || 0));
    const card = allCards[0]; 

    const mins = String(Math.floor(quizTimeSeconds / 60)).padStart(2, '0');
    const secs = String(quizTimeSeconds % 60).padStart(2, '0');

    container.innerHTML = `
        <div class="flashcard-layout">
            <div class="flashcard-main">
                <div class="flashcard-ui">
                    <p style="color:#94a3b8; font-size:0.9rem; margin-top:0; font-weight:bold; position:absolute; top: 15px;">Priorité d'apprentissage : ${card.score || 0}</p>
                    <h2 style="font-size:2.2rem; margin:0; color:#0f172a; text-shadow: 1px 1px 2px rgba(0,0,0,0.05);">${card.q}</h2>
                </div>
                
                <input type="text" id="user-answer" placeholder="Écris ta réponse ici..." 
                       style="width:100%; padding:20px; border-radius:10px; border:3px solid #cbd5e1; font-size:1.2rem; text-align:center; box-sizing:border-box; margin-bottom:15px; outline:none;"
                       onkeydown="if(event.key==='Enter') checkAnswer('${card.a.replace(/'/g, "\\'")}', '${card.q.replace(/'/g, "\\'")}', false)">
                
                <button class="save-btn" id="check-btn" style="background:black;" onclick="checkAnswer('${card.a.replace(/'/g, "\\'")}', '${card.q.replace(/'/g, "\\'")}', false)">Vérifier (Entrée)</button>
                <button class="save-btn" id="skip-btn" style="background:#ef4444; margin-top:10px;" onclick="checkAnswer('${card.a.replace(/'/g, "\\'")}', '${card.q.replace(/'/g, "\\'")}', true)">Je ne sais pas (Passer)</button>
                
                <div id="feedback" style="margin-top:20px; display:none; padding:20px; border-radius:10px; text-align:center;">
                    <h3 id="result-text" style="margin:0 0 10px 0;"></h3>
                    <p style="font-size:1.2rem; margin:0;"><b>La bonne réponse est :</b> <br><span style="color:black;">${card.a}</span></p>
                    <button class="save-btn" id="next-btn" style="background:#3b82f6; margin-top:20px;" onclick="renderWorkspaceContent()">Carte Suivante (Entrée)</button>
                </div>
            </div>

            <div class="flashcard-stats">
                <h3 style="margin-top:0; border-bottom:2px dashed #cbd5e1; padding-bottom:10px;">📊 Statistiques</h3>
                <div style="font-size:2.5rem; font-weight:900; text-align:center; margin:15px 0; color:#3b82f6;" id="quiz-timer-display">${mins}:${secs}</div>
                <div style="font-size:1.1rem; line-height:2;">
                    <p style="margin:0;">👁️ Cartes vues : <b>${statsSeen}</b></p>
                    <p style="margin:0; color:#166534;">✅ Justes : <b>${statsCorrect}</b></p>
                    <p style="margin:0; color:#991b1b;">❌ Fausses : <b>${statsWrong}</b></p>
                    <p style="margin:0; color:#ca8a04;">⏭️ Passées : <b>${statsSkipped}</b></p>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => document.getElementById('user-answer').focus(), 100);
}

function checkAnswer(correctAnswer, questionText, isSkipped) {
    statsSeen++;
    const userAns = document.getElementById('user-answer').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');
    const resultText = document.getElementById('result-text');
    
    feedback.style.display = "block";
    document.getElementById('check-btn').style.display = "none";
    document.getElementById('skip-btn').style.display = "none";
    document.getElementById('user-answer').disabled = true;

    let isRight = false;
    if (!isSkipped) {
        isRight = (userAns !== "" && userAns === correctAnswer.toLowerCase().trim());
    }
    
    selectedChapters.forEach(ch => {
        let cards = db[currentSubject][ch].flashcards || [];
        cards.forEach(c => {
            if(c.q === questionText && c.a === correctAnswer) {
                if (isRight) c.score = (c.score || 0) + 1;
                else c.score = (c.score || 0) - 2;
            }
        });
    });

    if(isSkipped) {
        statsSkipped++;
        resultText.innerHTML = "⏭️ Passé !";
        feedback.style.background = "#fef08a"; // Jaune
        resultText.style.color = "#854d0e";
    } else if(isRight) {
        statsCorrect++;
        resultText.innerHTML = "✅ Parfait !";
        feedback.style.background = "#dcfce7";
        resultText.style.color = "#166534";
    } else {
        statsWrong++;
        resultText.innerHTML = "❌ Faux !";
        feedback.style.background = "#fee2e2";
        resultText.style.color = "#991b1b";
    }
    
    save();
    
    document.onkeydown = function(e) {
        if(e.key === 'Enter') {
            document.onkeydown = null; 
            renderWorkspaceContent();
        }
    };
    document.getElementById('next-btn').focus();
}