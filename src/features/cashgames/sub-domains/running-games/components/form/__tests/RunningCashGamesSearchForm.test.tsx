import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../../../../test/redux';
import RunningCashGamesSearchForm from '../RunningCashGamesSearchForm';

describe('>>>Running Cash Games Search Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <RunningCashGamesSearchForm />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
