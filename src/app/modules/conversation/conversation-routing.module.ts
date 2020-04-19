import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConversationGuard } from './guards/conversation.guard';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';

const routes: Routes = [
  { path: '', component: ConversationPageComponent, canActivate: [ConversationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ConversationGuard],
  exports: [RouterModule]
})
export class ConversationRoutingModule {}
