/* ============================================================
   BACMASTER — data/maths.js
   Cours et flashcards — Maths
   ============================================================ */

PREBUILT['Maths'] = {

'Fonctions — généralités': {
cours:`<h3>Qu'est-ce qu'une fonction ?</h3>
<p>Une <strong>fonction</strong> $f$ associe à chaque nombre $x$ d'un ensemble de départ <mark>au plus un</mark> nombre $y$, noté $f(x)$. On écrit $f : x \\mapsto f(x)$.</p>
<div class="formula-box">$y = f(x)$ : <strong>y</strong> est l'<mark>image</mark> de x par f. <strong>x</strong> est un <mark>antécédent</mark> de y par f.</div>
<div class="attention-box">Un nombre a <strong>une seule image</strong> (au maximum), mais peut avoir <mark>plusieurs antécédents</mark> ! Ne confonds jamais les deux sens : "l'image de 2" ≠ "un antécédent de 2".</div>

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
cours:`<h3>Équations du Second Degré</h3>
<p>Forme générale : <strong>ax² + bx + c = 0</strong>, a ≠ 0.</p>
<div class="formula-box">Discriminant : Δ = b² − 4ac</div>
<h3>Résolution selon Δ</h3>
<ul>
<li><strong>Δ &gt; 0</strong> : deux racines x₁ = (−b − √Δ)/(2a) et x₂ = (−b + √Δ)/(2a)</li>
<li><strong>Δ = 0</strong> : une racine <mark>double</mark> x₀ = −b/(2a)</li>
<li><strong>Δ &lt; 0</strong> : aucune racine réelle</li>
</ul>
<div class="attention-box">Le piège classique : oublier de vérifier le signe de Δ <em>avant</em> de se lancer dans le calcul des racines. Si Δ &lt; 0, il ne sert à rien de continuer — il n'y a tout simplement pas de solution réelle.</div>
<h3>Relations coefficients–racines</h3>
<div class="formula-box">x₁ + x₂ = −b/a &nbsp;&nbsp;&nbsp;&nbsp; x₁ × x₂ = c/a</div>
<h3>Formes du trinôme</h3>
<ul>
<li><strong>Développée</strong> : ax² + bx + c</li>
<li><strong>Canonique</strong> : a(x − α)² + β &nbsp;avec α = −b/(2a), β = −Δ/(4a)</li>
<li><strong>Factorisée</strong> (Δ &gt; 0) : a(x − x₁)(x − x₂)</li>
</ul>
<h3>Signe du trinôme</h3>
<p>Si Δ &gt; 0 : signe de <strong>a</strong> à l'extérieur de [x₁ ; x₂], signe de <mark>−a</mark> entre les racines.<br>
Si Δ ≤ 0 : signe de <strong>a</strong> sur tout ℝ (ou nul si Δ = 0 en x₀).</p>
<div class="retenir-box">Retiens juste une phrase : <strong>"à l'extérieur comme a, entre les racines comme −a"</strong> (valable uniquement quand Δ &gt; 0). Cette règle de signe tombe très souvent au bac.</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Résous l'équation : $2x^2 - 8 = 0$</p>`, aide:`Isole $x^2$ avant de faire quoi que ce soit — pas besoin de calculer Δ ici, c'est plus rapide.`, correction:`<p>$2x^2 - 8 = 0 \\Leftrightarrow 2x^2 = 8 \\Leftrightarrow x^2 = 4 \\Leftrightarrow x = 2$ ou $x = -2$.</p><p>Ici, pas besoin du discriminant : dès qu'il n'y a pas de terme en $x$ (b = 0), isoler $x^2$ est bien plus rapide.</p>`},
{niveau:'Moyen', enonce:`<p>Résous l'équation : $x^2 - 5x + 6 = 0$. Donne la forme factorisée du trinôme.</p>`, aide:`Calcule Δ, puis les deux racines x₁ et x₂, puis utilise la forme factorisée a(x−x₁)(x−x₂).`, correction:`<p>a=1, b=−5, c=6. Δ = b² − 4ac = 25 − 24 = 1.</p><p>Δ > 0 donc deux racines : $x_1 = \\frac{5 - 1}{2} = 2$ et $x_2 = \\frac{5+1}{2} = 3$.</p><p>Forme factorisée : $(x-2)(x-3)$.</p><p>Vérification rapide : $x_1 + x_2 = 5 = -b/a$ ✓ et $x_1 \\times x_2 = 6 = c/a$ ✓</p>`},
{niveau:'Difficile', enonce:`<p>Un rectangle a un périmètre de 24 cm. Son aire est de 35 cm². Détermine ses dimensions à l'aide d'une équation du second degré.</p>`, aide:`Si L et l sont les côtés, périmètre = 2(L+l) donc L+l = 12. Pose L comme inconnue x, exprime l en fonction de x, puis utilise l'aire.`, correction:`<p>Périmètre = 24 → L + l = 12 → l = 12 − L. Notons L = x.</p><p>Aire : $x(12-x) = 35 \\Leftrightarrow 12x - x^2 = 35 \\Leftrightarrow -x^2 + 12x - 35 = 0 \\Leftrightarrow x^2 - 12x + 35 = 0$</p><p>Δ = 144 − 140 = 4. Racines : $x_1 = \\frac{12-2}{2} = 5$ et $x_2 = \\frac{12+2}{2} = 7$.</p><p>Le rectangle mesure donc <strong>5 cm sur 7 cm</strong> (les deux solutions correspondent à L et l inversés — même rectangle).</p>`},
],
flashcards:[
{q:'Discriminant Δ',a:'Δ = b² − 4ac'},
{q:'Si Δ > 0 : solutions',a:'x₁ = (−b − √Δ)/(2a) et x₂ = (−b + √Δ)/(2a)'},
{q:'Si Δ = 0 : solution',a:'Une racine double : x₀ = −b/(2a)'},
{q:'Si Δ < 0 : solutions',a:'Aucune solution réelle.'},
{q:'Somme des racines',a:'x₁ + x₂ = −b/a'},
{q:'Produit des racines',a:'x₁ × x₂ = c/a'},
{q:'Coordonnées du sommet',a:'α = −b/(2a) et β = −Δ/(4a). Sommet S(α ; β).'},
{q:'Forme canonique',a:'a(x − α)² + β'},
{q:'Forme factorisée (Δ > 0)',a:'a(x − x₁)(x − x₂)'},
{q:'Signe du trinôme si Δ > 0',a:'Signe de a à l\'extérieur de [x₁ ; x₂], signe de −a entre les racines.'},
{q:'Signe du trinôme si Δ < 0',a:'Toujours du signe de a sur ℝ entier.'},
{q:'ax² + bx + c > 0 solution si Δ > 0, a > 0',a:'x ∈ ]−∞ ; x₁[ ∪ ]x₂ ; +∞['},
]},

