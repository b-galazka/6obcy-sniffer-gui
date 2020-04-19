import { ConversationInputEvent } from '../conversation-input-event.enum';
import { IRandomTopicInputEventPayload } from '../payloads/random-topic-input-event-payload.interface';

export interface IRandomTopicInputEvent {
  event: ConversationInputEvent.randomTopic;
  data: IRandomTopicInputEventPayload;
}
