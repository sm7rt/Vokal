import { mount } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../../../../test/redux';
import TournamentsConstants from '../../../constants/TournamentsConstants';
import { datas } from '../__stories/TournamentDataTable.stories';
import TournamentDataTable from '../TournamentDataTable';

describe('>>>TournamentDataTable ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <TournamentDataTable
          datas={datas}
          totalElements={datas.length}
          onClickTournament={() => {}}
          onDelete={() => {}}
          onChangePage={() => {}}
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
