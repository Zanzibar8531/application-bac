/* ============================================================
   BacMaster — app-pages.js
   Barre latérale, pages (accueil, matières, chapitres), rafraîchissement après synchro, révision du jour, badges, rôles
   (ancien script.js découpé : les fichiers se chargent dans cet ordre et partagent le même espace global)
   ============================================================ */
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
function updateTopbarContext() {
    const nav = document.getElementById('tb-contextnav');
    const actions = document.getElementById('tb-course-actions');
    if (!nav) return;

    const cfg = CFG.find(c => c.name === curSubject) || {icon:'📚'};
    let navHtml = '';

    // Le bouton Accueil reste disponible partout sauf sur l'accueil lui-même.
    if (curSubject) {
        navHtml += `<button class="tb-home-btn" onclick="goHome()" title="Accueil">🏠 Accueil</button>`;
        navHtml += `<button onclick="goSubject('${esc(curSubject)}')" title="${esc(curSubject)}">${cfg.icon} ${esc(curSubject)}</button>`;
    }
    if (curChapter) {
        navHtml += `<button onclick="goModeChapters(curTab==='voc'||curTab==='add'?'voc':'cours')" title="Retour aux chapitres">← Chapitres</button>`;
        navHtml += `<span class="tb-chapter-title" title="${esc(curChapter)}">${esc(curChapter)}</span>`;
        if (bmCanEdit()) navHtml += `<button class="tb-rename" onclick="renameChapter('${esc(curChapter)}', renderChapter)" title="Renommer le chapitre">✏️</button>`;
    } else if (curSubject) {
        const modeLabels = {cours:'📖 Cours', voc:'📚 Vocabulaire', edit:'✏️ Éditer', add:'➕ Ajouter'};
        if (modeLabels[curTab]) navHtml += `<span class="tb-mode-title">${modeLabels[curTab]}</span>`;
    }

    nav.innerHTML = navHtml;
    nav.classList.add('show');

    // Mobile : la barre contextuelle ci-dessus est masquée (trop large).
    // Le logo "BacMaster" ramène à l'accueil ; on ajoute seulement le bouton ← (retour aux chapitres).
    const mnav = document.getElementById('tb-mobile-nav');
    if (mnav) {
        mnav.innerHTML = (curSubject && curChapter)
            ? `<button class="tb-mnav-btn" onclick="goModeChapters(curTab==='voc'||curTab==='add'?'voc':'cours')" title="Retour aux chapitres" aria-label="Retour aux chapitres">←</button>`
            : '';
    }

    // Les deux actions gardent une place fixe dans la barre supérieure.
    // Elles sont actives uniquement lorsqu'un cours est réellement ouvert.
    if (actions) {
        const active = !!curChapter && curTab === 'cours';
        const tip = t => active ? t : 'Ouvre un cours pour utiliser cette fonction';
        actions.innerHTML = `
          <button class="tb-course-action ${active?'':'disabled'}" ${active ? 'onclick="courseSelfTest(true)"' : 'disabled'} title="${tip('Me tester sur ce cours')}" aria-label="Me tester">🧠</button>
          <button class="tb-course-action ${active?'':'disabled'}" ${active ? 'onclick="exportFiche()"' : 'disabled'} title="${tip('Exporter la fiche (PDF / impression)')}" aria-label="Imprimer le cours">🖨️</button>
        `;
    }

    updateMobileCourseToc();
    // Nettoyage des anciens éléments de progression de lecture.
    document.querySelectorAll('.course-studybar, .mobile-course-progress, #course-progress-label, #course-progress-fill').forEach(el => el.remove());
}

function updateMobileCourseToc() {
    const tools = document.getElementById('course-mobile-tools');
    const toc = document.getElementById('course-mobile-toc');
    if (!tools || !toc) return;
    if (!curChapter || curTab !== 'cours') {
        tools.style.display = 'none';
        toc.innerHTML = '';
        return;
    }
    const body = document.getElementById('printable-cours');
    if (!body) return;
    const headings = [...body.querySelectorAll('h3')];
    const links = headings.map((h,i)=>{
        const id='bm-course-mobile-section-'+i;
        h.id = h.id || ('bm-course-section-'+i);
        return `<button class="sb-link course-mobile-toc-link" onclick="document.getElementById('${h.id}')?.scrollIntoView({behavior:'smooth',block:'start'});closeSidebar();">${i+1}. ${escT(h.textContent)}</button>`;
    }).join('');
    toc.innerHTML = links || `<div class="course-mobile-empty">Ce cours est présenté en une seule partie.</div>`;
    const subtitle=document.getElementById('course-mobile-subtitle');
    if(subtitle) subtitle.textContent = curChapter;

    // Place la navigation immédiatement sous la matière active.
    const subjectBtn=[...document.querySelectorAll('.sb-nav .sb-link')].find(b=>b.textContent.includes(curSubject));
    if(subjectBtn){
        const parent=subjectBtn.parentElement;
        parent.insertBefore(tools, subjectBtn.nextSibling);
    }
    tools.style.display='block';
}

