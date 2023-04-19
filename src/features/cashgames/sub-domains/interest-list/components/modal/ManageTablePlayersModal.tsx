import { Button, Modal, Row, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import { IRootState } from '../../../../../../common/models/StateModel';
import RenderCount from '../../../../../../common/performance/RenderCount';
import PlayersTransfert from '../../../../components/PlayersTransfert';
import InterestListConstants from '../../constants/InterestListConstants';
import { registeredPlayersListSelector } from '../../redux/InterestListRedux';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import SeatedPlayerItem from '../../../running-games/components/items/SeatedPlayerItem';
import PlayerItem from '../../../../../players/component/PlayerItem';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  tableIndex: number;
  gameId: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  seatedPlayers: Array<string>; // List of players Ids who already seated
  setSeatedPlayers: (playerIds: Array<string>) => void; // Update Seated Players
};

// Form Selector
const formSelector = formValueSelector(
  InterestListConstants.STARTING_INTEREST_LIST_FORM
);

// ManageTablePlayersModal
const ManageTablePlayersModal = ({
  visible,
  setVisible,
  tableIndex,
  gameId,
  seatedPlayers,
  setSeatedPlayers
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Get Current Table
  const tables = useSelector((state: IRootState) =>
    formSelector(state, 'tables')
  );
  const table = tables[tableIndex];

  // Get Current Available Players
  const registeredPlayersList = useSelector((state: IRootState) =>
    registeredPlayersListSelector(state, gameId)
  );

  // Get Available Players List
  const availablePlayersList = registeredPlayersList.filter(
    (playerId: number) => !seatedPlayers.includes(playerId)
  );

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  // On Cancel Callback
  const onCancel = () => setVisible(false);

  // On Click Left Button Callback
  const onClickLeftButton = (item: GamesApiDefinitions.PlayerDTO) => {
    dispatch(
      change(
        InterestListConstants.STARTING_INTEREST_LIST_FORM,
        `tables[${tableIndex}].players`,
        table.players.filter((playerId: number) => playerId !== item.flopId)
      )
    );

    // Add Seated Players
    setSeatedPlayers(
      seatedPlayers.filter((playerId: number) => playerId !== item.flopId)
    );
  };

  // On Click Right Button Callback
  const onClickRightButton = (item: number) => {
    // Set Seated Players with redux form
    const tablePlayers = table.players ? [...table.players, item] : [item];
    dispatch(
      change(
        InterestListConstants.STARTING_INTEREST_LIST_FORM,
        `tables[${tableIndex}].players`,
        tablePlayers
      )
    );

    // Add Seated Players
    setSeatedPlayers([...seatedPlayers, item]);
  };

  // render Item Left
  const renderItemLeft = (playerId: number) =>
    playerId !== 0 ? (
      <SeatedPlayerItem
        player={{ flopId: playerId, requestState: 'SITTED' }}
        onConfirmDelete={onClickLeftButton}
        noConfirm
      />
    ) : (
      <SeatedPlayerItem />
    );

  // render item right
  const renderItemRight = (playerId: number) => (
    <Row
      type="flex"
      justify="space-between"
      className="align-items-center p-1 right-item"
    >
      <PlayerItem player={{ flopId: playerId }} avatarSize={48} noBorder />
      <Tooltip title={t('SIT_PLAYER')} placement="bottom">
        <Button
          icon="arrow-down"
          shape="circle"
          id={`sitPlayer-${playerId}`}
          className="mr-5 text-primary border-primary"
          disabled={
            table && table.players && table.players.length >= table.maxPlayers
          }
          onClick={() => {
            onClickRightButton(playerId);
          }}
        />
      </Tooltip>
    </Row>
  );

  return (
    <Modal
      visible={visible}
      destroyOnClose
      centered
      onCancel={onCancel}
      className="w-75 full-body-modal full-height-without-header-modal"
      footer={
        <div>
          <Button
            id="validatePlayersButton"
            type="primary"
            onClick={() => setVisible(false)}
          >
            OK
          </Button>
        </div>
      }
    >
      <RenderCount componentName="ManageTablePlayersModal" />
      <PlayersTransfert
        // titleListLeft={`${table && table.players ? table.players.length : 0} /
        // ${table && table.maxPlayers} Seated Players`}
        titleListLeft={
          <ModalCashGamesTitle
            gameId={gameId}
            title={t('PLAYERS').toUpperCase()}
            tableId={table && table.tableId}
          />
        }
        dataSourceLeft={table && table.players}
        renderItemLeft={renderItemLeft}
        // titleListRight={`${availablePlayersList.length} Available Players`}
        titleListRight={t('AVAILABLE_PLAYERS').toUpperCase()}
        dataSourceRight={availablePlayersList}
        renderItemRight={renderItemRight}
        emptyMessageRight="No Available Players"
        maxPlayers={table && table.maxPlayers}
      />
    </Modal>
  );
};

// Export Default
export default React.memo(ManageTablePlayersModal);
