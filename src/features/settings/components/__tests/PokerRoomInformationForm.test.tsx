import React from 'react';
import { Select } from 'antd';
import PokerRoomInformationForm from '../PokerRoomInformationForm';
import { mount } from 'enzyme';
import createStore from '../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import {
  wrapperMemoryRouter,
  wrapperReduxForm
} from '../../../../../test/util';
import {
  initialStateGlobal,
  initialStateParameters
} from '../../../../../test/redux/InitialState';
import { submit } from 'redux-form';
import SettingsConstants from '../../constants/SettingsConstants';

describe('>>>PokerRoomInformation Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any, mockonSubmit: any;

  beforeEach(() => {
    store = createStore({ ...initialStateGlobal, ...initialStateParameters })
      .store;
    mockonSubmit = jest.fn();
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          {wrapperReduxForm(
            { component: PokerRoomInformationForm },
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
    // Contain Pkr Currency Input
    const mainCurrencyInput = wrapper.find('#mainCurrency').find('input');
    expect(mainCurrencyInput.length).toEqual(1);

    // Contain Pkr Legal age Input
    const minimumAgeEntranceInput = wrapper
      .find('#minimumAgeEntrance')
      .find('input');
    expect(minimumAgeEntranceInput.length).toEqual(1);

    // Contain Pkr Dress Code Input
    const dressCodeInput = wrapper.find('#dressCode').find('input');
    expect(dressCodeInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    // Prepare
    const pokerRoomInformationData = {
      mainCurrency: 'USD',
      minimumAgeEntrance: 18,
      dressCode: 'Smart Casual'
    };

    // Populate Form

    // Fill Pkr Currency Input
    const mainCurrencyInput = wrapper.find('#mainCurrency').find(Select);
    mainCurrencyInput.props().onChange(pokerRoomInformationData.mainCurrency);

    // Fill Pkr Legal age Input
    const minimumAgeEntranceInput = wrapper
      .find('#minimumAgeEntrance')
      .find('input');
    minimumAgeEntranceInput.simulate('change', {
      target: { value: pokerRoomInformationData.minimumAgeEntrance.toString() }
    });

    // Fill Pkr Legal age Input
    const dressCodeInput = wrapper.find('#dressCode').find('input');
    dressCodeInput.simulate('change', {
      target: { value: pokerRoomInformationData.dressCode }
    });

    // Submitting the form
    store.dispatch(submit(SettingsConstants.FORM_SETTINGS));
  });
});
