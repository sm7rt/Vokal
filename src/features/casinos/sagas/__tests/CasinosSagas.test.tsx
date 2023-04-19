import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import FixtureCasinosApi from '../../services/FixtureCasinosApi';
import { fetchCasinoDetails } from '../CasinosSagas';
import CasinosAction from '../../redux/CasinosRedux';

// Testing fetchCasinoDetails Middleware Success
test('fetch Casino Details Middleware Success', () => {
  const data = {
    id: '32424342342',
    address: '16 rue clichy',
    city: 'Clichy',
    country: 'France',
    countryCode: 'FRA',
    currency: 'EUR',
    description: 'This is a description',
    dressCode: 'Relax',
    position: {
      lat: 48.89871,
      lon: 2.31033
    },
    mailContact: 'clichy@gmail.com',
    minimumAgeEntrance: '18',
    name: 'Kings',
    alwaysOpen: false,
    postalCode: '92110',
    spokenLanguages: 'FR',
    tableNumber: '5',
    telephoneNumber: '+33 2 22 22 22 22',
    timeZoneStr: 'Europe/Paris',
    mainCurrency: 'EUR',
    tablesNumber: '5',
    facebookUrl: '',
    googlePlusUrl: '',
    webSite: '',
    youtubeUrl: ''
  };
  const Response = {
    status: 200,
    data
  };

  const ImageResponse = {
    status: 200,
    data: {
      resizedUrl: 'http://fgfdgdf.com/fdsfdf'
    }
  };

  return expectSaga(fetchCasinoDetails, FixtureCasinosApi, {
    id: 1
  })
    .provide([
      [matchers.call.fn(FixtureCasinosApi.fetchCasinoDetails), Response],
      [matchers.call.fn(FixtureCasinosApi.fetchCasinoImage), ImageResponse]
    ])
    .put(
      CasinosAction.fetchCasinoDetailsSuccessResponse(1, {
        ...data,
        resizedUrl: ImageResponse.data.resizedUrl
      })
    )
    .run();
});
