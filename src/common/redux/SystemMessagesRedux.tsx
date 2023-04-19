import { createReducer, createActions } from 'reduxsauce';
import { AnyAction } from 'redux';
import Immutable from 'seamless-immutable';
import { ISystemMessageImmutableState, IRootState } from '../models/StateModel';
import { createImmutableEqualSelector } from '../../redux/selector/custom-selector';

/* ------------- Types and Action Creators ------------- */

/**
 * Define Actions of Reducer
 */
const { Types, Creators } = createActions({
  addMessage: ['id', 'gravity', 'text', 'headerText', 'displayMode'],
  removeMessage: ['id']
});

export const MessagesTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */
//@ts-ignore
export const INITIAL_STATE: ISystemMessageImmutableState = Immutable([]);

/* ------------- Reducers ------------- */
/**
 * Add a message to the list Reducer
 */
export const addMessageToList = (
  state: ISystemMessageImmutableState,
  { id, gravity, text, headerText, displayMode }: AnyAction
) => {
  const message = {
    id,
    gravity,
    text,
    headerText,
    displayMode
  };
  return Immutable([...state, message]);
};

/**
 * Remove a message from the list Reducer
 */
export const removeMessageFromList = (
  state: ISystemMessageImmutableState,
  { id }: AnyAction
) => {
  return Immutable(state.filter(m => m.id !== id));
};

/* ------------- Hookup Reducers To Types ------------- */
/**
 * Messages Handler
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_MESSAGE]: addMessageToList,
  [Types.REMOVE_MESSAGE]: removeMessageFromList
});

/* ------------- Selectors ------------- */
/**
 * Message Selector
 * @param state
 * @param displayMode
 */
const messagesSelector = (state: IRootState, displayMode: 'MODAL' | 'PANEL') =>
  state['system-messages'].filter(m => m.displayMode === displayMode);

export const messagesWithDisplayMode = createImmutableEqualSelector(
  [messagesSelector],
  messages => messages
);
