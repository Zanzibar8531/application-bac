/* ============================================================
   BACMASTER — data/investissement.js
   Cours et flashcards — Bourse & Investissement (culture perso)
   ============================================================ */

PREBUILT['Bourse & Investissement'] = {

'C\'est quoi la bourse, vraiment ?': {
cours:`<h3>Pourquoi une entreprise a besoin d'argent</h3>
<p>Une entreprise qui veut grandir (construire une usine, embaucher, innover) a besoin d'argent qu'elle n'a pas forcément en caisse. Elle a <mark>2 grandes solutions</mark> :</p>
<ul>
<li><strong>Emprunter</strong> : à une banque, qu'elle devra rembourser avec des intérêts.</li>
<li><strong>Ouvrir son capital</strong> : découper l'entreprise en petites parts (les <mark>actions</mark>) et les vendre à qui veut bien les acheter, en échange d'argent qu'elle n'aura jamais à rembourser.</li>
</ul>
<div class="retenir-box">C'est LA différence fondamentale à comprendre : un prêt bancaire doit être remboursé. Une action vendue en bourse, non — l'argent reçu appartient définitivement à l'entreprise. En échange, l'acheteur devient copropriétaire et partage les risques (et les gains).</div>

<h3>C'est quoi, concrètement, la bourse ?</h3>
<p>La bourse est un <mark>marché</mark> — un grand système organisé qui met en relation des gens qui veulent VENDRE des actions (souvent l'entreprise elle-même au départ, puis d'autres actionnaires ensuite) avec des gens qui veulent en ACHETER. Aujourd'hui tout se passe en ligne, via des ordinateurs, mais le principe est le même qu'un marché physique : offre et demande.</p>
<ul>
<li>La <strong>Bourse de Paris</strong> (Euronext Paris) est l'endroit — aujourd'hui virtuel — où s'échangent les actions des entreprises françaises.</li>
<li><strong>IPO / Introduction en bourse</strong> : le moment où une entreprise vend ses actions au public pour la première fois.</li>
<li>Une fois introduite, l'action continue de s'échanger entre investisseurs, tous les jours, à un prix qui bouge selon l'offre et la demande.</li>
</ul>

<h3>D'où vient la valeur d'une action ?</h3>
<p>Le prix d'une action reflète ce que les investisseurs pensent que vaut l'entreprise <mark>aujourd'hui et dans le futur</mark>. Deux entreprises qui gagnent le même argent peuvent avoir des valeurs en bourse très différentes si l'une a de meilleures perspectives de croissance que l'autre.</p>
<div class="formula-box">Une action n'est pas un simple objet qu'on collectionne — c'est un droit réel sur une part des bénéfices futurs et du patrimoine d'une vraie entreprise (usines, brevets, marques, employés...).</div>

<h3>Qui achète des actions, et pourquoi ?</h3>
<ul>
<li><strong>Particuliers</strong> : pour faire fructifier leur épargne sur le long terme (retraite, projets futurs).</li>
<li><strong>Investisseurs institutionnels</strong> : banques, assurances, fonds de pension — gèrent d'énormes sommes pour le compte de leurs clients.</li>
<li><strong>L'entreprise elle-même</strong> parfois, pour racheter ses propres actions (ça réduit le nombre d'actions en circulation, ce qui peut faire monter le prix des actions restantes).</li>
</ul>

<h3>Bourse ≠ Casino</h3>
<div class="attention-box">Contrairement à une idée reçue, la bourse n'est pas un jeu de hasard sur le long terme : elle finance de vraies entreprises qui produisent de vraies choses. C'est le <mark>trading à très court terme</mark> (spéculer sur des mouvements de quelques heures) qui se rapproche du pari — investir sur 10-20 ans dans des entreprises solides est une logique totalement différente.</div>`,
flashcards:[
{q:'Les 2 façons pour une entreprise de trouver de l\'argent pour grandir',a:'Emprunter à une banque (à rembourser avec intérêts) ou ouvrir son capital en vendant des actions (jamais à rembourser).'},
{q:'Différence fondamentale entre un prêt bancaire et la vente d\'actions',a:'Le prêt doit être remboursé avec intérêts. L\'argent reçu en vendant des actions appartient définitivement à l\'entreprise, mais elle partage désormais la propriété et les bénéfices.'},
{q:'La bourse — définition simple',a:'Un marché organisé qui met en relation des vendeurs et des acheteurs d\'actions, où le prix se fixe par l\'offre et la demande.'},
{q:'IPO / Introduction en bourse',a:'Le moment où une entreprise vend ses actions au public pour la première fois.'},
{q:'D\'où vient la valeur d\'une action ?',a:'De ce que les investisseurs pensent que vaut l\'entreprise aujourd\'hui ET de ses perspectives de croissance future — pas seulement de ses bénéfices actuels.'},
{q:'Une action représente-t-elle quelque chose de réel ?',a:'Oui : un droit sur une part des bénéfices futurs et du patrimoine réel de l\'entreprise (usines, brevets, marques, etc.), pas un simple pari.'},
{q:'Pourquoi une entreprise rachète parfois ses propres actions',a:'Cela réduit le nombre d\'actions en circulation, ce qui tend à faire monter le prix des actions restantes.'},
{q:'Bourse vs Casino — la vraie différence',a:'La bourse finance de vraies entreprises productives sur le long terme. C\'est le trading très court terme (spéculation sur quelques heures) qui se rapproche du pari, pas l\'investissement long terme.'},
]},

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
<p>Les "points" du CAC 40 ne représentent <mark>pas une somme d'argent</mark> : c'est une valeur relative calculée à partir d'une base 1000 points fixée le 31/12/1987. Si le CAC 40 passe de 7000 à 7070 points, cela signifie que la valeur moyenne pondérée des 40 entreprises a augmenté d'1%.</p>
<div class="retenir-box">Les points d'un indice = un <mark>pourcentage déguisé</mark>, pas un montant. Retiens juste : "le CAC monte de X points" veut dire "les 40 grosses entreprises françaises valent en moyenne X% de plus qu'avant", rien d'autre.</div>
<ul>
<li><strong>CAC 40</strong> : 40 plus grandes entreprises françaises (Bourse de Paris)</li>
<li><strong>S&amp;P 500</strong> : 500 plus grandes entreprises américaines</li>
<li><strong>Nasdaq</strong> : indice américain concentré sur la tech</li>
<li><strong>MSCI World</strong> : indice mondial regroupant des milliers d'entreprises de pays développés</li>
</ul>

<h3>Comment le prix d'une action évolue-t-il ?</h3>
<p>Par la <strong>loi de l'offre et de la demande</strong> : plus il y a d'acheteurs que de vendeurs, plus le prix monte, et inversement. Ce qui influence l'offre/demande : résultats financiers de l'entreprise, actualité économique, taux d'intérêt, sentiment général du marché.</p>

<h3>Risque et rendement</h3>
<div class="attention-box">Règle fondamentale : plus le rendement potentiel est élevé, plus le risque est élevé. Il n'existe <mark>pas</mark> de placement à la fois très rentable et sans risque — méfie-toi de tout ce qui promet le contraire.</div>`,
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

<h3>ETF distribuant vs capitalisant</h3>
<p>Les entreprises d'un indice versent des <mark>dividendes</mark>. Un ETF peut les traiter de 2 façons différentes :</p>
<ul>
<li><strong>ETF distribuant</strong> : te verse les dividendes directement en cash sur ton compte, à intervalles réguliers.</li>
<li><strong>ETF capitalisant (Accumulating / "Acc")</strong> : ne te verse rien en cash — il réinvestit automatiquement les dividendes pour acheter de nouvelles fractions d'actions au sein de l'ETF.</li>
</ul>
<div class="retenir-box">Le capitalisant, c'est exactement le principe des <mark>intérêts composés</mark> en automatique : tes dividendes achètent plus de parts, qui généreront elles-mêmes plus de dividendes plus tard. Sur le très long terme (10-20 ans+), ça fait une vraie différence par rapport au distribuant où il faut réinvestir soi-même à la main.</div>

<h3>La diversification</h3>
<p>Principe clé : <mark>ne pas mettre tous ses œufs dans le même panier</mark>. Répartir son argent entre plusieurs actifs (actions, secteurs, zones géographiques) réduit le risque global, car les mauvaises performances d'un actif peuvent être compensées par d'autres.</p>

<h3>Les enveloppes d'investissement en France</h3>
<ul>
<li><strong>PEA</strong> (Plan d'Épargne en Actions) : permet d'investir en actions européennes avec une fiscalité avantageuse après 5 ans de détention. Plafond de versement : 150 000 €.</li>
<li><strong>Assurance-vie</strong> : enveloppe polyvalente (fonds euros sécurisés + unités de compte plus risquées), fiscalité avantageuse après 8 ans.</li>
<li><strong>Compte-titres ordinaire (CTO)</strong> : pas de plafond ni de condition de durée, mais fiscalité moins avantageuse (flat tax de 30% sur les gains).</li>
</ul>
<div class="retenir-box">PEA = avantage fiscal mais faut <mark>attendre 5 ans</mark> et rester en actions européennes. CTO = liberté totale, aucune contrainte, mais fiscalité pleine dès le départ. Le PEA est souvent le meilleur choix pour investir tôt et sur le long terme.</div>

<h3>Stratégies d'investissement courantes</h3>
<ul>
<li><strong>DCA (Dollar Cost Averaging)</strong> : investir un montant fixe régulièrement (ex : chaque mois), plutôt qu'une grosse somme d'un coup. Lisse le prix d'achat moyen et réduit l'impact de la volatilité.</li>
<li><strong>Investissement long terme (buy and hold)</strong> : acheter et conserver sur plusieurs années, sans chercher à "timer" le marché.</li>
<li><strong>Trading actif</strong> : achats/reventes fréquents pour profiter des variations à court terme — beaucoup plus risqué et chronophage, déconseillé aux débutants.</li>
</ul>

<h3>Mythe à casser : "vendre à découvert, c'est sûr"</h3>
<p>Idée très répandue sur les réseaux sociaux : quand une entreprise sort d'un grand indice (ex : Nike qui quitte le S&amp;P 100), "c'est sûr" que son action va continuer de chuter, donc autant <mark>vendre à découvert</mark> (parier sur la baisse).</p>
<div class="attention-box">Cette idée est dangereuse pour 2 raisons : (1) le marché <mark>anticipe</mark> souvent l'exclusion bien avant l'annonce officielle — le prix a déjà baissé, la nouvelle est donc parfois déjà "dans le prix". (2) La vente à découvert (short) a un risque de perte <mark>illimité</mark> : si le prix remonte au lieu de baisser, tes pertes n'ont pas de plafond — contrairement à un achat classique où tu perds au maximum ce que tu as investi. Sur les marchés, aucune baisse n'est jamais "garantie".</div>

<h3>Les intérêts composés</h3>
<div class="formula-box">Les intérêts composés = les gains génèrent eux-mêmes des gains dans le temps. C'est le principal moteur de l'enrichissement à long terme en bourse : plus l'horizon est long, plus l'effet est puissant.</div>

<h3>Vocabulaire essentiel</h3>
<ul>
<li><strong>Volatilité</strong> : amplitude des variations de prix d'un actif (plus elle est élevée, plus le risque à court terme est grand)</li>
<li><strong>Krach boursier</strong> : chute brutale et importante des cours sur un marché</li>
<li><strong>Bull market / Bear market</strong> : marché haussier / marché baissier prolongé</li>
<li><strong>Frais de gestion (TER)</strong> : pourcentage annuel prélevé par le fonds/ETF pour sa gestion</li>
<li><strong>Vente à découvert (short)</strong> : parier sur la baisse d'un actif — risque de perte illimité, stratégie réservée aux investisseurs expérimentés</li>
</ul>`,
flashcards:[
{q:'ETF — définition',a:'Fonds coté en bourse qui réplique la performance d\'un indice (tracker). Acheter une part = investir dans toutes les entreprises de l\'indice en une fois.'},
{q:'Principal avantage d\'un ETF par rapport à une action individuelle',a:'Diversification immédiate avec des frais de gestion très faibles, sans avoir à choisir des entreprises une par une.'},
{q:'ETF distribuant vs capitalisant',a:'Distribuant : verse les dividendes en cash sur ton compte. Capitalisant (Acc) : réinvestit automatiquement les dividendes pour acheter plus de parts — principe des intérêts composés en automatique.'},
{q:'Principe de diversification',a:'Répartir son argent entre plusieurs actifs/secteurs/zones géographiques pour réduire le risque global du portefeuille.'},
{q:'PEA — caractéristiques',a:'Plan d\'Épargne en Actions : investit en actions européennes, fiscalité avantageuse après 5 ans, plafond de versement de 150 000 €.'},
{q:'PEA vs Compte-titres ordinaire (CTO)',a:'PEA : avantage fiscal après 5 ans mais limité aux actions européennes et plafonné. CTO : aucune limite ni condition de durée, mais fiscalité moins avantageuse (flat tax 30%).'},
{q:'DCA (Dollar Cost Averaging)',a:'Stratégie consistant à investir un montant fixe régulièrement (ex : chaque mois) plutôt qu\'une grosse somme d\'un coup, pour lisser le prix d\'achat moyen.'},
{q:'Pourquoi "shorter" une action qui sort d\'un indice est risqué',a:'Le marché a souvent déjà anticipé la nouvelle avant l\'annonce officielle, et la vente à découvert expose à une perte illimitée si le prix remonte au lieu de baisser.'},
{q:'Vente à découvert (short) — risque principal',a:'Perte potentiellement illimitée si le prix monte, contrairement à un achat classique où la perte maximale est le montant investi.'},
{q:'Intérêts composés',a:'Les gains générés par un placement produisent eux-mêmes des gains dans le temps. Moteur principal de l\'enrichissement à long terme.'},
{q:'Volatilité',a:'Amplitude des variations de prix d\'un actif. Plus elle est élevée, plus le risque de fortes variations à court terme est grand.'},
{q:'Krach boursier',a:'Chute brutale et importante des cours sur un marché financier.'},
{q:'Bull market vs Bear market',a:'Bull market : marché haussier prolongé. Bear market : marché baissier prolongé.'},
{q:'Pourquoi le "buy and hold" est recommandé aux débutants',a:'Éviter de chercher à prédire les mouvements à court terme (très difficile même pour des pros) ; sur le long terme, les marchés actions ont historiquement tendance à progresser.'},
]},

'Matières premières : lire l\'économie mondiale': {
cours:`<h3>Les matières premières, un langage différent</h3>
<p>Contrairement à une action (qui dépend d'UNE entreprise précise), le prix d'une matière première dépend de <mark>l'offre et la demande mondiale</mark> — ça en fait un excellent indicateur pour comprendre l'économie globale, pas juste un pari.</p>

<h3>L'or : le baromètre de la peur mondiale</h3>
<div class="formula-box">L'or est une <strong>valeur refuge</strong> : quand les investisseurs ont peur (crise économique, guerre, inflation, instabilité politique), ils vendent des actifs risqués (actions) et achètent de l'or, jugé plus sûr car il garde de la valeur depuis des millénaires et n'est lié à aucune entreprise ou pays en particulier.</div>
<ul>
<li>Le prix de l'or <mark>monte</mark> généralement quand l'incertitude économique mondiale augmente.</li>
<li>Il a tendance à <mark>baisser</mark> quand la confiance revient et que les investisseurs retournent vers des actifs plus rentables (actions).</li>
<li>L'or est aussi utilisé comme protection contre l'<strong>inflation</strong> : sa quantité totale sur Terre est limitée, contrairement à une monnaie qu'un État peut créer.</li>
</ul>

<h3>Le cuivre : le thermomètre de l'industrie mondiale ("Dr. Copper")</h3>
<div class="formula-box">Le cuivre est surnommé <strong>"Dr. Copper"</strong> par les économistes car il a un <mark>doctorat en économie</mark> : son prix prédit souvent l'état de santé de l'industrie mondiale avant que les chiffres officiels ne sortent.</div>
<ul>
<li>Le cuivre est utilisé partout dans l'industrie et la construction : électricité, bâtiment, électronique, véhicules électriques.</li>
<li>Quand la demande industrielle mondiale ralentit (moins de construction, moins de production), le prix du cuivre <mark>baisse</mark> avant même que les statistiques économiques officielles ne le confirment.</li>
<li>La Chine étant le plus grand consommateur mondial de cuivre, son prix reflète en grande partie la <mark>santé économique chinoise</mark>.</li>
</ul>
<div class="retenir-box">Résumé : l'or monte quand le monde a peur, le cuivre monte quand l'industrie mondiale (surtout chinoise) va bien. Suivre les deux en même temps donne une vraie photo de "l'humeur" économique globale — c'est un excellent réflexe de culture générale, même sans y investir.</div>

<h3>Comment investir dans les matières premières</h3>
<ul>
<li><strong>ETF matières premières</strong> : réplique le prix de l'or/cuivre sans avoir à stocker le métal physiquement.</li>
<li><strong>Contrats à terme (futures)</strong> : engagement à acheter/vendre à un prix fixé pour une date future — réservé aux investisseurs expérimentés, effet de levier important.</li>
<li><strong>Or physique</strong> : lingots ou pièces — coûts de stockage/assurance à prévoir, peu pratique pour un petit budget.</li>
</ul>
<div class="attention-box">Les matières premières sont plus <mark>volatiles</mark> que les grands indices actions diversifiés et ne versent aucun dividende. Elles s'utilisent plutôt en petite partie d'un portefeuille (diversification), pas comme base principale d'investissement pour un débutant.</div>`,
flashcards:[
{q:'Pourquoi les matières premières sont un bon indicateur économique',a:'Leur prix dépend de l\'offre et la demande mondiale, pas d\'une seule entreprise — ça reflète la santé de l\'économie globale.'},
{q:'Or — valeur refuge, pourquoi ?',a:'Quand les investisseurs ont peur (crise, guerre, inflation), ils vendent des actifs risqués et achètent de l\'or, jugé plus stable et non lié à une entreprise ou un pays.'},
{q:'Quand le prix de l\'or monte-t-il généralement ?',a:'Quand l\'incertitude économique ou géopolitique mondiale augmente.'},
{q:'"Dr. Copper" — pourquoi ce surnom pour le cuivre ?',a:'Son prix prédit souvent l\'état de santé de l\'industrie mondiale avant même la sortie des statistiques économiques officielles.'},
{q:'Pourquoi le cuivre est lié à la Chine',a:'La Chine est le plus grand consommateur mondial de cuivre — son prix reflète donc en grande partie la santé économique chinoise.'},
{q:'Résumé or vs cuivre',a:'L\'or monte quand le monde a peur (valeur refuge). Le cuivre monte quand l\'industrie mondiale (surtout chinoise) va bien (indicateur industriel).'},
{q:'Pourquoi les matières premières ne sont pas idéales comme base d\'un portefeuille débutant',a:'Elles sont plus volatiles que les indices actions diversifiés et ne versent aucun dividende — à utiliser en petite partie du portefeuille, pas comme base principale.'},
]},
};
