import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IMessageSubmitPayload } from '../../components/message-form/message-submit-payload.interface';
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

  startConversation(): void {
    this.conversationService.startConversation();
  }

  sendMessage({ messageContent, messageReceivers }: IMessageSubmitPayload): void {
    this.conversationService.sendMessage(messageContent, messageReceivers);
  }

  endConveration(): void {
    this.conversationService.endConversation();
  }
}
