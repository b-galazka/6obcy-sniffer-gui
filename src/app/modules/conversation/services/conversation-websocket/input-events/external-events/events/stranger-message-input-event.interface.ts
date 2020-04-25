import { ConversationExternalInputEvent } from '../conversation-external-input-event.enum';
import { IStrangerMessageInputEventPayload } from '../payloads/stranger-message-input-event-payload.interface';

export interface IStrangerMessageInputEvent {
  event: ConversationExternalInputEvent.strangerMessage;
  data: IStrangerMessageInputEventPayload;
}
