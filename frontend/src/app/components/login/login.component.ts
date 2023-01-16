import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
    selector: 'homebanking-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    emailForm = new FormControl('', [Validators.required]);
    passwordForm = new FormControl('', [Validators.required]);

    constructor(private authService: AuthService, private router: Router) {}

    login(event: Event) {
        event.preventDefault();
        this.authService
            .login(this.emailForm.value, this.passwordForm.value)
            .subscribe(() => this.router.navigateByUrl('home'));
    }
}