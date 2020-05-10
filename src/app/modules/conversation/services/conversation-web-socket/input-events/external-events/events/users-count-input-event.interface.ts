import { ConversationExternalInputEvent } from '../conversation-external-input-event.enum';
import { IUsersCountInputEventPayload } from '../payloads/users-count-input-event-payload.interface';

export interface IUsersCountInputEvent {
  event: ConversationExternalInputEvent.usersCount;
  data: IUsersCountInputEventPayload;
}
