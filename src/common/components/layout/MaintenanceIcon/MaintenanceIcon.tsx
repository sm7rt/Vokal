import { Button, Tooltip } from 'antd';
import React, { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getTimeRemaining } from '../../../redux/AvailabilityRedux';
import { MaintenanceContext } from '../../modal/MaintenanceModal';

/**
 * Maintenance Icon
 */
const MaintenanceIcon = () => {
  const { t } = useTranslation();
  const timeRemaining = useSelector(getTimeRemaining);
  // Use React Context Api to Access to setMaintenanceModalVisible method
  const setMaintenanceModalVisible = useContext(MaintenanceContext);

  const openModal = () => setMaintenanceModalVisible(true);

  if (!timeRemaining) {
    return null;
  }

  return (
    <Fragment>
      <Tooltip title={t('MAINTENANCE')}>
        <Button
          onClick={openModal}
          icon="warning"
          ghost
          style={{ color: 'orange', fontSize: '20px' }}
        />
      </Tooltip>
    </Fragment>
  );
};

export default MaintenanceIcon;
