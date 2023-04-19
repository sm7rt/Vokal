import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { reset, initialize, stopAsyncValidation } from 'redux-form';
import i18n from '../../../i18n';
import AuthenticationActions from '../redux/AuthenticationRedux';
import AuthenticationConstants from '../constants/AuthenticationConstants';
import MessagesAction from '../../../common/redux/SystemMessagesRedux';

import {
  AccountLoggedDTO,
  AuthenticationServiceType,
  SignInActionType,
  SignUpActionType,
  ResetPasswordActionType,
  ChangePasswordActionType,
  ValidateMailActionType,
  CheckAccessForChangePasswordActionType
} from '../models/AuthenticationModel.d';
import { ApiResponseType } from '../../../common/models/index.d';
import CommonConstants from '../../../common/constants/CommonConstants';

/**
 * Signin Middleware
 * @param {*} api
 * @param {*} action
 */
export function* signIn(
  api: AuthenticationServiceType,
  action: SignInActionType
) {
  const { email, password } = action;
  const AuthenticationResponse: ApiResponseType<AccountLoggedDTO> = yield call(
    api.signin,
    email,
    password
  );

  if (AuthenticationResponse.status === 200) {
    const signinData = {
      ...AuthenticationResponse.data
    };

    // Authentication Success
    yield put(
      AuthenticationActions.signInSuccessResponse(
        signinData,
        AuthenticationResponse.headers &&
          AuthenticationResponse.headers.authorization
      )
    );

    // Redirect to / path
    yield put(push('/'));

    // Reset Form
    yield put(reset(AuthenticationConstants.FORM_SIGNIN));

    // Send Message Success Login
    yield put(
      MessagesAction.addMessage(
        'SIGNIN_SUCCESS',
        CommonConstants.SUCCESS,
        i18n.t('SIGNIN_ACTION_SUCCESS', { email }),
        '',
        CommonConstants.PANEL
      )
    );
  } else if (AuthenticationResponse.status === 401) {
    // Unauthorized
    if (
      AuthenticationResponse.data &&
      AuthenticationConstants.INVALID_EMAIL_PASSWORD_ERROR_CODE ===
        AuthenticationResponse.data.errorCode
    ) {
      // We prepare errors object with redux field
      const errors = {
        email: i18n.t('FAILURE_SIGNIN_TEXT'),
        password: i18n.t('FAILURE_SIGNIN_TEXT')
      };

      // Trigger Error Message for Field
      yield put(
        stopAsyncValidation(AuthenticationConstants.FORM_SIGNIN, errors)
      );
    } else {
      // Display An Error
      yield put(
        MessagesAction.addMessage(
          'SIGNIN_ERROR',
          CommonConstants.ERROR,
          i18n.t('GLOBAL_ERROR_MESSAGE', {
            action: i18n.t('SIGNIN_ACTION_ERROR')
          }),
          '',
          CommonConstants.PANEL
        )
      );
    }
    // Set Error in Error Store
    yield put(
      AuthenticationActions.signInFailureResponse({
        message: i18n.t('FAILURE_SIGNIN_TEXT')
      })
    );
  } else {
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'SIGNIN_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('SIGNIN_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(
      AuthenticationActions.signInFailureResponse({
        message: i18n.t('FAILURE_SIGNIN_TEXT')
      })
    );
  }
}

/**
 * Signin Middleware
 * @param {*} api
 * @param {*} action
 */
