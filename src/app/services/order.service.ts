import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getPrices(movieType: Number): Observable<object> {
    return this.httpClient.get(this.apiUrl + 'price/?type=' + movieType);
  }

  getCities(): Observable<object> {
    return this.httpClient.get(this.apiUrl + 'cities');
  }

  order(body: object, token: string): Observable<object> {
    return this.httpClient.post(this.apiUrl + 'order', body, {
      headers: {
        key: token
      }
    });
  };
}
