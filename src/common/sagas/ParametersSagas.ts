import { call, cancelled, put } from 'redux-saga/effects';
import MessagesAction from '../redux/SystemMessagesRedux';
import {
  FetchCityAction,
  FetchParameterActionType
} from '../redux/ParametersModel.d';
import ParametersActions from '../redux/ParametersRedux';
import { ApiServiceType } from '../services/ParametersApi';

/**
 * Fetch Countries
 */
export function* fetchCountries(
  api: ApiServiceType,
  action: FetchParameterActionType
) {
  const { search, page } = action;
  try {
    const countriesData = yield call(api.fetchCountries, search, page);
    const data = countriesData.data ? countriesData.data : {};
    if (countriesData.status === 200) {
      // Success
      yield put(
        ParametersActions.fetchCountrySuccessResponse(
          data.content,
          page,
          data.last
        )
      );
    } else if (countriesData.status === 404) {
      yield put(ParametersActions.fetchCountrySuccessResponse([], 1, true));
    } else {
      // Put Failure Response to Stop loading
      yield put(ParametersActions.fetchCountryFailureResponse());
      // Display An Error
      yield put(
        MessagesAction.addMessage(
          'SIGNIN_ERROR',
          'ERROR',
          `Sorry but an error occured. We cannot proceed to your Sign In. Please Try Later`,
          '',
          'MODAL'
        )
      );
    }
  } finally {
    // Put Cancel Response to Stop Loading
    if (yield cancelled()) {
      yield put(ParametersActions.fetchCountryCancelResponse());
    }
  }
}

/**
 * Fetch Cities
 */
export function* fetchCities(api: ApiServiceType, action: FetchCityAction) {
  const { search, page, codePays } = action;
  try {
    const citiesData = yield call(api.fetchCities, codePays, search, page);
    const data = citiesData.data ? citiesData.data : {};
    if (citiesData.status === 200) {
      // Success
      yield put(
        ParametersActions.fetchCitySuccessResponse(
          data.content,
          page,
          data.last
        )
      );
    } else if (citiesData.status === 404) {
      yield put(ParametersActions.fetchCitySuccessResponse([], 1, true));
    } else {
      // Put Failure Response to Stop loading
      yield put(ParametersActions.fetchCityFailureResponse());
      // Display An Error
      yield put(
        MessagesAction.addMessage(
          'SIGNIN_ERROR',
          'ERROR',
          `Sorry but an error occured. We cannot proceed to your Sign In. Please Try Later`,
          '',
          'MODAL'
        )
      );
    }
  } finally {
    // Put Cancel Response to Stop Loading
    if (yield cancelled()) {
      yield put(ParametersActions.fetchCityCancelResponse());
    }
  }
}
