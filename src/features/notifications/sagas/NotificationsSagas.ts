import { AnyAction } from 'redux';
import {
  call,
  delay,
  put,
  select,
  cancel,
  take,
  fork,
  cancelled
} from 'redux-saga/effects';
import { NotificationsServiceType } from '../models/NotificationModels';
import NotificationsActions, {
  NotificationsTypes
} from '../redux/NotificationsRedux';
import { ownerSelector } from '../../authentication/redux/AuthenticationRedux';
import MessagesAction from '../../../common/redux/SystemMessagesRedux';
import LayoutCashGamesActions from '../../cashgames/redux/LayoutCashGamesRedux';
import InterestListActions, {
  interestListFromListSelector
} from '../../cashgames/sub-domains/interest-list/redux/InterestListRedux';
// import RunningCashGamesActions from '../../cashgames/sub-domains/running-games/redux/RunningCashGamesRedux';
import i18n from '../../../i18n';
import { push } from 'connected-react-router';
import NotificationConstants from '../constants/NotificationConstants';

/**
 * fetchNotifications Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchNotifications(
  api: NotificationsServiceType,
  action: AnyAction
) {
  try {
    const { page, size } = action;
    // Get Customer Account Id
    const owner = yield select(ownerSelector);

    const fetchNotificationsData = yield call(
      api.fetchNotifications,
      owner.id,
      'GAME',
      page,
      size
    );

    if (fetchNotificationsData.status === 200) {
      // Authentication Success
      yield put(
        NotificationsActions.fetchNotificationsSuccessResponse(
          fetchNotificationsData.data.content,
          {}, // No filters
          page,
          fetchNotificationsData.data.last,
          fetchNotificationsData.data.totalElements,
          size
        )
      );
    } else {
      // Manage Error
      yield put(NotificationsActions.fetchNotificationsFailureResponse());
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(NotificationsActions.fetchNotificationsCancelResponse());
    }
  }
}

/**
 * dismissNotification Middleware
 * @param {*} api
 * @param {*} action
 */
