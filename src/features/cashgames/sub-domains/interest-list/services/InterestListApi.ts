// a library to wrap and simplify api calls
import InterestListServicePath from './InterestListServicePath';
import { ApiResponseType } from '../../../../../common/models';
import { api } from '../../../../../services/Api';

const GAME_TYPE_VAR = '{gameType}';
const GAME_ID_VAR = '{gameId}';

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
   * Fetch Upcoming CashGames Method
   * @param {*} gameType : The casino Id
   * @param {*} filters : The filters for the list
   * @param {*} sorts : The sorts for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  const fetchInterestList = (
    gameType: 'CASH_GAMES',
    queryParams: string
  ): Promise<ApiResponseType<GamesApiDefinitions.PageFestivalDocument_>> =>
    api.get(
      `${InterestListServicePath.FETCH_UPCOMING_GAMES.replace(
        GAME_TYPE_VAR,
        gameType
      )}?${queryParams}`
    );

  /**
   * Fetch Registered Players with CashGame Id
   * @param {*} interestListId
   */
  const fetchRegisteredPlayers = (interestListId: string) =>
    api.get(
      `${InterestListServicePath.GET_PLAYERS_LIST.replace(
        GAME_ID_VAR,
        interestListId
      )}`
    );

  /**
   * Fetch Players Number with CashGame Id
   * @param {*} interestListId
   */
  const fetchPlayersCount = (interestListId: string) =>
    api.get(
      `${InterestListServicePath.FETCH_PLAYERS_NUMBER.replace(
        GAME_ID_VAR,
        interestListId
      )}`
    );

  /**
   * Accept game
   * @param {*} gameId : The game Id
   */
  const acceptInterestList = (gameId: string) =>
    api.put(InterestListServicePath.ACCEPT_GAME.replace(GAME_ID_VAR, gameId));

  /**
   * Decline game
   * @param {*} gameId : The game Id
   */
  const declineInterestList = (gameId: string) =>
    api.put(InterestListServicePath.DECLINE_GAME.replace(GAME_ID_VAR, gameId));

  /**
   * Create a new interest list
   * @param {*} data The data for newly festival
   */
  const createInterestList = (data: Object) =>
    api.post(InterestListServicePath.CREATE_INTEREST_LIST, data);

  /**
   * Start an interest list
   * @param {*} data The data for newly festival
   */
  const startInterestList = (data: Object) =>
    api.post(InterestListServicePath.START_INTEREST_LIST, data);

  /**
   * Fetch Interest List Details with CashGame Id
   * @param {*} interestListId
   */
  const fetchInterestListDetails = (interestListId: string) =>
    api.get(
      `${InterestListServicePath.FETCH_GAME_DETAILS.replace(
        GAME_ID_VAR,
        interestListId
      )}`
    );

  /**
   * Delete Interest List by id
   * @param {*} gameId
   */
  const deleteInterestList = (gameId: string) =>
    api.put(
      `${InterestListServicePath.DELETE_INTEREST_LIST.replace(
        GAME_ID_VAR,
        gameId
      )}`
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
    fetchInterestList,
    fetchRegisteredPlayers,
    fetchPlayersCount,
    acceptInterestList,
    declineInterestList,
    createInterestList,
    startInterestList,
    fetchInterestListDetails,
    deleteInterestList
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};
