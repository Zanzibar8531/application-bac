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
};
