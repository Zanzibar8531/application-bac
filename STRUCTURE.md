# BacMaster — plan du projet

Application web installable (PWA) de révision. Aucun outil de compilation : on modifie les fichiers et on les met sur GitHub Pages.

## Ce qui se charge (dans cet ordre, voir `index.html`)

| Groupe | Fichiers | Rôle |
|---|---|---|
| **Styles** | `style-base.css` → `style-mobile.css` → `style-modules.css` → `style-barres.css` → `style-evolutions.css` | La cascade est la même qu'avant le découpage : **l'ordre compte** (les derniers fichiers corrigent les premiers). Pour un nouveau réglage visuel, l'ajouter à la fin de `style-evolutions.css`. |
| **Contenu des matières** | `anglais.js`, `apprentissage.js`, `cybersecurite*.js`, `entrepreneuriat.js`, `espagnol.js`, `francais.js`, `histoire-geo.js`, `informatique*.js`, `ingenierie-dd.js`, `innovation-techno.js`, `investissement*.js`, `juridique.js`, `maths.js`, `physique-chimie.js` | Un fichier = une matière (chapitres, cours, flashcards, exercices). `data-init.js` les assemble. Les corrections de cartes déjà distribuées se déclarent avec `PREBUILT_FIXES.push(...)` en bas du fichier. |
| **Modules d'étude** | `competences.js`, `erreurs.js`, `evaluation.js`, `parcours.js`, `vocal.js`, `navigation.js` | Compétences, carnet d'erreurs, évaluations, parcours, prononciation, navigation. |
| **Noyau de l'application** | `app-core.js` → `app-stats.js` → `app-pages.js` → `app-editor.js` → `app-srs.js` → `app-exercises.js` → `app-boot.js` | Ancien `script.js` découpé. **Même espace global** : une fonction définie dans un fichier est utilisable dans les suivants. |
| **Extensions `bm-*.js`** | voir ci-dessous | Fonctions ajoutées au noyau (éditeur, synchro, objectif, mascotte…). |
| **Synchronisation** | `supabase-config.js`, `supabase-app.js`, `bm-collab.js` | Chargés **après** l'affichage de l'accueil (voir le petit script dans `index.html`). |
| **Service worker** | `sw.js` | Cache hors-ligne, notifications. À chaque mise en ligne, **changer le nom du cache** (`CACHE_NAME`) pour que les téléphones récupèrent les nouveaux fichiers. Tout nouveau fichier doit aussi être ajouté à sa liste. |

## Extensions `bm-*.js`

| Fichier | Rôle |
|---|---|
| `bm-sanitize.js` | Nettoie le contenu reçu des autres comptes ; fournit `bmSandboxFrame()` (code exécuté dans une iframe isolée) |
| `bm-merge.js` | Fusion à trois voies d'un chapitre (modifications simultanées) |
| `bm-admin.js` | Administration : comptes, activité, historique et restauration des cours |
| `bm-editor.js`, `bm-editor-plus.js` | Ruban de l'éditeur « à la Word », aperçu, images, encadrés |
| `bm-dictee.js` | Dictée vocale |
| `bm-versions.js` | Versions de secours des cours (sur l'appareil) |
| `bm-collab.js` | Édition à plusieurs, curseurs des autres |
| `bm-goal.js` | Objectif quotidien, série, rappels, page Paramètres |
| `bm-mascot.js`, `bm-bubble.js`, `bm-icons.js` | Mascotte Flocon, image des notifications, icônes de série |
| `bm-stats.js`, `bm-agenda.js` | Page Statistiques, agenda des évaluations |
| `bm-export.js`, `bm-download.js` | Export d'une fiche, page Télécharger |

## Base de données (Supabase)

Les scripts SQL sont dans `supabase/`. Tables : `bacmaster_chapters` (un chapitre = une ligne), `bacmaster_chapters_history`, `bacmaster_shared_content`, `bacmaster_private_content`, `bacmaster_profiles`, `user_data` (progression), `bacmaster_push_subs`, `bacmaster_reminders`, `bacmaster_audit_log`. La sécurité repose sur la RLS : ne jamais en désactiver une.

## Règles pour modifier sans casser

1. Ne jamais mettre la clé « service_role » dans le code (seule la clé publique est autorisée).
2. Tout nouveau fichier `.js`/`.css` : l'ajouter à `index.html` **et** à `sw.js`, puis changer `CACHE_NAME`.
3. Tester sur téléphone **et** PC avant de cocher une mission du cahier des charges.
