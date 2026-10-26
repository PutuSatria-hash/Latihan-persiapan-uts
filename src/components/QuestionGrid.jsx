import React from 'react';

export default function QuestionGrid({
  totalQuestions,
  currentIndex,
  answers,
  questions,
  isSubmitted,
  onSelectIndex
}) {
  return (
    <div className="grid-container">
      {Array.from({ length: totalQuestions }, (_, i) => {
        const questionNumber = i + 1;
        const isCurrent = i === currentIndex;
        const userAnswer = answers[i];
        const isAnswered = userAnswer !== undefined && userAnswer !== null;

        let cellClass = 'grid-cell';

        if (isCurrent) {
          cellClass += ' active';
        }

        if (isSubmitted) {
          if (!isAnswered) {
            cellClass += ' review-skipped';
          } else if (userAnswer === questions[i]?.correctAnswer) {
            cellClass += ' review-correct';
          } else {
            cellClass += ' review-wrong';
          }
        } else if (isAnswered) {
          cellClass += ' answered';
        }

        return (
          <div
            key={i}
            className={cellClass}
            onClick={() => onSelectIndex(i)}
            role="button"
            tabIndex={0}
            title={`Lompat ke Soal ${questionNumber}`}
          >
            {questionNumber}
          </div>
        );
      })}
    </div>
  );
}
