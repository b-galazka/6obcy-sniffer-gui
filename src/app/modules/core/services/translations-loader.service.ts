import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoLoader } from '@ngneat/transloco';
import { defer, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppLoaderService } from './app-loader.service';

@Injectable()
export class TranslationsLoaderService implements TranslocoLoader {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly appLoaderService: AppLoaderService
  ) {}

  getTranslation(langPath: string): Observable<Record<string, any>> {
    return defer(() => {
      this.appLoaderService.showLoader();

      return this.httpClient
        .get<Record<string, any>>(`/assets/i18n/${langPath}.json`)
        .pipe(finalize(() => this.appLoaderService.hideLoader()));
    });
  }
}
