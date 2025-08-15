import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

//TODO Navigacija sa login na register i obrnuto
//TODO prikaz poruke o uspesnoj/neuspesnoj registraciji (alert kao kod login stranice)
//TODO upravljanje greskama
//TODO dodati cekalice (spiner ili loader) tokom trajanja registracije
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl('Jelica', Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }
  ngOnInit() {}

  onRegister() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe((resData) => {
      console.log('Registracija je uspela');
      console.log(resData);
    });
  }
}
