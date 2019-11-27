import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isAlreadyLogged();
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

}
