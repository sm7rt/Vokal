import React from 'react';
import EventCreationForm from '../EventCreationForm';
import { mount } from 'enzyme';
import createStore from '../../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import EventsConstants from '../../../constants/EventsConstants';
import { submit } from 'redux-form';

describe('>>>Event Creation Form ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>,
    wrapper: any,
    mockOnSubmitfn = jest.fn();
  beforeEach(() => {
    store = createStore().store;
    wrapper = mount(
      <Provider store={store}>
        <EventCreationForm
          onSubmit={mockOnSubmitfn}
          form={EventsConstants.FORM_EVENT_CREATION}
        />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ render behabiour of connected(SMART) component', () => {
    // Contain Name Input
    const nameInput = wrapper.find('#name').find('input');
    expect(nameInput.length).toEqual(1);

    // Contain Start Date Input
    const startDateInput = wrapper.find('#startDate').find(DatePicker);
    expect(startDateInput.length).toEqual(1);

    // Contain End Date Input
    const endDateInput = wrapper.find('#endDate').find(DatePicker);
    expect(endDateInput.length).toEqual(1);

    // Contain website Input
    const websiteInput = wrapper.find('#website').find('input');
    expect(websiteInput.length).toEqual(1);

    // Contain Banner Input
    const bannerInput = wrapper.find('#banner').find('input');
    expect(bannerInput.length).toEqual(1);
  });

  it('+++ When Submitting', () => {
    const eventData = {
      name: 'Event1',
      website: 'http://www.unsite.ninja',
      startDate: '2019-02-06T23:00:00.000Z',
      endDate: '2019-02-14T23:00:00.000Z'
    };

    // Populate Form
    // Fill Name Input
    const nameInput = wrapper.find('#name').find('input');
    nameInput.simulate('change', {
      target: { value: eventData.name }
    });

    // Fill Website Input
    const websiteInput = wrapper.find('#website').find('input');
    websiteInput.simulate('change', {
      target: { value: eventData.website }
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
    expect(mockOnSubmitfn).toBeCalledWith(
      {
        name: eventData.name,
        website: eventData.website,
        startDate: moment(eventData.startDate),
        endDate: moment(eventData.endDate)
      },
      expect.anything(),
      expect.anything()
    );
  });
});
