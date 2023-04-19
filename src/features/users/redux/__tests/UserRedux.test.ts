import Actions, { reducer, INITIAL_STATE } from '../UserRedux';
import { activities } from '../../services/FixtureUserApi';
/**
 * Test on Add User To List
 * 1 - Add Id To the list
 * 2 - Fill User Data
 * 3 - Fill User Image
 */
test('addUserToList, fillData, fillUserImage', () => {
  const userId = 943;
  const userData = {
    firstName: 'Jean',
    lastName: 'Valjean'
  };
  const profilePicture = 'http://profileImage';

  // Add User To list
  let state = reducer(INITIAL_STATE, Actions.addUserToList(userId));
  // They have to have the sames values
  expect(state.list).toHaveLength(1);

  // Fill User Data
  state = reducer(
    state,
    Actions.fetchUserDataSuccessResponse(userId, userData)
  );
  // They have to have the sames values
  expect(state.list[0].data).toEqual(userData);

  // Fill User Image
  state = reducer(
    state,
    Actions.fetchUserProfilePictureSuccessResponse(userId, profilePicture)
  );

  const data = activities;
  const page = 1;
  const last = true;
  const totalElements = 3;
  // Fill User Image
  state = reducer(
    state,
    Actions.fetchActivitiesFeedSuccessResponse(
      userId,
      data,
      page,
      last,
      totalElements
    )
  );
  // They have to have the sames values
  expect(state.list[0].activitiesFeed.list.length).toEqual(3);

  const profileData = {
    firstName: 'Toto',
    lastName: 'Zizi'
    // phone: '0756894512',
  };
  // Fill Profile data
  state = reducer(
    state,
    Actions.saveProfileSuccessResponse(userId, profileData)
  );
  // They have to have the sames values
  expect(state.list[0].data.firstName).toEqual(profileData.firstName);
  expect(state.list[0].data.lastName).toEqual(profileData.lastName);
  // expect(state.list[0].data.phone).toEqual(profileData.phone);
});
