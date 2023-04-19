import { Col as ColAntd, Input, Row as RowAntd } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, FormSection } from 'redux-form';
import { required } from 'redux-form-validators';
import CountryAutocompleteField from '../autocomplete/CountryAutocompleteField';
import CityAutocompleteField from '../autocomplete/CityAutocompleteField';
import { AInput } from '../AntdSimpleField';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type AddressSectionProps = {
  change: (field: string, value: string) => void;
  disabled?: boolean;
  countryCode: string;
};

type GlobalProps = AddressSectionProps;

/**
 *  Address Section
 */
const AddressSection = (props: GlobalProps) => {
  const { t } = useTranslation();
  const { disabled, countryCode, change } = props;
  return (
    <FormSection name="address">
      <Field
        id="streetAddress"
        name="streetAddress"
        label={t('STREET_ADDRESS_LABEL')}
        component={AInput}
        disabled={disabled}
        mandatory
        hasFeedback
        validate={required()}
      />
      <Input.Group>
        <RowAntd gutter={8}>
          <ColAntd span={12}>
            <CountryAutocompleteField
              change={change}
              validate={[required()]}
              disabled={disabled}
              mandatory
            />
            {/***************
             *    City     *
             ***************/}{' '}
          </ColAntd>
          <ColAntd span={12}>
            <CityAutocompleteField
              countryCode={countryCode}
              disabled={!countryCode || disabled}
              validate={[required()]}
              mandatory
            />
          </ColAntd>
        </RowAntd>
      </Input.Group>
      {/*****************
       *   State      *
       *****************/}
      <Input.Group>
        <RowAntd gutter={8}>
          <ColAntd span={16}>
            <Field
              id="state"
              name="state"
              label={t('STATE_LABEL')}
              component={AInput}
              disabled={disabled}
            />
          </ColAntd>
          {/*******************
           *     Postal code   *
           *********************/}
          <ColAntd span={8}>
            <Field
              id="postalCode"
              name="postalCode"
              label={t('ZIP_CODE_LABEL')}
              mandatory
              validate={[required()]}
              component={AInput}
              disabled={disabled}
            />
          </ColAntd>
        </RowAntd>
      </Input.Group>
    </FormSection>
  );
};

// Export Default
export default AddressSection;
