import { ConversationExternalInputEvent } from '../conversation-external-input-event.enum';
import { IRandomTopicInputEventPayload } from '../payloads/random-topic-input-event-payload.interface';

export interface IRandomTopicInputEvent {
  event: ConversationExternalInputEvent.randomTopic;
  data: IRandomTopicInputEventPayload;
}
