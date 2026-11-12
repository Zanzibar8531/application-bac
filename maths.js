/* ============================================================
   BACMASTER — data/maths.js
   Cours et flashcards — Maths
   ============================================================ */

PREBUILT["Maths"] = {

"Fonctions — généralités": {
cours:"<h3>Qu'est-ce qu'une fonction ?</h3>\n<p>Une <strong>fonction</strong> $f$ associe à chaque nombre $x$ d'un ensemble de départ <mark>au plus un</mark> nombre $y$, noté $f(x)$. On écrit $f : x \\mapsto f(x)$.</p>\n<div class=\"formula-box\">$y = f(x)$ : <strong>y</strong> est l'<mark>image</mark> de x par f. <strong>x</strong> est un <mark>antécédent</mark> de y par f.</div>\n\n\n<h3>Ensemble de définition</h3>\n<p>C'est l'ensemble des valeurs de $x$ pour lesquelles $f(x)$ <mark>existe et a un sens</mark>. Deux cas classiques à surveiller :</p>\n<ul>\n<li>Une <strong>fraction</strong> : le dénominateur ne doit jamais être égal à 0.</li>\n<li>Une <strong>racine carrée</strong> : l'expression sous la racine doit être positive ou nulle.</li>\n</ul>\n\n<h3>Taux de variation (accroissement moyen)</h3>\n<div class=\"formula-box\">Taux de variation de $f$ entre $a$ et $b$ (avec $a \\neq b$) : $\\tau = \\dfrac{f(b)-f(a)}{b-a}$</div>\n<p>Il mesure de combien $f(x)$ varie <mark>en moyenne</mark> pour chaque unité de $x$, entre les points d'abscisses $a$ et $b$. Géométriquement, c'est exactement le <strong>coefficient directeur (la pente) de la sécante</strong> — la droite qui relie les deux points $A(a;f(a))$ et $B(b;f(b))$ de la courbe.</p>\n<div class=\"retenir-box\">Le signe du taux de variation donne directement le sens de variation <em>entre ces deux points précis</em> : <mark>positif</mark> → f augmente globalement entre a et b ; <mark>négatif</mark> → f diminue globalement entre a et b. Sans même calculer sa valeur exacte, on peut souvent donner son signe si on connaît déjà le tableau de variations de f sur cet intervalle.</div>\n<div class=\"attention-box\">Ne confonds pas avec le <em>nombre dérivé</em> (vu en dérivation) : le taux de variation se calcule entre deux points <strong>distincts</strong> (a et b), c'est une moyenne sur tout un intervalle. Le nombre dérivé f'(a) est la limite de ce taux quand b se rapproche infiniment près de a — c'est une variation <em>instantanée</em>, en un seul point.</div>\n<p>Dans un contexte concret (économie, physique...), le taux de variation s'interprète toujours avec les unités du problème : par exemple, si f(x) est un bénéfice en euros en fonction de x articles vendus, le taux de variation entre 20 et 25 articles s'interprète comme \"le bénéfice augmente en moyenne de [valeur] € par article vendu, entre 20 et 25 articles\".</p>\n\n<h3>Tableau de signes (méthode générale)</h3>\n<p>Pour étudier le signe d'un produit ou d'un quotient d'expressions (par exemple $(5x-2)(-3x+1)$ ou $\\dfrac{-4x+5}{5x-3}$), la méthode est toujours la même :</p>\n<ol>\n<li>Étudier le signe de <strong>chaque facteur séparément</strong> (chacun est une simple expression affine $ax+b$, positive après sa racine si $a>0$, négative avant).</li>\n<li>Reporter tous les signes dans un <strong>même tableau</strong>, aligné sur les mêmes valeurs de x (dans l'ordre croissant).</li>\n<li><strong>Multiplier les signes</strong> colonne par colonne (règle des signes : + × + = + ; − × − = + ; + × − = −).</li>\n</ol>\n<div class=\"attention-box\">Pour un <mark>quotient</mark>, la méthode est identique, mais il faut en plus exclure la valeur qui annule le <strong>dénominateur</strong> (le quotient n'est jamais défini à cet endroit — on met une double barre dans le tableau, jamais un simple 0).</div>\n\n<h3>Courbe représentative</h3>\n<p>La courbe représentative $C_f$ d'une fonction $f$ dans un repère est l'ensemble des points de coordonnées $(x ; f(x))$. Lire graphiquement $f(a)$ = lire l'ordonnée du point de la courbe d'abscisse $a$.</p>\n\n<h3>Sens de variation</h3>\n<div class=\"formula-box\">\nUne fonction est <strong>croissante</strong> sur un intervalle I si : pour tous $a$ et $b$ de I, $a < b \\Rightarrow f(a) < f(b)$ (l'ordre est conservé).<br>\nUne fonction est <strong>décroissante</strong> sur I si : $a < b \\Rightarrow f(a) > f(b)$ (l'ordre est inversé).\n</div>\n<p>On résume les variations dans un <strong>tableau de variations</strong>, avec des flèches montantes (croissante) ou descendantes (décroissante).</p>\n\n<h3>Les fonctions de référence</h3>\n<div class=\"formula-box\">\n<strong>Fonction affine</strong> : $f(x) = ax + b$ — droite, $a$ = coefficient directeur (pente), $b$ = ordonnée à l'origine.<br>\n<strong>Fonction carré</strong> : $f(x) = x^2$ — parabole, décroissante sur $]-\\infty;0]$, croissante sur $[0;+\\infty[$, minimum en 0.<br>\n<strong>Fonction inverse</strong> : $f(x) = \\dfrac{1}{x}$ — définie sur $\\mathbb{R}^*$, décroissante sur $]-\\infty;0[$ et sur $]0;+\\infty[$ (mais pas sur tout $\\mathbb{R}^*$ en un seul bloc !).\n</div>\n<div class=\"retenir-box\">Piège classique sur la fonction inverse : elle est décroissante sur <mark>chacun</mark> des deux intervalles $]-\\infty;0[$ et $]0;+\\infty[$, mais on ne peut PAS dire qu'elle est \"décroissante sur $\\mathbb{R}^*$\" globalement, car elle passe d'une branche à l'autre en \"sautant\" (elle n'est pas définie en 0).</div>\n\n<h3>Résolution graphique</h3>\n<p>Résoudre $f(x) = k$ graphiquement : chercher les abscisses des points de la courbe ayant pour ordonnée $k$ (intersection avec la droite horizontale $y=k$).<br>\nRésoudre $f(x) \\leq k$ : chercher les abscisses où la courbe est en dessous (ou sur) la droite $y=k$.</p>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Soit $f(x) = 2x - 3$. Calcule $f(4)$, puis détermine si 5 est l'image de 4 par f.</p>",
 aide:"Remplace x par 4 dans l'expression de f(x), puis compare le résultat à 5.",
 correction:"<p>$f(4) = 2 \\times 4 - 3 = 8 - 3 = 5$</p><p>Oui, <strong>5 est bien l'image de 4</strong> par f, puisque $f(4) = 5$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Détermine l'ensemble de définition de la fonction $f(x) = \\dfrac{1}{x-3}$.</p>",
 aide:"Le dénominateur ne doit jamais être égal à 0. Résous x-3=0 pour trouver la valeur interdite.",
 correction:"<p>Le dénominateur $x-3$ doit être différent de 0 : $x - 3 \\neq 0 \\Leftrightarrow x \\neq 3$</p><p>Ensemble de définition : $D_f = \\mathbb{R} \\setminus \\{3\\}$, soit $]-\\infty;3[ \\cup ]3;+\\infty[$</p>"},
{niveau:"Difficile",
 enonce:"<p>Soit $f(x) = \\sqrt{5-2x}$. Détermine l'ensemble de définition de f, puis calcule $f(-2)$.</p>",
 aide:"L'expression sous la racine doit être positive ou nulle. Résous l'inéquation 5-2x ≥ 0.",
 correction:"<p>Il faut $5 - 2x \\geq 0 \\Leftrightarrow -2x \\geq -5 \\Leftrightarrow x \\leq \\frac{5}{2}$ (on divise par un nombre négatif, donc le sens de l'inégalité s'inverse).</p><p>$D_f = ]-\\infty ; \\frac{5}{2}]$</p><p>$f(-2) = \\sqrt{5-2\\times(-2)} = \\sqrt{5+4} = \\sqrt{9} = 3$</p>"},
{niveau:"Facile",
 enonce:"<p>Soit $f(x) = x^2$. Calcule le taux de variation de f entre 2 et 5.</p>",
 aide:"Utilise directement la formule τ = (f(b)-f(a))/(b-a) avec a=2 et b=5.",
 correction:"<p>$f(2) = 4$ et $f(5) = 25$.</p><p>$\\tau = \\dfrac{f(5)-f(2)}{5-2} = \\dfrac{25-4}{3} = \\dfrac{21}{3} = 7$</p><p>En moyenne, f augmente de 7 unités par unité de x, entre 2 et 5.</p>"},
{niveau:"Moyen",
 enonce:"<p>Une entreprise modélise son bénéfice (en centaines d'euros) par $f(x) = -2x^2+90x-400$ pour $x$ articles vendus. Calcule le taux de variation de f entre 4 et 9, puis interprète le résultat dans le contexte de l'énoncé.</p>",
 aide:"Calcule d'abord f(4) et f(9), puis applique la formule du taux de variation. Pour l'interprétation, pense aux unités : centaines d'euros par article vendu.",
 correction:"<p>$$\\begin{aligned} f(4) &= -2(16)+90(4)-400 \\\\ &= -32+360-400 = -72 \\end{aligned}$$</p><p>$$\\begin{aligned} f(9) &= -2(81)+90(9)-400 \\\\ &= -162+810-400 = 248 \\end{aligned}$$</p><p>$\\tau = \\dfrac{248-(-72)}{9-4} = \\dfrac{320}{5} = 64$</p><p><strong>Interprétation</strong> : entre 4 et 9 articles vendus, le bénéfice augmente en moyenne de 64 centaines d'euros (soit 6400€) par article vendu supplémentaire.</p>"},
{niveau:"Difficile",
 enonce:"<p>Résous l'inéquation $(5x-2)(-3x+1) > 0$ à l'aide d'un tableau de signes.</p>",
 aide:"Étudie séparément le signe de chaque facteur (5x-2) et (-3x+1), trouve leur racine respective, place-les dans l'ordre croissant sur une même ligne, puis multiplie les signes colonne par colonne.",
 correction:"<p><strong>Facteur 1</strong> : $5x-2=0 \\Leftrightarrow x=\\frac{2}{5}$. Positif après $\\frac{2}{5}$ (car a=5>0), négatif avant.</p><p><strong>Facteur 2</strong> : $-3x+1=0 \\Leftrightarrow x=\\frac{1}{3}$. Négatif après $\\frac{1}{3}$ (car a=-3<0), positif avant.</p><p>Dans l'ordre croissant : $\\frac{1}{3} < \\frac{2}{5}$. En multipliant les signes sur chaque intervalle ($]-\\infty;\\frac{1}{3}[$, $]\\frac{1}{3};\\frac{2}{5}[$, $]\\frac{2}{5};+\\infty[$) : négatif, positif, négatif.</p><p>Solution de $(5x-2)(-3x+1)>0$ : $x \\in \\left]\\dfrac{1}{3};\\dfrac{2}{5}\\right[$</p>"}
],
flashcards:[
{q:"Image et antécédent — différence",a:"Si y=f(x), y est l'image de x (une seule possible), x est un antécédent de y (il peut y en avoir plusieurs)."},
{q:"Ensemble de définition — cas d'une fraction",a:"Le dénominateur ne doit jamais être égal à 0."},
{q:"Ensemble de définition — cas d'une racine carrée",a:"L'expression sous la racine doit être positive ou nulle (≥ 0)."},
{q:"Fonction croissante — définition",a:"Pour tous a et b de l'intervalle I, si a<b alors f(a)<f(b) : l'ordre est conservé."},
{q:"Fonction décroissante — définition",a:"Pour tous a et b de l'intervalle I, si a<b alors f(a)>f(b) : l'ordre est inversé."},
{q:"Fonction affine — forme générale",a:"f(x) = ax + b. Représentation graphique : une droite. a = coefficient directeur, b = ordonnée à l'origine."},
{q:"Fonction carré — variations",a:"Décroissante sur ]-∞;0], croissante sur [0;+∞[. Minimum en x=0 (f(0)=0). Courbe : une parabole."},
{q:"Fonction inverse — ensemble de définition et variations",a:"Définie sur ℝ* (x≠0). Décroissante sur ]-∞;0[ et décroissante sur ]0;+∞[ séparément (pas globalement sur ℝ*)."},
{q:"Lire f(a) graphiquement",a:"C'est l'ordonnée du point de la courbe représentative dont l'abscisse est a."},
{q:"Résoudre f(x)=k graphiquement",a:"Chercher les abscisses des points d'intersection entre la courbe de f et la droite horizontale y=k."},
{q:"Formule du taux de variation de f entre a et b",a:"τ = (f(b)-f(a))/(b-a)"},
{q:"Interprétation géométrique du taux de variation",a:"C'est le coefficient directeur (la pente) de la sécante qui relie les points A(a;f(a)) et B(b;f(b)) de la courbe."},
{q:"Différence entre taux de variation et nombre dérivé",a:"Le taux de variation se calcule entre deux points distincts (variation moyenne sur un intervalle). Le nombre dérivé est sa limite quand les deux points se rapprochent infiniment (variation instantanée en un seul point)."},
{q:"Méthode générale pour un tableau de signes (produit ou quotient)",a:"Étudier le signe de chaque facteur séparément, les reporter dans un même tableau aligné, puis multiplier les signes colonne par colonne."},
{q:"Tableau de signes d'un quotient — piège à ne pas oublier",a:"Exclure la valeur qui annule le dénominateur (double barre dans le tableau, jamais un simple 0) — le quotient n'y est pas défini."}
]},

"Second degré": {
cours:"<div class=\"attention-box\">Ce chapitre revient dans <strong>presque tous les problèmes</strong> : il sert à résoudre des équations, à étudier des signes et à trouver des maximums (bénéfice, aire, hauteur…). Il est aussi la clé du chapitre Dérivation : très souvent, la dérivée d'une fonction du 3ᵉ degré est… un trinôme du second degré.</div>\n\n<h3>1. Qu'est-ce qu'un trinôme du second degré ?</h3>\n<p>C'est une expression de la forme $f(x) = ax^2 + bx + c$ avec <mark>$a \\neq 0$</mark>. Sa courbe est une <strong>parabole</strong>.</p>\n<div class=\"formula-box\">\nSi $a > 0$ : parabole « en sourire » (ouverte vers le haut) → elle a un <strong>minimum</strong>.<br>\nSi $a < 0$ : parabole « triste » (ouverte vers le bas) → elle a un <strong>maximum</strong>.\n</div>\n<p>Résoudre $ax^2+bx+c = 0$, c'est chercher les points où la parabole <strong>coupe l'axe des abscisses</strong> : il y en a 2, 1 ou 0 selon les cas.</p>\n\n<h3>2. Avant de calculer Δ : regarde l'équation !</h3>\n<p>Le discriminant marche toujours, mais il n'est pas toujours le plus rapide. Réflexes :</p>\n<ul>\n<li><strong>Pas de terme en $x$</strong> ($b = 0$) : on isole $x^2$. Ex : $3x^2 - 12 = 0 \\Leftrightarrow x^2 = 4 \\Leftrightarrow x = 2$ ou $x = -2$. Si $x^2$ doit être égal à un nombre négatif : aucune solution.</li>\n<li><strong>Pas de constante</strong> ($c = 0$) : on <mark>factorise par $x$</mark>. Ex : $x^2 - 7x = 0 \\Leftrightarrow x(x-7) = 0 \\Leftrightarrow x = 0$ ou $x = 7$.</li>\n<li><strong>Racine évidente</strong> : si $a + b + c = 0$, alors $1$ est racine ; si $a - b + c = 0$, alors $-1$ est racine. L'autre racine se déduit du produit $x_1 x_2 = c/a$.</li>\n<li>Sinon : <strong>discriminant</strong>.</li>\n</ul>\n<div class=\"attention-box\">Piège classique : dans $x^2 = 3x$, ne <strong>divise jamais par $x$</strong> : tu perdrais la solution $x = 0$. Passe tout du même côté et factorise : $x^2 - 3x = 0 \\Leftrightarrow x(x-3) = 0$.</div>\n\n<h3>3. Le discriminant</h3>\n<div class=\"formula-box\">$\\Delta = b^2 - 4ac$</div>\n<table class=\"formula-table\">\n<tr><th>Signe de Δ</th><th>Nombre de solutions</th><th>Solutions</th></tr>\n<tr><td>$\\Delta > 0$</td><td>2</td><td>$x_{1,2} = \\dfrac{-b \\mp \\sqrt{\\Delta}}{2a}$</td></tr>\n<tr><td>$\\Delta = 0$</td><td>1 (racine double)</td><td>$x_0 = \\dfrac{-b}{2a}$</td></tr>\n<tr><td>$\\Delta < 0$</td><td>0 dans $\\mathbb{R}$</td><td>aucune</td></tr>\n</table>\n<div class=\"retenir-box\">Dans « $-b$ », fais très attention au signe : si $b = -5$, alors $-b = +5$. C'est la faute d'inattention n°1. Écris toujours $a$, $b$, $c$ avec leurs signes avant de calculer.</div>\n\n<h3>Exemples résolus</h3>\n<p><strong>Δ &gt; 0.</strong> $2x^2 - 3x - 5 = 0$ : $a=2$, $b=-3$, $c=-5$. $\\Delta = (-3)^2 - 4\\times 2\\times(-5) = 9 + 40 = 49$, $\\sqrt{\\Delta} = 7$.<br>\n$x_1 = \\dfrac{3 - 7}{4} = -1$ et $x_2 = \\dfrac{3 + 7}{4} = \\dfrac{5}{2}$. <em>Vérification : $a - b + c = 2 + 3 - 5 = 0$, donc $-1$ est bien racine évidente ✓.</em></p>\n<p><strong>Δ = 0.</strong> $x^2 - 6x + 9 = 0$ : $\\Delta = 36 - 36 = 0$, donc $x_0 = \\dfrac{6}{2} = 3$ (c'est d'ailleurs $(x-3)^2 = 0$).</p>\n<p><strong>Δ &lt; 0.</strong> $x^2 + x + 1 = 0$ : $\\Delta = 1 - 4 = -3 < 0$, donc <em>aucune solution réelle</em> (la parabole reste au-dessus de l'axe).</p>\n\n<h3>4. Les trois formes d'un trinôme</h3>\n<div class=\"formula-box\">\n<strong>Développée</strong> : $ax^2 + bx + c$ — pour lire $c$ (ordonnée à l'origine).<br>\n<strong>Canonique</strong> : $a(x-\\alpha)^2 + \\beta$ avec $\\alpha = \\dfrac{-b}{2a}$ et $\\beta = \\dfrac{-\\Delta}{4a}$ (ou $\\beta = f(\\alpha)$) — pour lire le <mark>sommet</mark> $S(\\alpha\\,;\\,\\beta)$.<br>\n<strong>Factorisée</strong> (si $\\Delta \\geq 0$) : $a(x-x_1)(x-x_2)$ — pour lire les <mark>racines</mark>.\n</div>\n<p><strong>Exemple.</strong> $f(x) = x^2 - 6x + 5$ : $\\alpha = \\dfrac{6}{2} = 3$, $\\Delta = 36 - 20 = 16$, $\\beta = \\dfrac{-16}{4} = -4$. Forme canonique : $(x-3)^2 - 4$ (vérifie en développant : $x^2 - 6x + 9 - 4$ ✓). Sommet $S(3\\,;\\,-4)$ : comme $a = 1 > 0$, le <strong>minimum</strong> de $f$ vaut $-4$, atteint en $x = 3$. Racines : $1$ et $5$, donc $f(x) = (x-1)(x-5)$.</p>\n\n<h3>5. Signe d'un trinôme</h3>\n<div class=\"retenir-box\">Si $\\Delta > 0$ : <strong>« à l'extérieur des racines, du signe de $a$ ; entre les racines, du signe de $-a$ »</strong>.<br>\nSi $\\Delta = 0$ : du signe de $a$ partout (et nul en $x_0$).<br>\nSi $\\Delta < 0$ : du signe de $a$ partout, sans jamais s'annuler.</div>\n<p><strong>Exemple.</strong> Résoudre $-x^2 + 4x - 3 \\geq 0$. $a = -1$, $\\Delta = 16 - 12 = 4$, racines $\\dfrac{-4 \\mp 2}{-2}$, soit $3$ et $1$. Comme $a < 0$, le trinôme est positif <em>entre</em> les racines : $S = [1\\,;\\,3]$. <em>Test : pour $x = 2$, $-4 + 8 - 3 = 1 \\geq 0$ ✓.</em></p>\n\n<h3>6. Utiliser les formules dans les deux sens</h3>\n<div class=\"formula-box\">Somme des racines : $x_1 + x_2 = -\\dfrac{b}{a}$ &nbsp;&nbsp; Produit : $x_1 \\times x_2 = \\dfrac{c}{a}$</div>\n<ul>\n<li><strong>Trouver deux nombres connaissant leur somme $S$ et leur produit $P$</strong> : ce sont les racines de $x^2 - Sx + P = 0$. Ex : somme $7$ et produit $12$ → $x^2 - 7x + 12 = 0$, $\\Delta = 49 - 48 = 1$, racines $3$ et $4$ ✓ ($3+4 = 7$, $3\\times 4 = 12$).</li>\n<li><strong>Trouver un paramètre</strong> : « pour quelles valeurs de $m$ l'équation $x^2 + mx + 9 = 0$ a-t-elle une racine double ? » On écrit $\\Delta = m^2 - 36 = 0$, donc $m = 6$ ou $m = -6$.</li>\n<li><strong>Retrouver une 2ᵉ racine</strong> : si l'une des racines de $x^2 - 5x + 6 = 0$ est $2$, l'autre vaut $5 - 2 = 3$ (somme) ou $6 / 2 = 3$ (produit).</li>\n</ul>\n\n<h3>7. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Oublier le signe de $b$ dans $-b$.<br>\n❌ Ne diviser que $\\sqrt{\\Delta}$ par $2a$ au lieu de <strong>tout</strong> le numérateur.<br>\n❌ Écrire « pas de solution » pour $\\Delta < 0$ : c'est « pas de solution <strong>réelle</strong> ».<br>\n❌ Utiliser « extérieur = signe de $a$ » alors que $\\Delta \\leq 0$ (la règle à deux zones ne vaut que pour $\\Delta > 0$).<br>\n❌ Mettre $a$ en facteur et l'oublier dans la forme factorisée : $2x^2 - 12x + 10 = 2(x-1)(x-5)$, pas $(x-1)(x-5)$.\n</div>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Résous l'équation : $2x^2 - 8 = 0$</p>",
 aide:"Isole $x^2$ avant de faire quoi que ce soit — pas besoin de calculer Δ ici, c'est plus rapide.",
 correction:"<p>$2x^2 - 8 = 0 \\Leftrightarrow 2x^2 = 8 \\Leftrightarrow x^2 = 4 \\Leftrightarrow x = 2$ ou $x = -2$.</p><p>Ici, pas besoin du discriminant : dès qu'il n'y a pas de terme en $x$ (b = 0), isoler $x^2$ est bien plus rapide.</p>"},
{niveau:"Moyen",
 enonce:"<p>Résous l'équation : $x^2 - 5x + 6 = 0$. Donne la forme factorisée du trinôme.</p>",
 aide:"Calcule Δ, puis les deux racines x₁ et x₂, puis utilise la forme factorisée a(x−x₁)(x−x₂).",
 correction:"<p>a=1, b=−5, c=6. Δ = b² − 4ac = 25 − 24 = 1.</p><p>Δ > 0 donc deux racines : $x_1 = \\frac{5 - 1}{2} = 2$ et $x_2 = \\frac{5+1}{2} = 3$.</p><p>Forme factorisée : $(x-2)(x-3)$.</p><p>Vérification rapide : $x_1 + x_2 = 5 = -b/a$ ✓ et $x_1 \\times x_2 = 6 = c/a$ ✓</p>"},
{niveau:"Difficile",
 enonce:"<p>Un rectangle a un périmètre de 24 cm. Son aire est de 35 cm². Détermine ses dimensions à l'aide d'une équation du second degré.</p>",
 aide:"Si L et l sont les côtés, périmètre = 2(L+l) donc L+l = 12. Pose L comme inconnue x, exprime l en fonction de x, puis utilise l'aire.",
 correction:"<p>Périmètre = 24 → L + l = 12 → l = 12 − L. Notons L = x.</p><p>Aire : $$\\begin{aligned} x(12-x) &= 35 \\Leftrightarrow 12x - x^2 = 35 \\\\ &\\Leftrightarrow -x^2 + 12x - 35 = 0 \\Leftrightarrow x^2 - 12x + 35 \\\\ &= 0 \\end{aligned}$$</p><p>Δ = 144 − 140 = 4. Racines : $x_1 = \\frac{12-2}{2} = 5$ et $x_2 = \\frac{12+2}{2} = 7$.</p><p>Le rectangle mesure donc <strong>5 cm sur 7 cm</strong> (les deux solutions correspondent à L et l inversés — même rectangle).</p>"},
{niveau:"Facile",
 enonce:"<p>Résous dans $\\mathbb{R}$ : <strong>a)</strong> $x^2 - 7x = 0$ &nbsp; <strong>b)</strong> $x^2 = 3x$ &nbsp; <strong>c)</strong> $x^2 + 4 = 0$</p>",
 aide:"Regarde chaque équation avant de calculer Δ : pas de constante → factorise par x ; pas de terme en x → isole x².",
 correction:"<p><strong>a)</strong> $x(x-7) = 0$, donc $x = 0$ ou $x = 7$.</p><p><strong>b)</strong> $x^2 - 3x = 0 \\Leftrightarrow x(x-3) = 0$, donc $x = 0$ ou $x = 3$. (Si tu avais divisé par $x$, tu aurais perdu $x = 0$.)</p><p><strong>c)</strong> $x^2 = -4$ est impossible dans $\\mathbb{R}$ : <strong>aucune solution</strong>.</p>"},
{niveau:"Moyen",
 enonce:"<p>Résous dans $\\mathbb{R}$ l'inéquation $-2x^2 + 4x + 6 \\geq 0$.</p>",
 aide:"Calcule Δ et les racines. Le coefficient a est négatif : entre les racines, le trinôme a le signe de −a, donc il est positif.",
 correction:"<p>$a = -2$, $b = 4$, $c = 6$. $\\Delta = 16 - 4\\times(-2)\\times 6 = 16 + 48 = 64$, $\\sqrt{\\Delta} = 8$.</p><p>$x_1 = \\dfrac{-4 - 8}{-4} = 3$ et $x_2 = \\dfrac{-4 + 8}{-4} = -1$.</p><p>Comme $a < 0$, le trinôme est positif <strong>entre</strong> les racines : $S = [-1\\,;\\,3]$.</p><p>Test : $x = 0$ donne $6 \\geq 0$ ✓ ; $x = 4$ donne $-32 + 16 + 6 = -10 < 0$ ✓ (à l'extérieur, négatif).</p>"},
{niveau:"Moyen",
 enonce:"<p>Soit $f(x) = 2x^2 - 12x + 10$. Donne sa forme canonique et son extremum, puis sa forme factorisée.</p>",
 aide:"α = −b/(2a), puis β = f(α). Pour la forme factorisée, il faut les racines : calcule Δ.",
 correction:"<p>$\\alpha = \\dfrac{12}{4} = 3$ et $\\beta = f(3) = 18 - 36 + 10 = -8$. Forme canonique : $f(x) = 2(x-3)^2 - 8$ (vérif : $2x^2 - 12x + 18 - 8$ ✓).</p><p>Comme $a = 2 > 0$, $f$ admet un <strong>minimum</strong> égal à $-8$, atteint en $x = 3$.</p><p>$\\Delta = 144 - 80 = 64$, racines $\\dfrac{12 \\mp 8}{4}$ : $1$ et $5$. Forme factorisée : $f(x) = 2(x-1)(x-5)$ (n'oublie pas le facteur $2$).</p>"},
{niveau:"Difficile",
 enonce:"<p>Une entreprise fabrique et vend $x$ centaines d'objets. Son bénéfice (en centaines d'euros) est $B(x) = -2x^2 + 60x - 350$ pour $x \\in [0\\,;\\,30]$.</p><p>1) Pour quelle quantité le bénéfice est-il maximal ? Quel est-il ?<br>2) Entre quelles quantités l'entreprise est-elle rentable ($B(x) > 0$) ? Donne les valeurs exactes puis approchées.</p>",
 aide:"Le maximum d'une parabole tournée vers le bas est au sommet : α = −b/(2a). Pour la rentabilité, cherche les racines puis applique « entre les racines, du signe de −a ».",
 correction:"<p><strong>1)</strong> $a = -2 < 0$ : le maximum est atteint en $\\alpha = \\dfrac{-60}{-4} = 15$ et vaut $B(15) = -450 + 900 - 350 = 100$. Le bénéfice maximal est de <strong>100 centaines d'euros</strong> (10 000 €) pour <strong>1 500 objets</strong>.</p><p><strong>2)</strong> $$\\begin{aligned} \\Delta &= 3600 - 4\\times(-2)\\times(-350) \\\\ &= 3600 - 2800 = 800 = 400 \\times 2 \\,, \\end{aligned}$$ donc $\\sqrt{\\Delta} = 20\\sqrt{2}$.</p><p>Racines : $x = \\dfrac{-60 \\mp 20\\sqrt{2}}{-4} = 15 \\pm 5\\sqrt{2}$, soit environ $7{,}93$ et $22{,}07$.</p><p>Comme $a < 0$, $B(x) > 0$ <em>entre</em> les racines : l'entreprise est rentable pour $x \\in\\ ]15 - 5\\sqrt2\\,;\\,15 + 5\\sqrt2[$, soit environ de <strong>794 à 2 206 objets</strong>. <em>Contrôle : $B(8) = 2 > 0$ et $B(7) = -28 < 0$ ✓.</em></p>"},
{niveau:"Difficile",
 enonce:"<p>Pour quelles valeurs du réel $m$ l'équation $x^2 + mx + 9 = 0$ admet-elle <strong>une unique solution</strong> ? Donne alors cette solution dans chaque cas.</p>",
 aide:"Une seule solution signifie Δ = 0. Δ dépend de m : tu obtiens une équation en m. Reviens ensuite à x = −b/(2a).",
 correction:"<p>$\\Delta = m^2 - 4\\times 1\\times 9 = m^2 - 36$. Une unique solution ⟺ $\\Delta = 0$ ⟺ $m^2 = 36$ ⟺ $m = 6$ ou $m = -6$.</p><p>• Si $m = 6$ : $x^2 + 6x + 9 = (x+3)^2$, solution $x_0 = \\dfrac{-6}{2} = -3$.</p><p>• Si $m = -6$ : $x^2 - 6x + 9 = (x-3)^2$, solution $x_0 = \\dfrac{6}{2} = 3$.</p>"}
],
flashcards:[
{q:"Discriminant Δ",a:"Δ = b² − 4ac"},
{q:"Si Δ > 0 : solutions",a:"x₁ = (−b − √Δ)/(2a) et x₂ = (−b + √Δ)/(2a)"},
{q:"Si Δ = 0 : solution",a:"Une racine double : x₀ = −b/(2a)"},
{q:"Si Δ < 0 : solutions",a:"Aucune solution réelle."},
{q:"Somme des racines",a:"x₁ + x₂ = −b/a"},
{q:"Produit des racines",a:"x₁ × x₂ = c/a"},
{q:"Coordonnées du sommet",a:"α = −b/(2a) et β = −Δ/(4a). Sommet S(α ; β)."},
{q:"Forme canonique",a:"a(x − α)² + β"},
{q:"Forme factorisée (Δ > 0)",a:"a(x − x₁)(x − x₂)"},
{q:"Signe du trinôme si Δ > 0",a:"Signe de a à l'extérieur de [x₁ ; x₂], signe de −a entre les racines."},
{q:"Signe du trinôme si Δ < 0",a:"Toujours du signe de a sur ℝ entier."},
{q:"ax² + bx + c > 0 solution si Δ > 0, a > 0",a:"x ∈ ]−∞ ; x₁[ ∪ ]x₂ ; +∞["},
{q:"Résoudre ax² + c = 0 (pas de terme en x)",a:"Isoler x² : x² = −c/a. Si −c/a > 0 : x = ±√(−c/a). Si −c/a < 0 : aucune solution réelle."},
{q:"Résoudre ax² + bx = 0 (pas de constante)",a:"Factoriser par x : x(ax + b) = 0, donc x = 0 ou x = −b/a."},
{q:"Racine évidente si a + b + c = 0",a:"x = 1 est racine. L'autre racine vaut c/a (produit des racines)."},
{q:"Racine évidente si a − b + c = 0",a:"x = −1 est racine. L'autre racine vaut −c/a."},
{q:"Parabole : quand y a-t-il un minimum ou un maximum ?",a:"a > 0 : minimum β atteint en x = α. a < 0 : maximum β atteint en x = α. Le sommet est S(α ; β)."},
{q:"Trouver deux nombres de somme S et de produit P",a:"Ce sont les racines de x² − Sx + P = 0."},
{q:"Équation ax² + bx + c = 0 avec une racine double : condition",a:"Δ = 0. Pour un paramètre m : on écrit Δ = 0 et on résout l'équation en m."},
{q:"Pourquoi ne faut-il pas diviser par x dans x² = 3x ?",a:"On perdrait la solution x = 0. Il faut passer tout du même côté et factoriser : x(x − 3) = 0."},
{q:"Δ < 0 : peut-on factoriser le trinôme dans ℝ ?",a:"Non. Il n'y a pas de racine réelle, donc pas de forme factorisée dans ℝ."},
{q:"Lien entre forme canonique et minimum/maximum",a:"Dans a(x − α)² + β, le carré est ≥ 0 : si a > 0 le minimum est β (en x = α) ; si a < 0 le maximum est β."}
]},

