import React from 'react';
import EventCard from '../EventCard';
import { mount } from 'enzyme';
import createStore from '../../../../../test/redux';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Icon, Modal, Button, Popconfirm } from 'antd';

describe('>>>Event Card ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  let store: Store<any, any>,
    wrapper: any,
    mockOnOnClickCardfn: any,
    mockOnChangeBannerfn: any,
    mockOnEditfn: any,
    mockOnRemovefn: any,
    mockOnActiveCardfn: any;

  beforeEach(() => {
    store = createStore().store;
    // Mock functions
    mockOnOnClickCardfn = jest.fn();
    mockOnChangeBannerfn = jest.fn();
    mockOnEditfn = jest.fn();
    mockOnRemovefn = jest.fn();
    mockOnActiveCardfn = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <EventCard
          itemId="eventId2"
          onClickCard={mockOnOnClickCardfn}
          onChangeBanner={mockOnChangeBannerfn}
          onEdit={mockOnEditfn}
          onRemove={mockOnRemovefn}
          onActiveCard={mockOnActiveCardfn}
        />
      </Provider>
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ render behabiour of connected(SMART) component', () => {
    // Contain Event Name
    const eventName = wrapper
      .find('#metaCard-eventId2')
      .find('.ant-card-meta-title');
    expect(eventName.text()).toEqual('Very Long Nameeeeeeeeee with many test');

    // Contain Event Number
    const eventNumber = wrapper.find('#eventNumber-eventId2');
    expect(eventNumber.text()).toEqual('2 events');

    // Contain Date Range
    const dateRange = wrapper.find('#dateRange-eventId2');
    expect(dateRange.text()).toEqual('7th Jan -7th Mar 2019');
  });

  it('+++ Edit Card', () => {
    // Click on Edit Card
    const editCardButton = wrapper.find('#editCard-eventId2').find(Icon);

    editCardButton.simulate('click');

    // Change Event Name
    const newName = 'New Name';
    const nameInput = wrapper.find('#name').find('input');
    nameInput.simulate('change', {
      target: { value: newName }
    });

    // Click on Ok BUtton
    const okButton = wrapper.find('#confirmEditButton').find('button');
    okButton.simulate('click');

    expect(mockOnEditfn).toBeCalledTimes(1);
    expect(mockOnEditfn).toBeCalledWith('eventId2', {
      id: 'eventId2',
      endDate: '2019-03-07',
      eventNumber: 2,
      name: 'New Name',
      startDate: '2019-01-07'
    });
  });

  // it('+++ Edit Banner', () => {
  //   // Click on Edit Banner
  //   const editBannerButton = wrapper.find('#editBanner-eventId2').find(Icon);

  //   editBannerButton.simulate('click');

  //   // Click on Ok BUtton
  //   const okButton = wrapper
  //     .find(Modal)
  //     .find(Button)
  //     .at(1);
  //   okButton.simulate('click');

  //   // Banner Field is Required, So we expected no Call
  //   expect(mockOnEditfn).toBeCalledTimes(0);
  // });

  it('+++ Remove Card', () => {
    // Click on Remove Item
    const deleteCardButton = wrapper.find('#deleteCard-eventId2').find(Icon);

    deleteCardButton.simulate('click');

    //Get deleteConfirmButton
    const deleteConfirmButton = wrapper
      .find('#confirmDeleteButton')
      .find('button');

    deleteConfirmButton.simulate('click');

    expect(mockOnRemovefn).toBeCalledTimes(1);
    expect(mockOnRemovefn).toBeCalledWith('eventId2');
  });

  it('+++ Click on Card', () => {
    const imageCard = wrapper.find('#imageCard-eventId2');
    imageCard.simulate('click');

    expect(mockOnOnClickCardfn).toBeCalledTimes(1);
    expect(mockOnOnClickCardfn).toBeCalledWith('eventId2');
  });
});
