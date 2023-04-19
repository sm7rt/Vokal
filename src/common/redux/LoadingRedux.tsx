import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import { AnyAction } from 'redux';
import { IRootState } from '../models/StateModel.d';
import DebugConfig from '../../config/DebugConfig';

// Loading Redux State Type
type LoadingReduxStateType = {
  [key: string]: number;
};

/* ------------- Types and Action Creators ------------- */

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({});

/* ------------- Reducers ------------- */
// We store here each Action with a loading
export const loadingReducer = (
  state: LoadingReduxStateType,
  action: AnyAction
) => {
  const { type, id } = action;
  // Log Action if Config is set To true
  if (DebugConfig.reduxActionLogger) {
    console.log(action);
  }

  // S'il y a une erreur on reset l'ensemble des loadings
  if (type === 'FAILURE_RESPONSE') {
    return INITIAL_STATE;
  }

  const matches = /(.*)_(REQUEST|SUCCESS_RESPONSE|FAILURE_RESPONSE|CANCEL_RESPONSE)/.exec(
    type
  );

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;

  let [, requestName, requestState] = matches;
  if (id) {
    requestName = `${requestName}_${id}`;
  }
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]:
      requestState === 'REQUEST'
        ? (state[requestName] || 0) + 1
        : state[requestName] - 1
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  'REDUXSAUCE.DEFAULT': loadingReducer
});

/* ------------- Selectors ------------- */

// Selector For Loading
export const createLoadingSelector = (actions: Array<string>) => (
  state: IRootState
) =>
  // returns true only when all actions is not loading
  _(actions).some((action: string) => _.get(state, `${action}`) > 0);
