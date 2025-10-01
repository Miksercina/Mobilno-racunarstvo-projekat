import { HabitsService } from './../habitsService';
import { Component, OnInit } from '@angular/core';
import { HabitModel } from '../habit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private habitsService: HabitsService,
    private router: Router,
    private alertCtrl: AlertController
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

  onDelete() {
    this.habitsService.deleteHabit(this.habit.id).subscribe({
      next: () => {
        this.router.navigate(['/habits']);
        this.alertCtrl
          .create({
            header: 'Deletion complete!',
            message: 'Deleted!',
            buttons: ['Fine'],
          })
          .then((alert) => {
            alert.present();
          });
      },
      error: (err) => {
        console.log('Deleting failed');
      },
    });
  }
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }


  saveHabit() {
    this.habitsService
      .updateHabit(this.habit.id, {
        name: this.habit.name,
        difficulty: this.habit.difficulty,
      })
      .subscribe(() => {
        console.log('Habit updated:', this.habit);
        this.isEditMode = false;
      });
  }
}
