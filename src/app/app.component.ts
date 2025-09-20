import { Component } from '@angular/core';
import { Auth } from './auth/auth';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  hideFooter = false;
  url = this.router.url;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    // if (this.url === '/') {
    //   this.hideFooter = true;
    // }
  }

  onLogOut() {
    this.auth.logout();
  }
}
