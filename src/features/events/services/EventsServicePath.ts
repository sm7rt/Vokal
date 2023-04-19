// List All Festival Service Path => See Swagger for more details
export default (casinoId?: string, festivalId?: string) => ({
  FETCH_RUNNING_FESTIVALS: `games/api/festivals/casino/${casinoId}/upcoming`,
  FETCH_FINISHED_FESTIVALS: `games/api/festivals/casino/${casinoId}/passed`,
  CREATE_FESTIVAL: '/games/api/festivals',
  DELETE_FESTIVAL: `/games/api/festivals/${festivalId}`,
  EDIT_FESTIVAL: `/games/api/festivals/${festivalId}`,
  GET_FESTIVAL_DETAILS: `/games/api/festivals/${festivalId}`,
  UPLOAD_BANNER_FESTIVAL: `/gallery/api/festival/${festivalId}`,
  GET_FESTIVAL_BANNER: `/gallery/api/festival/${festivalId}`,
  GET_FESTIVAL_TOURNAMENT_COUNT: `/games/api/festivals/${festivalId}/tournaments/count`
});
