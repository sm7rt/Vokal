import { Form } from 'antd';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import {
  ADatePicker,
  ATimePicker
} from '../../../../../../common/components/form/AntdSimpleField';
import { isOutstideRange } from '../../../../../../utils/DateUtils';
import GameSizeField from '../../../../components/form/fields/GameSizeField';
import GameVariantField from '../../../../components/form/fields/GameVariantField';
import CashGamesConstants from '../../constants/InterestListConstants';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type InterestListCreationProps = {};

//* ******************** */
// FORM PROPS */
//* ******************** */
type CreationFormType = {
  gameVariant: string;
  smallBlind: number;
  bigBlind: number;
  startingDate: Moment;
  startingTime: Moment;
};

// Global Props
type GlobalProps = InjectedFormProps<
  CreationFormType,
  InterestListCreationProps
> &
  InterestListCreationProps;

/**
 * Interest List Creation Component
 */
const InterestListCreationComp = (props: GlobalProps) => {
  // Disable Date Callback
  const disableDate = (date: Moment) =>
    isOutstideRange(date, moment().subtract(1, 'days'));

  //* ******************** */
  // RENDER */
  //* ******************** */
  const { t } = useTranslation();
  return (
    <Form className="form d-flex flex-column flex-fill" layout="vertical">
      {/***********************
       * Game Variant Field *
       ***********************/}
      <GameVariantField />
      {/***********************
       * Game Size Field *
       ***********************/}
      <GameSizeField />
      {/********************
       *   Starting Date   *
       ********************/}
      <Field
        label={t('INTEREST_STARTING_DATE_LABEL')}
        id="startingDate"
        name="startingDate"
        component={ADatePicker}
        mandatory
        validate={[required()]}
        disabledDate={disableDate}
        format={(value: string) => (value ? moment(value) : undefined)}
      />
      {/********************
       *   Starting Time   *
       ********************/}
      <Field
        label={t('INTEREST_STARTING_TIME_LABEL')}
        id="startingTime"
        name="startingTime"
        component={ATimePicker}
        mandatory
        validate={[required()]}
        use12Hours
        minuteStep={30}
      />
    </Form>
  );
};

// Create Redux form
const InterestListCreationForm = reduxForm<
  CreationFormType,
  InterestListCreationProps
>({
  form: CashGamesConstants.INTEREST_LIST_CREATION_FORM
})(InterestListCreationComp);

// Export Default
export default React.memo(InterestListCreationForm);
