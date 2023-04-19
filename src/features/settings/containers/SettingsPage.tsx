import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Col, Row, Button } from 'antd';
import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { reduxForm, submit, isDirty, reset } from 'redux-form';
import RenderCount from '../../../common/performance/RenderCount';
import GeneralInformationForm from '../components/GeneralInformationForm';
import PokerRoomInformationForm from '../components/PokerRoomInformationForm';
import SettingsConstants from '../constants/SettingsConstants';
import { useFillCasinoSettingsForm } from '../hooks/SettingsHook';
import SettingsActions from '../redux/SettingsRedux';
import {
  GeneralInformationFormType,
  PokerRoomInformationFormType
} from '../models/SettingsModel';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingContainer } from '../../../common/components/container';
import { SettingsContext } from './SettingContext';
import CasinosActions from '../../casinos/redux/CasinosRedux';
import { currentCasinoSelector } from '../../authentication/redux/AuthenticationRedux';

const SettingsFormComp = props => {
  const { currentTab, editMode } = props;

  // Use Fill Casino Settings Function
  useFillCasinoSettingsForm();

  return (
    <Row type="flex" className="flex-fill p-4">
      {currentTab === 'general' && (
        <GeneralInformationForm change={props.change} disabled={!editMode} />
      )}
      {currentTab === 'pkr' && (
        <PokerRoomInformationForm disabled={!editMode} />
      )}
    </Row>
  );
};

//* ******************** */
// Redux Form            */
//* ******************** */
const SettingsForm = reduxForm<
  PokerRoomInformationFormType & GeneralInformationFormType,
  void
>({
  form: SettingsConstants.FORM_SETTINGS,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(SettingsFormComp);

/**
 * Settings Page
 */
const SettingsPage = (props: any) => {
  const { t } = useTranslation();
  const [offeredGamesEdited, setOfferedGamesEdited] = useState(false);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('general');
  const [editMode, setEditMode] = useState(false);
  const casinoId = useSelector(currentCasinoSelector);

  const settingsFormSelector = isDirty(SettingsConstants.FORM_SETTINGS);
  const settingsFormDirty = useSelector(settingsFormSelector);

  const onActiveEditMode = () => {
    setEditMode(true);
  };

  const onCancelEdit = () => {
    setEditMode(false);
    // Reset Data
    dispatch(reset(SettingsConstants.FORM_SETTINGS));
    dispatch(CasinosActions.fetchCasinoDetailsRequest(casinoId, true));
  };

  const onSave = () => {
    dispatch(submit(SettingsConstants.FORM_SETTINGS));
  };

  const onSubmitForm = (
    data: PokerRoomInformationFormType & GeneralInformationFormType
  ) => {
    dispatch(SettingsActions.saveGeneralInformationRequest(data));
    setEditMode(false);
    dispatch(reset(SettingsConstants.FORM_SETTINGS));
  };

  return (
    <Col className="h-100 d-flex flex-column" data-testid="settings-page">
      <RenderCount componentName="SettingsPage" />
      <PageHeaderWrapper
        tabActiveKey={currentTab}
        tabList={[
          {
            key: 'general',
            tab: t('SETTINGS_GENERAL_INFORMATION_TITLE')
          },
          {
            key: 'pkr',
            tab: t('SETTINGS_POKER_ROOM_INFORMATION_TITLE')
          }
        ]}
        onTabChange={(key: string) => setCurrentTab(key)}
        title={t('SETTINGS')}
        extra={
          <Row style={{ marginTop: 10 }}>
            {!editMode ? (
              <Button type="primary" icon="edit" onClick={onActiveEditMode}>
                Edit
              </Button>
            ) : (
              <Fragment>
                <Button icon="save" onClick={onCancelEdit}>
                  Cancel
                </Button>
                <Button
                  className="ml-2"
                  type="primary"
                  disabled={!settingsFormDirty && !offeredGamesEdited}
                  icon="save"
                  onClick={onSave}
                >
                  Save
                </Button>
              </Fragment>
            )}
          </Row>
        }
      />
      <SettingsContext.Provider value={setOfferedGamesEdited}>
        <SettingsForm
          currentTab={currentTab}
          editMode={editMode}
          onSubmit={onSubmitForm}
        />
      </SettingsContext.Provider>
    </Col>
  );
};

export default React.memo(
  LoadingContainer(['FETCH_CASINO_DETAILS', 'SAVE_GENERAL_INFORMATION'])(
    SettingsPage
  )
);
