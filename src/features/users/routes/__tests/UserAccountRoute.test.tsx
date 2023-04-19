import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../../../test/redux';
import {
  initialStateGlobal,
  initialStateAuthent
} from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import UsersRoutes from '../UsersRoutes';
import { Store } from 'redux';

// Set the correct location
const initialPageUserAccount = {
  router: {
    location: {
      pathname: '/admin/users/account',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>UserAccount Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialPageUserAccount
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<UsersRoutes />, history)}
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Update profile', () => {
    const userData = {
      firstName: 'Toto',
      lastName: 'Tutu',
      phone: '123456789'
    };

    const editButton = wrapper.find('#button-edit-profile').first();

    editButton.simulate('click');

    // Fill profile data
    const firstNameInput = wrapper.find('#firstName').find('input');
    firstNameInput.simulate('change', {
      target: { value: userData.firstName }
    });

    const lastNameInput = wrapper.find('#lastName').find('input');
    lastNameInput.simulate('change', {
      target: { value: userData.lastName }
    });

    // const phoneInput = wrapper.find('#phone').find('input');
    // phoneInput.simulate('change', {
    //   target: { value: userData.phone }
    // });

    const saveButton = wrapper.find('#button-save-profile').first();

    saveButton.simulate('click');

    const finalUserData = store.getState().users.list[0].data;

    expect(finalUserData.firstName).toEqual(userData.firstName);
    expect(finalUserData.lastName).toEqual(userData.lastName);
    // expect(finalUserData.phone).toEqual(userData.phone);
  });
});
