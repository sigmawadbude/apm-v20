import { NgIf, NgFor, LowerCasePipe, CurrencyPipe } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces.pipe';
import { IProduct, ProductService } from '../product';
import { Star } from '../../shared/star';

@Component({
  selector: 'app-product-list',
  imports: [
    FormsModule,
    RouterLink,
    Star,
    LowerCasePipe,
    CurrencyPipe,
    ConvertToSpacesPipe,
  ],
  templateUrl: './product-list.html',
  styles: [
    `
      th {
        color: #337ab7;
      }
    `,
  ],
})
export class ProductList implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = signal<boolean>(false);
  errorMessage = signal('');
  sub!: Subscription;

  // Use the new Angular signals feature to perform the filter
  listFilter = signal('');
  filteredProducts = computed(() =>
    this.performFilter(this.listFilter(), this.products())
  );

  products = signal<IProduct[]>([]);

  constructor(private productService: ProductService) {}

  performFilter(filterBy: string, products: IProduct[]): IProduct[] {
    const filter = filterBy.toLocaleLowerCase();
    return products.filter((product) =>
      product.productName.toLocaleLowerCase().includes(filter)
    );
  }

  toggleImage(): void {
    this.showImage.set(!this.showImage());
    console.log('Toggled: ', this.showImage());
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => this.products.set(products),
      error: (err) => (this.errorMessage.set(err)),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onFilterChange(value: string) {
    this.listFilter.set(value);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}

