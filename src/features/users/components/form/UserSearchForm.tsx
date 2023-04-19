import { Checkbox, Form, Input } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { InjectedFormProps } from 'redux-form';
import RenderCount from '../../../../common/performance/RenderCount';
import { UserSearchFormValuesType } from '../../models/UsersModel.d';
import { useDispatch } from 'react-redux';
import UsersActions from '../../redux/UserRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type UserSearchComponentProps = {};

type GlobalProps = InjectedFormProps<
  UserSearchFormValuesType,
  UserSearchComponentProps
> &
  UserSearchComponentProps;

/**
 * UserSearch Component which show the UserSearch Form
 */
const UserSearchComponent = (props: GlobalProps) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Form className="form d-flex justify-content-between" layout="inline">
      <RenderCount componentName="UserSearchForm" />
      <Form.Item label={t('USERS_SEARCH_LABEL')}>
        <Input
          onChange={(event: any) =>
            dispatch(UsersActions.updateFilters('search', event.target.value))
          }
        />
      </Form.Item>
      <Form.Item label={t('USERS_STATUS_LABEL')}>
        <Checkbox.Group
          options={[
            { label: 'pending', value: 'PENDING' },
            { label: 'verified', value: 'ACTIVATED' }
          ]}
          defaultValue={['PENDING', 'ACTIVATED']}
          onChange={(values: Array<string>) =>
            dispatch(UsersActions.updateFilters('states', values))
          }
        />
      </Form.Item>
      <Form.Item label={t('USERS_ROLE_LABEL')}>
        <Checkbox.Group
          options={[
            { label: 'Super admin', value: 'ADMIN' },
            { label: 'Limited admin', value: 'LIMITED_ADMIN' },
            { label: 'Poker manager', value: 'POKER_ROOM_MANAGER' },
            { label: 'Community manager', value: 'COMMUNITY_MANAGER' }
          ]}
          defaultValue={[
            'ADMIN',
            'LIMITED_ADMIN',
            'POKER_ROOM_MANAGER',
            'COMMUNITY_MANAGER'
          ]}
          onChange={(values: Array<string>) =>
            dispatch(UsersActions.updateFilters('roles', values))
          }
        />
      </Form.Item>
    </Form>
  );
};

// Export Default
export default React.memo(UserSearchComponent);
