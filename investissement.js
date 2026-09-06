/* ============================================================
   BACMASTER — data/investissement.js
   Cours et flashcards — Bourse & Investissement (culture perso)
   ============================================================ */

PREBUILT['Bourse & Investissement'] = {

'Les bases de la bourse': {
cours:`<h3>Qu'est-ce qu'une action ?</h3>
<p>Une <strong>action</strong> est une part du capital d'une entreprise. En achetant une action, tu deviens copropriétaire (actionnaire) et tu peux :</p>
<ul>
<li>Toucher des <strong>dividendes</strong> : une part des bénéfices redistribuée aux actionnaires (pas garantie, décidée par l'entreprise)</li>
<li>Réaliser une <strong>plus-value</strong> : gagner de l'argent si le prix de l'action augmente entre l'achat et la revente</li>
<li>Voter en assemblée générale (selon le nombre d'actions détenues)</li>
</ul>
<p>Le risque inverse existe aussi : si l'entreprise va mal, l'action peut perdre de la valeur, voire ne plus rien valoir en cas de faillite.</p>

<h3>Comprendre les indices boursiers (ex : le CAC 40)</h3>
<div class="formula-box">Un <strong>indice boursier</strong> mesure la performance moyenne d'un panier d'entreprises. Le <strong>CAC 40</strong> regroupe les 40 plus grandes entreprises cotées à la Bourse de Paris (Euronext Paris), pondérées selon leur <strong>capitalisation boursière</strong> (valeur totale de l'entreprise en bourse = prix de l'action × nombre d'actions).</div>
<p>Les "points" du CAC 40 ne représentent pas une somme d'argent : c'est une <strong>valeur relative</strong> calculée à partir d'une base 1000 points fixée le 31/12/1987. Si le CAC 40 passe de 7000 à 7070 points, cela signifie que la valeur moyenne pondérée des 40 entreprises a augmenté d'1%.</p>
<ul>
<li><strong>CAC 40</strong> : 40 plus grandes entreprises françaises (Bourse de Paris)</li>
<li><strong>S&amp;P 500</strong> : 500 plus grandes entreprises américaines</li>
<li><strong>Nasdaq</strong> : indice américain concentré sur la tech</li>
<li><strong>MSCI World</strong> : indice mondial regroupant des milliers d'entreprises de pays développés</li>
</ul>

<h3>Comment le prix d'une action évolue-t-il ?</h3>
<p>Par la <strong>loi de l'offre et de la demande</strong> : plus il y a d'acheteurs que de vendeurs, plus le prix monte, et inversement. Ce qui influence l'offre/demande : résultats financiers de l'entreprise, actualité économique, taux d'intérêt, sentiment général du marché.</p>

<h3>Risque et rendement</h3>
<div class="formula-box">Règle fondamentale : plus le rendement potentiel est élevé, plus le risque est élevé. Il n'existe pas de placement à la fois très rentable et sans risque.</div>`,
flashcards:[
{q:'Action — définition',a:'Part du capital d\'une entreprise. L\'actionnaire devient copropriétaire et peut toucher des dividendes ou réaliser une plus-value.'},
{q:'Dividende',a:'Part des bénéfices d\'une entreprise redistribuée aux actionnaires. Ce n\'est pas garanti — l\'entreprise décide de verser ou non des dividendes.'},
{q:'Plus-value en bourse',a:'Gain réalisé quand on revend une action à un prix plus élevé que celui d\'achat.'},
{q:'Que représente le CAC 40 ?',a:'Un indice regroupant les 40 plus grandes entreprises cotées à la Bourse de Paris, pondérées selon leur capitalisation boursière.'},
{q:'Capitalisation boursière',a:'Valeur totale d\'une entreprise en bourse = prix d\'une action × nombre total d\'actions.'},
{q:'Les "points" d\'un indice comme le CAC 40 — que signifient-ils ?',a:'Une valeur relative (pas une somme d\'argent), calculée à partir d\'une base fixée à 1000 points le 31/12/1987. Une variation de points = variation en % de la valeur moyenne pondérée des entreprises de l\'indice.'},
{q:'S&P 500',a:'Indice regroupant les 500 plus grandes entreprises cotées aux États-Unis.'},
{q:'Qu\'est-ce qui fait varier le prix d\'une action ?',a:'La loi de l\'offre et de la demande, influencée par les résultats de l\'entreprise, l\'actualité économique, les taux d\'intérêt et le sentiment du marché.'},
{q:'Règle risque/rendement',a:'Plus le rendement potentiel d\'un placement est élevé, plus le risque de perte est élevé. Il n\'existe pas de placement très rentable sans risque.'},
]},

'ETF, actions & stratégies d\'investissement': {
cours:`<h3>Qu'est-ce qu'un ETF ?</h3>
<p>Un <strong>ETF</strong> (Exchange Traded Fund, ou "tracker") est un fonds qui réplique la performance d'un indice (ex : un ETF CAC 40 suit le CAC 40, un ETF MSCI World suit le marché mondial). Acheter une part d'ETF = investir en une seule fois dans toutes les entreprises de l'indice.</p>
<div class="formula-box">
<strong>Avantages de l'ETF</strong> : diversification immédiate, frais de gestion très faibles (souvent &lt; 0,3%/an), pas besoin de choisir des actions individuellement.<br>
<strong>Action individuelle</strong> : potentiel de gain plus élevé si l'entreprise choisie performe bien, mais risque plus concentré (une seule entreprise).
</div>

<h3>La diversification</h3>
<p>Principe clé : <strong>ne pas mettre tous ses œufs dans le même panier</strong>. Répartir son argent entre plusieurs actifs (actions, secteurs, zones géographiques) réduit le risque global, car les mauvaises performances d'un actif peuvent être compensées par d'autres.</p>

<h3>Les enveloppes d'investissement en France</h3>
<ul>
<li><strong>PEA</strong> (Plan d'Épargne en Actions) : permet d'investir en actions européennes avec une fiscalité avantageuse après 5 ans de détention. Plafond de versement : 150 000 €.</li>
<li><strong>Assurance-vie</strong> : enveloppe polyvalente (fonds euros sécurisés + unités de compte plus risquées), fiscalité avantageuse après 8 ans.</li>
<li><strong>Compte-titres ordinaire (CTO)</strong> : pas de plafond ni de condition de durée, mais fiscalité moins avantageuse (flat tax de 30% sur les gains).</li>
</ul>

<h3>Stratégies d'investissement courantes</h3>
<ul>
<li><strong>DCA (Dollar Cost Averaging)</strong> : investir un montant fixe régulièrement (ex : chaque mois), plutôt qu'une grosse somme d'un coup. Lisse le prix d'achat moyen et réduit l'impact de la volatilité.</li>
<li><strong>Investissement long terme (buy and hold)</strong> : acheter et conserver sur plusieurs années, sans chercher à "timer" le marché.</li>
<li><strong>Trading actif</strong> : achats/reventes fréquents pour profiter des variations à court terme — beaucoup plus risqué et chronophage, déconseillé aux débutants.</li>
</ul>

<h3>Les intérêts composés</h3>
<div class="formula-box">Les intérêts composés = les gains génèrent eux-mêmes des gains dans le temps. C'est le principal moteur de l'enrichissement à long terme en bourse : plus l'horizon est long, plus l'effet est puissant.</div>

<h3>Vocabulaire essentiel</h3>
<ul>
<li><strong>Volatilité</strong> : amplitude des variations de prix d'un actif (plus elle est élevée, plus le risque à court terme est grand)</li>
<li><strong>Krach boursier</strong> : chute brutale et importante des cours sur un marché</li>
<li><strong>Bull market / Bear market</strong> : marché haussier / marché baissier prolongé</li>
<li><strong>Frais de gestion (TER)</strong> : pourcentage annuel prélevé par le fonds/ETF pour sa gestion</li>
</ul>`,
flashcards:[
{q:'ETF — définition',a:'Fonds coté en bourse qui réplique la performance d\'un indice (tracker). Acheter une part = investir dans toutes les entreprises de l\'indice en une fois.'},
{q:'Principal avantage d\'un ETF par rapport à une action individuelle',a:'Diversification immédiate avec des frais de gestion très faibles, sans avoir à choisir des entreprises une par une.'},
{q:'Principe de diversification',a:'Répartir son argent entre plusieurs actifs/secteurs/zones géographiques pour réduire le risque global du portefeuille.'},
{q:'PEA — caractéristiques',a:'Plan d\'Épargne en Actions : investit en actions européennes, fiscalité avantageuse après 5 ans, plafond de versement de 150 000 €.'},
{q:'PEA vs Compte-titres ordinaire (CTO)',a:'PEA : avantage fiscal après 5 ans mais limité aux actions européennes et plafonné. CTO : aucune limite ni condition de durée, mais fiscalité moins avantageuse (flat tax 30%).'},
{q:'DCA (Dollar Cost Averaging)',a:'Stratégie consistant à investir un montant fixe régulièrement (ex : chaque mois) plutôt qu\'une grosse somme d\'un coup, pour lisser le prix d\'achat moyen.'},
{q:'Intérêts composés',a:'Les gains générés par un placement produisent eux-mêmes des gains dans le temps. Moteur principal de l\'enrichissement à long terme.'},
{q:'Volatilité',a:'Amplitude des variations de prix d\'un actif. Plus elle est élevée, plus le risque de fortes variations à court terme est grand.'},
{q:'Krach boursier',a:'Chute brutale et importante des cours sur un marché financier.'},
{q:'Bull market vs Bear market',a:'Bull market : marché haussier prolongé. Bear market : marché baissier prolongé.'},
{q:'Pourquoi le "buy and hold" est recommandé aux débutants',a:'Éviter de chercher à prédire les mouvements à court terme (très difficile même pour des pros) ; sur le long terme, les marchés actions ont historiquement tendance à progresser.'},
]},
};
