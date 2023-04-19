import { Select } from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import {
  ADatePicker,
  AInput,
  ASelect
} from '../../../../../../common/components/form/AntdSimpleField';
import { IRootState } from '../../../../../../common/models/StateModel.d';
import RenderCount from '../../../../../../common/performance/RenderCount';
import { CurrencyType } from '../../../../../../common/redux/ParametersModel.d';
import Currencies from '../../../../../../common/sagas/static/Currencies';
import { eventFromListSelector } from '../../../../redux/EventsRedux';
import TournamentsConstants from '../../constants/TournamentsConstants';

//* ******************** */
// REDUX PROPS */
//* ******************** */
type ReduxStateProps = {
  event: any; // Festival Obj
};
//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  eventId: string;
};

type GlobalProps = Props & ReduxStateProps;

/**
 * Tournament general information
 * Form to define the Tournament information :
 * -> Name
 * -> Place
 * -> Date time
 */
const GeneralInformation = (props: GlobalProps) => {
  const event = useSelector((state: IRootState) =>
    eventFromListSelector(state, props.eventId)
  );
  return (
    <Fragment>
      <RenderCount componentName="GeneralInformation" />
      {/* <h6 className="m-0">{TournamentsConstants.INFO_NAV_TEXT}</h6> */}
      {/************
       * Tournament event number  *
       ************/}
      <Field
        label={TournamentsConstants.EVENT_NUMBER_LABEL}
        id="eventNumber"
        name="eventNumber"
        component={AInput}
        validate={[required()]}
        style={{ width: '100px' }}
      />
      {/***********************
       * Tournament name section *
       ***********************/}
      <Field
        label={TournamentsConstants.NAME_LABEL}
        id="name"
        name="name"
        validate={[required()]}
        component={AInput}
      />
      {/************
       * Tournament period section  *
       ************/}
      <Field
        label={TournamentsConstants.DATE_AND_TIME_LABEL}
        id="date"
        name="date"
        component={ADatePicker}
        withPortal={false}
        validate={[required()]}
        minDate={event.startDate}
        maxDate={event.endDate}
        showTime
        format={(value: any) => (value ? moment(value) : undefined)}
      />
      {/************
       * Tournament Currency  *
       ************/}
      <Field
        label={TournamentsConstants.TOURNAMENT_CURRENCY_LABEL}
        id="tournamentCurrency"
        name="tournamentCurrency"
        component={ASelect}
        style={{ width: '150px' }}
      >
        {Currencies.map((c: CurrencyType, index: number) => (
          <Select.Option key={index} value={c.id}>
            {c.id}
          </Select.Option>
        ))}
      </Field>
    </Fragment>
  );
};
// Export Default
export default React.memo(GeneralInformation);
