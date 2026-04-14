const CACHE = 'rideprofit-v10';
const ASSETS = [
  '/Filtro-Inteligente/',
  '/Filtro-Inteligente/index.html',
  '/Filtro-Inteligente/manifest.json',
  '/Filtro-Inteligente/icon-192.png',
  '/Filtro-Inteligente/icon-512.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Always fetch fresh from network, fallback to cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
