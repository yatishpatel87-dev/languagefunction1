export type GradeLevel = 6 | 7 | 8 | 'all';

export type GameMode = 
  | 'detective'    // Identify the language function in a sentence/dialogue
  | 'scramble'     // Reorder words to construct the function sentence
  | 'grammar'      // Fill in modal, connector, or tense
  | 'vocab_match'  // Match word with synonym/meaning
  | 'word_unscramble'; // Unscramble vocabulary letters

export interface LanguageFunctionInfo {
  id: string;
  name: string;
  gujaratiName: string;
  description: string;
  keywords: string[];
  examples: { en: string; gu: string }[];
  gradeLevel: 6 | 7 | 8;
}

export interface FunctionPuzzle {
  id: string;
  grade: 6 | 7 | 8;
  sentence: string;
  dialogueSpeaker?: string;
  contextGu: string;
  targetFunctionId: string;
  options: string[]; // function names or IDs
  correctAnswer: string;
  explanationEn: string;
  explanationGu: string;
}

export interface SentenceScramblePuzzle {
  id: string;
  grade: 6 | 7 | 8;
  functionName: string;
  functionGu: string;
  correctSentence: string;
  scrambledWords: string[];
  translationGu: string;
  hint: string;
}

export interface GrammarGapPuzzle {
  id: string;
  grade: 6 | 7 | 8;
  functionName: string;
  sentenceWithBlank: string; // e.g. "Rohan ___ swim across the river when he was younger."
  blankOptions: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationGu: string;
}

export interface VocabCardItem {
  id: string;
  word: string;
  match: string; // synonym, antonym, or Gujarati meaning
  type: 'meaning' | 'synonym' | 'antonym';
  grade: 6 | 7 | 8;
}

export interface WordUnscramblePuzzle {
  id: string;
  grade: 6 | 7 | 8;
  word: string; // e.g., "POLITE"
  hintEn: string; // "Showing good manners"
  hintGu: string; // "નમ્ર, સભ્ય વર્તન"
  category: string; // "Function Word", "Adjective", etc.
}

export interface FunctionProgressRecord {
  id: string;
  timestamp: number;
  timeLabel: string;
  functionId: string;
  functionCategory: string; // 'Requests', 'Permission', 'Ability', etc.
  functionGu: string;       // 'વિનંતી', 'પરવાનગી', 'ક્ષમતા', etc.
  isCorrect: boolean;
  scoreGained: number;
  puzzleId: string;
}

export interface PlayerStats {
  score: number;
  streak: number;
  highestStreak: number;
  correctCount: number;
  totalAnswered: number;
  stars: number;
  solvedPuzzles: string[]; // puzzle IDs
  unlockedBadges: string[];
  history?: FunctionProgressRecord[];
  studentName?: string;
  studentAvatar?: string;
}

export interface Badge {
  id: string;
  title: string;
  titleGu: string;
  description: string;
  icon: string;
  requirement: (stats: PlayerStats) => boolean;
}
