import { ConversationExternalOutputEvent } from '../conversation-external-output-event.enum';

export interface IConversationEndOutputEvent {
  event: ConversationExternalOutputEvent.conversationEnd;
}
