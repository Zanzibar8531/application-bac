/* ============================================================
   BACMASTER — navigation.js
   Bouton « retour » du téléphone (Android) et geste retour (iPhone).

   Le bouton Retour fait « marche arrière » dans l'appli, comme le
   bouton ← affiché en haut de chaque page :
     1. ferme le menu latéral ou une fenêtre ouverte, s'il y en a une ;
     2. dans une évaluation, un contrôle ou une activité vocale :
        demande confirmation avant d'arrêter (rien n'est perdu par erreur) ;
     3. sinon, appuie sur le bouton ← de la page ;
     4. sur l'accueil : un 1er appui prévient, un 2e appui quitte.

   Technique (v2) : Chrome ignore (« saute ») les entrées d'historique
   qu'une page ajoute SANS action de l'utilisateur, et il ferait alors
   quitter l'appli au premier appui sur Retour. On ajoute donc une entrée
   à chaque appui sur l'écran (action de l'utilisateur), jamais au
   chargement ni pendant un retour.

   + Formules mathématiques trop larges : elles défilent horizontalement
   au lieu d'être coupées (voir fixWideMath).
   ============================================================ */
(function () {
    if (!window.history || !history.pushState) return;
    const MAX = 8;                 // nombre maximum d'entrées d'historique tampon
    let depth = 0;                 // entrées tampon actuellement devant nous
    let collapsing = false;        // on est en train de revenir à l'entrée de base
    const q = sel => document.querySelector(sel);

    function navBack() {
        const sb = document.getElementById('sidebar');
        if (sb && sb.classList.contains('open')) { closeSidebar(); return 'handled'; }
        if (document.getElementById('cc-overlay')) { closeCustomConfirm(); return 'handled'; }
        if (document.getElementById('cp-overlay') && typeof closeCustomPrompt === 'function') { closeCustomPrompt(); return 'handled'; }
        if (typeof asmSess !== 'undefined' && asmSess) { asmStop(); return 'handled'; }
        if (typeof vcSess !== 'undefined' && vcSess) { vcStop(); return 'handled'; }

        const back = q('.breadcrumb .bc-btn');
        if (back) { back.click(); return 'handled'; }
        const end = q('.se-home-btn');
        if (end) { end.click(); return 'handled'; }
        const modal = q('.modal-backdrop');
        if (modal) { modal.click(); return 'handled'; }

        if (!document.body.classList.contains('home-page') && !q('.dash-banner')) { goHome(); return 'handled'; }
        return 'home';
    }

    function pushTrap() {
        if (depth >= MAX || collapsing) return;
        try { history.pushState({ bm: 'trap', d: depth + 1 }, ''); depth++; } catch (e) { /* ignoré */ }
    }

    try { history.replaceState({ bm: 'base', d: 0 }, ''); } catch (e) { /* ignoré */ }

    // Une entrée de plus à chaque appui réel sur l'écran (= action de l'utilisateur)
    document.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') pushTrap(); }, true);
    document.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') pushTrap(); }, true);
    document.addEventListener('keydown', function (e) { if (e.key !== 'Escape') pushTrap(); }, true);

    window.addEventListener('popstate', function () {
        if (collapsing) { collapsing = false; depth = 0; return; }
        depth = Math.max(0, depth - 1);                      // une entrée tampon consommée
        let res = 'handled';
        try { res = navBack(); } catch (err) { res = 'handled'; }
        if (res === 'home') {
            // Accueil : 1er appui = on prévient ; le 2e appui quitte vraiment l'application
            if (typeof showToast === 'function') showToast("Appuie encore sur Retour pour quitter l'application", 'info');
            if (depth > 0) { collapsing = true; history.go(-depth); }
        }
    });
})();

/* ------------------------------------------------------------
   Formules trop larges pour l'écran : défilement horizontal
   ------------------------------------------------------------ */
(function () {
    function blockParent(el) {
        let p = el.parentElement;
        while (p && p !== document.body && getComputedStyle(p).display.indexOf('inline') === 0) p = p.parentElement;
        return p;
    }
    function fixWideMath(root) {
        const scope = root || document;
        scope.querySelectorAll('mjx-container:not([display="true"]), .mjx-container').forEach(function (c) {
            if (c.classList.contains('mjx-wide')) return;
            const p = blockParent(c);
            if (!p) return;
            const avail = p.clientWidth;
            const w = Math.max(c.scrollWidth, c.getBoundingClientRect().width);
            if (avail > 0 && w > avail - 6) c.classList.add('mjx-wide');
        });
    }
    window.fixWideMath = fixWideMath;
    let timer = null;
    function schedule() { clearTimeout(timer); timer = setTimeout(function () { fixWideMath(document); }, 120); }
    function start() {
        new MutationObserver(function (muts) {
            for (const m of muts) { if (m.addedNodes && m.addedNodes.length) { schedule(); return; } }
        }).observe(document.body, { childList: true, subtree: true });
        window.addEventListener('resize', function () {
            document.querySelectorAll('.mjx-wide').forEach(function (c) { c.classList.remove('mjx-wide'); });
            schedule();
        });
        schedule();
    }
    if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
