/* ============================================================
   BACMASTER — data/maths.js
   Cours et flashcards — Maths
   ============================================================ */

PREBUILT['Maths'] = {

'Fonctions — généralités': {
cours:`<h3>Qu'est-ce qu'une fonction ?</h3>
<p>Une <strong>fonction</strong> $f$ associe à chaque nombre $x$ d'un ensemble de départ <mark>au plus un</mark> nombre $y$, noté $f(x)$. On écrit $f : x \\mapsto f(x)$.</p>
<div class="formula-box">$y = f(x)$ : <strong>y</strong> est l'<mark>image</mark> de x par f. <strong>x</strong> est un <mark>antécédent</mark> de y par f.</div>


<h3>Ensemble de définition</h3>
<p>C'est l'ensemble des valeurs de $x$ pour lesquelles $f(x)$ <mark>existe et a un sens</mark>. Deux cas classiques à surveiller :</p>
<ul>
<li>Une <strong>fraction</strong> : le dénominateur ne doit jamais être égal à 0.</li>
<li>Une <strong>racine carrée</strong> : l'expression sous la racine doit être positive ou nulle.</li>
</ul>

<h3>Taux de variation (accroissement moyen)</h3>
<div class="formula-box">Taux de variation de $f$ entre $a$ et $b$ (avec $a \\neq b$) : $\\tau = \\dfrac{f(b)-f(a)}{b-a}$</div>
<p>Il mesure de combien $f(x)$ varie <mark>en moyenne</mark> pour chaque unité de $x$, entre les points d'abscisses $a$ et $b$. Géométriquement, c'est exactement le <strong>coefficient directeur (la pente) de la sécante</strong> — la droite qui relie les deux points $A(a;f(a))$ et $B(b;f(b))$ de la courbe.</p>
<div class="retenir-box">Le signe du taux de variation donne directement le sens de variation <em>entre ces deux points précis</em> : <mark>positif</mark> → f augmente globalement entre a et b ; <mark>négatif</mark> → f diminue globalement entre a et b. Sans même calculer sa valeur exacte, on peut souvent donner son signe si on connaît déjà le tableau de variations de f sur cet intervalle.</div>
<div class="attention-box">Ne confonds pas avec le <em>nombre dérivé</em> (vu en dérivation) : le taux de variation se calcule entre deux points <strong>distincts</strong> (a et b), c'est une moyenne sur tout un intervalle. Le nombre dérivé f'(a) est la limite de ce taux quand b se rapproche infiniment près de a — c'est une variation <em>instantanée</em>, en un seul point.</div>
<p>Dans un contexte concret (économie, physique...), le taux de variation s'interprète toujours avec les unités du problème : par exemple, si f(x) est un bénéfice en euros en fonction de x articles vendus, le taux de variation entre 20 et 25 articles s'interprète comme "le bénéfice augmente en moyenne de [valeur] € par article vendu, entre 20 et 25 articles".</p>

<h3>Tableau de signes (méthode générale)</h3>
<p>Pour étudier le signe d'un produit ou d'un quotient d'expressions (par exemple $(5x-2)(-3x+1)$ ou $\\dfrac{-4x+5}{5x-3}$), la méthode est toujours la même :</p>
<ol>
<li>Étudier le signe de <strong>chaque facteur séparément</strong> (chacun est une simple expression affine $ax+b$, positive après sa racine si $a>0$, négative avant).</li>
<li>Reporter tous les signes dans un <strong>même tableau</strong>, aligné sur les mêmes valeurs de x (dans l'ordre croissant).</li>
<li><strong>Multiplier les signes</strong> colonne par colonne (règle des signes : + × + = + ; − × − = + ; + × − = −).</li>
</ol>
<div class="attention-box">Pour un <mark>quotient</mark>, la méthode est identique, mais il faut en plus exclure la valeur qui annule le <strong>dénominateur</strong> (le quotient n'est jamais défini à cet endroit — on met une double barre dans le tableau, jamais un simple 0).</div>

<h3>Courbe représentative</h3>
<p>La courbe représentative $C_f$ d'une fonction $f$ dans un repère est l'ensemble des points de coordonnées $(x ; f(x))$. Lire graphiquement $f(a)$ = lire l'ordonnée du point de la courbe d'abscisse $a$.</p>

<h3>Sens de variation</h3>
<div class="formula-box">
Une fonction est <strong>croissante</strong> sur un intervalle I si : pour tous $a$ et $b$ de I, $a < b \\Rightarrow f(a) < f(b)$ (l'ordre est conservé).<br>
Une fonction est <strong>décroissante</strong> sur I si : $a < b \\Rightarrow f(a) > f(b)$ (l'ordre est inversé).
</div>
<p>On résume les variations dans un <strong>tableau de variations</strong>, avec des flèches montantes (croissante) ou descendantes (décroissante).</p>

<h3>Les fonctions de référence</h3>
<div class="formula-box">
<strong>Fonction affine</strong> : $f(x) = ax + b$ — droite, $a$ = coefficient directeur (pente), $b$ = ordonnée à l'origine.<br>
<strong>Fonction carré</strong> : $f(x) = x^2$ — parabole, décroissante sur $]-\\infty;0]$, croissante sur $[0;+\\infty[$, minimum en 0.<br>
<strong>Fonction inverse</strong> : $f(x) = \\dfrac{1}{x}$ — définie sur $\\mathbb{R}^*$, décroissante sur $]-\\infty;0[$ et sur $]0;+\\infty[$ (mais pas sur tout $\\mathbb{R}^*$ en un seul bloc !).
</div>
<div class="retenir-box">Piège classique sur la fonction inverse : elle est décroissante sur <mark>chacun</mark> des deux intervalles $]-\\infty;0[$ et $]0;+\\infty[$, mais on ne peut PAS dire qu'elle est "décroissante sur $\\mathbb{R}^*$" globalement, car elle passe d'une branche à l'autre en "sautant" (elle n'est pas définie en 0).</div>

<h3>Résolution graphique</h3>
<p>Résoudre $f(x) = k$ graphiquement : chercher les abscisses des points de la courbe ayant pour ordonnée $k$ (intersection avec la droite horizontale $y=k$).<br>
Résoudre $f(x) \\leq k$ : chercher les abscisses où la courbe est en dessous (ou sur) la droite $y=k$.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Soit $f(x) = 2x - 3$. Calcule $f(4)$, puis détermine si 5 est l'image de 4 par f.</p>`, aide:`Remplace x par 4 dans l'expression de f(x), puis compare le résultat à 5.`, correction:`<p>$f(4) = 2 \\times 4 - 3 = 8 - 3 = 5$</p><p>Oui, <strong>5 est bien l'image de 4</strong> par f, puisque $f(4) = 5$.</p>`},
{niveau:'Moyen', enonce:`<p>Détermine l'ensemble de définition de la fonction $f(x) = \\dfrac{1}{x-3}$.</p>`, aide:`Le dénominateur ne doit jamais être égal à 0. Résous x-3=0 pour trouver la valeur interdite.`, correction:`<p>Le dénominateur $x-3$ doit être différent de 0 : $x - 3 \\neq 0 \\Leftrightarrow x \\neq 3$</p><p>Ensemble de définition : $D_f = \\mathbb{R} \\setminus \\{3\\}$, soit $]-\\infty;3[ \\cup ]3;+\\infty[$</p>`},
{niveau:'Difficile', enonce:`<p>Soit $f(x) = \\sqrt{5-2x}$. Détermine l'ensemble de définition de f, puis calcule $f(-2)$.</p>`, aide:`L'expression sous la racine doit être positive ou nulle. Résous l'inéquation 5-2x ≥ 0.`, correction:`<p>Il faut $5 - 2x \\geq 0 \\Leftrightarrow -2x \\geq -5 \\Leftrightarrow x \\leq \\frac{5}{2}$ (on divise par un nombre négatif, donc le sens de l'inégalité s'inverse).</p><p>$D_f = ]-\\infty ; \\frac{5}{2}]$</p><p>$f(-2) = \\sqrt{5-2\\times(-2)} = \\sqrt{5+4} = \\sqrt{9} = 3$</p>`},
{niveau:'Facile', enonce:`<p>Soit $f(x) = x^2$. Calcule le taux de variation de f entre 2 et 5.</p>`, aide:`Utilise directement la formule τ = (f(b)-f(a))/(b-a) avec a=2 et b=5.`, correction:`<p>$f(2) = 4$ et $f(5) = 25$.</p><p>$\\tau = \\dfrac{f(5)-f(2)}{5-2} = \\dfrac{25-4}{3} = \\dfrac{21}{3} = 7$</p><p>En moyenne, f augmente de 7 unités par unité de x, entre 2 et 5.</p>`},
{niveau:'Moyen', enonce:`<p>Une entreprise modélise son bénéfice (en centaines d'euros) par $f(x) = -2x^2+90x-400$ pour $x$ articles vendus. Calcule le taux de variation de f entre 4 et 9, puis interprète le résultat dans le contexte de l'énoncé.</p>`, aide:`Calcule d'abord f(4) et f(9), puis applique la formule du taux de variation. Pour l'interprétation, pense aux unités : centaines d'euros par article vendu.`, correction:`<p>$f(4) = -2(16)+90(4)-400 = -32+360-400 = -72$</p><p>$f(9) = -2(81)+90(9)-400 = -162+810-400 = 248$</p><p>$\\tau = \\dfrac{248-(-72)}{9-4} = \\dfrac{320}{5} = 64$</p><p><strong>Interprétation</strong> : entre 4 et 9 articles vendus, le bénéfice augmente en moyenne de 64 centaines d'euros (soit 6400€) par article vendu supplémentaire.</p>`},
{niveau:'Difficile', enonce:`<p>Résous l'inéquation $(5x-2)(-3x+1) > 0$ à l'aide d'un tableau de signes.</p>`, aide:`Étudie séparément le signe de chaque facteur (5x-2) et (-3x+1), trouve leur racine respective, place-les dans l'ordre croissant sur une même ligne, puis multiplie les signes colonne par colonne.`, correction:`<p><strong>Facteur 1</strong> : $5x-2=0 \\Leftrightarrow x=\\frac{2}{5}$. Positif après $\\frac{2}{5}$ (car a=5>0), négatif avant.</p><p><strong>Facteur 2</strong> : $-3x+1=0 \\Leftrightarrow x=\\frac{1}{3}$. Négatif après $\\frac{1}{3}$ (car a=-3<0), positif avant.</p><p>Dans l'ordre croissant : $\\frac{1}{3} < \\frac{2}{5}$. En multipliant les signes sur chaque intervalle ($]-\\infty;\\frac{1}{3}[$, $]\\frac{1}{3};\\frac{2}{5}[$, $]\\frac{2}{5};+\\infty[$) : négatif, positif, négatif.</p><p>Solution de $(5x-2)(-3x+1)>0$ : $x \\in \\left]\\dfrac{1}{3};\\dfrac{2}{5}\\right[$</p>`},
],
flashcards:[
{q:'Image et antécédent — différence',a:'Si y=f(x), y est l\'image de x (une seule possible), x est un antécédent de y (il peut y en avoir plusieurs).'},
{q:'Ensemble de définition — cas d\'une fraction',a:'Le dénominateur ne doit jamais être égal à 0.'},
{q:'Ensemble de définition — cas d\'une racine carrée',a:'L\'expression sous la racine doit être positive ou nulle (≥ 0).'},
{q:'Fonction croissante — définition',a:'Pour tous a et b de l\'intervalle I, si a<b alors f(a)<f(b) : l\'ordre est conservé.'},
{q:'Fonction décroissante — définition',a:'Pour tous a et b de l\'intervalle I, si a<b alors f(a)>f(b) : l\'ordre est inversé.'},
{q:'Fonction affine — forme générale',a:'f(x) = ax + b. Représentation graphique : une droite. a = coefficient directeur, b = ordonnée à l\'origine.'},
{q:'Fonction carré — variations',a:'Décroissante sur ]-∞;0], croissante sur [0;+∞[. Minimum en x=0 (f(0)=0). Courbe : une parabole.'},
{q:'Fonction inverse — ensemble de définition et variations',a:'Définie sur ℝ* (x≠0). Décroissante sur ]-∞;0[ et décroissante sur ]0;+∞[ séparément (pas globalement sur ℝ*).'},
{q:'Lire f(a) graphiquement',a:'C\'est l\'ordonnée du point de la courbe représentative dont l\'abscisse est a.'},
{q:'Résoudre f(x)=k graphiquement',a:'Chercher les abscisses des points d\'intersection entre la courbe de f et la droite horizontale y=k.'},
{q:'Formule du taux de variation de f entre a et b',a:'τ = (f(b)-f(a))/(b-a)'},
{q:'Interprétation géométrique du taux de variation',a:'C\'est le coefficient directeur (la pente) de la sécante qui relie les points A(a;f(a)) et B(b;f(b)) de la courbe.'},
{q:'Différence entre taux de variation et nombre dérivé',a:'Le taux de variation se calcule entre deux points distincts (variation moyenne sur un intervalle). Le nombre dérivé est sa limite quand les deux points se rapprochent infiniment (variation instantanée en un seul point).'},
{q:'Méthode générale pour un tableau de signes (produit ou quotient)',a:'Étudier le signe de chaque facteur séparément, les reporter dans un même tableau aligné, puis multiplier les signes colonne par colonne.'},
{q:'Tableau de signes d\'un quotient — piège à ne pas oublier',a:'Exclure la valeur qui annule le dénominateur (double barre dans le tableau, jamais un simple 0) — le quotient n\'y est pas défini.'},
]},

