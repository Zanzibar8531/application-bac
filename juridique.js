/* ============================================================
   BACMASTER — data/juridique.js
   Cours et flashcards — Bases juridiques & administratives (culture perso)
   ============================================================ */

PREBUILT['Bases Juridiques & Admin'] = {

'Comprendre sa fiche de paie & son contrat': {
cours:`<h3>Lire une fiche de paie</h3>
<p>Une fiche de paie française contient toujours les mêmes grandes lignes :</p>
<ul>
<li><strong>Salaire brut</strong> : ce que ton employeur "affiche" avant les cotisations. C'est la base de calcul, pas ce que tu reçois.</li>
<li><strong>Cotisations sociales</strong> : prélevées sur le brut pour financer la Sécu, la retraite, le chômage. Environ 22-25% du brut pour un salarié.</li>
<li><strong>Salaire net avant impôt</strong> : ce qui reste après les cotisations — c'est le montant réellement viré, avant impôt sur le revenu.</li>
<li><strong>Prélèvement à la source</strong> : depuis 2019, l'impôt sur le revenu est directement retiré du salaire net par l'employeur, il ne reste plus rien à payer en plus au moment de la déclaration (sauf régularisation).</li>
<li><strong>Net à payer</strong> : la somme réellement virée sur ton compte.</li>
</ul>
<div class="formula-box">Ordre : Brut → − Cotisations sociales → Net avant impôt → − Prélèvement à la source → Net à payer (viré sur ton compte)</div>

<h3>Types de contrats de travail</h3>
<ul>
<li><strong>CDI</strong> (Contrat à Durée Indéterminée) : pas de date de fin, la norme en France. Rupture encadrée (démission, licenciement, rupture conventionnelle).</li>
<li><strong>CDD</strong> (Contrat à Durée Déterminée) : durée limitée, motif obligatoire (remplacement, surcroît d'activité...), donne droit à une prime de précarité (10% du salaire brut total) à la fin sauf embauche en CDI.</li>
<li><strong>Contrat d'apprentissage</strong> : alterne formation et entreprise, salaire en % du SMIC selon l'âge et l'année.</li>
<li><strong>Période d'essai</strong> : phase où employeur et salarié peuvent rompre le contrat plus facilement, durée variable selon le type de contrat et le statut.</li>
</ul>
<div class="retenir-box">La <mark>prime de précarité</mark> (10% du salaire brut total du CDD) est due automatiquement à la fin d'un CDD — sauf si on te propose un CDI juste après ou si tu refuses cette proposition. Beaucoup de jeunes salariés ne savent pas qu'ils y ont droit.</div>

<h3>Le SMIC</h3>
<p>Salaire Minimum Interprofessionnel de Croissance — le salaire horaire brut minimum légal en France, revalorisé chaque année (souvent au 1er janvier, parfois en cours d'année si l'inflation dépasse un seuil).</p>

<h3>Les congés</h3>
<div class="formula-box">2,5 jours ouvrables de congés payés par mois travaillé = 5 semaines par an pour un temps plein sur une année complète.</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un CDD se termine sans qu'on propose de CDI à l'employé. A-t-il droit à quelque chose en plus de son dernier salaire ?</p>`, aide:`Relis l'encadré "à retenir" sur la prime de précarité.`, correction:`<p>Oui, il a droit à la <strong>prime de précarité</strong>, égale à 10% du salaire brut total perçu pendant le CDD — sauf si une proposition de CDI lui a été faite juste après (et refusée par lui). Beaucoup de jeunes salariés ne savent pas qu'ils y ont droit automatiquement.</p>`},
{niveau:'Moyen', enonce:`<p>Un salarié gagne 2000€ de salaire brut par mois. Son bulletin de paie affiche environ 1560€ de "net avant impôt", puis un montant encore inférieur en "net à payer". Explique, avec l'ordre du cours, pourquoi il y a deux déductions successives et non une seule.</p>`, aide:`Relis le schéma "Ordre" donné dans le cours (Brut → ... → Net à payer) — combien d'étapes de déduction y a-t-il, et à quoi correspond chacune ?`, correction:`<p>Il y a deux déductions successives et distinctes : d'abord les <strong>cotisations sociales</strong> (environ 22-25% du brut, qui financent la Sécu, la retraite, le chômage), ce qui donne le "net avant impôt" ; puis le <strong>prélèvement à la source</strong> de l'impôt sur le revenu, appliqué directement sur ce net avant impôt depuis 2019, ce qui donne le "net à payer" final réellement viré sur le compte. Ce sont deux mécanismes différents (cotisations sociales vs impôt sur le revenu), d'où les deux étapes séparées dans le calcul.</p>`},
{niveau:'Difficile', enonce:`<p>Un employeur propose à un salarié en fin de CDD un poste en CDI similaire, que le salarié refuse car il a trouvé un autre emploi ailleurs. A-t-il quand même droit à la prime de précarité ? Justifie précisément avec la règle du cours.</p>`, aide:`Relis très précisément la condition d'exception à la prime de précarité — la simple existence d'une proposition de CDI suffit-elle à annuler le droit à la prime, ou faut-il un élément supplémentaire ?</p>`, correction:`<p>Il faut regarder la règle précise du cours : la prime de précarité n'est PAS due si le salarié se voit proposer un CDI juste après <mark>et qu'il accepte</mark> cette proposition — mais également pas due s'il <mark>refuse cette proposition</mark> selon la formulation exacte du cours ("sauf si on te propose un CDI juste après ou si tu refuses cette proposition"). Dans ce cas précis, le salarié a reçu une proposition de CDI et l'a refusée (pour une raison personnelle, ici un autre emploi) : il perd donc son droit à la prime de précarité, car le refus d'une proposition de CDI équivalente fait partie des exceptions prévues, même si sa raison de refuser n'a rien à voir avec l'emploi proposé lui-même.</p>`},
],
flashcards:[
{q:'Salaire brut vs salaire net',a:'Le brut est la base de calcul avant cotisations sociales. Le net est ce qui reste après ces cotisations — c\'est proche de ce qui est réellement viré.'},
{q:'Cotisations sociales — à quoi servent-elles ?',a:'Elles financent la Sécurité sociale, la retraite et l\'assurance chômage. Prélevées automatiquement sur le salaire brut.'},
{q:'Prélèvement à la source',a:'Depuis 2019, l\'impôt sur le revenu est directement retenu sur le salaire net par l\'employeur, chaque mois.'},
{q:'CDI',a:'Contrat à Durée Indéterminée : pas de date de fin prévue, le contrat de travail standard en France.'},
{q:'CDD — spécificités',a:'Contrat à Durée Déterminée : nécessite un motif légal précis, donne droit à une prime de précarité de 10% du salaire brut total sauf embauche en CDI à la fin.'},
{q:'Période d\'essai',a:'Phase initiale du contrat pendant laquelle employeur et salarié peuvent rompre le contrat plus simplement qu\'ensuite.'},
{q:'SMIC',a:'Salaire Minimum Interprofessionnel de Croissance : le salaire horaire brut minimum légal en France, révisé chaque année.'},
{q:'Congés payés — calcul',a:'2,5 jours ouvrables de congés payés par mois travaillé, soit 5 semaines par an pour un temps plein sur une année complète.'},
]},

