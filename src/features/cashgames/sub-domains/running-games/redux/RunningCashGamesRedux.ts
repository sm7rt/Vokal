import { AnyAction } from 'redux';
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { IRootState } from '../../../../../common/models/StateModel';
import { createImmutableEqualSelector } from '../../../../../redux/selector/custom-selector';
import {
  generateFetchAction,
  generateFetchPageableAction
} from '../../../../../redux/util';
import { IRunningCashGamesImmutableStateType } from '../../../models/CashGamesModel.d';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // Simple Action
  updateRunningCashGamesFilters: ['path', 'value'],
  cancelRunningCashGamesPulling: [],
  setCurrentGameAndTableId: ['runningCashGameId', 'tableId'],
  toggleJoinSeatRequestModal: ['toggle'],

  // Fetch Action
  ...generateFetchPageableAction('fetchRunningCashGames'),
  ...generateFetchAction(
    'fetchRunningCashGame',
    ['id', 'runningCashGame'],
    ['id'],
    ['id'],
    ['id']
  ),
  ...generateFetchAction('createRunningGame', ['data'], ['runningCashGameId']),
  ...generateFetchAction(
    'addNewTable',
    ['runningCashGameId', 'data'],
    ['runningCashGameId', 'tableId']
  ),
  ...generateFetchAction(
    'editTable',
    ['runningCashGameId', 'tableId', 'data'],
    ['runningCashGameId', 'tableId']
  ),
  ...generateFetchAction(
    'closeTable',
    ['runningCashGameId', 'tableId'],
    ['runningCashGameId', 'tableId']
  ),
  ...generateFetchAction(
    'addNewPlayer',
    ['runningCashGameId', 'tableId', 'player'],
    ['runningCashGameId', 'tableId', 'player']
  ),
  ...generateFetchAction(
    'removePlayerFromTable',
    ['runningCashGameId', 'tableId', 'playerId'],
    ['runningCashGameId', 'tableId', 'playerId']
  ),
  ...generateFetchAction(
    'fetchJoinSeatReq',
    ['runningCashGameId', 'tableId'],
    ['runningCashGameId', 'tableId', 'datas']
  ),
  ...generateFetchAction(
    'confirmJoinSeatReq',
    ['runningCashGameId', 'tableId', 'player'],
    ['runningCashGameId', 'tableId', 'player']
  ),
  ...generateFetchAction(
    'declineJoinSeatReq',
    ['runningCashGameId', 'tableId', 'player'],
    ['runningCashGameId', 'tableId', 'playerId']
  ),
  ...generateFetchAction(
    'fetchWaitingList',
    ['runningCashGameId'],
    ['runningCashGameId', 'datas']
  ),
  ...generateFetchAction(
    'addNewPlayerToWaitingList',
    ['runningCashGameId', 'player'],
    ['runningCashGameId', 'player']
  ),
  ...generateFetchAction(
    'removePlayerFromWaitingList',
    ['runningCashGameId', 'playerId'],
    ['runningCashGameId', 'playerId']
  ),
  ...generateFetchAction(
    'callPlayer',
    ['runningCashGameId', 'tableId', 'player'],
    ['runningCashGameId', 'tableId', 'player']
  ),
  ...generateFetchAction(
    'sitPlayer',
    ['runningCashGameId', 'tableId', 'player'],
    ['runningCashGameId', 'tableId', 'player']
  ),
  ...generateFetchAction(
    'confirmSitPlayer',
    ['runningCashGameId', 'tableId', 'player'],
    ['runningCashGameId', 'tableId', 'playerId']
  ),
  ...generateFetchAction(
    'searchPlayersRunningGame',
    ['runningCashGameId', 'tableId', 'search'],
    ['']
  ),
  fillPlayerStatus: ['userId', 'userStatus']
});

export const RunningCashGamesTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: IRunningCashGamesImmutableStateType = Immutable({
  displayList: {
    // Running RunningCashGames part
    listIds: [],
    page: 1,
    last: false,
    size: 50,
    totalElements: 0,
    sorts: [],
    filters: {}
  },
  list: [], // List of Events
  showJoinRequestListModal: false,
  currentGameAndTableId: {},
  playerStatus: [] // List of Player Status
});

/**
 * Find Index in list
 * @param state
 * @param id
 */
const findIndexInList = (
  state: IRunningCashGamesImmutableStateType,
  id: string
) => {
  return state.list.findIndex(
    (c: GamesApiDefinitions.LiveCashGameDocument) => c.id === id
  );
};

/**
 * Find Index in Player Status list
 * @param state
 * @param id
 */
