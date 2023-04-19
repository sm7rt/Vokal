import { put, call, fork, all, cancelled, select } from 'redux-saga/effects';
import EventsActions from '../redux/EventsRedux';
import MessagesAction from '../../../common/redux/SystemMessagesRedux';
import { AnyAction } from 'redux';
import { currentCasinoSelector } from '../../authentication/redux/AuthenticationRedux';

// Type of Events Api
type EventsServiceType = {
  fetchRunningEvents: (
    casinoId: string,
    filters: Object,
    page: number,
    size: number
  ) => {};
  fetchFinishedEvents: (
    casinoId: string,
    filters: Object,
    page: number,
    size: number
  ) => {};
  fetchEventBanner: (eventId: string) => {};
  fetchEventDetails: (eventId: string) => {};
  fetchEventTourNumber: (eventId: string) => {};
  createNewEvent: (casinoId: string, formData: Object) => {};
  editEvent: (eventId: string, formData: Object) => {};
  deleteEvent: (Eventsid: string) => {};
  uploadBannerEvent: (eventId: string, imageData: Object) => {};
};

/**
 * Get Picture URL Of Events
 * @param {*} api Api to use
 * @param {*} eventId Id of Events
 */
function* fetchEventBannerURL(api: EventsServiceType, eventId: string) {
  // API Call
  const fetchEventBannerURLData = yield call(api.fetchEventBanner, eventId);
  if (fetchEventBannerURLData.status === 200) {
    yield put(
      EventsActions.fillEventBannerUrl(
        eventId,
        fetchEventBannerURLData.data.resizedUrl
      )
    );
  }
}

/**
 * Get Event Number Of Events
 * @param {*} api Api to use
 * @param {*} eventId Id of Events
 */
function* fetchEventTournamentNumber(api: EventsServiceType, eventId: string) {
  // API Call
  const fetchEventTourNumberData = yield call(
    api.fetchEventTourNumber,
    eventId
  );
  if (fetchEventTourNumberData.status === 200) {
    yield put(
      EventsActions.fillEventTourNumber(eventId, fetchEventTourNumberData.data)
    );
  }
}

/**
 * Fetch All info for an Event
 * @param api
 * @param eventId
 * @param event
 */
function* fetchEvent(
  api: EventsServiceType,
  eventId: string,
  event: GamesApiDefinitions.FestivalDocument
) {
  yield put(EventsActions.fetchEventRequest(eventId, event));

  // Get Event Banner
  yield fork(fetchEventBannerURL, api, eventId);

  // Get Event Event Number
  yield fork(fetchEventTournamentNumber, api, eventId);

  yield put(EventsActions.fetchEventSuccessResponse(eventId));
}

/**
 * fetchRunningEvents Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchRunningEvents(api: EventsServiceType, action: AnyAction) {
  const { filters, page, size } = action;
  try {
    // Get Current Casino Id
    const casinoId = yield select(currentCasinoSelector);

    const fetchRunningEventsResponse = yield call(
      api.fetchRunningEvents,
      casinoId,
      filters,
      page,
      size
    );
    if (fetchRunningEventsResponse.status === 200) {
      // Authentication Success
      yield put(
        EventsActions.fetchRunningEventsSuccessResponse(
          fetchRunningEventsResponse.data.content,
          filters,
          page,
          fetchRunningEventsResponse.data.last,
          fetchRunningEventsResponse.data.totalElements
        )
      );

      // Fetch Events Informations

      yield all(
        fetchRunningEventsResponse.data.content.map(
          (event: GamesApiDefinitions.FestivalDocument) =>
            fork(fetchEvent, api, event.id, event)
        )
      );

      // Load Image for All Events
    } else {
      yield put(
        EventsActions.fetchRunningEventsFailureResponse(
          fetchRunningEventsResponse.data
        )
      );
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(EventsActions.fetchRunningEventsCancelResponse());
    }
  }
}

/**
 * fetchFinishedEvents Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchFinishedEvents(
  api: EventsServiceType,
  action: AnyAction
) {
  const { filters, page, size } = action;
  try {
    // Get Current Casino Id
    const casinoId = yield select(currentCasinoSelector);

    const fetchFinishedEventsResponse = yield call(
      api.fetchFinishedEvents,
      casinoId,
      filters,
      page,
      size
    );

    if (fetchFinishedEventsResponse.status === 200) {
      // Authentication Success
      yield put(
        EventsActions.fetchFinishedEventsSuccessResponse(
          fetchFinishedEventsResponse.data.content,
          filters,
          page,
          fetchFinishedEventsResponse.data.last,
          fetchFinishedEventsResponse.data.totalElements
        )
      );

      // Fetch Events Informations

      yield all(
        fetchFinishedEventsResponse.data.content.map(
          (event: GamesApiDefinitions.FestivalDocument) =>
            fork(fetchEvent, api, event.id, event)
        )
      );

      // Load Image for All Events
    } else {
      yield put(
        EventsActions.fetchFinishedEventsFailureResponse(
          fetchFinishedEventsResponse.data
        )
      );
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(EventsActions.fetchFinishedEventsCancelResponse());
    }
  }
}
/**
 * Create New Events Middleware
 * @param {*} api
 * @param {*} action
 */
