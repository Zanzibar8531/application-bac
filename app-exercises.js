/* ============================================================
   BacMaster — app-exercises.js
   Exercices
   (ancien script.js découpé : les fichiers se chargent dans cet ordre et partagent le même espace global)
   ============================================================ */
// ── EXERCICES ─────────────────────────────────────────────────
function openExercices() {
    clearInterval(qTimer);
    curTrackedPage = null;
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
            <p style="color:var(--muted);font-size:.85rem">Lis l'énoncé, cherche vraiment, puis regarde la correction</p>
        </div>
        ${(()=>{
            const toReview = Object.values(db[curSubject]).reduce((sum,chData)=>
                sum + (chData.exercices||[]).filter(e=>e.status==='a_revoir'||e.status==='presque').length, 0);
            return toReview>0 ? `<button class="btn-main exo-review-btn" onclick="startExoReviewSession()">🔁 Réviser ce qui n'est pas encore réussi (${toReview})</button>` : '';
        })()}
        <div class="chapters-grid">
            ${chapters.map(ch => {
                const exos = db[curSubject][ch].exercices || [];
                const nF = exos.filter(e=>e.niveau==='Facile').length;
                const nM = exos.filter(e=>e.niveau==='Moyen').length;
                const nD = exos.filter(e=>e.niveau==='Difficile').length;
                return `<div class="chcard" onclick="openExoChapter('${esc(ch)}')">
                    <div class="chcard-name">${ch}</div>
                    ${bmLastEditText(curSubject,ch) ? `<div class="chcard-lastedit">${bmLastEditText(curSubject,ch)}</div>` : ''}
                    ${bmVerifiedText(curSubject,ch) ? `<div class="chcard-verified ${bmVerified(curSubject,ch).fresh ? '' : 'stale'}">${bmVerifiedText(curSubject,ch)}</div>` : ''}
                    <div class="chcard-meta">
                        <span>✏️ ${exos.length} exercice${exos.length>1?'s':''}</span>
                        ${nF?`<span>🟢${nF}</span>`:''}
                        ${nM?`<span>🟡${nM}</span>`:''}
                        ${nD?`<span>🔴${nD}</span>`:''}
                    </div>
                </div>`;
            }).join('')}
        </div>
    `);
}

let curExoChapter='', curExoIdx=0, exoShowCorrection=false, curExoList=[], curExoNiveau='tous';

function openExoChapter(ch) {
    curExoChapter = ch;
    const exos = db[curSubject][ch].exercices || [];
    const nF = exos.filter(e=>e.niveau==='Facile').length;
    const nM = exos.filter(e=>e.niveau==='Moyen').length;
    const nD = exos.filter(e=>e.niveau==='Difficile').length;
    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">🏠</button>
            <span class="bc-sep">›</span>
            <button class="bc-btn" onclick="openExercices()">Exercices</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">${escT(ch)}</span>
        </div>
        <div class="page-head">
            <h1>✏️ ${escT(ch)}</h1>
            <p style="color:var(--muted);font-size:.85rem">Choisis le niveau que tu veux travailler</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
                <button class="bc-btn" onclick="goChapter('${esc(ch)}')">↩️ Retour au chapitre</button>
                <button class="bc-btn" onclick="curChapter='${esc(ch)}';curTab='cours';chapFrom='menu';renderChapter()">📖 Revoir le cours</button>
                <button class="bc-btn" onclick="curChapter='${esc(ch)}';openSRS('${esc(ch)}')">🎴 Flashcards</button>
            </div>
        </div>
        <div class="niveau-picker">
            <button class="niveau-choice niveau-choice-tous" onclick="startExoSession('${esc(ch)}','tous')">
                <span class="nc-icon">📋</span><span class="nc-label">Tous les niveaux</span><span class="nc-count">${exos.length} exercice${exos.length>1?'s':''}</span>
            </button>
            ${nF?`<button class="niveau-choice niveau-choice-facile" onclick="startExoSession('${esc(ch)}','Facile')"><span class="nc-icon">🟢</span><span class="nc-label">Facile</span><span class="nc-count">${nF}</span></button>`:''}
            ${nM?`<button class="niveau-choice niveau-choice-moyen" onclick="startExoSession('${esc(ch)}','Moyen')"><span class="nc-icon">🟡</span><span class="nc-label">Moyen</span><span class="nc-count">${nM}</span></button>`:''}
            ${nD?`<button class="niveau-choice niveau-choice-difficile" onclick="startExoSession('${esc(ch)}','Difficile')"><span class="nc-icon">🔴</span><span class="nc-label">Difficile</span><span class="nc-count">${nD}</span></button>`:''}
        </div>
    `);
}

function startExoSession(ch, niveau) {
    curExoChapter = ch;
    curExoNiveau = niveau;
    const exos = db[curSubject][ch].exercices || [];
    curExoList = exos.map((exo,i) => ({exo, originalIndex:i, ch}))
        .filter(x => niveau==='tous' || x.exo.niveau===niveau);
    curExoIdx = 0; exoShowCorrection = false;
    renderExo();
}

