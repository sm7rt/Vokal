import { takeEvery } from 'redux-saga/effects';
/* ------------- Sagas ------------- */
import DebugConfig from '../../../config/DebugConfig';
/* ------------- Types ------------- */
import { CustomersTypes } from '../redux/CustomersRedux';
import CustomersApi from '../services/CustomersApi';
import FixtureCustomersApi from '../services/FixtureCustomersApi';
import { fetchCustomerDetails } from './CustomersSagas';

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures
  ? FixtureCustomersApi
  : CustomersApi.create();

// Customers Saga
const customersSaga = [
  takeEvery(
    CustomersTypes.FETCH_CUSTOMER_DETAILS_REQUEST,
    fetchCustomerDetails,
    api
  )
];

// Export Default
export default customersSaga;
