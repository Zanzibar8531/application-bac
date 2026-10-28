/* ============================================================
   BACMASTER — data/cybersecurite-plus.js — Comptes, sécurité web, arnaques bancaires
   ============================================================ */

Object.assign(PREBUILT["Cybersécurité"], {
 "Mots de passe, 2FA & passkeys : protéger ses comptes": {
  "cours": "<h3>Pourquoi tes comptes se font pirater</h3><ul><li><strong>Le hameçonnage</strong> (phishing) : tu donnes toi-même ton mot de passe à un faux site.</li><li><strong>La réutilisation</strong> : un site est piraté, les pirates testent la même adresse + mot de passe partout (<em>credential stuffing</em>). Un seul mot de passe réutilisé = tous tes comptes en danger.</li><li><strong>Les mots de passe faibles</strong> : « azerty123 », une date de naissance, un prénom.</li></ul><p>Tu peux vérifier si ton adresse apparaît dans une fuite de données connue sur le site <code>haveibeenpwned.com</code> (service réputé ; ne saisis jamais ton <em>mot de passe</em> sur un site qui le demande en clair, seulement ton adresse e-mail).</p>\n<h3>Un bon mot de passe</h3><ul><li>La <mark>longueur</mark> compte plus que la complexité : une <strong>phrase de passe</strong> de 4-5 mots sans lien évident est longue et mémorisable.</li><li><strong>Un mot de passe unique par compte</strong>, surtout pour l'e-mail et la banque.</li><li>Utilise un <strong>gestionnaire de mots de passe</strong> (Bitwarden, KeePassXC, ou celui de ton système) : il génère et retient des mots de passe longs et uniques ; tu n'en retiens plus qu'un, solide.</li><li>Ton <strong>adresse e-mail principale</strong> est la clé de tous tes comptes (« mot de passe oublié ») : protège-la en priorité, idéalement avec une double authentification.</li></ul>\n<h3>Comment un site stocke ton mot de passe</h3><p>Un site sérieux ne stocke <strong>jamais</strong> ton mot de passe en clair : il en garde une empreinte (<em>hash</em>), une transformation à sens unique. Mais un hash simple est toujours le même pour le même mot de passe :</p><pre><code>import hashlib\n\nprint(hashlib.sha256(\"azerty123\".encode()).hexdigest()[:16])\nprint(hashlib.sha256(\"azerty123\".encode()).hexdigest()[:16])</code></pre><p>Les mots de passe courants sont donc retrouvables avec des tables de hash précalculées. La parade : ajouter un <strong>sel</strong> (une valeur aléatoire propre à chaque utilisateur) et utiliser un algorithme volontairement <mark>lent</mark>, conçu pour les mots de passe : <code>bcrypt</code>, <code>scrypt</code> ou <code>Argon2</code>. Sha256 seul ne convient pas.</p>\n<h3>Générer un mot de passe avec le bon module</h3><pre><code>import secrets, string\n\ndef mot_de_passe(longueur=16):\n    alphabet = string.ascii_letters + string.digits + \"-_!?\"\n    return \"\".join(secrets.choice(alphabet) for _ in range(longueur))\n\nprint(len(mot_de_passe()), len(mot_de_passe(24)))</code></pre><div class=\"retenir-box\">Pour tout ce qui touche à la sécurité, utilise le module <mark>secrets</mark>, pas <code>random</code> : <code>random</code> est prévisible (il sert aux jeux et simulations), <code>secrets</code> utilise une source d'aléa cryptographiquement sûre.</div>\n<h3>La double authentification (2FA)</h3><table><tr><th>Méthode</th><th>Niveau</th><th>Remarque</th></tr><tr><td>Code par SMS</td><td>Correct</td><td>Mieux que rien, mais vulnérable au <em>SIM swap</em> (le fraudeur récupère ton numéro) et au phishing</td></tr><tr><td>Application (TOTP)</td><td>Bon</td><td>Code à 6 chiffres qui change toutes les 30 s ; ne dépend pas de ton opérateur</td></tr><tr><td>Clé de sécurité / passkey</td><td>Très bon</td><td>Basé sur la cryptographie à clé publique (FIDO2 / WebAuthn) ; résiste au phishing</td></tr></table><p>Une <strong>passkey</strong> remplace le mot de passe : une paire de clés est créée, la clé privée reste sur ton appareil (protégée par ton empreinte ou ton code), le site ne reçoit que la clé publique. Un faux site ne peut rien voler, car il n'a pas de secret à te faire saisir. Conserve aussi tes <strong>codes de récupération</strong> hors ligne.</p><div class=\"attention-box\">Tout ce chapitre est <mark>défensif</mark> : comprendre une faille sert à la corriger et à s'en protéger. N'essaie jamais de tester un système qui ne t'appartient pas ou sans autorisation écrite : c'est illégal (accès frauduleux à un système de traitement automatisé de données).</div>",
  "flashcards": [
   {
    "q": "Qu'est-ce que le credential stuffing ?",
    "a": "Tester massivement des couples e-mail/mot de passe issus d'une fuite sur d'autres sites ; il réussit quand on réutilise le même mot de passe."
   },
   {
    "q": "Pourquoi une phrase de passe est-elle un bon choix ?",
    "a": "Elle est longue (donc difficile à deviner) tout en restant mémorisable."
   },
   {
    "q": "Pourquoi un site ne doit-il jamais stocker ton mot de passe en clair ?",
    "a": "En cas de fuite, tous les mots de passe seraient immédiatement utilisables ; il stocke donc un hash salé."
   },
   {
    "q": "À quoi sert le sel d'un hash ?",
    "a": "Une valeur aléatoire propre à chaque utilisateur : deux mots de passe identiques donnent des hashs différents, ce qui bloque les tables précalculées."
   },
   {
    "q": "Quels algorithmes pour stocker des mots de passe ?",
    "a": "bcrypt, scrypt ou Argon2 (lents par conception) ; SHA-256 seul est inadapté."
   },
   {
    "q": "Quel module Python pour générer un secret ?",
    "a": "secrets (pas random, qui est prévisible)."
   },
   {
    "q": "Pourquoi le 2FA par SMS est-il le moins solide ?",
    "a": "Il est exposé au SIM swap (détournement du numéro) et peut être intercepté par du phishing."
   },
   {
    "q": "Comment fonctionne une passkey ?",
    "a": "Une paire de clés est créée : la clé privée reste sur ton appareil, le site ne conserve que la clé publique ; il n'y a aucun secret à voler ni à saisir sur un faux site."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Quel compte faut-il protéger en priorité avec la 2FA, et pourquoi ?</p>",
    "aide": "Pense au bouton « mot de passe oublié ».",
    "correction": "<p>Ton <strong>adresse e-mail principale</strong> : elle permet de réinitialiser le mot de passe de presque tous tes autres comptes (banque, réseaux sociaux…).</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Un site de petites annonces est piraté, tes identifiants fuitent. Tu utilisais le même mot de passe pour ta banque en ligne. Que fais-tu, dans l'ordre ?</p>",
    "aide": "Contenir d'abord, puis corriger.",
    "correction": "<p>(1) Changer <strong>tout de suite</strong> le mot de passe de la banque (et des comptes où il était réutilisé) en un mot de passe unique ; (2) activer/vérifier la double authentification ; (3) surveiller les mouvements du compte et contacter la banque au moindre doute ; (4) passer à un gestionnaire de mots de passe pour ne plus jamais réutiliser.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Écris une fonction <code>mot_de_passe(longueur)</code> qui garantit au moins une minuscule, une majuscule et un chiffre. Pourquoi <code>secrets</code> et pas <code>random</code> ?</p>",
    "aide": "Tire d'abord un caractère de chaque catégorie, complète, puis mélange avec secrets.SystemRandom().",
    "correction": "<p><code>random</code> utilise un générateur prévisible : connaissant quelques sorties, on peut deviner les suivantes. <code>secrets</code> s'appuie sur la source d'aléa cryptographique du système.</p><pre><code>import secrets, string\n\ndef mot_de_passe(longueur=16):\n    categories = [string.ascii_lowercase, string.ascii_uppercase, string.digits]\n    tout = \"\".join(categories)\n    chars = [secrets.choice(c) for c in categories]\n    chars += [secrets.choice(tout) for _ in range(longueur - len(chars))]\n    secrets.SystemRandom().shuffle(chars)\n    return \"\".join(chars)\n\nm = mot_de_passe(12)\nprint(len(m), any(c.islower() for c in m), any(c.isupper() for c in m), any(c.isdigit() for c in m))</code></pre>"
   }
  ]
 },
 "Sécurité web : failles courantes (OWASP) & parades": {
  "cours": "<h3>Pourquoi apprendre ça quand on code</h3><p>Dès que tu écris un site ou une application qui reçoit des données d'un utilisateur, tu dois partir d'un principe : <mark>tout ce qui vient de l'extérieur est potentiellement malveillant</mark>. L'<strong>OWASP</strong> (une organisation à but non lucratif) publie une liste de référence des risques les plus courants des applications web (<em>OWASP Top 10</em>). Voici les plus importantes pour un développeur débutant.</p>\n<h3>1. L'injection SQL</h3><p>Elle survient quand on <strong>fabrique une requête SQL en collant du texte saisi par l'utilisateur</strong> : celui-ci peut alors y glisser du SQL. Démonstration sur une base de test en mémoire :</p><pre><code>import sqlite3\n\ndb = sqlite3.connect(\":memory:\")\ndb.execute(\"CREATE TABLE users (nom TEXT, role TEXT)\")\ndb.execute(\"INSERT INTO users VALUES ('lea', 'eleve'), ('admin', 'admin')\")\n\nsaisie = \"x' OR '1'='1\"\n\n# MAUVAIS : on colle la saisie dans la requête\nrequete = \"SELECT nom FROM users WHERE nom = '\" + saisie + \"'\"\nprint(len(db.execute(requete).fetchall()))      # 2 -&gt; TOUS les utilisateurs\n\n# BON : requête paramétrée\nprint(len(db.execute(\"SELECT nom FROM users WHERE nom = ?\", (saisie,)).fetchall()))   # 0</code></pre><div class=\"retenir-box\">La parade est simple et universelle : les <mark>requêtes paramétrées</mark> (<code>?</code> en Python/SQLite, <code>PreparedStatement</code> en Java). Les données et la requête sont envoyées <em>séparément</em> : la saisie ne peut plus être interprétée comme du SQL. Les ORM font cela pour toi.</div>\n<h3>2. Le XSS (cross-site scripting)</h3><p>L'attaquant arrive à faire afficher <strong>son propre code JavaScript</strong> dans la page d'autres utilisateurs (commentaire, pseudo, message…), qui peut alors voler leur session. La parade : <mark>échapper</mark> tout ce qui vient de l'extérieur avant de l'insérer dans du HTML.</p><pre><code>import html\n\ncommentaire = \"&lt;script&gt;alert(1)&lt;/script&gt;\"\nprint(html.escape(commentaire))</code></pre><p>Ainsi le navigateur <em>affiche</em> le texte au lieu de l'exécuter. Côté JavaScript, préfère <code>element.textContent = texte</code> à <code>element.innerHTML = texte</code>. Pour afficher du contenu HTML d'origine douteuse, on le met dans une <code>&lt;iframe sandbox&gt;</code> sans permission de scripts : c'est exactement ce que fait l'aperçu des anciennes versions dans l'interface d'administration de BacMaster.</p>\n<h3>3. Le contrôle d'accès défaillant</h3><p>Exemple : l'URL <code>/facture?id=1042</code> affiche ta facture. Si un utilisateur change <code>1042</code> en <code>1043</code> et voit la facture de quelqu'un d'autre, c'est une faille (<em>IDOR</em>). Règle : <strong>le serveur vérifie toujours que l'utilisateur a le droit d'accéder à la ressource</strong>, quoi que dise le client. Cacher un bouton dans l'interface ne protège rien : n'importe qui peut modifier le code côté navigateur.</p><div class=\"attention-box\">C'est pour ça que des services comme Supabase proposent des règles de sécurité <mark>au niveau de la base de données</mark> (RLS, <em>Row Level Security</em>) : même si quelqu'un détourne le code de ton site, la base refuse ce qu'il n'a pas le droit de faire. La clé « publique » d'un site n'est pas un secret : c'est la <strong>règle côté serveur</strong> qui protège les données.</div>\n<h3>4. Les autres réflexes</h3><ul><li><strong>Valider côté serveur</strong> : la validation côté navigateur est une aide pour l'utilisateur, pas une protection.</li><li><strong>HTTPS partout</strong> : le trafic est chiffré ; un cookie de session doit avoir les attributs <code>Secure</code>, <code>HttpOnly</code> (inaccessible au JavaScript) et <code>SameSite</code> (limite le CSRF, les requêtes envoyées à ton insu depuis un autre site).</li><li><strong>Ne jamais mettre de secret dans le code public</strong> (mots de passe, jetons d'administration, clés privées) : tout ce qui est sur GitHub ou dans le navigateur est lisible. Utilise des variables d'environnement et révoque immédiatement un secret publié par erreur.</li><li><strong>Mettre à jour les dépendances</strong> : beaucoup de piratages exploitent des failles déjà corrigées dans une version plus récente.</li><li><strong>Moindre privilège</strong> : donne à chaque compte et à chaque programme juste les droits dont il a besoin.</li><li><strong>Messages d'erreur sobres</strong> : n'affiche pas aux utilisateurs la trace technique de l'erreur.</li></ul><div class=\"attention-box\">Tout ce chapitre est <mark>défensif</mark> : comprendre une faille sert à la corriger et à s'en protéger. N'essaie jamais de tester un système qui ne t'appartient pas ou sans autorisation écrite : c'est illégal (accès frauduleux à un système de traitement automatisé de données).</div>",
  "flashcards": [
   {
    "q": "Qu'est-ce qu'une injection SQL ?",
    "a": "Une faille où la saisie utilisateur collée dans une requête SQL est interprétée comme du SQL."
   },
   {
    "q": "Quelle est la parade contre l'injection SQL ?",
    "a": "Les requêtes paramétrées (placeholders ?), qui séparent la requête des données."
   },
   {
    "q": "Qu'est-ce qu'un XSS ?",
    "a": "Cross-site scripting : l'attaquant fait exécuter son JavaScript dans le navigateur d'autres utilisateurs via un contenu non échappé."
   },
   {
    "q": "Comment se protéger du XSS ?",
    "a": "Échapper (html.escape) toute donnée externe avant de l'afficher ; utiliser textContent plutôt que innerHTML ; ne pas exécuter de contenu douteux."
   },
   {
    "q": "Qu'est-ce qu'un contrôle d'accès défaillant (IDOR) ?",
    "a": "Pouvoir accéder à la ressource d'un autre en modifiant un identifiant, car le serveur ne vérifie pas les droits."
   },
   {
    "q": "Pourquoi la validation côté navigateur ne protège-t-elle pas ?",
    "a": "Le client est sous le contrôle de l'utilisateur : tout contrôle doit être refait côté serveur."
   },
   {
    "q": "À quoi servent HttpOnly, Secure et SameSite sur un cookie ?",
    "a": "HttpOnly : inaccessible au JavaScript ; Secure : envoyé seulement en HTTPS ; SameSite : limite l'envoi depuis d'autres sites (anti-CSRF)."
   },
   {
    "q": "Que faire si tu publies un secret par erreur sur GitHub ?",
    "a": "Le révoquer / changer immédiatement : le supprimer du dépôt ne suffit pas, l'historique et les copies existent."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Quel est le problème de <code>requete = \"SELECT * FROM notes WHERE eleve='\" + nom + \"'\"</code> ?</p>",
    "aide": "Que se passe-t-il si nom contient une apostrophe et du SQL ?",
    "correction": "<p>Le texte <code>nom</code> est collé tel quel dans la requête : un utilisateur peut y insérer du SQL (<strong>injection</strong>). Il faut une requête paramétrée : <code>execute(\"SELECT * FROM notes WHERE eleve = ?\", (nom,))</code>.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Un formulaire de commentaires affiche le texte tel quel dans la page avec <code>innerHTML</code>. Quel risque ? Donne deux corrections.</p>",
    "aide": "Quelqu'un poste du JavaScript…",
    "correction": "<p>Risque de <strong>XSS</strong> : un commentaire contenant un script s'exécuterait chez tous les lecteurs. Corrections : afficher avec <code>textContent</code> (le texte reste du texte) ou <strong>échapper</strong> les caractères spéciaux côté serveur ; on peut aussi ajouter une politique de sécurité de contenu (CSP).</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Une application cache le bouton « Supprimer » aux élèves, mais l'API <code>DELETE /cours/12</code> accepte la requête de n'importe quel utilisateur connecté. Quelle faille, et quelle correction ?</p>",
    "aide": "L'interface n'est pas une barrière de sécurité.",
    "correction": "<p>C'est un <strong>contrôle d'accès défaillant</strong> : la sécurité repose uniquement sur l'interface. Correction : vérifier <strong>côté serveur</strong> (ou avec des règles de base de données comme la RLS) que l'utilisateur a le rôle autorisé avant d'exécuter la suppression, et journaliser l'action.</p>"
   }
  ]
 },
 "Arnaques bancaires : phishing, faux conseillers & SIM swap": {
  "cours": "<h3>Les arnaques qui visent ton argent</h3><table><tr><th>Technique</th><th>Comment ça marche</th></tr><tr><td><strong>Phishing</strong> (e-mail/SMS)</td><td>Faux message de banque ou de livraison avec un lien vers un faux site qui récupère tes identifiants</td></tr><tr><td><strong>Vishing</strong> (téléphone)</td><td>Un « conseiller » t'appelle, parfois avec le <em>vrai numéro</em> de ta banque affiché (usurpation) : « il y a une fraude, validez cette opération pour l'annuler »</td></tr><tr><td><strong>Quishing</strong></td><td>Faux QR code collé sur un parcmètre ou dans un e-mail qui mène à un faux site</td></tr><tr><td><strong>Prise de contrôle à distance</strong></td><td>On te fait installer une application d'assistance à distance (type AnyDesk) pour « sécuriser » ton compte, puis le fraudeur agit à ta place</td></tr><tr><td><strong>SIM swap</strong></td><td>Le fraudeur fait transférer ton numéro vers sa carte SIM pour recevoir tes codes SMS</td></tr><tr><td><strong>Faux investissement</strong></td><td>Plateforme de « trading » ou crypto truquée, avec de fausses performances pour t'inciter à verser toujours plus</td></tr></table>\n<h3>La règle d'or : tu ne valides que ce que TU as initié</h3><div class=\"retenir-box\">Une notification de ta banque qui te demande de <mark>valider un paiement, un ajout de bénéficiaire ou un changement d'appareil</mark> que tu n'as PAS demandé = <strong>refuse</strong>. Aucun conseiller ne te demandera de valider une opération pour « annuler une fraude » ni de te communiquer un code reçu par SMS ou affiché dans l'application.</div><p>Les fraudeurs utilisent toujours les mêmes leviers : l'<strong>urgence</strong> (« dans 10 minutes »), la <strong>peur</strong> (compte bloqué, fraude), l'<strong>autorité</strong> (banque, police, impôts) et la <strong>confidentialité</strong> (« n'en parle à personne »). Dès que tu reconnais un de ces leviers : stop.</p>\n<h3>Les bons réflexes</h3><ol><li><strong>Raccroche</strong> et rappelle ta banque en utilisant le numéro écrit au dos de ta carte ou dans ton application (pas celui qui t'a appelé).</li><li><strong>N'ouvre pas</strong> les liens reçus par SMS ou e-mail : va sur l'application ou tape l'adresse toi-même.</li><li><strong>Garde tes codes secrets</strong> : mot de passe, code reçu par SMS, code de validation d'application, numéro de carte + cryptogramme.</li><li><strong>N'installe jamais</strong> d'application de prise en main à distance à la demande de quelqu'un qui t'a contacté.</li><li><strong>Active les alertes</strong> de ta banque (notifications de paiement) pour repérer vite un mouvement suspect.</li><li><strong>Parles-en</strong> : un proche de confiance voit souvent l'arnaque que toi, pris dans l'urgence, tu ne vois pas.</li></ol>\n<h3>Si tu es tombé dans le piège</h3><ol><li><strong>Appelle immédiatement ta banque</strong> (numéro officiel) pour faire opposition à la carte, bloquer les accès et contester les opérations : plus c'est rapide, plus les chances de récupérer l'argent sont grandes.</li><li><strong>Change tes mots de passe</strong> (en commençant par l'e-mail) depuis un appareil sain, et active la double authentification.</li><li><strong>Dépose plainte</strong> et conserve toutes les preuves (captures d'écran, numéros, messages).</li><li><strong>Signale</strong> : les faux SMS au <code>33700</code>, les sites et e-mails sur les plateformes officielles de signalement (<code>cybermalveillance.gouv.fr</code>, <code>signal-spam.fr</code>), et les faux sites d'investissement à l'AMF.</li><li>Ne <strong>paie rien</strong> à ceux qui te promettent de « récupérer ton argent » contre des frais : ce sont souvent les mêmes escrocs qui reviennent.</li></ol><div class=\"attention-box\">Se faire avoir n'est <mark>pas une honte</mark> : ces escroqueries sont très bien rodées et visent aussi des professionnels. Ce qui compte, c'est de réagir vite et de signaler. Les règles de remboursement dépendent de la situation (opération non autorisée ou validée par toi) : demande-les à ta banque.</div>",
  "flashcards": [
   {
    "q": "Qu'est-ce que le vishing ?",
    "a": "Du phishing par téléphone : un faux conseiller te contacte, parfois avec le vrai numéro de ta banque affiché, pour te faire valider des opérations ou donner des codes."
   },
   {
    "q": "Qu'est-ce que le quishing ?",
    "a": "Du phishing par QR code : un faux QR code mène vers un faux site pour voler tes données."
   },
   {
    "q": "Qu'est-ce qu'un SIM swap ?",
    "a": "Le détournement de ton numéro vers la carte SIM d'un fraudeur, qui reçoit alors tes codes par SMS."
   },
   {
    "q": "Quelle est la règle d'or pour les validations de la banque ?",
    "a": "Ne valider que ce que tu as toi-même initié ; refuser toute demande de validation inattendue."
   },
   {
    "q": "Quels sont les 4 leviers psychologiques des fraudeurs ?",
    "a": "L'urgence, la peur, l'autorité et la confidentialité."
   },
   {
    "q": "Que faire si un « conseiller » t'appelle pour une fraude ?",
    "a": "Raccrocher et rappeler la banque au numéro officiel (carte, application), jamais celui qui a appelé."
   },
   {
    "q": "Quelle est la première action si tu as été arnaqué ?",
    "a": "Appeler immédiatement ta banque (numéro officiel) pour faire opposition, bloquer les accès et contester les opérations."
   },
   {
    "q": "Où signaler un faux SMS ?",
    "a": "Au 33700 ; les e-mails et sites frauduleux sur signal-spam.fr et cybermalveillance.gouv.fr."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Quelqu'un t'appelle : « Je suis de ta banque, ton compte est piraté, donne-moi le code que tu viens de recevoir par SMS pour l'annuler ». Quelle est ta réponse ?</p>",
    "aide": "Un code SMS sert à valider une opération.",
    "correction": "<p>Je <strong>raccroche</strong> sans donner le code, puis j'appelle ma banque au numéro officiel. Le code reçu valide une opération : le donner revient à autoriser la fraude.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Tu reçois une notification : « Valider un virement de 1 800 € vers un nouveau bénéficiaire ? » alors que tu n'as rien demandé, et au même moment un inconnu t'appelle en te disant d'accepter. Que fais-tu ?</p>",
    "aide": "Tu n'as rien initié.",
    "correction": "<p>Je <strong>refuse</strong> la validation, je raccroche, j'appelle ma banque (numéro officiel) pour signaler la tentative et faire sécuriser mes accès, puis je change mes mots de passe. L'appel simultané montre que le fraudeur essayait de me faire valider.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Un ami raconte qu'il a installé une application de « support sécurité » à la demande d'un faux conseiller et qu'il a perdu 3 000 €. Écris, dans l'ordre, ce que tu lui conseilles dans les heures qui suivent.</p>",
    "aide": "Contenir, prouver, signaler, sécuriser.",
    "correction": "<p>(1) Désinstaller l'application et couper le réseau de l'appareil ; (2) <strong>appeler tout de suite sa banque</strong> (numéro officiel) : opposition, blocage des accès, contestation des opérations ; (3) changer ses mots de passe depuis un autre appareil sain, en commençant par l'e-mail ; (4) conserver les preuves et <strong>déposer plainte</strong> ; (5) signaler (cybermalveillance.gouv.fr) ; (6) ne pas payer de « service de récupération » ; (7) en parler à ses proches : il n'y a pas de honte.</p>"
   }
  ]
 }
});
