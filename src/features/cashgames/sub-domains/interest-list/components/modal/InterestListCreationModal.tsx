import { Modal } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { submit, reset } from 'redux-form';
import RenderCount from '../../../../../../common/performance/RenderCount';
import CashGamesConstants from '../../constants/InterestListConstants';
import InterestListCreationForm from '../form/InterestListCreationForm';
import InterestListActions from '../../redux/InterestListRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// InterestListCreationModal
const InterestListCreationModal = ({ visible, setVisible }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // On Submit Callback
  const onSubmit = (data: any) => {
    dispatch(InterestListActions.createInterestListRequest(data));
    dispatch(reset(CashGamesConstants.INTEREST_LIST_CREATION_FORM));
    setVisible(false);
  };

  // On Cancel Callback
  const onCancel = () => setVisible(false);

  // On OK Callback
  const onOk = () =>
    dispatch(submit(CashGamesConstants.INTEREST_LIST_CREATION_FORM));

  return (
    <Modal
      visible={visible}
      centered
      title={t('CREATE_NEW_INTEREST_LIST').toUpperCase()}
      onCancel={onCancel}
      onOk={onOk}
      okText={t('CREATE_BTN')}
    >
      <RenderCount componentName="InterestListCreationModal" />
      <InterestListCreationForm onSubmit={onSubmit} />
    </Modal>
  );
};

// Export Default
export default React.memo(InterestListCreationModal);
