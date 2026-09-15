/* ============================================================
   BACMASTER — data/anglais.js
   Cours et flashcards — Anglais
   ============================================================ */

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
<div class="attention-box">Le conditionnel <mark>mixed</mark> est celui qu'on oublie le plus : condition dans le passé (past perfect) mais conséquence dans le présent (would + infinitif, PAS would have). Ex : "If I had taken that job, I would be rich <em>now</em>."</div>
<h3>Modal Verbs — Nuances</h3>
<div class="formula-box">Certitude (présent) : must / can't<br>Certitude (passé) : must have + pp / can't have + pp<br>Probabilité : should have + pp (aurait dû)<br>Possibilité : might / could + have + pp</div>`,
    exercices: [
      {niveau:"Facile", enonce:"<p>Reformule cette phrase en utilisant une inversion emphatique : <em>\"I have never seen such a beautiful sunset.\"</em></p>", aide:"Place l'adverbe négatif (never) en tête de phrase, puis inverse l'auxiliaire et le sujet (Aux + Subject + Verb).", correction:"<p><strong>Never have I seen such a beautiful sunset.</strong></p><p>On place \"Never\" en tête, puis on inverse l'auxiliaire \"have\" et le sujet \"I\" (structure Aux + Sujet + Verbe).</p>"},
      {niveau:"Moyen", enonce:"<p>Complète avec le bon type de conditionnel : <em>\"If she ___ (study) harder last year, she ___ (pass) the exam.\"</em> Identifie le type de conditionnel utilisé.</p>", aide:"L'action est entièrement dans le passé (last year) — quel type de conditionnel correspond à un regret sur le passé ?", correction:"<p><strong>If she had studied harder last year, she would have passed the exam.</strong></p><p>C'est un <strong>Conditionnel Type 3</strong> (irréel du passé) : If + past perfect, would have + participe passé. Il exprime un regret sur une situation passée qui ne peut plus être changée.</p>"},
      {niveau:"Difficile", enonce:"<p>Rédige une phrase utilisant un conditionnel mixte pour exprimer l'idée suivante : une personne n'a pas fait d'études de médecine par le passé (condition passée), et regrette de ne pas être médecin aujourd'hui (conséquence présente).</p>", aide:"Le conditionnel mixte combine : If + past perfect (condition passée) + would + infinitif (conséquence présente, pas \"would have\").", correction:"<p><strong>Exemple : \"If I had studied medicine, I would be a doctor now.\"</strong></p><p>La condition est bien au passé (had studied = past perfect), mais la conséquence est au présent (would be, pas would have been) car l'effet du regret se ressent aujourd'hui, pas dans le passé. C'est la structure exacte du conditionnel mixte.</p>"},
    ],
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
<div class="retenir-box"><mark>Although</mark> + sujet + verbe (clause complète). <mark>Despite / In spite of</mark> + nom ou gérondif (pas de sujet+verbe). C'est la faute la plus fréquente sur ces deux connecteurs.</div>
<h3>Cause / Conséquence</h3>
<div class="formula-box">Because / Since / As / Due to / Owing to / As a result / Therefore / Consequently / Hence / Thus / This leads to</div>
<h3>Illustration / Exemple</h3>
<div class="formula-box">For instance / For example / Such as / Namely / In particular / This is illustrated by / A case in point is</div>
<h3>Conclusion / Synthèse</h3>
<div class="formula-box">To conclude / In conclusion / To sum up / All in all / On balance / Ultimately / In the final analysis / It can be argued that</div>`,
    exercices: [
      {niveau:"Facile", enonce:"<p>Complète avec le bon connecteur : <em>\"Social media can connect people. ___, it can also isolate them.\"</em> (choisis entre However / Furthermore / For instance)</p>", aide:"Cherche l'idée d'opposition entre les deux phrases (connecter vs isoler).", correction:"<p><strong>However</strong> (cependant) — les deux idées s'opposent (connecter vs isoler), il faut donc un connecteur d'opposition, pas d'addition (Furthermore) ni d'exemple (For instance).</p>"},
      {niveau:"Moyen", enonce:"<p>Réécris cette phrase en remplaçant \"but\" par un connecteur plus soutenu adapté à l'écrit formel : <em>\"The plan seemed perfect, but it failed due to a lack of funding.\"</em></p>", aide:"\"But\" est très courant à l'oral — pense à un équivalent plus formel pour l'écrit (Nevertheless, Yet, However...).", correction:"<p><strong>\"The plan seemed perfect; nevertheless, it failed due to a lack of funding.\"</strong></p><p>\"Nevertheless\" (ou \"however\") est plus soutenu que \"but\" et convient mieux à un écrit formel type synthèse de documents ou lettre formelle.</p>"},
      {niveau:"Difficile", enonce:"<p>Rédige 2-3 phrases sur le thème \"technology and society\" en utilisant au moins 3 connecteurs différents de catégories différentes (addition, opposition, conséquence).</p>", aide:"Choisis un connecteur d'addition (ex: Furthermore), un d'opposition (ex: However), et un de conséquence (ex: As a result), et construis une petite argumentation cohérente autour d'eux.", correction:"<p><strong>Exemple de réponse :</strong> \"Technology has undoubtedly improved our daily lives. Furthermore, it has made communication instantaneous across the globe. However, this constant connectivity can also lead to increased stress and anxiety. As a result, many people are now seeking ways to reduce their screen time.\"</p><p>Ici : Furthermore (addition), However (opposition), As a result (conséquence) — bien répartis dans une argumentation qui progresse logiquement.</p>"},
    ],
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
    cours: `<h2>Key Vocabulary</h2><p>Essential words for the bac.</p><ul><li><b>To advocate</b> — défendre une cause</li><li><b>To tackle</b> — s'attaquer à</li><li><b>To foster</b> — encourager</li><li><b>Sustainable</b> — durable</li><li><b>Breakthrough</b> — percée majeure</li></ul><h3>Linking words</h3><ul><li><b>However</b> — cependant</li><li><b>Furthermore</b> — de plus</li><li><b>Although</b> — bien que</li></ul><div class="retenir-box">Ces mots reviennent sans arrêt dans les sujets de bac (société, environnement, technologie) : <mark>sustainable</mark>, <mark>breakthrough</mark> et <mark>to tackle</mark> sont particulièrement utiles pour la synthèse et l'expression écrite.</div>`,
    exercices: [
      {niveau:"Facile", enonce:"<p>Traduis en anglais : \"Il faut s'attaquer aux inégalités sociales.\"</p>", aide:"Utilise le verbe vu dans ce chapitre pour \"s'attaquer à\", et le mot pour \"inégalité\".", correction:"<p><strong>\"We need to tackle social inequality.\"</strong></p><p>\"To tackle\" = s'attaquer à, \"inequality\" = inégalité.</p>"},
      {niveau:"Moyen", enonce:"<p>Complète cette phrase avec le mot de vocabulaire approprié : \"Renewable energy is a key part of a more ___ future.\" (durable)</p>", aide:"Quel adjectif de ce chapitre signifie \"durable\" en anglais ?", correction:"<p><strong>\"Renewable energy is a key part of a more sustainable future.\"</strong></p><p>\"Sustainable\" = durable, un mot essentiel pour tout sujet lié à l'environnement au bac.</p>"},
      {niveau:"Difficile", enonce:"<p>Rédige 2 phrases sur le thème de l'innovation technologique en utilisant \"breakthrough\" et \"to undermine\" de façon pertinente.</p>", aide:"Pense à une découverte technologique positive (breakthrough) qui pourrait aussi avoir un effet négatif sur quelque chose (undermine quoi ? la vie privée, l'emploi...).", correction:"<p><strong>Exemple :</strong> \"The recent breakthrough in artificial intelligence could revolutionize healthcare. However, some experts fear it might undermine privacy and job security in the long run.\"</p><p>\"Breakthrough\" = percée majeure (l'innovation en IA), \"to undermine\" = saper/affaiblir (la vie privée et la sécurité de l'emploi).</p>"},
    ],
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
    cours: `<h2>Grammar Essentials</h2><h3>Tenses</h3><ul><li><b>Present Perfect</b> : actions passées à effet présent — I have studied</li><li><b>Past Simple</b> : action terminée — I studied yesterday</li><li><b>Conditional</b> : If I were… I would…</li></ul><h3>Passive Voice</h3><p>Subject + be + past participle. Ex: The law was passed in 1990.</p><div class="attention-box">Present Perfect vs Past Simple : le Present Perfect s'utilise quand il n'y a <mark>pas de date précise</mark> ou que ça a un lien avec le présent. Dès qu'une date/un moment précis apparaît ("yesterday", "in 1990"), c'est le Past Simple.</div>`,
    exercices: [
      {niveau:"Facile", enonce:"<p>Choisis le bon temps : \"I ___ (visit) London last summer.\" (Present Perfect ou Past Simple ?)</p>", aide:"Y a-t-il un marqueur de temps précis dans la phrase (last summer) ?", correction:"<p><strong>\"I visited London last summer.\"</strong> (Past Simple)</p><p>\"Last summer\" est une date précise, donc on utilise le Past Simple, pas le Present Perfect.</p>"},
      {niveau:"Moyen", enonce:"<p>Mets cette phrase à la voix passive : \"The government passed a new law in 2020.\"</p>", aide:"Structure de la voix passive : Subject (l'objet devient sujet) + be (au bon temps) + participe passé + by + agent.", correction:"<p><strong>\"A new law was passed by the government in 2020.\"</strong></p><p>\"A new law\" (objet) devient le sujet, \"was\" (be au passé), \"passed\" (participe passé), \"by the government\" (l'agent).</p>"},
      {niveau:"Difficile", enonce:"<p>Transpose au discours indirect (reported speech) : Elle a dit : \"I have finished my homework.\"</p>", aide:"Applique le recul d'un temps : Present Perfect → Past Perfect en discours indirect. N'oublie pas d'adapter le pronom.", correction:"<p><strong>\"She said (that) she had finished her homework.\"</strong></p><p>Le Present Perfect (\"have finished\") recule d'un temps pour devenir le Past Perfect (\"had finished\") en discours indirect, et \"I\" devient \"she\".</p>"},
    ],
    flashcards: [
      {q:"Present Perfect — usage",a:"Action passée avec résultat présent. Marqueurs : just, already, yet, since, for",score:0,interval:0,ease:2.5,due:null},
      {q:"Passive voice — formule",a:"Subject + be (conjugated) + past participle. Ex: The book was written by her.",score:0,interval:0,ease:2.5,due:null},
      {q:"Reported speech",a:"On recule d\'un temps. 'I am tired' -> She said she WAS tired.",score:0,interval:0,ease:2.5,due:null},
    ]
  }
};
