import React, { useState } from 'react';
import { PlayerStats } from '../types';
import { 
  buildTimelineData, 
  buildFunctionBreakdownData, 
  MAIN_FUNCTION_CATEGORIES,
  FunctionCategoryInfo 
} from '../utils/progressHelper';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  X, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Flame, 
  BookOpen,
  Filter,
  Info
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface ProgressChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
}

type ChartViewType = 'timeline' | 'breakdown' | 'accuracy';

export const ProgressChartModal: React.FC<ProgressChartModalProps> = ({
  isOpen,
  onClose,
  stats
}) => {
  const [activeView, setActiveView] = useState<ChartViewType>('timeline');
  
  // Selected functions for timeline display
  const [selectedFunctionIds, setSelectedFunctionIds] = useState<string[]>([
    'Requests',
    'Permission',
    'Ability',
    'Advice',
    'Comparison'
  ]);

  if (!isOpen) return null;

  const timelineData = buildTimelineData(stats.history || [], stats.solvedPuzzles);
  const breakdownData = buildFunctionBreakdownData(stats.history || [], stats.solvedPuzzles);

  // Compute summary stats
  const totalSolved = stats.solvedPuzzles.length;
  const overallAccuracy = stats.totalAnswered > 0 
    ? Math.round((stats.correctCount / stats.totalAnswered) * 100) 
    : 100;
  
  // Find top function
  const sortedBySolved = [...breakdownData].sort((a, b) => b.solved - a.solved);
  const topFunction = sortedBySolved[0]?.solved > 0 
    ? sortedBySolved[0] 
    : { nameEn: 'Requests & Ability', nameGu: 'વિનંતી અને ક્ષમતા' };

  const toggleFunctionSelection = (id: string) => {
    sounds.playClick();
    if (selectedFunctionIds.includes(id)) {
      if (selectedFunctionIds.length > 1) {
        setSelectedFunctionIds(selectedFunctionIds.filter(f => f !== id));
      }
    } else {
      setSelectedFunctionIds([...selectedFunctionIds, id]);
    }
  };

  const activeCategories = MAIN_FUNCTION_CATEGORIES.filter(cat => 
    selectedFunctionIds.includes(cat.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-800">
                  લેંગ્વેજ ફંક્શન પ્રગતિ ચાર્ટ (Progress Analytics)
                </h3>
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                  Live Over Time
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                વિનંતી (Requests), પરવાનગી (Permission), ક્ષમતા (Ability) અને અન્ય ફંક્શન્સની સમય સાથે પ્રગતિ
              </p>
            </div>
          </div>
          <button
            id="btn-close-progress-modal"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="બંધ કરો (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-800">કુલ ઉકેલાયેલા (Solved)</span>
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
              </div>
              <div className="mt-1 text-2xl font-bold text-amber-950 font-display">
                {totalSolved}
                <span className="text-xs font-normal text-amber-700 ml-1">પઝલ્સ</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-800">સચોટતા દર (Accuracy)</span>
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div className="mt-1 text-2xl font-bold text-blue-950 font-display">
                {overallAccuracy}%
                <span className="text-xs font-normal text-blue-700 ml-1">સાચા જવાબો</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-800">શ્રેષ્ઠ ફંક્શન (Top Area)</span>
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div className="mt-1 text-base font-bold text-purple-950 truncate" title={topFunction.nameEn}>
                {topFunction.nameEn}
              </div>
              <div className="text-[11px] text-purple-700 truncate">{topFunction.nameGu}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-orange-800">હાલનો સ્ટ્રીક (Streak)</span>
                <Flame className="w-4 h-4 text-orange-600" />
              </div>
              <div className="mt-1 text-2xl font-bold text-orange-950 font-display">
                {stats.streak}
                <span className="text-xs font-normal text-orange-700 ml-1">સળંગ સાચા</span>
              </div>
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-1">
              <button
                id="btn-view-timeline"
                onClick={() => {
                  sounds.playClick();
                  setActiveView('timeline');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeView === 'timeline'
                    ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>સમય સાથે પ્રગતિ (Timeline Over Time)</span>
              </button>

              <button
                id="btn-view-breakdown"
                onClick={() => {
                  sounds.playClick();
                  setActiveView('breakdown');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeView === 'breakdown'
                    ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                <span>ફંક્શન સરખામણી (Breakdown)</span>
              </button>

              <button
                id="btn-view-accuracy"
                onClick={() => {
                  sounds.playClick();
                  setActiveView('accuracy');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeView === 'accuracy'
                    ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>ચોકસાઈ ટ્રેન્ડ (Accuracy Trend)</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1 px-2">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>પઝલ રમવાથી ચાર્ટ આપમેળે અપડેટ થાય છે</span>
            </div>
          </div>

          {/* Filter Chips for Timeline View */}
          {activeView === 'timeline' && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                ફંક્શન્સ પસંદ કરો:
              </span>
              {MAIN_FUNCTION_CATEGORIES.map(cat => {
                const isSelected = selectedFunctionIds.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    id={`btn-filter-${cat.id}`}
                    onClick={() => toggleFunctionSelection(cat.id)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-semibold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${cat.badgeBg} ${cat.badgeBorder} ${cat.badgeText} shadow-2xs`
                        : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span 
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: isSelected ? cat.color : '#cbd5e1' }}
                    />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Chart Canvas Area */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 min-h-[340px] flex flex-col justify-center">
            {activeView === 'timeline' && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    કુલ માસ્ટર થયેલા પ્રશ્નો (Cumulative Solved Questions Over Time)
                  </h4>
                  <span className="text-xs text-slate-500">
                    X-Axis: સમય/સત્રો • Y-Axis: ઉકેલેલા પ્રશ્નો
                  </span>
                </div>
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={timelineData} 
                      margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
                    >
                      <defs>
                        {activeCategories.map(cat => (
                          <linearGradient key={cat.id} id={`grad-${cat.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={cat.color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={cat.color} stopOpacity={0.02} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis 
                        dataKey="timeLabel" 
                        stroke="#64748b" 
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={11}
                        allowDecimals={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          borderRadius: '12px', 
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          fontSize: '12px'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      />
                      {activeCategories.map(cat => (
                        <Area
                          key={cat.id}
                          type="monotone"
                          dataKey={cat.id}
                          name={`${cat.name} (${cat.nameGu.split(' ')[0]})`}
                          stroke={cat.color}
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill={`url(#grad-${cat.id})`}
                          activeDot={{ r: 5, strokeWidth: 2 }}
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeView === 'breakdown' && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    દરેક લેંગ્વેજ ફંક્શનમાં પ્રદર્શન (Function Mastery Comparison)
                  </h4>
                  <span className="text-xs text-slate-500">
                    સાચા જવાબો vs કુલ પ્રયાસો
                  </span>
                </div>
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={breakdownData}
                      margin={{ top: 10, right: 20, left: -10, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis 
                        dataKey="nameEn" 
                        stroke="#64748b" 
                        fontSize={11}
                        tickLine={false}
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={11}
                        allowDecimals={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          borderRadius: '12px', 
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          fontSize: '12px'
                        }}
                        formatter={(value, name) => {
                          if (name === 'solved') return [`${value} પઝલ્સ`, 'સાચા જવાબો (Correct)'];
                          if (name === 'attempted') return [`${value} વાર`, 'કુલ પ્રયાસ (Attempted)'];
                          return [value, name];
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      />
                      <Bar 
                        dataKey="solved" 
                        name="સાચા જવાબો (Correct / Solved)" 
                        fill="#10b981" 
                        radius={[6, 6, 0, 0]} 
                      />
                      <Bar 
                        dataKey="attempted" 
                        name="કુલ પ્રયાસ (Attempted)" 
                        fill="#cbd5e1" 
                        radius={[6, 6, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeView === 'accuracy' && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    સમય સાથે ચોકસાઈનો સુધારો (Accuracy Percentage Over Time)
                  </h4>
                  <span className="text-xs text-slate-500">
                    ધ્યેય: ૯૦%+ નિપુણતા (Target: 90%+ Mastery)
                  </span>
                </div>
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timelineData}
                      margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis 
                        dataKey="timeLabel" 
                        stroke="#64748b" 
                        fontSize={11}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        stroke="#64748b" 
                        fontSize={11}
                        unit="%"
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          borderRadius: '12px', 
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          fontSize: '12px'
                        }}
                        formatter={(value) => [`${value}%`, 'સચોટતા દર (Accuracy)']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        name="ચોકસાઈ દર (Accuracy %)" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Function Progress Cards Grid */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>વિગતવાર ક્ષમતા વિહંગાવલોકન (Language Function Mastery Cards)</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {breakdownData.map(item => (
                <div 
                  key={item.category}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: item.color }}
                        />
                        <h5 className="text-sm font-bold text-slate-800">{item.nameEn}</h5>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{item.nameGu}</p>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.accuracy}%
                    </span>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-1">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, Math.max(8, item.accuracy))}%`, 
                          backgroundColor: item.color 
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>ઉકેલ: <strong className="text-slate-800">{item.solved}</strong></span>
                      <span className="text-amber-800 font-semibold">{item.proficiencyGrade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            ધોરણ ૬ થી ૮ અંગ્રેજી વ્યાકરણ અને લેંગ્વેજ ફંક્શન્સ ટ્રેકિંગ
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all active:scale-95"
          >
            સમજાયું (Got it)
          </button>
        </div>
      </div>
    </div>
  );
};
