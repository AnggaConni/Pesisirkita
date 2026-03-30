const CACHE_NAME = 'pesisirkita-v5'; // Naikkan versi jika ada update besar

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// INSTALL: Caching aset inti
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => cache.add(url))
      );
    })
  );
});

// ACTIVATE: Bersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)));
    })
  );
  self.clients.claim();
});

// FETCH: Strategi "Cache First, then Network" + Dynamic Caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Jika ada di cache, langsung berikan (cepat & offline)
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Jika tidak ada, ambil dari internet
      return fetch(event.request).then((networkResponse) => {
        // Jangan simpan jika responnya tidak valid atau bukan dari situs kita
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Simpan file baru ini ke cache secara otomatis (Dynamic Caching)
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // 3. JIKA OFFLINE TOTAL dan file tidak ada di cache:
        // Berikan fallback ke index.html jika yang diminta adalah halaman
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
