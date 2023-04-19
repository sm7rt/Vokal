import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../test/redux';
import {
  initialStateAuthent,
  initialStateGlobal,
  initialStateParameters,
  initialStateCasinos
} from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import CashGamesRoutes from '../CashGamesRoutes';

// Set the correct location
const initialPageCashGames = {
  router: {
    location: {
      pathname: '/admin/cashgames/managment',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>Cash Games Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  it('+++ render the connected(SMART) component', () => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateParameters,
      ...initialPageCashGames,
      ...initialStateCasinos
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<CashGamesRoutes />, history)}
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });
});
