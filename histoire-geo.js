/* ============================================================
   BACMASTER — data/histoire-geo.js
   Cours et flashcards — Histoire-Géographie
   (contenu relu, corrigé et enrichi)
   ============================================================ */

PREBUILT["Histoire-Géo"] = {
 "Grandes dates à connaître": {
  "cours": "<div class=\"frise-wrap\" id=\"frise-top\">\n<h3>🕰️ Frise chronologique interactive</h3>\n<p class=\"frise-hint\">🏛️ Époque Contemporaine (1789 – 1991). Touche une date pour le résumé, puis \"Voir le cours complet\" pour y aller directement.</p>\n<div class=\"frise-track\">\n<div class=\"frise-era\" style=\"--era-c:#7c3aed\">\n<div class=\"frise-era-label\">XIXe siècle</div>\n<div class=\"frise-era-dots\">\n<button class=\"frise-pt\" data-label=\"1789\" data-summary=\"Révolution française — Déclaration des Droits de l'Homme et du Citoyen (DDHC).\" data-target=\"d1789\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1789</span><span class=\"frise-title\">Révolution</span></button>\n<button class=\"frise-pt\" data-label=\"1804\" data-summary=\"Sacre de Napoléon Ier Empereur, promulgation du Code civil.\" data-target=\"d1804\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1804</span><span class=\"frise-title\">Sacre Napoléon</span></button>\n<button class=\"frise-pt\" data-label=\"1815\" data-summary=\"Défaite de Napoléon à Waterloo (18 juin). Louis XVIII est au pouvoir : c'est la Restauration (1814-1830).\" data-target=\"d1815\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1815</span><span class=\"frise-title\">Waterloo</span></button>\n<button class=\"frise-pt\" data-label=\"1848\" data-summary=\"Vague de révolutions en Europe. En France : abolition de l'esclavage, IIe République.\" data-target=\"d1848\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1848</span><span class=\"frise-title\">Printemps des peuples</span></button>\n<button class=\"frise-pt\" data-label=\"1870-71\" data-summary=\"Guerre franco-prussienne, défaite française, Commune de Paris, début de la IIIe République.\" data-target=\"d1870\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1870-71</span><span class=\"frise-title\">Franco-prussienne</span></button>\n</div></div>\n<div class=\"frise-era\" style=\"--era-c:#dc2626\">\n<div class=\"frise-era-label\">1re Guerre mondiale</div>\n<div class=\"frise-era-dots\">\n<button class=\"frise-pt\" data-label=\"1914\" data-summary=\"28 juillet : l'Autriche-Hongrie déclare la guerre à la Serbie, après l'attentat de Sarajevo (28 juin) — début de la Première Guerre mondiale.\" data-target=\"d1914\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1914</span><span class=\"frise-title\">Début de la guerre</span></button>\n<button class=\"frise-pt\" data-label=\"1916\" data-summary=\"Batailles de Verdun et de la Somme — symboles de la guerre d'usure.\" data-target=\"d1916\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1916</span><span class=\"frise-title\">Verdun</span></button>\n<button class=\"frise-pt\" data-label=\"1917\" data-summary=\"Entrée en guerre des États-Unis et double révolution russe.\" data-target=\"d1917\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1917</span><span class=\"frise-title\">Entrée des USA</span></button>\n<button class=\"frise-pt\" data-label=\"1918\" data-summary=\"11 novembre : Armistice, fin de la Première Guerre mondiale.\" data-target=\"d1918\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1918</span><span class=\"frise-title\">Armistice</span></button>\n<button class=\"frise-pt\" data-label=\"1919\" data-summary=\"Traité de Versailles — règlement de paix qui culpabilise l'Allemagne.\" data-target=\"d1919\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1919</span><span class=\"frise-title\">Versailles</span></button>\n</div></div>\n<div class=\"frise-era\" style=\"--era-c:#d97706\">\n<div class=\"frise-era-label\">Entre-deux-guerres</div>\n<div class=\"frise-era-dots\">\n<button class=\"frise-pt\" data-label=\"1922\" data-summary=\"Mussolini arrive au pouvoir — début du fascisme en Italie.\" data-target=\"d1922\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1922</span><span class=\"frise-title\">Mussolini</span></button>\n<button class=\"frise-pt\" data-label=\"1929\" data-summary=\"Krach boursier de Wall Street — début de la Grande Dépression mondiale.\" data-target=\"d1929\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1929</span><span class=\"frise-title\">Krach boursier</span></button>\n<button class=\"frise-pt\" data-label=\"1933\" data-summary=\"Hitler nommé chancelier d'Allemagne — début du régime nazi.\" data-target=\"d1933\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1933</span><span class=\"frise-title\">Hitler chancelier</span></button>\n<button class=\"frise-pt\" data-label=\"1936\" data-summary=\"Front populaire en France, gouvernement de Léon Blum.\" data-target=\"d1936\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1936</span><span class=\"frise-title\">Front populaire</span></button>\n</div></div>\n<div class=\"frise-era\" style=\"--era-c:#991b1b\">\n<div class=\"frise-era-label\">2nde Guerre mondiale</div>\n<div class=\"frise-era-dots\">\n<button class=\"frise-pt\" data-label=\"1939\" data-summary=\"1er septembre : invasion de la Pologne par l'Allemagne, déclenchement de la Seconde Guerre mondiale.\" data-target=\"d1939\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1939</span><span class=\"frise-title\">Invasion Pologne</span></button>\n<button class=\"frise-pt\" data-label=\"1940\" data-summary=\"18 juin : Appel du Général de Gaulle depuis Londres. Juillet : mise en place du régime de Vichy.\" data-target=\"d1940a\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1940</span><span class=\"frise-title\">Appel du 18 juin</span></button>\n<button class=\"frise-pt\" data-label=\"1944\" data-summary=\"6 juin : Débarquement en Normandie (D-Day), ouverture du front Ouest.\" data-target=\"d1944\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1944</span><span class=\"frise-title\">Débarquement</span></button>\n<button class=\"frise-pt\" data-label=\"1945\" data-summary=\"8 mai : capitulation allemande. 6-9 août : bombes atomiques. 2 septembre : capitulation du Japon.\" data-target=\"d1945a\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1945</span><span class=\"frise-title\">Fin de la guerre</span></button>\n</div></div>\n<div class=\"frise-era\" style=\"--era-c:#0891b2\">\n<div class=\"frise-era-label\">Guerre froide &amp; décolonisation</div>\n<div class=\"frise-era-dots\">\n<button class=\"frise-pt\" data-label=\"1947\" data-summary=\"Début officiel de la Guerre froide (doctrine Truman, plan Marshall).\" data-target=\"d1947\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1947</span><span class=\"frise-title\">Doctrine Truman</span></button>\n<button class=\"frise-pt\" data-label=\"1954\" data-summary=\"7 mai : défaite française de Dien Bien Phu (guerre d'Indochine). 1er novembre : début de la guerre d'Algérie.\" data-target=\"d1954\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1954</span><span class=\"frise-title\">Dien Bien Phu</span></button>\n<button class=\"frise-pt\" data-label=\"1962\" data-summary=\"Accords d'Évian — indépendance de l'Algérie.\" data-target=\"d1962\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1962</span><span class=\"frise-title\">Indép. Algérie</span></button>\n<button class=\"frise-pt\" data-label=\"1989\" data-summary=\"Chute du mur de Berlin — symbole de la fin de la Guerre froide.\" data-target=\"d1989\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1989</span><span class=\"frise-title\">Mur de Berlin</span></button>\n<button class=\"frise-pt\" data-label=\"1991\" data-summary=\"Dissolution de l'URSS — fin officielle de la Guerre froide.\" data-target=\"d1991\" onclick=\"showFriseDetail(this)\"><span class=\"frise-dot\"></span><span class=\"frise-year\">1991</span><span class=\"frise-title\">Fin de l'URSS</span></button>\n</div></div>\n</div>\n<div class=\"frise-detail\" id=\"frise-detail\"><p class=\"frise-detail-empty\">👆 Touche une date sur la frise pour l'explorer.</p></div>\n</div>\n<h3>XIXe siècle</h3>\n<ul>\n<li id=\"d1789\"><strong>1789</strong> : Révolution française — DDHC</li>\n<li id=\"d1804\"><strong>1804</strong> : Sacre de Napoléon Ier, Code civil</li>\n<li id=\"d1815\"><strong>1815</strong> : Défaite de Napoléon à Waterloo (18 juin), Restauration (1814-1830)</li>\n<li id=\"d1848\"><strong>1848</strong> : Révolutions en Europe, Abolition de l'esclavage (France), IIe République</li>\n<li id=\"d1870\"><strong>1870-71</strong> : Guerre franco-prussienne, Commune de Paris, IIIe République</li>\n</ul>\n<p class=\"frise-back\"><button class=\"frise-back-link\" onclick=\"scrollToFrise()\">↑ Retour à la frise</button></p>\n<h3>Première Guerre mondiale</h3>\n<ul>\n<li id=\"d1914\"><strong>28 juillet 1914</strong> : L'Autriche-Hongrie déclare la guerre à la Serbie (début de la guerre)</li>\n<li id=\"d1916\"><strong>1916</strong> : Batailles de Verdun et de la Somme</li>\n<li id=\"d1917\"><strong>1917</strong> : Entrée en guerre des États-Unis + Révolution russe (Octobre)</li>\n<li id=\"d1918\"><strong>11 novembre 1918</strong> : Armistice — fin de la 1re Guerre mondiale</li>\n<li id=\"d1919\"><strong>1919</strong> : Traité de Versailles</li>\n</ul>\n<p class=\"frise-back\"><button class=\"frise-back-link\" onclick=\"scrollToFrise()\">↑ Retour à la frise</button></p>\n<h3>Entre-deux-guerres</h3>\n<ul>\n<li id=\"d1922\"><strong>1922</strong> : Mussolini au pouvoir (fascisme en Italie)</li>\n<li id=\"d1929\"><strong>1929</strong> : Krach boursier (crise économique mondiale)</li>\n<li id=\"d1933\"><strong>1933</strong> : Hitler chancelier en Allemagne</li>\n<li id=\"d1936\"><strong>1936</strong> : Front populaire en France (Blum)</li>\n</ul>\n<p class=\"frise-back\"><button class=\"frise-back-link\" onclick=\"scrollToFrise()\">↑ Retour à la frise</button></p>\n<h3>Seconde Guerre mondiale</h3>\n<ul>\n<li id=\"d1939\"><strong>1er septembre 1939</strong> : Invasion de la Pologne par l'Allemagne</li>\n<li id=\"d1940a\"><strong>18 juin 1940</strong> : Appel du Général de Gaulle (BBC)</li>\n<li id=\"d1940b\"><strong>juillet 1940</strong> : Régime de Vichy (Pétain)</li>\n<li id=\"d1944\"><strong>6 juin 1944</strong> : Débarquement en Normandie (D-Day)</li>\n<li id=\"d1945a\"><strong>8 mai 1945</strong> : Capitulation de l'Allemagne — fin en Europe</li>\n<li id=\"d1945b\"><strong>6-9 août 1945</strong> : Bombes atomiques sur Hiroshima et Nagasaki</li>\n<li id=\"d1945c\"><strong>2 septembre 1945</strong> : Capitulation du Japon — fin de la 2e G.M.</li>\n</ul>\n<p class=\"frise-back\"><button class=\"frise-back-link\" onclick=\"scrollToFrise()\">↑ Retour à la frise</button></p>\n<h3>Guerre froide &amp; décolonisation</h3>\n<ul>\n<li id=\"d1947\"><strong>1947</strong> : Début de la Guerre froide (doctrine Truman)</li>\n<li id=\"d1954\"><strong>1954</strong> : 7 mai : défaite de Dien Bien Phu (Indochine) · 1er novembre : début de la guerre d'Algérie</li>\n<li id=\"d1962\"><strong>1962</strong> : Indépendance de l'Algérie (Accords d'Évian)</li>\n<li id=\"d1989\"><strong>1989</strong> : Chute du mur de Berlin</li>\n<li id=\"d1991\"><strong>1991</strong> : Dissolution de l'URSS</li>\n</ul>\n<p class=\"frise-back\"><button class=\"frise-back-link\" onclick=\"scrollToFrise()\">↑ Retour à la frise</button></p>",
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Range dans l'ordre chronologique les événements suivants : Chute du mur de Berlin, Prise de la Bastille, Débarquement en Normandie, Armistice de 1918.</p>",
    "aide": "Repère les siècles : un événement du XVIIIe, deux de la Seconde Guerre mondiale/1918 (XXe), un de la fin du XXe.",
    "correction": "<p><strong>Ordre chronologique</strong> :</p><p>1. Prise de la Bastille (14 juillet 1789)</p><p>2. Armistice (11 novembre 1918)</p><p>3. Débarquement en Normandie (6 juin 1944)</p><p>4. Chute du mur de Berlin (9 novembre 1989)</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Explique en 3-4 lignes le lien de cause à effet entre le Traité de Versailles (1919) et la montée du nazisme dans les années 1930.</p>",
    "aide": "Que demande le traité à l'Allemagne (réparations, culpabilité) ? Comment cela peut-il nourrir un sentiment d'humiliation exploité ensuite par un discours nationaliste ?",
    "correction": "<p>Le Traité de Versailles impose à l'Allemagne de lourdes réparations financières et une clause de culpabilité pour la guerre, ce qui humilie profondément le pays et aggrave sa crise économique. Ce ressentiment national, combiné à la crise de 1929, crée un terreau propice à des discours nationalistes et revanchards — Hitler exploite précisément cette humiliation dans sa propagande pour arriver au pouvoir en 1933.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Compare les régimes totalitaires nazi et stalinien : quel point commun essentiel partagent-ils, et quelle différence idéologique majeure les oppose ?</p>",
    "aide": "Pense au degré de contrôle de l'État sur la société (point commun), puis à ce sur quoi repose chaque idéologie (nationalisme racial vs internationalisme de classe).",
    "correction": "<p><strong>Point commun</strong> : les deux sont des régimes totalitaires qui exercent un contrôle total sur la société — parti unique, propagande omniprésente, police politique, culte du chef, répression brutale de toute opposition.</p><p><strong>Différence idéologique majeure</strong> : le nazisme repose sur une idéologie <mark>raciale et nationaliste</mark> (supériorité de la \"race aryenne\", expansion territoriale), tandis que le stalinisme repose sur une idéologie <mark>de classe internationaliste</mark> (dictature du prolétariat, collectivisation économique), même si dans la pratique Staline a aussi développé un fort nationalisme soviétique.</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>Remets dans l'ordre chronologique : <em>Hitler chancelier · Invasion de la Pologne · Krach boursier de Wall Street · Front populaire.</em></p>",
    "aide": "Retiens : 1929, 1933, 1936, 1939.",
    "correction": "<p>1) Krach boursier (<strong>1929</strong>) · 2) Hitler chancelier (<strong>1933</strong>) · 3) Front populaire (<strong>1936</strong>) · 4) Invasion de la Pologne (<strong>1er septembre 1939</strong>).</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Pourquoi parle-t-on de deux dates pour la fin de la Guerre froide (1989 et 1991) ? Que s'est-il passé à chaque fois ?</p>",
    "aide": "Une date est un symbole, l'autre est une fin « officielle ».",
    "correction": "<p><strong>9 novembre 1989</strong> : chute du mur de Berlin, <em>symbole</em> de la fin de la division de l'Europe et de la Guerre froide.<br><strong>1991</strong> : dissolution de l'URSS, l'un des deux adversaires disparaît : c'est la fin <em>officielle</em> de la Guerre froide.</p>"
   }
  ],
  "flashcards": [
   {
    "q": "1789",
    "a": "Révolution française — Déclaration des Droits de l'Homme et du Citoyen (DDHC)."
   },
   {
    "q": "1804",
    "a": "Sacre de Napoléon Ier Empereur + promulgation du Code civil."
   },
   {
    "q": "11 novembre 1918",
    "a": "Armistice — fin de la Première Guerre mondiale."
   },
   {
    "q": "1919",
    "a": "Traité de Versailles : règlement de paix après la 1re G.M. Culpabilise l'Allemagne."
   },
   {
    "q": "1929",
    "a": "Krach boursier (jeudi noir, Wall Street) → Grande Dépression mondiale."
   },
   {
    "q": "1933",
    "a": "Hitler nommé chancelier d'Allemagne → début du régime nazi."
   },
   {
    "q": "1er septembre 1939",
    "a": "Invasion de la Pologne par l'Allemagne → déclenchement de la 2e G.M."
   },
   {
    "q": "18 juin 1940",
    "a": "Appel du Général de Gaulle à la BBC depuis Londres → début de la Résistance."
   },
   {
    "q": "Régime de Vichy",
    "a": "Gouvernement de Pétain (juillet 1940) qui collabore avec l'Allemagne nazie."
   },
   {
    "q": "6 juin 1944",
    "a": "Débarquement en Normandie (D-Day) — ouverture du front Ouest."
   },
   {
    "q": "8 mai 1945",
    "a": "Capitulation de l'Allemagne — fin de la guerre en Europe."
   },
   {
    "q": "6 août 1945",
    "a": "Bombe atomique sur Hiroshima. 9 août → Nagasaki. 2 sept → capitulation Japon."
   },
   {
    "q": "1947",
    "a": "Début officiel de la Guerre froide (doctrine Truman, plan Marshall)."
   },
   {
    "q": "1962",
    "a": "Accords d'Évian → Indépendance de l'Algérie."
   },
   {
    "q": "9 novembre 1989",
    "a": "Chute du mur de Berlin → symbole de la fin de la Guerre froide."
   },
   {
    "q": "1991",
    "a": "Dissolution de l'URSS → fin de la Guerre froide."
   },
   {
    "q": "1848",
    "a": "Vague de révolutions en Europe. En France : abolition de l'esclavage, IIe République, suffrage universel masculin."
   },
   {
    "q": "1870-1871",
    "a": "Guerre franco-prussienne → défaite, perte de l'Alsace et d'une partie de la Lorraine (Moselle), Commune de Paris, IIIe République."
   },
   {
    "q": "1916",
    "a": "Batailles de Verdun et de la Somme — symboles de la guerre d'usure de la 1re G.M."
   },
   {
    "q": "1917",
    "a": "Entrée en guerre des États-Unis + double révolution russe (Février & Octobre/Bolcheviks)."
   },
   {
    "q": "1815",
    "a": "Défaite de Napoléon à Waterloo (18 juin) ; Louis XVIII au pouvoir : Restauration (1814-1830)."
   },
   {
    "q": "28 juillet 1914",
    "a": "L'Autriche-Hongrie déclare la guerre à la Serbie, après l'attentat de Sarajevo (28 juin) : début de la Première Guerre mondiale."
   },
   {
    "q": "1922",
    "a": "Marche sur Rome : Mussolini arrive au pouvoir en Italie (fascisme)."
   },
   {
    "q": "1936",
    "a": "Front populaire en France : gouvernement de Léon Blum (congés payés, semaine de 40 heures)."
   },
   {
    "q": "Mars 1947 — doctrine Truman",
    "a": "Les États-Unis annoncent qu'ils soutiendront les pays menacés par le communisme (politique d'endiguement). Début de la Guerre froide."
   },
   {
    "q": "7 mai 1954",
    "a": "Défaite française à Dien Bien Phu (guerre d'Indochine)."
   },
   {
    "q": "1er novembre 1954",
    "a": "Début de la guerre d'Algérie (« Toussaint rouge »)."
   },
   {
    "q": "1989 ou 1991 : quelle différence ?",
    "a": "1989 (9 novembre) : chute du mur de Berlin, symbole de la fin de la Guerre froide. 1991 : dissolution de l'URSS, fin officielle de la Guerre froide."
   }
  ]
 },
 "Notions clés": {
  "cours": "<h3>Notions Essentielles — Histoire-Géo Première</h3>\n<h3>Régimes politiques</h3>\n<ul>\n<li><strong>Démocratie libérale</strong> : séparation des pouvoirs, droits fondamentaux, élections libres.</li>\n<li><strong>Totalitarisme</strong> : contrôle <mark>total</mark> de l'État sur la société (nazisme, stalinisme, fascisme).</li>\n<li><strong>Autoritarisme</strong> : pouvoir concentré, opposants réprimés, mais contrôle social moins total.</li>\n</ul>\n<div class=\"retenir-box\">Totalitarisme vs Autoritarisme : la différence clé est le degré de contrôle. Le totalitarisme veut contrôler <mark>toute</mark> la vie (culture, économie, vie privée), l'autoritarisme se contente de réprimer l'opposition politique sans aller jusque-là.</div>\n<h3>Première Guerre mondiale</h3>\n<ul>\n<li><strong>Guerre de position / tranchées</strong> : enlisement du conflit, conditions inhumaines.</li>\n<li><strong>Union sacrée</strong> : union de tous les partis politiques français en 1914 pour l'effort de guerre.</li>\n<li><strong>Génocide arménien</strong> : 1915-1916, premier génocide du XXe siècle (Empire ottoman).</li>\n</ul>\n<h3>Seconde Guerre mondiale</h3>\n<ul>\n<li><strong>Blitzkrieg</strong> : \"guerre éclair\" allemande — offensive rapide, blindés et aviation.</li>\n<li><strong>Résistance</strong> : mouvements clandestins contre l'occupation nazie.</li>\n<li><strong>Shoah / Holocauste</strong> : génocide des Juifs par les nazis (≈ 6 millions de victimes).</li>\n<li><strong>Collaboration</strong> : coopération avec l'occupant nazi (Vichy).</li>\n</ul>\n\n<h3>Guerre froide</h3>\n<ul>\n<li><strong>Bipolarisation</strong> : monde divisé en deux blocs (USA/OTAN vs URSS/Pacte de Varsovie).</li>\n<li><strong>Dissuasion nucléaire</strong> : la menace de destruction mutuelle empêche la guerre directe.</li>\n<li><strong>Décolonisation</strong> : processus d'indépendance des colonies après 1945.</li>\n</ul>",
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Définis en une phrase la \"Guerre de position\" (ou guerre de tranchées) durant la Première Guerre mondiale.</p>",
    "aide": "Pense à ce qui caractérise le front pendant la majeure partie de la guerre : mouvement rapide, ou enlisement ?",
    "correction": "<p>La guerre de position désigne l'enlisement du conflit dans des tranchées fixes, où les deux camps s'affrontent sur un front qui bouge très peu pendant des mois voire des années, dans des conditions de vie inhumaines.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Explique pourquoi la Guerre froide (1947-1991) est qualifiée de \"froide\" alors qu'elle a duré plus de 40 ans.</p>",
    "aide": "Y a-t-il eu un affrontement militaire direct entre les deux grandes puissances (USA/URSS) ? Comment s'est exprimée leur rivalité si ce n'est pas par une guerre \"chaude\" ?",
    "correction": "<p>La Guerre froide est qualifiée de \"froide\" car les États-Unis et l'URSS ne se sont <mark>jamais affrontés militairement de façon directe</mark>. Leur rivalité s'est exprimée autrement : course aux armements nucléaires, propagande, espionnage, soutien à des conflits périphériques (guerres \"par procuration\" comme en Corée ou au Vietnam), et compétition technologique (conquête spatiale). La dissuasion nucléaire (destruction mutuelle assurée) a empêché tout affrontement direct.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>En quoi la décolonisation peut-elle être analysée comme une conséquence indirecte de la Seconde Guerre mondiale ? Donne au moins 2 arguments.</p>",
    "aide": "Pense à l'affaiblissement des puissances coloniales européennes, mais aussi aux idées/valeurs diffusées pendant et après la guerre (droits, autodétermination).",
    "correction": "<p><strong>Argument 1</strong> : la Seconde Guerre mondiale a considérablement <mark>affaibli économiquement et militairement</mark> les puissances coloniales européennes (France, Royaume-Uni), qui n'ont plus les moyens de maintenir leurs empires par la force face aux mouvements indépendantistes.</p><p><strong>Argument 2</strong> : la guerre a diffusé des <mark>idéaux de liberté et d'autodétermination des peuples</mark> (via la Charte de l'Atlantique de 1941, et la lutte contre les régimes totalitaires), que les colonisés retournent logiquement contre leurs propres colonisateurs, créant une contradiction morale difficile à défendre pour les Européens.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Classe chaque exemple dans « totalitarisme » ou « autoritarisme » en justifiant : <em>a) un régime qui censure la presse et emprisonne ses opposants, sans chercher à contrôler la vie privée ; b) un régime qui contrôle l'école, la culture, l'économie et la vie quotidienne par un parti unique et une propagande massive.</em></p>",
    "aide": "Compare le degré de contrôle de la société.",
    "correction": "<p><strong>a) Autoritarisme</strong> : le pouvoir réprime l'opposition politique mais ne contrôle pas toute la société.<br><strong>b) Totalitarisme</strong> : le pouvoir veut contrôler <em>toute</em> la vie (école, culture, économie, vie privée) avec un parti unique et la propagande (ex : nazisme, stalinisme).</p>"
   }
  ],
  "flashcards": [
   {
    "q": "Totalitarisme",
    "a": "Régime politique où l'État contrôle totalement la société, l'économie, la culture et la vie privée. Ex : nazisme, stalinisme."
   },
   {
    "q": "Union sacrée (1914)",
    "a": "Union de tous les partis politiques français autour du gouvernement pour mener la guerre. Suspend les conflits politiques."
   },
   {
    "q": "Génocide arménien",
    "a": "1915-1916 : extermination des Arméniens par l'Empire ottoman. Premier génocide du XXe siècle (environ 1 à 1,5 million de victimes)."
   },
   {
    "q": "Blitzkrieg",
    "a": "\"Guerre éclair\" : stratégie allemande d'offensive rapide combinant chars, aviation et infanterie."
   },
   {
    "q": "Shoah / Holocauste",
    "a": "Génocide des Juifs d'Europe par les nazis : environ 6 millions de victimes (1941-1945)."
   },
   {
    "q": "Collaboration (2e G.M.)",
    "a": "Coopération active avec l'occupant nazi allemand. En France : régime de Vichy (Pétain)."
   },
   {
    "q": "Résistance (2e G.M.)",
    "a": "Ensemble des mouvements clandestins qui s'opposaient à l'occupation nazie. En France : de Gaulle dirige la France libre depuis Londres ; le Conseil national de la Résistance (CNR, 1943) unifie les mouvements sous l'impulsion de Jean Moulin."
   },
   {
    "q": "Guerre froide",
    "a": "Affrontement indirect (1947-1991) entre les États-Unis et l'URSS, sans conflit militaire direct entre eux."
   },
   {
    "q": "Bipolarisation",
    "a": "Division du monde en deux blocs pendant la Guerre froide : bloc occidental (USA-OTAN) et bloc soviétique (URSS-Pacte de Varsovie)."
   },
   {
    "q": "Dissuasion nucléaire",
    "a": "La possession d'armes nucléaires par les deux superpuissances empêche toute guerre directe (destruction mutuelle assurée)."
   },
   {
    "q": "Décolonisation",
    "a": "Processus d'accession à l'indépendance des territoires colonisés, principalement après 1945."
   },
   {
    "q": "Plan Marshall (1947)",
    "a": "Aide économique américaine à l'Europe occidentale pour reconstruire et résister au communisme."
   },
   {
    "q": "Traité de Versailles (1919)",
    "a": "Traité de paix après la 1re G.M. Responsabilise l'Allemagne et lui impose des réparations. Jugé humiliant, il nourrit un ressentiment que les nazis exploiteront plus tard."
   },
   {
    "q": "Démocratie libérale",
    "a": "Régime avec séparation des pouvoirs, droits fondamentaux garantis et élections libres."
   },
   {
    "q": "Autoritarisme",
    "a": "Régime où le pouvoir est concentré et les opposants réprimés, mais où le contrôle de la société est moins total que dans un régime totalitaire."
   },
   {
    "q": "Totalitarisme vs autoritarisme",
    "a": "Le totalitarisme veut contrôler toute la vie (culture, économie, vie privée) ; l'autoritarisme se contente de réprimer l'opposition politique."
   },
   {
    "q": "Guerre de position (1914-1918)",
    "a": "Enlisement du conflit dans des tranchées fixes : le front bouge très peu pendant des mois, voire des années, dans des conditions inhumaines."
   },
   {
    "q": "OTAN et Pacte de Varsovie",
    "a": "Alliances militaires des deux blocs pendant la Guerre froide : OTAN (1949) pour le bloc occidental, Pacte de Varsovie (1955) pour le bloc soviétique."
   },
   {
    "q": "Génocide (notion)",
    "a": "Destruction systématique d'un groupe humain en raison de son identité (nationale, ethnique, religieuse). Ex : génocide arménien, Shoah."
   }
  ]
 },
 "La Révolution française en détail (1789-1799)": {
  "cours": "<div class=\"retenir-box\"><strong>Notions à maîtriser :</strong> Révolution · Souveraineté nationale · Égalité devant la loi · Nation · République.</div>\n\n<h3>Avant 1789 — L'Ancien Régime en crise</h3>\n<p>La France est une <strong>monarchie absolue de droit divin</strong> : Louis XVI détient tous les pouvoirs. La société est divisée en <strong>trois ordres</strong> (clergé, noblesse, tiers état). Les deux premiers ordres bénéficient de <mark>privilèges</mark> (impôts, charges, droits seigneuriaux) ; le tiers état (environ 98 % de la population) supporte l'essentiel des impôts.</p>\n<ul>\n<li><strong>Crise financière</strong> : la dette de l'État est énorme (notamment à cause de la guerre d'indépendance américaine).</li>\n<li><strong>Crise économique et sociale</strong> : les mauvaises récoltes de 1788 font monter le prix du pain.</li>\n<li><strong>Crise politique</strong> : les idées des Lumières (liberté, égalité, souveraineté du peuple) contestent l'absolutisme et les privilèges.</li>\n</ul>\n<div class=\"formula-box\">\n<strong>Révolution</strong> : changement brutal et profond de l'ordre politique et social (ici : la fin de l'Ancien Régime).<br>\n<strong>Souveraineté nationale</strong> : le pouvoir appartient à la <em>nation</em> (l'ensemble des citoyens), et non plus au roi.<br>\n<strong>Égalité devant la loi</strong> : la loi est la même pour tous, sans privilèges de naissance.<br>\n<strong>Nation</strong> : communauté de citoyens libres et égaux en droit.<br>\n<strong>République</strong> : régime où le pouvoir n'est pas héréditaire et où les dirigeants sont élus.\n</div>\n\n<h3>1789 — L'année fondatrice</h3>\n<ul>\n<li><strong>5 mai 1789</strong> : Louis XVI ouvre les <mark>États généraux</mark> à Versailles — dernier recours face à la faillite du royaume. Ils réunissent les 3 ordres : clergé, noblesse, tiers état.</li>\n<li><strong>17 juin 1789</strong> : le tiers état, ne parvenant pas à obtenir un vote \"par tête\" (plus juste que le vote \"par ordre\" qui l'avantage moins), se proclame seul <mark>Assemblée nationale</mark>.</li>\n<li><strong>20 juin 1789</strong> : le roi fait fermer leur salle de réunion. Les députés se réfugient dans une salle voisine et prêtent le <mark>Serment du Jeu de Paume</mark> : ils jurent de ne pas se séparer avant d'avoir donné une Constitution à la France.</li>\n<li><strong>14 juillet 1789</strong> : <mark>prise de la Bastille</mark>, forteresse-prison symbole de l'arbitraire royal, par le peuple parisien en quête d'armes et de poudre.</li>\n<li><strong>4 août 1789</strong> (nuit) : <mark>abolition des privilèges</mark> féodaux par l'Assemblée, dans un grand élan (fin du servage, des droits seigneuriaux...).</li>\n<li><strong>26 août 1789</strong> : adoption de la <mark>Déclaration des Droits de l'Homme et du Citoyen</mark> (DDHC) — liberté, égalité, propriété, sûreté.</li>\n<li><strong>5-6 octobre 1789</strong> : la <mark>marche des femmes sur Versailles</mark> (colère face au prix du pain) force le roi et sa famille à s'installer à Paris, sous surveillance populaire.</li>\n</ul>\n<div class=\"retenir-box\">Ordre à retenir dans la tête : États généraux (mai) → Serment du Jeu de Paume (juin) → Bastille (juillet) → Abolition des privilèges + DDHC (août) → Marche des femmes (octobre). Chaque étape radicalise un peu plus la situation.</div>\n\n\n<h3>La Déclaration des droits de l'homme et du citoyen (26 août 1789)</h3>\n<ul>\n<li><strong>Art. 1</strong> : les hommes naissent et demeurent <mark>libres et égaux en droits</mark>.</li>\n<li><strong>Art. 2</strong> : les droits naturels sont la <strong>liberté, la propriété, la sûreté et la résistance à l'oppression</strong>.</li>\n<li><strong>Art. 3</strong> : le principe de toute souveraineté réside dans la <mark>nation</mark> (souveraineté nationale).</li>\n<li><strong>Art. 6</strong> : la loi est l'expression de la volonté générale et elle est <mark>la même pour tous</mark> (égalité devant la loi).</li>\n<li><strong>Art. 11</strong> : la libre communication des pensées et des opinions (liberté d'expression).</li>\n</ul>\n<div class=\"attention-box\"><strong>Les limites de 1789</strong> : la Déclaration ne dit rien de l'esclavage dans les colonies, et les femmes n'ont pas les mêmes droits politiques (en 1791, <strong>Olympe de Gouges</strong> publie une Déclaration des droits de la femme et de la citoyenne). L'esclavage est aboli par la Convention le <strong>4 février 1794</strong>, mais rétabli en 1802.</div>\n\n<h3>1791-1792 — Vers la République</h3>\n<ul>\n<li><strong>Juin 1791</strong> : <mark>fuite de Varennes</mark> — Louis XVI tente de fuir à l'étranger, est reconnu et ramené à Paris. Sa loyauté envers la Révolution est désormais fortement suspectée.</li>\n<li><strong>1791</strong> : la 1re <mark>Constitution</mark> française instaure une monarchie constitutionnelle (le roi garde un rôle, mais partage le pouvoir avec une Assemblée élue).</li>\n<li><strong>10 août 1792</strong> : prise du palais des Tuileries par les émeutiers — c'est la <mark>chute de la monarchie</mark>. Le roi est emprisonné.</li>\n<li><strong>20 septembre 1792</strong> : <mark>victoire de Valmy</mark> contre les armées austro-prussiennes — sauve la Révolution d'une invasion.</li>\n<li><strong>21-22 septembre 1792</strong> : la nouvelle assemblée, la <mark>Convention</mark>, proclame la <mark>Première République</mark>.</li>\n</ul>\n\n\n<p><strong>Constitution de 1791</strong> : la France devient une <mark>monarchie constitutionnelle</mark> avec séparation des pouvoirs. Le roi garde un droit de veto ; une Assemblée législative est élue au suffrage <mark>censitaire</mark> (seuls les « citoyens actifs », qui paient un certain impôt, votent).</p>\n<h3>🔍 Le 10 août 1792 — la chute de la monarchie</h3>\n<p><strong>Problème :</strong> comment passe-t-on d'une monarchie constitutionnelle à une république en quelques mois ?</p>\n<ul>\n<li><strong>Un roi suspect</strong> : depuis la <mark>fuite de Varennes</mark> (juin 1791), beaucoup de Français doutent de la loyauté de Louis XVI. Il utilise son droit de veto contre certaines lois révolutionnaires.</li>\n<li><strong>La guerre</strong> : le <strong>20 avril 1792</strong>, la France déclare la guerre à l'Autriche ; les premiers combats tournent mal. Le <mark>manifeste de Brunswick</mark> (juillet 1792, chef des armées austro-prussiennes) menace Paris : il est perçu comme la preuve que le roi est du côté de l'ennemi.</li>\n<li><strong>La mobilisation populaire</strong> : les <mark>sans-culottes</mark> parisiens et les <strong>fédérés</strong> (gardes nationaux venus de province) s'organisent ; une Commune insurrectionnelle se forme à Paris.</li>\n<li><strong>La journée du 10 août</strong> : les insurgés prennent d'assaut le palais des <mark>Tuileries</mark>, défendu par la garde suisse. Les combats sont très meurtriers.</li>\n<li><strong>Conséquences</strong> : le roi est suspendu et emprisonné au Temple ; une <mark>Convention</mark> est élue (pour la première fois au suffrage universel masculin) et proclame la <strong>République</strong> (21-22 septembre 1792).</li>\n</ul>\n<div class=\"retenir-box\">Le 10 août 1792 est une <strong>journée révolutionnaire</strong> : une insurrection du peuple de Paris qui renverse la monarchie et ouvre la <strong>première République</strong>, dans un contexte de guerre extérieure et de tensions intérieures.</div>\n\n<h3>1793 — Girondins contre Montagnards</h3>\n<p>Au sein de la Convention, deux factions républicaines s'affrontent violemment sur la conduite à tenir :</p>\n<div class=\"formula-box\">\n<strong>Girondins</strong> : plus modérés, souvent issus de la bourgeoisie provinciale, méfiants envers les excès populaires parisiens, veulent étendre la guerre révolutionnaire à toute l'Europe.<br>\n<strong>Montagnards</strong> : plus radicaux (siègent en haut de l'Assemblée, d'où leur nom), alliés aux <mark>sans-culottes</mark> parisiens, favorables au contrôle des prix et à une répression ferme des ennemis de la Révolution. Menés par Robespierre, Danton, Marat, Saint-Just.\n</div>\n<ul>\n<li><strong>21 janvier 1793</strong> : exécution de <mark>Louis XVI</mark> — les Girondins voulaient un référendum populaire sur son sort, les Montagnards l'exécution rapide. Les Montagnards l'emportent.</li>\n<li><strong>31 mai - 2 juin 1793</strong> : les sans-culottes et les Montagnards éliminent les Girondins de la Convention — les Montagnards prennent seuls le pouvoir.</li>\n<li><strong>5 septembre 1793</strong> : la <mark>Terreur</mark> est officiellement déclarée par la Convention — répression violente de tout soupçon de contre-révolution, via le Tribunal révolutionnaire.</li>\n</ul>\n\n\n\n<h3>Les moyens de la Terreur (1793-1794)</h3>\n<ul>\n<li><strong>Mars 1793</strong> : création du <mark>Tribunal révolutionnaire</mark> ; soulèvement de la <mark>Vendée</mark> contre la levée de nouveaux soldats, très violemment réprimé.</li>\n<li><strong>Avril 1793</strong> : le <mark>Comité de salut public</mark> concentre le pouvoir exécutif (Robespierre en devient la figure majeure à l'été).</li>\n<li><strong>23 août 1793</strong> : <mark>levée en masse</mark> — tous les Français peuvent être mobilisés pour défendre la patrie.</li>\n<li><strong>17 septembre 1793</strong> : <mark>loi des suspects</mark> — on peut arrêter toute personne soupçonnée d'être hostile à la Révolution.</li>\n<li><strong>29 septembre 1793</strong> : <strong>Maximum général</strong> — plafonnement des prix et des salaires, réclamé par les sans-culottes.</li>\n<li><strong>Bilan</strong> : plusieurs dizaines de milliers de victimes (environ 17 000 exécutions officielles, bien plus avec les morts en prison et les répressions comme en Vendée).</li>\n</ul>\n\n<h3>1794 — La chute de Robespierre</h3>\n<p>La <mark>Grande Terreur</mark> s'intensifie au printemps-été 1794, y compris contre d'anciens révolutionnaires jugés pas assez radicaux (hébertistes, dantonistes). L'isolement politique de Robespierre s'accroît.</p>\n<ul>\n<li><strong>27-28 juillet 1794</strong> (9-10 Thermidor an II) : Robespierre est arrêté puis guillotiné avec ses proches (Saint-Just, Couthon...) — c'est la <mark>chute de Robespierre</mark>, qui met fin à la Terreur.</li>\n</ul>\n\n<h3>1795-1799 — Le Directoire</h3>\n<ul>\n<li><strong>Constitution de l'an III (1795)</strong> : le pouvoir exécutif est confié à <strong>cinq Directeurs</strong>, le pouvoir législatif à <strong>deux conseils</strong> (Conseil des Cinq-Cents et Conseil des Anciens). Le vote redevient <mark>censitaire</mark>.</li>\n<li>Le régime est <strong>instable</strong> : il subit les attaques des royalistes et des jacobins, la crise financière, et s'appuie de plus en plus sur l'armée. La guerre continue en Europe.</li>\n<li>Un général victorieux, <strong>Napoléon Bonaparte</strong> (campagnes d'Italie, 1796-1797, puis d'Égypte, 1798-1799), gagne en popularité.</li>\n<li><strong>18 Brumaire (9 novembre 1799)</strong> : coup d'État de Bonaparte, qui met fin au Directoire. Il devient <mark>Premier consul</mark> : c'est la fin de la décennie révolutionnaire.</li>\n</ul>\n<div class=\"retenir-box\"><strong>Bilan 1789-1799 :</strong> la Révolution invente la <mark>souveraineté nationale</mark> et l'<mark>égalité devant la loi</mark>, abolit les privilèges et connaît une première expérience républicaine. Mais elle traverse aussi la guerre, la Terreur et l'instabilité politique, qui conduisent au pouvoir d'un homme fort.</div>",
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Remets dans l'ordre chronologique : Prise de la Bastille, Serment du Jeu de Paume, Ouverture des États généraux, Abolition des privilèges.</p>",
    "aide": "Tous ces événements ont lieu en 1789 — repère le mois de chacun (mai, juin, juillet, août).",
    "correction": "<p>1. Ouverture des États généraux (5 mai)</p><p>2. Serment du Jeu de Paume (20 juin)</p><p>3. Prise de la Bastille (14 juillet)</p><p>4. Abolition des privilèges (4 août, nuit)</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Explique la différence de position entre Girondins et Montagnards concernant le sort de Louis XVI en janvier 1793.</p>",
    "aide": "L'un des deux camps veut consulter le peuple avant de trancher, l'autre veut agir vite et fermement — lequel est lequel ?",
    "correction": "<p>Les <strong>Girondins</strong>, plus modérés, souhaitaient un <mark>référendum populaire</mark> pour faire trancher le peuple sur le sort du roi, ou du moins un débat plus prudent. Les <strong>Montagnards</strong>, plus radicaux et alliés aux sans-culottes, voulaient une <mark>exécution rapide</mark> sans consultation, jugeant le roi coupable de trahison envers la nation. Ce sont finalement les Montagnards qui l'emportent : Louis XVI est exécuté le 21 janvier 1793.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Montre en quoi la Terreur (1793-1794) peut être comprise à la fois comme une conséquence du contexte de guerre et de menace intérieure, et comme une dérive politique. Utilise au moins 2 arguments.</p>",
    "aide": "Pense au contexte : la France est en guerre contre plusieurs puissances européennes ET craint des soulèvements contre-révolutionnaires internes (ex : en Vendée). Mais pense aussi à l'ampleur et à la durée de la répression, y compris contre d'anciens révolutionnaires.",
    "correction": "<p><strong>Argument contextuel</strong> : en 1793, la République est menacée à la fois de l'extérieur (guerre contre l'Autriche, la Prusse, puis une large coalition européenne) et de l'intérieur (soulèvements contre-révolutionnaires comme en Vendée). La Terreur répond en partie à ce sentiment d'urgence et de danger existentiel pour la Révolution.</p><p><strong>Argument de dérive</strong> : cependant, la Terreur s'étend progressivement à des cibles de plus en plus larges, y compris d'anciens révolutionnaires jugés \"pas assez radicaux\" (hébertistes, dantonistes), ce qui dépasse la simple logique défensive et relève d'une dérive répressive, alimentée par la méfiance généralisée et la concentration du pouvoir entre les mains du Comité de salut public.</p>"
   },
   {
    "niveau": "Facile",
    "enonce": "<p>Associe chaque notion à sa définition : <em>souveraineté nationale</em> · <em>égalité devant la loi</em> · <em>République</em>.<br>A. La loi est la même pour tous. B. Le pouvoir n'est pas héréditaire et les dirigeants sont élus. C. Le pouvoir appartient à la nation et non au roi.</p>",
    "aide": "Repère les mots-clés : « nation », « même pour tous », « héréditaire ».",
    "correction": "<p><strong>Souveraineté nationale → C</strong> · <strong>Égalité devant la loi → A</strong> · <strong>République → B</strong>.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Explique pourquoi le 10 août 1792 marque le « basculement vers une république révolutionnaire ». Utilise au moins deux causes.</p>",
    "aide": "Pense à la méfiance envers le roi, à la guerre et au rôle du peuple parisien.",
    "correction": "<p><strong>Cause 1 – la méfiance envers le roi :</strong> depuis la fuite de Varennes (1791), Louis XVI est soupçonné de trahir la Révolution ; le manifeste de Brunswick (juillet 1792) semble confirmer qu'il est du côté de l'ennemi.</p><p><strong>Cause 2 – la guerre et la mobilisation populaire :</strong> la guerre déclarée à l'Autriche (avril 1792) tourne mal ; sans-culottes et fédérés prennent d'assaut les Tuileries le 10 août.</p><p><strong>Conséquence :</strong> le roi est suspendu et emprisonné, une Convention est élue au suffrage universel masculin et proclame la République (21-22 septembre 1792).</p>"
   }
  ],
  "flashcards": [
   {
    "q": "5 mai 1789",
    "a": "Louis XVI ouvre les États généraux à Versailles, réunissant clergé, noblesse et tiers état."
   },
   {
    "q": "17 juin 1789",
    "a": "Le tiers état se proclame seul Assemblée nationale, faute d'obtenir un vote par tête."
   },
   {
    "q": "20 juin 1789",
    "a": "Serment du Jeu de Paume : les députés jurent de ne pas se séparer avant d'avoir donné une Constitution à la France."
   },
   {
    "q": "14 juillet 1789",
    "a": "Prise de la Bastille par le peuple parisien, en quête d'armes et de poudre."
   },
   {
    "q": "4 août 1789",
    "a": "Abolition des privilèges féodaux dans la nuit, par l'Assemblée."
   },
   {
    "q": "26 août 1789",
    "a": "Adoption de la Déclaration des Droits de l'Homme et du Citoyen (DDHC)."
   },
   {
    "q": "5-6 octobre 1789",
    "a": "Marche des femmes sur Versailles (colère liée au prix du pain) : le roi est ramené à Paris sous surveillance populaire."
   },
   {
    "q": "Fuite de Varennes (juin 1791)",
    "a": "Louis XVI tente de fuir la France, est reconnu et ramené à Paris — sa loyauté envers la Révolution est désormais très suspectée."
   },
   {
    "q": "10 août 1792",
    "a": "Prise des Tuileries — chute de la monarchie, le roi est emprisonné."
   },
   {
    "q": "20 septembre 1792",
    "a": "Victoire de Valmy contre les armées austro-prussiennes, qui sauve la Révolution d'une invasion."
   },
   {
    "q": "21-22 septembre 1792",
    "a": "La Convention proclame la Première République."
   },
   {
    "q": "Girondins — positionnement",
    "a": "Républicains modérés, méfiants envers les excès populaires parisiens, favorables à l'extension de la guerre révolutionnaire en Europe."
   },
   {
    "q": "Montagnards — positionnement",
    "a": "Républicains plus radicaux, alliés aux sans-culottes, favorables au contrôle des prix et à une répression ferme. Menés par Robespierre, Danton, Marat, Saint-Just."
   },
   {
    "q": "21 janvier 1793",
    "a": "Exécution de Louis XVI, après un débat opposant Girondins (référendum) et Montagnards (exécution rapide) — les Montagnards l'emportent."
   },
   {
    "q": "31 mai - 2 juin 1793",
    "a": "Élimination des Girondins de la Convention par les Montagnards et les sans-culottes — les Montagnards prennent seuls le pouvoir."
   },
   {
    "q": "5 septembre 1793",
    "a": "La Terreur est officiellement déclarée par la Convention."
   },
   {
    "q": "9-10 Thermidor an II (27-28 juillet 1794)",
    "a": "Chute de Robespierre : il est arrêté puis guillotiné avec ses proches, ce qui met fin à la Terreur."
   },
   {
    "q": "18 Brumaire (9 novembre 1799)",
    "a": "Coup d'État de Napoléon Bonaparte, qui met fin au Directoire et à la Révolution française."
   },
   {
    "q": "Sans-culottes",
    "a": "Membres du peuple parisien révolutionnaire (artisans, petits commerçants), alliés politiques des Montagnards, favorables à des mesures sociales radicales."
   },
   {
    "q": "Révolution — définition",
    "a": "Changement brutal et profond de l'ordre politique et social. En 1789 : fin de l'Ancien Régime (monarchie absolue et société d'ordres)."
   },
   {
    "q": "Souveraineté nationale",
    "a": "Le pouvoir appartient à la nation (l'ensemble des citoyens) et non au roi. Inscrit dans la DDHC (art. 3)."
   },
   {
    "q": "Égalité devant la loi",
    "a": "La loi est la même pour tous, sans privilèges de naissance. Inscrit dans la DDHC (art. 6)."
   },
   {
    "q": "Nation (notion)",
    "a": "Communauté de citoyens libres et égaux en droit. En 1789, la nation remplace le roi comme source du pouvoir."
   },
   {
    "q": "République (notion)",
    "a": "Régime où le pouvoir n'est pas héréditaire et où les dirigeants sont élus. Première République : 21-22 septembre 1792."
   },
   {
    "q": "Les trois ordres de l'Ancien Régime",
    "a": "Clergé, noblesse, tiers état. Les deux premiers ordres ont des privilèges ; le tiers état (environ 98 % de la population) supporte l'essentiel des impôts."
   },
   {
    "q": "Causes de la Révolution de 1789",
    "a": "Crise financière (dette de l'État), crise économique et sociale (mauvaises récoltes, pain cher), contestation de l'absolutisme et des privilèges par les idées des Lumières."
   },
   {
    "q": "DDHC — principaux articles",
    "a": "Art. 1 : libres et égaux en droits. Art. 2 : liberté, propriété, sûreté, résistance à l'oppression. Art. 3 : souveraineté de la nation. Art. 6 : la loi est la même pour tous. Art. 11 : liberté d'expression."
   },
   {
    "q": "Limites de la DDHC (1789)",
    "a": "Elle ne mentionne pas l'esclavage et ne donne pas aux femmes les mêmes droits politiques. Olympe de Gouges publie une Déclaration des droits de la femme en 1791."
   },
   {
    "q": "Constitution de 1791",
    "a": "Monarchie constitutionnelle avec séparation des pouvoirs ; droit de veto du roi ; vote censitaire (seuls les « citoyens actifs » votent)."
   },
   {
    "q": "Suffrage censitaire vs universel masculin",
    "a": "Censitaire : seuls ceux qui paient un certain impôt votent (Constitution de 1791). Universel masculin : tous les hommes votent (élection de la Convention en 1792)."
   },
   {
    "q": "20 avril 1792",
    "a": "La France déclare la guerre à l'Autriche : début des guerres révolutionnaires."
   },
   {
    "q": "Manifeste de Brunswick (juillet 1792)",
    "a": "Texte du chef des armées austro-prussiennes menaçant Paris si la famille royale est touchée. Il radicalise les Parisiens contre le roi."
   },
   {
    "q": "10 août 1792 — causes",
    "a": "Méfiance envers Louis XVI (fuite de Varennes, veto), guerre mal engagée, manifeste de Brunswick, mobilisation des sans-culottes et des fédérés."
   },
   {
    "q": "10 août 1792 — conséquences",
    "a": "Roi suspendu puis emprisonné au Temple, élection d'une Convention au suffrage universel masculin, proclamation de la République (21-22 septembre 1792)."
   },
   {
    "q": "Convention (1792-1795)",
    "a": "Assemblée élue en 1792 au suffrage universel masculin. Elle proclame la République, exécute Louis XVI et gouverne pendant la Terreur."
   },
   {
    "q": "Tribunal révolutionnaire (mars 1793)",
    "a": "Tribunal d'exception créé pour juger les ennemis de la Révolution ; instrument majeur de la Terreur."
   },
   {
    "q": "Comité de salut public (avril 1793)",
    "a": "Organe qui concentre le pouvoir exécutif pendant la Terreur ; Robespierre en devient la figure dominante."
   },
   {
    "q": "Levée en masse (23 août 1793)",
    "a": "Mobilisation de tous les Français pour défendre la patrie en danger."
   },
   {
    "q": "Loi des suspects (17 septembre 1793)",
    "a": "Permet d'arrêter toute personne soupçonnée d'être hostile à la Révolution."
   },
   {
    "q": "Maximum général (29 septembre 1793)",
    "a": "Plafonnement des prix (et des salaires), mesure réclamée par les sans-culottes."
   },
   {
    "q": "Guerre de Vendée (1793)",
    "a": "Soulèvement contre-révolutionnaire (refus de la levée de soldats, attachement à la religion et au roi), réprimé très violemment."
   },
   {
    "q": "4 février 1794",
    "a": "La Convention abolit l'esclavage dans les colonies (rétabli par Napoléon en 1802)."
   },
   {
    "q": "Directoire (1795-1799)",
    "a": "Régime de la Constitution de l'an III : cinq Directeurs, deux conseils, vote censitaire. Instable, il s'appuie sur l'armée et est renversé par Bonaparte le 18 Brumaire."
   },
   {
    "q": "Bilan de la Révolution (1789-1799)",
    "a": "Acquis : souveraineté nationale, égalité devant la loi, fin des privilèges, première République. Mais aussi guerre, Terreur et instabilité, qui mènent à l'arrivée au pouvoir de Bonaparte."
   }
  ]
 },
 "La mondialisation : acteurs, flux et espaces": {
  "cours": "<h3>Qu'est-ce que la mondialisation ?</h3>\n<p>La <strong>mondialisation</strong> est le processus de mise en relation des différentes parties du monde par la multiplication et l'intensification des échanges (marchandises, capitaux, informations, personnes), créant une <mark>interdépendance croissante</mark> entre les territoires.</p>\n<div class=\"retenir-box\">Ce n'est pas un phénomène récent (les grandes découvertes, la colonisation étaient déjà des formes de mondialisation), mais elle s'est considérablement <mark>accélérée</mark> depuis les années 1980-1990 grâce à la libéralisation des échanges, aux progrès des transports et à la révolution numérique.</div>\n\n<h3>Les acteurs de la mondialisation</h3>\n<ul>\n<li><strong>Les FTN</strong> (Firmes TransNationales) : entreprises implantées dans plusieurs pays, qui organisent leur production à l'échelle mondiale pour minimiser leurs coûts (ex : Apple conçoit aux USA, fait assembler en Chine, vend partout).</li>\n<li><strong>Les États</strong> : négocient des accords commerciaux, attirent les investissements étrangers, protègent (ou non) certains secteurs.</li>\n<li><strong>Les organisations internationales</strong> : l'OMC (Organisation Mondiale du Commerce) régule les échanges commerciaux ; le FMI et la Banque Mondiale interviennent sur les questions financières.</li>\n<li><strong>Les organisations régionales</strong> : l'Union Européenne, l'ALENA/USMCA, l'ASEAN — facilitent les échanges entre pays voisins.</li>\n</ul>\n\n<h3>Les flux mondialisés</h3>\n<div class=\"formula-box\">\n<strong>Flux de marchandises</strong> : transport maritime (90% du commerce mondial en volume passe par la mer), conteneurisation.<br>\n<strong>Flux financiers</strong> : investissements directs à l'étranger (IDE), places boursières interconnectées 24h/24.<br>\n<strong>Flux d'information</strong> : câbles sous-marins, satellites — internet a créé une circulation quasi instantanée de l'information.<br>\n<strong>Flux migratoires</strong> : travailleurs, touristes, réfugiés, étudiants — plus de 280 millions de migrants internationaux dans le monde.\n</div>\n\n<h3>Les espaces moteurs et à l'écart</h3>\n<ul>\n<li><strong>La Triade</strong> : Amérique du Nord, Europe occidentale, Asie orientale — historiquement les 3 pôles majeurs de la richesse et des échanges mondiaux.</li>\n<li><strong>Les pays émergents</strong> (Chine, Inde, Brésil...) : croissance économique rapide, intégration croissante aux échanges mondiaux, parfois regroupés sous l'acronyme BRICS.</li>\n<li><strong>Les espaces \"à l'écart\"</strong> : régions peu connectées aux grands flux mondiaux (enclavement, faibles infrastructures) — la mondialisation ne bénéficie pas uniformément à tous les territoires.</li>\n</ul>\n\n\n<h3>Les limites et contestations de la mondialisation</h3>\n<p>La mondialisation fait l'objet de critiques et de résistances : mouvements <mark>altermondialistes</mark> (dénoncent les inégalités qu'elle génère), protectionnisme (certains États relèvent leurs barrières douanières), préoccupations environnementales (empreinte carbone du transport de marchandises), critiques de l'uniformisation culturelle.</p>",
  "exercices": [
   {
    "niveau": "Facile",
    "enonce": "<p>Une entreprise conçoit ses produits aux États-Unis, les fait fabriquer en Chine, et les vend dans le monde entier. Comment appelle-t-on ce type d'acteur de la mondialisation ?</p>",
    "aide": "Relis la définition du premier acteur cité dans le cours.",
    "correction": "<p>C'est une <strong>FTN</strong> (Firme TransNationale) : une entreprise qui organise sa production à l'échelle mondiale (conception, fabrication, vente dans des pays différents) pour optimiser ses coûts et ses marchés.</p>"
   },
   {
    "niveau": "Moyen",
    "enonce": "<p>Explique pourquoi on dit que la mondialisation crée des espaces \"à l'écart\", en donnant un exemple du type de région qui pourrait être concernée.</p>",
    "aide": "Relis la partie sur les espaces moteurs et à l'écart — qu'est-ce qui différencie un espace connecté d'un espace en marge de la mondialisation ?",
    "correction": "<p>La mondialisation ne bénéficie pas uniformément à tous les territoires : elle profite surtout aux régions bien connectées aux grands flux (façades maritimes, métropoles, zones bien reliées par les transports et le numérique). À l'inverse, des régions enclavées, mal desservies par les infrastructures de transport ou de communication (ex : certaines zones rurales isolées, certains pays intérieurs sans accès à la mer) restent largement en marge de ces échanges — c'est ce qu'on appelle des espaces \"à l'écart\" de la mondialisation.</p>"
   },
   {
    "niveau": "Difficile",
    "enonce": "<p>Explique en quoi les flux migratoires et les flux financiers, bien que tous deux \"mondialisés\", ne sont pas régulés de la même façon par les États. Pourquoi cette différence est-elle révélatrice des priorités des États face à la mondialisation ?</p>",
    "aide": "Pense à ce qui circule le plus librement aujourd'hui entre les pays : l'argent (capitaux, investissements) ou les personnes (migrants) ? Les États ont-ils la même attitude face à ces deux types de flux ?",
    "correction": "<p>Les <mark>flux financiers</mark> circulent généralement de façon beaucoup plus libre et rapide à l'échelle mondiale (marchés boursiers interconnectés 24h/24, investissements directs à l'étranger facilités par les accords de libre-échange), tandis que les <mark>flux migratoires</mark> sont au contraire fortement contrôlés et restreints par la plupart des États (visas, quotas, frontières renforcées, politiques migratoires restrictives).</p><p>Cette différence révèle une priorité largement donnée par les États à la <strong>libre circulation du capital</strong> plutôt qu'à celle des personnes : la mondialisation économique et financière est activement favorisée par de nombreux accords internationaux (OMC, accords bilatéraux), alors que la mobilité humaine reste soumise à la souveraineté de chaque État sur ses frontières. C'est une contradiction souvent soulignée par les critiques de la mondialisation : l'argent circule plus librement que les êtres humains.</p>"
   }
  ],
  "flashcards": [
   {
    "q": "Mondialisation — définition",
    "a": "Processus de mise en relation des différentes parties du monde par la multiplication des échanges (marchandises, capitaux, informations, personnes), créant une interdépendance croissante entre les territoires."
   },
   {
    "q": "FTN — définition",
    "a": "Firme TransNationale : entreprise implantée dans plusieurs pays, qui organise sa production à l'échelle mondiale pour minimiser ses coûts."
   },
   {
    "q": "Rôle de l'OMC",
    "a": "Organisation Mondiale du Commerce : régule les échanges commerciaux internationaux entre États."
   },
   {
    "q": "Part du commerce mondial transportée par voie maritime",
    "a": "Environ 90% du commerce mondial en volume passe par le transport maritime."
   },
   {
    "q": "La Triade",
    "a": "Les 3 pôles historiquement majeurs de la richesse et des échanges mondiaux : Amérique du Nord, Europe occidentale, Asie orientale."
   },
   {
    "q": "BRICS",
    "a": "Acronyme regroupant de grands pays émergents (à l'origine : Brésil, Russie, Inde, Chine, Afrique du Sud), à forte croissance économique et intégration croissante aux échanges mondiaux. Le groupe s'est élargi à de nouveaux membres depuis 2024."
   },
   {
    "q": "Espaces \"à l'écart\" de la mondialisation",
    "a": "Régions peu connectées aux grands flux mondiaux (enclavement, faibles infrastructures) — la mondialisation ne bénéficie pas uniformément à tous les territoires."
   },
   {
    "q": "Altermondialisme",
    "a": "Mouvement qui conteste les formes actuelles de la mondialisation (notamment les inégalités qu'elle génère), sans nécessairement rejeter l'idée d'échanges mondiaux."
   },
   {
    "q": "Pourquoi la mondialisation n'est pas un phénomène récent",
    "a": "Les grandes découvertes et la colonisation étaient déjà des formes de mondialisation — mais le processus s'est considérablement accéléré depuis les années 1980-1990."
   },
   {
    "q": "Conteneurisation",
    "a": "Transport des marchandises dans des conteneurs standardisés (depuis les années 1950-1960) : réduit fortement les coûts et accélère les échanges maritimes."
   },
   {
    "q": "FMI et Banque mondiale",
    "a": "Organisations internationales qui interviennent sur les questions financières (stabilité monétaire, aide au développement)."
   },
   {
    "q": "IDE (investissements directs à l'étranger)",
    "a": "Capitaux investis par une entreprise dans une autre pays pour y créer ou acheter une activité (usine, filiale…)."
   },
   {
    "q": "Flux migratoires mondiaux",
    "a": "Travailleurs, touristes, réfugiés, étudiants : plus de 280 millions de migrants internationaux dans le monde."
   },
   {
    "q": "Flux d'information",
    "a": "Câbles sous-marins, satellites, internet : circulation quasi instantanée de l'information dans le monde."
   },
   {
    "q": "Organisations régionales",
    "a": "Union européenne, ALENA/USMCA, ASEAN : facilitent les échanges entre pays voisins."
   },
   {
    "q": "Protectionnisme",
    "a": "Politique d'un État qui relève ses barrières douanières pour protéger ses entreprises de la concurrence étrangère."
   },
   {
    "q": "Mondialisation et environnement",
    "a": "Le transport de marchandises à l'échelle mondiale augmente l'empreinte carbone : l'un des reproches faits à la mondialisation."
   },
   {
    "q": "Espaces moteurs de la mondialisation",
    "a": "La Triade (Amérique du Nord, Europe occidentale, Asie orientale) et les pays émergents (Chine, Inde, Brésil…)."
   }
  ]
 }
};

