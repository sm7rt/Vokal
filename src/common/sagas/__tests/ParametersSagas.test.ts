import { expectSaga } from 'redux-saga-test-plan';
import FixtureParametersApi from '../../services/FixtureParametersApi';
import { fetchCountries, fetchCities } from '../ParametersSagas';
import ParametersActions from '../../redux/ParametersRedux';
import MockCountries from '../../services/mock/MockCountries';
import MockCities from '../../services/mock/MockCities';

// Testing the fetch Countries Middleware
test('fetchCountries Middleware Success', () => {
  // Prepare
  const action = {
    search: '',
    page: 1
  };

  // Act & Assert
  return expectSaga(fetchCountries, FixtureParametersApi, action)
    .put(
      ParametersActions.fetchCountrySuccessResponse(
        MockCountries,
        action.page,
        false
      )
    )
    .run();
});

// Testing the fetch Countries Middleware
test('fetchCities Middleware Success', () => {
  // Prepare
  const action = {
    codePays: 'FR',
    search: '',
    page: 1
  };

  // Act & Assert
  return expectSaga(fetchCities, FixtureParametersApi, action)
    .put(
      ParametersActions.fetchCitySuccessResponse(MockCities, action.page, false)
    )
    .run();
});
