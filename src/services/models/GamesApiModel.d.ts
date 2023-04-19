declare namespace GamesApiDefinitions {
  /**
   * AbstractLiveTableDocument
   */
  export interface AbstractLiveTableDocument {
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    endDate?: string; // date-time
    gameId?: string;
    id?: string;
    maxPlayers?: number; // int32
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    players?: GamesApiDefinitions.PlayerDTO[];
    pokerRoomTableId?: string;
    startDate?: string; // date-time
    tableId?: string;
    tableName?: string;
    tableState?:
      | 'STAND_BY'
      | 'OPEN_FOR_REGISTRATIONS'
      | 'FREE'
      | 'RUNNING'
      | 'CLOSED';
  }
  namespace AddBookmarkUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * AddGameDTO
   */
  export interface AddGameDTO {
    bigBlind?: number; // int32
    buyIn?: number; // double
    casino?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSSZZ
     */
    date?: string;
    gameOrigin?: 'FLOP_USER' | 'CASINO';
    gameSize?: string;
    gameType?: 'CASH_GAME' | 'TOURNAMENT';
    gameVariant?: string;
    maxPlayer?: number; // int32
    name?: string;
    ownerId?: number; // int64
    publicGame?: boolean;
    smallBlind?: number; // int32
  }
  namespace AddGameUsingPOST {
    export interface BodyParameters {
      addGameDTO: GamesApiDefinitions.AddGameUsingPOST.Parameters.AddGameDTO;
    }
    namespace Parameters {
      export type AddGameDTO = GamesApiDefinitions.AddGameDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * AddOnProperty
   */
  export interface AddOnProperty {
    cashAmount?: number; // int64
    chipsAmount?: number; // int64
    fee?: number; // int32
    lastLevel?: number; // int32
    maxPerPlayer?: number; // int32
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
    subErrors?: GamesApiDefinitions.ApiValidationError[];
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
   * BookmarksDocument
   */
  export interface BookmarksDocument {
    accountId?: number; // int64
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    festivalId?: string;
    id?: string;
    liveGameId?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
  }
  namespace BookmarksRemoveForLiveGameUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CancelSubscriptionLiveGameUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CasinoDeclineGameUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ConfirmGameUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ConfirmInvitationUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CountBookmarksOnFestivalUsingGET {
    namespace Responses {
      export type $200 = number; // int64
    }
  }
  namespace CountPlayersInTableTournamentUsingGET {
    namespace Responses {
      export type $200 = number; // int64
    }
  }
  namespace CountPlayersInTournamentUsingGET {
    namespace Responses {
      export type $200 = number; // int64
    }
  }
  namespace CountStreamedPlayersInTournamentUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.FluxLong_;
    }
  }
  namespace CreateFestivalUsingPOST {
    export interface BodyParameters {
      creationDTO?: GamesApiDefinitions.CreateFestivalUsingPOST.Parameters.CreationDTO;
    }
    namespace Parameters {
      export type CreationDTO = GamesApiDefinitions.FestivalCreationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace CreateTournamentInFestivalUsingPOST {
    export interface BodyParameters {
      tournament?: GamesApiDefinitions.CreateTournamentInFestivalUsingPOST.Parameters.Tournament;
    }
    namespace Parameters {
      export type Tournament = GamesApiDefinitions.FestivalTournamentCreationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace DeclineInvitationUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace DeleteDatasUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace DeleteFestivalByIdUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace DeleteFestivalTournamentByIdUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace DeleteFestivalTournamentByIdUsingDELETE1 {
    namespace Responses {
      export type $200 = GamesApiDefinitions.LiveTournamentDocument;
    }
  }
  namespace DeleteWaitingListPlayersUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace EndGameUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace ExitGameUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * FestivalCreationDTO
   */
  export interface FestivalCreationDTO {
    casinoId?: string;
    endDate?: string; // date-time
    name?: string;
    startDate?: string; // date-time
  }
  /**
   * FestivalDocument
   */
  export interface FestivalDocument {
    address?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    /**
     * example:
     * yyyy-MM-dd
     */
    endDate?: string;
    id?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    name?: string;
    ownerId?: number; // int64
    position?: GamesApiDefinitions.GeoPoint;
    /**
     * example:
     * yyyy-MM-dd
     */
    startDate?: string;
  }
  /**
   * FestivalTournamentCreationDTO
   */
  export interface FestivalTournamentCreationDTO {
    buyIn?: number; // double
    casino?: string;
    date?: string; // date-time
    eventNumber?: string;
    fee?: number; // int64
    gameVariant?: string;
    lateRegistrationIncludeBreak?: boolean;
    lateRegistrationLevel?: number; // int32
    name?: string;
    startStack?: number; // int64
    takeOut?: number; // int32
    tournamentCurrency?: string;
  }
  /**
   * FestivalTournamentTableCreationDTO
   */
  export interface FestivalTournamentTableCreationDTO {
    endDate?: string; // date-time
    maxPlayers?: number; // int32
    pokerRoomTableId?: string;
    startDate?: string; // date-time
    tableId?: string;
    tableName?: string;
  }
  /**
   * FestivalTournamentTableUpdateDTO
   */
  export interface FestivalTournamentTableUpdateDTO {
    endDate?: string; // date-time
    maxPlayers?: number; // int32
    pokerRoomTableId?: string;
    startDate?: string; // date-time
    tableId?: string;
    tableName?: string;
    tableState?:
      | 'STAND_BY'
      | 'OPEN_FOR_REGISTRATIONS'
      | 'FREE'
      | 'RUNNING'
      | 'CLOSED';
  }
  /**
   * FestivalTournamentUpdateFormatDTO
   */
  export interface FestivalTournamentUpdateFormatDTO {
    addOnAllowed?: boolean;
    addOnDetails?: GamesApiDefinitions.AddOnProperty;
    freezOut?: boolean;
    reEntryAllowed?: boolean;
    reEntryDetails?: GamesApiDefinitions.AddOnProperty;
    rebuyAllowed?: boolean;
    rebuyDetails?: GamesApiDefinitions.AddOnProperty;
  }
  /**
   * FestivalTournamentUpdatePrizePoolConfigurationDTO
   */
  export interface FestivalTournamentUpdatePrizePoolConfigurationDTO {
    tournamentPrizePoolConfiguration?: GamesApiDefinitions.TournamentPrizePoolConfiguration;
  }
  /**
   * FestivalTournamentUpdateStructureDTO
   */
  export interface FestivalTournamentUpdateStructureDTO {
    tournamentStructure?: GamesApiDefinitions.TournamentStructure;
  }
  namespace FindFestivalsByCasinoIdUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageSearchFestivalsResultDTO_;
    }
  }
  namespace FindFestivalsBySearchUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageSearchFestivalsResultDTO_;
    }
  }
  namespace FindFinishedFestivalsByCasinoIdUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageSearchFestivalsResultDTO_;
    }
  }
  namespace FindPlayersInTournamentTableUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.TournamentPlayerDocument[];
    }
  }
  namespace FindPlayersInTournamentUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageTournamentPlayerDocument_;
    }
  }
  namespace FindUpcomingFestivalsByCasinoIdUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageSearchFestivalsResultDTO_;
    }
  }
  /**
   * FlopUpdateGameDTO
   */
  export interface FlopUpdateGameDTO {
    bigBlind?: number; // int32
    buyIn?: number; // double
    casino?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSSZZ
     */
    date?: string;
    gameOrigin?: 'FLOP_USER' | 'CASINO';
    gameSize?: string;
    gameType?: 'CASH_GAME' | 'TOURNAMENT';
    gameVariant?: string;
    maxPlayer?: number; // int32
    name?: string;
    ownerId?: number; // int64
    publicGame?: boolean;
    smallBlind?: number; // int32
  }
  /**
   * Flux«long»
   */
  export interface FluxLong_ {
    prefetch?: number; // int32
  }
  /**
   * GameInvitationsDTO
   */
  export interface GameInvitationsDTO {
    accountId?: number; // int64
    inviterId?: number; // int64
    presenceStatus?: 'UNKNOWN' | 'PRESENT' | 'MISS';
    status?: 'PENDING' | 'DECLINED' | 'CONFIRMED' | 'DELETED';
  }
  /**
   * GeoPoint
   */
  export interface GeoPoint {
    lat?: number; // double
    lon?: number; // double
  }
  namespace GetConfirmedMembersCountUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetConfirmedMembersUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetFestivalByIdUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.FestivalDocument;
    }
  }
  namespace GetFestivalTournamentByIdUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.LiveTournamentDocument;
    }
  }
  namespace GetFestivalTournamentCountUsingGET {
    namespace Responses {
      export type $200 = number; // int64
    }
  }
  namespace GetFestivalTournamentInterestedPlayersCountUsingGET {
    namespace Responses {
      export type $200 = number; // int64
    }
  }
  namespace GetFestivalTournamentInterestedPlayersUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageLiveGameInterestDocument_;
    }
  }
  namespace GetFestivalTournamentListUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageLiveTournamentDocument_;
    }
  }
  namespace GetGameUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.AddGameDTO;
    }
  }
  namespace GetLiveGameInfosUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.LiveGameDTO;
    }
  }
  namespace GetMembersUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.GameInvitationsDTO[];
    }
  }
  namespace GetMembershipUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetPendingMembersUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetPendingRequestsUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetPlayerInGameUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.LiveGamePlayerDTO;
    }
  }
  namespace GetPlayerInfosUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.TournamentPlayerDocument;
    }
  }
  namespace GetTournamentAvailabilityUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetWaitingListPlayersUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.WaitingListDocument;
    }
  }
  namespace GetWaitingListPlayersUsingGET1 {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageWaitingListDocument_;
    }
  }
  namespace GetWaitingListPlayersUsingPOST {
    export interface BodyParameters {
      creationDto?: GamesApiDefinitions.GetWaitingListPlayersUsingPOST.Parameters.CreationDto;
    }
    namespace Parameters {
      export type CreationDto = GamesApiDefinitions.WaitingListCreationDTO;
    }
    namespace Responses {
      export type $200 = GamesApiDefinitions.WaitingListDocument;
    }
  }
  namespace InterestPlayerAddLiveGameUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace InterestPlayerGetLiveGameUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.BookmarksDocument;
    }
  }
  namespace InterestPlayerGetLiveGameUsingGET1 {
    namespace Responses {
      export type $200 = GamesApiDefinitions.LiveGameInterestDocument;
    }
  }
  namespace InterestPlayerRemoveForLiveGameUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace InviteUserUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace IsSendableGameUsingGET {
    namespace Responses {
      export interface $200 {}
      export type $400 = GamesApiDefinitions.ApiError;
    }
  }
  namespace JoinGameUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace JoinLiveGameUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace LiveCashGameCreationUsingPOST {
    export interface BodyParameters {
      cashGameCreationDTO: GamesApiDefinitions.LiveCashGameCreationUsingPOST.Parameters.CashGameCreationDTO;
    }
    namespace Parameters {
      export type CashGameCreationDTO = GamesApiDefinitions.LiveCashGameDTOCreation;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * LiveCashGameDTOCreation
   */
  export interface LiveCashGameDTOCreation {
    table?: GamesApiDefinitions.LiveCashGameTableDTOCreation[];
  }
  /**
   * LiveCashGameDocument
   */
  export interface LiveCashGameDocument {
    address?: string;
    bigBlind?: number; // int32
    buyIn?: number; // double
    casino?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSSZZ
     */
    date?: string;
    festivalId?: string;
    gameSize?: string;
    gameType?: 'CASH_GAME' | 'TOURNAMENT';
    gameVariant?: string;
    id?: string;
    key?: string;
    liveGameKey?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    name?: string;
    position?: GamesApiDefinitions.GeoPoint;
    publicGame?: boolean;
    smallBlind?: number; // int32
    state?: 'UPCOMING' | 'FINISHED' | 'RUNNING';
  }
  /**
   * LiveCashGameSearchResultDTO
   */
  export interface LiveCashGameSearchResultDTO {
    address?: string;
    buyIn?: number; // double
    casinoId?: string;
    city?: string;
    country?: string;
    gameSize?: string;
    gameVariant?: string;
    liveGameKey?: string;
    tables?: GamesApiDefinitions.LiveCashGameTableDocument[];
  }
  /**
   * LiveCashGameTableDTOCreation
   */
  export interface LiveCashGameTableDTOCreation {
    buyIn?: number; // double
    gameSize?: string;
    gameVariant?: string;
    maxPlayers?: number; // int32
    players?: GamesApiDefinitions.PlayerDTO[];
    tableId?: string;
  }
  /**
   * LiveCashGameTableDocument
   */
  export interface LiveCashGameTableDocument {
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    endDate?: string; // date-time
    gameId?: string;
    id?: string;
    maxPlayers?: number; // int32
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    players?: GamesApiDefinitions.PlayerDTO[];
    pokerRoomTableId?: string;
    startDate?: string; // date-time
    tableId?: string;
    tableName?: string;
    tableState?:
      | 'STAND_BY'
      | 'OPEN_FOR_REGISTRATIONS'
      | 'FREE'
      | 'RUNNING'
      | 'CLOSED';
    address?: string;
    bigBlind?: number; // int32
    buyIn?: number; // double
    casino?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    gameSize?: string;
    gameType?: 'CASH_GAME' | 'TOURNAMENT';
    gameVariant?: string;
    key?: string;
    liveGameKey?: string;
    position?: GamesApiDefinitions.GeoPoint;
    publicGame?: boolean;
    smallBlind?: number; // int32
  }
  /**
   * LiveGameDTO
   */
  export interface LiveGameDTO {
    bigBlind?: number; // int32
    buyIn?: number; // double
    casino?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    gameSize?: string;
    gameType?: 'CASH_GAME' | 'TOURNAMENT';
    gameVariant?: string;
    id?: string;
    playerNumber?: number; // int32
    smallBlind?: number; // int32
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSSZZ
     */
    startedTime?: string;
    tableNumber?: number; // int32
    waitingListNumber?: number; // int32
  }
  /**
   * LiveGameInterestDocument
   */
  export interface LiveGameInterestDocument {
    accountId?: number; // int64
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    id?: string;
    liveGameId?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
  }
  /**
   * LiveGamePlayerDTO
   */
  export interface LiveGamePlayerDTO {
    accountId?: number; // int64
    chipCount?: number; // double
    name?: string;
    profileImage?: string;
    registrationDate?: string; // date-time
    surname?: string;
    tableNumber?: string;
    waitingListPosition?: number; // int32
  }
  namespace LiveGamesSearchUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * LiveTournamentDocument
   */
  export interface LiveTournamentDocument {
    addOnAllowed?: boolean;
    addOnDetails?: GamesApiDefinitions.AddOnProperty;
    address?: string;
    bigBlind?: number; // int32
    buyIn?: number; // double
    casino?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSSZZ
     */
    date?: string;
    eventID?: string;
    eventNumber?: string;
    fee?: number; // int64
    festivalId?: string;
    freezOut?: boolean;
    gameSize?: string;
    gameType?: 'CASH_GAME' | 'TOURNAMENT';
    gameVariant?: string;
    id?: string;
    key?: string;
    lateRegistrationIncludeBreak?: boolean;
    lateRegistrationLevel?: number; // int32
    liveGameKey?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    name?: string;
    position?: GamesApiDefinitions.GeoPoint;
    publicGame?: boolean;
    reEntryAllowed?: boolean;
    reEntryDetails?: GamesApiDefinitions.AddOnProperty;
    rebuyAllowed?: boolean;
    rebuyDetails?: GamesApiDefinitions.AddOnProperty;
    smallBlind?: number; // int32
    startStack?: number; // int64
    state?: 'UPCOMING' | 'FINISHED' | 'RUNNING';
    takeOut?: number; // int32
    tournamentCurrency?: string;
    tournamentPrizePoolConfiguration?: GamesApiDefinitions.TournamentPrizePoolConfiguration;
    tournamentStructure?: GamesApiDefinitions.TournamentStructure;
  }
  /**
   * LiveTournamentTableDocument
   */
  export interface LiveTournamentTableDocument {
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    endDate?: string; // date-time
    gameId?: string;
    id?: string;
    maxPlayers?: number; // int32
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    players?: GamesApiDefinitions.PlayerDTO[];
    pokerRoomTableId?: string;
    startDate?: string; // date-time
    tableId?: string;
    tableName?: string;
    tableState?:
      | 'STAND_BY'
      | 'OPEN_FOR_REGISTRATIONS'
      | 'FREE'
      | 'RUNNING'
      | 'CLOSED';
    gameType?: 'CASH_GAME' | 'TOURNAMENT';
  }
  namespace NumberPendingrequestsUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * Page«AbstractLiveTableDocument»
   */
  export interface PageAbstractLiveTableDocument_ {
    content?: GamesApiDefinitions.AbstractLiveTableDocument[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«LiveCashGameSearchResultDTO»
   */
  export interface PageLiveCashGameSearchResultDTO_ {
    content?: GamesApiDefinitions.LiveCashGameSearchResultDTO[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«LiveGameInterestDocument»
   */
  export interface PageLiveGameInterestDocument_ {
    content?: GamesApiDefinitions.LiveGameInterestDocument[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«LiveTournamentDocument»
   */
  export interface PageLiveTournamentDocument_ {
    content?: GamesApiDefinitions.LiveTournamentDocument[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«object»
   */
  export interface PageObject_ {
    content?: {}[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«SearchFestivalsResultDTO»
   */
  export interface PageSearchFestivalsResultDTO_ {
    content?: GamesApiDefinitions.SearchFestivalsResultDTO[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«TournamentPlayerDocument»
   */
  export interface PageTournamentPlayerDocument_ {
    content?: GamesApiDefinitions.TournamentPlayerDocument[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
    totalElements?: number; // int64
    totalPages?: number; // int32
  }
  /**
   * Page«WaitingListDocument»
   */
  export interface PageWaitingListDocument_ {
    content?: GamesApiDefinitions.WaitingListDocument[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number; // int32
    numberOfElements?: number; // int32
    pageable?: GamesApiDefinitions.Pageable;
    size?: number; // int32
    sort?: GamesApiDefinitions.Sort;
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
    sort?: GamesApiDefinitions.Sort;
    unpaged?: boolean;
  }
  namespace PlayerAddOnUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * PlayerDTO
   */
  export interface PlayerDTO {
    departureDate?: string; // date-time
    flopId?: number; // int64
    name?: string;
    registrationDate?: string; // date-time
  }
  namespace PlayerInUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace PlayerMissUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace PlayerReBuyUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace PlayerReEntryUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace PrintTicketUsingPUT {
    namespace Responses {
      export type $200 = GamesApiDefinitions.TicketDocument;
    }
  }
  /**
   * PrizePoolRank
   */
  export interface PrizePoolRank {
    percentage?: number; // double
    rankFrom?: number; // int64
    rankTo?: number; // int64
  }
  namespace RegisterPlayerInTournamentFestivalUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.TournamentPlayerDocument;
    }
  }
  namespace RegisterPlayerInTournamentFestivalUsingPOST {
    export interface BodyParameters {
      player?: GamesApiDefinitions.RegisterPlayerInTournamentFestivalUsingPOST.Parameters.Player;
    }
    namespace Parameters {
      export type Player = GamesApiDefinitions.TournamentPlayerCreationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace RunningCashGameSearchUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageLiveCashGameSearchResultDTO_;
    }
  }
  /**
   * SearchFestivalsResultDTO
   */
  export interface SearchFestivalsResultDTO {
    address?: string;
    casinoId?: string;
    city?: string;
    country?: string;
    distance?: number; // double
    distanceUnit?: 'in' | 'yd' | 'ft' | 'km' | 'NM' | 'mm' | 'cm' | 'mi' | 'm';
    endDate?: string; // date-time
    id?: string;
    name?: string;
    position?: GamesApiDefinitions.GeoPoint;
    startDate?: string; // date-time
  }
  /**
   * Seat
   */
  export interface Seat {
    position?: number; // int32
    tableId?: string;
    tableName?: string;
  }
  namespace SendRequestGameUsingPUT {
    namespace Responses {
      export interface $200 {}
      export type $400 = GamesApiDefinitions.ApiError;
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
  namespace StartGameUsingPOST {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace StopTableUsingPUT {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * StructureLevel
   */
  export interface StructureLevel {
    ante?: number; // int64
    bigBlind?: number; // int64
    duration?: number; // int32
    level?: number; // int32
    smallBlind?: number; // int64
    type?: 'LEVEL' | 'BREAK';
  }
  namespace TableDeleteInTournamentUsingDELETE {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace TableTournamentAddUsingPOST {
    export interface BodyParameters {
      tableCreationDto?: GamesApiDefinitions.TableTournamentAddUsingPOST.Parameters.TableCreationDto;
    }
    namespace Parameters {
      export type TableCreationDto = GamesApiDefinitions.FestivalTournamentTableCreationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace TableTournamentFindByTableIdUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageAbstractLiveTableDocument_;
    }
  }
  namespace TableTournamentGetByIdUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.AbstractLiveTableDocument;
    }
  }
  namespace TableUpdateInTournamentUsingPUT {
    export interface BodyParameters {
      tableUpdateDto?: GamesApiDefinitions.TableUpdateInTournamentUsingPUT.Parameters.TableUpdateDto;
    }
    namespace Parameters {
      export type TableUpdateDto = GamesApiDefinitions.FestivalTournamentTableUpdateDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * TicketDocument
   */
  export interface TicketDocument {
    amount?: number; // int64
    chips?: number; // int64
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    fee?: number; // int64
    gameId?: string;
    generatedDate?: string; // date-time
    id?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    officeId?: string;
    playerId?: string;
    printOccur?: number; // int32
    printed?: boolean;
    seat?: GamesApiDefinitions.Seat;
    ticketCount?: number; // int32
    ticketGenerated?: boolean;
    ticketId?: string;
    ticketPrinterId?: number; // int64
    type?: 'REGISTER' | 'REBUY' | 'REENTRY' | 'ADDON';
    valid?: boolean;
  }
  /**
   * TournamentPlayerCreationDTO
   */
  export interface TournamentPlayerCreationDTO {
    birthDate?: string; // date-time
    firstName?: string;
    flopId?: number; // int64
    lastName?: string;
    originCountry?: string;
  }
  /**
   * TournamentPlayerDocument
   */
  export interface TournamentPlayerDocument {
    addOnNumber?: number; // int32
    birthDate?: string; // date-time
    chipCount?: number; // int64
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    firstName?: string;
    flopId?: number; // int64
    gameId?: string;
    id?: string;
    lastName?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    originCountry?: string;
    playerNumber?: number; // int32
    reBuyNumber?: number; // int32
    reEntriesNumber?: number; // int32
    seat?: GamesApiDefinitions.Seat;
    status?:
      | 'REGISTERED'
      | 'CANCELED'
      | 'IN'
      | 'BUSTED'
      | 'WINNER'
      | 'WAITING_FOR_SEAT_DRAW';
  }
  /**
   * TournamentPlayerUpdateDTO
   */
  export interface TournamentPlayerUpdateDTO {
    birthDate?: string; // date-time
    firstName?: string;
    flopId?: number; // int64
    lastName?: string;
    originCountry?: string;
    status?:
      | 'REGISTERED'
      | 'CANCELED'
      | 'IN'
      | 'BUSTED'
      | 'WINNER'
      | 'WAITING_FOR_SEAT_DRAW';
  }
  /**
   * TournamentPrizePoolConfiguration
   */
  export interface TournamentPrizePoolConfiguration {
    ranks?: GamesApiDefinitions.PrizePoolRank[];
  }
  /**
   * TournamentStatistics
   */
  export interface TournamentStatistics {
    averageStack?: number; // int64
    nbAddon?: number; // int64
    nbRebuy?: number; // int64
    nbReentry?: number; // int64
    totalChips?: number; // int64
    totalFees?: number; // int64
    totalInGamePlayers?: number; // int64
    totalPrizePool?: number; // int64
    totalUniquePlayers?: number; // int64
  }
  namespace TournamentStatisticsUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.TournamentStatistics;
    }
  }
  /**
   * TournamentStructure
   */
  export interface TournamentStructure {
    levels?: GamesApiDefinitions.StructureLevel[];
  }
  namespace UpcomingGamesSearchUsingGET {
    namespace Responses {
      export type $200 = GamesApiDefinitions.PageObject_;
    }
  }
  namespace UpdateFestivalTournamentFormatUsingPUT {
    export interface BodyParameters {
      formatDto?: GamesApiDefinitions.UpdateFestivalTournamentFormatUsingPUT.Parameters.FormatDto;
    }
    namespace Parameters {
      export type FormatDto = GamesApiDefinitions.FestivalTournamentUpdateFormatDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UpdateFestivalTournamentGeneralInfosUsingPUT {
    export interface BodyParameters {
      formatDto?: GamesApiDefinitions.UpdateFestivalTournamentGeneralInfosUsingPUT.Parameters.FormatDto;
    }
    namespace Parameters {
      export type FormatDto = GamesApiDefinitions.FestivalTournamentCreationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UpdateFestivalTournamentPrizePoolUsingPUT {
    export interface BodyParameters {
      prizePoolDto?: GamesApiDefinitions.UpdateFestivalTournamentPrizePoolUsingPUT.Parameters.PrizePoolDto;
    }
    namespace Parameters {
      export type PrizePoolDto = GamesApiDefinitions.FestivalTournamentUpdatePrizePoolConfigurationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UpdateFestivalTournamentStructureUsingPUT {
    export interface BodyParameters {
      formatDto?: GamesApiDefinitions.UpdateFestivalTournamentStructureUsingPUT.Parameters.FormatDto;
    }
    namespace Parameters {
      export type FormatDto = GamesApiDefinitions.FestivalTournamentUpdateStructureDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UpdateGameUsingPUT {
    export interface BodyParameters {
      festival?: GamesApiDefinitions.UpdateGameUsingPUT.Parameters.Festival;
    }
    namespace Parameters {
      export type Festival = GamesApiDefinitions.FestivalCreationDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UpdateGameUsingPUT1 {
    export interface BodyParameters {
      game: GamesApiDefinitions.UpdateGameUsingPUT1.Parameters.Game;
    }
    namespace Parameters {
      export type Game = GamesApiDefinitions.FlopUpdateGameDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UpdatePlayerUsingPUT {
    export interface BodyParameters {
      playerDto?: GamesApiDefinitions.UpdatePlayerUsingPUT.Parameters.PlayerDto;
    }
    namespace Parameters {
      export type PlayerDto = GamesApiDefinitions.TournamentPlayerUpdateDTO;
    }
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace VersionUsingGET {
    namespace Responses {
      export interface $200 {}
    }
  }
  /**
   * WaitingListCreationDTO
   */
  export interface WaitingListCreationDTO {
    firstName?: string;
    flopId?: number; // int64
    lastName?: string;
  }
  /**
   * WaitingListDocument
   */
  export interface WaitingListDocument {
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    creationDate?: string;
    firstName?: string;
    flopId?: string;
    gameId?: string;
    id?: string;
    lastName?: string;
    liveRunningGameId?: string;
    /**
     * example:
     * yyyy-MM-dd'T'HH:mm:ss.SSS
     */
    modificationDate?: string;
    registrationDate?: string; // date-time
  }
}
