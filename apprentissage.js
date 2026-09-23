/* ============================================================
   BACMASTER — data/apprentissage.js
   Cours et flashcards — Science de l'Apprentissage (culture perso)
   ============================================================ */

PREBUILT["Science de l'Apprentissage"] = {

'Mémoriser efficacement': {
cours:`<h3>Pourquoi relire son cours ne sert (presque) à rien</h3>
<p>Relire un cours donne une <mark>illusion de maîtrise</mark> : le texte paraît familier donc le cerveau croit l'avoir appris, alors qu'il n'a fait que le reconnaître passivement. Les études en sciences cognitives montrent que c'est l'une des méthodes de révision les moins efficaces, malgré son immense popularité.</p>
<div class="attention-box">Se sentir "à l'aise" en relisant un cours ne veut PAS dire que tu le maîtrises. Le vrai test, c'est d'arriver à répondre à une question SANS le support sous les yeux — d'où l'intérêt des flashcards.</div>

<h3>Le rappel actif (active recall)</h3>
<div class="formula-box">Se forcer à <strong>retrouver</strong> une information dans sa mémoire (sans regarder le cours) renforce beaucoup plus la mémorisation que de la relire. C'est exactement le principe des flashcards de ce site : la question t'oblige à chercher activement la réponse.</div>
<ul>
<li>Se tester avec des flashcards, des QCM, ou en essayant d'expliquer un concept à voix haute sans support</li>
<li>Chaque tentative de rappel — même ratée — renforce la trace mémorielle plus qu'une relecture passive</li>
</ul>

<h3>La répétition espacée (spaced repetition)</h3>
<p>Réviser une information juste avant de l'oublier (plutôt que de la bachoter en une seule fois) consolide beaucoup mieux la mémoire à long terme. C'est le principe de la <strong>courbe de l'oubli</strong> d'Ebbinghaus : sans révision, on oublie très vite (jusqu'à <mark>50% en 24h</mark>), mais chaque rappel espacé dans le temps ralentit cet oubli.</p>
<div class="formula-box">C'est exactement l'algorithme utilisé par le mode "Réviser (flashcards)" de ce site : plus tu maîtrises une carte, plus l'intervalle avant la prochaine révision s'allonge.</div>

<h3>L'effet de génération</h3>
<p>On retient mieux une information qu'on a dû <mark>produire soi-même</mark> (répondre, reformuler, résumer) plutôt que simplement la lire. D'où l'intérêt d'écrire ses propres résumés/flashcards plutôt que de copier un cours tout fait.</p>

<h3>L'entrelacement (interleaving)</h3>
<p>Alterner entre plusieurs sujets/types d'exercices dans une même session (plutôt que de faire 50 exercices identiques d'affilée) force le cerveau à réidentifier quelle méthode utiliser à chaque fois — ce qui prépare mieux à un examen où les questions ne sont pas classées par type.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un élève relit son cours de maths 3 fois de suite la veille d'un contrôle, et se sent "à l'aise" avec le chapitre. D'après le cours, peut-on en conclure qu'il maîtrise vraiment le chapitre ?</p>`, aide:`Relis l'encadré "attention" sur l'illusion de maîtrise.`, correction:`<p><strong>Non.</strong> Se sentir "à l'aise" en relisant ne veut pas dire qu'on maîtrise réellement le contenu — c'est l'illusion de maîtrise décrite dans le cours : le texte paraît familier donc on croit l'avoir appris, alors qu'on ne l'a fait que reconnaître passivement. Le vrai test est de répondre à des questions SANS le support sous les yeux (ex : des flashcards).</p>`},
{niveau:'Moyen', enonce:`<p>Deux élèves préparent le même contrôle de la même façon, sauf sur un point : le premier révise tout en une seule soirée intensive juste avant le contrôle. Le second étale ses révisions sur 3 séances espacées dans le temps, en se testant à chaque fois. Lequel retiendra probablement mieux l'information sur le long terme, et pourquoi ?</p>`, aide:`Relis le principe de la répétition espacée et la courbe de l'oubli d'Ebbinghaus.`, correction:`<p>Le <strong>second élève</strong> retiendra probablement mieux l'information sur le long terme. La répétition espacée (réviser juste avant d'oublier, plutôt qu'en une seule fois) consolide beaucoup mieux la mémoire à long terme que le bachotage en une seule session, même si les deux méthodes demandent le même temps total de révision. Le premier élève risque de bien réussir le contrôle immédiat, mais d'oublier rapidement après (courbe de l'oubli), car il n'a pas laissé le temps aux rappels espacés de ralentir cet oubli.</p>`},
{niveau:'Difficile', enonce:`<p>Un élève s'entraîne uniquement en faisant 30 exercices de dérivées d'affilée, puis 30 exercices d'intégrales d'affilée, dans des séances séparées et jamais mélangées. Le jour du contrôle, les questions de dérivées et d'intégrales sont mélangées sans indication du type attendu. Explique, avec le principe de l'entrelacement, pourquoi cet élève pourrait être déstabilisé malgré tout son entraînement.</p>`, aide:`Quand on fait 30 exercices du même type d'affilée, a-t-on vraiment besoin de se demander "quelle méthode dois-je utiliser ici ?" à chaque exercice, ou le sait-on déjà avant même de lire l'énoncé ?</p>`, correction:`<p>En s'entraînant par blocs de type identique, l'élève n'a jamais eu besoin de <mark>réidentifier</mark> quelle méthode utiliser — il savait déjà, avant même de lire l'énoncé, qu'il fallait dériver ou intégrer, puisque tous les exercices d'une même séance se ressemblaient. Cette compétence de reconnaissance rapide du type de problème n'a donc jamais été entraînée.</p><p>Le jour du contrôle, avec des questions mélangées, cette étape de reconnaissance devient soudain nécessaire et n'a jamais été travaillée — d'où la déstabilisation possible, malgré une maîtrise technique réelle de chaque méthode prise isolément. L'entrelacement (mélanger les types d'exercices dès l'entraînement) aurait justement permis de s'entraîner aussi à cette compétence de reconnaissance, en plus de la technique de résolution elle-même.</p>`},
],
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
<li><strong>Multitâche</strong> : en réalité le cerveau ne fait pas 2 choses à la fois, il <mark>bascule rapidement</mark> entre elles — chaque bascule a un coût cognitif ("switch cost") qui ralentit et fatigue.</li>
<li><strong>Ce qui tue la concentration</strong> : notifications, onglets ouverts, environnement bruyant, fatigue, faim.</li>
</ul>

