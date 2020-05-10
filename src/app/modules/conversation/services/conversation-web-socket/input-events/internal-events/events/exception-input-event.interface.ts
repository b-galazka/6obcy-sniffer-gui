import { ConversationInternalInputEvent } from '../conversation-internal-input-event.enum';
import { IExceptionInputEventPayload } from '../payloads/exception-input-event-payload.interface';

export interface IExceptionInputEvent {
  event: ConversationInternalInputEvent.exception;
  data: IExceptionInputEventPayload;
}
