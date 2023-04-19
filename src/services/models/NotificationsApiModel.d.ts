declare namespace NotificationsApiDefinitions {
  namespace AddDeviceTokenUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CountPaginatedNotificationsUsingGET {
    namespace Responses {
      export type $200 = number; // int64
    }
  }
  namespace DeleteDeviceTokenUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace DismissNotificationUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace FindPaginatedNotificationsUsingGET {
    namespace Responses {
      export type $200 = NotificationsApiDefinitions.PageNotificationMessageDTO_;
    }
  }
  namespace GetAllProfilesWithoutDeviceTokenUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * NotificationMessageDTO
   */
  export interface NotificationMessageDTO {
    creationDate?: string; // date-time
    entityId?: string;
    entityType?: 'POST' | 'FRIEND_REQUEST' | 'GAME';
    id?: string;
    message?: string;
    notificationType?:
      | 'SEND_FRIEND_REQUEST'
      | 'CONFIRM_FRIEND_REQUEST'
      | 'DECLINE_FRIEND_REQUEST'
      | 'CANCEL_FRIEND_REQUEST'
      | 'TAG_IN_POST'
      | 'POST_COMMENTED'
      | 'POST_COMMENT_DELETED'
      | 'GAME_COMMENTED'
      | 'GAME_COMMENT_DELETED'
      | 'POST_REPOSTED'
      | 'POST_REACTED'
      | 'POST_UNREACTED'
      | 'POST_DELETED'
      | 'GAME_INVITATION_SENT'
      | 'GAME_JOINED'
      | 'GAME_QUITED'
      | 'GAME_MODIFIED';
    read?: boolean;
    sourceId?: number /* int64 */[];
    targetId?: number; // int64
  }
  /**
   * Page«NotificationMessageDTO»
   */
  export interface PageNotificationMessageDTO_ {
    content?: NotificationsApiDefinitions.NotificationMessageDTO[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: NotificationsApiDefinitions.Pageable;
    size?: number; // int32
    sort?: NotificationsApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Pageable
   */
  export interface Pageable {
    offset?: number; // int64
    pageNumber?: number; // int32
    pageSize?: number; // int32
    paged?: boolean;
    sort?: NotificationsApiDefinitions.Sort;
    unpaged?: boolean;
  }
  namespace ReadNotificationUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace SendMassivePushNotificationsUsingPOST {
    export interface BodyParameters {
      message?: NotificationsApiDefinitions.SendMassivePushNotificationsUsingPOST.Parameters.Message;
      url?: NotificationsApiDefinitions.SendMassivePushNotificationsUsingPOST.Parameters.Url;
    }
    namespace Parameters {
      export type Message = string;
      export type Url = string;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * Sort
   */
  export interface Sort {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
  }
  namespace VersionUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
}
