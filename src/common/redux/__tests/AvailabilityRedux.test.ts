import Actions, { reducer, INITIAL_STATE } from '../AvailabilityRedux';

// ********************************** //
//  UNIT TESTS OF EVENT REDUX       //
// ********************************** //
// ********************************** //
const availability = {
  maintenanceStartingDate: '2019-04-19T12:00:00Z', // Date of the beginning of maintenance
  maintenanceStopingDate: '2019-04-19T18:30:00Z',
  backendAvailable: true, // the backend's services are available or not
  usersExcluded: [1, 2, 3] // List of user Id that are allowed to use the app even if availability is false
};

// ****************
// TESTS
// ***************
describe('>>>Availability Redux --- Test Reducer)', () => {
  // Test Fetch Event List Success
  test('attempt services availability Success', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.fetchAvailabilitySuccessResponse(availability)
    );

    expect(state.maintenanceStartingDate).toBe(
      availability.maintenanceStartingDate
    );
    expect(state.maintenanceStopingDate).toBe(
      availability.maintenanceStopingDate
    );
    expect(state.backendAvailable).toBe(availability.backendAvailable);
    expect(state.usersExcluded.length).toBe(3);
  });
});
