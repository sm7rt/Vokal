import Immutable from 'seamless-immutable';
import {
  handlePageableResultReducer,
  handlePageableResultWithPathReducer
} from '../ReducerUtils';

// Test handlePageableResultReducer
test('handlePageableResultReducer  (1 page)', () => {
  const data = [
    {
      id: 'casinos1'
    },
    {
      id: 'casinos2'
    }
  ];
  const page = 1;
  const filters = {};
  const last = false;
  const INITIAL_STATE = Immutable({
    listIds: [],
    list: [],
    filters: {},
    page: 1,
    last: false
  });
  const state = handlePageableResultReducer(INITIAL_STATE, {
    data,
    filters,
    page,
    last
  });
  // They have to have the sames values
  expect(state.listIds.length).toEqual(2);
  expect(state.list.length).toEqual(2);
  expect(state.page).toEqual(2);
  expect(state.last).toEqual(false);
});

// Test handlePageableResultReducer Page 2
test('handlePageableResultReducer (2 page)', () => {
  const INITIAL_STATE = Immutable({
    listIds: ['casino1', 'casino2'],
    list: [
      {
        id: 'casinos1'
      },
      {
        id: 'casinos2'
      }
    ],
    filters: {},
    page: 1,
    last: false
  });
  const data = [
    {
      id: 'casinos3'
    },
    {
      id: 'casinos4'
    }
  ];
  const page = 2;
  const filters = {};
  const last = false;
  const state = handlePageableResultReducer(INITIAL_STATE, {
    data,
    filters,
    page,
    last
  });
  // They have to have the sames values
  expect(state.listIds.length).toEqual(4);
  expect(state.list.length).toEqual(4);
  expect(state.page).toEqual(3);
  expect(state.last).toEqual(false);
});

// Test handlePageableResultWithPathReducer
test('handlePageableResultWithPathReducer (1 page)', () => {
  const data = [
    {
      id: 'casinos1'
    },
    {
      id: 'casinos2'
    }
  ];
  const page = 1;
  const filters = {};
  const last = false;
  const INITIAL_STATE = Immutable({
    list: [],
    running: {
      listIds: [],
      filters: {},
      page: 1,
      last: false
    }
  });
  const state = handlePageableResultWithPathReducer(
    INITIAL_STATE,
    {
      data,
      filters,
      page,
      last
    },
    ['running']
  );
  // They have to have the sames values
  expect(state.running.listIds.length).toEqual(2);
  expect(state.running.page).toEqual(2);
  expect(state.running.last).toEqual(false);
});

// Test handlePageableResultWithPathReducer Page 2
test('handlePageableResultReducer (2 page)', () => {
  const INITIAL_STATE = Immutable({
    list: [
      {
        id: 'casinos1'
      },
      {
        id: 'casinos2'
      }
    ],
    running: {
      listIds: ['casino1', 'casino2'],
      filters: {},
      page: 2,
      last: false
    }
  });
  const data = [
    {
      id: 'casinos3'
    },
    {
      id: 'casinos4'
    }
  ];
  const page = 2;
  const filters = {};
  const last = false;
  const state = handlePageableResultWithPathReducer(
    INITIAL_STATE,
    {
      data,
      filters,
      page,
      last
    },
    ['running']
  );
  // They have to have the sames values
  expect(state.running.listIds.length).toEqual(4);
  expect(state.running.page).toEqual(3);
  expect(state.running.last).toEqual(false);
});
