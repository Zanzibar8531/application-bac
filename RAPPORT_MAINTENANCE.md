# Rapport de maintenance — BacMaster

Base de travail : archive `BacMaster_ameliore.zip` fournie dans cette conversation.

## Changements effectués

1. **Service worker et notifications**
   - Ajout de `badge.png`, des trois images `banner-*` et des trois images `mascot-*` à `STATIC_ASSETS`.
   - Ajout de ces mêmes ressources à la détection `isStaticAsset()` pour qu'elles utilisent la stratégie Cache First.
   - Objectif : éviter que l'affichage des notifications perde ses images lorsque l'appareil est hors-ligne après installation du nouveau service worker.

2. **Documentation de l'architecture**
   - Refonte de `STRUCTURE.md` comme index des zones du projet.
   - Création de `ARCHITECTURE.md` : ordre de chargement, dépendances, globals historiques, APIs `window.BacMaster...`, points de couplage et dette technique connue.
   - Documentation explicite des remplacements et wrappers qui ne doivent pas être supprimés sans analyse.

3. **Contrôle automatisé**
   - Création de `tools/audit-project.mjs`, exécutable avec Node.js sans installer de paquet.
   - Le contrôle vérifie les ressources locales référencées dans `index.html`, le pré-cache du service worker, les ressources Supabase chargées dynamiquement, les images des notifications et la syntaxe des fichiers JavaScript racine.

## Vérifications effectuées

Résultat de `node tools/audit-project.mjs` sur cette archive :

- 53 ressources locales référencées dans `index.html` contrôlées ;
- 71 ressources locales répertoriées dans `STATIC_ASSETS` ;
- 52 fichiers JavaScript vérifiés syntaxiquement, sans erreur ;
- 705 occurrences de `!important` recensées dans les cinq feuilles CSS.

## Ce qui n'a pas été modifié

- Aucun cours, chapitre, flashcard ou exercice.
- Aucun fichier de fonctionnement de l'éditeur, des exercices, des flashcards ou de la progression.
- Aucune clé locale, table Supabase, fonction SQL ou règle RLS.
- Aucun changement d'apparence volontaire.

## Limites et suite recommandée

Cette opération améliore la maintenabilité et corrige la couverture hors-ligne des images de notification, mais ne constitue pas un test fonctionnel complet. Elle ne vérifie pas en direct une session Supabase, la synchronisation entre deux appareils, les notifications réelles sur Android/iOS ni les droits RLS.

Les répétitions CSS et les `!important` n'ont pas été supprimés automatiquement : la cascade actuelle est complexe et une suppression mécanique pourrait modifier l'affichage. Les wrappers de fonctions historiques sont identifiés et documentés ; leur remplacement par des événements explicites doit être réalisé progressivement, un module à la fois, avec tests de non-régression.
