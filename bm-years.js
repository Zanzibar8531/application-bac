/* ============================================================
   BacMaster — bm-years.js
   Années scolaires : chaque année garde ses cours, ses cartes et sa progression.
   - Les 8 matières de classe sont rangées par année ; la « Culture perso » traverse les années.
   - À l'ouverture d'une nouvelle année, les matières de classe de l'année finie sont archivées
     (sur cet appareil) puis l'espace repart vide. Les archives restent consultables à tout moment.
   - Chargé AVANT app-core.js : l'archivage se fait au démarrage, avant que l'appli lise ses données.
   ============================================================ */
(function () {
  'use strict';
  var CLASS = ['Français', 'Maths', 'Histoire-Géo', 'Anglais', 'Espagnol', 'Physique-Chimie', 'Ingénierie & Dév. Durable', 'Innovation Techno.'];
  var DEFAULT = '2026/2027';                       // année des cours déjà synchronisés (clés du serveur sans préfixe)
  var K = { live: 'bm_year_live', view: 'bm_year_view', pending: 'bm_year_pending', list: 'bm_year_list', arch: 'bm_arch_', prompt: 'bm_year_prompt_day' };

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function startOf(y) { var m = /^(\d{4})\/(\d{4})$/.exec(y || ''); return m ? +m[1] : null; }
  function nextOf(y) { var s = startOf(y); return (s + 1) + '/' + (s + 2); }
  function getList() { try { var l = JSON.parse(get(K.list) || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; } }
  function isClass(s) { return CLASS.indexOf(s) >= 0; }

  // ── Archivage (au démarrage, avant la lecture des données par l'appli) ──
  function rollover(live, newYear) {
    var raw = get('bacmaster_db'), full = {};
    try { full = raw ? JSON.parse(raw) : {}; } catch (e) { throw new Error('données illisibles'); }
    var arch = {};
    CLASS.forEach(function (s) { if (full[s] && Object.keys(full[s]).length) arch[s] = full[s]; });
    var json = JSON.stringify(arch);
    if (!set(K.arch + live, json) || get(K.arch + live) !== json) { del(K.arch + live); throw new Error('archive non écrite (place insuffisante)'); }
    CLASS.forEach(function (s) { full[s] = {}; });
    if (!set('bacmaster_db', JSON.stringify(full))) { del(K.arch + live); throw new Error('espace de la nouvelle année non écrit'); }
    var list = getList(); if (list.indexOf(live) < 0) list.push(live);
    set(K.list, JSON.stringify(list));
    set(K.live, newYear); del(K.view);
  }

  var live = get(K.live) || DEFAULT;
  if (!get(K.live)) set(K.live, live);
  var pending = get(K.pending);
  if (pending) {
    del(K.pending);
    try { if (pending !== live && startOf(pending)) { rollover(live, pending); live = pending; } }
    catch (e) { console.warn('[BacMaster] Changement d’année annulé :', e && e.message); window.BM_YEAR_ERROR = (e && e.message) || 'erreur'; }
  }
  var view = get(K.view), archive = !!(view && view !== live && get(K.arch + view) !== null);
  if (view && !archive) del(K.view);
  if (archive) window.BM_ARCHIVE_MODE = view;

  function years() {
    var l = getList().filter(function (y) { return y !== live && get(K.arch + y) !== null; });
    l.sort(function (a, b) { return startOf(b) - startOf(a); });
    return [live].concat(l);
  }
  function today() { return new Date(); }
  function canOpenNext() { var s = startOf(live); return !!s && today() >= new Date(s + 1, 5, 1); }       // dès le 1er juin
  function shouldPrompt() { var s = startOf(live); return !!s && today() >= new Date(s + 1, 6, 1); }          // dès le 1er juillet

  window.BMYears = {
    CLASS: CLASS, DEFAULT: DEFAULT,
    get live() { return live; },
    get viewing() { return archive ? view : live; },
    get archive() { return archive; },
    isClass: isClass,
    years: years, nextYear: function () { return nextOf(live); },
    // Préfixe de clé serveur : vide pour l'année d'origine et pour la Culture perso (qui traverse les années)
    keyPrefix: function (subject) { return (isClass(subject) && live !== DEFAULT) ? 'y' + live.replace('/', '-') + '::' : ''; },
    // Une ligne du serveur appartient-elle à l'année en cours de cet appareil ?
    rowInLiveYear: function (row) {
      var m = /^y(\d{4}-\d{4})::/.exec((row && row.id) || '');
      var ry = m ? m[1].replace('-', '/') : (isClass(row && row.subject) ? DEFAULT : null);
      return ry === null || ry === live;
    },
    view: function (y) { if (y === live) del(K.view); else if (get(K.arch + y) !== null) set(K.view, y); location.reload(); },
    open: function () { startRollover(); }
  };

  // ── Interface ──
  function backup() {
    try {
      var blob = new Blob([get('bacmaster_db') || '{}'], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'bacmaster-sauvegarde-' + live.replace('/', '-') + '.json';
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    } catch (e) {}
  }
  function startRollover() {
    if (!archive && typeof window.save === 'function') { try { window.save(); } catch (e) {} }   // dernières modifications écrites avant l'archivage
    backup();
    set(K.pending, nextOf(live));
    setTimeout(function () { location.reload(); }, 900);
  }

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var css = document.createElement('style');
  css.textContent =
    '.bm-year-btn{all:unset;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;width:100%;cursor:pointer;color:inherit}' +
    '.bm-year-btn b{color:rgba(255,255,255,.6);font-weight:600}' +
    '#bm-years{position:fixed;inset:0;z-index:2000;display:flex;align-items:flex-end;justify-content:center}' +
    '#bm-years[hidden]{display:none}' +
    '.bm-years-bg{position:absolute;inset:0;background:rgba(14,21,37,.55)}' +
    '.bm-years-box{position:relative;width:100%;max-width:480px;max-height:88vh;overflow:auto;background:var(--card);color:var(--text);border-radius:var(--r) var(--r) 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom,0px));box-shadow:var(--sh2)}' +
    '.bm-years-box h3{margin:0 0 4px;font-size:1.1rem}' +
    '.bm-years-sub{margin:0 0 14px;color:var(--muted);font-size:.85rem}' +
    '.bm-years-list{display:flex;flex-direction:column;gap:8px;margin-bottom:14px}' +
    '.bm-years-item{all:unset;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border:1px solid var(--border);border-radius:var(--rs);cursor:pointer;font-weight:600}' +
    '.bm-years-item.on{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent) inset}' +
    '.bm-years-tag{font-size:.72rem;font-weight:600;color:var(--muted)}' +
    '.bm-years-next{border-top:1px solid var(--border);padding-top:12px;font-size:.85rem;color:var(--muted)}' +
    '.bm-years-next p{margin:0 0 10px}' +
    '.bm-years-act{all:unset;box-sizing:border-box;display:block;width:100%;text-align:center;padding:12px;border-radius:var(--rs);background:var(--accent);color:#fff;font-weight:700;cursor:pointer;margin-top:8px}' +
    '.bm-years-act.ghost{background:transparent;color:var(--text);border:1px solid var(--border);font-weight:600}' +
    '#bm-year-bar{position:fixed;left:0;right:0;bottom:0;z-index:1500;display:flex;gap:10px;align-items:center;justify-content:space-between;padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px));background:#78350f;color:#fff;font-size:.85rem}' +
    '#bm-year-bar button{all:unset;cursor:pointer;font-weight:700;text-decoration:underline;white-space:nowrap}' +
    '#bm-year-prompt{position:fixed;left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:1500;display:flex;gap:10px;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--accent);color:#fff;border-radius:var(--rs);box-shadow:var(--sh2);font-size:.85rem}' +
    '#bm-year-prompt button{all:unset;cursor:pointer;font-weight:700;text-decoration:underline;white-space:nowrap}' +
    'body.bm-archive{padding-bottom:52px}';
  document.head.appendChild(css);

  function sheet() {
    var el = document.getElementById('bm-years');
    if (!el) {
      el = document.createElement('div'); el.id = 'bm-years'; el.hidden = true;
      el.innerHTML = '<div class="bm-years-bg"></div><div class="bm-years-box" role="dialog" aria-label="Années scolaires"></div>';
      el.querySelector('.bm-years-bg').addEventListener('click', function () { el.hidden = true; });
      document.body.appendChild(el);
    }
    return el;
  }
  function renderSheet(confirming) {
    var el = sheet(), box = el.querySelector('.bm-years-box'), h = '<h3>Années scolaires</h3>' +
      '<p class="bm-years-sub">Chaque année garde ses cours, ses cartes et ta progression.</p><div class="bm-years-list">';
    years().forEach(function (y) {
      var on = y === window.BMYears.viewing;
      h += '<button type="button" class="bm-years-item' + (on ? ' on' : '') + '" data-y="' + esc(y) + '"><span>' + esc(y) + '</span><span class="bm-years-tag">' + (y === live ? 'En cours' : 'Archive') + '</span></button>';
    });
    h += '</div><div class="bm-years-next">';
    if (confirming) {
      h += '<p>Tes matières de <b>' + esc(live) + '</b> seront archivées sur cet appareil (tu pourras toujours les rouvrir) et <b>' + esc(nextOf(live)) + '</b> repartira vide. Ta « Culture perso » reste là. Une sauvegarde est téléchargée avant.</p>' +
        '<button type="button" class="bm-years-act" data-go="1">Ouvrir ' + esc(nextOf(live)) + '</button><button type="button" class="bm-years-act ghost" data-cancel="1">Annuler</button>';
    } else if (canOpenNext()) {
      h += '<button type="button" class="bm-years-act" data-open="1">➕ Ouvrir l’année ' + esc(nextOf(live)) + '</button>';
    } else {
      h += '<p>L’année suivante pourra s’ouvrir à partir du 1er juin.</p>';
    }
    h += '</div><button type="button" class="bm-years-act ghost" data-close="1">Fermer</button>';
    box.innerHTML = h;
    box.onclick = function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.dataset.y) { el.hidden = true; if (t.dataset.y !== window.BMYears.viewing) window.BMYears.view(t.dataset.y); }
      else if (t.dataset.open) renderSheet(true);
      else if (t.dataset.cancel) renderSheet(false);
      else if (t.dataset.go) { t.disabled = true; startRollover(); }
      else if (t.dataset.close) el.hidden = true;
    };
    el.hidden = false;
  }

  function build() {
    var foot = document.querySelector('.sb-footer');
    if (foot) {
      foot.innerHTML = '<button type="button" class="bm-year-btn" id="bm-year-btn"><span>📅 Année <b>' + esc(window.BMYears.viewing) + '</b></span><span>▾</span></button>';
      foot.querySelector('button').addEventListener('click', function () { renderSheet(false); });
    }
    if (archive) {
      document.body.classList.add('bm-archive');
      // Seules les matières de classe existent dans une archive : on masque la Culture perso
      document.querySelectorAll('.sb-link[onclick*="goSubject"]').forEach(function (b) {
        var m = /goSubject\('((?:[^'\\]|\\.)*)'\)/.exec(b.getAttribute('onclick') || '');
        if (m && !isClass(m[1].replace(/\\'/g, "'"))) b.hidden = true;
      });
      document.querySelectorAll('.sb-sep').forEach(function (s) { if (/perso/i.test(s.textContent)) s.hidden = true; });
      var bar = document.createElement('div'); bar.id = 'bm-year-bar';
      bar.innerHTML = '<span>📚 Archive ' + esc(view) + ' · enregistrée sur cet appareil</span><button type="button">Revenir à ' + esc(live) + '</button>';
      bar.querySelector('button').addEventListener('click', function () { window.BMYears.view(live); });
      document.body.appendChild(bar);
    } else if (shouldPrompt()) {
      var day = today().toISOString().slice(0, 10);
      if (get(K.prompt) !== day) {
        var p = document.createElement('div'); p.id = 'bm-year-prompt';
        p.innerHTML = '<span>📅 Nouvelle année scolaire : ' + esc(nextOf(live)) + '</span><span><button type="button" data-o="1">Ouvrir</button> &nbsp; <button type="button" data-l="1">Plus tard</button></span>';
        p.addEventListener('click', function (e) {
          var t = e.target.closest('button'); if (!t) return;
          set(K.prompt, day); p.remove();
          if (t.dataset.o) renderSheet(true);
        });
        document.body.appendChild(p);
      }
    }
    if (window.BM_YEAR_ERROR) alert('Le changement d’année n’a pas pu se faire (' + window.BM_YEAR_ERROR + '). Tes cours n’ont pas été modifiés.');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
