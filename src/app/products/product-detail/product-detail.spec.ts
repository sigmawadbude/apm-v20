import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetail } from './product-detail';
import { provideZonelessChangeDetection } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail, RouterTestingModule, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // getProduct METHOD
  it('should set product when getProduct is called with a valid ID', () => {
    const mockProduct = {
      id: '1',
      productName: 'Test Product',
      productCode: 'TP-001',
      releaseDate: '2023-01-01',
      description: 'Test product description',
      price: 100,
      starRating: 4.5,
      imageUrl: 'assets/images/test_product.png',
    };
    spyOn(component.productService, 'getProduct').and.returnValue(
      of(mockProduct)
    );

    component.getProduct('1');
    expect(component.product()).toEqual(mockProduct);
  });

  // unit test for getProduct with invalid ID
  it('should set product to null when getProduct is called with an invalid ID', () => {
    spyOn(component.productService, 'getProduct').and.returnValue(of(undefined));

    component.getProduct('invalid-id');
    expect(component.product()).toBeNull();
  });

});
