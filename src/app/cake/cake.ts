import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

export interface Cake {
  name: string;
  price: string;
  imageFile: string;
  featured: boolean;
  onSale: boolean;
}
@Component({
  selector: 'app-cake',
  imports: [NgClass],
  templateUrl: './cake.html',
  styleUrl: './cake.css',
})
export class Cake {
  cake = input.required<Cake>();

  baseStyles: string =
    'p-4 w-full mx-auto relative border-2 border-gray-200 bg-white';

  get featuredStyles(): string {
    return this.cake().featured ? 'border-4 border-green-500' : '';
  }

  get saleStyles(): string {
    return this.cake().onSale ? 'border-4 border-blue-500' : '';
  }

  get combinedStyles(): string {
    return twMerge(this.baseStyles, this.saleStyles, this.featuredStyles);
  }
}
