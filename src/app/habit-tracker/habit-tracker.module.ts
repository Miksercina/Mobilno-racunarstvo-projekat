import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitTrackerPageRoutingModule } from './habit-tracker-routing.module';

import { HabitTrackerPage } from './habit-tracker.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitTrackerPageRoutingModule,
    SharedModule,
  ],
  declarations: [HabitTrackerPage],
})
export class HabitTrackerPageModule {}
