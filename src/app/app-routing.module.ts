import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'habits',
    loadChildren: () =>
      import('./habits/habits.module').then((m) => m.HabitsPageModule),
  },
  {
    path: '',
    redirectTo: 'habits',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./auth/log-in/log-in.module').then((m) => m.LogInPageModule),
  },
  {
    path: 'habit-tracker',
    loadChildren: () =>
      import('./habit-tracker/habit-tracker.module').then(
        (m) => m.HabitTrackerPageModule
      ),
  },  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
