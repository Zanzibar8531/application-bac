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
<div class="attention-box">Avant de cliquer sur un lien "urgent" (banque, colis bloqué...), vérifie toujours <mark>l'adresse réelle du lien</mark> (survoler sans cliquer) et l'adresse de l'expéditeur — c'est le réflexe n°1 contre le phishing.</div>

<h3>Les malwares (logiciels malveillants)</h3>
<div class="formula-box">
<strong>Virus</strong> : s'attache à un programme légitime et se propage quand il est exécuté.<br>
<strong>Ver (worm)</strong> : se propage seul sur un réseau, sans action de l'utilisateur.<br>
<strong>Cheval de Troie (trojan)</strong> : se cache dans un logiciel qui semble légitime.<br>
<strong>Ransomware (rançongiciel)</strong> : chiffre les fichiers de la victime et demande une rançon pour les débloquer.<br>
<strong>Spyware</strong> : espionne l'activité de l'utilisateur (frappe au clavier, navigation) sans qu'il le sache.
</div>

<h3>L'ingénierie sociale</h3>
<p><mark>Manipulation psychologique</mark> pour pousser une personne à divulguer des informations ou effectuer une action (au lieu d'attaquer directement un système technique). Ex : se faire passer pour un technicien IT au téléphone pour obtenir un mot de passe.</p>

<h3>Autres attaques courantes</h3>
<ul>
<li><strong>Attaque par force brute</strong> : tester automatiquement un grand nombre de mots de passe jusqu'à trouver le bon</li>
<li><strong>Attaque par déni de service (DDoS)</strong> : submerger un serveur de requêtes pour le rendre inaccessible</li>
<li><strong>Man-in-the-middle</strong> : un attaquant s'interpose entre deux parties pour intercepter/modifier leurs échanges (ex : sur un Wifi public non sécurisé)</li>
<li><strong>Injection SQL</strong> : insérer du code malveillant dans un champ de formulaire pour manipuler une base de données</li>
</ul>`,
exercices:[
{niveau:'Facile', enonce:`<p>Tu reçois un SMS "Votre colis est bloqué, cliquez ici sous 24h pour éviter des frais : [lien]". Quel est le réflexe n°1 à avoir avant de cliquer ?</p>`, aide:`Relis l'encadré "attention" du cours — quelle vérification simple faut-il toujours faire avant de cliquer sur un lien "urgent" ?`, correction:`<p>Vérifier <strong>l'adresse réelle du lien</strong> (en le survolant sans cliquer, ou en regardant l'URL complète) et l'adresse de l'expéditeur, avant toute autre action. L'urgence artificielle ("sous 24h") est elle-même un signal d'alerte classique de phishing, destiné à pousser à agir sans réfléchir.</p>`},
{niveau:'Moyen', enonce:`<p>Un fichier téléchargé sur internet chiffre soudainement tous tes documents et affiche un message demandant de payer pour les récupérer. De quel type de malware s'agit-il, et quelle est la différence avec un simple virus classique ?</p>`, aide:`Le mot-clé "chiffre les fichiers + demande une rançon" correspond exactement à un des malwares du cours.`, correction:`<p>C'est un <strong>ransomware</strong> (rançongiciel). Contrairement à un virus classique qui cherche à se propager en s'attachant à un programme légitime, le ransomware a un objectif direct : rendre les fichiers de la victime inutilisables (chiffrement) pour extorquer de l'argent en échange de la clé de déchiffrement.</p>`},
{niveau:'Difficile', enonce:`<p>Un employé reçoit un appel d'une personne se présentant comme "le service informatique de l'entreprise", qui lui demande son mot de passe pour "résoudre un problème urgent sur son compte". L'employé, sans vérifier, le donne. Aucun logiciel malveillant n'a été utilisé. Quel type d'attaque est-ce, et pourquoi ce genre d'attaque est-il souvent plus efficace qu'une attaque purement technique ?</p>`, aide:`Le cours distingue les attaques qui ciblent un système technique de celles qui ciblent directement une personne — laquelle des deux est en jeu ici, sachant qu'aucun outil technique n'a été utilisé ?`, correction:`<p>C'est de l'<strong>ingénierie sociale</strong> : l'attaquant ne cible pas une faille technique du système, mais exploite directement la confiance et la psychologie humaine (ici, l'autorité perçue du "service informatique" et l'urgence).</p><p>Ce type d'attaque est souvent redoutablement efficace car il contourne complètement les protections techniques (pare-feu, antivirus, chiffrement...) : peu importe la qualité de la sécurité technique d'une entreprise, si un humain donne volontairement l'information sensible, aucune barrière technique ne peut l'en empêcher. C'est pour cela que la sensibilisation des utilisateurs est une composante essentielle de la cybersécurité, au même titre que les outils techniques.</p>`},
],
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
<li>Un mot de passe <mark>unique par service</mark> — jamais réutilisé</li>
<li>Utiliser un <strong>gestionnaire de mots de passe</strong> (Bitwarden, KeePass...) pour générer et stocker des mots de passe forts sans avoir à les retenir</li>
<li>Éviter : date de naissance, prénom, "123456", suites de clavier</li>
</ul>
<div class="retenir-box">Si tu ne dois retenir qu'une seule règle : <mark>un mot de passe unique par service</mark>. Si un site est piraté, seul ce compte est touché — pas tous les autres.</div>

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
<p>Loi européenne qui encadre la collecte et le traitement des données personnelles. Elle donne aux utilisateurs le <mark>droit d'accès, de rectification et de suppression</mark> de leurs données, et impose aux entreprises un consentement explicite avant collecte.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Entre un mot de passe de 8 caractères très complexe (symboles, chiffres, majuscules) et un mot de passe de 16 caractères composé de 4 mots simples mis bout à bout, lequel est en général considéré comme le plus solide selon le cours, et pourquoi ?</p>`, aide:`Relis le tout premier point du cours sur les mots de passe robustes — quel critère est mis en avant "avant tout" ?</p>`, correction:`<p>Le mot de passe de <strong>16 caractères</strong>, car la <mark>longueur</mark> compte davantage que la seule complexité des caractères utilisés. Un mot de passe long est mathématiquement bien plus difficile à casser par force brute qu'un mot de passe court, même très complexe.</p>`},
{niveau:'Moyen', enonce:`<p>Tu utilises le même mot de passe sur 5 sites différents. L'un de ces sites subit un piratage et ton mot de passe est volé. Explique concrètement le risque, et la bonne pratique qui aurait pu l'éviter.</p>`, aide:`Pense à ce qu'un attaquant peut faire avec un mot de passe volé sur UN site, s'il sait que les gens réutilisent souvent le même mot de passe partout.</p>`, correction:`<p>L'attaquant peut tenter ce même mot de passe (souvent associé au même email) sur d'autres sites connus (banque, réseaux sociaux...) — c'est ce qu'on appelle le <mark>credential stuffing</mark>. Comme le mot de passe est identique partout, un seul piratage suffit à compromettre potentiellement les 5 comptes.</p><p>La bonne pratique : un <strong>mot de passe unique par service</strong>, idéalement généré et stocké par un gestionnaire de mots de passe — ainsi, le piratage d'un site n'affecte que ce compte-là.</p>`},
{niveau:'Difficile', enonce:`<p>Explique pourquoi le chiffrement asymétrique (clé publique/clé privée) est indispensable pour sécuriser une connexion HTTPS, alors que le chiffrement symétrique semble plus simple et plus rapide. Quel problème concret le chiffrement symétrique seul ne pourrait-il pas résoudre entre ton navigateur et un serveur que tu n'as jamais contacté avant ?</p>`, aide:`Le chiffrement symétrique utilise la MÊME clé des deux côtés. Comment ton navigateur et un serveur inconnu pourraient-ils se mettre d'accord sur cette clé secrète commune, sans jamais l'échanger "en clair" (donc interceptable) sur le réseau ?</p>`, correction:`<p>Le problème du chiffrement symétrique seul est l'<mark>échange initial de la clé secrète</mark> : pour chiffrer/déchiffrer avec la même clé, il faudrait d'abord que le navigateur et le serveur se mettent d'accord sur cette clé — mais s'ils l'échangent sur le réseau sans protection, un attaquant en position d'interception (man-in-the-middle) pourrait la voler.</p><p>Le chiffrement <strong>asymétrique</strong> résout ce problème : le serveur peut diffuser librement sa clé publique (elle sert uniquement à chiffrer, pas à déchiffrer), et seul le serveur qui détient la clé privée correspondante peut déchiffrer les messages. En pratique, HTTPS utilise l'asymétrique au tout début de la connexion (échange de clés sécurisé), puis bascule sur du symétrique (plus rapide) pour le reste de la session — le meilleur des deux mondes.</p>`},
],
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

'Accès à distance à tes appareils (légal)': {
cours:`<h3>La limite légale — à connaître avant tout</h3>
<div class="attention-box">Accéder à distance à <mark>tes propres appareils</mark> (ton PC, ton téléphone, dont tu es propriétaire) est totalement légal. Accéder au système de quelqu'un d'autre, ou à un service en ligne (établissement scolaire, site de l'État...) <mark>sans autorisation explicite</mark>, est un délit pénal en France (article 323-1 du Code pénal), même à titre de "test" ou "par curiosité".</div>

<h3>Contrôler son PC depuis son téléphone : le SSH</h3>
<p><strong>SSH (Secure Shell)</strong> : protocole qui permet de se connecter à distance à un ordinateur en ligne de commande, de façon chiffrée.</p>
<ul>
<li>Sur ton <strong>PC</strong> (le serveur) : activer le service SSH (déjà présent sur Linux/Mac ; sur Windows, "OpenSSH Server" dans les fonctionnalités optionnelles).</li>
<li>Sur ton <strong>téléphone</strong> (le client) : une app comme <mark>Termux</mark> (Android) ou <mark>Termius</mark> (Android/iOS) permet de s'y connecter.</li>
<li>Commande de connexion type : <code>ssh nom_utilisateur@adresse_ip_du_pc</code></li>
</ul>
<div class="retenir-box">SSH ne donne accès qu'à une interface en <mark>ligne de commande</mark> (texte), pas à l'écran graphique. Pour voir et cliquer comme si tu étais devant l'écran, il faut un protocole différent (bureau à distance).</div>

<h3>Contrôler son PC depuis son téléphone : le bureau à distance</h3>
<ul>
<li><strong>RDP (Remote Desktop Protocol)</strong> : intégré à Windows, permet de voir et contrôler l'écran complet à distance.</li>
<li><strong>VNC</strong> : équivalent multiplateforme (Windows/Mac/Linux).</li>
<li><strong>AnyDesk / TeamViewer</strong> : solutions grand public, plus simples à configurer, fonctionnent même hors réseau local (via internet, serveurs intermédiaires).</li>
</ul>

<h3>Le réseau local vs internet</h3>
<div class="formula-box">
<strong>Sur le même Wifi</strong> (réseau local) : connexion directe via l'adresse IP locale du PC (ex : 192.168.1.24), simple et rapide.<br>
<strong>Depuis l'extérieur</strong> (4G, autre réseau) : il faut soit configurer une <mark>redirection de port</mark> sur ta box internet (technique, expose potentiellement ton PC si mal fait), soit utiliser un service qui gère ça pour toi (AnyDesk, TeamViewer, ou un VPN personnel type Tailscale/WireGuard — plus sûr).
</div>
<div class="attention-box">Rediriger un port sur sa box sans bien comprendre ce qu'on fait peut <mark>exposer son PC</mark> à des attaques venues d'internet. Pour débuter, préfère un outil comme Tailscale ou AnyDesk qui gère la sécurité à ta place.</div>

<h3>Pourquoi apprendre ça sert la cybersécurité</h3>
<p>Comprendre comment un accès distant fonctionne (SSH, ports, protocoles) c'est comprendre exactement ce qu'un attaquant chercherait à exploiter sur un système mal sécurisé — c'est la base de la sécurité offensive/défensive, dans un cadre 100% légal en testant tes propres appareils.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Tu veux juste taper des commandes sur ton PC depuis ton téléphone, sans avoir besoin de voir l'écran graphique. Quel protocole du cours est suffisant pour ça, et lequel serait "excessif" ?</p>`, aide:`Un des deux protocoles vus donne uniquement une interface en ligne de commande, l'autre donne accès à l'écran complet.`, correction:`<p><strong>SSH</strong> suffit largement ici, puisqu'il donne exactement une interface en ligne de commande. Utiliser le <strong>RDP</strong> (bureau à distance complet) serait excessif pour ce besoin — plus lourd en bande passante pour un simple accès en ligne de commande.</p>`},
{niveau:'Moyen', enonce:`<p>Tu es chez toi, sur le même Wifi que ton PC, et tu veux t'y connecter en SSH depuis ton téléphone. Quelle information dois-tu absolument connaître sur ton PC avant de lancer la commande de connexion ?</p>`, aide:`Relis la commande de connexion type donnée dans le cours : ssh nom_utilisateur@... — que faut-il connaître en plus du nom d'utilisateur ?`, correction:`<p>L'<strong>adresse IP locale du PC</strong> sur le réseau Wifi (ex : 192.168.1.24), en plus du nom d'utilisateur. Sans cette adresse, le téléphone ne sait pas quelle machine du réseau contacter — c'est elle qui identifie précisément le PC parmi tous les appareils connectés au même Wifi.</p>`},
{niveau:'Difficile', enonce:`<p>Un ami te propose de configurer une redirection de port sur ta box internet pour accéder à ton PC en SSH depuis n'importe où, sans passer par un outil comme Tailscale. Explique le risque de sécurité concret que ça introduit, et pourquoi une solution comme Tailscale est plus sûre pour un débutant.</p>`, aide:`Une redirection de port ouvre une porte d'entrée directement accessible depuis INTERNET (pas juste ton réseau local). Qui d'autre, en plus de toi, pourrait potentiellement essayer de s'y connecter ?`, correction:`<p>Une redirection de port expose le service SSH de ton PC <mark>directement sur internet</mark> — n'importe qui dans le monde peut alors tenter de s'y connecter, pas seulement toi. Si le mot de passe est faible ou si une faille existe dans la configuration, ce PC devient une cible potentielle pour des attaques automatisées qui scannent en permanence internet à la recherche de ports SSH ouverts (attaque par force brute notamment).</p><p><strong>Tailscale</strong> (ou WireGuard) évite ce risque : il crée un réseau privé virtuel chiffré entre tes appareils, sans jamais exposer directement de port ouvert sur internet — seuls tes propres appareils authentifiés dans ce réseau privé peuvent se voir entre eux, ce qui réduit énormément la surface d'attaque exposée publiquement (notion vue dans le chapitre sécurité défensive).</p>`},
],
flashcards:[
{q:'Est-il légal d\'accéder à distance à ses propres appareils ?',a:'Oui, totalement légal. Ce qui est illégal, c\'est d\'accéder sans autorisation aux appareils ou comptes d\'autrui (article 323-1 du Code pénal).'},
{q:'SSH — définition',a:'Protocole qui permet de se connecter à distance à un ordinateur en ligne de commande, de façon chiffrée.'},
{q:'SSH donne-t-il accès à l\'écran graphique ?',a:'Non, seulement à une interface en ligne de commande (texte). Pour l\'écran complet, il faut un protocole de bureau à distance (RDP, VNC).'},
{q:'App Android pour se connecter en SSH depuis son téléphone',a:'Termux ou Termius.'},
{q:'RDP',a:'Remote Desktop Protocol : intégré à Windows, permet de voir et contrôler l\'écran complet d\'un PC à distance.'},
{q:'Connexion en réseau local vs depuis l\'extérieur',a:'Réseau local (même Wifi) : connexion directe via l\'IP locale. Depuis l\'extérieur : nécessite une redirection de port ou un outil comme AnyDesk/Tailscale.'},
{q:'Risque d\'une redirection de port mal configurée',a:'Ça peut exposer son PC à des attaques venant d\'internet si on ne sait pas bien ce qu\'on fait.'},
{q:'Pourquoi Tailscale/WireGuard sont recommandés pour débuter',a:'Ce sont des VPN personnels qui gèrent la sécurité de la connexion à distance à ta place, plus sûrs qu\'une redirection de port manuelle.'},
]},

