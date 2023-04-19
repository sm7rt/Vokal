import { takeLatest } from 'redux-saga/effects';

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

import DebugConfig from '../../../config/DebugConfig';
import FixtureAuthenticationApi from '../services/FixtureAuthenticationApi';
import AuthenticationApi from '../services/AuthenticationApi';
import { AuthenticationTypes } from '../redux/AuthenticationRedux';
import {
  signIn,
  signUp,
  resetPassword,
  changePassword,
  resendEmail,
  validateEmail,
  checkAccessForChangePassword,
  checkAccessForSettingNewPassword
} from './AuthenticationSagas';

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures
  ? FixtureAuthenticationApi
  : AuthenticationApi.create();

// Authentication Saga
const authenticationSaga = [
  takeLatest(AuthenticationTypes.SIGN_IN_REQUEST, signIn, api),
  takeLatest(AuthenticationTypes.SIGN_UP_REQUEST, signUp, api),
  takeLatest(AuthenticationTypes.RESEND_EMAIL_REQUEST, resendEmail, api),
  takeLatest(AuthenticationTypes.VALIDATE_EMAIL_REQUEST, validateEmail, api),
  takeLatest(AuthenticationTypes.RESET_PASSWORD_REQUEST, resetPassword, api),
  takeLatest(
    AuthenticationTypes.CHANGE_PASSWORD_GRANT_REQUEST,
    checkAccessForChangePassword,
    api
  ),
  takeLatest(
    AuthenticationTypes.NEW_PASSWORD_GRANT_REQUEST,
    checkAccessForSettingNewPassword,
    api
  ),
  takeLatest(AuthenticationTypes.CHANGE_PASSWORD_REQUEST, changePassword, api)
];

// Export Default
export default authenticationSaga;
