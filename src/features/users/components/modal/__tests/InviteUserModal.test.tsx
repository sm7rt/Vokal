import { Select } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { submit } from 'redux-form';
import createStore from '../../../../../../test/redux';
import UsersConstants from '../../../constants/UsersConstants';
import InviteUserModal from '../InviteUserModal';

describe('>>>Invite User Modal ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>,
    wrapper: any,
    mockOnSubmitfn = jest.fn(),
    mockVisiblefn = jest.fn();
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <InviteUserModal
          visible={true}
          setVisible={mockVisiblefn}
          onSubmit={mockOnSubmitfn}
        />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    const userData = {
      emailAddress: 'test@gmail.com',
      role: 'SUPER_ADMIN'
    };

    // Populate Form
    // Fill Email Input
    const emailAddressInput = wrapper.find('#emailAddress').find('input');
    emailAddressInput.simulate('change', {
      target: { value: userData.emailAddress }
    });

    // Fill Role Select
    const roleSelect = wrapper.find('#role').find(Select);
    roleSelect.props().onChange(userData.role);

    // Submitting the form
    store.dispatch(submit(UsersConstants.FORM_INVITE_USER));

    // Assert on submitting action
    expect(mockOnSubmitfn).toBeCalledTimes(1);
    expect(mockOnSubmitfn).toBeCalledWith(userData);
    // Assert we close Modal
    expect(mockVisiblefn).toBeCalledTimes(1);
  });
});
