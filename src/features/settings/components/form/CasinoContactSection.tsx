import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import { email, required, url } from 'redux-form-validators';
import {
  AInput,
  APhoneInput
} from '../../../../common/components/form/AntdSimpleField';
import SettingsConstants from '../../constants/SettingsConstants';

/**
 * Casino Contact Section
 */
const CasinoContactSection = ({ disabled }) => {
  const { t } = useTranslation();
  // Form Selector
  const formSelector = formValueSelector(SettingsConstants.FORM_SETTINGS);

  // Telephone Number Selector
  const telephoneNumberSelector = (state: any) =>
    formSelector(state, 'telephoneNumber');

  const telephoneNumber = useSelector(telephoneNumberSelector);

  // Country Code Selector
  const countryCodeSelector = (state: any) =>
    formSelector(state, 'address.countryCode');

  const countryCode = useSelector(countryCodeSelector);

  return (
    <Fragment>
      <Field
        label={t('SETTINGS_WEB_SITE_LABEL')}
        id="webSite"
        name="webSite"
        component={AInput}
        hasFeedback
        mandatory
        disabled={disabled}
        validate={[required(), url({ protocolIdentifier: false })]}
      />
      <Field
        label={t('SETTINGS_EMAIL_LABEL')}
        id="mailContact"
        name="mailContact"
        component={AInput}
        hasFeedback
        mandatory
        disabled={disabled}
        validate={[required(), email()]}
      />
      {/* Phone Number */}
      <Field
        label={t('PHONE_NUMBER_LABEL')}
        id="telephoneNumber"
        name="telephoneNumber"
        component={APhoneInput}
        mandatory
        disabled={disabled}
        validate={[required()]}
        defaultCountry={
          !telephoneNumber && countryCode && countryCode.toLowerCase()
        }
        format={(value: string) => {
          // We check if pattern is correct, else we return null
          const matches = /[+][0-9]{1,4}[-\s/0-9]*/.exec(value);
          if (!matches) {
            return '';
          }
          return value;
        }}
      />
    </Fragment>
  );
};

export default React.memo(CasinoContactSection);
