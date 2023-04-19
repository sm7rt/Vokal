import { put, delay } from 'redux-saga/effects';
import MessagesAction from '../redux/SystemMessagesRedux';

import { AnyAction } from 'redux';

/**
 * Wait a Timeout then remove the message
 * @param action
 */
export function* waitAndRemove(action: AnyAction) {
  const { id } = action;
  // Wait 5 Sec
  yield delay(3000);
  yield put(MessagesAction.removeMessage(id));
}
