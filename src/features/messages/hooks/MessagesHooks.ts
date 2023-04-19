import { useSelector } from 'react-redux';
import { messagesListSelector } from '../redux/MessagesRedux';
import { IRootState } from '../../../common/models/StateModel';

// Keep A Map With entityId and entityType and Selector
const mapMessageSelector = new Map();

/**
 * Use Messages hooks
 * @param interestListId
 */
export const useMessages = (entityId: string, entityType: 'INTEREST_LIST') => {
  // Keep a Cache InterestListId / Selector Because Selector Cache Size is One ()  "https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances"
  let existingSelector = mapMessageSelector.get({ entityId, entityType });
  if (!existingSelector) {
    console.log('Message Selector not exist', entityId, entityType);
    existingSelector = messagesListSelector();
    mapMessageSelector.set({ entityId, entityType }, existingSelector);
  }
  const messageObj = useSelector((state: IRootState) =>
    existingSelector(state, entityId, entityType)
  );
  return messageObj;
};
