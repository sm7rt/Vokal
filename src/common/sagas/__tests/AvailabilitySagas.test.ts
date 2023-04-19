import { select, delay } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fetchAvailabilityRequest } from '../AvailabilitySagas';
import AvailabilityAction from '../../redux/AvailabilityRedux';
import FixtureAvailabilityApi from '../../services/FixtureAvailabilityApi';
import { ownerSelector } from '../../../features/authentication/redux/AuthenticationRedux';
import moment from 'moment';

const owner = {
  id: 1049
};
const ownerExcluded = {
  id: 1
};
const ResultBackendUnavailable = {
  status: 200,
  data: {
    maintenanceStartingDate: moment().subtract(2, 'hours'), // Date of the beginning of maintenance
    maintenanceStopingDate: moment().add(4, 'hours'),
    backendAvailable: false, // the backend's services are available or not
    usersExcluded: [1, 2, 3] // List of user Id that are allowed to use the app even if availability is false
  }
};

const ResultBackendAvailable = {
  status: 200,
  data: {
    maintenanceStartingDate: null, // Date of the beginning of maintenance
    maintenanceStopingDate: null,
    backendAvailable: true, // the backend's services are available or not
    usersExcluded: [1, 2, 3] // List of user Id that are allowed to use the app even if availability is false
  }
};

const ResultBackendWillBeUnAvailable = {
  status: 200,
  data: {
    maintenanceStartingDate: moment().add(2, 'hours'), // Date of the beginning of maintenance
    maintenanceStopingDate: moment().add(6, 'hours'),
    backendAvailable: true, // the backend's services are available or not
    usersExcluded: [] // List of user Id that are allowed to use the app even if availability is false
  }
};

describe('Availability Sagas Test', () => {
  test('Backend is unavailable', () =>
    expectSaga(fetchAvailabilityRequest, FixtureAvailabilityApi)
      .provide([
        [select(ownerSelector), owner],
        [
          matchers.call.fn(FixtureAvailabilityApi.fetchAvailability),
          ResultBackendUnavailable
        ]
      ])
      .put(
        AvailabilityAction.fetchAvailabilitySuccessResponse({
          ...ResultBackendUnavailable.data,
          timeRemainingFromEnd: 4
        })
      )
      .run());

  test('Backend is unavailable but user is excluded', () =>
    expectSaga(fetchAvailabilityRequest, FixtureAvailabilityApi)
      .provide([
        [select(ownerSelector), ownerExcluded],
        [
          matchers.call.fn(FixtureAvailabilityApi.fetchAvailability),
          ResultBackendUnavailable
        ]
      ])
      .put(
        AvailabilityAction.fetchAvailabilitySuccessResponse({
          ...ResultBackendUnavailable.data,
          backendAvailable: true,
          timeRemainingFromEnd: 4
        })
      )
      .run());

  test('Backend is available', () =>
    expectSaga(fetchAvailabilityRequest, FixtureAvailabilityApi)
      .provide([
        [select(ownerSelector), owner],
        [
          matchers.call.fn(FixtureAvailabilityApi.fetchAvailability),
          ResultBackendAvailable
        ]
      ])
      .put(
        AvailabilityAction.fetchAvailabilitySuccessResponse(
          ResultBackendAvailable.data
        )
      )
      .run());

  test('Backend will be unavailable', () =>
    expectSaga(fetchAvailabilityRequest, FixtureAvailabilityApi)
      .provide([
        [select(ownerSelector), owner],
        [
          matchers.call.fn(FixtureAvailabilityApi.fetchAvailability),
          ResultBackendWillBeUnAvailable
        ]
      ])
      .put(
        AvailabilityAction.fetchAvailabilitySuccessResponse({
          ...ResultBackendWillBeUnAvailable.data,
          timeRemaining: 2,
          timeRemainingFromEnd: 6
        })
      )
      .run());
});
