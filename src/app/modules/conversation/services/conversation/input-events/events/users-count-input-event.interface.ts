import { ConversationInputEvent } from '../conversation-input-event.enum';
import { IUsersCountInputEventPayload } from '../payloads/users-count-input-event-payload.interface';

export interface IUsersCountInputEvent {
  event: ConversationInputEvent.usersCount;
  data: IUsersCountInputEventPayload;
}
