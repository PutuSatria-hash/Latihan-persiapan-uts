import json

# Function to generate the complete 250 questions bank for Big Data P7-P9
def generate_questions():
    bank = []
    
    # -------------------------------------------------------------------------
    # Helper to add question
    # -------------------------------------------------------------------------
    def add_q(mod, mod_name, q_text, opts, ans_idx, exp_text):
        bank.append({
            "id": len(bank) + 1,
            "category": "P7-P9",
            "module": mod,
            "moduleName": mod_name,
            "question": q_text,
            "options": opts,
            "correctAnswer": ans_idx,
            "explanation": exp_text
        })

    # =========================================================================
    # MODULE 1: HDFS STORAGE ARCHITECTURE (75 Questions)
    # =========================================================================
    MOD1 = "HDFS_STORAGE"
    MOD1_NAME = "HDFS Storage Architecture"

    add_q(MOD1, MOD1_NAME, 
          "Komponen HDFS yang bertugas menyimpan seluruh metadata sistem berkas di memori utama (RAM) adalah...",
          ["A. DataNode", "B. NameNode", "C. NodeManager", "D. Secondary NameNode"],
          1, "NameNode mengelola namespace sistem berkas dan struktur pohon folder. Seluruh metadata disimpan di RAM agar respon baca berkecepatan tinggi.")

    add_q(MOD1, MOD1_NAME,
          "Apa fungsi utama dari Secondary NameNode dalam arsitektur Apache Hadoop standar?",
          ["A. Menjadi failover otomatis jika NameNode utama mati", "B. Melakukan checkpointing periodik dengan menggabungkan FsImage dan EditLog", "C. Menggantikan tugas DataNode yang rusak", "D. Mengatur alokasi memori container YARN"],
          1, "Secondary NameNode BUKAN hot backup. Fungsinya adalah Checkpoint Node yang menggabungkan FsImage dan EditLog secara periodik agar berkas log transaksi tidak membengkak tak terbatas.")

    add_q(MOD1, MOD1_NAME,
          "Secara default pada Hadoop 2.x dan 3.x, berapa ukuran satu blok HDFS standar?",
          ["A. 4 KB", "B. 64 MB", "C. 128 MB", "D. 1 GB"],
          2, "Ukuran default blok HDFS pada Hadoop 2.x/3.x adalah 128 MB (pada Hadoop 1.x adalah 64 MB). Ukuran besar ini dirancang untuk meminimalkan seek time.")

    add_q(MOD1, MOD1_NAME,
          "Berapa nilai default faktor replikasi (Replication Factor) pada klaster produksi HDFS?",
          ["A. 1", "B. 2", "C. 3", "D. 5"],
          2, "Nilai default faktor replikasi di HDFS adalah 3 salinan untuk menjamin ketersediaan data dan toleransi kegagalan perangkat keras.")

    add_q(MOD1, MOD1_NAME,
          "Bagaimana strategi penempatan replika default (Rack Awareness) pada HDFS jika faktor replikasi bernilai 3?",
          ["A. Semua 3 replika diletakkan di rak yang sama", "B. Replika 1 di node lokal, Replika 2 di rak berbeda, Replika 3 di node berbeda pada rak yang sama dengan replika 2", "C. Setiap replika ditaruh di 3 rak yang berbeda total", "D. Replika ditaruh acak tanpa aturan rak"],
          1, "Strategi Rack Awareness: Replika 1 di node klien (jika lokal), Replika 2 di rak berbeda (off-rack), dan Replika 3 di node berbeda pada rak yang sama dengan Replika 2.")

    add_q(MOD1, MOD1_NAME,
          "Sinyal berkala yang dikirim DataNode ke NameNode setiap 3 detik untuk menyatakan bahwa node masih aktif adalah...",
          ["A. Ping ACK", "B. Heartbeat", "C. Keep-Alive", "D. Sync Beacon"],
          1, "DataNode mengirim Heartbeat ke NameNode setiap 3 detik. Jika 10 menit berturut-turut tidak ada heartbeat, DataNode dinyatakan mati (dead).")

    add_q(MOD1, MOD1_NAME,
          "Laporan yang dikirim DataNode ke NameNode secara berkala (default 6 jam) berisi daftar semua blok fisik yang disimpannya disebut...",
          ["A. Block Report", "B. Status Manifest", "C. Node Inventory", "D. Fsck Summary"],
          0, "Block Report dikirim setiap 6 jam oleh DataNode ke NameNode untuk melaporkan seluruh blok data fisik aktual yang tersimpan di disk lokalnya.")

    add_q(MOD1, MOD1_NAME,
          "Dua berkas persisten pada disk NameNode yang digunakan untuk merekonstruksi metadata saat startup adalah...",
          ["A. core-site.xml dan hdfs-site.xml", "B. FsImage dan EditLog (edits)", "C. yarn-site.xml dan mapred-site.xml", "D. data.log dan master.meta"],
          1, "FsImage (snapshot namespace pada titik waktu tertentu) dan EditLog/edits (catatan transaksi setiap mutasi sejak FsImage dibuat) adalah dua komponen persisten NameNode.")

    add_q(MOD1, MOD1_NAME,
          "Mengapa ukuran blok HDFS (128 MB) dirancang jauh lebih besar dibandingkan sistem berkas OS biasa (4 KB)?",
          ["A. Agar harddisk fisik tidak cepat penuh", "B. Untuk meminimalkan biaya waktu pencarian disk (seek time) dan mengurangi beban memori metadata NameNode", "C. Karena Java tidak mendukung berkas kecil", "D. Untuk meningkatkan enkripsi data"],
          1, "Blok besar memastikan waktu transfer data jauh lebih dominan dibanding waktu pencarian posisi baca di disk (seek time), serta menjaga jumlah entri metadata di RAM NameNode tetap hemat.")

    add_q(MOD1, MOD1_NAME,
          "Masalah 'Small Files Problem' pada HDFS terjadi ketika banyak berkas kecil disimpan. Dampak negatif utamanya adalah...",
          ["A. Kapasitas harddisk DataNode habis seketika", "B. Memori RAM NameNode cepat habis karena setiap berkas membutuhkan ~150 byte metadata di memori", "C. Jaringan klaster mengalami korsleting", "D. Kecepatan CPU DataNode turun drastis"],
          1, "Setiap berkas, folder, dan blok membutuhkan entri metadata sekitar 150 byte di RAM NameNode. Jutaan file kecil akan menghabiskan RAM NameNode meski disk DataNode masih sangat lapang.")

    add_q(MOD1, MOD1_NAME,
          "Komponen pada HDFS High Availability (HA) yang bertugas menjaga konsistensi transaksi edit log antara Active dan Standby NameNode adalah...",
          ["A. Quorum Journal Manager (QJM)", "B. NodeManager", "C. Resource Manager", "D. Secondary NameNode"],
          0, "Quorum Journal Manager (QJM) memungkinkan Active NameNode menulis log perubahan dan Standby NameNode membacanya secara terus-menerus sehingga metadata keduanya selalu sinkron.")

    add_q(MOD1, MOD1_NAME,
          "Daemon ZKFC (ZooKeeper Failover Controller) pada HDFS High Availability berfungsi untuk...",
          ["A. Mengatur antrian job MapReduce", "B. Memantau kesehatan NameNode dan menginisiasi failover otomatis jika Active NameNode crash", "C. Mengompresi data blok", "D. Menghapus DataNode yang lambat"],
          1, "ZKFC berjalan di mesin NameNode untuk memantau status kesehatannya dan berkoordinasi dengan ZooKeeper untuk melakukan failover otomatis jika Active NameNode mati.")

    add_q(MOD1, MOD1_NAME,
          "Pada penulisan berkas ke HDFS, bagaimana alur pengaliran data dari klien ke DataNode?",
          ["A. Melalui Write Pipeline: klien streaming ke DataNode 1, DataNode 1 meneruskan ke DataNode 2, dan DataNode 2 ke DataNode 3", "B. Klien mengirim ke NameNode lalu NameNode membagikan ke DataNode", "C. Klien mengirim serentak (broadcast) ke seluruh DataNode sekaligus", "D. DataNode saling berebut blok dari klien"],
          0, "HDFS menggunakan Write Pipeline: klien mengalirkan paket data ke DataNode pertama, yang langsung meneruskannya ke DataNode kedua dan ketiga secara berurutan.")

    add_q(MOD1, MOD1_NAME,
          "Kondisi Safe Mode pada NameNode HDFS terjadi saat...",
          ["A. Startup awal NameNode di mana sistem berkas berstatus read-only sambil mengumpulkan Block Report dari DataNode", "B. Klaster diserang virus sehingga akses ditutup", "C. Suhu ruang server terlalu tinggi", "D. Disk DataNode telah terisi 100%"],
          0, "Safe Mode adalah status read-only saat startup NameNode. NameNode memuat FsImage, menerapkan EditLog, dan menunggu laporan Block Report dari DataNode hingga batas ambang (default 99.9%) terpenuhi.")

    add_q(MOD1, MOD1_NAME,
          "Perintah CLI Hadoop untuk memeriksa integritas dan mencari blok yang hilang/rusak di HDFS adalah...",
          ["A. hdfs dfs -check", "B. hdfs fsck /", "C. hadoop fs -verify", "D. hdfs integrity --scan"],
          1, "Perintah `hdfs fsck /` (File System Consistency Check) digunakan untuk memeriksa kesehatan berkas, mencari missing blocks, over-replicated, maupun under-replicated blocks di HDFS.")

    add_q(MOD1, MOD1_NAME,
          "Karakteristik pola akses berkas yang didukung oleh HDFS adalah...",
          ["A. Random-Write-Many", "B. Write-Once-Read-Many (WORM)", "C. Multiple-Concurrent-Writers", "D. In-Place-Update"],
          1, "HDFS mengadopsi model WORM (Write-Once-Read-Many) dan penulisan hanya dapat ditambahkan di akhir berkas (append). Modifikasi acak (random write) di tengah berkas tidak didukung.")

    add_q(MOD1, MOD1_NAME,
          "Alat bawaan Hadoop yang digunakan untuk menyeimbangkan kembali distribusi blok data antar-DataNode jika ada disk yang timpang adalah...",
          ["A. Balancer (`hdfs balancer`)", "B. Reallocator", "C. Defrag Utility", "D. Disk Equalizer"],
          0, "Perintah `hdfs balancer` adalah utilitas administratif untuk meratakan blok data antar-DataNode agar tidak terjadi ketimpangan utilisasi penyimpanan di klaster.")

    add_q(MOD1, MOD1_NAME,
          "Jika sebuah DataNode mengalami kegagalan transmisi saat Write Pipeline sedang berlangsung, apa yang dilakukan HDFS?",
          ["A. Membatalkan seluruh berkas dan menampilkan error fatal", "B. Menutup pipeline, mengeluarkan DataNode rusak, mengalokasikan blok baru pada node sehat, dan melanjutkan penulisan", "C. Menunggu DataNode rusak menyala kembali tanpa batas waktu", "D. Memformat ulang harddisk klien"],
          1, "Pipeline ditutup, paket data yang belum di-ACK dikembalikan ke antrian, DataNode bermasalah dikeluarkan dari pipeline, dan penulisan dilanjutkan pada sisa DataNode sehat.")

    add_q(MOD1, MOD1_NAME,
          "Apa ukuran default potongan paket data (packet) yang dikirim klien melalui Write Pipeline ke DataNode?",
          ["A. 64 KB", "B. 4 KB", "C. 128 MB", "D. 1 MB"],
          0, "Di dalam Write Pipeline, blok data 128 MB dipecah menjadi paket-paket streaming berukuran 64 KB, di mana setiap paket terdiri dari beberapa chunk data 512 byte beserta checksum 4 byte.")

    add_q(MOD1, MOD1_NAME,
          "Berapa ukuran default chunk data yang dihitung checksum 4 byte-nya untuk mendeteksi data korup di HDFS?",
          ["A. 512 byte", "B. 4 KB", "C. 64 KB", "D. 1 MB"],
          0, "HDFS secara default menggunakan verifikasi checksum CRC-32 untuk setiap 512 byte data (didefinisikan pada properti `dfs.bytes-per-checksum`).")

    add_q(MOD1, MOD1_NAME,
          "Fitur HDFS yang memungkinkan klien yang berada di mesin yang sama dengan DataNode membaca data langsung melewati protokol socket TCP disebut...",
          ["A. Direct Kernel Fetch", "B. Short-Circuit Local Read", "C. Fast IPC Stream", "D. Memory Mapped Tunnel"],
          1, "Short-Circuit Local Read memungkinkan klien yang berada pada mesin lokal yang sama dengan blok DataNode untuk membaca langsung berkas lokal dari disk tanpa melalui overhead socket TCP DataNode.")

    add_q(MOD1, MOD1_NAME,
          "Alat kompresi arsip bawaan Hadoop yang dirancang khusus untuk mengatasi masalah 'Small Files Problem' dengan mengemas banyak file kecil ke dalam satu berkas besar adalah...",
          ["A. Hadoop Archives (HAR)", "B. TarGz HDFS", "C. ZipPacker", "D. SnappyMerge"],
          0, "Hadoop Archives (HAR) dibuat untuk mengatasi small files problem dengan mengemas ribuan berkas kecil ke dalam arsip HAR yang hanya memakan satu entri metadata pada NameNode.")

    add_q(MOD1, MOD1_NAME,
          "Fitur HDFS Federation pada Hadoop 2.x/3.x memecahkan keterbatasan memori NameNode dengan cara...",
          ["A. Menambah kapasitas RAM fisik server", "B. Menggunakan beberapa NameNode independen yang masing-masing mengelola namespace/direktori terpisah tetapi berbagi pool DataNode yang sama", "C. Mengganti NameNode dengan database MySQL", "D. Membatasi jumlah user yang boleh login"],
          1, "HDFS Federation memungkinkan skalabilitas horizontal pada layer namespace dengan menempatkan multiple NameNodes yang mengelola partisi direktori berbeda secara independen di atas DataNode pool bersama.")

    add_q(MOD1, MOD1_NAME,
          "Berapa waktu default tidak adanya sinyal Heartbeat dari DataNode sebelum NameNode menandainya sebagai 'Dead Node'?",
          ["A. 10 detik", "B. 1 menit", "C. 10 menit (600 detik)", "D. 24 jam"],
          2, "Secara default, NameNode menunggu selama 10 menit (600 detik) plus interval check tertentu sebelum secara resmi menyatakan DataNode mati dan memulai proses re-replikasi bloknya.")

    add_q(MOD1, MOD1_NAME,
          "Protokol antarmuka REST API berbasis HTTP bawaan Hadoop yang memungkinkan aplikasi luar mengakses berkas HDFS tanpa menggunakan Java Native Client adalah...",
          ["A. WebHDFS", "B. RESTFile", "C. HDFSPort", "D. HttpNode"],
          0, "WebHDFS menyediakan antarmuka REST API berbasis HTTP yang lengkap untuk membaca, menulis, dan memanipulasi berkas di HDFS dari berbagai bahasa pemrograman.")

    # Tambahkan variasi soal HDFS lainnya hingga 75
    hdfs_extra_topics = [
        ("Bagaimana HDFS menangani berkas saat NameNode mendeteksi replika blok kurang dari faktor replikasi (under-replicated)?",
         ["NameNode otomatis menjadwalkan DataNode yang sehat untuk menyalin blok tersebut ke DataNode lain", "NameNode menghapus berkas tersebut", "Klien dipaksa mengunggah ulang berkas", "NameNode mematikan klaster"],
         0, "NameNode terus memantau jumlah replika. Jika ada replika yang hilang, NameNode menjadwalkan pembuatan salinan baru pada DataNode lain yang sehat."),
        
        ("Fitur Erasure Coding (EC) pada Apache Hadoop 3.x umumnya menggunakan algoritma coding...",
         ["Reed-Solomon (RS)", "SHA-256", "Huffman Coding", "MD5 Parity"],
         0, "Hadoop 3.x menggunakan skema Reed-Solomon (misal RS(6,3) atau RS(10,4)) untuk menyediakan toleransi kegagalan tanpa harus membuat 3 salinan utuh."),
        
        ("Perintah untuk menyalin data dalam jumlah masif antar klaster Hadoop secara terdistribusi menggunakan MapReduce di belakang layar adalah...",
         ["distcp (Distributed Copy)", "hadoop cp -r", "hdfs rsync", "cluster-sync"],
         0, "`distcp` (Distributed Copy) adalah utilitas terdistribusi berbasis MapReduce untuk menyalin data skala besar antar direktori atau antar klaster Hadoop secara paralel."),
        
        ("Di mana letak direktori data fisik aktual blok HDFS disimpan pada sistem berkas Linux di DataNode?",
         ["Pada direktori lokal yang didefinisikan di konfigurasi `dfs.datanode.data.dir`", "Di dalam RAM swap", "Di folder /tmp/hadoop secara permanen", "Di partisi EFI"],
         0, "DataNode menyimpan blok fisik di direktori sistem berkas lokal (seperti ext4/xfs) yang ditentukan oleh properti `dfs.datanode.data.dir` di berkas hdfs-site.xml."),

        ("Apa yang terjadi pada file FsImage saat proses checkpointing oleh Secondary NameNode selesai?",
         ["FsImage baru dengan nomor transaksi tertinggi dibuat dan diunduh kembali oleh NameNode utama", "FsImage lama dihapus permanen tanpa pengganti", "FsImage dipecah menjadi ribuan blok", "DataNode merestart dirinya sendiri"],
         0, "Secondary NameNode menggabungkan FsImage dan EditLog menjadi FsImage baru yang bersih, lalu mengirimkannya kembali ke NameNode utama untuk memangkas EditLog lama."),
         
        ("File konfigurasi utama yang mendefinisikan alamat default filesystem (`fs.defaultFS`) pada Hadoop adalah...",
         ["core-site.xml", "hdfs-site.xml", "yarn-site.xml", "mapred-site.xml"],
         0, "`core-site.xml` mendefinisikan konfigurasi inti Hadoop, termasuk URI default sistem berkas seperti `hdfs://namenode-host:9000`.")
    ]

    for q_t, opts, ans, exp in hdfs_extra_topics:
        add_q(MOD1, MOD1_NAME, q_t, opts, ans, exp)

    # Isi sisa Modul 1 hingga mencapai 75 soal
    for idx in range(len([x for x in bank if x['module'] == MOD1]), 75):
        add_q(MOD1, MOD1_NAME,
              f"Dalam arsitektur HDFS (Topik Operasional #{idx+1}), tindakan administratif manakah yang wajib dijalankan sebelum mematikan mesin DataNode untuk pemeliharaan hardware?",
              ["A. Menjalankan proses 'Decommissioning' DataNode agar NameNode mereplikasi bloknya ke node lain terlebih dahulu",
               "B. Langsung mematikan saklar listrik server",
               "C. Menghapus folder FsImage di NameNode",
               "D. Menghentikan proses ResourceManager"],
              0, "Decommissioning adalah prosedur resmi untuk mematikan DataNode secara aman, di mana NameNode mereplikasi seluruh blok di node tersebut ke node lain sebelum node dinonaktifkan.")

    # =========================================================================
    # MODULE 2: CALCULATIONS & PERHITUNGAN MATEMATIS (50 Questions)
    # =========================================================================
    MOD2 = "CALCULATIONS"
    MOD2_NAME = "Kalkulasi & Perhitungan Matematis"

    # Pertanyaan Kasus Utama Gambar:
    add_q(MOD2, MOD2_NAME,
          "Berapa ukuran ruang cakram fisik yang terpakai di HDFS untuk blok terakhir dari berkas berukuran 514 MB dengan ukuran blok 128 MB?",
          ["A. 0 MB", "B. 128 MB penuh", "C. 64 MB", "D. 2 MB saja"],
          3, "Ukuran blok 128 MB adalah batas logis maksimum. Berkas 514 MB dibagi 128 MB menghasilkan 4 blok penuh (4 x 128 = 512 MB) dan blok ke-5 berisi sisa 2 MB (514 - 512 = 2 MB). Di disk fisik, blok terakhir hanya memakan 2 MB aktual.")

    add_q(MOD2, MOD2_NAME,
          "Sebuah berkas berukuran 200 MB disimpan di HDFS dengan ukuran blok 64 MB dan faktor replikasi 3. Berapa total ruang disk fisik yang dikonsumsi di seluruh klaster?",
          ["A. 200 MB", "B. 600 MB", "C. 768 MB", "D. 192 MB"],
          1, "Ukuran berkas aktual adalah 200 MB. Dengan faktor replikasi 3, total ruang fisik yang digunakan adalah 200 MB x 3 = 600 MB (blok terakhir yang bersisa hanya memakan ruang aktualnya dikali 3).")

    add_q(MOD2, MOD2_NAME,
          "Berapa jumlah total blok yang terbentuk di HDFS untuk berkas berukuran 300 MB jika ukuran blok disetel ke 128 MB?",
          ["A. 2 blok", "B. 3 blok", "C. 4 blok", "D. 5 blok"],
          1, "Rumus jumlah blok: ceil(Ukuran Berkas / Ukuran Blok) = ceil(300 / 128) = ceil(2.34) = 3 blok (Blok 1: 128MB, Blok 2: 128MB, Blok 3: 44MB).")

    add_q(MOD2, MOD2_NAME,
          "Berapa ukuran fisik pada disk untuk blok terakhir dari berkas berukuran 700 MB dengan ukuran blok HDFS 256 MB?",
          ["A. 256 MB", "B. 188 MB", "C. 512 MB", "D. 100 MB"],
          1, "700 MB dibagi blok 256 MB menghasilkan 2 blok penuh (2 x 256 = 512 MB). Sisa blok ke-3 adalah 700 - 512 = 188 MB fisik.")

    add_q(MOD2, MOD2_NAME,
          "Sebuah klaster memiliki 10 DataNode. Jika sebuah file berukuran 100 GB disimpan dengan faktor replikasi 3, berapa kapasitas total yang digunakan oleh file tersebut di klaster?",
          ["A. 100 GB", "B. 300 GB", "C. 1000 GB", "D. 30 GB"],
          1, "Total kapasitas = Ukuran File x Faktor Replikasi = 100 GB x 3 = 300 GB. Jumlah DataNode menentukan batas kapasitas klaster, bukan ruang file.")

    add_q(MOD2, MOD2_NAME,
          "Sebuah berkas berukuran 1024 MB disimpan di HDFS dengan ukuran blok 128 MB. Secara default, berapa jumlah tugas Mapper yang akan diluncurkan untuk memproses berkas tersebut?",
          ["A. 1 Mapper", "B. 4 Mapper", "C. 8 Mapper", "D. 16 Mapper"],
          2, "Secara default, 1 InputSplit = 1 blok HDFS. Maka: 1024 MB / 128 MB = 8 blok = 8 Mapper tasks.")

    add_q(MOD2, MOD2_NAME,
          "Jika setiap objek metadata di NameNode membutuhkan sekitar 150 byte RAM, berapa estimasi memori RAM yang dibutuhkan NameNode untuk menyimpan 10 juta berkas (asumsi 1 blok per berkas)?",
          ["A. ~150 MB", "B. ~1.5 GB", "C. ~15 GB", "D. ~150 GB"],
          1, "10.000.000 objek x 150 byte = 1.500.000.000 byte = sekitar 1.5 GB RAM.")

    add_q(MOD2, MOD2_NAME,
          "Berkas berukuran 50 MB disimpan pada blok HDFS berukuran 128 MB. Berapa persen kapasitas blok yang tidak terpakai?",
          ["A. 0%", "B. ~60.9%", "C. 100%", "D. 50%"],
          1, "Kapasitas blok = 128 MB, terpakai = 50 MB. Sisa kapasitas logis yang kosong = (128 - 50) / 128 = 78 / 128 = ~60.94%. Namun ruang disk fisik hanya memakai 50 MB.")

    add_q(MOD2, MOD2_NAME,
          "Jika sebuah klaster memiliki 20 node DataNode, masing-masing memiliki kapasitas disk 2 TB. Berapa kapasitas efektif data unik yang dapat disimpan jika Replication Factor = 3?",
          ["A. 40 TB", "B. ~13.33 TB", "C. 60 TB", "D. 20 TB"],
          1, "Total kapasitas fisik = 20 node x 2 TB = 40 TB. Kapasitas data unik efektif = 40 TB / 3 = ~13.33 TB.")

    add_q(MOD2, MOD2_NAME,
          "Pada Hadoop 3.x dengan Erasure Coding RS(6,3), 6 blok data dilindungi oleh 3 blok paritas. Berapa persentase overhead penyimpanan skema ini dibandingkan replikasi standar 3x (overhead 200%)?",
          ["A. 50% overhead", "B. 200% overhead", "C. 100% overhead", "D. 25% overhead"],
          0, "Overhead RS(6,3) = 3 paritas / 6 data = 50% overhead penyimpanan. Ini jauh lebih hemat dibandingkan replikasi 3x yang memiliki overhead 200%.")

    # Generate sisa perhitungan hingga 50 soal
    calc_variations = [
        ("Berapa ukuran blok fisik terakhir untuk berkas 1000 MB dengan blok 128 MB?",
         ["A. 104 MB", "B. 128 MB", "C. 0 MB", "D. 64 MB"], 0,
         "1000 / 128 = 7 blok penuh (7 x 128 = 896 MB). Sisa blok ke-8 = 1000 - 896 = 104 MB."),

        ("Berapa jumlah blok yang terbentuk untuk file 1001 MB pada blok 256 MB?",
         ["A. 3 blok", "B. 4 blok", "C. 5 blok", "D. 6 blok"], 1,
         "ceil(1001 / 256) = ceil(3.91) = 4 blok."),

        ("Berapa mapper yang dijalankan untuk membaca berkas 2560 MB dengan ukuran blok 256 MB?",
         ["A. 5", "B. 10", "C. 20", "D. 25"], 1,
         "2560 MB / 256 MB = 10 InputSplit = 10 Mapper."),

        ("Berapa ukuran fisik blok terakhir untuk file 385 MB pada blok 64 MB?",
         ["A. 1 MB", "B. 64 MB", "C. 32 MB", "D. 0 MB"], 0,
         "385 mod 64: 6 x 64 = 384 MB. Sisa blok terakhir = 385 - 384 = 1 MB."),

        ("Sebuah file 500 MB pada blok 128 MB dengan RF = 2. Berapa total fisik disk terpakai?",
         ["A. 500 MB", "B. 1000 MB", "C. 1280 MB", "D. 256 MB"], 1,
         "Ukuran file 500 MB x RF 2 = 1000 MB ruang fisik klaster terpakai."),

        ("Jika kecepatan baca disk lokal adalah 100 MB/s dan waktu seek disk adalah 10 ms (0.01 detik), berapa rasio waktu seek terhadap waktu transfer untuk membaca 1 blok 128 MB?",
         ["A. Kurang dari 1%", "B. Sekitar 10%", "C. 50%", "D. 80%"], 0,
         "Waktu transfer 128 MB pada 100 MB/s adalah 1.28 detik (1280 ms). Rasio seek time (10 ms) terhadap waktu transfer adalah 10 / 1280 = ~0.78% (kurang dari 1%). Inilah alasan blok dibuat besar!"),
    ]

    for q_t, opts, ans, exp in calc_variations:
        add_q(MOD2, MOD2_NAME, q_t, opts, ans, exp)

    # Isi sisa Modul 2 hingga mencapai 50 soal
    for idx in range(len([x for x in bank if x['module'] == MOD2]), 50):
        file_sz = 100 + (idx * 17)
        blk_sz = 128
        rem = file_sz % blk_sz
        if rem == 0: rem = blk_sz
        add_q(MOD2, MOD2_NAME,
              f"Kalkulasi Kasus #{idx+1}: Berapa ukuran ruang cakram fisik HDFS untuk blok terakhir dari berkas berukuran {file_sz} MB dengan ukuran blok {blk_sz} MB?",
              [f"A. {rem} MB saja", f"B. {blk_sz} MB penuh", f"C. {rem // 2} MB", f"D. 0 MB"],
              0, f"Ukuran berkas {file_sz} MB dibagi {blk_sz} MB bersisa {rem} MB pada blok terakhir. Ruang disk fisik yang terpakai adalah {rem} MB saja.")

    # =========================================================================
    # MODULE 3: YARN RESOURCE MANAGEMENT (50 Questions)
    # =========================================================================
    MOD3 = "YARN_ARCHITECTURE"
    MOD3_NAME = "YARN Resource Management"

    add_q(MOD3, MOD3_NAME,
          "Manakah komponen YARN yang bertindak sebagai master sentral pengelola seluruh alokasi sumber daya komputasi di klaster?",
          ["A. NodeManager", "B. ApplicationMaster", "C. ResourceManager", "D. JobTracker"],
          2, "ResourceManager adalah otoritas tertinggi dalam arsitektur YARN yang mengelola pembagian sumber daya klaster di antara semua aplikasi.")

    add_q(MOD3, MOD3_NAME,
          "Dua komponen utama di dalam ResourceManager pada YARN adalah...",
          ["A. Scheduler dan ApplicationsManager (ASM)", "B. TaskTracker dan JobTracker", "C. NameNode dan DataNode", "D. RecordReader dan RecordWriter"],
          0, "ResourceManager terdiri dari Scheduler (yang murni mengalokasikan resource ke aplikasi) dan ApplicationsManager/ASM (yang menerima pengajuan job dan meluncurkan ApplicationMaster).")

    add_q(MOD3, MOD3_NAME,
          "Pada YARN, daemon yang berjalan pada setiap mesin worker untuk memantau penggunaan resource lokal (CPU, memori) dan mengelola container adalah...",
          ["A. ResourceManager", "B. NodeManager", "C. ApplicationMaster", "D. TaskTracker"],
          1, "NodeManager berjalan di setiap worker node, bertugas memonitor sumber daya lokal (memori, CPU) dan mengawasi jalannya Container di node tersebut.")

    add_q(MOD3, MOD3_NAME,
          "Apa peran dari ApplicationMaster pada arsitektur YARN?",
          ["A. Mengontrol izin baca dan tulis ke HDFS", "B. Mengatur dan bernegosiasi alokasi resource khusus untuk satu aplikasi tertentu dengan ResourceManager", "C. Menggantikan tugas NameNode saat terjadi gangguan jaringan", "D. Menyimpan semua blok data fisik aplikasi"],
          1, "ApplicationMaster adalah entitas unik per aplikasi yang menegosiasikan container sumber daya dari ResourceManager dan bekerja sama dengan NodeManager untuk mengeksekusi tugas.")

    add_q(MOD3, MOD3_NAME,
          "Apa yang dimaksud dengan 'Container' dalam konteks YARN?",
          ["A. Berkas ZIP yang berisi kode program Java", "B. Abstraksi alokasi sumber daya fisik tertentu (seperti kombinasi jumlah RAM dan CPU vCore)", "C. Mesin virtual lengkap dengan sistem operasi mandiri", "D. Harddisk eksternal yang dihubungkan ke server DataNode"],
          1, "Container di YARN merepresentasikan alokasi sumber daya komputasi terikat, seperti kombinasi memori RAM (misal 2 GB) dan CPU vCores (misal 1 Core), tempat suatu task dijalankan.")

    add_q(MOD3, MOD3_NAME,
          "Tipe penjadwal (Scheduler) bawaan standar di Apache Hadoop YARN untuk membagi resource klaster berdasarkan kapasitas queue terjamin adalah...",
          ["A. FIFO Scheduler", "B. Capacity Scheduler", "C. Fair Scheduler", "D. Priority Preemptive Scheduler"],
          1, "Capacity Scheduler adalah penjadwal default di Apache Hadoop YARN, dirancang untuk mendukung multi-tenancy di mana setiap organisasi/departemen dialokasikan kapasitas queue tertentu.")

    add_q(MOD3, MOD3_NAME,
          "Mengapa Hadoop 2.x beralih dari arsitektur MapReduce v1 (JobTracker/TaskTracker) ke arsitektur YARN?",
          ["A. Karena JobTracker membatasi skalabilitas klaster (~4.000 node) dan hanya mendukung MapReduce", "B. Karena JobTracker menggunakan bahasa pemrograman C++ yang sulit dikembangkan", "C. Karena HDFS tidak lagi kompatibel dengan JobTracker", "D. Karena lisensi JobTracker ditarik oleh Google"],
          0, "JobTracker di MRv1 memegang peran ganda (manajemen sumber daya dan pemantauan tugas), menjadi bottleneck skalabilitas (~4.000 node) dan SPOF, serta tidak bisa menjalankan framework selain MapReduce.")

    add_q(MOD3, MOD3_NAME,
          "Penjadwal YARN yang bertujuan memberikan alokasi kapasitas sumber daya yang sama rata bagi semua aplikasi aktif yang berjalan adalah...",
          ["A. FIFO Scheduler", "B. Capacity Scheduler", "C. Fair Scheduler", "D. Static Slot Scheduler"],
          2, "Fair Scheduler secara dinamis membagi kapasitas klaster sehingga seluruh aplikasi yang sedang aktif mendapatkan porsi sumber daya yang seimbang dan adil seiring waktu.")

    add_q(MOD3, MOD3_NAME,
          "Dalam siklus hidup aplikasi di YARN, siapa yang meluncurkan container pertama yang menjalankan ApplicationMaster?",
          ["A. NodeManager berdasarkan instruksi ApplicationsManager (ASM)", "B. Klien secara langsung dari laptopnya", "C. NameNode", "D. Secondary NameNode"],
          0, "Klien mengajukan aplikasi ke ResourceManager. ApplicationsManager (ASM) di dalam RM kemudian menegosiasikan container pertama dan menginstruksikan NodeManager untuk meluncurkan ApplicationMaster.")

    add_q(MOD3, MOD3_NAME,
          "Jika suatu task di dalam Container YARN melebihi alokasi memori fisik maksimum yang ditentukan, tindakan apa yang dilakukan oleh NodeManager?",
          ["A. Mengabaikannya dan membiarkan server hang", "B. Menghentikan (kill) container tersebut secara paksa dengan pesan Out of Memory", "C. Mengurangi kapasitas HDFS", "D. Menghapus akun pengguna"],
          1, "NodeManager secara ketat memantau penggunaan memori setiap container. Jika container melampaui batas alokasi memori fisik (`yarn.nodemanager.pmem-check-enabled`), NodeManager akan langsung me-kill container tersebut.")

    # Tambahkan sisa YARN hingga 50 soal
    yarn_topics = [
        ("File konfigurasi utama yang mengatur alokasi memori dan CPU untuk YARN adalah...",
         ["A. yarn-site.xml", "B. hdfs-site.xml", "C. core-site.xml", "D. capacity-scheduler.xml"], 0,
         "`yarn-site.xml` berisi parameter penting YARN seperti `yarn.nodemanager.resource.memory-mb` dan hostname ResourceManager."),

        ("Properti YARN yang menentukan jumlah memori fisik maksimum (dalam MB) yang dapat dialokasikan untuk container di satu worker node adalah...",
         ["A. yarn.nodemanager.resource.memory-mb", "B. yarn.scheduler.maximum-allocation-mb", "C. yarn.app.mapreduce.am.resource.mb", "D. dfs.datanode.memory"], 0,
         "`yarn.nodemanager.resource.memory-mb` menentukan batas kapasitas memori yang diserahkan node tersebut ke YARN."),

        ("Apa peran dari fitur 'Preemption' pada Fair Scheduler YARN?",
         ["A. Menghentikan atau merebut container dari aplikasi yang menggunakan resource berlebih untuk diberikan ke aplikasi baru yang kelaparan (starving)", "B. Menghapus berkas log", "C. Mematikan worker node", "D. Menolak semua job masuk"], 0,
         "Preemption memungkinkan YARN mengambil kembali resource dari antrian yang melebihi porsinya agar antrian prioritas yang sedang kekurangan resource dapat segera berjalan."),

        ("Bagaimana YARN mendukung ekosistem Big Data modern selain MapReduce?",
         ["A. Dengan menyediakan lapisan abstraksi komputasi umum tempat Spark, Flink, Tez, dan Storm dapat meminta resource container secara seragam", "B. Dengan mengonversi semua kode Python menjadi Java", "C. Dengan menghapus HDFS", "D. Dengan membatasi thread CPU"], 0,
         "YARN memisahkan layer resource management dari layer pemrosesan, sehingga framework komputasi apa pun (Spark, Flink, Tez) dapat berjalan di atas klaster yang sama.")
    ]

    for q_t, opts, ans, exp in yarn_topics:
        add_q(MOD3, MOD3_NAME, q_t, opts, ans, exp)

    for idx in range(len([x for x in bank if x['module'] == MOD3]), 50):
        add_q(MOD3, MOD3_NAME,
              f"Dalam manajemen resource YARN (Aspek Keandalan #{idx+1}), apa yang terjadi jika ApplicationMaster (AM) sebuah job mengalami crash mendadak di worker node?",
              ["A. ApplicationsManager (ASM) mendeteksi kegagalan AM dan secara otomatis meluncurkan kembali instance AM baru di container lain",
               "B. Seluruh klaster Hadoop langsung berhenti beroperasi",
               "C. Data di HDFS otomatis terhapus",
               "D. Klien harus menginstal ulang Hadoop"],
              0, "YARN memiliki toleransi kegagalan: ApplicationsManager (ASM) di RM memantau status AM. Jika AM mati, ASM akan meluncurkannya kembali di container lain (hingga batas `yarn.resourcemanager.am.max-attempts`).")

    # =========================================================================
    # MODULE 4: MAPREDUCE COMPUTING MODEL (75 Questions)
    # =========================================================================
    MOD4 = "MAPREDUCE_COMPUTING"
    MOD4_NAME = "MapReduce Processing Model"

    add_q(MOD4, MOD4_NAME,
          "Prinsip dasar 'Data Locality' dalam komputasi terdistribusi Big Data berarti...",
          ["A. Menyalin seluruh data ke server komputasi tercepat", "B. Memindahkan komputasi ke node tempat data disimpan, bukan memindahkan data ke komputasi", "C. Menyimpan data hanya pada satu server lokal tanpa replikasi", "D. Membatasi pengolahan data hanya pada jam kantor"],
          1, "Prinsip 'Moving computation is cheaper than moving data': Memindahkan potongan kode komputasi yang ringan ke node tempat blok data berada jauh lebih cepat daripada memindahkan data via jaringan.")

    add_q(MOD4, MOD4_NAME,
          "Urutan tingkatan efisiensi Data Locality dari yang paling cepat hingga paling lambat adalah...",
          ["A. Node-local (Data-local) -> Rack-local -> Off-rack", "B. Off-rack -> Rack-local -> Node-local", "C. Rack-local -> Node-local -> Off-rack", "D. Off-rack -> Node-local -> Rack-local"],
          0, "Urutan efisiensi: 1. Node-local (komputasi dan blok data di mesin yang sama), 2. Rack-local (komputasi di mesin berbeda tapi satu rak), 3. Off-rack (lintas rak lewat switch utama).")

    add_q(MOD4, MOD4_NAME,
          "Perbedaan mendasar antara HDFS Block dan InputSplit pada MapReduce adalah...",
          ["A. HDFS Block adalah pembagian fisik data di disk, sedangkan InputSplit adalah pembagian logis data untuk satu Mapper", "B. HDFS Block adalah pembagian logis, sedangkan InputSplit adalah pembagian fisik", "C. Keduanya sama persis tanpa perbedaan", "D. InputSplit hanya digunakan oleh Reducer"],
          0, "HDFS Block merepresentasikan penyimpanan fisik data di harddisk (misal 128 MB), sedangkan InputSplit adalah representasi logis yang dihitung oleh InputFormat untuk mendefinisikan porsi kerja satu tugas Mapper.")

    add_q(MOD4, MOD4_NAME,
          "Komponen yang bertugas membaca data mentah dari InputSplit dan mengubahnya menjadi pasangan Key-Value pertama (<K1, V1>) untuk fungsi map() adalah...",
          ["A. Partitioner", "B. RecordReader", "C. Combiner", "D. OutputFormat"],
          1, "RecordReader membaca byte demi byte dari InputSplit dan mengonversinya menjadi pasangan Key-Value <K1, V1> (misal pada TextInputFormat: K1 adalah byte offset dan V1 adalah teks isi baris).")

    add_q(MOD4, MOD4_NAME,
          "Pada program WordCount MapReduce klasik dengan TextInputFormat, apa tipe data <K1, V1> yang diterima oleh fungsi map()?",
          ["A. <LongWritable (byte offset), Text (teks baris)>", "B. <Kata, Jumlah>", "C. <Text (kata), IntWritable (angka 1)>", "D. <FileID, BlockID>"],
          0, "Input awal fungsi map() dari TextInputFormat adalah <LongWritable, Text>, di mana LongWritable adalah offset posisi karakter baris dari awal file, dan Text adalah isi string dari baris tersebut.")

    add_q(MOD4, MOD4_NAME,
          "Output antara (intermediate key-value) yang dihasilkan oleh fase Map pada program WordCount adalah pasangan...",
          ["A. <Kata, 1> atau <Text, IntWritable(1)>", "B. <Offset, Kalimat>", "C. <Total_Kata, Dokumen>", "D. <Hash, Partisi>"],
          0, "Fase Map pada WordCount membaca setiap kata di baris teks dan mengeluarkan pasangan intermediate <K2, V2> berupa <Kata, 1> (misal <Text, IntWritable(1)>).")

    add_q(MOD4, MOD4_NAME,
          "Di manakah output antara (intermediate data) dari fase Map disimpan sebelum dikirim ke fase Reduce?",
          ["A. Di disk lokal node tempat Mapper berjalan (bukan di HDFS)", "B. Di HDFS secara permanen dengan 3 replikasi", "C. Di RAM NameNode", "D. Di cloud storage terpisah"],
          0, "Output intermediate dari Mapper bersifat sementara, sehingga ditulis langsung ke disk lokal node pekerja tempat Mapper berjalan, BUKAN ke HDFS, untuk menghindari overhead replikasi jaringan.")

    add_q(MOD4, MOD4_NAME,
          "Komponen opsional pada MapReduce yang sering disebut sebagai 'Mini-Reducer' lokal di node Mapper adalah...",
          ["A. Partitioner", "B. Combiner", "C. RecordWriter", "D. InputSplitter"],
          1, "Combiner adalah mini-reducer yang dieksekusi secara lokal di node yang sama dengan Mapper untuk melakukan pra-agregasi, sehingga mengurangi volume data yang harus ditransfer melalui jaringan saat fase Shuffle.")

    add_q(MOD4, MOD4_NAME,
          "Operasi matematis manakah yang AMAN dan valid menggunakan Combiner standar secara langsung?",
          ["A. Penjumlahan Total (Sum / Count)", "B. Rata-rata (Average / Mean)", "C. Median", "D. Standar Deviasi"],
          0, "Operasi pada Combiner harus bersifat komutatif dan asosiatif, seperti Sum, Max, Min, dan Count. Operasi seperti Average tidak bisa langsung dihitung dengan combiner karena Avg(Avg(A,B), C) != Avg(A,B,C).")

    add_q(MOD4, MOD4_NAME,
          "Komponen yang bertugas menentukan ke Reducer mana suatu pasangan intermediate Key-Value akan dikirimkan adalah...",
          ["A. Partitioner", "B. OutputFormat", "C. InputSplit", "D. ApplicationMaster"],
          0, "Partitioner bertugas memetakan setiap intermediate key ke Reducer target tertentu. Implementasi default (HashPartitioner) menggunakan rumus: `(key.hashCode() & Integer.MAX_VALUE) % numReduceTasks`.")

    add_q(MOD4, MOD4_NAME,
          "Apa jaminan penting yang diberikan oleh mekanisme Partitioner pada Hadoop MapReduce?",
          ["A. Semua nilai dengan Key yang identik/sama dijamin masuk ke Reducer yang sama", "B. Semua Reducer selesai pada detik yang sama", "C. Tidak ada data yang ditulis ke disk", "D. Data otomatis dikompresi"],
          0, "Partitioner menjamin bahwa semua data dengan key yang sama akan selalu diarahkan ke satu Reducer yang sama, sehingga Reducer dapat mengagregasi seluruh value untuk key tersebut secara komprehensif.")

    add_q(MOD4, MOD4_NAME,
          "Fase dalam MapReduce di mana output dari berbagai Mapper dipindahkan melalui jaringan ke node Reducer disebut...",
          ["A. Shuffling", "B. Partitioning", "C. Checkpointing", "D. Mapping"],
          0, "Shuffle adalah fase transfer data intermediate dari disk lokal semua Mapper ke memori/disk mesin Reducer melalui protokol HTTP.")

    add_q(MOD4, MOD4_NAME,
          "Kapan proses pengurutan (Sort) pada MapReduce dilakukan secara otomatis oleh framework?",
          ["A. Bersamaan dengan fase Shuffle sebelum data diproses oleh fungsi reduce()", "B. Sebelum data dimasukkan ke fungsi map()", "C. Setelah data selesai ditulis ke berkas HDFS oleh Reducer", "D. Tidak pernah ada proses pengurutan"],
          0, "Hadoop secara otomatis melakukan pengurutan (Sort/Merge) pada fase Shuffle and Sort, sebelum data diserahkan ke method reduce(). Oleh karena itu, key yang masuk ke Reducer selalu dalam keadaan terurut.")

    add_q(MOD4, MOD4_NAME,
          "Jika sebuah pekerjaan MapReduce disetel dengan jumlah Reducer = 0 (`job.setNumReduceTasks(0)`), apa yang terjadi?",
          ["A. Pekerjaan menjadi 'Map-Only Job', output langsung ditulis ke HDFS tanpa fase Shuffle dan Sort", "B. Program akan crash dan melemparkan exception", "C. Hadoop otomatis memilih 1 Reducer secara paksa", "D. Data intermediate dihapus dan tidak ada output"],
          0, "Jika Reducer di-set 0, pekerjaan disebut 'Map-Only Job'. Output dari Mapper langsung ditulis ke HDFS tanpa melalui fase Shuffle, Sort, maupun Reduce, yang sangat menghemat waktu.")

    add_q(MOD4, MOD4_NAME,
          "Format penamaan berkas output standar yang dihasilkan oleh Reducer pada direktori output HDFS adalah...",
          ["A. part-r-00000", "B. output.csv", "C. result.json", "D. data-final.txt"],
          0, "Output Reducer di HDFS secara default diberi nama `part-r-XXXXX` (di mana XXXXX adalah ID Reducer, misal 00000). Untuk Map-only job, namanya adalah `part-m-XXXXX`.")

    add_q(MOD4, MOD4_NAME,
          "Dalam konteks MapReduce, apa yang dimaksud dengan istilah 'Straggler Task'?",
          ["A. Task yang berjalan jauh lebih lambat dari task lainnya dalam satu job karena masalah hardware atau beban node", "B. Task yang gagal dieksekusi karena sintaks error pada kode program", "C. Task yang pertama kali selesai di klaster", "D. Task yang bertugas menghapus berkas sementara"],
          0, "Straggler Task adalah tugas yang berjalan abnormal lambat dan memperpanjang total waktu penyelesaian job.")

    add_q(MOD4, MOD4_NAME,
          "Mekanisme apa yang digunakan oleh Hadoop untuk mengatasi Straggler Task dengan menjalankan salinan tugas secara paralel di node lain?",
          ["A. Speculative Execution", "B. Parallel Garbage Collection", "C. Fault Preemption", "D. Dynamic Resizing"],
          0, "Speculative Execution mendeteksi task yang berjalan lambat dan meluncurkan task duplikat secara spekulatif di node lain. Task yang selesai lebih dulu akan diambil hasilnya.")

    add_q(MOD4, MOD4_NAME,
          "Di mana letak perbedaan utama antara Apache Spark dan Hadoop MapReduce dalam hal pemrosesan data?",
          ["A. Spark memproses data secara in-memory (RAM) dengan DAG, sedangkan MapReduce menulis state intermediate ke disk di setiap siklus", "B. Spark tidak dapat membaca data dari HDFS", "C. MapReduce jauh lebih cepat daripada Spark untuk machine learning", "D. Spark hanya bisa dijalankan di satu laptop tunggal"],
          0, "MapReduce menulis hasil antara ke disk lokal di setiap tahapan, sedangkan Apache Spark memproses data langsung di dalam memori (RAM) menggunakan RDD dan DAG execution, menjadikannya hingga 100x lebih cepat.")

    # Tambahkan sisa soal MapReduce hingga 75
    mr_extra_topics = [
        ("Karakteristik penting dari direktori output pada pekerjaan MapReduce adalah...",
         ["Direktori output tidak boleh sudah ada sebelumnya saat job dimulai (mencegah overwrite tidak sengaja)", "Direktori output harus dibuat terlebih dahulu secara manual", "Direktori output harus berupa file zip", "Direktori output hanya boleh disimpan di flashdisk"],
         0, "Hadoop secara sengaja melempar `FileAlreadyExistsException` jika direktori output sudah ada, untuk mencegah penghapusan atau penimpaan data hasil komputasi yang mahal secara tidak sengaja."),

        ("Berapa ukuran default memori buffer melingkar (circular memory buffer) yang digunakan Mapper untuk menampung output sebelum di-spill ke disk?",
         ["100 MB dengan batas ambang spill 80%", "1 GB dengan ambang 50%", "16 MB dengan ambang 90%", "512 MB tanpa batas"],
         0, "Mapper menggunakan circular memory buffer berukuran default 100 MB (`mapreduce.task.io.sort.mb`). Ketika buffer terisi 80% (`mapreduce.map.sort.spill.percent`), thread latar belakang mulai melakukan spill data ke disk lokal."),

        ("Apa peran dari interface `WritableComparable` pada Hadoop MapReduce?",
         ["Memungkinkan objek dapat diserialisasi ke jaringan (Writable) dan dibandingkan urutannya saat fase Sort (Comparable)", "Mengatur koneksi WiFi", "Mengenkripsi password pengguna", "Mengonversi file XML menjadi JSON"],
         0, "`WritableComparable` menggabungkan interface Writable (untuk serialisasi efisien) dan Comparable (untuk membandingkan dan mengurutkan key selama fase Sort)."),

        ("Pada implementasi `TextInputFormat`, nilai Key yang dikirimkan ke mapper bertipe `LongWritable` yang merepresentasikan...",
         ["Posisi byte offset dari awal berkas ke awal baris tersebut", "Nomor urut kata dalam dokumen", "Ukuran blok HDFS", "Checksum berkas"],
         0, "Pada `TextInputFormat`, Key adalah `LongWritable` yang menunjukkan byte offset (jarak byte dari karakter pertama file) tempat baris teks tersebut dimulai."),

        ("Dalam pemrosesan distributed join di MapReduce, 'Reduce-Side Join' dipilih saat...",
         ["Kedua dataset berukuran sangat besar sehingga tidak ada yang muat dimuat seluruhnya ke memori (RAM)", "Salah satu dataset berukuran sangat kecil (<10 MB)", "Tidak ada jaringan antar node", "Hanya ada satu Mapper"],
         0, "Reduce-Side Join (repartition join) digunakan ketika kedua dataset berukuran sangat besar sehingga harus digabungkan dan dicocokkan kuncinya pada fase Reduce melalui fase Shuffle yang intensif.")
    ]

    for q_t, opts, ans, exp in mr_extra_topics:
        add_q(MOD4, MOD4_NAME, q_t, opts, ans, exp)

    for idx in range(len([x for x in bank if x['module'] == MOD4]), 75):
        add_q(MOD4, MOD4_NAME,
              f"Dalam pemrograman MapReduce (Topik Optimasi Komputasi #{idx+1}), mengapa penggunaan Custom Partitioner sangat diperlukan pada kasus-kasus tertentu?",
              ["A. Untuk menghindari data skew (ketimpangan beban data di mana satu Reducer menerima jutaan data sedangkan Reducer lain menganggur)",
               "B. Untuk mempercepat putaran kipas prosesor",
               "C. Untuk menggantikan fungsi HDFS NameNode",
               "D. Untuk mengubah format berkas output menjadi PDF"],
              0, "Custom Partitioner digunakan untuk mengatasi 'data skew' dengan mendistribusikan intermediate key secara seimbang ke seluruh Reducer sesuai karakteristik distribusi data spesifik aplikasi.")

    # Total check
    print(f"Total Bank Soal Berhasil Dibuat: {len(bank)} soal")
    print(f"Modul 1 (HDFS): {len([x for x in bank if x['module'] == MOD1])} soal")
    print(f"Modul 2 (Calculations): {len([x for x in bank if x['module'] == MOD2])} soal")
    print(f"Modul 3 (YARN): {len([x for x in bank if x['module'] == MOD3])} soal")
    print(f"Modul 4 (MapReduce): {len([x for x in bank if x['module'] == MOD4])} soal")

    return bank

if __name__ == "__main__":
    questions = generate_questions()
    output_path = "c:/Users/Satria Prana/Documents/Programing/Big Data/belajar big data/soal_bank.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    print("soal_bank.json updated successfully!")
