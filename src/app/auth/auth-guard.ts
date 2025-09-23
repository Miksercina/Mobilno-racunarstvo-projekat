import { Injectable } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Auth } from './auth';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: Auth, private router: Router) {}

  canMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return this.authService.isUserAuthenticated.pipe(
      take(1),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/log-in');
        }
      })
    );
  };
}
