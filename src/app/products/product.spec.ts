import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService, IProduct } from './product';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  const mockProducts: IProduct[] = [
    {
      id: '1',
      productName: 'Laptop',
      productCode: 'LT-001',
      releaseDate: '2023-01-01',
      price: 1000,
      description: 'High-end laptop',
      starRating: 4.5,
      imageUrl: 'http://example.com/laptop.jpg',
    },
    {
      id: '2',
      productName: 'Phone',
      productCode: 'PH-001',
      releaseDate: '2023-02-01',
      price: 500,
      description: 'Smartphone device',
      starRating: 4.0,
      imageUrl: 'http://example.com/phone.jpg',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // ensures no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products (getProducts)', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/products'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // simulate response
  });

  it('should return a product by ID (getProduct)', () => {
    const product = mockProducts[0];
    service.getProduct('1').subscribe((result) => {
      expect(result).toEqual(product);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/products/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(product);
  });

  it('should handle server-side error in getProducts', () => {
    spyOn(console, 'error');

    service.getProducts().subscribe({
      next: () => fail('should have failed with a server error'),
      error: (err) => {
        expect(err).toContain('Server returned code: 500');
      },
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/products'
    );

    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should handle client-side error in getProducts', () => {
    spyOn(console, 'error');

    service.getProducts().subscribe({
      next: () => fail('should have failed with a client-side error'),
      error: (err) => {
        expect(err).toContain('An error occurred: Network down');
      },
    });

    const errorEvent = new ErrorEvent('Network error', {
      message: 'Network down',
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/products'
    );

    req.error(errorEvent); // Simulates a client-side error
  });


  it('should handle error in getProduct', () => {
    spyOn(console, 'error');

    service.getProduct('99').subscribe({
      next: () => fail('should have failed with error'),
      error: (err) => {
        expect(err).toContain('Server returned code: 404');
      },
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/products/99'
    );
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
