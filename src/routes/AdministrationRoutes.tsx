import React, { Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import UsersManagmentPage from '../features/users/containers/UsersManagmentPage';
import RouteGuard from '../common/routes/RouteGuard';
import { DefaultLayout } from '../common/layouts';
import { NotFoundPage } from '../common/containers/ErrorPage';
import LoadingPage from '../common/containers/LoadingPage';

// Administration Routes
const AdministrationRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <RouteGuard
        path="/admin/administration"
        exact
        component={() => <Redirect to="/admin/administration/users" />}
        layout={DefaultLayout}
      />
      <RouteGuard
        path="/admin/administration/users"
        exact
        component={UsersManagmentPage}
        layout={DefaultLayout}
      />
      <RouteGuard
        path="/admin/administration/*"
        layout={DefaultLayout}
        component={NotFoundPage}
      />
    </Switch>
  </Suspense>
);

// Export Default
export default AdministrationRoutes;
