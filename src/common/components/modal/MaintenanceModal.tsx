import { Button, Icon, Modal, Row } from 'antd';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  getTimeRemaining,
  getTimeRemainingFromEnd
} from '../../redux/AvailabilityRedux';
import './MaintenanceModal.scss';
import { useTranslation } from 'react-i18next';

// MaintenanceContext
export const MaintenanceContext = React.createContext({});

/**
 * Maintenance Modal Component
 * @param param0
 */
const MaintenanceModal = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const timeRemaining = useSelector(getTimeRemaining);
  const timeRemainingFromEnd = useSelector(getTimeRemainingFromEnd);

  return (
    <Modal
      className="maintenance-modal"
      visible={visible}
      //   onOk={this.handleOk}
      //   onCancel={this.handleCancel}
      title={
        <Row
          type="flex"
          justify="center"
          align="middle"
          className="bg-danger p-2 flex-column "
        >
          <Icon
            type="info-circle"
            style={{ color: 'white', fontSize: '40px' }}
          />
          <span className="text-white mt-2">SERVER MAINTENANCE</span>
        </Row>
      }
      closable={false}
      footer={null}
    >
      <Row type="flex" justify="center" align="middle" className="flex-column ">
        <p>
          {t('MAINTENANCE_PLANIFIED_TEXT', {
            timeRemaining,
            timeRemainingFromEnd
          })
            .split('\n')
            .map((item: string, key: number) => {
              return (
                <Fragment key={key}>
                  {item}
                  <br />
                </Fragment>
              );
            })}
        </p>
        <Button onClick={onClose} className="mt-2">
          CLOSE
        </Button>
      </Row>
    </Modal>
  );
};

export default MaintenanceModal;
