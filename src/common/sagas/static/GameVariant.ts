// ******************************** //
// This file gives all Poker Variants
// For each Variants we have different type of game :
// - Limit
// - No Limit
// - Pot Limit
const GameVariant = [
  {
    id: '1',
    label: "Texas Hold'em - Limit",
    shortName: "Texas Hold'em - L"
  },
  {
    id: '2',
    label: "Texas Hold'em - No Limit",
    shortName: 'NLH'
  },
  {
    id: '3',
    label: "Texas Hold'em - Pot Limit",
    shortName: "Texas Hold'em - PL"
  },
  {
    id: '4',
    label: 'Omaha - No Limit',
    shortName: 'Omaha - NL'
  },
  {
    id: '5',
    label: 'Omaha - Limit',
    shortName: 'Omaha - L'
  },
  {
    id: '6',
    label: 'Omaha - Pot Limit',
    shortName: 'PLO'
  },
  {
    id: '7',
    label: 'Omaha Hi/ Lo - No Limit',
    shortName: 'Omaha Hi/ Lo - NL'
  },
  {
    id: '8',
    label: 'Omaha Hi/ Lo - Limit',
    shortName: 'Omaha Hi/ Lo - L'
  },
  {
    id: '9',
    label: 'Omaha Hi-Lo - Pot Limit',
    shortName: 'PLO  Hi-Lo'
  },
  {
    id: '10',
    label: 'Omaha 5 - Pot Limit',
    shortName: 'Omaha 5 - PL'
  },
  {
    id: '50',
    label: 'Omaha 5 - No Limit',
    shortName: 'Omaha 5 - NL'
  },
  {
    id: '11',
    label: '5 Card Omaha Hi/ Lo - Limit',
    shortName: 'Omaha 5 Hi/ Lo - L'
  },
  {
    id: '12',
    label: 'Omaha 5 Hi/ Lo - Pot Limit',
    shortName: 'Omaha 5 Hi/ Lo - PL'
  },
  {
    id: '13',
    label: 'Omaha 5 Hi/ Lo - No Limit',
    shortName: 'Omaha 5 Hi/ Lo - NL'
  },
  {
    id: '14',
    label: 'Courchevel - No Limit',
    shortName: 'Courchevel - NL'
  },
  {
    id: '15',
    label: 'Courchevel - Limit',
    shortName: 'Courchevel - L'
  },
  {
    id: '16',
    label: 'Courchevel - PL',
    shortName: 'Courchevel - PL'
  },
  {
    id: '17',
    label: 'Courchevel Hi/ Lo - NL',
    shortName: 'Courchevel Hi/ Lo - NL'
  },
  {
    id: '18',
    label: 'Courchevel Hi/ Lo - Limit',
    shortName: 'Courchevel Hi/ Lo - L'
  },
  {
    id: '19',
    label: 'Courchevel Hi/ Lo - Pot Limit',
    shortName: 'Courchevel Hi/ Lo - PL'
  },
  {
    id: '20',
    label: '7 Card Stud - No Limit',
    shortName: '7C Stud - NL'
  },
  {
    id: '21',
    label: '7 Card Stud - Limit',
    shortName: '7C Stud - L'
  },
  {
    id: '22',
    label: '7 Card Stud - Pot Limit',
    shortName: '7C Stud - PL'
  },
  {
    id: '23',
    label: '7 Card Stud Hi/ Lo - No Limit',
    shortName: '7C Stud Hi/ Lo - NL'
  },
  {
    id: '24',
    label: '7 Card Stud Hi/ Lo - Limit',
    shortName: '7C Stud Hi/ Lo - L'
  },
  {
    id: '25',
    label: '7 Card Stud Hi/ Lo - Pot Limit',
    shortName: '7C Stud Hi/ Lo - PL'
  },
  {
    id: '26',
    label: 'Razz - No Limit',
    shortName: 'Razz - NL'
  },
  {
    id: '27',
    label: 'Razz - Limit',
    shortName: 'Razz - L'
  },
  {
    id: '28',
    label: 'Razz - Pot Limit',
    shortName: 'Razz - PL'
  },
  {
    id: '29',
    label: '5 Card Stud Sökö',
    shortName: '5C Stud Sökö'
  },
  {
    id: '30',
    label: '5 Card Canadian Stud',
    shortName: '5C Canadian Stud'
  },
  {
    id: '32',
    label: '5 Card Draw - No Limit',
    shortName: '5C Draw - NL'
  },
  {
    id: '33',
    label: '5 Card Draw - Limit',
    shortName: '5C Draw - L'
  },
  {
    id: '34',
    label: '5 Card Draw - Pot Limit',
    shortName: '5C Draw - PL'
  },
  {
    id: '35',
    label: 'Archie - No Limit',
    shortName: 'Archie - NL'
  },
  {
    id: '36',
    label: 'Archie - Limit',
    shortName: 'Archie - L'
  },
  {
    id: '37',
    label: 'Archie - Pot Limit',
    shortName: 'Archie - PL'
  },
  {
    id: '38',
    label: 'Sviten Special - No Limit',
    shortName: 'Sviten Special - NL'
  },
  {
    id: '39',
    label: 'Sviten Special - Limit',
    shortName: 'Sviten Special - L'
  },
  {
    id: '40',
    label: 'Sviten Special - Pot Limit',
    shortName: 'Sviten Special - PL'
  },
  {
    id: '41',
    label: '2-7 Triple Draw - No Limit',
    shortName: '2-7 TD - NL'
  },
  {
    id: '42',
    label: '2-7 Triple Draw - Limit',
    shortName: '2-7 TD - L'
  },
  {
    id: '43',
    label: '2-7 Triple Draw - Pot Limit',
    shortName: '2-7 TD - PL'
  },
  {
    id: '44',
    label: '2-7 Single Draw - No Limit',
    shortName: '2-7 SD - NL'
  },
  {
    id: '44',
    label: '2-7 Single Draw - Limit',
    shortName: '2-7 SD - L'
  },
  {
    id: '45',
    label: '2-7 Single Draw - Pot Limit',
    shortName: '2-7 SD - PL'
  },
  {
    id: '46',
    label: 'HORSE', // Different variants of games
    shortName: 'HORSE'
  },
  {
    id: '48',
    label: '8-Game', // Different variants of games
    shortName: '8-Game'
  },
  {
    id: '51',
    label: 'Badugi', // Only Limit
    shortName: 'Badugi'
  },
  {
    id: '54',
    label: 'Badeucey', // Only Limit
    shortName: 'Badeucey'
  },
  {
    id: '57',
    label: 'Badacey', // Only Limit
    shortName: 'Badacey'
  },
  {
    id: '60',
    label: 'Open Face Chinese', // Only Limit
    shortName: 'OFC'
  }
];

// Export Default
export default GameVariant;
