declare namespace MessagesApiDefinitions {
  namespace AddMessageUsingPOST {
    export interface BodyParameters {
      addDto: MessagesApiDefinitions.AddMessageUsingPOST.Parameters.AddDto;
    }
    namespace Parameters {
      export type AddDto = MessagesApiDefinitions.CreateMessageDTO;
    }
    namespace Responses {
      export type $200 = string;
    }
  }
  /**
   * CreateMessageDTO
   */
  export interface CreateMessageDTO {
    content?: string;
    entityId?: string;
    entityType?: 'GAME';
  }
  namespace FindByEntityIdUsingGET {
    namespace Responses {
      export type $200 = MessagesApiDefinitions.PageMessageDocument_;
    }
  }
  namespace GetCustomerByIdUsingGET {
    namespace Responses {
      export type $200 = MessagesApiDefinitions.MessageDocument;
    }
  }
  /**
   * MessageDocument
   */
  export interface MessageDocument {
    authorId?: number; // int64
    authorRepresentativeId?: string;
    content?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    entityId?: string;
    entityType?: 'GAME';
    id?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
  }
  /**
   * Page«MessageDocument»
   */
  export interface PageMessageDocument_ {
    content?: MessagesApiDefinitions.MessageDocument[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: MessagesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: MessagesApiDefinitions.Sort;
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
    sort?: MessagesApiDefinitions.Sort;
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
