import React from 'react';
import { BookOpen, BarChart3, RotateCcw } from 'lucide-react';

export default function Header({
  currentIndex,
  totalQuestions,
  category,
  timeLeft,
  isSubmitted,
  onOpenMaterial,
  onOpenRecap,
  onRestart
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div>
      <div className="top-nav">
        <div className="brand-badge">
          <span className="brand-icon">BD</span>
          <span>Big Data Quiz Engine</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn-doc-link"
            onClick={onOpenMaterial}
            title="Buka Catatan Materi P7-P9"
          >
            <BookOpen size={15} />
            <span>Dokumen Materi</span>
          </button>
          {isSubmitted && (
            <button
              type="button"
              className="btn-doc-link"
              onClick={onOpenRecap}
              title="Lihat Rekapan Nilai"
              style={{ background: '#000000', color: '#ffffff', borderColor: '#000000' }}
            >
              <BarChart3 size={15} />
              <span>Rekapan</span>
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
          <div className={`timer-box ${timeLeft < 180 && !isSubmitted ? 'warning' : ''}`}>
            <span>{formatTime(timeLeft)}</span>
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
