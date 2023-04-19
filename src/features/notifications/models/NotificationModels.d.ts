import { ImmutableObject } from 'seamless-immutable';

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

type NotificationsStateType = {
  list?: Array<NotificationsApiDefinitions.NotificationMessageDTO>;
  page: number;
  size: number;
  last: boolean;
  totalElements: number;
  countUnread: number;
};

export type INotificationsImmutableStateType = ImmutableObject<
  NotificationsStateType
>;

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type NotificationsServiceType = {
  fetchNotifications: (
    userId: string,
    target: string,
    page: number,
    size: number
  ) => any;
  dismissNotification: (notificationId: number) => any;
  dismissAllNotification: () => any;
  readNotification: (notificationId: number) => any;
  countNotifications: (userId: string, target: string) => any;
};
