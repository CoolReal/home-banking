import { Component } from '@angular/core';

@Component({
    selector: 'homebanking-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    showLogin: boolean = true;
    showRegister: boolean = false;

    goToLogin() {
        this.showLogin = true;
        this.showRegister = false;
    }

    goToRegister() {
        this.showLogin = false;
        this.showRegister = true;
    }
}