<h3>La procrastination — pourquoi on la fait</h3>
<p>Souvent pas de la paresse, mais une <mark>réaction émotionnelle</mark> : la tâche déclenche de l'anxiété, de l'ennui ou un sentiment d'être dépassé, et le cerveau cherche à éviter cette émotion négative en se distrayant.</p>
<div class="retenir-box">Astuce qui marche vraiment : réduire la 1ère étape à une taille <mark>ridiculement petite</mark> ("ouvrir le cahier" plutôt que "réviser 2h") pour court-circuiter la résistance émotionnelle de départ. Une fois commencé, continuer est bien plus facile que démarrer.</div>

<h3>Le sommeil, condition n°1 de l'apprentissage</h3>
<p>Le cerveau consolide les apprentissages de la journée <mark>PENDANT</mark> le sommeil. Réviser tard et dormir peu est contre-productif : mieux vaut réviser un peu moins longtemps mais dormir suffisamment (7-9h pour un adolescent/jeune adulte).</p>

<h3>La règle des 2 minutes (organisation)</h3>
<p>Si une tâche prend moins de 2 minutes, la faire immédiatement plutôt que de la noter pour plus tard — évite l'accumulation de micro-tâches qui polluent la charge mentale.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un élève révise ses cours jusqu'à 2h du matin la veille d'un examen important, pour "gagner du temps". D'après le cours, est-ce une bonne stratégie ?</p>`, aide:`Relis la partie sur le rôle du sommeil dans l'apprentissage.`, correction:`<p><strong>Non.</strong> Le cerveau consolide les apprentissages PENDANT le sommeil — réviser tard en dormant peu est donc contre-productif. Le cours recommande plutôt de réviser un peu moins longtemps mais de dormir suffisamment (7-9h), car le temps de sommeil manqué annule une partie du bénéfice des révisions elles-mêmes.</p>`},
{niveau:'Moyen', enonce:`<p>Un élève n'arrive jamais à se lancer dans ses révisions du soir : il se dit "il faut que je révise 2h de maths" et repousse sans cesse. Propose-lui, en t'appuyant sur le cours, une astuce concrète pour démarrer plus facilement, en expliquant pourquoi elle fonctionne.</p>`, aide:`Relis l'astuce donnée dans l'encadré "à retenir" sur la procrastination — quelle est l'idée derrière "réduire la 1ère étape" ?`, correction:`<p>L'astuce du cours : réduire la première étape à une taille <mark>ridiculement petite</mark>, par exemple se dire simplement "j'ouvre juste mon cahier de maths" plutôt que "je dois réviser 2h". Ça fonctionne car la procrastination vient souvent d'une réaction émotionnelle face à une tâche perçue comme trop lourde ou intimidante (anxiété, sentiment d'être dépassé) — réduire drastiquement l'ampleur de la première étape court-circuite cette résistance émotionnelle de départ. Une fois lancé, continuer devient bien plus facile que démarrer.</p>`},
{niveau:'Difficile', enonce:`<p>Un élève travaille en sessions de 25 minutes façon Pomodoro, mais laisse son téléphone allumé sur son bureau "au cas où", et jette régulièrement un œil aux notifications pendant ses sessions de travail. Explique pourquoi cette habitude annule une grande partie du bénéfice de la technique Pomodoro, en utilisant le concept de "switch cost" vu dans le cours.</p>`, aide:`Relis la partie sur le multitâche et le switch cost — que se passe-t-il concrètement dans le cerveau à chaque fois qu'on regarde une notification puis qu'on revient à sa tâche ?</p>`, correction:`<p>Chaque fois que l'élève regarde une notification puis revient à son travail, son cerveau doit <mark>rebasculer</mark> entre les deux tâches — ce switch cost a un coût cognitif réel qui ralentit et fatigue, même si chaque interruption semble anodine et rapide ("juste 5 secondes").</p><p>Le principe même du Pomodoro est de garantir 25 minutes de concentration <strong>sans aucune interruption</strong> pour permettre un vrai "Deep Work". En laissant le téléphone accessible et en le consultant, l'élève réintroduit exactement ce que la technique cherche à éliminer : des bascules d'attention répétées qui empêchent d'atteindre un état de concentration profonde, même si le minuteur de 25 minutes tourne bien. Le bénéfice réel du Pomodoro dépend autant du respect strict de la règle "sans interruption" que du minutage lui-même.</p>`},
],
flashcards:[
{q:'Technique Pomodoro — structure',a:'25 minutes de travail concentré sans interruption, puis 5 minutes de pause. Pause plus longue (15-30 min) après 4 cycles.'},
{q:'Pourquoi le multitâche est inefficace',a:'Le cerveau ne fait pas 2 choses en même temps, il bascule rapidement entre elles. Chaque bascule ("switch cost") a un coût cognitif qui ralentit et fatigue.'},
{q:'Deep Work',a:'Capacité à se concentrer sans distraction sur une tâche cognitivement exigeante — concept popularisé par Cal Newport, de plus en plus rare à cause des sollicitations constantes.'},
{q:'D\'où vient souvent la procrastination',a:'D\'une réaction émotionnelle (anxiété, ennui, sentiment d\'être dépassé) plutôt que de la simple paresse — le cerveau évite l\'émotion négative en se distrayant.'},
{q:'Astuce contre la procrastination',a:'Réduire la première étape à une taille ridiculement petite (ex : "ouvrir le cahier") pour court-circuiter la résistance émotionnelle de départ.'},
{q:'Rôle du sommeil dans l\'apprentissage',a:'Le cerveau consolide les apprentissages de la journée pendant le sommeil — réviser tard en dormant peu est contre-productif.'},
{q:'Règle des 2 minutes',a:'Si une tâche prend moins de 2 minutes, la faire immédiatement plutôt que de la reporter, pour éviter l\'accumulation de micro-tâches.'},
]},

