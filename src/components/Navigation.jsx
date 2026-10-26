import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Navigation({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
  isSubmitted,
  onOpenRecap,
  answeredCount
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="navigation-bar">
      <button
        type="button"
        className="btn-nav btn-prev"
        onClick={onPrev}
        disabled={isFirst}
      >
        <ArrowLeft size={16} />
        <span>Kembali</span>
      </button>

      <div style={{ display: 'flex', gap: '8px' }}>
        {!isSubmitted ? (
          <>
            {!isLast ? (
              <button
                type="button"
                className="btn-nav btn-next"
                onClick={onNext}
              >
                <span>Lanjut</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="btn-nav btn-submit"
                onClick={onSubmit}
              >
                <CheckCircle2 size={16} />
                <span>Selesai & Rekap</span>
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            className="btn-nav btn-submit"
            onClick={onOpenRecap}
          >
            <span>Lihat Rekapan Nilai</span>
          </button>
        )}
      </div>
    </div>
  );
}
