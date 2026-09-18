/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GradeLevel, GameMode, PlayerStats, FunctionProgressRecord } from './types';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { DetectiveGame } from './components/DetectiveGame';
import { SentenceScrambleGame } from './components/SentenceScrambleGame';
import { GrammarGapGame } from './components/GrammarGapGame';
import { VocabMatchGame } from './components/VocabMatchGame';
import { WordUnscrambleGame } from './components/WordUnscrambleGame';
import { RulesGuideModal } from './components/RulesGuideModal';
import { BadgesModal } from './components/BadgesModal';
import { ProgressChartModal } from './components/ProgressChartModal';
import { ProgressCard } from './components/ProgressCard';
import { CertificateModal } from './components/CertificateModal';
import { StudentWelcomeModal } from './components/StudentWelcomeModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { mapPuzzleToFunction } from './utils/progressHelper';
import { sounds } from './utils/audio';
import { BookOpen, Sparkles, Trophy, Award, Heart, GraduationCap, User, Edit3, Flame } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'lang_quest_stats_v1';

const initialStats: PlayerStats = {
  score: 0,
  streak: 0,
  highestStreak: 0,
  correctCount: 0,
  totalAnswered: 0,
  stars: 0,
  solvedPuzzles: [],
  unlockedBadges: [],
  history: [],
  studentName: '',
  studentAvatar: 'detective'
};

