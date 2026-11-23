/* ============================================================
   BACMASTER — informatique-parcours.js — Parcours « refaire BacMaster tout seul » (Informatique)
   (généré à partir des cours rédigés ; chaque chapitre = cours + exercices + flashcards)
   ============================================================ */

Object.assign(PREBUILT["Informatique"], {
 "BacMaster 0 — Feuille de route : refaire l'appli tout seul": {
 "cours": "<div class=\"attention-box\"><strong>Parcours « refaire BacMaster tout seul ».</strong> Ce chapitre est la carte ; les suivants sont les étapes : <em>JavaScript 1 à 4</em>, <em>Révision espacée</em>, <em>PWA</em>, <em>Supabase</em>, puis les chapitres de <strong>Cybersécurité</strong> « Sécuriser son appli ». HTML, CSS, Git et SQL sont déjà dans les chapitres existants.</div>\n<h3>Le but</h3>\n<p>Refaire une application comme BacMaster <mark>sans copier-coller</mark> : comprendre chaque brique pour pouvoir la construire, la réparer et l'améliorer seul.</p>\n<h3>Ce que fait BacMaster en 6 lignes</h3>\n<ul><li>Des <strong>matières</strong> qui contiennent des <strong>chapitres</strong> ; chaque chapitre a un cours, des flashcards et des exercices.</li><li>Une <strong>révision espacée</strong> : l'appli te repose chaque carte au bon moment.</li><li>Ta <strong>progression</strong> (série de jours, temps passé, résultats) est gardée.</li><li>Des <strong>comptes avec des rôles</strong> (lecteur, éditeur, professeur, admin) et des cours partagés avec la classe.</li><li>Elle fonctionne <strong>hors-ligne</strong> et s'installe comme une appli sur le téléphone.</li><li>Tout est <strong>en ligne gratuitement</strong> : GitHub Pages pour les fichiers, Supabase pour les comptes et la base.</li></ul>\n<h3>Les 4 briques</h3>\n<table class=\"formula-table\"><tr><th>Brique</th><th>Rôle</th><th>Technologies</th><th>Dans BacMaster</th></tr><tr><td>Interface</td><td>Ce que tu vois et touches</td><td>HTML, CSS, JavaScript (dans le navigateur)</td><td><code>index.html</code>, <code>style-*.css</code>, <code>app-*.js</code></td></tr><tr><td>Données</td><td>Cours, cartes, progression</td><td>Un objet JavaScript sauvegardé en JSON (localStorage)</td><td>l'objet <code>db</code></td></tr><tr><td>Serveur</td><td>Comptes, partage, sécurité</td><td>Supabase (base PostgreSQL + authentification + règles RLS)</td><td>tables <code>bacmaster_chapters</code>, <code>user_data</code>…</td></tr><tr><td>Hors-ligne et installation</td><td>Marcher sans réseau, avoir une icône</td><td>manifest + service worker</td><td><code>manifest.json</code>, <code>sw.js</code></td></tr></table>\n<div class=\"formula-box\"><strong>Pas de compilateur, pas de serveur à programmer.</strong> L'interface n'est qu'un dossier de fichiers que le navigateur exécute. On les dépose sur GitHub Pages ; le serveur (comptes, base de données) est confié à Supabase.</div>\n<h3>La feuille de route en 8 étapes</h3>\n<table class=\"formula-table\"><tr><th>#</th><th>Tu construis</th><th>Cours du parcours</th></tr><tr><td>1</td><td>Une page statique : un titre et une liste de matières</td><td>HTML — structure…, CSS 1 et CSS 2 (existants)</td></tr><tr><td>2</td><td>Le langage : variables, conditions, boucles, fonctions</td><td>JavaScript 1 et 2</td></tr><tr><td>3</td><td>Une page qui change : cliquer sur une matière affiche ses chapitres</td><td>JavaScript 3 — le DOM</td></tr><tr><td>4</td><td>Une mémoire : ce que tu fais est gardé quand tu fermes l'appli</td><td>JavaScript 4 — stockage</td></tr><tr><td>5</td><td>Des flashcards intelligentes qui reviennent au bon moment</td><td>Révision espacée (SRS)</td></tr><tr><td>6</td><td>Une appli installable qui marche sans réseau</td><td>PWA : manifest et service worker</td></tr><tr><td>7</td><td>Des comptes et du partage entre appareils</td><td>Supabase : base, comptes, synchronisation</td></tr><tr><td>8</td><td>La sécurité et la mise en ligne</td><td>Cybersécurité « Sécuriser son appli » + Git</td></tr></table>\n<div class=\"retenir-box\"><strong>Toujours une version qui marche.</strong> À chaque étape, l'appli reste utilisable : on ajoute, on ne casse pas. Commence minuscule : <mark>1 matière, 1 chapitre, 5 cartes</mark> qui s'affichent. C'est ton MVP (la plus petite version utile).</div>\n<h3>Organiser ses fichiers</h3>\n<pre><code>mon-bacmaster/\n  index.html      la page (structure)\n  style.css       l'apparence\n  app.js          la logique\n  data.js         les matières, chapitres, cartes\n  manifest.json   (étape 6) nom, icône, couleurs\n  sw.js           (étape 6) le cache hors-ligne</code></pre>\n<p>Règle : <strong>un fichier = une responsabilité</strong>. Quand un fichier dépasse environ 500 lignes, on le découpe. BacMaster a fini avec un <code>script.js</code> de 2 800 lignes : il a fallu le découper en 7 fichiers, ce qui aurait été bien plus simple en le faisant dès le début.</p>\n<h3>Les 5 erreurs de débutant</h3>\n<ol><li><strong>Tout coder d'un coup</strong> au lieu d'avancer étape par étape.</li><li><strong>Copier-coller sans comprendre</strong> : au premier bug, tu ne sais pas le réparer.</li><li><strong>Ne jamais tester sur téléphone</strong> : l'appli sera surtout utilisée dessus (BacMaster a mis ~30 s à démarrer à cause d'un script externe bloquant, bug invisible sur ordinateur).</li><li><strong>Oublier de versionner</strong> : fais un <code>git commit</code> à chaque fonction qui marche.</li><li><strong>Mettre un secret dans le code</strong> (clé privée, mot de passe) : tout ce qui est dans le navigateur est lisible par tout le monde.</li></ol>\n<div class=\"attention-box\">Une appli en ligne a de <strong>vrais utilisateurs</strong> : la sécurité n'est pas une option de la dernière étape. Dès l'étape 3, quand tu écris du HTML avec <code>innerHTML</code>, pense à l'injection de code (cours « XSS » en Cybersécurité).</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Pour chacun de ces éléments, indique la brique de l'application à laquelle il appartient (interface, données, serveur, hors-ligne) : <code>localStorage</code>, <code>sw.js</code>, une règle RLS, <code>display: flex</code>.</p>",
   "aide": "Demande-toi : est-ce que ça s'affiche, ça se garde dans l'appareil, ça vit chez Supabase, ou ça permet de marcher sans réseau ?",
   "correction": "<p><code>localStorage</code> → <strong>données</strong> (gardées sur l'appareil). <code>sw.js</code> → <strong>hors-ligne</strong> (service worker, cache). Règle RLS → <strong>serveur</strong> (sécurité de la base Supabase). <code>display: flex</code> → <strong>interface</strong> (CSS, mise en page).</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Remets dans l'ordre les étapes de construction : sécurité et mise en ligne, révision espacée, page statique HTML/CSS, comptes avec Supabase, DOM et événements, stockage local, PWA, bases de JavaScript.</p>",
   "aide": "On part du plus simple (ce qu'on voit) vers le plus complexe (ce qui est en ligne).",
   "correction": "<p>1) page statique HTML/CSS ; 2) bases de JavaScript ; 3) DOM et événements ; 4) stockage local ; 5) révision espacée ; 6) PWA ; 7) comptes avec Supabase ; 8) sécurité et mise en ligne.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Décris le <strong>MVP</strong> de ta version de BacMaster : donne 3 fonctions à faire en premier et 3 fonctions à reporter. Explique ton choix.</p>",
   "aide": "Le MVP doit déjà servir à réviser, même de façon très simple.",
   "correction": "<p><strong>À faire en premier</strong> : afficher une liste de cartes pour 1 matière ; retourner une carte pour voir la réponse ; noter « je savais / je ne savais pas ».</p><p><strong>À reporter</strong> : comptes et synchronisation ; mode hors-ligne installable ; statistiques et série de jours.</p><p>Choix : tout ce qui fait <em>réviser</em> passe d'abord ; ce qui demande un serveur ou de la sécurité vient après, quand la base fonctionne.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Pour la fonction « <strong>partager un cours avec la classe</strong> », indique quelle brique s'occupe de chaque aspect : (a) afficher le bouton Partager ; (b) garder le brouillon sur le téléphone ; (c) enregistrer le cours en ligne ; (d) empêcher un lecteur de modifier le cours des autres.</p>",
   "aide": "Pense aux 4 briques : interface, données, serveur, sécurité côté serveur.",
   "correction": "<p>(a) <strong>Interface</strong> (HTML/CSS/JS). (b) <strong>Données locales</strong> (localStorage ou IndexedDB). (c) <strong>Serveur</strong> (Supabase, table de chapitres). (d) <strong>Serveur, règles RLS</strong> : cacher le bouton dans l'interface ne suffit pas, car un utilisateur peut contourner l'interface ; seule la règle côté serveur protège vraiment.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Quelles sont les 4 briques d'une appli comme BacMaster ?",
   "a": "Interface (HTML, CSS, JavaScript), données (objet JavaScript + localStorage), serveur (Supabase : comptes, base, sécurité) et hors-ligne/installation (manifest + service worker)."
  },
  {
   "q": "Pourquoi GitHub Pages suffit-il pour l'interface ?",
   "a": "Parce qu'elle n'est faite que de fichiers statiques que le navigateur exécute : aucun serveur à programmer. Les comptes et la base sont confiés à Supabase."
  },
  {
   "q": "Dans quel ordre construire l'appli ?",
   "a": "Page statique, bases de JavaScript, DOM et événements, stockage local, révision espacée, PWA, comptes avec Supabase, sécurité et mise en ligne."
  },
  {
   "q": "Qu'est-ce qu'un MVP ?",
   "a": "La plus petite version utile (par exemple 1 matière, 1 chapitre, 5 cartes qui s'affichent) : elle marche, puis on l'agrandit."
  },
  {
   "q": "Pourquoi découper un gros fichier de code ?",
   "a": "Pour qu'il reste lisible, testable et facile à corriger : BacMaster a dû découper un script de 2 800 lignes en 7 fichiers."
  },
  {
   "q": "Pourquoi utiliser Git dès le début ?",
   "a": "Pour garder l'historique et pouvoir revenir en arrière si on casse quelque chose."
  },
  {
   "q": "Où ranger un secret comme une clé privée ?",
   "a": "Jamais dans le code du site ni sur GitHub : uniquement côté serveur, dans des variables secrètes."
  },
  {
   "q": "Clé publique et clé secrète : quelle différence ?",
   "a": "La clé publique (anon) peut être dans le navigateur car la sécurité repose sur les règles RLS ; la clé secrète (service_role) contourne les règles et ne doit jamais sortir du serveur."
  },
  {
   "q": "Pourquoi tester sur téléphone ?",
   "a": "L'appli sera surtout utilisée dessus : écran, tactile, mémoire et réseau différents. Certains bugs n'y apparaissent que là (démarrage lent, clic décalé)."
  },
  {
   "q": "Que veut dire « hors-ligne d'abord » ?",
   "a": "L'appli fonctionne avec les données locales et se synchronise avec le serveur quand le réseau revient."
  }
 ]
},
 "JavaScript 1 — variables, types, conditions & boucles": {
 "cours": "<h3>Pourquoi JavaScript ?</h3>\n<p>HTML décrit la page, CSS la rend belle, <strong>JavaScript la rend vivante</strong> : c'est le seul langage que tous les navigateurs exécutent. Presque toute la logique de BacMaster (cartes, révision, progression, éditeur) est écrite en JavaScript.</p>\n<h3>Où l'écrire et comment l'essayer</h3>\n<pre><code>&lt;!-- à la fin du &lt;body&gt; de index.html --&gt;\n&lt;script src=\"app.js\"&gt;&lt;/script&gt;</code></pre>\n<ul><li>Ouvre la page dans le navigateur puis <strong>F12 → onglet Console</strong> : tu y vois les <code>console.log</code> et les erreurs.</li><li>Tu peux aussi taper du code directement dans la console pour tester une idée.</li></ul>\n<h3>Variables : const et let</h3>\n<pre><code>const matiere = \"Maths\";     // const : ne sera pas réaffectée\nlet nbCartes = 24;           // let : peut changer\nnbCartes = nbCartes + 1;\nconsole.log(`${matiere} : ${nbCartes} cartes`);   // Maths : 25 cartes</code></pre>\n<ul><li><strong>const</strong> par défaut ; <strong>let</strong> seulement si la valeur doit changer ; évite <code>var</code> (ancien, source de bugs).</li><li>Noms en <strong>camelCase</strong> : <code>nbCartes</code>, <code>dateEcheance</code>.</li><li>Les <strong>template strings</strong> (entre accents graves) permettent d'insérer des valeurs avec <code>${…}</code>.</li></ul>\n<h3>Les types de valeurs</h3>\n<pre><code>console.log(typeof 42, typeof \"texte\", typeof true, typeof undefined, typeof null, typeof []);\n// number string boolean undefined object object\nconsole.log(0.1 + 0.2);        // 0.30000000000000004 (les nombres sont des flottants)\nconsole.log(\"5\" + 2, \"5\" - 2); // 52 3</code></pre>\n<div class=\"attention-box\"><mark>=== et non ==</mark>. L'opérateur <code>===</code> compare la valeur <em>et</em> le type ; <code>==</code> convertit en cachette et donne des surprises. Utilise toujours <code>===</code> et <code>!==</code>. Et rappelle-toi : <code>typeof null</code> vaut <code>\"object\"</code> (un vieux défaut du langage).</div>\n<h3>Vrai et faux</h3>\n<p>En JavaScript, ces valeurs comptent pour <strong>faux</strong> dans une condition : <code>false</code>, <code>0</code>, <code>\"\"</code> (texte vide), <code>null</code>, <code>undefined</code>, <code>NaN</code>. Tout le reste est <strong>vrai</strong> (même <code>\"0\"</code> et <code>[]</code>).</p>\n<pre><code>const saisie = null;\nconst n = saisie ?? 0;       // ?? : valeur de secours seulement si null/undefined\nconst m = saisie || 10;      // || : valeur de secours si « faux » (0 et \"\" compris !)\nconsole.log(n, m);           // 0 10</code></pre>\n<h3>Conditions</h3>\n<pre><code>function mention(note) {\n  if (note &gt;= 16) return \"Très bien\";\n  else if (note &gt;= 14) return \"Bien\";\n  else if (note &gt;= 12) return \"Assez bien\";\n  else if (note &gt;= 10) return \"Passable\";\n  return \"Insuffisant\";\n}\nconsole.log(mention(15.5));            // Bien\nconst nbDues = 5;\nconst etat = nbDues &gt; 0 ? \"à réviser\" : \"à jour\";   // opérateur ternaire</code></pre>\n<p>Combinaisons : <code>&amp;&amp;</code> (et), <code>||</code> (ou), <code>!</code> (non).</p>\n<h3>Boucles</h3>\n<pre><code>const cartes = [\n  { q: \"2+2\", interval: 0 },\n  { q: \"3x3\", interval: 30 },\n  { q: \"5x5\", interval: 4 },\n];\n\nlet maitrisees = 0;\nfor (const c of cartes) {            // for...of : parcourt chaque élément\n  if (c.interval &gt;= 21) maitrisees++;\n}\nconsole.log(Math.round((maitrisees / cartes.length) * 100) + \" %\");   // 33 %\n\nfor (let i = 0; i &lt; 3; i++) console.log(\"tour\", i);   // for classique : 0, 1, 2\nlet essais = 0;\nwhile (essais &lt; 3) essais++;                           // while : tant que la condition est vraie</code></pre>\n<ul><li><code>break</code> sort de la boucle ; <code>continue</code> passe au tour suivant.</li><li>Attention à la <strong>boucle infinie</strong> : si la condition ne devient jamais fausse, la page se fige.</li></ul>\n<div class=\"retenir-box\"><strong>À retenir :</strong> <code>const</code>/<code>let</code> ; types (<code>number</code>, <code>string</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>object</code>) ; toujours <code>===</code> ; <code>if</code>/<code>else</code> ; <code>for…of</code> pour parcourir un tableau.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Sans exécuter le code, donne ce qu'affichent ces lignes : <code>typeof null</code>, <code>\"5\" + 2</code>, <code>\"5\" - 2</code>, <code>0.1 + 0.2 === 0.3</code>.</p>",
   "aide": "Pense à la conversion automatique : + concatène les textes, - convertit en nombre.",
   "correction": "<p><code>typeof null</code> → <strong>\"object\"</strong> ; <code>\"5\" + 2</code> → <strong>\"52\"</strong> (concaténation) ; <code>\"5\" - 2</code> → <strong>3</strong> ; <code>0.1 + 0.2 === 0.3</code> → <strong>false</strong>, car 0.1 + 0.2 vaut 0.30000000000000004.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Écris une fonction <code>estPair(n)</code> qui renvoie <code>true</code> si <code>n</code> est pair. Que renvoie <code>estPair(7)</code> ?</p>",
   "aide": "Le reste de la division par 2 s'obtient avec l'opérateur %.",
   "correction": "<p></p><pre><code>function estPair(n) {\n  return n % 2 === 0;\n}\nconsole.log(estPair(7));    // false\nconsole.log(estPair(10));   // true</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris <code>moyenne(notes)</code> qui renvoie la moyenne d'un tableau de nombres, avec une boucle <code>for…of</code>. Que doit renvoyer <code>moyenne([])</code> pour éviter une division par zéro ?</p>",
   "aide": "Additionne dans une variable, puis divise par notes.length. Traite d'abord le tableau vide.",
   "correction": "<p></p><pre><code>function moyenne(notes) {\n  if (notes.length === 0) return 0;     // évite 0 / 0 = NaN\n  let somme = 0;\n  for (const n of notes) somme += n;\n  return somme / notes.length;\n}\nconsole.log(moyenne([12, 15, 9]));   // 12\nconsole.log(moyenne([]));            // 0</code></pre>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Sans utiliser <code>Math.max</code>, écris <code>plusGrand(tableau)</code> qui renvoie le plus grand nombre. Pourquoi ne faut-il pas initialiser la variable de recherche à <code>0</code> ?</p>",
   "aide": "Pars du premier élément du tableau, pas d'une valeur arbitraire.",
   "correction": "<p></p><pre><code>function plusGrand(tableau) {\n  let max = tableau[0];\n  for (const n of tableau) {\n    if (n &gt; max) max = n;\n  }\n  return max;\n}\nconsole.log(plusGrand([3, 18, 7]));     // 18\nconsole.log(plusGrand([-5, -2, -9]));   // -2</code></pre><p>Avec <code>let max = 0</code>, un tableau de nombres tous négatifs donnerait <strong>0</strong>, qui n'est même pas dans le tableau : c'est faux.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Quand utiliser <code>const</code> et quand utiliser <code>let</code> ?",
   "a": "<code>const</code> par défaut (la variable ne sera pas réaffectée) ; <code>let</code> seulement quand la valeur doit changer. On évite <code>var</code>."
  },
  {
   "q": "Quels sont les types de base en JavaScript ?",
   "a": "number, string, boolean, undefined, null, object (les tableaux sont des objets) ; plus symbol et bigint, plus rares."
  },
  {
   "q": "Que renvoie <code>typeof null</code> ?",
   "a": "\"object\" : c'est un vieux défaut du langage, conservé pour ne rien casser."
  },
  {
   "q": "Pourquoi préférer <code>===</code> à <code>==</code> ?",
   "a": "<code>===</code> compare la valeur et le type ; <code>==</code> convertit en cachette et donne des résultats surprenants."
  },
  {
   "q": "Que donnent <code>\"5\" + 2</code> et <code>\"5\" - 2</code> ?",
   "a": "\"52\" (concaténation de texte) et 3 (conversion en nombre)."
  },
  {
   "q": "Pourquoi <code>0.1 + 0.2</code> ne donne-t-il pas exactement 0.3 ?",
   "a": "Les nombres sont stockés en binaire flottant : 0.1 et 0.2 n'ont pas de représentation exacte ; le résultat est 0.30000000000000004."
  },
  {
   "q": "Quelles valeurs sont « fausses » dans une condition ?",
   "a": "false, 0, \"\" (texte vide), null, undefined et NaN. Tout le reste est vrai, y compris \"0\" et []."
  },
  {
   "q": "Différence entre <code>??</code> et <code>||</code> ?",
   "a": "<code>a ?? b</code> prend b seulement si a est null ou undefined ; <code>a || b</code> prend b si a est « faux » (0 et \"\" compris)."
  },
  {
   "q": "Comment écrit-on un texte contenant des variables ?",
   "a": "Avec une template string entre accents graves : <code>${variable}</code> insère la valeur."
  },
  {
   "q": "Quelle boucle pour parcourir un tableau ?",
   "a": "<code>for (const element of tableau) { … }</code>."
  },
  {
   "q": "Que font <code>break</code> et <code>continue</code> ?",
   "a": "<code>break</code> sort de la boucle ; <code>continue</code> passe directement au tour suivant."
  },
  {
   "q": "Où voir les erreurs et les <code>console.log</code> ?",
   "a": "Dans la console des outils de développement du navigateur (touche F12)."
  }
 ]
},
 "JavaScript 2 — fonctions, tableaux, objets & JSON": {
 "cours": "<h3>Les fonctions</h3>\n<pre><code>function aire(largeur, hauteur) {      // déclaration\n  return largeur * hauteur;\n}\nconst aire2 = (l, h) =&gt; l * h;         // fonction fléchée (même chose, plus courte)\n\nfunction saluer(nom, langue = \"fr\") {  // valeur par défaut\n  return langue === \"es\" ? `Hola ${nom}` : `Bonjour ${nom}`;\n}\nconsole.log(aire(4, 3), saluer(\"Martin\"), saluer(\"Ana\", \"es\"));   // 12 Bonjour Martin Hola Ana</code></pre>\n<ul><li><code>return</code> renvoie un résultat ; sans <code>return</code>, la fonction renvoie <code>undefined</code>.</li><li>Une variable déclarée <strong>dans</strong> une fonction n'existe que dans cette fonction (la <em>portée</em>).</li><li>On peut passer une fonction à une autre : c'est un <strong>callback</strong> (on s'en sert tout le temps avec les tableaux et les événements).</li></ul>\n<h3>Les tableaux et leurs méthodes</h3>\n<pre><code>const notes = [12, 15, 9, 18];\nnotes.push(14);                               // ajoute à la fin\nconsole.log(notes.length, notes[0]);          // 5 12\n\nconst doubles = notes.map(n =&gt; n * 2);        // transforme chaque élément\nconst bonnes  = notes.filter(n =&gt; n &gt;= 12);   // garde ceux qui respectent la condition\nconst premiere = notes.find(n =&gt; n &gt; 14);     // premier élément qui convient (ou undefined)\nconst total = notes.reduce((somme, n) =&gt; somme + n, 0);   // réduit à une seule valeur\nconsole.log(bonnes, premiere, total / notes.length);      // [12,15,18,14] 15 13.6\n\nconst tries = [...notes].sort((a, b) =&gt; a - b);           // copie, puis tri croissant\nconsole.log(tries);                                       // [9,12,14,15,18]</code></pre>\n<div class=\"attention-box\"><mark>sort() sans comparateur trie en texte</mark> : <code>[10, 9, 2].sort()</code> donne <code>[10, 2, 9]</code>. Donne toujours <code>(a, b) =&gt; a - b</code> pour des nombres. Et <code>sort()</code> <em>modifie</em> le tableau d'origine : copie-le d'abord avec <code>[...tableau]</code>.</div>\n<table class=\"formula-table\"><tr><th>Méthode</th><th>Rôle</th><th>Renvoie</th></tr><tr><td><code>map</code></td><td>transforme chaque élément</td><td>un nouveau tableau de même taille</td></tr><tr><td><code>filter</code></td><td>garde les éléments qui passent le test</td><td>un nouveau tableau (plus court ou égal)</td></tr><tr><td><code>find</code></td><td>cherche le premier élément qui passe le test</td><td>l'élément ou <code>undefined</code></td></tr><tr><td><code>some</code> / <code>every</code></td><td>au moins un / tous passent le test</td><td>un booléen</td></tr><tr><td><code>reduce</code></td><td>combine tout en une seule valeur</td><td>la valeur finale</td></tr><tr><td><code>forEach</code></td><td>fait une action pour chaque élément</td><td>rien</td></tr></table>\n<h3>Les objets</h3>\n<pre><code>const carte = { q: \"Dérivée de x²\", a: \"2x\", interval: 0, ease: 2.5, due: null };\nconsole.log(carte.q, carte[\"a\"]);       // accès par point ou par crochets\n\nconst { q, a } = carte;                 // déstructuration : sort deux propriétés d'un coup\ncarte.interval = 3;                     // on peut modifier une propriété\nconsole.log(Object.keys(carte));        // [\"q\",\"a\",\"interval\",\"ease\",\"due\"]\nconsole.log(carte.stats?.total);        // ?. : évite l'erreur si stats n'existe pas → undefined\n\nconst copie = { ...carte, due: Date.now() };   // copie PEU profonde, avec une propriété changée</code></pre>\n<div class=\"attention-box\"><code>{ ...objet }</code> et <code>[...tableau]</code> font une copie <strong>superficielle</strong> : les objets à l'intérieur restent partagés. Pour une copie complète, utilise <code>structuredClone(objet)</code>.</div>\n<h3>JSON : transformer un objet en texte (et inversement)</h3>\n<pre><code>const texte = JSON.stringify({ q: \"2+2\", a: \"4\" });   // objet → texte '{\"q\":\"2+2\",\"a\":\"4\"}'\nconst objet = JSON.parse(texte);                       // texte → objet\nconsole.log(objet.a);                                  // 4</code></pre>\n<p>Le JSON est le format universel pour <strong>sauvegarder</strong> (localStorage) et <strong>échanger</strong> (avec un serveur). <code>JSON.parse</code> plante si le texte est invalide : on l'entoure d'un <code>try/catch</code> (chapitre JavaScript 4).</p>\n<h3>La structure de données de BacMaster</h3>\n<p>Tout BacMaster repose sur un objet à trois niveaux : <strong>matière → chapitre → contenu</strong>.</p>\n<pre><code>const db = {\n  \"Maths\": {\n    \"Dérivation\": {\n      cours: \"&lt;p&gt;La dérivée mesure…&lt;/p&gt;\",\n      flashcards: [{ q: \"Dérivée de x²\", a: \"2x\", interval: 0, ease: 2.5, due: null }],\n      exercices: [{ niveau: \"Facile\", enonce: \"…\", aide: \"…\", correction: \"…\" }],\n    },\n  },\n};\n\nconst nbCartes = Object.values(db.Maths)\n  .reduce((total, chapitre) =&gt; total + chapitre.flashcards.length, 0);\nconsole.log(nbCartes);   // 1</code></pre>\n<div class=\"retenir-box\"><strong>À retenir :</strong> <code>map</code>/<code>filter</code>/<code>find</code>/<code>reduce</code> remplacent la plupart des boucles ; un objet regroupe des données nommées ; <code>JSON.stringify</code>/<code>parse</code> servent à sauvegarder et échanger ; <code>sort</code> avec comparateur sur une copie.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>À partir de <code>const notes = [12, 15, 9, 18]</code>, écris une ligne qui crée le tableau des notes supérieures ou égales à 12, et une autre qui crée le tableau des notes augmentées de 1 point.</p>",
   "aide": "Une méthode garde des éléments, l'autre transforme chaque élément.",
   "correction": "<p></p><pre><code>const notes = [12, 15, 9, 18];\nconst reussies = notes.filter(n =&gt; n &gt;= 12);   // [12, 15, 18]\nconst bonus    = notes.map(n =&gt; n + 1);        // [13, 16, 10, 19]</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Une carte est « à réviser » si elle n'a jamais été vue (<code>due</code> vaut <code>null</code>) ou si son échéance est passée. Écris <code>aReviser(cartes, maintenant)</code> qui renvoie le nombre de cartes à réviser.</p>",
   "aide": "filter + une condition avec ||, puis .length.",
   "correction": "<p></p><pre><code>function aReviser(cartes, maintenant = Date.now()) {\n  return cartes.filter(c =&gt; c.due === null || c.due &lt;= maintenant).length;\n}\n\nconst cartes = [\n  { q: \"a\", due: null },\n  { q: \"b\", due: 1000 },\n  { q: \"c\", due: 9_999_999_999_999 },\n];\nconsole.log(aReviser(cartes, 5000));   // 2  (la carte « a » et la carte « b »)</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris <code>trierParNote(eleves)</code> qui renvoie les élèves du meilleur au moins bon, <strong>sans modifier</strong> le tableau d'origine. Chaque élève est <code>{ nom, note }</code>.</p>",
   "aide": "Copie avec [...eleves] puis sort avec un comparateur b.note - a.note.",
   "correction": "<p></p><pre><code>function trierParNote(eleves) {\n  return [...eleves].sort((a, b) =&gt; b.note - a.note);\n}\nconst eleves = [{ nom: \"Ana\", note: 12 }, { nom: \"Leo\", note: 17 }, { nom: \"Eva\", note: 9 }];\nconsole.log(trierParNote(eleves).map(e =&gt; e.nom));   // [\"Leo\", \"Ana\", \"Eva\"]\nconsole.log(eleves[0].nom);                          // \"Ana\" : l'original n'a pas bougé</code></pre>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Avec la structure <code>db</code> de BacMaster, écris <code>resume(db)</code> qui renvoie un objet <code>{ \"Maths\": 25, \"Français\": 12, … }</code> donnant le nombre total de cartes de chaque matière.</p>",
   "aide": "Object.entries(db) donne des paires [matière, chapitres]. Pour chaque matière, additionne flashcards.length de ses chapitres avec reduce.",
   "correction": "<p></p><pre><code>function resume(db) {\n  const resultat = {};\n  for (const [matiere, chapitres] of Object.entries(db)) {\n    resultat[matiere] = Object.values(chapitres)\n      .reduce((total, ch) =&gt; total + ch.flashcards.length, 0);\n  }\n  return resultat;\n}\n\nconst db = {\n  Maths: { Derivation: { flashcards: [1, 2, 3] }, Suites: { flashcards: [1, 2] } },\n  Francais: { Figures: { flashcards: [1] } },\n};\nconsole.log(resume(db));   // { Maths: 5, Francais: 1 }</code></pre>"
  }
 ],
 "flashcards": [
  {
   "q": "Quelle est la différence entre <code>function</code> et une fonction fléchée ?",
   "a": "Même rôle ; la fonction fléchée <code>(a, b) =&gt; a + b</code> est plus courte et se prête bien aux callbacks. Elle n'a pas son propre <code>this</code>."
  },
  {
   "q": "Que renvoie une fonction sans <code>return</code> ?",
   "a": "<code>undefined</code>."
  },
  {
   "q": "Qu'est-ce qu'un callback ?",
   "a": "Une fonction passée en argument à une autre fonction, qui l'appellera plus tard (ex. la fonction donnée à <code>map</code> ou à <code>addEventListener</code>)."
  },
  {
   "q": "Que fait <code>map</code> ?",
   "a": "Transforme chaque élément et renvoie un nouveau tableau de même taille."
  },
  {
   "q": "Que fait <code>filter</code> ?",
   "a": "Garde les éléments qui passent le test et renvoie un nouveau tableau."
  },
  {
   "q": "Que fait <code>find</code> ?",
   "a": "Renvoie le premier élément qui passe le test, ou <code>undefined</code> s'il n'y en a pas."
  },
  {
   "q": "Que fait <code>reduce</code> ?",
   "a": "Combine tous les éléments en une seule valeur (somme, objet, etc.) à partir d'une valeur de départ."
  },
  {
   "q": "Pourquoi <code>[10, 9, 2].sort()</code> se trompe-t-il ?",
   "a": "Sans comparateur, <code>sort</code> trie en texte et donne [10, 2, 9]. Pour des nombres : <code>sort((a, b) =&gt; a - b)</code>."
  },
  {
   "q": "<code>sort</code> modifie-t-il le tableau d'origine ?",
   "a": "Oui. On copie d'abord avec <code>[...tableau]</code> pour ne pas toucher à l'original."
  },
  {
   "q": "À quoi sert la déstructuration ?",
   "a": "Extraire plusieurs propriétés d'un coup : <code>const { q, a } = carte;</code>."
  },
  {
   "q": "Que fait l'opérateur <code>?.</code> ?",
   "a": "Accède à une propriété sans erreur si l'objet est absent : <code>carte.stats?.total</code> vaut <code>undefined</code> au lieu de planter."
  },
  {
   "q": "<code>{ ...objet }</code> copie-t-il tout ?",
   "a": "Non, c'est une copie superficielle : les objets imbriqués restent partagés. <code>structuredClone</code> fait une copie complète."
  },
  {
   "q": "À quoi servent <code>JSON.stringify</code> et <code>JSON.parse</code> ?",
   "a": "<code>stringify</code> transforme un objet en texte (pour sauvegarder ou envoyer) ; <code>parse</code> fait l'inverse. <code>parse</code> plante si le texte est invalide."
  },
  {
   "q": "Quelle est la structure de données de BacMaster ?",
   "a": "Un objet à trois niveaux : matière → chapitre → contenu (cours, flashcards, exercices)."
  }
 ]
},
 "JavaScript 3 — le DOM & les événements (afficher des pages)": {
 "cours": "<h3>Le DOM : la page vue comme un arbre</h3>\n<p>Quand le navigateur lit ton HTML, il construit un <strong>arbre d'objets</strong> : le <strong>DOM</strong> (<em>Document Object Model</em>). JavaScript peut lire cet arbre, le modifier, et la page change instantanément. C'est ainsi que BacMaster affiche une matière, un cours ou une carte sans recharger la page.</p>\n<pre><code>&lt;main id=\"app\"&gt;&lt;/main&gt;\n&lt;script src=\"app.js\"&gt;&lt;/script&gt;</code></pre>\n<h3>Trouver et modifier un élément</h3>\n<pre><code>const app = document.querySelector(\"#app\");          // le premier élément qui correspond au sélecteur CSS\nconst cartes = document.querySelectorAll(\".carte\");  // tous les éléments qui correspondent\n\napp.textContent = \"Bonjour\";            // remplace le TEXTE (sûr)\napp.classList.add(\"actif\");             // ajoute une classe CSS\napp.setAttribute(\"data-matiere\", \"Maths\");\napp.style.display = \"none\";             // style direct (à utiliser avec modération)</code></pre>\n<h3>textContent ou innerHTML ?</h3>\n<table class=\"formula-table\"><tr><th></th><th><code>textContent</code></th><th><code>innerHTML</code></th></tr><tr><td>Insère</td><td>du <strong>texte brut</strong></td><td>du <strong>HTML</strong> interprété</td></tr><tr><td>Si le contenu contient <code>&lt;b&gt;</code></td><td>le montre tel quel</td><td>met en gras</td></tr><tr><td>Sécurité</td><td><mark>sûr</mark></td><td><mark>dangereux</mark> si le contenu vient d'un utilisateur</td></tr></table>\n<div class=\"attention-box\"><strong>Ne mets jamais dans <code>innerHTML</code> un texte que tu ne maîtrises pas</strong> (nom d'un chapitre, texte d'un autre compte…). Un contenu comme <code>&lt;img src=x onerror=…&gt;</code> exécuterait du code chez toi : c'est une faille <em>XSS</em> (voir le cours de Cybersécurité). Soit tu utilises <code>textContent</code>, soit tu <strong>échappes</strong> le texte avant.</div>\n<pre><code>function esc(texte) {\n  return String(texte)\n    .replace(/&amp;/g, \"&amp;amp;\").replace(/&lt;/g, \"&amp;lt;\").replace(/&gt;/g, \"&amp;gt;\")\n    .replace(/\"/g, \"&amp;quot;\").replace(/'/g, \"&amp;#39;\");\n}\nconsole.log(esc('&lt;img src=x onerror=\"alert(1)\"&gt;'));\n// &amp;lt;img src=x onerror=&amp;quot;alert(1)&amp;quot;&amp;gt;</code></pre>\n<h3>Créer des éléments</h3>\n<pre><code>function creerCarte(carte) {\n  const div = document.createElement(\"div\");\n  div.className = \"carte\";\n  div.textContent = carte.q;            // sûr : le texte ne sera jamais pris pour du HTML\n  return div;\n}\ndocument.querySelector(\"#app\").append(creerCarte({ q: \"Dérivée de x² ?\" }));</code></pre>\n<h3>Les événements</h3>\n<pre><code>const bouton = document.querySelector(\"#retourner\");\nbouton.addEventListener(\"click\", (evenement) =&gt; {\n  console.log(\"clic !\", evenement.target);\n});</code></pre>\n<p>Un <strong>événement</strong> (<code>click</code>, <code>input</code>, <code>keydown</code>, <code>submit</code>…) appelle ta fonction quand il se produit. Pour un formulaire, <code>evenement.preventDefault()</code> empêche le rechargement de la page.</p>\n<h3>La délégation d'événements</h3>\n<p>Si ta liste contient 200 boutons, ne branche pas 200 écouteurs : branche <strong>un seul</strong> sur le conteneur et regarde d'où vient le clic. Ça marche même pour les éléments ajoutés plus tard.</p>\n<pre><code>document.querySelector(\"#liste\").addEventListener(\"click\", (e) =&gt; {\n  const ligne = e.target.closest(\"[data-chapitre]\");   // remonte jusqu'à l'élément qui nous intéresse\n  if (!ligne) return;\n  ouvrirChapitre(ligne.dataset.chapitre);              // lit l'attribut data-chapitre\n});</code></pre>\n<h3>Le schéma « état → affichage »</h3>\n<p>La méthode la plus simple pour une appli comme BacMaster : une <strong>fonction <code>render()</code></strong> qui, à partir des données, reconstruit l'écran. Quand quelque chose change, on modifie les données puis on rappelle <code>render()</code>.</p>\n<pre><code>const etat = { matiere: null };\nconst matieres = [\"Maths\", \"Français\", \"Histoire-Géo\"];\n\nfunction render() {\n  const app = document.querySelector(\"#app\");\n  app.replaceChildren();                         // vide l'écran\n  if (!etat.matiere) {\n    for (const m of matieres) {\n      const bouton = document.createElement(\"button\");\n      bouton.textContent = m;\n      bouton.dataset.matiere = m;\n      app.append(bouton);\n    }\n  } else {\n    app.textContent = \"Chapitres de \" + etat.matiere;\n  }\n}\n\ndocument.querySelector(\"#app\").addEventListener(\"click\", (e) =&gt; {\n  const b = e.target.closest(\"[data-matiere]\");\n  if (b) { etat.matiere = b.dataset.matiere; render(); }\n});\nrender();</code></pre>\n<div class=\"attention-box\"><strong>Piège vécu sur BacMaster :</strong> quand la synchronisation redessinait l'écran pendant que l'élève cliquait, le bouton visé avait déjà changé de place et le clic partait ailleurs. Solution : ne pas redessiner pendant que l'utilisateur touche l'écran, ni quand le résultat serait identique.</div>\n<div class=\"retenir-box\"><strong>À retenir :</strong> <code>querySelector</code> pour trouver, <code>textContent</code> pour insérer du texte (sûr), <code>addEventListener</code> pour réagir, <strong>délégation</strong> pour les listes, <code>render()</code> pour reconstruire l'écran depuis les données, et <strong>jamais <code>innerHTML</code> avec du texte non maîtrisé</strong>.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Quelle est la différence entre <code>element.textContent = \"&lt;b&gt;Salut&lt;/b&gt;\"</code> et <code>element.innerHTML = \"&lt;b&gt;Salut&lt;/b&gt;\"</code> ?</p>",
   "aide": "Une des deux interprète le HTML.",
   "correction": "<p>Avec <strong>textContent</strong>, la page affiche littéralement <code>&lt;b&gt;Salut&lt;/b&gt;</code> (texte brut). Avec <strong>innerHTML</strong>, le navigateur interprète la balise et affiche <strong>Salut</strong> en gras. C'est pour cela que <code>innerHTML</code> est dangereux avec un texte venant d'un utilisateur.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris <code>afficherMatieres(liste)</code> qui crée un <code>&lt;li&gt;</code> par matière dans <code>&lt;ul id=\"matieres\"&gt;</code>, <strong>sans</strong> utiliser <code>innerHTML</code>. Pourquoi ce choix est-il plus sûr ?</p>",
   "aide": "createElement, textContent, append.",
   "correction": "<p></p><pre><code>function afficherMatieres(liste) {\n  const ul = document.querySelector(\"#matieres\");\n  ul.replaceChildren();\n  for (const nom of liste) {\n    const li = document.createElement(\"li\");\n    li.textContent = nom;     // même si nom contient du HTML, il reste du texte\n    ul.append(li);\n  }\n}\nafficherMatieres([\"Maths\", \"&lt;b&gt;Test&lt;/b&gt;\"]);</code></pre><p>Le texte est inséré comme du <em>texte</em> : même un nom piégé comme <code>&lt;img onerror=…&gt;</code> ne peut pas exécuter de code.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Une liste contient beaucoup de lignes <code>&lt;li data-id=\"12\"&gt;</code>. Écris un seul écouteur qui affiche l'identifiant de la ligne cliquée, même pour les lignes ajoutées plus tard.</p>",
   "aide": "Écouteur sur le <ul>, puis closest('li') et dataset.id.",
   "correction": "<p></p><pre><code>document.querySelector(\"#liste\").addEventListener(\"click\", (e) =&gt; {\n  const li = e.target.closest(\"li\");\n  if (!li) return;\n  console.log(\"identifiant :\", li.dataset.id);\n});</code></pre><p>Un seul écouteur suffit : l'événement « remonte » du <code>li</code> vers le <code>ul</code>.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Écris un petit compteur : un bouton <code>#plus</code> et un texte <code>#valeur</code>. À chaque clic la valeur augmente de 1. Organise le code avec une variable d'état et une fonction <code>render()</code>.</p>",
   "aide": "L'état est un nombre ; render() écrit cet état dans le texte ; le clic change l'état puis rappelle render().",
   "correction": "<p></p><pre><code>const etat = { valeur: 0 };\n\nfunction render() {\n  document.querySelector(\"#valeur\").textContent = etat.valeur;\n}\n\ndocument.querySelector(\"#plus\").addEventListener(\"click\", () =&gt; {\n  etat.valeur++;\n  render();\n});\nrender();</code></pre><p>Même schéma que BacMaster : les données changent, puis on redessine l'écran.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Qu'est-ce que le DOM ?",
   "a": "L'arbre d'objets que le navigateur construit à partir du HTML ; JavaScript peut le lire et le modifier pour changer la page."
  },
  {
   "q": "Comment sélectionner un ou plusieurs éléments ?",
   "a": "<code>document.querySelector(\"#id\")</code> pour le premier ; <code>document.querySelectorAll(\".classe\")</code> pour tous. On utilise des sélecteurs CSS."
  },
  {
   "q": "Différence entre <code>textContent</code> et <code>innerHTML</code> ?",
   "a": "<code>textContent</code> insère du texte brut (sûr) ; <code>innerHTML</code> interprète du HTML (dangereux avec du contenu non maîtrisé)."
  },
  {
   "q": "Comment échapper un texte avant de le mettre dans du HTML ?",
   "a": "Remplacer <code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>\"</code> et <code>'</code> par leurs entités (<code>&amp;amp;</code>, <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;quot;</code>, <code>&amp;#39;</code>)."
  },
  {
   "q": "Comment créer un élément sans <code>innerHTML</code> ?",
   "a": "<code>document.createElement(\"div\")</code>, puis <code>.textContent = …</code> et <code>.append(element)</code>."
  },
  {
   "q": "Comment réagir à un clic ?",
   "a": "<code>element.addEventListener(\"click\", fonction)</code>."
  },
  {
   "q": "À quoi sert <code>evenement.preventDefault()</code> ?",
   "a": "À empêcher le comportement par défaut, par exemple le rechargement de la page quand on envoie un formulaire."
  },
  {
   "q": "Qu'est-ce que la délégation d'événements ?",
   "a": "Brancher un seul écouteur sur le conteneur et utiliser <code>e.target.closest(...)</code> pour savoir quel élément a été cliqué ; ça marche aussi pour les éléments ajoutés plus tard."
  },
  {
   "q": "Comment lire un attribut <code>data-chapitre</code> en JavaScript ?",
   "a": "Avec <code>element.dataset.chapitre</code>."
  },
  {
   "q": "Quel schéma pour piloter l'affichage ?",
   "a": "Garder un état (les données), une fonction <code>render()</code> qui reconstruit l'écran depuis cet état, et rappeler <code>render()</code> après chaque changement."
  },
  {
   "q": "Pourquoi ne faut-il pas redessiner l'écran pendant que l'utilisateur touche ?",
   "a": "Le bouton visé peut avoir changé de place : le clic part au mauvais endroit. On attend la fin du geste ou on ne redessine pas si le résultat est identique."
  },
  {
   "q": "Que fait <code>replaceChildren()</code> sans argument ?",
   "a": "Vide l'élément de tout son contenu."
  }
 ]
},
 "JavaScript 4 — mémoriser : localStorage, JSON & asynchrone": {
 "cours": "<h3>Pourquoi sauvegarder ?</h3>\n<p>Quand on ferme l'onglet, toutes les variables JavaScript disparaissent. Pour que ta progression (cartes vues, série de jours, cours modifiés) survive, il faut l'écrire <strong>quelque part dans l'appareil</strong>. Le navigateur propose deux outils principaux.</p>\n<table class=\"formula-table\"><tr><th></th><th>localStorage</th><th>IndexedDB</th></tr><tr><td>Taille</td><td>environ 5 Mo</td><td>très grande (centaines de Mo)</td></tr><tr><td>Fonctionnement</td><td><strong>synchrone</strong> (bloque pendant l'écriture)</td><td><strong>asynchrone</strong> (ne bloque pas)</td></tr><tr><td>Données</td><td>du <strong>texte</strong> uniquement</td><td>objets, fichiers, images</td></tr><tr><td>Difficulté</td><td>très simple</td><td>plus lourde à écrire</td></tr><tr><td>Dans BacMaster</td><td>l'objet <code>db</code> et les réglages</td><td>les versions de secours des cours</td></tr></table>\n<h3>localStorage en 4 lignes</h3>\n<pre><code>localStorage.setItem(\"reglages\", JSON.stringify({ theme: \"sombre\", objectif: 20 }));\nconst texte = localStorage.getItem(\"reglages\");          // un texte, ou null s'il n'existe pas\nconst reglages = texte ? JSON.parse(texte) : { theme: \"clair\", objectif: 15 };\nlocalStorage.removeItem(\"reglages\");</code></pre>\n<ul><li>Il ne stocke que du <strong>texte</strong> : on passe par <code>JSON.stringify</code> / <code>JSON.parse</code>.</li><li>Il est propre à <strong>un site</strong> et à <strong>un navigateur</strong> : le téléphone et l'ordinateur ne partagent rien (d'où la synchronisation en ligne, voir le chapitre Supabase).</li><li>Une valeur de <code>null</code> au <code>getItem</code> veut dire « jamais enregistré ».</li></ul>\n<h3>try / catch : ne jamais faire confiance au stockage</h3>\n<pre><code>function charger(cle, parDefaut) {\n  try {\n    const texte = localStorage.getItem(cle);\n    return texte === null ? parDefaut : JSON.parse(texte);\n  } catch (erreur) {                  // texte corrompu, stockage bloqué (navigation privée)…\n    console.warn(\"Chargement impossible\", cle, erreur);\n    return parDefaut;\n  }\n}\n\nfunction sauver(cle, valeur) {\n  try {\n    localStorage.setItem(cle, JSON.stringify(valeur));\n    return true;\n  } catch (erreur) {                  // souvent : quota dépassé (≈ 5 Mo)\n    console.warn(\"Sauvegarde impossible\", cle, erreur);\n    return false;\n  }\n}</code></pre>\n<div class=\"attention-box\"><strong>Le stockage peut échouer</strong> (quota plein, mode privé, données abîmées). Une appli solide vérifie toujours, et ne casse pas si le chargement échoue. Autre règle : <mark>ne stocke jamais de mot de passe ni de secret dans localStorage</mark> : n'importe quel script de la page peut le lire (c'est pourquoi une faille XSS est grave).</div>\n<h3>Sauvegarder au bon moment : le « debounce »</h3>\n<p>Si tu sauvegardes à chaque lettre tapée dans l'éditeur, tu écris des centaines de fois par minute. Le <strong>debounce</strong> attend que l'utilisateur ait fini avant d'agir.</p>\n<pre><code>function debounce(fonction, delai) {\n  let minuteur;\n  return (...arguments_) =&gt; {\n    clearTimeout(minuteur);                         // annule l'attente précédente\n    minuteur = setTimeout(() =&gt; fonction(...arguments_), delai);\n  };\n}\n\nconst sauverPlusTard = debounce(() =&gt; sauver(\"db\", db), 1500);\n// à chaque frappe : sauverPlusTard();   → une seule sauvegarde, 1,5 s après la dernière frappe</code></pre>\n<h3>Faire évoluer ses données : la version du format</h3>\n<p>Un jour tu ajouteras un champ (par exemple <code>ease</code> sur les cartes). Les anciens utilisateurs ont encore l'ancien format. On range donc un numéro de version et on <strong>migre</strong>.</p>\n<pre><code>function migrer(donnees) {\n  if (!donnees.version) {                 // version 1 → 2 : ajouter ease à toutes les cartes\n    for (const matiere of Object.values(donnees.db)) {\n      for (const chapitre of Object.values(matiere)) {\n        for (const carte of chapitre.flashcards) carte.ease ??= 2.5;\n      }\n    }\n    donnees.version = 2;\n  }\n  return donnees;\n}</code></pre>\n<h3>L'asynchrone : attendre sans bloquer</h3>\n<p>Certaines actions prennent du temps (réseau, base de données). JavaScript ne s'arrête pas pour les attendre : il utilise des <strong>promesses</strong> (<em>Promise</em>). Avec <code>async</code>/<code>await</code>, on les écrit presque comme du code normal.</p>\n<pre><code>async function chargerCours(url) {\n  try {\n    const reponse = await fetch(url);                 // attend la réponse du réseau\n    if (!reponse.ok) throw new Error(\"Erreur \" + reponse.status);\n    return await reponse.json();                      // attend et décode le JSON\n  } catch (erreur) {\n    console.warn(\"Réseau indisponible\", erreur);      // hors-ligne, serveur en panne…\n    return null;\n  }\n}\n\nchargerCours(\"/cours.json\").then((cours) =&gt; console.log(cours));</code></pre>\n<ul><li><code>await</code> ne s'utilise que dans une fonction marquée <code>async</code>.</li><li><code>fetch</code> ne lève pas d'erreur pour un code 404/500 : il faut tester <code>reponse.ok</code>.</li><li>Toujours prévoir le cas <strong>réseau indisponible</strong> : c'est l'idée « hors-ligne d'abord » de BacMaster.</li></ul>\n<div class=\"retenir-box\"><strong>À retenir :</strong> <code>localStorage</code> = texte (JSON) limité à ~5 Mo ; toujours <code>try/catch</code> ; <code>debounce</code> pour ne pas sauvegarder à chaque frappe ; numéro de version + migration ; <code>async/await</code> + <code>fetch</code> avec test de <code>reponse.ok</code>.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Écris le code qui enregistre l'objet <code>{ theme: \"sombre\" }</code> dans <code>localStorage</code> sous la clé <code>\"reglages\"</code>, puis le relit pour afficher le thème.</p>",
   "aide": "JSON.stringify pour écrire, JSON.parse pour relire.",
   "correction": "<p></p><pre><code>localStorage.setItem(\"reglages\", JSON.stringify({ theme: \"sombre\" }));\nconst lu = JSON.parse(localStorage.getItem(\"reglages\"));\nconsole.log(lu.theme);   // \"sombre\"</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Pourquoi la ligne <code>const donnees = JSON.parse(localStorage.getItem(\"db\"))</code> peut-elle planter ? Donne deux cas et corrige-la.</p>",
   "aide": "Que renvoie getItem si la clé n'existe pas ? Que fait JSON.parse sur un texte invalide ?",
   "correction": "<p><strong>Cas 1</strong> : la clé n'existe pas. <code>getItem</code> renvoie <code>null</code>, <code>JSON.parse(null)</code> donne <code>null</code> sans erreur, et le plantage arrive plus loin, dès qu'on lit une propriété (<code>donnees.Maths</code> → <em>TypeError</em>). <strong>Cas 2</strong> : le texte est corrompu ou incomplet : <code>JSON.parse</code> lève immédiatement une exception <em>SyntaxError</em>.</p><p>Correction :</p><pre><code>function chargerDb() {\n  try {\n    const texte = localStorage.getItem(\"db\");\n    return texte ? JSON.parse(texte) : {};\n  } catch (e) {\n    return {};          // données illisibles : on repart d'un objet vide\n  }\n}</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Un utilisateur tape 200 caractères en 20 secondes dans l'éditeur. Combien de sauvegardes sont faites sans debounce, et avec un debounce de 1500 ms ?</p>",
   "aide": "Sans debounce : une par frappe. Avec debounce : une seule, quand l'utilisateur s'arrête.",
   "correction": "<p>Sans debounce : <strong>200 sauvegardes</strong> (une par caractère). Avec un debounce de 1500 ms : <strong>1 sauvegarde</strong> (si l'utilisateur ne marque jamais de pause de plus de 1,5 s), ou quelques-unes seulement s'il s'arrête de temps en temps. On écrit beaucoup moins, ce qui évite de ralentir la page et d'user le stockage.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Écris <code>async function chargerOuBase(url, parDefaut)</code> qui renvoie le JSON téléchargé, ou <code>parDefaut</code> si le réseau est indisponible ou si le serveur répond une erreur.</p>",
   "aide": "try/catch autour de await fetch ; teste reponse.ok ; renvoie parDefaut dans le catch et si !ok.",
   "correction": "<p></p><pre><code>async function chargerOuBase(url, parDefaut) {\n  try {\n    const reponse = await fetch(url);\n    if (!reponse.ok) return parDefaut;     // 404, 500…\n    return await reponse.json();\n  } catch (erreur) {\n    return parDefaut;                      // pas de réseau\n  }\n}</code></pre><p>Même esprit que BacMaster : sans réseau, l'appli continue avec ce qu'elle a en local.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Quelle taille environ offre <code>localStorage</code> ?",
   "a": "Environ 5 Mo par site, et uniquement du texte."
  },
  {
   "q": "Que contient <code>localStorage.getItem(\"x\")</code> si la clé n'existe pas ?",
   "a": "<code>null</code>."
  },
  {
   "q": "Comment stocker un objet dans <code>localStorage</code> ?",
   "a": "<code>localStorage.setItem(cle, JSON.stringify(objet))</code> puis <code>JSON.parse(localStorage.getItem(cle))</code> pour le relire."
  },
  {
   "q": "Pourquoi entourer le stockage d'un <code>try/catch</code> ?",
   "a": "Le quota peut être plein, le mode privé peut bloquer le stockage, le texte peut être corrompu : sans protection, l'appli plante."
  },
  {
   "q": "Pourquoi ne pas mettre de secret dans <code>localStorage</code> ?",
   "a": "Tout script de la page peut le lire : une faille XSS suffirait à le voler."
  },
  {
   "q": "Différence entre localStorage et IndexedDB ?",
   "a": "localStorage est simple, synchrone et limité à ~5 Mo de texte ; IndexedDB est asynchrone, bien plus grand et stocke des objets et des fichiers."
  },
  {
   "q": "Qu'est-ce que le debounce ?",
   "a": "Retarder une action tant que l'utilisateur continue (par exemple sauvegarder 1,5 s après la dernière frappe) pour éviter de l'exécuter à chaque événement."
  },
  {
   "q": "À quoi sert un numéro de version dans les données sauvegardées ?",
   "a": "À savoir quel format on lit et à les migrer proprement quand on ajoute des champs."
  },
  {
   "q": "Que fait <code>await</code> ?",
   "a": "Attend la fin d'une promesse sans bloquer la page ; il ne s'utilise que dans une fonction <code>async</code>."
  },
  {
   "q": "<code>fetch</code> lève-t-il une erreur pour un code 404 ?",
   "a": "Non : il ne lève une erreur que pour un problème réseau. Il faut tester <code>reponse.ok</code> (ou <code>reponse.status</code>)."
  },
  {
   "q": "Pourquoi les données du téléphone et de l'ordinateur sont-elles différentes ?",
   "a": "<code>localStorage</code> est propre à un navigateur sur un appareil. Pour les partager, il faut un serveur (la synchronisation avec Supabase)."
  },
  {
   "q": "Que veut dire « hors-ligne d'abord » ?",
   "a": "L'appli marche avec ses données locales et traite le réseau comme un bonus : chaque appel réseau prévoit le cas où il échoue."
  }
 ]
},
 "Flashcards : l'algorithme de révision espacée (SRS)": {
 "cours": "<h3>Le problème : on oublie</h3>\n<p>Relire un cours la veille d'un contrôle donne une impression de savoir qui s'évapore vite. Le psychologue <strong>Hermann Ebbinghaus</strong> a montré que l'oubli est <mark>rapide au début puis de plus en plus lent</mark> : chaque fois qu'on se rappelle une information, elle tient plus longtemps.</p>\n<div class=\"retenir-box\"><strong>La répétition espacée</strong> consiste à revoir une information <em>juste avant de l'oublier</em>, avec des écarts de plus en plus grands : 1 jour, 3 jours, 8 jours, 20 jours… C'est le principe d'Anki, et de BacMaster.</div>\n<h3>Les données d'une carte</h3>\n<table class=\"formula-table\"><tr><th>Champ</th><th>Rôle</th></tr><tr><td><code>q</code>, <code>a</code></td><td>la question et la réponse</td></tr><tr><td><code>interval</code></td><td>l'écart actuel entre deux révisions, en <strong>jours</strong> (0 = jamais vue)</td></tr><tr><td><code>ease</code></td><td>la <strong>facilité</strong> : par combien on multiplie l'intervalle (2,5 au départ, entre 1,3 et 3)</td></tr><tr><td><code>due</code></td><td>la date de la prochaine révision (<code>null</code> si jamais vue)</td></tr></table>\n<h3>L'algorithme : 4 notes possibles</h3>\n<p>Après avoir retourné la carte, l'élève se note : <strong>raté</strong> (<code>again</code>), <strong>difficile</strong> (<code>hard</code>), <strong>bien</strong> (<code>good</code>), <strong>facile</strong> (<code>easy</code>). BacMaster utilise une version simplifiée de l'algorithme SM-2, la famille d'Anki.</p>\n<pre><code>const JOUR = 24 * 60 * 60 * 1000;                 // un jour en millisecondes\n\nfunction creerCarte(q, a) {\n  return { q, a, interval: 0, ease: 2.5, due: null };   // jamais vue : due vaut null\n}\n\nfunction noter(carte, note, maintenant = Date.now()) {\n  const iv = carte.interval, e = carte.ease;\n  let nouvelIv, nouvelEase, delai;\n  switch (note) {\n    case \"again\":   // raté : on revoit dans 15 min, la carte devient « plus difficile »\n      nouvelIv = 1; nouvelEase = Math.max(1.3, e - 0.2); delai = 15 * 60 * 1000; break;\n    case \"hard\":    // difficile : l'intervalle grandit à peine\n      nouvelIv = iv === 0 ? 1 : Math.max(1, Math.round(iv * 1.2));\n      nouvelEase = Math.max(1.3, e - 0.15); delai = nouvelIv * JOUR; break;\n    case \"good\":    // bien : l'intervalle est multiplié par la facilité\n      nouvelIv = iv === 0 ? 3 : Math.max(1, Math.round(iv * e));\n      nouvelEase = e; delai = nouvelIv * JOUR; break;\n    case \"easy\":    // facile : grand saut, et la carte devient « plus facile »\n      nouvelIv = iv === 0 ? 7 : Math.max(4, Math.round(iv * e * 1.3));\n      nouvelEase = Math.min(3, e + 0.15); delai = nouvelIv * JOUR; break;\n    default:\n      throw new Error(\"note inconnue : \" + note);\n  }\n  carte.interval = nouvelIv;\n  carte.ease = nouvelEase;\n  carte.due = maintenant + delai;\n  return carte;\n}</code></pre>\n<p>Le paramètre <code>maintenant</code> a une valeur par défaut (l'heure réelle) mais on peut le <em>fournir</em> : c'est ce qui permet de <strong>tester</strong> l'algorithme en simulant le passage du temps, sans attendre 50 jours.</p>\n<h3>Ce que ça donne</h3>\n<table class=\"formula-table\"><tr><th>Notes successives</th><th>Intervalles obtenus</th></tr><tr><td>good, good, good, good</td><td>3 j → 8 j → 20 j → <strong>50 j</strong></td></tr><tr><td>easy, easy, easy</td><td>7 j → 24 j → <strong>87 j</strong> (la facilité monte à 2,95)</td></tr><tr><td>good, good, <strong>again</strong>, good, good</td><td>3 j → 8 j → <strong>1 j</strong> → 2 j → 5 j (la facilité baisse à 2,3)</td></tr><tr><td>good, easy, good</td><td>3 j → 10 j → 27 j</td></tr></table>\n<div class=\"attention-box\"><strong>Un défaut à connaître :</strong> avec des <code>hard</code> successifs, l'intervalle reste à 1 jour (<code>Math.round(1 × 1.2)</code> vaut 1) : la carte ne progresse jamais. Une correction simple : <code>Math.max(iv + 1, Math.round(iv * 1.2))</code>. Tous les algorithmes ont des cas limites : c'est en les testant qu'on les trouve.</div>\n<h3>Choisir les cartes de la séance</h3>\n<pre><code>function estDue(carte, maintenant = Date.now()) {\n  return carte.due === null || carte.due &lt;= maintenant;     // jamais vue, ou échéance passée\n}\n\nfunction choisirSeance(cartes, max, maintenant = Date.now()) {\n  return cartes\n    .filter((c) =&gt; estDue(c, maintenant))\n    .sort((a, b) =&gt; (a.due ?? -Infinity) - (b.due ?? -Infinity))   // les plus en retard d'abord\n    .slice(0, max);\n}</code></pre>\n<p>Pendant une séance, les cartes notées <code>again</code> sont remises <strong>dans la file</strong> de la séance pour être revues avant la fin ; les autres disparaissent jusqu'à leur prochaine échéance.</p>\n<h3>Tester l'algorithme</h3>\n<pre><code>const t = 1000;                                   // un « maintenant » inventé\nconst c = creerCarte(\"2+2\", \"4\");\nnoter(c, \"good\", t);\nconsole.assert(c.interval === 3, \"1re fois bien = 3 jours\");\nconsole.assert(c.due === t + 3 * JOUR, \"échéance dans 3 jours\");\n\nnoter(c, \"again\", t);\nconsole.assert(c.interval === 1 &amp;&amp; Math.abs(c.ease - 2.3) &lt; 1e-9, \"raté = retour à 1 jour, facilité -0,2\");</code></pre>\n<p><code>console.assert(condition, message)</code> n'affiche quelque chose <strong>que si la condition est fausse</strong>. C'est un test minimal : aucun message = tout va bien.</p>\n<h3>Les choix de conception de BacMaster</h3>\n<ul><li><strong>La carte est identifiée par sa question.</strong> Pratique pour fusionner la progression entre appareils, mais modifier la question crée une « nouvelle » carte et fait perdre l'historique.</li><li><strong>Chaque carte garde la date de sa dernière révision</strong> : quand deux appareils ont des états différents, la version la plus récente gagne (sinon un téléphone en retard écraserait la progression de l'autre).</li><li><strong>Les calculs ne dépendent pas de l'horloge</strong> (le paramètre <code>maintenant</code>) : le code est testable et reproductible.</li></ul>\n<div class=\"retenir-box\"><strong>À retenir :</strong> intervalle × facilité à chaque réussite ; un échec ramène à 1 jour et baisse la facilité ; <code>due</code> = prochaine date ; on teste en simulant l'heure ; les cas limites (comme <code>hard</code> répété) se découvrent en testant.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Une carte neuve (<code>interval = 0</code>, <code>ease = 2.5</code>) est notée <code>good</code>, puis une autre carte neuve est notée <code>easy</code>. Quels sont les intervalles obtenus ?</p>",
   "aide": "Pour une carte jamais vue, l'intervalle est fixé : 3 jours pour good, 7 jours pour easy.",
   "correction": "<p><code>good</code> → <strong>3 jours</strong> ; <code>easy</code> → <strong>7 jours</strong> (et sa facilité passe à 2,65).</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Une carte neuve est notée <code>good</code> trois fois de suite (à chaque fois à l'échéance). Donne ses intervalles successifs. Que se passe-t-il ensuite si elle est notée <code>again</code> ?</p>",
   "aide": "good : premier intervalle 3 ; ensuite intervalle × facilité, arrondi. again : retour à 1.",
   "correction": "<p>Intervalles : <strong>3 j</strong>, puis <code>round(3 × 2,5)</code> = <strong>8 j</strong>, puis <code>round(8 × 2,5)</code> = <strong>20 j</strong>. Avec <code>again</code> : l'intervalle revient à <strong>1 jour</strong>, la facilité passe de 2,5 à <strong>2,3</strong>, et la carte revient dans la séance 15 minutes plus tard.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris <code>joursRestants(carte, maintenant)</code> qui renvoie le nombre de jours (arrondi au supérieur) avant l'échéance d'une carte, ou <code>0</code> si elle est déjà due ou jamais vue.</p>",
   "aide": "due - maintenant donne des millisecondes ; divise par JOUR et arrondis avec Math.ceil.",
   "correction": "<p></p><pre><code>const JOUR = 24 * 60 * 60 * 1000;\n\nfunction joursRestants(carte, maintenant = Date.now()) {\n  if (carte.due === null || carte.due &lt;= maintenant) return 0;\n  return Math.ceil((carte.due - maintenant) / JOUR);\n}\n\nconsole.log(joursRestants({ due: 3 * JOUR }, 0));   // 3\nconsole.log(joursRestants({ due: null }, 0));       // 0</code></pre>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Corrige le défaut des <code>hard</code> répétés : écris la ligne qui calcule le nouvel intervalle pour <code>hard</code> de façon qu'il augmente toujours d'au moins 1 jour. Donne la suite d'intervalles pour trois <code>hard</code> à partir d'une carte neuve.</p>",
   "aide": "Prends le plus grand de deux nombres : iv + 1 et le résultat arrondi de iv × 1,2.",
   "correction": "<p></p><pre><code>nouvelIv = iv === 0 ? 1 : Math.max(iv + 1, Math.round(iv * 1.2));</code></pre><p>Suite pour trois <code>hard</code> : 1 j → <code>max(2, round(1,2))</code> = <strong>2 j</strong> → <code>max(3, round(2,4))</code> = <strong>3 j</strong>. La carte progresse enfin, lentement, comme voulu pour une carte « difficile ».</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Écris <code>choisirSeance(cartes, max, maintenant)</code> : elle garde les cartes dues (jamais vues ou échéance passée), les trie des plus en retard aux moins en retard (les jamais vues en premier), et renvoie au plus <code>max</code> cartes. Teste-la avec 4 cartes.</p>",
   "aide": "filter + sort + slice. Pour trier, traite due null comme -Infinity.",
   "correction": "<p></p><pre><code>function choisirSeance(cartes, max, maintenant = Date.now()) {\n  return cartes\n    .filter((c) =&gt; c.due === null || c.due &lt;= maintenant)\n    .sort((a, b) =&gt; (a.due ?? -Infinity) - (b.due ?? -Infinity))\n    .slice(0, max);\n}\n\nconst cartes = [\n  { q: \"a\", due: 5000 }, { q: \"b\", due: null },\n  { q: \"c\", due: 100 },  { q: \"d\", due: 9e12 },\n];\nconsole.log(choisirSeance(cartes, 2, 6000).map((c) =&gt; c.q));   // [\"b\", \"c\"]</code></pre>"
  }
 ],
 "flashcards": [
  {
   "q": "Qu'est-ce que la répétition espacée ?",
   "a": "Revoir une information juste avant de l'oublier, avec des écarts de plus en plus grands (1 j, 3 j, 8 j, 20 j…)."
  },
  {
   "q": "Que montre la courbe de l'oubli d'Ebbinghaus ?",
   "a": "L'oubli est rapide au début puis de plus en plus lent ; chaque rappel réussi rend le souvenir plus durable."
  },
  {
   "q": "Que représente <code>interval</code> pour une carte ?",
   "a": "L'écart actuel entre deux révisions, en jours (0 = carte jamais vue)."
  },
  {
   "q": "Que représente <code>ease</code> ?",
   "a": "La facilité de la carte : le facteur par lequel on multiplie l'intervalle (2,5 au départ, entre 1,3 et 3)."
  },
  {
   "q": "Que représente <code>due</code> ?",
   "a": "La date de la prochaine révision ; <code>null</code> si la carte n'a jamais été vue."
  },
  {
   "q": "Quel intervalle donne <code>good</code> sur une carte neuve ?",
   "a": "3 jours (puis intervalle × facilité à chaque réussite)."
  },
  {
   "q": "Quel intervalle donne <code>easy</code> sur une carte neuve ?",
   "a": "7 jours, et la facilité augmente de 0,15."
  },
  {
   "q": "Que fait la note <code>again</code> ?",
   "a": "Ramène l'intervalle à 1 jour, baisse la facilité de 0,2 et fait revenir la carte dans la séance 15 minutes plus tard."
  },
  {
   "q": "Pourquoi la facilité a-t-elle un minimum de 1,3 ?",
   "a": "Pour que l'intervalle continue de grandir : sans plancher, des échecs répétés feraient tendre la facilité vers 1 et les révisions se rapprocheraient trop."
  },
  {
   "q": "Suite d'intervalles pour <code>good</code> ×4 depuis une carte neuve ?",
   "a": "3 j, 8 j, 20 j, 50 j."
  },
  {
   "q": "Quel défaut ont des <code>hard</code> répétés avec <code>round(iv × 1.2)</code> ?",
   "a": "L'intervalle reste bloqué à 1 jour. On corrige avec <code>Math.max(iv + 1, Math.round(iv * 1.2))</code>."
  },
  {
   "q": "Pourquoi passer <code>maintenant</code> en paramètre ?",
   "a": "Pour pouvoir tester l'algorithme en simulant le temps, sans attendre et sans dépendre de l'horloge."
  },
  {
   "q": "Que fait <code>console.assert(condition, message)</code> ?",
   "a": "N'affiche le message que si la condition est fausse : c'est un test minimal."
  },
  {
   "q": "Pourquoi chaque carte garde-t-elle la date de sa dernière révision ?",
   "a": "Pour fusionner la progression de plusieurs appareils : la version la plus récente gagne au lieu d'écraser."
  },
  {
   "q": "Quel inconvénient d'identifier une carte par sa question ?",
   "a": "Modifier la question crée une « nouvelle » carte et fait perdre son historique de révision."
  }
 ]
},
 "Appli installable : PWA, manifest & service worker": {
 "cours": "<h3>Qu'est-ce qu'une PWA ?</h3>\n<p>Une <strong>PWA</strong> (<em>Progressive Web App</em>) est un site web qui se comporte comme une application : on peut l'<strong>installer</strong> sur l'écran d'accueil, elle s'ouvre en plein écran, <strong>marche hors-ligne</strong> et peut envoyer des notifications. Aucun magasin d'applications : c'est du HTML, du CSS et du JavaScript.</p>\n<table class=\"formula-table\"><tr><th>Ingrédient</th><th>Fichier</th><th>Rôle</th></tr><tr><td>Le <strong>site en HTTPS</strong></td><td>—</td><td>obligatoire (sauf <code>localhost</code> pour tester) : un service worker ne tourne pas en HTTP simple</td></tr><tr><td>Le <strong>manifest</strong></td><td><code>manifest.json</code></td><td>décrit l'appli : nom, icônes, couleurs, mode d'affichage</td></tr><tr><td>Le <strong>service worker</strong></td><td><code>sw.js</code></td><td>un script qui s'intercale entre la page et le réseau : cache, hors-ligne, notifications</td></tr></table>\n<h3>Le manifest</h3>\n<pre><code>{\n  \"name\": \"BacMaster\",\n  \"short_name\": \"BacMaster\",\n  \"start_url\": \"./\",\n  \"display\": \"standalone\",\n  \"background_color\": \"#0b1020\",\n  \"theme_color\": \"#4f46e5\",\n  \"icons\": [\n    { \"src\": \"icon-192.png\", \"sizes\": \"192x192\", \"type\": \"image/png\", \"purpose\": \"any\" },\n    { \"src\": \"icon-512.png\", \"sizes\": \"512x512\", \"type\": \"image/png\", \"purpose\": \"any\" },\n    { \"src\": \"icon-maskable-512.png\", \"sizes\": \"512x512\", \"type\": \"image/png\", \"purpose\": \"maskable\" }\n  ]\n}</code></pre>\n<pre><code>&lt;link rel=\"manifest\" href=\"manifest.json\"&gt;\n&lt;meta name=\"theme-color\" content=\"#4f46e5\"&gt;</code></pre>\n<ul><li><code>display: \"standalone\"</code> : l'appli s'ouvre sans la barre d'adresse du navigateur.</li><li>Une icône <strong>maskable</strong> a une marge de sécurité : Android la découpe en rond ou en carré arrondi. Sans elle, ton logo peut être rogné.</li><li>Si tu déclares <code>\"purpose\": \"any maskable\"</code> sur la même image, elle sert aux deux usages et risque d'être mal cadrée : mieux vaut deux fichiers.</li></ul>\n<h3>Le service worker : un intermédiaire</h3>\n<p>Le <strong>service worker</strong> est un script qui tourne en arrière-plan, séparé de la page. Chaque requête réseau de ta page (HTML, images, scripts…) peut passer par lui : il décide de répondre avec le <strong>cache</strong>, avec le <strong>réseau</strong>, ou avec un mélange.</p>\n<pre><code>// dans app.js : on enregistre le service worker\nif (\"serviceWorker\" in navigator) {\n  window.addEventListener(\"load\", () =&gt; {\n    navigator.serviceWorker.register(\"./sw.js\");\n  });\n}</code></pre>\n<h3>Son cycle de vie</h3>\n<ol><li><strong>install</strong> : le navigateur télécharge <code>sw.js</code> ; on en profite pour <em>pré-charger</em> les fichiers dans le cache.</li><li><strong>activate</strong> : le nouveau service worker prend la main ; on y <em>supprime les anciens caches</em>.</li><li><strong>fetch</strong> : à chaque requête, on choisit comment répondre.</li></ol>\n<pre><code>const CACHE = \"mon-app-v1\";                      // à changer à chaque mise en ligne !\nconst FICHIERS = [\"./\", \"./index.html\", \"./style.css\", \"./app.js\", \"./icon-192.png\"];\n\nself.addEventListener(\"install\", (evenement) =&gt; {\n  evenement.waitUntil(caches.open(CACHE).then((cache) =&gt; cache.addAll(FICHIERS)));\n  self.skipWaiting();                            // prend la main tout de suite\n});\n\nself.addEventListener(\"activate\", (evenement) =&gt; {\n  evenement.waitUntil(\n    caches.keys().then((noms) =&gt;\n      Promise.all(noms.filter((n) =&gt; n !== CACHE).map((n) =&gt; caches.delete(n)))   // ménage\n    ).then(() =&gt; self.clients.claim())\n  );\n});\n\nself.addEventListener(\"fetch\", (evenement) =&gt; {\n  evenement.respondWith(\n    caches.match(evenement.request).then((enCache) =&gt; enCache || fetch(evenement.request))\n  );\n});</code></pre>\n<h3>Les stratégies de cache</h3>\n<table class=\"formula-table\"><tr><th>Stratégie</th><th>Principe</th><th>Bon pour</th></tr><tr><td><strong>Cache d'abord</strong></td><td>répond avec le cache, sinon le réseau</td><td>fichiers qui changent rarement (images, scripts) : démarrage instantané, marche hors-ligne</td></tr><tr><td><strong>Réseau d'abord</strong></td><td>essaie le réseau, sinon le cache</td><td>contenu qui doit être frais (avec un <em>délai maximum</em> !)</td></tr><tr><td><strong>Cache puis mise à jour</strong></td><td>répond tout de suite avec le cache et met à jour en arrière-plan</td><td>le meilleur compromis pour du contenu externe (CDN, polices)</td></tr></table>\n<div class=\"attention-box\"><strong>Bug réel de BacMaster : 30 secondes pour démarrer sur téléphone.</strong> Le script Supabase (hébergé sur un CDN) était chargé en « réseau d'abord » <em>sans délai maximum</em>, et il bloquait l'affichage de toute la page. Sur un réseau mobile lent, tout attendait. Corrections : charger ce script <em>après</em> l'affichage, servir les ressources externes depuis le cache, et limiter l'attente réseau à quelques secondes.</div>\n<h3>Mettre à jour une PWA sans casser l'usage</h3>\n<ul><li>Le navigateur vérifie si <code>sw.js</code> a changé (même d'un seul caractère). C'est pour cela qu'on <strong>change le nom du cache</strong> à chaque mise en ligne : sinon les téléphones gardent l'ancienne version.</li><li><strong>Ne recharge jamais la page tout seul</strong> quand une mise à jour arrive : l'utilisateur est peut-être en train de cliquer ou d'écrire. BacMaster rechargeait ~20 s après l'ouverture et ramenait l'élève à l'accueil en plein usage. Mieux : recharger si l'utilisateur n'a encore rien touché, sinon attendre qu'il quitte l'appli.</li><li>Chaque <strong>nouveau fichier</strong> doit être ajouté à la liste du cache, sinon il ne marche pas hors-ligne.</li></ul>\n<pre><code>// mise à jour douce, côté page\nlet rechargerPlusTard = false;\nnavigator.serviceWorker.addEventListener(\"controllerchange\", () =&gt; { rechargerPlusTard = true; });\ndocument.addEventListener(\"visibilitychange\", () =&gt; {\n  if (document.visibilityState === \"hidden\" &amp;&amp; rechargerPlusTard) location.reload();   // quand l'élève quitte l'appli\n});</code></pre>\n<h3>Tester et mettre en ligne</h3>\n<ul><li><strong>Outils de développement → Application</strong> : voir le manifest, le service worker, les caches ; bouton « Update on reload » pendant le développement ; cocher « Offline » pour simuler le hors-ligne.</li><li><strong>Lighthouse</strong> (onglet des outils de développement) : note la qualité PWA, la performance et l'accessibilité.</li><li><strong>GitHub Pages</strong> : dépôt → Settings → Pages → choisir la branche ; ton site est servi en HTTPS gratuitement.</li><li>Les <strong>notifications push</strong> demandent en plus un serveur qui envoie les messages (protocole Web Push) : c'est le sujet d'un cours à part.</li></ul>\n<div class=\"retenir-box\"><strong>À retenir :</strong> manifest (identité) + service worker (cache) + HTTPS = PWA ; <strong>changer le nom du cache à chaque mise en ligne</strong> ; stratégie « cache puis mise à jour » pour l'externe ; jamais de ressource externe bloquante au démarrage ; jamais de rechargement automatique en plein usage.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Cite les trois ingrédients qu'il faut pour qu'un site web devienne une PWA installable, et le fichier associé à chacun.</p>",
   "aide": "Un fichier décrit l'appli, un autre gère le cache ; et il faut un protocole sécurisé.",
   "correction": "<p>1) <strong>HTTPS</strong> (ou localhost pour tester) ; 2) le <strong>manifest</strong> (<code>manifest.json</code>) : nom, icônes, couleurs, <code>display</code> ; 3) le <strong>service worker</strong> (<code>sw.js</code>) : cache et hors-ligne.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Tu mets en ligne une nouvelle version de <code>app.js</code> mais tes camarades continuent de voir l'ancienne. Donne la cause la plus probable et la correction.</p>",
   "aide": "Qu'est-ce que le navigateur compare pour savoir s'il doit mettre à jour le service worker ?",
   "correction": "<p>Le service worker et son cache n'ont pas changé : le navigateur sert l'ancienne copie en cache. <strong>Correction :</strong> modifier <code>sw.js</code>, au minimum en changeant le nom du cache (<code>mon-app-v1</code> → <code>mon-app-v2</code>) ; le nouveau service worker s'installe, recharge les fichiers et supprime l'ancien cache à l'activation.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Quelle stratégie de cache choisirais-tu pour : (a) l'image du logo ; (b) un script hébergé sur un CDN ; (c) une API qui donne le score du jour ? Justifie.</p>",
   "aide": "Pense à la fraîcheur des données et à la rapidité de démarrage.",
   "correction": "<p>(a) <strong>Cache d'abord</strong> : le logo ne change presque jamais, réponse immédiate et hors-ligne. (b) <strong>Cache puis mise à jour</strong> : démarrage rapide même sur réseau lent, et la copie se rafraîchit en arrière-plan. (c) <strong>Réseau d'abord</strong>, avec un délai maximum de quelques secondes puis repli sur le cache : la donnée doit être fraîche, mais l'appli ne doit pas rester bloquée.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Écris le gestionnaire <code>fetch</code> d'un service worker en « <strong>cache puis mise à jour</strong> » : si la réponse est en cache on la renvoie tout de suite, et dans tous les cas on télécharge la version fraîche pour remplacer la copie du cache.</p>",
   "aide": "Lance fetch(request) en parallèle ; si le cache a une réponse, renvoie-la sans attendre le réseau ; mets à jour le cache avec cache.put(request, reponse.clone()).",
   "correction": "<p></p><pre><code>self.addEventListener(\"fetch\", (evenement) =&gt; {\n  const requete = evenement.request;\n  if (requete.method !== \"GET\") return;               // on ne met en cache que les lectures\n  evenement.respondWith(\n    caches.open(CACHE).then(async (cache) =&gt; {\n      const enCache = await cache.match(requete);\n      const reseau = fetch(requete).then((reponse) =&gt; {\n        if (reponse.ok) cache.put(requete, reponse.clone());   // clone : une réponse ne se lit qu'une fois\n        return reponse;\n      });\n      if (enCache) { reseau.catch(() =&gt; {}); return enCache; } // réponse immédiate, mise à jour en arrière-plan\n      return reseau;                                           // sinon on attend le réseau\n    })\n  );\n});</code></pre>"
  }
 ],
 "flashcards": [
  {
   "q": "Qu'est-ce qu'une PWA ?",
   "a": "Un site web installable qui se comporte comme une appli : plein écran, hors-ligne, notifications possibles. C'est du HTML, du CSS et du JavaScript."
  },
  {
   "q": "Quels sont les 3 ingrédients d'une PWA installable ?",
   "a": "Le site en HTTPS, un fichier manifest (identité de l'appli) et un service worker (cache et hors-ligne)."
  },
  {
   "q": "Que contient <code>manifest.json</code> ?",
   "a": "Le nom, <code>start_url</code>, <code>display</code> (par exemple <code>standalone</code>), les couleurs et les icônes de l'appli."
  },
  {
   "q": "À quoi sert une icône « maskable » ?",
   "a": "Elle a une marge de sécurité pour que le système la découpe (rond, carré arrondi) sans rogner le logo."
  },
  {
   "q": "Qu'est-ce qu'un service worker ?",
   "a": "Un script qui tourne en arrière-plan, séparé de la page, et peut intercepter les requêtes réseau (cache, hors-ligne, notifications)."
  },
  {
   "q": "Quels sont les 3 événements du cycle de vie d'un service worker ?",
   "a": "<code>install</code> (pré-chargement du cache), <code>activate</code> (suppression des anciens caches) et <code>fetch</code> (réponse à chaque requête)."
  },
  {
   "q": "Que fait <code>skipWaiting()</code> ?",
   "a": "Le nouveau service worker prend la main tout de suite, sans attendre que tous les onglets soient fermés."
  },
  {
   "q": "Pourquoi changer le nom du cache à chaque mise en ligne ?",
   "a": "Le navigateur ne met à jour que si <code>sw.js</code> a changé : changer le nom force l'installation et le renouvellement des fichiers en cache."
  },
  {
   "q": "Que fait la stratégie « cache d'abord » ?",
   "a": "Répond avec le cache, et ne va au réseau que si le fichier n'y est pas : rapide et utilisable hors-ligne."
  },
  {
   "q": "Que fait « cache puis mise à jour » ?",
   "a": "Répond tout de suite avec la copie en cache et rafraîchit cette copie en arrière-plan : bon compromis pour les ressources externes."
  },
  {
   "q": "Pourquoi <code>response.clone()</code> avant <code>cache.put</code> ?",
   "a": "Une réponse ne peut être lue qu'une seule fois : on en garde une copie pour le cache et on renvoie l'autre à la page."
  },
  {
   "q": "Pourquoi ne faut-il pas recharger la page automatiquement à chaque mise à jour ?",
   "a": "L'utilisateur peut être en train de cliquer ou d'écrire : le rechargement le ramène au début. Mieux vaut attendre qu'il quitte l'appli."
  },
  {
   "q": "Pourquoi une ressource externe bloquante ralentit-elle le démarrage ?",
   "a": "La page attend de la recevoir avant de continuer ; sur un réseau mobile lent, tout reste figé. On la charge après l'affichage ou depuis le cache."
  },
  {
   "q": "Comment tester le mode hors-ligne ?",
   "a": "Outils de développement → Application → cocher « Offline », puis recharger la page."
  }
 ]
},
 "Un compte et une base en ligne : Supabase, SQL & synchronisation": {
 "cours": "<h3>Pourquoi un serveur ?</h3>\n<p>Sans serveur, ta progression reste sur <em>un seul</em> appareil. Pour retrouver ton compte sur le téléphone et l'ordinateur, partager un cours avec la classe et sauvegarder en ligne, il faut une <strong>base de données en ligne</strong> et des <strong>comptes</strong>.</p>\n<p><strong>Supabase</strong> offre tout cela sans écrire de serveur : une base <strong>PostgreSQL</strong>, l'<strong>authentification</strong> (comptes, mots de passe), une <strong>API automatique</strong> pour lire et écrire, des mises à jour en <strong>temps réel</strong> et des règles de sécurité (<strong>RLS</strong>). Une offre gratuite suffit pour démarrer.</p>\n<h3>Concevoir ses tables</h3>\n<p>Une table = un tableau avec des colonnes typées. Dans BacMaster, <strong>un chapitre = une ligne</strong> : deux personnes qui modifient deux chapitres différents ne se gênent pas.</p>\n<pre><code>create table public.chapitres (\n  matiere     text        not null,\n  chapitre    text        not null,\n  contenu     jsonb       not null default '{}',   -- cours, cartes, exercices\n  modifie_le  timestamptz not null default now(),\n  modifie_par uuid        references auth.users (id),\n  supprime    boolean     not null default false,  -- suppression « douce »\n  primary key (matiere, chapitre)\n);\n\nalter table public.chapitres enable row level security;   -- indispensable : voir le cours de Cybersécurité</code></pre>\n<ul><li>La <strong>clé primaire</strong> (<code>matiere</code> + <code>chapitre</code>) identifie une ligne de façon unique.</li><li><code>jsonb</code> range un objet JSON : pratique pour le contenu d'un chapitre.</li><li><code>supprime</code> : on <em>marque</em> une ligne comme supprimée au lieu de l'effacer, ce qui permet de la restaurer et de synchroniser la suppression entre appareils.</li></ul>\n<h3>Le SQL en 4 requêtes</h3>\n<pre><code>select matiere, chapitre from public.chapitres where matiere = 'Maths' order by chapitre;\n\ninsert into public.chapitres (matiere, chapitre, contenu) values ('Maths', 'Suites', '{\"cours\":\"…\"}');\n\nupdate public.chapitres set supprime = true where matiere = 'Maths' and chapitre = 'Suites';\n\n-- « insère, ou met à jour si la ligne existe déjà » (upsert)\ninsert into public.chapitres (matiere, chapitre, contenu)\nvalues ('Maths', 'Suites', '{\"cours\":\"v2\"}')\non conflict (matiere, chapitre) do update set contenu = excluded.contenu, modifie_le = now();</code></pre>\n<h3>Le client JavaScript (supabase-js)</h3>\n<pre><code>// L'URL et la clé « anon » sont PUBLIQUES (la sécurité vient des règles RLS, pas de leur secret)\nconst supabase = window.supabase.createClient(URL_DU_PROJET, CLE_ANON);\n\n// Comptes\nconst { data, error } = await supabase.auth.signUp({ email, password });\nawait supabase.auth.signInWithPassword({ email, password });\nconst { data: { session } } = await supabase.auth.getSession();    // null si personne n'est connecté\nsupabase.auth.onAuthStateChange((evenement, session) =&gt; { /* connexion, déconnexion… */ });\nawait supabase.auth.signOut();\n\n// Lire\nconst { data: chapitres, error: e1 } = await supabase\n  .from(\"chapitres\").select(\"*\").eq(\"matiere\", \"Maths\");\nif (e1) console.warn(\"Lecture impossible :\", e1.message);\n\n// Écrire (upsert = insérer ou mettre à jour)\nconst { error: e2 } = await supabase.from(\"chapitres\").upsert({\n  matiere: \"Maths\", chapitre: \"Suites\", contenu: { cours: \"…\" },\n});</code></pre>\n<div class=\"attention-box\">Chaque appel renvoie <code>{ data, error }</code> et <strong>ne lève pas d'exception</strong> : il faut tester <code>error</code> à chaque fois. Et pense au cas <em>réseau indisponible</em> (l'appli doit continuer en local).</div>\n<h3>Le temps réel : voir les changements des autres</h3>\n<pre><code>supabase\n  .channel(\"chapitres\")\n  .on(\"postgres_changes\", { event: \"*\", schema: \"public\", table: \"chapitres\" }, (evenement) =&gt; {\n    appliquerChangementDistant(evenement.new);     // un autre appareil a modifié une ligne\n  })\n  .subscribe();</code></pre>\n<h3>La synchronisation : les 5 règles qui évitent les catastrophes</h3>\n<ol><li><strong>Local d'abord</strong> : l'appli écrit toujours en local, puis publie en ligne quand elle peut. L'élève n'attend jamais le réseau.</li><li><strong>Publier avec un debounce</strong> (quelques secondes après la dernière modification), pas à chaque frappe.</li><li><strong>Éviter l'écho</strong> : ce que tu viens de <em>recevoir</em> ne doit pas être <em>republié</em> (sinon boucle infinie entre deux appareils). Un drapeau <code>applyingRemote</code> l'empêche.</li><li><strong>Conflits : le plus récent gagne, élément par élément.</strong> Pour la progression, chaque carte a sa date de révision et c'est la plus récente qui l'emporte. Faire gagner « la dernière sauvegarde » écraserait tout et ferait reculer l'autre appareil (bug réel de BacMaster, corrigé).</li><li><strong>Ne pas écraser sans lire</strong> : avant d'écrire, comparer avec la version connue (ou un numéro de version) pour détecter qu'un autre a modifié entre-temps ; sinon, <em>fusionner</em>.</li></ol>\n<h3>Éviter les pièges de conception</h3>\n<ul><li><strong>Une ligne par chapitre</strong> plutôt qu'une énorme ligne « tout le contenu » : un conflit sur un chapitre n'abîme pas les autres.</li><li><strong>Suppression douce</strong> (<code>supprime = true</code>) : la suppression se propage aux autres appareils et reste réversible.</li><li><strong>Un journal des versions</strong> (table d'historique) pour restaurer un cours abîmé.</li><li><strong>Ne jamais faire confiance à ce qui arrive</strong> d'un autre compte : un contenu partagé peut contenir du code malveillant. On le <em>nettoie</em> avant de l'afficher (voir « XSS » en Cybersécurité).</li></ul>\n<div class=\"retenir-box\"><strong>À retenir :</strong> Supabase = PostgreSQL + comptes + API + temps réel + RLS ; une ligne par chapitre ; tester <code>error</code> à chaque appel ; <strong>local d'abord</strong>, publication différée, pas d'écho, <strong>le plus récent gagne par élément</strong> ; la clé <code>anon</code> est publique, la sécurité vient des règles RLS.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Associe chaque besoin à la fonction de Supabase : (a) retrouver son compte sur un autre appareil ; (b) voir en direct la modification d'un camarade ; (c) empêcher un lecteur de modifier un cours.</p>",
   "aide": "Authentification, temps réel, règles de sécurité.",
   "correction": "<p>(a) <strong>Authentification</strong> (comptes) ; (b) <strong>Temps réel</strong> (<code>postgres_changes</code>) ; (c) <strong>RLS</strong> (règles de sécurité de la base).</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Écris la requête SQL qui renvoie les chapitres de la matière « Français » qui ne sont pas supprimés, triés par nom.</p>",
   "aide": "where avec deux conditions, puis order by.",
   "correction": "<p></p><pre><code>select chapitre\nfrom public.chapitres\nwhere matiere = 'Français' and supprime = false\norder by chapitre;</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris, avec supabase-js, le code qui récupère les chapitres non supprimés de la matière « Maths » et affiche le nombre trouvé, en gérant l'erreur.</p>",
   "aide": ".from().select().eq().eq() puis tester error.",
   "correction": "<p></p><pre><code>const { data, error } = await supabase\n  .from(\"chapitres\")\n  .select(\"chapitre\")\n  .eq(\"matiere\", \"Maths\")\n  .eq(\"supprime\", false);\n\nif (error) {\n  console.warn(\"Lecture impossible :\", error.message);\n} else {\n  console.log(data.length + \" chapitres\");\n}</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Deux appareils A et B sont connectés. A publie une modification ; Supabase la renvoie à B en temps réel ; B la publie à son tour ; A la reçoit… Explique le problème et donne une solution.</p>",
   "aide": "Chacun republie ce qu'il vient de recevoir.",
   "correction": "<p>C'est une <strong>boucle d'écho</strong> : ce qui est reçu est republié, donc reçu de nouveau, à l'infini (charge inutile, conflits). <strong>Solution :</strong> pendant qu'on applique un changement venu du serveur, lever un drapeau (<code>applyingRemote = true</code>) pour que la sauvegarde ne déclenche <em>pas</em> de publication ; et ne publier que ce qui diffère de la dernière version connue.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Le téléphone a révisé la carte X hier ; l'ordinateur a une ancienne copie de X et publie sa progression ce matin. Que se passe-t-il avec « la dernière sauvegarde gagne » ? Propose une règle correcte et le champ nécessaire.</p>",
   "aide": "Qui a la donnée la plus récente ? Comment le savoir ?",
   "correction": "<p>Avec « la dernière sauvegarde gagne », l'ordinateur (qui publie en dernier) <strong>écrase</strong> la révision d'hier : le téléphone revient en arrière. <strong>Règle correcte :</strong> pour chaque carte, garder la version dont la <strong>date de dernière révision</strong> est la plus récente ; à égalité, la plus avancée (intervalle le plus grand). Champ nécessaire : un horodatage par carte (par exemple <code>derniereRevision</code>).</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Pourquoi un serveur pour une appli de révision ?",
   "a": "Pour retrouver son compte et sa progression sur plusieurs appareils, partager des cours et sauvegarder en ligne."
  },
  {
   "q": "Que fournit Supabase ?",
   "a": "Une base PostgreSQL, l'authentification (comptes), une API automatique, le temps réel et les règles de sécurité RLS."
  },
  {
   "q": "Pourquoi une ligne par chapitre plutôt qu'une grosse ligne ?",
   "a": "Deux personnes qui modifient des chapitres différents ne se gênent pas, et un conflit n'abîme pas tout le contenu."
  },
  {
   "q": "Qu'est-ce qu'une clé primaire ?",
   "a": "Une ou plusieurs colonnes qui identifient une ligne de façon unique (ici matière + chapitre)."
  },
  {
   "q": "Que fait un <code>upsert</code> ?",
   "a": "Insère la ligne si elle n'existe pas, sinon la met à jour."
  },
  {
   "q": "Quel est l'intérêt de la suppression « douce » ?",
   "a": "On marque la ligne <code>supprime = true</code> au lieu de l'effacer : la suppression se synchronise sur tous les appareils et reste réversible."
  },
  {
   "q": "Que renvoie un appel supabase-js ?",
   "a": "Un objet <code>{ data, error }</code> ; il ne lève pas d'exception, il faut tester <code>error</code>."
  },
  {
   "q": "Comment se connecter avec supabase-js ?",
   "a": "<code>supabase.auth.signInWithPassword({ email, password })</code> ; <code>getSession()</code> donne la session courante ou <code>null</code>."
  },
  {
   "q": "Comment recevoir les changements des autres en direct ?",
   "a": "Avec un canal temps réel : <code>supabase.channel(...).on(\"postgres_changes\", …).subscribe()</code>."
  },
  {
   "q": "Que veut dire « local d'abord » ?",
   "a": "L'appli écrit d'abord en local puis publie en ligne quand le réseau le permet : l'élève n'attend jamais le serveur."
  },
  {
   "q": "Qu'est-ce qu'une boucle d'écho en synchronisation ?",
   "a": "Un appareil republie ce qu'il vient de recevoir, qui est reçu de nouveau… à l'infini. On l'évite avec un drapeau pendant l'application du distant."
  },
  {
   "q": "Quelle règle de conflit évite de faire reculer un appareil ?",
   "a": "Pour chaque élément, la version la plus récente gagne (date par carte), au lieu de « la dernière sauvegarde écrase tout »."
  },
  {
   "q": "La clé <code>anon</code> de Supabase est-elle secrète ?",
   "a": "Non, elle est publique par conception. La sécurité vient des règles RLS ; la clé <code>service_role</code> en revanche ne doit jamais être dans le navigateur."
  },
  {
   "q": "Pourquoi nettoyer un contenu reçu d'un autre compte ?",
   "a": "Il peut contenir du code malveillant (XSS) qui s'exécuterait chez tous les lecteurs ; on le nettoie avant de l'afficher."
  }
 ]
}
});

