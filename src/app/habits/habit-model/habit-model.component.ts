import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-habit-model',
  templateUrl: './habit-model.component.html',
  styleUrls: ['./habit-model.component.scss'],
  standalone: false,
})
export class HabitModelComponent implements OnInit {
  @ViewChild('f', { static: true }) form!: NgForm;
  @Input() title!: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddHabit() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        habitData: {
          habit: this.form.value['habit'],
          difficulty: this.form.value['difficulty'],
        },
      },
      'confirm'
    );
  }
}
