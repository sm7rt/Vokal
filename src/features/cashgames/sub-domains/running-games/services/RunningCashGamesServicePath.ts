// List All Cash Games Service Path => See Swagger for more details
export default {
  FETCH_RUNNING_GAMES: `/games/api/live/cash-games/search`,
  ADD_RUNNING_GAMES: '/games/api/live/cash-games/',
  FETCH_PLAYERS_NUMBER: `/games/api/{gameId}/members/confirmed/count`,
  ADD_NEW_PLAYER: `/games/api/live/table/{tableId}/join`,
  REMOVE_PLAYER: `/games/api/live/cash-games/player/{playerId}/stop`,
  GET_WAITING_LIST: `/games/api/live/{gameId}/waiting-list`,
  GET_JOIN_SEAT_REQUEST: `/games/api/live/cash-games/{tableId}/join-request`,
  ADD_NEW_PLAYER_TO_WAITING_LIST: `/games/api/live/{gameId}/waiting-list`,
  REMOVE_PLAYER_FROM_WAITING_LIST: `/games/api/live/{gameId}/waiting-list/{waitingListId}`,
  CLOSE_TABLE: `/games/api/live/cash-games/table/{tableId}/stop`,
  EDIT_TABLE: `/games/api/live/cash-games/table/{tableId}`,
  SIT_PLAYER: `/games/api/live/{gameId}/waiting-list/{waitingListId}/sit/{tableId}`,
  CALL_PLAYER: `/games/api/live/{gameId}/waiting-list/{waitingListId}/call`,
  GET_SEAT_REQUEST: `/games/api/live/table/{tableId}/player/requests`,
  ACCEPT_JOIN_SEAT_REQUEST:
    '/games/api/live/table/{tableId}/player/{playerId}/approve',
  DECLINE_JOIN_SEAT_REQUEST:
    '/games/api/live/table/{tableId}/player/{playerId}/decline',
  CONFIRM_SIT_PLAYER: '/games/api/live/table/{tableId}/player/{playerId}/sit',
  FIND_PLAYER_STATUS: '/games/api/user/{accountId}/status'
};
