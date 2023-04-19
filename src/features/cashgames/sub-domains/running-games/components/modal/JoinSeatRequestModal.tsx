import { Modal } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../../../../common/performance/RenderCount';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import JoinSeatRequestList from '../JoinSeatRequestList';
import { useRunningCashGames } from '../../hooks/RunningCashGamesHooks';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
  tableId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// JoinSeatRequestListModal
const JoinSeatRequestListModal = ({
  visible,
  setVisible,
  gameId,
  tableId
}: // onAddNewPlayer
Props) => {
  const { t } = useTranslation();
  const game = useRunningCashGames(gameId);

  // Get Current Table
  const table = useMemo(
    () => game && game.tables && game.tables.find((t: any) => t.id === tableId),
    [game, tableId]
  );

  // On Cancel Callback
  const onCancel = useCallback(() => setVisible(false), [setVisible]);

  return (
    <Modal
      visible={visible}
      centered
      onCancel={onCancel}
      title={
        <ModalCashGamesTitle
          title={t('JOIN_SEAT_REQUEST')}
          gameId={gameId}
          tableId={table && tableId}
        />
      }
      footer={null}
    >
      <RenderCount componentName="JoinSeatRequestListModal" />
      <JoinSeatRequestList gameId={gameId} tableId={tableId} />
    </Modal>
  );
};

// Export Default
export default React.memo(JoinSeatRequestListModal);
