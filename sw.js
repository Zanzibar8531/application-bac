/* ============================================================
   BacMaster — Service Worker
   Stratégie : Cache First pour les assets statiques,
               Network First pour les données dynamiques.
   ============================================================ */

const CACHE_NAME   = 'bacmaster-v2';
const CACHE_STATIC = 'bacmaster-static-v2';

// Fichiers à mettre en cache immédiatement à l'installation
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './data.js',
  './manifest.json',
  // Polices Google (si tu veux les cacher — optionnel, elles ont leur propre cache)
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap',
];

// ── INSTALLATION ─────────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installation…');
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => {
        console.log('[SW] Mise en cache des assets statiques');
        // addAll échoue si un seul fichier plante — on attrape les erreurs individuellement
        return Promise.allSettled(
          STATIC_ASSETS.map(url =>
            cache.add(url).catch(err =>
              console.warn('[SW] Impossible de cacher :', url, err)
            )
          )
        );
      })
      .then(() => self.skipWaiting()) // Activer le nouveau SW immédiatement
  );
});

// ── ACTIVATION ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activation — nettoyage des anciens caches');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_STATIC && key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Suppression ancien cache :', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim()) // Prendre le contrôle de tous les onglets ouverts
  );
});

// ── INTERCEPTION DES REQUÊTES ────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignorer les requêtes non-GET (POST, etc.)
  if (event.request.method !== 'GET') return;

  // Ignorer les requêtes vers des extensions navigateur
  if (url.protocol === 'chrome-extension:') return;

  // ── Stratégie : Cache First (assets statiques locaux) ──
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // ── Stratégie : Network First (CDN externes : MathJax, polices) ──
  if (isCDNRequest(url)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // ── Fallback : Stale While Revalidate (tout le reste) ──
  event.respondWith(staleWhileRevalidate(event.request));
});

// ── HELPERS : Détection du type de requête ───────────────────
function isStaticAsset(url) {
  const localFiles = ['/index.html', '/style.css', '/script.js', '/data.js', '/manifest.json', '/'];
  return url.origin === self.location.origin &&
    (localFiles.some(f => url.pathname.endsWith(f)) || url.pathname.startsWith('/icons/'));
}

function isCDNRequest(url) {
  const cdnDomains = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];
  return cdnDomains.some(d => url.hostname.includes(d));
}

// ── STRATÉGIES DE CACHE ───────────────────────────────────────

// Cache First : sert depuis le cache, réseau en fallback
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return offlineFallback(request);
  }
}

// Network First : réseau en priorité, cache en fallback (hors ligne)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback(request);
  }
}

// Stale While Revalidate : sert le cache, met à jour en arrière-plan
async function staleWhileRevalidate(request) {
  const cache  = await caches.open(CACHE_NAME);
  const cached = await caches.match(request);
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || await fetchPromise || offlineFallback(request);
}

// Page de fallback hors ligne
function offlineFallback(request) {
  if (request.destination === 'document') {
    return caches.match('./index.html');
  }
  return new Response('Hors ligne', { status: 503, statusText: 'Service Unavailable' });
}

// ── MESSAGE : forcer la mise à jour du cache ─────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data === 'CLEAR_CACHE') {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
  }
});
