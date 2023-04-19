import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'redux-form';
import { numericality, required } from 'redux-form-validators';
import { AInput } from '../../../../../common/components/form/AntdSimpleField';

/**
 * Game Size Field
 */
const GameVariantField = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <div style={{ padding: '0 0 8px', color: 'rgba(0, 0, 0, 0.85)' }}>
        <label>{t('INTEREST_GAME_SIZE_LABEL')} *</label>
      </div>
      <div className="d-flex flex-row w-100 ">
        {/* <span>{t('INTEREST_GAME_SIZE_LABEL')}</span> */}
        <Field
          label=""
          id="smallBlind"
          name="smallBlind"
          component={AInput}
          hasFeedback
          validate={[required(), numericality()]}
          className="small-input"
        />
        <span className="ml-2 mr-2 mt-1">{'/'} </span>
        <Field
          label=""
          id="bigBlind"
          name="bigBlind"
          component={AInput}
          hasFeedback
          validate={[required(), numericality()]}
          className="small-input"
        />
      </div>
    </Fragment>
  );
};

export default React.memo(GameVariantField);
