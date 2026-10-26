import React from 'react';
import { X, RotateCcw, Award, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function RecapModal({
  isOpen,
  onClose,
  questions,
  answers,
  onRestart,
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color={isPassed ? '#10b981' : '#f59e0b'} />
            <h3 className="modal-title">Rekapan Hasil Kuis Big Data</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value score">{score}</div>
            <div className="stat-label">Nilai Akhir (100)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value correct">{correctCount}</div>
            <div className="stat-label">Benar</div>
          </div>
          <div className="stat-card">
            <div className="stat-value wrong">{wrongCount + skippedCount}</div>
            <div className="stat-label">Salah / Kosong</div>
          </div>
        </div>

        <div className="recap-feedback">
          <h4>{isPassed ? 'Selamat, Anda Lulus!' : 'Perlu Pendalaman Materi'}</h4>
          <p>
            {isPassed
              ? `Penguasaan materi P7-P9 Anda sangat solid dengan akurasi ${score}%. Anda telah memahami konsep HDFS, YARN, dan MapReduce dengan sangat baik.`
              : `Akurasi Anda mencapai ${score}%. Direkomendasikan untuk meninjau kembali soal-soal bertanda merah dan mempelajari kembali catatan materi.`}
          </p>
        </div>

        {wrongIndices.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontSize: '0.86rem',
                fontWeight: '700',
                color: '#475569',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <AlertCircle size={15} color="#ef4444" />
              <span>Daftar Soal yang Salah / Belum Terjawab:</span>
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
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #fca5a5',
                    background: '#fef2f2',
                    color: '#991b1b',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                  title={`Klik untuk mereview Soal ${idx + 1}`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="recap-actions">
          <button
            type="button"
            className="btn-secondary-action"
            onClick={onRestart}
          >
            <RotateCcw size={16} />
            <span>Ulangi Kuis</span>
          </button>
          <button
            type="button"
            className="btn-primary-action"
            onClick={onClose}
          >
            <span>Review Jawaban Lengkap</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
