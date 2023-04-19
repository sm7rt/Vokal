import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ICasinosImmutableStateType } from '../models/CasinosModel.d';
import { generateFetchAction } from '../../../redux/util';
import { IRootState } from '../../../common/models/StateModel.d';
import { createImmutableEqualSelector } from '../../../redux/selector/custom-selector';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ...generateFetchAction(
    'fetchCasinoDetails',
    ['id', 'forceRefresh'],
    ['id', 'data']
  )
});

export const CasinosTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ICasinosImmutableStateType = Immutable({
  list: []
});

/* ------------- Reducers ------------- */

/**
 * Fetch Casino Details Reducer
 */
export const fetchCasinoDetails = (
  state: ICasinosImmutableStateType,
  {
    data
  }: {
    data: DataApiDefinitions.CasinoInfosDto;
  }
) => {
  // Replace Element in list if exist, else add to the list
  const index = state.list.findIndex(c => c.id === data.id);
  if (index !== -1) {
    return state.setIn(['list', index], data);
  }
  return state.merge({ list: [...state.list, data] });
};

/* ------------- Hookup Reducers To Types ------------- */
// Casino Reducer
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CASINO_DETAILS_SUCCESS_RESPONSE]: fetchCasinoDetails
});

/* ------------- Selectors ------------- */
const casinoSelector = (state: IRootState, casinoId: string) =>
  state.casinos.list &&
  state.casinos.list.find(casino => casino.id === casinoId);

export const casinoFromListSelector = createImmutableEqualSelector(
  [casinoSelector],
  casino => casino
);
