import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { OnChange } from 'property-watch-decorator';

import { IMessage } from '../../services/conversation/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @OnChange('checkIfShouldScrollToBottom') @Input() isConversationStarted: boolean;
  @OnChange('checkIfShouldScrollToBottom') @Input() messages: IMessage[];
  @Input() isConversationStarting: boolean;
  @Input() isConnected: boolean;
  @Output() readonly conversationStart = new EventEmitter<void>();
  @ViewChild('chatContent') chatContentRef: ElementRef<HTMLDivElement>;

  private scrollBottom: number;
  private shouldScrollToBottom: boolean;

  ngOnInit(): void {
    this.checkIfShouldScrollToBottom();
  }

  private checkIfShouldScrollToBottom(): void {
    this.calcScrollBottom();

    const scrollBottomThreeshold = 50;
    this.shouldScrollToBottom = this.scrollBottom <= scrollBottomThreeshold;
  }

  calcScrollBottom(): void {
    if (!this.chatContentRef || !this.chatContentRef.nativeElement) {
      this.scrollBottom = 0;
      return;
    }

    const { offsetHeight, scrollTop, scrollHeight } = this.chatContentRef.nativeElement;
    this.scrollBottom = scrollHeight - offsetHeight - scrollTop;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    this.chatContentRef.nativeElement.scrollTop = this.chatContentRef.nativeElement.scrollHeight;
  }

  startConversation(): void {
    this.conversationStart.emit();
  }

  trackMessages(index: number, message: IMessage): string {
    return message.id;
  }
}
