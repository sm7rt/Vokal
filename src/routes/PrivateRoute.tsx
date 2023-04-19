import React, { Fragment, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '.';
import LoadingPage from '../common/containers/LoadingPage';
import RenderCount from '../common/performance/RenderCount';
import { authorizationTokenSelector } from '../features/authentication/redux/AuthenticationRedux';
import { api } from '../services/Api';
import {
  BadRequestPage,
  NotFoundPage,
  ServerErrorPage,
  UnAuthorizedPage
} from '../common/containers/ErrorPage';
import RouteGuard from '../common/routes/RouteGuard';
import { DefaultLayout } from '../common/layouts';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type PrivateRouteProps = {
  component: any;
};

/**
 * Private Route Component
 * @param param0
 */
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const authorizationToken = useSelector(authorizationTokenSelector);
  api.setHeader('Authorization', authorizationToken || '');
  return (
    <Route
      {...rest}
      render={(props: any) =>
        authorizationToken ? (
          <Fragment>
            <RenderCount componentName="PrivateRoute" />
            <Suspense fallback={<LoadingPage />}>
              <Switch>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={(props: any) => <route.component {...props} />}
                    />
                  );
                })}
                {/**************************** */}
                {/****** Errors *************** */}
                {/**************************** */}
                <RouteGuard
                  path="/admin/error"
                  layout={DefaultLayout}
                  component={ServerErrorPage}
                />
                <RouteGuard
                  path="/admin/bad_request"
                  layout={DefaultLayout}
                  component={BadRequestPage}
                />
                <RouteGuard
                  path="/admin/unauthorized"
                  layout={DefaultLayout}
                  component={UnAuthorizedPage}
                />
                <RouteGuard
                  path="/admin/*"
                  layout={DefaultLayout}
                  component={NotFoundPage}
                />
              </Switch>
            </Suspense>
          </Fragment>
        ) : (
          <Redirect
            to={{
              pathname: '/auth/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

// Export Default
export default PrivateRoute;
