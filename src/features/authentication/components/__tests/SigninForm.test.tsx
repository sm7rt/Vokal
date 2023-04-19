import React from 'react';
import SigninForm from '../SigninForm';
import { mount } from 'enzyme';
import createStore from '../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { wrapperMemoryRouter } from '../../../../../test/util';

describe('>>>Signin Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any, mockOnSigninfn: any;

  beforeEach(() => {
    store = createStore().store;
    // Mock functions
    mockOnSigninfn = jest.fn();
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <SigninForm onSignin={mockOnSigninfn} />
        </Provider>
      )
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Contains all Field', () => {
    // Contain Email Input
    const emailInput = wrapper.find('#email').find('input');
    expect(emailInput.length).toEqual(1);

    // Contain Password Input
    const passwordInput = wrapper.find('#password').find('input');
    expect(passwordInput.length).toEqual(1);

    // Contain Remember Me
    const rememberMeInput = wrapper.find('#rememberMe').find('input');
    expect(rememberMeInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    // Prepare
    const email = 'bernard@gmail.com';
    const password = '!LoveBernard2';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Fill Password Input
    const passwordInput = wrapper.find('#password').find('input');
    passwordInput.simulate('change', { target: { value: password } });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Expected Parameters
    const expectedParameters = {
      email,
      password,
      rememberMe: true
    };

    // Assert on submitting action
    expect(mockOnSigninfn).toBeCalledTimes(1);
    expect(mockOnSigninfn).toBeCalledWith(
      expectedParameters,
      expect.anything(),
      expect.anything()
    );
  });

  it('+++ When Submitting - Validation Failed', () => {
    // Prepare
    const email = 'bernard@gmail.com';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Assert on submitting action
    expect(mockOnSigninfn).toBeCalledTimes(0);
  });
});
