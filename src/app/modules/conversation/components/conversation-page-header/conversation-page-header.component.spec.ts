import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationPageHeaderComponent } from './conversation-page-header.component';

describe('ConversationPageHeaderComponent', () => {
  let component: ConversationPageHeaderComponent;
  let fixture: ComponentFixture<ConversationPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationPageHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
