import { Injectable } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: Auth, private router: Router) {}

  canMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    if (!this.authService.isUserAuthenticated) {
      this.router.navigateByUrl('/log-in');
    }
    return this.authService.isUserAuthenticated;
  };
}
