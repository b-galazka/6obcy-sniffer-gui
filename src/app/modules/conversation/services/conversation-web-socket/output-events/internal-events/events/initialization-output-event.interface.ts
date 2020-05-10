import { ConversationInternalOutputEvent } from '../conversation-internal-output-event.enum';

export interface IInitializationOutputEvent {
  event: ConversationInternalOutputEvent.initialization;
}
