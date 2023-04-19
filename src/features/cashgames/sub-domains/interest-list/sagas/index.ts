import { takeLatest, takeEvery } from 'redux-saga/effects';
import DebugConfig from '../../../../../config/DebugConfig';

/* ------------- Types ------------- */
import { InterestListTypes } from '../redux/InterestListRedux';
import FixtureInterestListApi from '../services/FixtureInterestListApi';
import InterestListApi from '../services/InterestListApi';
import {
  acceptInterestList,
  declineInterestList,
  fetchRegisteredPlayers,
  createNewInterestList,
  cancelInterestList,
  fetchInterestListList,
  startInterestList,
  fetchInterestList
} from './InterestListSagas';

/* ------------- Sagas ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures
  ? FixtureInterestListApi
  : InterestListApi.create();

// List of Sagas Handler
const interestListSagas = [
  takeLatest(
    InterestListTypes.FETCH_INTEREST_LIST_LIST_REQUEST,
    fetchInterestListList,
    api
  ),
  takeEvery(
    InterestListTypes.LAUNCH_FETCH_INTEREST_LIST,
    fetchInterestList,
    api
  ),
  takeEvery(
    InterestListTypes.ACCEPT_INTEREST_LIST_REQUEST,
    acceptInterestList,
    api
  ),
  takeEvery(
    InterestListTypes.DECLINE_INTEREST_LIST_REQUEST,
    declineInterestList,
    api
  ),
  takeLatest(
    InterestListTypes.FETCH_REGISTERED_PLAYERS_REQUEST,
    fetchRegisteredPlayers,
    api
  ),
  takeLatest(
    InterestListTypes.CREATE_INTEREST_LIST_REQUEST,
    createNewInterestList,
    api
  ),
  takeLatest(
    InterestListTypes.DELETE_INTEREST_LIST_REQUEST,
    cancelInterestList,
    api
  ),
  takeLatest(
    InterestListTypes.START_INTEREST_LIST_REQUEST,
    startInterestList,
    api
  )
];

// Export Default
export default interestListSagas;