'Ressources pour progresser (gratuit et légal)': {
cours:`<h3>S'entraîner légalement (environnements dédiés)</h3>
<div class="formula-box">
<strong>Root-Me</strong> (root-me.org) : plateforme française de référence, gratuite, avec des centaines de défis de cybersécurité progressifs (web, cryptographie, réseau...) — l'endroit numéro 1 pour débuter légalement.<br>
<strong>TryHackMe</strong> : plateforme anglophone très pédagogique, avec des parcours guidés pas à pas pour grands débutants.<br>
<strong>Hack The Box</strong> : plus technique, pour progresser une fois les bases acquises.
</div>
<div class="attention-box">Tout ce que tu fais sur ces plateformes se passe dans des environnements <mark>dédiés et autorisés</mark> — c'est ce qui rend l'entraînement légal. Ne jamais appliquer ces techniques en dehors de ces environnements sans autorisation explicite.</div>

<h3>Chaînes YouTube</h3>
<ul>
<li><strong>Micode</strong> : vulgarisation grand public de la cybersécurité, arnaques en ligne, hacking éthique (en français).</li>
<li><strong>IT-Connect</strong> : contenu plus technique en français, orienté sécurité défensive et administration réseau.</li>
<li><strong>John Hammond</strong> (anglophone) : résout des challenges CTF (Capture The Flag) en direct, très pédagogique pour comprendre le raisonnement d'un pentester.</li>
</ul>

<h3>Se tenir informé</h3>
<p>Suivre l'actualité cybersécurité (nouvelles failles, fuites de données, techniques d'arnaque) aide à comprendre les menaces réelles, au-delà de la théorie. Les sites spécialisés comme <mark>ZATAZ</mark> ou <mark>Le Monde Informatique</mark> couvrent l'actualité française du secteur.</p>`,
flashcards:[
{q:'Root-Me — c\'est quoi ?',a:'Plateforme française gratuite de défis de cybersécurité progressifs (web, crypto, réseau...) — la référence pour débuter légalement.'},
{q:'Pourquoi s\'entraîner sur Root-Me/TryHackMe est légal',a:'Ce sont des environnements dédiés et autorisés spécifiquement conçus pour l\'entraînement — contrairement à s\'attaquer à un vrai système sans permission.'},
{q:'TryHackMe',a:'Plateforme anglophone de cybersécurité avec des parcours guidés pas à pas, adaptée aux grands débutants.'},
]},

