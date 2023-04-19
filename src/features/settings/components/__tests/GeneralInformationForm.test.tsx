import React from 'react';
import GeneralInformationForm from '../GeneralInformationForm';
import { mount } from 'enzyme';
import createStore from '../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import {
  wrapperMemoryRouter,
  wrapperReduxForm
} from '../../../../../test/util';
import { Select } from 'antd';
import {
  initialStateGlobal,
  initialStateParameters
} from '../../../../../test/redux/InitialState';
import MockCountries from '../../../../common/services/mock/MockCountries';
import MockCities from '../../../../common/services/mock/MockCities';
import SettingsConstants from '../../constants/SettingsConstants';
import { submit } from 'redux-form';

describe('>>>GeneralInformation Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any, mockonSubmit: any;

  beforeEach(() => {
    store = createStore({ ...initialStateGlobal, ...initialStateParameters })
      .store;
    mockonSubmit = jest.fn();
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          {wrapperReduxForm(
            { component: GeneralInformationForm },
            mockonSubmit,
            SettingsConstants.FORM_SETTINGS
          )}
        </Provider>
      )
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Contains all Field', () => {
    // Contain Brand Logo Input
    const logoInput = wrapper.find('#brandLogo').find('input');
    expect(logoInput.length).toEqual(1);

    // Contain Brand Input
    const nameInput = wrapper.find('#name').find('input');
    expect(nameInput.length).toEqual(1);

    // Contain Street Address Input
    const streetAddressInput = wrapper.find('#streetAddress').find('input');
    expect(streetAddressInput.length).toEqual(1);

    // Contain Country Input
    const countryInput = wrapper.find('#country').find(Select);
    expect(countryInput.length).toEqual(1);

    // Contain City Input
    const cityInput = wrapper.find('#city').find(Select);
    expect(cityInput.length).toEqual(1);

    // Contain State Input
    const stateInput = wrapper.find('#state').find('input');
    expect(stateInput.length).toEqual(1);

    // Contain Post Code Input
    const postalCodeInput = wrapper.find('#postalCode').find('input');
    expect(postalCodeInput.length).toEqual(1);

    // Contain Web Site Input
    const websiteInput = wrapper.find('#webSite').find('input');
    expect(websiteInput.length).toEqual(1);

    // Contain Email Input
    const emailInput = wrapper.find('#mailContact').find('input');
    expect(emailInput.length).toEqual(1);

    // Contain Phone Number Input
    const telephoneNumberInput = wrapper.find('#telephoneNumber').find('input');
    expect(telephoneNumberInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    // Prepare
    const generalInformationData = {
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
      mailContact: 'zerzer@mail.com',
      telephoneNumber: '+33 4 24 32 32 31'
    };

    // Populate Form
    // Fill Brand Input
    const nameInput = wrapper.find('#name').find('input');
    nameInput.simulate('change', {
      target: { value: generalInformationData.name }
    });

    // Fill Street Address Input
    const streetAddressInput = wrapper.find('#streetAddress').find('input');
    streetAddressInput.simulate('change', {
      target: { value: generalInformationData.address.streetAddress }
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
      target: { value: generalInformationData.address.state }
    });

    // Fill Post Code Input
    const postalCodeInput = wrapper.find('#postalCode').find('input');
    postalCodeInput.simulate('change', {
      target: { value: generalInformationData.address.postalCode }
    });

    // Fill WebSite Input
    const websiteInput = wrapper.find('#webSite').find('input');
    websiteInput.simulate('change', {
      target: { value: generalInformationData.webSite }
    });

    // Fill Email Input
    const emailInput = wrapper.find('#mailContact').find('input');
    emailInput.simulate('change', {
      target: { value: generalInformationData.mailContact }
    });

    // Fill Phone Number Input
    const telephoneNumberInput = wrapper.find('#telephoneNumber').find('input');
    telephoneNumberInput.simulate('change', {
      target: { value: '+33424323231' }
    });

    // Submitting the form
    store.dispatch(submit(SettingsConstants.FORM_SETTINGS));
  });
});
