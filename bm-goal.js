/* ============================================================
   BacMaster — bm-goal.js
   Objectif quotidien (15, 20, 30 min…), série, rappels « tant que l'objectif
   n'est pas atteint » et notifications (locales + push serveur optionnel).
   ============================================================ */
(function () {
  'use strict';
  const KEY = 'bacmaster_goal', SENT = 'bacmaster_notif_sent', BONUS = 'bacmaster_goal_done_day';
  const DEFAULT = { minutes: 20, remind: true, slots: ['18:00', '20:00', '21:30'], bonus: true, history: {}, updatedAt: 0 };
  const $ = id => document.getElementById(id);
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = n => Number(n) || 0;

  // ───────────── Réglages ─────────────
  function load() {
    let g = {};
    try { g = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { g = {}; }
    const out = Object.assign({}, DEFAULT, g);
    out.minutes = Math.min(300, Math.max(5, num(out.minutes) || 20));
    out.slots = (Array.isArray(out.slots) ? out.slots : DEFAULT.slots).filter(s => /^([01]\d|2[0-3]):[0-5]\d$/.test(s)).slice(0, 4);
    out.history = out.history && typeof out.history === 'object' ? out.history : {};
    return out;
  }
  function save(g) {
    g.updatedAt = Date.now();
    g.history[dayKey()] = g.minutes;                       // l'objectif de CE jour est celui qu'on vient de choisir
    const keys = Object.keys(g.history).sort(); while (keys.length > 150) delete g.history[keys.shift()];
    localStorage.setItem(KEY, JSON.stringify(g));
    bmStatsChanged(); refreshCard(); scheduleServerSync(true);
  }
  function recordToday() { const g = load(); const k = dayKey(); if (g.history[k] === undefined) { g.history[k] = g.minutes; localStorage.setItem(KEY, JSON.stringify(g)); } }
  const goalMinutesFor = (day, g) => num((g || load()).history[day]) || (g || load()).minutes;

  // ───────────── Progression, série ─────────────
  const todaySec = () => dayTimeTotal(dayKey());
  function metGoal(day, g) {
    const sec = dayTimeTotal(day);
    if (sec >= goalMinutesFor(day, g) * 60) return true;
    // anciens jours sans mesure de temps : on garde la règle d'avant (une activité suffit)
    return !getTimeLog()[day] && getActivityDates().includes(day);
  }
  window.computeStreak = function () {
    const g = load(); const d = new Date();
    if (!metGoal(dayKey(d), g)) d.setDate(d.getDate() - 1);
    let n = 0; while (metGoal(dayKey(d), g) && n < 2000) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  window.last7DaysActivity = function () {
    const g = load(), out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i); const key = dayKey(d);
      out.push({ key, label: d.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, 1).toUpperCase(), active: metGoal(key, g), partial: dayTimeTotal(key) > 0 });
    }
    return out;
  };
  function bestStreak() {
    const g = load(), days = new Set([...Object.keys(getTimeLog()), ...getActivityDates()]);
    const sorted = [...days].sort(); let best = 0, cur = 0, prev = null;
    for (const k of sorted) {
      if (!metGoal(k, g)) { cur = 0; prev = null; continue; }
      const gap = prev ? Math.round((new Date(k) - new Date(prev)) / 86400000) : 1;
      cur = gap === 1 ? cur + 1 : 1; prev = k; best = Math.max(best, cur);
    }
    return best;
  }
  function status() {
    const g = load(), sec = todaySec(), goalSec = g.minutes * 60;
    const streak = window.computeStreak(), done = sec >= goalSec;
    let due = 0; try { due = globalStats().due; } catch (e) { /* ignore */ }
    return { g, sec, goalSec, pct: Math.min(100, Math.round(sec / goalSec * 100)), done, remainMin: Math.max(1, Math.ceil((goalSec - sec) / 60)), doneMin: Math.floor(sec / 60), streak, due, atRisk: !done && streak > 0 };
  }

  // ───────────── Carte « objectif du jour » (accueil) ─────────────
  function ring(pct, label, done) {
    const r = 46, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return `<svg viewBox="0 0 110 110" class="bg-ringsvg" role="img" aria-label="${esc(label)}"><defs><linearGradient id="bgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${done ? '#22c55e' : '#f97316'}"/><stop offset="1" stop-color="${done ? '#16a34a' : '#ec4899'}"/></linearGradient></defs>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="10"/>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="url(#bgg)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 55 55)"/></svg>`;
  }
  function cardInner() {
    const s = status(), st = s.streak;
    const msg = s.done ? `Objectif atteint, bravo ! Tu peux continuer pour prendre de l’avance.`
      : s.sec === 0 ? `${s.g.minutes} min aujourd’hui pour ${st > 0 ? 'garder ta série' : 'lancer ta série'}.`
      : `Plus que <strong>${s.remainMin} min</strong> pour valider ta journée.`;
    const reviewLabel = s.due > 0 ? `🌅 Réviser (${s.due} carte${s.due > 1 ? 's' : ''})` : '📚 Réviser maintenant';
    return `<div class="bg-ring">${ring(s.pct, `Objectif du jour : ${s.doneMin} minutes sur ${s.g.minutes}`, s.done)}<div class="bg-ringtxt"><b>${s.doneMin}</b><span>/ ${s.g.minutes} min</span></div></div>
      <div class="bg-body">
        <div class="bg-title">${st > 0 ? '🔥' : '🎯'} ${st > 0 ? `Série de ${st} jour${st > 1 ? 's' : ''}` : 'Objectif du jour'}${s.done ? ' <span class="bg-ok">✓ validé</span>' : s.atRisk ? ' <span class="bg-risk">à sauver</span>' : ''}</div>
        <div class="bg-sub">${msg}</div>
        <div class="bg-actions"><button class="bg-btn pri" onclick="BacMasterGoal.start()">${reviewLabel}</button><button class="bg-btn" onclick="BacMasterGoal.openSettings()">⚙️ Objectif &amp; rappels</button></div>
      </div>`;
  }
  window.bmGoalCardHTML = function () { recordToday(); return `<div class="bg-card ${status().done ? 'done' : ''}" id="bm-goal-card">${cardInner()}</div>`; };
  function refreshCard() { const c = $('bm-goal-card'); if (c) { c.className = 'bg-card' + (status().done ? ' done' : ''); c.innerHTML = cardInner(); } }

  function start() {
    try { if (globalStats().due > 0 && typeof startDailyReview === 'function') return startDailyReview(); } catch (e) { /* ignore */ }
    goHome(); setTimeout(() => { const g = document.querySelector('.subjects-grid'); if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 200);
  }

  // ───────────── Célébration ─────────────
  function celebrate() {
    if (localStorage.getItem(BONUS) === dayKey() || !status().done) return;
    localStorage.setItem(BONUS, dayKey());
    const st = status().streak;
    if (typeof showToast === 'function') showToast(`🎉 Objectif atteint ! ${st > 0 ? '🔥 Série de ' + st + ' jour' + (st > 1 ? 's' : '') : ''}`);
    const layer = document.createElement('div'); layer.className = 'bg-confetti'; layer.setAttribute('aria-hidden', 'true');
    const colors = ['#f97316', '#ec4899', '#22c55e', '#3b82f6', '#eab308', '#a855f7'];
    for (let i = 0; i < 46; i++) { const p = document.createElement('i'); p.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};animation-delay:${Math.random() * .6}s;animation-duration:${1.8 + Math.random() * 1.4}s;transform:rotate(${Math.random() * 360}deg)`; layer.appendChild(p); }
    document.body.appendChild(layer); setTimeout(() => layer.remove(), 3600);
  }

  // ───────────── Notifications ─────────────
  const canNotify = () => 'Notification' in window;
  const granted = () => canNotify() && Notification.permission === 'granted';
  function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function buildMessage(s, idx, total) {
    const pick = (arr, salt) => arr[hash(dayKey() + idx + (salt || '')) % arr.length];
    const n = s.streak, plural = n > 1 ? 's' : '', last = total > 1 && idx === total - 1;
    const dueTxt = s.due > 0 ? ` ${s.due} carte${s.due > 1 ? 's' : ''} t’attend${s.due > 1 ? 'ent' : ''}.` : '';
    let title;
    if (n > 0) title = last ? pick([`🚨 Dernière chance : ta série de ${n} jour${plural}`, `⏳ Ta série de ${n} jour${plural} est en jeu`]) : pick([`🔥 Ta série de ${n} jour${plural} t’attend`, `🔥 ${n} jour${plural} d’affilée… on continue ?`]);
    else title = last ? pick(['⏰ Il est encore temps de réviser aujourd’hui', '🌙 Une petite session avant de dormir ?']) : pick(['📚 C’est l’heure de ta session', '🎯 Ton objectif du jour t’attend']);
    const body = s.sec > 60 ? `Tu as déjà fait ${s.doneMin} min : plus que ${s.remainMin} min pour valider ta journée !${dueTxt}`
      : `${s.g.minutes} min suffisent aujourd’hui. Ouvre BacMaster et lance-toi !${dueTxt}`;
    return { title, body, tag: 'bm-goal' };
  }
  function bonusMessage(s) {
    const n = s.streak;
    return { title: '🎉 Objectif atteint, bravo !', body: `${s.doneMin} min aujourd’hui${n > 0 ? ` et ${n} jour${n > 1 ? 's' : ''} de série` : ''}. Encore 10 minutes pour prendre de l’avance ?`, tag: 'bm-goal' };
  }
  async function notify(msg) {
    const opts = { body: msg.body, icon: './icon-192.png', badge: './icon-192.png', tag: msg.tag || 'bm-goal', renotify: true, data: { url: './?revise=1' }, vibrate: [80, 40, 80], actions: [{ action: 'revise', title: '📚 Réviser' }, { action: 'later', title: 'Plus tard' }] };
    try {
      const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
      if (reg && reg.showNotification) { await reg.showNotification(msg.title, opts); return true; }
      new Notification(msg.title, { body: msg.body, icon: opts.icon }); return true;
    } catch (e) { return false; }
  }
  function sentMap() { try { return JSON.parse(localStorage.getItem(SENT) || '{}') || {}; } catch (e) { return {}; } }
  function markSent(day, slot) {
    const m = sentMap(); (m[day] = m[day] || []).push(slot);
    for (const k of Object.keys(m).sort().slice(0, -7)) delete m[k];
    localStorage.setItem(SENT, JSON.stringify(m));
  }
  // Appelé toutes les 30 s et au retour sur l'appli : envoie le rappel le plus récent s'il est « dû ».
  function tick(force) {
    celebrate();
    const g = load(); if (!g.remind || !g.slots.length) return;
    const now = new Date(), dk = dayKey(now), sent = (sentMap()[dk] || []);
    const slots = [...g.slots].sort(), dueSlots = [];
    slots.forEach((slot, i) => { const [h, m] = slot.split(':').map(Number); const t = new Date(now); t.setHours(h, m, 0, 0); const late = (now - t) / 60000; if (late >= 0 && late <= 180 && !sent.includes(slot)) dueSlots.push({ slot, i }); });
    if (!dueSlots.length) return;
    dueSlots.forEach(d => markSent(dk, d.slot));
    const { slot, i } = dueSlots[dueSlots.length - 1], s = status();
    if (s.done) { if (g.bonus && i === slots.length - 1 && localStorage.getItem('bacmaster_bonus_sent') !== dk) { localStorage.setItem('bacmaster_bonus_sent', dk); if (granted() && document.visibilityState !== 'visible') notify(bonusMessage(s)); } return; }
    const msg = buildMessage(s, i, slots.length);
    if (document.visibilityState === 'visible') { if (typeof showToast === 'function') showToast(`⏰ ${msg.title.replace(/^[^\wÀ-ÿ]+/, '')} — encore ${s.remainMin} min`); }
    else if (granted()) notify(msg);
  }
  async function testNotification() {
    if (!canNotify()) return toast('Les notifications ne sont pas disponibles sur ce navigateur.', 'warn');
    if (Notification.permission !== 'granted') { const p = await Notification.requestPermission(); if (p !== 'granted') { renderSettings(); return; } }
    const s = status(); await notify(s.done ? bonusMessage(s) : buildMessage(s, 0, 3)); toast('🔔 Notification de test envoyée.'); renderSettings();
  }
  function toast(m, type) { if (typeof showToast === 'function') showToast(m, type); }

  // ───────────── Push serveur (téléphone fermé) — optionnel ─────────────
  const cfg = () => window.BACMASTER_SUPABASE_CONFIG || {};
  const api = () => window.BacMasterSync && window.BacMasterSync.api;
  const iOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = () => window.matchMedia && window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  function b64ToU8(b64) { const p = '='.repeat((4 - b64.length % 4) % 4), raw = atob((b64 + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from([...raw].map(c => c.charCodeAt(0))); }
  async function pushState() {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window;
    let sub = null; if (supported) { try { const reg = await navigator.serviceWorker.getRegistration(); sub = reg && await reg.pushManager.getSubscription(); } catch (e) { /* ignore */ } }
    return { supported, configured: !!cfg().vapidPublicKey, subscribed: !!sub, signedIn: !!(api() && api().state.user) };
  }
  async function pushEnable() {
    const a = api(); if (!a || !a.state.user) return toast('Connecte-toi d’abord à ton compte.', 'warn');
    if (!cfg().vapidPublicKey) return toast('Les rappels « application fermée » ne sont pas encore configurés.', 'warn');
    if (!granted()) { const p = await Notification.requestPermission(); if (p !== 'granted') return renderSettings(); }
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(cfg().vapidPublicKey) });
      const j = sub.toJSON();
      const { error } = await a.state.client.from('bacmaster_push_subs').upsert({ endpoint: j.endpoint, user_id: a.state.user.id, p256dh: j.keys.p256dh, auth: j.keys.auth, tz: Intl.DateTimeFormat().resolvedOptions().timeZone, ua: navigator.userAgent.slice(0, 160) }, { onConflict: 'endpoint' });
      if (error) throw error;
      localStorage.setItem('bacmaster_push_on', '1'); await syncServer(true); toast('🔔 Rappels activés, même application fermée.');
    } catch (e) { toast('Activation impossible : ' + (e.message || e), 'warn'); }
    renderSettings();
  }
  async function pushDisable() {
    try { const reg = await navigator.serviceWorker.getRegistration(); const sub = reg && await reg.pushManager.getSubscription(); if (sub) { const a = api(); if (a && a.state.client) await a.state.client.from('bacmaster_push_subs').delete().eq('endpoint', sub.endpoint); await sub.unsubscribe(); } } catch (e) { /* ignore */ }
    localStorage.removeItem('bacmaster_push_on'); renderSettings();
  }
  let syncTimer = null, lastSync = 0;
  function scheduleServerSync(force) { if (localStorage.getItem('bacmaster_push_on') !== '1') return; clearTimeout(syncTimer); syncTimer = setTimeout(() => syncServer(force), force ? 800 : 20000); }
  // Le serveur doit savoir : mon objectif, mes heures de rappel, et combien j'ai déjà révisé aujourd'hui.
  async function syncServer(force) {
    const a = api(); if (!a || !a.state.user || !a.state.client || localStorage.getItem('bacmaster_push_on') !== '1') return;
    if (!force && Date.now() - lastSync < 15000) return; lastSync = Date.now();
    const s = status(), g = s.g;
    try { await a.state.client.from('bacmaster_reminders').upsert({ user_id: a.state.user.id, tz: Intl.DateTimeFormat().resolvedOptions().timeZone, minutes: g.minutes, slots: g.slots, remind: g.remind, bonus: g.bonus, day: dayKey(), seconds: Math.round(s.sec), streak: s.streak, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }); } catch (e) { /* ignore */ }
  }

  // ───────────── Fenêtre de réglages ─────────────
  function renderSettings() {
    let m = $('bm-goal-modal'); if (!m) return;
    const g = load();
    const perm = !canNotify() ? 'unsupported' : Notification.permission;
    pushState().then(ps => {
      m = $('bm-goal-modal'); if (!m) return;
      const chips = [10, 15, 20, 30, 45, 60, 90].map(v => `<button class="bg-chip ${g.minutes === v ? 'on' : ''}" data-min="${v}">${v}<small>min</small></button>`).join('');
      const slots = g.slots.map((s, i) => `<div class="bg-slot"><input type="time" value="${s}" data-slot="${i}" aria-label="Heure du rappel ${i + 1}"><button class="bg-x" data-del="${i}" aria-label="Supprimer ce rappel">✕</button></div>`).join('');
      const permHtml = perm === 'granted' ? `<div class="bg-note ok">✅ Notifications autorisées sur cet appareil</div>`
        : perm === 'denied' ? `<div class="bg-note bad">🚫 Notifications bloquées. Autorise-les dans les réglages du navigateur (icône 🔒 à côté de l’adresse) puis reviens ici.</div>`
        : perm === 'unsupported' ? `<div class="bg-note bad">Ce navigateur ne gère pas les notifications.</div>`
        : `<button class="bg-btn pri full" id="bg-allow">🔔 Autoriser les notifications</button>`;
      const iosHint = iOS && !standalone() ? `<div class="bg-note warn">📱 Sur iPhone : ouvre le menu Partager de Safari puis « Sur l’écran d’accueil », et lance BacMaster depuis cette icône. Les notifications ne marchent que là.</div>` : '';
      let pushHtml = '';
      if (!ps.supported) pushHtml = '';
      else if (!ps.configured) pushHtml = `<div class="bg-note">ℹ️ Les rappels <strong>application fermée</strong> demandent une petite installation côté serveur (guide fourni). En attendant, tu reçois les rappels quand BacMaster est ouvert ou en arrière-plan.</div>`;
      else if (!ps.signedIn) pushHtml = `<div class="bg-note warn">Connecte-toi à ton compte pour recevoir les rappels application fermée.</div>`;
      else pushHtml = ps.subscribed ? `<div class="bg-row"><span>📲 Rappels même application fermée</span><button class="bg-btn" id="bg-pushoff">Désactiver</button></div>` : `<div class="bg-row"><span>📲 Rappels même application fermée</span><button class="bg-btn pri" id="bg-pushon">Activer ici</button></div>`;
      m.querySelector('.bg-sheet-body').innerHTML = `
        <h3>🎯 Combien de temps veux-tu réviser par jour ?</h3>
        <div class="bg-chips">${chips}</div>
        <label class="bg-custom">Autre durée <input type="number" min="5" max="300" step="5" value="${g.minutes}" id="bg-custom"> min</label>
        <p class="bg-hint">Ta journée est validée (et ta série continue) quand tu atteins cet objectif.</p>
        <hr>
        <div class="bg-row"><span>🔔 Me rappeler de réviser</span><label class="bg-switch"><input type="checkbox" id="bg-remind" ${g.remind ? 'checked' : ''}><i></i></label></div>
        ${g.remind ? `<div class="bg-slots">${slots}${g.slots.length < 4 ? '<button class="bg-add" id="bg-addslot">＋ Ajouter une heure</button>' : ''}</div>
        <p class="bg-hint">Tant que ton objectif n’est pas atteint, tu reçois un rappel à ces heures.</p>
        <div class="bg-row"><span>🎉 M’encourager à continuer quand c’est fait</span><label class="bg-switch"><input type="checkbox" id="bg-bonus" ${g.bonus ? 'checked' : ''}><i></i></label></div>` : ''}
        <hr>${iosHint}${permHtml}${pushHtml}
        <button class="bg-btn full" id="bg-test">🧪 Envoyer une notification de test</button>`;
      bind(m);
    });
  }
  function bind(m) {
    m.querySelectorAll('[data-min]').forEach(b => b.onclick = () => { const g = load(); g.minutes = +b.dataset.min; save(g); renderSettings(); });
    const c = $('bg-custom'); if (c) c.onchange = () => { const g = load(); g.minutes = Math.min(300, Math.max(5, +c.value || 20)); save(g); renderSettings(); };
    const r = $('bg-remind'); if (r) r.onchange = () => { const g = load(); g.remind = r.checked; save(g); if (r.checked && canNotify() && Notification.permission === 'default') Notification.requestPermission().then(renderSettings); renderSettings(); };
    const bo = $('bg-bonus'); if (bo) bo.onchange = () => { const g = load(); g.bonus = bo.checked; save(g); };
    m.querySelectorAll('[data-slot]').forEach(i => i.onchange = () => { const g = load(); if (/^\d\d:\d\d$/.test(i.value)) { g.slots[+i.dataset.slot] = i.value; g.slots = [...new Set(g.slots)].sort(); save(g); renderSettings(); } });
    m.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { const g = load(); g.slots.splice(+b.dataset.del, 1); save(g); renderSettings(); });
    const add = $('bg-addslot'); if (add) add.onclick = () => { const g = load(); const free = ['09:00', '12:30', '16:30', '19:00', '22:00'].find(t => !g.slots.includes(t)) || '17:00'; g.slots = [...g.slots, free].sort(); save(g); renderSettings(); };
    const al = $('bg-allow'); if (al) al.onclick = () => Notification.requestPermission().then(renderSettings);
    const t = $('bg-test'); if (t) t.onclick = testNotification;
    const on = $('bg-pushon'); if (on) on.onclick = pushEnable;
    const off = $('bg-pushoff'); if (off) off.onclick = pushDisable;
  }
  function openSettings() {
    let m = $('bm-goal-modal');
    if (!m) {
      m = document.createElement('div'); m.id = 'bm-goal-modal'; m.className = 'bg-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', 'Objectif quotidien et rappels');
      m.innerHTML = `<div class="bg-sheet"><div class="bg-sheet-head"><b>Objectif &amp; rappels</b><button class="bg-close" aria-label="Fermer">✕</button></div><div class="bg-sheet-body"></div></div>`;
      m.addEventListener('click', e => { if (e.target === m || e.target.closest('.bg-close')) closeSettings(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSettings(); });
      document.body.appendChild(m);
    }
    m.hidden = false; renderSettings();
  }
  function closeSettings() { const m = $('bm-goal-modal'); if (m) m.hidden = true; refreshCard(); }
  window.askNotifPermission = openSettings;

  // ───────────── Démarrage ─────────────
  let progTimer = null;
  function onProgress() { clearTimeout(progTimer); progTimer = setTimeout(() => { refreshCard(); celebrate(); scheduleServerSync(false); }, 1500); }
  function boot() {
    recordToday();
    setInterval(() => { tick(); refreshCard(); }, 30000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { tick(); refreshCard(); } else syncServer(true); });
    window.addEventListener('focus', () => tick());
    setTimeout(tick, 4000);
    if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('message', e => { if (e.data && e.data.type === 'bm-revise') start(); });
    if (/[?&]revise=1/.test(location.search)) { history.replaceState(null, '', location.pathname); setTimeout(start, 600); }
  }
  window.BacMasterGoal = { start, openSettings, onProgress, status, load, bestStreak, tick, buildMessage, bonusMessage, notify, metGoal, goalMinutesFor, pushState };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
