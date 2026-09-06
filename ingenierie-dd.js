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
<p>Étudie comment un système <strong>produit, stocke, distribue et convertit</strong> l'énergie.</p>
<ul>
<li><strong>Chaîne d'énergie</strong> : Alimenter → Distribuer → Convertir → Transmettre → Action mécanique</li>
<li><strong>Sources</strong> : réseau électrique, batterie, panneau solaire, éolien, pile à combustible</li>
<li><strong>Convertisseurs</strong> : moteur électrique (électrique → mécanique), moteur thermique, vérin (pneumatique/hydraulique → mécanique)</li>
<li><strong>Rendement</strong> : η = Puissance utile / Puissance absorbée (toujours &lt; 1, pertes en chaleur/frottements)</li>
</ul>

<h3>2. Champ Information</h3>
<p>Étudie comment un système <strong>acquiert, traite, communique</strong> les données.</p>
<ul>
<li><strong>Chaîne d'information</strong> : Acquérir → Traiter → Communiquer</li>
<li><strong>Capteurs</strong> : acquièrent une grandeur physique (température, distance, luminosité, position) et la convertissent en signal électrique</li>
<li><strong>Traitement</strong> : microcontrôleur, carte programmable (Arduino, Raspberry Pi) qui exécute un algorithme/programme</li>
<li><strong>Communication</strong> : filaire (bus CAN, I2C) ou sans fil (Wifi, Bluetooth, radio)</li>
</ul>

<h3>3. Champ Matière</h3>
<p>Étudie le <strong>choix, la transformation et le comportement des matériaux</strong>.</p>
<ul>
<li><strong>Familles de matériaux</strong> : métalliques, polymères (plastiques), céramiques, composites, matériaux biosourcés</li>
<li><strong>Propriétés mécaniques</strong> : résistance, rigidité, dureté, ductilité, élasticité</li>
<li><strong>Procédés de transformation</strong> : usinage, moulage/injection, impression 3D, découpe laser, assemblage</li>
<li><strong>Choix d'un matériau</strong> : dépend du cahier des charges (contraintes mécaniques, coût, masse, impact environnemental, recyclabilité)</li>
</ul>

<div class="formula-box">Un produit technique = interaction permanente entre les 3 champs. Ex : un vélo à assistance électrique combine Énergie (batterie/moteur), Information (capteur de pédalage, contrôleur) et Matière (cadre aluminium/carbone).</div>`,
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
<p>L'<strong>Analyse du Cycle de Vie</strong> évalue l'impact environnemental d'un produit à chaque étape, "du berceau à la tombe" :</p>
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
