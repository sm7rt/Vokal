import { Empty, List } from 'antd';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { LoadingContainer } from '../../../common/components/container';
import { IRootState } from '../../../common/models/StateModel';
import RenderCount from '../../../common/performance/RenderCount';
import { createLoadingSelector } from '../../../common/redux/LoadingRedux';
import { searchPlayersListSelector } from '../redux/PlayersRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  renderItem: (playerId: number) => ReactNode;
};

/**
 * Players List
 */
const PlayersListComp = (props: Props) => {
  const { renderItem } = props;
  const searchPlayersList = useSelector((state: IRootState) =>
    searchPlayersListSelector(state)
  );

  const isFetchingPlayer = useSelector((state: IRootState) =>
    createLoadingSelector(['SEARCH_PLAYERS'])(state.loading)
  );

  /**
   * Render
   */
  return (
    <div className="d-flex flex-column justify-content-start align-items-center w-100 modal-overflow">
      <RenderCount componentName="PlayersList" />
      {!isFetchingPlayer && searchPlayersList.length === 0 ? (
        <Empty description="No Flop Users found" />
      ) : (
        <List
          dataSource={searchPlayersList}
          renderItem={renderItem}
          className="w-100"
        />
      )}
    </div>
  );
};

export default LoadingContainer(['SEARCH_PLAYERS'])(
  React.memo(PlayersListComp)
);
