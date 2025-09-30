import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './user.model';
import { HabitsService } from '../habits/habitsService';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name?: string;
  surname?: string;
  //opciono
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _isUserAuthenticated = false;
  private _user = new BehaviorSubject<User | null>(null);
  user: User | null | undefined;

  constructor(private http: HttpClient) {}

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token; //vraca boolean to je !! operator
        } else {
          return false;
        }
      })
    );
  }

  register(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this._user.next(user);
        })
      );
  }

  getToken() {
    if (this.user) return this.user.token;
    else return null;
  }

  getUserId() {
    if (this.user) return this.user.id;
    else return null;
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  login(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const user = new User(
            userData.localId,
            userData.email,
            userData.idToken,
            expirationTime
          );
          this._user.next(user);
        })
      );
  }
  getCurrentUser() {
    return this._user.value;
  }
  updateUser(userData: { name: string; surname: string; email: string }) {
    const userId = this._user.value?.id;
    if (!userId) return;

    return this.http.put(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}/users/${userId}.json?auth=${this._user.value?.token}`,
      userData
    );
  }

  logout() {
    this._user.next(null);
    //this.habitsService.resetHabits();
  }
}
