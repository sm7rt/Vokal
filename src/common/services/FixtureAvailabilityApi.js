import moment from 'moment';

export default {
  fetchServiceVersion: () => ({
    status: 200
  }),
  fetchAvailability: () => ({
    status: 200,
    data: {
      maintenanceStartingDate: moment().add(2, 'hours'), // Date of the beginning of maintenance
      maintenanceStopingDate: moment().add(4, 'hours'),
      backendAvailable: true, // the backend's services are available or not
      usersExcluded: [1, 2, 3] // List of user Id that are allowed to use the app even if availability is false
    }
  })
};
