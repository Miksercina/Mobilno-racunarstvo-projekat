import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitsPage } from './habits.page';

const routes: Routes = [
  {
    path: '',
    component: HabitsPage,
  },
  {
    path: ':habitId',
    loadChildren: () =>
      import('./habit-details/habit-details.module').then(
        (m) => m.HabitDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitsPageRoutingModule {}
