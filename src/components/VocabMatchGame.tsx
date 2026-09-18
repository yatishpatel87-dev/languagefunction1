import React, { useState, useEffect } from 'react';
import { GradeLevel, VocabCardItem } from '../types';
import { VOCAB_MATCH_ITEMS } from '../data/curriculumData';
import { Check, RotateCcw, ArrowRight, Sparkles, Volume2, X } from 'lucide-react';
import { sounds } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface VocabMatchGameProps {
  currentGrade: GradeLevel;
  onAnswerResult: (correct: boolean, points: number, puzzleId: string) => void;
}

export const VocabMatchGame: React.FC<VocabMatchGameProps> = ({
  currentGrade,
  onAnswerResult
}) => {
  const filteredItems = VOCAB_MATCH_ITEMS.filter(item => 
    currentGrade === 'all' ? true : item.grade === currentGrade
  );

  const [roundItems, setRoundItems] = useState<VocabCardItem[]>([]);
  const [shuffledMatches, setShuffledMatches] = useState<{ id: string; text: string }[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<{ wordId: string; matchId: string } | null>(null);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [roundSeed, setRoundSeed] = useState(0);

  // Initialize round with 4 random items
  useEffect(() => {
    const pool = filteredItems.length >= 4 ? filteredItems : VOCAB_MATCH_ITEMS;
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 4);
    setRoundItems(shuffled);

    const matches = shuffled.map(item => ({ id: item.id, text: item.match }))
      .sort(() => Math.random() - 0.5);
    setShuffledMatches(matches);

    setSelectedWordId(null);
    setSelectedMatchId(null);
    setMatchedIds([]);
    setWrongPair(null);
    setRoundCompleted(false);
  }, [currentGrade, roundSeed]);

  const handleWordClick = (id: string) => {
    if (matchedIds.includes(id) || wrongPair) return;
    sounds.playClick();
    setSelectedWordId(id);

    // If a match is already chosen, check pair
    if (selectedMatchId) {
      checkPair(id, selectedMatchId);
    }
  };

  const handleMatchClick = (id: string) => {
    if (matchedIds.includes(id) || wrongPair) return;
    sounds.playClick();
    setSelectedMatchId(id);

    // If a word is already chosen, check pair
    if (selectedWordId) {
      checkPair(selectedWordId, id);
    }
  };

  const checkPair = (wordId: string, matchId: string) => {
    if (wordId === matchId) {
      // Correct Match
      sounds.playCorrect();
      const updated = [...matchedIds, wordId];
      setMatchedIds(updated);
      setSelectedWordId(null);
      setSelectedMatchId(null);
      setWrongPair(null);
      onAnswerResult(true, 25, `vocab-${wordId}`);

      if (updated.length === roundItems.length) {
        // Round Finished
        sounds.playLevelUp();
        setRoundCompleted(true);
        onAnswerResult(true, 50, `vocab-round-${roundSeed}`);
      }
    } else {
      // Wrong Match - trigger subtle red shake
      sounds.playWrong();
      setWrongPair({ wordId, matchId });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedWordId(null);
        setSelectedMatchId(null);
      }, 650);
    }
  };

  const handleNextRound = () => {
    sounds.playClick();
    setRoundSeed(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-200">
            શબ્દભંડોળ પઝલ (Vocabulary Pairs)
          </span>
          <span className="text-slate-400">
            જોડીઓ ઉકેલાઈ: {matchedIds.length} / {roundItems.length}
          </span>
        </div>
        <button
          onClick={() => setRoundSeed(prev => prev + 1)}
          className="flex items-center gap-1 text-slate-600 hover:text-purple-600 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>નવી જોડીઓ (New Words)</span>
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          ડાબી બાજુનો શબ્દ પસંદ કરી જમણી બાજુ તેનો સાચો અર્થ જોડો:
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Tap a word on the left, then tap its matching definition or synonym on the right.
        </p>
      </div>

      {/* Matching Grid: Left (Words) & Right (Meanings) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Left Column: English Words */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider px-1">
            અંગ્રેજી શબ્દો (Words):
          </div>
          {roundItems.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedWordId === item.id;
            const isWrong = wrongPair?.wordId === item.id;

            return (
              <div
                key={item.id}
                className="flex items-center gap-2"
              >
                <motion.button
                  id={`vocab-word-${item.id}`}
                  disabled={isMatched || !!wrongPair}
                  onClick={() => handleWordClick(item.id)}
                  whileHover={!isMatched && !wrongPair ? { scale: 1.02 } : {}}
                  whileTap={!isMatched && !wrongPair ? { scale: 0.98 } : {}}
                  animate={
                    isWrong
                      ? { x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.45 } }
                      : isMatched
                      ? { scale: [1, 1.03, 1], transition: { duration: 0.3 } }
                      : {}
                  }
                  className={`flex-1 p-3.5 rounded-xl border text-left font-bold text-sm sm:text-base transition-colors flex items-center justify-between shadow-2xs ${
                    isWrong
                      ? 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-300'
                      : isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 line-through opacity-75'
                      : isSelected
                        ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-300'
                        : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-slate-800'
                  }`}
                >
                  <span>{item.word}</span>
                  {isMatched && (
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: [0, 1.35, 1], rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                      className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </motion.span>
                  )}
                  {isWrong && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0"
                    >
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </motion.span>
                  )}
                </motion.button>
                <button
                  onClick={() => sounds.speakEnglish(item.word)}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors shrink-0"
                  title="ઉચ્ચાર સાંભળો"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Column: Meanings / Translations */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider px-1">
            અર્થ / સમાનાર્થી (Meanings / Synonyms):
          </div>
          {shuffledMatches.map((match) => {
            const isMatched = matchedIds.includes(match.id);
            const isSelected = selectedMatchId === match.id;
            const isWrong = wrongPair?.matchId === match.id;

            return (
              <motion.button
                key={match.id}
                id={`vocab-match-${match.id}`}
                disabled={isMatched || !!wrongPair}
                onClick={() => handleMatchClick(match.id)}
                whileHover={!isMatched && !wrongPair ? { scale: 1.02 } : {}}
                whileTap={!isMatched && !wrongPair ? { scale: 0.98 } : {}}
                animate={
                  isWrong
                    ? { x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.45 } }
                    : isMatched
                    ? { scale: [1, 1.03, 1], transition: { duration: 0.3 } }
                    : {}
                }
                className={`w-full p-3.5 rounded-xl border text-left font-medium text-xs sm:text-sm transition-colors flex items-center justify-between shadow-2xs ${
                  isWrong
                    ? 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-300'
                    : isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 line-through opacity-75'
                    : isSelected
                      ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-300 font-bold'
                      : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-slate-800'
                }`}
              >
                <span>{match.text}</span>
                {isMatched && (
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: [0, 1.35, 1], rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs ml-2"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.span>
                )}
                {isWrong && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 ml-2"
                  >
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Round completion banner */}
      <AnimatePresence>
        {roundCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-center mb-6 shadow-sm"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="w-12 h-12 mx-auto bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-2 shadow-2xs"
            >
              <Sparkles className="w-6 h-6 text-purple-600" />
            </motion.div>
            <h3 className="text-lg font-bold text-purple-900 font-display">
              અદ્ભુત! બધી જોડીઓ સફળતાપૂર્વક મેળવી લીધી!
            </h3>
            <p className="text-xs sm:text-sm text-purple-700 mt-1">
              તમારું શબ્દભંડોળ વધ્યું છે! (+100 Bonus Points ⭐)
            </p>
            <div className="mt-4 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                id="btn-next-vocab-round"
                onClick={handleNextRound}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all"
              >
                <span>આગળનો રાઉન્ડ (Next Round)</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
