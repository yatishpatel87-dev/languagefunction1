import {
  LanguageFunctionInfo,
  FunctionPuzzle,
  SentenceScramblePuzzle,
  GrammarGapPuzzle,
  VocabCardItem,
  WordUnscramblePuzzle,
  Badge
} from '../types';

export const LANGUAGE_FUNCTIONS: LanguageFunctionInfo[] = [
  {
    id: 'ability',
    name: 'Expressing Ability',
    gujaratiName: 'ક્ષમતા / શક્તિ દર્શાવવી',
    description: 'Used to express what someone can or cannot do physically or mentally.',
    keywords: ['can', 'cannot', 'can\'t', 'could', 'able to'],
    examples: [
      { en: 'Kavya can speak three languages fluently.', gu: 'કાવ્યા અસ્ખલિતપણે ત્રણ ભાષાઓ બોલી શકે છે.' },
      { en: 'Birds can fly high in the sky.', gu: 'પક્ષીઓ આકાશમાં ઊંચે ઉડી શકે છે.' },
      { en: 'Rohan could run very fast when he was young.', gu: 'રોહન જ્યારે નાનો હતો ત્યારે ઝડપથી દોડી શકતો હતો.' }
    ],
    gradeLevel: 6
  },
  {
    id: 'permission_seek',
    name: 'Seeking Permission',
    gujaratiName: 'પરવાનગી / રજા માંગવી',
    description: 'Politely asking for authorization or consent to do something.',
    keywords: ['May I', 'Can I', 'Could I', 'Do you mind if'],
    examples: [
      { en: 'May I come in, Sir?', gu: 'સર, શું હું અંદર આવી શકું?' },
      { en: 'Can I borrow your eraser for a minute?', gu: 'શું હું એક મિનિટ માટે તમારું રબર લઈ શકું?' }
    ],
    gradeLevel: 6
  },
  {
    id: 'permission_give',
    name: 'Giving Permission',
    gujaratiName: 'પરવાનગી આપવી',
    description: 'Allowing or granting someone consent to perform an action.',
    keywords: ['You may', 'You can', 'Of course', 'Yes, you may'],
    examples: [
      { en: 'Yes, you may go out to play now.', gu: 'હા, તમે હવે બહાર રમવા જઈ શકો છો.' },
      { en: 'You can submit your homework tomorrow.', gu: 'તમે કાલે તમારું ગૃહકાર્ય જમા કરાવી શકો છો.' }
    ],
    gradeLevel: 6
  },
  {
    id: 'request',
    name: 'Making a Request',
    gujaratiName: 'નમ્ર વિનંતી કરવી',
    description: 'Politely asking someone to do something or help you.',
    keywords: ['Please', 'Could you', 'Would you', 'Kindly', 'Will you please'],
    examples: [
      { en: 'Could you please pass me the salt?', gu: 'શું તમે મહેરબાની કરીને મને મીઠું આપશો?' },
      { en: 'Would you please help me solve this puzzle?', gu: 'શું તમે આ પઝલ ઉકેલવામાં મને મદદ કરશો?' }
    ],
    gradeLevel: 6
  },
  {
    id: 'pleasantries',
    name: 'Expressing Pleasantries / Etiquette',
    gujaratiName: 'શિષ્ટાચાર, આભાર અને શુભેચ્છાઓ',
    description: 'Social greetings, polite responses, welcoming, thanking, and apologizing.',
    keywords: ['Thank you', 'You are welcome', 'Nice to meet you', 'Excuse me', 'Pardon me', 'Good morning', 'Have a nice day'],
    examples: [
      { en: 'Thank you very much for your kind help.', gu: 'તમારી મદદ માટે ખૂબ ખૂબ આભાર.' },
      { en: 'Pleased to meet you, Doctor!', gu: 'ડોક્ટર, તમને મળીને ખૂબ આનંદ થયો!' }
    ],
    gradeLevel: 6
  },
  {
    id: 'inquiry',
    name: 'Inquiring / Asking Information',
    gujaratiName: 'માહિતી પૂછવી / પૂછપરછ કરવી',
    description: 'Asking questions to gather specific facts, directions, or details.',
    keywords: ['What', 'Where', 'When', 'Why', 'Who', 'Which', 'How many', 'How much'],
    examples: [
      { en: 'Where is the school library located?', gu: 'શાળાની લાયબ્રેરી ક્યાં આવેલી છે?' },
      { en: 'What time does the morning prayer begin?', gu: 'સવારની પ્રાર્થના કેટલા વાગ્યે શરૂ થાય છે?' }
    ],
    gradeLevel: 6
  },
  {
    id: 'advice',
    name: 'Giving Advice / Suggestion',
    gujaratiName: 'સલાહ કે સૂચન આપવું',
    description: 'Recommending what is good, beneficial, or right for someone to do.',
    keywords: ['should', 'should not', 'ought to', 'had better', 'Why don\'t you'],
    examples: [
      { en: 'You should drink at least eight glasses of water daily.', gu: 'તમારે દરરોજ ઓછામાં ઓછું ૮ ગ્લાસ પાણી પીવું જોઈએ.' },
      { en: 'You should revise your grammar lessons regularly.', gu: 'તમારે નિયમિતપણે વ્યાકરણના પાઠોનું પુનરાવર્તન કરવું જોઈએ.' }
    ],
    gradeLevel: 7
  },
  {
    id: 'describing_action',
    name: 'Describing Action / Routine',
    gujaratiName: 'ક્રિયા અથવા દિનચર્યા વર્ણવવી',
    description: 'Describing daily routines, continuous actions, or habitual behavior.',
    keywords: ['always', 'usually', 'daily', 'every day', 'is playing', 'cooks'],
    examples: [
      { en: 'Grandfather reads the newspaper every morning.', gu: 'દાદાજી દરરોજ સવારે છાપું વાંચે છે.' },
      { en: 'The gardener is watering the flowering plants.', gu: 'માળી ફૂલછોડને પાણી પાઈ રહ્યો છે.' }
    ],
    gradeLevel: 7
  },
  {
    id: 'contrast',
    name: 'Expressing Contrast',
    gujaratiName: 'વિરોધાભાસ દર્શાવવો',
    description: 'Showing an unexpected difference or opposite result between two statements.',
    keywords: ['but', 'although', 'though', 'yet', 'however'],
    examples: [
      { en: 'He studied very hard, but he missed the top rank by one mark.', gu: 'તેણે ખૂબ મહેનત કરી, પરંતુ તે એક માર્ક્સથી પ્રથમ નંબર ચૂકી ગયો.' },
      { en: 'Although it was raining heavily, the students went to school.', gu: 'જોકે ભારે વરસાદ પડતો હતો, છતાં વિદ્યાર્થીઓ શાળાએ ગયા.' }
    ],
    gradeLevel: 7
  },
  {
    id: 'obligation',
    name: 'Expressing Obligation / Compulsion',
    gujaratiName: 'ફરજ કે અનિવાર્યતા દર્શાવવી',
    description: 'Stating strict rules, legal duties, or necessary requirements.',
    keywords: ['must', 'have to', 'has to', 'must not', 'compulsory'],
    examples: [
      { en: 'Every rider must wear a helmet on the highway.', gu: 'દરેક વાહનચાલકે હાઇવે પર હેલ્મેટ પહેરવું જ જોઈએ.' },
      { en: 'We must respect our national flag.', gu: 'આપણે આપણા રાષ્ટ્રધ્વજનું સન્માન કરવું જ જોઈએ.' }
    ],
    gradeLevel: 8
  },
  {
    id: 'reason_result',
    name: 'Expressing Reason or Result',
    gujaratiName: 'કારણ અથવા પરિણામ દર્શાવવું',
    description: 'Explaining why something occurred or the direct consequence.',
    keywords: ['because', 'since', 'as', 'so', 'therefore'],
    examples: [
      { en: 'He was absent yesterday because he had high fever.', gu: 'તે ગઈકાલે ગેરહાજર હતો કારણ કે તેને સખત તાવ હતો.' },
      { en: 'The boy worked sincerely, so the teacher rewarded him.', gu: 'છોકરાએ નિષ્ઠાપૂર્વક કામ કર્યું, તેથી શિક્ષકે તેને ઈનામ આપ્યું.' }
    ],
    gradeLevel: 8
  },
  {
    id: 'comparison',
    name: 'Comparing Things / Persons',
    gujaratiName: 'સરખામણી કરવી (ડિગ્રી)',
    description: 'Comparing qualities, sizes, or abilities using comparative and superlative forms.',
    keywords: ['as...as', 'than', '-er than', 'the most', 'the best'],
    examples: [
      { en: 'The Gir lion is stronger than the leopard.', gu: 'ગીરનો સિંહ દીપડા કરતાં વધુ બળવાન છે.' },
      { en: 'Mount Everest is the highest peak in the world.', gu: 'માઉન્ટ એવરેસ્ટ વિશ્વનું સૌથી ઊંચું શિખર છે.' }
    ],
    gradeLevel: 8
  }
];

