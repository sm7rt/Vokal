import Immutable from 'seamless-immutable';
import { SortType } from '../../../../../../common/models';
import Actions, { INITIAL_STATE, reducer } from '../InterestListRedux';

// Test on Fetch Upcoming Interest List Redux
test('success Fetch Upcoming Interest Lists', () => {
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
    Actions.fetchInterestListListSuccessResponse(
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
 * Test on Add Interest List To List
 * 1 - Add Interest List id to list
 * 2 - Fill Players Number
 * 3 - Fill Messages Number
 */
test('addCashGameToList, fillPlayersNumber, fillMessagesNumber', () => {
  const interestList = {
    id: 'game1',
    state: 'PENDING',
    date: '2019-08-08T08:18:00.73',
    gameSize: '10/20',
    gameVariant: 'NLH',
    fees: '50 $'
  };
  const playersNumber = 5;

  // Add Interest List To list
  let state = reducer(
    INITIAL_STATE,
    Actions.fetchInterestListRequest(interestList.id, interestList)
  );
  // They have to have the sames values
  expect(state.list).toHaveLength(1);
  expect(state.list[0].state).toEqual(interestList.state);
  expect(state.list[0].date).toEqual(interestList.date);
  expect(state.list[0].gameSize).toEqual(interestList.gameSize);
  expect(state.list[0].gameVariant).toEqual(interestList.gameVariant);
  expect(state.list[0].fees).toEqual(interestList.fees);

  // Fill Festival Banner Url
  state = reducer(
    state,
    Actions.fillInterestListPlayersNumber(interestList.id, playersNumber)
  );
  // They have to have the sames values
  expect(state.list[0].playersNumber).toEqual(playersNumber);
});

// Define Initial State With One Festival for Some test
const INITIAL_STATE_TEST = Immutable({
  list: [
    {
      id: 'game1',
      state: 'PENDING',
      date: '2019-08-08T08:18:00.73',
      gameSize: '10/20',
      gameVariant: 'NLH',
      fees: '50 $',
      messages: {
        list: [],
        totalElements: 0
      }
    }
  ],
  displayList: {
    // Running CashGames part
    listIds: ['game1'],
    page: 1,
    last: false,
    size: 10,
    totalElements: 0,
    sorts: [],
    filters: {
      gameType: 'FLOP_GAMES',
      states: ['PENDING', 'ACCEPTED', 'DECLINED']
    }
  }
});

/**
 * Delete Interest List Callback
 */
test('Delete Interest List  Callback', () => {
  // Delete Interest List  Response
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.deleteInterestListSuccessResponse('game1')
  );
  // They have to have the sames values
  expect(state.list).toHaveLength(0);
});

/**
 * Accept Interest List Callback
 */
test('Accept Interest List  Callback', () => {
  // Delete Interest List  Response
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.acceptInterestListSuccessResponse('game1')
  );
  // They have to have the sames values
  expect(state.list[0].state).toEqual('ACCEPTED');
});

/**
 * Decline Interest List Callback
 */
test('Decline Interest List  Callback', () => {
  // Delete Interest List  Response
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.declineInterestListSuccessResponse('game1')
  );
  // They have to have the sames values
  expect(state.list[0].state).toEqual('DECLINED');
});

// Test on Fetch Registered Players Redux
test('success Fetch Registered Players', () => {
  const datas = [
    {
      accountId: 1083
    },
    {
      accountId: 1084
    },
    {
      accountId: 1099
    }
  ];
  const runningGameId = 'game1';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.fetchRegisteredPlayersSuccessResponse(runningGameId, datas)
  );
  // They have to have the sames values
  expect(state.list[0].playersListIds).toEqual([1083, 1084, 1099]);
});