"Dérivation": {
 "cours": "<div class=\"attention-box\"><strong>Ce qui tombera à l'évaluation (Dérivation, 1ʳᵉ partie) :</strong> (1) calculer un <em>taux de variation</em> ; (2) calculer un <em>nombre dérivé</em> avec $\\frac{f(a+h)-f(a)}{h}$ puis $h\\to0$ ; (3) <em>lire</em> $f(a)$ et $f'(a)$ sur un graphique avec ses tangentes ; (4) trouver l'<em>équation d'une tangente</em> ; (5) <em>interpréter</em> un nombre dérivé (vitesse, évolution). Les parties 5 à 7 te donnent les méthodes et les pièges.</div>\n\n<h3>0. Comprendre avant de calculer : 3 images</h3>\n<p><strong>Image n°1 — vitesse moyenne ou vitesse instantanée ?</strong> Un trajet de 200 km en 2 h, c'est une vitesse <em>moyenne</em> de 100 km/h : c'est un <strong>taux de variation</strong>. Mais à un instant précis, le compteur de ta voiture affiche une autre valeur : la vitesse <em>instantanée</em>. C'est le <strong>nombre dérivé</strong>. On l'obtient en prenant des durées de plus en plus courtes autour de cet instant.</p>\n<p><strong>Image n°2 — de la sécante à la tangente.</strong> Sur la courbe, on fixe $A$ et on prend un point $M$ de plus en plus proche. La droite $(AM)$ (une <em>sécante</em>) tourne et se rapproche d'une droite limite : la <strong>tangente</strong>. Les pentes des sécantes se rapprochent de la pente de la tangente, qui est le nombre dérivé.</p>\n<svg viewBox=\"0 0 540 235\" role=\"img\" aria-label=\"Des sécantes vers la tangente\" style=\"width:100%;max-width:560px;display:block;margin:12px auto\"><line x1=\"20\" y1=\"215\" x2=\"520\" y2=\"215\" stroke=\"currentColor\" stroke-opacity=\".35\"/><polyline points=\"30.0,215.0 38.5,214.9 47.0,214.7 55.5,214.3 64.0,213.7 72.5,213.0 81.0,212.1 89.5,211.1 98.0,209.9 106.5,208.5 115.0,207.0 123.5,205.3 132.0,203.5 140.5,201.5 149.0,199.3 157.5,197.0 166.0,194.5 174.5,191.9 183.0,189.1 191.5,186.1 200.0,183.0 208.5,179.7 217.0,176.3 225.5,172.7 234.0,168.9 242.5,165.0 251.0,160.9 259.5,156.7 268.0,152.3 276.5,147.7 285.0,143.0 293.5,138.1 302.0,133.1 310.5,127.9 319.0,122.5 327.5,117.0 336.0,111.3 344.5,105.5 353.0,99.5 361.5,93.3 370.0,87.0 378.5,80.5 387.0,73.9 395.5,67.1 404.0,60.1 412.5,53.0 421.0,45.7 429.5,38.3 438.0,30.7 446.5,22.9 455.0,15.0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"/><line x1=\"149.0\" y1=\"211.8\" x2=\"429.5\" y2=\"53.4\" stroke=\"#94a3b8\" stroke-width=\"1.6\"/><circle cx=\"370.0\" cy=\"87.0\" r=\"4\" fill=\"#94a3b8\"/><line x1=\"149.0\" y1=\"207.0\" x2=\"429.5\" y2=\"75.0\" stroke=\"#94a3b8\" stroke-width=\"1.6\"/><circle cx=\"285.0\" cy=\"143.0\" r=\"4\" fill=\"#94a3b8\"/><line x1=\"149.0\" y1=\"204.6\" x2=\"429.5\" y2=\"85.8\" stroke=\"#94a3b8\" stroke-width=\"1.6\"/><circle cx=\"242.5\" cy=\"165.0\" r=\"4\" fill=\"#94a3b8\"/><line x1=\"123.5\" y1=\"211.8\" x2=\"429.5\" y2=\"96.6\" stroke=\"#ec4899\" stroke-width=\"2.8\"/><circle cx=\"200\" cy=\"183\" r=\"5.5\" fill=\"#6366f1\"/><text x=\"192\" y=\"203\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">A</text><text x=\"376\" y=\"79\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"500\" fill=\"currentColor\">h = 2</text><text x=\"291\" y=\"133.0\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"500\" fill=\"currentColor\">h = 1</text><text x=\"246.5\" y=\"153.0\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"500\" fill=\"currentColor\">h = 0,5</text><text x=\"445\" y=\"66\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"500\" fill=\"currentColor\">pente 1,5</text><text x=\"445\" y=\"98\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"500\" fill=\"currentColor\">pente 1,25</text><text x=\"448\" y=\"127\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"500\" fill=\"currentColor\">pente 1,125</text><text x=\"450\" y=\"153\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"600\" fill=\"#ec4899\">tangente</text><text x=\"450\" y=\"168\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"600\" fill=\"#ec4899\">pente f′(a) = 1</text></svg>\n<p><strong>Image n°3 — le zoom.</strong> Regarde une courbe lisse avec un énorme zoom autour de $A$ : elle ressemble à une droite. Cette droite, c'est la tangente : la meilleure approximation de la courbe par une droite, tout près de $A$.</p>\n\n<h3>1. Taux de variation entre $a$ et $b$</h3>\n<div class=\"formula-box\">$a\\neq b$ dans $I$ : $\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{f(b)-f(a)}{b-a}$</div>\n<p><strong>Exemple 1.</strong> $f(t)=5t^2$ entre 4 et 5 : $\\dfrac{f(5)-f(4)}{5-4}=\\dfrac{125-80}{1}=45$.<br>\n<strong>Interprétation.</strong> Si $f$ est une distance en fonction du temps, le taux de variation est une <strong>vitesse moyenne</strong> (ici 45 m/s entre 4 s et 5 s).<br>\n<strong>Graphiquement.</strong> C'est le <strong>coefficient directeur de la droite $(AB)$</strong> qui coupe la courbe en $A(a;f(a))$ et $B(b;f(b))$.</p>\n\n<h3>2. Nombre dérivé de $f$ en $a$</h3>\n<p>On note $h=b-a$, donc $b=a+h$. Le taux d'accroissement entre $a$ et $a+h$ est $\\dfrac{f(a+h)-f(a)}{h}$.</p>\n<p><strong>Exemple 2.</strong> $f(t)=5t^2$ entre 4 et $4+h$ :<br>\n$\\dfrac{f(4+h)-f(4)}{h}=\\dfrac{5(4+h)^2-5\\times4^2}{h}=\\dfrac{5(16+8h+h^2)-80}{h}=\\dfrac{40h+5h^2}{h}=40+5h$.<br>\nQuand $h$ se rapproche de 0, $40+5h$ se rapproche de <strong>40</strong>. Le nombre dérivé est $f'(4)=40$ (vitesse instantanée : 40 m/s à $t=4$).</p>\n<table><tr><th>$h$</th><th>0,5</th><th>0,2</th><th>0,1</th><th>0,01</th><th>0,001</th><th>→ 0</th></tr>\n<tr><td>vitesse moyenne entre 4 et $4+h$</td><td>42,5</td><td>41</td><td>40,5</td><td>40,05</td><td>40,005</td><td><strong>40</strong></td></tr></table>\n<div class=\"formula-box\"><strong>Définition.</strong> $f$ est <strong>dérivable en $a$</strong> si, quand $h\\to0$, $\\dfrac{f(a+h)-f(a)}{h}$ se rapproche d'un réel $\\ell$. Ce réel est le <strong>nombre dérivé</strong> noté $f'(a)$ :<br>$\\dfrac{f(a+h)-f(a)}{h}\\xrightarrow[h\\to0]{}f'(a)$. (« tend vers $f'(a)$ lorsque $h$ tend vers 0 »)</div>\n<div class=\"retenir-box\"><strong>Méthode — calculer $f'(a)$ en 3 étapes.</strong><br>① Écrire $\\dfrac{f(a+h)-f(a)}{h}$ avec la vraie fonction.<br>② <strong>Développer et simplifier</strong> jusqu'à ce que le $h$ du dénominateur disparaisse (on met $h$ en facteur au numérateur).<br>③ Faire tendre $h$ vers 0 dans le résultat simplifié (les termes qui contiennent encore $h$ disparaissent).<br><em>Exemple 3 :</em> $f(x)=x^2$, $a=1$ : $\\dfrac{(1+h)^2-1}{h}=\\dfrac{1+2h+h^2-1}{h}=\\dfrac{2h+h^2}{h}=2+h\\to2$. Donc $f'(1)=2$.<br><em>On ne remplace jamais $h$ par 0 avant de simplifier</em> : on obtiendrait $\\frac00$.</div>\n<p><strong>Ce que la méthode donne pour $x^2$ :</strong> en 1 → 2 ; en 2 → $\\frac{(2+h)^2-4}{h}=4+h\\to4$ ; en 3 → $\\frac{(3+h)^2-9}{h}=6+h\\to6$. On devine $f'(a)=2a$. Pour $f(t)=5t^2$, le TP donne $f'(t)=10t$.</p>\n<p><strong>Remarque sur le développement.</strong> $(a+h)^2=a^2+2ah+h^2$ (n'oublie pas le terme du milieu !). Et $(a+h)^3=a^3+3a^2h+3ah^2+h^3$.</p>\n\n<h3>3. La tangente à la courbe en un point</h3>\n<div class=\"formula-box\"><strong>Définition.</strong> $f$ dérivable en $a$. La <strong>tangente</strong> à $\\mathcal{C}_f$ au point $A(a;f(a))$ est la droite qui passe par $A$ et dont le <strong>coefficient directeur est $f'(a)$</strong>.</div>\n<div class=\"retenir-box\"><strong>Méthode — lire $f'(a)$ sur un graphique.</strong> ① Repère le point de la courbe d'abscisse $a$ et sa tangente. ② Prends deux points de la tangente et lis $\\Delta x$ (vers la droite) et $\\Delta y$ (en haut : +, en bas : −). ③ $f'(a)=\\dfrac{\\Delta y}{\\Delta x}$.<br><strong>Cas à reconnaître :</strong> tangente qui monte → $f'(a)>0$ ; qui descend → $f'(a)<0$ ; <strong>horizontale</strong> → $f'(a)=0$.<br><strong>Exemple (courbe ci-dessous).</strong> En $A$ la tangente descend de 2 pour 1 carreau : $f'(0)=-2$ et $f(0)=0$. En $B$ elle est horizontale : $f'(2)=0$, $f(2)=-2$. En $C$ elle monte de 2 pour 1 : $f'(4)=2$, $f(4)=0$.</div>\n<svg viewBox=\"0 0 360 200\" role=\"img\" aria-label=\"Courbe avec trois tangentes\" style=\"width:100%;max-width:420px;display:block;margin:12px auto\"><line x1=\"28\" y1=\"10\" x2=\"28\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"132\" y1=\"10\" x2=\"132\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"184\" y1=\"10\" x2=\"184\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"236\" y1=\"10\" x2=\"236\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"288\" y1=\"10\" x2=\"288\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"340\" y1=\"10\" x2=\"340\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"209\" x2=\"345\" y2=\"209\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"171\" x2=\"345\" y2=\"171\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"133\" x2=\"345\" y2=\"133\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"95\" x2=\"345\" y2=\"95\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"57\" x2=\"345\" y2=\"57\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"19\" x2=\"345\" y2=\"19\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"95\" x2=\"345\" y2=\"95\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".6\"/><text x=\"132\" y=\"108\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"500\" fill=\"currentColor\">1</text><text x=\"72\" y=\"61\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"500\" fill=\"currentColor\">1</text><polyline points=\"48.8,42.6 51.4,47.5 54.0,52.2 56.6,57.0 59.2,61.6 61.8,66.1 64.4,70.5 67.0,74.8 69.6,79.0 72.2,83.2 74.8,87.2 77.4,91.2 80.0,95.0 82.6,98.8 85.2,102.4 87.8,106.0 90.4,109.4 93.0,112.8 95.6,116.1 98.2,119.3 100.8,122.4 103.4,125.4 106.0,128.2 108.6,131.1 111.2,133.8 113.8,136.4 116.4,138.9 119.0,141.3 121.6,143.6 124.2,145.9 126.8,148.0 129.4,150.1 132.0,152.0 134.6,153.9 137.2,155.6 139.8,157.3 142.4,158.8 145.0,160.3 147.6,161.7 150.2,163.0 152.8,164.2 155.4,165.3 158.0,166.2 160.6,167.2 163.2,168.0 165.8,168.7 168.4,169.3 171.0,169.8 173.6,170.2 176.2,170.6 178.8,170.8 181.4,171.0 184.0,171.0 186.6,171.0 189.2,170.8 191.8,170.6 194.4,170.2 197.0,169.8 199.6,169.3 202.2,168.7 204.8,168.0 207.4,167.2 210.0,166.2 212.6,165.3 215.2,164.2 217.8,163.0 220.4,161.7 223.0,160.3 225.6,158.8 228.2,157.3 230.8,155.6 233.4,153.9 236.0,152.0 238.6,150.1 241.2,148.0 243.8,145.9 246.4,143.6 249.0,141.3 251.6,138.9 254.2,136.4 256.8,133.8 259.4,131.1 262.0,128.2 264.6,125.4 267.2,122.4 269.8,119.3 272.4,116.1 275.0,112.8 277.6,109.4 280.2,106.0 282.8,102.4 285.4,98.8 288.0,95.0 290.6,91.2 293.2,87.2 295.8,83.2 298.4,79.0 301.0,74.8 303.6,70.5 306.2,66.1 308.8,61.6 311.4,57.0 314.0,52.2 316.6,47.5 319.2,42.6 321.8,37.6 324.4,32.5 327.0,27.3 329.6,22.0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"/><line x1=\"33.2\" y1=\"26.6\" x2=\"126.8\" y2=\"163.4\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"80\" cy=\"95.0\" r=\"4.5\" fill=\"#6366f1\"/><text x=\"90\" y=\"87.0\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">A</text><line x1=\"137.2\" y1=\"171.0\" x2=\"230.8\" y2=\"171.0\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"184\" cy=\"171.0\" r=\"4.5\" fill=\"#6366f1\"/><text x=\"194\" y=\"191.0\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">B</text><line x1=\"241.2\" y1=\"163.4\" x2=\"334.8\" y2=\"26.6\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"288\" cy=\"95.0\" r=\"4.5\" fill=\"#6366f1\"/><text x=\"286\" y=\"87.0\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">C</text></svg>\n<h3>4. Équation réduite de la tangente</h3>\n<div class=\"formula-box\">La tangente à $\\mathcal{C}_f$ au point d'abscisse $a$ a pour équation : $\\;y=f'(a)\\,(x-a)+f(a)$.</div>\n<div class=\"retenir-box\"><strong>Méthode en 4 étapes.</strong> ① Noter $a$. ② Calculer $f(a)$. ③ Calculer (ou lire) $f'(a)$. ④ Remplacer dans la formule puis développer pour obtenir $y=mx+p$.<br>\n<strong>Exemple 6.</strong> $f(x)=x^2$. <br>• Au point d'abscisse $a=-2$ : $f(-2)=4$, $f'(-2)=-4$. $y=-4(x+2)+4=-4x-8+4=-4x-4$.<br>• Au point $B(1;1)$ : $f(1)=1$, $f'(1)=2$. $y=2(x-1)+1=2x-2+1=2x-1$.<br><strong>Vérification rapide :</strong> la tangente doit passer par $(a;f(a))$ : $-4(-2)-4=4$ ✓ ; $2\\times1-1=1$ ✓.</div>\n\n<h3>5. À quoi ça sert ? Interpréter un nombre dérivé</h3>\n<ul>\n<li><strong>Vitesse :</strong> $f(t)$ = distance en m, $t$ en s → $f'(t)$ en <strong>m/s</strong> (vitesse instantanée). Tour Eiffel : $f(t)=5t^2$, $f'(t)=10t$, à l'impact ($t\\approx7{,}47$ s) : $f'(7{,}47)=74{,}7$ m/s ≈ 269 km/h.</li>\n<li><strong>Évolution :</strong> $f'(2)=56$ dans l'épidémie → au bout de 2 mois, le nombre de malades augmente d'environ 56 000 par mois.</li>\n<li><strong>Signe :</strong> $f'(a)>0$ : $f$ monte ; $f'(a)<0$ : $f$ descend ; $f'(a)=0$ : tangente horizontale (souvent un maximum ou un minimum).</li>\n</ul>\n\n<h3>6. Quelle méthode pour quelle question ?</h3>\n<table><tr><th>La question…</th><th>Tu fais…</th></tr>\n<tr><td>« taux de variation entre $a$ et $b$ »</td><td>$\\frac{f(b)-f(a)}{b-a}$</td></tr>\n<tr><td>« calculer $f'(a)$ » (avec la formule de $f$)</td><td>$\\frac{f(a+h)-f(a)}{h}$, simplifier, $h\\to0$</td></tr>\n<tr><td>on te <strong>donne</strong> $\\frac{f(a+h)-f(a)}{h}=\\ldots$</td><td>$h\\to0$ dans l'expression donnée</td></tr>\n<tr><td>« lire $f'(a)$ » sur le graphique</td><td>pente de la tangente : $\\Delta y/\\Delta x$</td></tr>\n<tr><td>« équation de la tangente en $a$ »</td><td>$y=f'(a)(x-a)+f(a)$</td></tr>\n<tr><td>« tangente <strong>parallèle</strong> à une droite $y=mx+p$ »</td><td>résoudre $f'(a)=m$</td></tr>\n<tr><td>« tangente horizontale »</td><td>résoudre $f'(a)=0$</td></tr></table>\n\n<h3>7. Les erreurs qui coûtent des points</h3>\n<div class=\"attention-box\">\n① Oublier de <strong>diviser par $h$</strong> ou de simplifier le $h$ avant de faire tendre $h$ vers 0.<br>\n② Mettre $h=0$ tout de suite dans la fraction (résultat $\\frac00$, impossible).<br>\n③ Confondre $f(a)$ (une <em>hauteur</em> sur la courbe) et $f'(a)$ (une <em>pente</em>).<br>\n④ Se tromper dans $(a+h)^2$ : oublier $2ah$.<br>\n⑤ Oublier $(x-a)$ dans l'équation de la tangente, ou mal développer $-4(x+2)$ (attention aux signes).<br>\n⑥ Lire une pente à l'œil : compte les carreaux, avec le signe ($\\Delta y$ négatif si la tangente descend).<br>\n⑦ Écrire « le nombre dérivé est le taux de variation » : c'est la <em>limite</em> des taux quand $h\\to0$.\n</div>\n\n<h3>8. À retenir</h3>\n<div class=\"retenir-box\">Taux de variation : $\\frac{f(b)-f(a)}{b-a}$ · Nombre dérivé : $f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$ · $f'(a)$ = pente de la tangente · Tangente : $y=f'(a)(x-a)+f(a)$ · Pour $x^2$ : $f'(a)=2a$ ; pour $5t^2$ : $f'(t)=10t$.</div>\n<div class=\"attention-box\"><strong>Pour la suite (2ᵉ partie du chapitre).</strong> Tu apprendras à dériver <em>sans passer par $h$</em>, avec des règles. Elles sont déjà résumées ci-dessous pour ceux qui veulent prendre de l'avance.</div>\n<h3>Suite du chapitre — Dérivées usuelles</h3>\n<table class=\"formula-table\">\n<tr><th>$f(x)$</th><th>$f'(x)$</th><th>Remarque</th></tr>\n<tr><td>$k$ (constante)</td><td>$0$</td><td></td></tr>\n<tr><td>$x$</td><td>$1$</td><td></td></tr>\n<tr><td>$x^2$</td><td>$2x$</td><td></td></tr>\n<tr><td>$x^3$</td><td>$3x^2$</td><td></td></tr>\n<tr><td>$x^n$</td><td>$n\\,x^{n-1}$</td><td>$n$ entier</td></tr>\n<tr><td>$\\dfrac{1}{x}$</td><td>$-\\dfrac{1}{x^2}$</td><td>sur $\\mathbb{R}^*$</td></tr>\n<tr><td>$\\sqrt{x}$</td><td>$\\dfrac{1}{2\\sqrt{x}}$</td><td>sur $]0\\,;+\\infty[$</td></tr>\n<tr><td>$\\sin x$</td><td>$\\cos x$</td><td></td></tr>\n<tr><td>$\\cos x$</td><td>$-\\sin x$</td><td></td></tr>\n<tr><td>$e^x$</td><td>$e^x$</td><td></td></tr>\n<tr><td>$\\ln x$</td><td>$\\dfrac{1}{x}$</td><td>sur $]0\\,;+\\infty[$</td></tr>\n</table>\n\n<h3>Suite du chapitre — Règles de calcul</h3>\n<div class=\"formula-box latex-block\">$(u+v)' = u' + v'$ &nbsp;&nbsp; $(k\\,u)' = k\\,u'$<br>\n$(u\\,v)' = u'v + u\\,v'$ &nbsp;&nbsp; $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - u\\,v'}{v^2}$<br>\n$\\big(g(ax+b)\\big)' = a\\,g'(ax+b)$ &nbsp;&nbsp; $(u^n)' = n\\,u'\\,u^{n-1}$</div>\n<div class=\"attention-box\">Attention : $(u\\,v)' \\neq u'\\,v'$ ! La dérivée d'un produit n'est <strong>pas</strong> le produit des dérivées (ni pour le quotient). Teste : $(x\\times x)' = (x^2)' = 2x$, alors que $x' \\times x' = 1$.</div>\n<p><strong>Méthode pour un produit ou un quotient :</strong> écris d'abord un petit tableau $u,\\ u',\\ v,\\ v'$, <em>puis</em> applique la formule. Tu évites 90 % des erreurs.</p>\n<p><strong>Produit.</strong> $f(x) = x^2(3x - 1)$ : $u = x^2$, $u' = 2x$, $v = 3x-1$, $v' = 3$. $$\\begin{aligned} f'(x) &= 2x(3x-1) + x^2\\times 3 \\\\ &= 6x^2 - 2x + 3x^2 = 9x^2 - 2x \\,. \\end{aligned}$$ <em>Vérification : $f(x) = 3x^3 - x^2$, donc $f'(x) = 9x^2 - 2x$ ✓.</em></p>\n<p><strong>Quotient.</strong> $f(x) = \\dfrac{2x+1}{x+3}$ : $u = 2x+1$, $u' = 2$, $v = x+3$, $v' = 1$. $$\\begin{aligned} f'(x) &= \\dfrac{2(x+3) - (2x+1)\\times 1}{(x+3)^2} \\\\ &= \\dfrac{5}{(x+3)^2} \\,. \\end{aligned}$$ Le numérateur est positif et le carré aussi : $f$ est croissante sur chaque intervalle où elle est définie.</p>\n<p><strong>Puissance de $ax+b$.</strong> $f(x) = (3x+2)^4$ : $f'(x) = 4\\times 3\\times(3x+2)^3 = 12(3x+2)^3$.</p>\n\n<h3>Suite du chapitre — Dérivée et variations : la méthode en 4 étapes</h3>\n<ol>\n<li>Donner l'<strong>ensemble de définition</strong>.</li>\n<li>Calculer $f'(x)$ et, si possible, la <strong>factoriser</strong>.</li>\n<li>Étudier le <strong>signe de $f'(x)$</strong> (tableau de signes, souvent avec un trinôme du second degré !).</li>\n<li>Conclure dans un <strong>tableau de variations</strong> : $f' > 0 \\Rightarrow f$ croissante ; $f' < 0 \\Rightarrow f$ décroissante.</li>\n</ol>\n<p><strong>Exemple complet.</strong> $f(x) = 2x^3 - 3x^2 - 12x + 1$ sur $\\mathbb{R}$. $$\\begin{aligned} f'(x) &= 6x^2 - 6x - 12 = 6(x^2 - x - 2) \\\\ &= 6(x-2)(x+1) \\end{aligned}$$ (racines $-1$ et $2$ ; $a = 6 > 0$). Donc $f'(x) > 0$ sur $]-\\infty\\,;-1[$ et sur $]2\\,;+\\infty[$, et $f'(x) < 0$ sur $]-1\\,;2[$.</p>\n<table class=\"formula-table\">\n<tr><th>$x$</th><th>$-\\infty$</th><th></th><th>$-1$</th><th></th><th>$2$</th><th></th><th>$+\\infty$</th></tr>\n<tr><td>$f'(x)$</td><td></td><td>+</td><td>0</td><td>−</td><td>0</td><td>+</td><td></td></tr>\n<tr><td>$f(x)$</td><td></td><td>↗</td><td>$8$</td><td>↘</td><td>$-19$</td><td>↗</td><td></td></tr>\n</table>\n<p>$f(-1) = -2 - 3 + 12 + 1 = 8$ (maximum local) et $f(2) = 16 - 12 - 24 + 1 = -19$ (minimum local).</p>\n<div class=\"retenir-box\">Un <mark>extremum</mark> en $a$ demande que $f'(a) = 0$ <strong>ET</strong> que $f'$ <strong>change de signe</strong> en $a$. Contre-exemple : $f(x) = x^3$ a $f'(0) = 0$ mais $f'(x) = 3x^2 \\geq 0$ ne change pas de signe : pas d'extremum en $0$.</div>\n\n<h3>Suite du chapitre — Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Dériver un produit terme à terme : $(uv)' \\neq u'v'$.<br>\n❌ Oublier que la dérivée d'une constante est $0$ (et que $(5x)' = 5$, pas $0$).<br>\n❌ Dans un quotient, inverser l'ordre au numérateur : c'est $u'v - uv'$ (et non $uv' - u'v$).<br>\n❌ Écrire « $f'(a) = 0$ donc extremum » sans vérifier le changement de signe.<br>\n❌ Confondre $f(a)$ (une ordonnée) et $f'(a)$ (une pente).\n</div>",
 "exercices": [
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>TP « Du haut de la Tour Eiffel ».</strong> Une pièce est lâchée du haut de la tour (279 m). Distance parcourue (m) en fonction du temps (s) : $f(t)=5t^2$.<br>1) a. Temps mis pour arriver au sol (arrondi à $10^{-2}$). b. Vitesse moyenne de la chute en m/s puis km/h. Est-ce une bonne estimation de la vitesse à l'impact ?<br>2) a. Montrer que la vitesse moyenne entre $t_1=4$ et $t_2=4{,}5$ est 42,5 m/s. b. Compléter : vitesse moyenne entre 4 et $4+h$ pour $h=0{,}2$ ; $0{,}01$ ; $0{,}001$ ; $0{,}0001$. Vers quelle valeur tend-elle ?<br>3) Déterminer $f'(2)$, $f'(5)$, $f'(6)$, $f'(7)$ puis conjecturer $f'(t_0)$.<br>4) Montrer que $\\frac{f(t_0+h)-f(t_0)}{h}=10t_0+5h$, en déduire $f'(t_0)$ puis la vitesse à l'impact (m/s et km/h).</p>",
   "aide": "Vitesse moyenne = (distance parcourue)/(durée). Pour le taux entre 4 et 4+h, c'est $\\frac{f(4+h)-f(4)}{h}$.",
   "correction": "<p>1) a. $5t^2=279$ → $t^2=55{,}8$ → $t=\\sqrt{55{,}8}\\approx7{,}47$ s.<br>b. $v_{moy}=\\frac{279}{7{,}47}\\approx37{,}35$ m/s $\\approx134{,}5$ km/h ($\\times3{,}6$). <strong>Pas une bonne estimation</strong> de la vitesse à l'impact : la pièce accélère, donc elle va plus vite à la fin qu'en moyenne.<br>2) a. $\\frac{f(4{,}5)-f(4)}{0{,}5}=\\frac{101{,}25-80}{0{,}5}=42{,}5$ ✓.<br>b. $h=0{,}2$ : $\\frac{88{,}2-80}{0{,}2}=41$ ; $h=0{,}01$ : $40{,}05$ ; $h=0{,}001$ : $40{,}005$ ; $h=0{,}0001$ : $40{,}0005$. Valeur limite : <strong>40</strong>, donc $f'(4)=40$ m/s.<br>3) $f'(2)=20$, $f'(5)=50$, $f'(6)=60$, $f'(7)=70$ → conjecture $f'(t_0)=10t_0$.<br>4) $\\frac{5(t_0+h)^2-5t_0^2}{h}=\\frac{5t_0^2+10t_0h+5h^2-5t_0^2}{h}=\\frac{10t_0h+5h^2}{h}=10t_0+5h\\to10t_0$. Donc $f'(t)=10t$. À l'impact : $f'(7{,}47)=74{,}7$ m/s $\\approx268{,}9$ km/h (≈ 269). <em>Remarque : la vitesse moyenne (37,35) vaut exactement la moitié de la vitesse finale (74,7), typique d'une accélération constante.</em></p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><strong>Ex 1.</strong> 1) $f$ est définie sur $\\mathbb{R}$ et $\\frac{f(1+h)-f(1)}{h}=h^2+2h+2$. Donner $f'(1)$.<br>2) $g$ est la fonction carré. a. Montrer que $\\frac{g(2+h)-g(2)}{h}=h+4$. Que peut-on en déduire quand $h$ tend vers 0 ? b. Déterminer de la même façon $g'(3)$.</p>",
   "aide": "Quand on te donne le taux d'accroissement, il suffit de faire $h\\to0$. Sinon : développer, simplifier, $h\\to0$.",
   "correction": "<p>1) Quand $h\\to0$, $h^2+2h+2\\to2$ donc $f'(1)=2$.<br>2) a. $\\frac{(2+h)^2-2^2}{h}=\\frac{4+4h+h^2-4}{h}=\\frac{4h+h^2}{h}=4+h$ ✓. Quand $h\\to0$ : $4+h\\to4$, donc $g'(2)=4$.<br>b. $\\frac{(3+h)^2-3^2}{h}=\\frac{9+6h+h^2-9}{h}=\\frac{6h+h^2}{h}=6+h\\to6$ donc $g'(3)=6$.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><strong>Ex 2 bis — Lecture graphique.</strong> La courbe de $f$ est tracée avec ses tangentes aux points $A$, $B$, $C$ d'abscisses $0$, $2$, $4$ (1 carreau = 1 unité).</p><svg viewBox=\"0 0 360 200\" role=\"img\" aria-label=\"Courbe avec trois tangentes\" style=\"width:100%;max-width:420px;display:block;margin:12px auto\"><line x1=\"28\" y1=\"10\" x2=\"28\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"132\" y1=\"10\" x2=\"132\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"184\" y1=\"10\" x2=\"184\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"236\" y1=\"10\" x2=\"236\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"288\" y1=\"10\" x2=\"288\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"340\" y1=\"10\" x2=\"340\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"209\" x2=\"345\" y2=\"209\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"171\" x2=\"345\" y2=\"171\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"133\" x2=\"345\" y2=\"133\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"95\" x2=\"345\" y2=\"95\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"57\" x2=\"345\" y2=\"57\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"19\" x2=\"345\" y2=\"19\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"20\" y1=\"95\" x2=\"345\" y2=\"95\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"185\" stroke=\"currentColor\" stroke-opacity=\".6\"/><text x=\"132\" y=\"108\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"500\" fill=\"currentColor\">1</text><text x=\"72\" y=\"61\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"500\" fill=\"currentColor\">1</text><polyline points=\"48.8,42.6 51.4,47.5 54.0,52.2 56.6,57.0 59.2,61.6 61.8,66.1 64.4,70.5 67.0,74.8 69.6,79.0 72.2,83.2 74.8,87.2 77.4,91.2 80.0,95.0 82.6,98.8 85.2,102.4 87.8,106.0 90.4,109.4 93.0,112.8 95.6,116.1 98.2,119.3 100.8,122.4 103.4,125.4 106.0,128.2 108.6,131.1 111.2,133.8 113.8,136.4 116.4,138.9 119.0,141.3 121.6,143.6 124.2,145.9 126.8,148.0 129.4,150.1 132.0,152.0 134.6,153.9 137.2,155.6 139.8,157.3 142.4,158.8 145.0,160.3 147.6,161.7 150.2,163.0 152.8,164.2 155.4,165.3 158.0,166.2 160.6,167.2 163.2,168.0 165.8,168.7 168.4,169.3 171.0,169.8 173.6,170.2 176.2,170.6 178.8,170.8 181.4,171.0 184.0,171.0 186.6,171.0 189.2,170.8 191.8,170.6 194.4,170.2 197.0,169.8 199.6,169.3 202.2,168.7 204.8,168.0 207.4,167.2 210.0,166.2 212.6,165.3 215.2,164.2 217.8,163.0 220.4,161.7 223.0,160.3 225.6,158.8 228.2,157.3 230.8,155.6 233.4,153.9 236.0,152.0 238.6,150.1 241.2,148.0 243.8,145.9 246.4,143.6 249.0,141.3 251.6,138.9 254.2,136.4 256.8,133.8 259.4,131.1 262.0,128.2 264.6,125.4 267.2,122.4 269.8,119.3 272.4,116.1 275.0,112.8 277.6,109.4 280.2,106.0 282.8,102.4 285.4,98.8 288.0,95.0 290.6,91.2 293.2,87.2 295.8,83.2 298.4,79.0 301.0,74.8 303.6,70.5 306.2,66.1 308.8,61.6 311.4,57.0 314.0,52.2 316.6,47.5 319.2,42.6 321.8,37.6 324.4,32.5 327.0,27.3 329.6,22.0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"/><line x1=\"33.2\" y1=\"26.6\" x2=\"126.8\" y2=\"163.4\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"80\" cy=\"95.0\" r=\"4.5\" fill=\"#6366f1\"/><text x=\"90\" y=\"87.0\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">A</text><line x1=\"137.2\" y1=\"171.0\" x2=\"230.8\" y2=\"171.0\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"184\" cy=\"171.0\" r=\"4.5\" fill=\"#6366f1\"/><text x=\"194\" y=\"191.0\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">B</text><line x1=\"241.2\" y1=\"163.4\" x2=\"334.8\" y2=\"26.6\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"288\" cy=\"95.0\" r=\"4.5\" fill=\"#6366f1\"/><text x=\"286\" y=\"87.0\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">C</text></svg><p>1) Donner $f(a)$ et $f'(a)$ pour $a=0$, $a=2$, $a=4$. 2) Donner l'équation réduite de la tangente en $A$.</p>",
   "aide": "Sur la tangente, compte $\\Delta y$ pour $\\Delta x=1$ carreau vers la droite.",
   "correction": "<p>$A$ : $f(0)=0$ ; la tangente descend de 2 pour 1 carreau → $f'(0)=-2$.<br>$B$ : $f(2)=-2$ ; tangente horizontale → $f'(2)=0$.<br>$C$ : $f(4)=0$ ; la tangente monte de 2 pour 1 → $f'(4)=2$.<br>2) $y=f'(0)(x-0)+f(0)=-2x$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 2 et 3 (ta feuille) — méthode.</strong> Pour chaque point $A$, $B$, $C$, $D$ des courbes avec tangentes : donner $f(a)$ et $f'(a)$.</p>",
   "aide": "Fais toujours deux choses : lire la hauteur du point (pour $f(a)$), puis la pente de sa tangente (pour $f'(a)$).",
   "correction": "<p><strong>Méthode.</strong> ① $f(a)$ : le point est sur la courbe, on lit son ordonnée. ② $f'(a)$ : sur la tangente, lis $\\Delta y$ pour un $\\Delta x$ de plusieurs carreaux vers la droite, puis divise. ③ Tangente horizontale → $f'(a)=0$ (sommet de la courbe). ④ Vérifie le signe : courbe qui monte → positif, qui descend → négatif.<br>Exemple de rédaction : « Au point $C$, la tangente est horizontale donc $f'(\\frac52)=0$, et $C$ a pour ordonnée 4 donc $f(\\frac52)=4$. » Refais chaque point de ta feuille avec cette méthode ; si tu m'envoies une photo plus nette des figures, je te donne les valeurs.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 4.</strong> À partir du tableau, donner une allure possible de la courbe de $g$ sur $[-4;4]$.</p><table><tr><th>$x$</th><th>−4</th><th>−2</th><th>0</th><th>2</th><th>3</th></tr><tr><td>$g(x)$</td><td>2</td><td>2</td><td>−1</td><td>0</td><td>2,5</td></tr><tr><td>$g'(x)$</td><td>0,5</td><td>−1</td><td>0</td><td>2</td><td>1</td></tr></table>",
   "aide": "Place d'abord les 5 points, puis à chaque point dessine un petit segment de tangente avec la bonne pente.",
   "correction": "<p><strong>Méthode :</strong> ① place les points $(-4;2)$, $(-2;2)$, $(0;-1)$, $(2;0)$, $(3;2{,}5)$ ; ② à chacun, trace un petit trait de pente $0{,}5$ ; $-1$ ; $0$ ; $2$ ; $1$ ; ③ relie par une courbe lisse qui épouse ces tangentes.<br>Lecture : en $-4$ la courbe monte doucement, puis elle redescend (en $-2$ la pente est $-1$) ; elle descend jusqu'à un <strong>minimum en $x=0$</strong> (tangente horizontale, $g(0)=-1$) ; puis elle remonte de plus en plus vite ($g'(2)=2$) et continue de monter en $x=3$.</p><svg viewBox=\"0 0 400 190\" role=\"img\" aria-label=\"Allure possible de la courbe de g\" style=\"width:100%;max-width:440px;display:block;margin:12px auto\"><line x1=\"40\" y1=\"10\" x2=\"40\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"120\" y1=\"10\" x2=\"120\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"160\" y1=\"10\" x2=\"160\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"200\" y1=\"10\" x2=\"200\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"240\" y1=\"10\" x2=\"240\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"280\" y1=\"10\" x2=\"280\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"320\" y1=\"10\" x2=\"320\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"360\" y1=\"10\" x2=\"360\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"30\" y1=\"148\" x2=\"375\" y2=\"148\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"30\" y1=\"118\" x2=\"375\" y2=\"118\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"30\" y1=\"88\" x2=\"375\" y2=\"88\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"30\" y1=\"58\" x2=\"375\" y2=\"58\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"30\" y1=\"28\" x2=\"375\" y2=\"28\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"30\" y1=\"-2\" x2=\"375\" y2=\"-2\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"30\" y1=\"118\" x2=\"375\" y2=\"118\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"200\" y1=\"10\" x2=\"200\" y2=\"170\" stroke=\"currentColor\" stroke-opacity=\".6\"/><polyline points=\"40.0,58.0 44.0,56.5 48.0,55.0 52.0,53.6 56.0,52.2 60.0,51.0 64.0,49.8 68.0,48.8 72.0,47.9 76.0,47.2 80.0,46.8 84.0,46.5 88.0,46.5 92.0,46.7 96.0,47.3 100.0,48.2 104.0,49.4 108.0,50.9 112.0,52.9 116.0,55.2 120.0,58.0 120.0,58.0 124.0,61.4 128.0,65.4 132.0,70.0 136.0,75.0 140.0,80.5 144.0,86.3 148.0,92.2 152.0,98.3 156.0,104.4 160.0,110.5 164.0,116.4 168.0,122.1 172.0,127.4 176.0,132.3 180.0,136.8 184.0,140.6 188.0,143.7 192.0,146.0 196.0,147.5 200.0,148.0 200.0,148.0 204.0,148.1 208.0,148.2 212.0,148.5 216.0,148.7 220.0,148.9 224.0,149.1 228.0,149.1 232.0,149.0 236.0,148.6 240.0,148.0 244.0,147.1 248.0,145.8 252.0,144.2 256.0,142.1 260.0,139.6 264.0,136.5 268.0,132.8 272.0,128.6 276.0,123.6 280.0,118.0 280.0,118.0 282.0,114.8 284.0,111.3 286.0,107.5 288.0,103.5 290.0,99.2 292.0,94.9 294.0,90.4 296.0,85.8 298.0,81.3 300.0,76.8 302.0,72.3 304.0,68.0 306.0,63.8 308.0,59.8 310.0,56.1 312.0,52.7 314.0,49.7 316.0,47.0 318.0,44.8 320.0,43.0 360.0,13.0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"/><line x1=\"16.0\" y1=\"67.0\" x2=\"64.0\" y2=\"49.0\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"40\" cy=\"58\" r=\"4\" fill=\"#6366f1\"/><line x1=\"96.0\" y1=\"40.0\" x2=\"144.0\" y2=\"76.0\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"120\" cy=\"58\" r=\"4\" fill=\"#6366f1\"/><line x1=\"176.0\" y1=\"148.0\" x2=\"224.0\" y2=\"148.0\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"200\" cy=\"148\" r=\"4\" fill=\"#6366f1\"/><line x1=\"256.0\" y1=\"154.0\" x2=\"304.0\" y2=\"82.0\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"280\" cy=\"118\" r=\"4\" fill=\"#6366f1\"/><line x1=\"296.0\" y1=\"61.0\" x2=\"344.0\" y2=\"25.0\" stroke=\"#ec4899\" stroke-width=\"1.8\"/><circle cx=\"320\" cy=\"43.0\" r=\"4\" fill=\"#6366f1\"/></svg><p><em>Une seule allure possible parmi d'autres : toute courbe lisse qui respecte les points et les pentes convient.</em></p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 5 — partie 3.</strong> On donne $\\frac{f(0+h)-f(0)}{h}=h^2+h-2$. En déduire $f'(0)$ puis expliquer comment tracer la tangente correspondante.</p>",
   "aide": "Fais tendre $h$ vers 0 dans l'expression donnée.",
   "correction": "<p>Quand $h\\to0$ : $h^2+h-2\\to-2$ donc $f'(0)=-2$.<br><strong>Tracé :</strong> la tangente passe par le point de la courbe d'abscisse 0, de coordonnées $(0;f(0))$ (à lire sur le graphique), et son coefficient directeur est $-2$ : à partir de ce point, on descend de 2 carreaux quand on avance de 1 carreau vers la droite.<br>Équation : $y=-2x+f(0)$.<br><em>Parties 1 et 2 de l'exercice :</em> lis $f(a)$ et $f'(a)$ aux points d'abscisses $1$, $-1$, $-2$ avec la méthode de l'exercice 2 ; pour une équation de tangente lue graphiquement, lis la pente $m$ puis l'ordonnée à l'origine $p$ : $y=mx+p$.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 6.</strong> $f$ est définie sur $]0;+\\infty[$. La droite $T_A$ est tangente à $\\mathcal{C}_f$ au point $A(1;20)$ et passe par $B(3;10)$.<br>1) Donner $f(1)$ et déterminer $f'(1)$. 2) Équation réduite de $T_A$. 3) $a>0$, $h\\neq0$ et $\\frac{f(a+h)-f(a)}{h}=4-\\frac{9}{a(a+h)}$ : déterminer $f'(a)$. 4) Existe-t-il une tangente à la courbe parallèle à la droite $d$ : $y=3x-2$ ?</p>",
   "aide": "1) $f'(1)$ = pente de $T_A$ = pente de $(AB)$. 4) Deux droites parallèles ont le même coefficient directeur.",
   "correction": "<p>1) $f(1)=20$ (ordonnée de $A$). $f'(1)$ = coefficient directeur de $T_A=(AB)$ : $\\frac{10-20}{3-1}=-5$.<br>2) $y=f'(1)(x-1)+f(1)=-5(x-1)+20=-5x+25$. <em>Contrôle :</em> en $x=3$, $-15+25=10$ ✓ ($B$ est sur la droite).<br>3) Quand $h\\to0$ : $\\frac{9}{a(a+h)}\\to\\frac{9}{a^2}$ donc $f'(a)=4-\\frac{9}{a^2}$. <em>Contrôle :</em> $f'(1)=4-9=-5$ ✓.<br>4) Une tangente est parallèle à $d$ si $f'(a)=3$ : $4-\\frac{9}{a^2}=3$ ⟺ $\\frac{9}{a^2}=1$ ⟺ $a^2=9$ ⟺ $a=3$ ou $a=-3$. Comme $a>0$ : $a=3$. <strong>Oui</strong>, la tangente au point d'abscisse 3 est parallèle à $d$.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 7 (questions 1 à 5).</strong> Une épidémie est modélisée par $f$ sur $[0;8]$ ($t$ en mois, $f(t)$ en milliers de malades). La droite $(AB)$ avec $A(2;96)$ et $B(4;208)$ est tangente à la courbe en $A$. On admet que $f'(t)$ est la vitesse de propagation.<br>1) Alerte quand il y a plus de 40 000 malades : quelle est sa durée ? 2) Variations de $f$ sur $[0;8]$. 3) Quand le nombre de malades est-il maximal ? Combien ? 4) Déterminer $f'(2)$ et interpréter. 5) Résoudre graphiquement $f'(t)=0$.</p>",
   "aide": "4) $f'(2)$ est la pente de la tangente $(AB)$.",
   "correction": "<p>1) On lit sur le graphique où la courbe est au-dessus de 40 : environ de $t\\approx1$ à $t\\approx7{,}7$ (avec la formule $f(t)=-2t^3+12t^2+32t$ : $f(t)=40$ en $t\\approx0{,}96$ et $t\\approx7{,}73$). Durée de l'alerte ≈ <strong>6,8 mois</strong>.<br>2) $f$ est <strong>croissante sur $[0;5]$ puis décroissante sur $[5;8]$</strong> (maximum vers $t=5$).<br>3) Maximum au bout d'environ 5 mois (≈ 21 semaines) : environ <strong>210 milliers</strong>, soit 210 000 malades (exactement $t\\approx5{,}06$ et $f\\approx210{,}1$).<br>4) $f'(2)=\\frac{208-96}{4-2}=56$ : au bout de 2 mois, le nombre de malades augmente d'environ <strong>56 000 par mois</strong>.<br>5) $f'(t)=0$ quand la tangente est horizontale : $t\\approx5$ (le sommet de la courbe) — exactement $t=2+\\frac{2\\sqrt{21}}{3}\\approx5{,}06$.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 7 (questions 6 et 7).</strong> On admet que $f(t)=-2t^3+12t^2+32t$ sur $[0;8]$.<br>6) Taux de variation de $f$ : a. entre 2 et 4 mois ; b. entre 6 et 7 mois. Interpréter.<br>7) a. On donne $\\frac{f(2+h)-f(2)}{h}=56-2h^2$ : quel résultat retrouve-t-on ? b. Pour tout $a\\in]0;8[$ : $\\frac{f(a+h)-f(a)}{h}=-6a^2-6ah-2h^2+24a+12h+32$. i. En déduire $f'(a)$ puis $f'(7)$. ii. Tracer la tangente en $t=7$. iii. Comment retrouver les réponses de la question 6 ?</p>",
   "aide": "7 b. i : fais tendre $h$ vers 0 dans l'expression donnée.",
   "correction": "<p>6) $f(2)=96$, $f(4)=192$, $f(6)=192$, $f(7)=126$.<br>a. $\\frac{192-96}{2}=48$ : entre 2 et 4 mois, <strong>+48 000 malades par mois en moyenne</strong>.<br>b. $\\frac{126-192}{1}=-66$ : entre 6 et 7 mois, <strong>−66 000 par mois</strong> (l'épidémie recule).<br>7) a. Quand $h\\to0$ : $56-2h^2\\to56$ : on retrouve $f'(2)=56$ (question 4).<br>b. i. $h\\to0$ : $f'(a)=-6a^2+24a+32$. Donc $f'(7)=-294+168+32=-94$.<br>ii. Tangente en 7 : $f(7)=126$, $y=-94(x-7)+126=-94x+784$ (pente très négative : $f$ décroît vite).<br>iii. On reprend l'expression avec $h$ non nul : pour 2 → 4, $a=2$ et $h=2$ : $-24-24-8+48+24+32=48$ ✓ ; pour 6 → 7, $a=6$ et $h=1$ : $-216-36-2+144+12+32=-66$ ✓.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice A (5 pts)</strong> <em>(45 min pour tout l'éval blanche)</em> $f(x)=3x^2$. 1) Taux de variation entre 1 et 3. (1 pt) 2) Calculer $f'(2)$ avec $\\frac{f(2+h)-f(2)}{h}$ puis $h\\to0$. (2 pts) 3) Équation réduite de la tangente au point d'abscisse 2. (2 pts)</p>",
   "aide": "Les 3 étapes du calcul : écrire, simplifier, $h\\to0$.",
   "correction": "<p>1) $\\frac{f(3)-f(1)}{3-1}=\\frac{27-3}{2}=12$. (1)<br>2) $\\frac{3(2+h)^2-12}{h}=\\frac{12+12h+3h^2-12}{h}=\\frac{12h+3h^2}{h}=12+3h\\to12$ donc $f'(2)=12$. (2)<br>3) $f(2)=12$ : $y=12(x-2)+12=12x-24+12=12x-12$. (2)</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice B (5 pts)</strong> La tangente à $\\mathcal{C}_f$ au point $A(1;4)$ passe par $B(3;-2)$. 1) Donner $f(1)$ et $f'(1)$. (2 pts) 2) Équation réduite de cette tangente. (2 pts) 3) En $C(3;-1)$ de la courbe, la tangente est horizontale. Donner $f'(3)$ et l'équation de cette tangente. (1 pt)</p>",
   "aide": "$f'(1)$ est la pente de la droite $(AB)$.",
   "correction": "<p>1) $f(1)=4$ ; $f'(1)=\\frac{-2-4}{3-1}=-3$. (2)<br>2) $y=-3(x-1)+4=-3x+7$ (contrôle : $x=3$ donne $-2$ ✓). (2)<br>3) Tangente horizontale : $f'(3)=0$ ; équation $y=f'(3)(x-3)+f(3)=-1$. (1)</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice C (6 pts)</strong> Un mobile glisse sur un rail : sa distance parcourue (m) est $d(t)=2t^2+3t$ ($t$ en s). 1) Vitesse moyenne entre $t=2$ et $t=5$. (1,5 pt) 2) Calculer $\\frac{d(2+h)-d(2)}{h}$ et simplifier. (2 pts) 3) En déduire la vitesse instantanée à $t=2$ et l'interpréter. (1,5 pt) 4) Équation de la tangente à la courbe de $d$ en $t=2$. (1 pt)</p>",
   "aide": "$d(2)=14$.",
   "correction": "<p>1) $d(2)=14$, $d(5)=65$ : $\\frac{65-14}{3}=17$ m/s. (1,5)<br>2) $\\frac{2(2+h)^2+3(2+h)-14}{h}=\\frac{8+8h+2h^2+6+3h-14}{h}=\\frac{11h+2h^2}{h}=11+2h$. (2)<br>3) $h\\to0$ : $d'(2)=11$ : à $t=2$ s, la vitesse instantanée est de <strong>11 m/s</strong>. (1,5)<br>4) $y=11(t-2)+14=11t-8$. (1)</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice D (4 pts)</strong> Vrai ou faux ? Justifier. (a) Si $f'(a)=0$, la tangente en $a$ est horizontale. (b) Si $f'(a)<0$, la fonction $f$ est croissante près de $a$. (c) Le nombre dérivé $f'(a)$ est égal au taux de variation de $f$ entre $a$ et $a+h$. (d) Deux tangentes parallèles ont le même nombre dérivé.</p>",
   "aide": "Reviens aux définitions.",
   "correction": "<p>(a) <strong>Vrai</strong> : le coefficient directeur est 0. (1)<br>(b) <strong>Faux</strong> : pente négative, la courbe <em>descend</em> : $f$ décroît. (1)<br>(c) <strong>Faux</strong> : $f'(a)$ est la <em>limite</em> du taux quand $h\\to0$, pas le taux pour un $h$ donné. (1)<br>(d) <strong>Vrai</strong> : droites parallèles ⟺ même coefficient directeur. (1)<br><strong>Barème total : 20 points</strong> (A 5 + B 5 + C 6 + D 4).</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Calcule la dérivée de $f(x) = 3x^2 - 5x + 7$.</p>",
   "aide": "Dérive chaque terme séparément : (u+v)' = u'+v', et rappelle-toi que la dérivée d'une constante est 0.",
   "correction": "<p>$f'(x) = 3 \\times 2x - 5 + 0 = 6x - 5$</p><p>On dérive terme à terme : $(3x^2)' = 6x$, $(-5x)' = -5$, $(7)' = 0$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Soit $f(x) = (2x+1)(x-3)$. Calcule $f'(x)$ en utilisant la formule du produit, puis vérifie en développant d'abord $f(x)$.</p>",
   "aide": "Formule du produit : (uv)' = u'v + uv'. Ici u = 2x+1 (donc u'=2) et v = x-3 (donc v'=1).",
   "correction": "<p><strong>Méthode 1 (produit)</strong> : $$\\begin{aligned} f'(x) &= 2(x-3) + (2x+1)(1) \\\\ &= 2x - 6 + 2x + 1 = 4x - 5 \\end{aligned}$$</p><p><strong>Méthode 2 (développer d'abord)</strong> : $f(x) = 2x^2 - 6x + x - 3 = 2x^2 - 5x - 3$, donc $f'(x) = 4x - 5$. Les deux méthodes donnent bien le même résultat ✓</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Soit $f(x) = \\dfrac{x^2+1}{x-1}$ définie sur $]1;+\\infty[$. Calcule $f'(x)$ et détermine le signe de $f'(x)$ sur cet intervalle.</p>",
   "aide": "Formule du quotient : (u/v)' = (u'v-uv')/v². Une fois f'(x) calculée, factorise le numérateur pour étudier son signe (le dénominateur (x-1)² est toujours positif).",
   "correction": "<p>$u = x^2+1$ donc $u'=2x$ ; $v = x-1$ donc $v'=1$.</p><p>$$\\begin{aligned} f'(x) &= \\dfrac{2x(x-1) - (x^2+1)(1)}{(x-1)^2} \\\\ &= \\dfrac{2x^2-2x-x^2-1}{(x-1)^2} \\\\ &= \\dfrac{x^2-2x-1}{(x-1)^2} \\end{aligned}$$</p><p>Le dénominateur $(x-1)^2$ est toujours positif. Le signe de $f'(x)$ dépend donc du numérateur $x^2-2x-1$ (discriminant Δ=8, racines $1-\\sqrt2$ et $1+\\sqrt2$). Sur $]1;+\\infty[$, seule la racine $1+\\sqrt2 \\approx 2,41$ est dans l'intervalle : $f'(x) < 0$ sur $]1;1+\\sqrt2[$ et $f'(x) > 0$ sur $]1+\\sqrt2;+\\infty[$.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Soit $f(x) = x^4 - 2x^3 + 5x - 7$. Calcule $f'(x)$, puis $f'(1)$.</p>",
   "aide": "Dérive terme à terme avec (xⁿ)' = n·xⁿ⁻¹. La dérivée de 5x est 5 et celle de −7 est 0.",
   "correction": "<p>$f'(x) = 4x^3 - 2\\times 3x^2 + 5 - 0 = 4x^3 - 6x^2 + 5$.</p><p>$f'(1) = 4 - 6 + 5 = 3$.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Soit $f(x) = x^2 + x$. Détermine l'équation de la tangente à la courbe de $f$ au point d'abscisse $a = 1$.</p>",
   "aide": "Calcule f(1), f'(x) puis f'(1), puis utilise y = f'(a)(x − a) + f(a).",
   "correction": "<p>$f(1) = 1 + 1 = 2$. $f'(x) = 2x + 1$ donc $f'(1) = 3$.</p><p>Tangente : $y = 3(x - 1) + 2 = 3x - 1$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Étudie les variations de $g(x) = x^3 - 6x^2 + 9x + 2$ sur $\\mathbb{R}$ : calcule $g'(x)$, factorise-la, donne son signe puis dresse le tableau de variations avec les valeurs aux extremums.</p>",
   "aide": "g'(x) est un trinôme du second degré : factorise par 3, puis cherche les racines. Rappel : à l'extérieur des racines, du signe de a.",
   "correction": "<p>$g'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3)$. Pour $x^2 - 4x + 3$ : $\\Delta = 16 - 12 = 4$, racines $\\dfrac{4 \\mp 2}{2}$ : $1$ et $3$. Donc $g'(x) = 3(x-1)(x-3)$.</p><p>Comme $a = 3 > 0$ : $g'(x) > 0$ sur $]-\\infty\\,;1[$ et $]3\\,;+\\infty[$, et $g'(x) < 0$ sur $]1\\,;3[$.</p><p>$g(1) = 1 - 6 + 9 + 2 = 6$ et $g(3) = 27 - 54 + 27 + 2 = 2$.</p><p>$g$ est croissante sur $]-\\infty\\,;1]$, décroissante sur $[1\\,;3]$, croissante sur $[3\\,;+\\infty[$ : maximum local $6$ en $x = 1$, minimum local $2$ en $x = 3$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Soit $f(x) = ax^2 + bx$ où $a$ et $b$ sont deux réels. On sait que la courbe de $f$ passe par le point $A(1\\,;\\,3)$ et que la tangente en $A$ a pour pente $4$. Détermine $a$ et $b$.</p>",
   "aide": "Traduis chaque information en équation : « passe par A(1 ; 3) » donne f(1) = 3 ; « pente 4 » donne f'(1) = 4. Tu obtiens un système.",
   "correction": "<p>$f(1) = a + b = 3$. Et $f'(x) = 2ax + b$, donc $f'(1) = 2a + b = 4$.</p><p>En soustrayant les deux équations : $(2a + b) - (a + b) = 4 - 3$, donc $a = 1$, puis $b = 2$.</p><p>Donc $f(x) = x^2 + 2x$. Vérification : $f(1) = 3$ ✓ et $f'(1) = 2 + 2 = 4$ ✓.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>On veut clôturer un enclos rectangulaire d'aire $16\\ \\text{m}^2$. Un côté mesure $x$ mètres ($x > 0$).</p><p>1) Exprime l'autre côté, puis le périmètre $P(x)$ en fonction de $x$.<br>2) Étudie les variations de $P$ sur $]0\\,;+\\infty[$.<br>3) Quelles dimensions donnent le plus petit périmètre ? Que remarque-t-on ?</p>",
   "aide": "Aire = x × y = 16 donc y = 16/x. Dérive P(x) = 2x + 32/x avec (1/x)' = −1/x², puis mets sur le même dénominateur pour étudier le signe.",
   "correction": "<p>1) L'autre côté vaut $\\dfrac{16}{x}$ et $P(x) = 2\\left(x + \\dfrac{16}{x}\\right) = 2x + \\dfrac{32}{x}$.</p><p>2) $$\\begin{aligned} P'(x) &= 2 - \\dfrac{32}{x^2} = \\dfrac{2x^2 - 32}{x^2} \\\\ &= \\dfrac{2(x-4)(x+4)}{x^2} \\,. \\end{aligned}$$ Pour $x > 0$, $x + 4 > 0$ et $x^2 > 0$ : le signe de $P'$ est celui de $(x - 4)$. Donc $P$ décroît sur $]0\\,;4]$ et croît sur $[4\\,;+\\infty[$.</p><p>3) Le minimum est atteint en $x = 4$ : $P(4) = 8 + 8 = 16$ m. L'autre côté vaut $\\dfrac{16}{4} = 4$ : c'est un <strong>carré de 4 m de côté</strong>. À aire donnée, c'est le carré qui a le plus petit périmètre.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><em>(2ᵉ partie — dérivées par les règles)</em></p><p>Soit $f(x) = x^2$. Existe-t-il des tangentes à la courbe de $f$ qui passent par le point $A(1\\,;\\,-3)$ ? Si oui, donne leurs équations.</p>",
   "aide": "Écris la tangente en un point d'abscisse a quelconque : y = 2a(x − a) + a². Impose ensuite qu'elle passe par A : tu obtiens une équation du second degré en a.",
   "correction": "<p>Tangente en $a$ : $f(a) = a^2$, $f'(a) = 2a$, donc $y = 2a(x - a) + a^2 = 2ax - a^2$.</p><p>Elle passe par $A(1\\,;-3)$ si $-3 = 2a - a^2$, c'est-à-dire $a^2 - 2a - 3 = 0$. $\\Delta = 4 + 12 = 16$, donc $a = \\dfrac{2 \\mp 4}{2}$ : $a = 3$ ou $a = -1$.</p><p>Il y a donc <strong>deux tangentes</strong> : pour $a = 3$, $y = 6x - 9$ ; pour $a = -1$, $y = -2x - 1$.</p><p>Vérification en $A$ : $6\\times 1 - 9 = -3$ ✓ et $-2\\times 1 - 1 = -3$ ✓.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Taux de variation de f entre a et b",
   "a": "(f(b) − f(a)) / (b − a) = Δy / Δx, avec a ≠ b."
  },
  {
   "q": "Taux de variation d'une distance en fonction du temps : que représente-t-il ?",
   "a": "Une vitesse moyenne."
  },
  {
   "q": "Graphiquement, le taux de variation entre a et b est…",
   "a": "Le coefficient directeur de la droite (AB) (la sécante) avec A(a ; f(a)) et B(b ; f(b))."
  },
  {
   "q": "Que représente h dans (f(a+h) − f(a)) / h ?",
   "a": "L'écart entre a et b : h = b − a, donc b = a + h."
  },
  {
   "q": "Taux d'accroissement de f entre a et a + h",
   "a": "(f(a + h) − f(a)) / h"
  },
  {
   "q": "Définition du nombre dérivé f′(a)",
   "a": "La valeur vers laquelle se rapproche (f(a+h) − f(a)) / h quand h se rapproche de 0."
  },
  {
   "q": "Que signifie « f est dérivable en a » ?",
   "a": "Que (f(a+h) − f(a)) / h se rapproche d'un réel ℓ quand h tend vers 0. Ce réel est f′(a)."
  },
  {
   "q": "Comment se lit « →(h→0) » ?",
   "a": "« tend vers … lorsque h tend vers 0 »."
  },
  {
   "q": "Nombre dérivé et vitesse",
   "a": "Si f est une distance en fonction du temps, f′(a) est la vitesse instantanée à l'instant a."
  },
  {
   "q": "Vitesse moyenne ou instantanée : laquelle correspond au taux de variation ? au nombre dérivé ?",
   "a": "Taux de variation = vitesse moyenne. Nombre dérivé = vitesse instantanée (le « compteur »)."
  },
  {
   "q": "Définition de la tangente à C_f au point A(a ; f(a))",
   "a": "La droite qui passe par A et dont le coefficient directeur est f′(a)."
  },
  {
   "q": "Que vaut le coefficient directeur de la tangente en a ?",
   "a": "f′(a)."
  },
  {
   "q": "f′(a) > 0 : que fait la courbe près de a ?",
   "a": "Elle monte (la tangente monte)."
  },
  {
   "q": "f′(a) < 0 : que fait la courbe près de a ?",
   "a": "Elle descend (la tangente descend)."
  },
  {
   "q": "f′(a) = 0 : que voit-on ?",
   "a": "Une tangente horizontale (souvent un maximum ou un minimum)."
  },
  {
   "q": "Comment lire f′(a) sur un graphique ?",
   "a": "Sur la tangente : f′(a) = Δy / Δx (compter les carreaux, avec le signe)."
  },
  {
   "q": "Équation réduite de la tangente en a",
   "a": "y = f′(a)(x − a) + f(a)"
  },
  {
   "q": "Méthode pour trouver l'équation d'une tangente (4 étapes)",
   "a": "① noter a ② calculer f(a) ③ calculer f′(a) ④ remplacer dans y = f′(a)(x − a) + f(a) et développer."
  },
  {
   "q": "Équation de la tangente à x² au point d'abscisse −2",
   "a": "f(−2) = 4, f′(−2) = −4 : y = −4(x + 2) + 4 = −4x − 4."
  },
  {
   "q": "Équation de la tangente à x² au point B(1 ; 1)",
   "a": "f′(1) = 2 : y = 2(x − 1) + 1 = 2x − 1."
  },
  {
   "q": "Comment vérifier une équation de tangente ?",
   "a": "Elle doit passer par le point (a ; f(a)) : remplacer x par a doit donner f(a)."
  },
  {
   "q": "Méthode pour calculer f′(a) à la main (3 étapes)",
   "a": "① écrire (f(a+h) − f(a))/h ② développer et simplifier le h ③ faire tendre h vers 0."
  },
  {
   "q": "Développer (a + h)²",
   "a": "a² + 2ah + h² (ne pas oublier le terme 2ah)."
  },
  {
   "q": "Développer (a + h)³",
   "a": "a³ + 3a²h + 3ah² + h³"
  },
  {
   "q": "Erreur à éviter : remplacer h par 0 tout de suite",
   "a": "On obtient 0/0 : il faut d'abord simplifier le h, puis faire tendre h vers 0."
  },
  {
   "q": "Calculer f′(1) pour f(x) = x²",
   "a": "((1+h)² − 1)/h = (2h + h²)/h = 2 + h → 2. Donc f′(1) = 2."
  },
  {
   "q": "Calculer g′(3) pour g(x) = x²",
   "a": "((3+h)² − 9)/h = 6 + h → 6. Donc g′(3) = 6."
  },
  {
   "q": "Conjecture pour f(x) = x² : f′(a) = ?",
   "a": "2a (f′(1) = 2, f′(2) = 4, f′(3) = 6)."
  },
  {
   "q": "Tour Eiffel : f(t) = 5t². Que vaut f′(t) ?",
   "a": "10t (vitesse instantanée). Ex. f′(4) = 40 m/s."
  },
  {
   "q": "Taux d'accroissement de 5t² entre 4 et 4 + h",
   "a": "40 + 5h, qui tend vers 40 quand h → 0 : f′(4) = 40."
  },
  {
   "q": "Si on te donne (f(a+h) − f(a))/h = h² + h − 2, que vaut f′(0) ?",
   "a": "On fait h → 0 : f′(0) = −2."
  },
  {
   "q": "Comment trouver une tangente parallèle à la droite y = 3x − 2 ?",
   "a": "Résoudre f′(a) = 3 (même coefficient directeur)."
  },
  {
   "q": "Comment trouver où la tangente est horizontale ?",
   "a": "Résoudre f′(a) = 0."
  },
  {
   "q": "Pente de la droite passant par A(x_A ; y_A) et B(x_B ; y_B)",
   "a": "(y_B − y_A) / (x_B − x_A)"
  },
  {
   "q": "La tangente en A passe par B : comment trouver f′(a) ?",
   "a": "f′(a) = pente de la droite (AB) = (y_B − y_A) / (x_B − x_A)."
  },
  {
   "q": "Unité de f′(a) si f est en mètres et t en secondes",
   "a": "Mètres par seconde (m/s)."
  },
  {
   "q": "Convertir des m/s en km/h",
   "a": "Multiplier par 3,6. Ex. 74,7 m/s ≈ 268,9 km/h."
  },
  {
   "q": "Le nombre dérivé est-il le taux de variation ?",
   "a": "Non : c'est la limite des taux de variation quand h tend vers 0."
  },
  {
   "q": "f′(a) = 56 pour un nombre de malades en milliers par mois : interprétation ?",
   "a": "Au bout de a mois, le nombre de malades augmente d'environ 56 000 par mois."
  },
  {
   "q": "f(a) et f′(a) : quelle différence ?",
   "a": "f(a) est une hauteur (ordonnée du point de la courbe). f′(a) est une pente (coefficient directeur de la tangente)."
  },
  {
   "q": "Dérivée de xⁿ",
   "a": "n·xⁿ⁻¹"
  },
  {
   "q": "Dérivée de √x",
   "a": "1/(2√x), définie sur ]0 ; +∞["
  },
  {
   "q": "Dérivée de 1/x",
   "a": "−1/x²"
  },
  {
   "q": "Dérivée de sin x",
   "a": "cos x"
  },
  {
   "q": "Dérivée de cos x",
   "a": "−sin x"
  },
  {
   "q": "Dérivée de eˣ",
   "a": "eˣ (l'exponentielle est sa propre dérivée)"
  },
  {
   "q": "Dérivée de ln x",
   "a": "1/x (pour x > 0)"
  },
  {
   "q": "Règle du produit (uv)'",
   "a": "u'v + uv'"
  },
  {
   "q": "Règle du quotient (u/v)'",
   "a": "(u'v − uv') / v²"
  },
  {
   "q": "Dérivée d'une composée (u∘v)'",
   "a": "v' · u'(v). Ex : (e^(2x))' = 2e^(2x)   |   (sin(3x))' = 3cos(3x)"
  },
  {
   "q": "Si f'(x) > 0 sur I",
   "a": "f est strictement CROISSANTE sur I."
  },
  {
   "q": "Si f'(x) < 0 sur I",
   "a": "f est strictement DÉCROISSANTE sur I."
  },
  {
   "q": "Équation de la tangente en x = a",
   "a": "y = f'(a)(x − a) + f(a)"
  },
  {
   "q": "Dérivée de uⁿ (composée)",
   "a": "n·u'·uⁿ⁻¹. Ex : (sin²x)' = 2sinx·cosx"
  },
  {
   "q": "Nombre dérivé f'(a) : définition",
   "a": "Limite du taux de variation (f(a+h) − f(a))/h quand h tend vers 0. C'est la pente de la tangente en a."
  },
  {
   "q": "Dérivée de x²",
   "a": "2x"
  },
  {
   "q": "Dérivée de x³",
   "a": "3x²"
  },
  {
   "q": "Dérivée d'une fonction affine ax + b",
   "a": "a (la pente)."
  },
  {
   "q": "Dérivée de (ax + b)ⁿ",
   "a": "n·a·(ax + b)ⁿ⁻¹. Ex : ((3x + 2)⁴)' = 12(3x + 2)³"
  },
  {
   "q": "Tangente horizontale en x = a : condition",
   "a": "f'(a) = 0."
  },
  {
   "q": "f'(a) = 0 suffit-il pour avoir un extremum en a ?",
   "a": "Non. Il faut aussi que f' change de signe en a. Contre-exemple : x³ en 0."
  },
  {
   "q": "Méthode pour étudier les variations de f",
   "a": "1. Ensemble de définition. 2. Calculer et factoriser f'. 3. Signe de f'. 4. Tableau de variations."
  },
  {
   "q": "(uv)' est-il égal à u'v' ?",
   "a": "Non ! (uv)' = u'v + uv'. Test : (x·x)' = 2x alors que x'·x' = 1."
  },
  {
   "q": "Dérivée de k·u (k constante)",
   "a": "k·u'"
  },
  {
   "q": "Dérivée d'une fonction de degré 3 : quelle nature ?",
   "a": "Un trinôme du second degré. On étudie donc son signe avec Δ et les racines."
  },
  {
   "q": "Taux de variation vs nombre dérivé",
   "a": "Taux de variation : entre deux points distincts a et b (pente de la sécante). Nombre dérivé : limite quand b tend vers a (pente de la tangente)."
  }
 ]
},

