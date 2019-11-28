import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl='http://localhost:3000/movies';
  noGenres: Array<String> = ['popular', 'premieres', 'latest'];

  constructor(private httpClient:HttpClient) { }

  getMovies(listType:String):Observable<object>{

    let tmpUrl:string;

    if (this.noGenres.includes(listType))
      tmpUrl = `${this.apiUrl}/${listType}`;
    else
      tmpUrl = `${this.apiUrl}/?genre=${listType}`;

    return this.httpClient.get(tmpUrl);
  }

  getGenres():Observable<object> {
    return this.httpClient.get(this.apiUrl + "/genres");
  }
}
