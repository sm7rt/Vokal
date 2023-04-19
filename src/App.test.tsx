import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { wrapperMemoryRouter } from '../test/util';
import App from './App';
import { INITIAL_STATE as INITIAL_STATE_LAYOUT } from './common/redux/LayoutRedux';
import { INITIAL_STATE as INITIAL_STATE_AVAILABILITY } from './common/redux/AvailabilityRedux';
import { INITIAL_STATE as INITIAL_STATE_SYSTEM_MESSAGES } from './common/redux/SystemMessagesRedux';
import { INITIAL_STATE as INITIAL_STATE_AUTH } from './features/authentication/redux/AuthenticationRedux';
import { Store } from 'redux';

describe('>>>App Test---App Launch Correctly', () => {
  const initialState = {
    layout: INITIAL_STATE_LAYOUT,
    authentication: INITIAL_STATE_AUTH,
    availability: INITIAL_STATE_AVAILABILITY,
    'system-messages': INITIAL_STATE_SYSTEM_MESSAGES
  };
  const mockStore = configureStore();
  let store: Store<any, any>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      wrapperMemoryRouter(
        <Provider store={store}>
          <App />
        </Provider>
      ),
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
