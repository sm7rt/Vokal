import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useStore } from 'react-redux';
import { persistReducer } from 'redux-persist';
import RenderCount from '../../../common/performance/RenderCount';
import { NoPersistConfig } from '../../../config/ReduxPersistConfig';
import { history } from '../../../redux';
import reducers from '../../../redux/reducers';
import SigninForm from '../components/SigninForm';
import { SigninFormValuesType } from '../models/AuthenticationModel.d';
import AuthenticationActions from '../redux/AuthenticationRedux';
import AuthenticationStyles from '../styles/Authentication.module.scss';

/**
 * Signin Page which show the Signin Form
 */
const SigninPage = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const store = useStore();

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  const onSignin = ({ email, password, rememberMe }: SigninFormValuesType) => {
    // If User don't want to Keep his session open, we need to replace reducer with a NoPersist Config
    if (!rememberMe) {
      store.replaceReducer(persistReducer(NoPersistConfig, reducers(history)));
    }

    // Try to Signin
    setTimeout(
      () => dispatch(AuthenticationActions.signInRequest(email, password)),
      300
    );
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
        {t('SIGNIN_MAIN_TITLE')}
      </h5>
      <h6 className="mb-5 text-greyDisable">{t('SIGNIN_TITLE')}</h6>
      <SigninForm onSignin={onSignin} />
    </div>
  );
};

export default React.memo(SigninPage);
