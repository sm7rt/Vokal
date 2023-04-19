import { ImmutableObject } from 'seamless-immutable';

// ******************************** //
// *********** Services  ************ //
// ******************************** //

export type LoggedDTO = {
  id: number;
  lastConnexion: Date;
};

export type AccountLoggedDTO = AccountApiDefinitions.AccountLoginDTO &
  LoggedDTO;

// ******************************** //
// *********** Screen  ************ //
// ******************************** //

export type SigninFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupFormValuesType = {
  type: 'CASINO' | 'OPERATOR';
  licenceAuthority: string;
  referenceNumber: string;
  license: string;
  brand: string;
  emailAdminUser: string;
  emailContact: string;
  address: {
    phoneNumber: string;
    streetAddress: string;
    country: string;
    countryCode: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

export type ResetPasswordFormValuesType = {
  email: string;
};

export type ChangePasswordFormValuesType = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  password_check: string;
};

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

type AuthenticationStateType = {
  authorizationToken?: string; // AuthorizationToken
  signin?: AccountLoggedDTO;
  customer?: CustomerApiDefinitions.Customer;
};

export type SignInActionType = {
  email: string;
  password: string;
};

export type SignUpActionType = {
  accountData: SignupFormValuesType;
};

export type ResetPasswordActionType = {
  email: string;
};

export type ValidateMailActionType = {
  email: string;
  activationToken: string;
};

export type CheckAccessForChangePasswordActionType = {
  email: string;
  activationToken: string;
};

export type ChangePasswordActionType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password_check: string;
  token: string;
  redirectUrl: string;
};

export type AuthenticationImmutableStateType = ImmutableObject<
  AuthenticationStateType
>;

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type AuthenticationServiceType = {
  signin: (email: string, password: string) => any;
  signup: (accountData: SignupFormValuesType) => any;
  changePassword: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    password_check: string,
    token: string
  ) => any;
  checkAccessForChangePassword: (email: string, token: string) => any;
  checkAccessForSettingNewPassword: (email: string, token: string) => any;
  resetPassword: (email: string) => any;
  resendEmail: (email: string) => any;
  validateMail: (email: string, activationToken: string) => any;
};
