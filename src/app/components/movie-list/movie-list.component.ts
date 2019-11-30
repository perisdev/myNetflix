import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from 'src/app/models/genre.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, AfterViewChecked {

  // to select DOM elements.
  @ViewChild('eleMovies1', { read: ElementRef, static: false })
  eleMovies1: any;

  @ViewChild('eleMovies2', { read: ElementRef, static: false })
  eleMovies2: any;

  @ViewChild('eleWrap1', { read: ElementRef, static: false })
  eleWrap1: any;

  //..

  listType: String;
  movies1: Array<Movie> = [];
  movies2: Array<Movie> = [];
  currentMov: object;
  currentPoster: string = '';

  moviesLen: Number = 0;
  genres: Array<Genre> = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private userService: UserService) { }

  marginMov1: number = 0;
  marginMov2: number = 0;

  ngOnInit() {

    if (this.userService.getUser()) {
      this.route.paramMap.subscribe(params => {
        this.movieService.getMovies(params).subscribe(
          res => {
            this.movies1 = Object.values(res);
            if (this.movies1.length > 0)
              this.setMovieDetail(this.movies1[0]);
            this.splitMovies();
          },
          err => this.movies1 = []
        );
      });
    } else {
      this.router.navigate(['']);
    }

  }

  setMovieDetail(movie: object): void {
    this.currentMov = movie;
    console.log(this.currentMov);
    this.currentPoster = "linear-gradient(to bottom, #000,  rgba(0,0,0,0), #000 99%), linear-gradient(to left, rgba(0,0,0,0) 97%, #000),"
    this.currentPoster = this.currentPoster.concat(`url('https://image.tmdb.org/t/p/w1280${this.currentMov["backdrop_path"]}')`);
  }

  // if movies list is too long we divide it in two rows / arrays
  splitMovies(): void {
    if (this.movies1.length > 29) {
      let len = Math.round(this.movies1.length / 2);
      console.log('len', len, this.movies1.length);
      this.movies2 = this.movies1.splice(len);
    } else {
      this.movies2 = [];
    }
  }

  ngAfterViewChecked(): void {

    // reset horizontal scroll initial position
    if (this.movies1.length !== this.moviesLen) {
      this.moviesLen = this.movies1.length;
      this.marginMov1 = 0;

      setTimeout(() => {
        this.marginMov2 = (this.eleMovies2.nativeElement.offsetWidth - this.eleWrap1.nativeElement.offsetWidth) * -1;
        this.eleMovies1.nativeElement.style = `margin-left: ${this.marginMov1}px`;
        this.eleMovies2.nativeElement.style = `margin-left: ${this.marginMov2}px`;
      }, 300);
    }
    //..
  }

  wheelControl(e: any): void {
    // console.log((e.deltaY < 0) ? 'up' : 'down');  // removeMe

    this.moviesLen = this.movies1.length;

    let wrapWidth = this.eleWrap1.nativeElement.offsetWidth;
    let moviesWidth = this.eleMovies1.nativeElement.offsetWidth;
    let movies2Width = this.eleMovies2.nativeElement.offsetWidth;
    let diffMoviesWrap = (moviesWidth - wrapWidth) * -1;
    let diffMovies2Wrap = (movies2Width - wrapWidth) * -1;

    // console.log(e); // removeMe
    // console.log(moviesWidth); // removeMe
    // console.log(wrapWidth); // removeMe

    if (wrapWidth < moviesWidth) {

      // up to left
      if (e.deltaY < 0 || e.deltaX < 0) {
        this.marginMov1 += 30;
        this.marginMov2 -= 30;

        if (this.marginMov1 > 0)
          this.marginMov1 = 0;

        if (this.marginMov2 < diffMovies2Wrap)
          this.marginMov2 = diffMovies2Wrap;

        // down to right
      } else if (e.deltaY >= 0 || e.deltaX >= 0) {
        this.marginMov1 -= 30;
        this.marginMov2 += 30;

        if (this.marginMov1 < diffMoviesWrap)
          this.marginMov1 = diffMoviesWrap;

        if (this.marginMov2 > 0)
          this.marginMov2 = 0;
      }

    } else {
      // reset margins
      this.marginMov1 = 0;
      this.marginMov2 = diffMovies2Wrap;
    }

    setTimeout(() => {
      this.eleMovies1.nativeElement.style = `margin-left: ${this.marginMov1}px`;
      this.eleMovies2.nativeElement.style = `margin-left: ${this.marginMov2}px`;
    }, 0);
  }

  rentMovie(form){
    if (form.status === 'VALID')
      console.log('rent -> ', this.currentMov['title'], form.value['days']);
  }
}
