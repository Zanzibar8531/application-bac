// ============================================================
// PHYSIQUE-CHIMIE — cours pédagogiques (électricité, mécanique & énergie, chimie)
// Les formules LaTeX sont écrites avec des doubles backslashes (\\) car ce sont des chaînes JavaScript.
// ============================================================
PREBUILT['Physique-Chimie'] = {
  "Mécanique & Énergie": {
    cours: `<h2>Mécanique &amp; Énergie</h2>

<h3>🎯 À la fin de ce chapitre, tu sauras…</h3>
<ul>
<li>décrire un mouvement (référentiel, trajectoire, vitesse) et <b>convertir km/h ↔ m/s</b> ;</li>
<li>distinguer <b>masse</b> et <b>poids</b> et représenter les forces qui agissent sur un objet ;</li>
<li>utiliser les <b>3 lois de Newton</b> pour prévoir un mouvement ;</li>
<li>calculer un <b>travail</b>, une <b>puissance</b>, une énergie <b>cinétique</b> et <b>potentielle</b> ;</li>
<li>utiliser la <b>conservation de l'énergie</b> (avec ou sans frottements) et un <b>rendement</b>.</li>
</ul>

<div class="retenir-box"><b>🧭 Trois questions pour t'orienter face à un exercice</b><br>
① <b>Je décris</b> un mouvement (où, à quelle vitesse, en combien de temps) → vitesse, $v = d/\\Delta t$.<br>
② <b>J'explique une cause</b> (pourquoi ça accélère ou pas) → forces, lois de Newton.<br>
③ <b>Je compare un « avant » et un « après »</b> (hauteur, vitesse, chaleur perdue) → énergies.</div>

<hr>

<h3>I. Décrire un mouvement</h3>
<ul>
<li><b>Référentiel</b> : l'objet par rapport auquel on décrit le mouvement. Un mouvement est <b>relatif</b> : un passager est immobile par rapport au train, mais il se déplace par rapport au quai.</li>
<li><b>Trajectoire</b> : l'ensemble des positions occupées : rectiligne, circulaire, curviligne.</li>
<li><b>Mouvement rectiligne uniforme (MRU)</b> : trajectoire droite et vitesse constante.</li>
</ul>
<div class="formula-box"><b>Vitesse moyenne : trois questions, une seule relation</b>
$$v = \\frac{d}{\\Delta t} \\qquad d = v\\times\\Delta t \\qquad \\Delta t = \\frac{d}{v}$$
$v$ en m/s, $d$ en m, $\\Delta t$ en s (ou km/h, km, h : mais <b>reste cohérent</b> dans le même système).<br>
<b>Conversion :</b> $1\\ \\text{m/s} = 3{,}6\\ \\text{km/h}$ car $1\\ \\text{km/h}=\\dfrac{1000\\ \\text{m}}{3600\\ \\text{s}}$.<br>
$\\;v_{\\text{km/h}} = v_{\\text{m/s}}\\times3{,}6\\;$ et $\\;v_{\\text{m/s}} = v_{\\text{km/h}}\\div3{,}6$.<br>
<b>Exemple.</b> $90\\ \\text{km/h} = 90/3{,}6 = 25\\ \\text{m/s}$. À cette vitesse, on parcourt $450\\ \\text{m}$ en $\\Delta t = 450/25 = 18\\ \\text{s}$.</div>
<div class="formula-box"><b>Accélération moyenne :</b> $a = \\dfrac{\\Delta v}{\\Delta t}$ (en m/s²) ; réciproques : $\\Delta v = a\\,\\Delta t$ et $\\Delta t = \\dfrac{\\Delta v}{a}$.<br>
<b>Exemple.</b> Une voiture passe de $0$ à $27\\ \\text{m/s}$ en $9\\ \\text{s}$ : $a = 27/9 = 3\\ \\text{m/s}^2$.</div>

<h3>II. Les forces</h3>
<p>Une <b>force</b> est l'action d'un objet sur un autre. Elle se représente par un <b>vecteur</b> défini par : son <b>point d'application</b>, sa <b>direction</b>, son <b>sens</b> et sa <b>valeur</b> en <b>newtons (N)</b>.</p>
<table class="user-table">
<tr><td><b>Force</b></td><td><b>Origine</b></td><td><b>Direction / sens</b></td></tr>
<tr><td>Poids $\\vec P$</td><td>attraction de la Terre</td><td>verticale, vers le bas</td></tr>
<tr><td>Réaction du support $\\vec R$</td><td>le sol « pousse » l'objet</td><td>perpendiculaire au support, vers l'objet</td></tr>
<tr><td>Tension $\\vec T$</td><td>fil ou câble tendu</td><td>le long du fil, vers le fil</td></tr>
<tr><td>Frottements $\\vec f$</td><td>contact avec le sol, l'air, l'eau</td><td>parallèle à la surface, <b>opposé au mouvement</b></td></tr>
</table>
<div class="formula-box"><b>Poids et masse : deux grandeurs différentes</b>
$$P = m\\times g \\qquad m = \\frac{P}{g}$$
$m$ en <b>kg</b> (ne change jamais) · $P$ en <b>N</b> (dépend du lieu) · $g\\approx 9{,}8\\ \\text{N/kg}$ sur Terre (≈ $1{,}6$ sur la Lune).<br>
<b>Exemple.</b> $m = 70\\ \\text{kg}$ : $P = 70\\times9{,}8 = 686\\ \\text{N}$ sur Terre, mais seulement $70\\times1{,}6 = 112\\ \\text{N}$ sur la Lune. La masse, elle, reste $70\\ \\text{kg}$.</div>

<h3>III. Les trois lois de Newton</h3>
<div class="formula-box"><b>1<sup>re</sup> loi — principe d'inertie.</b> Si la somme des forces est nulle, l'objet est <b>immobile</b> ou en <b>MRU</b> (et réciproquement).
$$\\sum\\vec F=\\vec 0\\;\\Longleftrightarrow\\;\\text{repos ou MRU}$$
<b>Exemple.</b> Un livre posé sur une table : $\\vec P + \\vec R = \\vec 0$, donc $R = P$.</div>
<div class="formula-box"><b>2<sup>e</sup> loi — principe fondamental de la dynamique.</b> La somme des forces est égale à la masse fois l'accélération :
$$\\sum F = m\\times a \\qquad a = \\frac{\\sum F}{m} \\qquad m = \\frac{\\sum F}{a}$$
<b>Exemple.</b> Une voiture de $1200\\ \\text{kg}$ subit une force motrice de $3000\\ \\text{N}$ et des frottements de $600\\ \\text{N}$ : $\\sum F = 3000 - 600 = 2400\\ \\text{N}$ ; $a = 2400/1200 = 2\\ \\text{m/s}^2$.<br>
<b>Lecture :</b> à force égale, plus la masse est grande, plus l'accélération est petite.</div>
<div class="formula-box"><b>3<sup>e</sup> loi — action-réaction.</b> Si A exerce une force sur B, alors B exerce sur A une force de <b>même valeur</b>, de <b>même direction</b> et de <b>sens opposé</b>.
$$\\vec F_{A/B} = -\\vec F_{B/A}$$
<b>Attention :</b> ces deux forces s'appliquent sur <b>deux objets différents</b>, donc elles ne s'annulent <b>pas</b>.</div>
<div class="formula-box"><b>Chute libre</b> (hypothèse à préciser dans l'énoncé : on <b>néglige les frottements</b>, seul le poids agit ; départ sans vitesse) : $a = g$ ; $\\;v = g\\,t\\;$ ; $\\;h = \\dfrac12 g\\,t^2$.<br>
<b>Exemple.</b> Après $t = 2\\ \\text{s}$ : $v = 9{,}8\\times2 = 19{,}6\\ \\text{m/s}$ et $h = \\tfrac12\\times9{,}8\\times4 = 19{,}6\\ \\text{m}$.</div>

<hr>

<h3>IV. Travail et puissance d'une force</h3>
<div class="formula-box"><b>Travail d'une force constante</b> lors d'un déplacement rectiligne de longueur $d$ :
$$W = F\\times d\\times\\cos\\theta \\qquad (\\text{en joules, J})$$
$\\theta$ est l'angle entre la force et le déplacement.<br>
• $\\theta = 0°$ : $W = F\\,d$ &gt; 0 → travail <b>moteur</b>.<br>
• $\\theta = 90°$ : $W = 0$ → la force ne travaille pas (poids sur un sol horizontal).<br>
• $\\theta = 180°$ : $W = -F\\,d$ &lt; 0 → travail <b>résistant</b> (frottements).<br>
Réciproque (cas $\\theta=0°$) : $F = \\dfrac{W}{d}$ et $d = \\dfrac{W}{F}$.</div>
<div class="formula-box"><b>Puissance</b> : $P = \\dfrac{W}{\\Delta t}$ (en watts) ; si la force est dans le sens du mouvement : $P = F\\times v$.<br>
Réciproques : $W = P\\times\\Delta t$ et $\\Delta t = \\dfrac{W}{P}$.<br>
<b>Exemple.</b> Une grue soulève une charge avec une force de $5000\\ \\text{N}$ sur $12\\ \\text{m}$ en $20\\ \\text{s}$ : $W = 5000\\times12 = 60\\,000\\ \\text{J}$ ; $P = 60\\,000/20 = 3000\\ \\text{W}$.</div>

<h3>V. Les énergies</h3>
<div class="formula-box"><b>Énergie cinétique</b> (liée à la vitesse) : $E_c = \\dfrac12\\,m\\,v^2$ &nbsp;→&nbsp; $v = \\sqrt{\\dfrac{2E_c}{m}}$<br>
<b>Énergie potentielle de pesanteur</b> (liée à la hauteur) : $E_{pp} = m\\,g\\,h$ &nbsp;→&nbsp; $h = \\dfrac{E_{pp}}{m\\,g}$<br>
<b>Énergie mécanique</b> : $E_m = E_c + E_{pp}$ (en joules).<br>
<b>Lecture :</b> si la vitesse <b>double</b>, $E_c$ est multipliée par <b>4</b> (car $v^2$). La masse, elle, joue de façon proportionnelle.</div>
<div class="retenir-box"><b>Conservation et non-conservation de l'énergie mécanique</b><br>
• <b>Sans frottements</b> : $E_m$ reste constante : l'énergie potentielle se transforme en énergie cinétique (et inversement).<br>
• <b>Avec frottements</b> : $E_m$ <b>diminue</b> ; la variation est égale au travail des frottements : $\\Delta E_m = W_{f} < 0$. L'énergie « perdue » n'a pas disparu : elle est devenue de la <b>chaleur</b>.</div>
<div class="formula-box"><b>Exemple résolu — chute d'une balle (sans frottements).</b> Une balle est lâchée de $h = 5\\ \\text{m}$ ($g\\approx10\\ \\text{N/kg}$).<br>
① Au départ : $E_c = 0$ et $E_{pp} = m g h$. À l'arrivée au sol : $E_{pp}=0$.<br>
② Conservation : $\\tfrac12 m v^2 = m g h$. On remarque que <b>$m$ se simplifie</b>.<br>
③ $v = \\sqrt{2 g h} = \\sqrt{2\\times10\\times5} = 10\\ \\text{m/s}$ (soit $36\\ \\text{km/h}$), quelle que soit la masse de la balle.</div>

<h3>VI. Chaîne d'énergie et rendement (STI2D)</h3>
<p>Une <b>chaîne d'énergie</b> relie : une <b>source</b> → un <b>convertisseur</b> (moteur, alternateur…) → un <b>récepteur/actionneur</b>. À chaque étape, une partie de l'énergie est perdue sous forme de chaleur.</p>
<div class="formula-box">$$\\eta = \\frac{P_{\\text{utile}}}{P_{\\text{absorbée}}}\\quad(\\eta\\le1)\\qquad P_{\\text{utile}}=\\eta\\,P_{\\text{abs}}\\qquad P_{\\text{abs}}=\\frac{P_{\\text{utile}}}{\\eta}\\qquad P_{\\text{abs}}=P_{\\text{utile}}+P_{\\text{pertes}}$$
<b>Exemple.</b> Un moteur absorbe $2000\\ \\text{W}$ et fournit $1600\\ \\text{W}$ de puissance mécanique : $\\eta = 1600/2000 = 0{,}80$ (80 %) ; pertes $=400\\ \\text{W}$.</div>

<h3>VII. Quelle loi choisir ?</h3>
<table class="user-table">
<tr><td><b>Le texte parle de…</b></td><td><b>J'utilise…</b></td></tr>
<tr><td>distance, durée, vitesse</td><td>$v = d/\\Delta t$</td></tr>
<tr><td>« pourquoi accélère-t-il ? », « force nécessaire »</td><td>$\\sum F = m\\,a$</td></tr>
<tr><td>vitesse <b>avant/après</b>, hauteur, sans calculer le temps</td><td>énergies : $E_c$, $E_{pp}$, conservation</td></tr>
<tr><td>frottements, chaleur perdue</td><td>$\\Delta E_m = W_f$</td></tr>
<tr><td>moteur, puissance fournie, perte</td><td>$P = W/\\Delta t$ et $\\eta$</td></tr>
</table>

<div class="attention-box"><b>⚠️ Erreurs fréquentes</b><br>
• Confondre <b>masse</b> (kg) et <b>poids</b> (N) : $P = m\\,g$.<br>
• Oublier de convertir <b>km/h en m/s</b> avant d'utiliser $E_c = \\tfrac12 m v^2$.<br>
• Penser que doubler la vitesse double l'énergie cinétique : elle est multipliée par 4.<br>
• Croire que le poids et la réaction d'un support forment une paire « action-réaction » : elles agissent sur le <b>même</b> objet.<br>
• Écrire que l'énergie mécanique se conserve alors qu'il y a des frottements.<br>
• Oublier que le travail d'une force peut être <b>négatif</b>.</div>

<h3>VIII. Teste-toi sans calculatrice</h3>
<details><summary>1) Un objet se déplace en MRU. La somme des forces vaut…</summary>Zéro (1<sup>re</sup> loi de Newton).</details>
<details><summary>2) La vitesse d'une voiture passe de 50 à 100 km/h : de combien est multipliée son énergie cinétique ?</summary>Par 4 ($E_c\\propto v^2$).</details>
<details><summary>3) Quelle est la masse d'un objet dont le poids est de 98 N sur Terre ?</summary>$m = P/g = 98/9{,}8 = 10\\ \\text{kg}$.</details>
<details><summary>4) Un moteur a un rendement de 0,9 et fournit 900 W utiles : quelle puissance absorbe-t-il ?</summary>$P_{abs} = 900/0{,}9 = 1000\\ \\text{W}$.</details>`,
    flashcards: [
      { q: `2e loi de Newton (PFD)`, a: `$\\sum \\vec{F} = m\\vec{a}$. La somme vectorielle des forces appliquées = masse × vecteur accélération. Unités : N = kg·m/s².` },
      { q: `Énergie cinétique`, a: `$E_c = \\frac{1}{2}mv^2$ en joules. Dépend de la masse (kg) et du carré de la vitesse (m/s).` },
      { q: `Énergie potentielle de pesanteur`, a: `$E_{pp} = mgh$. m en kg, g ≈ 9,8 m/s², h en mètres. Référence choisie arbitrairement.` },
      { q: `Conservation de l'énergie mécanique`, a: `$E_m = E_c + E_{pp} = \\text{constante}$ en l'absence de frottements.` },
      { q: `Travail d'une force`, a: `$W = F \\cdot d \\cdot \\cos\\theta$. Moteur si W > 0, résistant si W < 0.` },
      { q: `Chute libre — équations horaires`, a: `$v(t) = v_0 + gt$ et $h(t) = h_0 + v_0 t + \\frac{1}{2}gt^2$. En l'absence de frottements.` },
      { q: `Vitesse : les trois formes de la relation ?`, a: `v = d / Δt ; d = v × Δt ; Δt = d / v (unités cohérentes : m, s, m/s ou km, h, km/h).` },
      { q: `Comment passer de km/h à m/s ?`, a: `On divise par 3,6 (90 km/h = 25 m/s). Pour l'inverse, on multiplie par 3,6.` },
      { q: `Différence entre masse et poids ?`, a: `La masse (kg) est une quantité de matière, constante. Le poids (N) est une force : P = m × g, il dépend du lieu.` },
      { q: `Je connais le poids et g, je cherche la masse : formule ?`, a: `m = P / g.` },
      { q: `2e loi de Newton : les trois formes ?`, a: `ΣF = m × a ; a = ΣF / m ; m = ΣF / a.` },
      { q: `À force égale, que devient l'accélération si la masse double ?`, a: `Elle est divisée par 2 (a = ΣF / m).` },
      { q: `Les deux forces d'une paire action-réaction s'annulent-elles ?`, a: `Non : elles s'appliquent sur deux objets différents (A sur B et B sur A).` },
      { q: `Énergie cinétique : formule et formule inverse pour la vitesse ?`, a: `Ec = ½ × m × v² ; v = √(2 × Ec / m).` },
      { q: `Si la vitesse double, que devient l'énergie cinétique ?`, a: `Elle est multipliée par 4 (Ec est proportionnelle à v²).` },
      { q: `Énergie potentielle de pesanteur et hauteur inverse ?`, a: `Epp = m × g × h ; h = Epp / (m × g).` },
      { q: `Quand l'énergie mécanique se conserve-t-elle ?`, a: `Sans frottements : Em = Ec + Epp reste constante. Avec frottements : ΔEm = W(frottements) < 0, l'énergie perdue devient de la chaleur.` },
      { q: `Travail d'une force constante : formule et signe selon l'angle ?`, a: `W = F × d × cos θ (en J). θ = 0° : moteur (> 0) ; θ = 90° : nul ; θ = 180° : résistant (< 0).` },
      { q: `Rendement : formule et formules inverses ?`, a: `η = P_utile / P_absorbée (toujours ≤ 1) ; P_utile = η × P_abs ; P_abs = P_utile / η.` },
      { q: `Chute sans frottements depuis une hauteur h : vitesse à l'arrivée ?`, a: `v = √(2 × g × h) : elle ne dépend pas de la masse.` }
    ],
    exercices: [
      {
        niveau: "Facile",
        enonce: `<p>Un objet de masse $m = 2\\ \\text{kg}$ tombe en chute libre depuis une hauteur de $h = 5\\ \\text{m}$, sans vitesse initiale. Calcule sa vitesse à l'arrivée au sol (on prend $g = 10\\ \\text{m/s}^2$).</p>`,
        aide: `Utilise la conservation de l'énergie mécanique : E_c au sol = E_pp perdue (puisque v_0 = 0, toute l'énergie potentielle se transforme en énergie cinétique).`,
        correction: `<p>Par conservation de l'énergie mécanique (sans frottements) : $E_{pp,initiale} = E_{c,finale}$</p><p>$mgh = \\tfrac{1}{2}mv^2 \\Rightarrow v^2 = 2gh = 2\\times10\\times5 = 100$</p><p>$v = \\sqrt{100} = 10\\ \\text{m/s}$ (la masse se simplifie : elle ne change pas le résultat).</p>`
      },
      {
        niveau: "Facile",
        enonce: `<b>Vitesse, distance, durée.</b><br>a) Convertis $108\\ \\text{km/h}$ en m/s.<br>b) À cette vitesse, en combien de temps parcourt-on $450\\ \\text{m}$ ?<br>c) Quelle distance parcourt-on en $2\\ \\text{min}$ à $54\\ \\text{km/h}$ (réponse en km) ?`,
        aide: `Divise par $3{,}6$ pour passer de km/h à m/s. Utilise $\\Delta t = d/v$ puis $d = v\\times\\Delta t$, en secondes et en mètres.`,
        correction: `a) $108/3{,}6 = 30\\ \\text{m/s}$.<br>b) $\\Delta t = d/v = 450/30 = 15\\ \\text{s}$.<br>c) $54\\ \\text{km/h} = 15\\ \\text{m/s}$ ; $2\\ \\text{min} = 120\\ \\text{s}$ ; $d = 15\\times120 = 1800\\ \\text{m} = 1{,}8\\ \\text{km}$.`
      },
      {
        niveau: "Facile",
        enonce: `<b>Masse ou poids ?</b> Un astronaute de $80\\ \\text{kg}$ part sur la Lune ($g_{Lune}\\approx1{,}6\\ \\text{N/kg}$ ; $g_{Terre}\\approx9{,}8\\ \\text{N/kg}$).<br>a) Calcule son poids sur Terre puis sur la Lune.<br>b) Sa masse change-t-elle ?<br>c) Un pèse-personne sur Terre indique $60\\ \\text{kg}$ pour une personne : quel est son poids ?`,
        aide: `$P = m\\times g$. La masse est une quantité de matière : elle ne dépend pas du lieu.`,
        correction: `a) Terre : $P = 80\\times9{,}8 = 784\\ \\text{N}$ ; Lune : $P = 80\\times1{,}6 = 128\\ \\text{N}$.<br>b) Non : la masse reste $80\\ \\text{kg}$.<br>c) $P = 60\\times9{,}8 = 588\\ \\text{N}$ (le pèse-personne mesure en réalité une force et l'affiche en kg).`
      },
      {
        niveau: "Moyen",
        enonce: `<p>Une force de $50\\ \\text{N}$ déplace un objet de $3\\ \\text{m}$ selon un angle de $60°$ par rapport à la direction du déplacement. Calcule le travail de cette force, puis la puissance développée si le déplacement dure $2\\ \\text{s}$.</p>`,
        aide: `Utilise W = F·d·cos(θ), puis P = W/Δt. cos(60°) = 0,5.`,
        correction: `<p>$W = F\\cdot d\\cdot\\cos\\theta = 50\\times3\\times\\cos(60°) = 50\\times3\\times0{,}5 = 75\\ \\text{J}$</p><p>$P = \\dfrac{W}{\\Delta t} = \\dfrac{75}{2} = 37{,}5\\ \\text{W}$</p>`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Utiliser la 2<sup>e</sup> loi de Newton dans les deux sens.</b> Une voiture de $1200\\ \\text{kg}$ subit une force motrice de $3000\\ \\text{N}$ et des frottements de $600\\ \\text{N}$.<br>a) Calcule son accélération, puis sa vitesse (en km/h) après $5\\ \\text{s}$ en partant du repos.<br>b) Quelle force motrice faut-il pour atteindre $100\\ \\text{km/h}$ en $10\\ \\text{s}$ (frottements toujours de $600\\ \\text{N}$) ?`,
        aide: `a) $\\sum F = F_{moteur} - f$, puis $a = \\sum F/m$, puis $v = a\\,\\Delta t$. b) Cherche d'abord l'accélération nécessaire, puis $\\sum F = m\\,a$, puis $F_{moteur} = \\sum F + f$.`,
        correction: `a) $\\sum F = 3000-600 = 2400\\ \\text{N}$ ; $a = 2400/1200 = 2\\ \\text{m/s}^2$ ; $v = 2\\times5 = 10\\ \\text{m/s} = 36\\ \\text{km/h}$.<br>b) $100\\ \\text{km/h} = 27{,}8\\ \\text{m/s}$ ; $a = 27{,}8/10 = 2{,}78\\ \\text{m/s}^2$ ; $\\sum F = 1200\\times2{,}78 \\approx 3333\\ \\text{N}$ ; $F_{moteur} = 3333+600 \\approx 3933\\ \\text{N}$ (≈ 3,9 kN).`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Forces et action-réaction.</b> Un livre est posé sur une table.<br>a) Fais le bilan des forces sur le livre. Que peux-tu dire de leur somme ? Pourquoi ?<br>b) Le poids du livre et la réaction de la table forment-ils une paire « action-réaction » ? Justifie.<br>c) Quelle est la force qui forme une paire d'action-réaction avec le poids du livre ?`,
        aide: `Une paire action-réaction concerne <b>deux objets</b> : A sur B, et B sur A. Pense à qui attire qui.`,
        correction: `a) Poids $\\vec P$ (vers le bas) et réaction $\\vec R$ (vers le haut) : le livre est immobile, donc $\\sum\\vec F=\\vec0$ et $R = P$ (1<sup>re</sup> loi).<br>b) Non : $\\vec P$ et $\\vec R$ s'appliquent sur le <b>même</b> objet (le livre).<br>c) Le livre attire la Terre : la force exercée <b>par le livre sur la Terre</b> a la même valeur que $P$ et le sens opposé.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Pourquoi la vitesse est dangereuse.</b> Une voiture de $1000\\ \\text{kg}$ roule à $50\\ \\text{km/h}$ puis à $100\\ \\text{km/h}$.<br>a) Calcule son énergie cinétique dans chaque cas (en kJ).<br>b) Par quel facteur est-elle multipliée ?<br>c) Les freins exercent une force constante de $8000\\ \\text{N}$ : calcule la distance de freinage dans chaque cas avec $W = F\\times d$ (toute l'énergie cinétique est absorbée).<br>d) Conclus.`,
        aide: `Convertis en m/s avant d'utiliser $E_c = \\tfrac12 m v^2$. Pour c), $d = E_c/F$.`,
        correction: `a) $50\\ \\text{km/h} = 13{,}9\\ \\text{m/s}$ : $E_c = \\tfrac12\\times1000\\times13{,}9^2 \\approx 96\\ \\text{kJ}$. $100\\ \\text{km/h} = 27{,}8\\ \\text{m/s}$ : $E_c = \\tfrac12\\times1000\\times27{,}8^2 \\approx 386\\ \\text{kJ}$.<br>b) Facteur $\\approx 4$.<br>c) $d = E_c/F$ : $96\\,000/8000 \\approx 12\\ \\text{m}$ et $386\\,000/8000 \\approx 48\\ \\text{m}$.<br>d) Doubler la vitesse multiplie la distance de freinage par 4 (car $E_c\\propto v^2$) : la vitesse est bien plus dangereuse qu'on ne l'imagine.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Rendement d'un moteur.</b><br>a) Un moteur absorbe $2000\\ \\text{W}$ et fournit $1600\\ \\text{W}$ de puissance mécanique. Calcule son rendement et ses pertes.<br>b) Il fonctionne $3\\ \\text{h}$ : quelle énergie est perdue en kWh ?<br>c) Un autre moteur doit fournir $5\\ \\text{kW}$ utiles avec un rendement de $0{,}9$ : quelle puissance doit-il absorber ?`,
        aide: `$\\eta = P_{utile}/P_{abs}$ ; pertes $= P_{abs}-P_{utile}$ ; $P_{abs}=P_{utile}/\\eta$.`,
        correction: `a) $\\eta = 1600/2000 = 0{,}80$ (80 %) ; pertes $= 2000-1600 = 400\\ \\text{W}$.<br>b) $E_{pertes} = 0{,}4\\ \\text{kW}\\times3\\ \\text{h} = 1{,}2\\ \\text{kWh}$.<br>c) $P_{abs} = 5/0{,}9 \\approx 5{,}56\\ \\text{kW}$.`
      },
      {
        niveau: "Difficile",
        enonce: `<p>Un skieur de masse $m=70\\ \\text{kg}$ part du sommet d'une piste sans vitesse initiale et arrive en bas, 20 m plus bas, avec une vitesse de $18\\ \\text{m/s}$. L'énergie mécanique s'est-elle conservée ? Justifie par le calcul (on prend $g=10\\ \\text{m/s}^2$).</p>`,
        aide: `Calcule l'énergie mécanique en haut (seulement E_pp car v_0 = 0) puis en bas (E_c + E_pp = 0 en prenant le bas comme référence), et compare les deux valeurs.`,
        correction: `<p><strong>En haut</strong> (référence de hauteur = bas de la piste) : $E_{m,haut} = E_{pp} = mgh = 70\\times10\\times20 = 14000\\ \\text{J}$ ($v=0$ donc $E_c=0$).</p><p><strong>En bas</strong> : $E_{m,bas} = E_c = \\tfrac{1}{2}mv^2 = \\tfrac{1}{2}\\times70\\times18^2 = 11340\\ \\text{J}$.</p><p>$14000\\ \\text{J} \\neq 11340\\ \\text{J}$ : l'énergie mécanique n'est <strong>pas conservée</strong> — il y a eu des frottements (ski/neige, air) qui ont dissipé environ $2660\\ \\text{J}$ sous forme de chaleur.</p>`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Avec ou sans frottements ?</b> Un objet de $2\\ \\text{kg}$ est lâché sans vitesse d'une hauteur de $1{,}8\\ \\text{m}$ sur une glissière ($g = 10\\ \\text{N/kg}$).<br>a) Sans frottements : quelle est sa vitesse en bas ?<br>b) En réalité, il arrive à $5\\ \\text{m/s}$. Calcule l'énergie perdue et le travail des frottements.<br>c) Quel pourcentage de l'énergie initiale a été « perdu » ? Où est-elle passée ?`,
        aide: `a) conservation de l'énergie mécanique : $m g h = \\tfrac12 m v^2$. b) $\\Delta E_m = E_{m,final} - E_{m,initial}$ et $\\Delta E_m = W_{f}$.`,
        correction: `a) $v = \\sqrt{2gh} = \\sqrt{2\\times10\\times1{,}8} = \\sqrt{36} = 6\\ \\text{m/s}$.<br>b) $E_{m,initial} = mgh = 2\\times10\\times1{,}8 = 36\\ \\text{J}$ ; $E_{m,final} = \\tfrac12\\times2\\times5^2 = 25\\ \\text{J}$ ; $\\Delta E_m = 25-36 = -11\\ \\text{J}$, donc $W_f = -11\\ \\text{J}$ (travail résistant).<br>c) $11/36 \\approx 31\\ \\%$. Cette énergie est devenue de la <b>chaleur</b> (échauffement de l'objet et de la glissière).`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Lancer vers le haut.</b> Une balle de $0{,}2\\ \\text{kg}$ est lancée verticalement à $12\\ \\text{m/s}$ ($g = 10\\ \\text{N/kg}$).<br>a) Sans frottements, quelle hauteur maximale atteint-elle ?<br>b) Si la balle avait une masse deux fois plus grande, cette hauteur changerait-elle ? Explique avec les formules.<br>c) En réalité, elle monte seulement à $6{,}0\\ \\text{m}$ : quelle énergie a été dissipée ?`,
        aide: `En haut, la vitesse est nulle : toute l'énergie cinétique initiale est devenue potentielle.`,
        correction: `a) $\\tfrac12 m v^2 = m g h$ donc $h = \\dfrac{v^2}{2g} = \\dfrac{144}{20} = 7{,}2\\ \\text{m}$.<br>b) Non : $m$ se simplifie, $h = v^2/(2g)$ ne dépend pas de la masse.<br>c) $E_{c,0} = \\tfrac12\\times0{,}2\\times144 = 14{,}4\\ \\text{J}$ ; $E_{pp} = 0{,}2\\times10\\times6{,}0 = 12\\ \\text{J}$ ; énergie dissipée $= 14{,}4-12 = 2{,}4\\ \\text{J}$ (≈ 17 %).`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Une grue à la loupe.</b> Une grue soulève une charge de $500\\ \\text{kg}$ sur $12\\ \\text{m}$ en $20\\ \\text{s}$ à vitesse constante ($g=10\\ \\text{N/kg}$).<br>a) Quelle force le câble exerce-t-il sur la charge ? Justifie par une loi de Newton.<br>b) Calcule le travail de cette force et la puissance utile.<br>c) Le rendement de l'ensemble est de $75\\ \\%$ : quelle puissance la grue absorbe-t-elle ? quelle énergie perd-elle pendant la montée ?`,
        aide: `Vitesse constante ⇒ $\\sum\\vec F=\\vec0$ (1<sup>re</sup> loi). Pour c), $P_{abs}=P_{utile}/\\eta$ et $E = P\\times t$.`,
        correction: `a) Vitesse constante donc $\\sum\\vec F=\\vec0$ : la tension du câble compense le poids : $T = m g = 500\\times10 = 5000\\ \\text{N}$.<br>b) $W = T\\times h = 5000\\times12 = 60\\,000\\ \\text{J}$ ; $P_{utile} = 60\\,000/20 = 3000\\ \\text{W}$.<br>c) $P_{abs} = 3000/0{,}75 = 4000\\ \\text{W}$ ; énergie absorbée $= 4000\\times20 = 80\\,000\\ \\text{J}$ ; pertes $= 80\\,000-60\\,000 = 20\\,000\\ \\text{J}$.`
      }
    ]
  },
  "Chimie — Solutions aqueuses": {
    cours: `<h2>Chimie — Solutions aqueuses</h2>

<h3>🎯 À la fin de ce chapitre, tu sauras…</h3>
<ul>
<li>distinguer <b>solvant</b>, <b>soluté</b> et <b>solution</b>, et <b>dissolution</b> de <b>dilution</b> ;</li>
<li>calculer une <b>quantité de matière</b> ($n = m/M$) et une <b>concentration</b> ($C = n/V$), <b>dans les deux sens</b> ;</li>
<li>décrire comment <b>préparer</b> une solution et comment <b>diluer</b> ;</li>
<li>passer du <b>pH</b> à la concentration en ions oxonium, et inversement ;</li>
<li>exploiter un <b>titrage</b> acido-basique.</li>
</ul>

<h3>🧭 Le vocabulaire de base</h3>
<table class="user-table">
<tr><td><b>Mot</b></td><td><b>Sens</b></td><td><b>Exemple : eau salée</b></td></tr>
<tr><td>Solvant</td><td>le liquide qui dissout (le plus abondant)</td><td>l'eau</td></tr>
<tr><td>Soluté</td><td>l'espèce dissoute</td><td>le sel NaCl</td></tr>
<tr><td>Solution</td><td>le mélange homogène obtenu</td><td>l'eau salée</td></tr>
<tr><td>Solution aqueuse</td><td>solution dont le solvant est l'<b>eau</b></td><td>l'eau salée</td></tr>
</table>
<div class="formula-box"><b>Dissolution d'un solide ionique :</b> $\\text{NaCl}_{(s)} \\longrightarrow \\text{Na}^+_{(aq)} + \\text{Cl}^-_{(aq)}$<br>
Une mole de NaCl dissoute libère une mole de $\\text{Na}^+$ <b>et</b> une mole de $\\text{Cl}^-$ : dans la solution, $[\\text{Na}^+]=[\\text{Cl}^-]=C$.</div>

<hr>

<h3>I. La quantité de matière</h3>
<p>Pour compter des atomes ou des molécules, on les regroupe en <b>paquets</b> : la <b>mole</b>. Une mole contient $N_A = 6{,}02\\times10^{23}\\ \\text{mol}^{-1}$ entités.</p>
<div class="formula-box"><b>Trois formules, une seule idée</b> (la masse molaire $M$ est la masse d'une mole)
$$n = \\frac{m}{M} \\qquad m = n\\times M \\qquad M = \\frac{m}{n}$$
$n$ en <b>mol</b> · $m$ en <b>g</b> · $M$ en <b>g/mol</b>. Nombre d'entités : $N = n\\times N_A$.<br>
<b>Masse molaire d'une molécule</b> : on additionne les masses molaires atomiques. Exemple : $M(\\text{NaCl}) = 23{,}0 + 35{,}5 = 58{,}5\\ \\text{g/mol}$ ; $M(\\text{H}_2\\text{O}) = 2\\times1{,}0+16{,}0 = 18{,}0\\ \\text{g/mol}$.<br>
<b>Exemple.</b> $11{,}7\\ \\text{g}$ de NaCl : $n = 11{,}7/58{,}5 = 0{,}200\\ \\text{mol}$. Réciproque : pour $0{,}250\\ \\text{mol}$, $m = 0{,}250\\times58{,}5 \\approx 14{,}6\\ \\text{g}$.</div>

<h3>II. Les concentrations</h3>
<div class="formula-box"><b>Concentration molaire</b> (en mol/L) : $C = \\dfrac{n}{V}$ &nbsp;→&nbsp; $n = C\\times V$ &nbsp;→&nbsp; $V = \\dfrac{n}{C}$<br>
<b>Concentration massique</b> (en g/L) : $C_m = \\dfrac{m}{V}$.<br>
<b>Le lien entre les deux :</b> $C_m = C\\times M$ et $C = \\dfrac{C_m}{M}$.<br>
$V$ est <b>toujours en litres</b> : $1\\ \\text{L} = 1\\ \\text{dm}^3 = 1000\\ \\text{mL} = 1000\\ \\text{cm}^3$.<br>
<b>Exemple.</b> $0{,}200\\ \\text{mol}$ dissoutes pour obtenir $250\\ \\text{mL}$ de solution : $C = 0{,}200/0{,}250 = 0{,}80\\ \\text{mol/L}$ et $C_m = 0{,}80\\times58{,}5 = 46{,}8\\ \\text{g/L}$.</div>

<h3>III. Préparer une solution par dissolution</h3>
<div class="formula-box"><b>Exemple résolu :</b> préparer $250\\ \\text{mL}$ de solution de NaCl à $0{,}10\\ \\text{mol/L}$.<br>
① Quantité à dissoudre : $n = C\\times V = 0{,}10\\times0{,}250 = 0{,}0250\\ \\text{mol}$.<br>
② Masse à peser : $m = n\\times M = 0{,}0250\\times58{,}5 \\approx 1{,}46\\ \\text{g}$.<br>
③ <b>Protocole :</b> peser $1{,}46\\ \\text{g}$ de NaCl (balance, coupelle) → les verser dans une <b>fiole jaugée de 250 mL</b> avec un peu d'eau distillée → agiter jusqu'à dissolution → <b>compléter avec de l'eau distillée jusqu'au trait de jauge</b> → boucher et homogénéiser.</div>

<h3>IV. La dilution</h3>
<p>Diluer, c'est <b>ajouter du solvant</b> à une solution (la <b>solution mère</b>) pour obtenir une solution <b>moins concentrée</b> (la <b>solution fille</b>). Ce qui ne change pas : la <b>quantité de matière de soluté</b> prélevée.</p>
<div class="formula-box">$$n_{\\text{mère}} = n_{\\text{fille}}\\quad\\Longrightarrow\\quad C_{\\text{mère}}\\times V_{\\text{mère}} = C_{\\text{fille}}\\times V_{\\text{fille}}$$
Réciproques : $V_{\\text{mère}} = \\dfrac{C_{\\text{fille}}\\times V_{\\text{fille}}}{C_{\\text{mère}}}$ et $C_{\\text{fille}} = \\dfrac{C_{\\text{mère}}\\times V_{\\text{mère}}}{V_{\\text{fille}}}$.<br>
<b>Facteur de dilution :</b> $F = \\dfrac{C_{\\text{mère}}}{C_{\\text{fille}}} = \\dfrac{V_{\\text{fille}}}{V_{\\text{mère}}}$ ($F > 1$).<br>
<b>Exemple.</b> Préparer $100\\ \\text{mL}$ à $0{,}10\\ \\text{mol/L}$ à partir d'une solution à $1{,}0\\ \\text{mol/L}$ : $V_{\\text{mère}} = \\dfrac{0{,}10\\times100}{1{,}0} = 10\\ \\text{mL}$ ($F = 10$).<br>
<b>Protocole :</b> prélever $10\\ \\text{mL}$ à la <b>pipette jaugée</b> → les verser dans une <b>fiole jaugée de 100 mL</b> → compléter avec de l'eau jusqu'au trait de jauge → homogénéiser.</div>
<div class="attention-box"><b>⚠️ Dissolution ≠ dilution.</b> Dissolution : on met un soluté dans un solvant. Dilution : on ajoute du solvant à une solution <b>déjà préparée</b>. Et on complète <b>jusqu'au trait de jauge</b> : ajouter « 100 mL d'eau » à 10 mL donne 110 mL, pas 100 mL.</div>

<hr>

<h3>V. pH et acidité</h3>
<div class="formula-box"><b>Définition</b> (avec $[\\text{H}_3\\text{O}^+]$ en mol/L) :
$$\\text{pH} = -\\log\\left[\\text{H}_3\\text{O}^+\\right] \\qquad \\left[\\text{H}_3\\text{O}^+\\right] = 10^{-\\text{pH}}$$
<b>Acide :</b> $\\text{pH}<7$ · <b>Neutre :</b> $\\text{pH}=7$ · <b>Basique :</b> $\\text{pH}>7$ (à $25\\,°\\text{C}$).<br>
<b>Exemples.</b> $\\text{pH}=3 \\Rightarrow [\\text{H}_3\\text{O}^+] = 10^{-3}\\ \\text{mol/L}$. Et $[\\text{H}_3\\text{O}^+] = 2{,}5\\times10^{-5}\\ \\text{mol/L} \\Rightarrow \\text{pH} = -\\log(2{,}5\\times10^{-5}) \\approx 4{,}6$.</div>
<div class="retenir-box"><b>L'échelle de pH est logarithmique :</b> quand le pH baisse de <b>1</b>, la concentration en $\\text{H}_3\\text{O}^+$ est multipliée par <b>10</b>. Une solution à pH 2 est donc <b>1000 fois</b> plus riche en ions oxonium qu'une solution à pH 5.</div>

<h3>VI. Couples acide/base et eau</h3>
<ul>
<li><b>Acide</b> : espèce capable de <b>céder</b> un proton $\\text{H}^+$ (<mark>donneur</mark>). <b>Base</b> : espèce capable de <b>capter</b> un proton (<mark>accepteur</mark>).</li>
<li>Un <b>couple</b> acide/base s'écrit $\\text{AH}/\\text{A}^-$ avec la demi-équation $\\text{AH} = \\text{A}^- + \\text{H}^+$. Exemple : $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$.</li>
<li>Une réaction acide-base est un <b>transfert de proton</b> : $\\text{AH} + \\text{B} \\rightleftharpoons \\text{A}^- + \\text{BH}^+$.</li>
<li>Produit ionique de l'eau : $K_e = [\\text{H}_3\\text{O}^+]\\,[\\text{OH}^-] = 10^{-14}$ à $25\\,°\\text{C}$, donc $\\text{pH}+\\text{pOH}=14$.</li>
</ul>

<h3>VII. Le titrage acido-basique</h3>
<p>Titrer, c'est déterminer une concentration inconnue en faisant réagir la solution avec une solution de concentration connue, jusqu'à l'<b>équivalence</b> : le moment où les réactifs ont été introduits dans les <b>proportions de l'équation</b>.</p>
<div class="formula-box">Pour une réaction acide/base « <b>1 pour 1</b> » (monoacide + monobase) :
$$n_a = n_b \\quad\\Longrightarrow\\quad C_a\\times V_a = C_b\\times V_{b,\\text{éq}} \\quad\\Longrightarrow\\quad C_a = \\frac{C_b\\times V_{b,\\text{éq}}}{V_a}$$
<b>Exemple.</b> On titre $V_a = 20{,}0\\ \\text{mL}$ d'acide par une base à $C_b = 0{,}10\\ \\text{mol/L}$ ; l'équivalence est atteinte pour $V_b = 15{,}0\\ \\text{mL}$ : $C_a = \\dfrac{0{,}10\\times15{,}0}{20{,}0} = 0{,}075\\ \\text{mol/L}$.<br>
(Les deux volumes sont en mL : le rapport $V_b/V_a$ n'a pas besoin d'être converti.) <b>Cette relation n'est valable que si l'acide et la base réagissent 1 pour 1.</b></div>

<div class="attention-box"><b>⚠️ Erreurs fréquentes</b><br>
• Oublier de convertir les <b>mL en L</b> avant de calculer $C = n/V$.<br>
• Confondre <b>$C$ (mol/L)</b> et <b>$C_m$ (g/L)</b> : on passe de l'une à l'autre avec $M$.<br>
• Confondre <b>dissolution</b> et <b>dilution</b>, ou ne pas compléter jusqu'au trait de jauge.<br>
• Croire qu'une solution fille peut être plus concentrée que la solution mère.<br>
• Croire qu'un écart de pH de 1 correspond à un écart de concentration de 1 : c'est un facteur 10.<br>
• Utiliser $C_aV_a = C_bV_b$ pour une réaction qui n'est pas « 1 pour 1 ».</div>

<h3>VIII. Teste-toi sans calculatrice</h3>
<details><summary>1) Quelle est la masse d'une mole de NaCl ?</summary>$58{,}5\\ \\text{g}$ ($M = 23{,}0 + 35{,}5$).</details>
<details><summary>2) Une solution à 0,2 mol/L est diluée 10 fois : concentration finale ?</summary>$0{,}02\\ \\text{mol/L}$ (on divise par le facteur de dilution).</details>
<details><summary>3) pH 3 puis pH 5 : laquelle contient le plus d'ions oxonium, et de combien ?</summary>pH 3, avec un facteur $10^{2} = 100$.</details>
<details><summary>4) Tu prélèves 5 mL d'une solution à 1 mol/L et complètes à 50 mL : concentration obtenue ?</summary>$C = 1\\times5/50 = 0{,}1\\ \\text{mol/L}$.</details>`,
    flashcards: [
      { q: `pH — définition et formule`, a: `$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]$. Mesure l'acidité. Inversement proportionnel à la concentration en H₃O⁺.` },
      { q: `Couple acide/base conjugué`, a: `AH (acide, donneur H⁺) et A⁻ (base conjuguée, accepteur H⁺). Ex : CH₃COOH / CH₃COO⁻. Demi-équation : $AH = A^- + H^+$` },
      { q: `Concentration molaire`, a: `$C = n/V$. n en moles, V en litres (L). S'exprime en mol/L ou mol·L⁻¹.` },
      { q: `Équivalence d'un titrage`, a: `À l'équivalence, les réactifs sont en proportions stœchiométriques : $C_a V_a = C_b V_b$ (pour monoacide/monobase).` },
      { q: `Produit ionique de l'eau`, a: `$K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14}$ à 25°C. pH + pOH = 14.` },
      { q: `Quantité de matière : les trois formes ?`, a: `n = m / M ; m = n × M ; M = m / n (n en mol, m en g, M en g/mol).` },
      { q: `Nombre d'entités à partir de la quantité de matière ?`, a: `N = n × N_A, avec N_A = 6,02 × 10²³ mol⁻¹.` },
      { q: `Concentration molaire : les trois formes ?`, a: `C = n / V ; n = C × V ; V = n / C (V toujours en litres).` },
      { q: `Lien entre concentration massique et molaire ?`, a: `Cm = C × M (g/L) et C = Cm / M.` },
      { q: `Convertir 250 mL, 30 cL et 2 cm³ en litres`, a: `250 mL = 0,250 L ; 30 cL = 0,30 L ; 2 cm³ = 2 mL = 0,002 L.` },
      { q: `Dissolution ou dilution ?`, a: `Dissolution : on met un soluté dans un solvant. Dilution : on ajoute du solvant à une solution déjà préparée.` },
      { q: `Relation de dilution et pourquoi elle est vraie ?`, a: `C_mère × V_mère = C_fille × V_fille, car la quantité de matière de soluté prélevée ne change pas.` },
      { q: `Facteur de dilution et volume à prélever ?`, a: `F = C_mère / C_fille = V_fille / V_mère ; V_mère = V_fille / F.` },
      { q: `Pourquoi compléter jusqu'au trait de jauge ?`, a: `Pour que le volume final soit exactement celui prévu : ajouter « un volume d'eau » ne donne pas le bon volume final.` },
      { q: `pH et concentration en ions oxonium : formules ?`, a: `pH = −log [H3O+] ; [H3O+] = 10^(−pH) mol/L.` },
      { q: `Si le pH baisse de 1 unité, que devient [H3O+] ?`, a: `Elle est multipliée par 10 (échelle logarithmique).` },
      { q: `Équation de dissolution du chlorure de sodium ?`, a: `NaCl(s) → Na⁺(aq) + Cl⁻(aq).` },
      { q: `Condition de validité de Ca × Va = Cb × Vb ?`, a: `À l'équivalence, pour une réaction acide-base 1 pour 1 (monoacide + monobase).` }
    ],
    exercices: [
      {
        niveau: "Facile",
        enonce: `Une solution a une concentration en ions $\\text{H}_3\\text{O}^+$ de $10^{-3}\\ \\text{mol/L}$. Calcule son pH. Cette solution est-elle acide, neutre ou basique ?`,
        aide: `$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+]$.`,
        correction: `$\\text{pH} = -\\log(10^{-3}) = 3$. Comme $\\text{pH} < 7$, la solution est <b>acide</b>.`
      },
      {
        niveau: "Facile",
        enonce: `<b>Quantité de matière dans les deux sens.</b> M(NaCl) = 58,5 g/mol.<br>a) Quelle quantité de matière représentent $5{,}85\\ \\text{g}$ de NaCl ?<br>b) Quelle masse de NaCl faut-il peser pour avoir $0{,}25\\ \\text{mol}$ ?`,
        aide: `$n = m/M$ et $m = n\\times M$.`,
        correction: `a) $n = 5{,}85/58{,}5 = 0{,}100\\ \\text{mol}$.<br>b) $m = 0{,}25\\times58{,}5 = 14{,}6\\ \\text{g}$.`
      },
      {
        niveau: "Facile",
        enonce: `<b>Concentration molaire et volume.</b><br>a) On dissout $0{,}05\\ \\text{mol}$ de soluté pour obtenir $250\\ \\text{mL}$ de solution : calcule $C$.<br>b) Quel volume de solution à $0{,}60\\ \\text{mol/L}$ contient $0{,}30\\ \\text{mol}$ de soluté ?`,
        aide: `Convertis les mL en L. Pour b), utilise $V = n/C$.`,
        correction: `a) $C = n/V = 0{,}05/0{,}250 = 0{,}20\\ \\text{mol/L}$.<br>b) $V = n/C = 0{,}30/0{,}60 = 0{,}50\\ \\text{L} = 500\\ \\text{mL}$.`
      },
      {
        niveau: "Moyen",
        enonce: `On dissout $n = 0{,}2\\ \\text{mol}$ d'un soluté dans de l'eau pour obtenir $V = 500\\ \\text{mL}$ de solution. Calcule la concentration molaire $C$ (attention aux unités).`,
        aide: `Convertis le volume en litres avant de diviser.`,
        correction: `$V = 500\\ \\text{mL} = 0{,}5\\ \\text{L}$ ; $C = \\dfrac{n}{V} = \\dfrac{0{,}2}{0{,}5} = 0{,}4\\ \\text{mol/L}$.<br>Piège classique évité : oublier de convertir les mL en L avant de diviser.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Préparer une solution.</b> Le glucose $\\text{C}_6\\text{H}_{12}\\text{O}_6$ a pour masses molaires atomiques : C = 12,0 ; H = 1,0 ; O = 16,0 g/mol. On veut préparer $500\\ \\text{mL}$ de solution à $0{,}10\\ \\text{mol/L}$.<br>a) Calcule la masse molaire du glucose.<br>b) Calcule la masse à peser.<br>c) Décris le protocole (verrerie incluse).`,
        aide: `Masse molaire = somme des masses atomiques. Ensuite $n = C\\times V$ puis $m = n\\times M$.`,
        correction: `a) $M = 6\\times12{,}0 + 12\\times1{,}0 + 6\\times16{,}0 = 72+12+96 = 180\\ \\text{g/mol}$.<br>b) $n = C\\,V = 0{,}10\\times0{,}500 = 0{,}050\\ \\text{mol}$ ; $m = 0{,}050\\times180 = 9{,}0\\ \\text{g}$.<br>c) Peser $9{,}0\\ \\text{g}$ de glucose, les verser dans une <b>fiole jaugée de 500 mL</b> avec un peu d'eau distillée, agiter pour dissoudre, puis <b>compléter jusqu'au trait de jauge</b> et homogénéiser.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Dilution.</b> On dispose d'une solution mère à $0{,}50\\ \\text{mol/L}$. On veut $200\\ \\text{mL}$ de solution fille à $0{,}050\\ \\text{mol/L}$.<br>a) Quel est le facteur de dilution ?<br>b) Quel volume de solution mère faut-il prélever ?<br>c) Quelle verrerie utilises-tu ? Décris les étapes.`,
        aide: `Quantité de matière conservée : $C_m V_m = C_f V_f$.`,
        correction: `a) $F = C_m/C_f = 0{,}50/0{,}050 = 10$.<br>b) $V_m = \\dfrac{C_f V_f}{C_m} = \\dfrac{0{,}050\\times200}{0{,}50} = 20\\ \\text{mL}$ (ou $200/10$).<br>c) <b>Pipette jaugée de 20 mL</b> pour prélever, <b>fiole jaugée de 200 mL</b> pour la solution fille ; on verse les 20 mL dans la fiole, on complète avec de l'eau distillée jusqu'au trait de jauge et on homogénéise.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Raisonner sur le pH.</b> La solution A a un pH de 2 et la solution B un pH de 5.<br>a) Laquelle est la plus acide ? Calcule $[\\text{H}_3\\text{O}^+]$ pour chacune.<br>b) Combien de fois l'une est-elle plus concentrée en $\\text{H}_3\\text{O}^+$ que l'autre ?<br>c) On dilue 10 fois la solution A (acide fort) : prévois son nouveau pH sans calculer de logarithme.`,
        aide: `$[\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}$. Une unité de pH correspond à un facteur 10.`,
        correction: `a) A est la plus acide : $[\\text{H}_3\\text{O}^+]_A = 10^{-2} = 0{,}01\\ \\text{mol/L}$ ; $[\\text{H}_3\\text{O}^+]_B = 10^{-5}\\ \\text{mol/L}$.<br>b) $10^{-2}/10^{-5} = 10^{3} = 1000$ fois plus concentrée.<br>c) Diluer 10 fois divise $[\\text{H}_3\\text{O}^+]$ par 10 : le pH <b>augmente de 1</b>, soit pH = 3 (pour un acide fort).`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Le sérum physiologique.</b> Il contient $9{,}0\\ \\text{g}$ de NaCl par litre (M = 58,5 g/mol).<br>a) Quelle est sa concentration molaire ?<br>b) Quelle masse de NaCl contient un flacon de $500\\ \\text{mL}$ ? Quelle quantité de matière ?`,
        aide: `$C = C_m/M$ ; pour la masse, utilise $m = C_m\\times V$.`,
        correction: `a) $C = \\dfrac{C_m}{M} = \\dfrac{9{,}0}{58{,}5} \\approx 0{,}154\\ \\text{mol/L}$.<br>b) $m = C_m\\,V = 9{,}0\\times0{,}500 = 4{,}5\\ \\text{g}$ ; $n = 4{,}5/58{,}5 \\approx 0{,}077\\ \\text{mol}$.`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Repère l'erreur de protocole.</b> Pour préparer $100\\ \\text{mL}$ de solution à $0{,}10\\ \\text{mol/L}$ à partir d'une solution à $1{,}0\\ \\text{mol/L}$, un élève prélève $10\\ \\text{mL}$ de solution mère, puis ajoute <b>100 mL d'eau</b>.<br>a) Quel volume final obtient-il ?<br>b) Quelle est alors la concentration réelle ?<br>c) Quel est l'écart avec la valeur visée (en %) ? Corrige le protocole.`,
        aide: `La quantité de matière prélevée est bonne, mais regarde le volume final.`,
        correction: `a) $10 + 100 = 110\\ \\text{mL}$ (et non 100 mL).<br>b) $C = \\dfrac{1{,}0\\times10}{110} \\approx 0{,}091\\ \\text{mol/L}$.<br>c) Écart $= \\dfrac{0{,}10-0{,}091}{0{,}10} \\approx 9\\ \\%$. Correction : verser les $10\\ \\text{mL}$ dans une <b>fiole jaugée de 100 mL</b> et <b>compléter jusqu'au trait de jauge</b> (environ 90 mL d'eau).`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Doser un acide.</b> On titre $V_a = 10{,}0\\ \\text{mL}$ d'acide chlorhydrique de concentration inconnue par de la soude à $C_b = 0{,}10\\ \\text{mol/L}$. L'équivalence est obtenue pour $V_{b,\\text{éq}} = 12{,}5\\ \\text{mL}$.<br>a) Justifie que $C_aV_a = C_bV_{b,\\text{éq}}$ est utilisable ici.<br>b) Calcule $C_a$.<br>c) L'acide chlorhydrique est un acide fort : en déduis le pH de la solution de départ.`,
        aide: `Réaction acide-base 1 pour 1 ; pour un acide fort monoacide, $[\\text{H}_3\\text{O}^+] = C_a$.`,
        correction: `a) HCl est un monoacide et $\\text{HO}^-$ une monobase : ils réagissent 1 pour 1, donc $n_a = n_b$ à l'équivalence.<br>b) $C_a = \\dfrac{0{,}10\\times12{,}5}{10{,}0} = 0{,}125\\ \\text{mol/L}$.<br>c) $[\\text{H}_3\\text{O}^+] = 0{,}125\\ \\text{mol/L}$ donc $\\text{pH} = -\\log(0{,}125) \\approx 0{,}90$.`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Jusqu'où peut-on dissoudre ?</b> La solubilité du chlorure de sodium dans l'eau est d'environ $360\\ \\text{g/L}$ à $20\\,°\\text{C}$ (M = 58,5 g/mol).<br>a) Quelle masse maximale de NaCl peut-on dissoudre dans $100\\ \\text{mL}$ d'eau ?<br>b) Quelle concentration molaire maximale obtient-on ?<br>c) On essaie de dissoudre $100\\ \\text{g}$ dans $100\\ \\text{mL}$ : que se passe-t-il ? Quelle masse reste solide ?`,
        aide: `Proportionnalité : la solubilité est une concentration massique maximale ; convertis ensuite en mol/L avec $M$.`,
        correction: `a) $m_{max} = 360\\times0{,}100 = 36\\ \\text{g}$.<br>b) $C_{max} = 360/58{,}5 \\approx 6{,}2\\ \\text{mol/L}$.<br>c) La solution est <b>saturée</b> : seuls $36\\ \\text{g}$ se dissolvent, il reste $100-36 = 64\\ \\text{g}$ de sel solide au fond.`
      }
    ]
  },
  "Électricité — circuits & lois de base": {
    cours: `<h2>Électricité — circuits &amp; lois de base</h2>

