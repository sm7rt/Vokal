import { takeEvery, takeLatest } from 'redux-saga/effects';
/* ------------- Types ------------- */
import { MessagesTypes } from '../redux/MessagesRedux';
import FixtureMessagesApi from '../services/FixtureMessagesApi';
import MessagesApi from '../services/MessagesApi';
import {
  addMessage,
  fetchMessage,
  fetchMessages,
  fetchMessagesNumber
} from './MessageSagas';
import DebugConfig from '../../../config/DebugConfig';

/* ------------- Sagas ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureMessagesApi : MessagesApi.create();

// List of Sagas Handler
const interestListSagas = [
  takeEvery(MessagesTypes.FETCH_MESSAGE_REQUEST, fetchMessage, api),
  takeEvery(MessagesTypes.FETCH_MESSAGES_REQUEST, fetchMessages, api),
  takeLatest(MessagesTypes.ADD_MESSAGE_REQUEST, addMessage, api),
  takeEvery(
    MessagesTypes.FETCH_MESSAGES_COUNT_REQUEST,
    fetchMessagesNumber,
    api
  )
];

// Export Default
export default interestListSagas;
