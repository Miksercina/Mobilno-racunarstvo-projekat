import { Component, OnInit } from '@angular/core';
import { HabitModel } from './habit.model';
import { HabitsService } from './habitsService';
import { ModalController } from '@ionic/angular';
import { HabitModelComponent } from './habit-model/habit-model.component';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
  standalone: false,
})
export class HabitsPage implements OnInit {
  habits: HabitModel[];

  constructor(
    private habitsService: HabitsService,
    private modelCtrl: ModalController
  ) {
    this.habits = this.habitsService.habits;
  }

  ngOnInit() {}

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
        }
      });
  }
}
