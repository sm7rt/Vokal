import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {
  generateFetchAction,
  generateFetchPageableAction
} from '../../../redux/util';
import { INotificationsImmutableStateType } from '../models/NotificationModels';
import { IRootState } from '../../../common/models/StateModel';
import { AnyAction } from 'redux';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ...generateFetchPageableAction('fetchNotifications'),
  ...generateFetchAction('dismissAllNotification', [], []),
  ...generateFetchAction(
    'dismissNotification',
    ['notificationId'],
    ['notificationId']
  ),
  ...generateFetchAction(
    'deleteNotification',
    ['notificationId'],
    ['notificationId']
  ),
  ...generateFetchAction(
    'readNotification',
    ['notificationId'],
    ['notificationId']
  ),
  clickNotification: ['notification'],
  ...generateFetchAction('countNotification', [], ['count']),
  cancelNotificationsPulling: []
});

export const NotificationsTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: INotificationsImmutableStateType = Immutable({
  list: [], // Contains all players in every screens : Home Page / Player profile / Tagged friends / Friends Lists / Comments etc...
  page: 1,
  size: 10,
  last: false,
  totalElements: 0,
  countUnread: 0
});

/* ------------- Reducers ------------- */

/**
 * Handle Notifications List Reducer
 */
export const handleNotificationsListReducer = (
  state: INotificationsImmutableStateType,
  action: AnyAction
) => {
  const { data, page, last, totalElements, size } = action;
  if (page === 1) {
    return state.merge({
      list: data,
      page: page + 1,
      last,
      size,
      totalElements
    });
  }
  return state.merge({
    list: state.list.concat(data),
    page: page + 1,
    last,
    size,
    totalElements
  });
};

/**
 * Handle Notifications List Reducer
 */
export const fillCountNotificationReducer = (
  state: INotificationsImmutableStateType,
  action: AnyAction
) => {
  const { count } = action;
  return state.setIn(['countUnread'], count);
};

/**
 * Read Notification Handler
 */
export const readNotificationHandler = (
  state: INotificationsImmutableStateType = INITIAL_STATE,
  { notificationId }: AnyAction
) => {
  const indexOfList = state.list.findIndex(
    (n: NotificationsApiDefinitions.NotificationMessageDTO) =>
      n.id === notificationId
  );
  return state.setIn(['list', indexOfList, 'read'], true);
};

/**
 * Dismiss Notification Handler
 */
export const dismissNotificationHandler = (
  state: INotificationsImmutableStateType = INITIAL_STATE,
  { notificationId }: AnyAction
) => {
  return state.setIn(
    ['list'],
    state.list.filter(
      (n: NotificationsApiDefinitions.NotificationMessageDTO) =>
        n.id !== notificationId
    )
  );
};

export const resetState = () => INITIAL_STATE;

/* ------------- Initial State ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  FETCH_NOTIFICATIONS_SUCCESS_RESPONSE: handleNotificationsListReducer,
  COUNT_NOTIFICATION_SUCCESS_RESPONSE: fillCountNotificationReducer,
  READ_NOTIFICATION_SUCCESS_RESPONSE: readNotificationHandler,
  DISMISS_NOTIFICATION_SUCCESS_RESPONSE: dismissNotificationHandler,
  DISMISS_ALL_NOTIFICATION_SUCCESS_RESPONSE: resetState
});

/* ------------- Selectors ------------- */

export const notificationsSelector = (state: IRootState) => state.notifications;
