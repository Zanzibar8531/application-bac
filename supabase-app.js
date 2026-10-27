/* Bac Master — cours partagés et progression personnelle synchronisés via Supabase. */
(() => {
  const cfg = window.BACMASTER_SUPABASE_CONFIG || {};
  const state = { client: null, user: null, role: 'reader', channel: null, profileChannel: null, progressChannel: null, pollTimer: null, lastProgressSeen: null, sharedInitialized: false, timer: null, privateTimer: null, progressTimer: null, applyingRemote: false, applyingProgress: false, adminPanel: false, profileLabels: {}, deviceId: (window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now())+'-'+Math.random()), courseRevision: 0, courseDirty: false, progressRevision: 0, progressDirty: false, publishPromise: null, progressPublishPromise: null, refreshPromise: null, progressRefreshPromise: null, lastPublishedCourses: '', lastPublishedProgress: '', tableMode: false, published: new Map(), chapPublishPromise: null, chapRepublish: false, lastChapSeen: 0, chapPollBusy: false, refreshViewTimer: null };
  const $ = (id) => document.getElementById(id);
  // Canonical comparison: JSONB can return object keys in a different order.
  // Without this, each background poll can trigger an unnecessary merge/save.
  function stableStringify(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
  }
  function status(msg, bad=false) {
    const el=$('bm-supabase-status'); if(el){el.textContent=msg;el.style.color=bad?'#b42318':'';}
    const toast=$('bm-sync-toast');
    if(toast && state.user && msg && !$('bm-supabase-panel')?.hidden){ /* account panel already shows status */ }
    else if(toast && state.user && msg){
      // Background polling should not flood the screen with routine success messages.
      const routineSuccess=/^(Cours partagés chargés\.|Cours actualisés en temps réel\.|Cours partagés actualisés\.|Progression personnelle synchronisée\.|Progression personnelle actualisée\.|Cours partagés synchronisés\.)$/.test(msg);
      if(bad || !routineSuccess){toast.textContent=msg;toast.dataset.kind=bad?'error':(/synchronis|chargés|actualisés/i.test(msg)?'success':'');toast.style.display='block';clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>{toast.style.display='none';},bad?9000:3500);}
    }
    if(bad) console.error('[BacMaster Supabase]',msg);
  }
  function addPanel() {
    if ($('bm-supabase-panel')) return;
    const style=document.createElement('style');
    style.textContent=`
      #bm-supabase-panel{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:22px;box-sizing:border-box;background:rgba(5,10,30,.24);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);font:15px system-ui,sans-serif;color:#18233d}
      #bm-supabase-panel[hidden]{display:none!important}
      #bm-supabase-card{width:min(430px,100%);box-sizing:border-box;padding:30px;border-radius:22px;background:rgba(250,252,255,.96);border:1px solid rgba(255,255,255,.8);box-shadow:0 22px 70px rgba(0,0,0,.36);text-align:center}
      #bm-supabase-card .bm-logo{font-size:42px;margin-bottom:4px}
      #bm-supabase-card h1{font-size:30px;letter-spacing:-.7px;margin:0 0 8px;color:#18233d}
      #bm-supabase-card .bm-subtitle{margin:0 auto 22px;line-height:1.5;color:#596783;max-width:330px}
      #bm-supabase-card input{display:block;box-sizing:border-box;width:100%;padding:12px 13px;margin:9px 0;border:1px solid #c8d1e1;border-radius:9px;background:#fff;color:#18233d;font:inherit}
      #bm-supabase-card button{font:600 14px system-ui,sans-serif;padding:12px 14px;border-radius:10px;border:1px solid #c8d1e1;cursor:pointer;transition:transform .12s,filter .12s}
      #bm-supabase-card button:hover{filter:brightness(1.04);transform:translateY(-1px)}
      #bm-supabase-card .bm-primary{width:100%;background:#394fba;color:#fff;border-color:#394fba;margin:4px 0}
      #bm-supabase-card .bm-secondary{width:100%;background:#fff;color:#293a67;margin:4px 0}
      #bm-supabase-card .bm-back{background:transparent;border:0;color:#45578d;padding:8px;margin-top:4px}
      #bm-supabase-card .bm-form{margin-top:10px;text-align:left}
      #bm-supabase-card .bm-form[hidden],#bm-supabase-landing[hidden]{display:none!important}
      #bm-supabase-status{font-size:12px;line-height:1.45;margin-top:12px;overflow-wrap:anywhere;color:#56647d;min-height:16px}
      #bm-sync-toast{position:fixed;z-index:999996;right:16px;top:16px;max-width:min(420px,calc(100vw - 32px));padding:11px 14px;border-radius:12px;background:#14213d;color:#fff;box-shadow:0 8px 28px #0003;font:13px/1.45 system-ui,sans-serif;display:none}
      #bm-sync-toast[data-kind=error]{background:#8f2020}
      #bm-sync-toast[data-kind=success]{background:#17633c}
      .bm-sidebar-account-wrap{padding:8px 12px 12px}
      #bm-supabase-account-chip.bm-sidebar-account{display:block;width:100%;text-align:left;border:1px solid #ffffff30;border-radius:12px;padding:11px 12px;background:rgba(19,31,57,.92);color:#fff;box-shadow:0 4px 18px #0002;font:600 13px system-ui,sans-serif;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      #bm-supabase-account-chip[hidden]{display:none!important}
      #bm-supabase-admin{position:fixed;inset:0;z-index:999997;display:flex;align-items:center;justify-content:center;padding:16px;background:#061027aa;backdrop-filter:blur(5px);font:14px system-ui,sans-serif;color:#17233d}
      #bm-supabase-admin[hidden]{display:none!important}
      #bm-supabase-admin-card{width:min(900px,100%);max-height:90vh;overflow:auto;background:#f8faff;border-radius:18px;padding:22px;box-sizing:border-box;box-shadow:0 22px 70px #0006}
      #bm-supabase-admin h2{margin:0 0 6px}#bm-supabase-admin .bm-admin-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid #dbe2ef}
      #bm-supabase-admin .bm-admin-row input,#bm-supabase-admin .bm-admin-row select{padding:8px;border:1px solid #cbd4e4;border-radius:8px;max-width:100%}
      #bm-supabase-admin button{cursor:pointer;border:1px solid #cbd4e4;border-radius:8px;padding:8px 10px;background:white;color:#17233d}
      #bm-supabase-admin .bm-admin-actions{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}
      #bm-supabase-admin .bm-audit-entry{font-size:12px;line-height:1.5;padding:9px 0;border-bottom:1px solid #dbe2ef;overflow-wrap:anywhere}
      .bm-admin-note{font-size:12px;color:#5b6881;line-height:1.5}
      @media(max-width:480px){#bm-supabase-card{padding:23px 19px}#bm-supabase-card h1{font-size:27px}}
    `;
    document.head.appendChild(style);
    if(!$('bm-sync-toast')){const toast=document.createElement('div');toast.id='bm-sync-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast);}
    const p=document.createElement('section'); p.id='bm-supabase-panel'; p.setAttribute('aria-modal','true'); p.setAttribute('role','dialog');
    p.innerHTML=`<div id="bm-supabase-card">
      <div class="bm-logo" aria-hidden="true">🌌</div><h1>BacMaster</h1>
      <div id="bm-supabase-landing"><p class="bm-subtitle">Révise, progresse et retrouve les cours partagés avec ton compte, sur tes appareils.</p><button class="bm-primary" id="bm-supabase-open-signin">Se connecter</button><button class="bm-secondary" id="bm-supabase-open-signup">Créer un compte</button></div>
      <div id="bm-supabase-form" class="bm-form" hidden><p class="bm-subtitle" id="bm-supabase-form-title">Connecte-toi pour continuer.</p><input id="bm-supabase-email" type="email" autocomplete="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail"><input id="bm-supabase-password" type="password" autocomplete="current-password" placeholder="Mot de passe" aria-label="Mot de passe"><input id="bm-supabase-name" autocomplete="name" placeholder="Nom affiché (inscription)" aria-label="Nom affiché" hidden><button class="bm-primary" id="bm-supabase-submit">Se connecter</button><button class="bm-back" id="bm-supabase-back">← Retour</button></div>
      <div id="bm-supabase-status" role="status" aria-live="polite">Connexion sécurisée en préparation…</div>
      <p style="font-size:11px;line-height:1.5;color:#73809a;margin:14px 0 0">Ta session reste enregistrée sur cet appareil jusqu’à ta déconnexion. Ta progression personnelle est liée à ton compte et se synchronise entre tes appareils.</p>
    </div>`;
    document.body.appendChild(p);
    let chip=$('bm-supabase-account-chip'); if(!chip){chip=document.createElement('button');chip.id='bm-supabase-account-chip';chip.type='button';chip.textContent='☁️ Mon compte';const wrap=document.querySelector('.bm-sidebar-account-wrap');(wrap||document.getElementById('sidebar')||document.body).appendChild(chip);} chip.hidden=true;
    function showForm(mode){$('bm-supabase-landing').hidden=true;$('bm-supabase-form').hidden=false;$('bm-supabase-name').hidden=mode!=='signup';$('bm-supabase-form-title').textContent=mode==='signup'?'Crée ton compte BacMaster.':'Connecte-toi pour continuer.';$('bm-supabase-submit').textContent=mode==='signup'?'Créer mon compte':'Se connecter';$('bm-supabase-password').autocomplete=mode==='signup'?'new-password':'current-password';p.dataset.mode=mode;status('');}
    $('bm-supabase-open-signin').onclick=()=>showForm('signin');$('bm-supabase-open-signup').onclick=()=>showForm('signup');$('bm-supabase-back').onclick=()=>{$('bm-supabase-form').hidden=true;$('bm-supabase-landing').hidden=false;status('');};$('bm-supabase-submit').onclick=()=>p.dataset.mode==='signup'?signUp():signIn();
    chip.onclick=()=>{p.hidden=false;$('bm-supabase-landing').hidden=true;$('bm-supabase-form').hidden=true;const account=$('bm-supabase-account-info');if(account)account.remove();const info=document.createElement('div');info.id='bm-supabase-account-info';info.style='margin:10px 0;color:#52617d';info.textContent=$('bm-supabase-account-chip').dataset.account||'Connecté';$('bm-supabase-card').insertBefore(info,$('bm-supabase-status'));const admin=document.createElement('button');admin.id='bm-supabase-admin-open';admin.className='bm-secondary';admin.style.width='100%';admin.textContent='⚙️ Administration';admin.hidden=state.role!=='admin';admin.onclick=()=>{p.hidden=true;openAdminPanel();};$('bm-supabase-card').insertBefore(admin,$('bm-supabase-status'));const out=document.createElement('button');out.id='bm-supabase-signout';out.className='bm-secondary';out.style.width='100%';out.textContent='Se déconnecter';out.onclick=signOut;$('bm-supabase-card').insertBefore(out,$('bm-supabase-status'));const close=document.createElement('button');close.id='bm-supabase-close-account';close.className='bm-back';close.textContent='Retour aux cours';close.onclick=()=>{p.hidden=true;info.remove();out.remove();admin.remove();close.remove();};$('bm-supabase-card').insertBefore(close,$('bm-supabase-status'));};
  }
  function addAdminPanel(){}
  function openAdminPanel(){if(window.BacMasterUI)window.BacMasterUI.openAdmin();}
  function isPrivateChapter(chapter,data){return String(chapter||'').trim().toLocaleLowerCase('fr-FR')==='la personne'||String(data?.titre||data?.title||'').trim().toLocaleLowerCase('fr-FR')==='la personne';}
  function findPrivateChapter(){if(typeof db==='undefined'||!db)return null;for(const [subject,chapters] of Object.entries(db)){if(!chapters||typeof chapters!=='object')continue;for(const [chapter,data] of Object.entries(chapters)){if(data&&typeof data==='object'&&isPrivateChapter(chapter,data))return {subject,chapter,data};}}return null;}
  function removePrivateChapterFromDb(){if(typeof db==='undefined'||!db)return;for(const [subject,chapters] of Object.entries(db)){if(!chapters||typeof chapters!=='object')continue;for(const [chapter,data] of Object.entries(chapters)){if(isPrivateChapter(chapter,data))delete chapters[chapter];}}}
  async function syncPrivateChapter(){
    if(!state.client||!state.user)return;
    if(state.role!=='admin'){removePrivateChapterFromDb();if(typeof window.save==='function')window.save();return;}
    const {data,error}=await state.client.from('bacmaster_private_content').select('content').eq('user_id',state.user.id).maybeSingle();
    if(error){status('Chapitre privé indisponible : '+error.message+'. Exécute la migration admin.',true);return;}
    const local=findPrivateChapter();
    if(data?.content?.subject&&data?.content?.chapter&&data?.content?.data){
      if(typeof db[data.content.subject]!=='object')db[data.content.subject]={};db[data.content.subject][data.content.chapter]=data.content.data;
    } else if(local){
      const {error:saveError}=await state.client.from('bacmaster_private_content').upsert({user_id:state.user.id,content:{subject:local.subject,chapter:local.chapter,data:local.data},updated_at:new Date().toISOString()});
      if(saveError)status('Impossible de sauvegarder le chapitre privé : '+saveError.message,true);
    }
  }
  async function publishPrivateChapter(){if(!state.client||!state.user||state.role!=='admin'||state.applyingRemote)return;const found=findPrivateChapter();if(!found)return;const {error}=await state.client.from('bacmaster_private_content').upsert({user_id:state.user.id,content:{subject:found.subject,chapter:found.chapter,data:found.data},updated_at:new Date().toISOString()});if(error)status('Erreur de synchronisation du chapitre privé : '+error.message,true);}
  function schedulePrivatePublish(){if(state.role!=='admin'||state.applyingRemote)return;clearTimeout(state.privateTimer);state.privateTimer=setTimeout(publishPrivateChapter,1000);}
  function serialiseChapter(data){
    return {cours:typeof data.cours==='string'?data.cours:'', userEdited:!!data.userEdited,
      flashcards:(data.flashcards||[]).map(c=>({q:String(c.q??''),a:String(c.a??'')})),
      exercices:(data.exercices||[]).map(e=>{const x={...e}; delete x.status; delete x.lastAttempt; return x;})};
  }
  function serialiseCourses() {
    const out={}; if(typeof db==='undefined' || !db || typeof db!=='object') return out;
    for(const [subject, chapters] of Object.entries(db)) { if(!chapters || typeof chapters!=='object') continue; out[subject]={};
      for(const [chapter, data] of Object.entries(chapters)) { if(!data || typeof data!=='object') continue; if(isPrivateChapter(chapter,data)) continue;
        out[subject][chapter]=serialiseChapter(data);
      }
    } return out;
  }
  function mergeCourses(remote, reconcileDeletes=true) {
    if(!remote || typeof remote!=='object' || typeof db==='undefined' || !db) return;
    state.applyingRemote=true;
    try {
      for(const [subject, chapters] of Object.entries(remote)) { if(!db[subject]) db[subject]={};
        for(const [chapter, incoming] of Object.entries(chapters||{})) { if(isPrivateChapter(chapter,incoming)) continue; if(!db[subject][chapter]) db[subject][chapter]={cours:'',flashcards:[],exercices:[]};
          const local=db[subject][chapter]; local.cours=String(incoming.cours??local.cours??''); local.userEdited=!!incoming.userEdited;
          const cards=local.flashcards||[]; const byQ=new Map(cards.map(c=>[String(c.q),c]));
          for(const c of incoming.flashcards||[]) { const old=byQ.get(String(c.q)); if(old) old.a=String(c.a??old.a); else cards.push({q:String(c.q??''),a:String(c.a??''),score:0,interval:0,ease:2.5,due:null}); }
          local.flashcards=cards;
          const oldEx=local.exercices||[]; const key=e=>String(e.enonce||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(); const oldMap=new Map(oldEx.map(e=>[key(e),e]));
          local.exercices=(incoming.exercices||[]).map(e=>{const x={...e}; const prev=oldMap.get(key(e)); if(prev?.status) x.status=prev.status; if(prev?.lastAttempt) x.lastAttempt=prev.lastAttempt; return x;});
        }
      }
      // The shared document is authoritative for user-created chapters. Remove local
      // custom chapters deleted on another device, but retain built-in PREBUILT chapters.
      if(reconcileDeletes) for(const [subject, chapters] of Object.entries(db)) {
        const remoteSubject=remote[subject]||{}; const builtIn=(typeof PREBUILT!=='undefined'&&PREBUILT[subject])?PREBUILT[subject]:{};
        for(const chapter of Object.keys(chapters||{})) {
          if(isPrivateChapter(chapter,chapters[chapter])) continue;
          if(Object.prototype.hasOwnProperty.call(remoteSubject,chapter)) continue;
          if(Object.prototype.hasOwnProperty.call(builtIn,chapter)) continue;
          delete chapters[chapter];
        }
      }
      if(typeof window.save==='function') window.save(); else localStorage.setItem('bacmaster_db',JSON.stringify(db));
      // Keep the current view open; the refreshed data is used on the next render.
    } finally { state.applyingRemote=false; }
  }
  // La progression est stockée séparément des cours, dans une ligne user_data par compte.
  // On ne transfère que les résultats personnels, jamais le contenu des cours.
  function serialiseProgress(){
    const chapters={};
    for(const [subject, subjectData] of Object.entries(db||{})){
      if(!subjectData || typeof subjectData!=='object') continue;
      for(const [chapter, data] of Object.entries(subjectData)){
        if(!data || typeof data!=='object') continue;
        const cards={};
        for(const card of (data.flashcards||[])){
          if(!card || !card.q) continue;
          if(Number(card.score||0)!==0 || Number(card.interval||0)!==0 || Number(card.ease||2.5)!==2.5 || card.due) cards['q:'+String(card.q)]={score:card.score||0,interval:card.interval||0,ease:card.ease||2.5,due:card.due||null};
        }
        const exercises={};
        for(const ex of (data.exercices||[])){
          const key=String(ex.enonce||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
          if(key && (ex.status || ex.lastAttempt)) exercises[key]={status:ex.status||null,lastAttempt:ex.lastAttempt||null};
        }
        if(Object.keys(cards).length || Object.keys(exercises).length) chapters[subject+'\u0000'+chapter]={subject,chapter,cards,exercises};
      }
    }
    const local={};
    for(const key of ['bacmaster_evals','bacmaster_activity','bacmaster_timelog']){
      const value=localStorage.getItem(key); if(value!==null){try{local[key]=JSON.parse(value)}catch{}}
    }
    return {bacmasterProgressVersion:1,origin:state.deviceId,updatedAt:new Date().toISOString(),chapters,local};
  }
  function mergeProgress(remote){
    if(!remote || remote.bacmasterProgressVersion!==1 || !remote.chapters || state.applyingProgress) return;
    state.applyingProgress=true;
    try{
      for(const entry of Object.values(remote.chapters)){
        if(!entry || !entry.subject || !entry.chapter) continue;
        const data=db?.[entry.subject]?.[entry.chapter]; if(!data) continue;
        const cards=data.flashcards||[];
        for(const card of cards){const saved=entry.cards?.['q:'+String(card.q)];if(saved){card.score=saved.score??card.score??0;card.interval=saved.interval??card.interval??0;card.ease=saved.ease??card.ease??2.5;card.due=saved.due??card.due??null;}}
        const key=e=>String(e.enonce||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
        const savedExercises=entry.exercises||{};
        for(const ex of (data.exercices||[])){const saved=savedExercises[key(ex)];if(saved){if(saved.status)ex.status=saved.status;if(saved.lastAttempt)ex.lastAttempt=saved.lastAttempt;}}
      }
      for(const [key,value] of Object.entries(remote.local||{})) if(['bacmaster_evals','bacmaster_activity','bacmaster_timelog'].includes(key)) localStorage.setItem(key,JSON.stringify(value));
      if(typeof window.save==='function') window.save(); else localStorage.setItem('bacmaster_db',JSON.stringify(db));
      scheduleRefreshView();
    } finally {state.applyingProgress=false;}
  }
  async function refreshProgress(){
    if(!state.client||!state.user)return;
    if(state.progressDirty || state.progressPublishPromise) return;
    if(state.progressRefreshPromise) return state.progressRefreshPromise;
    state.progressRefreshPromise=(async()=>{
      const {data,error}=await state.client.from('user_data').select('data').eq('user_id',state.user.id).maybeSingle();
      if(error){status('Cours connectés, mais progression indisponible : '+error.message+'. Vérifie les droits de la table user_data.',true);return;}
      const remote=data?.data;
      if(remote?.bacmasterProgressVersion===1){
        const versionKey=String(remote.updatedAt||'')+'|'+String(remote.origin||'');
        if(remote.origin!==state.deviceId && versionKey!==state.lastProgressSeen){mergeProgress(remote);status('Progression personnelle actualisée.');}
        state.lastProgressSeen=versionKey;
        state.lastPublishedProgress=stableStringify(remote);
      } else if(!state.progressDirty) await publishProgress();
    })().finally(()=>{state.progressRefreshPromise=null;});
    return state.progressRefreshPromise;
  }
  async function publishProgress(){
    if(!state.client||!state.user||state.applyingProgress)return;
    if(state.progressPublishPromise) return state.progressPublishPromise;
    const revision=state.progressRevision;
    const local=serialiseProgress();
    const localString=stableStringify(local);
    if(!state.progressDirty && localString===state.lastPublishedProgress) return;
    state.progressPublishPromise=(async()=>{
      const {data:current,error:readError}=await state.client.from('user_data').select('data').eq('user_id',state.user.id).maybeSingle();
      if(readError){status('Erreur de lecture de la progression : '+readError.message,true);return;}
      const merged=current?.data?.bacmasterProgressVersion===1?mergeProgressObjects(current.data,local):local;
      merged.origin=state.deviceId; merged.updatedAt=new Date().toISOString();
      const {error}=await state.client.from('user_data').upsert({user_id:state.user.id,data:merged,updated_at:new Date().toISOString()},{onConflict:'user_id'});
      if(error){status('Erreur de synchronisation de la progression : '+error.message,true);return;}
      state.lastPublishedProgress=stableStringify(merged);
      state.lastProgressSeen=String(merged.updatedAt)+'|'+String(merged.origin);
      if(state.progressRevision===revision) state.progressDirty=false;
      status('Progression personnelle synchronisée.');
      if(state.progressRevision!==revision) scheduleProgressPublish();
    })().catch(e=>status('Erreur de synchronisation de la progression : '+(e?.message||e),true)).finally(()=>{state.progressPublishPromise=null;});
    return state.progressPublishPromise;
  }
  function mergeProgressObjects(a,b){
    const out={...a,...b,chapters:{...(a.chapters||{})},local:{...(a.local||{})}};
    for(const [k,v] of Object.entries(b.chapters||{})){
      const old=out.chapters[k];
      if(!old){out.chapters[k]=v;continue;}
      out.chapters[k]={...old,...v,cards:{...(old.cards||{}),...(v.cards||{})},exercises:{...(old.exercises||{}),...(v.exercises||{})}};
    }
    out.local={...(a.local||{}),...(b.local||{})};
    return out;
  }
  function scheduleProgressPublish(){if(!state.user||state.applyingRemote||state.applyingProgress)return;state.progressDirty=true;state.progressRevision++;clearTimeout(state.progressTimer);state.progressTimer=setTimeout(publishProgress,400);}
  async function publish() {
    if(!state.client || !state.user || !['admin','editor'].includes(state.role) || state.applyingRemote)return;
    if(state.publishPromise)return state.publishPromise;
    const revision=state.courseRevision;
    const content=serialiseCourses();
    const snapshot=stableStringify(content);
    if(!state.courseDirty && snapshot===state.lastPublishedCourses) return;
    state.publishPromise=(async()=>{
      const {error}=await state.client.from('bacmaster_shared_content').upsert({id:'main',content,updated_at:new Date().toISOString(),updated_by:state.user.id});
      if(error){status('Erreur de synchronisation des cours : '+error.message,true);return;}
      state.lastPublishedCourses=snapshot;
      if(state.courseRevision===revision) state.courseDirty=false;
      status('Cours partagés synchronisés.');
      if(state.courseRevision!==revision) schedulePublish();
    })().catch(e=>status('Erreur de synchronisation des cours : '+(e?.message||e),true)).finally(()=>{state.publishPromise=null;});
    return state.publishPromise;
  }
  function schedulePublish(){
    if(!state.user || !['admin','editor'].includes(state.role) || state.applyingRemote)return;
    if(!state.tableMode) state.courseDirty=true;
    state.courseRevision++;
    clearTimeout(state.timer);state.timer=setTimeout(state.tableMode?publishChapters:publish,state.tableMode?250:700);
  }
  async function refreshShared() {
    if(!state.client||!state.user)return;
    if(state.courseDirty || state.publishPromise) return;
    if(state.refreshPromise)return state.refreshPromise;
    state.refreshPromise=(async()=>{
      const {data,error}=await state.client.from('bacmaster_shared_content').select('content,updated_by,updated_at').eq('id','main').maybeSingle();
      if(error){status('Lecture impossible : '+error.message,true);return;}
      if(data?.content && Object.keys(data.content).length) {
        const remoteString=stableStringify(data.content);
        const wasInitialized=state.sharedInitialized;
        const localString=stableStringify(serialiseCourses());
        state.lastPublishedCourses=remoteString;
        if(remoteString!==localString && !state.courseDirty){
          mergeCourses(data.content, wasInitialized);
          const mergedString=stableStringify(serialiseCourses());
          state.lastPublishedCourses=mergedString;
          // On first load, keep local-only chapters on an editor/admin device and publish
          // the merged result once. On later polls, the server is authoritative for deletes.
          if(!wasInitialized && ['admin','editor'].includes(state.role) && mergedString!==remoteString){
            state.courseDirty=true; state.courseRevision++;
            await publish();
          } else status('Cours partagés actualisés.');
        }
        state.sharedInitialized=true;
      } else if(['admin','editor'].includes(state.role)) {
        state.sharedInitialized=true;
        state.courseDirty=true;
        await publish();
      } else { status('Aucun cours partagé publié pour le moment.'); state.sharedInitialized=true; }
    })().finally(()=>{state.refreshPromise=null;});
    return state.refreshPromise;
  }

  // ─── Mode temps réel : un chapitre = une ligne (table bacmaster_chapters) ───
  // • Seuls les chapitres modifiés sont envoyés ; Supabase ne diffuse que ce chapitre.
  // • Écriture « compare-and-swap » : si quelqu'un a modifié le chapitre entre-temps,
  //   les deux versions sont FUSIONNÉES (bm-merge.js) au lieu d'écraser l'autre.
  // • Si l'éditeur est ouvert, le texte fusionné y est rechargé en direct.
  const T='bacmaster_chapters';
  const CAN_EDIT=()=>['admin','editor'].includes(state.role);
  const DELETED='\u0000deleted';
  const chapKey=(subject,chapter)=>subject+'::'+chapter;
  const parseStr=str=>{try{return str&&str!==DELETED?JSON.parse(str):null;}catch{return null;}};
  function builtInChapter(subject,chapter){return typeof PREBUILT!=='undefined'&&PREBUILT[subject]&&Object.prototype.hasOwnProperty.call(PREBUILT[subject],chapter);}
  function builtInQuestions(subject,chapter){try{return new Set((PREBUILT[subject][chapter].flashcards||[]).map(c=>String(c.q)));}catch{return new Set();}}
  function localChapterStr(subject,chapter){const d=db?.[subject]?.[chapter];return d&&typeof d==='object'?stableStringify(serialiseChapter(d)):null;}
  function editorOpenOn(subject,chapter){try{return !!$('editor')&&curSubject===subject&&curChapter===chapter;}catch{return false;}}
  function flushEditor(){try{if($('editor')&&curSubject&&curChapter&&db[curSubject]&&db[curSubject][curChapter])db[curSubject][curChapter].cours=$('editor').innerHTML;}catch{}}
  function scheduleRefreshView(){
    clearTimeout(state.refreshViewTimer);
    state.refreshViewTimer=setTimeout(()=>{
      const r=state.applyingRemote,p=state.applyingProgress;state.applyingRemote=true;state.applyingProgress=true;
      try{if(typeof window.BacMasterRefreshView==='function')window.BacMasterRefreshView();}catch(e){console.warn('[BacMaster] Rafraîchissement de la vue :',e);}
      finally{state.applyingRemote=r;state.applyingProgress=p;}
    },250);
  }
  async function detectTableMode(){
    const {error}=await state.client.from(T).select('id').limit(1);
    state.tableMode=!error;
    if(error) console.warn('[BacMaster] Table bacmaster_chapters absente : mode ancien (lent). Exécute supabase_temps_reel.sql.',error.message);
    return state.tableMode;
  }
  function applyContentToDb(subject,chapter,content,deleted){
    state.applyingRemote=true;
    try{
      if(deleted){
        if(!builtInChapter(subject,chapter)&&db[subject]) delete db[subject][chapter];
      } else {
        if(!db[subject]) db[subject]={};
        if(!db[subject][chapter]) db[subject][chapter]={cours:'',flashcards:[],exercices:[]};
        const local=db[subject][chapter],inc=content||{};
        local.cours=String(inc.cours??local.cours??'');local.userEdited=!!inc.userEdited;
        const oldCards=local.flashcards||[];const byQ=new Map(oldCards.map(c=>[String(c.q),c]));
        const next=(inc.flashcards||[]).map(c=>{const q=String(c.q??''),a=String(c.a??'');const old=byQ.get(q);if(old){old.a=a;return old;}return {q,a,score:0,interval:0,ease:2.5,due:null};});
        // Une carte supprimée par un éditeur disparaît ici aussi, sauf les cartes d'origine de l'appli.
        const inNext=new Set(next.map(c=>String(c.q)));const builtIn=builtInQuestions(subject,chapter);
        for(const c of oldCards) if(!inNext.has(String(c.q))&&builtIn.has(String(c.q))) next.push(c);
        local.flashcards=next;
        const key=e=>String(e.enonce||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
        const oldMap=new Map((local.exercices||[]).map(e=>[key(e),e]));
        local.exercices=(inc.exercices||[]).map(e=>{const x={...e};const prev=oldMap.get(key(e));if(prev?.status)x.status=prev.status;if(prev?.lastAttempt)x.lastAttempt=prev.lastAttempt;return x;});
      }
      if(typeof window.save==='function') window.save(); else localStorage.setItem('bacmaster_db',JSON.stringify(db));
    } finally {state.applyingRemote=false;}
  }
  // Renvoie true si la ligne a modifié les cours locaux.
  function ingestRow(row,initial=false){
    if(!row||!row.id||!row.subject||!row.chapter) return false;
    if(isPrivateChapter(row.chapter,{titre:row.chapter})) return false;
    const {subject,chapter}=row;
    const rowStr=row.deleted?DELETED:stableStringify(row.content||{});
    const known=state.published.get(row.id);
    if(known&&known.remoteStr===rowStr){known.ver=row.updated_at||known.ver;return false;} // écho de notre propre écriture
    const open=editorOpenOn(subject,chapter);
    let content=row.content||{},didMerge=false;
    if(!initial&&CAN_EDIT()&&known){
      if(open) flushEditor();
      const cur=localChapterStr(subject,chapter);
      const dirty=cur!==null&&cur!==known.str;           // j'ai des modifs pas encore envoyées
      if(dirty&&row.deleted){known.remoteStr=DELETED;known.ver=row.updated_at||null;return false;} // supprimé ailleurs mais je l'ai modifié : je le garde
      if(dirty){
        const r=window.BacMasterMerge.mergeChapter(parseStr(known.remoteStr),serialiseChapter(db[subject][chapter]),row.content||{});
        content=r.content;didMerge=true;
        if(r.conflicts) status('Modification simultanée : les deux versions ont été gardées. Vérifie le passage signalé dans le cours.');
        else status('Modifications d’un autre éditeur fusionnées avec les tiennes.');
      }
    }
    if(row.deleted&&open) return false;                    // on ne supprime pas un cours en cours d'édition
    applyContentToDb(subject,chapter,content,!!row.deleted);
    const stillThere=!!db?.[subject]?.[chapter];
    state.published.set(row.id,{str:(row.deleted&&!stillThere)?DELETED:(didMerge?stableStringify(serialiseChapter(row.content||{})):localChapterStr(subject,chapter)),remoteStr:rowStr,ver:row.updated_at||null,subject,chapter});
    const k=state.published.get(row.id);
    if(didMerge) setTimeout(publishChapters,120);   // résultat fusionné à renvoyer
    if(open){try{if(typeof window.BacMasterReloadEditor==='function')window.BacMasterReloadEditor();}catch{}}
    return true;
  }
  function noteSeen(row){const t=Date.parse(row.updated_at||'');if(t&&t>state.lastChapSeen)state.lastChapSeen=t;}
  const verOf=(data,id)=>{const r=(data||[]).find(x=>x.id===id);return r?r.updated_at:null;};
  // Écrit un chapitre existant sans écraser le travail d'un autre : en cas de conflit, on fusionne puis on réessaie.
  async function casWrite(r){
    for(let attempt=0;attempt<5;attempt++){
      const known=state.published.get(r.id);
      const d=db?.[r.subject]?.[r.chapter];if(!d)return true;
      const content=serialiseChapter(d),str=stableStringify(content);
      if(known&&known.remoteStr===str){state.published.set(r.id,{...known,str});return true;}
      let data=[],error=null;
      if(known?.ver)({data,error}=await state.client.from(T).update({content,deleted:false}).eq('id',r.id).eq('updated_at',known.ver).select('id,updated_at'));
      if(error){status('Erreur de synchronisation des cours : '+error.message,true);return false;}
      if(data&&data.length){state.published.set(r.id,{str,remoteStr:str,ver:data[0].updated_at,subject:r.subject,chapter:r.chapter});return true;}
      // Quelqu'un est passé avant nous : on relit sa version et on fusionne.
      const {data:rem,error:e2}=await state.client.from(T).select('id,subject,chapter,content,deleted,updated_at').eq('id',r.id).maybeSingle();
      if(e2){status('Erreur de synchronisation des cours : '+e2.message,true);return false;}
      if(!rem){ // la ligne n'existe plus : on la recrée
        const {data:ins,error:e3}=await state.client.from(T).upsert([{id:r.id,subject:r.subject,chapter:r.chapter,content,deleted:false}],{onConflict:'id'}).select('id,updated_at');
        if(e3){status('Erreur de synchronisation des cours : '+e3.message,true);return false;}
        state.published.set(r.id,{str,remoteStr:str,ver:verOf(ins,r.id),subject:r.subject,chapter:r.chapter});return true;
      }
      noteSeen(rem);
      if(!ingestRow(rem)&&known){known.ver=rem.updated_at;}   // fusion locale ; met à jour la base de comparaison
      scheduleRefreshView();
    }
    status('Conflit de synchronisation persistant sur un cours : réessai au prochain enregistrement.',true);return false;
  }
  async function publishChapters(){
    if(!state.client||!state.user||!CAN_EDIT()||state.applyingRemote||!state.tableMode)return;
    if(state.chapPublishPromise){state.chapRepublish=true;return state.chapPublishPromise;}
    state.chapPublishPromise=(async()=>{
      let rounds=0;
      do{
        state.chapRepublish=false;
        const fresh=[],existing=[],tomb=[],current=new Set();
        for(const [subject,chapters] of Object.entries(db||{})){
          if(!chapters||typeof chapters!=='object')continue;
          for(const [chapter,data] of Object.entries(chapters)){
            if(!data||typeof data!=='object'||isPrivateChapter(chapter,data))continue;
            const id=chapKey(subject,chapter);current.add(id);
            const content=serialiseChapter(data),str=stableStringify(content),known=state.published.get(id);
            if(!known)fresh.push({id,subject,chapter,content,str});
            else if(known.str!==str)existing.push({id,subject,chapter});
          }
        }
        for(const [id,info] of state.published) if(!current.has(id)&&info.str!==DELETED)tomb.push({id,subject:info.subject,chapter:info.chapter});
        if(!fresh.length&&!existing.length&&!tomb.length)break;
        // 1) nouveaux chapitres : envoi groupé
        const batches=[];let cur=[],size=0;
        for(const r of fresh){const n=r.str.length;if(cur.length&&size+n>600000){batches.push(cur);cur=[];size=0;}cur.push(r);size+=n;}
        if(cur.length)batches.push(cur);
        for(const b of batches){
          const {data,error}=await state.client.from(T).upsert(b.map(({id,subject,chapter,content})=>({id,subject,chapter,content,deleted:false})),{onConflict:'id'}).select('id,updated_at');
          if(error){status('Erreur de synchronisation des cours : '+error.message,true);return;}
          for(const r of b)state.published.set(r.id,{str:r.str,remoteStr:r.str,ver:verOf(data,r.id),subject:r.subject,chapter:r.chapter});
        }
        // 2) chapitres modifiés : écriture protégée + fusion
        for(const r of existing) if(!(await casWrite(r)))return;
        // 3) suppressions
        for(const r of tomb){
          const {error}=await state.client.from(T).update({deleted:true,content:{}}).eq('id',r.id);
          if(error){status('Erreur de synchronisation des cours : '+error.message,true);return;}
          state.published.set(r.id,{str:DELETED,remoteStr:DELETED,ver:null,subject:r.subject,chapter:r.chapter});
        }
        status('Cours partagés synchronisés.');
      }while(state.chapRepublish&&++rounds<5);
    })().catch(e=>status('Erreur de synchronisation des cours : '+(e?.message||e),true)).finally(()=>{state.chapPublishPromise=null;});
    return state.chapPublishPromise;
  }
  async function loadChapters(){
    const {data,error}=await state.client.from(T).select('id,subject,chapter,content,deleted,updated_at').order('updated_at',{ascending:true});
    if(error){status('Lecture des cours impossible : '+error.message,true);return;}
    if(!data.length){
      // Première utilisation : on repart de l'ancien document partagé, puis un éditeur publie chapitre par chapitre.
      const {data:old}=await state.client.from('bacmaster_shared_content').select('content').eq('id','main').maybeSingle();
      if(old?.content&&Object.keys(old.content).length)mergeCourses(old.content,false);
      if(CAN_EDIT())await publishChapters();else status('Aucun cours partagé publié pour le moment.');
      state.sharedInitialized=true;return;
    }
    let changed=false;
    for(const row of data){noteSeen(row);if(ingestRow(row,true))changed=true;}
    state.sharedInitialized=true;
    if(CAN_EDIT())await publishChapters(); // publie les chapitres qui n'existent que chez moi
    if(changed){status('Cours partagés chargés.');scheduleRefreshView();}
  }
  async function pollChapters(){
    if(!state.client||!state.user||!state.tableMode||state.chapPollBusy)return;
    state.chapPollBusy=true;
    try{
      let changed=false;
      let q=state.client.from(T).select('id,subject,chapter,content,deleted,updated_at');
      if(state.lastChapSeen)q=q.gt('updated_at',new Date(state.lastChapSeen-3000).toISOString());
      const {data,error}=await q.order('updated_at',{ascending:true});
      if(!error&&data)for(const row of data){noteSeen(row);if(ingestRow(row))changed=true;}
      if(changed){status('Cours actualisés en temps réel.');scheduleRefreshView();}
    }catch(e){console.warn('[BacMaster] Vérification des cours :',e);}
    finally{state.chapPollBusy=false;}
  }
  function chaptersChannel(){
    return state.client.channel('bacmaster-chapters-live').on('postgres_changes',{event:'*',schema:'public',table:T},payload=>{
      const row=payload.new;if(!row||!row.id)return;noteSeen(row);
      if(ingestRow(row)){status('Cours actualisés en temps réel.');scheduleRefreshView();}
    }).subscribe(st=>{
      if(st==='SUBSCRIBED'&&state.sharedInitialized)pollChapters(); // rattrape ce qui a pu être manqué pendant une coupure
      if(st==='CHANNEL_ERROR'||st==='TIMED_OUT')status('Temps réel des cours indisponible : '+st+' (vérification toutes les 4 s).',true);
    });
  }
  async function connectSession(session) {
    if(state.pollTimer){clearInterval(state.pollTimer);state.pollTimer=null;}
    const nextUser=session?.user||null;
    const userChanged=(state.user?.id||null)!==(nextUser?.id||null);
    if(userChanged){try{window.BacMasterUI&&window.BacMasterUI.onDisconnect();}catch{}state.sharedInitialized=false;state.courseDirty=false;state.progressDirty=false;state.lastPublishedCourses='';state.lastPublishedProgress='';state.courseRevision=0;state.progressRevision=0;state.published=new Map();state.lastChapSeen=0;state.tableMode=false;clearTimeout(state.timer);clearTimeout(state.progressTimer);clearTimeout(state.privateTimer);}
    state.user=nextUser;
    const gate=$('bm-supabase-panel'),chip=$('bm-supabase-account-chip');
    if(!state.user){state.role='reader';if(gate)gate.hidden=false;if(chip)chip.hidden=true;status('Choisis une option pour continuer.');return;}
    if(gate)gate.hidden=true;if(chip)chip.hidden=false;
    let {data:profile,error}=await state.client.from('bacmaster_profiles').select('display_name,role').eq('user_id',state.user.id).maybeSingle();
    if(error){if(gate)gate.hidden=false;if(chip)chip.hidden=true;status('Profil indisponible : '+error.message+'. Vérifie le script SQL.',true);return;}
    if(!profile){if(gate)gate.hidden=false;if(chip)chip.hidden=true;status('Profil non créé. Vérifie que le script SQL complet a été exécuté.',true);return;}
    state.role=profile.role||'reader';state.displayName=profile.display_name||state.user.email||'Quelqu’un';const account=(profile.display_name||state.user.email)+' — '+state.role;
    if(chip){chip.textContent='☁️ '+(profile.display_name||state.user.email||'Mon compte')+' · '+state.role;chip.dataset.account=account;}
    addAdminPanel();
    if(state.channel) await state.client.removeChannel(state.channel);
    if(state.profileChannel) await state.client.removeChannel(state.profileChannel);
    state.profileChannel=state.client.channel('bacmaster-profile-'+state.user.id).on('postgres_changes',{event:'UPDATE',schema:'public',table:'bacmaster_profiles',filter:'user_id=eq.'+state.user.id},async()=>{const {data:p}=await state.client.from('bacmaster_profiles').select('display_name,role').eq('user_id',state.user.id).maybeSingle();if(p){state.role=p.role||'reader';if(chip){chip.textContent='☁️ '+(p.display_name||state.user.email||'Mon compte')+' · '+state.role;chip.dataset.account=(p.display_name||state.user.email)+' — '+state.role;}if(state.role!=='admin' && $('bm-supabase-admin'))$('bm-supabase-admin').hidden=true;}}).subscribe((st)=>{if(st==='CHANNEL_ERROR'||st==='TIMED_OUT')status('Connexion temps réel au profil interrompue : '+st,true);});
    if(await detectTableMode()) state.channel=chaptersChannel(); else
    state.channel=state.client.channel('bacmaster-shared-live').on('postgres_changes',{event:'*',schema:'public',table:'bacmaster_shared_content',filter:'id=eq.main'},payload=>{if(payload.new?.content && !state.courseDirty && !state.publishPromise && stableStringify(payload.new.content)!==stableStringify(serialiseCourses())) { mergeCourses(payload.new.content); state.lastPublishedCourses=stableStringify(serialiseCourses()); status('Cours actualisés en temps réel.'); }}).subscribe((st)=>{if(st==='CHANNEL_ERROR'||st==='TIMED_OUT')status('Temps réel des cours indisponible : '+st+' (la vérification périodique reste active).',true);});
    if(state.progressChannel) await state.client.removeChannel(state.progressChannel);
    state.progressChannel=state.client.channel('bacmaster-progress-live-'+state.user.id).on('postgres_changes',{event:'*',schema:'public',table:'user_data',filter:'user_id=eq.'+state.user.id},payload=>{const incoming=payload.new?.data;if(incoming?.bacmasterProgressVersion===1 && incoming.origin!==state.deviceId){mergeProgress(incoming);status('Progression actualisée depuis un autre appareil.');}}).subscribe((st)=>{if(st==='CHANNEL_ERROR'||st==='TIMED_OUT')status('Temps réel de la progression indisponible : '+st,true);});
    await syncPrivateChapter();
    if(state.tableMode) await loadChapters(); else await refreshShared();
    await refreshProgress();
    // Realtime is preferred, but this fallback also supports projects where the
    // Supabase publication was not enabled for a table. Updates appear within ~8s.
    if(state.pollTimer) clearInterval(state.pollTimer);
    state.pollTimer=setInterval(async()=>{
      if(!state.user||document.visibilityState==='hidden')return;
      if(state.tableMode) await pollChapters(); else await refreshShared();
      await refreshProgress();
    },4000);
    try{window.BacMasterUI&&window.BacMasterUI.onConnect();}catch(e){console.warn(e);}
    if(!['admin','editor'].includes(state.role)) status('Connecté en lecture seule. Les cours partagés sont accessibles en consultation.');
  }
  async function signIn(){const email=$('bm-supabase-email').value.trim(),password=$('bm-supabase-password').value;if(!email||!password){status('Renseigne ton e-mail et ton mot de passe.',true);return;} status('Connexion…');const {data,error}=await state.client.auth.signInWithPassword({email,password});if(error){status(error.message,true);return;}await connectSession(data.session);}
  async function signUp(){const email=$('bm-supabase-email').value.trim(),password=$('bm-supabase-password').value,name=$('bm-supabase-name').value.trim();if(!email||!password){status('Renseigne ton e-mail et un mot de passe.',true);return;}if(password.length<8){status('Choisis un mot de passe de 8 caractères minimum.',true);return;}status('Création du compte…');const {data,error}=await state.client.auth.signUp({email,password,options:{data:{display_name:name}}});if(error){status(error.message,true);return;}if(data.session)await connectSession(data.session);else status('Compte créé. Vérifie tes e-mails pour confirmer l’inscription, puis connecte-toi.');}
  async function signOut(){try{window.BacMasterUI&&window.BacMasterUI.onDisconnect();}catch{}if(state.pollTimer){clearInterval(state.pollTimer);state.pollTimer=null;}if(state.channel)await state.client.removeChannel(state.channel);if(state.profileChannel)await state.client.removeChannel(state.profileChannel);if(state.progressChannel)await state.client.removeChannel(state.progressChannel);if($('bm-supabase-admin'))$('bm-supabase-admin').hidden=true;await state.client.auth.signOut();state.user=null;state.role='reader';const info=$('bm-supabase-account-info'),out=$('bm-supabase-signout'),admin=$('bm-supabase-admin-open'),close=$('bm-supabase-close-account');if(info)info.remove();if(out)out.remove();if(admin)admin.remove();if(close)close.remove();const sync=$('bm-supabase-sync-now');if(sync)sync.remove();if($('bm-supabase-panel'))$('bm-supabase-panel').hidden=false;if($('bm-supabase-account-chip'))$('bm-supabase-account-chip').hidden=true;$('bm-supabase-landing').hidden=false;$('bm-supabase-form').hidden=true;status('Tu es déconnecté.');}
  async function manualSync(){
    if(!state.user){status('Connecte-toi d’abord.',true);return;}
    status('Synchronisation en cours…');
    clearTimeout(state.timer); clearTimeout(state.progressTimer);
    if(state.tableMode){if(CAN_EDIT())await publishChapters();await loadChapters();}
    else if(['admin','editor'].includes(state.role)){state.courseDirty=true;state.courseRevision++;await publish();}
    else await refreshShared();
    state.progressDirty=true;state.progressRevision++;await publishProgress();
    if(!state.courseDirty && !state.progressDirty) status('Synchronisation terminée.');
  }
  function hookSave(){
    // script.js calls this explicit hook from save(); no monkey-patching of global bindings.
    window.BacMasterSync={api:{state,status,stableStringify},onLocalSave(){if(state.applyingRemote||state.applyingProgress)return;schedulePublish();schedulePrivatePublish();scheduleProgressPublish();}};
  }
  async function init(){addPanel();addAdminPanel();if(!cfg.url||!cfg.publishableKey){status('Configuration Supabase manquante.',true);return;}if(!window.supabase?.createClient){status('Client Supabase indisponible : vérifie la connexion Internet.',true);return;}state.client=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});hookSave();const wake=()=>{if(!state.user||document.visibilityState==='hidden')return;(state.tableMode?pollChapters():refreshShared());refreshProgress();};document.addEventListener('visibilitychange',wake);window.addEventListener('focus',wake);window.addEventListener('online',wake);const {data:{session},error}=await state.client.auth.getSession();if(error)status('Impossible de récupérer la session : '+error.message,true);await connectSession(session);state.client.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>connectSession(session),0);});}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
