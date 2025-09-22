import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  isDisabled: boolean = true;
  constructor() {}

  ngOnInit() {}
  toggleInput() {
    this.isDisabled = !this.isDisabled;
  }
}
