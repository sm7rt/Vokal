import { loadingReducer, INITIAL_STATE } from '../LoadingRedux';
import Immutable from 'seamless-immutable';

// Test Loading - REQUEST
test('Test Request Action', () => {
  const action = {
    type: 'TEST_GRANT_REQUEST'
  };

  const state: any = loadingReducer(INITIAL_STATE, action);
  // They have to have the sames values
  expect(state['TEST_GRANT']).toEqual(1);
});

// Test Loading - SUCCESS RESPONSE
test('Test Success Response Action', () => {
  const action = {
    type: 'TEST_GRANT_SUCCESS_RESPONSE'
  };

  const INITIAL_STATE_TEST = Immutable({ TEST_GRANT: 1 });

  const state: any = loadingReducer(INITIAL_STATE_TEST, action);
  // They have to have the sames values
  expect(state['TEST_GRANT']).toEqual(0);
});

// Test Loading - FAILURE RESPONSE
test('Test Failure Response Action', () => {
  const action = {
    type: 'TEST_GRANT_FAILURE_RESPONSE'
  };

  const INITIAL_STATE_TEST = Immutable({ TEST_GRANT: 1 });

  const state: any = loadingReducer(INITIAL_STATE_TEST, action);
  // They have to have the sames values
  expect(state['TEST_GRANT']).toEqual(0);
});
