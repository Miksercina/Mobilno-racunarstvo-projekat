import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitDetailsPageRoutingModule } from './habit-details-routing.module';

import { HabitDetailsPage } from './habit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitDetailsPageRoutingModule
  ],
  declarations: [HabitDetailsPage]
})
export class HabitDetailsPageModule {}
