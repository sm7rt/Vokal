import { Col, Form, Row, Avatar } from 'antd';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { email, required } from 'redux-form-validators';
import EditableImage from '../../../../common/components/avatar/EditableImage';
import { AIconInput } from '../../../../common/components/form/AntdSimpleField';
import UsersConstants from '../../constants/UsersConstants';
import AntdFileUploadField from '../../../../common/components/form/AntdFileUploadField';
import DefaultProfile from '../../../../assets/images/default_profile_picture.png';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type ProfileProps = { edition?: boolean };

//* ******************** */
// FORM PROPS */
//* ******************** */
type ProfileFormType = {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  phoneNumber: string;
};

// Global Props
type GlobalProps = InjectedFormProps<ProfileFormType, ProfileProps> &
  ProfileProps;

/**
 * Event Creation Component
 */
const ProfileComp = (props: GlobalProps) => {
  const { initialValues, edition } = props;
  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  //* ******************** */
  // RENDER */
  //* ******************** */
  const { t } = useTranslation();
  return (
    <Form className="form d-flex flex-column flex-fill" layout="vertical">
      <Row type="flex" justify="center">
        <Col className="d-flex flex-column align-items-center w-100 circle-upload">
          <Field
            id="pictureProfile"
            name="pictureProfile"
            component={AntdFileUploadField}
            hasFeedback
            previewWith={115}
            previewHeight={115}
            disabled={!edition}
            accept=".png,.jpg"
            children={(props: any) => (
              <EditableImage
                editable={!props.disabled}
                size={props.previewWith}
                src={props.input.value.imageUrl || initialValues.imageUrl}
                circle
              >
                {({ src, size }) => (
                  <Avatar size={size} src={src || DefaultProfile} />
                )}
              </EditableImage>
            )}
            className="mb-0"
          />
          <h5 className="mt-2">
            {initialValues &&
              `${initialValues.firstName} ${initialValues.lastName}`}
          </h5>
          <p className="mt-1">{initialValues && initialValues.role}</p>
        </Col>
      </Row>
      {initialValues && (
        <Fragment>
          <Row type="flex" justify="start" className="mt-5">
            <Col className="w-100">
              <h5 className="text-uppercase">{t('ABOUT')}</h5>
              <Field
                placeholder={t('PLACEHOLDER_FIRSTNAME')}
                id="firstName"
                name="firstName"
                component={AIconInput}
                icon="idcard"
                hasFeedback
                mandatory
                validate={[required()]}
                disabled={!edition}
              />
              <Field
                placeholder={t('PLACEHOLDER_LASTNAME')}
                id="lastName"
                name="lastName"
                component={AIconInput}
                icon="idcard"
                hasFeedback
                mandatory
                validate={[required()]}
                disabled={!edition}
              />
              {/* <CountryAutocompleteField
                className="ml-2"
                icon="flag"
                style={{ width: '70%' }}
              />
              <CityAutocompleteField
                icon="pushpin"
                className="ml-2"
                style={{ width: '70%' }}
              /> */}
            </Col>
          </Row>
          <Row type="flex" justify="start" className="mt-5">
            <Col className="w-100">
              <h5 className="text-uppercase">{t('CONTACT')}</h5>
              <Field
                placeholder={t('PLACEHOLDER_EMAIL')}
                id="email"
                name="email"
                icon="mail"
                component={AIconInput}
                hasFeedback
                mandatory
                validate={[required(), email()]}
                disabled
              />
              {/* <Field
                placeholder={t('PLACEHOLDER_PHONE')}
                icon="phone"
                id="phone"
                name="phone"
                component={AIconInput}
                hasFeedback
                disabled={!edition}
              /> */}
            </Col>
          </Row>
        </Fragment>
      )}
    </Form>
  );
};

// Create Redux form
const ProfileForm = reduxForm<ProfileFormType, ProfileProps>({
  form: UsersConstants.FORM_PROFILE
})(ProfileComp);

// Export Default
export default React.memo(ProfileForm);
