import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-conversation-page-header',
  templateUrl: './conversation-page-header.component.html',
  styleUrls: ['./conversation-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPageHeaderComponent {
  @Input() activeUsersCount: number;
}
