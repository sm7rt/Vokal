import { ImmutableObject } from 'seamless-immutable';
import { PageableStateType } from '../../../common/models/index.d';

// ******************************** //
// *********** Template  ************ //
// ******************************** //

export type TournamentScheduleType = {
  date: string;
  startTime: string;
  lateRegLevels: string;
  eventNumber: string;
  name: string;
  gameVariant: string;
  buyIn: string;
  fee: string;
  takeout: string;
  takeOut: string;
  currency: string;
  startStack: string;
  reEntry: string;
};

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

/**
 * Link Between Event and Tournament Type
 */
export type LinkEventTournamentsType = {
  eventId: string; // Event Id
  tournamentIds: {
    [key: string]: Array<string>;
  }; // List of tournamentId grouped by date
  filters: any;
  page: number;
  last: boolean;
};

/**
 * Events State Type
 */
type EventsStateType = {
  runningEvents: PageableStateType<void>;
  finishedEvents: PageableStateType<void>;
  list: Array<GamesApiDefinitions.FestivalDocument>;
  tournamentList: Array<GamesApiDefinitions.LiveTournamentDocument>;
  eventTournamentLinks: Array<LinkEventTournamentsType>;
};

export type IEventsImmutableStateType = ImmutableObject<EventsStateType>;

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type EventsServiceType = {};
