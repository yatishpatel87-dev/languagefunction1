import React from 'react';
import { GameMode } from '../types';
import { Search, Puzzle, CheckCircle2, Layers, SpellCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode
}) => {
  const modes: {
    id: GameMode;
    titleEn: string;
    titleGu: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'detective',
      titleEn: 'Function Detective',
      titleGu: 'ફંક્શન ઓળખો',
      icon: <Search className="w-4 h-4" />,
      color: 'blue'
    },
    {
      id: 'scramble',
      titleEn: 'Sentence Builder',
      titleGu: 'વાક્ય રચના પઝલ',
      icon: <Puzzle className="w-4 h-4" />,
      color: 'amber'
    },
    {
      id: 'grammar',
      titleEn: 'Grammar Quest',
      titleGu: 'વ્યાકરણ ખાલી જગ્યા',
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: 'emerald'
    },
    {
      id: 'vocab_match',
      titleEn: 'Vocab Match',
      titleGu: 'શબ્દ જોડી પઝલ',
      icon: <Layers className="w-4 h-4" />,
      color: 'purple'
    },
    {
      id: 'word_unscramble',
      titleEn: 'Word Detective',
      titleGu: 'અક્ષર ગોઠવો',
      icon: <SpellCheck className="w-4 h-4" />,
      color: 'rose'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {modes.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              id={`btn-mode-${m.id}`}
              onClick={() => {
                sounds.playClick();
                onSelectMode(m.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md transform -translate-y-0.5'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={`p-1 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {m.icon}
              </span>
              <div className="text-left leading-tight">
                <div>{m.titleGu}</div>
                <div className="text-[10px] font-normal opacity-80">{m.titleEn}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
