# 🚀 Kuis Interaktif Big Data (P7 - P9) & Dokumen Materi

Aplikasi web interaktif pembelajaran dan simulasi ujian Big Data (Pertemuan 7 - 9: HDFS, YARN, MapReduce, dan Arsitektur Hadoop). Siap dideploy ke **Vercel** dengan arsitektur Vite + React 18 yang sangat ringan, modular, dan cepat.

---

## 🌟 Fitur Utama
1. **50 Soal Komprehensif P7-P9:**
   - Termasuk soal kalkulasi ruang fisik HDFS untuk berkas 514 MB pada blok 128 MB (sesuai contoh).
   - Meliputi teori HDFS, DataNode, NameNode, Secondary NameNode, QJM, High Availability, YARN, MapReduce lifecycle, Data Locality, Combiner, Partitioner, Shuffle & Sort, dll.
2. **UI/UX Presisi & Modern:**
   - Pill badge `P7-P9`.
   - Countdown timer interaktif.
   - Progress bar pengerjaan.
   - Pilihan A/B/C/D dengan feedback visual (Merah jika salah, Hijau jika benar saat review).
   - Grid nomor soal 1 - 50 interaktif dengan penanda status jawaban.
3. **Mode Review & Pembahasan Mendalam:**
   - Kunci jawaban dan penjelasan teoritis muncul otomatis setelah submit.
4. **Fitur Rekapan Nilai & Selebrasi:**
   - Skor akhir (0 - 100), total benar, total salah/kosong, dan daftar soal yang salah untuk evaluasi cepat.
   - Efek confetti selebrasi jika lulus (skor >= 70).
5. **Dapat Diulang (Reset Kuis):**
   - Tombol "Ulangi Kuis" untuk mereset seluruh jawaban dan timer kembali ke awal.
6. **Dokumen Materi Terintegrasi:**
   - Tombol "Dokumen Materi" di pojok kanan atas untuk membuka modul lengkap P7-P9 tanpa meninggalkan halaman kuis.
7. **Penyimpanan Progres Otomatis (`localStorage`):**
   - Jawaban dan waktu tersimpan otomatis sehingga aman jika halaman di-refresh.

---

## 🛠️ Menjalankan di Lokal (Development)

```bash
# 1. Jalankan development server
npm run dev

# 2. Buka di browser
# http://localhost:3000
```

---

## 🌐 Panduan Deploy ke Vercel (1-Click / GitHub)

Aplikasi ini sudah dilengkapi dengan `vercel.json` dan konfigurasi Vite standar:

### Langkah 1: Push ke GitHub
```bash
git init
git add .
git commit -m "feat: inisialisasi kuis big data p7-p9"
git branch -M main
git remote add origin <LINK_REPO_GITHUB_BOSS>
git push -u origin main
```

### Langkah 2: Hubungkan ke Vercel
1. Buka dashboard [Vercel](https://vercel.com).
2. Klik **"Add New Project"** -> **"Import Git Repository"**.
3. Pilih repositori GitHub yang baru saja di-push.
4. Vercel akan otomatis mendeteksi:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Klik **"Deploy"**.
6. Dalam hitungan detik, aplikasi kuis boss akan online dengan domain `https://nama-project.vercel.app`!
