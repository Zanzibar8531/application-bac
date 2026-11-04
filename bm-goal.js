/* ============================================================
   BacMaster — bm-goal.js
   Objectif quotidien (15, 20, 30 min…), série, rappels « tant que l'objectif
   n'est pas atteint » et notifications (locales + push serveur optionnel).
   ============================================================ */
(function () {
  'use strict';
  const KEY = 'bacmaster_goal', SENT = 'bacmaster_notif_sent', BONUS = 'bacmaster_goal_done_day';
  const DEFAULT = { minutes: 20, minutesWE: 0, remind: true, slots: ['18:00', '20:00', '21:30'], bonus: true, history: {}, jumps: { req: null, used: [] }, updatedAt: 0 };
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
    out.minutesWE = out.minutesWE ? Math.min(300, Math.max(5, num(out.minutesWE))) : 0;   // 0 = même objectif qu'en semaine
    const j = out.jumps && typeof out.jumps === 'object' ? out.jumps : {};
    out.jumps = { req: j.req && j.req.from && j.req.start ? { from: j.req.from, start: j.req.start, days: j.req.days === 2 ? 2 : 1 } : null, used: Array.isArray(j.used) ? j.used.filter(u => u && u.from && (u.days === 1 || u.days === 2)) : [] };
    return out;
  }
  function save(g) {
    g.updatedAt = Date.now();
    g.history[dayKey()] = baseGoal(dayKey(), g);                       // l'objectif de CE jour est celui qu'on vient de choisir
    const keys = Object.keys(g.history).sort(); while (keys.length > 150) delete g.history[keys.shift()];
    localStorage.setItem(KEY, JSON.stringify(g));
    bmStatsChanged(); refreshCard(); scheduleServerSync(true);
  }
  function recordToday() { const g = load(); const k = dayKey(); if (g.history[k] === undefined) { g.history[k] = baseGoal(k, g); localStorage.setItem(KEY, JSON.stringify(g)); } }
  // Objectif de base d'un jour : semaine (lun→ven) ou week-end (sam→dim)
  function baseGoal(day, g) { const wd = new Date(day + 'T12:00:00').getDay(); return (wd === 0 || wd === 6) && g.minutesWE ? g.minutesWE : g.minutes; }
  function goalMinutesFor(day, g) { g = g || load(); return num(g.history[day]) || baseGoal(day, g); }

  // ───────────── Progression, série ─────────────
  const todaySec = () => dayTimeTotal(dayKey());
  function metGoal(day, g) {
    const sec = dayTimeTotal(day);
    if (sec >= goalMinutesFor(day, g) * 60) return true;
    // anciens jours sans mesure de temps : on garde la règle d'avant (une activité suffit)
    return !getTimeLog()[day] && getActivityDates().includes(day);
  }
  window.computeStreak = function () {
    const g = load(); let d = dayKey(), n = 0, first = true;
    for (let i = 0; i < 2500; i++) {
      if (metGoal(d, g)) n++;
      else if (jumpCovered(d, g)) { /* jour protégé par un Saut Temporel : la série tient, sans compter */ }
      else if (!first) break;                              // aujourd'hui peut encore être en cours
      first = false; d = addDays(d, -1);
    }
    return n;
  };
  window.last7DaysActivity = function () {
    const g = load(), out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i); const key = dayKey(d);
      out.push({ key, label: d.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, 1).toUpperCase(), active: metGoal(key, g), partial: dayTimeTotal(key) > 0, jump: jumpCovered(key, g) && !metGoal(key, g) });
    }
    return out;
  };
  function bestStreak() {
    const g = load(), days = new Set([...Object.keys(getTimeLog()), ...getActivityDates(), ...coveredDays(g)]);
    const sorted = [...days].sort(); let best = 0, cur = 0, prev = null;
    for (const k of sorted) {
      if (!metGoal(k, g)) { if (jumpCovered(k, g)) { prev = k; continue; } cur = 0; prev = null; continue; }
      const gap = prev ? Math.round((new Date(k) - new Date(prev)) / 86400000) : 1;
      cur = gap === 1 ? cur + 1 : 1; prev = k; best = Math.max(best, cur);
    }
    return best;
  }
  const hoursLeft = () => { const n = new Date(); return 24 - (n.getHours() + n.getMinutes() / 60); };
  function status() {
    const g = load(), today = dayKey(), goalMin = goalMinutesFor(today, g), sec = todaySec(), goalSec = goalMin * 60;
    const streak = window.computeStreak(), done = sec >= goalSec, covered = jumpCovered(today, g);
    let due = 0; try { due = globalStats().due; } catch (e) { /* ignore */ }
    return { g, goalMin, sec, goalSec, pct: Math.min(100, Math.round(sec / goalSec * 100)), done, remainMin: Math.max(1, Math.ceil((goalSec - sec) / 60)), doneMin: Math.floor(sec / 60), streak, due, covered, atRisk: !done && streak > 0 && !covered };
  }

  // ───────────── Carte « objectif du jour » (accueil) ─────────────
  function ring(pct, label, done) {
    const r = 46, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return `<svg viewBox="0 0 110 110" class="bg-ringsvg" role="img" aria-label="${esc(label)}"><defs><linearGradient id="bgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${done ? '#22c55e' : '#f97316'}"/><stop offset="1" stop-color="${done ? '#16a34a' : '#ec4899'}"/></linearGradient></defs>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="10"/>
      <circle cx="55" cy="55" r="${r}" fill="none" stroke="url(#bgg)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 55 55)"/></svg>`;
  }
  function weekHTML() {
    const today = dayKey();
    return `<div class="bh-week" role="list" aria-label="7 derniers jours">${window.last7DaysActivity().map(d => `<button class="bh-day ${d.active ? 'met' : d.jump ? 'jump' : d.partial ? 'part' : ''} ${d.key === today ? 'now' : ''}" role="listitem" onclick="openDayDetail('${d.key}')" title="${new Date(d.key + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}${d.active ? ' — objectif atteint' : ''}" aria-label="${d.label} ${d.active ? 'objectif atteint' : d.partial ? 'révision partielle' : 'rien'}"><span>${d.active ? '✓' : d.jump ? '⏳' : d.label}</span></button>`).join('')}</div>`;
  }
  function cardInner() {
    const s = status(), st = s.streak;
    let gs = { mastered: 0, total: 0, due: 0 }; try { gs = globalStats(); } catch (e) { /* ignore */ }
    const msg = s.done ? `Objectif atteint, bravo ! Tu peux continuer pour prendre de l’avance.`
      : s.covered ? `⏳ Saut Temporel actif : ta série est protégée aujourd’hui. Repose-toi !`
      : s.sec === 0 ? `${s.goalMin} min aujourd’hui pour ${st > 0 ? 'garder ta série' : 'lancer ta série'}.`
      : `Plus que <strong>${s.remainMin} min</strong> pour valider ta journée.`;
    const reviewLabel = s.due > 0 ? `🌅 Réviser · ${s.due} carte${s.due > 1 ? 's' : ''}` : '📚 Réviser maintenant';
    const mpct = gs.total ? Math.round(gs.mastered / gs.total * 100) : 0;
    const ji = jumpInfo(s.g);
    const mood = s.covered ? 'sleep' : s.done ? 'party' : (s.atRisk && hoursLeft() < 3) ? 'angry' : (s.sec === 0 && (window.__bmMissDays || 0) >= 1 && !s.done) ? 'miss' : s.atRisk ? 'worry' : 'push';
    const jumpTxt = ji.active ? 'actif' : ji.req ? ji.chain + '/4 jours d’effort' : ji.planned ? 'prévu ' + new Date(ji.planned.from + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'demander';
    const jumpBar = `<button class="bg-jumpbar ${ji.req ? 'ready' : ''}" onclick="BacMasterGoal.openCalendar()"><span>📅 Série &amp; Saut Temporel</span>${ji.req ? `<span class="bg-jdots">${[0, 1, 2, 3].map(k => `<i class="bg-jdot ${k < ji.chain ? 'on' : ''}"></i>`).join('')}</span>` : ''}<span>${jumpTxt}</span></button>`;
    return `${window.BacMasterMascot ? BacMasterMascot.cardHTML(mood) : ''}<div class="bh-top">
        <div class="bg-ring">${ring(s.pct, `Objectif du jour : ${s.doneMin} minutes sur ${s.goalMin}`, s.done)}<div class="bg-ringtxt"><b>${s.doneMin}</b><span>/ ${s.goalMin} min</span></div></div>
        <div class="bg-body">
          <div class="bg-title">${st > 0 ? '🔥' : '🎯'} ${st > 0 ? `Série de ${st} jour${st > 1 ? 's' : ''}` : 'Objectif du jour'}${s.done ? ' <span class="bg-ok">✓ validé</span>' : s.atRisk ? ' <span class="bg-risk">à sauver</span>' : ''}</div>
          <div class="bg-sub">${msg}</div>
          ${weekHTML()}
          ${jumpBar}
        </div>
      </div>
      <div class="bh-kpis">
        <div class="bh-kpi k1"><b>${st}</b><span>jour${st > 1 ? 's' : ''} d’affilée</span></div>
        <div class="bh-kpi k2"><b>${gs.mastered}<small>/${gs.total}</small></b><span>cartes maîtrisées</span><i style="width:${mpct}%"></i></div>
        <div class="bh-kpi k3"><b>${gs.due}</b><span>à revoir aujourd’hui</span></div>
      </div>
      <div class="bg-actions">
        <button class="bg-btn pri" onclick="BacMasterGoal.start()">${reviewLabel}</button>
        <button class="bg-btn stats" onclick="openStats()">📊 Mes statistiques</button>
        <button class="bg-btn soft" onclick="BacMasterGoal.openSettings()">⚙️ Paramètres</button>
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
    if (window.BacMasterMascot) BacMasterMascot.say('party', null, { force: true });
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
      : `${s.goalMin} min suffisent aujourd’hui. Ouvre BacMaster et lance-toi !${dueTxt}`;
    return { title, body, tag: 'bm-goal', mood: n > 0 && (last || s.atRisk) ? 'worry' : 'push' };
  }
  function bonusMessage(s) {
    const n = s.streak;
    return { title: '🎉 Objectif atteint, bravo !', body: `${s.doneMin} min aujourd’hui${n > 0 ? ` et ${n} jour${n > 1 ? 's' : ''} de série` : ''}. Encore 10 minutes pour prendre de l’avance ?`, tag: 'bm-goal', mood: 'party' };
  }
  // Mascotte pressée / fâchée : moins de 3 h pour sauver la série
  function hurry() {
    if (!window.BacMasterMascot || document.visibilityState !== 'visible') return;
    const s = status(), left = hoursLeft();
    if (!s.atRisk || left >= 3) return;
    const k = dayKey() + ':' + Math.floor(left * 2); if (localStorage.getItem('bacmaster_hurry') === k) return;
    localStorage.setItem('bacmaster_hurry', k);
    BacMasterMascot.say('angry', BacMasterMascot.line('hurry', { h: left < 1 ? '1' : Math.ceil(left) }), { force: true, ms: 8000 });
  }
  async function notify(msg) {
    const mood = ['push', 'worry', 'party'].includes(msg.mood) ? msg.mood : 'push';
    const opts = { body: msg.body, icon: './mascot-' + mood + '.png', image: './banner-' + mood + '.png', badge: './badge.png', tag: msg.tag || 'bm-goal', renotify: true, data: { url: './?revise=1' }, vibrate: [80, 40, 80], actions: [{ action: 'revise', title: '📚 Réviser' }, { action: 'later', title: 'Plus tard' }] };
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
    celebrate(); checkJumpEarn(); hurry(); healPush();
    const g = load(); if (!g.remind || !g.slots.length || jumpCovered(dayKey(), g)) return;
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
  // Abonne cet appareil (si besoin) et l'enregistre côté serveur
  async function registerDevice() {
    const a = api(); const reg = await navigator.serviceWorker.ready;
    const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(cfg().vapidPublicKey) });
    const j = sub.toJSON();
    const { error } = await a.state.client.from('bacmaster_push_subs').upsert({ endpoint: j.endpoint, user_id: a.state.user.id, p256dh: j.keys.p256dh, auth: j.keys.auth, tz: Intl.DateTimeFormat().resolvedOptions().timeZone, ua: navigator.userAgent.slice(0, 160) }, { onConflict: 'endpoint' });
    if (error) throw error;
    localStorage.setItem('bacmaster_push_on', '1');
  }
  // Inscription de l'appareil aux rappels serveur (l'autorisation des notifications est un réglage séparé)
  async function pushEnable(btn) {
    const a = api(); if (!a || !a.state.user) return toast('Connecte-toi d’abord à ton compte.', 'warn');
    if (!canNotify() || !('serviceWorker' in navigator) || !('PushManager' in window)) return toast('Ce navigateur ne gère pas les rappels.', 'warn');
    if (!cfg().vapidPublicKey) return toast('Les rappels ne sont pas disponibles pour le moment.', 'warn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Activation…'; }
    try {
      if (Notification.permission !== 'granted') { toast('Autorise d’abord les notifications.', 'warn'); renderSettings(); return; }
      await registerDevice(); await syncServer(true); toast('🔔 Rappels activés, même application fermée.');
    } catch (e) { toast('Activation impossible : ' + (e.message || e), 'warn'); }
    renderSettings();
  }
  // Répare en silence : si l'appareil a disparu du serveur (abonnement expiré ou supprimé), on le réenregistre
  async function healPush() {
    try {
      const a = api(); if (!a || !a.state.user || !canNotify() || Notification.permission !== 'granted' || !('PushManager' in window) || !cfg().vapidPublicKey) return;
      if (localStorage.getItem('bacmaster_push_on') !== '1') { const r = await navigator.serviceWorker.ready; if (!(await r.pushManager.getSubscription())) return; }
      const last = +localStorage.getItem('bacmaster_push_heal') || 0; if (Date.now() - last < 6 * 3600e3) return;
      await registerDevice(); localStorage.setItem('bacmaster_push_heal', String(Date.now()));
    } catch (e) { /* on réessaiera plus tard */ }
  }
  // Test réel depuis le serveur : envoie une notification à tes appareils
  async function testPush(btn) {
    const a = api(); if (!a || !a.state.user) return toast('Connecte-toi d’abord.', 'warn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Envoi…'; }
    try {
      await registerDevice();
      const { data, error } = await a.state.client.functions.invoke('send-reminders', { body: { action: 'test' } });
      if (error) throw error;
      toast(data && data.ok ? '🧪 Notification envoyée : regarde ton appareil.' : ((data && data.message) || 'Le serveur n’a rien pu envoyer.'), data && data.ok ? undefined : 'warn');
    } catch (e) {
      // on lit la vraie réponse du serveur (supabase-js ne montre sinon qu'un message générique)
      let msg = e && e.message ? e.message : String(e);
      try { if (e && e.context && e.context.json) { const j = await e.context.clone().json(); msg = (j.message || j.error || JSON.stringify(j)) + (j.step ? ' [étape : ' + j.step + ']' : '') + (e.context.status ? ' (code ' + e.context.status + ')' : ''); } } catch (x) { /* ignore */ }
      if (e && (e.name === 'FunctionsFetchError' || e.name === 'FunctionsRelayError')) msg = 'fonction injoignable ou introuvable (' + msg + ')';
      toast('Test impossible : ' + msg, 'warn');
    }
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
    const s = status(), g = s.g, cl = a.state.client;
    const row = { user_id: a.state.user.id, tz: Intl.DateTimeFormat().resolvedOptions().timeZone, minutes: s.goalMin, slots: g.slots, remind: g.remind, bonus: g.bonus, day: dayKey(), seconds: Math.round(s.sec), streak: s.streak };
    try {
      // colonnes facultatives (supabase_v43.sql) : objectif semaine / week-end et jours de Saut Temporel
      const r = await cl.from('bacmaster_reminders').upsert({ ...row, minutes_wd: g.minutes, minutes_we: g.minutesWE || null, jump_days: coveredDays(g) }, { onConflict: 'user_id' });
      if (r.error) await cl.from('bacmaster_reminders').upsert(row, { onConflict: 'user_id' });
    } catch (e) { /* ignore */ }
  }

  // Mise à jour forcée : vide les caches du Service Worker, relance sa vérification, recharge la page.
  // Le localStorage n'est JAMAIS touché : la session Supabase et la progression restent intactes.
  async function forceUpdate(btn) {
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Mise à jour…'; }
    try { if (window.BacMasterSync && BacMasterSync.flushStats) BacMasterSync.flushStats(); } catch (e) { /* ignore */ }
    try { if ('caches' in window) { const keys = await caches.keys(); await Promise.all(keys.map(k => caches.delete(k))); } } catch (e) { /* ignore */ }
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.update().catch(() => null)));
        await new Promise(r => setTimeout(r, 1200));   // laisse le nouveau Service Worker s'installer
      }
    } catch (e) { /* ignore */ }
    window.location.reload();
  }

  // ───────────── Saut Temporel (demande depuis le calendrier) ─────────────
  // Tu choisis un jour futur (au moins 4 jours devant toi) : le défi démarre aujourd'hui.
  // Objectif du jour + 5 % (minimum +5 min) pendant 4 jours d'affilée avant ce jour-là → le Saut est validé
  // (24 h ou 48 h). Un seul par semaine, une seule demande à la fois, non cumulable.
  const JUMP_DAYS = 4, JUMP_MIN_AHEAD = 4, JUMP_MAX_AHEAD = 30;
  function addDays(day, n) { const d = new Date(day + 'T12:00:00'); d.setDate(d.getDate() + n); return dayKey(d); }
  function diffDays(a, b) { return Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000); }
  function effortTarget(day, g) { const m = goalMinutesFor(day, g); return m + Math.max(5, Math.ceil(m * 0.05)); }
  function effortMet(day, g) { return dayTimeTotal(day) >= effortTarget(day, g) * 60; }
  function jumpCovered(day, g) { g = g || load(); return (g.jumps.used || []).some(u => { const d = diffDays(u.from, day); return d >= 0 && d < u.days; }); }
  function coveredDays(g) { const out = []; (g.jumps.used || []).forEach(u => { for (let i = 0; i < u.days; i++) out.push(addDays(u.from, i)); }); return out; }
  // Progression de la demande en cours : jours d'effort consécutifs depuis le début du défi
  function reqProgress(req, g) {
    const today = dayKey(); let n = 0, failed = false;
    for (let d = req.start; diffDays(d, today) >= 0 && n < JUMP_DAYS; d = addDays(d, 1)) {
      if (effortMet(d, g)) n++; else if (d !== today) { failed = true; break; } else break;   // aujourd'hui peut encore être en cours
    }
    return { n, failed };
  }
  function jumpInfo(g) {
    g = g || load(); const today = dayKey(), J = g.jumps;
    const active = (J.used || []).find(u => { const d = diffDays(u.from, today); return d >= 0 && d < u.days; }) || null;
    const planned = (J.used || []).filter(u => diffDays(today, u.from) > 0).sort((a, b) => a.from < b.from ? -1 : 1)[0] || null;
    const req = J.req || null, p = req ? reqProgress(req, g) : { n: 0, failed: false };
    return { active, planned, req, chain: p.n, target: effortTarget(today, g), extra: effortTarget(today, g) - goalMinutesFor(today, g) };
  }
  function persist(g) {   // enregistre sans modifier l'objectif du jour
    g.updatedAt = Date.now(); localStorage.setItem(KEY, JSON.stringify(g)); bmStatsChanged(); refreshCard(); scheduleServerSync(true);
  }
  // Peut-on demander un Saut Temporel pour ce jour ?
  function canRequest(day, g) {
    g = g || load(); const today = dayKey(), ahead = diffDays(today, day);
    if (g.jumps.req) return { ok: false, why: g.jumps.req.from === day ? 'pending' : 'Tu as déjà une demande en cours pour le ' + fmtDay(g.jumps.req.from) + '.' };
    if (ahead < JUMP_MIN_AHEAD) return { ok: false, why: `Il faut ${JUMP_DAYS} jours d’effort avant le jour du saut : choisis à partir du ${fmtDay(addDays(today, JUMP_MIN_AHEAD))}.` };
    if (ahead > JUMP_MAX_AHEAD) return { ok: false, why: 'Trop loin : choisis un jour dans les 30 prochains jours.' };
    if ((g.jumps.used || []).some(u => Math.abs(diffDays(u.from, day)) < 7)) return { ok: false, why: 'Un seul Saut Temporel par semaine : il y en a déjà un autour de cette date.' };
    return { ok: true };
  }
  function requestJump(day, days) {
    const g = load(), c = canRequest(day, g); if (!c.ok) return toast(c.why, 'warn');
    g.jumps.req = { from: day, days: days === 2 ? 2 : 1, start: dayKey() }; persist(g);
    toast(`⏳ Défi lancé : ${JUMP_DAYS} jours d’effort pour valider ton Saut Temporel du ${fmtDay(day)}.`); checkJumpEarn(); renderCalendar();
  }
  function cancelRequest() { const g = load(); g.jumps.req = null; persist(g); toast('Demande annulée.'); renderCalendar(); }
  function cancelPlanned(from) { const g = load(); g.jumps.used = (g.jumps.used || []).filter(u => !(u.from === from && diffDays(dayKey(), u.from) > 0)); persist(g); toast('Saut Temporel annulé.'); renderCalendar(); }
  function checkJumpEarn() {
    const g = load(), r = g.jumps.req; if (!r) return;
    const p = reqProgress(r, g), today = dayKey();
    if (p.n >= JUMP_DAYS && diffDays(today, r.from) > 0) {
      g.jumps.used = (g.jumps.used || []).concat([{ from: r.from, days: r.days }]).slice(-12); g.jumps.req = null; persist(g);
      toast(`⏳ Saut Temporel validé pour le ${fmtDay(r.from)} (${r.days * 24} h) !`);
      if (window.BacMasterMascot) BacMasterMascot.say('party', 'Saut Temporel validé ! Ta série est protégée ce jour-là.', { force: true, ms: 8000 });
    } else if (p.failed || diffDays(today, r.from) <= 0) {
      g.jumps.req = null; persist(g); toast('Défi du Saut Temporel manqué : tu peux refaire une demande.', 'warn');
      if (window.BacMasterMascot) BacMasterMascot.say('worry', 'On n’a pas réussi le défi cette fois… on retente ?', { force: true });
    } else return;
    if ($('bm-cal-modal') && !$('bm-cal-modal').hidden) renderCalendar();
  }
  const fmtDay = k => new Date(k + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  function jumpSummary(g) {
    const i = jumpInfo(g);
    if (i.active) return `<div class="bg-note ok">😴 Saut Temporel actif (${i.active.days * 24} h) : ta série est protégée et les rappels sont coupés.</div>`;
    if (i.req) return `<div class="bg-jgauge">${Array.from({ length: JUMP_DAYS }, (_, k) => `<i class="bg-jdot ${k < i.chain ? 'on' : ''}"></i>`).join('')}<span>${i.chain}/${JUMP_DAYS}</span></div><div class="bg-note">Défi en cours pour le <b>${esc(fmtDay(i.req.from))}</b> : plus que <b>${JUMP_DAYS - i.chain} jour${JUMP_DAYS - i.chain > 1 ? 's' : ''}</b> d’effort.</div>`;
    if (i.planned) return `<div class="bg-note ok">⏳ Prévu : ${esc(fmtDay(i.planned.from))} (${i.planned.days * 24} h).</div>`;
    return `<p class="bg-hint" style="margin-top:0">Ouvre le calendrier, touche un jour à venir et demande un Saut Temporel.</p>`;
  }

  // ───────────── Calendrier « série » (comme Duolingo) ─────────────
  let calMonth = null, calSel = null;
  const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function calCell(day, g, today) {
    const diff = diffDays(today, day), met = metGoal(day, g), cov = jumpCovered(day, g);
    const req = g.jumps.req && g.jumps.req.from === day;
    let cls = 'cal-d', mark = '';
    if (met) { cls += ' met'; mark = '🔥'; } else if (cov) { cls += ' jump'; mark = '⏳'; } else if (req) { cls += ' reqd'; mark = '⏳'; } else if (diff < 0 && dayTimeTotal(day) > 0) cls += ' part';
    if (diff === 0) cls += ' now'; if (diff > 0) cls += ' fut'; if (calSel === day) cls += ' sel';
    return `<button class="${cls}" data-cal="${day}" aria-label="${esc(fmtDay(day))}"><span class="cal-n">${+day.slice(8)}</span><span class="cal-m">${mark}</span></button>`;
  }
  function calDetail(g, today) {
    const d = calSel; if (!d) return `<p class="bg-hint">Touche un jour pour voir le détail. Les jours à venir te permettent de demander un Saut Temporel.</p>`;
    const diff = diffDays(today, d), goal = goalMinutesFor(d, g), mins = Math.floor(dayTimeTotal(d) / 60), title = `<b>${esc(fmtDay(d))}</b>`;
    if (diff <= 0) return `<div class="cal-det">${title}<div class="bg-note ${metGoal(d, g) ? 'ok' : ''}">${jumpCovered(d, g) && !metGoal(d, g) ? '⏳ Jour protégé par un Saut Temporel.' : `${mins} min sur ${goal} min ${metGoal(d, g) ? '✅' : diff === 0 ? '— en cours' : ''}`}</div></div>`;
    const used = (g.jumps.used || []).find(u => { const k = diffDays(u.from, d); return k >= 0 && k < u.days; });
    if (used) return `<div class="cal-det">${title}<div class="bg-note ok">⏳ Saut Temporel prévu (${used.days * 24} h dès le ${esc(fmtDay(used.from))}).</div>${diffDays(today, used.from) > 0 ? `<button class="bg-btn danger" data-cancelplanned="${used.from}">Annuler ce saut</button>` : ''}</div>`;
    const c = canRequest(d, g);
    if (!c.ok && c.why === 'pending') {
      const i = jumpInfo(g), left = JUMP_DAYS - i.chain;
      return `<div class="cal-det">${title}<div class="bg-jgauge">${Array.from({ length: JUMP_DAYS }, (_, k) => `<i class="bg-jdot ${k < i.chain ? 'on' : ''}"></i>`).join('')}<span>${i.chain}/${JUMP_DAYS}</span></div><div class="bg-note">Plus que <b>${left} jour${left > 1 ? 's' : ''}</b> d’effort pour valider ton Saut Temporel ! Chaque jour : <b>${i.target} min</b> (objectif + ${i.extra} min).</div><button class="bg-btn danger" id="cal-cancelreq">Annuler la demande</button></div>`;
    }
    if (!c.ok) return `<div class="cal-det">${title}<p class="bg-hint">Objectif ce jour-là : ${goal} min.</p><div class="bg-note">${esc(c.why)}</div></div>`;
    return `<div class="cal-det">${title}<p class="bg-hint">Objectif ce jour-là : ${goal} min.</p>
      <div class="bg-lbl">Durée du Saut Temporel</div><div class="bg-chips"><button class="bg-chip wide ${calDays === 1 ? 'on' : ''}" data-cdays="1">24 h</button><button class="bg-chip wide ${calDays === 2 ? 'on' : ''}" data-cdays="2">48 h</button></div>
      <button class="bg-btn pri full" id="cal-request">⏳ Demander un Saut Temporel</button>
      <p class="bg-hint">Défi : ${JUMP_DAYS} jours d’affilée à ton objectif + ${Math.max(5, Math.ceil(goalMinutesFor(today, g) * 0.05))} min (soit ${effortTarget(today, g)} min aujourd’hui) avant ce jour-là. Un seul par semaine.</p></div>`;
  }
  let calDays = 1;
  function renderCalendar() {
    const m = $('bm-cal-modal'); if (!m) return;
    const g = load(), today = dayKey(), st = status();
    if (!calMonth) calMonth = today.slice(0, 7);
    const [y, mo] = calMonth.split('-').map(Number), first = new Date(y, mo - 1, 1), nd = new Date(y, mo, 0).getDate(), lead = (first.getDay() + 6) % 7;
    let cells = '<i></i>'.repeat(lead); for (let k = 1; k <= nd; k++) cells += calCell(`${y}-${String(mo).padStart(2, '0')}-${String(k).padStart(2, '0')}`, g, today);
    const monthShift = (calMonth > addDays(today, -400).slice(0, 7)), ji = jumpInfo(g);
    m.querySelector('.bg-sheet-body').innerHTML = `
      <div class="cal-hero"><div class="cal-flame">🔥</div><div><b>${st.streak} jour${st.streak > 1 ? 's' : ''} de série</b><small>${st.done ? 'Objectif du jour atteint ✅' : `Aujourd’hui : ${st.doneMin}/${st.goalMin} min`}</small></div></div>
      ${ji.req ? `<div class="cal-hero2">${jumpSummary(g)}</div>` : ''}
      <div class="cal-nav"><button class="bg-x" id="cal-prev" aria-label="Mois précédent" ${monthShift ? '' : 'disabled'}>‹</button><b>${MONTHS[mo - 1]} ${y}</b><button class="bg-x" id="cal-next" aria-label="Mois suivant" ${calMonth < addDays(today, 60).slice(0, 7) ? '' : 'disabled'}>›</button></div>
      <div class="cal-grid"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>${cells}</div>
      <div class="cal-legend"><span>🔥 objectif atteint</span><span>⏳ Saut Temporel</span></div>
      ${calDetail(g, today)}
      <section class="bg-sec"><h3>🎯 Temps de révision par jour</h3>
        <div class="bg-lbl">En semaine (lun → ven)</div><div class="bg-chips">${chipRow('data-min', g.minutes)}</div>
        <div class="bg-lbl">Week-end (sam → dim)</div><div class="bg-chips">${chipRow('data-we', g.minutesWE || 0, true)}</div>
        <div class="bg-row"><span><b>Me rappeler de réviser</b><small>Utilise ces objectifs</small></span>${sw('cal-remind', g.remind)}</div>
        <button class="bg-btn full" id="cal-notif">🔔 Régler les heures et les notifications</button>
      </section>`;
    m.querySelectorAll('[data-cal]').forEach(b => b.onclick = () => { calSel = b.dataset.cal; renderCalendar(); });
    m.querySelectorAll('[data-min]').forEach(b => b.onclick = () => { const x = load(); x.minutes = +b.dataset.min; save(x); renderCalendar(); });
    m.querySelectorAll('[data-we]').forEach(b => b.onclick = () => { const x = load(); x.minutesWE = +b.dataset.we; save(x); renderCalendar(); });
    m.querySelectorAll('[data-cdays]').forEach(b => b.onclick = () => { calDays = +b.dataset.cdays; renderCalendar(); });
    m.querySelectorAll('[data-cancelplanned]').forEach(b => b.onclick = () => cancelPlanned(b.dataset.cancelplanned));
    const rq = $('cal-request'); if (rq) rq.onclick = () => requestJump(calSel, calDays);
    const cr = $('cal-cancelreq'); if (cr) cr.onclick = cancelRequest;
    const rm = $('cal-remind'); if (rm) rm.onchange = () => { const x = load(); x.remind = rm.checked; save(x); };
    const cn = $('cal-notif'); if (cn) cn.onclick = () => { closeCalendar(); openSettings('notif'); };
    const shift = k => { const [yy, mm] = calMonth.split('-').map(Number), d = new Date(yy, mm - 1 + k, 1); calMonth = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); renderCalendar(); };
    const pv = $('cal-prev'); if (pv) pv.onclick = () => shift(-1); const nx = $('cal-next'); if (nx) nx.onclick = () => shift(1);
  }
  function openCalendar(day) {
    let m = $('bm-cal-modal');
    if (!m) {
      m = document.createElement('div'); m.id = 'bm-cal-modal'; m.className = 'bg-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', 'Ma série');
      m.innerHTML = `<div class="bg-sheet"><div class="bg-sheet-head"><b>🔥 Ma série &amp; Saut Temporel</b><button class="bg-close" aria-label="Fermer">✕</button></div><div class="bg-sheet-body"></div></div>`;
      m.addEventListener('click', e => { if (e.target === m || e.target.closest('.bg-close')) closeCalendar(); });
      document.body.appendChild(m);
    }
    calMonth = (day || dayKey()).slice(0, 7); calSel = day || dayKey(); m.hidden = false; renderCalendar();
    try { if (typeof closeSidebar === 'function') closeSidebar(); } catch (e) { /* ignore */ }
  }
  function closeCalendar() { const m = $('bm-cal-modal'); if (m) m.hidden = true; refreshCard(); }

  // ───────────── Paramètres ─────────────
  const CHIPS = [10, 15, 20, 30, 45, 60, 90];
  const chipRow = (attr, cur, same) => CHIPS.map(v => `<button class="bg-chip ${cur === v ? 'on' : ''}" ${attr}="${v}">${v}<small>min</small></button>`).join('') + (same ? `<button class="bg-chip ${!cur ? 'on' : ''}" ${attr}="0">=<small>semaine</small></button>` : '');
  const sw = (id, on) => `<label class="bg-switch"><input type="checkbox" id="${id}" ${on ? 'checked' : ''}><i></i></label>`;
  let pendingScroll = null;
  function renderSettings() {
    let m = $('bm-goal-modal'); if (!m) return;
    const g = load();
    const perm = !canNotify() ? 'unsupported' : Notification.permission;
    return pushState().then(ps => {
      m = $('bm-goal-modal'); if (!m) return;
      const slots = g.slots.map((s, i) => `<div class="bg-slot"><input type="time" value="${s}" data-slot="${i}" aria-label="Heure du rappel ${i + 1}"><button class="bg-x" data-del="${i}" aria-label="Supprimer ce rappel">✕</button></div>`).join('');
      const iosHint = iOS && !standalone() ? `<div class="bg-note warn">📱 Sur iPhone : ouvre le menu Partager de Safari puis « Sur l’écran d’accueil », et lance BacMaster depuis cette icône. Les notifications ne marchent que là.</div>` : '';
      // 1) autorisation globale
      const permCtl = perm === 'granted' ? `<span class="bg-pill ok">✅ Autorisées</span>` : perm === 'denied' ? `<span class="bg-pill bad">🚫 Bloquées</span>` : perm === 'unsupported' ? `<span class="bg-pill bad">Non géré</span>` : `<button class="bg-btn pri" id="bg-allow">Autoriser</button>`;
      const permHint = perm === 'denied' ? `<p class="bg-hint">Autorise-les dans les réglages du navigateur (icône 🔒 à côté de l’adresse) puis reviens ici.</p>` : '';
      // 2) rappels application fermée (envoi par le serveur)
      let pushCtl = '', pushHint = '';
      if (!ps.supported || !ps.configured) pushCtl = `<span class="bg-pill">Indisponible</span>`;
      else if (!ps.signedIn) { pushCtl = `<span class="bg-pill">Compte requis</span>`; pushHint = `<p class="bg-hint">Connecte-toi à ton compte pour recevoir les rappels application fermée.</p>`; }
      else if (ps.subscribed && perm === 'granted') pushCtl = `<span class="bg-pill ok">✅ Activés</span><button class="bg-btn" id="bg-pushtest">🧪 Tester</button><button class="bg-btn" id="bg-pushoff">Désactiver</button>`;
      else if (perm !== 'granted') { pushCtl = `<button class="bg-btn" disabled>Activer</button>`; pushHint = `<p class="bg-hint">Autorise d’abord les notifications ci-dessus.</p>`; }
      else pushCtl = `<button class="bg-btn pri" id="bg-pushon">Activer</button>`;
      const logged = ps.signedIn;
      m.querySelector('.bg-sheet-body').innerHTML = `
        <section class="bg-sec" id="bg-sec-goal">
          <h3>🎯 Objectif quotidien</h3>
          <div class="bg-lbl">En semaine (lun → ven)</div><div class="bg-chips">${chipRow('data-min', g.minutes)}</div>
          <div class="bg-lbl">Week-end (sam → dim)</div><div class="bg-chips">${chipRow('data-we', g.minutesWE || 0, true)}</div>
          <label class="bg-custom">Autre durée en semaine <input type="number" min="5" max="300" step="5" value="${g.minutes}" id="bg-custom"> min</label>
          <p class="bg-hint">Ta journée est validée (et ta série continue) quand tu atteins l’objectif du jour.</p>
        </section>
        <section class="bg-sec" id="bg-sec-jump"><h3>⏳ Saut Temporel</h3>${jumpSummary(g)}<button class="bg-btn pri full" id="bg-opencal">📅 Ouvrir mon calendrier</button></section>
        <section class="bg-sec" id="bg-sec-notif">
          <h3>🔔 Notifications</h3>
          ${iosHint}
          <div class="bg-row"><span><b>Autorisation</b><small>Sur cet appareil</small></span><span class="bg-ctl">${permCtl}</span></div>${permHint}
          <div class="bg-row"><span><b>Rappels application fermée</b><small>Envoyés par le serveur</small></span><span class="bg-ctl">${pushCtl}</span></div>${pushHint}
          <div class="bg-row"><span><b>Me rappeler de réviser</b><small>Préférence de rappel</small></span>${sw('bg-remind', g.remind)}</div>
          ${g.remind ? `<div class="bg-slots">${slots}${g.slots.length < 4 ? '<button class="bg-add" id="bg-addslot">＋ Ajouter une heure</button>' : ''}</div>
          <p class="bg-hint">Tant que ton objectif n’est pas atteint, tu reçois un rappel à ces heures.</p>
          <div class="bg-row"><span><b>M’encourager quand c’est fait</b><small>Message bonus du soir</small></span>${sw('bg-bonus', g.bonus)}</div>` : ''}
        </section>
        <section class="bg-sec" id="bg-sec-mascot">
          <h3>🐶 Mascotte</h3>
          <div class="bg-row"><span><b>Afficher la mascotte</b><small>Bulles, expressions et carte d’accueil</small></span>${sw('bg-mascot', mascotOn())}</div>
        </section>
        <section class="bg-sec" id="bg-sec-app">
          <h3>📱 Application</h3>
          <div class="bg-row"><span><b>Mettre à jour</b><small>Récupère les derniers fichiers, sans te déconnecter</small></span><button class="bg-btn" id="bg-update">🔄 Mettre à jour</button></div>
          ${logged ? `<div class="bg-row"><span><b>Compte</b><small>Se déconnecter de cet appareil</small></span><button class="bg-btn danger" id="bg-logout">🚪 Déconnexion</button></div>` : ''}
        </section>`;
      bind(m);
      if (pendingScroll) { const t = $('bg-sec-' + pendingScroll); pendingScroll = null; if (t) t.scrollIntoView({ block: 'start' }); }
    });
  }
  function mascotOn() { return !window.BacMasterMascot || BacMasterMascot.enabled(); }
  function bind(m) {
    m.querySelectorAll('[data-min]').forEach(b => b.onclick = () => { const g = load(); g.minutes = +b.dataset.min; save(g); renderSettings(); });
    m.querySelectorAll('[data-we]').forEach(b => b.onclick = () => { const g = load(); g.minutesWE = +b.dataset.we; save(g); renderSettings(); });
    const c = $('bg-custom'); if (c) c.onchange = () => { const g = load(); g.minutes = Math.min(300, Math.max(5, +c.value || 20)); save(g); renderSettings(); };
    const oc = $('bg-opencal'); if (oc) oc.onclick = () => { closeSettings(); openCalendar(); };
    const al = $('bg-allow'); if (al) al.onclick = () => Notification.requestPermission().then(renderSettings);
    const on = $('bg-pushon'); if (on) on.onclick = () => pushEnable(on);
    const off = $('bg-pushoff'); if (off) off.onclick = pushDisable;
    const pt = $('bg-pushtest'); if (pt) pt.onclick = () => testPush(pt);
    const r = $('bg-remind'); if (r) r.onchange = () => { const g = load(); g.remind = r.checked; save(g); renderSettings(); };
    const bo = $('bg-bonus'); if (bo) bo.onchange = () => { const g = load(); g.bonus = bo.checked; save(g); };
    m.querySelectorAll('[data-slot]').forEach(i => i.onchange = () => { const g = load(); if (/^\d\d:\d\d$/.test(i.value)) { g.slots[+i.dataset.slot] = i.value; g.slots = [...new Set(g.slots)].sort(); save(g); renderSettings(); } });
    m.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { const g = load(); g.slots.splice(+b.dataset.del, 1); save(g); renderSettings(); });
    const add = $('bg-addslot'); if (add) add.onclick = () => { const g = load(); const free = ['09:00', '12:30', '16:30', '19:00', '22:00'].find(t => !g.slots.includes(t)) || '17:00'; g.slots = [...g.slots, free].sort(); save(g); renderSettings(); };
    const mc = $('bg-mascot'); if (mc) mc.onchange = () => { if (window.BacMasterMascot) { BacMasterMascot.setEnabled(mc.checked); if (mc.checked) BacMasterMascot.say('push', 'Me revoilà ! On révise ?', { force: true }); } refreshCard(); };
    const up = $('bg-update'); if (up) up.onclick = () => forceUpdate(up);
    const lo = $('bg-logout'); if (lo) lo.onclick = () => {
      if (!lo.dataset.sure) { lo.dataset.sure = '1'; lo.textContent = 'Confirmer ?'; setTimeout(() => { if (lo.isConnected) { delete lo.dataset.sure; lo.textContent = '🚪 Déconnexion'; } }, 4000); return; }
      lo.disabled = true; Promise.resolve(window.BacMasterSync && BacMasterSync.signOut && BacMasterSync.signOut()).then(() => { closeSettings(); toast('Tu es déconnecté.'); });
    };
  }
  function openSettings(section) {
    let m = $('bm-goal-modal');
    if (!m) {
      m = document.createElement('div'); m.id = 'bm-goal-modal'; m.className = 'bg-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', 'Paramètres');
      m.innerHTML = `<div class="bg-sheet"><div class="bg-sheet-head"><b>⚙️ Paramètres</b><button class="bg-close" aria-label="Fermer">✕</button></div><div class="bg-sheet-body"></div></div>`;
      m.addEventListener('click', e => { if (e.target === m || e.target.closest('.bg-close')) closeSettings(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSettings(); });
      document.body.appendChild(m);
    }
    pendingScroll = typeof section === 'string' ? section : null;
    m.hidden = false; renderSettings();
    try { if (typeof closeSidebar === 'function') closeSidebar(); } catch (e) { /* ignore */ }
  }
  function closeSettings() { const m = $('bm-goal-modal'); if (m) m.hidden = true; refreshCard(); }
  window.askNotifPermission = openSettings;
  window.openSettings = openSettings;

  // ───────────── Démarrage ─────────────
  let progTimer = null;
  function onProgress() { clearTimeout(progTimer); progTimer = setTimeout(() => { refreshCard(); celebrate(); checkJumpEarn(); scheduleServerSync(false); }, 1500); }
  function boot() {
    recordToday();
    setInterval(() => { tick(); refreshCard(); }, 30000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { tick(); refreshCard(); } else syncServer(true); });
    window.addEventListener('focus', () => tick());
    setTimeout(tick, 4000);
    if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('message', e => { if (e.data && e.data.type === 'bm-revise') start(); });
    if (/[?&]revise=1/.test(location.search)) { history.replaceState(null, '', location.pathname); setTimeout(start, 600); }
  }
  window.BacMasterGoal = { start, openSettings, onProgress, status, load, bestStreak, tick, buildMessage, bonusMessage, notify, metGoal, goalMinutesFor, pushState, forceUpdate, jumpInfo, jumpCovered, hoursLeft, openCalendar, requestJump };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
