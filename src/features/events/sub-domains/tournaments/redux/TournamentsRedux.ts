import { AnyAction } from 'redux';
import { IRootState } from '../../../../../common/models/StateModel.d';
import {
  generateFetchAction,
  generateFetchPageableAction
} from '../../../../../redux/util';
import {
  IEventsImmutableStateType,
  LinkEventTournamentsType
} from '../../../models/EventsModel.d';
import { createImmutableEqualSelector } from '../../../../../redux/selector/custom-selector';

/* ------------- Types and Action Creators ------------- */

export const TournamentsActions = {
  /******************* */
  /**** Tournaments ****/
  /******************* */
  fillTournamentPlayersNumber: ['tournamentId', 'playersNumber'],
  ...generateFetchPageableAction(
    'fetchEventTournaments',
    ['eventId'],
    ['eventId']
  ),
  ...generateFetchAction(
    'fetchEventTournament',
    ['tournamentId', 'tournament'],
    []
  ),
  ...generateFetchAction(
    'deleteTournament',
    ['eventId', 'tournamentId'],
    ['eventId', 'tournamentId']
  ),
  ...generateFetchAction(
    'createTournament',
    ['eventId', 'data'],
    ['eventId', 'tournamentId', 'data']
  ),
  ...generateFetchAction(
    'uploadSchedule',
    ['eventId', 'data'],
    ['eventId', 'tournamentId', 'data']
  ),
  ...generateFetchAction(
    'fetchTournamentDetails',
    ['eventId', 'tournamentId'],
    []
  ),
  ...generateFetchAction(
    'updateTournamentInformation',
    ['eventId', 'tournamentId', 'data'],
    ['eventId', 'tournamentId', 'data']
  ),
  ...generateFetchAction(
    'updateTournamentFormat',
    ['eventId', 'tournamentId', 'data'],
    ['eventId', 'tournamentId', 'data']
  ),
  ...generateFetchAction(
    'updateTournamentStructure',
    ['eventId', 'tournamentId'],
    ['eventId', 'tournamentId']
  ),
  importStructure: ['eventId', 'tournamentId', 'data']
};

/* ------------- Reducers ------------- */
/**
 * Add a Tournament to the list
 */
export const addTournamentToList = (
  state: IEventsImmutableStateType,
  { tournamentId, tournament }: AnyAction
) => {
  const indexOfList = state.tournamentList.findIndex(
    (t: GamesApiDefinitions.LiveTournamentDocument) => t.id === tournamentId
  );
  // If Post exist we replace it
  if (indexOfList !== -1) {
    return state.setIn(['tournamentList', indexOfList], tournament);
  }
  // Else we add it
  return state.merge({ tournamentList: [...state.tournamentList, tournament] });
};

const handlePageableResultTournament = (
  state: IEventsImmutableStateType,
  {
    data, // The list
    filters, // Current filter
    page, // Current Page
    last, // Indicator of last page reached
    totalElements
  }: AnyAction,
  path: Array<string>
): IEventsImmutableStateType => {
  // If it's the first page
  return state.setIn(path, {
    tournamentIds: data.map(
      (item: GamesApiDefinitions.LiveTournamentDocument) => item.id
    ),
    filters,
    page: page + 1,
    last,
    totalElements
  });
};

/**
 * Handle Tournaments Events Reducer
 */
export const handleEventTournamentsReducer = (
  state: IEventsImmutableStateType,
  action: AnyAction
) => {
  const { eventId } = action;
  // Look if eventTournamentLinks for this event Exist
  const indexOfList = state.eventTournamentLinks.findIndex(
    (e: LinkEventTournamentsType) => e.eventId === eventId
  );
  if (indexOfList !== -1) {
    return handlePageableResultTournament(state, action, [
      'eventTournamentLinks',
      indexOfList
    ]).setIn(['eventTournamentLinks', indexOfList, 'eventId'], eventId);
  }

  // Else we add the link a the last place
  return handlePageableResultTournament(state, action, [
    'eventTournamentLinks',
    state.eventTournamentLinks.length
  ]).setIn(
    ['eventTournamentLinks', state.eventTournamentLinks.length, 'eventId'],
    eventId
  );
};

/**
 * Fill Tournament Players Number
 */
export const fillTournamentPlayersNumber = (
  state: IEventsImmutableStateType,
  { tournamentId, playersNumber }: AnyAction
) => {
  const indexOfList = state.tournamentList.findIndex(
    (t: GamesApiDefinitions.LiveTournamentDocument) => t.id === tournamentId
  );
  return state.setIn(
    ['tournamentList', indexOfList, 'playersNumber'],
    playersNumber
  );
};

/**
 * Delete Tournament Callback
 */
