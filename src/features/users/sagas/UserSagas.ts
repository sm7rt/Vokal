import { put, call, fork, select, cancelled } from 'redux-saga/effects';
import UserActions from '../redux/UserRedux';
import AuthenticationActions, {
  ownerSelector
} from '../../authentication/redux/AuthenticationRedux';
import { UserServiceType } from '../models/UsersModel.d';
import { AnyAction } from 'redux';
import MessagesAction from '../../../common/redux/SystemMessagesRedux';
import { ApiResponseType } from '../../../common/models';
import CommonConstants from '../../../common/constants/CommonConstants';
import i18n from '../../../i18n';
import { getObjectIdFromHeader, parseParams } from '../../../utils/ApiUtils';
import { customerSelector } from '../../customers/redux/CustomersRedux';

/* ****************************** */
/*     User  deferred loading     */
/* ****************************** */

/**
 * Get Profile Picture of a User
 * @param {*} api : The API to use
 * @param {*} userId : The id of user
 */
function* fetchUserProfilePicture(api: UserServiceType, userId: number) {
  // We Indicate that a fetchUserProfilePictureRequest Request is pending
  yield put(UserActions.fetchUserProfilePictureRequest());
  // API Call
  const fetchUserProfilePictureResponse = yield call(
    api.fetchProfilePicture,
    userId
  );
  // Get Data Profile picture
  const dataProfilePicture = fetchUserProfilePictureResponse.data
    ? fetchUserProfilePictureResponse.data
    : {};
  // Get Profile Picture
  const profilePicture = dataProfilePicture.resizedUrl
    ? dataProfilePicture.resizedUrl
    : null;
  // Manage Response
  if (fetchUserProfilePictureResponse.status === 200) {
    yield put(
      UserActions.fetchUserProfilePictureSuccessResponse(userId, profilePicture)
    );
  } else {
    const error = {
      code: 'DATA_UNLOAD'
    };
    yield put(UserActions.fetchUserProfilePictureFailureResponse(error));
  }
}

/**
 * Get All data of a User
 * @param {*} api : The API to use
 * @param {*} userId : The id of user
 */
function* fetchUserData(api: UserServiceType, userId: number) {
  // We Indicate that a fetchUserProfilePictureRequest Request is pending
  yield put(UserActions.fetchUserDataRequest());
  const { customerId } = yield select(ownerSelector);
  // API Call
  const fetchUserDataRequestResponse = yield call(
    api.fetchProfile,
    customerId,
    userId
  );
  const data = fetchUserDataRequestResponse.data || {};
  if (fetchUserDataRequestResponse.status === 200) {
    yield put(UserActions.fetchUserDataSuccessResponse(userId, data));

    yield fork(fetchActivitiesFeed, api, {
      customerId: userId,
      page: 1,
      size: 20
    });
  } else if (fetchUserDataRequestResponse.status === 404) {
    yield put(
      UserActions.fetchUserDataSuccessResponse(userId, {
        firstName: 'Unknow',
        lastName: 'Unknow'
      })
    );
  } else {
    // Check if the userId is the ownerId
    const owner = yield select(ownerSelector);
    if (owner && userId === owner.id) {
      // Launch Logout
      yield put(AuthenticationActions.logoutRequest());
    }

    yield put(UserActions.fetchUserDataFailureResponse());
  }
}

type FetchUserType = {
  userId: number;
};

