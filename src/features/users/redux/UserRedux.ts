import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { IUsersImmutableStateType, UserAccount } from '../models/UsersModel.d';
import { AnyAction } from 'redux';
import { IRootState } from '../../../common/models/StateModel.d';
import {
  generateFetchAction,
  generateFetchPageableAction
} from '../../../redux/util';
import { createImmutableEqualSelector } from '../../../redux/selector/custom-selector';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // USER FETCH DATA
  ...generateFetchAction('fetchUser', ['userId'], []),
  ...generateFetchAction(
    'fetchUserProfilePicture',
    ['userId'],
    ['userId', 'profilePicture']
  ),
  ...generateFetchAction('fetchUserData', ['userId'], ['userId', 'data']),
  ...generateFetchPageableAction('fetchAccountUsers', ['customerId']),
  ...generateFetchAction('inviteUser', ['customerId', 'data'], ['userId']),
  ...generateFetchAction('deleteAccount', ['customerAccountId'], ['userId']),
  ...generateFetchAction(
    'editUserAccount',
    ['customerAccountId', 'data'],
    ['customerAccountId', 'role']
  ),
  ...generateFetchAction('resendInvitation', ['email'], []),
  ...generateFetchAction('saveProfile', ['data'], ['userId', 'data']),
  ...generateFetchAction(
    'fetchActivitiesFeed',
    ['userId', 'page', 'size'],
    ['userId', 'data', 'page', 'last', 'totalElements']
  ),

  addUserToList: ['userId'],
  updateFilters: ['path', 'value']
});

export const UserTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IUsersImmutableStateType = Immutable({
  list: [], // Contains all users in every screens : Home Page / User profile / Tagged friends / Friends Lists / Comments etc...
  accountList: {
    list: [],
    filters: {
      search: '',
      states: ['PENDING', 'ACTIVATED'],
      roles: [
        'ADMIN',
        'LIMITED_ADMIN',
        'POKER_ROOM_MANAGER',
        'COMMUNITY_MANAGER'
      ]
    },
    page: 1,
    last: false,
    size: 20,
    totalElements: 0
  }
});

/* ------------- Reducers ------------- */

/* ------------- Initial State ------------- */

/* ------------- Reducers ------------- */
/**
 * Identify User Index inside list
 * @param state
 * @param userId
 */
const getIndexOfUser = (
  state: IUsersImmutableStateType,
  userId: number
): number => {
  if (!state.list) {
    return -1;
  }
  return state.list.findIndex(user => user.id === userId);
};

/**
 * Add a member to the list Reducer
 */
export const addUserToList = (state: IUsersImmutableStateType, { userId }) => {
  const indexOfList = getIndexOfUser(state, userId);
  const userDefault = {
    id: userId
  };
  // If member exist we do nothing
  if (indexOfList !== -1) {
    return state;
  }
  // Else we add it
  return state.merge({ list: [...state.list, userDefault] });
};

/**
 * Fill User Image Reducer
 * @param state
 * @param param1
 */
export const fillUserImage = (
  state: IUsersImmutableStateType,
  { userId, profilePicture }: AnyAction
) => {
  if (!state.list) {
    return state;
  }
  // Add PICTURE URL TO ITEM
  const indexOfList = state.list.findIndex(member => member.id === userId);
  return state
    .setIn(['list', indexOfList, 'profilePicture'], profilePicture)
    .setIn(['list', indexOfList, 'pictureLoaded'], true);
};

/**
 * Fill User Data Reducer
 * @param state
 * @param param1
 */
export const fillData = (
  state: IUsersImmutableStateType,
  { userId, data }: AnyAction
) => {
  if (!state.list) {
    return state;
  }
  // Add RELATIONSHIP STATUS TO ITEM
  const indexOfList = state.list.findIndex(member => member.id === userId);
  return state.setIn(['list', indexOfList, 'data'], data);
};

/**
 * Handle Running Events Reducer
 */
export const handleAccountUsersReducer = (
  state: IUsersImmutableStateType,
  action: AnyAction
) => {
  const { data, filters, page, last, totalElements } = action;
  // Add Users To UserList
  // Fill Data for each User
  let newState = state;
  data.forEach((user: UserAccount) => {
    newState = addUserToList(newState, { userId: user.id });
    newState = fillData(newState, { userId: user.id, data: user });
  });

  // Complete account List
  return newState.setIn(['accountList'], {
    list: data.map((u: UserAccount) => u.id),
    page: page + 1,
    filters,
    last,
    totalElements
  });
};

