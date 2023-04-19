import { Row, Select } from 'antd';
import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { numericality, required } from 'redux-form-validators';
import {
  ACheckbox,
  AInput,
  ASelect
} from '../../../../../../common/components/form/AntdSimpleField';
import RenderCount from '../../../../../../common/performance/RenderCount';
import { GameVariantType } from '../../../../../../common/redux/ParametersModel.d';
import GameVariant from '../../../../../../common/sagas/static/GameVariant';
import TournamentsConstants from '../../constants/TournamentsConstants';
import TournamentStyles from '../../styles/Tournaments.module.scss';

type Props = {};

/**
 * Tournament general information
 * Form to define the Tournament game's information :
 * -> Game Variant
 * -> Buy In
 * -> Fee
 * -> Start Stack
 * -> Late Registration Duration
 */
const GameCharacteristics = (props: Props) => {
  return (
    <Fragment>
      <RenderCount componentName="GameCharacteristics" />
      {/* <h6 className="m-0">{TournamentsConstants.GAME_CHARACTERISTIC_TITLE}</h6> */}
      {/************************
       * Tournament name section *
       ***********************/}
      <Field
        id="gameVariant"
        name="gameVariant"
        label={TournamentsConstants.GAME_VARIANT_LABEL}
        validate={[required()]}
        style={{ width: '200px' }}
        component={ASelect}
      >
        {GameVariant.map((c: GameVariantType, index: number) => (
          <Select.Option key={index} value={c.shortName}>
            {c.shortName}
          </Select.Option>
        ))}
      </Field>
      {/************
       * Tournament place section  *
       ************/}
      <Row>
        <label htmlFor="buyIn">
          {TournamentsConstants.BUY_IN_LABEL} + {TournamentsConstants.FEE_LABEL}
        </label>
        <div className="d-flex flex-row justify-content-start align-items-start">
          <Field
            // label={`${TournamentsConstants.BUY_IN_LABEL} ${TournamentsConstants.FEE_LABEL}`}
            id="buyIn"
            name="buyIn"
            type="text"
            style={{ width: '100px' }}
            component={AInput}
            validate={[numericality()]}
          />
          <Field
            id="fee"
            name="fee"
            type="text"
            className="ml-2"
            style={{ width: '100px' }}
            component={AInput}
            validate={[numericality()]}
          />
        </div>
      </Row>
      {/***********************
       * Take Out of The Pool *
       ***********************/}
      <Field
        label={TournamentsConstants.TAKE_OUT_OF_POOL_LABEL}
        id="takeOut"
        name="takeOut"
        component={AInput}
        validate={[numericality()]}
        style={{ width: '100px' }}
      />
      {/***********************
       * Tournament Start Stack section *
       ***********************/}
      <Field
        label={TournamentsConstants.STACK_LABEL}
        id="startStack"
        name="startStack"
        type="text"
        component={AInput}
        validate={[numericality()]}
        style={{ width: '100px' }}
      />
      {/***********************
       * Late Registration *
       ***********************/}
      <Field
        label={TournamentsConstants.LATE_REGISTRATION_INFO}
        id="lateRegistrationLevel"
        name="lateRegistrationLevel"
        type="text"
        component={AInput}
        className={TournamentStyles.lateDurationStyle}
        style={{ width: '100px' }}
      />
      <Field
        id="lateRegistrationIncludeBreak"
        name="lateRegistrationIncludeBreak"
        labelClassName="font12"
        component={ACheckbox}
        className="mb-3"
      >
        {TournamentsConstants.LATE_REG_UNTIL_NEXT_BREAK}
      </Field>
    </Fragment>
  );
};

// Export Default
export default GameCharacteristics;
