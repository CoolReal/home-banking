import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

const emailValidation = require('email-validator');
const passwordValidation = require('password-validator');

const errorMessages: any = {
    min: 'Must have atleast 8 characters',
    uppercase: 'Must have atleast 1 uppercase character',
    lowercase: 'Must have atleast 1 lowercase character',
    digits: 'Must have atleast 1 digit',
    symbols: 'Must have atleast 1 symbol',
};

@Component({
    selector: 'homebanking-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    hidePassword = true;
    hideConfirmPassword = true;

    private passwordSchema = new passwordValidation()
        .is()
        .min(8)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits()
        .has()
        .not()
        .spaces()
        .has()
        .symbols();

    emailValidator = (c: AbstractControl) => {
        return emailValidation.validate(c.value) ? null : c.value;
    };

    passwordValidator = (c: AbstractControl) => {
        const failList = this.passwordSchema.validate(c.value, { list: true });
        let test: any = {};
        for (let failListKey of failList) {
            test[failListKey] = errorMessages[failListKey];
        }
        return this.passwordSchema.validate(c.value) ? null : test;
    };
    @ViewChild('confirmPasswordInput') confirmPasswordInput!: HTMLInputElement;
    @Output('showLogin') showLogin: EventEmitter<any> = new EventEmitter<any>();
    emailForm = new FormControl('', [Validators.required, this.emailValidator]);
    passwordForm = new FormControl('', [
        Validators.required,
        this.passwordValidator,
    ]);
    nameForm = new FormControl();
    validConfirmPassword = true;
    emailError: any;

    constructor(private authService: AuthService) {}

    register() {
        if (this.emailForm.errors || this.passwordForm.errors) {
            return;
        }
        this.emailError = null;
        this.authService
            .register(
                this.emailForm.value,
                this.passwordForm.value,
                this.nameForm.value
            )
            .subscribe({
                error: (error) => {
                    alert(error.error.feedback);
                },
            });
    }

    goToLogin() {
        this.showLogin.emit();
    }

    passwordErrorMessage() {
        let message = '';
        for (let errorsKey in this.passwordForm.errors) {
            message += `${this.passwordForm.errors[errorsKey]}; `;
        }
        return message;
    }
}
