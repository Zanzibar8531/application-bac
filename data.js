/* ============================================================
   BACMASTER — data.js
   Cours et flashcards pré-chargés pour la Première
   Français · Maths Spé · SES · Anglais Spé · Histoire-Géo
   ============================================================ */

const PREBUILT = {

// ────────────────────────────────────────────────────────────
// FRANÇAIS
// ────────────────────────────────────────────────────────────
'Français': {

'Figures de style': {
cours:`<h3>Les Figures de Style</h3>
<p>Indispensables pour l'oral et le commentaire. Toujours analyser <em>l'effet produit</em>.</p>
<h3>Figures d'analogie</h3>
<ul>
<li><strong>Comparaison</strong> : outil comparatif (comme, tel, semblable à). <em>"Il est fort comme un lion."</em></li>
<li><strong>Métaphore</strong> : comparaison SANS outil. <em>"C'est un lion au combat."</em></li>
<li><strong>Métaphore filée</strong> : métaphore développée sur plusieurs lignes/vers.</li>
<li><strong>Allégorie</strong> : idée abstraite = image concrète. Ex : La Mort = squelette à la faux.</li>
<li><strong>Personnification</strong> : caractères humains à un objet/animal. <em>"La forêt murmure."</em></li>
<li><strong>Métonymie</strong> : désigner par un élément lié. <em>"Boire un verre"</em> = son contenu.</li>
<li><strong>Périphrase</strong> : remplacer un mot par une expression. <em>"Le roi des animaux"</em> = lion.</li>
</ul>
<h3>Figures d'insistance</h3>
<ul>
<li><strong>Anaphore</strong> : répétition en DÉBUT de phrase.</li>
<li><strong>Épiphore</strong> : répétition en FIN de phrase.</li>
<li><strong>Gradation</strong> : progression ascendante ou descendante.</li>
<li><strong>Hyperbole</strong> : exagération. <em>"Je t'ai dit mille fois…"</em></li>
<li><strong>Accumulation</strong> : liste de termes.</li>
<li><strong>Apostrophe</strong> : interpellation directe. <em>"Ô temps ! suspends ton vol."</em></li>
<li><strong>Question rhétorique</strong> : question sans réponse attendue.</li>
</ul>
<h3>Figures d'atténuation</h3>
<ul>
<li><strong>Litote</strong> : dire moins pour suggérer plus. <em>"Va, je ne te hais point."</em> = je t'aime.</li>
<li><strong>Euphémisme</strong> : adoucir une réalité. <em>"Il nous a quittés"</em> = il est mort.</li>
</ul>
<h3>Figures d'opposition</h3>
<ul>
<li><strong>Antithèse</strong> : opposition de deux contraires dans la même phrase.</li>
<li><strong>Oxymore</strong> : deux mots contradictoires accolés. <em>"Cette obscure clarté"</em> (Corneille).</li>
<li><strong>Antiphrase (ironie)</strong> : dire le contraire de ce qu'on pense.</li>
</ul>
<h3>Figures sonores</h3>
<ul>
<li><strong>Allitération</strong> : répétition d'une consonne. <em>"Pour qui sont ces serpents qui sifflent…"</em></li>
<li><strong>Assonance</strong> : répétition d'une voyelle.</li>
<li><strong>Chiasme</strong> : structure croisée A B / B A.</li>
</ul>`,
flashcards:[
{q:'Métaphore',a:'Comparaison SANS outil. Ex : "C\'est un lion au combat."'},
{q:'Comparaison',a:'Rapprochement AVEC outil (comme, tel…). Ex : "Il est fort comme un lion."'},
{q:'Allégorie',a:'Idée abstraite représentée par image concrète. Ex : La Mort = squelette à la faux.'},
{q:'Personnification',a:'Prêter des caractères humains à un objet/animal. Ex : "La forêt murmure."'},
{q:'Métonymie',a:'Désigner par un élément lié. Ex : "Boire un verre" = son contenu.'},
{q:'Périphrase',a:'Remplacer un mot par une expression. Ex : "Le roi des animaux" = lion.'},
{q:'Anaphore',a:'Répétition en DÉBUT de phrase/vers. Effet d\'insistance.'},
{q:'Épiphore',a:'Répétition en FIN de phrase/vers.'},
{q:'Gradation',a:'Termes en progression croissante ou décroissante. Ex : "Un souffle, une ombre, un rien."'},
{q:'Hyperbole',a:'Exagération pour amplifier. Ex : "Je t\'ai dit mille fois de ranger ta chambre !"'},
{q:'Litote',a:'Dire moins pour suggérer plus. Ex : "Va, je ne te hais point." (Corneille) = je t\'aime.'},
{q:'Euphémisme',a:'Adoucir une réalité difficile. Ex : "Il nous a quittés" pour "il est mort".'},
{q:'Antithèse',a:'Opposition de deux contraires dans la même phrase.'},
{q:'Oxymore',a:'Deux mots contradictoires accolés. Ex : "Cette obscure clarté." (Corneille)'},
{q:'Antiphrase (ironie)',a:'Dire le contraire de ce qu\'on pense. Ex : "Bravo, encore raté !"'},
{q:'Allitération',a:'Répétition d\'une même consonne. Ex : "Pour qui sont ces serpents qui sifflent sur vos têtes ?"'},
{q:'Assonance',a:'Répétition d\'un même son vocalique dans plusieurs mots proches.'},
{q:'Chiasme',a:'Structure croisée A B / B A. Ex : "Il faut manger pour vivre, non vivre pour manger."'},
{q:'Apostrophe',a:'Interpellation directe. Ex : "Ô temps ! suspends ton vol." (Lamartine)'},
{q:'Question rhétorique',a:'Question qui n\'attend pas de réponse — interpelle le lecteur.'},
{q:'Accumulation / Énumération',a:'Liste de termes juxtaposés pour créer un effet d\'abondance.'},
{q:'Métaphore filée',a:'Métaphore développée sur plusieurs vers ou lignes du texte.'},
{q:'Parallélisme',a:'Même structure grammaticale répétée. Crée un effet de symétrie.'},
{q:'Onomatopée',a:'Mot qui imite un son réel. Ex : "boum", "plouf", "cocorico".'},
]},

'Mouvements littéraires': {
cours:`<h3>Les Grands Mouvements Littéraires</h3>
<h3>XVIe siècle</h3>
<ul><li><strong>Humanisme</strong> : l'homme au centre, valorise l'Antiquité et le savoir. Rabelais, Montaigne, Érasme.</li></ul>
<h3>XVIIe siècle</h3>
<ul>
<li><strong>Baroque</strong> (début) : instabilité, illusion, mort, exubérance stylistique.</li>
<li><strong>Classicisme</strong> (2e moitié) : raison, ordre, mesure, règle des 3 unités. Molière, Racine, Corneille, La Fontaine.</li>
</ul>
<h3>XVIIIe siècle</h3>
<ul><li><strong>Lumières</strong> : raison, progrès, liberté, tolérance. L'Encyclopédie. Voltaire, Rousseau, Montesquieu.</li></ul>
<h3>XIXe siècle</h3>
<ul>
<li><strong>Romantisme</strong> (1820-1850) : sentiment, mélancolie, nature, liberté créatrice. Hugo, Lamartine, Musset.</li>
<li><strong>Réalisme</strong> (1850-1880) : représentation objective de la société. Balzac, Flaubert, Stendhal.</li>
<li><strong>Naturalisme</strong> (1880-1900) : Réalisme + déterminisme (hérédité, milieu). Zola.</li>
<li><strong>Symbolisme</strong> (fin XIXe) : suggérer plutôt que décrire, musicalité. Baudelaire, Verlaine, Rimbaud.</li>
</ul>
<h3>XXe siècle</h3>
<ul>
<li><strong>Surréalisme</strong> (1924) : inconscient, écriture automatique, rêve. Breton, Éluard, Prévert.</li>
<li><strong>Existentialisme</strong> (après 1945) : l'existence précède l'essence. Sartre, Camus, Beauvoir.</li>
</ul>`,
flashcards:[
{q:'Humanisme (XVIe)',a:'L\'homme au centre. Valorise l\'Antiquité et le savoir. Auteurs : Rabelais, Montaigne, Érasme.'},
{q:'Classicisme (XVIIe)',a:'Raison, ordre, mesure. Règle des 3 unités. Auteurs : Molière, Racine, Corneille, La Fontaine.'},
{q:'3 unités (théâtre classique)',a:'Unité de temps (24h) + Unité de lieu (même endroit) + Unité d\'action (une seule intrigue).'},
{q:'Lumières (XVIIIe)',a:'Raison, progrès, liberté, tolérance. L\'Encyclopédie (Diderot). Voltaire, Rousseau, Montesquieu.'},
{q:'Romantisme (1820-1850)',a:'Sentiment, mélancolie, nature, liberté créatrice. Contre les règles classiques. Hugo, Lamartine, Musset.'},
{q:'Réalisme (1850-1880)',a:'Représenter la société objectivement. Observation, documentation. Balzac, Flaubert, Stendhal.'},
{q:'Naturalisme (1880-1900)',a:'Réalisme + déterminisme scientifique : hérédité et milieu conditionnent l\'homme. Zola.'},
{q:'Symbolisme (fin XIXe)',a:'Suggérer plutôt que décrire. Musicalité, symboles, synesthésies. Baudelaire, Verlaine, Rimbaud, Mallarmé.'},
{q:'Surréalisme (1924)',a:'Libérer l\'inconscient. Écriture automatique, rêve. Manifeste de Breton. Éluard, Prévert, Aragon.'},
{q:'Existentialisme (après 1945)',a:'"L\'existence précède l\'essence." Engagement littéraire. Sartre, Camus, Beauvoir.'},
{q:'Baroque (XVIIe)',a:'Instabilité, illusion, apparence trompeuse, goût des contrastes et de l\'exubérance stylistique.'},
{q:'Auteurs Lumières : qui fait quoi ?',a:'Voltaire → satire / tolérance. Rousseau → contrat social / nature. Montesquieu → séparation des pouvoirs (De l\'Esprit des lois).'},
]},

'Registres & méthode bac': {
cours:`<h3>Les Registres Littéraires</h3>
<ul>
<li><strong>Comique</strong> : fait rire (situation, mots, caractère, mœurs)</li>
<li><strong>Tragique</strong> : destin inéluctable, terreur et pitié</li>
<li><strong>Pathétique</strong> : suscite la compassion (souffrance, malheur)</li>
<li><strong>Épique</strong> : grandeur héroïque, aventures, hyperboles</li>
<li><strong>Lyrique</strong> : expression des sentiments personnels (amour, mélancolie)</li>
<li><strong>Satirique</strong> : critiquer en se moquant (ironie)</li>
<li><strong>Fantastique</strong> : hésitation entre naturel et surnaturel</li>
<li><strong>Didactique</strong> : transmettre un savoir</li>
<li><strong>Polémique</strong> : attaquer vivement une idée ou personne</li>
</ul>
<h3>Méthode : Le Commentaire Composé</h3>
<ol>
<li><strong>Introduction</strong> : contexte → problématique → plan annoncé</li>
<li><strong>Développement</strong> : 2-3 axes, chacun avec arguments + citations analysées (méthode AEI)</li>
<li><strong>Conclusion</strong> : bilan + réponse à la problématique + ouverture</li>
</ol>
<h3>Méthode AEI</h3>
<ul>
<li><strong>A</strong> — Affirmer l'idée (thèse)</li>
<li><strong>E</strong> — Expliquer : procédés stylistiques précis</li>
<li><strong>I</strong> — Illustrer : citation entre guillemets + analyse</li>
</ul>
<h3>Oral de Français (épreuve anticipée)</h3>
<ul>
<li>Explication linéaire d'un extrait (20 min de préparation)</li>
<li>Question de grammaire sur le texte</li>
<li>Présentation d'une œuvre de ta liste de lecture</li>
</ul>
<p><strong>⚠️ PARAPHRASE à éviter</strong> : raconter le texte ≠ analyser. Il faut toujours dire COMMENT l'auteur dit les choses.</p>`,
flashcards:[
{q:'Registre tragique',a:'Personnage face à un destin inéluctable. Suscite terreur et pitié (catharsis). Issu de la tragédie grecque.'},
{q:'Registre comique — 4 types',a:'Comique de situation, de mots (jeux de mots), de caractère, de mœurs (critique sociale).'},
{q:'Registre lyrique',a:'Expression des sentiments personnels (amour, mélancolie). Subjectivité, 1re personne.'},
{q:'Registre épique',a:'Grandeur héroïque, aventures, batailles. Hyperboles, souffle du récit.'},
{q:'Registre pathétique',a:'Suscite la compassion et la pitié. Représente la souffrance et le malheur.'},
{q:'Registre satirique',a:'Critiquer en se moquant. Ironie, dérision. Ex : Voltaire, Molière.'},
{q:'Registre fantastique',a:'Intrusion du surnaturel dans le réel. Hésitation entre explication naturelle et surnaturelle.'},
{q:'Registre didactique',a:'Vise à transmettre un savoir, à instruire. Présent dans les fables, essais.'},
{q:'Structure commentaire composé',a:'Introduction (contexte + pb + plan) → Développement (2-3 axes) → Conclusion (bilan + ouverture).'},
{q:'Méthode AEI',a:'A = Affirmer l\'idée. E = Expliquer les procédés. I = Illustrer avec citation analysée.'},
{q:'Qu\'est-ce que la paraphrase (à éviter) ?',a:'Raconter le texte sans l\'analyser. Il faut analyser COMMENT l\'auteur dit les choses.'},
{q:'Oral bac français : étapes',a:'1. Explication linéaire (20 min prépa). 2. Question de grammaire. 3. Présentation d\'œuvre choisie.'},
]},
},

// ────────────────────────────────────────────────────────────
// MATHS SPÉ
// ────────────────────────────────────────────────────────────
'Maths Spé': {

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
},

// ────────────────────────────────────────────────────────────
// SES
// ────────────────────────────────────────────────────────────
'SES': {

'Comportement électoral': {
cours:`<h3>Le Comportement Électoral</h3>
<h3>Mesurer la participation</h3>
<ul>
<li><strong>Taux d'inscription</strong> : inscrits / population en âge de voter</li>
<li><strong>Taux de participation</strong> : votants / inscrits</li>
<li><strong>Taux d'abstention</strong> : non-votants / inscrits</li>
</ul>
<h3>Deux types d'abstention</h3>
<ul>
<li><strong>Abstention dans le jeu</strong> : on suit la politique mais aucun candidat ne convient (protestation).</li>
<li><strong>Abstention hors jeu</strong> : sentiment d'exclusion, manque de compétence politique (désengagement).</li>
</ul>
<h3>Facteurs explicatifs du vote</h3>
<ul>
<li><strong>Intégration sociale</strong> : plus on est intégré, plus on vote (Durkheim).</li>
<li><strong>Compétence politique</strong> : sentiment d'avoir les connaissances pour juger la politique.</li>
<li><strong>Appartenance sociale</strong> : âge, diplôme, PCS, religion influencent le vote.</li>
<li><strong>Offre électorale</strong> : diversité des candidats et programmes.</li>
</ul>
<h3>Évolutions récentes</h3>
<ul>
<li><strong>Volatilité électorale</strong> : changement de comportement entre deux scrutins.</li>
<li><strong>Vote intermittent</strong> : voter à certaines élections, s'abstenir à d'autres.</li>
<li><strong>Affaiblissement de l'identification partisane</strong> : moins d'attachement durable à un parti.</li>
<li><strong>Clivage gauche-droite</strong> : s'atténue, remplacé par d'autres clivages (ouverture/fermeture).</li>
</ul>`,
flashcards:[
{q:'Taux de participation',a:'Pourcentage des inscrits qui ont voté lors d\'une élection.'},
{q:'Taux d\'abstention',a:'Pourcentage des inscrits n\'ayant pas voté.'},
{q:'Taux d\'inscription',a:'Part des personnes inscrites sur les listes parmi celles en âge de voter.'},
{q:'Abstention dans le jeu',a:'Ne pas voter par insatisfaction envers les candidats, tout en suivant la politique (protestation).'},
{q:'Abstention hors jeu',a:'Ne pas voter par sentiment d\'exclusion ou manque de compétence politique (désengagement).'},
{q:'Compétence politique',a:'Sentiment d\'avoir les connaissances nécessaires pour comprendre et juger la politique.'},
{q:'Degré d\'intégration sociale',a:'Force des liens reliant un individu à la société. Plus on est intégré, plus on vote.'},
{q:'Volatilité électorale',a:'Changement de comportement électoral d\'un individu entre deux scrutins.'},
{q:'Vote intermittent',a:'Fait de voter à certaines élections et s\'abstenir à d\'autres selon le contexte.'},
{q:'Identification partisane',a:'Attachement affectif et durable à un parti politique, souvent transmis en famille.'},
{q:'Offre électorale',a:'Ensemble des candidats, partis et programmes présents lors d\'une élection.'},
{q:'Clivage gauche-droite',a:'Différence de valeurs (économiques, sociales) entre deux camps politiques opposés.'},
{q:'PCS',a:'Professions et Catégories Socioprofessionnelles : classement des individus selon leur activité.'},
{q:'Appartenance sociale (vote)',a:'Caractéristiques d\'un individu (âge, diplôme, PCS, religion) qui influencent son comportement électoral.'},
]},

'Marché et prix': {
cours:`<h3>Le Marché et la Formation des Prix</h3>
<h3>Le marché</h3>
<p>Le <strong>marché</strong> est le lieu (réel ou virtuel) de rencontre entre l'offre et la demande, qui aboutit à la formation d'un prix.</p>
<ul>
<li><strong>Offre</strong> : quantité proposée à la vente par les producteurs.</li>
<li><strong>Demande</strong> : quantité souhaitée par les consommateurs.</li>
<li><strong>Prix d'équilibre</strong> : prix auquel offre = demande.</li>
</ul>
<h3>Loi de l'offre et de la demande</h3>
<ul>
<li>Quand le prix augmente → la demande diminue, l'offre augmente.</li>
<li>Quand le prix baisse → la demande augmente, l'offre diminue.</li>
</ul>
<h3>Structures de marché</h3>
<ul>
<li><strong>Concurrence pure et parfaite (CPP)</strong> : atomicité, homogénéité, libre entrée, transparence, mobilité.</li>
<li><strong>Monopole</strong> : un seul vendeur fixe le prix.</li>
<li><strong>Oligopole</strong> : quelques vendeurs (ex : téléphonie mobile).</li>
</ul>
<h3>Défaillances de marché</h3>
<ul>
<li><strong>Externalités</strong> : effets positifs ou négatifs sur des tiers non intégrés au marché. Ex : pollution (négative), innovation (positive).</li>
<li><strong>Asymétrie d'information</strong> : un agent est mieux informé que l'autre.</li>
<li><strong>Biens collectifs</strong> : non-rivaux et non-excluables (ex : éclairage public).</li>
</ul>`,
flashcards:[
{q:'Marché',a:'Lieu de rencontre entre offre et demande où se forme un prix d\'équilibre.'},
{q:'Prix d\'équilibre',a:'Prix auquel la quantité offerte est égale à la quantité demandée.'},
{q:'Loi de la demande',a:'Quand le prix augmente, la demande diminue (relation inverse).'},
{q:'Loi de l\'offre',a:'Quand le prix augmente, l\'offre augmente (relation positive).'},
{q:'Concurrence pure et parfaite — 5 conditions',a:'Atomicité + Homogénéité + Libre entrée/sortie + Transparence de l\'information + Mobilité des facteurs.'},
{q:'Monopole',a:'Structure de marché où un seul vendeur fait face à de nombreux acheteurs et fixe le prix.'},
{q:'Oligopole',a:'Structure de marché avec quelques vendeurs. Ex : téléphonie mobile en France.'},
{q:'Externalité négative',a:'Effet nocif d\'une activité économique sur des tiers non compensé par le marché. Ex : pollution.'},
{q:'Externalité positive',a:'Effet bénéfique d\'une activité sur des tiers sans contrepartie. Ex : vaccination, innovation.'},
{q:'Asymétrie d\'information',a:'Situation où un acteur économique dispose de plus d\'informations que son partenaire.'},
{q:'Bien collectif (public)',a:'Bien non-rival (la consommation par l\'un ne réduit pas celle des autres) et non-excluable. Ex : éclairage public.'},
]},

'Socialisation': {
cours:`<h3>La Socialisation</h3>
<p>La <strong>socialisation</strong> est le processus par lequel l'individu intériorise les normes et valeurs de la société pour s'y intégrer.</p>
<h3>Types de socialisation</h3>
<ul>
<li><strong>Socialisation primaire</strong> : enfance, dans la famille. Formation du premier "moi" social.</li>
<li><strong>Socialisation secondaire</strong> : tout au long de la vie (école, travail, groupe de pairs, médias).</li>
</ul>
<h3>Agents de socialisation</h3>
<ul>
<li><strong>Famille</strong> : premier et principal agent. Transmission des normes, valeurs, pratiques culturelles.</li>
<li><strong>École</strong> : transmission du savoir, mais aussi de normes civiques.</li>
<li><strong>Groupe de pairs</strong> : adolescence → influence forte (mode, langage, loisirs).</li>
<li><strong>Médias</strong> : modèles culturels, représentations sociales.</li>
</ul>
<h3>Normes et valeurs</h3>
<ul>
<li><strong>Norme</strong> : règle de comportement (explicite ou implicite) attendue dans un groupe.</li>
<li><strong>Valeur</strong> : principe abstrait partagé qui guide les comportements (ex : liberté, travail, famille).</li>
</ul>
<h3>Identité sociale</h3>
<p>Construction de l'identité par l'individu à travers ses appartenances (groupes, statuts, rôles sociaux).</p>
<p><strong>Rôle social</strong> : comportements attendus d'une personne selon son statut.<br>
<strong>Statut</strong> : position occupée dans la société (attribué ou acquis).</p>`,
flashcards:[
{q:'Socialisation',a:'Processus par lequel l\'individu intériorise les normes et valeurs de la société pour s\'y intégrer.'},
{q:'Socialisation primaire',a:'Socialisation dans l\'enfance, principalement au sein de la famille. Formation du premier "moi" social.'},
{q:'Socialisation secondaire',a:'Socialisation tout au long de la vie (école, travail, pairs, médias).'},
{q:'Norme sociale',a:'Règle de comportement attendue dans un groupe (peut être explicite ou implicite).'},
{q:'Valeur sociale',a:'Principe abstrait partagé qui guide les comportements. Ex : liberté, égalité, travail.'},
{q:'Agents de socialisation',a:'Famille (principal) + École + Groupe de pairs + Médias.'},
{q:'Rôle social',a:'Comportements attendus d\'un individu selon le statut qu\'il occupe.'},
{q:'Statut social',a:'Position occupée dans la structure sociale. Peut être attribué (hérité) ou acquis (mérité).'},
{q:'Socialisation différentielle',a:'La socialisation varie selon le genre, la classe sociale, l\'origine culturelle, etc.'},
{q:'Contrôle social',a:'Ensemble des mécanismes permettant de faire respecter les normes (formel ou informel).'},
]},

'Inégalités sociales': {
cours:`<h3>Les Inégalités Sociales</h3>
<h3>Définitions</h3>
<ul>
<li><strong>Inégalité économique</strong> : différence de revenus ou de patrimoine.</li>
<li><strong>Inégalité sociale</strong> : différence d'accès aux ressources (emploi, logement, éducation, santé).</li>
</ul>
<h3>Mesurer les inégalités</h3>
<ul>
<li><strong>Rapport interdécile D9/D1</strong> : revenu du 9e décile / revenu du 1er décile.</li>
<li><strong>Coefficient de Gini</strong> : 0 = égalité parfaite ; 1 = inégalité totale.</li>
<li><strong>Courbe de Lorenz</strong> : représentation graphique des inégalités de revenus.</li>
</ul>
<h3>Types d'inégalités</h3>
<ul>
<li><strong>Cumulatives</strong> : les inégalités se renforcent entre elles.</li>
<li><strong>De genre</strong> : inégalités entre hommes et femmes (salaires, carrières).</li>
<li><strong>Scolaires</strong> : reproduction sociale via l'école (Bourdieu).</li>
</ul>
<h3>Capital selon Bourdieu</h3>
<ul>
<li><strong>Capital économique</strong> : revenus, patrimoine.</li>
<li><strong>Capital culturel</strong> : diplômes, savoirs, pratiques culturelles.</li>
<li><strong>Capital social</strong> : réseau de relations.</li>
</ul>`,
flashcards:[
{q:'Inégalité économique',a:'Différence de revenus ou de patrimoine entre individus ou groupes.'},
{q:'Rapport interdécile D9/D1',a:'Revenu du 9e décile divisé par le revenu du 1er décile. Mesure l\'écart entre riches et pauvres.'},
{q:'Coefficient de Gini',a:'Indicateur entre 0 (égalité parfaite) et 1 (inégalité totale). Mesure la dispersion des revenus.'},
{q:'Capital économique (Bourdieu)',a:'Revenus et patrimoine matériel d\'un individu.'},
{q:'Capital culturel (Bourdieu)',a:'Diplômes, savoirs, pratiques culturelles. Peut être institutionnalisé (diplôme), objectivé (livres) ou incorporé (habitus).'},
{q:'Capital social (Bourdieu)',a:'Réseau de relations qu\'un individu peut mobiliser.'},
{q:'Reproduction sociale (Bourdieu)',a:'L\'école reproduit les inégalités sociales en favorisant les enfants dotés de capital culturel.'},
{q:'Habitus (Bourdieu)',a:'Ensemble de dispositions durables acquises par socialisation qui orientent les pratiques et représentations.'},
{q:'Inégalités cumulatives',a:'Les inégalités dans un domaine (revenus) se renforcent avec celles dans d\'autres (logement, santé).'},
]},
},

// ────────────────────────────────────────────────────────────
// ANGLAIS SPÉ
// ────────────────────────────────────────────────────────────
'Anglais Spé': {

'Grammaire essentielle': {
cours:`<h3>Grammaire Essentielle — Anglais Spé</h3>
<h3>Les Temps</h3>
<ul>
<li><strong>Simple present</strong> : habitude, vérité générale. <em>"She works every day."</em></li>
<li><strong>Present continuous</strong> : action en cours. <em>"She is working now."</em></li>
<li><strong>Simple past</strong> : action terminée dans le passé. <em>"They arrived yesterday."</em></li>
<li><strong>Past continuous</strong> : action en cours dans le passé. <em>"It was raining when I arrived."</em></li>
<li><strong>Present perfect</strong> : lien passé–présent (have + V3). <em>"I have never been to Japan."</em></li>
<li><strong>Past perfect</strong> : antériorité dans le passé (had + V3). <em>"She had left before I arrived."</em></li>
<li><strong>Future simple</strong> : will + V1. Décision spontanée, prédiction. <em>"It will rain."</em></li>
<li><strong>Be going to</strong> : intention planifiée. <em>"I'm going to study tonight."</em></li>
</ul>
<h3>Les Modaux</h3>
<ul>
<li><strong>Can / could</strong> : capacité, possibilité</li>
<li><strong>Must / have to</strong> : obligation (must = interne ; have to = externe)</li>
<li><strong>Should / ought to</strong> : conseil, recommandation</li>
<li><strong>May / might</strong> : probabilité, permission</li>
<li><strong>Would</strong> : conditionnel, politesse</li>
</ul>
<h3>Voix passive</h3>
<div class="formula-box">Subject + be (conjugué) + past participle (+ by...)<br>Ex : "The law was passed by Parliament in 2020."</div>
<h3>Discours indirect</h3>
<div class="formula-box">She said (that) she WAS working. (recul d\'un temps)<br>She asked WHERE he LIVED.<br>She asked him TO come.</div>`,
flashcards:[
{q:'Simple present — usage',a:'Habitude, fait général, vérité. Ex : "She works every day." / "Water boils at 100°C."'},
{q:'Present continuous — usage',a:'Action en cours au moment où on parle. Ex : "She is working now."'},
{q:'Present perfect — usage',a:'Lien entre passé et présent. Expérience, résultat. Ex : "I have never been to Japan." (have/has + V3)'},
{q:'Simple past — usage',a:'Action terminée, moment précis dans le passé. Ex : "They arrived yesterday."'},
{q:'Past perfect — usage',a:'Action antérieure à une autre action passée. Ex : "She had left before I arrived." (had + V3)'},
{q:'Will + V1 — usage',a:'Décision spontanée, prédiction, promesse. Ex : "It will rain." / "I\'ll help you."'},
{q:'Be going to — usage',a:'Intention planifiée ou prédiction basée sur une preuve. Ex : "I\'m going to study tonight."'},
{q:'Must vs have to',a:'Must = obligation interne (je me l\'impose). Have to = obligation externe (règle imposée).'},
{q:'Should / ought to',a:'Conseil, recommandation. Ex : "You should see a doctor." (moins fort que must)'},
{q:'May / might',a:'Probabilité ou permission. Might = moins probable que may. Ex : "It might rain."'},
{q:'Voix passive — structure',a:'Subject + be (conjugué) + past participle + (by agent). Ex : "The law was passed by Parliament."'},
{q:'Discours indirect — recul temporel',a:'Present → past. Ex : "I am tired" → She said she WAS tired.'},
{q:'Conditionnel 1 (real condition)',a:'If + present simple, will + V1. Ex : "If it rains, I will stay home."'},
{q:'Conditionnel 2 (unreal present)',a:'If + past simple, would + V1. Ex : "If I were rich, I would travel."'},
{q:'Conditionnel 3 (past unreal)',a:'If + past perfect, would have + V3. Ex : "If I had studied, I would have passed."'},
]},

'Vocabulaire thématique': {
cours:`<h3>Vocabulaire Thématique — Anglais Spé</h3>
<h3>Thème 1 : Society & Inequalities</h3>
<ul>
<li>inequality / gap / divide / disparity</li>
<li>poverty / wealth / affluence</li>
<li>discrimination / prejudice / bias</li>
<li>social mobility / meritocracy</li>
<li>welfare state / safety net</li>
<li>to empower / empowerment</li>
</ul>
<h3>Thème 2 : Politics & Democracy</h3>
<ul>
<li>democracy / dictatorship / authoritarianism</li>
<li>election / ballot / vote / turnout</li>
<li>government / parliament / senate / congress</li>
<li>policy / legislation / bill / act</li>
<li>lobbying / pressure group / civil society</li>
<li>freedom of speech / censorship</li>
</ul>
<h3>Thème 3 : Environment</h3>
<ul>
<li>climate change / global warming</li>
<li>carbon footprint / greenhouse gas emissions</li>
<li>renewable energy / fossil fuels</li>
<li>deforestation / biodiversity / habitat loss</li>
<li>sustainable development</li>
</ul>
<h3>Thème 4 : Technology & Media</h3>
<ul>
<li>artificial intelligence / algorithm / data</li>
<li>social media / fake news / disinformation</li>
<li>privacy / surveillance / hacking</li>
<li>digital divide</li>
</ul>`,
flashcards:[
{q:'inequality',a:'Inégalité. Ex : "social inequality" = inégalité sociale.'},
{q:'empowerment',a:'Autonomisation, renforcement du pouvoir des individus/groupes marginalisés.'},
{q:'welfare state',a:'État-providence : système de protection sociale assuré par l\'État.'},
{q:'social mobility',a:'Mobilité sociale : capacité à changer de classe sociale.'},
{q:'meritocracy',a:'Méritocratie : système où la réussite est basée sur le mérite individuel.'},
{q:'turnout',a:'Taux de participation électorale. Ex : "Voter turnout was low."'},
{q:'lobbying',a:'Pression exercée sur les décideurs politiques par des groupes d\'intérêt.'},
{q:'bill (UK/US politics)',a:'Projet de loi (avant d\'être adopté). Une fois adopté = "act" ou "law".'},
{q:'carbon footprint',a:'Empreinte carbone : quantité de CO₂ émise par une activité.'},
{q:'renewable energy',a:'Énergie renouvelable : solaire, éolien, hydraulique...'},
{q:'sustainable development',a:'Développement durable : répondre aux besoins présents sans compromettre les générations futures.'},
{q:'disinformation',a:'Diffusion délibérée de fausses informations. Différent de misinformation (involontaire).'},
{q:'digital divide',a:'Fracture numérique : inégalité d\'accès aux technologies numériques.'},
{q:'privacy',a:'Vie privée, confidentialité des données personnelles.'},
{q:'censorship',a:'Censure : suppression ou restriction de la liberté d\'expression par une autorité.'},
{q:'discrimination',a:'Traitement inégal basé sur des critères injustes (race, genre, religion...).'},
{q:'prejudice',a:'Préjugé : jugement négatif a priori sur un groupe.'},
{q:'artificial intelligence (AI)',a:'Intelligence artificielle : systèmes capables d\'effectuer des tâches nécessitant normalement l\'intelligence humaine.'},
{q:'fossil fuels',a:'Combustibles fossiles : charbon, pétrole, gaz naturel.'},
{q:'to empower',a:'Donner du pouvoir/capacité à quelqu\'un. Ex : "Education empowers women."'},
]},

'Notions bac & oral': {
cours:`<h3>Préparer l'Oral d'Anglais Spé</h3>
<h3>Structure d'un exposé en anglais</h3>
<ol>
<li><strong>Introduction</strong> : hook + present the topic + state your thesis</li>
<li><strong>Body</strong> : 2-3 points, each with evidence and examples</li>
<li><strong>Conclusion</strong> : summarize + give your opinion + open question</li>
</ol>
<h3>Phrases utiles — Opinion</h3>
<ul>
<li>In my opinion / From my point of view / As far as I'm concerned…</li>
<li>It seems to me that… / I strongly believe that…</li>
<li>I would argue that… / One might say that…</li>
</ul>
<h3>Connecteurs logiques</h3>
<ul>
<li><strong>Addition</strong> : furthermore, moreover, in addition, besides</li>
<li><strong>Opposition</strong> : however, nevertheless, on the other hand, yet</li>
<li><strong>Cause</strong> : because, since, as, due to, owing to</li>
<li><strong>Conséquence</strong> : therefore, thus, hence, as a result, consequently</li>
<li><strong>Exemple</strong> : for instance, for example, such as, namely</li>
</ul>
<h3>Notions Anglais Monde Contemporain</h3>
<ul>
<li>Identities and exchanges</li>
<li>Private and public spaces</li>
<li>Art and power</li>
<li>Citizenship and virtual worlds</li>
<li>The idea of progress</li>
</ul>`,
flashcards:[
{q:'Furthermore',a:'De plus, en outre (addition). Ex : "Furthermore, the data shows…"'},
{q:'However',a:'Cependant, néanmoins (opposition). Ex : "However, this approach has limits."'},
{q:'Nevertheless',a:'Néanmoins, malgré tout (opposition plus forte).'},
{q:'Therefore',a:'Par conséquent, donc (conséquence logique).'},
{q:'Moreover',a:'De plus, qui plus est (addition, renforcement).'},
{q:'On the other hand',a:'D\'un autre côté (opposition, nuance).'},
{q:'As a result',a:'Par conséquent, en conséquence.'},
{q:'For instance / For example',a:'Par exemple.'},
{q:'Owing to / Due to',a:'En raison de (cause). Ex : "Due to climate change, sea levels are rising."'},
{q:'Consequently',a:'Par conséquent. Synonyme de "therefore" mais plus formel.'},
{q:'In addition',a:'En plus, de plus (addition simple).'},
{q:'Yet',a:'Pourtant (opposition). Plus littéraire que "but". Ex : "It is dangerous, yet fascinating."'},
]},
},

// ────────────────────────────────────────────────────────────
// HISTOIRE-GÉO
// ────────────────────────────────────────────────────────────
'Histoire-Géo': {

'Grandes dates à connaître': {
cours:`<h3>Chronologie Essentielle — Histoire Première</h3>
<h3>XIXe siècle</h3>
<ul>
<li><strong>1789</strong> : Révolution française — DDHC</li>
<li><strong>1804</strong> : Sacre de Napoléon Ier, Code civil</li>
<li><strong>1815</strong> : Défaite de Napoléon à Waterloo, Restauration</li>
<li><strong>1848</strong> : Révolutions en Europe, Abolition de l'esclavage (France), IIe République</li>
<li><strong>1870-71</strong> : Guerre franco-prussienne, Commune de Paris, IIIe République</li>
</ul>
<h3>Première Guerre mondiale</h3>
<ul>
<li><strong>28 juillet 1914</strong> : Déclaration de guerre (déclenchement)</li>
<li><strong>1916</strong> : Batailles de Verdun et de la Somme</li>
<li><strong>1917</strong> : Entrée en guerre des États-Unis + Révolution russe (Octobre)</li>
<li><strong>11 novembre 1918</strong> : Armistice — fin de la 1re Guerre mondiale</li>
<li><strong>1919</strong> : Traité de Versailles</li>
</ul>
<h3>Entre-deux-guerres</h3>
<ul>
<li><strong>1922</strong> : Mussolini au pouvoir (fascisme en Italie)</li>
<li><strong>1929</strong> : Krach boursier (crise économique mondiale)</li>
<li><strong>1933</strong> : Hitler chancelier en Allemagne</li>
<li><strong>1936</strong> : Front populaire en France (Blum)</li>
</ul>
<h3>Seconde Guerre mondiale</h3>
<ul>
<li><strong>1er septembre 1939</strong> : Invasion de la Pologne par l'Allemagne</li>
<li><strong>18 juin 1940</strong> : Appel du Général de Gaulle (BBC)</li>
<li><strong>juillet 1940</strong> : Régime de Vichy (Pétain)</li>
<li><strong>6 juin 1944</strong> : Débarquement en Normandie (D-Day)</li>
<li><strong>8 mai 1945</strong> : Capitulation de l'Allemagne — fin en Europe</li>
<li><strong>6-9 août 1945</strong> : Bombes atomiques sur Hiroshima et Nagasaki</li>
<li><strong>2 septembre 1945</strong> : Capitulation du Japon — fin de la 2e G.M.</li>
</ul>
<h3>Guerre froide & décolonisation</h3>
<ul>
<li><strong>1947</strong> : Début de la Guerre froide (doctrine Truman)</li>
<li><strong>1954</strong> : Défaite de Dien Bien Phu, début guerre d'Algérie</li>
<li><strong>1962</strong> : Indépendance de l'Algérie (Accords d'Évian)</li>
<li><strong>1989</strong> : Chute du mur de Berlin</li>
<li><strong>1991</strong> : Dissolution de l'URSS</li>
</ul>`,
flashcards:[
{q:'1789',a:'Révolution française — Déclaration des Droits de l\'Homme et du Citoyen (DDHC).'},
{q:'1804',a:'Sacre de Napoléon Ier Empereur + promulgation du Code civil.'},
{q:'11 novembre 1918',a:'Armistice — fin de la Première Guerre mondiale.'},
{q:'1919',a:'Traité de Versailles : règlement de paix après la 1re G.M. Culpabilise l\'Allemagne.'},
{q:'1929',a:'Krach boursier (jeudi noir, Wall Street) → Grande Dépression mondiale.'},
{q:'1933',a:'Hitler nommé chancelier d\'Allemagne → début du régime nazi.'},
{q:'1er septembre 1939',a:'Invasion de la Pologne par l\'Allemagne → déclenchement de la 2e G.M.'},
{q:'18 juin 1940',a:'Appel du Général de Gaulle à la BBC depuis Londres → début de la Résistance.'},
{q:'Régime de Vichy',a:'Gouvernement de Pétain (juillet 1940) qui collabore avec l\'Allemagne nazie.'},
{q:'6 juin 1944',a:'Débarquement en Normandie (D-Day) — ouverture du front Ouest.'},
{q:'8 mai 1945',a:'Capitulation de l\'Allemagne — fin de la guerre en Europe.'},
{q:'6 août 1945',a:'Bombe atomique sur Hiroshima. 9 août → Nagasaki. 2 sept → capitulation Japon.'},
{q:'1947',a:'Début officiel de la Guerre froide (doctrine Truman, plan Marshall).'},
{q:'1962',a:'Accords d\'Évian → Indépendance de l\'Algérie.'},
{q:'9 novembre 1989',a:'Chute du mur de Berlin → symbole de la fin de la Guerre froide.'},
{q:'1991',a:'Dissolution de l\'URSS → fin de la Guerre froide.'},
{q:'1848',a:'Vague de révolutions en Europe. En France : abolition de l\'esclavage, IIe République, suffrage universel masculin.'},
{q:'1870-1871',a:'Guerre franco-prussienne → défaite, perte de l\'Alsace-Lorraine, Commune de Paris, IIIe République.'},
{q:'1916',a:'Batailles de Verdun et de la Somme — symboles de la guerre d\'usure de la 1re G.M.'},
{q:'1917',a:'Entrée en guerre des États-Unis + double révolution russe (Février & Octobre/Bolcheviks).'},
]},

'Notions clés': {
cours:`<h3>Notions Essentielles — Histoire-Géo Première</h3>
<h3>Régimes politiques</h3>
<ul>
<li><strong>Démocratie libérale</strong> : séparation des pouvoirs, droits fondamentaux, élections libres.</li>
<li><strong>Totalitarisme</strong> : contrôle total de l'État sur la société (nazisme, stalinisme, fascisme).</li>
<li><strong>Autoritarisme</strong> : pouvoir concentré, opposants réprimés, mais contrôle social moins total.</li>
</ul>
<h3>Première Guerre mondiale</h3>
<ul>
<li><strong>Guerre de position / tranchées</strong> : enlisement du conflit, conditions inhumaines.</li>
<li><strong>Union sacrée</strong> : union de tous les partis politiques français en 1914 pour l'effort de guerre.</li>
<li><strong>Génocide arménien</strong> : 1915-1916, premier génocide du XXe siècle (Empire ottoman).</li>
</ul>
<h3>Seconde Guerre mondiale</h3>
<ul>
<li><strong>Blitzkrieg</strong> : "guerre éclair" allemande — offensive rapide, blindés et aviation.</li>
<li><strong>Résistance</strong> : mouvements clandestins contre l'occupation nazie.</li>
<li><strong>Shoah / Holocauste</strong> : génocide des Juifs par les nazis (≈ 6 millions de victimes).</li>
<li><strong>Collaboration</strong> : coopération avec l'occupant nazi (Vichy).</li>
</ul>
<h3>Guerre froide</h3>
<ul>
<li><strong>Bipolarisation</strong> : monde divisé en deux blocs (USA/OTAN vs URSS/Pacte de Varsovie).</li>
<li><strong>Dissuasion nucléaire</strong> : la menace de destruction mutuelle empêche la guerre directe.</li>
<li><strong>Décolonisation</strong> : processus d'indépendance des colonies après 1945.</li>
</ul>`,
flashcards:[
{q:'Totalitarisme',a:'Régime politique où l\'État contrôle totalement la société, l\'économie, la culture et la vie privée. Ex : nazisme, stalinisme.'},
{q:'Union sacrée (1914)',a:'Union de tous les partis politiques français autour du gouvernement pour mener la guerre. Suspends les conflits politiques.'},
{q:'Génocide arménien',a:'1915-1916 : extermination des Arméniens par l\'Empire ottoman. Premier génocide du XXe siècle (≈ 1,5 million de victimes).'},
{q:'Blitzkrieg',a:'"Guerre éclair" : stratégie allemande d\'offensive rapide combinant chars, aviation et infanterie.'},
{q:'Shoah / Holocauste',a:'Génocide des Juifs d\'Europe par les nazis : environ 6 millions de victimes (1941-1945).'},
{q:'Collaboration (2e G.M.)',a:'Coopération active avec l\'occupant nazi allemand. En France : régime de Vichy (Pétain).'},
{q:'Résistance (2e G.M.)',a:'Ensemble des mouvements clandestins qui s\'opposaient à l\'occupation nazie. En France : CNR (de Gaulle).'},
{q:'Guerre froide',a:'Affrontement indirect (1947-1991) entre les États-Unis et l\'URSS, sans conflit militaire direct entre eux.'},
{q:'Bipolarisation',a:'Division du monde en deux blocs pendant la Guerre froide : bloc occidental (USA-OTAN) et bloc soviétique (URSS-Pacte de Varsovie).'},
{q:'Dissuasion nucléaire',a:'La possession d\'armes nucléaires par les deux superpuissances empêche toute guerre directe (destruction mutuelle assurée).'},
{q:'Décolonisation',a:'Processus d\'accession à l\'indépendance des territoires colonisés, principalement après 1945.'},
{q:'Plan Marshall (1947)',a:'Aide économique américaine à l\'Europe occidentale pour reconstruire et résister au communisme.'},
{q:'Traité de Versailles (1919)',a:'Traité de paix après la 1re G.M. Responsabilise l\'Allemagne, lui impose des réparations. Germe de la montée du nazisme.'},
]},
},

}; // fin PREBUILT

