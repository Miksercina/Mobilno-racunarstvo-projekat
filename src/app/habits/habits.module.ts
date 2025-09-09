import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitsPageRoutingModule } from './habits-routing.module';

import { HabitsPage } from './habits.page';
import { HabitElementComponent } from './habit-element/habit-element.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HabitsPageRoutingModule],
  declarations: [HabitsPage, HabitElementComponent],
})
export class HabitsPageModule {}
