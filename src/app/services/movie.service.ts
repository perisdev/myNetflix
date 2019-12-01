import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl = 'http://localhost:3000/';
  noGenres: Array<String> = ['popular', 'premieres', 'latest'];

  constructor(private httpClient: HttpClient) { }

  getMovies(params: any): Observable<object> {

    let tmpUrl: string;

    if (params.params.listType !== 'title') {

      // popular, premieres, latest
      if (this.noGenres.includes(params.params.listType))
        tmpUrl = `${this.apiUrl}movies/${params.params.listType}`;

      // filter by genre
      else
        tmpUrl = `${this.apiUrl}movies/?genre=${params.params.listType}`;

    } else {
      // filter by title
      tmpUrl = `${this.apiUrl}movies/?title=${params.params.title}`;
    }

    return this.httpClient.get(tmpUrl);
  }

  getGenres(): Observable<object> {
    return this.httpClient.get(this.apiUrl + "movies/genres");
  }
}
