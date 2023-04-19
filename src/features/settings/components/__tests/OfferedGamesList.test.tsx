import { List, Select } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { submit } from 'redux-form';
import createStore from '../../../../../test/redux';
import {
  initialStateGlobal,
  initialStateSettings
} from '../../../../../test/redux/InitialState';
import { wrapperMemoryRouter } from '../../../../../test/util';
import SettingsActions from '../../redux/SettingsRedux';
import OfferedGamesList from '../OfferedGamesList';
import { SettingsContext } from '../../containers/SettingContext';

const ModalMock = (component: any, store: Store) => (
  <div>
    {component}
    <button
      id="confirmDeleteButton"
      onClick={() => store.dispatch(SettingsActions.removeGame(0))}
    />
  </div>
);

describe('>>>Offered Game List ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;

  it('+++ render the connected(SMART) component', () => {
    store = createStore().store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <SettingsContext.Provider value={() => {}}>
            <OfferedGamesList />
          </SettingsContext.Provider>
        </Provider>
      )
    );
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Add A Game', async done => {
    store = createStore().store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <SettingsContext.Provider value={() => {}}>
            <OfferedGamesList />
          </SettingsContext.Provider>
        </Provider>
      )
    );
    const variant = 'NLH';
    const smallBlind = '1';
    const bigBlind = '2';

    // Click on Add Button
    const addGameButton = wrapper.find('#addGameButton').find('button');
    addGameButton.simulate('click');

    // Fill Variant
    const variantInput = wrapper.find('#variant').find(Select);
    expect(variantInput).toBeDefined();
    variantInput.props().onChange(variant);

    // Fill SmallBlind
    const smallBlindInput = wrapper.find('#smallBlind').find('input');
    expect(smallBlindInput).toBeDefined();
    smallBlindInput.simulate('change', { target: { value: smallBlind } });

    // Fill BigBlind
    const bigBlindInput = wrapper.find('#bigBlind').find('input');
    expect(bigBlindInput).toBeDefined();
    bigBlindInput.simulate('change', { target: { value: bigBlind } });

    // Expecting Game added
    store.subscribe(() => {
      if (
        store.getState().settings.games.length > 0 &&
        store.getState().settings.games[0].variant
      ) {
        expect(store.getState().settings.games[0]).toEqual({
          variant,
          smallBlind,
          bigBlind,
          edited: false
        });
        done();
      }
    });

    // Submit Form with dispatch a Redux Form action
    // We Set TimeOut in order to subscribe store before submit
    store.dispatch(submit('OFFERED-GAME'));
  }, 10000);

  it('+++ Edit A Game', async done => {
    store = createStore({ ...initialStateGlobal, ...initialStateSettings })
      .store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <SettingsContext.Provider value={() => {}}>
            <OfferedGamesList />
          </SettingsContext.Provider>
        </Provider>
      )
    );

    // Check that there are Two Item in the list
    const items = wrapper.find(List.Item);
    expect(items.length).toEqual(2);

    // Edit first Line
    const editButton = items
      .at(0)
      .find('#editGameButton')
      .find('button');
    editButton.simulate('click');

    const expectedVariant = 'NLH';
    const newVariant = 'PLO';
    const expectedSmallBlind = 1;
    const expectedBigBlind = 2;

    // Fill Variant

    const variantInput = wrapper.find('#variant').find(Select);
    expect(variantInput).toBeDefined();
    expect(variantInput.props().value).toEqual(expectedVariant);

    // Change Variant
    variantInput.props().onChange(newVariant);

    // Fill SmallBlind
    const smallBlindInput = wrapper.find('#smallBlind').find('input');
    expect(smallBlindInput).toBeDefined();
    expect(smallBlindInput.props().value).toEqual(expectedSmallBlind);

    // Fill BigBlind
    const bigBlindInput = wrapper.find('#bigBlind').find('input');
    expect(bigBlindInput).toBeDefined();
    expect(bigBlindInput.props().value).toEqual(expectedBigBlind);

    // Expecting Game added
    store.subscribe(() => {
      if (store.getState().settings.games[1].variant === 'PLO') {
        expect(store.getState().settings.games[1]).toEqual({
          variant: newVariant,
          smallBlind: expectedSmallBlind,
          bigBlind: expectedBigBlind,
          edited: false
        });
        done();
      }
    });

    // Submit Form with dispatch a Redux Form action
    // We Set TimeOut in order to subscribe store before submit
    store.dispatch(submit('OFFERED-GAME'));
  }, 10000);

  it('+++ Delete A Game', async done => {
    store = createStore({ ...initialStateGlobal, ...initialStateSettings })
      .store;
    wrapper = mount(
      ModalMock(
        wrapperMemoryRouter(
          <Provider store={store}>
            <OfferedGamesList />
          </Provider>
        ),
        store
      )
    );

    // Expecting Game added
    store.subscribe(() => {
      if (store.getState().settings.games.length === 1) {
        expect(store.getState().settings.games.length).toEqual(1);
        done();
      }
    });

    // Check that there are Two Item in the list
    const items = wrapper.find(List.Item);
    expect(items.length).toEqual(2);

    // Delete first Line
    const deleteButton = items
      .at(0)
      .find('#deleteGameButton')
      .find('button');
    deleteButton.simulate('click');

    // Find Modal Confirm button (Use Mock because Modal is outside current wrapper)
    const modalOkButton = wrapper.find('#confirmDeleteButton');
    // We Set TimeOut in order to subscribe store before click
    modalOkButton.simulate('click');
  }, 10000);
});
