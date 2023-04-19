import { createStore, applyMiddleware, compose, Store } from 'redux';
import { createMemoryHistory } from 'history';
import rootSaga from '../../src/sagas';
import reducers from '../../src/redux/reducers';
import { IRootState } from '../../src/common/models/StateModel.d';
import { initialStateGlobal } from './InitialState';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
// import cacheMiddleware from '../../src/redux/middleware/cache-middleware';

// Export Default
export default (initialState: any = initialStateGlobal) => {
  const history = createMemoryHistory();
  /* ------------- Redux Configuration ------------- */

  const middleware: any[] = [];
  const enhancers = [];

  /* ------------- Middleware ------------- */

  /* ------------- Cache Middleware ------------- */
  // Define Cache MiddleWare
  // DO NOT USE CACHE MIDDLEWARE IN TEST BECAUSE WE NEED TO TEST DIFFERENT BEHAVIOUR WITH DIFFERENTS REMOTE DATA
  // middleware.push(cacheMiddleware);

  /* ------------- Saga Middleware ------------- */
  // Define Saga MiddleWare
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- React Router Middleware ----- */
  const reactRouterMiddleware = routerMiddleware(history);
  middleware.push(reactRouterMiddleware);

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  const composeMiddleware: any = compose(...enhancers);

  const store: Store<IRootState, any> = createStore(
    reducers(history),
    initialState,
    composeMiddleware
  );

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return {
    store,
    history
  };
};
