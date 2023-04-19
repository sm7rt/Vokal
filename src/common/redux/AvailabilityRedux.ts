import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { generateFetchAction } from '../../redux/util';
import { IRootState, IAvailabilityImmutableState } from '../models/StateModel';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ...generateFetchAction('fetchAvailability', [], ['availability'])
});

export const AvailableTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: any = Immutable({
  maintenanceStartingDate: null, // Date of the beginning of maintenance
  maintenanceStopingDate: null,
  backendAvailable: false, // the backend's services are available or not
  usersExcluded: [] // List of user Id that are allowed to use the app even if availability is false
});

export const successFetchAvailability = (
  state: IAvailabilityImmutableState,
  { availability }
) => state.merge({ ...availability });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // Fetch Availability data
  [Types.FETCH_AVAILABILITY_SUCCESS_RESPONSE]: successFetchAvailability
});

/* ------------- Selectors ------------- */

export const getStartDate = (state: IRootState) =>
  state.availability.maintenanceStartingDate;
export const getEndDate = (state: IRootState) =>
  state.availability.maintenanceStopingDate;
export const getAvailability = (state: IRootState) =>
  state.availability.backendAvailable;
export const getUsersExcluded = (state: IRootState) =>
  state.availability.usersExcluded;
export const getBackendAvailable = (state: IRootState) =>
  state.availability.backendAvailable;
export const getTimeRemaining = (state: IRootState) =>
  state.availability.timeRemaining;
export const getTimeRemainingFromEnd = (state: IRootState) =>
  state.availability.timeRemainingFromEnd;
