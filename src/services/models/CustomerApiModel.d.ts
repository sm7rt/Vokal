declare namespace CustomerApiDefinitions {
  namespace AddNewCustomerUsingPOST {
    export interface BodyParameters {
      customerCreationDto?: CustomerApiDefinitions.AddNewCustomerUsingPOST.Parameters.CustomerCreationDto;
    }
    namespace Parameters {
      export type CustomerCreationDto = CustomerApiDefinitions.CustomerAccountCreationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace AddNewCustomerUsingPOST1 {
    namespace Responses {
      export interface $200 {}
    }
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
   * Customer
   */
  export interface Customer {
    activationToken?: string;
    address?: CustomerApiDefinitions.Address;
    brand?: string;
    brandLowerCaseIndex?: string;
    creationDate?: string; // date-time
    emailAdminUser?: string;
    emailContact?: string;
    id?: number; // int64
    licence?: string;
    modificationDate?: string; // date-time
    phoneNumber?: string;
    referenceNumber?: string;
    requestState?: 'MAIL_NOT_VALIDATED' | 'PENDING' | 'VALIDATED' | 'REFUSED';
    type?: 'CASINO' | 'OPERATOR';
  }
  /**
   * CustomerAccountCreationDTO
   */
  export interface CustomerAccountCreationDTO {
    address?: CustomerApiDefinitions.Address;
    brand?: string;
    emailAdminUser?: string;
    emailContact?: string;
    licence?: string;
    phoneNumber?: string;
    referenceNumber?: string;
    type?: 'CASINO' | 'OPERATOR';
  }
  namespace GetCustomerByIdUsingGET {
    namespace Responses {
      export type $200 = CustomerApiDefinitions.Customer;
    }
  }
  namespace GetPendingRequestsPaginatedUsingGET {
    namespace Responses {
      export type $200 = CustomerApiDefinitions.PageCustomer_;
    }
  }
  /**
   * Page«Customer»
   */
  export interface PageCustomer_ {
    content?: CustomerApiDefinitions.Customer[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: CustomerApiDefinitions.Pageable;
    size?: number; // int32
    sort?: CustomerApiDefinitions.Sort;
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
    sort?: CustomerApiDefinitions.Sort;
    unpaged?: boolean;
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