const findIndexInPlayerStatusList = (
  state: IRunningCashGamesImmutableStateType,
  id: string
) => {
  return state.playerStatus.findIndex(
    (playerStatus: any) => playerStatus.id === id
  );
};

/**
 * Find Index Table
 */
const findIndexTable = (game: any, tableId: string) => {
  // Find table
  return game.tables.findIndex((t: any) => t.id === tableId);
};

/* ------------- Reducers ------------- */
/**
 * Add a Running CashGame to the list
 */
export const addRunningCashGameToList = (
  state: IRunningCashGamesImmutableStateType,
  { id, runningCashGame }: AnyAction
) => {
  const indexOfList = findIndexInList(state, id);
  // If Cash Game exist we replace it
  if (indexOfList !== -1) {
    // Keep Waiting List and Join Seat Request
    return state.setIn(['list', indexOfList], {
      ...runningCashGame,
      id,
      waitingList: state.list[indexOfList].waitingList,
      tables: runningCashGame.tables.map((t: any) => {
        const existingTable = state.list[indexOfList].tables.find(
          (oldTable: any) => t.id === oldTable.id
        );
        if (existingTable) {
          t.joinSeatRequestList = existingTable.joinSeatRequestList;
        }
        return t;
      })
    });
  }
  // Else we add it
  return state.merge({
    list: [
      ...state.list,
      {
        ...runningCashGame,
        id
      }
    ]
  });
};

/**
 * Handle Upcoming Running CashGames Reducer
 */
export const handleUpcomingRunningCashGamesReducer = (
  state: IRunningCashGamesImmutableStateType,
  action: AnyAction
) => {
  const { data, filters, page, last, totalElements, size, sorts } = action;
  return state.setIn(['displayList'], {
    listIds: data.map((c: GamesApiDefinitions.LiveCashGameDocument) => c.id),
    filters,
    page,
    last,
    totalElements,
    sorts,
    size
  });
};

/**
 * Update Filters
 * @param state
 * @param param1
 */
export const updateFilters = (
  state: IRunningCashGamesImmutableStateType,
  { path, value }: AnyAction
) => {
  return state.setIn(['displayList', 'filters', path], value);
};

/**
 * Close Table Callback
 */
export const closeTableCallBack = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If there is only one table in game, we need to remove it
  if (state.list[indexOfList].tables.length === 1) {
    return state
      .merge({
        list: state.list.filter(
          (e: GamesApiDefinitions.LiveCashGameDocument) =>
            e.id !== runningCashGameId
        )
      })
      .setIn(
        ['displayList', 'listIds'],
        state.displayList.listIds.filter((s: string) => s !== runningCashGameId)
      );
  }
  // else we just remove the table
  return state.setIn(
    ['list', indexOfList, 'tables'],
    state.list[indexOfList].tables.filter((t: any) => t.id !== tableId)
  );
};

/**
 * Handle Add New Player
 */
export const handleAddNewPlayer = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId, player }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Find table
    const indexOftable = findIndexTable(state.list[indexOfList], tableId);

    if (indexOftable !== -1) {
      // Add New Player and update count
      return state.setIn(
        ['list', indexOfList, 'tables', indexOftable, 'players'],
        [...state.list[indexOfList].tables[indexOftable].players, player]
      );
    }
  }
  return state;
};

/**
 * Handle Remove Player
 */
export const handleRemovePlayer = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId, playerId }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Find table
    const indexOftable = findIndexTable(state.list[indexOfList], tableId);

    if (indexOftable !== -1) {
      // Remove Player and update count
      return state.setIn(
        ['list', indexOfList, 'tables', indexOftable, 'players'],
        state.list[indexOfList].tables[indexOftable].players.filter(
          (player: GamesApiDefinitions.PlayerDTO) => player.id !== playerId
        )
      );
    }
  }
  return state;
};

/**
 * Handle Confirm Sit Player
 */
export const handleConfirmSitPlayer = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId, playerId }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Find table
    const indexOftable = findIndexTable(state.list[indexOfList], tableId);

    if (indexOftable !== -1) {
      // Index of player
      const indexOfPlayer = state.list[indexOfList].tables[
        indexOftable
      ].players.findIndex(
        (player: GamesApiDefinitions.PlayerDTO) => player.id === playerId
      );

      if (indexOfPlayer !== -1) {
        // Remove Player and update count
        return state.setIn(
          [
            'list',
            indexOfList,
            'tables',
            indexOftable,
            'players',
            indexOfPlayer,
            'requestState'
          ],
          'SITTED'
        );
      }
    }
  }
  return state;
};

/**
 * Handle fetch Join Seat Requests
 */
