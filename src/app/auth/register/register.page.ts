import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('Milan', Validators.required),
      lastname: new FormControl('Vukasinovic', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  onLogInClick() {
    this.router.navigateByUrl('/log-in');
  }

  onRegister() {
    this.loadingController
      .create({ message: 'Registering in progress...' })
      .then((loadingElement) => {
        loadingElement.present();

        this.authService
          .register(this.registerForm.value)
          .subscribe((resData) => {
            console.log('Successful registration');
            console.log(resData);
            loadingElement.dismiss();
            this.router.navigateByUrl('/log-in');
          });
      });
  }
}
