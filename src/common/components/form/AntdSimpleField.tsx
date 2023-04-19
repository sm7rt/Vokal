import {
  Checkbox,
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  TimePicker,
  Row,
  Icon,
  Tooltip
} from 'antd';
import React from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';
// import './PhoneInput.less';
import { phoneCountries } from '../../../utils/data/phoneCountries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const TextArea = Input.TextArea;

/**
 * Create a FormItem Wrapper with Redux Form Error gesture
 * @param Component
 */
export const makeField = (Component: any) => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  className,
  mandatory,
  withToolTip,
  toolTipMsg,
  placement = 'top',
  ...rest
}: any) => {
  const hasError = meta.touched && meta.invalid;
  const labelToDisplay = mandatory ? `${label} *` : label;
  return (
    <FormItem
      label={label ? labelToDisplay : null}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      className={className}
    >
      {withToolTip ? (
        <Tooltip title={toolTipMsg} placement={placement}>
          <Component {...input} {...rest} children={children} />
        </Tooltip>
      ) : (
        <Component {...input} {...rest} children={children} />
      )}
    </FormItem>
  );
};

// Custom Checkbox to have initialValues OK
const FlopCheckBox = props => <Checkbox {...props} checked={props.value} />;

export const AInput = makeField(Input);

// Ant Icon Input
export const AIconInput = (props: any) => (
  <Row type="flex" align="top" className="mt-3">
    <Icon type={props.icon} style={{ fontSize: '26px' }} className="mr-2" />
    <AInput className="mb-0 pb-0 w-75" {...props} />
  </Row>
);

export const AInputPassword = makeField(Input.Password);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(FlopCheckBox);
export const ATextarea = makeField(TextArea);
// Time Picker is a custom field because conflit between Redux Form Format attribute and Date Picker Format attribute
export const ADatePicker = ({
  input,
  meta,
  children,
  label,
  className,
  mandatory,
  withToolTip,
  toolTipMsg,
  placement = 'top',
  dateFormat = 'YYYY-MM-DD',
  ...rest
}: any) => {
  const hasError = meta.touched && meta.invalid && meta.submitFailed;
  const labelToDisplay = mandatory ? `${label} *` : label;
  return (
    <FormItem
      label={label ? labelToDisplay : null}
      validateStatus={hasError ? 'error' : 'success'}
      help={hasError && meta.error}
      className={className}
    >
      {withToolTip ? (
        <Tooltip title={toolTipMsg} placement={placement}>
          <DatePicker
            {...input}
            {...rest}
            children={children}
            format={dateFormat}
          />
        </Tooltip>
      ) : (
        <DatePicker
          {...input}
          {...rest}
          children={children}
          format={dateFormat}
        />
      )}
    </FormItem>
  );
};
export const ARangePicker = makeField(RangePicker);

// Time Picker is a custom field because conflit between Redux Form Format attribute and Time Picker Format attribute
export const ATimePicker = ({
  input,
  meta,
  children,
  label,
  className,
  mandatory,
  withToolTip,
  toolTipMsg,
  placement = 'top',
  timeFormat = 'h:mm a',
  ...rest
}: any) => {
  const hasError = meta.touched && meta.invalid && meta.submitFailed;
  const labelToDisplay = mandatory ? `${label} *` : label;
  return (
    <FormItem
      label={label ? labelToDisplay : null}
      validateStatus={hasError ? 'error' : 'success'}
      help={hasError && meta.error}
      className={className}
    >
      {withToolTip ? (
        <Tooltip title={toolTipMsg} placement={placement}>
          <TimePicker
            {...input}
            {...rest}
            children={children}
            format={timeFormat}
          />
        </Tooltip>
      ) : (
        <TimePicker
          {...input}
          {...rest}
          children={children}
          format={timeFormat}
        />
      )}
    </FormItem>
  );
};

/**
 * Check if country exist
 * @param countryCode
 */
const isKnownCountry = (countryCode: string) => {
  let knownCountry;
  phoneCountries.forEach((country: Array<string>) => {
    if (country[2] === countryCode) {
      knownCountry = true;
      return;
    }
  });
  return knownCountry;
};

const AntPhoneInput = props => (
  <ReactPhoneInput
    {...props}
    defaultCountry={
      (isKnownCountry(props.defaultCountry) && props.defaultCountry) || 'us'
    }
    inputClass="ant-input"
    containerClass="react-tel-input"
  />
);

export const APhoneInput = makeField(AntPhoneInput);
