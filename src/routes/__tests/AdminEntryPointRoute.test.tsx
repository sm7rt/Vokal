import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../test/redux';
import Immutable from 'seamless-immutable';
import {
  initialStateAuthent,
  initialStateGlobal
} from '../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../test/util';
import App from '../../App';
import FixtureUserApi from '../../features/users/services/FixtureUserApi';
import FixtureCustomersApi from '../../features/customers/services/FixtureCustomersApi';
import FixtureCasinosApi from '../../features/casinos/services/FixtureCasinosApi';

/****************** */
/**** Jest  Mock    */
/****************** */

// Mock FixtureUserApi
jest.mock('../../features/users/services/FixtureUserApi', () => ({
  __esModule: true, // this property makes it work
  default: {
    fetchProfile: jest.fn(),
    fetchActivitiesFeed: () => ({
      status: 200,
      data: {
        content: []
      }
    }),
    fetchProfilePicture: (userId: number) => ({
      status: 200,
      data: {
        resizedUrl:
          'https://s3-eu-west-1.amazonaws.com/flop-staging/images/9cecb97/qgzjhWkBQeYGa4CEzskv/a3c619cb-57e6-4985-abc6-712b4e72a5a8.jpg'
      }
    })
  }
}));

// Mock FixtureCustomerApi
jest.mock('../../features/customers/services/FixtureCustomersApi', () => ({
  __esModule: true, // this property makes it work
  default: {
    fetchCustomerDetails: jest.fn()
  }
}));

// Mock FixtureCasinoApi (Casino incomplete)
jest.mock('../../features/casinos/services/FixtureCasinosApi', () => ({
  __esModule: true, // this property makes it work
  default: {
    fetchCasinoDetails: jest.fn(),
    fetchCasinoImage: (id: string) => ({
      status: 200,
      data: {
        resizedUrl: 'http://fdfgfdg.com'
      }
    })
  }
}));

/****************** */
/**** Initial State */
/****************** */

