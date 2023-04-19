import { Avatar, Icon, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React, { useEffect } from 'react';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
import styles from './GlobalHeader.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import DefaultPicture from '../../../../assets/images/default_profile_picture.png';
import AuthenticationActions, {
  ownerSelector
} from '../../../../features/authentication/redux/AuthenticationRedux';
import UsersActions, {
  userFromListSelector
} from '../../../../features/users/redux/UserRedux';
import CustomersActions from '../../../../features/customers/redux/CustomersRedux';
import CasinosActions from '../../../../features/casinos/redux/CasinosRedux';
import { IRootState } from '../../../models/StateModel';
import { useTranslation } from 'react-i18next';

export interface GlobalHeaderRightProps {
  currentUser?: AccountApiDefinitions.AccountLoginDTO;
  menu?: boolean;
}

const AvatarDropdown = (props: GlobalHeaderRightProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const profile = useSelector(
    (state: IRootState) =>
      state.authentication.signin &&
      userFromListSelector(state, state.authentication.signin.id)
  );
  const owner = useSelector(ownerSelector);

  // Loading Profile Info (Only on mount)
  /* eslint-disable */
  useEffect(() => {
    owner && dispatch(UsersActions.fetchUserRequest(owner.id));
    owner &&
      dispatch(CustomersActions.fetchCustomerDetailsRequest(owner.customerId));
    owner &&
      dispatch(CasinosActions.fetchCasinoDetailsRequest(owner.managedCasinoId));
  }, [owner]);

  const { menu } = props;

  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      dispatch(AuthenticationActions.logoutRequest());
      return;
    }
    if (key === 'account') {
      dispatch(push(`/admin/users/${key}`));
      return;
    }
    dispatch(push(`/admin/account/${key}`));
  };

  if (!menu) {
    return (
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={(profile && profile.profilePicture) || DefaultPicture}
          alt="avatar"
        />
        <span className={styles.name}>
          {' '}
          {profile && profile.data
            ? `${profile.data.firstName} ${profile.data.lastName}`
            : ''}
        </span>
      </span>
    );
  }
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="account">
        <Icon type="user" />
        {t('PROFILE')}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        {t('LOGOUT')}
      </Menu.Item>
    </Menu>
  );

  return profile && profile.data ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={profile.profilePicture || DefaultPicture}
          alt="avatar"
        />
        <span className={styles.name}>
          {`${profile.data.firstName} ${profile.data.lastName}`}
        </span>
      </span>
    </HeaderDropdown>
  ) : (
    <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
  );
};

export default React.memo(AvatarDropdown);
