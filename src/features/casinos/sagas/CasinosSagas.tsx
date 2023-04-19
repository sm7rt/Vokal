import { call, put } from 'redux-saga/effects';
import { CasinosServiceType } from '../models/CasinosModel.d';
import CasinosAction from '../redux/CasinosRedux';
import SettingsActions from '../../settings/redux/SettingsRedux';
import MessagesAction from '../../../common/redux/SystemMessagesRedux';
import i18n from '../../../i18n';
import AuthenticationActions from '../../authentication/redux/AuthenticationRedux';

/**
 * Fetch Casino Details
 */
export function* fetchCasinoDetails(
  api: CasinosServiceType,
  action: { id: string }
) {
  const { id } = action;

  const casinoDetailsResponse = yield call(api.fetchCasinoDetails, id);

  if (casinoDetailsResponse.status === 200) {
    // Fetch Casino Image
    const casinoImageResponse = yield call(api.fetchCasinoImage, id);

    if (
      casinoImageResponse.status === 200 ||
      casinoImageResponse.status === 404
    ) {
      // Success
      yield put(
        CasinosAction.fetchCasinoDetailsSuccessResponse(id, {
          ...casinoDetailsResponse.data,
          resizedUrl:
            casinoImageResponse.data && casinoImageResponse.data.resizedUrl
        })
      );

      // TODO Add a condition of casino owner
      yield put(
        SettingsActions.initGames(casinoDetailsResponse.data.offeredGames || [])
      );
    } else {
      // If we haven't logo we can even send a success response
      yield put(
        CasinosAction.fetchCasinoDetailsSuccessResponse(
          id,
          casinoDetailsResponse.data
        )
      );
    }
  } else {
    // Logout
    yield put(AuthenticationActions.logoutRequest());

    // Manage Error
    yield put(CasinosAction.fetchCasinoDetailsFailureResponse());
    yield put(
      MessagesAction.addMessage(
        'FETCH_CASINO_DETAILS_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('FETCH_CASINO_DETAILS_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}
