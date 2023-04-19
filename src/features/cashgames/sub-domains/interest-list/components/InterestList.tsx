import React, { useEffect, useState, useCallback } from 'react';
import {
  FlopCashGamesDataTable,
  CasinoCashGamesDataTable
} from './datatables/InterestListDataTable';
import { LoadingContainer } from '../../../../../common/components/container';
import InterestListSearchForm from './form/InterestListSearchForm';
import { Card, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import InterestListActions, {
  currentInterestListIdSelector,
  showMessageModalSelector,
  interestListDisplayListSelector
} from '../redux/InterestListRedux';
import RegisteredPlayersModal from './modal/RegisteredPlayersModal';
import InterestListCreationModal from './modal/InterestListCreationModal';
import MessagesModal from '../../../../messages/components/modal/MessagesModal';
import StartingInterestListModal from './modal/StartingInterestListModal';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */

/**
 * Interest List
 */
const InterestListComp = () => {
  const dispatch = useDispatch();
  const interestListObj = useSelector(interestListDisplayListSelector);

  const currentInterestListId = useSelector(currentInterestListIdSelector);

  const showMessageModal = useSelector(showMessageModalSelector);

  const [visibleRegisteredPlayers, setVisibleRegisteredPlayers] = useState(
    false
  );

  const [
    visibleInterestedListCreation,
    setVisibleInterestedListCreation
  ] = useState(false);
  const [
    visibleStartingInterestedList,
    setVisibleStartingInterestedList
  ] = useState(false);

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  useEffect(() => {
    dispatch(
      InterestListActions.fetchInterestListListRequest(
        interestListObj.filters,
        1,
        interestListObj.size,
        []
      )
    );
  }, [dispatch, interestListObj.filters, interestListObj.size]);

  // On List UnMount we stop the pulling
  useEffect(
    () => () =>
      // Stop Pulling of Interest List
      dispatch(InterestListActions.cancelInterestListPulling()),
    [dispatch]
  );

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  // on Decline Cash Game Callback
  const onDeclineCashGame = useCallback(
    (interestListId: string) => {
      dispatch(InterestListActions.declineInterestListRequest(interestListId));
    },
    [dispatch]
  );

  // Handle Table Change
  const handleTableChange = useCallback(
    (pagination: any, sorter: any) =>
      dispatch(
        InterestListActions.fetchInterestListListRequest(
          interestListObj.filters,
          pagination.current,
          interestListObj.size,
          [
            {
              sortCol: sorter.columnKey,
              sortDirection: sorter.order
            }
          ]
        )
      ),
    [dispatch, interestListObj.filters, interestListObj.size]
  );

  // on Accept Cash Game Callback
  const onAcceptCashGame = useCallback(
    (interestListId: string) =>
      dispatch(InterestListActions.acceptInterestListRequest(interestListId)),
    [dispatch]
  );

  // on Start Cash Game Callback
  const onStartCashGame = useCallback(
    (interestListId: string) => {
      dispatch(InterestListActions.setCurrentInterestListId(interestListId));
      setVisibleStartingInterestedList(true);
    },
    [dispatch]
  );

  // on Cancel Cash Game Callback
  const onCancelCashGame = useCallback(
    (interestListId: string) =>
      dispatch(InterestListActions.deleteInterestListRequest(interestListId)),
    [dispatch]
  );

  // on Show Registered Players Callback
  const onShowRegisteredPlayers = useCallback(
    (interestListId: string) => {
      dispatch(InterestListActions.setCurrentInterestListId(interestListId));
      setVisibleRegisteredPlayers(true);
    },
    [dispatch]
  );

  // on Show Messages Callback
  const onShowMessage = useCallback(
    (interestListId: string) => {
      dispatch(InterestListActions.setCurrentInterestListId(interestListId));
      dispatch(InterestListActions.toggleMessageModal(true));
    },
    [dispatch]
  );

  const hideMessage = useCallback(() => {
    dispatch(InterestListActions.toggleMessageModal(false));
  }, [dispatch]);

  /**
   * Render
   */
  return (
    <Card className="mt-3">
      <Row>
        <InterestListSearchForm />
      </Row>
      {interestListObj.filters &&
        interestListObj.filters.gameOrigin === 'CASINO' && (
          <Row>
            <Button
              icon="plus"
              type="primary"
              id="interestlist-creation-button"
              onClick={() => setVisibleInterestedListCreation(true)}
            >
              Create Interest list
            </Button>
          </Row>
        )}
      <Row className="mt-3">
        {interestListObj.filters.gameOrigin === 'FLOP_USER' && (
          <FlopCashGamesDataTable
            datas={interestListObj.listIds}
            currentInterestListId={currentInterestListId}
            totalElements={interestListObj.totalElements}
            handleTableChange={handleTableChange}
            size={interestListObj.size}
            onAcceptCashGame={onAcceptCashGame}
            onStartCashGame={onStartCashGame}
            onDeclineCashGame={onDeclineCashGame}
            onShowRegisteredPlayers={onShowRegisteredPlayers}
            onShowMessages={onShowMessage}
            sorts={interestListObj.sorts}
          />
        )}
        {interestListObj.filters.gameOrigin === 'CASINO' && (
          <CasinoCashGamesDataTable
            datas={interestListObj.listIds}
            currentInterestListId={currentInterestListId}
            totalElements={interestListObj.totalElements}
            handleTableChange={handleTableChange}
            size={interestListObj.size}
            onShowRegisteredPlayers={onShowRegisteredPlayers}
            onShowMessages={onShowMessage}
            onStartCashGame={onStartCashGame}
            onCancelCashGame={onCancelCashGame}
            sorts={interestListObj.sorts}
          />
        )}
      </Row>
      <RegisteredPlayersModal
        visible={visibleRegisteredPlayers}
        setVisible={setVisibleRegisteredPlayers}
        interestListId={currentInterestListId}
      />
      <MessagesModal
        visible={showMessageModal}
        setVisible={hideMessage}
        entityId={currentInterestListId}
        entityType="INTEREST_LIST"
      />
      <InterestListCreationModal
        visible={visibleInterestedListCreation}
        setVisible={setVisibleInterestedListCreation}
      />
      <StartingInterestListModal
        visible={visibleStartingInterestedList}
        setVisible={setVisibleStartingInterestedList}
        interestListId={currentInterestListId}
      />
    </Card>
  );
};

export default LoadingContainer(['FETCH_INTEREST_LIST_LIST'])(
  React.memo(InterestListComp)
);
