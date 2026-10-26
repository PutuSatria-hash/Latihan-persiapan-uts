import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { questions } from './data/questions';
import StartMenu from './components/StartMenu';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import Navigation from './components/Navigation';
import QuestionGrid from './components/QuestionGrid';
import RecapModal from './components/RecapModal';
import MaterialModal from './components/MaterialModal';

export default function App() {
  const [viewMode, setViewMode] = useState(() => {
    // Jika ada session kuis yang belum di-submit dan ada jawaban, lanjutkan ke quiz
    const savedSubmitted = localStorage.getItem('bd_submitted');
    const savedAnswers = localStorage.getItem('bd_answers');
    if (savedAnswers && savedSubmitted !== 'true') {
      return 'quiz';
    }
    return 'menu';
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('bd_user_name') || 'Peserta';
  });

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

  // Stopwatch waktu pengerjaan: mulai dari 00:00 dan bertambah terus
  const [secondsElapsed, setSecondsElapsed] = useState(() => {
    const saved = localStorage.getItem('bd_seconds_elapsed');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isRecapOpen, setIsRecapOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  // Riwayat pengerjaan lokal
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('bd_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Sinkronisasi state ke LocalStorage
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
    localStorage.setItem('bd_seconds_elapsed', secondsElapsed.toString());
  }, [secondsElapsed]);

  useEffect(() => {
    localStorage.setItem('bd_history', JSON.stringify(quizHistory));
  }, [quizHistory]);

  // Stopwatch Timer: berjalan terus setiap detik selama dalam mode quiz dan belum disubmit
  useEffect(() => {
    if (viewMode !== 'quiz' || isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [viewMode, isSubmitted]);

  const handleStartQuiz = (name) => {
    setUserName(name);
    // Jika belum pernah mulai atau sudah disubmit sebelumnya, reset untuk pengerjaan baru
    if (isSubmitted || Object.keys(answers).length === 0) {
      setAnswers({});
      setIsSubmitted(false);
      setCurrentIndex(0);
      setSecondsElapsed(0);
    }
    setViewMode('quiz');
  };

  const handleSelectOption = (optionIndex) => {
    // Validasi instan: hanya boleh memilih sekali per soal
    if (answers[currentIndex] !== undefined) return;

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
    const totalAnswered = Object.keys(answers).length;
    if (totalAnswered < questions.length) {
      const confirmSubmit = window.confirm(
        `Anda baru menjawab ${totalAnswered} dari ${questions.length} soal. Apakah Anda yakin ingin menyelesaikan kuis sekarang?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setIsRecapOpen(true);

    // Hitung skor
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);

    // Simpan ke riwayat pengerjaan
    const newEntry = {
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      userName: userName || 'Peserta',
      score,
      correctCount: correct,
      duration: secondsElapsed
    };

    setQuizHistory((prev) => [newEntry, ...prev]);

    // Efek selebrasi jika nilai >= 70
    if (score >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback jika lib canvas bermasalah
      }
    }
  }, [answers, userName, secondsElapsed]);

  const handleRestart = () => {
    const confirmReset = window.confirm(
      'Apakah Anda yakin ingin mengulang kuis dari awal? Jawaban dan waktu akan dimulai kembali dari 00:00.'
    );
    if (!confirmReset) return;

    localStorage.removeItem('bd_answers');
    localStorage.removeItem('bd_submitted');
    localStorage.removeItem('bd_current_index');
    localStorage.removeItem('bd_seconds_elapsed');

    setAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setSecondsElapsed(0);
    setIsRecapOpen(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Hapus seluruh riwayat pengerjaan?')) {
      setQuizHistory([]);
      localStorage.removeItem('bd_history');
    }
  };

  // Keyboard Navigation (Arrow Keys)
  useEffect(() => {
    if (viewMode !== 'quiz') return;

    const handleKeyDown = (e) => {
      if (isRecapOpen || isMaterialOpen) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        handleSelectOption(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, viewMode, isRecapOpen, isMaterialOpen, answers]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <main className="app-container">
      {viewMode === 'menu' ? (
        <StartMenu
          onStartQuiz={handleStartQuiz}
          onOpenMaterial={() => setIsMaterialOpen(true)}
          totalQuestions={questions.length}
          quizHistory={quizHistory}
          onClearHistory={handleClearHistory}
        />
      ) : (
        <div className="quiz-card">
          <Header
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            category={currentQuestion?.category || 'P7-P9'}
            secondsElapsed={secondsElapsed}
            isSubmitted={isSubmitted}
            onOpenMaterial={() => setIsMaterialOpen(true)}
            onReturnMenu={() => setViewMode('menu')}
            onSubmit={handleSubmit}
            answeredCount={answeredCount}
          />

          <QuestionCard
            question={currentQuestion}
            selectedOption={answers[currentIndex]}
            onSelectOption={handleSelectOption}
          />

          <Navigation
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitted={isSubmitted}
            onOpenRecap={() => setIsRecapOpen(true)}
            answeredCount={answeredCount}
          />

          <QuestionGrid
            totalQuestions={questions.length}
            currentIndex={currentIndex}
            answers={answers}
            questions={questions}
            onSelectIndex={(idx) => setCurrentIndex(idx)}
          />
        </div>
      )}

      <RecapModal
        isOpen={isRecapOpen}
        onClose={() => setIsRecapOpen(false)}
        questions={questions}
        answers={answers}
        durationSeconds={secondsElapsed}
        userName={userName}
        onRestart={handleRestart}
        onReturnMenu={() => {
          setIsRecapOpen(false);
          setViewMode('menu');
        }}
        onSelectIndex={(idx) => setCurrentIndex(idx)}
      />

      <MaterialModal
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
      />
    </main>
  );
}
