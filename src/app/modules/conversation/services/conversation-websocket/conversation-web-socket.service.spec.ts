import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

import { CONFIG } from 'src/app/modules/core/injection-tokens/config.token';
import { WEB_SOCKET } from 'src/app/modules/core/injection-tokens/web-socket.token';
import { config } from 'src/config';
import { ConversationWebSocketService } from './conversation-web-socket.service';

describe('ConversationWebSocketService', () => {
  let service: ConversationWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConversationWebSocketService,
        { provide: CONFIG, useValue: config },
        { provide: WEB_SOCKET, useValue: () => new WebSocketSubject(of()) }
      ]
    });

    service = TestBed.inject(ConversationWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
