/* ============================================================
   BacMaster — app-editor.js
   Éditeur de cours : actions, confirmations, outils maths, encadrés, graphiques, sauvegarde automatique
   (ancien script.js découpé : les fichiers se chargent dans cet ordre et partagent le même espace global)
   ============================================================ */
// ── ACTIONS ───────────────────────────────────────────────────
function addChapter() {
    if (!bmCanEdit()) return bmDenyEdit();
    // On donne d'abord un nom, puis on arrive directement dans l'éditeur du cours (comme quand on écrit un nouveau cours).
    customPrompt({
        icon:'📖', title:'Nouveau chapitre', value:'',
        placeholder:'Nom du chapitre', confirmLabel:'Créer et écrire',
        onConfirm:(name)=>{
            const n = (name||'').trim();
            if(!n) return;
            if(db[curSubject][n]){ showToast('Ce nom existe déjà !','warn'); return; }
            db[curSubject][n] = {cours:'', flashcards:[]};
            save();
            curChapter = n; curTab = 'edit'; chapFrom = 'list';
            renderChapter();
        }
    });
}

function renameChapter(oldName, stayFn) {
    if (!bmCanEdit()) return bmDenyEdit();
    customPrompt({
        icon:'✏️', title:'Renommer le chapitre', value:oldName,
        placeholder:'Nom du chapitre', confirmLabel:'Renommer',
        onConfirm:(newName)=>{
            if(!newName || newName.trim()==='' || newName===oldName) return;
            const trimmed = newName.trim();
            if(db[curSubject][trimmed]){ showToast('Ce nom existe déjà !','warn'); return; }
            db[curSubject][trimmed] = db[curSubject][oldName];
            delete db[curSubject][oldName];
            if(curChapter===oldName) curChapter=trimmed;
            save();
            // Si on renomme le chapitre qu'on est en train de consulter/éditer, on y reste
            // (juste avec le nouveau titre) plutôt que d'être renvoyé à la liste des chapitres.
            if(stayFn && curChapter===trimmed) stayFn(); else goSubject(curSubject);
        }
    });
}

function deleteChapter(ch, mode) {
    if (!bmCanEdit()) return bmDenyEdit();
    const n = (db[curSubject][ch].flashcards||[]).length;
    customConfirm({
        icon:'🗑️', title:'Supprimer ce chapitre ?',
        message:`"${escT(ch)}" et ses ${n} ${(['Anglais','Espagnol'].includes(curSubject)?'mot':'carte')}${n>1?'s':''} seront supprimés définitivement. Cette action est irréversible.`,
        confirmLabel:'Supprimer', cancelLabel:'Annuler', danger:true,
        onConfirm:()=>{
            delete db[curSubject][ch]; save();
            // Reste sur la liste de chapitres plutôt que de renvoyer à l'accueil de la matière —
            // sauf s'il n'y a plus aucun chapitre, auquel cas il n'y a rien à lister.
            if(Object.keys(db[curSubject]).length > 0 && mode) goModeChapters(mode);
            else goSubject(curSubject);
        }
    });
}


function fmt(cmd,val=null){ restoreEditorSelection(); document.execCommand(cmd,false,val); }

// ── CONFIRMATION STYLÉE (remplace le confirm() natif moche du navigateur) ──
function customConfirm(opts) {
    const existing = $('cc-overlay'); if(existing) existing.remove();
    const ov = document.createElement('div');
    ov.id = 'cc-overlay';
    ov.className = 'cc-overlay';
    ov.onclick = (e) => { if(e.target === ov) closeCustomConfirm(); };
    ov.innerHTML = `
        <div class="cc-box">
            <div class="cc-icon">${opts.icon || '⚠️'}</div>
            <h3>${opts.title || 'Confirmer'}</h3>
            <p>${opts.message || ''}</p>
            <div class="cc-actions">
                <button class="cc-btn cc-btn-cancel" onclick="closeCustomConfirm()">${opts.cancelLabel || 'Annuler'}</button>
                <button class="cc-btn cc-btn-confirm${opts.danger ? ' cc-btn-danger' : ''}" id="cc-confirm-btn">${opts.confirmLabel || 'Confirmer'}</button>
            </div>
        </div>`;
    document.body.appendChild(ov);
    $('cc-confirm-btn').onclick = () => { closeCustomConfirm(); opts.onConfirm && opts.onConfirm(); };
}
function closeCustomConfirm() { const ov = $('cc-overlay'); if(ov) ov.remove(); }

