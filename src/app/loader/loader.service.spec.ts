import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should show loader', () => {
    service.show();
    expect(service.activeRequests()).toBeGreaterThan(0);
  });
  it('should hide loader', () => {
    service.show();
    service.hide();
    expect(service.activeRequests()).toBe(0);
  });
});
