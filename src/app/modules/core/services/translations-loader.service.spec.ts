import { TestBed } from '@angular/core/testing';

import { TranslationsLoaderService } from './translations-loader.service';

describe('TranslationsLoaderService', () => {
  let service: TranslationsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
