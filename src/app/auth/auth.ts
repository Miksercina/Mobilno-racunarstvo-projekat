import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _isUserAuthenticated = false;

  constructor() {}

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated;
  }

  login() {
    this._isUserAuthenticated = true;
  }

  logout() {
    this._isUserAuthenticated = false;
  }
}
