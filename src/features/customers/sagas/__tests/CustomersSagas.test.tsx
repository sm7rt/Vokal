import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import CustomersAction from '../../redux/CustomersRedux';
import FixtureCustomersApi from '../../services/FixtureCustomersApi';
import { fetchCustomerDetails } from '../CustomersSagas';

// Testing fetchCustomerDetails Middleware Success
test('fetchCustomerDetails Middleware Success', () => {
  const data = 'B';
  const id = 951;

  const Response = {
    status: 200,
    data
  };
  return expectSaga(fetchCustomerDetails, FixtureCustomersApi, {
    id
  })
    .provide([
      [matchers.call.fn(FixtureCustomersApi.fetchCustomerDetails), Response]
    ])
    .put(CustomersAction.fetchCustomerDetailsSuccessResponse(id, Response.data))
    .run();
});
