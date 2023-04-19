import { ImmutableObject } from 'seamless-immutable';

export type RoleType =
  | 'ADMIN'
  | 'LIMITED_ADMIN'
  | 'POKER_MANAGER'
  | 'COMMUNITY_MANAGER';

export type UserAccount = {
  id: string;
  data: {
    active: boolean;
    email: string;
    firstName: string;
    lastName: string;
    role: RoleType;
  };
  activitiesFeed: {
    data: Array<AccountApiDefinitions.Activity>;
    page: number;
    last: boolean;
    size: number;
    totalElements: number;
  };
};

export type UserSearchFormValuesType = {
  search: string;
};

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

type UsersStateType = {
  list: Array<AccountApiDefinitions.CustomerAccount>;
  accountList: {
    data: Array<AccountApiDefinitions.CustomerAccount>;
    page: number;
    last: boolean;
    size: number;
    totalElements: number;
  };
};

export type IUsersImmutableStateType = ImmutableObject<UsersStateType>;

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type UserServiceType = {
  fetchProfile: (customerId: number, userId: number) => any;
  fetchProfilePicture: (userId: number) => any;
  fetchAccountUsers: (customerId: number, queryParams: string) => any;
  inviteUser: (data: AccountApiDefinitions.CustomerAccountSignInDTO) => void;
  deleteUserAccount: (customerId: number, customerAccountId: number) => void;
  resendInvitation: (customerId: number, email: string) => void;
  editUserAccount: (
    customerId: number,
    customerAccountId: number,
    role: RoleType
  ) => void;
  fetchActivitiesFeed: (customerId: number, queryParams: string) => void;
  updateProfile: (
    customerId: number,
    data: AccountApiDefinitions.CustomerProfileDTO
  ) => void;
  uploadProfilePicture: (customerId: number, data: any) => void;
};
