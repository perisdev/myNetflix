import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isRegisted:boolean = false;

  constructor(private httpClient: HttpClient) { }

  register(body:object):Observable<object>{
    return this.httpClient.post('http://localhost:3000/user/register', body);
  };

  login(user:User):Observable<object>{
    return this.httpClient.post('http://localhost:3000/user/login', user);
  };
}
