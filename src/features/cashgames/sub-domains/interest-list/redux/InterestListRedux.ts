import { AnyAction } from 'redux';
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { IRootState } from '../../../../../common/models/StateModel.d';
import { createImmutableEqualSelector } from '../../../../../redux/selector/custom-selector';
import {
  generateFetchAction,
  generateFetchPageableAction
} from '../../../../../redux/util';
import {
  IInterestListImmutableStateType,
  InterestListRow
} from '../../../models/CashGamesModel.d';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // Simple Action
  fillInterestListPlayersNumber: ['id', 'playersNumber'],
  updateInterestListFilters: ['path', 'value'],
  cancelInterestListPulling: [],
  setCurrentInterestListId: ['interestListId'],
  toggleMessageModal: ['toggle'],
  launchFetchInterestList: ['interestListId'],

  // Fetch Action
  ...generateFetchPageableAction('fetchInterestListList'),
  ...generateFetchAction(
    'fetchInterestList',
    ['id', 'interestList'],
    ['id'],
    ['id'],
    ['id']
  ),
  ...generateFetchAction(
    'acceptInterestList',
    ['interestListId'],
    ['interestListId']
  ),
  ...generateFetchAction(
    'declineInterestList',
    ['interestListId'],
    ['interestListId']
  ),
  ...generateFetchAction(
    'fetchRegisteredPlayers',
    ['interestListId'],
    ['interestListId', 'datas']
  ),
  ...generateFetchAction('createInterestList', ['data'], ['interestListId']),
  ...generateFetchAction(
    'deleteInterestList',
    ['interestListId'],
    ['interestListId']
  ),
  // ...generateFetchAction('promoteInterestList', ['interestListId'], ['interestListId'])
  ...generateFetchAction(
    'startInterestList',
    ['interestListId', 'data', 'waitingList'],
    ['interestListId']
  )
});

export const InterestListTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: IInterestListImmutableStateType = Immutable({
  displayList: {
    // Running InterestList part
    listIds: [],
    page: 1,
    last: false,
    size: 30,
    totalElements: 0,
    sorts: [
      {
        sortCol: 'date',
        sortDirection: 'ascend'
      }
    ],
    filters: {
      gameOrigin: 'FLOP_USER',
      gameStates: ['PENDING', 'ACCEPTED']
    }
  },
  list: [], // List of Events
  currentInterestListId: '',
  showMessageModal: false
});

/* ------------- Reducers ------------- */
/**
 * Find Index Table
 */
const findIndexInterestList = (state: any, interestListId: string) => {
  // Find table
  return state.list.findIndex((e: InterestListRow) => e.id === interestListId);
};

/**
 * Add a Interest List to the list
 */
export const addInterestListToList = (
  state: IInterestListImmutableStateType,
  { id, interestList }: AnyAction
) => {
  const indexOfList = findIndexInterestList(state, id);
  // If Cash Game exist we replace it
  if (indexOfList !== -1) {
    // Keep Players Number, Players and Messages
    return state.setIn(['list', indexOfList], {
      ...interestList,
      id,
      playersNumber: state.list[indexOfList].playersNumber,
      playersListIds: state.list[indexOfList].playersListIds
    });
  }
  // Else we add it
  return state.merge({
    list: [
      ...state.list,
      {
        ...interestList,
        id
      }
    ]
  });
};

/**
 * Handle Upcoming Interest List Reducer
 */
export const handleUpcomingInterestListReducer = (
  state: IInterestListImmutableStateType,
  action: AnyAction
) => {
  const { data, filters, page, last, totalElements, size, sorts } = action;
  return state.setIn(['displayList'], {
    listIds: data.map((c: GamesApiDefinitions.LiveCashGameDocument) => c.id),
    filters,
    page,
    last,
    totalElements,
    sorts,
    size
  });
};

/**
 * Handle Registered Players Reducer
 */
export const handleRegisteredPlayersReducer = (
  state: IInterestListImmutableStateType,
  action: AnyAction
) => {
  const { datas, interestListId } = action;
  const indexOfList = findIndexInterestList(state, interestListId);
  if (indexOfList !== -1) {
    return state.setIn(
      ['list', indexOfList, 'playersListIds'],
      datas.map((u: any) => u.accountId)
    );
  }
  return state;
};

/**
 * Fill Interest List Players Number
 */
export const fillInterestListPlayersNumber = (
  state: IInterestListImmutableStateType = INITIAL_STATE,
  { id, playersNumber }: AnyAction
) => {
  const indexOfList = findIndexInterestList(state, id);
  return state.setIn(['list', indexOfList, 'playersNumber'], playersNumber);
};

/**
 * Accept Game CallBack
 */
export const acceptInterestListCallback = (
  state: IInterestListImmutableStateType = INITIAL_STATE,
  { interestListId }: AnyAction
) => {
  const indexOfList = findIndexInterestList(state, interestListId);
  return state.setIn(['list', indexOfList, 'state'], 'ACCEPTED');
};

