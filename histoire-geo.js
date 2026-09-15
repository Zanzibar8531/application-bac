/* ============================================================
   BACMASTER — data/histoire-geo.js
   Cours et flashcards — Histoire-Géo
   ============================================================ */

PREBUILT['Histoire-Géo'] = {

'Grandes dates à connaître': {
cours:`<div class="frise-wrap" id="frise-top">
<h3>🕰️ Frise chronologique interactive</h3>
<p class="frise-hint">🏛️ Époque Contemporaine (1789 – 1991). Touche une date pour le résumé, puis "Voir le cours complet" pour y aller directement.</p>
<div class="frise-track">
<div class="frise-era" style="--era-c:#7c3aed">
<div class="frise-era-label">XIXe siècle</div>
<div class="frise-era-dots">
<button class="frise-pt" data-label="1789" data-summary="Révolution française — Déclaration des Droits de l'Homme et du Citoyen (DDHC)." data-target="d1789" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1789</span><span class="frise-title">Révolution</span></button>
<button class="frise-pt" data-label="1804" data-summary="Sacre de Napoléon Ier Empereur, promulgation du Code civil." data-target="d1804" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1804</span><span class="frise-title">Sacre Napoléon</span></button>
<button class="frise-pt" data-label="1815" data-summary="Défaite de Napoléon à Waterloo — début de la Restauration." data-target="d1815" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1815</span><span class="frise-title">Waterloo</span></button>
<button class="frise-pt" data-label="1848" data-summary="Vague de révolutions en Europe. En France : abolition de l'esclavage, IIe République." data-target="d1848" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1848</span><span class="frise-title">Printemps des peuples</span></button>
<button class="frise-pt" data-label="1870-71" data-summary="Guerre franco-prussienne, défaite française, Commune de Paris, début de la IIIe République." data-target="d1870" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1870-71</span><span class="frise-title">Franco-prussienne</span></button>
</div></div>
<div class="frise-era" style="--era-c:#dc2626">
<div class="frise-era-label">1re Guerre mondiale</div>
<div class="frise-era-dots">
<button class="frise-pt" data-label="1914" data-summary="28 juillet : déclenchement de la Première Guerre mondiale." data-target="d1914" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1914</span><span class="frise-title">Début de la guerre</span></button>
<button class="frise-pt" data-label="1916" data-summary="Batailles de Verdun et de la Somme — symboles de la guerre d'usure." data-target="d1916" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1916</span><span class="frise-title">Verdun</span></button>
<button class="frise-pt" data-label="1917" data-summary="Entrée en guerre des États-Unis et double révolution russe." data-target="d1917" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1917</span><span class="frise-title">Entrée des USA</span></button>
<button class="frise-pt" data-label="1918" data-summary="11 novembre : Armistice, fin de la Première Guerre mondiale." data-target="d1918" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1918</span><span class="frise-title">Armistice</span></button>
<button class="frise-pt" data-label="1919" data-summary="Traité de Versailles — règlement de paix qui culpabilise l'Allemagne." data-target="d1919" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1919</span><span class="frise-title">Versailles</span></button>
</div></div>
<div class="frise-era" style="--era-c:#d97706">
<div class="frise-era-label">Entre-deux-guerres</div>
<div class="frise-era-dots">
<button class="frise-pt" data-label="1922" data-summary="Mussolini arrive au pouvoir — début du fascisme en Italie." data-target="d1922" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1922</span><span class="frise-title">Mussolini</span></button>
<button class="frise-pt" data-label="1929" data-summary="Krach boursier de Wall Street — début de la Grande Dépression mondiale." data-target="d1929" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1929</span><span class="frise-title">Krach boursier</span></button>
<button class="frise-pt" data-label="1933" data-summary="Hitler nommé chancelier d'Allemagne — début du régime nazi." data-target="d1933" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1933</span><span class="frise-title">Hitler chancelier</span></button>
<button class="frise-pt" data-label="1936" data-summary="Front populaire en France, gouvernement de Léon Blum." data-target="d1936" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1936</span><span class="frise-title">Front populaire</span></button>
</div></div>
<div class="frise-era" style="--era-c:#991b1b">
<div class="frise-era-label">2nde Guerre mondiale</div>
<div class="frise-era-dots">
<button class="frise-pt" data-label="1939" data-summary="1er septembre : invasion de la Pologne par l'Allemagne, déclenchement de la Seconde Guerre mondiale." data-target="d1939" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1939</span><span class="frise-title">Invasion Pologne</span></button>
<button class="frise-pt" data-label="1940" data-summary="18 juin : Appel du Général de Gaulle depuis Londres. Juillet : mise en place du régime de Vichy." data-target="d1940a" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1940</span><span class="frise-title">Appel du 18 juin</span></button>
<button class="frise-pt" data-label="1944" data-summary="6 juin : Débarquement en Normandie (D-Day), ouverture du front Ouest." data-target="d1944" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1944</span><span class="frise-title">Débarquement</span></button>
<button class="frise-pt" data-label="1945" data-summary="8 mai : capitulation allemande. 6-9 août : bombes atomiques. 2 septembre : capitulation du Japon." data-target="d1945a" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1945</span><span class="frise-title">Fin de la guerre</span></button>
</div></div>
<div class="frise-era" style="--era-c:#0891b2">
<div class="frise-era-label">Guerre froide &amp; décolonisation</div>
<div class="frise-era-dots">
<button class="frise-pt" data-label="1947" data-summary="Début officiel de la Guerre froide (doctrine Truman, plan Marshall)." data-target="d1947" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1947</span><span class="frise-title">Doctrine Truman</span></button>
<button class="frise-pt" data-label="1954" data-summary="Défaite de Dien Bien Phu — début de la guerre d'Algérie." data-target="d1954" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1954</span><span class="frise-title">Dien Bien Phu</span></button>
<button class="frise-pt" data-label="1962" data-summary="Accords d'Évian — indépendance de l'Algérie." data-target="d1962" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1962</span><span class="frise-title">Indép. Algérie</span></button>
<button class="frise-pt" data-label="1989" data-summary="Chute du mur de Berlin — symbole de la fin de la Guerre froide." data-target="d1989" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1989</span><span class="frise-title">Mur de Berlin</span></button>
<button class="frise-pt" data-label="1991" data-summary="Dissolution de l'URSS — fin officielle de la Guerre froide." data-target="d1991" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1991</span><span class="frise-title">Fin de l'URSS</span></button>
</div></div>
</div>
<div class="frise-detail" id="frise-detail"><p class="frise-detail-empty">👆 Touche une date sur la frise pour l'explorer.</p></div>
</div>
<h3>XIXe siècle</h3>
<ul>
<li id="d1789"><strong>1789</strong> : Révolution française — DDHC</li>
<li id="d1804"><strong>1804</strong> : Sacre de Napoléon Ier, Code civil</li>
<li id="d1815"><strong>1815</strong> : Défaite de Napoléon à Waterloo, Restauration</li>
<li id="d1848"><strong>1848</strong> : Révolutions en Europe, Abolition de l'esclavage (France), IIe République</li>
<li id="d1870"><strong>1870-71</strong> : Guerre franco-prussienne, Commune de Paris, IIIe République</li>
</ul>
<p class="frise-back"><button class="frise-back-link" onclick="scrollToFrise()">↑ Retour à la frise</button></p>
<h3>Première Guerre mondiale</h3>
<ul>
<li id="d1914"><strong>28 juillet 1914</strong> : Déclaration de guerre (déclenchement)</li>
<li id="d1916"><strong>1916</strong> : Batailles de Verdun et de la Somme</li>
<li id="d1917"><strong>1917</strong> : Entrée en guerre des États-Unis + Révolution russe (Octobre)</li>
<li id="d1918"><strong>11 novembre 1918</strong> : Armistice — fin de la 1re Guerre mondiale</li>
<li id="d1919"><strong>1919</strong> : Traité de Versailles</li>
</ul>
<p class="frise-back"><button class="frise-back-link" onclick="scrollToFrise()">↑ Retour à la frise</button></p>
<h3>Entre-deux-guerres</h3>
<ul>
<li id="d1922"><strong>1922</strong> : Mussolini au pouvoir (fascisme en Italie)</li>
<li id="d1929"><strong>1929</strong> : Krach boursier (crise économique mondiale)</li>
<li id="d1933"><strong>1933</strong> : Hitler chancelier en Allemagne</li>
<li id="d1936"><strong>1936</strong> : Front populaire en France (Blum)</li>
</ul>
<p class="frise-back"><button class="frise-back-link" onclick="scrollToFrise()">↑ Retour à la frise</button></p>
<h3>Seconde Guerre mondiale</h3>
<ul>
<li id="d1939"><strong>1er septembre 1939</strong> : Invasion de la Pologne par l'Allemagne</li>
<li id="d1940a"><strong>18 juin 1940</strong> : Appel du Général de Gaulle (BBC)</li>
<li id="d1940b"><strong>juillet 1940</strong> : Régime de Vichy (Pétain)</li>
<li id="d1944"><strong>6 juin 1944</strong> : Débarquement en Normandie (D-Day)</li>
<li id="d1945a"><strong>8 mai 1945</strong> : Capitulation de l'Allemagne — fin en Europe</li>
<li id="d1945b"><strong>6-9 août 1945</strong> : Bombes atomiques sur Hiroshima et Nagasaki</li>
<li id="d1945c"><strong>2 septembre 1945</strong> : Capitulation du Japon — fin de la 2e G.M.</li>
</ul>
<p class="frise-back"><button class="frise-back-link" onclick="scrollToFrise()">↑ Retour à la frise</button></p>
<h3>Guerre froide &amp; décolonisation</h3>
<ul>
<li id="d1947"><strong>1947</strong> : Début de la Guerre froide (doctrine Truman)</li>
<li id="d1954"><strong>1954</strong> : Défaite de Dien Bien Phu, début guerre d'Algérie</li>
<li id="d1962"><strong>1962</strong> : Indépendance de l'Algérie (Accords d'Évian)</li>
<li id="d1989"><strong>1989</strong> : Chute du mur de Berlin</li>
<li id="d1991"><strong>1991</strong> : Dissolution de l'URSS</li>
</ul>
<p class="frise-back"><button class="frise-back-link" onclick="scrollToFrise()">↑ Retour à la frise</button></p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Range dans l'ordre chronologique les événements suivants : Chute du mur de Berlin, Prise de la Bastille, Débarquement en Normandie, Armistice de 1918.</p>`, aide:`Repère les siècles : un événement du XVIIIe, deux de la Seconde Guerre mondiale/1918 (XXe), un de la fin du XXe.`, correction:`<p><strong>Ordre chronologique</strong> :</p><p>1. Prise de la Bastille (14 juillet 1789)</p><p>2. Armistice (11 novembre 1918)</p><p>3. Débarquement en Normandie (6 juin 1944)</p><p>4. Chute du mur de Berlin (9 novembre 1989)</p>`},
{niveau:'Moyen', enonce:`<p>Explique en 3-4 lignes le lien de cause à effet entre le Traité de Versailles (1919) et la montée du nazisme dans les années 1930.</p>`, aide:`Que demande le traité à l'Allemagne (réparations, culpabilité) ? Comment cela peut-il nourrir un sentiment d'humiliation exploité ensuite par un discours nationaliste ?`, correction:`<p>Le Traité de Versailles impose à l'Allemagne de lourdes réparations financières et une clause de culpabilité pour la guerre, ce qui humilie profondément le pays et aggrave sa crise économique. Ce ressentiment national, combiné à la crise de 1929, crée un terreau propice à des discours nationalistes et revanchards — Hitler exploite précisément cette humiliation dans sa propagande pour arriver au pouvoir en 1933.</p>`},
{niveau:'Difficile', enonce:`<p>Compare les régimes totalitaires nazi et stalinien : quel point commun essentiel partagent-ils, et quelle différence idéologique majeure les oppose ?</p>`, aide:`Pense au degré de contrôle de l'État sur la société (point commun), puis à ce sur quoi repose chaque idéologie (nationalisme racial vs internationalisme de classe).`, correction:`<p><strong>Point commun</strong> : les deux sont des régimes totalitaires qui exercent un contrôle total sur la société — parti unique, propagande omniprésente, police politique, culte du chef, répression brutale de toute opposition.</p><p><strong>Différence idéologique majeure</strong> : le nazisme repose sur une idéologie <mark>raciale et nationaliste</mark> (supériorité de la "race aryenne", expansion territoriale), tandis que le stalinisme repose sur une idéologie <mark>de classe internationaliste</mark> (dictature du prolétariat, collectivisation économique), même si dans la pratique Staline a aussi développé un fort nationalisme soviétique.</p>`},
],
flashcards:[
{q:'1789',a:'Révolution française — Déclaration des Droits de l\'Homme et du Citoyen (DDHC).'},
{q:'1804',a:'Sacre de Napoléon Ier Empereur + promulgation du Code civil.'},
{q:'11 novembre 1918',a:'Armistice — fin de la Première Guerre mondiale.'},
{q:'1919',a:'Traité de Versailles : règlement de paix après la 1re G.M. Culpabilise l\'Allemagne.'},
{q:'1929',a:'Krach boursier (jeudi noir, Wall Street) → Grande Dépression mondiale.'},
{q:'1933',a:'Hitler nommé chancelier d\'Allemagne → début du régime nazi.'},
{q:'1er septembre 1939',a:'Invasion de la Pologne par l\'Allemagne → déclenchement de la 2e G.M.'},
{q:'18 juin 1940',a:'Appel du Général de Gaulle à la BBC depuis Londres → début de la Résistance.'},
{q:'Régime de Vichy',a:'Gouvernement de Pétain (juillet 1940) qui collabore avec l\'Allemagne nazie.'},
{q:'6 juin 1944',a:'Débarquement en Normandie (D-Day) — ouverture du front Ouest.'},
{q:'8 mai 1945',a:'Capitulation de l\'Allemagne — fin de la guerre en Europe.'},
{q:'6 août 1945',a:'Bombe atomique sur Hiroshima. 9 août → Nagasaki. 2 sept → capitulation Japon.'},
{q:'1947',a:'Début officiel de la Guerre froide (doctrine Truman, plan Marshall).'},
{q:'1962',a:'Accords d\'Évian → Indépendance de l\'Algérie.'},
{q:'9 novembre 1989',a:'Chute du mur de Berlin → symbole de la fin de la Guerre froide.'},
{q:'1991',a:'Dissolution de l\'URSS → fin de la Guerre froide.'},
{q:'1848',a:'Vague de révolutions en Europe. En France : abolition de l\'esclavage, IIe République, suffrage universel masculin.'},
{q:'1870-1871',a:'Guerre franco-prussienne → défaite, perte de l\'Alsace-Lorraine, Commune de Paris, IIIe République.'},
{q:'1916',a:'Batailles de Verdun et de la Somme — symboles de la guerre d\'usure de la 1re G.M.'},
{q:'1917',a:'Entrée en guerre des États-Unis + double révolution russe (Février & Octobre/Bolcheviks).'},
]},

