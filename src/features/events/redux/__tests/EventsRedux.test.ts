import Actions, { reducer, INITIAL_STATE } from '../EventsRedux';
import Immutable from 'seamless-immutable';

// Test on Fetch Running Events
test('success Fetch Running Events', () => {
  const data = [
    {
      id: 'event1'
    },
    {
      id: 'event2'
    }
  ];
  const page = 1;
  const filters = {};
  const last = false;
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchRunningEventsSuccessResponse(data, filters, page, last)
  );
  // They have to have the sames values
  expect(state.runningEvents.listIds.length).toEqual(2);
  expect(state.runningEvents.page).toEqual(2);
  expect(state.runningEvents.last).toEqual(false);
});

// Test on Fetch Finished Events
test('success Fetch Finished Events', () => {
  const data = [
    {
      id: 'event1'
    },
    {
      id: 'event2'
    }
  ];
  const page = 1;
  const filters = {};
  const last = false;
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchFinishedEventsSuccessResponse(data, filters, page, last)
  );
  // They have to have the sames values
  expect(state.finishedEvents.listIds.length).toEqual(2);
  expect(state.finishedEvents.page).toEqual(2);
  expect(state.finishedEvents.last).toEqual(false);
});

/**
 * Test on Add Event To List
 * 1 - Add Event id to list
 * 2 - Fill Event Banner
 * 3 - Fill Event Event Number
 */
test('addEventToList, fillBanner, fillEventNumber', () => {
  const event = {
    id: 'event1',
    startDate: '2019-03-01',
    endDate: '2019-03-10',
    name: 'Great Festival'
  };
  const imageURI = 'http://eventBanner';
  const eventNumber = 3;

  // Add Festival To list
  let state = reducer(
    INITIAL_STATE,
    Actions.fetchEventRequest(event.id, event)
  );
  // They have to have the sames values
  expect(state.list).toHaveLength(1);
  expect(state.list[0].startDate).toEqual(event.startDate);
  expect(state.list[0].endDate).toEqual(event.endDate);
  expect(state.list[0].name).toEqual(event.name);

  // Fill Festival Banner Url
  state = reducer(state, Actions.fillEventBannerUrl(event.id, imageURI));
  // They have to have the sames values
  expect(state.list[0].imageURI).toEqual(imageURI);

  // Fill Festival Event Number
  state = reducer(state, Actions.fillEventTourNumber(event.id, eventNumber));
  // They have to have the sames values
  expect(state.list[0].eventNumber).toEqual(eventNumber);
});

// Define Initial State With One Festival for Some test
const INITIAL_STATE_TEST = Immutable({
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
  runningEvents: {
    listIds: ['event1'],
    filters: {},
    page: 1,
    last: false
  },
  finishedEvents: {
    listIds: [''],
    filters: {},
    page: 1,
    last: false
  }
});

/**
 * Edit Event Callback
 */
test('Edit Event Callback', () => {
  const event = {
    id: 'event1',
    startDate: '2019-03-01',
    endDate: '2019-03-10',
    name: 'Great Festival'
  };

  // Edit Festival Response
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.editEventSuccessResponse(event.id, event)
  );
  // They have to have the sames values
  expect(state.list).toHaveLength(1);
  expect(state.list[0].startDate).toEqual(event.startDate);
  expect(state.list[0].endDate).toEqual(event.endDate);
  expect(state.list[0].name).toEqual(event.name);
  expect(state.list[0].imageURI).toEqual(event.imageURI);
  expect(state.list[0].eventNumber).toEqual(event.eventNumber);
});

/**
 * Delete Festival Callback
 */
test('Delete Festival Callback', () => {
  // Delete Festival Response
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.deleteEventSuccessResponse('event1')
  );
  // They have to have the sames values
  expect(state.list).toHaveLength(0);
});