"Trigonométrie": {
cours:"<h3>Trigonométrie & Cercle trigonométrique</h3>\n<h3>Le radian : d'où vient cette unité ?</h3>\n<div class=\"formula-box\">Un <strong>radian</strong> (noté rad) est la mesure d'un angle qui intercepte, sur un cercle, un arc dont la longueur est <mark>égale au rayon</mark> de ce cercle. C'est l'unité d'angle du Système International.</div>\n<div class=\"formula-box\">Longueur d'un arc de cercle : $L = R \\times \\theta$ &nbsp;(avec $\\theta$ l'angle exprimé en <strong>radians</strong>, et R le rayon)</div>\n\n<div class=\"retenir-box\">Un tour complet de cercle correspond à un arc de longueur $2\\pi R$ (le périmètre du cercle) — et un tour complet vaut aussi $2\\pi$ radians. C'est cohérent : $L = R \\times 2\\pi = 2\\pi R$. ✓</div>\n<div class=\"formula-box\">Conversion : 180° = π rad<br>° → rad : multiplier par π/180<br>rad → ° : multiplier par 180/π</div>\n<h3>Valeurs remarquables</h3>\n<table class=\"formula-table\">\n<tr><th>x</th><th>0</th><th>π/6</th><th>π/4</th><th>π/3</th><th>π/2</th></tr>\n<tr><td>sin x</td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr>\n<tr><td>cos x</td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr>\n<tr><td>tan x</td><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>—</td></tr>\n</table>\n<div class=\"retenir-box\">Moyen mnémotechnique : sin(0),sin(π/6),sin(π/4),sin(π/3),sin(π/2) = √0/2, √1/2, √2/2, √3/2, √4/2 (simplifiés). Et cos = sin lu à l'envers (de droite à gauche) !</div>\n<h3>Identités fondamentales</h3>\n<div class=\"formula-box\">cos²x + sin²x = 1 &nbsp;[Pythagore]<br>tan x = sin x / cos x<br>cos(−x) = cos x &nbsp;[<mark>PAIRE</mark>]<br>sin(−x) = −sin x &nbsp;[<mark>IMPAIRE</mark>]<br>cos(π−x) = −cos x<br>sin(π−x) = sin x<br>cos(π+x) = −cos x<br>sin(π+x) = −sin x</div>\n<h3>Formules de duplication</h3>\n<div class=\"formula-box\">cos(2x) = cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x<br>sin(2x) = 2 sin x cos x</div>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Un cercle a un rayon de 2 km. Calcule la longueur de l'arc intercepté par un angle de $\\frac{\\pi}{4}$ radian.</p>",
 aide:"Utilise directement la formule L = R × θ, avec θ déjà en radians.",
 correction:"<p>$L = R \\times \\theta = 2 \\times \\frac{\\pi}{4} = \\frac{\\pi}{2} \\approx 1{,}57$ km.</p>"},
{niveau:"Facile",
 enonce:"<p>Sachant que $\\cos(x) = \\frac{3}{5}$ et que $x \\in [0;\\frac{\\pi}{2}]$, calcule $\\sin(x)$.</p>",
 aide:"Utilise l'identité de Pythagore cos²x + sin²x = 1. Attention au signe de sin(x) sur cet intervalle.",
 correction:"<p>$$\\begin{aligned} \\cos^2(x) + \\sin^2(x) &= 1 \\Rightarrow \\sin^2(x) = 1 - \\frac{9}{25} \\\\ &= \\frac{16}{25} \\end{aligned}$$</p><p>$\\sin(x) = \\pm\\frac{4}{5}$. Comme $x \\in [0;\\frac{\\pi}{2}]$, sin(x) est positif : $\\sin(x) = \\frac{4}{5}$</p>"},
{niveau:"Facile",
 enonce:"<p>Convertis en radians : $120°$, $150°$ et $45°$. Convertis en degrés : $\\frac{3\\pi}{4}$ et $\\frac{\\pi}{6}$.</p>",
 aide:"° → rad : multiplier par π/180. rad → ° : multiplier par 180/π.",
 correction:"<p>$120° = 120 \\times \\frac{\\pi}{180} = \\frac{2\\pi}{3}$ ; $150° = \\frac{5\\pi}{6}$ ; $45° = \\frac{\\pi}{4}$.</p><p>$\\frac{3\\pi}{4} = \\frac{3 \\times 180}{4} = 135°$ ; $\\frac{\\pi}{6} = 30°$.</p>"},
{niveau:"Facile",
 enonce:"<p>Donne la valeur exacte de $\\cos\\left(\\frac{\\pi}{3}\\right)$, $\\sin\\left(\\frac{\\pi}{6}\\right)$ et $\\tan\\left(\\frac{\\pi}{4}\\right)$, puis de $\\cos\\left(-\\frac{\\pi}{4}\\right)$ et $\\sin\\left(-\\frac{\\pi}{6}\\right)$.</p>",
 aide:"Utilise le tableau des valeurs remarquables. Pour les angles négatifs, rappelle-toi que cos est paire et sin est impaire.",
 correction:"<p>$\\cos\\left(\\frac{\\pi}{3}\\right) = \\frac{1}{2}$ ; $\\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2}$ ; $\\tan\\left(\\frac{\\pi}{4}\\right) = 1$.</p><p>cos est paire : $\\cos\\left(-\\frac{\\pi}{4}\\right) = \\cos\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}$.</p><p>sin est impaire : $\\sin\\left(-\\frac{\\pi}{6}\\right) = -\\sin\\left(\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$.</p>"},
{niveau:"Facile",
 enonce:"<p>Une roue de rayon 5 cm tourne d'un angle de $60°$. Calcule la longueur de l'arc parcouru par un point du bord (valeur exacte, puis arrondie au mm).</p>",
 aide:"La formule L = R × θ demande un angle en radians : convertis d'abord 60°.",
 correction:"<p>$60° = \\frac{\\pi}{3}$ rad.</p><p>$L = R \\times \\theta = 5 \\times \\frac{\\pi}{3} = \\frac{5\\pi}{3} \\approx 5{,}24$ cm, soit environ 52 mm.</p>"},
{niveau:"Moyen",
 enonce:"<p>Résous dans $[0;2\\pi[$ l'équation $\\cos(x) = \\frac{1}{2}$.</p>",
 aide:"Quelle valeur remarquable de x donne cos(x)=1/2 ? N'oublie pas que le cosinus est une fonction paire — pense au cercle trigonométrique et aux 2 solutions possibles sur cet intervalle.",
 correction:"<p>On sait que $\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$.</p><p>Comme cos est paire, $\\cos(-\\frac{\\pi}{3}) = \\frac{1}{2}$ aussi, soit $\\cos(2\\pi - \\frac{\\pi}{3}) = \\cos(\\frac{5\\pi}{3})$ sur $[0;2\\pi[$.</p><p>Solutions : $x = \\frac{\\pi}{3}$ ou $x = \\frac{5\\pi}{3}$</p>"},
{niveau:"Moyen",
 enonce:"<p>Sachant que $\\sin(x) = \\frac{4}{5}$ et que $x \\in \\left[\\frac{\\pi}{2};\\pi\\right]$, calcule $\\cos(x)$ puis $\\tan(x)$.</p>",
 aide:"Utilise cos²x + sin²x = 1. Attention au signe : entre π/2 et π, le cosinus est négatif.",
 correction:"<p>$\\cos^2(x) = 1 - \\sin^2(x) = 1 - \\frac{16}{25} = \\frac{9}{25}$, donc $\\cos(x) = \\pm\\frac{3}{5}$.</p><p>Sur $\\left[\\frac{\\pi}{2};\\pi\\right]$, cos(x) est négatif : $\\cos(x) = -\\frac{3}{5}$.</p><p>$\\tan(x) = \\frac{\\sin(x)}{\\cos(x)} = \\frac{4/5}{-3/5} = -\\frac{4}{3}$.</p>"},
{niveau:"Moyen",
 enonce:"<p>À l'aide des formules avec $\\pi - x$ et $\\pi + x$, donne les valeurs exactes de $\\cos\\left(\\frac{2\\pi}{3}\\right)$, $\\sin\\left(\\frac{5\\pi}{6}\\right)$, $\\cos\\left(\\frac{4\\pi}{3}\\right)$ et $\\sin\\left(\\frac{7\\pi}{6}\\right)$.</p>",
 aide:"Écris chaque angle sous la forme π − a ou π + a, avec a une valeur remarquable (π/6, π/4, π/3).",
 correction:"<p>$\\frac{2\\pi}{3} = \\pi - \\frac{\\pi}{3}$ donc $\\cos\\left(\\frac{2\\pi}{3}\\right) = -\\cos\\left(\\frac{\\pi}{3}\\right) = -\\frac{1}{2}$.</p><p>$\\frac{5\\pi}{6} = \\pi - \\frac{\\pi}{6}$ donc $\\sin\\left(\\frac{5\\pi}{6}\\right) = \\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2}$.</p><p>$\\frac{4\\pi}{3} = \\pi + \\frac{\\pi}{3}$ donc $\\cos\\left(\\frac{4\\pi}{3}\\right) = -\\cos\\left(\\frac{\\pi}{3}\\right) = -\\frac{1}{2}$.</p><p>$\\frac{7\\pi}{6} = \\pi + \\frac{\\pi}{6}$ donc $\\sin\\left(\\frac{7\\pi}{6}\\right) = -\\sin\\left(\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Résous dans $[0;2\\pi[$ : a) $\\sin(x) = \\frac{\\sqrt{2}}{2}$ ; b) $\\cos(x) = -\\frac{\\sqrt{3}}{2}$.</p>",
 aide:"Repère d'abord la valeur remarquable, puis utilise sin(π − x) = sin x pour le a), et cos(π − x) = −cos x et cos(π + x) = −cos x pour le b).",
 correction:"<p>a) $\\sin\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}$ et $\\sin\\left(\\pi - \\frac{\\pi}{4}\\right) = \\sin\\left(\\frac{3\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}$.</p><p>$S = \\left\\{\\frac{\\pi}{4};\\frac{3\\pi}{4}\\right\\}$</p><p>b) $\\cos\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}$, donc $\\cos\\left(\\pi - \\frac{\\pi}{6}\\right) = \\cos\\left(\\frac{5\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}$ et $\\cos\\left(\\pi + \\frac{\\pi}{6}\\right) = \\cos\\left(\\frac{7\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}$.</p><p>$S = \\left\\{\\frac{5\\pi}{6};\\frac{7\\pi}{6}\\right\\}$</p>"},
{niveau:"Moyen",
 enonce:"<p>Une roue de vélo de rayon 35 cm fait 3 tours complets. Quelle distance le vélo a-t-il parcourue (valeur exacte en mètres, puis arrondie au centième) ?</p>",
 aide:"3 tours correspondent à 3 × 2π radians. Attention aux unités : passe le rayon en mètres avant d'appliquer L = R × θ.",
 correction:"<p>$\\theta = 3 \\times 2\\pi = 6\\pi$ rad et $R = 0{,}35$ m.</p><p>$L = R \\times \\theta = 0{,}35 \\times 6\\pi = 2{,}1\\pi \\approx 6{,}60$ m.</p>"},
{niveau:"Moyen",
 enonce:"<p>Sachant que $\\cos(x) = \\frac{3}{5}$ et que $x \\in \\left[0;\\frac{\\pi}{2}\\right]$, calcule $\\sin(2x)$ et $\\cos(2x)$.</p>",
 aide:"Commence par trouver sin(x) avec Pythagore, puis utilise sin(2x) = 2 sin x cos x et cos(2x) = 2cos²x − 1.",
 correction:"<p>$\\sin^2(x) = 1 - \\frac{9}{25} = \\frac{16}{25}$ et $x \\in \\left[0;\\frac{\\pi}{2}\\right]$, donc $\\sin(x) = \\frac{4}{5}$.</p><p>$\\sin(2x) = 2 \\times \\frac{4}{5} \\times \\frac{3}{5} = \\frac{24}{25}$.</p><p>$\\cos(2x) = 2\\cos^2(x) - 1 = 2 \\times \\frac{9}{25} - 1 = -\\frac{7}{25}$.</p><p>Vérification : $\\cos^2(2x) + \\sin^2(2x) = \\frac{49}{625} + \\frac{576}{625} = 1$ ✓</p>"},
{niveau:"Difficile",
 enonce:"<p>Un accélérateur de particules circulaire a un rayon d'1 km. Un proton part d'un point I et parcourt quatre tiers de tour. Calcule la distance exacte parcourue par ce proton (laisse le résultat en fonction de π).</p>",
 aide:"Un tour complet correspond à un angle de 2π radians. Quatre tiers de tour correspondent donc à quel angle en radians ? Applique ensuite L = R × θ.",
 correction:"<p>Un tour complet = $2\\pi$ rad. Quatre tiers de tour : $\\theta = \\frac{4}{3} \\times 2\\pi = \\frac{8\\pi}{3}$ rad.</p><p>$L = R \\times \\theta = 1 \\times \\frac{8\\pi}{3} = \\frac{8\\pi}{3} \\approx 8{,}38$ km.</p>"},
{niveau:"Difficile",
 enonce:"<p>Démontre que $\\cos(2x) = 1 - 2\\sin^2(x)$ à partir de la formule $\\cos(2x) = \\cos^2(x) - \\sin^2(x)$ et de l'identité de Pythagore.</p>",
 aide:"Remplace cos²(x) dans la formule de départ en utilisant la relation cos²x + sin²x = 1 (donc cos²x = 1 - sin²x).",
 correction:"<p>On part de $\\cos(2x) = \\cos^2(x) - \\sin^2(x)$.</p><p>Or, d'après Pythagore : $\\cos^2(x) = 1 - \\sin^2(x)$.</p><p>En remplaçant : $$\\begin{aligned} \\cos(2x) &= (1-\\sin^2(x)) - \\sin^2(x) \\\\ &= 1 - 2\\sin^2(x) \\end{aligned}$$ ✓</p><p>C'est exactement la formule recherchée — l'astuce clé est de toujours pouvoir remplacer cos² par 1−sin² (ou l'inverse) grâce à Pythagore.</p>"},
{niveau:"Difficile",
 enonce:"<p>Résous dans $[0;2\\pi[$ l'équation $\\sin(x) = -\\frac{1}{2}$.</p>",
 aide:"Tu sais que sin(π/6) = 1/2. Pour la première solution, utilise sin(π + x) = −sin x. Pour la seconde, utilise la parité de sin puis ajoute 2π pour revenir dans [0 ; 2π[.",
 correction:"<p>$\\sin\\left(\\pi + \\frac{\\pi}{6}\\right) = -\\sin\\left(\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$, donc $x = \\frac{7\\pi}{6}$ est solution.</p><p>sin est impaire : $\\sin\\left(-\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$. Mais $-\\frac{\\pi}{6} \\notin [0;2\\pi[$ : on ajoute $2\\pi$, ce qui donne $x = 2\\pi - \\frac{\\pi}{6} = \\frac{11\\pi}{6}$.</p><p>$S = \\left\\{\\frac{7\\pi}{6};\\frac{11\\pi}{6}\\right\\}$</p>"},
{niveau:"Difficile",
 enonce:"<p>Résous dans $[0;2\\pi[$ l'équation $2\\cos^2(x) - 1 = 0$.</p>",
 aide:"Isole cos²x : cos²x = 1/2, donc cos x = √2/2 ou cos x = −√2/2. Résous ensuite chacune des deux équations.",
 correction:"<p>$2\\cos^2(x) - 1 = 0 \\iff \\cos^2(x) = \\frac{1}{2} \\iff \\cos(x) = \\frac{\\sqrt{2}}{2}$ ou $\\cos(x) = -\\frac{\\sqrt{2}}{2}$.</p><p>$\\cos(x) = \\frac{\\sqrt{2}}{2}$ : $x = \\frac{\\pi}{4}$ ou $x = 2\\pi - \\frac{\\pi}{4} = \\frac{7\\pi}{4}$ (parité de cos).</p><p>$\\cos(x) = -\\frac{\\sqrt{2}}{2}$ : $x = \\pi - \\frac{\\pi}{4} = \\frac{3\\pi}{4}$ ou $x = \\pi + \\frac{\\pi}{4} = \\frac{5\\pi}{4}$.</p><p>$S = \\left\\{\\frac{\\pi}{4};\\frac{3\\pi}{4};\\frac{5\\pi}{4};\\frac{7\\pi}{4}\\right\\}$</p>"},
{niveau:"Difficile",
 enonce:"<p>Démontre que pour tout réel $x$ : $(\\cos(x) + \\sin(x))^2 = 1 + \\sin(2x)$.</p>",
 aide:"Développe le carré avec (a + b)² = a² + 2ab + b², puis utilise cos²x + sin²x = 1 et sin(2x) = 2 sin x cos x.",
 correction:"<p>$(\\cos(x) + \\sin(x))^2 = \\cos^2(x) + 2\\sin(x)\\cos(x) + \\sin^2(x)$.</p><p>Or $\\cos^2(x) + \\sin^2(x) = 1$ et $2\\sin(x)\\cos(x) = \\sin(2x)$.</p><p>Donc $(\\cos(x) + \\sin(x))^2 = 1 + \\sin(2x)$ ✓</p>"},
{niveau:"Difficile",
 enonce:"<p>Calcule la valeur exacte de $\\cos\\left(\\frac{\\pi}{12}\\right)$ en utilisant la formule $\\cos(2x) = 2\\cos^2(x) - 1$ avec $x = \\frac{\\pi}{12}$.</p>",
 aide:"Ici 2x = π/6, dont tu connais le cosinus. Résous l'équation obtenue pour cos²(π/12), puis choisis le bon signe (π/12 est entre 0 et π/2).",
 correction:"<p>Avec $x = \\frac{\\pi}{12}$ : $\\cos\\left(\\frac{\\pi}{6}\\right) = 2\\cos^2\\left(\\frac{\\pi}{12}\\right) - 1$, soit $\\frac{\\sqrt{3}}{2} = 2\\cos^2\\left(\\frac{\\pi}{12}\\right) - 1$.</p><p>$\\cos^2\\left(\\frac{\\pi}{12}\\right) = \\frac{1 + \\frac{\\sqrt{3}}{2}}{2} = \\frac{2 + \\sqrt{3}}{4}$.</p><p>Comme $\\frac{\\pi}{12} \\in \\left[0;\\frac{\\pi}{2}\\right]$, le cosinus est positif : $\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{\\sqrt{2 + \\sqrt{3}}}{2} \\approx 0{,}966$.</p>"}
],
flashcards:[
{q:"sin(0)",a:"0"},
{q:"sin(π/6)",a:"1/2"},
{q:"sin(π/4)",a:"√2/2"},
{q:"sin(π/3)",a:"√3/2"},
{q:"sin(π/2)",a:"1"},
{q:"cos(0)",a:"1"},
{q:"cos(π/6)",a:"√3/2"},
{q:"cos(π/4)",a:"√2/2"},
{q:"cos(π/3)",a:"1/2"},
{q:"cos(π/2)",a:"0"},
{q:"tan(π/4)",a:"1"},
{q:"tan(π/3)",a:"√3"},
{q:"tan(π/6)",a:"√3/3 = 1/√3"},
{q:"cos²x + sin²x = ?",a:"1 (identité de Pythagore)"},
{q:"cos(2x) — trois formes",a:"cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x"},
{q:"sin(2x)",a:"2 sin x cos x"},
{q:"cos est-elle paire ou impaire ?",a:"PAIRE : cos(−x) = cos(x)"},
{q:"sin est-elle paire ou impaire ?",a:"IMPAIRE : sin(−x) = −sin(x)"},
{q:"cos(π − x)",a:"−cos(x)"},
{q:"sin(π − x)",a:"sin(x)"},
{q:"180° en radians",a:"π"},
{q:"90° en radians",a:"π/2"},
{q:"60° en radians",a:"π/3"},
{q:"45° en radians",a:"π/4"},
{q:"30° en radians",a:"π/6"},
{q:"Définition géométrique du radian",a:"Mesure d'un angle qui intercepte, sur un cercle, un arc dont la longueur est égale au rayon de ce cercle."},
{q:"Formule de longueur d'un arc de cercle",a:"L = R × θ, avec θ obligatoirement exprimé en radians et R le rayon."},
{q:"tan x en fonction de sin et cos",a:"tan x = sin x / cos x (défini si cos x ≠ 0)"},
{q:"cos(π) et sin(π)",a:"cos(π) = −1 et sin(π) = 0"},
{q:"cos(π + x) et sin(π + x)",a:"cos(π + x) = −cos(x) et sin(π + x) = −sin(x)"},
{q:"cos(2π/3)",a:"−1/2 (car 2π/3 = π − π/3)"},
{q:"sin(5π/6)",a:"1/2 (car 5π/6 = π − π/6)"},
{q:"Conversion degrés → radians",a:"Multiplier par π/180 (ex : 60° = π/3)"},
{q:"Conversion radians → degrés",a:"Multiplier par 180/π (ex : 3π/4 = 135°)"},
{q:"Méthode : résoudre sin(x) = a ou cos(x) = a dans [0 ; 2π[",a:"1) Repérer la valeur remarquable. 2) Utiliser les symétries : sin(π − x) = sin x ; cos(−x) = cos x ; cos(π − x) = −cos x ; sin(π + x) = −sin x. 3) Garder les solutions dans [0 ; 2π[ (ajouter 2π si besoin)."}
]},

