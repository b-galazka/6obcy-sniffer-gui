import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IMessage } from '../../../services/conversation/interfaces/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  @Input() message: IMessage;
}