'Gérer le stress avant un examen': {
cours:`<h3>Le stress n'est pas l'ennemi — jusqu'à un certain point</h3>
<div class="formula-box">La courbe de Yerkes-Dodson montre qu'un <strong>niveau modéré de stress améliore la performance</strong> (vigilance accrue, concentration renforcée) — c'est l'<mark>eustress</mark> (le "bon stress"). Au-delà d'un certain seuil, le stress devient handicapant : trous de mémoire, difficulté à réfléchir clairement, panique. L'objectif n'est donc pas d'éliminer tout stress, mais de le ramener dans une zone gérable.</div>
<div class="retenir-box">Ressentir un peu de nervosité avant un examen important est normal et même utile — ce n'est un problème que lorsque ça devient paralysant.</div>

<h3>Ce qui se passe physiquement dans le corps</h3>
<p>Face à un examen perçu comme une menace, le corps déclenche une réponse physiologique de stress (adrénaline, cortisol) : cœur qui s'accélère, respiration plus courte, tension musculaire. C'est une réaction ancienne du corps ("combat ou fuite"), pas adaptée à un contrôle de maths, mais qui reste bien réelle — comprendre que ces sensations sont <mark>normales et physiologiques</mark> aide déjà à moins les subir.</p>

<h3>Techniques de respiration pour calmer le stress aigu</h3>
<div class="formula-box">
<strong>Respiration 4-7-8</strong> : inspirer par le nez pendant 4 secondes, retenir sa respiration 7 secondes, expirer lentement par la bouche pendant 8 secondes. Répéter 3-4 fois.<br>
<strong>Cohérence cardiaque</strong> : respirer à un rythme régulier d'environ 6 respirations par minute (inspirer 5s, expirer 5s) pendant 5 minutes — technique utilisée y compris par des sportifs de haut niveau avant une compétition.
</div>
<p>Ces techniques activent le système nerveux <mark>parasympathique</mark> (celui qui calme), en contrepoids direct de la réponse de stress du système sympathique.</p>

<h3>Préparation vs bachotage de dernière minute</h3>
<p>Une grande partie du stress d'examen vient d'un sentiment de <mark>manque de contrôle</mark> — se sentir mal préparé amplifie fortement l'anxiété. La répétition espacée (vue dans le chapitre "Mémoriser efficacement") réduit directement ce stress en amont : arriver à l'examen en sachant qu'on a réellement révisé dans de bonnes conditions, plutôt qu'en ayant tout bachoté la veille, change complètement le niveau d'anxiété ressenti.</p>
<div class="attention-box">Le bachotage de dernière minute est doublement contre-productif : il consolide mal la mémoire (vu dans le chapitre "Mémoriser efficacement") ET il augmente le stress, car le cerveau sent confusément qu'il n'a pas eu le temps de vraiment intégrer l'information.</div>

<h3>La reformulation cognitive (recadrage)</h3>
<p>Une même situation peut être interprétée de façon anxiogène ("je vais échouer, tout le monde va me juger") ou de façon plus neutre/constructive ("c'est l'occasion de montrer ce que j'ai appris, et si ça se passe mal, ce n'est qu'un examen parmi d'autres"). Ce n'est pas de la pensée positive naïve : c'est reconnaître que l'interprétation qu'on fait d'un événement influence directement l'intensité du stress ressenti, indépendamment de l'événement lui-même.</p>

<h3>La routine du jour J</h3>
<ul>
<li><strong>Éviter de réviser une notion totalement nouvelle</strong> juste avant l'épreuve — ça n'a pas le temps d'être consolidé et ça peut créer un doute de dernière minute sur des choses déjà bien maîtrisées.</li>
<li><strong>Manger correctement</strong> avant l'épreuve — le cerveau a besoin d'énergie stable, éviter le sucre en excès qui provoque un pic puis une chute d'énergie.</li>
<li><strong>Arriver en avance</strong> plutôt qu'en courant — le stress logistique (peur d'être en retard) s'ajoute inutilement au stress de l'épreuve elle-même.</li>
<li><strong>Lire l'énoncé en entier calmement</strong> avant de commencer à répondre, pour avoir une vision globale de ce qui est demandé.</li>
</ul>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un élève dit : "Je ressens un peu de nervosité avant chaque contrôle important, c'est forcément un problème que je dois éliminer complètement." D'après le cours, est-ce vrai ?</p>`, aide:`Relis la partie sur l'eustress et la courbe de Yerkes-Dodson.`, correction:`<p><strong>Non.</strong> Le cours explique qu'un niveau modéré de stress (l'eustress) améliore en réalité la performance (vigilance, concentration) — ce n'est problématique que lorsque ce stress devient excessif et handicapant (paralysant, trous de mémoire). L'objectif n'est donc pas de l'éliminer totalement, mais de le garder dans une zone gérable.</p>`},
{niveau:'Moyen', enonce:`<p>Deux élèves ont le même niveau de connaissances avant un examen. Le premier a révisé régulièrement sur plusieurs semaines avec des rappels espacés. Le second a tout bachoté la veille au soir. Lequel arrivera probablement avec moins de stress le jour J, et pourquoi (au-delà de la simple qualité de mémorisation) ?</p>`, aide:`Relis la partie sur le lien entre préparation et sentiment de contrôle — le stress d'examen ne vient pas QUE du niveau de connaissance réel.`, correction:`<p>Le <strong>premier élève</strong> arrivera probablement avec moins de stress. Au-delà de la meilleure mémorisation à long terme apportée par la répétition espacée, le cours souligne qu'une grande partie du stress d'examen vient d'un sentiment de <mark>manque de contrôle</mark> — se sentir mal préparé amplifie l'anxiété, indépendamment même du niveau de connaissances réel. Le second élève, malgré un niveau équivalent sur le papier, ressentira probablement une anxiété plus forte car son cerveau "sent" qu'il n'a pas eu le temps de vraiment intégrer les révisions faites à la dernière minute.</p>`},
{niveau:'Difficile', enonce:`<p>Deux élèves ratent la même question difficile à un examen. Le premier pense : "Je suis nul, je vais tout rater." Le second pense : "Cette question était dure, je passe à la suivante, il en reste d'autres où je peux briller." Explique, avec le concept de reformulation cognitive, pourquoi cette différence de discours intérieur peut avoir un impact concret sur la suite de leur épreuve, au-delà du simple ressenti émotionnel.</p>`, aide:`Le stress excessif a des effets concrets sur les capacités cognitives (mentionnés en début de cours) — si le premier élève reste bloqué sur une pensée anxiogène ("je vais tout rater"), quel est l'effet probable sur sa concentration pour les questions SUIVANTES de l'examen ?</p>`, correction:`<p>La pensée du premier élève ("je suis nul, je vais tout rater") est une généralisation anxiogène qui risque d'augmenter son niveau de stress au-delà du seuil optimal (au-delà de la zone d'eustress évoquée en début de cours) — avec pour conséquence concrète, comme le cours le mentionne, des trous de mémoire et une difficulté à réfléchir clairement sur les questions <strong>suivantes</strong>, alors même que ces questions n'ont rien à voir avec celle qui a posé problème.</p><p>Le second élève, en recadrant la situation ("cette question était dure, il en reste d'autres"), limite l'impact de cet échec ponctuel sur son état émotionnel global et préserve ses ressources cognitives pour la suite de l'épreuve. La reformulation cognitive n'est donc pas qu'un exercice de bien-être abstrait : elle a un effet mesurable sur la capacité réelle à bien performer sur le reste de l'examen, en évitant qu'un stress excessif localisé ne "contamine" tout le reste de l'épreuve.</p>`},
],
flashcards:[
{q:'Eustress',a:'Le "bon stress" : un niveau modéré de stress qui améliore la performance (vigilance, concentration accrue), selon la courbe de Yerkes-Dodson.'},
{q:'Que se passe-t-il physiologiquement en cas de stress d\'examen ?',a:'Le corps déclenche une réponse de stress (adrénaline, cortisol) : cœur accéléré, respiration courte, tension musculaire — une réaction ancienne du corps, normale et physiologique.'},
{q:'Respiration 4-7-8',a:'Inspirer 4 secondes, retenir 7 secondes, expirer lentement 8 secondes. Répéter 3-4 fois pour calmer un stress aigu.'},
{q:'Pourquoi une bonne préparation réduit le stress, au-delà de la mémorisation',a:'Le stress d\'examen vient en grande partie d\'un sentiment de manque de contrôle — une préparation régulière et espacée renforce ce sentiment de contrôle et réduit l\'anxiété ressentie le jour J.'},
{q:'Pourquoi le bachotage de dernière minute est doublement contre-productif',a:'Il consolide mal la mémoire (pas de répétition espacée) ET augmente le stress, car le cerveau sent qu\'il n\'a pas eu le temps de vraiment intégrer l\'information.'},
{q:'Reformulation cognitive (recadrage)',a:'Changer l\'interprétation qu\'on fait d\'une situation stressante (ex : "occasion de montrer ce que j\'ai appris" plutôt que "je vais échouer") pour réduire directement l\'intensité du stress ressenti.'},
{q:'Pourquoi éviter de réviser une notion totalement nouvelle juste avant une épreuve',a:'Elle n\'a pas le temps d\'être consolidée et peut créer un doute de dernière minute qui parasite des connaissances déjà bien maîtrisées.'},
]},

