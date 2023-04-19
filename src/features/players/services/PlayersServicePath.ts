// List All Festival Service Path => See Swagger for more details
// Export Default
export default (userId?: number) => ({
  FETCH_PROFILE: `/profiles/api/${userId}`,
  FETCH_PROFILE_PICTURE: `/gallery/api/profile/${userId}`,
  FETCH_PLAYER_POSITION: `/user-geolocation/api/user/${userId}/distance`,
  SEARCH_PLAYERS: '/profiles/api/search'
});
