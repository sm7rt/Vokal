import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import MessagesActions from '../../redux/MessagesRedux';
import FixtureMessagesApi from '../../services/FixtureMessagesApi';
import { fetchMessages, addMessage } from '../MessageSagas';

// Testing Message Middleware Success
test('fetchMessages Middleware Success', () => {
  const entityId = '156446645';
  const entityType = 'INTEREST_LIST';
  const page = 1;
  const size = 20;
  const Response = {
    status: 200,
    data: {
      content: [
        {
          id: '54455',
          author: 146,
          message:
            'I need support ! I can’t find a way to invite some of my friends to this game. Do they need to have the flop application installed for me to be able to invite them?',
          date: new Date()
        },
        {
          id: '54225',
          author: 122,
          message:
            'You need to tell your friends to download the app and add them to your crew to invite them to a game.',
          date: new Date()
        }
      ],
      last: true,
      totalElements: 21
    }
  };

  return expectSaga(fetchMessages, FixtureMessagesApi, {
    entityId,
    entityType,
    page,
    size
  })
    .provide([
      [matchers.call.fn(FixtureMessagesApi.fetchMessagesList), Response]
    ])
    .put(
      MessagesActions.fetchMessagesSuccessResponse(
        entityId,
        entityType,
        Response.data.content,
        {},
        page,
        Response.data.last,
        Response.data.totalElements,
        size
      )
    )

    .run();
});

// Testing Add Message Middleware Success
test('addMessage Middleware Success', () => {
  const entityId = '156446645';
  const entityType = 'INTEREST_LIST';
  const message = 'This is a message';
  const messageId = '132324';
  const Response = {
    status: 201,
    data: {},
    headers: {
      location: `https//blablabala/${messageId}`
    }
  };

  return expectSaga(addMessage, FixtureMessagesApi, {
    entityId,
    entityType,
    message
  })
    .provide([[matchers.call.fn(FixtureMessagesApi.addMessage), Response]])
    .put(
      MessagesActions.addMessageSuccessResponse(entityId, entityType, messageId)
    )
    .put(MessagesActions.fetchMessageRequest(entityId, entityType, messageId))
    .run();
});
