/* ============================================================
   BacMaster — app-boot.js
   Export/import, notifications internes, musique, mode sombre, démarrage
   (ancien script.js découpé : les fichiers se chargent dans cet ordre et partagent le même espace global)
   ============================================================ */
// ══════════════════════════════════════════════════════════════
// SYNCHRONISATION GITHUB — Multi-appareils
// Repo : Zanzibar8531/application_bac
// ══════════════════════════════════════════════════════════════


// ── EXPORT SIMPLE (JSON local, sans compte) ─────────────────────
function exportData(customData) {
    try {
        const payload = customData || db;
        const n = Object.keys(payload).length;
        if(n === 0) { showToast('Rien à exporter avec cette sélection', 'warn'); return; }
        const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const stamp = dayKey(new Date());
        a.href = url; a.download = 'bacmaster-export-' + stamp + '.json';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(()=>URL.revokeObjectURL(url), 1000);
        showToast(`📤 Export téléchargé ! (${n} matière${n>1?'s':''})`);
    } catch(e) {
        showToast('Erreur export : ' + e.message, 'error');
    }
}

// ── IMPORT D'UN FICHIER .JSON (remet en place un export nettoyé) ──
function handleImportFile(input) {
    const file = input.files && input.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        let parsed;
        try {
            parsed = JSON.parse(e.target.result);
        } catch(err) {
            showToast('Ce fichier n\'est pas un .json valide', 'error');
            input.value = '';
            return;
        }
        if(typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
            showToast('Format inattendu — ce n\'est pas un export BacMaster', 'error');
            input.value = '';
            return;
        }
        // Validation légère : chaque matière doit être un objet de chapitres
        // avec cours (string) et flashcards (array)
        const subjects = Object.keys(parsed);
        if(subjects.length === 0) {
            showToast('Le fichier est vide', 'warn');
            input.value = '';
            return;
        }
        let chapterCount = 0;
        for(const subj of subjects) {
            const chapters = parsed[subj];
            if(typeof chapters !== 'object' || chapters === null) {
                showToast(`Format invalide pour "${subj}"`, 'error');
                input.value = '';
                return;
            }
            for(const ch of Object.keys(chapters)) {
                const data = chapters[ch];
                if(typeof data !== 'object' || typeof data.cours !== 'string' || !Array.isArray(data.flashcards)) {
                    showToast(`Chapitre "${ch}" mal formé dans le fichier`, 'error');
                    input.value = '';
                    return;
                }
                chapterCount++;
            }
        }
        customConfirm({
            icon: '📥', title: 'Importer ce fichier ?',
            message: `${subjects.length} matière(s), ${chapterCount} chapitre(s) détecté(s). Les chapitres déjà existants seront mis à jour (progression conservée), les nouveaux seront créés.`,
            confirmLabel: 'Importer', cancelLabel: 'Annuler',
            onConfirm: () => { mergeImportedData(parsed); input.value = ''; }
        });
    };
    reader.onerror = () => { showToast('Erreur de lecture du fichier', 'error'); input.value = ''; };
    reader.readAsText(file);
}

function mergeImportedData(parsed) {
    let newChapters = 0, updatedChapters = 0, newCards = 0;
    Object.keys(parsed).forEach(subj => {
        if(!db[subj]) db[subj] = {};
        Object.keys(parsed[subj]).forEach(ch => {
            const incoming = parsed[subj][ch];
            if(!db[subj][ch]) {
                // Nouveau chapitre : on l'ajoute tel quel, avec des SRS fraîches
                db[subj][ch] = {
                    cours: incoming.cours,
                    userEdited: true,
                    flashcards: incoming.flashcards.map(f => ({ q: f.q, a: f.a, score: 0, interval: 0, ease: 2.5, due: null }))
                };
                newChapters++;
                newCards += incoming.flashcards.length;
            } else {
                // Chapitre existant : cours mis à jour, flashcards fusionnées
                // (les cartes déjà présentes gardent leur progression SRS)
                db[subj][ch].cours = incoming.cours;
                db[subj][ch].userEdited = true;
                const existingCards = db[subj][ch].flashcards || [];
                const existingQs = new Set(existingCards.map(c => c.q));
                incoming.flashcards.forEach(f => {
                    if(!existingQs.has(f.q)) {
                        existingCards.push({ q: f.q, a: f.a, score: 0, interval: 0, ease: 2.5, due: null });
                        newCards++;
                    }
                });
                db[subj][ch].flashcards = existingCards;
                updatedChapters++;
            }
        });
    });
    save();
    showToast(`📥 Import réussi ! ${newChapters} nouveau(x), ${updatedChapters} mis à jour, ${newCards} carte(s) ajoutée(s)`);
    openSync();
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

// ── MODE SOMBRE ──────────────────────────────────────────────
function toggleDarkMode() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if(isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('bm_theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('bm_theme', 'dark');
    }
    updateThemeBtn();
}
function updateThemeBtn() {
    const btn = document.getElementById('theme-toggle-btn');
    if(!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = isDark ? 'Mode clair' : 'Mode sombre';
}

// ── DÉMARRAGE ─────────────────────────────────────────────────
// Afficher la page d'accueil dès que le DOM est prêt
// ── RAPPELS (notification si absence de 2+ jours) ───────────────
// Limite honnête : sans serveur de push, on ne peut pas notifier quelqu'un
function updateNotifBtn() {
    const btn = $('notif-btn'); if(!btn) return;
    if(!('Notification' in window)) { btn.style.display='none'; return; }
    if(Notification.permission === 'granted') { btn.textContent = '🔔 Rappels activés'; btn.disabled = true; }
    else { btn.textContent = '🔕 Activer les rappels'; btn.disabled = false; }
}

document.addEventListener("DOMContentLoaded", () => {
    goHome();
    updateThemeBtn();
    const savedYt = localStorage.getItem('bm_custom_yt');
    const ytInput = document.getElementById('yt-custom-url');
    if(ytInput) {
        if(savedYt) ytInput.value = savedYt;
        ytInput.addEventListener('keydown', e => { if(e.key==='Enter') playCustomYoutube(); });
    }
});



// Windows n'affiche pas les drapeaux emoji (on y voit « ES ») : on remplace 🇪🇸 par un drapeau dessiné en CSS.
(function bmFlags(){
    if(!/Windows/i.test(navigator.userAgent)) return;
    const FLAG='\u{1F1EA}\u{1F1F8}';
    function fix(root){
        if(!root || root.nodeType!==1 && root.nodeType!==3) return;
        const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.includes(FLAG)&&!/^(OPTION|TEXTAREA|SCRIPT|STYLE|TITLE)$/.test(n.parentNode.nodeName)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
        const hits=[]; while(w.nextNode()) hits.push(w.currentNode);
        hits.forEach(n=>{ const parts=n.nodeValue.split(FLAG), f=document.createDocumentFragment();
            parts.forEach((p,i)=>{ if(i){ const sp=document.createElement('span'); sp.className='bm-flag-es'; sp.setAttribute('role','img'); sp.setAttribute('aria-label','Espagne'); f.appendChild(sp); } if(p) f.appendChild(document.createTextNode(p)); });
            n.parentNode.replaceChild(f,n); });
    }
    new MutationObserver(m=>m.forEach(r=>r.addedNodes.forEach(fix))).observe(document.body,{childList:true,subtree:true});
    fix(document.body);
})();
