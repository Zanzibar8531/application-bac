/* ============================================================
   BACMASTER — data/histoire-geo.js
   Cours et flashcards — Histoire-Géo
   ============================================================ */

PREBUILT['Histoire-Géo'] = {

'Grandes dates à connaître': {
cours:`<div class="frise-wrap" id="frise-top">
<h3>🕰️ Frise chronologique interactive</h3>
<p class="frise-hint">Touche une date pour voir un résumé, puis "Voir le cours complet" pour y aller directement dans le cours ci-dessous.</p>
<div class="frise-track">
<div class="frise-line"></div>
<button class="frise-pt" data-label="1789" data-summary="Révolution française — Déclaration des Droits de l'Homme et du Citoyen (DDHC)." data-target="d1789" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1789</span></button>
<button class="frise-pt" data-label="1804" data-summary="Sacre de Napoléon Ier Empereur, promulgation du Code civil." data-target="d1804" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1804</span></button>
<button class="frise-pt" data-label="1815" data-summary="Défaite de Napoléon à Waterloo — début de la Restauration." data-target="d1815" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1815</span></button>
<button class="frise-pt" data-label="1848" data-summary="Vague de révolutions en Europe. En France : abolition de l'esclavage, IIe République." data-target="d1848" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1848</span></button>
<button class="frise-pt" data-label="1870-71" data-summary="Guerre franco-prussienne, défaite française, Commune de Paris, début de la IIIe République." data-target="d1870" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1870-71</span></button>
<button class="frise-pt" data-label="1914" data-summary="28 juillet : déclenchement de la Première Guerre mondiale." data-target="d1914" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1914</span></button>
<button class="frise-pt" data-label="1916" data-summary="Batailles de Verdun et de la Somme — symboles de la guerre d'usure." data-target="d1916" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1916</span></button>
<button class="frise-pt" data-label="1917" data-summary="Entrée en guerre des États-Unis et double révolution russe." data-target="d1917" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1917</span></button>
<button class="frise-pt" data-label="1918" data-summary="11 novembre : Armistice, fin de la Première Guerre mondiale." data-target="d1918" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1918</span></button>
<button class="frise-pt" data-label="1919" data-summary="Traité de Versailles — règlement de paix qui culpabilise l'Allemagne." data-target="d1919" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1919</span></button>
<button class="frise-pt" data-label="1922" data-summary="Mussolini arrive au pouvoir — début du fascisme en Italie." data-target="d1922" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1922</span></button>
<button class="frise-pt" data-label="1929" data-summary="Krach boursier de Wall Street — début de la Grande Dépression mondiale." data-target="d1929" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1929</span></button>
<button class="frise-pt" data-label="1933" data-summary="Hitler nommé chancelier d'Allemagne — début du régime nazi." data-target="d1933" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1933</span></button>
<button class="frise-pt" data-label="1936" data-summary="Front populaire en France, gouvernement de Léon Blum." data-target="d1936" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1936</span></button>
<button class="frise-pt" data-label="1939" data-summary="1er septembre : invasion de la Pologne par l'Allemagne, déclenchement de la Seconde Guerre mondiale." data-target="d1939" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1939</span></button>
<button class="frise-pt" data-label="1940" data-summary="18 juin : Appel du Général de Gaulle depuis Londres. Juillet : mise en place du régime de Vichy." data-target="d1940a" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1940</span></button>
<button class="frise-pt" data-label="1944" data-summary="6 juin : Débarquement en Normandie (D-Day), ouverture du front Ouest." data-target="d1944" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1944</span></button>
<button class="frise-pt" data-label="1945" data-summary="8 mai : capitulation allemande. 6-9 août : bombes atomiques. 2 septembre : capitulation du Japon." data-target="d1945a" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1945</span></button>
<button class="frise-pt" data-label="1947" data-summary="Début officiel de la Guerre froide (doctrine Truman, plan Marshall)." data-target="d1947" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1947</span></button>
<button class="frise-pt" data-label="1954" data-summary="Défaite de Dien Bien Phu — début de la guerre d'Algérie." data-target="d1954" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1954</span></button>
<button class="frise-pt" data-label="1962" data-summary="Accords d'Évian — indépendance de l'Algérie." data-target="d1962" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1962</span></button>
<button class="frise-pt" data-label="1989" data-summary="Chute du mur de Berlin — symbole de la fin de la Guerre froide." data-target="d1989" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1989</span></button>
<button class="frise-pt" data-label="1991" data-summary="Dissolution de l'URSS — fin officielle de la Guerre froide." data-target="d1991" onclick="showFriseDetail(this)"><span class="frise-dot"></span><span class="frise-year">1991</span></button>
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
<li><strong>Totalitarisme</strong> : contrôle total de l'État sur la société (nazisme, stalinisme, fascisme).</li>
<li><strong>Autoritarisme</strong> : pouvoir concentré, opposants réprimés, mais contrôle social moins total.</li>
</ul>
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
<h3>Guerre froide</h3>
<ul>
<li><strong>Bipolarisation</strong> : monde divisé en deux blocs (USA/OTAN vs URSS/Pacte de Varsovie).</li>
<li><strong>Dissuasion nucléaire</strong> : la menace de destruction mutuelle empêche la guerre directe.</li>
<li><strong>Décolonisation</strong> : processus d'indépendance des colonies après 1945.</li>
</ul>`,
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
};