function startExoReviewSession() {
    curExoChapter = '__review__';
    curExoNiveau = 'tous';
    const list = [];
    Object.keys(db[curSubject]).forEach(ch => {
        (db[curSubject][ch].exercices || []).forEach((exo, i) => {
            if(exo.status === 'a_revoir' || exo.status === 'presque') list.push({exo, originalIndex:i, ch});
        });
    });
    curExoList = list;
    curExoIdx = 0; exoShowCorrection = false;
    renderExo();
}

function rateExo(status) {
    const item = curExoList[curExoIdx];
    const exos = db[curSubject][item.ch] && db[curSubject][item.ch].exercices;
    if(exos && exos[item.originalIndex]){
        exos[item.originalIndex].status = status;
        exos[item.originalIndex].lastAttempt = new Date().toISOString();
        save();
        if(typeof logPerf==='function'){
            const pl = typeof errPlain==='function' ? errPlain(item.exo.enonce) : '';
            logPerf(curSubject, item.ch, 'exo', status==='reussi'?1:(status==='presque'?0.5:0), item.exo.niveau||'Moyen', pl ? {k:pl, q:pl, x:item.originalIndex} : undefined);
        }
    }
    if(curExoIdx < curExoList.length - 1){ curExoIdx++; exoShowCorrection=false; renderExo(); }
    else openExoResults();
}

function renderExo() {
    if(!curExoList.length){openExercices();return;}
    const item = curExoList[curExoIdx], exo = item.exo, total = curExoList.length;
    curTrackedPage = { subject: curSubject, activity: '🧩 Exercices — ' + (curExoChapter==='__review__' ? 'Révision' : curExoChapter) };
    const pct=Math.round((curExoIdx/total)*100);
    const niv=(exo.niveau||'Moyen').toLowerCase();
    const nivEmoji=exo.niveau==='Facile'?'🟢':exo.niveau==='Difficile'?'🔴':'🟡';
    const titre = curExoChapter==='__review__' ? `🔁 Révision — ${item.ch}` : curExoChapter;

    render(`
        <div class="breadcrumb">
            <button class="bc-btn" onclick="goSubject('${esc(curSubject)}')">🏠</button>
            <span class="bc-sep">›</span>
            <button class="bc-btn" onclick="openExercices()">Exercices</button>
            <span class="bc-sep">›</span>
            <span class="bc-cur">${escT(titre)}</span>
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
                ${typeof vcExoBtns==='function' ? vcExoBtns(exo, curSubject) : ''}
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
                <div class="exo-label" style="margin-top:14px">Sois honnête : tu en étais où ?</div>
                <div class="exo-rating-row">
                    <button class="exo-rate-btn exo-rate-bad" onclick="rateExo('a_revoir')">🔴 À revoir</button>
                    <button class="exo-rate-btn exo-rate-mid" onclick="rateExo('presque')">🟡 Presque</button>
                    <button class="exo-rate-btn exo-rate-good" onclick="rateExo('reussi')">🟢 Réussi</button>
                </div>
                ${curExoIdx>0?`<button class="bc-btn" style="margin-top:10px" onclick="curExoIdx--;exoShowCorrection=false;renderExo()">← Revoir l'exercice précédent</button>`:''}
            `:`
                <div class="exo-attempt">
                    <div class="exo-label">✏️ Ta réponse / ton raisonnement</div>
                    <textarea id="exo-attempt-area" ${bmSpellAttrs()} class="exo-attempt-area" placeholder="Cherche vraiment avant de regarder la correction — c'est ce qui fait progresser (pas sauvegardé, juste pour toi)."></textarea>
                </div>
                <button class="btn-main exo-voir-btn" onclick="exoShowCorrection=true;renderExo()">
                    👁️ Voir la correction
                </button>
            `}
        </div>
    `);
}

function openExoResults() {
    curTrackedPage = null;
    const total = curExoList.length;
    render(`
        <div class="ws-box"><div class="session-end">
            <div class="se-emoji">🏆</div>
            <div class="se-title">Série terminée !</div>
            <div class="se-subject">${curSubject}${curExoChapter!=='__review__' ? ' · '+curExoChapter : ' · Révision'}</div>
            <div class="se-pct">${total}</div>
            <div class="se-label">exercice${total>1?'s':''} complété${total>1?'s':''}</div>
            <div class="se-actions" style="margin-top:20px">
                ${curExoChapter!=='__review__' ? `<button class="btn-main" onclick="startExoSession('${esc(curExoChapter)}','${curExoNiveau}')">🔄 Recommencer</button>` : ''}
                <button class="btn-main" style="background:linear-gradient(135deg,#059669,#10b981)" onclick="openExercices()">📚 Autres chapitres</button>
                <button class="bc-btn se-home-btn" onclick="goSubject('${esc(curSubject)}')">← Retour au menu</button>
            </div>
        </div></div>
    `);
}

