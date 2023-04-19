import moment from 'moment';

// Fixture Image Event
const imageEvents = [
  {
    eventId: '213423',
    eventNumber: 12,
    image: {
      url: '',
      resizedUrl: ''
    }
  },
  {
    eventId: '423423',
    eventNumber: 15,
    image: {
      url:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/cards-1030852_1920.jpg',
      resizedUrl:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/cards-1030852_1920.jpg'
    }
  },
  {
    eventId: '978546',
    eventNumber: 13,
    image: {
      url:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/play-593207_1920.jpg',
      resizedUrl:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/play-593207_1920.jpg'
    }
  },
  {
    eventId: '213456',
    eventNumber: 26,
    image: {
      url: '',
      resizedUrl: ''
    }
  },
  {
    eventId: '213223',
    eventNumber: 0,
    image: {
      url:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/playing-cards-1201257_1920.jpg',
      resizedUrl:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/playing-cards-1201257_1920.jpg'
    }
  },
  {
    eventId: '213893',
    eventNumber: 34,
    image: {
      url:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/girl-1339685_1920.jpg',
      resizedUrl:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/girl-1339685_1920.jpg'
    }
  },
  {
    eventId: 1,
    eventNumber: 34,
    image: {
      url:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/girl-1339685_1920.jpg',
      resizedUrl:
        'https://flop-dev.s3-eu-west-1.amazonaws.com/PMS/festival/girl-1339685_1920.jpg'
    }
  }
];

// Export All Event FixtUre API
// Export Default
export default {
  /**
   * Fetch Running Events Method
   * @param {*} casinoId : The casino Id
   * @param {*} filters : The filters for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  fetchRunningEvents: (
    casinoId: string,
    filters: Object,
    page: number,
    size: number
  ) => {
    const festivalListResult = [
      {
        id: '213423',
        name: 'my tournament without picture',
        startDate: moment('2019-04-05', 'YYYY-MM-DD').format(),
        endDate: moment('2019-04-20', 'YYYY-MM-DD').format()
      },
      {
        id: '423423',
        name: 'my tournament without picture',
        startDate: moment('2019-04-05', 'YYYY-MM-DD').format(),
        endDate: moment('2019-04-20', 'YYYY-MM-DD').format()
      },
      {
        id: '978546',
        name: 'patrik antonius poker challenge tallinn',
        startDate: moment('2019-04-01', 'YYYY-MM-DD').format(),
        endDate: moment('2019-04-7', 'YYYY-MM-DD').format()
      },
      {
        id: '213456',
        name: 'world flop championship',
        startDate: moment('2019-07-01', 'YYYY-MM-DD').format(),
        endDate: moment('2019-07-7', 'YYYY-MM-DD').format()
      },
      {
        id: '213223',
        name: 'patrik antonius poker challenge malta',
        startDate: moment('2019-09-22', 'YYYY-MM-DD').format(),
        endDate: moment('2019-10-6', 'YYYY-MM-DD').format()
      },
      {
        id: '213893',
        name: 'patrik antonius poker challenge ladies event ...',
        startDate: moment('2019-04-01', 'YYYY-MM-DD').format(),
        endDate: moment('2019-04-7', 'YYYY-MM-DD').format()
      }
    ];
    return {
      status: 200,
      data: {
        content: festivalListResult,
        last: true
      }
    };
  },

  /**
   * Fetch Finished Events Method
   * @param {*} casinoId : The casino Id
   * @param {*} filters : The filters for the list
   * @param {*} page : The page to use
   * @param {*} size : The size of list
   */
  fetchFinishedEvents: (
    casinoId: string,
    filters: Object,
    page: number,
    size: number
  ) => {
    return {
      status: 200,
      data: {
        content: [],
        last: true
      }
    };
  },

  /**
   * Fetch Event Details with EventId
   * @param {*} eventId
   */
  fetchEventDetails: (eventId: string) => {
    return {
      status: 200,
      data: {
        id: 1,
        startDate: moment().format(),
        endDate: moment().format(),
        name: 'Mock Event'
      }
    };
  },

  /**
   * Fetch Event Banner with EventId
   * @param {*} eventId
   */
  fetchEventBanner: (eventId: string) => {
    return {
      status: 200,
      data: imageEvents.filter(i => i.eventId === eventId)[0].image
    };
  },

  /**
   * Fetch Event Tournament Number with EventId
   * @param {*} eventId
   */
  fetchEventTourNumber: (eventId: string) => {
    return {
      status: 200,
      data: imageEvents.filter(i => i.eventId === eventId)[0].eventNumber
    };
  },

  /**
   * Create a new festival
   * @param {*} casinoId The casino Id
   * @param {*} formData The formData for newly festival
   */
  createNewEvent: (casinoId: string, formData: Object) => {
    return {
      status: 201,
      data: '13254',
      headers: {
        location: 'http://blablable/eventId1'
      }
    };
  },

  /**
   * Edit a Event
   * @param {*} eventId
   * @param {*} formData
   */
  editEvent: (eventId: string, formData: Object) => {
    return {
      status: 200,
      data: {}
    };
  },

  /**
   * Delete Event by EventId
   * @param {*} eventId
   */
  deleteEvent: (eventId: string) => {
    return {
      status: 204,
      data: {}
    };
  },

  /**
   * Upload the Banner associated to festival
   * @param {*} eventId The festival Id
   * @param {*} imageData The Image Data
   */
  uploadBannerEvent: (eventId: string, imageData: Object) => {
    return {
      status: 201,
      data: 'bubu'
    };
  }
};
