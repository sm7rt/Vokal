import Immutable from 'seamless-immutable';
import moment from 'moment';
import { INITIAL_STATE as PARAMETERS_INITIAL_STATE } from '../../src/common/redux/ParametersRedux';
import { INITIAL_STATE as SETTINGS_INITIAL_STATE } from '../../src/features/settings/redux/SettingsRedux';
import { INITIAL_STATE as MESSAGES_INITIAL_STATE } from '../../src/features/messages/redux/MessagesRedux';
import MockCities from '../../src/common/services/mock/MockCities';
import MockCountries from '../../src/common/services/mock/MockCountries';
import GameVariant from '../../src/common/sagas/static/GameVariant';

export const initialStateEvents = {
  events: Immutable({
    list: [
      {
        id: 'eventId1',
        startDate: '2019-02-07',
        endDate: '2019-02-07',
        name: 'Patrick Antonius Poker Challenge',
        eventNumber: 1
      },
      {
        id: 'eventId2',
        startDate: '2019-01-07',
        endDate: '2019-03-07',
        name: 'Very Long Nameeeeeeeeee with many test',
        eventNumber: 2
      }
    ],
    runningEvents: {
      listIds: ['eventId1'],
      filters: {},
      page: 1,
      last: false
    },
    finishedEvents: {
      listIds: ['eventId2'],
      filters: {},
      page: 1,
      last: false
    },
    tournamentList: [
      {
        id: 'tournament1',
        eventID: '#EVT1',
        eventNumber: 'EVT15',
        date: moment().format('YYYY-MM-DD HH:mm'),
        name: "New Year's Tournament",
        gameVariant: GameVariant[2].shortName,
        buyIn: 100,
        fee: 10,
        startStack: 3000,
        lateRegistrationLevel: 15,
        tournamentStructure: [
          {
            type: 'LEVEL',
            level: 1,
            smallBlind: 10,
            bigBlind: 20,
            ante: 0,
            duration: 20
          },
          {
            type: 'LEVEL',
            level: 2,
            smallBlind: 20,
            bigBlind: 40,
            ante: 0,
            duration: 20
          },
          {
            type: 'LEVEL',
            level: 3,
            smallBlind: 50,
            bigBlind: 100,
            ante: 0,
            duration: 20
          },
          {
            type: 'BREAK',
            duration: 5
          },
          {
            type: 'LEVEL',
            level: 4,
            smallBlind: 75,
            bigBlind: 150,
            ante: 15,
            duration: 20
          },
          {
            type: 'LEVEL',
            level: 5,
            smallBlind: 100,
            bigBlind: 200,
            ante: 30,
            duration: 20
          },
          {
            type: 'LEVEL',
            level: 6,
            smallBlind: 150,
            bigBlind: 300,
            ante: 50,
            duration: 20
          }
        ]
      },
      {
        id: 'tournament2',
        eventID: '#EVT2',
        eventNumber: 'EVT16',
        date: moment().format('YYYY-MM-DD HH:mm'),
        name: 'Kill The Fish',
        gameVariant: GameVariant[2].shortName,
        buyIn: 50,
        fee: 5,
        startStack: 50000,
        lateRegistrationLevel: 10
      }
    ],
    eventTournamentLinks: [
      {
        eventId: 'eventId1',
        tournamentIds: ['tournament1', 'tournament2'],
        filters: {},
        page: 1,
        last: false
      }
    ]
  })
};

export const initialStateCasinos = {
  casinos: Immutable({
    list: [
      {
        id: 'casino1',
        name: 'Casino 1',
        position: {
          lat: 21.21,
          lon: 21.12
        }
      }
    ]
  })
};

