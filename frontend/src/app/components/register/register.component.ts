import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'homebanking-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    @Output('showLogin') showLogin: EventEmitter<any> = new EventEmitter<any>();

    emailForm = new FormControl('', [Validators.required]);
    passwordForm = new FormControl('', [Validators.required]);
    nameForm = new FormControl();

    constructor(private authService: AuthService) {}

    register() {
        this.authService
            .register(
                this.emailForm.value,
                this.passwordForm.value,
                this.nameForm.value
            )
            .subscribe(() => {
                this.goToLogin();
            });
    }

    goToLogin() {
        this.showLogin.emit();
    }
}
