import { IConnectionInitSuccessInputEvent } from './events/connection-init-success-input-event.interface';
import { IConversationEndInputEvent } from './events/conversation-end-input-event.interface';
import { IConversationStartInputEvent } from './events/conversation-start-input-event.interface';
import { IProhibitedMessageInputEvent } from './events/prohibited-message-input-event.interface';
import { IRandomTopicInputEvent } from './events/random-topic-input-event.interface';
import { IStrangerMessageInputEvent } from './events/stranger-message-input-event.interface';
import { IStrangerTypingStartInputEvent } from './events/stranger-typing-start-input-event.interface';
import { IStrangerTypingStopInputEvent } from './events/stranger-typing-stop-input-event.interface';
import { IUsersCountInputEvent } from './events/users-count-input-event.interface';

export type ConversationExternalInputEventUnion =
  | IConnectionInitSuccessInputEvent
  | IConversationEndInputEvent
  | IConversationStartInputEvent
  | IProhibitedMessageInputEvent
  | IRandomTopicInputEvent
  | IStrangerMessageInputEvent
  | IStrangerTypingStartInputEvent
  | IStrangerTypingStopInputEvent
  | IUsersCountInputEvent;
