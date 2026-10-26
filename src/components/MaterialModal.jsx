import React from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';

export default function MaterialModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '780px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={24} color="#18181b" />
            <h3 className="modal-title">Dokumen Materi Lengkap (P7 - P9)</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="material-content">
          <div
            style={{
              padding: '12px 16px',
              background: '#f8fafc',
              borderRadius: '8px',
              borderLeft: '4px solid #18181b',
              marginBottom: '20px'
            }}
          >
            <strong>Topik Utama:</strong> Arsitektur Apache Hadoop, HDFS (Hadoop Distributed File System), YARN (Resource Management), & MapReduce Processing Model.
          </div>

          <h2>MODUL 1: FONDASI BIG DATA & EVOLUSI HADOOP</h2>
          <p>
            <strong>Karakteristik 5V Big Data:</strong> Volume (skala data masif), Velocity (kecepatan alir data), Variety (beragam format terstruktur & tidak terstruktur), Veracity (akurasi dan kualitas data), dan Value (nilai manfaat bisnis).
          </p>
          <p>
            <strong>Vertical Scaling vs Horizontal Scaling:</strong>
            <br />
            - <em>Vertical (Scale-up):</em> Menambah spesifikasi pada satu mesin tunggal (terbatas biaya dan kapasitas hardware).
            <br />
            - <em>Horizontal (Scale-out):</em> Menghubungkan banyak komputer komoditas (commodity hardware) dalam satu klaster terdistribusi (filosofi Hadoop).
          </p>
          <p>
            <strong>Evolusi Hadoop (1.x vs 2.x/3.x):</strong>
            <br />
            Hadoop 1.x memiliki bottleneck pada JobTracker (Single Point of Failure, skalabilitas terbatas ~4.000 node, hanya bisa MapReduce). Hadoop 2.x/3.x memisahkan komputasi dan resource management dengan memperkenalkan <strong>YARN</strong>, sehingga dapat menjalankan Spark, Flink, Storm, dan Tez di atas klaster yang sama.
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '14px 16px',
              margin: '16px 0'
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '15px' }}>
              Arsitektur Big Data: Big Data Stack 7 Lapis
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
              <li><strong>Lapis 1 - Data Source Layer:</strong> IoT, RDBMS, Web Logs, Media Sosial.</li>
              <li><strong>Lapis 2 - Data Ingestion Layer:</strong> Apache Kafka, Apache Flume, Apache Sqoop, NiFi.</li>
              <li>
                <strong style={{ color: '#059669' }}>Lapis 3 - Data Storage Layer (CRITICAL EXAM):</strong>{' '}
                Tempat penyimpanan terdistribusi <strong>HDFS (Distributed File System)</strong> dan{' '}
                <strong>Apache HBase (NoSQL Columnar Database)</strong>.
              </li>
              <li><strong>Lapis 4 - Data Processing Layer:</strong> Hadoop MapReduce, Apache Spark, Apache Flink, YARN.</li>
              <li><strong>Lapis 5 - Data Query & Analysis Layer:</strong> Apache Hive, Apache Impala, Presto, Spark SQL.</li>
              <li><strong>Lapis 6 - Data Governance & Security:</strong> Apache Ranger, Apache Atlas, Apache ZooKeeper, Kerberos.</li>
              <li><strong>Lapis 7 - Data Visualization & Consumption:</strong> Tableau, Power BI, Apache Superset, Web Dashboard.</li>
            </ul>
          </div>

          <h2>MODUL 2: HDFS (HADOOP DISTRIBUTED FILE SYSTEM) DEEP-DIVE</h2>
          <p>
            <strong>Konsep Block Storage:</strong> Ukuran default blok HDFS adalah <strong>128 MB</strong> (atau 64 MB di versi lama). Blok berukuran besar ditujukan untuk meminimalkan <em>seek time</em> harddisk dan mengurangi beban memori RAM pada NameNode.
          </p>
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              padding: '12px',
              borderRadius: '8px',
              margin: '12px 0'
            }}
          >
            <h4 style={{ color: '#166534', marginBottom: '4px' }}>
              Aturan Penting Alokasi Ruang Fisik HDFS:
            </h4>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#14532d' }}>
              Ukuran blok 128 MB adalah batas logis maksimum. Jika ada berkas berukuran <strong>514 MB</strong> dengan blok 128 MB:
              <br />
              - 4 blok pertama = 4 x 128 MB = 512 MB.
              <br />
              - Blok ke-5 = 514 MB - 512 MB = <strong>2 MB</strong>.
              <br />
              Blok terakhir <strong>hanya memakan 2 MB ruang cakram fisik</strong>, bukan 128 MB penuh!
            </p>
          </div>
          <p>
            <strong>Komponen HDFS:</strong>
            <br />
            1. <strong>NameNode (Master):</strong> Menyimpan seluruh metadata sistem berkas di memori (RAM), fsimage (snapshot), dan editlog (transaction log).
            <br />
            2. <strong>DataNode (Worker):</strong> Menyimpan blok fisik aktual di disk lokal, mengirimkan <em>Heartbeat</em> (setiap 3 detik) dan <em>Block Report</em> (setiap 6 jam) ke NameNode.
            <br />
            3. <strong>Secondary NameNode:</strong> <em>Bukan hot standby/failover!</em> Berfungsi melakukan <em>Checkpointing</em> (menggabungkan fsimage dan editlog secara berkala agar tidak membengkak).
            <br />
            4. <strong>High Availability (HA):</strong> Menggunakan Active NameNode, Standby NameNode, ZooKeeper Failover Controller (ZKFC), dan Quorum Journal Manager (QJM).
          </p>
          <p>
            <strong>Strategi Replikasi & Rack Awareness (Default RF = 3):</strong>
            <br />
            - Replika 1: Di node lokal klien.
            <br />
            - Replika 2: Di node pada <strong>rak yang berbeda</strong> (off-rack).
            <br />
            - Replika 3: Di node berbeda pada <strong>rak yang sama dengan replika ke-2</strong>.
          </p>

          <h2>MODUL 3: YARN (YET ANOTHER RESOURCE NEGOTIATOR)</h2>
          <p>
            1. <strong>ResourceManager (RM):</strong> Master pengelola sumber daya klaster, memiliki dua sub-komponen:
            <br />
            - <em>Scheduler:</em> Alokasi murni CPU/RAM (FIFO, Capacity, Fair Scheduler).
            <br />
            - <em>ApplicationsManager (ASM):</em> Mengatur pengajuan aplikasi dan meluncurkan ApplicationMaster.
            <br />
            2. <strong>NodeManager (NM):</strong> Daemon per worker node yang memantau penggunaan resource lokal dan mengelola <em>Container</em>.
            <br />
            3. <strong>ApplicationMaster (AM):</strong> Entitas satu per aplikasi/job yang bernegosiasi resource dengan RM dan berkoordinasi dengan NM.
            <br />
            4. <strong>Container:</strong> Alokasi fisik sumber daya (kombinasi RAM dan vCores) tempat task dijalankan.
          </p>

          <h2>MODUL 4: MAPREDUCE COMPUTING MODEL</h2>
          <p>
            <strong>Filosofi Data Locality:</strong> <em>Moving computation is cheaper than moving data</em>. Komputasi dipindahkan ke node tempat data berada.
            <br />
            Tingkatan: <strong>Node-local &gt; Rack-local &gt; Off-switch</strong>.
          </p>
          <p>
            <strong>Alur Eksekusi MapReduce:</strong>
            <br />
            1. <em>InputSplit:</em> Pemotongan data secara logis (biasanya 1 split = 1 blok HDFS = 1 Mapper task).
            <br />
            2. <em>RecordReader:</em> Menghasilkan pasangan &lt;K1, V1&gt;.
            <br />
            3. <em>Map Phase:</em> Menjalankan fungsi map menghasilkan intermediate &lt;K2, V2&gt;.
            <br />
            4. <em>Combiner:</em> Mini-reducer lokal di node mapper untuk mereduksi volume data jaringan (hanya aman untuk operasi asosiatif & komutatif seperti Sum/Count).
            <br />
            5. <em>Partitioner:</em> Menentukan tujuan Reducer (default: <code>hash(key) % numReduceTasks</code>). Menjamin key yang sama selalu masuk ke Reducer yang sama.
            <br />
            6. <em>Shuffle and Sort:</em> Transfer data melalui jaringan dan pengurutan key secara otomatis.
            <br />
            7. <em>Reduce Phase:</em> Mengagregasi data &lt;K2, List&lt;V2&gt;&gt; menghasilkan output akhir &lt;K3, V3&gt; ke berkas <code>part-r-00000</code> di HDFS.
          </p>

          <h2>MODUL 5: FORMULA PENTING KUIS</h2>
          <ul>
            <li><strong>Sisa Blok Terakhir:</strong> <code>Ukuran Berkas mod Ukuran Blok</code> (jika bersisa).</li>
            <li><strong>Jumlah Blok HDFS:</strong> <code>ceil(Ukuran Berkas / Ukuran Blok)</code>.</li>
            <li><strong>Total Storage Klaster:</strong> <code>Ukuran Berkas x Faktor Replikasi</code>.</li>
            <li><strong>Default Jumlah Mapper:</strong> Sama dengan jumlah InputSplit (jumlah blok berkas input).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
