import { Component } from '@angular/core';

@Component({
  selector: 'homebanking-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  login: boolean = true;
  register: boolean = false;

  showLogin() {
    this.login = true;
    this.register = false;
  }

  showRegister() {
    this.login = false;
    this.register = true;
  }
}
