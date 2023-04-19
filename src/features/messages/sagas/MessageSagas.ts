import { AnyAction } from 'redux';
import { all, call, cancelled, put } from 'redux-saga/effects';
import { getHeaderId } from '../../../utils/LocationUtils';
import PlayersActions from '../../players/redux/PlayersRedux';
import { MessagesServiceType, EntityType } from '../models/MessagesModel';
import MessagesActions from '../redux/MessagesRedux';

const getServiceEntityType = (entityType: EntityType) => {
  if (entityType === 'INTEREST_LIST') {
    return 'GAME';
  }
  return '';
};

/**
 * Fetch  Message
 * @param {*} api Api to use
 */
// Not Used actually
export function* fetchMessage(api: MessagesServiceType, action: AnyAction) {
  const { entityId, entityType, id } = action;

  // API Call
  const fetchMessageResponse = yield call(api.fetchMessageDetails, id);
  if (fetchMessageResponse.status === 200) {
    // Load Author profile
    if (!fetchMessageResponse.data.authorRepresentativeId) {
      yield put(
        PlayersActions.fetchPlayerRequest(fetchMessageResponse.data.authorId)
      );
    }

    yield put(
      MessagesActions.fetchMessageSuccessResponse(
        entityId,
        entityType,
        id,
        fetchMessageResponse.data
      )
    );
  } else {
    MessagesActions.fetchMessageFailureResponse();
  }
}

/**
 * Get Messages Number
 * @param {*} api Api to use
 * @param {*} interestListId Id of Events
 */
export function* fetchMessagesNumber(
  api: MessagesServiceType,
  action: AnyAction
) {
  const { entityId, entityType } = action;

  const serviceEntityType = getServiceEntityType(entityType);
  // API Call
  const fetchMessagesNumberResponse = yield call(
    api.fetchMessagesList,
    entityId,
    serviceEntityType,
    1,
    10
  );
  if (fetchMessagesNumberResponse.status === 200) {
    yield put(
      MessagesActions.fetchMessagesCountSuccessResponse(
        entityId,
        entityType,
        fetchMessagesNumberResponse.data.totalElements || 0
      )
    );
  }
}

/**
 * Fetch Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchMessages(api: MessagesServiceType, action: AnyAction) {
  const { entityId, entityType, page, size } = action;

  const serviceEntityType = getServiceEntityType(entityType);
  try {
    const fetchInterestListMessagesResponse = yield call(
      api.fetchMessagesList,
      entityId,
      serviceEntityType,
      page,
      size
    );
    if (fetchInterestListMessagesResponse.status === 200) {
      // Authentication Success
      yield put(
        MessagesActions.fetchMessagesSuccessResponse(
          entityId,
          entityType,
          fetchInterestListMessagesResponse.data.content,
          {},
          page,
          fetchInterestListMessagesResponse.data.last,
          fetchInterestListMessagesResponse.data.totalElements,
          size
        )
      );

      // Load Message Data

      // Load Author profile
      yield all(
        fetchInterestListMessagesResponse.data.content
          .filter((message: any) => !message.authorRepresentativeId)
          .map((message: any) =>
            put(PlayersActions.fetchPlayerRequest(message.author))
          )
      );

      // Load Image for All Events
    } else {
      yield put(MessagesActions.fetchMessagesFailureResponse());
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(MessagesActions.fetchMessagesCancelResponse());
    }
  }
}

/**
 * Add a Message
 * @param {*} api : The API to use
 * @param {*} action : The action
 */
export function* addMessage(api: MessagesServiceType, action: AnyAction) {
  const { entityId, entityType, message } = action;

  const serviceEntityType = getServiceEntityType(entityType);

  const newMessage = {
    content: message,
    entityId: entityId,
    entityType: serviceEntityType
  };

  const addMessageResponse = yield call(api.addMessage, newMessage);

  if (addMessageResponse.status === 201) {
    const messageId = getHeaderId(addMessageResponse);
    // // Success
    yield put(
      MessagesActions.addMessageSuccessResponse(entityId, entityType, messageId)
    );

    yield put(
      MessagesActions.fetchMessageRequest(entityId, entityType, messageId)
    );
  } else {
    // Error
    yield put(
      MessagesActions.addMessageFailureResponse(addMessageResponse.data)
    );
  }
}
