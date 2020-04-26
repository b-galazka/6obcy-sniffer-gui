import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { getClassMethodsNames } from 'src/app/modules/shared/utils/get-class-methods-names.util';
import { ConversationService } from '../../services/conversation/conversation.service';
import { ConversationPageComponent } from './conversation-page.component';

describe('ConversationPageComponent', () => {
  let component: ConversationPageComponent;
  let fixture: ComponentFixture<ConversationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationPageComponent],
      providers: [
        {
          provide: ConversationService,
          useValue: jasmine.createSpyObj(getClassMethodsNames(ConversationService))
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
