import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SubmissionError } from 'redux-form';
import useReactRouter from 'use-react-router';
import RenderCount from '../../../common/performance/RenderCount';
import { parseParam } from '../../../utils/LocationUtils';
import ChangePasswordForm from '../components/ChangePasswordForm';
import { ChangePasswordFormValuesType } from '../models/AuthenticationModel.d';
import AuthenticationActions from '../redux/AuthenticationRedux';
import AuthenticationStyles from '../styles/Authentication.module.scss';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type ChangePasswordPageProps = {
  title: string;
  text: string;
  actionType: 'SET_PASSWORD' | 'CHANGE_PASSWORD';
  tokenName: string;
  newPassword?: boolean;
};

/**
 * ChangePassword Page which show the ChangePassword Form
 */
const ChangePasswordPage = ({
  title,
  text,
  actionType,
  tokenName,
  newPassword
}: ChangePasswordPageProps) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { location } = useReactRouter();

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  const onChangePassword = (data: ChangePasswordFormValuesType) => {
    if (data.password !== data.password_check) {
      throw new SubmissionError({
        password_check: t('PASSWORD_MISTMATCH')
      });
    } else {
      dispatch(
        AuthenticationActions.changePasswordRequest(
          data.email,
          data.firstName,
          data.lastName,
          data.password,
          data.password_check,
          parseParam(location, tokenName),
          actionType
        )
      );
    }
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
      <RenderCount componentName="ChangePasswordPage" />
      <h5 className="font-weight-bold mb-1 text-uppercase">{title}</h5>
      <h6 className="mb-5 text-greyDisable"> {text}</h6>
      <ChangePasswordForm
        newPassword={newPassword}
        onChangePassword={onChangePassword}
        initialValues={{ email: parseParam(location, 'customerEmail') }}
      />
    </div>
  );
};

export default React.memo(ChangePasswordPage);