// Nouvelles matières
PREBUILT['Anglais'] = {
  'Advanced Grammar Structures': {
    cours: `<h2>Advanced Grammar Structures</h2>
<h3>Inversion (Emphase)</h3>
<p>Used after negative adverbials for emphasis — essential for advanced writing and oral.</p>
<div class="formula-box"><strong>Never have I seen</strong> such determination.<br><strong>Not only did</strong> she succeed, but she excelled.<br><strong>Hardly had</strong> he arrived when it started raining.<br><strong>No sooner had</strong> they left than the storm broke.</div>
<h3>Cleft Sentences (Mise en relief)</h3>
<div class="formula-box"><strong>It is/was + X + that/who…</strong><br>It was <em>the government</em> that introduced the policy.<br><strong>What + clause + is/was…</strong><br>What we need is more funding.</div>
<h3>Conditional — Toutes les formes</h3>
<div class="formula-box">Type 0 (vérité générale) : If + present, present<br>Type 1 (réel futur) : If + present, will + inf<br>Type 2 (irréel présent) : If + past, would + inf<br>Type 3 (irréel passé) : If + past perfect, would have + pp<br>Mixed : If + past perfect, would + inf (passé → présent)</div>
<h3>Modal Verbs — Nuances</h3>
<div class="formula-box">Certitude (présent) : must / can't<br>Certitude (passé) : must have + pp / can't have + pp<br>Probabilité : should have + pp (aurait dû)<br>Possibilité : might / could + have + pp</div>`,
    flashcards: [
      {q:"Inversion — Never have I…",a:"Inversion after negative adverbials for emphasis. Structure: Aux + Subject + Verb. Ex: Never have I witnessed such courage.",score:0,interval:0,ease:2.5,due:null},
      {q:"Not only… but also",a:"Emphatic structure with inversion: 'Not only did he fail the exam, but he also lost his scholarship.'",score:0,interval:0,ease:2.5,due:null},
      {q:"Cleft sentence — It is… that",a:"Emphasises a specific element. Ex: 'It is poverty that drives crime' (not 'Poverty drives crime').",score:0,interval:0,ease:2.5,due:null},
      {q:"Conditional Type 3 — structure",a:"If + past perfect, would have + past participle. Irréel du passé. Ex: If she had studied, she would have passed.",score:0,interval:0,ease:2.5,due:null},
      {q:"Mixed conditional",a:"If + past perfect (condition passée), would + infinitive (conséquence présente). Ex: If I had taken that job, I would be rich now.",score:0,interval:0,ease:2.5,due:null},
      {q:"Must have + pp",a:"Certitude logique dans le passé. Ex: He must have left already — the lights are off.",score:0,interval:0,ease:2.5,due:null},
      {q:"Should have + pp",a:"Regret ou reproche sur le passé. Ex: You should have told me sooner.",score:0,interval:0,ease:2.5,due:null},
    ]
  },
  'Linkers & Connectors (Bac)': {
    cours: `<h2>Linkers &amp; Logical Connectors</h2>
<p>Indispensables pour la synthèse de documents, la lettre formelle et l'expression écrite.</p>
<h3>Addition</h3>
<div class="formula-box">Furthermore / Moreover / In addition / Besides / What is more / Not only… but also</div>
<h3>Opposition / Concession</h3>
<div class="formula-box">However / Nevertheless / Nonetheless / Yet / Although / Even though / Despite / In spite of / Whereas / While / On the other hand</div>
<h3>Cause / Conséquence</h3>
<div class="formula-box">Because / Since / As / Due to / Owing to / As a result / Therefore / Consequently / Hence / Thus / This leads to</div>
<h3>Illustration / Exemple</h3>
<div class="formula-box">For instance / For example / Such as / Namely / In particular / This is illustrated by / A case in point is</div>
<h3>Conclusion / Synthèse</h3>
<div class="formula-box">To conclude / In conclusion / To sum up / All in all / On balance / Ultimately / In the final analysis / It can be argued that</div>`,
    flashcards: [
      {q:"However vs Nevertheless",a:"Both mean 'cependant'. However = plus courant. Nevertheless = plus soutenu, souvent en début de paragraphe pour marquer un retournement fort.",score:0,interval:0,ease:2.5,due:null},
      {q:"Although vs Despite",a:"Although + clause (sujet+verbe). Despite / In spite of + noun/gerund. Ex: Although it was raining / Despite the rain.",score:0,interval:0,ease:2.5,due:null},
      {q:"Therefore vs Thus vs Hence",a:"Tous = 'donc / par conséquent'. Therefore = plus explicatif. Thus = formel. Hence = très soutenu, souvent suivi d\'un nom.",score:0,interval:0,ease:2.5,due:null},
      {q:"Furthermore vs Moreover",a:"Tous deux = 'de plus'. Furthermore ajoute un argument qui renforce. Moreover ajoute un argument encore plus important.",score:0,interval:0,ease:2.5,due:null},
      {q:"Whereas vs While",a:"Tous deux expriment l\'opposition dans la même phrase. Whereas = contraste fort. While = peut aussi exprimer la simultanéité.",score:0,interval:0,ease:2.5,due:null},
      {q:"To conclude vs On balance",a:"To conclude / In conclusion = formule de clôture. On balance = après avoir pesé le pour et le contre (nuance).",score:0,interval:0,ease:2.5,due:null},
      {q:"Due to vs Because of vs Owing to",a:"Tous = 'en raison de' + nom. Due to = plus formel. Owing to = très soutenu. Because of = plus courant.",score:0,interval:0,ease:2.5,due:null},
    ]
  },
  'Vocabulary & Expressions': {
    cours: "<h2>Key Vocabulary</h2><p>Essential words for the bac.</p><ul><li><b>To advocate</b> — défendre une cause</li><li><b>To tackle</b> — s'attaquer à</li><li><b>To foster</b> — encourager</li><li><b>Sustainable</b> — durable</li><li><b>Breakthrough</b> — percée majeure</li></ul><h3>Linking words</h3><ul><li><b>However</b> — cependant</li><li><b>Furthermore</b> — de plus</li><li><b>Although</b> — bien que</li></ul>",
    flashcards: [
      {q:"To advocate",a:"Défendre, soutenir une cause",score:0,interval:0,ease:2.5,due:null},
      {q:"To tackle",a:"S\'attaquer à, faire face à",score:0,interval:0,ease:2.5,due:null},
      {q:"To foster",a:"Encourager, favoriser",score:0,interval:0,ease:2.5,due:null},
      {q:"Sustainable",a:"Durable, viable. Ex: sustainable development",score:0,interval:0,ease:2.5,due:null},
      {q:"Breakthrough",a:"Percée, découverte majeure",score:0,interval:0,ease:2.5,due:null},
      {q:"To undermine",a:"Saper, affaiblir. Ex: to undermine democracy",score:0,interval:0,ease:2.5,due:null},
      {q:"Heritage",a:"Patrimoine, héritage culturel",score:0,interval:0,ease:2.5,due:null},
      {q:"Inequality",a:"Inégalité, injustice sociale",score:0,interval:0,ease:2.5,due:null},
    ]
  },
  'Grammar Essentials': {
    cours: "<h2>Grammar Essentials</h2><h3>Tenses</h3><ul><li><b>Present Perfect</b> : actions passées à effet présent — I have studied</li><li><b>Past Simple</b> : action terminée — I studied yesterday</li><li><b>Conditional</b> : If I were… I would…</li></ul><h3>Passive Voice</h3><p>Subject + be + past participle. Ex: The law was passed in 1990.</p>",
    flashcards: [
      {q:"Present Perfect — usage",a:"Action passée avec résultat présent. Marqueurs : just, already, yet, since, for",score:0,interval:0,ease:2.5,due:null},
      {q:"Passive voice — formule",a:"Subject + be (conjugated) + past participle. Ex: The book was written by her.",score:0,interval:0,ease:2.5,due:null},
      {q:"Reported speech",a:"On recule d\'un temps. 'I am tired' -> She said she WAS tired.",score:0,interval:0,ease:2.5,due:null},
    ]
  }
};

