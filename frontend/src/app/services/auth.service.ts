import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authHeader?: string;

    constructor(private http: HttpClient, private router: Router) {}

    register(email: string | null, password: string | null, name?: string) {
        const url = environment.apiUrl + 'subscribe';
        return this.http.post(url, { email, password, name }).pipe(
            catchError((error) => {
                return throwError(() => new Error(error));
            })
        );
    }

    login(email: string | null, password: string | null) {
        const url = environment.apiUrl + 'login';
        return this.http
            .post(url, { email, password }, { observe: 'response' })
            .pipe(
                map((res: HttpResponse<any>) => {
                    const header = res.headers.get('Authorization');
                    if (header) {
                        this.authHeader = header;
                        return { success: true };
                    }
                    return { success: false, feedback: <string>res.body };
                })
            );
    }

    isLoggedIn() {
        return !!this.authHeader;
    }

    logout() {
        this.authHeader = undefined;
        this.router.navigateByUrl('');
    }
}
