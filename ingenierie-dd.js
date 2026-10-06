/* ============================================================
   BACMASTER — data/ingenierie-dd.js
   Cours et flashcards — Ingénierie & Développement Durable (I2D)
   Spécialité STI2D — 9h/semaine
   ============================================================ */

PREBUILT['Ingénierie & Dév. Durable'] = {

'Les 3 champs : Énergie, Information, Matière': {
cours:`<div class="attention-box"><h3>Pourquoi distinguer Énergie, Information et Matière ?</h3><p>Un système technique ne fait pas qu'« avoir des pièces » : il transforme et fait circuler des flux. La <strong>matière</strong> correspond aux éléments physiques, l'<strong>énergie</strong> permet d'alimenter ou d'actionner le système, et l'<strong>information</strong> permet de mesurer, décider et commander.</p><p>Un téléphone illustre les trois : batterie et énergie électrique, composants et matière, capteurs et données pour l'information. Cette séparation aide à construire un diagramme fonctionnel et à comprendre le rôle de chaque bloc.</p><h3>Comment analyser un système ?</h3><p>Pour chaque élément, demande-toi : reçoit-il une information, une énergie ou de la matière ? Que transforme-t-il ? Que transmet-il ensuite ? Cette méthode permet de passer d'une liste de composants à une vraie compréhension du fonctionnement.</p></div><hr><div class="attention-box"><h3>Pourquoi distinguer Énergie, Information et Matière ?</h3><p>Un système technique ne fait pas qu'« avoir des pièces » : il transforme et fait circuler des flux. La <strong>matière</strong> correspond aux éléments physiques, l'<strong>énergie</strong> permet d'alimenter ou d'actionner le système, et l'<strong>information</strong> permet de mesurer, décider et commander.</p><p>Un téléphone illustre les trois : batterie et énergie électrique, composants et matière, capteurs et données pour l'information. Cette séparation aide à construire un diagramme fonctionnel et à comprendre le rôle de chaque bloc.</p><h3>Comment analyser un système ?</h3><p>Pour chaque élément, demande-toi : reçoit-il une information, une énergie ou de la matière ? Que transforme-t-il ? Que transmet-il ensuite ? Cette méthode permet de passer d'une liste de composants à une vraie compréhension du fonctionnement.</p></div><hr><hr><h3>La démarche d'analyse en I2D</h3>
<p>Tout le programme d'Ingénierie et Développement Durable repose sur l'analyse d'un système technique selon <strong>3 champs complémentaires</strong>, qui interagissent en permanence dans un produit industriel.</p>

<h3>1. Champ Énergie</h3>
<p>Étudie comment un système <mark>produit, stocke, distribue et convertit</mark> l'énergie.</p>
<ul>
<li><strong>Chaîne d'énergie</strong> : Alimenter → Distribuer → Convertir → Transmettre → Action mécanique</li>
<li><strong>Sources</strong> : réseau électrique, batterie, panneau solaire, éolien, pile à combustible</li>
<li><strong>Convertisseurs</strong> : moteur électrique (électrique → mécanique), moteur thermique, vérin (pneumatique/hydraulique → mécanique)</li>
<li><strong>Rendement</strong> : η = Puissance utile / Puissance absorbée (toujours &lt; 1, pertes en chaleur/frottements)</li>
</ul>

<h3>2. Champ Information</h3>
<p>Étudie comment un système <mark>acquiert, traite, communique</mark> les données.</p>
<ul>
<li><strong>Chaîne d'information</strong> : Acquérir → Traiter → Communiquer</li>
<li><strong>Capteurs</strong> : acquièrent une grandeur physique (température, distance, luminosité, position) et la convertissent en signal électrique</li>
<li><strong>Traitement</strong> : microcontrôleur, carte programmable (Arduino, Raspberry Pi) qui exécute un algorithme/programme</li>
<li><strong>Communication</strong> : filaire (bus CAN, I2C) ou sans fil (Wifi, Bluetooth, radio)</li>
</ul>

<h3>3. Champ Matière</h3>
<p>Étudie le <mark>choix, la transformation et le comportement des matériaux</mark>.</p>
<ul>
<li><strong>Familles de matériaux</strong> : métalliques, polymères (plastiques), céramiques, composites, matériaux biosourcés</li>
<li><strong>Propriétés mécaniques</strong> : résistance, rigidité, dureté, ductilité, élasticité</li>
<li><strong>Procédés de transformation</strong> : usinage, moulage/injection, impression 3D, découpe laser, assemblage</li>
<li><strong>Choix d'un matériau</strong> : dépend du cahier des charges (contraintes mécaniques, coût, masse, impact environnemental, recyclabilité)</li>
</ul>
<div class="retenir-box">Un système technique n'est presque jamais analysable via un seul champ : à l'examen, on te demandera souvent de repérer comment les <mark>3 champs interagissent</mark> dans un même objet (ex : un vélo électrique, une trottinette connectée).</div>
<div class="formula-box">Un produit technique = interaction permanente entre les 3 champs. Ex : un vélo à assistance électrique combine Énergie (batterie/moteur), Information (capteur de pédalage, contrôleur) et Matière (cadre aluminium/carbone).</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Une trottinette électrique possède un moteur, une batterie, un capteur de vitesse et un cadre en aluminium. Classe chacun de ces éléments dans le bon champ (Énergie/Information/Matière).</p>`, aide:`Le moteur et la batterie produisent/convertissent quoi ? Le capteur acquiert quoi ? Le cadre est fait de quoi ?`, correction:`<p><strong>Énergie</strong> : batterie (source), moteur (convertisseur électrique→mécanique)</p><p><strong>Information</strong> : capteur de vitesse (acquisition d'une grandeur physique)</p><p><strong>Matière</strong> : cadre en aluminium (matériau métallique, choisi pour sa légèreté et sa résistance)</p>`},
{niveau:'Moyen', enonce:`<p>Explique pourquoi un rendement énergétique est toujours inférieur à 1 (jamais égal à 1 ni supérieur), en citant au moins une cause physique concrète.</p>`, aide:`Pense à ce qui se passe physiquement lors de toute conversion d'énergie (frottements, résistance électrique...) — cette énergie "perdue" part sous quelle forme ?`, correction:`<p>Le rendement est toujours inférieur à 1 car toute conversion d'énergie s'accompagne de <mark>pertes</mark>, principalement sous forme de <strong>chaleur</strong> (dissipée par frottements mécaniques, résistance électrique dans les câbles/moteurs, échauffement des composants). Il est physiquement impossible de convertir 100% d'une énergie en une autre forme utile — c'est un principe fondamental de la thermodynamique.</p>`},
{niveau:'Difficile', enonce:`<p>Un vélo à assistance électrique a un moteur avec une puissance absorbée de 400 W et une puissance utile de 320 W. Calcule son rendement, puis explique en quoi ce rendement pourrait influencer le choix des autres composants (champ Matière) du vélo.</p>`, aide:`Rendement η = Puissance utile / Puissance absorbée. Pense ensuite : que devient l'énergie perdue (80W) ? Comment cela peut-il influencer le choix des matériaux du moteur/cadre (dissipation thermique, résistance à la chaleur) ?`, correction:`<p>$\\eta = \\frac{320}{400} = 0,8$ soit un rendement de <strong>80%</strong>.</p><p>Les 20% restants (80 W) sont dissipés en chaleur au niveau du moteur. Cela influence directement le champ <strong>Matière</strong> : il faut choisir des matériaux capables de résister à cette chaleur (bon comportement thermique) et parfois prévoir un système de refroidissement, ce qui montre bien l'interaction entre les 3 champs — un choix énergétique a des conséquences sur le choix des matériaux.</p>`},
],
flashcards:[
{q:'Les 3 champs d\'analyse en I2D',a:'Énergie (produire/convertir), Information (acquérir/traiter/communiquer), Matière (choisir/transformer les matériaux).'},
{q:'Chaîne d\'énergie — étapes',a:'Alimenter → Distribuer → Convertir → Transmettre → Agir (action mécanique).'},
{q:'Chaîne d\'information — étapes',a:'Acquérir (capteur) → Traiter (microcontrôleur) → Communiquer.'},
{q:'Rendement énergétique η',a:'η = Puissance utile / Puissance absorbée. Toujours inférieur à 1 à cause des pertes (chaleur, frottements).'},
{q:'Rôle d\'un capteur',a:'Acquérir une grandeur physique (température, distance, position...) et la convertir en signal exploitable (souvent électrique).'},
{q:'Exemple de convertisseur d\'énergie',a:'Moteur électrique : convertit l\'énergie électrique en énergie mécanique. Vérin : convertit énergie pneumatique/hydraulique en mécanique.'},
{q:'5 familles de matériaux',a:'Métalliques, polymères (plastiques), céramiques, composites, matériaux biosourcés.'},
{q:'Propriétés mécaniques principales d\'un matériau',a:'Résistance (à la rupture), rigidité, dureté, ductilité (déformation sans rupture), élasticité.'},
{q:'Critères de choix d\'un matériau',a:'Contraintes mécaniques à supporter, coût, masse, impact environnemental, recyclabilité — définis dans le cahier des charges.'},
{q:'Communication filaire vs sans fil — exemples',a:'Filaire : bus CAN, I2C. Sans fil : Wifi, Bluetooth, radiofréquence.'},
]},

