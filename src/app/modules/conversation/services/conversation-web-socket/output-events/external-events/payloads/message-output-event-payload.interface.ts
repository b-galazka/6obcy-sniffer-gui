import { Stranger } from 'src/app/modules/conversation/services/conversation/enums/stranger.enum';

export interface IMessageOutputEventPayload {
  messageReceivers: Stranger[];
  messageContent: string;
}