/**
 * Fetch a Users with all information
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* fetchUser(api: UserServiceType, action: FetchUserType) {
  const { userId } = action;
  yield put(UserActions.addUserToList(userId));
  // TODO Manage Cache
  // Use Reselect To determine if we need to fetch or not

  // Get User images
  yield fork(fetchUserProfilePicture, api, userId);
  // Get User Data
  yield fork(fetchUserData, api, userId);

  yield put(UserActions.fetchUserSuccessResponse());
}

type FetchAccountUsersType = {
  customerId: number;
  filters: any;
  page: number;
  size: number;
};

type FetchActivitiesType = {
  customerId: number;
  page: number;
  size: number;
};

/**
 * fetchAccountUsers Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchAccountUsers(
  api: UserServiceType,
  action: FetchAccountUsersType
) {
  const { customerId, filters, page, size } = action;

  const newFilters = {
    ...filters,
    states: filters.states.length > 1 ? 'ALL' : filters.states
  };

  // Construct QueryParams from filters params
  const queryParams = `${parseParams(newFilters)}&size=${size}&page=${page}`;
  try {
    const fetchAccountUsersResponse = yield call(
      api.fetchAccountUsers,
      customerId,
      queryParams
    );
    if (fetchAccountUsersResponse.status === 200) {
      // Fetch Success
      yield put(
        UserActions.fetchAccountUsersSuccessResponse(
          fetchAccountUsersResponse.data.content,
          filters,
          page,
          fetchAccountUsersResponse.data.last,
          fetchAccountUsersResponse.data.totalElements
        )
      );

      // Load Image for All Events
    } else {
      yield put(
        UserActions.fetchAccountUsersFailureResponse(
          fetchAccountUsersResponse.data
        )
      );
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(UserActions.fetchAccountUsersCancelResponse());
    }
  }
}

/**
 * Invite User Middleware
 * @param {*} api
 * @param {*} action
 */
