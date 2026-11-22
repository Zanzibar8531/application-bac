/* ============================================================
   BacMaster — bm-contenu.js
   Démarrage rapide : charge les cours en arrière-plan, une fois l'accueil affiché.
   (voir le bloc « Démarrage rapide » de index.html et bmMergePrebuilt() dans app-core.js)
   ============================================================ */
(function () {
    if (!window.BM_FAST_START) return;            // démarrage normal : les cours sont déjà chargés

    function finish() {
        try {
            const sig = bmPrebuiltSig();
            // Filet de sécurité : si les cours ont changé sans changement de version, on fusionne maintenant.
            if (sig !== localStorage.getItem('bm_content_sig')) {
                bmMergePrebuilt();
                save();
                localStorage.setItem('bm_content_sig', sig);
                localStorage.setItem('bm_content_ver', window.BM_CONTENT_VER || '');
                if (typeof refreshCurrentView === 'function') refreshCurrentView();
            }
        } catch (e) { console.warn('[BacMaster] Vérification des cours :', e); }
        window.bmContentReady();
    }

    function loadAll() {
        const files = window.BM_SUBJECT_FILES || [];
        let left = files.length, failed = false;
        if (!left) { window.bmContentReady(); return; }
        files.forEach(f => {                      // async=false : exécution dans l'ordre (informatique avant informatique-code…)
            const s = document.createElement('script');
            s.src = f; s.async = false;
            s.onload = () => { if (--left === 0 && !failed) finish(); };
            s.onerror = () => { failed = true; console.warn('[BacMaster] Cours non chargé :', f); };
            document.body.appendChild(s);
        });
    }

    function start() {
        if ('requestIdleCallback' in window) requestIdleCallback(loadAll, { timeout: 4000 });
        else setTimeout(loadAll, 1500);
    }
    if (document.readyState === 'complete') setTimeout(start, 800);
    else window.addEventListener('load', () => setTimeout(start, 800));
})();
