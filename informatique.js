/* ============================================================
   BACMASTER — data/informatique.js
   Cours et flashcards — Informatique (culture perso)
   ============================================================ */

PREBUILT['Informatique'] = {

'Programmation & algorithmique': {
cours:`<h3>Qu'est-ce qu'un algorithme ?</h3>
<p>Une <strong>suite finie d'instructions précises</strong> qui permet de résoudre un problème ou d'accomplir une tâche. Un programme informatique est l'écriture d'un algorithme dans un langage compréhensible par une machine.</p>

<h3>Les structures de base</h3>
<ul>
<li><strong>Variable</strong> : espace mémoire nommé qui stocke une valeur (nombre, texte, booléen...)</li>
<li><strong>Condition (si/sinon)</strong> : exécute des instructions différentes selon un test logique</li>
<li><strong>Boucle</strong> : répète des instructions. <em>Pour</em> (nombre de répétitions connu) ou <em>Tant que</em> (répète tant qu'une condition est vraie)</li>
<li><strong>Fonction</strong> : bloc de code réutilisable, qui prend des paramètres et peut renvoyer un résultat</li>
</ul>

<h3>Les langages de programmation</h3>
<div class="formula-box">
<strong>Python</strong> : langage simple à lire, très utilisé en data/IA/scripts.<br>
<strong>JavaScript</strong> : langage du web, s'exécute dans le navigateur (interactivité des sites).<br>
<strong>C / C++</strong> : langages bas niveau, rapides, utilisés en systèmes embarqués/jeux vidéo.<br>
<strong>Java / C#</strong> : langages orientés objet, très utilisés en entreprise.<br>
<strong>HTML/CSS</strong> : ne sont pas des langages de programmation mais de <em>structure</em> (HTML) et de <em>mise en forme</em> (CSS) pour le web.
</div>

<h3>Programmation orientée objet (POO)</h3>
<ul>
<li><strong>Classe</strong> : modèle/plan qui décrit des propriétés (attributs) et des comportements (méthodes)</li>
<li><strong>Objet</strong> : une instance concrète d'une classe</li>
<li>Ex : classe <em>Voiture</em> (attributs : couleur, vitesse ; méthodes : accélérer, freiner) → objet <em>maVoiture = Voiture("rouge")</em></li>
</ul>

<h3>Complexité algorithmique</h3>
<p>Mesure l'efficacité d'un algorithme selon la taille des données (notation <strong>O(n)</strong>) :</p>
<ul>
<li><strong>O(1)</strong> : temps constant, quelle que soit la taille des données</li>
<li><strong>O(n)</strong> : temps proportionnel au nombre de données (ex : parcourir une liste)</li>
<li><strong>O(n²)</strong> : temps qui explose avec la taille (ex : comparer chaque élément à tous les autres)</li>
<li><strong>O(log n)</strong> : très efficace (ex : recherche dichotomique dans une liste triée)</li>
</ul>`,
flashcards:[
{q:'Algorithme — définition',a:'Suite finie d\'instructions précises permettant de résoudre un problème ou accomplir une tâche.'},
{q:'Boucle "pour" vs boucle "tant que"',a:'"Pour" : nombre de répétitions connu à l\'avance. "Tant que" : répète tant qu\'une condition reste vraie (nombre inconnu).'},
{q:'Variable — définition',a:'Espace mémoire nommé qui stocke une valeur pouvant changer au cours du programme.'},
{q:'Fonction en programmation',a:'Bloc de code réutilisable qui prend des paramètres en entrée et peut renvoyer un résultat.'},
{q:'Python — pour quoi est-il très utilisé ?',a:'Langage simple à lire et à écrire, très utilisé en data science, intelligence artificielle et scripts automatisés.'},
{q:'JavaScript — rôle principal',a:'Langage qui s\'exécute dans le navigateur pour rendre les sites web interactifs (contrairement à HTML/CSS qui structurent/stylisent).'},
{q:'Différence classe / objet (POO)',a:'Classe = modèle décrivant attributs et méthodes. Objet = instance concrète créée à partir de cette classe.'},
{q:'Complexité O(1) vs O(n)',a:'O(1) : temps constant quelle que soit la taille des données. O(n) : temps proportionnel au nombre de données.'},
{q:'Recherche dichotomique — complexité et condition',a:'Complexité O(log n), très rapide, mais nécessite que la liste soit déjà triée.'},
{q:'Compilé vs interprété',a:'Langage compilé (C++) : traduit entièrement en code machine avant exécution. Langage interprété (Python) : exécuté ligne par ligne par un interpréteur.'},
]},

'Réseaux, systèmes & données': {
cours:`<h3>Comment fonctionne Internet ?</h3>
<ul>
<li><strong>Adresse IP</strong> : identifiant numérique unique d'un appareil sur un réseau (ex : 192.168.1.1)</li>
<li><strong>DNS</strong> (Domain Name System) : traduit un nom de domaine (google.com) en adresse IP</li>
<li><strong>Protocole HTTP/HTTPS</strong> : règles d'échange entre navigateur et serveur web. Le "S" = connexion chiffrée (sécurisée)</li>
<li><strong>Paquets</strong> : les données circulent découpées en petits paquets, réassemblés à l'arrivée</li>
</ul>

<h3>Client / Serveur</h3>
<div class="formula-box">Le <strong>client</strong> (ton navigateur/ton app) envoie une requête. Le <strong>serveur</strong> (une machine distante qui héberge le site/service) traite la requête et renvoie une réponse.</div>

<h3>Systèmes d'exploitation (OS)</h3>
<p>Logiciel qui gère les ressources matérielles (processeur, mémoire, stockage) et permet aux autres programmes de s'exécuter. Exemples : Windows, macOS, Linux, Android, iOS.</p>
<ul>
<li><strong>Processus</strong> : programme en cours d'exécution</li>
<li><strong>RAM</strong> : mémoire vive, rapide mais volatile (effacée à l'extinction)</li>
<li><strong>Stockage (SSD/HDD)</strong> : mémoire persistante mais plus lente que la RAM</li>
</ul>

<h3>Bases de données</h3>
<ul>
<li><strong>Base de données relationnelle</strong> (SQL) : données organisées en tables liées entre elles (MySQL, PostgreSQL)</li>
<li><strong>Base NoSQL</strong> : données non structurées en tables, plus flexible (MongoDB) — utile pour de gros volumes hétérogènes</li>
<li><strong>Requête SQL de base</strong> : <code>SELECT * FROM utilisateurs WHERE age > 18;</code></li>
</ul>

<h3>Intelligence artificielle — les bases</h3>
<ul>
<li><strong>Machine Learning</strong> : un système apprend des motifs à partir de données, sans être programmé explicitement pour chaque cas</li>
<li><strong>Réseau de neurones / Deep Learning</strong> : sous-catégorie du ML inspirée du cerveau, utilisée pour la reconnaissance d'images, le texte (comme les LLM type ChatGPT/Claude)</li>
<li><strong>Données d'entraînement</strong> : plus elles sont nombreuses et de qualité, plus le modèle est performant</li>
</ul>`,
flashcards:[
{q:'Adresse IP — à quoi sert-elle ?',a:'Identifiant numérique unique d\'un appareil sur un réseau, permettant de le localiser pour lui envoyer des données.'},
{q:'Rôle du DNS',a:'Traduit un nom de domaine lisible (ex : google.com) en adresse IP compréhensible par les machines.'},
{q:'HTTP vs HTTPS',a:'HTTPS ajoute une couche de chiffrement (SSL/TLS) à HTTP : les données échangées entre navigateur et serveur sont sécurisées.'},
{q:'Modèle client/serveur',a:'Le client envoie une requête (ex : ouvrir un site), le serveur la traite et renvoie une réponse.'},
{q:'Rôle d\'un système d\'exploitation (OS)',a:'Gère les ressources matérielles (CPU, mémoire, stockage) et permet aux logiciels de s\'exécuter. Ex : Windows, Linux, Android.'},
{q:'RAM vs stockage (SSD/HDD)',a:'RAM : mémoire vive, très rapide mais effacée à l\'extinction. Stockage : mémoire persistante mais plus lente.'},
{q:'Base de données relationnelle (SQL)',a:'Données organisées en tables liées entre elles, interrogées avec le langage SQL. Ex : MySQL, PostgreSQL.'},
{q:'SQL vs NoSQL',a:'SQL : données structurées en tables avec relations. NoSQL : plus flexible, adapté aux gros volumes de données hétérogènes (ex : MongoDB).'},
{q:'Machine Learning — principe',a:'Un système apprend à repérer des motifs à partir de données d\'exemple, au lieu d\'être programmé explicitement pour chaque cas.'},
{q:'Deep Learning',a:'Sous-catégorie du Machine Learning basée sur des réseaux de neurones à plusieurs couches, utilisée notamment pour les images et le langage (LLM).'},
]},
};