'Notions clés': {
cours:`<h3>Notions Essentielles — Histoire-Géo Première</h3>
<h3>Régimes politiques</h3>
<ul>
<li><strong>Démocratie libérale</strong> : séparation des pouvoirs, droits fondamentaux, élections libres.</li>
<li><strong>Totalitarisme</strong> : contrôle <mark>total</mark> de l'État sur la société (nazisme, stalinisme, fascisme).</li>
<li><strong>Autoritarisme</strong> : pouvoir concentré, opposants réprimés, mais contrôle social moins total.</li>
</ul>
<div class="retenir-box">Totalitarisme vs Autoritarisme : la différence clé est le degré de contrôle. Le totalitarisme veut contrôler <mark>toute</mark> la vie (culture, économie, vie privée), l'autoritarisme se contente de réprimer l'opposition politique sans aller jusque-là.</div>
<h3>Première Guerre mondiale</h3>
<ul>
<li><strong>Guerre de position / tranchées</strong> : enlisement du conflit, conditions inhumaines.</li>
<li><strong>Union sacrée</strong> : union de tous les partis politiques français en 1914 pour l'effort de guerre.</li>
<li><strong>Génocide arménien</strong> : 1915-1916, premier génocide du XXe siècle (Empire ottoman).</li>
</ul>
<h3>Seconde Guerre mondiale</h3>
<ul>
<li><strong>Blitzkrieg</strong> : "guerre éclair" allemande — offensive rapide, blindés et aviation.</li>
<li><strong>Résistance</strong> : mouvements clandestins contre l'occupation nazie.</li>
<li><strong>Shoah / Holocauste</strong> : génocide des Juifs par les nazis (≈ 6 millions de victimes).</li>
<li><strong>Collaboration</strong> : coopération avec l'occupant nazi (Vichy).</li>
</ul>
<div class="attention-box">Ne confonds pas Collaboration et Résistance : ce sont deux réactions <mark>opposées</mark> à l'occupation, qui coexistaient en France entre 1940 et 1944. Un sujet peut te demander de comparer les deux.</div>
<h3>Guerre froide</h3>
<ul>
<li><strong>Bipolarisation</strong> : monde divisé en deux blocs (USA/OTAN vs URSS/Pacte de Varsovie).</li>
<li><strong>Dissuasion nucléaire</strong> : la menace de destruction mutuelle empêche la guerre directe.</li>
<li><strong>Décolonisation</strong> : processus d'indépendance des colonies après 1945.</li>
</ul>`,
exercices:[
{niveau:'Facile', enonce:`<p>Définis en une phrase la "Guerre de position" (ou guerre de tranchées) durant la Première Guerre mondiale.</p>`, aide:`Pense à ce qui caractérise le front pendant la majeure partie de la guerre : mouvement rapide, ou enlisement ?`, correction:`<p>La guerre de position désigne l'enlisement du conflit dans des tranchées fixes, où les deux camps s'affrontent sur un front qui bouge très peu pendant des mois voire des années, dans des conditions de vie inhumaines.</p>`},
{niveau:'Moyen', enonce:`<p>Explique pourquoi la Guerre froide (1947-1991) est qualifiée de "froide" alors qu'elle a duré plus de 40 ans.</p>`, aide:`Y a-t-il eu un affrontement militaire direct entre les deux grandes puissances (USA/URSS) ? Comment s'est exprimée leur rivalité si ce n'est pas par une guerre "chaude" ?`, correction:`<p>La Guerre froide est qualifiée de "froide" car les États-Unis et l'URSS ne se sont <mark>jamais affrontés militairement de façon directe</mark>. Leur rivalité s'est exprimée autrement : course aux armements nucléaires, propagande, espionnage, soutien à des conflits périphériques (guerres "par procuration" comme en Corée ou au Vietnam), et compétition technologique (conquête spatiale). La dissuasion nucléaire (destruction mutuelle assurée) a empêché tout affrontement direct.</p>`},
{niveau:'Difficile', enonce:`<p>En quoi la décolonisation peut-elle être analysée comme une conséquence indirecte de la Seconde Guerre mondiale ? Donne au moins 2 arguments.</p>`, aide:`Pense à l'affaiblissement des puissances coloniales européennes, mais aussi aux idées/valeurs diffusées pendant et après la guerre (droits, autodétermination).`, correction:`<p><strong>Argument 1</strong> : la Seconde Guerre mondiale a considérablement <mark>affaibli économiquement et militairement</mark> les puissances coloniales européennes (France, Royaume-Uni), qui n'ont plus les moyens de maintenir leurs empires par la force face aux mouvements indépendantistes.</p><p><strong>Argument 2</strong> : la guerre a diffusé des <mark>idéaux de liberté et d'autodétermination des peuples</mark> (via la Charte de l'Atlantique de 1941, et la lutte contre les régimes totalitaires), que les colonisés retournent logiquement contre leurs propres colonisateurs, créant une contradiction morale difficile à défendre pour les Européens.</p>`},
],
flashcards:[
{q:'Totalitarisme',a:'Régime politique où l\'État contrôle totalement la société, l\'économie, la culture et la vie privée. Ex : nazisme, stalinisme.'},
{q:'Union sacrée (1914)',a:'Union de tous les partis politiques français autour du gouvernement pour mener la guerre. Suspends les conflits politiques.'},
{q:'Génocide arménien',a:'1915-1916 : extermination des Arméniens par l\'Empire ottoman. Premier génocide du XXe siècle (≈ 1,5 million de victimes).'},
{q:'Blitzkrieg',a:'"Guerre éclair" : stratégie allemande d\'offensive rapide combinant chars, aviation et infanterie.'},
{q:'Shoah / Holocauste',a:'Génocide des Juifs d\'Europe par les nazis : environ 6 millions de victimes (1941-1945).'},
{q:'Collaboration (2e G.M.)',a:'Coopération active avec l\'occupant nazi allemand. En France : régime de Vichy (Pétain).'},
{q:'Résistance (2e G.M.)',a:'Ensemble des mouvements clandestins qui s\'opposaient à l\'occupation nazie. En France : CNR (de Gaulle).'},
{q:'Guerre froide',a:'Affrontement indirect (1947-1991) entre les États-Unis et l\'URSS, sans conflit militaire direct entre eux.'},
{q:'Bipolarisation',a:'Division du monde en deux blocs pendant la Guerre froide : bloc occidental (USA-OTAN) et bloc soviétique (URSS-Pacte de Varsovie).'},
{q:'Dissuasion nucléaire',a:'La possession d\'armes nucléaires par les deux superpuissances empêche toute guerre directe (destruction mutuelle assurée).'},
{q:'Décolonisation',a:'Processus d\'accession à l\'indépendance des territoires colonisés, principalement après 1945.'},
{q:'Plan Marshall (1947)',a:'Aide économique américaine à l\'Europe occidentale pour reconstruire et résister au communisme.'},
{q:'Traité de Versailles (1919)',a:'Traité de paix après la 1re G.M. Responsabilise l\'Allemagne, lui impose des réparations. Germe de la montée du nazisme.'},
]},

