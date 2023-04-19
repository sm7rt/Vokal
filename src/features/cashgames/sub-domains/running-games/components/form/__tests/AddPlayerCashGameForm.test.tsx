import { Select } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { submit } from 'redux-form';
import createStore from '../../../../../../../../test/redux';
import RunningCashGamesConstants from '../../../constants/RunningCashGamesConstants';
import AddPlayerCashGameForm from '../AddPlayerCashGameForm';

describe('>>>Add Player Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>,
    wrapper: any,
    mockOnSubmitfn = jest.fn();
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <AddPlayerCashGameForm onSubmit={mockOnSubmitfn} />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ render behabiour of connected(SMART) component', () => {
    // Contain name Input
    const nameInput = wrapper.find('#name').find('input');
    expect(nameInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    const eventData = {
      name: 'Jojo'
    };

    // Populate Form

    // Fill Player Name Input
    const nameInput = wrapper.find('#name').find('input');
    nameInput.simulate('change', {
      target: { value: eventData.name }
    });

    // Submitting the form
    store.dispatch(submit(RunningCashGamesConstants.ADD_PLAYER_FORM));

    // Assert on submitting action
    expect(mockOnSubmitfn).toBeCalledTimes(1);
    expect(mockOnSubmitfn).toBeCalledWith(
      eventData,
      expect.anything(),
      expect.anything()
    );
  });
});
