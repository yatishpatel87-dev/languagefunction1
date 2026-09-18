import React, { useState, useEffect } from 'react';
import { FunctionPuzzle, GradeLevel } from '../types';
import { FUNCTION_PUZZLES } from '../data/curriculumData';
import { Volume2, HelpCircle, Check, X, ArrowRight, ArrowLeft, Lightbulb, RefreshCw, Trophy, LayoutGrid, CheckCircle2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface DetectiveGameProps {
  currentGrade: GradeLevel;
  onAnswerResult: (correct: boolean, points: number, puzzleId: string) => void;
  solvedPuzzles?: string[];
  onCompleteQuiz?: () => void;
}

export const DetectiveGame: React.FC<DetectiveGameProps> = ({
  currentGrade,
  onAnswerResult,
  solvedPuzzles = [],
  onCompleteQuiz
}) => {
  // Filter puzzles based on grade
  const availablePuzzles = FUNCTION_PUZZLES.filter(p => 
    currentGrade === 'all' ? true : p.grade === currentGrade
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showGujaratiHint, setShowGujaratiHint] = useState(true);
  const [showGridNav, setShowGridNav] = useState(false);

  // Reset when grade changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentGrade]);

  const currentPuzzle: FunctionPuzzle | undefined = availablePuzzles[currentIndex % availablePuzzles.length];

  if (!currentPuzzle) {
    return (
      <div className="p-8 text-center text-slate-500">
        આ ધોરણ માટે પ્રશ્નો ઉપલબ્ધ નથી. કૃપા કરીને અન્ય ધોરણ પસંદ કરો.
      </div>
    );
  }

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentPuzzle.correctAnswer;
    if (isCorrect) {
      sounds.playCorrect();
      onAnswerResult(true, 50, currentPuzzle.id);
    } else {
      sounds.playWrong();
      onAnswerResult(false, 0, currentPuzzle.id);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % availablePuzzles.length);
  };

  const handlePrev = () => {
    sounds.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev - 1 + availablePuzzles.length) % availablePuzzles.length);
  };

  const handleJumpToQuestion = (index: number) => {
    sounds.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex(index);
    setShowGridNav(false);
  };

  const handleSpeak = () => {
    sounds.speakEnglish(currentPuzzle.sentence);
  };

  const isCorrect = selectedOption === currentPuzzle.correctAnswer;
  const currentQNum = ((currentIndex) % availablePuzzles.length) + 1;
  const totalQuestions = availablePuzzles.length;
  const progressPercent = (currentQNum / totalQuestions) * 100;
  const isAlreadySolved = solvedPuzzles.includes(currentPuzzle.id);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
      {/* Top Puzzle Status & 30-Question Tracker */}
      <div className="flex flex-col gap-2.5 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              ધોરણ {currentPuzzle.grade} (Grade {currentPuzzle.grade})
            </span>
            <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
              પ્રશ્ન {currentQNum} / {totalQuestions}
            </span>
            {isAlreadySolved && (
              <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>સોલ્વ થઈ ગયેલ</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-toggle-grid-nav"
              onClick={() => setShowGridNav(!showGridNav)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                showGridNav 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
              }`}
              title="તમામ ૩૦ પ્રશ્નોની યાદી (View all questions)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>પ્રશ્નો (1-{totalQuestions})</span>
            </button>
            <button
              onClick={() => setShowGujaratiHint(!showGujaratiHint)}
              className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              title="ગુજરાતી સમજૂતી બતાવો/છુપાવો"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showGujaratiHint ? 'સંકેત છુપાવો' : 'ગુજરાતી સંકેત'}</span>
            </button>
          </div>
        </div>

        {/* Linear Progress Bar for 30 Questions */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 30-Question Grid Navigator Dropdown */}
        {showGridNav && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">
                પ્રશ્નોની યાદી (કુલ {totalQuestions} પ્રશ્નો):
              </span>
              <span className="text-[11px] text-slate-500">
                કોઈપણ પ્રશ્ન પર ક્લિક કરીને સીધા ત્યાં પહોંચો
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
              {availablePuzzles.map((p, idx) => {
                const isCurrent = idx === (currentIndex % availablePuzzles.length);
                const isSolved = solvedPuzzles.includes(p.id);

                return (
                  <button
                    key={p.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/50'
                        : isSolved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                    title={`પ્રશ્ન ${idx + 1} (ધોરણ ${p.grade})`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Target Question Card */}
      <div className="bg-gradient-to-b from-blue-50/60 to-indigo-50/30 rounded-2xl p-5 sm:p-7 border border-blue-100/90 text-center relative mb-6">
        {currentPuzzle.dialogueSpeaker && (
          <div className="inline-block px-3 py-1 bg-white border border-blue-200/80 rounded-full text-xs font-semibold text-blue-800 shadow-2xs mb-3">
            🗣️ {currentPuzzle.dialogueSpeaker}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed font-display">
            "{currentPuzzle.sentence}"
          </h2>
          <button
            onClick={handleSpeak}
            className="p-2.5 rounded-xl bg-white hover:bg-blue-100 text-blue-600 border border-blue-200 shadow-2xs transition-all transform active:scale-95 shrink-0"
            title="અવાજમાં સાંભળો (Pronounce sentence)"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Gujarati Context Hint */}
        {showGujaratiHint && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{currentPuzzle.contextGu}</span>
          </div>
        )}
      </div>

      {/* Prompt Question */}
      <p className="text-sm font-semibold text-slate-700 mb-3 text-center sm:text-left">
        આ વાક્ય કયું લેંગ્વેજ ફંક્શન દર્શાવે છે? (Identify the Language Function):
      </p>

      {/* 4 Options Grid with Motion Feedback */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 relative">
        {currentPuzzle.options.map((option, idx) => {
          const isSelected = option === selectedOption;
          const isThisCorrect = option === currentPuzzle.correctAnswer;
          const isThisWrongSelected = isSelected && !isThisCorrect;

          let btnStyle = 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-800';

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/30 shadow-sm';
            } else if (isThisWrongSelected) {
              btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-500/30';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <motion.button
              key={idx}
              id={`option-detective-${idx}`}
              disabled={isAnswered}
              onClick={() => handleSelect(option)}
              whileHover={!isAnswered ? { scale: 1.015 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              animate={
                isAnswered && isThisWrongSelected
                  ? { 
                      x: [0, -12, 12, -8, 8, -4, 4, 0],
                      transition: { duration: 0.45, ease: 'easeInOut' }
                    }
                  : isAnswered && isThisCorrect
                  ? { 
                      scale: [1, 1.035, 1],
                      transition: { duration: 0.35, ease: 'easeOut' }
                    }
                  : {}
              }
              className={`p-4 rounded-2xl border text-left text-sm sm:text-base font-semibold transition-colors flex items-center justify-between gap-3 shadow-2xs relative overflow-hidden ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                  isAnswered && isThisCorrect 
                    ? 'bg-emerald-200 text-emerald-900' 
                    : isAnswered && isThisWrongSelected
                    ? 'bg-rose-200 text-rose-900'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={isAnswered && isThisWrongSelected ? 'line-through decoration-rose-500 decoration-2' : ''}>
                  {option}
                </span>
              </div>

              {/* Animated Green Checkmark Pop */}
              {isAnswered && isThisCorrect && (
                <motion.span
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  animate={{ scale: [0, 1.35, 1], rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </motion.span>
              )}

              {/* Animated Red X Pop */}
              {isAnswered && isThisWrongSelected && (
                <motion.span
                  initial={{ scale: 0, rotate: 45, opacity: 0 }}
                  animate={{ scale: [0, 1.3, 1], rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation Banner with Spring Motion */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`p-4 sm:p-5 rounded-2xl border mb-6 shadow-sm transition-all relative overflow-hidden ${
              isCorrect ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}
          >
            {/* Subtle celebration sparkle for correct answers */}
            {isCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="absolute top-2 right-2 text-emerald-400"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            )}

            <div className="flex items-start gap-3.5">
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20, delay: 0.05 }}
                className={`p-2.5 rounded-xl shrink-0 shadow-2xs ${
                  isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}
              >
                {isCorrect ? <Trophy className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
              </motion.div>
              <div className="space-y-1.5 flex-1">
                <div className="font-extrabold text-base flex items-center gap-2">
                  <span>{isCorrect ? 'સરસ! સાચો જવાબ છે!' : 'અરેરે! સાચો જવાબ નીચે મુજબ છે:'}</span>
                  {isCorrect && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.15 }}
                      className="text-xs bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full shadow-2xs"
                    >
                      +50 PTS ⭐
                    </motion.span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  <strong className="text-emerald-900">English Rule:</strong> {currentPuzzle.explanationEn}
                </p>
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">ગુજરાતી સમજૂતી:</strong> {currentPuzzle.explanationGu}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action footer with Previous & Next controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-prev-detective"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs sm:text-sm font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>પાછળનો પ્રશ્ન (Prev)</span>
        </button>

        {currentQNum === totalQuestions && isAnswered ? (
          <button
            id="btn-finish-quiz-cert"
            onClick={() => {
              sounds.playClick();
              if (onCompleteQuiz) onCompleteQuiz();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 animate-pulse"
          >
            <span>🎉 પ્રશ્નો પૂર્ણ! ફટાકડા અને પ્રમાણપત્ર જુઓ (Finish & Certificate)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="btn-next-detective"
            onClick={() => {
              if (currentQNum === totalQuestions && onCompleteQuiz) {
                onCompleteQuiz();
              } else {
                handleNext();
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all active:scale-95"
          >
            <span>{isAnswered ? 'આગળનો પ્રશ્ન (Next Puzzle)' : 'છોડો / આગળ વધો (Skip)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
