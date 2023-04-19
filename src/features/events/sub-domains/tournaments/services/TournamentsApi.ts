// a library to wrap and simplify api calls
import { ApiResponseType } from '../../../../../common/models/index.d';
import { api } from '../../../../../services/Api';
import TournamentServicePath from './TournamentServicePath';

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
   * Fetch Running Festivals Method
   * @param {*} eventId : The festival Id
   * @param {*} filters : The filters for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  const fetchTournaments = (
    eventId: string,
    filters: Object,
    page: number,
    size: number
  ): Promise<
    ApiResponseType<GamesApiDefinitions.PageLiveTournamentDocument_>
  > =>
    api.get(TournamentServicePath(eventId).GET_TOURNAMENT_LIST, {
      page,
      size
    });

  /**
   * fetchTournamentInterestedPlayersNumber Method
   * @param {*} tournamentId : The tournament Id
   */
  const fetchTournamentInterestedPlayersNumber = (
    eventId: string,
    tournamentId: string
  ): Promise<ApiResponseType<number>> =>
    api.get(
      TournamentServicePath(eventId, tournamentId)
        .GET_TOURNAMENT_INTERESTED_PLAYER_NUMBER
    );

  /**
   * Delete tournament by tournamentId
   * @param {*} tournamentId
   */
  const deleteTournament = (eventId: string, tournamentId: string) =>
    api.delete(TournamentServicePath(eventId, tournamentId).DELETE_TOURNAMENT);

  /**
   * Create Tournament Method
   */
  const createTournament = (festivalId: string, data: any) =>
    api.post(TournamentServicePath(festivalId, '').CREATE_TOURNAMENT, data);

  /**
   * fetchTournamentDetails Method
   */
  const fetchTournamentDetails = (festivalId: string, tournamentId: string) =>
    api.get(
      TournamentServicePath(festivalId, tournamentId).GET_TOURNAMENT_BY_ID
    );

  /**
   * Update Tournament Informations Method
   */
  const updateTournamentInformations = (
    eventId: string,
    tournamentId: string,
    data: any
  ) =>
    api.put(
      TournamentServicePath(eventId, tournamentId)
        .UPDATE_TOURNAMENT_INFORMATIONS,
      data
    );

  /**
   * Update Tournament Format Method
   */
  const updateTournamentFormat = (
    eventId: string,
    tournamentId: string,
    data: any
  ) =>
    api.put(
      TournamentServicePath(eventId, tournamentId).UPDATE_TOURNAMENT_FORMAT,
      data
    );

  /**
   * Update Tournament Structure Method
   */
  const updateTournamentStructure = (
    eventId: string,
    tournamentId: string,
    data: any
  ) =>
    api.put(
      TournamentServicePath(eventId, tournamentId).UPDATE_TOURNAMENT_STRUCTURE,
      data
    );

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
    fetchTournaments,
    createTournament,
    fetchTournamentInterestedPlayersNumber,
    deleteTournament,
    fetchTournamentDetails,
    updateTournamentInformations,
    updateTournamentFormat,
    updateTournamentStructure
  };
};

// let's return back our create method as the default.
// Export Default
export default {
  create
};
