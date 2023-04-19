import { RoleType } from '../models/UsersModel.d';

const userList = [
  {
    id: '231478',
    status: 'PENDING',
    email: 'kevin.inthekitchen@gmail.com',
    firstName: 'Kevin',
    lastName: 'Inthekitchen',
    requestState: 'LIMITED_ADMIN'
  },
  {
    id: '545678',
    status: 'PENDING',
    email: 'kevin.david@gmail.com',
    firstName: 'Kevin',
    lastName: 'David',
    requestState: 'POKER_MANAGER'
  },
  {
    id: '546123',
    status: 'VERIFIED',
    email: 'brian.smith@gmail.com',
    firstName: 'Brian',
    lastName: 'Smith',
    requestState: 'COMMUNITY_MANAGER'
  },
  {
    id: '546941',
    status: 'VERIFIED',
    email: 'jean.kane@gmail.com',
    firstName: 'Jean',
    lastName: 'Kane',
    requestState: 'LIMITED_ADMIN'
  },
  {
    id: '546932',
    status: 'VERIFIED',
    email: 'sylvie.park@mail.com',
    firstName: 'Sylvie',
    lastName: 'Park',
    requestState: 'COMMUNITY_MANAGER'
  }
];

export const activities = [
  {
    id: '1',
    date: '10/15/2020',
    type: 'New event created',
    description: 'The Patrik Antonius Poker Challenge'
  },
  {
    id: '2',
    date: '10/15/2020',
    type: 'Tournaments added',
    description:
      'The Patrik Antonius Poker Challenge - 12 new tournaments added'
  },
  {
    id: '3',
    date: '10/15/2020',
    type: 'Tournament modified',
    description: '10 000 High stake challenge - Buy-in modified'
  }
];
// Export All User FixtUre API
// Export Default
export default {
  // Fetch Profile
  fetchProfile: (customerId: number, userId: number) => ({
    status: 200,
    data: {
      id: 1096,
      status: 'PENDING',
      firstName: 'Jean',
      lastName: 'Cokto',
      email: 'jean.valjean@gmail.com',
      role: 'ADMIN'
    }
  }),

  // Fetch Profile Picture
  fetchProfilePicture: (userId: number) => ({
    status: 200,
    data: {
      resizedUrl:
        'https://s3-eu-west-1.amazonaws.com/flop-staging/images/9cecb97/qgzjhWkBQeYGa4CEzskv/a3c619cb-57e6-4985-abc6-712b4e72a5a8.jpg'
    }
  }),

  fetchAccountUsers: (customerId: number, queryParams: string) => ({
    status: 200,
    data: {
      content: userList,
      last: true
    }
  }),

  /**
   * Invite User
   * @param {*} customerId
   * @param {*} data
   */
  inviteUser: (data: AccountApiDefinitions.CustomerAccountSignInDTO) => {
    return {
      status: 201,
      headers: {
        location: 'http://sdfsdfksdfksdfk/546887'
      },
      data: {}
    };
  },

  /**
   * Edit User Account
   * @param {*} customerAccountId
   * @param {*} role
   */
  editUserAccount: (
    customerId: number,
    customerAccountId: number,
    role: RoleType
  ) => {
    return {
      status: 200,
      data: {}
    };
  },

  /**
   * Delete User Account
   * @param {*} customerAccountId
   */
  deleteUserAccount: (customerId: number, customerAccountId: number) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * Resend Invitation
   * @param {*} email
   */
  resendInvitation: (customerId: number, email: string) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * fetch activities feed
   * @param {*} email
   */
  fetchActivitiesFeed: (userId: number, queryParams: string) => {
    return {
      status: 200,
      data: {
        content: activities,
        last: true,
        totalElements: 3
      }
    };
  },

  // Update Profile
  updateProfile: (
    customerId: string,
    data: DataApiDefinitions.CasinoUpdateDTO
  ) => ({
    status: 200
  }),

  // Upload Profile Picture
  uploadProfilePicture: (customerId: number, data: any) => ({
    status: 201,
    headers: {
      location: 'https://i.ibb.co/HrGNCxv/fontaine.jpg'
    }
  })
};