'Développement durable & cycle de vie produit': {
cours:`<div class="attention-box"><h3>Comprendre le cycle de vie</h3><p>Un produit ne commence pas son histoire lorsqu'on l'achète et ne la termine pas lorsqu'on le jette. Son cycle de vie comprend notamment extraction des matières, fabrication, transport, utilisation et fin de vie. Chaque étape peut consommer des ressources et produire des impacts.</p><p>L'analyse de cycle de vie sert justement à éviter une conclusion trop simple. Un produit peut être meilleur sur une étape et moins bon sur une autre. Il faut donc comparer les impacts sur l'ensemble du cycle, selon des critères définis.</p><h3>Pourquoi parler de compromis ?</h3><p>Une solution technique doit souvent concilier coût, performance, durée de vie, réparabilité et impact environnemental. Le développement durable consiste à rechercher un équilibre argumenté, pas à déclarer qu'un matériau ou un produit est « écologique » sans préciser le critère étudié.</p></div><hr><div class="attention-box"><h3>Comprendre le cycle de vie</h3><p>Un produit ne commence pas son histoire lorsqu'on l'achète et ne la termine pas lorsqu'on le jette. Son cycle de vie comprend notamment extraction des matières, fabrication, transport, utilisation et fin de vie. Chaque étape peut consommer des ressources et produire des impacts.</p><p>L'analyse de cycle de vie sert justement à éviter une conclusion trop simple. Un produit peut être meilleur sur une étape et moins bon sur une autre. Il faut donc comparer les impacts sur l'ensemble du cycle, selon des critères définis.</p><h3>Pourquoi parler de compromis ?</h3><p>Une solution technique doit souvent concilier coût, performance, durée de vie, réparabilité et impact environnemental. Le développement durable consiste à rechercher un équilibre argumenté, pas à déclarer qu'un matériau ou un produit est « écologique » sans préciser le critère étudié.</p></div><hr><hr><h3>Les 3 piliers du développement durable</h3>
<div class="formula-box">Le développement durable répond aux besoins du présent sans compromettre ceux des générations futures. Il repose sur 3 piliers indissociables :<br>
<strong>1. Environnemental</strong> — préserver les ressources et les écosystèmes<br>
<strong>2. Social</strong> — équité, conditions de travail, accès aux biens/services<br>
<strong>3. Économique</strong> — viabilité et rentabilité des activités</div>

<h3>Le cycle de vie d'un produit (ACV)</h3>
<p>L'<strong>Analyse du Cycle de Vie</strong> évalue l'impact environnemental d'un produit à chaque étape, <mark>"du berceau à la tombe"</mark> :</p>
<ol>
<li><strong>Extraction</strong> des matières premières</li>
<li><strong>Production / Fabrication</strong></li>
<li><strong>Distribution</strong> (transport, emballage)</li>
<li><strong>Utilisation</strong> (consommation d'énergie, entretien)</li>
<li><strong>Fin de vie</strong> (recyclage, réemploi, élimination)</li>
</ol>

<h3>Les indicateurs environnementaux</h3>
<ul>
<li><strong>Empreinte carbone</strong> : quantité de CO₂ (équivalent) émise sur tout le cycle de vie</li>
<li><strong>Épuisement des ressources</strong> : consommation de ressources non renouvelables</li>
<li><strong>Eco-conception</strong> : concevoir un produit en intégrant l'environnement dès la conception (réduction des matériaux, choix de matériaux recyclables, allongement de la durée de vie)</li>
</ul>

<h3>Les stratégies de fin de vie (règle des "R")</h3>
<div class="formula-box">Réduire → Réparer → Réutiliser → Reconditionner → Recycler → Valoriser (énergie) → Éliminer<br>Cet ordre représente les priorités environnementales, du meilleur au moins bon choix.</div>


<h3>Cahier des charges & besoin</h3>
<p>Tout projet technique démarre par l'expression d'un <strong>besoin</strong>, formalisé dans un <strong>cahier des charges fonctionnel (CdCF)</strong> qui liste les fonctions attendues et les contraintes (normes, budget, délais, impact environnemental).</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Classe ces actions selon la règle des "R", de la meilleure à la moins bonne option : donner un vieux vélo à un ami / réduire ses achats de vêtements neufs / recycler une bouteille en plastique.</p>`, aide:`Reprends l'ordre exact de la règle des R vu dans le cours : Réduire → Réparer → Réutiliser → ... → Recycler.`, correction:`<p><strong>Ordre correct</strong> :</p><p>1. Réduire ses achats de vêtements neufs (meilleure option — évite de consommer de nouvelles ressources)</p><p>2. Donner un vieux vélo à un ami (réemploi/réutilisation)</p><p>3. Recycler une bouteille en plastique (dernière option avant élimination — nécessite de retraiter la matière)</p>`},
{niveau:'Moyen', enonce:`<p>Deux produits ont le même prix et la même fonction, mais l'un a été éco-conçu et l'autre non. Donne 2 différences concrètes que tu pourrais observer entre les deux produits.</p>`, aide:`Pense aux critères de l'éco-conception vus dans le cours : quantité de matériaux utilisés, type de matériaux, durée de vie, possibilité de réparation/démontage...`, correction:`<p><strong>Différence 1</strong> : le produit éco-conçu utilisera probablement <mark>moins de matière première</mark> et des matériaux recyclables ou biosourcés, alors que l'autre pourrait utiliser des matériaux composites difficiles à recycler.</p><p><strong>Différence 2</strong> : le produit éco-conçu sera pensé pour être <mark>facilement démontable et réparable</mark> (vis plutôt que colle, pièces détachées disponibles), augmentant sa durée de vie, alors que l'autre sera peut-être conçu pour être remplacé rapidement (obsolescence).</p>`},
{niveau:'Difficile', enonce:`<p>Explique en quoi l'ACV (Analyse du Cycle de Vie) peut parfois donner des résultats contre-intuitifs — par exemple, pourquoi une tasse réutilisable en plastique peut avoir un impact environnemental plus important qu'une tasse jetable en carton si elle n'est utilisée que 2 ou 3 fois.</p>`, aide:`L'ACV prend en compte TOUTES les étapes, y compris la fabrication initiale. Pense à la quantité de ressources et d'énergie nécessaires pour fabriquer chaque type de tasse, puis divise par le nombre d'utilisations réelles.`, correction:`<p>Une tasse réutilisable nécessite généralement <mark>plus de ressources et d'énergie à la fabrication</mark> qu'une tasse jetable (matériaux plus solides, procédés plus complexes). Son avantage environnemental ne se révèle que si elle est utilisée <strong>de nombreuses fois</strong>, ce qui "amortit" cet impact initial sur un grand nombre d'utilisations.</p><p>Si elle n'est utilisée que 2-3 fois avant d'être jetée, l'impact total (fabrication + fin de vie) peut être supérieur à celui de plusieurs tasses jetables en carton, plus simples à produire. C'est pour cela que l'ACV raisonne toujours sur <mark>l'ensemble du cycle de vie</mark>, jamais sur une seule étape isolée (ici, la fabrication initiale ne suffit pas à juger).</p>`},
],
flashcards:[
{q:'Les 3 piliers du développement durable',a:'Environnemental (ressources/écosystèmes), Social (équité), Économique (viabilité). Indissociables.'},
{q:'ACV — définition',a:'Analyse du Cycle de Vie : évalue l\'impact environnemental d\'un produit à chaque étape, de l\'extraction des matières premières à la fin de vie.'},
{q:'Les 5 étapes du cycle de vie d\'un produit',a:'Extraction des matières premières → Production → Distribution → Utilisation → Fin de vie.'},
{q:'Empreinte carbone',a:'Quantité totale de CO₂ équivalent émise par un produit ou une activité sur l\'ensemble de son cycle de vie.'},
{q:'Éco-conception',a:'Démarche qui intègre les critères environnementaux dès la phase de conception d\'un produit (matériaux, durée de vie, recyclabilité).'},
{q:'Règle des "R" — fin de vie (ordre de priorité)',a:'Réduire > Réparer > Réutiliser > Reconditionner > Recycler > Valoriser énergétiquement > Éliminer.'},
{q:'Cahier des charges fonctionnel (CdCF)',a:'Document qui formalise le besoin : liste les fonctions attendues du produit et les contraintes à respecter (normes, coût, délai, environnement).'},
{q:'Différence recyclage / réemploi',a:'Réemploi : le produit est réutilisé tel quel pour le même usage. Recyclage : la matière est retraitée pour fabriquer un nouveau produit.'},
]},

