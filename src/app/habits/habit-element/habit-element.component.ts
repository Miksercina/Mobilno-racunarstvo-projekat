import { Component, Input, OnInit } from '@angular/core';
import { HabitModel } from '../habit.model';

@Component({
  selector: 'app-habit-element',
  templateUrl: './habit-element.component.html',
  styleUrls: ['./habit-element.component.scss'],
  standalone: false,
})
export class HabitElementComponent implements OnInit {
  @Input() habit: HabitModel = {
    id: '3',
    name: 'Kok',
    difficulty: 8,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/2006-02-13_Drop-impact.jpg/640px-2006-02-13_Drop-impact.jpg',
  };

  constructor() {}

  ngOnInit() {}
}