export function* createNewEvent(api: EventsServiceType, action: AnyAction) {
  const { casinoId, formData } = action;

  const event: any = {
    name: formData.name,
    website: formData.website,
    startDate: formData.startDate,
    endDate: formData.endDate,
    casinoId
  };

  // We Launch A create Events Post Call
  const createNewEventData = yield call(api.createNewEvent, casinoId, event);

  if (createNewEventData.status === 201) {
    // We Get Fetival Id IN LOCATION PROPERTY
    const split = createNewEventData.headers.location.split('/');
    const eventId = split[split.length - 1];

    // Success Create Events
    const fetchEventDetailData = yield call(api.fetchEventDetails, eventId);
    const event = fetchEventDetailData.data;

    // When We have the result we post the Banner
    if (formData.banner) {
      const imageData = new FormData();
      imageData.append('image', formData.banner.file);
      // Upload the Banner
      const uploadBannerEventsData = yield call(
        api.uploadBannerEvent,
        eventId,
        imageData
      );
      if (uploadBannerEventsData.status === 201) {
        // Success Upload Banner
        // We will find the Good URL

        yield fork(fetchEvent, api, event.id, event);
      }
    } else {
      yield fork(fetchEvent, api, event.id, event);
    }
    yield put(EventsActions.createEventSuccessResponse(eventId));
    yield put(
      MessagesAction.addMessage(
        'CREATE_EVENT_SUCCESS',
        'SUCCESS',
        `Your event was successfully created.`,
        '',
        'PANEL'
      )
    );
  } else {
    yield put(
      EventsActions.createEventFailureResponse(createNewEventData.data)
    );
    yield put(
      MessagesAction.addMessage(
        'CREATE_EVENT_ERROR',
        'ERROR',
        `An error Occured, while trying to create this event. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Edit  Events Middleware
 * @param {*} api
 * @param {*} action
 */
export function* editEvent(api: EventsServiceType, action: AnyAction) {
  const { id, formData } = action;
  // API Call
  const editEventData = yield call(api.editEvent, id, formData);
  if (editEventData.status === 200) {
    // We Get New Events Info
    const fetchEventData = yield call(api.fetchEventDetails, id);

    if (fetchEventData.status === 200) {
      yield put(
        EventsActions.editEventSuccessResponse(id, fetchEventData.data)
      );

      yield put(
        MessagesAction.addMessage(
          'EDIT_EVENT_SUCCESS',
          'SUCCESS',
          `Your event was successfully updated.`,
          '',
          'PANEL'
        )
      );
    }
  } else {
    yield put(EventsActions.editEventFailureResponse(id));

    yield put(
      MessagesAction.addMessage(
        'EDIT_EVENT_ERROR',
        'ERROR',
        `An error Occured, while trying to update this event. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Edit Events Banner Middleware
 * @param {*} api
 * @param {*} action
 */
export function* editEventBanner(api: EventsServiceType, action: AnyAction) {
  const { id, formData } = action;

  // When We have the result we post the Banner
  if (formData.banner) {
    const imageData = new FormData();
    imageData.append('image', formData.banner.file);
    // Upload the Banner
    const uploadBannerEventData = yield call(
      api.uploadBannerEvent,
      id,
      imageData
    );
    if (uploadBannerEventData.status === 201) {
      // Success Upload Banner
      // We will find the Good URL
      yield fork(fetchEventBannerURL, api, id);

      yield put(EventsActions.editEventBannerSuccessResponse(id));

      yield put(
        MessagesAction.addMessage(
          'EDIT_EVENT_BANNER_SUCCESS',
          'SUCCESS',
          `Your banner was successfully uploaded.`,
          '',
          'PANEL'
        )
      );
    } else {
      yield put(EventsActions.editEventBannerFailureResponse(id));

      yield put(
        MessagesAction.addMessage(
          'EDIT_EVENT_BANNER_ERROR',
          'ERROR',
          `An error Occured, while trying to upload the new banner. Please Contact your administrator.`,
          '',
          'PANEL'
        )
      );
    }
  }
}

/**
 * Delete  Events Middleware
 * @param {*} api
 * @param {*} action
 */
export function* deleteEvent(api: EventsServiceType, action: AnyAction) {
  const { id } = action;
  // API Call
  const deleteEventslData = yield call(api.deleteEvent, id);
  if (deleteEventslData.status === 204) {
    yield put(EventsActions.deleteEventSuccessResponse(id));

    yield put(
      MessagesAction.addMessage(
        'DELETE_EVENT_SUCCESS',
        'SUCCESS',
        `Your event was successfully deleted.`,
        '',
        'PANEL'
      )
    );
  } else {
    yield put(EventsActions.deleteEventFailureResponse(id));

    yield put(
      MessagesAction.addMessage(
        'DELETE_EVENT_ERROR',
        'ERROR',
        `An error Occured, while trying to delete this event. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Get Detail Of event
 * @param {*} api Api to use
 * @param {*} eventId of Festival
 */
export function* fetchEventDetails(api: EventsServiceType, actions: AnyAction) {
  const { id } = actions;
  // API Call
  const fetchEventDetailResponse = yield call(api.fetchEventDetails, id);
  if (fetchEventDetailResponse.status === 200) {
    yield fork(fetchEvent, api, id, fetchEventDetailResponse.data);
  }
  yield put(EventsActions.fetchEventDetailsSuccessResponse(id));
}
