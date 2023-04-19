import { Form, Button, Col, Row } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { email, required } from 'redux-form-validators';
import {
  ACheckbox,
  AInput,
  AInputPassword
} from '../../../common/components/form/AntdSimpleField';
import RenderCount from '../../../common/performance/RenderCount';
import AuthenticationConstants from '../constants/AuthenticationConstants';
import { SigninFormValuesType } from '../models/AuthenticationModel.d';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type SigninComponentProps = {
  onSignin: (data: SigninFormValuesType) => void; // Method Trigger on LoginAction
};

type GlobalProps = InjectedFormProps<
  SigninFormValuesType,
  SigninComponentProps
> &
  SigninComponentProps;

/**
 * Signin Component which show the Signin Form
 */
const SigninComponent = (props: GlobalProps) => {
  const [t] = useTranslation();
  const { handleSubmit, valid } = props;

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  // Normalize Form
  const normalizeForm = (value: string) => {
    const { clearAsyncError } = props;
    clearAsyncError('email');
    clearAsyncError('password');
    return value;
  };

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Form
      className="form"
      onSubmit={handleSubmit(props.onSignin)}
      layout="vertical"
    >
      <RenderCount componentName="SigninForm" />
      <Field
        id="email"
        data-testid="email"
        label={t('EMAIL_LABEL')}
        name="email"
        component={AInput}
        mandatory
        hasFeedback
        validate={[required(), email()]}
        normalize={normalizeForm}
      />
      <Field
        id="password"
        data-testid="password"
        label={t('PASSWORD_LABEL')}
        name="password"
        component={AInputPassword}
        mandatory
        hasFeedback
        validate={[required()]}
        normalize={normalizeForm}
      />
      <Row type="flex" justify="space-between" align="top">
        <Col>
          <Row type="flex" justify="start">
            <Field
              id="rememberMe"
              name="rememberMe"
              component={ACheckbox}
              inline
            />
            <span className="ml-2">{t('REMEMBER_ME_LABEL')}</span>
          </Row>
        </Col>
        <Col className="text-right">
          <Link
            to="/auth/account/reset_password"
            className="text-decoration-underline cursor-pointer text-secondary"
          >
            {t('FORGOT_PASSWORD_LINK')}
          </Link>
        </Col>
      </Row>
      {/*
         //   Display the submit button
         //
        */}
      <Row className="mt-2" type="flex" justify="center">
        <Button
          type="primary"
          htmlType="submit"
          id="signin-button"
          data-testid="signin-button"
          disabled={!valid}
          className="padding-button text-uppercase"
        >
          {t('SIGNIN_TEXT')}
        </Button>
      </Row>
    </Form>
  );
};

// Initial Form Values
//
const initialValuesForm: SigninFormValuesType = {
  email: '', // User's email to connect
  password: '', // User's password to connect the app
  rememberMe: true // Save email / pwd in cache
};

//* ******************** */
// Redux Form            */
//* ******************** */
const SigninForm = reduxForm<SigninFormValuesType, SigninComponentProps>({
  form: AuthenticationConstants.FORM_SIGNIN,
  initialValues: initialValuesForm,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(SigninComponent);

// Export Default
export default React.memo(SigninForm);
