import { takeEvery } from 'redux-saga/effects';

/* ------------- Types ------------- */
import { CasinosTypes } from '../redux/CasinosRedux';

/* ------------- Sagas ------------- */

import DebugConfig from '../../../config/DebugConfig';
import FixtureCasinosApi from '../services/FixtureCasinosApi';
import CasinosApi from '../services/CasinosApi';
import { fetchCasinoDetails } from './CasinosSagas';

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureCasinosApi : CasinosApi.create();

// Casinos Saga
const casinosSaga = [
  takeEvery(CasinosTypes.FETCH_CASINO_DETAILS_REQUEST, fetchCasinoDetails, api)
];

// Export Default
export default casinosSaga;
