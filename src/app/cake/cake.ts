import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cake',
  imports: [],
  templateUrl: './cake.html',
  styleUrl: './cake.css',
})
export class Cake {
  @Input() cake!: {
    name: string;
    price: string;
    imageFile: string;
    featured: boolean;
    onSale: boolean;
  };
}
