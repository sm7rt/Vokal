import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import FixtureEventsApi from '../../services/FixtureEventsApi';
import {
  createNewEvent,
  editEvent,
  editEventBanner,
  deleteEvent,
  fetchRunningEvents,
  fetchFinishedEvents
} from '../EventsSagas';
import EventsActions from '../../redux/EventsRedux';
import MessagesAction from '../../../../common/redux/SystemMessagesRedux';
import { select } from 'redux-saga/effects';
import { currentCasinoSelector } from '../../../authentication/redux/AuthenticationRedux';

// Testing fetchRunningEvents Middleware Success
test('fetchRunningEvents Middleware Success', () => {
  const filters = '';
  const page = 1;
  const size = 20;
  const Response = {
    status: 200,
    data: {
      content: [
        {
          id: '213423',
          name: 'PAPC'
        }
      ],
      last: true,
      totalElements: 21
    }
  };
  return expectSaga(fetchRunningEvents, FixtureEventsApi, {
    filters,
    page,
    size
  })
    .provide([
      [select(currentCasinoSelector), 'casinoId1'],
      [matchers.call.fn(FixtureEventsApi.fetchRunningEvents), Response]
    ])
    .put(
      EventsActions.fetchRunningEventsSuccessResponse(
        Response.data.content,
        filters,
        page,
        Response.data.last,
        Response.data.totalElements
      )
    )
    .run();
});

// Testing fetchFinishedEvents Middleware Success
test('fetchFinishedEvents Middleware Success', () => {
  const filters = '';
  const page = 1;
  const size = 20;
  const Response = {
    status: 200,
    data: {
      content: [
        {
          id: '213423',
          name: 'PAPC'
        }
      ],
      last: true,
      totalElements: 21
    }
  };
  return expectSaga(fetchFinishedEvents, FixtureEventsApi, {
    filters,
    page,
    size
  })
    .provide([
      [select(currentCasinoSelector), 'casinoId1'],
      [matchers.call.fn(FixtureEventsApi.fetchFinishedEvents), Response]
    ])
    .put(
      EventsActions.fetchFinishedEventsSuccessResponse(
        Response.data.content,
        filters,
        page,
        Response.data.last,
        Response.data.totalElements
      )
    )
    .run();
});
