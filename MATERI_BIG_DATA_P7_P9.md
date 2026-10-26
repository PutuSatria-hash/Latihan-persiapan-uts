# DOKUMEN MATERI LENGKAP: BIG DATA (P7 - P9)
**Topik Utama:** Arsitektur Apache Hadoop, HDFS (Hadoop Distributed File System), YARN (Resource Management), & MapReduce Processing Model.

---

## DAFTAR ISI
1. [MODUL 1: Fondasi Big Data & Evolusi Ekosistem Hadoop](#modul-1-fondasi-big-data--evolusi-ekosistem-hadoop)
2. [MODUL 2: HDFS (Hadoop Distributed File System) Deep-Dive](#modul-2-hdfs-hadoop-distributed-file-system-deep-dive)
3. [MODUL 3: YARN (Yet Another Resource Negotiator)](#modul-3-yarn-yet-another-resource-negotiator)
4. [MODUL 4: Paradigma & Alur Kerja MapReduce](#modul-4-paradigma--alur-kerja-mapreduce)
5. [MODUL 5: Rumus Perhitungan, Studi Kasus Kuis & Best Practices](#modul-5-rumus-perhitungan-studi-kasus-kuis--best-practices)

---

## MODUL 1: FONDASI BIG DATA & EVOLUSI EKOSISTEM HADOOP

### 1.1 Tantangan Big Data (Karakteristik 5V)
* **Volume:** Skala data yang luar biasa masif (terabyte hingga petabyte/exabyte).
* **Velocity:** Kecepatan data dibuat, dialirkan, dan harus diproses (real-time streaming vs batch).
* **Variety:** Keragaman format data (terstruktur, semi-terstruktur seperti JSON/XML, dan tidak terstruktur seperti video, teks, audio).
* **Veracity:** Tingkat akurasi, kualitas, dan kepercayaan data.
* **Value:** Nilai bisnis yang dapat diekstrak dari analisis data tersebut.

### 1.2 Masalah Skalabilitas Tradisional
* **Vertical Scaling (Scale-Up):** Menambah CPU, RAM, atau storage pada satu server tunggal. Memiliki batas fisik perangkat keras dan biaya eksponensial.
* **Horizontal Scaling (Scale-Out):** Menghubungkan banyak komputer komoditas (commodity hardware) ke dalam satu klaster terdistribusi. Ini adalah filosofi utama Big Data.

### 1.3 Sejarah & Google Whitepapers
Apache Hadoop dikembangkan oleh Doug Cutting dan Mike Cafarella terinspirasi oleh dua makalah riset Google:
1. **Google File System (GFS)** (2003) $\rightarrow$ Menginspirasi **HDFS**.
2. **Google MapReduce** (2004) $\rightarrow$ Menginspirasi **Hadoop MapReduce**.

### 1.4 Evolusi Hadoop (Hadoop 1.x vs Hadoop 2.x/3.x)
* **Hadoop 1.x:** 
  * Storage: HDFS.
  * Compute & Cluster Management tergabung erat dalam **MapReduce v1** (JobTracker dan TaskTracker).
  * Bottleneck: JobTracker memegang beban ganda (manajemen sumber daya + pemantauan eksekusi job), menjadikannya *Single Point of Failure (SPOF)* dan membatasi skalabilitas klaster (~4.000 node). Hanya mendukung pekerjaan MapReduce.
* **Hadoop 2.x / 3.x:**
  * Memperkenalkan **YARN** yang memisahkan manajemen sumber daya klaster dari model komputasi.
  * Klaster dapat menjalankan berbagai mesin komputasi secara bersamaan: MapReduce, Apache Spark, Apache Flink, Apache Tez, Apache Storm, dll.
  * Hadoop 3.x memperkenalkan *Erasure Coding* (menghemat penyimpanan hingga 50%), dukungan GPU, dan multiple NameNodes standby.

### 1.5 Arsitektur Big Data: Big Data Stack 7 Lapis
Arsitektur tumpukan Big Data (Big Data Architecture Stack) umumnya dipetakan menjadi 7 lapisan hierarkis dari sumber data mentah hingga konsumsi nilai bisnis:

1. **Lapis 1 - Data Source Layer (Lapisan Sumber Data):**
   * Asal mula data mentah dihasilkan dalam format terstruktur, semi-terstruktur, maupun tidak terstruktur.
   * *Komponen/Contoh:* IoT sensor, database transaksional (MySQL, PostgreSQL), server application logs, media sosial, file telemetry.
2. **Lapis 2 - Data Ingestion Layer (Lapisan Ingesti & Pengumpulan Data):**
   * Bertanggung jawab menarik, memindahkan, dan mengumpulkan data dari berbagai sumber data ke klaster Big Data secara batch maupun real-time streaming.
   * *Komponen/Contoh:* **Apache Kafka** (message streaming broker), **Apache Flume** (log ingestion), **Apache Sqoop** (transfer batch RDBMS ke Hadoop), Apache NiFi.
3. **Lapis 3 - Data Storage Layer (Lapisan Penyimpanan Terdistribusi) [CRITICAL EXAM POINT]:**
   * Menyediakan fondasi penyimpanan data berkapasitas sangat masif, terdistribusi, hemat biaya, dan tahan terhadap kegagalan hardware (*fault-tolerant*).
   * **Posisi Komponen Utama:**
     * **HDFS (Hadoop Distributed File System):** File system terdistribusi untuk berkas skala petabyte dengan akses throughput tinggi berbasis pola *Write-Once-Read-Many (WORM)*.
     * **Apache HBase:** Basis data NoSQL berorientasi kolom (*column-family store*) yang berjalan langsung di atas HDFS untuk melayani kebutuhan baca/tulis acak berkecepatan tinggi secara *real-time* (*low-latency random read/write*).
     * *Teknologi lain:* Apache Cassandra, MongoDB, Amazon S3, Google Cloud Storage.
4. **Lapis 4 - Data Processing & Resource Management Layer (Lapisan Pemrosesan & Komputasi):**
   * Mesin komputasi dan pengatur sumber daya klaster untuk memproses data mentah menjadi data bernilai.
   * *Komponen/Contoh:* **YARN** (cluster resource negotiator), **Hadoop MapReduce** (batch computing), **Apache Spark** (in-memory computing), Apache Flink (event-driven streaming).
5. **Lapis 5 - Data Querying & Analysis Layer (Lapisan Kueri & Analisis):**
   * Abstraksi tingkat tinggi di atas lapisan pemrosesan untuk memudahkan analis melakukan kueri deklaratif (SQL-like) dan machine learning.
   * *Komponen/Contoh:* **Apache Hive** (data warehouse SQL di atas Hadoop), **Apache Impala / Presto / Trino** (interactive SQL query engine), Apache Spark SQL, Apache Pig.
6. **Lapis 6 - Data Governance, Security & Cluster Management Layer (Lapisan Tata Kelola & Keamanan):**
   * Mengatur kebijakan keamanan, otentikasi, otorisasi akses data, audit, katalog metadata, dan koordinasi sinkronisasi node klaster.
   * *Komponen/Contoh:* **Apache Ranger** (kebijakan keamanan & audit), **Apache Atlas** (data governance & data lineage), **Kerberos** (otentikasi terpusat), **Apache ZooKeeper** (koordinasi terdistribusi & failover).
7. **Lapis 7 - Data Visualization & Consumption Layer (Lapisan Konsumsi & Visualisasi):**
   * Lapisan teratas tempat hasil olahan data disajikan kepada end-user bisnis, eksekutif, dan sistem hilir.
   * *Komponen/Contoh:* Tableau, Power BI, Apache Superset, Metabase, dasbor analitik web, dan REST API aplikasi bisnis.

---

## MODUL 2: HDFS (HADOOP DISTRIBUTED FILE SYSTEM) DEEP-DIVE

HDFS dirancang untuk menyimpan dataset yang sangat besar dengan performa *throughput* tinggi, pola akses data *Write-Once-Read-Many (WORM)*, dan toleransi kegagalan perangkat keras (fault-tolerant).

### 2.1 Konsep HDFS Block
Data di HDFS dibagi menjadi segmen-segmen tetap berukuran besar yang disebut **Block**.
* Ukuran default: **128 MB** (Hadoop 2.x/3.x) atau **64 MB** (Hadoop 1.x).
* **Mengapa ukuran blok HDFS sangat besar dibandingkan sistem berkas OS biasa (4 KB)?**
  1. **Meminimalkan Biaya Pencarian (*Seek Time*):** Transfer data besar dapat mendekati kecepatan bandwidth disk.
  2. **Mengurangi Beban Metadata NameNode:** Setiap blok dan lokasinya dicatat di memori (RAM) NameNode. Semakin besar blok, semakin sedikit entri metadata yang perlu ditampung.

#### Perilaku Alokasi Fisik Blok (CRITICAL QUESTION CONCEPT)
Di HDFS, ukuran blok adalah batas maksimum secara logis, **bukan** alokasi disk fisik di muka!
> **Aturan:** Jika berkas berukuran lebih kecil dari ukuran blok HDFS, blok tersebut **HANYA** memakan ruang disk fisik sesuai ukuran aktual berkas tersebut.
* **Contoh:** Berkas berukuran 514 MB dengan ukuran blok 128 MB:
  $$\text{Jumlah blok penuh} = \lfloor 514 / 128 \rfloor = 4 \text{ blok (masing-masing 128 MB)} = 512 \text{ MB}$$
  $$\text{Sisa blok ke-5} = 514 - 512 = 2 \text{ MB}$$
  *Ruang disk fisik yang digunakan untuk blok terakhir adalah **2 MB**, bukan 128 MB!*

---

### 2.2 Komponen Arsitektur HDFS
HDFS beroperasi dengan arsitektur Master-Worker:

```
                  +-----------------------+
                  |  NameNode (Master)    |
                  |  Metadata tersimpan   |
                  |  di RAM (FsImage)     |
                  +-----------+-----------+
                              |
       +----------------------+----------------------+
       | Heartbeats & Block Reports (Metadata Sync)  |
       v                                             v
+---------------+                             +---------------+
|   DataNode    |                             |   DataNode    |
| (Worker Node) |                             | (Worker Node) |
| Simpan Blok   |                             | Simpan Blok   |
+---------------+                             +---------------+
```

#### 1. NameNode (Master Daemon)
* Mengelola namespace sistem berkas: struktur pohon folder, izin akses, dan pemetaan blok ke DataNode.
* Menyimpan semua metadata di **RAM** untuk pembacaan instan.
* Berkas metadata persisten pada disk:
  * **fsimage:** Snapshot keadaan sistem berkas pada suatu titik waktu tertentu.
  * **edits / editlog:** Log transaksi berurutan yang mencatat setiap mutasi (buat berkas, hapus, ubah hak akses) sejak fsimage terakhir dibuat.
* *Karakteristik:* NameNode **tidak** menyimpan data aktual berkas.

#### 2. DataNode (Worker Daemon)
* Menyimpan blok data fisik aktual di filesystem lokal host (misal ext4, xfs).
* Menjalankan instruksi baca/tulis dari klien.
* Mengirimkan:
  * **Heartbeat:** Dikirimkan setiap 3 detik (default). Jika NameNode tidak menerima heartbeat selama 10 menit berturut-turut, DataNode dianggap mati (dead) dan bloknya akan direplikasi ulang.
  * **Block Report:** Dikirimkan secara berkala (default setiap 6 jam) berisi daftar semua blok lokal yang dimilikinya.

#### 3. Secondary NameNode (Bukan Hot Backup / Failover!)
* **Fungsi Utama:** Melakukan proses **Checkpointing**.
* Mendownload `fsimage` dan `edits` dari NameNode, menggabungkannya (merge) menjadi `fsimage.ckpt` baru, lalu mengunggahnya kembali ke NameNode.
* Tujuan: Mencegah berkas `edits` membengkak tak terbatas yang dapat memperlambat waktu restart NameNode.
* **PENTING:** Secondary NameNode **BUKAN** pengganti otomatis jika NameNode mati!

#### 4. HDFS High Availability (HA)
* Untuk mengatasi SPOF pada NameNode, Hadoop 2.x+ menyediakan arsitektur HA:
  * **Active NameNode:** Melayani semua permintaan klien.
  * **Standby NameNode:** Menjaga sinkronisasi metadata secara real-time melalui **Quorum Journal Manager (QJM)** atau shared storage.
  * **ZKFC (ZooKeeper Failover Controller):** Mendeteksi kegagalan Active NameNode dan melakukan failover otomatis ke Standby NameNode tanpa downtime.

---

### 2.3 Mekanisme Replikasi & Rack Awareness

#### Replikasi Blok
* Default **Replication Factor = 3** (setiap blok diduplikasi menjadi 3 salinan).
* Meningkatkan reliabilitas, ketersediaan data, dan memungkinkan penjadwalan komputasi paralel lokal (*data locality*).

#### Aturan Penempatan Replika (*Rack Awareness Strategy*):
1. **Replika ke-1:** Diletakkan pada node yang sama dengan client yang menulis data (jika client di luar klaster, dipilih node secara acak).
2. **Replika ke-2:** Diletakkan pada node di **rak berbeda** (off-rack).
3. **Replika ke-3:** Diletakkan pada node yang berbeda di **rak yang sama dengan replika ke-2**.
4. **Replika selanjutnya (>3):** Diletakkan secara acak di node klaster lain dengan syarat tidak lebih dari 2 replika di rak yang sama.
* *Keuntungan:* Menjaga data tetap selamat meski satu rak listrik/switch jaringan putus total, sambil menghemat bandwidth transfer antar-rak.

---

### 2.4 Alur Baca dan Tulis (Read/Write Workflow)

#### Alur Penulisan Berkas (HDFS Write Pipeline)
1. Klien memanggil `create()` pada objek `DistributedFileSystem`.
2. `DistributedFileSystem` meminta NameNode membuat entri berkas baru di namespace.
3. Klien memanggil `write()`. Berkas dipecah menjadi paket-paket kecil (biasanya 64 KB).
4. NameNode mengembalikan daftar pipeline DataNode (misal DN1, DN2, DN3) untuk blok tersebut.
5. Klien mengalirkan paket data ke DN1. DN1 meneruskannya (*streaming*) ke DN2, dan DN2 meneruskannya ke DN3.
6. DN3 mengirim sinyal ACK balik ke DN2 $\rightarrow$ DN1 $\rightarrow$ Klien.
7. Setelah semua blok ditulis, klien memanggil `close()`. NameNode mengonfirmasi status berkas menjadi *committed*.

#### Alur Pembacaan Berkas (HDFS Read Pipeline)
1. Klien memanggil `open()` pada `DistributedFileSystem`.
2. NameNode mengembalikan daftar lokasi blok beserta DataNode yang memegang salinannya, diurutkan berdasarkan jarak topologi jaringan terdekat (*network proximity*).
3. Klien membaca data langsung dari DataNode terdekat secara paralel tanpa membebani bandwidth NameNode.
4. Jika terjadi error pada satu DataNode, klien beralih ke DataNode cadangan yang memiliki replika blok tersebut.

---

## MODUL 3: YARN (YET ANOTHER RESOURCE NEGOTIATOR)

YARN adalah sistem operasi terdistribusi untuk manajemen sumber daya (CPU, RAM) dan penjadwalan pekerjaan klaster.

### 3.1 Arsitektur Komponen YARN

```
                     +---------------------------+
                     |   ResourceManager (RM)    |
                     |  - Scheduler              |
                     |  - ApplicationsManager    |
                     +-------------+-------------+
                                   |
             +---------------------+---------------------+
             v                                           v
     +---------------+                           +---------------+
     |  NodeManager  |                           |  NodeManager  |
     | (Worker Node) |                           | (Worker Node) |
     |  +----------+ |                           |  +----------+ |
     |  |Container | |                           |  |Container | |
     |  | AppMaster| |                           |  | Task     | |
     |  +----------+ |                           |  +----------+ |
     +---------------+                           +---------------+
```

1. **ResourceManager (RM):**
   * Penguasa tertinggi sumber daya klaster. Terdiri dari 2 sub-komponen:
     * **Scheduler:** Mengalokasikan sumber daya murni berdasarkan kebutuhan resource (CPU/RAM) tanpa memantau status aplikasi. Memiliki beberapa kebijakan: *FIFO Scheduler*, *Capacity Scheduler* (default), dan *Fair Scheduler*.
     * **ApplicationsManager (ASM):** Menerima pengajuan pekerjaan, menegosiasikan container pertama untuk menjalankan *ApplicationMaster*, dan merestart ApplicationMaster jika gagal.
2. **NodeManager (NM):**
   * Daemon yang berjalan di setiap worker node klaster.
   * Melaporkan ketersediaan sumber daya host ke ResourceManager.
   * Meluncurkan dan memantau penggunaan resource di dalam **Container**.
3. **ApplicationMaster (AM):**
   * Instansiasi spesifik untuk setiap aplikasi atau job yang berjalan (satu AM per aplikasi).
   * Meminta container kepada ResourceManager dan bekerja sama dengan NodeManager untuk mengeksekusi tugas.
4. **Container:**
   * Abstraksi alokasi fisik sumber daya (misal: 2 GB RAM + 1 CPU Virtual Core) tempat sebuah task dieksekusi.

---

## MODUL 4: PARADIGMA & ALUR KERJA MAPREDUCE

MapReduce adalah model pemrograman untuk memproses dataset skala petabyte secara paralel pada klaster komputer.

### 4.1 Filosofi "Data Locality"
* *Prinsip:* Memindahkan komputasi ke lokasi data jauh lebih murah daripada memindahkan data berukuran besar ke lokasi komputasi (*Moving computation is cheaper than moving data*).
* **3 Tingkatan Data Locality di Hadoop:**
  1. **Data-local (Node-local):** Komputasi dijalankan tepat di mesin fisik tempat blok data berada (paling cepat, tanpa trafik jaringan).
  2. **Rack-local:** Komputasi dijalankan di mesin berbeda tetapi masih dalam satu rak yang sama (kecepatan switch intra-rak).
  3. **Off-rack (Different rack):** Komputasi dijalankan di luar rak tempat data berada (paling lambat, membebani router/core switch).

---

### 4.2 Tahapan Eksekusi MapReduce Lengkap

```
Input File di HDFS 
      │
      ▼
[InputFormat & InputSplit] (Pembagian logis blok)
      │
      ▼
[RecordReader] (Menghasilkan <K1, V1>, misal: <ByteOffset, LineText>)
      │
      ▼
[MAP Phase] (Fungsi map(k1, v1) menghasilkan <K2, V2>)
      │
      ▼
[Combiner (Opsional)] (Mini-Reducer lokal di node mapper untuk reduksi data)
      │
      ▼
[Partitioner] (Menentukan Reducer tujuan berdasarkan hash key: hash(k2) % numReducer)
      │
      ▼
[SHUFFLE & SORT] (Transfer data via jaringan & pengurutan/pengelompokan berdasarkan Key)
      │
      ▼
[REDUCE Phase] (Fungsi reduce(k2, list<v2>) menghasilkan <K3, V3>)
      │
      ▼
[OutputFormat & RecordWriter] (Menulis berkas output akhir ke part-r-00000 di HDFS)
```

#### Penjelasan Komponen Kunci:
1. **InputSplit vs HDFS Block:**
   * **HDFS Block** adalah pembagian data secara **fisik** (128 MB).
   * **InputSplit** adalah representasi pembagian data secara **logis** yang dihitung oleh `InputFormat`. Satu InputSplit umumnya memetakan ke satu HDFS Block dan dieksekusi oleh tepat **1 tugas Mapper**.
2. **Combiner (Mini-Reducer):**
   * Berfungsi melakukan pra-agregasi lokal pada output mapper sebelum data dikirimkan lewat jaringan (*network*).
   * Menurunkan bandwidth jaringan pada fase Shuffle.
   * *Syarat:* Operasi harus bersifat komutatif dan asosiatif (misal: Penjumlahan/Count aman, tetapi Rata-rata/Average tidak bisa langsung menggunakan Combiner tanpa trik count+sum).
3. **Partitioner:**
   * Mengontrol bagaimana data intermediate `<K2, V2>` didistribusikan ke masing-masing Reducer.
   * Default implementasi: `HashPartitioner`, rumus: `(key.hashCode() & Integer.MAX_VALUE) % numReduceTasks`.
   * Menjamin bahwa semua nilai dengan Key yang sama selalu masuk ke Reducer yang sama.
4. **Fase Shuffle and Sort:**
   * **Shuffle:** Proses mengunduh partisi data dari seluruh Mapper node ke memori/disk Reducer melalui HTTP.
   * **Sort / Merge:** Menggabungkan dan mengurutkan kunci-kunci yang sama sehingga Reducer menerima format input `<K2, Iterable<V2>>`.

---

## MODUL 5: RUMUS PERHITUNGAN, STUDI KASUS KUIS & BEST PRACTICES

### 5.1 Tabel Rumus Penting HDFS & MapReduce

| Parameter | Rumus / Penjelasan | Contoh Kasus |
|---|---|---|
| **Alokasi Fisik Blok Terakhir** | $\text{Ukuran Fisik} = \text{Ukuran Berkas} \pmod{\text{Ukuran Blok}}$ jika bersisa | Berkas 514 MB, blok 128 MB $\rightarrow 514 \pmod{128} = \mathbf{2\text{ MB}}$ |
| **Total Blok yang Dibutuhkan** | $N = \lceil \text{Ukuran Berkas} / \text{Ukuran Blok} \rceil$ | Berkas 514 MB, blok 128 MB $\rightarrow \lceil 514/128 \rceil = \mathbf{5\text{ blok}}$ |
| **Total Penyimpanan dengan Replikasi** | $\text{Total Storage} = \text{Ukuran Berkas} \times \text{Replication Factor}$ | Berkas 100 GB, RF = 3 $\rightarrow 100 \times 3 = \mathbf{300\text{ GB}}$ |
| **Jumlah Mapper Default** | $\text{Jumlah Mapper} = \text{Total InputSplit}$ | File 1024 MB, blok 128 MB $\rightarrow 1024 / 128 = \mathbf{8\text{ Mapper}}$ |
| **Reducer Destination** | $\text{ID Reducer} = \text{hash}(\text{key}) \pmod{\text{numReducers}}$ | Key "Hadoop", numReducers = 4 |

### 5.2 Pertanyaan Jebakan yang Sering Muncul pada Kuis P7-P9
1. **Apakah Secondary NameNode mengambil alih tugas NameNode ketika NameNode crash?**
   * *Jawaban:* **SALAH / TIDAK**. Secondary NameNode hanyalah pembantu checkpointing. Pengambilalihan otomatis hanya ada pada konfigurasi High Availability (HA) dengan *Standby NameNode*.
2. **Jika kita menyimpan 1000 berkas berukuran 1 KB di HDFS dengan blok 128 MB, apakah klaster efisien?**
   * *Jawaban:* **SANGAT TIDAK EFISIEN (Small Files Problem)**. Setiap berkas kecil menghasilkan 1 blok metadata di memori NameNode (~150 bytes per metadata objek). Ribuan file kecil akan menghabiskan RAM NameNode tanpa memanfaatkan kapasitas data disk.
3. **Apakah Combiner selalu dijalankan oleh Hadoop?**
   * *Jawaban:* **TIDAK DIJAMIN**. Hadoop memperlakukan Combiner sebagai optimasi opsional; Hadoop berhak melewatinya jika sumber daya kritis.
4. **Berapa ukuran ruang cakram fisik blok terakhir untuk file 514 MB pada blok 128 MB?**
   * *Jawaban:* **2 MB**. (4 blok pertama masing-masing 128 MB = 512 MB, blok ke-5 berisi 2 MB data aktual dan hanya memakai 2 MB fisik disk).

---
*Dokumen ini dirancang sebagai acuan penguasaan konsep, persiapan ujian, dan landasan materi bank soal kuis interaktif Big Data.*
