import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppLoaderService } from './app-loader.service';

describe('AppLoaderService', () => {
  let service: AppLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AppLoaderService]
    });

    service = TestBed.inject(AppLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
