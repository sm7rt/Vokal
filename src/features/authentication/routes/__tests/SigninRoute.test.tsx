import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../../../test/redux';
import { initialStateGlobal } from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import { Store } from 'redux';
import AuthenticationRoutes from '../AuthenticationRoutes';

// Set the correct location
const initialPageSignin = {
  router: {
    location: {
      pathname: '/auth/signin',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>Signin Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageSignin
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

  it('+++ check SigninAction dispatching ', async done => {
    // Prepare
    const email = 'jean.bernard@we-opt.com';
    const password = '!JeanBernard1';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Fill Password Input
    const passwordInput = wrapper.find('#password').find('input');
    passwordInput.simulate('change', { target: { value: password } });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Expecting Signin Succeed
    store.subscribe(() => {
      if (store.getState().authentication.signin) {
        expect(store.getState().authentication.signin.id).toEqual(1096);
        done();
      }
    });
  }, 10000);
});
