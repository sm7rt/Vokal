import React, { useState, Fragment, useCallback } from 'react';
import { Row, Tooltip, Button } from 'antd';
import PlayerItem from '../../../../../players/component/PlayerItem';
import { useTranslation } from 'react-i18next';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import { useDispatch } from 'react-redux';
import './SeatedPlayerItem.scss';

type JoinSeatRequestItemProps = {
  gameId: string;
  tableId: string;
  player: GamesApiDefinitions.PlayerDTO;
};

// Seated Player Item
const JoinSeatRequestItem = ({
  gameId,
  tableId,
  player
}: JoinSeatRequestItemProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [declineOverlayRow, setDeclineOverlayRow] = useState(false);

  // On Confirm Delete Callback
  const onConfirmDecline = useCallback(() => {
    dispatch(
      RunningCashGamesActions.declineJoinSeatReqRequest(gameId, tableId, player)
    );
    setDeclineOverlayRow(false);
  }, [dispatch, gameId, tableId, player]);

  // On Accept Request Callback
  const onAcceptRequest = useCallback(() => {
    dispatch(
      RunningCashGamesActions.confirmJoinSeatReqRequest(gameId, tableId, player)
    );
  }, [dispatch, gameId, tableId, player]);

  const onDeclineOverlay = () => setDeclineOverlayRow(true);

  const onCancelDecline = () => setDeclineOverlayRow(false);

  return (
    <Row
      type="flex"
      justify="space-between"
      className={`align-items-center p-1 seated-player-item ${declineOverlayRow &&
        'delete-overlay'}`}
    >
      <Row type="flex" align="middle">
        {!declineOverlayRow ? (
          <Fragment>
            {player && (
              <PlayerItem
                player={player}
                noBorder
                avatarSize={64}
                showDistance
              />
            )}
          </Fragment>
        ) : (
          <div className="pl-2">{t('DECLINE_PLAYER_CONFIRM')}</div>
        )}
      </Row>
      {!declineOverlayRow ? (
        <Row>
          <Tooltip title={t('ACCEPT_REQUEST_PLAYER')} placement="bottom">
            <Button
              icon="check"
              shape="circle"
              className="text-success border-success"
              onClick={onAcceptRequest}
            />
          </Tooltip>
          <Tooltip title={t('DECLINE_REQUEST_PLAYER')} placement="bottom">
            <Button
              icon="close"
              shape="circle"
              className="text-danger border-danger ml-2"
              onClick={onDeclineOverlay}
            />
          </Tooltip>
        </Row>
      ) : (
        <Row>
          <Button
            className="bg-white border-danger text-danger"
            onClick={onCancelDecline}
          >
            {t('CANCEL_BUTTON')}
          </Button>
          <Button
            className="ml-2 bg-danger border-danger text-white"
            onClick={onConfirmDecline}
          >
            {t('DECLINE_BUTTON')}
          </Button>
        </Row>
      )}
    </Row>
  );
};

export default React.memo(JoinSeatRequestItem);
