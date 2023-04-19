import React from 'react';
import { mount } from 'enzyme';
import createStore from '../../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import CountryAutocompleteField from '../CountryAutocompleteField';
import { reduxForm } from 'redux-form';

describe('>>>CountryAutocompleteField ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;

  beforeEach(() => {
    store = createStore().store;
    const ReduxFormComponent = reduxForm({
      form: 'FORM_TEST'
    })(() => <CountryAutocompleteField />);
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
