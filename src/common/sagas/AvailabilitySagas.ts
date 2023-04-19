import { put, call, delay, select } from 'redux-saga/effects';
import { ownerSelector } from '../../features/authentication/redux/AuthenticationRedux';
import AvailabilityActions from '../redux/AvailabilityRedux';
import moment from 'moment';

/**
 * loop to fetch Backend Availability
 * @param {*} apiAvailability : special API to get backend availability
 */
export function* fetchAvailabilityRequest(apiAvailability: any) {
  let delayTime = 720000;
  const owner = yield select(ownerSelector);
  const userId = owner ? owner.id : -1;
  while (true) {
    try {
      const fetchAvailabilityResponse = yield call(
        apiAvailability.fetchAvailability
      );

      if (fetchAvailabilityResponse.status === 200) {
        const {
          backendAvailable,
          usersExcluded,
          maintenanceStartingDate,
          maintenanceStopingDate
        } = fetchAvailabilityResponse.data;
        // Current user is excluded
        const currentUserExcluded = usersExcluded.find(
          (id: number) => userId === id
        );

        // If backend is not available, we will recall this service after 1mn30
        if (!backendAvailable || maintenanceStartingDate) {
          delayTime = 90000;
        } else {
          delayTime = 720000;
        }

        const timeInformation: any = {};

        // if MaintenanceStartDate is filled, we calculate the timeRemaining or the timeRemainningFromEnd
        if (maintenanceStartingDate) {
          const now = moment();
          const timeRemaining = moment(maintenanceStartingDate).diff(
            now,
            'hours',
            true
          );
          const timeRemainingFromEnd = moment(maintenanceStopingDate).diff(
            now,
            'hours',
            true
          );
          if (timeRemaining > 0) {
            timeInformation.timeRemaining =
              Math.round(timeRemaining) === 0 ? 1 : Math.round(timeRemaining);
          }
          if (timeRemainingFromEnd > 0) {
            timeInformation.timeRemainingFromEnd =
              Math.round(timeRemainingFromEnd) === 0
                ? 1
                : Math.round(timeRemainingFromEnd);
          }
        }

        yield put(
          AvailabilityActions.fetchAvailabilitySuccessResponse({
            ...fetchAvailabilityResponse.data,
            ...timeInformation,
            backendAvailable: !currentUserExcluded ? backendAvailable : true // If user is excluded we display the backend
          })
        );
      } else {
        yield put(AvailabilityActions.fetchAvailabilityFailureResponse());
      }

      // Delay depend of backend available value
      // If backend available => Wait 2h else retry every 1m30

      yield delay(delayTime); // Fetch every 2h (if the app run in background)
    } catch {
      break;
    }
  }
}
