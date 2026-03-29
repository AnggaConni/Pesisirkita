# 🌊 PesisirKita - Sistem Operasi Lapangan Cerdas
> Aplikasi web revolusioner (*offline-first*) untuk membantu Generasi Muda dan Relawan Lingkungan mencatat, menganalisa, dan merumuskan solusi pelestarian ekosistem pesisir dan mangrove secara *real-time*.

## 📖 Latar Belakang
Pemantauan dan pelestarian ekosistem pesisir (seperti hutan mangrove) seringkali terkendala oleh sulitnya mencatat data di lapangan yang minim sinyal internet, serta kurangnya pemahaman relawan terhadap data sains yang mereka kumpulkan.

**PesisirKita** hadir sebagai solusi *All-in-One* yang tidak hanya berfungsi sebagai buku catatan digital berbasis GPS dan Pemetaan (GIS), tetapi juga mengedukasi penggunanya melalui gamifikasi dan kalkulator dampak lingkungan secara instan.

## ✨ Fitur Utama (Core Features)

### 🗺️ 1. Pemetaan & Log Geospasial (Offline First)
Catat setiap aksi (Pembersihan Sampah, Penanaman, Observasi Fauna) langsung di lokasi.
- Lacak koordinat GPS otomatis.
- Gambar area sapuan/penanaman (Polygon) langsung di atas Peta Satelit interaktif.
- **Export to GeoJSON** untuk analisis lanjutan di *QGIS/ArcGIS*.
- Simpan foto bukti lapangan secara lokal.

### 🧮 2. Kalkulator Edukasi & Karbon Biru
Mengubah angka kaku menjadi visualisasi yang berdampak secara emosional dan saintifik.
- **Kalkulator Tanam:** Hitung otomatis kebutuhan bibit berdasarkan luas poligon dan jarak tanam.
- **Simulasi Karbon:** Mengkonversi jumlah pohon yang ditanam menjadi Kg CO₂ yang diserap (Setara dengan jarak tempuh motor, nyala AC, dll).
- **Kalkulator Urai Sampah (Kumulatif):** Mengubah berat sampah laut yang dikumpulkan menjadi "Waktu Urai" dan "Generasi Manusia yang Terselamatkan". Tersedia *Fun Fact* di tiap jenis sampah.

### 💡 3. Kanvas Ide Hackathon
Fasilitas *brainstorming* untuk merumuskan solusi permasalahan yang ditemukan di lapangan. Dilengkapi dengan:
- **Random Twist Generator:** Pemantik ide *out-of-the-box* (misal: *"Gimana caranya idemu viral di TikTok?"*).
- **Live Feedback System:** Indikator level ide yang menyala saat pengguna mengetik, memicu rasa kompetitif untuk menulis solusi yang lebih detail.

### 📚 4. Glosarium Interaktif (Flashcard)
Kamus pintar istilah pesisir dengan UI bergaya *Flashcard*. 
- Dilengkapi sistem tag (Flora, Fauna, Ancaman, dll).
- Menampilkan "Istilah Hari Ini" secara acak.
- Menyajikan *Fun Fact* ringan di tiap istilah agar mudah diingat Gen-Z.

### 🖨️ 5. Laporan PDF Cerdas (Auto-Generate)
Satu klik untuk merangkum seluruh data (Log Lapangan, Peta Satelit, Analisa Kalkulator, dan Kanvas Ide) menjadi satu dokumen PDF berdesain *Clean, Modern & Professional* yang siap diserahkan ke Guru/Panitia.

---

## 🛠️ Teknologi yang Digunakan
Aplikasi ini sengaja dibangun seringan mungkin agar dapat berjalan dengan lancar di perangkat *mobile* (HP) relawan di lapangan.

- **HTML5, CSS3, Vanilla JavaScript (ES6)** (Tanpa Framework JS yang berat).
- **Tailwind CSS** (via CDN) - Untuk styling UI yang modern dan responsif.
- **Leaflet.js & Leaflet Draw** - Mesin utama untuk pemetaan (*Mapping*) satelit interaktif dan menggambar poligon area.
- **Turf.js** - Sistem kalkulasi matematis geospasial (menghitung luas Hektar/Meter Persegi dari gambar peta).
- **Phosphor Icons** - Icon ringan dan elegan.
- **LocalStorage API** - Untuk menyimpan data game/laporan secara permanen di browser pengguna (Sistem *Save/Load Game JSON*).

## 🚀 Cara Menjalankan (Instalasi)
Aplikasi ini 100% *Client-Side* (Hanya berjalan di sisi browser). Tidak butuh *database* rumit atau server khusus!

1. **Clone Repository ini:**
   ```bash
   git clone https://github.com/username-kamu/pesisirkita.git

   Buka folder proyek. Klik ganda (Buka) file index.html (atau nama file HTML utama kamu) menggunakan browser modern (Chrome, Edge, Safari, Firefox).
   Selesai! Aplikasi siap digunakan secara offline. (Opsional: Sangat direkomendasikan untuk di-host secara gratis menggunakan GitHub Pages atau Vercel agar bisa langsung diakses lewat HP).

## 🎮 Cara Kerja Sistem "Save Data"
Karena bersifat Offline-First (menyimpan di LocalStorage HP masing-masing), tim menyediakan fitur:
Save Game: Mengunduh seluruh data laporan dan idemu menjadi file .json.
Load Game: Mengunggah file .json tadi ke HP/Laptop teman satu timmu agar datanya pindah.
Load Sample: Menghasilkan dummy data lengkap (Beserta Peta Polygon Graha Indah Balikpapan) untuk keperluan presentasi atau mencoba fitur aplikasi dengan cepat.

## 🤝 Kontribusi
Proyek ini bersifat Open-Source dan dibuat untuk tujuan edukasi pelestarian lingkungan.
Jika kamu menemukan bug atau punya ide upgrade yang keren (misal: integrasi cuaca, dll), silakan buka Issue atau lakukan Pull Request!
Fork proyek ini
Buat Branch Fitur barumu (git checkout -b fitur-keren)
Commit perubahanmu (git commit -m 'Menambahkan fitur keren')
Push ke Branch (git push origin fitur-keren)
Buka sebuah Pull Request
Dibuat dengan ❤️ dan ☕ untuk Lautan Indonesia yang Lebih Bersih.

