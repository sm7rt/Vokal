import { SignupFormValuesType } from '../models/AuthenticationModel.d';

// Export All Authentication Fixture API
// Export Default
export default {
  // Signin Call
  signin: (email: string, password: string) => ({
    status: 200,
    data: {
      email: 's.paquis@we-opt.com',
      id: 1096,
      managedCasinoId: '254654556',
      customerId: 23
    },
    headers: {
      authorization: 'Bearer Xdfsdfsfxfwfedfdsfds'
    }
  }),

  // Signup Call
  signup: (accountData: SignupFormValuesType) => ({
    status: 201,
    data: {}
  }),

  // Validate Email Call
  validateMail: (email: string, activationToken: string) => ({ status: 200 }),

  // Reset Password Call
  resetPassword: (email: string) => ({ status: 204 }),

  // Resend Email Call
  resendEmail: (email: string) => ({ status: 204 }),

  /**
   * Check Access to New Password interface
   * @param email
   * @param token
   */
  checkAccessForChangePassword: (email: string, token: string) => {
    if (email === 'test@we-opt.com') {
      return { status: 403 };
    }
    return { status: 204 };
  },

  /**
   * Check Access to Setting New Password interface
   * @param email
   * @param token
   */
  checkAccessForSettingNewPassword: (email: string, token: string) => {
    if (email === 'test@we-opt.com') {
      return { status: 403 };
    }
    return { status: 204 };
  },

  /**
   * Change The password
   * @param email
   */
  changePassword: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    password_check: string,
    token: string
  ) => ({ status: 204 })
};
