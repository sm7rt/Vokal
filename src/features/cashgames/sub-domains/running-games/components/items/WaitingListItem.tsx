import React, { useState, Fragment } from 'react';
import { Row, Tooltip, Button } from 'antd';
import PlayerItem from '../../../../../players/component/PlayerItem';
import { useTranslation } from 'react-i18next';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import { useDispatch } from 'react-redux';
import './SeatedPlayerItem.scss';

type WaitingListItemProps = {
  gameId: string;
  tableId?: string;
  player: GamesApiDefinitions.PlayerDTO;
  disableSit?: boolean;
};

// Seated Player Item
const WaitingListItem = ({
  gameId,
  tableId,
  player,
  disableSit
}: WaitingListItemProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [deleteOverlayRow, setDeleteOverlayRow] = useState(false);

  // On Confirm Delete Callback
  const onConfirmDelete = () => {
    dispatch(
      RunningCashGamesActions.removePlayerFromWaitingListRequest(
        gameId,
        player.id
      )
    );
    setDeleteOverlayRow(false);
  };

  // On Call Player Callback
  const onCallPlayer = () => {
    dispatch(
      RunningCashGamesActions.callPlayerRequest(gameId, tableId, player)
    );
  };

  // On Sit Player Callback
  const onSitPlayer = () => {
    dispatch(RunningCashGamesActions.sitPlayerRequest(gameId, tableId, player));
  };

  const onDeleteOverlay = () => setDeleteOverlayRow(true);

  const onCancelDelete = () => setDeleteOverlayRow(false);

  return (
    <Row
      type="flex"
      justify="space-between"
      className={`align-items-center p-1 seated-player-item ${deleteOverlayRow &&
        'delete-overlay'}`}
    >
      <Row type="flex" align="middle">
        {!deleteOverlayRow ? (
          <Fragment>
            {player ? (
              <PlayerItem
                player={player}
                noBorder
                avatarSize={48}
                showDistance
              />
            ) : (
              <span>No Players</span>
            )}
          </Fragment>
        ) : (
          <div>{t('REMOVE_PLAYER_CONFIRM')}</div>
        )}
      </Row>
      {!deleteOverlayRow ? (
        <Row>
          {tableId && (
            <Fragment>
              {player.flopId && (
                <Tooltip title={t('CALL_PLAYER')} placement="bottom">
                  <Button
                    id={`call-player-${player.id}`}
                    icon="notification"
                    shape="circle"
                    className="text-warning border-warning"
                    onClick={onCallPlayer}
                  />
                </Tooltip>
              )}
              <Tooltip title={t('SIT_PLAYER')} placement="bottom">
                <Button
                  icon="arrow-down"
                  id={`sit-player-${player.id}`}
                  shape="circle"
                  className="text-primary border-primary ml-2"
                  disabled={disableSit}
                  onClick={onSitPlayer}
                />
              </Tooltip>
            </Fragment>
          )}
          <Tooltip title={t('REMOVE_PLAYER')} placement="bottom">
            <Button
              id={`remove-player-from-wl-${player.id}`}
              icon="close"
              shape="circle"
              className="text-danger border-danger ml-2"
              onClick={onDeleteOverlay}
            />
          </Tooltip>
        </Row>
      ) : (
        <Row>
          <Button
            className="bg-white border-danger text-danger"
            onClick={onCancelDelete}
          >
            {t('CANCEL_BUTTON')}
          </Button>
          <Button
            className="ml-2 bg-danger border-danger text-white"
            id={`confirm-remove-player-from-wl-${player.id}`}
            onClick={onConfirmDelete}
          >
            {t('REMOVE_BUTTON')}
          </Button>
        </Row>
      )}
    </Row>
  );
};

export default React.memo(WaitingListItem);
