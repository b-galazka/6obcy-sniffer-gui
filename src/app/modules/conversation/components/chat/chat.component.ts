import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IMessage } from '../../services/conversation/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  @Input() messages: IMessage[];

  trackMessages(index: number, message: IMessage): string {
    return message.id;
  }
}
