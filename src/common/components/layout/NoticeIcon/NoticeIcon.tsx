import { Badge, Icon } from 'antd';
import React, { useState, useEffect } from 'react';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
import styles from './NoticeIcon.module.less';
import NotificationsList from '../../../../features/notifications/components/NotificationsList';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsActions, {
  notificationsSelector
} from '../../../../features/notifications/redux/NotificationsRedux';
import RenderCount from '../../../performance/RenderCount';

export interface NoticeIconData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  key?: string | number;
  read?: boolean;
}

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
}

const NoticeIcon = (props: NoticeIconProps) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  /* eslint-disable */
  useEffect(() => {
    dispatch(NotificationsActions.countNotificationRequest());
  }, []);

  /* eslint-disable */
  useEffect(() => {
    dispatch(NotificationsActions.fetchNotificationsRequest({}, 1, 10));
  }, [visible]);

  const notifications = useSelector(notificationsSelector);

  const getNotificationBox = () => {
    return (
      <>
        <RenderCount componentName="NotificationBox" />
        <NotificationsList />
      </>
    );
  };

  const handleVisibleChange = (visible: boolean): void => {
    const { onPopupVisibleChange } = props;
    setVisible(visible);
    if (onPopupVisibleChange) {
      onPopupVisibleChange(visible);
    }
  };

  const { className, popupVisible, bell } = props;
  const noticeButtonClass = `${className} ${styles.noticeButton}`;
  const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
  const trigger = (
    <span className={`${noticeButtonClass} ${visible && 'opened'}`}>
      <Badge
        count={notifications.countUnread}
        style={{ boxShadow: 'none' }}
        className={styles.badge}
      >
        {NoticeBellIcon}
      </Badge>
    </span>
  );
  if (!notificationBox) {
    return trigger;
  }
  const popoverProps: {
    visible?: boolean;
  } = {};
  if ('popupVisible' in props) {
    popoverProps.visible = popupVisible;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={styles.popover}
      trigger={['click']}
      visible={visible}
      onVisibleChange={handleVisibleChange}
      {...popoverProps}
    >
      {trigger}
    </HeaderDropdown>
  );
};

NoticeIcon.defaultProps = {
  onPopupVisibleChange: (): void => {},
  loading: false,
  clearClose: false
};

export default React.memo(NoticeIcon);
