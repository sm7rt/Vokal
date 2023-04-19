import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../../../test/redux';
import { initialStateGlobal } from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import { Store } from 'redux';
import AuthenticationRoutes from '../AuthenticationRoutes';

// Set the correct location
const initialPageLicenseVerification = {
  router: {
    location: {
      pathname: '/auth/account/license_verification',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>LicenseVerification Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageLicenseVerification
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<AuthenticationRoutes />, history)}
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ check LicenseVerificationAction dispatching ', async done => {
    // Expecting Reset Password Succeed and redirect to Succeed Page
    store.subscribe(() => {
      if (store.getState().router.location.pathname == `/auth/signin`) {
        done();
      }
    });

    // Populate Form
    const okLink = wrapper.find('#okLink').find('a');
    okLink.simulate('click', { button: 0 });
  }, 10000);
});
