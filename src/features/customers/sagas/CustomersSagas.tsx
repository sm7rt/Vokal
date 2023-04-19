import { call, cancelled, put } from 'redux-saga/effects';
import MessagesAction from '../../../common/redux/SystemMessagesRedux';
import { CustomersServiceType } from '../models/CustomersModel.d';
import CustomersAction from '../redux/CustomersRedux';
import AuthenticationActions from '../../authentication/redux/AuthenticationRedux';

/**
 * Fetch customer details Middleware
 * @param {*} api
 * @param {*} action : - id of the customer
 */
export function* fetchCustomerDetails(
  api: CustomersServiceType,
  action: { id: number }
) {
  const { id } = action;
  try {
    const fetchCustomerData = yield call(api.fetchCustomerDetails, id);

    if (fetchCustomerData.status === 200) {
      // Fetch Success
      yield put(
        CustomersAction.fetchCustomerDetailsSuccessResponse(
          id,
          fetchCustomerData.data
        )
      );
    } else {
      // Put Failure Response to Stop loading
      yield put(CustomersAction.fetchCustomerDetailsFailureResponse(id));
      yield put(
        MessagesAction.addMessage(
          'FETCH_CUSTOMER_DETAILS_ERROR',
          'ERROR',
          `An error Occurred, while trying to fetch customer's data.`,
          '',
          'PANEL'
        )
      );

      // Logout
      yield put(AuthenticationActions.logoutRequest());
    }
  } finally {
    // Put Cancel Response to Stop Loading
    if (yield cancelled()) {
      // Put Failure Response to Stop loading
      yield put(CustomersAction.fetchCustomerDetailsCancelResponse(id));
    }
  }
}
