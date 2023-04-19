import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { generateFetchAction } from '../../../redux/util';
import { ICustomersImmutableStateType } from '../models/CustomersModel.d';
import { IRootState } from '../../../common/models/StateModel';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ...generateFetchAction(
    'fetchCustomerDetails',
    ['id'],
    ['id', 'data'],
    ['id'],
    ['id']
  )
});

export const CustomersTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ICustomersImmutableStateType = Immutable({
  account: {}
});

/* ------------- Reducers ------------- */

/**
 * Fetch customers Details Reducer
 */
export const fetchCustomerDetails = (
  state: ICustomersImmutableStateType,
  {
    data
  }: {
    data: CustomerApiDefinitions.Customer;
  }
) => {
  return state.merge({ account: data });
};

/* ------------- Hookup Reducers To Types ------------- */
// Customer Reducer
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CUSTOMER_DETAILS_SUCCESS_RESPONSE]: fetchCustomerDetails
});

/* ------------- Selectors ------------- */
// Get Customer
export const customerSelector = (state: IRootState) => state.customers.account;
