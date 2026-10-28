/* ============================================================
   BACMASTER — data/informatique-code.js — Apprendre à coder : Python, HTML, CSS, Java
   ============================================================ */

Object.assign(PREBUILT["Informatique"], {
 "Python 1 — fonctions, portée & bonnes pratiques": {
  "cours": "<h3>Pourquoi des fonctions ?</h3><p>Une <strong>fonction</strong> est un bout de code <mark>nommé et réutilisable</mark>. Au lieu de recopier dix fois le même calcul, tu l'écris une fois et tu l'<em>appelles</em>. Règle d'or des développeurs : <strong>ne te répète pas</strong> (principe DRY).</p>\n<h3>Définir et appeler</h3><pre><code>def aire_rectangle(largeur, hauteur):\n    return largeur * hauteur\n\nprint(aire_rectangle(4, 3))   # 12</code></pre><ul><li><code>def</code> introduit la fonction, suivie de son nom et de ses <strong>paramètres</strong> entre parenthèses.</li><li>Le bloc indenté dessous est le <strong>corps</strong> de la fonction.</li><li><code>return</code> renvoie un résultat à celui qui a appelé la fonction.</li></ul>\n<h3>print() n'est pas return</h3><pre><code>def double_print(x):\n    print(x * 2)\n\ndef double_return(x):\n    return x * 2\n\na = double_print(5)     # affiche 10\nb = double_return(5)    # n'affiche rien\nprint(a, b)             # None 10</code></pre><div class=\"attention-box\"><mark>print</mark> montre une valeur à l'écran, <mark>return</mark> la renvoie au programme pour la réutiliser. Une fonction sans <code>return</code> renvoie <code>None</code> (« rien »). Confondre les deux est l'erreur n°1 des débutants.</div>\n<h3>Valeurs par défaut et arguments nommés</h3><pre><code>def saluer(nom, langue=\"fr\"):\n    if langue == \"es\":\n        return f\"Hola {nom}\"\n    return f\"Salut {nom}\"\n\nprint(saluer(\"Martin\"))\nprint(saluer(\"Martin\", langue=\"es\"))</code></pre><p>Un paramètre avec une valeur par défaut devient <strong>optionnel</strong>. Appeler avec <code>langue=\"es\"</code> (argument nommé) rend l'appel lisible et l'ordre n'a plus d'importance.</p>\n<h3>Renvoyer plusieurs valeurs</h3><pre><code>def stats(notes):\n    return min(notes), max(notes), sum(notes) / len(notes)\n\nmini, maxi, moyenne = stats([14, 8, 16, 12])\nprint(mini, maxi, moyenne)   # 8 16 12.5</code></pre><p>Python renvoie en réalité un <strong>tuple</strong> (une suite non modifiable) que l'on « déballe » dans trois variables.</p>\n<h3>La portée des variables</h3><pre><code>total = 100\n\ndef ajouter(x):\n    total = x      # variable LOCALE : n'altère pas le total du dessus\n    return total\n\najouter(5)\nprint(total)       # 100</code></pre><div class=\"retenir-box\">Une variable créée <mark>dans</mark> une fonction est <strong>locale</strong> : elle disparaît à la fin de l'appel. Pour échanger des données, on passe des <strong>paramètres</strong> et on récupère un <strong>return</strong> — pas de variables globales modifiées en cachette.</div>\n<h3>Documenter et typer (bonnes pratiques)</h3><pre><code>def ttc(prix_ht: float, taux: float = 0.20) -&gt; float:\n    \"\"\"Renvoie le prix TTC arrondi au centime.\"\"\"\n    return round(prix_ht * (1 + taux), 2)\n\nprint(ttc(50))          # 60.0\nprint(ttc(19.99, 0.055))  # 21.09</code></pre><p>La <strong>docstring</strong> (texte entre triples guillemets) explique la fonction ; les <strong>annotations de type</strong> (<code>: float</code>, <code>-&gt; float</code>) sont facultatives mais aident à comprendre — Python ne les impose pas.</p>\n<h3>Fonction anonyme : lambda</h3><pre><code>eleves = [(\"Léa\", 15), (\"Sam\", 9), (\"Noa\", 12)]\nprint(sorted(eleves, key=lambda e: e[1]))\n# [('Sam', 9), ('Noa', 12), ('Léa', 15)]</code></pre><p>Une <code>lambda</code> est une mini-fonction d'une ligne, pratique pour dire à <code>sorted</code> <em>sur quoi</em> trier.</p>",
  "flashcards": [
   {
    "q": "Quelle est la différence entre print et return ?",
    "a": "print affiche une valeur à l'écran ; return renvoie la valeur au code appelant pour qu'il la réutilise. Sans return, une fonction renvoie None."
   },
   {
    "q": "Que signifie « variable locale » ?",
    "a": "Une variable créée dans une fonction n'existe que pendant son exécution ; elle n'affecte pas une variable de même nom définie à l'extérieur."
   },
   {
    "q": "À quoi sert une valeur par défaut de paramètre ?",
    "a": "À rendre le paramètre optionnel : def f(x, n=2) peut être appelée f(5) ou f(5, 3)."
   },
   {
    "q": "Que renvoie une fonction qui n'a pas de return ?",
    "a": "None."
   },
   {
    "q": "Que veut dire DRY ?",
    "a": "« Don't Repeat Yourself » : ne recopie pas le même code, mets-le dans une fonction."
   },
   {
    "q": "Comment récupérer plusieurs valeurs renvoyées ?",
    "a": "En les déballant : mini, maxi = fonction(...). Python renvoie en fait un tuple."
   },
   {
    "q": "Qu'est-ce qu'une docstring ?",
    "a": "Le texte entre triples guillemets placé juste après def, qui documente la fonction (visible avec help())."
   },
   {
    "q": "À quoi sert lambda ?",
    "a": "Créer une petite fonction anonyme d'une ligne, souvent passée à sorted, map ou filter (ex. key=lambda e: e[1])."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Écris une fonction <code>est_pair(n)</code> qui renvoie <code>True</code> si <code>n</code> est pair, <code>False</code> sinon. Que renvoie <code>est_pair(7)</code> ?</p>",
    "aide": "Un nombre est pair si le reste de sa division par 2 vaut 0 (opérateur %).",
    "correction": "<p></p><pre><code>def est_pair(n):\n    return n % 2 == 0\n\nprint(est_pair(7))   # False\nprint(est_pair(10))  # True</code></pre><p><code>n % 2 == 0</code> est déjà un booléen : pas besoin de if.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Écris <code>ttc(prix_ht, taux=0.20)</code> qui renvoie le prix TTC arrondi à 2 décimales. Combien donnent <code>ttc(50)</code> et <code>ttc(19.99, 0.055)</code> ?</p>",
    "aide": "Prix TTC = prix HT × (1 + taux). Utilise round(valeur, 2).",
    "correction": "<p><code>ttc(50)</code> → <strong>60.0</strong> et <code>ttc(19.99, 0.055)</code> → <strong>21.09</strong> (19,99 × 1,055 = 21,08945 arrondi au centime).</p><pre><code>def ttc(prix_ht, taux=0.20):\n    return round(prix_ht * (1 + taux), 2)\n\nprint(ttc(50), ttc(19.99, 0.055))</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Qu'affiche ce programme, et pourquoi ?</p><pre><code>solde = 100\n\ndef retirer(montant):\n    solde = solde - montant\n    return solde\n\nprint(retirer(30))</code></pre>",
    "aide": "Une variable assignée dans une fonction est considérée comme locale… avant même d'avoir une valeur.",
    "correction": "<p>Il <strong>plante</strong> avec <code>UnboundLocalError</code> : comme <code>solde</code> est assigné dans la fonction, Python le traite comme locale ; or on la lit avant de lui donner une valeur. Solution propre : passer le solde en paramètre.</p><pre><code>def retirer(solde, montant):\n    return solde - montant\n\nsolde = 100\nsolde = retirer(solde, 30)\nprint(solde)</code></pre>"
   }
  ]
 },
 "Python 2 — listes, tuples, dictionnaires & ensembles": {
  "cours": "<h3>Choisir la bonne structure</h3><table><tr><th>Structure</th><th>Écriture</th><th>Modifiable ?</th><th>Quand l'utiliser</th></tr><tr><td>Liste</td><td><code>[1, 2, 3]</code></td><td>Oui</td><td>Suite ordonnée d'éléments</td></tr><tr><td>Tuple</td><td><code>(1, 2)</code></td><td>Non</td><td>Groupe fixe (coordonnées, résultat multiple)</td></tr><tr><td>Dictionnaire</td><td><code>{\"a\": 1}</code></td><td>Oui</td><td>Retrouver une valeur par sa clé</td></tr><tr><td>Ensemble</td><td><code>{1, 2, 3}</code></td><td>Oui</td><td>Éléments uniques, tests d'appartenance rapides</td></tr></table>\n<h3>Listes : indices, tranches et méthodes</h3><pre><code>notes = [14, 8, 16, 12, 10]\nprint(notes[0], notes[-1])    # 14 10   (-1 = dernier élément)\nprint(notes[1:4])             # [8, 16, 12]  (début inclus, fin EXCLUE)\nnotes.append(18)              # ajoute à la fin\nnotes.remove(8)               # supprime la 1re valeur 8\nnotes.sort()                  # trie sur place\nprint(notes, len(notes))      # [10, 12, 14, 16, 18] 5\nprint(16 in notes)            # True</code></pre><div class=\"retenir-box\">Dans une tranche <mark>liste[a:b]</mark>, l'indice <strong>a est inclus</strong> et <strong>b est exclu</strong>. <code>liste[:3]</code> = les 3 premiers éléments.</div>\n<h3>Dictionnaires : clé → valeur</h3><pre><code>eleve = {\"nom\": \"Léa\", \"age\": 17}\neleve[\"classe\"] = \"1STI2D\"          # ajouter une clé\nprint(eleve[\"nom\"])                 # Léa\nprint(eleve.get(\"ville\", \"inconnue\"))   # inconnue (pas d'erreur si la clé manque)\nfor cle, valeur in eleve.items():\n    print(cle, \"=\", valeur)</code></pre><p><code>eleve[\"ville\"]</code> sur une clé absente lève une <code>KeyError</code> ; <code>.get(cle, defaut)</code> est la version sûre.</p>\n<h3>Cas d'école : compter des occurrences</h3><pre><code>texte = \"banane\"\ncompte = {}\nfor lettre in texte:\n    compte[lettre] = compte.get(lettre, 0) + 1\nprint(compte)   # {'b': 1, 'a': 2, 'n': 2, 'e': 1}</code></pre><p>Ce schéma (<em>lire la valeur actuelle, ajouter 1, réécrire</em>) sert partout : compter des mots, des dépenses par catégorie, des votes…</p>\n<h3>Ensembles et tuples</h3><pre><code>print(set([1, 2, 2, 3, 3, 3]))     # {1, 2, 3}  -&gt; doublons supprimés\na, b = (3, 4)                       # déballage d'un tuple\nprint(a + b)                        # 7</code></pre>\n<h3>Compréhensions : créer une liste en une ligne</h3><pre><code>carres_pairs = [n ** 2 for n in range(6) if n % 2 == 0]\nprint(carres_pairs)    # [0, 4, 16]\n\nnotes = [14, 8, 16, 12, 10, 7]\nadmis = [n for n in notes if n &gt;= 10]\nprint(admis)           # [14, 16, 12, 10]</code></pre><p>Lecture : « <em>pour chaque n dans range(6), si n est pair, garde n²</em> ». C'est le même raisonnement qu'une boucle <code>for</code> + <code>if</code> + <code>append</code>, mais condensé.</p>",
  "flashcards": [
   {
    "q": "Que renvoie liste[1:4] ?",
    "a": "Les éléments d'indices 1, 2 et 3 : le début est inclus, la fin (4) est exclue."
   },
   {
    "q": "Que désigne l'indice -1 ?",
    "a": "Le dernier élément de la liste."
   },
   {
    "q": "Différence liste / tuple ?",
    "a": "La liste est modifiable ; le tuple ne l'est pas (immuable)."
   },
   {
    "q": "Comment lire une clé de dictionnaire sans risquer d'erreur ?",
    "a": "Avec d.get(cle, valeur_par_defaut) : renvoie la valeur par défaut si la clé est absente (d[cle] lèverait KeyError)."
   },
   {
    "q": "Que fait set([1,2,2,3]) ?",
    "a": "Crée l'ensemble {1, 2, 3} : les doublons sont supprimés."
   },
   {
    "q": "Écris une compréhension qui garde les notes ≥ 10.",
    "a": "[n for n in notes if n >= 10]"
   },
   {
    "q": "Comment parcourir clés ET valeurs d'un dictionnaire ?",
    "a": "for cle, valeur in d.items():"
   },
   {
    "q": "Quel mot-clé teste l'appartenance ?",
    "a": "in : 16 in notes renvoie True ou False."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Avec <code>notes = [14, 8, 16, 12]</code>, écris une ligne qui affiche la <strong>meilleure</strong> et la <strong>moins bonne</strong> note.</p>",
    "aide": "Les fonctions max() et min() acceptent une liste.",
    "correction": "<p>Résultat : <strong>16 8</strong>.</p><pre><code>notes = [14, 8, 16, 12]\nprint(max(notes), min(notes))</code></pre>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Écris un code qui, pour <code>mots = [\"pomme\", \"kiwi\", \"pomme\", \"poire\", \"kiwi\", \"pomme\"]</code>, construit un dictionnaire du nombre d'occurrences de chaque mot.</p>",
    "aide": "Reprends le schéma compte[x] = compte.get(x, 0) + 1.",
    "correction": "<p>On obtient <code>{'pomme': 3, 'kiwi': 2, 'poire': 1}</code>.</p><pre><code>mots = [\"pomme\", \"kiwi\", \"pomme\", \"poire\", \"kiwi\", \"pomme\"]\ncompte = {}\nfor m in mots:\n    compte[m] = compte.get(m, 0) + 1\nprint(compte)</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>À partir de <code>depenses = {\"loyer\": 450, \"courses\": 210, \"loisirs\": 90, \"transport\": 60}</code>, affiche le <strong>total</strong> puis la liste des catégories dont la dépense dépasse 100 €, en une seule compréhension.</p>",
    "aide": "sum(d.values()) additionne les valeurs ; pour la condition, parcours d.items().",
    "correction": "<p>Total <strong>810</strong> ; catégories &gt; 100 € : <strong>['loyer', 'courses']</strong>.</p><pre><code>depenses = {\"loyer\": 450, \"courses\": 210, \"loisirs\": 90, \"transport\": 60}\nprint(sum(depenses.values()))\nprint([cat for cat, montant in depenses.items() if montant &gt; 100])</code></pre>"
   }
  ]
 },
 "Python 3 — fichiers, erreurs & modules": {
  "cours": "<h3>Lire et écrire un fichier</h3><pre><code>with open(\"notes.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Maths;15\\n\")\n    f.write(\"Anglais;12\\n\")\n\nwith open(\"notes.txt\", \"r\", encoding=\"utf-8\") as f:\n    for ligne in f:\n        matiere, note = ligne.strip().split(\";\")\n        print(matiere, int(note))</code></pre><div class=\"retenir-box\"><mark>with open(...)</mark> ferme automatiquement le fichier, même en cas d'erreur. Précise toujours <code>encoding=\"utf-8\"</code> pour que les accents (é, à…) survivent sur tous les ordinateurs. Modes : <code>\"r\"</code> lire, <code>\"w\"</code> écrire (<strong>efface</strong> l'ancien contenu), <code>\"a\"</code> ajouter à la fin.</div>\n<h3>JSON : sauvegarder des données structurées</h3><pre><code>import json\n\ndepenses = {\"loyer\": 450, \"courses\": 210}\nwith open(\"depenses.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(depenses, f, ensure_ascii=False, indent=2)\n\nwith open(\"depenses.json\", \"r\", encoding=\"utf-8\") as f:\n    relu = json.load(f)\nprint(relu[\"courses\"])   # 210</code></pre><p>JSON est le format d'échange universel (web, API, applications). Une liste ou un dictionnaire Python se convertit directement en JSON et inversement.</p>\n<h3>Gérer les erreurs : try / except</h3><pre><code>try:\n    age = int(\"dix-huit\")\nexcept ValueError:\n    print(\"Ce n'est pas un nombre\")</code></pre><ul><li><code>try</code> : le code qui peut échouer.</li><li><code>except ValueError</code> : ce qu'on fait si <em>cette</em> erreur survient.</li><li><code>finally</code> : s'exécute dans tous les cas (fermer une connexion…).</li><li><code>raise ValueError(\"message\")</code> : lever soi-même une erreur.</li></ul><div class=\"attention-box\">N'écris jamais un <code>except:</code> vide : il avale toutes les erreurs, y compris tes propres bugs, et tu ne sauras plus pourquoi ça ne marche pas. Capture l'erreur <mark>précise</mark> que tu attends.</div>\n<h3>Une saisie robuste</h3><pre><code>def lire_entier(texte):\n    while True:\n        try:\n            return int(input(texte))\n        except ValueError:\n            print(\"Entre un nombre entier, s'il te plaît.\")\n\nage = lire_entier(\"Ton âge : \")\nprint(\"Dans 5 ans :\", age + 5)</code></pre>\n<h3>Modules et bibliothèques</h3><pre><code>import math, random, datetime\n\nprint(math.sqrt(144))                      # 12.0\nprint(round(math.pi, 3))                   # 3.142\nprint(random.randint(1, 6) in range(1, 7)) # True (un dé à 6 faces)\nprint(datetime.date(2026, 10, 27).strftime(\"%d/%m/%Y\"))   # 27/10/2026</code></pre><p>La <strong>bibliothèque standard</strong> de Python contient des centaines de modules prêts à l'emploi. Pour ceux qui n'y sont pas, on utilise <code>pip</code> :</p><pre><code>pip install requests          # installe une bibliothèque\npython -m venv .venv          # crée un environnement isolé pour ton projet</code></pre><p>Un <strong>environnement virtuel</strong> (<code>venv</code>) garde les bibliothèques de chaque projet séparées et évite les conflits de versions.</p>",
  "flashcards": [
   {
    "q": "Pourquoi utiliser with open(...) ?",
    "a": "Il ferme automatiquement le fichier à la sortie du bloc, même si une erreur survient."
   },
   {
    "q": "Quel mode de open() efface le contenu existant ?",
    "a": "\"w\" (écriture). Pour ajouter à la fin sans effacer : \"a\"."
   },
   {
    "q": "Pourquoi préciser encoding=\"utf-8\" ?",
    "a": "Pour que les caractères accentués soient lus et écrits correctement sur tous les systèmes."
   },
   {
    "q": "Que fait json.dump / json.load ?",
    "a": "dump écrit un objet Python (dict, liste) dans un fichier JSON ; load relit le fichier et reconstruit l'objet."
   },
   {
    "q": "À quoi sert try / except ?",
    "a": "À intercepter une erreur prévisible (ex. ValueError) et réagir sans que le programme plante."
   },
   {
    "q": "Pourquoi éviter un except: vide ?",
    "a": "Il cache toutes les erreurs, y compris les bugs ; il faut capturer l'erreur précise attendue."
   },
   {
    "q": "Que fait finally ?",
    "a": "Son bloc s'exécute toujours, qu'il y ait eu une erreur ou non."
   },
   {
    "q": "À quoi sert un environnement virtuel (venv) ?",
    "a": "Isoler les bibliothèques d'un projet pour éviter les conflits entre projets."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Quelle erreur Python est levée par <code>int(\"3,5\")</code> ? Comment l'intercepter pour afficher « Format invalide » ?</p>",
    "aide": "Le texte « 3,5 » n'est pas un entier valide.",
    "correction": "<p>Une <strong>ValueError</strong>.</p><pre><code>try:\n    n = int(\"3,5\")\nexcept ValueError:\n    print(\"Format invalide\")</code></pre>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Écris un code qui enregistre la liste <code>[\"Maths\", \"Anglais\", \"Histoire\"]</code> dans <code>matieres.json</code> puis la relit et affiche son nombre d'éléments.</p>",
    "aide": "json.dump(liste, f) puis json.load(f) et len().",
    "correction": "<p>Résultat : <strong>3</strong>.</p><pre><code>import json\n\nwith open(\"matieres.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump([\"Maths\", \"Anglais\", \"Histoire\"], f, ensure_ascii=False)\nwith open(\"matieres.json\", \"r\", encoding=\"utf-8\") as f:\n    print(len(json.load(f)))</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Écris <code>diviser(a, b)</code> qui renvoie <code>a / b</code> mais renvoie <code>None</code> au lieu de planter quand <code>b</code> vaut 0.</p>",
    "aide": "La division par zéro lève ZeroDivisionError.",
    "correction": "<p><code>diviser(10, 4)</code> → <strong>2.5</strong> ; <code>diviser(10, 0)</code> → <strong>None</strong>.</p><pre><code>def diviser(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(diviser(10, 4), diviser(10, 0))</code></pre>"
   }
  ]
 },
 "Python 4 — programmation orientée objet (classes)": {
  "cours": "<h3>L'idée</h3><p>Une <strong>classe</strong> est un plan de fabrication ; un <strong>objet</strong> (ou <em>instance</em>) est une chose fabriquée avec ce plan. La classe regroupe des <strong>attributs</strong> (les données) et des <strong>méthodes</strong> (les actions). Exemple : la classe <code>Compte</code> décrit n'importe quel compte bancaire ; <code>Compte(\"Martin\")</code> est un compte précis.</p>\n<h3>Une première classe</h3><pre><code>class Compte:\n    def __init__(self, titulaire, solde=0):\n        self.titulaire = titulaire\n        self.solde = solde\n\n    def deposer(self, montant):\n        if montant &lt;= 0:\n            raise ValueError(\"Le montant doit être positif\")\n        self.solde += montant\n\n    def __str__(self):\n        return f\"{self.titulaire} : {self.solde:.2f} €\"\n\nc = Compte(\"Martin\", 100)\nc.deposer(50)\nprint(c)    # Martin : 150.00 €</code></pre><ul><li><code>__init__</code> est le <strong>constructeur</strong> : appelé automatiquement à la création de l'objet.</li><li><code>self</code> désigne l'objet courant ; il est toujours le 1<sup>er</sup> paramètre d'une méthode.</li><li><code>__str__</code> définit ce qu'affiche <code>print(objet)</code>.</li><li>La méthode <strong>protège</strong> l'objet : <code>deposer</code> refuse un montant négatif.</li></ul>\n<h3>L'héritage : réutiliser sans recopier</h3><pre><code>class Compte:\n    def __init__(self, titulaire, solde=0):\n        self.titulaire = titulaire\n        self.solde = solde\n\nclass CompteEpargne(Compte):\n    def __init__(self, titulaire, solde=0, taux=0.03):\n        super().__init__(titulaire, solde)\n        self.taux = taux\n\n    def ajouter_interets(self):\n        self.solde += self.solde * self.taux\n\nce = CompteEpargne(\"Martin\", 150)\nce.ajouter_interets()\nprint(ce.solde)    # 154.5</code></pre><p><code>CompteEpargne(Compte)</code> <strong>hérite</strong> de tout ce que fait <code>Compte</code> et ajoute ses propres spécificités. <code>super()</code> appelle le code de la classe parente.</p>\n<h3>Quand utiliser des classes ?</h3><ul><li>Quand plusieurs <mark>données vont ensemble</mark> et ont des actions associées (un compte, un élève, un ennemi dans un jeu).</li><li>Quand tu veux plusieurs exemplaires du même genre d'objet qui ont chacun leur état.</li><li>Pas pour tout : un petit script de 20 lignes avec des fonctions suffit.</li></ul><div class=\"retenir-box\">Les 4 piliers de la POO : <strong>encapsulation</strong> (cacher le détail interne), <strong>abstraction</strong>, <strong>héritage</strong>, <strong>polymorphisme</strong> (même méthode, comportements différents selon la classe). Ils servent aussi en Java : apprendre la POO ici te prépare directement à Java.</div>",
  "flashcards": [
   {
    "q": "Classe vs objet ?",
    "a": "La classe est le plan ; l'objet (instance) est un exemplaire concret créé à partir de ce plan."
   },
   {
    "q": "À quoi sert __init__ ?",
    "a": "C'est le constructeur : il initialise les attributs d'un nouvel objet à sa création."
   },
   {
    "q": "Que représente self ?",
    "a": "L'objet courant sur lequel la méthode est appelée ; premier paramètre de toute méthode d'instance."
   },
   {
    "q": "Attribut vs méthode ?",
    "a": "Un attribut est une donnée de l'objet (self.solde) ; une méthode est une action (deposer)."
   },
   {
    "q": "À quoi sert __str__ ?",
    "a": "À définir le texte renvoyé par print(objet) ou str(objet)."
   },
   {
    "q": "Qu'est-ce que l'héritage ?",
    "a": "Une classe fille reprend les attributs et méthodes d'une classe mère et peut en ajouter ou les modifier : class Fille(Mere)."
   },
   {
    "q": "Que fait super() ?",
    "a": "Il donne accès à la classe parente, typiquement pour appeler son __init__."
   },
   {
    "q": "Cite les 4 piliers de la POO.",
    "a": "Encapsulation, abstraction, héritage, polymorphisme."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Dans <code>c = Compte(\"Léa\", 20)</code>, quels sont l'objet, la classe et un attribut ?</p>",
    "aide": "Regarde ce qui est entre parenthèses et ce qui est devant.",
    "correction": "<p><strong>Compte</strong> est la classe, <strong>c</strong> est l'objet (l'instance), <strong>titulaire</strong> et <strong>solde</strong> sont ses attributs (accessibles par <code>c.titulaire</code>, <code>c.solde</code>).</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Ajoute à <code>Compte</code> une méthode <code>retirer(montant)</code> qui lève une erreur si le solde est insuffisant. Que se passe-t-il pour <code>Compte(\"Léa\", 20).retirer(50)</code> ?</p>",
    "aide": "Compare montant et self.solde ; utilise raise ValueError.",
    "correction": "<p>L'appel lève une <strong>ValueError</strong> (« Solde insuffisant »), le solde reste à 20.</p><pre><code>class Compte:\n    def __init__(self, titulaire, solde=0):\n        self.titulaire = titulaire\n        self.solde = solde\n\n    def retirer(self, montant):\n        if montant &gt; self.solde:\n            raise ValueError(\"Solde insuffisant\")\n        self.solde -= montant\n\nc = Compte(\"Léa\", 20)\ntry:\n    c.retirer(50)\nexcept ValueError as err:\n    print(err, c.solde)</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Crée une classe <code>Animal</code> avec une méthode <code>cri()</code> renvoyant « ... », puis <code>Chien</code> et <code>Chat</code> qui la redéfinissent. Quel concept illustre une boucle appelant <code>cri()</code> sur une liste mixte ?</p>",
    "aide": "Une méthode du même nom se comporte différemment selon la classe.",
    "correction": "<p>C'est le <strong>polymorphisme</strong> : même appel, comportement propre à chaque classe.</p><pre><code>class Animal:\n    def cri(self):\n        return \"...\"\n\nclass Chien(Animal):\n    def cri(self):\n        return \"Ouaf\"\n\nclass Chat(Animal):\n    def cri(self):\n        return \"Miaou\"\n\nfor a in [Chien(), Chat(), Animal()]:\n    print(a.cri())</code></pre>"
   }
  ]
 },
 "Python 5 — projet : simulateur de placement": {
  "cours": "<h3>L'objectif</h3><p>Tu viens d'ouvrir un compte pour investir : écrivons un <strong>simulateur</strong> qui répond à « si je mets 200 € par mois pendant 20 ans, que se passe-t-il, et que changent les <mark>frais</mark> ? ». Ce projet réunit tout le cours : fonctions, boucles, formatage, listes.</p><div class=\"attention-box\">C'est une <mark>simulation avec une hypothèse</mark> (ici 5 %/an), pas une prévision : les marchés ne rapportent jamais un taux fixe, et il peut y avoir des pertes. L'intérêt est de comprendre les <strong>mécanismes</strong> (durée, régularité, frais).</div>\n<h3>Étape 1 — La formule des intérêts composés</h3><p>Un capital <code>C</code> placé à un taux annuel <code>r</code> pendant <code>n</code> années vaut <strong>C × (1 + r)<sup>n</sup></strong>. Les intérêts rapportent eux-mêmes des intérêts : c'est l'effet « boule de neige ».</p><pre><code>capital = 1000\ntaux = 0.05\nannees = 20\nprint(round(capital * (1 + taux) ** annees, 2))   # 2653.3\nprint(72 / 6)   # règle des 72 : à 6 %/an, un capital double en ~12 ans</code></pre>\n<h3>Étape 2 — Des versements mensuels (DCA)</h3><p>Investir une somme fixe chaque mois s'appelle le <strong>DCA</strong> (<em>Dollar Cost Averaging</em>). On convertit le taux annuel en taux mensuel, puis on boucle mois par mois : le capital grossit, puis on ajoute le versement.</p><pre><code>def valeur_finale(versement_mensuel, rendement_annuel, annees, frais_annuels=0.0):\n    taux_mensuel = (1 + rendement_annuel - frais_annuels) ** (1 / 12) - 1\n    capital = 0.0\n    for _ in range(annees * 12):\n        capital = capital * (1 + taux_mensuel) + versement_mensuel\n    return capital\n\nprint(round(valeur_finale(200, 0.05, 20)))   # 81161</code></pre>\n<h3>Étape 3 — L'effet des frais</h3><pre><code>def valeur_finale(versement_mensuel, rendement_annuel, annees, frais_annuels=0.0):\n    taux_mensuel = (1 + rendement_annuel - frais_annuels) ** (1 / 12) - 1\n    capital = 0.0\n    for _ in range(annees * 12):\n        capital = capital * (1 + taux_mensuel) + versement_mensuel\n    return capital\n\nverse = 200 * 12 * 20\nprint(\"Versé :\", verse, \"€\")\nfor frais in (0.002, 0.015):\n    print(f\"Frais {frais:.1%} par an : {valeur_finale(200, 0.05, 20, frais):.0f} €\")</code></pre><div class=\"retenir-box\">Même hypothèse de rendement, mêmes versements : l'écart entre <mark>0,2 %</mark> et <mark>1,5 %</mark> de frais annuels fait environ <strong>10 400 €</strong> de différence sur 20 ans. Les frais sont <strong>certains</strong>, les rendements ne le sont pas : c'est pourquoi on compare toujours le <strong>TER</strong> (frais annuels) des ETF.</div>\n<h3>Étape 4 — Un tableau année par année</h3><pre><code>def valeur_finale(versement_mensuel, rendement_annuel, annees, frais_annuels=0.0):\n    taux_mensuel = (1 + rendement_annuel - frais_annuels) ** (1 / 12) - 1\n    capital = 0.0\n    for _ in range(annees * 12):\n        capital = capital * (1 + taux_mensuel) + versement_mensuel\n    return capital\n\nprint(\"Années | Versé    | Valeur\")\nfor annees in (5, 10, 20, 30):\n    verse = 200 * 12 * annees\n    valeur = valeur_finale(200, 0.05, annees, 0.002)\n    print(f\"{annees:&gt;6} | {verse:&gt;6} € | {valeur:&gt;6.0f} €\")</code></pre><p>Observe la colonne « Valeur » : entre 20 et 30 ans, tu ajoutes 24 000 € mais le capital gagne plus de 78 000 € — la <mark>durée</mark> est le facteur le plus puissant. Dans <code>{valeur:&gt;6.0f}</code>, <code>&gt;6</code> aligne à droite sur 6 caractères et <code>.0f</code> supprime les décimales.</p>\n<h3>Pour aller plus loin</h3><ul><li>Ajoute un paramètre <code>frais_courtage</code> (frais fixe par ordre, ex. 1,95 €) et mesure son poids sur des petits versements.</li><li>Lis les versements dans un fichier CSV avec le module <code>csv</code>.</li><li>Trace la courbe avec la bibliothèque <code>matplotlib</code> (<code>pip install matplotlib</code>).</li><li>Transforme-le en site web : la même logique en JavaScript, dans une page HTML/CSS.</li></ul>",
  "flashcards": [
   {
    "q": "Formule des intérêts composés ?",
    "a": "Capital final = C × (1 + r)^n, avec r le taux par période et n le nombre de périodes."
   },
   {
    "q": "Que signifie DCA ?",
    "a": "Dollar Cost Averaging : investir une somme fixe à intervalles réguliers (ex. chaque mois), quel que soit le cours."
   },
   {
    "q": "Règle des 72 ?",
    "a": "Nombre d'années pour doubler un capital ≈ 72 ÷ taux annuel en % (à 6 %/an : environ 12 ans)."
   },
   {
    "q": "Comment convertir un taux annuel en taux mensuel équivalent ?",
    "a": "(1 + r_annuel) ** (1/12) − 1."
   },
   {
    "q": "Pourquoi les frais annuels pèsent-ils tant sur le long terme ?",
    "a": "Ils sont prélevés chaque année sur tout le capital : leur effet se cumule comme les intérêts, mais dans le mauvais sens."
   },
   {
    "q": "Que signifie TER ?",
    "a": "Total Expense Ratio : les frais annuels de fonctionnement d'un fonds/ETF, en % de l'encours."
   },
   {
    "q": "Que veut dire {x:>6.0f} dans une f-string ?",
    "a": "Affiche x aligné à droite sur 6 caractères, sans décimale."
   },
   {
    "q": "Une simulation est-elle une prévision ?",
    "a": "Non : elle repose sur une hypothèse (ex. 5 %/an constant) ; les rendements réels varient et peuvent être négatifs."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Un capital de 2 000 € est placé à 4 % par an pendant 10 ans (sans versement). Écris le calcul avec Python et donne le résultat arrondi à l'euro.</p>",
    "aide": "Utilise capital * (1 + taux) ** annees.",
    "correction": "<p>Résultat : <strong>2 960 €</strong> (2 000 × 1,04<sup>10</sup> ≈ 2 960,49).</p><pre><code>print(round(2000 * 1.04 ** 10))</code></pre>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Avec la fonction <code>valeur_finale</code>, compare 150 €/mois pendant 15 ans à 5 %/an avec 0,2 % de frais contre 1,2 % de frais. Quel écart en euros ?</p>",
    "aide": "Appelle la fonction deux fois avec frais_annuels=0.002 puis 0.012 et fais la différence.",
    "correction": "<p>Environ <strong>39 096 €</strong> contre <strong>36 126 €</strong> : un écart d'à peu près <strong>2 970 €</strong>, soit près de 3 000 € perdus uniquement à cause des frais.</p><pre><code>def valeur_finale(versement_mensuel, rendement_annuel, annees, frais_annuels=0.0):\n    taux_mensuel = (1 + rendement_annuel - frais_annuels) ** (1 / 12) - 1\n    capital = 0.0\n    for _ in range(annees * 12):\n        capital = capital * (1 + taux_mensuel) + versement_mensuel\n    return capital\n\nbas = valeur_finale(150, 0.05, 15, 0.002)\nhaut = valeur_finale(150, 0.05, 15, 0.012)\nprint(round(bas), round(haut), round(bas - haut))</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Ajoute un paramètre <code>frais_ordre</code> (euros par versement) à la simulation : chaque mois, on retire ces frais fixes du versement avant de l'investir. Compare 200 €/mois avec 1,95 € de frais d'ordre : quel pourcentage du versement partent en frais chaque mois ?</p>",
    "aide": "frais_ordre / versement × 100.",
    "correction": "<p>1,95 ÷ 200 = <strong>0,975 %</strong> par versement : un frais fixe pèse <mark>d'autant plus que les versements sont petits</mark>. C'est pourquoi on regroupe parfois ses achats (un ordre plus gros, moins souvent) — à arbitrer avec l'avantage de la régularité.</p><pre><code>versement = 200\nfrais_ordre = 1.95\nprint(f\"{frais_ordre / versement:.3%}\")</code></pre>"
   }
  ]
 },
 "HTML — structure, sémantique & formulaires": {
  "cours": "<h3>Le rôle de chaque langage du web</h3><table><tr><th>Langage</th><th>Rôle</th><th>Analogie</th></tr><tr><td><strong>HTML</strong></td><td>Le contenu et sa structure</td><td>Le squelette</td></tr><tr><td><strong>CSS</strong></td><td>L'apparence</td><td>Les vêtements</td></tr><tr><td><strong>JavaScript</strong></td><td>Le comportement</td><td>Les muscles</td></tr></table><p>HTML n'est pas un langage de programmation : il <mark>décrit</mark> la page (ceci est un titre, ceci est une liste, ceci est un lien), il ne « calcule » rien.</p>\n<h3>Le squelette minimal d'une page</h3><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"fr\"&gt;\n&lt;head&gt;\n  &lt;meta charset=\"utf-8\"&gt;\n  &lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;\n  &lt;title&gt;Ma première page&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;Bonjour&lt;/h1&gt;\n  &lt;p&gt;Ceci est un paragraphe.&lt;/p&gt;\n&lt;/body&gt;\n&lt;/html&gt;</code></pre><ul><li><code>&lt;!DOCTYPE html&gt;</code> : indique au navigateur qu'il s'agit de HTML moderne.</li><li><code>lang=\"fr\"</code> : langue de la page (lecteurs d'écran, traduction automatique).</li><li><code>&lt;head&gt;</code> : informations <em>non affichées</em> (titre de l'onglet, encodage, réglages mobile).</li><li><code>&lt;body&gt;</code> : tout ce qui s'affiche.</li></ul><div class=\"retenir-box\">Dans VS Code, tape <mark>!</mark> puis <mark>Tab</mark> dans un fichier .html : le squelette complet apparaît (raccourci <em>Emmet</em>). Enregistre le fichier, double-clique dessus : il s'ouvre dans le navigateur.</div>\n<h3>Balises, éléments, attributs</h3><pre><code>&lt;a href=\"https://www.python.org\" target=\"_blank\" rel=\"noopener\"&gt;Site de Python&lt;/a&gt;</code></pre><p><code>&lt;a&gt;</code> est la <strong>balise</strong> (ouvrante et fermante), l'ensemble est un <strong>élément</strong>, <code>href</code> et <code>target</code> sont des <strong>attributs</strong> (<code>nom=\"valeur\"</code>). Certaines balises sont « vides » (sans fermeture) : <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;input&gt;</code>.</p>\n<h3>Le texte, les listes, les liens, les images</h3><pre><code>&lt;h1&gt;Titre principal (un seul par page)&lt;/h1&gt;\n&lt;h2&gt;Sous-titre&lt;/h2&gt;\n&lt;p&gt;Un paragraphe avec du &lt;strong&gt;texte important&lt;/strong&gt; et du &lt;em&gt;texte en emphase&lt;/em&gt;.&lt;/p&gt;\n\n&lt;ul&gt;\n  &lt;li&gt;Liste à puces&lt;/li&gt;\n  &lt;li&gt;Deuxième point&lt;/li&gt;\n&lt;/ul&gt;\n&lt;ol&gt;\n  &lt;li&gt;Liste numérotée&lt;/li&gt;\n&lt;/ol&gt;\n\n&lt;a href=\"contact.html\"&gt;Lien vers une autre page du site&lt;/a&gt;\n&lt;img src=\"photo.jpg\" alt=\"Description de l'image\" width=\"400\" height=\"300\"&gt;</code></pre><div class=\"attention-box\">L'attribut <mark>alt</mark> d'une image est obligatoire : il est lu par les lecteurs d'écran (accessibilité), affiché si l'image ne charge pas, et utile au référencement. Ne choisis pas un titre <code>&lt;h3&gt;</code> « parce que c'est plus petit » : la <strong>hiérarchie des titres</strong> (h1 → h2 → h3) décrit le plan du document, la taille se règle en CSS.</div>\n<h3>La sémantique : choisir la bonne balise</h3><pre><code>&lt;body&gt;\n  &lt;header&gt;\n    &lt;h1&gt;Mon site de révisions&lt;/h1&gt;\n    &lt;nav&gt;\n      &lt;a href=\"index.html\"&gt;Accueil&lt;/a&gt;\n      &lt;a href=\"cours.html\"&gt;Cours&lt;/a&gt;\n    &lt;/nav&gt;\n  &lt;/header&gt;\n\n  &lt;main&gt;\n    &lt;article&gt;\n      &lt;h2&gt;Les fonctions en Python&lt;/h2&gt;\n      &lt;section&gt;\n        &lt;h3&gt;Définir une fonction&lt;/h3&gt;\n        &lt;p&gt;...&lt;/p&gt;\n      &lt;/section&gt;\n    &lt;/article&gt;\n    &lt;aside&gt;Astuce : relis tes erreurs.&lt;/aside&gt;\n  &lt;/main&gt;\n\n  &lt;footer&gt;© 2026 Martin&lt;/footer&gt;\n&lt;/body&gt;</code></pre><p>Les balises <code>header</code>, <code>nav</code>, <code>main</code>, <code>article</code>, <code>section</code>, <code>aside</code>, <code>footer</code> donnent du <mark>sens</mark> au contenu (navigation, contenu principal…). <code>&lt;div&gt;</code> et <code>&lt;span&gt;</code> n'ont aucun sens : à utiliser seulement quand aucune balise sémantique ne convient (pour styliser un groupe, par exemple).</p>\n<h3>Les tableaux et les formulaires</h3><pre><code>&lt;table&gt;\n  &lt;thead&gt;\n    &lt;tr&gt;&lt;th&gt;Matière&lt;/th&gt;&lt;th&gt;Coefficient&lt;/th&gt;&lt;/tr&gt;\n  &lt;/thead&gt;\n  &lt;tbody&gt;\n    &lt;tr&gt;&lt;td&gt;Maths&lt;/td&gt;&lt;td&gt;16&lt;/td&gt;&lt;/tr&gt;\n    &lt;tr&gt;&lt;td&gt;Anglais&lt;/td&gt;&lt;td&gt;3&lt;/td&gt;&lt;/tr&gt;\n  &lt;/tbody&gt;\n&lt;/table&gt;\n\n&lt;form action=\"/inscription\" method=\"post\"&gt;\n  &lt;label for=\"email\"&gt;Adresse e-mail&lt;/label&gt;\n  &lt;input type=\"email\" id=\"email\" name=\"email\" required placeholder=\"toi@exemple.fr\"&gt;\n\n  &lt;label for=\"niveau\"&gt;Niveau&lt;/label&gt;\n  &lt;select id=\"niveau\" name=\"niveau\"&gt;\n    &lt;option value=\"1\"&gt;Première&lt;/option&gt;\n    &lt;option value=\"2\"&gt;Terminale&lt;/option&gt;\n  &lt;/select&gt;\n\n  &lt;label&gt;&lt;input type=\"checkbox\" name=\"rappels\"&gt; Recevoir des rappels&lt;/label&gt;\n  &lt;button type=\"submit\"&gt;Envoyer&lt;/button&gt;\n&lt;/form&gt;</code></pre><ul><li>Le tableau sert aux <strong>données</strong>, jamais à la mise en page.</li><li><code>&lt;label for=\"email\"&gt;</code> relie le texte au champ <code>id=\"email\"</code> : cliquer sur le texte active le champ.</li><li><code>name</code> est le nom sous lequel la valeur est envoyée ; <code>required</code> bloque l'envoi si le champ est vide ; <code>type=\"email\"</code> vérifie la forme de l'adresse.</li></ul><div class=\"retenir-box\">Pour vérifier ton code : le <mark>validateur du W3C</mark> (validator.w3.org) liste les erreurs, et les <mark>outils de développement</mark> du navigateur (touche F12) montrent la structure réelle de la page.</div>",
  "flashcards": [
   {
    "q": "Rôle de HTML, CSS, JavaScript ?",
    "a": "HTML : structure/contenu. CSS : apparence. JavaScript : comportement/interactions."
   },
   {
    "q": "À quoi sert <head> ?",
    "a": "Contient les informations non affichées : titre de l'onglet (<title>), encodage, réglages mobile, liens vers les feuilles de style."
   },
   {
    "q": "Pourquoi l'attribut alt sur <img> ?",
    "a": "Pour l'accessibilité (lecteurs d'écran), l'affichage si l'image ne charge pas et le référencement."
   },
   {
    "q": "Combien de <h1> par page ?",
    "a": "Un seul, qui décrit le sujet principal ; les autres titres suivent la hiérarchie h2, h3…"
   },
   {
    "q": "Cite 4 balises sémantiques.",
    "a": "header, nav, main, article, section, aside, footer (au choix)."
   },
   {
    "q": "Différence entre <div> et <section> ?",
    "a": "<div> est neutre (aucun sens) ; <section> regroupe un thème avec son titre et a une valeur sémantique."
   },
   {
    "q": "À quoi sert <label for=\"x\"> ?",
    "a": "À relier un texte au champ d'id x : cliquer sur le texte active le champ, et les lecteurs d'écran l'annoncent."
   },
   {
    "q": "Quand utiliser <table> ?",
    "a": "Pour afficher des données tabulaires, jamais pour organiser la mise en page (c'est le rôle du CSS)."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Quelle balise utiliser pour un menu de navigation principal, et quelle balise pour le contenu central unique de la page ?</p>",
    "aide": "Deux balises sémantiques.",
    "correction": "<p><strong>&lt;nav&gt;</strong> pour la navigation et <strong>&lt;main&gt;</strong> pour le contenu principal (un seul par page).</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Trouve les 3 erreurs de ce code :</p><pre><code>&lt;h1&gt;Mes cours&lt;/h1&gt;\n&lt;li&gt;Maths&lt;/li&gt;\n&lt;li&gt;Anglais&lt;/li&gt;\n&lt;img src=\"logo.png\"&gt;\n&lt;p&gt;Bienvenue &lt;strong&gt;sur mon site&lt;/p&gt;&lt;/strong&gt;</code></pre>",
    "aide": "Regarde : les <li>, l'image, l'imbrication des balises.",
    "correction": "<ul><li>Les <code>&lt;li&gt;</code> doivent être dans un <code>&lt;ul&gt;</code> ou <code>&lt;ol&gt;</code>.</li><li><code>&lt;img&gt;</code> n'a pas d'attribut <code>alt</code>.</li><li>Les balises sont mal imbriquées : il faut fermer dans l'ordre inverse de l'ouverture (<code>&lt;strong&gt;…&lt;/strong&gt;</code> avant <code>&lt;/p&gt;</code>).</li></ul><pre><code>&lt;h1&gt;Mes cours&lt;/h1&gt;\n&lt;ul&gt;\n  &lt;li&gt;Maths&lt;/li&gt;\n  &lt;li&gt;Anglais&lt;/li&gt;\n&lt;/ul&gt;\n&lt;img src=\"logo.png\" alt=\"Logo du site\"&gt;\n&lt;p&gt;Bienvenue &lt;strong&gt;sur mon site&lt;/strong&gt;&lt;/p&gt;</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Écris un formulaire de contact avec un champ <strong>nom</strong> (obligatoire), un champ <strong>e-mail</strong>, une zone de <strong>message</strong> et un bouton d'envoi, avec des labels correctement reliés.</p>",
    "aide": "label for + id ; textarea pour le message ; required sur le nom.",
    "correction": "<pre><code>&lt;form action=\"/contact\" method=\"post\"&gt;\n  &lt;label for=\"nom\"&gt;Nom&lt;/label&gt;\n  &lt;input type=\"text\" id=\"nom\" name=\"nom\" required&gt;\n\n  &lt;label for=\"mail\"&gt;E-mail&lt;/label&gt;\n  &lt;input type=\"email\" id=\"mail\" name=\"mail\"&gt;\n\n  &lt;label for=\"msg\"&gt;Message&lt;/label&gt;\n  &lt;textarea id=\"msg\" name=\"msg\" rows=\"5\"&gt;&lt;/textarea&gt;\n\n  &lt;button type=\"submit\"&gt;Envoyer&lt;/button&gt;\n&lt;/form&gt;</code></pre>"
   }
  ]
 },
 "CSS 1 — sélecteurs, boîte, couleurs & texte": {
  "cours": "<h3>Brancher le CSS sur une page</h3><pre><code>&lt;head&gt;\n  &lt;link rel=\"stylesheet\" href=\"style.css\"&gt;\n&lt;/head&gt;</code></pre><p>La bonne pratique : un fichier <code>style.css</code> séparé, relié dans le <code>&lt;head&gt;</code>. On évite le CSS écrit dans chaque balise (<code>style=\"…\"</code>), impossible à maintenir.</p>\n<h3>La syntaxe</h3><pre><code>h1 {\n  color: #2f44b3;\n  font-size: 2rem;\n}</code></pre><p>Un <strong>sélecteur</strong> (<code>h1</code>) désigne les éléments visés ; entre accolades, des <strong>déclarations</strong> <code>propriété: valeur;</code>.</p>\n<h3>Les sélecteurs essentiels</h3><pre><code>p            { line-height: 1.6; }         /* toutes les balises &lt;p&gt; */\n.carte       { padding: 1rem; }            /* class=\"carte\" */\n#entete      { background: #f4f6fd; }      /* id=\"entete\" (unique) */\nnav a        { text-decoration: none; }    /* les &lt;a&gt; DANS un &lt;nav&gt; */\na:hover      { color: tomato; }            /* au survol de la souris */\nh1, h2, h3   { font-family: system-ui; }   /* plusieurs sélecteurs */</code></pre><div class=\"retenir-box\">Utilise surtout des <mark>classes</mark> (<code>.carte</code>) : réutilisables et de spécificité moyenne. Les identifiants (<code>#id</code>) sont uniques et trop « forts ». Quand deux règles se contredisent, la plus <strong>spécifique</strong> gagne (id &gt; classe &gt; balise) ; à égalité, la <strong>dernière</strong> écrite l'emporte. Évite <code>!important</code>.</div>\n<h3>Le modèle de boîte (box model)</h3><p>Chaque élément est une boîte à 4 couches, de l'intérieur vers l'extérieur : <strong>contenu</strong> → <strong>padding</strong> (marge intérieure) → <strong>border</strong> (bordure) → <strong>margin</strong> (marge extérieure).</p><pre><code>*, *::before, *::after {\n  box-sizing: border-box;   /* width inclut padding + bordure */\n}\n\n.carte {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid #2f44b3;\n  margin: 16px auto;        /* haut/bas 16px, centré horizontalement */\n}</code></pre><div class=\"attention-box\">Par défaut (<code>content-box</code>), <code>width: 300px</code> ne mesure que le <strong>contenu</strong> : avec 20 px de padding et 5 px de bordure de chaque côté, la boîte fait 300 + 2×20 + 2×5 = <mark>350 px</mark>. Avec <code>box-sizing: border-box</code>, elle fait bien <mark>300 px</mark>. Mets cette règle en tête de tous tes fichiers CSS.</div>\n<h3>Couleurs, texte et unités</h3><pre><code>body {\n  font-family: system-ui, sans-serif;\n  font-size: 1rem;          /* 1rem = taille de base du navigateur (16px par défaut) */\n  line-height: 1.5;\n  color: #18233d;\n  background-color: hsl(222 40% 97%);\n}</code></pre><ul><li><strong>Couleurs</strong> : noms (<code>tomato</code>), hexadécimal (<code>#2f44b3</code>), <code>rgb(47 68 179)</code>, <code>hsl(...)</code> (teinte, saturation, luminosité : pratique pour déclinaisons).</li><li><strong>Unités</strong> : <code>px</code> (fixe), <code>rem</code> (relatif à la taille de base, idéal pour le texte), <code>%</code> (relatif au parent), <code>vw</code>/<code>vh</code> (% de la fenêtre).</li><li><strong>Contraste</strong> : vise au moins <mark>4,5 : 1</mark> entre texte et fond pour un texte courant (recommandation d'accessibilité WCAG).</li></ul>\n<h3>Variables CSS et survol</h3><pre><code>:root {\n  --bleu: #2f44b3;\n  --rayon: 12px;\n}\n\n.bouton {\n  background: var(--bleu);\n  color: white;\n  border: 0;\n  border-radius: var(--rayon);\n  padding: 0.6rem 1rem;\n  transition: background 0.2s;\n}\n.bouton:hover {\n  background: #1f2f85;\n}</code></pre><p>Une <strong>variable CSS</strong> se déclare avec <code>--nom</code> et s'utilise avec <code>var(--nom)</code> : change la couleur à un seul endroit et tout le site suit (c'est aussi comme ça qu'on fait un mode sombre).</p>",
  "flashcards": [
   {
    "q": "Comment relier un fichier CSS à une page ?",
    "a": "<link rel=\"stylesheet\" href=\"style.css\"> dans le <head>."
   },
   {
    "q": "Sélecteur de classe vs d'identifiant ?",
    "a": ".nom cible class=\"nom\" (réutilisable) ; #nom cible id=\"nom\" (unique dans la page)."
   },
   {
    "q": "Qui gagne si deux règles se contredisent ?",
    "a": "La plus spécifique (id > classe > balise) ; à égalité, la dernière écrite."
   },
   {
    "q": "Les 4 couches du box model ?",
    "a": "Contenu, padding (intérieur), border (bordure), margin (extérieur)."
   },
   {
    "q": "Que change box-sizing: border-box ?",
    "a": "width et height incluent le padding et la bordure ; la taille déclarée est la taille réelle de la boîte."
   },
   {
    "q": "Taille d'une boîte content-box : width 300px, padding 20px, border 5px ?",
    "a": "300 + 2×20 + 2×5 = 350 px."
   },
   {
    "q": "rem vs px ?",
    "a": "px est fixe ; rem est relatif à la taille de police de base du navigateur, donc respecte les réglages d'accessibilité de l'utilisateur."
   },
   {
    "q": "Comment déclarer et utiliser une variable CSS ?",
    "a": "Déclaration : --bleu: #2f44b3; (souvent dans :root). Utilisation : color: var(--bleu);"
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Écris la règle qui met en rouge (<code>tomato</code>) tous les liens quand la souris les survole.</p>",
    "aide": "Pseudo-classe :hover sur a.",
    "correction": "<pre><code>a:hover {\n  color: tomato;\n}</code></pre>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Un élément a <code>width: 200px; padding: 10px; border: 2px solid;</code> avec le comportement par défaut. Quelle est sa largeur totale ? Et avec <code>box-sizing: border-box</code> ?</p>",
    "aide": "Padding et bordure comptent des deux côtés.",
    "correction": "<p>Par défaut : 200 + 2×10 + 2×2 = <strong>224 px</strong>. Avec <code>border-box</code> : <strong>200 px</strong> (le contenu rétrécit à 176 px pour faire de la place).</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Définis une variable <code>--accent</code> et utilise-la pour un bouton arrondi, avec un fond plus foncé au survol. Pourquoi est-ce plus maintenable que de répéter le code couleur ?</p>",
    "aide": "Déclare la variable dans :root.",
    "correction": "<pre><code>:root { --accent: #2f44b3; }\n\n.bouton {\n  background: var(--accent);\n  color: white;\n  border-radius: 10px;\n  padding: 0.6rem 1rem;\n}\n.bouton:hover { filter: brightness(0.85); }</code></pre><p>Changer la couleur d'accent du site entier demande de modifier <strong>une seule ligne</strong> au lieu de chercher chaque occurrence.</p>"
   }
  ]
 },
 "CSS 2 — mise en page : Flexbox, Grid & responsive": {
  "cours": "<h3>Flexbox : aligner sur une ligne (ou une colonne)</h3><pre><code>.menu {\n  display: flex;\n  gap: 1rem;                       /* espace entre les éléments */\n  justify-content: space-between;  /* axe principal (horizontal par défaut) */\n  align-items: center;             /* axe transversal (vertical) */\n}</code></pre><ul><li><code>display: flex</code> sur le <strong>conteneur</strong> : ses enfants directs deviennent des éléments flexibles.</li><li><code>justify-content</code> : répartition sur l'axe principal (<code>flex-start</code>, <code>center</code>, <code>space-between</code>…).</li><li><code>align-items</code> : alignement sur l'autre axe.</li><li><code>flex-direction: column</code> change l'axe principal ; <code>flex-wrap: wrap</code> autorise le retour à la ligne ; <code>flex: 1</code> sur un enfant lui fait prendre l'espace restant.</li></ul>\n<h3>Centrer quelque chose (enfin simple)</h3><pre><code>.centre {\n  display: grid;\n  place-items: center;   /* centre horizontalement ET verticalement */\n  min-height: 100vh;\n}</code></pre><p>Deux lignes. <code>100vh</code> = 100 % de la hauteur de la fenêtre.</p>\n<h3>Grid : organiser en lignes ET en colonnes</h3><pre><code>.galerie {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);   /* 3 colonnes égales */\n  gap: 1rem;\n}\n\n/* Cartes qui s'adaptent toutes seules, sans media query : */\n.cartes {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}</code></pre><div class=\"retenir-box\"><mark>Flexbox</mark> = disposition dans <strong>une seule direction</strong> (menu, barre d'outils, centrage). <mark>Grid</mark> = disposition en <strong>deux dimensions</strong> (galerie, mise en page complète). Les deux se combinent très bien. L'unité <code>fr</code> (« fraction ») répartit l'espace disponible.</div>\n<h3>Responsive : s'adapter à tous les écrans</h3><pre><code>&lt;!-- indispensable dans le &lt;head&gt; --&gt;\n&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code></pre><pre><code>img { max-width: 100%; height: auto; }   /* une image ne déborde jamais */\n\n.galerie { display: grid; grid-template-columns: 1fr; gap: 1rem; }   /* mobile d'abord : 1 colonne */\n\n@media (min-width: 700px) {\n  .galerie { grid-template-columns: repeat(3, 1fr); }               /* écran large : 3 colonnes */\n}</code></pre><p>L'approche <strong>mobile-first</strong> : on écrit d'abord le style du petit écran, puis on l'enrichit avec <code>@media (min-width: …)</code> quand l'espace augmente. Sans la balise <code>viewport</code>, les téléphones affichent la page « dézoomée » comme un site de bureau.</p>\n<h3>Le positionnement</h3><ul><li><code>position: relative</code> : l'élément reste dans le flux, mais devient la référence de ses enfants absolus.</li><li><code>position: absolute</code> : sorti du flux, placé par rapport au parent positionné le plus proche (badge dans un coin de carte).</li><li><code>position: sticky; top: 0</code> : colle en haut de l'écran au défilement (en-tête fixe).</li><li><code>position: fixed</code> : fixé à la fenêtre (bouton flottant).</li></ul><div class=\"attention-box\">Un bug de mise en page ? Fais un <mark>clic droit → Inspecter</mark> (ou F12) : le navigateur montre le box model de chaque élément, les règles qui s'appliquent et celles qui sont barrées. C'est l'outil n°1 du développeur front.</div>",
  "flashcards": [
   {
    "q": "Quand utiliser Flexbox ?",
    "a": "Pour disposer des éléments dans une direction (ligne ou colonne) : menus, barres d'outils, alignements et centrages."
   },
   {
    "q": "Quand utiliser Grid ?",
    "a": "Pour une disposition en deux dimensions : galeries, grilles de cartes, mises en page complètes."
   },
   {
    "q": "Que fait justify-content en flexbox ?",
    "a": "Répartit les éléments le long de l'axe principal (start, center, space-between…)."
   },
   {
    "q": "Comment centrer un élément horizontalement et verticalement avec Grid ?",
    "a": "display: grid; place-items: center; sur le conteneur (avec une hauteur, ex. min-height: 100vh)."
   },
   {
    "q": "Que signifie 1fr dans grid-template-columns ?",
    "a": "Une fraction de l'espace disponible : repeat(3, 1fr) crée 3 colonnes de largeur égale."
   },
   {
    "q": "À quoi sert la balise meta viewport ?",
    "a": "À indiquer aux téléphones d'utiliser la largeur réelle de l'écran ; sans elle la page est affichée dézoomée."
   },
   {
    "q": "Principe du mobile-first ?",
    "a": "Écrire d'abord le style pour petit écran, puis ajouter des règles @media (min-width: …) pour les écrans plus larges."
   },
   {
    "q": "Que fait position: sticky ?",
    "a": "L'élément défile normalement puis se colle à la position indiquée (ex. top: 0) quand il l'atteint."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Quelle propriété transforme un conteneur en boîte flexible, et laquelle espace les éléments de 1 rem ?</p>",
    "aide": "Deux propriétés courtes.",
    "correction": "<p><code>display: flex;</code> puis <code>gap: 1rem;</code>.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Écris le CSS d'une barre de navigation : logo à gauche, liens à droite, tout centré verticalement.</p>",
    "aide": "flex + space-between + align-items.",
    "correction": "<pre><code>nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 1rem;\n}</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Crée une galerie de cartes : 1 colonne sur mobile, 3 colonnes à partir de 700 px de large, avec un espace de 1 rem.</p>",
    "aide": "Mobile-first + media query min-width.",
    "correction": "<pre><code>.galerie {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n@media (min-width: 700px) {\n  .galerie {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}</code></pre><p>Variante sans media query : <code>grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));</code>.</p>"
   }
  ]
 },
 "Java 1 — premiers pas : JDK, types, conditions & boucles": {
  "cours": "<h3>Java, c'est quoi ?</h3><p>Java est un langage <strong>compilé</strong> et <strong>fortement typé</strong>. Ton code (<code>.java</code>) est traduit par le compilateur <code>javac</code> en <em>bytecode</em> (<code>.class</code>), exécuté par la <strong>JVM</strong> (machine virtuelle Java) : le même programme tourne sur Windows, macOS et Linux. On le retrouve dans les applications d'entreprise, le back-end, Android (avec Kotlin), les jeux (Minecraft Java)…</p><table><tr><th></th><th>Python</th><th>Java</th></tr><tr><td>Types</td><td><code>age = 18</code> (deviné)</td><td><code>int age = 18;</code> (déclaré)</td></tr><tr><td>Blocs</td><td>Indentation</td><td>Accolades <code>{ }</code></td></tr><tr><td>Fin d'instruction</td><td>Retour à la ligne</td><td>Point-virgule <code>;</code></td></tr><tr><td>Exécution</td><td>Interprété directement</td><td>Compilé puis exécuté par la JVM</td></tr></table>\n<h3>Installer et lancer</h3><ul><li>Installe un <strong>JDK</strong> (<em>Java Development Kit</em>). Pour apprendre, choisis la version <mark>LTS</mark> (support à long terme) : <strong>JDK 25</strong>. La toute dernière version est le JDK 27 (sortie en septembre 2026), mais une LTS reste la valeur sûre. Téléchargement gratuit sur <code>adoptium.net</code> ou <code>oracle.com/java</code>.</li><li>Vérifie dans un terminal : <code>java -version</code> et <code>javac -version</code>.</li><li>Éditeur : VS Code avec l'extension « Extension Pack for Java », ou IntelliJ IDEA.</li></ul><pre><code>javac Main.java     # compile  -&gt; crée Main.class\njava Main           # exécute\n\njava Main.java      # raccourci : compile et exécute en une commande</code></pre><div class=\"retenir-box\">Le nom du fichier doit être <mark>identique au nom de la classe publique</mark> : la classe <code>Main</code> vit dans <code>Main.java</code>, avec la casse exacte.</div>\n<h3>Ton premier programme</h3><pre><code>public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour Martin !\");\n    }\n}</code></pre><ul><li><code>public class Main</code> : tout code Java vit dans une classe.</li><li><code>public static void main(String[] args)</code> : le <strong>point d'entrée</strong>, là où le programme démarre.</li><li><code>System.out.println(...)</code> affiche puis passe à la ligne (<code>print</code> sans ligne).</li></ul>\n<h3>Les types de base</h3><pre><code>public class Main {\n    public static void main(String[] args) {\n        int age = 18;\n        double taille = 1.75;\n        boolean majeur = age &gt;= 18;\n        String nom = \"Martin\";\n        char initiale = nom.charAt(0);\n\n        System.out.println(nom + \" (\" + initiale + \") a \" + age + \" ans, majeur : \" + majeur);\n        System.out.println(7 / 2);      // 3   (division entre deux entiers = entier)\n        System.out.println(7 / 2.0);    // 3.5\n        System.out.println(7 % 2);      // 1   (reste)\n    }\n}</code></pre><ul><li><code>int</code> (entier), <code>double</code> (décimal), <code>boolean</code> (vrai/faux), <code>char</code> (un caractère, entre apostrophes), <code>String</code> (texte, entre guillemets).</li><li>Une variable a un <strong>type fixe</strong> : <code>int age = \"dix\";</code> est refusé à la compilation (c'est un avantage : les erreurs se voient avant l'exécution).</li></ul><div class=\"attention-box\"><mark>7 / 2 vaut 3</mark>, pas 3,5 : entre deux entiers, Java fait une <strong>division entière</strong>. Pour un résultat décimal, un des deux nombres doit être un <code>double</code> (<code>7 / 2.0</code>).</div>\n<h3>Lire une saisie et décider</h3><pre><code>import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Ton âge : \");\n        int age = sc.nextInt();\n\n        if (age &gt;= 18) {\n            System.out.println(\"Majeur\");\n        } else if (age &gt;= 13) {\n            System.out.println(\"Adolescent\");\n        } else {\n            System.out.println(\"Enfant\");\n        }\n    }\n}</code></pre><p><code>Scanner</code> lit le clavier (<code>nextInt()</code>, <code>nextDouble()</code>, <code>nextLine()</code>). Il faut l'<strong>importer</strong> (<code>import java.util.Scanner;</code>).</p>\n<h3>switch et boucles</h3><pre><code>public class Main {\n    public static void main(String[] args) {\n        int jour = 3;\n        String nom = switch (jour) {\n            case 1 -&gt; \"lundi\";\n            case 2 -&gt; \"mardi\";\n            case 3 -&gt; \"mercredi\";\n            default -&gt; \"autre\";\n        };\n        System.out.println(nom);\n\n        int somme = 0;\n        for (int i = 1; i &lt;= 5; i++) {\n            somme += i;\n        }\n        System.out.println(somme);\n\n        int[] notes = {14, 8, 16, 12};\n        int total = 0;\n        for (int n : notes) {\n            total += n;\n        }\n        System.out.println(total / (double) notes.length);\n    }\n}</code></pre><ul><li><code>switch</code> avec flèches <code>-&gt;</code> (Java moderne) renvoie directement une valeur.</li><li><code>for (int i = 1; i &lt;= 5; i++)</code> : initialisation ; condition ; incrément.</li><li><code>for (int n : notes)</code> : parcours « pour chaque » d'un tableau.</li><li><code>(double) notes.length</code> convertit (« cast ») pour obtenir une division décimale.</li></ul>\n<h3>Piège classique : == contre equals</h3><pre><code>public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"java\");\n        String b = new String(\"java\");\n        System.out.println(a == b);        // false : deux objets différents en mémoire\n        System.out.println(a.equals(b));   // true  : même contenu\n    }\n}</code></pre><div class=\"attention-box\">Pour comparer le <strong>contenu</strong> de deux textes (ou de n'importe quels objets), utilise <mark>equals()</mark>. L'opérateur <code>==</code> compare les <em>références</em> (est-ce le même objet ?) ; il ne convient que pour les types primitifs (<code>int</code>, <code>double</code>, <code>boolean</code>…).</div>",
  "flashcards": [
   {
    "q": "Que fait javac, que fait java ?",
    "a": "javac compile le code source .java en bytecode .class ; java lance la JVM qui exécute ce bytecode."
   },
   {
    "q": "Qu'est-ce que la JVM ?",
    "a": "La machine virtuelle Java : elle exécute le bytecode, ce qui rend le même programme portable sur Windows, macOS et Linux."
   },
   {
    "q": "Quel est le point d'entrée d'un programme Java ?",
    "a": "La méthode public static void main(String[] args)."
   },
   {
    "q": "Que vaut 7 / 2 en Java ? Et 7 / 2.0 ?",
    "a": "7 / 2 = 3 (division entière) ; 7 / 2.0 = 3.5."
   },
   {
    "q": "Différence int / double / boolean / char / String ?",
    "a": "Entier / décimal / vrai-faux / un seul caractère (apostrophes) / texte (guillemets, c'est un objet)."
   },
   {
    "q": "Quel est le piège de == sur les String ?",
    "a": "== compare les références (même objet ?), pas le contenu ; il faut utiliser a.equals(b)."
   },
   {
    "q": "Comment lire un entier au clavier ?",
    "a": "Scanner sc = new Scanner(System.in); int n = sc.nextInt(); (avec import java.util.Scanner)."
   },
   {
    "q": "Pourquoi choisir un JDK LTS pour apprendre ?",
    "a": "Une version LTS (ex. JDK 25) est maintenue plus longtemps : plus stable et largement utilisée en entreprise."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Quelle est la différence visible entre <code>int x = 5 / 2;</code> et <code>double y = 5 / 2.0;</code> ?</p>",
    "aide": "Division entière contre division décimale.",
    "correction": "<p><code>x</code> vaut <strong>2</strong> (la partie décimale est perdue), <code>y</code> vaut <strong>2.5</strong>.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Écris un programme qui affiche la table de multiplication de 7 de 1 à 5 sous la forme <code>7 x 1 = 7</code>.</p>",
    "aide": "Une boucle for et une concaténation de texte.",
    "correction": "<pre><code>public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i &lt;= 5; i++) {\n            System.out.println(\"7 x \" + i + \" = \" + (7 * i));\n        }\n    }\n}</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Écris un programme qui calcule la moyenne de <code>{12, 15, 9, 18}</code> puis affiche « Admis » si elle est ≥ 10, « Refusé » sinon. Attention au type de la division !</p>",
    "aide": "Cast en double pour éviter la division entière.",
    "correction": "<p>Moyenne = 54 ÷ 4 = <strong>13.5</strong> → « Admis ».</p><pre><code>public class Main {\n    public static void main(String[] args) {\n        int[] notes = {12, 15, 9, 18};\n        int total = 0;\n        for (int n : notes) total += n;\n        double moyenne = total / (double) notes.length;\n        System.out.println(moyenne);\n        System.out.println(moyenne &gt;= 10 ? \"Admis\" : \"Refusé\");\n    }\n}</code></pre>"
   }
  ]
 },
 "Java 2 — méthodes, tableaux, classes & objets": {
  "cours": "<h3>Les méthodes</h3><p>Une <strong>méthode</strong> est l'équivalent Java d'une fonction. Elle déclare le <strong>type de retour</strong> et le <strong>type de chaque paramètre</strong> (<code>void</code> si elle ne renvoie rien).</p><pre><code>public class Main {\n    static int carre(int x) {\n        return x * x;\n    }\n\n    static boolean estPair(int n) {\n        return n % 2 == 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(carre(5));\n        System.out.println(estPair(7));\n    }\n}</code></pre><p><code>static</code> : la méthode appartient à la classe elle-même (pas à un objet) ; on l'appelle directement depuis <code>main</code>.</p>\n<h3>Tableaux et ArrayList</h3><pre><code>import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        int[] notes = new int[3];      // taille FIXE, rempli de 0\n        notes[0] = 14;\n        System.out.println(notes.length);   // 3\n\n        ArrayList&lt;String&gt; matieres = new ArrayList&lt;&gt;();   // taille variable\n        matieres.add(\"Maths\");\n        matieres.add(\"Anglais\");\n        matieres.add(\"Histoire\");\n        matieres.remove(\"Anglais\");\n        System.out.println(matieres + \" \" + matieres.size());\n        for (String m : matieres) {\n            System.out.println(m);\n        }\n    }\n}</code></pre><div class=\"retenir-box\">Un <mark>tableau</mark> (<code>int[]</code>) a une taille <strong>fixée à la création</strong> ; une <mark>ArrayList</mark> grandit et rétrécit (<code>add</code>, <code>remove</code>, <code>size</code>, <code>get(i)</code>). Les indices commencent à <strong>0</strong>, comme en Python. Les types entre chevrons (<code>&lt;String&gt;</code>) s'appellent des <strong>génériques</strong> : ils précisent ce que contient la liste.</div>\n<h3>Classes et objets</h3><pre><code>public class Main {\n    public static void main(String[] args) {\n        Compte c = new Compte(\"Martin\", 100);\n        c.deposer(50);\n        System.out.println(c);\n        try {\n            c.deposer(-5);\n        } catch (IllegalArgumentException e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}\n\nclass Compte {\n    private final String titulaire;\n    private double solde;\n\n    Compte(String titulaire, double solde) {\n        this.titulaire = titulaire;\n        this.solde = solde;\n    }\n\n    void deposer(double montant) {\n        if (montant &lt;= 0) {\n            throw new IllegalArgumentException(\"Le montant doit être positif\");\n        }\n        solde += montant;\n    }\n\n    double getSolde() {\n        return solde;\n    }\n\n    @Override\n    public String toString() {\n        return titulaire + \" : \" + solde + \" €\";\n    }\n}</code></pre><ul><li>Le <strong>constructeur</strong> porte le nom de la classe et n'a pas de type de retour ; <code>new Compte(...)</code> crée un objet.</li><li><code>this</code> désigne l'objet courant (équivalent de <code>self</code> en Python).</li><li><code>private</code> : l'attribut n'est accessible que depuis la classe — c'est l'<mark>encapsulation</mark>. On expose l'état via des méthodes (<code>getSolde()</code>) qui contrôlent ce qui est permis.</li><li><code>final</code> : la valeur ne peut plus changer après l'initialisation.</li><li><code>throw</code> lève une exception ; <code>try / catch</code> l'attrape.</li></ul>\n<h3>Héritage et polymorphisme</h3><pre><code>public class Main {\n    public static void main(String[] args) {\n        Animal[] animaux = { new Chien(), new Chat(), new Animal() };\n        for (Animal a : animaux) {\n            System.out.println(a.cri());\n        }\n    }\n}\n\nclass Animal {\n    String cri() { return \"...\"; }\n}\n\nclass Chien extends Animal {\n    @Override\n    String cri() { return \"Ouaf\"; }\n}\n\nclass Chat extends Animal {\n    @Override\n    String cri() { return \"Miaou\"; }\n}</code></pre><p><code>extends</code> exprime l'héritage ; <code>@Override</code> signale qu'on redéfinit une méthode de la classe mère (le compilateur vérifie la faute de frappe). Le tableau est de type <code>Animal</code> mais chaque objet répond avec <em>son propre</em> <code>cri()</code> : c'est le <mark>polymorphisme</mark>.</p>\n<h3>Convertir et gérer les erreurs</h3><pre><code>public class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"abc\");\n            System.out.println(n);\n        } catch (NumberFormatException e) {\n            System.out.println(\"Pas un nombre\");\n        }\n    }\n}</code></pre><div class=\"attention-box\">Pour afficher un décimal avec 2 chiffres, on utilise <code>System.out.printf(\"%.2f\", x)</code> — mais le séparateur (virgule ou point) dépend de la <mark>langue du système</mark> : en France tu verras une virgule. <code>println(x)</code> affiche toujours un point.</div>",
  "flashcards": [
   {
    "q": "Que signifie void ?",
    "a": "La méthode ne renvoie aucune valeur."
   },
   {
    "q": "Différence tableau / ArrayList ?",
    "a": "Le tableau a une taille fixe définie à sa création ; l'ArrayList est redimensionnable (add, remove, size)."
   },
   {
    "q": "À quoi sert un constructeur ?",
    "a": "À initialiser un nouvel objet : il porte le nom de la classe, n'a pas de type de retour et est appelé avec new."
   },
   {
    "q": "Que désigne this ?",
    "a": "L'objet courant (équivalent de self en Python)."
   },
   {
    "q": "Pourquoi mettre un attribut private ?",
    "a": "Pour l'encapsuler : seul le code de la classe y accède directement, les autres passent par des méthodes (getters/méthodes métier) qui contrôlent la cohérence."
   },
   {
    "q": "Que fait extends ?",
    "a": "Déclare l'héritage : la classe fille reprend les attributs et méthodes de la classe mère."
   },
   {
    "q": "À quoi sert @Override ?",
    "a": "Indique qu'on redéfinit une méthode héritée ; le compilateur signale une erreur si ce n'est pas le cas."
   },
   {
    "q": "Comment attraper une exception ?",
    "a": "try { ... } catch (TypeException e) { ... } ; on lève la sienne avec throw new ..."
   }
  ],
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Écris la signature d'une méthode statique <code>somme</code> qui prend deux entiers et renvoie leur somme.</p>",
    "aide": "Type de retour, nom, paramètres typés.",
    "correction": "<p><code>static int somme(int a, int b) { return a + b; }</code></p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Écris un programme qui crée une <code>ArrayList&lt;Integer&gt;</code> avec 4, 9, 16, puis affiche la somme de ses éléments.</p>",
    "aide": "add() puis une boucle for-each.",
    "correction": "<pre><code>import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList&lt;Integer&gt; valeurs = new ArrayList&lt;&gt;();\n        valeurs.add(4);\n        valeurs.add(9);\n        valeurs.add(16);\n        int somme = 0;\n        for (int v : valeurs) {\n            somme += v;\n        }\n        System.out.println(somme);\n    }\n}</code></pre>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Ajoute à <code>Compte</code> une méthode <code>retirer(double montant)</code> qui lève une <code>IllegalArgumentException</code> si le solde est insuffisant. Pourquoi l'attribut <code>solde</code> reste-t-il <code>private</code> ?</p>",
    "aide": "Compare montant et solde avant de soustraire.",
    "correction": "<p>Pour garantir qu'on ne peut modifier le solde que par des méthodes qui <strong>vérifient les règles</strong> (montant positif, solde suffisant) : sans <code>private</code>, n'importe quel code pourrait écrire <code>c.solde = -1000</code>.</p><pre><code>void retirer(double montant) {\n    if (montant &gt; solde) {\n        throw new IllegalArgumentException(\"Solde insuffisant\");\n    }\n    solde -= montant;\n}</code></pre>"
   }
  ]
 }
});
