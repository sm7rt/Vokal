import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reset, submit } from 'redux-form';
import RenderCount from '../../../../../../common/performance/RenderCount';
import InterestListConstants from '../../constants/InterestListConstants';
import InterestListActions, {
  registeredPlayersListSelector
} from '../../redux/InterestListRedux';
import StartingInterestListForm from '../form/StartingInterestListForm';
import ModalCashGamesTitle from '../../../../components/ModalCashGamesTitle';
import { IRootState } from '../../../../../../common/models/StateModel';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  interestListId: string;
};

// StartingInterestListModal
const StartingInterestListModal = ({
  visible,
  setVisible,
  interestListId
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Array to store all seated players
  const [seatedPlayers, setSeatedPlayers] = useState([]);

  // Reset Seated Player when modal Show / Hide
  useEffect(() => {
    setSeatedPlayers([]);
  }, [visible]);

  // Get Current Available Players
  const registeredPlayersList = useSelector((state: IRootState) =>
    registeredPlayersListSelector(state, interestListId)
  );

  // Get Available Players List
  const availablePlayersList = registeredPlayersList.filter(
    (playerId: number) => !seatedPlayers.includes(playerId)
  );

  /* eslint-disable */
  useEffect(() => {
    interestListId &&
      dispatch(
        InterestListActions.fetchRegisteredPlayersRequest(interestListId)
      );
  }, [interestListId]);

  // onCancel Callback
  const onCancel = () => {
    setVisible(false);
    dispatch(reset(InterestListConstants.STARTING_INTEREST_LIST_FORM));
  };

  // onOk Callback
  const onOk = () =>
    dispatch(submit(InterestListConstants.STARTING_INTEREST_LIST_FORM));

  // On SUbmit Form Callback
  const onSubmitForm = (data: any) => {
    dispatch(
      InterestListActions.startInterestListRequest(
        interestListId,
        data,
        availablePlayersList
      )
    );
    dispatch(reset(InterestListConstants.STARTING_INTEREST_LIST_FORM));
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      destroyOnClose
      centered
      title={
        <ModalCashGamesTitle
          gameId={interestListId}
          title={t('STARTING_INTEREST_LIST')}
        />
      }
      onCancel={onCancel}
      onOk={onOk}
      okText={t('START_BUTTON')}
      okButtonProps={{ id: 'startGameButton' }}
    >
      <RenderCount componentName="StartingInterestListModal" />
      <StartingInterestListForm
        onSubmit={onSubmitForm}
        initialValues={{
          tables: [
            {
              tableId: 1,
              maxPlayers: 10,
              players: []
            }
          ]
        }}
        seatedPlayers={seatedPlayers}
        setSeatedPlayers={setSeatedPlayers}
        gameId={interestListId}
      />
    </Modal>
  );
};

// Export Default
export default React.memo(StartingInterestListModal);
