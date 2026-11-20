# BacMaster — architecture et guide de maintenance

Ce document décrit **l'architecture réellement utilisée par cette version du projet**. Il sert de garde-fou avant une modification structurelle.

## 1. Vue d'ensemble

```text
index.html
  ├─ feuilles CSS (ordre de cascade)
  ├─ data-init.js + fichiers de matières
  ├─ modules pédagogiques (compétences, erreurs, évaluations, parcours, vocal)
  ├─ noyau app-*.js (scripts classiques, espace global partagé)
  ├─ extensions bm-*.js (certaines exposent une API window.BacMaster...)
  ├─ navigation.js + nettoyage/fusion + administration
  ├─ démarrage différé : Supabase JS CDN
  │    └─ supabase-config.js → supabase-app.js → bm-collab.js
  └─ enregistrement de sw.js
```

Il n'y a actuellement ni bundler, ni système d'import/export ES modules, ni étape de compilation. Le navigateur exécute les scripts classiques dans l'ordre où ils sont déclarés ou ajoutés.

## 2. Ordre de chargement — dépendance critique

### Feuilles de style

L'ordre présent dans `index.html` doit être conservé :

1. `style-base.css` — fondations et composants communs.
2. `style-mobile.css` — adaptations mobile.
3. `style-modules.css` — composants fonctionnels.
4. `style-barres.css` — barres, navigation et dispositions de cours.
5. `style-evolutions.css` — évolutions et corrections ajoutées plus tard dans la cascade.

Une règle située plus bas peut volontairement surcharger une règle précédente. Déplacer une règle ou fusionner deux sélecteurs sans vérifier les media queries peut changer le rendu mobile ou desktop.

### JavaScript chargé directement

L'ordre dans `index.html` est organisé ainsi :

1. `data-init.js`, puis les fichiers de matières : les données doivent être déclarées avant le noyau qui les consomme.
2. `competences.js`, `erreurs.js`, `evaluation.js`, `parcours.js`, `vocal.js`.
3. Noyau : `app-core.js`, `app-stats.js`, `app-pages.js`, `app-editor.js`, `app-srs.js`, `app-exercises.js`, `app-boot.js`.
4. Extensions : `bm-mascot.js`, `bm-bubble.js`, `bm-icons.js`, `bm-goal.js`, `bm-export.js`, `bm-download.js`, `bm-stats.js`, `bm-editor.js`, `bm-editor-plus.js`, `bm-dictee.js`, `bm-versions.js`, `bm-agenda.js`.
5. `navigation.js`, `bm-sanitize.js`, `bm-merge.js`, `bm-admin.js`.

Les noms et l'ordre exacts restent ceux du HTML : ce résumé ne doit pas devenir une deuxième liste à modifier manuellement. Après tout ajout ou déplacement, lancer l'audit.

### Synchronisation chargée après l'affichage

Le petit chargeur intégré à `index.html` attend que la bibliothèque Supabase soit disponible, puis ajoute dans cet ordre :

1. `supabase-config.js`
2. `supabase-app.js`
3. `bm-collab.js`

Cet ordre est important : les modules suivants réutilisent l'état et les fonctions exposés par les précédents. Ne pas ajouter ces scripts une deuxième fois dans la liste principale.

## 3. Modèle de code : globals historiques et API explicites

Le noyau `app-*.js` est issu du découpage d'un ancien gros script. Il utilise encore des fonctions et variables partagées dans l'espace global. C'est pourquoi :

- un module peut dépendre d'une fonction déclarée dans un fichier chargé avant lui ;
- une fonction globale peut être appelée depuis un attribut HTML `onclick` ;
- changer le nom d'une fonction, d'une variable ou d'un élément HTML peut casser un autre fichier sans erreur évidente au moment de la modification.

Pour les nouvelles extensions, préférer une API regroupée, par exemple `window.BacMasterMonModule = { ... }`, plutôt que d'ajouter des noms génériques comme `load`, `render`, `save`, `start` ou `status` à l'espace global.

Les modules isolés dans une fonction auto-exécutée (`(function () { ... })()`) peuvent réutiliser des noms internes sans créer de collision globale. Un simple résultat de recherche montrant deux fonctions portant le même nom ne prouve donc pas qu'elles se remplacent.

## 4. Points de couplage connus à ne pas supprimer par erreur

