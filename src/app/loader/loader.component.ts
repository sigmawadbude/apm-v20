import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  Signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  template: ` @if (isLoading()) {
    <div class="overlay">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </div>
    }`,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
    `,
  ],
})
export class LoaderComponent {
  private cdr = inject(ChangeDetectorRef);
  private loader = inject(LoaderService);

  isLoading: Signal<boolean> = computed(() => this.loader.isLoading());

  constructor() {
    effect(() => {
      // Manually mark for check in zoneless mode
      this.cdr.detectChanges();
    });
  }
}
