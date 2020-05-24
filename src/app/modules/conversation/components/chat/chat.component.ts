import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IMessage } from '../../services/conversation/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  @Input() isConversationStarted: boolean;
  @Input() isConversationStarting: boolean;
  @Input() messages: IMessage[];
  @Output() readonly conversationStart = new EventEmitter<void>();

  trackMessages(index: number, message: IMessage): string {
    return message.id;
  }

  startConversation(): void {
    this.conversationStart.emit();
  }
}
