/* ============================================================
   BacMaster — bm-icons.js
   Vraies icônes dessinées pour la série : flamme 🔥, glace ❄️ (gel de série),
   saut temporel ⏳. Un seul bloc de définitions est inséré dans la page ; chaque
   icône est ensuite un simple <svg><use/></svg> (léger, net à toutes les tailles,
   adapté au mode clair et sombre).
   Utilisation : BMIcons.flame(22)  → chaîne HTML
   ============================================================ */
(function () {
  'use strict';
  const DEFS = `
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <!-- FLAMME -->
  <linearGradient id="bmi-fl-out" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb02e"/><stop offset=".45" stop-color="#ff6a1a"/><stop offset="1" stop-color="#e11d48"/></linearGradient>
  <linearGradient id="bmi-fl-mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ff9a1f"/></linearGradient>
  <radialGradient id="bmi-fl-core" cx=".5" cy=".75" r=".6"><stop offset="0" stop-color="#fffbe6"/><stop offset=".55" stop-color="#fff0a3"/><stop offset="1" stop-color="#ffd23f"/></radialGradient>
  <!-- GLACE -->
  <linearGradient id="bmi-ic-arm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0f7ff"/><stop offset=".5" stop-color="#7dd3fc"/><stop offset="1" stop-color="#38bdf8"/></linearGradient>
  <radialGradient id="bmi-ic-bg" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="#bae6fd" stop-opacity=".55"/><stop offset="1" stop-color="#0ea5e9" stop-opacity=".12"/></radialGradient>
  <!-- SAUT TEMPOREL -->
  <linearGradient id="bmi-jp-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c084fc"/><stop offset=".55" stop-color="#6366f1"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>
  <radialGradient id="bmi-jp-face" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#4c1d95"/><stop offset="1" stop-color="#1e1b4b"/></radialGradient>

  <symbol id="bmi-flame" viewBox="0 0 64 64">
    <path d="M33 3c1.4 9.6 6.2 14.4 11.6 20.2C50.4 29.4 55 35.6 55 43.5 55 54.8 45.4 62 32 62S9 54.8 9 43.5c0-6.6 3.2-11.4 7-15.6 1.2 3.9 3.5 6.6 6.6 8.2-.9-8.2 1.3-15.6 6.4-21.9C30.5 10.7 32.4 7.5 33 3z" fill="url(#bmi-fl-out)"/>
    <path d="M32.5 22c.6 6.1 3.8 9 6.7 12.6 2.7 3.3 4.8 6.6 4.8 10.4 0 6.6-5.1 10.8-11.5 10.8S20 51.6 20 45.2c0-3.7 1.6-6.4 3.7-8.9.5 2.5 1.8 4.2 3.7 5.1-.5-5.6.8-10.2 3.9-14.1.6-.8 1.1-1.8 1.2-5.3z" fill="url(#bmi-fl-mid)"/>
    <path d="M32 40c.4 3.3 2.7 5 4 7.2 1.2 2 1.6 3.4 1.6 4.9 0 3.3-2.7 5.4-5.6 5.4s-5.6-2.1-5.6-5.4c0-2.2 1-3.6 2.2-4.9.3 1.2.9 1.9 1.8 2.3-.2-3 .2-5.2 1.6-9.5z" fill="url(#bmi-fl-core)"/>
  </symbol>

  <symbol id="bmi-ice" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill="url(#bmi-ic-bg)"/>
    <g fill="none" stroke="url(#bmi-ic-arm)" stroke-linecap="round" stroke-linejoin="round">
      <g id="bmi-ic-a" stroke-width="3.6"><path d="M32 32V8"/><path d="M32 19l-6-5.5M32 19l6-5.5" stroke-width="3"/><path d="M32 26.5l-4-3.6M32 26.5l4-3.6" stroke-width="2.6"/></g>
      <use href="#bmi-ic-a" transform="rotate(60 32 32)"/><use href="#bmi-ic-a" transform="rotate(120 32 32)"/>
      <use href="#bmi-ic-a" transform="rotate(180 32 32)"/><use href="#bmi-ic-a" transform="rotate(240 32 32)"/><use href="#bmi-ic-a" transform="rotate(300 32 32)"/>
    </g>
    <path d="M32 26.5l5.2 3v6L32 38.5l-5.2-3v-6z" fill="#e0f7ff" stroke="#7dd3fc" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="32" cy="32.5" r="2" fill="#fff"/>
    <circle cx="51" cy="13" r="1.8" fill="#fff"/><circle cx="12" cy="50" r="1.4" fill="#fff" opacity=".9"/><circle cx="53" cy="48" r="1.1" fill="#fff" opacity=".8"/>
  </symbol>

  <symbol id="bmi-jump" viewBox="0 0 64 64">
    <circle cx="30" cy="34" r="22" fill="url(#bmi-jp-face)"/>
    <circle cx="30" cy="34" r="22" fill="none" stroke="url(#bmi-jp-ring)" stroke-width="5"/>
    <g stroke="#e9d5ff" stroke-width="2" stroke-linecap="round" opacity=".75"><path d="M30 17.5v3M30 47.5v3M13.5 34h3M43.5 34h3"/></g>
    <path d="M30 34V22.5M30 34l8 4.6" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="30" cy="34" r="2.6" fill="#fff"/>
    <path d="M44.5 7.5A27 27 0 0 1 57 28" fill="none" stroke="url(#bmi-jp-ring)" stroke-width="4.6" stroke-linecap="round"/>
    <path d="M62.4 26.8L58.5 35.2l-6.9-6z" fill="#22d3ee" stroke="#22d3ee" stroke-width="1.6" stroke-linejoin="round"/>
  </symbol>
</defs></svg>`;

  function mount() {
    if (document.getElementById('bmi-defs')) return;
    const d = document.createElement('div'); d.id = 'bmi-defs'; d.innerHTML = DEFS; d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    (document.body || document.documentElement).insertBefore(d, (document.body || document.documentElement).firstChild);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  function icon(name, size, cls) {
    const s = size || 20;
    return '<svg class="bmi bmi-' + name + (cls ? ' ' + cls : '') + '" width="' + s + '" height="' + s + '" viewBox="0 0 64 64" role="img" aria-hidden="true" focusable="false"><use href="#bmi-' + name + '"/></svg>';
  }
  window.BMIcons = {
    flame: (size, cls) => icon('flame', size, cls),
    ice: (size, cls) => icon('ice', size, cls),
    jump: (size, cls) => icon('jump', size, cls),
    mount: mount
  };
})();
