import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPageComponent {}
