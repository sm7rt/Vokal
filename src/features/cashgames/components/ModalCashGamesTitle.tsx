import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../common/models/StateModel';
import { interestListFromListSelector } from '../sub-domains/interest-list/redux/InterestListRedux';
import { runningCashGamesFromListSelector } from '../sub-domains/running-games/redux/RunningCashGamesRedux';

type ModalCashGamesTitleProps = {
  gameId: string;
  title: string;
  tableId?: string;
  running?: boolean;
};

/**
 * Modal Cash Games Title
 * @param param0
 */
const ModalCashGamesTitle = ({
  gameId,
  title,
  tableId,
  running
}: ModalCashGamesTitleProps) => {
  const game = useSelector((state: IRootState) =>
    running
      ? runningCashGamesFromListSelector()(state, gameId)
      : interestListFromListSelector()(state, gameId)
  );

  const tableInfo = tableId ? ` - Table ${tableId}` : '';

  return (
    <span>
      {title.toLocaleUpperCase()}
      {game && (
        <small className="ml-2">{` ${game.gameVariant} ${game.gameSize} ${tableInfo}`}</small>
      )}
    </span>
  );
};

export default React.memo(ModalCashGamesTitle);
