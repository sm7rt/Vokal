// a library to wrap and simplify api calls
import AuthenticationConstants from '../constants/AuthenticationConstants';
import { api } from '../../../services/Api';
import { ApiResponseType } from '../../../common/models/index.d';
import {
  AccountLoggedDTO,
  SignupFormValuesType
} from '../models/AuthenticationModel.d';

// our "constructor"
const create = () => {
  /**
   * Login Method
   * @param email : the email of user
   * @param password: the password of users
   */
  const signin = (
    email: string,
    password: string
  ): Promise<ApiResponseType<AccountLoggedDTO>> =>
    api.post(AuthenticationConstants.SIGNIN_SERVICE, {
      email,
      password,
      loginOrigin: 'FLOP_AD'
    });

  /**
   * Signup Method
   * @param accountData : Datas of account
   */
  const signup = (
    accountData: SignupFormValuesType
  ): Promise<ApiResponseType<any>> =>
    api.post(AuthenticationConstants.SIGNUP_SERVICE, {
      ...accountData
    });

  /**
   * Resend email method
   * @param email : the email of user
   */
  const resendEmail = (email: string): Promise<ApiResponseType<Account>> =>
    api.post(
      `${AuthenticationConstants.RESEND_MAIL_SERVICE.replace('<email>', email)}`
    );

  /**
   * Validate Mail Method
   * @param email
   * @param activationToken
   */
  const validateMail = (
    email: string,
    activationToken: string
  ): Promise<ApiResponseType<any>> =>
    api.post(
      AuthenticationConstants.VALIDATE_MAIL_SERVICE,
      {},
      {
        params: {
          emailAdmin: email,
          activationToken
        }
      }
    );

  /**
   * Reset password method
   * @param email : the email of user
   */
  const resetPassword = (email: string): Promise<ApiResponseType<Account>> =>
    api.post(
      `${AuthenticationConstants.FORGOT_PASSWORD_SERVICE.replace(
        '<email>',
        email
      )}`
    );

  /**
   * Check Access to Change Password interface
   * @param email
   * @param token
   */
  const checkAccessForChangePassword = (
    email: string,
    token: string
  ): Promise<ApiResponseType<any>> =>
    api.get(
      `${AuthenticationConstants.CHECK_CHANGE_PASSWORD_SERVICE.replace(
        '<email>',
        email
      )}`,
      {
        resetPasswordToken: token
      }
    );

  /**
   * Check Access to Setting New Password interface
   * @param email
   * @param token
   */
  const checkAccessForSettingNewPassword = (
    email: string,
    token: string
  ): Promise<ApiResponseType<any>> =>
    api.get(
      `${AuthenticationConstants.CHECK_CHANGE_PASSWORD_SERVICE.replace(
        '<email>',
        email
      )}`,
      {
        resetPasswordToken: token
      }
    );

  /**
   * Check Access to New Password interface
   * @param email
   * @param token
   */
  const changePassword = (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordCheck: string,
    token: string
  ): Promise<ApiResponseType<any>> =>
    api.post(
      `${AuthenticationConstants.CHANGE_PASSWORD_SERVICE.replace(
        '<email>',
        email
      )}`,
      {
        firstName,
        lastName,
        newPassword: password,
        passwordCheck,
        resetPasswordToken: token
      }
    );

  return {
    // a list of the API functions from step 2
    signin,
    signup,
    resetPassword,
    resendEmail,
    validateMail,
    checkAccessForChangePassword,
    checkAccessForSettingNewPassword,
    changePassword
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};
