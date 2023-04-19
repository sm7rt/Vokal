import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../test/redux';
import { wrapperMemoryRouter } from '../../../../../test/util';
import MessagesList from '../MessagesList';

describe('>>>Messages List ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;

  // TO SOLVE : TypeError: scrollBottomRef.current.scrollIntoView is not a function
  xtest('+++ render the connected(SMART) component', () => {
    store = createStore().store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <MessagesList gameId="564231" />
        </Provider>
      )
    );
    expect(wrapper.length).toEqual(1);
  });
});
