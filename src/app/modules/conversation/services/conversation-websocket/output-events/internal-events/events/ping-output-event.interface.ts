import { ConversationInternalOutputEvent } from '../conversation-internal-output-event.enum';

export interface IPingOutputEvent {
  event: ConversationInternalOutputEvent.ping;
}
