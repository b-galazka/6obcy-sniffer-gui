import { Injectable } from '@angular/core';
import { v4 as generateUuid } from 'uuid';

import { BaseStateService } from '../../../core/services/base-state.service';
import { ConversationWebSocketService } from '../conversation-websocket/conversation-web-socket.service';
import { ConversationExternalInputEventUnion } from '../conversation-websocket/input-events/external-events/conversation-external-input-event-union.type';
import { ConversationExternalInputEvent } from '../conversation-websocket/input-events/external-events/conversation-external-input-event.enum';
import { IBaseStrangerInputEventPayload } from '../conversation-websocket/input-events/external-events/payloads/base-stranger-input-event-payload.interface';
import { IProhibitedMessageInputEventPayload } from '../conversation-websocket/input-events/external-events/payloads/prohibited-message-input-event-payload.interface';
import { IRandomTopicInputEventPayload } from '../conversation-websocket/input-events/external-events/payloads/random-topic-input-event-payload.interface';
import { IStrangerMessageInputEventPayload } from '../conversation-websocket/input-events/external-events/payloads/stranger-message-input-event-payload.interface';
import { IUsersCountInputEventPayload } from '../conversation-websocket/input-events/external-events/payloads/users-count-input-event-payload.interface';
import { ConversationExternalOutputEvent } from '../conversation-websocket/output-events/external-events/conversation-external-output-event.enum';
import { MessageType } from './enums/message-type.enum';
import { Stranger } from './enums/stranger.enum';
import { IConversationState } from './interfaces/conversation-state.interface';
import { IMessage, IMessageCreationPayload } from './interfaces/message.interface';

@Injectable()
export class ConversationService extends BaseStateService<IConversationState> {
  constructor(private readonly conversationWebsocketService: ConversationWebSocketService) {
    super({
      wasConnected: false,
      isConnecting: false,
      isConnected: false,
      isConnectionError: false,
      usersCount: null,
      isConversationStarted: false,
      isConversationStarting: false,
      isFirstStrangerTyping: false,
      isSecondStrangerTyping: false,
      messages: []
    });
  }

  initConnection(): void {
    if (!this.state.isConnected) {
      this.setState({ isConnecting: true, isConnectionError: false });
    }

    this.conversationWebsocketService.initConnection()?.subscribe(
      event => this.handleConversationEvent(event),
      () => this.handleWebSocketDisconnect(),
      () => this.handleWebSocketDisconnect()
    );
  }

  private handleConversationEvent(event: ConversationExternalInputEventUnion): void {
    switch (event.event) {
      case ConversationExternalInputEvent.connectionInitSuccess:
        this.handleConnectionInitSuccess();
        break;

      case ConversationExternalInputEvent.usersCount:
        this.handleUsersCount(event.data);
        break;

      case ConversationExternalInputEvent.conversationStart:
        this.handleConversationStart();
        break;

      case ConversationExternalInputEvent.strangerMessage:
        this.handleStrangerMessage(event.data);
        break;

      case ConversationExternalInputEvent.conversationEnd:
        this.handleConversationEnd(event.data);
        break;

      case ConversationExternalInputEvent.randomTopic:
        this.handleRandomTopic(event.data);
        break;

      case ConversationExternalInputEvent.prohibitedMessage:
        this.handleProhibitedMessage(event.data);
        break;

      case ConversationExternalInputEvent.strangerTypingStart:
        this.handleStrangerTypingStatusChange(event.data, true);
        break;

      case ConversationExternalInputEvent.strangerTypingStop:
        this.handleStrangerTypingStatusChange(event.data, false);
        break;

      default:
    }
  }

  private handleConnectionInitSuccess(): void {
    this.setState({
      wasConnected: true,
      isConnecting: false,
      isConnected: true,
      isConnectionError: false
    });
  }

  private handleUsersCount({ usersCount }: IUsersCountInputEventPayload): void {
    this.setState({ usersCount });
  }

