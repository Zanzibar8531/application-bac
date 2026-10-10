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
