import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable()
export class TranslationsLoaderService implements TranslocoLoader {
  constructor(private readonly httpClient: HttpClient) {}

  getTranslation(langPath: string): Observable<Record<string, any>> {
    return this.httpClient.get(`/assets/i18n/${langPath}.json`);
  }
}
