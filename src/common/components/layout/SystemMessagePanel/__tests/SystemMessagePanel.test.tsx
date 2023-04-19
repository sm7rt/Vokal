import React from 'react';
import MessagePanel from '../SystemMessagePanel';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { wrapperMemoryRouter } from '../../../../../../test/util';
import createStore from '../../../../../../test/redux';

describe('>>>Main Navbar ---Dumb Component', () => {
  let store: Store<any, any>, wrapper: any;

  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <MessagePanel />
        </Provider>
      )
    );
  });

  it('+++ render the component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