// Export Initial State Global Sample
export const initialStateGlobal = {
  layout: Immutable({
    sidebar: {
      visible: false,
      navItems: [
        {
          title: 'test',
          items: [
            {
              title: 'Home Page',
              to: '/admin/home',
              htmlBefore: '<i class="material-icons">edit</i>',
              htmlAfter: ''
            },
            {
              title: 'Page 3',
              htmlBefore: '<i class="material-icons">note_add</i>',
              to: '/admin/page3'
            },
            {
              title: 'Page 4',
              htmlBefore: '<i class="material-icons">view_module</i>',
              to: '/admin/page4'
            }
          ]
        }
      ]
    }
  }),
  'system-messages': Immutable([
    {
      id: 'ERROR-1',
      gravity: 'ERROR',
      text: 'An error occured. Please try again',
      headerText: 'An error occured',
      displayMode: 'MODAL'
    }
  ]),
  notifications: Immutable({
    list: [
      {
        creationDate: '2015-12-31T23:00:00.000Z',
        entityId: '54654',
        entityType: 'GAME',
        id: '15454',
        message: 'Jean Valjean on NLH 1/2',
        notificationType: 'GAME_NEW_MESSAGE_FROM_PLAYER',
        read: false,
        sourceId: 14,
        targetId: 12
      },
      {
        creationDate: '2015-12-31T23:00:00.000Z',
        entityId: '54654',
        entityType: 'GAME',
        id: '12154',
        message: 'NLH 1/2 by Antoine Dupond',
        notificationType: 'NEW_GAME_REQUEST',
        read: false,
        sourceId: 14,
        targetId: 12
      }
    ],
    page: 1,
    size: 10
  }),
  parameters: PARAMETERS_INITIAL_STATE,
  settings: SETTINGS_INITIAL_STATE,
  messages: MESSAGES_INITIAL_STATE,
  users: Immutable({
    list: [
      {
        id: 1096,
        data: {
          firstName: 'Perceval',
          role: 'ADMIN',
          lastName: 'De Galles',
          email: 'perceval@gmail.com'
        }
      }
    ],
    accountList: {
      list: [],
      filters: {
        search: '',
        states: ['PENDING', 'VERIFIED'],
        roles: [
          'ADMIN',
          'LIMITED_ADMIN',
          'POKER_ROOM_MANAGER',
          'COMMUNITY_MANAGER'
        ]
      },
      page: 1,
      last: false,
      size: 20,
      totalElements: 0
    }
  }),
  ...initialStateEvents,
  cashgames: Immutable({
    layout: Immutable({
      currentTab: 'interest'
    }),
    interestList: Immutable({
      list: [
        {
          id: '564231',
          state: 'PENDING',
          date: '2019-08-08T08:18:00.73',
          gameSize: '10/20',
          gameVariant: 'NLH',
          playersNumber: 5,
          messagesNumber: 5,
          fees: '50 $'
        }
      ],
      displayList: {
        listIds: [],
        page: 1,
        last: false,
        size: 10,
        totalElements: 0,
        filters: {
          gameOrigin: 'FLOP_USER',
          gameStates: ['PENDING', 'ACCEPTED', 'DECLINED']
        }
      }
    }),
    runningCashGames: Immutable({
      list: [
        {
          id: '231478',
          date: '2019-08-08T08:18:00.73',
          gameSize: '10/20',
          gameVariant: 'NLH',
          tables: [
            {
              id: '45654465',
              tableId: '1',
              maxPlayers: 10,
              players: [
                {
                  flopId: 1119
                },
                {
                  flopId: 1212
                }
              ]
            },
            {
              id: '2564465',
              state: 'FULL',
              tableId: '2',
              maxPlayers: 10,
              players: [
                {
                  flopId: 1379
                },
                {
                  flopId: 1052
                }
              ]
            }
          ]
        },
        {
          id: '546978',
          date: '2019-08-08T08:18:00.73',
          gameSize: '5/10',
          gameVariant: 'PLO five a super Omaha',
          tables: [
            {
              id: '212112345',
              tableId: '3',
              maxPlayers: 5,
              players: [
                {
                  flopId: 1079
                },
                {
                  flopId: 1012
                }
              ]
            },
            {
              id: '78998754',
              tableId: '4',
              maxPlayers: 10,
              players: [
                {
                  flopId: 1012
                },
                {
                  flopId: 1024
                },
                {
                  flopId: 1042
                }
              ]
            }
          ]
        }
      ],
      displayList: {
        listIds: [],
        page: 1,
        last: false,
        size: 10,
        totalElements: 0,
        filters: {}
      },
      playerStatus: []
    })
  }),
  players: Immutable({
    list: [
      {
        id: 1171,
        data: {
          lastName: 'KingsHell',
          country: 'France',
          countryCode: 'FR',
          firstName: 'Lucifer morningsta'
        },
        position: {
          value: 12,
          metric: 'km'
        },
        profilePicture: ''
      },
      {
        id: 1079,
        data: {
          lastName: 'Freddyyyyyyyyy',
          country: 'France',
          countryCode: 'FR',
          firstName: 'Cococococo'
        },
        position: {
          value: 4,
          metric: 'km'
        },
        profilePicture:
          'https://3p8wiqca3c.execute-api.eu-west-1.amazonaws.com/dev-mobile/images/1212399/1079/4886bf9f-e8ac-4b9c-85a1-6aaa3be0e142.jpg'
      },
      {
        id: 1096,
        data: {
          lastName: 'KingsHell',
          country: 'Germany',
          countryCode: 'GR',
          firstName: 'Lucifer morningsta'
        },
        position: {
          value: 400,
          metric: 'km'
        },
        profilePicture:
          'https://3p8wiqca3c.execute-api.eu-west-1.amazonaws.com/dev-mobile/images/09c1be2/1096/76a599db-0ed5-4064-9b90-51bd8638daae.jpg'
      },
      {
        id: 1170,
        data: {
          lastName: 'Bisous',
          country: 'Belgium',
          countryCode: 'BL',
          firstName: 'Gros'
        },
        position: {
          value: 10000,
          metric: 'km'
        },
        profilePicture:
          'https://3p8wiqca3c.execute-api.eu-west-1.amazonaws.com/dev-mobile/images/18fcb12/1170/b93c6526-41d1-428d-8bee-a4bbde2de4e6.jpg'
      },
      {
        id: 1089,
        data: {
          lastName: 'Pots',
          country: 'France',
          countryCode: 'FR',
          firstName: 'Nols'
        },
        position: {
          value: 4,
          metric: 'km'
        },
        profilePicture:
          'https://3p8wiqca3c.execute-api.eu-west-1.amazonaws.com/dev-mobile/images/f976b25/1089/7808a034-e61b-4a65-a691-8fbfed35841b.jpg'
      }
    ]
  }),
  ...initialStateCasinos
};

