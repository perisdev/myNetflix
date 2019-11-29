import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  // to select a DOM elements.
  @ViewChild('eleMovies', { read: ElementRef, static: false })
  eleMovies: any

  @ViewChild('eleWrap', { read: ElementRef, static: false })
  eleWrap: any
  //..

  listType: String;
  movies: Array<Movie> = [];
  genres: Array<Genre> = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  margin: number = 0;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.movieService.getMovies(params).subscribe(
        res => this.movies = Object.values(res),
        err => this.movies = []
      );
    });
  }

  wheelControl(e: any) {
    // console.log((e.deltaY < 0) ? 'up' : 'down');

    let moviesWidth = this.eleMovies.nativeElement.offsetWidth;
    let wrapWidth = this.eleWrap.nativeElement.offsetWidth;
    let diffMoviesWrap = (moviesWidth - wrapWidth) * -1;

    // console.log(e); // remove me
    // console.log(moviesWidth); // remove me
    // console.log(wrapWidth); // remove me

    // up to left
    if (e.deltaY < 0 || e.deltaX < 0) {
      this.margin += 30;

      if (this.margin > 0)
        this.margin = 0;

      // down to right
    } else if (e.deltaY >= 0 || e.deltaX >= 0) {
      this.margin -= 30;

      if (this.margin < diffMoviesWrap)
        this.margin = diffMoviesWrap;
    }

    setTimeout(() => {
      this.eleMovies.nativeElement.style = `margin-left: ${this.margin}px`;
    }, 0);
  }
}
