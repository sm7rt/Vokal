import { Row } from 'antd';
import React from 'react';
import { reduxForm } from 'redux-form';
import TableForm from '../../../../components/form/TableForm';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';

/**
 * Add Table Form
 * @param param0
 */
const AddTableFormComp = () => {
  return (
    <Row type="flex" justify="start" align-items="center" className="w-100 p-3">
      <TableForm tableIdName="tableId" maxPlayersName="maxPlayers" />
    </Row>
  );
};

const AddTableForm = reduxForm({
  form: RunningCashGamesConstants.ADD_TABLE_FORM
})(AddTableFormComp);

export default React.memo(AddTableForm);
