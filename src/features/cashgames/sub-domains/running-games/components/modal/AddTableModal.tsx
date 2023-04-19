import { Modal } from 'antd';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import RenderCount from '../../../../../../common/performance/RenderCount';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import AddTableForm from '../form/AddTableForm';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// AddTableModal
const AddTableModal = ({ visible, setVisible, gameId }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // On Submit Callback
  const onSubmit = useCallback(
    (data: any) => {
      dispatch(RunningCashGamesActions.addNewTableRequest(gameId, data));
      setVisible(false);
    },
    [dispatch, gameId, setVisible]
  );

  // On Cancel Callback
  const onCancel = useCallback(() => setVisible(false), [setVisible]);

  // On OK Callback
  const onOk = useCallback(
    () => dispatch(submit(RunningCashGamesConstants.ADD_TABLE_FORM)),
    [dispatch]
  );

  return (
    <Modal
      visible={visible}
      centered
      title={
        <ModalCashGamesTitle
          gameId={gameId}
          running
          title={t('ADD_NEW_TABLE_HEADER')}
        />
      }
      onCancel={onCancel}
      cancelText="Cancel"
      okText="Add"
      onOk={onOk}
    >
      <RenderCount componentName="AddTableModal" />
      <AddTableForm onSubmit={onSubmit} initialValues={{ maxPlayers: 10 }} />
    </Modal>
  );
};

// Export Default
export default React.memo(AddTableModal);