'Les bases du pentest (légal)': {
cours:`<div class="attention-box">Tout ce chapitre s'applique <mark>exclusivement</mark> à tes propres machines/VM ou à des plateformes qui t'autorisent explicitement (Root-Me, TryHackMe, Hack The Box, machines volontairement vulnérables). Utiliser ces techniques sur un système qui ne t'appartient pas, sans autorisation écrite, est un délit (voir le chapitre de droit dédié).</div>

<h3>La méthodologie d'un test d'intrusion (pentest)</h3>
<div class="formula-box">
<strong>1. Reconnaissance</strong> : collecter un maximum d'informations publiques sur la cible (OSINT — Open Source Intelligence) : noms de domaine, technologies utilisées, adresses IP.<br>
<strong>2. Scan</strong> : identifier les ports ouverts et services actifs sur la cible.<br>
<strong>3. Exploitation</strong> : tenter d'exploiter une vulnérabilité identifiée pour obtenir un accès.<br>
<strong>4. Rapport</strong> : documenter précisément ce qui a été trouvé et comment le corriger — c'est souvent la partie la plus importante pour un vrai pentester professionnel.
</div>
<div class="retenir-box">Un pentest professionnel se termine toujours par un <mark>rapport écrit</mark> à destination du client — l'objectif n'est jamais juste de "rentrer", mais d'aider à corriger les failles trouvées.</div>

<h3>Kali Linux : la boîte à outils</h3>
<p><strong>Kali Linux</strong> est une distribution Linux qui regroupe des centaines d'outils de pentest préinstallés (scan réseau, cassage de mots de passe, analyse web...). Elle s'installe généralement dans une <mark>machine virtuelle</mark> (via VirtualBox ou VMware), sans toucher au système principal.</p>

<h3>Nmap : scanner un réseau</h3>
<div class="formula-box">Nmap identifie les machines actives sur un réseau et les ports/services ouverts sur chacune. Exemple de commande de base : <code>nmap -sV 192.168.1.24</code> (scan des services et versions sur cette IP).</div>
<p>C'est l'étape "scan" de la méthodologie : savoir ce qui tourne sur une machine avant de chercher une vulnérabilité à exploiter.</p>

<h3>Wireshark : voir ce qui circule sur le réseau</h3>
<p><strong>Wireshark</strong> est un analyseur de paquets : il capture et affiche en détail tout le trafic réseau qui transite par une interface, utile pour comprendre un protocole, détecter une anomalie, ou observer une attaque de type man-in-the-middle en action (dans un labo).</p>

<h3>S'entraîner chez soi : le labo personnel</h3>
<ul>
<li><strong>VirtualBox / VMware</strong> : logiciels gratuits de virtualisation pour faire tourner plusieurs "faux ordinateurs" isolés sur ta machine réelle.</li>
<li><strong>Metasploitable2</strong> : machine virtuelle volontairement truffée de failles, conçue pour s'entraîner à les exploiter légalement.</li>
<li><strong>DVWA</strong> (Damn Vulnerable Web Application) : application web volontairement vulnérable, pour s'entraîner aux failles web (injection SQL, XSS...) sans toucher à un vrai site.</li>
</ul>
<div class="retenir-box">Le principe est toujours le même : <mark>isoler</mark> l'environnement d'entraînement (VM sans accès à internet ou dans un réseau local dédié) pour qu'aucune action ne puisse sortir de ce cadre autorisé.</div>

<h3>CTF (Capture The Flag)</h3>
<p>Compétition ou défi où il faut exploiter des vulnérabilités volontairement placées pour trouver un "flag" (une chaîne de caractères prouvant la réussite). Root-Me, TryHackMe et Hack The Box fonctionnent sur ce principe — c'est la façon la plus courante de progresser concrètement en pentest de façon légale et ludique.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Remets ces 4 étapes d'un pentest dans le bon ordre : Exploitation, Rapport, Reconnaissance, Scan.</p>`, aide:`Est-ce qu'on peut exploiter une faille avant même de savoir quels services tournent sur la machine ? Et documenter avant d'avoir trouvé quoi que ce soit ?`, correction:`<p><strong>1. Reconnaissance</strong> (collecte d'infos publiques) → <strong>2. Scan</strong> (ports/services) → <strong>3. Exploitation</strong> (tenter d'exploiter une faille) → <strong>4. Rapport</strong> (documenter et proposer des corrections). Chaque étape s'appuie logiquement sur la précédente : impossible d'exploiter une faille sans savoir d'abord ce qui tourne sur la machine (scan), lui-même guidé par les infos collectées en reconnaissance.</p>`},
{niveau:'Moyen', enonce:`<p>Tu veux t'entraîner à exploiter une faille web (comme une injection SQL) chez toi, sans jamais risquer de toucher un vrai site. Quel outil du cours est fait exactement pour ça, et pourquoi est-ce important de garder cet environnement isolé du reste d'internet ?</p>`, aide:`Le cours cite une application web volontairement vulnérable, conçue précisément pour ce genre d'entraînement.`, correction:`<p><strong>DVWA</strong> (Damn Vulnerable Web Application) est conçue exactement pour ça — une application web volontairement truffée de failles, à faire tourner en local (souvent dans une VM). Il est important de l'isoler d'internet pour garantir que les techniques d'exploitation testées restent strictement dans ce cadre d'entraînement autorisé, sans risque de toucher accidentellement un vrai système tiers (ce qui serait, lui, illégal).</p>`},
{niveau:'Difficile', enonce:`<p>Deux personnes utilisent exactement les mêmes techniques (Nmap, exploitation d'une faille connue) sur le même serveur d'une entreprise. La première a un contrat de pentest signé avec cette entreprise ; la seconde agit de sa propre initiative, "juste pour voir si c'est possible". Explique en quoi ces deux actions, techniquement identiques, ont un statut totalement différent.</p>`, aide:`Repense à ce qui a déjà été vu sur le cadre légal du hacking (chapitre juridique) — qu'est-ce qui distingue exactement un pentester professionnel d'un délinquant informatique, si ce n'est pas la technique utilisée ?`, correction:`<p>La différence ne se situe <strong>jamais dans la technique</strong> utilisée — Nmap et l'exploitation d'une faille restent les mêmes outils et méthodes des deux côtés. Ce qui change tout, c'est l'<mark>autorisation</mark> : la première personne agit dans le cadre d'un contrat/mandat écrit précisant le périmètre exact autorisé, ce qui rend son action parfaitement légale. La seconde, sans aucune autorisation, commet une infraction pénale (accès frauduleux à un STAD, article 323-1 du Code pénal) — même sans intention de nuire, même "juste pour voir". C'est exactement pour ça qu'il faut toujours s'entraîner sur des plateformes dédiées (Root-Me, TryHackMe...) ou ses propres machines, jamais sur un système tiers sans ce document écrit.</p>`},
],
flashcards:[
{q:'Les 4 étapes d\'un pentest',a:'Reconnaissance (collecte d\'infos publiques) → Scan (ports/services) → Exploitation (tenter d\'exploiter une faille) → Rapport (documenter et proposer des corrections).'},
{q:'Kali Linux',a:'Distribution Linux regroupant des centaines d\'outils de pentest préinstallés, généralement utilisée dans une machine virtuelle.'},
{q:'Nmap — utilité',a:'Scanner réseau : identifie les machines actives et les ports/services ouverts sur chacune (étape de "scan" du pentest).'},
{q:'Wireshark — utilité',a:'Analyseur de paquets : capture et affiche en détail le trafic réseau qui transite par une interface.'},
{q:'Metasploitable2 / DVWA',a:'Machines/applications volontairement truffées de failles, conçues pour s\'entraîner légalement à les exploiter dans un environnement isolé.'},
{q:'CTF (Capture The Flag)',a:'Défi ou compétition consistant à exploiter des vulnérabilités volontaires pour trouver un "flag" prouvant la réussite — principe de Root-Me, TryHackMe, Hack The Box.'},
{q:'Pourquoi isoler son labo d\'entraînement (VM sans accès internet ou réseau dédié)',a:'Pour garantir qu\'aucune action d\'entraînement ne puisse accidentellement sortir du cadre autorisé et toucher un vrai système.'},
{q:'Pourquoi un pentest professionnel se termine par un rapport',a:'L\'objectif final n\'est pas juste d\'obtenir un accès, mais d\'aider le client à comprendre et corriger les failles trouvées.'},
]},

