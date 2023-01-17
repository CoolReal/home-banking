import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BankService {
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}

    getMovements() {
        const url = environment.apiUrl + 'movements';
        return this.httpClient.get(url, {
            headers: this.authService.getAuthHeader(),
        });
    }

    depositFunds(value: number) {
        const url = environment.apiUrl + 'funds';
        return this.httpClient.put(
            url,
            { funds: value },
            { headers: this.authService.getAuthHeader() }
        );
    }

    withdrawFunds(value: number) {
        const url = environment.apiUrl + 'funds?funds=' + value;
        return this.httpClient.delete(url, {
            headers: this.authService.getAuthHeader(),
        });
    }

    getFunds() {
        const url = environment.apiUrl + 'funds';
        return this.httpClient.get(url, {
            headers: this.authService.getAuthHeader(),
        });
    }
}
