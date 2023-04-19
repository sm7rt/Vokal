import { takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';

/* ------------- Types ------------- */
import { MessagesTypes } from '../redux/SystemMessagesRedux';
import { ParametersTypes } from '../redux/ParametersRedux';

/* ------------- Sagas ------------- */

import { waitAndRemove } from './SystemMessagesSagas';
import { fetchCountries, fetchCities } from './ParametersSagas';
import DebugConfig from '../../config/DebugConfig';
import FixtureParametersApi from '../services/FixtureParametersApi';
import ParametersApi from '../services/ParametersApi';
import FixtureAvailabilityApi from '../services/FixtureAvailabilityApi';
import AvailabilityApi from '../services/AvailabilityApi';
import { AvailableTypes } from '../redux/AvailabilityRedux';
import { fetchAvailabilityRequest } from './AvailabilitySagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const paramsApi = DebugConfig.useFixtures
  ? FixtureParametersApi
  : ParametersApi.create();

const apiAvailability = DebugConfig.useFixtures
  ? FixtureAvailabilityApi
  : AvailabilityApi.create();

// Common Saga
const commonSaga = [
  takeEvery(MessagesTypes.ADD_MESSAGE, waitAndRemove),

  // Parameters
  takeLatest(ParametersTypes.FETCH_COUNTRY_REQUEST, fetchCountries, paramsApi),
  takeLatest(ParametersTypes.FETCH_CITY_REQUEST, fetchCities, paramsApi),

  // Availability
  takeLeading(
    AvailableTypes.FETCH_AVAILABILITY_REQUEST,
    fetchAvailabilityRequest,
    apiAvailability
  )
];

// Export Default
export default commonSaga;
