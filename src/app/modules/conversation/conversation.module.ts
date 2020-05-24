import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { ConversationPageHeaderComponent } from './components/conversation-page-header/conversation-page-header.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { ConversationWebSocketService } from './services/conversation-web-socket/conversation-web-socket.service';
import { ConversationService } from './services/conversation/conversation.service';

@NgModule({
  declarations: [
    ConversationPageComponent,
    ChatComponent,
    MessageFormComponent,
    ConversationPageHeaderComponent,
    MessageComponent
  ],
  imports: [ConversationRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [ConversationService, ConversationWebSocketService]
})
export class ConversationModule {}
