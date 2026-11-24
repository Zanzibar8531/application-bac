/* BACMASTER — maths-droites.js — Maths : Fonctions affines & droites, Automatismes */

Object.assign(PREBUILT["Maths"], {
 "Fonctions affines & droites": {
  "cours": "<div class=\"attention-box\"><strong>Ce qui tombe à l'évaluation (chap. 03) :</strong> reconnaître une fonction affine, calculer sa <em>pente</em>, trouver l'équation d'une droite (par deux points, ou parallèle à une autre), <em>tracer</em> une droite, étudier un <em>signe</em> (tableau) et résoudre une inéquation produit, savoir si deux droites sont <em>sécantes ou parallèles</em> et trouver leur point d'intersection. Tout repose sur un seul nombre : la <mark>pente $m$</mark>.</div>\n\n<h3>1. Fonction affine</h3>\n<div class=\"formula-box\">$f(x) = mx + p$ &nbsp; ($m$ et $p$ sont deux réels fixés)</div>\n<ul>\n<li>$m$ = <strong>coefficient directeur</strong> (la pente) : de combien $f(x)$ change quand $x$ augmente de 1.</li>\n<li>$p$ = <strong>ordonnée à l'origine</strong> : la valeur de $f(0)$, là où la droite coupe l'axe des ordonnées.</li>\n</ul>\n<p><strong>Exemple 1.</strong> $f(x) = 2 - 0{,}5x$ s'écrit $-0{,}5x + 2$ : $m = -0{,}5$ et $p = 2$. <em>Attention : on lit les signes, et on remet dans l'ordre « $mx + p$ ».</em></p>\n<p><strong>Cas particuliers :</strong> si $p = 0$, $f(x) = mx$ est <strong>linéaire</strong> (la droite passe par l'origine, ex. $g(x)=-3x$) ; si $m = 0$, $f(x) = p$ est <strong>constante</strong> (droite horizontale, ex. $h(x)=-2$).</p>\n<div class=\"retenir-box\">La courbe d'une fonction affine est une <mark>droite</mark> qui coupe l'axe des ordonnées. Pour la tracer il suffit de <strong>2 points</strong> (ou : on part de $(0\\,;p)$ puis on avance de 1 en $x$ et on monte de $m$).</div>\n<div class=\"attention-box\">$x^2$, $\\dfrac1x$, $\\sqrt x$ ne sont <strong>pas</strong> affines : une fonction affine n'a que du $x$ « à la puissance 1 ».</div>\n\n<h3>2. Le taux d'accroissement d'une fonction affine vaut toujours $m$</h3>\n<div class=\"formula-box\">Pour tous réels $x_1 \\neq x_2$ : &nbsp; $\\dfrac{f(x_2)-f(x_1)}{x_2-x_1} = m$</div>\n<p><em>Démonstration :</em> $\\dfrac{mx_2+p-(mx_1+p)}{x_2-x_1} = \\dfrac{mx_2 - mx_1}{x_2 - x_1} = \\dfrac{m(x_2-x_1)}{x_2-x_1} = m$. Le $p$ disparaît, et on simplifie.</p>\n<p>Autrement dit : <mark>les accroissements de $f(x)$ sont proportionnels aux accroissements de $x$</mark>. C'est ce qui rend la croissance « linéaire ».</p>\n<p><strong>Exemple 4.</strong> Une ville passe de 2 500 habitants (2015) à 2 800 (2020), croissance supposée linéaire. Taux : $\\dfrac{2800-2500}{2020-2015} = \\dfrac{300}{5} = 60$. <strong>Interprétation :</strong> la population augmente de 60 habitants par an.</p>\n\n<h3>3. Déterminer une fonction affine (méthode en 2 temps)</h3>\n<ol>\n<li>On trouve $m$ avec la formule $m = \\dfrac{f(x_2)-f(x_1)}{x_2-x_1}$.</li>\n<li>On trouve $p$ en <mark>remplaçant</mark> $m$, $x$ et $f(x)$ par les valeurs d'un point connu dans $f(x) = mx+p$.</li>\n</ol>\n<p><strong>Exemple 5.</strong> Après 100 km il reste 50 L ; après 400 km il reste 33,5 L. $m = \\dfrac{33{,}5 - 50}{400 - 100} = \\dfrac{-16{,}5}{300} = -0{,}055$ (on perd 0,055 L par km). Avec le point $(100\\,;50)$ : $50 = -0{,}055 \\times 100 + p \\Rightarrow p = 55{,}5$. Donc <strong>$f(x) = -0{,}055x + 55{,}5$</strong> (vérif : $f(400) = 55{,}5 - 22 = 33{,}5$ ✓).</p>\n<p><strong>Application :</strong> après 735 km il reste $f(735) = -0{,}055\\times 735 + 55{,}5 = \\mathbf{15{,}075}$ L ($\\approx 15{,}1$ L). <em>Dans l'autre sens :</em> réservoir vide quand $f(x) = 0$, soit $x = \\dfrac{55{,}5}{0{,}055} \\approx 1\\,009$ km.</p>\n\n<h3>4. Sens de variation</h3>\n<div class=\"formula-box\">Si $m &gt; 0$ : $f$ strictement <strong>croissante</strong> sur $\\mathbb{R}$. &nbsp; Si $m &lt; 0$ : strictement <strong>décroissante</strong>. &nbsp; Si $m = 0$ : constante.</div>\n<p><strong>Exemple 6.</strong> $f : x \\mapsto 2x - 3$ est <strong>croissante</strong> ($m = 2 &gt; 0$) ; $g : x \\mapsto 5 - 6x$ est <strong>décroissante</strong> ($m = -6 &lt; 0$).</p>\n\n<h3>5. Signe de $mx + p$ (avec $m \\neq 0$)</h3>\n<div class=\"formula-box\">$mx + p = 0 \\iff x = -\\dfrac{p}{m}$</div>\n<p>L'expression s'annule en $-\\dfrac pm$, et change de signe à cet endroit :</p>\n<table class=\"formula-table\">\n<tr><th>$x$</th><th>$-\\infty$</th><th>$-p/m$</th><th>$+\\infty$</th></tr>\n<tr><td>$mx+p$ si $m &gt; 0$</td><td>−</td><td>0</td><td>+</td></tr>\n<tr><td>$mx+p$ si $m &lt; 0$</td><td>+</td><td>0</td><td>−</td></tr>\n</table>\n<div class=\"retenir-box\">Phrase à retenir : <strong>« du signe de $m$ après la racine, du signe opposé avant »</strong>. (Dans ton cours : « signe de $-a$ » à gauche, « signe de $a$ » à droite, avec $a=m$.)</div>\n<p><strong>Exemple 7.</strong> $A = 2x - 3$ : racine $\\dfrac32$, $m = 2 &gt; 0$ → négatif avant $1{,}5$, positif après. $B = 5 - 6x$ : racine $\\dfrac56$, $m = -6 &lt; 0$ → positif avant $\\dfrac56$, négatif après.</p>\n\n<h3>6. Résoudre une inéquation produit</h3>\n<p><strong>Exemple 8.</strong> $(2x-5)(7-x) \\leq 0$.</p>\n<ol>\n<li>Racines : $2x - 5 = 0 \\Rightarrow x = \\dfrac52$ ; $7 - x = 0 \\Rightarrow x = 7$.</li>\n<li>Tableau (une ligne par facteur, puis le produit : <mark>règle des signes</mark>) :</li>\n</ol>\n<table class=\"formula-table\">\n<tr><th>$x$</th><th>$-\\infty$</th><th>$5/2$</th><th>$7$</th><th>$+\\infty$</th></tr>\n<tr><td>$2x-5$</td><td>−</td><td>0 +</td><td>+</td><td>+</td></tr>\n<tr><td>$7-x$</td><td>+</td><td>+</td><td>0 −</td><td>−</td></tr>\n<tr><td>produit</td><td>−</td><td>0 +</td><td>0 −</td><td>−</td></tr>\n</table>\n<p>On veut « $\\leq 0$ » : $\\mathcal{S} = \\left]-\\infty\\,;\\dfrac52\\right] \\cup [7\\,;+\\infty[$. <em>Crochets fermés car l'inégalité est large ($\\leq$) : les racines font partie des solutions.</em></p>\n<div class=\"attention-box\">Test express : prends $x = 0$ : $(-5)(7) = -35 \\leq 0$ ✓ (0 est dans la zone solution) ; $x = 3$ : $(1)(4) = 4 &gt; 0$ ✓ (3 est hors solution).</div>\n\n<h3>7. Droites du plan</h3>\n<div class=\"formula-box\">Droite <strong>non verticale</strong> : équation réduite $y = mx + p$ &nbsp; | &nbsp; Droite <strong>verticale</strong> (parallèle à l'axe des ordonnées) : $x = k$</div>\n<ul>\n<li>$m$ = pente, $p$ = ordonnée à l'origine.</li>\n<li>Une droite verticale $x = k$ n'a <strong>ni pente ni ordonnée à l'origine</strong> (ce n'est pas la courbe d'une fonction).</li>\n<li><strong>Vecteur directeur</strong> : $\\vec u\\begin{pmatrix}1\\\\ m\\end{pmatrix}$ pour $y = mx+p$ ; $\\vec j\\begin{pmatrix}0\\\\ 1\\end{pmatrix}$ pour $x = k$ (tout multiple convient aussi).</li>\n</ul>\n<p><strong>Exemple 9.</strong> $y = -3x + 5$ : $m = -3$, $p = 5$, vecteur directeur $\\begin{pmatrix}1\\\\-3\\end{pmatrix}$ (ou $\\begin{pmatrix}-1\\\\3\\end{pmatrix}$, c'est l'opposé : même direction). La droite $x = -6$ a pour vecteur directeur $\\begin{pmatrix}0\\\\1\\end{pmatrix}$.</p>\n<p><em>Équation du type $ax+by+c=0$ :</em> si $b \\neq 0$ la droite est sécante avec l'axe des ordonnées, $y = -\\dfrac{a}{b}x - \\dfrac{c}{b}$ donc $m = -\\dfrac ab$ et $p = -\\dfrac cb$ (vecteur directeur $\\begin{pmatrix}-b\\\\a\\end{pmatrix}$). Si $b = 0$ : droite verticale.</p>\n<p><em>Les 4 cas :</em> pente positive (la droite monte), négative (elle descend), nulle (horizontale), et droite verticale $x=k$ (pas de pente).</p><svg viewBox=\"0 0 330 250\" role=\"img\" style=\"width:100%;max-width:420px;display:block;margin:12px auto\"><line x1=\"15\" y1=\"241\" x2=\"15\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"48\" y1=\"241\" x2=\"48\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"81\" y1=\"241\" x2=\"81\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"114\" y1=\"241\" x2=\"114\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"147\" y1=\"241\" x2=\"147\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"180\" y1=\"241\" x2=\"180\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"213\" y1=\"241\" x2=\"213\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"246\" y1=\"241\" x2=\"246\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"279\" y1=\"241\" x2=\"279\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"312\" y1=\"241\" x2=\"312\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"241\" x2=\"312\" y2=\"241\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"208\" x2=\"312\" y2=\"208\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"175\" x2=\"312\" y2=\"175\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"142\" x2=\"312\" y2=\"142\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"109\" x2=\"312\" y2=\"109\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"76\" x2=\"312\" y2=\"76\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"43\" x2=\"312\" y2=\"43\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"10\" x2=\"312\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"142\" x2=\"312\" y2=\"142\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"147\" y1=\"241\" x2=\"147\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"15\" y1=\"192\" x2=\"279\" y2=\"126\" stroke=\"#2563eb\" stroke-width=\"2.4\"/><text x=\"275\" y=\"120\" font-size=\"13\" fill=\"#2563eb\" text-anchor=\"end\">m>0</text><line x1=\"15\" y1=\"43\" x2=\"279\" y2=\"175\" stroke=\"#e11d48\" stroke-width=\"2.4\"/><text x=\"275\" y=\"169\" font-size=\"13\" fill=\"#e11d48\" text-anchor=\"end\">m<0</text><line x1=\"15\" y1=\"76\" x2=\"279\" y2=\"76\" stroke=\"#16a34a\" stroke-width=\"2.4\"/><text x=\"275\" y=\"70\" font-size=\"13\" fill=\"#16a34a\" text-anchor=\"end\">m=0</text><line x1=\"81\" y1=\"241\" x2=\"81\" y2=\"10\" stroke=\"#7c3aed\" stroke-width=\"2.4\"/><text x=\"77\" y=\"4\" font-size=\"13\" fill=\"#7c3aed\" text-anchor=\"end\">x = −2</text></svg>\n<h3>8. Calculer la pente à partir de deux points</h3>\n<div class=\"formula-box\">$A(x_A\\,;y_A)$, $B(x_B\\,;y_B)$ avec $x_A \\neq x_B$ : &nbsp; $m = \\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{\\Delta y}{\\Delta x}$</div>\n<p>$\\Delta$ signifie « différence » : on fait <mark>(différence des ordonnées) ÷ (différence des abscisses)</mark>, dans le <strong>même ordre</strong> en haut et en bas.</p>\n<p><strong>Méthode : équation de la droite $(AB)$.</strong></p>\n<ul>\n<li>Si $x_A = x_B = k$ : $(AB)$ est verticale, d'équation <strong>$x = k$</strong>.</li>\n<li>Sinon : on calcule $m$, puis on trouve $p$ en utilisant les coordonnées de $A$ <em>ou</em> de $B$.</li>\n</ul>\n<p><strong>Exemple.</strong> $A(0\\,;-1)$ et $B(3\\,;1)$ : $m = \\dfrac{1-(-1)}{3-0} = \\dfrac23$ ; $A$ donne $p = -1$. Donc <strong>$y = \\dfrac23x - 1$</strong>. Sur la figure : on avance de 3, on monte de 2.</p>\n<svg viewBox=\"0 0 330 250\" role=\"img\" style=\"width:100%;max-width:420px;display:block;margin:12px auto\"><line x1=\"15\" y1=\"241\" x2=\"15\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"48\" y1=\"241\" x2=\"48\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"81\" y1=\"241\" x2=\"81\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"114\" y1=\"241\" x2=\"114\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"147\" y1=\"241\" x2=\"147\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"180\" y1=\"241\" x2=\"180\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"213\" y1=\"241\" x2=\"213\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"246\" y1=\"241\" x2=\"246\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"279\" y1=\"241\" x2=\"279\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"312\" y1=\"241\" x2=\"312\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"241\" x2=\"312\" y2=\"241\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"208\" x2=\"312\" y2=\"208\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"175\" x2=\"312\" y2=\"175\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"142\" x2=\"312\" y2=\"142\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"109\" x2=\"312\" y2=\"109\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"76\" x2=\"312\" y2=\"76\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"43\" x2=\"312\" y2=\"43\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"10\" x2=\"312\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"142\" x2=\"312\" y2=\"142\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"147\" y1=\"241\" x2=\"147\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"48\" y1=\"241\" x2=\"296\" y2=\"76\" stroke=\"#2563eb\" stroke-width=\"2.4\"/><text x=\"292\" y=\"70\" font-size=\"13\" fill=\"#2563eb\" text-anchor=\"end\">d</text><circle cx=\"147\" cy=\"175\" r=\"4\" fill=\"#e11d48\"/><text x=\"153\" y=\"169\" font-size=\"13\" fill=\"currentColor\">A(0 ; −1)</text><circle cx=\"246\" cy=\"109\" r=\"4\" fill=\"#e11d48\"/><text x=\"252\" y=\"103\" font-size=\"13\" fill=\"currentColor\">B(3 ; 1)</text><polyline points=\"147,175 246,175 246,109\" fill=\"none\" stroke=\"#f59e0b\" stroke-width=\"2\" stroke-dasharray=\"5 3\"/><text x=\"196\" y=\"191\" font-size=\"13\" fill=\"#f59e0b\" text-anchor=\"middle\">Δx = 3</text><text x=\"252\" y=\"142\" font-size=\"13\" fill=\"#f59e0b\">Δy = 2</text></svg>\n<h3>9. Lire l'équation d'une droite sur un graphique</h3>\n<ol>\n<li>Lis $p$ : l'ordonnée du point où la droite coupe l'axe des ordonnées.</li>\n<li>Choisis <strong>deux points à coordonnées lisibles</strong> (sur des croisements de la grille) et calcule $m = \\Delta y/\\Delta x$.</li>\n<li>Droite <strong>horizontale</strong> à la hauteur $c$ : $y = c$ ($m = 0$). Droite <strong>verticale</strong> à l'abscisse $k$ : $x = k$.</li>\n</ol>\n<p><strong>Exemple 10 (le graphique de ta feuille) :</strong> $d_1 : x = -3$ ; $d_2 : y = \\dfrac14x + 2$ (passe par $(0\\,;2)$ et $(4\\,;3)$) ; $d_3 : y = \\dfrac23x - 1$ ; $d_4 : y = -2{,}5$ ; $d_5 : y = -\\dfrac13x + \\dfrac{10}{3}$ (passe par $(0\\,;\\tfrac{10}3)$ et $(4\\,;2)$, soit $+3{,}333\\ldots$).</p>\n<p><strong>Un point appartient-il à la droite ?</strong> On remplace ses coordonnées dans l'équation. $Z(2\\,;0{,}3)$ et $d_3$ : $\\dfrac23\\times 2 - 1 = \\dfrac13 \\approx 0{,}333 \\neq 0{,}3$ donc <strong>$Z \\notin d_3$</strong>.</p>\n\n<h3>10. Tracer une droite à partir de son équation</h3>\n<ul>\n<li><strong>Méthode 1 :</strong> calculer deux points (ex. $x = 0$ et $x = 2$) et les relier.</li>\n<li><strong>Méthode 2 :</strong> placer $(0\\,;p)$, puis « avancer de 1, monter de $m$ » (si $m = \\tfrac34$ : avancer de 4, monter de 3).</li>\n</ul>\n<p><strong>Exemple 11 :</strong> $d_6: y=-2x+1$ passe par $(0\\,;1)$ et $(1\\,;-1)$ ; $d_7: y=0{,}5x+2$ par $(0\\,;2)$ et $(2\\,;3)$ ; $d_8: y=\\tfrac34x-2$ par $(0\\,;-2)$ et $(4\\,;1)$ ; $d_9: x=-2$ verticale ; $d_{10}: y=-\\tfrac13x-2$ par $(0\\,;-2)$ et $(3\\,;-3)$.</p>\n\n<h3>11. Positions relatives de deux droites</h3>\n<div class=\"formula-box\">$d : y = mx+p$ et $d' : y = m'x+p'$ sont <strong>parallèles</strong> $\\iff$ $m = m'$.<br>Si en plus $p = p'$ : elles sont <strong>confondues</strong> (même droite). Si $m \\neq m'$ : elles sont <strong>sécantes</strong> (un seul point commun).</div>\n<svg viewBox=\"0 0 330 250\" role=\"img\" style=\"width:100%;max-width:420px;display:block;margin:12px auto\"><line x1=\"15\" y1=\"241\" x2=\"15\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"48\" y1=\"241\" x2=\"48\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"81\" y1=\"241\" x2=\"81\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"114\" y1=\"241\" x2=\"114\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"147\" y1=\"241\" x2=\"147\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"180\" y1=\"241\" x2=\"180\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"213\" y1=\"241\" x2=\"213\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"246\" y1=\"241\" x2=\"246\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"279\" y1=\"241\" x2=\"279\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"312\" y1=\"241\" x2=\"312\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"241\" x2=\"312\" y2=\"241\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"208\" x2=\"312\" y2=\"208\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"175\" x2=\"312\" y2=\"175\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"142\" x2=\"312\" y2=\"142\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"109\" x2=\"312\" y2=\"109\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"76\" x2=\"312\" y2=\"76\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"43\" x2=\"312\" y2=\"43\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"10\" x2=\"312\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".12\"/><line x1=\"15\" y1=\"142\" x2=\"312\" y2=\"142\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"147\" y1=\"241\" x2=\"147\" y2=\"10\" stroke=\"currentColor\" stroke-opacity=\".6\"/><line x1=\"15\" y1=\"142\" x2=\"279\" y2=\"10\" stroke=\"#2563eb\" stroke-width=\"2.4\"/><text x=\"275\" y=\"4\" font-size=\"13\" fill=\"#2563eb\" text-anchor=\"end\">d : y = 0,5x + 2</text><line x1=\"15\" y1=\"241\" x2=\"279\" y2=\"109\" stroke=\"#16a34a\" stroke-width=\"2.4\"/><text x=\"275\" y=\"103\" font-size=\"13\" fill=\"#16a34a\" text-anchor=\"end\">d' : y = 0,5x − 1</text><circle cx=\"147\" cy=\"76\" r=\"4\" fill=\"#e11d48\"/><text x=\"153\" y=\"70\" font-size=\"13\" fill=\"currentColor\"></text><circle cx=\"147\" cy=\"175\" r=\"4\" fill=\"#e11d48\"/><text x=\"153\" y=\"169\" font-size=\"13\" fill=\"currentColor\"></text></svg>\n<p><strong>Exemple 12.</strong> $y = 2x+5$ et $y = 5x+2$ : $2 \\neq 5$ donc sécantes. Intersection : on <mark>résout le système</mark> (les $y$ sont égaux) : $2x + 5 = 5x + 2 \\Rightarrow -3x = -3 \\Rightarrow x = 1$, puis $y = 2\\times 1 + 5 = 7$. Point d'intersection : <strong>$(1\\,;7)$</strong> (vérif : $5\\times1+2 = 7$ ✓).</p>\n<p><strong>Exemple 13.</strong> Droite parallèle à $d : y = 3x - 1$ passant par $A(5\\,;6)$. Parallèle ⇒ même pente : $y = 3x + b$. Elle passe par $A$ : $6 = 3\\times 5 + b \\Rightarrow b = -9$. Équation : <strong>$y = 3x - 9$</strong>.</p>\n\n<h3>12. Erreurs à éviter</h3>\n<div class=\"attention-box\">\n❌ Calculer $\\dfrac{x_B-x_A}{y_B-y_A}$ (à l'envers) : la pente est « $\\Delta y$ sur $\\Delta x$ ».<br>\n❌ Mélanger l'ordre : $\\dfrac{y_B - y_A}{x_A - x_B}$ donne le signe opposé.<br>\n❌ Dire que $x = 4$ est « de la forme $y = mx+p$ » : c'est une droite verticale, sans pente.<br>\n❌ Oublier de <strong>changer le sens</strong> d'une inégalité quand on multiplie ou divise par un nombre négatif.<br>\n❌ Dans un tableau de signes, se tromper de sens pour $7 - x$ (ici $m = -1 &lt; 0$ : positif avant 7, négatif après).<br>\n❌ Calculer $p$ avec $x$ et $y$ inversés : on remplace $x$ par l'abscisse et $y$ par l'ordonnée.\n</div>",
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Pour chaque fonction, dis si elle est affine, linéaire, constante ou rien de tout cela, et donne $m$ et $p$ quand c'est possible : $f(x)=3x-7$ ; $g(x)=-2x$ ; $h(x)=5$ ; $k(x)=2-0{,}5x$ ; $l(x)=x^2+1$.</p>",
    "aide": "Remets chaque expression sous la forme mx + p. Linéaire : p = 0. Constante : m = 0.",
    "correction": "<p>$f$ affine : $m=3$, $p=-7$. $g$ <strong>linéaire</strong> : $m=-2$, $p=0$. $h$ <strong>constante</strong> : $m=0$, $p=5$. $k$ affine : $k(x) = -0{,}5x+2$ donc $m=-0{,}5$, $p=2$. $l$ <strong>n'est pas affine</strong> (il y a un $x^2$).</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>Soit $f(x) = -4x+3$. Calcule le taux d'accroissement de $f$ entre 1 et 6. Que remarques-tu ?</p>",
    "aide": "Calcule f(1) et f(6) puis (f(6) − f(1)) / (6 − 1).",
    "correction": "<p>$f(1) = -1$ et $f(6) = -21$. Taux $= \\dfrac{-21-(-1)}{6-1} = \\dfrac{-20}{5} = -4$. On retrouve <strong>$m = -4$</strong> : pour une fonction affine, le taux d'accroissement vaut toujours $m$, quels que soient les deux points choisis.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>La population d'une ville passe de 2 500 habitants en 2015 à 2 800 en 2020 (croissance linéaire). 1) Calcule le taux d'accroissement et interprète-le. 2) On note $f(x)$ la population $x$ années après 2015. Donne $f(x)$. 3) Quelle population en 2030 ?</p>",
    "aide": "Taux = variation de population ÷ variation d'années. Pour p, utilise f(0) = 2500.",
    "correction": "<p>1) $\\dfrac{2800-2500}{5} = 60$ : <strong>+60 habitants par an</strong>. 2) $f(x) = 60x + 2500$ ($f(0) = 2500$). 3) 2030 correspond à $x = 15$ : $f(15) = 60\\times15+2500 = \\mathbf{3\\,400}$ habitants.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Un automobiliste a fait le plein : après 100 km il reste 50 L, après 400 km il reste 33,5 L ; $f$ (volume restant en fonction des km) est affine. 1) Détermine $f$. 2) Combien reste-t-il après 735 km ? 3) Au bout de combien de km le réservoir est-il vide ?</p>",
    "aide": "m = (33,5 − 50)/(400 − 100). Puis remplace un point pour trouver p. Réservoir vide : f(x) = 0.",
    "correction": "<p>1) $m = \\dfrac{33{,}5-50}{300} = -0{,}055$. $50 = -0{,}055\\times100 + p \\Rightarrow p = 55{,}5$. $f(x) = -0{,}055x+55{,}5$.<br>2) $f(735) = -0{,}055\\times735+55{,}5 = 15{,}075$ L ≈ <strong>15,1 L</strong>.<br>3) $-0{,}055x + 55{,}5 = 0 \\Rightarrow x = \\dfrac{55{,}5}{0{,}055} \\approx \\mathbf{1\\,009}$ km.</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>Donne le sens de variation et la valeur qui annule : $f(x)=2x-3$ et $g(x)=5-6x$.</p>",
    "aide": "Le signe de m donne le sens ; mx + p = 0 donne x = −p/m.",
    "correction": "<p>$f$ : $m=2&gt;0$ → <strong>croissante</strong> ; $2x-3=0 \\Rightarrow x=\\dfrac32$. $g$ : $m=-6&lt;0$ → <strong>décroissante</strong> ; $5-6x=0 \\Rightarrow x=\\dfrac56$.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Donne, à l'aide d'un tableau, le signe de $A = 2x-3$ et de $B = 5-6x$.</p>",
    "aide": "Racine d'abord, puis signe de m après la racine.",
    "correction": "<p>$A$ : racine $\\dfrac32$, $m=2&gt;0$ : <strong>− sur $]-\\infty;\\tfrac32[$, 0 en $\\tfrac32$, + sur $]\\tfrac32;+\\infty[$</strong>.<br>$B$ : racine $\\dfrac56$, $m=-6&lt;0$ : <strong>+ sur $]-\\infty;\\tfrac56[$, 0 en $\\tfrac56$, − sur $]\\tfrac56;+\\infty[$</strong>.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Résous $(2x-5)(7-x) \\leq 0$ avec un tableau de signes, puis vérifie avec une valeur test.</p>",
    "aide": "Une ligne par facteur, une ligne pour le produit (règle des signes). Racines : 5/2 et 7.",
    "correction": "<p>$2x-5$ : − puis + (racine $2{,}5$). $7-x$ : + puis − (racine $7$). Produit : <strong>− / + / −</strong>.<br>$\\mathcal S = \\left]-\\infty;\\dfrac52\\right]\\cup[7;+\\infty[$.<br>Tests : $x=0$ → $-35\\leq0$ ✓ ; $x=3$ → $4&gt;0$ donc 3 est exclu ✓.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Résous : a) $4-3x \\leq 10$ ; b) $(x-1)(x+4) &gt; 0$ ; c) $(3x+6)(4-2x) \\geq 0$.</p>",
    "aide": "Pour a) attention au sens quand on divise par un négatif. Pour b) et c) : tableau de signes.",
    "correction": "<p>a) $-3x\\leq6 \\Rightarrow x \\geq -2$ (le sens <strong>change</strong>) : $\\mathcal S=[-2;+\\infty[$.<br>b) racines $1$ et $-4$ ; produit + à l'extérieur : $\\mathcal S=]-\\infty;-4[\\cup]1;+\\infty[$.<br>c) racines $-2$ et $2$ ; $3x+6$ : − puis + ; $4-2x$ : + puis − ; produit : − + − ; on veut $\\geq0$ : $\\mathcal S=[-2;2]$.</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>1) Donne le coefficient directeur, l'ordonnée à l'origine et un vecteur directeur de $y=-3x+5$. 2) Donne un vecteur directeur de la droite $x=-6$.</p>",
    "aide": "Vecteur directeur de y = mx + p : (1 ; m).",
    "correction": "<p>1) $m=-3$, $p=5$, $\\vec u\\begin{pmatrix}1\\\\-3\\end{pmatrix}$ (ou $\\begin{pmatrix}-1\\\\3\\end{pmatrix}$). 2) Droite verticale : $\\begin{pmatrix}0\\\\1\\end{pmatrix}$ ; elle n'a ni pente ni ordonnée à l'origine.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Détermine l'équation de la droite $(AB)$ dans chaque cas : a) $A(1;2)$, $B(4;8)$ ; b) $A(-2;5)$, $B(-2;1)$ ; c) $A(-1;4)$, $B(3;-2)$.</p>",
    "aide": "Regarde d'abord si les abscisses sont égales. Sinon : m puis p.",
    "correction": "<p>a) $m=\\dfrac{8-2}{4-1}=2$ ; $2=2\\times1+p \\Rightarrow p=0$ : <strong>$y=2x$</strong>.<br>b) Même abscisse $-2$ : droite verticale <strong>$x=-2$</strong>.<br>c) $m=\\dfrac{-2-4}{3-(-1)}=\\dfrac{-6}{4}=-\\dfrac32$ ; $4=-\\dfrac32\\times(-1)+p \\Rightarrow p=\\dfrac52$ : <strong>$y=-\\dfrac32x+\\dfrac52$</strong> (vérif avec $B$ : $-\\tfrac92+\\tfrac52=-2$ ✓).</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Trouve l'équation de chaque droite : a) passe par $(0;2)$ et $(4;3)$ ; b) passe par $(0;-1)$ et $(3;1)$ ; c) horizontale passant par $(0;-2{,}5)$ ; d) passe par $(0;\\tfrac{10}{3})$ et $(4;2)$ ; e) verticale passant par $(-3;0)$.</p>",
    "aide": "C'est l'exemple 10 de ta feuille, refait par le calcul.",
    "correction": "<p>a) $m=\\tfrac14$ : $y=\\tfrac14x+2$. b) $m=\\tfrac23$ : $y=\\tfrac23x-1$. c) $y=-2{,}5$. d) $m=\\dfrac{2-\\frac{10}3}{4}=-\\dfrac13$ : $y=-\\dfrac13x+\\dfrac{10}3$. e) $x=-3$.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Le point $Z(2;0{,}3)$ appartient-il à la droite $d_3 : y=\\tfrac23x-1$ ? Et $M(6;3)$ ?</p>",
    "aide": "Remplace x par l'abscisse et compare avec l'ordonnée.",
    "correction": "<p>Pour $Z$ : $\\tfrac23\\times2-1=\\tfrac13\\approx0{,}333\\neq0{,}3$ → <strong>non</strong>. Pour $M$ : $\\tfrac23\\times6-1=3$ → <strong>oui</strong>.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Place et trace : $d_6 : y=-2x+1$ ; $d_7 : y=0{,}5x+2$ ; $d_8 : y=\\tfrac34x-2$ ; $d_9 : x=-2$ ; $d_{10} : y=-\\tfrac13x-2$. Donne deux points faciles à placer pour chacune.</p>",
    "aide": "Un point avec x = 0, un autre avec x = un nombre qui évite les fractions.",
    "correction": "<p>$d_6$ : $(0;1)$ et $(1;-1)$. $d_7$ : $(0;2)$ et $(2;3)$. $d_8$ : $(0;-2)$ et $(4;1)$. $d_9$ : verticale passant par $(-2;0)$. $d_{10}$ : $(0;-2)$ et $(3;-3)$.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Étudie la position relative de : a) $y=2x+5$ et $y=5x+2$ ; b) $y=3x-1$ et $y=3x+4$ ; c) $y=-x+2$ et $2y=-2x+4$. Pour a), donne le point d'intersection.</p>",
    "aide": "Compare les pentes, puis les ordonnées à l'origine. Pour c), mets la 2ᵉ équation sous la forme y = mx + p.",
    "correction": "<p>a) $2\\neq5$ : sécantes. $2x+5=5x+2 \\Rightarrow x=1$, $y=7$ : <strong>$(1;7)$</strong>.<br>b) Même pente 3, $p$ différents : <strong>strictement parallèles</strong>.<br>c) $2y=-2x+4 \\Rightarrow y=-x+2$ : même $m$ et même $p$ → <strong>confondues</strong>.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Détermine la droite parallèle à $d : y=3x-1$ passant par $A(5;6)$.</p>",
    "aide": "Parallèle : même pente. Puis p avec les coordonnées de A.",
    "correction": "<p>$y=3x+b$ ; $6=15+b \\Rightarrow b=-9$. Équation : <strong>$y=3x-9$</strong>.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Pour quelle valeur de $m$ les droites $y=(m+1)x+3$ et $y=(2m-3)x-1$ sont-elles parallèles ? Sont-elles alors confondues ?</p>",
    "aide": "Parallèles ⇔ mêmes pentes : écris une équation en m.",
    "correction": "<p>$m+1=2m-3 \\Rightarrow m=4$. Les pentes valent alors $5$ ; les ordonnées à l'origine $3\\neq-1$ : droites <strong>strictement parallèles</strong>.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Une salle de sport propose : formule A = 15 € d'abonnement + 0,50 € par séance ; formule B = 2 € par séance, sans abonnement. 1) Écris le prix $f(x)$ (A) et $g(x)$ (B) pour $x$ séances. 2) À partir de combien de séances A est-elle plus avantageuse ?</p>",
    "aide": "Cherche quand f(x) = g(x), puis résous f(x) < g(x).",
    "correction": "<p>1) $f(x)=0{,}5x+15$ ; $g(x)=2x$. 2) $f(x)&lt;g(x) \\iff 15&lt;1{,}5x \\iff x&gt;10$. À 10 séances, les deux prix sont égaux (20 €) ; <strong>à partir de 11 séances A est plus avantageuse</strong>. C'est aussi l'abscisse du point d'intersection des deux droites.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Une droite passe par $A(2;-1)$ et a pour coefficient directeur $-3$. Donne son équation puis le point où elle coupe l'axe des abscisses.</p>",
    "aide": "Remplace dans y = −3x + p les coordonnées de A. Axe des abscisses : y = 0.",
    "correction": "<p>$-1=-3\\times2+p \\Rightarrow p=5$ : $y=-3x+5$. $y=0 \\Rightarrow x=\\dfrac53$ : point $\\left(\\dfrac53;0\\right)$.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p><strong>ÉVAL BLANCHE (20 pts, 40 min, sans notes).</strong><br><strong>Ex. A (5 pts)</strong> $f$ est affine avec $f(2)=7$ et $f(6)=-1$. Détermine $f$, son sens de variation, la valeur qui l'annule et $f(10)$.<br><strong>Ex. B (5 pts)</strong> Résous $(3x-6)(4-x)&gt;0$ avec un tableau de signes.<br><strong>Ex. C (5 pts)</strong> $A(-1;3)$, $B(2;-3)$, $C(0;1)$. Détermine l'équation de $(AB)$. $C$ appartient-il à $(AB)$ ? Équation de la parallèle à $(AB)$ passant par $D(1;5)$.<br><strong>Ex. D (5 pts)</strong> Taxi : 3 € de prise en charge + 1,20 € par km ($f$). Une autre compagnie : 1 € + 1,50 € par km ($g$). Prix d'un trajet de 15 km chez le 1ᵉʳ ? Quelle distance pour 30 € ? À partir de quelle distance le 1ᵉʳ est-il moins cher ?</p>",
    "aide": "Fais-la comme en vrai : chrono, sans regarder le cours, puis corrige.",
    "correction": "<p><strong>Ex. A.</strong> $m=\\dfrac{-1-7}{6-2}=-2$ ; $7=-4+p \\Rightarrow p=11$ : $f(x)=-2x+11$ (2 pts). Décroissante car $m&lt;0$ (1 pt). $f(x)=0 \\Rightarrow x=\\dfrac{11}2$ (1 pt). $f(10)=-9$ (1 pt).<br><strong>Ex. B.</strong> Racines $2$ et $4$. $3x-6$ : − puis + ; $4-x$ : + puis − ; produit : − + −. On veut $&gt;0$ : $\\mathcal S=]2;4[$ (crochets ouverts car $&gt;$ strict). Test $x=3$ : $3\\times1=3&gt;0$ ✓.<br><strong>Ex. C.</strong> $m=\\dfrac{-3-3}{2+1}=-2$ ; $3=2+p \\Rightarrow p=1$ : $(AB) : y=-2x+1$. Pour $C$ : $-2\\times0+1=1$ ✓ donc $C\\in(AB)$ (les 3 points sont alignés). Parallèle par $D$ : $y=-2x+b$, $5=-2+b \\Rightarrow b=7$ : $y=-2x+7$.<br><strong>Ex. D.</strong> $f(x)=1{,}2x+3$ ; $f(15)=21$ €. $1{,}2x+3=30 \\Rightarrow x=22{,}5$ km. $f(x)&lt;g(x) \\iff 1{,}2x+3&lt;1{,}5x+1 \\iff 2&lt;0{,}3x \\iff x&gt;\\dfrac{20}3\\approx6{,}67$ km : le 1ᵉʳ taxi est moins cher <strong>au-delà de 6,67 km</strong>.</p>"
   }
  ],
  "flashcards": [
   {
    "q": "Fonction affine — définition",
    "a": "f(x) = mx + p, avec m et p réels. Sa courbe est une droite."
   },
   {
    "q": "Que représentent m et p dans f(x) = mx + p ?",
    "a": "m = coefficient directeur (pente) ; p = ordonnée à l'origine (valeur de f(0))."
   },
   {
    "q": "Fonction linéaire / constante",
    "a": "Linéaire : p = 0 (f(x) = mx, droite par l'origine). Constante : m = 0 (f(x) = p, droite horizontale)."
   },
   {
    "q": "Taux d'accroissement d'une fonction affine",
    "a": "(f(x₂) − f(x₁)) / (x₂ − x₁) = m, pour tous x₁ ≠ x₂."
   },
   {
    "q": "Pourquoi le taux d'accroissement vaut m ?",
    "a": "Le p s'annule dans la soustraction, il reste m(x₂ − x₁)/(x₂ − x₁) = m."
   },
   {
    "q": "Comment déterminer une fonction affine connaissant deux valeurs ?",
    "a": "1) m = (f(x₂) − f(x₁))/(x₂ − x₁). 2) On remplace m, x et f(x) d'un point dans mx + p pour trouver p."
   },
   {
    "q": "Sens de variation d'une fonction affine",
    "a": "m > 0 : strictement croissante. m < 0 : strictement décroissante. m = 0 : constante."
   },
   {
    "q": "Pour quelle valeur de x a-t-on mx + p = 0 ?",
    "a": "x = −p/m (si m ≠ 0)."
   },
   {
    "q": "Signe de mx + p si m > 0",
    "a": "Négatif avant −p/m, nul en −p/m, positif après."
   },
   {
    "q": "Signe de mx + p si m < 0",
    "a": "Positif avant −p/m, nul en −p/m, négatif après."
   },
   {
    "q": "Règle de mémoire pour le signe de mx + p",
    "a": "Du signe de m après la racine, du signe opposé avant."
   },
   {
    "q": "Étapes pour résoudre (ax+b)(cx+d) ≤ 0",
    "a": "Racines de chaque facteur → tableau (une ligne par facteur + une pour le produit) → règle des signes → lire les intervalles qui conviennent."
   },
   {
    "q": "Quand utilise-t-on des crochets fermés dans une solution ?",
    "a": "Quand l'inégalité est large (≤ ou ≥) : les racines sont solutions. Crochets ouverts pour < ou >."
   },
   {
    "q": "Que faire quand on multiplie/divise une inégalité par un négatif ?",
    "a": "On change le sens de l'inégalité."
   },
   {
    "q": "Solution de (2x − 5)(7 − x) ≤ 0",
    "a": "]−∞ ; 5/2] ∪ [7 ; +∞["
   },
   {
    "q": "Équation réduite d'une droite non verticale",
    "a": "y = mx + p."
   },
   {
    "q": "Équation d'une droite verticale",
    "a": "x = k. Elle n'a ni pente ni ordonnée à l'origine."
   },
   {
    "q": "Équation d'une droite horizontale",
    "a": "y = c (pente nulle)."
   },
   {
    "q": "Vecteur directeur de y = mx + p",
    "a": "(1 ; m), ou tout multiple non nul de ce vecteur."
   },
   {
    "q": "Vecteur directeur d'une droite verticale x = k",
    "a": "(0 ; 1)."
   },
   {
    "q": "Formule de la pente avec deux points",
    "a": "m = (y_B − y_A)/(x_B − x_A) = Δy/Δx (même ordre en haut et en bas)."
   },
   {
    "q": "Si x_A = x_B = k, quelle est la droite (AB) ?",
    "a": "La droite verticale x = k (pas de pente)."
   },
   {
    "q": "Méthode : équation de (AB) si x_A ≠ x_B",
    "a": "Calculer m = Δy/Δx, puis trouver p avec les coordonnées de A (ou de B) dans y = mx + p."
   },
   {
    "q": "Comment lire l'équation d'une droite sur un graphique ?",
    "a": "Lire p (intersection avec l'axe des ordonnées) puis calculer m avec deux points lisibles."
   },
   {
    "q": "Un point appartient-il à une droite ?",
    "a": "On remplace x par son abscisse : si on obtient son ordonnée, oui ; sinon, non."
   },
   {
    "q": "Deux méthodes pour tracer y = mx + p",
    "a": "1) Calculer deux points et les relier. 2) Placer (0 ; p) puis avancer de 1 et monter de m."
   },
   {
    "q": "Droites parallèles (équations réduites)",
    "a": "y = mx + p et y = m'x + p' sont parallèles ⇔ m = m'."
   },
   {
    "q": "Droites confondues",
    "a": "Mêmes pentes ET mêmes ordonnées à l'origine (m = m' et p = p')."
   },
   {
    "q": "Droites sécantes",
    "a": "Pentes différentes (m ≠ m') : un seul point commun."
   },
   {
    "q": "Comment trouver le point d'intersection de deux droites ?",
    "a": "Résoudre le système : égaler les deux expressions de y, trouver x, puis calculer y."
   },
   {
    "q": "Intersection de y = 2x + 5 et y = 5x + 2",
    "a": "2x + 5 = 5x + 2 ⇒ x = 1, y = 7 : point (1 ; 7)."
   },
   {
    "q": "Parallèle à y = 3x − 1 passant par A(5 ; 6)",
    "a": "Même pente : y = 3x + b ; 6 = 15 + b ⇒ b = −9 ; y = 3x − 9."
   },
   {
    "q": "Interprétation d'une pente dans un problème",
    "a": "C'est la variation de la grandeur de sortie pour 1 unité d'entrée (ex. +60 habitants/an, −0,055 L/km)."
   },
   {
    "q": "Si ax + by + c = 0 avec b ≠ 0, que valent m et p ?",
    "a": "m = −a/b et p = −c/b. Vecteur directeur (−b ; a). Si b = 0 : droite verticale."
   },
   {
    "q": "Piège classique sur la pente",
    "a": "Ne pas inverser Δx et Δy, et garder le même ordre des points en haut et en bas."
   },
   {
    "q": "Fonction affine : combien de points suffisent pour la tracer ?",
    "a": "Deux points."
   },
   {
    "q": "Prix = fixe + variable : quelle fonction ?",
    "a": "Fonction affine f(x) = (prix unitaire)·x + (partie fixe)."
   }
  ]
 },
 "Automatismes — calcul rapide": {
  "cours": "<div class=\"attention-box\"><strong>Les automatismes</strong> sont des questions courtes, <mark>sans calculatrice</mark> si possible, posées en début d'évaluation : pourcentages, fractions, puissances, calcul littéral, équations, conversions, lecture de graphique. Le secret : connaître 10 réflexes et les répéter. Chaque réflexe ci-dessous a son exemple, puis un entraînement dans les exercices et les flashcards.</div>\n\n<h3>1. Pourcentages : le coefficient multiplicateur</h3>\n<div class=\"formula-box\">Augmenter de $t\\,\\%$ : multiplier par $1+\\dfrac{t}{100}$. &nbsp; Diminuer de $t\\,\\%$ : multiplier par $1-\\dfrac{t}{100}$.</div>\n<p>Ex : −15 % sur 80 € : $80\\times0{,}85 = 68$ €. +30 % : $\\times1{,}3$.</p>\n<ul>\n<li><strong>Pourcentage d'un nombre</strong> : $30\\,\\%$ de $250$ = $0{,}30\\times250 = 75$.</li>\n<li><strong>Taux d'évolution</strong> : $\\dfrac{\\text{valeur finale}-\\text{valeur initiale}}{\\text{valeur initiale}}$. De 50 à 65 : $\\dfrac{15}{50}=0{,}3=+30\\,\\%$.</li>\n<li><strong>Évolutions successives</strong> : on <mark>multiplie</mark> les coefficients (on n'additionne pas les pourcentages !). +20 % puis −20 % : $1{,}2\\times0{,}8=0{,}96$, soit <strong>−4 %</strong>.</li>\n<li><strong>Évolution réciproque</strong> : pour revenir au départ on divise par le coefficient. Après +25 %, prix 150 € : avant $=150/1{,}25=120$ €.</li>\n</ul>\n\n<h3>2. Proportionnalité</h3>\n<p>Produit en croix ou coefficient : 240 km pour 14,4 L → $\\dfrac{14{,}4}{240}=0{,}06$ L/km = <strong>6 L/100 km</strong> ; pour 350 km : $0{,}06\\times350=21$ L.</p>\n\n<h3>3. Fractions</h3>\n<div class=\"formula-box\">$\\dfrac ab+\\dfrac cd=\\dfrac{ad+bc}{bd}$ &nbsp; $\\dfrac ab\\times\\dfrac cd=\\dfrac{ac}{bd}$ &nbsp; $\\dfrac ab\\div\\dfrac cd=\\dfrac ab\\times\\dfrac dc$</div>\n<p>Ex : $\\dfrac23+\\dfrac34=\\dfrac{8+9}{12}=\\dfrac{17}{12}$ ; $\\dfrac56\\div\\dfrac{10}9=\\dfrac56\\times\\dfrac9{10}=\\dfrac{45}{60}=\\dfrac34$.</p>\n\n<h3>4. Puissances</h3>\n<div class=\"formula-box\">$a^m\\times a^n=a^{m+n}$ &nbsp; $\\dfrac{a^m}{a^n}=a^{m-n}$ &nbsp; $(a^m)^n=a^{mn}$ &nbsp; $a^0=1$ &nbsp; $a^{-n}=\\dfrac1{a^n}$</div>\n<p>Ex : $2^3\\times2^4=2^7=128$ ; $10^3\\times10^{-5}=10^{-2}$ ; $4^{-1}=\\dfrac14$. Racines : $\\sqrt{50}=\\sqrt{25\\times2}=5\\sqrt2$ ; $(\\sqrt3)^2=3$.</p>\n\n<h3>5. Calcul littéral</h3>\n<div class=\"formula-box\">$(a+b)^2=a^2+2ab+b^2$ &nbsp; $(a-b)^2=a^2-2ab+b^2$ &nbsp; $(a-b)(a+b)=a^2-b^2$</div>\n<p>Ex : $(x+3)^2=x^2+6x+9$ ; $(2x-1)(2x+1)=4x^2-1$. Factoriser : $x^2-25=(x-5)(x+5)$ ; $3x^2-6x=3x(x-2)$.</p>\n<div class=\"attention-box\">$(a+b)^2\\neq a^2+b^2$ : il manque le double produit $2ab$ !</div>\n\n<h3>6. Équations et inéquations du 1ᵉʳ degré</h3>\n<p>On isole $x$ en faisant la même opération des deux côtés. $3x+7=2x-5 \\Rightarrow x=-12$. $5(x-2)=3x+4 \\Rightarrow 2x=14 \\Rightarrow x=7$. Inéquation : si on divise par un <strong>négatif</strong>, on change le sens.</p>\n\n<h3>7. Conversions, vitesses, moyennes</h3>\n<ul>\n<li>$\\text{km/h}\\to\\text{m/s}$ : on <mark>divise par 3,6</mark> (72 km/h = 20 m/s) ; l'inverse : $\\times3{,}6$.</li>\n<li>$v=\\dfrac dt$ ; $d=v\\times t$ ; $t=\\dfrac dv$ (unités cohérentes !). 150 km en 1 h 30 : $\\dfrac{150}{1{,}5}=100$ km/h. 3 h 15 min = 3,25 h.</li>\n<li>$1\\ \\text{m}^3=1\\,000$ L ; 2,5 m³ = 2 500 L.</li>\n<li><strong>Moyenne pondérée</strong> : $\\dfrac{\\sum \\text{note}\\times\\text{coef}}{\\sum\\text{coef}}$.</li>\n</ul>\n\n<h3>8. Fonction affine : le réflexe</h3>\n<p>Dans un énoncé « prix fixe + prix à l'unité », c'est $f(x)=mx+p$. Pour la pente : $\\Delta y/\\Delta x$ (voir le chapitre « Fonctions affines & droites »).</p>",
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Un article coûte 80 € et subit une baisse de 15 %. Nouveau prix ? Quel est le coefficient multiplicateur ?</p>",
    "aide": "Baisse de t % : × (1 − t/100).",
    "correction": "<p>Coefficient $0{,}85$ ; prix $=80\\times0{,}85=\\mathbf{68}$ €.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Un prix augmente de 20 % puis baisse de 20 %. Quelle est l'évolution globale ?</p>",
    "aide": "On multiplie les coefficients, on n'additionne pas les pourcentages.",
    "correction": "<p>$1{,}2\\times0{,}8=0{,}96$ : baisse globale de <strong>4 %</strong> (et pas 0 %).</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Après une hausse de 25 %, un objet coûte 150 €. Quel était son prix initial ?</p>",
    "aide": "Pour revenir en arrière, on divise par le coefficient.",
    "correction": "<p>$150\\div1{,}25=\\mathbf{120}$ €. (Ce n'est pas $150-25\\,\\%$ de 150 !)</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Deux hausses successives de 10 %. Quelle hausse globale ?</p>",
    "aide": "Coefficients 1,1 × 1,1.",
    "correction": "<p>$1{,}1\\times1{,}1=1{,}21$ : <strong>+21 %</strong>.</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>Une voiture a parcouru 240 km avec 14,4 L. Consommation aux 100 km ? Combien de litres pour 350 km ?</p>",
    "aide": "Proportionnalité : litres par km.",
    "correction": "<p>$\\dfrac{14{,}4}{240}=0{,}06$ L/km, soit <strong>6 L/100 km</strong> ; pour 350 km : $0{,}06\\times350=\\mathbf{21}$ L.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Calcule : a) $\\dfrac23+\\dfrac34$ ; b) $\\dfrac56\\div\\dfrac{10}9$ ; c) $\\dfrac12-\\dfrac13$.</p>",
    "aide": "Dénominateur commun pour + et − ; inverser pour ÷.",
    "correction": "<p>a) $\\dfrac{17}{12}$ ; b) $\\dfrac56\\times\\dfrac9{10}=\\dfrac34$ ; c) $\\dfrac16$.</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>Calcule sans calculatrice : $2^3\\times2^4$ ; $(3^2)^3$ ; $10^5\\times10^{-2}$ ; $5^0$ ; $4^{-1}$ ; $\\sqrt{50}$.</p>",
    "aide": "Règles sur les exposants.",
    "correction": "<p>$2^7=128$ ; $3^6=729$ ; $10^3$ ; $1$ ; $\\dfrac14$ ; $5\\sqrt2$.</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>Convertis : 72 km/h en m/s ; 3 h 15 min en heures ; 2,5 m³ en litres.</p>",
    "aide": "Divise par 3,6 pour km/h → m/s.",
    "correction": "<p>$72\\div3{,}6=\\mathbf{20}$ m/s ; $3+\\dfrac{15}{60}=\\mathbf{3{,}25}$ h ; $\\mathbf{2\\,500}$ L.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Développe $(x+3)^2$ et $(2x-1)(2x+1)$. Factorise $x^2-25$ et $3x^2-6x$.</p>",
    "aide": "Identités remarquables ; facteur commun.",
    "correction": "<p>$x^2+6x+9$ ; $4x^2-1$ ; $(x-5)(x+5)$ ; $3x(x-2)$.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Résous : a) $3x+7=2x-5$ ; b) $5(x-2)=3x+4$ ; c) $\\dfrac x4=\\dfrac32$ ; d) $-2x+1\\leq7$.</p>",
    "aide": "Isole x. Attention au sens de l'inégalité en d).",
    "correction": "<p>a) $x=-12$ ; b) $5x-10=3x+4 \\Rightarrow x=7$ ; c) $x=6$ ; d) $-2x\\leq6 \\Rightarrow x\\geq-3$ (sens changé).</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Notes : 12 (coef 2), 8 (coef 1), 15 (coef 3). Moyenne pondérée ? Une voiture fait 150 km en 1 h 30 : vitesse ? Distance à 90 km/h pendant 40 min ?</p>",
    "aide": "Somme des note×coef ÷ somme des coefs.",
    "correction": "<p>$\\dfrac{24+8+45}{6}=\\dfrac{77}6\\approx12{,}83$ ; $\\dfrac{150}{1{,}5}=100$ km/h ; $90\\times\\dfrac{40}{60}=\\mathbf{60}$ km.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p><strong>MINI-ÉVAL (10 questions, 10 min, sans calculatrice).</strong> 1) 30 % de 250 ? 2) 60 € après −25 % ? 3) $\\tfrac35$ en % ? 4) $0{,}4\\times0{,}5$ ? 5) $2x+3=11$ ? 6) $(x+1)^2$ ? 7) $10^3\\times10^{-5}$ ? 8) 36 km/h en m/s ? 9) $\\tfrac12+\\tfrac13$ ? 10) Évolution de 50 à 65 ?</p>",
    "aide": "Chronomètre-toi et corrige ensuite.",
    "correction": "<p>1) $75$ ; 2) $45$ € ; 3) $60\\,\\%$ ; 4) $0{,}2$ ; 5) $x=4$ ; 6) $x^2+2x+1$ ; 7) $10^{-2}$ ; 8) $10$ m/s ; 9) $\\tfrac56$ ; 10) $\\dfrac{15}{50}=+30\\,\\%$.</p>"
   }
  ],
  "flashcards": [
   {
    "q": "Coefficient multiplicateur d'une hausse de t %",
    "a": "1 + t/100 (ex. +15 % → ×1,15)."
   },
   {
    "q": "Coefficient multiplicateur d'une baisse de t %",
    "a": "1 − t/100 (ex. −15 % → ×0,85)."
   },
   {
    "q": "Calculer p % d'un nombre N",
    "a": "N × p/100 (ex. 30 % de 250 = 0,30 × 250 = 75)."
   },
   {
    "q": "Taux d'évolution",
    "a": "(valeur finale − valeur initiale) / valeur initiale."
   },
   {
    "q": "Évolutions successives",
    "a": "On multiplie les coefficients multiplicateurs (jamais on n'additionne les pourcentages)."
   },
   {
    "q": "+20 % puis −20 %, bilan ?",
    "a": "1,2 × 0,8 = 0,96 : −4 %."
   },
   {
    "q": "Deux hausses de 10 % à la suite",
    "a": "1,1 × 1,1 = 1,21 : +21 %."
   },
   {
    "q": "Évolution réciproque",
    "a": "Pour revenir à la valeur de départ, on divise par le coefficient multiplicateur."
   },
   {
    "q": "Addition de fractions",
    "a": "a/b + c/d = (ad + bc)/(bd) (dénominateur commun)."
   },
   {
    "q": "Division de fractions",
    "a": "a/b ÷ c/d = a/b × d/c."
   },
   {
    "q": "a^m × a^n",
    "a": "a^(m+n)"
   },
   {
    "q": "a^m / a^n",
    "a": "a^(m−n)"
   },
   {
    "q": "(a^m)^n",
    "a": "a^(mn)"
   },
   {
    "q": "a⁰ et a^(−n)",
    "a": "a⁰ = 1 ; a^(−n) = 1/aⁿ."
   },
   {
    "q": "Simplifier √50",
    "a": "√(25×2) = 5√2."
   },
   {
    "q": "(a + b)²",
    "a": "a² + 2ab + b² (n'oublie pas le double produit)."
   },
   {
    "q": "(a − b)²",
    "a": "a² − 2ab + b²."
   },
   {
    "q": "(a − b)(a + b)",
    "a": "a² − b²."
   },
   {
    "q": "Factoriser x² − 25",
    "a": "(x − 5)(x + 5)."
   },
   {
    "q": "Factoriser 3x² − 6x",
    "a": "3x(x − 2) (facteur commun)."
   },
   {
    "q": "Résoudre une inéquation en divisant par un négatif",
    "a": "On change le sens de l'inégalité."
   },
   {
    "q": "km/h → m/s",
    "a": "On divise par 3,6 (72 km/h = 20 m/s)."
   },
   {
    "q": "m/s → km/h",
    "a": "On multiplie par 3,6."
   },
   {
    "q": "Vitesse, distance, temps",
    "a": "v = d/t ; d = v × t ; t = d/v (unités cohérentes)."
   },
   {
    "q": "3 h 15 min en heures",
    "a": "3,25 h (15 min = 0,25 h)."
   },
   {
    "q": "1 m³ en litres",
    "a": "1 000 L."
   },
   {
    "q": "Moyenne pondérée",
    "a": "Somme (note × coef) ÷ somme des coefs."
   },
   {
    "q": "Proportionnalité : méthode",
    "a": "Calculer le coefficient (valeur par unité) ou faire un produit en croix."
   },
   {
    "q": "Prix = partie fixe + prix à l'unité",
    "a": "Fonction affine f(x) = mx + p (m = prix unitaire, p = partie fixe)."
   }
  ]
 }
});
