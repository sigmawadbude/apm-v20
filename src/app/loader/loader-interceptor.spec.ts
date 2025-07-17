import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { loaderInterceptor } from './loader-interceptor';
import { LoaderService } from './loader.service';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('loaderInterceptor', () => {
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => loaderInterceptor(req, next));

  beforeEach(() => {
    loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: LoaderService, useValue: loaderServiceSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show loader before request and hide after response', () => {
    const req = {} as any; // Mock request
    const next = () => of({} as any); // Mock next handler

    interceptor(req, next).subscribe();

    expect(loaderServiceSpy.show).toHaveBeenCalled();
    expect(loaderServiceSpy.hide).toHaveBeenCalled();
  });
});
