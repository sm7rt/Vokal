import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.scss';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createStore from './redux';
import AuthenticationActions from './features/authentication/redux/AuthenticationRedux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { persistConfig } from './config/ReduxPersistConfig';
import RenderCount from './common/performance/RenderCount';
import Validators from 'redux-form-validators';
import i18n from './i18n';
import CacheBuster from './cache/CacheBuster';
const { store, persistor, history } = createStore();

// #26 : i18n in Validation Messages
Validators.formatMessage = (msg: any) => i18n.t(msg.defaultMessage);

// try to i18n Error Message
Object.assign(Validators.messages, {
  email: 'VALIDATOR_EMAIL',
  presence: 'VALIDATOR_REQUIRED',
  url: 'VALIDATOR_URL'
});

/**
 * Before Run the App We Check The Reducers Version
 */
const onBeforeLift = async () => {
  const reducerVersion = persistConfig.reducerVersion;

  // Check to ensure latest reducer version
  await storage.getItem('reducerVersion').then(async localVersion => {
    if (localVersion !== reducerVersion) {
      // Force To Logout
      store.dispatch(AuthenticationActions.logoutRequest());
      await storage.setItem('reducerVersion', reducerVersion);
    }
  });
};

ReactDOM.render(
  <CacheBuster>
    {({ loading, isLatestVersion, refreshCacheAndReload }) => {
      if (loading) return null;
      if (!loading && !isLatestVersion) {
        // You can decide how and when you want to force reload
        refreshCacheAndReload();
      }
      return (
        <Provider store={store}>
          <RenderCount componentName="Index" />
          <PersistGate
            loading={null}
            persistor={persistor}
            onBeforeLift={onBeforeLift}
          >
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      );
    }}
  </CacheBuster>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store;
}

// welldone
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

export default store;
