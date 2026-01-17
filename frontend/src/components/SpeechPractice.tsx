import { useState, useEffect } from 'react';
import { Volume2, CheckCircle, XCircle, RotateCcw, Star, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Option {
  text: string;
  emoji: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  keyword: string;
  options: Option[];
}

const allQuestions: Question[] = [
  {
    id: 1,
    question: "Which image shows HAPPY?",
    keyword: "HAPPY",
    options: [
      { text: "Happy", emoji: "😊", isCorrect: true },
      { text: "Sad", emoji: "😢", isCorrect: false },
      { text: "Angry", emoji: "😡", isCorrect: false },
      { text: "Sleepy", emoji: "😴", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "Which image shows a DOG?",
    keyword: "DOG",
    options: [
      { text: "Dog", emoji: "🐶", isCorrect: true },
      { text: "Cat", emoji: "🐱", isCorrect: false },
      { text: "Rabbit", emoji: "🐰", isCorrect: false },
      { text: "Panda", emoji: "🐼", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "Which image is an APPLE?",
    keyword: "APPLE",
    options: [
      { text: "Apple", emoji: "🍎", isCorrect: true },
      { text: "Banana", emoji: "🍌", isCorrect: false },
      { text: "Orange", emoji: "🍊", isCorrect: false },
      { text: "Grapes", emoji: "🍇", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "Which image is RED?",
    keyword: "RED",
    options: [
      { text: "Red circle", emoji: "🔴", isCorrect: true },
      { text: "Blue circle", emoji: "🔵", isCorrect: false },
      { text: "Green circle", emoji: "🟢", isCorrect: false },
      { text: "Yellow circle", emoji: "🟡", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "Which image shows EATING?",
    keyword: "EATING",
    options: [
      { text: "Eating food", emoji: "🍽️", isCorrect: true },
      { text: "Sleeping", emoji: "🛏️", isCorrect: false },
      { text: "Bathing", emoji: "🚿", isCorrect: false },
      { text: "Running", emoji: "🏃", isCorrect: false }
    ]
  },
  {
    id: 6,
    question: "Which image shows a CAR?",
    keyword: "CAR",
    options: [
      { text: "Car", emoji: "🚗", isCorrect: true },
      { text: "Bicycle", emoji: "🚲", isCorrect: false },
      { text: "Airplane", emoji: "✈️", isCorrect: false },
      { text: "Train", emoji: "🚆", isCorrect: false }
    ]
  },
  {
    id: 7,
    question: "Which image shows an EYE?",
    keyword: "EYE",
    options: [
      { text: "Eye", emoji: "👁️", isCorrect: true },
      { text: "Ear", emoji: "👂", isCorrect: false },
      { text: "Nose", emoji: "👃", isCorrect: false },
      { text: "Mouth", emoji: "👄", isCorrect: false }
    ]
  },
  {
    id: 8,
    question: "Which image shows a BALL?",
    keyword: "BALL",
    options: [
      { text: "Ball", emoji: "⚽️", isCorrect: true },
      { text: "Teddy", emoji: "🧸", isCorrect: false },
      { text: "Car", emoji: "🚗", isCorrect: false },
      { text: "Book", emoji: "📖", isCorrect: false }
    ]
  },
  {
    id: 9,
    question: "Which image shows RAIN?",
    keyword: "RAIN",
    options: [
      { text: "Rain", emoji: "🌧️", isCorrect: true },
      { text: "Sun", emoji: "☀️", isCorrect: false },
      { text: "Snow", emoji: "❄️", isCorrect: false },
      { text: "Storm", emoji: "🌪️", isCorrect: false }
    ]
  },
  {
    id: 10,
    question: "Which image is a CIRCLE?",
    keyword: "CIRCLE",
    options: [
      { text: "Circle", emoji: "⭕️", isCorrect: true },
      { text: "Triangle", emoji: "🔺", isCorrect: false },
      { text: "Square", emoji: "⬛️", isCorrect: false },
      { text: "Star", emoji: "⭐️", isCorrect: false }
    ]
  },
  {
    id: 11,
    question: "Which image is SAFE to touch?",
    keyword: "SAFE",
    options: [
      { text: "Soft toy", emoji: "🧸", isCorrect: true },
      { text: "Fire", emoji: "🔥", isCorrect: false },
      { text: "Knife", emoji: "🔪", isCorrect: false },
      { text: "Electric plug", emoji: "⚡️", isCorrect: false }
    ]
  },
  {
    id: 12,
    question: "Which image shows a BOOK?",
    keyword: "BOOK",
    options: [
      { text: "Book", emoji: "📘", isCorrect: true },
      { text: "Pencil", emoji: "✏️", isCorrect: false },
      { text: "Bag", emoji: "🎒", isCorrect: false },
      { text: "Ruler", emoji: "📏", isCorrect: false }
    ]
  },
  {
    id: 13,
    question: "Which image shows SHOES?",
    keyword: "SHOES",
    options: [
      { text: "Shoes", emoji: "👟", isCorrect: true },
      { text: "Shirt", emoji: "👕", isCorrect: false },
      { text: "Cap", emoji: "🧢", isCorrect: false },
      { text: "Socks", emoji: "🧦", isCorrect: false }
    ]
  },
  {
    id: 14,
    question: "Which image makes MUSIC?",
    keyword: "MUSIC",
    options: [
      { text: "Music player", emoji: "🎵", isCorrect: true },
      { text: "Car", emoji: "🚗", isCorrect: false },
      { text: "Tree", emoji: "🌳", isCorrect: false },
      { text: "Chair", emoji: "🪑", isCorrect: false }
    ]
  }
];

const SpeechPractice = () => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [todayData, setTodayData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [childName, setChildName] = useState('DefaultChild'); // TODO: Get from context/props

  // Check if already completed today
  useEffect(() => {
    const checkTodayCompletion = async () => {
      try {
        const response = await fetch(
          `https://brainwaveapi.teamuxh.site/api/speech-practice/today/${childName}`,
          {
            credentials: 'include'
          }
        );
        const data = await response.json();
        
        if (data.completed) {
          setAlreadyCompleted(true);
          setTodayData(data.data);
        }
      } catch (error) {
        console.error('Error checking today completion:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkTodayCompletion();
  }, [childName]);

  // Shuffle and select 5 questions on mount
  useEffect(() => {
    if (!alreadyCompleted) {
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 5);
      setSelectedQuestions(selected);
    }
  }, [alreadyCompleted]);

  // Speak the question using browser's speech synthesis
  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto-speak question when it changes
  useEffect(() => {
    if (selectedQuestions.length > 0 && currentQuestionIndex < selectedQuestions.length) {
      const timer = setTimeout(() => {
        speakQuestion(selectedQuestions[currentQuestionIndex].question);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, selectedQuestions]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    if (currentQuestion.options[optionIndex].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameComplete(true);
      savePracticeResults();
    }
  };

  const savePracticeResults = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        'https://brainwaveapi.teamuxh.site/api/speech-practice/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            childName: childName,
            score: score,
            totalQuestions: 5,
            questionsAttempted: selectedQuestions.map(q => q.id)
          })
        }
      );
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Error saving practice:', error);
      }
    } catch (error) {
      console.error('Error saving practice:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestart = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    setSelectedQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setGameComplete(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1C1E]">
        <div className="text-[#8E8E93] text-xl">Loading game...</div>
      </div>
    );
  }

  if (alreadyCompleted && todayData) {
    return (
      <div className="min-h-screen bg-[#1C1C1E] p-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/child')}
            className="mb-6 flex items-center gap-2 text-[#0A84FF] hover:text-[#0A84FF]/80 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Activities</span>
          </button>

          {/* Already Completed Card */}
          <div className="bg-[#2C2C2E] rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-[#30D158]/20 rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-[#30D158]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Already Done Today! ✅</h2>
            <p className="text-[#8E8E93] text-lg mb-6">
              You've already completed your speech practice for today.
            </p>
            
            {/* Today's Results */}
            <div className="bg-[#1C1C1E] rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Today's Results</h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl font-bold text-[#30D158]">{todayData.score}</span>
                <span className="text-2xl text-[#8E8E93]">/</span>
                <span className="text-4xl font-bold text-white">{todayData.total_questions}</span>
              </div>
              <div className="flex gap-2 justify-center">
                {[...Array(todayData.total_questions)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < todayData.score ? 'text-[#FFD60A] fill-current' : 'text-[#3A3A3C]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#0A84FF]/10 border border-[#0A84FF]/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#0A84FF] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#0A84FF] text-left">
                  Come back tomorrow to practice more and improve your skills!
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/child')}
              className="px-8 py-4 bg-[#0A84FF] text-white rounded-2xl text-lg font-semibold hover:bg-[#0A84FF]/90 transition-all"
            >
              Back to Activities
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1C1E]">
        <div className="text-[#8E8E93] text-xl">Loading game...</div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1C1E] p-6">
        <div className="bg-[#2C2C2E] rounded-3xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#FFD60A] rounded-full p-6">
              <Star className="w-16 h-16 text-[#1C1C1E] fill-current" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Great Job! 🎉</h2>
          <p className="text-2xl text-[#8E8E93] mb-6">
            You scored <span className="text-[#30D158] font-bold">{score}</span> out of <span className="font-bold">5</span>
          </p>
          <div className="flex gap-4 justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < score ? 'text-[#FFD60A] fill-current' : 'text-[#3A3A3C]'
                }`}
              />
            ))}
          </div>
          {isSaving && (
            <div className="mb-4 text-[#8E8E93] text-sm">
              Saving your results...
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/child')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#3A3A3C] text-white rounded-2xl text-lg font-semibold hover:bg-[#48484A] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleRestart}
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#3A3A3C]/50 text-[#8E8E93] rounded-2xl text-lg font-semibold cursor-not-allowed"
              title="Come back tomorrow to play again"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
          </div>
          <p className="mt-4 text-xs text-[#8E8E93]">
            Come back tomorrow for a new challenge!
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#1C1C1E] overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/child')}
          className="flex items-center gap-2 text-[#0A84FF] hover:text-[#0A84FF]/80 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Activities</span>
        </button>

        {/* Header */}
        <div className="bg-[#2C2C2E] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#0A84FF] rounded-full p-3">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Speech Practice</h1>
                <p className="text-[#8E8E93] text-sm">Listen and choose the correct answer</p>
              </div>
            </div>
            <button
              onClick={() => speakQuestion(currentQuestion.question)}
              className="bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white rounded-xl px-4 py-2 flex items-center gap-2 transition-all"
            >
              <Volume2 className="w-5 h-5" />
              <span className="font-medium">Repeat</span>
            </button>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#3A3A3C] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#30D158] h-full transition-all duration-500 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / 5) * 100}%` }}
              />
            </div>
            <span className="text-white font-bold text-lg">
              {currentQuestionIndex + 1}/5
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-[#2C2C2E] rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {currentQuestion.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = option.isCorrect;
              const showResult = isAnswered && isSelected;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={`
                    relative p-8 rounded-2xl text-center transition-all transform hover:scale-105 disabled:cursor-not-allowed
                    ${!isAnswered ? 'bg-[#3A3A3C] hover:bg-[#48484A] active:scale-95' : ''}
                    ${showResult && isCorrect ? 'bg-[#30D158] ring-4 ring-[#30D158]/50' : ''}
                    ${showResult && !isCorrect ? 'bg-[#FF453A] ring-4 ring-[#FF453A]/50' : ''}
                    ${isAnswered && !isSelected ? 'opacity-50' : ''}
                  `}
                >
                  <div className="text-7xl mb-4">{option.emoji}</div>
                  <div className="text-xl font-semibold text-white">{option.text}</div>
                  
                  {/* Result Icon */}
                  {showResult && (
                    <div className="absolute top-4 right-4">
                      {isCorrect ? (
                        <CheckCircle className="w-10 h-10 text-white animate-bounce" />
                      ) : (
                        <XCircle className="w-10 h-10 text-white animate-bounce" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {isAnswered && (
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={handleNextQuestion}
              className="bg-[#0A84FF] hover:bg-[#0A84FF]/90 text-white rounded-2xl px-12 py-4 text-xl font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              {currentQuestionIndex < selectedQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechPractice;
