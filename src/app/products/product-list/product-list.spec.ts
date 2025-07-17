import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';
import { provideZonelessChangeDetection } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IProduct } from '../product';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList, RouterTestingModule, HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle rating clicked', () => {
    const message = 'The rating 5 was clicked!';
    component.onRatingClicked(message);
    expect(component.pageTitle).toEqual('Product List: ' + message);
  });

  it('should toggle image visibility', () => {
    const initialVisibility = component.showImage();
    component.toggleImage();
    expect(component.showImage()).toBe(!initialVisibility);
  });

  // ut for performFilter
  it('should filter products correctly using performFilter', () => {
    const mockProducts: IProduct[] = [
      {
        id: '1',
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2021',
        description: 'Leaf rake with 48-inch wooden handle.',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/leaf_rake.png',
      },
      {
        id: '2',
        productName: 'Garden Cart',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2021',
        description: '15 gallon capacity rolling garden cart',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/garden_cart.png',
      },
      {
        id: '3',
        productName: 'Hammer',
        productCode: 'TBX-0048',
        releaseDate: 'May 21, 2021',
        description: 'Curved claw steel hammer',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/hammer.png',
      },
    ];

    // Test with a filter that matches some products
    let filtered = component.performFilter('garden', mockProducts);
    expect(filtered.length).toBe(1);
    expect(filtered[0].productName).toBe('Garden Cart');

    // Test with a filter that matches no products
    filtered = component.performFilter('xyz', mockProducts);
    expect(filtered.length).toBe(0);

    // Test with an empty filter
    filtered = component.performFilter('', mockProducts);
    expect(filtered.length).toBe(mockProducts.length);

    // Test with case-insensitivity
    filtered = component.performFilter('rake', mockProducts);
    expect(filtered.length).toBe(1);
    expect(filtered[0].productName).toBe('Leaf Rake');
  });
});
