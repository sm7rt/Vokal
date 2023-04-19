import NotificationConstants from '../constants/NotificationConstants';

/* eslint-disable */

export const notificationsListResult = [
  {
    creationDate: '2015-12-31T23:00:00.000Z',
    entityId: '231478',
    entityType: 'GAME',
    id: '15454',
    message: 'Jean Valjean on NLH 1/2',
    notificationType: NotificationConstants.GAME_NEW_MESSAGE_FROM_PLAYER,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-12-31T23:00:00.000Z',
    entityId: '546978',
    entityType: 'GAME',
    id: '12154',
    message: 'NLH 1/2 by Antoine Dupond',
    notificationType: NotificationConstants.NEW_GAME_REQUEST,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-12-27T23:00:00.000Z',
    entityId: '45654465',
    entityType: 'GAME',
    id: '12454',
    message: 'NLH 1/2 by Jean Valjean',
    notificationType: NotificationConstants.GAME_REQUEST_SENT,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-12-21T23:00:00.000Z',
    entityId: '231478',
    entityType: 'GAME',
    id: '15214',
    message: 'Etienne Gerard on NLH 5/10',
    notificationType: NotificationConstants.GAME_NEW_MESSAGE_FROM_PLAYER,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-11-21T23:00:00.000Z',
    entityId: '546978',
    entityType: 'GAME',
    id: '12121',
    message: 'PLO 100/200 by Pierrot',
    notificationType: NotificationConstants.NEW_GAME_REQUEST,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-11-12T23:00:00.000Z',
    entityId: '54654',
    entityType: 'GAME',
    id: '15422',
    message: "Coco L'asticot on NLH 5/10",
    notificationType: NotificationConstants.GAME_NEW_MESSAGE_FROM_PLAYER,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-10-21T23:00:00.000Z',
    entityId: '54654',
    entityType: 'GAME',
    id: '123231',
    message: 'PLO 100/200 by Pierrot',
    notificationType: NotificationConstants.NEW_GAME_REQUEST,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-10-12T23:00:00.000Z',
    entityId: '54654',
    entityType: 'GAME',
    id: '124324',
    message: "Coco L'asticot on NLH 5/10",
    notificationType: NotificationConstants.GAME_NEW_MESSAGE_FROM_PLAYER,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-11-21T23:00:00.000Z',
    entityId: '54654',
    entityType: 'GAME',
    id: '32121',
    message: 'PLO 100/200 by Pierrot',
    notificationType: NotificationConstants.NEW_GAME_REQUEST,
    read: false,
    sourceId: 14,
    targetId: 12
  },
  {
    creationDate: '2015-11-12T23:00:00.000Z',
    entityId: '54654',
    entityType: 'GAME',
    id: '45422',
    message: "Coco L'asticot on NLH 5/10",
    notificationType: NotificationConstants.GAME_NEW_MESSAGE_FROM_PLAYER,
    read: false,
    sourceId: 14,
    targetId: 12
  }
];

// Export All Notifications Fixture API
export default {
  /**
   * Fetch Notifications Method
   * @param {*} userId : Id of the logged user
   * @param {*} target : notification type
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  fetchNotifications: (
    userId: string,
    target: string,
    page: number,
    size: number
  ) => {
    return {
      status: 200,
      data: {
        content: notificationsListResult,
        page,
        last: page === 2 ? true : false,
        totalElements: 20
      }
    };
  },

  dismissNotification: (notificationId: number) => {
    return {
      status: 204
    };
  },

  dismissAllNotification: () => {
    return {
      status: 204
    };
  },

  readNotification: (notificationId: number) => {
    return {
      status: 204
    };
  },
  countNotifications: (userId: string, target: string) => {
    return {
      status: 200,
      data: 2
    };
  }
};
