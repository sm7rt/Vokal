import { Form, Input, Button, Row } from 'antd';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Field,
  formValueSelector,
  InjectedFormProps,
  reduxForm
} from 'redux-form';
import { email, required } from 'redux-form-validators';
import { PasswordStrengthMeter } from '../../../common/components/form';
import {
  AInput,
  AInputPassword,
  makeField
} from '../../../common/components/form/AntdSimpleField';
import RenderCount from '../../../common/performance/RenderCount';
import AuthenticationConstants from '../constants/AuthenticationConstants';
import { ChangePasswordFormValuesType } from '../models/AuthenticationModel.d';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type ChangePasswordComponentProps = {
  onChangePassword: (data: ChangePasswordFormValuesType) => void; // Method Trigger on LoginAction
  newPassword?: boolean;
};

type GlobalProps = InjectedFormProps<
  ChangePasswordFormValuesType,
  ChangePasswordComponentProps
> &
  ChangePasswordComponentProps;

/**
 * PAssword Control Comp
 * @param props
 */
const PasswordControlComp = (props: any) => (
  <Fragment>
    <Input.Password {...props} />
    <PasswordStrengthMeter password={props.password} />
  </Fragment>
);

const PasswordControl = makeField(PasswordControlComp);

// Form Selector
const formSelector = formValueSelector(
  AuthenticationConstants.FORM_NEW_PASSWORD
);

// Password Selector
const passwordSelector = (state: any) => formSelector(state, 'password');

/**
 * ChangePassword Component which show the ChangePassword Form
 */
const ChangePasswordComponent = (props: GlobalProps) => {
  const [t] = useTranslation();
  const { handleSubmit, pristine, valid, newPassword } = props;
  const password = useSelector(passwordSelector);

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  // Normalize Form
  const normalizeForm = (value: string) => {
    const { clearSubmitErrors } = props;
    clearSubmitErrors('password_check');
    return value;
  };

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Form
      className="form"
      layout="vertical"
      onSubmit={handleSubmit(props.onChangePassword)}
    >
      <RenderCount componentName="ChangePasswordForm" />
      <Field
        label={t('EMAIL_LABEL')}
        id="email"
        name="email"
        component={AInput}
        hasFeedback
        disabled
        validate={[required(), email()]}
      />
      {newPassword && (
        <Field
          label={t('FIRST_NAME_LABEL')}
          id="firstName"
          name="firstName"
          component={AInput}
          hasFeedback
          validate={[required()]}
        />
      )}
      {newPassword && (
        <Field
          label={t('LAST_NAME_LABEL')}
          id="lastName"
          name="lastName"
          component={AInput}
          hasFeedback
          validate={[required()]}
        />
      )}
      <Field
        label={t('NEW_PASSWORD_LABEL')}
        id="password"
        name="password"
        component={PasswordControl}
        password={password}
        hasFeedback
        validate={[required()]}
        normalize={normalizeForm}
      />
      <Field
        label={t('NEW_CONFIRM_PASSWORD_LABEL')}
        id="password_check"
        name="password_check"
        component={AInputPassword}
        hasFeedback
        validate={[required()]}
      />
      {/*
         //   Display the submit button
         //
        */}
      <Row type="flex" justify="center" className="mt-5">
        <Button
          id="signin-button"
          htmlType="submit"
          type="primary"
          disabled={pristine || !valid}
          className="padding-button text-uppercase"
        >
          {t('SET_NEW_PASSWORD_BUTTON')}
        </Button>
      </Row>
    </Form>
  );
};

//* ******************** */
// Redux Form            */
//* ******************** */
const ChangePasswordForm = reduxForm<
  ChangePasswordFormValuesType,
  ChangePasswordComponentProps
>({
  form: AuthenticationConstants.FORM_NEW_PASSWORD
})(ChangePasswordComponent);

export default React.memo(ChangePasswordForm);