<h3>🎯 À la fin de ce chapitre, tu sauras…</h3>
<ul>
<li>lire un schéma et repérer <b>nœuds</b>, <b>branches</b> et <b>mailles</b> ;</li>
<li>utiliser la <b>loi d'Ohm dans les 3 sens</b> (chercher $U$, $I$ ou $R$) sans te tromper d'unité ;</li>
<li>calculer la <b>résistance équivalente</b> de résistances en série ou en parallèle ;</li>
<li>appliquer la <b>loi des mailles</b> et la <b>loi des nœuds</b> ;</li>
<li>calculer une <b>puissance</b>, une <b>énergie</b> et un <b>coût</b> ;</li>
<li>vérifier qu'un résultat est <b>plausible</b> avant de l'écrire.</li>
</ul>

<h3>🧭 Avant de commencer : trois grandeurs, une image</h3>
<p>Imagine un circuit d'eau avec une pompe et des tuyaux. L'électricité se comporte de façon comparable :</p>
<table class="user-table">
<tr><td><b>Grandeur</b></td><td><b>Image de l'eau</b></td><td><b>Symbole · unité</b></td><td><b>Appareil</b></td><td><b>Se branche…</b></td></tr>
<tr><td>Intensité du courant</td><td>le <b>débit</b> dans le tuyau</td><td>$I$ · ampère (A)</td><td>ampèremètre</td><td>en <b>série</b> (dans la branche)</td></tr>
<tr><td>Tension</td><td>la <b>différence de pression</b> entre deux points</td><td>$U$ · volt (V)</td><td>voltmètre</td><td>en <b>dérivation</b> (aux bornes)</td></tr>
<tr><td>Résistance</td><td>l'<b>étroitesse</b> du tuyau</td><td>$R$ · ohm (Ω)</td><td>ohmmètre</td><td>composant <b>hors circuit</b></td></tr>
</table>
<p>Plus la pression est forte, plus le débit est grand. Plus le tuyau est étroit, plus le débit est faible. <b>Garde cette phrase en tête : c'est exactement la loi d'Ohm.</b> (L'image sert à comprendre, jamais à calculer.)</p>

<div class="attention-box"><b>⚠️ Règle d'or des unités.</b> On calcule <b>toujours</b> en unités de base : ampère (A), volt (V), ohm (Ω). On convertit <b>avant</b> de calculer :<br>
$1\\ \\text{mA} = 10^{-3}\\ \\text{A} = 0{,}001\\ \\text{A}$ · $1\\ \\mu\\text{A} = 10^{-6}\\ \\text{A}$ · $1\\ \\text{k}\\Omega = 10^{3}\\ \\Omega = 1000\\ \\Omega$ · $1\\ \\text{M}\\Omega = 10^{6}\\ \\Omega$<br>
Exemple : $15\\ \\text{mA} = 15\\times 10^{-3} = 0{,}015\\ \\text{A}$.</div>

<hr>

<h3>I. Le courant électrique</h3>
<p>Un courant électrique correspond à un <mark>déplacement de charges électriques</mark>. Les porteurs de charge sont soit des électrons (charge négative $-e$), soit des protons (charge positive $+e$). Dans les conducteurs métalliques (fils et câbles en cuivre ou en aluminium), les porteurs de charge sont <mark>toujours des électrons</mark>.</p>
<div class="formula-box">Charge élémentaire : $e = 1{,}602\\times10^{-19}\\ \\text{C}$. La charge d'un système est $Q = n\\times e$ ($n$ entier), exprimée en coulombs (C).</div>

<h4>Intensité du courant électrique</h4>
<p>L'intensité correspond à la <mark>quantité de charges électriques qui traverse une section droite d'un conducteur, par unité de temps</mark>.</p>
<div class="formula-box latex-block">$$I = \\frac{\\Delta Q}{\\Delta t}$$
$I$ en ampères (A) · $\\Delta Q$ = variation de la quantité de charges (C) · $\\Delta t$ = durée en secondes (s), avec $\\Delta t = t_{final}-t_{initial}$.<br>
<b>Les 3 questions possibles :</b> $\\;I = \\dfrac{\\Delta Q}{\\Delta t}\\;$ · $\\;\\Delta Q = I\\times\\Delta t\\;$ · $\\;\\Delta t = \\dfrac{\\Delta Q}{I}$<br>
<b>Exemple.</b> Un courant de $2\\ \\text{A}$ circule pendant $30\\ \\text{s}$ : $\\Delta Q = 2\\times30 = 60\\ \\text{C}$, soit $N = Q/e = 60/(1{,}602\\times10^{-19}) \\approx 3{,}7\\times10^{20}$ électrons.</div>

<h4>Orientation d'un circuit et mesure de l'intensité</h4>
<p>Par convention, le <mark>sens positif du courant</mark> est le sens <b>opposé</b> au déplacement réel des électrons. Pour étudier un circuit, on choisit <b>arbitrairement</b> un sens positif, indiqué par une flèche.</p>
<div class="formula-box">L'ampèremètre (symbole : cercle avec un A, borne COM) mesure l'intensité :<br>
— si le courant <mark>sort</mark> par la borne COM → l'ampèremètre indique une intensité <strong>positive</strong> ;<br>
— si le courant <mark>entre</mark> par la borne COM → l'ampèremètre indique une intensité <strong>négative</strong>.</div>
<div class="retenir-box"><strong>3 conclusions essentielles</strong> à retenir :<br>
1. Le sens positif choisi ne correspond pas forcément au sens réel du courant.<br>
2. L'intensité est une grandeur <mark>algébrique</mark> (positive ou négative) : elle dépend de l'orientation choisie ET du sens réel du courant.<br>
3. L'ampèremètre permet de connaître le sens réel du courant : si l'intensité affichée est positive, le sens réel est celui du sens positif choisi ; si elle est négative, le sens réel est opposé.</div>

<h3>II. La tension électrique</h3>
<p>La tension électrique est la <mark>différence de potentiel électrique</mark> entre 2 points d'un circuit. $V_A$ et $V_B$ sont les potentiels en $A$ et en $B$ ; on note $U_{AB}$ la tension entre $A$ et $B$ :</p>
<div class="formula-box latex-block">$$U_{AB} = V_A - V_B$$
Unité : le volt (V). $U_{AB}$ est représentée par une flèche dont la <mark>pointe est en A</mark> et la <mark>base est en B</mark>.<br>
Le potentiel et la tension sont aussi des grandeurs <strong>algébriques</strong> (positives ou négatives) : $U_{BA} = -U_{AB}$.</div>
<h4>Mesure de la tension</h4>
<p>Le voltmètre (symbole V, bornes + et COM) indique $U_{mes} = (V_{+}) - (V_{COM})$. Il se branche <b>en dérivation</b>, entre les deux points.</p>
<ul>
<li>Tension d'un générateur (pile, alimentation) : on parle de <b>force électromotrice</b> (f.é.m.) notée $E$ quand on néglige ses pertes.</li>
<li>Interrupteur <b>fermé</b> : $U = 0$ ; <b>ouvert</b> : $I = 0$.</li>
</ul>

<h3>III. Branche, maille et nœud</h3>
<div class="formula-box">
<strong>Nœud</strong> : connexion où sont reliés au moins <mark>3 dipôles ou 3 conducteurs</mark> (là où le courant se partage).<br>
<strong>Branche</strong> : portion de circuit ouverte comprise entre 2 nœuds voisins (une suite de dipôles en série).<br>
<strong>Maille</strong> : portion de circuit fermée, constituée de plusieurs branches, ne passant qu'une <mark>seule fois</mark> par un nœud donné.
</div>
<p>Remarque : 2 points reliés par un simple conducteur (fil) ont le <b>même potentiel électrique</b>, donc une tension nulle entre eux.</p>

<h3>IV. Les lois de Kirchhoff</h3>
<h4>1. Loi des mailles</h4>
<p>La <mark>somme algébrique des tensions</mark> rencontrées le long d'une maille est nulle.</p>
<div class="formula-box"><strong>Méthode en 5 étapes :</strong><br>
1. Choisir un nœud de départ.<br>
2. Choisir un sens de parcours de la maille.<br>
3. Flécher toutes les tensions rencontrées le long de la maille.<br>
4. Attribuer un signe <strong>−</strong> à la tension lorsqu'on rencontre une <mark>pointe</mark> de flèche tension, et un signe <strong>+</strong> lorsqu'on rencontre une <mark>base</mark> de flèche (ou l'inverse — peu importe, du moment que c'est cohérent sur toute la maille).<br>
5. La somme des tensions ainsi signées est égale à 0.<br><br>
<b>Exemple.</b> Un générateur $E = 12\\ \\text{V}$ alimente deux dipôles en série : la maille donne $E = U_1+U_2$, donc $U_2 = E-U_1$. Avec $U_1 = 7{,}5\\ \\text{V}$ : $U_2 = 12-7{,}5 = 4{,}5\\ \\text{V}$.</div>
<h4>2. Loi des nœuds</h4>
<p>La somme algébrique des intensités des courants <mark>entrants</mark> dans un nœud est égale à la somme des intensités des courants <mark>sortants</mark> de ce nœud.</p>
<div class="formula-box">Exemple : si $I_1$ arrive à un nœud, et que $I_2$ et $I_4$ en repartent : $I_1 = I_2 + I_4$.<br>
Avec des valeurs : $I_1 = 8\\ \\text{A}$ et $I_2 = 5\\ \\text{A}$ donc $I_4 = 8-5 = 3\\ \\text{A}$.</div>
<h4>3. Additivité des tensions</h4>
<p>Elle découle directement de la définition d'une tension. Pour 3 points $A$, $B$, $C$ d'un circuit :</p>
<div class="formula-box latex-block">$$U_{AC} = U_{AB} + U_{BC}$$
Démonstration : $U_{AB}+U_{BC} = (V_A-V_B)+(V_B-V_C) = V_A-V_C = U_{AC}$.</div>

<hr>

<h3>V. La loi d'Ohm — le cœur du chapitre</h3>
<p>Un conducteur ohmique, <mark>à température constante</mark>, est tel que la tension à ses bornes est <mark>proportionnelle</mark> à l'intensité qui le traverse. Le coefficient de proportionnalité est la résistance $R$.</p>
<div class="formula-box latex-block">$$U_{AB} = R\\times I$$
$U$ en volts (V) · $R$ en ohms (Ω) · $I$ en ampères (A). $R$ est le <mark>coefficient directeur</mark> de la droite $U_{AB} = R\\cdot I$.</div>

<h4>🔁 Pourquoi il existe 3 formules (et comment les retrouver sans les apprendre)</h4>
<p>$U = R \\times I$ est une <b>multiplication</b>. Pour isoler une grandeur, on fait l'<b>opération inverse</b> des deux côtés, comme dans n'importe quelle équation :</p>
<ul>
<li>on veut $I$ : on <b>divise par $R$</b> des deux côtés → $\\dfrac{U}{R} = \\dfrac{R\\times I}{R}$ → $I = \\dfrac{U}{R}$ ;</li>
<li>on veut $R$ : on <b>divise par $I$</b> → $R = \\dfrac{U}{I}$.</li>
</ul>
<div class="retenir-box"><b>À retenir : une seule loi, trois lectures.</b><br>
$U = R\\times I$ (je cherche la tension) · $I = \\dfrac{U}{R}$ (je cherche l'intensité) · $R = \\dfrac{U}{I}$ (je cherche la résistance).<br>
<b>Moyen mnémotechnique :</b> dessine un triangle avec $U$ en haut, $R$ et $I$ en bas ; cache la grandeur cherchée, ce qui reste donne le calcul ($U$ au-dessus = on divise ; $R$ et $I$ côte à côte = on multiplie). Mais ne t'appuie pas dessus sans comprendre : le raisonnement par « opération inverse » marche toujours.</div>

<h4>🧪 Le test de l'unité : ton détecteur d'erreurs</h4>
<p>Avant de te fier à une formule, regarde les unités. $\\dfrac{U}{R}$ donne $\\dfrac{\\text{V}}{\\Omega}$ = A ✅ (un courant). Alors que $\\dfrac{R}{U}$ donnerait $\\dfrac{\\Omega}{\\text{V}}$, ce qui n'est <b>pas</b> des ampères ❌. C'est pour cela que <b>$I = U/R$ est juste et $I = R/U$ est faux</b>.</p>

<h4>🧠 Ce que dit la formule (raisonner sans calculer)</h4>
<ul>
<li>$R$ constante : si $U$ <b>double</b>, $I$ <b>double</b> (proportionnalité).</li>
<li>$U$ constante : si $R$ <b>double</b>, $I$ est <b>divisée par 2</b> (inverse : plus c'est résistant, moins ça passe).</li>
<li>Graphique $U = f(I)$ : c'est une <b>droite passant par l'origine</b> et sa <b>pente</b> vaut $R$. Si ce n'est pas une droite par l'origine, le dipôle <b>n'est pas ohmique</b> (diode, lampe à filament…).</li>
</ul>

<h4>✍️ Trois exemples résolus (un par grandeur cherchée)</h4>
<div class="formula-box"><b>Exemple 1 — je cherche $I$.</b> Une résistance $R = 220\\ \\Omega$ est soumise à $U = 5\\ \\text{V}$.<br>
① Je connais $U$ et $R$, je cherche $I$ → $I = U/R$.<br>
② Unités : tout est déjà en V et Ω.<br>
③ $I = \\dfrac{5}{220} \\approx 0{,}0227\\ \\text{A} \\approx 22{,}7\\ \\text{mA}$.<br>
④ Plausible ? Une petite résistance sous 5 V laisse passer quelques dizaines de mA ✅.</div>
<div class="formula-box"><b>Exemple 2 — je cherche $R$.</b> On mesure $U = 6\\ \\text{V}$ et $I = 30\\ \\text{mA}$.<br>
① Je cherche $R$ → $R = U/I$.<br>
② Conversion : $30\\ \\text{mA} = 0{,}030\\ \\text{A}$.<br>
③ $R = \\dfrac{6}{0{,}030} = 200\\ \\Omega$.</div>
<div class="formula-box"><b>Exemple 3 — je cherche $U$.</b> Dans une résistance $R = 1{,}5\\ \\text{k}\\Omega$ passe $I = 4\\ \\text{mA}$.<br>
① $U = R \\times I$.<br>
② Conversions : $1{,}5\\ \\text{k}\\Omega = 1500\\ \\Omega$ et $4\\ \\text{mA} = 0{,}004\\ \\text{A}$.<br>
③ $U = 1500\\times 0{,}004 = 6\\ \\text{V}$.</div>

<h4>🧭 Quelle formule choisir ?</h4>
<table class="user-table">
<tr><td><b>Je connais…</b></td><td><b>Je cherche…</b></td><td><b>Formule</b></td></tr>
<tr><td>$R$ et $I$</td><td>$U$</td><td>$U = R\\times I$</td></tr>
<tr><td>$U$ et $R$</td><td>$I$</td><td>$I = U/R$</td></tr>
<tr><td>$U$ et $I$</td><td>$R$</td><td>$R = U/I$</td></tr>
</table>

<h4>📏 De quoi dépend la résistance d'un conducteur ?</h4>
<div class="retenir-box">Pour la plupart des métaux : température ↘ ⟹ résistance ↘ (et inversement). À température constante, $R$ ne dépend que de la <mark>nature du matériau</mark> et de sa <mark>forme géométrique</mark> :
$$R = \\frac{\\rho\\times L}{S}$$
$L$ : longueur (m) · $S$ : section droite (m²) · $\\rho$ : résistivité du matériau (Ω·m).<br>
<b>Lecture :</b> fil plus <b>long</b> → plus résistant · fil plus <b>gros</b> (section plus grande) → moins résistant. Réciproques : $L = \\dfrac{R\\,S}{\\rho}$ et $S = \\dfrac{\\rho\\,L}{R}$.</div>
<p>Les conducteurs de liaison (simples fils) ont toujours une résistance considérée comme <mark>nulle</mark>.</p>

<hr>

<h3>VI. Associer des résistances</h3>
<table class="user-table">
<tr><td></td><td><b>En série</b></td><td><b>En parallèle (dérivation)</b></td></tr>
<tr><td>Ce qui se conserve</td><td>la <b>même intensité</b> dans toute la branche</td><td>la <b>même tension</b> aux bornes de chaque branche</td></tr>
<tr><td>Ce qui s'additionne</td><td>les <b>tensions</b> : $U = U_1+U_2$</td><td>les <b>courants</b> : $I = I_1+I_2$</td></tr>
<tr><td>Résistance équivalente</td><td>$R_{eq} = R_1 + R_2 + \\dots$</td><td>$\\dfrac{1}{R_{eq}} = \\dfrac{1}{R_1}+\\dfrac{1}{R_2}+\\dots$</td></tr>
<tr><td>Effet</td><td>$R_{eq}$ est <b>plus grande</b> que la plus grande</td><td>$R_{eq}$ est <b>plus petite</b> que la plus petite</td></tr>
</table>
<div class="formula-box"><b>Raccourci pour 2 résistances en parallèle :</b> $R_{eq} = \\dfrac{R_1\\times R_2}{R_1+R_2}$ (« produit sur somme »). Deux résistances <b>identiques</b> en parallèle : $R_{eq} = R/2$.<br>
<b>Exemple.</b> $R_1 = 100\\ \\Omega$ et $R_2 = 300\\ \\Omega$ en parallèle : $R_{eq} = \\dfrac{100\\times 300}{400} = 75\\ \\Omega$. Test de plausibilité : $75 < 100$ ✅ (plus petite que la plus petite).</div>

<h3>VII. Le pont diviseur de tension (aller plus loin)</h3>
<p>Deux résistances $R_1$ et $R_2$ en <b>série</b> sous une tension $U$ se « partagent » la tension <b>proportionnellement à leur résistance</b> :</p>
<div class="formula-box">$$U_2 = U\\times\\frac{R_2}{R_1+R_2}$$
<b>Exemple.</b> $U = 9\\ \\text{V}$, $R_1 = 10\\ \\text{k}\\Omega$, $R_2 = 5\\ \\text{k}\\Omega$ : $U_2 = 9\\times\\dfrac{5}{15} = 3\\ \\text{V}$ (et $U_1 = 6\\ \\text{V}$ : la plus grande résistance prend la plus grande tension).</div>

<h3>VIII. Puissance et énergie électriques</h3>
<div class="formula-box">$$P = U\\times I$$
$P$ en watts (W) · $U$ en V · $I$ en A. Avec la loi d'Ohm on obtient aussi $P = R\\,I^2 = \\dfrac{U^2}{R}$.<br><br>
<b>Les 3 questions sur $P = U\\times I$ :</b> $\\;P = U\\,I\\;$ · $\\;I = \\dfrac{P}{U}\\;$ · $\\;U = \\dfrac{P}{I}$<br>
<b>Énergie :</b> $E = P\\times t$ — en <b>joules</b> si $t$ est en secondes ; en <b>Wh</b> ou <b>kWh</b> si $P$ est en W ou kW et $t$ en heures. $1\\ \\text{kWh} = 3{,}6\\times10^{6}\\ \\text{J}$.<br>
Réciproques : $P = \\dfrac{E}{t}$ et $t = \\dfrac{E}{P}$.</div>
<div class="formula-box"><b>Exemple résolu.</b> Un radiateur de $2000\\ \\text{W}$ sur le secteur ($230\\ \\text{V}$) :<br>
• Intensité : $I = P/U = 2000/230 \\approx 8{,}7\\ \\text{A}$.<br>
• Résistance : $R = U^2/P = 230^2/2000 \\approx 26\\ \\Omega$ (ou $R=U/I=230/8{,}7$ : même résultat).<br>
• Énergie en 3 h : $E = 2\\ \\text{kW}\\times 3\\ \\text{h} = 6\\ \\text{kWh}$ ; à $0{,}25\\ \\text{€/kWh}$ : $6\\times0{,}25 = 1{,}50\\ \\text{€}$.</div>

<hr>

<h3>IX. Méthode pour résoudre un problème de circuit</h3>
<ol>
<li><b>Redessine</b> le schéma et nomme chaque grandeur ($U_1$, $I_2$, $R_3$…).</li>
<li><b>Flèche</b> chaque courant et chaque tension (convention : flèche de courant dans le sens du courant, flèche de tension vers le + pour un générateur).</li>
<li><b>Repère</b> ce qui est en série et ce qui est en parallèle ; remplace par la résistance équivalente.</li>
<li><b>Écris</b> les lois utiles : Ohm, nœuds, mailles.</li>
<li><b>Convertis</b> les unités, puis <b>calcule</b> un résultat à la fois.</li>
<li><b>Vérifie</b> : unités, ordre de grandeur, et au moins une loi (nœuds ou mailles) sur ton résultat.</li>
</ol>

<div class="attention-box"><b>⚠️ Erreurs fréquentes</b><br>
• Écrire $I = R/U$ : fais le test de l'unité (Ω/V n'est pas un courant).<br>
• Calculer avec des mA ou des kΩ sans convertir.<br>
• Brancher l'ampèremètre en dérivation (il court-circuite le montage) ou le voltmètre en série (il bloque le courant).<br>
• Additionner les <b>courants</b> d'un montage série ou les <b>tensions</b> d'un montage parallèle : c'est l'inverse.<br>
• Trouver une résistance équivalente en parallèle <b>plus grande</b> que les branches.<br>
• Oublier qu'un résultat doit <b>avoir un sens physique</b> (une ampoule qui consomme 5 000 A, c'est qu'il y a une erreur d'unité).</div>

<h3>X. Teste-toi sans calculatrice</h3>
<details><summary>1) La tension double aux bornes d'une résistance : que devient le courant ?</summary>Il double ($I = U/R$, $R$ constante).</details>
<details><summary>2) Deux résistances de 100 Ω en parallèle : $R_{eq}$ ?</summary>50 Ω (identiques → on divise par 2).</details>
<details><summary>3) Comment trouver $R$ si on connaît $P$ et $U$ ?</summary>$R = U^2 / P$ (car $P = U^2/R$).</details>
<details><summary>4) Ton résultat donne $I = 3\\ 000\\ \\text{A}$ pour une lampe : que fais-tu ?</summary>Tu reviens chercher l'erreur (conversion d'unité la plupart du temps), car la valeur n'a pas de sens physique.</details>`,
    flashcards: [
      { q: `Courant électrique — définition`, a: `Un déplacement de charges électriques. Dans un conducteur métallique, ce sont toujours des électrons qui se déplacent.` },
      { q: `Charge élémentaire e`, a: `e = 1,602 × 10⁻¹⁹ C. La charge d'un système Q = n×e (n entier), en Coulomb (C).` },
      { q: `Intensité I — formule et unité`, a: `I = ΔQ/Δt, en ampère (A). ΔQ = variation de charge (C), Δt = durée (s).` },
      { q: `Sens positif du courant — convention`, a: `Le sens positif du courant correspond au sens OPPOSÉ du déplacement réel des électrons.` },
      { q: `Ampèremètre — courant sortant par COM`, a: `Si le courant sort par la borne COM, l'ampèremètre indique une intensité POSITIVE.` },
      { q: `Ampèremètre — courant entrant par COM`, a: `Si le courant entre par la borne COM, l'ampèremètre indique une intensité NÉGATIVE.` },
      { q: `Intensité — grandeur algébrique`, a: `L'intensité est une grandeur algébrique (positive ou négative) qui dépend de l'orientation choisie et du sens réel du courant.` },
      { q: `Tension U_AB — définition et formule`, a: `Différence de potentiel entre A et B : U_AB = V_A − V_B. Unité : volt (V). Flèche avec pointe en A, base en B.` },
      { q: `Voltmètre — comment mesurer U_AB`, a: `Relier la borne + en A (V+=V_A) et la borne COM en B (V_COM=V_B). Le voltmètre affiche alors U_mes = V_A−V_B = U_AB.` },
      { q: `Nœud électrique — définition exacte`, a: `Connexion où sont reliés au moins 3 dipôles ou 3 conducteurs.` },
      { q: `Branche électrique — définition`, a: `Portion de circuit ouverte comprise entre 2 nœuds voisins.` },
      { q: `Maille électrique — définition`, a: `Portion de circuit fermée, constituée de plusieurs branches, ne passant qu'une seule fois par un nœud donné.` },
      { q: `Loi des mailles`, a: `La somme algébrique des tensions rencontrées le long d'une maille est nulle.` },
      { q: `Loi des mailles — règle de signe`, a: `Signe − quand on rencontre une pointe de flèche tension, signe + quand on rencontre une base (ou l'inverse, du moment que c'est cohérent).` },
      { q: `Loi des nœuds`, a: `La somme algébrique des intensités entrantes dans un nœud est égale à la somme des intensités sortantes de ce nœud.` },
      { q: `Additivité des tensions`, a: `Pour 3 points A, B, C : U_AC = U_AB + U_BC (découle directement de U_AB=V_A−V_B).` },
      { q: `Loi d'Ohm`, a: `U_AB = R × I. R = résistance en ohms (Ω), coefficient directeur de la droite U_AB=R.I.` },
      { q: `Résistance d'un conducteur — formule géométrique`, a: `R = ρ×L/S. L = longueur (m), S = section droite (m²), ρ = résistivité du matériau (Ω.m).` },
      { q: `Effet de la température sur la résistance (métaux)`, a: `Pour la plupart des métaux : température ↘ ⟹ résistance ↘ (et inversement).` },
      { q: `Résistance d'un conducteur de liaison (fil simple)`, a: `Toujours considérée comme nulle.` },
      { q: `Résistances en série — formule`, a: `R_eq = R1 + R2 + ... + Rn. Même intensité dans toute la branche.` },
      { q: `Résistances en parallèle — formule`, a: `1/R_eq = 1/R1 + 1/R2 + ... + 1/Rn. Même tension aux bornes de chaque résistance.` },
      { q: `Puissance électrique — 3 formules`, a: `P = U×I = R×I² = U²/R. P en watts (W).` },
      { q: `Méthode pour un circuit mixte (série + parallèle)`, a: `D'abord réduire les résistances en série à l'intérieur de chaque branche (les additionner), puis traiter les branches ainsi simplifiées comme un circuit en parallèle (même tension U aux bornes de chaque branche, I = somme des intensités de chaque branche).` },
      { q: `Loi d'Ohm : les trois formes à connaître ?`, a: `U = R × I ; I = U / R ; R = U / I (U en V, I en A, R en Ω).` },
      { q: `Je connais U et R, je cherche I : quelle formule ?`, a: `I = U / R. Test d'unité : V / Ω = A.` },
      { q: `Je connais U et I, je cherche R : quelle formule ?`, a: `R = U / I (résultat en ohms).` },
      { q: `Je connais R et I, je cherche U : quelle formule ?`, a: `U = R × I (résultat en volts).` },
      { q: `Pourquoi I = R / U est-il faux ?`, a: `Parce que Ω / V n'est pas une unité de courant. Dans U = R × I, on isole I en divisant par R : I = U / R.` },
      { q: `On double la tension aux bornes d'un conducteur ohmique : que devient l'intensité ?`, a: `Elle double (I est proportionnelle à U quand R est constante).` },
      { q: `On double la résistance sous tension constante : que devient l'intensité ?`, a: `Elle est divisée par 2 (I = U / R : I et R sont inversement proportionnelles).` },
      { q: `Convertir : 15 mA ; 2,2 kΩ ; 470 µA en unités de base`, a: `15 mA = 0,015 A ; 2,2 kΩ = 2 200 Ω ; 470 µA = 0,00047 A.` },
      { q: `Comment retrouver I à partir de la puissance et de la tension ?`, a: `I = P / U ; et la résistance : R = U² / P.` },
      { q: `Énergie électrique : formule et unités ?`, a: `E = P × t. En joules si t est en secondes ; en Wh ou kWh si P est en W ou kW et t en heures. 1 kWh = 3,6 × 10⁶ J.` },
      { q: `Deux résistances en parallèle : raccourci de calcul ?`, a: `R_eq = (R1 × R2) / (R1 + R2). Le résultat est toujours plus petit que la plus petite des deux.` },
      { q: `Quatre vérifications à faire sur un résultat de circuit ?`, a: `1) unités cohérentes ; 2) ordre de grandeur plausible ; 3) parallèle : R_eq < plus petite branche ; 4) loi des nœuds ou des mailles vérifiée.` },
      { q: `Pont diviseur de tension : formule ?`, a: `U2 = U × R2 / (R1 + R2) : la plus grande résistance prend la plus grande part de la tension.` },
      { q: `Formule de la loi des mailles pour un générateur E et deux dipôles en série ?`, a: `E = U1 + U2, donc U2 = E − U1.` }
    ],
    exercices: [
      {
        niveau: "Facile",
        enonce: `<p>Un résistor de résistance $R = 1\\,000\\,\\Omega$ (1 kΩ) est soumis à une tension $U_{AB} = 15\\,V$. Calcule l'intensité I qui le traverse, en mA.</p>`,
        aide: `Utilise la loi d'Ohm sous la forme I = U/R (en isolant I). N'oublie pas de convertir le résultat en mA à la fin (×1000).`,
        correction: `<p>$U_{AB} = R \\times I \\Rightarrow I = \\dfrac{U_{AB}}{R} = \\dfrac{15}{1000} = 0,015\\,A = 15\\,mA$</p>`
      },
      {
        niveau: "Facile",
        enonce: `<b>Les trois sens de la loi d'Ohm.</b><br>a) Une résistance de $470\\ \\Omega$ est traversée par $20\\ \\text{mA}$ : quelle tension à ses bornes ?<br>b) Une résistance de $2{,}2\\ \\text{k}\\Omega$ est soumise à $12\\ \\text{V}$ : quelle intensité (en mA) ?<br>c) Sous $5\\ \\text{V}$, un dipôle ohmique laisse passer $25\\ \\text{mA}$ : quelle est sa résistance ?`,
        aide: `Pour chaque question, écris d'abord la grandeur que tu cherches, puis la formule. Convertis mA et kΩ <b>avant</b> de calculer.`,
        correction: `a) On cherche $U$ : $U = R\\times I$. $20\\ \\text{mA} = 0{,}020\\ \\text{A}$, donc $U = 470\\times0{,}020 = 9{,}4\\ \\text{V}$.<br>b) On cherche $I$ : $I = U/R$. $2{,}2\\ \\text{k}\\Omega = 2200\\ \\Omega$, donc $I = 12/2200 \\approx 0{,}00545\\ \\text{A} \\approx 5{,}5\\ \\text{mA}$.<br>c) On cherche $R$ : $R = U/I$. $25\\ \\text{mA} = 0{,}025\\ \\text{A}$, donc $R = 5/0{,}025 = 200\\ \\Omega$.`
      },
      {
        niveau: "Facile",
        enonce: `<b>Convertir avant de calculer.</b><br>a) $U = 3{,}3\\ \\text{V}$ aux bornes d'une résistance de $1{,}5\\ \\text{k}\\Omega$ : calcule $I$ en mA.<br>b) $U = 5\\ \\text{V}$ aux bornes d'une résistance de $1\\ \\text{M}\\Omega$ : calcule $I$ en µA.<br>c) Pourquoi le résultat de b) est-il très petit ? Que dit-on d'une résistance de $1\\ \\text{M}\\Omega$ ?`,
        aide: `$1\\ \\text{k}\\Omega = 10^3\\ \\Omega$, $1\\ \\text{M}\\Omega = 10^6\\ \\Omega$, $1\\ \\mu\\text{A} = 10^{-6}\\ \\text{A}$.`,
        correction: `a) $I = 3{,}3/1500 = 0{,}0022\\ \\text{A} = 2{,}2\\ \\text{mA}$.<br>b) $I = 5/10^{6} = 5\\times10^{-6}\\ \\text{A} = 5\\ \\mu\\text{A}$.<br>c) Plus $R$ est grande, plus $I$ est petite ($I = U/R$). Une résistance de $1\\ \\text{M}\\Omega$ est très « isolante » : elle laisse passer très peu de courant.`
      },
      {
        niveau: "Moyen",
        enonce: `<p>Un nœud reçoit un courant entrant $I_1 = 22,5\\,mA$. Il se divise en deux branches parallèles de même résistance $R = 1\\,k\\Omega$ chacune (donc même tension, donc même intensité $I_2$ dans chaque branche). Calcule $I_2$, puis vérifie avec la loi des nœuds.</p>`,
        aide: `Si les deux résistances sont identiques et en parallèle, le courant I1 se répartit à parts égales entre les deux branches (I2 = I1/2 dans chacune). Vérifie ensuite avec la loi des nœuds : I1 = I2 + I2.`,
        correction: `<p>Comme les deux résistances sont identiques et soumises à la même tension (parallèle), le courant se répartit également : $I_2 = \\dfrac{I_1}{2} = \\dfrac{22,5}{2} = 11,25\\,mA$ dans chaque branche.</p><p><strong>Vérification loi des nœuds</strong> : $I_1 = I_2 + I_2 = 11,25 + 11,25 = 22,5\\,mA$ ✓</p>`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Repère l'erreur.</b> Pour un conducteur ohmique de $300\\ \\Omega$ sous $9\\ \\text{V}$, un élève écrit : « $I = R/U = 300/9 = 33{,}3\\ \\text{A}$ ».<br>a) Pourquoi ce résultat doit-il t'alerter ?<br>b) Montre avec les unités que la formule est fausse.<br>c) Retrouve la bonne formule à partir de $U = R\\times I$, puis calcule $I$.`,
        aide: `Une résistance de quelques centaines d'ohms sous 9 V ne laisse pas passer 33 A. Compare les unités de $U/R$ et de $R/U$.`,
        correction: `a) 33 A est un courant énorme (un disjoncteur domestique saute à 16 A) : impossible avec une simple résistance sous 9 V. Un résultat absurde doit toujours faire douter.<br>b) $R/U$ s'exprime en $\\Omega/\\text{V}$, ce n'est pas des ampères. $U/R$ donne $\\text{V}/\\Omega = \\text{A}$ ✅.<br>c) $U = R\\times I$ ; on divise par $R$ des deux côtés : $I = U/R = 9/300 = 0{,}030\\ \\text{A} = 30\\ \\text{mA}$.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Que se passe-t-il si… ?</b> Un conducteur ohmique de $R = 50\\ \\Omega$ est sous $U = 10\\ \\text{V}$.<br>a) Calcule $I$ et la puissance $P$.<br>b) On <b>double</b> la tension ($20\\ \\text{V}$) : que devient $I$ ? Par quel facteur est multipliée $P$ ?<br>c) On revient à $10\\ \\text{V}$ mais on <b>double la résistance</b> ($100\\ \\Omega$) : que devient $I$ ? et $P$ ?<br>d) Que conclus-tu sur les liens entre $U$, $I$ et $R$ ?`,
        aide: `Calcule d'abord la situation de départ, puis refais le calcul pour chaque modification. Compare ensuite les valeurs.`,
        correction: `a) $I = 10/50 = 0{,}20\\ \\text{A}$ ; $P = U\\,I = 10\\times0{,}20 = 2{,}0\\ \\text{W}$.<br>b) $I = 20/50 = 0{,}40\\ \\text{A}$ (×2) ; $P = 20\\times0{,}40 = 8{,}0\\ \\text{W}$ (×4, car $P = U^2/R$ dépend de $U^2$).<br>c) $I = 10/100 = 0{,}10\\ \\text{A}$ (÷2) ; $P = 10\\times0{,}10 = 1{,}0\\ \\text{W}$ (÷2).<br>d) À $R$ fixe, $I$ est <b>proportionnelle</b> à $U$ ; à $U$ fixe, $I$ est <b>inversement proportionnelle</b> à $R$ ; la puissance croît comme le <b>carré</b> de la tension.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Résistance équivalente.</b><br>a) $R_1 = 100\\ \\Omega$ et $R_2 = 220\\ \\Omega$ sont en série : $R_{eq}$ ?<br>b) $R_3 = 330\\ \\Omega$ et $R_4 = 330\\ \\Omega$ sont en parallèle : $R_{eq}$ ?<br>c) $R_5 = 120\\ \\Omega$ et $R_6 = 180\\ \\Omega$ sont en parallèle : $R_{eq}$ ?<br>d) Pour chaque résultat, explique par un test rapide qu'il est plausible.`,
        aide: `Série : on additionne. Parallèle : « produit sur somme », ou on divise par 2 si les deux valeurs sont identiques.`,
        correction: `a) $R_{eq} = 100+220 = 320\\ \\Omega$ — plausible : plus grand que $220\\ \\Omega$ ✅.<br>b) Deux résistances identiques : $R_{eq} = 330/2 = 165\\ \\Omega$ — plausible : moitié d'une branche ✅.<br>c) $R_{eq} = \\dfrac{120\\times180}{120+180} = \\dfrac{21600}{300} = 72\\ \\Omega$ — plausible : plus petit que $120\\ \\Omega$ ✅.<br>d) Série → $R_{eq}$ plus grande que la plus grande ; parallèle → plus petite que la plus petite.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Lis un graphique.</b> On mesure $U$ aux bornes de deux dipôles A et B pour plusieurs intensités :<br><table class="user-table"><tr><td>$I$ (mA)</td><td>10</td><td>20</td><td>30</td><td>40</td></tr><tr><td>$U_A$ (V)</td><td>2,0</td><td>4,0</td><td>6,0</td><td>8,0</td></tr><tr><td>$U_B$ (V)</td><td>0,6</td><td>0,7</td><td>0,8</td><td>0,9</td></tr></table>a) Le dipôle A est-il ohmique ? Si oui, quelle est sa résistance ?<br>b) Même question pour B.<br>c) Quel type de composant pourrait être B ?`,
        aide: `Un dipôle ohmique a un rapport $U/I$ <b>constant</b> : calcule-le pour chaque ligne.`,
        correction: `a) $U_A/I$ : $2{,}0/0{,}010 = 200$ ; $4{,}0/0{,}020 = 200$ ; $6{,}0/0{,}030 = 200$ ; $8{,}0/0{,}040 = 200$ → rapport constant : A est ohmique, $R = 200\\ \\Omega$.<br>b) $U_B/I$ : $60$, $35$, $27$, $22{,}5\\ \\Omega$ → le rapport varie : B n'est <b>pas</b> ohmique ($U$ augmente à peine quand $I$ est multipliée par 4).<br>c) Ce comportement (tension presque constante autour de 0,7 V) est typique d'une <b>diode</b> ou d'une LED.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Loi des mailles et loi d'Ohm.</b> Un générateur $E = 12\\ \\text{V}$ alimente en série deux résistances $R_1 = 150\\ \\Omega$ et $R_2$. On mesure $U_1 = 7{,}5\\ \\text{V}$ aux bornes de $R_1$.<br>a) Calcule $U_2$.<br>b) Calcule l'intensité $I$ du circuit.<br>c) En déduis $R_2$.<br>d) Vérifie avec $R_{eq}$.`,
        aide: `Maille : $E = U_1 + U_2$. Résistances en série : même courant dans les deux.`,
        correction: `a) $U_2 = E - U_1 = 12 - 7{,}5 = 4{,}5\\ \\text{V}$.<br>b) Dans $R_1$ : $I = U_1/R_1 = 7{,}5/150 = 0{,}050\\ \\text{A} = 50\\ \\text{mA}$ (même courant dans $R_2$).<br>c) $R_2 = U_2/I = 4{,}5/0{,}050 = 90\\ \\Omega$.<br>d) $R_{eq} = 150 + 90 = 240\\ \\Omega$ et $I = E/R_{eq} = 12/240 = 0{,}050\\ \\text{A}$ ✅.`
      },
      {
        niveau: "Moyen",
        enonce: `<b>Série ou parallèle : à toi d'argumenter.</b> Trois lampes identiques sont montées sur une même pile.<br>a) Montage 1 : les trois lampes sont en <b>série</b>. Une lampe grille : que se passe-t-il pour les deux autres ? Pourquoi ?<br>b) Montage 2 : les trois lampes sont en <b>parallèle</b>. Une lampe grille : que se passe-t-il pour les deux autres ? Pourquoi ?<br>c) Quel montage est utilisé dans une maison pour les prises ? Justifie.`,
        aide: `Pense à la notion de « chemin » pour le courant et à la tension aux bornes de chaque branche.`,
        correction: `a) En série il n'y a qu'<b>un seul chemin</b> : si une lampe grille, le circuit est ouvert, $I = 0$ et les deux autres s'éteignent.<br>b) En parallèle chaque lampe a sa propre branche, sous la <b>même tension</b> de la pile : les deux autres continuent de briller avec la même luminosité ; seule l'intensité totale diminue.<br>c) Les prises sont en <b>parallèle</b> : chaque appareil reçoit la tension du secteur (230 V) et fonctionne indépendamment des autres.`
      },
      {
        niveau: "Difficile",
        enonce: `<p>Dans un circuit, une résistance $R=100\\,\\Omega$ est alimentée par un générateur réglable. Pour 4 réglages différents, on mesure les couples (I ; U_AB) suivants : (0,1A ; 10V), (0,2A ; 20V), (0,3A ; 30V), (0,4A ; 40V). Explique pourquoi ces points, placés sur un graphique (I en abscisse, U en ordonnée), sont alignés, et détermine le coefficient directeur de cette droite. Que représente-t-il physiquement ?</p>`,
        aide: `Calcule le rapport U/I pour chaque couple de valeurs — que remarques-tu ? La loi d'Ohm U=R×I est l'équation d'une droite passant par l'origine, de coefficient directeur R.`,
        correction: `<p>Pour chaque couple : $\\dfrac{U}{I} = \\dfrac{10}{0,1} = \\dfrac{20}{0,2} = \\dfrac{30}{0,3} = \\dfrac{40}{0,4} = 100$</p><p>Le rapport U/I est constant et égal à 100 pour tous les points — c'est exactement la loi d'Ohm $U = R \\times I$, l'équation d'une droite passant par l'origine avec un coefficient directeur égal à R.</p><p>Le coefficient directeur de la droite (= 100) représente donc directement la <strong>résistance R du conducteur ohmique</strong>, exprimée en ohms (Ω).</p>`
      },
      {
        niveau: "Difficile",
        enonce: `<p><strong>(TP circuit réel)</strong> Un générateur de $15\\,V$ alimente deux branches en parallèle : la branche de gauche contient une seule résistance $R_1 = 1\\,k\\Omega$ (intensité $I_1$) ; la branche de droite contient deux résistances $R_2 = 1\\,k\\Omega$ et $R_3 = 1\\,k\\Omega$ <strong>en série</strong> (intensité $I_2$). Les deux branches se rejoignent ensuite pour reformer le courant total $I$ délivré par le générateur.</p><p>Calcule $I_1$, $I_2$, puis $I$, et vérifie ta valeur de $I$ avec la loi des nœuds.</p>`,
        aide: `Les deux branches sont soumises à la même tension U=15V (elles sont en parallèle, directement reliées au générateur). Calcule d'abord la résistance équivalente de la branche de droite (R2 et R3 en série), puis applique la loi d'Ohm séparément à chaque branche (I=U/R). Termine avec la loi des nœuds pour trouver I.`,
        correction: `<p><strong>Branche de gauche (R1 seule)</strong> : $I_1 = \\dfrac{U}{R_1} = \\dfrac{15}{1000} = 0,015\\,A = 15\\,mA$</p><p><strong>Branche de droite (R2 et R3 en série)</strong> : $R_{23} = R_2 + R_3 = 1000+1000 = 2000\\,\\Omega$<br>$I_2 = \\dfrac{U}{R_{23}} = \\dfrac{15}{2000} = 0,0075\\,A = 7,5\\,mA$</p><p><strong>Loi des nœuds</strong> : $I = I_1 + I_2 = 15 + 7,5 = 22,5\\,mA$</p><p>C'est exactement ce type de circuit <strong>mixte</strong> (une branche simple en parallèle avec une branche qui contient elle-même des résistances en série) qu'il faut savoir décomposer étape par étape : d'abord réduire les séries à l'intérieur d'une branche, puis traiter le parallèle entre les branches.</p>`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Protéger une LED.</b> Une LED a une tension de seuil $U_{LED} = 2{,}0\\ \\text{V}$ et doit être traversée par $I = 15\\ \\text{mA}$. On l'alimente avec $5\\ \\text{V}$ à travers une résistance de protection en série.<br>a) Quelle tension doit-on avoir aux bornes de la résistance ?<br>b) Calcule la valeur théorique de $R$.<br>c) Dans la série normalisée E12 (100, 120, 150, 180, 220, 270, 330 Ω…), quelle valeur choisis-tu ? Quelle intensité passera alors ?<br>d) Quelle puissance est dissipée dans la résistance ? Une résistance $\\dfrac14\\ \\text{W}$ convient-elle ?`,
        aide: `Loi des mailles pour a), loi d'Ohm pour b) et c), $P = U\\times I$ pour d). Choisis la valeur normalisée qui garde l'intensité <b>en dessous</b> de la limite.`,
        correction: `a) Maille : $5 = U_R + U_{LED}$ donc $U_R = 5 - 2{,}0 = 3{,}0\\ \\text{V}$.<br>b) $R = U_R/I = 3{,}0/0{,}015 = 200\\ \\Omega$.<br>c) 200 Ω n'existe pas en E12 : on prend $220\\ \\Omega$ (la valeur supérieure, qui garde $I$ plus faible). $I = 3{,}0/220 \\approx 0{,}0136\\ \\text{A} \\approx 13{,}6\\ \\text{mA}$ ✅ (&lt; 15 mA).<br>d) $P = U_R\\times I = 3{,}0\\times0{,}0136 \\approx 0{,}041\\ \\text{W}$, soit environ 41 mW : une résistance $\\frac14\\ \\text{W} = 250\\ \\text{mW}$ convient largement.`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Le pont diviseur qui change quand on le charge.</b> Un pont diviseur est formé de $R_1 = 10\\ \\text{k}\\Omega$ et $R_2 = 5\\ \\text{k}\\Omega$ en série sous $9\\ \\text{V}$ ; on prélève la tension aux bornes de $R_2$.<br>a) Calcule $U_2$ à vide.<br>b) On branche en parallèle sur $R_2$ un appareil de résistance $R_L = 5\\ \\text{k}\\Omega$. Calcule la résistance équivalente de l'ensemble $R_2 // R_L$ puis la nouvelle tension $U_2'$.<br>c) Explique pourquoi la tension a changé, et ce que cela implique pour un voltmètre.`,
        aide: `Utilise $U_2 = U\\times\\dfrac{R_2}{R_1+R_2}$. Pour b), remplace $R_2$ par $R_2 // R_L$ dans la formule.`,
        correction: `a) $U_2 = 9\\times\\dfrac{5}{10+5} = 3{,}0\\ \\text{V}$.<br>b) $R_2 // R_L = \\dfrac{5\\times5}{5+5} = 2{,}5\\ \\text{k}\\Omega$ ; $U_2' = 9\\times\\dfrac{2{,}5}{10+2{,}5} = 1{,}8\\ \\text{V}$.<br>c) L'appareil branché « tire » du courant : la résistance équivalente du bas diminue, donc elle prend une part plus petite de la tension. Un voltmètre a lui aussi une résistance interne : pour ne pas perturber le montage, elle doit être <b>très grande</b> devant $R_2$.`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Le disjoncteur qui saute.</b> Une prise est protégée par un disjoncteur de $16\\ \\text{A}$ sous $230\\ \\text{V}$. On y branche un radiateur de $2300\\ \\text{W}$.<br>a) Calcule l'intensité et la résistance du radiateur.<br>b) On branche en plus (même prise multiple) une bouilloire de $1500\\ \\text{W}$. Que se passe-t-il ? Justifie par un calcul.<br>c) Quelle puissance maximale peut-on brancher au total sur ce disjoncteur ?<br>d) Les deux appareils fonctionnent chacun $2\\ \\text{h}$ : énergie consommée en kWh (si le disjoncteur n'avait pas sauté) et coût à $0{,}25\\ \\text{€/kWh}$.`,
        aide: `Appareils en parallèle : les intensités s'additionnent. $I = P/U$ et $R = U^2/P$.`,
        correction: `a) $I = P/U = 2300/230 = 10\\ \\text{A}$ ; $R = U/I = 230/10 = 23\\ \\Omega$.<br>b) Bouilloire : $I = 1500/230 \\approx 6{,}5\\ \\text{A}$. Les appareils sont en parallèle : $I_{tot} = 10 + 6{,}5 = 16{,}5\\ \\text{A} > 16\\ \\text{A}$ → le disjoncteur <b>saute</b>.<br>c) $P_{max} = U\\times I_{max} = 230\\times16 = 3680\\ \\text{W}$ (≈ 3,7 kW).<br>d) $P_{tot} = 2{,}3 + 1{,}5 = 3{,}8\\ \\text{kW}$ ; $E = 3{,}8\\times2 = 7{,}6\\ \\text{kWh}$ ; coût $= 7{,}6\\times0{,}25 = 1{,}90\\ \\text{€}$.`
      },
      {
        niveau: "Difficile",
        enonce: `<b>Circuit mixte complet.</b> Un générateur de $12\\ \\text{V}$ alimente $R_1 = 100\\ \\Omega$ en série avec l'association de $R_2 = 300\\ \\Omega$ et $R_3 = 600\\ \\Omega$ en parallèle.<br>a) Calcule la résistance équivalente totale.<br>b) Calcule l'intensité délivrée par le générateur.<br>c) Calcule $U_1$, puis la tension aux bornes de l'association $R_2//R_3$.<br>d) Calcule $I_2$ et $I_3$ et <b>vérifie</b> la loi des nœuds.<br>e) Calcule la puissance fournie par le générateur.`,
        aide: `Réduis le circuit étape par étape : d'abord $R_2//R_3$, puis la série avec $R_1$. Reviens ensuite en arrière pour trouver les tensions et courants de chaque branche.`,
        correction: `a) $R_{23} = \\dfrac{300\\times600}{900} = 200\\ \\Omega$ ; $R_{eq} = R_1 + R_{23} = 100+200 = 300\\ \\Omega$.<br>b) $I = E/R_{eq} = 12/300 = 0{,}040\\ \\text{A} = 40\\ \\text{mA}$.<br>c) $U_1 = R_1 I = 100\\times0{,}040 = 4{,}0\\ \\text{V}$ ; maille : $U_{23} = 12 - 4{,}0 = 8{,}0\\ \\text{V}$ (aussi $200\\times0{,}040 = 8{,}0\\ \\text{V}$ ✅).<br>d) $I_2 = 8{,}0/300 \\approx 26{,}7\\ \\text{mA}$ ; $I_3 = 8{,}0/600 \\approx 13{,}3\\ \\text{mA}$ ; $I_2 + I_3 = 40\\ \\text{mA} = I$ ✅ (loi des nœuds).<br>e) $P = E\\times I = 12\\times0{,}040 = 0{,}48\\ \\text{W}$.`
      }
    ]
  }
};
