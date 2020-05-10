import { IConversationEndOutputEvent } from './events/conversation-end-output-event.interface';
import { IConversationStartOutputEvent } from './events/conversation-start-output-event.interface';
import { IMessageOutputEvent } from './events/message-output-event.interface';

export type ConversationExternalOutputEventUnion =
  | IConversationEndOutputEvent
  | IConversationStartOutputEvent
  | IMessageOutputEvent;
