import React, { Fragment } from 'react';
import { Field, formValueSelector } from 'redux-form';
import AntdFileUploadField from '../../../../common/components/form/AntdFileUploadField';
import { AInput } from '../../../../common/components/form/AntdSimpleField';
import { required } from 'redux-form-validators';
import AddressSection from '../../../../common/components/form/address/AddressSection';
import { useSelector } from 'react-redux';
import SettingsConstants from '../../constants/SettingsConstants';
import { useTranslation } from 'react-i18next';

/**
 * Casino Address Section
 */
const CasinoAddressSection = ({ change, disabled }) => {
  const { t } = useTranslation();
  // Form Selector
  const formSelector = formValueSelector(SettingsConstants.FORM_SETTINGS);

  // Country Code Selector
  const countryCodeSelector = (state: any) =>
    formSelector(state, 'address.countryCode');

  const countryCode = useSelector(countryCodeSelector);
  return (
    <Fragment>
      <Field
        label={t('SETTINGS_BRAND_LOGO_LABEL')}
        id="brandLogo"
        name="brandLogo"
        component={AntdFileUploadField}
        hasFeedback
        disabled={disabled}
        accept=".png,.jpg"
      />
      <Field
        label={t('SETTINGS_BRAND_NAME_LABEL')}
        id="name"
        name="name"
        component={AInput}
        hasFeedback
        mandatory
        disabled={disabled}
        validate={[required()]}
      />
      <AddressSection
        change={change}
        countryCode={countryCode}
        disabled={disabled}
      />
    </Fragment>
  );
};

export default React.memo(CasinoAddressSection);
