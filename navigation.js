/* ============================================================
   BACMASTER — navigation.js
   Bouton « retour » du téléphone (Android) et geste retour (iPhone).

   Avant : appuyer sur Retour quittait l'application. Maintenant il
   fait « marche arrière » dans l'appli, comme le bouton ← affiché
   en haut de chaque page :
     1. ferme le menu latéral ou une fenêtre ouverte, s'il y en a une ;
     2. dans une évaluation, un contrôle ou une activité vocale :
        demande confirmation avant d'arrêter (rien n'est perdu par erreur) ;
     3. sinon, appuie sur le bouton ← de la page ;
     4. sur l'accueil : un 1er appui prévient, un 2e appui rapproché quitte.

   Technique : l'historique du navigateur contient une entrée « piège »
   qu'on remet en place après chaque retour, pour rester dans l'appli.
   ============================================================ */
(function () {
    if (!window.history || !history.pushState) return;
    let lastExitTry = 0;
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

        // Accueil : on demande de confirmer en appuyant deux fois
        const now = Date.now();
        if (now - lastExitTry < 2500) return 'exit';
        lastExitTry = now;
        if (typeof showToast === 'function') showToast("Appuie encore sur Retour pour quitter l'application", 'info');
        return 'handled';
    }

    history.replaceState({ bm: 'base' }, '');
    history.pushState({ bm: 'trap' }, '');

    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.bm === 'trap') return;        // avance : on ignore
        let res = 'handled';
        try { res = navBack(); } catch (err) { res = 'handled'; }
        if (res === 'exit') { history.back(); return; }      // on quitte vraiment l'application
        history.pushState({ bm: 'trap' }, '');                // on remet le piège en place
    });
})();
