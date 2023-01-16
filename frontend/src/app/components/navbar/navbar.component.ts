import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'homebanking-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    constructor(public authService: AuthService) {}

    logout(event: Event) {
        event.preventDefault()
        this.authService.logout();
    }
}