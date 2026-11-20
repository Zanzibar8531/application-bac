# BacMaster — plan du projet

Application web installable (PWA) de révision. Le projet n'utilise pas de compilation : les fichiers sont servis tels quels depuis GitHub Pages.

> Pour comprendre les dépendances et les règles de modification, lire aussi [`ARCHITECTURE.md`](ARCHITECTURE.md). Pour contrôler automatiquement les références et la syntaxe avant une mise en ligne, lancer `node tools/audit-project.mjs`.

## Repères rapides

| Zone | Fichiers | Responsabilité |
|---|---|---|
| Point d'entrée | `index.html` | Structure HTML, ordre de chargement, styles et démarrage différé de Supabase. |
| Styles | `style-base.css`, `style-mobile.css`, `style-modules.css`, `style-barres.css`, `style-evolutions.css` | Présentation. L'ordre dans `index.html` est volontaire : les dernières feuilles complètent ou surchargent les précédentes. |
| Données pédagogiques | `data-init.js`, puis fichiers de matières | Définition des cours, chapitres, flashcards et exercices. Un fichier de matière peut être volumineux : ne pas le découper sans vérifier les références croisées. |
| Noyau | `app-core.js` à `app-boot.js` | Ancien `script.js` découpé en plusieurs scripts classiques partageant le même espace global. L'ordre de chargement est obligatoire. |
| Modules `bm-*` | `bm-*.js` | Extensions spécialisées : éditeur, versions, dictée, agenda, statistiques, mascotte, administration, etc. |
| Synchronisation | `supabase-config.js`, `supabase-app.js`, `bm-collab.js` | Connexion, synchronisation et présence collaborative. Ces trois scripts sont ajoutés après le chargement de la bibliothèque Supabase. |
| Hors-ligne et notifications | `sw.js` | Pré-cache, stratégies réseau et notifications. Tout nouvel asset destiné au hors-ligne doit être ajouté à `STATIC_ASSETS` et à `isStaticAsset()` si nécessaire. |
| Base de données | `supabase/` | Scripts SQL de configuration et d'évolution. Les règles RLS ne doivent jamais être désactivées pour contourner un problème. |

## Matières

`francais.js`, `maths.js`, `histoire-geo.js`, `anglais.js`, `espagnol.js`, `physique-chimie.js`, `ingenierie-dd.js`, `innovation-techno.js`, `informatique.js`, `informatique-code.js`, `informatique-parcours.js`, `cybersecurite.js`, `cybersecurite-plus.js`, `cybersecurite-parcours.js`, `investissement.js`, `investissement-pratique.js`, `entrepreneuriat.js`, `apprentissage.js` et `juridique.js` contiennent le contenu pédagogique.

`data-init.js` prépare la structure des données avant le chargement des matières. Ne pas déplacer les fichiers de matière avant `data-init.js`.

## Modules `bm-*`

| Fichier | Rôle principal |
|---|---|
| `bm-sanitize.js` | Nettoyage du contenu reçu d'autres comptes et génération de l'iframe isolée. |
| `bm-merge.js` | Fusion à trois voies d'un chapitre modifié simultanément. |
| `bm-admin.js` | Administration, activité, historique/restauration et présence. |
| `bm-editor.js`, `bm-editor-plus.js` | Ruban, aperçu, insertion d'images et encadrés de l'éditeur. |
| `bm-dictee.js` | Dictée vocale. |
| `bm-versions.js` | Versions de secours des cours conservées sur l'appareil. |
| `bm-collab.js` | Curseurs et présence d'autres personnes dans un chapitre. |
| `bm-goal.js` | Objectif quotidien, série, rappels, notifications et paramètres associés. |
| `bm-mascot.js`, `bm-bubble.js`, `bm-icons.js` | Flocon, dessins des notifications et icônes de série. |
| `bm-stats.js`, `bm-agenda.js` | Pages Statistiques et agenda. |
| `bm-export.js`, `bm-download.js` | Export de fiches et espace Télécharger. |

## Règles de modification

1. Ne pas convertir les scripts classiques en modules ES (`type="module"`) sans migration complète : les fonctions historiques, les attributs `onclick` et les modules actuels partagent des fonctions globales.
2. Ne pas changer l'ordre des scripts ou des feuilles CSS sans tests complets.
3. Toute nouvelle ressource locale doit être référencée dans `index.html` et, si elle doit fonctionner hors-ligne, dans `sw.js`.
4. Toute nouvelle fonctionnalité doit préférer un espace de noms explicite sur `window` (`window.BacMaster...`) plutôt qu'une nouvelle fonction globale générique.
5. Ne pas supprimer un code qui semble ancien avant d'avoir vérifié ses appels, ses branchements et ses usages indirects.
6. Ne pas renommer les clés `localStorage`, les identifiants HTML utilisés par le JavaScript ou les champs Supabase sans migration documentée.
7. Garder une sauvegarde avant les modifications structurelles et tester sur PC et téléphone.