'Dérivation': {
cours:`<h3>Dérivation</h3>
<p>f'(a) = pente de la <mark>tangente</mark> à la courbe en x = a. Mesure le taux de variation instantané.</p>
<h3>Dérivées usuelles</h3>
<table class="formula-table">
<tr><th>f(x)</th><th>f'(x)</th></tr>
<tr><td>k (constante)</td><td>0</td></tr>
<tr><td>xⁿ</td><td>n·xⁿ⁻¹</td></tr>
<tr><td>√x</td><td>1/(2√x)</td></tr>
<tr><td>1/x</td><td>−1/x²</td></tr>
<tr><td>sin x</td><td>cos x</td></tr>
<tr><td>cos x</td><td>−sin x</td></tr>
<tr><td>eˣ</td><td>eˣ</td></tr>
<tr><td>ln x</td><td>1/x</td></tr>
</table>
<h3>Règles de calcul</h3>
<div class="formula-box latex-block">
$(u+v)' = u' + v'$<br>
$(ku)' = ku'$<br>
$(uv)' = u'v + uv'$<br>
$\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$<br>
$(u \circ v)' = v' \cdot u'(v)$ &nbsp;[composée]
</div>
<h3>Dérivée et variations</h3>
<ul>
<li>f'(x) &gt; 0 sur I ⟹ f <mark>croissante</mark> sur I</li>
<li>f'(x) &lt; 0 sur I ⟹ f <mark>décroissante</mark> sur I</li>
<li>f'(a) = 0 avec changement de signe ⟹ extremum en a</li>
</ul>
<div class="attention-box">f'(a) = 0 ne suffit pas pour dire qu'il y a un extremum ! Il faut vérifier que le signe de f' <mark>change</mark> de part et d'autre de a (sinon c'est un simple point d'inflexion, ex : f(x)=x³ en 0).</div>
<div class="formula-box">Tangente en x = a : y = f'(a)(x − a) + f(a)</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Calcule la dérivée de $f(x) = 3x^2 - 5x + 7$.</p>`, aide:`Dérive chaque terme séparément : (u+v)' = u'+v', et rappelle-toi que la dérivée d'une constante est 0.`, correction:`<p>$f'(x) = 3 \\times 2x - 5 + 0 = 6x - 5$</p><p>On dérive terme à terme : $(3x^2)' = 6x$, $(-5x)' = -5$, $(7)' = 0$.</p>`},
{niveau:'Moyen', enonce:`<p>Soit $f(x) = (2x+1)(x-3)$. Calcule $f'(x)$ en utilisant la formule du produit, puis vérifie en développant d'abord $f(x)$.</p>`, aide:`Formule du produit : (uv)' = u'v + uv'. Ici u = 2x+1 (donc u'=2) et v = x-3 (donc v'=1).`, correction:`<p><strong>Méthode 1 (produit)</strong> : $f'(x) = 2(x-3) + (2x+1)(1) = 2x - 6 + 2x + 1 = 4x - 5$</p><p><strong>Méthode 2 (développer d'abord)</strong> : $f(x) = 2x^2 - 6x + x - 3 = 2x^2 - 5x - 3$, donc $f'(x) = 4x - 5$. Les deux méthodes donnent bien le même résultat ✓</p>`},
{niveau:'Difficile', enonce:`<p>Soit $f(x) = \\dfrac{x^2+1}{x-1}$ définie sur $]1;+\\infty[$. Calcule $f'(x)$ et détermine le signe de $f'(x)$ sur cet intervalle.</p>`, aide:`Formule du quotient : (u/v)' = (u'v-uv')/v². Une fois f'(x) calculée, factorise le numérateur pour étudier son signe (le dénominateur (x-1)² est toujours positif).`, correction:`<p>$u = x^2+1$ donc $u'=2x$ ; $v = x-1$ donc $v'=1$.</p><p>$f'(x) = \\dfrac{2x(x-1) - (x^2+1)(1)}{(x-1)^2} = \\dfrac{2x^2-2x-x^2-1}{(x-1)^2} = \\dfrac{x^2-2x-1}{(x-1)^2}$</p><p>Le dénominateur $(x-1)^2$ est toujours positif. Le signe de $f'(x)$ dépend donc du numérateur $x^2-2x-1$ (discriminant Δ=8, racines $1-\\sqrt2$ et $1+\\sqrt2$). Sur $]1;+\\infty[$, seule la racine $1+\\sqrt2 \\approx 2,41$ est dans l'intervalle : $f'(x) < 0$ sur $]1;1+\\sqrt2[$ et $f'(x) > 0$ sur $]1+\\sqrt2;+\\infty[$.</p>`},
],
flashcards:[
{q:'Dérivée de xⁿ',a:'n·xⁿ⁻¹'},
{q:'Dérivée de √x',a:'1/(2√x), définie sur ]0 ; +∞['},
{q:'Dérivée de 1/x',a:'−1/x²'},
{q:'Dérivée de sin x',a:'cos x'},
{q:'Dérivée de cos x',a:'−sin x'},
{q:'Dérivée de eˣ',a:'eˣ (l\'exponentielle est sa propre dérivée)'},
{q:'Dérivée de ln x',a:'1/x (pour x > 0)'},
{q:'Règle du produit (uv)\'',a:'u\'v + uv\''},
{q:'Règle du quotient (u/v)\'',a:'(u\'v − uv\') / v²'},
{q:'Dérivée d\'une composée (u∘v)\'',a:'v\' · u\'(v). Ex : (e^(2x))\' = 2e^(2x)   |   (sin(3x))\' = 3cos(3x)'},
{q:'Si f\'(x) > 0 sur I',a:'f est strictement CROISSANTE sur I.'},
{q:'Si f\'(x) < 0 sur I',a:'f est strictement DÉCROISSANTE sur I.'},
{q:'Équation de la tangente en x = a',a:'y = f\'(a)(x − a) + f(a)'},
{q:'Dérivée de uⁿ (composée)',a:'n·u\'·uⁿ⁻¹. Ex : (sin²x)\' = 2sinx·cosx'},
]},