"Suites numériques": {
cours:"<div class=\"attention-box\">Une suite, c'est une <strong>liste de nombres rangés dans l'ordre</strong>. Elle sert à modéliser tout ce qui évolue « pas à pas » : un capital qui rapporte des intérêts, une population, un salaire, une dette qu'on rembourse. Deux familles à maîtriser parfaitement : les suites <strong>arithmétiques</strong> (on ajoute toujours la même chose) et <strong>géométriques</strong> (on multiplie toujours par la même chose).</div>\n\n<h3>1. Notations et deux façons de définir une suite</h3>\n<p>$u_n$ est le terme de <strong>rang</strong> $n$ ; $u_{n+1}$ est le terme <em>suivant</em>. Attention : $u_{n+1}$ n'est <strong>pas</strong> $u_n + 1$ (c'est un autre terme, pas « le même plus 1 »).</p>\n<ul>\n<li><strong>Forme explicite</strong> : $u_n = f(n)$. On calcule n'importe quel terme directement. Ex : $u_n = 2n^2 - 1$ donne $u_0 = -1$ et $u_3 = 2\\times 9 - 1 = 17$.</li>\n<li><strong>Par récurrence</strong> : on donne le premier terme et une règle pour passer au suivant. Ex : $u_0 = 3$ et $u_{n+1} = 2u_n - 1$ donne $u_1 = 5$, $u_2 = 9$, $u_3 = 17$ (on calcule de proche en proche).</li>\n</ul>\n\n<h3>2. Suite arithmétique (on ajoute $r$)</h3>\n<div class=\"formula-box\">$u_{n+1} = u_n + r$ &nbsp;&nbsp; $u_n = u_0 + n\\,r$ &nbsp;&nbsp; plus généralement $u_n = u_p + (n - p)\\,r$</div>\n<p><strong>Exemple.</strong> $u_0 = 4$ et $r = -3$ : $u_5 = 4 - 15 = -11$.</p>\n<p><strong>Dans l'autre sens.</strong> Si $u_3 = 11$ et $u_7 = 23$ : de $u_3$ à $u_7$ il y a $4$ « pas », donc $r = \\dfrac{23 - 11}{4} = 3$, puis $u_0 = u_3 - 3r = 11 - 9 = 2$.</p>\n<div class=\"formula-box\">Somme de termes consécutifs : $S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$</div>\n<p>Exemple célèbre : $1 + 2 + \\dots + 100 = 100\\times\\dfrac{1 + 100}{2} = 5050$.</p>\n<div class=\"attention-box\"><strong>Compter les termes :</strong> de $u_p$ à $u_n$, il y a <mark>$n - p + 1$</mark> termes (pas $n - p$). Ex : de $u_3$ à $u_{10}$ : $10 - 3 + 1 = 8$ termes.</div>\n\n<h3>3. Suite géométrique (on multiplie par $q$)</h3>\n<div class=\"formula-box\">$u_{n+1} = q\\,u_n$ &nbsp;&nbsp; $u_n = u_0\\,q^n$ &nbsp;&nbsp; plus généralement $u_n = u_p\\,q^{\\,n-p}$</div>\n<div class=\"retenir-box\"><strong>Pourcentages et coefficient multiplicateur.</strong> Augmenter de $t\\,\\%$ revient à multiplier par $q = 1 + \\dfrac{t}{100}$. Diminuer de $t\\,\\%$ revient à multiplier par $q = 1 - \\dfrac{t}{100}$. Si une grandeur varie de $t\\,\\%$ chaque année, elle suit une suite <strong>géométrique</strong>.</div>\n<p><strong>Exemple.</strong> On place $1000$ € à $5\\,\\%$ par an : $u_n = 1000\\times 1{,}05^n$, donc $u_{10} = 1000\\times 1{,}05^{10} \\approx 1\\,628{,}89$ €.</p>\n<div class=\"formula-box\">Somme (si $q \\neq 1$) : $S = (\\text{premier terme}) \\times \\dfrac{1 - q^{\\,\\text{nombre de termes}}}{1 - q}$</div>\n<p>Exemple : $1 + 2 + 4 + \\dots + 2^9$ ($10$ termes, $q = 2$) $= 1\\times\\dfrac{1 - 2^{10}}{1 - 2} = 1023$.</p>\n\n<h3>4. Reconnaître le type d'une suite</h3>\n<ul>\n<li>$u_{n+1} - u_n$ est <strong>constant</strong> → arithmétique (la constante est $r$).</li>\n<li>$\\dfrac{u_{n+1}}{u_n}$ est <strong>constant</strong> → géométrique (la constante est $q$).</li>\n</ul>\n<p>Ex : $u_n = 3n + 2$ → $u_{n+1} - u_n = 3(n+1) + 2 - 3n - 2 = 3$ : arithmétique de raison $3$. $v_n = 5\\times 2^n$ : géométrique de raison $2$. $w_n = n^2$ : ni l'une ni l'autre ($w_1 - w_0 = 1$ mais $w_2 - w_1 = 3$).</p>\n\n<h3>5. Sens de variation</h3>\n<p>Une suite est <strong>croissante</strong> si $u_{n+1} - u_n \\geq 0$ pour tout $n$, <strong>décroissante</strong> si $u_{n+1} - u_n \\leq 0$. La méthode universelle : <mark>calculer $u_{n+1} - u_n$ et étudier son signe</mark>.</p>\n<p><strong>Exemple.</strong> $u_n = n^2 - 4n$ : $$\\begin{aligned} u_{n+1} - u_n &= (n+1)^2 - 4(n+1) - n^2 + 4n \\\\ &= 2n - 3 \\,. \\end{aligned}$$ C'est négatif pour $n \\leq 1$ et positif pour $n \\geq 2$. Vérification : $u_0 = 0$, $u_1 = -3$, $u_2 = -4$, $u_3 = -3$, $u_4 = 0$ ✓ : la suite descend jusqu'à $u_2$ puis monte.</p>\n<ul>\n<li>Arithmétique : croissante si $r > 0$, décroissante si $r < 0$.</li>\n<li>Géométrique avec $u_0 > 0$ : croissante si $q > 1$ ; décroissante si $0 < q < 1$ (et alors les termes se rapprochent de $0$).</li>\n</ul>\n\n<h3>6. Raisonnement par récurrence</h3>\n<ol>\n<li><strong>Initialisation</strong> : vérifier que $P(0)$ est vraie.</li>\n<li><strong>Hérédité</strong> : on <em>suppose</em> $P(n)$ vraie pour un $n$ quelconque, et on démontre que $P(n+1)$ est vraie.</li>\n<li><strong>Conclusion</strong> : $P(n)$ est vraie pour tout $n \\in \\mathbb{N}$.</li>\n</ol>\n<p><strong>Exemple.</strong> $u_0 = 0$ et $u_{n+1} = u_n + 2n + 1$. Montrons que $u_n = n^2$. <em>Initialisation</em> : $u_0 = 0 = 0^2$ ✓. <em>Hérédité</em> : si $u_n = n^2$, alors $u_{n+1} = n^2 + 2n + 1 = (n+1)^2$ ✓. <em>Conclusion</em> : $u_n = n^2$ pour tout $n$.</p>\n\n<h3>7. L'astuce du « suite auxiliaire »</h3>\n<p>Une suite comme $u_{n+1} = 0{,}5\\,u_n + 3$ n'est ni arithmétique ni géométrique. Mais l'énoncé propose souvent : « on pose $v_n = u_n - 6$ ». On montre alors que $(v_n)$ est géométrique : $$\\begin{aligned} v_{n+1} &= u_{n+1} - 6 = 0{,}5\\,u_n + 3 - 6 \\\\ &= 0{,}5\\,u_n - 3 = 0{,}5\\,(u_n - 6) = 0{,}5\\,v_n \\,. \\end{aligned}$$ On connaît donc $v_n$, puis $u_n = v_n + 6$. Ce type de question tombe très souvent.</p>\n\n<h3>8. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Écrire $u_{n+1} = u_n + 1$ pour « le terme suivant ».<br>\n❌ Se tromper dans le nombre de termes d'une somme ($n - p + 1$).<br>\n❌ Confondre $r$ (on <em>ajoute</em>) et $q$ (on <em>multiplie</em>) : $u_n = u_0 + nr$ mais $u_n = u_0\\,q^n$.<br>\n❌ Prendre $q = 0{,}05$ pour une hausse de $5\\,\\%$ : c'est $q = 1{,}05$.<br>\n❌ Utiliser l'hypothèse de récurrence sans l'avoir écrite, ou démontrer directement $P(n+1)$ sans s'en servir.\n</div>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Une suite arithmétique a pour premier terme $u_0 = 5$ et pour raison $r = 3$. Calcule $u_1$, $u_2$ et $u_{10}$.</p>",
 aide:"Utilise uₙ₊₁ = uₙ + r pour les premiers termes, puis la formule directe uₙ = u₀ + n·r pour u₁₀.",
 correction:"<p>$u_1 = u_0 + r = 5 + 3 = 8$</p><p>$u_2 = u_1 + r = 8 + 3 = 11$</p><p>$u_{10} = u_0 + 10r = 5 + 30 = 35$</p>"},
{niveau:"Moyen",
 enonce:"<p>Une suite géométrique a pour premier terme $u_0 = 2$ et pour raison $q = 3$. À partir de quel rang $n$ a-t-on $u_n > 1000$ ?</p>",
 aide:"Calcule uₙ = u₀ × qⁿ pour plusieurs valeurs de n jusqu'à dépasser 1000 (pas besoin de logarithme au programme de première).",
 correction:"<p>$u_n = 2 \\times 3^n$</p><p>$u_5 = 2 \\times 243 = 486$ (pas assez)</p><p>$u_6 = 2 \\times 729 = 1458$ (> 1000 ✓)</p><p>C'est donc à partir du <strong>rang n = 6</strong> que $u_n > 1000$.</p>"},
{niveau:"Difficile",
 enonce:"<p>Démontre par récurrence que pour tout $n \\in \\mathbb{N}$, $u_n = 2^n - 1$ où $u_0=0$ et $u_{n+1} = 2u_n + 1$.</p>",
 aide:"Initialisation : vérifie pour n=0. Hérédité : suppose uₙ=2ⁿ-1 vrai, puis calcule u_(n+1) en utilisant la relation de récurrence et l'hypothèse, pour retrouver 2^(n+1)-1.",
 correction:"<p><strong>Initialisation</strong> : $u_0 = 0$ et $2^0 - 1 = 1 - 1 = 0$ ✓, la propriété est vraie au rang 0.</p><p><strong>Hérédité</strong> : supposons que $u_n = 2^n - 1$ (hypothèse de récurrence). Montrons que $u_{n+1} = 2^{n+1}-1$.</p><p>$$\\begin{aligned} u_{n+1} &= 2u_n + 1 = 2(2^n-1) + 1 \\\\ &= 2^{n+1} - 2 + 1 = 2^{n+1} - 1 \\end{aligned}$$ ✓</p><p><strong>Conclusion</strong> : la propriété est vraie au rang 0 et héréditaire, donc par récurrence, $u_n = 2^n-1$ pour tout $n \\in \\mathbb{N}$.</p>"},
{niveau:"Facile",
 enonce:"<p>Soit la suite définie par $u_n = 2n^2 - 1$. Calcule $u_0$, $u_1$ et $u_4$.</p>",
 aide:"Remplace n par la valeur demandée. Attention aux priorités : le carré se calcule avant la multiplication par 2.",
 correction:"<p>$u_0 = 2\\times 0 - 1 = -1$.</p><p>$u_1 = 2\\times 1 - 1 = 1$.</p><p>$u_4 = 2\\times 16 - 1 = 31$.</p>"},
{niveau:"Moyen",
 enonce:"<p>$(u_n)$ est une suite arithmétique telle que $u_3 = 11$ et $u_7 = 23$. Détermine sa raison $r$, son premier terme $u_0$, puis calcule $u_{10}$.</p>",
 aide:"De u₃ à u₇ il y a 4 pas : u₇ = u₃ + 4r. Une fois r trouvée, remonte jusqu'à u₀ avec u₃ = u₀ + 3r.",
 correction:"<p>$u_7 = u_3 + 4r$, donc $23 = 11 + 4r$ et $r = 3$.</p><p>$u_3 = u_0 + 3r$ donc $u_0 = 11 - 9 = 2$.</p><p>$u_{10} = u_0 + 10r = 2 + 30 = 32$. Vérification avec $u_7 = 2 + 21 = 23$ ✓.</p>"},
{niveau:"Moyen",
 enonce:"<p>Calcule $S = 5 + 8 + 11 + \\dots + 101$.</p>",
 aide:"Vérifie que c'est une suite arithmétique (raison 3), compte le nombre de termes avec 5 + 3k = 101, puis utilise nombre de termes × (premier + dernier)/2.",
 correction:"<p>La raison est $3$. Le dernier terme vaut $101 = 5 + 3k$, donc $k = 32$ : il y a $32 + 1 = 33$ termes.</p><p>$S = 33\\times\\dfrac{5 + 101}{2} = 33\\times 53 = 1\\,749$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Une ville compte $20\\,000$ habitants et sa population baisse de $4\\,\\%$ par an. On note $u_n$ la population après $n$ années.</p><p>1) Quelle est la nature de $(u_n)$ ? Exprime $u_n$ en fonction de $n$.<br>2) Quelle sera la population dans 5 ans (arrondie à l'unité) ?<br>3) Au bout de combien d'années la population passera-t-elle sous $15\\,000$ habitants ?</p>",
 aide:"Une baisse de 4 % se traduit par un coefficient multiplicateur de 0,96. Pour la question 3, teste des valeurs de n à la calculatrice.",
 correction:"<p>1) Chaque année, on multiplie par $0{,}96$ : $(u_n)$ est <strong>géométrique</strong> de raison $q = 0{,}96$ et de premier terme $u_0 = 20\\,000$. Donc $u_n = 20\\,000\\times 0{,}96^n$.</p><p>2) $u_5 = 20\\,000\\times 0{,}96^5 \\approx 16\\,307$ habitants.</p><p>3) $u_7 \\approx 15\\,029$ (encore au-dessus) et $u_8 \\approx 14\\,428$ (en dessous). La population passera sous $15\\,000$ habitants <strong>au bout de 8 ans</strong>. La suite est décroissante, donc elle ne remontera pas.</p>"},
{niveau:"Moyen",
 enonce:"<p>Étudie le sens de variation de la suite $u_n = n^2 - 6n$. Quel est son plus petit terme ?</p>",
 aide:"Calcule u_{n+1} − u_n en développant (n+1)², puis étudie son signe selon la valeur de n.",
 correction:"<p>$$\\begin{aligned} u_{n+1} - u_n &= (n+1)^2 - 6(n+1) - n^2 + 6n \\\\ &= n^2 + 2n + 1 - 6n - 6 - n^2 + 6n = 2n - 5 \\,. \\end{aligned}$$</p><p>$2n - 5 < 0$ pour $n \\leq 2$ et $2n - 5 > 0$ pour $n \\geq 3$. La suite est donc <strong>décroissante jusqu'à $u_3$</strong>, puis <strong>croissante</strong> à partir du rang $3$.</p><p>Valeurs : $0,\\ -5,\\ -8,\\ -9,\\ -8,\\ -5,\\ 0\\dots$ Le plus petit terme est $u_3 = -9$.</p>"},
{niveau:"Difficile",
 enonce:"<p>Tu mets de l'argent de côté : $100$ € le 1<sup>er</sup> mois, puis tu augmentes ton versement de $10$ € chaque mois. On note $v_n$ le versement du mois numéro $n$ (avec $v_1 = 100$).</p><p>1) Exprime $v_n$ en fonction de $n$.<br>2) Quelle somme totale auras-tu versée au bout de 12 mois ?<br>3) À partir de quel mois le versement dépasse-t-il $250$ € ?</p>",
 aide:"C'est une suite arithmétique dont le premier terme est v₁. La formule est v_n = v₁ + (n − 1)r. Pour la somme : nombre de termes × (premier + dernier)/2.",
 correction:"<p>1) Suite arithmétique de raison $10$ : $v_n = 100 + 10(n-1)$.</p><p>2) $v_{12} = 100 + 110 = 210$. Total : $S = 12\\times\\dfrac{100 + 210}{2} = 12\\times 155 = 1\\,860$ €.</p><p>3) $100 + 10(n-1) > 250 \\Leftrightarrow n - 1 > 15 \\Leftrightarrow n > 16$, donc à partir du <strong>17<sup>e</sup> mois</strong> ($v_{17} = 260$ ; $v_{16} = 250$ n'est pas strictement supérieur).</p>"},
{niveau:"Difficile",
 enonce:"<p>Soit $(u_n)$ définie par $u_0 = 10$ et $u_{n+1} = 0{,}5\\,u_n + 3$. On pose $v_n = u_n - 6$.</p><p>1) Montre que $(v_n)$ est géométrique et donne sa raison et son premier terme.<br>2) Exprime $v_n$ puis $u_n$ en fonction de $n$.<br>3) Vérifie ta formule pour $u_1$ et $u_2$.</p>",
 aide:"Écris v_{n+1} = u_{n+1} − 6, remplace u_{n+1} par son expression, et fais apparaître (u_n − 6) en facteur.",
 correction:"<p>1) $$\\begin{aligned} v_{n+1} &= u_{n+1} - 6 = 0{,}5\\,u_n + 3 - 6 \\\\ &= 0{,}5\\,u_n - 3 = 0{,}5\\,(u_n - 6) = 0{,}5\\,v_n \\,. \\end{aligned}$$ Donc $(v_n)$ est <strong>géométrique de raison $0{,}5$</strong>, de premier terme $v_0 = u_0 - 6 = 4$.</p><p>2) $v_n = 4\\times 0{,}5^n$, donc $u_n = v_n + 6 = 6 + 4\\times 0{,}5^n$.</p><p>3) $u_1 = 6 + 4\\times 0{,}5 = 8$ et directement $0{,}5\\times 10 + 3 = 8$ ✓. $u_2 = 6 + 4\\times 0{,}25 = 7$ et directement $0{,}5\\times 8 + 3 = 7$ ✓.</p><p>Remarque : comme $0{,}5^n$ tend vers $0$, les termes se rapprochent de $6$.</p>"}
],
flashcards:[
{q:"Suite arithmétique — définition",a:"uₙ₊₁ = uₙ + r, où r est la raison (constante)."},
{q:"Terme général — arithmétique",a:"uₙ = u₀ + n·r"},
{q:"Raison — arithmétique",a:"r = uₙ₊₁ − uₙ"},
{q:"Somme — arithmétique (n+1 termes)",a:"S = (u₀ + uₙ)·(n+1)/2 = (premier + dernier) × nb de termes / 2"},
{q:"Suite géométrique — définition",a:"uₙ₊₁ = q·uₙ, où q est la raison (constante, q ≠ 0)."},
{q:"Terme général — géométrique",a:"uₙ = u₀·qⁿ"},
{q:"Raison — géométrique",a:"q = uₙ₊₁ / uₙ"},
{q:"Somme — géométrique (q ≠ 1)",a:"S = u₀·(1 − qⁿ⁺¹)/(1 − q)"},
{q:"Montrer qu'une suite est croissante",a:"Montrer que uₙ₊₁ − uₙ > 0 (ou uₙ₊₁/uₙ > 1 si termes > 0)."},
{q:"3 étapes d'une récurrence",a:"1. Initialisation (vérifier P(0)). 2. Hérédité (P(n) ⟹ P(n+1)). 3. Conclusion."},
{q:"Suite géométrique si 0 < q < 1 et u₀ > 0",a:"Décroissante, termes positifs tendant vers 0."},
{q:"u_{n+1} est-il égal à u_n + 1 ?",a:"Non. u_{n+1} est le terme suivant de la suite (rang n+1), pas « u_n plus 1 »."},
{q:"Forme explicite ou récurrence ?",a:"Explicite : u_n = f(n), on calcule directement n'importe quel terme. Récurrence : u_{n+1} = g(u_n) avec u_0 donné, on calcule de proche en proche."},
{q:"Terme général d'une arithmétique à partir du rang p",a:"u_n = u_p + (n − p)·r"},
{q:"Terme général d'une géométrique à partir du rang p",a:"u_n = u_p · q^(n − p)"},
{q:"Nombre de termes de u_p à u_n",a:"n − p + 1 (par exemple de u_3 à u_10 : 8 termes)."},
{q:"Augmentation de t % : coefficient multiplicateur",a:"q = 1 + t/100. Ex : +5 % → q = 1,05."},
{q:"Diminution de t % : coefficient multiplicateur",a:"q = 1 − t/100. Ex : −4 % → q = 0,96."},
{q:"Somme 1 + 2 + 3 + … + n",a:"n(n + 1)/2"},
{q:"Somme 1 + q + q² + … + qⁿ (q ≠ 1)",a:"(1 − qⁿ⁺¹)/(1 − q)"},
{q:"Comment reconnaître une suite arithmétique ?",a:"u_{n+1} − u_n est constant (égal à r)."},
{q:"Comment reconnaître une suite géométrique ?",a:"u_{n+1}/u_n est constant (égal à q)."},
{q:"Méthode universelle pour le sens de variation",a:"Calculer u_{n+1} − u_n et étudier son signe."},
{q:"Suite auxiliaire : à quoi ça sert ?",a:"Quand on pose v_n = u_n − k, on montre que (v_n) est arithmétique ou géométrique, puis on retrouve u_n = v_n + k."}
]},