export const FUNCTION_PUZZLES: FunctionPuzzle[] = [
  // Grade 6 Puzzles
  {
    id: 'fp-6-1',
    grade: 6,
    sentence: 'May I drink water, teacher?',
    dialogueSpeaker: 'Mehul to Teacher',
    contextGu: 'મેહુલ શિક્ષક પાસે પાણી પીવાની રજા માંગે છે.',
    targetFunctionId: 'permission_seek',
    options: ['Seeking Permission', 'Expressing Ability', 'Giving Advice', 'Expressing Contrast'],
    correctAnswer: 'Seeking Permission',
    explanationEn: '"May I..." is used to politely seek permission from teachers or elders.',
    explanationGu: '"May I..." નો ઉપયોગ કોઈની પાસેથી પરવાનગી કે રજા માંગવા માટે થાય છે.'
  },
  {
    id: 'fp-6-2',
    grade: 6,
    sentence: 'Pooja can solve this math puzzle in two minutes.',
    dialogueSpeaker: 'Teacher to Class',
    contextGu: 'પૂજામાં ગણિતનો કોયડો ઝડપથી ઉકેલવાની શક્તિ કે આવડત છે.',
    targetFunctionId: 'ability',
    options: ['Expressing Ability', 'Making a Request', 'Expressing Obligation', 'Giving Advice'],
    correctAnswer: 'Expressing Ability',
    explanationEn: 'The modal "can" expresses mental or physical ability.',
    explanationGu: '"Can" નો ઉપયોગ શારીરિક કે માનસિક ક્ષમતા / આવડત દર્શાવવા માટે થાય છે.'
  },
  {
    id: 'fp-6-3',
    grade: 6,
    sentence: 'Could you please lend me your English notebook?',
    dialogueSpeaker: 'Aman to Sneha',
    contextGu: 'અમન સ્નેહા પાસે નોટબુક આપવાની નમ્ર વિનંતી કરે છે.',
    targetFunctionId: 'request',
    options: ['Making a Request', 'Seeking Permission', 'Expressing Contrast', 'Comparing Things'],
    correctAnswer: 'Making a Request',
    explanationEn: '"Could you please..." is a polite way to make a request.',
    explanationGu: '"Could you please..." નો ઉપયોગ કોઈ વ્યક્તિ પાસે નમ્રતાપૂર્વક વિનંતી કરવા માટે થાય છે.'
  },
  {
    id: 'fp-6-4',
    grade: 6,
    sentence: 'Thank you very much for inviting me to your birthday party!',
    dialogueSpeaker: 'Karan to Raj',
    contextGu: 'કરણ રાજનો પાર્ટી માટે આભાર માને છે.',
    targetFunctionId: 'pleasantries',
    options: ['Expressing Pleasantries / Etiquette', 'Giving Advice', 'Expressing Ability', 'Inquiring / Asking Information'],
    correctAnswer: 'Expressing Pleasantries / Etiquette',
    explanationEn: 'Expressions like "Thank you", "Welcome", and "Pleased to meet you" express pleasantries and polite social etiquette.',
    explanationGu: '"Thank you" જેવો શબ્દ શિષ્ટાચાર, શુભેચ્છા કે આભાર દર્શાવે છે.'
  },
  {
    id: 'fp-6-5',
    grade: 6,
    sentence: 'Where does the school bus stop in the morning?',
    dialogueSpeaker: 'New Student to Monitor',
    contextGu: 'નવો વિદ્યાર્થી બસ સ્ટોપ વિશે માહિતી પૂછે છે.',
    targetFunctionId: 'inquiry',
    options: ['Inquiring / Asking Information', 'Expressing Ability', 'Seeking Permission', 'Describing Action'],
    correctAnswer: 'Inquiring / Asking Information',
    explanationEn: 'Questions starting with Wh- words like "Where" seek specific information.',
    explanationGu: '"Where" થી શરૂ થતો પ્રશ્ન સ્થળ કે માહિતી પૂછવા (Inquiry) માટે વપરાય છે.'
  },
  {
    id: 'fp-6-6',
    grade: 6,
    sentence: 'Yes, you may sit on this bench.',
    dialogueSpeaker: 'Librarian to Student',
    contextGu: 'લાઈબ્રેરિયન વિદ્યાર્થીને બેસવાની મંજૂરી આપે છે.',
    targetFunctionId: 'permission_give',
    options: ['Giving Permission', 'Making a Request', 'Expressing Ability', 'Expressing Contrast'],
    correctAnswer: 'Giving Permission',
    explanationEn: '"You may..." is used by authorities or elders to grant permission.',
    explanationGu: '"You may..." નો ઉપયોગ સામેની વ્યક્તિને પરવાનગી / છૂટ આપવા માટે થાય છે.'
  },
  {
    id: 'fp-6-7',
    grade: 6,
    sentence: 'My elder brother can swim across the river easily.',
    dialogueSpeaker: 'Ramesh to Friends',
    contextGu: 'રમેશના ભાઈમાં નદી પાર કરવાની શારીરિક ક્ષમતા છે.',
    targetFunctionId: 'ability',
    options: ['Expressing Ability', 'Seeking Permission', 'Giving Advice', 'Expressing Contrast'],
    correctAnswer: 'Expressing Ability',
    explanationEn: '"Can" shows physical ability and skill to swim.',
    explanationGu: '"Can" નો ઉપયોગ તરવાની શારીરિક શક્તિ કે ક્ષમતા દર્શાવવા માટે થાય છે.'
  },
  {
    id: 'fp-6-8',
    grade: 6,
    sentence: 'Please switch on the fan, it is very hot today.',
    dialogueSpeaker: 'Student to Classmate',
    contextGu: 'વિદ્યાર્થી પંખો ચાલુ કરવા નમ્ર વિનંતી કરે છે.',
    targetFunctionId: 'request',
    options: ['Making a Request', 'Expressing Ability', 'Expressing Obligation', 'Describing Action'],
    correctAnswer: 'Making a Request',
    explanationEn: '"Please..." is universally used to make a polite request.',
    explanationGu: '"Please..." શબ્દ નમ્ર વિનંતી દર્શાવવા માટે વપરાય છે.'
  },
  {
    id: 'fp-6-9',
    grade: 6,
    sentence: 'Can I use your pencil sharpener for a minute?',
    dialogueSpeaker: 'Mita to Rita',
    contextGu: 'મીતા રીતા પાસે સંચો વાપરવાની પરવાનગી માંગે છે.',
    targetFunctionId: 'permission_seek',
    options: ['Seeking Permission', 'Giving Advice', 'Comparing Things', 'Expressing Reason'],
    correctAnswer: 'Seeking Permission',
    explanationEn: '"Can I..." is commonly used among classmates to seek permission.',
    explanationGu: '"Can I..." મિત્રો કે સાથીદારો વચ્ચે મંજૂરી કે પરવાનગી માંગવા વપરાય છે.'
  },
  {
    id: 'fp-6-10',
    grade: 6,
    sentence: 'Pleased to meet you, Mr. Sharma! Welcome to our school.',
    dialogueSpeaker: 'Principal to Chief Guest',
    contextGu: 'આચાર્ય મહેમાનનું સ્વાગત કરી આદરપૂર્ણ શિષ્ટાચાર દર્શાવે છે.',
    targetFunctionId: 'pleasantries',
    options: ['Expressing Pleasantries / Etiquette', 'Expressing Ability', 'Giving Advice', 'Inquiring / Asking Information'],
    correctAnswer: 'Expressing Pleasantries / Etiquette',
    explanationEn: '"Pleased to meet you" expresses courtesy and social pleasantries.',
    explanationGu: '"Pleased to meet you" એ આદરપૂર્ણ શિષ્ટાચાર અને અભિવાદન છે.'
  },

  // Grade 7 Puzzles
  {
    id: 'fp-7-1',
    grade: 7,
    sentence: 'You should brush your teeth twice every day.',
    dialogueSpeaker: 'Dentist to Child',
    contextGu: 'દાંતના ડોક્ટર બાળકને દાંત સાફ રાખવાની સારી સલાહ આપે છે.',
    targetFunctionId: 'advice',
    options: ['Giving Advice / Suggestion', 'Expressing Ability', 'Seeking Permission', 'Inquiring / Asking Information'],
    correctAnswer: 'Giving Advice / Suggestion',
    explanationEn: '"Should" is used to suggest what is healthy, good, or advisable to do.',
    explanationGu: '"Should" નો ઉપયોગ હિતકારી સલાહ કે સૂચન આપવા માટે થાય છે.'
  },
  {
    id: 'fp-7-2',
    grade: 7,
    sentence: 'Sita always waters the Tulsi plant early in the morning.',
    dialogueSpeaker: 'Narrator',
    contextGu: 'સીતાની દરરોજ સવારની નિયમિત ટેવ અને ક્રિયા દર્શાવી છે.',
    targetFunctionId: 'describing_action',
    options: ['Describing Action / Routine', 'Expressing Obligation', 'Making a Request', 'Seeking Permission'],
    correctAnswer: 'Describing Action / Routine',
    explanationEn: 'Words like "always", "waters", "early morning" describe a habitual action or routine.',
    explanationGu: '"always" અને સાદા વર્તમાનકાળનું રૂપ નિયમિત ક્રિયા કે દિનચર્યા દર્શાવે છે.'
  },
  {
    id: 'fp-7-3',
    grade: 7,
    sentence: 'Amit ran very fast, but he missed the morning train.',
    dialogueSpeaker: 'Friend to Classmates',
    contextGu: 'અમિત ઝડપથી દોડ્યો છતાં ટ્રેન ચૂકી ગયો (પરિણામ વિરોધી આવ્યું).',
    targetFunctionId: 'contrast',
    options: ['Expressing Contrast', 'Expressing Reason or Result', 'Giving Advice', 'Expressing Ability'],
    correctAnswer: 'Expressing Contrast',
    explanationEn: '"But" connects two contrasting or opposite ideas.',
    explanationGu: '"But" (પરંતુ) બે વિરોધાભાસી વિચારો કે પરિણામોને જોડવા માટે વપરાય છે.'
  },
  {
    id: 'fp-7-4',
    grade: 7,
    sentence: 'Would you mind sharing your science textbook for today?',
    dialogueSpeaker: 'Het to Dev',
    contextGu: 'હેત દેવને નમ્રતાપૂર્વક પુસ્તક શેર કરવા વિનંતી કરે છે.',
    targetFunctionId: 'request',
    options: ['Making a Request', 'Giving Advice', 'Expressing Ability', 'Inquiring / Asking Information'],
    correctAnswer: 'Making a Request',
    explanationEn: '"Would you mind..." is a polite and courteous way of making a request.',
    explanationGu: '"Would you mind..." વિનંતી દર્શાવવા માટેનું અત્યંત નમ્ર વાક્ય પ્રયોગ છે.'
  },
  {
    id: 'fp-7-5',
    grade: 7,
    sentence: 'Raju cannot lift this heavy wooden box alone.',
    dialogueSpeaker: 'Teacher',
    contextGu: 'રાજુ એકલો ભારે બોક્સ ઊંચકી શકતો નથી (અસમર્થતા દર્શાવી છે).',
    targetFunctionId: 'ability',
    options: ['Expressing Ability', 'Giving Permission', 'Giving Advice', 'Expressing Contrast'],
    correctAnswer: 'Expressing Ability',
    explanationEn: '"Cannot" indicates a lack of physical or mental ability.',
    explanationGu: '"Cannot" (કરી શકતો નથી) એ અસમર્થતા કે ક્ષમતાનો અભાવ દર્શાવે છે.'
  },
  {
    id: 'fp-7-6',
    grade: 7,
    sentence: 'You should not eat uncovered street food to stay healthy.',
    dialogueSpeaker: 'Doctor to Patient',
    contextGu: 'ડોક્ટર દર્દીને સ્વાસ્થ્ય માટે હિતકારી સલાહ આપે છે.',
    targetFunctionId: 'advice',
    options: ['Giving Advice / Suggestion', 'Seeking Permission', 'Expressing Ability', 'Describing Action'],
    correctAnswer: 'Giving Advice / Suggestion',
    explanationEn: '"Should not" is used to advise someone against doing something unhealthy.',
    explanationGu: '"Should not" અસ્વસ્થ આહાર ન લેવા માટે સલાહ આપવા વપરાય છે.'
  },
  {
    id: 'fp-7-7',
    grade: 7,
    sentence: 'The postman delivers letters in our village every afternoon.',
    dialogueSpeaker: 'Grandfather',
    contextGu: 'ટપાલીની નિયમિત દૈનિક ક્રિયા વર્ણવવામાં આવી છે.',
    targetFunctionId: 'describing_action',
    options: ['Describing Action / Routine', 'Making a Request', 'Giving Permission', 'Expressing Contrast'],
    correctAnswer: 'Describing Action / Routine',
    explanationEn: '"Delivers" and "every afternoon" describe a habitual routine action.',
    explanationGu: 'નિયમિત સમયે થતી રોજિંદી ક્રિયા વર્ણવવા માટે સાદો વર્તમાનકાળ વપરાય છે.'
  },
  {
    id: 'fp-7-8',
    grade: 7,
    sentence: 'Although he is very rich, he lives a simple life in the village.',
    dialogueSpeaker: 'Villager to Visitor',
    contextGu: 'તે ધનવાન હોવા છતાં સાદગીપૂર્ણ જીવન જીવે છે (વિરોધાભાસ).',
    targetFunctionId: 'contrast',
    options: ['Expressing Contrast', 'Expressing Reason or Result', 'Giving Advice', 'Making a Request'],
    correctAnswer: 'Expressing Contrast',
    explanationEn: '"Although" connects the contrasting ideas of wealth and simple living.',
    explanationGu: '"Although" (જોકે/છતાં) બે વિરોધાભાસી બાબતો દર્શાવે છે.'
  },
  {
    id: 'fp-7-9',
    grade: 7,
    sentence: 'How many students took part in the science quiz competition?',
    dialogueSpeaker: 'Teacher to Class Representative',
    contextGu: 'શિક્ષક વિદ્યાર્થીઓની સંખ્યા વિશે માહિતી પૂછે છે.',
    targetFunctionId: 'inquiry',
    options: ['Inquiring / Asking Information', 'Expressing Ability', 'Giving Advice', 'Seeking Permission'],
    correctAnswer: 'Inquiring / Asking Information',
    explanationEn: '"How many..." inquires about specific count and information.',
    explanationGu: '"How many..." થી શરૂ થતો પ્રશ્ન ચોક્કસ માહિતી પૂછવા વપરાય છે.'
  },
  {
    id: 'fp-7-10',
    grade: 7,
    sentence: 'Why don\'t you join the school cricket coaching camp?',
    dialogueSpeaker: 'PT Teacher to Student',
    contextGu: 'પી.ટી. શિક્ષક વિદ્યાર્થીને ક્રિકેટ કેમ્પમાં જોડાવા માટે સૂચન કરે છે.',
    targetFunctionId: 'advice',
    options: ['Giving Advice / Suggestion', 'Expressing Obligation', 'Describing Action', 'Comparing Things'],
    correctAnswer: 'Giving Advice / Suggestion',
    explanationEn: '"Why don\'t you..." is a friendly way to offer a suggestion or advice.',
    explanationGu: '"Why don\'t you..." મિત્રતાપૂર્ણ સૂચન કે સલાહ આપવા વપરાય છે.'
  },

  // Grade 8 Puzzles
  {
    id: 'fp-8-1',
    grade: 8,
    sentence: 'You must follow traffic lights to stay safe on the road.',
    dialogueSpeaker: 'Police Officer to Public',
    contextGu: 'ટ્રાફિકના નિયમો પાળવા એ કાયદાકીય ફરજ અને અનિવાર્ય બાબત છે.',
    targetFunctionId: 'obligation',
    options: ['Expressing Obligation / Compulsion', 'Giving Permission', 'Expressing Ability', 'Making a Request'],
    correctAnswer: 'Expressing Obligation / Compulsion',
    explanationEn: '"Must" indicates an essential rule, strict duty, or moral obligation.',
    explanationGu: '"Must" ફરજિયાતપણું, નિયમ કે અનિવાર્ય ફરજ દર્શાવવા માટે વપરાય છે.'
  },
  {
    id: 'fp-8-2',
    grade: 8,
    sentence: 'Nayan won the prize because he practiced swimming every afternoon.',
    dialogueSpeaker: 'Coach to Team',
    contextGu: 'નયન ઈનામ જીત્યો કારણ કે તેણે રોજ પ્રેક્ટિસ કરી હતી.',
    targetFunctionId: 'reason_result',
    options: ['Expressing Reason or Result', 'Expressing Contrast', 'Making a Request', 'Seeking Permission'],
    correctAnswer: 'Expressing Reason or Result',
    explanationEn: '"Because" explains the reason behind the outcome.',
    explanationGu: '"Because" (કારણ કે) જીતવા પાછળનું સચોટ કારણ દર્શાવે છે.'
  },
  {
    id: 'fp-8-3',
    grade: 8,
    sentence: 'An elephant is heavier than a camel.',
    dialogueSpeaker: 'Science Teacher',
    contextGu: 'હાથી અને ઊંટ વચ્ચે વજનની સરખામણી કરવામાં આવી છે.',
    targetFunctionId: 'comparison',
    options: ['Comparing Things / Persons', 'Expressing Obligation', 'Giving Advice', 'Describing Action'],
    correctAnswer: 'Comparing Things / Persons',
    explanationEn: '"Heavier than" shows comparative degree comparing two animals.',
    explanationGu: '"Heavier than" બે પ્રાણીઓ વચ્ચે વજનની સરખામણી (Comparison) દર્શાવે છે.'
  },
  {
    id: 'fp-8-4',
    grade: 8,
    sentence: 'Although the exam was challenging, Ananya scored excellent marks.',
    dialogueSpeaker: 'Principal',
    contextGu: 'પેપર અઘરું હોવા છતાં અનન્યાએ ખૂબ સારા માર્ક્સ મેળવ્યા (વિરોધાભાસ).',
    targetFunctionId: 'contrast',
    options: ['Expressing Contrast', 'Inquiring / Asking Information', 'Expressing Ability', 'Giving Permission'],
    correctAnswer: 'Expressing Contrast',
    explanationEn: '"Although" introduces a contrast between difficult exam and high score.',
    explanationGu: '"Although" (જોકે/છતાં) બે વિરોધી પરિસ્થિતિઓને દર્શાવે છે.'
  },
  {
    id: 'fp-8-5',
    grade: 8,
    sentence: 'We must not waste clean drinking water.',
    dialogueSpeaker: 'Eco Club President',
    contextGu: 'સ્વચ્છ પીવાનું પાણી બગાડવું ન જોઈએ એ આપણી સૌની ફરજ છે.',
    targetFunctionId: 'obligation',
    options: ['Expressing Obligation / Compulsion', 'Making a Request', 'Seeking Permission', 'Comparing Things'],
    correctAnswer: 'Expressing Obligation / Compulsion',
    explanationEn: '"Must not" denotes strong prohibition and environmental duty.',
    explanationGu: '"Must not" કડક મનાઈ કે નૈતિક ફરજ દર્શાવે છે.'
  },
  {
    id: 'fp-8-6',
    grade: 8,
    sentence: 'Komal is as clever as her elder sister.',
    dialogueSpeaker: 'Mother',
    contextGu: 'કોમલ તેની મોટી બહેન જેટલી જ હોશિયાર છે (સમાનતા દર્શાવતી સરખામણી).',
    targetFunctionId: 'comparison',
    options: ['Comparing Things / Persons', 'Giving Advice', 'Expressing Reason or Result', 'Describing Action'],
    correctAnswer: 'Comparing Things / Persons',
    explanationEn: '"As clever as" is positive degree showing equal comparison.',
    explanationGu: '"as...as" સમાનતા દર્શાવતી સરખામણી (Positive Degree) માટે વપરાય છે.'
  },
  {
    id: 'fp-8-7',
    grade: 8,
    sentence: 'The cheetah runs faster than any other land animal.',
    dialogueSpeaker: 'Wildlife Guide',
    contextGu: 'ચિત્તાની દોડવાની ઝડપની અન્ય પ્રાણીઓ સાથે સરખામણી કરવામાં આવી છે.',
    targetFunctionId: 'comparison',
    options: ['Comparing Things / Persons', 'Expressing Ability', 'Expressing Obligation', 'Describing Action'],
    correctAnswer: 'Comparing Things / Persons',
    explanationEn: '"Faster than" shows comparative degree between the cheetah and other animals.',
    explanationGu: '"Faster than" પ્રાણીઓની ગતિ વચ્ચે સરખામણી (Comparison) દર્શાવે છે.'
  },
  {
    id: 'fp-8-8',
    sentence: 'The cricket match was cancelled because of heavy morning rains.',
    grade: 8,
    dialogueSpeaker: 'Commentator',
    contextGu: 'મેચ રદ થવા પાછળનું ચોક્કસ કારણ વરસાદ છે.',
    targetFunctionId: 'reason_result',
    options: ['Expressing Reason or Result', 'Expressing Contrast', 'Making a Request', 'Seeking Permission'],
    correctAnswer: 'Expressing Reason or Result',
    explanationEn: '"Because of" provides the direct reason for cancellation.',
    explanationGu: '"Because of" (કારણે) પરિણામ પાછળનું સચોટ કારણ દર્શાવે છે.'
  },
  {
    id: 'fp-8-9',
    grade: 8,
    sentence: 'Every citizen must follow the laws and traffic rules of our country.',
    dialogueSpeaker: 'Social Studies Teacher',
    contextGu: 'દેશના કાયદાઓ અને ટ્રાફિક નિયમોનું પાલન કરવું એ દરેક નાગરિકની અનિવાર્ય ફરજ છે.',
    targetFunctionId: 'obligation',
    options: ['Expressing Obligation / Compulsion', 'Giving Permission', 'Comparing Things', 'Giving Advice'],
    correctAnswer: 'Expressing Obligation / Compulsion',
    explanationEn: '"Must follow" expresses a compulsory legal duty and national obligation.',
    explanationGu: '"Must follow" કાયદાકીય અનિવાર્યતા અને રાષ્ટ્રીય ફરજ દર્શાવે છે.'
  },
  {
    id: 'fp-8-10',
    grade: 8,
    sentence: 'Mount Girnar is the highest mountain peak in Gujarat.',
    dialogueSpeaker: 'Geography Teacher',
    contextGu: 'ગિરનાર પર્વતની ઊંચાઈની સર્વોચ્ચ કક્ષા દર્શાવતી સરખામણી (Superlative Degree).',
    targetFunctionId: 'comparison',
    options: ['Comparing Things / Persons', 'Expressing Ability', 'Giving Advice', 'Inquiring / Asking Information'],
    correctAnswer: 'Comparing Things / Persons',
    explanationEn: '"The highest peak" uses superlative degree comparing all peaks in Gujarat.',
    explanationGu: '"The highest peak" (સર્વોચ્ચ શિખર) સરખામણી (Superlative Degree) દર્શાવે છે.'
  }
];

