import React from 'react';
import { X, RotateCcw, Award, CheckCircle2, XCircle, Clock, AlertCircle, ArrowRight, Home } from 'lucide-react';

export default function RecapModal({
  isOpen,
  onClose,
  questions,
  answers,
  durationSeconds,
  userName,
  onRestart,
  onReturnMenu,
  onSelectIndex
}) {
  if (!isOpen) return null;

  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const wrongIndices = [];
  const correctIndices = [];

  questions.forEach((q, i) => {
    const userAns = answers[i];
    if (userAns === undefined || userAns === null) {
      skippedCount++;
      wrongIndices.push(i);
    } else if (userAns === q.correctAnswer) {
      correctCount++;
      correctIndices.push(i);
    } else {
      wrongCount++;
      wrongIndices.push(i);
    }
  });

  const total = questions.length;
  const score = Math.round((correctCount / total) * 100);
  const isPassed = score >= 70;

  const formatDetailedDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs} Detik`;
    return `${mins} Menit ${remainingSecs} Detik`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={26} color={isPassed ? '#10b981' : '#f59e0b'} />
            <div>
              <h3 className="modal-title">Rekapan Hasil Ujian Big Data</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Peserta: <strong>{userName || 'Peserta'}</strong>
              </div>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Highlight Waktu Pengerjaan */}
        <div className="duration-banner">
          <Clock size={18} color="#2563eb" />
          <span>Waktu Pengerjaan: <strong>{formatDetailedDuration(durationSeconds)}</strong></span>
        </div>

        {/* 4 Stats Cards */}
        <div className="stats-grid-4">
          <div className="stat-card">
            <div className="stat-value score">{score}</div>
            <div className="stat-label">Nilai Akhir (100)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value correct">{correctCount} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ {total}</span></div>
            <div className="stat-label">Jawaban Benar</div>
          </div>
          <div className="stat-card">
            <div className="stat-value wrong">{wrongCount} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ {total}</span></div>
            <div className="stat-label">Jawaban Salah</div>
          </div>
          <div className="stat-card">
            <div className="stat-value skipped">{skippedCount}</div>
            <div className="stat-label">Belum Terjawab</div>
          </div>
        </div>

        <div className={`recap-feedback ${isPassed ? 'passed' : 'failed'}`}>
          <h4>{isPassed ? 'Selamat, Anda Berhasil Lulus!' : 'Hasil Belum Mencapai Target (70)'}</h4>
          <p>
            {isPassed
              ? `Penguasaan materi P7-P9 Anda sangat bagus dengan total ${correctCount} soal benar dari ${total} soal (${score}% akurasi) dalam waktu ${formatDetailedDuration(durationSeconds)}.`
              : `Anda menjawab ${correctCount} benar dan ${wrongCount + skippedCount} salah/kosong dari ${total} soal (${score}% akurasi). Silakan tinjau kembali soal-soal di bawah dan pelajari dokumen materi.`}
          </p>
        </div>

        {wrongIndices.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                fontSize: '0.86rem',
                fontWeight: '700',
                color: '#475569',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <AlertCircle size={15} color="#ef4444" />
              <span>Daftar Nomor Soal yang Salah / Kosong:</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {wrongIndices.map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelectIndex(idx);
                    onClose();
                  }}
                  className="btn-wrong-number"
                  title={`Klik untuk mereview Soal #${idx + 1}`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="recap-actions-stacked">
          <button
            type="button"
            className="btn-primary-action"
            onClick={onClose}
          >
            <span>Review Pembahasan Soal</span>
            <ArrowRight size={16} />
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-secondary-action"
              style={{ flex: 1 }}
              onClick={onRestart}
            >
              <RotateCcw size={16} />
              <span>Ulangi Kuis</span>
            </button>
            <button
              type="button"
              className="btn-secondary-action"
              style={{ flex: 1 }}
              onClick={onReturnMenu}
            >
              <Home size={16} />
              <span>Menu Utama</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
