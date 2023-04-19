import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { generateFetchAction } from '../../../redux/util';
import {
  ISettingsImmutableStateType,
  GameType
} from '../models/SettingsModel.d';
import { IRootState } from '../../../common/models/StateModel';
import { createImmutableEqualSelector } from '../../../redux/selector/custom-selector';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ...generateFetchAction('saveGeneralInformation', ['data', 'redirectUrl'], []),
  ...generateFetchAction('uploadCustomerLogo', ['customerId', 'image'], []),
  initGames: ['games'],
  addGame: [],
  editGame: ['index'],
  cancelEditGame: ['index'],
  removeGame: ['index'],
  validateGame: ['index', 'data'] // Remove an available Game
});

export const SettingsTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ISettingsImmutableStateType = Immutable({
  games: []
});

function compare(a: GameType, b: GameType) {
  const varA = `${a.variant} ${a.smallBlind}/${a.bigBlind}`.toUpperCase();
  const varB = `${b.variant} ${b.smallBlind}/${b.bigBlind}`.toUpperCase();
  if (varA < varB) {
    return -1;
  }
  if (varA > varB) {
    return 1;
  }

  // names must be equal
  return 0;
}

/* ------------- Reducers ------------- */
// Init game list
export const initGames = (
  state: ISettingsImmutableStateType,
  { games }: { games: Array<GameType> }
) => state.merge({ games });

// Add a game to the list
export const addGame = (state: ISettingsImmutableStateType) =>
  state.merge({ games: [...state.games, { edited: true }] });

// Edit a game
export const editGame = (
  state: ISettingsImmutableStateType,
  { index }: { index: number }
) => state.setIn(['games', index, 'edited'], true);

// Validate a game
export const validateGame = (
  state: ISettingsImmutableStateType,
  { index, data }: { data: GameType; index: number }
) => {
  // Remove old data
  const allGames = state.games.filter(
    (item: GameType, indexItem: number) => indexItem !== index
  );
  // Add New Data and sort the array
  return state.merge({
    games: [...allGames, { ...data, edited: false }].sort(compare)
  });
};

// Remove a  game
export const removeGame = (
  state: ISettingsImmutableStateType,
  action: { index: number }
) =>
  state.merge({
    games: state.games.filter(
      (item: GameType, index: number) => index !== action.index
    )
  });

// Cancel Edit game
export const cancelEditGame = (
  state: ISettingsImmutableStateType,
  { index }: { index: number }
) => {
  const game = state.games[index];
  // If the game exist
  if (game.variant) {
    return state.setIn(['games', index, 'edited'], false);
  } else {
    // Else we remove empty line
    return state.merge({
      games: state.games.filter((item, indexItem) => index !== indexItem)
    });
  }
};

/* ------------- Hookup Reducers To Types ------------- */
// Login Reducer
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT_GAMES]: initGames,
  [Types.ADD_GAME]: addGame,
  [Types.EDIT_GAME]: editGame,
  [Types.VALIDATE_GAME]: validateGame,
  [Types.REMOVE_GAME]: removeGame,
  [Types.CANCEL_EDIT_GAME]: cancelEditGame
});

/* ------------- Selectors ------------- */
const gameSelector = (state: IRootState) => state.settings.games;

export const getGames = createImmutableEqualSelector(
  [gameSelector],
  games => games || []
);

const gameEditedSelector = (state: IRootState) =>
  state.settings.games.findIndex((g: GameType) => g.edited) !== -1;

export const hasEditedGame = createImmutableEqualSelector(
  [gameEditedSelector],
  bool => bool
);
