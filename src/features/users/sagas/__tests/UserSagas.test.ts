import { expectSaga } from 'redux-saga-test-plan';
import FixtureUserApi, { activities } from '../../services/FixtureUserApi';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  fetchUser,
  fetchAccountUsers,
  inviteUser,
  editUserAccount,
  deleteUserAccount,
  resendInvitation,
  fetchActivitiesFeed,
  saveProfile
} from '../UserSagas';
import UserActions from '../../redux/UserRedux';
import { ownerSelector } from '../../../authentication/redux/AuthenticationRedux';
import { customerSelector } from '../../../customers/redux/CustomersRedux';
import MessagesAction from '../../../../common/redux/SystemMessagesRedux';
import i18n from '../../../../i18n';

const owner = {
  customerId: 1,
  id: 1058
};

// Testing the FetchUser MiddleWare
test('FetchUser Middleware', () => {
  // Prepare
  const action = {
    userId: 1
  };

  // Act & Assert
  return (
    expectSaga(fetchUser, FixtureUserApi, action)
      .provide([[matchers.select.selector(ownerSelector), owner]])
      .put(UserActions.addUserToList(action.userId)) // Add The User To List
      // .put(UserActions.fetchUserProfilePictureRequest()) // Fork to FetchUserProfile
      .put(UserActions.fetchUserDataRequest()) // Fork to Fetch User Data
      .put(UserActions.fetchUserSuccessResponse()) // Fetch User Success Response
      // .put(
      //   // Get Return from fork 1
      //   UserActions.fetchUserProfilePictureSuccessResponse(
      //     action.userId,
      //     FixtureUserApi.fetchProfilePicture(action.userId).data.resizedUrl
      //   )
      // )
      .put(
        // Get Return from fork 2
        UserActions.fetchUserDataSuccessResponse(
          action.userId,
          FixtureUserApi.fetchProfile(owner.customerId, action.userId).data
        )
      )
      .run()
  );
});

// Testing the FetchUser MiddleWare
test('fetchAccountUsers Middleware', () => {
  // Prepare
  const action = {
    customerId: 1,
    filters: {
      search: '',
      states: ['PENDING', 'VERIFIED'],
      roles: [
        'ADMIN',
        'LIMITED_ADMIN',
        'POKER_ROOM_MANAGER',
        'COMMUNITY_MANAGER'
      ]
    },
    page: 1,
    size: 20
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 200,
    data: {
      content: [
        {
          id: '231478',
          status: 'PENDING',
          email: 'kevin.inthekitchen@gmail.com',
          firstName: 'Kevin',
          lastName: 'Inthekitchen',
          requestState: 'LIMITED_ADMIN'
        }
      ],
      last: true,
      totalElements: 1
    }
  };

  // Act & Assert
  return expectSaga(fetchAccountUsers, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureUserApi.fetchAccountUsers), serviceResultSuccess]
    ])
    .put(
      UserActions.fetchAccountUsersSuccessResponse(
        serviceResultSuccess.data.content,
        action.filters,
        action.page,
        serviceResultSuccess.data.last,
        serviceResultSuccess.data.totalElements
      )
    )
    .run();
});

// Invite User
test('Invite User Middleware', () => {
  // Prepare
  const action = {
    customerId: 1,
    data: {
      emailAddress: 'test@gmail.com',
      role: 'ADMIN'
    }
  };

  const customer = {
    type: 'CASINO',
    casinoId: 'casino1'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 201,
    data: {},
    headers: {
      location: 'http://sdfsdfksdfksdfk/user1'
    }
  };

  // Act & Assert
  return expectSaga(inviteUser, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(customerSelector), customer],
      [matchers.call.fn(FixtureUserApi.inviteUser), serviceResultSuccess]
    ])
    .put(UserActions.fetchUserRequest('user1'))
    .put(UserActions.inviteUserSuccessResponse('user1'))
    .put(
      MessagesAction.addMessage(
        'INVITE_USER_SUCCESS',
        'SUCCESS',
        i18n.t('INVITE_USER_SUCCESS', {
          emailAddress: action.data.emailAddress
        }),
        '',
        'PANEL'
      )
    )
    .run();
});

