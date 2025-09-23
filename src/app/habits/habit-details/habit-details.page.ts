import { HabitsService } from './../habitsService';
import { Component, OnInit } from '@angular/core';
import { HabitModel } from '../habit.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habit-details',
  templateUrl: './habit-details.page.html',
  styleUrls: ['./habit-details.page.scss'],
  standalone: false,
})
export class HabitDetailsPage implements OnInit {
  habit: HabitModel = {
    id: 'h1',
    difficulty: 4,
    name: 'Drinking water',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/2006-02-13_Drop-impact.jpg/640px-2006-02-13_Drop-impact.jpg',
    userId: 'xx',
  };

  constructor(
    private route: ActivatedRoute,
    private habitsService: HabitsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const habit = this.habitsService.getHabit(paramMap.get('habitId'));
      if (habit) {
        this.habit = habit;
      } else {
        console.warn('Habit not found');
      }
    });
  }
}
