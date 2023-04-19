import { api } from '../../../services/Api';
import NotificationsServicePath from './NotificationsServicePath';

// our "constructor"
const create = () => {
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  /**
   * Fetch Notifications Method
   * @param {*} userId : Id of the logged user
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  const fetchNotifications = (
    userId: string,
    target: string,
    page: number,
    size: number
  ): any =>
    api.get(
      NotificationsServicePath.FETCH_NOTIFICATIONS.replace(
        '{target}',
        target
      ).replace('{userId}', userId)
    );

  /**
   * Dismiss Notifications Method
   * @param {*} notificationId : The notification Id to dismiss
   */
  const dismissNotification = (notificationId: number): any =>
    api.put(
      NotificationsServicePath.DISMISS_NOTIFICATIONS.replace(
        '{notificationId}',
        notificationId
      )
    );

  /**
   * Dismiss All Notification
   * @param {*} userId : The account Id
   */
  const dismissAllNotification = (): any =>
    api.put(NotificationsServicePath.DISMISS_ALL_NOTIFICATIONS);

  /**
   * Dismiss Notifications Method
   * @param {*} notificationId : The notification Id to dismiss
   */
  const readNotification = (notificationId: number): any =>
    api.put(
      NotificationsServicePath.READ_NOTIFICATIONS.replace(
        '{notificationId}',
        notificationId
      )
    );

  /**
   * Count Notifications Method
   * @param {*} userId : Id of the logged user
   */
  const countNotifications = (userId: string, target: string): any =>
    api.get(
      NotificationsServicePath.COUNT_NOTIFICATIONS.replace(
        '{target}',
        target
      ).replace('{userId}', userId)
    );

  // ------
  // STEP 3
  // ------
  //

  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    fetchNotifications,
    dismissNotification,
    dismissAllNotification,
    readNotification,
    countNotifications
  };
};

// let's return back our create method as the default.
export default {
  create
};
