import { TestBed } from '@angular/core/testing';

import { ConversationWebsocketService } from './conversation-websocket.service';

describe('ConversationWebsocketService', () => {
  let service: ConversationWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