/**
 * Decline Game CallBack
 */
export const declineInterestListCallback = (
  state: IInterestListImmutableStateType = INITIAL_STATE,
  { interestListId }: AnyAction
) => {
  const indexOfList = findIndexInterestList(state, interestListId);
  return state.setIn(['list', indexOfList, 'state'], 'DECLINED');
};

/**
 * Update Filters
 * @param state
 * @param param1
 */
export const updateFilters = (
  state: IInterestListImmutableStateType,
  { path, value }: AnyAction
) => {
  return state.setIn(['displayList', 'filters', path], value);
};

/**
 * Set Current Interest List Id
 * @param state
 * @param param1
 */
export const setCurrentInterestListId = (
  state: IInterestListImmutableStateType,
  { interestListId }: AnyAction
) => {
  return state.setIn(['currentInterestListId'], interestListId);
};

/**
 * Toggle Message Modal
 * @param state
 * @param param1
 */
export const toggleMessageModal = (
  state: IInterestListImmutableStateType,
  { toggle }: AnyAction
) => {
  return state.setIn(['showMessageModal'], toggle);
};

/**
 * Delete Interest List Callback
 */
export const deleteInterestListCallBack = (
  state: IInterestListImmutableStateType,
  { interestListId }: AnyAction
) => {
  return state
    .merge({
      list: state.list.filter(
        (e: GamesApiDefinitions.LiveCashGameDocument) => e.id !== interestListId
      )
    })
    .setIn(
      ['displayList', 'listIds'],
      state.displayList.listIds.filter((s: string) => s !== interestListId)
    );
};

/**
 * Add a interest list to Upcoming List
 */
export const addInterestListToUpcomingList = (
  state: IInterestListImmutableStateType,
  { interestListId }: AnyAction
) => {
  return state.setIn(
    ['displayList', 'listIds'],
    [...state.displayList.listIds, interestListId]
  );
};
/* ------------- Hookup Reducers To Types ------------- */
// Events Reducer
export const reducer = createReducer<IInterestListImmutableStateType>(
  INITIAL_STATE,
  {
    [Types.FETCH_INTEREST_LIST_REQUEST]: addInterestListToList,
    [Types.UPDATE_INTEREST_LIST_FILTERS]: updateFilters,
    [Types.FILL_INTEREST_LIST_PLAYERS_NUMBER]: fillInterestListPlayersNumber,
    [Types.FETCH_INTEREST_LIST_LIST_SUCCESS_RESPONSE]: handleUpcomingInterestListReducer,
    [Types.FETCH_REGISTERED_PLAYERS_SUCCESS_RESPONSE]: handleRegisteredPlayersReducer,
    [Types.CREATE_INTEREST_LIST_SUCCESS_RESPONSE]: addInterestListToUpcomingList,
    [Types.DELETE_INTEREST_LIST_SUCCESS_RESPONSE]: deleteInterestListCallBack,
    [Types.ACCEPT_INTEREST_LIST_SUCCESS_RESPONSE]: acceptInterestListCallback,
    [Types.DECLINE_INTEREST_LIST_SUCCESS_RESPONSE]: declineInterestListCallback,
    [Types.SET_CURRENT_INTEREST_LIST_ID]: setCurrentInterestListId,
    [Types.TOGGLE_MESSAGE_MODAL]: toggleMessageModal
  }
);

/* ------------- Selectors ------------- */

/********* Get InterestList from id **********/
const interestListSelector = (state: IRootState, id: string) =>
  state.cashgames.interestList.list.find(
    (e: GamesApiDefinitions.LiveCashGameDocument) => e.id === id
  );

export const interestListFromListSelector = () =>
  createImmutableEqualSelector(
    [interestListSelector],
    interestList => interestList
  );

export const interestListDisplayListMemoSelector = (state: IRootState) =>
  state.cashgames.interestList.displayList;

export const interestListDisplayListSelector = createImmutableEqualSelector(
  [interestListDisplayListMemoSelector],
  interestList => interestList
);

/********* Get Registered Players **********/
const registeredPlayersList = (state: IRootState, gameId: string) => {
  const indexOfList = state.cashgames.interestList.list.findIndex(
    (e: InterestListRow) => e.id === gameId
  );
  if (indexOfList !== -1) {
    return state.cashgames.interestList.list[indexOfList].playersListIds;
  }
  return [];
};

export const registeredPlayersListSelector = createImmutableEqualSelector(
  [registeredPlayersList],
  registeredPlayers => registeredPlayers || []
);

/********* Current Interest List id **********/
export const currentInterestListIdSelector = (state: IRootState) =>
  state.cashgames.interestList.currentInterestListId;

/********* Show Message Modal **********/
export const showMessageModalSelector = (state: IRootState) =>
  state.cashgames.interestList.showMessageModal;
