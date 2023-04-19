import Actions, { reducer, INITIAL_STATE } from '../../../../redux/EventsRedux';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import GameVariant from '../../../../../../common/sagas/static/GameVariant';

// Test on Fetch Tournaments
test('success Fetch Tournaments', () => {
  const data = [
    {
      id: 'tournament1',
      date: moment('2019-07-10 09:30').format('YYYY-MM-DD HH:mm')
    },
    {
      id: 'tournament2',
      date: moment('2019-07-11 09:30').format('YYYY-MM-DD HH:mm')
    },
    {
      id: 'tournament3',
      date: moment('2019-07-11 11:30').format('YYYY-MM-DD HH:mm')
    }
  ];
  const eventId = 'eventId1';
  const page = 1;
  const filters = {};
  const last = false;
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchEventTournamentsSuccessResponse(
      eventId,
      data,
      filters,
      page,
      last
    )
  );

  // They have to have the sames values
  expect(state.eventTournamentLinks.length).toEqual(1);
  expect(state.eventTournamentLinks[0].tournamentIds.length).toEqual(3);
});

/**
 * Test on Add Tournament To List
 * 1 - Add Tournament to list
 */
test('addTournamentToList', () => {
  const tournament = {
    id: 'tournament1',
    funcId: '#1',
    eventNumber: 'EVT1',
    date: moment('2019-07-10 09:30').format('YYYY-MM-DD HH:mm'),
    name: 'WPT Montreal',
    gameVariant: GameVariant[0].shortName,
    buyIn: 100,
    fees: 1,
    stack: 3000,
    lateRegistration: 'End of level 5'
  };

  // Add Festival To list
  let state = reducer(
    INITIAL_STATE,
    Actions.fetchEventTournamentRequest(tournament.id, tournament)
  );
  // They have to have the sames values
  expect(state.tournamentList).toHaveLength(1);
});

// Define Initial State With One Festival for Some test
const INITIAL_STATE_TEST = Immutable({
  ...INITIAL_STATE,
  list: [
    {
      id: 'event1',
      startDate: '2018-03-01',
      endDate: '2018-03-10',
      name: 'Great Festival old',
      imageURI: 'http://eventBanner',
      eventNumber: 3
    }
  ],
  tournamentList: [
    {
      id: 'tournament1',
      funcId: '#1',
      eventNumber: 'EVT1',
      date: moment('2019-07-10 09:30').format('YYYY-MM-DD HH:mm'),
      name: 'WPT Montreal',
      gameVariant: GameVariant[0].shortName,
      buyIn: 100,
      fees: 1,
      stack: 3000,
      lateRegistration: 'End of level 5'
    }
  ],
  eventTournamentLinks: [
    {
      eventId: 'event1',
      tournamentIds: ['tournament1']
    }
  ]
});

/**
 * Delete Tournament Callback
 */
test('Delete Tournament Callback', () => {
  // Delete Festival Response
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.deleteTournamentSuccessResponse('event1', 'tournament1')
  );
  // They have to have the sames values
  expect(state.tournamentList).toHaveLength(0);
  expect(state.eventTournamentLinks[0].tournamentIds).toHaveLength(0);
});
