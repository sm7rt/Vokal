import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ownerSelector } from '../features/authentication/redux/AuthenticationRedux';
import { IRootState } from '../common/models/StateModel';
import UsersActions, {
  userFromListSelector
} from '../features/users/redux/UserRedux';
import CustomersActions, {
  customerSelector
} from '../features/customers/redux/CustomersRedux';
import CasinosActions, {
  casinoFromListSelector
} from '../features/casinos/redux/CasinosRedux';
import { RoleType } from '../features/users/models/UsersModel.d';
import PageLoading from '../common/containers/LoadingPage';

/**
 * Redirect to correct page
 * @param role
 * @param casino
 * @param customer
 */
const redirectToCorrectPage = (
  role: RoleType,
  casino: DataApiDefinitions.CasinoInfosDto,
  customer: CustomerApiDefinitions.Customer
) => {
  // Customer Casino Type
  if (customer.type === 'CASINO') {
    // Casino Settings incomplete
    if (role === 'ADMIN' && !casino.offeredGames) {
      return <Redirect to="/admin/account/settings" />;
    } else {
      return <Redirect to="/admin/users/account" />;
    }
  }

  // Customer Operator Type
  if (customer.type === 'OPERATOR') {
    return <Redirect to="/admin/users/account" />;
  }

  return <Redirect to="/unauthorized" />;
};

const dataLoaded = (
  role: RoleType,
  casino: DataApiDefinitions.CasinoInfosDto,
  customer: CustomerApiDefinitions.Customer
) => {
  if (!customer || !customer.id || !role) {
    return false;
  }

  // We need to load casino if it's a customer of type Casino
  if (customer.type === 'CASINO') {
    return casino && casino.id && customer.id && role;
  } else {
    return customer.id && role;
  }
};

/**
 * Admin Entry Point Page
 * Determine which route will be access in connection
 */
const AdminEntryPointPage = () => {
  const dispatch = useDispatch();
  const { id, managedCasinoId, customerId } = useSelector(ownerSelector);

  // Loading Profile Info (Only on mount)
  /* eslint-disable */
  useEffect(() => {
    id && dispatch(UsersActions.fetchUserRequest(id));
    customerId &&
      dispatch(CustomersActions.fetchCustomerDetailsRequest(customerId));
    managedCasinoId &&
      dispatch(CasinosActions.fetchCasinoDetailsRequest(managedCasinoId));
  }, [id, customerId, managedCasinoId]);

  const { data } = useSelector((state: IRootState) =>
    userFromListSelector(state, id)
  );

  const casino = useSelector((state: IRootState) =>
    casinoFromListSelector(state, managedCasinoId)
  );

  const customer = useSelector((state: IRootState) => customerSelector(state));

  const { role } = data || {};

  // Redirect to the correct Page
  return (
    <Fragment>
      {dataLoaded(role, casino, customer) ? (
        redirectToCorrectPage(role, casino, customer)
      ) : (
        <PageLoading />
      )}
    </Fragment>
  );
};

export default React.memo(AdminEntryPointPage);
