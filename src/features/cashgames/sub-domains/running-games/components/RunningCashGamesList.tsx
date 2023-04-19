import { Button, Card, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingContainer } from '../../../../../common/components/container';
import RunningCashGamesActions, {
  currentGameAndTableIdSelector,
  runningCashGamesListSelector,
  showJoinRequestListSelector
} from '../redux/RunningCashGamesRedux';
import RunningCashGamesDataTable from './datatable/RunningCashGamesDataTable';
import AddPlayerCashGameModal from './modal/AddPlayerCashGameModal';
import AddTableModal from './modal/AddTableModal';
import JoinSeatRequestModal from './modal/JoinSeatRequestModal';
import RunningGameCreationModal from './modal/RunningGameCreationModal';
import SeatedPlayersModal from './modal/SeatedPlayersModal';
import WaitingListModal from './modal/WaitingListModal';
import EditTableModal from './modal/EditTableModal';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */

/**
 * RunningCashGames List
 */
const RunningCashGamesListComp = () => {
  const dispatch = useDispatch();
  const cashGamesListObj = useSelector(runningCashGamesListSelector);

  const currentGameAndTableId = useSelector(currentGameAndTableIdSelector);
  const [visibleSeatedPlayers, setVisibleSeatedPlayers] = useState(false);
  const showJoinRequestListModal = useSelector(showJoinRequestListSelector);
  const [visibleAddNewPlayer, setVisibleAddNewPlayer] = useState(false);
  const [visibleAddNewTable, setVisibleAddNewTable] = useState(false);
  const [visibleEditTable, setVisibleEditTable] = useState(false);
  const [visibleRunningGameCreation, setVisibleRunningGameCreation] = useState(
    false
  );
  const [visibleWaitingList, setVisibleWaitingList] = useState(false);

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  /* eslint-disable */
  useEffect(() => {
    dispatch(
      RunningCashGamesActions.fetchRunningCashGamesRequest(
        cashGamesListObj.filters,
        1,
        cashGamesListObj.size,
        []
      )
    );
  }, [cashGamesListObj.filters]);

  // On List UnMount we stop the pulling
  useEffect(
    () => () =>
      // Stop Pulling of Running Cash Games
      dispatch(RunningCashGamesActions.cancelRunningCashGamesPulling()),
    []
  );

  // handle Table Change
  const handleTableChange = useCallback(
    (pagination: any, sorter: any) =>
      dispatch(
        RunningCashGamesActions.fetchRunningCashGamesRequest(
          cashGamesListObj.filters,
          pagination.current,
          cashGamesListObj.size,
          [
            {
              sortCol: sorter.columnKey,
              sortDirection: sorter.order
            }
          ]
        )
      ),
    [cashGamesListObj]
  );

  // Show Running Game Creation Modal
  const showRunningGameCreationModal = useCallback(
    () => setVisibleRunningGameCreation(true),
    []
  );

  // Show Seated Players Modal
  const showSeatedPlayerModal = useCallback(
    (gameId: string, tableId: string) => {
      dispatch(
        RunningCashGamesActions.setCurrentGameAndTableId(gameId, tableId)
      );
      setVisibleSeatedPlayers(true);
    },
    []
  );

  // Show Join Seat Requests Modal
  const showJoinSeatRequestsModal = useCallback(
    (gameId: string, tableId: string) => {
      dispatch(
        RunningCashGamesActions.setCurrentGameAndTableId(gameId, tableId)
      );
      dispatch(RunningCashGamesActions.toggleJoinSeatRequestModal(true));
    },
    []
  );

  // Show Add New Players Modal
  const showEditTableModal = useCallback((gameId: string, tableId: string) => {
    dispatch(RunningCashGamesActions.setCurrentGameAndTableId(gameId, tableId));
    setVisibleEditTable(true);
  }, []);

  // Show Waiting List Modal
  const showWaitingListModal = useCallback((gameId: string) => {
    dispatch(RunningCashGamesActions.setCurrentGameAndTableId(gameId));
    setVisibleWaitingList(true);
  }, []);

  // Show Add New Table Modal
  const showAddNewTable = useCallback((gameId: string) => {
    dispatch(RunningCashGamesActions.setCurrentGameAndTableId(gameId));
    setVisibleAddNewTable(true);
  }, []);

  const onAddNewPlayerFromSeatedPlayers = useCallback(
    () => setVisibleAddNewPlayer(true),
    []
  );

  // On close a table
  const onCloseTable = useCallback(
    (gameId: string, tableId: string) =>
      dispatch(RunningCashGamesActions.closeTableRequest(gameId, tableId)),
    []
  );

  const hideJoinSeatRequest = useCallback(() => {
    dispatch(RunningCashGamesActions.toggleJoinSeatRequestModal(false));
  }, []);

  /**
   * Render
   */
  return (
    <Card className="mt-3">
      {/* <Row>
        <RunningCashGamesSearchForm />{' '}
      </Row> */}
      <Row>
        <Button
          icon="plus"
          type="primary"
          id="game-creation-button"
          onClick={showRunningGameCreationModal}
        >
          Add a new game
        </Button>
      </Row>
      <Row className="mt-3">
        <RunningCashGamesDataTable
          datas={cashGamesListObj.listIds}
          totalElements={cashGamesListObj.totalElements}
          handleTableChange={handleTableChange}
          size={cashGamesListObj.size}
          onShowSeatedPlayers={showSeatedPlayerModal}
          onShowJoinSeatRequests={showJoinSeatRequestsModal}
          onShowWaitingList={showWaitingListModal}
          onEditTable={showEditTableModal}
          onCloseTable={onCloseTable}
          onAddNewTable={showAddNewTable}
          sorts={cashGamesListObj.sorts}
        />
      </Row>
      <SeatedPlayersModal
        visible={visibleSeatedPlayers}
        setVisible={setVisibleSeatedPlayers}
        gameId={
          currentGameAndTableId && currentGameAndTableId.runningCashGameId
        }
        tableId={currentGameAndTableId && currentGameAndTableId.tableId}
        onAddNewPlayer={onAddNewPlayerFromSeatedPlayers}
      />
      <JoinSeatRequestModal
        visible={showJoinRequestListModal}
        setVisible={hideJoinSeatRequest}
        gameId={
          currentGameAndTableId && currentGameAndTableId.runningCashGameId
        }
        tableId={currentGameAndTableId && currentGameAndTableId.tableId}
      />
      <AddPlayerCashGameModal
        visible={visibleAddNewPlayer}
        setVisible={setVisibleAddNewPlayer}
        gameId={
          currentGameAndTableId && currentGameAndTableId.runningCashGameId
        }
        tableId={currentGameAndTableId && currentGameAndTableId.tableId}
      />
      <AddTableModal
        visible={visibleAddNewTable}
        setVisible={setVisibleAddNewTable}
        gameId={
          currentGameAndTableId && currentGameAndTableId.runningCashGameId
        }
      />
      <EditTableModal
        visible={visibleEditTable}
        setVisible={setVisibleEditTable}
        gameId={
          currentGameAndTableId && currentGameAndTableId.runningCashGameId
        }
        tableId={currentGameAndTableId && currentGameAndTableId.tableId}
      />
      <WaitingListModal
        visible={visibleWaitingList}
        setVisible={setVisibleWaitingList}
        gameId={
          currentGameAndTableId && currentGameAndTableId.runningCashGameId
        }
        onAddNewPlayer={() => setVisibleAddNewPlayer(true)}
      />
      <RunningGameCreationModal
        visible={visibleRunningGameCreation}
        setVisible={setVisibleRunningGameCreation}
      />
    </Card>
  );
};

export default LoadingContainer(['FETCH_RUNNING_CASH_GAMES'])(
  React.memo(RunningCashGamesListComp)
);
