import { AuthenticationImmutableStateType } from '../../features/authentication/models/AuthenticationModel';
import { ImmutableObject } from 'seamless-immutable';
import { IUsersImmutableStateType } from '../../features/users/models/UsersModel.d';
import {
  CurrencyType,
  GameVariantType,
  GameSizeType,
  CountryType,
  CityType,
  IParametersImmutableState
} from '../redux/ParametersModel.d';
import { IEventsImmutableStateType } from '../../features/events/models/EventsModel.d';
import { ICashGamesImmutableStateType } from '../../features/cashgames/models/CashGamesModel.d';
import { IPlayersImmutableStateType } from '../../features/players/models/PlayersModel';

/* ------------- Layout ------------- */

/**
 * Nav Item Interface
 */
export interface INavItem {
  title: string;
  items: Array<{
    title: string;
    to: string;
    htmlBefore?: string;
    htmlAfter?: string;
  }>;
}

/**
 * Layout State Interface
 */
export interface ILayoutState {
  sidebar: {
    navItems: Array<INavItem>;
    collapsed: boolean;
  };
}

// Immutable Layout State
export type ILayoutImmutableState = ImmutableObject<ILayoutState>;

/* ------------- Messages ------------- */

/**
 * System Message State Interface
 */
export interface ISystemMessageState {
  id: string;
  gravity: 'ERROR' | 'WARNING' | 'INFO' | 'SUCCESS';
  text: string;
  headerText?: string;
  displayMode: 'MODAL' | 'PANEL';
}

// Immutable Message State
export type ISystemMessageImmutableState = ImmutableObject<
  ISystemMessageState[]
>;

/**
 * Availability State Interface
 */
export interface IAvailabilityState {
  timeRemainingFromEnd: number;
  timeRemaining: number;
  maintenanceStartingDate: Date; // Date of the beginning of maintenance
  maintenanceStopingDate: Date;
  backendAvailable: false; // the backend's services are available or not
  usersExcluded: Array<number>; // List of user Id that are allowed to use the app even if availability is false
}

// Immutable Availability State
export type IAvailabilityImmutableState = ImmutableObject<IAvailabilityState>;

/* ------------- Messages ------------- */

/**
 * Define RootState Interface
 */
export interface IRootState {
  authentication: AuthenticationImmutableStateType;
  availability: IAvailabilityImmutableState;
  loading: any;
  guard: any;
  layout: ILayoutImmutableState;
  system_messages: ISystemMessageImmutableState;
  parameters: IParametersImmutableState;
  users: IUsersImmutableStateType;
  settings: ISettingsImmutableStateType;
  customers: ICustomersImmutableStateType;
  casinos: ICasinosImmutableStateType;
  events: IEventsImmutableStateType;
  cashgames: ICashGamesImmutableStateType;
  players: IPlayersImmutableStateType;
}
