const CACHE_NAME = 'pesisirkita-v4';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Menggunakan pendekatan satu per satu agar jika 1 file error, yang lain tetap masuk cache
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => cache.add(url))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
