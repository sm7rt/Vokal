import { ImmutableObject } from 'seamless-immutable';

/**
 * Player Profile
 */
export type PlayerProfile = {
  id: number;
  data?: ProfileApiDefinitions.Profile;
  profilePicture?: string;
  relationshipStatus?: string;
  pictureLoaded?: boolean;
};

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

type PlayersStateType = {
  list?: Array<PlayerProfile>;
  searchList?: Array<PlayerProfile>;
};

export type IPlayersImmutableStateType = ImmutableObject<PlayersStateType>;

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type PlayerServiceType = {
  fetchProfile: (userId: number) => any;
  fetchProfilePicture: (userId: number) => any;
  searchPlayers: (search: string, size: number) => any;
  fetchPlayerPosition: (playerId: number, params: any) => any;
};
