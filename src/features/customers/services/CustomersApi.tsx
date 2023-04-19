// a library to wrap and simplify api calls
import { api } from '../../../services/Api';
import { ApiResponseType } from '../../../common/models/index.d';
import CustomersConstants from '../constants/CustomersConstants';

// our "constructor"
const create = () => {
  /**
   * Fetch customers details
   * @param id
   */
  const fetchCustomerDetails = (
    id: string
  ): Promise<ApiResponseType<CustomerApiDefinitions.Customer>> =>
    api.get(`${CustomersConstants.FETCH_CUSTOMER_DETAILS}/${id}`);

  return {
    fetchCustomerDetails
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};
