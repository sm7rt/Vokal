// Parameters Types
import { ImmutableObject } from 'seamless-immutable';
import { PaginableArrayType } from '../models/index.d';

// Currency Type
export type CurrencyType = {
  id: string;
  label: string;
};

// TimeZone Type
export type TimeZoneType = {
  value: string;
  label: string;
};

// Game Variant Type
export type GameVariantType = {
  id: string;
  label: string;
  shortName: string;
};

// Game Size Type
export type GameSizeType = {};

// Country Type
export type CountryType = {
  id: string;
  creationDate: Date;
  modificationDate?: Date;
  countryCode: string;
  countryName: string;
};

// City Type
export type CityType = {
  id: string;
  creationDate: Date;
  modificationDate?: Date;
  country: string;
  city: string;
  accentCity: string;
  region: string;
  population?: string;
  position: {
    lat: number;
    lon: number;
  };
};

// Api CallBack Page
export type ApiCallBackPage<T> = {
  list: Array<T>;
  page: number;
  last: boolean;
};

// ******************************** //
// *********** Redux  ************ //
// ******************************** //

// ParametersStateType
type ParametersStateType = {
  countries: PaginableArrayType<CountryType>;
  cities: PaginableArrayType<CityType>;
};

export type IParametersImmutableState = ImmutableObject<ParametersStateType>;

export type FetchParameterActionType = {
  search: string;
  page: number;
};

export type FetchCityAction = FetchParameterActionType & { codePays: string };