// ── SAISIE STYLÉE (remplace le prompt() natif moche du navigateur) ──
function customPrompt(opts) {
    const existing = $('cp-overlay'); if(existing) existing.remove();
    const ov = document.createElement('div');
    ov.id = 'cp-overlay';
    ov.className = 'cc-overlay';
    ov.onclick = (e) => { if(e.target === ov) closeCustomPrompt(); };
    ov.innerHTML = `
        <div class="cc-box">
            <div class="cc-icon">${opts.icon || '✏️'}</div>
            <h3>${opts.title || 'Renommer'}</h3>
            <input type="text" id="cp-input" class="field" value="${esc(opts.value || '')}" placeholder="${esc(opts.placeholder || '')}">
            <div class="cc-actions" style="margin-top:16px">
                <button class="cc-btn cc-btn-cancel" onclick="closeCustomPrompt()">Annuler</button>
                <button class="cc-btn cc-btn-confirm" id="cp-confirm-btn">${opts.confirmLabel || 'Valider'}</button>
            </div>
        </div>`;
    document.body.appendChild(ov);
    const inp = $('cp-input');
    setTimeout(()=>{ inp.focus(); inp.select(); }, 50);
    inp.addEventListener('keydown', e => { if(e.key==='Enter'){ e.preventDefault(); $('cp-confirm-btn').click(); } });
    $('cp-confirm-btn').onclick = () => {
        const val = inp.value;
        closeCustomPrompt();
        opts.onConfirm && opts.onConfirm(val);
    };
}
function closeCustomPrompt() { const ov = $('cp-overlay'); if(ov) ov.remove(); }

// ── SUIVI DE LA POSITION DU CURSEUR (fix mobile : le clic sur un bouton
// de la barre d'outils fait perdre la sélection dans le contenteditable,
// ce qui faisait atterrir les insertions à la fin au lieu du curseur) ──
let savedEditorRange = null;
function trackEditorSelection(){
    const ed = $('editor'); if(!ed) return;
    const save = () => {
        const sel = window.getSelection();
        if(sel && sel.rangeCount>0 && ed.contains(sel.anchorNode)){
            savedEditorRange = sel.getRangeAt(0).cloneRange();
        }
    };
    ed.addEventListener('keyup', save);
    ed.addEventListener('mouseup', save);
    ed.addEventListener('touchend', save);
    ed.addEventListener('input', save);
    // sur téléphone, déplacer le curseur ou les poignées de sélection ne déclenche ni mouseup ni touchend :
    // on suit donc directement les changements de sélection (une seule fois pour toute l'appli)
    if (!window.__bmSelTracked) {
        window.__bmSelTracked = true;
        document.addEventListener('selectionchange', () => {
            const e = $('editor'); if (!e) return;
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && e.contains(sel.anchorNode) && e.contains(sel.focusNode)) savedEditorRange = sel.getRangeAt(0).cloneRange();
        });
    }
    save();
}
function restoreEditorSelection(){
    const ed = $('editor'); if(!ed) return;
    ed.focus();
    // une sélection mémorisée dans un ancien contenu (l'éditeur a été rechargé) ne sert plus : on la laisse tomber
    if(savedEditorRange && !(ed.contains(savedEditorRange.startContainer) && ed.contains(savedEditorRange.endContainer))) savedEditorRange = null;
    if(savedEditorRange){
        try{
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(savedEditorRange);
        }catch(e){ /* le contenu a changé entre-temps, on insère à la position par défaut */ }
    }
}

// ── OUTILS MATHS DE L'ÉDITEUR ───────────────────────────────────
function insertSymbol(sym) {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertText', false, sym);
}

function insertPow(n) {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertHTML', false, '<sup>'+n+'</sup>&nbsp;');
}

function insertTenPow() {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertHTML', false, '×10<sup>n</sup>&nbsp;');
}

function insertFraction() {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    document.execCommand('insertHTML', false,
        '<span class="frac"><span class="frac-num">a</span><span class="frac-den">b</span></span>&nbsp;');
}

function applyHeading(tag) {
    if(!tag) return;
    restoreEditorSelection();
    document.execCommand('formatBlock', false, tag);
}

