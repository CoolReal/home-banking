import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'homebanking-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @Output('showRegister') showRegister: EventEmitter<any> =
        new EventEmitter<any>();

    emailForm = new FormControl('', [Validators.required]);
    passwordForm = new FormControl('', [Validators.required]);
    loginButtonEnabled = true;

    constructor(private authService: AuthService, private router: Router) {}

    login() {
        this.loginButtonEnabled = false;
        this.authService
            .login(this.emailForm.value, this.passwordForm.value)
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('home');
                    this.loginButtonEnabled = true;
                },
                error: (error) => {
                    this.loginButtonEnabled = true;
                    alert(error.error.feedback)
                },
            });
    }

    goToRegister() {
        this.showRegister.emit();
    }
}
