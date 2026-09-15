/* ============================================================
   BACMASTER — data/physique-chimie.js
   Cours et flashcards — Physique-Chimie
   ============================================================ */

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
<div class="retenir-box">L'énergie mécanique <mark>E<sub>m</sub></mark> ne se conserve QUE si on néglige les frottements. Sans cette hypothèse (précisée dans l'énoncé), une partie de l'énergie se dissipe en chaleur et E_m diminue.</div>
<h3>Travail et puissance</h3>
<div class="formula-box latex-block">
$$W = \vec{F} \cdot \vec{d} = Fd\cos\theta \qquad P = \frac{W}{\Delta t} = Fv$$
</div>`,
    exercices: [
      {niveau:"Facile", enonce:"<p>Un objet de masse $m = 2\\,kg$ tombe en chute libre depuis une hauteur de $h = 5\\,m$, sans vitesse initiale. Calcule sa vitesse à l'arrivée au sol (on prend $g = 10\\,m/s^2$).</p>", aide:"Utilise la conservation de l'énergie mécanique : E_c au sol = E_pp perdue (puisque v_0=0, toute l'énergie potentielle se transforme en énergie cinétique).", correction:"<p>Par conservation de l'énergie mécanique (sans frottements) : $E_{pp,initiale} = E_{c,finale}$</p><p>$mgh = \\frac{1}{2}mv^2 \\Rightarrow v^2 = 2gh = 2 \\times 10 \\times 5 = 100$</p><p>$v = \\sqrt{100} = 10\\,m/s$</p>"},
      {niveau:"Moyen", enonce:"<p>Une force de $50\\,N$ déplace un objet de $3\\,m$ selon un angle de $60°$ par rapport à la direction du déplacement. Calcule le travail de cette force, puis la puissance développée si le déplacement dure $2\\,s$.</p>", aide:"Utilise W = F·d·cos(θ), puis P = W/Δt. cos(60°) = 0,5.", correction:"<p>$W = F \\cdot d \\cdot \\cos\\theta = 50 \\times 3 \\times \\cos(60°) = 50 \\times 3 \\times 0,5 = 75\\,J$</p><p>$P = \\frac{W}{\\Delta t} = \\frac{75}{2} = 37,5\\,W$</p>"},
      {niveau:"Difficile", enonce:"<p>Un skieur de masse $m=70\\,kg$ part du sommet d'une piste sans vitesse initiale et arrive en bas, 20 m plus bas, avec une vitesse de $18\\,m/s$. L'énergie mécanique s'est-elle conservée ? Justifie par le calcul (on prend $g=10\\,m/s^2$).</p>", aide:"Calcule l'énergie mécanique en haut (seulement E_pp car v_0=0) puis en bas (E_c + E_pp=0 en prenant le bas comme référence), et compare les deux valeurs.", correction:"<p><strong>En haut</strong> (référence de hauteur = bas de la piste) : $E_{m,haut} = E_{pp} = mgh = 70 \\times 10 \\times 20 = 14000\\,J$ (v=0 donc E_c=0)</p><p><strong>En bas</strong> : $E_{m,bas} = E_c = \\frac{1}{2}mv^2 = \\frac{1}{2} \\times 70 \\times 18^2 = 11340\\,J$</p><p>$14000\\,J \\neq 11340\\,J$ : l'énergie mécanique n'est <strong>pas conservée</strong> — il y a eu des frottements (ski/neige, air) qui ont dissipé environ $2660\\,J$ sous forme de chaleur.</p>"},
    ],
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
<div class="attention-box">Le pH est une échelle <mark>logarithmique</mark> : passer de pH 3 à pH 4 divise la concentration en H₃O⁺ par 10, pas par une simple soustraction linéaire. Une petite variation de pH = un grand changement de concentration.</div>
<h3>Couples acide/base</h3>
<p>Transfert de proton H⁺ entre un <mark>acide (donneur)</mark> et une <mark>base (accepteur)</mark> : $AH + B \rightleftharpoons A^- + BH^+$</p>
<h3>Concentration molaire et titrage</h3>
<div class="formula-box latex-block">
$$C = \frac{n}{V} \text{ (mol/L)} \qquad \text{Équivalence : } n_a = n_b \Rightarrow C_a V_a = C_b V_b$$
</div>
<div class="schema-placeholder"><img src="https://via.placeholder.com/400x200/fef3c7/92400e?text=Schéma+Montage+Titrage+pH-métrique" alt="Titrage" style="width:100%;border-radius:10px;"><p style="text-align:center;font-size:.78rem;color:var(--muted)">Courbe de titrage pH-métrique</p></div>`,
    exercices: [
      {niveau:"Facile", enonce:"<p>Une solution a une concentration en ions H₃O⁺ de $[H_3O^+] = 10^{-3}\\,mol/L$. Calcule son pH. Cette solution est-elle acide, neutre ou basique ?</p>", aide:"pH = -log[H3O+]. Ici la puissance de 10 donne directement le pH sans calculatrice.", correction:"<p>$pH = -\\log(10^{-3}) = 3$</p><p>Comme $pH < 7$, la solution est <strong>acide</strong>.</p>"},
      {niveau:"Moyen", enonce:"<p>On dissout $n = 0,2\\,mol$ d'un soluté dans $V = 500\\,mL$ d'eau. Calcule la concentration molaire C de la solution obtenue (attention aux unités).</p>", aide:"C = n/V, mais V doit être en LITRES, pas en mL. Convertis d'abord 500 mL en L.", correction:"<p>$V = 500\\,mL = 0,5\\,L$</p><p>$C = \\frac{n}{V} = \\frac{0,2}{0,5} = 0,4\\,mol/L$</p><p>Piège classique évité : oublier de convertir les mL en L avant de diviser.</p>"},
      {niveau:"Difficile", enonce:"<p>On titre $V_a = 20\\,mL$ d'une solution d'acide de concentration inconnue $C_a$ par une solution basique de concentration $C_b = 0,1\\,mol/L$. L'équivalence est atteinte pour un volume versé $V_b = 15\\,mL$. Calcule $C_a$.</p>", aide:"À l'équivalence : Ca·Va = Cb·Vb (cas d'un monoacide/monobase). Isole Ca.", correction:"<p>À l'équivalence : $C_a V_a = C_b V_b$</p><p>$C_a = \\frac{C_b V_b}{V_a} = \\frac{0,1 \\times 15}{20} = \\frac{1,5}{20} = 0,075\\,mol/L$</p><p>Remarque : comme Va et Vb sont tous les deux en mL, pas besoin de les convertir en L ici — le rapport Vb/Va reste identique quelle que soit l'unité utilisée, tant qu'elle est la même des deux côtés.</p>"},
    ],
    flashcards: [
      {q:"pH — définition et formule",a:"$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]$. Mesure l\'acidité. Inversement proportionnel à la concentration en H₃O⁺.",score:0,interval:0,ease:2.5,due:null},
      {q:"Couple acide/base conjugué",a:"AH (acide, donneur H⁺) et A⁻ (base conjuguée, accepteur H⁺). Ex : CH₃COOH / CH₃COO⁻. Demi-équation : $AH = A^- + H^+$",score:0,interval:0,ease:2.5,due:null},
      {q:"Concentration molaire",a:"$C = n/V$. n en moles, V en litres (L). S\'exprime en mol/L ou mol·L⁻¹.",score:0,interval:0,ease:2.5,due:null},
      {q:"Équivalence d\'un titrage",a:"À l\'équivalence, les réactifs sont en proportions stœchiométriques : $C_a V_a = C_b V_b$ (pour monoacide/monobase).",score:0,interval:0,ease:2.5,due:null},
      {q:"Produit ionique de l\'eau",a:"$K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14}$ à 25°C. pH + pOH = 14.",score:0,interval:0,ease:2.5,due:null},
    ]
  },
  'Électricité — circuits & lois de base': {
    cours: `<h2>Électricité — Lois fondamentales</h2>
<h3>I. Courant électrique</h3>
<p>Un courant électrique correspond à un <mark>déplacement de charges électriques</mark>. Les porteurs de charge sont soit des électrons (charge négative −e), soit des protons (charge positive +e). Dans les conducteurs métalliques (fils, câbles en cuivre ou aluminium), les porteurs de charge sont <mark>toujours des électrons</mark>.</p>
<div class="formula-box">Charge élémentaire : $e = 1,602 \\times 10^{-19}\\,C$. La charge d'un système $Q = n \\times e$ (n entier), exprimée en Coulomb (C).</div>

<h3>Intensité du courant électrique</h3>
<p>L'intensité correspond à la <mark>quantité de charges électriques qui traverse une section droite d'un conducteur, par unité de temps</mark>.</p>
<div class="formula-box latex-block">$$I = \\dfrac{\\Delta Q}{\\Delta t}$$
I en ampère (A) — ΔQ = variation de la quantité de charges en coulomb (C) — Δt = durée en seconde (s), avec $\\Delta t = t_{final} - t_{initial}$</div>

<h3>Orientation d'un circuit & mesure de l'intensité</h3>
<p>Par convention, le <mark>sens positif du courant</mark> correspond au sens opposé du déplacement réel des électrons. Un circuit est orienté en choisissant arbitrairement un sens positif, indiqué par une flèche.</p>
<div class="formula-box">L'ampèremètre (symbole : cercle avec A, borne COM) permet de mesurer l'intensité :<br>
— Si le courant <mark>sort</mark> par la borne COM → l'ampèremètre indique une intensité <strong>positive</strong>.<br>
— Si le courant <mark>entre</mark> par la borne COM → l'ampèremètre indique une intensité <strong>négative</strong>.</div>
<div class="retenir-box"><strong>3 conclusions essentielles</strong> à retenir mot pour mot :<br>1. Le sens positif choisi ne correspond pas forcément au sens réel du courant.<br>2. L'intensité est une grandeur <mark>algébrique</mark> (positive ou négative), qui dépend de l'orientation choisie ET du sens réel du courant.<br>3. L'ampèremètre permet de connaître le sens réel du courant : si l'intensité affichée est positive, le sens réel correspond au sens positif choisi ; si elle est négative, le sens réel est opposé.</div>

<h3>II. Tension électrique</h3>
<p>La tension électrique est la <mark>différence de potentiel électrique</mark> entre 2 points d'un circuit. Notations : $V_A$ et $V_B$ sont les potentiels en A et B. On note $U_{AB}$ la tension entre A et B :</p>
<div class="formula-box latex-block">$$U_{AB} = V_A - V_B$$
Unité : le volt (V). $U_{AB}$ est représentée par une flèche dont la <mark>pointe est en A</mark> et la <mark>base est en B</mark>.</div>
<p>Le potentiel et la tension sont aussi des grandeurs <strong>algébriques</strong> (positives ou négatives).</p>

<h3>Mesure de la tension</h3>
<p>Le voltmètre (symbole V, bornes + et COM) indique $U_{mes} = (V_+) - (V_{COM})$.</p>
<div class="attention-box">Pour mesurer $U_{AB}$ : il faut relier la <mark>borne + en A</mark> (donc $V_+=V_A$) et la <mark>borne COM en B</mark> (donc $V_{COM}=V_B$). Le voltmètre affiche alors bien $U_{mes} = V_A - V_B = U_{AB}$ — inverser les bornes inverserait le signe affiché !</div>

<h3>III. Branche, maille et nœud</h3>
<div class="formula-box">
<strong>Nœud</strong> : connexion où sont reliés au moins <mark>3 dipôles ou 3 conducteurs</mark>.<br>
<strong>Branche</strong> : portion de circuit ouverte comprise entre 2 nœuds voisins.<br>
<strong>Maille</strong> : portion de circuit fermée, constituée de plusieurs branches, ne passant qu'une <mark>seule fois</mark> par un nœud donné.
</div>
<p>Remarque : 2 points reliés par un simple conducteur (fil) ont le même potentiel électrique.</p>

<h3>IV. Lois de Kirchhoff</h3>
<h4>1. Loi des mailles</h4>
<p>La <mark>somme algébrique des tensions</mark> rencontrées le long d'une maille est nulle.</p>
<div class="formula-box"><strong>Méthode en 5 étapes :</strong><br>
1. Choisir un nœud de départ.<br>
2. Choisir un sens de parcours de la maille.<br>
3. Flécher toutes les tensions rencontrées le long de la maille.<br>
4. Attribuer un signe <strong>−</strong> à la tension lorsqu'on rencontre une <mark>pointe</mark> de flèche tension, et un signe <strong>+</strong> lorsqu'on rencontre une <mark>base</mark> de flèche (ou l'inverse — peu importe, du moment que c'est cohérent sur toute la maille).<br>
5. La somme des tensions ainsi signées est égale à 0.</div>

<h4>2. Loi des nœuds</h4>
<p>La somme algébrique des intensités des courants <mark>entrants</mark> dans un nœud est égale à la somme des intensités des courants <mark>sortants</mark> de ce nœud.</p>
<div class="formula-box">Exemple : si $I_1$ arrive à un nœud, et que $I_2$ et $I_4$ en repartent : $I_1 = I_2 + I_4$</div>

<h4>3. Additivité des tensions</h4>
<p>Découle directement de la définition d'une tension. Pour 3 points A, B, C d'un circuit :</p>
<div class="formula-box latex-block">$$U_{AC} = U_{AB} + U_{BC}$$
Démonstration : $U_{AB} + U_{BC} = (V_A-V_B)+(V_B-V_C) = V_A - V_C = U_{AC}$</div>

<h3>V. La loi d'Ohm</h3>
<p>Un conducteur ohmique à température constante est tel que la tension à ses bornes est <mark>proportionnelle</mark> à l'intensité qui le traverse.</p>
<div class="formula-box latex-block">$$U_{AB} = R \\times I$$
R = résistance du conducteur, en ohms (Ω). C'est le coefficient directeur de la droite $U_{AB}=R.I$. Donc aussi : $R = \\dfrac{U_{AB}}{I}$</div>
<div class="retenir-box">Pour la plupart des métaux : température ↘ ⟹ résistance ↘ (et inversement). À température constante, R ne dépend que de la <mark>nature du matériau</mark> et de sa <mark>forme géométrique</mark> : $R = \\dfrac{\\rho \\times L}{S}$ — avec L la longueur (m), S la section droite (m²), ρ la résistivité du matériau (Ω·m).</div>
<p>Les conducteurs de liaison (simples fils) ont toujours une résistance considérée comme <mark>nulle</mark>.</p>

<h3>Association de résistances</h3>
<div class="formula-box">
<strong>En série</strong> : $R_{eq} = R_1 + R_2 + ... + R_n$ (même intensité dans toute la branche, les tensions s'ajoutent).<br>
<strong>En parallèle (dérivation)</strong> : $\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + ... + \\dfrac{1}{R_n}$ (même tension aux bornes de chaque résistance, les intensités s'ajoutent).
</div>

<h3>Puissance électrique</h3>
<div class="formula-box latex-block">$$P = U \\times I = R \\times I^2 = \\dfrac{U^2}{R}$$
P en watts (W).</div>`,
    exercices: [
      {niveau:"Facile", enonce:"<p>Un résistor de résistance $R = 1\\,000\\,\\Omega$ (1 kΩ) est soumis à une tension $U_{AB} = 15\\,V$. Calcule l'intensité I qui le traverse, en mA.</p>", aide:"Utilise la loi d'Ohm sous la forme I = U/R (en isolant I). N'oublie pas de convertir le résultat en mA à la fin (×1000).", correction:"<p>$U_{AB} = R \\times I \\Rightarrow I = \\dfrac{U_{AB}}{R} = \\dfrac{15}{1000} = 0,015\\,A = 15\\,mA$</p>"},
      {niveau:"Moyen", enonce:"<p>Un nœud reçoit un courant entrant $I_1 = 22,5\\,mA$. Il se divise en deux branches parallèles de même résistance $R = 1\\,k\\Omega$ chacune (donc même tension, donc même intensité $I_2$ dans chaque branche). Calcule $I_2$, puis vérifie avec la loi des nœuds.</p>", aide:"Si les deux résistances sont identiques et en parallèle, le courant I1 se répartit à parts égales entre les deux branches (I2 = I1/2 dans chacune). Vérifie ensuite avec la loi des nœuds : I1 = I2 + I2.", correction:"<p>Comme les deux résistances sont identiques et soumises à la même tension (parallèle), le courant se répartit également : $I_2 = \\dfrac{I_1}{2} = \\dfrac{22,5}{2} = 11,25\\,mA$ dans chaque branche.</p><p><strong>Vérification loi des nœuds</strong> : $I_1 = I_2 + I_2 = 11,25 + 11,25 = 22,5\\,mA$ ✓</p>"},
      {niveau:"Difficile", enonce:"<p>Dans un circuit, une résistance $R=100\\,\\Omega$ est alimentée par un générateur réglable. Pour 4 réglages différents, on mesure les couples (I ; U_AB) suivants : (0,1A ; 10V), (0,2A ; 20V), (0,3A ; 30V), (0,4A ; 40V). Explique pourquoi ces points, placés sur un graphique (I en abscisse, U en ordonnée), sont alignés, et détermine le coefficient directeur de cette droite. Que représente-t-il physiquement ?</p>", aide:"Calcule le rapport U/I pour chaque couple de valeurs — que remarques-tu ? La loi d'Ohm U=R×I est l'équation d'une droite passant par l'origine, de coefficient directeur R.", correction:"<p>Pour chaque couple : $\\dfrac{U}{I} = \\dfrac{10}{0,1} = \\dfrac{20}{0,2} = \\dfrac{30}{0,3} = \\dfrac{40}{0,4} = 100$</p><p>Le rapport U/I est constant et égal à 100 pour tous les points — c'est exactement la loi d'Ohm $U = R \\times I$, l'équation d'une droite passant par l'origine avec un coefficient directeur égal à R.</p><p>Le coefficient directeur de la droite (= 100) représente donc directement la <strong>résistance R du conducteur ohmique</strong>, exprimée en ohms (Ω).</p>"},
      {niveau:"Difficile", enonce:"<p><strong>(TP circuit réel)</strong> Un générateur de $15\\,V$ alimente deux branches en parallèle : la branche de gauche contient une seule résistance $R_1 = 1\\,k\\Omega$ (intensité $I_1$) ; la branche de droite contient deux résistances $R_2 = 1\\,k\\Omega$ et $R_3 = 1\\,k\\Omega$ <strong>en série</strong> (intensité $I_2$). Les deux branches se rejoignent ensuite pour reformer le courant total $I$ délivré par le générateur.</p><p>Calcule $I_1$, $I_2$, puis $I$, et vérifie ta valeur de $I$ avec la loi des nœuds.</p>", aide:"Les deux branches sont soumises à la même tension U=15V (elles sont en parallèle, directement reliées au générateur). Calcule d'abord la résistance équivalente de la branche de droite (R2 et R3 en série), puis applique la loi d'Ohm séparément à chaque branche (I=U/R). Termine avec la loi des nœuds pour trouver I.", correction:"<p><strong>Branche de gauche (R1 seule)</strong> : $I_1 = \\dfrac{U}{R_1} = \\dfrac{15}{1000} = 0,015\\,A = 15\\,mA$</p><p><strong>Branche de droite (R2 et R3 en série)</strong> : $R_{23} = R_2 + R_3 = 1000+1000 = 2000\\,\\Omega$<br>$I_2 = \\dfrac{U}{R_{23}} = \\dfrac{15}{2000} = 0,0075\\,A = 7,5\\,mA$</p><p><strong>Loi des nœuds</strong> : $I = I_1 + I_2 = 15 + 7,5 = 22,5\\,mA$</p><p>C'est exactement ce type de circuit <strong>mixte</strong> (une branche simple en parallèle avec une branche qui contient elle-même des résistances en série) qu'il faut savoir décomposer étape par étape : d'abord réduire les séries à l'intérieur d'une branche, puis traiter le parallèle entre les branches.</p>"},
    ],
    flashcards: [
      {q:"Courant électrique — définition",a:"Un déplacement de charges électriques. Dans un conducteur métallique, ce sont toujours des électrons qui se déplacent.",score:0,interval:0,ease:2.5,due:null},
      {q:"Charge élémentaire e",a:"e = 1,602 × 10⁻¹⁹ C. La charge d'un système Q = n×e (n entier), en Coulomb (C).",score:0,interval:0,ease:2.5,due:null},
      {q:"Intensité I — formule et unité",a:"I = ΔQ/Δt, en ampère (A). ΔQ = variation de charge (C), Δt = durée (s).",score:0,interval:0,ease:2.5,due:null},
      {q:"Sens positif du courant — convention",a:"Le sens positif du courant correspond au sens OPPOSÉ du déplacement réel des électrons.",score:0,interval:0,ease:2.5,due:null},
      {q:"Ampèremètre — courant sortant par COM",a:"Si le courant sort par la borne COM, l'ampèremètre indique une intensité POSITIVE.",score:0,interval:0,ease:2.5,due:null},
      {q:"Ampèremètre — courant entrant par COM",a:"Si le courant entre par la borne COM, l'ampèremètre indique une intensité NÉGATIVE.",score:0,interval:0,ease:2.5,due:null},
      {q:"Intensité — grandeur algébrique",a:"L'intensité est une grandeur algébrique (positive ou négative) qui dépend de l'orientation choisie et du sens réel du courant.",score:0,interval:0,ease:2.5,due:null},
      {q:"Tension U_AB — définition et formule",a:"Différence de potentiel entre A et B : U_AB = V_A − V_B. Unité : volt (V). Flèche avec pointe en A, base en B.",score:0,interval:0,ease:2.5,due:null},
      {q:"Voltmètre — comment mesurer U_AB",a:"Relier la borne + en A (V+=V_A) et la borne COM en B (V_COM=V_B). Le voltmètre affiche alors U_mes = V_A−V_B = U_AB.",score:0,interval:0,ease:2.5,due:null},
      {q:"Nœud électrique — définition exacte",a:"Connexion où sont reliés au moins 3 dipôles ou 3 conducteurs.",score:0,interval:0,ease:2.5,due:null},
      {q:"Branche électrique — définition",a:"Portion de circuit ouverte comprise entre 2 nœuds voisins.",score:0,interval:0,ease:2.5,due:null},
      {q:"Maille électrique — définition",a:"Portion de circuit fermée, constituée de plusieurs branches, ne passant qu'une seule fois par un nœud donné.",score:0,interval:0,ease:2.5,due:null},
      {q:"Loi des mailles",a:"La somme algébrique des tensions rencontrées le long d'une maille est nulle.",score:0,interval:0,ease:2.5,due:null},
      {q:"Loi des mailles — règle de signe",a:"Signe − quand on rencontre une pointe de flèche tension, signe + quand on rencontre une base (ou l'inverse, du moment que c'est cohérent).",score:0,interval:0,ease:2.5,due:null},
      {q:"Loi des nœuds",a:"La somme algébrique des intensités entrantes dans un nœud est égale à la somme des intensités sortantes de ce nœud.",score:0,interval:0,ease:2.5,due:null},
      {q:"Additivité des tensions",a:"Pour 3 points A, B, C : U_AC = U_AB + U_BC (découle directement de U_AB=V_A−V_B).",score:0,interval:0,ease:2.5,due:null},
      {q:"Loi d'Ohm",a:"U_AB = R × I. R = résistance en ohms (Ω), coefficient directeur de la droite U_AB=R.I.",score:0,interval:0,ease:2.5,due:null},
      {q:"Résistance d'un conducteur — formule géométrique",a:"R = ρ×L/S. L = longueur (m), S = section droite (m²), ρ = résistivité du matériau (Ω.m).",score:0,interval:0,ease:2.5,due:null},
      {q:"Effet de la température sur la résistance (métaux)",a:"Pour la plupart des métaux : température ↘ ⟹ résistance ↘ (et inversement).",score:0,interval:0,ease:2.5,due:null},
      {q:"Résistance d'un conducteur de liaison (fil simple)",a:"Toujours considérée comme nulle.",score:0,interval:0,ease:2.5,due:null},
      {q:"Résistances en série — formule",a:"R_eq = R1 + R2 + ... + Rn. Même intensité dans toute la branche.",score:0,interval:0,ease:2.5,due:null},
      {q:"Résistances en parallèle — formule",a:"1/R_eq = 1/R1 + 1/R2 + ... + 1/Rn. Même tension aux bornes de chaque résistance.",score:0,interval:0,ease:2.5,due:null},
      {q:"Puissance électrique — 3 formules",a:"P = U×I = R×I² = U²/R. P en watts (W).",score:0,interval:0,ease:2.5,due:null},
      {q:"Méthode pour un circuit mixte (série + parallèle)",a:"D'abord réduire les résistances en série à l'intérieur de chaque branche (les additionner), puis traiter les branches ainsi simplifiées comme un circuit en parallèle (même tension U aux bornes de chaque branche, I = somme des intensités de chaque branche).",score:0,interval:0,ease:2.5,due:null},
    ]
  }
};
