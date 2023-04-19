import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import MessagesAction from '../../../../../../common/redux/SystemMessagesRedux';
import i18n from '../../../../../../i18n';
import PlayersActions from '../../../../../players/redux/PlayersRedux';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import FixtureRunningCashGamesApi from '../../services/FixtureRunningCashGamesApi';
import {
  addNewPlayer,
  removePlayer,
  fetchJoinSeatRequests,
  editTable,
  closeTable,
  sitPlayer,
  callPlayer,
  acceptJoinSeatRequest,
  declineJoinSeatRequest
} from '../CashGamesTableSagas';

// Testing addNewPlayer Middleware Success
test('addNewPlayer Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const player = {
    name: 'Jojo'
  };
  const Response = {
    status: 201,
    headers: {
      location: 'http:///ezrzer/1078'
    }
  };

  return expectSaga(addNewPlayer, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId,
    player
  })
    .provide([
      [matchers.call.fn(FixtureRunningCashGamesApi.addNewPlayer), Response]
    ])
    .put(
      RunningCashGamesActions.addNewPlayerSuccessResponse(
        runningCashGameId,
        tableId,
        {
          id: '1078',
          ...player,
          requestState: 'SITTED'
        }
      )
    )
    .put(
      MessagesAction.addMessage(
        'ADD_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('ADD_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing removePlayer Middleware Success
test('removePlayer Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const playerId = 3212;
  const Response = {
    status: 204
  };

  return expectSaga(removePlayer, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId,
    playerId
  })
    .provide([
      [matchers.call.fn(FixtureRunningCashGamesApi.addNewPlayer), Response]
    ])
    .put(
      RunningCashGamesActions.removePlayerFromTableSuccessResponse(
        runningCashGameId,
        tableId,
        playerId
      )
    )
    .put(
      MessagesAction.addMessage(
        'REMOVE_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('REMOVE_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing fetchJoinSeatRequests Middleware Success
test('fetchJoinSeatRequests Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const Response = {
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

  return expectSaga(fetchJoinSeatRequests, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId
  })
    .provide([
      [
        matchers.call.fn(FixtureRunningCashGamesApi.fetchJoinSeatRequests),
        Response
      ]
    ])
    .put(
      RunningCashGamesActions.fetchJoinSeatReqSuccessResponse(
        runningCashGameId,
        tableId,
        Response.data
      )
    )
    .put(PlayersActions.fetchPlayerRequest(Response.data[0].flopId))
    .put(PlayersActions.fetchPlayerRequest(Response.data[1].flopId))
    .run();
});

// Testing editTable Middleware Success
test('editTable Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const data = {
    gameVariant: 'NLH',
    smallBlind: '10',
    bigBlind: '10'
  };
  const Response = {
    status: 204
  };

  return expectSaga(editTable, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId,
    data
  })
    .provide([
      [matchers.call.fn(FixtureRunningCashGamesApi.editTable), Response]
    ])
    .put(
      RunningCashGamesActions.editTableSuccessResponse(
        runningCashGameId,
        tableId
      )
    )
    .put(
      MessagesAction.addMessage(
        'EDIT_TABLE_SUCCESS',
        'SUCCESS',
        i18n.t('EDIT_TABLE_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing closeTable Middleware Success
test('closeTable Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const Response = {
    status: 204
  };

  return expectSaga(closeTable, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId
  })
    .provide([
      [matchers.call.fn(FixtureRunningCashGamesApi.closeTable), Response]
    ])
    .put(
      RunningCashGamesActions.closeTableSuccessResponse(
        runningCashGameId,
        tableId
      )
    )
    .put(
      MessagesAction.addMessage(
        'CLOSE_TABLE_SUCCESS',
        'SUCCESS',
        i18n.t('CLOSE_TABLE_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing sitPlayer Middleware Success
test('sitPlayer Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const player = {
    id: '56445',
    flopId: 1096
  };
  const Response = {
    status: 204
  };

  return expectSaga(sitPlayer, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId,
    player
  })
    .provide([
      [matchers.call.fn(FixtureRunningCashGamesApi.sitPlayer), Response]
    ])
    .put(
      RunningCashGamesActions.sitPlayerSuccessResponse(
        runningCashGameId,
        tableId,
        player
      )
    )
    .put(
      MessagesAction.addMessage(
        'SIT_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('SIT_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing callPlayer Middleware Success
test('callPlayer Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const player = {
    id: '56445',
    flopId: 1096
  };
  const Response = {
    status: 204
  };

  return expectSaga(callPlayer, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId,
    player
  })
    .provide([
      [matchers.call.fn(FixtureRunningCashGamesApi.callPlayer), Response]
    ])
    .put(
      RunningCashGamesActions.callPlayerSuccessResponse(
        runningCashGameId,
        tableId,
        player
      )
    )
    .put(
      MessagesAction.addMessage(
        'CALL_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('CALL_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing acceptJoinSeatRequest Middleware Success
test('acceptJoinSeatRequest Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const player = {
    id: '56445',
    flopId: 1096
  };
  const Response = {
    status: 204
  };

  return expectSaga(acceptJoinSeatRequest, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId,
    player
  })
    .provide([
      [
        matchers.call.fn(FixtureRunningCashGamesApi.acceptJoinSeatRequest),
        Response
      ]
    ])
    .put(
      RunningCashGamesActions.confirmJoinSeatReqSuccessResponse(
        runningCashGameId,
        tableId,
        player
      )
    )
    .put(
      MessagesAction.addMessage(
        'ACCEPT_JOIN_SEAT_REQUEST_SUCCESS',
        'SUCCESS',
        i18n.t('ACCEPT_JOIN_SEAT_REQUEST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing declineJoinSeatRequest Middleware Success
test('declineJoinSeatRequest Middleware Success', () => {
  const runningCashGameId = '1324';
  const tableId = '56487';
  const player = {
    id: '56445',
    flopId: 1096
  };
  const Response = {
    status: 204
  };

  return expectSaga(declineJoinSeatRequest, FixtureRunningCashGamesApi, {
    runningCashGameId,
    tableId,
    player
  })
    .provide([
      [
        matchers.call.fn(FixtureRunningCashGamesApi.declineJoinSeatRequest),
        Response
      ]
    ])
    .put(
      RunningCashGamesActions.declineJoinSeatReqSuccessResponse(
        runningCashGameId,
        tableId,
        player.id
      )
    )
    .put(
      MessagesAction.addMessage(
        'DECLINE_JOIN_SEAT_REQUEST_SUCCESS',
        'SUCCESS',
        i18n.t('DECLINE_JOIN_SEAT_REQUEST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});
