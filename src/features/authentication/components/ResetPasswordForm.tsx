import { Form, Button, Row } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { email, required } from 'redux-form-validators';
import { AInput } from '../../../common/components/form/AntdSimpleField';
import RenderCount from '../../../common/performance/RenderCount';
import AuthenticationConstants from '../constants/AuthenticationConstants';
import { ResetPasswordFormValuesType } from '../models/AuthenticationModel.d';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type ResetPasswordComponentProps = {
  onResetPassword: (data: ResetPasswordFormValuesType) => void; // Method Trigger on LoginAction
  cancelForm: () => void;
};

type GlobalProps = InjectedFormProps<
  ResetPasswordFormValuesType,
  ResetPasswordComponentProps
> &
  ResetPasswordComponentProps;

/**
 * ResetPassword Component which show theResetPassword Form
 */
const ResetPasswordComponent = (props: GlobalProps) => {
  const [t] = useTranslation();
  const { handleSubmit, cancelForm, pristine, valid } = props;

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Form
      className="form"
      layout="vertical"
      onSubmit={handleSubmit(props.onResetPassword)}
    >
      <RenderCount componentName="ResetPasswordForm" />
      <Field
        label={t('EMAIL_LABEL')}
        id="email"
        name="email"
        component={AInput}
        hasFeedback
        validate={[required(), email()]}
      />
      {/*
         //   Display the submit button
         //
        */}
      <Row type="flex" justify="space-between" align="middle" className="mt-5">
        <Button
          onClick={cancelForm}
          type="default"
          id="cancel-button"
          className="padding-button text-uppercase"
        >
          {t('CANCEL_BUTTON')}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          id="send-email-button"
          disabled={pristine || !valid}
          className="padding-button text-uppercase"
        >
          {t('SEND_EMAIL_BUTTON')}
        </Button>
      </Row>
    </Form>
  );
};

//* ******************** */
// Redux Form            */
//* ******************** */
const ResetPasswordForm = reduxForm<
  ResetPasswordFormValuesType,
  ResetPasswordComponentProps
>({
  form: AuthenticationConstants.FORM_RESET_PASSWORD
})(ResetPasswordComponent);

// Export Default
export default React.memo(ResetPasswordForm);