'Second degré': {
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
 correction:"<p>Périmètre = 24 → L + l = 12 → l = 12 − L. Notons L = x.</p><p>Aire : $x(12-x) = 35 \\Leftrightarrow 12x - x^2 = 35 \\Leftrightarrow -x^2 + 12x - 35 = 0 \\Leftrightarrow x^2 - 12x + 35 = 0$</p><p>Δ = 144 − 140 = 4. Racines : $x_1 = \\frac{12-2}{2} = 5$ et $x_2 = \\frac{12+2}{2} = 7$.</p><p>Le rectangle mesure donc <strong>5 cm sur 7 cm</strong> (les deux solutions correspondent à L et l inversés — même rectangle).</p>"},
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
 correction:"<p><strong>1)</strong> $a = -2 < 0$ : le maximum est atteint en $\\alpha = \\dfrac{-60}{-4} = 15$ et vaut $B(15) = -450 + 900 - 350 = 100$. Le bénéfice maximal est de <strong>100 centaines d'euros</strong> (10 000 €) pour <strong>1 500 objets</strong>.</p><p><strong>2)</strong> $\\Delta = 3600 - 4\\times(-2)\\times(-350) = 3600 - 2800 = 800 = 400 \\times 2$, donc $\\sqrt{\\Delta} = 20\\sqrt{2}$.</p><p>Racines : $x = \\dfrac{-60 \\mp 20\\sqrt{2}}{-4} = 15 \\pm 5\\sqrt{2}$, soit environ $7{,}93$ et $22{,}07$.</p><p>Comme $a < 0$, $B(x) > 0$ <em>entre</em> les racines : l'entreprise est rentable pour $x \\in\\ ]15 - 5\\sqrt2\\,;\\,15 + 5\\sqrt2[$, soit environ de <strong>794 à 2 206 objets</strong>. <em>Contrôle : $B(8) = 2 > 0$ et $B(7) = -28 < 0$ ✓.</em></p>"},
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
'Dérivation': {
cours:"<div class=\"attention-box\">La dérivation, c'est <strong>la vitesse à laquelle une fonction change</strong>. C'est l'outil qui permet de trouver où une fonction monte, où elle descend, et où elle atteint son maximum ou son minimum — donc de résoudre des problèmes d'optimisation (coût minimal, aire maximale…). Il n'y a pas de magie : une fois les règles connues, c'est surtout de la méthode.</div>\n\n<h3>1. L'idée : du taux de variation au nombre dérivé</h3>\n<p>Le <strong>taux de variation</strong> de $f$ entre $a$ et $a+h$ est la pente de la sécante : $\\dfrac{f(a+h) - f(a)}{h}$. Quand $h$ devient <em>très petit</em>, la sécante se rapproche de la <strong>tangente</strong> et ce taux se rapproche d'un nombre : le <mark>nombre dérivé</mark> $f'(a)$.</p>\n<div class=\"formula-box\">$f'(a) = $ pente de la tangente à la courbe au point d'abscisse $a$ = taux de variation « instantané » en $a$.</div>\n<p><strong>Exemple.</strong> $f(x) = x^2$ et $a = 3$ : $\\dfrac{(3+h)^2 - 9}{h} = \\dfrac{6h + h^2}{h} = 6 + h$. Quand $h \\to 0$, on trouve $6$. Donc $f'(3) = 6$ — et on retrouvera bien $f'(x) = 2x$, soit $2\\times 3 = 6$ ✓.</p>\n\n<h3>2. Équation de la tangente</h3>\n<div class=\"formula-box\">Tangente en $a$ : $y = f'(a)\\,(x - a) + f(a)$</div>\n<p><strong>Exemple.</strong> $f(x) = x^2 - 3x + 1$ en $a = 2$ : $f(2) = 4 - 6 + 1 = -1$, $f'(x) = 2x - 3$ donc $f'(2) = 1$. Tangente : $y = 1\\times(x-2) + (-1) = x - 3$.</p>\n<div class=\"retenir-box\">Les 3 étapes : <strong>(1)</strong> calculer $f(a)$ ; <strong>(2)</strong> calculer $f'(x)$ puis $f'(a)$ ; <strong>(3)</strong> remplacer dans la formule. Si la tangente est <mark>horizontale</mark>, alors $f'(a) = 0$.</div>\n\n<h3>3. Dérivées usuelles</h3>\n<table class=\"formula-table\">\n<tr><th>$f(x)$</th><th>$f'(x)$</th><th>Remarque</th></tr>\n<tr><td>$k$ (constante)</td><td>$0$</td><td></td></tr>\n<tr><td>$x$</td><td>$1$</td><td></td></tr>\n<tr><td>$x^2$</td><td>$2x$</td><td></td></tr>\n<tr><td>$x^3$</td><td>$3x^2$</td><td></td></tr>\n<tr><td>$x^n$</td><td>$n\\,x^{n-1}$</td><td>$n$ entier</td></tr>\n<tr><td>$\\dfrac{1}{x}$</td><td>$-\\dfrac{1}{x^2}$</td><td>sur $\\mathbb{R}^*$</td></tr>\n<tr><td>$\\sqrt{x}$</td><td>$\\dfrac{1}{2\\sqrt{x}}$</td><td>sur $]0\\,;+\\infty[$</td></tr>\n<tr><td>$\\sin x$</td><td>$\\cos x$</td><td></td></tr>\n<tr><td>$\\cos x$</td><td>$-\\sin x$</td><td></td></tr>\n<tr><td>$e^x$</td><td>$e^x$</td><td></td></tr>\n<tr><td>$\\ln x$</td><td>$\\dfrac{1}{x}$</td><td>sur $]0\\,;+\\infty[$</td></tr>\n</table>\n\n<h3>4. Règles de calcul</h3>\n<div class=\"formula-box latex-block\">$(u+v)' = u' + v'$ &nbsp;&nbsp; $(k\\,u)' = k\\,u'$<br>\n$(u\\,v)' = u'v + u\\,v'$ &nbsp;&nbsp; $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - u\\,v'}{v^2}$<br>\n$\\big(g(ax+b)\\big)' = a\\,g'(ax+b)$ &nbsp;&nbsp; $(u^n)' = n\\,u'\\,u^{n-1}$</div>\n<div class=\"attention-box\">Attention : $(u\\,v)' \\neq u'\\,v'$ ! La dérivée d'un produit n'est <strong>pas</strong> le produit des dérivées (ni pour le quotient). Teste : $(x\\times x)' = (x^2)' = 2x$, alors que $x' \\times x' = 1$.</div>\n<p><strong>Méthode pour un produit ou un quotient :</strong> écris d'abord un petit tableau $u,\\ u',\\ v,\\ v'$, <em>puis</em> applique la formule. Tu évites 90 % des erreurs.</p>\n<p><strong>Produit.</strong> $f(x) = x^2(3x - 1)$ : $u = x^2$, $u' = 2x$, $v = 3x-1$, $v' = 3$. $f'(x) = 2x(3x-1) + x^2\\times 3 = 6x^2 - 2x + 3x^2 = 9x^2 - 2x$. <em>Vérification : $f(x) = 3x^3 - x^2$, donc $f'(x) = 9x^2 - 2x$ ✓.</em></p>\n<p><strong>Quotient.</strong> $f(x) = \\dfrac{2x+1}{x+3}$ : $u = 2x+1$, $u' = 2$, $v = x+3$, $v' = 1$. $f'(x) = \\dfrac{2(x+3) - (2x+1)\\times 1}{(x+3)^2} = \\dfrac{5}{(x+3)^2}$. Le numérateur est positif et le carré aussi : $f$ est croissante sur chaque intervalle où elle est définie.</p>\n<p><strong>Puissance de $ax+b$.</strong> $f(x) = (3x+2)^4$ : $f'(x) = 4\\times 3\\times(3x+2)^3 = 12(3x+2)^3$.</p>\n\n<h3>5. Dérivée et variations : la méthode en 4 étapes</h3>\n<ol>\n<li>Donner l'<strong>ensemble de définition</strong>.</li>\n<li>Calculer $f'(x)$ et, si possible, la <strong>factoriser</strong>.</li>\n<li>Étudier le <strong>signe de $f'(x)$</strong> (tableau de signes, souvent avec un trinôme du second degré !).</li>\n<li>Conclure dans un <strong>tableau de variations</strong> : $f' > 0 \\Rightarrow f$ croissante ; $f' < 0 \\Rightarrow f$ décroissante.</li>\n</ol>\n<p><strong>Exemple complet.</strong> $f(x) = 2x^3 - 3x^2 - 12x + 1$ sur $\\mathbb{R}$. $f'(x) = 6x^2 - 6x - 12 = 6(x^2 - x - 2) = 6(x-2)(x+1)$ (racines $-1$ et $2$ ; $a = 6 > 0$). Donc $f'(x) > 0$ sur $]-\\infty\\,;-1[$ et sur $]2\\,;+\\infty[$, et $f'(x) < 0$ sur $]-1\\,;2[$.</p>\n<table class=\"formula-table\">\n<tr><th>$x$</th><th>$-\\infty$</th><th></th><th>$-1$</th><th></th><th>$2$</th><th></th><th>$+\\infty$</th></tr>\n<tr><td>$f'(x)$</td><td></td><td>+</td><td>0</td><td>−</td><td>0</td><td>+</td><td></td></tr>\n<tr><td>$f(x)$</td><td></td><td>↗</td><td>$8$</td><td>↘</td><td>$-19$</td><td>↗</td><td></td></tr>\n</table>\n<p>$f(-1) = -2 - 3 + 12 + 1 = 8$ (maximum local) et $f(2) = 16 - 12 - 24 + 1 = -19$ (minimum local).</p>\n<div class=\"retenir-box\">Un <mark>extremum</mark> en $a$ demande que $f'(a) = 0$ <strong>ET</strong> que $f'$ <strong>change de signe</strong> en $a$. Contre-exemple : $f(x) = x^3$ a $f'(0) = 0$ mais $f'(x) = 3x^2 \\geq 0$ ne change pas de signe : pas d'extremum en $0$.</div>\n\n<h3>6. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Dériver un produit terme à terme : $(uv)' \\neq u'v'$.<br>\n❌ Oublier que la dérivée d'une constante est $0$ (et que $(5x)' = 5$, pas $0$).<br>\n❌ Dans un quotient, inverser l'ordre au numérateur : c'est $u'v - uv'$ (et non $uv' - u'v$).<br>\n❌ Écrire « $f'(a) = 0$ donc extremum » sans vérifier le changement de signe.<br>\n❌ Confondre $f(a)$ (une ordonnée) et $f'(a)$ (une pente).\n</div>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Calcule la dérivée de $f(x) = 3x^2 - 5x + 7$.</p>",
 aide:"Dérive chaque terme séparément : (u+v)' = u'+v', et rappelle-toi que la dérivée d'une constante est 0.",
 correction:"<p>$f'(x) = 3 \\times 2x - 5 + 0 = 6x - 5$</p><p>On dérive terme à terme : $(3x^2)' = 6x$, $(-5x)' = -5$, $(7)' = 0$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Soit $f(x) = (2x+1)(x-3)$. Calcule $f'(x)$ en utilisant la formule du produit, puis vérifie en développant d'abord $f(x)$.</p>",
 aide:"Formule du produit : (uv)' = u'v + uv'. Ici u = 2x+1 (donc u'=2) et v = x-3 (donc v'=1).",
 correction:"<p><strong>Méthode 1 (produit)</strong> : $f'(x) = 2(x-3) + (2x+1)(1) = 2x - 6 + 2x + 1 = 4x - 5$</p><p><strong>Méthode 2 (développer d'abord)</strong> : $f(x) = 2x^2 - 6x + x - 3 = 2x^2 - 5x - 3$, donc $f'(x) = 4x - 5$. Les deux méthodes donnent bien le même résultat ✓</p>"},
{niveau:"Difficile",
 enonce:"<p>Soit $f(x) = \\dfrac{x^2+1}{x-1}$ définie sur $]1;+\\infty[$. Calcule $f'(x)$ et détermine le signe de $f'(x)$ sur cet intervalle.</p>",
 aide:"Formule du quotient : (u/v)' = (u'v-uv')/v². Une fois f'(x) calculée, factorise le numérateur pour étudier son signe (le dénominateur (x-1)² est toujours positif).",
 correction:"<p>$u = x^2+1$ donc $u'=2x$ ; $v = x-1$ donc $v'=1$.</p><p>$f'(x) = \\dfrac{2x(x-1) - (x^2+1)(1)}{(x-1)^2} = \\dfrac{2x^2-2x-x^2-1}{(x-1)^2} = \\dfrac{x^2-2x-1}{(x-1)^2}$</p><p>Le dénominateur $(x-1)^2$ est toujours positif. Le signe de $f'(x)$ dépend donc du numérateur $x^2-2x-1$ (discriminant Δ=8, racines $1-\\sqrt2$ et $1+\\sqrt2$). Sur $]1;+\\infty[$, seule la racine $1+\\sqrt2 \\approx 2,41$ est dans l'intervalle : $f'(x) < 0$ sur $]1;1+\\sqrt2[$ et $f'(x) > 0$ sur $]1+\\sqrt2;+\\infty[$.</p>"},
{niveau:"Facile",
 enonce:"<p>Soit $f(x) = x^4 - 2x^3 + 5x - 7$. Calcule $f'(x)$, puis $f'(1)$.</p>",
 aide:"Dérive terme à terme avec (xⁿ)' = n·xⁿ⁻¹. La dérivée de 5x est 5 et celle de −7 est 0.",
 correction:"<p>$f'(x) = 4x^3 - 2\\times 3x^2 + 5 - 0 = 4x^3 - 6x^2 + 5$.</p><p>$f'(1) = 4 - 6 + 5 = 3$.</p>"},
{niveau:"Facile",
 enonce:"<p>Soit $f(x) = x^2 + x$. Détermine l'équation de la tangente à la courbe de $f$ au point d'abscisse $a = 1$.</p>",
 aide:"Calcule f(1), f'(x) puis f'(1), puis utilise y = f'(a)(x − a) + f(a).",
 correction:"<p>$f(1) = 1 + 1 = 2$. $f'(x) = 2x + 1$ donc $f'(1) = 3$.</p><p>Tangente : $y = 3(x - 1) + 2 = 3x - 1$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Étudie les variations de $g(x) = x^3 - 6x^2 + 9x + 2$ sur $\\mathbb{R}$ : calcule $g'(x)$, factorise-la, donne son signe puis dresse le tableau de variations avec les valeurs aux extremums.</p>",
 aide:"g'(x) est un trinôme du second degré : factorise par 3, puis cherche les racines. Rappel : à l'extérieur des racines, du signe de a.",
 correction:"<p>$g'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3)$. Pour $x^2 - 4x + 3$ : $\\Delta = 16 - 12 = 4$, racines $\\dfrac{4 \\mp 2}{2}$ : $1$ et $3$. Donc $g'(x) = 3(x-1)(x-3)$.</p><p>Comme $a = 3 > 0$ : $g'(x) > 0$ sur $]-\\infty\\,;1[$ et $]3\\,;+\\infty[$, et $g'(x) < 0$ sur $]1\\,;3[$.</p><p>$g(1) = 1 - 6 + 9 + 2 = 6$ et $g(3) = 27 - 54 + 27 + 2 = 2$.</p><p>$g$ est croissante sur $]-\\infty\\,;1]$, décroissante sur $[1\\,;3]$, croissante sur $[3\\,;+\\infty[$ : maximum local $6$ en $x = 1$, minimum local $2$ en $x = 3$.</p>"},
{niveau:"Moyen",
 enonce:"<p>Soit $f(x) = ax^2 + bx$ où $a$ et $b$ sont deux réels. On sait que la courbe de $f$ passe par le point $A(1\\,;\\,3)$ et que la tangente en $A$ a pour pente $4$. Détermine $a$ et $b$.</p>",
 aide:"Traduis chaque information en équation : « passe par A(1 ; 3) » donne f(1) = 3 ; « pente 4 » donne f'(1) = 4. Tu obtiens un système.",
 correction:"<p>$f(1) = a + b = 3$. Et $f'(x) = 2ax + b$, donc $f'(1) = 2a + b = 4$.</p><p>En soustrayant les deux équations : $(2a + b) - (a + b) = 4 - 3$, donc $a = 1$, puis $b = 2$.</p><p>Donc $f(x) = x^2 + 2x$. Vérification : $f(1) = 3$ ✓ et $f'(1) = 2 + 2 = 4$ ✓.</p>"},
{niveau:"Difficile",
 enonce:"<p>On veut clôturer un enclos rectangulaire d'aire $16\\ \\text{m}^2$. Un côté mesure $x$ mètres ($x > 0$).</p><p>1) Exprime l'autre côté, puis le périmètre $P(x)$ en fonction de $x$.<br>2) Étudie les variations de $P$ sur $]0\\,;+\\infty[$.<br>3) Quelles dimensions donnent le plus petit périmètre ? Que remarque-t-on ?</p>",
 aide:"Aire = x × y = 16 donc y = 16/x. Dérive P(x) = 2x + 32/x avec (1/x)' = −1/x², puis mets sur le même dénominateur pour étudier le signe.",
 correction:"<p>1) L'autre côté vaut $\\dfrac{16}{x}$ et $P(x) = 2\\left(x + \\dfrac{16}{x}\\right) = 2x + \\dfrac{32}{x}$.</p><p>2) $P'(x) = 2 - \\dfrac{32}{x^2} = \\dfrac{2x^2 - 32}{x^2} = \\dfrac{2(x-4)(x+4)}{x^2}$. Pour $x > 0$, $x + 4 > 0$ et $x^2 > 0$ : le signe de $P'$ est celui de $(x - 4)$. Donc $P$ décroît sur $]0\\,;4]$ et croît sur $[4\\,;+\\infty[$.</p><p>3) Le minimum est atteint en $x = 4$ : $P(4) = 8 + 8 = 16$ m. L'autre côté vaut $\\dfrac{16}{4} = 4$ : c'est un <strong>carré de 4 m de côté</strong>. À aire donnée, c'est le carré qui a le plus petit périmètre.</p>"},
{niveau:"Difficile",
 enonce:"<p>Soit $f(x) = x^2$. Existe-t-il des tangentes à la courbe de $f$ qui passent par le point $A(1\\,;\\,-3)$ ? Si oui, donne leurs équations.</p>",
 aide:"Écris la tangente en un point d'abscisse a quelconque : y = 2a(x − a) + a². Impose ensuite qu'elle passe par A : tu obtiens une équation du second degré en a.",
 correction:"<p>Tangente en $a$ : $f(a) = a^2$, $f'(a) = 2a$, donc $y = 2a(x - a) + a^2 = 2ax - a^2$.</p><p>Elle passe par $A(1\\,;-3)$ si $-3 = 2a - a^2$, c'est-à-dire $a^2 - 2a - 3 = 0$. $\\Delta = 4 + 12 = 16$, donc $a = \\dfrac{2 \\mp 4}{2}$ : $a = 3$ ou $a = -1$.</p><p>Il y a donc <strong>deux tangentes</strong> : pour $a = 3$, $y = 6x - 9$ ; pour $a = -1$, $y = -2x - 1$.</p><p>Vérification en $A$ : $6\\times 1 - 9 = -3$ ✓ et $-2\\times 1 - 1 = -3$ ✓.</p>"}
],
flashcards:[
{q:"Dérivée de xⁿ",a:"n·xⁿ⁻¹"},
{q:"Dérivée de √x",a:"1/(2√x), définie sur ]0 ; +∞["},
{q:"Dérivée de 1/x",a:"−1/x²"},
{q:"Dérivée de sin x",a:"cos x"},
{q:"Dérivée de cos x",a:"−sin x"},
{q:"Dérivée de eˣ",a:"eˣ (l'exponentielle est sa propre dérivée)"},
{q:"Dérivée de ln x",a:"1/x (pour x > 0)"},
{q:"Règle du produit (uv)'",a:"u'v + uv'"},
{q:"Règle du quotient (u/v)'",a:"(u'v − uv') / v²"},
{q:"Dérivée d'une composée (u∘v)'",a:"v' · u'(v). Ex : (e^(2x))' = 2e^(2x)   |   (sin(3x))' = 3cos(3x)"},
{q:"Si f'(x) > 0 sur I",a:"f est strictement CROISSANTE sur I."},
{q:"Si f'(x) < 0 sur I",a:"f est strictement DÉCROISSANTE sur I."},
{q:"Équation de la tangente en x = a",a:"y = f'(a)(x − a) + f(a)"},
{q:"Dérivée de uⁿ (composée)",a:"n·u'·uⁿ⁻¹. Ex : (sin²x)' = 2sinx·cosx"},
{q:"Nombre dérivé f'(a) : définition",a:"Limite du taux de variation (f(a+h) − f(a))/h quand h tend vers 0. C'est la pente de la tangente en a."},
{q:"Dérivée de x²",a:"2x"},
{q:"Dérivée de x³",a:"3x²"},
{q:"Dérivée d'une fonction affine ax + b",a:"a (la pente)."},
{q:"Dérivée de (ax + b)ⁿ",a:"n·a·(ax + b)ⁿ⁻¹. Ex : ((3x + 2)⁴)' = 12(3x + 2)³"},
{q:"Tangente horizontale en x = a : condition",a:"f'(a) = 0."},
{q:"f'(a) = 0 suffit-il pour avoir un extremum en a ?",a:"Non. Il faut aussi que f' change de signe en a. Contre-exemple : x³ en 0."},
{q:"Méthode pour étudier les variations de f",a:"1. Ensemble de définition. 2. Calculer et factoriser f'. 3. Signe de f'. 4. Tableau de variations."},
{q:"(uv)' est-il égal à u'v' ?",a:"Non ! (uv)' = u'v + uv'. Test : (x·x)' = 2x alors que x'·x' = 1."},
{q:"Dérivée de k·u (k constante)",a:"k·u'"},
{q:"Dérivée d'une fonction de degré 3 : quelle nature ?",a:"Un trinôme du second degré. On étudie donc son signe avec Δ et les racines."},
{q:"Taux de variation vs nombre dérivé",a:"Taux de variation : entre deux points distincts a et b (pente de la sécante). Nombre dérivé : limite quand b tend vers a (pente de la tangente)."}
]},
'Trigonométrie': {
cours:`<h3>Trigonométrie & Cercle trigonométrique</h3>
<h3>Le radian : d'où vient cette unité ?</h3>
<div class="formula-box">Un <strong>radian</strong> (noté rad) est la mesure d'un angle qui intercepte, sur un cercle, un arc dont la longueur est <mark>égale au rayon</mark> de ce cercle. C'est l'unité d'angle du Système International.</div>
<div class="formula-box">Longueur d'un arc de cercle : $L = R \\times \\theta$ &nbsp;(avec $\\theta$ l'angle exprimé en <strong>radians</strong>, et R le rayon)</div>

<div class="retenir-box">Un tour complet de cercle correspond à un arc de longueur $2\\pi R$ (le périmètre du cercle) — et un tour complet vaut aussi $2\\pi$ radians. C'est cohérent : $L = R \\times 2\\pi = 2\\pi R$. ✓</div>
<div class="formula-box">Conversion : 180° = π rad<br>° → rad : multiplier par π/180<br>rad → ° : multiplier par 180/π</div>
<h3>Valeurs remarquables</h3>
<table class="formula-table">
<tr><th>x</th><th>0</th><th>π/6</th><th>π/4</th><th>π/3</th><th>π/2</th></tr>
<tr><td>sin x</td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr>
<tr><td>cos x</td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr>
<tr><td>tan x</td><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>—</td></tr>
</table>
<div class="retenir-box">Moyen mnémotechnique : sin(0),sin(π/6),sin(π/4),sin(π/3),sin(π/2) = √0/2, √1/2, √2/2, √3/2, √4/2 (simplifiés). Et cos = sin lu à l'envers (de droite à gauche) !</div>
<h3>Identités fondamentales</h3>
<div class="formula-box">cos²x + sin²x = 1 &nbsp;[Pythagore]<br>tan x = sin x / cos x<br>cos(−x) = cos x &nbsp;[<mark>PAIRE</mark>]<br>sin(−x) = −sin x &nbsp;[<mark>IMPAIRE</mark>]<br>cos(π−x) = −cos x<br>sin(π−x) = sin x<br>cos(π+x) = −cos x<br>sin(π+x) = −sin x</div>
<h3>Formules de duplication</h3>
<div class="formula-box">cos(2x) = cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x<br>sin(2x) = 2 sin x cos x</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un cercle a un rayon de 2 km. Calcule la longueur de l'arc intercepté par un angle de $\\frac{\\pi}{4}$ radian.</p>`, aide:`Utilise directement la formule L = R × θ, avec θ déjà en radians.`, correction:`<p>$L = R \\times \\theta = 2 \\times \\frac{\\pi}{4} = \\frac{\\pi}{2} \\approx 1{,}57$ km.</p>`},
{niveau:'Facile', enonce:`<p>Sachant que $\\cos(x) = \\frac{3}{5}$ et que $x \\in [0;\\frac{\\pi}{2}]$, calcule $\\sin(x)$.</p>`, aide:`Utilise l'identité de Pythagore cos²x + sin²x = 1. Attention au signe de sin(x) sur cet intervalle.`, correction:`<p>$\\cos^2(x) + \\sin^2(x) = 1 \\Rightarrow \\sin^2(x) = 1 - \\frac{9}{25} = \\frac{16}{25}$</p><p>$\\sin(x) = \\pm\\frac{4}{5}$. Comme $x \\in [0;\\frac{\\pi}{2}]$, sin(x) est positif : $\\sin(x) = \\frac{4}{5}$</p>`},
{niveau:'Facile', enonce:`<p>Convertis en radians : $120°$, $150°$ et $45°$. Convertis en degrés : $\\frac{3\\pi}{4}$ et $\\frac{\\pi}{6}$.</p>`, aide:`° → rad : multiplier par π/180. rad → ° : multiplier par 180/π.`, correction:`<p>$120° = 120 \\times \\frac{\\pi}{180} = \\frac{2\\pi}{3}$ ; $150° = \\frac{5\\pi}{6}$ ; $45° = \\frac{\\pi}{4}$.</p><p>$\\frac{3\\pi}{4} = \\frac{3 \\times 180}{4} = 135°$ ; $\\frac{\\pi}{6} = 30°$.</p>`},
{niveau:'Facile', enonce:`<p>Donne la valeur exacte de $\\cos\\left(\\frac{\\pi}{3}\\right)$, $\\sin\\left(\\frac{\\pi}{6}\\right)$ et $\\tan\\left(\\frac{\\pi}{4}\\right)$, puis de $\\cos\\left(-\\frac{\\pi}{4}\\right)$ et $\\sin\\left(-\\frac{\\pi}{6}\\right)$.</p>`, aide:`Utilise le tableau des valeurs remarquables. Pour les angles négatifs, rappelle-toi que cos est paire et sin est impaire.`, correction:`<p>$\\cos\\left(\\frac{\\pi}{3}\\right) = \\frac{1}{2}$ ; $\\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2}$ ; $\\tan\\left(\\frac{\\pi}{4}\\right) = 1$.</p><p>cos est paire : $\\cos\\left(-\\frac{\\pi}{4}\\right) = \\cos\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}$.</p><p>sin est impaire : $\\sin\\left(-\\frac{\\pi}{6}\\right) = -\\sin\\left(\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$.</p>`},
{niveau:'Facile', enonce:`<p>Une roue de rayon 5 cm tourne d'un angle de $60°$. Calcule la longueur de l'arc parcouru par un point du bord (valeur exacte, puis arrondie au mm).</p>`, aide:`La formule L = R × θ demande un angle en radians : convertis d'abord 60°.`, correction:`<p>$60° = \\frac{\\pi}{3}$ rad.</p><p>$L = R \\times \\theta = 5 \\times \\frac{\\pi}{3} = \\frac{5\\pi}{3} \\approx 5{,}24$ cm, soit environ 52 mm.</p>`},
{niveau:'Moyen', enonce:`<p>Résous dans $[0;2\\pi[$ l'équation $\\cos(x) = \\frac{1}{2}$.</p>`, aide:`Quelle valeur remarquable de x donne cos(x)=1/2 ? N'oublie pas que le cosinus est une fonction paire — pense au cercle trigonométrique et aux 2 solutions possibles sur cet intervalle.`, correction:`<p>On sait que $\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$.</p><p>Comme cos est paire, $\\cos(-\\frac{\\pi}{3}) = \\frac{1}{2}$ aussi, soit $\\cos(2\\pi - \\frac{\\pi}{3}) = \\cos(\\frac{5\\pi}{3})$ sur $[0;2\\pi[$.</p><p>Solutions : $x = \\frac{\\pi}{3}$ ou $x = \\frac{5\\pi}{3}$</p>`},
{niveau:'Moyen', enonce:`<p>Sachant que $\\sin(x) = \\frac{4}{5}$ et que $x \\in \\left[\\frac{\\pi}{2};\\pi\\right]$, calcule $\\cos(x)$ puis $\\tan(x)$.</p>`, aide:`Utilise cos²x + sin²x = 1. Attention au signe : entre π/2 et π, le cosinus est négatif.`, correction:`<p>$\\cos^2(x) = 1 - \\sin^2(x) = 1 - \\frac{16}{25} = \\frac{9}{25}$, donc $\\cos(x) = \\pm\\frac{3}{5}$.</p><p>Sur $\\left[\\frac{\\pi}{2};\\pi\\right]$, cos(x) est négatif : $\\cos(x) = -\\frac{3}{5}$.</p><p>$\\tan(x) = \\frac{\\sin(x)}{\\cos(x)} = \\frac{4/5}{-3/5} = -\\frac{4}{3}$.</p>`},
{niveau:'Moyen', enonce:`<p>À l'aide des formules avec $\\pi - x$ et $\\pi + x$, donne les valeurs exactes de $\\cos\\left(\\frac{2\\pi}{3}\\right)$, $\\sin\\left(\\frac{5\\pi}{6}\\right)$, $\\cos\\left(\\frac{4\\pi}{3}\\right)$ et $\\sin\\left(\\frac{7\\pi}{6}\\right)$.</p>`, aide:`Écris chaque angle sous la forme π − a ou π + a, avec a une valeur remarquable (π/6, π/4, π/3).`, correction:`<p>$\\frac{2\\pi}{3} = \\pi - \\frac{\\pi}{3}$ donc $\\cos\\left(\\frac{2\\pi}{3}\\right) = -\\cos\\left(\\frac{\\pi}{3}\\right) = -\\frac{1}{2}$.</p><p>$\\frac{5\\pi}{6} = \\pi - \\frac{\\pi}{6}$ donc $\\sin\\left(\\frac{5\\pi}{6}\\right) = \\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2}$.</p><p>$\\frac{4\\pi}{3} = \\pi + \\frac{\\pi}{3}$ donc $\\cos\\left(\\frac{4\\pi}{3}\\right) = -\\cos\\left(\\frac{\\pi}{3}\\right) = -\\frac{1}{2}$.</p><p>$\\frac{7\\pi}{6} = \\pi + \\frac{\\pi}{6}$ donc $\\sin\\left(\\frac{7\\pi}{6}\\right) = -\\sin\\left(\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$.</p>`},
{niveau:'Moyen', enonce:`<p>Résous dans $[0;2\\pi[$ : a) $\\sin(x) = \\frac{\\sqrt{2}}{2}$ ; b) $\\cos(x) = -\\frac{\\sqrt{3}}{2}$.</p>`, aide:`Repère d'abord la valeur remarquable, puis utilise sin(π − x) = sin x pour le a), et cos(π − x) = −cos x et cos(π + x) = −cos x pour le b).`, correction:`<p>a) $\\sin\\left(\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}$ et $\\sin\\left(\\pi - \\frac{\\pi}{4}\\right) = \\sin\\left(\\frac{3\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}$.</p><p>$S = \\left\\{\\frac{\\pi}{4};\\frac{3\\pi}{4}\\right\\}$</p><p>b) $\\cos\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}$, donc $\\cos\\left(\\pi - \\frac{\\pi}{6}\\right) = \\cos\\left(\\frac{5\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}$ et $\\cos\\left(\\pi + \\frac{\\pi}{6}\\right) = \\cos\\left(\\frac{7\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}$.</p><p>$S = \\left\\{\\frac{5\\pi}{6};\\frac{7\\pi}{6}\\right\\}$</p>`},
{niveau:'Moyen', enonce:`<p>Une roue de vélo de rayon 35 cm fait 3 tours complets. Quelle distance le vélo a-t-il parcourue (valeur exacte en mètres, puis arrondie au centième) ?</p>`, aide:`3 tours correspondent à 3 × 2π radians. Attention aux unités : passe le rayon en mètres avant d'appliquer L = R × θ.`, correction:`<p>$\\theta = 3 \\times 2\\pi = 6\\pi$ rad et $R = 0{,}35$ m.</p><p>$L = R \\times \\theta = 0{,}35 \\times 6\\pi = 2{,}1\\pi \\approx 6{,}60$ m.</p>`},
{niveau:'Moyen', enonce:`<p>Sachant que $\\cos(x) = \\frac{3}{5}$ et que $x \\in \\left[0;\\frac{\\pi}{2}\\right]$, calcule $\\sin(2x)$ et $\\cos(2x)$.</p>`, aide:`Commence par trouver sin(x) avec Pythagore, puis utilise sin(2x) = 2 sin x cos x et cos(2x) = 2cos²x − 1.`, correction:`<p>$\\sin^2(x) = 1 - \\frac{9}{25} = \\frac{16}{25}$ et $x \\in \\left[0;\\frac{\\pi}{2}\\right]$, donc $\\sin(x) = \\frac{4}{5}$.</p><p>$\\sin(2x) = 2 \\times \\frac{4}{5} \\times \\frac{3}{5} = \\frac{24}{25}$.</p><p>$\\cos(2x) = 2\\cos^2(x) - 1 = 2 \\times \\frac{9}{25} - 1 = -\\frac{7}{25}$.</p><p>Vérification : $\\cos^2(2x) + \\sin^2(2x) = \\frac{49}{625} + \\frac{576}{625} = 1$ ✓</p>`},
{niveau:'Difficile', enonce:`<p>Un accélérateur de particules circulaire a un rayon d'1 km. Un proton part d'un point I et parcourt quatre tiers de tour. Calcule la distance exacte parcourue par ce proton (laisse le résultat en fonction de π).</p>`, aide:`Un tour complet correspond à un angle de 2π radians. Quatre tiers de tour correspondent donc à quel angle en radians ? Applique ensuite L = R × θ.</p>`, correction:`<p>Un tour complet = $2\\pi$ rad. Quatre tiers de tour : $\\theta = \\frac{4}{3} \\times 2\\pi = \\frac{8\\pi}{3}$ rad.</p><p>$L = R \\times \\theta = 1 \\times \\frac{8\\pi}{3} = \\frac{8\\pi}{3} \\approx 8{,}38$ km.</p>`},
{niveau:'Difficile', enonce:`<p>Démontre que $\\cos(2x) = 1 - 2\\sin^2(x)$ à partir de la formule $\\cos(2x) = \\cos^2(x) - \\sin^2(x)$ et de l'identité de Pythagore.</p>`, aide:`Remplace cos²(x) dans la formule de départ en utilisant la relation cos²x + sin²x = 1 (donc cos²x = 1 - sin²x).`, correction:`<p>On part de $\\cos(2x) = \\cos^2(x) - \\sin^2(x)$.</p><p>Or, d'après Pythagore : $\\cos^2(x) = 1 - \\sin^2(x)$.</p><p>En remplaçant : $\\cos(2x) = (1-\\sin^2(x)) - \\sin^2(x) = 1 - 2\\sin^2(x)$ ✓</p><p>C'est exactement la formule recherchée — l'astuce clé est de toujours pouvoir remplacer cos² par 1−sin² (ou l'inverse) grâce à Pythagore.</p>`},
{niveau:'Difficile', enonce:`<p>Résous dans $[0;2\\pi[$ l'équation $\\sin(x) = -\\frac{1}{2}$.</p>`, aide:`Tu sais que sin(π/6) = 1/2. Pour la première solution, utilise sin(π + x) = −sin x. Pour la seconde, utilise la parité de sin puis ajoute 2π pour revenir dans [0 ; 2π[.`, correction:`<p>$\\sin\\left(\\pi + \\frac{\\pi}{6}\\right) = -\\sin\\left(\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$, donc $x = \\frac{7\\pi}{6}$ est solution.</p><p>sin est impaire : $\\sin\\left(-\\frac{\\pi}{6}\\right) = -\\frac{1}{2}$. Mais $-\\frac{\\pi}{6} \\notin [0;2\\pi[$ : on ajoute $2\\pi$, ce qui donne $x = 2\\pi - \\frac{\\pi}{6} = \\frac{11\\pi}{6}$.</p><p>$S = \\left\\{\\frac{7\\pi}{6};\\frac{11\\pi}{6}\\right\\}$</p>`},
{niveau:'Difficile', enonce:`<p>Résous dans $[0;2\\pi[$ l'équation $2\\cos^2(x) - 1 = 0$.</p>`, aide:`Isole cos²x : cos²x = 1/2, donc cos x = √2/2 ou cos x = −√2/2. Résous ensuite chacune des deux équations.`, correction:`<p>$2\\cos^2(x) - 1 = 0 \\iff \\cos^2(x) = \\frac{1}{2} \\iff \\cos(x) = \\frac{\\sqrt{2}}{2}$ ou $\\cos(x) = -\\frac{\\sqrt{2}}{2}$.</p><p>$\\cos(x) = \\frac{\\sqrt{2}}{2}$ : $x = \\frac{\\pi}{4}$ ou $x = 2\\pi - \\frac{\\pi}{4} = \\frac{7\\pi}{4}$ (parité de cos).</p><p>$\\cos(x) = -\\frac{\\sqrt{2}}{2}$ : $x = \\pi - \\frac{\\pi}{4} = \\frac{3\\pi}{4}$ ou $x = \\pi + \\frac{\\pi}{4} = \\frac{5\\pi}{4}$.</p><p>$S = \\left\\{\\frac{\\pi}{4};\\frac{3\\pi}{4};\\frac{5\\pi}{4};\\frac{7\\pi}{4}\\right\\}$</p>`},
{niveau:'Difficile', enonce:`<p>Démontre que pour tout réel $x$ : $(\\cos(x) + \\sin(x))^2 = 1 + \\sin(2x)$.</p>`, aide:`Développe le carré avec (a + b)² = a² + 2ab + b², puis utilise cos²x + sin²x = 1 et sin(2x) = 2 sin x cos x.`, correction:`<p>$(\\cos(x) + \\sin(x))^2 = \\cos^2(x) + 2\\sin(x)\\cos(x) + \\sin^2(x)$.</p><p>Or $\\cos^2(x) + \\sin^2(x) = 1$ et $2\\sin(x)\\cos(x) = \\sin(2x)$.</p><p>Donc $(\\cos(x) + \\sin(x))^2 = 1 + \\sin(2x)$ ✓</p>`},
{niveau:'Difficile', enonce:`<p>Calcule la valeur exacte de $\\cos\\left(\\frac{\\pi}{12}\\right)$ en utilisant la formule $\\cos(2x) = 2\\cos^2(x) - 1$ avec $x = \\frac{\\pi}{12}$.</p>`, aide:`Ici 2x = π/6, dont tu connais le cosinus. Résous l'équation obtenue pour cos²(π/12), puis choisis le bon signe (π/12 est entre 0 et π/2).`, correction:`<p>Avec $x = \\frac{\\pi}{12}$ : $\\cos\\left(\\frac{\\pi}{6}\\right) = 2\\cos^2\\left(\\frac{\\pi}{12}\\right) - 1$, soit $\\frac{\\sqrt{3}}{2} = 2\\cos^2\\left(\\frac{\\pi}{12}\\right) - 1$.</p><p>$\\cos^2\\left(\\frac{\\pi}{12}\\right) = \\frac{1 + \\frac{\\sqrt{3}}{2}}{2} = \\frac{2 + \\sqrt{3}}{4}$.</p><p>Comme $\\frac{\\pi}{12} \\in \\left[0;\\frac{\\pi}{2}\\right]$, le cosinus est positif : $\\cos\\left(\\frac{\\pi}{12}\\right) = \\frac{\\sqrt{2 + \\sqrt{3}}}{2} \\approx 0{,}966$.</p>`},
],
flashcards:[
{q:'sin(0)',a:'0'},
{q:'sin(π/6)',a:'1/2'},
{q:'sin(π/4)',a:'√2/2'},
{q:'sin(π/3)',a:'√3/2'},
{q:'sin(π/2)',a:'1'},
{q:'cos(0)',a:'1'},
{q:'cos(π/6)',a:'√3/2'},
{q:'cos(π/4)',a:'√2/2'},
{q:'cos(π/3)',a:'1/2'},
{q:'cos(π/2)',a:'0'},
{q:'tan(π/4)',a:'1'},
{q:'tan(π/3)',a:'√3'},
{q:'tan(π/6)',a:'√3/3 = 1/√3'},
{q:'cos²x + sin²x = ?',a:'1 (identité de Pythagore)'},
{q:'cos(2x) — trois formes',a:'cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x'},
{q:'sin(2x)',a:'2 sin x cos x'},
{q:'cos est-elle paire ou impaire ?',a:'PAIRE : cos(−x) = cos(x)'},
{q:'sin est-elle paire ou impaire ?',a:'IMPAIRE : sin(−x) = −sin(x)'},
{q:'cos(π − x)',a:'−cos(x)'},
{q:'sin(π − x)',a:'sin(x)'},
{q:'180° en radians',a:'π'},
{q:'90° en radians',a:'π/2'},
{q:'60° en radians',a:'π/3'},
{q:'45° en radians',a:'π/4'},
{q:'30° en radians',a:'π/6'},
{q:'Définition géométrique du radian',a:'Mesure d\'un angle qui intercepte, sur un cercle, un arc dont la longueur est égale au rayon de ce cercle.'},
{q:'Formule de longueur d\'un arc de cercle',a:'L = R × θ, avec θ obligatoirement exprimé en radians et R le rayon.'},
{q:'tan x en fonction de sin et cos',a:'tan x = sin x / cos x (défini si cos x ≠ 0)'},
{q:'cos(π) et sin(π)',a:'cos(π) = −1 et sin(π) = 0'},
{q:'cos(π + x) et sin(π + x)',a:'cos(π + x) = −cos(x) et sin(π + x) = −sin(x)'},
{q:'cos(2π/3)',a:'−1/2 (car 2π/3 = π − π/3)'},
{q:'sin(5π/6)',a:'1/2 (car 5π/6 = π − π/6)'},
{q:'Conversion degrés → radians',a:'Multiplier par π/180 (ex : 60° = π/3)'},
{q:'Conversion radians → degrés',a:'Multiplier par 180/π (ex : 3π/4 = 135°)'},
{q:'Méthode : résoudre sin(x) = a ou cos(x) = a dans [0 ; 2π[',a:'1) Repérer la valeur remarquable. 2) Utiliser les symétries : sin(π − x) = sin x ; cos(−x) = cos x ; cos(π − x) = −cos x ; sin(π + x) = −sin x. 3) Garder les solutions dans [0 ; 2π[ (ajouter 2π si besoin).'},
]},

