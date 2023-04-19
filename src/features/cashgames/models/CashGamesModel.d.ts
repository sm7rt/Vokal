import { ImmutableObject } from 'seamless-immutable';
import { PageableStateType, SortType } from '../../../common/models';

export type InterestListRow = GamesApiDefinitions.LiveCashGameDocument & {
  playersNumber?: number;
  messagesNumber?: number;
};

export type RunningCashGameRow = GamesApiDefinitions.LiveCashGameDocument & {
  playersNumber?: number;
  messagesNumber?: number;
};

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

type InterestListStateType = {
  displayList: PageableStateType<void>;
  list: Array<InterestListRow>;
};

export type IInterestListImmutableStateType = ImmutableObject<
  InterestListStateType
>;

type IRunningCashGamesStateType = {
  displayList: PageableStateType<void>;
  list: Array<InterestListRow>;
  playerStatus: Array<any>; // TODO Set PlayerStatus Type
};

export type IRunningCashGamesImmutableStateType = ImmutableObject<
  IRunningCashGamesStateType
>;

type ICashGamesLayoutStateType = {
  currentTab: 'interest' | 'running' | 'finished' | 'revenue';
};

export type ICashGamesLayoutImmutableStateType = ImmutableObject<
  ICashGamesLayoutStateType
>;

/**
 * CashGames State Type
 */
type CashGamesStateType = {
  interestList: IInterestListImmutableStateType;
  runningCashGames: IRunningCashGamesImmutableStateType;
  layout: ICashGamesLayoutImmutableStateType;
};

export type ICashGamesImmutableStateType = ImmutableObject<CashGamesStateType>;

// ******************************** //
// *********** Services  ************ //
// ******************************** //

/**
 * InterestList Service available
 */
export type InterestListServiceType = {
  fetchInterestList: (gameType: string, queryParams: string) => any;
  fetchPlayersCount: (gameId: string) => any;
  fetchInterestListDetails: (gameId: string) => any;
  acceptInterestList: (gameId: string) => any;
  declineInterestList: (gameId: string) => any;
  promoteGame: (gameId: string) => any;
  startGame: (gameId: string) => any;
  deleteInterestList: (gameId: string) => any;
  fetchPlayersList: (gameId: string) => any;
  createInterestList: (gameData: any) => any;
  startInterestList: (gameDate: any) => any;
  fetchRegisteredPlayers: (gameId: string) => any;
};

/**
 * Running CashGames Service available
 */
export type RunningCashGamesServiceType = {
  fetchRunningCashGames: (queryParams: string) => any;
  fetchJoinSeatRequests: (gameId: string, tableId: string) => any;
  addNewPlayer: (tableId: string, player: GamesApiDefinitions.PlayerDTO) => any;
  addNewTable: (runningGame: any) => any;
  removePlayer: (playerId: string) => any;
  createRunningGame: (runningGame: any) => any;
  fetchWaitingList: (gameId: string) => any;
  addNewPlayerToWaitingList: (
    gameId: string,
    player: GamesApiDefinitions.PlayerDTO
  ) => any;
  removePlayerFromWaitingList: (gameId: string, playerId: string) => any;
  closeTable: (tableId: string) => any;
  sitPlayer: (gameId: string, tableId: string, playerId: string) => any;
  callPlayer: (gameId: string, playerId: string) => any;
  acceptJoinSeatRequest: (tableId: string, playerId: string) => any;
  declineJoinSeatRequest: (tableId: string, playerId: string) => any;
  confirmSitPlayer: (tableId: string, playerId: string) => any;
  findPlayerStatus: (playerId: number) => any;
};
