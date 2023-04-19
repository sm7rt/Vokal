import React from 'react';
import SignupForm from '../SignupForm';
import { mount } from 'enzyme';
import createStore from '../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { wrapperMemoryRouter } from '../../../../../test/util';
import { AutoComplete, Select } from 'antd';
import {
  initialStateGlobal,
  initialStateParameters
} from '../../../../../test/redux/InitialState';
import MockCities from '../../../../common/services/mock/MockCities';
import MockCountries from '../../../../common/services/mock/MockCountries';

describe('>>>Signup Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any, mockOnSignupfn: any;

  beforeEach(() => {
    store = createStore({ ...initialStateGlobal, ...initialStateParameters })
      .store;
    // Mock functions
    mockOnSignupfn = jest.fn();
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <SignupForm onSignup={mockOnSignupfn} />
        </Provider>
      )
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Contains all Field', () => {
    // Contain Account Type radio
    // const typeRadio = wrapper.find('#type').find('input');
    // expect(typeRadio.length).toEqual(2);

    // Contain License Autority Input
    const licenceAuthorityInput = wrapper
      .find('#licenceAuthority')
      .find('input');
    expect(licenceAuthorityInput.length).toEqual(1);

    // Contain Reference Number Input
    const refrenceNumberInput = wrapper.find('#referenceNumber').find('input');
    expect(refrenceNumberInput.length).toEqual(1);

    // Contain License Input
    const licenseInput = wrapper.find('#licence').find('input');
    expect(licenseInput.length).toEqual(1);

    // Contain Brand Input
    const brandInput = wrapper.find('#brand').find('input');
    expect(brandInput.length).toEqual(1);

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

    // Contain Email Input
    const emailInput = wrapper.find('#emailAdminUser').find('input');
    expect(emailInput.length).toEqual(1);

    // Contain Email Contact Input
    const emailContactInput = wrapper.find('#emailContact').find('input');
    expect(emailContactInput.length).toEqual(1);

    // Contain Phone Number Input
    const phoneNumberInput = wrapper.find('#phoneNumber').find('input');
    expect(phoneNumberInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    // Prepare
    const signupData = {
      type: 'CASINO',
      licenceAuthority: 'test',
      referenceNumber: '23423',
      licence: 'ezrzerzer',
      brand: 'Casino',
      address: {
        streetAddress: '12 rue des lilas',
        country: 'France',
        countryCode: 'FR',
        city: 'Antagnac',
        state: 'Seine Maritime',
        postalCode: '93000'
      },
      emailAdminUser: 'zerzer@mail.com',
      emailContact: 'ezzerez@gmail.com',
      phoneNumber: '+33 4 24 32 32 31'
    };

    // Populate Form
    // Fill Reference Number Input
    const refrenceNumberInput = wrapper.find('#referenceNumber').find('input');
    refrenceNumberInput.simulate('change', {
      target: { value: signupData.referenceNumber }
    });

    // Fill License Authority Input
    const licenceAuthorityInput = wrapper
      .find('#licenceAuthority')
      .find('input');
    licenceAuthorityInput.simulate('change', {
      target: { value: signupData.licenceAuthority }
    });

    // Fill License Input
    const licenseInput = wrapper.find('#licence').find('input');
    licenseInput.simulate('change', { target: { value: signupData.licence } });

    // Fill Brand Input
    const brandInput = wrapper.find('#brand').find('input');
    brandInput.simulate('change', { target: { value: signupData.brand } });

    // Fill Street Address Input
    const streetAddressInput = wrapper.find('#streetAddress').find('input');
    streetAddressInput.simulate('change', {
      target: { value: signupData.address.streetAddress }
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
      target: { value: signupData.address.state }
    });

    // Fill Post Code Input
    const postalCodeInput = wrapper.find('#postalCode').find('input');
    postalCodeInput.simulate('change', {
      target: { value: signupData.address.postalCode }
    });

    // Fill Email Input
    const emailInput = wrapper.find('#emailAdminUser').find('input');
    emailInput.simulate('change', {
      target: { value: signupData.emailAdminUser }
    });

    // Contain Email Contact Input
    const emailContactInput = wrapper.find('#emailContact').find('input');
    emailContactInput.simulate('change', {
      target: { value: signupData.emailContact }
    });

    // Fill Phone Number Input
    const phoneNumberInput = wrapper.find('#phoneNumber').find('input');
    phoneNumberInput.simulate('change', {
      target: { value: '+33424323231' }
    });

    // Submitting the form
    wrapper.find('form').simulate('submit');

    // Assert on submitting action
    expect(mockOnSignupfn).toBeCalledTimes(1);
    expect(mockOnSignupfn).toBeCalledWith(
      signupData,
      expect.anything(),
      expect.anything()
    );
  });
});
