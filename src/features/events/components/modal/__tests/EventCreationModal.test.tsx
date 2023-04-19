import React from 'react';
import EventCreationModal from '../EventCreationModal';
import { mount } from 'enzyme';
import createStore from '../../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import EventsConstants from '../../../constants/EventsConstants';
import { submit } from 'redux-form';

describe('>>>Event Creation Modal ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>,
    wrapper: any,
    mockOnSubmitfn = jest.fn(),
    mockVisiblefn = jest.fn();
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <EventCreationModal
          visible={true}
          setVisible={mockVisiblefn}
          onSubmit={mockOnSubmitfn}
        />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    const eventData = {
      name: 'Event1',
      startDate: '2019-02-06T23:00:00.000Z',
      endDate: '2019-02-14T23:00:00.000Z'
    };

    // Populate Form
    // Fill Name Input
    const nameInput = wrapper.find('#name').find('input');
    nameInput.simulate('change', {
      target: { value: eventData.name }
    });

    // Fill StartDate Input
    const startDateInput = wrapper.find('#startDate').find(DatePicker);
    startDateInput.props().onChange(moment(eventData.startDate));

    // Fill EndDate Input
    const endDateInput = wrapper.find('#endDate').find(DatePicker);
    endDateInput.props().onChange(moment(eventData.endDate));

    // Submitting the form
    store.dispatch(submit(EventsConstants.FORM_EVENT_CREATION));

    // Assert on submitting action
    expect(mockOnSubmitfn).toBeCalledTimes(1);
    expect(mockOnSubmitfn).toBeCalledWith({
      name: eventData.name,
      startDate: moment(eventData.startDate),
      endDate: moment(eventData.endDate)
    });
    // Assert we close Modal
    expect(mockVisiblefn).toBeCalledTimes(1);
  });

  it('+++ With initial Values', () => {
    const eventData = {
      name: 'Event1',
      startDate: '2019-02-06T23:00:00.000Z',
      endDate: '2019-02-14T23:00:00.000Z'
    };

    wrapper = mount(
      <Provider store={store}>
        <EventCreationModal
          visible={true}
          setVisible={mockVisiblefn}
          onSubmit={mockOnSubmitfn}
          initialValues={eventData}
        />
      </Provider>
    );

    // Populate Form
    // Fill Name Input
    const nameInput = wrapper.find('#name').find('input');
    expect(nameInput.props().value).toBe(eventData.name);

    // Fill StartDate Input
    const startDateInput = wrapper.find('#startDate').find(DatePicker);
    expect(startDateInput.props().value).toEqual(moment(eventData.startDate));

    // Fill EndDate Input
    const endDateInput = wrapper.find('#endDate').find(DatePicker);
    expect(endDateInput.props().value).toEqual(moment(eventData.endDate));
  });
});
