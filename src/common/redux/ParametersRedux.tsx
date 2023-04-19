import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createLoadingSelector } from './LoadingRedux';
import {
  IParametersImmutableState,
  ApiCallBackPage,
  CountryType,
  CityType
} from './ParametersModel.d';
import { generateFetchAction } from '../../redux/util';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ...generateFetchAction(
    'fetchCountry',
    ['search', 'page'],
    ['list', 'page', 'last']
  ),
  ...generateFetchAction(
    'fetchCity',
    ['codePays', 'search', 'page'],
    ['list', 'page', 'last']
  )
});

export const ParametersTypes = Types;
// Export Default
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IParametersImmutableState = Immutable({
  countries: {
    data: [],
    page: 1,
    last: false
  }, // Country List
  cities: {
    data: [],
    page: 1,
    last: false
  } // City List
});
/* ------------- Reducers ------------- */

// Country Retrieve Success
export const successFetchCountry = (
  state: IParametersImmutableState,
  { list, page, last }: ApiCallBackPage<CountryType>
) => {
  if (page === 1) {
    return state
      .setIn(['countries', 'data'], list)
      .setIn(['countries', 'page'], page + 1)
      .setIn(['countries', 'last'], last);
  }
  // If we are not at the page 1 concat the game list
  return state
    .setIn(['countries', 'data'], state.countries.data.concat(list))
    .setIn(['countries', 'page'], page + 1)
    .setIn(['countries', 'last'], last);
};

// City Retrieve Success
export const successFetchCity = (
  state: IParametersImmutableState,
  { list, page, last }: ApiCallBackPage<CityType>
) => {
  if (page === 1) {
    return state
      .setIn(['cities', 'data'], list)
      .setIn(['cities', 'page'], page + 1)
      .setIn(['cities', 'last'], last);
  }
  // If we are not at the page 1 concat the game list
  return state
    .setIn(['cities', 'data'], list)
    .setIn(['cities', 'page'], page + 1)
    .setIn(['cities', 'last'], last);
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // Request

  // Response
  [Types.FETCH_COUNTRY_SUCCESS_RESPONSE]: successFetchCountry,
  [Types.FETCH_CITY_SUCCESS_RESPONSE]: successFetchCity
});

/* ------------- Selectors ------------- */
const loadingCountrySelector = createLoadingSelector(['FETCH_COUNTRY']);
const loadingCitySelector = createLoadingSelector(['FETCH_CITY']);

// If Fetching Country
export const isFetchingCountry = (state: any) =>
  loadingCountrySelector(state.loading);

// If Fetching City
export const isFetchingCity = (state: any) =>
  loadingCitySelector(state.loading);

// Countries data
export const getCountriesData = (state: any) => state.parameters.countries;

// Cities Data
export const getCitiesData = (state: any) => state.parameters.cities;
