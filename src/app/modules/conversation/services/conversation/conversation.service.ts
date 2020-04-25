import { Injectable } from '@angular/core';

import { BaseStateService } from '../../../core/services/base-state.service';
import { ConversationWebsocketService } from '../conversation-websocket/conversation-websocket.service';
import { ConversationExternalInputEventUnion } from '../conversation-websocket/input-events/external-events/conversation-external-input-event-union.type';
import { ConversationExternalInputEvent } from '../conversation-websocket/input-events/external-events/conversation-external-input-event.enum';
import { IUsersCountInputEvent } from '../conversation-websocket/input-events/external-events/events/users-count-input-event.interface';
import { IConversationState } from './conversation-state.interface';

@Injectable()
export class ConversationService extends BaseStateService<IConversationState> {
  constructor(private readonly conversationWebsocketService: ConversationWebsocketService) {
    super({
      wasConnected: false,
      isConnecting: false,
      isConnected: false,
      isConnectionError: false,
      usersCount: null
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
        this.handleUsersCount(event);
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

  private handleUsersCount({ data: { usersCount } }: IUsersCountInputEvent): void {
    this.setState({ usersCount });
  }

  private handleWebSocketDisconnect(): void {
    this.setState({ isConnecting: false, isConnected: false, isConnectionError: true });
  }
}