'Prise de notes efficace': {
cours:`<h3>Pourquoi la méthode de prise de notes change tout</h3>
<p>Recopier un cours mot pour mot n'est pas de la prise de notes — c'est de la copie passive, aussi peu efficace que la relecture (vue dans "Mémoriser efficacement"). Une bonne méthode de prise de notes force déjà un premier niveau de <mark>traitement actif</mark> de l'information pendant le cours lui-même, pas seulement au moment de réviser.</p>

<h3>La méthode Cornell</h3>
<div class="formula-box">La page est divisée en 3 zones :<br>
<strong>Zone principale</strong> (grande, à droite) : les notes prises pendant le cours, au fil de l'eau.<br>
<strong>Zone indices</strong> (colonne étroite, à gauche) : remplie APRÈS le cours — mots-clés et questions qui résument chaque bloc de notes.<br>
<strong>Zone résumé</strong> (bande en bas de page) : 2-3 phrases qui résument l'essentiel de toute la page, écrites après coup.
</div>
<div class="retenir-box">L'intérêt de la méthode Cornell : la <mark>colonne indices</mark> transforme automatiquement tes notes en outil de rappel actif — cache la zone principale, essaie de répondre aux questions de la colonne indices de mémoire, exactement comme une flashcard.</div>

<h3>Le mind mapping (carte mentale)</h3>
<p>Organisation <strong>visuelle et non linéaire</strong> de l'information : un thème central, avec des branches qui se ramifient vers les sous-thèmes puis les détails. Particulièrement efficace pour des sujets où les <mark>relations entre les idées</mark> comptent autant que les idées elles-mêmes (ex : les causes d'un événement historique, les liens entre plusieurs notions de cours).</p>
<div class="attention-box">Le mind mapping n'est pas adapté à tout : pour un cours très linéaire et procédural (une démonstration mathématique, les étapes d'un calcul), une prise de notes classique reste plus efficace — choisis la méthode selon la <mark>structure du contenu</mark>, pas par habitude.</div>

<h3>La méthode par esquive des phrases complètes</h3>
<p>Ne jamais essayer d'écrire des phrases complètes en notant un cours oral — c'est trop lent, tu décroches et rates la suite. Utilise :</p>
<ul>
<li><strong>Abréviations personnelles</strong> cohérentes (ex : "+" pour "et/plus", "→" pour "donc/entraîne", "w/" pour "avec").</li>
<li><strong>Mots-clés</strong> plutôt que des phrases — le verbe et les connecteurs peuvent souvent être reconstitués à la relecture.</li>
<li><strong>Structure visuelle</strong> (tirets, numéros, indentation) plutôt que de la prose continue — ça se relit et se scanne bien plus vite.</li>
</ul>

<h3>Le retraitement après le cours : l'étape qu'on saute trop souvent</h3>
<div class="formula-box">Des notes prises pendant le cours sont un brouillon, pas un produit fini. Les retravailler dans les <mark>24-48h</mark> (surligner l'essentiel, compléter les zones bâclées, reformuler ce qui est confus) est ce qui transforme vraiment des notes en support de révision utile — et ce retraitement est lui-même un exercice de rappel actif.</div>
<div class="retenir-box">Des notes jamais retravaillées après le cours perdent une grande partie de leur valeur : dans 2 semaines, une abréviation qui te semblait évidente en classe peut devenir incompréhensible.</div>

<h3>Numérique vs papier : ce que disent les études</h3>
<p>Prendre des notes à la main favorise généralement un meilleur traitement actif de l'information (on ne peut pas tout retranscrire mot à mot, donc on est obligé de résumer/reformuler en écrivant). Prendre des notes au clavier permet d'aller plus vite mais favorise parfois une retranscription trop littérale, proche de la copie passive. Ce n'est pas un interdit du numérique — juste une vigilance : sur clavier, force-toi consciemment à résumer plutôt qu'à tout transcrire.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Dans la méthode Cornell, à quel moment remplit-on la colonne "indices" (à gauche) : pendant le cours, ou après ?</p>`, aide:`Relis la description de la méthode Cornell — chaque zone a un moment précis pour être remplie.`, correction:`<p><strong>Après le cours.</strong> La zone principale se remplit pendant le cours (notes au fil de l'eau), mais la colonne indices se remplit ensuite, en relisant les notes prises et en en extrayant des mots-clés/questions — c'est cette étape qui transforme les notes en outil de rappel actif.</p>`},
{niveau:'Moyen', enonce:`<p>Un élève doit prendre des notes sur une démonstration mathématique en cours (une suite d'étapes de calcul logiques). Vaut-il mieux utiliser une carte mentale (mind map) ou une prise de notes linéaire classique ? Justifie avec le critère donné dans le cours.</p>`, aide:`Relis l'encadré "attention" sur les limites du mind mapping — quel type de contenu s'y prête bien, et lequel s'y prête mal ?`, correction:`<p>Une <strong>prise de notes linéaire classique</strong> est plus adaptée ici. Le cours précise que le mind mapping convient bien quand les relations entre idées comptent autant que les idées elles-mêmes (thèmes avec ramifications), mais qu'un contenu très <mark>linéaire et procédural</mark> — comme une démonstration mathématique où chaque étape découle logiquement de la précédente — se prête mieux à une prise de notes séquentielle classique, qui respecte cet ordre logique étape par étape.</p>`},
{niveau:'Difficile', enonce:`<p>Deux élèves prennent des notes sur le même cours d'histoire. Le premier tape très vite au clavier et parvient à retranscrire presque mot pour mot ce que dit le professeur. Le second, sur papier, ne note que des mots-clés et reformule avec ses propres mots, quitte à perdre quelques détails. Lequel aura probablement de meilleures notes pour réviser ensuite, et pourquoi, en te basant sur le principe de traitement actif évoqué dans le cours ?</p>`, aide:`Relis la partie "Numérique vs papier" — la vitesse de prise de notes est-elle vraiment l'avantage qu'elle semble être ici ? Pense à ce qui se passe dans le cerveau quand on retranscrit mot à mot par rapport à quand on doit résumer avec ses propres mots.</p>`, correction:`<p>Le <strong>second élève</strong> aura probablement des notes plus utiles pour réviser, malgré (et même grâce à) le fait d'avoir noté moins de détails. Retranscrire mot pour mot au clavier ressemble à de la copie passive : le cerveau n'a pas besoin de vraiment comprendre et sélectionner l'information pour la retranscrire telle quelle, un peu comme la relecture passive évoquée dans le chapitre "Mémoriser efficacement".</p><p>À l'inverse, être forcé de résumer avec ses propres mots (parce qu'on ne peut pas tout écrire à la main aussi vite qu'à l'oral) oblige à un vrai <mark>traitement actif</mark> pendant le cours : il faut comprendre l'idée pour pouvoir la reformuler en quelques mots-clés. Ce traitement, fait une première fois pendant la prise de notes elle-même, ancre déjà mieux l'information que le premier élève, même si ses notes finales contiennent objectivement moins de texte.</p>`},
],
flashcards:[
{q:'Les 3 zones de la méthode Cornell',a:'Zone principale (notes pendant le cours), zone indices (mots-clés/questions, remplie après), zone résumé (2-3 phrases de synthèse, en bas de page).'},
{q:'Pourquoi la colonne indices de la méthode Cornell est efficace',a:'Elle transforme les notes en outil de rappel actif : on cache la zone principale et on essaie de répondre aux questions de mémoire, comme une flashcard.'},
{q:'Quand utiliser le mind mapping plutôt qu\'une prise de notes linéaire',a:'Quand les relations entre les idées comptent autant que les idées elles-mêmes. Pour un contenu linéaire/procédural (démonstration, calcul), la prise de notes classique reste plus adaptée.'},
{q:'Pourquoi éviter d\'écrire des phrases complètes en notant un cours oral',a:'C\'est trop lent, on décroche et on rate la suite — mieux vaut des mots-clés, abréviations et structure visuelle (tirets, indentation).'},
{q:'Pourquoi retravailler ses notes dans les 24-48h après le cours',a:'Ça transforme un brouillon en vrai support de révision (surligner l\'essentiel, compléter, reformuler), et c\'est déjà un exercice de rappel actif — sans ça, les notes perdent vite leur valeur (abréviations oubliées, sens perdu).'},
{q:'Pourquoi prendre des notes à la main favorise souvent un meilleur apprentissage qu\'au clavier',a:'On ne peut pas tout retranscrire mot à mot à la main, ce qui force à résumer/reformuler (traitement actif) — au clavier, on est plus tenté de copier trop littéralement.'},
]},
};
