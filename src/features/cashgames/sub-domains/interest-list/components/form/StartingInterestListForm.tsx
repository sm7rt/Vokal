import React, { useState, Fragment } from 'react';
import { InjectedFormProps, reduxForm, Form } from 'redux-form';
import InterestListConstants from '../../constants/InterestListConstants';
import AddTableFieldArray, {
  TableForm
} from '../../../../components/form/TableFieldArray';
import RenderCount from '../../../../../../common/performance/RenderCount';
import { LoadingContainer } from '../../../../../../common/components/container';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../../../common/models/StateModel';
import { registeredPlayersListSelector } from '../../redux/InterestListRedux';
import { Row, Button } from 'antd';
import ManageTablePlayersModal from '../modal/ManageTablePlayersModal';
import { useTranslation } from 'react-i18next';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type StartingInterestListProps = {
  seatedPlayers: Array<string>; // List of players Ids who already seated
  setSeatedPlayers: (playerIds: Array<string>) => void; // Update Seated Players
  gameId: string;
};

//* ******************** */
// FORM PROPS */
//* ******************** */
type StartingInterestListFormType = {};

// Global Props
type GlobalProps = InjectedFormProps<
  StartingInterestListFormType,
  StartingInterestListProps
> &
  StartingInterestListProps;

/**
 * Starting Interest List Component
 */
const StartingInterestListComp = ({
  gameId,
  seatedPlayers,
  setSeatedPlayers
}: GlobalProps) => {
  const { t } = useTranslation();
  const [tableIndex, setTableIndex] = useState();
  const [visibleManageTablePlayers, setVisibleManageTablePlayers] = useState(
    false
  );
  // Get Current Available Players
  const registeredPlayersList = useSelector((state: IRootState) =>
    registeredPlayersListSelector(state, gameId)
  );

  // Get Available Players List
  const availablePlayersList = registeredPlayersList.filter(
    (playerId: number) => !seatedPlayers.includes(playerId)
  );

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  /**
   * On Remove Table
   * @param tableId
   */
  const onRemoveTable = (table: TableForm) => {
    // Remove Seated Players
    setSeatedPlayers(
      seatedPlayers.filter(
        (playerId: number) => !table.players.includes(playerId)
      )
    );
  };

  const showManageTablePlayersModal = (index: number) => {
    setTableIndex(index);
    setVisibleManageTablePlayers(true);
  };

  /**
   * Additional Comp
   * @param table
   * @param index
   */
  const additionalComp = (table: TableForm, index: number) => (
    <Row type="flex" justify="space-between" className="align-items-center">
      <span>
        <strong>Players Seated:</strong>{' '}
        {table.players ? table.players.length : 0} /{table.maxPlayers}
      </span>
      <Button
        id={`managePlayer-${table.tableId}`}
        icon="usergroup-add"
        className="mt-2 mb-2 bg-secondary text-white border-secondary"
        onClick={() => showManageTablePlayersModal(index)}
      >
        {t('MANAGE_PLAYERS').toUpperCase()}
      </Button>
    </Row>
  );

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Fragment>
      <Form className="form d-flex flex-column flex-fill modal-overflow">
        <RenderCount componentName="StartingInterestListForm" />
        <Row
          type="flex"
          justify="space-between"
          className="mb-2 text-primary align-items-center"
        >
          <strong>AVAILABLE PLAYERS (WITH NO SEAT) : </strong>{' '}
          <span className="font20">{availablePlayersList.length}</span>
        </Row>
        <p className="mb-4">
          Please fill tables informations and put the present players on a
          table. Each player not seated to a table will be put on the waiting
          list.
        </p>
        <AddTableFieldArray
          formName={InterestListConstants.STARTING_INTEREST_LIST_FORM}
          onRemoveTable={onRemoveTable}
          additionalComp={additionalComp}
        />
      </Form>
      <ManageTablePlayersModal
        visible={visibleManageTablePlayers}
        setVisible={setVisibleManageTablePlayers}
        tableIndex={tableIndex}
        seatedPlayers={seatedPlayers}
        setSeatedPlayers={setSeatedPlayers}
        gameId={gameId}
      />
    </Fragment>
  );
};

// Create Redux form
const StartingInterestListForm = reduxForm<
  StartingInterestListFormType,
  StartingInterestListProps
>({
  form: InterestListConstants.STARTING_INTEREST_LIST_FORM
})(StartingInterestListComp);

// Export Default
export default LoadingContainer(['FETCH_REGISTERED_PLAYERS'])(
  React.memo(StartingInterestListForm)
);
