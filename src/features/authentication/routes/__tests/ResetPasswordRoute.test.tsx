import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../../../test/redux';
import { initialStateGlobal } from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import { Store } from 'redux';
import AuthenticationRoutes from '../AuthenticationRoutes';

// Set the correct location
const initialPageResetPassword = {
  router: {
    location: {
      pathname: '/auth/account/reset_password',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>ResetPassword Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageResetPassword
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

  it('+++ check ResetPasswordAction dispatching ', async done => {
    // Prepare
    const email = 'jean.bernard@we-opt.com';

    // Expecting Reset Password Succeed and redirect to Succeed Page
    store.subscribe(() => {
      if (
        store.getState().router.location.pathname ===
          `/auth/account/reset_password_succeed` &&
        store.getState().router.location.search === `?email=${email}`
      ) {
        done();
      }
    });

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Submitting the form
    wrapper.find('form').simulate('submit');
  }, 10000);
});
