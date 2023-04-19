// Layout Types
import { lazy } from 'react';
import AdminEntryPointPage from './AdminEntryPointPage';

// Route based code splitting
const EventsRoutes = lazy(() =>
  import('../features/events/routes/EventsRoutes')
);

// Route based code splitting
const CashGamesRoutes = lazy(() =>
  import('../features/cashgames/routes/CashGamesRoutes')
);

const SettingsRoutes = lazy(() =>
  import('../features/settings/routes/SettingsRoutes')
);

const AdministrationRoutes = lazy(() => import('./AdministrationRoutes'));

const UsersRoutes = lazy(() => import('../features/users/routes/UsersRoutes'));

export default [
  {
    path: '/admin',
    exact: true,
    component: AdminEntryPointPage
  },
  {
    path: '/admin/users',
    component: UsersRoutes
  },
  {
    path: '/admin/events',
    component: EventsRoutes
  },
  {
    path: '/admin/cashgames',
    component: CashGamesRoutes
  },
  {
    path: '/admin/administration',
    component: AdministrationRoutes
  },
  {
    path: '/admin/account/settings',
    component: SettingsRoutes
  }
];