let bmRefreshing = false, bmLastHtml = '', bmLastTouch = 0, bmRefreshRetry = null;
['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach(ev => addEventListener(ev, () => { bmLastTouch = Date.now(); }, { passive: true, capture: true }));

function render(html) {
    // Filet de sécurité : si on quitte l'éditeur de cours avec une modif pas
    // encore autosauvegardée (moins de 1,5s après la dernière frappe), on la
    // force à s'enregistrer immédiatement avant de changer de page.
    if(hasUnsavedEdits && $('editor')){ clearTimeout(autosaveTimer); autosaveCoursNow(); }
    // Rafraîchissement venu de la synchro : si l'écran est identique on n'y touche pas (plus de clignotement,
    // plus de clic qui tombe sur un bouton déplacé) ; sinon on remplace sans animation ni retour en haut.
    if(bmRefreshing && html === bmLastHtml && M().innerHTML) return;
    bmLastHtml = html;
    M().innerHTML = html;
    updateTopbarContext();
    document.body.classList.remove('course-page', 'home-page');
    if(bmRefreshing){ setTimeout(()=>typesetMath(M()), 50); return; }
    M().classList.add('animate');
    setTimeout(()=>{ M().classList.remove('animate'); typesetMath(M()); }, 50);
    window.scrollTo(0,0);
}

// ── RAFRAÎCHISSEMENT APRÈS SYNCHRO ────────────────────────────
// Appelé par supabase-app.js quand un cours ou la progression change sur un autre appareil.
// Ne touche jamais à l'éditeur, à un champ en cours de saisie, ni à une session de révision.
function refreshCurrentView() {
    if (typeof hasUnsavedEdits !== 'undefined' && hasUnsavedEdits) return false;
    // Tu es en train de toucher / faire défiler l'écran : on attend que tu aies fini avant de le redessiner.
    if (Date.now() - bmLastTouch < 2000) { clearTimeout(bmRefreshRetry); bmRefreshRetry = setTimeout(refreshCurrentView, 1200); return false; }
    bmRefreshing = true;
    try { return refreshCurrentViewNow(); } finally { bmRefreshing = false; }
}
function refreshCurrentViewNow() {
    if ($('editor')) return false;
    const a = document.activeElement;
    if (a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable)) return false;
    const y = window.scrollY;
    const restore = () => setTimeout(() => window.scrollTo(0, y), 80);
    if ($('ws-box') && curSubject && curChapter) {
        if (!db[curSubject] || !db[curSubject][curChapter]) { goModeChapters('cours'); return true; }
        if (curTab === 'cours' || curTab === 'voc') { renderTabContent(); restore(); return true; }
        return false;
    }
    if (document.querySelector('.chapters-grid') && curSubject && !curChapter && curListMode && db[curSubject]) {
        goModeChapters(curListMode); restore(); return true;
    }
    return false;
}
window.BacMasterRefreshView = refreshCurrentView;

// ── RÉVISION DU JOUR (multi-matières) ────────────────────────────
function startDailyReview() {
    dailyReviewMode = true;
    const seen = new Set(); let queue = [];

    // 1. Priorité : matières avec une évaluation dans les 7 prochains jours.
    // On pioche même des cartes pas encore "dues" si besoin, pour garantir
    // assez de répétitions avant le contrôle.
    const urgent = upcomingEvals(7);
    urgent.forEach(ev => {
        if(!db[ev.subject]) return;
        let due = [], notDue = [];
        Object.keys(db[ev.subject]).forEach(ch => {
            if(!chapterDiscovered(db[ev.subject][ch])) return; // cours jamais ouvert : rien à « revoir »
            (db[ev.subject][ch].flashcards || []).forEach(c => {
                const k = ev.subject+'|'+ch+'|'+c.q+'|'+c.a;
                if(seen.has(k)) return;
                seen.add(k);
                (isDue(c) ? due : notDue).push({card:c, ch, subj:ev.subject});
            });
        });
        due = due.sort(()=>Math.random()-.5);
        notDue = notDue.sort(()=>Math.random()-.5);
        const quota = 12;
        let picked = due.slice(0, quota);
        if(picked.length < quota) picked = picked.concat(notDue.slice(0, quota-picked.length));
        queue.push(...picked);
    });

    // 2. Complète avec les cartes dues normales de toutes les matières
    CFG.forEach(s => {
        if(!db[s.name]) return;
        Object.keys(db[s.name]).forEach(ch => {
            (db[s.name][ch].flashcards || []).forEach(c => {
                const k = s.name+'|'+ch+'|'+c.q+'|'+c.a;
                if(!seen.has(k) && isDueIn(db[s.name][ch], c)) { seen.add(k); queue.push({card:c, ch, subj:s.name}); }
            });
        });
    });

    if(!queue.length) {
        render(`<div class="ws-box" style="text-align:center;padding:50px 20px;">
            <div style="font-size:3rem;margin-bottom:10px">🎉</div>
            <h3 style="font-family:'Sora',sans-serif;margin-bottom:8px">Tout est à jour !</h3>
            <p style="color:var(--muted);margin-bottom:22px">Aucune carte à réviser aujourd'hui, dans aucune matière. Reviens plus tard !</p>
            <button class="btn-main" onclick="goHome()">← Retour à l'accueil</button>
        </div>`);
        return;
    }
    queue = queue.sort(()=>Math.random()-.5).slice(0, 30);
    srsQueue = queue; srsAgain = []; sessDone = 0; sessTotal = srsQueue.length;
    sessStats = {seen:0, right:0, wrong:0}; qSecs = 0;
    clearInterval(qTimer);
    qTimer = setInterval(()=>{
        qSecs++;
        const el = $('srs-timer');
        if(el){ const m=String(Math.floor(qSecs/60)).padStart(2,'0'); const s=String(qSecs%60).padStart(2,'0'); el.textContent=m+':'+s; }
    }, 1000);
    renderSRSCard();
}

