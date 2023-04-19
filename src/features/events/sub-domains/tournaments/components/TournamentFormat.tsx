import { Form, Select } from 'antd';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Field, FormSection, formValueSelector, reduxForm } from 'redux-form';
import { numericality, required } from 'redux-form-validators';
import { LoadingContainer } from '../../../../../common/components/container';
import {
  ACheckbox,
  AInput,
  ASelect
} from '../../../../../common/components/form/AntdSimpleField';
import RenderCount from '../../../../../common/performance/RenderCount';
import TournamentsConstants from '../constants/TournamentsConstants';

// Options Available Until
const optionsMaxPerPlayer = () => {
  const options = ['', 'UNLIMITED'];
  for (let i = 1; i < 21; i++) {
    options.push(i);
  }
  return options;
};

// Format Inline
const FormatInline = (props: any) => {
  const { formName, disabled } = props;
  return (
    <FormSection name={formName} className="row mb-3 pl-5 align-items-center">
      <Field
        label={TournamentsConstants.MAX_PER_PLAYER_LABEL}
        disabled={disabled}
        id={`${formName}MaxPerPlayer`}
        name={`maxPerPlayer`}
        component={ASelect}
        normalize={(value: string) => (value === 'UNLIMITED' ? 10000 : value)}
        format={(value: number) => (value === 10000 ? 'UNLIMITED' : value)}
        validate={!disabled && [required()]}
        className="mr-3"
        style={{ width: '200px' }}
      >
        {optionsMaxPerPlayer().map((c: string, index: number) => (
          <Select.Option key={c} value={c}>
            {c}
          </Select.Option>
        ))}
      </Field>
      <Field
        label={TournamentsConstants.AVAILABLE_UNTIL}
        disabled={disabled}
        id={`${formName}LastLevel`}
        name={`lastLevel`}
        component={AInput}
        validate={!disabled && [required(), numericality()]}
        className="mr-3"
      />
      <Field
        label={TournamentsConstants.CASH_AMOUNT_LABEL}
        disabled={disabled}
        id={`${formName}CashAmount`}
        name={`cashAmount`}
        component={AInput}
        validate={!disabled && [required(), numericality()]}
        className="mr-3"
      />
      <Field
        label={TournamentsConstants.FEES_LABEL}
        disabled={disabled}
        id={`${formName}fee`}
        name={`fee`}
        component={AInput}
        validate={!disabled && [required(), numericality()]}
        className="mr-3"
      />
      <Field
        label={TournamentsConstants.CHIPS_AMOUNT_LABEL}
        disabled={disabled}
        id={`${formName}ChipsAmount`}
        name={`chipsAmount`}
        component={AInput}
        validate={!disabled && [required(), numericality()]}
        className="mr-3"
      />
    </FormSection>
  );
};

type MatchParams = {
  tournamentId: string;
  eventId: string;
};

// Props of Component
type TournamentFormatProps = {
  tournamentId: string;
  festivalId: string;
};

// Form Selector
const formSelector = formValueSelector(TournamentsConstants.FORM_FORMAT_INFO);

// Freeze Out Selector
const freezeOutSelector = (state: any) => formSelector(state, 'freezOut');

// Rebuy Selector
const rebuySelector = (state: any) => formSelector(state, 'rebuyAllowed');

// Reentry Selector
const reentrySelector = (state: any) => formSelector(state, 'reEntryAllowed');
// Addon Selector
const addonsSelector = (state: any) => formSelector(state, 'addOnAllowed');

/**
 * Tournament format
 * Form to define the Tournament format :
 */
const TournamentFormatComp = (props: TournamentFormatProps) => {
  const isFreezeOut = useSelector(freezeOutSelector);
  const isRebuy = useSelector(rebuySelector);
  const isReEntry = useSelector(reentrySelector);
  const isAddOn = useSelector(addonsSelector);

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  //* ******************** */
  // RENDER */
  //* ******************** */

  return (
    <Fragment>
      <Form className="p-4">
        {/* <Row className="row pb-3 justify-content-end align-items-center w-100">
          <Button htmlType="submit" theme="secondary" disabled={props.pristine}>
            UPDATE CHANGES
          </Button>
        </Row> */}
        <RenderCount componentName="TournamentFormat" />
        {/* Freeze Out */}
        <Field
          id="freezOut"
          name="freezOut"
          component={ACheckbox}
          className="mb-3"
        >
          Freezout
        </Field>
        {/* Rebuy */}
        <Field
          id="rebuyAllowed"
          name="rebuyAllowed"
          disable
          component={ACheckbox}
          className="mb-3"
          disabled={isFreezeOut}
        >
          Rebuy
        </Field>
        {/* Format for Rebuy */}
        <FormatInline
          formName="rebuyDetails"
          disabled={isFreezeOut || !isRebuy}
        />
        {/* ReEntry */}
        <Field
          id="reEntryAllowed"
          name="reEntryAllowed"
          disable
          component={ACheckbox}
          className="mb-3"
          disabled={isFreezeOut}
        >
          Re-entry
        </Field>
        {/* Format for ReEntry */}
        <FormatInline
          formName="reEntryDetails"
          disabled={isFreezeOut || !isReEntry}
        />
        {/* AddOn */}
        <Field
          id="addOnAllowed"
          name="addOnAllowed"
          disable
          component={ACheckbox}
          className="mb-3"
          disabled={isFreezeOut}
        >
          Add-on
        </Field>
        {/* Format for AddOn */}
        <FormatInline
          formName="addOnDetails"
          disabled={isFreezeOut || !isAddOn}
        />
      </Form>
    </Fragment>
  );
};

const TournamentFormatForm = reduxForm({
  form: TournamentsConstants.FORM_FORMAT_INFO
})(TournamentFormatComp);

// Export Default
export default LoadingContainer(['UPDATE_TOURNAMENT_FORMAT'])(
  TournamentFormatForm
);
