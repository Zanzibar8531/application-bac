/* ============================================================
   BacMaster — bm-merge.js
   Fusion à trois voies (base / mes modifs / modifs d'un autre) d'un chapitre.
   - cours : fusion par blocs (titres, paragraphes, éléments de liste…)
   - cartes et exercices : fusion par clé (question / énoncé)
   Rien n'est jamais perdu : si deux personnes réécrivent EXACTEMENT le même
   passage, les deux versions sont gardées (la 2e dans un encadré à vérifier).
   ============================================================ */
(function (root) {
  'use strict';
  const BLOCK = /(?=\n)|(?=<(?:h[1-6]|p|ul|ol|li|div|table|thead|tbody|tr|blockquote|hr|section|figure|pre)[\s>\/])/i;
  const CONFLICT_HTML = '<p class="bm-conflit" contenteditable="true">⚠️ Un autre éditeur a modifié ce passage en même temps que toi. Sa version est ci-dessous : garde la meilleure, puis supprime ce message.</p>';

  function splitBlocks(html) { return String(html == null ? '' : html).split(BLOCK).filter(function (x) { return x !== ''; }); }

  // Plus longue sous-suite commune : renvoie, pour chaque index de a, l'index correspondant dans b (ou -1).
  function lcs(a, b) {
    const n = a.length, m = b.length, map = new Array(n).fill(-1);
    let s = 0;
    while (s < n && s < m && a[s] === b[s]) { map[s] = s; s++; }
    let ea = n - 1, eb = m - 1;
    while (ea >= s && eb >= s && a[ea] === b[eb]) { map[ea] = eb; ea--; eb--; }
    const N = ea - s + 1, M = eb - s + 1;
    if (N > 0 && M > 0 && N * M <= 6000000) {
      const w = M + 1, dp = new Uint16Array((N + 1) * w);
      for (let i = N - 1; i >= 0; i--) for (let j = M - 1; j >= 0; j--) {
        dp[i * w + j] = a[s + i] === b[s + j] ? dp[(i + 1) * w + j + 1] + 1 : Math.max(dp[(i + 1) * w + j], dp[i * w + j + 1]);
      }
      let i = 0, j = 0;
      while (i < N && j < M) {
        if (a[s + i] === b[s + j]) { map[s + i] = s + j; i++; j++; }
        else if (dp[(i + 1) * w + j] >= dp[i * w + j + 1]) i++; else j++;
      }
    }
    return map;
  }

  function same(x, y) { return x.length === y.length && x.every(function (v, k) { return v === y[k]; }); }

  // Liste des modifications (hunks) qui transforment base en other : { bStart, bEnd, repl }.
  function hunks(base, other) {
    const map = lcs(base, other), out = [];
    let pb = -1, po = -1;
    for (let i = 0; i <= base.length; i++) {
      if (i === base.length || map[i] >= 0) {
        const oj = i === base.length ? other.length : map[i];
        if (i - pb > 1 || oj - po > 1) out.push({ bStart: pb + 1, bEnd: i, repl: other.slice(po + 1, oj) });
        pb = i; po = oj;
      }
    }
    return out;
  }
  function overlap(a, b) {
    if (a.bStart < b.bEnd && b.bStart < a.bEnd) return true;
    return a.bStart === a.bEnd && b.bStart === b.bEnd && a.bStart === b.bStart;   // deux insertions au même endroit
  }
  function applyHunks(base, hs, start, end) {
    const out = []; let pos = start;
    hs.forEach(function (h) { out.push.apply(out, base.slice(pos, h.bStart)); out.push.apply(out, h.repl); pos = h.bEnd; });
    out.push.apply(out, base.slice(pos, end));
    return out;
  }

  // Fusion à trois voies : les modifications qui ne se chevauchent pas sont toutes appliquées (même voisines).
  function diff3(base, ours, theirs) {
    const HO = hunks(base, ours), HT = hunks(base, theirs), out = [];
    let i = 0, j = 0, pos = 0, conflicts = 0;
    while (i < HO.length || j < HT.length) {
      const a = HO[i], b = HT[j];
      if (a && b && overlap(a, b)) {
        let start = Math.min(a.bStart, b.bStart), end = Math.max(a.bEnd, b.bEnd);
        const ca = [a], cb = [b]; i++; j++;
        for (let grew = true; grew;) {
          grew = false;
          while (HO[i] && (HO[i].bStart < end || (HO[i].bStart === end && HO[i].bEnd === end && cb.some(function (h) { return h.bEnd === end && h.bStart === end; })))) { ca.push(HO[i]); end = Math.max(end, HO[i].bEnd); i++; grew = true; }
          while (HT[j] && (HT[j].bStart < end || (HT[j].bStart === end && HT[j].bEnd === end && ca.some(function (h) { return h.bEnd === end && h.bStart === end; })))) { cb.push(HT[j]); end = Math.max(end, HT[j].bEnd); j++; grew = true; }
        }
        out.push.apply(out, base.slice(pos, start));
        const O = applyHunks(base, ca, start, end), T = applyHunks(base, cb, start, end);
        if (same(O, T)) out.push.apply(out, O);
        else if (start === end) out.push.apply(out, O.concat(T));                    // deux ajouts au même endroit : on garde les deux
        else { conflicts++; out.push.apply(out, O.concat([CONFLICT_HTML], T)); }     // même passage réécrit : on garde les deux
        pos = end;
      } else {
        const h = (!b || (a && a.bStart <= b.bStart)) ? HO[i++] : HT[j++];
        out.push.apply(out, base.slice(pos, h.bStart)); out.push.apply(out, h.repl); pos = h.bEnd;
      }
    }
    out.push.apply(out, base.slice(pos));
    return { blocks: out, conflicts: conflicts };
  }

  function mergeText(base, ours, theirs) {
    ours = String(ours == null ? '' : ours); theirs = String(theirs == null ? '' : theirs); base = String(base == null ? '' : base);
    if (ours === theirs) return { text: ours, conflicts: 0 };
    if (base === ours) return { text: theirs, conflicts: 0 };
    if (base === theirs) return { text: ours, conflicts: 0 };
    const r = diff3(splitBlocks(base), splitBlocks(ours), splitBlocks(theirs));
    return { text: r.blocks.join(''), conflicts: r.conflicts };
  }

  function stable(v) {
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
    return '{' + Object.keys(v).sort().map(function (k) { return JSON.stringify(k) + ':' + stable(v[k]); }).join(',') + '}';
  }

  function mergeKeyed(B, O, T, keyOf, equal, combine) {
    function index(arr) { const m = new Map(); (arr || []).forEach(function (x) { const k = keyOf(x); if (!m.has(k)) m.set(k, x); }); return m; }
    const mb = index(B), mo = index(O), mt = index(T), out = [], done = new Set();
    function pick(k) {
      const b = mb.get(k), o = mo.get(k), t = mt.get(k);
      if (!b) return o && t ? combine(undefined, o, t) : (o || t);
      if (!o && !t) return null;
      if (!o) return equal(b, t) ? null : t;       // supprimé chez moi : supprimé, sauf si l'autre l'a modifié
      if (!t) return equal(b, o) ? null : o;       // supprimé chez l'autre : idem
      return combine(b, o, t);
    }
    (O || []).concat(T || []).forEach(function (x) {
      const k = keyOf(x); if (done.has(k)) return; done.add(k);
      const r = pick(k); if (r) out.push(r);
    });
    return out;
  }

  const plain = function (h) { return String(h == null ? '' : h).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); };

  // base : version commune de départ (objet {cours, userEdited, flashcards, exercices}) ou null si inconnue.
  function mergeChapter(base, ours, theirs) {
    ours = ours || {}; theirs = theirs || {};
    if (!base) return { content: ours, conflicts: 0 };
    const text = mergeText(base.cours, ours.cours, theirs.cours);
    const cards = mergeKeyed(base.flashcards, ours.flashcards, theirs.flashcards,
      function (c) { return String(c.q == null ? '' : c.q); },
      function (x, y) { return String(x.a) === String(y.a); },
      function (b, o, t) { if (!b) return o; const a = String(o.a) === String(b.a) ? t.a : o.a; return Object.assign({}, o, { a: String(a == null ? '' : a) }); });
    const exos = mergeKeyed(base.exercices, ours.exercices, theirs.exercices,
      function (e) { return plain(e.enonce) || stable(e); },
      function (x, y) { return stable(x) === stable(y); },
      function (b, o, t) { return b && stable(b) === stable(o) ? t : o; });
    return {
      content: { cours: text.text, userEdited: !!(ours.userEdited || theirs.userEdited), flashcards: cards, exercices: exos },
      conflicts: text.conflicts
    };
  }

  const api = { mergeChapter: mergeChapter, mergeText: mergeText, splitBlocks: splitBlocks, diff3: diff3 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.BacMasterMerge = api;
})(typeof window !== 'undefined' ? window : globalThis);
