import React, { useState, useEffect } from 'react';
import { GrammarGapPuzzle, GradeLevel } from '../types';
import { GRAMMAR_GAP_PUZZLES } from '../data/curriculumData';
import { Check, X, ArrowRight, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface GrammarGapGameProps {
  currentGrade: GradeLevel;
  onAnswerResult: (correct: boolean, points: number, puzzleId: string) => void;
}

export const GrammarGapGame: React.FC<GrammarGapGameProps> = ({
  currentGrade,
  onAnswerResult
}) => {
  const availablePuzzles = GRAMMAR_GAP_PUZZLES.filter(p => 
    currentGrade === 'all' ? true : p.grade === currentGrade
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentGrade]);

  const currentPuzzle: GrammarGapPuzzle | undefined = availablePuzzles[currentIndex % availablePuzzles.length];

  if (!currentPuzzle) {
    return <div className="p-8 text-center text-slate-500">પ્રશ્નો ઉપલબ્ધ નથી.</div>;
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
    setCurrentIndex(prev => (prev + 1) % availablePuzzles.length);
  };

  const completedSentence = currentPuzzle.sentenceWithBlank.replace('___', selectedOption || currentPuzzle.correctAnswer);
  const isCorrect = selectedOption === currentPuzzle.correctAnswer;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
      {/* Header Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
            ધોરણ {currentPuzzle.grade}
          </span>
          <span className="text-slate-400">
            લેંગ્વેજ ફંક્શન: <strong className="text-emerald-700">{currentPuzzle.functionName}</strong>
          </span>
        </div>
        <span className="text-slate-400 font-medium">
          પઝલ {((currentIndex) % availablePuzzles.length) + 1} / {availablePuzzles.length}
        </span>
      </div>

      {/* Target Fill In Sentence */}
      <div className="p-6 sm:p-7 bg-emerald-50/40 rounded-2xl border border-emerald-100 mb-6 text-center">
        <div className="text-lg sm:text-2xl font-bold text-slate-900 leading-relaxed font-display">
          {currentPuzzle.sentenceWithBlank.split('___').map((part, index, arr) => (
            <React.Fragment key={index}>
              {part}
              {index < arr.length - 1 && (
                <span className={`inline-block px-3 py-1 mx-1.5 rounded-lg border-2 font-mono font-bold transition-all ${
                  selectedOption
                    ? isCorrect
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-dashed border-emerald-400 text-emerald-700'
                }`}>
                  {selectedOption || ' ? '}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => sounds.speakEnglish(completedSentence)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 shadow-2xs transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>આખું વાક્ય સાંભળો (Listen Full Sentence)</span>
            </button>
          </div>
        )}
      </div>

      <p className="text-xs sm:text-sm font-bold text-slate-600 mb-3 uppercase tracking-wide">
        યોગ્ય શબ્દ પસંદ કરો (Select the right modal / connector):
      </p>

      {/* Options grid with Motion Animation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {currentPuzzle.blankOptions.map((opt, idx) => {
          const isSelected = opt === selectedOption;
          const isThisCorrect = opt === currentPuzzle.correctAnswer;
          const isThisWrongSelected = isSelected && !isThisCorrect;

          let style = 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-slate-800';

          if (isAnswered) {
            if (isThisCorrect) {
              style = 'bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-md ring-2 ring-emerald-400/40';
            } else if (isThisWrongSelected) {
              style = 'bg-rose-50 text-rose-900 border-rose-400 line-through ring-2 ring-rose-300';
            } else {
              style = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
            }
          }

          return (
            <motion.button
              key={idx}
              id={`btn-gap-option-${idx}`}
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              whileHover={!isAnswered ? { scale: 1.04 } : {}}
              whileTap={!isAnswered ? { scale: 0.96 } : {}}
              animate={
                isAnswered && isThisWrongSelected
                  ? { x: [0, -10, 10, -8, 8, -4, 4, 0], transition: { duration: 0.45, ease: 'easeInOut' } }
                  : isAnswered && isThisCorrect
                  ? { scale: [1, 1.06, 1], transition: { duration: 0.35, ease: 'easeOut' } }
                  : {}
              }
              className={`p-4 rounded-2xl border text-center font-bold text-base sm:text-lg transition-colors shadow-2xs relative flex items-center justify-center gap-2 ${style}`}
            >
              <span>{opt}</span>
              {isAnswered && isThisCorrect && (
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: [0, 1.3, 1], rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="w-5 h-5 rounded-full bg-white text-emerald-700 inline-flex items-center justify-center shrink-0 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </motion.span>
              )}
              {isAnswered && isThisWrongSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="w-5 h-5 rounded-full bg-rose-600 text-white inline-flex items-center justify-center shrink-0 shadow-2xs"
                >
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation with Motion Entry */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`p-4 sm:p-5 rounded-2xl border mb-6 shadow-sm ${
              isCorrect ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <motion.div 
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                className={`p-2.5 rounded-xl shrink-0 shadow-2xs ${
                  isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}
              >
                {isCorrect ? <Sparkles className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
              </motion.div>
              <div className="space-y-1.5 flex-1">
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>{isCorrect ? 'ઉત્તમ! સાચો શબ્દ છે!' : `સાચો જવાબ "${currentPuzzle.correctAnswer}" છે:`}</span>
                  {isCorrect && (
                    <span className="text-xs bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                      +50 PTS ⭐
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  <strong className="text-emerald-900">નિયમ (Grammar Rule):</strong> {currentPuzzle.explanationEn}
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900">ગુજરાતી સમજૂતી:</strong> {currentPuzzle.explanationGu}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {isAnswered && (
        <div className="flex justify-end">
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            id="btn-next-gap"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md active:scale-95 transition-all"
          >
            <span>આગળનો પ્રશ્ન (Next)</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
};
