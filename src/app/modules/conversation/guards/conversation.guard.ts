import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { first, mapTo } from 'rxjs/operators';

import { ConversationService } from '../services/conversation/conversation.service';

@Injectable()
export class ConversationGuard implements CanActivate {
  constructor(private readonly conversationService: ConversationService) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.conversationService.state.isConnected) {
      return true;
    }

    this.conversationService.initConnection();

    return this.conversationService.state$.pipe(
      first(({ isConnected }) => isConnected),
      mapTo(true)
    );
  }
}
