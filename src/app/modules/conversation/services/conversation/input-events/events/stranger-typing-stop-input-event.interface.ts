import { ConversationInputEvent } from '../conversation-input-event.enum';
import { IBaseStrangerInputEventPayload } from '../payloads/base-stranger-input-event-payload.interface';

export interface IStrangerTypingStopInputEvent {
  event: ConversationInputEvent.strangerTypingStop;
  data: IBaseStrangerInputEventPayload;
}
