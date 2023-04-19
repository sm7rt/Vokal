// Export All Cash Games FixtUre API
// Export Default
export default {
  /**
   * Fetch Upcoming CashGames Method
   * @param {*} gameType : The casino Id
   * @param {*} filters : The filters for the list
   * @param {*} sorts : The sorts for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  fetchInterestList: (gameType: 'FLOP' | 'CASINO', queryParams: string) => {
    const cashGamesListResult = [
      {
        id: '231478',
        state: 'PENDING',
        date: '2019-08-08T08:18:00.73',
        gameSize: '10/20',
        gameVariant: 'NLH',
        fees: '50 $',
        gameOrigin: 'FLOP_USER'
      },
      {
        id: '546978',
        state: 'ACCEPTED',
        date: '2019-08-08T08:18:00.73',
        gameSize: '5/10',
        gameVariant: 'PLO five a super Omaha',
        fees: '20 $',
        gameOrigin: 'FLOP_USER'
      },
      {
        id: '5469418',
        state: 'DECLINED',
        date: '2019-08-08T08:18:00.73',
        gameSize: '1/2',
        gameVariant: 'NLH',
        fees: '20 $',
        gameOrigin: 'FLOP_USER'
      },
      {
        id: '54694322',
        state: 'DECLINED',
        date: '2019-08-08T08:18:00.73',
        gameSize: '1/2',
        gameVariant: 'NLH',
        fees: '20 $',
        gameOrigin: 'FLOP_USER'
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
   * Fetch Players Number with interestListId
   * @param {*} interestListId
   */
  fetchPlayersCount: (interestListId: string) => {
    return {
      status: 200,
      data: interestListId === '231478' ? 0 : 3
    };
  },

  /**
   * Fetch Registers Players with interestListId
   * @param {*} interestListId
   */
  fetchRegisteredPlayers: (interestListId: string) => {
    return {
      status: 200,
      data: [
        {
          accountId: 10
        },
        {
          accountId: 19
        },
        {
          accountId: 17
        }
      ]
    };
  },

  /**
   * Accept A game
   */
  acceptInterestList: (gameId: string) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * Decline A game
   */
  declineInterestList: (gameId: string) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * Create Interest List
   */
  createInterestList: (data: Object) => {
    return {
      status: 201,
      data: {},
      headers: {
        location: 'https//blablabala/56412'
      }
    };
  },

  /**
   * Start Interest List
   */
  startInterestList: (data: Object) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * Fetch Interest List Details
   */
  fetchInterestListDetails: (gameId: string) => {
    return {
      status: 200,
      data: {
        id: gameId,
        state: 'PENDING',
        date: '2019-09-08T08:18:00.73',
        gameSize: '50/100',
        gameVariant: 'NLH',
        fees: '50 $'
      }
    };
  },

  /**
   * Delete Interest List
   */
  deleteInterestList: (gameId: string) => {
    return {
      status: 200,
      data: {}
    };
  }
};
