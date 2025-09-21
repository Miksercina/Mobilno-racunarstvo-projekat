import { Component, Input, OnInit } from '@angular/core';
import { HabitModel } from '../habit.model';
import { AlertController } from '@ionic/angular';

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

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  openAlert() {
    this.alertCtrl //Vraca promise, zato pravimo .then deo
      .create({
        header: 'Saving habit',
        message: 'You sure you wanna save the habit?',
        buttons: [
          {
            text: 'Save',
            handler: () => {
              console.log('Saved!');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Canceled!');
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
