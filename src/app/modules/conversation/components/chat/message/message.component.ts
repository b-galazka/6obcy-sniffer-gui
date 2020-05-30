import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MessageType } from '../../../services/conversation/enums/message-type.enum';
import { Stranger } from '../../../services/conversation/enums/stranger.enum';
import { IMessage } from '../../../services/conversation/interfaces/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  readonly MessageType = MessageType;
  readonly Stranger = Stranger;

  @Input() message: IMessage;
}
