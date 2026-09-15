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