'Structures & résistance des matériaux': {
cours:`<div class="attention-box"><h3>Comprendre pourquoi une structure tient</h3><p>Une structure reçoit des charges qui provoquent des efforts internes et des déformations. Selon la manière dont la charge agit, on peut rencontrer traction, compression, flexion, torsion ou cisaillement.</p><p>La forme compte autant que le matériau : une même quantité de matière peut être répartie différemment pour augmenter la rigidité. C'est pourquoi les poutres, nervures et profils ne sont pas dessinés au hasard.</p><h3>Comment raisonner sur une pièce ?</h3><p>Commence par identifier les forces et leurs points d'application, puis la façon dont la pièce est maintenue. Détermine ensuite le type de sollicitation dominant. Le choix du matériau et de la géométrie doit répondre à cette sollicitation avec une marge de sécurité suffisante.</p></div><hr><div class="attention-box"><h3>Comprendre pourquoi une structure tient</h3><p>Une structure reçoit des charges qui provoquent des efforts internes et des déformations. Selon la manière dont la charge agit, on peut rencontrer traction, compression, flexion, torsion ou cisaillement.</p><p>La forme compte autant que le matériau : une même quantité de matière peut être répartie différemment pour augmenter la rigidité. C'est pourquoi les poutres, nervures et profils ne sont pas dessinés au hasard.</p><h3>Comment raisonner sur une pièce ?</h3><p>Commence par identifier les forces et leurs points d'application, puis la façon dont la pièce est maintenue. Détermine ensuite le type de sollicitation dominant. Le choix du matériau et de la géométrie doit répondre à cette sollicitation avec une marge de sécurité suffisante.</p></div><hr><hr><h3>Pourquoi étudier les structures ?</h3>
<p>Une <strong>structure</strong> (poutre, châssis, pont, carcasse d'un produit) doit supporter des charges sans se déformer excessivement ni casser. L'étude des structures permet de <mark>dimensionner</mark> correctement une pièce : ni trop faible (risque de rupture), ni surdimensionnée (surcoût, surpoids inutile).</p>

<h3>Les efforts fondamentaux</h3>
<div class="formula-box">
<strong>Traction</strong> : la pièce est étirée, tirée dans le sens de sa longueur (ex : un câble qui soutient une charge).<br>
<strong>Compression</strong> : la pièce est comprimée, écrasée (ex : un pilier qui supporte un toit).<br>
<strong>Flexion</strong> : la pièce se courbe sous une charge perpendiculaire à sa longueur (ex : une étagère qui plie sous des livres).<br>
<strong>Torsion</strong> : la pièce est tordue autour de son axe (ex : un arbre de transmission qui tourne sous charge).<br>
<strong>Cisaillement</strong> : deux forces opposées et décalées "tranchent" la pièce (ex : une paire de ciseaux, un boulon soumis à un glissement).
</div>
<div class="retenir-box">Une même pièce réelle subit souvent <mark>plusieurs</mark> de ces efforts en même temps (ex : une poutre de pont subit flexion ET cisaillement) — savoir les identifier séparément est la première étape avant tout calcul.</div>

<h3>La notion de contrainte</h3>
<div class="formula-box">Contrainte $\\sigma = \\dfrac{F}{S}$ &nbsp;(en Pascal, Pa, ou souvent en MPa en pratique)<br>Avec F la force appliquée (en Newton) et S la section de la pièce (en m²).</div>
<p>La contrainte mesure l'intensité de l'effort <mark>rapportée à la surface</mark> qui le supporte — c'est pour ça qu'une pièce plus large résiste mieux à une même force : la contrainte qu'elle subit est plus faible, répartie sur une plus grande section.</p>


<h3>Résistance élastique limite et coefficient de sécurité</h3>
<p>Chaque matériau a une <strong>limite élastique</strong> (Re) : en dessous, il retrouve sa forme initiale après déformation (comportement élastique) ; au-delà, la déformation devient permanente (comportement plastique), jusqu'à la rupture.</p>
<div class="formula-box">Coefficient de sécurité $s = \\dfrac{Re}{\\sigma_{admissible}}$ &nbsp;— toujours $&gt; 1$ dans un dimensionnement réel, pour garder une marge de sécurité face aux incertitudes (qualité du matériau, charges imprévues, usure...).</div>

<h3>Le module d'Young : rigidité du matériau</h3>
<p>Le <strong>module d'Young</strong> (E, en GPa) caractérise la <mark>rigidité</mark> d'un matériau : plus il est élevé, plus le matériau se déforme peu sous une contrainte donnée (l'acier est bien plus rigide que le caoutchouc, par exemple). Ce n'est pas la même chose que la résistance : un matériau peut être rigide mais cassant (peu de déformation avant rupture), ou souple mais très résistant.</p>

<h3>Simplifier avant de calculer</h3>
<p>En bureau d'études, on modélise toujours une structure réelle par un schéma simplifié : <strong>poutre</strong> (appuis, charges ponctuelles ou réparties), avant tout calcul de contrainte ou de déformation. Cette étape de modélisation, souvent négligée, est pourtant celle qui détermine si le calcul qui suit aura un sens.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un câble d'ascenseur soutient une cabine suspendue. Quel type d'effort principal ce câble subit-il ?</p>`, aide:`Le câble est-il étiré, comprimé, courbé ou tordu par le poids de la cabine ?`, correction:`<p><strong>De la traction.</strong> Le câble est étiré dans le sens de sa longueur par le poids de la cabine suspendue — exactement la définition de la traction donnée dans le cours.</p>`},
{niveau:'Moyen', enonce:`<p>Une pièce métallique de section $S = 2\\,cm^2$ subit une force de traction $F = 4000\\,N$. Calcule la contrainte $\\sigma$ subie par la pièce, en MPa.</p>`, aide:`Utilise σ = F/S. Attention aux unités : convertis la section en m² avant de calculer (1 cm² = 10⁻⁴ m²), puis convertis le résultat en MPa (1 MPa = 10⁶ Pa) à la fin.`, correction:`<p>$S = 2\\,cm^2 = 2\\times10^{-4}\\,m^2$</p><p>$\\sigma = \\dfrac{F}{S} = \\dfrac{4000}{2\\times10^{-4}} = 2\\times10^{7}\\,Pa = 20\\,MPa$</p>`},
{niveau:'Difficile', enonce:`<p>Deux poutres, A et B, sont fabriquées dans le même matériau et soumises exactement à la même force de traction. La poutre A a une section 2 fois plus grande que la poutre B. Laquelle des deux a le coefficient de sécurité le plus élevé, et pourquoi ? Justifie avec les formules du cours.</p>`, aide:`Calcule d'abord comment la contrainte varie entre les deux poutres (même force, section différente), puis utilise la formule du coefficient de sécurité (qui dépend de la contrainte au dénominateur) pour en déduire lequel est le plus sûr.`, correction:`<p>À force égale, $\\sigma = F/S$ : la poutre A (section 2 fois plus grande) subit une contrainte 2 fois <mark>plus faible</mark> que la poutre B ($\\sigma_A = \\sigma_B / 2$).</p><p>Le coefficient de sécurité $s = Re/\\sigma$ étant <strong>inversement proportionnel</strong> à la contrainte (même Re, car même matériau), une contrainte plus faible donne un coefficient de sécurité plus <mark>élevé</mark>. La poutre A, avec sa plus grande section, a donc un coefficient de sécurité deux fois plus élevé que la poutre B — elle est structurellement plus sûre, au prix d'une masse de matière plus importante (souvent un compromis à arbitrer en conception réelle : sécurité vs masse/coût).</p>`},
],
flashcards:[
{q:'Les 5 efforts fondamentaux en structures',a:'Traction, compression, flexion, torsion, cisaillement.'},
{q:'Traction vs compression',a:'Traction : la pièce est étirée/tirée. Compression : la pièce est écrasée/comprimée.'},
{q:'Formule de la contrainte',a:'σ = F/S (Force en Newton / Section en m²), exprimée en Pascal (Pa) ou MPa.'},
{q:'Différence force / contrainte',a:'La force (N) est l\'action globale appliquée. La contrainte (Pa) rapporte cette force à la surface qui la supporte — une pièce plus large subit une contrainte plus faible à force égale.'},
{q:'Limite élastique (Re)',a:'Seuil en dessous duquel un matériau retrouve sa forme initiale après déformation (élastique) ; au-delà, la déformation devient permanente (plastique) jusqu\'à rupture.'},
{q:'Coefficient de sécurité — formule et règle',a:'s = Re / σ_admissible. Toujours supérieur à 1 dans un dimensionnement réel, pour garder une marge face aux incertitudes.'},
{q:'Module d\'Young (E)',a:'Caractérise la rigidité d\'un matériau — plus il est élevé, moins le matériau se déforme sous une contrainte donnée. Différent de la résistance (un matériau peut être rigide mais cassant).'},
{q:'Pourquoi modéliser une structure réelle en poutre simplifiée avant de calculer',a:'Cette étape détermine si le calcul qui suit aura un sens — une mauvaise modélisation fausse tout le dimensionnement, même avec des calculs corrects ensuite.'},
]},