// Corrections de cartes déjà présentes chez l'élève (progression conservée)
PREBUILT_FIXES.push(...[
 {
  "s": "Histoire-Géo",
  "ch": "Grandes dates à connaître",
  "oldQ": "1870-1871",
  "oldA": "Guerre franco-prussienne → défaite, perte de l'Alsace-Lorraine, Commune de Paris, IIIe République.",
  "a": "Guerre franco-prussienne → défaite, perte de l'Alsace et d'une partie de la Lorraine (Moselle), Commune de Paris, IIIe République."
 },
 {
  "s": "Histoire-Géo",
  "ch": "Notions clés",
  "oldQ": "Union sacrée (1914)",
  "oldA": "Union de tous les partis politiques français autour du gouvernement pour mener la guerre. Suspends les conflits politiques.",
  "a": "Union de tous les partis politiques français autour du gouvernement pour mener la guerre. Suspend les conflits politiques."
 },
 {
  "s": "Histoire-Géo",
  "ch": "Notions clés",
  "oldQ": "Génocide arménien",
  "oldA": "1915-1916 : extermination des Arméniens par l'Empire ottoman. Premier génocide du XXe siècle (≈ 1,5 million de victimes).",
  "a": "1915-1916 : extermination des Arméniens par l'Empire ottoman. Premier génocide du XXe siècle (environ 1 à 1,5 million de victimes)."
 },
 {
  "s": "Histoire-Géo",
  "ch": "Notions clés",
  "oldQ": "Résistance (2e G.M.)",
  "oldA": "Ensemble des mouvements clandestins qui s'opposaient à l'occupation nazie. En France : CNR (de Gaulle).",
  "a": "Ensemble des mouvements clandestins qui s'opposaient à l'occupation nazie. En France : de Gaulle dirige la France libre depuis Londres ; le Conseil national de la Résistance (CNR, 1943) unifie les mouvements sous l'impulsion de Jean Moulin."
 },
 {
  "s": "Histoire-Géo",
  "ch": "Notions clés",
  "oldQ": "Traité de Versailles (1919)",
  "oldA": "Traité de paix après la 1re G.M. Responsabilise l'Allemagne, lui impose des réparations. Germe de la montée du nazisme.",
  "a": "Traité de paix après la 1re G.M. Responsabilise l'Allemagne et lui impose des réparations. Jugé humiliant, il nourrit un ressentiment que les nazis exploiteront plus tard."
 },
 {
  "s": "Histoire-Géo",
  "ch": "La mondialisation : acteurs, flux et espaces",
  "oldQ": "BRICS",
  "oldA": "Acronyme regroupant de grands pays émergents (Brésil, Russie, Inde, Chine, Afrique du Sud), à forte croissance économique et intégration croissante aux échanges mondiaux.",
  "a": "Acronyme regroupant de grands pays émergents (à l'origine : Brésil, Russie, Inde, Chine, Afrique du Sud), à forte croissance économique et intégration croissante aux échanges mondiaux. Le groupe s'est élargi à de nouveaux membres depuis 2024."
 }
]);
