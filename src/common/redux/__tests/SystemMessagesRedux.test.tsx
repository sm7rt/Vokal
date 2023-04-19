import Actions, { reducer, INITIAL_STATE } from '../SystemMessagesRedux';
import Immutable from 'seamless-immutable';
import { ISystemMessageImmutableState } from '../../models/StateModel';

// Test Add Message
test('Add a message', () => {
  const id = 'SIGNIN_ERROR';
  const gravity = 'ERROR';
  const text = 'An error occured';
  const headerText = 'ERROR';
  const displayMode = 'MODAL';

  const state: ISystemMessageImmutableState = reducer(
    INITIAL_STATE,
    Actions.addMessage(id, gravity, text, headerText, displayMode)
  );
  // They have to have the sames values
  expect(state.length).toEqual(1);
});

// Test Remove a Message
test('Remove a message', () => {
  const message = {
    id: 'SIGNIN_ERROR',
    gravity: 'ERROR',
    text: 'An error occured',
    headerText: 'ERROR',
    displayMode: 'MODAL'
  };

  const state: ISystemMessageImmutableState = reducer(
    Immutable([message]),
    Actions.removeMessage(message.id)
  );
  // They have to have the sames values
  expect(state.length).toEqual(0);
});
