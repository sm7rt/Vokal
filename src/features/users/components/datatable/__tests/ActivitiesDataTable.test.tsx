import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../../test/redux';
import ActivitiesDataTable from '../ActivitiesDataTable';
import { activities } from '../../../services/FixtureUserApi';

describe('>>>ActivitiesDataTable ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <ActivitiesDataTable
          defaultPageSize={10}
          data={activities}
          totalElements={3}
          fetchActivities={() => {}}
        />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ render behaviour of connected(SMART) component', () => {
    // TODO
    // Check All Method Trigger
  });
});
