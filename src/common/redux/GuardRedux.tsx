import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { AnyAction } from 'redux';
import { IRootState } from '../models/StateModel.d';
import DebugConfig from '../../config/DebugConfig';

// Guard Redux State Type
type GuardReduxStateType = {
  [key: string]: number;
};

/* ------------- Types and Action Creators ------------- */

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({});

/* ------------- Reducers ------------- */
// We store here each Action with a guard
export const guardReducer = (state: GuardReduxStateType, action: AnyAction) => {
  const { type } = action;
  // Log Action if Config is set To true
  if (DebugConfig.reduxActionLogger) {
    console.log(action);
  }

  // S'il y a une erreur on reset l'ensemble des guards
  if (type === 'FAILURE_RESPONSE') {
    return INITIAL_STATE;
  }

  const matches = /(.*)_(GRANT_REQUEST|GRANT_SUCCESS_RESPONSE|GRANT_FAILURE_RESPONSE)/.exec(
    type
  );

  // not a *_GRANT_REQUEST / *GRANT_SUCCESS_RESPONSE /  *GRANT_FAILURE_RESPONSE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]:
      requestState === 'GRANT_REQUEST'
        ? 'PENDING'
        : requestState === 'GRANT_SUCCESS_RESPONSE'
        ? 'GRANTED'
        : 'UNAUTHORIZED'
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  'REDUXSAUCE.DEFAULT': guardReducer
});

/* ------------- Selectors ------------- */

// Selector For Guard
export const createGuardSelector = (action: string) => (state: IRootState) =>
  // returns true only when all actions is not guard
  state[`${action}`];
