import { takeLatest, takeEvery } from 'redux-saga/effects';
/* ------------- Types ------------- */
import { RunningCashGamesTypes } from '../redux/RunningCashGamesRedux';
import FixtureRunningCashGamesApi from '../services/FixtureRunningCashGamesApi';
import {
  fetchRunningCashGamesList,
  createNewRunningGame,
  addNewTable,
  fetchWaitingList,
  addNewPlayerToWaitingList,
  removePlayerFromWaitingList,
  searchPlayerForRunningGame
} from './RunningCashGamesSagas';
import {
  addNewPlayer,
  removePlayer,
  fetchJoinSeatRequests,
  editTable,
  closeTable,
  sitPlayer,
  callPlayer,
  acceptJoinSeatRequest,
  declineJoinSeatRequest,
  confirmSitPlayer
} from './CashGamesTableSagas';
import DebugConfig from '../../../../../config/DebugConfig';
import RunningCashGamesApi from '../services/RunningCashGamesApi';

/* ------------- Sagas ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures
  ? FixtureRunningCashGamesApi
  : RunningCashGamesApi.create();

// List of Sagas Handler
const runningCashGamesSagas = [
  takeLatest(
    RunningCashGamesTypes.FETCH_RUNNING_CASH_GAMES_REQUEST,
    fetchRunningCashGamesList,
    api
  ),
  takeLatest(
    RunningCashGamesTypes.CREATE_RUNNING_GAME_REQUEST,
    createNewRunningGame,
    api
  ),
  takeLatest(RunningCashGamesTypes.ADD_NEW_TABLE_REQUEST, addNewTable, api),

  takeLatest(
    RunningCashGamesTypes.FETCH_WAITING_LIST_REQUEST,
    fetchWaitingList,
    api
  ),
  takeEvery(
    RunningCashGamesTypes.ADD_NEW_PLAYER_TO_WAITING_LIST_REQUEST,
    addNewPlayerToWaitingList,
    api
  ),
  takeEvery(
    RunningCashGamesTypes.REMOVE_PLAYER_FROM_WAITING_LIST_REQUEST,
    removePlayerFromWaitingList,
    api
  ),
  takeLatest(
    RunningCashGamesTypes.SEARCH_PLAYERS_RUNNING_GAME_REQUEST,
    searchPlayerForRunningGame,
    api
  ),

  /********** */
  /*  Tables  */
  /********** */
  takeEvery(RunningCashGamesTypes.ADD_NEW_PLAYER_REQUEST, addNewPlayer, api),
  takeEvery(RunningCashGamesTypes.EDIT_TABLE_REQUEST, editTable, api),
  takeEvery(RunningCashGamesTypes.CLOSE_TABLE_REQUEST, closeTable, api),
  takeEvery(
    RunningCashGamesTypes.REMOVE_PLAYER_FROM_TABLE_REQUEST,
    removePlayer,
    api
  ),
  takeEvery(
    RunningCashGamesTypes.FETCH_JOIN_SEAT_REQ_REQUEST,
    fetchJoinSeatRequests,
    api
  ),
  takeLatest(RunningCashGamesTypes.SIT_PLAYER_REQUEST, sitPlayer, api),
  takeLatest(RunningCashGamesTypes.CALL_PLAYER_REQUEST, callPlayer, api),
  takeLatest(
    RunningCashGamesTypes.CONFIRM_JOIN_SEAT_REQ_REQUEST,
    acceptJoinSeatRequest,
    api
  ),
  takeLatest(
    RunningCashGamesTypes.DECLINE_JOIN_SEAT_REQ_REQUEST,
    declineJoinSeatRequest,
    api
  ),
  takeLatest(
    RunningCashGamesTypes.CONFIRM_SIT_PLAYER_REQUEST,
    confirmSitPlayer,
    api
  )
];

// Export Default
export default runningCashGamesSagas;
