import { Modal } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../../../../common/performance/RenderCount';
import { useRunningCashGames } from '../../hooks/RunningCashGamesHooks';
import WaitingList from '../WaitingList';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onAddNewPlayer: () => void;
};

// WaitingListModal
const WaitingListModal = ({
  visible,
  setVisible,
  gameId,
  onAddNewPlayer
}: Props) => {
  const { t } = useTranslation();
  const game = useRunningCashGames(gameId);

  // On Cancel Callback
  const onCancel = React.useCallback(() => setVisible(false), [setVisible]);

  return (
    <Modal
      visible={visible}
      centered
      title={
        <span>
          {t('WAITING_LIST').toUpperCase()}
          {game && (
            <small className="ml-2">{`(${game.gameVariant} ${game.gameSize})`}</small>
          )}
        </span>
      }
      onCancel={onCancel}
      cancelText="Close"
      okText="Add a New Player"
      onOk={onAddNewPlayer}
      okButtonProps={{
        id: 'add-player-wl'
      }}
    >
      <RenderCount componentName="WaitingListModal" />
      <WaitingList gameId={gameId} />
    </Modal>
  );
};

// Export Default
export default React.memo(WaitingListModal);
