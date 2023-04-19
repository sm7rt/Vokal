import React from 'react';
import CityAutocompleteField from '../CityAutocompleteField';
import { mount } from 'enzyme';
import createStore from '../../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { reduxForm } from 'redux-form';

describe('>>>CityAutoComplete Field ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;

  beforeEach(() => {
    store = createStore().store;
    const ReduxFormComponent = reduxForm({
      form: 'FORM_TEST'
    })(() => <CityAutocompleteField countryCode="FR" />);
    wrapper = mount(
      <Provider store={store}>
        <ReduxFormComponent />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