'La Révolution française en détail (1789-1799)': {
cours:`<h3>1789 — L'année fondatrice</h3>
<ul>
<li><strong>5 mai 1789</strong> : Louis XVI ouvre les <mark>États généraux</mark> à Versailles — dernier recours face à la faillite du royaume. Ils réunissent les 3 ordres : clergé, noblesse, tiers état.</li>
<li><strong>17 juin 1789</strong> : le tiers état, ne parvenant pas à obtenir un vote "par tête" (plus juste que le vote "par ordre" qui l'avantage moins), se proclame seul <mark>Assemblée nationale</mark>.</li>
<li><strong>20 juin 1789</strong> : le roi fait fermer leur salle de réunion. Les députés se réfugient dans une salle voisine et prêtent le <mark>Serment du Jeu de Paume</mark> : ils jurent de ne pas se séparer avant d'avoir donné une Constitution à la France.</li>
<li><strong>14 juillet 1789</strong> : <mark>prise de la Bastille</mark>, forteresse-prison symbole de l'arbitraire royal, par le peuple parisien en quête d'armes et de poudre.</li>
<li><strong>4 août 1789</strong> (nuit) : <mark>abolition des privilèges</mark> féodaux par l'Assemblée, dans un grand élan (fin du servage, des droits seigneuriaux...).</li>
<li><strong>26 août 1789</strong> : adoption de la <mark>Déclaration des Droits de l'Homme et du Citoyen</mark> (DDHC) — liberté, égalité, propriété, sûreté.</li>
<li><strong>5-6 octobre 1789</strong> : la <mark>marche des femmes sur Versailles</mark> (colère face au prix du pain) force le roi et sa famille à s'installer à Paris, sous surveillance populaire.</li>
</ul>
<div class="retenir-box">Ordre à retenir dans la tête : États généraux (mai) → Serment du Jeu de Paume (juin) → Bastille (juillet) → Abolition des privilèges + DDHC (août) → Marche des femmes (octobre). Chaque étape radicalise un peu plus la situation.</div>

<h3>1791-1792 — Vers la République</h3>
<ul>
<li><strong>Juin 1791</strong> : <mark>fuite de Varennes</mark> — Louis XVI tente de fuir à l'étranger, est reconnu et ramené à Paris. Sa loyauté envers la Révolution est désormais fortement suspectée.</li>
<li><strong>1791</strong> : la 1re <mark>Constitution</mark> française instaure une monarchie constitutionnelle (le roi garde un rôle, mais partage le pouvoir avec une Assemblée élue).</li>
<li><strong>10 août 1792</strong> : prise du palais des Tuileries par les émeutiers — c'est la <mark>chute de la monarchie</mark>. Le roi est emprisonné.</li>
<li><strong>20 septembre 1792</strong> : <mark>victoire de Valmy</mark> contre les armées austro-prussiennes — sauve la Révolution d'une invasion.</li>
<li><strong>21-22 septembre 1792</strong> : la nouvelle assemblée, la <mark>Convention</mark>, proclame la <mark>Première République</mark>.</li>
</ul>

<h3>1793 — Girondins contre Montagnards</h3>
<p>Au sein de la Convention, deux factions républicaines s'affrontent violemment sur la conduite à tenir :</p>
<div class="formula-box">
<strong>Girondins</strong> : plus modérés, souvent issus de la bourgeoisie provinciale, méfiants envers les excès populaires parisiens, veulent étendre la guerre révolutionnaire à toute l'Europe.<br>
<strong>Montagnards</strong> : plus radicaux (siègent en haut de l'Assemblée, d'où leur nom), alliés aux <mark>sans-culottes</mark> parisiens, favorables au contrôle des prix et à une répression ferme des ennemis de la Révolution. Menés par Robespierre, Danton, Marat, Saint-Just.
</div>
<ul>
<li><strong>21 janvier 1793</strong> : exécution de <mark>Louis XVI</mark> — les Girondins voulaient un référendum populaire sur son sort, les Montagnards l'exécution rapide. Les Montagnards l'emportent.</li>
<li><strong>31 mai - 2 juin 1793</strong> : les sans-culottes et les Montagnards éliminent les Girondins de la Convention — les Montagnards prennent seuls le pouvoir.</li>
<li><strong>5 septembre 1793</strong> : la <mark>Terreur</mark> est officiellement déclarée par la Convention — répression violente de tout soupçon de contre-révolution, via le Tribunal révolutionnaire.</li>
</ul>
<div class="attention-box">Ne dis jamais "Girondins = contre-révolutionnaires" : ce sont des <mark>républicains</mark> comme les Montagnards ! La différence est une question de degré (modération vs radicalité), pas de camp opposé (royalistes vs républicains).</div>

<h3>1794 — La chute de Robespierre</h3>
<p>La <mark>Grande Terreur</mark> s'intensifie au printemps-été 1794, y compris contre d'anciens révolutionnaires jugés pas assez radicaux (hébertistes, dantonistes). L'isolement politique de Robespierre s'accroît.</p>
<ul>
<li><strong>27-28 juillet 1794</strong> (9-10 Thermidor an II) : Robespierre est arrêté puis guillotiné avec ses proches (Saint-Just, Couthon...) — c'est la <mark>chute de Robespierre</mark>, qui met fin à la Terreur.</li>
</ul>

<h3>1795-1799 — Le Directoire</h3>
<p>La Convention thermidorienne (après la chute de Robespierre) instaure en 1795 le <strong>Directoire</strong>, régime plus modéré mais instable, jusqu'au coup d'État du <mark>18 Brumaire</mark> (9 novembre 1799) où <strong>Napoléon Bonaparte</strong> prend le pouvoir, mettant fin à la Révolution.</p>`,
exercices:[
{niveau:'Facile', enonce:`<p>Remets dans l'ordre chronologique : Prise de la Bastille, Serment du Jeu de Paume, Ouverture des États généraux, Abolition des privilèges.</p>`, aide:`Tous ces événements ont lieu en 1789 — repère le mois de chacun (mai, juin, juillet, août).`, correction:`<p>1. Ouverture des États généraux (5 mai)</p><p>2. Serment du Jeu de Paume (20 juin)</p><p>3. Prise de la Bastille (14 juillet)</p><p>4. Abolition des privilèges (4 août, nuit)</p>`},
{niveau:'Moyen', enonce:`<p>Explique la différence de position entre Girondins et Montagnards concernant le sort de Louis XVI en janvier 1793.</p>`, aide:`L'un des deux camps veut consulter le peuple avant de trancher, l'autre veut agir vite et fermement — lequel est lequel ?`, correction:`<p>Les <strong>Girondins</strong>, plus modérés, souhaitaient un <mark>référendum populaire</mark> pour faire trancher le peuple sur le sort du roi, ou du moins un débat plus prudent. Les <strong>Montagnards</strong>, plus radicaux et alliés aux sans-culottes, voulaient une <mark>exécution rapide</mark> sans consultation, jugeant le roi coupable de trahison envers la nation. Ce sont finalement les Montagnards qui l'emportent : Louis XVI est exécuté le 21 janvier 1793.</p>`},
{niveau:'Difficile', enonce:`<p>Montre en quoi la Terreur (1793-1794) peut être comprise à la fois comme une conséquence du contexte de guerre et de menace intérieure, et comme une dérive politique. Utilise au moins 2 arguments.</p>`, aide:`Pense au contexte : la France est en guerre contre plusieurs puissances européennes ET craint des soulèvements contre-révolutionnaires internes (ex : en Vendée). Mais pense aussi à l'ampleur et à la durée de la répression, y compris contre d'anciens révolutionnaires.`, correction:`<p><strong>Argument contextuel</strong> : en 1793, la République est menacée à la fois de l'extérieur (guerre contre l'Autriche, la Prusse, puis une large coalition européenne) et de l'intérieur (soulèvements contre-révolutionnaires comme en Vendée). La Terreur répond en partie à ce sentiment d'urgence et de danger existentiel pour la Révolution.</p><p><strong>Argument de dérive</strong> : cependant, la Terreur s'étend progressivement à des cibles de plus en plus larges, y compris d'anciens révolutionnaires jugés "pas assez radicaux" (hébertistes, dantonistes), ce qui dépasse la simple logique défensive et relève d'une dérive répressive, alimentée par la méfiance généralisée et la concentration du pouvoir entre les mains du Comité de salut public.</p>`},
],
flashcards:[
{q:'5 mai 1789',a:'Louis XVI ouvre les États généraux à Versailles, réunissant clergé, noblesse et tiers état.'},
{q:'17 juin 1789',a:'Le tiers état se proclame seul Assemblée nationale, faute d\'obtenir un vote par tête.'},
{q:'20 juin 1789',a:'Serment du Jeu de Paume : les députés jurent de ne pas se séparer avant d\'avoir donné une Constitution à la France.'},
{q:'14 juillet 1789',a:'Prise de la Bastille par le peuple parisien, en quête d\'armes et de poudre.'},
{q:'4 août 1789',a:'Abolition des privilèges féodaux dans la nuit, par l\'Assemblée.'},
{q:'26 août 1789',a:'Adoption de la Déclaration des Droits de l\'Homme et du Citoyen (DDHC).'},
{q:'5-6 octobre 1789',a:'Marche des femmes sur Versailles (colère liée au prix du pain) : le roi est ramené à Paris sous surveillance populaire.'},
{q:'Fuite de Varennes (juin 1791)',a:'Louis XVI tente de fuir la France, est reconnu et ramené à Paris — sa loyauté envers la Révolution est désormais très suspectée.'},
{q:'10 août 1792',a:'Prise des Tuileries — chute de la monarchie, le roi est emprisonné.'},
{q:'20 septembre 1792',a:'Victoire de Valmy contre les armées austro-prussiennes, qui sauve la Révolution d\'une invasion.'},
{q:'21-22 septembre 1792',a:'La Convention proclame la Première République.'},
{q:'Girondins — positionnement',a:'Républicains modérés, méfiants envers les excès populaires parisiens, favorables à l\'extension de la guerre révolutionnaire en Europe.'},
{q:'Montagnards — positionnement',a:'Républicains plus radicaux, alliés aux sans-culottes, favorables au contrôle des prix et à une répression ferme. Menés par Robespierre, Danton, Marat, Saint-Just.'},
{q:'21 janvier 1793',a:'Exécution de Louis XVI, après un débat opposant Girondins (référendum) et Montagnards (exécution rapide) — les Montagnards l\'emportent.'},
{q:'31 mai - 2 juin 1793',a:'Élimination des Girondins de la Convention par les Montagnards et les sans-culottes — les Montagnards prennent seuls le pouvoir.'},
{q:'5 septembre 1793',a:'La Terreur est officiellement déclarée par la Convention.'},
{q:'9-10 Thermidor an II (27-28 juillet 1794)',a:'Chute de Robespierre : il est arrêté puis guillotiné avec ses proches, ce qui met fin à la Terreur.'},
{q:'18 Brumaire (9 novembre 1799)',a:'Coup d\'État de Napoléon Bonaparte, qui met fin au Directoire et à la Révolution française.'},
{q:'Sans-culottes',a:'Membres du peuple parisien révolutionnaire (artisans, petits commerçants), alliés politiques des Montagnards, favorables à des mesures sociales radicales.'},
]},
};
