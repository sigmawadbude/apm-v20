import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const id = route.paramMap.get('id');

    // Validate MongoDB ObjectId (24 hex characters)
    const isValidMongoId = /^[a-fA-F0-9]{24}$/.test(id ?? '');

    if (!isValidMongoId) {
      alert('Invalid product ID');
      this.router.navigate(['/products']);
      return false;
    }

    return true;
  }
}
