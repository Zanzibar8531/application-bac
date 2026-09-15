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
<div class="retenir-box">Boucle <mark>Pour</mark> = tu sais déjà combien de tours tu vas faire. Boucle <mark>Tant que</mark> = tu ne sais pas d'avance, ça dépend d'une condition qui peut changer en cours de route.</div>

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
<li><strong>Objet</strong> : une <mark>instance concrète</mark> d'une classe</li>
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
<li><strong>Protocole HTTP/HTTPS</strong> : règles d'échange entre navigateur et serveur web. Le "S" = connexion <mark>chiffrée</mark> (sécurisée)</li>
<li><strong>Paquets</strong> : les données circulent découpées en petits paquets, réassemblés à l'arrivée</li>
</ul>
<div class="attention-box">Ne jamais entrer un mot de passe ou des infos bancaires sur un site en <mark>HTTP</mark> (sans le S) — les données circulent en clair et peuvent être interceptées. Vérifie toujours le cadenas/HTTPS avant de te connecter.</div>

<h3>Client / Serveur</h3>
<div class="formula-box">Le <strong>client</strong> (ton navigateur/ton app) envoie une requête. Le <strong>serveur</strong> (une machine distante qui héberge le site/service) traite la requête et renvoie une réponse.</div>

<h3>Systèmes d'exploitation (OS)</h3>
<p>Logiciel qui gère les ressources matérielles (processeur, mémoire, stockage) et permet aux autres programmes de s'exécuter. Exemples : Windows, macOS, Linux, Android, iOS.</p>
<ul>
<li><strong>Processus</strong> : programme en cours d'exécution</li>
<li><strong>RAM</strong> : mémoire vive, rapide mais <mark>volatile</mark> (effacée à l'extinction)</li>
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

'Python en pratique — premiers pas': {
cours:`<h3>Installer Python</h3>
<p>Va sur <mark>python.org</mark>, télécharge la dernière version, installe-la (coche "Add Python to PATH" sur Windows). Pour écrire ton code, un éditeur comme <strong>VS Code</strong> (gratuit) suffit largement au début.</p>

<h3>Afficher un message : print()</h3>
<pre><code>print("Bonjour Martin !")
print("2 + 2 =", 2 + 2)</code></pre>

<h3>Les variables</h3>
<pre><code>nom = "Martin"
age = 18
taille = 1.75
est_majeur = True

print(nom, "a", age, "ans")</code></pre>
<div class="retenir-box">Pas besoin de préciser le type en Python (contrairement à d'autres langages) — <mark>age = 18</mark> suffit, Python devine tout seul que c'est un nombre entier.</div>

<h3>Demander une info à l'utilisateur : input()</h3>
<pre><code>nom = input("Comment tu t'appelles ? ")
print("Salut", nom, "!")</code></pre>
<div class="attention-box">input() renvoie toujours du <mark>texte (string)</mark>, même si on tape un nombre ! Pour faire un calcul, il faut convertir avec int() ou float() : <code>age = int(input("Ton âge ? "))</code></div>

<h3>Les conditions : if / elif / else</h3>
<pre><code>age = int(input("Quel âge as-tu ? "))

if age >= 18:
    print("Tu es majeur")
elif age >= 13:
    print("Tu es adolescent")
else:
    print("Tu es enfant")</code></pre>
<div class="attention-box">L'<mark>indentation</mark> (les espaces au début de ligne) n'est pas juste esthétique en Python — c'est ce qui définit un bloc de code. Une mauvaise indentation = erreur ou bug silencieux.</div>

<h3>Les boucles</h3>
<pre><code># Boucle "pour" — nombre de répétitions connu
for i in range(5):
    print("Tour numéro", i)

# Boucle "tant que" — jusqu'à ce qu'une condition change
compteur = 0
while compteur < 3:
    print("Compteur =", compteur)
    compteur = compteur + 1</code></pre>

<h3>Les listes</h3>
<pre><code>matieres = ["Maths", "Anglais", "Physique-Chimie"]
print(matieres[0])        # Maths (le premier élément, index 0)
matieres.append("SVT")    # ajoute un élément à la fin

for m in matieres:
    print("Matière :", m)</code></pre>
<div class="retenir-box">En Python (comme dans presque tous les langages), les listes commencent à l'<mark>index 0</mark>, pas 1. Le premier élément est <code>liste[0]</code>, pas <code>liste[1]</code>.</div>

<h3>Les fonctions</h3>
<pre><code>def carre(x):
    return x * x

resultat = carre(5)
print(resultat)   # 25

def saluer(nom, age):
    print(f"Salut {nom}, tu as {age} ans")

saluer("Martin", 18)</code></pre>

<h3>Petit programme complet</h3>
<pre><code># Calcule la moyenne d'une liste de notes
notes = [14, 8, 16, 12, 10]
total = 0

for note in notes:
    total = total + note

moyenne = total / len(notes)
print("Moyenne :", moyenne)

if moyenne >= 10:
    print("Admis !")
else:
    print("À rattraper...")</code></pre>`,
flashcards:[
{q:'Comment afficher du texte en Python',a:'Avec print("ton texte"). Ex : print("Bonjour")'},
{q:'Pourquoi pas besoin de préciser le type d\'une variable en Python',a:'Python devine automatiquement le type (nombre, texte, booléen...) à partir de la valeur assignée.'},
{q:'Que renvoie toujours input() ?',a:'Du texte (string), même si l\'utilisateur tape un nombre. Il faut convertir avec int() ou float() pour faire des calculs.'},
{q:'Pourquoi l\'indentation compte en Python',a:'Elle définit les blocs de code (ce qui appartient à un if, une boucle, une fonction). Ce n\'est pas juste esthétique, une erreur d\'indentation casse le programme.'},
{q:'Syntaxe d\'une boucle "pour" en Python',a:'for i in range(5): puis le code indenté en dessous — répète 5 fois, i valant 0, 1, 2, 3, 4.'},
{q:'Premier index d\'une liste en Python',a:'0, pas 1. Le premier élément est liste[0].'},
{q:'Comment ajouter un élément à une liste',a:'Avec .append() : maliste.append("nouvel élément")'},
{q:'Comment définir une fonction en Python',a:'def nom_fonction(parametres): puis le code indenté, avec return pour renvoyer un résultat.'},
{q:'f-string en Python',a:'Permet d\'insérer des variables dans du texte : f"Salut {nom}, tu as {age} ans"'},
]},

'Ressources pour progresser (gratuit)': {
cours:`<h3>Pratiquer Python sans rien installer</h3>
<ul>
<li><strong>Replit</strong> (replit.com) : IDE en ligne, tu écris et exécutes du Python directement dans le navigateur, aucune installation nécessaire — parfait pour tester rapidement les exemples du chapitre précédent.</li>
<li><strong>OpenClassrooms — "Apprenez les bases du langage Python"</strong> : cours français gratuit et complet, environ 6h, du niveau débutant.</li>
</ul>

<h3>Chaînes YouTube pour la culture informatique/tech</h3>
<div class="formula-box">
<strong>Micode</strong> : le youtubeur français de référence pour l'informatique et la cybersécurité grand public — vulgarise le hacking, les arnaques en ligne, l'IA, avec des enquêtes/infiltrations bien montées (+1,5M abonnés).<br>
<strong>IT-Connect</strong> : chaîne française plus technique (administration système, réseau, cybersécurité côté défensif) — un peu plus pointue mais accessible.
</div>

<h3>Pour aller plus loin</h3>
<p>Une fois à l'aise avec les bases Python, la meilleure façon de progresser est de <mark>faire de vrais petits projets</mark> plutôt que d'enchaîner les cours théoriques : automatiser une tâche répétitive, faire un petit jeu texte, analyser un fichier de données. C'est en pratiquant qu'on retient vraiment.</p>`,
flashcards:[
{q:'Replit — utilité',a:'IDE en ligne pour écrire et exécuter du Python (et d\'autres langages) directement dans le navigateur, sans rien installer.'},
{q:'Micode — c\'est quoi ?',a:'Youtubeur français de référence en informatique/cybersécurité grand public, connu pour ses vidéos d\'infiltration d\'arnaqueurs et de vulgarisation tech.'},
{q:'Meilleure façon de progresser après les bases Python',a:'Faire de vrais petits projets personnels (automatisation, jeu texte, analyse de données) plutôt que d\'enchaîner uniquement des cours théoriques.'},
]},

'Créer une interface web (HTML/CSS/JS) — objectif décembre': {
cours:`<h3>Pourquoi ces 3 langages, et dans quel ordre</h3>
<div class="formula-box">
<strong>HTML</strong> : la structure (le squelette) — les titres, boutons, listes, zones de la page. Pas de logique, juste du contenu organisé.<br>
<strong>CSS</strong> : l'apparence — couleurs, tailles, espacements, mise en page. Rend le HTML joli et organisé visuellement.<br>
<strong>JavaScript</strong> : le comportement — ce qui réagit quand tu cliques, tape, ou que la page change dynamiquement. C'est lui qui rend un bouton "vivant".
</div>
<p>C'est exactement l'ordre dans lequel ton propre site (BacMaster) est construit : <mark>index.html</mark> pour la structure, <mark>style.css</mark> pour l'apparence, <mark>script.js</mark> pour tout ce qui bouge (clics, flashcards, sauvegarde...).</p>

<h3>HTML — la structure de base</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Ma page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Titre principal&lt;/h1&gt;
    &lt;p&gt;Un paragraphe de texte.&lt;/p&gt;
    &lt;button id="monBouton"&gt;Clique-moi&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<div class="retenir-box">Chaque élément HTML a une <mark>balise ouvrante</mark> et une <mark>balise fermante</mark> (<code>&lt;p&gt;...&lt;/p&gt;</code>). L'attribut <code>id="..."</code> donne un nom unique à un élément pour pouvoir le cibler plus tard en CSS ou en JS.</div>

<h3>CSS — styliser les éléments</h3>
<pre><code>#monBouton {
    background-color: #4A90E2;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
}

#monBouton:hover {
    background-color: #357ABD;
}</code></pre>
<div class="formula-box">Le <strong>sélecteur</strong> cible l'élément (<code>#id</code>, <code>.classe</code>, ou une balise directement comme <code>button</code>). <code>:hover</code> applique un style seulement quand la souris survole l'élément.</div>

<h3>Le modèle Flexbox (mise en page moderne)</h3>
<pre><code>.conteneur {
    display: flex;
    justify-content: center;   /* alignement horizontal */
    align-items: center;       /* alignement vertical */
    gap: 12px;                 /* espace entre les éléments */
}</code></pre>
<div class="retenir-box">Flexbox est la méthode la plus utilisée aujourd'hui pour aligner et espacer des éléments (boutons côte à côte, cartes en grille...) — bien plus simple que les anciennes méthodes (float, position absolue).</div>

<h3>JavaScript — rendre un bouton "vivant"</h3>
<pre><code>// Sélectionner l'élément HTML par son id
const bouton = document.getElementById("monBouton");

// Réagir à un clic
bouton.addEventListener("click", function() {
    alert("Tu as cliqué !");
});</code></pre>
<div class="formula-box"><strong>document.getElementById("id")</strong> récupère un élément HTML précis pour le manipuler.<br><strong>addEventListener("click", ...)</strong> exécute une fonction à chaque fois que l'élément est cliqué.</div>

<h3>Modifier le contenu de la page dynamiquement</h3>
<pre><code>const titre = document.getElementById("titre");
titre.textContent = "Nouveau texte !";       // change le texte
titre.style.color = "red";                    // change le style directement

// Créer et ajouter un nouvel élément
const nouveauParagraphe = document.createElement("p");
nouveauParagraphe.textContent = "Ajouté dynamiquement";
document.body.appendChild(nouveauParagraphe);</code></pre>
<div class="attention-box">C'est exactement ce mécanisme (<mark>créer/modifier des éléments en JS</mark>) que ton site utilise pour afficher une nouvelle flashcard ou changer de page sans jamais recharger le HTML de base.</div>

<h3>Sauvegarder des données : localStorage</h3>
<pre><code>// Sauvegarder une donnée (toujours en texte -> JSON pour un objet/tableau)
localStorage.setItem("score", JSON.stringify(42));

// Relire une donnée sauvegardée
const score = JSON.parse(localStorage.getItem("score"));
console.log(score); // 42</code></pre>
<div class="retenir-box">localStorage garde des données <mark>même après avoir fermé le navigateur</mark> — c'est exactement ce que ton site utilise pour se souvenir de tes flashcards et de ta progression d'un jour à l'autre.</div>

<h3>Un mini-projet pour t'entraîner : un compteur de clics</h3>
<pre><code>&lt;button id="btn"&gt;Clique !&lt;/button&gt;
&lt;p id="compteur"&gt;0&lt;/p&gt;

&lt;script&gt;
let total = 0;
const btn = document.getElementById("btn");
const compteur = document.getElementById("compteur");

btn.addEventListener("click", function() {
    total = total + 1;
    compteur.textContent = total;
});
&lt;/script&gt;</code></pre>
<p>Ce petit exemple combine déjà les 3 briques : un bouton (HTML), une variable qui garde l'état en mémoire (JS), et l'affichage qui se met à jour (JS modifie le HTML). C'est la base de <strong>tout</strong> bouton interactif d'une vraie appli, y compris de ton propre site.</p>

<h3>Feuille de route réaliste jusqu'à décembre</h3>
<ol>
<li><strong>HTML + CSS de base</strong> : balises, sélecteurs, flexbox — savoir construire une page simple et la styliser (2-3 semaines, à ton rythme).</li>
<li><strong>JavaScript de base</strong> : variables, conditions, boucles, fonctions (déjà vu en Python — la logique se transpose, seule la syntaxe change).</li>
<li><strong>JavaScript du DOM</strong> : sélectionner des éléments, écouter des clics, modifier la page — ce qui rend un site "vivant".</li>
<li><strong>Petits projets progressifs</strong> : compteur de clics → liste de tâches (todo-list) avec ajout/suppression → mini flashcard maison avec localStorage. Chaque projet ajoute une brique de plus vers une vraie interface de révision.</li>
</ol>
<div class="retenir-box">Le vrai déclic vient toujours des <mark>petits projets</mark>, pas des cours théoriques enchaînés — exactement comme pour Python (voir le chapitre "Science de l'Apprentissage" sur l'effet de génération).</div>`,
flashcards:[
{q:'Rôle du HTML, CSS et JavaScript',a:'HTML : structure/contenu. CSS : apparence/mise en page. JavaScript : comportement/interactivité.'},
{q:'Balise HTML — structure',a:'Une balise ouvrante et une balise fermante entourent le contenu, ex : &lt;p&gt;texte&lt;/p&gt;. L\'attribut id="..." donne un nom unique à un élément.'},
{q:'Sélecteur CSS #id vs .classe',a:'#id cible un élément unique précis. .classe peut s\'appliquer à plusieurs éléments partageant la même classe.'},
{q:'Flexbox — utilité',a:'Modèle de mise en page CSS moderne (display: flex) pour aligner et espacer facilement des éléments horizontalement ou verticalement.'},
{q:'document.getElementById()',a:'Fonction JavaScript qui récupère un élément HTML précis (via son id) pour pouvoir le lire ou le modifier.'},
{q:'addEventListener("click", ...)',a:'Méthode JavaScript qui exécute une fonction à chaque fois que l\'élément ciblé est cliqué par l\'utilisateur.'},
{q:'Modifier le texte d\'un élément en JS',a:'element.textContent = "nouveau texte" — remplace le contenu textuel affiché.'},
{q:'localStorage — utilité',a:'Stocke des données côté navigateur qui persistent même après fermeture — nécessite JSON.stringify() pour sauvegarder un objet/tableau, et JSON.parse() pour le relire.'},
{q:'Les 3 briques d\'un bouton interactif',a:'Un élément HTML (le bouton), une variable JS qui garde l\'état en mémoire, et une instruction JS qui met à jour l\'affichage après le clic.'},
{q:'Feuille de route suggérée pour apprendre le front-end',a:'HTML/CSS de base → JavaScript de base (logique) → JavaScript du DOM (interactivité) → petits projets progressifs (compteur → todo-list → mini flashcards maison).'},
]},
};