'Sécurité défensive : durcir un système': {
cours:`<h3>Réduire la surface d'attaque</h3>
<p>La <strong>surface d'attaque</strong> désigne l'ensemble des points par lesquels un système pourrait être attaqué (ports ouverts, services actifs, comptes existants...). Principe de base : <mark>désactiver tout ce qui n'est pas utilisé</mark> — un service inutile mais actif est une porte d'entrée potentielle inutile.</p>

<h3>Le pare-feu (firewall)</h3>
<p>Un <strong>pare-feu</strong> filtre le trafic réseau entrant et sortant selon des règles définies (autoriser/bloquer par port, adresse IP, protocole). Présent au niveau d'un système (Windows Defender Firewall, ufw sur Linux) et souvent aussi au niveau du réseau (box internet, routeur d'entreprise).</p>

<h3>Le principe du moindre privilège</h3>
<div class="formula-box">Chaque utilisateur ou programme ne doit disposer <mark>que des droits strictement nécessaires</mark> à ce qu'il a besoin de faire — jamais plus. Ex : un compte utilisateur classique plutôt qu'un compte administrateur pour un usage quotidien.</div>
<div class="retenir-box">Ce principe limite les <mark>dégâts</mark> en cas de compromission : si un compte aux droits limités est piraté, l'attaquant est lui aussi limité dans ce qu'il peut faire.</div>

<h3>Segmentation réseau</h3>
<p>Séparer un réseau en plusieurs zones isolées (via des <strong>VLAN</strong>, par exemple) pour qu'une intrusion dans une zone ne se propage pas automatiquement à tout le reste du réseau. Utilisé en entreprise pour isoler par exemple le réseau invité du réseau interne sensible.</p>

<h3>Détection : IDS vs IPS</h3>
<ul>
<li><strong>IDS</strong> (Intrusion Detection System) : surveille le trafic/système et <mark>alerte</mark> en cas d'activité suspecte, sans bloquer automatiquement.</li>
<li><strong>IPS</strong> (Intrusion Prevention System) : va plus loin et <mark>bloque activement</mark> le trafic identifié comme malveillant.</li>
</ul>

<h3>Checklist de durcissement (hardening) de base</h3>
<div class="formula-box">
1. Changer tous les mots de passe/identifiants par défaut.<br>
2. Désactiver les comptes et services inutilisés.<br>
3. Appliquer les mises à jour de sécurité régulièrement.<br>
4. Activer le chiffrement du disque (BitLocker, LUKS...).<br>
5. Mettre en place des sauvegardes régulières et testées.<br>
6. Activer la journalisation (logs) pour pouvoir enquêter après un incident.
</div>

<h3>La défense en profondeur</h3>
<p>Principe clé de la sécurité défensive : ne jamais compter sur une seule barrière de protection. Empiler plusieurs couches (pare-feu + antivirus + mises à jour + 2FA + sauvegardes...) fait qu'une seule faille ne suffit pas à tout compromettre — c'est l'inverse exact de la logique offensive du pentest, qui cherche justement la faille dans l'une de ces couches.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un serveur a 15 services actifs, dont seulement 3 sont réellement utilisés au quotidien. Quelle action de bon sens, vue dans le cours, permettrait de réduire sa surface d'attaque immédiatement, sans rien acheter ni installer de nouveau logiciel ?</p>`, aide:`Le principe de base sur la surface d'attaque est rappelé dès la première phrase du cours.`, correction:`<p><strong>Désactiver les 12 services inutilisés.</strong> Chaque service actif mais inutile est une porte d'entrée potentielle sans aucun bénéfice réel — les supprimer réduit directement la surface d'attaque, sans coût ni nouvel outil.</p>`},
{niveau:'Moyen', enonce:`<p>Un employé utilise un compte administrateur pour consulter ses emails au quotidien, "par simplicité". Explique, avec le principe du moindre privilège, pourquoi c'est risqué, même s'il n'a jamais eu de problème.</p>`, aide:`Imagine que cet employé ouvre par erreur une pièce jointe piégée. Que peut faire le malware si le compte utilisé a TOUS les droits administrateur ?`, correction:`<p>Si ce compte administrateur est compromis (ex : via un email piégé, un malware), l'attaquant hérite <mark>immédiatement de tous les droits administrateur</mark> — il peut alors modifier des fichiers système, installer d'autres logiciels malveillants, désactiver des protections... Un compte utilisateur classique, aux droits limités, aurait considérablement réduit ce que l'attaquant pourrait faire même en cas de compromission. C'est exactement l'esprit du principe du moindre privilège : ne jamais donner plus de droits que ce qui est strictement nécessaire à l'usage réel.</p>`},
{niveau:'Difficile', enonce:`<p>Une entreprise a un excellent pare-feu, à jour, très bien configuré. Le RSSI affirme que c'est suffisant et qu'aucune autre protection n'est nécessaire. En utilisant le principe de défense en profondeur, explique pourquoi cette affirmation est risquée, avec un exemple concret de scénario où le pare-feu seul ne suffirait pas.</p>`, aide:`Un pare-feu filtre le trafic RÉSEAU. Mais une attaque comme le phishing ou l'ingénierie sociale (vus dans le premier chapitre) passe-t-elle forcément par une connexion réseau suspecte que le pare-feu pourrait bloquer ?`, correction:`<p>Compter uniquement sur le pare-feu viole le principe de <strong>défense en profondeur</strong> : une seule couche de protection, même excellente, laisse un système vulnérable dès qu'une attaque contourne spécifiquement cette couche. Exemple concret : un employé reçoit un email de phishing et clique sur un lien, ou donne son mot de passe par téléphone (ingénierie sociale) — dans les deux cas, aucune règle de pare-feu ne peut empêcher ça, car le trafic généré (l'employé qui se connecte lui-même avec ses identifiants volés) ressemble à un usage parfaitement normal et légitime du réseau.</p><p>Une vraie stratégie de défense en profondeur combinerait le pare-feu avec d'autres couches indépendantes : formation des employés au phishing, authentification à double facteur (pour limiter les dégâts même si un mot de passe est volé), système de détection d'intrusion (IDS/IPS) pour repérer un comportement anormal après coup, et sauvegardes régulières en dernier recours.</p>`},
],
flashcards:[
{q:'Surface d\'attaque',a:'Ensemble des points par lesquels un système pourrait être attaqué (ports, services, comptes...). Principe : désactiver tout ce qui n\'est pas utilisé.'},
{q:'Pare-feu (firewall) — rôle',a:'Filtre le trafic réseau entrant/sortant selon des règles (port, IP, protocole autorisés ou bloqués).'},
{q:'Principe du moindre privilège',a:'Chaque utilisateur/programme ne doit avoir que les droits strictement nécessaires à son usage, jamais plus — limite les dégâts en cas de piratage.'},
{q:'Segmentation réseau (VLAN)',a:'Séparer un réseau en zones isolées pour qu\'une intrusion dans une zone ne se propage pas automatiquement au reste du réseau.'},
{q:'IDS vs IPS',a:'IDS : détecte et alerte sans bloquer. IPS : détecte ET bloque activement le trafic malveillant.'},
{q:'3 éléments clés d\'une checklist de durcissement (hardening)',a:'Changer les identifiants par défaut, désactiver ce qui est inutilisé, appliquer les mises à jour de sécurité (parmi d\'autres : chiffrement, sauvegardes, logs).'},
{q:'Défense en profondeur',a:'Empiler plusieurs couches de sécurité indépendantes plutôt que de compter sur une seule barrière — une faille dans une couche ne suffit pas à tout compromettre.'},
]},

