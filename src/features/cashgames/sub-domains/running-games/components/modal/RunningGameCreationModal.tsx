import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { reset, submit } from 'redux-form';
import RenderCount from '../../../../../../common/performance/RenderCount';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';
import RunningGameCreationForm from '../form/RunningGameCreationForm';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// RunningGameCreationModal
const RunningGameCreationModal = ({ visible, setVisible }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // On Submit Callback
  const onSubmit = (data: any) => {
    dispatch(RunningCashGamesActions.createRunningGameRequest(data));
    dispatch(reset(RunningCashGamesConstants.CREATE_RUNNING_GAME_FORM));
    setVisible(false);
  };

  // On Cancel Callback
  const onCancel = () => {
    setVisible(false);
    dispatch(reset(RunningCashGamesConstants.CREATE_RUNNING_GAME_FORM));
  };

  // On OK Callback
  const onOk = () =>
    dispatch(submit(RunningCashGamesConstants.CREATE_RUNNING_GAME_FORM));

  return (
    <Modal
      visible={visible}
      centered
      title={t('CREATE_RUNNING_GAME').toLocaleUpperCase()}
      onCancel={onCancel}
      onOk={onOk}
      okText={t('CREATE_BUTTON')}
    >
      <RenderCount componentName="RunningGameCreationModal" />
      <RunningGameCreationForm
        onSubmit={onSubmit}
        initialValues={{
          tables: [
            {
              tableId: 1,
              maxPlayers: 10
            }
          ]
        }}
      />
    </Modal>
  );
};

// Export Default
export default React.memo(RunningGameCreationModal);
