import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { questions as rawQuestions } from './data/questions';
import StartMenu from './components/StartMenu';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import Navigation from './components/Navigation';
import QuestionGrid from './components/QuestionGrid';
import RecapModal from './components/RecapModal';
import MaterialModal from './components/MaterialModal';

const MODULE_QUOTAS = {
  HDFS_STORAGE: 15,
  CALCULATIONS: 10,
  YARN_ARCHITECTURE: 10,
  MAPREDUCE_COMPUTING: 15
};

const OPTION_PREFIXES = ['A. ', 'B. ', 'C. ', 'D. '];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Opsi B: Proportional Stratified Sampling
// Mengambil tepat 50 soal berimbang dari 250 bank soal (15 HDFS, 10 Kalkulasi, 10 YARN, 15 MapReduce)
// + Mengacak posisi 4 pilihan jawaban A/B/C/D di setiap soal (Dual Shuffle)
function sampleAndShuffleStratified(allQuestions) {
  const byModule = {
    HDFS_STORAGE: [],
    CALCULATIONS: [],
    YARN_ARCHITECTURE: [],
    MAPREDUCE_COMPUTING: []
  };

  allQuestions.forEach((q) => {
    const mod = q.module || 'HDFS_STORAGE';
    if (byModule[mod]) {
      byModule[mod].push(q);
    } else {
      byModule.HDFS_STORAGE.push(q);
    }
  });

  let selected50 = [];
  Object.keys(MODULE_QUOTAS).forEach((mod) => {
    const quota = MODULE_QUOTAS[mod];
    const available = shuffleArray(byModule[mod] || []);
    selected50 = selected50.concat(available.slice(0, quota));
  });

  if (selected50.length < 50) {
    const remainingNeeded = 50 - selected50.length;
    const remainingPool = allQuestions.filter((q) => !selected50.some((s) => s.id === q.id));
    selected50 = selected50.concat(shuffleArray(remainingPool).slice(0, remainingNeeded));
  }

  const processedQuestions = selected50.map((q) => {
    const rawOptions = q.options.map((opt) => opt.replace(/^[A-D]\.\s*/, '').trim());
    const correctText = rawOptions[q.correctAnswer];

    const shuffledRaw = shuffleArray(rawOptions);
    const newCorrectAnswer = shuffledRaw.indexOf(correctText);

    const newFormattedOptions = shuffledRaw.map(
      (text, idx) => `${OPTION_PREFIXES[idx]}${text}`
    );

    return {
      ...q,
      options: newFormattedOptions,
      correctAnswer: newCorrectAnswer
    };
  });

  return shuffleArray(processedQuestions);
}

export default function App() {
  const [activeQuestions, setActiveQuestions] = useState(() => {
    const saved = localStorage.getItem('bd_active_questions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback jika json rusak
      }
    }
    return sampleAndShuffleStratified(rawQuestions);
  });

  const [viewMode, setViewMode] = useState(() => {
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
    localStorage.setItem('bd_active_questions', JSON.stringify(activeQuestions));
  }, [activeQuestions]);

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
    // Jika belum pernah mulai atau sudah disubmit sebelumnya, generate urutan acak baru
    if (isSubmitted || Object.keys(answers).length === 0) {
      const newShuffled = sampleAndShuffleStratified(rawQuestions);
      setActiveQuestions(newShuffled);
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
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = useCallback(() => {
    const totalAnswered = Object.keys(answers).length;
    if (totalAnswered < activeQuestions.length) {
      const confirmSubmit = window.confirm(
        `Anda baru menjawab ${totalAnswered} dari ${activeQuestions.length} soal. Apakah Anda yakin ingin menyelesaikan kuis sekarang?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setIsRecapOpen(true);

    // Hitung skor
    let correct = 0;
    activeQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / activeQuestions.length) * 100);

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
  }, [answers, userName, secondsElapsed, activeQuestions]);

  const handleRestart = () => {
    const confirmReset = window.confirm(
      'Apakah Anda yakin ingin mengulang kuis dari awal? Soal akan diacak ulang dan waktu dimulai kembali dari 00:00.'
    );
    if (!confirmReset) return;

    localStorage.removeItem('bd_answers');
    localStorage.removeItem('bd_submitted');
    localStorage.removeItem('bd_current_index');
    localStorage.removeItem('bd_seconds_elapsed');

    // Ambil 50 soal berimbang dari 250 bank soal & acak ganda
    const newShuffled = sampleAndShuffleStratified(rawQuestions);
    setActiveQuestions(newShuffled);
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

  const currentQuestion = activeQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <main className="app-container">
      {viewMode === 'menu' ? (
        <StartMenu
          onStartQuiz={handleStartQuiz}
          onOpenMaterial={() => setIsMaterialOpen(true)}
          totalQuestions={activeQuestions.length}
          quizHistory={quizHistory}
          onClearHistory={handleClearHistory}
        />
      ) : (
        <div className="quiz-card">
          <Header
            currentIndex={currentIndex}
            totalQuestions={activeQuestions.length}
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
            totalQuestions={activeQuestions.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitted={isSubmitted}
            onOpenRecap={() => setIsRecapOpen(true)}
            answeredCount={answeredCount}
          />

          <QuestionGrid
            totalQuestions={activeQuestions.length}
            currentIndex={currentIndex}
            answers={answers}
            questions={activeQuestions}
            onSelectIndex={(idx) => setCurrentIndex(idx)}
          />
        </div>
      )}

      <RecapModal
        isOpen={isRecapOpen}
        onClose={() => setIsRecapOpen(false)}
        questions={activeQuestions}
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
