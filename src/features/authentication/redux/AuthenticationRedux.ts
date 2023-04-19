import { createReducer, createActions } from 'reduxsauce';
import { AnyAction } from 'redux';
import Immutable from 'seamless-immutable';
import { AuthenticationImmutableStateType } from '../models/AuthenticationModel.d';
import { IRootState } from '../../../common/models/StateModel.d';
import { generateFetchAction } from '../../../redux/util';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ...generateFetchAction(
    'signIn',
    ['email', 'password'],
    ['signin', 'authorizationToken']
  ),
  ...generateFetchAction('signUp', ['accountData'], []),
  ...generateFetchAction('resendEmail', ['email'], []),
  ...generateFetchAction('validateEmail', ['email', 'activationToken'], []),
  ...generateFetchAction('resetPassword', ['email'], []),
  ...generateFetchAction(
    'changePasswordGrant',
    ['email', 'activationToken'],
    []
  ),
  ...generateFetchAction('newPasswordGrant', ['email', 'activationToken'], []),
  ...generateFetchAction(
    'changePassword',
    [
      'email',
      'firstName',
      'lastName',
      'password',
      'password_check',
      'token',
      'actionType'
    ],
    []
  ),
  logoutRequest: [] // Logout Request
});

export const AuthenticationTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: AuthenticationImmutableStateType = Immutable({});

/* ------------- Reducers ------------- */

// we've successfully logged in
export const success = (
  state: AuthenticationImmutableStateType,
  { signin, authorizationToken }: AnyAction
) => state.merge({ signin, authorizationToken });

// we've logged out
export const resetState = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
// Login Reducer
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS_RESPONSE]: success,
  [Types.LOGOUT_REQUEST]: resetState
});

/* ------------- Selectors ------------- */
// Get Owner Id
export const ownerSelector = (state: IRootState) => state.authentication.signin;

// Get Authorization Token
export const authorizationTokenSelector = (state: IRootState) =>
  state.authentication.authorizationToken;

export const currentCasinoSelector = (state: IRootState) =>
  state.authentication.signin.managedCasinoId;
