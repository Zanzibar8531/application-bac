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
