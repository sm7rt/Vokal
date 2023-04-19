import { AnyAction } from 'redux';
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {
  generateFetchAction,
  generateFetchPageableAction
} from '../../../redux/util';
import {
  EntityType,
  IMessageImmutableState,
  IMessageState
} from '../models/MessagesModel';
import { IRootState } from '../../../common/models/StateModel';
import { createImmutableEqualSelector } from '../../../redux/selector/custom-selector';

/* ------------- Types and Action Creators ------------- */

/**
 * Define Actions of Reducer
 */
const { Types, Creators } = createActions({
  ...generateFetchAction(
    'addMessage',
    ['entityId', 'entityType', 'message'],
    ['entityId', 'entityType', 'messageId']
  ),
  ...generateFetchPageableAction(
    'fetchMessages',
    ['entityId', 'entityType'],
    ['entityId', 'entityType']
  ),
  ...generateFetchAction(
    'fetchMessage',
    ['entityId', 'entityType', 'id'],
    ['entityId', 'entityType', 'id', 'data']
  ),
  ...generateFetchAction(
    'fetchMessagesCount',
    ['entityId', 'entityType'],
    ['entityId', 'entityType', 'messagesNumber']
  )
});

export const MessagesTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */
//@ts-ignore
export const INITIAL_STATE: IMessageImmutableState = Immutable([]);

/* ------------- Reducers ------------- */
/**
 * Find Index Table
 */
const findEntityByIdAndType = (
  state: any,
  entityId: string,
  entityType: EntityType
) => {
  // Find table
  return state.findIndex(
    (e: IMessageState) => e.entityId === entityId && e.entityType === entityType
  );
};
/**
 * Add a message to the list Reducer
 */
export const addMessagesToList = (
  state: IMessageImmutableState,
  { entityId, entityType, data, page, last, size, totalElements }: AnyAction
) => {
  const indexOfList = findEntityByIdAndType(state, entityId, entityType);

  if (indexOfList === -1) {
    const newMessageTree = {
      entityId,
      entityType,
      list: data,
      page: page + 1,
      last,
      size,
      totalElements
    };

    return Immutable([...state, newMessageTree]);
  }

  if (page === 1) {
    return state.setIn([indexOfList], {
      entityId,
      entityType,
      list: data,
      page: page + 1,
      last,
      size,
      totalElements
    });
  }
  return state.setIn([indexOfList], {
    entityId,
    entityType,
    list: state[indexOfList].list.concat(data),
    page: page + 1,
    last,
    size,
    totalElements
  });
};

/**
 * Add a Message To Interest List
 */
export const addNewMessageReducer = (
  state: IMessageImmutableState,
  { entityId, entityType, messageId }: AnyAction
) => {
  const indexOfList = findEntityByIdAndType(state, entityId, entityType);
  // If Cash Game exist we replace it
  if (indexOfList !== -1) {
    // Else we add it
    return state
      .setIn(
        [indexOfList, 'list'],
        [
          {
            id: messageId
          },
          ...state[indexOfList].list
        ]
      )
      .setIn(
        [indexOfList, 'totalElements'],
        state[indexOfList].totalElements + 1
      );
  }
};

/**
 * Add a Message To Interest List
 */
export const addMessageToInterestList = (
  state: IMessageImmutableState,
  { entityId, entityType, id, data }: AnyAction
) => {
  const indexOfList = findEntityByIdAndType(state, entityId, entityType);
  // If Cash Game exist we replace it
  if (indexOfList !== -1) {
    const indexOfMessageList = state[indexOfList].list.findIndex(
      (message: any) => message.id === id
    );

    if (indexOfMessageList !== -1) {
      // Keep Players Number and Comments Number
      return state.setIn([indexOfList, 'list', indexOfMessageList], {
        id,
        ...data
      });
    } else {
      // Else we add it
      return state.setIn(
        [indexOfList, 'list'],
        [
          ...state[indexOfList].list,
          {
            id,
            ...data
          }
        ]
      );
    }
  }
};

/**
 * Fill Messages Number
 */
export const fillMessagesNumber = (
  state: IMessageImmutableState = INITIAL_STATE,
  { entityId, entityType, messagesNumber }: AnyAction
) => {
  const indexOfList = findEntityByIdAndType(state, entityId, entityType);
  if (indexOfList !== -1) {
    return state.setIn([indexOfList, 'totalElements'], messagesNumber);
  }

  const newMessageTree = {
    entityId,
    entityType,
    list: [],
    page: 1,
    last: false,
    size: 20,
    totalElements: messagesNumber
  };
  return Immutable([...state, newMessageTree]);
};

/* ------------- Hookup Reducers To Types ------------- */
/**
 * Messages Handler
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_MESSAGES_SUCCESS_RESPONSE]: addMessagesToList,
  [Types.ADD_MESSAGE_SUCCESS_RESPONSE]: addNewMessageReducer,
  [Types.FETCH_MESSAGE_SUCCESS_RESPONSE]: addMessageToInterestList,
  [Types.FETCH_MESSAGES_COUNT_SUCCESS_RESPONSE]: fillMessagesNumber
});

/* ------------- Selectors ------------- */
const messagesByEntityIdAndEntityType = (
  state: IRootState,
  entityId: string,
  entityType: EntityType
) =>
  state.messages.find(
    (m: IMessageState) => m.entityId === entityId && m.entityType === entityType
  );

export const messagesListSelector = () =>
  createImmutableEqualSelector(
    [messagesByEntityIdAndEntityType],
    messages => messages
  );
