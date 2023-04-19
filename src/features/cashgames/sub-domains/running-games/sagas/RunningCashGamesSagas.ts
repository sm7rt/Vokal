import { AnyAction } from 'redux';
import {
  all,
  call,
  cancelled,
  fork,
  put,
  select,
  delay,
  take,
  cancel
} from 'redux-saga/effects';
import MessagesAction from '../../../../../common/redux/SystemMessagesRedux';
import i18n from '../../../../../i18n';
import { parseParams } from '../../../../../utils/ApiUtils';
import { getHeaderId } from '../../../../../utils/LocationUtils';
import { currentCasinoSelector } from '../../../../authentication/redux/AuthenticationRedux';
import PlayersActions from '../../../../players/redux/PlayersRedux';
import { RunningCashGamesServiceType } from '../../../models/CashGamesModel.d';
import RunningCashGamesActions, {
  runningCashGamesFromListSelector,
  RunningCashGamesTypes
} from '../redux/RunningCashGamesRedux';

/**
 * Fetch All info for a Cash Game
 * @param api
 * @param runningCashGameId
 * @param cashGame
 */
export function* fetchRunningCashGameDetails(
  api: RunningCashGamesServiceType,
  runningCashGameId: string
) {
  const filters = {
    liveGameKey: runningCashGameId
  };

  // Construct QueryParams from filters params
  const queryParams = `${parseParams(filters)}&size=1&page=1`;

  const fetchRunningCashGameDetailsResponse = yield call(
    api.fetchRunningCashGames,
    queryParams
  );
  if (fetchRunningCashGameDetailsResponse.status === 200) {
    yield fork(
      fetchRunningCashGame,
      api,
      runningCashGameId,
      fetchRunningCashGameDetailsResponse.data.content[0]
    );
  }
}

/**
 * Fetch All info for a Cash Game
 * @param api
 * @param runningCashGameId
 * @param cashGame
 */
function* fetchRunningCashGame(
  api: RunningCashGamesServiceType,
  runningCashGameId: string,
  cashGame: GamesApiDefinitions.FestivalDocument
) {
  yield put(
    RunningCashGamesActions.fetchRunningCashGameRequest(
      runningCashGameId,
      cashGame
    )
  );

  // Get Waiting List
  yield fork(fetchWaitingList, api, {
    runningCashGameId
  });

  // construct players list
  const playersList: Array<number> = [];
  cashGame.tables.map((table: any) =>
    table.players.map(
      (player: any) => player.flopId && playersList.push(player.flopId)
    )
  );

  // Search Join Seat Request for all table
  yield all(
    cashGame.tables.map((table: any) =>
      put(
        RunningCashGamesActions.fetchJoinSeatReqRequest(
          runningCashGameId,
          table.id
        )
      )
    )
  );

  // Fetch Players Informations
  yield all(
    playersList.map((playerId: number) =>
      put(PlayersActions.fetchPlayerRequest(playerId))
    )
  );

  yield put(
    RunningCashGamesActions.fetchRunningCashGameSuccessResponse(
      runningCashGameId
    )
  );
}

