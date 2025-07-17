import { LowerCasePipe, CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces.pipe';
import { IProduct, ProductService } from '../product';
import { Star } from '../../shared/star';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [Star, LowerCasePipe, CurrencyPipe, ConvertToSpacesPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  errorMessage = signal('');
  product = signal<IProduct | null>(null);
  private destroy$ = new Subject<void>();

  constructor(
    public route: ActivatedRoute,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: string): void {
    this.errorMessage.set('');
    this.productService
      .getProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product) =>
          product ? this.product.set(product) : this.product.set(null),
        error: (err) => this.errorMessage.set(err),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
