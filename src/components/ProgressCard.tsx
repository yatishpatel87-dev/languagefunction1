import React, { useState } from 'react';
import { PlayerStats } from '../types';
import { buildTimelineData, MAIN_FUNCTION_CATEGORIES } from '../utils/progressHelper';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { TrendingUp, Maximize2, Sparkles, Target, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ProgressCardProps {
  stats: PlayerStats;
  onOpenFullModal: () => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  stats,
  onOpenFullModal
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const timelineData = buildTimelineData(stats.history || [], stats.solvedPuzzles);

  // Focus on key language functions mentioned in prompt: Requests, Permission, Ability, etc.
  const featuredFunctions = [
    { key: 'Requests', name: 'Requests (વિનંતી)', color: '#8b5cf6' },
    { key: 'Permission', name: 'Permission (પરવાનગી)', color: '#10b981' },
    { key: 'Ability', name: 'Ability (ક્ષમતા)', color: '#3b82f6' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
      {/* Top Header Strip */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800">
                લેંગ્વેજ ફંક્શન પ્રગતિ ટ્રેકર (Function Mastery Over Time)
              </h3>
              <span className="text-[11px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                Recharts Live
              </span>
            </div>
            <p className="text-xs text-slate-500">
              વિનંતી (Requests), પરવાનગી (Permission), અને ક્ષમતા (Ability) નો શીખવાનો આલેખ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="btn-expand-full-chart"
            onClick={() => {
              sounds.playClick();
              onOpenFullModal();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs transition-all active:scale-95"
            title="સંપૂર્ણ વિશ્લેષણ ખોલો (Full Detailed Analytics)"
          >
            <Maximize2 className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">વિગતવાર ચાર્ટ</span>
          </button>

          <button
            id="btn-toggle-card-collapse"
            onClick={() => {
              sounds.playClick();
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            title={isExpanded ? "ચાર્ટ સંકોચો" : "ચાર્ટ વિસ્તારો"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Chart Area */}
      {isExpanded && (
        <div className="p-3.5 sm:p-4 pt-2">
          {/* Quick Metrics mini tags */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                Requests: <strong className="text-slate-800">{timelineData[timelineData.length - 1]?.Requests || 0}</strong>
              </span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Permission: <strong className="text-slate-800">{timelineData[timelineData.length - 1]?.Permission || 0}</strong>
              </span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                Ability: <strong className="text-slate-800">{timelineData[timelineData.length - 1]?.Ability || 0}</strong>
              </span>
            </div>

            <span className="text-[11px] text-slate-400">
              કુલ ઉકેલ: <strong className="text-amber-700">{stats.solvedPuzzles.length}</strong> પઝલ
            </span>
          </div>

          {/* Recharts Area Container */}
          <div className="w-full h-52 sm:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={timelineData} 
                margin={{ top: 8, right: 15, left: -15, bottom: 0 }}
              >
                <defs>
                  {featuredFunctions.map(fn => (
                    <linearGradient key={fn.key} id={`inline-grad-${fn.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={fn.color} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={fn.color} stopOpacity={0.02} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="timeLabel" 
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11}
                  allowDecimals={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '10px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                    fontSize: '11px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }}
                />
                {featuredFunctions.map(fn => (
                  <Area
                    key={fn.key}
                    type="monotone"
                    dataKey={fn.key}
                    name={fn.name}
                    stroke={fn.color}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill={`url(#inline-grad-${fn.key})`}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
