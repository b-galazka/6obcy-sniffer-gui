import { ConversationExternalOutputEvent } from '../conversation-external-output-event.enum';
import { IMessageOutputEventPayload } from '../payloads/message-output-event-payload.interface';

export interface IMessageOutputEvent {
  event: ConversationExternalOutputEvent.message;
  data: IMessageOutputEventPayload;
}