"Probabilités": {
cours:"<div class=\"attention-box\">En probabilités, 80 % des erreurs viennent d'<strong>un mauvais départ</strong> : on se lance dans une formule sans avoir bien lu ce qu'on cherche. Ce cours te donne le réflexe : <strong>dessiner un arbre ou un tableau</strong>, repérer ce qui est « sachant » ce qui est « et », puis calculer.</div>\n\n<h3>1. Vocabulaire de base</h3>\n<div class=\"formula-box\">\n$A \\cap B$ : « $A$ <strong>et</strong> $B$ » &nbsp;&nbsp; $A \\cup B$ : « $A$ <strong>ou</strong> $B$ » (ou les deux) &nbsp;&nbsp; $\\overline{A}$ : « <strong>contraire</strong> de $A$ »<br>\n$0 \\leq P(A) \\leq 1$ &nbsp;&nbsp; $P(\\overline{A}) = 1 - P(A)$ &nbsp;&nbsp; $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$\n</div>\n<p>Si tous les cas sont équiprobables : $P(A) = \\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$. Deux événements sont <strong>incompatibles</strong> s'ils ne peuvent pas arriver ensemble : $A\\cap B = \\varnothing$.</p>\n\n<h3>2. Probabilité conditionnelle : « sachant que… »</h3>\n<p>$P_A(B)$ (ou $P(B\\mid A)$) est la probabilité de $B$ <strong>quand on sait que $A$ est réalisé</strong> : on se restreint au monde où $A$ est arrivé.</p>\n<div class=\"formula-box\">$P_A(B) = \\dfrac{P(A\\cap B)}{P(A)}$ &nbsp;&nbsp;⟺&nbsp;&nbsp; $P(A\\cap B) = P(A)\\times P_A(B)$</div>\n<p>Ces deux formules sont la <mark>même égalité lue dans les deux sens</mark> : tu cherches $P_A(B)$ → divise ; tu cherches $P(A\\cap B)$ → multiplie.</p>\n<p><strong>Exemple (tableau d'effectifs).</strong> Sur $150$ personnes, $90$ sont des femmes ($F$) et $60$ des hommes. Parmi les femmes, $54$ portent des lunettes ($L$) ; parmi les hommes, $24$.</p>\n<table class=\"formula-table\">\n<tr><th></th><th>Lunettes</th><th>Pas de lunettes</th><th>Total</th></tr>\n<tr><td>Femmes</td><td>54</td><td>36</td><td>90</td></tr>\n<tr><td>Hommes</td><td>24</td><td>36</td><td>60</td></tr>\n<tr><td>Total</td><td>78</td><td>72</td><td>150</td></tr>\n</table>\n<p>$P(L) = \\dfrac{78}{150} = 0{,}52$. $P_F(L) = \\dfrac{54}{90} = 0{,}6$ (parmi les <em>femmes</em>). $P_L(F) = \\dfrac{54}{78} = \\dfrac{9}{13} \\approx 0{,}692$ (parmi les <em>porteurs de lunettes</em>).</p>\n<div class=\"attention-box\">$P_F(L) \\neq P_L(F)$ ! Le « sachant que » change l'ensemble de référence (le dénominateur). Avant de calculer, demande-toi : <strong>« parmi qui ? »</strong></div>\n\n<h3>3. Arbre pondéré et probabilités totales</h3>\n<div class=\"retenir-box\">\n<strong>Règle 1</strong> : la somme des probabilités des branches qui partent d'un même nœud vaut $1$.<br>\n<strong>Règle 2</strong> : on <mark>multiplie</mark> le long d'un chemin (c'est $P(A\\cap B)$).<br>\n<strong>Règle 3</strong> : on <mark>additionne</mark> les chemins qui mènent à l'événement cherché (probabilités totales).\n</div>\n<p><strong>Exemple.</strong> Un élève prend le bus avec la probabilité $0{,}3$ (événement $B$), sinon il vient à vélo. En bus, il arrive en retard ($R$) avec la probabilité $0{,}1$ ; à vélo, avec la probabilité $0{,}04$.</p>\n<p>$$\\begin{aligned} P(R) &= P(B\\cap R) + P(\\overline{B}\\cap R) \\\\ &= 0{,}3\\times 0{,}1 + 0{,}7\\times 0{,}04 \\\\ &= 0{,}03 + 0{,}028 = 0{,}058 \\,. \\end{aligned}$$</p>\n<p><strong>Le sens inverse.</strong> Il est en retard : quelle est la probabilité qu'il ait pris le bus ? $$\\begin{aligned} P_R(B) &= \\dfrac{P(B\\cap R)}{P(R)} = \\dfrac{0{,}03}{0{,}058} \\\\ &= \\dfrac{15}{29} \\approx 0{,}517 \\,. \\end{aligned}$$ On « remonte » l'arbre : numérateur = le chemin concerné, dénominateur = tous les chemins qui mènent à $R$.</p>\n\n<h3>4. Événements indépendants</h3>\n<p>$A$ et $B$ sont <strong>indépendants</strong> si savoir que $A$ est arrivé ne change pas la probabilité de $B$ :</p>\n<div class=\"formula-box\">$A$ et $B$ indépendants ⟺ $P(A\\cap B) = P(A)\\times P(B)$ ⟺ $P_A(B) = P(B)$</div>\n<p><strong>Tester l'indépendance (dé équilibré).</strong> $A$ : « pair » ($P = \\tfrac12$), $B$ : « $\\geq 5$ » ($P = \\tfrac13$). $A\\cap B = \\{6\\}$ donc $P(A\\cap B) = \\tfrac16 = \\tfrac12\\times\\tfrac13$ : <strong>indépendants</strong>. Avec $B'$ : « $\\geq 4$ » ($P = \\tfrac12$), $A\\cap B' = \\{4\\,;6\\}$ donc $P = \\tfrac13 \\neq \\tfrac12\\times\\tfrac12 = \\tfrac14$ : <strong>pas indépendants</strong>.</p>\n<div class=\"attention-box\"><strong>Incompatibles ≠ indépendants.</strong> Deux événements incompatibles (de probabilités non nulles) sont même <em>très dépendants</em> : si l'un arrive, l'autre ne peut plus arriver.</div>\n\n<h3>5. Loi binomiale</h3>\n<p>Une <strong>épreuve de Bernoulli</strong> n'a que 2 issues : succès (probabilité $p$) ou échec ($1-p$). On en répète $n$ fois, de façon <strong>identique et indépendante</strong>. Si $X$ compte le nombre de succès, on dit que $X$ suit la loi binomiale $\\mathcal{B}(n\\,;p)$.</p>\n<div class=\"formula-box latex-block\">$$P(X = k) = \\binom{n}{k}\\,p^k\\,(1-p)^{n-k}$$\n$$\\begin{aligned} E(X) &= np \\qquad V(X) = np(1-p) \\qquad \\sigma \\\\ &= \\sqrt{np(1-p)} \\end{aligned}$$</div>\n<p>$\\binom{n}{k}$ = nombre de chemins de l'arbre qui contiennent exactement $k$ succès (touche <em>nCr</em> de la calculatrice ; $\\binom{5}{2} = 10$).</p>\n<p><strong>Exemple.</strong> Un QCM de $5$ questions à $4$ choix, répondu au hasard : $X \\sim \\mathcal{B}(5\\,;0{,}25)$. $P(X = 2) = 10\\times 0{,}25^2\\times 0{,}75^3 \\approx 0{,}2637$. $E(X) = 5\\times 0{,}25 = 1{,}25$ bonne réponse en moyenne.</p>\n<div class=\"retenir-box\"><strong>« Au moins un »</strong> : on passe par le contraire. $P(X\\geq 1) = 1 - P(X = 0) = 1 - (1-p)^n$. Ici : $1 - 0{,}75^5 \\approx 0{,}763$.</div>\n\n<h3>6. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Confondre $P_A(B)$ et $P_B(A)$.<br>\n❌ Additionner le long d'un chemin au lieu de multiplier (ou l'inverse entre chemins).<br>\n❌ Appliquer $P(A\\cap B) = P(A)P(B)$ sans avoir vérifié que $A$ et $B$ sont indépendants.<br>\n❌ Utiliser la loi binomiale pour un tirage <strong>sans remise</strong> (les tirages ne sont plus indépendants).<br>\n❌ Oublier le coefficient $\\binom{n}{k}$ dans $P(X=k)$.\n</div>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Un sac contient 5 boules rouges et 3 boules bleues. On tire une boule au hasard. Calcule la probabilité de tirer une boule rouge, puis une boule bleue.</p>",
 aide:"Probabilité = nombre de cas favorables / nombre de cas total. Il y a 8 boules en tout.",
 correction:"<p>Total : 5 + 3 = 8 boules.</p><p>$P(\\text{rouge}) = \\frac{5}{8}$</p><p>$P(\\text{bleue}) = \\frac{3}{8}$</p><p>Vérification : $\\frac{5}{8} + \\frac{3}{8} = 1$ ✓ (les deux événements sont complémentaires)</p>"},
{niveau:"Moyen",
 enonce:"<p>Dans une classe, 60% des élèves aiment les maths (événement A) et 40% aiment l'anglais (événement B). 25% aiment les deux matières. Calcule P(A∪B), la probabilité qu'un élève aime au moins une des deux matières.</p>",
 aide:"Utilise la formule P(A∪B) = P(A) + P(B) − P(A∩B). Attention à ne pas compter deux fois ceux qui aiment les deux.",
 correction:"<p>$P(A) = 0,6$ ; $P(B) = 0,4$ ; $P(A \\cap B) = 0,25$</p><p>$$\\begin{aligned} P(A \\cup B) &= P(A) + P(B) - P(A \\cap B) \\\\ &= 0,6 + 0,4 - 0,25 = 0,75 \\end{aligned}$$</p><p>75% des élèves aiment au moins une des deux matières. Sans la soustraction de P(A∩B), on aurait compté deux fois les élèves qui aiment les deux — erreur classique.</p>"},
{niveau:"Difficile",
 enonce:"<p>Une entreprise fabrique des pièces avec 2 machines. La machine A produit 70% des pièces avec un taux de défaut de 3%. La machine B produit 30% des pièces avec un taux de défaut de 8%. Quelle est la probabilité qu'une pièce prise au hasard soit défectueuse ?</p>",
 aide:"C'est une situation de probabilités totales : (A, B) forme une partition. Utilise P(défaut) = P(A)×P(défaut|A) + P(B)×P(défaut|B).",
 correction:"<p>Notons D l'événement \"la pièce est défectueuse\".</p><p>$P(D) = P(A) \\times P(D|A) + P(B) \\times P(D|B)$</p><p>$$\\begin{aligned} P(D) &= 0,7 \\times 0,03 + 0,3 \\times 0,08 \\\\ &= 0,021 + 0,024 = 0,045 \\end{aligned}$$</p><p>La probabilité qu'une pièce prise au hasard soit défectueuse est de <strong>4,5%</strong>.</p>"},
{niveau:"Facile",
 enonce:"<p>On lance un dé équilibré à 6 faces. $A$ : « le résultat est pair » ; $B$ : « le résultat est supérieur ou égal à 4 ».<br>1) Calcule $P(A)$, $P(B)$, $P(A\\cap B)$ et $P(A\\cup B)$.<br>2) $A$ et $B$ sont-ils indépendants ?</p>",
 aide:"Écris les ensembles : A = {2 ; 4 ; 6}, B = {4 ; 5 ; 6}. Pour l'indépendance, compare P(A∩B) avec P(A)×P(B).",
 correction:"<p>1) $A = \\{2;4;6\\}$ donc $P(A) = \\tfrac12$. $B = \\{4;5;6\\}$ donc $P(B) = \\tfrac12$. $A\\cap B = \\{4;6\\}$ donc $P(A\\cap B) = \\tfrac13$. $A\\cup B = \\{2;4;5;6\\}$ donc $P(A\\cup B) = \\tfrac23$.</p><p>Vérification : $\\tfrac12 + \\tfrac12 - \\tfrac13 = \\tfrac23$ ✓.</p><p>2) $P(A)\\times P(B) = \\tfrac14 \\neq \\tfrac13 = P(A\\cap B)$ : les événements <strong>ne sont pas indépendants</strong>.</p>"},
{niveau:"Moyen",
 enonce:"<p>Sur $200$ lycéens, $120$ sont des filles et $80$ des garçons. $30$ filles et $40$ garçons pratiquent le football. On interroge un lycéen au hasard. Calcule :<br>1) $P(\\text{foot})$ ; 2) la probabilité qu'une fille pratique le football (« sachant que c'est une fille ») ; 3) la probabilité que ce soit une fille sachant qu'il pratique le football.</p>",
 aide:"Construis un tableau d'effectifs. Pour chaque probabilité conditionnelle, demande-toi « parmi qui ? » : cela donne le dénominateur.",
 correction:"<p>Effectif du foot : $30 + 40 = 70$.</p><p>1) $P(\\text{foot}) = \\dfrac{70}{200} = 0{,}35$.</p><p>2) Parmi les $120$ filles, $30$ jouent : $P_F(\\text{foot}) = \\dfrac{30}{120} = 0{,}25$.</p><p>3) Parmi les $70$ joueurs, $30$ sont des filles : $P_{\\text{foot}}(F) = \\dfrac{30}{70} = \\dfrac{3}{7} \\approx 0{,}43$.</p><p>On voit bien que $P_F(\\text{foot}) \\neq P_{\\text{foot}}(F)$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Un basketteur réussit un lancer franc avec la probabilité $0{,}7$. Il tire $4$ lancers francs de façon indépendante. Soit $X$ le nombre de lancers réussis.<br>1) Quelle est la loi de $X$ ? 2) Calcule $P(X = 3)$ et $P(X = 4)$. 3) En déduis $P(X\\geq 3)$. 4) Calcule $E(X)$.</p>",
 aide:"Répétition identique et indépendante de 4 épreuves à 2 issues : X suit B(4 ; 0,7). Utilise P(X = k) = C(4,k)·0,7ᵏ·0,3⁴⁻ᵏ.",
 correction:"<p>1) $X \\sim \\mathcal{B}(4\\,;0{,}7)$.</p><p>2) $$\\begin{aligned} P(X &= 3) = \\binom{4}{3}\\times 0{,}7^3\\times 0{,}3 \\\\ &= 4\\times 0{,}343\\times 0{,}3 = 0{,}4116 \\,. \\end{aligned}$$ $P(X = 4) = 0{,}7^4 = 0{,}2401$.</p><p>3) $$\\begin{aligned} P(X\\geq 3) &= P(X = 3) + P(X = 4) \\\\ &= 0{,}4116 + 0{,}2401 = 0{,}6517 \\,. \\end{aligned}$$</p><p>4) $E(X) = 4\\times 0{,}7 = 2{,}8$ : en moyenne, environ 3 lancers réussis sur 4.</p>"},
{niveau:"Difficile",
 enonce:"<p>Une maladie touche $2\\,\\%$ d'une population. Un test est positif dans $95\\,\\%$ des cas si la personne est malade, et dans $3\\,\\%$ des cas si elle est saine (faux positifs). On choisit une personne au hasard.<br>1) Calcule la probabilité que le test soit positif.<br>2) Le test est positif : quelle est la probabilité que la personne soit réellement malade ? Que penses-tu du résultat ?</p>",
 aide:"Fais un arbre : M (0,02) / non M (0,98), puis T positif avec 0,95 ou 0,03. Pour la question 2, c'est un « sachant que » : divise le chemin M∩T par P(T).",
 correction:"<p>Notons $M$ « malade » et $T$ « test positif ».</p><p>1) $$\\begin{aligned} P(T) &= P(M)P_M(T) + P(\\overline{M})P_{\\overline{M}}(T) \\\\ &= 0{,}02\\times 0{,}95 + 0{,}98\\times 0{,}03 \\\\ &= 0{,}019 + 0{,}0294 = 0{,}0484 \\,. \\end{aligned}$$</p><p>2) $$\\begin{aligned} P_T(M) &= \\dfrac{P(M\\cap T)}{P(T)} \\\\ &= \\dfrac{0{,}019}{0{,}0484} \\approx 0{,}393 \\,. \\end{aligned}$$</p><p>Seulement <strong>39 %</strong> des personnes au test positif sont malades, alors que le test est « fiable à 95 % ». Explication : la maladie est rare, donc les faux positifs ($0{,}0294$) sont presque aussi nombreux que les vrais positifs ($0{,}019$). Un résultat contre-intuitif mais classique.</p>"},
{niveau:"Difficile",
 enonce:"<p>On lance $n$ fois un dé équilibré. Quel est le plus petit nombre de lancers pour que la probabilité d'obtenir <strong>au moins un 6</strong> dépasse $0{,}9$ ?</p>",
 aide:"Passe par le contraire : « aucun 6 » a pour probabilité (5/6)ⁿ. Résous 1 − (5/6)ⁿ > 0,9 par essais successifs à la calculatrice.",
 correction:"<p>« Au moins un 6 » est le contraire de « aucun 6 ». Sur $n$ lancers, $P(\\text{aucun 6}) = \\left(\\tfrac56\\right)^n$, donc $P(\\text{au moins un 6}) = 1 - \\left(\\tfrac56\\right)^n$.</p><p>On veut $1 - \\left(\\tfrac56\\right)^n > 0{,}9 \\Leftrightarrow \\left(\\tfrac56\\right)^n < 0{,}1$.</p><p>$\\left(\\tfrac56\\right)^{12} \\approx 0{,}112$ (pas assez) et $\\left(\\tfrac56\\right)^{13} \\approx 0{,}093$ (✓).</p><p>Il faut donc <strong>au minimum 13 lancers</strong>.</p>"}
],
flashcards:[
{q:"C(n, k) — formule",a:"n! / (k!·(n−k)!)"},
{q:"C(n, 0) et C(n, n)",a:"1"},
{q:"C(n, 1)",a:"n"},
{q:"P(B|A)",a:"P(A∩B) / P(A) — probabilité de B sachant A."},
{q:"Indépendance de A et B",a:"P(A∩B) = P(A)·P(B). Connaître A ne change pas P(B)."},
{q:"P(A∩B) =",a:"P(A) × P(B|A)"},
{q:"P(A∪B) =",a:"P(A) + P(B) − P(A∩B)"},
{q:"P(Ā) =",a:"1 − P(A)"},
{q:"P(X = k) pour X ~ B(n, p)",a:"C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ"},
{q:"Espérance de X ~ B(n, p)",a:"E(X) = np"},
{q:"Variance de X ~ B(n, p)",a:"V(X) = np(1−p)"},
{q:"Écart-type de X ~ B(n, p)",a:"σ = √(np(1−p))"},
{q:"Formule des probabilités totales",a:"P(A) = Σ P(Bᵢ)·P(A|Bᵢ) quand (B₁,...,Bₙ) est une partition de Ω."},
{q:"Que signifie P_A(B) ?",a:"La probabilité de B sachant que A est réalisé : P(A∩B)/P(A). On se restreint à l'ensemble A."},
{q:"P_A(B) et P_B(A) sont-ils égaux ?",a:"Non en général : le dénominateur change (P(A) pour l'un, P(B) pour l'autre). Il faut se demander « parmi qui ? »."},
{q:"Règles de l'arbre pondéré",a:"1. Somme des branches d'un nœud = 1. 2. On multiplie le long d'un chemin. 3. On additionne les chemins qui mènent à l'événement."},
{q:"Comment calculer P_R(B) à partir d'un arbre (sens inverse) ?",a:"P_R(B) = P(B∩R) / P(R) : numérateur = le chemin B puis R ; dénominateur = tous les chemins qui mènent à R."},
{q:"Événements incompatibles : définition",a:"A∩B est vide : A et B ne peuvent pas se produire en même temps. Attention : incompatibles ≠ indépendants."},
{q:"Incompatibles et indépendants : y a-t-il un lien ?",a:"Aucun. Deux événements incompatibles de probabilités non nulles sont même dépendants (si l'un arrive, l'autre est impossible)."},
{q:"Conditions d'un schéma de Bernoulli / loi binomiale",a:"n répétitions identiques et indépendantes d'une épreuve à 2 issues (succès p, échec 1−p). X = nombre de succès."},
{q:"Pourquoi un tirage sans remise n'est-il pas binomial ?",a:"Les probabilités changent à chaque tirage : les épreuves ne sont pas indépendantes."},
{q:"Probabilité d'« au moins un succès » en n épreuves",a:"1 − P(aucun succès) = 1 − (1 − p)ⁿ"},
{q:"Que représente C(n, k) dans la loi binomiale ?",a:"Le nombre de chemins de l'arbre contenant exactement k succès parmi n épreuves."},
{q:"Probabilité P(A) en cas d'équiprobabilité",a:"Nombre de cas favorables / nombre de cas possibles."},
{q:"A et B indépendants : trois façons de le dire",a:"P(A∩B) = P(A)·P(B) ⟺ P_A(B) = P(B) ⟺ P_B(A) = P(A)."}
]},

