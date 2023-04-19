import { Form, Row, Col } from 'antd';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Field,
  formValueSelector,
  InjectedFormProps,
  reduxForm
} from 'redux-form';
import { required } from 'redux-form-validators';
import AntdFileUploadField from '../../../../common/components/form/AntdFileUploadField';
import {
  ADatePicker,
  AInput
} from '../../../../common/components/form/AntdSimpleField';
import { isOutstideRange } from '../../../../utils/DateUtils';
import { urlIfNotEmpty } from '../../../../utils/ValidatorUtils';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type EventCreationProps = { edition?: boolean };

//* ******************** */
// FORM PROPS */
//* ******************** */
type CreationFormType = {
  name: string;
  startDate: Moment;
  endDate: Moment;
  banner: any;
};

// Global Props
type GlobalProps = InjectedFormProps<CreationFormType, EventCreationProps> &
  EventCreationProps;

/**
 * Event Creation Component
 */
const EventCreationComp = (props: GlobalProps) => {
  // Form Selector
  const formSelector = formValueSelector(props.form);

  // Start Date Selector
  const startDateSelector = (state: any) => formSelector(state, 'startDate');
  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  //* ******************** */
  // RENDER */
  //* ******************** */
  const { t } = useTranslation();
  const startDate = useSelector(startDateSelector);
  const { edition } = props;
  return (
    <Form className="form d-flex flex-column flex-fill" layout="vertical">
      {/***********************
       * Name Field *
       ***********************/}
      <Field
        label={t('EVENT_NAME_LABEL')}
        id="name"
        name="name"
        component={AInput}
        hasFeedback={!edition}
        mandatory
        className={edition && 'mb-2 inside-label'}
        validate={[required()]}
      />
      {/***********************
       * Name Field *
       ***********************/}
      <Field
        label={t('EVENT_WEBSITE_LABEL')}
        id="website"
        name="website"
        component={AInput}
        validate={[urlIfNotEmpty({ protocolIdentifier: false })]}
        hasFeedback={!edition}
        className={edition && 'mb-2 inside-label'}
      />
      {/********************
       *   Starting Date   *
       ********************/}
      <Row>
        <Col md={11}>
          <Field
            label={t('EVENT_STARTING_DATE_LABEL')}
            id="startDate"
            name="startDate"
            component={ADatePicker}
            className={edition && 'mb-2 inside-label'}
            hasFeedback={!edition}
            mandatory
            validate={[required()]}
            format={(value: string) => (value ? moment(value) : undefined)}
            normalize={(value: string) => {
              // Reset End Date When Selecting start Date
              props.change('endDate', null);
              return value;
            }}
            disabledDate={(date: Moment) =>
              isOutstideRange(date, moment().subtract(1, 'days'))
            }
          />
        </Col>
        {/******************
         *   Ending Date    *
         ********************/}
        <Col md={11} offset={2}>
          <Field
            label={t('EVENT_ENDING_DATE_LABEL')}
            id="endDate"
            name="endDate"
            component={ADatePicker}
            className={edition && 'mb-2 inside-label'}
            hasFeedback={!edition}
            mandatory
            validate={[required()]}
            format={(value: string) => (value ? moment(value) : undefined)}
            disabled={!startDate}
            disabledDate={(date: Moment) => isOutstideRange(date, startDate)}
          />
        </Col>
      </Row>
      {/**********************
       *   Tournament Banner *
       ********************/}
      {!props.edition && (
        <Field
          label={t('EVENT_BANNER_LABEL')}
          id="banner"
          name="banner"
          component={AntdFileUploadField}
          hasFeedback
          previewWidth="360px"
          previewHeight="110px"
          accept=".png,.jpg"
        />
      )}
    </Form>
  );
};

// Create Redux form
const EventCreationForm = reduxForm<CreationFormType, EventCreationProps>({})(
  EventCreationComp
);

// Export Default
export default React.memo(EventCreationForm);
