import { Component, OnDestroy, OnInit } from '@angular/core';
import { HabitModel } from '../habits/habit.model';
import { HabitsService } from '../habits/habitsService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.page.html',
  styleUrls: ['./habit-tracker.page.scss'],
  standalone: false,
})
export class HabitTrackerPage implements OnInit, OnDestroy {
  habits!: HabitModel[];
  private habitSub!: Subscription;
  constructor(private habitsService: HabitsService) {}

  ngOnInit(): void {
    this.habitSub = this.habitsService.getHabitsByUser().subscribe((habits) => {
      this.habits = habits;
    });
  }

  ngOnDestroy() {
    if (this.habitSub) {
      this.habitSub.unsubscribe();
    }
  }
}
