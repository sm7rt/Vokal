import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersDataTable from './datatable/UsersDataTable';
import UsersActions, {
  accountUsersSelector,
  accountUsersListSelector,
  userFromListSelector
} from '../redux/UserRedux';
import { LoadingContainer } from '../../../common/components/container';
import { ownerSelector } from '../../authentication/redux/AuthenticationRedux';
import { IRootState } from '../../../common/models/StateModel';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {};

/**
 * Users List
 */
const UsersListComp = (props: Props) => {
  const dispatch = useDispatch();
  const { customerId, id } = useSelector(ownerSelector);
  const accountUsersObj = useSelector(accountUsersSelector);
  const accountUsersList = useSelector(accountUsersListSelector);
  const owner = useSelector((state: IRootState) =>
    userFromListSelector(state, id)
  );

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  /* eslint-disable */
  useEffect(() => {
    dispatch(
      UsersActions.fetchAccountUsersRequest(
        customerId,
        accountUsersObj.filters,
        1,
        20
      )
    );
  }, [accountUsersObj.filters]);

  /**
   * Render
   */
  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center w-100"
      id="tournamentTable"
    >
      <UsersDataTable
        datas={accountUsersList}
        onDelete={(userId: string) =>
          dispatch(UsersActions.deleteAccountRequest(userId))
        }
        onResendMail={(email: string) =>
          dispatch(UsersActions.resendInvitationRequest(email))
        }
        onEditUserAccount={(userId: string, data: string) =>
          dispatch(UsersActions.editUserAccountRequest(userId, data))
        }
        owner={owner}
      />
    </div>
  );
};

export default LoadingContainer([
  'FETCH_ACCOUNT_USERS',
  'INVITE_USER',
  'DELETE_ACCOUNT',
  'EDIT_USER_ACCOUNT',
  'RESEND_INVITATION'
])(React.memo(UsersListComp));
