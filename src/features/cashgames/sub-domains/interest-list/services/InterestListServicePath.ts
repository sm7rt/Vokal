// List All Cash Games Service Path => See Swagger for more details
export default {
  FETCH_UPCOMING_GAMES: `/games/api/{gameType}/upcoming/search`,
  FETCH_PLAYERS_NUMBER: `/games/api/{gameId}/members/confirmed/count`,
  ACCEPT_GAME: `/games/api/{gameId}/confirm`,
  DECLINE_GAME: `/games/api/{gameId}/decline`,
  GET_PLAYERS_LIST: `/games/api/{gameId}/members/confirmed`,
  CREATE_INTEREST_LIST: '/games/api/',
  DELETE_INTEREST_LIST: '/games/api/{gameId}/cancel',
  FETCH_GAME_DETAILS: '/games/api/{gameId}',
  START_INTEREST_LIST: '/games/api/live/cash-games/'
};
