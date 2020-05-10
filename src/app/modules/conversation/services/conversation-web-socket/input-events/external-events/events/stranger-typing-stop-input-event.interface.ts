import { ConversationExternalInputEvent } from '../conversation-external-input-event.enum';
import { IBaseStrangerInputEventPayload } from '../payloads/base-stranger-input-event-payload.interface';

export interface IStrangerTypingStopInputEvent {
  event: ConversationExternalInputEvent.strangerTypingStop;
  data: IBaseStrangerInputEventPayload;
}
