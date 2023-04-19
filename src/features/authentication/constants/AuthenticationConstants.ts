// Authentication module constants
// Export Default
export default {
  // Form
  FORM_SIGNIN: 'signin',
  FORM_SIGNUP: 'signup',
  FORM_RESET_PASSWORD: 'reset-password',
  FORM_NEW_PASSWORD: 'new-password',

  // Services
  SIGNIN_SERVICE: '/accounts/api/login',
  VALIDATE_MAIL_SERVICE: '/customers/api/activate/customer',
  SIGNUP_SERVICE: '/customers/api/',
  RESEND_MAIL_SERVICE: '/customers/api/activate/customer/<email>/resend_token',
  CHECK_CHANGE_PASSWORD_SERVICE:
    '/accounts/api/customer/<email>/reset_password',
  CHANGE_PASSWORD_SERVICE: '/accounts/api/customer/<email>/reset_password',
  FORGOT_PASSWORD_SERVICE: '/accounts/api/customer/<email>/forgot_password',

  // Errors
  INVALID_EMAIL_PASSWORD_ERROR_CODE: 'ERR_ACCOUNT_003',
  ACCOUNT_EMAIL_ALREADY_EXIST_ERROR_CODE: 'ERR_CUSTOMER_001',
  ACCOUNT_ADMIN_EMAIL_ALREADY_EXIST_ERROR_CODE: 'ERR_CUSTOMER_002',
  ACCOUNT_BRAND_NAME_ALREADY_EXIST_ERROR_CODE: 'ERR_CUSTOMER_003',
  ACCOUNT_CHANGE_PASSWORD_TOKEN_EXPIRED: 'ERR_ACCOUNT_006',
  ACCOUNT_CHANGE_PASSWORD_INVALID: 'ERR_ACCOUNT_003',
  ACCOUNT_TOKEN_INVALID: 'ERR_ACCOUNT_003',
  ACCOUNT_NOT_FOUND: 'ERROR_ACCOUNT_NOT_FOUND '
};
