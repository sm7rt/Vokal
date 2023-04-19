import Actions, { reducer, INITIAL_STATE } from '../CasinosRedux';

// Test on Fetch Casinos
test('success Fetch casino details', () => {
  const data = {
    id: 'casinos1',
    name: 'Casino1'
  };
  const state = reducer(
    INITIAL_STATE,
    Actions.fetchCasinoDetailsSuccessResponse('casinos1', data)
  );
  // They have to have the sames values
  expect(state.list.length).toEqual(1);
  expect(state.list[0]).toEqual(data);
});
