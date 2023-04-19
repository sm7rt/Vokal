import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import { Modal } from 'antd';
import InviteUserForm from '../form/InviteUserForm';
import RenderCount from '../../../../common/performance/RenderCount';
import UsersConstants from '../../constants/UsersConstants';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  setVisible: (visible: boolean) => void;
  onSubmit: (data: any) => void;
  visible: boolean;
};

// InviteUserModal
const InviteUserModal = ({ setVisible, visible, onSubmit }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      centered
      title={t('USERS_INVITE_COLLABORATOR')}
      okText={t('SEND_BUTTON')}
      onOk={() => dispatch(submit(UsersConstants.FORM_INVITE_USER))}
      cancelText={t('CANCEL_BUTTON')}
    >
      <RenderCount componentName="InviteUserModal" />
      <InviteUserForm
        onSubmit={data => {
          onSubmit(data);
          setVisible(false);
        }}
      />
    </Modal>
  );
};

// Export Default
export default InviteUserModal;
