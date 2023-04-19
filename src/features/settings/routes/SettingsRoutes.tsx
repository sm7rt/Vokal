import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFoundPage } from '../../../common/containers/ErrorPage';
import LoadingPage from '../../../common/containers/LoadingPage';
import RouteGuard from '../../../common/routes/RouteGuard';
import AccountSettingsLayout from '../../authentication/layout/AccountSettingsLayout';
import AccountPage from '../containers/AccountPage';
import { DefaultLayout } from '../../../common/layouts';
import SettingsPage from '../containers/SettingsPage';

// Settings Routes
const SettingsRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <RouteGuard
        exact
        path="/admin/account/settings"
        component={AccountPage}
        layout={AccountSettingsLayout}
      />
      <RouteGuard
        exact
        path="/admin/account/settings/casino"
        component={SettingsPage}
        layout={DefaultLayout}
      />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </Suspense>
);

export default SettingsRoutes;
