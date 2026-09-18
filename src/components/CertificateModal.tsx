import React, { useState, useEffect } from 'react';
import { PlayerStats, GradeLevel } from '../types';
import { sounds } from '../utils/audio';
import { FirecrackersCanvas } from './FirecrackersCanvas';
import { 
  Award, 
  X, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Star, 
  Trophy, 
  Edit3, 
  RotateCcw,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  currentGrade: GradeLevel;
  onPlayAgain?: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  stats,
  currentGrade,
  onPlayAgain
}) => {
  const [studentName, setStudentName] = useState<string>(stats.studentName || 'વિદ્યાર્થી (Student)');
  const [isEditingName, setIsEditingName] = useState(false);
  const [firecrackersActive, setFirecrackersActive] = useState(true);
  const [certificateId, setCertificateId] = useState('');
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (stats.studentName) {
        setStudentName(stats.studentName);
      }
      // Trigger fanfare and firecrackers
      setFirecrackersActive(true);
      sounds.playFanfare();

      // Generate unique cert code
      const randNum = Math.floor(100000 + Math.random() * 900000);
      setCertificateId(`LFQ-GJ-${randNum}`);

      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setIssueDate(now.toLocaleDateString('gu-IN', options));

      // Keep firecrackers blowing intensely for 8 seconds, then can be re-triggered
      const timer = setTimeout(() => {
        setFirecrackersActive(false);
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalQuestions = Math.max(stats.totalAnswered, 30);
  const correctCount = stats.correctCount > 0 ? stats.correctCount : 30;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;

  const gradeText = currentGrade === 'all' 
    ? 'ધોરણ ૬ થી ૮ (Grades 6 to 8)' 
    : `ધોરણ ${currentGrade} (Grade ${currentGrade})`;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleBurstMore = () => {
    sounds.playClick();
    setFirecrackersActive(false);
    setTimeout(() => {
      setFirecrackersActive(true);
      sounds.playFirecrackerBurst();
    }, 50);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Dynamic Celebration Firecrackers Canvas */}
      <FirecrackersCanvas active={firecrackersActive} intensity="high" />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-200 my-auto">
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-300">
                અભિનંદન! તમારું પ્રમાણપત્ર તૈયાર છે (Certificate of Excellence)
              </h3>
              <p className="text-[11px] text-slate-400">
                {firecrackersActive ? '🎆 ફટાકડા ફોડવાની ઉજવણી ચાલુ છે!' : '✨ તમે ૩૦ પ્રશ્નો સફળતાપૂર્વક પૂર્ણ કર્યા છે.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-burst-firecrackers"
              onClick={handleBurstMore}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
              title="ફરીથી ફટાકડા ફોડો (Blow Firecrackers Again)"
            >
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>ફટાકડા ફોડો (Firecrackers)</span>
            </button>

            <button
              id="btn-print-certificate"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>પ્રિન્ટ / PDF સેવ કરો</span>
            </button>

            <button
              id="btn-close-certificate"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="બંધ કરો"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Student Name Edit Prompt (Hidden during print) */}
        <div className="no-print bg-amber-50 px-4 py-2.5 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-900">વિદ્યાર્થીનું નામ બદલો:</span>
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="નામ લખો..."
                  className="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-2 py-1 bg-amber-600 text-white font-bold rounded-md hover:bg-amber-700"
                >
                  સાચવો
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded-sm border border-amber-200">
                  {studentName}
                </span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-amber-700 hover:text-amber-900 flex items-center gap-0.5 underline font-medium"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>નામ એડિટ કરો</span>
                </button>
              </div>
            )}
          </div>
          <span className="text-[11px] text-amber-700">
            પ્રિન્ટ કરતી વખતે આ પ્રમાણપત્ર સુંદર અને સત્તાવાર રીતે છપાશે.
          </span>
        </div>

        {/* PRINTABLE CERTIFICATE AREA */}
        <div 
          id="printable-certificate"
          className="p-5 sm:p-10 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 text-slate-800 relative select-text"
        >
          {/* Royal Outer Gold Border */}
          <div className="border-[7px] border-amber-600 rounded-xl p-3 sm:p-5 relative bg-white shadow-inner">
            {/* Inner Thin Double Line */}
            <div className="border border-amber-300 rounded-lg p-5 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600" />

              {/* Top Header & Insignia */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md">
                  <Award className="w-7 h-7" />
                </div>
              </div>

              <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-800 uppercase mb-1">
                ગુજરાત માધ્યમિક શિક્ષણ અભ્યાસક્રમ • NCERT / GSEB
              </span>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-950 font-display tracking-tight mb-1">
                CERTIFICATE OF EXCELLENCE
              </h1>
              <h2 className="text-sm sm:text-base font-bold text-amber-700 mb-4">
                અંગ્રેજી ભાષા કાર્ય અને વ્યાકરણ સિદ્ધિ પ્રમાણપત્ર
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 italic max-w-lg mb-4">
                This prestigious certificate is proudly presented to
              </p>

              {/* Student Name */}
              <div className="mb-4">
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 border-b-2 border-amber-500 pb-1.5 px-8 inline-block tracking-wide font-display">
                  {studentName}
                </h3>
              </div>

              {/* Completion Statement */}
              <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed mb-5">
                સફળતાપૂર્વક <strong className="text-amber-900">{gradeText}</strong> ના કુલ <strong>૩૦ પ્રશ્નો (30 Questions)</strong> પૂર્ણ કરી અંગ્રેજી <strong>Language Functions</strong> (વિનંતી, પરવાનગી, ક્ષમતા, સલાહ, સરખામણી, ફરજ) માં ઉત્કૃષ્ટ પ્રદર્શન દાખવવા બદલ આ પ્રમાણપત્ર એનાયત કરવામાં આવે છે.
              </p>

              {/* Metrics & Performance Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl mb-6">
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                  <span className="block text-[11px] text-amber-700 font-medium">કુલ પ્રશ્નો</span>
                  <span className="text-lg font-bold text-amber-900">{totalQuestions} / {totalQuestions}</span>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <span className="block text-[11px] text-emerald-700 font-medium">ચોકસાઈ (Accuracy)</span>
                  <span className="text-lg font-bold text-emerald-900">{accuracy}%</span>
                </div>
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <span className="block text-[11px] text-blue-700 font-medium">મેળવેલ સ્કોર</span>
                  <span className="text-lg font-bold text-blue-900">{stats.score} PTS</span>
                </div>
                <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-center">
                  <span className="block text-[11px] text-purple-700 font-medium">મેળવેલ સ્ટાર્સ</span>
                  <span className="text-lg font-bold text-purple-900 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{stats.stars}</span>
                  </span>
                </div>
              </div>

              {/* Language Functions Mastered Tags */}
              <div className="mb-6 w-full max-w-2xl">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  આવરી લીધેલ મુખ્ય લેંગ્વેજ ફંક્શન્સ (Mastered Functions):
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-700">
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 font-semibold">✓ Making Requests</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 font-semibold">✓ Seeking Permission</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 font-semibold">✓ Expressing Ability</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 font-semibold">✓ Giving Advice</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 font-semibold">✓ Comparing Things</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 font-semibold">✓ Expressing Obligation</span>
                </div>
              </div>

              {/* Bottom Signatures & Seal */}
              <div className="w-full max-w-2xl pt-4 border-t border-amber-200/80 flex items-center justify-between gap-4 text-left">
                {/* Issue Date & ID */}
                <div>
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">તારીખ (Date of Issue)</span>
                  <span className="text-xs font-semibold text-slate-700">{issueDate}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">ID: {certificateId}</span>
                </div>

                {/* Golden Seal Emblem */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-amber-600 shadow-xs relative">
                    <ShieldCheck className="w-7 h-7" />
                    <div className="absolute -bottom-1 text-[8px] bg-amber-600 text-white font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                      VERIFIED
                    </div>
                  </div>
                  <span className="text-[9px] text-amber-800 font-bold mt-1">GSEB COMPLIANT</span>
                </div>

                {/* Signatures */}
                <div className="text-right">
                  <span className="block text-xs font-serif italic text-amber-900 font-bold underline decoration-amber-400">
                    Language Quest Committee
                  </span>
                  <span className="block text-[10px] uppercase text-slate-400 font-bold mt-0.5">
                    મુખ્ય માર્ગદર્શક / પરીક્ષક
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer Controls (Hidden during print) */}
        <div className="no-print bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-slate-500">
            તમે ગમે ત્યારે આ પ્રમાણપત્ર પ્રિન્ટ કરી શકો છો અથવા PDF તરીકે સાચવી શકો છો.
          </div>

          <div className="flex items-center gap-2">
            {onPlayAgain && (
              <button
                id="btn-cert-play-again"
                onClick={() => {
                  onClose();
                  onPlayAgain();
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ફરીથી રમો (Play Again)</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>પ્રિન્ટ / PDF ડાઉનલોડ કરો</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
