import React, { useState } from 'react';
import { Play, BookOpen, Clock, CheckCircle2, Award, History, RotateCcw, Shuffle } from 'lucide-react';

export default function StartMenu({
  onStartQuiz,
  onOpenMaterial,
  totalQuestions,
  quizHistory,
  onClearHistory
}) {
  const [name, setName] = useState(() => {
    return localStorage.getItem('bd_user_name') || '';
  });

  const handleStart = (e) => {
    e.preventDefault();
    const finalName = name.trim() || 'Peserta';
    localStorage.setItem('bd_user_name', finalName);
    onStartQuiz(finalName);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs} detik`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="menu-container">
      <div className="menu-card">
        <div className="menu-header">
          <div className="menu-badge-row">
            <span className="category-pill">P7 - P9</span>
            <span className="menu-tag">Big Data UTS Prep</span>
            <span className="menu-tag" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
              <Shuffle size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
              Soal Diacak
            </span>
          </div>
          <h1 className="menu-title">Simulasi & Latihan Kuis Big Data</h1>
          <p className="menu-subtitle">
            Hadoop Architecture, HDFS Storage, YARN Resource Management, & MapReduce Processing Model.
          </p>
        </div>

        <div className="menu-features-grid">
          <div className="feature-item">
            <div className="feature-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Shuffle size={20} />
            </div>
            <div>
              <div className="feature-title">50 Soal Diacak</div>
              <div className="feature-desc">Urutan soal otomatis diacak setiap sesi baru</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrapper" style={{ background: '#ecfdf5', color: '#059669' }}>
              <Award size={20} />
            </div>
            <div>
              <div className="feature-title">Validasi Instan</div>
              <div className="feature-desc">Langsung tahu benar (hijau) atau salah (merah) saat memilih</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Clock size={20} />
            </div>
            <div>
              <div className="feature-title">Stopwatch Otomatis</div>
              <div className="feature-desc">Dimulai dari 00:00 untuk mencatat durasi pengerjaan Anda</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleStart} className="menu-form">
          <div className="form-group">
            <label htmlFor="studentName" className="form-label">
              Nama Lengkap / Panggilan Anda:
            </label>
            <input
              id="studentName"
              type="text"
              className="form-input"
              placeholder="Masukkan nama Anda (misal: Satria Prana)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="menu-cta-buttons">
            <button type="submit" className="btn-start-quiz">
              <Play size={18} fill="currentColor" />
              <span>Mulai Kuis Sekarang</span>
            </button>

            <button
              type="button"
              className="btn-material-alt"
              onClick={onOpenMaterial}
            >
              <BookOpen size={18} />
              <span>Pelajari Dokumen Materi</span>
            </button>
          </div>
        </form>

        {quizHistory && quizHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <History size={16} />
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  Riwayat Percobaan Terakhir
                </span>
              </div>
              <button
                type="button"
                className="btn-clear-history"
                onClick={onClearHistory}
                title="Hapus riwayat"
              >
                Hapus Riwayat
              </button>
            </div>

            <div className="history-list">
              {quizHistory.slice(0, 3).map((item, idx) => (
                <div key={idx} className="history-item">
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                      {item.userName || 'Peserta'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {item.date} • Durasi: {formatDuration(item.duration)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: item.score >= 70 ? '#10b981' : '#ef4444'
                      }}
                    >
                      {item.score} / 100
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Benar: {item.correctCount}/{totalQuestions}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
