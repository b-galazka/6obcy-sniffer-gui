import { ConversationExternalOutputEvent } from '../conversation-external-output-event.enum';

export interface IConversationStartOutputEvent {
  event: ConversationExternalOutputEvent.conversationStart;
}