export function* inviteUser(api: UserServiceType, action: AnyAction) {
  const { customerId, data } = action;

  const customer = yield select(customerSelector);

  const dataTosend: AccountApiDefinitions.CustomerAccountSignInDTO = {
    email: data.emailAddress,
    role: data.role,
    customerId,
    casinoId: customer.casinoId,
    customerType: customer.type,
    requestState: 'PENDING'
  };

  // API Call
  const inviteUserResponse = yield call(api.inviteUser, dataTosend);
  if (inviteUserResponse.status === 201) {
    // get Id
    const userId = getObjectIdFromHeader(inviteUserResponse.headers);

    yield put(UserActions.fetchUserRequest(userId));
    yield put(UserActions.inviteUserSuccessResponse(userId));
    yield put(
      MessagesAction.addMessage(
        'INVITE_USER_SUCCESS',
        'SUCCESS',
        i18n.t('INVITE_USER_SUCCESS', {
          emailAddress: data.emailAddress
        }),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(UserActions.inviteUserFailureResponse());

    yield put(
      MessagesAction.addMessage(
        'INVITE_USER_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('INVITE_USER_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Edit  User Account Middleware
 * @param {*} api
 * @param {*} action
 */
export function* editUserAccount(api: UserServiceType, action: AnyAction) {
  const { customerAccountId, data } = action;
  const { customerId } = yield select(ownerSelector);
  // API Call
  const editUserAccountResponse = yield call(
    api.editUserAccount,
    customerId,
    customerAccountId,
    data
  );
  if (editUserAccountResponse.status === 200) {
    yield put(
      UserActions.editUserAccountSuccessResponse(customerAccountId, data)
    );
    yield put(
      MessagesAction.addMessage(
        'EDIT_USER_ACCOUNT_SUCCESS',
        'SUCCESS',
        i18n.t('EDIT_USER_ACCOUNT_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(UserActions.editUserAccountFailureResponse());

    yield put(
      MessagesAction.addMessage(
        'EDIT_USER_ACCOUNT_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('EDIT_USER_ACCOUNT_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Delete User Account Middleware
 * @param {*} api
 * @param {*} action
 */
export function* deleteUserAccount(api: UserServiceType, action: AnyAction) {
  const { customerAccountId } = action;
  const { customerId } = yield select(ownerSelector);
  // API Call
  const deleteUserAccountResponse = yield call(
    api.deleteUserAccount,
    customerId,
    customerAccountId
  );
  if (deleteUserAccountResponse.status === 204) {
    yield put(UserActions.deleteAccountSuccessResponse(customerAccountId));

    yield put(
      MessagesAction.addMessage(
        'DELETE_USER_SUCCESS',
        'SUCCESS',
        i18n.t('DELETE_ACCOUNT_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(UserActions.deleteAccountFailureResponse());

    yield put(
      MessagesAction.addMessage(
        'DELETE_USER_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('DELETE_ACCOUNT_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Resent Email Account Middleware
 * @param {*} api
 * @param {*} action
 */
export function* resendInvitation(api: UserServiceType, action: AnyAction) {
  const { email } = action;
  const { customerId } = yield select(ownerSelector);
  // API Call
  const resendInvitationResponse = yield call(
    api.resendInvitation,
    customerId,
    email
  );
  if (resendInvitationResponse.status === 204) {
    yield put(UserActions.resendInvitationSuccessResponse());

    yield put(
      MessagesAction.addMessage(
        'RESEND_INVITATION_SUCCESS',
        'SUCCESS',
        i18n.t('RESEND_INVITATION_ACCOUNT_SUCCESS', { emailAddress: email }),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(UserActions.resendInvitationFailureResponse());

    yield put(
      MessagesAction.addMessage(
        'RESEND_INVITATION_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('RESEND_INVITATION_ACCOUNT_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * fetchAccountUsers Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchActivitiesFeed(
  api: UserServiceType,
  action: FetchActivitiesType
) {
  const { customerId, page, size } = action;
  // Construct QueryParams from filters params
  const queryParams = `$size=${size}&page=${page}`;
  try {
    const fetchActivitiesResponse = yield call(
      api.fetchActivitiesFeed,
      customerId,
      queryParams
    );
    if (fetchActivitiesResponse.status === 200) {
      // Fetch Success
      yield put(
        UserActions.fetchActivitiesFeedSuccessResponse(
          customerId,
          fetchActivitiesResponse.data.content,
          page,
          fetchActivitiesResponse.data.last,
          fetchActivitiesResponse.data.totalElements
        )
      );
    } else {
      yield put(
        UserActions.fetchActivitiesFeedFailureResponse(
          fetchActivitiesResponse.data
        )
      );
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(UserActions.fetchActivitiesFeedCancelResponse());
    }
  }
}

/**
 * Update Profile information
 * @param {*} api
 * @param {*} action
 */
export function* saveProfile(api: UserServiceType, action: AnyAction) {
  const { data } = action;

  // Prepare Data for the Service
  const dataToSend = {
    firstName: data.firstName,
    lastName: data.lastName
    // phone: data.phone
  };

  // Select customer Id
  const { id } = yield select(ownerSelector);

  const saveProfileResponse: ApiResponseType<any> = yield call(
    api.updateProfile,
    id,
    dataToSend
  );

  if (saveProfileResponse.status === 200) {
    // Upload profile picture
    if (data.pictureProfile && data.pictureProfile.file) {
      const formData = new FormData();
      formData.append('image', data.pictureProfile.file);

      // We Try to upload Profile Picture
      const uploadPictureResponse: ApiResponseType<any> = yield call(
        api.uploadProfilePicture,
        id,
        formData
      );

      if (uploadPictureResponse.status === 201) {
        yield put(
          UserActions.saveProfileSuccessResponse(id, {
            firstName: data.firstName,
            lastName: data.lastName
            // phone: data.phone,
            // profilePicture
          })
        );

        yield fork(fetchUserProfilePicture, api, id);
      } else {
        /// Display An Error
        yield put(
          MessagesAction.addMessage(
            'SAVE_PROFILE_ERROR',
            CommonConstants.ERROR,
            i18n.t('GLOBAL_ERROR_MESSAGE', {
              action: i18n.t('SAVE_PROFILE_ACTION_ERROR')
            }),
            '',
            CommonConstants.PANEL
          )
        );
        // Set Error in Error Store
        yield put(UserActions.saveProfileFailureResponse());
      }
    } else {
      yield put(
        UserActions.saveProfileSuccessResponse(id, {
          firstName: data.firstName,
          lastName: data.lastName
          // phone: data.phone
        })
      );
    }
  } else {
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'SAVE_PROFILE_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('SAVE_PROFILE_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(UserActions.saveProfileFailureResponse());
  }
}
