import { Component, OnInit } from '@angular/core';
import { HabitModel } from './habit.model';
import { HabitsService } from './habitsService';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
  standalone: false,
})
export class HabitsPage implements OnInit {
  habits: HabitModel[];

  constructor(private habitsService: HabitsService) {
    this.habits = this.habitsService.habits;
  }

  ngOnInit() {}
}
