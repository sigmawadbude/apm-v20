import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Star } from './star';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Star', () => {
  let component: Star;
  let fixture: ComponentFixture<Star>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Star],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Star);
    fixture.componentRef.setInput('rating', 3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // unit tests for onClick
  it('should emit rating when clicked', () => {
    spyOn(component.ratingClicked, 'emit');
    component.onClick();
    expect(component.ratingClicked.emit).toHaveBeenCalledWith(
      `The rating 3 was clicked!`);
  });
});