'Systèmes automatisés : capteurs, actionneurs & GRAFCET': {
cours:`<div class="attention-box"><h3>Comprendre un système automatisé</h3><p>Un système automatisé doit <strong>percevoir, décider puis agir</strong>. Le capteur fournit une information sur l'état du système ; la partie commande traite cette information ; l'actionneur réalise l'action physique.</p><h3>Pourquoi le GRAFCET ?</h3><p>Le GRAFCET représente la succession des étapes et les conditions qui permettent de passer de l'une à l'autre. Une étape décrit un état ou une action active ; une transition indique la condition nécessaire pour continuer. Cela permet de transformer une description en langage courant en fonctionnement précis.</p><p>Pour construire un GRAFCET, pars du scénario réel : état initial → action → condition de fin → action suivante. Ne commence pas par dessiner des cases au hasard : le diagramme doit traduire le comportement du système.</p></div><hr><div class="attention-box"><h3>Comprendre un système automatisé</h3><p>Un système automatisé doit <strong>percevoir, décider puis agir</strong>. Le capteur fournit une information sur l'état du système ; la partie commande traite cette information ; l'actionneur réalise l'action physique.</p><h3>Pourquoi le GRAFCET ?</h3><p>Le GRAFCET représente la succession des étapes et les conditions qui permettent de passer de l'une à l'autre. Une étape décrit un état ou une action active ; une transition indique la condition nécessaire pour continuer. Cela permet de transformer une description en langage courant en fonctionnement précis.</p><p>Pour construire un GRAFCET, pars du scénario réel : état initial → action → condition de fin → action suivante. Ne commence pas par dessiner des cases au hasard : le diagramme doit traduire le comportement du système.</p></div><hr><hr><h3>La chaîne d'information et la chaîne d'énergie, en pratique</h3>
<p>Tout système automatisé (portail motorisé, ascenseur, distributeur automatique) répète le même schéma : <mark>acquérir</mark> une information sur le réel, <mark>traiter</mark> cette information, puis <mark>agir</mark> sur le réel.</p>
<div class="formula-box">
<strong>Capteur</strong> (acquérir) → <strong>Partie commande</strong> / microcontrôleur (traiter) → <strong>Actionneur</strong> (agir)<br>
Ex. portail automatique : cellule photoélectrique (capteur) → carte électronique (traiter) → moteur (actionneur, il agit sur l'ouvrant).
</div>

<h3>Les capteurs — acquérir une information</h3>
<ul>
<li><strong>Capteur Tout Ou Rien (TOR)</strong> : ne renvoie que 2 états possibles (0 ou 1). Ex : interrupteur de fin de course, cellule photoélectrique (obstacle détecté / pas d'obstacle).</li>
<li><strong>Capteur analogique</strong> : renvoie une valeur continue (une infinité de valeurs possibles). Ex : capteur de température, potentiomètre.</li>
<li><strong>Capteur numérique</strong> : renvoie directement une valeur codée en binaire, déjà exploitable par un microcontrôleur sans conversion. Ex : capteur de distance à ultrason avec sortie numérique.</li>
</ul>


<h3>Les actionneurs — agir sur le réel</h3>
<ul>
<li><strong>Moteur électrique (DC, pas-à-pas, servomoteur)</strong> : transforme l'énergie électrique en mouvement rotatif.</li>
<li><strong>Vérin (pneumatique/hydraulique)</strong> : transforme une pression (air/huile) en mouvement linéaire.</li>
<li><strong>Servomoteur</strong> : moteur dont on peut contrôler précisément l'angle (0° à 180° en général) — utilisé pour un positionnement exact, contrairement à un moteur DC classique qui tourne en continu.</li>
</ul>

<h3>Le GRAFCET — décrire le fonctionnement d'un système automatisé</h3>
<p>Le <strong>GRAFCET</strong> (Graphe Fonctionnel de Commande Étape-Transition) est un langage graphique qui décrit, étape par étape, le comportement attendu d'un système automatisé.</p>
<div class="formula-box">
<strong>Étape</strong> (rectangle numéroté) : un état stable du système, associé à une ou plusieurs <strong>actions</strong> (ce que fait le système pendant cette étape).<br>
<strong>Transition</strong> (trait horizontal sur la liaison entre 2 étapes) : associée à une <strong>réceptivité</strong> — une condition qui doit être vraie pour passer à l'étape suivante (ex : un capteur activé).<br>
<strong>Règle d'évolution</strong> : on ne franchit une transition que si l'étape précédente est active <mark>ET</mark> que sa réceptivité est vraie.
</div>
<div class="retenir-box">Un GRAFCET se lit comme une histoire : "tant que je suis dans cet état (étape), je fais telle action ; dès que telle condition devient vraie (réceptivité), je passe à l'état suivant." C'est cette lecture séquentielle qu'il faut savoir expliquer à l'oral.</div>

<h3>Exemple simple : portail automatique</h3>
<ol>
<li><strong>Étape 0</strong> : portail fermé, en attente. Action : aucune.</li>
<li><strong>Transition</strong> : réceptivité = badge détecté.</li>
<li><strong>Étape 1</strong> : ouverture du portail. Action : activer moteur sens ouverture.</li>
<li><strong>Transition</strong> : réceptivité = capteur fin de course "ouvert" activé.</li>
<li><strong>Étape 2</strong> : portail ouvert, temporisation de 10s. Action : attendre.</li>
<li><strong>Transition</strong> : réceptivité = 10s écoulées.</li>
<li><strong>Étape 3</strong> : fermeture. Action : activer moteur sens fermeture → retour à l'étape 0 une fois le capteur fin de course "fermé" activé.</li>
</ol>

<h3>Sécurité : les capteurs de sécurité dans un GRAFCET</h3>
<p>Dans l'exemple du portail, un vrai système ajoute une réceptivité de sécurité en parallèle (ex : cellule photoélectrique qui détecte un obstacle pendant la fermeture) qui interrompt ou inverse l'action en cours, indépendamment de la séquence normale — c'est ce qu'on appelle une <strong>reprise</strong> ou un <strong>arrêt d'urgence</strong> dans le GRAFCET.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un interrupteur de fin de course ne renvoie que deux états possibles : "appuyé" ou "relâché". De quel type de capteur s'agit-il ?</p>`, aide:`Combien de valeurs différentes ce capteur peut-il renvoyer ?`, correction:`<p><strong>Un capteur Tout Ou Rien (TOR).</strong> Il ne renvoie que 2 états possibles (0 ou 1), exactement comme un interrupteur de fin de course — contrairement à un capteur analogique qui renverrait une infinité de valeurs continues (comme un angle précis ou une distance).</p>`},
{niveau:'Moyen', enonce:`<p>Dans le GRAFCET du portail automatique du cours, à quelle condition précise passe-t-on de l'Étape 1 (ouverture) à l'Étape 2 (portail ouvert, temporisation) ?</p>`, aide:`Relis la règle d'évolution du GRAFCET : que faut-il pour franchir une transition ?`, correction:`<p>On passe de l'Étape 1 à l'Étape 2 quand <strong>l'Étape 1 est active ET que sa réceptivité devient vraie</strong>, c'est-à-dire ici : le capteur de fin de course "ouvert" est activé. Tant que ce capteur n'a pas détecté que le portail est complètement ouvert, le système reste en Étape 1 (moteur en sens ouverture), même si un peu de temps s'est écoulé.</p>`},
{niveau:'Difficile', enonce:`<p>Un capteur de température analogique doit être exploité par un microcontrôleur pour afficher une valeur numérique sur un écran. Explique pourquoi on ne peut pas relier directement ce capteur au microcontrôleur, et quel composant intermédiaire est nécessaire.</p>`, aide:`Relis l'encadré "attention" sur la différence entre grandeur analogique et grandeur numérique — qu'est-ce qu'un microcontrôleur sait traiter nativement ?`, correction:`<p>Un capteur analogique renvoie une <mark>grandeur continue</mark> (une infinité de valeurs possibles, par exemple une tension variant progressivement avec la température), alors qu'un microcontrôleur ne sait traiter que des valeurs <strong>numériques</strong> (binaires, un nombre fini de valeurs codées en 0 et 1).</p><p>Il faut donc un <strong>CAN (Convertisseur Analogique-Numérique)</strong> entre le capteur et le microcontrôleur : ce composant échantillonne la grandeur continue et la traduit en une valeur numérique codée sur un certain nombre de bits, exploitable ensuite par le programme du microcontrôleur pour, par exemple, calculer et afficher une température.</p>`},
],
flashcards:[
{q:'Chaîne d\'information — schéma en 3 blocs',a:'Capteur (acquérir) → Partie commande / microcontrôleur (traiter) → Actionneur (agir).'},
{q:'Capteur TOR vs analogique vs numérique',a:'TOR : 2 états seulement (0/1). Analogique : grandeur continue, infinité de valeurs. Numérique : déjà codé en binaire, directement exploitable.'},
{q:'CAN (Convertisseur Analogique-Numérique) — à quoi ça sert',a:'Traduit une grandeur analogique continue en valeur numérique binaire, pour qu\'un microcontrôleur puisse la traiter.'},
{q:'Servomoteur vs moteur DC classique',a:'Le servomoteur permet un positionnement angulaire précis et contrôlé. Le moteur DC classique tourne en continu sans contrôle fin de l\'angle.'},
{q:'GRAFCET — définition',a:'Langage graphique (Graphe Fonctionnel de Commande Étape-Transition) qui décrit étape par étape le comportement attendu d\'un système automatisé.'},
{q:'Étape vs Transition dans un GRAFCET',a:'Étape = état stable associé à des actions. Transition = condition (réceptivité) qui doit être vraie pour passer à l\'étape suivante.'},
{q:'Règle d\'évolution du GRAFCET',a:'On ne franchit une transition que si l\'étape précédente est active ET que sa réceptivité est vraie.'},
{q:'Vérin — usage',a:'Actionneur qui transforme une pression (pneumatique ou hydraulique) en mouvement linéaire.'},
]},