"Fonctions exp & ln": {
cours:"<div class=\"attention-box\">L'exponentielle décrit tout ce qui <strong>croît ou décroît proportionnellement à sa valeur</strong> : population, intérêts composés, désintégration radioactive, charge ou décharge d'un condensateur. Le logarithme népérien est son « opération inverse » : il sert à <strong>retrouver l'exposant</strong>. Quand tu comprends qu'ils se défont mutuellement, 80 % du chapitre devient évident.</div>\n\n<h3>1. La fonction exponentielle</h3>\n<p>$\\exp(x) = e^x$ est la fonction qui est <mark>égale à sa propre dérivée</mark> et vaut $1$ en $0$. On a $e \\approx 2{,}718$.</p>\n<div class=\"formula-box\">$e^0 = 1$ &nbsp; $e^1 = e$ &nbsp; $e^x > 0$ pour tout $x$ &nbsp; $(e^x)' = e^x$ (donc $e^x$ est <strong>strictement croissante</strong>)</div>\n<p>Sa courbe est toujours au-dessus de l'axe des abscisses, passe par $(0\\,;1)$, et sa tangente en $0$ est $y = x + 1$.</p>\n\n<h3>2. Règles de calcul</h3>\n<div class=\"formula-box\">\n$e^{a+b} = e^a\\times e^b$ &nbsp;&nbsp; $e^{a-b} = \\dfrac{e^a}{e^b}$ &nbsp;&nbsp; $e^{-a} = \\dfrac{1}{e^a}$ &nbsp;&nbsp; $(e^a)^n = e^{na}$\n</div>\n<p><strong>Exemple.</strong> $\\dfrac{e^{3x}\\times e^{-x}}{e^{x+2}} = e^{3x - x - (x+2)} = e^{x-2}$. <em>Astuce : additionne les exposants quand on multiplie, soustrais quand on divise.</em></p>\n\n<h3>3. Dérivée et variations avec l'exponentielle</h3>\n<div class=\"formula-box\">$(e^{u})' = u'\\,e^{u}$ &nbsp;&nbsp; en particulier $(e^{ax+b})' = a\\,e^{ax+b}$</div>\n<p>Ex : $(e^{-2x+1})' = -2\\,e^{-2x+1}$. Avec un produit : $(x\\,e^x)' = 1\\times e^x + x\\times e^x = (1+x)\\,e^x$.</p>\n<div class=\"retenir-box\">Comme $e^{x}>0$ (et $e^{u}>0$), le <strong>signe de $f'$</strong> est celui du facteur qui reste après avoir <mark>factorisé par l'exponentielle</mark>.</div>\n<p><strong>Exemple.</strong> $f(x) = (x-2)e^x$ : $f'(x) = e^x + (x-2)e^x = (x-1)\\,e^x$. Donc $f'<0$ si $x<1$ et $f'>0$ si $x>1$ : $f$ décroît puis croît, avec un <strong>minimum $f(1) = -e \\approx -2{,}72$</strong>.</p>\n\n<h3>4. Résoudre avec l'exponentielle</h3>\n<ul>\n<li>$e^{u} = e^{v} \\Leftrightarrow u = v$ &nbsp;&nbsp; et &nbsp;&nbsp; $e^{u} < e^{v} \\Leftrightarrow u < v$ (le sens est conservé car exp est croissante).</li>\n<li>$e^x = a$ : si $a > 0$, $x = \\ln a$ ; si $a \\leq 0$, <strong>aucune solution</strong> (une exponentielle est toujours strictement positive).</li>\n</ul>\n<p>Ex : $e^{2x-1} = e^{x+3} \\Leftrightarrow 2x - 1 = x + 3 \\Leftrightarrow x = 4$.</p>\n<p><strong>Astuce :</strong> une équation du type $e^{2x} - 5e^x + 4 = 0$ se ramène au second degré en posant <mark>$X = e^x$</mark> (car $e^{2x} = (e^x)^2$) : $X^2 - 5X + 4 = 0$. N'oublie pas ensuite de revenir à $x$, et de rejeter les valeurs $X \\leq 0$.</p>\n\n<h3>5. Le logarithme népérien</h3>\n<p>Pour $a > 0$, $\\ln a$ est <strong>l'unique nombre dont l'exponentielle vaut $a$</strong>. Autrement dit, $\\ln$ et $\\exp$ sont réciproques : elles se défont.</p>\n<div class=\"formula-box\">$\\ln(e^x) = x$ pour tout $x$ &nbsp;&nbsp; $e^{\\ln x} = x$ pour $x>0$ &nbsp;&nbsp; $\\ln 1 = 0$ &nbsp;&nbsp; $\\ln e = 1$</div>\n<div class=\"formula-box\">$\\ln(ab) = \\ln a + \\ln b$ &nbsp;&nbsp; $\\ln\\dfrac{a}{b} = \\ln a - \\ln b$ &nbsp;&nbsp; $\\ln\\dfrac{1}{a} = -\\ln a$ &nbsp;&nbsp; $\\ln(a^n) = n\\ln a$</div>\n<div class=\"attention-box\"><strong>$\\ln(a+b)$ ne se simplifie pas !</strong> $\\ln(a+b) \\neq \\ln a + \\ln b$. Seuls les <em>produits</em> deviennent des sommes. Et $\\ln x$ n'existe que pour <mark>$x > 0$</mark>.</div>\n<p><strong>Variations.</strong> $\\ln$ est strictement croissante sur $]0\\,;+\\infty[$, avec $(\\ln x)' = \\dfrac{1}{x}$ et plus généralement $(\\ln u)' = \\dfrac{u'}{u}$ (pour $u>0$). Elle est négative sur $]0\\,;1[$ et positive sur $]1\\,;+\\infty[$.</p>\n<p>Ex : $(\\ln(2x+1))' = \\dfrac{2}{2x+1}$.</p>\n\n<h3>6. Résoudre avec le logarithme (et vérifier le domaine !)</h3>\n<ul>\n<li>$\\ln x = a \\Leftrightarrow x = e^{a}$. &nbsp; Ex : $\\ln(x-1) = 2 \\Leftrightarrow x - 1 = e^2 \\Leftrightarrow x = 1 + e^2 \\approx 8{,}39$.</li>\n<li>$\\ln u = \\ln v \\Leftrightarrow u = v$ et $\\ln u < \\ln v \\Leftrightarrow u < v$ <strong>(avec $u>0$ et $v>0$)</strong>.</li>\n</ul>\n<p><strong>Exemple avec piège.</strong> Résoudre $\\ln x + \\ln(x-2) = \\ln 3$. <em>Domaine</em> : $x > 0$ et $x - 2 > 0$, donc $x > 2$. On regroupe : $$\\begin{aligned} \\ln\\big(x(x-2)\\big) &= \\ln 3 \\Rightarrow x^2 - 2x - 3 = 0 \\\\ &\\Rightarrow (x-3)(x+1) = 0 \\,. \\end{aligned}$$ Deux candidats : $3$ et $-1$. Or $-1$ n'est pas dans le domaine : la <strong>seule solution est $x = 3$</strong>.</p>\n\n<h3>7. Application : décroissance exponentielle et demi-vie</h3>\n<p>Une quantité qui décroît selon $Q(t) = Q_0\\,e^{-\\lambda t}$ (avec $\\lambda > 0$) a pour <strong>demi-vie</strong> le temps $t_{1/2}$ tel que $Q = \\tfrac{Q_0}{2}$ : $e^{-\\lambda t} = \\tfrac12 \\Leftrightarrow -\\lambda t = -\\ln 2 \\Leftrightarrow t_{1/2} = \\dfrac{\\ln 2}{\\lambda}$. Ex : $\\lambda = 0{,}1$ → $t_{1/2} = \\dfrac{0{,}693}{0{,}1} \\approx 6{,}9$.</p>\n\n<h3>8. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Écrire $e^{a+b} = e^a + e^b$ (c'est un <em>produit</em>).<br>\n❌ Écrire $\\ln(a+b) = \\ln a + \\ln b$.<br>\n❌ Résoudre $e^x = -3$ : impossible, une exponentielle est toujours $> 0$.<br>\n❌ Oublier de vérifier le domaine ($\\ln$ exige un argument strictement positif).<br>\n❌ Oublier le $u'$ en dérivant $e^{u}$ ou $\\ln u$.\n</div>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Résous dans $\\mathbb{R}$ l'équation $e^x = 5$.</p>",
 aide:"Applique ln des deux côtés de l'équation — souviens-toi que ln(eˣ) = x.",
 correction:"<p>$e^x = 5 \\Leftrightarrow \\ln(e^x) = \\ln(5) \\Leftrightarrow x = \\ln(5)$</p><p>Valeur approchée : $x \\approx 1,61$</p>"},
{niveau:"Moyen",
 enonce:"<p>Résous dans $\\mathbb{R}$ l'inéquation $2e^{x} - 6 < 0$.</p>",
 aide:"Isole d'abord eˣ, puis applique ln en faisant attention au sens de l'inégalité (ln est croissante, donc le sens ne change pas ici).",
 correction:"<p>$2e^x - 6 < 0 \\Leftrightarrow 2e^x < 6 \\Leftrightarrow e^x < 3$</p><p>La fonction ln est strictement croissante, donc appliquer ln ne change pas le sens de l'inégalité :</p><p>$\\ln(e^x) < \\ln(3) \\Leftrightarrow x < \\ln(3)$</p><p>Solution : $S = ]-\\infty ; \\ln(3)[$</p>"},
{niveau:"Difficile",
 enonce:"<p>Soit $f(x) = xe^{-x}$ définie sur $\\mathbb{R}$. Calcule $f'(x)$ et étudie le signe de $f'(x)$ pour déterminer les variations de f.</p>",
 aide:"Utilise la formule du produit (uv)'=u'v+uv' avec u=x et v=e^(-x) (dérivée de e^(-x) est -e^(-x)). Factorise ensuite par e^(-x), qui est toujours positif.",
 correction:"<p>$u = x$ donc $u' = 1$ ; $v = e^{-x}$ donc $v' = -e^{-x}$.</p><p>$f'(x) = 1 \\times e^{-x} + x \\times (-e^{-x}) = e^{-x}(1-x)$</p><p>Comme $e^{-x} > 0$ pour tout x, le signe de $f'(x)$ dépend uniquement de $(1-x)$ :</p><p>$f'(x) > 0$ si $x < 1$ (f croissante) et $f'(x) < 0$ si $x > 1$ (f décroissante). f admet donc un maximum en $x=1$.</p>"},
{niveau:"Facile",
 enonce:"<p>1) Simplifie $A(x) = \\dfrac{e^{2x}\\times e^{3-x}}{e^{x}}$.<br>2) Simplifie $B = \\ln 12 - \\ln 3 + \\ln 2$ (donne une expression avec $\\ln 2$).</p>",
 aide:"1) Additionne les exposants pour un produit, soustrais pour un quotient. 2) Regroupe avec ln(ab) = ln a + ln b et ln(a/b) = ln a − ln b.",
 correction:"<p>1) $A(x) = e^{2x + (3-x) - x} = e^{3}$ : le résultat ne dépend pas de $x$ !</p><p>2) $B = \\ln\\dfrac{12\\times 2}{3} = \\ln 8 = \\ln(2^3) = 3\\ln 2$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Résous dans $\\mathbb{R}$ l'équation $e^{2x} - 5e^x + 4 = 0$.</p>",
 aide:"Pose X = eˣ. Comme e^(2x) = (eˣ)², tu obtiens une équation du second degré en X. Résous-la puis reviens à x avec ln.",
 correction:"<p>On pose $X = e^x$ (avec $X > 0$). L'équation devient $X^2 - 5X + 4 = 0$ : $\\Delta = 25 - 16 = 9$, donc $X = \\dfrac{5 \\mp 3}{2}$, soit $X = 1$ ou $X = 4$. Les deux valeurs sont $> 0$.</p><p>• $e^x = 1 \\Leftrightarrow x = \\ln 1 = 0$.</p><p>• $e^x = 4 \\Leftrightarrow x = \\ln 4 = 2\\ln 2 \\approx 1{,}39$.</p><p>$S = \\{0\\,;\\ \\ln 4\\}$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Résous dans $\\mathbb{R}$ l'inéquation $\\ln(2x - 4) \\leq \\ln(x + 1)$.</p>",
 aide:"Détermine d'abord le domaine : les deux arguments doivent être strictement positifs. Ensuite, ln est croissante : ln u ≤ ln v ⟺ u ≤ v.",
 correction:"<p><strong>Domaine :</strong> $2x - 4 > 0 \\Leftrightarrow x > 2$ et $x + 1 > 0 \\Leftrightarrow x > -1$. Donc $x > 2$.</p><p>Comme $\\ln$ est strictement croissante : $\\ln(2x-4) \\leq \\ln(x+1) \\Leftrightarrow 2x - 4 \\leq x + 1 \\Leftrightarrow x \\leq 5$.</p><p>En tenant compte du domaine : $S = ]2\\,;\\,5]$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Étudie les variations de $f(x) = (2x+1)\\,e^{-x}$ sur $\\mathbb{R}$ et donne la valeur de son maximum.</p>",
 aide:"Formule du produit avec u = 2x+1 et v = e^(−x) (v' = −e^(−x)). Factorise par e^(−x) : il est toujours positif.",
 correction:"<p>$u = 2x+1$, $u' = 2$ ; $v = e^{-x}$, $v' = -e^{-x}$.</p><p>$$\\begin{aligned} f'(x) &= 2e^{-x} + (2x+1)(-e^{-x}) \\\\ &= e^{-x}\\,(2 - 2x - 1) = (1 - 2x)\\,e^{-x} \\,. \\end{aligned}$$</p><p>Comme $e^{-x} > 0$, le signe de $f'$ est celui de $1 - 2x$ : $f' > 0$ si $x < \\tfrac12$ et $f' < 0$ si $x > \\tfrac12$.</p><p>$f$ croît sur $]-\\infty\\,;\\tfrac12]$ puis décroît sur $[\\tfrac12\\,;+\\infty[$. Maximum : $f\\!\\left(\\tfrac12\\right) = 2\\,e^{-1/2} = \\dfrac{2}{\\sqrt{e}} \\approx 1{,}21$.</p>"},
{niveau:"Difficile",
 enonce:"<p>La quantité d'un élément radioactif suit la loi $N(t) = N_0\\,e^{-0{,}05\\,t}$ ($t$ en années).<br>1) Calcule la demi-vie, c'est-à-dire le temps au bout duquel il reste la moitié de la quantité initiale.<br>2) Quel pourcentage reste-t-il au bout de $30$ ans ?<br>3) Au bout de combien de temps ne reste-t-il que $10\\,\\%$ de la quantité initiale ?</p>",
 aide:"Il reste la moitié : e^(−0,05t) = 1/2. Prends le logarithme des deux côtés. Pour la question 3, c'est e^(−0,05t) = 0,1.",
 correction:"<p>1) $$\\begin{aligned} e^{-0{,}05t} &= \\tfrac12 \\Leftrightarrow -0{,}05\\,t = \\ln\\tfrac12 \\\\ &= -\\ln 2 \\Leftrightarrow t = \\dfrac{\\ln 2}{0{,}05} \\approx 13{,}9 \\end{aligned}$$ ans.</p><p>2) $\\dfrac{N(30)}{N_0} = e^{-1{,}5} \\approx 0{,}223$ : il reste environ <strong>22,3 %</strong>.</p><p>3) $$\\begin{aligned} e^{-0{,}05t} &= 0{,}1 \\Leftrightarrow -0{,}05\\,t = \\ln 0{,}1 \\\\ &= -\\ln 10 \\Leftrightarrow t = \\dfrac{\\ln 10}{0{,}05} \\approx 46{,}1 \\end{aligned}$$ ans.</p>"},
{niveau:"Difficile",
 enonce:"<p>Soit $f(x) = x - \\ln x$ définie sur $]0\\,;+\\infty[$.<br>1) Calcule $f'(x)$ et étudie son signe.<br>2) Dresse le tableau de variations de $f$ et donne son minimum.<br>3) En déduis que pour tout $x > 0$, on a $\\ln x < x$.</p>",
 aide:"f'(x) = 1 − 1/x : mets sur le même dénominateur pour étudier le signe (x est positif). Le minimum donne ensuite une inégalité valable pour tout x.",
 correction:"<p>1) $f'(x) = 1 - \\dfrac{1}{x} = \\dfrac{x - 1}{x}$. Comme $x > 0$, le signe de $f'$ est celui de $x - 1$ : négatif sur $]0\\,;1[$, positif sur $]1\\,;+\\infty[$.</p><p>2) $f$ est décroissante sur $]0\\,;1]$ puis croissante sur $[1\\,;+\\infty[$. Son minimum est $f(1) = 1 - \\ln 1 = 1$.</p><p>3) Pour tout $x > 0$, $f(x) \\geq 1 > 0$, c'est-à-dire $x - \\ln x > 0$, soit $\\ln x < x$. ∎</p>"}
],
flashcards:[
{q:"Dérivée de eˣ",a:"eˣ (l'exponentielle est sa propre dérivée)"},
{q:"eˣ⁺ʸ =",a:"eˣ · eʸ"},
{q:"(eˣ)ⁿ =",a:"eⁿˣ"},
{q:"e⁰ =",a:"1"},
{q:"Limite de eˣ quand x → −∞",a:"0 (l'exponentielle tend vers 0)"},
{q:"Dérivée de ln x",a:"1/x (pour x > 0)"},
{q:"ln(1) = ?",a:"0"},
{q:"ln(e) = ?",a:"1"},
{q:"ln(ab) =",a:"ln a + ln b"},
{q:"ln(a/b) =",a:"ln a − ln b"},
{q:"ln(aⁿ) =",a:"n · ln a"},
{q:"ln(eˣ) = ?",a:"x (pour tout x ∈ ℝ)"},
{q:"e^(ln x) = ?",a:"x (pour x > 0)"},
{q:"Résoudre eˣ = a (a > 0)",a:"x = ln a"},
{q:"eˣ est-elle positive ?",a:"Oui, eˣ > 0 pour tout x ∈ ℝ."},
{q:"e⁻ˣ =",a:"1/eˣ"},
{q:"eˣ⁻ʸ =",a:"eˣ / eʸ"},
{q:"Dérivée de e^u (u fonction de x)",a:"u'·e^u. Ex : (e^(−2x+1))' = −2e^(−2x+1)"},
{q:"Signe de f'(x) quand f' contient un facteur exponentiel",a:"Factoriser par l'exponentielle (toujours > 0) : le signe est celui du facteur restant."},
{q:"e^u = e^v équivaut à ?",a:"u = v. Et e^u < e^v ⟺ u < v (exp est croissante, le sens est conservé)."},
{q:"Équation eˣ = −3 : solutions ?",a:"Aucune : une exponentielle est toujours strictement positive."},
{q:"Astuce pour e^(2x) − 5eˣ + 4 = 0",a:"Poser X = eˣ : X² − 5X + 4 = 0, résoudre en X, puis x = ln X (en gardant X > 0)."},
{q:"ln(1/a) =",a:"−ln a"},
{q:"Domaine de définition de ln",a:"]0 ; +∞[ : ln x n'existe que pour x > 0."},
{q:"ln(a + b) = ln a + ln b ?",a:"Faux ! Seul le produit devient une somme : ln(ab) = ln a + ln b."},
{q:"Dérivée de ln u",a:"u'/u (pour u > 0). Ex : (ln(2x + 1))' = 2/(2x + 1)"},
{q:"Signe de ln x",a:"Négatif sur ]0 ; 1[, nul en 1, positif sur ]1 ; +∞[."},
{q:"Résoudre ln x = a",a:"x = e^a"},
{q:"ln u = ln v équivaut à ?",a:"u = v, à condition que u > 0 et v > 0. Vérifier le domaine avant de conclure."},
{q:"Demi-vie pour Q(t) = Q₀e^(−λt)",a:"t = ln 2 / λ"}
]},

