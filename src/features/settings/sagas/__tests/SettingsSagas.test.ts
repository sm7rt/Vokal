import { push } from 'connected-react-router';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { ownerSelector } from '../../../authentication/redux/AuthenticationRedux';
import SettingsActions, { getGames } from '../../redux/SettingsRedux';
import FixtureSettingsApi from '../../services/FixtureSettingsApi';
import { saveGeneralInformation } from '../SettingsSagas';
import CasinosActions from '../../../casinos/redux/CasinosRedux';

const generalInformationData = {
  name: 'Casino',
  mailContact: 'zerzer@mail.com',
  telephoneNumber: '+3342432323',
  address: '12 rue des lilas',
  country: 'France',
  countryCode: 'FR',
  city: 'Paris',
  state: 'Seine Maritime',
  postcode: '93000'
};

// Testing the saveGeneralInformation for casino MiddleWare Success
test('save general information for Casino Middleware Success', () => {
  // Prepare
  const action = {
    data: generalInformationData,
    redirectUrl: `/admin/users/account`
  };

  const owner = {
    managedCasinoId: 1
  };

  const games = [
    {
      variant: 'NLH',
      smallBlind: 1,
      bigBlinde: 2
    }
  ];

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(saveGeneralInformation, FixtureSettingsApi, action)
    .provide([
      [matchers.call.fn(FixtureSettingsApi.updateCasino), serviceResultSuccess],
      [matchers.select.selector(ownerSelector), owner],
      [matchers.select.selector(getGames), games]
    ])
    .put(CasinosActions.fetchCasinoDetailsRequest(owner.managedCasinoId, true))
    .put(SettingsActions.saveGeneralInformationSuccessResponse())
    .put(push(action.redirectUrl))
    .run();
});
