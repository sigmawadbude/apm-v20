import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';
import { provideZonelessChangeDetection } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

});