export const deleteTournamentCallBack = (
  state: IEventsImmutableStateType,
  { eventId, tournamentId }: AnyAction
) => {
  const indexOfTournamentLinks = state.eventTournamentLinks.findIndex(
    (e: LinkEventTournamentsType) => e.eventId === eventId
  );

  if (indexOfTournamentLinks !== -1) {
    // Manage EventTournamentLinks
    const eventTournamentLinks =
      state.eventTournamentLinks[indexOfTournamentLinks].tournamentIds;

    // Remove From TournamentList and Remove ID from EventTournamentsLink
    return state
      .merge({
        tournamentList: state.tournamentList.filter(
          (t: GamesApiDefinitions.LiveTournamentDocument) =>
            t.id !== tournamentId
        )
      })
      .setIn(
        ['eventTournamentLinks', indexOfTournamentLinks, 'tournamentIds'],
        eventTournamentLinks.filter((id: string) => id !== tournamentId)
      );
  }
  // Remove From TournamentList and Remove ID from EventTournamentsLink
  return state.merge({
    tournamentList: state.tournamentList.filter(
      (t: GamesApiDefinitions.LiveTournamentDocument) => t.id !== tournamentId
    )
  });
};

/**
 * Create Tournament Callback
 */
export const createTournamentCallBack = (
  state: IEventsImmutableStateType,
  { eventId, tournamentId, data }: AnyAction
) => {
  const indexOfTournamentLinks = state.eventTournamentLinks.findIndex(
    (e: LinkEventTournamentsType) => e.eventId === eventId
  );

  // Format Date of tournament
  const previousTournamentId =
    state.eventTournamentLinks[indexOfTournamentLinks].tournamentIds;

  // Add Tournament to tournament List
  if (previousTournamentId) {
    return state.setIn(
      ['eventTournamentLinks', indexOfTournamentLinks, 'tournamentIds'],
      [...previousTournamentId, tournamentId]
    );
  } else {
    return state.setIn(
      ['eventTournamentLinks', indexOfTournamentLinks, 'tournamentIds'],
      [tournamentId]
    );
  }
};

/**
 * Import Structure Callback
 */
export const importStructureCallBack = (
  state: IEventsImmutableStateType,
  { eventId, tournamentId, data }: AnyAction
) => {
  const indexOfList = state.tournamentList.findIndex(
    (t: GamesApiDefinitions.LiveTournamentDocument) => t.id === tournamentId
  );
  // If Post exist we replace it
  if (indexOfList !== -1) {
    return state
      .setIn(
        ['tournamentList', indexOfList, 'tournamentStructure', 'levels'],
        data
      )
      .setIn(['tournamentList', indexOfList, 'structureUpdated'], true);
  }
  return state;
};

/* ------------- Hookup Reducers To Types ------------- */
// Tournaments Reducer
export const TournamentsReducer = (Types: any) => ({
  [Types.FETCH_EVENT_TOURNAMENT_REQUEST]: addTournamentToList,
  [Types.FETCH_EVENT_TOURNAMENTS_SUCCESS_RESPONSE]: handleEventTournamentsReducer,
  [Types.FILL_TOURNAMENT_PLAYERS_NUMBER]: fillTournamentPlayersNumber,
  [Types.DELETE_TOURNAMENT_SUCCESS_RESPONSE]: deleteTournamentCallBack,
  [Types.CREATE_TOURNAMENT_SUCCESS_RESPONSE]: createTournamentCallBack,
  [Types.IMPORT_STRUCTURE]: importStructureCallBack
});

/* ------------- Selectors ------------- */
/********* Get Tournament from TournamentID **********/
const tournamentSelector = (state: IRootState, tournamentId: string) =>
  state.events.tournamentList.find(
    (t: GamesApiDefinitions.LiveTournamentDocument) => t.id === tournamentId
  );

export const tournamentFromListSelector = createImmutableEqualSelector(
  [tournamentSelector],
  tournament => tournament
);

/********* Get Tournament Links from EventID **********/
const tournamentsLinkSelector = (state: IRootState, eventId: string) =>
  state.events.eventTournamentLinks.find(
    (eventLink: LinkEventTournamentsType) => eventLink.eventId === eventId
  );

const tournamentLinkDefault = {
  eventId: '',
  tournamentIds: [], // List of tournamentId
  filters: {},
  page: 1,
  last: false
};

export const eventTournamentLinkSelector = createImmutableEqualSelector(
  [tournamentsLinkSelector],
  tournamentsLink => tournamentsLink || tournamentLinkDefault
);

/********* Get Tournament Links from EventID **********/
const tournamentsLinkWithData = (
  state: IRootState,
  eventId: string,
  date: string
) => {
  // Get Tournament Links
  const tournamentLinks = state.events.eventTournamentLinks.find(
    (eventLink: LinkEventTournamentsType) => eventLink.eventId === eventId
  );

  if (tournamentLinks) {
    let tournaments = [];
    if (tournamentLinks.tournamentIds) {
      // Select Tournament from id
      tournaments = tournamentLinks.tournamentIds.map(
        (id: string) => tournamentFromListSelector(state, id) || {}
      );
    }

    return {
      ...tournamentLinks,
      tournaments
    };
  }
};

export const tournamentsLinkWithDataSelector = createImmutableEqualSelector(
  [tournamentsLinkWithData],
  tournamentsLink => tournamentsLink || tournamentLinkDefault
);
