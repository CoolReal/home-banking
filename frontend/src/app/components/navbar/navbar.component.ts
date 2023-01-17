import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
    selector: 'homebanking-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor(public authService: AuthService, private router: Router) {}

    logout() {
        this.authService.logout();
    }

    goToHome() {
        this.router.navigateByUrl('home')
    }

    goToTransfers() {
        this.router.navigateByUrl('transfers')
    }

    goToPayments() {
        this.router.navigateByUrl('payments')
    }

    goToAccount() {
        this.router.navigateByUrl('account')
    }
}
