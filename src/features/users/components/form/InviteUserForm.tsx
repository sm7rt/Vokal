import { Form, Select } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required, email } from 'redux-form-validators';
import {
  AInput,
  ASelect
} from '../../../../common/components/form/AntdSimpleField';
import UsersConstants from '../../constants/UsersConstants';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type InviteUserProps = { edition?: boolean };

//* ******************** */
// FORM PROPS */
//* ******************** */
type CreationFormType = {
  mail: string;
};

// Global Props
type GlobalProps = InjectedFormProps<CreationFormType, InviteUserProps> &
  InviteUserProps;

const Roles = [
  { value: 'ADMIN', label: 'Super Admin' },
  { value: 'LIMITED_ADMIN', label: 'Limited Admin' },
  { value: 'POKER_ROOM_MANAGER', label: 'Poker Manager' },
  { value: 'COMMUNITY_MANAGER', label: 'Community Manager' }
];

/**
 * Event Creation Component
 */
const InviteUserComp = (props: GlobalProps) => {
  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  //* ******************** */
  // RENDER */
  //* ******************** */
  const { t } = useTranslation();
  return (
    <Form className="form d-flex flex-column flex-fill" layout="vertical">
      {/***********************
       * Email Address *
       ***********************/}
      <Field
        label={t('USERS_INVITE_EMAIL_ADDRESS_LABEL')}
        id="emailAddress"
        name="emailAddress"
        component={AInput}
        hasFeedback
        mandatory
        validate={[required(), email()]}
      />
      {/********************
       *   Role   *
       ********************/}
      <Field
        label={t('USERS_INVITE_ROLE_LABEL')}
        id="role"
        name="role"
        component={ASelect}
        style={{ width: '150px' }}
        mandatory
        validate={[required()]}
      >
        {Roles.map((role: any, index: number) => (
          <Select.Option key={index} value={role.value}>
            {role.label}
          </Select.Option>
        ))}
      </Field>
    </Form>
  );
};

// Create Redux form
const InviteUserForm = reduxForm<CreationFormType, InviteUserProps>({
  form: UsersConstants.FORM_INVITE_USER
})(InviteUserComp);

// Export Default
export default React.memo(InviteUserForm);
