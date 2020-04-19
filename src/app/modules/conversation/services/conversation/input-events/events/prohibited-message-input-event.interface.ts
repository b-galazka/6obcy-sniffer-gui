import { ConversationInputEvent } from '../conversation-input-event.enum';
import { IProhibitedMessageInputEventPayload } from '../payloads/prohibited-message-input-event-payload.interface';

export interface IProhibitedMessageInputEvent {
  event: ConversationInputEvent.prohibitedMessage;
  data: IProhibitedMessageInputEventPayload;
}
