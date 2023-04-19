import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../test/redux';
import { initialStateGlobal } from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import AuthenticationRoutes from '../AuthenticationRoutes';

// Set the correct location
const initialPageNewPassword = {
  router: {
    location: {
      pathname: '/auth/account/new_password',
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
const initialPageNewPasswordUnauthorized = {
  router: {
    location: {
      pathname: '/auth/account/new_password',
      search:
        '?customerEmail=test%40we-opt.com&resetPasswordToken=blablablabal',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>NewPassword Route ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  it('+++ render the connected(SMART) component', () => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageNewPassword
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

  it('+++ check NewPasswordAction dispatching ', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageNewPassword
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<AuthenticationRoutes />, history)}
      </Provider>
    );

    // Prepare
    const firstName = 'Jean';
    const lastName = 'Valjean';
    const password = '!JeanBernard1';
    const password_check = '!JeanBernard1';

    // Expecting NewPassword Succeed and redirect to signin
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/') {
        done();
      }
    });

    // Populate Form
    // Check Email Input Value (Autocomplete with parameter)
    const emailInput = wrapper.find('#email').find('input');
    expect(emailInput.props().value).toBe('s.paquis@we-opt.com');

    // Fill FirstName Input
    const firstNameInput = wrapper.find('#firstName').find('input');
    firstNameInput.simulate('change', { target: { value: firstName } });

    // Fill LastName Input
    const lastNameInput = wrapper.find('#lastName').find('input');
    lastNameInput.simulate('change', { target: { value: lastName } });

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

  it('+++ check NewPasswordAction Unauthorized ', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageNewPasswordUnauthorized
    });
    store = data.store;
    history = data.history;

    // Expecting NewPassword Unauthorized and redirect to /auth/unauthorized
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
