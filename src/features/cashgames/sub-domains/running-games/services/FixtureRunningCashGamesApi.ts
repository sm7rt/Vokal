// Export All Cash Games FixtUre API
// Export Default
export default {
  /**
   * Fetch Upcoming CashGames Method
   * @param {*} queryParams
   */
  fetchRunningCashGames: (queryParams: string) => {
    const cashGamesListResult = [
      {
        liveGameKey: '231478',
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
                id: 'player1',
                flopId: 1119,
                requestState: 'SITTED'
              },
              {
                id: 'player2',
                flopId: 1212,
                requestState: 'SITTED'
              }
            ]
          },
          {
            id: '2564465',
            tableId: '2',
            maxPlayers: 10,
            players: [
              {
                id: 'player3',
                flopId: 1119,
                requestState: 'SITTED'
              },
              {
                id: 'player4',
                name: 'John Rambo',
                requestState: 'SITTED'
              },
              {
                id: 'player5',
                flopId: 2119,
                requestState: 'SITTED'
              },
              {
                id: 'player6',
                name: 'Serge Benamou',
                requestState: 'SITTED'
              }
            ]
          }
        ]
      },
      {
        liveGameKey: '546978',
        date: '2019-08-08T08:18:00.73',
        gameSize: '5/10',
        gameVariant: 'PLO five a super Omaha',
        tables: [
          {
            id: '212112345',
            tableId: '3',
            maxPlayers: 10,
            players: [
              {
                id: 'player8',
                flopId: 1119,
                requestState: 'SITTED'
              },
              {
                id: 'player9',
                flopId: 1212,
                requestState: 'SITTED'
              },
              {
                id: 'player6',
                flopId: 2119,
                requestState: 'SITTED'
              },
              {
                id: 'player10',
                flopId: 1112,
                requestState: 'SITTED'
              }
            ]
          },
          {
            id: '78998754',
            tableId: '4',
            maxPlayers: 10,
            players: [
              {
                id: 'player1',
                flopId: 1119,
                requestState: 'SITTED'
              },
              {
                id: 'player2',
                flopId: 1212,
                requestState: 'SITTED'
              },
              {
                id: 'player3',
                flopId: 2119,
                requestState: 'SITTED'
              },
              {
                id: 'player4',
                flopId: 1112,
                requestState: 'SITTED'
              },
              {
                id: 'player5',
                flopId: 2134,
                requestState: 'SITTED'
              }
            ]
          }
        ]
      },
      {
        liveGameKey: '5469487',
        date: '2019-08-08T08:18:00.73',
        gameSize: '1/2',
        gameVariant: 'NLH',
        tables: [
          {
            id: '212782345',
            tableId: '5',
            maxPlayers: 10,
            players: [{}]
          }
        ]
      }
    ];
    return {
      status: 200,
      data: {
        content: cashGamesListResult,
        last: true
      }
    };
  },

  /**
   * Edit a table
   * @param {*} tableId
   */
  editTable: (tableId: string, data: any) => {
    return {
      status: 201
    };
  },

  /**
   *Close a table
   * @param {*} tableId
   */
  closeTable: (tableId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Fetch Join Seat Requestwith runningCashGameId and table Id
   * @param {*} runningCashGameId
   * @param {*} tableId
   */
  fetchJoinSeatRequests: (runningCashGameId: string, tableId: string) => {
    return {
      status: 200,
      data: [
        {
          id: 'player31',
          flopId: 1183
        },
        {
          id: 'player32',
          flopId: 1184
        },
        {
          id: 'player33',
          flopId: 11099
        }
      ]
    };
  },

  /**
   * Add New Player
   */
  addNewPlayer: (tableId: string, player: GamesApiDefinitions.PlayerDTO) => {
    return {
      status: 201,
      data: {},
      headers: {
        location: 'https//blablabala/1082'
      }
    };
  },

  /**
   * Remove Player
   */
  removePlayer: (playerId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Create a Running Game
   */
  createRunningGame: (runningGame: any) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * Add New Table
   */
  addNewTable: (gameId: string, data: any) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * Fetch Seated Players with runningCashGameId and table Id
   * @param {*} runningCashGameId
   * @param {*} tableId
   */
  fetchWaitingList: (runningCashGameId: string, tableId: string) => {
    return {
      status: 200,
      data: {
        content: [
          {
            id: 'player1',
            flopId: 1083
          },
          {
            id: 'player2',
            flopId: 1084
          },
          {
            id: 'player3',
            flopId: 1099
          }
        ]
      }
    };
  },

  /**
   * Add New Player
   */
  addNewPlayerToWaitingList: (
    gameId: string,
    player: GamesApiDefinitions.PlayerDTO
  ) => {
    return {
      status: 201,
      data: {},
      headers: {
        location: 'https//blablabala/1082'
      }
    };
  },

  /**
   * Remove Player
   */
  removePlayerFromWaitingList: (gameId: string, playerId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Sit Player
   */
  sitPlayer: (gameId: string, tableId: string, playerId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Call Player
   */
  callPlayer: (gameId: string, playerId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Accept Join Seat Request
   */
  acceptJoinSeatRequest: (tableId: string, playerId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Decline Join Seat Request
   */
  declineJoinSeatRequest: (tableId: string, playerId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Confirm Sit Player
   */
  confirmSitPlayer: (tableId: string, playerId: string) => {
    return {
      status: 204
    };
  },

  /**
   * Find Player Status
   */
  findPlayerStatus: (playerId: number) => {
    return {
      status: 404
    };
  }
};