export const SCRAMBLE_PUZZLES: SentenceScramblePuzzle[] = [
  {
    id: 'sc-1',
    grade: 6,
    functionName: 'Seeking Permission',
    functionGu: 'પરવાનગી માંગવી',
    correctSentence: 'May I come in Sir ?',
    scrambledWords: ['come', 'May', 'Sir', 'in', '?', 'I'],
    translationGu: 'સર, શું હું અંદર આવી શકું?',
    hint: 'Start with the polite modal verb "May".'
  },
  {
    id: 'sc-2',
    grade: 6,
    functionName: 'Expressing Ability',
    functionGu: 'ક્ષમતા દર્શાવવી',
    correctSentence: 'He can swim across the river .',
    scrambledWords: ['swim', 'can', 'the', 'He', 'river', 'across', '.'],
    translationGu: 'તે નદી પાર તરી શકે છે.',
    hint: 'Subject + can + verb form.'
  },
  {
    id: 'sc-3',
    grade: 6,
    functionName: 'Making a Request',
    functionGu: 'નમ્ર વિનંતી કરવી',
    correctSentence: 'Could you please help me ?',
    scrambledWords: ['please', 'Could', 'help', 'you', '?', 'me'],
    translationGu: 'શું તમે મહેરબાની કરીને મને મદદ કરશો?',
    hint: 'Polite question starts with "Could you please".'
  },
  {
    id: 'sc-4',
    grade: 7,
    functionName: 'Giving Advice',
    functionGu: 'સલાહ આપવી',
    correctSentence: 'You should eat fresh green vegetables .',
    scrambledWords: ['eat', 'should', 'vegetables', 'You', 'fresh', 'green', '.'],
    translationGu: 'તમારે તાજા લીલા શાકભાજી ખાવા જોઈએ.',
    hint: 'Start with "You should" followed by healthy action.'
  },
  {
    id: 'sc-5',
    grade: 7,
    functionName: 'Expressing Contrast',
    functionGu: 'વિરોધાભાસ દર્શાવવો',
    correctSentence: 'He is poor but very honest .',
    scrambledWords: ['honest', 'is', 'very', 'He', 'but', 'poor', '.'],
    translationGu: 'તે ગરીબ છે પરંતુ ખૂબ પ્રામાણિક છે.',
    hint: '"But" connects the two opposing qualities.'
  },
  {
    id: 'sc-6',
    grade: 8,
    functionName: 'Expressing Obligation',
    functionGu: 'ફરજ કે અનિવાર્યતા દર્શાવવી',
    correctSentence: 'We must keep our school clean .',
    scrambledWords: ['keep', 'must', 'our', 'clean', 'We', 'school', '.'],
    translationGu: 'આપણે આપણી શાળા સ્વચ્છ રાખવી જ જોઈએ.',
    hint: '"We must" expresses our collective duty.'
  },
  {
    id: 'sc-7',
    grade: 8,
    functionName: 'Expressing Reason',
    functionGu: 'કારણ દર્શાવવું',
    correctSentence: 'He was late because of heavy rain .',
    scrambledWords: ['rain', 'late', 'was', 'heavy', 'because', 'He', 'of', '.'],
    translationGu: 'ભારે વરસાદને કારણે તે મોડો પડ્યો હતો.',
    hint: 'Explain reason using "because of".'
  },
  {
    id: 'sc-8',
    grade: 8,
    functionName: 'Comparing Things',
    functionGu: 'સરખામણી કરવી',
    correctSentence: 'Gold is more precious than silver .',
    scrambledWords: ['precious', 'more', 'is', 'silver', 'Gold', 'than', '.'],
    translationGu: 'સોનું ચાંદી કરતાં વધુ કિંમતી છે.',
    hint: 'Use comparative degree: "more precious than".'
  }
];

