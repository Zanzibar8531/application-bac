/* ============================================================
   BACMASTER — data/apprentissage.js
   Cours et flashcards — Science de l'Apprentissage (culture perso)
   ============================================================ */

PREBUILT["Science de l'Apprentissage"] = {

'Mémoriser efficacement': {
cours:`<h3>Pourquoi relire son cours ne sert (presque) à rien</h3>
<p>Relire un cours donne une <strong>illusion de maîtrise</strong> : le texte paraît familier donc le cerveau croit l'avoir appris, alors qu'il n'a fait que le reconnaître passivement. Les études en sciences cognitives montrent que c'est l'une des méthodes de révision les moins efficaces, malgré son immense popularité.</p>

<h3>Le rappel actif (active recall)</h3>
<div class="formula-box">Se forcer à <strong>retrouver</strong> une information dans sa mémoire (sans regarder le cours) renforce beaucoup plus la mémorisation que de la relire. C'est exactement le principe des flashcards de ce site : la question t'oblige à chercher activement la réponse.</div>
<ul>
<li>Se tester avec des flashcards, des QCM, ou en essayant d'expliquer un concept à voix haute sans support</li>
<li>Chaque tentative de rappel — même ratée — renforce la trace mémorielle plus qu'une relecture passive</li>
</ul>

<h3>La répétition espacée (spaced repetition)</h3>
<p>Réviser une information juste avant de l'oublier (plutôt que de la bachoter en une seule fois) consolide beaucoup mieux la mémoire à long terme. C'est le principe de la <strong>courbe de l'oubli</strong> d'Ebbinghaus : sans révision, on oublie très vite (jusqu'à 50% en 24h), mais chaque rappel espacé dans le temps ralentit cet oubli.</p>
<div class="formula-box">C'est exactement l'algorithme utilisé par le mode "Réviser (flashcards)" de ce site : plus tu maîtrises une carte, plus l'intervalle avant la prochaine révision s'allonge.</div>

<h3>L'effet de génération</h3>
<p>On retient mieux une information qu'on a dû produire soi-même (répondre, reformuler, résumer) plutôt que simplement la lire. D'où l'intérêt d'écrire ses propres résumés/flashcards plutôt que de copier un cours tout fait.</p>

<h3>L'entrelacement (interleaving)</h3>
<p>Alterner entre plusieurs sujets/types d'exercices dans une même session (plutôt que de faire 50 exercices identiques d'affilée) force le cerveau à réidentifier quelle méthode utiliser à chaque fois — ce qui prépare mieux à un examen où les questions ne sont pas classées par type.</p>`,
flashcards:[
{q:'Pourquoi relire son cours est peu efficace',a:'Ça crée une illusion de maîtrise : le texte semble familier donc on croit l\'avoir appris, alors qu\'on ne l\'a que reconnu passivement, sans effort de récupération.'},
{q:'Rappel actif (active recall)',a:'Se forcer à retrouver une information dans sa mémoire sans regarder le cours — renforce la mémorisation bien plus qu\'une relecture passive.'},
{q:'Courbe de l\'oubli d\'Ebbinghaus',a:'Sans révision, on oublie une information très rapidement (jusqu\'à 50% en 24h). Chaque rappel espacé dans le temps ralentit cet oubli.'},
{q:'Répétition espacée — principe',a:'Réviser une information juste avant de l\'oublier plutôt qu\'en une seule fois consolide beaucoup mieux la mémoire à long terme.'},
{q:'Effet de génération',a:'On retient mieux une information qu\'on a dû produire soi-même (répondre, reformuler) plutôt que simplement la lire.'},
{q:'Entrelacement (interleaving)',a:'Alterner entre plusieurs sujets/types d\'exercices dans une session plutôt que les regrouper — prépare mieux à un examen où les questions sont mélangées.'},
{q:'Pourquoi les flashcards sont efficaces (2 principes combinés)',a:'Elles combinent rappel actif (on cherche la réponse) et répétition espacée (l\'intervalle s\'ajuste selon la maîtrise).'},
]},

'Concentration, temps & organisation': {
cours:`<h3>La technique Pomodoro</h3>
<div class="formula-box">25 minutes de travail concentré, sans aucune interruption (téléphone loin, notifications coupées) → 5 minutes de pause → répéter. Après 4 cycles, pause plus longue (15-30 min).</div>
<p>L'intérêt : un temps limité rend le démarrage moins intimidant ("juste 25 minutes"), et la contrainte de temps aide à rester concentré sans se disperser.</p>

<h3>Le "Deep Work" (travail profond)</h3>
<p>Concept popularisé par Cal Newport : la capacité à se concentrer sans distraction sur une tâche cognitivement exigeante. Plus rare et plus précieuse aujourd'hui à cause des sollicitations constantes (notifications, réseaux sociaux).</p>
<ul>
<li><strong>Multitâche</strong> : en réalité le cerveau ne fait pas 2 choses à la fois, il bascule rapidement entre elles — chaque bascule a un coût cognitif ("switch cost") qui ralentit et fatigue.</li>
<li><strong>Ce qui tue la concentration</strong> : notifications, onglets ouverts, environnement bruyant, fatigue, faim.</li>
</ul>

<h3>La procrastination — pourquoi on la fait</h3>
<p>Souvent pas de la paresse, mais une réaction émotionnelle : la tâche déclenche de l'anxiété, de l'ennui ou un sentiment d'être dépassé, et le cerveau cherche à éviter cette émotion négative en se distrayant.</p>
<div class="formula-box">Astuce efficace : réduire la 1ère étape à une taille ridiculement petite ("ouvrir le cahier" plutôt que "réviser 2h") pour court-circuiter la résistance émotionnelle de départ.</div>

<h3>Le sommeil, condition n°1 de l'apprentissage</h3>
<p>Le cerveau consolide les apprentissages de la journée PENDANT le sommeil. Réviser tard et dormir peu est contre-productif : mieux vaut réviser un peu moins longtemps mais dormir suffisamment (7-9h pour un adolescent/jeune adulte).</p>

<h3>La règle des 2 minutes (organisation)</h3>
<p>Si une tâche prend moins de 2 minutes, la faire immédiatement plutôt que de la noter pour plus tard — évite l'accumulation de micro-tâches qui polluent la charge mentale.</p>`,
flashcards:[
{q:'Technique Pomodoro — structure',a:'25 minutes de travail concentré sans interruption, puis 5 minutes de pause. Pause plus longue (15-30 min) après 4 cycles.'},
{q:'Pourquoi le multitâche est inefficace',a:'Le cerveau ne fait pas 2 choses en même temps, il bascule rapidement entre elles. Chaque bascule ("switch cost") a un coût cognitif qui ralentit et fatigue.'},
{q:'Deep Work',a:'Capacité à se concentrer sans distraction sur une tâche cognitivement exigeante — concept popularisé par Cal Newport, de plus en plus rare à cause des sollicitations constantes.'},
{q:'D\'où vient souvent la procrastination',a:'D\'une réaction émotionnelle (anxiété, ennui, sentiment d\'être dépassé) plutôt que de la simple paresse — le cerveau évite l\'émotion négative en se distrayant.'},
{q:'Astuce contre la procrastination',a:'Réduire la première étape à une taille ridiculement petite (ex : "ouvrir le cahier") pour court-circuiter la résistance émotionnelle de départ.'},
{q:'Rôle du sommeil dans l\'apprentissage',a:'Le cerveau consolide les apprentissages de la journée pendant le sommeil — réviser tard en dormant peu est contre-productif.'},
{q:'Règle des 2 minutes',a:'Si une tâche prend moins de 2 minutes, la faire immédiatement plutôt que de la reporter, pour éviter l\'accumulation de micro-tâches.'},
]},
};
