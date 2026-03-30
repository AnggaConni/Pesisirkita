const CACHE_NAME = 'pesisirkita-v2';

const ASSETS_TO_CACHE = [
  '/Pesisirkita/',
  '/Pesisirkita/index.html',
  '/Pesisirkita/manifest.json',
  '/Pesisirkita/favicon.png'
];

// INSTALL
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .catch(() => caches.match('/Pesisirkita/index.html'));
      })
  );
});
