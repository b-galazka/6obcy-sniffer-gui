import { Injectable } from '@angular/core';

import { BaseStateService } from '../../../core/services/base-state.service';
import { ConversationWebsocketService } from '../conversation-websocket/conversation-websocket.service';
import { ConversationExternalInputEventUnion } from '../conversation-websocket/input-events/external-events/conversation-external-input-event-union.type';
import { IConversationState } from './conversation-state.interface';

@Injectable()
export class ConversationService extends BaseStateService<IConversationState> {
  constructor(private readonly conversationWebsocketService: ConversationWebsocketService) {
    super({
      wasConnected: false,
      isConnecting: false,
      isConnected: false,
      isConnectionError: false
    });
  }

  initConnection(): void {
    if (!this.state.isConnected) {
      this.setState({ isConnecting: true, isConnectionError: false });
    }

    this.conversationWebsocketService.initConnection()?.subscribe(
      event => this.handleConversationEvent(event),
      () => this.handleWebSocketError(),
      () => this.handleWebSocketDisconnect()
    );
  }

  private handleConversationEvent(event: ConversationExternalInputEventUnion): void {
    // TODO: update state
    console.log(event);
  }

  private handleWebSocketError(): void {
    // TODO: update state
    console.log('error');
  }

  private handleWebSocketDisconnect(): void {
    // TODO: update state
    console.log('disconnect');
  }
}
