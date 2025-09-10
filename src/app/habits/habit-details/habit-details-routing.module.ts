import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitDetailsPage } from './habit-details.page';

const routes: Routes = [
  {
    path: '',
    component: HabitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitDetailsPageRoutingModule {}
