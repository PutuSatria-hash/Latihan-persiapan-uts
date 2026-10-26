import React from 'react';
import { CheckCircle2, HelpCircle } from 'lucide-react';

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  isSubmitted
}) {
  if (!question) return null;

  return (
    <div>
      <h2 className="question-title">{question.question}</h2>

      <div className="options-list">
        {question.options.map((optionText, idx) => {
          let btnClass = 'option-btn';

          if (isSubmitted) {
            if (idx === question.correctAnswer) {
              btnClass += ' is-correct';
            } else if (idx === selectedOption) {
              btnClass += ' is-wrong';
            } else {
              btnClass += ' dimmed';
            }
          } else {
            if (idx === selectedOption) {
              btnClass += ' selected';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              className={btnClass}
              onClick={() => !isSubmitted && onSelectOption(idx)}
              disabled={isSubmitted}
            >
              <span>{optionText}</span>
            </button>
          );
        })}
      </div>

      {isSubmitted && question.explanation && (
        <div className="explanation-box">
          <div className="explanation-title">
            <CheckCircle2 size={16} />
            <span>Pembahasan / Kunci Jawaban:</span>
          </div>
          <p className="explanation-text">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
