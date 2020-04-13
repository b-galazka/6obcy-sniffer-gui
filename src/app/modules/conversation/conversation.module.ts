import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';

@NgModule({
  declarations: [ConversationPageComponent],
  imports: [ConversationRoutingModule, SharedModule]
})
export class ConversationModule {}
