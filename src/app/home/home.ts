import { Component } from '@angular/core';

@Component({
  template: `<div class="card">
    <div class="card-header">
      {{ pageTitle }}
    </div>
    <div class="card-body">
      <div class="container-fluid">
        <div class="text-center">
          <img
            src="./assets/images/logo.jpg"
            class="img-responsive center-block"
            style="max-height:300px;padding-bottom:50px"
          />
        </div>

        <div class="text-center">Developed by:</div>
        <div class="text-center">
          <h3>Sigma Wadbude</h3>
        </div>
      </div>
    </div>
  </div>`,
})
export class Home {
  protected pageTitle = 'Welcome';
}