  private handleConversationStart(): void {
    const conversationStartMessage = this.createMessage({
      type: MessageType.conversationStart,
      content: null,
      author: null,
      isEmittedByMe: false
    });

    this.setState({
      isConversationStarted: true,
      isConversationStarting: false,
      messages: [conversationStartMessage]
    });
  }

  private handleStrangerMessage({ message, notifier }: IStrangerMessageInputEventPayload): void {
    const receivedMessage = this.createMessage({
      type: MessageType.message,
      content: message,
      author: notifier,
      isEmittedByMe: false
    });

    this.setState({ messages: [...this.state.messages, receivedMessage] });
  }

  private handleConversationEnd({ notifier }: IBaseStrangerInputEventPayload): void {
    const conversationEndMessage = this.createMessage({
      type: MessageType.conversationEnd,
      content: null,
      author: notifier,
      isEmittedByMe: notifier === null
    });

    this.setState({
      isConversationStarted: false,
      messages: [...this.state.messages, conversationEndMessage]
    });
  }

  private handleRandomTopic({ topic, notifier }: IRandomTopicInputEventPayload): void {
    const randomTopicMessage = this.createMessage({
      type: MessageType.randomTopic,
      content: topic,
      author: notifier,
      isEmittedByMe: false
    });

    this.setState({ messages: [...this.state.messages, randomTopicMessage] });
  }

  private handleProhibitedMessage({
    message: prohibitedMessageContent
  }: IProhibitedMessageInputEventPayload): void {
    const flaggedMessages = this.state.messages.map(message => ({
      ...message,
      isProhibited: message.content === prohibitedMessageContent
    }));

    this.setState({ messages: flaggedMessages });
  }

  private handleStrangerTypingStatusChange(
    { notifier }: IBaseStrangerInputEventPayload,
    isStrangerTyping: boolean
  ): void {
    switch (notifier) {
      case Stranger.first:
        this.setState({ isFirstStrangerTyping: isStrangerTyping });
        break;

      case Stranger.second:
        this.setState({ isSecondStrangerTyping: isStrangerTyping });
        break;

      default:
    }
  }

  private handleWebSocketDisconnect(): void {
    const disconnectionMessage = this.createMessage({
      type: MessageType.disconnection,
      content: null,
      author: null,
      isEmittedByMe: false
    });

    this.setState({
      isConnecting: false,
      isConnected: false,
      isConnectionError: true,
      messages: [...this.state.messages, disconnectionMessage]
    });
  }

  startConversation(): void {
    this.setState({ isConversationStarting: true });

    this.conversationWebsocketService.emitConversationEvent({
      event: ConversationExternalOutputEvent.conversationStart
    });
  }

  sendMessage(messageContent: string, messageReceivers: Stranger[]): void {
    const sentMessages = messageReceivers.map(messageReceiver =>
      this.createMessage({
        type: MessageType.message,
        content: messageContent,
        author: this.getMyMessageAuthor(messageReceiver),
        isEmittedByMe: true
      })
    );

    this.setState({ messages: [...this.state.messages, ...sentMessages] });

    this.conversationWebsocketService.emitConversationEvent({
      event: ConversationExternalOutputEvent.message,
      data: { messageContent, messageReceivers }
    });
  }

  private getMyMessageAuthor(messageReceiver: Stranger): Stranger | null {
    switch (messageReceiver) {
      case Stranger.first:
        return Stranger.second;

      case Stranger.second:
        return Stranger.first;

      default:
        return null;
    }
  }

  private createMessage(messageCreationPayload: IMessageCreationPayload): IMessage {
    return {
      ...messageCreationPayload,
      timestamp: Date.now(),
      isProhibited: false,
      id: generateUuid()
    };
  }

  endConversation(): void {
    this.conversationWebsocketService.emitConversationEvent({
      event: ConversationExternalOutputEvent.conversationEnd
    });
  }
}
