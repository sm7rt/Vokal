import { Col, Modal, Row } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import useDebounce from '../../../../../../common/hooks/useDebounce';
import RenderCount from '../../../../../../common/performance/RenderCount';
import PlayersList from '../../../../../players/component/PlayersList';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';
import { useRunningCashGames } from '../../hooks/RunningCashGamesHooks';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';
import AddPlayerCashGameForm from '../form/AddPlayerCashGameForm';
import PlayerCashGameItem from '../items/PlayerCashGameItem';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  gameId: string;
  tableId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// AddPlayerCashGameModal
const AddPlayerCashGameModal = ({
  visible,
  setVisible,
  gameId,
  tableId
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const game = useRunningCashGames(gameId);

  // Form Selector
  const formSelector = formValueSelector(
    RunningCashGamesConstants.ADD_PLAYER_FORM
  );

  // Player Name Selector
  const nameSelector = (state: any) => formSelector(state, 'name');

  const nameValue = useSelector(nameSelector);

  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(nameValue, 500);

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  useEffect(() => {
    debouncedSearchTerm &&
      dispatch(
        RunningCashGamesActions.searchPlayersRunningGameRequest(
          gameId,
          tableId,
          debouncedSearchTerm
        )
      );
  }, [gameId, tableId, debouncedSearchTerm, dispatch]);

  // Get Current Table
  const table = useMemo(
    () => game && game.tables && game.tables.find((t: any) => t.id === tableId),
    [game, tableId]
  );

  // On Submit Callback
  const onSubmit = useCallback(
    (data: any) => {
      // If there is a table Id, it's Add Player on Table, else it's Add Player on WL
      if (tableId) {
        // If table is not full, we sit this player
        if (table && table.players.length < table.maxPlayers) {
          dispatch(
            RunningCashGamesActions.addNewPlayerRequest(gameId, tableId, data)
          );
        } // else we put it on the waiting list
        else {
          dispatch(
            RunningCashGamesActions.addNewPlayerToWaitingListRequest(
              gameId,
              data
            )
          );
        }
      } else {
        // Trigger add player to Waiting List Request
        dispatch(
          RunningCashGamesActions.addNewPlayerToWaitingListRequest(gameId, data)
        );
      }
      dispatch(reset(RunningCashGamesConstants.ADD_PLAYER_FORM));
    },
    [dispatch, gameId, table, tableId]
  );

  // On Cancel Callback
  const onCancel = useCallback(() => {
    // Reset form
    dispatch(reset(RunningCashGamesConstants.ADD_PLAYER_FORM));
    setVisible(false);
  }, [dispatch, setVisible]);

  const renderItem = useCallback(
    (playerId: number) => (
      <PlayerCashGameItem
        gameId={gameId}
        tableId={tableId}
        playerId={playerId}
      />
    ),
    [gameId, tableId]
  );

  return (
    <Modal
      visible={visible}
      centered
      title={
        <ModalCashGamesTitle
          gameId={gameId}
          running
          tableId={table && table.tableId}
          title={t('ADD_NEW_PLAYER_HEADER')}
        />
      }
      onCancel={onCancel}
      footer={null}
      zIndex={10000}
    >
      <RenderCount componentName="AddPlayerCashGameModal" />
      <Col className="p-2">
        <AddPlayerCashGameForm
          onSubmit={onSubmit}
          textButton={
            table && table.players.length < table.maxPlayers
              ? 'Sit'
              : 'Add to WL'
          }
        />

        {/* Flop User List */}
        {nameValue && (
          <Row className="mt-4">
            <PlayersList renderItem={renderItem} />
          </Row>
        )}
      </Col>
    </Modal>
  );
};

// Export Default
export default React.memo(AddPlayerCashGameModal);
