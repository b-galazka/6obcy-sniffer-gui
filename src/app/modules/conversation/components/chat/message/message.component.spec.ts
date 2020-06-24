import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageType } from '../../../services/conversation/enums/message-type.enum';
import { Stranger } from '../../../services/conversation/enums/stranger.enum';
import { IMessage } from '../../../services/conversation/interfaces/message.interface';
import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  const messageMock: IMessage = {
    id: 'id',
    timestamp: 999,
    isProhibited: false,
    type: MessageType.message,
    content: 'content',
    author: Stranger.first,
    isEmittedByMe: false
  };

  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.message = messageMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
