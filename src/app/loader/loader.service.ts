import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  readonly activeRequests = signal(0);
  private isPending = signal(false);
  readonly isLoading = signal(false); // Exposed signal for UI

  private showDelay = 150; // ms before showing loader
  private minVisibleTime = 300; // ms loader should remain visible

  private showTimeoutId: any = null;
  private hideTimeoutId: any = null;
  private loaderShownAt: number | null = null;

  constructor() {
    effect(() => {
      const count = this.activeRequests();

      if (count > 0 && !this.isPending()) {
        this.isPending.set(true);

        this.showTimeoutId = setTimeout(() => {
          this.loaderShownAt = Date.now();
          this.isLoading.set(true);
        }, this.showDelay);
      }

      if (count === 0 && this.isPending()) {
        this.isPending.set(false);

        if (this.showTimeoutId) {
          clearTimeout(this.showTimeoutId);
          this.showTimeoutId = null;
        }

        const now = Date.now();
        const shownFor = this.loaderShownAt ? now - this.loaderShownAt : 0;
        const remainingTime = this.minVisibleTime - shownFor;

        if (this.isLoading()) {
          this.hideTimeoutId = setTimeout(
            () => {
              this.isLoading.set(false);
              this.loaderShownAt = null;
            },
            remainingTime > 0 ? remainingTime : 0
          );
        }
      }
    });
  }

  show() {
    this.activeRequests.update((n) => n + 1);
  }

  hide() {
    this.activeRequests.update((n) => Math.max(0, n - 1));
  }
}
