import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'homebanking-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    @Input()
    loginButton!: MatButton;
    emailForm = new FormControl('', [Validators.required]);
    passwordForm = new FormControl('', [Validators.required]);
    nameForm = new FormControl();

    constructor(private authService: AuthService) {}

    register(event: Event) {
        event.preventDefault();
        const value = this.authService
            .register(
                this.emailForm.value,
                this.passwordForm.value,
                this.nameForm.value
            )
            .subscribe((data) => {
                console.log(data);
                this.loginButton._elementRef.nativeElement.click();
            });
    }
}
