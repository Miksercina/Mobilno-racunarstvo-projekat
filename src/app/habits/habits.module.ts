import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitsPageRoutingModule } from './habits-routing.module';

import { HabitsPage } from './habits.page';

import { HabitModelComponent } from './habit-model/habit-model.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitsPageRoutingModule,
    SharedModule,
  ],
  declarations: [HabitsPage, HabitModelComponent],
})
export class HabitsPageModule {}
