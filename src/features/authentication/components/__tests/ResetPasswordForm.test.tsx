import React from 'react';
import ResetPasswordForm from '../ResetPasswordForm';
import { mount } from 'enzyme';
import createStore from '../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { wrapperMemoryRouter } from '../../../../../test/util';

describe('>>>ResetPassword Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any, mockOnResetPasswordfn: any;

  beforeEach(() => {
    store = createStore().store;
    // Mock functions
    mockOnResetPasswordfn = jest.fn();
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <ResetPasswordForm onResetPassword={mockOnResetPasswordfn} />
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
  });

  it('+++ When Submitting', () => {
    // Prepare
    const email = 'bernard@gmail.com';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Expected Parameters
    const expectedParameters = {
      email
    };

    // Assert on submitting action
    expect(mockOnResetPasswordfn).toBeCalledTimes(1);
    expect(mockOnResetPasswordfn).toBeCalledWith(
      expectedParameters,
      expect.anything(),
      expect.anything()
    );
  });

  it('+++ When Submitting - Validation Failed', () => {
    // Prepare
    const email = 'invalidemail';

    // Populate Form
    // Fill Email Input
    const emailInput = wrapper.find('#email').find('input');
    emailInput.simulate('change', { target: { value: email } });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Assert on submitting action
    expect(mockOnResetPasswordfn).toBeCalledTimes(0);
  });
});
