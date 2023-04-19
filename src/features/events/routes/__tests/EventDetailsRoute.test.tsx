import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../test/redux';
import {
  initialStateAuthent,
  initialStateGlobal,
  initialStateParameters
} from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import EventsRoutes from '../EventsRoutes';

// Set the correct location
const initialPageSpecialEvent = {
  router: {
    location: {
      pathname: '/admin/events/managment/eventId1/tournaments',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>EventDetails Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateParameters,
      ...initialPageSpecialEvent
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<EventsRoutes />, history)}
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  //   it('+++ Import Tournament Schedule', async done => {
  //     store.subscribe(() => {
  //       console.log(store);
  //       if (
  //         store.getState().router.location.pathname == '/admin/account/settings/2'
  //       ) {
  //         done();
  //       }
  //     });

  //     console.log(wrapper.find(ExcelParser).props());

  //     // Check all Request send
  //   }, 10000);
});
