import React, { useState, Fragment } from 'react';
import { Row, Tooltip, Button } from 'antd';
import PlayerItem from '../../../../../players/component/PlayerItem';
import { useTranslation } from 'react-i18next';
import './SeatedPlayerItem.scss';

type SeatedPlayerItemProps = {
  player: GamesApiDefinitions.PlayerDTO;
  onConfirmDelete: (player: GamesApiDefinitions.PlayerDTO) => void;
  noConfirm?: boolean;
  onConfirmSitPlayer?: (player: GamesApiDefinitions.PlayerDTO) => void;
};

// Seated Player Item
const SeatedPlayerItem = ({
  player,
  onConfirmDelete,
  noConfirm,
  onConfirmSitPlayer
}: SeatedPlayerItemProps) => {
  const { t } = useTranslation();

  const [deleteOverlayRow, setDeleteOverlayRow] = useState(false);

  let seatClassName = '';
  let seatTitle = '';

  if (player) {
    if (player.requestState === 'SITTED') {
      seatClassName = 'occuped';
      seatTitle = 'Occuped';
    } else if (player.requestState === 'ACCEPTED') {
      seatClassName = 'reserved';
      seatTitle = 'Reserved';
    }
  } else {
    seatClassName = 'free';
    seatTitle = 'Free';
  }

  const onDeleteOverlay = () => setDeleteOverlayRow(true);

  const onCancelDelete = () => setDeleteOverlayRow(false);

  const onRemove = () => {
    if (noConfirm) {
      return onConfirmDelete(player);
    }
    return onDeleteOverlay();
  };

  const onConfirmDeletePlayer = () => {
    onConfirmDelete(player);
    setDeleteOverlayRow(false);
  };

  return (
    <Row
      type="flex"
      justify="space-between"
      className={`align-items-center p-1 seated-player-item ${deleteOverlayRow &&
        'delete-overlay'}`}
    >
      <Row type="flex" align="middle">
        <div className={`mr-3 seat-table ${seatClassName}`}>{seatTitle}</div>
        {!deleteOverlayRow ? (
          <Fragment>
            {player ? (
              <PlayerItem player={player} noBorder avatarSize={48} />
            ) : (
              <span>No Players</span>
            )}
          </Fragment>
        ) : (
          <div className="confirm-text">{t('REMOVE_PLAYER_CONFIRM')}</div>
        )}
      </Row>
      {!deleteOverlayRow ? (
        <Fragment>
          {player && (
            <Row>
              {player.requestState === 'ACCEPTED' && (
                <Tooltip title={t('SIT_PLAYER')} placement="bottom">
                  <Button
                    icon="arrow-down"
                    id={`sit-player-${player.id}`}
                    shape="circle"
                    className="text-primary border-primary ml-2"
                    onClick={() => onConfirmSitPlayer(player)}
                  />
                </Tooltip>
              )}
              <Tooltip title={t('REMOVE_PLAYER')} placement="bottom">
                <Button
                  id={`removePlayer-${player.id}`}
                  icon={!player.requestState ? 'arrow-up' : 'close'}
                  shape="circle"
                  className="text-danger border-danger ml-2"
                  onClick={onRemove}
                />
              </Tooltip>
            </Row>
          )}
        </Fragment>
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
            id={`confirmDeletePlayer-${player.id}`}
            onClick={onConfirmDeletePlayer}
          >
            {t('REMOVE_BUTTON')}
          </Button>
        </Row>
      )}
    </Row>
  );
};

export default React.memo(SeatedPlayerItem);
