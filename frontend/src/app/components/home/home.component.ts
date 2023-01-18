import { Component, OnInit, ViewChild } from '@angular/core';
import { BankService } from '../../services/bank.service';
import { FormControl } from '@angular/forms';
import { MovementsComponent } from '../movements/movements.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'homebanking-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    fundsForm: FormControl = new FormControl();
    wallet: any = {};
    @ViewChild('movementsComponent') movementsComponent!: MovementsComponent;
    depositButtonEnabled = true;
    withdrawButtonEnabled = true;

    constructor(
        private bankService: BankService,
        public authService: AuthService
    ) {}

    ngOnInit() {
        this.getFunds();
    }

    getFunds() {
        this.bankService.getFunds().subscribe((data) => {
            this.wallet = (<any>data).wallet;
        });
    }

    depositFunds() {
        this.depositButtonEnabled = false;
        this.bankService
            .depositFunds(parseFloat(this.fundsForm.value))
            .subscribe({
                next: () => {
                    this.getFunds();
                    this.movementsComponent.refreshMovements();
                    this.fundsForm.reset();
                    this.depositButtonEnabled = true;
                },
                error: (error) => {
                    this.depositButtonEnabled = true;
                    alert(error.error.feedback);
                }
            });
    }

    withdrawFunds() {
        this.withdrawButtonEnabled = false;
        this.bankService
            .withdrawFunds(parseFloat(this.fundsForm.value))
            .subscribe({
                next: () => {
                    this.getFunds();
                    this.movementsComponent.refreshMovements();
                    this.fundsForm.reset();
                    this.withdrawButtonEnabled = true;
                },
                error: (error) => {
                    alert(error.error.feedback);
                    this.withdrawButtonEnabled = true;
                }
            });
    }

    greeting() {
        let greeting = 'Hello';
        if (this.authService.user?.name) {
            greeting += ', ' + this.authService.user.name;
        }
        return greeting + '!';
    }
}
