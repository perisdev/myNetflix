import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Genre } from 'src/app/models/genre.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  listType: String;
  movies: Array<Movie> = [];
  genres: Array<Genre> = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.movieService.getMovies(params).subscribe(
        res => this.movies = Object.values(res),
        err => this.movies = []
      );
    });
  }
}
