import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { ArrayIncludesPipe } from './pipes/array-includes.pipe';

@NgModule({
  imports: [CommonModule, TranslocoModule],
  exports: [CommonModule, TranslocoModule, ArrayIncludesPipe],
  declarations: [ArrayIncludesPipe]
})
export class SharedModule {}
