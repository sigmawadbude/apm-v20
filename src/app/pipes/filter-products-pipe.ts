import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../products/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {
  

  transform(products: IProduct[], filterBy: string): IProduct[] {
    if (!products || !filterBy?.trim()) {
      return products ?? [];
    }
    const filter = filterBy.toLowerCase();
    return products.filter((product) =>
      product.productName.toLowerCase().includes(filter)
    );
  }
}
