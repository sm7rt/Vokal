// Export All Cash Games FixtUre API
// Export Default
export default {
  /**
   * Fetch Game Messages entityId with interestListId
   * @param {*} interestListId
   */
  fetchMessagesList: (
    entityId: string,
    entityType: string,
    page: number,
    size: number
  ) => {
    return {
      status: 200,
      data: {
        content: [
          {
            id: '54455',
            authorId: 1096,
            content:
              'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
            date: new Date()
          },
          {
            id: '54225',
            content:
              'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
            date: new Date(),
            authorRepresentativeId: '342342'
          },
          {
            id: '54325',
            authorId: 1096,
            content: 'Thanks! You’re the best casino in the world!',
            date: new Date()
          },
          {
            id: '24455',
            authorId: 1096,
            content:
              'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
            date: new Date()
          },
          {
            id: '24225',
            content:
              'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
            date: new Date(),
            authorRepresentativeId: '342342'
          },
          {
            id: '24325',
            authorId: 1096,
            content: 'Thanks! You’re the best casino in the world!',
            date: new Date()
          },
          {
            id: '34455',
            authorId: 1096,
            content:
              'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
            date: new Date()
          },
          {
            id: '34225',
            content:
              'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
            date: new Date(),
            authorRepresentativeId: '342342'
          },
          {
            id: '34325',
            authorId: 1096,
            content: 'Thanks! You’re the best casino in the world!',
            date: new Date()
          },
          {
            id: '44455',
            authorId: 1096,
            content:
              'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
            date: new Date()
          },
          {
            id: '44225',
            content:
              'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
            date: new Date(),
            authorRepresentativeId: '342342'
          },
          {
            id: '44325',
            authorId: 1096,
            content: 'Thanks! You’re the best casino in the world!',
            date: new Date()
          }
        ],
        last: page === 3 ? true : false,
        totalElements: 12,
        page: 1
      }
    };
  },

  /**
   * Add Message
   */
  addMessage: (interestListId: string, data: Object) => {
    return {
      status: 201,
      data: {},
      headers: {
        location: 'https//blablabala/56412'
      }
    };
  },

  /**
   * Fetch Message Details
   */
  fetchMessageDetails: (messageId: string) => {
    return {
      status: 200,
      data: {
        id: messageId,
        content: 'Thanks! You’re the best casino in the world!',
        date: new Date()
      }
    };
  }
};