export const GRAMMAR_GAP_PUZZLES: GrammarGapPuzzle[] = [
  {
    id: 'gg-1',
    grade: 6,
    functionName: 'Seeking Permission',
    sentenceWithBlank: '___ I use your color pencils for this drawing?',
    blankOptions: ['May', 'Must', 'Should', 'Will'],
    correctAnswer: 'May',
    explanationEn: '"May" is the proper formal modal verb to seek permission.',
    explanationGu: 'પરવાનગી માંગવા માટે ઔપચારિક મોડેલ "May" વપરાય છે.'
  },
  {
    id: 'gg-2',
    grade: 6,
    functionName: 'Expressing Ability',
    sentenceWithBlank: 'Cheetah is the fastest animal; it ___ run up to 100 km/h.',
    blankOptions: ['can', 'may', 'should', 'must'],
    correctAnswer: 'can',
    explanationEn: '"Can" denotes natural physical capability or power.',
    explanationGu: '"Can" કુદરતી ઝડપ અને દોડવાની ક્ષમતા દર્શાવે છે.'
  },
  {
    id: 'gg-3',
    grade: 7,
    functionName: 'Giving Advice',
    sentenceWithBlank: 'You have an exam tomorrow, so you ___ sleep early tonight.',
    blankOptions: ['should', 'may', 'can', 'might'],
    correctAnswer: 'should',
    explanationEn: '"Should" gives sound, sensible advice for good exam health.',
    explanationGu: 'પરીક્ષા માટે સમયસર ઊંઘવાની સલાહ આપવા "should" વપરાય છે.'
  },
  {
    id: 'gg-4',
    grade: 7,
    functionName: 'Expressing Contrast',
    sentenceWithBlank: 'Vikas practiced hard, ___ he lost the badminton match.',
    blankOptions: ['but', 'because', 'so', 'and'],
    correctAnswer: 'but',
    explanationEn: '"But" shows contrast between hard practice and unexpected loss.',
    explanationGu: 'મહેનત અને હાર વચ્ચે વિરોધાભાસ દર્શાવવા "but" સંયોજક વપરાય છે.'
  },
  {
    id: 'gg-5',
    grade: 8,
    functionName: 'Expressing Obligation',
    sentenceWithBlank: 'Students ___ wear the school uniform on all working days.',
    blankOptions: ['must', 'could', 'may', 'can'],
    correctAnswer: 'must',
    explanationEn: 'School rules require strict compliance, so "must" is used.',
    explanationGu: 'શાળાના નિયમ મુજબ ગણવેશ પહેરવો અનિવાર્ય હોવાથી "must" વપરાય છે.'
  },
  {
    id: 'gg-6',
    grade: 8,
    functionName: 'Expressing Reason',
    sentenceWithBlank: 'The farmer was overjoyed ___ the crops received good monsoon rain.',
    blankOptions: ['because', 'although', 'but', 'unless'],
    correctAnswer: 'because',
    explanationEn: '"Because" explains the exact reason for the farmer\'s happiness.',
    explanationGu: 'ખેડૂતના ખુશ થવાનું કારણ દર્શાવવા "because" વપરાય છે.'
  },
  {
    id: 'gg-7',
    grade: 8,
    functionName: 'Comparing Things',
    sentenceWithBlank: 'Ahmedabad is ___ than Vadodara in population.',
    blankOptions: ['larger', 'large', 'largest', 'as large'],
    correctAnswer: 'larger',
    explanationEn: 'The word "than" takes the comparative form with "-er" (larger).',
    explanationGu: '"than" સાથે સરખામણી કરતી વખતે તુલનાત્મક રૂપ "larger" વપરાય છે.'
  },
  {
    id: 'gg-8',
    grade: 6,
    functionName: 'Making a Request',
    sentenceWithBlank: '___ you please pass me that storybook from the shelf?',
    blankOptions: ['Could', 'Must', 'Should', 'Shall'],
    correctAnswer: 'Could',
    explanationEn: '"Could you please..." is universally recognized for polite requests.',
    explanationGu: 'નમ્ર વિનંતી માટે "Could you please..." નો પ્રયોગ થાય છે.'
  }
];