"Produit scalaire & loi d'Al-Kashi": {
 "cours": "<div class=\"attention-box\"><strong>Objectif du jour de l'évaluation :</strong> savoir (1) calculer un produit scalaire avec <em>normes + angle</em>, avec des <em>coordonnées</em> ou avec un <em>projeté orthogonal</em> ; (2) montrer que deux vecteurs sont <em>orthogonaux</em> ; (3) <em>trouver un angle</em> ; (4) utiliser <em>Al-Kashi</em>. Plus bas : un tableau « quelle formule pour quelle situation », des méthodes pas à pas et les erreurs qui coûtent des points.</div>\n\n<h3>0. Comprendre avant de calculer : 3 façons de voir le produit scalaire</h3>\n<p><strong>Image n°1 — un « détecteur d'alignement ».</strong> Le produit scalaire $\\vec{u}\\cdot\\vec{v}$ est un <strong>nombre</strong> (jamais un vecteur). Son signe te dit si les deux vecteurs vont globalement dans le même sens, sont perpendiculaires, ou vont à peu près en sens contraires.</p>\n<svg viewBox=\"0 0 540 150\" role=\"img\" aria-label=\"Signe du produit scalaire selon l'angle\" style=\"width:100%;max-width:560px;display:block;margin:12px auto\"><defs><marker id=\"ah\" markerWidth=\"9\" markerHeight=\"9\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6366f1\"/></marker></defs><line x1=\"40\" y1=\"100\" x2=\"135\" y2=\"100\" stroke=\"#6366f1\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><line x1=\"40\" y1=\"100\" x2=\"112.8\" y2=\"38.9\" stroke=\"#ec4899\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><text x=\"143\" y=\"116\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">u</text><text x=\"123.5\" y=\"33.8\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">v</text><text x=\"100\" y=\"140\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"500\" fill=\"currentColor\">angle aigu : u·v &gt; 0</text><line x1=\"220\" y1=\"100\" x2=\"315\" y2=\"100\" stroke=\"#6366f1\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><line x1=\"220\" y1=\"100\" x2=\"220.0\" y2=\"5.0\" stroke=\"#ec4899\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><text x=\"323\" y=\"116\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">u</text><text x=\"220.0\" y=\"-3.0\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">v</text><text x=\"280\" y=\"140\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"500\" fill=\"currentColor\">angle droit : u·v = 0</text><line x1=\"400\" y1=\"100\" x2=\"495\" y2=\"100\" stroke=\"#6366f1\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><line x1=\"400\" y1=\"100\" x2=\"332.8\" y2=\"32.8\" stroke=\"#ec4899\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><text x=\"503\" y=\"116\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">u</text><text x=\"322.9\" y=\"27.2\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"600\" fill=\"currentColor\">v</text><text x=\"460\" y=\"140\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"500\" fill=\"currentColor\">angle obtus : u·v &lt; 0</text></svg>\n<p><strong>Image n°2 — le travail d'une force (Physique).</strong> Tu pousses un wagon de $A$ vers $B$ avec une force $\\vec{F}$. Seule la partie de la force <em>dans le sens du déplacement</em> compte : $W=\\overrightarrow{AB}\\cdot\\vec{F}$. Force dans le sens du mouvement : travail positif (elle aide). Force perpendiculaire (le poids d'un sac que tu portes en marchant) : travail nul. Force opposée (les frottements) : travail négatif. C'est <em>exactement</em> l'exercice 18.</p>\n<p><strong>Image n°3 — l'ombre.</strong> $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ = (longueur $AB$) × (longueur de l'« ombre » de $\\overrightarrow{AC}$ sur la droite $(AB)$), avec un signe. L'ombre, c'est le projeté orthogonal $H$ de $C$ sur $(AB)$ : on <em>laisse tomber</em> $C$ à angle droit sur la droite $(AB)$.</p>\n<svg viewBox=\"0 0 540 175\" role=\"img\" aria-label=\"Projeté orthogonal : deux cas\" style=\"width:100%;max-width:560px;display:block;margin:12px auto\"><defs><marker id=\"ah\" markerWidth=\"9\" markerHeight=\"9\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6366f1\"/></marker></defs><line x1=\"30\" y1=\"120\" x2=\"215\" y2=\"120\" stroke=\"#6366f1\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><line x1=\"30\" y1=\"120\" x2=\"150\" y2=\"35\" stroke=\"#ec4899\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><line x1=\"150\" y1=\"35\" x2=\"150\" y2=\"120\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M150,108 h10 v12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\"/><text x=\"24\" y=\"138\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">A</text><text x=\"222\" y=\"138\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">B</text><text x=\"150\" y=\"28\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">C</text><text x=\"150\" y=\"138\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">H</text><text x=\"120\" y=\"163\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"500\" fill=\"currentColor\">H du même côté que B : AB·AC = + AB × AH</text><line x1=\"380\" y1=\"120\" x2=\"525\" y2=\"120\" stroke=\"#6366f1\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><line x1=\"380\" y1=\"120\" x2=\"320\" y2=\"38\" stroke=\"#ec4899\" stroke-width=\"2.4\" marker-end=\"url(#ah)\"/><line x1=\"320\" y1=\"38\" x2=\"320\" y2=\"120\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-dasharray=\"5 4\"/><path d=\"M320,108 h10 v12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\"/><text x=\"386\" y=\"138\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">A</text><text x=\"530\" y=\"138\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">B</text><text x=\"320\" y=\"30\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">C</text><text x=\"312\" y=\"138\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"600\" fill=\"currentColor\">H</text><text x=\"420\" y=\"163\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"500\" fill=\"currentColor\">H du côté opposé : AB·AC = − AB × AH</text></svg>\n<h3>1. Définitions de ton cours</h3>\n<h3>1.1 Norme d'un vecteur</h3>\n<p>Si $\\vec{u}=\\overrightarrow{AB}$, la <strong>norme</strong> $\\|\\vec{u}\\|$ est la longueur $AB$.</p>\n<div class=\"retenir-box\"><strong>Exemple 1</strong> (carreaux) : $\\|\\vec{u}\\|=4$ ; pour $\\vec{v}$, on fait un triangle rectangle de côtés 4 et 2 : $\\|\\vec{v}\\|=\\sqrt{4^2+2^2}=\\sqrt{20}=2\\sqrt{5}$.</div>\n\n<h3>1.2 Produit scalaire avec un angle</h3>\n<div class=\"formula-box\">$\\vec{u}\\cdot\\vec{v}=\\|\\vec{u}\\|\\times\\|\\vec{v}\\|\\times\\cos(\\vec{u},\\vec{v})$ si $\\vec{u}\\neq\\vec{0}$ et $\\vec{v}\\neq\\vec{0}$ ; et $\\vec{u}\\cdot\\vec{v}=0$ si l'un des deux est nul.<br>Cas particulier : $\\vec{u}\\cdot\\vec{u}=\\|\\vec{u}\\|^2$ (carré scalaire), car l'angle est 0 et $\\cos 0=1$.</div>\n<p><strong>À connaître par cœur — les cosinus.</strong> Astuce : $\\cos(-\\theta)=\\cos\\theta$, donc un angle orienté négatif donne le même cosinus.</p>\n<table class=\"tbl-trig\"><tr><th>Angle (rad)</th><th>0</th><th>π/6</th><th>π/4</th><th>π/3</th><th>π/2</th><th>2π/3</th><th>3π/4</th><th>5π/6</th><th>π</th></tr>\n<tr><td>Degrés</td><td>0°</td><td>30°</td><td>45°</td><td>60°</td><td>90°</td><td>120°</td><td>135°</td><td>150°</td><td>180°</td></tr>\n<tr><td>cos</td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td><td>−1/2</td><td>−√2/2</td><td>−√3/2</td><td>−1</td></tr></table>\n<p><strong>Exemple 2.</strong> $\\|\\vec{u}\\|=2$, $\\|\\vec{v}\\|=3$, $(\\vec{u},\\vec{v})=\\frac{\\pi}{4}$ : $\\vec{u}\\cdot\\vec{v}=2\\times3\\times\\frac{\\sqrt2}{2}=3\\sqrt2$.<br>\n<strong>Exemple 3.</strong> $\\|\\vec{u}\\|=5$, $\\|\\vec{v}\\|=2$, angle $\\frac{5\\pi}{6}$ : $10\\times\\left(-\\frac{\\sqrt3}{2}\\right)=-5\\sqrt3$.<br>\n<strong>Exemple 4 (on cherche l'angle).</strong> $\\|\\vec{u}\\|=0{,}5$, $\\|\\vec{v}\\|=6$, $\\vec{u}\\cdot\\vec{v}=-3$ : $-3=0{,}5\\times6\\times\\cos(\\vec{u},\\vec{v})=3\\cos(\\vec{u},\\vec{v})$, donc $\\cos(\\vec{u},\\vec{v})=-1$ et l'angle vaut $\\pi$ : les vecteurs sont <em>opposés en direction</em>.</p>\n\n<h3>1.3 Propriétés algébriques (comme pour des nombres… presque)</h3>\n<div class=\"formula-box\"><strong>P1 (symétrie)</strong> : $\\vec{u}\\cdot\\vec{v}=\\vec{v}\\cdot\\vec{u}$.<br><strong>P2 (bilinéarité)</strong> : $\\vec{u}\\cdot(\\vec{v}+\\vec{w})=\\vec{u}\\cdot\\vec{v}+\\vec{u}\\cdot\\vec{w}$ et $\\vec{u}\\cdot(k\\vec{v})=k(\\vec{u}\\cdot\\vec{v})$.</div>\n<p><strong>Exemple 5.</strong> $3\\vec{u}\\cdot(2\\vec{v}+5\\vec{w})=3\\vec{u}\\cdot2\\vec{v}+3\\vec{u}\\cdot5\\vec{w}=6\\,\\vec{u}\\cdot\\vec{v}+15\\,\\vec{u}\\cdot\\vec{w}$. On distribue, puis on sort les nombres.</p>\n\n<h3>1.4 Vecteurs orthogonaux</h3>\n<div class=\"formula-box\">$\\vec{u}$ et $\\vec{v}$ sont orthogonaux $\\iff \\vec{u}\\cdot\\vec{v}=0$.</div>\n<p><em>Pourquoi ?</em> Si $\\vec{u}$ ou $\\vec{v}$ est nul, c'est immédiat. Sinon $\\vec{u}\\cdot\\vec{v}=0 \\iff \\cos(\\vec{u},\\vec{v})=0 \\iff (\\vec{u},\\vec{v})=\\frac{\\pi}{2}+k\\pi$, c'est-à-dire des directions perpendiculaires.</p>\n\n<h3>1.5 Produit scalaire et angle géométrique</h3>\n<div class=\"formula-box\">Pour trois points : $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=AB\\times AC\\times\\cos(\\widehat{BAC})$.</div>\n<div class=\"attention-box\"><strong>Piège n°1 : les vecteurs doivent partir du même point.</strong> $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ utilise l'angle $\\widehat{BAC}$. Mais $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$ n'utilise <em>pas</em> l'angle $\\widehat{ABC}$ : il faut « ramener » les vecteurs à la même origine, par exemple $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=-\\overrightarrow{BA}\\cdot\\overrightarrow{BC}=-BA\\times BC\\times\\cos(\\widehat{ABC})$.</div>\n<p><strong>Exemple 6</strong> : $ABC$ équilatéral de côté 6, $I$ milieu de $[BC]$ (angles de 60°, $BI=IC=3$).</p>\n<ul>\n<li>$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=6\\times6\\times\\cos60°=18$.</li>\n<li>$\\overrightarrow{IB}\\cdot\\overrightarrow{IC}$ : même droite, sens <em>contraires</em> → $3\\times3\\times\\cos180°=-9$.</li>\n<li>$\\overrightarrow{CI}\\cdot\\overrightarrow{BC}$ : $\\overrightarrow{CI}$ va de $C$ vers $B$, $\\overrightarrow{BC}$ va de $B$ vers $C$ → sens contraires : $3\\times6\\times(-1)=-18$.</li>\n<li>$\\overrightarrow{CI}\\cdot\\overrightarrow{IA}=0$ car $(AI)\\perp(BC)$ dans un triangle équilatéral.</li>\n</ul>\n\n<h3>2. Expression analytique (avec des coordonnées)</h3>\n<p>On se place dans un repère orthonormé $(O;\\vec{i},\\vec{j})$ : $\\vec{i}\\cdot\\vec{i}=1$, $\\vec{j}\\cdot\\vec{j}=1$, $\\vec{i}\\cdot\\vec{j}=0$.</p>\n<div class=\"formula-box\"><strong>Théorème</strong> : $\\vec{u}(x;y)$ et $\\vec{v}(x';y')$ ⟹ $\\vec{u}\\cdot\\vec{v}=xx'+yy'$.<br><strong>Norme</strong> : $\\|\\vec{u}\\|=\\sqrt{x^2+y^2}$.<br><strong>Orthogonalité</strong> : $\\vec{u}\\perp\\vec{v}\\iff xx'+yy'=0$.</div>\n<p><em>Démonstration expliquée.</em> $\\vec{u}\\cdot\\vec{v}=(x\\vec{i}+y\\vec{j})\\cdot(x'\\vec{i}+y'\\vec{j})$. On distribue (P2) : $xx'\\,\\vec{i}\\cdot\\vec{i}+xy'\\,\\vec{i}\\cdot\\vec{j}+yx'\\,\\vec{j}\\cdot\\vec{i}+yy'\\,\\vec{j}\\cdot\\vec{j}$. Avec $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$ et $\\vec{i}\\cdot\\vec{j}=0$, il reste $xx'+yy'$. ∎</p>\n<p><strong>Exemple 7.</strong> $\\vec{u}(3;-1)$ et $\\vec{v}(-2;3)$ : $3\\times(-2)+(-1)\\times3=-9$. Avec $A(1;-1)$, $B(3;1)$, $C(-1;3)$ : $\\overrightarrow{AB}(2;2)$, $\\overrightarrow{AC}(-2;4)$, donc $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=-4+8=4$.<br>\n<strong>Exemple 8.</strong> $\\vec{u}(3;-1)$ : $\\|\\vec{u}\\|=\\sqrt{9+1}=\\sqrt{10}$ ; $\\vec{v}(-2;3)$ : $\\|\\vec{v}\\|=\\sqrt{4+9}=\\sqrt{13}$.<br>\n<strong>Exemple 9.</strong> $\\vec{u}(-1;3)$ et $\\vec{v}(1{,}5;0{,}5)$ : $-1{,}5+1{,}5=0$ → orthogonaux.</p>\n<div class=\"retenir-box\"><strong>Méthode — mesurer un angle (exemple 10).</strong> On calcule $\\vec{u}\\cdot\\vec{v}$ <em>de deux façons</em> et on égalise.<br>\n$\\vec{u}(2;-2)$ et $\\vec{v}(2;1)$. (1) Coordonnées : $\\vec{u}\\cdot\\vec{v}=4-2=2$. (2) Cosinus : $\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta=\\sqrt8\\times\\sqrt5\\times\\cos\\theta$. Donc $\\cos\\theta=\\frac{2}{\\sqrt{40}}\\approx0{,}316$ et $\\theta=\\cos^{-1}(0{,}316)\\approx72°$ (calculatrice en <strong>degrés</strong>).</div>\n\n<h3>3. Produit scalaire et projeté orthogonal</h3>\n<div class=\"formula-box\"><strong>Théorème.</strong> $A,B,C$ non alignés, $H$ projeté orthogonal de $C$ sur $(AB)$.<br>• $\\overrightarrow{AB}$ et $\\overrightarrow{AH}$ de même sens : $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=AB\\times AH$.<br>• sens contraires : $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=-AB\\times AH$.<br><strong>Propriété</strong> : $\\cos(\\widehat{HAC})=\\dfrac{AH}{AC}$, donc $AH=AC\\times\\cos(\\widehat{HAC})$.</div>\n<p><em>Pourquoi ça marche.</em> Chasles : $\\overrightarrow{AC}=\\overrightarrow{AH}+\\overrightarrow{HC}$. Donc $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=\\overrightarrow{AB}\\cdot\\overrightarrow{AH}+\\overrightarrow{AB}\\cdot\\overrightarrow{HC}$. Le second terme vaut 0 car $(HC)\\perp(AB)$. Reste $\\overrightarrow{AB}\\cdot\\overrightarrow{AH}$ : ces deux vecteurs sont sur la même droite, donc l'angle est 0° (+) ou 180° (−). Si $\\overrightarrow{AB}\\perp\\overrightarrow{AC}$, alors $H=A$, $AH=0$ et le produit est nul.</p>\n<p><strong>Exemple 11 (figure à carreaux).</strong> Pour $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ : le projeté de $C$ sur $(AB)$ est $E$, avec $AB=4$ et $AE=1$ dans le même sens : $4\\times1=4$. Pour un produit dont le projeté est <em>à l'envers</em> (ex. $-DB\\times DE=-2\\times1$) : $-2$. <strong>Réflexe sur un quadrillage : projeter, compter les carreaux, choisir le signe.</strong></p>\n\n<h3>4. Al-Kashi (loi des cosinus)</h3>\n<p>Triangle $ABC$, $a=BC$, $b=AC$, $c=AB$.</p>\n<div class=\"formula-box\">$a^2=b^2+c^2-2bc\\cos\\widehat{A}$ ; $\\;b^2=a^2+c^2-2ac\\cos\\widehat{B}$ ; $\\;c^2=a^2+b^2-2ab\\cos\\widehat{C}$.<br>Pour un <strong>angle</strong> : $\\cos\\widehat{A}=\\dfrac{b^2+c^2-a^2}{2bc}$.</div>\n<p><em>Démonstration (celle qui était vide sur ta feuille).</em> Chasles : $\\overrightarrow{BC}=\\overrightarrow{BA}+\\overrightarrow{AC}$. Donc $a^2=BC^2=(\\overrightarrow{BA}+\\overrightarrow{AC})^2=BA^2+2\\,\\overrightarrow{BA}\\cdot\\overrightarrow{AC}+AC^2=c^2+b^2+2\\,\\overrightarrow{BA}\\cdot\\overrightarrow{AC}$. Or $\\overrightarrow{BA}\\cdot\\overrightarrow{AC}=-\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=-bc\\cos\\widehat{A}$. D'où $a^2=b^2+c^2-2bc\\cos\\widehat{A}$. ∎<br>\n<strong>Remarque.</strong> Si $\\widehat{A}=90°$, $\\cos\\widehat{A}=0$ : on retrouve Pythagore $a^2=b^2+c^2$.</p>\n<p><strong>Exemple 12.</strong> $AB=3$, $AC=8$, $\\widehat{BAC}=60°$. (1) $BC^2=9+64-2\\times3\\times8\\times\\frac12=49$ donc $BC=7$. (2) $\\cos\\widehat{ACB}=\\dfrac{AC^2+BC^2-AB^2}{2\\times AC\\times BC}=\\dfrac{64+49-9}{112}=\\dfrac{13}{14}$ donc $\\widehat{ACB}\\approx22°$.<br>\n<em>Attention :</em> sur ta feuille l'énoncé dit « triangle rectangle », mais avec ces données il ne l'est pas (s'il l'était en $B$, on aurait $\\cos\\widehat{A}=3/8$, pas $1/2$). On le traite comme un triangle quelconque.</p>\n\n<h3>5. Quelle formule pour quelle situation ?</h3>\n<table><tr><th>On te donne…</th><th>Tu utilises…</th></tr>\n<tr><td>des <strong>coordonnées</strong> (points ou vecteurs)</td><td>$xx'+yy'$ ; normes avec $\\sqrt{x^2+y^2}$</td></tr>\n<tr><td>des <strong>normes</strong> et un <strong>angle</strong></td><td>$\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos(\\vec{u},\\vec{v})$</td></tr>\n<tr><td>une <strong>figure à carreaux</strong> ou un carré / rectangle / hexagone</td><td>projeté orthogonal ($\\pm AB\\times AH$) ou un repère</td></tr>\n<tr><td><strong>3 côtés</strong> d'un triangle, on cherche un angle</td><td>Al-Kashi : $\\cos\\widehat{A}=\\frac{b^2+c^2-a^2}{2bc}$</td></tr>\n<tr><td><strong>2 côtés + l'angle entre eux</strong>, on cherche le 3ᵉ côté</td><td>Al-Kashi : $a^2=b^2+c^2-2bc\\cos\\widehat{A}$</td></tr>\n<tr><td>« montrer que… sont <strong>perpendiculaires</strong> / trouver $x$ »</td><td>produit scalaire $=0$</td></tr></table>\n\n<h3>6. Méthodes pas à pas</h3>\n<div class=\"retenir-box\"><strong>M1 — Trouver un angle.</strong> ① Calculer $\\vec{u}\\cdot\\vec{v}$ avec les coordonnées. ② Calculer les deux normes. ③ $\\cos\\theta=\\frac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\|\\vec{v}\\|}$. ④ $\\theta=\\cos^{-1}(\\ldots)$ en degrés, puis arrondir comme demandé.<br>\n<strong>M2 — Trouver $x$ pour deux vecteurs orthogonaux.</strong> ① Écrire $xx'+yy'=0$. ② Développer. ③ Résoudre (si un produit est nul : facteur nul ; si $x^2=20$ : $x=\\pm2\\sqrt5$).<br>\n<strong>M3 — Triangle isocèle / rectangle en $A$ avec des points.</strong> Rectangle en $A$ : $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=0$. Isocèle en $A$ : $AB=AC$ (calculer les deux normes).<br>\n<strong>M4 — Figure (carré, losange, hexagone).</strong> Soit on place un repère (le plus sûr), soit on repère les angles (60° dans l'hexagone régulier, 45° dans un carré avec la diagonale).<br>\n<strong>M5 — « Calculer $AH$ » avec un produit scalaire.</strong> ① Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ avec les 3 côtés (Al-Kashi). ② L'égaler à $AB\\times AH$. ③ Pythagore dans $AHC$ pour $CH$.</div>\n\n<h3>7. Les erreurs qui coûtent des points</h3>\n<div class=\"attention-box\">\n① Confondre <strong>vecteur</strong> ($\\overrightarrow{AB}$) et <strong>longueur</strong> ($AB$) : $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ est un nombre, pas un vecteur.<br>\n② Oublier la règle d'origine commune (piège de $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$).<br>\n③ Calculatrice en <strong>radians</strong> quand l'énoncé est en degrés (ou l'inverse).<br>\n④ Dire « $\\vec{u}\\cdot\\vec{v}=0$ donc $\\vec{u}=\\vec{0}$ ou $\\vec{v}=\\vec{0}$ » : <strong>faux</strong> (ils peuvent être orthogonaux).<br>\n⑤ Oublier le signe (–) quand les sens sont contraires.<br>\n⑥ Écrire « = 0 » sans justifier : montre le calcul $xx'+yy'$.<br>\n⑦ Arrondir trop tôt : garde les valeurs exactes ($\\sqrt{2}$, fractions) jusqu'au résultat final.\n</div>\n\n<h3>8. À retenir</h3>\n<div class=\"retenir-box\">$\\vec{u}\\cdot\\vec{v}=\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos(\\vec{u},\\vec{v})=xx'+yy'$ · $\\vec{u}\\cdot\\vec{u}=\\|\\vec{u}\\|^2$ · orthogonaux $\\iff \\vec{u}\\cdot\\vec{v}=0$ · $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=\\pm AB\\times AH$ · $a^2=b^2+c^2-2bc\\cos\\widehat{A}$.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p><strong>Ex 1.</strong> Dans chaque cas, calculer $\\vec{u}\\cdot\\vec{v}$.</p><ol><li>$\\|\\vec{u}\\|=2$, $\\|\\vec{v}\\|=5$, $(\\vec{u};\\vec{v})=\\frac{\\pi}{6}$</li><li>$\\|\\vec{u}\\|=3$, $\\|\\vec{v}\\|=1$, angle $\\frac{\\pi}{3}$</li><li>$\\|\\vec{u}\\|=\\frac54$, $\\|\\vec{v}\\|=\\frac15$, angle $\\frac{-2\\pi}{3}$</li><li>$\\|\\vec{u}\\|=7$, $\\|\\vec{v}\\|=\\frac12$, angle $\\frac{3\\pi}{4}$</li><li>$\\|\\vec{u}\\|=\\sqrt2$, $\\|\\vec{v}\\|=6$, angle $\\frac{-\\pi}{4}$</li><li>$\\|\\vec{u}\\|=2$, $\\|\\vec{v}\\|=5$, angle $\\frac{\\pi}{2}$</li></ol>",
   "aide": "Formule : norme × norme × cos(angle). Utilise le tableau des cosinus, et cos(−θ)=cos θ.",
   "correction": "<ol><li>$2\\times5\\times\\frac{\\sqrt3}{2}=5\\sqrt3$</li><li>$3\\times1\\times\\frac12=\\frac32$</li><li>$\\frac54\\times\\frac15\\times\\cos\\frac{2\\pi}{3}=\\frac14\\times\\left(-\\frac12\\right)=-\\frac18$</li><li>$7\\times\\frac12\\times\\left(-\\frac{\\sqrt2}{2}\\right)=-\\frac{7\\sqrt2}{4}$</li><li>$\\sqrt2\\times6\\times\\frac{\\sqrt2}{2}=6$ (car $\\sqrt2\\times\\sqrt2=2$)</li><li>$\\cos\\frac{\\pi}{2}=0$ donc $0$ (vecteurs orthogonaux)</li></ol>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 2.</strong> 1) Calculer $\\cos(\\vec{u};\\vec{v})$ : a. $\\|\\vec{u}\\|=2$, $\\|\\vec{v}\\|=3$, $\\vec{u}\\cdot\\vec{v}=-3$ ; b. $\\|\\vec{u}\\|=5$, $\\|\\vec{v}\\|=6$, $\\vec{u}\\cdot\\vec{v}=15\\sqrt2$ ; c. $\\|\\vec{u}\\|=\\frac23$, $\\|\\vec{v}\\|=6$, $\\vec{u}\\cdot\\vec{v}=-2\\sqrt3$.<br>2) Calculer $\\|\\vec{u}\\|$ : a. $\\|\\vec{v}\\|=3$, $\\vec{u}\\cdot\\vec{v}=3$, angle $\\frac{\\pi}{3}$ ; b. $\\|\\vec{v}\\|=2$, $\\vec{u}\\cdot\\vec{v}=-10$, angle $\\pi$ ; c. $\\|\\vec{v}\\|=1$, $\\vec{u}\\cdot\\vec{v}=\\frac{-1}{\\sqrt2}$, angle $\\frac{-3\\pi}{4}$.</p>",
   "aide": "On isole l'inconnue dans $\\vec{u}\\cdot\\vec{v}=\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos$. Attention aux signes.",
   "correction": "<p><strong>1)</strong> $\\cos=\\frac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\|\\vec{v}\\|}$ : a. $\\frac{-3}{6}=-\\frac12$ ; b. $\\frac{15\\sqrt2}{30}=\\frac{\\sqrt2}{2}$ ; c. $\\frac{-2\\sqrt3}{\\frac23\\times6}=\\frac{-2\\sqrt3}{4}=-\\frac{\\sqrt3}{2}$.<br><strong>2)</strong> $\\|\\vec{u}\\|=\\frac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{v}\\|\\cos\\theta}$ : a. $\\frac{3}{3\\times\\frac12}=2$ ; b. $\\frac{-10}{2\\times(-1)}=5$ ; c. $\\frac{-1/\\sqrt2}{1\\times(-\\sqrt2/2)}=\\frac{1/\\sqrt2}{\\sqrt2/2}=\\frac{1}{\\sqrt2}\\times\\frac{2}{\\sqrt2}=1$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 3.</strong> $ABC$ est un triangle. 1) Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ : a. $AB=5$, $AC=3$, $\\widehat{BAC}=30°$ ; b. $AB=1$, $AC=2$, $\\widehat{BAC}=120°$ ; c. $AB=\\frac14$, $AC=3$, $\\widehat{BAC}=45°$.<br>2) Calculer $\\widehat{BAC}$ : a. $AB=5$, $AC=4$, $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=10$ ; b. $AB=3$, $AC=4$, $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=-6\\sqrt3$ ; c. $AB=\\sqrt3$, $AC=\\sqrt6$, $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=-3$.</p>",
   "aide": "1) $AB\\times AC\\times\\cos$. 2) $\\cos\\widehat{BAC}=\\frac{\\overrightarrow{AB}\\cdot\\overrightarrow{AC}}{AB\\times AC}$ puis on reconnaît l'angle.",
   "correction": "<p><strong>1)</strong> a. $15\\cos30°=\\frac{15\\sqrt3}{2}$ ; b. $2\\cos120°=-1$ ; c. $\\frac34\\cos45°=\\frac{3\\sqrt2}{8}$.<br><strong>2)</strong> a. $\\cos=\\frac{10}{20}=\\frac12$ → $60°$ ; b. $\\cos=\\frac{-6\\sqrt3}{12}=-\\frac{\\sqrt3}{2}$ → $150°$ ; c. $\\cos=\\frac{-3}{\\sqrt3\\sqrt6}=\\frac{-3}{3\\sqrt2}=-\\frac{\\sqrt2}{2}$ → $135°$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 4.</strong> $ABCDEF$ est un hexagone régulier de centre $O$ et de côté 1. Calculer : a. $\\overrightarrow{OC}\\cdot\\overrightarrow{OD}$ ; b. $\\overrightarrow{OC}\\cdot\\overrightarrow{OE}$ ; c. $\\overrightarrow{OC}\\cdot\\overrightarrow{DE}$ ; d. $\\overrightarrow{AB}\\cdot\\overrightarrow{BE}$ ; e. $\\overrightarrow{AB}\\cdot\\overrightarrow{CF}$ ; f. $\\overrightarrow{DA}\\cdot\\overrightarrow{EB}$.</p>",
   "aide": "Les 6 triangles $OAB$, $OBC$… sont équilatéraux : $OA=OB=\\dots=1$ et les angles au centre valent 60°. Le plus sûr : placer un repère avec $O$ à l'origine.",
   "correction": "<p>Repère : $A(1;0)$, $B(\\frac12;\\frac{\\sqrt3}{2})$, $C(-\\frac12;\\frac{\\sqrt3}{2})$, $D(-1;0)$, $E(-\\frac12;-\\frac{\\sqrt3}{2})$, $F(\\frac12;-\\frac{\\sqrt3}{2})$ (l'orientation du dessin ne change pas les produits scalaires).<br>a. angle 60° : $1\\times1\\times\\frac12=\\frac12$.<br>b. angle 120° : $-\\frac12$.<br>c. $\\overrightarrow{DE}(\\frac12;-\\frac{\\sqrt3}{2})$ : $-\\frac14-\\frac34=-1$.<br>d. $\\overrightarrow{AB}(-\\frac12;\\frac{\\sqrt3}{2})$, $\\overrightarrow{BE}(-1;-\\sqrt3)$ : $\\frac12-\\frac32=-1$.<br>e. $\\overrightarrow{CF}(1;-\\sqrt3)$ : $-\\frac12-\\frac32=-2$.<br>f. $\\overrightarrow{DA}(2;0)$, $\\overrightarrow{EB}(1;\\sqrt3)$ : $2$.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><strong>Ex 5.</strong> $ABCD$ est un carré de côté 2. Calculer : a. $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ ; b. $\\overrightarrow{AC}\\cdot\\overrightarrow{BD}$ ; c. $\\overrightarrow{AB}\\cdot\\overrightarrow{AD}$ ; d. $\\overrightarrow{AB}\\cdot\\overrightarrow{CD}$.</p>",
   "aide": "Repère : $A(0;0)$, $B(2;0)$, $C(2;2)$, $D(0;2)$.",
   "correction": "<p>a. $\\overrightarrow{AB}(2;0)$, $\\overrightarrow{AC}(2;2)$ : $4$ (ou $AB\\times AB=4$ par projeté).<br>b. $\\overrightarrow{AC}(2;2)$, $\\overrightarrow{BD}(-2;2)$ : $-4+4=0$ (les diagonales d'un carré sont perpendiculaires).<br>c. $0$ (côtés perpendiculaires).<br>d. $\\overrightarrow{CD}(-2;0)$ : $-4$ (sens contraires : $2\\times2\\times\\cos180°$).</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 6.</strong> Vrai ou faux ? Justifier. <br>A1 : si $DE=3$, $DF=5$, $\\widehat{EDF}=45°$ alors $\\overrightarrow{DE}\\cdot\\overrightarrow{DF}\\approx7{,}9$.<br>A2 : si $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=7$ alors l'angle $(\\overrightarrow{AB};\\overrightarrow{AC})$ est aigu.<br>A3 : si $RS=7$, $RT=8$ et $\\overrightarrow{RS}\\cdot\\overrightarrow{RT}=-11$ alors $\\widehat{SRT}\\approx101°$.</p>",
   "aide": "Toujours recalculer : ne fais pas confiance à l'affirmation.",
   "correction": "<p><strong>A1 — Faux.</strong> $3\\times5\\times\\cos45°=\\frac{15\\sqrt2}{2}\\approx10{,}6$, pas $7{,}9$.<br><strong>A2 — Vrai.</strong> Produit scalaire positif et vecteurs non nuls ⟹ $\\cos>0$ ⟹ angle aigu.<br><strong>A3 — Vrai.</strong> $\\cos\\widehat{SRT}=\\frac{-11}{56}\\approx-0{,}196$ donc $\\widehat{SRT}\\approx101{,}3°\\approx101°$.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><strong>Ex 7.</strong> Calculer $\\vec{u}\\cdot\\vec{v}$ : 1. $\\vec{u}(-2;3)$, $\\vec{v}(5;4)$ ; 2. $\\vec{u}(1;0)$, $\\vec{v}(-3;10)$ ; 3. $\\vec{u}(\\frac12;4)$, $\\vec{v}(10;7)$ ; 4. $\\vec{u}(\\frac23;5)$, $\\vec{v}(9;-3)$ ; 5. $\\vec{u}(2;1)$, $\\vec{v}(-5;-4)$ ; 6. $\\vec{u}(-\\sqrt2;1)$, $\\vec{v}(\\sqrt3;\\sqrt6)$.</p>",
   "aide": "$xx'+yy'$, en gardant les racines exactes.",
   "correction": "<p>1. $-10+12=2$ · 2. $-3+0=-3$ · 3. $5+28=33$ · 4. $6-15=-9$ · 5. $-10-4=-14$ · 6. $-\\sqrt2\\sqrt3+\\sqrt6=-\\sqrt6+\\sqrt6=0$ (vecteurs orthogonaux).</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p><strong>Ex 8.</strong> $A(-1;2)$, $B(3;5)$, $C(7;-6)$. Calculer : a. $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ ; b. $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$ ; c. $\\overrightarrow{CB}\\cdot\\overrightarrow{CA}$.</p>",
   "aide": "Commence par les coordonnées de chaque vecteur : arrivée − départ.",
   "correction": "<p>$\\overrightarrow{AB}(4;3)$, $\\overrightarrow{AC}(8;-8)$, $\\overrightarrow{BC}(4;-11)$, $\\overrightarrow{CB}(-4;11)$, $\\overrightarrow{CA}(-8;8)$.<br>a. $32-24=8$ · b. $16-33=-17$ · c. $32+88=120$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 9.</strong> $A(0;2)$, $B(3;1)$, $C(-1;4)$. 1) Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$. 2) Calculer $AB$ et $AC$. 3) En déduire $\\widehat{BAC}$ (arrondi à l'unité).</p>",
   "aide": "Méthode M1 : produit scalaire par coordonnées, normes, puis cosinus.",
   "correction": "<p>1) $\\overrightarrow{AB}(3;-1)$, $\\overrightarrow{AC}(-1;2)$ : $-3-2=-5$.<br>2) $AB=\\sqrt{10}$, $AC=\\sqrt5$.<br>3) $\\cos\\widehat{BAC}=\\frac{-5}{\\sqrt{10}\\sqrt5}=\\frac{-5}{5\\sqrt2}=-\\frac{\\sqrt2}{2}$ donc $\\widehat{BAC}=135°$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 10.</strong> $D(-2;2)$, $E(3;-1)$, $F(2;4)$. 1) Calculer $\\overrightarrow{DE}\\cdot\\overrightarrow{DF}$, $\\overrightarrow{ED}\\cdot\\overrightarrow{EF}$, $\\overrightarrow{FD}\\cdot\\overrightarrow{FE}$. 2) Calculer $DE$, $DF$, $EF$. 3) En déduire les angles du triangle $DEF$ (à l'unité).</p>",
   "aide": "Chaque angle utilise les deux vecteurs qui partent du même sommet.",
   "correction": "<p>$\\overrightarrow{DE}(5;-3)$, $\\overrightarrow{DF}(4;2)$, $\\overrightarrow{EF}(-1;5)$.<br>1) $\\overrightarrow{DE}\\cdot\\overrightarrow{DF}=20-6=14$ ; $\\overrightarrow{ED}\\cdot\\overrightarrow{EF}=(-5;3)\\cdot(-1;5)=20$ ; $\\overrightarrow{FD}\\cdot\\overrightarrow{FE}=(-4;-2)\\cdot(1;-5)=6$.<br>2) $DE=\\sqrt{34}$, $DF=\\sqrt{20}=2\\sqrt5$, $EF=\\sqrt{26}$.<br>3) $\\cos\\widehat{D}=\\frac{14}{\\sqrt{34}\\sqrt{20}}\\approx0{,}537$ → $\\widehat{D}\\approx58°$ ; $\\cos\\widehat{E}=\\frac{20}{\\sqrt{34}\\sqrt{26}}\\approx0{,}673$ → $\\widehat{E}\\approx48°$ ; $\\cos\\widehat{F}=\\frac{6}{\\sqrt{20}\\sqrt{26}}\\approx0{,}263$ → $\\widehat{F}\\approx75°$.<br><em>Contrôle :</em> $57{,}5+47{,}7+74{,}7=180°$ (avec les arrondis à l'unité on trouve 181°, c'est normal).</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 11.</strong> 1) Dire si $\\vec{u}$ et $\\vec{v}$ sont orthogonaux : a. $(-3;2)$ et $(2;3)$ ; b. $(3;-4)$ et $(2;1{,}5)$ ; c. $(\\frac12;\\frac{-3}{4})$ et $(\\frac14;\\frac16)$ ; d. $(10^7;10^5)$ et $(10^{-4};-10^{-2})$ ; e. $(\\sqrt5;-\\sqrt{10})$ et $(2;\\sqrt2)$ ; f. $(\\sqrt3;2)$ et $(-2\\sqrt2;\\sqrt6)$.<br>2) Trouver $x$ pour que $\\vec{u}$ et $\\vec{v}$ soient orthogonaux : a. $(-5;6)$ et $(x;4)$ ; b. $(-x;3)$ et $(1;x+4)$ ; c. $(-2x;5)$ et $(x;8)$ ; d. $(7x;x+2)$ et $(x+2;x-1)$.</p>",
   "aide": "Orthogonaux ⟺ $xx'+yy'=0$. Pour la partie 2, on obtient une équation en $x$.",
   "correction": "<p><strong>1)</strong> a. $-6+6=0$ oui · b. $6-6=0$ oui · c. $\\frac18-\\frac{3}{24}=0$ oui · d. $10^{3}-10^{3}=0$ <strong>oui</strong> · e. $2\\sqrt5-\\sqrt{20}=2\\sqrt5-2\\sqrt5=0$ oui · f. $-2\\sqrt6+2\\sqrt6=0$ oui. <em>Les six paires sont orthogonales</em> (vérifie ton d : $10^7\\times10^{-4}=10^3$ et $10^5\\times(-10^{-2})=-10^3$).<br><strong>2)</strong> a. $-5x+24=0$ → $x=\\frac{24}{5}$ · b. $-x+3(x+4)=2x+12=0$ → $x=-6$ · c. $-2x^2+40=0$ → $x^2=20$ → $x=\\pm2\\sqrt5$ · d. $7x(x+2)+(x+2)(x-1)=(x+2)(8x-1)=0$ → $x=-2$ ou $x=\\frac18$.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 12.</strong> 1) $A(-3;1)$, $B(-2;4)$ : démontrer que $OAB$ est isocèle et rectangle en $A$. 2) $C(-1;-3)$, $D(2;6)$, $E(-3;1)$, $F(x;-1)$ : trouver $x$ pour que $(CD)\\perp(EF)$.</p>",
   "aide": "Rectangle en $A$ : $\\overrightarrow{AO}\\cdot\\overrightarrow{AB}=0$. Isocèle en $A$ : $AO=AB$. Deux droites sont perpendiculaires si leurs vecteurs directeurs sont orthogonaux.",
   "correction": "<p>1) $\\overrightarrow{AO}(3;-1)$ et $\\overrightarrow{AB}(1;3)$ : $\\overrightarrow{AO}\\cdot\\overrightarrow{AB}=3-3=0$ donc rectangle en $A$. $AO=\\sqrt{9+1}=\\sqrt{10}$ et $AB=\\sqrt{1+9}=\\sqrt{10}$ donc isocèle en $A$. ∎<br>2) $\\overrightarrow{CD}(3;9)$, $\\overrightarrow{EF}(x+3;-2)$. $3(x+3)-18=0$ → $x+3=6$ → $x=3$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 13.</strong> (figure de ta feuille, quadrillage) Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$, $\\overrightarrow{DE}\\cdot\\overrightarrow{DF}$, $\\overrightarrow{GH}\\cdot\\overrightarrow{GI}$ et $\\overrightarrow{KJ}\\cdot\\overrightarrow{KL}$.</p>",
   "aide": "Sur un quadrillage : projeter orthogonalement le 3ᵉ point sur la droite du 1ᵉʳ vecteur, compter les carreaux, choisir le signe (même sens : +, sens contraires : −).",
   "correction": "<p><strong>Méthode (projeté, partie 3 du cours).</strong> Pour chaque produit $\\overrightarrow{PQ}\\cdot\\overrightarrow{PR}$ : ① repérer le projeté $H$ de $R$ sur $(PQ)$ ; ② compter $PQ$ et $PH$ en carreaux ; ③ $+PQ\\times PH$ si $\\overrightarrow{PH}$ a le même sens que $\\overrightarrow{PQ}$, sinon $-PQ\\times PH$.<br><em>Exemple d'écriture :</em> $\\overrightarrow{KJ}\\cdot\\overrightarrow{KL}=-KJ\\times KH$ si $H$ est du côté opposé à $J$. Vérifie avec ta feuille : tu avais noté 4, −4, 6 et −3 ; refais chaque projeté et contrôle le signe.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 14.</strong> 1) $ABCD$ est un carré de centre $O$ et de côté 4. Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$, $\\overrightarrow{AB}\\cdot\\overrightarrow{AD}$, $\\overrightarrow{DB}\\cdot\\overrightarrow{BD}$, $\\overrightarrow{DO}\\cdot\\overrightarrow{DA}$.<br>2) $RSTU$ est un losange de centre $K$, $RT=7$, $SU=4$. Calculer $\\overrightarrow{RS}\\cdot\\overrightarrow{RT}$, $\\overrightarrow{RT}\\cdot\\overrightarrow{SU}$, $\\overrightarrow{TS}\\cdot\\overrightarrow{SU}$, $\\overrightarrow{TK}\\cdot\\overrightarrow{TS}$.</p>",
   "aide": "Carré : repère $A(0;0)$, $B(4;0)$, $C(4;4)$, $D(0;4)$. Losange : les diagonales se coupent en $K$, au milieu de chacune, à angle droit.",
   "correction": "<p><strong>1)</strong> $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=(4;0)\\cdot(4;4)=16$ · $\\overrightarrow{AB}\\cdot\\overrightarrow{AD}=0$ · $\\overrightarrow{DB}\\cdot\\overrightarrow{BD}=-BD^2=-32$ (car $BD=4\\sqrt2$) · $O(2;2)$ : $\\overrightarrow{DO}(2;-2)\\cdot\\overrightarrow{DA}(0;-4)=8$.<br><strong>2)</strong> Repère centré en $K$ : $R(-3{,}5;0)$, $T(3{,}5;0)$, $S(0;2)$, $U(0;-2)$. $\\overrightarrow{RS}(3{,}5;2)\\cdot\\overrightarrow{RT}(7;0)=24{,}5$ · $\\overrightarrow{RT}\\cdot\\overrightarrow{SU}=0$ (diagonales perpendiculaires) · $\\overrightarrow{TS}(-3{,}5;2)\\cdot\\overrightarrow{SU}(0;-4)=-8$ · $\\overrightarrow{TK}(-3{,}5;0)\\cdot\\overrightarrow{TS}(-3{,}5;2)=12{,}25$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 15.</strong> $ABC$ est isocèle en $A$ avec $AB=6$ et $BC=4$. $H$ est le projeté orthogonal de $A$ sur $[BC]$. 1) Calculer $\\overrightarrow{BA}\\cdot\\overrightarrow{BC}$. 2) Avec une autre expression du produit scalaire, donner $\\widehat{ABC}$ à $0{,}1°$ près. 3) En déduire $\\widehat{BAC}$ au degré près.</p>",
   "aide": "Dans un triangle isocèle en $A$, $H$ est le milieu de $[BC]$ : $BH=2$.",
   "correction": "<p>1) $\\overrightarrow{BA}\\cdot\\overrightarrow{BC}=BH\\times BC=2\\times4=8$ (même sens).<br>2) $\\overrightarrow{BA}\\cdot\\overrightarrow{BC}=6\\times4\\times\\cos\\widehat{ABC}=24\\cos\\widehat{ABC}=8$ → $\\cos\\widehat{ABC}=\\frac13$ → $\\widehat{ABC}\\approx70{,}5°$.<br>3) Triangle isocèle : $\\widehat{ACB}=\\widehat{ABC}$ donc $\\widehat{BAC}=180-2\\times70{,}53\\approx39°$.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 16.</strong> $AB=5$, $BC=8$, $AC=10$. 1) Déterminer $\\cos\\widehat{BAC}$. 2) $H$ est le projeté orthogonal de $C$ sur $(AB)$. En considérant $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$, calculer $AH$, puis $CH$.</p>",
   "aide": "1) Al-Kashi inversé. 2) Deux expressions de $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ : avec le cosinus et avec le projeté.",
   "correction": "<p>1) $\\cos\\widehat{BAC}=\\frac{AB^2+AC^2-BC^2}{2\\,AB\\,AC}=\\frac{25+100-64}{100}=0{,}61$.<br>2) $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=5\\times10\\times0{,}61=30{,}5$ (positif, donc $H$ du même côté que $B$). Or $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=AB\\times AH=5\\,AH$ → $AH=6{,}1$.<br>Pythagore dans $AHC$ (rectangle en $H$) : $CH^2=AC^2-AH^2=100-37{,}21=62{,}79$ donc $CH\\approx7{,}92$.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 17.</strong> $AB=6$, $BC=5$, $AC=7$. 1) Déterminer $\\cos\\widehat{ACB}$. 2) $K$ est le projeté orthogonal de $B$ sur $(AC)$. En considérant $\\overrightarrow{CA}\\cdot\\overrightarrow{CB}$, calculer $CK$, puis $BK$.</p>",
   "aide": "Même démarche que l'exercice 16, mais depuis le sommet $C$.",
   "correction": "<p>1) $\\cos\\widehat{ACB}=\\frac{CA^2+CB^2-AB^2}{2\\,CA\\,CB}=\\frac{49+25-36}{70}=\\frac{38}{70}=\\frac{19}{35}$.<br>2) $\\overrightarrow{CA}\\cdot\\overrightarrow{CB}=7\\times5\\times\\frac{19}{35}=19=CA\\times CK=7\\,CK$ → $CK=\\frac{19}{7}$.<br>Pythagore dans $BKC$ : $BK^2=25-\\frac{361}{49}=\\frac{864}{49}$ donc $BK=\\frac{12\\sqrt6}{7}\\approx4{,}20$.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>Ex 18.</strong> Une force $\\vec{F}$ s'exerce sur un wagon qui se déplace de $A$ vers $B$. 1) Pour chaque force $\\vec{F_1}$ à $\\vec{F_6}$ du schéma, dire si elle favorise, s'oppose ou n'a pas d'effet sur le mouvement. 2) Le travail est $W_{AB}(\\vec{F})=\\overrightarrow{AB}\\cdot\\vec{F}$ : que remarque-t-on ?</p>",
   "aide": "Regarde l'angle entre chaque force et $\\overrightarrow{AB}$ : aigu → favorise ; droit → aucun effet ; obtus → s'oppose.",
   "correction": "<p>Angles avec $\\overrightarrow{AB}$ (d'après le schéma) : $F_1$ : 0° ; $F_2$ : 45° ; $F_3$ : 60° ; $F_4$ : 90° ; $F_5$ : 150° ; $F_6$ : 180°.<br>1) $F_1,F_2,F_3$ <strong>favorisent</strong> (cos &gt; 0) ; $F_4$ <strong>n'a pas d'effet</strong> (perpendiculaire) ; $F_5,F_6$ <strong>s'opposent</strong> (cos &lt; 0).<br>2) $W=AB\\times F\\times\\cos\\theta$ : <strong>positif</strong> pour $F_1,F_2,F_3$, <strong>nul</strong> pour $F_4$, <strong>négatif</strong> pour $F_5,F_6$. Le signe du travail est celui du produit scalaire, et c'est le travail le plus grand quand la force est alignée avec le déplacement ($F_1$). Pour les valeurs, lis la longueur de chaque flèche en carreaux (1 carreau = 1 N) et utilise $\\cos$ ou le projeté sur $(AB)$.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 19.</strong> Un géomètre mesure un terrain $ABCD$ (voir schéma : $AB=350$ m, $AD=263{,}4$ m, diagonale $BD=500$ m, $BC=172{,}2$ m, angle droit en $C$). 1) Calculer $\\widehat{ABD}$ au degré près. 2) En déduire $AC$ au mètre près. 3) Aire du triangle $ABD$ : $\\frac12AB\\times DB\\times\\sin\\widehat{ABD}$. Calculer l'aire du terrain au m² près.</p>",
   "aide": "1) Al-Kashi inversé dans $ABD$. 2) $\\widehat{ABC}=\\widehat{ABD}+\\widehat{DBC}$, avec $\\cos\\widehat{DBC}=\\frac{BC}{BD}$ dans le triangle rectangle $BCD$, puis Al-Kashi dans $ABC$. 3) Aire $ABD$ + aire $BCD$.",
   "correction": "<p><em>(Lecture du schéma : 500 m est la diagonale $BD$ ; vérifie sur ta feuille.)</em><br>1) $\\cos\\widehat{ABD}=\\frac{AB^2+BD^2-AD^2}{2\\,AB\\,BD}=\\frac{122500+250000-69379{,}56}{350000}\\approx0{,}866$ donc $\\widehat{ABD}\\approx30°$.<br>2) Dans $BCD$ rectangle en $C$ : $\\cos\\widehat{DBC}=\\frac{172{,}2}{500}=0{,}3444$ donc $\\widehat{DBC}\\approx70°$ et $\\widehat{ABC}\\approx100°$. Al-Kashi : $AC^2=AB^2+BC^2-2\\,AB\\,BC\\cos\\widehat{ABC}\\approx 172\\,800$ donc $AC\\approx416$ m.<br>3) Aire $ABD=\\frac12\\times350\\times500\\times\\sin30°=43\\,750$ m². $CD=\\sqrt{500^2-172{,}2^2}\\approx469{,}4$ m donc aire $BCD=\\frac12\\times172{,}2\\times469{,}4\\approx40\\,416$ m². <strong>Aire du terrain ≈ 84 166 m²</strong> (environ 84 161 m² si on ne fait aucun arrondi intermédiaire : l'écart vient des arrondis).</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>Ex 20.</strong> $ABCDEF$ est un hexagone régulier de centre $O$ et de côté 2. 1) En utilisant $\\overrightarrow{BD}=\\overrightarrow{BC}+\\overrightarrow{CD}$, calculer $\\overrightarrow{BF}\\cdot\\overrightarrow{BD}$. 2) En utilisant $\\overrightarrow{FD}=\\overrightarrow{FO}+\\overrightarrow{OD}$ et $\\overrightarrow{CE}=\\overrightarrow{CO}+\\overrightarrow{OE}$, calculer $\\overrightarrow{FD}\\cdot\\overrightarrow{CE}$.</p>",
   "aide": "On décompose avec Chasles puis on distribue (propriété P2). Dans l'hexagone, les angles au centre valent 60° et $OA=OB=\\dots=2$.",
   "correction": "<p>1) $\\overrightarrow{BF}\\cdot\\overrightarrow{BD}=\\overrightarrow{BF}\\cdot\\overrightarrow{BC}+\\overrightarrow{BF}\\cdot\\overrightarrow{CD}$. Le triangle $BCF$ est rectangle en $B$ ($[CF]$ diamètre) donc $\\overrightarrow{BF}\\cdot\\overrightarrow{BC}=0$. Et $BF=2\\sqrt3$, $CD=2$, angle de $30°$ entre les deux : $2\\sqrt3\\times2\\times\\cos30°=6$. <strong>Résultat : 6.</strong><br>2) $\\overrightarrow{FD}\\cdot\\overrightarrow{CE}=\\overrightarrow{FO}\\cdot\\overrightarrow{CO}+\\overrightarrow{FO}\\cdot\\overrightarrow{OE}+\\overrightarrow{OD}\\cdot\\overrightarrow{CO}+\\overrightarrow{OD}\\cdot\\overrightarrow{OE}$ ; chaque terme vaut $2\\times2\\times\\cos(\\text{angle})$ avec des angles respectifs de 180°, 120°, 120° et 60°, on trouve $-4-2-2+2=-6$. <strong>Résultat : −6</strong> (vérifié aussi avec un repère).</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice A (4 pts)</strong> <em>(chronomètre : 45 min pour tout l'éval blanche)</em><br>1) $\\|\\vec{u}\\|=4$, $\\|\\vec{v}\\|=3$, $(\\vec{u};\\vec{v})=\\frac{2\\pi}{3}$ : calculer $\\vec{u}\\cdot\\vec{v}$. (2 pts)<br>2) $\\|\\vec{u}\\|=4$, $\\|\\vec{v}\\|=3$ et $\\vec{u}\\cdot\\vec{v}=6\\sqrt2$ : calculer $\\cos(\\vec{u};\\vec{v})$ puis donner une mesure de l'angle. (2 pts)</p>",
   "aide": "Pense au tableau des cosinus.",
   "correction": "<p>1) $4\\times3\\times\\cos\\frac{2\\pi}{3}=12\\times\\left(-\\frac12\\right)=-6$. (2 pts)<br>2) $\\cos=\\frac{6\\sqrt2}{12}=\\frac{\\sqrt2}{2}$ donc l'angle vaut $\\frac{\\pi}{4}$ (45°) (à un signe près : $\\pm\\frac{\\pi}{4}$). (2 pts)</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice B (5 pts)</strong> $A(-1;1)$, $B(3;2)$, $C(1;5)$. 1) Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$. (1,5 pt) 2) Calculer $AB$ et $AC$. (1 pt) 3) En déduire $\\widehat{BAC}$ au degré près. (1,5 pt) 4) Trouver $x$ pour que $\\vec{u}(2x;-3)$ et $\\vec{v}(6;x+1)$ soient orthogonaux. (1 pt)</p>",
   "aide": "Méthodes M1 et M2.",
   "correction": "<p>1) $\\overrightarrow{AB}(4;1)$, $\\overrightarrow{AC}(2;4)$ : $8+4=12$. (1,5)<br>2) $AB=\\sqrt{17}$, $AC=\\sqrt{20}=2\\sqrt5$. (1)<br>3) $\\cos\\widehat{BAC}=\\frac{12}{\\sqrt{17}\\sqrt{20}}=\\frac{6}{\\sqrt{85}}\\approx0{,}651$ donc $\\widehat{BAC}\\approx49°$. (1,5)<br>4) $2x\\times6+(-3)(x+1)=9x-3=0$ donc $x=\\frac13$. (1)</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice C (5 pts)</strong> Triangle $ABC$ avec $AB=4$, $AC=6$, $\\widehat{BAC}=60°$. 1) Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$. (1 pt) 2) Calculer $BC$ (valeur exacte). (2 pts) 3) Calculer $\\widehat{ABC}$ au degré près. (2 pts)</p>",
   "aide": "Al-Kashi, puis Al-Kashi inversé (ou produit scalaire).",
   "correction": "<p>1) $4\\times6\\times\\cos60°=12$. (1)<br>2) $BC^2=16+36-2\\times4\\times6\\times\\frac12=28$ donc $BC=2\\sqrt7\\approx5{,}29$. (2)<br>3) $\\cos\\widehat{ABC}=\\frac{AB^2+BC^2-AC^2}{2\\,AB\\,BC}=\\frac{16+28-36}{16\\sqrt7}=\\frac{1}{2\\sqrt7}\\approx0{,}189$ donc $\\widehat{ABC}\\approx79°$. (2)</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice D (4 pts)</strong> $ABCD$ est un rectangle avec $AB=5$ et $AD=3$. Calculer $\\overrightarrow{AC}\\cdot\\overrightarrow{AB}$, $\\overrightarrow{AC}\\cdot\\overrightarrow{AD}$ et $\\overrightarrow{AC}\\cdot\\overrightarrow{BD}$. Expliquer la méthode choisie.</p>",
   "aide": "Repère $A(0;0)$, $B(5;0)$, $D(0;3)$ ou projeté orthogonal.",
   "correction": "<p>Repère : $\\overrightarrow{AC}(5;3)$, $\\overrightarrow{AB}(5;0)$, $\\overrightarrow{AD}(0;3)$, $\\overrightarrow{BD}(-5;3)$.<br>$\\overrightarrow{AC}\\cdot\\overrightarrow{AB}=25$ (projeté de $C$ sur $(AB)$ = $B$ : $5\\times5$) · $\\overrightarrow{AC}\\cdot\\overrightarrow{AD}=9$ ($3\\times3$) · $\\overrightarrow{AC}\\cdot\\overrightarrow{BD}=-25+9=-16$. (1 pt par résultat, 1 pt pour la méthode)</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p><strong>ÉVAL BLANCHE — Exercice E (2 pts)</strong> Vrai ou faux ? Justifier. (a) Si $\\vec{u}\\cdot\\vec{v}=0$ alors $\\vec{u}=\\vec{0}$ ou $\\vec{v}=\\vec{0}$. (b) Si $\\vec{u}\\cdot\\vec{v}<0$ (vecteurs non nuls), l'angle $(\\vec{u};\\vec{v})$ est obtus.</p>",
   "aide": "Pense aux vecteurs orthogonaux.",
   "correction": "<p>(a) <strong>Faux</strong> : deux vecteurs non nuls peuvent être orthogonaux, par exemple $\\vec{i}$ et $\\vec{j}$ ($\\vec{i}\\cdot\\vec{j}=0$). (1)<br>(b) <strong>Vrai</strong> : $\\|\\vec{u}\\|\\|\\vec{v}\\|>0$ donc le signe est celui de $\\cos$ ; $\\cos<0$ signifie angle obtus. (1)<br><strong>Barème total : 20 points</strong> (A 4 + B 5 + C 5 + D 4 + E 2).</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Le produit scalaire de deux vecteurs, c'est un vecteur ou un nombre ?",
   "a": "Un nombre (réel). Jamais un vecteur, malgré le mot « produit »."
  },
  {
   "q": "Définition du produit scalaire avec un angle",
   "a": "u⃗·v⃗ = ‖u⃗‖ × ‖v⃗‖ × cos(u⃗, v⃗) si u⃗ ≠ 0⃗ et v⃗ ≠ 0⃗. Et u⃗·v⃗ = 0 si l'un des deux est nul."
  },
  {
   "q": "Que vaut la norme ‖u⃗‖ si u⃗ = AB⃗ ?",
   "a": "La longueur AB."
  },
  {
   "q": "Que vaut u⃗·u⃗ ?",
   "a": "‖u⃗‖² (carré scalaire), car l'angle est 0 et cos 0 = 1."
  },
  {
   "q": "Signe de u⃗·v⃗ quand l'angle est aigu",
   "a": "Positif (cos > 0)."
  },
  {
   "q": "Signe de u⃗·v⃗ quand l'angle est obtus",
   "a": "Négatif (cos < 0)."
  },
  {
   "q": "Que signifie u⃗·v⃗ = 0 ?",
   "a": "Les vecteurs sont orthogonaux (perpendiculaires) — ou l'un d'eux est nul."
  },
  {
   "q": "Propriété de symétrie du produit scalaire",
   "a": "u⃗·v⃗ = v⃗·u⃗"
  },
  {
   "q": "Propriété de bilinéarité",
   "a": "u⃗·(v⃗ + w⃗) = u⃗·v⃗ + u⃗·w⃗ et u⃗·(k v⃗) = k (u⃗·v⃗)"
  },
  {
   "q": "Développer 3u⃗·(2v⃗ + 5w⃗)",
   "a": "6 u⃗·v⃗ + 15 u⃗·w⃗ (on distribue, puis on sort les nombres)."
  },
  {
   "q": "Formule du produit scalaire avec des coordonnées",
   "a": "u⃗(x ; y) et v⃗(x' ; y') : u⃗·v⃗ = xx' + yy' (repère orthonormé)."
  },
  {
   "q": "Norme d'un vecteur en coordonnées",
   "a": "‖u⃗‖ = √(x² + y²) si u⃗(x ; y) (repère orthonormé)."
  },
  {
   "q": "Condition d'orthogonalité avec des coordonnées",
   "a": "xx' + yy' = 0"
  },
  {
   "q": "Dans un repère orthonormé (O; i⃗, j⃗), que valent i⃗·i⃗, j⃗·j⃗ et i⃗·j⃗ ?",
   "a": "i⃗·i⃗ = 1, j⃗·j⃗ = 1, i⃗·j⃗ = 0."
  },
  {
   "q": "AB⃗·AC⃗ avec l'angle géométrique",
   "a": "AB⃗·AC⃗ = AB × AC × cos(BAC)"
  },
  {
   "q": "Piège : AB⃗·BC⃗ utilise-t-il l'angle ABC ?",
   "a": "Non. Il faut ramener les vecteurs à la même origine : AB⃗·BC⃗ = −BA⃗·BC⃗ = −BA × BC × cos(ABC)."
  },
  {
   "q": "Théorème du projeté orthogonal (même sens)",
   "a": "H = projeté de C sur (AB). Si AB⃗ et AH⃗ ont le même sens : AB⃗·AC⃗ = AB × AH."
  },
  {
   "q": "Théorème du projeté orthogonal (sens contraires)",
   "a": "Si AB⃗ et AH⃗ sont de sens contraires : AB⃗·AC⃗ = −AB × AH."
  },
  {
   "q": "Si AB⃗ et AC⃗ sont orthogonaux, où est H et que vaut AB⃗·AC⃗ ?",
   "a": "H = A, donc AH = 0 et AB⃗·AC⃗ = 0."
  },
  {
   "q": "Dans le triangle AHC rectangle en H, que vaut cos(HAC) ?",
   "a": "cos(HAC) = AH / AC, donc AH = AC × cos(HAC)."
  },
  {
   "q": "Théorème d'Al-Kashi",
   "a": "a² = b² + c² − 2bc cos(A), avec a = BC, b = AC, c = AB (et de même en permutant)."
  },
  {
   "q": "Al-Kashi quand l'angle vaut 90°",
   "a": "cos 90° = 0 : on retrouve Pythagore, a² = b² + c²."
  },
  {
   "q": "Quand utiliser Al-Kashi pour trouver un côté ?",
   "a": "Quand on connaît 2 côtés et l'angle entre eux."
  },
  {
   "q": "Formule d'Al-Kashi pour trouver un angle",
   "a": "cos(A) = (b² + c² − a²) / (2bc) (on connaît les 3 côtés)."
  },
  {
   "q": "Démonstration d'Al-Kashi : quelle relation utilise-t-on ?",
   "a": "Chasles : BC⃗ = BA⃗ + AC⃗, puis on élève au carré : BC² = BA² + AC² + 2 BA⃗·AC⃗, avec BA⃗·AC⃗ = −bc cos(A)."
  },
  {
   "q": "Comment mesurer un angle avec deux vecteurs ?",
   "a": "On calcule u⃗·v⃗ de deux façons (coordonnées, et normes × cos) puis on égalise : cos θ = u⃗·v⃗ / (‖u⃗‖‖v⃗‖)."
  },
  {
   "q": "cos(π/6) et cos(30°)",
   "a": "√3 / 2"
  },
  {
   "q": "cos(π/4) et cos(45°)",
   "a": "√2 / 2"
  },
  {
   "q": "cos(π/3) et cos(60°)",
   "a": "1/2"
  },
  {
   "q": "cos(π/2) et cos(90°)",
   "a": "0"
  },
  {
   "q": "cos(2π/3) et cos(120°)",
   "a": "−1/2"
  },
  {
   "q": "cos(3π/4) et cos(135°)",
   "a": "−√2 / 2"
  },
  {
   "q": "cos(5π/6) et cos(150°)",
   "a": "−√3 / 2"
  },
  {
   "q": "cos(π) et cos(180°)",
   "a": "−1"
  },
  {
   "q": "cos(−θ) = ?",
   "a": "cos(θ). Un angle orienté négatif donne le même cosinus."
  },
  {
   "q": "π radians en degrés ?",
   "a": "180°. Donc π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°."
  },
  {
   "q": "Réflexe : on te donne des coordonnées. Quelle formule ?",
   "a": "xx' + yy' (et √(x² + y²) pour les normes)."
  },
  {
   "q": "Réflexe : on te donne des normes et un angle. Quelle formule ?",
   "a": "‖u⃗‖ × ‖v⃗‖ × cos(angle)."
  },
  {
   "q": "Réflexe : figure à carreaux, carré ou hexagone. Quelle méthode ?",
   "a": "Projeté orthogonal (± AB × AH) ou un repère avec des coordonnées."
  },
  {
   "q": "Réflexe : on te donne 3 côtés et on cherche un angle. Quelle formule ?",
   "a": "Al-Kashi inversé : cos(A) = (b² + c² − a²) / (2bc)."
  },
  {
   "q": "Comment trouver x pour que deux vecteurs soient orthogonaux ?",
   "a": "Écrire xx' + yy' = 0, développer, résoudre l'équation."
  },
  {
   "q": "Comment prouver qu'un triangle OAB est rectangle en A ?",
   "a": "Montrer que AO⃗·AB⃗ = 0 (calcul avec coordonnées)."
  },
  {
   "q": "Comment prouver qu'il est isocèle en A ?",
   "a": "Montrer que AO = AB (calculer les deux normes)."
  },
  {
   "q": "Travail d'une force F⃗ pour un déplacement de A vers B",
   "a": "W = AB⃗·F⃗ (en joules si AB en m et F en N)."
  },
  {
   "q": "Une force perpendiculaire au déplacement : quel travail ?",
   "a": "Nul (cos 90° = 0)."
  },
  {
   "q": "u⃗·v⃗ = 0 implique-t-il u⃗ = 0⃗ ou v⃗ = 0⃗ ?",
   "a": "Non ! Deux vecteurs non nuls peuvent être orthogonaux (i⃗·j⃗ = 0)."
  },
  {
   "q": "Calculatrice : pour retrouver un angle en degrés, que faut-il vérifier ?",
   "a": "Que la calculatrice est en mode DEGRÉS, puis utiliser cos⁻¹ (arccos)."
  },
  {
   "q": "Aire d'un triangle avec un angle",
   "a": "A = ½ × AB × AD × sin(angle entre AB et AD)."
  },
  {
   "q": "Avant d'arrondir un résultat, que faut-il faire ?",
   "a": "Garder les valeurs exactes (√, fractions) jusqu'à la fin, arrondir seulement le résultat final."
  }
 ]
},

};
