import { ConversationInputEvent } from '../conversation-input-event.enum';
import { IExceptionInputEventPayload } from '../payloads/exception-input-event-payload.interface';

export interface IExceptionInputEvent {
  event: ConversationInputEvent.exception;
  data: IExceptionInputEventPayload;
}
