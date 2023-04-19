import { Action, AnyAction } from 'redux';
import { all, call, cancelled, fork, put, select } from 'redux-saga/effects';
import { currentCasinoSelector } from '../../authentication/redux/AuthenticationRedux';
import { casinoFromListSelector } from '../../casinos/redux/CasinosRedux';
import { PlayerServiceType } from '../models/PlayersModel.d';
import PlayersActions from '../redux/PlayersRedux';

/* ****************************** */
/*     Player  deferred loading     */
/* ****************************** */

/**
 * Get Profile Picture of a Player
 * @param {*} api : The API to use
 * @param {*} playerId : The id of player
 */
function* fetchPlayerProfilePicture(api: PlayerServiceType, playerId: number) {
  // We Indicate that a fetchPlayerProfilePictureRequest Request is pending
  yield put(PlayersActions.fetchPlayerProfilePictureRequest());
  // API Call
  const fetchPlayerProfilePictureResponse = yield call(
    api.fetchProfilePicture,
    playerId
  );
  // Get Data Profile picture
  const dataProfilePicture = fetchPlayerProfilePictureResponse.data
    ? fetchPlayerProfilePictureResponse.data
    : {};
  // Get Profile Picture
  const profilePicture = dataProfilePicture.resizedUrl
    ? dataProfilePicture.resizedUrl
    : null;
  // Manage Response
  if (fetchPlayerProfilePictureResponse.status === 200) {
    yield put(
      PlayersActions.fetchPlayerProfilePictureSuccessResponse(
        playerId,
        profilePicture
      )
    );
  } else {
    const error = {
      code: 'DATA_UNLOAD'
    };
    yield put(PlayersActions.fetchPlayerProfilePictureFailureResponse(error));
  }
}

/**
 * Get All data of a Player
 * @param {*} api : The API to use
 * @param {*} playerId : The id of player
 */
function* fetchPlayerData(api: PlayerServiceType, playerId: number) {
  // We Indicate that a fetchPlayerProfilePictureRequest Request is pending
  yield put(PlayersActions.fetchPlayerDataRequest());
  // API Call
  const fetchPlayerDataRequestResponse = yield call(api.fetchProfile, playerId);
  const data = fetchPlayerDataRequestResponse.data || {};
  if (fetchPlayerDataRequestResponse.status === 200) {
    yield put(PlayersActions.fetchPlayerDataSuccessResponse(playerId, data));
  } else {
    yield put(PlayersActions.fetchPlayerDataFailureResponse());
  }
}

/**
 * Get Player Position
 * @param {*} api : The API to use
 * @param {*} playerId : The id of player
 */
function* fetchPlayerPosition(api: PlayerServiceType, playerId: number) {
  // We Indicate that a fetchPlayerPositionRequest Request is pending
  yield put(PlayersActions.fetchPlayerPositionRequest());

  // Get Casino
  const casinoId = yield select(currentCasinoSelector);
  const casino = yield select(casinoFromListSelector, casinoId);

  // Get Casino Info
  const params = {
    casinoLat: casino.position.lat,
    casinoLon: casino.position.lon,
    distanceUnit: 'KILOMETERS'
  };

  // API Call
  const fetchPlayerPositionRequestResponse = yield call(
    api.fetchPlayerPosition,
    playerId,
    params
  );
  const data = fetchPlayerPositionRequestResponse.data || {};
  if (fetchPlayerPositionRequestResponse.status === 200) {
    yield put(
      PlayersActions.fetchPlayerPositionSuccessResponse(playerId, data.distance)
    );
  } else {
    yield put(PlayersActions.fetchPlayerPositionFailureResponse());
  }
}

type FetchPlayerType = {
  id: number;
};

/**
 * Fetch a Players with all information
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* fetchPlayer(
  api: PlayerServiceType,
  action: Action<FetchPlayerType>
) {
  const { id } = action;
  yield put(PlayersActions.addPlayerToList(id));

  // Get Player images
  yield fork(fetchPlayerProfilePicture, api, id);
  // Get Player Data
  yield fork(fetchPlayerData, api, id);
  // Get Player Position
  yield fork(fetchPlayerPosition, api, id);

  yield put(PlayersActions.fetchPlayerSuccessResponse());
}

/**
 *  Search Player
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* searchPlayers(api: PlayerServiceType, action: AnyAction) {
  const { search } = action;

  try {
    // Search A player
    const searchPeopleResult = yield call(api.searchPlayers, search, 0);
    const searchPeopleResultData = searchPeopleResult.data;
    if (searchPeopleResult.status === 200) {
      const idsList = searchPeopleResultData.map(
        (player: ProfileApiDefinitions.Profile) => player.id
      );
      yield all(
        searchPeopleResultData.map((player: ProfileApiDefinitions.Profile) =>
          put(PlayersActions.fetchPlayerRequest(player.id))
        )
      );
      yield put(PlayersActions.searchPlayersSuccessResponse(idsList));
    } else {
      // Error
      yield put(
        PlayersActions.searchPlayersFailureResponse(searchPeopleResult.data)
      );
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(PlayersActions.searchPlayersCancelResponse());
    }
  }
}
