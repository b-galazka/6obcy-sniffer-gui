import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';

// TODO: add layouts
const routes: Routes = [{ path: '', component: ConversationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationRoutingModule {}
