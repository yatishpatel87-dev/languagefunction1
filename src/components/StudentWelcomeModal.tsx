import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { sounds } from '../utils/audio';
import { Sparkles, User, GraduationCap, ArrowRight, Shield, Star, AlertCircle } from 'lucide-react';

interface StudentWelcomeModalProps {
  isOpen: boolean;
  onSaveName: (name: string, grade: GradeLevel, avatar: string) => void;
  initialName?: string;
  initialGrade?: GradeLevel;
  initialAvatar?: string;
  isChangingName?: boolean;
  onCancelChange?: () => void;
}

const AVATARS = [
  { id: 'detective', emoji: '🕵️‍♂️', label: 'ડિટેક્ટીવ' },
  { id: 'star', emoji: '⭐', label: 'સુપરસ્ટાર' },
  { id: 'rocket', emoji: '🚀', label: 'રોકેટ' },
  { id: 'lion', emoji: '🦁', label: 'સિંહ' },
  { id: 'trophy', emoji: '🏆', label: 'ચેમ્પિયન' },
  { id: 'owl', emoji: '🦉', label: 'ડાહ્યો ઘુવડ' },
  { id: 'butterfly', emoji: '🦋', label: 'પતંગિયું' },
  { id: 'scholar', emoji: '🎓', label: 'વિદ્વાન' }
];

export const StudentWelcomeModal: React.FC<StudentWelcomeModalProps> = ({
  isOpen,
  onSaveName,
  initialName = '',
  initialGrade = 'all',
  initialAvatar = 'detective',
  isChangingName = false,
  onCancelChange
}) => {
  const [name, setName] = useState(initialName);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      sounds.playWrong();
      setError('કૃપા કરીને તમારું નામ લખો! (Please enter your name)');
      return;
    }
    if (trimmed.length < 2) {
      sounds.playWrong();
      setError('નામ ઓછામાં ઓછા ૨ અક્ષરનું હોવું જોઈએ! (Name must be at least 2 characters)');
      return;
    }

    sounds.playLevelUp();
    onSaveName(trimmed, selectedGrade, selectedAvatar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300">
        
        {/* Playful Top Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-white text-center relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 rounded-full bg-white/10 blur-md pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-28 h-28 rounded-full bg-white/10 blur-md pointer-events-none" />

          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-md border border-white/30">
            {AVATARS.find(a => a.id === selectedAvatar)?.emoji || '🌟'}
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight font-display">
            Language Function Quest
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1">
            {isChangingName 
              ? 'વિદ્યાર્થીનું નામ અથવા પ્રોફાઇલ બદલો' 
              : 'ગેમ શરૂ કરવા માટે પહેલા તમારું નામ દાખલ કરો'}
          </p>
        </div>

        {/* Name Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
          
          {/* Child's Name Input Field */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-600" />
                <span>તમારું શુભ નામ (Student's Name):</span>
              </span>
              <span className="text-[11px] text-amber-700 font-normal">
                * ફરજિયાત (Required)
              </span>
            </label>

            <div className="relative">
              <input
                id="input-student-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="દા.ત. આરવ પટેલ / Aarav Patel"
                maxLength={40}
                className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base font-bold text-slate-900 bg-slate-50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden transition-all shadow-2xs ${
                  error 
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' 
                    : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                }`}
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-600 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <p className="text-[11px] text-slate-500 mt-1.5">
              આ નામથી તમારો સ્કોર સચવાશે અને પ્રશ્નો પૂર્ણ થવા પર સિદ્ધિ પ્રમાણપત્ર છપાશે!
            </p>
          </div>

          {/* Grade Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>તમારું ધોરણ પસંદ કરો (Select Grade):</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { val: 'all' as GradeLevel, label: 'બધા ધોરણ', sub: 'Std 6 to 8' },
                { val: 6 as GradeLevel, label: 'ધોરણ ૬', sub: 'Grade 6' },
                { val: 7 as GradeLevel, label: 'ધોરણ ૭', sub: 'Grade 7' },
                { val: 8 as GradeLevel, label: 'ધોરણ ૮', sub: 'Grade 8' },
              ].map((g) => (
                <button
                  type="button"
                  key={g.val}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedGrade(g.val);
                  }}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    selectedGrade === g.val
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50/50 text-xs font-medium'
                  }`}
                >
                  <span className="block text-xs font-bold">{g.label}</span>
                  <span className="block text-[10px] opacity-80">{g.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Icon Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>તમારો અવતાર પસંદ કરો (Choose Avatar):</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedAvatar(av.id);
                  }}
                  className={`h-11 rounded-xl flex items-center justify-center text-xl transition-all border ${
                    selectedAvatar === av.id
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 scale-110 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={av.label}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            {isChangingName && onCancelChange && (
              <button
                type="button"
                onClick={onCancelChange}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all"
              >
                રદ કરો (Cancel)
              </button>
            )}

            <button
              id="btn-start-game-welcome"
              type="submit"
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{isChangingName ? 'સાચવો અને ચાલુ રાખો' : 'રમત શરૂ કરો (Start Game)'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Bottom Educational Note */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>GSEB અને NCERT માળખા આધારિત અંગ્રેજી શિક્ષણ અને રમત</span>
        </div>

      </div>
    </div>
  );
};
