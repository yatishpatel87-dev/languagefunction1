import React, { useState, useEffect } from 'react';
import { GradeLevel, WordUnscramblePuzzle } from '../types';
import { WORD_UNSCRAMBLE_PUZZLES } from '../data/curriculumData';
import { RotateCcw, Check, ArrowRight, Lightbulb, Volume2, Sparkles, XCircle } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface WordUnscrambleGameProps {
  currentGrade: GradeLevel;
  onAnswerResult: (correct: boolean, points: number, puzzleId: string) => void;
}

export const WordUnscrambleGame: React.FC<WordUnscrambleGameProps> = ({
  currentGrade,
  onAnswerResult
}) => {
  const availablePuzzles = WORD_UNSCRAMBLE_PUZZLES.filter(p => 
    currentGrade === 'all' ? true : p.grade === currentGrade
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<{ id: number; char: string }[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: number; char: string }[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentPuzzle: WordUnscramblePuzzle | undefined = availablePuzzles[currentIndex % availablePuzzles.length];

  useEffect(() => {
    if (currentPuzzle) {
      const chars = currentPuzzle.word.split('').map((char, id) => ({ id, char }));
      // Shuffle letters
      const shuffled = [...chars].sort(() => Math.random() - 0.5);
      // Ensure shuffled is not identical to original
      if (shuffled.map(s => s.char).join('') === currentPuzzle.word && chars.length > 2) {
        shuffled.reverse();
      }
      setAvailableLetters(shuffled);
      setSelectedLetters([]);
      setIsAnswered(false);
      setIsCorrect(false);
    }
  }, [currentIndex, currentGrade, currentPuzzle]);

  if (!currentPuzzle) {
    return <div className="p-8 text-center text-slate-500">પઝલ ઉપલબ્ધ નથી.</div>;
  }

  const handleLetterClick = (letterObj: { id: number; char: string }) => {
    if (isAnswered && isCorrect) return;
    sounds.playClick();
    setSelectedLetters(prev => [...prev, letterObj]);
    setAvailableLetters(prev => prev.filter(l => l.id !== letterObj.id));

    // Auto-check when all letters filled
    const nextSelected = [...selectedLetters, letterObj];
    if (nextSelected.length === currentPuzzle.word.length) {
      checkWord(nextSelected.map(l => l.char).join(''));
    }
  };

  const handleRemoveLetter = (letterObj: { id: number; char: string }) => {
    if (isAnswered && isCorrect) return;
    sounds.playClick();
    setSelectedLetters(prev => prev.filter(l => l.id !== letterObj.id));
    setAvailableLetters(prev => [...prev, letterObj]);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const checkWord = (wordAttempt: string) => {
    const correct = wordAttempt.toUpperCase() === currentPuzzle.word.toUpperCase();
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      sounds.speakEnglish(currentPuzzle.word);
      onAnswerResult(true, 50, currentPuzzle.id);
    } else {
      sounds.playWrong();
      onAnswerResult(false, 0, currentPuzzle.id);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    const chars = currentPuzzle.word.split('').map((char, id) => ({ id, char }));
    setAvailableLetters([...chars].sort(() => Math.random() - 0.5));
    setSelectedLetters([]);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    sounds.playClick();
    setCurrentIndex(prev => (prev + 1) % availablePuzzles.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
      {/* Top status */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 font-semibold border border-rose-200">
            ધોરણ {currentPuzzle.grade}
          </span>
          <span className="text-slate-400">
            પ્રકાર: <strong className="text-rose-700">{currentPuzzle.category}</strong>
          </span>
        </div>
        <span className="text-slate-400">
          શબ્દ {((currentIndex) % availablePuzzles.length) + 1} / {availablePuzzles.length}
        </span>
      </div>

      {/* Clues Card */}
      <div className="p-5 bg-rose-50/40 rounded-2xl border border-rose-100 mb-6 text-center space-y-2">
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-rose-200 rounded-full text-xs font-bold text-rose-800">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>ગુજરાતી અર્થ: {currentPuzzle.hintGu}</span>
        </div>
        <p className="text-sm sm:text-base font-semibold text-slate-800">
          "{currentPuzzle.hintEn}"
        </p>
      </div>

      {/* Assembled Word Slot */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-600 uppercase mb-2 text-center">
          અક્ષરો ગોઠવી શબ્દ પૂર્ણ કરો (Spelled Word):
        </label>
        <motion.div 
          animate={
            isAnswered && !isCorrect 
              ? { x: [0, -12, 12, -8, 8, -4, 4, 0], transition: { duration: 0.45, ease: 'easeInOut' } }
              : isAnswered && isCorrect
              ? { scale: [1, 1.04, 1], transition: { duration: 0.35, ease: 'easeOut' } }
              : {}
          }
          className="flex justify-center items-center gap-2 min-h-[64px]"
        >
          {Array.from({ length: currentPuzzle.word.length }).map((_, idx) => {
            const letterObj = selectedLetters[idx];
            return (
              <motion.button
                key={idx}
                disabled={!letterObj}
                onClick={() => letterObj && handleRemoveLetter(letterObj)}
                whileTap={letterObj ? { scale: 0.92 } : {}}
                initial={letterObj ? { scale: 0.8, opacity: 0 } : false}
                animate={letterObj ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl text-xl sm:text-2xl font-black font-display transition-colors flex items-center justify-center shadow-xs ${
                  letterObj
                    ? isAnswered
                      ? isCorrect
                        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                        : 'bg-rose-500 text-white ring-2 ring-rose-300'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400'
                }`}
                title={letterObj ? "દૂર કરવા ક્લિક કરો" : ""}
              >
                {letterObj ? letterObj.char : ''}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Letter Bank */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-600 uppercase mb-2 text-center">
          અક્ષર પસંદ કરો (Tap Letters):
        </label>
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          {availableLetters.map((l) => (
            <motion.button
              key={l.id}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleLetterClick(l)}
              className="w-11 h-13 sm:w-13 sm:h-14 bg-white hover:bg-rose-100 hover:border-rose-300 border border-slate-300 rounded-xl text-lg sm:text-xl font-extrabold text-slate-800 shadow-2xs transition-colors flex items-center justify-center font-display"
            >
              {l.char}
            </motion.button>
          ))}
          {availableLetters.length === 0 && (
            <span className="text-xs text-slate-400 self-center">બધા અક્ષરો મૂકાઈ ગયા છે.</span>
          )}
        </div>
      </div>

      {/* Feedback & Result with Motion Pop */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`p-4 sm:p-5 rounded-2xl border mb-6 shadow-sm ${
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
                    <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                      <span>ખૂબ સરસ! સાચો શબ્દ:</span>
                      <span className="font-mono text-emerald-900 font-black">{currentPuzzle.word}</span>
                      <span className="text-xs bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                        +50 PTS ⭐
                      </span>
                    </div>
                    <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                      {currentPuzzle.hintGu}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => sounds.speakEnglish(currentPuzzle.word)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>ઉચ્ચાર સાંભળો</span>
                </button>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.25, 1] }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0"
                >
                  <XCircle className="w-5 h-5 stroke-[2.5]" />
                </motion.div>
                <div>
                  <div className="font-extrabold text-sm text-rose-900">
                    અરેરે! જોડણી યોગ્ય નથી. ફરી પ્રયત્ન કરો!
                  </div>
                  <div className="text-xs text-rose-700 font-medium mt-1">
                    અક્ષરો ફરીથી ગોઠવવા માટે અક્ષર પર ક્લિક કરો અથવા રીસેટ કરો.
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>રીસેટ (Reset)</span>
        </button>

        {isCorrect && (
          <button
            id="btn-next-unscramble"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all"
          >
            <span>આગળનો શબ્દ (Next)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
