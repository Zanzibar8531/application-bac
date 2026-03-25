let db = JSON.parse(localStorage.getItem('my_db')) || {};
let currentSubject = '';
let currentModule = '';
let selectedChapters = [];
let isHighlighting = false;

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
    if (selectedChapters.length === 0 && chapters.length > 0) {
        selectedChapters = [chapters[0]];
    }
    
    renderChapters();
    renderWorkspaceContent();
    showPage('workspace');
}

function renderChapters() {
    const container = document.getElementById('chapter-chips');
    const chapters = Object.keys(db[currentSubject]);
    
    let html = chapters.map(ch => `
        <button class="chip ${selectedChapters.includes(ch) ? 'active-chip' : ''}" onclick="toggleChapter('${ch.replace(/'/g, "\\'")}')">
            ${ch}
        </button>
    `).join('');
    
    html += `<button class="chip add-ch" onclick="addChapter()">+ Nouveau</button>`;
    container.innerHTML = html;
}

function toggleChapter(ch) {
    if (currentModule === 'flashcards') {
        // Mode Flashcards : Sélection multiple possible
        if (selectedChapters.includes(ch)) {
            if (selectedChapters.length > 1) {
                selectedChapters = selectedChapters.filter(c => c !== ch);
            }
        } else {
            selectedChapters.push(ch);
        }
    } else {
        // Mode normal : Un seul chapitre à la fois
        selectedChapters = [ch];
    }
    renderChapters();
    renderWorkspaceContent();
}

function addChapter() {
    let base = "Sans titre";
    let name = base;
    let count = 1;
    while(db[currentSubject][name]) {
        count++;
        name = base + " " + count;
    }
    
    db[currentSubject][name] = { cours: "", flashcards: [] };
    selectedChapters = [name];
    save();
    renderChapters();
    renderWorkspaceContent();
}

function renameChapter(oldName, newName) {
    newName = newName.trim();
    if (newName === oldName || newName === "") {
        renderWorkspaceContent(); // Reset si vide
        return; 
    }
    if (db[currentSubject][newName]) {
        alert("Une étiquette porte déjà ce nom !");
        renderWorkspaceContent();
        return;
    }
    
    // On copie les données vers le nouveau nom
    db[currentSubject][newName] = db[currentSubject][oldName];
    delete db[currentSubject][oldName];
    
    // On met à jour la sélection
    selectedChapters = selectedChapters.map(c => c === oldName ? newName : c);
    save();
    renderChapters();
    renderWorkspaceContent();
}

