import Immutable from 'seamless-immutable';
import Actions, { reducer, INITIAL_STATE } from '../SettingsRedux';

// Game
const game = {
  variant: 'NLH',
  smallBlind: '1',
  bigblind: '2'
};

// Initial State
const INITIAL_STATE_TEST = Immutable({
  games: [game]
});

// Test on Add  Game
test('Add Game', () => {
  const state = reducer(INITIAL_STATE, Actions.addGame(game));
  // They have to have the sames values
  expect(state.games.length).toEqual(1);
});

// Test on Edit  Game
test('Edit Games', () => {
  const state = reducer(INITIAL_STATE_TEST, Actions.editGame(0));
  // They have to have the sames values
  expect(state.games.length).toEqual(1);
  expect(state.games[0].edited).toEqual(true);
});

// Test on Cancel Edit  Game
test('cancel Edit Games', () => {
  const state = reducer(INITIAL_STATE_TEST, Actions.cancelEditGame(0));
  // They have to have the sames values
  expect(state.games.length).toEqual(1);
  expect(state.games[0].edited).toEqual(false);
});

// Test on Validate  Game
test('Validate Games', () => {
  const gameEdit = {
    variant: 'PLO'
  };
  const state = reducer(INITIAL_STATE_TEST, Actions.validateGame(0, gameEdit));
  // They have to have the sames values
  expect(state.games.length).toEqual(1);
  expect(state.games[0].variant).toEqual('PLO');
});

// Test on Remove  Game
test('Remove Games', () => {
  const state = reducer(INITIAL_STATE_TEST, Actions.removeGame(0));
  // They have to have the sames values
  expect(state.games.length).toEqual(0);
});