export const initialStateAuthent = {
  authentication: Immutable({
    signin: {
      id: 1096,
      managedCasinoId: 'casino1',
      customerId: 23,
      casinoIds: ['casino1', 'casino2', 'casino3']
    },
    authorizationToken:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZXJsaW4tYWRAeW9wbWFpbC5jb20iLCJhdXRob3JpdGllcyI6WyJDQVNJTk9fTUFOQUdFUiJdLCJpYXQiOjE1NjQxNDIxNzIsImV4cCI6MTU5NTY3ODE3MiwiY3VycmVudFVzZXJJZCI6NDEsIm1hbmFnZWRDYXNpbm9JZCI6Ii16RGlfV29CdFB6RkdIMFFxZFVIIiwiY3VzdG9tZXJJZCI6NDl9.bmUb9CGn68NftEF5fw6AamxrUR6aM_yq6ilyTgLizR-d0OsU2pli8SdCi06FbD__98nszl1HEAzivp7K8e2bYQ'
  })
};

export const initialStateSettings = {
  settings: Immutable({
    games: [
      {
        variant: 'NLH',
        smallBlind: 1,
        bigBlind: 2
      },
      {
        variant: 'NLH',
        smallBlind: 5,
        bigBlind: 10
      }
    ]
  })
};

export const initialStateParameters = {
  parameters: Immutable({
    countries: {
      data: MockCountries,
      page: 1,
      last: false
    }, // Country List
    cities: {
      data: MockCities,
      page: 1,
      last: false
    } // City List
  })
};