function applyFontSize(px) {
    if(!px) return;
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    const selected = getSelectedHTML();
    if(!selected.trim()){
        showToast('Sélectionne d\'abord le texte à redimensionner', 'warn');
        return;
    }
    document.execCommand('insertHTML', false, `<span style="font-size:${px}px">${selected}</span>`);
}

// ── ENCADRÉS COLORÉS & TERME EXPLIQUÉ (barre "Insérer") ────────
function getSelectedHTML() {
    if(!savedEditorRange) return '';
    const div = document.createElement('div');
    div.appendChild(savedEditorRange.cloneContents());
    return div.innerHTML;
}

function insertColorBox(cls) {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    const sel = window.getSelection(); if(!sel.rangeCount || !ed.contains(sel.anchorNode)) return;
    const BOXES = '.formula-box,.retenir-box,.attention-box';
    const el0 = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode;
    const inBox = el0 && el0.closest ? el0.closest(BOXES) : null;
    if(inBox && ed.contains(inBox)){ inBox.className = cls; ed.dispatchEvent(new Event('input',{bubbles:true})); return; }   // déjà dans un encadré : on change juste sa couleur
    try{
        const r = sel.getRangeAt(0);
        const box = document.createElement('div'); box.className = cls;
        if(!r.collapsed) box.appendChild(r.extractContents());
        if(!box.textContent.trim() && !box.querySelector('img,table,svg')) box.textContent = 'Ton texte ici…';
        let blk = r.startContainer; while(blk && blk.parentNode !== ed) blk = blk.parentNode;
        if(!blk){ ed.appendChild(box); }
        else {
            if(blk.nodeType === 1 && blk.lastChild){            // on coupe le paragraphe en deux : texte avant | encadré | texte après
                const tail = document.createRange(); tail.setStart(r.endContainer, r.endOffset); tail.setEndAfter(blk.lastChild);
                const frag = tail.extractContents();
                if(frag.textContent.trim() || frag.querySelector('img,table,svg')){ const after = blk.cloneNode(false); after.appendChild(frag); blk.after(after); }
            }
            blk.after(box);
            if(blk.nodeType === 1 && !blk.textContent.trim() && !blk.querySelector('img,table,svg')) blk.remove();
        }
        if(!box.nextSibling){ const p = document.createElement('p'); p.innerHTML = '<br>'; box.after(p); }
        const nr = document.createRange(); nr.selectNodeContents(box); sel.removeAllRanges(); sel.addRange(nr);
        ed.dispatchEvent(new Event('input',{bubbles:true}));
    }catch(err){
        const selected = getSelectedHTML();
        document.execCommand('insertHTML', false, `<div class="${cls}">${selected.trim() ? selected : 'Ton texte ici…'}</div><p><br></p>`);
    }
}

function insertTermTooltip() {
    const ed = $('editor'); if(!ed) return;
    restoreEditorSelection();
    const selected = getSelectedHTML();
    if(!selected.trim()){
        showToast('Sélectionne d\'abord le mot ou groupe de mots à expliquer', 'warn');
        return;
    }
    customPrompt({
        icon:'💬', title:'Explication au clic',
        placeholder:'Ex : figure de style qui répète un mot en début de phrase pour insister',
        confirmLabel:'Ajouter',
        onConfirm:(txt)=>{
            if(!txt) return;
            restoreEditorSelection();
            document.execCommand('insertHTML', false,
                `<span class="fig fig-note" title="${esc(txt)}">${selected}</span>`);
        }
    });
}


// ── BARRE LATÉRALE DE DÉFILEMENT (façon Google Docs) ──────────
// Une piste verticale avec un curseur qui reflète la position de lecture,
// cliquable/glissable pour sauter directement à un endroit du cours.
let scrollSidebarBound = false;
let esnDragging = false;

function docScrollableHeight() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}





