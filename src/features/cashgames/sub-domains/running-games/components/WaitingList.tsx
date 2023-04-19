import { List } from 'antd';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingContainer } from '../../../../../common/components/container';
import { IRootState } from '../../../../../common/models/StateModel';
import RenderCount from '../../../../../common/performance/RenderCount';
import RunningCashGamesActions, {
  waitingListSelector
} from '../redux/RunningCashGamesRedux';
import WaitingListItem from './items/WaitingListItem';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
  tableId?: string;
};

/**
 * Registered Players List
 */
const WaitingListComp = (props: Props) => {
  const dispatch = useDispatch();
  const { gameId, tableId } = props;
  const waitingList = useSelector((state: IRootState) =>
    waitingListSelector(state, gameId)
  );

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  useEffect(() => {
    gameId && dispatch(RunningCashGamesActions.fetchWaitingListRequest(gameId));
  }, [dispatch, gameId]);

  // Render Item
  const renderItem = useCallback(
    (player: GamesApiDefinitions.PlayerDTO, index: number) => (
      <WaitingListItem
        key={index}
        gameId={gameId}
        player={player}
        tableId={tableId}
      />
    ),
    [gameId, tableId]
  );

  /**
   * Render
   */
  return (
    <div className="d-flex flex-column justify-content-start align-items-center w-100 p-1 modal-overflow">
      <RenderCount componentName="WaitingList" />
      <List
        dataSource={waitingList}
        renderItem={renderItem}
        className="w-100"
      />
    </div>
  );
};

export default LoadingContainer(['FETCH_WAITING_LIST'])(
  React.memo(WaitingListComp)
);
