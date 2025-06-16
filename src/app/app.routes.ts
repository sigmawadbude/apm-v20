import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductList } from './products/product-list/product-list';

export const routes: Routes = [
  { path: 'welcome', component: Home },
  { path: 'products', component: ProductList},
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
