import { Modal } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Immutable from 'seamless-immutable';
import RenderCount from '../../../../../../common/performance/RenderCount';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import PlayersTransfert from '../../../../components/PlayersTransfert';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import SeatedPlayerItem from '../items/SeatedPlayerItem';
import WaitingListItem from '../items/WaitingListItem';
import { useRunningCashGames } from '../../hooks/RunningCashGamesHooks';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
  tableId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onAddNewPlayer: () => void;
};

// SeatedPlayersModal
const SeatedPlayersModal = ({
  visible,
  setVisible,
  gameId,
  tableId,
  onAddNewPlayer
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  console.log('Inside SeatedPlayersModal GameId', gameId);
  console.log('Inside SeatedPlayersModal Table id', tableId);
  const game = useRunningCashGames(gameId);

  // Get Waiting List Players
  useEffect(() => {
    gameId && dispatch(RunningCashGamesActions.fetchWaitingListRequest(gameId));
  }, [dispatch, gameId]);

  // Get Current Table
  const table = useMemo(
    () => game && game.tables && game.tables.find((t: any) => t.id === tableId),
    [game, tableId]
  );

  // Construct Seated Players Final list
  const seatedPlayerFinal =
    (table && Immutable.asMutable(table.players.concat([]))) || [];

  // On Cancel Callback
  const onCancel = useCallback(() => setVisible(false), [setVisible]);

  // On Confirm Delete Callback
  const onConfirmDelete = useCallback(
    (player: GamesApiDefinitions.PlayerDTO) => {
      console.log('GameId', gameId);
      console.log('Table id', tableId);
      dispatch(
        RunningCashGamesActions.removePlayerFromTableRequest(
          gameId,
          tableId,
          player.id
        )
      );
    },
    [dispatch, gameId, tableId]
  );

  // On Sit Player Callback
  const onConfirmSitPlayer = useCallback(
    (player: GamesApiDefinitions.PlayerDTO) => {
      dispatch(
        RunningCashGamesActions.confirmSitPlayerRequest(gameId, tableId, player)
      );
    },
    [dispatch, gameId, tableId]
  );

  // render Item Left
  const renderItemLeft = useCallback(
    (player: GamesApiDefinitions.PlayerDTO) =>
      player !== 0 ? (
        <SeatedPlayerItem
          player={player}
          onConfirmDelete={onConfirmDelete}
          onConfirmSitPlayer={onConfirmSitPlayer}
        />
      ) : (
        <SeatedPlayerItem />
      ),
    [onConfirmDelete, onConfirmSitPlayer]
  );

  // render item right
  const renderItemRight = useCallback(
    (player: GamesApiDefinitions.PlayerDTO) => (
      <WaitingListItem
        gameId={gameId}
        tableId={tableId}
        player={player}
        disableSit={table && table.players.length === table.maxPlayers}
      />
    ),
    [gameId, table, tableId]
  );

  return (
    <Modal
      visible={visible}
      centered
      onCancel={onCancel}
      cancelText="Close"
      okText="Add a New Player"
      className="w-75 full-body-modal full-height-without-header-modal"
      onOk={onAddNewPlayer}
      okButtonProps={{
        id: 'add-player'
      }}
    >
      <RenderCount componentName="SeatedPlayersModal" />
      <PlayersTransfert
        titleListLeft={
          <ModalCashGamesTitle
            gameId={gameId}
            title={t('PLAYERS').toUpperCase()}
            tableId={table && table.tableId}
            running
          />
        }
        dataSourceLeft={seatedPlayerFinal}
        renderItemLeft={renderItemLeft}
        titleListRight={t('WAITING_LIST').toUpperCase()}
        dataSourceRight={(game && game.waitingList) || []}
        renderItemRight={renderItemRight}
        emptyMessageRight="No Players on Waiting List"
        maxPlayers={table && table.maxPlayers}
      />
    </Modal>
  );
};

// Export Default
export default React.memo(SeatedPlayersModal);
