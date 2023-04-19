import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { stopAsyncValidation, reset, initialize } from 'redux-form';
import { push } from 'connected-react-router';
import i18n from '../../../../i18n';
import FixtureAuthenticationApi from '../../services/FixtureAuthenticationApi';
import {
  signIn,
  signUp,
  resetPassword,
  changePassword,
  resendEmail,
  validateEmail,
  checkAccessForChangePassword
} from '../AuthenticationSagas';
import AuthenticationActions from '../../redux/AuthenticationRedux';
import AuthenticationConstants from '../../constants/AuthenticationConstants';
import MessagesAction from '../../../../common/redux/SystemMessagesRedux';
import CommonConstants from '../../../../common/constants/CommonConstants';

// Testing the signIn MiddleWare Success
test('signIn Middleware Success', () => {
  // Prepare
  const action = {
    email: 'user@gmail.com',
    password: 'password'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 200,
    data: {
      id: '1',
      lastConnexion: new Date(),
      firstName: 'Jean',
      lastName: 'Valjean'
    },
    headers: {
      authorization: 'Bearer blbablablablba'
    }
  };

  const returnExpected = {
    ...serviceResultSuccess.data
  };

  // Act & Assert
  return expectSaga(signIn, FixtureAuthenticationApi, action)
    .provide([
      [matchers.call.fn(FixtureAuthenticationApi.signin), serviceResultSuccess]
    ])
    .put(
      AuthenticationActions.signInSuccessResponse(
        returnExpected,
        serviceResultSuccess.headers.authorization
      )
    )
    .put(push('/'))
    .put(reset(AuthenticationConstants.FORM_SIGNIN))
    .put(
      MessagesAction.addMessage(
        'SIGNIN_SUCCESS',
        'SUCCESS',
        `Welcome to your dashboard : ${action.email}`,
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing the signIn MiddleWare Error
test('signIn Middleware Error', () => {
  // Prepare
  const action = {
    email: 'user@gmail.com',
    password: 'password'
  };

  // Service Result Error
  const serviceResultError = {
    status: 401,
    data: {
      errorCode: AuthenticationConstants.INVALID_EMAIL_PASSWORD_ERROR_CODE
    }
  };

  const errors = {
    email: i18n.t('FAILURE_SIGNIN_TEXT'),
    password: i18n.t('FAILURE_SIGNIN_TEXT')
  };

  // Act & Assert
  return expectSaga(signIn, FixtureAuthenticationApi, action)
    .provide([
      [matchers.call.fn(FixtureAuthenticationApi.signin), serviceResultError]
    ])
    .put(stopAsyncValidation(AuthenticationConstants.FORM_SIGNIN, errors))
    .put(
      AuthenticationActions.signInFailureResponse({
        message: i18n.t('FAILURE_SIGNIN_TEXT')
      })
    )
    .run();
});

// Testing the signIn MiddleWare Success
test('signUp Middleware Success', () => {
  // Prepare
  const action = {
    accountData: {
      type: 'CASINO',
      referenceNumber: '23423',
      licence: 'ezrzerzer',
      brand: 'Casino',
      emailAdminUser: 'zerzer@mail.com',
      emailContact: 'ezzerez@gmail.com',
      phoneNumber: '+33 4 24 32 32 31',
      address: {
        streetAddress: '12 rue des lilas',
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        state: 'Seine Maritime',
        postalCode: '93000'
      }
    }
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 201,
    data: {}
  };

  // Act & Assert
  return expectSaga(signUp, FixtureAuthenticationApi, action)
    .provide([
      [matchers.call.fn(FixtureAuthenticationApi.signup), serviceResultSuccess]
    ])
    .put(AuthenticationActions.signUpSuccessResponse())
    .put(push(`/auth/account/${action.accountData.emailAdminUser}/email_check`))
    .put(reset(AuthenticationConstants.FORM_SIGNUP))
    .run();
});

// Testing the signUp MiddleWare Error
test('signUp Middleware Error : ACCOUNT_EMAIL_ALREADY_EXIST_ERROR_CODE', () => {
  // Prepare
  const action = {
    accountData: {
      type: 'CASINO',
      referenceNumber: '23423',
      licence: 'ezrzerzer',
      brand: 'Casino',
      emailAdminUser: 'zerzer@mail.com',
      emailContact: 'ezzerez@gmail.com',
      phoneNumber: '+33 4 24 32 32 31',
      address: {
        streetAddress: '12 rue des lilas',
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        state: 'Seine Maritime',
        postalCode: '93000'
      }
    }
  };

  // Service Result Error
  const serviceResultError = {
    status: 400,
    data: {
      errorCode: AuthenticationConstants.ACCOUNT_EMAIL_ALREADY_EXIST_ERROR_CODE
    }
  };

  const errors = {
    emailContact: i18n.t('FAILURE_SIGNUP_EMAIL_TEXT')
  };

  // Act & Assert
  return expectSaga(signUp, FixtureAuthenticationApi, action)
    .provide([
      [matchers.call.fn(FixtureAuthenticationApi.signup), serviceResultError]
    ])
    .put(stopAsyncValidation(AuthenticationConstants.FORM_SIGNUP, errors))
    .put(
      MessagesAction.addMessage(
        'SIGNUP_ERROR',
        'ERROR',
        i18n.t('EMAIL_ALREADY_EXIST_TEXT', {
          addressEmail: action.accountData.emailContact
        }),
        '',
        'PANEL'
      )
    )
    .put(AuthenticationActions.signUpFailureResponse())
    .run();
});

// Testing the validateMail MiddleWare Success
test('validateMail Middleware Success', () => {
  // Prepare
  const action = {
    email: 'zerzer@mail.com',
    activationToken: '70b4b6a3-0796-40c8-a266-6dc86c6e9f81'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(validateEmail, FixtureAuthenticationApi, action)
    .provide([
      [
        matchers.call.fn(FixtureAuthenticationApi.validateMail),
        serviceResultSuccess
      ]
    ])
    .put(AuthenticationActions.validateEmailSuccessResponse())
    .put(push(`/auth/account/license_verification`))
    .run();
});

// Testing the resetPassword MiddleWare Success
test('resetPassword Middleware Success', () => {
  // Prepare
  const action = {
    email: 'zerzer@mail.com'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(resetPassword, FixtureAuthenticationApi, action)
    .provide([
      [
        matchers.call.fn(FixtureAuthenticationApi.resetPassword),
        serviceResultSuccess
      ]
    ])
    .put(AuthenticationActions.resetPasswordSuccessResponse())
    .put(push(`/auth/account/reset_password_succeed?email=${action.email}`))
    .run();
});

// Testing the resendEmail MiddleWare Success
test('resendEmail Middleware Success', () => {
  // Prepare
  const action = {
    email: 'zerzer@mail.com'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(resendEmail, FixtureAuthenticationApi, action)
    .provide([
      [
        matchers.call.fn(FixtureAuthenticationApi.resendEmail),
        serviceResultSuccess
      ]
    ])
    .put(AuthenticationActions.resendEmailSuccessResponse())
    .put(
      MessagesAction.addMessage(
        'RESEND_EMAIL_SUCCESS',
        'SUCCESS',
        `A new mail was sended to ${action.email}`,
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing the Check Access For Change Password MiddleWare Success
test('checkAccessForChangePassword Middleware Success', () => {
  // Prepare
  const action = {
    email: 'zerzer@mail.com',
    activationToken: '70b4b6a3-0796-40c8-a266-6dc86c6e9f81'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(
    checkAccessForChangePassword,
    FixtureAuthenticationApi,
    action
  )
    .provide([
      [
        matchers.call.fn(FixtureAuthenticationApi.checkAccessForChangePassword),
        serviceResultSuccess
      ]
    ])
    .put(AuthenticationActions.changePasswordGrantSuccessResponse())
    .run();
});

// Testing the changePassword MiddleWare Success
test('SetPassword Middleware Success', () => {
  // Prepare
  const action = {
    email: 'zerzer@mail.com',
    password: 'password',
    password_check: 'password',
    token: 'OEROEZJRZEOROOZ',
    actionType: 'SET_PASSWORD'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(changePassword, FixtureAuthenticationApi, action)
    .provide([
      [
        matchers.call.fn(FixtureAuthenticationApi.changePassword),
        serviceResultSuccess
      ]
    ])
    .put(
      initialize(AuthenticationConstants.FORM_SIGNIN, {
        email: action.email,
        password: action.password,
        rememberMe: true
      })
    )
    .put(AuthenticationActions.signInRequest(action.email, action.password))
    .run();
});

// Testing the changePassword MiddleWare Success
test('ChangePassword Middleware Success', () => {
  // Prepare
  const action = {
    email: 'zerzer@mail.com',
    password: 'password',
    password_check: 'password',
    token: 'OEROEZJRZEOROOZ',
    actionType: 'CHANGE_PASSWORD'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(changePassword, FixtureAuthenticationApi, action)
    .provide([
      [
        matchers.call.fn(FixtureAuthenticationApi.changePassword),
        serviceResultSuccess
      ]
    ])
    .put(
      initialize(AuthenticationConstants.FORM_SIGNIN, {
        email: action.email,
        password: action.password,
        rememberMe: true
      })
    )
    .put(push('/auth/signin'))
    .run();
});

// Testing the changePassword MiddleWare Error
test('changePassword Middleware Error', () => {
  // Prepare
  const action = {
    email: 'zerzer@mail.com',
    password: 'password',
    password_check: 'password',
    token: 'OEROEZJRZEOROOZ',
    actionType: 'CHANGE_PASSWORD'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 400,
    data: {
      error: {
        errorCode: AuthenticationConstants.ACCOUNT_CHANGE_PASSWORD_TOKEN_EXPIRED
      }
    }
  };

  // Act & Assert
  return expectSaga(changePassword, FixtureAuthenticationApi, action)
    .provide([
      [
        matchers.call.fn(FixtureAuthenticationApi.changePassword),
        serviceResultSuccess
      ]
    ])
    .put(
      MessagesAction.addMessage(
        'CHANGE_PASSWORD_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('CHANGE_PASSWORD_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    )
    .put(AuthenticationActions.changePasswordFailureResponse())
    .run();
});
