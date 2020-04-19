import { IConversationEndOutputEvent } from './events/conversation-end-output-event.interface';
import { IConversationStartOutputEvent } from './events/conversation-start-output-event.interface';
import { IInitializationOutputEvent } from './events/initialization-output-event.interface';
import { IMessageOutputEvent } from './events/message-output-event.interface';
import { IPingOutputEvent } from './events/ping-output-event.interface';

export type ConversationOutputEventUnion =
  | IConversationEndOutputEvent
  | IConversationStartOutputEvent
  | IInitializationOutputEvent
  | IMessageOutputEvent
  | IPingOutputEvent;
