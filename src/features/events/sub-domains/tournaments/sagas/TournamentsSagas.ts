import { AnyAction } from 'redux';
import {
  all,
  call,
  cancelled,
  fork,
  put,
  select,
  take
  // delay
} from 'redux-saga/effects';
import MessagesAction from '../../../../../common/redux/SystemMessagesRedux';
import { currentCasinoSelector } from '../../../../authentication/redux/AuthenticationRedux';
import { casinoFromListSelector } from '../../../../casinos/redux/CasinosRedux';
import EventsActions, {
  eventFromListSelector
} from '../../../redux/EventsRedux';
import { tournamentFromListSelector } from '../redux/TournamentsRedux';

/**
 * Delete a tournament
 * @param {*} api Api to use
 * @param {*} action
 */
export function* deleteTournament(api: any, action: AnyAction) {
  const { eventId, tournamentId } = action;
  // API Call
  const deleteTournamentData = yield call(
    api.deleteTournament,
    eventId,
    tournamentId
  );
  if (deleteTournamentData.status === 204) {
    yield put(
      EventsActions.deleteTournamentSuccessResponse(eventId, tournamentId)
    );
    yield put(
      MessagesAction.addMessage(
        'DELETE_TOURNAMENT_SUCCESS',
        'SUCCESS',
        `Your tournament was successfully deleted.`,
        '',
        'PANEL'
      )
    );
  } else {
    yield put(EventsActions.deleteTournamentFailureResponse());
    yield put(
      MessagesAction.addMessage(
        'DELETE_TOURNAMENT_ERROR',
        'ERROR',
        `An error Occured, while trying to delete this tournament. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}

/**
 * fetch Tournament Middleware
 * @param api
 * @param eventId
 * @param tournamentId
 * @param tournament
 */
function* fetchTournament(
  api: any,
  eventId: string,
  tournamentId: string,
  tournament: GamesApiDefinitions.LiveTournamentDocument
) {
  yield put(
    EventsActions.fetchEventTournamentRequest(tournamentId, tournament)
  );

  // Put here some deffered loading

  yield put(EventsActions.fetchEventTournamentSuccessResponse());
}

/**
 * fetchTournamentList Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchTournamentList(api: any, action: AnyAction) {
  const { eventId, filters, page, size } = action;
  try {
    // Check if event is loaded
    const event = yield select(eventFromListSelector, eventId);
    // We Fetch Festival Info
    if (!event.id || event.id.length < 1) {
      // Fetch Event Details
      yield put(EventsActions.fetchEventDetailsRequest(eventId));
    }

    const fetchTournamentsResponse = yield call(
      api.fetchTournaments,
      eventId,
      filters,
      page,
      size
    );
    if (fetchTournamentsResponse.status === 200) {
      const tournamentList = fetchTournamentsResponse.data.content;

      // Fork Fetch Tournament
      yield all(
        tournamentList.map(
          (tournament: GamesApiDefinitions.LiveTournamentDocument) =>
            fork(fetchTournament, api, eventId, tournament.id, tournament)
        )
      );

      // Authentication Success
      yield put(
        EventsActions.fetchEventTournamentsSuccessResponse(
          eventId,
          tournamentList,
          filters,
          page,
          fetchTournamentsResponse.data.last,
          fetchTournamentsResponse.data.totalElements
        )
      );
    } else {
      // Manage Error
      yield put(EventsActions.fetchEventTournamentsFailureResponse());
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(EventsActions.fetchEventTournamentsCancelResponse());
    }
  }
}

export function* uploadSchedule(api: any, action: AnyAction) {
  const { eventId, data } = action;
  let cptTournament = 0;

  // We launch all the create Tournament Request
  yield all(
    data.map((d: any) => {
      cptTournament = cptTournament + 1;
      return put(EventsActions.createTournamentRequest(eventId, d));
    })
  );

  do {
    yield take('CREATE_TOURNAMENT_SUCCESS_RESPONSE');
    cptTournament = cptTournament - 1;
  } while (cptTournament > 0);

  yield put(EventsActions.uploadScheduleSuccessResponse());
  // We wait for all task are finish (Idea : Use Loading Redux)
  yield put(
    MessagesAction.addMessage(
      'UPLOAD_SCHEDULE_SUCCESS',
      'SUCCESS',
      `Your schedule was successfully imported.`,
      '',
      'PANEL'
    )
  );
}

/**
 * Create a new Tournament
 * @param {*} api Api to use
 * @param {*} action Redux Action
 */
export function* createTournament(api: any, action: AnyAction) {
  const { eventId, data } = action;

  // Get Casino Name and add it to Data
  const casinoId = yield select(currentCasinoSelector);
  const casino = yield select(casinoFromListSelector, casinoId);

  // API Call
  const createTournamentResponse = yield call(api.createTournament, eventId, {
    casino: casino.name,
    ...data
  });
  if (createTournamentResponse.status === 201) {
    // We Get TournamentId Id IN LOCATION PROPERTY
    const split = createTournamentResponse.headers.location.split('/');
    const tournamentId = split[split.length - 1];

    if (data.format) {
      // API Call
      const updateTournamentFormatResponse = yield call(
        api.updateTournamentFormat,
        eventId,
        tournamentId,
        data.format
      );
      if (updateTournamentFormatResponse.status === 200) {
        // Get All Tournament Data
        yield put(
          EventsActions.fetchTournamentDetailsRequest(eventId, tournamentId)
        );

        // Send a Success Response
        yield put(
          EventsActions.createTournamentSuccessResponse(
            eventId,
            tournamentId,
            data
          )
        );
      }
    } else {
      // Get All Tournament Data
      yield put(
        EventsActions.fetchTournamentDetailsRequest(eventId, tournamentId)
      );

      // Send a Success Response
      yield put(
        EventsActions.createTournamentSuccessResponse(
          eventId,
          tournamentId,
          data
        )
      );
    }
  } else {
    EventsActions.createTournamentFailureResponse();
  }
}

/**
 * fetchTournamentDetails Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchTournamentDetails(api: any, action: AnyAction) {
  const { eventId, tournamentId } = action;

  // Check if event is loaded
  const event = yield select(eventFromListSelector, eventId);
  // We Fetch Festival Info
  if (!event.id || event.id.length < 1) {
    // Fetch Event Details
    yield put(EventsActions.fetchEventDetailsRequest(eventId));
  }

  const fetchTournamentDetailsResponse = yield call(
    api.fetchTournamentDetails,
    eventId,
    tournamentId
  );

  if (fetchTournamentDetailsResponse.status === 200) {
    const tournamentData = fetchTournamentDetailsResponse.data;

    // Fork to Fetch Tournament
    yield fork(
      fetchTournament,
      api,
      eventId,
      tournamentData.id,
      tournamentData
    );

    yield put(EventsActions.fetchTournamentDetailsSuccessResponse());
  } else {
    // Manage Error
    yield put(EventsActions.fetchTournamentDetailsFailureResponse());
  }
}

/**
 * Update Tournament Informations
 * @param {*} api Api to use
 * @param {*} action Redux Action
 */
export function* updateTournamentInformations(api: any, action: any) {
  const { eventId, tournamentId, data } = action;
  // API Call
  const updateTournamentInformationsResponse = yield call(
    api.updateTournamentInformations,
    eventId,
    tournamentId,
    data
  );
  if (updateTournamentInformationsResponse.status === 200) {
    // Fetch Tournaments Information
    yield put(
      EventsActions.fetchTournamentDetailsRequest(eventId, tournamentId)
    );

    yield put(
      EventsActions.updateTournamentInformationSuccessResponse(
        eventId,
        tournamentId
      )
    );
    yield put(
      MessagesAction.addMessage(
        'INFORMATION_TOURNAMENT_SUCCESS',
        'SUCCESS',
        `Your tournament was successfully updated.`,
        '',
        'PANEL'
      )
    );
  } else {
    EventsActions.updateTournamentInformationFailureResponse(eventId);
    yield put(
      MessagesAction.addMessage(
        'INFORMATION_TOURNAMENT_ERROR',
        'ERROR',
        `An error Occured, while trying to update the information of this tournament. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Update Tournament Format
 * @param {*} api Api to use
 * @param {*} action Redux Action
 */
export function* updateTournamentFormat(api: any, action: any) {
  const { eventId, tournamentId, data } = action;

  // API Call
  const updateTournamentFormatResponse = yield call(
    api.updateTournamentFormat,
    eventId,
    tournamentId,
    data
  );
  if (updateTournamentFormatResponse.status === 200) {
    // Fetch Tournaments Information
    yield put(
      EventsActions.fetchTournamentDetailsRequest(eventId, tournamentId)
    );

    yield put(
      EventsActions.updateTournamentFormatSuccessResponse(eventId, tournamentId)
    );
    yield put(
      MessagesAction.addMessage(
        'FORMAT_TOURNAMENT_SUCCESS',
        'SUCCESS',
        `Your tournament was successfully updated.`,
        '',
        'PANEL'
      )
    );
  } else {
    EventsActions.updateTournamentFormatFailureResponse(eventId);
    yield put(
      MessagesAction.addMessage(
        'FORMAT_TOURNAMENT_ERROR',
        'ERROR',
        `An error Occured, while trying to update the format of this tournament. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Update Tournament Structure
 * @param {*} api Api to use
 * @param {*} action Redux Action
 */
export function* updateTournamentStructure(api: any, action: any) {
  const { eventId, tournamentId } = action;

  const data = yield select(tournamentFromListSelector, tournamentId);

  // API Call
  const updateTournamentData = yield call(
    api.updateTournamentStructure,
    eventId,
    tournamentId,
    {
      tournamentStructure: {
        levels: data.tournamentStructure.levels
      }
    }
  );
  if (updateTournamentData.status === 200) {
    yield put(EventsActions.updateTournamentStructureSuccessResponse());

    yield put(
      MessagesAction.addMessage(
        'STRUCTURE_UPLOAD_TOURNAMENT_SUCCESS',
        'SUCCESS',
        `Your structure was successfully uploaded.`,
        '',
        'PANEL'
      )
    );
  } else {
    EventsActions.updateTournamentStructureFailureResponse(EventsActions);
    yield put(
      MessagesAction.addMessage(
        'STRUCTURE_UPLOAD_TOURNAMENT_ERROR',
        'ERROR',
        `An error Occured, while trying to upload the structure to this tournament. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}
