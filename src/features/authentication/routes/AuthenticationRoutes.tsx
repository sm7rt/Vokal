import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, RouteComponentProps, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { LoadingContainer } from '../../../common/components/container';
import {
  BadRequestPage,
  NotFoundPage,
  ServerErrorPage,
  UnAuthorizedPage
} from '../../../common/containers/ErrorPage';
import LoadingPage from '../../../common/containers/LoadingPage';
import RedirectPage from '../../../common/containers/RedirectPage';
import { IRootState } from '../../../common/models/StateModel';
import { createGuardSelector } from '../../../common/redux/GuardRedux';
import RouteGuard from '../../../common/routes/RouteGuard';
import { parseParam } from '../../../utils/LocationUtils';
import InformationPage from '../container/InformationPage';
import SigninPage from '../container/SigninPage';
import AuthLayout from '../layout/AuthLayout';
import { IActions } from '../models/AuthenticationActionModel.d';
import AuthenticationActions from '../redux/AuthenticationRedux';

// Route based code splitting
const SignupPage = lazy(() => import('../container/SignupPage'));
const ResetPassword = lazy(() => import('../container/ResetPasswordPage'));
const ChangePasswordPage = lazy(() =>
  import('../container/ChangePasswordPage')
);

// Create Selector for know if a request is pending
const guardChangePasswordSelector = createGuardSelector('CHANGE_PASSWORD');
const guardSettingNewPasswordSelector = createGuardSelector('NEW_PASSWORD');

/**
 * Authentication Routes
 * @param param0
 */
const AuthenticationRoutesComp = (props: RouteComponentProps) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { location } = useReactRouter();
  const changePasswordGrantStatus = useSelector((state: IRootState) =>
    guardChangePasswordSelector(state.guard)
  );
  const newPasswordGrantStatus = useSelector((state: IRootState) =>
    guardSettingNewPasswordSelector(state.guard)
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        <RouteGuard
          exact
          path="/auth/signin"
          component={SigninPage}
          layout={AuthLayout}
        />
        {/******************* */}
        {/****** Signup ***** */}
        {/******************* */}
        <RouteGuard
          exact
          path="/auth/account"
          component={SignupPage}
          layout={AuthLayout}
        />
        <RouteGuard
          exact
          path="/auth/account/:email/email_check"
          component={InformationPage}
          componentProps={(props: any) => ({
            title: t('CREATE_ACCOUNT_SUCCEED_TITLE'),
            text: t('CREATE_ACCOUNT_SUCCEED_TEXT', {
              addressEmail: props.match.params.email
            })
              .split('\n')
              .map((item: string, index: number) => <p key={index}>{item}</p>)
          })}
          layout={AuthLayout}
        />
        <RouteGuard
          exact
          path="/auth/account/activate"
          component={RedirectPage}
          layout={AuthLayout}
          onEnter={(compProps: any) => {
            dispatch(
              AuthenticationActions.validateEmailRequest(
                parseParam(compProps.location, 'customerEmail'),
                parseParam(compProps.location, 'activationToken')
              )
            );
          }}
        />
        <RouteGuard
          exact
          path="/auth/account/license_verification"
          component={InformationPage}
          layout={AuthLayout}
          componentProps={(props: any) => ({
            title: t('LICENSE_VERIFICATION_TITLE'),
            text: t('LICENSE_VERIFICATION_TEXT')
              .split('\n')
              .map((item: string, index: number) => <p key={index}>{item}</p>),
            okButton: (
              <Link
                to="/auth/signin"
                id="okLink"
                className="btn btn-primary text-uppercase padding-button"
              >
                {t('OK_BUTTON')}
              </Link>
            )
          })}
        />
        {/**************************** */}
        {/****** Forgot Password ***** */}
        {/**************************** */}
        <RouteGuard
          exact
          path="/auth/account/reset_password"
          component={ResetPassword}
          layout={AuthLayout}
        />
        <RouteGuard
          exact
          path="/auth/account/reset_password_succeed"
          component={InformationPage}
          componentProps={(props: any) => ({
            title: t('EMAIL_SENT_TITLE'),
            text: t('RESET_PASSWORD_SUCCEED_TEXT', {
              addressEmail: parseParam(location, 'email')
            }),
            okButton: (
              <Link
                id="okLink"
                to="/auth/signin"
                className="btn btn-primary text-uppercase padding-button"
              >
                {t('OK_BUTTON')}
              </Link>
            )
          })}
          layout={AuthLayout}
        />
        <RouteGuard
          exact
          path="/auth/account/new_password"
          component={ChangePasswordPage}
          layout={AuthLayout}
          componentProps={(props: any) => ({
            title: t('NEW_PASSWORD_MAIN_TITLE'),
            text: t('NEW_PASSWORD_TITLE'),
            actionType: 'SET_PASSWORD',
            tokenName: 'resetPasswordToken',
            newPassword: true
          })}
          onEnter={(compProps: any) => {
            dispatch(
              AuthenticationActions.newPasswordGrantRequest(
                parseParam(compProps.location, 'customerEmail'),
                parseParam(compProps.location, 'resetPasswordToken')
              )
            );
          }}
          secure
          authorizationStatus={newPasswordGrantStatus}
        />
        <RouteGuard
          exact
          path="/auth/account/change_password"
          component={ChangePasswordPage}
          layout={AuthLayout}
          componentProps={(props: any) => ({
            title: t('CHANGE_PASSWORD_MAIN_TITLE'),
            text: t('CHANGE_PASSWORD_TITLE'),
            actionType: 'CHANGE_PASSWORD',
            tokenName: 'forgotPasswordToken'
          })}
          onEnter={(compProps: any) => {
            dispatch(
              AuthenticationActions.changePasswordGrantRequest(
                parseParam(compProps.location, 'customerEmail'),
                parseParam(compProps.location, 'forgotPasswordToken')
              )
            );
          }}
          secure
          authorizationStatus={changePasswordGrantStatus}
        />
        {/**************************** */}
        {/****** Errors *************** */}
        {/**************************** */}
        <RouteGuard
          path="/auth/error"
          component={ServerErrorPage}
          layout={AuthLayout}
        />
        <RouteGuard
          path="/auth/bad_request"
          component={BadRequestPage}
          layout={AuthLayout}
        />
        <RouteGuard
          path="/auth/unauthorized"
          component={UnAuthorizedPage}
          layout={AuthLayout}
        />
        <RouteGuard path="" layout={AuthLayout} component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

// Export Default
const AuthenticationRoutesLoading = LoadingContainer([
  IActions.SIGN_IN,
  IActions.SIGN_UP,
  IActions.RESET_PASSWORD
])(AuthenticationRoutesComp);

// Export AuthenticationRoutes
// Export Default
export default React.memo(AuthenticationRoutesLoading);
