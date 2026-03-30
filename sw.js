// ==========================================
// FULL SERVICE WORKER - PESISIRKITA
// ==========================================

const CACHE_NAME = 'pesisirkita-v1';

// Daftar semua file dan library yang wajib di-download agar bisa offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './favicon.png', // Pastikan file logo ini ada di GitHub kamu
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@phosphor-icons/web',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js',
  'https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js'
];

// TAHAP 1: INSTALL (Simpan ke Gudang Cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mengunduh & Menyimpan Cache...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// TAHAP 2: FETCH (Kurir Pengantar saat Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika file ada di laci cache, langsung berikan (Sangat Cepat!)
        if (response) {
          return response;
        }
        // Jika tidak ada di cache, coba cari pakai internet
        return fetch(event.request);
      })
  );
});

// TAHAP 3: ACTIVATE (Bersih-bersih Cache Versi Lama)
self.addEventListener('activate', (event) => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Jika ada nama cache yang tidak sesuai dengan versi saat ini, hapus!
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
