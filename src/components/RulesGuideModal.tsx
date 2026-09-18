import React, { useState } from 'react';
import { LANGUAGE_FUNCTIONS } from '../data/curriculumData';
import { GradeLevel } from '../types';
import { X, BookOpen, Volume2, Search, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface RulesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesGuideModal: React.FC<RulesGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredFunctions = LANGUAGE_FUNCTIONS.filter(fn => {
    const matchesGrade = selectedGrade === 'all' || fn.gradeLevel === selectedGrade;
    const matchesSearch = 
      fn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fn.gujaratiName.includes(searchQuery) ||
      fn.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGrade && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-sky-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                લેંગ્વેજ ફંક્શન્સ માર્ગદર્શિકા (Study Guide)
              </h2>
              <p className="text-xs text-slate-500">
                ધોરણ ૬ થી ૮ ના તમામ મુખ્ય Language Functions ના નિયમો અને ઉદાહરણો
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

        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Grade filter tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {(['all', 6, 7, 8] as GradeLevel[]).map(grade => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGrade === grade
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {grade === 'all' ? 'બધા ધોરણ (All)' : `ધોરણ ${grade}`}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="શોધો (Search keywords/rules)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            />
          </div>
        </div>

        {/* Modal Body: Cards List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredFunctions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              કોઈ પરિણામ મળ્યું નથી. કૃપા કરીને શોધ શબ્દ બદલો.
            </div>
          ) : (
            filteredFunctions.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold border border-sky-200">
                      ધોરણ {item.gradeLevel}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 self-start sm:self-auto">
                    {item.gujaratiName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-3">
                  {item.description}
                </p>

                {/* Keywords */}
                <div className="mb-3 flex items-center flex-wrap gap-1.5">
                  <span className="text-xs font-bold text-slate-500 mr-1">મુખ્ય શબ્દો (Key Words):</span>
                  {item.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-xs font-mono font-medium border border-slate-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Examples */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    ઉદાહરણો (Examples):
                  </span>
                  {item.examples.map((ex, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                      <div>
                        <div className="font-semibold text-slate-800">"{ex.en}"</div>
                        <div className="text-slate-500 text-xs">{ex.gu}</div>
                      </div>
                      <button
                        onClick={() => sounds.speakEnglish(ex.en)}
                        className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors shrink-0"
                        title="અવાજમાં સાંભળો"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all"
          >
            બંધ કરો (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