export const VOCAB_MATCH_ITEMS: VocabCardItem[] = [
  // Meanings & Synonyms for Std 6-8
  { id: 'vm-1', word: 'Courteous', match: 'Polite & well-mannered (નમ્ર)', type: 'meaning', grade: 6 },
  { id: 'vm-2', word: 'Obligation', match: 'Duty / Compulsion (ફરજ)', type: 'meaning', grade: 8 },
  { id: 'vm-3', word: 'Permission', match: 'Consent to do something (મંજૂરી)', type: 'meaning', grade: 6 },
  { id: 'vm-4', word: 'Ability', match: 'Power or skill (ક્ષમતા)', type: 'meaning', grade: 6 },
  { id: 'vm-5', word: 'Advice', match: 'Helpful suggestion (સલાહ)', type: 'meaning', grade: 7 },
  { id: 'vm-6', word: 'Contrast', match: 'Difference / Opposite (વિરોધાભાસ)', type: 'meaning', grade: 7 },
  { id: 'vm-7', word: 'Inquire', match: 'Ask for information (પૂછપરછ)', type: 'meaning', grade: 6 },
  { id: 'vm-8', word: 'Gigantic', match: 'Extremely huge (વિશાળકાય)', type: 'synonym', grade: 7 },
  { id: 'vm-9', word: 'Courage', match: 'Bravery / Valour (હિંમત)', type: 'synonym', grade: 8 },
  { id: 'vm-10', word: 'Frequent', match: 'Happening often (વારંવાર)', type: 'meaning', grade: 8 },
  { id: 'vm-11', word: 'Ancient', match: 'Opposite of Modern (પ્રાચીન)', type: 'antonym', grade: 7 },
  { id: 'vm-12', word: 'Precious', match: 'Valuable / Costly (કિંમતી)', type: 'synonym', grade: 8 }
];

