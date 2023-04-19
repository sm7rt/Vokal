import { Avatar, Button, Empty, List, Row, Spin, Tooltip } from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingContainer } from '../../../common/components/container';
import { IRootState } from '../../../common/models/StateModel';
import RenderCount from '../../../common/performance/RenderCount';
import { createLoadingSelector } from '../../../common/redux/LoadingRedux';
import NotificationsActions, {
  notificationsSelector
} from '../redux/NotificationsRedux';
import NotificationMetData from './NotificationMetaData';
import './NotificationsList.scss';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {};

const NotificationsItemComp = (props: any) => {
  const dispatch = useDispatch();
  const { item, index } = props;
  const notificationMetaData = NotificationMetData.find(
    (n: any) => n.type === item.notificationType
  );

  const onReadNotification = () => {
    dispatch(NotificationsActions.readNotificationRequest(item.id));
    dispatch(NotificationsActions.clickNotification(item));
  };

  const onDismissNotification = e => {
    dispatch(NotificationsActions.dismissNotificationRequest(item.id));
    e.stopPropagation();
  };

  return (
    <List.Item
      key={index}
      onClick={onReadNotification}
      className={!item.read && 'unreaded'}
      extra={
        <Tooltip title="Hide this notification" placement="bottom">
          <Button
            className="delete-button"
            icon="delete"
            onClick={onDismissNotification}
          />
        </Tooltip>
      }
    >
      <RenderCount componentName={`NotificationItem-${item.id}`} />
      <List.Item.Meta
        avatar={
          <Avatar
            size={48}
            src={notificationMetaData && notificationMetaData.image}
          />
        }
        title={notificationMetaData && notificationMetaData.title}
        description={
          <Fragment>
            <p dangerouslySetInnerHTML={{ __html: item.message }} />
            <span className="datetime">
              {moment(item.creationDate).fromNow()}
            </span>
          </Fragment>
        }
      />
    </List.Item>
  );
};

const NotificationsItem = React.memo(NotificationsItemComp);

/**
 * Notifications List
 */
const NotificationsListComp = (props: Props) => {
  const dispatch = useDispatch();
  const notificationsObj = useSelector(notificationsSelector);

  const isFetchingNotifications = useSelector((state: IRootState) =>
    createLoadingSelector(['FETCH_NOTIFICATIONS'])(state.loading)
  );

  const handleInfiniteOnLoad = () => {
    dispatch(
      NotificationsActions.fetchNotificationsRequest(
        {},
        notificationsObj.page,
        10
      )
    );
  };

  const onDismissAllNotification = () =>
    dispatch(NotificationsActions.dismissAllNotificationRequest());

  /**
   * Render
   */
  return (
    <div className="d-flex flex-column justify-content-start align-items-center w-100">
      <RenderCount componentName="NotificationList" />
      <Row
        type="flex"
        justify="space-between"
        className="w-100 p-2 notification-header"
      >
        <span className="notification-header-text font-weight-bold">
          NOTIFICATIONS
        </span>
        <span
          onClick={onDismissAllNotification}
          className="notification-header-text text-decoration-underline cursor-pointer"
        >
          Clear all
        </span>
      </Row>
      <Row className="notification-list w-100">
        {notificationsObj.list.length === 0 ? (
          <Empty
            className="p-2"
            image="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            imageStyle={{
              height: 60
            }}
            description={<span>No notifications...</span>}
          />
        ) : (
          <InfiniteScroll
            className="w-100"
            initialLoad={false}
            pageStart={0}
            loadMore={handleInfiniteOnLoad}
            hasMore={
              !isFetchingNotifications &&
              notificationsObj &&
              !notificationsObj.last
            }
            useWindow={false}
            threshold={250}
          >
            <List
              className="w-100"
              dataSource={notificationsObj.list || []}
              renderItem={(item, index) => (
                <NotificationsItem item={item} index={index} />
              )}
            >
              {isFetchingNotifications && !notificationsObj.last && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        )}
      </Row>
    </div>
  );
};

export default LoadingContainer(['FETCH_NOTIFICATIONS'])(
  React.memo(NotificationsListComp)
);