/* ===== Ajout du 23/11/2026 : nouveaux chapitres ===== */
Object.assign(PREBUILT["Informatique"], {
 "Linux & terminal — les commandes qui servent vraiment": {
 "cours": "<div class=\"retenir-box\"><strong>Pourquoi apprendre le terminal ?</strong> Presque tous les serveurs, les outils de cybersécurité, les conteneurs et les services en ligne (dont ceux que ton appli utilise) tournent sous <mark>Linux</mark>. Dans un terminal, tu <em>écris</em> des ordres au lieu de cliquer : c'est plus rapide, répétable et automatisable.</div><h3>Sous Windows : deux façons d'y accéder</h3><ul><li><strong>WSL</strong> : dans PowerShell (en administrateur), tape <code>wsl --install</code>, redémarre, et tu as un vrai Linux (Ubuntu) dans Windows.</li><li><strong>Git Bash</strong> : installé avec Git, il comprend les commandes de base (<code>ls</code>, <code>cd</code>, <code>grep</code>…).</li></ul><h3>1. S'orienter dans les dossiers</h3><table class=\"formula-table\"><tr><th>Commande</th><th>Rôle</th></tr><tr><td><code>pwd</code></td><td>affiche le dossier où tu es</td></tr><tr><td><code>ls -la</code></td><td>liste les fichiers, <em>y compris cachés</em> (ceux qui commencent par un point, comme <code>.env</code>), avec les droits</td></tr><tr><td><code>cd dossier</code> / <code>cd ..</code> / <code>cd ~</code></td><td>entrer dans un dossier / remonter d'un cran / retourner chez soi</td></tr><tr><td><code>mkdir -p a/b</code></td><td>crée un dossier (et ses parents si besoin)</td></tr><tr><td><code>touch fichier</code></td><td>crée un fichier vide</td></tr><tr><td><code>cp</code> / <code>mv</code></td><td>copier / déplacer ou renommer</td></tr><tr><td><code>rm fichier</code></td><td>supprime — <strong>sans corbeille</strong></td></tr></table><p>Un chemin <strong>absolu</strong> part de la racine (<code>/home/martin/projet</code>), un chemin <strong>relatif</strong> part d'où tu es (<code>src/app.py</code>). Le point <code>.</code> désigne le dossier courant, <code>..</code> le dossier parent.</p><div class=\"attention-box\"><strong>Danger :</strong> <code>rm -rf dossier</code> supprime tout, récursivement, sans demander. Relis toujours la commande avant d'appuyer sur Entrée et ne copie jamais une commande <code>rm -rf</code> ou <code>sudo</code> que tu ne comprends pas.</div><h3>2. Lire et chercher</h3><pre><code>$ cat docs/notes.txt          # affiche tout le fichier\n$ head -n 3 fichier          # les 3 premières lignes\n$ tail -n 2 fichier          # les 2 dernières (tail -f suit un journal en direct)\n$ wc -l src/app.py           # compte les lignes\n$ find . -name \"*.py\"        # trouve des fichiers par nom\n./src/app.py\n$ grep -rn \"TODO\" .          # cherche un texte dans tous les fichiers (r = récursif, n = n° de ligne)\n./src/app.py:3:# TODO: ajouter un test\n./docs/notes.txt:2:TODO: relire</code></pre><h3>3. Enchaîner avec les tubes et les redirections</h3><p>Le <strong>tube</strong> <code>|</code> envoie la sortie d'une commande dans l'entrée de la suivante. C'est la force du terminal : de petits outils combinés.</p><pre><code>$ grep -rn \"TODO\" . | wc -l           # combien de TODO ?\n2\n$ printf 'b\\na\\nb\\nc\\nb\\n' | sort | uniq -c | sort -rn\n      3 b\n      1 c\n      1 a\n$ echo \"ligne 1\" &gt; t.txt              # &gt; écrase le fichier\n$ echo \"ligne 2\" &gt;&gt; t.txt             # &gt;&gt; ajoute à la fin</code></pre><p><code>sort</code> trie, <code>uniq -c</code> compte les lignes identiques consécutives (d'où le tri avant), <code>sort -rn</code> trie numériquement du plus grand au plus petit.</p><h3>4. Les droits : lire <code>rwx</code></h3><p>Chaque fichier a trois groupes de droits : <strong>propriétaire (u)</strong>, <strong>groupe (g)</strong>, <strong>autres (o)</strong>. Chaque groupe a <code>r</code> (lire = 4), <code>w</code> (écrire = 2), <code>x</code> (exécuter = 1).</p><table class=\"formula-table\"><tr><th>Notation numérique</th><th>Lettres</th><th>Usage typique</th></tr><tr><td><code>755</code></td><td><code>rwxr-xr-x</code></td><td>programme ou dossier public</td></tr><tr><td><code>644</code></td><td><code>rw-r--r--</code></td><td>fichier normal lisible par tous</td></tr><tr><td><code>600</code></td><td><code>rw-------</code></td><td>secret : clé privée, <code>.env</code></td></tr><tr><td><code>754</code></td><td><code>rwxr-xr--</code></td><td>7 = 4+2+1, 5 = 4+1, 4 = 4</td></tr></table><pre><code>$ chmod 640 docs/notes.txt     # rw-r----- (propriétaire écrit, groupe lit, autres rien)\n$ chmod u+x src/app.py        # ajoute le droit d'exécuter au propriétaire\n$ ls -l docs/notes.txt\n-rw-r----- 1 martin martin 32 Nov 23 07:08 docs/notes.txt</code></pre><h3>5. Processus, administrateur et paquets</h3><ul><li><code>ps aux</code> liste les processus, <code>top</code> les suit en direct, <code>kill PID</code> en arrête un.</li><li><code>sudo</code> exécute une commande avec les droits d'administrateur (<em>super user do</em>).</li><li><code>sudo apt update && sudo apt install nom</code> installe un logiciel (Debian/Ubuntu).</li><li><code>man commande</code> ou <code>commande --help</code> affiche l'aide : <mark>toujours le premier réflexe</mark>.</li></ul><h3>6. Un premier script</h3><pre><code>#!/bin/bash\nnom=\"$1\"\necho \"Salut ${nom:-toi} !\"</code></pre><p>Enregistre-le dans <code>hello.sh</code>, rends-le exécutable (<code>chmod +x hello.sh</code>) puis lance <code>./hello.sh Martin</code> → <code>Salut Martin !</code> ; sans argument → <code>Salut toi !</code>. <code>$1</code> est le premier argument et <code>${nom:-toi}</code> donne une valeur par défaut.</p><div class=\"retenir-box\"><strong>À retenir :</strong> <code>ls -la</code> et <code>pwd</code> pour te repérer · <code>grep -rn</code> pour chercher · <code>|</code> pour enchaîner · <code>chmod 600</code> pour un secret · <code>man</code> pour comprendre · <mark>jamais de <code>rm -rf</code> ou <code>sudo</code> copiés sans comprendre</mark>.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Que fait exactement <code>grep -rn \"TODO\" . | wc -l</code> ?</p>",
   "aide": "Deux commandes reliées par un tube.",
   "correction": "<p><code>grep -rn \"TODO\" .</code> liste toutes les lignes contenant TODO dans le dossier courant et ses sous-dossiers ; le tube envoie cette liste à <code>wc -l</code> qui <strong>compte les lignes</strong>. Résultat : le nombre de TODO du projet (2 dans notre exemple).</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Traduis <code>640</code> en lettres, puis dis qui peut quoi.</p>",
   "aide": "6 = 4+2, 4 = 4, 0 = rien.",
   "correction": "<p><code>rw-r-----</code>. Le propriétaire lit et écrit ; le groupe peut seulement lire ; les autres n'ont aucun droit.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris une commande qui liste <strong>seulement les fichiers Python</strong> contenant le texte <code>import os</code>.</p>",
   "aide": "grep a une option pour n'afficher que les noms de fichiers et une autre pour filtrer par extension.",
   "correction": "<p><code>grep -rl \"import os\" --include=\"*.py\" .</code> — <code>-r</code> récursif, <code>-l</code> n'affiche que les noms des fichiers, <code>--include</code> limite aux <code>.py</code>.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Ton client SSH refuse d'utiliser ta clé privée en disant que ses droits sont « trop ouverts » (<code>644</code>). Quelle commande corrige, et pourquoi est-ce une protection ?</p>",
   "aide": "Une clé privée est un secret.",
   "correction": "<p><code>chmod 600 ~/.ssh/ma_cle</code>. Avec <code>644</code>, tous les utilisateurs de la machine pourraient <strong>lire</strong> ta clé privée et se faire passer pour toi. SSH refuse donc de s'en servir tant que seul le propriétaire y a accès.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Tu as un fichier <code>access.log</code> d'un serveur web dont chaque ligne commence par l'adresse IP du visiteur. Écris <strong>une seule</strong> commande qui affiche les 3 IP les plus fréquentes avec leur nombre de visites, et explique chaque étape.</p>",
   "aide": "awk peut extraire la 1re colonne ; puis sort, uniq -c, sort -rn et head.",
   "correction": "<p><code>awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -n 3</code></p><ul><li><code>awk '{print $1}'</code> : garde la 1re colonne (l'IP).</li><li><code>sort</code> : regroupe les IP identiques côte à côte.</li><li><code>uniq -c</code> : compte chaque groupe.</li><li><code>sort -rn</code> : du plus grand nombre au plus petit.</li><li><code>head -n 3</code> : garde les 3 premières lignes.</li></ul>"
  }
 ],
 "flashcards": [
  {
   "q": "Que fait <code>ls -la</code> de plus que <code>ls</code> ?",
   "a": "Il affiche aussi les fichiers cachés (commençant par un point) et les détails : droits, propriétaire, taille, date."
  },
  {
   "q": "Différence entre chemin absolu et relatif ?",
   "a": "Absolu : part de la racine <code>/</code>. Relatif : part du dossier où l'on se trouve (<code>.</code> = ici, <code>..</code> = parent)."
  },
  {
   "q": "Que signifie <code>chmod 754</code> ?",
   "a": "<code>rwxr-xr--</code> : propriétaire tous les droits (7), groupe lire+exécuter (5), autres lire seulement (4)."
  },
  {
   "q": "Valeur numérique de r, w, x ?",
   "a": "r = 4, w = 2, x = 1 ; on additionne pour chaque groupe (u, g, o)."
  },
  {
   "q": "Quelle commande cherche « TODO » dans tous les fichiers d'un dossier, avec les numéros de ligne ?",
   "a": "<code>grep -rn \"TODO\" .</code>"
  },
  {
   "q": "Rôle du tube <code>|</code> ?",
   "a": "Envoie la sortie d'une commande en entrée de la suivante (ex. <code>grep … | wc -l</code>)."
  },
  {
   "q": "Différence entre <code>&gt;</code> et <code>&gt;&gt;</code> ?",
   "a": "<code>&gt;</code> écrase le fichier, <code>&gt;&gt;</code> ajoute à la fin."
  },
  {
   "q": "Pourquoi faut-il trier (<code>sort</code>) avant <code>uniq -c</code> ?",
   "a": "Parce que <code>uniq</code> ne compte que les lignes identiques <em>consécutives</em>."
  },
  {
   "q": "Quels droits donner à une clé privée ou à un fichier <code>.env</code> ?",
   "a": "<code>600</code> (<code>rw-------</code>) : lisible et modifiable par le propriétaire seulement."
  },
  {
   "q": "Que fait <code>sudo</code> ?",
   "a": "Exécute la commande avec les droits d'administrateur. À utiliser seulement quand on comprend la commande."
  },
  {
   "q": "Pourquoi <code>rm -rf</code> est-il dangereux ?",
   "a": "Il supprime récursivement et sans confirmation, et il n'y a pas de corbeille : l'erreur est irréversible."
  },
  {
   "q": "Premier réflexe quand on ne connaît pas une commande ?",
   "a": "<code>man commande</code> ou <code>commande --help</code>."
  },
  {
   "q": "Comment installer Linux dans Windows ?",
   "a": "<code>wsl --install</code> dans PowerShell (administrateur), puis redémarrer."
  }
 ]
}
});
Object.assign(PREBUILT["Informatique"], {
 "Algorithmique 2 — récursivité, tris & complexité": {
 "cours": "<div class=\"retenir-box\"><strong>L'idée :</strong> un bon programme ne doit pas seulement être <em>juste</em>, il doit rester <mark>rapide quand les données grossissent</mark>. On mesure ça avec la <strong>complexité</strong>. Ce chapitre te donne trois outils : la récursivité, la recherche dichotomique et les tris.</div><h3>1. La récursivité : une fonction qui s'appelle elle-même</h3><p>Une fonction récursive a toujours <strong>deux parties</strong> : un <mark>cas de base</mark> (où elle s'arrête) et un <mark>appel sur un problème plus petit</mark>. Sans cas de base, elle ne s'arrête jamais.</p><pre><code>def factorielle(n):\n    if n == 0:            # cas de base\n        return 1\n    return n * factorielle(n - 1)   # problème plus petit\n\nprint(factorielle(5), factorielle(10))   # 120 3628800</code></pre><p>Chaque appel attend le résultat du suivant : Python empile les appels (la <strong>pile d'appels</strong>). Par défaut, il en autorise environ 1000 ; au-delà : <code>RecursionError: maximum recursion depth exceeded</code> (par exemple <code>factorielle(5000)</code>).</p><h3>2. Quand la récursivité devient très lente : Fibonacci</h3><pre><code>def fib(n):\n    if n &lt; 2:\n        return n\n    return fib(n - 1) + fib(n - 2)</code></pre><p>Cette version recalcule les mêmes valeurs encore et encore : <code>fib(10)</code> fait <strong>177 appels</strong>, <code>fib(20)</code> en fait <strong>21 891</strong>. Le travail est multiplié par ~120 quand n double : c'est une croissance <em>exponentielle</em>. Solution : la <strong>mémoïsation</strong> (mémoriser les résultats déjà trouvés).</p><pre><code>memo = {}\ndef fib_memo(n):\n    if n &lt; 2:\n        return n\n    if n not in memo:\n        memo[n] = fib_memo(n - 1) + fib_memo(n - 2)\n    return memo[n]\n\nprint(fib_memo(50))   # 12586269025, instantané</code></pre><h3>3. La recherche dichotomique</h3><p>Dans une liste <strong>déjà triée</strong>, on regarde la case du milieu : si la cible est plus grande, on garde la moitié droite, sinon la moitié gauche. À chaque étape on <mark>divise le travail par 2</mark>.</p><pre><code>def dichotomie(liste, cible):\n    bas, haut, etapes = 0, len(liste) - 1, 0\n    while bas &lt;= haut:\n        etapes += 1\n        milieu = (bas + haut) // 2\n        if liste[milieu] == cible:\n            return milieu, etapes\n        if liste[milieu] &lt; cible:\n            bas = milieu + 1\n        else:\n            haut = milieu - 1\n    return -1, etapes\n\ndata = [1, 3, 4, 7, 9, 12, 15, 18, 21, 25, 30]\nprint(dichotomie(data, 18))   # (7, 4)  trouvé en 4 étapes\nprint(dichotomie(data, 5))    # (-1, 3) absent\n# 1 000 000 d'éléments triés : 20 étapes au maximum</code></pre><h3>4. Trier : trois méthodes</h3><table class=\"formula-table\"><tr><th>Tri</th><th>Idée</th><th>Complexité</th></tr><tr><td>Sélection</td><td>cherche le plus petit, le met en premier, recommence</td><td>O(n²)</td></tr><tr><td>Insertion</td><td>insère chaque élément à sa place dans la partie déjà triée</td><td>O(n²) (rapide si presque trié)</td></tr><tr><td>Fusion</td><td>coupe en deux, trie chaque moitié (récursivité), fusionne</td><td>O(n log n)</td></tr></table><pre><code>def fusion(a, b):\n    r, i, j = [], 0, 0\n    while i &lt; len(a) and j &lt; len(b):\n        if a[i] &lt;= b[j]:\n            r.append(a[i]); i += 1\n        else:\n            r.append(b[j]); j += 1\n    return r + a[i:] + b[j:]\n\ndef tri_fusion(t):\n    if len(t) &lt;= 1:\n        return t                      # cas de base\n    m = len(t) // 2\n    return fusion(tri_fusion(t[:m]), tri_fusion(t[m:]))\n\nprint(tri_fusion([7, 3, 9, 1, 5]))   # [1, 3, 5, 7, 9]</code></pre><div class=\"attention-box\"><strong>En pratique :</strong> utilise <code>sorted(liste)</code> ou <code>liste.sort()</code>. Python emploie un tri très optimisé en O(n log n). Écrire soi-même un tri sert à <em>comprendre</em>, pas à le réutiliser.</div><h3>5. La complexité : compter les opérations, pas les secondes</h3><p>La notation <strong>O( )</strong> (« grand O ») décrit <mark>comment le nombre d'opérations grandit quand la taille n des données grandit</mark>. Mesure faite avec une double boucle (tri quadratique) :</p><table class=\"formula-table\"><tr><th>n</th><th>comparaisons</th><th>rapport</th></tr><tr><td>1 000</td><td>499 500</td><td>—</td></tr><tr><td>2 000</td><td>1 999 000</td><td>× 4</td></tr><tr><td>4 000</td><td>7 998 000</td><td>× 16 par rapport à 1 000</td></tr></table><p>Quand n double, le travail est multiplié par 4 : c'est bien du <strong>O(n²)</strong>. Comparaison des ordres de grandeur :</p><table class=\"formula-table\"><tr><th>n</th><th>log₂(n)</th><th>n·log₂(n)</th><th>n²</th></tr><tr><td>10</td><td>≈ 3,3</td><td>≈ 33</td><td>100</td></tr><tr><td>1 000</td><td>10</td><td>≈ 9 966</td><td>1 000 000</td></tr><tr><td>1 000 000</td><td>≈ 19,9</td><td>≈ 19 931 569</td><td>10¹² (mille milliards)</td></tr></table><div class=\"retenir-box\"><strong>À retenir :</strong> récursivité = <mark>cas de base + problème plus petit</mark> · dichotomie = liste triée, <strong>O(log n)</strong> · tri simple = O(n²), tri fusion = O(n log n) · la mémoïsation évite de recalculer · on compare les algorithmes par leur <em>croissance</em>, pas par une mesure en secondes.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Écris une fonction récursive <code>somme_chiffres(n)</code> qui renvoie la somme des chiffres de n. Ex. : <code>somme_chiffres(4821)</code> = 15.</p>",
   "aide": "Cas de base : n < 10. Sinon : dernier chiffre (<code>n % 10</code>) + le reste (<code>n // 10</code>).",
   "correction": "<pre><code>def somme_chiffres(n):\n    if n &lt; 10:\n        return n\n    return n % 10 + somme_chiffres(n // 10)\n\nprint(somme_chiffres(4821))   # 15</code></pre><p>4821 → 1 + somme_chiffres(482) → 1 + 2 + somme_chiffres(48) → … = 15.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Combien d'étapes au maximum faut-il à une recherche dichotomique dans une liste triée de 1 000 éléments ?</p>",
   "aide": "À chaque étape on divise par 2 : cherche la plus petite puissance de 2 supérieure ou égale à 1000.",
   "correction": "<p>2<sup>10</sup> = 1 024 ≥ 1 000, donc <strong>10 étapes au maximum</strong>. (Une recherche simple en demanderait jusqu'à 1 000.)</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris une fonction récursive <code>palindrome(s)</code> qui renvoie <code>True</code> si le mot se lit pareil dans les deux sens (<code>\"radar\"</code> → True, <code>\"bonjour\"</code> → False).</p>",
   "aide": "Cas de base : 0 ou 1 lettre. Sinon : compare la première et la dernière lettre, puis le milieu.",
   "correction": "<pre><code>def palindrome(s):\n    if len(s) &lt; 2:\n        return True\n    return s[0] == s[-1] and palindrome(s[1:-1])</code></pre><p>Chaque appel enlève la première et la dernière lettre : le problème devient plus petit jusqu'au cas de base.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Un tri en O(n²) met 2 secondes pour 10 000 éléments. Combien de temps environ pour 40 000 éléments ? Et un tri en O(n log n) fait-il mieux ?</p>",
   "aide": "n est multiplié par 4 : que devient n² ?",
   "correction": "<p>n × 4 → n² × 16, donc environ <strong>32 secondes</strong>. Un tri en O(n log n) croît à peine plus vite que n : pour n × 4, le travail est multiplié d'environ 4,6 seulement. C'est pourquoi on évite les tris O(n²) sur de gros volumes.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>La fonction <code>puissance(x, n)</code> ci-dessous calcule x<sup>n</sup>. Explique pourquoi elle fait environ log₂(n) appels au lieu de n, et donne la valeur de <code>puissance(2, 10)</code>.</p><pre><code>def puissance(x, n):\n    if n == 0:\n        return 1\n    moitie = puissance(x, n // 2)\n    return moitie * moitie if n % 2 == 0 else moitie * moitie * x</code></pre>",
   "aide": "À chaque appel, n est divisé par 2.",
   "correction": "<p>À chaque appel, l'exposant est <strong>divisé par 2</strong> : 10 → 5 → 2 → 1 → 0, soit 5 appels au lieu de 10. Pour n = 1 000 000, il en faut environ 20 (comme la dichotomie : O(log n)). <code>puissance(2, 10)</code> vaut <strong>1024</strong> (et <code>puissance(3, 5)</code> vaut 243). C'est le principe « diviser pour régner ».</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Quelles sont les deux parties obligatoires d'une fonction récursive ?",
   "a": "Un <strong>cas de base</strong> (arrêt) et un <strong>appel récursif sur un problème plus petit</strong>."
  },
  {
   "q": "Que se passe-t-il si une fonction récursive n'a pas de cas de base ?",
   "a": "Elle s'appelle sans fin jusqu'à dépasser la pile d'appels : <code>RecursionError</code>."
  },
  {
   "q": "Pourquoi <code>fib(n)</code> naïf est-il très lent ?",
   "a": "Il recalcule sans cesse les mêmes valeurs : le nombre d'appels croît de façon exponentielle (177 appels pour n = 10, 21 891 pour n = 20)."
  },
  {
   "q": "Qu'est-ce que la mémoïsation ?",
   "a": "Mémoriser les résultats déjà calculés (par ex. dans un dictionnaire) pour ne pas les recalculer."
  },
  {
   "q": "Quelle condition pour utiliser la recherche dichotomique ?",
   "a": "La liste doit être <strong>triée</strong>."
  },
  {
   "q": "Complexité de la recherche dichotomique ?",
   "a": "O(log n) : environ 20 étapes pour un million d'éléments."
  },
  {
   "q": "Complexité des tris par sélection et par insertion ?",
   "a": "O(n²) dans le cas général."
  },
  {
   "q": "Complexité du tri fusion ?",
   "a": "O(n log n)."
  },
  {
   "q": "Si n est multiplié par 2, de combien le travail d'un algorithme O(n²) est-il multiplié ?",
   "a": "Par 4 (et par 16 si n est multiplié par 4)."
  },
  {
   "q": "Que mesure la notation O( ) ?",
   "a": "La façon dont le nombre d'opérations grandit avec la taille n des données (pas un temps en secondes)."
  },
  {
   "q": "Quelle fonction Python utiliser pour trier en pratique ?",
   "a": "<code>sorted(liste)</code> ou <code>liste.sort()</code> (O(n log n), très optimisé)."
  },
  {
   "q": "Combien d'appels maximum Python autorise-t-il par défaut en récursion ?",
   "a": "Environ 1000 (au-delà : <code>RecursionError</code>)."
  }
 ]
}
});
Object.assign(PREBUILT["Informatique"], {
 "Réseaux 2 — IP, DNS & HTTP : ce qui se passe quand tu ouvres un site": {
 "cours": "<div class=\"retenir-box\"><strong>Le trajet en bref :</strong> tu tapes une adresse → le <mark>DNS</mark> la traduit en adresse IP → ton appareil ouvre une connexion <mark>TCP</mark> → <mark>TLS</mark> chiffre la liaison (HTTPS) → ton navigateur envoie une <mark>requête HTTP</mark> → le serveur renvoie une <mark>réponse</mark>. Comprendre ça aide autant à coder (API, Supabase) qu'à se défendre.</div><h3>1. L'adresse IP</h3><p>Une adresse <strong>IPv4</strong> a 32 bits (4 nombres de 0 à 255) : 2<sup>32</sup> = 4 294 967 296 adresses, trop peu pour tous les appareils du monde. <strong>IPv6</strong> a 128 bits (3,4 × 10<sup>38</sup> adresses), écrite en hexadécimal : <code>2001:db8::1</code>.</p><table class=\"formula-table\"><tr><th>Plage</th><th>Nature</th><th>Exemple</th></tr><tr><td><code>10.0.0.0/8</code></td><td>privée (réseau local)</td><td>10.3.4.5</td></tr><tr><td><code>172.16.0.0/12</code> (172.16 → 172.31)</td><td>privée</td><td>172.20.1.1 (mais <code>172.32.0.1</code> est publique)</td></tr><tr><td><code>192.168.0.0/16</code></td><td>privée (box de la maison)</td><td>192.168.1.20</td></tr><tr><td><code>127.0.0.1</code></td><td>loopback : « moi-même »</td><td>localhost</td></tr><tr><td><code>169.254.0.0/16</code></td><td>adresse automatique quand le DHCP échoue</td><td>169.254.3.4</td></tr></table><h3>2. Masque et notation CIDR</h3><p><code>/24</code> signifie « les 24 premiers bits identifient le réseau, le reste identifie la machine ». Avec n bits pour les machines : 2<sup>n</sup> − 2 adresses utilisables (on retire l'adresse du réseau et l'adresse de diffusion).</p><table class=\"formula-table\"><tr><th>Notation</th><th>Masque</th><th>Réseau</th><th>Diffusion</th><th>Machines</th></tr><tr><td>192.168.1.0/24</td><td>255.255.255.0</td><td>192.168.1.0</td><td>192.168.1.255</td><td>254</td></tr><tr><td>192.168.1.130/26</td><td>255.255.255.192</td><td>192.168.1.128</td><td>192.168.1.191</td><td>62</td></tr><tr><td>192.168.0.10/30</td><td>255.255.255.252</td><td>192.168.0.8</td><td>192.168.0.11</td><td>2</td></tr></table><pre><code>import ipaddress\nn = ipaddress.ip_interface(\"192.168.1.130/26\").network\nprint(n.network_address, n.broadcast_address, n.num_addresses - 2)\n# 192.168.1.128 192.168.1.191 62</code></pre><h3>3. Les ports</h3><p>L'IP désigne une <em>machine</em>, le <strong>port</strong> désigne le <em>service</em> sur cette machine : <code>80</code> HTTP, <code>443</code> HTTPS, <code>22</code> SSH, <code>53</code> DNS. Une URL <code>https://exemple.fr</code> utilise implicitement le port 443.</p><h3>4. Le DNS : l'annuaire d'Internet</h3><p>Ton appareil demande à un <strong>résolveur</strong> (celui de ta box ou un autre) l'IP de <code>exemple.fr</code>. S'il ne la connaît pas, il interroge les serveurs racine, puis ceux du TLD (<code>.fr</code>), puis le serveur qui fait autorité sur le domaine. La réponse est gardée en cache pendant la durée <strong>TTL</strong>.</p><table class=\"formula-table\"><tr><th>Type</th><th>Rôle</th></tr><tr><td>A / AAAA</td><td>nom → adresse IPv4 / IPv6</td></tr><tr><td>CNAME</td><td>alias : un nom pointe vers un autre nom</td></tr><tr><td>MX</td><td>serveur de messagerie du domaine</td></tr><tr><td>TXT</td><td>texte libre (vérification de domaine, SPF…)</td></tr></table><h3>5. TCP puis TLS</h3><p><strong>TCP</strong> établit une connexion fiable par une « poignée de main » en 3 temps : SYN → SYN-ACK → ACK. Ensuite <strong>TLS</strong> vérifie le certificat du site et chiffre l'échange : c'est le cadenas de <strong>HTTPS</strong>. Sans lui, un tiers sur le réseau (Wi-Fi public) pourrait lire ou modifier le trafic.</p><h3>6. HTTP : la requête et la réponse</h3><pre><code>GET /api/cours?matiere=maths HTTP/1.1\nHost: exemple.fr\nAuthorization: Bearer eyJhbGci...\nAccept: application/json\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"msg\":\"salut\"}</code></pre><p>La <strong>requête</strong> = méthode + chemin + en-têtes (+ corps). La <strong>réponse</strong> = code de statut + en-têtes + corps.</p><table class=\"formula-table\"><tr><th>Code</th><th>Sens</th></tr><tr><td><strong>200</strong> / 201</td><td>OK / créé</td></tr><tr><td><strong>301</strong> / 302</td><td>redirection permanente / temporaire (en-tête <code>Location</code>)</td></tr><tr><td><strong>400</strong></td><td>requête mal formée</td></tr><tr><td><strong>401</strong></td><td><em>non authentifié</em> : tu n'as pas prouvé qui tu es</td></tr><tr><td><strong>403</strong></td><td><em>interdit</em> : on sait qui tu es, mais tu n'as pas le droit</td></tr><tr><td><strong>404</strong></td><td>introuvable</td></tr><tr><td><strong>429</strong></td><td>trop de requêtes (limitation de débit)</td></tr><tr><td><strong>500</strong> / 503</td><td>erreur du serveur / service indisponible</td></tr></table><p>Méthodes : <code>GET</code> lire, <code>POST</code> créer, <code>PUT</code>/<code>PATCH</code> modifier, <code>DELETE</code> supprimer. Un <strong>cookie</strong> (<code>Set-Cookie</code> puis <code>Cookie</code>) permet au serveur de reconnaître le navigateur.</p><h3>7. Les outils pour voir tout ça</h3><ul><li><code>ping exemple.fr</code> : la machine répond-elle ?</li><li><code>nslookup exemple.fr</code> (ou <code>dig</code>) : que dit le DNS ?</li><li><code>tracert</code> (Windows) / <code>traceroute</code> : par où passent les paquets ?</li><li><code>curl -i https://exemple.fr</code> : voir la réponse HTTP brute (<code>-i</code> montre les en-têtes).</li><li>Les <strong>outils de développement</strong> du navigateur (F12 → onglet Réseau) : chaque requête de ta page avec son code.</li></ul><div class=\"retenir-box\"><strong>Lien avec ton appli :</strong> quand BacMaster se synchronise, le navigateur envoie des requêtes HTTPS à l'API de Supabase avec un en-tête <code>Authorization</code>. Une réponse <strong>401</strong> veut dire « reconnecte-toi », une <strong>403</strong> « tes règles RLS refusent ». Lire le code de statut dans l'onglet Réseau te dit tout de suite où chercher.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Quelle adresse est publique : <code>172.20.1.1</code> ou <code>172.32.0.1</code> ? Justifie.</p>",
   "aide": "La plage privée 172.16.0.0/12 s'arrête à 172.31.255.255.",
   "correction": "<p><code>172.32.0.1</code> est <strong>publique</strong> : la plage privée va de 172.16.0.0 à 172.31.255.255. <code>172.20.1.1</code> est privée.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Ton site renvoie « 401 » à un visiteur connecté qui essaie d'ouvrir une page réservée aux administrateurs. Le code est-il le bon ?</p>",
   "aide": "Il est connecté : on connaît son identité.",
   "correction": "<p>Non, il faudrait <strong>403</strong> (interdit). 401 signifie que l'identité n'est pas prouvée ; ici elle l'est, mais ses droits sont insuffisants.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Pour <code>192.168.1.130/26</code>, donne l'adresse du réseau, l'adresse de diffusion et le nombre de machines.</p>",
   "aide": "/26 : 6 bits pour les machines, donc des blocs de 64 adresses (0, 64, 128, 192).",
   "correction": "<p>Blocs de 64 : 130 est dans le bloc 128 → réseau <strong>192.168.1.128</strong>, diffusion <strong>192.168.1.191</strong>, 2⁶ − 2 = <strong>62 machines</strong>.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Remets dans l'ordre : requête HTTP, poignée de main TCP, résolution DNS, négociation TLS, affichage de la page.</p>",
   "aide": "Il faut d'abord savoir à qui parler.",
   "correction": "<p>1) <strong>DNS</strong> (trouver l'IP) → 2) <strong>TCP</strong> (connexion) → 3) <strong>TLS</strong> (chiffrement) → 4) <strong>requête HTTP</strong> (et réponse) → 5) <strong>affichage</strong> de la page.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Tu veux que 30 appareils d'une salle soient sur le même réseau avec 10 appareils prévus en plus plus tard. Quel masque CIDR minimal choisis-tu pour un réseau <code>192.168.10.0</code> ? Justifie avec des puissances de 2.</p>",
   "aide": "Il te faut au moins 40 adresses utilisables.",
   "correction": "<p>Il faut au moins 40 machines : 2⁵ − 2 = 30 (trop juste), 2⁶ − 2 = <strong>62</strong> (suffisant). Donc 6 bits pour les machines, soit <code>/26</code> (32 − 6) : <code>192.168.10.0/26</code>, masque <code>255.255.255.192</code>.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Combien d'adresses IPv4 existe-t-il, et pourquoi IPv6 ?",
   "a": "2³² = 4 294 967 296 ; trop peu pour tous les appareils. IPv6 (128 bits) en offre environ 3,4 × 10³⁸."
  },
  {
   "q": "Quelles sont les trois plages d'adresses IPv4 privées ?",
   "a": "<code>10.0.0.0/8</code>, <code>172.16.0.0/12</code> (172.16 à 172.31), <code>192.168.0.0/16</code>."
  },
  {
   "q": "Que désigne <code>127.0.0.1</code> ?",
   "a": "L'adresse de loopback : la machine elle-même (<code>localhost</code>)."
  },
  {
   "q": "Combien de machines dans un réseau /24 ?",
   "a": "254 (256 adresses moins l'adresse du réseau et celle de diffusion)."
  },
  {
   "q": "Quel est le rôle d'un port ?",
   "a": "Désigner le service visé sur une machine : 80 HTTP, 443 HTTPS, 22 SSH, 53 DNS."
  },
  {
   "q": "À quoi sert le DNS ?",
   "a": "Traduire un nom de domaine en adresse IP."
  },
  {
   "q": "Que fait un enregistrement CNAME ?",
   "a": "Fait pointer un nom vers un autre nom (alias)."
  },
  {
   "q": "Quelles sont les 3 étapes de la poignée de main TCP ?",
   "a": "SYN, SYN-ACK, ACK."
  },
  {
   "q": "Que garantit TLS (HTTPS) ?",
   "a": "Que le serveur est authentique (certificat) et que l'échange est chiffré."
  },
  {
   "q": "Différence entre 401 et 403 ?",
   "a": "401 : pas authentifié (identité non prouvée). 403 : authentifié mais sans autorisation."
  },
  {
   "q": "Que signifie un code 301 ?",
   "a": "Redirection permanente vers l'adresse donnée dans l'en-tête <code>Location</code>."
  },
  {
   "q": "Quelle méthode HTTP sert à lire une ressource ?",
   "a": "<code>GET</code>."
  },
  {
   "q": "Comment voir les requêtes et codes de statut d'une page ?",
   "a": "F12 → onglet Réseau du navigateur (ou <code>curl -i</code> en terminal)."
  }
 ]
}
});