'Vie pratique : logement, banque, démarches': {
cours:`<h3>Le bail (contrat de location)</h3>
<ul>
<li><strong>Durée</strong> : 3 ans pour un logement vide loué par un particulier, 1 an pour un meublé (renouvelable tacitement).</li>
<li><strong>Dépôt de garantie</strong> : max. 1 mois de loyer hors charges (logement vide), 2 mois pour un meublé. Doit être restitué sous 1 mois si l'état des lieux de sortie est conforme (2 mois sinon).</li>
<li><strong>État des lieux</strong> : document comparant l'état du logement à l'entrée et à la sortie — essentiel pour récupérer sa caution en entier.</li>
<li><strong>Préavis</strong> : délai à respecter avant de quitter le logement (souvent 1 mois en zone tendue, 3 mois sinon, réductible dans certains cas comme mutation professionnelle).</li>
<li><strong>Garant / caution</strong> : personne qui s'engage à payer le loyer si le locataire ne peut pas.</li>
</ul>
<div class="attention-box">Fais toujours l'état des lieux d'entrée <mark>très minutieusement</mark> (photos datées de chaque défaut, même minime) — c'est ta seule protection pour récupérer l'intégralité de ton dépôt de garantie à la sortie.</div>

<h3>Les assurances obligatoires</h3>
<ul>
<li><strong>Assurance habitation</strong> : obligatoire pour un locataire, couvre les dégâts (incendie, dégât des eaux...) causés au logement.</li>
<li><strong>Assurance auto</strong> : au minimum la responsabilité civile (couvre les dommages causés à autrui), obligatoire pour tout véhicule.</li>
</ul>

<h3>Comprendre son compte bancaire</h3>
<ul>
<li><strong>RIB</strong> (Relevé d'Identité Bancaire) : document avec IBAN et BIC, à donner pour recevoir un virement (salaire, remboursement...).</li>
<li><strong>Découvert autorisé</strong> : montant négatif toléré par la banque sans frais excessifs — au-delà, agios (intérêts) et frais.</li>
<li><strong>Livret A</strong> : épargne sans risque, plafonnée, intérêts non imposés — la base de l'épargne de précaution avant tout investissement en bourse.</li>
</ul>

<h3>Déclaration d'impôts — les bases</h3>
<div class="formula-box">
Le revenu imposable est découpé en tranches, chacune taxée à un taux différent (<strong>barème progressif</strong>) : seule la partie du revenu dans une tranche est taxée à son taux, pas la totalité du revenu.<br>
Le <strong>quotient familial</strong> (nombre de parts selon la situation familiale) réduit l'impôt pour les foyers avec enfants/personnes à charge.
</div>

<h3>Majorité & démarches administratives</h3>
<ul>
<li>À 18 ans : capacité juridique complète (signer un bail, un contrat, voter, ouvrir un compte seul).</li>
<li><strong>Carte Vitale</strong> : donne accès au remboursement des soins par la Sécurité sociale.</li>
<li><strong>Mutuelle</strong> : complète les remboursements de la Sécu (souvent partiels sur les soins courants).</li>
</ul>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un locataire quitte son logement meublé après l'avoir loué 8 mois. Combien de temps la banque/le propriétaire a-t-il pour lui rendre son dépôt de garantie si l'état des lieux de sortie est conforme ?</p>`, aide:`Relis la partie sur le dépôt de garantie — la durée de restitution dépend d'une condition précise.`, correction:`<p><strong>1 mois.</strong> Le cours précise que le dépôt de garantie doit être restitué sous 1 mois si l'état des lieux de sortie est conforme (et sous 2 mois sinon) — cette règle s'applique aussi bien aux logements meublés que vides, seul le montant maximum du dépôt diffère selon le type de location.</p>`},
{niveau:'Moyen', enonce:`<p>Un locataire quitte son logement sans avoir pris de photos datées lors de son état des lieux d'entrée, et son propriétaire lui retient une grosse partie de sa caution en prétendant que des dégradations existaient déjà avant son arrivée. Que risque-t-il concrètement, et qu'aurait-il dû faire pour se protéger ?</p>`, aide:`Relis l'encadré "attention" sur l'état des lieux — pourquoi les photos datées sont-elles présentées comme "la seule protection" du locataire ?</p>`, correction:`<p>Sans preuve de l'état réel du logement à son entrée, le locataire aura beaucoup de mal à prouver que les dégradations invoquées par le propriétaire n'étaient pas de son fait — il risque donc de perdre une partie de sa caution injustement, sans moyen simple de contester. Le cours insiste sur le fait que des <mark>photos datées</mark> de chaque défaut, même minime, prises lors de l'état des lieux d'entrée, sont la seule vraie protection du locataire pour récupérer l'intégralité de son dépôt de garantie à la sortie — c'est précisément ce qu'il aurait dû faire.</p>`},
{niveau:'Difficile', enonce:`<p>Explique pourquoi le système du barème progressif de l'impôt sur le revenu fait qu'une augmentation de salaire ne peut jamais faire perdre de l'argent net à quelqu'un, contrairement à une idée reçue répandue ("je vais gagner moins si je passe dans la tranche supérieure").</p>`, aide:`Relis très précisément la formule du barème progressif — s'applique-t-il à la TOTALITÉ du revenu dès qu'on change de tranche, ou seulement à la partie du revenu qui dépasse le seuil de la tranche ?</p>`, correction:`<p>L'idée reçue est fausse car le barème progressif ne taxe <mark>que la partie du revenu qui se trouve dans chaque tranche</mark>, à son taux propre — jamais la totalité du revenu au taux de la tranche la plus haute atteinte. Concrètement, si une augmentation de salaire fait "entrer" une petite partie du revenu dans une tranche supérieure, seule cette petite partie supplémentaire est taxée au taux plus élevé ; tout le reste du revenu continue d'être taxé exactement comme avant, aux taux des tranches inférieures.</p><p>Une augmentation de salaire brut se traduit donc toujours par une augmentation du revenu net, même si le taux marginal (celui de la tranche la plus haute atteinte) est plus élevé — il ne peut mathématiquement jamais y avoir de perte nette liée au seul changement de tranche, contrairement à la croyance populaire.</p>`},
],
flashcards:[
{q:'Durée d\'un bail vide vs meublé',a:'3 ans pour un logement vide loué par un particulier, 1 an renouvelable pour un meublé.'},
{q:'Dépôt de garantie — montant maximum',a:'1 mois de loyer hors charges pour un logement vide, 2 mois pour un meublé.'},
{q:'À quoi sert l\'état des lieux ?',a:'Comparer l\'état du logement à l\'entrée et à la sortie, pour déterminer si le dépôt de garantie doit être restitué intégralement.'},
{q:'Préavis de départ d\'un logement',a:'Délai à respecter avant de quitter le logement, souvent 1 mois en zone tendue, 3 mois sinon (réductible dans certains cas).'},
{q:'Assurance habitation — obligatoire ou non ?',a:'Obligatoire pour un locataire, couvre les dégâts causés au logement (incendie, dégât des eaux...).'},
{q:'RIB',a:'Relevé d\'Identité Bancaire : document contenant l\'IBAN et le BIC, à fournir pour recevoir un virement.'},
{q:'Livret A',a:'Épargne sans risque, plafonnée, dont les intérêts ne sont pas imposés — base de l\'épargne de précaution.'},
{q:'Barème progressif de l\'impôt',a:'Le revenu est découpé en tranches taxées à des taux croissants : seule la partie du revenu dans une tranche est taxée à son taux, pas tout le revenu.'},
{q:'Quotient familial',a:'Système qui divise le revenu imposable par un nombre de parts selon la situation familiale, réduisant l\'impôt pour les foyers avec personnes à charge.'},
{q:'Carte Vitale',a:'Carte donnant accès au remboursement des soins de santé par la Sécurité sociale.'},
{q:'Mutuelle — rôle',a:'Complète les remboursements de la Sécurité sociale, qui sont souvent partiels sur les soins courants.'},
]},

