import { List } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../../common/models/StateModel';
import InterestListActions, {
  registeredPlayersListSelector
} from '../redux/InterestListRedux';
import PlayerItem from '../../../../players/component/PlayerItem';
import RenderCount from '../../../../../common/performance/RenderCount';
import { LoadingContainer } from '../../../../../common/components/container';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
};

/**
 * Registered Players List
 */
const RegisteredPlayersListComp = (props: Props) => {
  const dispatch = useDispatch();
  const { gameId } = props;
  const registeredPlayersList = useSelector((state: IRootState) =>
    registeredPlayersListSelector(state, gameId)
  );

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  /* eslint-disable */
  useEffect(() => {
    dispatch(InterestListActions.fetchRegisteredPlayersRequest(gameId));
  }, [gameId]);

  const renderItem = (playerId: number) => (
    <PlayerItem avatarSize={48} player={{ flopId: playerId }} />
  );

  /**
   * Render
   */
  return (
    <div className="d-flex flex-column justify-content-start align-items-center w-100 p-1 modal-overflow">
      <RenderCount componentName="RegisteredPlayersList" />
      <List
        dataSource={registeredPlayersList}
        renderItem={renderItem}
        className="w-100"
      />
    </div>
  );
};

export default LoadingContainer(['FETCH_REGISTERED_PLAYERS'])(
  React.memo(RegisteredPlayersListComp)
);
