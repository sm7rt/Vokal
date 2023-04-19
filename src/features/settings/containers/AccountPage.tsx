import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Icon, Layout, Row } from 'antd';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  getFormSyncErrors,
  hasSubmitFailed,
  reduxForm
} from 'redux-form';
import Logo from '../../../assets/images/logo.png';
import RenderCount from '../../../common/performance/RenderCount';
import GeneralInformationForm from '../components/GeneralInformationForm';
import PokerRoomInformationForm from '../components/PokerRoomInformationForm';
import SettingsConstants from '../constants/SettingsConstants';
import { useFillCasinoSettingsForm } from '../hooks/SettingsHook';
import {
  GeneralInformationFormType,
  PokerRoomInformationFormType
} from '../models/SettingsModel';
import SettingsActions from '../redux/SettingsRedux';
import './AccountPage.scss';
import { SettingsContext } from './SettingContext';

/**
 * Account Page
 */
const AccountPage = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('1');
  const [tabClicked, setTabClicked] = useState(false);

  const formSubmitFailedSelector = hasSubmitFailed(
    SettingsConstants.FORM_SETTINGS
  );
  // If Submit failed
  const formSubmitFailed = useSelector(formSubmitFailedSelector);

  const formSubmitErrorsSelector = getFormSyncErrors(
    SettingsConstants.FORM_SETTINGS
  );

  // Get Submit Errors
  const formSubmitErrors = useSelector(formSubmitErrorsSelector);

  // Use Fill Casino Settings Function
  useFillCasinoSettingsForm();

  /**
   * Render Tab Title with Error if Tab has an error state
   */
  const rendertab = (title: string, fields: Array<string>) => {
    if (
      formSubmitFailed &&
      fields.filter((field: string) => formSubmitErrors[field]).length > 0
    ) {
      return (
        <Row
          type="flex"
          className="text-danger"
          justify="center"
          align="middle"
        >
          <Icon type="info-circle" /> {title}
        </Row>
      );
    }
    return title;
  };

  const onSubmitForm = (
    data: PokerRoomInformationFormType & GeneralInformationFormType
  ) => {
    dispatch(
      SettingsActions.saveGeneralInformationRequest(
        data,
        `/admin/users/account`
      )
    );
  };

  return (
    <Fragment>
      <RenderCount componentName="AccountPage" />
      <PageHeaderWrapper
        className="full-width-tab w-100 account-page-header bg-light"
        style={{
          position: 'fixed',
          zIndex: 1,
          top: 0,
          left: 0,
          padding: 0,
          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.15)'
        }}
        tabActiveKey={currentTab}
        tabList={[
          {
            key: '1',
            tab: rendertab(
              t('SETTINGS_GENERAL_INFORMATION_TITLE').toUpperCase(),
              ['name', 'website', 'mailContact', 'telephoneNumber', 'address']
            )
          },
          {
            key: '2',
            tab: rendertab(
              t('SETTINGS_POKER_ROOM_INFORMATION_TITLE').toUpperCase(),
              ['mainCurrency', 'minimumAgeEntrance', 'dressCode']
            )
          }
        ]}
        onTabChange={(key: string) => {
          setCurrentTab(key);
          setTabClicked(false);
        }}
        onTabClick={() => {
          setTabClicked(true);
        }}
        content={
          <Row
            type="flex"
            className="align-items-center justify-content-center w-100 position-relative"
            style={{
              background: '#FBFBFB',
              padding: 24
            }}
          >
            <img
              id="main-logo"
              className="d-inline-block align-top mr-1 position-absolute"
              height="40px"
              width="40px"
              src={Logo}
              alt="WeOpt Dashboard"
              style={{ left: '15px', top: '15px' }}
            />
            <h5 className="d-none d-md-inline ml-1 font-weight-bold m-0 text-uppercase">
              {t('FLOP_AD_CONFIGURATION_TITLE')}
            </h5>
          </Row>
        }
      />
      <Layout.Content
        className="bg-white"
        style={{ marginTop: 120, paddingTop: 20 }}
      >
        <SettingsContext.Provider value={() => {}}>
          <Form
            onSubmit={props.handleSubmit(onSubmitForm)}
            className="justify-content-between d-flex flex-column min-h-100"
          >
            <div className={`d-flex flex-column p-4`}>
              <Row type="flex">
                <h6 className="mb-5 text-greyDisable">
                  {currentTab === '1'
                    ? t('SETTINGS_GENERAL_INFORMATION_TEXT')
                    : t('SETTINGS_POKER_ROOM_INFORMATION_TEXT')}
                </h6>
              </Row>
              <Row type="flex" className="flex-fill">
                <div
                  className={`w-100 ${
                    !tabClicked && currentTab === '1' ? '' : 'hidden'
                  }`}
                >
                  <GeneralInformationForm change={props.change} />
                </div>
                <div
                  className={`w-100 ${
                    !tabClicked && currentTab === '2' ? '' : 'hidden'
                  }`}
                >
                  <PokerRoomInformationForm />
                </div>
              </Row>
            </div>
            <Row type="flex" className="justify-content-end pr-5 pb-3">
              <Button
                type="primary"
                htmlType="submit"
                id="submitSettingsBtn"
                className={`padding-button text-uppercase ${formSubmitFailed &&
                  Object.keys(formSubmitErrors).length > 0 &&
                  'bg-danger border-danger'}`}
              >
                {t('SETTINGS_DONE_BUTTON')}
              </Button>
            </Row>
          </Form>
        </SettingsContext.Provider>
      </Layout.Content>
    </Fragment>
  );
};

//* ******************** */
// Redux Form            */
//* ******************** */
const AccountPageForm = reduxForm<
  PokerRoomInformationFormType & GeneralInformationFormType,
  void
>({
  form: SettingsConstants.FORM_SETTINGS,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(AccountPage);

export default AccountPageForm;
