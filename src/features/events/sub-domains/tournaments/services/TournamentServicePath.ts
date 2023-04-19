// List All Festival Service Path => See Swagger for more details
// Export Default
export default (festivalId: string, tournamentId = '') => ({
  CREATE_TOURNAMENT: `games/api/festivals/${festivalId}/tournament`,
  UPDATE_TOURNAMENT_INFORMATIONS: `games/api/festivals/${festivalId}/tournament/${tournamentId}/informations`,
  UPDATE_TOURNAMENT_FORMAT: `games/api/festivals/${festivalId}/tournament/${tournamentId}/format`,
  UPDATE_TOURNAMENT_STRUCTURE: `games/api/festivals/${festivalId}/tournament/${tournamentId}/structure`,
  UPDATE_TOURNAMENT_RANK: `games/api/festivals/${festivalId}/tournament/${tournamentId}/prize-pool`,
  DELETE_TOURNAMENT: `games/api/festivals/${festivalId}/tournament/${tournamentId}`,
  GET_TOURNAMENT_LIST: `games/api/festivals/${festivalId}/tournaments`,
  GET_TOURNAMENT_BY_ID: `games/api/festivals/${festivalId}/tournament/${tournamentId}`,
  GET_TOURNAMENT_INTEREST_PLAYERS: `games/api/festivals/${festivalId}/tournament/${tournamentId}/interested`,
  GET_TOURNAMENT_INTERESTED_PLAYER_NUMBER: `games/api/festivals/${festivalId}/tournament/${tournamentId}/interested/count`
});
