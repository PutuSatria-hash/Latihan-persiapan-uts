import React from 'react';
import { BookOpen, Home, Clock, CheckCircle2 } from 'lucide-react';

export default function Header({
  currentIndex,
  totalQuestions,
  category,
  secondsElapsed,
  isSubmitted,
  onOpenMaterial,
  onReturnMenu,
  onSubmit,
  answeredCount
}) {
  const formatStopwatch = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div>
      <div className="top-nav">
        <button
          type="button"
          className="btn-doc-link"
          onClick={onReturnMenu}
          title="Kembali ke Menu Utama"
        >
          <Home size={15} />
          <span>Menu</span>
        </button>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="btn-doc-link"
            onClick={onOpenMaterial}
            title="Buka Catatan Materi P7-P9"
          >
            <BookOpen size={15} />
            <span>Materi</span>
          </button>
          {!isSubmitted && (
            <button
              type="button"
              className="btn-doc-link"
              onClick={onSubmit}
              title="Submit Kuis dan Lihat Hasil"
              style={{
                background: '#000000',
                color: '#ffffff',
                borderColor: '#000000'
              }}
            >
              <CheckCircle2 size={15} />
              <span>Selesai ({answeredCount}/{totalQuestions})</span>
            </button>
          )}
        </div>
      </div>

      <div className="quiz-header">
        <div className="header-meta">
          <div className="header-left">
            <span className="category-pill">{category || 'P7-P9'}</span>
            <span className="question-counter">
              Soal {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
          <div className="timer-box" title="Waktu Pengerjaan Berjalan">
            <Clock size={16} color="#64748b" />
            <span>{formatStopwatch(secondsElapsed)}</span>
          </div>
        </div>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
