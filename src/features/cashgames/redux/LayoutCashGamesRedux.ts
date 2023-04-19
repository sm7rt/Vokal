import { createReducer, createActions } from 'reduxsauce';
import { AnyAction } from 'redux';
import Immutable from 'seamless-immutable';
import { IRootState } from '../../../common/models/StateModel';
import { ICashGamesLayoutImmutableStateType } from '../models/CashGamesModel.d';

/* ------------- Types and Action Creators ------------- */

/**
 * Define Actions of Reducer
 */
const { Types, Creators } = createActions({
  changeTab: ['tab']
});

export const LayoutTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ICashGamesLayoutImmutableStateType = Immutable({
  currentTab: 'interest'
});

/* ------------- Reducers ------------- */

/**
 * Update tab
 * @param state
 * @param param1
 */
export const changeTab = (
  state: ICashGamesLayoutImmutableStateType,
  { tab }: AnyAction
) => state.setIn(['currentTab'], tab);

/* ------------- Hookup Reducers To Types ------------- */
// Login Reducer,
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_TAB]: changeTab
});

/* ------------- Selectors ------------- */
// Get Current Tab Indicator
export const currentCashGamesTabSelector = (state: IRootState) =>
  state.cashgames.layout.currentTab;
