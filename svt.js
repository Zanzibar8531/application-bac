/* ============================================================
   BACMASTER — data/svt.js
   Cours et flashcards — SVT
   ============================================================ */

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
