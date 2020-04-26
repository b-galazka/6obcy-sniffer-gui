import { MessageType } from '../enums/message-type.enum';
import { Stranger } from '../enums/stranger.enum';

export interface IMessageCreationPayload {
  type: MessageType;
  content: string | null;
  author: Stranger | null;
  isEmittedByMe: boolean;
}

export interface IMessage extends IMessageCreationPayload {
  id: string;
  timestamp: number;
  isProhibited: boolean;
}
