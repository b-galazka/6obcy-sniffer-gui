import { ConversationInternalInputEvent } from '../conversation-internal-input-event.enum';

export interface IPongInputEvent {
  event: ConversationInternalInputEvent.pong;
}
