import { takeLatest } from 'redux-saga/effects';

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

import DebugConfig from '../../../config/DebugConfig';
import FixtureSettingsApi from '../services/FixtureSettingsApi';
import SettingsApi from '../services/SettingsApi';
import { SettingsTypes } from '../redux/SettingsRedux';
import { saveGeneralInformation } from './SettingsSagas';

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureSettingsApi : SettingsApi.create();

// Settings Saga
const settingsSaga = [
  takeLatest(
    SettingsTypes.SAVE_GENERAL_INFORMATION_REQUEST,
    saveGeneralInformation,
    api
  )
];

// Export Default
export default settingsSaga;
