/* ============================================================
   BACMASTER — cybersecurite-parcours.js — Parcours « Sécuriser son appli » (Cybersécurité)
   (généré à partir des cours rédigés ; chaque chapitre = cours + exercices + flashcards)
   ============================================================ */

Object.assign(PREBUILT["Cybersécurité"], {
 "Sécuriser son appli 1 — XSS : bloquer l'injection de code": {
 "cours": "<div class=\"attention-box\"><strong>Règle légale et éthique :</strong> les tests de ce cours se font <mark>uniquement sur ta propre appli</mark> (ou une copie de test) ou avec l'autorisation écrite du propriétaire. Attaquer le site de quelqu'un d'autre est une infraction pénale, même « pour voir ».</div>\n<h3>Le principe d'une faille XSS</h3>\n<p><strong>XSS</strong> (<em>Cross-Site Scripting</em>) : un attaquant arrive à faire <mark>exécuter son code JavaScript dans la page d'une autre personne</mark>. Ce code s'exécute avec <strong>tous les droits de la victime</strong> sur ton site.</p>\n<table class=\"formula-table\"><tr><th>Type</th><th>Comment ça arrive</th><th>Exemple</th></tr><tr><td><strong>Stockée</strong></td><td>le code malveillant est enregistré (base de données) puis affiché à tous</td><td>un cours partagé contient du code ; chaque lecteur l'exécute</td></tr><tr><td><strong>Réfléchie</strong></td><td>le code est dans un lien ou un paramètre, renvoyé tel quel dans la page</td><td>un lien piégé <code>?recherche=&lt;script&gt;…</code></td></tr><tr><td><strong>Basée sur le DOM</strong></td><td>le JavaScript de la page insère lui-même une donnée dangereuse avec <code>innerHTML</code></td><td>un titre de chapitre mis dans <code>innerHTML</code></td></tr></table>\n<h3>Pourquoi c'est grave</h3>\n<ul><li>Le code peut <strong>lire le localStorage</strong>, où Supabase garde le jeton de session : l'attaquant vole le compte.</li><li>Il peut <strong>agir au nom de la victime</strong> : modifier ou supprimer des cours, envoyer des requêtes.</li><li>Il peut <strong>modifier la page</strong> : afficher un faux formulaire de connexion, enregistrer les touches tapées.</li><li>Dans une appli partagée comme BacMaster, <strong>un seul compte éditeur piégé</strong> pourrait attaquer toute la classe.</li></ul>\n<h3>Vulnérable ou sûr ?</h3>\n<pre><code>// VULNÉRABLE : le titre vient de la base (donc d'un autre compte)\ncarte.innerHTML = \"&lt;h3&gt;\" + chapitre.titre + \"&lt;/h3&gt;\";\n\n// SÛR : le texte reste du texte\nconst h3 = document.createElement(\"h3\");\nh3.textContent = chapitre.titre;\ncarte.append(h3);</code></pre>\n<p>Le payload classique de test : <code>&lt;img src=x onerror=alert(1)&gt;</code>. L'image n'existe pas, le navigateur déclenche <code>onerror</code> et exécute le code. (Une balise <code>&lt;script&gt;</code> insérée avec <code>innerHTML</code> ne s'exécute pas, mais cela ne rend pas <code>innerHTML</code> sûr : <code>onerror</code>, <code>onclick</code>, <code>javascript:</code>… fonctionnent.)</p>\n<h3>La défense en couches</h3>\n<p>Aucune protection n'est parfaite seule : on en empile plusieurs.</p>\n<ol><li><strong>Éviter le problème</strong> : <code>textContent</code> et <code>createElement</code> plutôt que <code>innerHTML</code>.</li><li><strong>Échapper à la sortie</strong> : si tu dois fabriquer du HTML, remplace <code>&amp; &lt; &gt; \" '</code> par leurs entités. L'échappement dépend du <em>contexte</em> (texte, attribut, URL, JavaScript).</li><li><strong>Assainir (liste blanche)</strong> quand on veut autoriser du HTML riche (cours mis en forme) : on <em>garde seulement</em> les balises et attributs connus comme sûrs, tout le reste est retiré ou rendu inoffensif.</li><li><strong>CSP</strong> (<em>Content-Security-Policy</em>) : le navigateur refuse tout script qui ne vient pas d'une source autorisée.</li><li><strong>Isoler</strong> le code non fiable dans une <code>&lt;iframe sandbox&gt;</code>.</li><li><strong>Limiter les dégâts</strong> : règles RLS côté serveur, jetons qui expirent.</li></ol>\n<h3>Assainir avec une liste blanche</h3>\n<pre><code>const BALISES_OK = new Set([\"P\", \"B\", \"I\", \"STRONG\", \"EM\", \"UL\", \"OL\", \"LI\", \"BR\", \"CODE\", \"PRE\", \"H3\"]);\n\nfunction assainir(html) {\n  const doc = new DOMParser().parseFromString(html, \"text/html\");   // document inerte : rien ne s'exécute\n  (function nettoyer(noeud) {\n    for (const enfant of [...noeud.childNodes]) {\n      if (enfant.nodeType !== Node.ELEMENT_NODE) continue;\n      if (!BALISES_OK.has(enfant.tagName)) {                        // balise non autorisée :\n        enfant.replaceWith(document.createTextNode(enfant.outerHTML));   // elle devient du TEXTE visible\n        continue;\n      }\n      for (const attribut of [...enfant.attributes]) enfant.removeAttribute(attribut.name);   // aucun attribut\n      nettoyer(enfant);\n    }\n  })(doc.body);\n  return doc.body.innerHTML;\n}</code></pre>\n<p>Le principe clé : une <strong>liste blanche</strong> (ce qui est permis) est bien plus sûre qu'une <em>liste noire</em> (ce qui est interdit), car l'attaquant trouve toujours la balise ou l'astuce que tu n'avais pas pensé à interdire. Pour un vrai projet, on utilise une bibliothèque éprouvée comme <strong>DOMPurify</strong> plutôt que son propre code.</p>\n<h3>CSP : une ceinture de sécurité</h3>\n<pre><code>&lt;meta http-equiv=\"Content-Security-Policy\"\n      content=\"default-src 'self'; script-src 'self'; img-src 'self' data:; object-src 'none'\"&gt;</code></pre>\n<ul><li><code>script-src 'self'</code> : seuls les scripts de ton propre site s'exécutent ; les <code>onerror=…</code> et scripts « inline » sont bloqués.</li><li>L'idéal est un <strong>en-tête HTTP</strong> ; sur un hébergement comme GitHub Pages on ne maîtrise pas les en-têtes et on se contente de la balise <code>meta</code> (moins complète).</li><li>Une CSP stricte oblige à ranger tout le JavaScript dans des fichiers, sans <code>onclick=\"…\"</code> dans le HTML.</li></ul>\n<h3>Isoler du code non fiable : iframe sandbox</h3>\n<pre><code>&lt;iframe sandbox=\"allow-scripts\" srcdoc=\"…code de l'élève…\"&gt;&lt;/iframe&gt;</code></pre>\n<ul><li><code>sandbox</code> sans <code>allow-same-origin</code> : le code est dans une <strong>origine isolée</strong>, il ne peut ni lire le <code>localStorage</code> de ton site ni toucher la page parente.</li><li>On y ajoute une CSP sans réseau pour qu'il ne puisse rien envoyer dehors. C'est la base pour exécuter du code d'élèves (exercices de programmation).</li></ul>\n<h3>Le cas BacMaster</h3>\n<p>Les cours, cartes et exercices sont <strong>partagés entre comptes</strong>, donc du HTML écrit par quelqu'un d'autre est affiché chez tous les lecteurs : c'est exactement le scénario d'une XSS stockée. La réponse :</p>\n<ul><li>Tout contenu <strong>reçu de la synchronisation</strong> passe par un nettoyeur avant d'entrer dans l'appli.</li><li>Les balises dangereuses (<code>script</code>, <code>iframe</code>, <code>img</code> sans source…) sont <strong>affichées comme du texte</strong> (pour ne pas perdre le texte d'une carte qui parle de « &lt;script&gt; »).</li><li>Les attributs <code>on…</code> sont retirés, sauf quelques fonctions autorisées une par une ; les liens <code>javascript:</code> sont refusés ; le style est filtré (pas de <code>url()</code>, pas de <code>position: fixed</code>).</li><li>Un outil d'iframe isolée est prêt pour les futurs exercices de code.</li></ul>\n<div class=\"retenir-box\"><strong>À retenir :</strong> XSS = code d'un attaquant exécuté chez la victime ; <code>textContent</code> plutôt que <code>innerHTML</code> ; échapper selon le contexte ; <strong>assainir par liste blanche</strong> ; CSP et <code>iframe sandbox</code> en renfort ; tester uniquement sur son propre site.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Pourquoi <code>div.innerHTML = nomChapitre</code> est-il dangereux alors que <code>div.textContent = nomChapitre</code> ne l'est pas ?</p>",
   "aide": "Que fait le navigateur d'une balise avec chacun des deux ?",
   "correction": "<p><code>innerHTML</code> <strong>interprète</strong> le texte comme du HTML : si le nom contient <code>&lt;img src=x onerror=…&gt;</code>, le code s'exécute. <code>textContent</code> insère du <strong>texte brut</strong> : la balise est simplement affichée, jamais exécutée.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Un commentaire contient <code>&lt;script&gt;fetch(...)&lt;/script&gt;</code> et il est affiché à tous les visiteurs. Quel type de XSS est-ce ?</p>",
   "aide": "Le code est enregistré puis servi à tout le monde.",
   "correction": "<p>Une XSS <strong>stockée</strong> : le contenu malveillant est conservé (base de données) et exécuté chez chaque visiteur qui affiche le commentaire. C'est la plus dangereuse car elle touche beaucoup de victimes sans qu'elles cliquent sur un lien piégé.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Corrige ce code : <code>liste.innerHTML += \"&lt;li&gt;\" + matiere + \"&lt;/li&gt;\"</code>, où <code>matiere</code> peut venir d'un autre compte. Donne deux corrections.</p>",
   "aide": "Soit tu évites innerHTML, soit tu échappes la valeur.",
   "correction": "<p><strong>Correction 1 (préférée)</strong> :</p><pre><code>const li = document.createElement(\"li\");\nli.textContent = matiere;\nliste.append(li);</code></pre><p><strong>Correction 2</strong> : fabriquer le HTML mais échapper la valeur : <code>liste.innerHTML += \"&lt;li&gt;\" + esc(matiere) + \"&lt;/li&gt;\"</code> avec une fonction <code>esc</code> qui remplace <code>&amp; &lt; &gt; \" '</code>. (Et attention : <code>+=</code> sur <code>innerHTML</code> reconstruit toute la liste ; la correction 1 est meilleure aussi pour cela.)</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Explique pourquoi une <strong>liste blanche</strong> de balises est plus sûre qu'une <strong>liste noire</strong> (« interdire script et iframe »).</p>",
   "aide": "Combien de façons existe-t-il d'exécuter du code dans une page ?",
   "correction": "<p>Une liste noire doit penser à <strong>tout</strong> ce qui est dangereux : <code>script</code>, mais aussi <code>img onerror</code>, <code>svg onload</code>, <code>a href=javascript:</code>, <code>body onload</code>, etc., sans oublier les nouveautés. Il suffit d'un oubli. Une liste blanche part du principe inverse : <strong>tout est refusé sauf ce qui est connu et sûr</strong> (par exemple <code>p</code>, <code>strong</code>, <code>ul</code>) ; ce qu'on n'a pas prévu est bloqué par défaut.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Améliore la fonction <code>assainir</code> du cours pour garder l'attribut <code>href</code> sur les balises <code>&lt;a&gt;</code>, mais <strong>seulement</strong> s'il commence par <code>https://</code>. Pourquoi refuser <code>javascript:</code> ?</p>",
   "aide": "Ajoute A à la liste blanche, puis dans la boucle des attributs, ne retire pas href si sa valeur est acceptable.",
   "correction": "<p></p><pre><code>const BALISES_OK = new Set([\"P\", \"B\", \"I\", \"STRONG\", \"EM\", \"UL\", \"OL\", \"LI\", \"BR\", \"CODE\", \"PRE\", \"H3\", \"A\"]);\n\nfunction assainir(html) {\n  const doc = new DOMParser().parseFromString(html, \"text/html\");\n  (function nettoyer(noeud) {\n    for (const enfant of [...noeud.childNodes]) {\n      if (enfant.nodeType !== Node.ELEMENT_NODE) continue;\n      if (!BALISES_OK.has(enfant.tagName)) {\n        enfant.replaceWith(document.createTextNode(enfant.outerHTML));\n        continue;\n      }\n      for (const attribut of [...enfant.attributes]) {\n        const ok = enfant.tagName === \"A\" &amp;&amp; attribut.name === \"href\" &amp;&amp; /^https:\\/\\//i.test(attribut.value);\n        if (!ok) enfant.removeAttribute(attribut.name);\n      }\n      if (enfant.tagName === \"A\") enfant.setAttribute(\"rel\", \"noopener noreferrer\");\n      nettoyer(enfant);\n    }\n  })(doc.body);\n  return doc.body.innerHTML;\n}</code></pre><p>Un lien <code>javascript:alert(1)</code> exécute du code quand on clique dessus : l'adresse n'est pas une page mais du JavaScript. On n'autorise donc que des schémas connus (<code>https:</code>).</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Que signifie XSS ?",
   "a": "Cross-Site Scripting : faire exécuter le code d'un attaquant dans la page d'une autre personne."
  },
  {
   "q": "Quels sont les 3 types de XSS ?",
   "a": "Stockée (le code est enregistré puis servi à tous), réfléchie (le code est dans un lien ou un paramètre renvoyé tel quel) et basée sur le DOM (le JavaScript de la page insère lui-même une donnée dangereuse)."
  },
  {
   "q": "Pourquoi une XSS est-elle grave ?",
   "a": "Le code attaquant a tous les droits de la victime : il peut voler le jeton de session dans localStorage, agir à sa place, modifier la page ou enregistrer ses frappes."
  },
  {
   "q": "Quel est le payload de test classique ?",
   "a": "<code>&lt;img src=x onerror=alert(1)&gt;</code> : l'image est introuvable, <code>onerror</code> s'exécute. À tester seulement sur son propre site."
  },
  {
   "q": "<code>textContent</code> ou <code>innerHTML</code> pour du contenu venant d'un utilisateur ?",
   "a": "<code>textContent</code> : il insère du texte brut. <code>innerHTML</code> interprète le HTML et exécute les <code>onerror</code>, <code>onclick</code>…"
  },
  {
   "q": "Pourquoi une balise <code>&lt;script&gt;</code> insérée par <code>innerHTML</code> n'est-elle pas la seule menace ?",
   "a": "Elle ne s'exécute pas par ce chemin, mais <code>onerror</code>, <code>onclick</code>, <code>javascript:</code> et d'autres vecteurs, eux, s'exécutent."
  },
  {
   "q": "Quels caractères échappe-t-on pour du texte dans du HTML ?",
   "a": "<code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>\"</code> et <code>'</code>, remplacés par leurs entités (<code>&amp;amp;</code>, <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;quot;</code>, <code>&amp;#39;</code>)."
  },
  {
   "q": "Que veut dire « assainir » du HTML ?",
   "a": "Ne garder que les balises et attributs connus comme sûrs (liste blanche) ; le reste est retiré ou rendu inoffensif."
  },
  {
   "q": "Liste blanche ou liste noire ?",
   "a": "Liste blanche : on autorise seulement ce qui est connu sûr. Une liste noire oublie toujours un vecteur d'attaque."
  },
  {
   "q": "Pourquoi <code>DOMParser</code> est-il utile pour assainir ?",
   "a": "Il construit un document inerte : le HTML analysé ne s'exécute pas et ne charge aucune ressource pendant le nettoyage."
  },
  {
   "q": "Que fait une CSP ?",
   "a": "Content-Security-Policy : le navigateur refuse les scripts qui ne viennent pas des sources autorisées (par exemple <code>script-src 'self'</code> bloque les scripts inline et les <code>onerror</code>)."
  },
  {
   "q": "Pourquoi refuser les liens <code>javascript:</code> ?",
   "a": "Cliquer dessus exécute du code JavaScript au lieu d'ouvrir une page."
  },
  {
   "q": "Que fait <code>&lt;iframe sandbox=\"allow-scripts\"&gt;</code> sans <code>allow-same-origin</code> ?",
   "a": "Le code tourne dans une origine isolée : il ne peut pas lire le localStorage du site ni toucher la page parente."
  },
  {
   "q": "Pourquoi BacMaster nettoie-t-il les contenus reçus de la synchronisation ?",
   "a": "Les cours sont partagés entre comptes : sans nettoyage, un compte éditeur piégé exécuterait du code chez tous les lecteurs (XSS stockée)."
  },
  {
   "q": "Quel cadre légal pour tester des failles ?",
   "a": "Uniquement sur son propre site ou avec l'autorisation écrite du propriétaire ; sinon c'est une infraction pénale."
  }
 ]
},
 "Sécuriser son appli 2 — comptes, rôles & règles RLS": {
 "cours": "<h3>Authentification et autorisation : deux questions différentes</h3>\n<table class=\"formula-table\"><tr><th></th><th>Authentification</th><th>Autorisation</th></tr><tr><td>Question</td><td><strong>Qui es-tu ?</strong></td><td><strong>Qu'as-tu le droit de faire ?</strong></td></tr><tr><td>Exemple</td><td>se connecter avec email et mot de passe</td><td>un lecteur n'a pas le droit de modifier un cours</td></tr><tr><td>Dans BacMaster</td><td>Supabase Auth (comptes, sessions)</td><td>rôles + règles RLS</td></tr></table>\n<p>Beaucoup de failles viennent d'une confusion : être <em>connecté</em> ne veut pas dire être <em>autorisé</em>.</p>\n<h3>Mots de passe et sessions</h3>\n<ul><li>Un mot de passe n'est <strong>jamais</strong> stocké en clair : le serveur ne garde qu'une <strong>empreinte</strong> (hachage avec un algorithme lent comme bcrypt ou Argon2 et un sel). Supabase Auth s'en occupe ; ne réinvente pas ça.</li><li>Après la connexion, le serveur donne un <strong>jeton</strong> (JWT) : un badge signé, avec une date d'expiration, envoyé à chaque requête (<code>Authorization: Bearer …</code>). <mark>Qui possède le jeton est cette personne</mark> aux yeux du serveur : il faut donc le protéger (pas de faille XSS).</li><li>L'<strong>authentification à deux facteurs</strong> (code du téléphone, clé de sécurité) protège un compte même si le mot de passe fuit. À activer pour les comptes d'administration.</li></ul>\n<h3>La règle d'or : ne jamais faire confiance au client</h3>\n<div class=\"attention-box\"><strong>Cacher un bouton n'est pas une protection.</strong> Tout ce qui tourne dans le navigateur appartient à l'utilisateur : il peut modifier le JavaScript, ouvrir la console, ou appeler l'API directement. Si le bouton « Modifier » est masqué aux lecteurs <em>mais que la base accepte quand même la requête</em>, n'importe quel élève un peu curieux peut modifier les cours. <mark>Le contrôle d'accès doit être fait côté serveur.</mark></div>\n<p>Les failles de ce type s'appellent <strong>Broken Access Control</strong> : c'est la catégorie n°1 de l'OWASP Top 10. Variantes classiques : <strong>IDOR</strong> (changer l'identifiant dans une requête pour lire les données de quelqu'un d'autre) et <strong>élévation de privilèges</strong> (un lecteur se donne le rôle admin).</p>\n<h3>Les rôles de BacMaster</h3>\n<table class=\"formula-table\"><tr><th>Rôle</th><th>Lire les cours</th><th>Modifier les cours</th><th>Gérer les comptes</th></tr><tr><td>Lecteur</td><td>oui</td><td>non</td><td>non</td></tr><tr><td>Éditeur</td><td>oui</td><td>oui</td><td>non</td></tr><tr><td>Professeur</td><td>oui</td><td>oui (ses passages sont signalés)</td><td>non</td></tr><tr><td>Admin</td><td>oui</td><td>oui</td><td>oui</td></tr></table>\n<h3>RLS : la sécurité dans la base elle-même</h3>\n<p>La <strong>RLS</strong> (<em>Row Level Security</em>) est une fonction de PostgreSQL : pour chaque requête, la base applique des <strong>règles (policies)</strong> qui décident quelles lignes la personne peut lire ou écrire. Comme la règle est dans la base, elle ne peut pas être contournée depuis le navigateur.</p>\n<ul><li>Une fois la RLS activée, <mark>tout est refusé par défaut</mark> : sans règle, personne ne peut rien faire.</li><li><code>USING (…)</code> : quelles <em>lignes existantes</em> sont visibles ou modifiables.</li><li><code>WITH CHECK (…)</code> : quelles <em>lignes écrites</em> sont acceptées (nouvelles ou modifiées).</li><li><code>auth.uid()</code> : l'identifiant de la personne connectée.</li></ul>\n<pre><code>alter table public.progression enable row level security;\n\n-- chacun ne voit et ne modifie que SES lignes\ncreate policy \"ma_progression\" on public.progression\n  for all to authenticated\n  using      (user_id = (select auth.uid()))\n  with check (user_id = (select auth.uid()));</code></pre>\n<pre><code>-- une fonction qui dit si la personne a un rôle d'écriture\ncreate function public.peut_editer() returns boolean\nlanguage sql stable security definer set search_path = ''\nas $$\n  select exists (\n    select 1 from public.profils p\n    where p.user_id = (select auth.uid()) and p.role in ('admin', 'editor', 'teacher')\n  );\n$$;\n\ncreate policy \"tous_lisent\" on public.chapitres\n  for select to authenticated using (true);\n\ncreate policy \"editeurs_modifient\" on public.chapitres\n  for update to authenticated\n  using (public.peut_editer()) with check (public.peut_editer());\n\ncreate policy \"editeurs_creent\" on public.chapitres\n  for insert to authenticated with check (public.peut_editer());</code></pre>\n<ul><li><code>security definer</code> : la fonction s'exécute avec les droits de son créateur (pour pouvoir lire la table des profils) ; on ajoute <code>set search_path = ''</code> pour empêcher qu'on la détourne.</li><li>Une règle <code>for insert</code> n'a que <code>with check</code> (il n'y a pas encore de ligne à tester).</li></ul>\n<h3>Les pièges classiques</h3>\n<table class=\"formula-table\"><tr><th>Erreur</th><th>Conséquence</th></tr><tr><td>Oublier <code>enable row level security</code></td><td>la table est <strong>ouverte à tous</strong> avec la clé publique du site</td></tr><tr><td>Une règle d'écriture <code>using (true)</code></td><td>n'importe quel compte connecté peut modifier ou effacer</td></tr><tr><td>Laisser un utilisateur modifier sa propre colonne <code>role</code></td><td><strong>élévation de privilèges</strong> : un lecteur se nomme admin</td></tr><tr><td>Mettre la clé <code>service_role</code> dans le navigateur</td><td>elle <strong>contourne toute la RLS</strong> : accès total</td></tr><tr><td>Fonction <code>security definer</code> sans <code>search_path</code></td><td>risque de détournement de la fonction</td></tr></table>\n<p>Dans BacMaster, la table des profils n'est modifiable que par un admin, et la règle vérifie aussi que le nouveau rôle fait partie de la liste permise (<code>role = any(array['admin','editor','reader','teacher'])</code>) : un admin ne peut pas inventer un rôle.</p>\n<h3>Vérifier : l'audit en 2 requêtes et 4 tests</h3>\n<pre><code>-- 1) Quelles tables ont la RLS activée ?\nselect tablename, rowsecurity from pg_tables where schemaname = 'public';\n\n-- 2) Quelles règles existent ?\nselect tablename, policyname, cmd, qual, with_check from pg_policies where schemaname = 'public';</code></pre>\n<ol><li><strong>Sans être connecté</strong>, appeler l'API avec la clé publique : aucune donnée ne doit sortir.</li><li><strong>Avec un compte lecteur</strong>, tenter de modifier un cours depuis la console : la base doit refuser.</li><li><strong>Avec un compte lecteur</strong>, tenter de changer son propre rôle : refusé.</li><li><strong>Avec deux comptes</strong>, essayer de lire les données privées de l'autre : résultat vide.</li></ol>\n<div class=\"retenir-box\"><strong>À retenir :</strong> authentification ≠ autorisation ; jamais de confiance au navigateur ; <strong>RLS activée sur chaque table</strong> avec des règles <code>using</code> / <code>with check</code> ; ne jamais exposer la clé <code>service_role</code> ; tester avec plusieurs comptes de rôles différents.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Un élève masque le bouton « Supprimer » avec les outils de développement et ne peut plus l'utiliser… Pourquoi cette « protection » ne suffit-elle pas du tout ?</p>",
   "aide": "Qui contrôle le navigateur ?",
   "correction": "<p>Parce que le navigateur est <strong>entre les mains de l'utilisateur</strong> : on peut réafficher le bouton, modifier le JavaScript ou envoyer la requête à la main. Seul le <strong>serveur</strong> (ici les règles RLS de la base) peut refuser la suppression de façon fiable.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris une règle RLS qui permet à chaque utilisateur de <strong>lire</strong> uniquement ses propres notes dans la table <code>notes(id, user_id, texte)</code>.</p>",
   "aide": "for select, to authenticated, using avec auth.uid().",
   "correction": "<p></p><pre><code>alter table public.notes enable row level security;\n\ncreate policy \"lire_mes_notes\" on public.notes\n  for select to authenticated\n  using (user_id = (select auth.uid()));</code></pre>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Un lecteur envoie <code>supabase.from(\"profils\").update({ role: \"admin\" }).eq(\"user_id\", monId)</code>. Quelle règle l'empêche, et quelle erreur de conception l'aurait rendu possible ?</p>",
   "aide": "Qui a le droit de modifier la table des profils ?",
   "correction": "<p>La règle qui réserve la <strong>modification des profils aux admins</strong> (<code>using (est_admin())</code>) refuse la requête du lecteur. L'erreur de conception serait une règle du type « chacun modifie sa ligne » (<code>user_id = auth.uid()</code>) sans protéger la colonne <code>role</code> : le lecteur se donnerait lui-même le rôle admin (<strong>élévation de privilèges</strong>).</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>La table <code>exercices</code> n'a <strong>pas</strong> activé la RLS, et la clé publique du site est dans le code. Décris ce qu'un visiteur anonyme peut faire et la correction minimale.</p>",
   "aide": "Sans RLS, qui est protégé par quoi ?",
   "correction": "<p>Sans RLS, les règles ne s'appliquent pas : la clé publique (visible dans le code source de la page) suffit pour <strong>lire, modifier et supprimer toutes les lignes</strong> de la table, même sans compte. <strong>Correction minimale :</strong> <code>alter table public.exercices enable row level security;</code> (tout est alors refusé), puis ajouter les règles strictement nécessaires (par exemple lecture pour les comptes connectés, écriture pour les éditeurs), et vérifier avec <code>pg_tables</code> et <code>pg_policies</code>.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Différence entre authentification et autorisation ?",
   "a": "Authentification : prouver qui on est (connexion). Autorisation : décider ce que la personne a le droit de faire."
  },
  {
   "q": "Comment un mot de passe doit-il être stocké ?",
   "a": "Jamais en clair : seulement son empreinte (hachage lent comme bcrypt ou Argon2, avec un sel). Supabase Auth le gère."
  },
  {
   "q": "Qu'est-ce qu'un JWT ?",
   "a": "Un jeton signé qui prouve l'identité de l'utilisateur, avec une date d'expiration, envoyé à chaque requête ; qui le possède est cette personne pour le serveur."
  },
  {
   "q": "À quoi sert l'authentification à deux facteurs ?",
   "a": "À protéger le compte même si le mot de passe fuit : il faut aussi un code ou une clé que seul le propriétaire possède."
  },
  {
   "q": "Pourquoi cacher un bouton ne protège-t-il pas ?",
   "a": "L'utilisateur contrôle son navigateur : il peut modifier le code ou appeler l'API directement. Le contrôle doit être fait côté serveur."
  },
  {
   "q": "Qu'est-ce que Broken Access Control ?",
   "a": "Une faille où l'on peut faire ce qu'on n'aurait pas dû (lire, modifier, supprimer). C'est la catégorie n°1 de l'OWASP Top 10."
  },
  {
   "q": "Qu'est-ce qu'une IDOR ?",
   "a": "Accéder aux données d'un autre en changeant un identifiant dans la requête, parce que le serveur ne vérifie pas à qui appartient la ressource."
  },
  {
   "q": "Qu'est-ce qu'une élévation de privilèges ?",
   "a": "Obtenir plus de droits que prévu, par exemple un lecteur qui se donne le rôle admin."
  },
  {
   "q": "Que fait la RLS ?",
   "a": "Row Level Security : PostgreSQL applique des règles qui décident, ligne par ligne, ce que chaque utilisateur peut lire ou écrire."
  },
  {
   "q": "Que se passe-t-il quand la RLS est activée sans aucune règle ?",
   "a": "Tout est refusé : personne ne peut rien lire ni écrire (sauf le rôle service)."
  },
  {
   "q": "Différence entre <code>USING</code> et <code>WITH CHECK</code> ?",
   "a": "<code>USING</code> filtre les lignes existantes visibles ou modifiables ; <code>WITH CHECK</code> valide les lignes qu'on écrit (nouvelles ou modifiées)."
  },
  {
   "q": "Que renvoie <code>auth.uid()</code> ?",
   "a": "L'identifiant de l'utilisateur connecté, utilisé dans les règles (<code>user_id = auth.uid()</code>)."
  },
  {
   "q": "Que risque-t-on si on oublie <code>enable row level security</code> ?",
   "a": "La table est ouverte à tous avec la clé publique du site : n'importe qui peut lire, modifier, supprimer."
  },
  {
   "q": "Pourquoi <code>set search_path = ''</code> sur une fonction <code>security definer</code> ?",
   "a": "Pour empêcher qu'on détourne la fonction (qui a des droits élevés) en faisant résoudre ses noms vers des objets piégés."
  },
  {
   "q": "Comment vérifier la RLS d'une base ?",
   "a": "<code>select tablename, rowsecurity from pg_tables where schemaname = 'public'</code> et <code>select * from pg_policies</code>, puis des tests avec plusieurs comptes (anonyme, lecteur, éditeur)."
  }
 ]
},
 "Sécuriser son appli 3 — secrets, clés & dépendances": {
 "cours": "<h3>Ce qui est dans le navigateur est public</h3>\n<p>Tout fichier envoyé au navigateur (HTML, CSS, JavaScript, images) peut être <strong>lu par n'importe qui</strong> : « Afficher le code source », onglet Réseau, enregistrer la page. Cacher un mot de passe dans un fichier JavaScript, même « compliqué » ou en base64, ne le cache pas : c'est une porte avec l'adresse du coffre écrite dessus.</p>\n<h3>Clé publique ou clé secrète ?</h3>\n<table class=\"formula-table\"><tr><th></th><th>Clé publique</th><th>Clé secrète</th></tr><tr><td>Exemple Supabase</td><td>clé <code>anon</code> (ou « publishable »)</td><td>clé <code>service_role</code>, mot de passe de la base</td></tr><tr><td>Où ?</td><td>peut être dans le code du site</td><td><strong>jamais</strong> dans le navigateur ni sur GitHub</td></tr><tr><td>Pourquoi</td><td>elle ne donne que les droits permis par les règles RLS</td><td>elle <strong>contourne</strong> toutes les règles : accès total</td></tr><tr><td>Autres exemples</td><td>identifiant d'un projet, clé publique VAPID (notifications)</td><td>clé privée VAPID, jeton GitHub, clé d'API payante, mot de passe</td></tr></table>\n<div class=\"retenir-box\"><strong>Question à se poser pour chaque valeur :</strong> « Si tout le monde lisait ceci, que pourrait-on faire ? » Si la réponse est « rien de grave, la sécurité est ailleurs » (clé <code>anon</code> + RLS), c'est une valeur publique. Sinon, c'est un <strong>secret</strong>.</div>\n<h3>Où ranger un secret</h3>\n<ul><li>Dans des <strong>variables d'environnement</strong> ou le <strong>coffre de secrets</strong> de la plateforme (secrets d'une fonction Supabase, secrets GitHub Actions).</li><li>Dans un fichier <code>.env</code> local <strong>listé dans <code>.gitignore</code></strong> pour qu'il ne parte jamais sur GitHub.</li><li><strong>Côté serveur uniquement</strong> : une fonction serveur (Edge Function) utilise le secret et ne renvoie au navigateur que le résultat.</li></ul>\n<pre><code># .gitignore\n.env\n.env.*\n*.pem</code></pre>\n<pre><code>// Fonction serveur (Supabase Edge Function) : le secret reste côté serveur\nconst cle = Deno.env.get(\"CLE_API_SECRETE\");   // jamais renvoyée au navigateur</code></pre>\n<h3>Que faire si un secret a fuité</h3>\n<ol><li><strong>Révoquer</strong> la clé tout de suite (la désactiver chez le fournisseur) : c'est l'urgence n°1.</li><li><strong>Renouveler</strong> : en créer une nouvelle et mettre à jour les endroits qui l'utilisent.</li><li><strong>Enquêter</strong> : regarder les journaux pour savoir si elle a servi.</li><li><strong>Comprendre</strong> comment elle a fuité, et corriger la cause.</li><li><strong>Nettoyer</strong> l'historique Git en dernier (utile, mais insuffisant : une clé publiée doit être considérée comme perdue, car des robots scannent GitHub en continu).</li></ol>\n<div class=\"attention-box\"><strong>Supprimer le fichier ne supprime pas le secret.</strong> Git garde tout l'historique : une clé ajoutée puis retirée reste lisible dans les anciens <em>commits</em>. Active la <strong>détection de secrets</strong> de GitHub (<em>secret scanning</em> et <em>push protection</em>) : elle bloque un envoi qui contient une clé.</div>\n<h3>Le principe du moindre privilège</h3>\n<ul><li>Donne à chaque clé, compte ou jeton <strong>uniquement les droits dont il a besoin</strong> et pour le moins de temps possible (jetons qui expirent).</li><li>Un compte éditeur n'a pas besoin des droits d'admin ; l'interface du navigateur n'a pas besoin de la clé <code>service_role</code>.</li><li>Plus une clé est puissante, moins elle doit être répandue.</li></ul>\n<h3>Les dépendances : du code que tu n'as pas écrit</h3>\n<p>Ton appli charge du code venu d'ailleurs : une bibliothèque sur un CDN, un paquet npm. <mark>Tu fais confiance à son auteur et au serveur qui l'héberge</mark> : s'ils sont compromis, ce code s'exécute dans ton site, avec tous ses droits. C'est une <strong>attaque de la chaîne d'approvisionnement</strong> (<em>supply chain</em>).</p>\n<ul><li>Des paquets npm populaires ont déjà été piégés après qu'un pirate en a pris le contrôle (par exemple <em>event-stream</em> en 2018).</li><li><strong>Typosquatting</strong> : un paquet au nom presque identique (<code>reqeusts</code> au lieu de <code>requests</code>) contient du code malveillant.</li><li>En 2024, le domaine du service <em>polyfill.io</em>, utilisé par des dizaines de milliers de sites, a été racheté puis a servi du code malveillant à leurs visiteurs.</li></ul>\n<h3>Se protéger des dépendances</h3>\n<table class=\"formula-table\"><tr><th>Mesure</th><th>Comment</th></tr><tr><td><strong>Épingler la version exacte</strong></td><td><code>supabase-js@2.45.0</code> plutôt que <code>@2</code> ou <code>latest</code> : tu ne reçois pas une nouvelle version sans l'avoir choisie</td></tr><tr><td><strong>SRI</strong> (<em>Subresource Integrity</em>)</td><td>le navigateur compare le fichier reçu à une empreinte : s'il a été modifié, il le refuse</td></tr><tr><td><strong>Héberger soi-même</strong></td><td>copier le fichier dans son propre dépôt pour les bibliothèques critiques</td></tr><tr><td><strong>Peu de dépendances</strong></td><td>chaque dépendance est une porte supplémentaire</td></tr><tr><td><strong>Mettre à jour régulièrement</strong></td><td><code>npm audit</code>, Dependabot : les failles connues sont corrigées par les mises à jour</td></tr><tr><td><strong>Se méfier des versions toutes neuves</strong></td><td>attendre quelques jours qu'une version publiée soit examinée avant de l'adopter</td></tr></table>\n<pre><code>&lt;!-- version exacte + empreinte d'intégrité + origine anonyme --&gt;\n&lt;script src=\"https://cdn.jsdelivr.net/npm/exemple-lib@1.2.3/dist/lib.min.js\"\n        integrity=\"sha384-EMPREINTE_A_CALCULER\"\n        crossorigin=\"anonymous\"&gt;&lt;/script&gt;</code></pre>\n<pre><code># calculer l'empreinte d'un fichier (à faire sur le fichier officiel téléchargé)\nopenssl dgst -sha384 -binary lib.min.js | openssl base64 -A</code></pre>\n<p><strong>Dans BacMaster :</strong> la bibliothèque Supabase est chargée depuis un CDN avec une version flottante (<code>@2</code>). Une amélioration à faire : épingler une version exacte et ajouter l'attribut <code>integrity</code>.</p>\n<div class=\"retenir-box\"><strong>À retenir :</strong> le navigateur est public ; clé <code>anon</code> = publique, <code>service_role</code> et mots de passe = secrets côté serveur uniquement ; <code>.gitignore</code> + détection de secrets ; secret divulgué = <strong>révoquer d'abord</strong> ; moindre privilège ; <strong>épingler et vérifier</strong> les dépendances (version exacte + SRI).</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Classe en « peut être dans le code du site » ou « secret côté serveur » : (a) clé <code>anon</code> Supabase ; (b) clé <code>service_role</code> ; (c) mot de passe de la base ; (d) URL du projet Supabase.</p>",
   "aide": "Pose-toi la question : que peut faire quelqu'un qui lit cette valeur ?",
   "correction": "<p>(a) <strong>publique</strong> (limitée par la RLS) ; (b) <strong>secret</strong> (contourne la RLS) ; (c) <strong>secret</strong> ; (d) <strong>publique</strong> (c'est l'adresse du projet, la sécurité n'en dépend pas).</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Tu viens de publier sur GitHub un fichier qui contient une clé secrète. Tu le supprimes dans le commit suivant. Est-ce suffisant ? Que fais-tu en premier ?</p>",
   "aide": "Git garde l'historique.",
   "correction": "<p><strong>Non.</strong> La clé reste lisible dans l'historique des commits, et des robots scannent GitHub en permanence. En premier : <strong>révoquer la clé</strong> chez le fournisseur et en créer une nouvelle ; ensuite vérifier les journaux, corriger la cause (ajouter le fichier au <code>.gitignore</code>, activer la détection de secrets) et éventuellement nettoyer l'historique.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Pourquoi vaut-il mieux écrire <code>…/supabase-js@2.45.0</code> que <code>…/supabase-js@2</code> dans une balise <code>&lt;script&gt;</code> ? Quel risque évite-t-on ?</p>",
   "aide": "Que se passe-t-il le jour où une nouvelle version 2.x (ou une version piégée) est publiée ?",
   "correction": "<p>Avec <code>@2</code>, le CDN sert la <strong>dernière version 2.x</strong> : le jour où une version buguée ou compromise est publiée, ton site l'exécute <strong>sans que tu l'aies décidé ni testé</strong>. Une version exacte garantit que tu exécutes toujours le code que tu as vérifié ; tu mets à jour quand tu le choisis.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Explique à quoi sert l'attribut <code>integrity</code> d'une balise <code>&lt;script&gt;</code> et ce qui se passe si le CDN est piraté et le fichier modifié.</p>",
   "aide": "Le navigateur compare une empreinte.",
   "correction": "<p><code>integrity=\"sha384-…\"</code> contient l'empreinte (hachage) du fichier attendu. Le navigateur calcule l'empreinte du fichier reçu : <strong>si elle est différente, il refuse de l'exécuter</strong>. Un CDN piraté qui modifie le fichier est donc sans effet sur ton site (le script ne se charge pas), au lieu d'exécuter du code malveillant chez tous tes utilisateurs.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Ton application doit envoyer des notifications push. La clé publique VAPID est utilisée par le navigateur, la clé privée sert à signer les messages. Où places-tu chacune ? Pourquoi un programme côté navigateur ne doit-il jamais envoyer lui-même les notifications ?</p>",
   "aide": "Qui a besoin de signer, et qui peut lire le code du navigateur ?",
   "correction": "<p>La <strong>clé publique</strong> va dans le code du site (le navigateur l'utilise pour s'abonner). La <strong>clé privée</strong> reste <strong>côté serveur</strong>, dans les secrets d'une fonction serveur : c'est elle qui signe et envoie les messages. Si le navigateur envoyait lui-même les notifications, la clé privée devrait être dans le code, donc lisible par tous : n'importe qui pourrait envoyer de fausses notifications à tous les abonnés.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Pourquoi ne peut-on pas cacher un secret dans du JavaScript ?",
   "a": "Tout fichier envoyé au navigateur est lisible par l'utilisateur (code source, onglet Réseau) : le « cacher » ne sert à rien."
  },
  {
   "q": "Quelle différence entre <code>anon</code> et <code>service_role</code> ?",
   "a": "<code>anon</code> est publique et limitée par la RLS ; <code>service_role</code> contourne la RLS (accès total) et ne doit jamais sortir du serveur."
  },
  {
   "q": "Quelle question pour savoir si une valeur est secrète ?",
   "a": "« Si tout le monde lisait ceci, que pourrait-on faire ? » Si c'est grave, c'est un secret."
  },
  {
   "q": "Où ranger un secret ?",
   "a": "Dans des variables d'environnement ou le coffre de secrets de la plateforme, côté serveur ; en local dans un <code>.env</code> listé dans <code>.gitignore</code>."
  },
  {
   "q": "Que contient un fichier <code>.gitignore</code> ?",
   "a": "La liste des fichiers que Git doit ignorer (par exemple <code>.env</code>) pour qu'ils ne soient jamais envoyés sur GitHub."
  },
  {
   "q": "Un secret a fuité : première action ?",
   "a": "Le révoquer immédiatement chez le fournisseur, puis en créer un nouveau, enquêter, corriger la cause et nettoyer l'historique."
  },
  {
   "q": "Pourquoi supprimer un fichier de Git n'efface-t-il pas la clé ?",
   "a": "L'historique conserve les anciens commits : la clé reste lisible dedans."
  },
  {
   "q": "Que fait la détection de secrets de GitHub ?",
   "a": "Elle repère les clés dans le code et peut bloquer un envoi qui en contient (push protection)."
  },
  {
   "q": "Qu'est-ce que le principe du moindre privilège ?",
   "a": "Donner à chaque compte, clé ou jeton uniquement les droits nécessaires, et pour le moins de temps possible."
  },
  {
   "q": "Qu'est-ce qu'une attaque de la chaîne d'approvisionnement ?",
   "a": "Compromettre une bibliothèque ou un service que tu utilises pour que son code malveillant s'exécute dans ton application."
  },
  {
   "q": "Qu'est-ce que le typosquatting ?",
   "a": "Publier un paquet au nom presque identique à un paquet connu (une faute de frappe) pour piéger ceux qui se trompent."
  },
  {
   "q": "Pourquoi épingler la version exacte d'une bibliothèque ?",
   "a": "Pour n'exécuter que le code qu'on a choisi et vérifié, et pas une nouvelle version buguée ou compromise."
  },
  {
   "q": "Que fait l'attribut <code>integrity</code> (SRI) ?",
   "a": "Le navigateur vérifie l'empreinte du fichier reçu et refuse de l'exécuter si elle ne correspond pas à celle attendue."
  },
  {
   "q": "Comment calculer une empreinte SRI ?",
   "a": "<code>openssl dgst -sha384 -binary fichier.js | openssl base64 -A</code>, puis <code>integrity=\"sha384-…\"</code>."
  },
  {
   "q": "Que faire contre les failles des dépendances ?",
   "a": "Peu de dépendances, mises à jour régulières (<code>npm audit</code>, Dependabot), versions épinglées, SRI, et attendre quelques jours avant d'adopter une version toute neuve."
  }
 ]
},
 "Sécuriser son appli 4 — auditer sa propre appli (OWASP)": {
 "cours": "<div class=\"attention-box\"><strong>Cadre légal :</strong> un audit de sécurité se fait sur <mark>ta propre appli ou avec l'autorisation écrite du propriétaire</mark>. Entrer ou rester dans un système informatique sans y être autorisé est une infraction pénale, même sans rien casser. En cas de doute : demande d'abord, teste ensuite.</div>\n<h3>Penser comme un attaquant : le modèle de menace</h3>\n<p>Avant de chercher des failles, on se pose 4 questions : <strong>Que protège-t-on ?</strong> (comptes, cours, progression) · <strong>Contre qui ?</strong> (curieux, camarade, robot, compte piégé) · <strong>Par où peut-il entrer ?</strong> (formulaire, API, contenu partagé, dépendances) · <strong>Quel serait l'impact ?</strong></p>\n<p>Un moyen simple de ne rien oublier : la méthode <strong>STRIDE</strong>.</p>\n<table class=\"formula-table\"><tr><th>Lettre</th><th>Menace</th><th>Exemple dans BacMaster</th></tr><tr><td><strong>S</strong>poofing</td><td>usurper une identité</td><td>voler un jeton de session (XSS)</td></tr><tr><td><strong>T</strong>ampering</td><td>modifier ce qui ne doit pas l'être</td><td>un lecteur modifie un cours</td></tr><tr><td><strong>R</strong>epudiation</td><td>nier avoir agi</td><td>un éditeur efface un cours : le journal d'audit le montre</td></tr><tr><td><strong>I</strong>nformation disclosure</td><td>lire ce qu'on ne devrait pas</td><td>lire la progression privée d'un autre</td></tr><tr><td><strong>D</strong>enial of service</td><td>rendre l'appli inutilisable</td><td>remplir la base de contenus géants</td></tr><tr><td><strong>E</strong>levation of privilege</td><td>obtenir plus de droits</td><td>un lecteur devient admin</td></tr></table>\n<h3>L'OWASP Top 10 appliqué à BacMaster</h3>\n<p>L'<strong>OWASP</strong> est une organisation qui publie la liste des 10 catégories de failles les plus fréquentes dans les applications web (édition 2021). La voici, avec ce que ça donne pour une appli comme la nôtre.</p>\n<table class=\"formula-table\"><tr><th>Catégorie</th><th>Question à se poser</th><th>Dans BacMaster</th></tr><tr><td><strong>A01</strong> Contrôle d'accès défaillant</td><td>chacun ne peut-il faire que ce qui lui est permis ?</td><td>rôles + règles RLS</td></tr><tr><td><strong>A02</strong> Défaillances cryptographiques</td><td>les données sensibles sont-elles protégées ?</td><td>HTTPS partout, mots de passe hachés par Supabase, aucun secret dans le navigateur</td></tr><tr><td><strong>A03</strong> Injection</td><td>une donnée peut-elle être interprétée comme du code ?</td><td>XSS (nettoyage du HTML reçu) ; requêtes SQL paramétrées par supabase-js</td></tr><tr><td><strong>A04</strong> Conception non sécurisée</td><td>a-t-on pensé aux abus avant de coder ?</td><td>modèle de menace, rôles</td></tr><tr><td><strong>A05</strong> Mauvaise configuration</td><td>une option par défaut est-elle dangereuse ?</td><td>inscriptions ouvertes, RLS oubliée, clés</td></tr><tr><td><strong>A06</strong> Composants vulnérables</td><td>les dépendances sont-elles à jour et sûres ?</td><td>supabase-js, polices, MathJax</td></tr><tr><td><strong>A07</strong> Authentification défaillante</td><td>comptes et sessions sont-ils solides ?</td><td>mots de passe, jetons, 2FA admin</td></tr><tr><td><strong>A08</strong> Intégrité des données et du code</td><td>ce qu'on reçoit est-il vérifié ?</td><td>SRI, contenu partagé nettoyé, mises à jour</td></tr><tr><td><strong>A09</strong> Journalisation insuffisante</td><td>peut-on savoir qui a fait quoi ?</td><td>journal d'audit</td></tr><tr><td><strong>A10</strong> SSRF</td><td>le serveur peut-il être poussé à appeler n'importe quelle adresse ?</td><td>surtout pour les fonctions serveur</td></tr></table>\n<h3>La checklist d'audit (à cocher sur ta propre appli)</h3>\n<table class=\"formula-table\"><tr><th>#</th><th>Test</th><th>Résultat attendu</th></tr><tr><td>1</td><td>Sans compte, appeler l'API avec la clé publique sur chaque table</td><td>aucune donnée lisible, aucune écriture possible</td></tr><tr><td>2</td><td>Avec un compte <strong>lecteur</strong>, tenter de modifier un cours depuis la console</td><td>refusé par la base</td></tr><tr><td>3</td><td>Avec un compte lecteur, tenter de modifier son propre rôle</td><td>refusé</td></tr><tr><td>4</td><td>Avec deux comptes, lire les données privées de l'autre</td><td>résultat vide</td></tr><tr><td>5</td><td>Créer (sur une copie de test) un cours contenant <code>&lt;img src=x onerror=alert(1)&gt;</code> et l'ouvrir avec un autre compte</td><td>rien ne s'exécute : le code est affiché comme du texte</td></tr><tr><td>6</td><td>Chercher <code>service_role</code> et les mots de passe dans tous les fichiers du dépôt</td><td>aucun résultat (<code>grep -ri service_role .</code>)</td></tr><tr><td>7</td><td>Vérifier les inscriptions dans le tableau de bord Supabase</td><td>fermées si la classe a déjà ses comptes</td></tr><tr><td>8</td><td>Vérifier que la RLS est activée sur <strong>toutes</strong> les tables</td><td><code>rowsecurity = true</code> partout</td></tr><tr><td>9</td><td>Lister les dépendances externes</td><td>versions épinglées, intégrité (SRI) si possible</td></tr><tr><td>10</td><td>Tester la restauration d'un cours depuis l'historique</td><td>le cours revient (la sauvegarde sert vraiment)</td></tr></table>\n<pre><code># chercher une clé oubliée dans le projet (à lancer dans le dossier du site)\ngrep -rniE \"service_role|secret|password|BEGIN PRIVATE KEY\" . --include=\"*.js\" --include=\"*.html\" --include=\"*.json\"</code></pre>\n<h3>Évaluer la gravité</h3>\n<p>Toutes les failles ne se valent pas. On estime : <strong>gravité = probabilité × impact</strong>.</p>\n<table class=\"formula-table\"><tr><th></th><th>Impact faible</th><th>Impact fort</th></tr><tr><td><strong>Probabilité forte</strong> (facile à exploiter)</td><td>à corriger bientôt</td><td><mark>à corriger tout de suite</mark></td></tr><tr><td><strong>Probabilité faible</strong> (difficile à exploiter)</td><td>à noter</td><td>à planifier</td></tr></table>\n<h3>Écrire un rapport de faille</h3>\n<p>Un bon rapport est court, reproductible et utile à celui qui doit corriger :</p>\n<ol><li><strong>Titre</strong> clair (une phrase).</li><li><strong>Gravité</strong> et pourquoi.</li><li><strong>Étapes pour reproduire</strong>, numérotées.</li><li><strong>Impact</strong> : ce qu'un attaquant obtient.</li><li><strong>Correctif proposé</strong>.</li><li><strong>État</strong> : corrigé, vérifié, par qui, quand.</li></ol>\n<p><strong>Exemple (réel, sur BacMaster) :</strong> « Contenu partagé non nettoyé : un compte éditeur peut faire exécuter du code chez tous les lecteurs. Gravité élevée (probabilité moyenne, impact fort : vol de session). Reproduction : créer un chapitre contenant une image piégée, l'ouvrir avec un autre compte. Correctif : nettoyer tout contenu reçu de la synchronisation avant de l'afficher. Corrigé et vérifié avec des charges de test. »</p>\n<div class=\"retenir-box\"><strong>À retenir :</strong> on audite <strong>sa propre</strong> appli ; on part d'un modèle de menace (STRIDE) ; l'OWASP Top 10 donne la liste des familles de failles à vérifier ; chaque test a un <strong>résultat attendu</strong> ; gravité = probabilité × impact ; un rapport = titre, gravité, étapes, impact, correctif.</div>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Associe chaque menace à sa lettre STRIDE : (a) un élève se connecte avec le compte d'un autre ; (b) un lecteur modifie un cours ; (c) un lecteur obtient les droits d'admin.</p>",
   "aide": "Usurpation, altération, élévation de privilèges.",
   "correction": "<p>(a) <strong>S</strong> (Spoofing) ; (b) <strong>T</strong> (Tampering) ; (c) <strong>E</strong> (Elevation of privilege).</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Quelles sont les 3 premières catégories de l'OWASP Top 10 (2021) et laquelle concerne les règles RLS ?</p>",
   "aide": "La première parle des droits d'accès.",
   "correction": "<p>A01 <strong>Contrôle d'accès défaillant</strong>, A02 <strong>Défaillances cryptographiques</strong>, A03 <strong>Injection</strong>. Les règles RLS répondent à <strong>A01</strong> (chacun ne peut faire que ce qui lui est permis).</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Écris le test n°2 de la checklist en détaillant : le compte utilisé, l'action et le résultat attendu.</p>",
   "aide": "Compte lecteur, requête de modification, refus.",
   "correction": "<p><strong>Compte :</strong> un compte au rôle « lecteur » (jamais un admin). <strong>Action :</strong> dans la console, appeler <code>supabase.from(\"chapitres\").update({ contenu: {} }).eq(\"matiere\", \"Maths\")</code>. <strong>Résultat attendu :</strong> la base refuse (erreur ou aucune ligne modifiée) et le cours est inchangé quand on le relit avec un compte éditeur. Si la modification passe, il manque une règle RLS d'écriture.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Classe ces deux failles par priorité en justifiant : (1) la RLS est désactivée sur une table d'exercices accessible à tous ; (2) un en-tête de sécurité secondaire manque sur une page d'aide.</p>",
   "aide": "Probabilité × impact.",
   "correction": "<p>(1) est <strong>prioritaire</strong> : probabilité forte (la clé publique est visible, aucun outil spécial n'est nécessaire) et impact fort (lecture, modification, suppression de tout). (2) est <strong>faible</strong> : impact limité, à noter et à planifier. Gravité = probabilité × impact.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Rédige le rapport complet de la faille suivante : un compte lecteur peut changer son propre rôle en « admin » parce que la règle de la table des profils est <code>using (user_id = auth.uid())</code> sans restriction.</p>",
   "aide": "Titre, gravité, étapes, impact, correctif, état.",
   "correction": "<p><strong>Titre :</strong> élévation de privilèges : un lecteur peut se nommer admin.</p><p><strong>Gravité :</strong> critique (probabilité forte, impact total : gestion des comptes, modification de tous les cours).</p><p><strong>Reproduction :</strong> 1) se connecter avec un compte lecteur ; 2) dans la console, appeler <code>supabase.from(\"profils\").update({ role: \"admin\" }).eq(\"user_id\", monId)</code> ; 3) recharger : l'interface d'administration apparaît.</p><p><strong>Impact :</strong> prise de contrôle de l'application par n'importe quel compte.</p><p><strong>Correctif :</strong> réserver la modification de la table des profils aux admins (<code>using (est_admin())</code>) et vérifier que le nouveau rôle appartient à la liste permise (<code>with check</code>) ; interdire toute règle « chacun modifie sa ligne » sur la colonne <code>role</code>.</p><p><strong>État :</strong> à corriger puis à vérifier en rejouant l'étape 2 (refus attendu).</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Que sont les 4 questions d'un modèle de menace ?",
   "a": "Que protège-t-on ? Contre qui ? Par où peut-il entrer ? Quel serait l'impact ?"
  },
  {
   "q": "Que signifie STRIDE ?",
   "a": "Spoofing (usurpation), Tampering (altération), Repudiation (déni), Information disclosure (fuite), Denial of service (indisponibilité), Elevation of privilege (élévation de privilèges)."
  },
  {
   "q": "Qu'est-ce que l'OWASP Top 10 ?",
   "a": "La liste (éditée par l'OWASP) des 10 catégories de failles les plus fréquentes dans les applications web."
  },
  {
   "q": "Quelle est la catégorie n°1 de l'OWASP Top 10 (2021) ?",
   "a": "A01 : Broken Access Control (contrôle d'accès défaillant)."
  },
  {
   "q": "Quelle catégorie OWASP regroupe la XSS et l'injection SQL ?",
   "a": "A03 : Injection."
  },
  {
   "q": "Quelle catégorie OWASP couvre la RLS oubliée ou les inscriptions ouvertes par défaut ?",
   "a": "A05 : Security Misconfiguration (mauvaise configuration)."
  },
  {
   "q": "À quoi correspond A06 dans l'OWASP Top 10 ?",
   "a": "Composants vulnérables ou obsolètes : bibliothèques et dépendances."
  },
  {
   "q": "Que vérifie-t-on avec les dépendances (A08) ?",
   "a": "L'intégrité de ce qu'on charge : versions épinglées, SRI, contenu reçu vérifié."
  },
  {
   "q": "À quoi sert un journal d'audit ?",
   "a": "À savoir qui a fait quoi et quand (A09 : journalisation), pour détecter et comprendre un incident."
  },
  {
   "q": "Comment calcule-t-on la gravité d'une faille ?",
   "a": "Gravité = probabilité (facilité d'exploitation) × impact ; forte et forte = à corriger tout de suite."
  },
  {
   "q": "Que doit contenir un rapport de faille ?",
   "a": "Un titre, la gravité, les étapes pour reproduire, l'impact, le correctif proposé et l'état."
  },
  {
   "q": "Quel test montre qu'une table est ouverte à tout le monde ?",
   "a": "Appeler l'API avec la clé publique, sans être connecté : si des données sortent ou si l'écriture passe, la RLS manque."
  },
  {
   "q": "Comment vérifier que la RLS est active partout ?",
   "a": "<code>select tablename, rowsecurity from pg_tables where schemaname = 'public'</code> : <code>rowsecurity</code> doit valoir <code>true</code> pour chaque table."
  },
  {
   "q": "Comment chercher une clé oubliée dans un projet ?",
   "a": "Avec <code>grep -ri service_role .</code> (et d'autres mots comme <code>secret</code>, <code>password</code>, <code>BEGIN PRIVATE KEY</code>)."
  },
  {
   "q": "Dans quel cadre peut-on tester la sécurité d'une application ?",
   "a": "Uniquement sur sa propre application ou avec l'autorisation écrite du propriétaire : sinon c'est une infraction pénale."
  }
 ]
}
});

