import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { reset, submit } from 'redux-form';
import CommonConstants from '../../../../common/constants/CommonConstants';
import RenderCount from '../../../../common/performance/RenderCount';
import ModalCashGamesTitle from '../../../cashgames/components/ModalCashGamesTitle';
import { EntityType } from '../../models/MessagesModel';
import MessagesActions from '../../redux/MessagesRedux';
import AddMessageForm from '../form/AddMessageForm';
import MessagesList from '../MessagesList';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  entityId: string;
  entityType: EntityType;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// MessagesModal
const MessagesModal = ({
  visible,
  setVisible,
  entityId,
  entityType
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dispatch Submit Callback
  const dispatchSubmit = () =>
    dispatch(submit(CommonConstants.ADD_MESSAGE_FORM));

  // On Cancel Callback
  const onCancel = () => setVisible(false);

  // onSubmit form Callback
  const onSubmitForm = (data: any) => {
    dispatch(
      MessagesActions.addMessageRequest(entityId, entityType, data.message)
    );
    dispatch(reset(CommonConstants.ADD_MESSAGE_FORM));
    // // Waiting before scrollToBottom
    // // TODO Find Other Solution
    // setTimeout(() => scrollToBottom(), 500);
  };

  const title = (
    <ModalCashGamesTitle gameId={entityId} title={t('MESSAGES_HEADER')} />
  );

  return (
    <Modal
      destroyOnClose // Need to be One instance by Message Entity Id because there are only one form and on Submit method. USe callback is not possible, Maybe use different formName late
      visible={visible}
      title={title}
      centered
      onCancel={onCancel}
      okText="Send"
      footer={
        <Col>
          <AddMessageForm onSubmitForm={onSubmitForm} />
          <Row className="mt-2">
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={dispatchSubmit} type="primary">
              Send
            </Button>
          </Row>
        </Col>
      }
    >
      <RenderCount componentName="MessagesModal" />
      <MessagesList entityId={entityId} entityType={entityType} />
    </Modal>
  );
};

// Export Default
export default React.memo(MessagesModal);
