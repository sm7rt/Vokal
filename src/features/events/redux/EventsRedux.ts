import { AnyAction } from 'redux';
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { IRootState } from '../../../common/models/StateModel.d';
import { handlePageableResultWithPathReducer } from '../../../common/redux/ReducerUtils';
import {
  generateFetchAction,
  generateFetchPageableAction
} from '../../../redux/util';
import { IEventsImmutableStateType } from '../models/EventsModel.d';
import {
  TournamentsActions,
  TournamentsReducer
} from '../sub-domains/tournaments/redux/TournamentsRedux';
import { createImmutableEqualSelector } from '../../../redux/selector/custom-selector';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  /******************* */
  /******* Events ******/
  /******************* */

  // Simple Action
  fillEventBannerUrl: ['id', 'resizeUrl'],
  fillEventTourNumber: ['id', 'eventNumber'],

  // Fetch Action
  ...generateFetchPageableAction('fetchRunningEvents'),
  ...generateFetchPageableAction('fetchFinishedEvents'),
  ...generateFetchAction('fetchEvent', ['id', 'event'], ['id'], ['id'], ['id']),
  ...generateFetchAction('fetchEventDetails', ['id'], ['id'], ['id'], ['id']),
  ...generateFetchAction('createEvent', ['casinoId', 'formData'], ['eventId']),
  ...generateFetchAction('editEvent', ['id', 'formData'], ['id', 'event']),
  ...generateFetchAction('editEventBanner', ['id', 'formData'], ['id']),
  ...generateFetchAction('deleteEvent', ['id'], ['id']),

  /******************* */
  /**** Tournaments ****/
  /******************* */
  ...TournamentsActions
});

export const EventsTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: IEventsImmutableStateType = Immutable({
  runningEvents: {
    // RunningEvents part
    listIds: [],
    page: 1,
    last: false,
    size: 20,
    totalElements: 0
  },
  finishedEvents: {
    // FinishedEvents part
    listIds: [],
    page: 1,
    last: false,
    size: 20,
    totalElements: 0
  },
  list: [], // List of Events
  // Tournaments
  tournamentList: [], // List of tournament
  eventTournamentLinks: [] // Link between event and Tournaments
});

/* ------------- Reducers ------------- */
/**
 * Add a Event to the list
 */
export const addEventToList = (
  state: IEventsImmutableStateType,
  { id, event }: AnyAction
) => {
  const indexOfList = state.list.findIndex(
    (e: GamesApiDefinitions.FestivalDocument) => e.id === id
  );
  // If Event exist we replace it
  if (indexOfList !== -1) {
    // Keep Image URI and Tournament Number
    event.imageURI = state.list[indexOfList].imageURI;
    event.eventNumber = state.list[indexOfList].eventNumber;
    return state.setIn(['list', indexOfList], event);
  }
  // Else we add it
  return state.merge({ list: [...state.list, event] });
};

/**
 * Handle Running Events Reducer
 */
export const handleRunningEventsReducer = (
  state: IEventsImmutableStateType,
  action: AnyAction
) => {
  return handlePageableResultWithPathReducer(state, action, ['runningEvents']);
};

/**
 * Handle Finished Events Reducer
 */
export const handleFinishedEventsReducer = (
  state: IEventsImmutableStateType,
  action: AnyAction
) => {
  return handlePageableResultWithPathReducer(state, action, ['finishedEvents']);
};

/**
 * Fill Event Banner Url
 */
export const fillEventBannerUrl = (
  state: IEventsImmutableStateType = INITIAL_STATE,
  { id, resizeUrl }: AnyAction
) => {
  const indexOfList = state.list.findIndex(
    (e: GamesApiDefinitions.FestivalDocument) => e.id === id
  );
  return state.setIn(['list', indexOfList, 'imageURI'], resizeUrl);
};

/**
 * Fill Event Tournament Number
 */
export const fillEventTourNumber = (
  state: IEventsImmutableStateType = INITIAL_STATE,
  { id, eventNumber }: AnyAction
) => {
  const indexOfList = state.list.findIndex(
    (e: GamesApiDefinitions.FestivalDocument) => e.id === id
  );
  return state.setIn(['list', indexOfList, 'eventNumber'], eventNumber);
};

/**
 * Delete Event Callback
 */
export const deleteEventCallBack = (
  state: IEventsImmutableStateType,
  { id }: AnyAction
) => {
  return state
    .merge({
      list: state.list.filter(
        (e: GamesApiDefinitions.FestivalDocument) => e.id !== id
      )
    })
    .setIn(
      ['runningEvents', 'listIds'],
      state.runningEvents.listIds.filter((s: string) => s !== id)
    )
    .setIn(
      ['finishedEvents', 'listIds'],
      state.finishedEvents.listIds.filter((s: string) => s !== id)
    );
};

/**
 * Add a to Running Event  list
 */
export const addEventToRunningEventList = (
  state: any,
  { eventId }: AnyAction
) => {
  return state.setIn(
    ['runningEvents', 'listIds'],
    [...state.runningEvents.listIds, eventId]
  );
};

/**
 * Edit Event Callback
 */
export const editEventCallBack = (state: any, { id, event }: AnyAction) => {
  const indexOfList = state.list.findIndex(
    (e: GamesApiDefinitions.FestivalDocument) => e.id === id
  );
  // Keep Image URI and Event Number
  event.imageURI = state.list[indexOfList].imageURI;
  event.eventNumber = state.list[indexOfList].eventNumber;
  return state.setIn(['list', indexOfList], event);
};

/* ------------- Hookup Reducers To Types ------------- */
// Events Reducer
export const reducer = createReducer<IEventsImmutableStateType>(INITIAL_STATE, {
  [Types.FETCH_EVENT_REQUEST]: addEventToList,
  [Types.FILL_EVENT_BANNER_URL]: fillEventBannerUrl,
  [Types.FILL_EVENT_TOUR_NUMBER]: fillEventTourNumber,
  [Types.FETCH_RUNNING_EVENTS_SUCCESS_RESPONSE]: handleRunningEventsReducer,
  [Types.FETCH_FINISHED_EVENTS_SUCCESS_RESPONSE]: handleFinishedEventsReducer,
  [Types.CREATE_EVENT_SUCCESS_RESPONSE]: addEventToRunningEventList,
  [Types.DELETE_EVENT_SUCCESS_RESPONSE]: deleteEventCallBack,
  [Types.EDIT_EVENT_SUCCESS_RESPONSE]: editEventCallBack,
  ...TournamentsReducer(Types)
});

/* ------------- Selectors ------------- */

/********* Get Event from EventID **********/
const eventSelector = (state: IRootState, id: string) =>
  state.events.list.find(
    (e: GamesApiDefinitions.FestivalDocument) => e.id === id
  );

const eventDefault = {
  id: '',
  name: ''
};

export const eventFromListSelector = createImmutableEqualSelector(
  [eventSelector],
  event => event || eventDefault
);

export const eventsListSelector = (
  state: IRootState,
  type: 'RUNNING' | 'FINISHED'
) =>
  type === 'RUNNING' ? state.events.runningEvents : state.events.finishedEvents;
