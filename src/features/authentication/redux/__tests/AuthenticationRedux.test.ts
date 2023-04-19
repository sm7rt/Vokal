import Actions, { reducer, INITIAL_STATE } from '../AuthenticationRedux';

// Test on Success Signin
test('success on Signin', () => {
  const userData = {
    email: 'testemail@yopmail.com',
    id: 943,
    lastConnexionDate: '2018-10-18T07:52:32.418'
  };
  const userToken = 'Bearer 3DIFODODQFIDFDIF';
  const state = reducer(
    INITIAL_STATE,
    Actions.signInSuccessResponse(userData, userToken)
  );
  // They have to have the sames values
  expect(state.signin.id).toEqual(943);
  expect(state.authorizationToken).toEqual(userToken);
});
