import { ConversationOutputEvent } from '../conversation-output-event.enum';
import { IMessageOutputEventPayload } from '../payloads/message-output-event-payload.interface';

export interface IMessageOutputEvent {
  event: ConversationOutputEvent.message;
  data: IMessageOutputEventPayload;
}
