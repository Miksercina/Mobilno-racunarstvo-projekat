import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitTrackerPageRoutingModule } from './habit-tracker-routing.module';

import { HabitTrackerPage } from './habit-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitTrackerPageRoutingModule
  ],
  declarations: [HabitTrackerPage]
})
export class HabitTrackerPageModule {}
