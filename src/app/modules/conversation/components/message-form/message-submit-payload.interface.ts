import { Stranger } from '../../services/conversation/enums/stranger.enum';

export interface IMessageSubmitPayload {
  messageContent: string;
  messageReceivers: Stranger[];
}
