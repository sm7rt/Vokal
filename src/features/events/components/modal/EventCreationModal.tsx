import * as React from 'react';
import EventsConstants from '../../constants/EventsConstants';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import { Modal } from 'antd';
import EventCreationForm from '../form/EventCreationForm';
import RenderCount from '../../../../common/performance/RenderCount';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  setVisible: (visible: boolean) => void;
  onSubmit: (data: any) => void;
  visible: boolean;
  edition?: boolean;
  initialValues?: any;
};

// EventCreationModal
const EventCreationModal = ({
  setVisible,
  visible,
  onSubmit,
  edition,
  initialValues
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      centered
      title={!edition ? t('EVENT_CREATION_HEADER') : t('EDIT_EVENT_HEADER')}
      okText={!edition ? t('CREATE_BUTTON') : t('APPLY_BUTTON')}
      onOk={() => dispatch(submit(EventsConstants.FORM_EVENT_CREATION))}
      cancelText={t('CANCEL_BUTTON')}
    >
      <RenderCount componentName="EventCreationModal" />
      <EventCreationForm
        initialValues={initialValues}
        form={EventsConstants.FORM_EVENT_CREATION}
        onSubmit={data => {
          onSubmit(data);
          setVisible(false);
        }}
        edition={edition}
      />
    </Modal>
  );
};

// Export Default
export default EventCreationModal;
