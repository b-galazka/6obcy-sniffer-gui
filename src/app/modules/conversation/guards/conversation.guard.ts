import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { first, mapTo } from 'rxjs/operators';

import { IConversationState } from '../services/conversation/conversation-state.interface';
import { ConversationService } from '../services/conversation/conversation.service';

@Injectable()
export class ConversationGuard implements CanActivate {
  constructor(private readonly conversationService: ConversationService) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.isConversationStateReady(this.conversationService.state)) {
      return true;
    }

    this.conversationService.initConnection();

    return this.conversationService.state$.pipe(
      first(state => this.isConversationStateReady(state)),
      mapTo(true)
    );
  }

  private isConversationStateReady({
    isConnected,
    isConnectionError,
    usersCount
  }: IConversationState): boolean {
    return isConnectionError || (isConnected && usersCount !== null);
  }
}
