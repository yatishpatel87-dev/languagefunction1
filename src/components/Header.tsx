import React from 'react';
import { GradeLevel, PlayerStats } from '../types';
import { Volume2, VolumeX, Flame, Star, BookOpen, Award, Sparkles, TrendingUp, GraduationCap, Edit3, User, Trophy } from 'lucide-react';
import { sounds } from '../utils/audio';

const AVATAR_MAP: Record<string, string> = {
  detective: '🕵️‍♂️',
  star: '⭐',
  rocket: '🚀',
  lion: '🦁',
  trophy: '🏆',
  owl: '🦉',
  butterfly: '🦋',
  scholar: '🎓'
};

interface HeaderProps {
  currentGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  stats: PlayerStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
  onOpenBadges: () => void;
  onOpenProgress: () => void;
  onOpenLeaderboard?: () => void;
  onOpenCertificate?: () => void;
  onEditStudent?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentGrade,
  onGradeChange,
  stats,
  soundEnabled,
  onToggleSound,
  onOpenGuide,
  onOpenBadges,
  onOpenProgress,
  onOpenLeaderboard,
  onOpenCertificate,
  onEditStudent
}) => {
  const grades: { value: GradeLevel; labelEn: string; labelGu: string }[] = [
    { value: 'all', labelEn: 'All Grades', labelGu: 'બધા ધોરણ' },
    { value: 6, labelEn: 'Std 6', labelGu: 'ધોરણ ૬' },
    { value: 7, labelEn: 'Std 7', labelGu: 'ધોરણ ૭' },
    { value: 8, labelEn: 'Std 8', labelGu: 'ધોરણ ૮' },
  ];

  return (
    <header className="bg-white border-b border-amber-200/70 shadow-xs sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top bar: Title & Quick Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-800 tracking-tight">
                  Language Function Quest
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                  Std 6 to 8
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                ભાષા કાર્ય, વ્યાકરણ અને શબ્દભંડોળ પઝલ રમત
              </p>
            </div>
          </div>

          {/* Gamification Bar */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Score */}
            <div 
              id="stat-score"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-sm"
              title="કુલ સ્કોર (Total Score)"
            >
              <span className="text-xs uppercase text-amber-700 font-bold">PTS:</span>
              <span className="text-base font-bold text-amber-900">{stats.score}</span>
            </div>

            {/* Streak */}
            <div 
              id="stat-streak"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all ${
                stats.streak > 1 
                  ? 'bg-orange-50 border-orange-300 text-orange-700 shadow-xs scale-105' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
              title="સળંગ સાચા જવાબો (Streak)"
            >
              <Flame className={`w-4 h-4 ${stats.streak > 1 ? 'text-orange-500 fill-orange-500 animate-bounce' : 'text-slate-400'}`} />
              <span>{stats.streak}</span>
            </div>

            {/* Stars */}
            <div 
              id="stat-stars"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm font-semibold"
              title="મેળવેલ તારલા (Stars)"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span>{stats.stars}</span>
            </div>

            {/* Student Name Profile Badge */}
            {stats.studentName && (
              <button
                id="btn-edit-student"
                onClick={() => {
                  sounds.playClick();
                  if (onEditStudent) onEditStudent();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-bold transition-all shadow-2xs"
                title="વિદ્યાર્થીનું નામ બદલવા માટે ક્લિક કરો (Change Student Name)"
              >
                <span className="text-base">{AVATAR_MAP[stats.studentAvatar || 'detective'] || '👤'}</span>
                <span className="max-w-[110px] truncate">{stats.studentName}</span>
                <Edit3 className="w-3.5 h-3.5 text-amber-700 shrink-0 opacity-70" />
              </button>
            )}

            {/* Quick Action buttons */}
            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <button
                id="btn-open-guide"
                onClick={() => {
                  sounds.playClick();
                  onOpenGuide();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
                title="લેંગ્વેજ ફંક્શન નિયમો અને ગાઇડ (Rules Guide)"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden md:inline">નિયમો</span>
                <span className="md:hidden">Guide</span>
              </button>

              <button
                id="btn-open-progress"
                onClick={() => {
                  sounds.playClick();
                  onOpenProgress();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                title="પ્રગતિ ચાર્ટ અને વિશ્લેષણ (Progress Analytics Chart)"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">પ્રગતિ ચાર્ટ</span>
                <span className="md:hidden">Progress</span>
              </button>

              <button
                id="btn-open-badges"
                onClick={() => {
                  sounds.playClick();
                  onOpenBadges();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
                title="સિદ્ધિઓ અને બેજ (Achievements & Badges)"
              >
                <Award className="w-3.5 h-3.5 text-purple-600" />
                <span className="hidden md:inline">બેજ</span>
                <span className="md:hidden">Badges</span>
              </button>

              {onOpenLeaderboard && (
                <button
                  id="btn-open-leaderboard"
                  onClick={() => {
                    sounds.playClick();
                    onOpenLeaderboard();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors shadow-2xs"
                  title="ગ્લોબલ અને મિત્રોનું લીડરબોર્ડ (Global & Friends Leaderboard)"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden md:inline">લીડરબોર્ડ</span>
                  <span className="md:hidden">Rank</span>
                </button>
              )}

              {onOpenCertificate && (
                <button
                  id="btn-open-certificate"
                  onClick={() => {
                    sounds.playClick();
                    onOpenCertificate();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-900 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border border-amber-300 rounded-lg transition-all shadow-2xs"
                  title="પ્રમાણપત્ર અને ફટાકડા (Certificate of Excellence)"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden md:inline">પ્રમાણપત્ર</span>
                  <span className="md:hidden">Cert</span>
                </button>
              )}

              <button
                id="btn-toggle-sound"
                onClick={onToggleSound}
                className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title={soundEnabled ? "અવાજ બંધ કરો (Mute Sound)" : "અવાજ ચાલુ કરો (Unmute Sound)"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Grade Selector Strip */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <span className="text-slate-400 font-normal">ધોરણ પસંદ કરો (Select Grade):</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
            {grades.map((g) => (
              <button
                key={g.value}
                id={`btn-grade-${g.value}`}
                onClick={() => {
                  sounds.playClick();
                  onGradeChange(g.value);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  currentGrade === g.value
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{g.labelGu}</span>
                <span className="ml-1 opacity-75 hidden sm:inline">({g.labelEn})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