export const WORD_UNSCRAMBLE_PUZZLES: WordUnscramblePuzzle[] = [
  {
    id: 'wu-1',
    grade: 6,
    word: 'POLITE',
    hintEn: 'Showing good manners and respect towards others.',
    hintGu: 'નમ્ર અને સભ્ય વર્તન દર્શાવતો શબ્દ.',
    category: 'Function Marker'
  },
  {
    id: 'wu-2',
    grade: 6,
    word: 'ABILITY',
    hintEn: 'Physical or mental power to do something.',
    hintGu: 'કોઈ કાર્ય કરવાની કુદરતી શક્તિ કે ક્ષમતા.',
    category: 'Language Function'
  },
  {
    id: 'wu-3',
    grade: 6,
    word: 'REQUEST',
    hintEn: 'An act of asking politely for something.',
    hintGu: 'કોઈ વસ્તુ કે સહાય માટે વિનંતી કરવી.',
    category: 'Language Function'
  },
  {
    id: 'wu-4',
    grade: 7,
    word: 'ADVICE',
    hintEn: 'Guidance or recommendations offered with good intention.',
    hintGu: 'હિતકારી સૂચન કે સલાહ.',
    category: 'Language Function'
  },
  {
    id: 'wu-5',
    grade: 7,
    word: 'ROUTINE',
    hintEn: 'A sequence of actions regularly followed.',
    hintGu: 'દરરોજ અનુસરવામાં આવતી દિનચર્યા કે નિયમિત ક્રમ.',
    category: 'Grammar Context'
  },
  {
    id: 'wu-6',
    grade: 8,
    word: 'OBLIGATION',
    hintEn: 'A moral or legal duty that you must fulfill.',
    hintGu: 'કાયદાકીય કે નૈતિક ફરજ / બંધન.',
    category: 'Language Function'
  },
  {
    id: 'wu-7',
    grade: 8,
    word: 'COMPARE',
    hintEn: 'To examine two or more things to see how they are alike or different.',
    hintGu: 'ગુણદોષ કે કદની સરખામણી કરવી.',
    category: 'Grammar Function'
  },
  {
    id: 'wu-8',
    grade: 8,
    word: 'CONTRAST',
    hintEn: 'A striking difference between two things being juxtaposed.',
    hintGu: 'પરસ્પર વિરોધાભાસ દર્શાવવો.',
    category: 'Language Function'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'first_win',
    title: 'First Step',
    titleGu: 'પ્રથમ ડગલું',
    description: 'Solve your very first puzzle correctly!',
    icon: 'Target',
    requirement: (stats) => stats.correctCount >= 1
  },
  {
    id: 'streak_3',
    title: 'Triple Streak',
    titleGu: 'સ્ટ્રીક સ્ટાર',
    description: 'Reach a streak of 3 correct answers in a row!',
    icon: 'Flame',
    requirement: (stats) => stats.highestStreak >= 3
  },
  {
    id: 'master_10',
    title: 'Grammar Scholar',
    titleGu: 'વ્યાકરણ સ્કોલર',
    description: 'Solve 10 puzzles correctly across any mode.',
    icon: 'Award',
    requirement: (stats) => stats.correctCount >= 10
  },
  {
    id: 'star_collector',
    title: 'Star Collector',
    titleGu: 'તારલા સંગ્રાહક',
    description: 'Collect at least 15 stars.',
    icon: 'Sparkles',
    requirement: (stats) => stats.stars >= 15
  },
  {
    id: 'unscramble_pro',
    title: 'Word Wizard',
    titleGu: 'શબ્દ જાદુગર',
    description: 'Score 500+ points in total.',
    icon: 'Trophy',
    requirement: (stats) => stats.score >= 500
  }
];
