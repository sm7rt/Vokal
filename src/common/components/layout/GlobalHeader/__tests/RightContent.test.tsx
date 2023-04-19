import React from 'react';
import RightContent from '../RightContent';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { wrapperMemoryRouter } from '../../../../../../test/util';
import createStore from '../../../../../../test/redux';
import {
  initialStateGlobal,
  initialStateAuthent
} from '../../../../../../test/redux/InitialState';

describe('>>>User Actions ---Dumb Component', () => {
  let store: Store<any, any>, wrapper: any;

  beforeEach(() => {
    store = createStore({ ...initialStateGlobal, ...initialStateAuthent })
      .store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RightContent />
        </Provider>
      )
    );
  });

  it('+++ render the component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