// Edit User
test('Edit User Middleware', () => {
  // Prepare
  const action = {
    customerAccountId: 1,
    data: {
      role: 'COMMUNITY_MANAGER'
    }
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 200,
    data: {}
  };

  // Act & Assert
  return expectSaga(editUserAccount, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureUserApi.editUserAccount), serviceResultSuccess]
    ])
    .put(
      UserActions.editUserAccountSuccessResponse(
        action.customerAccountId,
        action.data
      )
    )
    .put(
      MessagesAction.addMessage(
        'EDIT_USER_ACCOUNT_SUCCESS',
        'SUCCESS',
        i18n.t('EDIT_USER_ACCOUNT_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Delete User
test('Delete User Middleware', () => {
  // Prepare
  const action = {
    customerAccountId: 1
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(deleteUserAccount, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureUserApi.deleteUserAccount), serviceResultSuccess]
    ])
    .put(UserActions.deleteAccountSuccessResponse(action.customerAccountId))
    .put(
      MessagesAction.addMessage(
        'DELETE_USER_SUCCESS',
        'SUCCESS',
        i18n.t('DELETE_ACCOUNT_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Resend Invitation
test('Resend Invitation Middleware', () => {
  // Prepare
  const action = {
    email: 'test@gmail.com'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(resendInvitation, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureUserApi.resendInvitation), serviceResultSuccess]
    ])
    .put(UserActions.resendInvitationSuccessResponse())
    .put(
      MessagesAction.addMessage(
        'RESEND_INVITATION_SUCCESS',
        'SUCCESS',
        i18n.t('RESEND_INVITATION_ACCOUNT_SUCCESS', {
          emailAddress: action.email
        }),
        '',
        'PANEL'
      )
    )
    .run();
});

// fetch Activities Feed
test('fetch Activities Feed Middleware', () => {
  const userId = 1;
  const data = activities;
  const page = 1;
  const last = true;
  const totalElements = 3;
  // Prepare
  const action = {
    customerId: 1,
    page: 1,
    size: 20
  };

  // Service Result Success
  const fetchActivitiesFeedSuccess = {
    status: 200,
    data: {
      content: activities,
      totalElements,
      last
    }
  };

  // Act & Assert
  return expectSaga(fetchActivitiesFeed, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [
        matchers.call.fn(FixtureUserApi.resendInvitation),
        fetchActivitiesFeedSuccess
      ]
    ])
    .put(
      UserActions.fetchActivitiesFeedSuccessResponse(
        userId,
        data,
        page,
        last,
        totalElements
      )
    )
    .run();
});

// Update Profile
test('Update Profile Middleware', () => {
  // Prepare
  const action = {
    data: {
      firstName: 'Tata',
      lastName: 'Zoro'
      // phone: '00000000'
    }
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 200,
    data: {}
  };

  // Act & Assert
  return expectSaga(saveProfile, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureUserApi.updateProfile), serviceResultSuccess]
    ])
    .put(UserActions.saveProfileSuccessResponse(owner.id, action.data))
    .run();
});

// Update Profile with Picture
test('Update Profile Middleware', () => {
  // Prepare
  const action = {
    data: {
      firstName: 'Tata',
      lastName: 'Zoro',
      // phone: '00000000',
      pictureProfile: { file: '//localPath' }
    }
  };

  const imgUrl = 'http://sdfsdfksdfksdfk/image1';

  // Service Result Success
  const serviceResultSuccess = {
    status: 200,
    data: {}
  };

  const UploadPictureServiceResultSuccess = {
    status: 201,
    data: {},
    headers: {
      location: imgUrl
    }
  };

  // Act & Assert
  return expectSaga(saveProfile, FixtureUserApi, action)
    .provide([
      [matchers.select.selector(ownerSelector), owner],
      [matchers.call.fn(FixtureUserApi.updateProfile), serviceResultSuccess],
      [
        matchers.call.fn(FixtureUserApi.uploadProfilePicture),
        UploadPictureServiceResultSuccess
      ]
    ])
    .put(
      UserActions.saveProfileSuccessResponse(owner.id, {
        firstName: action.data.firstName,
        lastName: action.data.lastName
        // phone: action.data.phone,
      })
    )
    .put(UserActions.fetchUserProfilePictureRequest())
    .put(
      UserActions.fetchUserProfilePictureSuccessResponse(
        owner.id,
        'https://s3-eu-west-1.amazonaws.com/flop-staging/images/9cecb97/qgzjhWkBQeYGa4CEzskv/a3c619cb-57e6-4985-abc6-712b4e72a5a8.jpg'
      )
    )
    .run();
});
