import React, { useState, useEffect } from 'react';
import { SentenceScramblePuzzle, GradeLevel } from '../types';
import { SCRAMBLE_PUZZLES } from '../data/curriculumData';
import { RotateCcw, Volume2, ArrowRight, Lightbulb, Check, Sparkles, HelpCircle, XCircle } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface SentenceScrambleGameProps {
  currentGrade: GradeLevel;
  onAnswerResult: (correct: boolean, points: number, puzzleId: string) => void;
}

export const SentenceScrambleGame: React.FC<SentenceScrambleGameProps> = ({
  currentGrade,
  onAnswerResult
}) => {
  const availablePuzzles = SCRAMBLE_PUZZLES.filter(p => 
    currentGrade === 'all' ? true : p.grade === currentGrade
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentPuzzle: SentenceScramblePuzzle | undefined = availablePuzzles[currentIndex % availablePuzzles.length];

  // Initialize/reset puzzle
  useEffect(() => {
    if (currentPuzzle) {
      setSelectedWords([]);
      // Shuffle scrambled words
      const shuffled = [...currentPuzzle.scrambledWords].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setIsChecked(false);
      setIsCorrect(false);
      setShowHint(false);
    }
  }, [currentIndex, currentGrade, currentPuzzle]);

  if (!currentPuzzle) {
    return <div className="p-8 text-center text-slate-500">પ્રશ્નો ઉપલબ્ધ નથી.</div>;
  }

  const handleWordClick = (word: string, index: number) => {
    if (isChecked && isCorrect) return;
    sounds.playClick();
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
    setIsChecked(false);
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (isChecked && isCorrect) return;
    sounds.playClick();
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
    setIsChecked(false);
  };

  const handleReset = () => {
    sounds.playClick();
    setSelectedWords([]);
    setAvailableWords([...currentPuzzle.scrambledWords].sort(() => Math.random() - 0.5));
    setIsChecked(false);
    setIsCorrect(false);
  };

  const handleCheck = () => {
    const constructed = selectedWords.join(' ').trim();
    const target = currentPuzzle.correctSentence.trim();
    const correct = constructed.toLowerCase() === target.toLowerCase();

    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      sounds.speakEnglish(currentPuzzle.correctSentence.replace(' .', '.').replace(' ?', '?'));
      onAnswerResult(true, 60, currentPuzzle.id);
    } else {
      sounds.playWrong();
      onAnswerResult(false, 0, currentPuzzle.id);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setCurrentIndex(prev => (prev + 1) % availablePuzzles.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
      {/* Header Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
            ધોરણ {currentPuzzle.grade}
          </span>
          <span className="font-semibold text-slate-700">
            ફંક્શન: <span className="text-amber-700">{currentPuzzle.functionName}</span> ({currentPuzzle.functionGu})
          </span>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-medium transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>{showHint ? 'સંકેત છુપાવો' : 'હિન્ટ (Hint)'}</span>
        </button>
      </div>

      {/* Target meaning prompt */}
      <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/70 mb-5 text-center">
        <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">અર્થ (Target Meaning):</span>
        <div className="text-base sm:text-lg font-bold text-slate-800 mt-1">
          "{currentPuzzle.translationGu}"
        </div>
      </div>

      {showHint && (
        <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
          <span><strong>Hint:</strong> {currentPuzzle.hint}</span>
        </div>
      )}

      {/* Sentence Drop Zone / Assembled Word Area with Shake & Pop */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
          તમારું વાક્ય બનાવો (Your Constructed Sentence):
        </label>
        <motion.div 
          animate={
            isChecked && !isCorrect 
              ? { x: [0, -10, 10, -8, 8, -4, 4, 0], transition: { duration: 0.45, ease: 'easeInOut' } }
              : isChecked && isCorrect
              ? { scale: [1, 1.025, 1], transition: { duration: 0.35, ease: 'easeOut' } }
              : {}
          }
          className={`min-h-[76px] p-3.5 sm:p-4 rounded-2xl border-2 flex flex-wrap items-center gap-2 transition-colors ${
            selectedWords.length === 0
              ? 'border-dashed border-slate-300 bg-slate-50/60 justify-center text-slate-400 text-sm'
              : isChecked
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-rose-400 bg-rose-50/40 shadow-sm'
                : 'border-blue-400 bg-white shadow-2xs'
          }`}
        >
          {selectedWords.length === 0 ? (
            <span>નીચે આપેલા શબ્દો પર ક્લિક કરીને વાક્ય ક્રમમાં ગોઠવો</span>
          ) : (
            <AnimatePresence>
              {selectedWords.map((word, idx) => (
                <motion.button
                  key={`${word}-${idx}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRemoveWord(word, idx)}
                  className={`px-3 py-1.5 rounded-xl text-sm sm:text-base font-bold transition-all shadow-2xs ${
                    isChecked && isCorrect 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : isChecked && !isCorrect
                      ? 'bg-rose-700 text-white'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                  title="પાછું કાઢવા ક્લિક કરો"
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Word Pool / Scrambled Chips */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
          શબ્દ પસંદ કરો (Tap Words to Build):
        </label>
        <div className="flex flex-wrap gap-2.5 p-3.5 bg-slate-100/70 rounded-2xl border border-slate-200 min-h-[58px]">
          {availableWords.map((word, idx) => (
            <motion.button
              key={`${word}-${idx}`}
              id={`chip-word-${idx}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleWordClick(word, idx)}
              className="px-3.5 py-1.5 bg-white hover:bg-amber-100 hover:border-amber-300 border border-slate-300 rounded-xl text-sm sm:text-base font-bold text-slate-800 shadow-2xs transition-colors"
            >
              {word}
            </motion.button>
          ))}
          {availableWords.length === 0 && selectedWords.length > 0 && (
            <span className="text-xs text-slate-400 self-center">બધા શબ્દો પસંદ થઈ ગયા છે. 'તપાસો (Check)' બટન દબાવો!</span>
          )}
        </div>
      </div>

      {/* Result feedback with Animated Pop */}
      <AnimatePresence>
        {isChecked && (
          <motion.div 
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`p-4 sm:p-5 rounded-2xl border mb-6 shadow-sm relative overflow-hidden ${
              isCorrect ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}
          >
            {isCorrect ? (
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: [0, 1.35, 1], rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0"
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                  </motion.div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-emerald-900 flex items-center gap-2">
                      <span>અભિનંદન! સચોટ વાક્ય રચના!</span>
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        className="text-xs bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full"
                      >
                        +60 PTS ⭐
                      </motion.span>
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                      "{currentPuzzle.correctSentence.replace(' .', '.').replace(' ?', '?')}"
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => sounds.speakEnglish(currentPuzzle.correctSentence.replace(' .', '.').replace(' ?', '?'))}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>સાંભળો (Pronounce)</span>
                </button>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <motion.div
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: [0, 1.25, 1], rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0"
                >
                  <XCircle className="w-5 h-5 stroke-[2.5]" />
                </motion.div>
                <div>
                  <div className="font-extrabold text-sm text-rose-900">
                    અરેરે! ક્રમ બરાબર નથી. ફરી પ્રયત્ન કરો!
                  </div>
                  <div className="text-xs text-rose-700 font-medium mt-1">
                    સૂચન: વાક્યની શરૂઆત અને યોગ્ય પદક્રમ (Subject + Modal / Helping Verb + Main Verb) ચકાસો.
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>ફરીથી ગોઠવો (Reset)</span>
        </button>

        <div className="flex items-center gap-2">
          {!isCorrect ? (
            <button
              id="btn-check-scramble"
              disabled={selectedWords.length === 0}
              onClick={handleCheck}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
                selectedWords.length > 0 
                  ? 'bg-amber-600 hover:bg-amber-700 active:scale-95' 
                  : 'bg-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>તપાસો (Check Sentence)</span>
            </button>
          ) : (
            <button
              id="btn-next-scramble"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md active:scale-95 transition-all"
            >
              <span>આગળનો પઝલ (Next)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
