import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitTrackerPage } from './habit-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: HabitTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitTrackerPageRoutingModule {}
