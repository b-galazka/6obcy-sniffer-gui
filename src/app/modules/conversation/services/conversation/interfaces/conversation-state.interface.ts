import { IMessage } from './message.interface';

export interface IConversationState {
  wasConnected: boolean;
  isConnecting: boolean;
  isConnected: boolean;
  isConnectionError: boolean;
  isConversationStarted: boolean;
  isConversationStarting: boolean;
  isFirstStrangerTyping: boolean;
  isSecondStrangerTyping: boolean;
  messages: IMessage[];
  usersCount: number | null;
}
