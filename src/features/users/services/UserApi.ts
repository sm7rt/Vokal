// a library to wrap and simplify api calls
import { api } from '../../../services/Api';
import UsersConstants from '../constants/UsersConstants';
import { RoleType } from '../models/UsersModel.d';

const CUSTOMER_ID_VAR = '{customerId}';
const CUSTOMER_ACCOUNT_ID_VAR = '{customerAccountId}';

// our "constructor"
const create = () => {
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  /**
   * Get profile Information
   * Path : /profiles/api/${id}
   * @param {*} userId: Id of user
   * @returns 200 if OK
   */
  const fetchProfile = (customerId: number, customerAccountId: number) =>
    api.get(
      UsersConstants.GET_USER.replace(CUSTOMER_ID_VAR, customerId).replace(
        CUSTOMER_ACCOUNT_ID_VAR,
        customerAccountId
      )
    );

  /**
   * Get profile picture
   * Path : /gallery/api/album/${accountId}/profile
   * @param {*} customerAccountId : Id of user
   * @returns 200 if OK
   */
  const fetchProfilePicture = (customerAccountId: number) =>
    api.get(
      UsersConstants.GET_USER_PICTURE.replace(
        CUSTOMER_ID_VAR,
        customerAccountId
      )
    );

  /**
   * Find Users attached to a Customer Account
   */
  const fetchAccountUsers = (customerId: number, queryParams: string) =>
    api.get(
      `${UsersConstants.FIND_USERS_BY_CUSTOMER_ACCOUNT.replace(
        CUSTOMER_ID_VAR,
        customerId
      )}?${queryParams}`
    );

  /**
   * Invite User
   * @param {*} customerId
   * @param {*} data
   */
  const inviteUser = (data: AccountApiDefinitions.CustomerAccountSignInDTO) =>
    api.post(
      UsersConstants.INVITE_USER.replace(CUSTOMER_ID_VAR, data.customerId),
      { ...data }
    );

  /**
   * Edit User Account
   * @param {*} customerId
   * @param {*} userId
   * @param {*} data
   */
  const editUserAccount = (
    customerId: number,
    customerAccountId: number,
    role: RoleType
  ) =>
    api.put(
      `${UsersConstants.EDIT_USER_ROLE.replace(
        CUSTOMER_ID_VAR,
        customerId
      ).replace(CUSTOMER_ACCOUNT_ID_VAR, customerAccountId)}`,
      { role }
    );

  /**
   * Delete User Account
   * @param {*} customerId
   * @param {*} userId
   */
  const deleteUserAccount = (customerId: number, customerAccountId: number) =>
    api.delete(
      `${UsersConstants.DELETE_USER.replace(
        CUSTOMER_ID_VAR,
        customerId
      ).replace(CUSTOMER_ACCOUNT_ID_VAR, customerAccountId)}`
    );

  /**
   * Resend Invitation
   * @param {*} email : The email of account
   */
  const resendInvitation = (customerId: number, email: string) =>
    api.post(
      UsersConstants.RESEND_INVITE_USER.replace(
        CUSTOMER_ID_VAR,
        customerId
      ).replace('{email}', email)
    );

  /**
   *
   * @param customerId
   * @param queryParams
   */
  const fetchActivitiesFeed = (customerId: number, queryParams: string) => {
    return {
      status: 200,
      data: {
        content: [],
        last: true,
        totalElements: 0
      }
    };
  };
  /**
   * TODO: Call back end url
   * Update Profile
   * @param {*} customerAccountId : The id of customer Account
   * @param {*} data : The profile content
   */
  const updateProfile = (customerAccountId: number, data: any) =>
    api.put(
      `${UsersConstants.EDIT_USER_ACCOUNT.replace(
        CUSTOMER_ACCOUNT_ID_VAR,
        customerAccountId
      )}`,
      {
        firstName: data.firstName,
        lastName: data.lastName
      }
    );

  /**
   * TODO: Call back end url
   * Update Profile
   * @param {*} customerAccountId : The id of customer
   * @param {*} data : The profile picture
   */
  const uploadProfilePicture = (customerAccountId: number, data: any) =>
    api.post(
      `${UsersConstants.UPLOAD_USER_PICTURE.replace(
        CUSTOMER_ID_VAR,
        customerAccountId
      )}`,
      data,
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data;'
        }
      }
    );

  // ------
  // STEP 3
  // ------
  //

  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    fetchProfile,
    fetchProfilePicture,
    fetchAccountUsers,
    inviteUser,
    deleteUserAccount,
    resendInvitation,
    fetchActivitiesFeed,
    editUserAccount,
    updateProfile,
    uploadProfilePicture
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};
