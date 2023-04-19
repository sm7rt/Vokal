import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../../../../test/redux';
import {
  initialStateGlobal,
  initialStateParameters
} from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import { Store } from 'redux';
import AuthenticationRoutes from '../AuthenticationRoutes';
import { AutoComplete, Select } from 'antd';
import MockCountries from '../../../../common/services/mock/MockCountries';
import MockCities from '../../../../common/services/mock/MockCities';

// Set the correct location
const initialPageSignup = {
  router: {
    location: {
      pathname: '/auth/account',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>Signup Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  beforeEach(() => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialPageSignup,
      ...initialStateParameters
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<AuthenticationRoutes />, history)}
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ check Signup Redirection ', async done => {
    // Prepare
    const signupData = {
      type: 'CASINO',
      licenceAuthority: 'test',
      referenceNumber: '23423',
      license: 'ezrzerzer',
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

    // Expecting Signup Succeed and redirect to SignupSucceed
    store.subscribe(() => {
      if (
        store.getState().router.location.pathname ==
        '/auth/account/zerzer@mail.com/email_check'
      ) {
        done();
      }
    });

    // Populate Form
    // Fill License Autority Input
    const licenceAuthorityInput = wrapper
      .find('#licenceAuthority')
      .find('input');
    licenceAuthorityInput.simulate('change', {
      target: { value: signupData.licenceAuthority }
    });

    // Fill Reference Number Input
    const refrenceNumberInput = wrapper.find('#referenceNumber').find('input');
    refrenceNumberInput.simulate('change', {
      target: { value: signupData.referenceNumber }
    });

    // Fill License Input
    const licenseInput = wrapper.find('#licence').find('input');
    licenseInput.simulate('change', { target: { value: signupData.license } });

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
  }, 10000);
});
