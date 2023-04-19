import { List } from 'antd';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingContainer } from '../../../../../common/components/container';
import { IRootState } from '../../../../../common/models/StateModel';
import RenderCount from '../../../../../common/performance/RenderCount';
import RunningCashGamesActions, {
  joinSeatRequestListSelector
} from '../redux/RunningCashGamesRedux';
import JoinSeatRequestItem from './items/JoinSeatRequestItem';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
  tableId: string;
};

/**
 * Registered Players List
 */
const JoinSeatRequestListComp = (props: Props) => {
  const dispatch = useDispatch();
  const { gameId, tableId } = props;
  const joinSeatRequestList = useSelector((state: IRootState) =>
    joinSeatRequestListSelector(state, gameId, tableId)
  );

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  useEffect(() => {
    dispatch(RunningCashGamesActions.fetchJoinSeatReqRequest(gameId, tableId));
  }, [dispatch, gameId, tableId]);

  // Render Item
  const renderItem = useCallback(
    (player: GamesApiDefinitions.PlayerDTO, index: number) => (
      <JoinSeatRequestItem
        key={player.id}
        gameId={gameId}
        tableId={tableId}
        player={player}
      />
    ),
    [gameId, tableId]
  );

  /**
   * Render
   */
  return (
    <div className="d-flex flex-column justify-content-start align-items-center w-100 p-1 modal-overflow">
      <RenderCount componentName="JoinSeatRequestList" />
      <List
        dataSource={joinSeatRequestList}
        renderItem={renderItem}
        className="w-100"
      />
    </div>
  );
};

export default LoadingContainer(['FETCH_WAITING_LIST'])(
  React.memo(JoinSeatRequestListComp)
);
