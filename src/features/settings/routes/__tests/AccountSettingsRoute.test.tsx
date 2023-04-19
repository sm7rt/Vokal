import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../../../test/redux';
import {
  initialStateGlobal,
  initialStateParameters,
  initialStateAuthent
} from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import { Store } from 'redux';
import SettingsRoutes from '../SettingsRoutes';
import { Select } from 'antd';
import MockCountries from '../../../../common/services/mock/MockCountries';
import MockCities from '../../../../common/services/mock/MockCities';
import Currencies from '../../../../common/sagas/static/Currencies';
import SettingsConstants from '../../constants/SettingsConstants';
import { submit } from 'redux-form';

// Set the correct location
const initialPageAccountSettings = {
  router: {
    location: {
      pathname: '/admin/account/settings',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>AccountSettings Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  it('+++ render the connected(SMART) component', () => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateParameters,
      ...initialPageAccountSettings
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<SettingsRoutes />, history)}
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('+++ check AccountSettings Part 1 & 2', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateParameters,
      ...initialPageAccountSettings
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<SettingsRoutes />, history)}
      </Provider>
    );
    // Prepare
    const generalInfoData = {
      name: 'Casino',
      address: {
        streetAddress: '12 rue des lilas',
        country: 'France',
        countryCode: 'FR',
        city: 'Antagnac',
        state: 'Seine Maritime',
        postalCode: '93000'
      },
      webSite: 'http://www.google.com',
      mailContact: 'ezzerez@gmail.com',
      telephoneNumber: '+33 4 24 32 32 31'
    };

    // Expecting AccountSettings Succeed and redirect to AccountSettingsSucceed
    store.subscribe(() => {
      if (store.getState().router.location.pathname == '/admin/users/account') {
        done();
      }
    });

    // Populate Form

    // Fill Brand Input
    const casinoName = wrapper.find('#name').find('input');
    casinoName.simulate('change', { target: { value: generalInfoData.name } });

    // Fill Street Address Input
    const streetAddressInput = wrapper.find('#streetAddress').find('input');
    streetAddressInput.simulate('change', {
      target: { value: generalInfoData.address.streetAddress }
    });

    // Fill Country AutoComplete
    const countryAutoComplete = wrapper.find('#country').find(Select);
    countryAutoComplete.props().onChange(MockCountries[1].id);

    // Fill City Input
    const cityAutoComplete = wrapper.find('#city').find(Select);
    cityAutoComplete.props().onChange(MockCities[0].id);

    // Fill State Input
    const stateInput = wrapper.find('#state').find('input');
    stateInput.simulate('change', {
      target: { value: generalInfoData.address.state }
    });

    // Fill Post Code Input
    const postalCodeInput = wrapper.find('#postalCode').find('input');
    postalCodeInput.simulate('change', {
      target: { value: generalInfoData.address.postalCode }
    });

    // Fill Email Input
    const webSiteInput = wrapper.find('#webSite').find('input');
    webSiteInput.simulate('change', {
      target: { value: generalInfoData.webSite }
    });

    // Contain Email Contact Input
    const mailContactInput = wrapper.find('#mailContact').find('input');
    mailContactInput.simulate('change', {
      target: { value: generalInfoData.mailContact }
    });

    // Fill Phone Number Input
    const telephoneNumberInput = wrapper.find('#telephoneNumber').find('input');
    telephoneNumberInput.simulate('change', {
      target: { value: '+33424323231' }
    });

    // Switch Tab
    const tabPokerRoomInfo = wrapper.find('.ant-tabs-tab').at(1);
    tabPokerRoomInfo.simulate('click');

    const pokerRoomInfoData = {
      mainCurrency: 'AED',
      minimumAgeEntrance: '18',
      dressCode: 'Smart Casual'
    };

    // Populate Forms

    // Fill Currency AutoComplete
    const mainCurrencyAutoComplete = wrapper.find('#mainCurrency').find(Select);
    mainCurrencyAutoComplete.props().onChange(Currencies[1].id);

    // Fill Minimum Age Entrance
    const minimumAgeEntranceInput = wrapper
      .find('#minimumAgeEntrance')
      .find('input');
    minimumAgeEntranceInput.props().value =
      pokerRoomInfoData.minimumAgeEntrance;
    minimumAgeEntranceInput.simulate('change');

    // Fill Dress Code
    const dressCodeInput = wrapper.find('#dressCode').find('input');
    dressCodeInput.simulate('change', {
      target: { value: pokerRoomInfoData.dressCode }
    });

    // Submitting the form
    store.dispatch(submit(SettingsConstants.FORM_SETTINGS));
    // const submitButton = wrapper.find('#submitSettingsBtn').find('button');
    // console.log(submitButton.debug());
    // submitButton.simulate('click');
  }, 10000);
});
