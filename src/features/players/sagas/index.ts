import { takeEvery, takeLatest } from 'redux-saga/effects';
import DebugConfig from '../../../config/DebugConfig';
import PlayerApi from '../services/PlayersApi';
import FixturePlayerApi from '../services/FixturePlayersApi';

/* ------------- Types ------------- */
import { PlayersTypes } from '../redux/PlayersRedux';

import { fetchPlayer, searchPlayers } from './PlayersSagas';

/* ------------- Sagas ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it. handleTagsId
const api = DebugConfig.useFixtures ? FixturePlayerApi : PlayerApi.create();

const PlayersSaga = [
  takeEvery(PlayersTypes.FETCH_PLAYER_REQUEST, fetchPlayer, api),
  takeLatest(PlayersTypes.SEARCH_PLAYERS_REQUEST, searchPlayers, api)
];

// Export Default
export default PlayersSaga;
