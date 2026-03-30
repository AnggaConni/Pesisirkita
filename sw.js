const CACHE_NAME = 'pesisirkita-v3'; // Versi cache dinaikkan untuk memaksa update

// Daftar aset inti yang WAJIB ada (perhatikan huruf besar/kecil!)
const CORE_ASSETS = [
  '/Pesisirkita/',
  '/Pesisirkita/index.html',
  '/Pesisirkita/manifest.json',
  '/Pesisirkita/favicon.png'
];

// 1. INSTALL: Pendekatan Toleran Error (Fault Tolerant)
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Memaksa SW baru untuk segera aktif
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Kita cache satu per satu. 
      // Jika ada 1 file gagal/tidak ditemukan (404), file lain tetap berhasil di-cache.
      for (let asset of CORE_ASSETS) {
        try {
          await cache.add(asset);
          console.log('[SW] Berhasil cache:', asset);
        } catch (error) {
          console.error('[SW] Gagal cache (diabaikan agar proses lanjut):', asset, error);
        }
      }
    })
  );
});

// 2. ACTIVATE: Membersihkan sisa cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Menghapus cache lama:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH: Stale-While-Revalidate & Dynamic Caching
self.addEventListener('fetch', (event) => {
  // Hanya proses request GET (abaikan POST/API request)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Jika file ada di cache, langsung kembalikan (sangat cepat & offline)
      if (cachedResponse) {
        return cachedResponse;
      }

      // Jika tidak ada di cache, ambil dari internet (Network)
      return fetch(event.request)
        .then((networkResponse) => {
          // Dynamic Caching: Simpan file baru ini ke cache untuk kunjungan berikutnya
          // Berguna untuk gambar atau script tambahan yang tidak ditulis di CORE_ASSETS
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // JIKA OFFLINE TOTAL dan file tidak ada di cache:
          // Jika user mencoba membuka halaman HTML baru, arahkan ke halaman utama
          if (event.request.mode === 'navigate') {
            return caches.match('/Pesisirkita/index.html');
          }
        });
    })
  );
});
