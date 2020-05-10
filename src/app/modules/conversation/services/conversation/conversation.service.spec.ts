import { TestBed } from '@angular/core/testing';

import { getClassMethodsNames } from 'src/app/modules/shared/utils/get-class-methods-names.util';
import { ConversationWebSocketService } from '../conversation-web-socket/conversation-web-socket.service';
import { ConversationService } from './conversation.service';

describe('ConversationService', () => {
  let service: ConversationService;

  beforeEach(() => {
    console.log(getClassMethodsNames(ConversationWebSocketService));

    TestBed.configureTestingModule({
      providers: [
        ConversationService,
        {
          provide: ConversationWebSocketService,
          useValue: jasmine.createSpyObj(getClassMethodsNames(ConversationWebSocketService))
        }
      ]
    });

    service = TestBed.inject(ConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
