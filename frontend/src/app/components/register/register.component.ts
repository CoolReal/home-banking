import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

const emailValidation = require('email-validator');
const passwordValidation = require('password-validator');

const errorMessages: any = {
    min: '8 characters',
    uppercase: '1 uppercase character',
    lowercase: '1 lowercase character',
    digits: '1 digit',
    symbols: '1 symbol',
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
    registerButtonEnabled = true;
    emailError: any;

    constructor(private authService: AuthService) {}

    register() {
        if (this.emailForm.errors || this.passwordForm.errors) {
            return;
        }
        this.registerButtonEnabled = false;
        this.emailError = null;
        this.authService
            .register(
                this.emailForm.value,
                this.passwordForm.value,
                this.nameForm.value
            )
            .subscribe({
                next: () => {
                    this.registerButtonEnabled = true;
                    this.goToLogin();
                },
                error: (error) => {
                    this.registerButtonEnabled = true;
                    alert(error.error.feedback);
                },
            });
    }

    goToLogin() {
        this.showLogin.emit();
    }

    passwordErrorMessage() {
        let message = 'Must have atleast';
        for (let errorsKey in this.passwordForm.errors) {
            if (errorsKey === 'required') {
                continue;
            }
            message += ` ${this.passwordForm.errors[errorsKey]},`;
        }
        return message.substring(0, message.length - 1);
    }
}
