import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { CityType } from '../../../redux/ParametersModel.d';
import ParametersAction, {
  getCitiesData,
  isFetchingCity
} from '../../../redux/ParametersRedux';
import { Select } from 'antd';
import AntdAsyncAutoCompleteField from '../AntdAsyncAutoCompleteField';
import debounce from 'lodash/debounce';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type CityAutocompleteFieldProps = {
  id?: string;
  name?: string;
  label?: string;
  selected?: Array<{
    accentCity: string;
  }>;
  countryCode: string;
  disabled?: boolean;
  validate?: Array<any>;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  refComp?: (ref: any) => void;
  mandatory?: boolean;
  style?: Object;
};

/**
 * CityAutocompleteField
 */
const CityAutocompleteField = ({
  id = 'city',
  name = 'city',
  label,
  countryCode,
  disabled,
  placeholder,
  validate,
  mandatory,
  className,
  style
}: CityAutocompleteFieldProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesData);
  const loadingCity = useSelector(isFetchingCity);
  return (
    <Field
      className={className}
      style={style}
      label={label || t('CITY_LABEL')}
      placeholder={placeholder}
      id={id}
      name={name}
      dataSource={cities.data}
      loading={loadingCity}
      showArrow={false}
      component={AntdAsyncAutoCompleteField}
      onSearch={(value: string) => {
        const debounceSearch = debounce(() => {
          dispatch(ParametersAction.fetchCityRequest(countryCode, value, 1));
        }, 300);
        return debounceSearch();
      }}
      normalize={(value: string) => {
        const city = cities.data.find((c: CityType) => c.id === value);
        if (city) {
          return city.accentCity;
        }
        return null;
      }}
      mandatory={mandatory}
      validate={validate}
      disabled={disabled}
      renderOptions={(c: CityType) => (
        <Select.Option key={c.id}>{c.accentCity}</Select.Option>
      )}
      filterOption={false}
    />
  );
};

export default CityAutocompleteField;
