import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
  createNewEvent,
  editEvent,
  editEventBanner,
  deleteEvent,
  fetchRunningEvents,
  fetchFinishedEvents,
  fetchEventDetails
} from './EventsSagas';
import DebugConfig from '../../../config/DebugConfig';

/* ------------- Types ------------- */
import { EventsTypes } from '../redux/EventsRedux';
import FixtureEventsApi from '../services/FixtureEventsApi';
import EventsApi from '../services/EventsApi';
import FixtureTournamentsApi from '../sub-domains/tournaments/services/FixtureTournamentsApi';
import TournamentsApi from '../sub-domains/tournaments/services/TournamentsApi';
import {
  fetchTournamentList,
  createTournament,
  fetchTournamentDetails,
  deleteTournament,
  updateTournamentStructure,
  uploadSchedule,
  updateTournamentInformations,
  updateTournamentFormat
} from '../sub-domains/tournaments/sagas/TournamentsSagas';

/* ------------- Sagas ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureEventsApi : EventsApi.create();

const tournamentApi = DebugConfig.useFixtures
  ? FixtureTournamentsApi
  : TournamentsApi.create();

// List of Sagas Handler
const eventSagas = [
  /*****************************/
  /*********** EVENT ***********/
  /*****************************/

  // Fetch Running Event
  takeLatest(EventsTypes.FETCH_RUNNING_EVENTS_REQUEST, fetchRunningEvents, api),

  // Fetch Finished Event
  takeLatest(
    EventsTypes.FETCH_FINISHED_EVENTS_REQUEST,
    fetchFinishedEvents,
    api
  ),
  // Fetch Event Details
  takeLatest(EventsTypes.FETCH_EVENT_DETAILS_REQUEST, fetchEventDetails, api),

  // Create a New Event
  takeLatest(EventsTypes.CREATE_EVENT_REQUEST, createNewEvent, api),

  // Edit Event
  takeLatest(EventsTypes.EDIT_EVENT_REQUEST, editEvent, api),

  // Edit Event Banner
  takeLatest(EventsTypes.EDIT_EVENT_BANNER_REQUEST, editEventBanner, api),

  // Delete Event
  takeLatest(EventsTypes.DELETE_EVENT_REQUEST, deleteEvent, api),

  /*****************************/
  /******** TOURNAMENTS ********/
  /*****************************/
  // Fetch Event Tournaments
  takeEvery(
    EventsTypes.FETCH_EVENT_TOURNAMENTS_REQUEST,
    fetchTournamentList,
    tournamentApi
  ),

  // Fetch Tournament Details
  takeEvery(
    EventsTypes.FETCH_TOURNAMENT_DETAILS_REQUEST,
    fetchTournamentDetails,
    tournamentApi
  ),

  // Upload Schedule
  takeEvery(EventsTypes.UPLOAD_SCHEDULE_REQUEST, uploadSchedule, tournamentApi),

  // Create Tournament
  takeEvery(
    EventsTypes.CREATE_TOURNAMENT_REQUEST,
    createTournament,
    tournamentApi
  ),

  // Delete Tournament
  takeLatest(
    EventsTypes.DELETE_TOURNAMENT_REQUEST,
    deleteTournament,
    tournamentApi
  ),

  // Update Tournament Information
  takeLatest(
    EventsTypes.UPDATE_TOURNAMENT_INFORMATION_REQUEST,
    updateTournamentInformations,
    tournamentApi
  ),

  // Update Tournament Format
  takeLatest(
    EventsTypes.UPDATE_TOURNAMENT_FORMAT_REQUEST,
    updateTournamentFormat,
    tournamentApi
  ),

  // Update Tournament Structure
  takeLatest(
    EventsTypes.UPDATE_TOURNAMENT_STRUCTURE_REQUEST,
    updateTournamentStructure,
    tournamentApi
  )
];

// Export Default
export default eventSagas;
