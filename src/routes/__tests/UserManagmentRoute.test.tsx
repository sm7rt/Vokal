import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../test/redux';
import {
  initialStateGlobal,
  initialStateAuthent
} from '../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../test/util';
import { Store } from 'redux';
import AdministrationRoutes from '../AdministrationRoutes';
import { submit } from 'redux-form';
import UsersConstants from '../../features/users/constants/UsersConstants';
import { Select, Table } from 'antd';

// Set the correct location
const initialPageUserManagment = {
  router: {
    location: {
      pathname: '/admin/administration/users',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>UserManagment Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialPageUserManagment
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<AdministrationRoutes />, history)}
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Invite User', async done => {
    const userData = {
      emailAddress: 'test@gmail.com',
      role: 'ADMIN'
    };

    const initUsersNumber = store.getState().users.list.length;

    const table = wrapper.find(Table);
    expect(table.props().dataSource.length).toEqual(5);

    let STORE = {};
    store.subscribe(() => {
      STORE = store.getState();
      if (STORE.users.list.length === initUsersNumber + 1) {
        // wrapper.update();
        //expect(table.props().dataSource.length).toEqual(6);
        done();
      }
    });

    const inviteUserButton = wrapper.find('#inviteUser').find('button');
    inviteUserButton.simulate('click');

    const modal = wrapper
      .find('InviteUserModal')
      .findWhere((node: any) => node.props().visible === true)
      .first();

    // Fill Modal
    // Fill Email Input
    const emailAddressInput = wrapper.find('#emailAddress').find('input');
    emailAddressInput.simulate('change', {
      target: { value: userData.emailAddress }
    });

    // Fill Role Select
    const roleSelect = wrapper.find('#role').find(Select);
    roleSelect.props().onChange(userData.role);

    // * Get send button in order to submit the form
    const buttonSend = modal.find('button').at(2);

    // * Submit form
    buttonSend.simulate('click');

    // Check that there are one more user in the table
  });

  //TODO Test filter list
  it('+++ Filter List', () => {
    expect(wrapper.length).toEqual(1);
  });
});
