import { ConversationExternalInputEventUnion } from './external-events/conversation-external-input-event-union.type';
import { ConversationInternalInputEventUnion } from './internal-events/conversation-internal-input-event-union.type';

export type ConversationInputEventUnion =
  | ConversationExternalInputEventUnion
  | ConversationInternalInputEventUnion;
