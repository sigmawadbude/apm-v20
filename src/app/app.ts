import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LoaderComponent],
  template: `<nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand">{{ pageTitle }}</a>
      <ul class="nav nav-pills">
        <li>
          <a class="nav-link" routerLinkActive="active" routerLink="/welcome"
            >Home</a
          >
        </li>
        <li>
          <a class="nav-link" routerLinkActive="active" routerLink="/products"
            >Product List</a
          >
        </li>
        <li>
          <a class="nav-link" routerLinkActive="active" routerLink="/about"
            >About</a
          >
        </li>
      </ul>
    </nav>
    <div class="container">
      <app-loader />
      <router-outlet></router-outlet>
    </div>`,
  styles: [
    `
      .nav-link {
        font-size: large;
      }
    `,
  ],
})
export class App {
  protected pageTitle = 'Acme Product Management';
}
