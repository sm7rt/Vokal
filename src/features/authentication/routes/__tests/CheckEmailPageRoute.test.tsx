import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../../../test/redux';
import { initialStateGlobal } from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import { Store } from 'redux';
import AuthenticationRoutes from '../AuthenticationRoutes';
import { IMessageState } from '../../../../common/models/StateModel';

const email = 'test@gmail.com';

// Set the correct location
const initialPageCheckEmail = {
  router: {
    location: {
      pathname: `/auth/account/${email}/email_check`,
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>CheckEmail Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageCheckEmail
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

  it('+++ check ResendEmail Action ', async done => {
    // Expecting Receive a Success Message for ResendEmaail Action
    store.subscribe(() => {
      if (
        store.getState()['system-messages'] &&
        store
          .getState()
          ['system-messages'].find(
            (m: IMessageState) => m.id === 'RESEND_EMAIL_SUCCESS'
          )
      ) {
        const messageInStore = store
          .getState()
          ['system-messages'].find(
            (m: IMessageState) => m.id === 'RESEND_EMAIL_SUCCESS'
          );
        const messageExpected: IMessageState = {
          id: 'RESEND_EMAIL_SUCCESS',
          gravity: 'SUCCESS',
          text: `A new mail was sended to ${email}`,
          headerText: '',
          displayMode: 'PANEL'
        };
        expect(messageInStore).toEqual(messageExpected);
        done();
      }
    });

    // Get ResendEmail Button
    const resendEmailButton = wrapper.find('#resendEmailButton').find('span');
    resendEmailButton.simulate('click');
  }, 10000);
});
