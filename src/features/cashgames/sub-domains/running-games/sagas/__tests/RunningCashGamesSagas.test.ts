import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { select } from 'redux-saga/effects';
import { SortType } from '../../../../../../common/models';
import MessagesAction from '../../../../../../common/redux/SystemMessagesRedux';
import i18n from '../../../../../../i18n';
import {
  currentCasinoSelector
  //   ownerSelector
} from '../../../../../authentication/redux/AuthenticationRedux';
import PlayersActions from '../../../../../players/redux/PlayersRedux';
import RunningCashGamesActions, {
  runningCashGamesFromListSelector
} from '../../redux/RunningCashGamesRedux';
import FixtureRunningCashGamesApi from '../../services/FixtureRunningCashGamesApi';
import {
  addNewPlayerToWaitingList,
  addNewTable,
  fetchRunningCashGamesList,
  fetchWaitingList,
  removePlayerFromWaitingList
} from '../RunningCashGamesSagas';

// Testing fetchRunningCashGamesList Middleware Success
test('fetchRunningCashGamesList Middleware Success', () => {
  const filters = {};
  const page = 1;
  const size = 20;
  const sorts: Array<SortType> = [];
  const Response = {
    status: 200,
    data: {
      content: [
        {
          liveGameKey: '231478',
          date: '2019-08-08T08:18:00.73',
          gameSize: '10/20',
          gameVariant: 'NLH',
          totalPlayers: 13,
          totalSeatAvailable: 7,
          totalTables: 2,
          tables: [
            {
              players: [
                {
                  flopId: 10
                },
                {
                  flopId: 12
                }
              ]
            },
            {
              players: [
                {
                  flopId: 11
                }
              ]
            }
          ]
        }
      ],
      last: true,
      totalElements: 1
    }
  };

  return expectSaga(fetchRunningCashGamesList, FixtureRunningCashGamesApi, {
    filters,
    page,
    size,
    sorts
  })
    .provide([
      [select(currentCasinoSelector), 'casinoId1'],
      [
        matchers.call.fn(FixtureRunningCashGamesApi.fetchRunningCashGames),
        Response
      ]
    ])
    .put(
      RunningCashGamesActions.fetchRunningCashGamesSuccessResponse(
        [
          {
            ...Response.data.content[0],
            id: '231478'
          }
        ],
        filters,
        page,
        Response.data.last,
        Response.data.totalElements,
        size,
        sorts
      )
    )

    .put(
      RunningCashGamesActions.fetchRunningCashGameRequest(
        Response.data.content[0].liveGameKey,
        Response.data.content[0]
      )
    )
    .put(PlayersActions.fetchPlayerRequest(10))
    .put(PlayersActions.fetchPlayerRequest(12))
    .put(PlayersActions.fetchPlayerRequest(11))
    .run();
});

// Testing addNewTable Middleware Success
// Fix Test (Selector Map problem)
xtest('addNewTable Middleware Success', () => {
  const runningCashGameId = '1324';
  const data = {
    tableId: 1,
    maxPlayers: 10
  };
  const Response = {
    status: 204
  };

  const runningGame = {
    id: '231478',
    liveGameKey: '231478',
    date: '2019-08-08T08:18:00.73',
    gameSize: '10/20',
    gameVariant: 'NLH'
  };

  return (
    expectSaga(addNewTable, FixtureRunningCashGamesApi, {
      runningCashGameId,
      data
    })
      .provide([
        [
          select(runningCashGamesFromListSelector(), runningCashGameId),
          runningGame
        ],
        [matchers.call.fn(FixtureRunningCashGamesApi.addNewTable), Response]
      ])
      .put(
        RunningCashGamesActions.addNewTableSuccessResponse(runningCashGameId)
      )
      // .put(PlayersActions.fetchPlayerRequest('1078'))
      .put(
        MessagesAction.addMessage(
          'ADD_TABLE_SUCCESS',
          'SUCCESS',
          i18n.t('ADD_TABLE_ACTION_SUCCESS'),
          '',
          'PANEL'
        )
      )
      .run()
  );
});

// Testing fetchWaitingList Middleware Success
test('fetchWaitingList Middleware Success', () => {
  const runningCashGameId = '1324';
  const Response = {
    status: 200,
    data: {
      content: [
        {
          flopId: 1076
        },
        {
          flopId: 1647
        }
      ]
    }
  };

  return expectSaga(fetchWaitingList, FixtureRunningCashGamesApi, {
    runningCashGameId
  })
    .provide([
      [matchers.call.fn(FixtureRunningCashGamesApi.fetchWaitingList), Response]
    ])
    .put(
      RunningCashGamesActions.fetchWaitingListSuccessResponse(
        runningCashGameId,
        Response.data.content
      )
    )
    .put(PlayersActions.fetchPlayerRequest(Response.data.content[0].flopId))
    .put(PlayersActions.fetchPlayerRequest(Response.data.content[1].flopId))
    .run();
});

// Testing addNewPlayer To Waiting List Middleware Success
test('addNewPlayer to Waiting List Middleware Success', () => {
  const runningCashGameId = '1324';
  const player = {
    name: 'Jojo'
  };
  const playerId = '1078';
  const Response = {
    status: 201,
    headers: {
      location: `http:///ezrzer/${playerId}`
    }
  };

  return expectSaga(addNewPlayerToWaitingList, FixtureRunningCashGamesApi, {
    runningCashGameId,
    player
  })
    .provide([
      [
        matchers.call.fn(FixtureRunningCashGamesApi.addNewPlayerToWaitingList),
        Response
      ]
    ])
    .put(
      RunningCashGamesActions.addNewPlayerToWaitingListSuccessResponse(
        runningCashGameId,
        {
          id: playerId,
          ...player
        }
      )
    )
    .put(
      MessagesAction.addMessage(
        'ADD_PLAYER_TO_WAITING_LIST_SUCCESS',
        'SUCCESS',
        i18n.t('ADD_PLAYER_TO_WAITING_LIST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing removePlayer from waiting list Middleware Success
test('removePlayer from waiting list Middleware Success', () => {
  const runningCashGameId = '1324';
  const playerId = 3212;
  const Response = {
    status: 204
  };

  return expectSaga(removePlayerFromWaitingList, FixtureRunningCashGamesApi, {
    runningCashGameId,
    playerId
  })
    .provide([
      [
        matchers.call.fn(
          FixtureRunningCashGamesApi.removePlayerFromWaitingList
        ),
        Response
      ]
    ])
    .put(
      RunningCashGamesActions.removePlayerFromWaitingListSuccessResponse(
        runningCashGameId,
        playerId
      )
    )
    .put(
      MessagesAction.addMessage(
        'REMOVE_PLAYER_FROM_WAITING_LIST_SUCCESS',
        'SUCCESS',
        i18n.t('REMOVE_PLAYER_FROM_WAITING_LIST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});
