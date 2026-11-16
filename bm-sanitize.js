/* ============================================================
   BacMaster — bm-sanitize.js  (nettoyage du contenu partagé)
   Les cours, cartes et exercices reçus d'un autre compte (synchro) passent ici avant d'entrer dans l'appli :
   un éditeur ne peut plus y glisser de code qui s'exécute chez les autres (script, onclick, javascript:, iframe…).
   • les balises inconnues ou dangereuses (<script>, <iframe>, <img onerror>…) sont affichées comme TEXTE, pas supprimées :
     une carte qui parle de « <script> » garde donc son texte ;
   • attributs : seuls les attributs sûrs restent ; les on… sont retirés (sauf la frise d'Histoire-Géo) ;
   • style : liste blanche de propriétés, jamais de url(), position, z-index…
   Si le contenu est déjà propre, il est renvoyé tel quel (aucune réécriture inutile).
   ============================================================ */
(function () {
  'use strict';
  const HTML_TAGS = new Set('a abbr b blockquote br button caption cite code col colgroup dd del details div dl dt em figcaption figure font h1 h2 h3 h4 h5 h6 hr i img ins kbd li mark ol p pre q s samp section small span strong sub summary sup table tbody td tfoot th thead tr u ul var wbr'.split(' '));
  const SVG_TAGS = new Set('svg g line polyline polygon circle ellipse rect path text tspan defs marker lineargradient radialgradient stop'.split(' '));
  const ALLOWED_TAGS = new Set([...HTML_TAGS, ...SVG_TAGS]);
  const ATTRS = new Set(('class style title id colspan rowspan role lang dir start open href src alt width height color size scope headers type ' +
    'viewbox x y x1 y1 x2 y2 cx cy r rx ry points d fill stroke stroke-width stroke-opacity stroke-dasharray stroke-linecap stroke-linejoin fill-opacity opacity transform ' +
    'text-anchor font-size font-weight dx dy markerwidth markerheight refx refy orient marker-end marker-start offset stop-color stop-opacity preserveaspectratio xmlns').split(' '));
  const STYLE_OK = /^(background(-color|-image)?|color|width|max-width|min-width|height|max-height|min-height|display|margin(-top|-right|-bottom|-left)?|padding(-top|-right|-bottom|-left)?|opacity|text-align|font(-size|-weight|-style|-family)?|border(-top|-right|-bottom|-left)?(-color|-width|-style|-radius)?|border-radius|line-height|text-decoration|vertical-align|white-space|overflow(-x|-y)?|flex(-direction|-wrap|-grow|-shrink|-basis)?|gap|align-items|justify-content|list-style(-type)?|text-transform|letter-spacing|word-break|--[\w-]+)$/;
  const STYLE_BAD = /url\s*\(|expression|javascript:|@import|behavio|\\|<|-moz-binding/i;
  const DISPLAY_OK = /^(block|inline|inline-block|flex|inline-flex|grid|none|table|list-item)$/i;
  const SAFE_ONCLICK = /^(showFriseDetail\(this\)|scrollToFrise\(\))$/;   // la frise interactive d'Histoire-Géo
  const SAFE_IMG = /^(https?:\/\/|data:image\/(png|jpe?g|gif|webp);base64,)/i;
  const SAFE_HREF = /^(https?:|mailto:|tel:|#|\.{0,2}\/|[\w.-]+(\.\w+)?(\?|#|$))/i;

  // 1) texte : toute balise qui n'est pas dans la liste blanche devient du texte visible (« &lt;script> »)
  function neutraliseTags(html) {
    let changed = false;
    const out = html.replace(/<(\/?)([A-Za-z][A-Za-z0-9:-]*)/g, (m, slash, name, off) => {
      const low = name.toLowerCase();
      // « <img> » cité dans un texte (sans src) reste du texte ; une vraie image a un src
      if (low === 'img' && !/^[^>]*\ssrc\s*=/i.test(html.slice(off + m.length, off + m.length + 600))) { changed = true; return '&lt;' + slash + name; }
      if (ALLOWED_TAGS.has(low)) return m;
      changed = true; return '&lt;' + slash + name;
    }).replace(/<!--[\s\S]*?-->|<[!?][^>]*>/g, m => { changed = true; return m.replace(/</g, '&lt;'); });
    return { out, changed };
  }
  function cleanStyle(v) {
    const keep = [];
    String(v).split(';').forEach(decl => {
      const i = decl.indexOf(':'); if (i < 1) return;
      const prop = decl.slice(0, i).trim().toLowerCase(), val = decl.slice(i + 1).trim();
      if (!STYLE_OK.test(prop) || STYLE_BAD.test(val) || !val) return;
      if (prop === 'display' && !DISPLAY_OK.test(val)) return;
      keep.push(prop + ':' + val);
    });
    return keep.join(';');
  }
  function cleanNode(root) {
    root.querySelectorAll('*').forEach(el => {
      const tag = el.localName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) { el.replaceWith(document.createTextNode(el.textContent)); return; }
      for (const a of [...el.attributes]) {
        const n = a.name.toLowerCase(), v = a.value;
        let ok = true;
        if (n.startsWith('on')) ok = SAFE_ONCLICK.test(v.trim()) && n === 'onclick';
        else if (n === 'style') { const s = cleanStyle(v); if (s) el.setAttribute('style', s); else ok = false; }
        else if (n.startsWith('data-') || n.startsWith('aria-')) ok = !/[<>]/.test(v) || n.startsWith('data-');
        else if (!ATTRS.has(n)) ok = false;
        else if (n === 'href') ok = SAFE_HREF.test(v.trim()) && !/^\s*(javascript|data|vbscript):/i.test(v);
        else if (n === 'src') ok = tag === 'img' && SAFE_IMG.test(v.trim());
        else if (n === 'id') ok = /^[A-Za-z][\w-]{0,60}$/.test(v) && !(v in window) && !(document.getElementById(v) && !document.getElementById(v).closest('.cours-body,#editor,.course-content-card,.frise-wrap'));
        if (!ok) el.removeAttribute(a.name);
      }
      if (tag === 'a') { el.setAttribute('rel', 'noopener noreferrer'); }
      if (tag === 'img' && !el.getAttribute('src')) el.remove();
    });
  }
  function sanitize(html) {
    if (typeof html !== 'string' || html.indexOf('<') === -1) return html;
    const n = neutraliseTags(html);
    const doc = new DOMParser().parseFromString('<body>' + n.out + '</body>', 'text/html');   // document inerte : rien ne s'exécute ni ne se charge
    const canonical = doc.body.innerHTML;
    cleanNode(doc.body);
    const cleaned = doc.body.innerHTML;
    return (!n.changed && cleaned === canonical) ? html : cleaned;
  }
  const SKIP_KEYS = new Set(['status', 'lastAttempt', 'niveau', 'verified', '_meta', 'id', 'userEdited']);
  function deep(v, key) {
    if (typeof v === 'string') return SKIP_KEYS.has(key) ? v : sanitize(v);
    if (Array.isArray(v)) return v.map(x => deep(x));
    if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = deep(v[k], k); return o; }
    return v;
  }
  window.bmSanitizeHTML = sanitize;
  window.bmCleanChapter = c => { try { return deep(c); } catch (e) { console.warn('[BacMaster] nettoyage impossible', e); return c; } };

  /* ---------- exercices d'informatique : code exécuté dans une iframe isolée ----------
     bmSandboxFrame({html, css, js}) renvoie une <iframe> prête à insérer dans la page :
     • sandbox="allow-scripts" SANS allow-same-origin → le code n'a accès ni au localStorage, ni à la session, ni à l'appli ;
     • CSP stricte : aucune requête réseau (pas de fetch, pas d'image distante, pas de formulaire envoyé) ;
     • le code de l'élève ne peut donc rien casser en dehors de son petit cadre. */
  window.bmSandboxFrame = function (opt) {
    opt = opt || {};
    const csp = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:";
    const esc = t => String(t == null ? '' : t).replace(/<\/(script|style)/gi, '<\\/$1');
    const f = document.createElement('iframe');
    f.setAttribute('sandbox', 'allow-scripts');
    f.setAttribute('referrerpolicy', 'no-referrer');
    f.setAttribute('title', opt.title || 'Exécution du code');
    f.style.cssText = 'width:100%;min-height:240px;border:1px solid rgba(120,120,140,.35);border-radius:12px;background:#fff';
    f.srcdoc = '<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="' + csp + '">' +
      '<style>body{font:15px/1.5 system-ui,sans-serif;margin:12px;color:#111}' + esc(opt.css) + '</style>' + (opt.html || '') +
      (opt.js ? '<script>' + esc(opt.js) + '<\/script>' : '');
    return f;
  };
})();