/* ===== Ajout du 23/11/2026 : nouveaux chapitres ===== */
Object.assign(PREBUILT["Cybersécurité"], {
 "Défense — lire des logs, repérer une intrusion & réagir (blue team)": {
 "cours": "<div class=\"attention-box\"><strong>Cadre légal :</strong> tu analyses <mark>tes propres journaux</mark> ou ceux d'un système que tu administres. Les adresses IP de ce cours sont des adresses d'exemple (réservées à la documentation).</div><p>En cybersécurité, il y a l'<strong>équipe rouge</strong> (qui attaque pour tester) et l'<strong>équipe bleue</strong> (qui défend, surveille, réagit). Le travail de la <em>blue team</em> commence presque toujours par la même chose : <mark>lire les journaux (logs)</mark>.</p><h3>1. Un log, c'est quoi ?</h3><p>Un journal est un fichier où un programme note <strong>ce qui s'est passé, quand, qui et d'où</strong>. Où les trouver :</p><table class=\"formula-table\"><tr><th>Système</th><th>Où</th></tr><tr><td>Linux (SSH, connexions)</td><td><code>/var/log/auth.log</code> (Debian/Ubuntu) ou <code>journalctl -u ssh</code></td></tr><tr><td>Serveur web</td><td><code>access.log</code> (chaque requête) et <code>error.log</code></td></tr><tr><td>Windows</td><td>Observateur d'événements : <strong>4625</strong> = échec de connexion, <strong>4624</strong> = connexion réussie</td></tr></table><h3>2. Repérer une attaque par force brute</h3><p>Voici un extrait d'<code>auth.log</code> :</p><pre><code>Nov 23 03:12:41 srv sshd[1201]: Failed password for invalid user admin from 203.0.113.50 port 51120 ssh2\nNov 23 03:12:43 srv sshd[1201]: Failed password for invalid user admin from 203.0.113.50 port 51122 ssh2\nNov 23 03:12:45 srv sshd[1203]: Failed password for invalid user test from 203.0.113.50 port 51130 ssh2\nNov 23 03:12:47 srv sshd[1203]: Failed password for root from 203.0.113.50 port 51134 ssh2\nNov 23 03:12:50 srv sshd[1205]: Failed password for root from 203.0.113.50 port 51140 ssh2\nNov 23 03:12:52 srv sshd[1205]: Failed password for root from 203.0.113.50 port 51146 ssh2\nNov 23 07:55:10 srv sshd[1410]: Failed password for martin from 198.51.100.7 port 40022 ssh2\nNov 23 07:55:19 srv sshd[1410]: Accepted password for martin from 198.51.100.7 port 40026 ssh2\nNov 23 09:30:02 srv sshd[1522]: Failed password for invalid user oracle from 192.0.2.99 port 33010 ssh2\nNov 23 22:41:05 srv sshd[1790]: Accepted password for martin from 203.0.113.50 port 52001 ssh2</code></pre><p>Trois commandes suffisent (reprends le chapitre « Linux & terminal ») :</p><pre><code>$ grep -c \"Failed password\" auth.log\n8\n$ awk '/Failed password/ {print $(NF-3)}' auth.log | sort | uniq -c | sort -rn\n      6 203.0.113.50\n      1 198.51.100.7\n      1 192.0.2.99\n$ grep \"Failed password\" auth.log | sed -E 's/.*Failed password for (invalid user )?([^ ]+) from.*/\\2/' | sort | uniq -c | sort -rn\n      3 root\n      2 admin\n      1 test\n      1 oracle\n      1 martin</code></pre><p>Lecture : <code>203.0.113.50</code> a essayé <strong>6 mots de passe en 11 secondes</strong> sur des comptes classiques (<code>admin</code>, <code>root</code>, <code>test</code>) : c'est une <strong>attaque par force brute</strong> automatisée. L'IP <code>198.51.100.7</code>, elle, montre une simple faute de frappe de Martin suivie d'un succès.</p><div class=\"retenir-box\"><strong>Le détail qui change tout :</strong> à 22 h 41, la <mark>même IP</mark> <code>203.0.113.50</code> obtient un <strong>« Accepted password for martin »</strong>. Une IP qui martèle des comptes puis réussit sur un vrai compte = <mark>compromission probable</mark>. Ce n'est plus un incident « à surveiller », c'est un incident <strong>à traiter tout de suite</strong>.</div><h3>3. Repérer des sondes sur un site web</h3><pre><code>203.0.113.50 - - [23/Nov/2026:03:20:02 +0100] \"GET /.env HTTP/1.1\" 404 153\n203.0.113.50 - - [23/Nov/2026:03:20:03 +0100] \"GET /wp-login.php HTTP/1.1\" 404 153\n203.0.113.50 - - [23/Nov/2026:03:20:04 +0100] \"GET /index.php?id=1%20UNION%20SELECT%20password%20FROM%20users HTTP/1.1\" 404 153\n192.0.2.99   - - [23/Nov/2026:09:10:00 +0100] \"GET /../../etc/passwd HTTP/1.1\" 400 150\n\n$ grep -Ei \"union.*select|\\.\\./|\\.env|wp-login\" access.log | awk '{print $1, $7}'</code></pre><p>Indices d'une sonde : beaucoup de <code>404</code> venant d'une même IP, des chemins qui n'existent pas sur ton site (<code>wp-login.php</code> sans WordPress), la recherche de fichiers secrets (<code>.env</code>), du <code>../</code> (<em>path traversal</em>) ou du <code>UNION SELECT</code> (<em>injection SQL</em>). Ici les 404 et le 400 montrent que les tentatives ont <strong>échoué</strong> — mais elles prouvent que quelqu'un cherche des failles.</p><h3>4. Automatiser une alerte</h3><pre><code>import re, collections\nechecs = collections.defaultdict(list)\nfor ligne in open(\"auth.log\"):\n    m = re.search(r\"(\\d\\d):(\\d\\d):(\\d\\d).*Failed password.* from (\\S+)\", ligne)\n    if m:\n        h, mi, s, ip = int(m[1]), int(m[2]), int(m[3]), m[4]\n        echecs[ip].append(h * 3600 + mi * 60 + s)\n\nfor ip, temps in echecs.items():\n    temps.sort()\n    for i in range(len(temps) - 4):\n        if temps[i + 4] - temps[i] &lt; 60:       # 5 échecs en moins d'une minute\n            print(\"ALERTE force brute probable :\", ip, len(temps), \"échecs\")\n            break</code></pre><p>Résultat : <code>ALERTE force brute probable : 203.0.113.50 6 échecs</code>. Les outils professionnels (<strong>fail2ban</strong>, un <strong>SIEM</strong>) font exactement ça, à grande échelle : collecter les logs, repérer des motifs, alerter ou bloquer.</p><h3>5. Se protéger : les parades</h3><table class=\"formula-table\"><tr><th>Menace</th><th>Parade</th></tr><tr><td>Force brute SSH</td><td>connexion par <strong>clé</strong> uniquement (<code>PasswordAuthentication no</code>), <code>PermitRootLogin no</code>, <strong>fail2ban</strong>, 2FA</td></tr><tr><td>Sondes web</td><td>ne rien exposer d'inutile, mises à jour, limitation de débit (réponse 429), pare-feu applicatif</td></tr><tr><td>Secrets exposés</td><td><code>.env</code> jamais dans le dossier public, droits <code>600</code>, clés régénérées si elles ont fuité</td></tr><tr><td>Logs inutilisables</td><td>horloge synchronisée (NTP), conservation suffisante, copie sur une autre machine</td></tr></table><div class=\"attention-box\"><strong>Ne jamais écrire dans un log</strong> un mot de passe, un jeton ou une clé. Et rappelle-toi qu'une adresse IP est une <strong>donnée personnelle</strong> : on la garde pour la sécurité, pas indéfiniment.</div><h3>6. Réagir : les 6 phases d'un incident</h3><table class=\"formula-table\"><tr><th>Phase</th><th>Question</th><th>Exemple (compte compromis)</th></tr><tr><td>1. Préparation</td><td>Suis-je équipé avant l'incident ?</td><td>logs actifs, sauvegardes, 2FA, liste de contacts</td></tr><tr><td>2. Détection</td><td>Est-ce vraiment un incident ?</td><td>force brute puis connexion réussie de la même IP</td></tr><tr><td>3. Confinement</td><td>Comment stopper l'extension ?</td><td>bloquer l'IP, désactiver le compte, couper la session</td></tr><tr><td>4. Éradication</td><td>Comment supprimer la cause ?</td><td>changer les mots de passe et clés, chercher les accès laissés</td></tr><tr><td>5. Restauration</td><td>Comment revenir à la normale ?</td><td>remettre le service, surveiller de près</td></tr><tr><td>6. Retour d'expérience</td><td>Qu'est-ce qu'on change ?</td><td>clé SSH obligatoire, alerte automatique, procédure écrite</td></tr></table><p>En France, on peut s'appuyer sur l'<strong>ANSSI</strong> et le <strong>CERT-FR</strong> (alertes et bonnes pratiques) et sur <strong>cybermalveillance.gouv.fr</strong> (assistance aux victimes). Les armées ont leurs propres équipes de cyberdéfense : c'est un métier de défense à part entière, très recherché.</p>",
 "exercices": [
  {
   "niveau": "Facile",
   "enonce": "<p>Quelle commande compte le nombre total d'échecs de mot de passe dans <code>auth.log</code> ?</p>",
   "aide": "grep a une option pour compter les lignes trouvées.",
   "correction": "<p><code>grep -c \"Failed password\" auth.log</code> — dans l'extrait : <strong>8</strong>.</p>"
  },
  {
   "niveau": "Facile",
   "enonce": "<p>Un site sans WordPress reçoit des requêtes vers <code>/wp-login.php</code> et <code>/.env</code> qui répondent 404. Faut-il paniquer ? Que faire ?</p>",
   "aide": "Les requêtes ont échoué, mais que prouvent-elles ?",
   "correction": "<p>Pas de panique : le <strong>404</strong> montre que rien n'a été trouvé. Mais cela prouve qu'un robot cherche des failles. Actions : vérifier que le <code>.env</code> n'est pas dans le dossier public, garder le système à jour, éventuellement bloquer l'IP ou limiter le débit.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Dans l'extrait d'<code>auth.log</code>, l'IP <code>198.51.100.7</code> a 1 échec puis 1 succès pour <code>martin</code>, alors que <code>203.0.113.50</code> a aussi un succès pour <code>martin</code>. Lequel des deux succès est inquiétant, et pourquoi ?</p>",
   "aide": "Regarde ce que chaque IP a fait avant de réussir.",
   "correction": "<p>Le second : <code>203.0.113.50</code> a d'abord tenté <strong>6 mots de passe en quelques secondes sur admin/test/root</strong>, puis réussit sur <code>martin</code> des heures plus tard. Le premier succès ressemble à une faute de frappe humaine. Le second suggère un mot de passe deviné ou volé.</p>"
  },
  {
   "niveau": "Moyen",
   "enonce": "<p>Compte compromis confirmé : classe ces actions dans les bonnes phases (confinement, éradication, retour d'expérience) : (a) changer mot de passe et clés, (b) bloquer l'IP et désactiver la session, (c) activer l'authentification par clé obligatoire pour la suite.</p>",
   "aide": "Stopper d'abord, nettoyer ensuite, améliorer à la fin.",
   "correction": "<p>(b) <strong>Confinement</strong> : on stoppe l'extension. (a) <strong>Éradication</strong> : on supprime la cause. (c) <strong>Retour d'expérience</strong> : on corrige la procédure pour que ça ne se reproduise pas.</p>"
  },
  {
   "niveau": "Difficile",
   "enonce": "<p>Modifie le script de détection pour qu'il alerte à partir de <strong>3 échecs en moins de 30 secondes</strong>. Quelles lignes changes-tu ? Quel risque de « faux positif » cela crée-t-il ?</p>",
   "aide": "Deux nombres sont à modifier : le nombre d'échecs (index) et la durée.",
   "correction": "<p>On remplace <code>range(len(temps) - 4)</code> par <code>range(len(temps) - 2)</code>, <code>temps[i + 4]</code> par <code>temps[i + 2]</code>, et <code>&lt; 60</code> par <code>&lt; 30</code>. Un seuil plus bas détecte plus tôt mais crée des <strong>faux positifs</strong> : un utilisateur qui se trompe trois fois de mot de passe peut déclencher l'alerte. Réglage = compromis entre sensibilité et bruit.</p>"
  }
 ],
 "flashcards": [
  {
   "q": "Que fait la <em>blue team</em> ?",
   "a": "Elle défend : surveille, analyse les journaux, détecte et répond aux incidents (la <em>red team</em> attaque pour tester)."
  },
  {
   "q": "Où trouve-t-on les connexions SSH sous Debian/Ubuntu ?",
   "a": "Dans <code>/var/log/auth.log</code> (ou avec <code>journalctl -u ssh</code>)."
  },
  {
   "q": "Quels événements Windows signalent un échec / une réussite de connexion ?",
   "a": "4625 = échec, 4624 = réussite."
  },
  {
   "q": "Qu'est-ce qu'une attaque par force brute ?",
   "a": "Essayer très vite de nombreux mots de passe ou comptes jusqu'à tomber juste."
  },
  {
   "q": "Quel signe fait passer un incident de « à surveiller » à « urgent » ?",
   "a": "Une IP qui a martelé des comptes finit par obtenir une connexion réussie : compromission probable."
  },
  {
   "q": "Que révèlent beaucoup de 404 venant d'une même IP ?",
   "a": "Un balayage : quelqu'un cherche des pages ou des fichiers vulnérables."
  },
  {
   "q": "Que signifie <code>../</code> dans une URL suspecte ?",
   "a": "Une tentative de <em>path traversal</em> : remonter dans l'arborescence pour lire des fichiers (<code>/etc/passwd</code>)."
  },
  {
   "q": "À quoi sert fail2ban ?",
   "a": "À bannir automatiquement une IP après trop d'échecs de connexion."
  },
  {
   "q": "Quelle configuration SSH réduit fortement la force brute ?",
   "a": "Connexion par clé uniquement (<code>PasswordAuthentication no</code>) et <code>PermitRootLogin no</code>."
  },
  {
   "q": "Quelles sont les 6 phases de traitement d'un incident ?",
   "a": "Préparation, détection, confinement, éradication, restauration, retour d'expérience."
  },
  {
   "q": "Que ne faut-il jamais écrire dans un log ?",
   "a": "Mots de passe, jetons, clés secrètes."
  },
  {
   "q": "Pourquoi synchroniser l'horloge des machines (NTP) ?",
   "a": "Pour pouvoir recouper les événements de plusieurs journaux dans le bon ordre."
  },
  {
   "q": "Vers qui se tourner en France pour de l'aide ou des alertes ?",
   "a": "ANSSI / CERT-FR (alertes, bonnes pratiques) et cybermalveillance.gouv.fr (assistance)."
  }
 ]
}
});
