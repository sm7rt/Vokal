import React, { Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import LoadingPage from '../../../common/containers/LoadingPage';
import { DefaultLayout } from '../../../common/layouts';
import RouteGuard from '../../../common/routes/RouteGuard';
import { NotFoundPage } from '../../../common/containers/ErrorPage';
import CashGamesPage from '../containers/CashGamesPage';

// CashGames Routes
const CashGamesRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <RouteGuard
        path="/admin/cashgames"
        exact
        component={() => <Redirect to="/admin/cashgames/managment" />}
        layout={DefaultLayout}
      />
      <RouteGuard
        exact
        path="/admin/cashgames/managment"
        component={CashGamesPage}
        layout={DefaultLayout}
      />
      <RouteGuard
        path="/admin/cashgames/*"
        layout={DefaultLayout}
        component={NotFoundPage}
      />
    </Switch>
  </Suspense>
);

// Export Default
export default CashGamesRoutes;
