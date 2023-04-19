import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Immutable from 'seamless-immutable';
import createStore from '../../../../../../../test/redux';
import { wrapperMemoryRouter } from '../../../../../../../test/util';
import InterestList from '../InterestList';
import {
  initialStateGlobal,
  initialStateAuthent,
  initialStateCasinos
} from '../../../../../../../test/redux/InitialState';
import { DatePicker, TimePicker, Select } from 'antd';
import moment from 'moment';
import InterestListCreationModal from '../modal/InterestListCreationModal';

describe('>>>Interest List ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>, wrapper: any;

  it('+++ render the connected(SMART) component', () => {
    store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos
    }).store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <InterestList />
        </Provider>
      )
    );
    expect(wrapper.length).toEqual(1);
  });

  it('+++ FLOP Games : Accept  an interest list', async done => {
    store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos
    }).store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <InterestList />
        </Provider>
      )
    );

    // Validate state of Game 231478 Change
    store.subscribe(() => {
      if (
        store
          .getState()
          .cashgames.interestList.list.find((il: any) => il.id === '231478')
          .state === 'ACCEPTED'
      ) {
        done();
      }
    });

    // Select Accept Button (Game 231478 is the first return by FixtureInterestListApi)
    const acceptButton = wrapper.find('#acceptGame-231478').find('button');
    acceptButton.simulate('click');
  });

  it('+++ FLOP Games : Decline an interest list', async done => {
    store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos
    }).store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <InterestList />
        </Provider>
      )
    );

    // Validate state of Game 231478 Change
    store.subscribe(() => {
      if (
        store
          .getState()
          .cashgames.interestList.list.find((il: any) => il.id === '231478')
          .state === 'DECLINED'
      ) {
        done();
      }
    });

    // Select Decline Button (Game 231478 is the first return by FixtureInterestListApi)
    const declineButton = wrapper.find('#declineGame-231478').find('button');
    declineButton.simulate('click');

    // Confirm Decline
    const confirmDeclineButton = wrapper
      .find('#confirmDeclineGame-231478')
      .find('button');
    confirmDeclineButton.simulate('click');
  });

  const stateCasinoCashGame = {
    cashgames: Immutable({
      interestList: Immutable({
        list: [
          {
            id: '564231',
            state: 'PENDING',
            date: '2019-08-08T08:18:00.73',
            gameSize: '10/20',
            gameVariant: 'NLH',
            playersNumber: 5,
            messagesNumber: 5,
            fees: '50 $'
          }
        ],
        displayList: {
          listIds: [],
          page: 1,
          last: false,
          size: 10,
          totalElements: 0,
          filters: {
            gameOrigin: 'CASINO'
          }
        }
      })
    })
  };

  it('+++ Casino Games : Create Interest List', async done => {
    store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...stateCasinoCashGame
    }).store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <InterestList />
        </Provider>
      )
    );

    // Validate new interest list was added
    store.subscribe(() => {
      if (
        store.getState().cashgames.interestList.displayList.listIds.length === 5
      ) {
        done();
      }
    });

    // Open InterestListCreationModal
    const interestListCreationButton = wrapper
      .find('#interestlist-creation-button')
      .find('button');
    interestListCreationButton.simulate('click');

    // FIll Field
    const eventData = {
      gameVariant: 'NLH',
      smallBlind: '1',
      bigBlind: 2,
      startingDate: '2019-02-06T23:00:00.000Z',
      startingTime: '2019-02-14T23:30:00.000Z'
    };

    // Populate Form
    // Fill Game Variant Input
    const gameVariantInput = wrapper.find('#gameVariant').find(Select);
    gameVariantInput.props().onChange(eventData.gameVariant);

    // Fill Small Blind Input
    const smallBlindInput = wrapper.find('#smallBlind').find('input');
    smallBlindInput.simulate('change', {
      target: { value: eventData.smallBlind }
    });

    // Fill Big Blind Input
    const bigBlindInput = wrapper.find('#bigBlind').find('input');
    bigBlindInput.simulate('change', {
      target: { value: eventData.bigBlind }
    });

    // Fill StartDate Input
    const startingDateInput = wrapper.find('#startingDate').find(DatePicker);
    startingDateInput.props().onChange(moment(eventData.startingDate));

    // Fill EndDate Input
    const startingTimeInput = wrapper.find('#startingTime').find(TimePicker);
    startingTimeInput.props().onChange(moment(eventData.startingTime));

    // Get Create Button From MOdal
    const interestListCreationModal = wrapper.find(InterestListCreationModal);

    const createButton = interestListCreationModal
      .find('.ant-modal-footer')
      .find('Button')
      .at(1);
    createButton.simulate('click');
  }, 20000);

  // Wait Service is ok to reenable this test
  xtest('+++ Casino Games : Delete an interest list', async done => {
    store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...stateCasinoCashGame
    }).store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <InterestList />
        </Provider>
      )
    );

    // Validate state of Game 231478 Change
    store.subscribe(() => {
      if (
        !store
          .getState()
          .cashgames.interestList.list.find((il: any) => il.id === '231478')
      ) {
        done();
      }
    });

    // We wait all services are called
    // Select Cancel Button (Game 231478 is the first return by FixtureInterestListApi)
    const cancelButton = wrapper.find('#cancelGame-231478').find('button');
    cancelButton.simulate('click');

    // Confirm Cancel
    const confirmCancelButton = wrapper
      .find('#confirmCancelGame-231478')
      .find('button');
    confirmCancelButton.simulate('click');
  });

  it('+++ Start an interest list', async done => {
    store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos
    }).store;
    wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <InterestList />
        </Provider>
      )
    );

    // Validate state of Game 231478 Change
    store.subscribe(() => {
      // Check the good redirection
      if (store.getState().cashgames.layout.currentTab === 'running') {
        done();
      }
    });

    // We wait all services are called
    // Select Start Button (Game 546978 is a game with status "ACCEPTED" return by FixtureInterestListApi)
    const startButton = wrapper.find('#startGame-546978').find('button');
    startButton.simulate('click');

    // Click on Manage Player
    const managePlayersButton = wrapper.find('#managePlayer-1').find('button');
    managePlayersButton.simulate('click');

    // Check Correct Number of player Available
    expect(wrapper.find('Memo(PlayerItem)').length).toEqual(3);
    // Need to have 10 Seats on the table
    expect(wrapper.find('Memo(SeatedPlayerItem)').length).toEqual(10);

    // Sit 3 players
    wrapper
      .find('#sitPlayer-10')
      .find('button')
      .simulate('click');
    wrapper
      .find('#sitPlayer-19')
      .find('button')
      .simulate('click');
    wrapper
      .find('#sitPlayer-17')
      .find('button')
      .simulate('click');

    // Assert Players Sit
    expect(
      wrapper
        .find('Memo(SeatedPlayerItem)')
        .at(0)
        .find('Memo(PlayerItem)').length
    ).toEqual(1);
    expect(
      wrapper
        .find('Memo(SeatedPlayerItem)')
        .at(1)
        .find('Memo(PlayerItem)').length
    ).toEqual(1);
    expect(
      wrapper
        .find('Memo(SeatedPlayerItem)')
        .at(2)
        .find('Memo(PlayerItem)').length
    ).toEqual(1);
    // Nobody on seat 4
    expect(
      wrapper
        .find('Memo(SeatedPlayerItem)')
        .at(3)
        .find('Memo(PlayerItem)').length
    ).toEqual(0);

    // Remove one player
    wrapper
      .find('Memo(SeatedPlayerItem)')
      .at(0)
      .find('#removePlayer-undefined')
      .find('button')
      .simulate('click');

    // Assert Players Sit
    expect(
      wrapper
        .find('Memo(SeatedPlayerItem)')
        .at(0)
        .find('Memo(PlayerItem)').length
    ).toEqual(1);
    expect(
      wrapper
        .find('Memo(SeatedPlayerItem)')
        .at(1)
        .find('Memo(PlayerItem)').length
    ).toEqual(1);
    // Nobody on seat 3
    expect(
      wrapper
        .find('Memo(SeatedPlayerItem)')
        .at(2)
        .find('Memo(PlayerItem)').length
    ).toEqual(0);

    // Validate Manage Players
    wrapper
      .find('#validatePlayersButton')
      .find('button')
      .simulate('click');

    // Confirm Start The Game
    wrapper
      .find('#startGameButton')
      .find('button')
      .simulate('click');
  });
});
