import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import RenderCount from '../../../common/performance/RenderCount';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { ResetPasswordFormValuesType } from '../models/AuthenticationModel.d';
import AuthenticationActions from '../redux/AuthenticationRedux';
import AuthenticationStyles from '../styles/Authentication.module.scss';

/**
 * ResetPassword Page which show the ResetPassword Form
 */
const ResetPasswordPage = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { history } = useReactRouter();

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  const onResetPassword = ({ email }: ResetPasswordFormValuesType) => {
    // Try to reset the password
    dispatch(AuthenticationActions.resetPasswordRequest(email));
  };

  const cancelForm = () => {
    history.goBack();
  };

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <div
      className={`${
        AuthenticationStyles.authForm
      } mx-auto my-auto col-md-10 col-lg-8`}
    >
      <RenderCount componentName="ResetPasswordPage" />
      <h5 className="font-weight-bold mb-1 text-uppercase">
        {t('FORGOT_PASSWORD_MAIN_TITLE')}
      </h5>
      <h6 className="mb-5 text-greyDisable">{t('FORGOT_PASSWORD_TITLE')}</h6>
      <ResetPasswordForm
        onResetPassword={onResetPassword}
        cancelForm={cancelForm}
      />
      <RenderCount componentName="ResetPasswordPage" />
    </div>
  );
};

export default React.memo(ResetPasswordPage);