/**
 * fetchRunningCashGames Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchRunningCashGamesPulling(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { filters, sorts, page, size } = action;
  // Get casino
  const casinoId = yield select(currentCasinoSelector);

  const newFilters = {
    ...filters,
    casinoId
    // sort:
    //   sorts.length > 0 && sorts[0].sortDirection === 'descend' ? 'DESC' : 'ASC'
  };

  // Construct QueryParams from filters params
  const queryParams = `${parseParams(newFilters)}&size=${size}&page=${page}`;
  try {
    while (true) {
      const fetchRunningCashGamesResponse = yield call(
        api.fetchRunningCashGames,
        queryParams
      );
      if (fetchRunningCashGamesResponse.status === 200) {
        // Authentication Success
        yield put(
          RunningCashGamesActions.fetchRunningCashGamesSuccessResponse(
            fetchRunningCashGamesResponse.data.content.map((game: any) => ({
              ...game,
              id: game.liveGameKey
            })),
            filters,
            page,
            fetchRunningCashGamesResponse.data.last,
            fetchRunningCashGamesResponse.data.totalElements,
            size,
            sorts
          )
        );

        // Fetch Tables Informations
        yield all(
          fetchRunningCashGamesResponse.data.content.map(
            (cashGame: GamesApiDefinitions.LiveCashGameDocument) =>
              fork(fetchRunningCashGame, api, cashGame.liveGameKey, cashGame)
          )
        );

        // Load Image for All Events
      } else {
        yield put(
          RunningCashGamesActions.fetchRunningCashGamesFailureResponse()
        );
      }

      // Every 5 sec, we relaunch the redux action
      yield delay(5000);
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(RunningCashGamesActions.fetchRunningCashGamesCancelResponse());
    }
  }
}

export function* fetchRunningCashGamesList(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  // starts the task in the background
  const fetchRunningCashGamesPullingTask = yield fork(
    fetchRunningCashGamesPulling,
    api,
    action
  );

  // wait for a cancel actions
  yield take(RunningCashGamesTypes.CANCEL_RUNNING_CASH_GAMES_PULLING);

  // Cancel the task
  yield cancel(fetchRunningCashGamesPullingTask);
}

/**
 * Create New Running Game Middleware
 * @param {*} api
 * @param {*} action
 */
