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
  @OnChange('calcScrollBottom') @Input() isConversationStarted: boolean;
  @Input() isConversationStarting: boolean;
  @OnChange('calcScrollBottom') @Input() messages: IMessage[];
  @Output() readonly conversationStart = new EventEmitter<void>();
  @ViewChild('chatContent') chatContentRef: ElementRef<HTMLDivElement>;

  private scrollBottom: number;

  ngOnInit(): void {
    this.calcScrollBottom();
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
    this.scrollToBottom();
  }

  trackMessages(index: number, message: IMessage): string {
    return message.id;
  }

  startConversation(): void {
    this.conversationStart.emit();
  }

  private scrollToBottom(): void {
    const { scrollHeight } = this.chatContentRef.nativeElement;
    const scrollBottomThreeshold = 50;

    if (this.scrollBottom <= scrollBottomThreeshold) {
      this.chatContentRef.nativeElement.scrollTop = scrollHeight;
    }
  }
}
