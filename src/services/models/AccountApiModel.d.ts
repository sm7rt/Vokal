declare namespace AccountApiDefinitions {
  namespace AccountActivationUsingGET {
    namespace Responses {
      export type $200 = string;
    }
  }
  /**
   * AccountSignInDTO
   */
  export interface AccountSignInDTO {
    authorities?: AccountApiDefinitions.GrantedAuthority[];
    email?: string;
    loginOrigin?:
      | 'FLOP_MOBILE'
      | 'FLOP_AD'
      | 'FLOP_WEB_ADMIN'
      | 'WEBSITE'
      | 'OTHER';
    managedCasinoId?: string;
    password?: string;
  }
  /**
   * Address
   */
  export interface Address {
    city?: string;
    country?: string;
    countryCode?: string;
    postalCode?: string;
    state?: string;
    streetAddress?: string;
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
    subErrors?: AccountApiDefinitions.ApiValidationError[];
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
  namespace BackendAvailableUsingGET {
    namespace Responses {
      export type $200 = boolean;
    }
  }
  /**
   * ChangePasswordFormDTO
   */
  export interface ChangePasswordFormDTO {
    currentPassword?: string;
    newPassword?: string;
    password_check?: string;
  }
  namespace ChangePasswordUsingPOST {
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace ChangePasswordUsingPUT {
    export interface BodyParameters {
      formDto?: AccountApiDefinitions.ChangePasswordUsingPUT.Parameters.FormDto;
    }
    namespace Parameters {
      export type FormDto = AccountApiDefinitions.ChangePasswordFormDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CheckResetPasswordUsingGET {
    namespace Responses {
      export interface $200 {}
      export interface $204 {}
      export type $400 = AccountApiDefinitions.ApiError;
    }
  }
  /**
   * ContactUsFormDTO
   */
  export interface ContactUsFormDTO {
    content?: string;
    subject?: string;
  }
  namespace ContactUsUsingPOST {
    export interface BodyParameters {
      formDto?: AccountApiDefinitions.ContactUsUsingPOST.Parameters.FormDto;
    }
    namespace Parameters {
      export type FormDto = AccountApiDefinitions.ContactUsFormDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CreateAccountUsingPOST {
    export interface BodyParameters {
      accountDto: AccountApiDefinitions.CreateAccountUsingPOST.Parameters.AccountDto;
    }
    namespace Parameters {
      export type AccountDto = AccountApiDefinitions.CustomerAccountSignInDTO;
    }
    namespace Responses {
      export interface $200 {}
      export interface $204 {}
      export type $400 = AccountApiDefinitions.ApiError;
    }
  }
  namespace CreateAccountUsingPOST1 {
    export interface BodyParameters {
      accountDto: AccountApiDefinitions.CreateAccountUsingPOST1.Parameters.AccountDto;
    }
    namespace Parameters {
      export type AccountDto = AccountApiDefinitions.AccountSignInDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * Customer
   */
  export interface Customer {
    activationToken?: string;
    address?: AccountApiDefinitions.Address;
    brand?: string;
    brandLowerCaseIndex?: string;
    casinoId?: string;
    creationDate?: string; // date-time
    emailAdminUser?: string;
    emailContact?: string;
    id?: number; // int64
    licence?: string;
    licenceAuthority?: string;
    modificationDate?: string; // date-time
    phoneNumber?: string;
    referenceNumber?: string;
    requestState?: 'MAIL_NOT_VALIDATED' | 'PENDING' | 'VALIDATED' | 'REFUSED';
    type?: 'CASINO' | 'OPERATOR';
  }
  /**
   * CustomerAccount
   */
  export interface CustomerAccount {
    accountRole?:
      | 'FLOP_USER'
      | 'CASINO_MANAGER'
      | 'OPERATOR_MANAGER'
      | 'GLOBAL_ADMIN';
    activationToken?: string;
    active?: boolean;
    creationDate?: string; // date-time
    customer?: AccountApiDefinitions.Customer;
    email?: string;
    id?: number; // int64
    lastConnexionDate?: string; // date-time
    managedCasinoId?: string;
    modificationDate?: string; // date-time
    nbLoginError?: number; // int32
    password?: string;
    previousConnexionDate?: string; // date-time
    requestState?: 'PENDING' | 'VERIFIED';
    resetPasswordToken?: string;
    resetPasswordTokenExpirationDate?: string; // date-time
    role?:
      | 'ADMIN'
      | 'LIMITED_ADMIN'
      | 'POKER_ROOM_MANAGER'
      | 'COMMUNITY_MANAGER';
  }
  /**
   * CustomerAccountSignInDTO
   */
  export interface CustomerAccountSignInDTO {
    casinoId?: string;
    customerId?: number; // int64
    customerType?: 'CASINO' | 'OPERATOR';
    email?: string;
    requestState?: 'PENDING' | 'VERIFIED';
    role?:
      | 'ADMIN'
      | 'LIMITED_ADMIN'
      | 'POKER_ROOM_MANAGER'
      | 'COMMUNITY_MANAGER';
  }
  namespace CustomerChangePasswordUsingPUT {
    export interface BodyParameters {
      changePasswordDto?: AccountApiDefinitions.CustomerChangePasswordUsingPUT.Parameters.ChangePasswordDto;
    }
    namespace Parameters {
      export type ChangePasswordDto = AccountApiDefinitions.ChangePasswordFormDTO;
    }
    namespace Responses {
      export interface $200 {}
      export interface $204 {}
      export type $400 = AccountApiDefinitions.ApiError;
    }
  }
  /**
   * CustomerResetPasswordFormDTO
   */
  export interface CustomerResetPasswordFormDTO {
    newPassword?: string;
    passwordCheck?: string;
    resetPasswordToken?: string;
  }
  namespace CustomerResetPasswordUsingPOST {
    export interface BodyParameters {
      resetPasswordDto?: AccountApiDefinitions.CustomerResetPasswordUsingPOST.Parameters.ResetPasswordDto;
    }
    namespace Parameters {
      export type ResetPasswordDto = AccountApiDefinitions.CustomerResetPasswordFormDTO;
    }
    namespace Responses {
      export interface $200 {}
      export interface $204 {}
      export type $400 = AccountApiDefinitions.ApiError;
    }
  }
  namespace DeleteDatasUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace FindCustomersAccountUsingGET {
    namespace Responses {
      export type $200 = AccountApiDefinitions.PageCustomerAccount_;
      export type $400 = AccountApiDefinitions.ApiError;
    }
  }
  namespace ForgotPasswordActionUsingPOST {
    namespace Responses {
      export interface $200 {}
      export interface $204 {}
      export type $400 = AccountApiDefinitions.ApiError;
    }
  }
  /**
   * GrantedAuthority
   */
  export interface GrantedAuthority {
    authority?: string;
  }
  /**
   * Page«CustomerAccount»
   */
  export interface PageCustomerAccount_ {
    content?: AccountApiDefinitions.CustomerAccount[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: AccountApiDefinitions.Pageable;
    size?: number; // int32
    sort?: AccountApiDefinitions.Sort;
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
    sort?: AccountApiDefinitions.Sort;
    unpaged?: boolean;
  }
  namespace ResendActivationTokenUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ResetPasswordUsingGET {
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace ResetPasswordUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ShowFirstScreenUsingGET {
    namespace Responses {
      export type $200 = boolean;
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
