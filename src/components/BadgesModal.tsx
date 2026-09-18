import React from 'react';
import { BADGES } from '../data/curriculumData';
import { PlayerStats } from '../types';
import { X, Award, Flame, Star, Target, Sparkles, Trophy, Lock } from 'lucide-react';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  stats
}) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string, isUnlocked: boolean) => {
    const cls = `w-6 h-6 ${isUnlocked ? 'text-amber-600' : 'text-slate-400'}`;
    switch (iconName) {
      case 'Flame': return <Flame className={cls} />;
      case 'Star': return <Star className={cls} />;
      case 'Award': return <Award className={cls} />;
      case 'Sparkles': return <Sparkles className={cls} />;
      case 'Trophy': return <Trophy className={cls} />;
      default: return <Target className={cls} />;
    }
  };

  const unlockedCount = BADGES.filter(b => b.requirement(stats)).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                સિદ્ધિઓ અને બેજ (Achievements & Badges)
              </h2>
              <p className="text-xs text-slate-500">
                તમે {BADGES.length} માંથી {unlockedCount} બેજ અનલોક કર્યા છે!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary strip */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">કુલ સ્કોર</div>
            <div className="text-lg font-black text-amber-600 font-display">{stats.score}</div>
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">સર્વોચ્ચ સ્ટ્રીક</div>
            <div className="text-lg font-black text-orange-600 font-display">{stats.highestStreak}🔥</div>
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">સાચા જવાબો</div>
            <div className="text-lg font-black text-emerald-600 font-display">{stats.correctCount}</div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="p-5 overflow-y-auto max-h-[60vh] space-y-3">
          {BADGES.map((badge) => {
            const isUnlocked = badge.requirement(stats);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-50/70 to-yellow-50/50 border-amber-300 shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  isUnlocked
                    ? 'bg-white border-amber-300 shadow-xs'
                    : 'bg-slate-200 border-slate-300'
                }`}>
                  {isUnlocked ? getIcon(badge.icon, true) : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">
                      {badge.titleGu} ({badge.title})
                    </h3>
                    {isUnlocked && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        અનલોક ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all"
          >
            રમત ચાલુ રાખો (Continue Playing)
          </button>
        </div>
      </div>
    </div>
  );
};