'Cours 1 — Approche design : conception, démarche & brevet': {
cours:`<div class="attention-box"><h3>Comprendre une démarche de conception</h3><p>Concevoir un objet ne consiste pas à dessiner directement la première idée. On part d'un <strong>besoin</strong>, on transforme ce besoin en fonctions et contraintes, puis on imagine plusieurs solutions avant de choisir et tester.</p><p>Le cahier des charges sert à rendre le besoin mesurable : coût maximal, dimensions, sécurité, ergonomie, performance, matériaux, etc. Une solution n'est donc pas « bonne » parce qu'elle paraît jolie ; elle est bonne si elle satisfait les fonctions et contraintes définies.</p><h3>Pourquoi un brevet ?</h3><p>Le brevet protège une invention répondant à des conditions précises. Il ne protège pas simplement une idée vague. Comprendre cette différence permet de relier innovation, conception et propriété industrielle.</p></div><hr><div class="attention-box"><h3>Comprendre une démarche de conception</h3><p>Concevoir un objet ne consiste pas à dessiner directement la première idée. On part d'un <strong>besoin</strong>, on transforme ce besoin en fonctions et contraintes, puis on imagine plusieurs solutions avant de choisir et tester.</p><p>Le cahier des charges sert à rendre le besoin mesurable : coût maximal, dimensions, sécurité, ergonomie, performance, matériaux, etc. Une solution n'est donc pas « bonne » parce qu'elle paraît jolie ; elle est bonne si elle satisfait les fonctions et contraintes définies.</p><h3>Pourquoi un brevet ?</h3><p>Le brevet protège une invention répondant à des conditions précises. Il ne protège pas simplement une idée vague. Comprendre cette différence permet de relier innovation, conception et propriété industrielle.</p></div><hr><hr><div class="formula-box">
<strong>Cours 1 : Conception des produits &amp; développement durable — « Approche design »</strong><br>
Programme : § 1.1.3 approche design et architecturale des produits · § 1.3.1 paramètres de la compétitivité (notions de brevet, d'ergonomie) · § 1.5.1 cycle de vie d'un produit.
</div>

<h3>1. Le design : bien plus que l'esthétique</h3>
<p>La notion de design n'est pas seulement associée à l'aspect esthétique : elle désigne la <strong>conception globale</strong> d'un produit. Un produit design doit répondre à plusieurs aspects à la fois.</p>
<div class="retenir-box">Les <mark>6 aspects</mark> d'un produit design : <strong>fonctionnel, ergonomique, économique, inoffensif, environnemental (écologique), esthétique</strong>.</div>
<ul>
<li><strong>Fonctionnel</strong> : l'objet doit d'abord remplir une fonction, donc répondre à un besoin grâce à diverses fonctionnalités.</li>
<li><strong>Ergonomique</strong> : l'objet doit être pratique et adapté à l'usage. Il peut avoir des formes adaptées à l'homme et des fonctionnalités qui le rendent facile à utiliser.</li>
<li><strong>Économique</strong> : l'objet doit être accessible économiquement.</li>
<li><strong>Inoffensif</strong> : l'objet ne doit pas être dangereux pour son utilisateur.</li>
<li><strong>Environnemental / écologique</strong> : le cycle de vie de l'objet doit être considéré dans sa globalité (voir ci-dessous).</li>
<li><strong>Esthétique</strong> : l'objet doit plaire et cibler son public.</li>
</ul>

<h3>Le cycle de vie d'un produit (aspect environnemental)</h3>
<div class="formula-box">Extraction des matières premières → Transport → Fabrication → Distribution → Utilisation → Fin de vie</div>
<p>Pour juger l'impact environnemental d'un objet, on regarde <mark>toutes</mark> ces étapes, pas seulement la fabrication.</p>

<h3>Exemple 1 : le presse-agrumes de Philippe Starck (1988)</h3>
<ul>
<li><strong>Matériau</strong> : fonte d'aluminium (robustesse relative).</li>
<li><strong>Ergonomie</strong> : 13,7 cm × 11,4 cm × 30,5 cm, dimensions qui découlent de la compacité et de la facilité de rangement.</li>
<li><strong>Environnemental</strong> : point d'interrogation dans le cours (à discuter).</li>
<li><strong>Économique</strong> : 70 €.</li>
<li><strong>Fonctionnel</strong> : pas besoin de récipient pour récupérer le jus.</li>
<li><strong>Esthétique</strong> : silhouette de calamar.</li>
</ul>
<p>Starck a dessiné les premières idées de cet objet sur le set de table d'un restaurant (le croquis figure dans ton cours).</p>

<h3>Exemple 2 : le stylo Bic du baron Bich et de Laszlo Biro</h3>
<p><strong>Biro</strong> a inventé le principe de la bille, et le <strong>baron Bich</strong> a négocié l'utilisation du brevet et a repensé le design du stylo à bille.</p>
<ul>
<li><strong>Fonctionnalité</strong> : il écrit grâce à la bille, l'encre reste dans le stylo.</li>
<li><strong>Ergonomique</strong> : forme hexagonale pour la prise en main, et il ne roule pas.</li>
<li><strong>Économique</strong> : très bon marché (environ 0,39 €).</li>
<li><strong>Inoffensif</strong> : bouchon percé à l'extrémité pour éviter l'étouffement en cas d'ingestion.</li>
<li><strong>Environnemental</strong> : stylo jetable.</li>
<li><strong>Esthétisme</strong> : transparent, forme nid d'abeille, bouchon fuselé.</li>
</ul>

<h3>2. La démarche design en 5 étapes</h3>
<p>Une étude de design se réalise en suivant une démarche structurée en 5 étapes :</p>
<ol>
<li><strong>Définition de l'objectif</strong> : se mettre d'accord sur l'objet de l'étude de design, ses limites et l'objectif à atteindre.</li>
<li><strong>Idéation et investigation</strong> : chercher des idées nouvelles par créativité ou investigation.</li>
<li><strong>Cristallisation</strong> : sélectionner les idées répondant le mieux à l'objectif, et décrire comment elles seront utilisées pour modifier le produit.</li>
<li><strong>Matérialisation</strong> : souvent en 3 temps : maquettage (carton…), modélisation 3D, prototypage (impression 3D).</li>
<li><strong>Intégration</strong> : implanter les nouveaux éléments et vérifier qu'ils s'intègrent correctement au produit.</li>
</ol>


<h3>3. Propriété intellectuelle — notions de brevet</h3>
<p>La propriété intellectuelle se divise en deux catégories : la <strong>propriété industrielle</strong> et la <strong>propriété littéraire et artistique</strong>. La propriété industrielle a pour objet la protection et la valorisation des inventions, des innovations et des créations.</p>
<div class="formula-box">
<strong>Le dépôt de brevet</strong> :<br>
• est un acte officiel de propriété industrielle ;<br>
• accorde un <strong>monopole d'exploitation</strong> au demandeur sur son invention, sur le territoire français, pour <strong>20 ans au maximum</strong> ;<br>
• <strong>interdit toute exploitation</strong> (utilisation, fabrication, importation…) de l'invention sans autorisation.
</div>
<p><strong>Exemple de brevet</strong> : le stylographe, ancêtre du stylo Bic. Brevet d'invention n° 853.022 de M. Biro (Laszlo, Jozsef), résidant en Hongrie. Demandé le 29 octobre 1938 à Paris, délivré le 18 novembre 1939, publié le 8 mars 1940.</p>

<h3>4. Métiers liés au design</h3>
<p>Les vidéos du cours présentent les métiers de designer, concepteur de produits innovants, concepteur de prothèse 3D, architecte et bureau d'étude.</p>

<div class="retenir-box">Points à maîtriser pour l'éval : citer les <mark>6 aspects</mark> du design et analyser un objet avec ; les <mark>6 étapes du cycle de vie</mark> ; les <mark>5 étapes de la démarche design</mark> ; ce que donne un <mark>brevet</mark> (monopole, 20 ans max, territoire français, interdit toute exploitation sans autorisation).</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Écris dans l'ordre les 5 étapes de la démarche design.</p>`, aide:`La première consiste à se mettre d'accord sur l'objectif, la dernière à vérifier que tout s'intègre au produit.`, correction:`<p><strong>1.</strong> Définition de l'objectif · <strong>2.</strong> Idéation et investigation · <strong>3.</strong> Cristallisation · <strong>4.</strong> Matérialisation · <strong>5.</strong> Intégration.</p>`},
{niveau:'Moyen', enonce:`<p>Analyse le presse-agrumes de Philippe Starck avec les aspects du design : donne pour chaque aspect ce que dit le cours, et indique lequel reste une question.</p>`, aide:`Reprends les 6 aspects un par un et cherche l'information correspondante dans la fiche de l'objet.`, correction:`<p><strong>Fonctionnel</strong> : presse les agrumes, sans récipient pour récupérer le jus. <strong>Ergonomique</strong> : 13,7 × 11,4 × 30,5 cm, compact et facile à ranger. <strong>Économique</strong> : 70 € (à comparer avec le Bic, très bon marché). <strong>Esthétique</strong> : silhouette de calamar. <strong>Environnemental</strong> : c'est le point d'interrogation du cours (matériau : fonte d'aluminium). <strong>Inoffensif</strong> : non précisé dans la fiche.</p>`},
{niveau:'Difficile', enonce:`<p>Le baron Bich a dû négocier avec Biro avant de fabriquer son stylo à bille. Explique pourquoi, en citant ce que permet un brevet, puis dis ce que Bich a apporté de son côté.</p>`, aide:`Pense au monopole d'exploitation et à l'interdiction d'exploiter sans autorisation. Bich a « repensé » quelque chose.`, correction:`<p>Biro avait inventé le principe de la bille. Un brevet accorde un <strong>monopole d'exploitation</strong> à son titulaire (sur le territoire français, 20 ans au maximum) et <strong>interdit toute exploitation</strong> (utilisation, fabrication, importation) de l'invention sans autorisation. Bich devait donc <mark>négocier l'utilisation du brevet</mark> avant de produire. Il a ensuite <strong>repensé le design</strong> du stylo (forme hexagonale, transparent, bouchon fuselé et percé…) pour en faire un objet pratique et bon marché.</p>`},
],
flashcards:[
{q:'Le design, c\'est seulement l\'esthétique ?',a:'Non : c\'est la conception globale d\'un produit, qui doit répondre à plusieurs aspects à la fois.'},
{q:'Les 6 aspects d\'un produit design',a:'Fonctionnel, ergonomique, économique, inoffensif, environnemental (écologique), esthétique.'},
{q:'Aspect fonctionnel',a:'L\'objet doit d\'abord remplir une fonction, donc répondre à un besoin grâce à diverses fonctionnalités.'},
{q:'Aspect ergonomique',a:'L\'objet doit être pratique et adapté à l\'usage : formes adaptées à l\'homme, facile à utiliser.'},
{q:'Aspect inoffensif',a:'L\'objet ne doit pas être dangereux pour son utilisateur.'},
{q:'Aspect esthétique',a:'L\'objet doit plaire et cibler son public.'},
{q:'Les 6 étapes du cycle de vie d\'un produit (ordre du cours)',a:'Extraction des matières premières, transport, fabrication, distribution, utilisation, fin de vie.'},
{q:'Les 5 étapes de la démarche design',a:'Définition de l\'objectif, idéation et investigation, cristallisation, matérialisation, intégration.'},
{q:'Cristallisation (étape 3)',a:'Sélectionner les idées répondant le mieux à l\'objectif et décrire comment elles seront utilisées pour modifier le produit.'},
{q:'Matérialisation (étape 4) : les 3 temps',a:'Maquettage (carton…), modélisation 3D, prototypage (impression 3D).'},
{q:'Les 2 catégories de propriété intellectuelle',a:'Propriété industrielle, et propriété littéraire et artistique.'},
{q:'Que donne un brevet ?',a:'Un monopole d\'exploitation sur le territoire français pour 20 ans au maximum, et l\'interdiction de toute exploitation (utilisation, fabrication, importation) sans autorisation.'},
{q:'Presse-agrumes de Philippe Starck : chiffres clés',a:'Créé en 1988, fonte d\'aluminium, 13,7 × 11,4 × 30,5 cm, 70 €, silhouette de calamar, pas de récipient nécessaire.'},
{q:'Stylo Bic : rôle de Biro et de Bich',a:'Biro a inventé le principe de la bille ; le baron Bich a négocié l\'utilisation du brevet et a repensé le design du stylo.'},
{q:'Brevet du stylographe (ancêtre du Bic)',a:'N° 853.022, M. Biro (Hongrie), demandé le 29 octobre 1938, délivré le 18 novembre 1939, publié le 8 mars 1940.'},
]},
};
