import { Card, Row, Button } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../common/models/StateModel';
import UsersActions, { userFromListSelector } from '../redux/UserRedux';
import { useTranslation } from 'react-i18next';
import ProfileForm from './form/ProfileForm';
import { submit, reset } from 'redux-form';
import UsersConstants from '../constants/UsersConstants';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {};

/**
 * Profile Card
 */
const ProfileCard = (props: Props) => {
  const { t } = useTranslation();
  const profile = useSelector(
    (state: IRootState) =>
      state.authentication.signin &&
      userFromListSelector(state, state.authentication.signin.id)
  );
  const [editionMode, setEditionMode] = useState(false);
  const dispatch = useDispatch();

  // When cancel editing
  const onCancel = () => {
    dispatch(reset(UsersConstants.FORM_PROFILE));
    setEditionMode(false);
  };

  // When Submit is OK
  const onSubmitProfile = (data: any) => {
    setEditionMode(false);

    dispatch(UsersActions.saveProfileRequest(data));
  };

  /**
   * Render
   */
  return (
    <Card className="p-4 h-100">
      {profile && profile.data && (
        <ProfileForm
          onSubmit={onSubmitProfile}
          edition={editionMode}
          initialValues={{
            ...profile.data,
            imageUrl: profile.profilePicture
          }}
        />
      )}
      {!editionMode ? (
        <Row className="mt-5 text-center">
          <Button
            onClick={() => setEditionMode(true)}
            type="primary"
            className="padding-button text-uppercase"
            id="button-edit-profile"
          >
            {t('EDIT_PROFILE_BUTTON')}
          </Button>
        </Row>
      ) : (
        <Row type="flex" justify="space-between" className="mt-5">
          <Button onClick={onCancel} className="padding-button  text-uppercase">
            {t('CANCEL_BUTTON')}
          </Button>
          <Button
            onClick={() => dispatch(submit(UsersConstants.FORM_PROFILE))}
            type="primary"
            className="padding-button  text-uppercase"
            id="button-save-profile"
          >
            {t('APPLY_BUTTON')}
          </Button>
        </Row>
      )}
    </Card>
  );
};

export default React.memo(ProfileCard);
