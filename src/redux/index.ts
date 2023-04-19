import { createBrowserHistory } from 'history';
import rootSaga from '../sagas';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import DebugConfig from '../config/DebugConfig';
import reducers from './reducers';
import { IRootState } from '../common/models/StateModel.d';
import { persistConfig } from '../config/ReduxPersistConfig';
import cacheMiddleware from './middleware/cache-middleware';

/**
 * Manage Modal When Want to leave an edition screen
 * @param {*} dialogKey
 * @param {*} callback
 */
const getUserConfirmation = (dialogKey: string, callback: any) => {
  // use "message" as Symbol-based key
  //@ts-ignore
  const dialogTrigger = window[Symbol.for(dialogKey)];

  if (dialogTrigger) {
    // delegate to dialog and pass callback through
    return dialogTrigger(callback);
  }

  // Fallback to allowing navigation
  callback(true);
};

// History
export const history = createBrowserHistory({
  // hashType: "slash",
  getUserConfirmation
});

// Export Default
export default () => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Cache Middleware ------------- */
  // Define Cache MiddleWare
  middleware.push(cacheMiddleware);

  /* ------------- Saga Middleware ------------- */
  // Define Saga MiddleWare
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- React Router Middleware ----- */
  const reactRouterMiddleware = routerMiddleware(history);
  middleware.push(reactRouterMiddleware);

  /* ------------- Assemble Middleware ------------- */
  // Define enhancers and apply Middleware
  if (DebugConfig.reduxLogging) {
    // Active DevTools if it's Dev Mode
    enhancers.push(composeWithDevTools(applyMiddleware(...middleware)));
  } else {
    enhancers.push(applyMiddleware(...middleware));
  }
  const composeMiddleware: any = compose(...enhancers);

  // Redux Persist
  const persistedReducer = persistReducer(persistConfig, reducers(history));

  const store: Store<IRootState, any> = createStore(
    persistedReducer,
    composeMiddleware
  );

  // Persitor
  const persistor = persistStore(store);

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga);

  //@ts-ignore
  if (module.hot) {
    //@ts-ignore
    module.hot.accept(() => {
      store.replaceReducer(persistReducer(persistConfig, reducers(history)));

      const newYieldedSagas = require('../sagas').default;
      sagasManager.cancel();
      //@ts-ignore
      sagasManager.done.then(() => {
        //@ts-ignore
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return {
    store,
    persistor,
    history
  };
};
