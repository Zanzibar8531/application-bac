/* ============================================================
   BACMASTER — data/ingenierie-dd.js
   Cours et flashcards — Ingénierie & Développement Durable (I2D)
   Spécialité STI2D — 9h/semaine
   ============================================================ */

PREBUILT['Ingénierie & Dév. Durable'] = {

'Les 3 champs : Énergie, Information, Matière': {
cours:`<h3>La démarche d'analyse en I2D</h3>
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
cours:`<h3>Les 3 piliers du développement durable</h3>
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
<div class="attention-box">L'<mark>ordre</mark> de cette règle est souvent testé : le recyclage n'est PAS la meilleure option — réduire et réparer passent avant, car ils évitent de consommer de nouvelles ressources.</div>

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
};