'OSINT & vie privée en ligne': {
cours:`<h3>Qu'est-ce que l'OSINT ?</h3>
<p><strong>OSINT</strong> (Open Source Intelligence, "renseignement en sources ouvertes") : la discipline qui consiste à collecter et recouper des informations <mark>publiquement accessibles</mark> (réseaux sociaux, sites web, forums, données publiques) pour construire un profil détaillé sur une personne, une entreprise ou un sujet. Contrairement au piratage, l'OSINT n'exploite aucune faille technique — tout ce qu'il utilise est déjà accessible à qui sait chercher au bon endroit.</p>
<div class="retenir-box">L'OSINT est utilisé aussi bien par des professionnels légitimes (journalistes d'investigation, recruteurs, services de renseignement, enquêteurs) que par des attaquants en phase de <mark>reconnaissance</mark> avant une attaque d'ingénierie sociale — c'est un vrai métier autant qu'une compétence défensive à connaître.</p>

<h3>Ce qu'on peut retrouver à partir de presque rien</h3>
<ul>
<li><strong>Un pseudo réutilisé</strong> sur plusieurs plateformes peut relier des comptes normalement séparés (professionnel/perso), révélant bien plus que prévu quand on les recoupe.</li>
<li><strong>Les métadonnées EXIF</strong> d'une photo (intégrées automatiquement par les smartphones) peuvent contenir la date, l'heure, et parfois les <mark>coordonnées GPS</mark> précises du lieu de la prise de vue — souvent invisibles à l'œil nu mais lisibles avec un simple outil en ligne.</li>
<li><strong>Le décor d'une photo</strong> (reflet dans une fenêtre, plaque de rue visible, enseigne de magasin) peut suffire à localiser précisément un lieu, une technique appelée <mark>géolocalisation par indices visuels</mark>.</li>
<li><strong>Les réponses à des "questions de sécurité"</strong> (nom de ton premier animal, ville de naissance) sont souvent devinables ou publiques sur les réseaux sociaux — un point faible classique.</li>
</ul>
<div class="attention-box">Une photo publiée avec la géolocalisation activée peut révéler ton adresse (photo prise chez toi), ton établissement scolaire, ou tes habitudes de déplacement — désactive la géolocalisation dans les paramètres de ton appareil photo/réseaux sociaux si tu ne veux pas partager cette information.</div>

<h3>Quelques outils OSINT connus (usage légal et informatif)</h3>
<div class="formula-box">
<strong>Google Dorking</strong> : utiliser des opérateurs de recherche avancés (ex : <code>site:</code>, <code>filetype:</code>) pour trouver des informations précises indexées par Google mais difficiles à trouver autrement.<br>
<strong>Sherlock</strong> : outil qui recherche un même pseudo/username sur des centaines de plateformes en une seule commande.<br>
<strong>Shodan</strong> : moteur de recherche qui répertorie les appareils connectés à internet dans le monde (caméras, serveurs mal sécurisés...) — puissant outil de sensibilisation à la sécurité, mais à manier avec la même prudence légale que tout outil de reconnaissance.
</div>

<h3>Réduire sa propre exposition (contre-mesures)</h3>
<ul>
<li><strong>Audit personnel régulier</strong> : chercher son propre nom/pseudo sur Google et les réseaux sociaux pour voir ce qui est réellement visible publiquement.</li>
<li><strong>Paramètres de confidentialité</strong> : vérifier qui peut voir ses publications, sa liste d'amis, ses photos — les réglages par défaut sont souvent plus ouverts qu'on ne le pense.</li>
<li><strong>Pseudos différents</strong> selon les contextes (perso/professionnel/gaming) pour éviter qu'un simple recoupement de pseudo ne relie toute ton identité numérique.</li>
<li><strong>Désactiver la géolocalisation</strong> des photos avant publication, ou la supprimer manuellement (nettoyage des métadonnées EXIF).</li>
</ul>

<h3>Pourquoi c'est pertinent pour une carrière sensible</h3>
<p>Avant un poste dans l'armée, une ambassade, ou tout emploi nécessitant une habilitation de sécurité, une <mark>enquête de moralité/background check</mark> passe presque systématiquement par une recherche OSINT sur le candidat : ce qu'il publie, avec qui il interagit, son historique en ligne. Comprendre l'OSINT, c'est aussi comprendre comment gérer sa propre e-réputation en amont.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Tu publies une photo prise depuis ta chambre, avec la géolocalisation activée sur ton téléphone. Quelle information sensible cette photo pourrait-elle révéler, même sans que tu l'aies écrite explicitement ?</p>`, aide:`Relis la partie sur les métadonnées EXIF.`, correction:`<p>Les <strong>métadonnées EXIF</strong> de la photo peuvent contenir les coordonnées GPS précises du lieu de la prise de vue — potentiellement ton adresse personnelle, même si tu n'as jamais écrit cette information dans la légende de la publication.</p>`},
{niveau:'Moyen', enonce:`<p>Une personne utilise exactement le même pseudo original ("Kaelenn_92") sur son compte de jeu vidéo, son compte professionnel LinkedIn caché sous un pseudo, et un forum où elle poste des opinions très personnelles. Explique le risque de vie privée que ça crée, en utilisant le vocabulaire du cours.</p>`, aide:`Relis la partie sur les pseudos réutilisés — un outil comme Sherlock exploite justement ce genre de situation.`, correction:`<p>Un pseudo unique et distinctif réutilisé sur plusieurs plateformes permet de <mark>relier facilement des comptes normalement séparés</mark> (via un outil comme Sherlock, par exemple), même si la personne pensait cloisonner ses différentes identités numériques (pro/perso/loisirs). Quelqu'un qui découvre un seul de ces comptes peut donc, en recoupant simplement le pseudo, accéder à des informations bien plus personnelles que prévu — ici, potentiellement relier une identité professionnelle réelle à des opinions publiées sur un forum sous couvert d'anonymat supposé.</p>`},
{niveau:'Difficile', enonce:`<p>Tu postules pour un poste sensible nécessitant une habilitation de sécurité (comme évoqué dans le cours). Explique en quoi une bonne compréhension de l'OSINT devrait concrètement changer ta façon de gérer tes réseaux sociaux, des mois voire des années avant même de postuler — et pas seulement au moment de la candidature.</p>`, aide:`Le cours précise qu'une enquête OSINT porte sur "l'historique en ligne" d'une personne — supprimer une vieille publication juste avant de postuler efface-t-il vraiment toute trace de son existence passée (pense à ce qui a été vu sur Git : l'historique) ?</p>`, correction:`<p>Le cours précise qu'une enquête de moralité examine l'<mark>historique en ligne</mark> complet, pas seulement l'état actuel des comptes. Or, du contenu déjà publié (captures d'écran prises par d'autres, republications, archives web comme la Wayback Machine, réponses/commentaires laissés ailleurs) peut subsister même après suppression du post original — un peu comme l'historique Git conserve les anciens commits même après un nouveau commit de suppression.</p><p>Une bonne gestion de son e-réputation ne peut donc pas se limiter à un "grand ménage" juste avant de postuler : il faut réfléchir en amont, à chaque publication, à l'image qu'elle donnera si elle est encore visible ou retrouvable des années plus tard — appliquer les contre-mesures du cours (paramètres de confidentialité stricts, pseudos cloisonnés, réflexion avant publication) de façon continue plutôt que réactive.</p>`},
],
flashcards:[
{q:'OSINT — définition',a:'Open Source Intelligence : collecte et recoupement d\'informations publiquement accessibles pour construire un profil détaillé sur une personne, une entreprise ou un sujet.'},
{q:'OSINT vs piratage — différence clé',a:'L\'OSINT n\'exploite aucune faille technique : il n\'utilise que des informations déjà accessibles publiquement, sans intrusion ni accès non autorisé.'},
{q:'Métadonnées EXIF — risque',a:'Intégrées automatiquement par les smartphones dans les photos, elles peuvent contenir la date, l\'heure et les coordonnées GPS précises du lieu de la prise de vue.'},
{q:'Pourquoi réutiliser le même pseudo partout est risqué',a:'Ça permet de relier facilement des comptes normalement séparés (pro/perso/loisirs) via un simple recoupement du pseudo, révélant plus d\'informations que prévu.'},
{q:'Sherlock (outil OSINT)',a:'Outil qui recherche un même pseudo/username sur des centaines de plateformes en une seule commande.'},
{q:'Google Dorking',a:'Utilisation d\'opérateurs de recherche avancés (site:, filetype:...) pour trouver des informations précises indexées par Google mais difficiles à trouver autrement.'},
{q:'3 contre-mesures pour réduire son exposition OSINT',a:'Auditer régulièrement sa propre présence en ligne, vérifier ses paramètres de confidentialité, utiliser des pseudos différents selon les contextes (parmi d\'autres : désactiver la géolocalisation des photos).'},
{q:'Pourquoi l\'OSINT est pertinent avant un poste sensible (armée, ambassade)',a:'Les enquêtes de moralité/background checks pour ces postes passent presque systématiquement par une recherche OSINT sur le candidat et son historique en ligne.'},
]},
};
