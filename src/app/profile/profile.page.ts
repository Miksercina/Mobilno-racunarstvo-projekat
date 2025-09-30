import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  isDisabled: boolean = true;

  user = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

// eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private authService: Auth) {
  }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = {
        name: currentUser.name || '',
        surname: currentUser.surname || '',
        email: currentUser.email || '',
        password: ''
      };
      console.log('User updated:', this.user);
    }
  }

  toggleInput() {
    this.isDisabled = !this.isDisabled;
  }

  saveProfile() {
    this.isDisabled = true;
    this.authService.updateUser(this.user)?.subscribe(() => {
      console.log('User updated:', this.user);
    });
  }
}
