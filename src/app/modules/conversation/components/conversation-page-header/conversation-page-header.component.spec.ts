import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoModule } from '@ngneat/transloco';

import { ConversationPageHeaderComponent } from './conversation-page-header.component';

describe('ConversationPageHeaderComponent', () => {
  let component: ConversationPageHeaderComponent;
  let fixture: ComponentFixture<ConversationPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationPageHeaderComponent],
      imports: [TranslocoModule]
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
