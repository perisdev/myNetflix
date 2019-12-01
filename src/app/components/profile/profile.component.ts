import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  current: object;
  historic: Array<object> = [];

  constructor(private movieService: MovieService, private userService: UserService) { }

  ngOnInit() {

    // if (this.userService.getUser()['order']['movieId']) {
    if (this.userService.getUserLen()) {

      // fill current Rent
      this.movieService.getMovies({
        params: {
          listType: 'byId',
          id: this.userService.getUser()['order']['movieId']
        }
      }).subscribe(
        res => {
          this.current = Object.values(res)[0];
        },
        err => this.current = null
      )
      // ..

      // fill rental historic
      let orders:Array<object> = this.userService.getUser()['orders'];

      for (let i = 0; i < orders.length; i++) {
        
        this.movieService.getMovies({
          params: {
            listType: 'byId',
            id: orders[i]['movieId']
          }
        }).subscribe(
          res => this.historic.push(Object.values(res)[0]),
          err => this.historic = null
        )
      }
      // ..
    }
  }
}
