import { put, call, select } from 'redux-saga/effects';
import {
  SettingsServiceType,
  SaveGeneralInformationActionType
} from '../models/SettingsModel';
import { ApiResponseType } from '../../../common/models';
import SettingsActions, { getGames } from '../redux/SettingsRedux';
import { push } from 'connected-react-router';
import MessagesAction from '../../../common/redux/SystemMessagesRedux';
import CommonConstants from '../../../common/constants/CommonConstants';
import CasinosActions from '../../casinos/redux/CasinosRedux';
import i18n from '../../../i18n';
import { ownerSelector } from '../../authentication/redux/AuthenticationRedux';

/**
 * Save General Information
 */
export function* saveGeneralInformation(
  api: SettingsServiceType,
  action: SaveGeneralInformationActionType
) {
  const { data, redirectUrl } = action;

  // Get Data of Games from Store
  const offeredGames = yield select(getGames);

  // Prepare Data for the Service
  const dataToSend = {
    name: data.name,
    address: data.address.streetAddress,
    country: data.address.country,
    countryCode: data.address.countryCode,
    city: data.address.city,
    state: data.address.state,
    postalCode: data.address.postalCode,
    webSite: data.webSite,
    mailContact: data.mailContact,
    telephoneNumber: data.telephoneNumber,
    mainCurrency: data.mainCurrency,
    minimumAgeEntrance: data.minimumAgeEntrance,
    dressCode: data.dressCode,
    pokerRoom: true,
    offeredGames
  };

  // Select casino Id
  const owner = yield select(ownerSelector);

  const saveGeneralInformationResponse: ApiResponseType<any> = yield call(
    api.updateCasino,
    owner.managedCasinoId,
    dataToSend
  );

  if (saveGeneralInformationResponse.status === 204) {
    // Upload Logo
    if (data.brandLogo && data.brandLogo.file) {
      const formData = new FormData();
      formData.append('image', data.brandLogo.file);

      // We Try to upload Logo
      const uploadLogoResponse: ApiResponseType<any> = yield call(
        api.uploadCasinoLogo,
        owner.managedCasinoId,
        formData
      );

      if (uploadLogoResponse.status === 201) {
        // Refresh Casino Details
        yield put(
          CasinosActions.fetchCasinoDetailsRequest(owner.managedCasinoId, true)
        );

        // Save General Information Success
        yield put(SettingsActions.saveGeneralInformationSuccessResponse());
        // Redirect if needed
        if (redirectUrl) {
          yield put(push(redirectUrl));
        }
      } else {
        /// Display An Error
        yield put(
          MessagesAction.addMessage(
            'SAVE_GENERAL_INFORMATION_ERROR',
            CommonConstants.ERROR,
            i18n.t('GLOBAL_ERROR_MESSAGE', {
              action: i18n.t('SAVE_GENERAL_INFORMATION_ACTION_ERROR')
            }),
            '',
            CommonConstants.PANEL
          )
        );
        // Set Error in Error Store
        yield put(SettingsActions.saveGeneralInformationFailureResponse());
      }
    } else {
      // Refresh Casino Details
      yield put(
        CasinosActions.fetchCasinoDetailsRequest(owner.managedCasinoId, true)
      );

      // Save General Information Success
      yield put(SettingsActions.saveGeneralInformationSuccessResponse());
      if (redirectUrl) {
        yield put(push(redirectUrl));
      }
    }
  } else {
    /// Display An Error
    yield put(
      MessagesAction.addMessage(
        'SAVE_GENERAL_INFORMATION_ERROR',
        CommonConstants.ERROR,
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('SAVE_GENERAL_INFORMATION_ACTION_ERROR')
        }),
        '',
        CommonConstants.PANEL
      )
    );
    // Set Error in Error Store
    yield put(SettingsActions.saveGeneralInformationFailureResponse());
  }
}
