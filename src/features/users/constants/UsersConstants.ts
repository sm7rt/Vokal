// Users module constants
// Export Default
export default {
  FORM_SEARCH_USER: 'form-search-user',
  FORM_INVITE_USER: 'form-invite-user',
  FORM_PROFILE: 'form-profile',

  // Services
  GET_USER:
    '/accounts/api/customer/{customerId}/customer_account/{customerAccountId}',
  EDIT_USER_ROLE:
    '/accounts/api/customer/{customerId}/customer_account/{customerAccountId}/role',
  DELETE_USER:
    '/accounts/api/customer/{customerId}/customer_account/{customerAccountId}',
  INVITE_USER: '/accounts/api/customer/{customerId}/invite',
  RESEND_INVITE_USER:
    '/accounts/api/customer/{customerId}/invite/{email}/resend',
  FIND_USERS_BY_CUSTOMER_ACCOUNT:
    '/accounts/api/customer/{customerId}/customer_account/list',
  EDIT_USER_ACCOUNT: '/accounts/api/customer/{customerAccountId}/profile',
  UPLOAD_USER_PICTURE: '/gallery/api/customer/{customerId}',
  GET_USER_PICTURE: '/gallery/api/customer/{customerId}'
};
