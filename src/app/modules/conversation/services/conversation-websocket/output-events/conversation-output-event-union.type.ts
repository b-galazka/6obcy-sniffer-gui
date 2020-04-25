import { ConversationExternalOutputEventUnion } from './external-events/conversation-external-output-event-union.type';
import { ConversationInternalOutputEventUnion } from './internal-events/conversation-internal-output-event-union.type';

export type ConversationOutputEventUnion =
  | ConversationExternalOutputEventUnion
  | ConversationInternalOutputEventUnion;
