declare namespace ProfileApiDefinitions {
  namespace CanInviteUserUsingGET {
    namespace Responses {
      export type $200 = boolean;
    }
  }
  namespace CanSeePostsUsingGET {
    namespace Responses {
      export type $200 = boolean;
    }
  }
  namespace CanSeeProfileDetailsUsingGET {
    namespace Responses {
      export type $200 = boolean;
    }
  }
  namespace DeleteDatasUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetByIdUsingGET {
    namespace Responses {
      export type $200 = ProfileApiDefinitions.ProfileDTO;
    }
  }
  namespace GetNotificationsSettingsUsingGET {
    namespace Responses {
      export type $200 = ProfileApiDefinitions.NotificationSettings;
    }
  }
  namespace GetSettingsUsingGET {
    namespace Responses {
      export type $200 = ProfileApiDefinitions.PrivacySettings;
    }
  }
  /**
   * Iterable«Profile»
   */
  export interface IterableProfile_ {}
  /**
   * NotificationSettings
   */
  export interface NotificationSettings {
    accountId?: number; // int64
    claps?: boolean;
    comments?: boolean;
    creationDate?: string; // date-time
    crewRequest?: boolean;
    id?: number; // int64
    modificationDate?: string; // date-time
    shares?: boolean;
  }
  /**
   * PrivacySettings
   */
  export interface PrivacySettings {
    accountId?: number; // int64
    canInvite?:
      | 'EVERYONE'
      | 'MY_FRIENDS_AND_THEIR_FRIENDS'
      | 'ONLY_MY_FRIENDS'
      | 'ONLY_ME';
    creationDate?: string; // date-time
    id?: number; // int64
    modificationDate?: string; // date-time
    seePost?:
      | 'EVERYONE'
      | 'MY_FRIENDS_AND_THEIR_FRIENDS'
      | 'ONLY_MY_FRIENDS'
      | 'ONLY_ME';
    seeProfileDetails?:
      | 'EVERYONE'
      | 'MY_FRIENDS_AND_THEIR_FRIENDS'
      | 'ONLY_MY_FRIENDS'
      | 'ONLY_ME';
  }
  /**
   * Profile
   */
  export interface Profile {
    additionalCurrencies?: string[];
    birthDate?: string; // date
    casinos?: string[];
    cities?: string[];
    city?: string;
    countries?: string[];
    country?: string;
    countryCode?: string;
    creationDate?: string; // date-time
    emailAddress?: string;
    firstName?: string;
    gameSizes?: string[];
    gameVariants?: string[];
    gender?: string;
    id?: number; // int64
    lastName?: string;
    mainCurrency?: string;
    mediaPreferences?: string[];
    modificationDate?: string; // date-time
    phoneNumber?: string;
    secondName?: string;
    userName?: string;
    zones?: string[];
  }
  /**
   * ProfileDTO
   */
  export interface ProfileDTO {
    additionalCurrencies?: string[];
    age?: number; // int32
    birthDate?: string; // date
    casinos?: string[];
    cities?: string[];
    city?: string;
    countries?: string[];
    country?: string;
    countryCode?: string;
    emailAddress?: string;
    firstName?: string;
    gameSizes?: string[];
    gameVariants?: string[];
    gender?: string;
    lastName?: string;
    mainCurrency?: string;
    mediaPreferences?: string[];
    phoneNumber?: string;
    secondName?: string;
    userName?: string;
    zones?: string[];
  }
  namespace SaveNotificationsSettingsUsingPUT {
    export interface BodyParameters {
      settingsDTO?: ProfileApiDefinitions.SaveNotificationsSettingsUsingPUT.Parameters.SettingsDTO;
    }
    namespace Parameters {
      export type SettingsDTO = ProfileApiDefinitions.SettingsNotificationUpdateDto;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace SaveSettingsUsingPUT {
    export interface BodyParameters {
      settingsDTO?: ProfileApiDefinitions.SaveSettingsUsingPUT.Parameters.SettingsDTO;
    }
    namespace Parameters {
      export type SettingsDTO = ProfileApiDefinitions.SettingsPrivacyUpdateDto;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace SearchUsingGET {
    namespace Responses {
      export type $200 = ProfileApiDefinitions.IterableProfile_;
    }
  }
  /**
   * SettingsNotificationUpdateDto
   */
  export interface SettingsNotificationUpdateDto {
    claps?: boolean;
    comments?: boolean;
    crewRequest?: boolean;
    shares?: boolean;
  }
  /**
   * SettingsPrivacyUpdateDto
   */
  export interface SettingsPrivacyUpdateDto {
    canInvite?:
      | 'EVERYONE'
      | 'MY_FRIENDS_AND_THEIR_FRIENDS'
      | 'ONLY_MY_FRIENDS'
      | 'ONLY_ME';
    seePost?:
      | 'EVERYONE'
      | 'MY_FRIENDS_AND_THEIR_FRIENDS'
      | 'ONLY_MY_FRIENDS'
      | 'ONLY_ME';
    seeProfileDetails?:
      | 'EVERYONE'
      | 'MY_FRIENDS_AND_THEIR_FRIENDS'
      | 'ONLY_MY_FRIENDS'
      | 'ONLY_ME';
  }
  namespace UpdateAccountUsingPUT {
    export interface BodyParameters {
      profile: ProfileApiDefinitions.UpdateAccountUsingPUT.Parameters.Profile;
    }
    namespace Parameters {
      export type Profile = ProfileApiDefinitions.ProfileDTO;
    }
    namespace Responses {
      export type $200 = ProfileApiDefinitions.Profile;
    }
  }
  namespace VersionUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
}
