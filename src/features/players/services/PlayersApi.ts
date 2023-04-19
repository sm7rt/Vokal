// a library to wrap and simplify api calls
import PlayersServicePath from './PlayersServicePath';
import { api } from '../../../services/Api';

// our "constructor"
const create = () => {
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  /**
   * Get profile Information
   * Path : /profiles/api/${id}
   * @param {*} playerId: Id of player
   * @returns 200 if OK
   */
  const fetchProfile = (playerId: number) =>
    api.get(`${PlayersServicePath(playerId).FETCH_PROFILE}`);

  /**
   * Get profile picture
   * Path : /gallery/api/album/${accountId}/profile
   * @param {*} playerId : Id of player
   * @returns 200 if OK
   */
  const fetchProfilePicture = (playerId: number) =>
    api.get(`${PlayersServicePath(playerId).FETCH_PROFILE_PICTURE}`);

  /**
   * Get profile position
   * Path : /user-geolocation/api/${playerId}
   * @param {*} playerId : Id of player
   * @returns 200 if OK
   */
  const fetchPlayerPosition = (playerId: number, params: any) =>
    api.get(
      `${PlayersServicePath(playerId).FETCH_PLAYER_POSITION.replace(
        '{userId}',
        playerId
      )}`,
      params
    );

  /**
   * Search Players
   * @param {*} playerId
   * @param {*} search
   */
  const searchPlayers = (search: string, size: number) =>
    api.get(`${PlayersServicePath().SEARCH_PLAYERS}?query=${search}`);

  // ------
  // STEP 3
  // ------
  //

  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    fetchProfile,
    fetchProfilePicture,
    fetchPlayerPosition,
    searchPlayers
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};
