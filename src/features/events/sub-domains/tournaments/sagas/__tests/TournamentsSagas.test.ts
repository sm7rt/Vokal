import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import FixtureTournamentsApi from '../../services/FixtureTournamentsApi';
import {
  fetchTournamentList,
  deleteTournament,
  createTournament
} from '../TournamentsSagas';
import EventsActions, {
  eventFromListSelector
} from '../../../../redux/EventsRedux';
import MessagesAction from '../../../../../../common/redux/SystemMessagesRedux';
import { select } from 'redux-saga/effects';
import { currentCasinoSelector } from '../../../../../authentication/redux/AuthenticationRedux';
import { casinoFromListSelector } from '../../../../../casinos/redux/CasinosRedux';

// Testing fetchEventTournaments Middleware Success
test('fetchEventTournaments Middleware Success', () => {
  const eventId = 'eventId1';
  const filters = '';
  const page = 1;
  const size = 20;
  const Response = {
    status: 200,
    data: {
      content: [
        {
          id: 'tournament1',
          name: 'Main Event'
        }
      ],
      last: true,
      totalElements: 21
    }
  };
  return expectSaga(fetchTournamentList, FixtureTournamentsApi, {
    eventId,
    filters,
    page,
    size
  })
    .provide([
      [select(eventFromListSelector, 'eventId1'), { id: 'eventId1' }],
      [matchers.call.fn(FixtureTournamentsApi.fetchTournaments), Response]
    ])
    .put(
      EventsActions.fetchEventTournamentsSuccessResponse(
        eventId,
        Response.data.content,
        filters,
        page,
        Response.data.last,
        Response.data.totalElements
      )
    )
    .run();
});

// Testing deleteTournament Middleware Success
test('deleteTournament Middleware Success', () => {
  const eventId = 'eventId1';
  const tournamentId = 'tournamentId1';
  return expectSaga(deleteTournament, FixtureTournamentsApi, {
    eventId,
    tournamentId
  })
    .put(EventsActions.deleteTournamentSuccessResponse(eventId, tournamentId))
    .put(
      MessagesAction.addMessage(
        'DELETE_TOURNAMENT_SUCCESS',
        'SUCCESS',
        `Your tournament was successfully deleted.`,
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing createTournamet Middleware Success
test('createTournament Middleware Success', () => {
  const eventId = 'eventId1';
  const data = {};
  const index = 1;
  const expectedTournamentId = 'tournamentId1';
  return (
    expectSaga(createTournament, FixtureTournamentsApi, {
      eventId,
      data,
      index
    })
      .provide([
        [select(currentCasinoSelector), 'casinoId1'],
        [select(casinoFromListSelector, 'casinoId1'), { name: 'Ceasar Palace' }]
      ])
      .put(
        EventsActions.fetchTournamentDetailsRequest(
          eventId,
          expectedTournamentId
        )
      )
      .put(
        EventsActions.createTournamentSuccessResponse(
          eventId,
          expectedTournamentId,
          data,
          index
        )
      )
      // .put(
      //   MessagesAction.addMessage(
      //     'CREATE_TOURNAMENT_SUCCESS',
      //     'SUCCESS',
      //     `Your tournament was successfully created.`,
      //     '',
      //     'PANEL'
      //   )
      // )
      .run()
  );
});