export default function App() {
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>('all');
  const [currentMode, setCurrentMode] = useState<GameMode>('detective');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [isChangingStudentName, setIsChangingStudentName] = useState(false);

  // Load persistent stats
  const [stats, setStats] = useState<PlayerStats>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialStats;
  });

  // Save stats to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  const handleToggleSound = () => {
    sounds.soundEnabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const handleSaveStudentName = (name: string, grade: GradeLevel, avatar: string) => {
    setCurrentGrade(grade);
    setStats((prev) => ({
      ...prev,
      studentName: name,
      studentAvatar: avatar
    }));
    setIsChangingStudentName(false);
  };

  const handleAnswerResult = (correct: boolean, points: number, puzzleId: string) => {
    setStats((prev) => {
      const newStreak = correct ? prev.streak + 1 : 0;
      const newHighestStreak = Math.max(prev.highestStreak, newStreak);
      const newCorrectCount = correct ? prev.correctCount + 1 : prev.correctCount;
      const newTotalAnswered = prev.totalAnswered + 1;
      const newScore = Math.max(0, prev.score + (correct ? points + (newStreak > 2 ? 15 : 0) : 0));
      
      // Award stars on streaks or milestone answers
      let additionalStars = 0;
      if (correct) {
        additionalStars = 1;
        if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
          additionalStars += 2;
        }
      }

      const newStars = prev.stars + additionalStars;
      const newSolved = prev.solvedPuzzles.includes(puzzleId) 
        ? prev.solvedPuzzles 
        : [...prev.solvedPuzzles, puzzleId];

      // Track function progress over time
      const funcInfo = mapPuzzleToFunction(puzzleId);
      const now = Date.now();
      const d = new Date(now);
      const timeStr = `${d.getHours() % 12 || 12}:${d.getMinutes() < 10 ? '0' : ''}${d.getMinutes()} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
      
      const newRecord: FunctionProgressRecord = {
        id: `${now}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: now,
        timeLabel: timeStr,
        functionId: funcInfo.functionId,
        functionCategory: funcInfo.functionCategory,
        functionGu: funcInfo.functionGu,
        isCorrect: correct,
        scoreGained: correct ? points : 0,
        puzzleId
      };

      const newHistory = [...(prev.history || []), newRecord];

      return {
        ...prev,
        score: newScore,
        streak: newStreak,
        highestStreak: newHighestStreak,
        correctCount: newCorrectCount,
        totalAnswered: newTotalAnswered,
        stars: newStars,
        solvedPuzzles: newSolved,
        history: newHistory
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <Header
        currentGrade={currentGrade}
        onGradeChange={setCurrentGrade}
        stats={stats}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setShowGuideModal(true)}
        onOpenBadges={() => setShowBadgesModal(true)}
        onOpenProgress={() => setShowProgressModal(true)}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
        onOpenCertificate={() => setShowCertificateModal(true)}
        onEditStudent={() => setIsChangingStudentName(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 flex flex-col gap-5">
        {/* Student Greeting Strip */}
        {stats.studentName && (
          <div className="bg-white px-4 py-2.5 rounded-xl border border-amber-200/80 shadow-2xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
              <span className="text-base sm:text-lg">👋</span>
              <span>
                નમસ્તે, <strong className="text-amber-900 font-extrabold">{stats.studentName}</strong>!
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="text-slate-500 hidden sm:inline text-xs font-normal">
                Language Functions શીખો, સ્કોર વધારો અને સર્ટિફિકેટ અનલૉક કરો!
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                id="btn-greeting-leaderboard"
                onClick={() => {
                  sounds.playClick();
                  setShowLeaderboardModal(true);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-all shadow-2xs"
                title="લીડરબોર્ડ અને મિત્રોની સ્પર્ધા જુઓ"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">લીડરબોર્ડ ({stats.stars} ⭐)</span>
                <span className="sm:hidden">Rank</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setIsChangingStudentName(true);
                }}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 hover:underline"
                title="વિદ્યાર્થીનું નામ બદલો"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">નામ બદલો</span>
              </button>
            </div>
          </div>
        )}

        {/* Game Mode Navigation Tabs */}
        <ModeSelector
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
        />

        {/* Active Game Section */}
        <section className="flex-1 flex flex-col justify-start">
          {currentMode === 'detective' && (
            <DetectiveGame
              currentGrade={currentGrade}
              onAnswerResult={handleAnswerResult}
              solvedPuzzles={stats.solvedPuzzles}
              onCompleteQuiz={() => setShowCertificateModal(true)}
            />
          )}

          {currentMode === 'scramble' && (
            <SentenceScrambleGame
              currentGrade={currentGrade}
              onAnswerResult={handleAnswerResult}
            />
          )}

          {currentMode === 'grammar' && (
            <GrammarGapGame
              currentGrade={currentGrade}
              onAnswerResult={handleAnswerResult}
            />
          )}

          {currentMode === 'vocab_match' && (
            <VocabMatchGame
              currentGrade={currentGrade}
              onAnswerResult={handleAnswerResult}
            />
          )}

          {currentMode === 'word_unscramble' && (
            <WordUnscrambleGame
              currentGrade={currentGrade}
              onAnswerResult={handleAnswerResult}
            />
          )}
        </section>

        {/* Real-time Language Function Progress Chart (Recharts) */}
        <ProgressCard 
          stats={stats} 
          onOpenFullModal={() => setShowProgressModal(true)} 
        />

        {/* Helpful Tips / Bottom Banner */}
        <div className="bg-gradient-to-r from-amber-100/70 via-orange-50 to-amber-50 rounded-2xl p-4 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                ધોરણ ૬ થી ૮ અંગ્રેજી વ્યાકરણ અને લેંગ્વેજ ફંક્શન સુધારો!
              </h4>
              <p className="text-xs text-amber-800">
                વિનંતી (Request), પરવાનગી (Permission), ક્ષમતા (Ability) અને સરખામણી (Comparison) જેવા તમામ મહત્વના ફંક્શન્સ રમત સાથે શીખો.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              setShowGuideModal(true);
            }}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            માર્ગદર્શિકા વાંચો (Read Guide)
          </button>
        </div>

        {/* Certificate & Celebration Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                પ્રશ્નો પૂર્ણ કર્યા પછી ફટાકડા અને પ્રમાણપત્ર (Certificate & Fireworks)
              </h3>
              <p className="text-xs text-amber-100 mt-0.5">
                પ્રશ્નોના અંતે આકાશી ફટાકડા ફૂટશે અને તમને તમારું સત્તાવાર સિદ્ધિ પ્રમાણપત્ર મળશે!
              </p>
            </div>
          </div>
          <button
            id="btn-banner-certificate"
            onClick={() => {
              sounds.playClick();
              setShowCertificateModal(true);
            }}
            className="px-5 py-2.5 bg-white text-amber-900 hover:bg-amber-50 font-extrabold text-xs sm:text-sm rounded-xl shadow-md active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>🎆 ફટાકડા અને પ્રમાણપત્ર જુઓ</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Language Function Quest • ધોરણ ૬ થી ૮ ઇન્ટરેક્ટિવ લર્નિંગ ગેમ</span>
          <span className="flex items-center gap-1 text-slate-400">
            બનાવેલ વિદ્યાર્થીઓ માટે <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> GSEB & NCERT અભ્યાસક્રમ
          </span>
        </div>
      </footer>

      {/* Modals */}
      <RulesGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />

      <BadgesModal
        isOpen={showBadgesModal}
        onClose={() => setShowBadgesModal(false)}
        stats={stats}
      />

      <ProgressChartModal
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        stats={stats}
      />

      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        stats={stats}
        currentGrade={currentGrade}
      />

      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        stats={stats}
        currentGrade={currentGrade}
        onPlayAgain={() => {
          setStats(prev => ({
            ...prev,
            streak: 0
          }));
        }}
      />

      {/* Student Name Entry at Game Start */}
      <StudentWelcomeModal
        isOpen={!stats.studentName || isChangingStudentName}
        onSaveName={handleSaveStudentName}
        initialName={stats.studentName || ''}
        initialGrade={currentGrade}
        initialAvatar={stats.studentAvatar || 'detective'}
        isChangingName={Boolean(stats.studentName && isChangingStudentName)}
        onCancelChange={stats.studentName ? () => setIsChangingStudentName(false) : undefined}
      />
    </div>
  );
}
