/* ============================================================
   BacMaster — app-srs.js
   Flashcards : choix des chapitres, séance de révision, comparaison tolérante, figures de style
   (ancien script.js découpé : les fichiers se chargent dans cet ordre et partagent le même espace global)
   ============================================================ */
// ── SRS SETUP ─────────────────────────────────────────────────
// ── RECHERCHE EN DIRECT DANS UNE LISTE DE CHAPITRES ─────────────
function filterCbList(input, cbClass) {
    const term = input.value.trim().toLowerCase();
    document.querySelectorAll('.' + cbClass).forEach(cb => {
        const item = cb.closest('.cb-item');
        if(!item) return;
        const match = cb.value.toLowerCase().includes(term);
        item.style.display = match ? '' : 'none';
    });
}

function openSRS(only) {
    if (typeof only !== 'string') only = '';
    clearInterval(qTimer);
    curTrackedPage = null;
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
            ${chapters.length>6?`<input type="text" class="cb-search" placeholder="🔎 Rechercher un chapitre..." oninput="filterCbList(this,'srs-cb')">`:''}
            <div class="cb-list" id="srs-cb-list">
                ${chapters.map(ch=>{
                    const known=chapterDiscovered(db[curSubject][ch]);
                    const due=(db[curSubject][ch].flashcards||[]).filter(c=>isDueIn(db[curSubject][ch],c)).length;
                    const tot=(db[curSubject][ch].flashcards||[]).length;
                    return `<label class="cb-item">
                        <input type="checkbox" class="srs-cb" value="${ch}" ${only ? (ch===only?'checked':'') : (due>0?'checked':'')}>
                        <span style="flex:1">${ch}</span>
                        <span class="cb-right ${due>0?'due':''}">${due>0?due+' à réviser':(known?tot+' cartes':'🆕 '+tot+' à découvrir')}</span>
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
    dailyReviewMode = false;
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
        onConfirm:()=>{ clearInterval(qTimer); dailyReviewMode ? goHome() : goSubject(curSubject); }
    });
}

function renderSRSCard() {
    srsCur=srsQueue.shift()||srsAgain.shift()||null;
    srsFlipped=false;
    if(!srsCur){renderSRSResults();return;}
    const {card}=srsCur;
    curTrackedPage = { subject: srsCur.subj || curSubject, activity: '🎴 Flashcards — ' + srsCur.ch };
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
                        <span class="fc-q">${card.q}</span>${typeof vcSpeakBtn==='function' ? vcSpeakBtn(card,'q',srsCur.subj||curSubject) : ''}
                    </div>
                    <div class="fc-face fc-back">
                        <span class="fc-label">Réponse correcte</span>
                        <span class="fc-q">${card.a}</span>${typeof vcSpeakBtn==='function' ? vcSpeakBtn(card,'a',srsCur.subj||curSubject) : ''}
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
    if(typeof vcAutoPlay==='function' && srsCur) vcAutoPlay(srsCur.card, srsCur.subj||curSubject, 'q');
}

// ── COMPARAISON TOLÉRANTE (fautes de frappe, accents, ponctuation) ──
function normalizeAnswer(s) {
    return (s || '').trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // enlève les accents
        .replace(/[.,;:!?'"()«»]/g, '')
        .replace(/\s+/g, ' ');
}
function levenshteinDistance(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({length: m + 1}, (_, i) => { const row = new Array(n + 1).fill(0); row[0] = i; return row; });
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
    }
    return dp[m][n];
}

// Petits mots à ignorer pour la comparaison par mots-clés (articles, prépositions, connecteurs).
const STOPWORDS_FR = new Set(['le','la','les','un','une','des','de','du','au','aux','et','ou','à','en','qui','que','qu','ce','ces','cette','cet','son','sa','ses','pour','par','sur','dans','avec','sans','plus','moins','est','sont','être','avoir','on','il','elle','ils','elles','se','sa','ne','pas','vers','entre','comme','donc','ainsi','ça','cela','tout','tous','toute','toutes','pu','peut','peuvent']);

function keywordsOf(s) {
    return normalizeAnswer(s)
        .split(/[^a-z0-9]+/)
        .filter(w => w.length > 2 && !STOPWORDS_FR.has(w));
}

// Compare la réponse tapée à la réponse de référence sur 3 niveaux, plutôt qu'un simple
// oui/non : 'exact' (quasi identique), 'partial' (mots-clés en commun, probablement juste
// une reformulation), 'different' (rien de concluant — l'élève juge lui-même).
function smartMatch(userAnsRaw, correctRaw) {
    const userAns = normalizeAnswer(userAnsRaw);
    const correct = normalizeAnswer(correctRaw);
    if (userAns === '') return 'empty';
    if (userAns === correct) return 'exact';
    const tolerance = Math.max(2, Math.round(correct.length * 0.12));
    if (levenshteinDistance(userAns, correct) <= tolerance) return 'exact';

    const correctKw = keywordsOf(correctRaw);
    const userKw = new Set(keywordsOf(userAnsRaw));
    if (correctKw.length === 0) return 'different';
    const matched = correctKw.filter(w => userKw.has(w)).length;
    const ratio = matched / correctKw.length;
    if (ratio >= 0.5) return 'partial';
    return 'different';
}

function revealSRS(skip){
    skip=skip||false;
    if(srsFlipped)return;
    srsFlipped=true;
    const el=$('srs-ans');
    const userAnsRaw=el?el.value.trim():'';
    const match = skip ? 'skip' : smartMatch(userAnsRaw, srsCur.card.a);
    sessStats.seen++;
    const fc=$('fc3d');if(fc)fc.classList.add('flipped');
    const iz=$('input-zone');if(iz)iz.style.display='none';
    const fz=$('fb-zone');
    if(fz){
        fz.style.display='block';
        if(match==='skip')fz.innerHTML=`<div class="srs-fb fb-skip"><span class="fb-icon">⏭️</span><span>Passé — voici la réponse</span></div>`;
        else if(match==='exact')fz.innerHTML=`<div class="srs-fb fb-right"><span class="fb-icon">✅</span><span>Réponse quasi identique !</span></div>`;
        else if(match==='partial')fz.innerHTML=`<div class="srs-fb fb-partial"><span class="fb-icon">🤔</span><div><div>Formulation différente, mais tu sembles avoir les bons éléments — <strong>compare et juge toi-même</strong> :</div><div style="margin-top:6px">Ta réponse : <b>${userAnsRaw||'—'}</b></div><div style="margin-top:3px">Réponse de référence : <b>${srsCur.card.a}</b></div></div></div>`;
        else fz.innerHTML=`<div class="srs-fb fb-wrong"><span class="fb-icon">📖</span><div><div>Compare ta réponse à celle de référence, et <strong>juge toi-même</strong> si le fond y est :</div><div style="margin-top:6px">Ta réponse : <b>${userAnsRaw||'—'}</b></div><div style="margin-top:3px">Réponse de référence : <b>${srsCur.card.a}</b></div></div></div>`;
        typesetMath(fz); // la réponse peut contenir du LaTeX ($...$) — sans ça, elle s'affichait en brut
    }
    const rr=$('rating-row');if(rr)rr.style.display='grid';
    if(typeof vcAutoPlay==='function' && srsCur) vcAutoPlay(srsCur.card, srsCur.subj||curSubject, 'a');
    // On ne pré-sélectionne un bouton que dans les cas sans ambiguïté (match exact ou carte
    // passée) — dans tous les autres cas, c'est à l'élève de choisir sa note en toute honnêteté,
    // sans suggestion biaisée de l'app.
    if(match==='exact'){const g=document.querySelector('.r-btn.r-good');if(g)g.focus();}
    else if(match==='skip'){const a=document.querySelector('.r-btn.r-again');if(a)a.focus();}
}

function rateSRS(r){
    if(!srsCur)return;
    logActivity();
    const {card,ch}=srsCur;
    // Journal de compétences (competences.js) : 1 = réussi, 0,5 = difficile, 0 = raté
    if(typeof logPerf==='function') logPerf(srsCur.subj||curSubject, ch, 'flash', (r==='good'||r==='easy')?1:(r==='hard'?0.5:0), '', {k:card.q+'|'+card.a, q:card.q, a:card.a});

    const iv=card.interval||0; const e=card.ease||2.5;
    const DAY=86400000; const now=Date.now();
    let newIv,newEase,newDue;
    switch(r){
        case'again':newIv=1;newEase=Math.max(1.3,e-.2);newDue=now+15*60*1000;srsAgain.push(srsCur);sessStats.wrong++;break;
        case'hard': newIv=iv===0?1:Math.max(1,Math.round(iv*1.2));newEase=Math.max(1.3,e-.15);newDue=now+newIv*DAY;sessDone++;sessStats.wrong++;break;
        case'good': newIv=iv===0?3:Math.max(1,Math.round(iv*e));newEase=e;newDue=now+newIv*DAY;sessDone++;sessStats.right++;break;
        case'easy': newIv=iv===0?7:Math.max(4,Math.round(iv*e*1.3));newEase=Math.min(3,e+.15);newDue=now+newIv*DAY;sessDone++;sessStats.right++;break;
    }
    const cards=db[srsCur.subj||curSubject][ch].flashcards;
    const idx=cards.findIndex(c=>c.q===card.q&&c.a===card.a);
    if(idx!==-1){cards[idx].interval=newIv;cards[idx].ease=newEase;cards[idx].due=newDue;cards[idx].rt=Date.now();cards[idx].score=(cards[idx].score||0)+(r==='good'||r==='easy'?1:-1);}
    save(); renderSRSCard();
}

function renderSRSResults(){
    curTrackedPage = null;
    clearInterval(qTimer);
    const tot=sessDone;
    const pct=tot===0?100:Math.round(sessStats.right/tot*100);
    const emoji=pct>=80?'🏆':pct>=60?'👍':'📚';
    const msg=pct>=80?'Excellente session !':pct>=60?'Bien joué, continue !':'Revois les cartes difficiles.';
    const mins=Math.floor(qSecs/60); const secs=qSecs%60;
    const accuracy = tot === 0 ? '—' : pct + '%';
    const subjLabel = dailyReviewMode ? '🌅 Révision du jour · toutes matières' : `${curSubject} · ${selChapters.length} chapitre(s)`;
    const actionButtons = dailyReviewMode ? `
                <button class="btn-main" onclick="startDailyReview()">🔄 Continuer la révision du jour</button>
                <button class="bc-btn se-home-btn" onclick="goHome()">← Retour à l'accueil</button>
    ` : `
                <button class="btn-main" onclick="openSRS()">🔄 Nouvelle session</button>
                <button class="btn-main" style="background:linear-gradient(135deg,#059669,#10b981);box-shadow:0 4px 14px rgba(5,150,105,.3)" onclick="openEval('${esc(curSubject)}')">🧪 Faire une évaluation</button>
                <button class="bc-btn se-home-btn" onclick="goSubject('${esc(curSubject)}')">← Retour au menu</button>
    `;
    render(`
        <div class="ws-box">
        <div class="session-end">
            <div class="se-emoji">${emoji}</div>
            <div class="se-title">${msg}</div>
            <div class="se-subject">${subjLabel}</div>
            <div class="se-pct">${accuracy}</div>
            <div class="se-label">de réussite</div>
            <div class="results-grid" style="margin:18px auto;">
                <div class="res-stat"><div class="res-n" style="color:#059669">${sessStats.right}</div><div class="res-l">Bien</div></div>
                <div class="res-stat"><div class="res-n" style="color:#dc2626">${sessStats.wrong}</div><div class="res-l">À revoir</div></div>
                <div class="res-stat"><div class="res-n" style="color:#4f46e5">${tot}</div><div class="res-l">Faites</div></div>
                <div class="res-stat"><div class="res-n" style="color:#0891b2">${mins}m${String(secs).padStart(2,'0')}s</div><div class="res-l">Durée</div></div>
            </div>
            <div class="se-actions">
                ${actionButtons}
            </div>
        </div>
        </div>
    `);
}

// ── COULEUR D'UNE MATIÈRE ─────────────────────────────────────
const SUBJ_COLORS = {fr:'#059669',math:'#4f46e5',hg:'#9f1239',ang:'#1d4ed8',esp:'#ca8a04',phy:'#7c3aed',idd:'#0d9488',it:'#ea580c',info:'#0891b2',cyber:'#b91c1c',bourse:'#65a30d',entr:'#e11d48',sci:'#6366f1',jur:'#78716c'};
function subjectColor(name){ const cfg=CFG.find(c=>c.name===name); return cfg ? (SUBJ_COLORS[cfg.cls]||'#4f46e5') : '#4f46e5'; }

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
        // Sur mobile, un appui long sur un élément avec l'attribut title[]
        // déclenche la bulle native du navigateur EN PLUS de notre popup —
        // elles se superposent et donnent l'impression que le texte "double".
        // On déplace donc l'explication dans data-tip et on retire title.
        const txt = span.getAttribute('title');
        span.dataset.tip = txt;
        span.removeAttribute('title');
        span.addEventListener('click', e => {
            e.stopPropagation();
            showFigPopup(span, span.dataset.tip);
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
        'fig-relativisme':'Relativisme','fig-note':'Note',
        'fig-periphrase':'Périphrase','fig-synesthesie':'Synesthésie'
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
        'fig-note':        {bg:'#e2e8f0',fg:'#1e293b'},
        'fig-periphrase':  {bg:'#bae6fd',fg:'#0c4a6e'},
        'fig-synesthesie': {bg:'#99f6e4',fg:'#134e4a'},
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

