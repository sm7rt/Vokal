import { Button, Form, Row } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Field,
  formValueSelector,
  InjectedFormProps,
  reduxForm
} from 'redux-form';
import { email, required } from 'redux-form-validators';
import AddressSection from '../../../common/components/form/address/AddressSection';
import {
  AInput,
  APhoneInput
} from '../../../common/components/form/AntdSimpleField';
import RenderCount from '../../../common/performance/RenderCount';
import AuthenticationConstants from '../constants/AuthenticationConstants';
import { SignupFormValuesType } from '../models/AuthenticationModel.d';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type SignupComponentProps = {
  onSignup: (data: SignupFormValuesType) => void; // Method Trigger on LoginAction
};

// Global Props
type GlobalProps = InjectedFormProps<
  SignupFormValuesType,
  SignupComponentProps
> &
  SignupComponentProps;

// Form Selector
const formSelector = formValueSelector(AuthenticationConstants.FORM_SIGNUP);

// Country Code Selector
const countryCodeSelector = (state: any) =>
  formSelector(state, 'address.countryCode');

/**
 * Signup Component which show the Signup Form
 */
const SignupComponent = (props: GlobalProps) => {
  const [t] = useTranslation();
  const { handleSubmit, change } = props;
  const countryCode = useSelector(countryCodeSelector);

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Form
      className="form"
      onSubmit={handleSubmit(props.onSignup)}
      layout="vertical"
    >
      <RenderCount componentName="SignupForm" />
      {/* <Field id="type" name="type" component={ARadioGroup} value="male">
        <Radio value="CASINO">{t('LAND_BASED_CASINO_LABEL')}</Radio>
        <Radio value="OPERATOR">{t('ONLINE_OPERATOR_LABEL')}</Radio>
      </Field> */}
      {/* Authority delivering the license */}
      <Field
        label={t('AUTHORITY_NAME')}
        id="licenceAuthority"
        data-testid="licenceAuthority"
        name="licenceAuthority"
        component={AInput}
        hasFeedback
        mandatory
        validate={[required()]}
      />
      {/* Reference number */}
      <Field
        label={t('REFERENCE_NUMBER_LABEL')}
        id="referenceNumber"
        name="referenceNumber"
        data-testid="referenceNumber"
        component={AInput}
        hasFeedback
        mandatory
        validate={[required()]}
      />
      {/* License Name */}
      <Field
        label={t('LICENSE_NAME_LABEL')}
        id="licence"
        name="licence"
        data-testid="licence"
        component={AInput}
        hasFeedback
        mandatory
        validate={[required()]}
      />
      {/* Brand Name */}
      <Field
        label={t('BRAND_NAME_LABEL')}
        id="brand"
        name="brand"
        data-testid="brand"
        component={AInput}
        hasFeedback
        mandatory
        validate={[required()]}
      />
      <AddressSection change={change} countryCode={countryCode} />

      {/* Email Address */}
      <Field
        label={t('EMAIL_ADMIN_LABEL')}
        id="emailAdminUser"
        name="emailAdminUser"
        data-testid="emailAdminUser"
        component={AInput}
        hasFeedback
        mandatory
        validate={[required(), email()]}
      />
      {/* Email Contact Address */}
      <Field
        label={t('EMAIL_CONTACT_LABEL')}
        id="emailContact"
        name="emailContact"
        data-testid="emailContact"
        component={AInput}
        hasFeedback
        mandatory
        validate={[required(), email()]}
      />
      {/* Phone Number */}

      <Field
        label={t('PHONE_NUMBER_LABEL')}
        id="phoneNumber"
        name="phoneNumber"
        data-testid="phoneNumber"
        component={APhoneInput}
        validate={[required()]}
        mandatory
        defaultCountry={countryCode && countryCode.toLowerCase()}
      />
      <Row className="mt-2" type="flex" justify="center">
        <Button
          type="primary"
          htmlType="submit"
          id="signup-button"
          className="padding-button text-uppercase"
        >
          {t('SUBMIT_FOR_REVIEW_BUTTON')}
        </Button>
      </Row>
    </Form>
  );
};

// Initial Values of Form
const initialValuesForm: SignupFormValuesType = {
  type: 'CASINO'
};

// Return Signup Redux Form
const SignupForm = reduxForm<SignupFormValuesType, SignupComponentProps>({
  form: AuthenticationConstants.FORM_SIGNUP,
  initialValues: initialValuesForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SignupComponent);

export default React.memo(SignupForm);
