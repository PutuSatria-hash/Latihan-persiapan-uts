import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption
}) {
  if (!question) return null;

  const isAnswered = selectedOption !== undefined && selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === question.correctAnswer;

  return (
    <div>
      <h2 className="question-title">{question.question}</h2>

      <div className="options-list">
        {question.options.map((optionText, idx) => {
          let btnClass = 'option-btn';

          if (isAnswered) {
            if (idx === question.correctAnswer) {
              // Jawaban yang benar selalu hijau
              btnClass += ' is-correct';
            } else if (idx === selectedOption) {
              // Jika user memilih opsi ini dan salah, beri warna merah
              btnClass += ' is-wrong';
            } else {
              // Opsi lain yang tidak dipilih dan bukan kunci
              btnClass += ' dimmed';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              className={btnClass}
              onClick={() => !isAnswered && onSelectOption(idx)}
              disabled={isAnswered}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span>{optionText}</span>
                {isAnswered && idx === question.correctAnswer && (
                  <CheckCircle2 size={18} color="#059669" />
                )}
                {isAnswered && idx === selectedOption && idx !== question.correctAnswer && (
                  <XCircle size={18} color="#dc2626" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {isAnswered && question.explanation && (
        <div className={`explanation-box ${isCorrect ? 'valid-green' : 'valid-red'}`}>
          <div className="explanation-title" style={{ color: isCorrect ? '#065f46' : '#991b1b' }}>
            {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            <span>{isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah! Pembahasan:'}</span>
          </div>
          <p className="explanation-text">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
