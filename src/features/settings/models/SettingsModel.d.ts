import { ImmutableObject } from 'seamless-immutable';

interface GameType extends ModelEditable {
  variant: string;
  smallBlind: number;
  bigBlind: number;
}

// ******************************** //
// *********** Services  ************ //
// ******************************** //

// ******************************** //
// *********** Screen  ************ //
// ******************************** //

type GeneralInformationFormType = {
  brandLogo: string;
  name: string;
  address: {
    streetAddress: string;
    country: string;
    countryCode: string;
    city: string;
    state: string;
    postalCode: string;
  };
  webSite: string;
  mailContact: string;
  telephoneNumber: string;
};

type PokerRoomInformationFormType = {
  mainCurrency: string;
  minimumAgeEntrance: string;
  dressCode: string;
};

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

type SettingsStateType = {
  games: Array<GameType>;
};

export type ISettingsImmutableStateType = ImmutableObject<SettingsStateType>;

type SaveGeneralInformationActionType = {
  data: GeneralInformationFormType & PokerRoomInformationFormType;
};

// ********************************** //
// *********** Services  ************ //
// ********************************** //

export type SettingsServiceType = {
  updateCasino: (
    casinoId: string,
    data: DataApiDefinitions.CasinoUpdateDTO
  ) => any;
  uploadCasinoLogo: (casinoId: number, logo: any) => any;
};
