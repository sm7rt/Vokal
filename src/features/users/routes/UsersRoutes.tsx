import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { NotFoundPage } from '../../../common/containers/ErrorPage';
import LoadingPage from '../../../common/containers/LoadingPage';
import { DefaultLayout } from '../../../common/layouts';
import RouteGuard from '../../../common/routes/RouteGuard';
import UserAccountPage from '../containers/UserAccountPage';

// Users Routes
const UsersRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <RouteGuard
        path="/admin/users/account"
        exact
        component={UserAccountPage}
        layout={DefaultLayout}
      />
      <RouteGuard
        path="/admin/users/*"
        layout={DefaultLayout}
        component={NotFoundPage}
      />
    </Switch>
  </Suspense>
);

// Export Default
export default UsersRoutes;