function goHome() {
    clearInterval(qTimer);
    curChapter = '';
    curSubject = '';
    curTrackedPage = null;
    const gs = globalStats();
    const urgentEvals = upcomingEvals(7);
    render(`
        <div class="home-page">
        <div class="page-head animate">
            <h1>Mes Matières</h1>
            <p>Sélectionne une matière pour commencer à réviser</p>
        </div>
        ${urgentEvals.length>0 ? `
        <div class="eval-banner">
            ${urgentEvals.map(e=>{
                const diff = Math.round((new Date(e.date)-new Date(dayKey(new Date())))/86400000);
                const cfg = CFG.find(c=>c.name===e.subject);
                const diffLabel = diff===0?"aujourd'hui":diff===1?'demain':`dans ${diff} jours`;
                return `<span class="eval-chip">${cfg?cfg.icon:'📚'} ${escT(e.subject)} — ${diffLabel}</span>`;
            }).join('')}
        </div>` : ''}
        ${typeof bmGoalCardHTML==='function' ? bmGoalCardHTML() : ''}
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
                <div class="scard scard-${s.cls}" onclick="goSubject('${esc(s.name)}')">
                    <div class="scard-icon">${s.icon}</div>
                    <h3>${s.name}</h3>
                    ${st.total>0?`
                    <div class="scard-bar"><div class="scard-bar-fill" style="width:${pct}%;background:${c}"></div></div>
                    <div style="font-size:.72rem;color:var(--muted)">${st.total} cartes · ${pct}% maîtrisées</div>`:''}
                    ${badge}
                </div>`;
            }).join('')}
        </div>
        <button class="update-check-btn" style="opacity:.75" onclick="openSync()">📥 Télécharger mes cours</button>
        </div>
    `);
    document.body.classList.add('home-page');
    updateNotifBtn();
}

function goSubject(name) {
    clearInterval(qTimer);
    curTrackedPage = null;
    curChapter = '';
    curSubject = name;
    if(!db[name]) db[name] = {};
    const cfg = CFG.find(c => c.name === name);
    const st  = subStats(name);
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="goHome()">← Accueil</button></div>
        <div class="page-head">
            <h1>${cfg.icon} ${name}</h1>
            <p>${st.total} cartes · ${st.discovered} découvertes · ${st.due} à réviser</p>
        </div>
        ${typeof psSubjectSummaryHTML==='function' ? psSubjectSummaryHTML(name) : ''}
        <div class="menu-grid">
            <button class="menu-tile menu-tile-cours" onclick="goModeChapters('cours')">
                <span class="menu-tile-icon">📖</span>
                <span class="menu-tile-label">Cours</span>
                <span class="menu-tile-sub">Lire & éditer</span>
            </button>
            <button class="menu-tile menu-tile-voc" onclick="goModeChapters('voc')">
                <span class="menu-tile-icon">📚</span>
                <span class="menu-tile-label">Vocabulaire</span>
                <span class="menu-tile-sub">${st.total} ${['Anglais','Espagnol'].includes(name)?'mot':'carte'}${st.total>1?'s':''}</span>
            </button>
            <button class="menu-tile menu-tile-flash" onclick="openSRS()">
                <span class="menu-tile-icon">🎴</span>
                <span class="menu-tile-label">Flashcards</span>
                <span class="menu-tile-sub">${st.due > 0 ? st.due + ' à réviser' : '✓ À jour'}</span>
            </button>
            <button class="menu-tile menu-tile-exo" onclick="openExercices()">
                <span class="menu-tile-icon">✏️</span>
                <span class="menu-tile-label">Exercices</span>
                <span class="menu-tile-sub">Énoncés + corrections</span>
            </button>
            ${typeof vcTile==='function' ? vcTile(name) : ''}
            <button class="menu-tile menu-tile-eval" onclick="openEval('${esc(name)}')">
                <span class="menu-tile-icon">🧪</span>
                <span class="menu-tile-label">Évaluation</span>
                <span class="menu-tile-sub">Vérifier ta maîtrise réelle</span>
            </button>
            <button class="menu-tile menu-tile-errors" onclick="openErrors('${esc(name)}')">
                <span class="menu-tile-icon">📓</span>
                <span class="menu-tile-label">Carnet d'erreurs</span>
                <span class="menu-tile-sub">${typeof errCount==='function' ? errCount(name) : 0} à retravailler</span>
            </button>
            <button class="menu-tile menu-tile-skills" onclick="openSkills('${esc(name)}')">
                <span class="menu-tile-icon">🎯</span>
                <span class="menu-tile-label">Compétences</span>
                <span class="menu-tile-sub">Radar · points faibles · quoi travailler</span>
            </button>
        </div>
    `);
}

// ── BADGES DE LECTURE (Nouveau / Lu le.../ Dernier lu) ────────
function fmtShortDate(iso) {
    const d = new Date(iso), today = new Date();
    if(d.toDateString() === today.toDateString()) return "aujourd'hui";
    const hier = new Date(today); hier.setDate(hier.getDate()-1);
    if(d.toDateString() === hier.toDateString()) return "hier";
    return d.toLocaleDateString('fr-FR', {day:'numeric', month:'short'});
}

function mostRecentlyReadChapter(subj) {
    let best = null, bestTime = 0;
    Object.entries(db[subj]).forEach(([ch, data]) => {
        if(data.lastRead) {
            const t = new Date(data.lastRead).getTime();
            if(t > bestTime) { bestTime = t; best = ch; }
        }
    });
    return best;
}

