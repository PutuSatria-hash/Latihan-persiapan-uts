import React from 'react';

export default function Navigation({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
  isSubmitted,
  onOpenRecap
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
        Kembali
      </button>

      <div>
        {!isSubmitted ? (
          isLast ? (
            <button
              type="button"
              className="btn-nav btn-submit"
              onClick={onSubmit}
            >
              Selesai Ujian
            </button>
          ) : (
            <button
              type="button"
              className="btn-nav btn-next"
              onClick={onNext}
            >
              Lanjut
            </button>
          )
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            {!isLast && (
              <button
                type="button"
                className="btn-nav btn-next"
                onClick={onNext}
              >
                Lanjut
              </button>
            )}
            <button
              type="button"
              className="btn-nav btn-submit"
              onClick={onOpenRecap}
            >
              Rekapan Hasil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
