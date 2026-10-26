import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { questions } from './data/questions';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import Navigation from './components/Navigation';
import QuestionGrid from './components/QuestionGrid';
import RecapModal from './components/RecapModal';
import MaterialModal from './components/MaterialModal';

const DEFAULT_TIME = 3600; // 60 menit

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('bd_current_index');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('bd_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [isSubmitted, setIsSubmitted] = useState(() => {
    return localStorage.getItem('bd_submitted') === 'true';
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('bd_time_left');
    return saved ? parseInt(saved, 10) : DEFAULT_TIME;
  });

  const [isRecapOpen, setIsRecapOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  // Sync state ke localStorage
  useEffect(() => {
    localStorage.setItem('bd_current_index', currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('bd_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('bd_submitted', isSubmitted.toString());
  }, [isSubmitted]);

  useEffect(() => {
    localStorage.setItem('bd_time_left', timeLeft.toString());
  }, [timeLeft]);

  // Countdown Timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    setIsRecapOpen(true);

    // Hitung score
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);

    // Selebrasi jika nilai >= 70
    if (score >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback jika confetti gagal
      }
    }
  }, [answers]);

  const handleRestart = () => {
    const confirmReset = window.confirm(
      'Apakah Anda yakin ingin mengulang kuis dari awal? Semua jawaban akan direset.'
    );
    if (!confirmReset) return;

    localStorage.removeItem('bd_answers');
    localStorage.removeItem('bd_submitted');
    localStorage.removeItem('bd_current_index');
    localStorage.removeItem('bd_time_left');

    setAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(DEFAULT_TIME);
    setIsRecapOpen(false);
  };

  // Keyboard Navigation (Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isRecapOpen || isMaterialOpen) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (['1', '2', '3', '4'].includes(e.key) && !isSubmitted) {
        handleSelectOption(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isSubmitted, isRecapOpen, isMaterialOpen]);

  const currentQuestion = questions[currentIndex];

  return (
    <main className="app-container">
      <div className="quiz-card">
        <Header
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          category={currentQuestion?.category || 'P7-P9'}
          timeLeft={timeLeft}
          isSubmitted={isSubmitted}
          onOpenMaterial={() => setIsMaterialOpen(true)}
          onOpenRecap={() => setIsRecapOpen(true)}
          onRestart={handleRestart}
        />

        <QuestionCard
          question={currentQuestion}
          selectedOption={answers[currentIndex]}
          onSelectOption={handleSelectOption}
          isSubmitted={isSubmitted}
        />

        <Navigation
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitted={isSubmitted}
          onOpenRecap={() => setIsRecapOpen(true)}
        />

        <QuestionGrid
          totalQuestions={questions.length}
          currentIndex={currentIndex}
          answers={answers}
          questions={questions}
          isSubmitted={isSubmitted}
          onSelectIndex={(idx) => setCurrentIndex(idx)}
        />
      </div>

      <RecapModal
        isOpen={isRecapOpen}
        onClose={() => setIsRecapOpen(false)}
        questions={questions}
        answers={answers}
        onRestart={handleRestart}
        onSelectIndex={(idx) => setCurrentIndex(idx)}
      />

      <MaterialModal
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
      />
    </main>
  );
}
