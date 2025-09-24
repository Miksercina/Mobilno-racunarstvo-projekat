import { Route, Router } from '@angular/router';
import { Auth } from './../auth';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: false,
})
export class LogInPage implements OnInit {
  isLoading = false;
  constructor(
    private auth: Auth,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.isLoading = true;

    if (form.valid) {
      this.auth.login(form.value).subscribe(
        (resData) => {
          this.isLoading = false;
          this.router.navigateByUrl('/habits');
        },
        (errRes) => {
          this.isLoading = false;
          let message = 'Email or password are incorrect!';

          this.alertCtrl
            .create({
              header: 'Authentication failed!',
              message: message,
              buttons: ['Fine'],
            })
            .then((alert) => {
              alert.present();
            });
        }
      );
    }
  }

  // console.log(form);
}
