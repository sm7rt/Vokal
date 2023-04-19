import { guardReducer, INITIAL_STATE } from '../GuardRedux';

// Test Change Guard Status - PENDING
test('Test PENDING Action', () => {
  const action = {
    type: 'TEST_GRANT_REQUEST'
  };

  const state: any = guardReducer(INITIAL_STATE, action);
  // They have to have the sames values
  expect(state['TEST']).toEqual('PENDING');
});

// Test Change Guard Status - GRANTED
test('Test GRANTED Action', () => {
  const action = {
    type: 'TEST_GRANT_SUCCESS_RESPONSE'
  };

  const state: any = guardReducer(INITIAL_STATE, action);
  // They have to have the sames values
  expect(state['TEST']).toEqual('GRANTED');
});

// Test Change Guard Status - UNAUTHORIZED
test('Test UNAUTHORIZED Action', () => {
  const action = {
    type: 'TEST_GRANT_FAILURE_RESPONSE'
  };

  const state: any = guardReducer(INITIAL_STATE, action);
  // They have to have the sames values
  expect(state['TEST']).toEqual('UNAUTHORIZED');
});
