import React from 'react';
import ChangePasswordForm from '../ChangePasswordForm';
import { mount } from 'enzyme';
import createStore from '../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { wrapperMemoryRouter } from '../../../../../test/util';

describe('>>>ChangePassword Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any, mockOnChangePasswordfn: any;

  beforeEach(() => {
    store = createStore().store;
    // Mock functions
    mockOnChangePasswordfn = jest.fn();
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <ChangePasswordForm onChangePassword={mockOnChangePasswordfn} />
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

    // Contain Password Check Input
    const rememberMeInput = wrapper.find('#password_check').find('input');
    expect(rememberMeInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    // Prepare
    const email = 'bernard@gmail.com';
    const password = '!LoveBernard2';
    const password_check = '!LoveBernard2';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Fill Password Input
    const passwordInput = wrapper.find('#password').find('input');
    passwordInput.simulate('change', { target: { value: password } });

    // Fill Password Input
    const passwordCheckInput = wrapper.find('#password_check').find('input');
    passwordCheckInput.simulate('change', {
      target: { value: password_check }
    });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Expected Parameters
    const expectedParameters = {
      email,
      password,
      password_check
    };

    // Assert on submitting action
    expect(mockOnChangePasswordfn).toBeCalledTimes(1);
    expect(mockOnChangePasswordfn).toBeCalledWith(
      expectedParameters,
      expect.anything(),
      expect.anything()
    );
  });

  it('+++ When Submitting - Validation Failed', () => {
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

    // Assert on submitting action
    expect(mockOnChangePasswordfn).toBeCalledTimes(0);
  });
});

describe('>>>Set New Password Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any, mockOnChangePasswordfn: any;

  beforeEach(() => {
    store = createStore().store;
    // Mock functions
    mockOnChangePasswordfn = jest.fn();
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <ChangePasswordForm
            newPassword
            onChangePassword={mockOnChangePasswordfn}
          />
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

    // Contain FirstName Input
    const firstNameInput = wrapper.find('#firstName').find('input');
    expect(firstNameInput.length).toEqual(1);

    // Contain LastName Input
    const lastNameInput = wrapper.find('#lastName').find('input');
    expect(lastNameInput.length).toEqual(1);

    // Contain Password Input
    const passwordInput = wrapper.find('#password').find('input');
    expect(passwordInput.length).toEqual(1);

    // Contain Password Check Input
    const rememberMeInput = wrapper.find('#password_check').find('input');
    expect(rememberMeInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    // Prepare
    const email = 'bernard@gmail.com';
    const firstName = 'Jean';
    const lastName = 'Valjean';
    const password = '!LoveBernard2';
    const password_check = '!LoveBernard2';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Fill FirstName Input
    const firstNameInput = wrapper.find('#firstName').find('input');
    firstNameInput.simulate('change', { target: { value: firstName } });

    // Fill LastName Input
    const lastNameInput = wrapper.find('#lastName').find('input');
    lastNameInput.simulate('change', { target: { value: lastName } });

    // Fill Password Input
    const passwordInput = wrapper.find('#password').find('input');
    passwordInput.simulate('change', { target: { value: password } });

    // Fill Password Input
    const passwordCheckInput = wrapper.find('#password_check').find('input');
    passwordCheckInput.simulate('change', {
      target: { value: password_check }
    });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Expected Parameters
    const expectedParameters = {
      email,
      firstName,
      lastName,
      password,
      password_check
    };

    // Assert on submitting action
    expect(mockOnChangePasswordfn).toBeCalledTimes(1);
    expect(mockOnChangePasswordfn).toBeCalledWith(
      expectedParameters,
      expect.anything(),
      expect.anything()
    );
  });

  it('+++ When Submitting - Validation Failed', () => {
    // Prepare
    const email = 'bernard@gmail.com';
    const password = '!LoveBernard2';
    const password_check = '!LoveBernard2';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Fill Password Input
    const passwordInput = wrapper.find('#password').find('input');
    passwordInput.simulate('change', { target: { value: password } });

    // Fill Password Input
    const passwordCheckInput = wrapper.find('#password_check').find('input');
    passwordCheckInput.simulate('change', {
      target: { value: password_check }
    });

    // Assert on submitting action
    expect(mockOnChangePasswordfn).toBeCalledTimes(0);
  });
});
