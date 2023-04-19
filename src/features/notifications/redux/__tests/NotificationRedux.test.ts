import Actions, { reducer, INITIAL_STATE } from '../NotificationsRedux';
import Immutable from 'seamless-immutable';

// Test on Fetch Notifications Messages Redux
test('success Fetch Notifications Messages', () => {
  const data = [
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
  ];
  const page = 1;
  const last = false;
  const size = 10;
  const totalElements = 2;
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchNotificationsSuccessResponse(
      data,
      {},
      page,
      last,
      totalElements,
      size
    )
  );
  // They have to have the sames values
  expect(state.list).toEqual(data);
  expect(state.page).toEqual(2);
  expect(state.last).toEqual(false);
  expect(state.size).toEqual(size);
  expect(state.totalElements).toEqual(totalElements);
});

// Test on Count Notification Redux
test('success Count Notification', () => {
  const count = 2;
  const state = reducer(
    INITIAL_STATE,
    Actions.countNotificationSuccessResponse(count)
  );
  // They have to have the sames values
  expect(state.countUnread).toEqual(count);
});

const INITIAL_STATE_TEST = Immutable({
  list: [
    {
      creationDate: '2015-12-31T23:00:00.000Z',
      entityId: '54654',
      entityType: 'GAME',
      id: '20343',
      message: 'You have a new player’s message',
      notificationType: 'GAME_MESSAGE',
      read: false,
      sourceId: 14,
      targetId: 12
    }
  ]
});

// Test on Dismiss Notification Redux
test('success Dismiss Notification', () => {
  const notificationId = '20343';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.dismissNotificationSuccessResponse(notificationId)
  );
  // They have to have the sames values
  expect(state.list.length).toEqual(0);
});

// Test on Read Notification Redux
test('success Read Notification', () => {
  const notificationId = '20343';
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.readNotificationSuccessResponse(notificationId)
  );
  // They have to have the sames values
  expect(state.list[0].read).toEqual(true);
});