- `bm-agenda.js` expose `window.openAgenda` après le chargement de l'ancien agenda présent dans le noyau. C'est un remplacement volontaire du point d'entrée historique.
- `bm-mascot.js` enveloppe certaines fonctions existantes pour déclencher les réactions de Flocon. Le wrapper doit préserver le résultat et le comportement de la fonction d'origine.
- `bm-admin.js` s'intègre aux fonctions d'administration et de présence après le chargement de Supabase.
- `bm-editor-plus.js`, `bm-dictee.js` et `bm-versions.js` injectent des boutons dans le ruban de l'éditeur. Leur fonctionnement dépend de l'existence du ruban et de l'ordre d'initialisation.
- `bm-sanitize.js` et `bm-merge.js` sont des dépendances de la réception et de la fusion du contenu partagé. Ne pas les retirer parce qu'ils ne possèdent pas d'interface visible.

Ces couplages sont une dette technique documentée, pas une raison pour effectuer un remplacement global immédiat. Une migration vers des événements explicites doit se faire module par module, avec tests de non-régression.

## 5. Service worker et ressources hors-ligne

`sw.js` possède deux listes complémentaires :

- `STATIC_ASSETS` : ressources téléchargées lors de l'installation du service worker ;
- `isStaticAsset()` : ressources traitées avec la stratégie Cache First.

Les fichiers de notification construits dynamiquement par `bm-goal.js` doivent figurer dans les deux mécanismes : `badge.png`, `banner-party.png`, `banner-push.png`, `banner-worry.png`, `mascot-party.png`, `mascot-push.png` et `mascot-worry.png`.

Lorsqu'un nouveau fichier est utilisé par une notification, une URL construite dynamiquement ou une fonction appelée hors-ligne, il faut vérifier qu'il est bien pré-cacheable et qu'il est reconnu comme ressource statique. Ajouter une ressource à `STATIC_ASSETS` mais oublier `isStaticAsset()` peut produire un comportement incohérent entre première visite et utilisation hors-ligne.

Le nom `CACHE_NAME` est un identifiant de cache applicatif : le mettre à jour quand une modification du comportement de cache l'exige. Le cache `CACHE_STATIC` est distinct et utilisé pour les ressources statiques ; ne pas confondre les deux.

## 6. Dette technique mesurée dans cette archive

Ces mesures sont des indicateurs, pas des objectifs à atteindre en supprimant du code sans tests :

- Les cinq feuilles CSS contiennent environ **705 occurrences de `!important`**. Elles sont réparties entre les cinq fichiers ; il faut réduire cela par composants et vérifier visuellement chaque changement.
- Plusieurs feuilles CSS redéfinissent certains sélecteurs dans des contextes ou à des étapes différentes de la cascade. Les fusionner automatiquement serait risqué.
- `bm-goal.js`, `supabase-app.js`, `bm-admin.js` et `bm-stats.js` regroupent plusieurs responsabilités. Une future séparation devrait extraire des blocs cohérents tout en conservant les API actuelles comme façades de compatibilité.
- Le contenu des matières est volumineux, mais il est volontairement séparé par matière. Il ne faut pas confondre la taille des fichiers de données avec une mauvaise séparation du code applicatif.

## 7. Ordre recommandé pour les prochaines refontes

1. **Conserver les points d'entrée actuels** : ne pas modifier les signatures utilisées par `index.html`, les boutons HTML ou Supabase.
2. **Introduire des événements internes** pour remplacer progressivement les wrappers de fonctions, en gardant temporairement les anciens appels comme compatibilité.
3. **Séparer les responsabilités des gros modules** derrière les mêmes APIs publiques, sans changer les clés locales ni le schéma Supabase.
4. **Nettoyer le CSS composant par composant**, en retirant les `!important` devenus inutiles après comparaison desktop/mobile.
5. Ajouter des tests ciblés pour fusion de chapitres, progression personnelle, droits, restauration de versions et parcours multi-appareils.

Chaque étape doit être isolée dans un changement facilement réversible. Ne pas combiner une refonte structurelle, une modification de données et une refonte visuelle dans la même livraison.

## 8. Contrôle avant livraison

Depuis la racine du projet, exécuter :

```bash
node tools/audit-project.mjs
```

Le contrôle vérifie les ressources locales référencées par `index.html`, la cohérence avec le pré-cache du service worker, la présence des ressources dynamiques critiques et la syntaxe de tous les fichiers JavaScript racine. Il ne remplace pas les tests fonctionnels sur téléphone et PC, ni les vérifications RLS/Supabase.
