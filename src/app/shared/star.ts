import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'pm-star',
  template: `
    <div
      class="crop"
      [style.width.px]="cropWidth()"
      [title]="rating()"
      (click)="onClick()"
    >
      <div class="stars">
        @for (_ of stars; track $index) {
        <span class="fa fa-star"></span>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .crop {
        overflow: hidden;
      }
      .stars {
        width: 75px;
        cursor: pointer;
      }
      .fa-star {
        color: #ffc107;
      }
    `,
  ],
})
export class Star {
  rating = input.required<number>();
  cropWidth = computed(() => (this.rating() * 75) / 5);
  ratingClicked = output<string>();

  readonly stars = Array(5);

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating()} was clicked!`);
  }
}
