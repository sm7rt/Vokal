import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../common/models/StateModel';
import { ownerSelector } from '../../authentication/redux/AuthenticationRedux';
import UserSearchForm from '../components/form/UserSearchForm';
import InviteUserModal from '../components/modal/InviteUserModal';
import UsersList from '../components/UsersList';
import UsersActions, { userFromListSelector } from '../redux/UserRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {};

/**
 * Users Managment Page
 */
const UsersManagmentPage = (props: Props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { customerId, id } = useSelector(ownerSelector);
  const dispatch = useDispatch();
  const owner = useSelector((state: IRootState) =>
    userFromListSelector(state, id)
  );

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Fragment>
      <PageHeaderWrapper title={t('USER_MANAGMENT_MENU')} />
      <Card className="mt-3">
        <UserSearchForm />
        {owner && owner.data && owner.data.role === 'ADMIN' && (
          <Button
            id="inviteUser"
            icon="plus"
            type="primary"
            className="mt-3 mb-3"
            onClick={() => setVisible(true)}
          >
            Invite user
          </Button>
        )}
        <UsersList />
      </Card>
      <InviteUserModal
        visible={visible}
        setVisible={setVisible}
        onSubmit={(data: any) =>
          dispatch(UsersActions.inviteUserRequest(customerId, data))
        }
      />
    </Fragment>
  );
};

export default React.memo(UsersManagmentPage);
