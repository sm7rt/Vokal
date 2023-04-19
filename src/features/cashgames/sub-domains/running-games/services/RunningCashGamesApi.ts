// a library to wrap and simplify api calls
import { ApiResponseType } from '../../../../../common/models';
import { api } from '../../../../../services/Api';
import RunningCashGamesServicePath from './RunningCashGamesServicePath';

const GAME_ID_VAR = '{gameId}';
const TABLE_ID_VAR = '{tableId}';
const WAITING_LIST_ID_VAR = '{waitingListId}';
const PLAYER_ID_VAR = '{playerId}';
const ACCOUNT_ID_VAR = '{accountId}';

// our "constructor"
const create = () => {
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  /**
   * Fetch Running CashGames Method
   * @param {*} filters : The filters for the list
   * @param {*} sorts : The sorts for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  const fetchRunningCashGames = (
    queryParams: string
  ): Promise<ApiResponseType<any>> =>
    api.get(
      `${RunningCashGamesServicePath.FETCH_RUNNING_GAMES}?${queryParams}`
    );

  /**
   * Fetch Join Seat Requests with CashGame Id
   * @param {*} gameId
   * @param {*} tableId
   */
  const fetchJoinSeatRequests = (gameId: string, tableId: string) =>
    api.get(
      `${RunningCashGamesServicePath.GET_SEAT_REQUEST.replace(
        GAME_ID_VAR,
        gameId
      ).replace(TABLE_ID_VAR, tableId)}`
    );

  /**
   * Edit Table
   * @param {*}
   */
  const editTable = (tableId: string, data: any) =>
    api.put(
      RunningCashGamesServicePath.EDIT_TABLE.replace(TABLE_ID_VAR, tableId),
      data
    );

  /**
   * Close Table
   * @param {*}
   */
  const closeTable = (tableId: string) =>
    api.put(
      RunningCashGamesServicePath.CLOSE_TABLE.replace(TABLE_ID_VAR, tableId)
    );

  /**
   * Add New Player
   * @param {*}
   */
  const addNewPlayer = (
    tableId: string,
    player: GamesApiDefinitions.PlayerDTO
  ) =>
    api.post(
      RunningCashGamesServicePath.ADD_NEW_PLAYER.replace(TABLE_ID_VAR, tableId),
      player
    );

  /**
   * Remove Player
   * @param {*}
   */
  const removePlayer = (playerId: string) =>
    api.post(
      RunningCashGamesServicePath.REMOVE_PLAYER.replace(PLAYER_ID_VAR, playerId)
    );

  /**
   * Create a running Game
   * @param runningGame
   */
  const createRunningGame = (runningGame: any) =>
    api.post(RunningCashGamesServicePath.ADD_RUNNING_GAMES, runningGame);

  /**
   * Add New Table
   * @param {*}
   */
  const addNewTable = (runningGame: any) =>
    api.post(RunningCashGamesServicePath.ADD_RUNNING_GAMES, runningGame);

  /**
   * Fetch Waiting List with CashGame Id
   * @param {*} gameId
   */
  const fetchWaitingList = (gameId: string) =>
    api.get(
      `${RunningCashGamesServicePath.GET_WAITING_LIST.replace(
        GAME_ID_VAR,
        gameId
      )}`
    );

  /**
   * Add a new Player to Waiting list
   * @param gameId
   * @param playerName
   */
  const addNewPlayerToWaitingList = (
    gameId: string,
    player: GamesApiDefinitions.PlayerDTO
  ) =>
    api.post(
      RunningCashGamesServicePath.ADD_NEW_PLAYER_TO_WAITING_LIST.replace(
        GAME_ID_VAR,
        gameId
      ),
      player
    );

  /**
   * Remove Player from waiting List
   * @param gameId
   * @param playerId
   */
  const removePlayerFromWaitingList = (gameId: string, playerId: string) =>
    api.delete(
      RunningCashGamesServicePath.REMOVE_PLAYER_FROM_WAITING_LIST.replace(
        GAME_ID_VAR,
        gameId
      ).replace(WAITING_LIST_ID_VAR, playerId)
    );

  /**
   * Sit Player
   * @param {*}
   */
  const sitPlayer = (gameId: string, tableId: string, playerId: string) =>
    api.put(
      RunningCashGamesServicePath.SIT_PLAYER.replace(GAME_ID_VAR, gameId)
        .replace(WAITING_LIST_ID_VAR, playerId)
        .replace(TABLE_ID_VAR, tableId)
    );

  /**
   * Call Player
   * @param {*}
   */
  const callPlayer = (gameId: string, playerId: string) =>
    api.put(
      RunningCashGamesServicePath.CALL_PLAYER.replace(
        GAME_ID_VAR,
        gameId
      ).replace(WAITING_LIST_ID_VAR, playerId)
    );

  /**
   * Accept Join Seat Request
   * @param {*}
   */
  const acceptJoinSeatRequest = (tableId: string, playerId: string) =>
    api.put(
      RunningCashGamesServicePath.ACCEPT_JOIN_SEAT_REQUEST.replace(
        PLAYER_ID_VAR,
        playerId
      ).replace(TABLE_ID_VAR, tableId)
    );

  /**
   * Decline Join Seat Request
   * @param {*}
   */
  const declineJoinSeatRequest = (tableId: string, playerId: string) =>
    api.put(
      RunningCashGamesServicePath.DECLINE_JOIN_SEAT_REQUEST.replace(
        PLAYER_ID_VAR,
        playerId
      ).replace(TABLE_ID_VAR, tableId)
    );

  /**
   * Confirm Sit Player
   * @param {*}
   */
  const confirmSitPlayer = (tableId: string, playerId: string) =>
    api.put(
      RunningCashGamesServicePath.CONFIRM_SIT_PLAYER.replace(
        PLAYER_ID_VAR,
        playerId
      ).replace(TABLE_ID_VAR, tableId)
    );

  /**
   * Find Player Status
   * @param {*}
   */
  const findPlayerStatus = (playerId: string) =>
    api.get(
      RunningCashGamesServicePath.FIND_PLAYER_STATUS.replace(
        ACCOUNT_ID_VAR,
        playerId
      )
    );

  // ------
  // STEP 3
  // ------
  //

  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    fetchRunningCashGames,
    fetchJoinSeatRequests,
    addNewPlayer,
    removePlayer,
    createRunningGame,
    addNewTable,
    editTable,
    fetchWaitingList,
    addNewPlayerToWaitingList,
    removePlayerFromWaitingList,
    closeTable,
    sitPlayer,
    callPlayer,
    acceptJoinSeatRequest,
    declineJoinSeatRequest,
    confirmSitPlayer,
    findPlayerStatus
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};