export const handleJoinSeatRequests = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId, datas }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Find table
    const indexOftable = findIndexTable(state.list[indexOfList], tableId);

    if (indexOftable !== -1) {
      return state.setIn(
        ['list', indexOfList, 'tables', indexOftable, 'joinSeatRequestList'],
        datas
      );
    }
  }
  return state;
};

/**
 * Handle fetch Waiting List
 */
export const handleWaitingList = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, datas }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    return state.setIn(['list', indexOfList, 'waitingList'], datas);
  }
  return state;
};

/**
 * Handle Add New Player to Waiting List
 */
export const handleAddNewPlayerToWaitingList = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, player }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Add New Player and update count
    return state.setIn(
      ['list', indexOfList, 'waitingList'],
      [...state.list[indexOfList].waitingList, player]
    );
  }
  return state;
};

/**
 * Handle Remove Player from Waiting List
 */
export const handleRemovePlayerFromWaitingList = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, playerId }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Remove Player and update count
    return state.setIn(
      ['list', indexOfList, 'waitingList'],
      state.list[indexOfList].waitingList.filter(
        (player: any) => player.id !== playerId
      )
    );
  }
  return state;
};

/**
 * Handle Accept Join Seat Request
 */
export const handleAcceptJoinSeatRequest = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId, player }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Find Table
    const indexOftable = findIndexTable(state.list[indexOfList], tableId);

    if (indexOftable !== -1) {
      // Remove Player from Join Seat Request and Add it in the new Table
      return state
        .setIn(
          ['list', indexOfList, 'tables', indexOftable, 'joinSeatRequestList'],
          state.list[indexOfList].tables[
            indexOftable
          ].joinSeatRequestList.filter(
            (playerJS: GamesApiDefinitions.PlayerDTO) =>
              playerJS.id !== player.id
          )
        )
        .setIn(
          ['list', indexOfList, 'tables', indexOftable, 'players'],
          [
            ...state.list[indexOfList].tables[indexOftable].players,
            {
              ...player,
              requestState: 'ACCEPTED'
            }
          ]
        );
    }
  }
  return state;
};

/**
 * Handle Decline Join Seat Request
 */
export const handleDeclineJoinSeatRequest = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId, playerId }: AnyAction
) => {
  const indexOfList = findIndexInList(state, runningCashGameId);
  // If Cash Game exist
  if (indexOfList !== -1) {
    // Find Table
    const indexOftable = findIndexTable(state.list[indexOfList], tableId);

    if (indexOftable !== -1) {
      // Remove Player from Join Seat Request
      return state.setIn(
        ['list', indexOfList, 'tables', indexOftable, 'joinSeatRequestList'],
        state.list[indexOfList].tables[indexOftable].joinSeatRequestList.filter(
          (playerJS: GamesApiDefinitions.PlayerDTO) => playerJS.id !== playerId
        )
      );
    }
  }
  return state;
};

/**
 * Set Current Game And Table Id
 * @param state
 * @param param1
 */
export const setCurrentGameAndTableId = (
  state: IRunningCashGamesImmutableStateType,
  { runningCashGameId, tableId }: AnyAction
) => {
  return state.setIn(['currentGameAndTableId'], { runningCashGameId, tableId });
};

/**
 * Toggle Join Seat Request Modal
 * @param state
 * @param param1
 */
export const toggleJoinSeatRequestModal = (
  state: IRunningCashGamesImmutableStateType,
  { toggle }: AnyAction
) => {
  return state.setIn(['showJoinRequestListModal'], toggle);
};

/**
 * Add a Player Status to the list
 */
export const addPlayerStatusToList = (
  state: IRunningCashGamesImmutableStateType,
  { userId, userStatus }: AnyAction
) => {
  const indexOfList = findIndexInPlayerStatusList(state, userId);
  // If Player Status exist we replace it
  if (indexOfList !== -1) {
    // Keep Waiting List and Join Seat Request
    return state.setIn(['playerStatus', indexOfList], {
      id: userId,
      ...userStatus
    });
  }
  // Else we add it
  return state.merge({
    playerStatus: [
      ...state.playerStatus,
      {
        id: userId,
        ...userStatus
      }
    ]
  });
};

