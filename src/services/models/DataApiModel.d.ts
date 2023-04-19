declare namespace DataApiDefinitions {
  namespace AddingCasinoUsingPOST {
    export interface BodyParameters {
      casinoDto?: DataApiDefinitions.AddingCasinoUsingPOST.Parameters.CasinoDto;
    }
    namespace Parameters {
      export type CasinoDto = DataApiDefinitions.CasinoAddDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * ApiError
   */
  export interface ApiError {
    detailedMessage?: string;
    errorCode?: string;
    message?: string;
    status?:
      | '100 CONTINUE'
      | '101 SWITCHING_PROTOCOLS'
      | '102 PROCESSING'
      | '103 CHECKPOINT'
      | '200 OK'
      | '201 CREATED'
      | '202 ACCEPTED'
      | '203 NON_AUTHORITATIVE_INFORMATION'
      | '204 NO_CONTENT'
      | '205 RESET_CONTENT'
      | '206 PARTIAL_CONTENT'
      | '207 MULTI_STATUS'
      | '208 ALREADY_REPORTED'
      | '226 IM_USED'
      | '300 MULTIPLE_CHOICES'
      | '301 MOVED_PERMANENTLY'
      | '302 FOUND'
      | '302 MOVED_TEMPORARILY'
      | '303 SEE_OTHER'
      | '304 NOT_MODIFIED'
      | '305 USE_PROXY'
      | '307 TEMPORARY_REDIRECT'
      | '308 PERMANENT_REDIRECT'
      | '400 BAD_REQUEST'
      | '401 UNAUTHORIZED'
      | '402 PAYMENT_REQUIRED'
      | '403 FORBIDDEN'
      | '404 NOT_FOUND'
      | '405 METHOD_NOT_ALLOWED'
      | '406 NOT_ACCEPTABLE'
      | '407 PROXY_AUTHENTICATION_REQUIRED'
      | '408 REQUEST_TIMEOUT'
      | '409 CONFLICT'
      | '410 GONE'
      | '411 LENGTH_REQUIRED'
      | '412 PRECONDITION_FAILED'
      | '413 PAYLOAD_TOO_LARGE'
      | '413 REQUEST_ENTITY_TOO_LARGE'
      | '414 URI_TOO_LONG'
      | '414 REQUEST_URI_TOO_LONG'
      | '415 UNSUPPORTED_MEDIA_TYPE'
      | '416 REQUESTED_RANGE_NOT_SATISFIABLE'
      | '417 EXPECTATION_FAILED'
      | '418 I_AM_A_TEAPOT'
      | '419 INSUFFICIENT_SPACE_ON_RESOURCE'
      | '420 METHOD_FAILURE'
      | '421 DESTINATION_LOCKED'
      | '422 UNPROCESSABLE_ENTITY'
      | '423 LOCKED'
      | '424 FAILED_DEPENDENCY'
      | '426 UPGRADE_REQUIRED'
      | '428 PRECONDITION_REQUIRED'
      | '429 TOO_MANY_REQUESTS'
      | '431 REQUEST_HEADER_FIELDS_TOO_LARGE'
      | '451 UNAVAILABLE_FOR_LEGAL_REASONS'
      | '500 INTERNAL_SERVER_ERROR'
      | '501 NOT_IMPLEMENTED'
      | '502 BAD_GATEWAY'
      | '503 SERVICE_UNAVAILABLE'
      | '504 GATEWAY_TIMEOUT'
      | '505 HTTP_VERSION_NOT_SUPPORTED'
      | '506 VARIANT_ALSO_NEGOTIATES'
      | '507 INSUFFICIENT_STORAGE'
      | '508 LOOP_DETECTED'
      | '509 BANDWIDTH_LIMIT_EXCEEDED'
      | '510 NOT_EXTENDED'
      | '511 NETWORK_AUTHENTICATION_REQUIRED';
    subErrors?: DataApiDefinitions.ApiValidationError[];
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    timestamp?: string;
  }
  /**
   * ApiValidationError
   */
  export interface ApiValidationError {
    field?: string;
    message?: string;
    object?: string;
    rejectedValue?: {};
  }
  /**
   * CasinoAddDTO
   */
  export interface CasinoAddDTO {
    address?: string;
    alwaysOpen?: boolean;
    city?: string;
    country?: string;
    countryCode?: string;
    description?: string;
    dressCode?: string;
    facebookUrl?: string;
    flopPartner?: boolean;
    geographicalZone?: string;
    getWebSite?: string;
    googlePlusUrl?: string;
    lat?: number; // double
    lon?: number; // double
    mailContact?: string;
    mainCurrency?: string;
    minimumAgeEntrance?: number; // int32
    name?: string;
    openingDays?: DataApiDefinitions.CasinoOpeningDays[];
    pokerRoom?: boolean;
    postalCode?: string;
    spokenLanguages?: string;
    tablesNumber?: number; // int32
    telephoneNumber?: string;
    timeZoneStr?: string;
    webSite?: string;
    youtubeUrl?: string;
  }
  /**
   * CasinoCityDto
   */
  export interface CasinoCityDto {
    count?: number; // int64
    countryName?: string;
    name?: string;
  }
  /**
   * CasinoCountryDto
   */
  export interface CasinoCountryDto {
    code?: string;
    count?: number; // int64
    name?: string;
  }
  /**
   * CasinoInfosDistanceDto
   */
  export interface CasinoInfosDistanceDto {
    address?: string;
    alwaysOpen?: boolean;
    city?: string;
    country?: string;
    countryCode?: string;
    description?: string;
    distance?: number; // double
    distanceUnit?: 'in' | 'yd' | 'ft' | 'km' | 'NM' | 'mm' | 'cm' | 'mi' | 'm';
    dressCode?: string;
    facebookUrl?: string;
    flopPartner?: boolean;
    geographicalZone?: string;
    getWebSite?: string;
    googlePlusUrl?: string;
    id?: string;
    mailContact?: string;
    mainCurrency?: string;
    minimumAgeEntrance?: number; // int32
    name?: string;
    open?: boolean;
    openingDays?: DataApiDefinitions.CasinoOpeningDays[];
    pokerRoom?: boolean;
    position?: DataApiDefinitions.GeoPoint;
    postalCode?: string;
    spokenLanguages?: string;
    tablesNumber?: number; // int32
    telephoneNumber?: string;
    timeZoneStr?: string;
    webSite?: string;
    youtubeUrl?: string;
  }
  /**
   * CasinoInfosDto
   */
  export interface CasinoInfosDto {
    address?: string;
    alwaysOpen?: boolean;
    city?: string;
    country?: string;
    countryCode?: string;
    description?: string;
    dressCode?: string;
    facebookUrl?: string;
    flopPartner?: boolean;
    geographicalZone?: string;
    getWebSite?: string;
    googlePlusUrl?: string;
    id?: string;
    mailContact?: string;
    mainCurrency?: string;
    minimumAgeEntrance?: number; // int32
    name?: string;
    open?: boolean;
    openingDays?: DataApiDefinitions.CasinoOpeningDays[];
    pokerRoom?: boolean;
    position?: DataApiDefinitions.GeoPoint;
    postalCode?: string;
    spokenLanguages?: string;
    tablesNumber?: number; // int32
    telephoneNumber?: string;
    timeZoneStr?: string;
    webSite?: string;
    youtubeUrl?: string;
  }
  /**
   * CasinoOpeningDays
   */
  export interface CasinoOpeningDays {
    /**
     * example:
     * HHmmssZ
     */
    closingTime?: string;
    dayOfWeek?: number; // int32
    /**
     * example:
     * HHmmssZ
     */
    openingTime?: string;
  }
  /**
   * CasinoUpdateDTO
   */
  export interface CasinoUpdateDTO {
    address?: string;
    alwaysOpen?: boolean;
    city?: string;
    country?: string;
    countryCode?: string;
    description?: string;
    dressCode?: string;
    facebookUrl?: string;
    flopPartner?: boolean;
    geographicalZone?: string;
    getWebSite?: string;
    googlePlusUrl?: string;
    lat?: number; // double
    lon?: number; // double
    mailContact?: string;
    mainCurrency?: string;
    minimumAgeEntrance?: number; // int32
    name?: string;
    openingDays?: DataApiDefinitions.CasinoOpeningDays[];
    pokerRoom?: boolean;
    postalCode?: string;
    spokenLanguages?: string;
    tablesNumber?: number; // int32
    telephoneNumber?: string;
    timeZoneStr?: string;
    webSite?: string;
    youtubeUrl?: string;
  }
  namespace DeleteDatasUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace FindAllCasinosForCityAndCountryUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.CasinoInfosDto[];
    }
  }
  namespace FindAllCasinosUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.PageCasinoInfosDto_;
    }
  }
  namespace FindAllCitiesCasinosUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.CasinoCityDto[];
    }
  }
  namespace FindAllCitiesForCountryCasinosUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.CasinoCityDto[];
    }
  }
  namespace FindAllCountriesForCasinosUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.CasinoCountryDto[];
    }
  }
  namespace FindAllPokerRoomCasinosUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.PageCasinoInfosDto_;
    }
  }
  namespace FindPokerRoomCasinosFilteredUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.PageCasinoInfosDistanceDto_;
    }
  }
  /**
   * GeoPoint
   */
  export interface GeoPoint {
    lat?: number; // double
    lon?: number; // double
  }
  namespace GetCasinoUsingGET {
    namespace Responses {
      export type $200 = DataApiDefinitions.CasinoInfosDto;
    }
  }
  namespace LoadCasinosUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace LoadCitiesUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace LoadCountriesUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace LoadDatasUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * Page«CasinoInfosDistanceDto»
   */
  export interface PageCasinoInfosDistanceDto_ {
    content?: DataApiDefinitions.CasinoInfosDistanceDto[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: DataApiDefinitions.Pageable;
    size?: number; // int32
    sort?: DataApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«CasinoInfosDto»
   */
  export interface PageCasinoInfosDto_ {
    content?: DataApiDefinitions.CasinoInfosDto[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: DataApiDefinitions.Pageable;
    size?: number; // int32
    sort?: DataApiDefinitions.Sort;
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
    sort?: DataApiDefinitions.Sort;
    unpaged?: boolean;
  }
  namespace SearchCitiesUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace SearchPaginatedCitiesUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace SearchPaginatedCountriesUsingGET {
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
  namespace UpdateCasinoUsingPUT {
    export interface BodyParameters {
      updateDto?: DataApiDefinitions.UpdateCasinoUsingPUT.Parameters.UpdateDto;
    }
    namespace Parameters {
      export type UpdateDto = DataApiDefinitions.CasinoUpdateDTO;
    }
    namespace Responses {
      export type $200 = DataApiDefinitions.CasinoInfosDto;
      export type $204 = DataApiDefinitions.CasinoInfosDto;
      export type $400 = DataApiDefinitions.ApiError;
    }
  }
  namespace VersionUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }

  /**
   * CasinoUpdateDTO
   */
  export interface ProfileUpdateDTO {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }
}
