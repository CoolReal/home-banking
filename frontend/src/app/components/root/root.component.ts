import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'homebanking-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log(event);
                if (event.url === '/' && this.authService.isLoggedIn()) {
                    this.router.navigateByUrl('home');
                }
            }
        });
    }
}