'Suites numériques': {
cours:"<div class=\"attention-box\">Une suite, c'est une <strong>liste de nombres rangés dans l'ordre</strong>. Elle sert à modéliser tout ce qui évolue « pas à pas » : un capital qui rapporte des intérêts, une population, un salaire, une dette qu'on rembourse. Deux familles à maîtriser parfaitement : les suites <strong>arithmétiques</strong> (on ajoute toujours la même chose) et <strong>géométriques</strong> (on multiplie toujours par la même chose).</div>\n\n<h3>1. Notations et deux façons de définir une suite</h3>\n<p>$u_n$ est le terme de <strong>rang</strong> $n$ ; $u_{n+1}$ est le terme <em>suivant</em>. Attention : $u_{n+1}$ n'est <strong>pas</strong> $u_n + 1$ (c'est un autre terme, pas « le même plus 1 »).</p>\n<ul>\n<li><strong>Forme explicite</strong> : $u_n = f(n)$. On calcule n'importe quel terme directement. Ex : $u_n = 2n^2 - 1$ donne $u_0 = -1$ et $u_3 = 2\\times 9 - 1 = 17$.</li>\n<li><strong>Par récurrence</strong> : on donne le premier terme et une règle pour passer au suivant. Ex : $u_0 = 3$ et $u_{n+1} = 2u_n - 1$ donne $u_1 = 5$, $u_2 = 9$, $u_3 = 17$ (on calcule de proche en proche).</li>\n</ul>\n\n<h3>2. Suite arithmétique (on ajoute $r$)</h3>\n<div class=\"formula-box\">$u_{n+1} = u_n + r$ &nbsp;&nbsp; $u_n = u_0 + n\\,r$ &nbsp;&nbsp; plus généralement $u_n = u_p + (n - p)\\,r$</div>\n<p><strong>Exemple.</strong> $u_0 = 4$ et $r = -3$ : $u_5 = 4 - 15 = -11$.</p>\n<p><strong>Dans l'autre sens.</strong> Si $u_3 = 11$ et $u_7 = 23$ : de $u_3$ à $u_7$ il y a $4$ « pas », donc $r = \\dfrac{23 - 11}{4} = 3$, puis $u_0 = u_3 - 3r = 11 - 9 = 2$.</p>\n<div class=\"formula-box\">Somme de termes consécutifs : $S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$</div>\n<p>Exemple célèbre : $1 + 2 + \\dots + 100 = 100\\times\\dfrac{1 + 100}{2} = 5050$.</p>\n<div class=\"attention-box\"><strong>Compter les termes :</strong> de $u_p$ à $u_n$, il y a <mark>$n - p + 1$</mark> termes (pas $n - p$). Ex : de $u_3$ à $u_{10}$ : $10 - 3 + 1 = 8$ termes.</div>\n\n<h3>3. Suite géométrique (on multiplie par $q$)</h3>\n<div class=\"formula-box\">$u_{n+1} = q\\,u_n$ &nbsp;&nbsp; $u_n = u_0\\,q^n$ &nbsp;&nbsp; plus généralement $u_n = u_p\\,q^{\\,n-p}$</div>\n<div class=\"retenir-box\"><strong>Pourcentages et coefficient multiplicateur.</strong> Augmenter de $t\\,\\%$ revient à multiplier par $q = 1 + \\dfrac{t}{100}$. Diminuer de $t\\,\\%$ revient à multiplier par $q = 1 - \\dfrac{t}{100}$. Si une grandeur varie de $t\\,\\%$ chaque année, elle suit une suite <strong>géométrique</strong>.</div>\n<p><strong>Exemple.</strong> On place $1000$ € à $5\\,\\%$ par an : $u_n = 1000\\times 1{,}05^n$, donc $u_{10} = 1000\\times 1{,}05^{10} \\approx 1\\,628{,}89$ €.</p>\n<div class=\"formula-box\">Somme (si $q \\neq 1$) : $S = (\\text{premier terme}) \\times \\dfrac{1 - q^{\\,\\text{nombre de termes}}}{1 - q}$</div>\n<p>Exemple : $1 + 2 + 4 + \\dots + 2^9$ ($10$ termes, $q = 2$) $= 1\\times\\dfrac{1 - 2^{10}}{1 - 2} = 1023$.</p>\n\n<h3>4. Reconnaître le type d'une suite</h3>\n<ul>\n<li>$u_{n+1} - u_n$ est <strong>constant</strong> → arithmétique (la constante est $r$).</li>\n<li>$\\dfrac{u_{n+1}}{u_n}$ est <strong>constant</strong> → géométrique (la constante est $q$).</li>\n</ul>\n<p>Ex : $u_n = 3n + 2$ → $u_{n+1} - u_n = 3(n+1) + 2 - 3n - 2 = 3$ : arithmétique de raison $3$. $v_n = 5\\times 2^n$ : géométrique de raison $2$. $w_n = n^2$ : ni l'une ni l'autre ($w_1 - w_0 = 1$ mais $w_2 - w_1 = 3$).</p>\n\n<h3>5. Sens de variation</h3>\n<p>Une suite est <strong>croissante</strong> si $u_{n+1} - u_n \\geq 0$ pour tout $n$, <strong>décroissante</strong> si $u_{n+1} - u_n \\leq 0$. La méthode universelle : <mark>calculer $u_{n+1} - u_n$ et étudier son signe</mark>.</p>\n<p><strong>Exemple.</strong> $u_n = n^2 - 4n$ : $u_{n+1} - u_n = (n+1)^2 - 4(n+1) - n^2 + 4n = 2n - 3$. C'est négatif pour $n \\leq 1$ et positif pour $n \\geq 2$. Vérification : $u_0 = 0$, $u_1 = -3$, $u_2 = -4$, $u_3 = -3$, $u_4 = 0$ ✓ : la suite descend jusqu'à $u_2$ puis monte.</p>\n<ul>\n<li>Arithmétique : croissante si $r > 0$, décroissante si $r < 0$.</li>\n<li>Géométrique avec $u_0 > 0$ : croissante si $q > 1$ ; décroissante si $0 < q < 1$ (et alors les termes se rapprochent de $0$).</li>\n</ul>\n\n<h3>6. Raisonnement par récurrence</h3>\n<ol>\n<li><strong>Initialisation</strong> : vérifier que $P(0)$ est vraie.</li>\n<li><strong>Hérédité</strong> : on <em>suppose</em> $P(n)$ vraie pour un $n$ quelconque, et on démontre que $P(n+1)$ est vraie.</li>\n<li><strong>Conclusion</strong> : $P(n)$ est vraie pour tout $n \\in \\mathbb{N}$.</li>\n</ol>\n<p><strong>Exemple.</strong> $u_0 = 0$ et $u_{n+1} = u_n + 2n + 1$. Montrons que $u_n = n^2$. <em>Initialisation</em> : $u_0 = 0 = 0^2$ ✓. <em>Hérédité</em> : si $u_n = n^2$, alors $u_{n+1} = n^2 + 2n + 1 = (n+1)^2$ ✓. <em>Conclusion</em> : $u_n = n^2$ pour tout $n$.</p>\n\n<h3>7. L'astuce du « suite auxiliaire »</h3>\n<p>Une suite comme $u_{n+1} = 0{,}5\\,u_n + 3$ n'est ni arithmétique ni géométrique. Mais l'énoncé propose souvent : « on pose $v_n = u_n - 6$ ». On montre alors que $(v_n)$ est géométrique : $v_{n+1} = u_{n+1} - 6 = 0{,}5\\,u_n + 3 - 6 = 0{,}5\\,u_n - 3 = 0{,}5\\,(u_n - 6) = 0{,}5\\,v_n$. On connaît donc $v_n$, puis $u_n = v_n + 6$. Ce type de question tombe très souvent.</p>\n\n<h3>8. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Écrire $u_{n+1} = u_n + 1$ pour « le terme suivant ».<br>\n❌ Se tromper dans le nombre de termes d'une somme ($n - p + 1$).<br>\n❌ Confondre $r$ (on <em>ajoute</em>) et $q$ (on <em>multiplie</em>) : $u_n = u_0 + nr$ mais $u_n = u_0\\,q^n$.<br>\n❌ Prendre $q = 0{,}05$ pour une hausse de $5\\,\\%$ : c'est $q = 1{,}05$.<br>\n❌ Utiliser l'hypothèse de récurrence sans l'avoir écrite, ou démontrer directement $P(n+1)$ sans s'en servir.\n</div>",
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
 correction:"<p><strong>Initialisation</strong> : $u_0 = 0$ et $2^0 - 1 = 1 - 1 = 0$ ✓, la propriété est vraie au rang 0.</p><p><strong>Hérédité</strong> : supposons que $u_n = 2^n - 1$ (hypothèse de récurrence). Montrons que $u_{n+1} = 2^{n+1}-1$.</p><p>$u_{n+1} = 2u_n + 1 = 2(2^n-1) + 1 = 2^{n+1} - 2 + 1 = 2^{n+1} - 1$ ✓</p><p><strong>Conclusion</strong> : la propriété est vraie au rang 0 et héréditaire, donc par récurrence, $u_n = 2^n-1$ pour tout $n \\in \\mathbb{N}$.</p>"},
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
 correction:"<p>$u_{n+1} - u_n = (n+1)^2 - 6(n+1) - n^2 + 6n = n^2 + 2n + 1 - 6n - 6 - n^2 + 6n = 2n - 5$.</p><p>$2n - 5 < 0$ pour $n \\leq 2$ et $2n - 5 > 0$ pour $n \\geq 3$. La suite est donc <strong>décroissante jusqu'à $u_3$</strong>, puis <strong>croissante</strong> à partir du rang $3$.</p><p>Valeurs : $0,\\ -5,\\ -8,\\ -9,\\ -8,\\ -5,\\ 0\\dots$ Le plus petit terme est $u_3 = -9$.</p>"},
{niveau:"Difficile",
 enonce:"<p>Tu mets de l'argent de côté : $100$ € le 1<sup>er</sup> mois, puis tu augmentes ton versement de $10$ € chaque mois. On note $v_n$ le versement du mois numéro $n$ (avec $v_1 = 100$).</p><p>1) Exprime $v_n$ en fonction de $n$.<br>2) Quelle somme totale auras-tu versée au bout de 12 mois ?<br>3) À partir de quel mois le versement dépasse-t-il $250$ € ?</p>",
 aide:"C'est une suite arithmétique dont le premier terme est v₁. La formule est v_n = v₁ + (n − 1)r. Pour la somme : nombre de termes × (premier + dernier)/2.",
 correction:"<p>1) Suite arithmétique de raison $10$ : $v_n = 100 + 10(n-1)$.</p><p>2) $v_{12} = 100 + 110 = 210$. Total : $S = 12\\times\\dfrac{100 + 210}{2} = 12\\times 155 = 1\\,860$ €.</p><p>3) $100 + 10(n-1) > 250 \\Leftrightarrow n - 1 > 15 \\Leftrightarrow n > 16$, donc à partir du <strong>17<sup>e</sup> mois</strong> ($v_{17} = 260$ ; $v_{16} = 250$ n'est pas strictement supérieur).</p>"},
{niveau:"Difficile",
 enonce:"<p>Soit $(u_n)$ définie par $u_0 = 10$ et $u_{n+1} = 0{,}5\\,u_n + 3$. On pose $v_n = u_n - 6$.</p><p>1) Montre que $(v_n)$ est géométrique et donne sa raison et son premier terme.<br>2) Exprime $v_n$ puis $u_n$ en fonction de $n$.<br>3) Vérifie ta formule pour $u_1$ et $u_2$.</p>",
 aide:"Écris v_{n+1} = u_{n+1} − 6, remplace u_{n+1} par son expression, et fais apparaître (u_n − 6) en facteur.",
 correction:"<p>1) $v_{n+1} = u_{n+1} - 6 = 0{,}5\\,u_n + 3 - 6 = 0{,}5\\,u_n - 3 = 0{,}5\\,(u_n - 6) = 0{,}5\\,v_n$. Donc $(v_n)$ est <strong>géométrique de raison $0{,}5$</strong>, de premier terme $v_0 = u_0 - 6 = 4$.</p><p>2) $v_n = 4\\times 0{,}5^n$, donc $u_n = v_n + 6 = 6 + 4\\times 0{,}5^n$.</p><p>3) $u_1 = 6 + 4\\times 0{,}5 = 8$ et directement $0{,}5\\times 10 + 3 = 8$ ✓. $u_2 = 6 + 4\\times 0{,}25 = 7$ et directement $0{,}5\\times 8 + 3 = 7$ ✓.</p><p>Remarque : comme $0{,}5^n$ tend vers $0$, les termes se rapprochent de $6$.</p>"}
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
'Probabilités': {
cours:"<div class=\"attention-box\">En probabilités, 80 % des erreurs viennent d'<strong>un mauvais départ</strong> : on se lance dans une formule sans avoir bien lu ce qu'on cherche. Ce cours te donne le réflexe : <strong>dessiner un arbre ou un tableau</strong>, repérer ce qui est « sachant » ce qui est « et », puis calculer.</div>\n\n<h3>1. Vocabulaire de base</h3>\n<div class=\"formula-box\">\n$A \\cap B$ : « $A$ <strong>et</strong> $B$ » &nbsp;&nbsp; $A \\cup B$ : « $A$ <strong>ou</strong> $B$ » (ou les deux) &nbsp;&nbsp; $\\overline{A}$ : « <strong>contraire</strong> de $A$ »<br>\n$0 \\leq P(A) \\leq 1$ &nbsp;&nbsp; $P(\\overline{A}) = 1 - P(A)$ &nbsp;&nbsp; $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$\n</div>\n<p>Si tous les cas sont équiprobables : $P(A) = \\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$. Deux événements sont <strong>incompatibles</strong> s'ils ne peuvent pas arriver ensemble : $A\\cap B = \\varnothing$.</p>\n\n<h3>2. Probabilité conditionnelle : « sachant que… »</h3>\n<p>$P_A(B)$ (ou $P(B\\mid A)$) est la probabilité de $B$ <strong>quand on sait que $A$ est réalisé</strong> : on se restreint au monde où $A$ est arrivé.</p>\n<div class=\"formula-box\">$P_A(B) = \\dfrac{P(A\\cap B)}{P(A)}$ &nbsp;&nbsp;⟺&nbsp;&nbsp; $P(A\\cap B) = P(A)\\times P_A(B)$</div>\n<p>Ces deux formules sont la <mark>même égalité lue dans les deux sens</mark> : tu cherches $P_A(B)$ → divise ; tu cherches $P(A\\cap B)$ → multiplie.</p>\n<p><strong>Exemple (tableau d'effectifs).</strong> Sur $150$ personnes, $90$ sont des femmes ($F$) et $60$ des hommes. Parmi les femmes, $54$ portent des lunettes ($L$) ; parmi les hommes, $24$.</p>\n<table class=\"formula-table\">\n<tr><th></th><th>Lunettes</th><th>Pas de lunettes</th><th>Total</th></tr>\n<tr><td>Femmes</td><td>54</td><td>36</td><td>90</td></tr>\n<tr><td>Hommes</td><td>24</td><td>36</td><td>60</td></tr>\n<tr><td>Total</td><td>78</td><td>72</td><td>150</td></tr>\n</table>\n<p>$P(L) = \\dfrac{78}{150} = 0{,}52$. $P_F(L) = \\dfrac{54}{90} = 0{,}6$ (parmi les <em>femmes</em>). $P_L(F) = \\dfrac{54}{78} = \\dfrac{9}{13} \\approx 0{,}692$ (parmi les <em>porteurs de lunettes</em>).</p>\n<div class=\"attention-box\">$P_F(L) \\neq P_L(F)$ ! Le « sachant que » change l'ensemble de référence (le dénominateur). Avant de calculer, demande-toi : <strong>« parmi qui ? »</strong></div>\n\n<h3>3. Arbre pondéré et probabilités totales</h3>\n<div class=\"retenir-box\">\n<strong>Règle 1</strong> : la somme des probabilités des branches qui partent d'un même nœud vaut $1$.<br>\n<strong>Règle 2</strong> : on <mark>multiplie</mark> le long d'un chemin (c'est $P(A\\cap B)$).<br>\n<strong>Règle 3</strong> : on <mark>additionne</mark> les chemins qui mènent à l'événement cherché (probabilités totales).\n</div>\n<p><strong>Exemple.</strong> Un élève prend le bus avec la probabilité $0{,}3$ (événement $B$), sinon il vient à vélo. En bus, il arrive en retard ($R$) avec la probabilité $0{,}1$ ; à vélo, avec la probabilité $0{,}04$.</p>\n<p>$P(R) = P(B\\cap R) + P(\\overline{B}\\cap R) = 0{,}3\\times 0{,}1 + 0{,}7\\times 0{,}04 = 0{,}03 + 0{,}028 = 0{,}058$.</p>\n<p><strong>Le sens inverse.</strong> Il est en retard : quelle est la probabilité qu'il ait pris le bus ? $P_R(B) = \\dfrac{P(B\\cap R)}{P(R)} = \\dfrac{0{,}03}{0{,}058} = \\dfrac{15}{29} \\approx 0{,}517$. On « remonte » l'arbre : numérateur = le chemin concerné, dénominateur = tous les chemins qui mènent à $R$.</p>\n\n<h3>4. Événements indépendants</h3>\n<p>$A$ et $B$ sont <strong>indépendants</strong> si savoir que $A$ est arrivé ne change pas la probabilité de $B$ :</p>\n<div class=\"formula-box\">$A$ et $B$ indépendants ⟺ $P(A\\cap B) = P(A)\\times P(B)$ ⟺ $P_A(B) = P(B)$</div>\n<p><strong>Tester l'indépendance (dé équilibré).</strong> $A$ : « pair » ($P = \\tfrac12$), $B$ : « $\\geq 5$ » ($P = \\tfrac13$). $A\\cap B = \\{6\\}$ donc $P(A\\cap B) = \\tfrac16 = \\tfrac12\\times\\tfrac13$ : <strong>indépendants</strong>. Avec $B'$ : « $\\geq 4$ » ($P = \\tfrac12$), $A\\cap B' = \\{4\\,;6\\}$ donc $P = \\tfrac13 \\neq \\tfrac12\\times\\tfrac12 = \\tfrac14$ : <strong>pas indépendants</strong>.</p>\n<div class=\"attention-box\"><strong>Incompatibles ≠ indépendants.</strong> Deux événements incompatibles (de probabilités non nulles) sont même <em>très dépendants</em> : si l'un arrive, l'autre ne peut plus arriver.</div>\n\n<h3>5. Loi binomiale</h3>\n<p>Une <strong>épreuve de Bernoulli</strong> n'a que 2 issues : succès (probabilité $p$) ou échec ($1-p$). On en répète $n$ fois, de façon <strong>identique et indépendante</strong>. Si $X$ compte le nombre de succès, on dit que $X$ suit la loi binomiale $\\mathcal{B}(n\\,;p)$.</p>\n<div class=\"formula-box latex-block\">$$P(X = k) = \\binom{n}{k}\\,p^k\\,(1-p)^{n-k}$$\n$E(X) = np \\qquad V(X) = np(1-p) \\qquad \\sigma = \\sqrt{np(1-p)}$</div>\n<p>$\\binom{n}{k}$ = nombre de chemins de l'arbre qui contiennent exactement $k$ succès (touche <em>nCr</em> de la calculatrice ; $\\binom{5}{2} = 10$).</p>\n<p><strong>Exemple.</strong> Un QCM de $5$ questions à $4$ choix, répondu au hasard : $X \\sim \\mathcal{B}(5\\,;0{,}25)$. $P(X = 2) = 10\\times 0{,}25^2\\times 0{,}75^3 \\approx 0{,}2637$. $E(X) = 5\\times 0{,}25 = 1{,}25$ bonne réponse en moyenne.</p>\n<div class=\"retenir-box\"><strong>« Au moins un »</strong> : on passe par le contraire. $P(X\\geq 1) = 1 - P(X = 0) = 1 - (1-p)^n$. Ici : $1 - 0{,}75^5 \\approx 0{,}763$.</div>\n\n<h3>6. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Confondre $P_A(B)$ et $P_B(A)$.<br>\n❌ Additionner le long d'un chemin au lieu de multiplier (ou l'inverse entre chemins).<br>\n❌ Appliquer $P(A\\cap B) = P(A)P(B)$ sans avoir vérifié que $A$ et $B$ sont indépendants.<br>\n❌ Utiliser la loi binomiale pour un tirage <strong>sans remise</strong> (les tirages ne sont plus indépendants).<br>\n❌ Oublier le coefficient $\\binom{n}{k}$ dans $P(X=k)$.\n</div>",
exercices:[
{niveau:"Facile",
 enonce:"<p>Un sac contient 5 boules rouges et 3 boules bleues. On tire une boule au hasard. Calcule la probabilité de tirer une boule rouge, puis une boule bleue.</p>",
 aide:"Probabilité = nombre de cas favorables / nombre de cas total. Il y a 8 boules en tout.",
 correction:"<p>Total : 5 + 3 = 8 boules.</p><p>$P(\\text{rouge}) = \\frac{5}{8}$</p><p>$P(\\text{bleue}) = \\frac{3}{8}$</p><p>Vérification : $\\frac{5}{8} + \\frac{3}{8} = 1$ ✓ (les deux événements sont complémentaires)</p>"},
{niveau:"Moyen",
 enonce:"<p>Dans une classe, 60% des élèves aiment les maths (événement A) et 40% aiment l'anglais (événement B). 25% aiment les deux matières. Calcule P(A∪B), la probabilité qu'un élève aime au moins une des deux matières.</p>",
 aide:"Utilise la formule P(A∪B) = P(A) + P(B) − P(A∩B). Attention à ne pas compter deux fois ceux qui aiment les deux.",
 correction:"<p>$P(A) = 0,6$ ; $P(B) = 0,4$ ; $P(A \\cap B) = 0,25$</p><p>$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0,6 + 0,4 - 0,25 = 0,75$</p><p>75% des élèves aiment au moins une des deux matières. Sans la soustraction de P(A∩B), on aurait compté deux fois les élèves qui aiment les deux — erreur classique.</p>"},
{niveau:"Difficile",
 enonce:"<p>Une entreprise fabrique des pièces avec 2 machines. La machine A produit 70% des pièces avec un taux de défaut de 3%. La machine B produit 30% des pièces avec un taux de défaut de 8%. Quelle est la probabilité qu'une pièce prise au hasard soit défectueuse ?</p>",
 aide:"C'est une situation de probabilités totales : (A, B) forme une partition. Utilise P(défaut) = P(A)×P(défaut|A) + P(B)×P(défaut|B).",
 correction:"<p>Notons D l'événement \"la pièce est défectueuse\".</p><p>$P(D) = P(A) \\times P(D|A) + P(B) \\times P(D|B)$</p><p>$P(D) = 0,7 \\times 0,03 + 0,3 \\times 0,08 = 0,021 + 0,024 = 0,045$</p><p>La probabilité qu'une pièce prise au hasard soit défectueuse est de <strong>4,5%</strong>.</p>"},
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
 correction:"<p>1) $X \\sim \\mathcal{B}(4\\,;0{,}7)$.</p><p>2) $P(X = 3) = \\binom{4}{3}\\times 0{,}7^3\\times 0{,}3 = 4\\times 0{,}343\\times 0{,}3 = 0{,}4116$. $P(X = 4) = 0{,}7^4 = 0{,}2401$.</p><p>3) $P(X\\geq 3) = P(X=3) + P(X=4) = 0{,}4116 + 0{,}2401 = 0{,}6517$.</p><p>4) $E(X) = 4\\times 0{,}7 = 2{,}8$ : en moyenne, environ 3 lancers réussis sur 4.</p>"},
{niveau:"Difficile",
 enonce:"<p>Une maladie touche $2\\,\\%$ d'une population. Un test est positif dans $95\\,\\%$ des cas si la personne est malade, et dans $3\\,\\%$ des cas si elle est saine (faux positifs). On choisit une personne au hasard.<br>1) Calcule la probabilité que le test soit positif.<br>2) Le test est positif : quelle est la probabilité que la personne soit réellement malade ? Que penses-tu du résultat ?</p>",
 aide:"Fais un arbre : M (0,02) / non M (0,98), puis T positif avec 0,95 ou 0,03. Pour la question 2, c'est un « sachant que » : divise le chemin M∩T par P(T).",
 correction:"<p>Notons $M$ « malade » et $T$ « test positif ».</p><p>1) $P(T) = P(M)P_M(T) + P(\\overline{M})P_{\\overline{M}}(T) = 0{,}02\\times 0{,}95 + 0{,}98\\times 0{,}03 = 0{,}019 + 0{,}0294 = 0{,}0484$.</p><p>2) $P_T(M) = \\dfrac{P(M\\cap T)}{P(T)} = \\dfrac{0{,}019}{0{,}0484} \\approx 0{,}393$.</p><p>Seulement <strong>39 %</strong> des personnes au test positif sont malades, alors que le test est « fiable à 95 % ». Explication : la maladie est rare, donc les faux positifs ($0{,}0294$) sont presque aussi nombreux que les vrais positifs ($0{,}019$). Un résultat contre-intuitif mais classique.</p>"},
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
'Fonctions exp & ln': {
cours:"<div class=\"attention-box\">L'exponentielle décrit tout ce qui <strong>croît ou décroît proportionnellement à sa valeur</strong> : population, intérêts composés, désintégration radioactive, charge ou décharge d'un condensateur. Le logarithme népérien est son « opération inverse » : il sert à <strong>retrouver l'exposant</strong>. Quand tu comprends qu'ils se défont mutuellement, 80 % du chapitre devient évident.</div>\n\n<h3>1. La fonction exponentielle</h3>\n<p>$\\exp(x) = e^x$ est la fonction qui est <mark>égale à sa propre dérivée</mark> et vaut $1$ en $0$. On a $e \\approx 2{,}718$.</p>\n<div class=\"formula-box\">$e^0 = 1$ &nbsp; $e^1 = e$ &nbsp; $e^x > 0$ pour tout $x$ &nbsp; $(e^x)' = e^x$ (donc $e^x$ est <strong>strictement croissante</strong>)</div>\n<p>Sa courbe est toujours au-dessus de l'axe des abscisses, passe par $(0\\,;1)$, et sa tangente en $0$ est $y = x + 1$.</p>\n\n<h3>2. Règles de calcul</h3>\n<div class=\"formula-box\">\n$e^{a+b} = e^a\\times e^b$ &nbsp;&nbsp; $e^{a-b} = \\dfrac{e^a}{e^b}$ &nbsp;&nbsp; $e^{-a} = \\dfrac{1}{e^a}$ &nbsp;&nbsp; $(e^a)^n = e^{na}$\n</div>\n<p><strong>Exemple.</strong> $\\dfrac{e^{3x}\\times e^{-x}}{e^{x+2}} = e^{3x - x - (x+2)} = e^{x-2}$. <em>Astuce : additionne les exposants quand on multiplie, soustrais quand on divise.</em></p>\n\n<h3>3. Dérivée et variations avec l'exponentielle</h3>\n<div class=\"formula-box\">$(e^{u})' = u'\\,e^{u}$ &nbsp;&nbsp; en particulier $(e^{ax+b})' = a\\,e^{ax+b}$</div>\n<p>Ex : $(e^{-2x+1})' = -2\\,e^{-2x+1}$. Avec un produit : $(x\\,e^x)' = 1\\times e^x + x\\times e^x = (1+x)\\,e^x$.</p>\n<div class=\"retenir-box\">Comme $e^{x}>0$ (et $e^{u}>0$), le <strong>signe de $f'$</strong> est celui du facteur qui reste après avoir <mark>factorisé par l'exponentielle</mark>.</div>\n<p><strong>Exemple.</strong> $f(x) = (x-2)e^x$ : $f'(x) = e^x + (x-2)e^x = (x-1)\\,e^x$. Donc $f'<0$ si $x<1$ et $f'>0$ si $x>1$ : $f$ décroît puis croît, avec un <strong>minimum $f(1) = -e \\approx -2{,}72$</strong>.</p>\n\n<h3>4. Résoudre avec l'exponentielle</h3>\n<ul>\n<li>$e^{u} = e^{v} \\Leftrightarrow u = v$ &nbsp;&nbsp; et &nbsp;&nbsp; $e^{u} < e^{v} \\Leftrightarrow u < v$ (le sens est conservé car exp est croissante).</li>\n<li>$e^x = a$ : si $a > 0$, $x = \\ln a$ ; si $a \\leq 0$, <strong>aucune solution</strong> (une exponentielle est toujours strictement positive).</li>\n</ul>\n<p>Ex : $e^{2x-1} = e^{x+3} \\Leftrightarrow 2x - 1 = x + 3 \\Leftrightarrow x = 4$.</p>\n<p><strong>Astuce :</strong> une équation du type $e^{2x} - 5e^x + 4 = 0$ se ramène au second degré en posant <mark>$X = e^x$</mark> (car $e^{2x} = (e^x)^2$) : $X^2 - 5X + 4 = 0$. N'oublie pas ensuite de revenir à $x$, et de rejeter les valeurs $X \\leq 0$.</p>\n\n<h3>5. Le logarithme népérien</h3>\n<p>Pour $a > 0$, $\\ln a$ est <strong>l'unique nombre dont l'exponentielle vaut $a$</strong>. Autrement dit, $\\ln$ et $\\exp$ sont réciproques : elles se défont.</p>\n<div class=\"formula-box\">$\\ln(e^x) = x$ pour tout $x$ &nbsp;&nbsp; $e^{\\ln x} = x$ pour $x>0$ &nbsp;&nbsp; $\\ln 1 = 0$ &nbsp;&nbsp; $\\ln e = 1$</div>\n<div class=\"formula-box\">$\\ln(ab) = \\ln a + \\ln b$ &nbsp;&nbsp; $\\ln\\dfrac{a}{b} = \\ln a - \\ln b$ &nbsp;&nbsp; $\\ln\\dfrac{1}{a} = -\\ln a$ &nbsp;&nbsp; $\\ln(a^n) = n\\ln a$</div>\n<div class=\"attention-box\"><strong>$\\ln(a+b)$ ne se simplifie pas !</strong> $\\ln(a+b) \\neq \\ln a + \\ln b$. Seuls les <em>produits</em> deviennent des sommes. Et $\\ln x$ n'existe que pour <mark>$x > 0$</mark>.</div>\n<p><strong>Variations.</strong> $\\ln$ est strictement croissante sur $]0\\,;+\\infty[$, avec $(\\ln x)' = \\dfrac{1}{x}$ et plus généralement $(\\ln u)' = \\dfrac{u'}{u}$ (pour $u>0$). Elle est négative sur $]0\\,;1[$ et positive sur $]1\\,;+\\infty[$.</p>\n<p>Ex : $(\\ln(2x+1))' = \\dfrac{2}{2x+1}$.</p>\n\n<h3>6. Résoudre avec le logarithme (et vérifier le domaine !)</h3>\n<ul>\n<li>$\\ln x = a \\Leftrightarrow x = e^{a}$. &nbsp; Ex : $\\ln(x-1) = 2 \\Leftrightarrow x - 1 = e^2 \\Leftrightarrow x = 1 + e^2 \\approx 8{,}39$.</li>\n<li>$\\ln u = \\ln v \\Leftrightarrow u = v$ et $\\ln u < \\ln v \\Leftrightarrow u < v$ <strong>(avec $u>0$ et $v>0$)</strong>.</li>\n</ul>\n<p><strong>Exemple avec piège.</strong> Résoudre $\\ln x + \\ln(x-2) = \\ln 3$. <em>Domaine</em> : $x > 0$ et $x - 2 > 0$, donc $x > 2$. On regroupe : $\\ln\\big(x(x-2)\\big) = \\ln 3 \\Rightarrow x^2 - 2x - 3 = 0 \\Rightarrow (x-3)(x+1) = 0$. Deux candidats : $3$ et $-1$. Or $-1$ n'est pas dans le domaine : la <strong>seule solution est $x = 3$</strong>.</p>\n\n<h3>7. Application : décroissance exponentielle et demi-vie</h3>\n<p>Une quantité qui décroît selon $Q(t) = Q_0\\,e^{-\\lambda t}$ (avec $\\lambda > 0$) a pour <strong>demi-vie</strong> le temps $t_{1/2}$ tel que $Q = \\tfrac{Q_0}{2}$ : $e^{-\\lambda t} = \\tfrac12 \\Leftrightarrow -\\lambda t = -\\ln 2 \\Leftrightarrow t_{1/2} = \\dfrac{\\ln 2}{\\lambda}$. Ex : $\\lambda = 0{,}1$ → $t_{1/2} = \\dfrac{0{,}693}{0{,}1} \\approx 6{,}9$.</p>\n\n<h3>8. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Écrire $e^{a+b} = e^a + e^b$ (c'est un <em>produit</em>).<br>\n❌ Écrire $\\ln(a+b) = \\ln a + \\ln b$.<br>\n❌ Résoudre $e^x = -3$ : impossible, une exponentielle est toujours $> 0$.<br>\n❌ Oublier de vérifier le domaine ($\\ln$ exige un argument strictement positif).<br>\n❌ Oublier le $u'$ en dérivant $e^{u}$ ou $\\ln u$.\n</div>",
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
 correction:"<p>$u = 2x+1$, $u' = 2$ ; $v = e^{-x}$, $v' = -e^{-x}$.</p><p>$f'(x) = 2e^{-x} + (2x+1)(-e^{-x}) = e^{-x}\\,(2 - 2x - 1) = (1 - 2x)\\,e^{-x}$.</p><p>Comme $e^{-x} > 0$, le signe de $f'$ est celui de $1 - 2x$ : $f' > 0$ si $x < \\tfrac12$ et $f' < 0$ si $x > \\tfrac12$.</p><p>$f$ croît sur $]-\\infty\\,;\\tfrac12]$ puis décroît sur $[\\tfrac12\\,;+\\infty[$. Maximum : $f\\!\\left(\\tfrac12\\right) = 2\\,e^{-1/2} = \\dfrac{2}{\\sqrt{e}} \\approx 1{,}21$.</p>"},
{niveau:"Difficile",
 enonce:"<p>La quantité d'un élément radioactif suit la loi $N(t) = N_0\\,e^{-0{,}05\\,t}$ ($t$ en années).<br>1) Calcule la demi-vie, c'est-à-dire le temps au bout duquel il reste la moitié de la quantité initiale.<br>2) Quel pourcentage reste-t-il au bout de $30$ ans ?<br>3) Au bout de combien de temps ne reste-t-il que $10\\,\\%$ de la quantité initiale ?</p>",
 aide:"Il reste la moitié : e^(−0,05t) = 1/2. Prends le logarithme des deux côtés. Pour la question 3, c'est e^(−0,05t) = 0,1.",
 correction:"<p>1) $e^{-0{,}05t} = \\tfrac12 \\Leftrightarrow -0{,}05\\,t = \\ln\\tfrac12 = -\\ln 2 \\Leftrightarrow t = \\dfrac{\\ln 2}{0{,}05} \\approx 13{,}9$ ans.</p><p>2) $\\dfrac{N(30)}{N_0} = e^{-1{,}5} \\approx 0{,}223$ : il reste environ <strong>22,3 %</strong>.</p><p>3) $e^{-0{,}05t} = 0{,}1 \\Leftrightarrow -0{,}05\\,t = \\ln 0{,}1 = -\\ln 10 \\Leftrightarrow t = \\dfrac{\\ln 10}{0{,}05} \\approx 46{,}1$ ans.</p>"},
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
'Produit scalaire & loi d\'Al-Kashi': {
cours:`<div class="attention-box">Ce chapitre est du programme de <mark>Première</mark>, souvent mal aimé — pas parce qu'il est difficile, mais parce qu'il y a <strong>3 formules différentes</strong> pour la même chose et qu'on ne sait plus laquelle utiliser. Ce cours te donne, pour chaque situation, la formule à choisir en premier réflexe.</p></div>

<h3>1. Qu'est-ce que le produit scalaire ?</h3>
<p>Le produit scalaire de deux vecteurs $\\vec{u}$ et $\\vec{v}$, noté $\\vec{u}\\cdot\\vec{v}$, est un <strong>nombre</strong> (pas un vecteur !). Il mesure à quel point deux vecteurs "pointent dans la même direction".</p>
<div class="formula-box">
Si $\\vec{u}\\cdot\\vec{v} > 0$ : les vecteurs pointent globalement dans la même direction.<br>
Si $\\vec{u}\\cdot\\vec{v} = 0$ : les vecteurs sont <strong>orthogonaux</strong> (perpendiculaires).<br>
Si $\\vec{u}\\cdot\\vec{v} < 0$ : les vecteurs pointent globalement dans des directions opposées.
</div>

<h3>2. Les 3 formules — laquelle choisir ?</h3>
<div class="retenir-box">
<strong>A) Avec des coordonnées</strong> → $\\vec{u}\\cdot\\vec{v} = xx' + yy'$ si $\\vec{u}(x;y)$ et $\\vec{v}(x';y')$.<br>
<strong>B) Avec des normes et un angle</strong> → $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u},\\vec{v})$<br>
<strong>C) Avec 3 longueurs de triangle</strong> → $\\vec{AB}\\cdot\\vec{AC} = \\dfrac{AB^2 + AC^2 - BC^2}{2}$
</div>
<p>Réflexe à avoir : <strong>on te donne des coordonnées → formule A.</strong> <strong>On te donne des longueurs et un angle → formule B.</strong> <strong>On te donne 3 longueurs de triangle sans angle → formule C.</strong></p>

<h3>Exemple — formule A (coordonnées)</h3>
<p>$\\vec{u}(3;-2)$ et $\\vec{v}(1;4)$. $\\vec{u}\\cdot\\vec{v} = 3\\times 1 + (-2)\\times 4 = 3 - 8 = -5$.</p>

<h3>Exemple — formule B (normes + angle)</h3>
<p>$\\|\\vec{u}\\| = 4$, $\\|\\vec{v}\\| = 5$, angle entre eux $= 60°$. $\\vec{u}\\cdot\\vec{v} = 4 \\times 5 \\times \\cos(60°) = 20 \\times 0{,}5 = 10$.</p>

<h3>Exemple — formule C (3 longueurs)</h3>
<p>Triangle $ABC$ avec $AB=6$, $AC=8$, $BC=5$. $\\vec{AB}\\cdot\\vec{AC} = \\dfrac{6^2+8^2-5^2}{2} = \\dfrac{36+64-25}{2} = \\dfrac{75}{2} = 37{,}5$.</p>
<div class="attention-box">Erreur n°1 la plus fréquente dans la formule C : mettre $BC^2$ (le côté OPPOSÉ au sommet A, entre les 2 autres points B et C) au lieu de $AB^2$ ou $AC^2$. Le côté qui se soustrait est toujours celui qui relie les <mark>deux extrémités</mark> des vecteurs (ici B et C), jamais celui qui part de l'origine commune A.</div>

<h3>3. Test d'orthogonalité</h3>
<p>Deux vecteurs sont perpendiculaires <strong>si et seulement si</strong> leur produit scalaire vaut 0. C'est l'usage le plus fréquent de la formule A.</p>
<p><strong>Exemple :</strong> $\\vec{u}(2;3)$ et $\\vec{v}(-6;4)$. $\\vec{u}\\cdot\\vec{v} = 2\\times(-6) + 3\\times 4 = -12+12 = 0$ → les vecteurs sont <strong>orthogonaux</strong>.</p>

<h3>4. La loi d'Al-Kashi (théorème de Pythagore généralisé)</h3>
<p>Dans un triangle quelconque $ABC$ (pas forcément rectangle), avec $a=BC$, $b=AC$, $c=AB$ (chaque côté minuscule est <mark>en face</mark> du sommet majuscule correspondant) :</p>
<div class="formula-box">
$a^2 = b^2 + c^2 - 2bc\\cos(\\hat{A})$
</div>
<div class="attention-box">Repère bien : le côté $a$ (celui qu'on isole à gauche) est <strong>en face</strong> de l'angle $\\hat{A}$ utilisé dans le cosinus, à droite. Si tu cherches le côté en face de $\\hat{B}$, c'est $b^2 = a^2+c^2-2ac\\cos(\\hat{B})$ — la lettre isolée à gauche doit toujours correspondre à l'angle du cosinus à droite.</div>
<div class="retenir-box">Si $\\hat{A}=90°$ : $\\cos(90°)=0$, donc $a^2=b^2+c^2$ : on retombe sur le <mark>théorème de Pythagore</mark>. Al-Kashi est donc une généralisation de Pythagore à n'importe quel triangle, pas seulement les triangles rectangles.</div>

<h3>Utilisation n°1 — trouver un côté (on connaît 2 côtés + l'angle entre eux)</h3>
<p><strong>Exemple :</strong> $b=7$, $c=5$, $\\hat{A}=60°$. Cherche $a$.</p>
<p>$a^2 = 7^2+5^2-2\\times 7\\times 5\\times\\cos(60°) = 49+25-70\\times 0{,}5 = 74-35=39$</p>
<p>$a=\\sqrt{39}\\approx 6{,}24$</p>

<h3>Utilisation n°2 — trouver un angle (on connaît les 3 côtés)</h3>
<p>On isole $\\cos(\\hat{A})$ dans la formule : $\\cos(\\hat{A}) = \\dfrac{b^2+c^2-a^2}{2bc}$</p>
<p><strong>Exemple :</strong> $a=8$, $b=6$, $c=5$. Cherche $\\hat{A}$ (en face du côté $a$).</p>
<p>$\\cos(\\hat{A}) = \\dfrac{6^2+5^2-8^2}{2\\times 6\\times 5} = \\dfrac{36+25-64}{60} = \\dfrac{-3}{60} = -0{,}05$</p>
<p>$\\hat{A} = \\cos^{-1}(-0{,}05) \\approx 92{,}9°$</p>
<div class="attention-box">Un résultat de cosinus <mark>négatif</mark> donne un angle <strong>obtus</strong> (entre 90° et 180°) — ce n'est pas une erreur, c'est normal pour certains triangles ! Vérifie juste que ta calculatrice est bien en mode <strong>degrés</strong> (ou radians, selon ce qu'on te demande) avant d'utiliser $\\cos^{-1}$ (parfois noté $\\arccos$).</div>

<h3>5. Aire d'un triangle avec un angle</h3>
<div class="formula-box">
$\\text{Aire} = \\dfrac{1}{2} \\times b \\times c \\times \\sin(\\hat{A})$
</div>
<p>où $\\hat{A}$ est l'angle <strong>entre</strong> les côtés $b$ et $c$ dont tu connais les longueurs (contrairement à Al-Kashi qui utilise $\\cos$, l'aire utilise $\\sin$).</p>
<p><strong>Exemple :</strong> $b=7$, $c=5$, $\\hat{A}=60°$. $\\text{Aire} = \\dfrac{1}{2}\\times 7\\times 5\\times\\sin(60°) = 17{,}5\\times 0{,}866 \\approx 15{,}2$ unités d'aire.</p>

<h3>📋 Méthode : quelle formule choisir face à un exercice ?</h3>
<div class="retenir-box">
<strong>On te donne des coordonnées</strong> → produit scalaire formule A ($xx'+yy'$), souvent pour un test d'orthogonalité.<br>
<strong>On te donne 2 côtés + l'angle entre eux, et on cherche le 3e côté</strong> → Al-Kashi, formule directe ($a^2=b^2+c^2-2bc\\cos A$).<br>
<strong>On te donne les 3 côtés, et on cherche un angle</strong> → Al-Kashi, formule inversée ($\\cos A = \\frac{b^2+c^2-a^2}{2bc}$).<br>
<strong>On te donne 2 côtés + l'angle entre eux, et on cherche une aire</strong> → $\\frac{1}{2}bc\\sin A$.
</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Calcule $\\vec{u}\\cdot\\vec{v}$ avec $\\vec{u}(5;-1)$ et $\\vec{v}(2;3)$.</p>`, aide:`Utilise la formule A : xx' + yy'.`, correction:`<p>$\\vec{u}\\cdot\\vec{v} = 5\\times 2 + (-1)\\times 3 = 10-3 = 7$.</p>`},
{niveau:'Facile', enonce:`<p>$\\|\\vec{u}\\|=3$, $\\|\\vec{v}\\|=6$, l'angle entre eux vaut $90°$. Calcule $\\vec{u}\\cdot\\vec{v}$ sans poser de calcul détaillé : justifie ta réponse en une phrase.</p>`, aide:`Que vaut cos(90°) ?`, correction:`<p>$\\cos(90°)=0$, donc $\\vec{u}\\cdot\\vec{v} = 3\\times 6\\times 0 = 0$ quelles que soient les normes. C'est cohérent : un angle de 90° signifie que les vecteurs sont orthogonaux, et le produit scalaire de deux vecteurs orthogonaux vaut toujours 0.</p>`},
{niveau:'Facile', enonce:`<p>Les vecteurs $\\vec{u}(4;6)$ et $\\vec{v}(3;-2)$ sont-ils orthogonaux ?</p>`, aide:`Calcule le produit scalaire avec la formule A et regarde s'il vaut 0.`, correction:`<p>$\\vec{u}\\cdot\\vec{v} = 4\\times 3 + 6\\times(-2) = 12-12=0$. Le produit scalaire vaut 0, donc <strong>oui, les vecteurs sont orthogonaux</strong>.</p>`},
{niveau:'Moyen', enonce:`<p>Dans un triangle $ABC$, $AB=9$, $AC=7$, $BC=6$. Calcule $\\vec{AB}\\cdot\\vec{AC}$.</p>`, aide:`Utilise la formule C, en faisant bien attention à quel côté se soustrait (celui qui relie les extrémités des deux vecteurs, donc BC).`, correction:`<p>$\\vec{AB}\\cdot\\vec{AC} = \\dfrac{AB^2+AC^2-BC^2}{2} = \\dfrac{81+49-36}{2} = \\dfrac{94}{2} = 47$.</p>`},
{niveau:'Moyen', enonce:`<p>Dans un triangle $ABC$, $AB=10$, $AC=8$ et l'angle $\\hat{A}=45°$. Calcule $BC$ (valeur exacte puis arrondie au dixième).</p>`, aide:`On connaît 2 côtés et l'angle entre eux (en A) : c'est Al-Kashi, utilisation n°1. Attention : ici a = BC est en face de l'angle A.`, correction:`<p>$BC^2 = AB^2+AC^2-2\\times AB\\times AC\\times\\cos(\\hat{A}) = 100+64-2\\times 10\\times 8\\times\\cos(45°)$</p><p>$BC^2 = 164 - 160\\times\\dfrac{\\sqrt{2}}{2} = 164-80\\sqrt{2}$</p><p>$BC = \\sqrt{164-80\\sqrt{2}} \\approx 6{,}0$</p>`},
{niveau:'Moyen', enonce:`<p>Dans un triangle $ABC$, $AB=6$, $AC=9$ et l'angle $\\hat{A}=50°$. Calcule l'aire du triangle (arrondie au dixième).</p>`, aide:`On connaît 2 côtés et l'angle entre eux : formule de l'aire avec sinus.`, correction:`<p>$\\text{Aire} = \\dfrac{1}{2}\\times AB\\times AC\\times\\sin(\\hat{A}) = \\dfrac{1}{2}\\times 6\\times 9\\times\\sin(50°) \\approx 27\\times 0{,}766 \\approx 20{,}7$ unités d'aire.</p>`},
{niveau:'Difficile', enonce:`<p>Dans un triangle $ABC$, $a=BC=11$, $b=AC=7$, $c=AB=8$. Calcule l'angle $\\hat{A}$ (arrondi au degré), puis dis si le triangle est obtusangle (a un angle obtus) en $A$.</p>`, aide:`On connaît les 3 côtés : Al-Kashi formule inversée pour trouver cos(A). Un angle est obtus si son cosinus est négatif.`, correction:`<p>$\\cos(\\hat{A}) = \\dfrac{b^2+c^2-a^2}{2bc} = \\dfrac{49+64-121}{2\\times 7\\times 8} = \\dfrac{-8}{112} \\approx -0{,}071$</p><p>$\\hat{A} = \\cos^{-1}(-0{,}071) \\approx 94{,}1°$</p><p>Le cosinus est négatif et l'angle dépasse 90°, donc <strong>oui, le triangle est obtusangle en A</strong>.</p>`},
{niveau:'Difficile', enonce:`<p>Démontre, à partir de la formule $\\vec{AB}\\cdot\\vec{AC} = \\|\\vec{AB}\\|\\times\\|\\vec{AC}\\|\\times\\cos(\\hat{A})$ et de la formule $\\vec{AB}\\cdot\\vec{AC}=\\dfrac{AB^2+AC^2-BC^2}{2}$, que l'on retrouve bien la loi d'Al-Kashi $BC^2=AB^2+AC^2-2\\times AB\\times AC\\times\\cos(\\hat{A})$.</p>`, aide:`Les deux expressions du produit scalaire sont égales : pose l'égalité, puis isole BC².`, correction:`<p>Les deux formules calculent la même chose, donc :</p><p>$AB\\times AC\\times\\cos(\\hat{A}) = \\dfrac{AB^2+AC^2-BC^2}{2}$</p><p>On multiplie les deux membres par 2 :</p><p>$2\\times AB\\times AC\\times\\cos(\\hat{A}) = AB^2+AC^2-BC^2$</p><p>On isole $BC^2$ :</p><p>$BC^2 = AB^2+AC^2-2\\times AB\\times AC\\times\\cos(\\hat{A})$ ✓ — c'est exactement la loi d'Al-Kashi. Elle n'est donc pas une formule à part : c'est une conséquence directe des deux façons de calculer le produit scalaire.</p>`},
{niveau:'Difficile', enonce:`<p>Un triangle $ABC$ vérifie $AB=13$, $AC=14$, $BC=15$. Calcule l'aire du triangle en passant d'abord par l'angle $\\hat{A}$ (Al-Kashi puis formule de l'aire).</p>`, aide:`Étape 1 : trouve cos(A) avec Al-Kashi (3 côtés connus). Étape 2 : trouve sin(A) avec cos²+sin²=1 (A est forcément entre 0 et 180°, donc sin(A) > 0). Étape 3 : applique la formule de l'aire.`, correction:`<p><strong>Étape 1 :</strong> $\\cos(\\hat{A}) = \\dfrac{AB^2+AC^2-BC^2}{2\\times AB\\times AC} = \\dfrac{169+196-225}{2\\times 13\\times 14} = \\dfrac{140}{364} \\approx 0{,}3846$</p><p><strong>Étape 2 :</strong> $\\sin^2(\\hat{A}) = 1-0{,}3846^2 \\approx 0{,}8521$, donc $\\sin(\\hat{A})\\approx 0{,}923$ (positif car un angle de triangle est toujours entre 0° et 180°).</p><p><strong>Étape 3 :</strong> $\\text{Aire} = \\dfrac{1}{2}\\times AB\\times AC\\times\\sin(\\hat{A}) = \\dfrac{1}{2}\\times 13\\times 14\\times 0{,}923 \\approx 84$ unités d'aire.</p>`},
],
flashcards:[
{q:'Le produit scalaire, c\'est un vecteur ou un nombre ?',a:'Un nombre (un scalaire) — jamais un vecteur, malgré le nom "produit".'},
{q:'Formule du produit scalaire avec des coordonnées',a:'u⃗(x;y) et v⃗(x\';y\') : u⃗·v⃗ = xx\' + yy\''},
{q:'Formule du produit scalaire avec normes et angle',a:'u⃗·v⃗ = ‖u⃗‖ × ‖v⃗‖ × cos(u⃗,v⃗)'},
{q:'Formule du produit scalaire avec 3 longueurs de triangle (AB⃗·AC⃗)',a:'AB⃗·AC⃗ = (AB² + AC² − BC²) / 2 — le côté qui se soustrait relie toujours les extrémités des deux vecteurs (ici B et C), jamais l\'origine A.'},
{q:'Test d\'orthogonalité de deux vecteurs',a:'Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire vaut 0.'},
{q:'Loi d\'Al-Kashi',a:'a² = b² + c² − 2bc·cos(Â), où a est le côté en face de l\'angle Â.'},
{q:'Al-Kashi et Pythagore : le lien',a:'Si Â = 90°, cos(Â) = 0, donc a² = b² + c² : on retrouve Pythagore. Al-Kashi généralise Pythagore à tout triangle.'},
{q:'Al-Kashi pour trouver un angle à partir des 3 côtés',a:'cos(Â) = (b² + c² − a²) / (2bc)'},
{q:'Que signifie un cos(Â) négatif trouvé avec Al-Kashi ?',a:'L\'angle  est obtus (entre 90° et 180°) — ce n\'est pas une erreur, c\'est un résultat possible et normal.'},
{q:'Aire d\'un triangle avec un angle entre deux côtés connus',a:'Aire = (1/2) × b × c × sin(Â), où  est l\'angle entre les côtés b et c.'},
{q:'Al-Kashi utilise cos ou sin ?',a:'cos. L\'aire du triangle, elle, utilise sin. Ne pas confondre les deux formules.'},
{q:'Quand utiliser la formule Al-Kashi "directe" (trouver un côté)',a:'Quand on connaît 2 côtés et l\'angle entre eux, et qu\'on cherche le 3e côté.'},
{q:'Quand utiliser la formule Al-Kashi "inversée" (trouver un angle)',a:'Quand on connaît les 3 côtés du triangle et qu\'on cherche un angle.'},
]},
};
