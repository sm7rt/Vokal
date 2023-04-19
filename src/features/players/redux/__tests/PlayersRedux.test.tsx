import Actions, { reducer, INITIAL_STATE } from '../PlayersRedux';

/**
 * Test on Add Player To List
 * 1 - Add Id To the list
 * 2 - Fill Player Data
 * 3 - Fill Player Image
 */
test('addPlayerToList, fillData, fillPlayerImage', () => {
  const playerId = 943;
  const playerData = {
    firstName: 'Jean',
    lastName: 'Valjean'
  };
  const profilePicture = 'http://profileImage';

  // Add Player To list
  let state = reducer(INITIAL_STATE, Actions.addPlayerToList(playerId));
  // They have to have the sames values
  expect(state.list).toHaveLength(1);

  // Fill Player Data
  state = reducer(
    state,
    Actions.fetchPlayerDataSuccessResponse(playerId, playerData)
  );
  // They have to have the sames values
  expect(state.list[0].data).toEqual(playerData);

  // Fill Player Image
  state = reducer(
    state,
    Actions.fetchPlayerProfilePictureSuccessResponse(playerId, profilePicture)
  );
  // They have to have the sames values
  expect(state.list[0].profilePicture).toEqual(profilePicture);
  expect(state.list[0].pictureLoaded).toEqual(true);
});
