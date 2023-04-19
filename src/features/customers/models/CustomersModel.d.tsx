import { ImmutableObject } from 'seamless-immutable';
import { ApiResponseType } from '../../../common/models/index.d';

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

/**
 * Customer State Type
 */
type CustomersStateType = {
  account: CustomerApiDefinitions.Customer;
};

export type ICustomersImmutableStateType = ImmutableObject<CustomersStateType>;

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type CustomersServiceType = {
  fetchCustomerDetails: (
    id: number
  ) => Promise<ApiResponseType<CustomerApiDefinitions.Customer>>;
};
