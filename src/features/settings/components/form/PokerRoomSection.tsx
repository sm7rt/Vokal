import { Select } from 'antd';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';
import { required } from 'redux-form-validators';
import AntdAsyncAutoCompleteField from '../../../../common/components/form/AntdAsyncAutoCompleteField';
import { AInput } from '../../../../common/components/form/AntdSimpleField';
import Currencies from '../../../../common/sagas/static/Currencies';
import { CurrencyType } from '../../../../common/redux/ParametersModel.d';

const legalAgeMask = createNumberMask({
  suffix: ' years old',
  decimalPlaces: 0
});

/**
 * Poker Room Section
 */
const PokerRoomSection = ({ disabled }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {/* Render a field to define the currency used */}
      <Field
        id="mainCurrency"
        name="mainCurrency"
        label={t('SETTINGS_PKR_CURRENCY_LABEL')}
        dataSource={Currencies}
        component={AntdAsyncAutoCompleteField}
        mandatory
        disabled={disabled}
        validate={[required()]}
        renderOptions={(c: CurrencyType) => (
          <Select.Option key={c.id}>{c.id}</Select.Option>
        )}
      />
      {/* Render a field to define the legal age to enter */}
      <Field
        id="minimumAgeEntrance"
        label={t('SETTINGS_PKR_LEGAL_AGE_LABEL')}
        name="minimumAgeEntrance"
        component={AInput}
        mandatory
        disabled={disabled}
        validate={[required()]}
        type="tel"
        {...legalAgeMask}
      />
      {/* Render a field to define the dress code */}
      <Field
        id="dressCode"
        name="dressCode"
        disabled={disabled}
        label={t('SETTINGS_PKR_DRESS_CODE_LABEL')}
        component={AInput}
        mandatory
        validate={[required()]}
      />
    </Fragment>
  );
};

export default React.memo(PokerRoomSection);
