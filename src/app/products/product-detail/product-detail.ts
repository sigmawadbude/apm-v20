import { NgIf, LowerCasePipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces.pipe';
import { IProduct, ProductService } from '../product';
import { Star } from '../../shared/star';

@Component({
  selector: 'app-product-detail',
  imports: [NgIf, Star, LowerCasePipe, CurrencyPipe, ConvertToSpacesPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = signal('');
  product = signal<IProduct|null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: string): void {
    this.errorMessage.set('');
    this.productService.getProduct(id).subscribe({
      next: (product) => (product ? this.product.set(product): this.product.set(null)),
      error: (err) => (this.errorMessage.set(err)),
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
