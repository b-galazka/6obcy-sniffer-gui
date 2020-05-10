import { ConversationExternalInputEvent } from '../conversation-external-input-event.enum';
import { IBaseStrangerInputEventPayload } from '../payloads/base-stranger-input-event-payload.interface';

export interface IStrangerTypingStartInputEvent {
  event: ConversationExternalInputEvent.strangerTypingStart;
  data: IBaseStrangerInputEventPayload;
}
