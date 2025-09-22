import { Component, OnDestroy, OnInit } from '@angular/core';
import { HabitModel } from './habit.model';
import { HabitsService } from './habitsService';
import { ModalController } from '@ionic/angular';
import { HabitModelComponent } from './habit-model/habit-model.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
  standalone: false,
})
export class HabitsPage implements OnInit, OnDestroy {
  habits!: HabitModel[];
  private habitSub!: Subscription;

  constructor(
    private habitsService: HabitsService,
    private modelCtrl: ModalController
  ) {
    // this.habits = this.habitsService.habits;
  }

  ngOnInit() {
    this.habitSub = this.habitsService.habits.subscribe((habits) => {
      this.habits = habits;
    });
  }

  ngOnDestroy() {
    if (this.habitSub) {
      this.habitSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.habitsService.getHabits().subscribe((habits) => {
      // this.habits = habits;
    });
  }

  openModal() {
    this.modelCtrl
      .create({
        component: HabitModelComponent,
        componentProps: { title: 'Add a habit' },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          console.log(resultData);

          this.habitsService
            .addHabit(
              resultData.data.habitData.name,
              resultData.data.habitData.difficulty
            )
            .subscribe((habits) => {
              // this.habits = habits;
            });
        }
      });
  }
}
