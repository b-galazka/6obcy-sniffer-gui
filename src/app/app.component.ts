import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AppLoaderService } from './modules/core/services/app-loader.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private readonly appLoaderService: AppLoaderService) {}

  ngOnInit(): void {
    this.appLoaderService.initRoutingLoader();
  }
}
