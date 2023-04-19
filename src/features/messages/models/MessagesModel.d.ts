import { PageableStateType } from '../../../common/models';

type EntityType = 'INTEREST_LIST';

/**
 * Message State Interface
 */
export interface IMessageState
  extends PageableStateType<MessagesApiDefinition.MessageDocument> {
  entityId: string; // Entity Link to Message this
  entityType: EntityType; // MessagesApiDefinitions.MessageDocument
}

// Immutable Message State
export type IMessageImmutableState = ImmutableObject<IMessageState[]>;

// ******************************** //
// *********** Services  ************ //
// ******************************** //

/**
 * Messages Service available
 */
export type MessagesServiceType = {
  fetchMessagesList: (
    entityId: string,
    entityType: string,
    page: number,
    size: number
  ) => any;
  addMessage: (message: any) => any;
  fetchMessageDetails: (messageId: string) => any;
};
