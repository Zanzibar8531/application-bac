/* ============================================================
   BACMASTER — data/data-init.js
   Initialise l'objet global PREBUILT.
   Ce fichier DOIT être chargé en premier, avant les fichiers
   data/<matiere>.js qui viennent ensuite remplir PREBUILT.
   ============================================================ */

const PREBUILT = {};

// Corrections de cartes DÉJÀ présentes chez l'élève (sa progression de révision est conservée).
// Chaque entrée : { s: matière, ch: chapitre, oldQ: ancienne question (sans antislash),
//                   q: nouvelle question (facultatif), oldA: ancienne réponse (facultatif),
//                   a: nouvelle réponse (facultatif) }
// Si oldA est donné, la carte n'est modifiée que si sa réponse est encore celle d'origine
// (une carte modifiée par l'élève lui-même n'est jamais écrasée).
const PREBUILT_FIXES = [];

// Renommages de chapitres : { s: matière, old: ancien nom, new: nouveau nom }.
// Les données de l'élève (progression, cartes perso) sont déplacées sous le nouveau nom.
// Pour déplacer un chapitre vers une AUTRE matière, ajouter « to: nom de la nouvelle matière ».
const PREBUILT_RENAMES = [
    // « Cours 1 — Approche design » était rangé en I2D alors qu'il fait partie d'Innovation Technologique (IT)
    { s: 'Ingénierie & Dév. Durable', old: 'Cours 1 — Approche design : conception, démarche & brevet', new: 'Cours 1 — Approche design : conception, démarche & brevet', to: 'Innovation Techno.' }
];
