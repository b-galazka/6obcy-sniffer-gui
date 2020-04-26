import { TestBed } from '@angular/core/testing';

import { getClassMethodsNames } from '../../shared/utils/get-class-methods-names.util';
import { ConversationService } from '../services/conversation/conversation.service';
import { ConversationGuard } from './conversation.guard';

describe('ConversationGuard', () => {
  let guard: ConversationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConversationGuard,
        {
          provide: ConversationService,
          useValue: jasmine.createSpyObj(getClassMethodsNames(ConversationService))
        }
      ]
    });
    guard = TestBed.inject(ConversationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