/**
 * Delete User Account Callback
 */
export const deleteUserAccountCallBack = (
  state: IUsersImmutableStateType,
  { userId }: AnyAction
) => {
  return state.setIn(
    ['accountList', 'list'],
    state.accountList.list.filter((s: string) => s !== userId)
  );
};

/**
 * Edit User Callback
 * @param state
 * @param param1
 */
export const editUserAccountCallback = (
  state: IUsersImmutableStateType,
  { customerAccountId, role }: AnyAction
) => {
  if (!state.accountList) {
    return state;
  }
  const indexOfList = getIndexOfUser(state, customerAccountId);

  return state.setIn(['list', indexOfList, 'data', 'role'], role);
};

/**
 * Update Filters
 * @param state
 * @param param1
 */
export const updateFilters = (
  state: IUsersImmutableStateType,
  { path, value }: AnyAction
) => {
  return state.setIn(['accountList', 'filters', path], value);
};

/**
 * Invite User Callback
 */
export const inviteUserCallback = (
  state: IUsersImmutableStateType,
  { userId }: AnyAction
) => {
  return state.setIn(
    ['accountList', 'list'],
    [...state.accountList.list, userId]
  );
};

/**
 * Invite User Callback
 */
export const fillDataActivitiesFeedCallback = (
  state: IUsersImmutableStateType,
  { userId, data, page, last, totalElements }: AnyAction
) => {
  const indexOfList = state.list.findIndex(member => member.id === userId);
  return state.setIn(['list', indexOfList, 'activitiesFeed'], {
    list: data.map((a: AccountApiDefinitions.Activity) => a.id),
    data,
    page: page + 1,
    last,
    totalElements
  });
};

/**
 * Invite User Callback
 */
export const saveProfileCallback = (
  state: IUsersImmutableStateType,
  { userId, data }: AnyAction
) => {
  if (!state.list) {
    return state;
  }

  // Update Profile data in user item
  const indexOfList = state.list.findIndex(member => member.id === userId);
  return state
    .setIn(['list', indexOfList, 'data', 'firstName'], data.firstName)
    .setIn(['list', indexOfList, 'data', 'lastName'], data.lastName);
  // .setIn(['list', indexOfList, 'data', 'phone'], data.phone)
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_USER_TO_LIST]: addUserToList,
  [Types.UPDATE_FILTERS]: updateFilters,

  // Fetch Informations For One User In List
  [Types.FETCH_USER_PROFILE_PICTURE_SUCCESS_RESPONSE]: fillUserImage,
  [Types.FETCH_USER_DATA_SUCCESS_RESPONSE]: fillData,

  //
  [Types.FETCH_ACCOUNT_USERS_SUCCESS_RESPONSE]: handleAccountUsersReducer,
  [Types.DELETE_ACCOUNT_SUCCESS_RESPONSE]: deleteUserAccountCallBack,
  [Types.EDIT_USER_ACCOUNT_SUCCESS_RESPONSE]: editUserAccountCallback,
  [Types.INVITE_USER_SUCCESS_RESPONSE]: inviteUserCallback,
  [Types.FETCH_ACTIVITIES_FEED_SUCCESS_RESPONSE]: fillDataActivitiesFeedCallback,
  [Types.INVITE_USER_SUCCESS_RESPONSE]: inviteUserCallback,

  [Types.SAVE_PROFILE_SUCCESS_RESPONSE]: saveProfileCallback
});

/* ------------- Selectors -------------  */

const userSelector = (state: IRootState, userId: number) =>
  state.users.list &&
  state.users.list.filter(member => member.id === userId)[0];

const userDefault = {
  id: '',
  profilePicture: ''
};

export const userFromListSelector = createImmutableEqualSelector(
  [userSelector],
  user => user || userDefault
);

const accountUsersFromStateSelector = (state: IRootState) =>
  state.users.accountList;

export const accountUsersSelector = createImmutableEqualSelector(
  [accountUsersFromStateSelector],
  accountUsers => accountUsers
);

const accountUsersListFromStateSelector = (state: IRootState) => {
  let accountUsers = [];
  if (state.users.accountList) {
    // Select Tournament from id
    accountUsers = state.users.accountList.list.map(
      (id: string) => userFromListSelector(state, id) || {}
    );
  }
  return accountUsers;
};

export const accountUsersListSelector = createImmutableEqualSelector(
  [accountUsersListFromStateSelector],
  accountUsers => accountUsers
);
