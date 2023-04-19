import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import moment from 'moment';
import { DatePicker } from 'antd';
import EventCard from '../../components/EventCard';
import createStore from '../../../../../test/redux';
import {
  initialStateAuthent,
  initialStateGlobal,
  initialStateParameters
} from '../../../../../test/redux/InitialState';
import { wrapperConnectedRouter } from '../../../../../test/util';
import EventsRoutes from '../EventsRoutes';

// Set the correct location
const initialPageSpecialEvent = {
  router: {
    location: {
      pathname: '/admin/events/managment',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

describe('>>>Events Page ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store, wrapper: any, history: any;

  let eventCardsNumber = 0;
  let eventCardId = '';
  it('+++ render the connected(SMART) component', () => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateParameters,
      ...initialPageSpecialEvent
    });
    store = data.store;
    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<EventsRoutes />, history)}
      </Provider>
    );
    expect(wrapper.length).toEqual(1);
  });

  it('+++ verify that new special event is created', async done => {
    const data = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateParameters,
      ...initialPageSpecialEvent
    });
    store = data.store;

    let PATH = '';
    let STORE = {};
    store.subscribe(() => {
      STORE = store.getState();
      PATH = STORE.router.location.pathname;

      if (eventCardsNumber === 7) {
        if (STORE.events.list.length === 9) {
          done();
        }
      }
    });

    history = data.history;
    wrapper = mount(
      <Provider store={store}>
        {wrapperConnectedRouter(<EventsRoutes />, history)}
      </Provider>
    );

    // * We check that the Path i correct
    expect(PATH).toEqual('/admin/events/managment');

    const createButton = wrapper.find('#button-create-event').first();
    let eventCards = wrapper.find(EventCard);
    eventCardsNumber = eventCards.length;
    // * We expect a total of 6 events before the creation
    expect(eventCardsNumber).toEqual(6);
    // expect(modal.visible).toEqual(undefined);

    createButton.simulate('click');
    const modal = wrapper
      .find('EventCreationModal')
      .findWhere((node: any) => node.props().visible === true)
      .first();

    const eventData = {
      name: 'Event1',
      startDate: '2020-02-06T23:00:00.000Z',
      endDate: '2020-02-14T23:00:00.000Z'
    };

    // Populate Form
    // Fill Name Input
    const nameInput = modal.find('#name').find('input');
    nameInput.simulate('change', {
      target: { value: eventData.name }
    });

    // Fill StartDate Input
    const startDateInput = modal.find('#startDate').find(DatePicker);
    startDateInput.props().onChange(moment(eventData.startDate));

    // Fill EndDate Input
    const endDateInput = modal.find('#endDate').find(DatePicker);
    endDateInput.props().onChange(moment(eventData.endDate));

    // * Get create button in order to submit the form
    const buttonCreate = modal.find('button').at(2);

    // * Submit form
    buttonCreate.simulate('click');

    eventCards = wrapper.find(EventCard);

    eventCardId = eventCards.at(6).props().itemId;
    eventCardsNumber = eventCards.length;
  });
});
