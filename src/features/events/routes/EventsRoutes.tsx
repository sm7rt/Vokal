import React, { Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import LoadingPage from '../../../common/containers/LoadingPage';
import { DefaultLayout } from '../../../common/layouts';
import RouteGuard from '../../../common/routes/RouteGuard';
import { NotFoundPage } from '../../../common/containers/ErrorPage';
import EventsPage from '../containers/EventsPage';
import EventDetailsPage from '../containers/EventDetailsPage';
import TournamentDetailsPage from '../sub-domains/tournaments/containers/TournamentDetailsPage';

// Events Routes
const EventsRoutes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <RouteGuard
        path="/admin/events"
        exact
        component={() => <Redirect to="/admin/events/managment" />}
        layout={DefaultLayout}
      />
      <RouteGuard
        exact
        path="/admin/events/managment"
        component={EventsPage}
        layout={DefaultLayout}
      />
      <RouteGuard
        exact
        path="/admin/events/managment/:eventId/tournaments"
        component={EventDetailsPage}
        layout={DefaultLayout}
      />
      <RouteGuard
        exact
        path="/admin/events/managment/:eventId/tournaments/:tournamentId"
        component={TournamentDetailsPage}
        layout={DefaultLayout}
      />
      <RouteGuard
        path="/admin/events/*"
        layout={DefaultLayout}
        component={NotFoundPage}
      />
    </Switch>
  </Suspense>
);

// Export Default
export default EventsRoutes;
