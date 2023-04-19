import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../test/redux';
import EventList from '../EventsList';
import {
  initialStateGlobal,
  initialStateAuthent
} from '../../../../../test/redux/InitialState';
import { wrapperMemoryRouter } from '../../../../../test/util';

describe('>>>RunningEventsList ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;
  beforeEach(() => {
    store = createStore({ ...initialStateGlobal, ...initialStateAuthent })
      .store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <EventList type="RUNNING" />
        </Provider>
      )
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ render behabiour of connected(SMART) component', () => {
    // TODO
    // Check All Method Trigger
  });
});

describe('>>>FinishedEventsList ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;
  beforeEach(() => {
    store = createStore({ ...initialStateGlobal, ...initialStateAuthent })
      .store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <EventList type="FINISHED" />
        </Provider>
      )
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ render behabiour of connected(SMART) component', () => {
    // TODO
    // Check All Method Trigger
  });
});
