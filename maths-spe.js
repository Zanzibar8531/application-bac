/* ============================================================
   BACMASTER — data/maths-spe.js
   Cours et flashcards — Maths Spé
   ============================================================ */

PREBUILT['Maths Spé'] = {

'Second degré': {
cours:`<h3>Équations du Second Degré</h3>
<p>Forme générale : <strong>ax² + bx + c = 0</strong>, a ≠ 0.</p>
<div class="formula-box">Discriminant : Δ = b² − 4ac</div>
<h3>Résolution selon Δ</h3>
<ul>
<li><strong>Δ &gt; 0</strong> : deux racines x₁ = (−b − √Δ)/(2a) et x₂ = (−b + √Δ)/(2a)</li>
<li><strong>Δ = 0</strong> : une racine double x₀ = −b/(2a)</li>
<li><strong>Δ &lt; 0</strong> : aucune racine réelle</li>
</ul>
<h3>Relations coefficients–racines</h3>
<div class="formula-box">x₁ + x₂ = −b/a &nbsp;&nbsp;&nbsp;&nbsp; x₁ × x₂ = c/a</div>
<h3>Formes du trinôme</h3>
<ul>
<li><strong>Développée</strong> : ax² + bx + c</li>
<li><strong>Canonique</strong> : a(x − α)² + β &nbsp;avec α = −b/(2a), β = −Δ/(4a)</li>
<li><strong>Factorisée</strong> (Δ &gt; 0) : a(x − x₁)(x − x₂)</li>
</ul>
<h3>Signe du trinôme</h3>
<p>Si Δ &gt; 0 : signe de <strong>a</strong> à l'extérieur de [x₁ ; x₂], signe de <strong>−a</strong> entre les racines.<br>
Si Δ ≤ 0 : signe de <strong>a</strong> sur tout ℝ (ou nul si Δ = 0 en x₀).</p>`,
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
<p>f'(a) = pente de la tangente à la courbe en x = a. Mesure le taux de variation instantané.</p>
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
<li>f'(x) &gt; 0 sur I ⟹ f croissante sur I</li>
<li>f'(x) &lt; 0 sur I ⟹ f décroissante sur I</li>
<li>f'(a) = 0 avec changement de signe ⟹ extremum en a</li>
</ul>
<div class="formula-box">Tangente en x = a : y = f'(a)(x − a) + f(a)</div>`,
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
<div class="formula-box">Conversion : 180° = π rad<br>° → rad : multiplier par π/180<br>rad → ° : multiplier par 180/π</div>
<h3>Valeurs remarquables</h3>
<table class="formula-table">
<tr><th>x</th><th>0</th><th>π/6</th><th>π/4</th><th>π/3</th><th>π/2</th></tr>
<tr><td>sin x</td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr>
<tr><td>cos x</td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr>
<tr><td>tan x</td><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>—</td></tr>
</table>
<h3>Identités fondamentales</h3>
<div class="formula-box">cos²x + sin²x = 1 &nbsp;[Pythagore]<br>tan x = sin x / cos x<br>cos(−x) = cos x &nbsp;[PAIRE]<br>sin(−x) = −sin x &nbsp;[IMPAIRE]<br>cos(π−x) = −cos x<br>sin(π−x) = sin x<br>cos(π+x) = −cos x<br>sin(π+x) = −sin x</div>
<h3>Formules de duplication</h3>
<div class="formula-box">cos(2x) = cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x<br>sin(2x) = 2 sin x cos x</div>`,
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
</ol>`,
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
<h3>Formule des probabilités totales</h3>
<div class="formula-box">Si (B₁,…,Bₙ) est une partition de Ω :<br>P(A) = Σ P(Bᵢ)·P(A|Bᵢ)</div>
<h3>Loi binomiale X ~ B(n, p)</h3>
<p>n épreuves de Bernoulli indépendantes, probabilité p de succès.</p>
<div class="formula-box latex-block">$$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$$
$E(X) = np \qquad V(X) = np(1-p) \qquad \sigma = \sqrt{np(1-p)}$</div>
<div class="formula-box">P(A∪B) = P(A) + P(B) − P(A∩B)<br>P(Ā) = 1 − P(A)</div>`,
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
<div class="formula-box">ln(eˣ) = x pour tout x ∈ ℝ<br>e^(ln x) = x pour x > 0<br>eˣ = a ⟺ x = ln a (a > 0)</div>`,
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
