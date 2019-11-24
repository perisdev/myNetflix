import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl='http://localhost:3000/movies';

  constructor(private httpClient:HttpClient) { }

  getMovies(listType:String):Observable<object>{

    let tmpUrl:string;

    if (listType === 'genre')
       tmpUrl = `${this.apiUrl}/?genre=war`;
    else
       tmpUrl = `${this.apiUrl}/${listType}`;

    return this.httpClient.get(tmpUrl);
  }
  
}
