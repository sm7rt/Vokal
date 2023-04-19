import Actions, { reducer, INITIAL_STATE } from '../RunningCashGamesRedux';
import Immutable from 'seamless-immutable';
import { SortType } from '../../../../../../common/models';

// Test on Fetch Running Cash Games Redux
test('success Fetch Running Cash Games', () => {
  const data = [
    {
      id: 'game1'
    },
    {
      id: 'game2'
    }
  ];
  const page = 1;
  const filters = {};
  const last = false;
  const totalElements = 2;
  const size = 10;
  const sorts: Array<SortType> = [];
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchRunningCashGamesSuccessResponse(
      data,
      filters,
      page,
      last,
      totalElements,
      size,
      sorts
    )
  );
  // They have to have the sames values
  expect(state.displayList.listIds.length).toEqual(2);
  expect(state.displayList.page).toEqual(1);
  expect(state.displayList.last).toEqual(false);
  expect(state.displayList.totalElements).toEqual(totalElements);
  expect(state.displayList.size).toEqual(size);
  expect(state.displayList.sorts).toEqual(sorts);
});

/**
 * Test on Running Cash Game To List
 * 1 - Add Running Cash Game id to list
 * 2 - Fill Waiting List Number
 * 3 - Fill Messages Number
 */
test('addCashGameToList', () => {
  const runningGame = {
    id: '5469487',
    state: 'MEDIUM',
    date: '2019-08-08T08:18:00.73',
    gameSize: '1/2',
    gameVariant: 'NLH',
    totalPlayers: 10,
    totalSeatAvailable: 0,
    tables: [
      {
        id: '212782345',
        state: 'FULL',
        tableId: '5',
        maxPlayers: '10',
        playersNumber: 10
      }
    ]
  };

  // Add Interest List To list
  let state = reducer(
    INITIAL_STATE,
    Actions.fetchRunningCashGameRequest(runningGame.id, runningGame)
  );
  // They have to have the sames values
  expect(state.list).toHaveLength(1);
  expect(state.list[0]).toEqual(runningGame);
});

// Define Initial State With One Festival for Some test
const INITIAL_STATE_TEST = Immutable({
  list: [
    {
      id: '5469487',
      state: 'MEDIUM',
      date: '2019-08-08T08:18:00.73',
      gameSize: '1/2',
      gameVariant: 'NLH',
      waitingList: [
        {
          id: 'playerId2',
          flopId: 1023
        },
        {
          id: 'playerId20',
          flopId: 1032
        },
        { id: 'playerId21', flopId: 3203 }
      ],
      tables: [
        {
          id: '212782345',
          state: 'FULL',
          tableId: '5',
          maxPlayers: 10,
          playersNumber: 3,
          players: [
            {
              id: 'playerId1',
              flopId: 1023
            },
            {
              id: 'playerId3',
              flopId: 1032
            },
            {
              id: 'playerId4',
              flopId: 3203
            }
          ],
          joinSeatRequestList: [1093]
        }
      ]
    }
  ],
  displayList: {
    // Running CashGames part
    listIds: ['5469487'],
    page: 1,
    last: false,
    size: 10,
    totalElements: 0,
    sorts: [],
    filters: {}
  }
});

// Test on Add New Player Redux
test('success Add New Player', () => {
  const player = {
    flopId: 100,
    name: ''
  };
  const runningGameId = '5469487';
  const tableId = '212782345';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.addNewPlayerSuccessResponse(runningGameId, tableId, player)
  );
  // They have to have the sames values
  expect(
    state.list[0].tables[0].players.find(
      (playerTable: any) => playerTable.flopId === player.flopId
    )
  ).toBeDefined();
});

// Test on Remove Player Redux
test('success Remove Player', () => {
  const playerId = 'playerId1';
  const runningGameId = '5469487';
  const tableId = '212782345';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.removePlayerFromTableSuccessResponse(
      runningGameId,
      tableId,
      playerId
    )
  );
  // They have to have the sames values
  expect(
    state.list[0].tables[0].players.find(
      (playerTable: any) => playerTable.id === playerId
    )
  ).toBeUndefined();
});

// Test on Fetch Waiting List Redux
test('success Fetch Waiting List Players', () => {
  const datas = [
    {
      accountId: 1013
    },
    {
      accountId: 1014
    },
    {
      accountId: 1019
    }
  ];
  const runningGameId = '5469487';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.fetchWaitingListSuccessResponse(runningGameId, datas)
  );
  // They have to have the sames values
  expect(state.list[0].waitingList).toEqual(datas);
});

// Test on Add New Player Redux
test('success Add New Player to Waiting List', () => {
  const player = {
    flopId: 100,
    name: ''
  };
  const runningGameId = '5469487';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.addNewPlayerToWaitingListSuccessResponse(runningGameId, player)
  );
  // They have to have the sames values
  expect(
    state.list[0].waitingList.find(
      (playerWL: any) => playerWL.flopId === player.flopId
    )
  ).toBeDefined();
});

// Test on Remove Player from waiting list Redux
test('success Remove Player from waitiing list', () => {
  const playerId = 'playerId2';
  const runningGameId = '5469487';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.removePlayerFromWaitingListSuccessResponse(runningGameId, playerId)
  );
  // They have to have the sames values
  expect(
    state.list[0].waitingList.find((playerWL: any) => playerWL.id === playerId)
  ).toBeUndefined();
});

// Test Close a Table
test('success Close a Table', () => {
  const runningGameId = '5469487';
  const tableId = '212782345';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.closeTableSuccessResponse(runningGameId, tableId)
  );
  // They have to have the sames values
  // There is only one table in the game so the entire game need to disapeaer
  expect(state.list.length).toEqual(0);
  expect(state.displayList.listIds.length).toEqual(0);
});

// Test on Confirm Join Seat Req Reducer
test('success Confirm Join Seat Req', () => {
  const player = {
    id: 'playerId2',
    flopId: 1093
  };
  const runningGameId = '5469487';
  const tableId = '212782345';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.confirmJoinSeatReqSuccessResponse(runningGameId, tableId, player)
  );
  // They have to have the sames values
  expect(
    state.list[0].tables[0].joinSeatRequestList.find(
      (playerJS: GamesApiDefinitions.PlayerDTO) => playerJS.id === player.id
    )
  ).toBeUndefined();
  expect(
    state.list[0].tables[0].players.find(
      (playerTable: GamesApiDefinitions.PlayerDTO) =>
        playerTable.id === player.id
    )
  ).toBeDefined();
});

// Test on Decline Join Seat Req Reducer
test('success Decline Join Seat Req', () => {
  const runningGameId = '5469487';
  const tableId = '212782345';
  const playerId = 1093;
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.declineJoinSeatReqSuccessResponse(runningGameId, tableId, playerId)
  );
  // They have to have the sames values
  expect(
    state.list[0].tables[0].joinSeatRequestList.find(
      (playerJS: GamesApiDefinitions.PlayerDTO) => playerJS.id === playerId
    )
  ).toBeUndefined();
});

/**
 * Test fill player Status
 */
test('fill player Status', () => {
  const playerId = 1;
  const playerStatus = {
    tableId: '1',
    gameId: '2',
    status: 'SITTED'
  };

  // Add Interest List To list
  let state = reducer(
    INITIAL_STATE,
    Actions.fillPlayerStatus(playerId, playerStatus)
  );
  // They have to have the sames values
  expect(state.playerStatus).toHaveLength(1);
  expect(state.playerStatus[0]).toEqual({
    id: playerId,
    ...playerStatus
  });
});
