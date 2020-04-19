import { ConversationInputEvent } from '../conversation-input-event.enum';
import { IStrangerMessageInputEventPayload } from '../payloads/stranger-message-input-event-payload.interface';

export interface IStrangerMessageInputEvent {
  event: ConversationInputEvent.strangerMessage;
  data: IStrangerMessageInputEventPayload;
}
