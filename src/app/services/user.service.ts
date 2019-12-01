import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: object;

  constructor(private httpClient: HttpClient) { }

  // EndPoints
  register(body: object): Observable<object> {
    return this.httpClient.post('http://localhost:3000/user/register', body);
  };

  login(body: object): Observable<object> {
    return this.httpClient.post('http://localhost:3000/user/login', body);
  };

  getProfile(token: string): Observable<object> {
    return this.httpClient.get('http://localhost:3000/user/profile', {
      headers: {
        key: token
      }
    })
  }

  logout(token: string): Observable<object> {
    return this.httpClient.get('http://localhost:3000/user/logout', {
      headers: {
        key: token
      }
    })
  }
  // ...

  // getters & setters
  getUser(): object {
    return this.user;
  }

  setUser(user: object, token: string): void {
    this.user = user;

    if (user){
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }

  getUserLen():boolean{
    
    let len = Object.keys(this.user).length;
    return (len >= 6)? true:false;
  }
  // ...
}