/* ------------- Hookup Reducers To Types ------------- */
// Events Reducer
export const reducer = createReducer<IRunningCashGamesImmutableStateType>(
  INITIAL_STATE,
  {
    [Types.FETCH_RUNNING_CASH_GAME_REQUEST]: addRunningCashGameToList,
    [Types.UPDATE_RUNNING_CASH_GAMES_FILTERS]: updateFilters,
    [Types.FETCH_RUNNING_CASH_GAMES_SUCCESS_RESPONSE]: handleUpcomingRunningCashGamesReducer,
    [Types.FETCH_JOIN_SEAT_REQ_SUCCESS_RESPONSE]: handleJoinSeatRequests,
    [Types.CLOSE_TABLE_SUCCESS_RESPONSE]: closeTableCallBack,
    [Types.ADD_NEW_PLAYER_SUCCESS_RESPONSE]: handleAddNewPlayer,
    [Types.REMOVE_PLAYER_FROM_TABLE_SUCCESS_RESPONSE]: handleRemovePlayer,
    [Types.FETCH_WAITING_LIST_SUCCESS_RESPONSE]: handleWaitingList,
    [Types.ADD_NEW_PLAYER_TO_WAITING_LIST_SUCCESS_RESPONSE]: handleAddNewPlayerToWaitingList,
    [Types.REMOVE_PLAYER_FROM_WAITING_LIST_SUCCESS_RESPONSE]: handleRemovePlayerFromWaitingList,
    [Types.CONFIRM_SIT_PLAYER_SUCCESS_RESPONSE]: handleConfirmSitPlayer,
    [Types.CONFIRM_JOIN_SEAT_REQ_SUCCESS_RESPONSE]: handleAcceptJoinSeatRequest,
    [Types.DECLINE_JOIN_SEAT_REQ_SUCCESS_RESPONSE]: handleDeclineJoinSeatRequest,
    [Types.FILL_PLAYER_STATUS]: addPlayerStatusToList,
    [Types.SET_CURRENT_GAME_AND_TABLE_ID]: setCurrentGameAndTableId,
    [Types.TOGGLE_JOIN_SEAT_REQUEST_MODAL]: toggleJoinSeatRequestModal
  }
);

/* ------------- Selectors ------------- */

/********* Get Running Cash Games from id **********/
const runningCashGamesSelector = (state: IRootState, id: string) =>
  state.cashgames.runningCashGames.list.find(
    (e: GamesApiDefinitions.LiveCashGameDocument) => e.id === id
  );

export const runningCashGamesFromListSelector = () =>
  createImmutableEqualSelector(
    [runningCashGamesSelector],
    cashgame => cashgame
  );

const runningCashGamesListMemoSelector = (state: IRootState) =>
  state.cashgames.runningCashGames.displayList;

export const runningCashGamesListSelector = createImmutableEqualSelector(
  [runningCashGamesListMemoSelector],
  cashgame => cashgame
);

export const runningCashGamesGlobalListSelector = (state: IRootState) =>
  state.cashgames.runningCashGames.list;

//////////////////
// Waiting List
//////////////////
const waitingList = (state: IRootState, gameId: string) => {
  const indexOfList = state.cashgames.runningCashGames.list.findIndex(
    (e: RunningCashGamesRow) => e.id === gameId
  );
  if (indexOfList !== -1) {
    return state.cashgames.runningCashGames.list[indexOfList].waitingList;
  }
  return [];
};

export const waitingListSelector = createImmutableEqualSelector(
  [waitingList],
  waitingList => waitingList || []
);

//////////////////
// Join Seat Request
//////////////////
const joinSeatRequestList = (
  state: IRootState,
  gameId: string,
  tableId: string
) => {
  const indexOfList = state.cashgames.runningCashGames.list.findIndex(
    (e: RunningCashGamesRow) => e.id === gameId
  );
  if (indexOfList !== -1) {
    // Find table
    const indexOftable = findIndexTable(
      state.cashgames.runningCashGames.list[indexOfList],
      tableId
    );

    if (indexOftable !== -1) {
      return state.cashgames.runningCashGames.list[indexOfList].tables[
        indexOftable
      ].joinSeatRequestList;
    }
  }
  return [];
};

export const joinSeatRequestListSelector = createImmutableEqualSelector(
  [joinSeatRequestList],
  joinSeatRequestList => joinSeatRequestList || []
);

/********* Current Game / Table id **********/
export const currentGameAndTableIdSelector = (state: IRootState) =>
  state.cashgames.runningCashGames.currentGameAndTableId;

/********* Show Message Modal **********/
export const showJoinRequestListSelector = (state: IRootState) =>
  state.cashgames.runningCashGames.showJoinRequestListModal;

/********* Get Player Status from player id **********/
const playerStatusRunningGameSelector = (state: IRootState, id: string) =>
  state.cashgames.runningCashGames.playerStatus.find((s: any) => s.id === id);

export const playerStatusRunningGameFromListSelector = createImmutableEqualSelector(
  [playerStatusRunningGameSelector],
  playerStatus => playerStatus
);
