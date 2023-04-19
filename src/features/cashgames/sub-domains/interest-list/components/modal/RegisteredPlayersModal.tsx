import { Modal } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../../../../common/performance/RenderCount';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import RegisteredPlayersList from '../RegisteredPlayersList';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  interestListId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// RegisteredPlayersModal
const RegisteredPlayersModal = ({
  visible,
  setVisible,
  interestListId
}: Props) => {
  const { t } = useTranslation();

  // onCancel Callback
  const onCancel = () => setVisible(false);

  return (
    <Modal
      visible={visible}
      centered
      title={
        <ModalCashGamesTitle
          gameId={interestListId}
          title={t('REGISTERED_PLAYERS_HEADER')}
        />
      }
      onCancel={onCancel}
      footer={null}
    >
      <RenderCount componentName="RegisteredPlayersModal" />
      <RegisteredPlayersList gameId={interestListId} />
    </Modal>
  );
};

// Export Default
export default React.memo(RegisteredPlayersModal);
