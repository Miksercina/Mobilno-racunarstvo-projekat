import { Component, OnInit } from '@angular/core';
import { HabitModel } from '../habits/habit.model';
import { Subscription } from 'rxjs';
import { HabitsService } from '../habits/habitsService';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: false,
})
export class LeaderboardPage implements OnInit {
  habits!: HabitModel[];
  leaderboard: { name: string; count: number }[] = [];
  constructor(private habitsService: HabitsService) {}

  ngOnInit(): void {
    this.habitsService.getLeaderboard().subscribe((data) => {
      console.log('Leaderboard:', data);
      this.leaderboard = data;
    });
  }
}
