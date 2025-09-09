import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitTrackerPage } from './habit-tracker.page';

describe('HabitTrackerPage', () => {
  let component: HabitTrackerPage;
  let fixture: ComponentFixture<HabitTrackerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
