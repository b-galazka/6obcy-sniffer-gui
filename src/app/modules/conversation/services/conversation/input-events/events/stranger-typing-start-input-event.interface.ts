import { ConversationInputEvent } from '../conversation-input-event.enum';
import { IBaseStrangerInputEventPayload } from '../payloads/base-stranger-input-event-payload.interface';

export interface IStrangerTypingStartInputEvent {
  event: ConversationInputEvent.strangerTypingStart;
  data: IBaseStrangerInputEventPayload;
}
