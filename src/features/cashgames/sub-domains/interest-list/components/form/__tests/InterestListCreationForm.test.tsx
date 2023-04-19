import React from 'react';
import { mount } from 'enzyme';
import createStore from '../../../../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { DatePicker, TimePicker, Select } from 'antd';
import moment from 'moment';
import { submit } from 'redux-form';
import InterestListCreationForm from '../InterestListCreationForm';
import CashGamesConstants from '../../../constants/InterestListConstants';

describe('>>>Interest List Creation Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>,
    wrapper: any,
    mockOnSubmitfn = jest.fn();
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <InterestListCreationForm onSubmit={mockOnSubmitfn} />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ render behabiour of connected(SMART) component', () => {
    // Contain gameVariant Input
    const gameVariantInput = wrapper.find('#gameVariant').find(Select);
    expect(gameVariantInput.length).toEqual(1);

    // Contain smallBlind Input
    const smallBlindInput = wrapper.find('#smallBlind').find('input');
    expect(smallBlindInput.length).toEqual(1);

    // Contain bigBlind Input
    const bigBlindInput = wrapper.find('#bigBlind').find('input');
    expect(bigBlindInput.length).toEqual(1);

    // Contain startingDate Input
    const startingDateInput = wrapper.find('#startingDate').find(DatePicker);
    expect(startingDateInput.length).toEqual(1);

    // Contain startingTime Input
    const startingTimeInput = wrapper.find('#startingTime').find(TimePicker);
    expect(startingTimeInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    const eventData = {
      gameVariant: 'NLH',
      smallBlind: '1',
      bigBlind: 2,
      startingDate: '2019-02-06T23:00:00.000Z',
      startingTime: '2019-02-14T23:30:00.000Z'
    };

    // Populate Form
    // Fill Game Variant Input
    const gameVariantInput = wrapper.find('#gameVariant').find(Select);
    gameVariantInput.props().onChange(eventData.gameVariant);

    // Fill Small Blind Input
    const smallBlindInput = wrapper.find('#smallBlind').find('input');
    smallBlindInput.simulate('change', {
      target: { value: eventData.smallBlind }
    });

    // Fill Big Blind Input
    const bigBlindInput = wrapper.find('#bigBlind').find('input');
    bigBlindInput.simulate('change', {
      target: { value: eventData.bigBlind }
    });

    // Fill StartDate Input
    const startingDateInput = wrapper.find('#startingDate').find(DatePicker);
    startingDateInput.props().onChange(moment(eventData.startingDate));

    // Fill EndDate Input
    const startingTimeInput = wrapper.find('#startingTime').find(TimePicker);
    startingTimeInput.props().onChange(moment(eventData.startingTime));

    // Submitting the form
    store.dispatch(submit(CashGamesConstants.INTEREST_LIST_CREATION_FORM));

    // Assert on submitting action
    expect(mockOnSubmitfn).toBeCalledTimes(1);
    expect(mockOnSubmitfn).toBeCalledWith(
      {
        gameVariant: eventData.gameVariant,
        smallBlind: eventData.smallBlind,
        bigBlind: eventData.bigBlind,
        startingDate: moment(eventData.startingDate),
        startingTime: moment(eventData.startingTime)
      },
      expect.anything(),
      expect.anything()
    );
  });
});
