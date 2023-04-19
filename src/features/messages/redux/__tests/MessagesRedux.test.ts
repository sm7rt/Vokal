import Actions, { reducer, INITIAL_STATE } from '../MessagesRedux';
import Immutable from 'seamless-immutable';

// Test on Add Messages Redux
test('success Add Messages', () => {
  const entityId = '56454654';
  const entityType = 'INTEREST_LIST';
  const data = [
    {
      id: '54455',
      author: 146,
      message:
        'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
      date: new Date()
    },
    {
      id: '54225',
      author: 122,
      message:
        'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
      date: new Date()
    }
  ];
  const page = 1;
  const last = false;
  const totalElements = 21;
  const size = 10;
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchMessagesSuccessResponse(
      entityId,
      entityType,
      data,
      {},
      page,
      last,
      totalElements,
      size
    )
  );
  // They have to have the sames values
  expect(state[0].entityId).toEqual(entityId);
  expect(state[0].entityType).toEqual(entityType);
  expect(state[0].list).toEqual(data);
  expect(state[0].page).toEqual(2);
  expect(state[0].last).toEqual(false);
  expect(state[0].size).toEqual(size);
  expect(state[0].totalElements).toEqual(totalElements);
});

const INITIAL_STATE_TEST = Immutable([
  {
    entityId: '56454654',
    entityType: 'INTEREST_LIST',
    list: [
      {
        id: 'message1'
      }
    ],
    filters: {},
    page: 2,
    size: 10,
    totalElements: 1
  }
]);

// Test on Add Messages Redux
test('success Add Messages, on Page 2', () => {
  const entityId = '56454654';
  const entityType = 'INTEREST_LIST';
  const data = [
    {
      id: '54455',
      author: 146,
      message:
        'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
      date: new Date()
    },
    {
      id: '54225',
      author: 122,
      message:
        'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
      date: new Date()
    }
  ];
  const page = 2;
  const last = false;
  const totalElements = 21;
  const size = 10;
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.fetchMessagesSuccessResponse(
      entityId,
      entityType,
      data,
      {},
      page,
      last,
      totalElements,
      size
    )
  );
  // They have to have the sames values
  expect(state[0].entityId).toEqual(entityId);
  expect(state[0].entityType).toEqual(entityType);
  expect(state[0].list.length).toEqual(3);
  expect(state[0].page).toEqual(3);
  expect(state[0].last).toEqual(false);
  expect(state[0].size).toEqual(size);
  expect(state[0].totalElements).toEqual(totalElements);
});

// Test on Add Messages Redux
test('success Add Messages, on Page 1 with existing tree', () => {
  const entityId = '56454654';
  const entityType = 'INTEREST_LIST';
  const data = [
    {
      id: '54455',
      author: 146,
      message:
        'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
      date: new Date()
    },
    {
      id: '54225',
      author: 122,
      message:
        'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
      date: new Date()
    }
  ];
  const page = 1;
  const last = false;
  const totalElements = 21;
  const size = 10;
  const state = reducer(
    INITIAL_STATE_TEST,
    Actions.fetchMessagesSuccessResponse(
      entityId,
      entityType,
      data,
      {},
      page,
      last,
      totalElements,
      size
    )
  );
  // They have to have the sames values
  expect(state[0].entityId).toEqual(entityId);
  expect(state[0].entityType).toEqual(entityType);
  expect(state[0].list.length).toEqual(2);
  expect(state[0].page).toEqual(2);
  expect(state[0].last).toEqual(false);
  expect(state[0].size).toEqual(size);
  expect(state[0].totalElements).toEqual(totalElements);
});
