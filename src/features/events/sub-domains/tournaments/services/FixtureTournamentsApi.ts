import moment from 'moment';
import GameVariant from '../../../../../common/sagas/static/GameVariant';

export const structure = [
  {
    type: 'LEVEL',
    level: 1,
    sb: 25,
    bb: 50,
    ante: 0,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 2,
    sb: 50,
    bb: 100,
    ante: 0,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 3,
    sb: 75,
    bb: 150,
    ante: 5,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 4,
    sb: 100,
    bb: 200,
    ante: 5,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 5,
    sb: 125,
    bb: 250,
    ante: 10,
    duration: '20'
  },
  {
    type: 'BREAK',
    duration: '5'
  },
  {
    type: 'LEVEL',
    level: 6,
    sb: 150,
    bb: 300,
    ante: 10,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 7,
    sb: 200,
    bb: 400,
    ante: 10,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 8,
    sb: 250,
    bb: 500,
    ante: 20,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 9,
    sb: 300,
    bb: 600,
    ante: 20,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 10,
    sb: 400,
    bb: 800,
    ante: 20,
    duration: '20'
  },
  {
    type: 'BREAK',
    duration: '5'
  },
  {
    type: 'LEVEL',
    level: 11,
    sb: 500,
    bb: 1000,
    ante: 50,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 12,
    sb: 600,
    bb: 1200,
    ante: 50,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 13,
    sb: 800,
    bb: 1600,
    ante: 50,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 14,
    sb: 1000,
    bb: 2000,
    ante: 100,
    duration: '20'
  },
  {
    type: 'LEVEL',
    level: 10,
    sb: 1250,
    bb: 2500,
    ante: 100,
    duration: '20'
  }
];

// Tournament List
export const tournamentList = [
  {
    id: '231445',
    funcId: '#1',
    eventNumber: 'EVT1',
    date: moment('2019-07-10 09:30').format('YYYY-MM-DD HH:mm'),
    name: 'WPT Montreal',
    gameVariant: GameVariant[0].shortName,
    buyIn: 100,
    fees: 1,
    stack: 3000,
    lateRegistration: 'End of level 5'
  },
  {
    id: '331445',
    funcId: '#2',
    eventNumber: 'EVT2',
    date: moment('2019-03-12 18:30').format('YYYY-MM-DD HH:mm'),
    name: '2019 Wnter Poker Meltdown',
    gameVariant: GameVariant[5].shortName,
    buyIn: 50,
    fees: 1,
    stack: 50000,
    lateRegistration: 'End of level 5'
  },
  {
    id: '431445',
    funcId: '#3',
    eventNumber: 'EVT3',
    date: moment('2018-02-27 16:00').format('YYYY-MM-DD HH:mm'),
    name: 'Diamond Cup',
    gameVariant: GameVariant[6].shortName,
    buyIn: 120,
    fees: 1,
    stack: 20000,
    lateRegistration: 'End of level 5'
  },
  {
    id: '231442',
    funcId: '#4',
    eventNumber: 'EVT4',
    date: moment('2018-02-27 12:00').format('YYYY-MM-DD HH:mm'),
    name: 'The Million Dollar Heater',
    gameVariant: GameVariant[10].shortName,
    buyIn: 120,
    fees: 1,
    stack: 20000,
    lateRegistration: 'End of level 5'
  },
  {
    id: '231443',
    funcId: '#5',
    eventNumber: 'EVT5',
    date: moment('2019-04-05 16:00').format('YYYY-MM-DD HH:mm'),
    name: 'Patrick Antonius Poker Challenge',
    gameVariant: GameVariant[18].shortName,
    buyIn: 1000,
    fees: 100,
    stack: 50000,
    lateRegistration: 'End of level 20'
  }
];

// Export All UpcomingTournaments FixtUre API
// Export Default
export default {
  /**
   * Fetch Upcoming Tournaments Call
   */
  fetchTournaments: (
    eventId: string,
    filters: Object,
    page: number,
    size: number
  ) => {
    const tournamentListResult = tournamentList;
    return {
      status: 200,
      data: {
        content: tournamentListResult,
        last: true
      }
    };
  },

  /**
   * fetchTournamentPlayersNumber Method
   * @param {*} tournamentId : The tournament Id
   */
  fetchTournamentInterestedPlayersNumber: (tournamentId: string) => {
    return {
      status: 200,
      data: 12
    };
  },

  /**
   * Delete Tournament by tournamentId
   * @param {*} tournamentId
   */
  deleteTournament: (tournamentId: string) => {
    return {
      status: 204,
      data: {}
    };
  },

  // Create tournament Call
  createTournament: (festivalId: string, data: any) => {
    return {
      status: 201,
      headers: {
        location: 'http://ezrzerrze/tournamentId1'
      },
      data: null
    };
  },

  // Fetch Tournament Detail Call
  fetchTournamentDetails: (festivalId: string, tournamentId: string) => {
    return {
      status: 200,
      data: {
        informations: {
          funcId: '#00001',
          eventNumber: 2,
          startDate: new Date(),
          name: 'PAPC',
          gameVariant: 'NLH',
          currency: 'EUR',
          buyIn: 300,
          fees: 30,
          takenOutPP: 6,
          startingStack: 3000,
          lateReg: 5 // Level Number
        },
        format: {
          reEntry: {
            maxPerPlayer: 2,
            availableUntil: 10,
            cashAmount: '2500',
            chipsAmount: '10 000,'
          },
          reBuy: {
            maxPerPlayer: 2,
            availableUntil: 10,
            cashAmount: '2500',
            chipsAmount: '10 000,'
          },
          addOns: {
            maxPerPlayer: 2,
            availableUntil: 10,
            cashAmount: '2500',
            chipsAmount: '20 000,'
          }
        },
        structure: structure
      }
    };
  },

  // Update tournament informations Call
  updateTournamentInformations: (
    eventId: string,
    tournamentId: string,
    data: any
  ) => {
    return {
      status: 200,
      data: tournamentId
    };
  },

  // Update tournament format Call
  updateTournamentFormat: (
    eventId: string,
    tournamentId: string,
    data: any
  ) => {
    return {
      status: 200,
      data: tournamentId
    };
  },

  // Update tournament structure Call
  updateTournamentStructure: (
    eventId: string,
    tournamentId: string,
    data: any
  ) => {
    return {
      status: 200,
      data: tournamentId
    };
  }
};
