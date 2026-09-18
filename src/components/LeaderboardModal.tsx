import React, { useState, useMemo } from 'react';
import { PlayerStats, GradeLevel } from '../types';
import { INITIAL_GLOBAL_TOP_10, INITIAL_FRIENDS_LIST, LeaderboardEntry } from '../data/leaderboardData';
import { sounds } from '../utils/audio';
import { 
  Trophy, 
  Users, 
  Globe, 
  X, 
  Star, 
  Flame, 
  Medal, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Share2, 
  UserPlus, 
  CheckCircle2,
  Crown,
  ChevronRight
} from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  currentGrade: GradeLevel;
}

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

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  stats,
  currentGrade
}) => {
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');
  const [gradeFilter, setGradeFilter] = useState<GradeLevel>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Derive the user's avatar emoji
  const userAvatarEmoji = AVATAR_MAP[stats.studentAvatar || 'detective'] || '🕵️‍♂️';
  const userName = stats.studentName || 'તમે (You)';

  // Build the user entry
  const userEntry: LeaderboardEntry = useMemo(() => {
    const gradeNum = typeof currentGrade === 'number' ? currentGrade : 7;
    return {
      id: 'user-current',
      name: userName,
      nameGu: userName,
      avatar: userAvatarEmoji,
      stars: stats.stars,
      score: stats.score,
      grade: gradeNum,
      schoolOrCity: 'તમારું સ્થાન (Your Profile)',
      streak: stats.streak,
      badgeTitle: stats.stars >= 25 ? 'લેંગ્વેજ માસ્ટર' : stats.stars >= 10 ? 'ગ્રામર ડિટેક્ટીવ' : 'ઉભરતો સ્ટાર',
      isUser: true
    };
  }, [userName, userAvatarEmoji, stats.stars, stats.score, stats.streak, currentGrade]);

  // Global ranking list (merged with user if applicable, sorted strictly by stars then score)
  const globalLeaderboard = useMemo(() => {
    const list = [...INITIAL_GLOBAL_TOP_10];
    
    // Add user into the consideration pool
    list.push(userEntry);

    // Sort by stars descending, then by score descending
    list.sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.score - a.score;
    });

    // Assign rank
    const ranked = list.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    // Filter by grade if selected
    if (gradeFilter !== 'all') {
      return ranked.filter(item => item.grade === gradeFilter);
    }

    return ranked;
  }, [userEntry, gradeFilter]);

  // Top 10 for Global
  const top10Global = useMemo(() => {
    return globalLeaderboard.slice(0, 10);
  }, [globalLeaderboard]);

  // User position in Global
  const userGlobalRank = useMemo(() => {
    const index = globalLeaderboard.findIndex(item => item.isUser);
    return index !== -1 ? index + 1 : 11;
  }, [globalLeaderboard]);

  const userInTop10Global = userGlobalRank <= 10;
  const starsNeededForGlobalTop10 = useMemo(() => {
    if (userInTop10Global) return 0;
    const tenthItem = top10Global[top10Global.length - 1];
    if (!tenthItem) return 1;
    return Math.max(1, (tenthItem.stars - stats.stars) + 1);
  }, [userInTop10Global, top10Global, stats.stars]);

  // Friends ranking list (User is always included and dynamically ranked)
  const friendsLeaderboard = useMemo(() => {
    const list = [...INITIAL_FRIENDS_LIST, userEntry];

    // Sort strictly by stars descending, then score descending
    list.sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.score - a.score;
    });

    // Assign rank
    const ranked = list.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

    if (gradeFilter !== 'all') {
      return ranked.filter(item => item.grade === gradeFilter);
    }

    return ranked;
  }, [userEntry, gradeFilter]);

  const userFriendsRank = useMemo(() => {
    const index = friendsLeaderboard.findIndex(item => item.isUser);
    return index !== -1 ? index + 1 : friendsLeaderboard.length;
  }, [friendsLeaderboard]);

  const friendAhead = useMemo(() => {
    if (userFriendsRank <= 1) return null;
    return friendsLeaderboard[userFriendsRank - 2];
  }, [friendsLeaderboard, userFriendsRank]);

  const handleShareCode = () => {
    sounds.playClick();
    const code = `QUEST-GJ-${Math.floor(1000 + Math.random() * 9000)}`;
    navigator.clipboard?.writeText(
      `Language Function Quest - મેં ${stats.stars} ⭐ મેળવ્યા છે! મારી સાથે રમો અને શીખો. ક્વેસ્ટ કોડ: ${code}`
    );
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="leaderboard-modal"
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 sm:p-5 text-white relative">
          <button
            id="btn-close-leaderboard"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all"
            title="બંધ કરો (Close)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-inner shrink-0">
              <Trophy className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight font-display">
                  લીડરબોર્ડ (Leaderboard)
                </h2>
                <span className="text-[11px] font-bold bg-white/25 px-2 py-0.5 rounded-full">
                  ગુજરાત Std 6-8
                </span>
              </div>
              <p className="text-xs text-amber-100 mt-0.5">
                કુલ સ્ટાર્સ (Stars) અને સ્કોરના આધારે શ્રેષ્ઠ વિદ્યાર્થીઓની યાદી
              </p>
            </div>
          </div>

          {/* Tab Controls: Global vs Friends */}
          <div className="mt-4 grid grid-cols-2 gap-2 bg-black/15 p-1 rounded-2xl">
            <button
              id="tab-global-leaderboard"
              onClick={() => {
                sounds.playClick();
                setActiveTab('global');
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'global'
                  ? 'bg-white text-amber-900 shadow-md scale-[1.02]'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4 text-amber-600" />
              <span>🌍 ટોપ ૧૦ વૈશ્વિક (Top 10 Global)</span>
            </button>

            <button
              id="tab-friends-leaderboard"
              onClick={() => {
                sounds.playClick();
                setActiveTab('friends');
              }}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                activeTab === 'friends'
                  ? 'bg-white text-amber-900 shadow-md scale-[1.02]'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4 text-orange-600" />
              <span>👥 મિત્રોની સ્પર્ધા (Friends Ranking)</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Filter Bar & User Current Standing Summary */}
        <div className="bg-amber-50/80 px-4 py-2.5 border-b border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
          {/* Grade filter pills */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-600 font-semibold mr-1 hidden sm:inline">ધોરણ:</span>
            {[
              { val: 'all' as GradeLevel, label: 'બધા (All)' },
              { val: 6 as GradeLevel, label: 'Std 6' },
              { val: 7 as GradeLevel, label: 'Std 7' },
              { val: 8 as GradeLevel, label: 'Std 8' }
            ].map(g => (
              <button
                key={g.val}
                onClick={() => {
                  sounds.playClick();
                  setGradeFilter(g.val);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  gradeFilter === g.val
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* User quick status banner */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1 bg-amber-100/90 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
              <span>તમારા સ્ટાર્સ:</span>
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-amber-900 font-black">{stats.stars}</span>
            </span>

            <span className="flex items-center gap-1 bg-orange-100/90 text-orange-900 px-2 py-0.5 rounded-md border border-orange-300">
              <span>રેન્ક:</span>
              <span className="font-black">
                {activeTab === 'global' ? `#${userGlobalRank}` : `#${userFriendsRank}`}
              </span>
            </span>
          </div>
        </div>

        {/* Dynamic Encouragement / Challenge Banner */}
        <div className="px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-amber-200/50 flex items-center justify-between text-xs">
          {activeTab === 'global' ? (
            <div className="flex items-center gap-2 text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              {userInTop10Global ? (
                <span className="font-bold text-amber-900">
                  🎉 અદભુત! તમે ટોપ ૧૦ વૈશ્વિક રેન્કિંગમાં <strong>#{userGlobalRank}</strong> ક્રમે સ્થાન મેળવ્યું છે!
                </span>
              ) : (
                <span>
                  ટોપ ૧૦ લીડરબોર્ડમાં પ્રવેશવા માટે વધુ <strong>{starsNeededForGlobalTop10}</strong> સ્ટાર્સ ⭐ મેળવો!
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-700">
              <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
              {userFriendsRank === 1 ? (
                <span className="font-bold text-emerald-800">
                  👑 વાહ! તમે તમારા મિત્રો અને વર્ગખંડમાં <strong>૧લા નંબરે (Champion)</strong> છો!
                </span>
              ) : friendAhead ? (
                <span>
                  તમે <strong>#{userFriendsRank}</strong> ક્રમે છો. <strong>{friendAhead.nameGu}</strong> ને વટાવવા માત્ર{' '}
                  <strong className="text-amber-800">{(friendAhead.stars - stats.stars) + 1}</strong> વધુ સ્ટાર્સ ⭐ ની જરૂર છે!
                </span>
              ) : (
                <span>નિયમિત પ્રશ્નો ઉકેલીને મિત્રોમાં સૌથી આગળ રહો!</span>
              )}
            </div>
          )}

          {/* Action button in the banner */}
          {activeTab === 'friends' && (
            <button
              id="btn-share-friend-challenge"
              onClick={handleShareCode}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-orange-100 text-orange-800 border border-orange-300 rounded-lg text-[11px] font-bold shadow-2xs transition-all active:scale-95 shrink-0"
              title="મિત્રોને સ્પર્ધા માટે કોડ મોકલો"
            >
              {copiedNotification ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">કોડ કોપી થયો!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>કોડ શેર કરો</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Scrollable Leaderboard List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 divide-y divide-slate-100">
          
          {/* Top 3 Podium Visual Display (When viewing Top 10 or Friends) */}
          {((activeTab === 'global' ? top10Global : friendsLeaderboard).length >= 3) && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 pt-1 pb-3">
              {/* 2nd Place */}
              {(() => {
                const item = (activeTab === 'global' ? top10Global : friendsLeaderboard)[1];
                if (!item) return null;
                return (
                  <div className={`flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border text-center transition-all ${
                    item.isUser 
                      ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-300 shadow-sm' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-xs font-black text-slate-500 mb-1">🥈 ૨જો નંબર</span>
                    <div className="relative text-2xl sm:text-3xl mb-1">
                      {item.avatar}
                      {item.isUser && (
                        <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[9px] font-extrabold px-1 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-slate-800 truncate max-w-full">
                      {item.nameGu}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-black text-amber-700 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{item.stars} ⭐</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">{item.score} PTS</span>
                  </div>
                );
              })()}

              {/* 1st Place Champion */}
              {(() => {
                const item = (activeTab === 'global' ? top10Global : friendsLeaderboard)[0];
                if (!item) return null;
                return (
                  <div className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border text-center relative -translate-y-1 shadow-md transition-all ${
                    item.isUser 
                      ? 'bg-gradient-to-b from-amber-100 to-orange-100 border-amber-500 ring-2 ring-amber-400' 
                      : 'bg-gradient-to-b from-amber-50 to-orange-50/50 border-amber-300'
                  }`}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-0.5 shadow-xs">
                      <Crown className="w-3 h-3 text-amber-100" />
                      <span>વિજેતા</span>
                    </div>
                    <span className="text-xs font-black text-amber-800 mb-1 mt-1">🥇 ૧લો નંબર</span>
                    <div className="relative text-3xl sm:text-4xl mb-1">
                      {item.avatar}
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate max-w-full">
                      {item.nameGu}
                    </span>
                    <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-amber-700 mt-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{item.stars} ⭐</span>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-0.5 font-bold">{item.score} PTS</span>
                  </div>
                );
              })()}

              {/* 3rd Place */}
              {(() => {
                const item = (activeTab === 'global' ? top10Global : friendsLeaderboard)[2];
                if (!item) return null;
                return (
                  <div className={`flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border text-center transition-all ${
                    item.isUser 
                      ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-300 shadow-sm' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-xs font-black text-amber-800 mb-1">🥉 ૩જો નંબર</span>
                    <div className="relative text-2xl sm:text-3xl mb-1">
                      {item.avatar}
                      {item.isUser && (
                        <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[9px] font-extrabold px-1 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold text-xs sm:text-sm text-slate-800 truncate max-w-full">
                      {item.nameGu}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-black text-amber-700 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{item.stars} ⭐</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">{item.score} PTS</span>
                  </div>
                );
              })()}
            </div>
          )}

          {/* List Rows */}
          <div className="space-y-1.5 pt-2">
            {(activeTab === 'global' ? top10Global : friendsLeaderboard).map((entry, index) => {
              const displayRank = index + 1;
              const isCurrentUser = entry.isUser;

              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isCurrentUser
                      ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-400/80 shadow-xs'
                      : displayRank <= 3
                      ? 'bg-amber-50/40 border-amber-200 hover:bg-amber-50/80'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {/* Left: Rank & Avatar & Details */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-7 sm:w-8 text-center shrink-0">
                      {displayRank === 1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-black shadow-xs">
                          🥇
                        </span>
                      ) : displayRank === 2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-800 text-xs font-black shadow-xs">
                          🥈
                        </span>
                      ) : displayRank === 3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white text-xs font-black shadow-xs">
                          🥉
                        </span>
                      ) : (
                        <span className="text-xs sm:text-sm font-bold text-slate-500">
                          #{displayRank}
                        </span>
                      )}
                    </div>

                    {/* Avatar Emoji */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-2xs">
                      {entry.avatar}
                    </div>

                    {/* Names & Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-black text-xs sm:text-sm text-slate-900 truncate">
                          {entry.nameGu}
                        </span>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.2 bg-amber-600 text-white text-[10px] font-extrabold rounded-md">
                            તમે (You)
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md">
                          Std {entry.grade}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="truncate">{entry.schoolOrCity}</span>
                        <span>•</span>
                        <span className="text-amber-800 font-medium truncate">{entry.badgeTitle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stars, Points & Streak */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-right">
                    {/* Streak indicator */}
                    <div className="hidden sm:flex items-center gap-1 text-orange-600 text-xs font-bold" title="સ્ટ્રીક (Streak)">
                      <Flame className="w-3.5 h-3.5 fill-orange-500" />
                      <span>{entry.streak}</span>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-amber-700 font-black text-xs sm:text-sm">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>{entry.stars}</span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-500">
                        {entry.score} <span className="font-normal text-[9px]">PTS</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* If user is NOT in the global Top 10, show persistent sticky bottom card for user's standing */}
          {activeTab === 'global' && !userInTop10Global && (
            <div className="sticky bottom-0 pt-2 pb-1">
              <div className="p-3 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 rounded-2xl border-2 border-amber-400 shadow-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 text-center text-xs font-extrabold text-amber-900 shrink-0">
                    #{userGlobalRank}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-xl shrink-0">
                    {userAvatarEmoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                        {userName}
                      </span>
                      <span className="px-1.5 py-0.2 bg-amber-600 text-white text-[10px] font-black rounded-md">
                        તમે (You)
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-900 font-medium">
                      ટોપ ૧૦ માટે વધુ <strong className="font-bold">{starsNeededForGlobalTop10}</strong> સ્ટાર્સ ⭐ જરૂરી છે!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-900 font-black text-sm shrink-0">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{stats.stars}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info and Close */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span>દરેક સાચા જવાબ અને સ્ટ્રીક સાથે નવા સ્ટાર્સ અને પોઇન્ટ્સ ઉમેરાય છે!</span>
          </div>
          <button
            id="btn-footer-close-leaderboard"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all active:scale-95 shadow-xs"
          >
            સમજાયું (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
