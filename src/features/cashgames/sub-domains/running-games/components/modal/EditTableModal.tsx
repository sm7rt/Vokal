import { Modal } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import RenderCount from '../../../../../../common/performance/RenderCount';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import EditTableForm from '../form/EditTableForm';
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

// EditTableModal
const EditTableModal = ({ visible, setVisible, gameId, tableId }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const game = useRunningCashGames(gameId);
  console.log(game);

  // Get Current Table
  const table = useMemo(
    () => game && game.tables && game.tables.find((t: any) => t.id === tableId),
    [game, tableId]
  );

  // On Submit Callback
  const onSubmit = useCallback(
    (data: any) => {
      dispatch(RunningCashGamesActions.editTableRequest(gameId, tableId, data));
      setVisible(false);
    },
    [dispatch, gameId, tableId, setVisible]
  );

  // On Cancel Callback
  const onCancel = useCallback(() => setVisible(false), [setVisible]);

  // On OK Callback
  const onOk = useCallback(
    () => dispatch(submit(RunningCashGamesConstants.EDIT_TABLE_FORM)),
    [dispatch]
  );

  return (
    <Modal
      destroyOnClose
      visible={visible}
      centered
      title={
        <ModalCashGamesTitle
          gameId={gameId}
          tableId={table && table.tableId}
          running
          title={t('EDIT_TABLE_HEADER')}
        />
      }
      onCancel={onCancel}
      cancelText="Cancel"
      okText="Edit"
      onOk={onOk}
    >
      <RenderCount componentName="EditTableModal" />
      {game &&
        game.tables &&
        game.tables.length === 1 &&
        game.waitingList &&
        game.waitingList.length > 0 && (
          <p className="text-info">{t('WARNING_WAITING_LIST')}</p>
        )}
      <EditTableForm
        onSubmit={onSubmit}
        initialValues={
          game && {
            gameVariant: game.gameVariant,
            smallBlind: game.gameSize.split('/')[0],
            bigBlind: game.gameSize.split('/')[1]
          }
        }
      />
    </Modal>
  );
};

// Export Default
export default React.memo(EditTableModal);
