/* ============================================================
   BACMASTER — data/cybersecurite.js
   Cours et flashcards — Cybersécurité (culture perso)
   ============================================================ */

PREBUILT['Cybersécurité'] = {

'Les menaces & attaques courantes': {
cours:`<h3>Le phishing (hameçonnage)</h3>
<p>Technique qui consiste à se faire passer pour une entité de confiance (banque, administration, entreprise) pour voler des informations (mots de passe, numéro de carte bancaire).</p>
<ul>
<li>Souvent par email ou SMS ("smishing") avec un lien vers un faux site imitant le vrai</li>
<li><strong>Signaux d'alerte</strong> : urgence artificielle, fautes d'orthographe, adresse d'expéditeur bizarre, lien qui ne correspond pas au vrai domaine</li>
</ul>

<h3>Les malwares (logiciels malveillants)</h3>
<div class="formula-box">
<strong>Virus</strong> : s'attache à un programme légitime et se propage quand il est exécuté.<br>
<strong>Ver (worm)</strong> : se propage seul sur un réseau, sans action de l'utilisateur.<br>
<strong>Cheval de Troie (trojan)</strong> : se cache dans un logiciel qui semble légitime.<br>
<strong>Ransomware (rançongiciel)</strong> : chiffre les fichiers de la victime et demande une rançon pour les débloquer.<br>
<strong>Spyware</strong> : espionne l'activité de l'utilisateur (frappe au clavier, navigation) sans qu'il le sache.
</div>

<h3>L'ingénierie sociale</h3>
<p>Manipulation psychologique pour pousser une personne à divulguer des informations ou effectuer une action (au lieu d'attaquer directement un système technique). Ex : se faire passer pour un technicien IT au téléphone pour obtenir un mot de passe.</p>

<h3>Autres attaques courantes</h3>
<ul>
<li><strong>Attaque par force brute</strong> : tester automatiquement un grand nombre de mots de passe jusqu'à trouver le bon</li>
<li><strong>Attaque par déni de service (DDoS)</strong> : submerger un serveur de requêtes pour le rendre inaccessible</li>
<li><strong>Man-in-the-middle</strong> : un attaquant s'interpose entre deux parties pour intercepter/modifier leurs échanges (ex : sur un Wifi public non sécurisé)</li>
<li><strong>Injection SQL</strong> : insérer du code malveillant dans un champ de formulaire pour manipuler une base de données</li>
</ul>`,
flashcards:[
{q:'Phishing — définition',a:'Technique consistant à se faire passer pour une entité de confiance (banque, administration) pour voler des informations sensibles, souvent par email ou SMS.'},
{q:'3 signaux d\'alerte d\'un email de phishing',a:'Urgence artificielle, fautes d\'orthographe, adresse d\'expéditeur ou lien qui ne correspond pas au vrai domaine.'},
{q:'Ransomware',a:'Logiciel malveillant qui chiffre les fichiers de la victime et exige une rançon pour les déverrouiller.'},
{q:'Différence virus / ver (worm)',a:'Virus : nécessite un programme hôte et une action de l\'utilisateur pour se propager. Ver : se propage seul sur un réseau, sans action requise.'},
{q:'Cheval de Troie (trojan)',a:'Malware caché dans un logiciel qui paraît légitime, qui exécute une action malveillante une fois installé.'},
{q:'Spyware',a:'Logiciel espion qui surveille l\'activité de l\'utilisateur (frappes clavier, navigation) à son insu.'},
{q:'Ingénierie sociale',a:'Manipulation psychologique visant à pousser une personne à divulguer des informations ou effectuer une action, sans attaque technique directe.'},
{q:'Attaque par force brute',a:'Tester automatiquement un très grand nombre de mots de passe jusqu\'à trouver le bon.'},
{q:'Attaque DDoS',a:'Déni de service distribué : submerger un serveur de requêtes (souvent via un réseau d\'appareils infectés) pour le rendre inaccessible.'},
{q:'Man-in-the-middle',a:'Attaque où le pirate s\'interpose entre deux parties pour intercepter ou modifier leurs échanges, fréquente sur Wifi public non sécurisé.'},
{q:'Injection SQL',a:'Insertion de code malveillant dans un champ de saisie (formulaire) pour manipuler ou accéder à une base de données.'},
]},

'Se protéger : bonnes pratiques': {
cours:`<h3>Mots de passe robustes</h3>
<ul>
<li><strong>Longueur avant tout</strong> : 12-16 caractères minimum, plus important que la complexité seule</li>
<li>Un mot de passe <strong>unique par service</strong> — jamais réutilisé</li>
<li>Utiliser un <strong>gestionnaire de mots de passe</strong> (Bitwarden, KeePass...) pour générer et stocker des mots de passe forts sans avoir à les retenir</li>
<li>Éviter : date de naissance, prénom, "123456", suites de clavier</li>
</ul>

<h3>Authentification à double facteur (2FA/MFA)</h3>
<p>Ajoute une deuxième preuve d'identité en plus du mot de passe : code envoyé par SMS, application d'authentification (Google Authenticator), clé physique. Même si le mot de passe est volé, le compte reste protégé.</p>

<h3>Le chiffrement</h3>
<div class="formula-box">
<strong>Chiffrement symétrique</strong> : même clé pour chiffrer et déchiffrer (rapide, mais la clé doit être partagée en secret).<br>
<strong>Chiffrement asymétrique</strong> : une clé publique (pour chiffrer, partageable) et une clé privée (pour déchiffrer, secrète). Base du HTTPS et de la signature électronique.
</div>

<h3>VPN (Virtual Private Network)</h3>
<p>Crée un tunnel chiffré entre l'appareil et un serveur distant. Utile sur Wifi public pour empêcher l'interception du trafic, et masque l'adresse IP réelle. Ne rend pas anonyme à 100% : le fournisseur du VPN peut voir le trafic.</p>

<h3>Bonnes pratiques au quotidien</h3>
<ul>
<li><strong>Mises à jour</strong> : toujours installer les mises à jour de sécurité (elles corrigent des failles connues)</li>
<li><strong>Sauvegardes régulières</strong> : protège contre les ransomwares et pannes matérielles (règle du 3-2-1 : 3 copies, 2 supports différents, 1 hors site)</li>
<li><strong>Vérifier les liens/pièces jointes</strong> avant de cliquer, surtout si l'expéditeur est inattendu</li>
<li><strong>Verrouiller ses appareils</strong> avec code/biométrie</li>
</ul>

<h3>RGPD (Règlement Général sur la Protection des Données)</h3>
<p>Loi européenne qui encadre la collecte et le traitement des données personnelles. Elle donne aux utilisateurs le droit d'accès, de rectification et de suppression de leurs données, et impose aux entreprises un consentement explicite avant collecte.</p>`,
flashcards:[
{q:'Critère le plus important pour un mot de passe fort',a:'La longueur (12-16 caractères minimum) compte plus que la seule complexité des caractères.'},
{q:'Pourquoi utiliser un mot de passe unique par service ?',a:'Si un service est piraté et le mot de passe volé, les autres comptes restent protégés (évite l\'effet domino).'},
{q:'Authentification à double facteur (2FA)',a:'Ajoute une deuxième preuve d\'identité en plus du mot de passe (code SMS, appli d\'authentification, clé physique).'},
{q:'Chiffrement symétrique vs asymétrique',a:'Symétrique : même clé pour chiffrer/déchiffrer. Asymétrique : clé publique pour chiffrer, clé privée secrète pour déchiffrer (base du HTTPS).'},
{q:'À quoi sert un VPN ?',a:'Crée un tunnel chiffré vers un serveur distant : protège le trafic sur Wifi public et masque l\'adresse IP réelle.'},
{q:'Le VPN rend-il totalement anonyme ?',a:'Non — le fournisseur du VPN peut voir le trafic qui transite par ses serveurs.'},
{q:'Pourquoi installer les mises à jour de sécurité ?',a:'Elles corrigent des failles de sécurité connues, souvent exploitées par les attaquants si le système reste non mis à jour.'},
{q:'Règle de sauvegarde 3-2-1',a:'3 copies des données, sur 2 supports différents, dont 1 conservée hors site — protège contre pannes et ransomwares.'},
{q:'RGPD',a:'Règlement Général sur la Protection des Données : loi européenne encadrant la collecte des données personnelles, avec droit d\'accès/rectification/suppression pour les utilisateurs.'},
{q:'Gestionnaire de mots de passe — utilité',a:'Génère et stocke des mots de passe forts et uniques par service, sans que l\'utilisateur ait à les mémoriser.'},
]},
};
