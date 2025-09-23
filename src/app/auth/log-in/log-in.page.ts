import { Route, Router } from '@angular/router';
import { Auth } from './../auth';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: false,
})
export class LogInPage implements OnInit {
  isLoading = false;
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.auth.login(form.value).subscribe((resData) => {
      console.log('Log in successful');
      console.log(resData);
      this.isLoading = false;
      this.router.navigateByUrl('/habits');
    });

    // console.log(form);
  }
}
