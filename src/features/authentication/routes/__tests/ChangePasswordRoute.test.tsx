import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../test/redux';
import { initialStateGlobal } from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import AuthenticationRoutes from '../AuthenticationRoutes';

// Set the correct location
const initialPageChangePassword = {
  router: {
    location: {
      pathname: '/auth/account/change_password',
      search:
        '?customerEmail=s.paquis%40we-opt.com&resetPasswordToken=zer54466zerzer5z6er56',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

// Set the correct location
const initialPageChangePasswordUnauthorized = {
  router: {
    location: {
      pathname: '/auth/account/change_password',
      search:
        '?customerEmail=test%40we-opt.com&resetPasswordToken=blablablabal',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>ChangePassword Route ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  it('+++ render the connected(SMART) component', () => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageChangePassword
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<AuthenticationRoutes />, history)}
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('+++ check ChangePasswordAction dispatching ', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageChangePassword
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<AuthenticationRoutes />, history)}
      </Provider>
    );

    // Prepare
    const password = '!JeanBernard1';
    const password_check = '!JeanBernard1';

    // Expecting ChangePassword Succeed and redirect to signin
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/auth/signin') {
        done();
      }
    });

    // Populate Form
    // Check Email Input Value (Autocomplete with parameter)
    const emailInput = wrapper.find('#email').find('input');
    expect(emailInput.props().value).toBe('s.paquis@we-opt.com');

    // Fill Password Input
    const passwordInput = wrapper.find('#password').find('input');
    passwordInput.simulate('change', { target: { value: password } });

    // Fill Password Check Input
    const passwordCheckInput = wrapper.find('#password_check').find('input');
    passwordCheckInput.simulate('change', {
      target: { value: password_check }
    });

    // Submitting the form
    wrapper.find('form').simulate('submit');
  }, 10000);

  it('+++ check ChangePasswordAction Unauthorized ', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageChangePasswordUnauthorized
    });
    store = data.store;
    history = data.history;

    // Expecting ChangePassword Unauthorized and redirect to /auth/unauthorized
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/auth/unauthorized') {
        done();
      }
    });

    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<AuthenticationRoutes />, history)}
      </Provider>
    );
  }, 10000);
});