export function* dismissNotification(
  api: NotificationsServiceType,
  action: AnyAction
) {
  const { notificationId } = action;
  const dismissedResponse = yield call(api.dismissNotification, notificationId);

  if (dismissedResponse.status === 204) {
    // Authentication Success
    yield put(
      NotificationsActions.dismissNotificationSuccessResponse(notificationId)
    );
  } else {
    // Manage Error
    yield put(
      NotificationsActions.dismissNotificationFailureResponse(notificationId)
    );

    yield put(
      MessagesAction.addMessage(
        'DISMISS_NOTIFICATION_ERROR',
        'ERROR',
        i18n.t('DISMISS_NOTIFICATION_ERROR'),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * dismiss all Notification Middleware
 * @param {*} api
 * @param {*} action
 */
export function* dismissAllNotification(
  api: NotificationsServiceType,
  action: AnyAction
) {
  const dismissedResponse = yield call(api.dismissAllNotification);

  if (dismissedResponse.status === 204) {
    // Authentication Success
    yield put(NotificationsActions.dismissAllNotificationSuccessResponse());
  } else {
    // Manage Error
    yield put(NotificationsActions.dismissAllNotificationFailureResponse());

    yield put(
      MessagesAction.addMessage(
        'DISMISS_NOTIFICATION_ERROR',
        'ERROR',
        i18n.t('DISMISS_NOTIFICATION_ERROR'),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Read Notification Middleware
 * @param {*} api
 * @param {*} action
 */
export function* readNotification(
  api: NotificationsServiceType,
  action: AnyAction
) {
  const { notificationId } = action;
  const readRequest = yield call(api.readNotification, notificationId);

  if (readRequest.status === 204) {
    // Authentication Success
    yield put(
      NotificationsActions.readNotificationSuccessResponse(notificationId)
    );
  } else {
    // Manage Error
    yield put(
      NotificationsActions.readNotificationFailureResponse(notificationId)
    );

    yield put(
      MessagesAction.addMessage(
        'READ_NOTIFICATION_ERROR',
        'ERROR',
        i18n.t('READ_NOTIFICATION_ERROR'),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Count notifications Middleware
 * @param {*} api
 * @param {*} action
 */
export function* countNotificationsPulling(
  api: NotificationsServiceType,
  action: AnyAction
) {
  try {
    while (true) {
      // Get Customer Account Id
      const owner = yield select(ownerSelector);
      // If Owner Logout we stop the pulling
      if (!owner) {
        yield put(NotificationsActions.cancelNotificationsPulling());
      }
      const countRequest = yield call(api.countNotifications, owner.id, 'GAME');

      if (countRequest.status === 200) {
        // Authentication Success
        yield put(
          NotificationsActions.countNotificationSuccessResponse(
            countRequest.data
          )
        );
      } else {
        // Manage Error
        NotificationsActions.countNotificationFailureResponse();
      }
      // Every 5 sec, we relaunch the redux action
      yield delay(5000);
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(NotificationsActions.countNotificationCancelResponse());
    }
  }
}

export function* countNotifications(
  api: NotificationsServiceType,
  action: AnyAction
) {
  // starts the task in the background
  const countNotificationPullingTask = yield fork(
    countNotificationsPulling,
    api,
    action
  );

  // wait for a cancel actions
  yield take(NotificationsTypes.CANCEL_NOTIFICATIONS_PULLING);

  // Cancel the task
  yield cancel(countNotificationPullingTask);
}

/**
 * Handle Notification Click Middleware
 * @param {*} api
 * @param {*} action
 */
export function* handleNotificationClick(
  api: NotificationsServiceType,
  action: AnyAction
) {
  const { notification } = action;

  // If Notification Type === NEW_GAME_REQUEST
  if (
    notification.notificationType === NotificationConstants.NEW_GAME_REQUEST
  ) {
    // Change Tab if needed
    yield put(LayoutCashGamesActions.changeTab('interest'));

    // Show Flop Games
    yield put(
      InterestListActions.updateInterestListFilters('gameOrigin', 'FLOP_USER')
    );

    // Show Only Pending Games
    yield put(
      InterestListActions.updateInterestListFilters('gameStates', ['PENDING'])
    );

    // We Redirect on Upcoming Page
    yield put(push('/admin/cashgames'));

    // We HighLight the interest list
    yield put(
      InterestListActions.setCurrentInterestListId(notification.entityId)
    );
  }

  // If Notification Type === GAME_NEW_MESSAGE_FROM_PLAYER
  else if (
    notification.notificationType ===
    NotificationConstants.GAME_NEW_MESSAGE_FROM_PLAYER
  ) {
    // Change Tab if needed
    yield put(LayoutCashGamesActions.changeTab('interest'));

    // We Launch the action to fetch the interest list
    yield put(
      InterestListActions.launchFetchInterestList(notification.entityId)
    );

    // WAIT FOR INTEREST_LIST SUCCESS RESPONSE
    yield take('FETCH_INTEREST_LIST_SUCCESS_RESPONSE');

    // SELECT CURRENT INTEREST LIST
    const currentInterestList = yield select(
      interestListFromListSelector(),
      notification.entityId
    );

    // SEE GAME TYPE AND ADAPT FILTERS
    // Show Flop Games
    yield put(
      InterestListActions.updateInterestListFilters(
        'gameOrigin',
        currentInterestList.gameOrigin
      )
    );

    // Show Pending / ACCEPTED Games
    yield put(
      InterestListActions.updateInterestListFilters('gameStates', [
        currentInterestList.state
      ])
    );

    // We Redirect on Upcoming Page
    yield put(push('/admin/cashgames'));

    // We HighLight the interest list
    yield put(
      InterestListActions.setCurrentInterestListId(notification.entityId)
    );

    // We Open Message Modal
    yield put(InterestListActions.toggleMessageModal(true));
  }
  // If Notification Type === GAME_REQUEST_SENT
  else if (
    notification.notificationType === NotificationConstants.GAME_REQUEST_SENT
  ) {
    // Change Tab if needed
    yield put(LayoutCashGamesActions.changeTab('running'));

    // We Redirect on Upcoming Page
    yield put(push('/admin/cashgames'));

    // We Expand the Running Game
    // ???

    // We HighLight the running game
    // ??

    // const tableId = notification.entityId;

    // Get Table Info
    // console.log('TABLEID', tableId);

    // Set Current Game
    // yield put(
    //   RunningCashGamesActions.setCurrentGameAndTableId(gameId, tableId)
    // );

    // Open Join Seat Request Modal
    // yield put(RunningCashGamesActions.toggleJoinSeatRequestModal(true));
  }
}
