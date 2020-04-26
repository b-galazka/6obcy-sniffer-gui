import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { ConversationWebSocketService } from './services/conversation-websocket/conversation-web-socket.service';
import { ConversationService } from './services/conversation/conversation.service';

@NgModule({
  declarations: [ConversationPageComponent],
  imports: [ConversationRoutingModule, SharedModule],
  providers: [ConversationService, ConversationWebSocketService]
})
export class ConversationModule {}
