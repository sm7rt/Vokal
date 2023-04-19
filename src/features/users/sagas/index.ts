//
import { takeEvery, takeLatest } from 'redux-saga/effects';
import DebugConfig from '../../../config/DebugConfig';
import UserApi from '../services/UserApi';
import FixtureUserApi from '../services/FixtureUserApi';

/* ------------- Types ------------- */
import { UserTypes } from '../redux/UserRedux';

import {
  fetchUser,
  fetchAccountUsers,
  deleteUserAccount,
  resendInvitation,
  editUserAccount,
  inviteUser,
  fetchActivitiesFeed,
  saveProfile
} from './UserSagas';

/* ------------- Sagas ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it. handleTagsId
const api = DebugConfig.useFixtures ? FixtureUserApi : UserApi.create();

const UserSaga = [
  // Fetch Running Festival
  takeEvery(UserTypes.FETCH_USER_REQUEST, fetchUser, api),
  takeLatest(UserTypes.FETCH_ACCOUNT_USERS_REQUEST, fetchAccountUsers, api),
  takeLatest(UserTypes.EDIT_USER_ACCOUNT_REQUEST, editUserAccount, api),
  takeLatest(UserTypes.DELETE_ACCOUNT_REQUEST, deleteUserAccount, api),
  takeLatest(UserTypes.RESEND_INVITATION_REQUEST, resendInvitation, api),
  takeLatest(UserTypes.SAVE_PROFILE_REQUEST, saveProfile, api),
  takeLatest(UserTypes.INVITE_USER_REQUEST, inviteUser, api),
  takeLatest(UserTypes.FETCH_ACTIVITIES_FEED_REQUEST, fetchActivitiesFeed, api)
];

// Export Default
export default UserSaga;