PREBUILT['Espagnol'] = {
  'Vocabulario esencial': {
    cours: "<h2>Vocabulario esencial</h2><h3>Expresar opinion</h3><ul><li><b>En mi opinion</b> — à mon avis</li><li><b>Sin embargo</b> — cependant</li><li><b>Por lo tanto</b> — par conséquent</li><li><b>A pesar de</b> — malgré</li></ul>",
    flashcards: [
      {q:"El medio ambiente",a:"L\'environnement",score:0,interval:0,ease:2.5,due:null},
      {q:"La desigualdad",a:"L\'inégalité",score:0,interval:0,ease:2.5,due:null},
      {q:"El desarrollo sostenible",a:"Le développement durable",score:0,interval:0,ease:2.5,due:null},
      {q:"La inmigracion",a:"L\'immigration",score:0,interval:0,ease:2.5,due:null},
      {q:"Sin embargo",a:"Cependant, néanmoins",score:0,interval:0,ease:2.5,due:null},
      {q:"Por lo tanto",a:"Par conséquent, donc",score:0,interval:0,ease:2.5,due:null},
      {q:"A pesar de",a:"Malgré, en dépit de",score:0,interval:0,ease:2.5,due:null},
      {q:"El patrimonio",a:"Le patrimoine",score:0,interval:0,ease:2.5,due:null},
    ]
  },
  'Gramatica': {
    cours: "<h2>Gramatica clave</h2><h3>Subjuntivo</h3><p>Apres : querer que, esperar que, es importante que. Ex: Quiero que tu <b>vengas</b>.</p><h3>Preterito Indefinido vs Imperfecto</h3><ul><li><b>Indefinido</b> : action ponctuelle terminee — ayer comi una paella</li><li><b>Imperfecto</b> : description/habitude — cuando era nino, jugaba al futbol</li></ul>",
    flashcards: [
      {q:"Subjuntivo — quand ?",a:"Apres : querer que, esperar que, es importante que, dudar que, expressions d\'emotion",score:0,interval:0,ease:2.5,due:null},
      {q:"Preterito Indefinido vs Imperfecto",a:"Indefinido = action ponctuelle terminee. Imperfecto = description ou habitude passee.",score:0,interval:0,ease:2.5,due:null},
      {q:"Ser vs Estar",a:"Ser = caracteristique permanente (identite, origine). Estar = etat temporaire (humeur, position).",score:0,interval:0,ease:2.5,due:null},
    ]
  }
};