// Set the correct location
const initialPageAdminEntryPoint = {
  router: {
    location: {
      pathname: '/admin',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

const initialStateAuthentOperator = {
  authentication: Immutable({
    signin: {
      id: 1096,
      customerId: 23,
      casinoIds: ['casino1', 'casino2', 'casino3']
    },
    authorizationToken:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZXJsaW4tYWRAeW9wbWFpbC5jb20iLCJhdXRob3JpdGllcyI6WyJDQVNJTk9fTUFOQUdFUiJdLCJpYXQiOjE1NjQxNDIxNzIsImV4cCI6MTU5NTY3ODE3MiwiY3VycmVudFVzZXJJZCI6NDEsIm1hbmFnZWRDYXNpbm9JZCI6Ii16RGlfV29CdFB6RkdIMFFxZFVIIiwiY3VzdG9tZXJJZCI6NDl9.bmUb9CGn68NftEF5fw6AamxrUR6aM_yq6ilyTgLizR-d0OsU2pli8SdCi06FbD__98nszl1HEAzivp7K8e2bYQ'
  })
};

/****************** */
/**** Mock  Data    */
/****************** */

// Admin User
const AdminUser = {
  id: 1096,
  status: 'PENDING',
  firstName: 'Thierry',
  lastName: 'Bernard',
  emailAddress: 'jean.valjean@gmail.com',
  role: 'ADMIN'
};

// Not Admin User
const NotAdminUser = {
  ...AdminUser,
  role: 'COMMUNITY_MANAGER'
};

// Customer Casino Type
const CustomerCasinoType = {
  activationToken: '321',
  address: {
    city: 'Monaco',
    country: 'Monaco',
    countryCode: 'MC',
    postalCode: '98000',
    state: 'Monaco',
    streetAddress: '30 bis boulevard Princess Charlotte'
  },
  brand: 'Monaco Casino',
  brandLowerCaseIndex: 'monaco casino',
  creationDate: '2019-07-03T08:36:50.691Z',
  emailAdminUser: 'admin@casinomonaco.mc',
  emailContact: 'contact@casinomonaco.mc',
  id: 23,
  licence: '132456789',
  modificationDate: '2019-07-03T08:36:50.691Z',
  phoneNumber: '03305050505',
  referenceNumber: '321654987',
  requestState: 'MAIL_NOT_VALIDATED',
  type: 'CASINO',
  licenceAuthority: 'FRANCE'
};

// Customer Operator Type
const CustomerOperatorType = {
  ...CustomerCasinoType,
  type: 'OPERATOR'
};

// Casino Incomplete
const CasinoInComplete = {
  id: 'casino1',
  name: 'Bellagio',
  country: 'United State',
  city: 'Las Vegas',
  mailContact: 'lastvegas@gmail.com',
  telephoneNumber: '+323 3 32 32 23'
};

// Casino Complete
const CasinoComplete = {
  ...CasinoInComplete,
  offeredGames: []
};

describe('>>>AdminEntryPoint Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  it('+++ Admin User + Account Type Casino + Casino Settings Not Completed => Redirect to Casino Settings', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialPageAdminEntryPoint
    });
    store = data.store;

    // Expecting Go to Admin Account Settings
    store.subscribe(() => {
      if (
        store.getState().router.location.pathname == '/admin/account/settings'
      ) {
        done();
      }
    });

    // Prepare Mock FixtureApi Function
    FixtureUserApi.fetchProfile.mockImplementation(
      (customerId: number, userId: number) => ({
        status: 200,
        data: AdminUser
      })
    );

    // Prepare Mock FetchCustomersApi Function
    FixtureCustomersApi.fetchCustomerDetails.mockImplementation(
      (id: string) => ({
        status: 200,
        data: CustomerCasinoType
      })
    );

    // Prepare Mock FetchCasinosApi Function
    FixtureCasinosApi.fetchCasinoDetails.mockImplementation((id: string) => ({
      status: 200,
      data: CasinoInComplete
    }));

    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<App />, history)}
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });

  it('+++ Admin User + Account Type Casino + Casino Settings Completed => Redirect to Profile', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialPageAdminEntryPoint,
      casinos: Immutable({
        list: []
      })
    });
    store = data.store;

    // Expecting Go to Admin Account Settings
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/admin/users/account') {
        done();
      }
    });

    // Prepare Mock FixtureApi Function
    FixtureUserApi.fetchProfile.mockImplementation(
      (customerId: number, userId: number) => ({
        status: 200,
        data: AdminUser
      })
    );

    // Prepare Mock FetchCustomersApi Function
    FixtureCustomersApi.fetchCustomerDetails.mockImplementation(
      (id: string) => ({
        status: 200,
        data: CustomerCasinoType
      })
    );

    // Prepare Mock FetchCasinosApi Function
    FixtureCasinosApi.fetchCasinoDetails.mockImplementation((id: string) => ({
      status: 200,
      data: CasinoComplete
    }));

    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<App />, history)}
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });

  it('+++ Not Admin User + Account Type Casino => Redirect to Profile', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialPageAdminEntryPoint
    });
    store = data.store;

    // Expecting Go to Admin Account Settings
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/admin/users/account') {
        done();
      }
    });

    // Prepare Mock FixtureApi Function
    FixtureUserApi.fetchProfile.mockImplementation(
      (customerId: number, userId: number) => ({
        status: 200,
        data: NotAdminUser
      })
    );

    // Prepare Mock FetchCustomersApi Function
    FixtureCustomersApi.fetchCustomerDetails.mockImplementation(
      (id: string) => ({
        status: 200,
        data: CustomerCasinoType
      })
    );

    // Prepare Mock FetchCasinosApi Function
    FixtureCasinosApi.fetchCasinoDetails.mockImplementation((id: string) => ({
      status: 200,
      data: CasinoComplete
    }));

    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<App />, history)}
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });

  it('+++ Admin User + Account Type Operator => Redirect to Profile', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateAuthentOperator
    });
    store = data.store;

    // Expecting Go to Admin Account Settings
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/admin/users/account') {
        done();
      }
    });

    // Prepare Mock FixtureApi Function
    FixtureUserApi.fetchProfile.mockImplementation(
      (customerId: number, userId: number) => ({
        status: 200,
        data: AdminUser
      })
    );

    // Prepare Mock FetchCustomersApi Function
    FixtureCustomersApi.fetchCustomerDetails.mockImplementation(
      (id: string) => ({
        status: 200,
        data: CustomerOperatorType
      })
    );

    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<App />, history)}
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });

  it('+++ Not Admin User + Account Type Operator => Redirect to Profile', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateAuthentOperator
    });
    store = data.store;

    // Expecting Go to Admin Account Settings
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/admin/users/account') {
        done();
      }
    });

    // Prepare Mock FixtureApi Function
    FixtureUserApi.fetchProfile.mockImplementation(
      (customerId: number, userId: number) => ({
        status: 200,
        data: NotAdminUser
      })
    );

    // Prepare Mock FetchCustomersApi Function
    FixtureCustomersApi.fetchCustomerDetails.mockImplementation(
      (id: string) => ({
        status: 200,
        data: CustomerOperatorType
      })
    );

    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<App />, history)}
      </Provider>
    );

    expect(wrapper.length).toEqual(1);
  });
});
