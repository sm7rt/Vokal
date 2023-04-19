import { Button, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import { required } from 'redux-form-validators';
import { AInput } from '../../../../../../common/components/form/AntdSimpleField';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';

/**
 * Add Player Form
 * @param param0
 */
const AddPlayerCashGameForm = ({ textButton }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const submitForm = () => {
    dispatch(submit(RunningCashGamesConstants.ADD_PLAYER_FORM));
  };

  return (
    <Row type="flex" justify="start" align-items="center" className="w-100">
      <Field id="flopId" name="flopId" component={AInput} className="hidden" />
      <Row type="flex" justify="space-between" align="bottom" className="w-100">
        <Row type="flex" className="flex-fill mr-5">
          <label>{t('PLAYER_NAME_LABEL')}</label>
          <Field
            label={null}
            id="name"
            name="name"
            type="text"
            component={AInput}
            validate={[required()]}
            className="mb-1 w-100"
          />
        </Row>
        <Button
          type="primary"
          onClick={submitForm}
          style={{ marginBottom: '8px' }}
        >
          {textButton}
        </Button>
      </Row>
    </Row>
  );
};

const AddPlayerReduxForm = reduxForm({
  form: RunningCashGamesConstants.ADD_PLAYER_FORM
})(AddPlayerCashGameForm);

export default React.memo(AddPlayerReduxForm);