let curListMode = '';
function goModeChapters(mode) {
    if ((mode === 'edit' || mode === 'add') && !bmCanEdit()) { bmDenyEdit(); mode = 'cours'; }
    curListMode = mode;
    curTrackedPage = null;
    curChapter = '';
    const cfg = CFG.find(c => c.name === curSubject);
    const chapters = Object.keys(db[curSubject]);
    const modeLabel = {cours:'📖 Cours', voc:'📚 Vocabulaire', edit:'✏️ Éditer', add:'➕ Ajouter'}[mode] || mode;
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">← ${cfg ? cfg.icon : ''} ${curSubject}</button></div>
        <div class="page-head"><h1 style="font-size:1.2rem">Choisis un chapitre</h1></div>
        <div class="chapters-grid" style="--c:${subjectColor(curSubject)}">
            ${(()=>{ const mostRecent = mostRecentlyReadChapter(curSubject); return chapters.map(ch => {
                const cards = db[curSubject][ch].flashcards || [];
                const due   = cards.filter(c => isDueIn(db[curSubject][ch], c)).length;
                const toDiscover = chapterDiscovered(db[curSubject][ch]) ? 0 : cards.length;
                const lastRead = db[curSubject][ch].lastRead;
                let badge;
                if(ch === mostRecent) badge = `<span class="chcard-badge badge-recent">📍 Dernier lu</span>`;
                else if(!lastRead) badge = `<span class="chcard-badge badge-new">🆕 Nouveau</span>`;
                else badge = `<span class="chcard-badge badge-read">✅ Lu ${fmtShortDate(lastRead)}</span>`;
                return `<div class="chcard" onclick="curChapter='${esc(ch)}';curTab='${mode}';chapFrom='list';renderChapter()">
                    ${bmCanEdit() ? `<div class="chcard-icons">
                        <button class="chcard-icon-btn" onclick="event.stopPropagation();renameChapter('${esc(ch)}')" title="Renommer">✏️</button>
                        <button class="chcard-icon-btn chcard-icon-del" onclick="event.stopPropagation();deleteChapter('${esc(ch)}','${mode}')" title="Supprimer">🗑️</button>
                    </div>` : ''}
                    <div class="chcard-name">${ch}</div>
                    ${bmLastEditText(curSubject,ch) ? `<div class="chcard-lastedit">${bmLastEditText(curSubject,ch)}</div>` : ''}
                    ${bmVerifiedText(curSubject,ch) ? `<div class="chcard-verified ${bmVerified(curSubject,ch).fresh ? '' : 'stale'}">${bmVerifiedText(curSubject,ch)}</div>` : ''}
                    <div class="chcard-meta">
                        <span>📋 ${cards.length} ${['Anglais','Espagnol'].includes(curSubject)?'mot'+(cards.length>1?'s':''):'carte'+(cards.length>1?'s':'')}</span>
                        ${due > 0 ? `<span style="color:#4f46e5">⏰ ${due} à réviser</span>` : (toDiscover > 0 ? '<span style="color:#d97706">🆕 À découvrir</span>' : '<span style="color:#059669">✓ À jour</span>')}
                    </div>
                    ${typeof psPill==='function' ? psPill(curSubject, ch) : ''}
                    ${badge}
                </div>`;
            }).join(''); })()}
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
    curTrackedPage = null;
    const cfg = CFG.find(c => c.name === curSubject);
    const cards = (db[curSubject][curChapter].flashcards || []);
    const due   = cards.filter(c => isDueIn(db[curSubject][curChapter], c)).length;
    const discovered = chapterDiscovered(db[curSubject][curChapter]);
    const menuItems = [
        { id:'cours',   icon:'📖', label:'Cours',      sub:'Lire le cours' },
        { id:'voc',     icon:'📚', label:'Vocabulaire', sub:`${cards.length} ${(['Anglais','Espagnol'].includes(curSubject)?'mot':'carte')}${cards.length>1?'s':''}` },
        { id:'eval',    icon:'🧪', label:'Évaluation',  sub:'Vérifier ce chapitre' },
        { id:'flash',   icon:'🎴', label:'Flashcards',  sub: discovered ? `${due} à réviser` : `🆕 ${cards.length} à découvrir` },
    ];
    const nExo = (db[curSubject][curChapter].exercices || []).length;
    if (nExo > 0) menuItems.splice(3, 0, { id:'exo', icon:'✏️', label:'Exercices', sub:`${nExo} exercice${nExo>1?'s':''}` });
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">← ${cfg ? cfg.icon : ''} ${curSubject}</button></div>
        <div class="page-head">
            <h1 style="font-size:1.25rem">${curChapter}</h1>
        </div>
        ${typeof psChapterBannerHTML==='function' ? psChapterBannerHTML(curSubject, curChapter) : ''}
        <div class="menu-grid">
            ${menuItems.map(m => `
            <button class="menu-tile menu-tile-${m.id}" onclick="handleMenuTile('${m.id}')">
                <span class="menu-tile-icon">${m.icon}</span>
                <span class="menu-tile-label">${m.label}</span>
                <span class="menu-tile-sub">${m.sub}</span>
            </button>`).join('')}
        </div>
        <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
            <button class="bc-btn" ${bmCanEdit() ? `onclick="curTab='edit';renderChapter()"` : 'disabled aria-disabled="true" title="Lecture seule : ton rôle ne permet pas de modifier"'}>${bmCanEdit() ? '' : '🔒 '}✏️ Éditer le cours</button>
            <button class="bc-btn" ${bmCanEdit() ? `onclick="curTab='add';renderChapter()"` : 'disabled aria-disabled="true" title="Lecture seule : ton rôle ne permet pas de modifier"'}>${bmCanEdit() ? '' : '🔒 '}➕ Ajouter un mot</button>
        </div>
    `);
}

function handleMenuTile(id) {
    if (id === 'eval')  { openEval(curSubject, curChapter); return; }
    if (id === 'exo')   { openExoChapter(curChapter); return; }
    if (id === 'flash') { openSRS(curChapter); return; }
    curTab = id === 'cours' ? 'cours' : 'voc';
    chapFrom = 'menu';
    renderChapter();
}

// Bouton « retour » de la page d'un cours : revient là d'où on vient
function chapBack() {
    if (chapFrom === 'menu' && db[curSubject] && db[curSubject][curChapter]) renderChapterMenu();
    else goModeChapters(curTab === 'edit' || curTab === 'add' ? curTab : (curTab || 'cours'));
}

// ── Correcteur orthographique : soulignement rouge des fautes, dans la langue de la matière ──
function bmSpellLang() { return /anglais/i.test(curSubject || '') ? 'en' : /espagnol/i.test(curSubject || '') ? 'es' : 'fr'; }
function bmSpellAttrs(lang) { return `spellcheck="true" lang="${lang || bmSpellLang()}" autocorrect="on" autocapitalize="sentences"`; }

// ── Dernière modification d'un cours (qui ? quand ?) ─────────
function bmAgo(iso){
    const t=Date.parse(iso||''); if(!t) return '';
    const s=Math.max(0,Math.round((Date.now()-t)/1000));
    if(s<45) return 'à l’instant';
    if(s<3600) return 'il y a '+Math.max(1,Math.round(s/60))+' min';
    if(s<86400) return 'il y a '+Math.round(s/3600)+' h';
    const d=new Date(t); return 'le '+d.toLocaleDateString('fr-FR',{day:'numeric',month:'short'})+' à '+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
}
function bmEscHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function bmLastEditText(subject,chapter){
    const le=db&&db[subject]&&db[subject][chapter]&&db[subject][chapter].lastEdit; if(!le||!le.at) return '';
    const st=window.BacMasterSync&&BacMasterSync.api&&BacMasterSync.api.state;
    const me=st&&st.user&&le.by&&le.by===st.user.id;
    return '✏️ Dernière modification par <b>'+(me?'toi':bmEscHtml(le.name||'un éditeur'))+'</b> · '+bmAgo(le.at);
}
function bmLastEditBar(){ const t=bmLastEditText(curSubject,curChapter); return '<div class="bm-lastedit" id="bm-lastedit"'+(t?'':' hidden')+'>'+t+'</div>'; }
// ── Professeur : passages modifiés signalés + tampon « vérifié » ──────────────
function bmSyncState(){ return window.BacMasterSync && BacMasterSync.api && BacMasterSync.api.state; }
function bmIsTeacher(){ const st=bmSyncState(); return !!st && st.role==='teacher'; }
function bmMyName(){ const st=bmSyncState(); return (st && (st.displayName || (st.user && st.user.email))) || 'Professeur'; }
// Les blocs (paragraphes, titres, listes…) que le professeur vient de modifier reçoivent data-prof="son nom" ;
// si quelqu'un d'autre modifie ensuite un de ces blocs, le signalement disparaît (le texte n'est plus celui du prof).
function bmStampEditor(){
    try{
        const ed=$('editor'); if(!ed||!curSubject||!curChapter||!db[curSubject]||!db[curSubject][curChapter]) return;
        const norm=n=>n.nodeType===1?n.outerHTML.replace(/ data-prof="[^"]*"/g,''):'#'+n.textContent;
        const tpl=document.createElement('div'); tpl.innerHTML=db[curSubject][curChapter].cours||'';
        const before=new Map(); [...tpl.childNodes].forEach(n=>{ const k=norm(n); before.set(k,(before.get(k)||0)+1); });
        const teacher=bmIsTeacher(), me=bmMyName();
        [...ed.childNodes].forEach(n=>{
            if(n.nodeType!==1) return;
            const k=norm(n), c=before.get(k)||0;
            if(c>0){ before.set(k,c-1); return; }                      // bloc inchangé
            if(teacher){ if(n.getAttribute('data-prof')!==me) n.setAttribute('data-prof',me); }
            else if(n.hasAttribute('data-prof')) n.removeAttribute('data-prof');
        });
    }catch(e){}
}
window.bmStampEditor=bmStampEditor;
function bmVerified(subject,chapter){
    const d=db&&db[subject]&&db[subject][chapter], v=d&&d.verified; if(!v||!v.at) return null;
    const st=bmSyncState();
    // le serveur certifie qui a écrit en dernier : si ce n'est plus le professeur, le cours a été modifié depuis sa vérification
    const fresh=!st || !d.serverBy || !v.by || d.serverBy===v.by;
    return { fresh, name:v.name||'le professeur', at:v.at };
}
function bmVerifiedText(subject,chapter){
    const v=bmVerified(subject,chapter); if(!v) return '';
    return v.fresh ? '✅ Vérifié par <b>'+bmEscHtml(v.name)+'</b> · '+bmAgo(v.at)
                   : '⚠️ Vérifié par <b>'+bmEscHtml(v.name)+'</b> '+bmAgo(v.at)+' — modifié depuis';
}
function bmVerifyBar(){
    const t=bmVerifiedText(curSubject,curChapter), v=bmVerified(curSubject,curChapter);
    const btn=bmIsTeacher() ? `<button type="button" class="bm-verify-btn" onclick="bmVerifyChapter()">${v&&v.fresh?'🔁 Vérifier à nouveau':'✅ Marquer comme vérifié'}</button>` : '';
    return '<div class="bm-verified'+(v&&!v.fresh?' stale':'')+'" id="bm-verified"'+((t||btn)?'':' hidden')+'><span>'+t+'</span>'+btn+'</div>';
}
function bmVerifyChapter(){
    if(!bmIsTeacher()||!curSubject||!curChapter||!db[curSubject]||!db[curSubject][curChapter]) return;
    if($('editor')) autosaveCoursNow();                                   // on enregistre d'abord ce qui est à l'écran
    const st=bmSyncState();
    db[curSubject][curChapter].verified={ by:(st&&st.user&&st.user.id)||'', name:bmMyName(), at:new Date().toISOString() };
    if(st&&st.user) db[curSubject][curChapter].serverBy=st.user.id;
    save(); window.bmRefreshLastEdit(); showToast('✅ Cours marqué comme vérifié','success');
}
window.bmVerifyChapter=bmVerifyChapter;
window.bmRefreshLastEdit=function(){
    const el=document.getElementById('bm-lastedit'); if(el){ const t=bmLastEditText(curSubject,curChapter); el.innerHTML=t; el.hidden=!t; }
    const vb=document.getElementById('bm-verified');
    if(vb){ const t=bmVerifiedText(curSubject,curChapter), v=bmVerified(curSubject,curChapter), want=bmVerifyBar(); const tmp=document.createElement('div'); tmp.innerHTML=want; const nv=tmp.firstChild;
        if(nv && (vb.innerHTML!==nv.innerHTML || vb.className!==nv.className)){ vb.className=nv.className; vb.innerHTML=nv.innerHTML; } vb.hidden=nv?nv.hidden:true; }
};

// ── Clavier ouvert (téléphone) : la barre du haut et la barre d'outils doivent rester visibles ──
// Chrome récent rétrécit la page grâce à « interactive-widget=resizes-content » (voir index.html).
// Sur les navigateurs qui ne le font pas, la zone visible glisse dans la page : on suit ce décalage.
(function () {
    const vv = window.visualViewport; if (!vv) return;
    const root = document.documentElement;
    const upd = () => {
        const off = Math.max(0, Math.round(vv.offsetTop));
        root.style.setProperty('--bm-vv-top', off + 'px');
        root.classList.toggle('bm-vv-shift', off > 1);
    };
    vv.addEventListener('scroll', upd); vv.addEventListener('resize', upd); upd();
})();

// ── Rôle : un lecteur ne peut pas modifier les cours ──────────
function bmCanEdit() { try { return !(window.BacMasterSync && BacMasterSync.canEdit) || !!BacMasterSync.canEdit(); } catch(e) { return true; } }
function bmDenyEdit() { showToast('🔒 Lecture seule : ton rôle ne permet pas de modifier les cours.', 'info'); return false; }
// appelé quand le rôle change (chargement du profil, changement par un admin)
window.bmRoleChanged = function () {
    try {
        const st = window.BacMasterSync && BacMasterSync.api && BacMasterSync.api.state;
        document.body.classList.toggle('role-teacher', !!st && st.role === 'teacher');
        if (!bmCanEdit()) { if (curTab === 'edit' || curTab === 'add') curTab = 'cours'; if (curListMode === 'edit' || curListMode === 'add') curListMode = 'cours'; }
        if (document.getElementById('dl-root') && window.bmDownloadRefresh) window.bmDownloadRefresh();
        else if (curChapter && document.querySelector('.tab-bar')) renderChapter();
        else if (curChapter && document.querySelector('.menu-tile-flash')) renderChapterMenu();
        else if (!curChapter && document.querySelector('.chcard')) goModeChapters(curListMode);
    } catch (e) {}
};

function renderChapter() {
    if (!bmCanEdit() && (curTab === 'edit' || curTab === 'add')) curTab = 'cours';
    const data = db[curSubject][curChapter];
    const tabs = [
        {id:'cours',  label:'📖 Cours'},
        {id:'edit',   label:'✏️ Éditer'},
        {id:'voc',    label:'📚 Vocabulaire'},
        {id:'add',    label:'➕ Ajouter'},
    ];
    render(`
        <div class="breadcrumb"><button class="bc-btn" onclick="chapBack()">← ${chapFrom === 'menu' ? curChapter : 'Chapitres'}</button></div>
        <div class="ws-header">
            <div class="tab-bar">
                ${tabs.map(t=>{ const lock = (t.id==='edit'||t.id==='add') && !bmCanEdit(); return `<button class="tab-btn ${curTab===t.id?'active':''}" ${lock ? 'disabled aria-disabled="true" title="Lecture seule : ton rôle ne permet pas de modifier"' : `onclick="switchTab('${t.id}')"`}>${lock ? '🔒 ' : ''}${t.label}</button>`; }).join('')}
            </div>
            ${bmLastEditBar()}
            ${bmVerifyBar()}
        </div>
        <div class="ws-box" id="ws-box"></div>
    `);
    document.body.classList.add('course-page');
    document.body.classList.toggle('editing-course', curTab === 'edit');
    renderTabContent();
}

function switchTab(t) { if ((t==='edit'||t==='add') && !bmCanEdit()) return bmDenyEdit(); curTab=t; vocEditingIndex=null; renderChapter(); }


function setupCourseReader(box) {
    const body = box.querySelector('#printable-cours');
    const toc = box.querySelector('#course-toc');
    if(!body || !toc) return;
    const headings = [...body.querySelectorAll('h3')];
    if(headings.length){
        toc.innerHTML = `<div class="course-toc-title">Sommaire</div>` + headings.map((h,i)=>{
            const id = 'bm-course-section-' + i;
            h.id = id;
            return `<button class="course-toc-link" data-target="${id}">${i+1}. ${escT(h.textContent)}</button>`;
        }).join('');
        toc.querySelectorAll('.course-toc-link').forEach(btn=>btn.addEventListener('click',()=>{
            const target=$(btn.dataset.target);
            if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        }));
    } else {
        toc.innerHTML = `<div class="course-toc-title">Cours</div><p class="course-toc-empty">Ce cours est présenté en une seule partie.</p>`;
    }

    // Le pourcentage de lecture a été retiré : le sommaire suffit pour se repérer
    // et reste visible à gauche sur PC.
    if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([body]).catch(()=>{});
}

let selfTestState = { questions: [], index: 0, revealed: false };
let selfTestReturnScrollY = 0;

function returnToCourseFromSelfTest(){
    curTab = 'cours';
    renderChapter();
    requestAnimationFrame(()=>{
        requestAnimationFrame(()=>window.scrollTo({top:selfTestReturnScrollY, behavior:'instant'}));
    });
}

function buildSelfTestQuestions(){
    const data=db[curSubject] && db[curSubject][curChapter];
    if(!data) return [];
    const questions=[];
    (data.flashcards||[]).forEach(c=>{
        if(c && c.q) questions.push({q:String(c.q), a:String(c.a||'')});
    });
    (data.exercices||[]).forEach(ex=>{
        if(ex && ex.enonce) questions.push({
            q:String(ex.enonce).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(),
            a:String(ex.correction||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()
        });
    });
    if(!questions.length) questions.push({
        q:'Reformule l’idée principale de ce chapitre sans regarder le cours.',
        a:'Il n’y a pas encore de correction automatique : compare ta reformulation avec le cours et vérifie que tu peux expliquer l’idée avec tes propres mots.'
    });
    // Mélange léger : l'ordre n'est pas toujours le même, sans perdre la variété.
    return questions.sort(()=>Math.random()-.5);
}

function courseSelfTest(reset=true){
    selfTestReturnScrollY = window.scrollY || window.pageYOffset || 0;
    if(reset || !selfTestState.questions.length || selfTestState.index>=selfTestState.questions.length){
        selfTestState={questions:buildSelfTestQuestions(),index:0,revealed:false};
    }
    renderSelfTestModal();
}

function renderSelfTestModal(){
    const item=selfTestState.questions[selfTestState.index];
    if(!item) return goChapter(curChapter);
    const total=selfTestState.questions.length;
    render(`<div class="modal-backdrop" onclick="returnToCourseFromSelfTest()">
      <div class="selftest-modal selftest-modal-v2" onclick="event.stopPropagation()">
        <div class="selftest-kicker">🧠 Rappel actif · ${selfTestState.index+1}/${total}</div>
        <h2>À toi de répondre</h2>
        <p class="selftest-question">${escT(item.q)}</p>
        <textarea id="selftest-answer" ${bmSpellAttrs()} class="selftest-answer" placeholder="Écris ta réponse ici avant de regarder la correction…"></textarea>
        ${selfTestState.revealed ? `<div class="selftest-answer-box"><strong>Réponse / correction</strong><div>${escT(item.a || 'Aucune correction enregistrée pour cette question.')}</div></div>` : `<p class="selftest-help">Réponds d'abord avec tes propres mots. Il n'y a pas besoin d'être parfait : l'objectif est de faire travailler ta mémoire et ton raisonnement.</p>`}
        <div class="selftest-actions">
          <button class="bc-btn" onclick="returnToCourseFromSelfTest()">← Retour au cours</button>
          ${selfTestState.revealed ? `<button class="bc-btn" onclick="selfTestNext()">Question suivante →</button>` : `<button class="bc-btn" onclick="selfTestReveal()">👁️ Afficher la réponse</button>`}
        </div>
      </div></div>`);
}
function selfTestReveal(){
    selfTestState.revealed=true;
    renderSelfTestModal();
}
function selfTestNext(){
    if(selfTestState.index < selfTestState.questions.length-1){
        selfTestState.index++; selfTestState.revealed=false; renderSelfTestModal();
    } else {
        render(`<div class="modal-backdrop"><div class="selftest-modal selftest-modal-v2"><div class="selftest-kicker">🧠 Rappel actif terminé</div><h2>Bien joué.</h2><p class="selftest-help">Tu viens de faire travailler ta mémoire au lieu de simplement relire le cours.</p><div class="selftest-actions"><button class="bc-btn" onclick="returnToCourseFromSelfTest()">← Retour au cours</button><button class="bc-btn" onclick="switchTab('voc')">📚 Continuer avec les flashcards</button></div></div></div>`);
    }
}

function renderTabContent() {
    if ((curTab === 'edit' || curTab === 'add') && !bmCanEdit()) curTab = 'cours';
    const box = $('ws-box');
    if(!box) return;
    const data = db[curSubject][curChapter];
    // Seule la lecture du cours compte comme "temps d'étude" tracké ici —
    // l'édition ou la liste brute du vocabulaire ne sont pas de la révision active.
    curTrackedPage = (curTab==='cours') ? { subject: curSubject, activity: '📖 Cours — ' + curChapter } : null;
    // Marque ce chapitre comme "lu" à l'instant présent (sert aux badges Nouveau/Lu/Dernier lu
    // affichés sur les cartes de la grille des chapitres).
    if(curTab==='cours' && db[curSubject] && db[curSubject][curChapter]){
        db[curSubject][curChapter].lastRead = new Date().toISOString();
        save();
    }
    if(curTab==='cours') {
        box.classList.add('course-host');
        box.innerHTML = `
            <div class="course-layout">
                <aside class="course-side-column">
                    <div class="course-toc" id="course-toc" aria-label="Sommaire du cours"></div>
                </aside>
                <div class="course-main-column">
                    <div class="ws-box course-content-card">
                        <div class="cours-body" id="printable-cours">${data.cours||'<p style="color:var(--muted)">Aucun cours. Clique sur ✏️ Éditer pour en ajouter un.</p>'}</div>
                        <div class="course-end-check" id="course-end-check">
                        <div class="course-end-icon">✓</div>
                        <div><strong>Cours terminé ? Ne t'arrête pas à la lecture.</strong><p>Ferme le cours, essaie de reformuler l'idée principale avec tes propres mots, puis passe aux exercices ou aux flashcards.</p>
                        <div class="course-next" style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 0">
                            <button class="bc-btn" onclick="handleMenuTile('flash')">🎴 Flashcards</button>
                            ${(data.exercices||[]).length?`<button class="bc-btn" onclick="handleMenuTile('exo')">✏️ Exercices (${data.exercices.length})</button>`:''}
                            <button class="bc-btn" onclick="handleMenuTile('eval')">🧪 Évaluation</button>
                        </div></div>
                        </div>
                    </div>
                </div>
            </div>`;
        typesetMath(box);
        setupFigTooltips(box);
        setupCourseReader(box);
        updateMobileCourseToc();
    }
    else if(curTab==='edit') {
        box.innerHTML = `
            ${typeof bmRibbonHTML==='function' ? bmRibbonHTML() : ''}
            <div id="editor" contenteditable="true" ${bmSpellAttrs()} class="editor-area cours-body">${data.cours||''}</div>
                        <div class="editor-scroll-nav" aria-label="Position dans l’éditeur">
                <div class="esn-track" id="esn-track"><div class="esn-thumb" id="esn-thumb"></div></div>
            </div>
        `;
        setTimeout(trackEditorSelection, 50);
        const edEl = $('editor');
        if(edEl) edEl.addEventListener('input', scheduleAutosaveCours);
        // Colle toujours en texte brut : évite d'importer des styles/couleurs
        // parasites depuis Word, un PDF ou un autre site (police, tailles fixes...).
        if(edEl) edEl.addEventListener('paste', e => {
            e.preventDefault();
            const txt = (e.clipboardData || window.clipboardData).getData('text/plain');
            document.execCommand('insertText', false, txt);
        });
    }
    else if(curTab==='voc') {
        const cards = data.flashcards||[];
        box.innerHTML = cards.length===0
            ? '<p style="color:var(--muted);text-align:center;padding:20px;">Aucun mot. Clique sur ➕ Ajouter pour commencer.</p>'
            : `<p class="voc-count">${cards.length} ${(['Anglais','Espagnol'].includes(curSubject)?'mot':'carte')}${cards.length>1?'s':''}</p>
               <div>${cards.map((c,i)=> i===vocEditingIndex ? `
                <div class="voc-row voc-row-editing">
                    <input type="text" id="voc-edit-q" ${bmSpellAttrs()} class="field" value="${esc(c.q)}" placeholder="Mot ou question">
                    <textarea id="voc-edit-a" ${bmSpellAttrs('fr')} class="field voc-edit-textarea" placeholder="Définition ou réponse">${escT(c.a)}</textarea>
                    <div class="voc-edit-actions">
                        <button class="btn-save" onclick="saveVocEdit(${i})">💾 Enregistrer</button>
                        <button class="bc-btn" onclick="vocEditingIndex=null;renderTabContent()">✕ Annuler</button>
                    </div>
                </div>` : `
                <div class="voc-row">
                    <span class="voc-q">${c.q}${typeof vcSpeakBtn==='function' ? vcSpeakBtn(c,'q',curSubject) : ''}</span>
                    <span class="voc-a">${c.a}${typeof vcSpeakBtn==='function' ? vcSpeakBtn(c,'a',curSubject) : ''}</span>
                    ${bmCanEdit() ? `<button class="voc-edit-sq" onclick="vocEditingIndex=${i};renderTabContent()" title="Modifier">✏️</button>
                    <button class="voc-del-sq" onclick="delVoc(${i})" title="Supprimer">🗑</button>` : ''}
                </div>`).join('')}</div>`;
    }
    else if(curTab==='add') {
        box.innerHTML = `
            <p style="font-weight:700;margin-bottom:12px;">Nouveau mot / flashcard :</p>
            <input type="text" id="vq" ${bmSpellAttrs()} class="field" placeholder="Mot ou question">
            <input type="text" id="va" ${bmSpellAttrs('fr')} class="field" placeholder="Définition ou réponse" onkeydown="if(event.key==='Enter')addVoc()">
            <button class="btn-save" onclick="addVoc()">➕ Ajouter</button>
            <div id="vfb"></div>
        `;
        setTimeout(()=>$('vq')&&$('vq').focus(),80);
    }
}

// Défilement clavier : 100 % natif (↑ ↓ PageUp PageDown Espace), comme dans un navigateur.
// Aucun gestionnaire personnalisé : le navigateur gère la vitesse et la fluidité.
