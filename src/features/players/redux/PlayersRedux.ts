import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { IPlayersImmutableStateType } from '../models/PlayersModel.d';
import { AnyAction } from 'redux';
import { IRootState } from '../../../common/models/StateModel.d';
import { generateFetchAction } from '../../../redux/util';
import { createImmutableEqualSelector } from '../../../redux/selector/custom-selector';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // PLAYER FETCH DATA
  ...generateFetchAction('fetchPlayer', ['id'], []),
  ...generateFetchAction(
    'fetchPlayerProfilePicture',
    ['playerId'],
    ['playerId', 'profilePicture']
  ),
  ...generateFetchAction('fetchPlayerData', ['playerId'], ['playerId', 'data']),
  ...generateFetchAction(
    'fetchPlayerPosition',
    ['playerId'],
    ['playerId', 'position']
  ),
  ...generateFetchAction('searchPlayers', ['search'], ['idsList']),

  addPlayerToList: ['id'],
  resetSearchPlayers: []
});

export const PlayersTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IPlayersImmutableStateType = Immutable({
  list: [], // Contains all players in every screens : Home Page / Player profile / Tagged friends / Friends Lists / Comments etc...
  searchList: [] // List Ids of Search
});

/* ------------- Reducers ------------- */

/* ------------- Initial State ------------- */

/* ------------- Reducers ------------- */
/**
 * Identify Player Index inside list
 * @param state
 * @param playerId
 */
const getIndexOfPlayer = (
  state: IPlayersImmutableStateType,
  playerId: number
): number => {
  if (!state.list) {
    return -1;
  }
  return state.list.findIndex(player => player.id === playerId);
};

/**
 * Add a member to the list Reducer
 */
export const addPlayerToList = (state: IPlayersImmutableStateType, { id }) => {
  const indexOfList = getIndexOfPlayer(state, id);
  const playerDefault = {
    id,
    data: {
      firstName: '',
      lastName: ''
    },
    profilePicture: '',
    relationshipStatus: ''
  };
  // If member exist we replace it
  if (indexOfList !== -1) {
    return state;
  }
  // Else we add it
  return state.merge({ list: [...state.list, playerDefault] });
};

/**
 * Fill Player Image Reducer
 * @param state
 * @param param1
 */
export const fillPlayerImage = (
  state: IPlayersImmutableStateType,
  { playerId, profilePicture }: AnyAction
) => {
  if (!state.list) {
    return state;
  }
  // Add PICTURE URL TO ITEM
  const indexOfList = getIndexOfPlayer(state, playerId);
  return state
    .setIn(['list', indexOfList, 'profilePicture'], profilePicture)
    .setIn(['list', indexOfList, 'pictureLoaded'], true);
};

/**
 * Fill Player Position Reducer
 * @param state
 * @param param1
 */
export const fillPlayerPosition = (
  state: IPlayersImmutableStateType,
  { playerId, position }: AnyAction
) => {
  if (!state.list) {
    return state;
  }
  // Add Position TO ITEM
  const indexOfList = getIndexOfPlayer(state, playerId);
  return state.setIn(['list', indexOfList, 'position'], position);
};

/**
 * Fill Player Data Reducer
 * @param state
 * @param param1
 */
export const fillData = (
  state: IPlayersImmutableStateType,
  { playerId, data }: AnyAction
) => {
  if (!state.list) {
    return state;
  }
  // Add RELATIONSHIP STATUS TO ITEM
  const indexOfList = getIndexOfPlayer(state, playerId);
  return state.setIn(['list', indexOfList, 'data'], data);
};

/**
 * Callback of searching list
 * @param {*} state
 * @param {*} param1
 */
export const searchPlayerSuccessResponse = (
  state: IPlayersImmutableStateType,
  { idsList }: AnyAction
) => state.merge({ searchList: idsList });

/**
 * Reset Search List
 * @param {*} state
 * @param {*} param1
 */
export const resetSearch = (
  state: IPlayersImmutableStateType,
  { idsList }: AnyAction
) => state.merge({ searchList: [] });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PLAYER_TO_LIST]: addPlayerToList,

  // Fetch Informations For One Player In List
  [Types.FETCH_PLAYER_PROFILE_PICTURE_SUCCESS_RESPONSE]: fillPlayerImage,
  [Types.FETCH_PLAYER_POSITION_SUCCESS_RESPONSE]: fillPlayerPosition,
  [Types.FETCH_PLAYER_DATA_SUCCESS_RESPONSE]: fillData,

  // Search
  [Types.SEARCH_PLAYERS_SUCCESS_RESPONSE]: searchPlayerSuccessResponse,
  [Types.RESET_SEARCH_PLAYERS]: resetSearch
});

/* ------------- Selectors ------------- */

const playerSelector = (state: IRootState, playerId: number) =>
  state.players.list &&
  state.players.list.filter(member => member.id === playerId)[0];

const playerDefault = {
  id: '',
  data: {
    firstName: '',
    lastName: ''
  },
  profilePicture: ''
};

export const playerFromListSelector = createImmutableEqualSelector(
  [playerSelector],
  player => player || playerDefault
);

const searchPlayersSelector = (state: IRootState) => state.players.searchList;

export const searchPlayersListSelector = createImmutableEqualSelector(
  [searchPlayersSelector],
  players => players || []
);
