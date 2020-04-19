import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConversationService } from '../../services/conversation/conversation.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationPageComponent {
  readonly conversationState$ = this.conversationService.state$;

  constructor(private readonly conversationService: ConversationService) {}
}