PREBUILT['SVT'] = {
  'Genetique & Evolution': {
    cours: `<h2>Génétique &amp; Évolution</h2>
<h3>Structure de l'ADN</h3>
<p>L'ADN (acide désoxyribonucléique) est une double hélice formée de deux brins antiparallèles. Chaque nucléotide contient un sucre (désoxyribose), un phosphate, et une base azotée. Appariement : <strong>A-T</strong> (2 liaisons H) et <strong>G-C</strong> (3 liaisons H).</p>
<div class="schema-placeholder"><img src="https://via.placeholder.com/400x200/e0f2fe/0369a1?text=Schéma+Double+Hélice+ADN" alt="Double hélice ADN" style="width:100%;border-radius:10px;"><p style="text-align:center;font-size:.78rem;color:var(--muted)">Structure de la double hélice</p></div>
<h3>Réplication de l'ADN</h3>
<p>Semi-conservative : chaque brin sert de matrice. Enzymes clés : <strong>ADN polymérase</strong>, hélicase, ligase. Se produit lors de la phase S de l'interphase.</p>
<div class="schema-placeholder"><img src="https://via.placeholder.com/400x160/dcfce7/166534?text=Schéma+Réplication+ADN" alt="Réplication ADN" style="width:100%;border-radius:10px;"></div>
<h3>Expression des gènes</h3>
<ul>
<li><strong>Transcription</strong> (noyau) : ADN → ARNm grâce à l'ARN polymérase. Le brin codant sert de matrice.</li>
<li><strong>Traduction</strong> (ribosomes) : ARNm → protéine. Les ARNt apportent les acides aminés. Chaque codon (3 bases) code un acide aminé.</li>
</ul>
<div class="schema-placeholder"><img src="https://via.placeholder.com/400x180/fef3c7/92400e?text=Schéma+Transcription+→+Traduction" alt="Transcription et traduction" style="width:100%;border-radius:10px;"></div>
<h3>Mitose</h3>
<p>Division cellulaire : une cellule mère 2n → deux cellules filles 2n identiques. Phases : <strong>Prophase → Métaphase → Anaphase → Télophase → Cytocinèse</strong>.</p>
<div class="schema-placeholder"><img src="https://via.placeholder.com/400x180/fce7f3/9d174d?text=Schéma+Phases+de+la+Mitose" alt="Mitose" style="width:100%;border-radius:10px;"></div>`,
    flashcards: [
      {q:"ADN — structure",a:"Double hélice antiparallèle. Bases : A-T (2 liaisons H), G-C (3 liaisons H). Sucre = désoxyribose.",score:0,interval:0,ease:2.5,due:null},
      {q:"Réplication de l\'ADN — principe",a:"Semi-conservative : chaque brin parental sert de matrice pour un nouveau brin. Enzyme principale : ADN polymérase.",score:0,interval:0,ease:2.5,due:null},
      {q:"Transcription",a:"ADN → ARNm dans le noyau, grâce à l\'ARN polymérase. Le brin codant sert de matrice.",score:0,interval:0,ease:2.5,due:null},
      {q:"Traduction",a:"ARNm → protéine sur les ribosomes. Les ARNt apportent les acides aminés selon les codons (triplets de bases).",score:0,interval:0,ease:2.5,due:null},
      {q:"Codon",a:"Triplet de 3 bases sur l\'ARNm codant un acide aminé. Codon START = AUG, codons STOP = UAA/UAG/UGA.",score:0,interval:0,ease:2.5,due:null},
      {q:"Mutation — définition et conséquences",a:"Modification de la séquence nucléotidique de l\'ADN. Peut être silencieuse (même acide aminé), faux-sens (acide aminé différent) ou non-sens (codon STOP prématuré).",score:0,interval:0,ease:2.5,due:null},
      {q:"Mitose — phases et résultat",a:"Prophase → Métaphase → Anaphase → Télophase. Résultat : 2 cellules filles 2n génétiquement identiques à la cellule mère.",score:0,interval:0,ease:2.5,due:null},
      {q:"Méiose — résultat",a:"Deux divisions successives d\'une cellule 2n → 4 cellules haploïdes n. Brassage génétique par enjambements.",score:0,interval:0,ease:2.5,due:null},
      {q:"Allèle dominant / récessif",a:"Dominant : s\'exprime même en un seul exemplaire (hétérozygote). Récessif : ne s\'exprime qu\'en double exemplaire (homozygote récessif).",score:0,interval:0,ease:2.5,due:null},
      {q:"Sélection naturelle — mécanisme",a:"Variation génétique → certains individus mieux adaptés → survie et reproduction accrues → fréquence des allèles favorables augmente dans la population.",score:0,interval:0,ease:2.5,due:null},
    ]
  },
  'Corps humain & Sante': {
    cours: "<h2>Corps humain & Sante</h2><h3>Systeme immunitaire</h3><ul><li><b>Immunite innee</b> : reponse rapide non specifique (phagocytose)</li><li><b>Immunite adaptative</b> : lymphocytes B (anticorps) et T — reponse specifique avec memoire</li></ul><h3>Vaccination</h3><p>Antigene inoffensif → memoire immunitaire sans declencher la maladie.</p>",
    flashcards: [
      {q:"Antigene",a:"Molecule etrangere declenchant une reponse immunitaire.",score:0,interval:0,ease:2.5,due:null},
      {q:"Anticorps",a:"Proteine produite par les lymphocytes B, specifique d\'un antigene.",score:0,interval:0,ease:2.5,due:null},
      {q:"Lymphocyte T cytotoxique",a:"Detruit les cellules infectees ou cancereuses. Immunite cellulaire.",score:0,interval:0,ease:2.5,due:null},
      {q:"Vaccination",a:"Injection d\'un antigene inoffensif pour creer une memoire immunitaire.",score:0,interval:0,ease:2.5,due:null},
    ]
  }
};

PREBUILT['Physique-Chimie'] = {
  'Mécanique & Énergie': {
    cours: `<h2>Mécanique &amp; Énergie</h2>
<h3>Lois de Newton</h3>
<div class="formula-box latex-block">
<strong>1re loi (inertie) :</strong> $\sum \vec{F} = \vec{0} \Leftrightarrow$ mouvement rectiligne uniforme<br>
<strong>2e loi (PFD) :</strong> $$\sum \vec{F} = m\vec{a}$$
<strong>3e loi (action-réaction) :</strong> $\vec{F}_{A/B} = -\vec{F}_{B/A}$
</div>
<h3>Chute libre (sans frottements)</h3>
<div class="formula-box latex-block">
$$a = g \approx 9{,}8 \text{ m/s}^2 \quad v(t) = v_0 + gt \quad h(t) = h_0 + v_0 t + \tfrac{1}{2}gt^2$$
</div>
<div class="schema-placeholder"><img src="https://via.placeholder.com/400x160/e0f2fe/0369a1?text=Schéma+Chute+libre+%2F+Projectile" alt="Chute libre" style="width:100%;border-radius:10px;"></div>
<h3>Énergies</h3>
<div class="formula-box latex-block">
$$E_c = \frac{1}{2}mv^2 \qquad E_{pp} = mgh \qquad E_m = E_c + E_{pp}$$
Conservation : $E_m = \text{constante}$ (sans frottements)
</div>
<h3>Travail et puissance</h3>
<div class="formula-box latex-block">
$$W = \vec{F} \cdot \vec{d} = Fd\cos\theta \qquad P = \frac{W}{\Delta t} = Fv$$
</div>`,
    flashcards: [
      {q:"2e loi de Newton (PFD)",a:"$\\sum \\vec{F} = m\\vec{a}$. La somme vectorielle des forces appliquées = masse × vecteur accélération. Unités : N = kg·m/s².",score:0,interval:0,ease:2.5,due:null},
      {q:"Énergie cinétique",a:"$E_c = \\frac{1}{2}mv^2$ en joules. Dépend de la masse (kg) et du carré de la vitesse (m/s).",score:0,interval:0,ease:2.5,due:null},
      {q:"Énergie potentielle de pesanteur",a:"$E_{pp} = mgh$. m en kg, g ≈ 9,8 m/s², h en mètres. Référence choisie arbitrairement.",score:0,interval:0,ease:2.5,due:null},
      {q:"Conservation de l\'énergie mécanique",a:"$E_m = E_c + E_{pp} = \\text{constante}$ en l\'absence de frottements.",score:0,interval:0,ease:2.5,due:null},
      {q:"Travail d\'une force",a:"$W = F \\cdot d \\cdot \\cos\\theta$. Moteur si W > 0, résistant si W < 0.",score:0,interval:0,ease:2.5,due:null},
      {q:"Chute libre — équations horaires",a:"$v(t) = v_0 + gt$ et $h(t) = h_0 + v_0 t + \\frac{1}{2}gt^2$. En l\'absence de frottements.",score:0,interval:0,ease:2.5,due:null},
    ]
  },
  'Chimie — Solutions aqueuses': {
    cours: `<h2>Chimie — Solutions aqueuses</h2>
<h3>pH et acidité</h3>
<div class="formula-box latex-block">
$$\text{pH} = -\log[\text{H}_3\text{O}^+] \qquad [\text{H}_3\text{O}^+] = 10^{-\text{pH}}$$
Acide : pH &lt; 7 — Neutre : pH = 7 — Basique : pH &gt; 7
</div>
<h3>Couples acide/base</h3>
<p>Transfert de proton H⁺ entre un acide (donneur) et une base (accepteur) : $AH + B \rightleftharpoons A^- + BH^+$</p>
<h3>Concentration molaire et titrage</h3>
<div class="formula-box latex-block">
$$C = \frac{n}{V} \text{ (mol/L)} \qquad \text{Équivalence : } n_a = n_b \Rightarrow C_a V_a = C_b V_b$$
</div>
<div class="schema-placeholder"><img src="https://via.placeholder.com/400x200/fef3c7/92400e?text=Schéma+Montage+Titrage+pH-métrique" alt="Titrage" style="width:100%;border-radius:10px;"><p style="text-align:center;font-size:.78rem;color:var(--muted)">Courbe de titrage pH-métrique</p></div>`,
    flashcards: [
      {q:"pH — définition et formule",a:"$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]$. Mesure l\'acidité. Inversement proportionnel à la concentration en H₃O⁺.",score:0,interval:0,ease:2.5,due:null},
      {q:"Couple acide/base conjugué",a:"AH (acide, donneur H⁺) et A⁻ (base conjuguée, accepteur H⁺). Ex : CH₃COOH / CH₃COO⁻. Demi-équation : $AH = A^- + H^+$",score:0,interval:0,ease:2.5,due:null},
      {q:"Concentration molaire",a:"$C = n/V$. n en moles, V en litres (L). S\'exprime en mol/L ou mol·L⁻¹.",score:0,interval:0,ease:2.5,due:null},
      {q:"Équivalence d\'un titrage",a:"À l\'équivalence, les réactifs sont en proportions stœchiométriques : $C_a V_a = C_b V_b$ (pour monoacide/monobase).",score:0,interval:0,ease:2.5,due:null},
      {q:"Produit ionique de l\'eau",a:"$K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14}$ à 25°C. pH + pOH = 14.",score:0,interval:0,ease:2.5,due:null},
    ]
  }
};

