export enum ConversationInputEvent {
  conversationStart = 'conversationStart',
  strangerMessage = 'strangerMessage',
  conversationEnd = 'conversationEnd',
  randomTopic = 'randomTopic',
  prohibitedMessage = 'prohibitedMessage',
  usersCount = 'usersCount',
  strangerTypingStart = 'strangerTypingStart',
  strangerTypingStop = 'strangerTypingStop',
  connectionInitSuccess = 'connectionInitSuccess',
  exception = 'exception',
  pong = 'pong',
  connectionSuccess = 'connectionSuccess'
}
