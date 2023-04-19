import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoadingPage from './common/containers/LoadingPage';
import RenderCount from './common/performance/RenderCount';
import MessagePanel from './common/components/layout/SystemMessagePanel/SystemMessagePanel';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import {
  NotFoundPage,
  UnAuthorizedPage,
  ServerMaintenancePage
} from './common/containers/ErrorPage';
import { hot } from 'react-hot-loader';
import { useDispatch, useSelector } from 'react-redux';
import AvailableActions, {
  getBackendAvailable,
  getTimeRemaining
} from './common/redux/AvailabilityRedux';
import { IRootState } from './common/models/StateModel';
import { createLoadingSelector } from './common/redux/LoadingRedux';
import MaintenanceModal, {
  MaintenanceContext
} from './common/components/modal/MaintenanceModal';

// Route based code splitting
const AuthenticationRoutes = lazy(() =>
  import('./features/authentication/routes/AuthenticationRoutes')
);
const PrivateRoute = lazy(() => import('./routes/PrivateRoute'));

/**
 * App Component
 */
const App = () => {
  const dispatch = useDispatch();
  // Get Server availability Info
  const backendAvailable = useSelector(getBackendAvailable);
  // Know if availabity request is pending
  const availabilityRequestPending = useSelector((state: IRootState) =>
    createLoadingSelector(['FETCH_AVAILABILITY'])(state.loading)
  );

  // Maintenance Modal Managment
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const [alreadyInformUser, setAlreadyInformUser] = useState(false);
  const timeRemaining = useSelector(getTimeRemaining);

  // Check server available
  useEffect(() => {
    dispatch(AvailableActions.fetchAvailabilityRequest());
  }, [dispatch]);

  // Display the modal to the user, if it's the first time
  useEffect(() => {
    if (backendAvailable && timeRemaining && !alreadyInformUser) {
      setMaintenanceModalVisible(true);
      setAlreadyInformUser(true);
    }
  }, [timeRemaining, alreadyInformUser, backendAvailable]);

  const onCloseMaintenanceModal = () => setMaintenanceModalVisible(false);

  return (
    <I18nextProvider i18n={i18n}>
      <MaintenanceContext.Provider value={setMaintenanceModalVisible}>
        <RenderCount componentName="App" />
        <Suspense fallback={<LoadingPage />}>
          {availabilityRequestPending && <LoadingPage />}
          {!availabilityRequestPending && backendAvailable ? (
            <Switch>
              {/* A user can't go to the HomePage if is not authenticated */}
              <Route
                exact
                path="/"
                component={() => (
                  <Redirect
                    to={{
                      pathname: '/admin'
                    }}
                  />
                )}
              />
              <Route path="/auth" component={AuthenticationRoutes} />
              <Route path="/admin" component={PrivateRoute} />
              <Route path="/unauthorized" component={UnAuthorizedPage} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          ) : (
            // We Display the server maintenance Page if the backend is not available
            <ServerMaintenancePage />
          )}
        </Suspense>
        <MaintenanceModal
          visible={maintenanceModalVisible}
          onClose={onCloseMaintenanceModal}
        />
      </MaintenanceContext.Provider>
      <MessagePanel />
    </I18nextProvider>
  );
};
// Export Default
export default hot(module)(App);
