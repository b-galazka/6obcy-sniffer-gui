import { ConversationOutputEvent } from '../conversation-output-event.enum';

export interface IPingOutputEvent {
  event: ConversationOutputEvent.ping;
}