// ════════════════════════════════════════════════════════════
// TEXTES BAC FRANÇAIS — ORAL BLANC (ajout dans Français)
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
// TEXTES BAC FRANÇAIS — FICHES COMPLÈTES (texte + analyse + figures)
// ════════════════════════════════════════════════════════════

// OE1 — POÉSIE
PREBUILT['Français']['T1 — Le dormeur du val'] = {
cours: `<h2>Le dormeur du val — Fiche complète</h2>
<p><strong>Arthur Rimbaud</strong> | Cahiers de Douai, octobre 1870 | Sonnet</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Rimbaud utilise-t-il la beauté trompeuse du sonnet pour dénoncer l'horreur de la guerre ?<br>
📌 <strong>Mouvement :</strong> Romantisme tardif | <strong>Genre :</strong> Sonnet (2 quatrains + 2 tercets)
</div>

<h3>Le texte annoté — passe ta souris sur les couleurs</h3>
<div class="fig-legende">
<span class="fig-legende-item" style="background:#e0f2fe;color:#0369a1">Euphémisme</span>
<span class="fig-legende-item" style="background:#dcfce7;color:#166534">Personnification</span>
<span class="fig-legende-item" style="background:#fef9c3;color:#854d0e">Métaphore</span>
<span class="fig-legende-item" style="background:#ede9fe;color:#6d28d9">Anaphore</span>
<span class="fig-legende-item" style="background:#1e1b4b;color:#fff">Chute</span>
</div>
<div class="texte-annote">
<p><span class="fig fig-metaphore" title="MÉTAPHORE + OXYMORE : 'trou de verdure' = espace fermé dans la nature ouverte. Annonce discrètement une tombe. La nature est un berceau qui cache la mort.">C'est un trou de verdure où chante une rivière</span><br>
<span class="fig fig-perso" title="PERSONNIFICATION : la rivière 'chante', la montagne est 'fière'. La nature est vivante et humaine — contraste cruel avec le soldat mort qui, lui, ne sent plus rien.">Accrochant follement aux herbes des haillons<br>
D'argent ; où le soleil, de la montagne fière,</span><br>
<span class="fig fig-metaphore" title="MÉTAPHORE : le val 'mousse de rayons' comme une boisson pétillante. Image joyeuse et lumineuse — le piège du sonnet se met en place.">Luit : c'est un petit val qui mousse de rayons.</span></p>

<p>Un soldat jeune, bouche ouverte, tête nue,<br>
<span class="fig fig-metaphore" title="MÉTAPHORE FUNÈBRE : le 'frais cresson bleu' — la couleur froide et bleue annonce discrètement la mort. Un dormeur vivant n'est pas allongé dans du cresson bleu.">Et la nuque baignant dans le frais cresson bleu,</span><br>
<span class="fig fig-euphem" title="EUPHÉMISME CENTRAL — 'Dort' pour dire 'est mort'. Rimbaud trompe volontairement le lecteur. Ce mot revient 3 fois = piège filé sur tout le poème. C'est la figure la plus importante à nommer.">Dort</span> ; il est étendu dans l'herbe, sous la nue,<br>
<span class="fig fig-comparaison" title="COMPARAISON pathétique : 'Pâle dans son lit vert.' Un dormant n'est pas pâle. Premier signe physique que quelque chose ne va pas — Rimbaud glisse des indices.">Pâle dans son lit vert où la lumière pleut.</span></p>

<p><span class="fig fig-anaphore" title="ANAPHORE : 'il dort' répété 3 fois dans le poème. Martèle l'euphémisme, endort la méfiance du lecteur. Effet hypnotique — on finit par y croire.">Les pieds dans les glaïeuls, il dort.</span> <span class="fig fig-comparaison" title="COMPARAISON pathétique : 'comme sourirait un enfant malade.' Le soldat devient un enfant innocent. Anti-héroïsme total : pas de gloire, pas de bravoure. La guerre tue des enfants.">Souriant comme<br>
Sourirait un enfant malade</span>, il fait un somme :<br>
<span class="fig fig-ironie" title="APOSTROPHE + IRONIE TRAGIQUE : Rimbaud s'adresse à la Nature comme si elle pouvait aider. Mais 'il a froid' révèle que le soldat est mort — les morts ont froid. La Nature est impuissante. Ironie : on demande de bercer un cadavre.">Nature, berce-le chaudement : il a froid.</span></p>

<p>Les parfums ne font pas frissonner sa narine ;<br>
<span class="fig fig-anaphore" title="ANAPHORE (3e occurrence) — dernier emploi de l'euphémisme avant la chute brutale. Le lecteur est totalement berné.">Il dort dans le soleil, la main sur sa poitrine</span><br>
Tranquille. <span class="fig fig-chute" title="CHUTE / RUPTURE DE TON — le vers final brise tout. Après 13 vers de douceur trompeuse, la vérité nue : deux balles. Pas de pathos, pas de larmes. La sécheresse du constat EST la dénonciation de la guerre. Technique anti-romantique de Rimbaud : moins il en dit, plus ça fait mal.">Il a deux trous rouges au côté droit.</span></p>
</div>

<h3>Axes de lecture</h3>
<ul>
<li><strong>Axe 1 — Une nature idyllique et trompeuse :</strong> Nature personnifiée, maternelle (« berce », « chauffe »). Champ lexical de la lumière et de la vie qui contraste violemment avec la mort.</li>
<li><strong>Axe 2 — Le sonnet comme piège :</strong> Le lecteur est berné comme le soldat semble dormir. La révélation finale est brutale, sèche, sans pathos — anti-climax volontaire.</li>
<li><strong>Axe 3 — Dénonciation de la guerre :</strong> Pas de héroïsme, pas de gloire. Le soldat est un enfant. La guerre est absurde.</li>
</ul>

<h3>Les 5 figures à nommer à l'oral</h3>
<ul>
<li><strong>Euphémisme filé</strong> — "dort" (×3) → piège du lecteur. <em>Comment le retrouver : mot doux qui cache une réalité dure.</em></li>
<li><strong>Personnification</strong> — Nature "fière", rivière "chante". <em>Verbe ou adjectif humain donné à un élément naturel.</em></li>
<li><strong>Anaphore</strong> — "il dort" ×3. <em>Même groupe répété en début d'unité.</em></li>
<li><strong>Comparaison pathétique</strong> — "comme sourirait un enfant malade". <em>Outil comparatif + image touchante.</em></li>
<li><strong>Chute / rupture de ton</strong> — "Il a deux trous rouges". <em>Dernier vers qui brise le registre dominant.</em></li>
</ul>`,
flashcards: [
{q:'Euphémisme central + effet dans Le dormeur du val',a:'"Dort" (×3) pour dire "est mort". Trompe le lecteur, rend la chute finale d\'autant plus brutale. C\'est le piège du poème.',score:0,interval:0,ease:2.5,due:null},
{q:'Quelle figure est "Nature, berce-le chaudement : il a froid" ?',a:'Apostrophe + ironie tragique. Rimbaud s\'adresse à la Nature mais "il a froid" = il est mort. La Nature est impuissante — on demande de bercer un cadavre.',score:0,interval:0,ease:2.5,due:null},
{q:'Effet de la chute "Il a deux trous rouges au côté droit"',a:'Rupture de ton totale. Sécheresse du constat sans pathos = dénonciation anti-romantique. Plus c\'est froid, plus c\'est violent.',score:0,interval:0,ease:2.5,due:null},
{q:'Problématique du Dormeur du val',a:'Comment Rimbaud utilise-t-il la beauté trompeuse du sonnet pour dénoncer l\'horreur de la guerre ?',score:0,interval:0,ease:2.5,due:null},
{q:'Pourquoi "un enfant malade" est important ?',a:'Comparaison pathétique — le soldat redevient enfant. Anti-héroïsme : la guerre ne fait pas des héros, elle tue des enfants innocents.',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T4 — À une passante (Baudelaire)'] = {
cours: `<h2>À une passante — Fiche complète</h2>
<p><strong>Charles Baudelaire</strong> | Les Fleurs du Mal, "Tableaux parisiens" (1861) | Sonnet</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Baudelaire fait-il de la rencontre manquée le symbole d'une beauté moderne foudroyante et éphémère ?<br>
📌 <strong>Parcours :</strong> Émancipations créatrices | <strong>Mouvement :</strong> Symbolisme / Modernité
</div>

<h3>Le texte annoté</h3>
<div class="fig-legende">
<span class="fig-legende-item" style="background:#ffedd5;color:#c2410c">Ironie/Oxymore</span>
<span class="fig-legende-item" style="background:#dcfce7;color:#166534">Personnification</span>
<span class="fig-legende-item" style="background:#fef9c3;color:#854d0e">Métaphore</span>
<span class="fig-legende-item" style="background:#fee2e2;color:#dc2626">Ellipse/Rupture</span>
</div>
<div class="texte-annote">
<p><span class="fig fig-perso" title="PERSONNIFICATION : 'la rue hurlait.' La ville moderne est violente, hostile. Baudelaire invente la poésie urbaine — la rue n'est pas un décor, elle agresse physiquement le poète.">La rue assourdissante autour de moi hurlait.</span><br>
<span class="fig fig-accumulation" title="ACCUMULATION d'adjectifs : 'Longue, mince, en grand deuil, douleur majestueuse.' Portrait fragmenté et impressionniste. On ne voit pas la femme entière — on saisit des éclats, comme un flash.">Longue, mince, en grand deuil, douleur majestueuse,</span><br>
Une femme passa, d'une main fastueuse<br>
Soulevant, balançant le feston et l'ourlet ;</p>

<p><span class="fig fig-comparaison" title="COMPARAISON sculpturale : 'jambe de statue.' La femme est à la fois vivante et idéale, réelle et artistique. Baudelaire la transforme en œuvre d'art au moment même où il la voit — et la perd.">Agile et noble, avec sa jambe de statue.</span><br>
Moi, je buvais, crispé comme un extravagant,<br>
<span class="fig fig-metaphore" title="MÉTAPHORE complexe : l'œil est un 'ciel livide où germe l'ouragan.' Livide = couleur de mort et de passion. L'ouragan = la passion violente qui naît et meurt en même temps. Double sens : beauté et destruction.">Dans son œil, ciel livide où germe l'ouragan,</span><br>
<span class="fig fig-oxymore" title="OXYMORE fondamental : 'douceur qui fascine ET plaisir qui tue.' L'amour baudelairien est toujours mortel. La beauté tue. C'est le Spleen — le bonheur est impossible, toujours lié à la destruction.">La douceur qui fascine et le plaisir qui tue.</span></p>

<p><span class="fig fig-ellipse" title="ELLIPSE + RUPTURE : 'Un éclair... puis la nuit !' Les points de suspension miment la disparition instantanée. Baudelaire invente la beauté MODERNE : fugace, elle n'existe que dans l'instant de la perte. Pas de beauté éternelle — seulement des éclairs.">Un éclair... puis la nuit ! – Fugitive beauté</span><br>
Dont le regard m'a fait soudainement renaître,<br>
<span class="fig fig-question" title="QUESTION RHÉTORIQUE : 'Ne te verrai-je plus que dans l'éternité ?' Pas de réponse possible. L'éternité = la mort = seul lieu de retrouvailles. L'amour baudelairien est condamné dès sa naissance.">Ne te verrai-je plus que dans l'éternité ?</span></p>

<p><span class="fig fig-accumulation" title="ACCUMULATION de ruptures : 'Ailleurs, bien loin, trop tard, jamais peut-être !' Gradation vers l'impossibilité absolue. Chaque mot ferme une porte. Le rythme haché mime l'agitation du poète.">Ailleurs, bien loin d'ici ! trop tard ! jamais peut-être !</span><br>
Car j'ignore où tu fuis, tu ne sais où je vais,<br>
<span class="fig fig-ironie" title="DOUBLE APOSTROPHE + CONDITIONNEL PASSÉ : 'Ô toi que j'eusse aimée, ô toi qui le savais !' Le conditionnel passé = irréel DÉFINITIF. Elle SAVAIT qu'il l'aurait aimée. La rencontre manquée est consciente des deux côtés. Beauté et tragédie absolues en un seul vers.">Ô toi que j'eusse aimée, ô toi qui le savais !</span></p>
</div>

<h3>Axes de lecture</h3>
<ul>
<li><strong>Axe 1 — Modernité baudelairienne :</strong> La rue, la foule, la vitesse — beauté non plus éternelle mais instantanée.</li>
<li><strong>Axe 2 — L'amour impossible et le Spleen :</strong> L'oxymore "douceur/plaisir qui tue" dit l'impossibilité du bonheur.</li>
<li><strong>Axe 3 — Émancipation créatrice :</strong> La perte inspire le poème. L'échec amoureux est sublimé en chef-d'œuvre.</li>
</ul>

<h3>Les 5 figures à nommer à l'oral</h3>
<ul>
<li><strong>Oxymore</strong> — "douceur qui fascine et plaisir qui tue". <em>Deux termes contradictoires unis.</em></li>
<li><strong>Personnification</strong> — "la rue hurlait". <em>Verbe humain donné à un lieu.</em></li>
<li><strong>Ellipse</strong> — "Un éclair... puis la nuit !". <em>Ponctuation expressive qui mime la disparition.</em></li>
<li><strong>Conditionnel passé irréel</strong> — "j'eusse aimée". <em>Forme verbale = ce qui ne peut pas être.</em></li>
<li><strong>Métaphore de l'œil</strong> — "ciel livide où germe l'ouragan". <em>Comparaison sans outil comparatif.</em></li>
</ul>`,
flashcards: [
{q:'Oxymore central de "À une passante"',a:'"La douceur qui fascine et le plaisir qui tue." L\'amour baudelairien = attirance + destruction simultanées. Le Spleen.',score:0,interval:0,ease:2.5,due:null},
{q:'Que signifie "j\'eusse aimée" ?',a:'Conditionnel passé = irréel définitif. Il l\'aurait aimée mais ne le pourra jamais. Elle "savait" aussi. Rencontre manquée consciente des deux côtés.',score:0,interval:0,ease:2.5,due:null},
{q:'Pourquoi "Un éclair... puis la nuit !" est important',a:'Ellipse : les points miment la disparition. La beauté moderne (Baudelaire) = fugace, elle n\'existe que dans l\'instant de la perte.',score:0,interval:0,ease:2.5,due:null},
{q:'Problématique — À une passante',a:'Comment Baudelaire fait-il de la rencontre manquée le symbole d\'une beauté moderne foudroyante et éphémère ?',score:0,interval:0,ease:2.5,due:null},
]};


PREBUILT['Français']['T2 — Roman (Rimbaud)'] = {
cours: `<h2>Roman — Fiche complète</h2>
<p><strong>Arthur Rimbaud</strong> | Cahiers de Douai, 29 septembre 1870</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Rimbaud fait-il du sentiment amoureux adolescent un sujet poétique universel et intime ?<br>
📌 <strong>Structure :</strong> 4 parties (I à IV) | Retour au vers initial = structure circulaire
</div>

<h3>Le texte annoté</h3>
<div class="texte-annote">
<p><strong>I</strong><br>
<span class="fig fig-ironie" title="IRONIE + DISTANCIATION : 'On n'est pas sérieux quand on a dix-sept ans.' Rimbaud a lui-même dix-sept ans. Le pronom 'On' = universel et distancié. Il se moque tendrement de lui-même ET de tous les adolescents. Ton légèrement moqueur mais sincère.">On n'est pas sérieux, quand on a dix-sept ans.</span><br>
– Un beau soir, foin des bocks et de la limonade,<br>
Des cafés tapageurs aux lustres éclatants !<br>
<span class="fig fig-metaphore" title="MÉTAPHORE SENSORIELLE : 'les tilleuls verts' = couleur de la jeunesse et de l'espoir. Ils reviendront au dernier vers — structure circulaire. Le retour des tilleuls dit que l'amour adolescent recommence toujours.">– On va sous les tilleuls verts de la promenade.</span></p>

<p><span class="fig fig-perso" title="SYNESTHÉSIE + PERSONNIFICATION : 'L'air est si doux qu'on ferme la paupière.' L'air agit sur le corps. Les sens se mélangent (toucher + vue + odorat). La douceur du soir de juin est physique, presque enivrante.">Les tilleuls sentent bon dans les bons soirs de juin !<br>
L'air est parfois si doux, qu'on ferme la paupière ;</span><br>
<span class="fig fig-metaphore" title="MÉTAPHORE OLFACTIVE : 'parfums de vigne et parfums de bière.' La ville entre par l'odorat. Rimbaud mélange nature (vigne) et monde populaire (bière). Réalisme poétique — pas de nature idéalisée.">Le vent chargé de bruits – la ville n'est pas loin –<br>
A des parfums de vigne et des parfums de bière...</span></p>

<p><strong>II</strong><br>
<span class="fig fig-metaphore" title="MÉTAPHORE FRAGILE : 'un tout petit chiffon d'azur sombre' = une étoile entrevue à travers les branches. Image délicate, minuscule — comme l'amour naissant, fragile et précieux.">Voilà qu'on aperçoit un tout petit chiffon<br>
D'azur sombre, encadré d'une petite branche,</span><br>
<span class="fig fig-comparaison" title="COMPARAISON ANIMALE : 'un baiser qui palpite comme une petite bête.' Le baiser est vivant, animal, instinctif. Image surprenante et juste — le désir adolescent est capturé avec précision et tendresse.">On se laisse griser... on se sent aux lèvres un baiser<br>
Qui palpite là, comme une petite bête...</span></p>

<p><strong>III</strong><br>
<span class="fig fig-metaphore" title="NÉOLOGISME VERBAL : 'Le cœur fou robinsonne à travers les romans.' Robinson Crusoé = aventurier solitaire. Le cœur devient un aventurier des romans d'amour. Rimbaud invente le verbe 'robinsonner' — marque de liberté poétique.">Le cœur fou robinsonne à travers les romans,</span><br>
<span class="fig fig-ironie" title="IRONIE SOCIALE : 'sous l'ombre du faux col effrayant de son père.' Le père = l'autorité bourgeoise. Le faux col = symbole du conformisme ridicule. L'amour adolescent doit se faufiler sous la surveillance paternelle.">Passe une demoiselle aux petits airs charmants,<br>
Sous l'ombre du faux col effrayant de son père...</span></p>

<p><strong>IV</strong><br>
<span class="fig fig-anaphore" title="ANAPHORE : 'Vous êtes amoureux' répété deux fois. L'amour envahit tout, même le ton du poème change — plus direct, plus personnel. Le 'On' impersonnel devient 'Vous' = interpellation.">Vous êtes amoureux. Loué jusqu'au mois d'août.<br>
Vous êtes amoureux.</span> – Vos sonnets La font rire.<br>
Tous vos amis s'en vont, vous êtes mauvais goût.<br>
– Puis l'adorée, un soir, a daigné vous écrire !...</p>

<p>– Ce soir-là..., – vous rentrez aux cafés éclatants,<br>
Vous demandez des bocks ou de la limonade...<br>
<span class="fig fig-anaphore" title="STRUCTURE CIRCULAIRE : retour exact du premier vers. Le cycle de l'amour adolescent recommence. C'est universel et éternel — chaque génération vit cette même expérience. La circularité dit : cela ne finit jamais.">– On n'est pas sérieux, quand on a dix-sept ans<br>
Et qu'on a des tilleuls verts sur la promenade.</span></p>
</div>

<h3>Les 4 figures clés</h3>
<ul>
<li><strong>Structure circulaire</strong> — même vers début/fin. <em>Le cycle de l'amour adolescent recommence toujours.</em></li>
<li><strong>Ironie distanciée</strong> — "On n'est pas sérieux". <em>Pronom universel + ton légèrement moqueur.</em></li>
<li><strong>Synesthésie</strong> — sons, odeurs, douceur mêlés. <em>Plusieurs sens dans une même image.</em></li>
<li><strong>Comparaison animale</strong> — "baiser comme une petite bête". <em>Image inattendue et précise du désir.</em></li>
</ul>`,
flashcards: [
{q:'Structure de "Roman" et son effet',a:'Circulaire : même vers au début et à la fin. L\'amour adolescent est universel, il recommence toujours. La boucle dit que c\'est l\'expérience de toute une génération.',score:0,interval:0,ease:2.5,due:null},
{q:'Rôle du pronom "On" dans Roman',a:'Universel et distancié. Rimbaud inclut tous les adolescents. Ironie tendre : il se moque de lui-même. Crée une complicité avec le lecteur.',score:0,interval:0,ease:2.5,due:null},
{q:'Néologisme "robinsonner" — figure et sens',a:'Verbe inventé par Rimbaud. "Le cœur robinsonne" = explore les romans comme Robinson explore son île. Liberté poétique = créer des mots.',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T3 — Ma Bohême (Rimbaud)'] = {
cours: `<h2>Ma Bohême — Fiche complète</h2>
<p><strong>Arthur Rimbaud</strong> | Cahiers de Douai (1870) | Sous-titre : Fantaisie | Sonnet</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Rimbaud fait-il de l'errance et de la misère les conditions d'une liberté poétique totale ?<br>
📌 <strong>Thème central :</strong> La pauvreté matérielle = richesse poétique. Tout devient poésie.
</div>

<h3>Le texte annoté</h3>
<div class="texte-annote">
<p><span class="fig fig-metaphore" title="MÉTAPHORE IRONIQUE : 'poches crevées' = pauvreté affichée avec fierté. Et 'Mon paletot devenait idéal' — le manteau usé devient 'idéal' = parfait. Oxymore économique : la misère matérielle produit l'idéal poétique. Plus il est pauvre, plus il est libre.">Je m'en allais, les poings dans mes poches crevées ;<br>
Mon paletot aussi devenait idéal ;</span><br>
<span class="fig fig-apostrophe" title="APOSTROPHE à la Muse : Rimbaud s'adresse directement à sa source d'inspiration en marchant. 'j'étais ton féal' = chevalier servant de la poésie. La route est son atelier d'écriture.">J'allais sous le ciel, Muse ! et j'étais ton féal ;</span><br>
<span class="fig fig-hyperbole" title="HYPERBOLE lyrique : 'que d'amours splendides j'ai rêvées !' L'exclamation et le pluriel expriment la richesse INTÉRIEURE qui compense la pauvreté extérieure. La vie intérieure est démesurée.">Oh ! là ! là ! que d'amours splendides j'ai rêvées !</span></p>

<p>Mon unique culotte avait un large trou. –<br>
<span class="fig fig-comparaison" title="COMPARAISON INTERTEXTUELLE clé : 'Petit-Poucet rêveur, j'égrenais dans ma course des rimes.' Petit-Poucet sème des cailloux pour retrouver son chemin — Rimbaud sème des RIMES. La poésie remplace les cailloux. L'enfant perdu trouve sa voie par l'art, pas par la prudence.">Petit-Poucet rêveur, j'égrenais dans ma course<br>
Des rimes.</span> <span class="fig fig-metaphore" title="MÉTAPHORE ASTRONOMIQUE : 'Mon auberge était à la Grande-Ourse.' L'étoile polaire = son hôtel de nuit. Rimbaud n'a pas de toit — le ciel étoilé est sa maison. Refus total de la sédentarité bourgeoise. La liberté absolue EST son logement.">Mon auberge était à la Grande-Ourse.</span><br>
<span class="fig fig-perso" title="PERSONNIFICATION + SYNESTHÉSIE : 'Mes étoiles au ciel avaient un doux frou-frou.' Les étoiles font du bruit (frou-frou = bruit de tissu). Les étoiles sont SIENNES — il possède le ciel. Vision et ouïe se mélangent.">– Mes étoiles au ciel avaient un doux frou-frou</span></p>

<p>Et je les écoutais, assis au bord des routes,<br>
<span class="fig fig-comparaison" title="COMPARAISON OENOLOGIQUE : 'gouttes de rosée à mon front, comme un vin de vigueur.' La rosée = vin = ivresse poétique. La nature nourrit le poète comme le vin stimule les sens. La marche dans la rosée = cérémonie poétique.">Ces bons soirs de septembre où je sentais des gouttes<br>
De rosée à mon front, comme un vin de vigueur ;</span></p>

<p><span class="fig fig-comparaison" title="COMPARAISON MUSICALE — la plus belle figure du poème : 'Comme des lyres, je tirais les élastiques de mes souliers blessés.' Les élastiques USÉS de ses chaussures = cordes de lyre. La misère la plus banale devient instrument de musique. C'est la définition du poète-bohème : transformer TOUT en art.">Où, rimant au milieu des ombres fantastiques,<br>
Comme des lyres, je tirais les élastiques<br>
De mes souliers blessés, un pied près de mon cœur !</span></p>
</div>

<h3>Les 4 figures clés</h3>
<ul>
<li><strong>Métaphore de la misère idéale</strong> — "paletot idéal". <em>Adjectif valorisant sur objet dégradé.</em></li>
<li><strong>Comparaison du Petit-Poucet</strong> — rimes à la place des cailloux. <em>Intertextualité : conte réinventé.</em></li>
<li><strong>Métaphore astronomique</strong> — "auberge à la Grande-Ourse". <em>Le ciel étoilé = maison du poète libre.</em></li>
<li><strong>Comparaison des lyres</strong> — élastiques usés = cordes de lyre. <em>Objet vulgaire transformé en noble.</em></li>
</ul>`,
flashcards: [
{q:'Figure centrale de "Ma Bohême" et sa signification',a:'Métaphore filée de la misère transformée en idéal. "Paletot idéal", "auberge à la Grande-Ourse", "élastiques comme des lyres." La pauvreté matérielle = richesse poétique.',score:0,interval:0,ease:2.5,due:null},
{q:'"Petit-Poucet rêveur" — figure et sens',a:'Comparaison intertextuelle. Rimbaud sème des rimes au lieu des cailloux du conte. L\'enfant perdu trouve son chemin par la poésie, pas par la prudence bourgeoise.',score:0,interval:0,ease:2.5,due:null},
{q:'Problématique — Ma Bohême',a:'Comment Rimbaud fait-il de l\'errance et de la misère les conditions d\'une liberté poétique totale ?',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T5-6-7 — Graffigny (Lettres 10, 34, 41)'] = {
cours: `<h2>Lettres d'une Péruvienne — Fiche complète</h2>
<p><strong>Françoise de Graffigny</strong> | 1747 | Roman épistolaire | Lettres 10, 34, 41</p>
<div class="formula-box">
🎯 <strong>Technique centrale :</strong> Le regard étranger — Zilia observe la France avec des yeux neufs. Ce qui semble normal aux Français devient absurde vu de l'extérieur.<br>
📌 <strong>Enjeu :</strong> Critiquer la société française (condition des femmes, ethnocentrisme) sans être censurée.
</div>

<h3>Lettre 10 — Premier regard sur la France</h3>
<div class="texte-annote">
<p><span class="fig fig-accumulation" title="ACCUMULATION de réactions : 'me frappe, me surprend, m'étonne.' Triple accumulation de verbes d'étonnement. Le choc culturel est total — Zilia est submergée. Graffigny montre que la France, vue de l'extérieur, est incompréhensible.">tout ce qui s'offre à mes yeux me frappe, me surprend, m'étonne</span>, et ne me laisse qu'une impression vague, une perplexité stupide</p>

<p><span class="fig fig-ironie" title="IRONIE DU MIROIR : Zilia voit une 'jeune personne habillée comme une Vierge du Soleil' — c'est son propre reflet dans un miroir ! Elle court vers elle, pensant trouver une compatriote. L'ironie : on ne reconnaît pas son propre reflet sans avoir vu de miroir. Graffigny dit : nos conventions sont invisibles à qui les vit.">j'ai vu une jeune personne habillée comme une Vierge du Soleil ; j'ai couru à elle les bras ouverts. Quelle surprise... de ne trouver qu'une résistance impénétrable</span></p>

<p><span class="fig fig-question" title="QUESTIONS RHÉTORIQUES : 'Faut-il les craindre, faut-il les aimer ?' Pas de réponse — Zilia suspend son jugement. Graffigny dit : face à l'inconnu, la sagesse est de ne pas juger immédiatement. Leçon de tolérance.">Faut-il les craindre, faut-il les aimer ? Je me garderai bien de rien déterminer là-dessus.</span></p>
</div>

<h3>Lettre 34 — Critique de l'éducation des femmes</h3>
<div class="texte-annote">
<p><span class="fig fig-ironie" title="IRONIE CINGLANTE : 'on enferme les filles dans une maison religieuse pour leur apprendre à vivre dans le monde.' Contradiction logique parfaite : on enferme pour apprendre la liberté. Dénonciation du paradoxe de l'éducation féminine au XVIIIe siècle.">du moment que les filles commencent à être capables de recevoir des instructions, on les enferme dans une maison religieuse pour leur apprendre à vivre dans le monde</span></p>

<p><span class="fig fig-comparaison" title="COMPARAISON PÉROU/FRANCE : 'On sait au Pérou... on l'ignore en France.' Le Pérou = modèle positif, la France = contre-modèle. Retournement subversif : la civilisation 'primitive' est plus sage que la civilisation 'avancée'.">On sait au Pérou, mon cher Aza, que, pour préparer les humains à la pratique des vertus... <strong>on l'ignore en France.</strong></span></p>
</div>

<h3>Lettre 41 — Le choix de la liberté</h3>
<div class="texte-annote">
<p><span class="fig fig-metaphore" title="MÉTAPHORE DES CHAÎNES : 'faire prendre à mon cœur de nouvelles chaînes.' Le mariage = prison. Zilia refuse d'aimer Déterville. Vision révolutionnaire au XVIIIe siècle — une femme qui refuse le mariage par choix.">C'est en vain que vous vous flatteriez de faire prendre à mon cœur de nouvelles chaînes.</span></p>

<p><span class="fig fig-anaphore" title="ANAPHORE EXISTENTIELLE : 'je suis, je vis, j'existe.' Triple répétition + gradation. Zilia affirme son identité contre tous ceux qui veulent la définir (mari, société, religion). Programme des Lumières : l'existence suffit au bonheur.">Le plaisir d'être... <strong>je suis, je vis, j'existe</strong>, pourrait seul rendre heureux</span></p>
</div>

<h3>Les 4 figures clés</h3>
<ul>
<li><strong>Regard étranger / naïf</strong> — scène du miroir. <em>Description littérale d'un objet dont la fonction semble évidente.</em></li>
<li><strong>Ironie de l'éducation</strong> — "enfermer pour apprendre à vivre". <em>Contradiction logique dans le même énoncé.</em></li>
<li><strong>Comparaison Pérou/France</strong> — le "primitif" modèle du "civilisé". <em>Renversement de la hiérarchie culturelle.</em></li>
<li><strong>Anaphore existentielle</strong> — "je suis, je vis, j'existe". <em>Triple affirmation de l'identité féminine.</em></li>
</ul>`,
flashcards: [
{q:'Technique du regard étranger chez Graffigny',a:'Zilia observe la France avec des yeux neufs — ce qui semble normal aux Français devient absurde. Permet de critiquer sans être censurée directement.',score:0,interval:0,ease:2.5,due:null},
{q:'Ironie de la Lettre 34',a:'"On enferme les filles dans un couvent pour leur apprendre à vivre dans le monde." Contradiction logique = dénonciation de l\'éducation féminine paradoxale au XVIIIe.',score:0,interval:0,ease:2.5,due:null},
{q:'"Je suis, je vis, j\'existe" — figure et sens',a:'Anaphore triple + gradation existentielle. Zilia refuse le mariage, affirme que l\'existence seule suffit au bonheur. Programme des Lumières : être libre = être heureux.',score:0,interval:0,ease:2.5,due:null},
{q:'Scène du miroir (Lettre 10) — figure et sens',a:'Ironie du regard étranger. Zilia ne reconnaît pas son reflet — elle croit voir une compatriote. Dit que nos conventions sont invisibles à qui les vit depuis toujours.',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T8 — Des cannibales (Montaigne)'] = {
cours: `<h2>Des cannibales — Fiche complète</h2>
<p><strong>Montaigne</strong> | Essais, Livre I, ch. 31 (1580) | Parcours : Écrire et combattre pour l'égalité</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Montaigne utilise-t-il la figure du cannibale pour déconstruire la notion de "barbarie" et dénoncer l'ethnocentrisme européen ?<br>
📌 <strong>Genre :</strong> Essai (inventé par Montaigne) = pensée en mouvement, pas de dogme
</div>

<h3>Le texte annoté</h3>
<div class="texte-annote">
<p><span class="fig fig-these" title="THÈSE POSÉE EN OUVERTURE : 'il n'y a rien de barbare et de sauvage en cette nation.' Montaigne donne sa conclusion dès le début — technique rhétorique de la captatio. Il renverse l'opinion commune immédiatement.">Or je trouve, pour revenir à mon propos, qu'il n'y a rien de barbare et de sauvage en cette nation</span>, à ce qu'on m'en a rapporté : <span class="fig fig-relativisme" title="RELATIVISME CULTUREL — thèse centrale et révolutionnaire : 'chacun appelle barbarie ce qui n'est pas de son usage.' La barbarie n'est PAS une réalité objective, c'est un JUGEMENT CULTUREL. Ce qui est normal pour l'un est barbare pour l'autre. Première formulation du relativisme culturel en littérature française.">sinon que chacun appelle barbarie, ce qui n'est pas de son usage.</span></p>

<p>Là est toujours <span class="fig fig-ironie" title="IRONIE : 'la parfaite religion, la parfaite police, parfait et accompli usage de toutes choses.' Montaigne IMITE le raisonnement ethnocentrique européen pour mieux le ridiculiser. L'accumulation de 'parfait' est trop parfaite — c'est du sarcasme.">la parfaite religion, la parfaite police, parfait et accompli usage de toutes choses.</span></p>

<p><span class="fig fig-comparaison" title="COMPARAISON FONDATRICE : les hommes 'sauvages' sont comme les fruits 'sauvages' — naturels, donc plus vrais et plus purs. Montaigne retourne le sens du mot 'sauvage' : ce qui est naturel n'est pas inférieur, il est plus authentique.">Ils sont sauvages, de même que nous appelons sauvages les fruits que nature, de soi et de son progrès ordinaire, a produits</span> : là où, à la vérité, <span class="fig fig-antithese" title="ANTITHÈSE + RENVERSEMENT : 'ceux que nous avons altérés par notre artifice... nous devrions appeler plutôt sauvages.' Ce sont les EUROPÉENS qui sont 'altérés' = abîmés, corrompus par la civilisation. Renversement total de la logique coloniale.">ce sont ceux que nous avons altérés par notre artifice et détournés de l'ordre commun, que nous devrions appeler plutôt sauvages.</span></p>

<p><span class="fig fig-perso" title="PERSONNIFICATION DE LA NATURE : 'notre grande et puissante mère nature.' La Nature est une mère — supérieure à l'art humain. Vision humaniste.">Ce n'est pas raison que l'art gagne le point d'honneur sur notre grande et puissante mère nature.</span></p>

<p><span class="fig fig-concession" title="CONCESSION RHÉTORIQUE : Montaigne semble accorder le point à l'adversaire ('nous les pouvons bien appeler barbares') pour mieux retourner l'argument dans la phrase suivante avec le 'mais'. Technique du débatteur habile.">Nous les pouvons donc bien appeler barbares, eu égard aux règles de la raison, <strong>mais non pas eu égard à nous</strong>, qui les surpassons en toute sorte de barbarie.</span></p>
</div>

<h3>Les 5 figures clés</h3>
<ul>
<li><strong>Relativisme culturel</strong> — "chacun appelle barbarie ce qui n'est pas de son usage". <em>Affirmation universelle qui détruit une norme.</em></li>
<li><strong>Comparaison des fruits sauvages</strong> — naturel = plus pur. <em>Outil comparatif + renversement de valeur.</em></li>
<li><strong>Antithèse / Renversement</strong> — "nous devrions appeler plutôt sauvages" (nous). <em>Le sujet attendu et son contraire.</em></li>
<li><strong>Ironie</strong> — "la parfaite religion...". <em>Accumulation excessive qui tourne en dérision.</em></li>
<li><strong>Concession rhétorique</strong> — "certes... mais". <em>Accorder pour mieux retourner.</em></li>
</ul>`,
flashcards: [
{q:'Thèse centrale de Montaigne dans "Des cannibales"',a:'"Chacun appelle barbarie ce qui n\'est pas de son usage." La barbarie = jugement culturel relatif, pas réalité objective. Premier texte anti-colonial de la littérature française.',score:0,interval:0,ease:2.5,due:null},
{q:'Comparaison des fruits sauvages — sens',a:'Les hommes "sauvages" = fruits naturels = plus authentiques. Ce sont les Européens qui ont "altéré" la nature par leur artifice. Renversement : le "primitif" est plus pur.',score:0,interval:0,ease:2.5,due:null},
{q:'Concession rhétorique chez Montaigne',a:'"Nous les pouvons bien appeler barbares... mais non pas eu égard à nous, qui les surpassons en toute barbarie." Accorder un point pour mieux retourner l\'argument.',score:0,interval:0,ease:2.5,due:null},
{q:'Problématique — Des cannibales',a:'Comment Montaigne utilise-t-il la figure du cannibale pour déconstruire la "barbarie" et dénoncer l\'ethnocentrisme européen ?',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T9-10 — Le Menteur (Corneille, I,3 et II,5)'] = {
cours: `<h2>Le Menteur — Fiche complète</h2>
<p><strong>Pierre Corneille</strong> | 1643 | Parcours : Mensonges et comédie | Actes I,3 et II,5</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Corneille fait-il du mensonge une performance théâtrale qui révèle les séductions et les dangers de la parole ?<br>
📌 <strong>Technique centrale :</strong> Ironie dramatique — le spectateur sait, les personnages ignorent.
</div>

<h3>Acte I, Scène 3 — Le premier grand mensonge</h3>
<div class="texte-annote">
<p><span class="fig fig-ironie" title="IRONIE DRAMATIQUE : Dorante prétend avoir fait la guerre d'Allemagne depuis un an. Or Cliton sait qu'il arrive de Poitiers hier. Le spectateur sait aussi. Ce décalage crée le comique et la tension — on attend la chute.">Depuis que j'ai quitté les guerres d'Allemagne,<br>
C'est-à-dire du moins depuis un an entier,<br>
Je suis et jour et nuit dedans votre quartier</span></p>

<p><span class="fig fig-accumulation" title="ACCUMULATION HÉROÏQUE : 'Vaincre dans les combats, commander dans l'armée, De mille exploits fameux enfler ma renommée...' Dorante s'invente une biographie militaire glorieuse. L'accumulation d'exploits = comique d'excès. Plus c'est gros, plus c'est drôle.">Vaincre dans les combats, commander dans l'armée,<br>
De mille exploits fameux enfler ma renommée,<br>
Cédèrent aussitôt à ceux de vous servir.</span></p>

<p><span class="fig fig-apartes" title="APARTÉ COMIQUE : Cliton intervient à voix basse pour rappeler la réalité. 'Vous venez de Poitiers, ou je me donne au diable !' L'aparté crée une complicité avec le public contre le personnage. On rit avec Cliton, pas avec Dorante.">CLITON : Savez-vous bien, monsieur, que vous extravaguez ?<br>
DORANTE : Tais-toi.<br>
CLITON : Vous venez de Poitiers, ou je me donne au diable : Vous en revintes hier.</span></p>
</div>

<h3>Acte II, Scène 5 — L'engrenage du mensonge</h3>
<div class="texte-annote">
<p><span class="fig fig-accumulation" title="ACCUMULATION NARRATIVE : Dorante raconte une histoire de plus en plus invraisemblable — pistolet qui part, épée cassée en trois, barricades avec des meubles... Bergson : 'du mécanique plaqué sur du vivant.' L'accumulation d'incidents = comique mécanique.">son père... Il monte à son retour... Elle transit, pâlit, rougit, me cache...<br>
Fait marcher le déclic, le feu prend, le coup part...<br>
Mon épée en ma main en trois morceaux rompit.</span></p>

<p><span class="fig fig-ironie" title="CHUTE IRONIQUE : Géronte résume toute la tirade en une seule question cynique. 'C'est-à-dire en français qu'il fallut l'épouser ?' Le père comprend l'essentiel (Dorante a séduit une fille) en ignorant que tout est faux. Double ironie : le père est dupé ET il simplifie tout.">GÉRONTE : C'est-à-dire en français qu'il fallut l'épouser ?</span></p>
</div>

<h3>Les 4 figures clés</h3>
<ul>
<li><strong>Ironie dramatique</strong> — spectateur sait / personnages ignorent. <em>Information donnée au public, pas aux personnages.</em></li>
<li><strong>Aparté</strong> — Cliton commente à voix basse. <em>Réplique au public, pas aux autres personnages.</em></li>
<li><strong>Accumulation héroïque comique</strong> — liste d'exploits inventés. <em>Excès qui crée l'absurde.</em></li>
<li><strong>Engrenage du mensonge</strong> — chaque mensonge appelle le suivant. <em>Structure mécanique et comique.</em></li>
</ul>`,
flashcards: [
{q:'Ironie dramatique dans Le Menteur',a:'Le spectateur sait que Dorante ment (Poitiers, pas Allemagne). Les personnages l\'ignorent. Décalage = comique. On rit de la naïveté des dupés.',score:0,interval:0,ease:2.5,due:null},
{q:'Rôle de Cliton dans Le Menteur',a:'Valet qui connaît la vérité. Apartés = complicité avec le spectateur. Rappelle la réalité pendant que Dorante brode. Conscience comique de la pièce.',score:0,interval:0,ease:2.5,due:null},
{q:'Comique de l\'engrenage (Acte II)',a:'Chaque mensonge en nécessite un autre, de plus en plus invraisemblable. Bergson : comique mécanique. La structure s\'emballe = le menteur perd le contrôle.',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T11 — Cyrano de Bergerac (Rostand)'] = {
cours: `<h2>Cyrano de Bergerac — Fiche complète</h2>
<p><strong>Edmond Rostand</strong> | 1897 | Acte III, scène 7 : la scène du balcon</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Rostand fait-il de la scène du balcon une mise en abyme du théâtre et une réflexion sur l'amour impossible ?<br>
📌 <strong>Contexte :</strong> Cyrano dicte ses mots à Christian qui les répète à Roxane sur le balcon.
</div>

<h3>Le texte annoté</h3>
<div class="texte-annote">
<p><span class="fig fig-ironie" title="IRONIE DRAMATIQUE TRIPLE : 3 niveaux. Roxane croit parler à Christian. Christian répète Cyrano. Cyrano est caché sous le balcon. Le spectateur voit tout. C'est du théâtre dans le théâtre — mise en abyme parfaite.">ROXANE, avec dédain : C'est vous.<br>
CHRISTIAN : Je voudrais vous parler.<br>
CYRANO, sous le balcon, à Christian : Bien. Bien. Presque à voix basse.<br>
ROXANE : Non ! Vous parlez trop mal. Allez-vous-en !</span></p>

<p><span class="fig fig-metaphore" title="MÉTAPHORE FILÉE DE L'ENFANT-AMOUR : 'L'amour grandit bercé... cruel marmot... barcelonnette... nouveau-né... petit Hercule... strangula les deux serpents Orgueil et Doute.' Rostand file la métaphore de l'amour-bébé sur plusieurs répliques. L'amour est un bébé Hercule qui grandit malgré les obstacles.">CHRISTIAN : L'amour grandit bercé dans mon âme inquiète...<br>
Que ce cruel marmot prit pour barcelonnette !<br>
Ce nouveau-né, Madame, est un petit Hercule.<br>
De sorte qu'il strangula comme rien...<br>
Les deux serpents... Orgueil et Doute.</span></p>

<p><span class="fig fig-ironie" title="DÉNOUEMENT DE LA MISE EN ABYME : 'Chut ! Cela devient trop difficile !' Cyrano prend la place de Christian. Il parle maintenant DIRECTEMENT à Roxane — mais dans l'obscurité. L'amour vrai s'exprime enfin mais reste caché. Paradoxe tragique.">CYRANO, tirant Christian sous le balcon :<br>
Chut ! Cela devient trop difficile !...</span></p>
</div>

<h3>Les 4 figures clés</h3>
<ul>
<li><strong>Mise en abyme</strong> — théâtre dans le théâtre. <em>Cyrano écrit, Christian joue, Roxane croit.</em></li>
<li><strong>Métaphore filée</strong> — l'amour = bébé Hercule. <em>Une image développée sur plusieurs répliques.</em></li>
<li><strong>Ironie dramatique triple</strong> — 3 niveaux de savoir différents. <em>Chaque personnage sait quelque chose que les autres ignorent.</em></li>
<li><strong>Paradoxe tragique</strong> — Cyrano parle enfin à Roxane mais reste caché. <em>L'amour vrai s'exprime dans l'obscurité.</em></li>
</ul>`,
flashcards: [
{q:'Mise en abyme dans la scène du balcon',a:'Cyrano invente, Christian répète, Roxane croit parler à Christian. 3 niveaux de fiction. Le théâtre dit que l\'amour est toujours une mise en scène.',score:0,interval:0,ease:2.5,due:null},
{q:'Métaphore filée de la scène du balcon',a:'L\'amour = bébé Hercule. "Bercé... marmot... barcelonnette... nouveau-né... Hercule... strangula Orgueil et Doute." Une image développée sur plusieurs répliques.',score:0,interval:0,ease:2.5,due:null},
{q:'Paradoxe central de la scène du balcon',a:'Cyrano parle ENFIN directement à Roxane (il prend la place de Christian) — mais dans l\'obscurité. L\'amour vrai s\'exprime mais reste caché. Tragédie de Cyrano.',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T12 — Le Malade imaginaire (Molière, III,12)'] = {
cours: `<h2>Le Malade imaginaire — Fiche complète</h2>
<p><strong>Molière</strong> | 1673 | Acte III, scène 12 | Comédie-ballet</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Molière utilise-t-il le comique de la fausse mort pour dénoncer l'hypocrisie et faire triompher la vérité ?<br>
📌 <strong>Contexte :</strong> Argan fait le mort pour tester la sincérité de sa femme Béline.
</div>

<h3>Le texte annoté</h3>
<div class="texte-annote">
<p>Toinette : Ah ! mon Dieu ! Ah ! malheur ! quel étrange accident !<br>
Béline : Qu'est-ce, Toinette ?<br>
<span class="fig fig-ironie" title="IRONIE DRAMATIQUE : Argan est vivant (il fait le mort), Béline l'ignore. Le spectateur sait tout. Ce décalage crée le comique et révèle la vraie nature de Béline — c'est une scène de vérité involontaire.">Toinette : Votre mari est mort.<br>
Béline : Mon mari est mort ?</span></p>

<p>Toinette : Hélas ! oui. <span class="fig fig-pleonasme" title="PLÉONASME COMIQUE : 'le pauvre défunt est trépassé.' Défunt = trépassé = mort. Répétition inutile qui tourne en dérision la mort elle-même. Toinette joue le jeu avec excès comique.">Le pauvre défunt est trépassé.</span></p>

<p><span class="fig fig-ironie" title="IRONIE SACRILÈGE : 'Le Ciel en soit loué ! Me voilà délivrée d'un grand fardeau.' Formule religieuse de gratitude ('Le Ciel en soit loué') pour se réjouir de la mort du mari. Révèle l'hypocrisie totale de Béline. Elle jouait la femme aimante — elle détestait Argan.">Béline : Le Ciel en soit loué ! Me voilà délivrée d'un grand fardeau.</span></p>

<p>Toinette : <span class="fig fig-antiphrase" title="ANTIPHRASE : 'Voilà une belle oraison funèbre.' L'oraison funèbre = discours d'éloge du défunt. Ici c'est une liste d'insultes. 'Belle' dit le contraire de ce qu'on pense — ironie amère de Toinette.">Voilà une belle oraison funèbre.</span></p>

<p><span class="fig fig-accumulation" title="ACCUMULATION D'INSULTES : 'malpropre, dégoûtant, sans cesse un lavement, mouchant, toussant, crachant, sans esprit, ennuyeux, de mauvaise humeur...' Liste exhaustive qui révèle tout le mépris de Béline. Comique d'accumulation — chaque terme est plus insultant. La vérité sort quand on croit être seul.">Béline : Un homme incommode à tout le monde, malpropre, dégoûtant, sans cesse un lavement ou une médecine dans le ventre, mouchant, toussant, crachant toujours, sans esprit, ennuyeux, de mauvaise humeur</span>, fatiguant sans cesse les gens.</p>

<p><span class="fig fig-ironie" title="COUP DE THÉÂTRE + ANTIPHRASE FINALE : Argan se lève. 'Je suis bien aise de voir votre amitié et d'avoir entendu le beau panégyrique que vous avez fait de moi.' 'Beau panégyrique' (= éloge solennel) pour désigner les insultes = antiphrase cinglante. Ironie amère du mari trahi.">Argan, se levant brusquement : Doucement !<br>
Argan : Je suis bien aise de voir votre amitié et d'avoir entendu le beau panégyrique que vous avez fait de moi.</span></p>
</div>

<h3>Les 5 figures clés</h3>
<ul>
<li><strong>Ironie dramatique</strong> — Argan vivant / Béline l'ignore. <em>Le spectateur sait ce qu'un personnage ignore.</em></li>
<li><strong>Accumulation d'insultes</strong> — liste révélatrice. <em>Série de termes de même nature qui révèle un caractère.</em></li>
<li><strong>Antiphrase</strong> — "beau panégyrique". <em>Mot positif dans un contexte négatif.</em></li>
<li><strong>Pléonasme comique</strong> — "défunt trépassé". <em>Répétition inutile à effet comique.</em></li>
<li><strong>Coup de théâtre</strong> — Argan se lève. <em>Retournement brusque et inattendu.</em></li>
</ul>`,
flashcards: [
{q:'Ironie dramatique dans la scène 12 du Malade imaginaire',a:'Argan fait le mort, Béline l\'ignore, le spectateur sait tout. Décalage = comique + révélation du vrai caractère de Béline.',score:0,interval:0,ease:2.5,due:null},
{q:'Effet de l\'accumulation d\'insultes de Béline',a:'"Malpropre, dégoûtant, mouchant, toussant..." — révèle l\'hypocrisie totale. La vérité sort quand on croit être seul. Comique d\'accumulation.',score:0,interval:0,ease:2.5,due:null},
{q:'Antiphrase dans le texte de Molière',a:'"Beau panégyrique" (Argan) = sarcasme amer pour désigner les insultes de Béline. Dire le contraire de ce qu\'on pense pour railler.',score:0,interval:0,ease:2.5,due:null},
{q:'Problématique — Malade imaginaire III,12',a:'Comment Molière utilise-t-il le comique de la fausse mort pour dénoncer l\'hypocrisie et faire triompher la vérité ?',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T13-14-15 — Colette (Sido + Vrilles)'] = {
cours: `<h2>Colette — Fiche complète</h2>
<p><strong>Colette</strong> | Sido (1930) + Les Vrilles de la vigne (1908) | Parcours : La célébration du monde</p>
<div class="formula-box">
🎯 <strong>Style de Colette :</strong> prose poétique sensuelle — elle écrit avec le corps. Couleurs, odeurs, textures, sons. La célébration du monde passe par les SENS.
</div>

<h3>T13 — Sido et le merle (portrait indirect)</h3>
<div class="texte-annote">
<p>Je la chante, de mon mieux. Je célèbre la clarté originelle.<br>
<span class="fig fig-ironie" title="IRONIE NARRATIVE : Sido installe un épouvantail pour protéger les cerises... puis refuse de chasser le merle qui les mange. La contradiction révèle son caractère : elle préfère la beauté du vivant aux cerises. Portrait INDIRECT — on comprend Sido par ses actes, pas par une description.">Je l'ai vue suspendre, dans un cerisier, un épouvantail à effrayer les merles</span></p>

<p><span class="fig fig-oxymore" title="OXYMORE : 'passionnément immobile.' L'immobilité est passionnée. Observer le merle demande une intensité totale. Colette dit que la contemplation est une ACTION, pas une passivité. C'est peut-être la figure la plus importante pour définir Sido.">je trouvais ma mère sous l'arbre, passionnément immobile</span>, la tête à la rencontre du ciel</p>

<p><span class="fig fig-accumulation" title="ACCUMULATION D'OBSERVATIONS : 'comme il se sert de sa patte... les mouvements de sa tête... cette arrogance... ce tour de bec pour vider le noyau.' Sido observe avec une précision scientifique et un émerveillement d'enfant. La liste = intensité de la contemplation.">Qu'il est beau !... Et tu vois comme il se sert de sa patte ?<br>
Et tu vois les mouvements de sa tête et cette arrogance ?<br>
Et ce tour de bec pour vider le noyau ?</span></p>

<p><span class="fig fig-ironie" title="DÉNOUEMENT IRONIQUE : 'Les cerises ?... Ah ! Oui, les cerises...' Sido avait oublié pourquoi elle était là. Le merle est plus important que les cerises. Ce 'dédain dansant' pour les choses pratiques = philosophie de vie de Sido : la beauté prime sur l'utile.">Les cerises ?... Ah ! Oui, les cerises...<br>
Dans ses yeux passa une sorte de frénésie riante, un universel mépris, un dédain dansant</span></p>
</div>

<h3>T14 — Jour gris (prose poétique)</h3>
<div class="texte-annote">
<p><span class="fig fig-apostrophe" title="APOSTROPHE AU 'TU' : tout le texte s'adresse à la femme aimée. Cette intimité absolue inclut le lecteur — on est aussi ce 'tu'. La prose de Colette est un geste d'amour et d'invitation.">Et si tu arrivais, un jour d'été dans mon pays...<br>
tu m'oublierais, et tu t'assoirais là, pour n'en plus bouger jusqu'au terme de ta vie.</span></p>

<p><span class="fig fig-metaphore" title="MÉTAPHORE ANIMISTE : 'un fil de brouillard... un gracieux spectre de brume... il se fond et se fait tour à tour nuage, femme endormie, serpent langoureux, cheval à cou de chimère.' Le brouillard est une créature vivante qui prend différentes formes mythologiques. C'est de la prose poétique pure.">un fil de brouillard, un brouillard ténu, blanc, vivant, un gracieux spectre de brume...<br>
il se fond en lui-même et se fait tour à tour nuage, femme endormie, serpent langoureux, cheval à cou de chimère.</span></p>

<p><span class="fig fig-chute" title="RETOURNEMENT FINAL : après avoir décrit un paradis, Colette retourne tout : 'Ne le crois pas ! N'y va pas... Tu ne verrais qu'une campagne triste.' Elle protège son pays intérieur en le niant. Ou rassure sa compagne jalouse. Ambiguïté volontaire et poétique.">Ne le crois pas ! N'y va pas : tu le chercherais en vain.<br>
Tu ne verrais qu'une campagne triste, un village paisible et pauvre.</span></p>
</div>

<h3>T15 — Le Rossignol (liberté et voix)</h3>
<div class="texte-annote">
<p><span class="fig fig-these" title="ALLÉGORIE : 'un rossignol libre et qui ne se savait pas épié.' Le rossignol libre = Colette elle-même qui écrit librement. L'oiseau qui chante sans savoir qu'on l'observe = l'artiste authentique.">J'ai vu chanter un rossignol sous la lune, un rossignol libre et qui ne se savait pas épié.</span></p>

<p><span class="fig fig-metaphore" title="ALLÉGORIE DES VRILLES : 'les vrilles d'une vigne amère m'avaient liée... j'ai rompu tous ces fils tors qui tenaient à ma chair.' Les vrilles = les liens qui emprisonnent (mariage, société, conventions). Colette se libère comme le rossignol — c'est son programme de vie et d'écriture.">Cassantes, tenaces, les vrilles d'une vigne amère m'avaient liée...<br>
j'ai rompu, d'un sursaut effrayé, tous ces fils tors qui déjà tenaient à ma chair</span></p>

<p><span class="fig fig-anaphore" title="ANAPHORE DU DÉSIR D'EXPRESSION : 'Je voudrais dire, dire, dire tout ce que je sais, tout ce que je pense, tout ce que je devine...' Triple 'dire' + quadruple 'tout ce que' = urgence absolue. C'est le manifeste littéraire de Colette : écrire TOUT, ne rien taire.">Je voudrais dire, dire, dire tout ce que je sais,<br>
tout ce que je pense, tout ce que je devine,<br>
tout ce qui m'enchante et me blesse et m'étonne</span></p>
</div>

<h3>Les 5 figures clés</h3>
<ul>
<li><strong>Portrait indirect</strong> — Sido révélée par ses actes. <em>Pas de description directe — le personnage se montre dans ce qu'il fait.</em></li>
<li><strong>Oxymore</strong> — "passionnément immobile". <em>Deux contraires qui définissent un état paradoxal.</em></li>
<li><strong>Métaphore animiste</strong> — brouillard = créature vivante. <em>Élément naturel qui prend des formes humaines ou mythiques.</em></li>
<li><strong>Allégorie des vrilles</strong> — liens de vigne = contraintes sociales. <em>Image concrète = réalité abstraite.</em></li>
<li><strong>Anaphore de "dire"</strong> — urgence d'expression. <em>Répétition d'un verbe pour exprimer l'intensité.</em></li>
</ul>`,
flashcards: [
{q:'Portrait indirect chez Colette dans Sido',a:'Colette ne décrit pas Sido physiquement — elle la révèle par ses actes (oublier les cerises pour le merle, "passionnément immobile"). Le personnage se définit par ce qu\'il fait.',score:0,interval:0,ease:2.5,due:null},
{q:'Oxymore "passionnément immobile" — sens',a:'L\'immobilité de Sido EST une passion. Observer le merle demande une intensité totale. La contemplation = une action. C\'est la philosophie de vie de Sido.',score:0,interval:0,ease:2.5,due:null},
{q:'Allégorie des vrilles dans "Le Rossignol"',a:'Les vrilles = liens qui emprisonnent (mariage, société). Colette les rompt = liberté. Programme de vie et d\'écriture : tout dire, ne rien taire.',score:0,interval:0,ease:2.5,due:null},
{q:'Retournement final dans "Jour gris"',a:'"Ne le crois pas !" Après avoir décrit un paradis, Colette le nie. Protège son pays intérieur ou rassure sa compagne jalouse. Ambiguïté poétique volontaire.',score:0,interval:0,ease:2.5,due:null},
]};

PREBUILT['Français']['T16 — On était des loups (Sandrine Collette)'] = {
cours: `<h2>On était des loups — Fiche complète</h2>
<p><strong>Sandrine Collette</strong> | 2022 | Excipit | Parcours : La célébration du monde</p>
<div class="formula-box">
🎯 <strong>Problématique :</strong> Comment Sandrine Collette célèbre-t-elle le monde et le lien père-fils à travers une écriture sensorielle et minimaliste ?<br>
📌 <strong>Style :</strong> Flux de conscience, absence de ponctuation, phrases courtes = pensée brute du père.
</div>

<h3>Le texte annoté</h3>
<div class="texte-annote">
<p><span class="fig fig-these" title="INCIPIT DE L'EXCIPIT : 'Je suis devenu le père de mon fils vraiment.' Le mot 'vraiment' porte tout — c'est l'aboutissement du roman entier. La paternité ne se décrète pas, elle se construit. Ce roman raconte comment.">Je suis devenu le père de mon fils vraiment.</span>
<span class="fig fig-paradoxe" title="PARADOXE TOUCHANT : 'je voudrais presque qu'il reste petit toute sa vie.' Désir impossible mais sincère. L'amour paternel contient une contradiction : protéger ET laisser grandir. Le père le comprend avec tendresse.">Maintenant je voudrais presque qu'il reste petit toute sa vie et que je le protège</span> et ça ne marche pas comme ça bien sûr.</p>

<p><span class="fig fig-metaphore" title="MÉTAPHORE SENSORIELLE / ÉCOPOÉTIQUE : 'je sens les vibrations de la terre dans ma poitrine, mon cœur bat à son rythme.' Le père est accordé à la terre — fusion homme/nature. L'écopoétique dit : l'homme fait PARTIE de la nature, il n'est pas au-dessus.">Dans la lenteur il y a une plénitude et une justesse et je sens les vibrations de la terre dans ma poitrine, mon cœur bat à son rythme et les pulsations jusqu'au bout de mes doigts.</span></p>

<p><span class="fig fig-ellipse" title="STYLE ORAL / FLUX DE CONSCIENCE : 'il guette mon vœu j'en suis sûr.' Pas de ponctuation entre les propositions. Collette écrit comme le père PENSE — pensées qui s'enchaînent sans s'arrêter. Effet d'intimité absolue.">À côté de moi Aru regarde on regarde les étoiles filantes, il guette mon vœu j'en suis sûr.</span></p>

<p><span class="fig fig-comparaison" title="COMPARAISON PROTECTRICE : 'comme être à l'abri d'une maison quand la tempête arrive.' La couverture = maison = refuge. L'amour paternel crée un espace de protection contre le monde hostile.">on a la sensation d'être dans un cocon au milieu de l'hiver, c'est comme être à l'abri d'une maison quand la tempête arrive.</span></p>

<p><span class="fig fig-distinction" title="DISTINCTION POÉTIQUE : 'La montagne est calme je ne veux pas dire silencieuse juste calme.' Collette distingue le silence (absence de bruit) et le calme (plénitude paisible). La nature est PLEINE, pas vide. Distinction qui révèle une philosophie.">La montagne est calme je ne veux pas dire silencieuse juste calme.</span></p>

<p><span class="fig fig-hyperbole" title="HYPERBOLE D'AMOUR : 'sa petite voix claire s'élève dans les ténèbres et je jure qu'elle les éclaire.' La voix de l'enfant illumine littéralement la nuit. Hyperbole lyrique — l'amour paternel transforme le réel. L'enfant est la lumière du père.">Alors il chante à son tour et sa petite voix claire s'élève dans les ténèbres et je jure qu'elle les éclaire</span> et plus jamais je ne lui ordonne de se taire.</p>

<p><span class="fig fig-chute" title="CHUTE MINIMALISTE : 'Les choses sont à leur place je crois.' Après un roman de violence et reconstruction, cette phrase dit tout en peu de mots. La paix intérieure. 'Je crois' = humilité, pas certitude absolue. Fin ouverte et juste.">- Les choses sont à leur place je crois.</span></p>
</div>

<h3>Les 5 figures clés</h3>
<ul>
<li><strong>Métaphore de fusion homme/nature</strong> — "vibrations de la terre dans ma poitrine". <em>Le corps humain partage le rythme de la terre.</em></li>
<li><strong>Style oral / flux de conscience</strong> — pas de ponctuation. <em>Syntaxe fragmentée qui mime la pensée brute.</em></li>
<li><strong>Hyperbole d'amour</strong> — "sa voix éclaire les ténèbres". <em>Exagération lyrique qui exprime l'intensité du sentiment.</em></li>
<li><strong>Distinction poétique</strong> — "calme ≠ silencieux". <em>Nuance qui révèle une philosophie.</em></li>
<li><strong>Chute minimaliste</strong> — "Les choses sont à leur place". <em>Phrase courte qui condense tout le sens du roman.</em></li>
</ul>`,
flashcards: [
{q:'Chute finale de "On était des loups" — sens',a:'"Les choses sont à leur place je crois." Minimalisme total. Après la violence et la reconstruction, c\'est la paix intérieure. "Je crois" = humilité, pas certitude. Fin ouverte et juste.',score:0,interval:0,ease:2.5,due:null},
{q:'Fusion homme/nature chez Sandrine Collette',a:'"Je sens les vibrations de la terre dans ma poitrine." Écopoétique : le père fait PARTIE de la nature. Son cœur bat au rythme de la terre. L\'homme n\'est pas au-dessus — il est avec.',score:0,interval:0,ease:2.5,due:null},
{q:'Pourquoi le style sans ponctuation est une figure à analyser',a:'Flux de conscience : la syntaxe fragmentée mime la pensée du père en temps réel. Intimité absolue — on est dans sa tête. Effet d\'authenticité.',score:0,interval:0,ease:2.5,due:null},
{q:'Problématique — On était des loups',a:'Comment Collette célèbre-t-elle le monde et le lien père-fils à travers une écriture sensorielle et minimaliste ?',score:0,interval:0,ease:2.5,due:null},
]};
