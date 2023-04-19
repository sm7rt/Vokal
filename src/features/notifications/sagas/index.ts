import { takeLatest, takeEvery } from 'redux-saga/effects';
import DebugConfig from '../../../config/DebugConfig';

/* ------------- Types ------------- */
import { NotificationsTypes } from '../redux/NotificationsRedux';
import FixtureNotificationsApi from '../services/FixtureNotificationsApi';
import NotificationsApi from '../services/NotificationsApi';
import {
  fetchNotifications,
  countNotifications,
  dismissNotification,
  readNotification,
  handleNotificationClick,
  dismissAllNotification
} from './NotificationsSagas';

/* ------------- Sagas ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures
  ? FixtureNotificationsApi
  : NotificationsApi.create();

// List of Sagas Handler
const notificationsSagas = [
  takeLatest(
    NotificationsTypes.FETCH_NOTIFICATIONS_REQUEST,
    fetchNotifications,
    api
  ),
  takeLatest(
    NotificationsTypes.COUNT_NOTIFICATION_REQUEST,
    countNotifications,
    api
  ),
  takeLatest(
    NotificationsTypes.DISMISS_NOTIFICATION_REQUEST,
    dismissNotification,
    api
  ),
  takeLatest(
    NotificationsTypes.DISMISS_ALL_NOTIFICATION_REQUEST,
    dismissAllNotification,
    api
  ),
  takeLatest(
    NotificationsTypes.READ_NOTIFICATION_REQUEST,
    readNotification,
    api
  ),
  takeEvery(NotificationsTypes.CLICK_NOTIFICATION, handleNotificationClick, api)
];

// Export Default
export default notificationsSagas;
