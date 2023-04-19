import React, { useCallback, Fragment } from 'react';
import { playerStatusRunningGameFromListSelector } from '../../redux/RunningCashGamesRedux';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Button, Tag } from 'antd';
import { IRootState } from '../../../../../../common/models/StateModel';
import PlayerItem from '../../../../../players/component/PlayerItem';
import { useRunningCashGames } from '../../hooks/RunningCashGamesHooks';

/**
 * Player Cash Game Item
 * @param param0
 */
const PlayerCashGameItem = ({ gameId, tableId, playerId }) => {
  const dispatch = useDispatch();
  const playerStatus = useSelector((state: IRootState) =>
    playerStatusRunningGameFromListSelector(state, playerId)
  );

  const alreadySittedGame = useRunningCashGames(
    playerStatus && playerStatus.gameId
  );
  const alreadySittedTable =
    alreadySittedGame &&
    alreadySittedGame.tables.find((t: any) => t.id === playerStatus.tableId);

  const game = useRunningCashGames(gameId);

  // Get Current Table
  const table =
    game && game.tables && game.tables.find((t: any) => t.id === tableId);

  // On Choose player
  const onChoosePlayer = useCallback(
    (playerId: string) => {
      // If there is a table Id, it's Add Player on Table, else it's Add Player on WL
      if (tableId) {
        // Trigger add player Request
        // If table is not full, we sit this player
        if (table && table.players.length < table.maxPlayers) {
          dispatch(
            RunningCashGamesActions.addNewPlayerRequest(gameId, tableId, {
              flopId: playerId
            })
          );
        } // else we put it on the waiting list
        else {
          dispatch(
            RunningCashGamesActions.addNewPlayerToWaitingListRequest(gameId, {
              flopId: playerId
            })
          );
        }
      } else {
        // Trigger add player to Waiting List Request
        dispatch(
          RunningCashGamesActions.addNewPlayerToWaitingListRequest(gameId, {
            flopId: playerId
          })
        );
      }
    },
    [dispatch, gameId, table, tableId]
  );

  const renderItemRight = useCallback(() => {
    if (
      (table && table.players.find((p: any) => p.flopId === playerId)) ||
      (game && game.waitingList.find((p: any) => p.flopId === playerId))
    ) {
      return null;
    }
    return (
      <Button
        id={`add-player-${playerId}`}
        type="primary"
        onClick={() => onChoosePlayer(playerId)}
      >
        {table && table.players.length < table.maxPlayers ? 'Sit' : 'Add to WL'}
      </Button>
    );
  }, [game, table, onChoosePlayer, playerId]);

  const rightTitle = useCallback(() => {
    if (alreadySittedTable) {
      const isSittedOnThisTable =
        table && table.players.find((p: any) => p.flopId === playerId);
      const seatLabel = isSittedOnThisTable
        ? 'sitted'
        : `sitted on ${alreadySittedTable.gameVariant} ${alreadySittedTable.gameSize}, table ${alreadySittedTable.tableId}`;
      return (
        <Fragment>
          <span> - </span>
          <Tag color={isSittedOnThisTable ? 'green' : 'red'}>{seatLabel}</Tag>
        </Fragment>
      );
    }
    if (game && game.waitingList.find((p: any) => p.flopId === playerId)) {
      return (
        <Fragment>
          <span> - </span>
          <Tag color="orange">waiting</Tag>
        </Fragment>
      );
    }
    return null;
  }, [table, game, playerId, alreadySittedTable]);

  return (
    <Row
      type="flex"
      justify="space-between"
      className={`align-items-center border-bottom`}
    >
      <PlayerItem
        avatarSize={48}
        player={{ flopId: playerId }}
        noBorder
        rightTitle={rightTitle}
      />
      {renderItemRight()}
    </Row>
  );
};

export default PlayerCashGameItem;
