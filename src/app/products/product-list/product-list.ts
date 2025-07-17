import { LowerCasePipe, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of, Subscription } from 'rxjs';
import { ConvertToSpacesPipe } from '../../shared/convert-to-spaces.pipe';
import { IProduct, ProductService } from '../product';
import { Star } from '../../shared/star';
import { toSignal } from '@angular/core/rxjs-interop';

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
export class ProductList {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = signal<boolean>(false);
  errorMessage = signal('');
  sub!: Subscription;

  productService = inject(ProductService);

  // Use the new Angular signals feature to perform the filter
  listFilter = signal('');

  products = toSignal(
    this.productService.getProducts().pipe(
      catchError((err) => {
        this.errorMessage.set(err);
        return of([] as IProduct[]);
      })
    ),
    { initialValue: [] }
  );

  filteredProducts = computed(() =>
    this.performFilter(this.listFilter(), this.products())
  );

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

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
