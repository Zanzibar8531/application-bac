/* ============================================================
   BacMaster — bm-bubble.js
   Dessine l'image des notifications : la mascotte « dit » le message dans une
   bulle de BD. Fonctionne dans la page ET dans le service worker (OffscreenCanvas),
   donc le texte peut changer à chaque rappel (série, minutes restantes…).
   BMBubble.make('worry', 'Titre', 'Message') → Promise<data:image/jpeg;base64,…>
   ============================================================ */
(function (g) {
  'use strict';
  const MASCOT_NAME = 'Flocon';                       // ← le nom de la mascotte, à changer ici si besoin
  const FONT = 'Roboto, "Segoe UI", "Helvetica Neue", Arial, system-ui, sans-serif';
  const TAG = { push: '#7c3aed', worry: '#c2410c', party: '#0f766e' };

  const stripEmoji = s => String(s || '').replace(/^[\p{Extended_Pictographic}\p{Emoji_Presentation}\u200d\ufe0f\s]+/u, '').trim();

  function wrap(ctx, text, maxW) {
    const words = String(text).split(/\s+/).filter(Boolean), lines = []; let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (ctx.measureText(t).width <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function b64(bytes) { let s = ''; const CH = 0x8000; for (let i = 0; i < bytes.length; i += CH) s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH)); return btoa(s); }

  async function make(mood, title, body, opts) {
    mood = TAG[mood] ? mood : 'push';
    const res = await fetch('./banner-' + mood + '.png'); if (!res.ok) throw new Error('banner');
    const bg = await createImageBitmap(await res.blob());
    const W = bg.width, H = bg.height, cv = new OffscreenCanvas(W, H), ctx = cv.getContext('2d');
    ctx.drawImage(bg, 0, 0);

    const textW = 536, padX = 36, padY = 30, maxH = 340;
    const head = stripEmoji(title), text = String(body || '').trim();
    let fs = 46, lines = [], hLines = [], total = 0;
    for (; fs >= 26; fs -= 2) {
      ctx.font = '800 ' + fs + 'px ' + FONT; hLines = head ? wrap(ctx, head, textW) : [];
      ctx.font = '500 ' + fs + 'px ' + FONT; lines = text ? wrap(ctx, text, textW) : [];
      total = (hLines.length + lines.length) * fs * 1.26 + (hLines.length && lines.length ? fs * 0.3 : 0);
      if (total <= maxH && hLines.length + lines.length <= 7) break;
    }
    const bw = textW + padX * 2, bh = total + padY * 2, bx = 26, cy = H / 2 + 6;
    const by = Math.max(54, Math.min(H - bh - 22, cy - bh / 2));

    // ombre + bulle + queue (pointe vers la tête de la mascotte)
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 28; ctx.shadowOffsetY = 8; ctx.fillStyle = '#ffffff';
    rr(ctx, bx, by, bw, bh, 38); ctx.fill();
    const ty = Math.min(by + bh - 56, Math.max(by + 40, cy)), tip = { x: bx + bw + 52, y: ty + 12 };
    ctx.beginPath(); ctx.moveTo(bx + bw - 6, ty - 26); ctx.quadraticCurveTo(bx + bw + 22, ty - 12, tip.x, tip.y); ctx.quadraticCurveTo(bx + bw + 18, ty + 20, bx + bw - 6, ty + 30); ctx.closePath(); ctx.fill();
    ctx.restore();

    // texte
    ctx.textBaseline = 'top'; let y = by + padY;
    ctx.fillStyle = '#111827'; ctx.font = '800 ' + fs + 'px ' + FONT;
    for (const l of hLines) { ctx.fillText(l, bx + padX, y); y += fs * 1.26; }
    if (hLines.length && lines.length) y += fs * 0.3;
    ctx.fillStyle = '#374151'; ctx.font = '500 ' + fs + 'px ' + FONT;
    for (const l of lines) { ctx.fillText(l, bx + padX, y); y += fs * 1.26; }

    // pastille du prénom de la mascotte
    const name = (opts && opts.name) || MASCOT_NAME; ctx.font = '800 25px ' + FONT;
    const nw = ctx.measureText(name).width + 38, nh = 38, nx = bx + 24, ny = by - nh / 2 - 2;
    ctx.fillStyle = TAG[mood]; rr(ctx, nx, ny, nw, nh, 19); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.fillText(name, nx + 19, ny + nh / 2 + 1);

    const blob = await cv.convertToBlob({ type: 'image/jpeg', quality: 0.88 });
    return 'data:image/jpeg;base64,' + b64(new Uint8Array(await blob.arrayBuffer()));
  }
  g.BMBubble = { make: make, name: MASCOT_NAME };
})(typeof self !== 'undefined' ? self : window);
