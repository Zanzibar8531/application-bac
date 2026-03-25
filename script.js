let db = JSON.parse(localStorage.getItem('my_db')) || {};
let currentSubject = '';
let currentModule = '';
let selectedChapters = [];

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

function openWorkspace(type) {
    currentModule = type;
    const titles = { 'cours': 'Éditeur de Cours', 'voc': 'Dictionnaire', 'flashcards': 'Flashcards Anki', 'eval': 'Exercices Bac' };
    document.getElementById('workspace-title').innerText = titles[type];
    
    const chapters = Object.keys(db[currentSubject]);
    if (selectedChapters.length === 0 && chapters.length > 0) {
        selectedChapters = [chapters[0]];
    }
    
    renderChapters();
    renderWorkspace();
    showPage('workspace');
}

function renderChapters() {
    const container = document.getElementById('chapter-chips');
    const chapters = Object.keys(db[currentSubject]);
    
    let html = chapters.map(ch => `
        <button class="chip ${selectedChapters.includes(ch) ? 'active-chip' : ''}" onclick="toggleChapter('${ch}')">
            🏷️ ${ch}
        </button>
    `).join('');
    
    html += `<button class="chip add-ch" onclick="addChapter()">+ Nouvelle Étiquette</button>`;
    container.innerHTML = html;
}

function toggleChapter(ch) {
    selectedChapters = [ch]; // Sélection unique pour simplifier l'édition
    renderChapters();
    renderWorkspace();
}

function addChapter() {
    const name = prompt("Nom de la nouvelle étiquette (chapitre) :");
    if(name && !db[currentSubject][name]) {
        db[currentSubject][name] = { cours: "", flashcards: [] };
        selectedChapters = [name];
        save();
        renderChapters();
        renderWorkspace();
    }
}

// === FONCTIONS WYSIWYG ===
function formatDoc(cmd, value = null) {
    if (cmd === 'hiliteColor' && !document.queryCommandSupported('hiliteColor')) {
        cmd = 'backColor'; // Compatibilité navigateurs
    }
    document.execCommand(cmd, false, value);
    document.getElementById('word-editor').focus();
}

function changeFontSize(size) {
    document.execCommand("fontSize", false, "7"); 
    let fontElements = document.querySelectorAll("font[size='7']");
    fontElements.forEach(el => {
        el.removeAttribute("size");
        el.style.fontSize = size + "px";
    });
    document.getElementById('word-editor').focus();
}
// =========================

function renderWorkspace() {
    const container = document.getElementById('workspace-content');
    if(selectedChapters.length === 0) {
        container.innerHTML = "<p>Veuillez sélectionner une étiquette.</p>";
        return;
    }

    if(currentModule === 'cours') {
        container.innerHTML = `
            <div class="editor-toolbar">
                <select class="tool-select" onchange="formatDoc('formatBlock', this.value); this.selectedIndex=0;">
                    <option value="">Format...</option>
                    <option value="H1">Titre (H1)</option>
                    <option value="H2">Sous-titre (H2)</option>
                    <option value="P">Texte Normal</option>
                </select>
                <input type="number" class="tool-input" min="12" max="22" value="16" onchange="changeFontSize(this.value)" title="Taille (12 à 22 px)">
                <button class="tool-btn" onclick="formatDoc('bold')" title="Mettre en gras"><b>G</b></button>
                <button class="tool-btn" onclick="formatDoc('underline')" title="Souligner"><u>S</u></button>
                <input type="color" class="tool-color" onchange="formatDoc('hiliteColor', this.value)" title="Surligner">
            </div>
            <div id="word-editor" class="rich-editor" contenteditable="true">${db[currentSubject][selectedChapters[0]].cours || ""}</div>
            <button class="save-btn" onclick="saveCours()">Enregistrer mon cours</button>
        `;
    }
    else if(currentModule === 'voc') {
        container.innerHTML = `
            <div class="card">
                <input type="text" id="q" class="voc-input" placeholder="Mot / Concept">
                <textarea id="a" class="voc-input" placeholder="Définition"></textarea>
                <button class="save-btn" onclick="addVoc()">Ajouter au dictionnaire</button>
            </div>`;
    }
    else if(currentModule === 'flashcards') {
        renderQuiz();
    }
}

function saveCours() {
    // On récupère le innerHTML (le texte avec les balises de style)
    db[currentSubject][selectedChapters[0]].cours = document.getElementById('word-editor').innerHTML;
    save();
    alert("Cours enregistré !");
}

function addVoc() {
    const q = document.getElementById('q').value;
    const a = document.getElementById('a').value;
    if(q && a) {
        db[currentSubject][selectedChapters[0]].flashcards.push({q, a});
        save();
        document.getElementById('q').value = "";
        document.getElementById('a').value = "";
        alert("Mot ajouté !");
    }
}

function renderQuiz() {
    const container = document.getElementById('workspace-content');
    let allCards = db[currentSubject][selectedChapters[0]].flashcards || [];

    if(allCards.length === 0) {
        container.innerHTML = "<div class='card'>Aucun mot trouvé dans cette étiquette.</div>";
        return;
    }

    const card = allCards[Math.floor(Math.random() * allCards.length)];
    container.innerHTML = `
        <div class="flip-card" onclick="this.classList.toggle('flipped')">
            <div class="flip-card-inner">
                <div class="flip-card-front"><h2>${card.q}</h2><p style="color: gray; font-size: 0.9rem; margin-top:20px;">(Clique pour retourner)</p></div>
                <div class="flip-card-back"><h2>${card.a}</h2></div>
            </div>
        </div>
        <button class="save-btn" style="margin-top:20px;" onclick="renderQuiz()">Carte Suivante</button>
    `;
}