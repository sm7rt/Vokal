import React, { Fragment } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { CountryType } from '../../../redux/ParametersModel.d';
import ParametersAction, {
  getCountriesData,
  isFetchingCountry
} from '../../../redux/ParametersRedux';
import { Select } from 'antd';
import AntdAsyncAutoCompleteField from '../AntdAsyncAutoCompleteField';
import { AInput } from '../AntdSimpleField';
import debounce from 'lodash/debounce';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type CountryAutocompleteFieldProps = {
  id?: string;
  name?: string;
  label?: string;
  selected?: Array<{
    countryName: string;
    countryCode: string;
  }>;
  validate?: Array<any>;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  refComp?: (ref: any) => void;
  change: (path: string, value: string) => void;
  mandatory?: boolean;
  style?: Object;
};

/**
 * CountryAutocompleteField Component
 */
const CountryAutocompleteField = ({
  id = 'country',
  name = 'country',
  label,
  disabled,
  placeholder,
  validate,
  mandatory,
  className,
  style,
  change // change
}: CountryAutocompleteFieldProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countries = useSelector(getCountriesData);
  const loadingCountry = useSelector(isFetchingCountry);
  return (
    <Fragment>
      <Field
        className={className}
        style={style}
        label={label || t('COUNTRY_LABEL')}
        placeholder={placeholder}
        id={id}
        name={name}
        dataSource={countries.data}
        loading={loadingCountry}
        showArrow={false}
        renderOptions={(c: CountryType) => (
          <Select.Option key={c.id}>
            <ReactCountryFlag
              styleProps={{
                width: '20px',
                height: '20px',
                marginRight: '10px'
              }}
              code={c.countryCode}
              svg
            />
            {c.countryName}
          </Select.Option>
        )}
        component={AntdAsyncAutoCompleteField}
        onSearch={(value: string) => {
          const debounceSearch = debounce(() => {
            dispatch(ParametersAction.fetchCountryRequest(value, 1));
          }, 300);
          return debounceSearch();
        }}
        mandatory={mandatory}
        validate={validate}
        disabled={disabled}
        optionLabelProp="value"
        normalize={(value: string) => {
          const country = countries.data.find(
            (c: CountryType) => c.id === value
          );
          if (country) {
            change('address.countryCode', country.countryCode);
            change('address.city', '');
            change('telephoneNumber', '');
            dispatch(
              ParametersAction.fetchCityRequest(country.countryCode, '', 1)
            );
            return country.countryName;
          }
          return null;
        }}
        filterOption={false}
      />
      {/* Hidden Country Code Field */}
      <Field
        id="countryCode"
        name="countryCode"
        component={AInput}
        className="d-none"
      />
    </Fragment>
  );
};

export default CountryAutocompleteField;