'Trigonométrie': {
cours:`<h3>Trigonométrie & Cercle trigonométrique</h3>
<h3>Le radian : d'où vient cette unité ?</h3>
<div class="formula-box">Un <strong>radian</strong> (noté rad) est la mesure d'un angle qui intercepte, sur un cercle, un arc dont la longueur est <mark>égale au rayon</mark> de ce cercle. C'est l'unité d'angle du Système International.</div>
<div class="formula-box">Longueur d'un arc de cercle : $L = R \\times \\theta$ &nbsp;(avec $\\theta$ l'angle exprimé en <strong>radians</strong>, et R le rayon)</div>
<div class="attention-box">Cette formule ne fonctionne <mark>QUE si l'angle est en radians</mark> — jamais directement avec un angle en degrés ! C'est justement parce que le radian est défini à partir d'une longueur d'arc que cette formule est aussi simple (pas de facteur de conversion supplémentaire).</div>
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
{niveau:'Moyen', enonce:`<p>Résous dans $[0;2\\pi[$ l'équation $\\cos(x) = \\frac{1}{2}$.</p>`, aide:`Quelle valeur remarquable de x donne cos(x)=1/2 ? N'oublie pas que le cosinus est une fonction paire — pense au cercle trigonométrique et aux 2 solutions possibles sur cet intervalle.`, correction:`<p>On sait que $\\cos(\\frac{\\pi}{3}) = \\frac{1}{2}$.</p><p>Comme cos est paire, $\\cos(-\\frac{\\pi}{3}) = \\frac{1}{2}$ aussi, soit $\\cos(2\\pi - \\frac{\\pi}{3}) = \\cos(\\frac{5\\pi}{3})$ sur $[0;2\\pi[$.</p><p>Solutions : $x = \\frac{\\pi}{3}$ ou $x = \\frac{5\\pi}{3}$</p>`},
{niveau:'Difficile', enonce:`<p>Un accélérateur de particules circulaire a un rayon d'1 km. Un proton part d'un point I et parcourt quatre tiers de tour. Calcule la distance exacte parcourue par ce proton (laisse le résultat en fonction de π).</p>`, aide:`Un tour complet correspond à un angle de 2π radians. Quatre tiers de tour correspondent donc à quel angle en radians ? Applique ensuite L = R × θ.</p>`, correction:`<p>Un tour complet = $2\\pi$ rad. Quatre tiers de tour : $\\theta = \\frac{4}{3} \\times 2\\pi = \\frac{8\\pi}{3}$ rad.</p><p>$L = R \\times \\theta = 1 \\times \\frac{8\\pi}{3} = \\frac{8\\pi}{3} \\approx 8{,}38$ km.</p>`},
{niveau:'Difficile', enonce:`<p>Démontre que $\\cos(2x) = 1 - 2\\sin^2(x)$ à partir de la formule $\\cos(2x) = \\cos^2(x) - \\sin^2(x)$ et de l'identité de Pythagore.</p>`, aide:`Remplace cos²(x) dans la formule de départ en utilisant la relation cos²x + sin²x = 1 (donc cos²x = 1 - sin²x).`, correction:`<p>On part de $\\cos(2x) = \\cos^2(x) - \\sin^2(x)$.</p><p>Or, d'après Pythagore : $\\cos^2(x) = 1 - \\sin^2(x)$.</p><p>En remplaçant : $\\cos(2x) = (1-\\sin^2(x)) - \\sin^2(x) = 1 - 2\\sin^2(x)$ ✓</p><p>C'est exactement la formule recherchée — l'astuce clé est de toujours pouvoir remplacer cos² par 1−sin² (ou l'inverse) grâce à Pythagore.</p>`},
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
]},

'Suites numériques': {
cours:`<h3>Suites Numériques</h3>
<h3>Suite arithmétique</h3>
<div class="formula-box">uₙ₊₁ = uₙ + r<br>uₙ = u₀ + n·r (terme général)<br>Somme n+1 termes : S = (u₀ + uₙ)·(n+1)/2</div>
<h3>Suite géométrique</h3>
<div class="formula-box">uₙ₊₁ = q·uₙ<br>uₙ = u₀·qⁿ (terme général)<br>Somme n+1 termes (q≠1) : S = u₀·(1 − qⁿ⁺¹)/(1 − q)</div>
<h3>Sens de variation</h3>
<ul>
<li>Arithmétique : croissante si r &gt; 0, décroissante si r &lt; 0</li>
<li>Géométrique (u₀ &gt; 0) : croissante si q &gt; 1, décroissante si 0 &lt; q &lt; 1</li>
<li>Méthode générale : étudier le signe de uₙ₊₁ − uₙ</li>
</ul>
<h3>Récurrence</h3>
<ol>
<li><strong>Initialisation</strong> : vérifier P(0)</li>
<li><strong>Hérédité</strong> : supposer P(n), démontrer P(n+1)</li>
<li><strong>Conclusion</strong> : P(n) vraie pour tout n ∈ ℕ</li>
</ol>
<div class="attention-box">L'hérédité, ce n'est pas démontrer P(n) — c'est démontrer <mark>l'implication</mark> "si P(n) est vraie, alors P(n+1) l'est aussi". On suppose P(n) vraie (hypothèse de récurrence), on ne le prouve pas.</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Une suite arithmétique a pour premier terme $u_0 = 5$ et pour raison $r = 3$. Calcule $u_1$, $u_2$ et $u_{10}$.</p>`, aide:`Utilise uₙ₊₁ = uₙ + r pour les premiers termes, puis la formule directe uₙ = u₀ + n·r pour u₁₀.`, correction:`<p>$u_1 = u_0 + r = 5 + 3 = 8$</p><p>$u_2 = u_1 + r = 8 + 3 = 11$</p><p>$u_{10} = u_0 + 10r = 5 + 30 = 35$</p>`},
{niveau:'Moyen', enonce:`<p>Une suite géométrique a pour premier terme $u_0 = 2$ et pour raison $q = 3$. À partir de quel rang $n$ a-t-on $u_n > 1000$ ?</p>`, aide:`Calcule uₙ = u₀ × qⁿ pour plusieurs valeurs de n jusqu'à dépasser 1000 (pas besoin de logarithme au programme de première).`, correction:`<p>$u_n = 2 \\times 3^n$</p><p>$u_5 = 2 \\times 243 = 486$ (pas assez)</p><p>$u_6 = 2 \\times 729 = 1458$ (> 1000 ✓)</p><p>C'est donc à partir du <strong>rang n = 6</strong> que $u_n > 1000$.</p>`},
{niveau:'Difficile', enonce:`<p>Démontre par récurrence que pour tout $n \\in \\mathbb{N}$, $u_n = 2^n - 1$ où $u_0=0$ et $u_{n+1} = 2u_n + 1$.</p>`, aide:`Initialisation : vérifie pour n=0. Hérédité : suppose uₙ=2ⁿ-1 vrai, puis calcule u_(n+1) en utilisant la relation de récurrence et l'hypothèse, pour retrouver 2^(n+1)-1.`, correction:`<p><strong>Initialisation</strong> : $u_0 = 0$ et $2^0 - 1 = 1 - 1 = 0$ ✓, la propriété est vraie au rang 0.</p><p><strong>Hérédité</strong> : supposons que $u_n = 2^n - 1$ (hypothèse de récurrence). Montrons que $u_{n+1} = 2^{n+1}-1$.</p><p>$u_{n+1} = 2u_n + 1 = 2(2^n-1) + 1 = 2^{n+1} - 2 + 1 = 2^{n+1} - 1$ ✓</p><p><strong>Conclusion</strong> : la propriété est vraie au rang 0 et héréditaire, donc par récurrence, $u_n = 2^n-1$ pour tout $n \\in \\mathbb{N}$.</p>`},
],
flashcards:[
{q:'Suite arithmétique — définition',a:'uₙ₊₁ = uₙ + r, où r est la raison (constante).'},
{q:'Terme général — arithmétique',a:'uₙ = u₀ + n·r'},
{q:'Raison — arithmétique',a:'r = uₙ₊₁ − uₙ'},
{q:'Somme — arithmétique (n+1 termes)',a:'S = (u₀ + uₙ)·(n+1)/2 = (premier + dernier) × nb de termes / 2'},
{q:'Suite géométrique — définition',a:'uₙ₊₁ = q·uₙ, où q est la raison (constante, q ≠ 0).'},
{q:'Terme général — géométrique',a:'uₙ = u₀·qⁿ'},
{q:'Raison — géométrique',a:'q = uₙ₊₁ / uₙ'},
{q:'Somme — géométrique (q ≠ 1)',a:'S = u₀·(1 − qⁿ⁺¹)/(1 − q)'},
{q:'Montrer qu\'une suite est croissante',a:'Montrer que uₙ₊₁ − uₙ > 0 (ou uₙ₊₁/uₙ > 1 si termes > 0).'},
{q:'3 étapes d\'une récurrence',a:'1. Initialisation (vérifier P(0)). 2. Hérédité (P(n) ⟹ P(n+1)). 3. Conclusion.'},
{q:'Suite géométrique si 0 < q < 1 et u₀ > 0',a:'Décroissante, termes positifs tendant vers 0.'},
]},

'Probabilités': {
cours:`<h3>Probabilités & Loi Binomiale</h3>
<div class="formula-box">Combinaison : C(n,k) = n! / (k!·(n−k)!)<br>C(n,0) = C(n,n) = 1 &nbsp;&nbsp; C(n,1) = n</div>
<h3>Probabilités conditionnelles</h3>
<div class="formula-box">P(A∩B) = P(A)·P(B|A)<br>P(B|A) = P(A∩B)/P(A)<br>Indépendance : P(A∩B) = P(A)·P(B)</div>
<div class="retenir-box">A et B sont <mark>indépendants</mark> quand connaître A ne change rien à la probabilité de B. Dans ce cas (et seulement dans ce cas), P(A∩B) = P(A)·P(B) — sinon il faut passer par P(B|A).</div>
<h3>Formule des probabilités totales</h3>
<div class="formula-box">Si (B₁,…,Bₙ) est une partition de Ω :<br>P(A) = Σ P(Bᵢ)·P(A|Bᵢ)</div>
<h3>Loi binomiale X ~ B(n, p)</h3>
<p>n épreuves de Bernoulli <mark>indépendantes</mark>, probabilité p de succès.</p>
<div class="formula-box latex-block">$$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$$
$E(X) = np \qquad V(X) = np(1-p) \qquad \sigma = \sqrt{np(1-p)}$</div>
<div class="formula-box">P(A∪B) = P(A) + P(B) − P(A∩B)<br>P(Ā) = 1 − P(A)</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un sac contient 5 boules rouges et 3 boules bleues. On tire une boule au hasard. Calcule la probabilité de tirer une boule rouge, puis une boule bleue.</p>`, aide:`Probabilité = nombre de cas favorables / nombre de cas total. Il y a 8 boules en tout.`, correction:`<p>Total : 5 + 3 = 8 boules.</p><p>$P(\\text{rouge}) = \\frac{5}{8}$</p><p>$P(\\text{bleue}) = \\frac{3}{8}$</p><p>Vérification : $\\frac{5}{8} + \\frac{3}{8} = 1$ ✓ (les deux événements sont complémentaires)</p>`},
{niveau:'Moyen', enonce:`<p>Dans une classe, 60% des élèves aiment les maths (événement A) et 40% aiment l'anglais (événement B). 25% aiment les deux matières. Calcule P(A∪B), la probabilité qu'un élève aime au moins une des deux matières.</p>`, aide:`Utilise la formule P(A∪B) = P(A) + P(B) − P(A∩B). Attention à ne pas compter deux fois ceux qui aiment les deux.`, correction:`<p>$P(A) = 0,6$ ; $P(B) = 0,4$ ; $P(A \\cap B) = 0,25$</p><p>$P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0,6 + 0,4 - 0,25 = 0,75$</p><p>75% des élèves aiment au moins une des deux matières. Sans la soustraction de P(A∩B), on aurait compté deux fois les élèves qui aiment les deux — erreur classique.</p>`},
{niveau:'Difficile', enonce:`<p>Une entreprise fabrique des pièces avec 2 machines. La machine A produit 70% des pièces avec un taux de défaut de 3%. La machine B produit 30% des pièces avec un taux de défaut de 8%. Quelle est la probabilité qu'une pièce prise au hasard soit défectueuse ?</p>`, aide:`C'est une situation de probabilités totales : (A, B) forme une partition. Utilise P(défaut) = P(A)×P(défaut|A) + P(B)×P(défaut|B).`, correction:`<p>Notons D l'événement "la pièce est défectueuse".</p><p>$P(D) = P(A) \\times P(D|A) + P(B) \\times P(D|B)$</p><p>$P(D) = 0,7 \\times 0,03 + 0,3 \\times 0,08 = 0,021 + 0,024 = 0,045$</p><p>La probabilité qu'une pièce prise au hasard soit défectueuse est de <strong>4,5%</strong>.</p>`},
],
flashcards:[
{q:'C(n, k) — formule',a:'n! / (k!·(n−k)!)'},
{q:'C(n, 0) et C(n, n)',a:'1'},
{q:'C(n, 1)',a:'n'},
{q:'P(B|A)',a:'P(A∩B) / P(A) — probabilité de B sachant A.'},
{q:'Indépendance de A et B',a:'P(A∩B) = P(A)·P(B). Connaître A ne change pas P(B).'},
{q:'P(A∩B) =',a:'P(A) × P(B|A)'},
{q:'P(A∪B) =',a:'P(A) + P(B) − P(A∩B)'},
{q:'P(Ā) =',a:'1 − P(A)'},
{q:'P(X = k) pour X ~ B(n, p)',a:'C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ'},
{q:'Espérance de X ~ B(n, p)',a:'E(X) = np'},
{q:'Variance de X ~ B(n, p)',a:'V(X) = np(1−p)'},
{q:'Écart-type de X ~ B(n, p)',a:'σ = √(np(1−p))'},
{q:'Formule des probabilités totales',a:'P(A) = Σ P(Bᵢ)·P(A|Bᵢ) quand (B₁,...,Bₙ) est une partition de Ω.'},
]},