'Droit du numérique & cybersécurité': {
cours:`<h3>Le cadre légal français : les articles 323 du Code pénal</h3>
<p>Souvent appelée "Loi Godfrain" (1988, intégrée depuis au Code pénal), cette base légale protège tout <strong>STAD</strong> (Système de Traitement Automatisé de Données) — c'est-à-dire concrètement n'importe quel système informatique (un PC, un serveur, un site web, un compte en ligne...).</p>
<div class="formula-box">
<strong>Art. 323-1</strong> : accès ou maintien frauduleux dans un STAD — jusqu'à 3 ans de prison et 100 000 € d'amende (peines aggravées si des données sont altérées ou si le système appartient à l'État).<br>
<strong>Art. 323-2</strong> : entraver ou fausser le fonctionnement d'un STAD (ex : DDoS) — jusqu'à 5 ans et 150 000 €.<br>
<strong>Art. 323-3</strong> : introduire, modifier ou supprimer frauduleusement des données dans un STAD — jusqu'à 5 ans et 150 000 €.<br>
<strong>Art. 323-3-1</strong> : le simple fait de détenir/fournir un outil conçu pour commettre ces infractions, sans motif légitime, est déjà punissable.
</div>
<div class="attention-box">Point essentiel à bien comprendre : la loi ne demande <mark>aucune preuve d'intention de nuire</mark> ni de dommage causé pour caractériser l'infraction. Le simple fait d'accéder sans autorisation à un système qui n'est pas le tien suffit — même "juste pour voir", même sans rien casser, même si le système était mal protégé (une porte mal fermée reste une porte qu'on n'a pas le droit d'ouvrir).</div>

<h3>Ce qui reste 100% légal</h3>
<ul>
<li>Accéder à distance à <strong>tes propres appareils</strong> (dont tu es propriétaire).</li>
<li>S'entraîner sur des plateformes dédiées qui autorisent explicitement les tests (Root-Me, TryHackMe, Hack The Box, machines virtuelles vulnérables type Metasploitable2/DVWA).</li>
<li>Tester un système appartenant à un tiers <mark>si et seulement si</mark> tu as une autorisation écrite explicite, précisant le périmètre exact autorisé (dates, systèmes concernés, actions permises).</li>
</ul>

<h3>Le hacking éthique encadré : pentest et bug bounty</h3>
<p>Un <strong>test d'intrusion (pentest) professionnel</strong> se fait toujours dans le cadre d'un <mark>contrat ou mandat écrit</mark> entre le pentester et l'entreprise cliente, qui définit précisément le périmètre autorisé (quels systèmes, quelles dates, quelles actions). Sans ce document, même avec les meilleures intentions, l'action reste illégale.</p>
<div class="formula-box">Le <strong>bug bounty</strong> est un programme où une entreprise autorise publiquement des chercheurs en sécurité à tester ses systèmes selon des règles précises, en échange d'une récompense (souvent financière) si une faille réelle est trouvée et signalée correctement. Plateformes connues : <strong>YesWeHack</strong> (française) et <strong>HackerOne</strong>.</div>
<div class="retenir-box">Le bug bounty est un excellent moyen légal de progresser <mark>sur de vrais systèmes</mark> (pas seulement des labos), parce que l'autorisation est donnée publiquement et à l'avance par l'entreprise elle-même, avec des règles claires (scope) à respecter strictement.</div>

<h3>La CNIL et le RGPD</h3>
<p>La <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) est l'autorité française chargée de faire respecter le RGPD et de sanctionner les entreprises qui ne protègent pas correctement les données personnelles qu'elles détiennent.</p>
<div class="formula-box">Les sanctions RGPD peuvent atteindre jusqu'à <strong>4% du chiffre d'affaires mondial annuel</strong> d'une entreprise (ou 20 millions d'euros, le montant le plus élevé étant retenu) en cas de manquement grave.</div>

<h3>Les métiers légaux du secteur</h3>
<ul>
<li><strong>Pentester</strong> : testeur d'intrusion mandaté par contrat pour évaluer la sécurité d'un système.</li>
<li><strong>Analyste SOC</strong> (Security Operations Center) : surveille en continu les systèmes d'une organisation pour détecter des attaques en cours.</li>
<li><strong>RSSI</strong> (Responsable de la Sécurité des Systèmes d'Information) : pilote la stratégie de sécurité globale d'une organisation.</li>
</ul>
<div class="retenir-box">Tous ces métiers ont un point commun : ils s'exercent toujours dans un cadre <mark>contractuel et autorisé</mark>. C'est précisément ce cadre (mandat écrit, périmètre défini) qui distingue légalement un professionnel de la cybersécurité d'un délit — la compétence technique est la même des deux côtés, seule l'autorisation change tout.</div>`,
exercices:[
{niveau:'Facile', enonce:`<p>Un ado teste, "juste pour voir", s'il arrive à se connecter au compte en ligne d'un camarade sans son autorisation, sans rien modifier ni endommager. Est-ce légal d'après le cours ?</p>`, aide:`Relis l'encadré "attention" sur l'absence de nécessité d'intention de nuire ou de dommage.`, correction:`<p><strong>Non, c'est illégal.</strong> Le cours précise que la loi ne demande aucune preuve d'intention de nuire ni de dommage causé — le simple fait d'accéder sans autorisation à un système qui n'est pas le sien suffit à caractériser l'infraction (article 323-1), même "juste pour voir" et même sans rien casser.</p>`},
{niveau:'Moyen', enonce:`<p>Une entreprise lance un programme public annonçant qu'elle autorise des chercheurs en sécurité à tester certains de ses systèmes, en échange d'une récompense si une faille réelle est trouvée. Comment appelle-t-on ce type de programme, et pourquoi rend-il légal ce qui serait autrement un délit ?</p>`, aide:`Relis la partie sur le bug bounty — qu'est-ce qui, précisément, transforme une action potentiellement illégale en action légale ici ?</p>`, correction:`<p>C'est un programme de <strong>bug bounty</strong>. Ce qui rend l'action légale, c'est que l'entreprise donne elle-même une <mark>autorisation publique et explicite</mark>, avec des règles précises (scope) définissant quels systèmes peuvent être testés et comment — exactement la même logique qu'un mandat de pentest classique, mais ouvert publiquement à des chercheurs indépendants plutôt que limité à un prestataire unique sous contrat privé.</p>`},
{niveau:'Difficile', enonce:`<p>Deux personnes utilisent des techniques strictement identiques pour tester la sécurité du même site web d'une entreprise. La première a un contrat de pentest signé précisant qu'elle est autorisée à tester uniquement le site vitrine de l'entreprise (pas son application mobile). Pendant son mandat, elle teste aussi l'application mobile "pour être complète", alors que ce n'était pas prévu dans le contrat. Est-elle toujours dans un cadre légal pour cette action précise ? Justifie avec la notion de périmètre.</p>`, aide:`Relis bien la notion de périmètre : un mandat écrit rend-il automatiquement légale N'IMPORTE QUELLE action de la personne mandatée, ou seulement celles précisément définies dans le document ?</p>`, correction:`<p><strong>Non, elle n'est plus dans un cadre légal pour cette action précise.</strong> Le cours insiste sur le fait qu'un mandat de pentest définit un <mark>périmètre précis</mark> (quels systèmes, quelles dates, quelles actions) — l'autorisation ne couvre que ce périmètre exact, pas l'ensemble des systèmes de l'entreprise par extension logique ou bonne intention. En testant l'application mobile alors que seul le site vitrine était autorisé, elle sort du périmètre contractuel et se retrouve, pour cette action précise, exactement dans la même situation qu'une personne sans aucune autorisation — même si elle a par ailleurs un contrat valide pour une autre partie du système. Ce point illustre bien que ce n'est jamais la compétence ou la bonne foi qui rend une action légale, mais strictement le périmètre défini par écrit.</p>`},
],
flashcards:[
{q:'Article 323-1 du Code pénal',a:'Punit l\'accès ou le maintien frauduleux dans un système de traitement automatisé de données (STAD) — jusqu\'à 3 ans de prison et 100 000 € d\'amende.'},
{q:'STAD — définition',a:'Système de Traitement Automatisé de Données : concrètement, n\'importe quel système informatique (PC, serveur, site web, compte en ligne...).'},
{q:'Faut-il une intention de nuire ou un dommage pour être condamné (art. 323) ?',a:'Non — le simple fait d\'accéder sans autorisation à un système qui n\'est pas le sien suffit à caractériser l\'infraction, même sans dommage ni mauvaise intention.'},
{q:'Ce qui reste légal en matière de "hacking"',a:'Accéder à ses propres appareils, s\'entraîner sur des plateformes dédiées (Root-Me, TryHackMe...), ou tester un système tiers avec une autorisation écrite explicite et un périmètre défini.'},
{q:'Ce qui rend un pentest professionnel légal',a:'Un contrat/mandat écrit avec l\'entreprise cliente, définissant précisément le périmètre autorisé (systèmes, dates, actions permises).'},
{q:'Bug bounty — principe',a:'Programme où une entreprise autorise publiquement des chercheurs à tester ses systèmes selon des règles précises, en échange d\'une récompense si une faille réelle est trouvée.'},
{q:'CNIL',a:'Commission Nationale de l\'Informatique et des Libertés : autorité française chargée de faire respecter le RGPD et de sanctionner les manquements.'},
{q:'Montant maximal d\'une sanction RGPD',a:'Jusqu\'à 4% du chiffre d\'affaires mondial annuel de l\'entreprise, ou 20 millions d\'euros (le montant le plus élevé étant retenu).'},
{q:'Ce qui distingue légalement un pentester d\'un délinquant informatique',a:'Uniquement l\'autorisation (contrat/mandat écrit définissant le périmètre) — la compétence technique utilisée peut être strictement identique des deux côtés.'},
]},
};
