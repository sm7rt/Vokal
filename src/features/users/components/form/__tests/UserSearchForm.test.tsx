import React from 'react';
import UserSearchForm from '../UserSearchForm';
import { mount } from 'enzyme';
import createStore from '../../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { wrapperMemoryRouter } from '../../../../../../test/util';

describe('>>>UserSearchForm Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;

  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <UserSearchForm />
        </Provider>
      )
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
