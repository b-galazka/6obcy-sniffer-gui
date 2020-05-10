import { ConversationExternalInputEvent } from '../conversation-external-input-event.enum';
import { IProhibitedMessageInputEventPayload } from '../payloads/prohibited-message-input-event-payload.interface';

export interface IProhibitedMessageInputEvent {
  event: ConversationExternalInputEvent.prohibitedMessage;
  data: IProhibitedMessageInputEventPayload;
}
