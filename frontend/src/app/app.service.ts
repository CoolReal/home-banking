import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {
    this.register();
  }

  register() {
    this.http
      .post('http://localhost:4000/subscribe', {
        email: 'nrcsilva2001@gmail.com',
        password: 'askjdhashjdaojd',
      })
      .pipe()
      .subscribe((data) => console.log(data));
  }
}
