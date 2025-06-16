import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductList } from './products/product-list/product-list';
import { ProductDetail } from './products/product-detail/product-detail';
import { ProductDetailGuard } from './products/product-detail/product-detail.guard';

export const routes: Routes = [
  { path: 'welcome', component: Home },
  { path: 'products', component: ProductList },
  {
    path: 'products/:id',
    canActivate: [ProductDetailGuard],
    component: ProductDetail,
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];