// ── TRACEUR DE GRAPHIQUES ───────────────────────────────────────
function openGraphTool() {
    const overlay = document.createElement('div');
    overlay.id = 'graph-modal-ov';
    overlay.className = 'gm-overlay';
    overlay.onclick = (e) => { if(e.target === overlay) closeGraphTool(); };
    overlay.innerHTML = `
        <div class="gm-box">
            <button class="gm-close" onclick="closeGraphTool()">✕</button>
            <h3>📈 Tracer un graphique</h3>
            <label class="gm-label">f(x) =</label>
            <input type="text" id="gm-fx" class="field" placeholder="ex : x^2 - 3*x + 2" value="x^2">
            <div style="display:flex;gap:8px;">
                <input type="number" id="gm-xmin" class="field" placeholder="x min" value="-10">
                <input type="number" id="gm-xmax" class="field" placeholder="x max" value="10">
            </div>
            <p class="gm-hint">Symboles utilisables : + − * / ^ (puissance), sqrt(), sin(), cos(), tan(), abs(), ln(), exp(), pi</p>
            <canvas id="gm-canvas" width="480" height="300" class="gm-canvas"></canvas>
            <div id="gm-err" class="gm-err"></div>
            <div style="display:flex;gap:8px;margin-top:8px;">
                <button class="btn-save" style="background:var(--accent)" onclick="drawGraphPreview()">🔄 Aperçu</button>
                <button class="btn-save" onclick="insertGraph()">➕ Insérer dans le cours</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    ['gm-fx','gm-xmin','gm-xmax'].forEach(id=>{
        $(id).addEventListener('keydown', e=>{ if(e.key==='Enter') drawGraphPreview(); });
    });
    drawGraphPreview();
}

function closeGraphTool() {
    const ov = $('graph-modal-ov');
    if(ov) ov.remove();
}

function safeMathEval(expr, x) {
    const clean = expr.trim();
    if(!/^[0-9x\.\+\-\*\/\^\(\)\s a-zA-Z,]*$/.test(clean)) throw new Error('invalid characters');
    let js = clean
        .replace(/\bsqrt\(/g,'Math.sqrt(')
        .replace(/\bsin\(/g,'Math.sin(')
        .replace(/\bcos\(/g,'Math.cos(')
        .replace(/\btan\(/g,'Math.tan(')
        .replace(/\babs\(/g,'Math.abs(')
        .replace(/\bln\(/g,'Math.log(')
        .replace(/\bexp\(/g,'Math.exp(')
        .replace(/\bpi\b/g,'Math.PI')
        .replace(/\^/g,'**');
    const fn = new Function('x', 'return (' + js + ');');
    const y = fn(x);
    return typeof y === 'number' ? y : NaN;
}

function niceGridStep(range) {
    const raw = range/8;
    const mag = Math.pow(10, Math.floor(Math.log10(raw||1)));
    const norm = raw/mag;
    let step = norm<1.5 ? 1 : norm<3 ? 2 : norm<7 ? 5 : 10;
    return step*mag;
}

function drawGraphPreview() {
    const errEl = $('gm-err'); if(errEl) errEl.textContent='';
    const canvas = $('gm-canvas'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);

    const expr = ($('gm-fx').value || 'x').trim();
    let xmin = parseFloat($('gm-xmin').value); if(isNaN(xmin)) xmin=-10;
    let xmax = parseFloat($('gm-xmax').value); if(isNaN(xmax)) xmax=10;
    if(xmax <= xmin) { errEl.textContent = 'x max doit être supérieur à x min'; return; }

    const N = 400, pts = [];
    let ymin=Infinity, ymax=-Infinity;
    for(let i=0;i<=N;i++){
        const x = xmin + (xmax-xmin)*i/N;
        let y;
        try { y = safeMathEval(expr, x); } catch(e) { errEl.textContent='Expression invalide'; return; }
        if(!isFinite(y)) y = null;
        pts.push({x,y});
        if(y!==null){ if(y<ymin) ymin=y; if(y>ymax) ymax=y; }
    }
    if(!isFinite(ymin) || !isFinite(ymax)) { errEl.textContent='Impossible de tracer cette fonction sur cet intervalle'; return; }
    if(ymin===ymax){ ymin-=1; ymax+=1; }
    const pad = (ymax-ymin)*0.12; ymin-=pad; ymax+=pad;

    const mLeft=40, mRight=12, mTop=12, mBottom=26;
    const plotW=w-mLeft-mRight, plotH=h-mTop-mBottom;
    const toPx=(x,y)=>[mLeft+(x-xmin)/(xmax-xmin)*plotW, mTop+(1-(y-ymin)/(ymax-ymin))*plotH];

    ctx.strokeStyle='#e4e8f0'; ctx.lineWidth=1;
    ctx.font='10px DM Sans, sans-serif'; ctx.fillStyle='#64748b';
    const xStep=niceGridStep(xmax-xmin), yStep=niceGridStep(ymax-ymin);
    for(let gx=Math.ceil(xmin/xStep)*xStep; gx<=xmax; gx+=xStep){
        const [px]=toPx(gx,0);
        ctx.beginPath(); ctx.moveTo(px,mTop); ctx.lineTo(px,h-mBottom); ctx.stroke();
        ctx.fillText(Number(gx.toFixed(2)), px-8, h-mBottom+14);
    }
    for(let gy=Math.ceil(ymin/yStep)*yStep; gy<=ymax; gy+=yStep){
        const [,py]=toPx(0,gy);
        ctx.beginPath(); ctx.moveTo(mLeft,py); ctx.lineTo(w-mRight,py); ctx.stroke();
        ctx.fillText(Number(gy.toFixed(2)), 4, py+3);
    }

    ctx.strokeStyle='#0e1525'; ctx.lineWidth=1.5;
    if(0>=xmin && 0<=xmax){ const [px]=toPx(0,0); ctx.beginPath(); ctx.moveTo(px,mTop); ctx.lineTo(px,h-mBottom); ctx.stroke(); }
    if(0>=ymin && 0<=ymax){ const [,py]=toPx(0,0); ctx.beginPath(); ctx.moveTo(mLeft,py); ctx.lineTo(w-mRight,py); ctx.stroke(); }

    ctx.strokeStyle='#4f46e5'; ctx.lineWidth=2.5; ctx.beginPath();
    let started=false;
    pts.forEach(p=>{
        if(p.y===null){ started=false; return; }
        const [px,py]=toPx(p.x,p.y);
        if(py < mTop-40 || py > h-mBottom+40){ started=false; return; }
        if(!started){ ctx.moveTo(px,py); started=true; } else ctx.lineTo(px,py);
    });
    ctx.stroke();
}

function insertGraph() {
    const canvas = $('gm-canvas'); if(!canvas) return;
    if($('gm-err').textContent) { showToast('Corrige l\'erreur avant d\'insérer', 'warn'); return; }
    const dataUrl = canvas.toDataURL('image/png');
    const fx = ($('gm-fx').value || '').trim();
    const html = `<div class="user-graph"><img src="${dataUrl}" alt="graphique"><p class="user-graph-caption">f(x) = ${esc(fx)}</p></div><p><br></p>`;
    closeGraphTool();
    restoreEditorSelection();
    document.execCommand('insertHTML', false, html);
    showToast('Graphique inséré ✅');
}

// Recharge l'éditeur avec le contenu fusionné (modif d'un autre éditeur), en gardant la position du curseur.
let bmComposing = false, bmReloadPending = false;
document.addEventListener('compositionstart', e => { if (e.target && e.target.id === 'editor') bmComposing = true; }, true);
document.addEventListener('compositionend', e => { if (e.target && e.target.id === 'editor') { bmComposing = false; bmReloadPending = false; if (window.BacMasterFlushDeferred) window.BacMasterFlushDeferred(); } }, true);
window.bmIsComposing = () => bmComposing;
function reloadEditorFromDb(){
    const ed=$('editor'); if(!ed||!curSubject||!curChapter||!db[curSubject]||!db[curSubject][curChapter]) return;
    if (bmComposing) return;   // le clavier est en train de composer un mot : les changements des autres attendent (voir supabase-app.js) la fin
    const next=db[curSubject][curChapter].cours||'';
    const tpl=document.createElement('div'); tpl.innerHTML=next;
    const A=[...ed.childNodes], B=[...tpl.childNodes];
    const key=n=>n.nodeType===1?n.outerHTML:'#'+n.textContent;
    let i=0; while(i<A.length&&i<B.length&&key(A[i])===key(B[i])) i++;
    let ja=A.length, jb=B.length; while(ja>i&&jb>i&&key(A[ja-1])===key(B[jb-1])){ ja--; jb--; }
    if(i===ja && i===jb){ hasUnsavedEdits=false; return; }          // rien n'a changé
    // position du curseur / de la sélection (en caractères) avant la mise à jour
    const sel=window.getSelection(); let anchor=-1, focus=-1;
    const offOf=(node,o)=>{ const r=document.createRange(); r.selectNodeContents(ed); r.setEnd(node,o); return r.toString().length; };
    if(sel&&sel.rangeCount&&ed.contains(sel.anchorNode)&&ed.contains(sel.focusNode)){ anchor=offOf(sel.anchorNode,sel.anchorOffset); focus=offOf(sel.focusNode,sel.focusOffset); }
    const oldText=ed.textContent;
    // on ne remplace que les blocs qui ont changé : le reste du cours (et le défilement) ne bouge pas
    const ref=A[ja]||null;
    const caretHit=anchor>=0 && A.slice(i,ja).some(n=>n.contains(sel.anchorNode)||n.contains(sel.focusNode));   // le curseur était dans un bloc remplacé
    for(let k=i;k<ja;k++) A[k].remove();
    for(let k=i;k<jb;k++) ed.insertBefore(B[k],ref);
    if(caretHit){
        const map=o=>(window.BacMasterMerge&&BacMasterMerge.mapOffset)?BacMasterMerge.mapOffset(oldText,ed.textContent,o):o;
        const place=o=>{ const w=document.createTreeWalker(ed,NodeFilter.SHOW_TEXT); let n,left=o,last=null; while((n=w.nextNode())){ last=n; if(left<=n.length) return [n,left]; left-=n.length; } return last?[last,last.length]:[ed,0]; };
        const pa=place(map(anchor)), pf=place(map(focus));
        try{ sel.setBaseAndExtent(pa[0],pa[1],pf[0],pf[1]); }catch(e){}
    }
    // la sélection mémorisée pour la barre d'outils doit suivre le nouveau contenu
    savedEditorRange=(sel&&sel.rangeCount&&ed.contains(sel.anchorNode))?sel.getRangeAt(0).cloneRange():null;
    hasUnsavedEdits=false;
    window.dispatchEvent(new Event('bm-editor-reloaded'));
}
window.BacMasterReloadEditor=reloadEditorFromDb;


// ── AUTOSAVE de l'éditeur de cours ────────────────────────────
// Se déclenche 1,5s après la dernière frappe (débounce), pour ne jamais perdre
// une modification si l'élève quitte la page.
let autosaveTimer = null;
let hasUnsavedEdits = false;

function scheduleAutosaveCours(){
    hasUnsavedEdits = true;
    const b=$('sbtn'); if(b){ b.textContent='✏️ Modification en cours…'; b.classList.remove('saved'); }
    // pendant la frappe on enregistre toutes les 0,7 s (et non après 1,5 s de silence) : les autres voient le texte au fil de l'eau
    if (!autosaveTimer) autosaveTimer = setTimeout(autosaveCoursNow, 700);
}

function autosaveCoursNow(){
    clearTimeout(autosaveTimer); autosaveTimer = null;
    bmStampEditor();
    const ed=$('editor'); if(!ed || !curSubject || !curChapter) return;
    db[curSubject][curChapter].cours = ed.innerHTML;
    db[curSubject][curChapter].userEdited = true;
    save();
    hasUnsavedEdits = false;
    const b=$('sbtn');
    if(b){
        b.textContent='✅ Enregistré automatiquement';
        b.classList.add('saved');
    }
}

// Filet de sécurité supplémentaire : avertit le navigateur si jamais l'élève
// ferme l'onglet/l'app dans la toute petite fenêtre avant que l'autosave se déclenche.
window.addEventListener('beforeunload', (e) => {
    if(hasUnsavedEdits){
        e.preventDefault();
        e.returnValue = '';
    }
});

function delVoc(i){
    if (!bmCanEdit()) return bmDenyEdit();
    customConfirm({
        icon:'🗑️', title:'Supprimer ce mot ?', message:'Cette action est irréversible.',
        confirmLabel:'Supprimer', cancelLabel:'Annuler', danger:true,
        onConfirm:()=>{ db[curSubject][curChapter].flashcards.splice(i,1); save(); renderTabContent(); }
    });
}

let vocEditingIndex = null;

function saveVocEdit(i){
    if (!bmCanEdit()) return bmDenyEdit();
    const q = ($('voc-edit-q')||{value:''}).value.trim();
    const a = ($('voc-edit-a')||{value:''}).value.trim();
    if(!q || !a){ showToast('Le mot et la définition ne peuvent pas être vides', 'warn'); return; }
    const card = db[curSubject][curChapter].flashcards[i];
    card.q = q; card.a = a;
    vocEditingIndex = null;
    save();
    renderTabContent();
}

function addVoc(){
    if (!bmCanEdit()) return bmDenyEdit();
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
