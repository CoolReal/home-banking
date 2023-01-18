import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export interface RecipientData {
    recipientName?: string;
    recipientEmail?: string;
    description?: string;
}

@Injectable({
    providedIn: 'root',
})
export class BankService {
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}

    getFunds() {
        const url = environment.apiUrl + 'funds';
        return this.httpClient.get(url, {
            headers: this.authService.getAuthHeader(),
        });
    }

    withdrawFunds(value: number) {
        const url = environment.apiUrl + 'funds?funds=' + value;
        return this.httpClient.delete(url, {
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

    getMovements() {
        const url = environment.apiUrl + 'movements';
        return this.httpClient.get(url, {
            headers: this.authService.getAuthHeader(),
        });
    }

    getInternalMovements() {
        const url = environment.apiUrl + 'internalMovements';
        return this.httpClient.get(url, {
            headers: this.authService.getAuthHeader(),
        });
    }

    getPayments() {
        const url = environment.apiUrl + 'payments';
        return this.httpClient.get(url, {
            headers: this.authService.getAuthHeader(),
        });
    }

    getTransfers() {
        const url = environment.apiUrl + 'transfers';
        return this.httpClient.get(url, {
            headers: this.authService.getAuthHeader(),
        });
    }

    makeTransfer(
        recipientWalletId: string,
        transactionValue: any,
        recipientData: RecipientData
    ) {
        const url = environment.apiUrl + 'transfers';
        const data = { recipientWalletId, transactionValue, recipientData };
        return this.httpClient.post(url, data, {
            headers: this.authService.getAuthHeader(),
        });
    }

    makePayment(entity: string, reference: string, transactionValue: string) {
        const url = environment.apiUrl + 'payments';
        const data = { entity, reference, transactionValue };
        return this.httpClient.post(url, data, {
            headers: this.authService.getAuthHeader(),
        });
    }
}