function renderWorkspaceContent() {
    const container = document.getElementById('workspace-content');
    const titleContainer = document.getElementById('etiquette-title-container');
    
    if (selectedChapters.length === 0) return;

    // Titre modifiable (Sauf si on est en flashcards multi-sélection)
    if (currentModule === 'flashcards' && selectedChapters.length > 1) {
        titleContainer.innerHTML = `<h3 style="margin:0; color:#1e293b;">📌 Révision : ${selectedChapters.length} étiquettes sélectionnées</h3>`;
    } else {
        const currentTag = selectedChapters[0];
        titleContainer.innerHTML = `
            <span style="font-size:1.5rem;">📌</span> 
            <input type="text" id="chapter-name-input" class="title-input" value="${currentTag}" 
                   onblur="renameChapter('${currentTag.replace(/'/g, "\\'")}', this.value)" 
                   onkeydown="if(event.key==='Enter') this.blur();"
                   placeholder="Nom de l'étiquette">
        `;
    }

    if (currentModule === 'cours-read') {
        const chapterData = db[currentSubject][selectedChapters[0]];
        container.innerHTML = `<div style="line-height:1.6; font-size:1.1rem;">${chapterData.cours || "Aucun cours enregistré."}</div>`;
    } 
    
    else if (currentModule === 'cours-edit') {
        const chapterData = db[currentSubject][selectedChapters[0]];
        isHighlighting = false; // reset
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
            <div id="word-editor" contenteditable="true" class="editor-box">
                ${chapterData.cours || ""}
            </div>
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
        // Liste des cases à cocher pour partager le mot
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

    else if (currentModule === 'flashcards') {
        renderQuiz();
    }

    else if (currentModule === 'eval') {
        container.innerHTML = `<p>Bientôt disponible... Concentre-toi sur le cours et les flashcards pour le moment ! 💪</p>`;
    }
}

function formatDoc(cmd, value = null) {
    document.execCommand(cmd, false, value);
    document.getElementById('word-editor').focus();
}

function toggleHighlightBtn() {
    isHighlighting = !isHighlighting;
    if (isHighlighting) {
        const color = document.getElementById('hl-color').value;
        document.execCommand('hiliteColor', false, color);
        document.execCommand('backColor', false, color); // Fallback
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
    if(checkboxes.length === 0) return; // Ne rien faire si aucune case cochée

    checkboxes.forEach(cb => {
        const ch = cb.value;
        db[currentSubject][ch].flashcards.push({q, a, score: 0});
    });

    save();
    document.getElementById('q').value = "";
    document.getElementById('a').value = "";
    document.getElementById('q').focus(); // Ramène le curseur en haut pour le mot suivant
}

function renderQuiz() {
    const container = document.getElementById('workspace-content');
    
    // Dédoublonnage et rassemblement de toutes les cartes des chapitres sélectionnés
    let allCards = [];
    let seen = new Set();
    
    selectedChapters.forEach(ch => {
        let cards = db[currentSubject][ch].flashcards || [];
        cards.forEach(c => {
            let key = c.q + "|" + c.a; // Clé unique pour éviter les doublons
            if (!seen.has(key)) {
                seen.add(key);
                allCards.push(c);
            }
        });
    });

    if(allCards.length === 0) {
        container.innerHTML = "<p>Rien à réviser dans ces étiquettes.</p>";
        return;
    }

    allCards.sort((a, b) => (a.score || 0) - (b.score || 0));
    const card = allCards[0]; 

    // Centrage de la flashcard
    container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto; text-align:center;">
            <p style="color:gray; font-size:0.9rem;">(Priorité de la carte : ${card.score || 0})</p>
            <h2 style="font-size:2rem; margin:30px 0;">${card.q}</h2>
            
            <input type="text" id="user-answer" placeholder="Écris ta réponse ici..." 
                   style="width:100%; padding:20px; border-radius:10px; border:3px solid #cbd5e1; font-size:1.2rem; text-align:center; box-sizing:border-box;"
                   onkeydown="if(event.key==='Enter') checkAnswer('${card.a.replace(/'/g, "\\'")}', '${card.q.replace(/'/g, "\\'")}')">
            
            <button class="save-btn" id="check-btn" style="background:black; margin-top:15px;" onclick="checkAnswer('${card.a.replace(/'/g, "\\'")}', '${card.q.replace(/'/g, "\\'")}')">Vérifier (Entrée)</button>
            <button class="save-btn" id="skip-btn" style="background:#ef4444; margin-top:10px;" onclick="checkAnswer('', '${card.q.replace(/'/g, "\\'")}')">Je ne sais pas (Passer)</button>
            
            <div id="feedback" style="margin-top:20px; display:none; padding:20px; border-radius:10px;">
                <h3 id="result-text" style="margin:0 0 10px 0;"></h3>
                <p style="font-size:1.2rem; margin:0;"><b>La bonne réponse est :</b> <br><span style="color:black;">${card.a}</span></p>
                <button class="save-btn" id="next-btn" style="background:#3b82f6; margin-top:20px;" onclick="renderQuiz()">Carte Suivante (Entrée)</button>
            </div>
        </div>
    `;
    
    // Focus auto sur l'input
    setTimeout(() => document.getElementById('user-answer').focus(), 100);
}

function checkAnswer(correctAnswer, questionText) {
    const userAns = document.getElementById('user-answer').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');
    const resultText = document.getElementById('result-text');
    
    feedback.style.display = "block";
    document.getElementById('check-btn').style.display = "none";
    document.getElementById('skip-btn').style.display = "none";
    document.getElementById('user-answer').disabled = true;

    // Mise à jour du score pour TOUTES les occurrences de ce mot dans les chapitres sélectionnés
    let isRight = (userAns !== "" && userAns === correctAnswer.toLowerCase().trim());
    
    selectedChapters.forEach(ch => {
        let cards = db[currentSubject][ch].flashcards || [];
        cards.forEach(c => {
            if(c.q === questionText && c.a === correctAnswer) {
                if (isRight) {
                    c.score = (c.score || 0) + 1;
                } else {
                    c.score = (c.score || 0) - 2;
                }
            }
        });
    });

    if(isRight) {
        resultText.innerHTML = "✅ Parfait !";
        feedback.style.background = "#dcfce7";
        resultText.style.color = "#166534";
    } else {
        resultText.innerHTML = "❌ Erreur (ou passé)";
        feedback.style.background = "#fee2e2";
        resultText.style.color = "#991b1b";
    }
    
    save();
    
    // Permet d'appuyer sur Entrée pour passer à la suite
    document.onkeydown = function(e) {
        if(e.key === 'Enter') {
            document.onkeydown = null; // Retire l'écouteur
            renderQuiz();
        }
    };
    document.getElementById('next-btn').focus();
}