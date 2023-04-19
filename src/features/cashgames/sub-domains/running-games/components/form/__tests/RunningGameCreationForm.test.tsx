import { Select } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { submit } from 'redux-form';
import createStore from '../../../../../../../../test/redux';
import RunningCashGamesConstants from '../../../constants/RunningCashGamesConstants';
import RunningGameCreationForm from '../RunningGameCreationForm';

describe('>>>Interest List Creation Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>,
    wrapper: any,
    mockOnSubmitfn = jest.fn();
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <RunningGameCreationForm
          onSubmit={mockOnSubmitfn}
          initialValues={{
            tables: [
              {
                tableId: 1,
                maxPlayers: 10
              }
            ]
          }}
        />
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
  });

  it('+++ When Submitting', () => {
    const eventData = {
      gameVariant: 'NLH',
      smallBlind: '1',
      bigBlind: 2
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

    // Submitting the form
    store.dispatch(submit(RunningCashGamesConstants.CREATE_RUNNING_GAME_FORM));

    // Assert on submitting action
    expect(mockOnSubmitfn).toBeCalledTimes(1);
    expect(mockOnSubmitfn).toBeCalledWith(
      {
        gameVariant: eventData.gameVariant,
        smallBlind: eventData.smallBlind,
        bigBlind: eventData.bigBlind,
        tables: [
          {
            tableId: 1,
            maxPlayers: 10
          }
        ]
      },
      expect.anything(),
      expect.anything()
    );
  });
});