export function* signUp(
  api: AuthenticationServiceType,
  action: SignUpActionType
) {
  const { accountData } = action;
  const AuthenticationResponse: ApiResponseType<any> = yield call(
    api.signup,
    accountData
  );
  if (AuthenticationResponse.status === 201) {
    // Signup Success
    yield put(AuthenticationActions.signUpSuccessResponse());

    // Redirect to correct path
    yield put(push(`/auth/account/${accountData.emailAdminUser}/email_check`));

    // Reset Form
    yield put(reset(AuthenticationConstants.FORM_SIGNUP));
  } else if (AuthenticationResponse.status === 400) {
    // Manage ERR_CUSTOMER_001
    const error = AuthenticationResponse.data;
    let errorsForm, message;
    if (
      AuthenticationConstants.ACCOUNT_EMAIL_ALREADY_EXIST_ERROR_CODE ===
      error.errorCode
    ) {
      // Show Error in form
      // We prepare errors object with redux field
      errorsForm = {
        emailContact: i18n.t('FAILURE_SIGNUP_EMAIL_TEXT')
      };
      message = i18n.t('EMAIL_ALREADY_EXIST_TEXT', {
        addressEmail: accountData.emailContact
      });
    } else if (
      AuthenticationConstants.ACCOUNT_ADMIN_EMAIL_ALREADY_EXIST_ERROR_CODE ===
      error.errorCode
    ) {
      // Show Error in form
      // We prepare errors object with redux field
      errorsForm = {
        emailAdminUser: i18n.t('FAILURE_SIGNUP_EMAIL_ADMIN_TEXT')
      };
      message = i18n.t('EMAIL_ALREADY_EXIST_TEXT', {
        addressEmail: accountData.emailContact
      });
    } else if (
      AuthenticationConstants.ACCOUNT_BRAND_NAME_ALREADY_EXIST_ERROR_CODE ===
      error.errorCode
    ) {
      // Show Error in form
      // We prepare errors object with redux field
      errorsForm = {
        brand: i18n.t('FAILURE_SIGNUP_BRAND_TEXT')
      };
      message = i18n.t('BRAND_ALREADY_EXIST_TEXT', {
        addressEmail: accountData.brand
      });
    }

    // Trigger Error Message for Field
    yield put(
      stopAsyncValidation(AuthenticationConstants.FORM_SIGNUP, errorsForm)
    );

    // Display a Message
    yield put(
      MessagesAction.addMessage(
        'SIGNUP_ERROR',
        CommonConstants.ERROR,
        message,
        '',
        CommonConstants.PANEL
      )
    );

    // Set Error in Error Store
    yield put(AuthenticationActions.signUpFailureResponse());
  } else {
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'SIGNUP_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('SIGNUP_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(AuthenticationActions.signUpFailureResponse());
  }
}

/**
 * Validate email
 */
export function* validateEmail(
  api: AuthenticationServiceType,
  action: ValidateMailActionType
) {
  const { email, activationToken } = action;
  const validationMailResponse: ApiResponseType<any> = yield call(
    api.validateMail,
    email,
    activationToken
  );

  if (validationMailResponse.status === 204) {
    // Validation Mail Success
    yield put(AuthenticationActions.validateEmailSuccessResponse());

    // Redirect
    yield put(push('/auth/account/license_verification'));
  } else if (validationMailResponse.status === 400) {
    yield put(push('/auth/bad_request'));

    // Set Error in Error Store
    yield put(AuthenticationActions.validateEmailFailureResponse());
  } else {
    yield put(push('/auth/error'));

    // Set Error in Error Store
    yield put(AuthenticationActions.validateEmailFailureResponse());
  }
}

/**
 * Resend email
 */
export function* resendEmail(
  api: AuthenticationServiceType,
  action: ResetPasswordActionType
) {
  const { email } = action;
  const resendEmailData: ApiResponseType<any> = yield call(
    api.resendEmail,
    email
  );

  if (resendEmailData.status === 204) {
    // Reset Password Success
    yield put(AuthenticationActions.resendEmailSuccessResponse());

    // Display Success Message
    // Display An Error
    yield put(
      MessagesAction.addMessage(
        'RESEND_EMAIL_SUCCESS',
        CommonConstants.SUCCESS,
        `A new mail was sended to ${email}`,
        '',
        CommonConstants.PANEL
      )
    );
  } else {
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'RESEND_EMAIL_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('RESEND_EMAIL_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(AuthenticationActions.resendEmailFailureResponse());
  }
}

/**
 * Reset password
 */
export function* resetPassword(
  api: AuthenticationServiceType,
  action: ResetPasswordActionType
) {
  const { email } = action;
  const resetPasswordData: ApiResponseType<any> = yield call(
    api.resetPassword,
    email
  );

  if (resetPasswordData.status === 204) {
    // Reset Password Success
    yield put(AuthenticationActions.resetPasswordSuccessResponse());

    // Redirect to correct path
    yield put(
      push(`/auth/account/reset_password_succeed?email=${action.email}`)
    );
  } else {
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'RESET_PASSWORD_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('RESET_PASSWORD_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(AuthenticationActions.resetPasswordFailureResponse());
  }
}

