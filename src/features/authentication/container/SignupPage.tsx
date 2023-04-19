import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import RenderCount from '../../../common/performance/RenderCount';
import SignupForm from '../components/SignupForm';
import { SignupFormValuesType } from '../models/AuthenticationModel.d';
import AuthenticationActions from '../redux/AuthenticationRedux';
import AuthenticationStyles from '../styles/Authentication.module.scss';

/**
 * Signup Page which show the Signup Form
 */
const SignupPage = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  const onSignup = (accounData: SignupFormValuesType) => {
    dispatch(AuthenticationActions.signUpRequest(accounData));
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
      <RenderCount componentName="SigninPage" />
      <h5 className="font-weight-bold mb-1 text-uppercase">
        {t('SIGNUP_MAIN_TITLE')}
      </h5>
      <h6 className="mb-3 text-greyDisable">{t('SIGNUP_TITLE')}</h6>
      <SignupForm onSignup={onSignup} />
      <RenderCount componentName="SigninPage" />
    </div>
  );
};

export default React.memo(SignupPage);
