import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import FixturePlayerApi from '../../services/FixturePlayersApi';
import { fetchPlayer } from '../PlayersSagas';
import PlayerActions from '../../redux/PlayersRedux';
import { currentCasinoSelector } from '../../../authentication/redux/AuthenticationRedux';
import { casinoFromListSelector } from '../../../casinos/redux/CasinosRedux';

// Testing the FetchPlayer MiddleWare
test('FetchPlayer Middleware', () => {
  // Prepare
  const action = {
    id: 1
  };

  const casino = {
    position: {
      lat: 32.12,
      lon: 12.21
    }
  };

  // Act & Assert
  return expectSaga(fetchPlayer, FixturePlayerApi, action)
    .provide([
      [matchers.select.selector(currentCasinoSelector), '12343232'],
      [matchers.select.selector(casinoFromListSelector), casino]
    ])
    .put(PlayerActions.addPlayerToList(action.id)) // Add The Player To List
    .put(PlayerActions.fetchPlayerProfilePictureRequest()) // Fork to FetchPlayerProfile
    .put(PlayerActions.fetchPlayerDataRequest()) // Fork to Fetch Player Data
    .put(PlayerActions.fetchPlayerSuccessResponse()) // Fetch Player Success Response
    .put(
      // Get Return from fork 1
      PlayerActions.fetchPlayerProfilePictureSuccessResponse(
        action.id,
        FixturePlayerApi.fetchProfilePicture(action.id).data.resizedUrl
      )
    )
    .put(
      // Get Return from fork 2
      PlayerActions.fetchPlayerDataSuccessResponse(
        action.id,
        FixturePlayerApi.fetchProfile(action.id).data
      )
    )
    .run();
});
