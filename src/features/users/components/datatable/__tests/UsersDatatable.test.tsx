import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../../test/redux';
import { datas } from '../__stories/UsersDataTable.stories';
import UsersDataTable from '../UsersDataTable';

describe('>>>UsersDataTable ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <UsersDataTable
          datas={datas}
          totalElements={datas.length}
          onClickTournament={() => {}}
          onDelete={() => {}}
          onResendMail={() => {}}
          onChangePage={() => {}}
          owner={{ data: { role: 'ADMIN' } }}
        />
      </Provider>
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
