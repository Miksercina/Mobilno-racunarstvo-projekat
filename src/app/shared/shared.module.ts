import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HabitElementComponent } from '../habits/habit-element/habit-element.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HabitElementComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [HabitElementComponent, RouterModule],
})
export class SharedModule {}
