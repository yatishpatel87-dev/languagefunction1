export interface LeaderboardEntry {
  id: string;
  name: string;
  nameGu: string;
  avatar: string;
  stars: number;
  score: number;
  grade: 6 | 7 | 8 | 'all';
  schoolOrCity: string;
  streak: number;
  badgeTitle: string;
  isUser?: boolean;
}

export const INITIAL_GLOBAL_TOP_10: LeaderboardEntry[] = [
  {
    id: 'g-1',
    name: 'Aayush Parikh',
    nameGu: 'આયુષ પરીખ',
    avatar: '🏆',
    stars: 36,
    score: 1850,
    grade: 8,
    schoolOrCity: 'અમદાવાદ (Ahmedabad)',
    streak: 15,
    badgeTitle: 'લેંગ્વેજ માસ્ટર'
  },
  {
    id: 'g-2',
    name: 'Dhruvi Vaghela',
    nameGu: 'ધ્રુવી વાઘેલા',
    avatar: '⭐',
    stars: 34,
    score: 1720,
    grade: 7,
    schoolOrCity: 'સુરત (Surat)',
    streak: 12,
    badgeTitle: 'ગ્રામર ડિટેક્ટીવ'
  },
  {
    id: 'g-3',
    name: 'Manav Trivedi',
    nameGu: 'માનવ ત્રિવેદી',
    avatar: '🚀',
    stars: 32,
    score: 1600,
    grade: 8,
    schoolOrCity: 'રાજકોટ (Rajkot)',
    streak: 10,
    badgeTitle: 'ફંક્શન વિઝાર્ડ'
  },
  {
    id: 'g-4',
    name: 'Kavya Choksi',
    nameGu: 'કાવ્યા ચોકસી',
    avatar: '🦉',
    stars: 30,
    score: 1540,
    grade: 6,
    schoolOrCity: 'વડોદરા (Vadodara)',
    streak: 9,
    badgeTitle: 'સ્માર્ટ સ્કોલર'
  },
  {
    id: 'g-5',
    name: 'Zeel Patel',
    nameGu: 'ઝીલ પટેલ',
    avatar: '🦁',
    stars: 28,
    score: 1420,
    grade: 7,
    schoolOrCity: 'ભાવનગર (Bhavnagar)',
    streak: 8,
    badgeTitle: 'વોકેબ ચેમ્પ'
  },
  {
    id: 'g-6',
    name: 'Devanshu Bhatt',
    nameGu: 'દેવાંશુ ભટ્ટ',
    avatar: '🎓',
    stars: 27,
    score: 1390,
    grade: 8,
    schoolOrCity: 'ગાંધીનગર (Gandhinagar)',
    streak: 7,
    badgeTitle: 'સુપર સ્ટ્રીકર'
  },
  {
    id: 'g-7',
    name: 'Prachi Solanki',
    nameGu: 'પ્રાચી સોલંકી',
    avatar: '🦋',
    stars: 25,
    score: 1280,
    grade: 6,
    schoolOrCity: 'જામનગર (Jamnagar)',
    streak: 6,
    badgeTitle: 'સ્ક્રેમ્બલ કિંગ'
  },
  {
    id: 'g-8',
    name: 'Meet Barot',
    nameGu: 'મીત બારોટ',
    avatar: '🕵️‍♂️',
    stars: 24,
    score: 1210,
    grade: 7,
    schoolOrCity: 'આણંદ (Anand)',
    streak: 6,
    badgeTitle: 'રૂલ એક્સપ્લોરર'
  },
  {
    id: 'g-9',
    name: 'Riddhi Rawal',
    nameGu: 'રિદ્ધિ રાવલ',
    avatar: '⭐',
    stars: 23,
    score: 1180,
    grade: 6,
    schoolOrCity: 'જુનાગઢ (Junagadh)',
    streak: 5,
    badgeTitle: 'સ્ટાર લર્નર'
  },
  {
    id: 'g-10',
    name: 'Vansh Soni',
    nameGu: 'વંશ સોની',
    avatar: '🚀',
    stars: 22,
    score: 1120,
    grade: 8,
    schoolOrCity: 'મહેસાણા (Mehsana)',
    streak: 5,
    badgeTitle: 'ફાસ્ટ ફિનિશર'
  }
];

export const INITIAL_FRIENDS_LIST: LeaderboardEntry[] = [
  {
    id: 'f-1',
    name: 'Diya Shah',
    nameGu: 'દિયા શાહ',
    avatar: '⭐',
    stars: 18,
    score: 920,
    grade: 7,
    schoolOrCity: 'વર્ગખંડ મિત્ર (Classmate)',
    streak: 6,
    badgeTitle: 'હોશિયાર વિદ્યાર્થી'
  },
  {
    id: 'f-2',
    name: 'Rohan Joshi',
    nameGu: 'રોહન જોશી',
    avatar: '🚀',
    stars: 14,
    score: 720,
    grade: 7,
    schoolOrCity: 'વર્ગખંડ મિત્ર (Classmate)',
    streak: 4,
    badgeTitle: 'ડિટેક્ટીવ સાથી'
  },
  {
    id: 'f-3',
    name: 'Ananya Vyas',
    nameGu: 'અનન્યા વ્યાસ',
    avatar: '🦋',
    stars: 11,
    score: 590,
    grade: 7,
    schoolOrCity: 'શાળા મિત્ર (School Friend)',
    streak: 3,
    badgeTitle: 'વોકેબ પાર્ટનર'
  },
  {
    id: 'f-4',
    name: 'Krunal Pandya',
    nameGu: 'કૃણાલ પંડ્યા',
    avatar: '🦁',
    stars: 8,
    score: 410,
    grade: 7,
    schoolOrCity: 'વર્ગખંડ મિત્ર (Classmate)',
    streak: 3,
    badgeTitle: 'સ્ટ્રીક લવર'
  },
  {
    id: 'f-5',
    name: 'Sneha Desai',
    nameGu: 'સ્નેહા દેસાઈ',
    avatar: '🦉',
    stars: 6,
    score: 320,
    grade: 7,
    schoolOrCity: 'પડોશી મિત્ર (Study Buddy)',
    streak: 2,
    badgeTitle: 'નિયમિત વિદ્યાર્થી'
  },
  {
    id: 'f-6',
    name: 'Yash Rathod',
    nameGu: 'યશ રાઠોડ',
    avatar: '🕵️‍♂️',
    stars: 4,
    score: 210,
    grade: 7,
    schoolOrCity: 'શાળા મિત્ર (School Friend)',
    streak: 1,
    badgeTitle: 'નવો સ્પર્ધક'
  },
  {
    id: 'f-7',
    name: 'Pooja Dave',
    nameGu: 'પૂજા દવે',
    avatar: '🎓',
    stars: 2,
    score: 110,
    grade: 7,
    schoolOrCity: 'વર્ગખંડ મિત્ર (Classmate)',
    streak: 1,
    badgeTitle: 'શિખાઉ ખેલાડી'
  }
];