/**
 * Access Control for changing password
 */
export function* checkAccessForChangePassword(
  api: AuthenticationServiceType,
  action: CheckAccessForChangePasswordActionType
) {
  const { email, activationToken } = action;
  const checkAccessForChangePasswordResponse: ApiResponseType<any> = yield call(
    api.checkAccessForChangePassword,
    email,
    activationToken
  );

  if (checkAccessForChangePasswordResponse.status === 204) {
    // Reset Password Success
    yield put(AuthenticationActions.changePasswordGrantSuccessResponse());
  } else {
    // Set Error in Error Store
    yield put(AuthenticationActions.changePasswordGrantFailureResponse());
  }
}

/**
 * Access Control for setting a new password
 */
export function* checkAccessForSettingNewPassword(
  api: AuthenticationServiceType,
  action: CheckAccessForChangePasswordActionType
) {
  const { email, activationToken } = action;
  const checkAccessForNewPasswordResponse: ApiResponseType<any> = yield call(
    api.checkAccessForSettingNewPassword,
    email,
    activationToken
  );

  if (checkAccessForNewPasswordResponse.status === 204) {
    // Reset Password Success
    yield put(AuthenticationActions.newPasswordGrantSuccessResponse());
  } else {
    // Set Error in Error Store
    yield put(AuthenticationActions.newPasswordGrantFailureResponse());
  }
}

/**
 * Change password
 */
export function* changePassword(
  api: AuthenticationServiceType,
  action: ChangePasswordActionType
) {
  const {
    email,
    firstName,
    lastName,
    password,
    password_check,
    token,
    actionType
  } = action;
  const changePasswordResponse: ApiResponseType<any> = yield call(
    api.changePassword,
    email,
    firstName,
    lastName,
    password,
    password_check,
    token
  );

  if (changePasswordResponse.status === 204) {
    // Reset Password Success
    yield put(AuthenticationActions.changePasswordSuccessResponse());

    // Initialize signin form
    yield put(
      initialize(AuthenticationConstants.FORM_SIGNIN, {
        email,
        password,
        rememberMe: true
      })
    );

    // Redirect to correct path
    if (actionType === 'SET_PASSWORD') {
      // Need to signin before
      yield put(AuthenticationActions.signInRequest(email, password));
    } else {
      yield put(push('/auth/signin'));
    }
  } else if (changePasswordResponse.status === 400) {
    // Manage ERR_CUSTOMER_001
    const error = changePasswordResponse.data;
    let message = i18n.t('GLOBAL_ERROR_MESSAGE', {
      action: i18n.t('CHANGE_PASSWORD_ACTION_ERROR')
    });
    if (
      AuthenticationConstants.ACCOUNT_CHANGE_PASSWORD_TOKEN_EXPIRED ===
      error.errorCode
    ) {
      message = i18n.t('CHANGE_PASSWORD_TOKEN_EXPIRED_ERROR');
    } else if (
      AuthenticationConstants.ACCOUNT_CHANGE_PASSWORD_INVALID ===
      error.errorCode
    ) {
      // Show Error in form
      // We prepare errors object with redux field
      const errorsForm = {
        password_check: i18n.t('CHANGE_PASSWORD_PASSWORD_INVALID_ERROR')
      };
      message = i18n.t('CHANGE_PASSWORD_PASSWORD_INVALID_ERROR');

      // Trigger Error Message for Field
      yield put(
        stopAsyncValidation(
          AuthenticationConstants.FORM_NEW_PASSWORD,
          errorsForm
        )
      );
    } else if (
      AuthenticationConstants.ACCOUNT_TOKEN_INVALID === error.errorCode
    ) {
      message = i18n.t('CHANGE_PASSWORD_TOKEN_INVALID_ERROR');
    }
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'CHANGE_PASSWORD_ERROR',
        CommonConstants.ERROR,
        message,
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(AuthenticationActions.changePasswordFailureResponse());
  } else {
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'CHANGE_PASSWORD_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('CHANGE_PASSWORD_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(AuthenticationActions.changePasswordFailureResponse());
  }
}
