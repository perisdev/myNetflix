import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private movieService: MovieService) { }

  genres: object = {};

  ngOnInit() {
    this.isAlreadyLogged();

    // fill genres
    this.movieService.getGenres().subscribe(
      res => this.genres = res
    );
  }

  // user is already logged. 
  isAlreadyLogged() {

    let token = localStorage.getItem('token');

    if (token)
      this.userService.getProfile(token).subscribe(
        // is logged
        res => {
          this.userService.setUser(res, token);
          this.router.navigate(['/movies/premieres']);
        },
        // no logged, clean localStorage
        err => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      );
  }

  // search by title
  mySearch(search) {
    if (search.key === 'Enter')
      this.router.navigate(['/movies/title/', {
        title: search.target.value
      }]);
  }

  logout(){
    let token = localStorage.getItem('token');

    this.userService.logout(token).subscribe(
      res => {
        this.userService.setUser(undefined, null);
        this.router.navigate(['']);
      },
      err => console.log(err)  // removeMe
    )
  }
}