'Fonctions exp & ln': {
cours:`<h3>Fonctions Exponentielle & Logarithme</h3>
<h3>Exponentielle</h3>
<div class="formula-box">eˣ > 0 pour tout x ∈ ℝ<br>e⁰ = 1 &nbsp;&nbsp; e¹ = e ≈ 2,718<br>eˣ⁺ʸ = eˣ · eʸ<br>eˣ⁻ʸ = eˣ / eʸ<br>(eˣ)ⁿ = eⁿˣ<br>(eˣ)' = eˣ<br>lim(x→+∞) eˣ = +∞ &nbsp;&nbsp; lim(x→−∞) eˣ = 0</div>
<h3>Logarithme naturel</h3>
<div class="formula-box">ln(1) = 0 &nbsp;&nbsp; ln(e) = 1<br>ln(ab) = ln a + ln b<br>ln(a/b) = ln a − ln b<br>ln(aⁿ) = n·ln a<br>ln(√a) = ln(a)/2<br>(ln x)' = 1/x (x > 0)<br>lim(x→+∞) ln x = +∞ &nbsp;&nbsp; lim(x→0⁺) ln x = −∞</div>
<h3>Lien exp et ln</h3>
<div class="formula-box">ln(eˣ) = x pour tout x ∈ ℝ<br>e^(ln x) = x pour x > 0<br>eˣ = a ⟺ x = ln a (a > 0)</div>
<div class="retenir-box">ln et exp sont des fonctions <mark>réciproques</mark> : l'une "défait" ce que l'autre fait. C'est pour ça que pour résoudre eˣ = a, on applique ln des deux côtés — ln(eˣ) se simplifie automatiquement en x.</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Résous dans $\\mathbb{R}$ l'équation $e^x = 5$.</p>`, aide:`Applique ln des deux côtés de l'équation — souviens-toi que ln(eˣ) = x.`, correction:`<p>$e^x = 5 \\Leftrightarrow \\ln(e^x) = \\ln(5) \\Leftrightarrow x = \\ln(5)$</p><p>Valeur approchée : $x \\approx 1,61$</p>`},
{niveau:'Moyen', enonce:`<p>Résous dans $\\mathbb{R}$ l'inéquation $2e^{x} - 6 < 0$.</p>`, aide:`Isole d'abord eˣ, puis applique ln en faisant attention au sens de l'inégalité (ln est croissante, donc le sens ne change pas ici).`, correction:`<p>$2e^x - 6 < 0 \\Leftrightarrow 2e^x < 6 \\Leftrightarrow e^x < 3$</p><p>La fonction ln est strictement croissante, donc appliquer ln ne change pas le sens de l'inégalité :</p><p>$\\ln(e^x) < \\ln(3) \\Leftrightarrow x < \\ln(3)$</p><p>Solution : $S = ]-\\infty ; \\ln(3)[$</p>`},
{niveau:'Difficile', enonce:`<p>Soit $f(x) = xe^{-x}$ définie sur $\\mathbb{R}$. Calcule $f'(x)$ et étudie le signe de $f'(x)$ pour déterminer les variations de f.</p>`, aide:`Utilise la formule du produit (uv)'=u'v+uv' avec u=x et v=e^(-x) (dérivée de e^(-x) est -e^(-x)). Factorise ensuite par e^(-x), qui est toujours positif.`, correction:`<p>$u = x$ donc $u' = 1$ ; $v = e^{-x}$ donc $v' = -e^{-x}$.</p><p>$f'(x) = 1 \\times e^{-x} + x \\times (-e^{-x}) = e^{-x}(1-x)$</p><p>Comme $e^{-x} > 0$ pour tout x, le signe de $f'(x)$ dépend uniquement de $(1-x)$ :</p><p>$f'(x) > 0$ si $x < 1$ (f croissante) et $f'(x) < 0$ si $x > 1$ (f décroissante). f admet donc un maximum en $x=1$.</p>`},
],
flashcards:[
{q:'Dérivée de eˣ',a:'eˣ (l\'exponentielle est sa propre dérivée)'},
{q:'eˣ⁺ʸ =',a:'eˣ · eʸ'},
{q:'(eˣ)ⁿ =',a:'eⁿˣ'},
{q:'e⁰ =',a:'1'},
{q:'Limite de eˣ quand x → −∞',a:'0 (l\'exponentielle tend vers 0)'},
{q:'Dérivée de ln x',a:'1/x (pour x > 0)'},
{q:'ln(1) = ?',a:'0'},
{q:'ln(e) = ?',a:'1'},
{q:'ln(ab) =',a:'ln a + ln b'},
{q:'ln(a/b) =',a:'ln a − ln b'},
{q:'ln(aⁿ) =',a:'n · ln a'},
{q:'ln(eˣ) = ?',a:'x (pour tout x ∈ ℝ)'},
{q:'e^(ln x) = ?',a:'x (pour x > 0)'},
{q:'Résoudre eˣ = a (a > 0)',a:'x = ln a'},
{q:'eˣ est-elle positive ?',a:'Oui, eˣ > 0 pour tout x ∈ ℝ.'},
]},
};
