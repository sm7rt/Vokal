import { AnyAction } from 'redux';
import { all, call, cancelled, put, fork } from 'redux-saga/effects';
import MessagesAction from '../../../../../common/redux/SystemMessagesRedux';
import i18n from '../../../../../i18n';
import { getHeaderId } from '../../../../../utils/LocationUtils';
import PlayersActions from '../../../../players/redux/PlayersRedux';
import { RunningCashGamesServiceType } from '../../../models/CashGamesModel.d';
import RunningCashGamesActions from '../redux/RunningCashGamesRedux';
import { fetchRunningCashGameDetails } from './RunningCashGamesSagas';

/**
 * Add new Player
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* addNewPlayer(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, player } = action;

  const addNewPlayerResponse = yield call(api.addNewPlayer, tableId, player);

  if (addNewPlayerResponse.status === 201) {
    const playerId = getHeaderId(addNewPlayerResponse);
    // Success
    yield put(
      RunningCashGamesActions.addNewPlayerSuccessResponse(
        runningCashGameId,
        tableId,
        {
          id: playerId,
          ...player,
          requestState: 'SITTED'
        }
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'ADD_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('ADD_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.addNewPlayerFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'ADD_PLAYER_ERROR',
        'ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('ADD_PLAYER_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Remove a Player from a Table
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* removePlayer(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, playerId } = action;

  const removePlayerResponse = yield call(api.removePlayer, playerId);

  if (removePlayerResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.removePlayerFromTableSuccessResponse(
        runningCashGameId,
        tableId,
        playerId
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'REMOVE_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('REMOVE_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.removePlayerFromTableFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'REMOVE_PLAYER_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('REMOVE_PLAYER_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * fetchJoinSeatRequests Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchJoinSeatRequests(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId } = action;
  try {
    const fetchJoinSeatRequestsResponse = yield call(
      api.fetchJoinSeatRequests,
      runningCashGameId,
      tableId
    );
    if (fetchJoinSeatRequestsResponse.status === 200) {
      // Authentication Success
      yield put(
        RunningCashGamesActions.fetchJoinSeatReqSuccessResponse(
          runningCashGameId,
          tableId,
          fetchJoinSeatRequestsResponse.data
        )
      );

      // Fetch Users Informations
      yield all(
        fetchJoinSeatRequestsResponse.data.map(
          (player: GamesApiDefinitions.PlayerDTO) =>
            put(PlayersActions.fetchPlayerRequest(player.flopId))
        )
      );

      // Load Image for All Events
    } else {
      yield put(RunningCashGamesActions.fetchJoinSeatReqFailureResponse());
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(RunningCashGamesActions.fetchJoinSeatReqCancelResponse());
    }
  }
}

/**
 * Edit a table
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* editTable(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, data } = action;

  // Construct GameSize
  const dataToSend = {
    gameVariant: data.gameVariant,
    gameSize: `${data.smallBlind}/${data.bigBlind}`
  };

  const editTableResponse = yield call(api.editTable, tableId, dataToSend);

  if (editTableResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.editTableSuccessResponse(
        runningCashGameId,
        tableId
      )
    );

    // Refresh Running CashGame List
    yield put(
      RunningCashGamesActions.fetchRunningCashGamesRequest({}, 1, 50, [])
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'EDIT_TABLE_SUCCESS',
        'SUCCESS',
        i18n.t('EDIT_TABLE_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.editTableFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'EDIT_TABLE_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('EDIT_TABLE_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Close a table
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* closeTable(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId } = action;

  const closeTableResponse = yield call(api.closeTable, tableId);

  if (closeTableResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.closeTableSuccessResponse(
        runningCashGameId,
        tableId
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'CLOSE_TABLE_SUCCESS',
        'SUCCESS',
        i18n.t('CLOSE_TABLE_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.closeTableFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'CLOSE_TABLE_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('CLOSE_TABLE_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Sit Player
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* sitPlayer(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, player } = action;

  const sitPlayerResponse = yield call(
    api.sitPlayer,
    runningCashGameId,
    tableId,
    player.id
  );

  if (sitPlayerResponse.status === 204) {
    // Refresh Game
    yield fork(fetchRunningCashGameDetails, api, runningCashGameId);

    // Success
    yield put(
      RunningCashGamesActions.sitPlayerSuccessResponse(
        runningCashGameId,
        tableId,
        player
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'SIT_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('SIT_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.sitPlayerFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'SIT_PLAYER_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('SIT_PLAYER_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Call Player
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* callPlayer(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, player } = action;

  const callPlayerResponse = yield call(
    api.callPlayer,
    runningCashGameId,
    player.id
  );

  if (callPlayerResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.callPlayerSuccessResponse(
        runningCashGameId,
        tableId,
        player
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'CALL_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('CALL_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.callPlayerFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'CALL_PLAYER_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('CALL_PLAYER_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Accept Join Seat Request
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* acceptJoinSeatRequest(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, player } = action;

  const acceptJoinSeatRequestResponse = yield call(
    api.acceptJoinSeatRequest,
    tableId,
    player.id
  );

  if (acceptJoinSeatRequestResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.confirmJoinSeatReqSuccessResponse(
        runningCashGameId,
        tableId,
        player
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'ACCEPT_JOIN_SEAT_REQUEST_SUCCESS',
        'SUCCESS',
        i18n.t('ACCEPT_JOIN_SEAT_REQUEST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.confirmJoinSeatReqFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'ACCEPT_JOIN_SEAT_REQUEST_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('ACCEPT_JOIN_SEAT_REQUEST_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Decline Join Seat Request
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* declineJoinSeatRequest(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, player } = action;

  const declineJoinSeatRequestResponse = yield call(
    api.declineJoinSeatRequest,
    tableId,
    player.id
  );

  if (declineJoinSeatRequestResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.declineJoinSeatReqSuccessResponse(
        runningCashGameId,
        tableId,
        player.id
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'DECLINE_JOIN_SEAT_REQUEST_SUCCESS',
        'SUCCESS',
        i18n.t('DECLINE_JOIN_SEAT_REQUEST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.declineJoinSeatReqFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'DECLINE_JOIN_SEAT_REQUEST_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('DECLINE_JOIN_SEAT_REQUEST_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Confirm Sit Player
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* confirmSitPlayer(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, tableId, player } = action;

  const confirmSitPlayerResponse = yield call(
    api.confirmSitPlayer,
    tableId,
    player.id
  );

  if (confirmSitPlayerResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.confirmSitPlayerSuccessResponse(
        runningCashGameId,
        tableId,
        player.id
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'CONFIRM_SIT_PLAYER_SUCCESS',
        'SUCCESS',
        i18n.t('CONFIRM_SIT_PLAYER_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.declineJoinSeatReqFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'CONFIRM_SIT_PLAYER_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('CONFIRM_SIT_PLAYER_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}
