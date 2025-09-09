import { Component, OnInit } from '@angular/core';
import { HabitModel } from './habit.model';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
  standalone: false,
})
export class HabitsPage implements OnInit {
  habits: HabitModel[] = [
    { id: 'h1', difficulty: 4, name: 'Drinking water' },
    { id: 'h2', difficulty: 8, name: 'Regular gym going' },
    { id: 'h3', difficulty: 10, name: 'Stop smoking' },
  ];

  constructor() {}

  ngOnInit() {}
}
