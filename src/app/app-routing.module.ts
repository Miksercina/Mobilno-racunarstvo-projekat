import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import {AnalyticsPageModule} from "./analytics/analytics.module";
import { AnalyticsPage } from './analytics/analytics.page';

const routes: Routes = [
  {
    path: 'habits',
    loadChildren: () =>
      import('./habits/habits.module').then((m) => m.HabitsPageModule),
    canMatch: [AuthGuard],
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
    canMatch: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canMatch: [AuthGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsPage,
    canMatch: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
    canMatch: [AuthGuard],
  },
  {
    path: 'leaderboard',
    loadChildren: () =>
      import('./leaderboard/leaderboard.module').then(
        (m) => m.LeaderboardPageModule
      ),
    canMatch: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
