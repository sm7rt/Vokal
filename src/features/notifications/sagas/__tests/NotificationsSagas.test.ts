import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import moment from 'moment';
import FixtureNotificationsApi from '../../services/FixtureNotificationsApi';
import NotificationsActions from '../../redux/NotificationsRedux';
import {
  fetchNotifications,
  countNotifications,
  dismissNotification,
  readNotification
} from '../NotificationsSagas';
import { ownerSelector } from '../../../authentication/redux/AuthenticationRedux';

const owner = {
  customerId: 1,
  id: 1058
};
// Testing Notifications Middleware Success
test('fetchNotifications Middleware Success', () => {
  const page = 1;
  const size = 20;
  const Response = {
    status: 200,
    data: {
      content: [
        {
          creationDate: '2015-12-31T23:00:00.000Z',
          entityId: '54654',
          entityType: 'GAME',
          id: '15454',
          message: 'You have a new player’s message',
          notificationType: 'GAME_MESSAGE',
          read: false,
          sourceId: 14,
          targetId: 12
        },
        {
          creationDate: '2015-12-31T23:00:00.000Z',
          entityId: '54654',
          entityType: 'GAME',
          id: '12154',
          message: 'A new game has been submitted',
          notificationType: 'GAME_SUBMITTED',
          read: false,
          sourceId: 14,
          targetId: 12
        }
      ],
      last: true,
      totalElements: 21
    }
  };

  return expectSaga(fetchNotifications, FixtureNotificationsApi, {
    filters: {},
    page,
    size
  })
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureNotificationsApi.fetchNotifications), Response]
    ])
    .put(
      NotificationsActions.fetchNotificationsSuccessResponse(
        Response.data.content,
        {},
        page,
        Response.data.last,
        21,
        size
      )
    )

    .run();
});

// Testing Count Notifications Middleware Success
test('countNotifications Middleware Success', () => {
  const Response = {
    status: 200,
    data: 3
  };

  return expectSaga(countNotifications, FixtureNotificationsApi)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureNotificationsApi.countNotifications), Response]
    ])
    .put(NotificationsActions.countNotificationSuccessResponse(Response.data))

    .run();
});

// Testing Dismiss Notification Middleware Success
test('dismissNotification Middleware Success', () => {
  const Response = {
    status: 204
  };

  const notificationId = '23423';

  return expectSaga(dismissNotification, FixtureNotificationsApi, {
    notificationId
  })
    .provide([
      [matchers.call.fn(FixtureNotificationsApi.dismissNotification), Response]
    ])
    .put(
      NotificationsActions.dismissNotificationSuccessResponse(notificationId)
    )

    .run();
});

// Testing Read Notification Middleware Success
test('readNotification Middleware Success', () => {
  const Response = {
    status: 204
  };

  const notificationId = '23423';

  return expectSaga(readNotification, FixtureNotificationsApi, {
    notificationId
  })
    .provide([
      [matchers.call.fn(FixtureNotificationsApi.readNotification), Response]
    ])
    .put(NotificationsActions.readNotificationSuccessResponse(notificationId))

    .run();
});
