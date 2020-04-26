import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { getClassMethodsNames } from '../../shared/utils/get-class-methods-names.util';
import { AppLoaderService } from './app-loader.service';
import { TranslationsLoaderService } from './translations-loader.service';

describe('TranslationsLoaderService', () => {
  let service: TranslationsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TranslationsLoaderService,
        {
          provide: AppLoaderService,
          useValue: jasmine.createSpyObj(getClassMethodsNames(AppLoaderService))
        }
      ]
    });
    service = TestBed.inject(TranslationsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