export function* createNewRunningGame(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { data } = action;

  // We construct a Running Game
  const runningGame: any = {
    table: data.tables.map((table: any) => ({
      buyIn: 0, // TODO Set a BuyIn
      gameVariant: data.gameVariant,
      gameSize: `${data.smallBlind}/${data.bigBlind}`,
      maxPlayers: table.maxPlayers,
      tableId: table.tableId,
      players: []
    }))
  };

  // We Launch A create Running Game Call
  const createRunningGameResponse = yield call(
    api.createRunningGame,
    runningGame
  );

  if (createRunningGameResponse.status === 204) {
    // Refresh List
    yield put(
      RunningCashGamesActions.fetchRunningCashGamesRequest({}, 1, 50, [])
    );

    yield put(
      MessagesAction.addMessage(
        'CREATE_RUNNING_GAME_SUCCESS',
        'SUCCESS',
        i18n.t('CREATE_RUNNING_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(
      RunningCashGamesActions.createRunningGameFailureResponse(
        createRunningGameResponse.data
      )
    );
    yield put(
      MessagesAction.addMessage(
        'CREATE_RUNNING_GAME_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('CREATE_RUNNING_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Add new Table
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* addNewTable(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, data } = action;

  // Get Running Game Info
  const runningGame = yield select(
    runningCashGamesFromListSelector(),
    runningCashGameId
  );

  // We construct a Running Game
  const tableData: any = {
    table: [
      {
        buyIn: 0, // TODO Set a BuyIn
        gameVariant: runningGame.gameVariant,
        gameSize: runningGame.gameSize,
        maxPlayers: data.maxPlayers,
        tableId: data.tableId,
        players: []
      }
    ]
  };

  const addNewTableResponse = yield call(api.addNewTable, tableData);

  if (addNewTableResponse.status === 204) {
    // Refresh List
    yield put(
      RunningCashGamesActions.fetchRunningCashGamesRequest({}, 1, 50, [])
    );

    // Success
    yield put(
      RunningCashGamesActions.addNewTableSuccessResponse(runningCashGameId)
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'ADD_TABLE_SUCCESS',
        'SUCCESS',
        i18n.t('ADD_TABLE_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(RunningCashGamesActions.addNewTableFailureResponse());
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'ADD_TABLE_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('ADD_TABLE_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * fetchWaitingList Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchWaitingList(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId } = action;
  try {
    const fetchWaitingListResponse = yield call(
      api.fetchWaitingList,
      runningCashGameId
    );
    if (fetchWaitingListResponse.status === 200) {
      // Authentication Success
      yield put(
        RunningCashGamesActions.fetchWaitingListSuccessResponse(
          runningCashGameId,
          fetchWaitingListResponse.data.content
        )
      );

      // Fetch Users Informations
      yield all(
        fetchWaitingListResponse.data.content.map((user: any) =>
          put(PlayersActions.fetchPlayerRequest(user.flopId))
        )
      );

      // Load Image for All Events
    } else {
      yield put(RunningCashGamesActions.fetchWaitingListFailureResponse());
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(RunningCashGamesActions.fetchWaitingListCancelResponse());
    }
  }
}

/**
 * Add new Player to Waiting List
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* addNewPlayerToWaitingList(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, player } = action;

  const addNewPlayerToWaitingListResponse = yield call(
    api.addNewPlayerToWaitingList,
    runningCashGameId,
    player
  );

  if (addNewPlayerToWaitingListResponse.status === 201) {
    const playerId = getHeaderId(addNewPlayerToWaitingListResponse);
    // Success
    yield put(
      RunningCashGamesActions.addNewPlayerToWaitingListSuccessResponse(
        runningCashGameId,
        {
          id: playerId,
          ...player
        }
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'ADD_PLAYER_TO_WAITING_LIST_SUCCESS',
        'SUCCESS',
        i18n.t('ADD_PLAYER_TO_WAITING_LIST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(
      RunningCashGamesActions.addNewPlayerToWaitingListFailureResponse()
    );
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'ADD_PLAYER_TO_WAITING_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('ADD_PLAYER_TO_WAITING_LIST_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Remove a Player from Waiting List
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* removePlayerFromWaitingList(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { runningCashGameId, playerId } = action;

  const removePlayerFromWaitingListResponse = yield call(
    api.removePlayerFromWaitingList,
    runningCashGameId,
    playerId
  );

  if (removePlayerFromWaitingListResponse.status === 204) {
    // Success
    yield put(
      RunningCashGamesActions.removePlayerFromWaitingListSuccessResponse(
        runningCashGameId,
        playerId
      )
    );

    // Display Success message
    yield put(
      MessagesAction.addMessage(
        'REMOVE_PLAYER_FROM_WAITING_LIST_SUCCESS',
        'SUCCESS',
        i18n.t('REMOVE_PLAYER_FROM_WAITING_LIST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    // Error
    yield put(
      RunningCashGamesActions.removePlayerFromWaitingListFailureResponse()
    );
    // Display Error message
    yield put(
      MessagesAction.addMessage(
        'REMOVE_PLAYER_FROM_WAITING_LIST_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('REMOVE_PLAYER_FROM_WAITING_LIST_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Find Player status
 * @param api
 * @param runningCashGameId
 * @param tableId
 * @param playerId
 */
function* fillPlayerStatus(api: RunningCashGamesServiceType, playerId: number) {
  const playerStatusResponse = yield call(api.findPlayerStatus, playerId);

  if (playerStatusResponse.status === 200) {
    // Success
    yield put(
      RunningCashGamesActions.fillPlayerStatus(
        playerId,
        playerStatusResponse.data
      )
    );
  }
}

/**
 * Search Player for Running Game
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* searchPlayerForRunningGame(
  api: RunningCashGamesServiceType,
  action: AnyAction
) {
  const { tableId, search } = action;

  // We dispatch a searchUser Request
  yield put(PlayersActions.searchPlayersRequest(search));

  // Make this only on a table
  if (tableId) {
    // We wait for a searchUser Response
    const { idsList } = yield take('SEARCH_PLAYERS_SUCCESS_RESPONSE');

    // We call the game Status service
    yield all(idsList.map((id: number) => fork(fillPlayerStatus, api, id)));
  }

  RunningCashGamesActions.searchPlayersRunningGameSuccessResponse();
}
